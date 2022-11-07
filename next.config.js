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
      },
  swcMinify: true,
  output: 'standalone',
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = nextConfig
