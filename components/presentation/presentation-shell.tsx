"use client";

import { useEffect, useRef, useState } from "react";

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

type SceneKind =
  | "plain"
  | "background"
  | "split"
  | "split-reverse"
  | "timeline";

type SceneVariant = "light" | "dark";

interface SceneTheme {
  backgroundClassName: string;
  copyClassName?: string;
  emphasizeMedia?: boolean;
  eyebrow?: string;
  sceneMinHeightClassName?: string;
  variant: SceneVariant;
}

interface TimelineSceneEntry {
  year: string;
  title: string;
  description: string;
}

const SCENE_THEMES: Record<string, SceneTheme> = {
  "The Power of Nuclear Energy": {
    backgroundClassName: "bg-[var(--color-bg-dark)]",
    emphasizeMedia: true,
    eyebrow: "Exhibit Opening",
    variant: "dark",
  },
  "Energy Density": {
    backgroundClassName: "bg-[var(--color-bg-secondary)]",
    copyClassName:
      "border-l-4 border-[var(--color-accent-cyan)] pl-[var(--space-6)]",
    emphasizeMedia: true,
    eyebrow: "Energy Density",
    variant: "light",
  },
  "How a Reactor Makes Electricity": {
    backgroundClassName: "bg-[var(--color-bg-secondary)]",
    copyClassName:
      "border-l-4 border-[var(--color-accent-blue)] pl-[var(--space-6)]",
    eyebrow: "Inside the Reactor",
    variant: "light",
  },
  "Why Nuclear Beats Fossil Fuels": {
    backgroundClassName: "bg-[var(--color-bg-secondary)]",
    copyClassName:
      "border-l-4 border-[var(--color-accent-green)] pl-[var(--space-6)]",
    emphasizeMedia: true,
    eyebrow: "The Evidence",
    variant: "light",
  },
  "Addressing Nuclear Safety and Waste": {
    backgroundClassName: "bg-[var(--color-bg-primary)]",
    copyClassName:
      "border-l-4 border-[var(--color-accent-red)] pl-[var(--space-6)]",
    emphasizeMedia: true,
    eyebrow: "Honest Context",
    sceneMinHeightClassName: "md:min-h-[190vh]",
    variant: "light",
  },
  "From Uranium to Electricity": {
    backgroundClassName: "bg-[var(--color-bg-secondary)]",
    copyClassName:
      "border-l-4 border-[var(--color-accent-amber)] pl-[var(--space-6)]",
    emphasizeMedia: true,
    eyebrow: "The Full Journey",
    variant: "light",
  },
  "Powering AI and the Future Grid": {
    backgroundClassName: "bg-[var(--color-bg-primary)]",
    copyClassName:
      "border-l-4 border-[var(--color-accent-blue)] pl-[var(--space-6)]",
    emphasizeMedia: true,
    eyebrow: "Looking Ahead",
    variant: "light",
  },
  "The Rise of Nuclear Power": {
    backgroundClassName: "bg-[var(--color-bg-dark)]",
    eyebrow: "History",
    sceneMinHeightClassName: "md:min-h-[230vh]",
    variant: "dark",
  },
};

const TIMELINE_ENTRY_PATTERN = /^\*\*(.+?)\s+-\s+(.+?)\.\*\*\s+(.+)$/;

function getSceneTheme(heading: string): SceneTheme {
  return (
    SCENE_THEMES[heading] ?? {
      backgroundClassName: "bg-[var(--color-bg-primary)]",
      variant: "light",
    }
  );
}

function getTimelineSceneData(paragraphs: string[]) {
  const entries: TimelineSceneEntry[] = [];
  const supportingParagraphs: string[] = [];
  let closingStatement: string | null = null;

  for (const paragraph of paragraphs) {
    const match = paragraph.match(TIMELINE_ENTRY_PATTERN);

    if (match) {
      entries.push({
        year: match[1].trim(),
        title: match[2].trim(),
        description: match[3].trim(),
      });
      continue;
    }

    if (paragraph.startsWith("Sources:")) {
      supportingParagraphs.push(paragraph);
      continue;
    }

    if (closingStatement === null) {
      closingStatement = paragraph;
      continue;
    }

    supportingParagraphs.push(paragraph);
  }

  return {
    closingStatement,
    entries,
    supportingParagraphs,
  };
}

