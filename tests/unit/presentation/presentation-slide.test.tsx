import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PresentationSlide,
  getSceneProgress,
  useSceneProgress,
} from "@/components/presentation/presentation-slide";

function ProgressConsumer() {
  const progress = useSceneProgress();
  return <output>{progress.toFixed(2)}</output>;
}

describe("getSceneProgress", () => {
  it("returns normalized progress for a typical desktop sticky scene", () => {
    expect(
      getSceneProgress({
        sectionTop: -350,
        sectionHeight: 1700,
        viewportHeight: 1000,
      }),
    ).toBeCloseTo(0.5, 5);
  });

  it("fails loudly for invalid dimensions", () => {
    expect(() =>
      getSceneProgress({
        sectionTop: 0,
        sectionHeight: 0,
        viewportHeight: 1000,
      }),
    ).toThrow("sectionHeight must be greater than viewportHeight");

    expect(() =>
      getSceneProgress({
        sectionTop: 0,
        sectionHeight: 1500,
        viewportHeight: 0,
      }),
    ).toThrow("viewportHeight must be greater than 0");
  });

  it("clamps progress at off-by-one boundaries", () => {
    expect(
      getSceneProgress({
        sectionTop: 25,
        sectionHeight: 1700,
        viewportHeight: 1000,
      }),
    ).toBe(0);

    expect(
      getSceneProgress({
        sectionTop: -1000,
        sectionHeight: 1700,
        viewportHeight: 1000,
      }),
    ).toBe(1);
  });
});

describe("PresentationSlide", () => {
  it("renders a sticky-scene wrapper and provides default progress to children", () => {
    render(
      <PresentationSlide index={1} sceneKind="plain">
        <ProgressConsumer />
        <p>Slide content</p>
      </PresentationSlide>,
    );

    const slide = screen.getByRole("region");
    expect(slide).toHaveAttribute("id", "scene-2");
    expect(slide).toHaveAttribute("data-presentation-slide", "true");
    expect(slide).toHaveAttribute("data-scene-kind", "plain");
    expect(screen.getByText("Slide content")).toBeVisible();
    expect(screen.getByText("0.00")).toBeVisible();
  });

  it("fails safely when a consumer is rendered outside the slide provider", () => {
    expect(() => render(<ProgressConsumer />)).toThrow(
      "useSceneProgress must be used within PresentationSlide",
    );
  });

  it("preserves unicode children and background scene metadata", () => {
    render(
      <PresentationSlide index={0} sceneKind="background" backgroundSrc="/hero.webp">
        <p>東京 and São Paulo remain readable.</p>
      </PresentationSlide>,
    );

    const slide = screen.getByRole("region");
    expect(slide).toHaveAttribute("data-scene-kind", "background");
    expect(slide).toHaveAttribute("data-background-src", "/hero.webp");
    expect(screen.getByText(/東京 and São Paulo/)).toBeVisible();
  });
});