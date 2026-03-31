import { cn } from "@/lib/utils";

interface SourceBadgeProps {
  sourceName: string;
  sourceUrl?: string;
  variant?: "light" | "dark";
  className?: string;
}

export function SourceBadge({
  sourceName,
  sourceUrl,
  variant = "light",
  className,
}: SourceBadgeProps) {
  const textColor =
    variant === "dark"
      ? "text-[var(--color-text-secondary-on-dark)]"
      : "text-[var(--color-text-secondary)]";

  const badgeContent = (
    <span
      className={cn(
        "inline-block text-[length:var(--font-size-badge)] leading-tight border border-[var(--color-surface-rule)] px-[var(--space-2)] py-[var(--space-1)]",
        textColor,
        className,
      )}
    >
      Source: {sourceName}
    </span>
  );

  if (sourceUrl) {
    return (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {badgeContent}
      </a>
    );
  }

  return badgeContent;
}
