import { expect, test } from "./fixtures";

test("the Work / Info / Play switch moves between the pages and marks the current one", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });

  await expect(nav.getByRole("link", { name: "Work", exact: true })).toHaveAttribute("aria-current", "page");

  await nav.getByRole("link", { name: "Info", exact: true }).click();

  await expect(page).toHaveURL(/\/info$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("A developer who likes finishing things.");
  await expect(nav.getByRole("link", { name: "Info", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(nav.getByRole("link", { name: "Work", exact: true })).not.toHaveAttribute("aria-current", "page");
});

test("the home page leads with the headline", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("I build software people can actually use.");
});
