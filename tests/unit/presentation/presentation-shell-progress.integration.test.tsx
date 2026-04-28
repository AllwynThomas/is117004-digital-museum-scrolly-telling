import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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

describe("PresentationShell + PresentationProgress seam", () => {
  it("preserves document-first reading order by rendering scene content before the fixed progress UI", () => {
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
    const progress = screen.getByRole("navigation", {
      name: "Presentation progress",
    });

    expect(main.firstElementChild).toBe(sections[0]);
    expect(main.lastElementChild).toBe(progress);
    expect(
      sections[sections.length - 1]?.compareDocumentPosition(progress),
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("updates the visible progress indicator from shared shell state and jumps through canonical scene anchors", async () => {
    const scrollIntoView = vi.fn();

    setViewport(1440, 1000);
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(
      <PresentationShell
        scenes={[
          createScene("# Opening\nIntro copy."),
          createScene("# Evidence\nMore copy."),
          createScene("# Why This Matters\nClosing copy."),
        ]}
      />,
    );

    const sections = screen.getAllByRole("region");
    mockSceneRect(sections[0]!, { top: -200, height: 1700 });
    mockSceneRect(sections[1]!, { top: 1500, height: 1700 });
    mockSceneRect(sections[2]!, { top: 3200, height: 1700 });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.getByText("Scene 1 of 3: Opening")).toBeVisible();
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Go to scene 3: Why This Matters" }),
    );

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  it("uses non-animated scene jumps when reduced motion is preferred", async () => {
    const scrollIntoView = vi.fn();

    setViewport(1440, 1000);
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(
      <PresentationShell
        scenes={[
          createScene("# Opening\nIntro copy."),
          createScene("# Evidence\nMore copy."),
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Go to scene 2: Evidence" }),
    );

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
      inline: "nearest",
    });
  });

  it("fails safely back to smooth scrolling when matchMedia is unavailable", async () => {
    const scrollIntoView = vi.fn();

    setViewport(1440, 1000);
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(
      <PresentationShell
        scenes={[
          createScene("# Opening\nIntro copy."),
          createScene("# Evidence\nMore copy."),
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Go to scene 2: Evidence" }),
    );

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  it("fails safely by omitting the progress UI when the shell has no scenes", () => {
    render(<PresentationShell scenes={[]} />);

    expect(
      screen.queryByRole("navigation", { name: "Presentation progress" }),
    ).toBeNull();
  });
});