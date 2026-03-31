# Digital Museum — Nuclear Energy Generation — Spec

> **Status:** Planned

## Problem Statement

Nuclear energy produces roughly 20% of U.S. electricity and is the largest
source of clean, carbon-free power in the country, yet public understanding of
how reactors work, how nuclear compares with fossil fuels, and what the actual
safety record shows remains shallow and distorted by decades of
misrepresentation in popular culture.

That gap creates three concrete problems a digital museum can address:

1. **Most visitors cannot explain how a nuclear reactor generates
   electricity.** The fission → heat → steam → turbine → generator chain is
   straightforward, but it is rarely taught clearly outside engineering
   programs. Without that foundation, safety and waste conversations become
   emotional rather than evidence-based.

2. **Common misconceptions about nuclear safety persist despite strong data.**
   Nuclear power has the lowest death rate per unit of energy produced of any
   major source, and its lifecycle greenhouse gas emissions rival wind and
   solar. Yet fear of accidents dominates public perception, displacing the
   comparative data that would put nuclear in proper context.

3. **Rising electricity demand from AI data centers makes the question
   urgent.** Data center power consumption is growing at roughly 30% annually.
   These facilities require 24/7, high-density, low-carbon power — precisely
   the profile nuclear delivers. Visitors who leave the exhibit without
   understanding that connection miss the reason this topic matters now, not
   just historically.

### Evidence From Available Sources

| # | Problem | Evidence | Impact |
|---|---------|----------|--------|
| 1 | Reactor process is not common knowledge | NEI and DOE educational pages exist because the public needs basic explanations of PWR operation | Visitors cannot evaluate safety or waste claims without understanding the core process |
| 2 | Nuclear's safety advantage is invisible to most people | Our World in Data chart shows nuclear has the fewest deaths per TWh of any major source | Fear-based opposition persists despite the strongest comparative safety record |
| 3 | Energy density comparison is rarely visualized | Visual Capitalist uranium pellet diagram shows one pellet ≈ 1 ton of coal | Without this framing, visitors cannot grasp why nuclear fuel efficiency matters |
| 4 | Data center demand is reshaping energy planning | Deloitte analysis documents nuclear's fit for 24/7 AI infrastructure power | The exhibit risks feeling historical rather than forward-looking without this connection |
| 5 | No existing single-page exhibit combines all four angles | Sources span DOE, NRC, EIA, IAEA, Our World in Data, and Deloitte but no unified museum experience exists | Visitors must assemble the story from scattered agency pages — the museum solves that |

### What The Exhibit Must Do

- Teach the basic reactor process clearly enough that a non-technical visitor
  can explain it afterward.
- Show the comparative safety and emissions data so visitors leave with
  evidence, not just reassurance.
- Visualize energy density so the fuel-efficiency argument is visceral, not
  abstract.
- Connect nuclear power to future electricity demand so the exhibit feels
  urgent and forward-looking.
- Present honest context on waste and accidents without dismissing them, but
  frame them as managed engineering challenges supported by data.

---

## Design Foundations

Before defining the site architecture, three foundational decisions must be
made. These shape everything downstream — palette, tone, layout, interaction,
and copy. The reference repository teaches that surface imitation without
structural thinking produces weak sites. These three decisions provide the
structural thinking.

### Task 1 — Design Style: Swiss International Style

**What this decision controls:** the visual grounding and aesthetic logic of
every surface on the site.

**Chosen style: Swiss International Style**

The Swiss International Typographic Style emerged in 1950s Switzerland as a
design movement dedicated to one idea: visual communication should be
objective, systematic, and clear. It is the design tradition behind Helvetica,
the mathematical grid, and the principle that structure itself creates beauty.

This style is appropriate for a nuclear energy museum because:

- Nuclear energy is surrounded by emotional noise. Swiss design is built to
  cut through noise with objective clarity. The grid, the type hierarchy, and
  the restrained palette tell the visitor: this is a place of evidence, not
  opinion.
- The exhibit depends on data — charts, comparisons, process diagrams,
  statistics. Swiss style was invented to present exactly this kind of
  information with maximum legibility and minimum distraction.
