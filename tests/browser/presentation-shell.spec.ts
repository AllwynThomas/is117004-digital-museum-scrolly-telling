import { test, expect } from "@playwright/test";

test.describe("Presentation shell golden path", () => {
  test("sticky slide behavior works on desktop and falls back on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const slides = page.locator("section[data-presentation-slide='true']");
    await expect(slides).toHaveCount(8);

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

    const splitScenes = page.locator("section[data-scene-kind='split']");
    const reverseScene = page
      .locator("section[data-scene-kind='split-reverse']")
      .first();
    const timelineScene = page
      .locator("section[data-scene-kind='timeline']")
      .first();

    await expect(splitScenes).toHaveCount(4);
    await expect(reverseScene).toBeVisible();
    await expect(timelineScene).toBeVisible();

    await expect(page.locator("section#scene-1 [data-testid='scene-media'] img")).toBeVisible();
    await expect(page.locator("section#scene-1").getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    await expect(page.locator("section#scene-5 [data-testid='scene-media'] img")).toBeVisible();
    await expect(splitScenes.first().getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    await expect(reverseScene.getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );
    await expect(timelineScene.getByText("Chicago Pile-1")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "The Power of Nuclear Energy" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Energy Density" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "How a Reactor Makes Electricity" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Why Nuclear Beats Fossil Fuels" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "The Rise of Nuclear Power" }),
    ).toBeVisible();
  });
});