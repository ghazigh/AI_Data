import type { GraphNode } from '../../demo/data/graph'

/**
 * The estate a bank brings to the graph, as the 3D scene draws it: five
 * knowledge bases orbiting the institution at the hub.
 *
 * The demo's tenant is an insurer, so its graph is the wrong estate to show a
 * bank. The scene itself is domain-agnostic — it groups nodes by `domain` and
 * asks the caller for a label and a density per group — so this file supplies a
 * banking estate and the site island passes it in. Positions are not used by the
 * 3D layout (it derives them from the node id), but GraphNode carries them for
 * the demo's 2D view, so they stay plausible rather than zeroed.
 */
export type BankDomain = 'payments' | 'customers' | 'lending' | 'complaints' | 'markets'

export interface BankNode extends Omit<GraphNode, 'domain'> { domain: BankDomain }

export const BANK_DOMAIN_NAMES: Record<BankDomain, string> = {
  payments: 'Payments',
  customers: 'Customers & KYC',
  lending: 'Lending & credit',
  complaints: 'Complaints & contact',
  markets: 'Markets & treasury',
}

/** Entities held per knowledge base — the ambient cloud is scaled from these. */
export const BANK_DOMAIN_ENTITIES: Record<BankDomain, string> = {
  payments: '4.2M',
  customers: '310K',
  lending: '140K',
  complaints: '96K',
  markets: '220K',
}

const p = (name: string, type: string, source: string) => ({ name, type, source })

