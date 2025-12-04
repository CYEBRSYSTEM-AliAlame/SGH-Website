import { NextResponse } from 'next/server'
import eventsData from '@/data/events.json'

export async function GET() {
  try {
    return NextResponse.json({ events: eventsData })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

