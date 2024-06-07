/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['qa-photo-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData:
      "@use '@/app/_styles/_fonts.scss'; @use '@/app/_styles/_colors.scss'; @use '@/app/_styles/_device.scss';",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
