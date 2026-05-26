import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gracon.onrender.com/:path*', // Proxy to Backend
      },
    ]
  },
};

export default nextConfig;
