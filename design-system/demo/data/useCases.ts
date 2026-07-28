import type { DomainKey } from './types'

export type UseCaseStatus = 'ready' | 'in-review' | 'blocked'

export interface UseCase {
  id: string
  name: string
  summary: string
  sourceIds: string[]
  /** Projected annual impact in dollars — the sort key. */
  impactValue: number
  /** Display form, e.g. "$2.1M". */
  impact: string
  effort: string
  status: UseCaseStatus
  /** Set only when status is 'blocked'. */
  blockedBy?: DomainKey
  guardrails: string[]
  exports: string[]
}

export const USE_CASES: UseCase[] = [
  {
    id: 'uc-claims-triage',
    name: 'Claims triage copilot',
    summary: 'Reads the FNOL, the policy and the call transcript, then routes and reserves.',
    sourceIds: ['guidewire-cc', 'genesys-claim-calls', 'guidewire-pc'],
    impactValue: 2_100_000, impact: '$2.1M', effort: '6 weeks', status: 'ready',
    guardrails: ['No reserve above $50K without a human approval', 'PII masked in every prompt', 'Refuses on policies in litigation'],
    exports: ['LangGraph', 'CrewAI', 'OpenAI Agents SDK', 'n8n'],
  },
  {
    id: 'uc-subrogation-finder',
    name: 'Subrogation recovery finder',
    summary: 'Reads closed claims and policy liability data to flag subrogation-eligible claims before the recovery window closes.',
    sourceIds: ['snowflake-claims-mart', 'postgres-claims-intake', 'guidewire-pc'],
    impactValue: 1_750_000, impact: '$1.75M', effort: '5 weeks', status: 'ready',
    guardrails: ['Never sends a demand letter — flags for adjuster sign-off only', 'Cites the liability basis for every flagged claim', 'Excludes claims already in litigation'],
    exports: ['LangGraph', 'CrewAI'],
  },
  {
    id: 'uc-fraud-triage',
    name: 'Fraud signal triage agent',
    summary: 'Correlates claim photography, call transcripts and prior claim history to score claims for SIU referral.',
    sourceIds: ['s3-claim-photos', 'genesys-claim-calls', 'snowflake-claims-mart'],
    impactValue: 1_450_000, impact: '$1.45M', effort: '7 weeks', status: 'ready',
    guardrails: ['Produces a score and cited signals only — never denies or delays a claim', 'Every SIU referral is reviewed by an analyst before contact', 'Score and rationale logged for regulatory audit'],
    exports: ['LangGraph', 'OpenAI Agents SDK'],
  },
  {
    id: 'uc-fnol-concierge',
    name: 'First-notice-of-loss intake concierge',
    summary: 'Reads the live FNOL stream against policy terms and coverage exclusions, and drafts the intake summary in real time.',
    sourceIds: ['azure-fnol', 'guidewire-pc', 'postgres-claims-intake'],
    impactValue: 1_200_000, impact: '$1.2M', effort: '4 weeks', status: 'ready',
    guardrails: ['Never quotes a settlement figure to the policyholder', 'Coverage disputes escalate to a human immediately', 'PII masked before any model call'],
    exports: ['LangGraph', 'n8n'],
  },
  {
    id: 'uc-renewal-retention',
    name: 'Renewal retention agent',
    summary: 'Watches the policy mart and service tickets for churn signals and drafts retention outreach ahead of renewal dates.',
    sourceIds: ['snowflake-policy-mart', 'salesforce-service-cloud', 'intercom-policyholder-chat'],
    impactValue: 980_000, impact: '$980K', effort: '4 weeks', status: 'ready',
    guardrails: ['Drafts outreach only — a retention specialist sends', 'Never alters premium or coverage terms', 'Suppresses outreach on policies already in the cancellation queue'],
    exports: ['CrewAI', 'n8n'],
  },
  {
    id: 'uc-treaty-reader',
    name: 'Reinsurance treaty reader',
    summary: 'Extracts cession terms from treaty documents and reconciles them against the reinsurance mart.',
    sourceIds: ['docusign-treaty-docs', 'snowflake-reinsurance-mart'],
    impactValue: 880_000, impact: '$880K', effort: '8 weeks', status: 'in-review',
    guardrails: ['Cites the treaty clause for every extracted term', 'Flags rather than resolves contradictions'],
    exports: ['LangGraph', 'OpenAI Agents SDK'],
  },
  {
    id: 'uc-complaint-routing',
    name: 'Complaint routing & escalation agent',
    summary: 'Classifies inbound complaints across chat and the support inbox and routes them to the right resolution queue.',
    sourceIds: ['intercom-policyholder-chat', 'outlook-support-inbox', 'confluence-support-kb'],
    impactValue: 760_000, impact: '$760K', effort: '5 weeks', status: 'in-review',
    guardrails: ['Never auto-closes a regulator-sensitive complaint', 'Full audit trail on every routing decision', 'Escalates ambiguous cases to a supervisor queue'],
    exports: ['LangGraph', 'n8n'],
  },
  {
    id: 'uc-broker-followup',
    name: 'Broker follow-up agent',
    summary: 'Chases stalled broker submissions using the broker portal and correspondence history.',
    sourceIds: ['salesforce-broker-portal', 'applied-epic', 'outlook-broker-correspondence'],
    impactValue: 640_000, impact: '$640K', effort: '5 weeks', status: 'blocked',
    blockedBy: 'broker-network',
    guardrails: ['Never contacts a broker under review', 'Drafts only — a human sends'],
    exports: ['LangGraph', 'n8n'],
  },
  {
    id: 'uc-uw-quote-copilot',
    name: 'Underwriting quote copilot',
    summary: 'Drafts a risk-adjusted quote from telematics data, inspection imagery and underwriting guidelines for underwriter review.',
    sourceIds: ['verisk-risk-data', 's3-inspection-images', 'sharepoint-uw-guidelines', 'mysql-uw-quotes'],
    impactValue: 590_000, impact: '$590K', effort: '9 weeks', status: 'blocked',
    blockedBy: 'underwriting',
    guardrails: ['Never binds a policy', 'Every rate factor cites its source record', 'Underwriter must approve before a quote issues'],
    exports: ['LangGraph', 'CrewAI'],
  },
  {
    id: 'uc-contract-clause-extraction',
    name: 'Contract clause extraction agent',
    summary: 'Extracts obligations and renewal triggers from broker agreements and vendor contracts into a searchable register.',
    sourceIds: ['icertis-contracts', 'sharepoint-broker-agreements', 'oracle-contracts-db'],
    impactValue: 510_000, impact: '$510K', effort: '6 weeks', status: 'blocked',
    blockedBy: 'contracts',
    guardrails: ['Flags ambiguous clauses rather than interpreting them', 'Legal reviews every extracted obligation before it is relied upon'],
    exports: ['LangGraph', 'OpenAI Agents SDK'],
  },
  {
    id: 'uc-regulatory-filing',
    name: 'Regulatory filing assistant',
    summary: 'Drafts statutory filings from the compliance ledger and audit documentation ahead of filing deadlines.',
    sourceIds: ['oracle-financials-compliance', 'archer-grc', 'sharepoint-audit-docs'],
    impactValue: 460_000, impact: '$460K', effort: '7 weeks', status: 'blocked',
    blockedBy: 'compliance',
    guardrails: ['Never submits a filing — a compliance officer signs every draft', 'Every figure cites its source ledger entry'],
    exports: ['LangGraph', 'n8n'],
  },
  {
    id: 'uc-property-risk-scoring',
    name: 'Property risk scoring agent',
    summary: 'Combines inspection imagery and telematics streams into a live risk score for renewal pricing review.',
    sourceIds: ['s3-inspection-images', 'verisk-risk-data'],
    impactValue: 410_000, impact: '$410K', effort: '6 weeks', status: 'blocked',
    blockedBy: 'underwriting',
    guardrails: ['Score is advisory only — never overrides underwriter judgment', 'Recalibrated only with underwriting sign-off'],
    exports: ['CrewAI', 'OpenAI Agents SDK'],
  },
  {
    id: 'uc-support-summarizer',
    name: 'Support ticket summarizer',
    summary: 'Summarizes long-running support threads across email, chat and the knowledge base into a single handoff note.',
    sourceIds: ['outlook-support-inbox', 'intercom-policyholder-chat', 'confluence-support-kb'],
    impactValue: 340_000, impact: '$340K', effort: '3 weeks', status: 'ready',
    guardrails: ['Summary only — no auto-reply to the policyholder', 'Agent reviews the summary before it is sent'],
    exports: ['LangGraph', 'n8n'],
  },
  {
    id: 'uc-broker-onboarding',
    name: 'Broker onboarding & appointment agent',
    summary: 'Assembles broker appointment paperwork from the broker portal and Applied Epic records for compliance sign-off.',
    sourceIds: ['salesforce-broker-portal', 'applied-epic'],
    impactValue: 260_000, impact: '$260K', effort: '3 weeks', status: 'ready',
    guardrails: ['Never appoints a broker — routes the packet for human sign-off', 'Flags missing licensure documents rather than guessing'],
    exports: ['CrewAI', 'n8n'],
  },
]

/** The n highest-impact opportunities. */
export const topUseCases = (n: number): UseCase[] =>
  [...USE_CASES].sort((a, b) => b.impactValue - a.impactValue).slice(0, n)
