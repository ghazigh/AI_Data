import type { Modality, Source } from './types'
import { SOURCES } from './sources'

export interface PipelineStage {
  name: string
  detail: string
  count: number
  unit: string
  runtime: string
  /** Set on the one stage that produces structured markdown. */
  isStructuring?: boolean
}

export interface ModalitySample {
  /** Raw extract as it arrives from the source. */
  raw: string
  /** What the structuring stage produces. */
  structured: string
  sourceId: string
}

export interface ModalityPipeline {
  modality: Modality
  label: string
  volume: number
  volumeUnit: string
  stages: PipelineStage[]
  /** What an agent ends up able to read. */
  output: string
  shape: 'markdown' | 'schema'
  sample: ModalitySample
}

/** Connected sources declaring a modality. Derived, never stored, so it cannot drift. */
export const sourcesForModality = (modality: Modality): Source[] =>
  SOURCES.filter(s => s.status === 'connected' && s.modalities.includes(modality))

export const MODALITY_PIPELINES: ModalityPipeline[] = [
  {
    modality: 'tables',
    label: 'Tables',
    volume: 23_000_000,
    volumeUnit: 'rows',
    shape: 'schema',
    output: 'Typed schema with row and column policy',
    stages: [
      { name: 'Profile', detail: 'Scans every table for null rates, cardinality and key candidates across the 15 connected sources', count: 23_000_000, unit: 'rows', runtime: '~4 h' },
      { name: 'Type', detail: 'Infers a canonical type for every column, resolving conflicts where sources disagree', count: 1_260, unit: 'columns', runtime: '~28 min' },
      { name: 'Mask', detail: 'Redacts claimant names, SSNs and bank details at the column level before publish', count: 6_210_000, unit: 'values', runtime: '~1 h 36 min' },
      { name: 'Publish schema', detail: 'Publishes the typed, masked schema with row- and column-level access policy attached', count: 1_260, unit: 'columns', runtime: '~6 min' },
    ],
    sample: {
      sourceId: 'snowflake-policy-mart',
      raw: 'POLICY_NO | INSURED_NM | EFF_DT | EXP_DT | PREM_AMT | LOB_CD\nGL-2291047 | ACME LOGISTICS INC | 2025-03-01 | 2026-03-01 | 184500.00 | GL01',
      structured: '-- policy_master (typed, masked, policy-scoped)\nCREATE TABLE policy_master (\n  policy_no        VARCHAR(12)   NOT NULL PRIMARY KEY,\n  insured_name     VARCHAR(120)  WITH MASKING POLICY mask_insured_name,\n  effective_date   DATE          NOT NULL,\n  expiry_date      DATE          NOT NULL,\n  premium_amount   NUMERIC(14,2) WITH MASKING POLICY mask_premium_amount,\n  line_of_business VARCHAR(4)    NOT NULL\n);\n\nALTER TABLE policy_master\n  ADD ROW ACCESS POLICY underwriting_read_only ON (line_of_business);',
    },
  },
  {
    modality: 'documents',
    label: 'Documents',
    volume: 1_300_000,
    volumeUnit: 'documents',
    shape: 'markdown',
    output: 'Clause-level markdown, retrievable by section',
    stages: [
      { name: 'Parse & OCR', detail: 'Reads scanned and native PDFs, recovers text and table structure', count: 1_300_000, unit: 'documents', runtime: '~6 h 38 min' },
      { name: 'Structure to markdown', detail: 'Headings, tables and clause numbering preserved as markdown', count: 1_300_000, unit: 'documents', runtime: '~3 h 51 min', isStructuring: true },
      { name: 'Section & chunk', detail: 'Split on clause boundaries so retrieval returns the term, not the file', count: 9_362_000, unit: 'chunks', runtime: '~125 h 21 min' },
      { name: 'Embed', detail: 'Vector index over every chunk, provenance carried through', count: 9_362_000, unit: 'chunks', runtime: '~6 h 35 min' },
    ],
    sample: {
      sourceId: 'docusign-treaty-docs',
      raw: 'QUOTA SHARE TREATY — ARTICLE IV\nCESSION. The Reinsurer shall accept a\n35% quota share of each risk, subject to a\nmaximum cession of USD 5,000,000 any one\nrisk. Retention: 65% quota share.',
      structured: '## Article IV — Cession\n\n| Term | Value |\n| --- | --- |\n| Quota share ceded | 35% |\n| Maximum cession | USD 5,000,000 any one risk |\n| Retention | 65% quota share |\n\n<!-- clause: treaty/article-iv/cession -->',
    },
  },
  {
    modality: 'tickets',
    label: 'Tickets',
    volume: 1_600_000,
    volumeUnit: 'tickets',
    shape: 'markdown',
    output: 'Threaded cases as markdown, one document each',
    stages: [
      { name: 'Thread', detail: 'Groups messages into full ticket threads across the claims and ops queues', count: 1_600_000, unit: 'tickets', runtime: '~2 h 02 min' },
      { name: 'Redact', detail: 'Strips claimant PII from messages before the thread leaves the boundary', count: 1_600_000, unit: 'tickets', runtime: '~1 h 18 min' },
      { name: 'Structure to markdown', detail: 'Renders each thread as one markdown document, message order preserved', count: 1_600_000, unit: 'tickets', runtime: '~1 h 36 min', isStructuring: true },
      { name: 'Embed', detail: 'Vector index over every ticket document', count: 1_600_000, unit: 'documents', runtime: '~8 h 06 min' },
    ],
    sample: {
      sourceId: 'zendesk-claims',
      raw: 'TICKET #48213 | STATUS: Open | PRIORITY: High\n[09:14] policyholder: My roof was damaged in the hailstorm last night, I need to file a claim.\n[09:22] agent.rlopez: Sorry to hear that — I have opened FNOL claim CLM-2291046 for you and dispatched an adjuster.',
      structured: '# Ticket 48213 — Roof damage, hailstorm\n\n**Status:** Open · **Priority:** High · **Claim:** CLM-2291046\n\n**09:14 — Policyholder**\nMy roof was damaged in the hailstorm last night, I need to file a claim.\n\n**09:22 — R. Lopez (Agent)**\nSorry to hear that — I have opened FNOL claim CLM-2291046 for you and dispatched an adjuster.',
    },
  },
  {
    modality: 'email',
    label: 'Email',
    volume: 4_000_000,
    volumeUnit: 'messages',
    shape: 'markdown',
    output: 'Sender-attributed correspondence as markdown',
    stages: [
      { name: 'Thread', detail: 'Groups messages into threads by subject and participant chain across the broker and reinsurance inboxes', count: 4_000_000, unit: 'messages', runtime: '~5 h 25 min' },
      { name: 'Redact', detail: 'Removes signatures, forwarded disclaimers and embedded PII before structuring', count: 4_000_000, unit: 'messages', runtime: '~3 h 11 min' },
      { name: 'Structure to markdown', detail: 'Renders each thread as sender-attributed markdown, one file per thread', count: 1_196_330, unit: 'threads', runtime: '~4 h 09 min', isStructuring: true },
      { name: 'Chunk', detail: 'Splits long threads at reply boundaries for retrieval — never more chunks than messages', count: 3_349_724, unit: 'chunks', runtime: '~115 h 21 min' },
      { name: 'Embed', detail: 'Vector index over every chunk', count: 3_349_724, unit: 'chunks', runtime: '~6 h 04 min' },
    ],
    sample: {
      sourceId: 'outlook-broker-correspondence',
      raw: 'From: k.owusu@broker-partners.com\nTo: underwriting@meridianassurance.com\nSubject: RE: Layer placement — Coastal Property Program\n\nHi team, following up on the quote for the coastal property program renewal. Can you confirm the excess layer capacity by Friday?',
      structured: '## RE: Layer placement — Coastal Property Program\n\n**From:** K. Owusu (Broker Partners) · **To:** Underwriting\n\nFollowing up on the quote for the coastal property program renewal. Confirm excess layer capacity by Friday.\n\n<!-- thread: broker-correspondence/2026-coastal-property -->',
    },
  },
  {
    modality: 'transcripts',
    label: 'Transcripts',
    volume: 650_000,
    volumeUnit: 'transcripts',
    shape: 'markdown',
    output: 'Speaker-attributed markdown with timestamps',
    stages: [
      { name: 'Diarise', detail: 'Separates speaker turns and attaches timestamps from the call recording', count: 650_000, unit: 'transcripts', runtime: '~6 h 45 min' },
      { name: 'Redact', detail: 'Strips claimant PII and account numbers from the call transcript before structuring', count: 650_000, unit: 'transcripts', runtime: '~33 min' },
      { name: 'Structure to markdown', detail: 'Renders each call as speaker-attributed markdown with timestamps preserved', count: 650_000, unit: 'transcripts', runtime: '~3 h 49 min', isStructuring: true },
      { name: 'Chunk', detail: 'Splits long calls into topic-bounded segments for retrieval', count: 3_077_000, unit: 'chunks', runtime: '~62 h 41 min' },
      { name: 'Embed', detail: 'Vector index over every chunk', count: 3_077_000, unit: 'chunks', runtime: '~3 h 18 min' },
    ],
    sample: {
      sourceId: 'genesys-claim-calls',
      raw: 'CALL ID: GC-778241 | DURATION: 00:07:42\n[00:00:04] AGENT: Thank you for calling Meridian claims, this is Dana, how can I help?\n[00:00:11] CALLER: Hi, I am calling about claim CLM-2291046, the adjuster has not called back yet.',
      structured: "# Call GC-778241 — Claim CLM-2291046 follow-up\n\n**Duration:** 7m 42s\n\n**[00:00:04] Dana (Agent)**\nThank you for calling Meridian claims, this is Dana, how can I help?\n\n**[00:00:11] Caller**\nHi, I am calling about claim CLM-2291046, the adjuster has not called back yet.",
    },
  },
  {
    modality: 'images',
    label: 'Images',
    volume: 4_200_000,
    volumeUnit: 'images',
    shape: 'markdown',
    output: 'Described images as markdown, linked to their claim',
    stages: [
      { name: 'OCR', detail: 'Extracts any visible text — plate numbers, street signs, meter readings — from each photo', count: 4_200_000, unit: 'images', runtime: '~8 h 23 min' },
      { name: 'Caption', detail: 'Generates a structured caption describing damage type, location and severity', count: 4_200_000, unit: 'images', runtime: '~6 h 17 min' },
      { name: 'Redact', detail: 'Blurs plate numbers and other personal data pulled out by OCR before structuring', count: 4_200_000, unit: 'images', runtime: '~3 h 30 min' },
      { name: 'Structure to markdown', detail: 'Combines OCR text and caption into one markdown record per photo, linked to its claim', count: 4_200_000, unit: 'images', runtime: '~1 h 58 min', isStructuring: true },
      { name: 'Embed', detail: 'Vector index over every image record', count: 4_200_000, unit: 'images', runtime: '~21 h 16 min' },
    ],
    sample: {
      sourceId: 's3-claim-photos',
      raw: 'FILE: CLM-2291046_photo_014.jpg | 4032x3024 | GPS: 41.792,-87.601\nCAPTURED: 2026-07-14T09:12:03Z | DEVICE: iPhone 14 | CLAIM: CLM-2291046\nVISIBLE IN FRAME: street sign "4TH ST", vehicle plate "IL-8842-QT", roof section missing shingles over rear elevation',
      structured: '## Claim CLM-2291046 — Exterior damage, photo 14\n\n**Location:** Chicago, IL (41.792, -87.601)\n\n**OCR text:** 4TH ST · plate [REDACTED]\n\nRoof section missing shingles over an approximately 3m x 2m area, consistent with wind uplift. Visible granule loss along the exposed decking.\n\n<!-- claim: CLM-2291046 · source: s3-claim-photos -->',
    },
  },
  {
    modality: 'streams',
    label: 'Streams',
    volume: 14_530_000,
    volumeUnit: 'events',
    shape: 'schema',
    output: 'Typed rollups, queryable beside the warehouse',
    stages: [
      { name: 'Window', detail: 'Buckets FNOL and telematics events into rolling 15-minute windows', count: 14_530_000, unit: 'events', runtime: '~57 min' },
      { name: 'Aggregate', detail: 'Rolls each window into per-policy, per-peril summary metrics', count: 2_305_000, unit: 'rollups', runtime: '~36 min' },
      { name: 'Type', detail: 'Infers a canonical type for every rollup metric column', count: 42, unit: 'columns', runtime: '~2 min' },
      { name: 'Publish schema', detail: 'Publishes the typed rollup schema alongside the warehouse tables', count: 42, unit: 'columns', runtime: '~1 min' },
    ],
    sample: {
      sourceId: 'azure-fnol',
      raw: '{"event":"fnol.telematics.impact","policy_no":"AU-4471002","ts":"2026-07-14T09:12:03Z","g_force":4.2,"speed_kph":38,"location":"41.79,-87.60"}',
      structured: '-- fnol_impact_rollup (typed, windowed 15-min)\nCREATE TABLE fnol_impact_rollup (\n  policy_no      VARCHAR(12)  NOT NULL,\n  window_start   TIMESTAMP    NOT NULL,\n  impact_count   INTEGER      NOT NULL,\n  max_g_force    NUMERIC(4,1),\n  avg_speed_kph  NUMERIC(5,1)\n);',
    },
  },
]
