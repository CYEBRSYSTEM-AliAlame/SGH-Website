/**
 * Rate limiting utility for API endpoints
 * Implements per-IP rate limiting to prevent DDoS attacks
 * 
 * NOTE: This uses an in-memory store which has limitations in serverless environments:
 * - Each serverless function instance has its own memory store
 * - Rate limits are not shared across instances
 * - Memory is cleared when function instance is recycled
 * - For production with high traffic, consider using Redis or similar distributed store
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store (for serverless, consider using Redis in production)
const rateLimitStore: RateLimitStore = {}

// Maximum number of entries in store to prevent unbounded memory growth
const MAX_STORE_SIZE = 10000

// Clean up old entries every 5 minutes
setInterval(() => {
  cleanupExpiredEntries()
}, 5 * 60 * 1000)

/**
 * Cleans up expired entries from the rate limit store
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  for (const key in rateLimitStore) {
    if (rateLimitStore[key].resetTime < now) {
      keysToDelete.push(key)
    }
  }
  
  // Delete expired entries
  for (const key of keysToDelete) {
    delete rateLimitStore[key]
  }
  
  // If store is still too large after cleanup, remove oldest entries
  const currentSize = Object.keys(rateLimitStore).length
  if (currentSize > MAX_STORE_SIZE) {
    const entries = Object.entries(rateLimitStore)
      .sort((a, b) => a[1].resetTime - b[1].resetTime) // Sort by reset time
    
    // Remove oldest entries until we're under the limit
    const toRemove = currentSize - MAX_STORE_SIZE
    for (let i = 0; i < toRemove; i++) {
      delete rateLimitStore[entries[i][0]]
    }
  }
}

/**
 * Gets the current size of the rate limit store
 */
export function getRateLimitStoreSize(): number {
  return Object.keys(rateLimitStore).length
}

export interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string // Custom error message
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
}

/**
 * Gets client identifier from request
 * In production, consider using a more sophisticated method
 */
function getClientId(request: Request | { headers: Headers }): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback to a default identifier (not ideal, but works for basic protection)
  return 'unknown'
}

/**
 * Checks if request should be rate limited
 */
export function checkRateLimit(
  request: Request | { headers: Headers },
  options: RateLimitOptions
): RateLimitResult {
  const clientId = getClientId(request)
  const now = Date.now()
  const key = `${clientId}:${options.windowMs}`

  // Periodic cleanup if store is getting large
  const storeSize = Object.keys(rateLimitStore).length
  if (storeSize > MAX_STORE_SIZE * 0.8) {
    // Clean up if store is 80% full
    cleanupExpiredEntries()
  }

  let entry = rateLimitStore[key]

  // Initialize or reset if window expired
  if (!entry || entry.resetTime < now) {
    // Check if we have room for new entries
    if (storeSize >= MAX_STORE_SIZE) {
      // Store is full, clean up and try again
      cleanupExpiredEntries()
      
      // If still full after cleanup, reject request to prevent memory issues
      if (Object.keys(rateLimitStore).length >= MAX_STORE_SIZE) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: now + options.windowMs,
          retryAfter: Math.ceil(options.windowMs / 1000),
        }
      }
    }
    
    entry = {
      count: 0,
      resetTime: now + options.windowMs,
    }
    rateLimitStore[key] = entry
  }

  // Increment count
  entry.count++

  const remaining = Math.max(0, options.maxRequests - entry.count)
  const allowed = entry.count <= options.maxRequests

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
    retryAfter: allowed ? undefined : Math.ceil((entry.resetTime - now) / 1000),
  }
}

/**
 * Default rate limit configuration
 */
export const defaultRateLimit: RateLimitOptions = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
  message: 'Too many requests. Please try again later.',
}

/**
 * Strict rate limit for sensitive endpoints
 */
export const strictRateLimit: RateLimitOptions = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute
  message: 'Rate limit exceeded. Please slow down.',
}

