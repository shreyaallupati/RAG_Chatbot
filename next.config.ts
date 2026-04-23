import type { NextConfig } from "next";
import path from 'path'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Adjust based on your expected PDF sizes
    },
  },
  outputFileTracingRoot: path.join(__dirname, './'),
  serverExternalPackages : ["pdf-parse", "unpdf"]
};

export default nextConfig;
