import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { suggestionsQuerySchema } from '@/lib/validation'
import { createErrorResponse, logError, ValidationError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    const searchParams = request.nextUrl.searchParams
    const rawParams = { keyword: searchParams.get('keyword') || undefined }

    // Validate input
    const validatedParams = suggestionsQuerySchema.parse(rawParams)

    const results = await query(
      'SELECT DISTINCT doctor_name_en as name FROM doctors WHERE doctor_name_en LIKE ? LIMIT 10',
      [`%${validatedParams.keyword}%`]
    )

    const suggestions = results.map((r: { name: string }) => r.name)

    return NextResponse.json({ suggestions })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/suggestions' })
    
    if (error instanceof ValidationError) {
      const errorResponse = createErrorResponse(error)
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const errorResponse = createErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