- Visitors arriving with fear or skepticism need an environment that feels
  neutral and authoritative, not promotional or decorative. Swiss design
  earns trust through visual order rather than through emotional persuasion.

**Visual signatures of Swiss International Style:**

| Element | Treatment |
|---------|-----------|
| Color palette | Crisp white and light neutral backgrounds with a strict accent system — nuclear blue for authority, reactor cyan for energy, signal red for safety context, and warm amber for data highlights |
| Typography | Grotesque sans-serif family (e.g., Inter, Helvetica Neue, or similar neo-grotesque). Heavy weight for display headings, regular weight for body, tight tracking on headlines for Swiss density |
| Grid | Strict multi-column grid with consistent gutters and margins — the grid is the primary organizational tool, not decoration |
| Surfaces | Clean white or light-gray panels with generous whitespace. Borders are thin, precise rules — not drop shadows or gradients |
| Imagery | Full-bleed or precisely cropped within the grid. Images are documentary evidence, not atmosphere. Captions are always present |
| Spacing | Generous and mathematical — consistent vertical rhythm derived from the baseline grid |
| Motion | Minimal. Content appears through clean fades or slides. No bouncing, wobbling, or particle effects |
| Layout metaphor | The exhibit should feel like a well-designed Swiss science poster exhibition — precise, confident, information-rich, and visually quiet |

**Color system:**

| Token | Value | Role |
|-------|-------|------|
| `--color-bg-primary` | `#ffffff` | Clean white — primary background |
| `--color-bg-secondary` | `#f6f8fa` | Light gray — alternate section background |
| `--color-bg-tertiary` | `#eaeef2` | Subtle panel and card surface |
| `--color-bg-dark` | `#0d1117` | Dark panel for contrast sections (timeline, hero) |
| `--color-surface-rule` | `#d0d7de` | Thin rules, borders, dividers |
| `--color-text-primary` | `#1f2328` | Near-black body text — maximum readability |
| `--color-text-secondary` | `#656d76` | Supporting labels, captions, eyebrows |
| `--color-accent-blue` | `#0969da` | Primary accent — links, active nav, authority signals |
| `--color-accent-cyan` | `#00e5ff` | Reactor energy — data highlights, glow effects on dark panels |
| `--color-accent-red` | `#cf222e` | Signal red — safety section context, not danger |
| `--color-accent-amber` | `#bf8700` | Warm data accent — statistics, fuel cycle highlights |
| `--color-accent-green` | `#1a7f37` | Positive data — emissions comparisons, capacity factor |

**How Swiss International Style differs from the reference site's
museum-editorial style:**

The reference site uses warm paper surfaces, serif display type, and a
documentary-catalog metaphor suited to intellectual history. A nuclear energy
museum demands a different register: the subject is infrastructure, measured
outcomes, and comparative data. Swiss style replaces editorial warmth with
objective precision — the grid and type hierarchy do the organizational work
that the reference site achieves through warm surfaces and curatorial pacing.
The underlying discipline is the same: consistent tokens, repeatable
components, and purposeful hierarchy. The expression changes from literary
to scientific.

---

### Task 2 — Cialdini's Persuasion Principles

**What this decision controls:** how the site shapes visitor engagement,
builds trust, and moves users toward informed understanding.

Robert Cialdini's six principles of persuasion are not marketing tricks. In a
museum context, they are visitor-psychology tools that determine whether
someone scrolls past or stops, reads, and remembers.

Each principle is mapped to a concrete exhibit strategy:

#### 1. Authority

**Principle:** People trust credible, expert sources.

**Exhibit application:** Every factual claim is anchored to a named public
agency or peer-reviewed data source. The exhibit prominently attributes data
to the NRC, DOE, EIA, IAEA, and Our World in Data. Source badges appear on
charts and key statistics. The exhibit does not ask visitors to trust the site
itself — it asks visitors to trust the institutions behind the data.

**Implementation:** Source-attribution badges on all data visuals. Footer
source list with direct links. "Source:" labels on every statistic card.

#### 2. Social Proof

**Principle:** People follow the behavior and beliefs of others.

