import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { SceneNode } from "@/lib/scene-parser";
import { PresentationShell } from "@/components/presentation/presentation-shell";

function createScene(cleanContent: string): SceneNode {
  return {
    rawContent: cleanContent,
    cleanContent,
    backgroundSrc: null,
    backgroundFocal: null,
    splitSrc: null,
    splitReverseSrc: null,
  };
}

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    writable: true,
    value: height,
  });
}

function mockSceneRect(
  element: Element,
  dimensions: { top: number; height: number },
) {
  Object.defineProperty(element, "getBoundingClientRect", {
    configurable: true,
    value: () => ({
      x: 0,
      y: dimensions.top,
      width: 1000,
      height: dimensions.height,
      top: dimensions.top,
      right: 1000,
      bottom: dimensions.top + dimensions.height,
      left: 0,
      toJSON: () => null,
    }),
  });
}

describe("PresentationShell + presentation navigation", () => {
  it("syncs the active scene with scroll position through one shell-level measurement layer", async () => {
    setViewport(1440, 1000);

    render(
      <PresentationShell
        scenes={[
          createScene("# Opening\nIntro copy."),
          createScene("# Evidence\nMore copy."),
        ]}
      />,
    );

    const main = screen.getByRole("main");
    const sections = screen.getAllByRole("region");

    mockSceneRect(sections[0]!, { top: -200, height: 1700 });
    mockSceneRect(sections[1]!, { top: 1500, height: 1700 });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(main).toHaveAttribute("data-active-scene", "1");
      expect(sections[0]).toHaveAttribute("data-active-scene", "true");
      expect(sections[1]).toHaveAttribute("data-active-scene", "false");
    });

    mockSceneRect(sections[0]!, { top: -1500, height: 1700 });
    mockSceneRect(sections[1]!, { top: 200, height: 1700 });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(main).toHaveAttribute("data-active-scene", "2");
      expect(sections[0]).toHaveAttribute("data-active-scene", "false");
      expect(sections[1]).toHaveAttribute("data-active-scene", "true");
    });
  });

  it("fails safely for an empty scene list by omitting active-scene metadata", () => {
    render(<PresentationShell scenes={[]} />);

    const main = screen.getByRole("main");
    expect(main).not.toHaveAttribute("data-active-scene");
    expect(screen.queryAllByRole("region")).toHaveLength(0);
  });
});