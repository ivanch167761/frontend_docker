/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['external-content.duckduckgo.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
    ],
  },
  swcMinify: true,
  output: 'standalone',
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = nextConfig
