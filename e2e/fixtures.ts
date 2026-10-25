import { expect, test as base } from "@playwright/test";

/** Every test starts as a returning visitor, so the name intro doesn't cover the page (intro.e2e.ts tests it). */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
    await use(page);
  },
});

export { expect };
