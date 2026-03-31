import { cn } from "@/lib/utils";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
  accentColor?: string;
  className?: string;
}

export function StepCard({
  stepNumber,
  title,
  description,
  accentColor,
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        "border border-[var(--color-surface-rule)] bg-[var(--color-bg-tertiary)] p-[var(--space-6)]",
        className,
      )}
    >
      <p
        className="text-[length:var(--font-size-section)] font-extrabold leading-none mb-[var(--space-3)]"
        style={{ color: `var(${accentColor || "--color-accent-blue"})` }}
      >
        {String(stepNumber).padStart(2, "0")}
      </p>
      <h3 className="text-[length:var(--font-size-sub)] font-bold text-[var(--color-text-primary)] mb-[var(--space-2)]">
        {title}
      </h3>
      <p className="text-[length:var(--font-size-body)] text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