**Exhibit application:** The site surfaces the global scale of nuclear
adoption. 440+ reactors operate in 32 countries. Nuclear provides ~10% of
global electricity. Frame nuclear not as an experimental outlier but as a
proven, globally deployed technology.

**Implementation:** A "Nuclear Worldwide" statistics bar or map showing
reactor count, countries, and generation share. Positioned early in the
exhibit to normalize nuclear power before the visitor encounters safety
discussions.

#### 3. Commitment and Consistency

**Principle:** People align future behavior with prior commitments.

**Exhibit application:** The exhibit opens with a question or micro-commitment
that visitors answer internally: "What if one fuel pellet could replace an
entire ton of coal?" or "Do you know which energy source has the fewest deaths
per unit of power?" Once visitors engage with that question, they are
psychologically primed to follow the exhibit's answer through the remaining
sections.

**Implementation:** Hero section opens with a provocative comparison question.
Each subsequent section delivers the answer to that question progressively.
The visitor's initial curiosity becomes the thread that pulls them through.

#### 4. Liking

**Principle:** People are persuaded by sources they find relatable or
appealing.

**Exhibit application:** The Swiss aesthetic is designed to feel
objective and trustworthy rather than cold. Human-scale details — the size of
a fuel pellet in a visitor's hand, the number of homes one reactor powers,
the comparison to everyday electricity use — keep the engineering grounded in
lived experience.

**Implementation:** Human-scale comparisons on every data point. "One pellet
powers a household for 6 months." "One plant powers a city of 740,000." Keep
technical precision but express it through relatable units.

#### 5. Scarcity / Urgency

**Principle:** People value what feels time-sensitive or limited.

**Exhibit application:** The future-demand section creates genuine urgency.
AI data centers need power now. Grid capacity is constrained now. Carbon
reduction targets have deadlines. The exhibit frames nuclear not as a
historical curiosity but as an answer to a present and escalating problem.

**Implementation:** "Powering AI and the Future Grid" section uses real
growth projections. Countdown-style statistics: "Data center power demand is
growing ~30% per year." "By 2030, data centers may consume 8% of U.S.
electricity."

#### 6. Reciprocity

**Principle:** People feel obligated to return value when they receive
something useful.

**Exhibit application:** The exhibit gives visitors genuine understanding for
free — clear explanations, honest data, real sources. That generosity builds
goodwill and trust. Visitors who feel they learned something real are more
likely to share the exhibit, revisit it, or carry its framing into future
energy conversations.

**Implementation:** Every section teaches something concrete and verifiable.
No section is purely decorative or promotional. The source list at the bottom
says: "We showed you the evidence. Here is where to verify it yourself."

---

### Task 3 — Brand Archetype: The Sage

**What this decision controls:** the site's psychological identity, voice,
and rhetorical posture.

**Chosen archetype: The Sage**

The Sage archetype is driven by the desire to understand the world and share
that understanding. The Sage values truth, evidence, analysis, and clarity.
The Sage's fear is ignorance, misinformation, and being misled.

This is the right archetype for a nuclear energy museum because:

- The exhibit's core mission is education, not persuasion-for-its-own-sake.
  The Sage teaches; the visitor decides.
- Nuclear energy is surrounded by misinformation. The Sage's natural posture
  — calm, evidence-first, source-backed — directly counters fear-based
  narratives without becoming defensive or promotional.
- The Sage earns authority through knowledge, not through status or
  charisma. That matches the exhibit's strategy of anchoring every claim to
  public-agency data.

**Voice characteristics:**

| Dimension | Sage register |
|-----------|---------------|
| Tone | Calm, confident, measured — never anxious, never dismissive |
| Vocabulary | Precise but accessible — technical terms always explained on first use |
| Sentence rhythm | Declarative and clear — short sentences for facts, longer sentences for context |
| Emotional posture | Respectful curiosity — acknowledges what visitors think and then offers the data |
| Rhetorical stance | "Here is what the evidence shows" — not "you should believe this" |
| Error handling | When addressing misconceptions, leads with the correct fact rather than dwelling on the wrong one |

**How The Sage shapes exhibit copy:**

