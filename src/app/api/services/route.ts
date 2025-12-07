import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { MedicalService } from '@/types'
import servicesData from '@/data/services.json'
import { createErrorResponse, logError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET() {
  const requestId = generateRequestId()
  
  try {
    // Try database first
    let services: MedicalService[] = []
    try {
      services = await query<MedicalService>(
        'SELECT * FROM medical_services ORDER BY dep_id, display_order'
      )
    } catch (dbError) {
      logError(dbError, { requestId, endpoint: '/api/services', operation: 'database_query' })
      // Fallback to JSON data
      services = servicesData as MedicalService[]
    }

    return NextResponse.json({ services })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/services' })
    // Final fallback - return JSON data
    return NextResponse.json({ services: servicesData as MedicalService[] })
  }
}

