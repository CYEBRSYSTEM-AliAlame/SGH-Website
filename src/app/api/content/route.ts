import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import type { TextContent, Picture } from '@/types'
import { contentQuerySchema, validateDatabaseHtmlContent } from '@/lib/validation'
import { createErrorResponse, logError, ValidationError } from '@/lib/errors'
import { generateRequestId } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    const searchParams = request.nextUrl.searchParams
    const rawParams = { page: searchParams.get('page') || undefined }

    // Validate input
    const validatedParams = contentQuerySchema.parse(rawParams)

    const content = await queryOne<TextContent>(
      "SELECT * FROM txt WHERE related_page = ?",
      [validatedParams.page]
    )

    if (!content) {
      return NextResponse.json({ title: '', content: '', image: null })
    }

    // Get associated image
    const picture = await queryOne<Picture>(
      "SELECT * FROM pics WHERE related_table = 'txt' AND related_table_id = ? ORDER BY display_order LIMIT 1",
      [content.id]
    )

    // Validate and sanitize HTML content from database
    const validatedContent = validateDatabaseHtmlContent(content.txt_en)

    return NextResponse.json({
      title: content.txt_title_en,
      content: validatedContent,
      image: picture?.pic_file || null,
    })
  } catch (error) {
    logError(error, { requestId, endpoint: '/api/content' })
    
    if (error instanceof ValidationError) {
      const errorResponse = createErrorResponse(error)
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const errorResponse = createErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

