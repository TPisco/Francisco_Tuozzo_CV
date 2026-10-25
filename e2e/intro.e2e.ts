import { expect, test } from "@playwright/test";

test("a first visit opens on the name intro, and any key lifts it", async ({ page }) => {
  await page.goto("/");
  const intro = page.locator(".intro");
  await expect(intro).toBeVisible();
  // Hidden from screen readers: the page is already there underneath.
  await expect(intro).toHaveAttribute("aria-hidden", "true");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("I build software people can actually use.");

  await page.keyboard.press("Tab");
  await expect(intro).toBeHidden();
});

test("it ends on its own and doesn't come back in the same session", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".intro")).toBeHidden({ timeout: 5000 });

  await page.goto("/info");
  await expect(page.locator(".intro")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.dataset.intro)).toBe("skip");
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("there is no intro at all", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".intro")).toBeHidden();
  });
});

test("a game opens straight away, without the intro", async ({ page }) => {
  await page.goto("/play/run-francisco");
  await expect(page.getByRole("dialog", { name: "How to play" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.dataset.intro)).toBe("skip");
});

test("the first Tab reaches the skip link, which jumps past the navbar", async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
  await page.goto("/info");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("main#content")).toBeFocused();
});
