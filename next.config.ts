import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
