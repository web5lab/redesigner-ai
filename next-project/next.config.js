/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'ui-avatars.com',
      'via.placeholder.com',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    VITE_SERVER_URL: process.env.VITE_SERVER_URL,
    VITE_FILE_SERVER_URL: process.env.VITE_FILE_SERVER_URL,
    VITE_FRONTEND_URL: process.env.VITE_FRONTEND_URL,
    VITE_PAYMENT_URL: process.env.VITE_PAYMENT_URL,
    VITE_EXTENSION_ID: process.env.VITE_EXTENSION_ID,
    VITE_NETLIFY_AUTH_TOKEN: process.env.VITE_NETLIFY_AUTH_TOKEN,
  },
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig