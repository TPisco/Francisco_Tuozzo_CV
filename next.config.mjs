/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The browser tests build into their own folder so they can run while
  // `bun run dev` is using .next (see playwright.config.ts).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
