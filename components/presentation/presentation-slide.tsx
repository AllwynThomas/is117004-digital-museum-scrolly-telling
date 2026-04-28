"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type SceneKind =
  | "plain"
  | "background"
  | "split"
  | "split-reverse"
  | "timeline";

interface PresentationSlideProps {
  index: number;
  isActive?: boolean;
  sceneKind: SceneKind;
  backgroundSrc?: string | null;
  headingId?: string;
  sceneMinHeightClassName?: string;
  children: ReactNode;
}

interface SceneProgressArgs {
  sectionTop: number;
  sectionHeight: number;
  viewportHeight: number;
}

const SceneProgressContext = createContext<number | null>(null);

export function getSceneProgress({
  sectionTop,
  sectionHeight,
  viewportHeight,
}: SceneProgressArgs) {
  if (viewportHeight <= 0) {
    throw new TypeError("viewportHeight must be greater than 0");
  }

  if (sectionHeight <= viewportHeight) {
    throw new TypeError("sectionHeight must be greater than viewportHeight");
  }

  const travelDistance = sectionHeight - viewportHeight;
  const rawProgress = -sectionTop / travelDistance;

  return Math.max(0, Math.min(1, rawProgress));
}

export function useSceneProgress() {
  const progress = useContext(SceneProgressContext);

  if (progress === null) {
    throw new Error("useSceneProgress must be used within PresentationSlide");
  }

  return progress;
}

export function PresentationSlide({
  index,
  isActive = false,
  sceneKind,
  backgroundSrc = null,
  headingId,
  sceneMinHeightClassName,
  children,
}: PresentationSlideProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const minHeightClass = useMemo(() => {
    if (sceneMinHeightClassName) {
      return sceneMinHeightClassName;
    }

    if (sceneKind === "background") {
      return "md:min-h-[200vh]";
    }

    if (sceneKind === "timeline") {
      return "md:min-h-[220vh]";
    }

    return "md:min-h-[170vh]";
  }, [sceneKind, sceneMinHeightClassName]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const updateProgress = () => {
      if (window.innerWidth < 768) {
        setProgress((currentProgress) =>
          currentProgress === 0 ? currentProgress : 0,
        );
        return;
      }

      const rect = section.getBoundingClientRect();

      try {
        const nextProgress = getSceneProgress({
          sectionTop: rect.top,
          sectionHeight: rect.height,
          viewportHeight: window.innerHeight,
        });

        setProgress((currentProgress) =>
          Math.abs(currentProgress - nextProgress) < 0.001
            ? currentProgress
            : nextProgress,
        );
      } catch {
        setProgress((currentProgress) =>
          currentProgress === 0 ? currentProgress : 0,
        );
      }
    };

    const scheduleProgressUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateProgress();
      });
    };

    scheduleProgressUpdate();
    window.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleProgressUpdate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);
    };
  }, []);

  const style = {
    "--scene-progress": progress,
  } as CSSProperties;

  return (
    <SceneProgressContext.Provider value={progress}>
      <section
        ref={sectionRef}
        id={`scene-${index + 1}`}
        role="region"
        aria-labelledby={headingId}
        data-active-scene={isActive ? "true" : "false"}
        data-presentation-slide="true"
        data-scene-index={index + 1}
        data-scene-kind={sceneKind}
        data-background-src={backgroundSrc ?? undefined}
        className={`min-h-screen ${minHeightClass}`}
        style={style}
      >
        <div
          data-scene-stage="true"
          className="static md:sticky md:top-0 md:h-screen"
        >
          {children}
        </div>
      </section>
    </SceneProgressContext.Provider>
  );
}