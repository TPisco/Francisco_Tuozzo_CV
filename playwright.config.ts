import { defineConfig, devices } from "@playwright/test";

/**
 * Browser tests of real behaviour: navigation, project cards, case-study
 * contents, reduced motion. Files are named *.e2e.ts so `bun test` (unit
 * tests) never picks them up.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    // The site picks its language from localStorage, then the browser; pin English.
    locale: "en-US",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } }],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
