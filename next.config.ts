import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force cache busting
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Disable static optimization for main page
  trailingSlash: false,
  // Configuration pour forcer le rechargement
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
