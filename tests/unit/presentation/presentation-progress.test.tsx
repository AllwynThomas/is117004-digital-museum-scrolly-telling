import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PresentationProgress } from "@/components/presentation/presentation-progress";
import { getNavigationState } from "@/components/presentation/presentation-navigation";

describe("PresentationProgress", () => {
  it("renders a lightweight scene indicator and delegates jumps through the shared navigation state", () => {
    const onJumpToScene = vi.fn();

    render(
      <PresentationProgress
        sceneLabels={["Opening", "Evidence", "Why This Matters"]}
        navigation={getNavigationState(1, 3)}
        onJumpToScene={onJumpToScene}
      />,
    );

    expect(
      screen.getByText("Scene 2 of 3: Evidence"),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Go to scene 2: Evidence" }),
    ).toHaveAttribute("aria-current", "step");

    fireEvent.click(
      screen.getByRole("button", { name: "Go to scene 3: Why This Matters" }),
    );
    expect(onJumpToScene).toHaveBeenCalledWith(2);
  });

  it("fails safely by rendering nothing when there are no scenes", () => {
    const { container } = render(
      <PresentationProgress
        sceneLabels={[]}
        navigation={null}
        onJumpToScene={() => undefined}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("preserves unicode labels and boundary state at the last scene", () => {
    render(
      <PresentationProgress
        sceneLabels={["Opening", "東京", "São Paulo"]}
        navigation={getNavigationState(2, 3)}
        onJumpToScene={() => undefined}
      />,
    );

    expect(
      screen.getByText("Scene 3 of 3: São Paulo"),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Go to scene 3: São Paulo" }),
    ).toHaveAttribute("aria-current", "step");
  });

  it("renders keyboard-focusable scene controls in order with exactly one active step", () => {
    render(
      <PresentationProgress
        sceneLabels={["Opening", "Evidence", "Why This Matters"]}
        navigation={getNavigationState(0, 3)}
        onJumpToScene={() => undefined}
      />,
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons.map((button) => button.getAttribute("aria-label"))).toEqual([
      "Go to scene 1: Opening",
      "Go to scene 2: Evidence",
      "Go to scene 3: Why This Matters",
    ]);
    expect(
      buttons.filter((button) => button.getAttribute("aria-current") === "step"),
    ).toHaveLength(1);
  });
});