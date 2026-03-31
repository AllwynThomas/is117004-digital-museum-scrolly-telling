export interface Source {
  id: string;
  type: string;
  title: string;
  sourceUrl: string;
  recommendedUse: string;
  notes: string;
  licenseNote: string;
}

export interface ExhibitSection {
  id: string;
  title: string;
  eyebrow: string;
  lede: string;
  bodyContent: string;
  sourceIds: string[];
  accentColor: string;
  transitionText?: string;
}

export interface TimelineEntry {
  year: number | string;
  title: string;
  description: string;
  sourceIds: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
}

export interface StatCard {
  value: string;
  label: string;
  context: string;
  sourceId: string;
}

export interface ExhibitData {
  sections: ExhibitSection[];
  timelineEntries: TimelineEntry[];
  processSteps: Record<string, ProcessStep[]>;
  statCards: Record<string, StatCard[]>;
  sources: Source[];
}

export const exhibitData: ExhibitData = {
  sections: [
    {
      id: "hero",
      title: "The Power of Nuclear Energy",
      eyebrow: "Exhibit Opening",
      lede: "What if one fuel pellet could replace a ton of coal?",
      bodyContent:
        "Nuclear energy is one of the most powerful and reliable sources of electricity on Earth. A single uranium fuel pellet — roughly the size of a gummy bear — contains as much energy as one ton of coal, 17,000 cubic feet of natural gas, or 149 gallons of oil. Today, more than 440 reactors operate across 32 countries, generating roughly 10% of the world's electricity around the clock, with near-zero carbon emissions.",
      sourceIds: ["uranium_vs_fossil_fuels_diagram"],
      accentColor: "--color-accent-cyan",
      transitionText:
        "To understand why that pellet is so powerful, you need to see what happens inside a reactor.",
    },
    {
      id: "how-it-works",
      title: "How a Reactor Makes Electricity",
      eyebrow: "Inside the Reactor",
      lede: "A pressurized water reactor converts the heat from splitting uranium atoms into the steam that spins a turbine and generates electricity — all in a closed, continuously recycling loop.",
      bodyContent:
        "Most of the world's nuclear plants use pressurized water reactors (PWRs). The process is elegantly simple: split atoms to make heat, use heat to make steam, use steam to spin a turbine, and the generator converts that motion into electricity. The water that absorbs the heat never leaves the reactor building — it transfers energy through a steam generator to a separate water loop, adding an extra layer of safety.",
      sourceIds: [
        "nuclearplant_animation",
        "nrc_pwr_overview",
        "doe_nuclear_101",
      ],
      accentColor: "--color-accent-blue",
      transitionText:
        "Now that you see how the energy is made, here is how it compares with every other source.",
    },
  ],
  timelineEntries: [],
  processSteps: {
    "how-it-works": [
      {
        stepNumber: 1,
        title: "Fission → Heat",
        description:
          "Uranium atoms split inside the reactor core, releasing tremendous thermal energy.",
      },
      {
        stepNumber: 2,
        title: "Steam Generation",
        description:
          "The heat boils water into high-pressure steam in the steam generator.",
      },
      {
        stepNumber: 3,
        title: "Turbine & Generator",
        description:
          "High-pressure steam spins the turbine, and the connected generator converts mechanical energy into electricity.",
      },
      {
        stepNumber: 4,
        title: "Cooling & Recycling",
        description:
          "Steam condenses back into water in the cooling system and returns to the steam generator to repeat the cycle.",
      },
    ],
  },
  statCards: {
    hero: [
      {
        value: "440+",
        label: "Operating Reactors",
        context: "Worldwide",
        sourceId: "iaea_science_of_nuclear_power",
      },
      {
        value: "32",
        label: "Countries",
        context: "With nuclear power programs",
        sourceId: "iaea_science_of_nuclear_power",
      },
      {
        value: "~10%",
        label: "Global Electricity",
        context: "From nuclear sources",
        sourceId: "iaea_science_of_nuclear_power",
      },
    ],
  },
  sources: [
    {
      id: "uranium_vs_fossil_fuels_diagram",
      type: "image",
      title: "The Power of a Uranium Pellet Compared to Fossil Fuels",
      sourceUrl:
        "https://elements.visualcapitalist.com/the-power-of-a-uranium-pellet/",
      recommendedUse:
        "Illustrate the extraordinary energy density of uranium fuel compared with coal, oil, and gas.",
      notes: "Good hero image for a pro-nuclear opening section.",
      licenseNote: "Verify reuse permission before publication.",
    },
    {
      id: "nuclearplant_animation",
      type: "animation",
      title: "How a Nuclear Reactor Actually Works",
      sourceUrl:
        "https://www.nei.org/fundamentals/how-a-nuclear-reactor-works",
      recommendedUse:
        "Explain reactor heat generation, steam production, turbine rotation, and electricity production.",
      notes:
        "Best simple animation for understanding the core process of PWR reactor.",
      licenseNote: "Verify reuse permission before publication.",
    },
    {
      id: "nrc_pwr_overview",
      type: "reference_page",
      title: "Pressurized Water Reactors",
      sourceUrl: "https://www.nrc.gov/reactors/power/pwrs",
      recommendedUse:
        "Authoritative explanation of how a common reactor type works.",
      notes: "Useful for accurate technical copy and exhibit captions.",
      licenseNote: "Public agency source; verify any graphic reuse terms.",
    },
    {
      id: "doe_nuclear_101",
      type: "educational_page",
      title: "NUCLEAR 101: How Does a Nuclear Reactor Work?",
      sourceUrl:
        "https://www.energy.gov/ne/articles/nuclear-101-how-does-nuclear-reactor-work",
      recommendedUse:
        "Clear, illustrated explanation of how PWR and BWR light-water reactors produce electricity through fission.",
      notes:
        "Includes DOE-produced infographic diagrams of both reactor types.",
      licenseNote: "Public agency source; suitable for citation and reference.",
    },
    {
      id: "iaea_science_of_nuclear_power",
      type: "educational_page",
      title: "What is Nuclear Energy? The Science of Nuclear Power",
      sourceUrl:
        "https://www.iaea.org/newscenter/news/what-is-nuclear-energy-the-science-of-nuclear-power",
      recommendedUse:
        "Comprehensive overview covering fission, reactor operation, fuel cycle, waste management, and nuclear power's role in climate change mitigation.",
      notes:
        "Updated for COP30 (2025). Covers 400+ global reactors and projections to 2050.",
      licenseNote: "Verify reuse permission before publication.",
    },
  ],
};
