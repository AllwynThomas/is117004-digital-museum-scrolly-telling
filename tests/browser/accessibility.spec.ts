import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility — automated audit", () => {
  test("should have zero critical or serious axe-core violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    if (critical.length > 0) {
      const details = critical
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} instance(s))`,
        )
        .join("\n");
      console.error("Accessibility violations:\n" + details);
    }

    expect(critical).toHaveLength(0);
  });

  test("all images have non-empty alt attributes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const images = await page.locator("img").all();
    expect(images.length).toBeGreaterThan(0);

    for (const img of images) {
      const alt = await img.getAttribute("alt");
      // alt must exist and be non-empty (or explicitly "" for decorative with role=presentation)
      const role = await img.getAttribute("role");
      if (alt === "" && role === "presentation") continue;
      expect(
        alt,
        `Image missing alt: ${await img.getAttribute("src")}`,
      ).toBeTruthy();
    }
  });

  test("HTML landmarks are present and the header remains usable", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: "Nuclear Energy Museum" }),
    ).toHaveCount(1);
  });

  test("every section has aria-labelledby pointing to its heading", async ({
    page,
  }) => {
    await page.goto("/");

    const sections = await page.locator("section[aria-labelledby]").all();
    expect(sections.length).toBeGreaterThanOrEqual(4);

    for (const section of sections) {
      const labelledBy = await section.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();

      const heading = section.locator(`#${labelledBy}`);
      await expect(heading).toHaveCount(1);
      await expect(section).toHaveAttribute("data-presentation-slide", "true");
    }
  });

  test("skip-to-content link is present and targets #main-content", async ({
    page,
  }) => {
    await page.goto("/");

    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);

    const main = page.locator("#main-content");
    await expect(main).toHaveCount(1);
  });

  test("all images load successfully (no broken images)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const imageSrcs = await page
      .locator("img")
      .evaluateAll((imgs: HTMLImageElement[]) => imgs.map((img) => img.src));
    expect(imageSrcs.length).toBeGreaterThan(0);

    for (const src of imageSrcs) {
      const response = await page.request.get(src);
      expect(
        response.status(),
        `Broken image (HTTP ${response.status()}): ${src}`,
      ).toBe(200);
    }
  });
});