- **Hero section:** "A single uranium pellet contains as much energy as one
  ton of coal. This exhibit shows you how that energy becomes electricity —
  and why it matters for the future grid."
- **Safety section:** "Nuclear power produces the fewest deaths per unit of
  energy of any major source. The data comes from peer-reviewed studies
  compiled by Our World in Data."
- **Addressing accidents:** "Chernobyl and Fukushima are the two most
  studied nuclear incidents in history. Here is what the data shows about
  their actual death tolls — and how those numbers compare with routine
  fossil-fuel mortality."

**What The Sage avoids:**

- Promotional language: "Nuclear is the best!" → replace with measured
  comparison backed by data.
- Fear-based urgency: "If we don't build nuclear, we're doomed!" → replace
  with factual demand projections and option comparison.
- Dismissive framing: "People who fear nuclear are wrong" → replace with
  "The comparative safety data may surprise visitors who have not seen it
  before."

**Relationship between the three foundations:**

| Foundation | Controls | Nuclear museum application |
|------------|----------|--------------------------|
| Swiss International Style | How it looks | Objective clarity, grid precision, typographic hierarchy, evidence-first layout |
| Cialdini's Principles | How it persuades | Authority through sources, social proof through global scale, urgency through demand data |
| The Sage | How it speaks | Calm, evidence-first, respectful, clarifying |

These three foundations must remain consistent across every section, component,
and piece of copy. If a section looks industrial but speaks promotionally, or
speaks wisely but uses manipulative urgency, the visitor's trust breaks.

---

## Design Goals

1. **Teach the reactor process visually.** The "How It Works" section must
   make the fission → steam → turbine → generator chain legible through the
   animated GIF and supporting step cards. A non-technical visitor should be
   able to explain the basic process after viewing this section.

2. **Show comparative data, not just claims.** The benefits and safety sections
   must anchor every advantage to the Our World in Data chart, EIA statistics,
   or IAEA findings. No unsourced superlatives.

3. **Visualize energy density.** The uranium pellet comparison must be
   visceral and immediate. The Visual Capitalist diagram is the centerpiece
   of the hero section for this reason.

4. **Connect nuclear to future demand.** The data center section must use
   real growth projections from Deloitte and DOE to make nuclear feel urgent,
   not nostalgic.

5. **Address safety honestly.** The safety section must acknowledge Chernobyl
   and Fukushima by name, present the peer-reviewed death toll data, and
   contextualize those numbers against fossil-fuel mortality. Frame waste as a
   managed engineering problem with the NRC spent-fuel-storage reference.

6. **Present the fuel cycle as a complete story.** From mining through spent
   fuel storage, visitors should see nuclear fuel as a managed industrial
   process, not a mysterious black box.

7. **Build a timeline that shows scale.** The timeline section must show
   nuclear power's growth from experimental to global-scale infrastructure,
   reinforcing the social-proof principle.

8. **Maintain Swiss style consistency.** Every section must use the
   defined color tokens, grid, typography, and surface treatments. No
   section should feel like it belongs to a different site.

9. **Maintain Sage voice consistency.** Every piece of exhibit copy must be
   calm, evidence-first, and respectful. No promotional or fear-based
   language.

10. **Ensure accessibility.** All images must have descriptive alt text. Color
    contrast must meet WCAG AA. Navigation must work with keyboard only. The
    exhibit must be usable on mobile viewports.

---

## Architecture

### Governing Metaphor

**Science museum visitor center.**

The site behaves like walking through an interactive science museum exhibit
about nuclear energy — not reading a textbook, not watching a sales pitch, not
browsing an encyclopedia.

This metaphor controls:

- **Layout:** Visitors move through exhibit "rooms" (sections) in a designed
  sequence, but can also jump to specific rooms via navigation.
- **Pacing:** Each room has one primary teaching job. Rooms do not try to
  cover everything.
- **Evidence displays:** Charts, diagrams, and animations function like
  exhibit cases — objects the visitor stops to examine.
- **Labels and captions:** Short, precise explanatory text beside each visual,
  like museum wall labels.
- **Tone:** An informed guide, not a textbook and not a salesperson.

### Project Thesis

