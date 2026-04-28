import fs from "node:fs";
import path from "node:path";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PresentationShell } from "@/components/presentation/presentation-shell";
import { parseSceneMarkdown } from "@/lib/scene-parser";

describe("PresentationShell + PresentationSlide", () => {
  it("renders parsed scenes through the slide wrapper seam", () => {
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
    expect(slides).toHaveLength(8);
    expect(slides[0]).toHaveAttribute("data-presentation-slide", "true");
    expect(slides[0]).toHaveAttribute("data-scene-kind", "split");
    expect(slides[1]).toHaveAttribute("data-scene-kind", "split-reverse");
    expect(slides[2]).toHaveAttribute("data-scene-kind", "split");
    expect(slides[3]).toHaveAttribute("data-scene-kind", "split-reverse");
    expect(slides[4]).toHaveAttribute("data-scene-kind", "split");
    expect(slides[5]).toHaveAttribute("data-scene-kind", "split");
    expect(slides[6]).toHaveAttribute("data-scene-kind", "split-reverse");
    expect(slides[7]).toHaveAttribute("data-scene-kind", "timeline");
  });

  it("handles parser failure mode at the seam by rendering the shell empty state", () => {
    const scenes = parseSceneMarkdown("   \n\t ");

    render(<PresentationShell scenes={scenes} />);

    expect(
      screen.getByText("No presentation scenes are available yet."),
    ).toBeVisible();
    expect(screen.queryAllByRole("region")).toHaveLength(0);
  });
});