import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { turbopack: true },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use a simpler, safer devtool for source maps
      config.devtool = "cheap-module-source-map";
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;
