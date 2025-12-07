import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { diseasesQuerySchema } from '@/lib/validation'
import { createErrorResponse, logError, ValidationError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    const searchParams = request.nextUrl.searchParams
    const rawParams = { service_id: searchParams.get('service_id') || undefined }

    // Validate input - service_id is required for this endpoint
    if (!rawParams.service_id) {
      return NextResponse.json({ diseases: [] })
    }

    const validatedParams = diseasesQuerySchema.parse(rawParams)

    const diseases = await query(
      'SELECT id, disease_name_en as name FROM diseases WHERE service_id = ? ORDER BY disease_name_en',
      [validatedParams.service_id]
    )

    return NextResponse.json({ diseases })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/diseases' })
    
    if (error instanceof ValidationError) {
      const errorResponse = createErrorResponse(error)
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const errorResponse = createErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

