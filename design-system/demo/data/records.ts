import type { DomainKey } from './types'

/**
 * A single record inside a dataset — what a *specialist* agent answers from,
 * once an operator has attached the dataset it lives in.
 *
 * Everything else in demo/data describes the estate: how many sources, how
 * ready they are, what entities the graph resolved. None of it says what is
 * actually *in* the data, which is exactly the line Stage 05 draws — the estate
 * agent answers "what do we hold about X", and only an attached dataset lets it
 * answer "what does X say". This file is the second half of that pair, and the
 * only place in the demo where record-level content exists.
 *
 * The ids are deliberately the ones the audit stream already quotes
 * (data/governance.ts — CL-77310, PL-88421, RT-2291 …), so a prospect who reads
 * a denied query on the Governance screen and then asks the specialist about
 * the same claim gets the same record, withheld for the same reason.
 */
export interface EstateRecord {
  /** Business key, as an operator would quote it. */
  id: string
  label: string
  /** Graph node this record is an instance of — must exist in data/graph.ts. */
  entityId: string
  domain: DomainKey
  /** Datasets this record lives in — must all exist in data/sources.ts. One of
   * them has to be attached before the specialist will read it. */
  sourceIds: string[]
  fields: { name: string; value: string }[]
  /** Extra terms this record answers to, beyond its id, label and field text. */
  tags: string[]
  /** What a governance policy holds back, and which policy did it. Set only
   * where data/governance.ts actually withholds something. */
  withheld?: string
}

