import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  sectionNumber?: number;
  title: string;
  lede?: string;
  id: string;
  variant?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  sectionNumber,
  title,
  lede,
  id,
  variant = "light",
  className,
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("space-y-[var(--space-4)]", className)}>
      <p
        className={cn(
          "text-[length:var(--font-size-caption)] font-semibold uppercase tracking-[0.2em]",
          isDark
            ? "text-[var(--color-text-secondary-on-dark)]"
            : "text-[var(--color-text-secondary)]",
        )}
      >
        {sectionNumber !== undefined && (
          <span className="mr-[var(--space-2)]">
            {String(sectionNumber).padStart(2, "0")}
          </span>
        )}
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "text-[length:var(--font-size-section)] font-bold leading-tight",
          isDark
            ? "text-[var(--color-text-on-dark)]"
            : "text-[var(--color-text-primary)]",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "max-w-[720px] text-[length:var(--font-size-body)] leading-relaxed",
            isDark
              ? "text-[var(--color-text-secondary-on-dark)]"
              : "text-[var(--color-text-secondary)]",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
