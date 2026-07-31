import type { CatalogueEntry, CatalogueStage } from './data/pipelineCatalogue'
import { parseRuntimeMinutes } from './data/pipelineCatalogue'
import { SOURCES } from './data/sources'
import { GRAPH_PIPELINES } from './data/graphPipelines'

export type ChunkStrategy = 'clause' | 'fixed' | 'semantic'

/**
 * Minutes -> a short display string, consistent with the tilde-estimated
 * runtimes already used across the modality and graph pipelines
 * ("~1 h 36 min", "~48 min"). Lives here, not beside a single screen, because
 * both the pipeline table's history-derived labels and the run history
 * drawer read it.
 */
export const formatMinutes = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `~${m} min`
  if (m === 0) return `~${h} h`
  return `~${h} h ${m} min`
}

/**
 * A record count -> a grouped display string. Lives beside formatMinutes for the
 * same reason: a projected volume is quoted in the pipeline chain, in a
 * component's own panel and in the run history, and all three must group the
 * digits identically. The locale is pinned so the server and the client never
 * disagree about the separator.
 */
export const formatNumber = (count: number): string => count.toLocaleString('en-US')

export interface RunConfig {
  sourceIds: string[]
  /** Structuring only, and only where the chain has a masking or redaction stage. */
  redact: boolean
  /** Structuring only, and only where the chain has a Chunk stage. */
  chunkStrategy: ChunkStrategy
  /** Graph only. Fitting new models reshuffles the topic space. */
  refitModels: boolean
  /** Remediation only. Reports what would change without claiming a delta. */
  dryRun: boolean
}

export interface RunProjection {
  records: number
  minutes: number
  stages: CatalogueStage[]
  warnings: string[]
  readinessDelta: number
  runnable: boolean
}

/** Records a source contributes, so scope can be weighted by real volume rather than by count of sources. */
const recordsForSource = (id: string): number => SOURCES.find(s => s.id === id)?.records ?? 0

/** Fraction of an entry's total source-weighted volume that the selected scope keeps. */
const scopeFraction = (entry: CatalogueEntry, selectedIds: string[]): number => {
  const total = entry.sourceIds.reduce((sum, id) => sum + recordsForSource(id), 0)
  if (total === 0) return 0
  const selected = new Set(selectedIds)
  const kept = entry.sourceIds
    .filter(id => selected.has(id))
    .reduce((sum, id) => sum + recordsForSource(id), 0)
  return kept / total
}

/** clause is the structuring baseline; fixed yields more, smaller chunks; semantic fewer, larger ones. */
const CHUNK_MULTIPLIER: Record<ChunkStrategy, number> = {
  clause: 1,
  fixed: 1.4,
  semantic: 0.65,
}

/** Stage names, across the seven modality pipelines, that mask or strip personal data.
 * Exported so the UI that offers the masking toggle decides which component owns it
 * from this same set, rather than from a second hand-written copy of these names. */
export const REDACTION_STAGE_NAMES = new Set(['Mask', 'Redact'])

/** True only where the chain actually has a stage that removes personal data — the UI should
 * offer the redact toggle only here; elsewhere it would be a control that does nothing. */
export const supportsRedaction = (entry: CatalogueEntry): boolean =>
  entry.kind === 'structuring' && entry.stages.some(s => REDACTION_STAGE_NAMES.has(s.name))

/** True only where the chain has a genuine chunking stage — tables and streams publish typed
 * schema and never chunk, so the chunk-strategy control does not apply to them. */
export const supportsChunkStrategy = (entry: CatalogueEntry): boolean =>
  entry.kind === 'structuring' && entry.stages.some(s => s.name === 'Chunk')

/** Divides each stage's weight by the sum of all weights, so the list sums back to 1. */
const renormalize = (stages: CatalogueStage[]): CatalogueStage[] => {
  const total = stages.reduce((sum, s) => sum + s.weight, 0)
  if (total <= 0) return stages
  return stages.map(s => ({ ...s, weight: s.weight / total }))
}

/**
 * The graph's own 'extend' pipeline already applies the models that 'construct' fits from
 * scratch: 'Project' applies the UMAP projection 'Reduce dimensions' fits, and 'Assign' applies
 * the HDBSCAN cluster model 'Cluster' fits. Comparing extend's applying-stage runtime to
 * construct's fitting-stage runtime for the same artefact gives the real cost of applying
 * relative to fitting, derived from the catalogue data rather than an invented multiplier.
 */
const constructPipeline = GRAPH_PIPELINES.find(p => p.id === 'construct')!
const extendPipeline = GRAPH_PIPELINES.find(p => p.id === 'extend')!