export const SAMPLE_RECORDS: EstateRecord[] = [
  // ---- claims ----
  {
    id: 'CL-77310', label: 'Claim CL-77310', entityId: 'claim', domain: 'claims',
    sourceIds: ['guidewire-cc', 'snowflake-claims-mart'],
    fields: [
      { name: 'status', value: 'Open · in litigation' },
      { name: 'reserve_amount', value: '$148,200' },
      { name: 'loss_date', value: '11 Feb 2026' },
      { name: 'peril', value: 'Escape of water' },
    ],
    tags: ['open', 'litigation', 'reserve', 'water', 'escalated', 'legal'],
    withheld: 'loss_description is withheld — the litigation row policy hides this claim from every agent except legal-review.',
  },
  {
    id: 'CL-88533', label: 'Claim CL-88533', entityId: 'claim', domain: 'claims',
    sourceIds: ['guidewire-cc', 'snowflake-claims-mart', 'postgres-claims-intake'],
    fields: [
      { name: 'status', value: 'Settled' },
      { name: 'reserve_amount', value: '$32,400' },
      { name: 'payment', value: '$31,880 paid 02 Mar 2026' },
      { name: 'cycle_time', value: '14 days from FNOL to payment' },
    ],
    tags: ['settled', 'closed', 'payment', 'paid', 'cycle', 'reserve'],
  },
  {
    id: 'CL-90042', label: 'Claim CL-90042', entityId: 'claim', domain: 'claims',
    sourceIds: ['guidewire-cc', 'genesys-claim-calls', 's3-claim-photos'],
    fields: [
      { name: 'status', value: 'Open · referred to SIU' },
      { name: 'reserve_amount', value: '$96,750' },
      { name: 'claim_call', value: '3 calls · 22 min total · sentiment −0.41' },
      { name: 'photography', value: '18 images · 2 flagged as duplicates of CL-61175' },
    ],
    tags: ['fraud', 'siu', 'suspicious', 'duplicate', 'call', 'transcript', 'photo', 'image', 'sentiment'],
  },
  {
    id: 'CL-61175', label: 'Claim CL-61175', entityId: 'claim', domain: 'claims',
    sourceIds: ['guidewire-cc', 'jira-claims-ops'],
    fields: [
      { name: 'status', value: 'Open · awaiting adjuster' },
      { name: 'adjuster', value: 'A-2201 · caseload 41' },
      { name: 'days_open', value: '23' },
      { name: 'reserve_amount', value: '$54,100' },
    ],
    tags: ['adjuster', 'caseload', 'backlog', 'assignment', 'ageing', 'open'],
  },

  // ---- policies ----
  {
    id: 'PL-88421', label: 'Policy PL-88421', entityId: 'policy', domain: 'policies',
    sourceIds: ['guidewire-pc', 'snowflake-policy-mart'],
    fields: [
      { name: 'policyholder', value: 'Aline Bertrand' },
      { name: 'premium', value: '$14,800' },
      { name: 'renewal_term', value: 'expires 12 Sep 2026' },
      { name: 'coverage', value: '4 coverages · $2.5M aggregate limit' },
    ],
    tags: ['renewal', 'expiring', 'expiry', 'premium', 'coverage', 'limit', 'policyholder'],
  },
  {
    id: 'PL-118820', label: 'Policy PL-118820', entityId: 'policy', domain: 'policies',
    sourceIds: ['snowflake-policy-mart', 'salesforce-service-cloud'],
    fields: [
      { name: 'renewal_term', value: 'expires 30 Sep 2026' },
      { name: 'premium_delta', value: '+6.2% at last renewal' },
      { name: 'open_tickets', value: '2 · one escalated' },
      { name: 'churn_signal', value: 'High — price rise plus an open escalation' },
    ],
    tags: ['renewal', 'expiring', 'churn', 'retention', 'premium', 'increase', 'escalation'],
  },
  {
    id: 'PL-550210', label: 'Policy PL-550210', entityId: 'policy', domain: 'policies',
    sourceIds: ['guidewire-pc', 'duck-creek'],
    fields: [
      { name: 'endorsement', value: 'EN-4471 · flood exclusion removed' },
      { name: 'effective_date', value: '01 Apr 2026' },
      { name: 'premium', value: '$21,300 after endorsement' },
    ],
    tags: ['endorsement', 'amendment', 'exclusion', 'flood', 'change', 'premium'],
  },

  // ---- support ----
  {
    id: 'TK-990214', label: 'Ticket TK-990214', entityId: 'ticket', domain: 'support',
    sourceIds: ['salesforce-service-cloud', 'intercom-policyholder-chat'],
    fields: [
      { name: 'channel', value: 'Chat, escalated to email' },
      { name: 'priority', value: 'P1' },
      { name: 'age', value: '11 days open' },
      { name: 'subject', value: 'Claim payment not received after settlement' },
    ],
    tags: ['ticket', 'p1', 'escalation', 'open', 'chat', 'complaint', 'payment'],
  },
  {
    id: 'CM-04471', label: 'Complaint CM-04471', entityId: 'complaint', domain: 'support',
    sourceIds: ['salesforce-service-cloud', 'outlook-support-inbox'],
    fields: [
      { name: 'category', value: 'Claims handling delay' },
      { name: 'filed', value: '2016' },
    ],
    tags: ['complaint', 'regulator', 'delay', 'historic'],
    withheld: 'The body of this complaint is withheld — the retention row policy excludes records past retention from every agent.',
  },

  // ---- contracts ----
  {
    id: 'CT-30987', label: 'Contract CT-30987', entityId: 'contract', domain: 'contracts',
    sourceIds: ['icertis-contracts', 'oracle-contracts-db'],
    fields: [
      { name: 'counterparty', value: 'Nordwind Broking SA' },
      { name: 'term', value: 'ends 04 Oct 2026' },
      { name: 'renewal_clause', value: 'Auto-renews unless cancelled 60 days out' },
      { name: 'obligations', value: '7 extracted · 2 flagged ambiguous' },
    ],
    tags: ['contract', 'expiring', 'renewal', 'clause', 'obligation', 'notice', 'counterparty'],
  },

  // ---- broker network ----
  {
    id: 'BR-4410', label: 'Broker BR-4410', entityId: 'broker', domain: 'broker-network',
    sourceIds: ['salesforce-broker-portal', 'applied-epic'],
    fields: [
      { name: 'agency', value: 'Nordwind Broking SA' },
      { name: 'submissions', value: '38 this quarter · 9 stalled over 14 days' },
      { name: 'bound_ratio', value: '31%' },
    ],
    tags: ['broker', 'submission', 'stalled', 'agency', 'placement', 'quarter'],
  },
  {
    id: 'BR-2207', label: 'Broker BR-2207', entityId: 'broker', domain: 'broker-network',
    sourceIds: ['applied-epic', 'outlook-broker-correspondence'],
    fields: [
      { name: 'agency', value: 'Vela Insurance Partners' },
      { name: 'commission_amount', value: '$412,900 YTD' },
      { name: 'last_contact', value: 'Email, 9 days ago' },
    ],
    tags: ['broker', 'commission', 'statement', 'payout', 'correspondence', 'email'],
  },
  {
    id: 'SB-33012', label: 'Submission SB-33012', entityId: 'submission', domain: 'broker-network',
    sourceIds: ['applied-epic', 'outlook-broker-correspondence'],
    fields: [
      { name: 'broker', value: 'BR-4410 · Nordwind Broking SA' },
      { name: 'received_date', value: '19 Mar 2026' },
      { name: 'state', value: 'Stalled — 21 days without a quote' },
    ],
    tags: ['submission', 'stalled', 'quote', 'pipeline', 'chase', 'follow-up'],
  },

  // ---- underwriting ----
  {
    id: 'QT-77120', label: 'Quote QT-77120', entityId: 'quote', domain: 'underwriting',
    sourceIds: ['mysql-uw-quotes', 'verisk-risk-data'],
    fields: [
      { name: 'indicated_premium', value: '$27,450' },
      { name: 'hazard_score', value: '68 / 100 · flood and subsidence' },
      { name: 'inspection', value: 'Last inspection 2019 — imagery not re-typed' },
    ],
    tags: ['quote', 'premium', 'risk', 'hazard', 'telematics', 'inspection', 'pricing'],
  },

  // ---- reinsurance ----
  {
    id: 'RT-2291', label: 'Treaty RT-2291', entityId: 'treaty', domain: 'reinsurance',
    sourceIds: ['reinsurancecloud-treaties', 'snowflake-reinsurance-mart'],
    fields: [
      { name: 'layer', value: '$5M xs $2M' },
      { name: 'cession', value: '$1.84M ceded this period' },
      { name: 'retention_class', value: 'RC-08 · $2M retained' },
    ],
    tags: ['treaty', 'cession', 'ceded', 'layer', 'retention', 'reinsurer'],
  },
  {
    id: 'RT-1187', label: 'Treaty RT-1187', entityId: 'treaty', domain: 'reinsurance',
    sourceIds: ['reinsurancecloud-treaties', 'outlook-reinsurance-correspondence'],
    fields: [
      { name: 'layer', value: '$10M xs $5M' },
      { name: 'bordereau', value: 'Q1 2026 · filed 14 days late' },
      { name: 'reporting_period', value: 'Jan–Mar 2026' },
    ],
    tags: ['treaty', 'bordereau', 'reporting', 'late', 'period', 'reinsurer'],
  },

  // ---- compliance ----
  {
    id: 'AF-50231', label: 'Audit finding AF-50231', entityId: 'audit-finding', domain: 'compliance',
    sourceIds: ['archer-grc'],
    fields: [
      { name: 'severity', value: 'High' },
      { name: 'flags', value: 'Policy PL-88421 — evidence of coverage not retained' },
      { name: 'due', value: 'Remediation due 30 Jun 2026' },
    ],
    tags: ['audit', 'finding', 'severity', 'remediation', 'evidence', 'control'],
  },
  {
    id: 'RF-6620', label: 'Regulatory filing RF-6620', entityId: 'regulatory-filing', domain: 'compliance',
    sourceIds: ['oracle-financials-compliance', 'sharepoint-audit-docs'],
    fields: [
      { name: 'jurisdiction', value: 'Ireland · CBI' },
      { name: 'period', value: 'FY2025 statutory return' },
      { name: 'status', value: 'Draft — 3 figures unreconciled' },
    ],
    tags: ['filing', 'regulator', 'statutory', 'return', 'jurisdiction', 'deadline'],
  },
  {
    id: 'SC-771024', label: 'Sanctions check SC-771024', entityId: 'sanctions-check', domain: 'compliance',
    sourceIds: ['archer-grc', 'sharepoint-audit-docs'],
    fields: [
      { name: 'subject', value: 'Policyholder 884201' },
      { name: 'list_matched', value: 'No match · screened against 4 lists' },
      { name: 'screened', value: '27 min ago' },
    ],
    tags: ['sanctions', 'screening', 'aml', 'watchlist', 'check'],
  },
]
