/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  experimental: { esmExternals: true },
}

module.exports = nextConfig
