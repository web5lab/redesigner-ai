import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    swcPlugins: [
      [
        "@swc/plugin-styled-jsx",
        {
          "throwIfNamespace": false
        }
      ]
    ]
  },
  images: {
    domains: ['images.pexels.com', 'via.placeholder.com', 'ui-avatars.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_FILE_SERVER_URL: process.env.NEXT_PUBLIC_FILE_SERVER_URL,
    NEXT_PUBLIC_PAYMENT_URL: process.env.NEXT_PUBLIC_PAYMENT_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_EXTENSION_ID: process.env.NEXT_PUBLIC_EXTENSION_ID,
  },
};

export default nextConfig;
