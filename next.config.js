/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoBase = '/Clarion';

const nextConfig = {
  output: 'export',
  basePath: isProd ? repoBase : '',
  assetPrefix: isProd ? repoBase + '/' : '',
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoBase : '',
  },
};

module.exports = nextConfig;
