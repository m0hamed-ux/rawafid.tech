import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Common typo: the AI-crawler convention file is llms.txt (plural).
      {
        source: "/llm.txt",
        destination: "/llms.txt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
