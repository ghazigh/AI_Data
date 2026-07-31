import type { CatalogueEntry } from './pipelineCatalogue'
import { RED_FLAGS } from './readiness'
import { formatNumber, REFIT_WARNING } from '../runConfig'

export type TriggerKind = 'schedule' | 'event' | 'manual'

export interface Trigger {
  /** `${entry.id}:${kind}` — stable across renders, derived from no counter. */
  id: string
  kind: TriggerKind
  label: string
  detail: string
  /** Present when the trigger cannot be switched off. */
  fixed?: boolean
}

const manual = (entry: CatalogueEntry, detail: string): Trigger => ({
  id: `${entry.id}:manual`,
  kind: 'manual',
  label: 'Manual',
  detail,
  fixed: true,
})

/**
 * Every trigger that can start a run of this entry. A structuring pipeline
 * runs on its own cadence and on new records arriving; the graph pipeline
 * that fits the topic model from scratch has no automatic trigger at all —
 * see REFIT_WARNING for why; every other graph or remediation entry fires
 * when the readiness flag it closes is still open, matched by domain against
 * RED_FLAGS. Every entry keeps a fixed manual trigger regardless.
 */
export function triggersFor(entry: CatalogueEntry): Trigger[] {
  if (entry.kind === 'structuring') {
    return [
      { id: `${entry.id}:schedule`, kind: 'schedule', label: entry.schedule!,
        detail: 'Runs on a fixed cadence, whether or not new records arrived.' },
      { id: `${entry.id}:event`, kind: 'event', label: 'When a source in scope reports new records',
        detail: 'Starts a run as soon as any source in scope reports records the pipeline has not structured yet.' },
      manual(entry, 'Start a run by hand from this workspace.'),
    ]
  }

  if (entry.kind === 'graph') {
    if (entry.warnsOnRefit) {
      return [manual(entry, `This pipeline has no automatic trigger. ${REFIT_WARNING}`)]
    }
    return [
      { id: `${entry.id}:event`, kind: 'event', label: 'When a newly connected source finishes structuring',
        detail: 'Folds the new dataset into the graph using the projection and cluster model already fit.' },
      manual(entry, 'Start a run by hand from this workspace.'),
    ]
  }

  const flag = RED_FLAGS.find(f => f.domain === entry.targetDomain)
  return [
    ...(flag
      ? [{ id: `${entry.id}:event`, kind: 'event' as const,
          label: `When readiness flags "${flag.title}"`,
          detail: `${flag.detail} Currently ${formatNumber(flag.count)} ${flag.unit}.` }]
      : []),
    manual(entry, 'Start a run by hand from this workspace.'),
  ]
}
