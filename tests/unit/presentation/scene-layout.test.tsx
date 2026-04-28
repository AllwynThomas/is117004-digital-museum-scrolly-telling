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

  it("prefixes scene media URLs when a GitHub Pages base path is configured", () => {
    const previousBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
    process.env.NEXT_PUBLIC_BASE_PATH = "/is117004-digital-museum-scrolly-telling";

    try {
      const { rerender } = render(
        <SceneLayout
          sceneKind="split"
          heading="Diagram"
          headingId="scene-media-title"
          paragraphs={["Evidence remains visible."]}
          mediaSrc="/assets/images/diagram.webp"
        />,
      );

      expect(screen.getByRole("img", { name: "Diagram media" })).toHaveAttribute(
        "src",
        "/is117004-digital-museum-scrolly-telling/assets/images/diagram.webp",
      );

      rerender(
        <SceneLayout
          sceneKind="background"
          heading="Backdrop"
          headingId="scene-background-title"
          paragraphs={["Backdrop copy."]}
          backgroundSrc="/assets/images/hero.webp"
        />,
      );

      expect(screen.getByRole("img", { name: "Backdrop background" })).toHaveAttribute(
        "src",
        "/is117004-digital-museum-scrolly-telling/assets/images/hero.webp",
      );
    } finally {
      if (previousBasePath === undefined) {
        delete process.env.NEXT_PUBLIC_BASE_PATH;
      } else {
        process.env.NEXT_PUBLIC_BASE_PATH = previousBasePath;
      }
    }
  });

  it("renders timeline scenes with the museum timeline UI", () => {
    render(
      <SceneLayout
        sceneKind="timeline"
        heading="The Rise of Nuclear Power"
        headingId="scene-8-title"
        paragraphs={[
          "Sources: [IAEA](https://www.iaea.org/newscenter/news/what-is-nuclear-energy-the-science-of-nuclear-power)",
        ]}
        closingStatement="Nuclear energy is a proven low-carbon power source."
        eyebrow="History"
        timelineEntries={[
          {
            year: "1942",
            title: "Chicago Pile-1",
            description: "The first controlled chain reaction proves fission is usable.",
          },
        ]}
        variant="dark"
      />,
    );

    expect(screen.getByRole("heading", { name: "The Rise of Nuclear Power" })).toBeVisible();
    expect(screen.getByText("1942")).toBeVisible();
    expect(screen.getByText("Chicago Pile-1")).toBeVisible();
    expect(screen.getByText(/proven low-carbon power source/)).toBeVisible();
    expect(screen.getByRole("link", { name: "IAEA" })).toHaveAttribute(
      "href",
      "https://www.iaea.org/newscenter/news/what-is-nuclear-energy-the-science-of-nuclear-power",
    );
  });

  it("renders inline emphasis and external citation links inside scene copy", () => {
    render(
      <SceneLayout
        sceneKind="plain"
        heading="Evidence"
        headingId="scene-evidence-title"
        paragraphs={[
          "**440+ reactors** support the case.",
          "Sources: [IAEA](https://www.iaea.org/newscenter/news/what-is-nuclear-energy-the-science-of-nuclear-power)",
        ]}
      />,
    );

    expect(screen.getByText("440+ reactors", { selector: "strong" })).toBeVisible();
    expect(screen.getByRole("link", { name: "IAEA" })).toHaveAttribute(
      "href",
      "https://www.iaea.org/newscenter/news/what-is-nuclear-energy-the-science-of-nuclear-power",
    );
    expect(screen.getByRole("link", { name: "IAEA" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "IAEA" })).toHaveAttribute(
      "rel",
      expect.stringContaining("noopener"),
    );
  });
});