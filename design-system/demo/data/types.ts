export type Modality = 'tables' | 'documents' | 'tickets' | 'email' | 'transcripts' | 'images' | 'streams'
export type SourceCategory = 'warehouse' | 'oltp' | 'saas' | 'object-store' | 'stream'
export type SourceStatus = 'connected' | 'scanning' | 'pending-credentials'

export type DomainKey =
  | 'claims' | 'policies' | 'support' | 'contracts'
  | 'broker-network' | 'underwriting' | 'reinsurance' | 'compliance'

export interface Domain {
  key: DomainKey
  name: string
  /** Agent-Readiness Score 0–100. */
  score: number
}

export interface Source {
  id: string
  name: string
  vendor: string
  category: SourceCategory
  modalities: Modality[]
  /** Record count as a number so tables can sort; formatted at render time. */
  records: number
  /** Fixed display string — never computed from a clock. */
  lastSync: string
  /** Per-source Agent-Readiness Score 0–100. */
  readiness: number
  /** The domain this source is weighted into. Exactly one. */
  primaryDomain: DomainKey
  /** Every domain this source feeds, including the primary. */
  domains: DomainKey[]
  status: SourceStatus
}

export interface Estate {
  score: number
  scoreDelta: number
  sourcesConnected: number
  sourcesPending: number
  entitiesResolved: string
  relationshipsMapped: string
  knowledgeBases: number
  agentCalls: string
  agentCallsDenied: number
}
