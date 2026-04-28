import fs from "node:fs";
import path from "node:path";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PresentationShell } from "@/components/presentation/presentation-shell";
import { parseSceneMarkdown } from "@/lib/scene-parser";

describe("PresentationShell + SceneLayout", () => {
  it("renders parsed scene metadata through the layout seam", () => {
    const sceneFile = path.join(
      process.cwd(),
      "content",
      "scenes",
      "digital-museum.md",
    );
    const markdown = fs.readFileSync(sceneFile, "utf8");
    const scenes = parseSceneMarkdown(markdown);

    render(<PresentationShell scenes={scenes} />);

    const slides = screen.getAllByRole("region");
    expect(within(slides[0]!).queryByRole("img")).toBeNull();
    expect(
      within(slides[1]!).getByRole("img", { name: "Energy Density background" }),
    ).toHaveAttribute("src", "/assets/images/uranium_vs_fossil_fuels_diagram.webp");
    expect(within(slides[2]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    expect(within(slides[3]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );
  });

  it("renders readable copy even when a scene has media but no body paragraphs", () => {
    const scenes = parseSceneMarkdown(
      [
        "![split](/diagram.webp)",
        "",
        "## Diagram Only",
      ].join("\n"),
    );

    render(<PresentationShell scenes={scenes} />);

    expect(screen.getByRole("heading", { name: "Diagram Only" })).toBeVisible();
    expect(screen.getByTestId("scene-copy")).toBeVisible();
  });
});