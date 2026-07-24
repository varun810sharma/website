import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Keeping this to preserve existing image behavior. Cloudflare Workers
    // can serve optimized images too, but that's a separate setup.
    unoptimized: true,
  },
  // /experience and /projects were template pages carrying another person's
  // CV. They were live routes, so any indexed URL gets a permanent redirect
  // home rather than a 404.
  async redirects() {
    return [
      { source: "/experience", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
    ];
  },
};

// Wires up Cloudflare bindings (D1, secrets) so they're accessible from
// `next dev`. Without this, getCloudflareContext() returns undefined in dev.
initOpenNextCloudflareForDev();

export default nextConfig;
