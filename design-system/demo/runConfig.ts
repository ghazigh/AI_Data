import type { CatalogueEntry, CatalogueStage } from './data/pipelineCatalogue'
import { SOURCES } from './data/sources'

export type ChunkStrategy = 'clause' | 'fixed' | 'semantic'

export interface RunConfig {
  sourceIds: string[]
  /** Structuring only. */
  redact: boolean
  /** Structuring only. */
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

/** Stage names, across the seven modality pipelines, that mask or strip personal data. */
const REDACTION_STAGE_NAMES = new Set(['Mask', 'Redact'])

/** Re-fitting the topic model takes strictly longer than reusing what is already fit. */
const REFIT_MULTIPLIER = 1.5

const REFIT_STAGE_DEFS: { name: string; detail: string }[] = [
  {
    name: 'Refit projection',
    detail:
      'Re-fits the dimensionality-reduction projection over the full embedded estate, replacing the coordinate space every existing topic binding assumed was fixed.',
  },
  {
    name: 'Refit cluster model',
    detail:
      'Re-fits the cluster model and relabels topics from scratch, replacing the topic boundaries every agent binding depends on.',
  },
]

/** Divides each stage's weight by the sum of all weights, so the list sums back to 1. */
const renormalize = (stages: CatalogueStage[]): CatalogueStage[] => {
  const total = stages.reduce((sum, s) => sum + s.weight, 0)
  if (total <= 0) return stages
  return stages.map(s => ({ ...s, weight: s.weight / total }))
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

  const chunkMultiplier = entry.kind === 'structuring' ? CHUNK_MULTIPLIER[config.chunkStrategy] : 1
  const records = runnable ? Math.round(scopedRecords * chunkMultiplier) : 0

  let stages = entry.stages.map(s => ({ ...s }))
  let minutes = scopedMinutes
  const warnings: string[] = []

  if (entry.kind === 'structuring' && !config.redact) {
    stages = renormalize(stages.filter(s => !REDACTION_STAGE_NAMES.has(s.name)))
    warnings.push('Personal data will reach the index unmasked.')
  }

  if (entry.kind === 'graph' && entry.warnsOnRefit && config.refitModels) {
    const stageMinutes = stages.map(s => s.weight * scopedMinutes)
    const newTotalMinutes = Math.max(scopedMinutes + 1, Math.round(scopedMinutes * REFIT_MULTIPLIER))
    const addedMinutes = newTotalMinutes - scopedMinutes
    const perNewStage = addedMinutes / REFIT_STAGE_DEFS.length
    const rawStages: CatalogueStage[] = [
      ...REFIT_STAGE_DEFS.map(d => ({ name: d.name, detail: d.detail, weight: perNewStage })),
      ...stages.map((s, i) => ({ name: s.name, detail: s.detail, weight: stageMinutes[i] })),
    ]
    stages = renormalize(rawStages)
    minutes = newTotalMinutes
    warnings.push('Re-fitting reshuffles the topic space — rebind every agent bound to a topic after this run.')
  }

  const readinessDelta = config.dryRun ? 0 : entry.readinessDelta ?? 0
  if (config.dryRun) {
    warnings.push('Dry run — nothing will be written.')
  }

  return { records, minutes, stages, warnings, readinessDelta, runnable }
}
