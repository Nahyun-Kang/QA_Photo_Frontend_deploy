/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
    appDir: true,
    concurrentFeatures: true,
    serverComponents: true,
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
