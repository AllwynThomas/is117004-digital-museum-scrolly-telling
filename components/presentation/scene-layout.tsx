import type { ReactNode } from "react";

import Image from "next/image";

import { TimelineEntry } from "@/components/ui/timeline-entry";
import { cn } from "@/lib/utils";

type SceneLayoutKind =
  | "plain"
  | "background"
  | "split"
  | "split-reverse"
  | "timeline";

type SceneLayoutVariant = "light" | "dark";

interface SceneTimelineEntry {
  year: string;
  title: string;
  description: string;
}

interface SceneLayoutProps {
  sceneKind: SceneLayoutKind;
  heading: string;
  headingId: string;
  paragraphs: string[];
  backgroundSrc?: string | null;
  backgroundFocal?: string | null;
  backgroundClassName?: string;
  closingStatement?: string | null;
  copyClassName?: string;
  emphasizeMedia?: boolean;
  eyebrow?: string;
  mediaSrc?: string | null;
  timelineEntries?: SceneTimelineEntry[];
  variant?: SceneLayoutVariant;
}

const INLINE_MARKDOWN_PATTERN =
  /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*/g;

function assertSceneLayoutKind(sceneKind: string): asserts sceneKind is SceneLayoutKind {
  if (
    sceneKind !== "plain" &&
    sceneKind !== "background" &&
    sceneKind !== "split" &&
    sceneKind !== "split-reverse" &&
    sceneKind !== "timeline"
  ) {
    throw new Error(`Unsupported scene layout kind: ${sceneKind}`);
  }
}

function renderInlineContent(text: string, invert: boolean): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_MARKDOWN_PATTERN)) {
    const fullMatch = match[0];

    if (!fullMatch) {
      continue;
    }

    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    const linkLabel = match[1];
    const linkUrl = match[2];
    const strongText = match[3];

    if (linkLabel && linkUrl) {
      nodes.push(
        <a
          key={`${linkUrl}-${matchIndex}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            invert
              ? "font-medium text-[var(--color-text-on-dark)] underline decoration-[var(--color-accent-cyan)] underline-offset-4"
              : "font-medium text-[var(--color-accent-blue)] underline decoration-current underline-offset-4"
          }
        >
          {linkLabel}
        </a>,
      );
    } else if (strongText) {
      nodes.push(<strong key={`strong-${matchIndex}`}>{strongText}</strong>);
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  if (nodes.length === 0) {
    return text;
  }

  return nodes;
}

function CopyBlock({
  eyebrow,
  heading,
  headingId,
  paragraphs,
  className,
  invert = false,
  showFallback = true,
}: {
  eyebrow?: string;
  heading: string;
  headingId: string;
  paragraphs: string[];
  className?: string;
  invert?: boolean;
  showFallback?: boolean;
}) {
  const hasParagraphs = paragraphs.length > 0;

  return (
    <div
      data-testid="scene-copy"
      data-scene-motion="copy"
      className={cn(
        "max-w-[42rem]",
        invert
          ? "bg-[color:rgba(13,17,23,0.92)] p-[var(--space-6)] shadow-[0_20px_60px_rgba(13,17,23,0.28)]"
          : undefined,
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-[var(--space-3)] text-[length:var(--font-size-caption)] font-semibold uppercase tracking-[0.2em]",
            invert
              ? "text-[var(--color-text-on-dark)]"
              : "text-[var(--color-text-secondary)]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={headingId}
        className={invert ? "text-[length:var(--font-size-section)] font-bold text-[var(--color-text-on-dark)]" : "text-[length:var(--font-size-section)] font-bold text-[var(--color-text-primary)]"}
      >
        {heading}
      </h2>

      <div
        className={invert ? "mt-[var(--space-6)] flex flex-col gap-[var(--space-4)] text-[length:var(--font-size-body)] text-[var(--color-text-on-dark)]" : "mt-[var(--space-6)] flex flex-col gap-[var(--space-4)] text-[length:var(--font-size-body)] text-[var(--color-text-secondary)]"}
      >
        {hasParagraphs ? (
          paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 32)}`}>
              {renderInlineContent(paragraph, invert)}
            </p>
          ))
        ) : showFallback ? (
          <p>Scene copy will be added here.</p>
        ) : null}
      </div>
    </div>
  );
}

