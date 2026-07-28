import type { Dimension } from '../components/charts/DimensionRadar'
import type { TrendPoint } from '../components/charts/TrendLine'
import type { DomainKey } from './types'

export const DIMENSIONS: Dimension[] = [
  { label: 'Completeness', value: 82 },
  { label: 'Freshness', value: 64 },
  { label: 'Consistency', value: 74 },
  { label: 'Semantic coverage', value: 58 },
  { label: 'Governance coverage', value: 79 },
]

export const TREND: TrendPoint[] = [
  { label: 'Q3 25', value: 52 },
  { label: 'Q4 25', value: 59 },
  { label: 'Q1 26', value: 65 },
  { label: 'Q2 26', value: 71 },
]

export type FlagSeverity = 'high' | 'medium' | 'low'

export interface RedFlag {
  id: string
  severity: FlagSeverity
  title: string
  detail: string
  sourceId: string
  domain: DomainKey
  /** Records or columns affected — the number that justifies the fix. */
  count: number
  unit: string
}

export const RED_FLAGS: RedFlag[] = [
  { id: 'f1', severity: 'high', title: 'Unmasked PII in customer contacts',
    detail: 'Email, phone and national ID stored in clear text.',
    sourceId: 'salesforce-broker-portal', domain: 'broker-network', count: 12, unit: 'columns' },
  { id: 'f2', severity: 'high', title: 'Duplicate policyholder records',
    detail: 'The same person appears under several broker submissions.',
    sourceId: 'guidewire-pc', domain: 'policies', count: 41_208, unit: 'records' },
  { id: 'f3', severity: 'medium', title: 'Untyped columns block semantic search',
    detail: 'No semantic type, so agents cannot tell a premium from a payout.',
    sourceId: 'snowflake-claims-mart', domain: 'claims', count: 380, unit: 'columns' },
  { id: 'f4', severity: 'medium', title: 'Underwriting files not refreshed',
    detail: 'Last sync 21 days ago — freshness is dragging the domain score down.',
    sourceId: 'sharepoint-uw-guidelines', domain: 'underwriting', count: 21, unit: 'days stale' },
  { id: 'f5', severity: 'medium', title: 'Treaty documents unchunked',
    detail: 'Long PDFs cannot be retrieved at clause level until they are chunked.',
    sourceId: 'docusign-treaty-docs', domain: 'reinsurance', count: 22_470, unit: 'documents' },
  { id: 'f6', severity: 'low', title: 'Compliance archive lacks retention labels',
    detail: 'Policy cannot be enforced on records with no retention class.',
    sourceId: 'archer-grc', domain: 'compliance', count: 8_940, unit: 'records' },
]

export const flagCount = (unit: string): number =>
  RED_FLAGS.filter(f => f.unit === unit).reduce((sum, f) => sum + f.count, 0)
