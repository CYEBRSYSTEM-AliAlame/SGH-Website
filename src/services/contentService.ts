import { queryOne } from '@/lib/db'
import type { TextContent, Picture } from '@/types'
import { validateDatabaseHtmlContent } from '@/lib/validation'

export const contentService = {
  async getByPage(page: string): Promise<{ title: string; content: string; image: string | null } | null> {
    try {
      const content = await queryOne<TextContent>(
        "SELECT * FROM txt WHERE related_page = ?",
        [page]
      )

      if (!content) {
        return null
      }

      // Get associated image
      const picture = await queryOne<Picture>(
        "SELECT * FROM pics WHERE related_table = 'txt' AND related_table_id = ? ORDER BY display_order LIMIT 1",
        [content.id]
      )

      // Validate and sanitize HTML content from database
      const validatedContent = validateDatabaseHtmlContent(content.txt_en)

      return {
        title: content.txt_title_en || '',
        content: validatedContent,
        image: picture?.pic_file || null,
      }
    } catch (error) {
      // Return null when DB is not configured - component will handle gracefully
      // Don't log expected database connection errors
      return null
    }
  },
}

