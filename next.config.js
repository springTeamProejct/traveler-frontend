/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nid.naver.com",
        // bport: '',
        pathname: "/oauth/*",
      },
    ],
  },
  env: {
    BACKEND_ADDRESS: "http://localhost:8000",
    NAVER_CLIENT_ID: "m6QY6NPgPLc6vG4uS3XR",
    NAVER_SECRET_KEY: "JVM0pmrBoK",
    KAKAO_CLIENT_ID: "02ddaa97e21deb004a41e0f09dc46db1",
    KAKAO_SECRET_KEY: "pPQICfz8dWjkudVcKRGmWfdsyUjjvcuw",
  },
};

module.exports = nextConfig;
