/**
 * Nonce generation utility for Content Security Policy
 * Generates cryptographically secure nonces for inline scripts and styles
 * Uses Web Crypto API for Edge Runtime compatibility
 */

/**
 * Generates a cryptographically secure random nonce
 * Uses Web Crypto API which is available in Edge Runtime
 * @returns Base64-encoded random nonce
 */
export function generateNonce(): string {
  // Use Web Crypto API (available in Edge Runtime)
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  
  // Convert to base64
  // In Edge Runtime, we need to manually convert to base64
  const base64 = btoa(String.fromCharCode(...array))
  return base64
}

/**
 * Validates a nonce format (basic check)
 * @param nonce - Nonce string to validate
 * @returns True if nonce format is valid
 */
export function isValidNonce(nonce: string): boolean {
  // Nonce should be base64 encoded and reasonable length
  return /^[A-Za-z0-9+/=]{16,}$/.test(nonce)
}

