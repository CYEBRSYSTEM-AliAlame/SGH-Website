import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Doctor } from '@/types'
import doctorsData from '@/data/doctors.json'
import relationshipsData from '@/data/doctor_service_relationships.json'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceId = searchParams.get('service_id')
    const diseaseId = searchParams.get('disease_id')
    const keywordName = searchParams.get('keyword_name')
    const keywordGeneral = searchParams.get('keyword_general')
    const headOfDep = searchParams.get('head_of_dep')

    let doctors: Doctor[] = []
    let useDatabase = true

    // Try database first
    try {
      let sql = 'SELECT DISTINCT d.* FROM doctors d'
      const params: any[] = []
      const conditions: string[] = []

      // Filter by service using relationship table
      if (serviceId) {
        sql += ' INNER JOIN tbl_doctors_services tds ON d.id = tds.doctor_id'
        conditions.push('tds.service_id = ?')
        params.push(parseInt(serviceId))
      }

      // Filter by disease (if disease table exists)
      if (diseaseId) {
        conditions.push('d.disease_id = ?')
        params.push(parseInt(diseaseId))
      }

      // Filter by head of department
      if (headOfDep === 'true') {
        conditions.push('d.head_of_dep = ?')
        params.push('1')
      } else if (headOfDep === 'false') {
        conditions.push('d.head_of_dep = ?')
        params.push('0')
      }

      // Filter by name keyword
      if (keywordName) {
        conditions.push('(d.doctor_name_en LIKE ? OR d.doctor_name_ar LIKE ?)')
        params.push(`%${keywordName}%`, `%${keywordName}%`)
      }

      // General keyword search (name + experience)
      if (keywordGeneral) {
        conditions.push('(d.doctor_name_en LIKE ? OR d.doctor_name_ar LIKE ? OR d.doctor_exp_en LIKE ? OR d.doctor_exp_ar LIKE ?)')
        params.push(`%${keywordGeneral}%`, `%${keywordGeneral}%`, `%${keywordGeneral}%`, `%${keywordGeneral}%`)
      }

      // Add WHERE clause if there are conditions
      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ')
      }

      // Order by head of department first, then by name
      sql += ' ORDER BY d.head_of_dep DESC, d.doctor_name_en ASC'

      doctors = await query<Doctor>(sql, params)
    } catch (dbError) {
      console.warn('Database query failed, falling back to JSON data:', dbError)
      useDatabase = false
    }

    // Fallback to JSON data if database failed
    if (!useDatabase || doctors.length === 0) {
      doctors = doctorsData as Doctor[]
      const relationships = relationshipsData as Array<{ doctor_id: number; service_id: number }>

      // Filter by service using relationship data
      if (serviceId) {
        const serviceIdNum = parseInt(serviceId)
        // Get doctor IDs for this service (as zero-padded strings to match JSON format)
        const doctorIdsForService = new Set(
          relationships
            .filter(rel => rel.service_id === serviceIdNum)
            .map(rel => rel.doctor_id.toString().padStart(5, '0'))
        )
        // Filter doctors by matching IDs
        doctors = doctors.filter(doc => doctorIdsForService.has(doc.id))
      }

      // Filter by head of department
      if (headOfDep === 'true') {
        doctors = doctors.filter(doc => doc.head_of_dep === '1')
      } else if (headOfDep === 'false') {
        doctors = doctors.filter(doc => doc.head_of_dep === '0')
      }

      // Filter by disease ID (if implemented)
      if (diseaseId) {
        doctors = doctors.filter(doc => doc.disease_id === parseInt(diseaseId))
      }

      // Filter by name keyword
      if (keywordName) {
        const keyword = keywordName.toLowerCase()
        doctors = doctors.filter(doc =>
          doc.doctor_name_en.toLowerCase().includes(keyword) ||
          doc.doctor_name_ar.includes(keywordName)
        )
      }

      // General keyword search
      if (keywordGeneral) {
        const keyword = keywordGeneral.toLowerCase()
        doctors = doctors.filter(doc =>
          doc.doctor_name_en.toLowerCase().includes(keyword) ||
          doc.doctor_name_ar.includes(keywordGeneral) ||
          doc.doctor_exp_en.toLowerCase().includes(keyword) ||
          doc.doctor_exp_ar.includes(keywordGeneral)
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
    console.error('Error fetching doctors:', error)
    // Final fallback - return empty array
    return NextResponse.json({ doctors: [] })
  }
}