Nuclear energy becomes understandable when visitors see the reactor process,
the comparative data, the fuel lifecycle, and the future demand picture as one
connected story — not as isolated facts scattered across government agency
websites.

### Main Route (Content Spine)

The exhibit is structured as a single scrollable page with seven sections.
This is the main route — the designed visitor journey:

| Order | Section ID | Title | Primary Teaching Job | Key Sources |
|-------|-----------|-------|---------------------|-------------|
| 1 | `hero` | The Power of Nuclear Energy | Hook: energy density comparison, core thesis | `uranium_vs_fossil_fuels_diagram` |
| 2 | `how-it-works` | How a Reactor Makes Electricity | Teach the PWR process | `nuclearplant_animation`, `nrc_pwr_overview`, `doe_nuclear_101` |
| 3 | `benefits` | Why Nuclear Beats Fossil Fuels | Comparative safety and emissions data | `safest_cleanest_sources_chart`, `iaea_clean_energy_pdf` |
| 4 | `safety` | Addressing Nuclear Safety and Waste | Honest accident context, waste management | `ourworldindata_chernobyl_fukushima`, `nrc_spent_fuel_storage` |
| 5 | `fuel-cycle` | From Uranium to Electricity | Full lifecycle understanding | `eia_nuclear_fuel_cycle`, `iaea_science_of_nuclear_power` |
| 6 | `future-demand` | Powering AI and the Future Grid | Urgency: data center demand, SMRs | `deloitte_data_center_nuclear`, `doe_smr_overview` |
| 7 | `timeline` | The Rise of Nuclear Power | Scale: global adoption history | `iaea_nuclear_power_topic`, `world_nuclear_world_energy_needs` |

### Section Architecture

Each exhibit section follows a repeatable internal grammar:

