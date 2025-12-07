/**
 * Structured logging utility
 * Sanitizes sensitive data and provides consistent logging format
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogContext {
  [key: string]: unknown
}

/**
 * Sanitizes sensitive fields from log data
 */
function sanitizeLogData(data: LogContext): LogContext {
  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'apiKey',
    'authorization',
    'cookie',
    'session',
    'db_password',
    'db_user',
  ]

  const sanitized = { ...data }

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]'
    }
  }

  // Recursively sanitize nested objects
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeLogData(sanitized[key] as LogContext)
    }
  }

  return sanitized
}

/**
 * Generates a unique request ID for tracking
 */
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Structured logger
 */
class Logger {
  private requestId?: string

  setRequestId(requestId: string): void {
    this.requestId = requestId
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      requestId: this.requestId,
      ...(context ? sanitizeLogData(context) : {}),
    }

    // In production, use appropriate log level
    switch (level) {
      case 'error':
        console.error(JSON.stringify(logEntry))
        break
      case 'warn':
        console.warn(JSON.stringify(logEntry))
        break
      case 'info':
        console.info(JSON.stringify(logEntry))
        break
      case 'debug':
        if (process.env.NODE_ENV === 'development') {
          console.debug(JSON.stringify(logEntry))
        }
        break
    }
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context)
  }

  /**
   * Logs security events
   */
  security(event: string, context?: LogContext): void {
    this.warn(`[SECURITY] ${event}`, { ...context, securityEvent: true })
  }
}

// Export singleton instance
export const logger = new Logger()

// Export function to create logger with request ID
export function createLogger(requestId: string): Logger {
  const log = new Logger()
  log.setRequestId(requestId)
  return log
}

