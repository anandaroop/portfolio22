/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
