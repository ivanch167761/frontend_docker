/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: ["deeptest.ams3.digitaloceanspaces.com/"],
      formats: ["image/webp"],
  },
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
