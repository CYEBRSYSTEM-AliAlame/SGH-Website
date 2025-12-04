import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/globals.css'

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

