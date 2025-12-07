/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'sahelhospital.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Configure image qualities to support quality 95 used in MainSlider
    qualities: [75, 95],
  },
  // Vercel optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true, // Enable for better security and React best practices
  
  // Note: Request size limits are handled in middleware.ts
  // Next.js API routes have default 4.5MB limit
  
  // Security headers
  // Note: CSP is now handled in middleware.ts to support environment-specific policies
  // This ensures development works while maintaining production security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

