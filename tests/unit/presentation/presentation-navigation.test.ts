import { describe, expect, it } from "vitest";

import {
  clampSceneIndex,
  getActiveSceneIndex,
  getNavigationState,
  getSceneAnchorId,
  getSceneJumpTarget,
  getSceneScrollOptions,
} from "@/components/presentation/presentation-navigation";

describe("clampSceneIndex", () => {
  it("returns the requested index when it already falls within the scene range", () => {
    expect(clampSceneIndex(2, 4)).toBe(2);
  });

  it("fails loudly for invalid scene counts or non-integer indexes", () => {
    expect(() => clampSceneIndex(0, 0)).toThrow(
      "sceneCount must be a positive integer",
    );
    expect(() => clampSceneIndex(1.5, 4)).toThrow(
      "sceneIndex must be an integer",
    );
  });

  it("clamps off-by-one boundaries at the first and last scene", () => {
    expect(clampSceneIndex(-1, 4)).toBe(0);
    expect(clampSceneIndex(4, 4)).toBe(3);
  });
});

describe("getSceneAnchorId and getSceneJumpTarget", () => {
  it("builds the canonical slide anchor and selector for a typical scene jump", () => {
    expect(getSceneAnchorId(0)).toBe("scene-1");
    expect(getSceneJumpTarget(2, 4)).toEqual({
      index: 2,
      id: "scene-3",
      selector: "#scene-3",
    });
  });

  it("fails loudly for invalid anchor inputs", () => {
    expect(() => getSceneAnchorId(-1)).toThrow(
      "sceneIndex must be greater than or equal to 0",
    );
    expect(() => getSceneJumpTarget(0, 0)).toThrow(
      "sceneCount must be a positive integer",
    );
  });

  it("clamps jump targets at the scene range edges", () => {
    expect(getSceneJumpTarget(-4, 4)).toEqual({
      index: 0,
      id: "scene-1",
      selector: "#scene-1",
    });
    expect(getSceneJumpTarget(9, 4)).toEqual({
      index: 3,
      id: "scene-4",
      selector: "#scene-4",
    });
  });
});

describe("getNavigationState", () => {
  it("derives first, last, next, and previous scene behavior from one active index", () => {
    expect(getNavigationState(1, 4)).toEqual({
      activeIndex: 1,
      sceneCount: 4,
      firstIndex: 0,
      lastIndex: 3,
      previousIndex: 0,
      nextIndex: 2,
      hasPrevious: true,
      hasNext: true,
    });
  });

  it("fails loudly when the scene sequence is invalid", () => {
    expect(() => getNavigationState(0, 0)).toThrow(
      "sceneCount must be a positive integer",
    );
  });

  it("keeps navigation pinned to the first and last scenes at the boundaries", () => {
    expect(getNavigationState(-3, 4)).toMatchObject({
      activeIndex: 0,
      previousIndex: 0,
      nextIndex: 1,
      hasPrevious: false,
      hasNext: true,
    });
    expect(getNavigationState(99, 4)).toMatchObject({
      activeIndex: 3,
      previousIndex: 2,
      nextIndex: 3,
      hasPrevious: true,
      hasNext: false,
    });
  });
});

describe("getActiveSceneIndex", () => {
  it("returns the scene whose sticky interval contains the viewport focus line", () => {
    expect(
      getActiveSceneIndex({
        sceneRects: [
          { top: -200, height: 1700 },
          { top: 1500, height: 1700 },
        ],
        viewportHeight: 1000,
      }),
    ).toBe(0);

    expect(
      getActiveSceneIndex({
        sceneRects: [
          { top: -1500, height: 1700 },
          { top: 200, height: 1700 },
        ],
        viewportHeight: 1000,
      }),
    ).toBe(1);
  });

  it("fails loudly for empty scene lists or invalid viewport inputs", () => {
    expect(() =>
      getActiveSceneIndex({
        sceneRects: [],
        viewportHeight: 1000,
      }),
    ).toThrow("sceneRects must contain at least one scene");

    expect(() =>
      getActiveSceneIndex({
        sceneRects: [{ top: 0, height: 1700 }],
        viewportHeight: 0,
      }),
    ).toThrow("viewportHeight must be greater than 0");
  });

  it("handles unicode-safe data and exact threshold boundaries without skipping scenes", () => {
    expect(
      getActiveSceneIndex({
        sceneRects: [
          { top: -1350, height: 1700 },
          { top: 350, height: 1700 },
        ],
        viewportHeight: 1000,
      }),
    ).toBe(1);
  });
});

describe("getSceneScrollOptions", () => {
  it("uses smooth scrolling when reduced motion is not requested", () => {
    expect(getSceneScrollOptions(false)).toEqual({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });

  it("switches to non-animated scrolling when reduced motion is requested", () => {
    expect(getSceneScrollOptions(true)).toEqual({
      behavior: "auto",
      block: "start",
      inline: "nearest",
    });
  });
});