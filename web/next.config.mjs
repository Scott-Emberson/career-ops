/** @type {import('next').NextConfig} */
const nextConfig = {
  // Two lockfiles exist on purpose (repo root + web/), so Next would infer the
  // repo root as the workspace root. On Windows that misinference can send
  // Turbopack's postcss workers into an unbounded respawn loop that exhausts
  // all RAM (vercel/next.js#92978) — pin the root to this app.
  turbopack: { root: import.meta.dirname },
  // Allow a throwaway build dir (e.g. BUILD_DIST=.next-prod) so a production
  // `next build` can run without clobbering a live `next dev` .next.
  ...(process.env.BUILD_DIST ? { distDir: process.env.BUILD_DIST } : {}),
  // Reach the dev server from other devices (e.g. an iPad over Tailscale) without
  // Next's cross-origin dev warning. Set NEXT_DEV_ORIGINS=ip-or-host,another in
  // .env.local (comma-separated). Unset → no extra origins (clean default).
  ...(process.env.NEXT_DEV_ORIGINS
    ? { allowedDevOrigins: process.env.NEXT_DEV_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean) }
    : {}),
};

export default nextConfig;
