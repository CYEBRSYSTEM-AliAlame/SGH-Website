import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const keyword = searchParams.get('keyword')

    if (!keyword || keyword.length < 3) {
      return NextResponse.json({ suggestions: [] })
    }

    const results = await query(
      'SELECT DISTINCT doctor_name_en as name FROM doctors WHERE doctor_name_en LIKE ? LIMIT 10',
      [`%${keyword}%`]
    )

    const suggestions = results.map((r: any) => r.name)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}

