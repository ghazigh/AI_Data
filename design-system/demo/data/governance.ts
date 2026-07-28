import type { DomainKey } from './types'

export interface AgentRecord {
  id: string
  name: string
  owner: string
  framework: string
  scopes: DomainKey[]
  calls: string
  denials: number
  lastSeen: string
}

export const AGENTS: AgentRecord[] = [
  { id: 'claims-triage-01', name: 'claims-triage-01', owner: 'Claims Ops', framework: 'LangGraph',
    scopes: ['claims', 'policies'], calls: '78.2K', denials: 1, lastSeen: '4 min ago' },
  { id: 'treaty-reader-02', name: 'treaty-reader-02', owner: 'Reinsurance', framework: 'OpenAI Agents SDK',
    scopes: ['reinsurance', 'contracts'], calls: '31.6K', denials: 0, lastSeen: '18 min ago' },
  { id: 'support-summary-01', name: 'support-summary-01', owner: 'Customer Care', framework: 'CrewAI',
    scopes: ['support', 'claims'], calls: '46.9K', denials: 2, lastSeen: '2 min ago' },
  { id: 'compliance-watch-01', name: 'compliance-watch-01', owner: 'Risk & Compliance', framework: 'LangGraph',
    scopes: ['compliance'], calls: '12.4K', denials: 0, lastSeen: '1 h ago' },
  { id: 'broker-insights-01', name: 'broker-insights-01', owner: 'Distribution', framework: 'n8n',
    scopes: ['broker-network'], calls: '8.9K', denials: 0, lastSeen: 'yesterday' },
  { id: 'legal-review', name: 'legal-review', owner: 'Legal', framework: 'LangGraph',
    scopes: ['claims', 'compliance'], calls: '6.0K', denials: 0, lastSeen: '3 h ago' },
]

export type PolicyLevel = 'row' | 'column' | 'chunk'

export interface Policy {
  id: string
  level: PolicyLevel
  rule: string
  applies: string
  enforcedOn: string
}

export const POLICIES: Policy[] = [
  { id: 'pol-pii', level: 'column', rule: 'Mask national ID, email and phone', applies: 'All agents', enforcedOn: '12 columns' },
  { id: 'pol-litigation', level: 'row', rule: 'Hide claims flagged in litigation', applies: 'All agents except legal-review', enforcedOn: '3,180 rows' },
  { id: 'pol-treaty', level: 'chunk', rule: 'Withhold unsigned treaty drafts', applies: 'treaty-reader-02', enforcedOn: '640 chunks' },
  { id: 'pol-salary', level: 'column', rule: 'Deny access to compensation fields', applies: 'All agents', enforcedOn: '6 columns' },
  { id: 'pol-retention', level: 'row', rule: 'Exclude records past retention', applies: 'All agents', enforcedOn: '8,940 rows' },
]

export interface AuditEntry {
  id: string
  when: string
  agentId: string
  query: string
  entities: string
  decision: 'allowed' | 'denied'
  /** Set on every denial. */
  policyId?: string
}

export const AUDIT: AuditEntry[] = [
  { id: 'l1', when: '14:22:07', agentId: 'claims-triage-01', query: 'policy(number=PL-88421) → claim → coverage', entities: 'Policy, Claim, Coverage', decision: 'allowed' },
  { id: 'l2', when: '14:21:58', agentId: 'support-summary-01', query: 'policyholder(id=884201).national_id', entities: 'Policyholder', decision: 'denied', policyId: 'pol-pii' },
  { id: 'l3', when: '14:21:40', agentId: 'treaty-reader-02', query: 'treaty(id=RT-2291) → cession', entities: 'Treaty, Cession', decision: 'allowed' },
  { id: 'l4', when: '14:20:55', agentId: 'compliance-watch-01', query: 'audit-finding(id=AF-50231) → policy', entities: 'Audit finding, Policy', decision: 'allowed' },
  { id: 'l5', when: '14:19:12', agentId: 'claims-triage-01', query: 'claim(number=CL-77310) → fnol.loss_description', entities: 'Claim, FNOL document', decision: 'denied', policyId: 'pol-litigation' },
  { id: 'l6', when: '14:18:03', agentId: 'broker-insights-01', query: 'broker(id=BR-4410) → submission', entities: 'Broker, Submission', decision: 'allowed' },
  { id: 'l7', when: '14:16:47', agentId: 'support-summary-01', query: 'ticket(id=TK-990214) → contact-interaction', entities: 'Ticket, Contact interaction', decision: 'allowed' },
  { id: 'l8', when: '14:15:21', agentId: 'claims-triage-01', query: 'claim(number=CL-88533) → payment', entities: 'Claim, Payment', decision: 'allowed' },
  { id: 'l9', when: '14:12:09', agentId: 'treaty-reader-02', query: 'contract(id=CT-30987) → amendment', entities: 'Contract, Amendment', decision: 'allowed' },
  { id: 'l10', when: '14:09:44', agentId: 'compliance-watch-01', query: 'sanctions-check(id=SC-771024) → policyholder', entities: 'Sanctions check, Policyholder', decision: 'allowed' },
  { id: 'l11', when: '14:05:18', agentId: 'support-summary-01', query: 'complaint(id=CM-04471, filed 2016) → contact-interaction', entities: 'Complaint, Contact interaction', decision: 'denied', policyId: 'pol-retention' },
  { id: 'l12', when: '14:01:52', agentId: 'claims-triage-01', query: 'policy(number=PL-550210) → endorsement', entities: 'Policy, Endorsement', decision: 'allowed' },
  { id: 'l13', when: '13:57:30', agentId: 'broker-insights-01', query: 'broker(id=BR-2207) → commission-statement', entities: 'Broker, Commission statement', decision: 'allowed' },
  { id: 'l14', when: '13:52:16', agentId: 'treaty-reader-02', query: 'treaty(id=RT-1187) → bordereau', entities: 'Treaty, Bordereau', decision: 'allowed' },
  { id: 'l15', when: '13:48:02', agentId: 'support-summary-01', query: 'claim(number=CL-90042) → claim-call', entities: 'Claim, Claim call', decision: 'allowed' },
  { id: 'l16', when: '13:41:37', agentId: 'compliance-watch-01', query: 'regulatory-filing(id=RF-6620) → contract', entities: 'Regulatory filing, Contract', decision: 'allowed' },
  { id: 'l17', when: '13:36:19', agentId: 'claims-triage-01', query: 'policy(number=PL-118820) → renewal', entities: 'Policy, Renewal', decision: 'allowed' },
  { id: 'l18', when: '13:29:55', agentId: 'broker-insights-01', query: 'submission(id=SB-33012) → quote', entities: 'Submission, Quote', decision: 'allowed' },
  { id: 'l19', when: '13:24:08', agentId: 'treaty-reader-02', query: 'treaty(id=RT-2004) → retention-class', entities: 'Treaty, Retention class', decision: 'allowed' },
  { id: 'l20', when: '13:18:41', agentId: 'claims-triage-01', query: 'claim(number=CL-61175) → adjuster', entities: 'Claim, Adjuster', decision: 'allowed' },
  { id: 'l21', when: '13:11:26', agentId: 'legal-review', query: 'claim(number=CL-77310) → fnol.loss_description', entities: 'Claim, FNOL document', decision: 'allowed' },
]
