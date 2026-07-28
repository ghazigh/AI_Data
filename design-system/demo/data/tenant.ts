import type { Domain, Estate } from './types'

export const TENANT = {
  name: 'Meridian Assurance',
  scope: 'Global',
  viewer: { name: 'Amara Diallo', role: 'Chief data officer' },
} as const

export const ESTATE: Estate = {
  score: 71,
  scoreDelta: 6,
  sourcesConnected: 34,
  sourcesPending: 4,
  entitiesResolved: '2.4M',
  relationshipsMapped: '1.9M',
  knowledgeBases: 8,
  agentCalls: '184K',
  agentCallsDenied: 3,
}

export const DOMAINS: Domain[] = [
  { key: 'policies', name: 'Policies', score: 84 },
  { key: 'claims', name: 'Claims', score: 78 },
  { key: 'support', name: 'Support', score: 76 },
  { key: 'reinsurance', name: 'Reinsurance', score: 73 },
  { key: 'contracts', name: 'Contracts', score: 68 },
  { key: 'compliance', name: 'Compliance', score: 64 },
  { key: 'broker-network', name: 'Broker network', score: 61 },
  { key: 'underwriting', name: 'Underwriting', score: 55 },
]

export const domainByKey = (key: string): Domain | undefined =>
  DOMAINS.find(d => d.key === key)
