import { expect, test } from "./fixtures";

const projectCards = (page: import("@playwright/test").Page) =>
  page.getByRole("list", { name: "Selected work" }).getByRole("listitem");

test("every project has a card, and a card opens its case study", async ({ page }) => {
  await page.goto("/");

  await expect(projectCards(page)).toHaveCount(6);

  await projectCards(page).first().getByRole("link", { name: "Insight Dashboard" }).click();

  await expect(page).toHaveURL(/\/projects\/scentory$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Insight Dashboard");
});

test("the list says up front how many projects there are, and links to each", async ({ page }) => {
  await page.goto("/");
  const index = page.getByRole("navigation", { name: "All projects" });
  await expect(index).toBeInViewport();
  await expect(page.getByText("6 projects")).toBeVisible();
  await expect(index.getByRole("link")).toHaveCount(6);

  await index.getByRole("link", { name: "Orbital" }).click();
  await expect(page.locator("#project-orbital")).toBeInViewport();
});

test("a Next project button walks through the list and is gone on the last card", async ({ page }) => {
  await page.goto("/");
  await page.locator("#project-scentory").scrollIntoViewIfNeeded();
  const next = page.getByRole("button", { name: /Next project: Phase Shift/ });
  await expect(next).toBeVisible();
  await next.click();
  await expect(page.locator("#project-phaseshift")).toBeInViewport({ ratio: 0.5 });

  await page.locator("#project-knightrpg").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await expect(page.getByRole("button", { name: /Next project/ })).toBeHidden();
});

test("each card says where it sits in the list", async ({ page }) => {
  await page.goto("/");
  await expect(projectCards(page).first().getByText("01 / 06")).toBeVisible();
});

test("the hackathon badge on Phase Shift leads to the event on the Info page", async ({ page }) => {
  await page.goto("/");

  await projectCards(page).getByRole("link", { name: /2nd · Qollab × IonQ/ }).click();

  await expect(page).toHaveURL(/\/info#event-qollabIonq$/);
  await expect(page.locator("#event-qollabIonq")).toBeInViewport();
});

test.describe("scroll scaling", () => {
  // The second card starts below the fold: scroll until only its top edge shows.
  async function peekSecondCard(page: import("@playwright/test").Page) {
    await page.goto("/");
    const card = projectCards(page).nth(1).locator("[data-scroll-scale]");
    const top = await card.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y - window.innerHeight + 120), top);
    await page.waitForTimeout(400);
    return card;
  }

  test("a card grows into place as it scrolls into view", async ({ page }) => {
    const card = await peekSecondCard(page);
    const scale = await card.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
    expect(scale).toBeLessThan(0.99);
  });

  test.describe("with reduced motion", () => {
    test.use({ contextOptions: { reducedMotion: "reduce" } });

    test("cards do not scale", async ({ page }) => {
      const card = await peekSecondCard(page);
      await expect(card).toHaveCSS("transform", "none");
    });
  });
});
