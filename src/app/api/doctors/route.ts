import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Doctor } from '@/types'
import doctorsData from '@/data/doctors.json'
import relationshipsData from '@/data/doctor_service_relationships.json'
import { doctorsQuerySchema } from '@/lib/validation'
import { createErrorResponse, logError, ValidationError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Validate and parse query parameters
    const rawParams = {
      service_id: searchParams.get('service_id') || undefined,
      disease_id: searchParams.get('disease_id') || undefined,
      keyword_name: searchParams.get('keyword_name') || undefined,
      keyword_general: searchParams.get('keyword_general') || undefined,
      head_of_dep: searchParams.get('head_of_dep') || undefined,
    }

    const validatedParams = doctorsQuerySchema.parse(rawParams)

    let doctors: Doctor[] = []
    let useDatabase = true

    // Try database first
    try {
      let sql = 'SELECT DISTINCT d.* FROM doctors d'
      const params: (string | number)[] = []
      const conditions: string[] = []

      // Filter by service using relationship table
      if (validatedParams.service_id !== undefined) {
        sql += ' INNER JOIN tbl_doctors_services tds ON d.id = tds.doctor_id'
        conditions.push('tds.service_id = ?')
        params.push(validatedParams.service_id)
      }

      // Filter by disease (if disease table exists)
      if (validatedParams.disease_id !== undefined) {
        conditions.push('d.disease_id = ?')
        params.push(validatedParams.disease_id)
      }

      // Filter by head of department
      if (validatedParams.head_of_dep === 'true') {
        conditions.push('d.head_of_dep = ?')
        params.push('1')
      } else if (validatedParams.head_of_dep === 'false') {
        conditions.push('d.head_of_dep = ?')
        params.push('0')
      }

      // Filter by name keyword
      if (validatedParams.keyword_name) {
        conditions.push('(d.doctor_name_en LIKE ? OR d.doctor_name_ar LIKE ?)')
        params.push(`%${validatedParams.keyword_name}%`, `%${validatedParams.keyword_name}%`)
      }

      // General keyword search (name + experience)
      if (validatedParams.keyword_general) {
        conditions.push('(d.doctor_name_en LIKE ? OR d.doctor_name_ar LIKE ? OR d.doctor_exp_en LIKE ? OR d.doctor_exp_ar LIKE ?)')
        params.push(
          `%${validatedParams.keyword_general}%`,
          `%${validatedParams.keyword_general}%`,
          `%${validatedParams.keyword_general}%`,
          `%${validatedParams.keyword_general}%`
        )
      }

      // Add WHERE clause if there are conditions
      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ')
      }

      // Order by head of department first, then by name
      sql += ' ORDER BY d.head_of_dep DESC, d.doctor_name_en ASC'

      doctors = await query<Doctor>(sql, params)
    } catch (dbError) {
      logError(dbError, { requestId, endpoint: '/api/doctors', operation: 'database_query' })
      useDatabase = false
    }

    // Fallback to JSON data if database failed
    if (!useDatabase || doctors.length === 0) {
      doctors = doctorsData as Doctor[]
      const relationships = relationshipsData as Array<{ doctor_id: number; service_id: number }>

      // Filter by service using relationship data
      if (validatedParams.service_id !== undefined) {
        // Get doctor IDs for this service (as zero-padded strings to match JSON format)
        const doctorIdsForService = new Set(
          relationships
            .filter(rel => rel.service_id === validatedParams.service_id)
            .map(rel => rel.doctor_id.toString().padStart(5, '0'))
        )
        // Filter doctors by matching IDs
        doctors = doctors.filter(doc => doctorIdsForService.has(doc.id))
      }

      // Filter by head of department
      if (validatedParams.head_of_dep === 'true') {
        doctors = doctors.filter(doc => doc.head_of_dep === '1')
      } else if (validatedParams.head_of_dep === 'false') {
        doctors = doctors.filter(doc => doc.head_of_dep === '0')
      }

      // Filter by disease ID (if implemented)
      if (validatedParams.disease_id !== undefined) {
        doctors = doctors.filter(doc => doc.disease_id === validatedParams.disease_id)
      }

      // Filter by name keyword
      if (validatedParams.keyword_name) {
        const keyword = validatedParams.keyword_name.toLowerCase()
        doctors = doctors.filter(doc =>
          doc.doctor_name_en.toLowerCase().includes(keyword) ||
          (validatedParams.keyword_name && doc.doctor_name_ar.includes(validatedParams.keyword_name))
        )
      }

      // General keyword search
      if (validatedParams.keyword_general) {
        const keyword = validatedParams.keyword_general.toLowerCase()
        doctors = doctors.filter(doc =>
          doc.doctor_name_en.toLowerCase().includes(keyword) ||
          (validatedParams.keyword_general && doc.doctor_name_ar.includes(validatedParams.keyword_general)) ||
          doc.doctor_exp_en.toLowerCase().includes(keyword) ||
          (validatedParams.keyword_general && doc.doctor_exp_ar.includes(validatedParams.keyword_general))
        )
      }

      // Sort by head of department first, then by name
      doctors.sort((a, b) => {
        if (a.head_of_dep !== b.head_of_dep) {
          return b.head_of_dep.localeCompare(a.head_of_dep) // '1' comes before '0'
        }
        return a.doctor_name_en.localeCompare(b.doctor_name_en)
      })
    }

    return NextResponse.json({ doctors })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/doctors' })
    
    if (error instanceof ValidationError) {
      const errorResponse = createErrorResponse(error)
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // For other errors, return empty array as fallback
    const errorResponse = createErrorResponse(error)
    return NextResponse.json({ doctors: [], ...errorResponse }, { status: 500 })
  }
}

