import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["lh5.googleusercontent.com", "maps.googleapis.com", "lh3.googleusercontent.com"], // Allow images from this domain
  },
};

export default nextConfig;
