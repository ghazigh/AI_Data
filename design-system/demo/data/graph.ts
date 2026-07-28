import type { DomainKey } from './types'

export interface GraphNode {
  id: string
  label: string
  /** Entity type — drives the node shape. */
  kind: 'entity' | 'document' | 'event'
  domain: DomainKey
  x: number
  y: number
  /** Instances of this entity in the graph. */
  count: string
  sourceIds: string[]
  freshness: string
  properties: { name: string; type: string; source: string }[]
}

export interface GraphEdge {
  id: string
  from: string
  to: string
  label: string
}

export interface KnowledgeBase {
  domain: DomainKey
  name: string
  entities: string
  score: number
  servedTo: number
}

export interface IdentityMatch {
  entity: string
  records: { sourceId: string; system: string; key: string; label: string }[]
  evidence: string[]
  confidence: number
}

// Positions are hand-placed literals on a 1000×640 field — eight domain
// clusters arranged around the Policyholder hub, spaced so no two clusters'
// bounding boxes touch. Nothing here is computed at runtime: SSR and the
// client must produce byte-identical markup, which rules out a layout solver.
export const GRAPH_NODES: GraphNode[] = [
  // ---- policies — hub cluster, upper-left-of-centre (x:240–500, y:130–300) ----
  { id: 'policyholder', label: 'Policyholder', kind: 'entity', domain: 'policies', x: 500, y: 300,
    count: '412K', sourceIds: ['guidewire-pc', 'salesforce-service-cloud', 'snowflake-policy-mart'],
    freshness: 'synced 18 min ago',
    properties: [
      { name: 'policyholder_id', type: 'identifier', source: 'Guidewire PolicyCenter' },
      { name: 'full_name', type: 'person name · masked', source: 'Salesforce Service Cloud' },
      { name: 'inception_date', type: 'date', source: 'Snowflake Policy Mart' },
    ] },
  { id: 'policy', label: 'Policy', kind: 'entity', domain: 'policies', x: 330, y: 210,
    count: '640K', sourceIds: ['guidewire-pc', 'duck-creek'], freshness: 'synced 18 min ago',
    properties: [
      { name: 'policy_number', type: 'identifier', source: 'Guidewire PolicyCenter' },
      { name: 'premium', type: 'currency', source: 'Duck Creek Policy' },
    ] },
  { id: 'coverage', label: 'Coverage', kind: 'entity', domain: 'policies', x: 260, y: 280,
    count: '1.8M', sourceIds: ['guidewire-pc', 'duck-creek'], freshness: 'synced 18 min ago',
    properties: [
      { name: 'coverage_code', type: 'identifier', source: 'Guidewire PolicyCenter' },
      { name: 'limit', type: 'currency', source: 'Duck Creek Policy' },
    ] },
  { id: 'endorsement', label: 'Endorsement', kind: 'document', domain: 'policies', x: 240, y: 150,
    count: '188K', sourceIds: ['duck-creek', 'sqlserver-legacy-policy'], freshness: 'synced 31 min ago',
    properties: [
      { name: 'endorsement_id', type: 'identifier', source: 'Duck Creek Policy' },
      { name: 'effective_date', type: 'date', source: 'SQL Server Legacy Policy Admin' },
    ] },
  { id: 'renewal', label: 'Renewal', kind: 'event', domain: 'policies', x: 370, y: 130,
    count: '210K', sourceIds: ['snowflake-policy-mart'], freshness: 'synced 11 min ago',
    properties: [
      { name: 'renewal_term', type: 'date range', source: 'Snowflake Policy Mart' },
      { name: 'premium_delta', type: 'currency', source: 'Snowflake Policy Mart' },
    ] },

  // ---- claims — upper-right cluster (x:650–820, y:150–300) ----
  { id: 'claim', label: 'Claim', kind: 'entity', domain: 'claims', x: 690, y: 210,
    count: '1.1M', sourceIds: ['guidewire-cc', 'snowflake-claims-mart'], freshness: 'synced 14 min ago',
    properties: [
      { name: 'claim_number', type: 'identifier', source: 'Guidewire ClaimCenter' },
      { name: 'reserve_amount', type: 'currency', source: 'Snowflake Claims Mart' },
      { name: 'loss_date', type: 'date', source: 'Guidewire ClaimCenter' },
    ] },
  { id: 'claim-call', label: 'Claim call', kind: 'event', domain: 'claims', x: 760, y: 150,
    count: '312K', sourceIds: ['genesys-claim-calls'], freshness: 'synced 1 h ago',
    properties: [
      { name: 'call_id', type: 'identifier', source: 'Genesys Claim Calls' },
      { name: 'transcript', type: 'text', source: 'Genesys Claim Calls' },
    ] },
  { id: 'fnol', label: 'FNOL document', kind: 'document', domain: 'claims', x: 820, y: 230,
    count: '1.0M', sourceIds: ['azure-fnol', 'guidewire-cc'], freshness: 'synced 4 min ago',
    properties: [
      { name: 'fnol_id', type: 'identifier', source: 'Azure FNOL Intake' },
      { name: 'loss_description', type: 'text', source: 'Guidewire ClaimCenter' },
    ] },
  { id: 'adjuster', label: 'Adjuster', kind: 'entity', domain: 'claims', x: 760, y: 290,
    count: '2,140', sourceIds: ['guidewire-cc', 'jira-claims-ops'], freshness: 'synced 14 min ago',
    properties: [
      { name: 'adjuster_id', type: 'identifier', source: 'Guidewire ClaimCenter' },
      { name: 'caseload', type: 'count', source: 'Jira Claims Ops' },
    ] },
  { id: 'payment', label: 'Payment', kind: 'event', domain: 'claims', x: 650, y: 300,
    count: '980K', sourceIds: ['postgres-claims-intake', 'snowflake-claims-mart'], freshness: 'synced 9 min ago',
    properties: [
      { name: 'payment_id', type: 'identifier', source: 'Postgres Claims Intake' },
      { name: 'amount', type: 'currency', source: 'Snowflake Claims Mart' },
    ] },

  // ---- underwriting — top-centre cluster (x:440–600, y:50–140) ----
  { id: 'quote', label: 'Quote', kind: 'entity', domain: 'underwriting', x: 520, y: 50,
    count: '890K', sourceIds: ['mysql-uw-quotes'], freshness: 'synced 19 min ago',
    properties: [
      { name: 'quote_id', type: 'identifier', source: 'MySQL Underwriting Quotes' },
      { name: 'indicated_premium', type: 'currency', source: 'MySQL Underwriting Quotes' },
    ] },
  { id: 'peril', label: 'Peril', kind: 'entity', domain: 'underwriting', x: 600, y: 100,
    count: '64', sourceIds: ['verisk-risk-data'], freshness: 'synced 2 min ago',
    properties: [
      { name: 'peril_code', type: 'identifier', source: 'Verisk Risk & Telematics Feed' },
      { name: 'hazard_score', type: 'score', source: 'Verisk Risk & Telematics Feed' },
    ] },
  { id: 'risk-inspection', label: 'Risk inspection', kind: 'event', domain: 'underwriting', x: 440, y: 110,
    count: '146K', sourceIds: ['s3-inspection-images', 'verisk-risk-data'], freshness: 'synced 1 h ago',
    properties: [
      { name: 'inspection_id', type: 'identifier', source: 'S3 Property Inspection Images' },
      { name: 'condition_rating', type: 'score', source: 'Verisk Risk & Telematics Feed' },
    ] },
  { id: 'underwriting-guideline', label: 'Underwriting guideline', kind: 'document', domain: 'underwriting', x: 520, y: 140,
    count: '412', sourceIds: ['sharepoint-uw-guidelines'], freshness: 'synced 4 h ago',
    properties: [
      { name: 'guideline_id', type: 'identifier', source: 'SharePoint Underwriting Guidelines' },
      { name: 'line_of_business', type: 'category', source: 'SharePoint Underwriting Guidelines' },
    ] },

  // ---- broker-network — left cluster (x:100–180, y:320–420) ----
  { id: 'broker', label: 'Broker', kind: 'entity', domain: 'broker-network', x: 120, y: 320,
    count: '3,860', sourceIds: ['salesforce-broker-portal', 'applied-epic'], freshness: 'synced 16 min ago',
    properties: [
      { name: 'broker_id', type: 'identifier', source: 'Salesforce Broker Portal' },
      { name: 'agency', type: 'text', source: 'Applied Epic' },
    ] },
  { id: 'submission', label: 'Submission', kind: 'event', domain: 'broker-network', x: 180, y: 400,
    count: '224K', sourceIds: ['applied-epic', 'outlook-broker-correspondence'], freshness: 'synced 41 min ago',
    properties: [
      { name: 'submission_id', type: 'identifier', source: 'Applied Epic' },
      { name: 'received_date', type: 'date', source: 'Outlook Broker Correspondence' },
    ] },
  { id: 'commission-statement', label: 'Commission statement', kind: 'document', domain: 'broker-network', x: 100, y: 420,
    count: '46K', sourceIds: ['applied-epic'], freshness: 'synced 2 h ago',
    properties: [
      { name: 'statement_id', type: 'identifier', source: 'Applied Epic' },
      { name: 'commission_amount', type: 'currency', source: 'Applied Epic' },
    ] },

  // ---- contracts — left-upper cluster (x:80–180, y:90–220) ----
  { id: 'contract', label: 'Contract', kind: 'entity', domain: 'contracts', x: 120, y: 150,
    count: '244K', sourceIds: ['icertis-contracts', 'oracle-contracts-db'], freshness: 'synced 52 min ago',
    properties: [
      { name: 'contract_id', type: 'identifier', source: 'Icertis CLM' },
      { name: 'counterparty', type: 'text', source: 'Oracle Contracts DB' },
    ] },
  { id: 'broker-agreement', label: 'Broker agreement', kind: 'document', domain: 'contracts', x: 80, y: 220,
    count: '3,920', sourceIds: ['sharepoint-broker-agreements'], freshness: 'synced 3 h ago',
    properties: [
      { name: 'agreement_id', type: 'identifier', source: 'SharePoint Broker Agreements' },
      { name: 'term', type: 'date range', source: 'SharePoint Broker Agreements' },
    ] },
  { id: 'amendment', label: 'Amendment', kind: 'document', domain: 'contracts', x: 180, y: 90,
    count: '18,400', sourceIds: ['icertis-contracts'], freshness: 'synced 52 min ago',
    properties: [
      { name: 'amendment_id', type: 'identifier', source: 'Icertis CLM' },
      { name: 'clause_changed', type: 'text', source: 'Icertis CLM' },
    ] },

  // ---- reinsurance — right cluster (x:850–970, y:330–460) ----
  { id: 'treaty', label: 'Treaty', kind: 'entity', domain: 'reinsurance', x: 900, y: 380,
    count: '1,240', sourceIds: ['reinsurancecloud-treaties', 'snowflake-reinsurance-mart'], freshness: 'synced 12 min ago',
    properties: [
      { name: 'treaty_id', type: 'identifier', source: 'ReinsuranceCloud Treaty Register' },
      { name: 'layer', type: 'text', source: 'Snowflake Reinsurance Mart' },
    ] },
  { id: 'cession', label: 'Cession', kind: 'event', domain: 'reinsurance', x: 970, y: 330,
    count: '68K', sourceIds: ['snowflake-reinsurance-mart'], freshness: 'synced 12 min ago',
    properties: [
      { name: 'cession_id', type: 'identifier', source: 'Snowflake Reinsurance Mart' },
      { name: 'ceded_amount', type: 'currency', source: 'Snowflake Reinsurance Mart' },
    ] },
  { id: 'retention-class', label: 'Retention class', kind: 'entity', domain: 'reinsurance', x: 940, y: 460,
    count: '32', sourceIds: ['snowflake-reinsurance-mart'], freshness: 'synced 12 min ago',
    properties: [
      { name: 'class_code', type: 'identifier', source: 'Snowflake Reinsurance Mart' },
      { name: 'retention_limit', type: 'currency', source: 'Snowflake Reinsurance Mart' },
    ] },
  { id: 'bordereau', label: 'Bordereau', kind: 'document', domain: 'reinsurance', x: 850, y: 460,
    count: '9,400', sourceIds: ['reinsurancecloud-treaties', 'outlook-reinsurance-correspondence'], freshness: 'synced 3 h ago',
    properties: [
      { name: 'bordereau_id', type: 'identifier', source: 'ReinsuranceCloud Treaty Register' },
      { name: 'reporting_period', type: 'date range', source: 'Outlook Reinsurance Correspondence' },
    ] },

  // ---- compliance — bottom-left cluster (x:200–360, y:500–560) ----
  { id: 'audit-finding', label: 'Audit finding', kind: 'event', domain: 'compliance', x: 280, y: 500,
    count: '5,280', sourceIds: ['archer-grc'], freshness: 'synced 27 min ago',
    properties: [
      { name: 'finding_id', type: 'identifier', source: 'RSA Archer GRC' },
      { name: 'severity', type: 'category', source: 'RSA Archer GRC' },
    ] },
  { id: 'regulatory-filing', label: 'Regulatory filing', kind: 'document', domain: 'compliance', x: 200, y: 560,
    count: '1,860', sourceIds: ['oracle-financials-compliance'], freshness: 'synced 5 h ago',
    properties: [
      { name: 'filing_id', type: 'identifier', source: 'Oracle Financials Compliance Ledger' },
      { name: 'jurisdiction', type: 'category', source: 'Oracle Financials Compliance Ledger' },
    ] },
  { id: 'sanctions-check', label: 'Sanctions check', kind: 'event', domain: 'compliance', x: 360, y: 560,
    count: '412K', sourceIds: ['archer-grc', 'sharepoint-audit-docs'], freshness: 'synced 27 min ago',
    properties: [
      { name: 'check_id', type: 'identifier', source: 'RSA Archer GRC' },
      { name: 'list_matched', type: 'text', source: 'SharePoint Audit Documentation' },
    ] },

  // ---- support — bottom-centre cluster (x:500–640, y:520–580) ----
  { id: 'ticket', label: 'Ticket', kind: 'entity', domain: 'support', x: 560, y: 520,
    count: '1.4M', sourceIds: ['salesforce-service-cloud', 'intercom-policyholder-chat'], freshness: 'synced 7 min ago',
    properties: [
      { name: 'ticket_id', type: 'identifier', source: 'Salesforce Service Cloud' },
      { name: 'channel', type: 'category', source: 'Intercom Policyholder Chat' },
    ] },
  { id: 'complaint', label: 'Complaint', kind: 'entity', domain: 'support', x: 640, y: 580,
    count: '28,400', sourceIds: ['salesforce-service-cloud', 'outlook-support-inbox'], freshness: 'synced 7 min ago',
    properties: [
      { name: 'complaint_id', type: 'identifier', source: 'Salesforce Service Cloud' },
      { name: 'category', type: 'category', source: 'Outlook Support Inbox' },
    ] },
  { id: 'contact-interaction', label: 'Contact interaction', kind: 'event', domain: 'support', x: 500, y: 580,
    count: '2.1M', sourceIds: ['intercom-policyholder-chat', 'genesys-claim-calls'], freshness: 'synced 48 min ago',
    properties: [
      { name: 'interaction_id', type: 'identifier', source: 'Intercom Policyholder Chat' },
      { name: 'sentiment', type: 'score', source: 'Genesys Claim Calls' },
    ] },
]