function TimelineBlock({
  closingStatement,
  heading,
  headingId,
  paragraphs,
  timelineEntries,
  variant,
  eyebrow,
}: {
  closingStatement?: string | null;
  heading: string;
  headingId: string;
  paragraphs: string[];
  timelineEntries: SceneTimelineEntry[];
  variant: SceneLayoutVariant;
  eyebrow?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div className="mx-auto max-w-[var(--grid-max-width)]" data-scene-motion="timeline">
      <CopyBlock
        eyebrow={eyebrow}
        heading={heading}
        headingId={headingId}
        paragraphs={[]}
        invert={isDark}
        showFallback={false}
      />

      {timelineEntries.length > 0 ? (
        <div className="relative mt-[var(--space-12)]">
          <div
            className={cn(
              "absolute left-[120px] top-0 bottom-0 hidden w-[2px] md:block",
              isDark
                ? "bg-[var(--color-accent-cyan)]"
                : "bg-[var(--color-accent-blue)]",
            )}
          />

          <div className="flex flex-col gap-[var(--space-12)]">
            {timelineEntries.map((entry) => (
              <TimelineEntry
                key={`${entry.year}-${entry.title}`}
                year={entry.year}
                title={entry.title}
                description={entry.description}
                variant={variant}
              />
            ))}
          </div>
        </div>
      ) : null}

      {closingStatement ? (
        <p
          className={cn(
            "mt-[var(--space-12)] max-w-[720px] text-[length:var(--font-size-body)] italic leading-relaxed",
            isDark
              ? "text-[var(--color-text-secondary-on-dark)]"
              : "text-[var(--color-text-secondary)]",
          )}
        >
          {renderInlineContent(closingStatement, isDark)}
        </p>
      ) : null}

      {paragraphs.length > 0 ? (
        <div
          className={cn(
            "mt-[var(--space-8)] flex max-w-[720px] flex-col gap-[var(--space-4)] text-[length:var(--font-size-body)]",
            isDark
              ? "text-[var(--color-text-secondary-on-dark)]"
              : "text-[var(--color-text-secondary)]",
          )}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 32)}`}>
              {renderInlineContent(paragraph, isDark)}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MediaFrame({
  src,
  alt,
  order,
  emphasizeMedia,
  variant,
}: {
  src: string;
  alt: string;
  order: "first" | "last";
  emphasizeMedia: boolean;
  variant: SceneLayoutVariant;
}) {
  const isDark = variant === "dark";

  return (
    <div
      data-testid="scene-media"
      data-media-order={order}
      data-scene-motion="media"
      className={cn(
        "overflow-hidden border shadow-[0_18px_50px_rgba(15,23,42,0.12)]",
        emphasizeMedia ? "p-[var(--space-2)]" : "p-[var(--space-3)]",
        isDark
          ? "border-[color:rgba(240,243,246,0.14)] bg-[color:rgba(13,17,23,0.7)]"
          : "border-[var(--color-surface-rule)] bg-[var(--color-bg-primary)]",
      )}
    >
      <Image
        src={src}
        alt={alt}
        unoptimized={true}
        width={1600}
        height={900}
        className={cn(
          "w-full object-contain",
          emphasizeMedia ? "max-h-[80vh]" : "max-h-[72vh]",
        )}
      />
    </div>
  );
}

export function SceneLayout({
  sceneKind,
  heading,
  headingId,
  paragraphs,
  backgroundSrc = null,
  backgroundFocal = null,
  backgroundClassName,
  closingStatement = null,
  copyClassName,
  emphasizeMedia = false,
  eyebrow,
  mediaSrc = null,
  timelineEntries = [],
  variant = "light",
}: SceneLayoutProps) {
  assertSceneLayoutKind(sceneKind);

  const isDark = variant === "dark";
  const surfaceClassName = backgroundClassName ??
    (isDark ? "bg-[var(--color-bg-dark)]" : "bg-[var(--color-bg-primary)]");

  if (sceneKind === "plain") {
    return (
      <div data-testid="scene-layout" data-scene-layout="plain" className={cn("min-h-screen px-[var(--space-6)] py-[var(--space-16)]", surfaceClassName)}>
        <div className="mx-auto max-w-[var(--grid-max-width)]">
          <CopyBlock
            eyebrow={eyebrow}
            heading={heading}
            headingId={headingId}
            paragraphs={paragraphs}
            className={copyClassName}
            invert={isDark}
          />
        </div>
      </div>
    );
  }

  if (sceneKind === "background") {
    if (!backgroundSrc) {
      throw new Error("Background scenes require backgroundSrc");
    }

    return (
      <div data-testid="scene-layout" data-scene-layout="background" className="relative min-h-screen overflow-hidden px-[var(--space-6)] py-[var(--space-16)]">
        <Image
          src={backgroundSrc}
          alt={`${heading} background`}
          unoptimized={true}
          fill={true}
          sizes="100vw"
          data-background-focal={backgroundFocal ?? undefined}
          className="absolute inset-0 h-full w-full object-cover"
          style={backgroundFocal ? { objectPosition: backgroundFocal } : undefined}
        />
        <div className="relative z-10 mx-auto max-w-[var(--grid-max-width)]">
          <CopyBlock
            eyebrow={eyebrow}
            heading={heading}
            headingId={headingId}
            paragraphs={paragraphs}
            className={copyClassName}
            invert={true}
          />
        </div>
      </div>
    );
  }

  if (sceneKind === "timeline") {
    return (
      <div
        data-testid="scene-layout"
        data-scene-layout="timeline"
        className={cn(
          "min-h-screen px-[var(--space-6)] py-[var(--space-16)]",
          surfaceClassName,
        )}
      >
        <TimelineBlock
          closingStatement={closingStatement}
          heading={heading}
          headingId={headingId}
          paragraphs={paragraphs}
          timelineEntries={timelineEntries}
          variant={variant}
          eyebrow={eyebrow}
        />
      </div>
    );
  }

  if (!mediaSrc) {
    throw new Error(`${sceneKind} scenes require mediaSrc`);
  }

  const mediaFirst = sceneKind === "split-reverse";
  const splitColumnsClassName = emphasizeMedia
    ? mediaFirst
      ? "md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
      : "md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
    : "md:grid-cols-2";

  return (
    <div data-testid="scene-layout" data-scene-layout={sceneKind} className={cn("min-h-screen px-[var(--space-6)] py-[var(--space-16)]", surfaceClassName)}>
      <div className={cn("mx-auto grid max-w-[var(--grid-max-width)] gap-[var(--space-8)] md:items-center", splitColumnsClassName)}>
        {mediaFirst && (
          <MediaFrame
            src={mediaSrc}
            alt={`${heading} media`}
            order="first"
            emphasizeMedia={emphasizeMedia}
            variant={variant}
          />
        )}

        <CopyBlock
          eyebrow={eyebrow}
          heading={heading}
          headingId={headingId}
          paragraphs={paragraphs}
          className={copyClassName}
          invert={isDark}
        />

        {!mediaFirst && (
          <MediaFrame
            src={mediaSrc}
            alt={`${heading} media`}
            order="last"
            emphasizeMedia={emphasizeMedia}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
}