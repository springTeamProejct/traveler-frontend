/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BACKEND_ADDRESS: 'http://localhost:8000',
  }
}

module.exports = nextConfig
