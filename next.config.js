/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
      images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.digitaloceanspaces.com',
      },
    ],
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
