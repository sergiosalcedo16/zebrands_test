/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/gitSearch',
        permanent: true,
      },
      {
        source: '/gitSearch',
        destination: '/gitSearch/usuarios',
        permanent: true,
      },
    ]
  },
  ... nextConfig
}