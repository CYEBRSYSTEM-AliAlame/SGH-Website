import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { MedicalService } from '@/types'
import servicesData from '@/data/services.json'

export async function GET() {
  try {
    // Try database first
    let services: MedicalService[] = []
    try {
      services = await query<MedicalService>(
        'SELECT * FROM medical_services ORDER BY dep_id, display_order'
      )
    } catch (dbError) {
      console.warn('Database query failed, falling back to JSON data:', dbError)
      // Fallback to JSON data
      services = servicesData as MedicalService[]
    }

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    // Final fallback - return JSON data
    return NextResponse.json({ services: servicesData as MedicalService[] })
  }
}

