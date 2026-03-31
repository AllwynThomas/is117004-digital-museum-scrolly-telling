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
  sections: [],
  timelineEntries: [],
  processSteps: {},
  statCards: {},
  sources: [],
};
