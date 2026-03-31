export function SiteFooter() {
  return (
    <footer
      className="border-t border-[var(--color-surface-rule)] bg-[var(--color-bg-secondary)]"
      style={{ padding: "var(--space-16) var(--space-6)" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--grid-max-width)" }}
      >
        <h2
          className="font-bold"
          style={{
            fontSize: "var(--font-size-section)",
            marginBottom: "var(--space-6)",
            color: "var(--color-text-primary)",
          }}
        >
          Sources and Attribution
        </h2>

        <div
          className="border-t border-[var(--color-surface-rule)]"
          style={{
            paddingTop: "var(--space-6)",
            marginBottom: "var(--space-8)",
          }}
        >
          <p
            className="text-[var(--color-text-secondary)]"
            style={{ fontSize: "var(--font-size-body)" }}
          >
            Source list will be populated from exhibit data.
          </p>
        </div>

        <p
          className="text-[var(--color-text-secondary)] italic"
          style={{ fontSize: "var(--font-size-caption)" }}
        >
          We showed you the evidence. Here is where to verify it yourself.
        </p>
      </div>
    </footer>
  );
}
