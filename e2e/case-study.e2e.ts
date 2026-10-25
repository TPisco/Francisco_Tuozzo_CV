import { expect, test } from "./fixtures";

test("a contents link jumps to its section and marks it as current", async ({ page }) => {
  await page.goto("/projects/phaseshift");
  const contents = page.getByRole("navigation", { name: "Contents" });

  await contents.getByRole("link", { name: "Key features" }).click();

  await expect(page).toHaveURL(/#features$/);
  await expect(page.getByRole("heading", { name: "Key features", level: 2 })).toBeInViewport();
  await expect(contents.getByRole("link", { name: "Key features" })).toHaveAttribute("aria-current", "true");
  await expect(contents.getByRole("link", { name: "About the project" })).not.toHaveAttribute("aria-current", "true");
});

test("the back link returns to the work list", async ({ page }) => {
  await page.goto("/projects/orbital");

  await page.getByRole("link", { name: "Back to projects" }).click();

  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("list", { name: "Selected work" })).toBeVisible();
});
