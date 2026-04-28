import type { SceneNode } from "@/lib/scene-parser";

import { SceneLayout } from "@/components/presentation/scene-layout";
import { PresentationSlide } from "@/components/presentation/presentation-slide";

interface PresentationShellProps {
  scenes: SceneNode[];
}

function getSceneKind(scene: SceneNode) {
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
  if (scenes.length === 0) {
    return (
      <main id="main-content" data-presentation-shell="true">
        <p>No presentation scenes are available yet.</p>
      </main>
    );
  }

  return (
    <main id="main-content" data-presentation-shell="true">
      {scenes.map((scene, index) => {
        const heading = getSceneHeading(scene.cleanContent) ?? `Scene ${index + 1}`;
        const headingId = `scene-${index + 1}-title`;
        const paragraphs = getSceneParagraphs(scene.cleanContent);

        return (
          <PresentationSlide
            key={`${headingId}-${heading}`}
            index={index}
            headingId={headingId}
            sceneKind={getSceneKind(scene)}
            backgroundSrc={scene.backgroundSrc}
          >
            <SceneLayout
              sceneKind={getSceneKind(scene)}
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
    </main>
  );
}