import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PresentationSlide } from "@/components/presentation/presentation-slide";
import {
  getPresentationSceneElements,
  getSceneJumpTarget,
} from "@/components/presentation/presentation-navigation";

describe("presentation navigation + PresentationSlide seam", () => {
  it("discovers real slide anchors from PresentationSlide and resolves jump targets against them", () => {
    render(
      <>
        <PresentationSlide index={0} sceneKind="plain">
          <p>Opening</p>
        </PresentationSlide>
        <PresentationSlide index={1} sceneKind="split">
          <p>Evidence</p>
        </PresentationSlide>
      </>,
    );

    const sceneElements = getPresentationSceneElements(document);
    expect(sceneElements).toHaveLength(2);
    expect(sceneElements.map((sceneElement) => sceneElement.id)).toEqual([
      "scene-1",
      "scene-2",
    ]);
    expect(sceneElements[1]?.element).toBe(document.getElementById("scene-2"));

    const jumpTarget = getSceneJumpTarget(1, sceneElements.length);
    expect(sceneElements[jumpTarget.index]?.id).toBe(jumpTarget.id);
  });

  it("fails safely when a presentation scene element does not match the canonical anchor format", () => {
    render(
      <section
        id="not-a-scene"
        data-presentation-slide="true"
        data-scene-index="1"
      >
        Broken scene anchor
      </section>,
    );

    expect(() => getPresentationSceneElements(document)).toThrow(
      'Presentation scene 0 must use id "scene-1"',
    );
  });
});