function getSceneKind(scene: SceneNode, heading: string): SceneKind {
  if (heading === "The Rise of Nuclear Power") {
    return "timeline";
  }

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
  const [isFooterInView, setIsFooterInView] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (scenes.length === 0) {
      return;
    }

    const updateActiveScene = () => {
      try {
        const sceneElements = getPresentationSceneElements(document);
        const footer = document.querySelector("footer");
        const nextFooterInView =
          footer instanceof HTMLElement
            ? (() => {
                const footerRect = footer.getBoundingClientRect();

                return footerRect.top < window.innerHeight && footerRect.bottom > 0;
              })()
            : false;

        setIsFooterInView((currentValue) =>
          currentValue === nextFooterInView ? currentValue : nextFooterInView,
        );

        if (sceneElements.length === 0) {
          setActiveSceneIndex((currentIndex) =>
            currentIndex === 0 ? currentIndex : 0,
          );
          return;
        }

        const nextActiveSceneIndex = getActiveSceneIndex({
          sceneRects: sceneElements.map(({ element }) => {
            const rect = element.getBoundingClientRect();

            return {
              top: rect.top,
              height: rect.height,
            };
          }),
          viewportHeight: window.innerHeight,
        });

        setActiveSceneIndex((currentIndex) =>
          currentIndex === nextActiveSceneIndex
            ? currentIndex
            : nextActiveSceneIndex,
        );
      } catch {
        setIsFooterInView((currentValue) =>
          currentValue === false ? currentValue : false,
        );
        setActiveSceneIndex((currentIndex) =>
          currentIndex === 0 ? currentIndex : 0,
        );
      }
    };

    const scheduleActiveSceneUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateActiveScene();
      });
    };

    scheduleActiveSceneUpdate();
    window.addEventListener("scroll", scheduleActiveSceneUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveSceneUpdate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      window.removeEventListener("scroll", scheduleActiveSceneUpdate);
      window.removeEventListener("resize", scheduleActiveSceneUpdate);
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
    const heading = getSceneHeading(scene.cleanContent) ?? `Scene ${index + 1}`;
    const sceneKind = getSceneKind(scene, heading);
    const theme = getSceneTheme(heading);
    const headingId = `scene-${index + 1}-title`;
    const paragraphs = getSceneParagraphs(scene.cleanContent);
    const timelineScene =
      sceneKind === "timeline" ? getTimelineSceneData(paragraphs) : null;

    return {
      scene,
      closingStatement: timelineScene?.closingStatement ?? null,
      index,
      sceneKind,
      heading,
      headingId,
      paragraphs: timelineScene?.supportingParagraphs ?? paragraphs,
      theme,
      timelineEntries: timelineScene?.entries ?? [],
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
          closingStatement,
          scene,
          index,
          sceneKind,
          heading,
          headingId,
          paragraphs,
          theme,
          timelineEntries,
        }) => {

        return (
          <PresentationSlide
            key={`${headingId}-${heading}`}
            index={index}
            isActive={index === activeSceneIndex}
            headingId={headingId}
            sceneKind={sceneKind}
            backgroundSrc={scene.backgroundSrc}
            sceneMinHeightClassName={theme.sceneMinHeightClassName}
          >
            <SceneLayout
              sceneKind={sceneKind}
              heading={heading}
              headingId={headingId}
              paragraphs={paragraphs}
              backgroundSrc={scene.backgroundSrc}
              backgroundFocal={scene.backgroundFocal}
              backgroundClassName={theme.backgroundClassName}
              closingStatement={closingStatement}
              copyClassName={theme.copyClassName}
              emphasizeMedia={theme.emphasizeMedia}
              eyebrow={theme.eyebrow}
              mediaSrc={scene.splitSrc ?? scene.splitReverseSrc}
              timelineEntries={timelineEntries}
              variant={theme.variant}
            />
          </PresentationSlide>
        );
      })}

      <PresentationProgress
        hidden={isFooterInView}
        sceneLabels={sceneEntries.map(({ heading }) => heading)}
        navigation={navigation}
        onJumpToScene={jumpToScene}
      />
    </main>
  );
}