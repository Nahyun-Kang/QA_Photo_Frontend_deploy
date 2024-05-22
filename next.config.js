/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData:
      "@use '@/app/_styles/_fonts.scss'; @use '@/app/_styles/_colors.scss'; @use '@/app/_styles/_device.scss';",
  },
}

module.exports = nextConfig