```
┌─────────────────────────────────────────────┐
│  Section Header                             │
│  ┌─────────────────────────────────────────┐│
│  │  Eyebrow label  ·  Section number       ││
│  │  Section title (h2)                     ││
│  │  Section lede (1-2 sentences)           ││
│  └─────────────────────────────────────────┘│
│                                             │
│  Primary Visual                             │
│  ┌─────────────────────────────────────────┐│
│  │  Image / animation / chart              ││
│  │  Caption + source attribution           ││
│  └─────────────────────────────────────────┘│
│                                             │
│  Explanation Body                           │
│  ┌─────────────────────────────────────────┐│
│  │  Prose paragraph(s)                     ││
│  │  Supporting cards / steps / data points ││
│  └─────────────────────────────────────────┘│
│                                             │
│  Transition                                 │
│  ┌─────────────────────────────────────────┐│
│  │  Bridge sentence to next section        ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

This grammar keeps every room predictable without being monotonous. The
variation comes from content — what's taught — not from layout invention.

### Section Detail

#### 1. Hero — The Power of Nuclear Energy

- **Eyebrow:** Exhibit opening
- **Hook question:** "What if one fuel pellet could replace a ton of coal?"
  (Cialdini: commitment/consistency)
- **Primary visual:** `uranium_vs_fossil_fuels_diagram.png` — full-width,
  high-impact placement
- **Body copy:** Core thesis in Sage voice — what the exhibit will teach and
  why it matters. Brief global scale statistics (Cialdini: social proof):
  440+ reactors, 32 countries, ~10% of global electricity.
- **Source badge:** Visual Capitalist attribution
- **Transition:** "To understand why that pellet is so powerful, you need to
  see what happens inside a reactor."

#### 2. How It Works — How a Reactor Makes Electricity

- **Eyebrow:** Inside the reactor
- **Primary visual:** `nuclearplant.gif` — the animated PWR cycle
- **Body copy:** Plain-language explanation of the four-step process.
  Technical terms (fission, moderator, coolant) defined on first use.
- **Supporting cards (4):**
  1. Fission → Heat — uranium atoms split, releasing thermal energy
  2. Steam Generation — heat boils water into high-pressure steam
  3. Turbine & Generator — steam spins the turbine, generator makes
     electricity
  4. Cooling & Recycling — steam condenses, water returns to the cycle
- **Source badges:** NEI, NRC, DOE attribution
- **Transition:** "Now that you see how the energy is made, here is how it
  compares with every other source."

#### 3. Benefits — Why Nuclear Beats Fossil Fuels

- **Eyebrow:** The evidence
- **Primary visual:** `safest_cleanest_sources_of_energy_chart.png` —
  deaths and emissions comparison
- **Body copy:** Sage-voice interpretation of the chart data. Frame as
  measured comparison, not promotional claim.
- **Supporting cards (4):**
  1. Low Emissions — lifecycle CO₂ comparable to wind and solar
  2. Reliable 24/7 Power — capacity factor ~93%, highest of any source
  3. Energy Density — fuel efficiency comparison from hero, reinforced
  4. Proven Safety Record — fewest deaths per TWh of any major source
- **Source badges:** Our World in Data, IAEA, EIA attribution
- **Transition:** "If the safety record is this strong, why do accidents
  dominate the public conversation?"

#### 4. Safety — Addressing Nuclear Safety and Waste

- **Eyebrow:** Honest context
- **Primary approach:** Lead with the correct data, not with the
  misconception. (Sage archetype: state the fact, then address the fear.)
- **Body copy:** Deaths from Chernobyl and Fukushima in context. Direct
  comparison to routine fossil-fuel mortality. Waste framed as a managed
  volume problem — all U.S. spent fuel from 60 years fits on a football
  field stacked less than 10 yards high.
- **Supporting elements:**
  - Comparison data card: nuclear vs. coal vs. oil vs. gas deaths per TWh
  - Waste volume visualization or comparison
  - "How spent fuel is stored" brief with NRC reference
- **Source badges:** Our World in Data, NRC attribution
- **Transition:** "Nuclear fuel has one of the most carefully managed
  lifecycles of any energy source. Here is how it works from start to
  finish."

#### 5. Fuel Cycle — From Uranium to Electricity

- **Eyebrow:** The full journey
- **Primary visual:** Step-by-step lifecycle diagram or process flow
- **Process steps (5):**
  1. Mining & Milling — uranium ore extraction and processing
  2. Conversion & Enrichment — increasing U-235 concentration
  3. Fuel Fabrication — forming ceramic pellets, loading fuel rods
  4. Reactor Operation — the energy generation phase
  5. Storage & Disposal — spent fuel cooling, dry cask storage
- **Body copy:** Sage-voice explanation that demystifies each step.
  Emphasize that this is a carefully regulated industrial process at
  every stage.
- **Source badges:** EIA, IAEA, NRC attribution
- **Transition:** "With this lifecycle in view, the question becomes: where
  is nuclear energy headed next?"

#### 6. Future Demand — Powering AI and the Future Grid

- **Eyebrow:** Looking ahead
- **Body copy:** AI data centers as the new demand driver. Real numbers
  from Deloitte analysis. SMR technology as the next-generation solution.
  Frame as opportunity, not crisis (Sage avoids fear-mongering).
- **Supporting stat cards (3):**
  1. ~30% annual data center power growth
  2. 24/7 carbon-free power required
  3. SMRs: flexible, scalable, factory-built
- **Source badges:** Deloitte, DOE attribution
- **Transition:** "Nuclear power is not new. It has been growing for eight
  decades. Here is how it became a global energy source."

#### 7. Timeline — The Rise of Nuclear Power

- **Eyebrow:** History
- **Timeline milestones:**
  1. **1942** — Chicago Pile-1: first controlled nuclear chain reaction
  2. **1954** — Obninsk, USSR: first nuclear power plant connected to a grid
  3. **1957** — Shippingport, PA: first U.S. commercial nuclear plant
  4. **1979** — Three Mile Island: partial meltdown, no deaths, safety
     reforms follow
  5. **1986** — Chernobyl: worst nuclear accident, design and operator
     failures, global safety overhaul
  6. **2011** — Fukushima: tsunami-caused meltdowns, zero radiation deaths,
     evacuation-related deaths studied
  7. **2020s** — Nuclear renaissance: SMRs, AI demand, net-zero commitments
     drive renewed investment
- **Source badges:** IAEA, World Nuclear Association, EIA attribution
- **Closing:** Final Sage-voice statement. "Nuclear energy is not a
  hypothetical. It is a proven, global-scale, low-carbon power source — and
  the evidence is here for you to verify."

### Footer

- **Source list:** All sources from SOURCES.json with direct links, organized
  by type (government, data, industry).
- **Reciprocity signal:** "We showed you the evidence. Here is where to
  verify it yourself."
- **Attribution:** Visual asset credits and license notes.

### Navigation Model

- **Sticky header** with site title and anchor links to each section.
- **Section navigation** uses anchor links (`#hero`, `#how-it-works`,
  `#benefits`, `#safety`, `#fuel-cycle`, `#future-demand`, `#timeline`).
