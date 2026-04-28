"use client";

import { useEffect, useState } from "react";

import type { SceneNode } from "@/lib/scene-parser";

import {
  getActiveSceneIndex,
  getNavigationState,
  getPresentationSceneElements,
  getSceneJumpTarget,
  getSceneScrollOptions,
} from "@/components/presentation/presentation-navigation";
import { PresentationProgress } from "@/components/presentation/presentation-progress";
import { SceneLayout } from "@/components/presentation/scene-layout";
import { PresentationSlide } from "@/components/presentation/presentation-slide";

interface PresentationShellProps {
  scenes: SceneNode[];
}

type SceneKind = "plain" | "background" | "split" | "split-reverse";

function getSceneKind(scene: SceneNode): SceneKind {
  if (scene.backgroundSrc) {
    return "background";
  }

  if (scene.splitSrc) {
    return "split";
  }

  if (scene.splitReverseSrc) {
    return "split-reverse";
  }

  return "plain";
}

function getSceneBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
}

function getSceneParagraphs(content: string) {
  return getSceneBlocks(content)
    .flatMap((block) =>
      block
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith("#")),
    );
}

function getSceneHeading(content: string) {
  const headingLine = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith("#"));

  if (!headingLine) {
    return null;
  }

  return headingLine.replace(/^#+\s*/, "").trim() || null;
}

export function PresentationShell({ scenes }: PresentationShellProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  useEffect(() => {
    if (scenes.length === 0) {
      return;
    }

    const updateActiveScene = () => {
      try {
        const sceneElements = getPresentationSceneElements(document);

        if (sceneElements.length === 0) {
          setActiveSceneIndex(0);
          return;
        }

        setActiveSceneIndex(
          getActiveSceneIndex({
            sceneRects: sceneElements.map(({ element }) => {
              const rect = element.getBoundingClientRect();

              return {
                top: rect.top,
                height: rect.height,
              };
            }),
            viewportHeight: window.innerHeight,
          }),
        );
      } catch {
        setActiveSceneIndex(0);
      }
    };

    updateActiveScene();
    window.addEventListener("scroll", updateActiveScene, { passive: true });
    window.addEventListener("resize", updateActiveScene);

    return () => {
      window.removeEventListener("scroll", updateActiveScene);
      window.removeEventListener("resize", updateActiveScene);
    };
  }, [scenes.length]);

  if (scenes.length === 0) {
    return (
      <main id="main-content" data-presentation-shell="true">
        <p>No presentation scenes are available yet.</p>
      </main>
    );
  }

  const sceneEntries = scenes.map((scene, index) => {
    const sceneKind = getSceneKind(scene);
    const heading = getSceneHeading(scene.cleanContent) ?? `Scene ${index + 1}`;
    const headingId = `scene-${index + 1}-title`;
    const paragraphs = getSceneParagraphs(scene.cleanContent);

    return {
      scene,
      index,
      sceneKind,
      heading,
      headingId,
      paragraphs,
    };
  });

  const navigation = getNavigationState(activeSceneIndex, sceneEntries.length);

  const jumpToScene = (sceneIndex: number) => {
    const jumpTarget = getSceneJumpTarget(sceneIndex, sceneEntries.length);
    const element = document.getElementById(jumpTarget.id);

    if (!element) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    element.scrollIntoView(getSceneScrollOptions(prefersReducedMotion));
  };

  return (
    <main
      id="main-content"
      data-presentation-shell="true"
      data-active-scene={activeSceneIndex + 1}
    >
      {sceneEntries.map(
        ({
          scene,
          index,
          sceneKind,
          heading,
          headingId,
          paragraphs,
        }) => {

        return (
          <PresentationSlide
            key={`${headingId}-${heading}`}
            index={index}
            isActive={index === activeSceneIndex}
            headingId={headingId}
            sceneKind={sceneKind}
            backgroundSrc={scene.backgroundSrc}
          >
            <SceneLayout
              sceneKind={sceneKind}
              heading={heading}
              headingId={headingId}
              paragraphs={paragraphs}
              backgroundSrc={scene.backgroundSrc}
              backgroundFocal={scene.backgroundFocal}
              mediaSrc={scene.splitSrc ?? scene.splitReverseSrc}
            />
          </PresentationSlide>
        );
      })}

      <PresentationProgress
        sceneLabels={sceneEntries.map(({ heading }) => heading)}
        navigation={navigation}
        onJumpToScene={jumpToScene}
      />
    </main>
  );
}