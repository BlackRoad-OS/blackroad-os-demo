/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