- **Active section highlighting** based on scroll position.
- **Mobile:** Hamburger menu or horizontal scroll nav for section links.

### Reusable Component Architecture

The following component families must be defined early and reused consistently:

| Component | Purpose | Used in |
|-----------|---------|---------|
| `SectionHeader` | Eyebrow + title + lede for every exhibit section | All 7 sections |
| `ExhibitImage` | Image/animation with caption and source badge | Hero, How It Works, Benefits, Safety |
| `StepCard` | Numbered process step with icon, title, description | How It Works, Fuel Cycle |
| `StatCard` | Single statistic with label, number, context | Benefits, Future Demand, Hero |
| `DataComparisonCard` | Side-by-side or stacked comparison data | Benefits, Safety |
| `TimelineEntry` | Year, title, description, optional badge | Timeline |
| `SourceBadge` | Small attributed-source label | All sections |
| `SiteHeader` | Sticky nav with section links | Global |
| `SiteFooter` | Source list, attribution, closing | Global |

### CSS Architecture

- **Token layer:** All colors, spacing, typography, and surface values defined
  as CSS custom properties in `:root`.
- **Spacing system:** Consistent scale (e.g., 4px base or phi-based) applied
  through tokens, not ad-hoc values.
- **Section theming:** Each section may carry a subtle accent variation
  (e.g., reactor cyan for How It Works, amber for Safety, green for Benefits)
  while staying within the Swiss palette.
- **Light-first design:** Primary background is white (`--color-bg-primary`).
  Dark text for maximum readability. Dark panels used selectively for contrast
  sections (hero, timeline). Accent colors provide hierarchy and data coding.
- **Responsive breakpoints:** Desktop (1200px+), tablet (768px–1199px),
  mobile (<768px). Single-column collapse on mobile.
- **Reduced motion:** All animations respect `prefers-reduced-motion`.

### Image and Media Policy

- All three primary source images are already acquired and stored locally in
  `public/assets/images/`.
- No external image URLs at runtime. All media served from `public/`.
- Each image must have a descriptive `alt` attribute and a visible source
  caption.
- The animated GIF (`nuclearplant.gif`) should be presented at a size where
  the reactor schematic is legible on both desktop and mobile.

### Content Data Model

Exhibit content should be centralized in a data structure (TypeScript file or
JSON) rather than scattered across component markup. This keeps copy editable
without touching layout code.

Minimum data entities:

- `sections[]` — ordered exhibit sections with id, title, eyebrow, lede,
  body content, source references
- `timelineEntries[]` — ordered milestones with year, title, description
- `processSteps[]` — ordered steps for How It Works and Fuel Cycle
- `statCards[]` — statistics with value, label, context, source
- `sources[]` — attribution data linked to SOURCES.json

---

## Security Considerations

- All images are local static assets — no external CDN dependencies at
  runtime.
- No user input forms or server-side processing — static site only.
- No environment variables or secrets required.
- Source URLs in the footer link to public government and data websites only.
- No client-side analytics or tracking scripts unless explicitly added later.

---

## Testing Strategy

1. **Build verification:** The site must build to static output without errors.
2. **Lint and format:** Code passes lint and format checks.
3. **Accessibility audit:** All images have `alt` text. Color contrast passes
   WCAG AA. Keyboard navigation works for all interactive elements.
4. **Image integrity:** Every image reference in the page resolves to a file
   in `public/assets/images/`.
