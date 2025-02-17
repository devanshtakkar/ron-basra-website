import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iss-cdn.myrealpage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
