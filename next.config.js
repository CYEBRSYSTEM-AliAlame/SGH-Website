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
  },
  // Vercel optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Disabled to prevent double rendering in development
}

module.exports = nextConfig

