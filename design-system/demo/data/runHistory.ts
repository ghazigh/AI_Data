import type { SectionKind } from './pipelineCatalogue'

export type RunOutcome = 'succeeded' | 'failed' | 'cancelled'

export interface RunHistoryEntry {
  id: string
  /** A real id in pipelineCatalogue's CATALOGUE_SECTIONS. */
  entryId: string
  entryName: string
  kind: SectionKind
  /** Fixed display string — never computed from a clock. */
  finished: string
  /** Fixed display string. */
  duration: string
  stagesCompleted: number
  stagesTotal: number
  records: number
  readinessDelta: number
  /** One line summarising the configuration the run was started with. */
  configSummary: string
  outcome: RunOutcome
  dryRun: boolean
  /** Present only when the outcome needs explaining — a failure, a cancellation, or a dry run. */
  note?: string
}

export const RUN_HISTORY: RunHistoryEntry[] = [
  {
    id: 'hist-1',
    entryId: 'structuring-tables',
    entryName: 'Tables structuring',
    kind: 'structuring',
    finished: '12 min ago',
    duration: '6 h 10 min',
    stagesCompleted: 4,
    stagesTotal: 4,
    records: 23_000_000,
    readinessDelta: 0,
    configSummary: 'Full scope, 6 sources, personal data masked',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-2',
    entryId: 'graph-extend',
    entryName: 'Add a dataset to the graph',
    kind: 'graph',
    finished: '6 days ago',
    duration: '57 min',
    stagesCompleted: 4,
    stagesTotal: 4,
    records: 63_400,
    readinessDelta: 0,
    configSummary: 'SharePoint UW guidelines, applying the existing projection and cluster model',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-3',
    entryId: 'plan-p1',
    entryName: 'Resolve duplicate policyholders',
    kind: 'remediation',
    finished: '2 days ago',
    duration: '49 min',
    stagesCompleted: 3,
    stagesTotal: 3,
    records: 41_208,
    readinessDelta: 7,
    configSummary: 'Guidewire, Salesforce, policy mart — full run',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-4',
    entryId: 'plan-p3',
    entryName: 'Mask personal data',
    kind: 'remediation',
    finished: '3 days ago',
    duration: '5 min',
    stagesCompleted: 3,
    stagesTotal: 3,
    records: 12,
    readinessDelta: 0,
    configSummary: 'Broker network columns — dry run',
    outcome: 'succeeded',
    dryRun: true,
    note: 'Dry run — reported what would change; nothing was written.',
  },
  {
    id: 'hist-5',
    entryId: 'structuring-transcripts',
    entryName: 'Transcripts structuring',
    kind: 'structuring',
    finished: '4 h ago',
    duration: '3 min',
    stagesCompleted: 1,
    stagesTotal: 5,
    records: 0,
    readinessDelta: 0,
    configSummary: 'Full scope, 3 sources, personal data masked',
    outcome: 'failed',
    dryRun: false,
    note: 'The diarisation service timed out after Transcribe — no chunks were embedded.',
  },
  {
    id: 'hist-6',
    entryId: 'plan-p4',
    entryName: 'Chunk treaty and contract documents',
    kind: 'remediation',
    finished: '5 days ago',
    duration: '2 h 10 min',
    stagesCompleted: 3,
    stagesTotal: 3,
    records: 22_470,
    readinessDelta: 9,
    configSummary: 'Reinsurance treaty archive — full run',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-7',
    entryId: 'graph-construct',
    entryName: 'Build the topic model',
    kind: 'graph',
    finished: '11 days ago',
    duration: '38 min',
    stagesCompleted: 1,
    stagesTotal: 4,
    records: 0,
    readinessDelta: 0,
    configSummary: 'Whole connected estate, re-fitting the projection and cluster model',
    outcome: 'cancelled',
    dryRun: false,
    note: 'Cancelled after Embed — a re-fit would have rebound every agent, so the operator stopped it to schedule a maintenance window first.',
  },
  // The five remaining structuring entries all run on a schedule (STRUCTURING_SCHEDULE
  // in pipelineCatalogue.ts) — a pipeline that runs every few hours needs a run on
  // record to justify that claim, the same way hist-1 and hist-5 already justify
  // structuring-tables and structuring-transcripts. Their `finished` values are the
  // ones pipelineCatalogue.ts used to hand-author directly; they now derive from here.
  {
    id: 'hist-8',
    entryId: 'structuring-documents',
    entryName: 'Documents structuring',
    kind: 'structuring',
    finished: '50 min ago',
    duration: '19 h',
    stagesCompleted: 4,
    stagesTotal: 4,
    records: 1_300_000,
    readinessDelta: 0,
    configSummary: 'Full scope, 10 sources',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-9',
    entryId: 'structuring-tickets',
    entryName: 'Tickets structuring',
    kind: 'structuring',
    finished: '22 min ago',
    duration: '7 h 30 min',
    stagesCompleted: 4,
    stagesTotal: 4,
    records: 1_600_000,
    readinessDelta: 0,
    configSummary: 'Full scope, 4 sources, personal data masked',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-10',
    entryId: 'structuring-email',
    entryName: 'Email structuring',
    kind: 'structuring',
    finished: '1 h ago',
    duration: '14 h 15 min',
    stagesCompleted: 5,
    stagesTotal: 5,
    records: 4_000_000,
    readinessDelta: 0,
    configSummary: 'Full scope, 4 sources, personal data masked',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-11',
    entryId: 'structuring-images',
    entryName: 'Images structuring',
    kind: 'structuring',
    finished: '6 h ago',
    duration: '20 h 30 min',
    stagesCompleted: 5,
    stagesTotal: 5,
    records: 4_200_000,
    readinessDelta: 0,
    configSummary: 'Full scope, 2 sources, personal data masked',
    outcome: 'succeeded',
    dryRun: false,
  },
  {
    id: 'hist-12',
    entryId: 'structuring-streams',
    entryName: 'Streams structuring',
    kind: 'structuring',
    finished: '12 min ago',
    duration: '7 h 8 min',
    stagesCompleted: 4,
    stagesTotal: 4,
    records: 14_530_000,
    readinessDelta: 0,
    configSummary: 'Full scope, 2 sources',
    outcome: 'succeeded',
    dryRun: false,
  },
]
