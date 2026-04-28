import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SceneLayout } from "@/components/presentation/scene-layout";

describe("SceneLayout", () => {
  it("renders the plain variant without a media frame", () => {
    render(
      <SceneLayout
        sceneKind="plain"
        heading="Opening"
        headingId="scene-1-title"
        paragraphs={["Intro copy."]}
      />,
    );

    const region = screen.getByTestId("scene-layout");
    expect(region).toHaveAttribute("data-scene-layout", "plain");
    expect(screen.getByRole("heading", { name: "Opening" })).toBeVisible();
    expect(screen.getByText("Intro copy.")).toBeVisible();
    expect(within(region).queryByRole("img")).toBeNull();
  });

  it("fails loudly and safely for an unsupported scene kind", () => {
    expect(() =>
      render(
        <SceneLayout
          sceneKind={"unexpected" as never}
          heading="Broken"
          headingId="broken-title"
          paragraphs={["Broken copy."]}
        />,
      ),
    ).toThrow("Unsupported scene layout kind: unexpected");
  });

  it("renders unicode copy and preserves focal metadata on the background variant", () => {
    render(
      <SceneLayout
        sceneKind="background"
        heading="Réacteur"
        headingId="scene-2-title"
        paragraphs={["東京 and São Paulo remain readable."]}
        backgroundSrc="/hero.webp"
        backgroundFocal="50% 35%"
      />,
    );

    expect(screen.getByRole("heading", { name: "Réacteur" })).toBeVisible();
    expect(screen.getByText(/東京 and São Paulo/)).toBeVisible();
    const image = screen.getByRole("img", { name: "Réacteur background" });
    expect(image).toHaveAttribute("src", "/hero.webp");
    expect(image).toHaveAttribute("data-background-focal", "50% 35%");
  });

  it("renders split and split-reverse media in opposite orders", () => {
    const { rerender } = render(
      <SceneLayout
        sceneKind="split"
        heading="How a Reactor Makes Electricity"
        headingId="scene-3-title"
        paragraphs={["Fission creates heat."]}
        mediaSrc="/diagram.webp"
      />,
    );

    const splitLayout = screen.getByTestId("scene-layout");
    expect(splitLayout).toHaveAttribute("data-scene-layout", "split");
    expect(within(splitLayout).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );

    rerender(
      <SceneLayout
        sceneKind="split-reverse"
        heading="Why This Matters"
        headingId="scene-4-title"
        paragraphs={["Evidence remains visible."]}
        mediaSrc="/chart.webp"
      />,
    );

    const reverseLayout = screen.getByTestId("scene-layout");
    expect(reverseLayout).toHaveAttribute("data-scene-layout", "split-reverse");
    expect(within(reverseLayout).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );
  });
});