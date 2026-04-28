import { test, expect } from "@playwright/test";

test.describe("Content integrity audit", () => {
  test("no external image URLs — all images served from /assets/", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const images = await page.locator("img").all();
    for (const img of images) {
      const src = await img.getAttribute("src");
      expect(src, `Image has external URL: ${src}`).not.toMatch(/^https?:\/\//);
    }
  });

  test("all external links have rel=noopener noreferrer and target=_blank", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const externalLinks = await page.locator('a[href^="http"]').all();

    expect(externalLinks.length).toBeGreaterThan(0);

    for (const link of externalLinks) {
      const href = await link.getAttribute("href");
      const rel = await link.getAttribute("rel");
      const target = await link.getAttribute("target");

      expect(rel, `Missing rel on link: ${href}`).toContain("noopener");
      expect(rel, `Missing noreferrer on link: ${href}`).toContain(
        "noreferrer",
      );
      expect(target, `Missing target=_blank on link: ${href}`).toBe("_blank");
    }
  });

  test("presentation scenes expose labeled variants for the exhibit route", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const scenes = page.locator("section[data-presentation-slide='true']");
    await expect(scenes).toHaveCount(4);

    await expect(
      page.locator("section[data-scene-kind='plain']").first(),
    ).toBeVisible();
    await expect(
      page.locator("section[data-scene-kind='background']").first(),
    ).toBeVisible();
    await expect(
      page.locator("section[data-scene-kind='split']").first(),
    ).toBeVisible();
    await expect(
      page.locator("section[data-scene-kind='split-reverse']").first(),
    ).toBeVisible();
  });

  test("background scene image renders at >= 600px width on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const backgroundImage = page
      .locator("section[data-scene-kind='background'] img")
      .first();
    const box = await backgroundImage.boundingBox();
    expect(box).toBeTruthy();
    expect(
      box!.width,
      "Background scene image should be at least 600px wide on desktop",
    ).toBeGreaterThanOrEqual(600);
  });
});

test.describe("Responsive layout verification", () => {
  test("desktop (1440x900) — no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("tablet (768x1024) — no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("mobile (390x844) — no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("minimum viewport (320x568) — no horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("mobile — presentation route keeps a simple brand header", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Nuclear Energy Museum" }),
    ).toBeVisible();
    await expect(page.locator("button[aria-label*='navigation']")).toHaveCount(0);
  });

  test("mobile — no long-form navigation overlay is rendered", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.locator("#mobile-nav-menu")).toHaveCount(0);
  });

  test("all 4 presentation slides render on the page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const sectionIds = ["scene-1", "scene-2", "scene-3", "scene-4"];

    for (const id of sectionIds) {
      await expect(
        page.locator(`section#${id}`),
        `Section #${id} should exist`,
      ).toHaveCount(1);
    }
  });
});
