import type { PresentationNavigationState } from "@/components/presentation/presentation-navigation";

interface PresentationProgressProps {
  sceneLabels: string[];
  navigation: PresentationNavigationState | null;
  onJumpToScene: (sceneIndex: number) => void;
}

export function PresentationProgress({
  sceneLabels,
  navigation,
  onJumpToScene,
}: PresentationProgressProps) {
  if (!navigation || sceneLabels.length === 0) {
    return null;
  }

  const activeLabel = sceneLabels[navigation.activeIndex] ?? "Current scene";

  return (
    <nav
      aria-label="Presentation progress"
      className="fixed bottom-[var(--space-4)] left-1/2 z-30 w-[min(calc(100vw-2*var(--space-4)),32rem)] -translate-x-1/2 rounded-full border border-[var(--color-surface-rule)] bg-[color:rgba(255,255,255,0.94)] px-[var(--space-4)] py-[var(--space-3)] shadow-[0_10px_30px_rgba(31,35,40,0.12)] backdrop-blur"
    >
      <div className="flex items-center gap-[var(--space-3)]">
        <p
          aria-live="polite"
          className="min-w-0 flex-1 truncate text-[length:var(--font-size-caption)] font-medium text-[var(--color-text-primary)]"
        >
          {`Scene ${navigation.activeIndex + 1} of ${navigation.sceneCount}: ${activeLabel}`}
        </p>

        <ol className="m-0 flex list-none items-center gap-[var(--space-2)] overflow-x-auto p-0">
          {sceneLabels.map((label, index) => {
            const isActive = index === navigation.activeIndex;

            return (
              <li key={`${index}-${label}`}>
                <button
                  type="button"
                  onClick={() => onJumpToScene(index)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Go to scene ${index + 1}: ${label}`}
                  className={
                    isActive
                      ? "flex h-8 min-w-8 items-center justify-center rounded-full border border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)] px-[var(--space-3)] text-[length:var(--font-size-caption)] font-semibold text-[var(--color-text-on-dark)]"
                      : "flex h-8 min-w-8 items-center justify-center rounded-full border border-[var(--color-surface-rule)] bg-[var(--color-bg-primary)] px-[var(--space-3)] text-[length:var(--font-size-caption)] font-medium text-[var(--color-text-secondary)]"
                  }
                >
                  {index + 1}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}