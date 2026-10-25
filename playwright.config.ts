import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

/**
 * Browser tests of real behaviour: navigation, project cards, case-study
 * contents, reduced motion. Files are named *.e2e.ts so `bun test` (unit
 * tests) never picks them up.
 *
 * They run against a production build (built into .next-e2e, served on port
 * 3100), not the dev server: no on-demand compiling to wait for, and it's
 * what visitors actually get. Needs Node.js to launch Chromium.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // The site picks its language from localStorage, then the browser; pin English.
    locale: "en-US",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } }],
  webServer: {
    command: `bun run build && bun run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    env: { NEXT_DIST_DIR: ".next-e2e" },
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
