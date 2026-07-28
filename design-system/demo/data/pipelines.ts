import type { DomainKey } from './types'

export type StepKind = 'resolve' | 'type' | 'mask' | 'chunk' | 'embed' | 'normalise'

export interface PlanStep {
  id: string
  kind: StepKind
  title: string
  detail: string
  /** The number that justifies the step. */
  count: number
  unit: string
  /** Points the readiness score would gain. */
  delta: number
  domain: DomainKey
  runtime: string
}

export const PLAN: PlanStep[] = [
  { id: 'p1', kind: 'resolve', title: 'Resolve duplicate policyholders',
    detail: 'Match across Guidewire, Salesforce and the policy mart, then merge.',
    count: 41_208, unit: 'records', delta: 7, domain: 'policies', runtime: '~48 min' },
  { id: 'p2', kind: 'type', title: 'Assign semantic types',
    detail: 'Label premium, payout, deductible and reserve so agents can reason about them.',
    count: 380, unit: 'columns', delta: 6, domain: 'claims', runtime: '~22 min' },
  { id: 'p3', kind: 'mask', title: 'Mask personal data',
    detail: 'Hash national ID, redact email and phone at serving time.',
    count: 12, unit: 'columns', delta: 5, domain: 'broker-network', runtime: '~6 min' },
  { id: 'p4', kind: 'chunk', title: 'Chunk treaty and contract documents',
    detail: 'Clause-level chunks so retrieval returns the term, not the file.',
    count: 22_470, unit: 'documents', delta: 9, domain: 'reinsurance', runtime: '~2 h 10 min' },
  { id: 'p5', kind: 'embed', title: 'Embed call transcripts',
    detail: 'Vector index over claim calls for similarity search.',
    count: 312_600, unit: 'transcripts', delta: 4, domain: 'support', runtime: '~1 h 35 min' },
  { id: 'p6', kind: 'normalise', title: 'Normalise underwriting file names',
    detail: 'Consistent naming so the ontology can bind files to submissions.',
    count: 18_400, unit: 'files', delta: 6, domain: 'underwriting', runtime: '~40 min' },
]

export interface LiveRun {
  stepId: string
  label: string
  /** Starting percentage. The screen advances it on a timer. */
  progress: number
  processed: number
  total: number
}

export const LIVE_RUN: LiveRun = {
  stepId: 'p1',
  label: 'Identity resolution — policyholders',
  progress: 38,
  processed: 15_659,
  total: 41_208,
}

export interface PipelineRun {
  id: string
  title: string
  finished: string
  duration: string
  records: number
  delta: number
  outcome: 'succeeded' | 'failed'
}

export const RUNS: PipelineRun[] = [
  { id: 'r1', title: 'Chunk FNOL documents', finished: 'yesterday', duration: '1 h 04 m', records: 18_220, delta: 5, outcome: 'succeeded' },
  { id: 'r2', title: 'Mask compliance archive', finished: '2 days ago', duration: '12 m', records: 8_940, delta: 3, outcome: 'succeeded' },
  { id: 'r3', title: 'Type policy mart columns', finished: '4 days ago', duration: '31 m', records: 264, delta: 4, outcome: 'succeeded' },
  { id: 'r4', title: 'Embed broker mail threads', finished: '6 days ago', duration: '8 m', records: 0, delta: 0, outcome: 'failed' },
  { id: 'r5', title: 'Resolve claim participants', finished: 'last week', duration: '2 h 18 m', records: 96_400, delta: 8, outcome: 'succeeded' },
]
