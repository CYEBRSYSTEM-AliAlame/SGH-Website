import { NextResponse } from 'next/server'
import sliderData from '@/data/slider.json'
import { createErrorResponse, logError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET() {
  const requestId = generateRequestId()
  
  try {
    return NextResponse.json({ slides: sliderData })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/slider' })
    const errorResponse = createErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