export const GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', from: 'policyholder', to: 'policy', label: 'holds' },
  { id: 'e2', from: 'policy', to: 'claim', label: 'claimed against' },
  { id: 'e3', from: 'policy', to: 'endorsement', label: 'amended by' },
  { id: 'e4', from: 'policy', to: 'coverage', label: 'includes' },
  { id: 'e5', from: 'policy', to: 'renewal', label: 'renews as' },
  { id: 'e6', from: 'claim', to: 'claim-call', label: 'documented by' },
  { id: 'e7', from: 'claim', to: 'fnol', label: 'opened via' },
  { id: 'e8', from: 'claim', to: 'adjuster', label: 'assigned to' },
  { id: 'e9', from: 'claim', to: 'payment', label: 'settled by' },
  { id: 'e10', from: 'policyholder', to: 'ticket', label: 'raised' },
  { id: 'e11', from: 'policyholder', to: 'complaint', label: 'filed' },
  { id: 'e12', from: 'ticket', to: 'contact-interaction', label: 'logged as' },
  { id: 'e13', from: 'policy', to: 'treaty', label: 'ceded under' },
  { id: 'e14', from: 'treaty', to: 'cession', label: 'generates' },
  { id: 'e15', from: 'treaty', to: 'retention-class', label: 'defines' },
  { id: 'e16', from: 'treaty', to: 'bordereau', label: 'reported via' },
  { id: 'e17', from: 'policy', to: 'contract', label: 'governed by' },
  { id: 'e18', from: 'contract', to: 'broker-agreement', label: 'extends' },
  { id: 'e19', from: 'contract', to: 'amendment', label: 'modified by' },
  { id: 'e20', from: 'audit-finding', to: 'policy', label: 'flags' },
  { id: 'e21', from: 'audit-finding', to: 'claim', label: 'flags' },
  { id: 'e22', from: 'regulatory-filing', to: 'contract', label: 'cites' },
  { id: 'e23', from: 'sanctions-check', to: 'policyholder', label: 'screens' },
  { id: 'e24', from: 'broker', to: 'submission', label: 'creates' },
  { id: 'e25', from: 'submission', to: 'quote', label: 'produces' },
  { id: 'e26', from: 'broker', to: 'policy', label: 'placed' },
  { id: 'e27', from: 'broker', to: 'commission-statement', label: 'earns' },
  { id: 'e28', from: 'quote', to: 'peril', label: 'rates' },
  { id: 'e29', from: 'quote', to: 'risk-inspection', label: 'informed by' },
  { id: 'e30', from: 'risk-inspection', to: 'underwriting-guideline', label: 'applies' },
  { id: 'e31', from: 'quote', to: 'policy', label: 'bound as' },
  { id: 'e32', from: 'peril', to: 'claim', label: 'materialises as' },
  { id: 'e33', from: 'adjuster', to: 'ticket', label: 'updates' },
  { id: 'e34', from: 'complaint', to: 'contact-interaction', label: 'escalates as' },
]

