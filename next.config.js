/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nid.naver.com',
        // bport: '',
        pathname: '/oauth/*',
      },
    ],
  },
}

module.exports = nextConfig
