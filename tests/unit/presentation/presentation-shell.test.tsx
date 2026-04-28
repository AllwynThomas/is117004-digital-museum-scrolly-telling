import fs from "node:fs";
import path from "node:path";

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { parseSceneMarkdown, type SceneNode } from "@/lib/scene-parser";
import { PresentationShell } from "@/components/presentation/presentation-shell";

describe("PresentationShell", () => {
  it("renders a main landmark and one section per scene", () => {
    const scenes: SceneNode[] = [
      {
        rawContent: "# Opening\nIntro copy.",
        cleanContent: "# Opening\nIntro copy.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
      {
        rawContent: "## Scene Two\nMore copy.",
        cleanContent: "## Scene Two\nMore copy.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
    ];

    render(<PresentationShell scenes={scenes} />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");

    const sections = within(main).getAllByRole("region");
    expect(sections).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Opening" })).toBeVisible();
    expect(screen.getByText("Intro copy.")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Scene Two" })).toBeVisible();
  });

  it("fails safely for an empty scene list", () => {
    render(<PresentationShell scenes={[]} />);

    expect(screen.getByRole("main")).toBeVisible();
    expect(
      screen.getByText("No presentation scenes are available yet."),
    ).toBeVisible();
    expect(screen.queryAllByRole("region")).toHaveLength(0);
  });

  it("preserves unicode copy and falls back when a scene has no heading", () => {
    const scenes: SceneNode[] = [
      {
        rawContent: "Narrative only.\n東京とSão Paulo are both mentioned.",
        cleanContent: "Narrative only.\n東京とSão Paulo are both mentioned.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
    ];

    render(<PresentationShell scenes={scenes} />);

    expect(screen.getByRole("heading", { name: "Scene 1" })).toBeVisible();
    expect(screen.getByText(/東京とSão Paulo/)).toBeVisible();
  });

  it("renders the canonical scene file through the real parser", () => {
    const sceneFile = path.join(
      process.cwd(),
      "content",
      "scenes",
      "digital-museum.md",
    );
    const markdown = fs.readFileSync(sceneFile, "utf8");
    const scenes = parseSceneMarkdown(markdown);

    render(<PresentationShell scenes={scenes} />);

    expect(screen.getAllByRole("region")).toHaveLength(4);
    expect(
      screen.getByRole("heading", { name: "The Power of Nuclear Energy" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Energy Density" })).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "How a Reactor Makes Electricity" }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Why This Matters" })).toBeVisible();
  });

  it("renders media metadata as scene attributes for later layout phases", () => {
    const scenes: SceneNode[] = [
      {
        rawContent: "![bg](/hero.webp)\n\n## Energy Density",
        cleanContent: "## Energy Density",
        backgroundSrc: "/hero.webp",
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
      {
        rawContent: "![split-reverse](/chart.webp)\n\n## Evidence",
        cleanContent: "## Evidence",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: "/chart.webp",
      },
    ];

    render(<PresentationShell scenes={scenes} />);

    const regions = screen.getAllByRole("region");
    expect(regions[0]).toHaveAttribute("data-scene-kind", "background");
    expect(regions[1]).toHaveAttribute("data-scene-kind", "split-reverse");
  });
});