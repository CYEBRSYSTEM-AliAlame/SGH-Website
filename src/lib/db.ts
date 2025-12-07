import mysql from 'mysql2/promise'
import { logError } from './errors'
import { getEnv, hasDatabaseConfig } from './env'

// Create connection pool optimized for serverless (Vercel)
// Only create pool if credentials are available
let pool: mysql.Pool | null = null

// Maximum query execution time (5 seconds)
const MAX_QUERY_TIMEOUT = 5000

// SQL injection detection patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/i,
  /(--|#|\/\*|\*\/|;)/,
  /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
  /(\b(OR|AND)\s+['"]\w+['"]\s*=\s*['"]\w+['"])/i,
]

/**
 * Validates SQL query parameters for potential injection attempts
 */
function validateQueryParams(params: unknown[]): void {
  for (const param of params) {
    if (typeof param === 'string') {
      for (const pattern of SQL_INJECTION_PATTERNS) {
        if (pattern.test(param)) {
          logError(new Error('Potential SQL injection detected'), {
            param: param.substring(0, 100), // Log first 100 chars only
            pattern: pattern.toString(),
          })
          throw new Error('Invalid query parameter detected')
        }
      }
    }
  }
}

function getPool(): mysql.Pool | null {
  // Use validated environment variables
  if (!hasDatabaseConfig()) {
    return null
  }
  
  if (!pool) {
    const env = getEnv()
    
    if (!env.DB_HOST || !env.DB_USER || !env.DB_PASSWORD || !env.DB_NAME) {
      return null
    }

    // Configure SSL properly - require certificate validation in production
    let sslConfig: mysql.SslOptions | undefined
    if (env.DB_SSL) {
      sslConfig = {
        rejectUnauthorized: env.NODE_ENV === 'production',
        // In production, we should validate certificates
        // In development, we might need to allow self-signed certs
        // But never use rejectUnauthorized: false in production
      }
    }

    pool = mysql.createPool({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      port: env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 2, // Reduced for serverless environments (Vercel recommendation: 1-2)
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 10000, // 10 second timeout for serverless
      ssl: sslConfig,
    })
  }
  
  return pool
}

// Pool is created lazily via getPool() function
// This prevents pool creation when credentials aren't available

/**
 * Validates parameter types before executing query
 */
function validateParams(params?: unknown[]): void {
  if (!params) return

  for (const param of params) {
    // Only allow primitive types and null
    const allowedTypes = ['string', 'number', 'boolean', 'null']
    const paramType = param === null ? 'null' : typeof param

    if (!allowedTypes.includes(paramType)) {
      throw new Error(`Invalid parameter type: ${paramType}. Only primitive types allowed.`)
    }

    // Validate number is finite
    if (typeof param === 'number' && !isFinite(param)) {
      throw new Error('Invalid number parameter: must be finite')
    }
  }
}

/**
 * Executes a query with timeout and validation
 */
async function executeWithTimeout<T>(
  dbPool: mysql.Pool,
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  return Promise.race([
    dbPool.execute(sql, params) as Promise<[T[], mysql.FieldPacket[]]>,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout exceeded')), MAX_QUERY_TIMEOUT)
    ),
  ]).then(([rows]) => rows as T[])
}

/**
 * Checks if an error is an expected database connection error
 * (when database is not available/configured)
 */
function isExpectedDbError(error: unknown): boolean {
  if (error instanceof Error) {
    // Connection refused errors are expected when DB isn't running
    if (error.message.includes('ECONNREFUSED') || 
        error.message.includes('connect ECONNREFUSED') ||
        error.message.includes('Database credentials not configured')) {
      return true
    }
  }
  
  // Check for MySQL connection error codes
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: string }).code
    if (code === 'ECONNREFUSED' || code === 'ENOTFOUND') {
      return true
    }
  }
  
  return false
}

// Helper function for queries
export async function query<T = any>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  try {
    const dbPool = getPool()
    if (!dbPool) {
      throw new Error('Database credentials not configured')
    }

    // Validate parameters
    if (params) {
      validateParams(params)
      validateQueryParams(params)
    }
    
    const rows = await executeWithTimeout<T>(dbPool, sql, params)
    return rows
  } catch (error) {
    // Only log unexpected errors (not connection failures when DB isn't configured)
    if (!isExpectedDbError(error)) {
      logError(error, {
        operation: 'database_query',
        sql: sql.substring(0, 100), // Log first 100 chars of SQL only
      })
    }
    throw error // Re-throw so services can catch and use fallback
  }
}

// Helper function for single row queries
export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  try {
    const rows = await query<T>(sql, params)
    return rows[0] || null
  } catch (error) {
    // Re-throw so services can handle fallback
    throw error
  }
}

