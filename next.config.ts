import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Keeping this to preserve existing image behavior. Cloudflare Workers
    // can serve optimized images too, but that's a separate setup.
    unoptimized: true,
  },
};

// Wires up Cloudflare bindings (D1, secrets) so they're accessible from
// `next dev`. Without this, getCloudflareContext() returns undefined in dev.
initOpenNextCloudflareForDev();

export default nextConfig;
