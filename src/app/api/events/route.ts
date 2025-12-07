import { NextResponse } from 'next/server'
import eventsData from '@/data/events.json'
import { createErrorResponse, logError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET() {
  const requestId = generateRequestId()
  
  try {
    return NextResponse.json({ events: eventsData })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/events' })
    const errorResponse = createErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

