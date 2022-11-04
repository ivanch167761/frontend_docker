/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      remotePatterns: [
            {
        protocol: "https",
        hostname: ["deeptest.ams3.digitaloceanspaces.com"],
        pathname: '/media/**',
        port: '',
            },
      ],
  },
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
