/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    LANGFLOW_APPLICATION_TOKEN: process.env.LANGFLOW_APPLICATION_TOKEN,
  },
};

module.exports = nextConfig;