import type { ProficiencyLevel, AttemptOutcome } from '@/types/api';

export const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
  informed: 'Geïnformeerd',
  beginner: 'Beginner',
  advanced: 'Gevorderd',
  expert: 'Expert',
  master: 'Master',
};

export const PROFICIENCY_DESCRIPTIONS: Record<ProficiencyLevel, string> = {
  informed: 'Kent terminologie en theoretische basis.',
  beginner: 'Kan eenvoudige opgaven onder begeleiding uitvoeren.',
  advanced: 'Werkt zelfstandig aan standaardproblemen.',
  expert: 'Lost complexe problemen op en begeleidt anderen.',
  master: 'Diepgaande beheersing op specialist-niveau.',
};

export const PROFICIENCY_RANK: Record<ProficiencyLevel, number> = {
  informed: 1,
  beginner: 2,
  advanced: 3,
  expert: 4,
  master: 5,
};

export const PROFICIENCY_ORDER: ProficiencyLevel[] = [
  'informed',
  'beginner',
  'advanced',
  'expert',
  'master',
];

export function outcomeLabel(outcome: AttemptOutcome | null): string {
  if (!outcome) return 'In behandeling';
  if (outcome === 'failed') return 'Niet geslaagd';
  return PROFICIENCY_LABELS[outcome];
}

export function outcomeBadgeClass(outcome: AttemptOutcome | null): string {
  if (!outcome) return 'bg-gray-100 text-gray-700';
  if (outcome === 'failed') return 'bg-red-100 text-red-700';
  return 'bg-green-100 text-green-700';
}
