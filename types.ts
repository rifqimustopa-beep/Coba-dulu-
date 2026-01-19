
export type AppMode = 'citizen' | 'admin';

export enum MustahikStatus {
  PENDING = 'Pending',
  APPROVED = 'Diterima',
  SURVEY = 'Dalam Survey',
  REJECTED = 'Ditolak'
}

export enum AsnafCategory {
  FAKIR = 'Fakir',
  MISKIN = 'Miskin',
  AMIL = 'Amil',
  MUALAF = 'Mualaf',
  RIQAB = 'Riqab',
  GHARIM = 'Gharim',
  FISABILILLAH = 'Fisabilillah',
  IBNU_SABIL = 'Ibnu Sabil'
}

// Added age property and adjusted mandatory fields to fix errors in constants.tsx mock data
export interface Mustahik {
  id: string;
  name: string;
  // nik is made optional because it's missing in initial mock data
  nik?: string;
  // age added to resolve "Object literal may only specify known properties" errors in constants.tsx
  age?: number;
  category: string;
  // reason is made optional because it's missing in initial mock data
  reason?: string;
  status: MustahikStatus;
  submissionDate: string;
  location: string;
  income?: number;
  dependents?: number;
}

export interface AIAnalysisResult {
  eligibilityScore: number;
  recommendation: string;
  reasoning: string[];
  suggestedProgram: string;
}

export type AppView = 'dashboard' | 'distribution' | 'programs' | 'mustahik' | 'ai-verifier';