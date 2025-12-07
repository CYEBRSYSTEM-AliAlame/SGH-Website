import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'
import { checkRateLimit, defaultRateLimit } from './lib/rateLimit'
import { generateNonce } from './lib/nonce'
import { isValidRedirect, isAllowedRedirectPath } from './lib/redirectValidation'

// Maximum request size (1MB)
const MAX_REQUEST_SIZE = 1024 * 1024 // 1MB

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check request size for API routes
    if (pathname.startsWith('/api/')) {
        // Check Content-Length header if present
        const contentLength = request.headers.get('content-length')
        if (contentLength) {
            const size = parseInt(contentLength, 10)
            if (!isNaN(size) && size > MAX_REQUEST_SIZE) {
                return NextResponse.json(
                    { error: 'Request too large', code: 'REQUEST_TOO_LARGE' },
                    { status: 413 }
                )
            }
        }
        
        // Apply rate limiting to API routes
        const rateLimitResult = checkRateLimit(request, defaultRateLimit)
        
        if (!rateLimitResult.allowed) {
            const response = NextResponse.json(
                { error: 'Too many requests. Please try again later.', code: 'RATE_LIMIT_EXCEEDED' },
                { status: 429 }
            )
            
            // Add rate limit headers
            response.headers.set('X-RateLimit-Limit', defaultRateLimit.maxRequests.toString())
            response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString())
            response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString())
            if (rateLimitResult.retryAfter) {
                response.headers.set('Retry-After', rateLimitResult.retryAfter.toString())
            }
            
            return response
        }
    }

    // Generate nonce for CSP
    const nonce = generateNonce()
    
    // Security headers
    const response = NextResponse.next()

    // Add security headers to all responses
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    
    // HSTS - only on HTTPS
    if (request.nextUrl.protocol === 'https:') {
        response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    }
    
    // Store nonce in response headers for use in CSP
    response.headers.set('X-Nonce', nonce)
    
    // Set CSP based on environment
    // In development, allow Next.js scripts to load
    // In production, use stricter CSP
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
        // Development CSP - allow Next.js and HMR to work
        response.headers.set('Content-Security-Policy', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: *.amazonaws.com sahelhospital.com api.dicebear.com",
            "font-src 'self' data:",
            "connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:*",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join('; '))
    } else {
        // Production CSP - stricter security (OWASP ASVS Level 3 compliant)
        // Removed 'unsafe-inline' from script-src and use nonces exclusively
        response.headers.set('Content-Security-Policy', [
            "default-src 'self'",
            `script-src 'self' 'strict-dynamic' 'nonce-${nonce}'`,
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: *.amazonaws.com sahelhospital.com api.dicebear.com",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
        ].join('; '))
    }

    // Skip locale handling for API routes - they should be at /api/* not /en/api/*
    if (pathname.startsWith('/api/')) {
        // API routes don't need locale prefixes, just return with security headers
        return response
    }

    // Skip locale handling for static assets - they should be at /assets/* not /en/assets/*
    if (pathname.startsWith('/assets/')) {
        // Static assets don't need locale prefixes, just return with security headers
        return response
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = defaultLocale
        
        // Build redirect path
        const redirectPath = `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
        
        // Validate redirect path is allowed
        if (!isAllowedRedirectPath(redirectPath)) {
            // If redirect path is not allowed, redirect to default locale home
            const safeRedirect = `/${locale}`
            const redirectResponse = NextResponse.redirect(
                new URL(safeRedirect, request.url)
            )
            
            // Copy security headers to redirect response
            response.headers.forEach((value, key) => {
                redirectResponse.headers.set(key, value)
            })
            
            return redirectResponse
        }
        
        // Build redirect URL and validate it's safe
        const redirectUrl = new URL(redirectPath, request.url)
        
        // Validate redirect is safe (same origin)
        if (!isValidRedirect(redirectUrl.toString(), request.nextUrl.origin)) {
            // If redirect is unsafe, redirect to default locale home
            const safeRedirect = `/${locale}`
            const redirectResponse = NextResponse.redirect(
                new URL(safeRedirect, request.url)
            )
            
            // Copy security headers to redirect response
            response.headers.forEach((value, key) => {
                redirectResponse.headers.set(key, value)
            })
            
            return redirectResponse
        }

        // Redirect if there is no locale (safe redirect)
        const redirectResponse = NextResponse.redirect(redirectUrl)
        
        // Copy security headers to redirect response
        response.headers.forEach((value, key) => {
            redirectResponse.headers.set(key, value)
        })
        
        return redirectResponse
    }

    return response
}

export const config = {
    matcher: [
        // Include API routes and all other routes except internal Next.js paths and static assets
        '/((?!_next/static|_next/image|favicon.ico|images|assets).*)',
    ],
}
