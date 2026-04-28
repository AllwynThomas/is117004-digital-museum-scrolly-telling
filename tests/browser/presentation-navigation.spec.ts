import { test, expect } from "@playwright/test";

test.describe("Presentation navigation", () => {
  test("active scene sync updates as the page scrolls through the exhibit", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const main = page.locator("main[data-presentation-shell='true']");

    await expect(main).toHaveAttribute("data-active-scene", "1");
    await expect(page.locator("section#scene-1")).toHaveAttribute(
      "data-active-scene",
      "true",
    );

    await page.locator("section#scene-2").evaluate((element) => {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    });

    await expect(main).toHaveAttribute("data-active-scene", "2");
    await expect(page.locator("section#scene-2")).toHaveAttribute(
      "data-active-scene",
      "true",
    );
  });

  test("presentation progress shows the active scene and supports scene jumps via click or tap", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("navigation", { name: "Presentation progress" }),
    ).toBeVisible();
    await expect(page.getByText("Scene 1 of 4: The Power of Nuclear Energy")).toBeVisible();

    await page.getByRole("button", { name: "Go to scene 4: Why This Matters" }).click();

    await expect(
      page.getByText("Scene 4 of 4: Why This Matters"),
    ).toBeVisible();
    await expect(page.locator("main[data-presentation-shell='true']")).toHaveAttribute(
      "data-active-scene",
      "4",
    );
    await expect(page.locator("section#scene-4")).toHaveAttribute(
      "data-active-scene",
      "true",
    );
  });

  test("reduced motion keeps the exhibit readable and uses non-animated scene jumps", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "The Power of Nuclear Energy" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Presentation progress" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Go to scene 4: Why This Matters" }).click();

    await expect(
      page.getByText("Scene 4 of 4: Why This Matters"),
    ).toBeVisible();
    await expect(page.locator("main[data-presentation-shell='true']")).toHaveAttribute(
      "data-active-scene",
      "4",
    );
  });

  test("keyboard presentation navigation reaches the progress controls and jumps scenes without traps", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.keyboard.press("Tab");
    await expect(page.locator('a[href="#main-content"]')).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Nuclear Energy Museum" }),
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Go to scene 1: The Power of Nuclear Energy" }),
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Go to scene 2: Energy Density" }),
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Go to scene 4: Why This Matters" }),
    ).toBeFocused();

    await page.keyboard.press("Enter");

    await expect(
      page.getByText("Scene 4 of 4: Why This Matters"),
    ).toBeVisible();
    await expect(page.locator("main[data-presentation-shell='true']")).toHaveAttribute(
      "data-active-scene",
      "4",
    );
  });
});