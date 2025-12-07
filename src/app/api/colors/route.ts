import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Color } from '@/types'
import { createErrorResponse, logError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET() {
  const requestId = generateRequestId()
  
  try {
    const colors = await query<Color>('SELECT * FROM colors')

    return NextResponse.json(colors)
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/colors' })
    const errorResponse = createErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

