import { expect, test } from "@playwright/test";

test("the Play tab lists the games, and a card's button opens its game full screen", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("link", { name: "Play", exact: true }).click();

  await expect(page).toHaveURL(/\/play$/);
  await expect(nav.getByRole("link", { name: "Play", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("heading", { level: 2, name: "Run, Francisco!" })).toBeVisible();

  await page.getByRole("link", { name: "Play Run, Francisco!" }).click();

  await expect(page).toHaveURL(/\/play\/run-francisco$/);
  // Full screen: the site's navbar is gone, and the controls card opens first.
  await expect(page.getByRole("navigation", { name: "Main" })).toHaveCount(0);
  await expect(page.getByRole("dialog", { name: "How to play" })).toBeVisible();
});

test("a new game starts at the first level", async ({ page }) => {
  await page.goto("/play/run-francisco");
  await page.getByRole("button", { name: "Let's go" }).click();
  await page.getByRole("button", { name: "New game" }).click();

  await expect(page.getByText("Level 1: Campus")).toBeVisible();
  await expect(page.getByText("Outrun the bugs!")).toBeVisible();
});

test("from inside a game, the menu leads back to the portfolio", async ({ page }) => {
  await page.goto("/play/run-francisco");
  await page.getByRole("button", { name: "Let's go" }).click();
  await page.getByRole("button", { name: "New game" }).click();

  await page.keyboard.press("Escape");
  const menu = page.getByRole("dialog", { name: "Paused" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Back to the portfolio" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("I build software people can actually use.");
});

test("the Menu button is always on screen and reopens the controls card", async ({ page }) => {
  await page.goto("/play/run-francisco");
  await page.getByRole("button", { name: "Let's go" }).click();

  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("dialog", { name: "Paused" }).getByRole("button", { name: "How to play" }).click();

  await expect(page.getByRole("dialog", { name: "How to play" })).toBeVisible();
});
