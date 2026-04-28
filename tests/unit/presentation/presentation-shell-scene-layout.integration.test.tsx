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
    expect(within(slides[0]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    expect(
      within(slides[0]!).getByRole("img", {
        name: "The Power of Nuclear Energy media",
      }),
    ).toHaveAttribute("src", "/assets/images/nuclear_power_plant_map.png");
    expect(within(slides[1]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );
    expect(
      within(slides[1]!).getByRole("img", { name: "Energy Density media" }),
    ).toHaveAttribute("src", "/assets/images/uranium_vs_fossil_fuels_diagram.webp");
    expect(within(slides[2]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    expect(within(slides[3]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );
    expect(within(slides[4]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "last",
    );
    expect(
      within(slides[4]!).getByRole("img", {
        name: "Addressing Nuclear Safety and Waste media",
      }),
    ).toHaveAttribute("src", "/assets/images/nuclear_spent_fuel.png");
    expect(within(slides[5]!).getByRole("img", { name: "From Uranium to Electricity media" })).toHaveAttribute(
      "src",
      "/assets/images/fuel_cycle.webp",
    );
    expect(within(slides[6]!).getByTestId("scene-media")).toHaveAttribute(
      "data-media-order",
      "first",
    );
    expect(within(slides[7]!).queryByRole("img")).toBeNull();
    expect(within(slides[7]!).getByText("Chicago Pile-1")).toBeVisible();
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