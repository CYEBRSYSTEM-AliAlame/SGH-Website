/**
 * Centralized error handling for API routes
 * Prevents information disclosure while maintaining useful error tracking
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public isOperational: boolean = true
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string[]>) {
    super(message, 400, 'VALIDATION_ERROR', true)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR', true)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', true)
  }
}

/**
 * Sanitizes error messages for client responses
 * Only returns safe, generic messages in production
 */
export function sanitizeErrorMessage(error: unknown, isDevelopment: boolean = false): string {
  if (isDevelopment) {
    // In development, show more details
    if (error instanceof AppError) {
      return error.message
    }
    if (error instanceof Error) {
      return error.message
    }
    return 'An unknown error occurred'
  }

  // In production, return generic messages
  if (error instanceof ValidationError) {
    return 'Invalid input provided'
  }
  if (error instanceof DatabaseError) {
    return 'Database operation failed'
  }
  if (error instanceof RateLimitError) {
    return 'Too many requests. Please try again later.'
  }
  if (error instanceof AppError) {
    return 'An error occurred processing your request'
  }

  // Generic error for unknown errors
  return 'An error occurred. Please try again later.'
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  error: unknown,
  isDevelopment: boolean = false
): { error: string; code?: string; fields?: Record<string, string[]> } {
  const isDev = isDevelopment || process.env.NODE_ENV === 'development'

  if (error instanceof ValidationError) {
    return {
      error: sanitizeErrorMessage(error, isDev),
      code: 'VALIDATION_ERROR',
      fields: error.fields,
    }
  }

  if (error instanceof AppError) {
    return {
      error: sanitizeErrorMessage(error, isDev),
      code: error.code,
    }
  }

  return {
    error: sanitizeErrorMessage(error, isDev),
    code: 'INTERNAL_ERROR',
  }
}

/**
 * Logs error details server-side (never sent to client)
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  const isDevelopment = process.env.NODE_ENV === 'development'

  if (isDevelopment) {
    console.error('Error details:', {
      error,
      context,
      stack: error instanceof Error ? error.stack : undefined,
    })
  } else {
    // In production, log structured error data
    const errorData: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      context,
    }

    if (error instanceof AppError) {
      errorData.error = {
        name: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
      }
    } else if (error instanceof Error) {
      errorData.error = {
        name: error.name,
        message: error.message,
      }
    } else {
      errorData.error = { message: 'Unknown error' }
    }

    // In production, you would send this to a logging service
    console.error(JSON.stringify(errorData))
  }
}

