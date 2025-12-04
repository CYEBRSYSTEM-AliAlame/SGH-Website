import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Color } from '@/types'

export async function GET() {
  try {
    const colors = await query<Color>('SELECT * FROM colors')

    return NextResponse.json(colors)
  } catch (error) {
    console.error('Error fetching colors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch colors' },
      { status: 500 }
    )
  }
}

