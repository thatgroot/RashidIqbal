import type { NextConfig } from "next";
import { withPostHogConfig } from "@posthog/nextjs-config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 544, 600],
    minimumCacheTTL: 60,
    qualities: [75, 85],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

// PostHog source maps configuration for error tracking
export default withPostHogConfig(nextConfig, {
  personalApiKey: process.env.NEXT_PUBLIC_PH_PERSONAL_API_KEY || "",
  envId: "265682",
  host: "https://us.i.posthog.com",
  sourcemaps: {
    enabled: !!process.env.NEXT_PUBLIC_PH_PERSONAL_API_KEY,
    deleteAfterUpload: true,
  },
});
