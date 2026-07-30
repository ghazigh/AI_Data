import type { DomainKey, Modality } from './types'
import { SOURCES } from './sources'
import { MODALITY_PIPELINES, sourcesForModality } from './modalities'
import { GRAPH_PIPELINES } from './graphPipelines'
import { PLAN, type StepKind } from './pipelines'

export type SectionKind = 'structuring' | 'graph' | 'remediation'

export interface CatalogueStage {
  name: string
  detail: string
  /** Share of the run this stage represents, 0–1. Used to drive progress. */
  weight: number
}

export interface CatalogueEntry {
  id: string
  name: string
  kind: SectionKind
  /** One line an operator reads before running it. */
  summary: string
  sourceIds: string[]
  stages: CatalogueStage[]
  /** Records processed at full scope. */
  baselineRecords: number
  /** Minutes at full scope. */
  baselineMinutes: number
  /** Present only on continuous pipelines. */
  schedule?: string
  /** Present only on remediation entries. */
  readinessDelta?: number
  /** Present only on remediation entries. */
  targetDomain?: DomainKey
  /** True for the graph pipeline whose re-fit breaks agent bindings. */
  warnsOnRefit?: boolean
  /** Fixed display string. Never computed from a clock. */
  lastRun: string
}

export interface CatalogueSection {
  kind: SectionKind
  title: string
  /** What kind of thing these are, so an operator reads them correctly. */
  nature: string
  entries: CatalogueEntry[]
}

/**
 * Parses a fixed runtime string such as "~1 h 36 min" into whole minutes.
 * Operates only on strings already present in the pipeline definitions —
 * never reads a clock.
 */
const parseRuntimeMinutes = (runtime: string): number => {
  const hours = /(\d+)\s*h\b/.exec(runtime)
  const minutes = /(\d+)\s*min\b/.exec(runtime)
  return (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0)
}

const chainMinutes = (stages: { runtime: string }[]): number =>
  stages.reduce((sum, s) => sum + parseRuntimeMinutes(s.runtime), 0)

/** Turns any stage chain with a runtime into a weighted catalogue chain. */
const weightedStages = (stages: { name: string; detail: string; runtime: string }[]): CatalogueStage[] => {
  const total = chainMinutes(stages)
  return stages.map(s => ({
    name: s.name,
    detail: s.detail,
    weight: parseRuntimeMinutes(s.runtime) / total,
  }))
}

const connected = () => SOURCES.filter(s => s.status === 'connected')

const sourceIdsForDomain = (domain: DomainKey): string[] =>
  connected()
    .filter(s => s.domains.includes(domain))
    .map(s => s.id)

// ---- Structuring: one entry per modality pipeline, run on a schedule because ----
// ---- documents of every modality keep arriving.                              ----

/**
 * Cadence per modality. Reflects how the data arrives, not just its volume:
 * streams is live telemetry so it runs hourly; document stores — where a
 * batch of files lands rather than a continuous feed — run on a slower,
 * four-hour cadence, as called out in the task brief. The rest sit between
 * the two depending on how continuously each source type produces new
 * records.
 */
const STRUCTURING_SCHEDULE: Record<Modality, string> = {
  streams: 'Runs hourly',
  tickets: 'Runs every 2 hours',
  email: 'Runs every 3 hours',
  documents: 'Runs every 4 hours',
  tables: 'Runs every 6 hours',
  transcripts: 'Runs every 8 hours',
  images: 'Runs every 12 hours',
}

const STRUCTURING_LAST_RUN: Record<Modality, string> = {
  streams: '12 min ago',
  tickets: '22 min ago',
  email: '1 h ago',
  documents: '50 min ago',
  tables: '3 h ago',
  transcripts: '4 h ago',
  images: '6 h ago',
}

const STRUCTURING_SECTION: CatalogueSection = {
  kind: 'structuring',
  title: 'Structuring',
  nature: 'Continuous — documents keep arriving, so these run on a schedule.',
  entries: MODALITY_PIPELINES.map(pipeline => ({
    id: `structuring-${pipeline.modality}`,
    name: `${pipeline.label} structuring`,
    kind: 'structuring',
    summary: pipeline.output,
    sourceIds: sourcesForModality(pipeline.modality).map(s => s.id),
    stages: weightedStages(pipeline.stages),
    baselineRecords: pipeline.volume,
    baselineMinutes: chainMinutes(pipeline.stages),
    schedule: STRUCTURING_SCHEDULE[pipeline.modality],
    lastRun: STRUCTURING_LAST_RUN[pipeline.modality],
  })),
}

// ---- Graph: one entry per graph pipeline. Rare and consequential. ----

const GRAPH_NAME: Record<'construct' | 'extend', string> = {
  construct: 'Build the topic model',
  extend: 'Add a dataset to the graph',
}

