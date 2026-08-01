import type { Domain, Estate } from './types'

export const TENANT = {
  name: 'Meridian Assurance',
  scope: 'Global',
  viewer: { name: 'Amara Diallo', role: 'Chief data officer' },
} as const

export const ESTATE: Estate = {
  score: 71,
  scoreDelta: 6,
  scoreTarget: 80,
  sourcesConnected: 34,
  sourcesPending: 4,
  entitiesResolved: '2.4M',
  relationshipsMapped: '1.9M',
  knowledgeBases: 8,
  agentCalls: '184K',
  agentCallsDenied: 3,
}

export const DOMAINS: Domain[] = [
  { key: 'policies', name: 'Policies', score: 84, delta: 4 },
  { key: 'claims', name: 'Claims', score: 78, delta: 6 },
  { key: 'support', name: 'Support', score: 76, delta: 2 },
  { key: 'reinsurance', name: 'Reinsurance', score: 73, delta: 5 },
  { key: 'contracts', name: 'Contracts', score: 68, delta: -1 },
  { key: 'compliance', name: 'Compliance', score: 64, delta: 3 },
  { key: 'broker-network', name: 'Broker network', score: 61, delta: -2 },
  { key: 'underwriting', name: 'Underwriting', score: 55, delta: 1 },
]

export const domainByKey = (key: string): Domain | undefined =>
  DOMAINS.find(d => d.key === key)

/**
 * Nine-point series behind the estate KPIs, oldest first — one point per month.
 * Fixed sample data, never computed from a clock, so the server's markup and the
 * browser's first render draw the same sparkline. The last point of each series
 * agrees with the headline figure it sits beside.
 */
export const ESTATE_SERIES = {
  sources: [21, 23, 24, 26, 27, 29, 31, 33, 34],
  entities: [1.2, 1.4, 1.5, 1.7, 1.9, 2.0, 2.2, 2.3, 2.4],
  agentCalls: [42, 61, 74, 96, 108, 127, 149, 166, 184],
  readiness: [52, 55, 57, 59, 62, 65, 67, 69, 71],
} as const