5. **No external image URLs:** No `http` image sources in page markup.
6. **Responsive check:** Layout renders correctly at 1440px, 768px, and 390px
   viewports.
7. **Content accuracy:** All statistics cited in the exhibit are traceable to
   a source in SOURCES.json.
8. **Voice consistency:** All exhibit copy matches the Sage voice guidelines —
   no promotional, fear-based, or dismissive language.

---

## Sprint Plan

### Sprint 0 — Foundation Shell and Design Tokens

Establish the project skeleton: base HTML layout, global CSS with all design
tokens (colors, typography, spacing), site header with navigation, site
footer structure. No section content yet — just the architectural shell that
all later sprints build on.

**Deliverables:**

- Base layout with HTML structure, meta tags, and skip-to-content link
- Global CSS with all Swiss International Style design tokens
- Sticky site header with section nav links (anchors to future sections)
- Site footer skeleton with source list structure
- Responsive breakpoints and reduced-motion media query
- Build verification passes

### Sprint 1 — Hero and How It Works Sections

Build the first two exhibit rooms. The hero section establishes the thesis and
energy density visual. The How It Works section teaches the reactor process.
These two sections must prove the component architecture (SectionHeader,
ExhibitImage, StepCard) works before the remaining sections are built.

**Deliverables:**

- Hero section with uranium pellet diagram, hook question, global stats
- How It Works section with reactor animation GIF and 4 step cards
- SectionHeader, ExhibitImage, and StepCard components operational
- Source badges on both sections
- Responsive layout verified at 3 viewports

### Sprint 2 — Benefits and Safety Sections

Build the comparative-evidence room and the honest-context room. These are
the two most persuasion-sensitive sections and must demonstrate Sage voice
discipline and Cialdini principle application.

**Deliverables:**

- Benefits section with safety/emissions chart and 4 benefit cards
- Safety section with accident data, waste context, and comparison cards
- StatCard and DataComparisonCard components operational
- All source badges accurate and linked
- Copy reviewed against Sage voice guidelines

### Sprint 3 — Fuel Cycle and Future Demand Sections

Build the lifecycle room and the forward-looking room. The fuel cycle section
completes the technical education. The future demand section creates the
urgency connection to AI and grid needs.

**Deliverables:**

- Fuel Cycle section with 5-step process flow
- Future Demand section with data center stats and SMR context
- Process step and stat card patterns confirmed reusable from earlier sprints
- Source badges on both sections

### Sprint 4 — Timeline and Footer Completion

Build the historical scale room and complete the footer with full source
attribution. The timeline reinforces social proof (nuclear is global and
proven). The footer delivers the reciprocity principle (verify it yourself).

**Deliverables:**

- Timeline section with 7 milestones and TimelineEntry component
- Footer completed with organized source list, attribution, and closing
- All section transition language reviewed and connected
- Navigation active-state highlighting functional

### Sprint 5 — QA, Accessibility, and Polish

Full QA pass against the spec. Accessibility audit. Responsive verification
at all breakpoints. Voice consistency review. Performance check. This sprint
touches no new content — it verifies and polishes what exists.

**Deliverables:**

- All testing strategy items verified
- Accessibility audit complete (alt text, contrast, keyboard nav)
- Responsive layout confirmed at 1440px, 768px, 390px
- Copy reviewed for Sage voice consistency across all sections
- Build, lint, and format checks pass
- Performance acceptable (no layout shifts, images optimized)

---

## Future Considerations

These are explicitly out of scope for the current sprint plan but may be
valuable additions:

- **Interactive data visualizations:** Replace static chart images with
  interactive chart components (e.g., D3.js or Chart.js) for the benefits
  and timeline sections.
- **Additional exhibit pages:** Break sections into individual routes for
  deeper treatment if the single-page format becomes too long.
- **Nuclear around the world:** An interactive map showing reactor locations,
  types, and generation capacity by country.
- **Quiz or self-assessment:** A brief "what did you learn?" interactive
  element at the end of the exhibit.
- **Dark/light mode toggle:** The Swiss palette is light-first but
  a dark-mode variant could be added for visitor preference.
- **Print stylesheet:** A simplified print layout for visitors who want a
  takeaway document.
