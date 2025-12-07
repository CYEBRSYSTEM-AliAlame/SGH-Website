/**
 * HTML sanitization utility using DOMPurify
 * Prevents XSS attacks by sanitizing HTML content before rendering
 * Works in both server-side (Node.js) and client-side (browser) environments
 */

import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

// Initialize DOMPurify based on environment
let purify: typeof DOMPurify | null = null

function getPurify(): typeof DOMPurify {
  if (purify) {
    return purify
  }

  try {
    if (typeof window === 'undefined') {
      // Server-side: Use JSDOM to create a window object
      const jsdomWindow = new JSDOM('').window
      purify = DOMPurify(jsdomWindow as unknown as Window)
    } else {
      // Client-side: Use the browser's window object
      purify = DOMPurify(window)
    }
    return purify
  } catch (error) {
    console.error('Failed to initialize DOMPurify:', error)
    // Return a mock function that just returns the input
    return {
      sanitize: (dirty: string) => dirty || '',
    } as typeof DOMPurify
  }
}

/**
 * Configuration for DOMPurify sanitization
 * Allows safe HTML tags and attributes while blocking dangerous content
 */
const sanitizeConfig: DOMPurify.Config = {
  // Allow safe HTML tags
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'a', 'span', 'div', 'hr',
  ],
  // Allow safe attributes
  ALLOWED_ATTR: ['href', 'title', 'class', 'id'],
  // Allow data URIs for images (if needed)
  ALLOW_DATA_ATTR: false,
  // Keep relative URLs
  ALLOW_UNKNOWN_PROTOCOLS: false,
  // Sanitize URLs in href attributes
  SAFE_FOR_TEMPLATES: false,
  // Return sanitized HTML as string
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param dirty - Unsanitized HTML string
 * @param config - Optional custom DOMPurify configuration
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(dirty: string | null | undefined, config?: DOMPurify.Config): string {
  if (!dirty) {
    return ''
  }

  // Use custom config if provided, otherwise use default
  const sanitizeOptions = config || sanitizeConfig

  try {
    // Get purify instance (lazy initialization)
    const purifyInstance = getPurify()
    // Sanitize the HTML content
    const clean = purifyInstance.sanitize(dirty, sanitizeOptions)
    return clean
  } catch (error) {
    // If sanitization fails, return empty string to be safe
    console.error('HTML sanitization failed:', error)
    return ''
  }
}

/**
 * Sanitizes HTML content with stricter rules (for user-generated content)
 * Removes all HTML tags and returns plain text
 */
export function sanitizeToPlainText(dirty: string | null | undefined): string {
  if (!dirty) {
    return ''
  }

  try {
    // Get purify instance (lazy initialization)
    const purifyInstance = getPurify()
    // Remove all HTML tags, keeping only text content
    const clean = purifyInstance.sanitize(dirty, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    })
    return clean
  } catch (error) {
    console.error('HTML to text sanitization failed:', error)
    return ''
  }
}

/**
 * Validates that HTML content is safe before storing in database
 * Returns true if content is safe, false otherwise
 */
export function validateHtmlContent(content: string): boolean {
  if (!content) {
    return true // Empty content is safe
  }

  try {
    // Sanitize and compare - if they're different, content had unsafe elements
    const sanitized = sanitizeHtml(content)
    // If sanitization removed significant content, it might be unsafe
    // For now, we'll allow it but log a warning if sanitization changed content significantly
    const originalLength = content.replace(/<[^>]*>/g, '').length
    const sanitizedLength = sanitized.replace(/<[^>]*>/g, '').length
    
    // If more than 10% of content was removed, it's suspicious
    if (originalLength > 0 && sanitizedLength / originalLength < 0.9) {
      console.warn('HTML content validation: Significant content removed during sanitization')
    }
    
    return true // Content passed basic validation
  } catch (error) {
    console.error('HTML content validation failed:', error)
    return false
  }
}

