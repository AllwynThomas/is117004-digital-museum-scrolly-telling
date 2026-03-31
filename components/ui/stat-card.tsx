import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  context?: string;
  sourceId?: string;
  accentColor?: string;
  variant?: "light" | "dark";
  className?: string;
}

export function StatCard({
  value,
  label,
  context,
  accentColor,
  variant = "light",
  className,
}: StatCardProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("space-y-[var(--space-1)]", className)}>
      <p
        className="text-[length:var(--font-size-section)] font-extrabold leading-none"
        style={{ color: `var(${accentColor || "--color-accent-blue"})` }}
      >
        {value}
      </p>
      <p
        className={cn(
          "text-[length:var(--font-size-body)]",
          isDark
            ? "text-[var(--color-text-on-dark)]"
            : "text-[var(--color-text-primary)]",
        )}
      >
        {label}
      </p>
      {context && (
        <p
          className={cn(
            "text-[length:var(--font-size-caption)]",
            isDark
              ? "text-[var(--color-text-secondary-on-dark)]"
              : "text-[var(--color-text-secondary)]",
          )}
        >
          {context}
        </p>
      )}
    </div>
  );
}