export const BANK_NODES: BankNode[] = [
  // ---- payments ----
  { id: 'account', label: 'Account', kind: 'entity', domain: 'payments', x: 500, y: 300,
    count: '3.1M', sourceIds: ['core-banking', 'payments-hub'], freshness: 'synced 9 min ago',
    properties: [p('account_id', 'identifier', 'core banking'), p('balance', 'currency', 'core banking')] },
  { id: 'payment', label: 'Payment', kind: 'event', domain: 'payments', x: 380, y: 250,
    count: '12M', sourceIds: ['payments-hub'], freshness: 'streaming',
    properties: [p('value_date', 'date', 'payments hub'), p('amount', 'currency', 'payments hub')] },
  { id: 'ledger-entry', label: 'Ledger entry', kind: 'event', domain: 'payments', x: 330, y: 330,
    count: '96M', sourceIds: ['general-ledger'], freshness: 'synced 4 min ago',
    properties: [p('posting_date', 'date', 'general ledger'), p('cost_centre', 'category', 'general ledger')] },
  { id: 'mandate', label: 'Mandate', kind: 'entity', domain: 'payments', x: 430, y: 380,
    count: '240K', sourceIds: ['core-banking'], freshness: 'synced 9 min ago',
    properties: [p('mandate_ref', 'identifier', 'core banking'), p('status', 'category', 'core banking')] },
  { id: 'statement', label: 'Statement', kind: 'document', domain: 'payments', x: 300, y: 200,
    count: '46M', sourceIds: ['document-store'], freshness: 'synced 1 h ago',
    properties: [p('period', 'date range', 'document store'), p('account_ref', 'identifier', 'document store')] },

  // ---- customers & kyc ----
  { id: 'customer', label: 'Customer', kind: 'entity', domain: 'customers', x: 640, y: 240,
    count: '1.2M', sourceIds: ['core-banking', 'crm', 'onboarding'], freshness: 'synced 12 min ago',
    properties: [p('customer_id', 'identifier', 'core banking'), p('legal_name', 'person name · masked', 'crm')] },
  { id: 'owner', label: 'Beneficial owner', kind: 'entity', domain: 'customers', x: 720, y: 300,
    count: '180K', sourceIds: ['onboarding', 'registry-extracts'], freshness: 'synced 1 d ago',
    properties: [p('ownership_pct', 'percentage', 'registry extracts'), p('verified_on', 'date', 'onboarding')] },
  { id: 'kyc-file', label: 'KYC file', kind: 'document', domain: 'customers', x: 700, y: 180,
    count: '940K', sourceIds: ['document-store', 'onboarding'], freshness: 'synced 3 h ago',
    properties: [p('expires_on', 'date', 'onboarding'), p('risk_rating', 'category', 'onboarding')] },
  { id: 'screening', label: 'Screening result', kind: 'event', domain: 'customers', x: 780, y: 240,
    count: '2.4M', sourceIds: ['monitoring'], freshness: 'streaming',
    properties: [p('screened_at', 'timestamp', 'monitoring'), p('outcome', 'category', 'monitoring')] },
  { id: 'consent', label: 'Consent record', kind: 'document', domain: 'customers', x: 660, y: 360,
    count: '1.1M', sourceIds: ['crm', 'document-store'], freshness: 'synced 3 h ago',
    properties: [p('scope', 'category', 'crm'), p('captured_on', 'date', 'crm')] },

  // ---- lending & credit ----
  { id: 'loan', label: 'Loan', kind: 'entity', domain: 'lending', x: 200, y: 430,
    count: '420K', sourceIds: ['lending-platform'], freshness: 'synced 22 min ago',
    properties: [p('principal', 'currency', 'lending platform'), p('rate', 'percentage', 'lending platform')] },
  { id: 'application', label: 'Application', kind: 'entity', domain: 'lending', x: 130, y: 380,
    count: '190K', sourceIds: ['lending-platform', 'crm'], freshness: 'synced 22 min ago',
    properties: [p('submitted_on', 'date', 'lending platform'), p('stage', 'category', 'lending platform')] },
  { id: 'covenant', label: 'Covenant', kind: 'document', domain: 'lending', x: 250, y: 500,
    count: '84K', sourceIds: ['document-store'], freshness: 'unparsed · 46 score',
    properties: [p('test_frequency', 'category', 'document store'), p('threshold', 'currency', 'document store')] },
  { id: 'collateral', label: 'Collateral', kind: 'entity', domain: 'lending', x: 150, y: 520,
    count: '310K', sourceIds: ['lending-platform', 'document-store'], freshness: 'synced 1 d ago',
    properties: [p('valuation', 'currency', 'lending platform'), p('valued_on', 'date', 'lending platform')] },
  { id: 'decision', label: 'Credit decision', kind: 'event', domain: 'lending', x: 90, y: 460,
    count: '220K', sourceIds: ['lending-platform'], freshness: 'synced 22 min ago',
    properties: [p('decided_on', 'date', 'lending platform'), p('outcome', 'category', 'lending platform')] },

  // ---- complaints & contact ----
  { id: 'complaint', label: 'Complaint', kind: 'event', domain: 'complaints', x: 830, y: 470,
    count: '96K', sourceIds: ['case-system'], freshness: 'synced 40 min ago',
    properties: [p('raised_on', 'date', 'case system'), p('category', 'category', 'case system')] },
  { id: 'call', label: 'Call transcript', kind: 'document', domain: 'complaints', x: 900, y: 400,
    count: '1.8M', sourceIds: ['contact-centre'], freshness: 'unlabelled · 47 score',
    properties: [p('duration', 'duration', 'contact centre'), p('agent_id', 'identifier', 'contact centre')] },
  { id: 'letter', label: 'Correspondence', kind: 'document', domain: 'complaints', x: 940, y: 500,
    count: '640K', sourceIds: ['document-store'], freshness: 'synced 3 h ago',
    properties: [p('sent_on', 'date', 'document store'), p('channel', 'category', 'document store')] },
  { id: 'case', label: 'Case', kind: 'entity', domain: 'complaints', x: 860, y: 550,
    count: '120K', sourceIds: ['case-system'], freshness: 'synced 40 min ago',
    properties: [p('opened_on', 'date', 'case system'), p('owner', 'person name · masked', 'case system')] },

  // ---- markets & treasury ----
  { id: 'position', label: 'Position', kind: 'entity', domain: 'markets', x: 470, y: 90,
    count: '78K', sourceIds: ['positions-store'], freshness: 'end of day',
    properties: [p('notional', 'currency', 'positions store'), p('book', 'category', 'positions store')] },
  { id: 'counterparty', label: 'Counterparty', kind: 'entity', domain: 'markets', x: 560, y: 60,
    count: '12K', sourceIds: ['reference-data'], freshness: 'synced 1 d ago',
    properties: [p('lei', 'identifier', 'reference data'), p('rating', 'category', 'reference data')] },
  { id: 'limit', label: 'Limit', kind: 'entity', domain: 'markets', x: 400, y: 40,
    count: '6.4K', sourceIds: ['risk-engine'], freshness: 'end of day',
    properties: [p('threshold', 'currency', 'risk engine'), p('utilisation', 'percentage', 'risk engine')] },
  { id: 'margin-call', label: 'Collateral call', kind: 'event', domain: 'markets', x: 620, y: 130,
    count: '34K', sourceIds: ['risk-engine'], freshness: 'end of day',
    properties: [p('called_on', 'date', 'risk engine'), p('amount', 'currency', 'risk engine')] },
  { id: 'trade', label: 'Trade', kind: 'event', domain: 'markets', x: 520, y: 160,
    count: '2.6M', sourceIds: ['positions-store'], freshness: 'streaming',
    properties: [p('traded_at', 'timestamp', 'positions store'), p('venue', 'category', 'positions store')] },
]

export const BANK_GRAPH_SUMMARY =
  `Live knowledge graph: ${BANK_NODES.length} banking entities across ` +
  `${Object.keys(BANK_DOMAIN_NAMES).length} knowledge bases, orbiting the institution at the hub.`
