import { z } from 'zod'
import { validateHtmlContent } from './sanitize'

/**
 * Sanitizes a string for use in SQL LIKE queries
 * Escapes special characters that could be used for SQL injection
 */
export function sanitizeLikePattern(input: string): string {
  // Escape SQL LIKE special characters: %, _, \
  return input
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
}

/**
 * Validates and parses an integer from a string
 * Returns null if invalid
 */
export function safeParseInt(value: string | null | undefined): number | null {
  if (!value) return null
  const parsed = parseInt(value, 10)
  if (isNaN(parsed) || !isFinite(parsed)) return null
  return parsed
}

/**
 * Validates a positive integer ID
 */
export function validateId(value: string | null | undefined): number | null {
  const parsed = safeParseInt(value)
  if (parsed === null || parsed <= 0) return null
  return parsed
}

// API Input Validation Schemas

export const doctorsQuerySchema = z.object({
  service_id: z.string().optional().transform((val) => {
    if (!val) return undefined
    const parsed = validateId(val)
    return parsed !== null ? parsed : undefined
  }),
  disease_id: z.string().optional().transform((val) => {
    if (!val) return undefined
    const parsed = validateId(val)
    return parsed !== null ? parsed : undefined
  }),
  keyword_name: z.string().max(100).optional().transform((val) => {
    if (!val) return undefined
    // Sanitize for SQL LIKE
    return sanitizeLikePattern(val.trim())
  }),
  keyword_general: z.string().max(100).optional().transform((val) => {
    if (!val) return undefined
    // Sanitize for SQL LIKE
    return sanitizeLikePattern(val.trim())
  }),
  head_of_dep: z.enum(['true', 'false']).optional(),
})

export const suggestionsQuerySchema = z.object({
  keyword: z
    .string()
    .min(3, 'Keyword must be at least 3 characters')
    .max(100, 'Keyword must not exceed 100 characters')
    .transform((val) => sanitizeLikePattern(val.trim())),
})

export const contentQuerySchema = z.object({
  page: z
    .string()
    .min(1, 'Page parameter is required')
    .max(200, 'Page parameter too long')
    .transform((val) => val.trim()),
})

export const diseasesQuerySchema = z.object({
  service_id: z
    .string()
    .min(1, 'Service ID is required')
    .transform((val) => {
      const parsed = validateId(val)
      if (parsed === null) {
        throw new z.ZodError([
          {
            code: 'custom',
            path: ['service_id'],
            message: 'Invalid service ID',
          },
        ])
      }
      return parsed
    }),
})

export type DoctorsQueryParams = z.infer<typeof doctorsQuerySchema>
export type SuggestionsQueryParams = z.infer<typeof suggestionsQuerySchema>
export type ContentQueryParams = z.infer<typeof contentQuerySchema>
export type DiseasesQueryParams = z.infer<typeof diseasesQuerySchema>

/**
 * HTML content validation schema
 * Validates that HTML content is safe before use
 */
export const htmlContentSchema = z
  .string()
  .max(100000, 'HTML content too long') // Max 100KB
  .refine(
    (content) => {
      // Validate HTML content is safe
      return validateHtmlContent(content)
    },
    {
      message: 'HTML content contains unsafe elements',
    }
  )

/**
 * Validates HTML content from database
 * Should be used when reading content that will be rendered
 */
export function validateDatabaseHtmlContent(content: string | null | undefined): string {
  if (!content) {
    return ''
  }

  try {
    // Validate using schema
    return htmlContentSchema.parse(content)
  } catch (error) {
    // If validation fails, return empty string
    console.error('HTML content validation failed:', error)
    return ''
  }
}

