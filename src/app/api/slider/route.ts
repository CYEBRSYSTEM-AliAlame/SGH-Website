import { NextResponse } from 'next/server'
import sliderData from '@/data/slider.json'

export async function GET() {
  try {
    return NextResponse.json({ slides: sliderData })
  } catch (error) {
    console.error('Error fetching slider:', error)
    return NextResponse.json(
      { error: 'Failed to fetch slider' },
      { status: 500 }
    )
  }
}

