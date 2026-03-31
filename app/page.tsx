export default function Home() {
  const sections = [
    { id: "hero", title: "Nuclear Energy: Powering the Future" },
    { id: "how-it-works", title: "How It Works" },
    { id: "benefits", title: "Benefits" },
    { id: "safety", title: "Safety" },
    { id: "fuel-cycle", title: "Fuel Cycle" },
    { id: "future-demand", title: "Powering AI and the Future Grid" },
    { id: "timeline", title: "Timeline" },
  ];

  return (
    <main id="main-content">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          style={{
            padding: "var(--space-16) var(--space-6)",
          }}
        >
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
        </section>
      ))}
    </main>
  );
}
