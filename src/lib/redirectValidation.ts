/**
 * Redirect validation utility
 * Prevents open redirect vulnerabilities by validating redirect URLs
 */

/**
 * Validates that a redirect URL is safe (same origin or relative)
 * @param url - URL to validate
 * @param origin - Current origin (from request)
 * @returns True if redirect is safe, false otherwise
 */
export function isValidRedirect(url: string, origin: string): boolean {
  try {
    // Parse the URL
    const urlObj = new URL(url, origin)
    
    // Allow relative URLs (they're always safe)
    if (url.startsWith('/')) {
      return true
    }
    
    // Allow same origin redirects
    if (urlObj.origin === origin) {
      return true
    }
    
    // Block external redirects
    return false
  } catch (error) {
    // If URL parsing fails, it's likely a relative URL which is safe
    // But we should be cautious
    return url.startsWith('/')
  }
}

/**
 * Sanitizes a redirect URL to ensure it's safe
 * @param url - URL to sanitize
 * @param origin - Current origin
 * @param fallback - Fallback URL if redirect is unsafe
 * @returns Safe redirect URL
 */
export function sanitizeRedirect(url: string, origin: string, fallback: string = '/'): string {
  if (isValidRedirect(url, origin)) {
    return url
  }
  
  // Return fallback if redirect is unsafe
  return fallback
}

/**
 * Whitelist of allowed redirect patterns
 * Only redirects matching these patterns are allowed
 */
const ALLOWED_REDIRECT_PATTERNS = [
  /^\/[a-z]{2}(\/.*)?$/, // Language routes: /en, /ar, /en/...
  /^\/[a-z]{2}\/[a-z-]+(\/.*)?$/, // Language + page routes
]

/**
 * Validates redirect against whitelist patterns
 * @param pathname - Pathname to validate
 * @returns True if pathname matches allowed patterns
 */
export function isAllowedRedirectPath(pathname: string): boolean {
  return ALLOWED_REDIRECT_PATTERNS.some(pattern => pattern.test(pathname))
}

