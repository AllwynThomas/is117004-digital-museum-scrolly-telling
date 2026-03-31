import { exhibitData } from "@/lib/exhibit-data";
import { SectionHeader } from "@/components/ui/section-header";
import { ExhibitImage } from "@/components/ui/exhibit-image";
import { StatCard } from "@/components/ui/stat-card";
import { StepCard } from "@/components/ui/step-card";
import { SourceBadge } from "@/components/ui/source-badge";

function getSource(id: string) {
  return exhibitData.sources.find((s) => s.id === id);
}

export default function Home() {
  const heroSection = exhibitData.sections.find((s) => s.id === "hero")!;
  const howItWorksSection = exhibitData.sections.find(
    (s) => s.id === "how-it-works",
  )!;
  const heroStats = exhibitData.statCards["hero"];
  const howItWorksSteps = exhibitData.processSteps["how-it-works"];

  const heroSource = getSource("uranium_vs_fossil_fuels_diagram");
  const reactorAnimSource = getSource("nuclearplant_animation");
  const nrcSource = getSource("nrc_pwr_overview");
  const doeSource = getSource("doe_nuclear_101");

  const placeholderSections = [
    { id: "benefits", title: "Benefits" },
    { id: "safety", title: "Safety" },
    { id: "fuel-cycle", title: "Fuel Cycle" },
    { id: "future-demand", title: "Powering AI and the Future Grid" },
    { id: "timeline", title: "Timeline" },
  ];

  return (
    <main id="main-content">
      {/* ── Hero Section ── */}
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="bg-[var(--color-bg-dark)] py-[var(--space-16)] px-[var(--space-6)]"
      >
        <div className="mx-auto max-w-[var(--grid-max-width)]">
          <SectionHeader
            eyebrow={heroSection.eyebrow}
            title={heroSection.title}
            lede={heroSection.lede}
            id="hero-title"
            variant="dark"
          />

          <div className="mt-[var(--space-8)]">
            <ExhibitImage
              src="/assets/images/uranium_vs_fossil_fuels_diagram.png"
              alt="Infographic comparing energy density: a single uranium fuel pellet produces as much energy as one ton of coal, 17,000 cubic feet of natural gas, or 149 gallons of oil."
              caption="Energy density comparison — one uranium pellet versus fossil fuel equivalents."
              sourceName="Visual Capitalist"
              sourceUrl={heroSource?.sourceUrl}
              priority={true}
              variant="dark"
            />
          </div>

          <p className="mt-[var(--space-8)] max-w-[720px] text-[length:var(--font-size-body)] leading-relaxed text-[var(--color-text-secondary-on-dark)]">
            {heroSection.bodyContent}
          </p>

          <div className="mt-[var(--space-12)] grid grid-cols-1 gap-[var(--space-8)] sm:grid-cols-3">
            {heroStats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                context={stat.context}
                accentColor={heroSection.accentColor}
                variant="dark"
              />
            ))}
          </div>

          {heroSection.transitionText && (
            <p className="mt-[var(--space-12)] text-[length:var(--font-size-body)] italic text-[var(--color-text-secondary-on-dark)]">
              {heroSection.transitionText}
            </p>
          )}
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-title"
        className="bg-[var(--color-bg-secondary)] py-[var(--space-16)] px-[var(--space-6)]"
      >
        <div className="mx-auto max-w-[var(--grid-max-width)]">
          <SectionHeader
            eyebrow={howItWorksSection.eyebrow}
            title={howItWorksSection.title}
            lede={howItWorksSection.lede}
            id="how-it-works-title"
            variant="light"
          />

          <div className="mt-[var(--space-8)]">
            <ExhibitImage
              src="/assets/images/nuclearplant.gif"
              alt="Animated diagram of a pressurized water reactor (PWR) cycle: fission heats water in the reactor core, steam transfers through the steam generator, spins the turbine and generator, then condenses and recycles."
              caption="How a pressurized water reactor generates electricity."
              sourceName="Nuclear Energy Institute"
              sourceUrl={reactorAnimSource?.sourceUrl}
              reducedMotionSrc="/assets/images/uranium_vs_fossil_fuels_diagram.png"
              variant="light"
            />
          </div>

          <div className="mt-[var(--space-12)] grid grid-cols-1 gap-[var(--grid-gutter)] md:grid-cols-2 xl:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <StepCard
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                accentColor={howItWorksSection.accentColor}
              />
            ))}
          </div>

          <div className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-3)]">
            {nrcSource && (
              <SourceBadge
                sourceName="U.S. Nuclear Regulatory Commission"
                sourceUrl={nrcSource.sourceUrl}
              />
            )}
            {doeSource && (
              <SourceBadge
                sourceName="U.S. Department of Energy"
                sourceUrl={doeSource.sourceUrl}
              />
            )}
          </div>

          {howItWorksSection.transitionText && (
            <p className="mt-[var(--space-12)] text-[length:var(--font-size-body)] italic text-[var(--color-text-secondary)]">
              {howItWorksSection.transitionText}
            </p>
          )}
        </div>
      </section>

      {/* ── Placeholder Sections ── */}
      {placeholderSections.map((section) => (
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
