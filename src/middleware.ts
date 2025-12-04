import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = defaultLocale

        // Redirect if there is no locale
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
}
