import type { DomainKey, Source, SourceCategory, Modality } from './types'
import { DOMAINS } from './tenant'

export const SOURCES: Source[] = [
  // ---- claims (8) ----
  { id: 'guidewire-cc', name: 'Guidewire ClaimCenter', vendor: 'Guidewire', category: 'saas',
    modalities: ['tables', 'documents'], records: 4_120_800, lastSync: '14 min ago',
    readiness: 82, primaryDomain: 'claims', domains: ['claims', 'policies'], status: 'connected' },
  { id: 'zendesk-claims', name: 'Zendesk Claims Queue', vendor: 'Zendesk', category: 'saas',
    modalities: ['tickets'], records: 918_400, lastSync: '22 min ago',
    readiness: 76, primaryDomain: 'claims', domains: ['claims', 'support'], status: 'connected' },
  { id: 'genesys-claim-calls', name: 'Genesys Claim Calls', vendor: 'Genesys', category: 'saas',
    modalities: ['transcripts'], records: 312_600, lastSync: '1 h ago',
    readiness: 68, primaryDomain: 'claims', domains: ['claims', 'support'], status: 'connected' },
  { id: 's3-claim-photos', name: 'S3 Claim Photography', vendor: 'AWS', category: 'object-store',
    modalities: ['images'], records: 2_840_000, lastSync: '38 min ago',
    readiness: 71, primaryDomain: 'claims', domains: ['claims'], status: 'connected' },
  { id: 'snowflake-claims-mart', name: 'Snowflake Claims Mart', vendor: 'Snowflake', category: 'warehouse',
    modalities: ['tables'], records: 6_380_000, lastSync: '9 min ago',
    readiness: 80, primaryDomain: 'claims', domains: ['claims', 'reinsurance'], status: 'connected' },
  { id: 'postgres-claims-intake', name: 'Postgres Claims Intake', vendor: 'PostgreSQL', category: 'oltp',
    modalities: ['tables'], records: 1_204_500, lastSync: '3 h ago',
    readiness: 74, primaryDomain: 'claims', domains: ['claims', 'policies'], status: 'connected' },
  { id: 'jira-claims-ops', name: 'Jira Claims Ops', vendor: 'Atlassian', category: 'saas',
    modalities: ['tickets'], records: 84_200, lastSync: '2 h ago',
    readiness: 69, primaryDomain: 'claims', domains: ['claims', 'support'], status: 'connected' },
  { id: 'azure-fnol', name: 'Azure FNOL Intake', vendor: 'Microsoft', category: 'stream',
    modalities: ['streams'], records: 5_610_000, lastSync: '4 min ago',
    readiness: 73, primaryDomain: 'claims', domains: ['claims', 'underwriting'], status: 'connected' },

  // ---- policies (4) ----
  { id: 'guidewire-pc', name: 'Guidewire PolicyCenter', vendor: 'Guidewire', category: 'saas',
    modalities: ['tables'], records: 2_640_000, lastSync: '18 min ago',
    readiness: 88, primaryDomain: 'policies', domains: ['policies'], status: 'connected' },
  { id: 'duck-creek', name: 'Duck Creek Policy', vendor: 'Duck Creek', category: 'saas',
    modalities: ['tables', 'documents'], records: 1_980_300, lastSync: '31 min ago',
    readiness: 84, primaryDomain: 'policies', domains: ['policies', 'contracts'], status: 'connected' },
  { id: 'snowflake-policy-mart', name: 'Snowflake Policy Mart', vendor: 'Snowflake', category: 'warehouse',
    modalities: ['tables'], records: 3_720_000, lastSync: '11 min ago',
    readiness: 90, primaryDomain: 'policies', domains: ['policies'], status: 'connected' },
  { id: 'sqlserver-legacy-policy', name: 'SQL Server Legacy Policy Admin', vendor: 'Microsoft', category: 'oltp',
    modalities: ['tables'], records: 640_900, lastSync: 'yesterday',
    readiness: 76, primaryDomain: 'policies', domains: ['policies'], status: 'connected' },

  // ---- support (4) ----
  { id: 'salesforce-service-cloud', name: 'Salesforce Service Cloud', vendor: 'Salesforce', category: 'saas',
    modalities: ['tickets', 'email'], records: 1_412_700, lastSync: '7 min ago',
    readiness: 79, primaryDomain: 'support', domains: ['support', 'broker-network', 'policies'], status: 'connected' },
  { id: 'outlook-support-inbox', name: 'Outlook Support Inbox', vendor: 'Microsoft', category: 'saas',
    modalities: ['email'], records: 2_108_000, lastSync: '26 min ago',
    readiness: 73, primaryDomain: 'support', domains: ['support'], status: 'connected' },
  { id: 'intercom-policyholder-chat', name: 'Intercom Policyholder Chat', vendor: 'Intercom', category: 'saas',
    modalities: ['tickets', 'transcripts'], records: 561_300, lastSync: '48 min ago',
    readiness: 68, primaryDomain: 'support', domains: ['support'], status: 'connected' },
  { id: 'confluence-support-kb', name: 'Confluence Support KB', vendor: 'Atlassian', category: 'saas',
    modalities: ['documents'], records: 19_800, lastSync: '5 h ago',
    readiness: 82, primaryDomain: 'support', domains: ['support'], status: 'connected' },

  // ---- contracts (4) ----
  { id: 'icertis-contracts', name: 'Icertis CLM', vendor: 'Icertis', category: 'saas',
    modalities: ['documents'], records: 244_600, lastSync: '52 min ago',
    readiness: 70, primaryDomain: 'contracts', domains: ['contracts'], status: 'connected' },
  { id: 'sharepoint-broker-agreements', name: 'SharePoint Broker Agreements', vendor: 'Microsoft', category: 'saas',
    modalities: ['documents'], records: 88_400, lastSync: '3 h ago',
    readiness: 62, primaryDomain: 'contracts', domains: ['contracts', 'broker-network'], status: 'connected' },
  { id: 'docusign-treaty-docs', name: 'DocuSign Treaty Documents', vendor: 'DocuSign', category: 'saas',
    modalities: ['documents'], records: 28_400, lastSync: '1 h ago',
    readiness: 75, primaryDomain: 'contracts', domains: ['contracts', 'reinsurance'], status: 'connected' },
  { id: 'oracle-contracts-db', name: 'Oracle Contracts DB', vendor: 'Oracle', category: 'oltp',
    modalities: ['tables'], records: 402_100, lastSync: 'yesterday',
    readiness: 66, primaryDomain: 'contracts', domains: ['contracts'], status: 'connected' },

  // ---- broker-network (4) ----
  { id: 'salesforce-broker-portal', name: 'Salesforce Broker Portal', vendor: 'Salesforce', category: 'saas',
    modalities: ['tables'], records: 226_500, lastSync: '16 min ago',
    readiness: 63, primaryDomain: 'broker-network', domains: ['broker-network'], status: 'connected' },
  { id: 'applied-epic', name: 'Applied Epic', vendor: 'Applied Systems', category: 'saas',
    modalities: ['tables'], records: 318_900, lastSync: '2 h ago',
    readiness: 58, primaryDomain: 'broker-network', domains: ['broker-network', 'policies'], status: 'connected' },
  { id: 'outlook-broker-correspondence', name: 'Outlook Broker Correspondence', vendor: 'Microsoft', category: 'saas',
    modalities: ['email'], records: 1_046_200, lastSync: '41 min ago',
    readiness: 55, primaryDomain: 'broker-network', domains: ['broker-network'], status: 'connected' },
  { id: 'teams-broker-channels', name: 'Microsoft Teams Broker Channels', vendor: 'Microsoft', category: 'saas',
    modalities: ['transcripts'], records: 74_300, lastSync: '6 h ago',
    readiness: 67, primaryDomain: 'broker-network', domains: ['broker-network', 'support'], status: 'connected' },

  // ---- underwriting (4) ----
  { id: 'mysql-uw-quotes', name: 'MySQL Underwriting Quotes', vendor: 'Oracle', category: 'oltp',
    modalities: ['tables'], records: 792_400, lastSync: '19 min ago',
    readiness: 59, primaryDomain: 'underwriting', domains: ['underwriting'], status: 'connected' },
  { id: 's3-inspection-images', name: 'S3 Property Inspection Images', vendor: 'AWS', category: 'object-store',
    modalities: ['images'], records: 1_360_000, lastSync: '1 h ago',
    readiness: 52, primaryDomain: 'underwriting', domains: ['underwriting'], status: 'connected' },
  { id: 'verisk-risk-data', name: 'Verisk Risk & Telematics Feed', vendor: 'Verisk', category: 'stream',
    modalities: ['streams'], records: 8_920_000, lastSync: '2 min ago',
    readiness: 61, primaryDomain: 'underwriting', domains: ['underwriting', 'reinsurance'], status: 'connected' },
  { id: 'sharepoint-uw-guidelines', name: 'SharePoint Underwriting Guidelines', vendor: 'Microsoft', category: 'saas',
    modalities: ['documents'], records: 6_700, lastSync: '21 days ago',
    readiness: 65, primaryDomain: 'underwriting', domains: ['underwriting'], status: 'connected' },

  // ---- reinsurance (3) ----
  { id: 'snowflake-reinsurance-mart', name: 'Snowflake Reinsurance Mart', vendor: 'Snowflake', category: 'warehouse',
    modalities: ['tables'], records: 1_082_000, lastSync: '12 min ago',
    readiness: 77, primaryDomain: 'reinsurance', domains: ['reinsurance'], status: 'connected' },
  { id: 'reinsurancecloud-treaties', name: 'ReinsuranceCloud Treaty Register', vendor: 'ReinsuranceCloud', category: 'saas',
    modalities: ['tables', 'documents'], records: 9_400, lastSync: '3 h ago',
    readiness: 71, primaryDomain: 'reinsurance', domains: ['reinsurance', 'contracts'], status: 'connected' },
  { id: 'outlook-reinsurance-correspondence', name: 'Outlook Reinsurance Correspondence', vendor: 'Microsoft', category: 'saas',
    modalities: ['email'], records: 218_600, lastSync: 'yesterday',
    readiness: 66, primaryDomain: 'reinsurance', domains: ['reinsurance'], status: 'connected' },

  // ---- compliance (3) ----
  { id: 'archer-grc', name: 'RSA Archer GRC', vendor: 'RSA', category: 'saas',
    modalities: ['tables', 'documents'], records: 142_300, lastSync: '27 min ago',
    readiness: 68, primaryDomain: 'compliance', domains: ['compliance'], status: 'connected' },
  { id: 'oracle-financials-compliance', name: 'Oracle Financials Compliance Ledger', vendor: 'Oracle', category: 'oltp',
    modalities: ['tables'], records: 966_100, lastSync: '5 h ago',
    readiness: 60, primaryDomain: 'compliance', domains: ['compliance'], status: 'connected' },
  { id: 'sharepoint-audit-docs', name: 'SharePoint Audit Documentation', vendor: 'Microsoft', category: 'saas',
    modalities: ['documents'], records: 31_500, lastSync: '2 h ago',
    readiness: 72, primaryDomain: 'compliance', domains: ['compliance', 'contracts'], status: 'connected' },

  // ---- awaiting credentials (4, excluded from weighting) ----
  { id: 'workday', name: 'Workday HR', vendor: 'Workday', category: 'saas',
    modalities: ['tables'], records: 0, lastSync: 'Never',
    readiness: 0, primaryDomain: 'compliance', domains: ['compliance'], status: 'pending-credentials' },
  { id: 'servicenow', name: 'ServiceNow ITSM', vendor: 'ServiceNow', category: 'saas',
    modalities: ['tickets'], records: 0, lastSync: 'Never',
    readiness: 0, primaryDomain: 'support', domains: ['support'], status: 'pending-credentials' },
  { id: 'oracle-financials', name: 'Oracle Financials Cloud', vendor: 'Oracle', category: 'saas',
    modalities: ['tables'], records: 0, lastSync: 'Never',
    readiness: 0, primaryDomain: 'compliance', domains: ['compliance', 'contracts'], status: 'pending-credentials' },
  { id: 'slack', name: 'Slack Broker Channels', vendor: 'Slack', category: 'saas',
    modalities: ['transcripts'], records: 0, lastSync: 'Never',
    readiness: 0, primaryDomain: 'broker-network', domains: ['broker-network', 'support'], status: 'pending-credentials' },
]

