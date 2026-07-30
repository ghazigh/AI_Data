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
