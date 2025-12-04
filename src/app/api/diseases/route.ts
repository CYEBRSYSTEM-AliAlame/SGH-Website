import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceId = searchParams.get('service_id')

    if (!serviceId) {
      return NextResponse.json({ diseases: [] })
    }

    const diseases = await query(
      'SELECT id, disease_name_en as name FROM diseases WHERE service_id = ? ORDER BY disease_name_en',
      [parseInt(serviceId)]
    )

    return NextResponse.json({ diseases })
  } catch (error) {
    console.error('Error fetching diseases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch diseases' },
      { status: 500 }
    )
  }
}

