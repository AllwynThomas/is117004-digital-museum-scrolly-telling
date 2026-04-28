type SceneLayoutKind = "plain" | "background" | "split" | "split-reverse";

interface SceneLayoutProps {
  sceneKind: SceneLayoutKind;
  heading: string;
  headingId: string;
  paragraphs: string[];
  backgroundSrc?: string | null;
  backgroundFocal?: string | null;
  mediaSrc?: string | null;
}

function assertSceneLayoutKind(sceneKind: string): asserts sceneKind is SceneLayoutKind {
  if (
    sceneKind !== "plain" &&
    sceneKind !== "background" &&
    sceneKind !== "split" &&
    sceneKind !== "split-reverse"
  ) {
    throw new Error(`Unsupported scene layout kind: ${sceneKind}`);
  }
}

function CopyBlock({
  heading,
  headingId,
  paragraphs,
  invert = false,
}: {
  heading: string;
  headingId: string;
  paragraphs: string[];
  invert?: boolean;
}) {
  return (
    <div
      data-testid="scene-copy"
      className={invert ? "bg-black/70 p-[var(--space-6)]" : undefined}
    >
      <h2
        id={headingId}
        className={invert ? "text-[length:var(--font-size-section)] font-bold text-[var(--color-text-on-dark)]" : "text-[length:var(--font-size-section)] font-bold text-[var(--color-text-primary)]"}
      >
        {heading}
      </h2>

      <div
        className={invert ? "mt-[var(--space-6)] flex flex-col gap-[var(--space-4)] text-[length:var(--font-size-body)] text-[var(--color-text-secondary-on-dark)]" : "mt-[var(--space-6)] flex flex-col gap-[var(--space-4)] text-[length:var(--font-size-body)] text-[var(--color-text-secondary)]"}
      >
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
        ) : (
          <p>Scene copy will be added here.</p>
        )}
      </div>
    </div>
  );
}

function MediaFrame({
  src,
  alt,
  order,
  focal,
}: {
  src: string;
  alt: string;
  order: "first" | "last";
  focal?: string | null;
}) {
  return (
    <div data-testid="scene-media" data-media-order={order}>
      <img
        src={src}
        alt={alt}
        data-background-focal={focal ?? undefined}
        className="h-full w-full object-cover"
        style={focal ? { objectPosition: focal } : undefined}
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
  mediaSrc = null,
}: SceneLayoutProps) {
  assertSceneLayoutKind(sceneKind);

  if (sceneKind === "plain") {
    return (
      <div data-testid="scene-layout" data-scene-layout="plain" className="min-h-screen px-[var(--space-6)] py-[var(--space-16)]">
        <div className="mx-auto max-w-[var(--grid-max-width)]">
          <CopyBlock heading={heading} headingId={headingId} paragraphs={paragraphs} />
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
        <img
          src={backgroundSrc}
          alt={`${heading} background`}
          data-background-focal={backgroundFocal ?? undefined}
          className="absolute inset-0 h-full w-full object-cover"
          style={backgroundFocal ? { objectPosition: backgroundFocal } : undefined}
        />
        <div className="relative z-10 mx-auto max-w-[var(--grid-max-width)]">
          <CopyBlock
            heading={heading}
            headingId={headingId}
            paragraphs={paragraphs}
            invert={true}
          />
        </div>
      </div>
    );
  }

  if (!mediaSrc) {
    throw new Error(`${sceneKind} scenes require mediaSrc`);
  }

  const mediaFirst = sceneKind === "split-reverse";

  return (
    <div data-testid="scene-layout" data-scene-layout={sceneKind} className="min-h-screen px-[var(--space-6)] py-[var(--space-16)]">
      <div className="mx-auto grid max-w-[var(--grid-max-width)] gap-[var(--space-8)] md:grid-cols-2 md:items-center">
        {mediaFirst && (
          <MediaFrame src={mediaSrc} alt={`${heading} media`} order="first" />
        )}

        <CopyBlock heading={heading} headingId={headingId} paragraphs={paragraphs} />

        {!mediaFirst && (
          <MediaFrame src={mediaSrc} alt={`${heading} media`} order="last" />
        )}
      </div>
    </div>
  );
}