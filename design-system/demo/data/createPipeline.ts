import type { CatalogueEntry, CatalogueStage, SectionKind } from './pipelineCatalogue'
import { allEntries, CATALOGUE_SECTIONS, scheduleFor } from './pipelineCatalogue'
import { SOURCES } from './sources'

export interface PipelineDraft {
  name: string
  kind: SectionKind
  sourceIds: string[]
  stageNames: string[]
}

const entriesOfKind = (kind: SectionKind): CatalogueEntry[] => allEntries().filter(e => e.kind === kind)

const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

/**
 * Records per minute a kind's catalogue entries actually achieve, at the
 * median — the basis for projecting a new pipeline's runtime from nothing but
 * the record volume of the sources it was given. Every catalogue entry has a
 * positive baselineRecords and baselineMinutes, so this is never a division
 * by zero for the three real kinds.
 */
const throughputFor = (kind: SectionKind): number =>
  median(entriesOfKind(kind).map(e => e.baselineRecords / e.baselineMinutes))

/** Stage names offered for `kind`, the union across its catalogue entries, in
 * first-appearance order (allEntries() itself is already authored in a fixed,
 * meaningful order — modality, then graph pipeline, then plan step). */
export const stageOptionsFor = (kind: SectionKind): string[] => {
  const seen: string[] = []
  for (const entry of entriesOfKind(kind)) {
    for (const stage of entry.stages) {
      if (!seen.includes(stage.name)) seen.push(stage.name)
    }
  }
  return seen
}

/** The most common chain for `kind` — literally that kind's first catalogue
 * entry's own stage chain — preselected in the dialog. */
export const defaultStagesFor = (kind: SectionKind): string[] => {
  const first = entriesOfKind(kind)[0]
  return first ? first.stages.map(s => s.name) : []
}

/** The first detail line `kind`'s catalogue carries for a stage name, in the
 * same first-appearance order stageOptionsFor uses — real, already-authored
 * copy, never a paraphrase invented for the created entry. */
const detailFor = (kind: SectionKind, name: string): string => {
  for (const entry of entriesOfKind(kind)) {
    const stage = entry.stages.find(s => s.name === name)
    if (stage) return stage.detail
  }
  return 'Runs as part of this pipeline.'
}

/** Mean weight of a named stage across `kind`'s entries that carry it, or
 * undefined when none do (stageOptionsFor never offers such a name, but
 * buildEntry does not assume its caller only ever passes an offered name). */
const meanWeightFor = (kind: SectionKind, name: string): number | undefined => {
  const found = entriesOfKind(kind).flatMap(e => e.stages.filter(s => s.name === name).map(s => s.weight))
  if (found.length === 0) return undefined
  return found.reduce((sum, w) => sum + w, 0) / found.length
}

/** Divides each stage's weight by the sum of all weights, so the list sums to 1. */
const renormalize = (stages: CatalogueStage[]): CatalogueStage[] => {
  const total = stages.reduce((sum, s) => sum + s.weight, 0)
  if (total <= 0) return stages
  return stages.map(s => ({ ...s, weight: s.weight / total }))
}

const buildStages = (kind: SectionKind, names: string[]): CatalogueStage[] => {
  const raw = names.map(name => ({
    name,
    detail: detailFor(kind, name),
    // A name with no catalogue precedent at all (should never happen through
    // the dialog, which only ever offers stageOptionsFor(kind)) falls back to
    // an equal share, per the spec — renormalize below still applies.
    weight: meanWeightFor(kind, name) ?? 1 / Math.max(1, names.length),
  }))
  return renormalize(raw)
}

/**
 * Turns a validated draft into a real catalogue-shaped entry. Every derived
 * number traces back to data already in the demo — see throughputFor,
 * buildStages and scheduleFor above — nothing here is an invented constant.
 */
export const buildEntry = (draft: PipelineDraft, id: string): CatalogueEntry => {
  const baselineRecords = draft.sourceIds.reduce(
    (sum, sourceId) => sum + (SOURCES.find(s => s.id === sourceId)?.records ?? 0),
    0
  )
  const baselineMinutes = Math.max(1, Math.round(baselineRecords / throughputFor(draft.kind)))

  return {
    id,
    name: draft.name,
    kind: draft.kind,
    // The section's own already-authored "nature" line — real copy that
    // already describes what a pipeline of this kind is, not a new sentence
    // invented per created instance.
    summary: CATALOGUE_SECTIONS.find(s => s.kind === draft.kind)!.nature,
    sourceIds: draft.sourceIds,
    stages: buildStages(draft.kind, draft.stageNames),
    baselineRecords,
    baselineMinutes,
    schedule: draft.kind === 'structuring' ? scheduleFor(baselineMinutes) : undefined,
    lastRun: 'Not yet run',
  }
}
