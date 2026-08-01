import type { ExecutionStatus } from './executions'

/** How many runs a row's sparkline shows. */
export const HISTORY_LENGTH = 13

/**
 * FNV-1a over the pipeline id — the same hash the execution ids use. Every
 * number below is derived from it rather than stored, so a pipeline's history is
 * identical on the server, after hydration, and across a rebuild, without
 * carrying 15 hand-written arrays in the repo.
 */
const seedFor = (id: string): number => {
  let hash = 0x811c9dc5
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash
}

/** Lehmer generator — one multiply per step, and no shared mutable state. */
const next = (seed: number): number => (Math.imul(seed, 48271) >>> 0) % 0x7fffffff

/**
 * Per-run success percentage for the last {@link HISTORY_LENGTH} runs, oldest
 * first. Healthy pipelines sit in a tight band near the top; a pipeline whose
 * latest run failed visibly falls away at the end, which is what makes the
 * sparkline worth reading rather than decorative.
 *
 * Returns an empty series for a pipeline that has never run — the sparkline
 * renders its own empty rule for that, rather than inventing a flat line.
 */
export const runHistorySeries = (entryId: string, status: ExecutionStatus): number[] => {
  if (status === 'none') return []

  let seed = seedFor(entryId)
  const base = 94 + (seed % 5) // 94–98, stable per pipeline
  const series: number[] = []

  for (let i = 0; i < HISTORY_LENGTH; i++) {
    seed = next(seed)
    // ±3 around the pipeline's own baseline, clamped to a believable ceiling.
    series.push(Math.min(100, Math.max(80, base + ((seed % 7) - 3))))
  }

  if (status === 'failed') {
    // The last three runs degrade into the failure rather than dropping off a
    // cliff — a pipeline that fails has usually been getting worse.
    series[HISTORY_LENGTH - 3] = base - 8
    series[HISTORY_LENGTH - 2] = base - 16
    series[HISTORY_LENGTH - 1] = base - 27
  }

  return series
}

/** The 30-day success rate quoted beside the sparkline, to one decimal. Derived
 * from the same series so the number and the drawing can never disagree. */
export const successRate = (entryId: string, status: ExecutionStatus): number | null => {
  const series = runHistorySeries(entryId, status)
  if (series.length === 0) return null
  const mean = series.reduce((a, b) => a + b, 0) / series.length
  return Math.round(mean * 10) / 10
}
