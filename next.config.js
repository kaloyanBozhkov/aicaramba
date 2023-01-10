/** @type {import('next').NextConfig} */
const StylelintPlugin = require('stylelint-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin())
    return config
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