const GRAPH_SUMMARY: Record<'construct' | 'extend', string> = {
  construct:
    'Embeds every structured chunk and typed row across the estate, fits the projection and cluster model, and labels the topics that become the knowledge bases.',
  extend:
    "Embeds a source's chunks and rows and places them in the projection and cluster model already fit, joining the topics that already exist.",
}

/**
 * construct reads the whole connected estate — that is what "discover the
 * topics from scratch" means. extend is scoped to a single already-connected
 * source standing in for the next dataset to fold in; the demo has no
 * source that is simultaneously connected (so it can be referenced here)
 * and genuinely unprocessed, so sharepoint-uw-guidelines — the most stale
 * connected source in the estate — is the plausible stand-in.
 */
const GRAPH_SOURCE_IDS: Record<'construct' | 'extend', string[]> = {
  construct: connected().map(s => s.id),
  extend: ['sharepoint-uw-guidelines'],
}

const GRAPH_LAST_RUN: Record<'construct' | 'extend', string> = {
  construct: 'Not re-run since the initial build',
  extend: '6 days ago',
}

const embedCount = (stages: { name: string; count: number }[]): number =>
  stages.find(s => s.name === 'Embed')!.count

const GRAPH_SECTION: CatalogueSection = {
  kind: 'graph',
  title: 'Graph',
  nature: 'Rare and consequential — built once; re-fitting the topic model breaks every agent binding.',
  entries: GRAPH_PIPELINES.map(pipeline => ({
    id: `graph-${pipeline.id}`,
    name: GRAPH_NAME[pipeline.id],
    kind: 'graph',
    summary: GRAPH_SUMMARY[pipeline.id],
    sourceIds: GRAPH_SOURCE_IDS[pipeline.id],
    stages: weightedStages(pipeline.stages),
    baselineRecords: embedCount(pipeline.stages),
    baselineMinutes: chainMinutes(pipeline.stages),
    warnsOnRefit: pipeline.id === 'construct' ? true : undefined,
    lastRun: GRAPH_LAST_RUN[pipeline.id],
  })),
}

// ---- Remediation: one entry per plan step. Each is one-off, closing a single gap. ----

const REMEDIATION_STAGE_WEIGHTS = [0.3, 0.5, 0.2] as const

const REMEDIATION_STAGE_NAMES = ['Scan', 'Apply', 'Verify'] as const

const REMEDIATION_DETAILS: Record<StepKind, [string, string, string]> = {
  resolve: [
    'Scans the cited sources for records that look like the same policyholder',
    'Merges matched records into a single policyholder identity',
    'Confirms no orphaned references remain after the merge',
  ],
  type: [
    'Scans the target columns for their current, unlabelled type',
    'Labels each column with the semantic type agents can reason about',
    'Confirms every labelled column resolves against its source schema',
  ],
  mask: [
    'Scans for columns holding personal data',
    'Hashes and redacts the personal columns at serving time',
    'Confirms no unmasked personal data reaches the served view',
  ],
  chunk: [
    'Scans the target documents for clause boundaries',
    'Splits each document into clause-level chunks',
    'Confirms every chunk retrieves by clause rather than by file',
  ],
  embed: [
    'Scans for records not yet in the vector index',
    'Embeds each record for similarity search',
    'Confirms every record is retrievable by similarity query',
  ],
  normalise: [
    'Scans file names for inconsistent naming',
    'Renames files to the convention the ontology expects',
    'Confirms every renamed file binds to its submission',
  ],
}

const REMEDIATION_SECTION: CatalogueSection = {
  kind: 'remediation',
  title: 'Remediation',
  nature: 'One-off — each entry exists because the readiness score asked for it.',
  entries: PLAN.map(step => ({
    id: `plan-${step.id}`,
    name: step.title,
    kind: 'remediation',
    summary: step.detail,
    sourceIds: sourceIdsForDomain(step.domain),
    stages: REMEDIATION_STAGE_NAMES.map((name, i) => ({
      name,
      detail: REMEDIATION_DETAILS[step.kind][i],
      weight: REMEDIATION_STAGE_WEIGHTS[i],
    })),
    baselineRecords: step.count,
    baselineMinutes: parseRuntimeMinutes(step.runtime),
    readinessDelta: step.delta,
    targetDomain: step.domain,
    lastRun: 'Not yet run',
  })),
}

export const CATALOGUE_SECTIONS: CatalogueSection[] = [
  STRUCTURING_SECTION,
  GRAPH_SECTION,
  REMEDIATION_SECTION,
]

export const allEntries = (): CatalogueEntry[] => CATALOGUE_SECTIONS.flatMap(s => s.entries)

export const entryById = (id: string): CatalogueEntry | undefined =>
  allEntries().find(e => e.id === id)
