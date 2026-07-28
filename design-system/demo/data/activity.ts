export type ActivityTone = 'info' | 'ok' | 'warn'

export interface ActivityEntry {
  id: string
  tone: ActivityTone
  /** Sentence with the subject in <b> handled by the renderer, not markup here. */
  subject: string
  detail: string
  sourceId: string
  /** Fixed display string. Never computed. */
  when: string
}

export const ACTIVITY: ActivityEntry[] = [
  { id: 'a1', tone: 'info', subject: 'Guidewire ClaimCenter', detail: 'synced — 41,208 new claim records indexed', sourceId: 'guidewire-cc', when: '14 min ago' },
  { id: 'a2', tone: 'warn', subject: 'SQL Server Legacy Policy Admin', detail: 'unmasked PII found in 3 columns — quarantined pending review', sourceId: 'sqlserver-legacy-policy', when: '1 h ago' },
  { id: 'a3', tone: 'ok', subject: 'Applied Epic', detail: 'identity resolution merged 12,470 duplicate broker records', sourceId: 'applied-epic', when: '3 h ago' },
  { id: 'a4', tone: 'info', subject: 'claims-triage-01', detail: 'served 8,412 graph queries', sourceId: 'snowflake-claims-mart', when: '5 h ago' },
  { id: 'a5', tone: 'warn', subject: 'SharePoint Underwriting Guidelines', detail: 'not refreshed in 21 days — freshness score falling', sourceId: 'sharepoint-uw-guidelines', when: 'yesterday' },
  { id: 'a6', tone: 'ok', subject: 'Semantic typing', detail: 'confirmed on 264 columns by D. Okafor', sourceId: 'snowflake-policy-mart', when: 'yesterday' },
  { id: 'a7', tone: 'info', subject: 'ReinsuranceCloud Treaty Register', detail: 'chunked 4,180 treaty statements for retrieval', sourceId: 'reinsurancecloud-treaties', when: 'yesterday' },
  { id: 'a8', tone: 'ok', subject: 'Genesys Claim Calls', detail: 'transcribed and embedded 12,900 calls', sourceId: 'genesys-claim-calls', when: '2 days ago' },
  { id: 'a9', tone: 'info', subject: 'DocuSign Treaty Documents', detail: 'reconciled 212 treaty cession terms against bordereaux', sourceId: 'docusign-treaty-docs', when: '2 days ago' },
  { id: 'a10', tone: 'warn', subject: 'RSA Archer GRC', detail: 'compliance mapping stalled — 14 controls unmapped to source columns', sourceId: 'archer-grc', when: '3 days ago' },
  { id: 'a11', tone: 'ok', subject: 'Zendesk Claims Queue', detail: 'entity resolution linked 6,204 tickets to policy records', sourceId: 'zendesk-claims', when: '3 days ago' },
  { id: 'a12', tone: 'info', subject: 'Verisk Risk & Telematics Feed', detail: 'ingested 1.1M new telematics events', sourceId: 'verisk-risk-data', when: '4 days ago' },
]
