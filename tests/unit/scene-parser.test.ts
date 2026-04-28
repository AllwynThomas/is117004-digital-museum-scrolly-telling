import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { parseSceneMarkdown } from "@/lib/scene-parser";

describe("parseSceneMarkdown", () => {
  it("parses a typical multi-scene markdown source into ordered scene nodes", () => {
    const markdown = [
      "# Opening",
      "Intro copy.",
      "",
      "---",
      "",
      "![bg 50% 35%](/hero.webp)",
      "",
      "## Scene Two",
      "Body copy.",
      "",
      "---",
      "",
      "![split](/diagram.webp)",
      "",
      "## Scene Three",
      "More copy.",
    ].join("\n");

    expect(parseSceneMarkdown(markdown)).toEqual([
      {
        rawContent: "# Opening\nIntro copy.",
        cleanContent: "# Opening\nIntro copy.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
      {
        rawContent: "![bg 50% 35%](/hero.webp)\n\n## Scene Two\nBody copy.",
        cleanContent: "## Scene Two\nBody copy.",
        backgroundSrc: "/hero.webp",
        backgroundFocal: "50% 35%",
        splitSrc: null,
        splitReverseSrc: null,
      },
      {
        rawContent: "![split](/diagram.webp)\n\n## Scene Three\nMore copy.",
        cleanContent: "## Scene Three\nMore copy.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: "/diagram.webp",
        splitReverseSrc: null,
      },
    ]);
  });

  it("throws loudly and safely for non-string input", () => {
    expect(() => parseSceneMarkdown(undefined as never)).toThrow(TypeError);
    expect(() => parseSceneMarkdown(null as never)).toThrow(
      "parseSceneMarkdown expects a string",
    );
  });

  it("returns an empty array for empty or whitespace-only input", () => {
    expect(parseSceneMarkdown("")).toEqual([]);
    expect(parseSceneMarkdown("   \n\t  ")).toEqual([]);
  });

  it("preserves unicode content and ignores empty chunks around separators", () => {
    const markdown = [
      "---",
      "",
      "## Réacteur",
      "Nuclear energy powers 東京 and São Paulo.",
      "",
      "---",
      "",
      "   ",
      "---",
      "",
      "![split-reverse](/chart.webp)",
      "",
      "## 結論",
      "Clean energy context.",
      "",
      "---",
    ].join("\n");

    expect(parseSceneMarkdown(markdown)).toEqual([
      {
        rawContent: "## Réacteur\nNuclear energy powers 東京 and São Paulo.",
        cleanContent: "## Réacteur\nNuclear energy powers 東京 and São Paulo.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
      {
        rawContent: "![split-reverse](/chart.webp)\n\n## 結論\nClean energy context.",
        cleanContent: "## 結論\nClean energy context.",
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: "/chart.webp",
      },
    ]);
  });

  it("parses the canonical digital museum scene source with all scoped directives", () => {
    const sceneFile = path.join(
      process.cwd(),
      "content",
      "scenes",
      "digital-museum.md",
    );
    const markdown = fs.readFileSync(sceneFile, "utf8");

    const scenes = parseSceneMarkdown(markdown);

    expect(scenes).toHaveLength(4);
    expect(scenes[0]?.cleanContent).toContain("The Power of Nuclear Energy");
    expect(scenes[1]).toMatchObject({
      backgroundSrc: "/assets/images/uranium_vs_fossil_fuels_diagram.webp",
      backgroundFocal: "50% 35%",
    });
    expect(scenes[2]).toMatchObject({
      splitSrc: "/assets/images/nuclearplant.gif",
    });
    expect(scenes[3]).toMatchObject({
      splitReverseSrc:
        "/assets/images/safest_cleanest_sources_of_energy_chart.webp",
    });
  });
});