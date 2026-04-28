import { test, expect } from "@playwright/test";

test.describe("Presentation shell golden path", () => {
  test("sticky slide behavior works on desktop and falls back on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const slides = page.locator("section[data-presentation-slide='true']");
    await expect(slides).toHaveCount(4);

    const firstStage = slides.first().locator("[data-scene-stage='true']");
    await expect(firstStage).toBeVisible();
    await expect(firstStage).toHaveCSS("position", "sticky");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await page.waitForLoadState("networkidle");

    const mobileStage = page
      .locator("section[data-presentation-slide='true']")
      .first()
      .locator("[data-scene-stage='true']");

    await expect(mobileStage).toHaveCSS("position", "static");
  });

  test("scene variants render on the exhibit route", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const plainScene = page.locator("section[data-scene-kind='plain']").first();
    const backgroundScene = page
      .locator("section[data-scene-kind='background']")
      .first();
    const splitScene = page.locator("section[data-scene-kind='split']").first();
    const reverseScene = page
      .locator("section[data-scene-kind='split-reverse']")
      .first();

    await expect(plainScene).toBeVisible();
    await expect(backgroundScene).toBeVisible();
    await expect(splitScene).toBeVisible();
    await expect(reverseScene).toBeVisible();

    await expect(plainScene.locator("img")).toHaveCount(0);
    await expect(
      backgroundScene.getByRole("img", { name: "Energy Density background" }),
    ).toBeVisible();
    await expect(splitScene.getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    await expect(reverseScene.getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );

    await expect(
      page.getByRole("heading", { name: "The Power of Nuclear Energy" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Energy Density" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "How a Reactor Makes Electricity" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why This Matters" })).toBeVisible();
  });
});