export interface CatalogueEntry {
  id: string
  name: string
  vendor: string
  category: SourceCategory
  modalities: Modality[]
  /** Domain a newly connected instance is weighted into. */
  primaryDomain: DomainKey
  /** Score the scripted scan settles on. */
  readiness: number
  /** Record count the scan discovers. A settled source with 0 records reads as fake. */
  records: number
}

/** Connectors offered in the "Connect a source" catalogue, none of them already live. */
export const CATALOGUE: CatalogueEntry[] = [
  { id: 'cat-databricks-claims', name: 'Databricks Claims Lakehouse', vendor: 'Databricks', category: 'warehouse',
    modalities: ['tables'], primaryDomain: 'claims', readiness: 74, records: 5_240_000 },
  { id: 'cat-redshift', name: 'Amazon Redshift', vendor: 'AWS', category: 'warehouse',
    modalities: ['tables'], primaryDomain: 'reinsurance', readiness: 69, records: 1_460_000 },
  { id: 'cat-kinesis', name: 'Kinesis Telematics', vendor: 'AWS', category: 'stream',
    modalities: ['streams'], primaryDomain: 'underwriting', readiness: 61, records: 7_240_000 },
  { id: 'cat-notion', name: 'Notion Product Wiki', vendor: 'Notion', category: 'saas',
    modalities: ['documents'], primaryDomain: 'support', readiness: 72, records: 14_200 },
  { id: 'cat-mysql-quotes', name: 'MySQL Quote Engine', vendor: 'Oracle', category: 'oltp',
    modalities: ['tables'], primaryDomain: 'underwriting', readiness: 66, records: 410_600 },
  { id: 'cat-gcs-archive', name: 'GCS Document Archive', vendor: 'Google Cloud', category: 'object-store',
    modalities: ['documents', 'images'], primaryDomain: 'contracts', readiness: 64, records: 1_180_000 },
  { id: 'cat-bigquery', name: 'Google BigQuery', vendor: 'Google Cloud', category: 'warehouse',
    modalities: ['tables'], primaryDomain: 'policies', readiness: 70, records: 2_860_000 },
  { id: 'cat-snowflake-uw', name: 'Snowflake Underwriting Mart', vendor: 'Snowflake', category: 'warehouse',
    modalities: ['tables'], primaryDomain: 'underwriting', readiness: 58, records: 1_940_000 },
  { id: 'cat-postgres-broker', name: 'Postgres Broker CRM', vendor: 'PostgreSQL', category: 'oltp',
    modalities: ['tables'], primaryDomain: 'broker-network', readiness: 55, records: 312_800 },
  { id: 'cat-sqlserver-claims', name: 'SQL Server Claims Archive', vendor: 'Microsoft', category: 'oltp',
    modalities: ['tables'], primaryDomain: 'claims', readiness: 63, records: 1_860_000 },
  { id: 'cat-dynamics365', name: 'Microsoft Dynamics 365', vendor: 'Microsoft', category: 'saas',
    modalities: ['tables', 'tickets'], primaryDomain: 'broker-network', readiness: 60, records: 276_400 },
  { id: 'cat-hubspot', name: 'HubSpot Broker CRM', vendor: 'HubSpot', category: 'saas',
    modalities: ['tables', 'email'], primaryDomain: 'broker-network', readiness: 57, records: 184_700 },
  { id: 'cat-workday-financials', name: 'Workday Financial Management', vendor: 'Workday', category: 'saas',
    modalities: ['tables'], primaryDomain: 'compliance', readiness: 62, records: 528_300 },
  { id: 'cat-servicenow-grc', name: 'ServiceNow GRC', vendor: 'ServiceNow', category: 'saas',
    modalities: ['tickets', 'documents'], primaryDomain: 'compliance', readiness: 65, records: 96_500 },
  { id: 'cat-box', name: 'Box Contract Repository', vendor: 'Box', category: 'object-store',
    modalities: ['documents'], primaryDomain: 'contracts', readiness: 67, records: 152_300 },
  { id: 'cat-dropbox', name: 'Dropbox Business', vendor: 'Dropbox', category: 'object-store',
    modalities: ['documents', 'images'], primaryDomain: 'support', readiness: 59, records: 68_900 },
  { id: 'cat-segment', name: 'Segment Event Stream', vendor: 'Twilio', category: 'stream',
    modalities: ['streams'], primaryDomain: 'claims', readiness: 68, records: 4_320_000 },
  { id: 'cat-confluent', name: 'Confluent Kafka Claims Events', vendor: 'Confluent', category: 'stream',
    modalities: ['streams'], primaryDomain: 'claims', readiness: 71, records: 6_780_000 },
  { id: 'cat-twilio', name: 'Twilio Contact Transcripts', vendor: 'Twilio', category: 'saas',
    modalities: ['transcripts'], primaryDomain: 'support', readiness: 64, records: 248_900 },
  { id: 'cat-gmail', name: 'Google Workspace Mail', vendor: 'Google', category: 'saas',
    modalities: ['email'], primaryDomain: 'broker-network', readiness: 58, records: 1_742_000 },
  { id: 'cat-sharepoint-reinsurance', name: 'SharePoint Reinsurance Docs', vendor: 'Microsoft', category: 'saas',
    modalities: ['documents'], primaryDomain: 'reinsurance', readiness: 69, records: 11_600 },
  { id: 'cat-oracle-uw', name: 'Oracle Underwriting Workbench', vendor: 'Oracle', category: 'oltp',
    modalities: ['tables'], primaryDomain: 'underwriting', readiness: 53, records: 534_700 },
  { id: 'cat-nas-images', name: 'NetApp Inspection Image Store', vendor: 'NetApp', category: 'object-store',
    modalities: ['images'], primaryDomain: 'underwriting', readiness: 50, records: 980_400 },
  { id: 'cat-teams-compliance', name: 'Microsoft Teams Compliance Archive', vendor: 'Microsoft', category: 'saas',
    modalities: ['transcripts', 'documents'], primaryDomain: 'compliance', readiness: 61, records: 58_600 },
  { id: 'cat-eventbridge', name: 'AWS EventBridge Claims Stream', vendor: 'AWS', category: 'stream',
    modalities: ['streams'], primaryDomain: 'claims', readiness: 66, records: 3_960_000 },
  { id: 'cat-workfront', name: 'Adobe Workfront', vendor: 'Adobe', category: 'saas',
    modalities: ['tables'], primaryDomain: 'contracts', readiness: 60, records: 64_800 },
]

/** A source's display name, defined once so the drawer, the use-case bindings
 * list and the entity lineage line never disagree about what a source is called. */
export const sourceName = (id: string): string => SOURCES.find(s => s.id === id)?.name ?? id

/** A source's vendor, defined once for the same reason as sourceName. */
export const sourceVendor = (id: string): string => SOURCES.find(s => s.id === id)?.vendor ?? id

/** Connected sources weighted into a domain. */
export const weightForDomain = (key: DomainKey): number =>
  SOURCES.filter(s => s.status === 'connected' && s.primaryDomain === key).length

/** Source-weighted mean of the domain scores, rounded — the headline estate score. */
export function estateScore(): number {
  let weighted = 0
  let total = 0
  for (const d of DOMAINS) {
    const w = weightForDomain(d.key)
    weighted += d.score * w
    total += w
  }
  return Math.round(weighted / total)
}