export const KNOWLEDGE_BASES: KnowledgeBase[] = [
  { domain: 'policies', name: 'Policies', entities: '1.0M', score: 84, servedTo: 4 },
  { domain: 'claims', name: 'Claims', entities: '1.4M', score: 78, servedTo: 6 },
  { domain: 'support', name: 'Support', entities: '2.0M', score: 76, servedTo: 5 },
  { domain: 'reinsurance', name: 'Reinsurance', entities: '340K', score: 73, servedTo: 3 },
  { domain: 'contracts', name: 'Contracts', entities: '410K', score: 68, servedTo: 3 },
  { domain: 'compliance', name: 'Compliance', entities: '520K', score: 64, servedTo: 2 },
  { domain: 'broker-network', name: 'Broker network', entities: '640K', score: 61, servedTo: 3 },
  { domain: 'underwriting', name: 'Underwriting', entities: '890K', score: 55, servedTo: 2 },
]

export const IDENTITY_MATCH: IdentityMatch = {
  entity: 'Policyholder · Aline Bertrand',
  records: [
    { sourceId: 'salesforce-service-cloud', system: 'Salesforce Service Cloud', key: 'Contact 003Gx000004TzXpIAK', label: 'A. Bertrand' },
    { sourceId: 'snowflake-policy-mart', system: 'Snowflake Policy Mart', key: 'dim_customer #884201', label: 'BERTRAND, ALINE' },
    { sourceId: 'guidewire-pc', system: 'Guidewire PolicyCenter', key: 'pc:contact:41982', label: 'Aline Bertrand' },
  ],
  evidence: [
    'National ID hash matches across all three systems',
    'Address normalises to the same postal record',
    'Policy number appears in both Guidewire and the policy mart',
    'Email on file matches the Salesforce contact and the Guidewire policyholder record',
  ],
  confidence: 98,
}

export const nodesForDomain = (domain: DomainKey): GraphNode[] =>
  GRAPH_NODES.filter(n => n.domain === domain)
