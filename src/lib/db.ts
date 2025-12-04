import mysql from 'mysql2/promise'

// Create connection pool optimized for serverless (Vercel)
// Only create pool if credentials are available
let pool: mysql.Pool | null = null

function getPool(): mysql.Pool | null {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    return null
  }
  
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '3306'),
      waitForConnections: true,
      connectionLimit: 2, // Reduced for serverless environments (Vercel recommendation: 1-2)
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 10000, // 10 second timeout for serverless
      // SSL support for secure connections
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    })
  }
  
  return pool
}

// Pool is created lazily via getPool() function
// This prevents pool creation when credentials aren't available

// Helper function for queries
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  try {
    const dbPool = getPool()
    if (!dbPool) {
      throw new Error('Database credentials not configured')
    }
    
    const [rows] = await dbPool.execute(sql, params)
    return rows as T[]
  } catch (error) {
    // Silently fail - services will handle fallback to JSON data
    // Only log in development mode to avoid console errors in production
    if (process.env.NODE_ENV === 'development') {
      console.warn('Database query failed (using JSON fallback):', error instanceof Error ? error.message : 'Unknown error')
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

