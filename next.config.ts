import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['files.stripe.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;
