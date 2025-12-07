import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'

// Note: GeistSans is a pre-configured NextFontWithVariable instance
// Geist Mono has been removed from root layout to prevent unnecessary preloading
// since it's not used on most pages. It can be loaded conditionally if needed.

export const metadata: Metadata = {
  title: 'Sahel General Hospital',
  description: 'Sahel General Hospital - Providing exceptional healthcare services since 1983',
  keywords: ['hospital', 'healthcare', 'Lebanon', 'medical services'],
  authors: [{ name: 'Sahel General Hospital' }],
  openGraph: {
    title: 'Sahel General Hospital',
    description: 'Sahel General Hospital - Providing exceptional healthcare services since 1983',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        {/* Force immediate font usage via inline style to prevent preload warnings */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Ensure font is used immediately with a pseudo-element that renders before content */
              html::before {
                content: 'A';
                position: absolute;
                opacity: 0;
                pointer-events: none;
                font-size: 1px;
                left: -9999px;
                top: -9999px;
                font-family: var(--font-geist-sans, 'Geist Sans', system-ui, sans-serif);
                z-index: -1;
              }
            `,
          }}
        />
      </head>
      <body 
        className={`${GeistSans.className} min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}

