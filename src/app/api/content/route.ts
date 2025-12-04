import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import type { TextContent, Picture } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      )
    }

    const content = await queryOne<TextContent>(
      "SELECT * FROM txt WHERE related_page = ?",
      [page]
    )

    if (!content) {
      return NextResponse.json({ title: '', content: '', image: null })
    }

    // Get associated image
    const picture = await queryOne<Picture>(
      "SELECT * FROM pics WHERE related_table = 'txt' AND related_table_id = ? ORDER BY display_order LIMIT 1",
      [content.id]
    )

    return NextResponse.json({
      title: content.txt_title_en,
      content: content.txt_en,
      image: picture?.pic_file || null,
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

