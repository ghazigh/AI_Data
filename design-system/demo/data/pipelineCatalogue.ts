import type { DomainKey } from './types'
import { SOURCES } from './sources'
import { MODALITY_PIPELINES, sourcesForModality } from './modalities'
import { GRAPH_PIPELINES } from './graphPipelines'
import { PLAN, type StepKind } from './pipelines'
import { RUN_HISTORY } from './runHistory'

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
export const parseRuntimeMinutes = (runtime: string): number => {
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

/**
 * lastRun is derived, never hand-authored: the `finished` value of this entry's
 * most recent RUN_HISTORY record — successful, failed or cancelled, since "last
 * run" means the last time the pipeline ran, not just the last time it succeeded
 * — or 'Not yet run' when no record exists. RUN_HISTORY carries at most one
 * record per entryId today (guarded in integrity.test.ts); if that ever changes,
 * this takes the first match in array order.
 */
const lastRunFor = (entryId: string): string =>
  RUN_HISTORY.find(h => h.entryId === entryId)?.finished ?? 'Not yet run'

// ---- Structuring: one entry per modality pipeline, run on a schedule because ----
// ---- documents of every modality keep arriving.                              ----

/**
 * A fixed set of common scheduling cadences, in hours. scheduleFor picks the
 * smallest one strictly longer than the pipeline's own baseline runtime — a
 * schedule that could fire again before the current run finishes would mean
 * the pipeline is effectively always running, which contradicts a catalogue
 * row that also states a finished 'last run' some minutes or hours ago.
 */
const SCHEDULE_CANDIDATE_HOURS = [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 36, 48, 72] as const

const scheduleLabel = (hours: number): string => {
  if (hours === 1) return 'Runs hourly'
  if (hours === 24) return 'Runs daily'
  if (hours % 24 === 0) return `Runs every ${hours / 24} days`
  return `Runs every ${hours} hours`
}

/**
 * Cadence derived from the pipeline's own baseline runtime, never hand-typed —
 * see SCHEDULE_CANDIDATE_HOURS above for why "longer than the runtime" is the
 * rule. Guarded in integrity.test.ts. Exported so data/createPipeline.ts gives
 * a session-created structuring pipeline the same real cadence rule rather
 * than a second, hand-authored copy of this table.
 */
export const scheduleFor = (baselineMinutes: number): string => {
  const hours =
    SCHEDULE_CANDIDATE_HOURS.find(h => h * 60 > baselineMinutes) ??
    SCHEDULE_CANDIDATE_HOURS[SCHEDULE_CANDIDATE_HOURS.length - 1]
  return scheduleLabel(hours)
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
    schedule: scheduleFor(chainMinutes(pipeline.stages)),
    lastRun: lastRunFor(`structuring-${pipeline.modality}`),
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
    // graph-construct's only history record (hist-7) is a *cancelled* re-fit —
    // under the lastRunFor rule above that reads as that run's own timestamp
    // ("11 days ago"), which is accurate: it is the last time this pipeline ran,
    // cancellation and all. No bespoke "not re-run since the initial build"
    // prose lives here anymore; RUN_HISTORY is the only source of truth.
    lastRun: lastRunFor(`graph-${pipeline.id}`),
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
    // Half the plan has already been run (see RUN_HISTORY's plan-p1/p3/p4
    // records) and half hasn't — that split is the honest state of the plan,
    // not something to paper over with a blanket 'Not yet run'.
    lastRun: lastRunFor(`plan-${step.id}`),
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