const stageRuntimeMinutes = (pipeline: typeof constructPipeline, stageName: string): number =>
  parseRuntimeMinutes(pipeline.stages.find(s => s.name === stageName)!.runtime)

/** ~14 min (extend's Project) / ~5 h (construct's Reduce dimensions) — applying the already-fit
 * projection costs a small fraction of fitting it. */
const PROJECT_APPLY_RATIO =
  stageRuntimeMinutes(extendPipeline, 'Project') / stageRuntimeMinutes(constructPipeline, 'Reduce dimensions')

/** ~9 min (extend's Assign) / ~3 h (construct's Cluster) — same relationship for the cluster model. */
const ASSIGN_APPLY_RATIO =
  stageRuntimeMinutes(extendPipeline, 'Assign') / stageRuntimeMinutes(constructPipeline, 'Cluster')

/** Reusing the existing topic labels is a lookup, not a fit — near-zero and does not scale with volume. */
const REUSE_LABELS_MINUTES = 1

// Exported so any UI that states this consequence ahead of the drawer — the
// catalogue section's standing warning, for one — quotes this exact string
// rather than a separately-authored paraphrase that could drift from it.
export const REFIT_WARNING =
  'Re-fitting reshuffles the topic space — rebind every agent bound to a topic after this run.'

/**
 * Substitutes each of a from-scratch construction's fitting stages for its cheaper applying
 * equivalent, using ratios derived from the graph's own 'extend' pipeline. Embed is unchanged —
 * you embed either way. Returns the substituted, renormalised stages and their total minutes.
 */
const reuseFittedModels = (entry: CatalogueEntry, scopedMinutes: number): { stages: CatalogueStage[]; minutes: number } => {
  const rawStages: CatalogueStage[] = entry.stages.map(s => {
    const ownMinutes = s.weight * scopedMinutes
    if (s.name === 'Reduce dimensions') {
      return {
        name: 'Project',
        detail:
          'Transforms the estate through the projection already fit at construction time — no new fit, just placing points in the existing coordinate space.',
        weight: ownMinutes * PROJECT_APPLY_RATIO,
      }
    }
    if (s.name === 'Cluster') {
      return {
        name: 'Assign',
        detail:
          'Scores each point against the cluster model already fit; points that fall inside a known dense region join that topic.',
        weight: ownMinutes * ASSIGN_APPLY_RATIO,
      }
    }
    if (s.name === 'Define topics') {
      return {
        name: 'Reuse topic labels',
        detail: 'The existing topic labels carry over unchanged — nothing new to name.',
        weight: REUSE_LABELS_MINUTES,
      }
    }
    return { name: s.name, detail: s.detail, weight: ownMinutes }
  })
  const minutes = Math.max(1, Math.round(rawStages.reduce((sum, s) => sum + s.weight, 0)))
  return { stages: renormalize(rawStages), minutes }
}

export function defaultConfigFor(entry: CatalogueEntry): RunConfig {
  return {
    sourceIds: [...entry.sourceIds],
    redact: true,
    chunkStrategy: 'clause',
    refitModels: false,
    dryRun: false,
  }
}

export function projectRun(entry: CatalogueEntry, config: RunConfig): RunProjection {
  const fraction = scopeFraction(entry, config.sourceIds)
  const runnable = fraction > 0

  const scopedRecords = runnable ? Math.round(entry.baselineRecords * fraction) : 0
  const scopedMinutes = runnable ? Math.max(1, Math.round(entry.baselineMinutes * fraction)) : 0

  const chunkMultiplier = supportsChunkStrategy(entry) ? CHUNK_MULTIPLIER[config.chunkStrategy] : 1
  const records = runnable ? Math.round(scopedRecords * chunkMultiplier) : 0

  let stages = entry.stages.map(s => ({ ...s }))
  let minutes = scopedMinutes
  const warnings: string[] = []

  if (supportsRedaction(entry) && !config.redact) {
    stages = renormalize(stages.filter(s => !REDACTION_STAGE_NAMES.has(s.name)))
    warnings.push('Personal data will reach the index unmasked.')
  }

  if (entry.kind === 'graph' && entry.warnsOnRefit) {
    if (config.refitModels) {
      // The entry's own baseline already is a from-scratch fit — this is that baseline, unchanged.
      minutes = scopedMinutes
      warnings.push(REFIT_WARNING)
    } else {
      const reused = reuseFittedModels(entry, scopedMinutes)
      stages = reused.stages
      minutes = reused.minutes
    }
  }

  const isDryRun = entry.kind === 'remediation' && config.dryRun
  const readinessDelta = isDryRun ? 0 : entry.readinessDelta ?? 0
  if (isDryRun) {
    warnings.push('Dry run — nothing will be written.')
  }

  return { records, minutes, stages, warnings, readinessDelta, runnable }
}
