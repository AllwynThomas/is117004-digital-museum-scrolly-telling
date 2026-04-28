const PRESENTATION_SCENE_SELECTOR = 'section[data-presentation-slide="true"]';
const DEFAULT_SCENE_FOCUS_RATIO = 0.35;

interface SceneRect {
  top: number;
  height: number;
}

interface ActiveSceneArgs {
  sceneRects: SceneRect[];
  viewportHeight: number;
  focusRatio?: number;
}

export interface PresentationNavigationState {
  activeIndex: number;
  sceneCount: number;
  firstIndex: number;
  lastIndex: number;
  previousIndex: number;
  nextIndex: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

interface SceneJumpTarget {
  index: number;
  id: string;
  selector: string;
}

interface PresentationSceneElement {
  index: number;
  id: string;
  element: HTMLElement;
}

function assertPositiveInteger(value: number, label: string) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${label} must be a positive integer`);
  }
}

function assertInteger(value: number, label: string) {
  if (!Number.isInteger(value)) {
    throw new TypeError(`${label} must be an integer`);
  }
}

function assertNonNegativeInteger(value: number, label: string) {
  assertInteger(value, label);

  if (value < 0) {
    throw new RangeError(`${label} must be greater than or equal to 0`);
  }
}

function assertViewportHeight(viewportHeight: number) {
  if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    throw new TypeError("viewportHeight must be greater than 0");
  }
}

export function getSceneAnchorId(sceneIndex: number) {
  assertNonNegativeInteger(sceneIndex, "sceneIndex");
  return `scene-${sceneIndex + 1}`;
}

export function clampSceneIndex(sceneIndex: number, sceneCount: number) {
  assertInteger(sceneIndex, "sceneIndex");
  assertPositiveInteger(sceneCount, "sceneCount");

  return Math.min(Math.max(sceneIndex, 0), sceneCount - 1);
}

export function getSceneJumpTarget(
  sceneIndex: number,
  sceneCount: number,
): SceneJumpTarget {
  const index = clampSceneIndex(sceneIndex, sceneCount);
  const id = getSceneAnchorId(index);

  return {
    index,
    id,
    selector: `#${id}`,
  };
}

export function getNavigationState(
  activeIndex: number,
  sceneCount: number,
): PresentationNavigationState {
  const clampedActiveIndex = clampSceneIndex(activeIndex, sceneCount);
  const firstIndex = 0;
  const lastIndex = sceneCount - 1;

  return {
    activeIndex: clampedActiveIndex,
    sceneCount,
    firstIndex,
    lastIndex,
    previousIndex: clampSceneIndex(clampedActiveIndex - 1, sceneCount),
    nextIndex: clampSceneIndex(clampedActiveIndex + 1, sceneCount),
    hasPrevious: clampedActiveIndex > firstIndex,
    hasNext: clampedActiveIndex < lastIndex,
  };
}

export function getSceneScrollOptions(
  prefersReducedMotion: boolean,
): ScrollIntoViewOptions {
  return {
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
    inline: "nearest",
  };
}

export function getActiveSceneIndex({
  sceneRects,
  viewportHeight,
  focusRatio = DEFAULT_SCENE_FOCUS_RATIO,
}: ActiveSceneArgs) {
  if (sceneRects.length === 0) {
    throw new TypeError("sceneRects must contain at least one scene");
  }

  assertViewportHeight(viewportHeight);

  if (!Number.isFinite(focusRatio) || focusRatio < 0 || focusRatio > 1) {
    throw new RangeError("focusRatio must be between 0 and 1");
  }

  const focusLine = viewportHeight * focusRatio;
  let activeIndex = 0;
  let activeDistance = Number.POSITIVE_INFINITY;

  sceneRects.forEach((sceneRect, index) => {
    if (!Number.isFinite(sceneRect.top) || !Number.isFinite(sceneRect.height)) {
      throw new TypeError("sceneRect values must be finite numbers");
    }

    if (sceneRect.height <= 0) {
      throw new TypeError("sceneRect height must be greater than 0");
    }

    const bottom = sceneRect.top + sceneRect.height;

    if (sceneRect.top <= focusLine && bottom > focusLine) {
      activeIndex = index;
      activeDistance = -1;
      return;
    }

    if (activeDistance < 0) {
      return;
    }

    const distance = Math.min(
      Math.abs(sceneRect.top - focusLine),
      Math.abs(bottom - focusLine),
    );

    if (distance < activeDistance) {
      activeIndex = index;
      activeDistance = distance;
    }
  });

  return activeIndex;
}

export function getPresentationSceneElements(
  root: ParentNode = document,
): PresentationSceneElement[] {
  const sceneElements = Array.from(
    root.querySelectorAll<HTMLElement>(PRESENTATION_SCENE_SELECTOR),
  );

  return sceneElements.map((element, position) => {
    const sceneIndex = Number.parseInt(
      element.dataset.sceneIndex ?? String(position + 1),
      10,
    );

    if (!Number.isInteger(sceneIndex) || sceneIndex <= 0) {
      throw new TypeError(
        `Presentation scene ${position} must use a positive integer data-scene-index`,
      );
    }

    const expectedId = getSceneAnchorId(sceneIndex - 1);

    if (element.id !== expectedId) {
      throw new Error(`Presentation scene ${position} must use id "${expectedId}"`);
    }

    return {
      index: sceneIndex - 1,
      id: element.id,
      element,
    };
  });
}

export { PRESENTATION_SCENE_SELECTOR };