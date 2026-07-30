import { useState } from 'react'
import { Panel } from './Panel'
import { DataTable, type Column } from './DataTable'
import { ConfigureRunDrawer } from './ConfigureRunDrawer'
import type { CatalogueEntry, CatalogueSection as CatalogueSectionData } from '../data/pipelineCatalogue'
import { REFIT_WARNING } from '../runConfig'

/**
 * Minutes -> a short display string, consistent with the tilde-estimated
 * runtimes already used across the modality and graph pipelines
 * ("~1 h 36 min", "~48 min"). Exported so ConfigureRunDrawer's live
 * projection reads the same format as this section's own columns.
 */
export const formatMinutes = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `~${m} min`
  if (m === 0) return `~${h} h`
  return `~${h} h ${m} min`
}

const pluralize = (n: number, word: string): string => `${n} ${word}${n === 1 ? '' : 's'}`

export function CatalogueSection({ section }: { section: CatalogueSectionData }) {
  // Local to this component instance, so two rendered sections can never
  // share a selection — running a scheduled structuring job alongside a
  // one-off repair is not a coherent action.
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const baseColumns: Column<CatalogueEntry>[] = [
    {
      key: 'select',
      header: 'Select',
      render: e => (
        <input
          type="checkbox"
          checked={selected.has(e.id)}
          onChange={() => toggle(e.id)}
          aria-label={`Select ${e.name}`}
        />
      ),
    },
    {
      key: 'name',
      header: 'Pipeline',
      sortValue: e => e.name,
      render: e => (
        <div>
          <p className="dm-plan-t">{e.name}</p>
          <p className="dm-plan-d">{e.summary}</p>
        </div>
      ),
    },
    {
      key: 'sources',
      header: 'Sources',
      align: 'end',
      sortValue: e => e.sourceIds.length,
      render: e => pluralize(e.sourceIds.length, 'source'),
    },
    {
      key: 'records',
      header: 'Records',
      align: 'end',
      sortValue: e => e.baselineRecords,
      render: e => e.baselineRecords.toLocaleString('en-US'),
    },
  ]

  // Structuring shows when it next runs; remediation shows what running it
  // buys back. Graph gets neither column — its own standing warning below
  // carries the one thing that matters before selecting a row.
  const kindColumn: Column<CatalogueEntry> | null =
    section.kind === 'structuring'
      ? { key: 'schedule', header: 'Schedule', render: e => e.schedule ?? '—' }
      : section.kind === 'remediation'
      ? {
          key: 'delta',
          header: 'Readiness delta',
          align: 'end',
          sortValue: e => e.readinessDelta ?? 0,
          render: e => `+${e.readinessDelta ?? 0}`,
        }
      : null

  const lastRunColumn: Column<CatalogueEntry> = { key: 'lastRun', header: 'Last run', render: e => e.lastRun }
  const columns = kindColumn ? [...baseColumns, kindColumn, lastRunColumn] : [...baseColumns, lastRunColumn]

  const selectedEntries = section.entries.filter(e => selected.has(e.id))
  // Only graph-construct carries this today, but the check stays general —
  // any entry the catalogue ever marks warnsOnRefit surfaces here.
  const refitEntries = section.entries.filter(e => e.warnsOnRefit)

  return (
    <Panel title={section.title}>
      <p className="dm-gpipe-lead">{section.nature}</p>

      {refitEntries.length > 0 && (
        <div className="dm-blocked">
          <p className="dm-eyebrow">Re-fit warning</p>
          {/* Reuse is the default in the configure drawer, so this stands before
              anything is selected — the lead-in makes that conditional explicit
              rather than reading as if a run were already underway. Quotes
              runConfig's REFIT_WARNING verbatim after that — the drawer's own
              live warning renders the same string via projectRun, so the two
              surfaces can never state this consequence two different ways. */}
          <p>
            {refitEntries.map(e => e.name).join(', ')} defaults to reusing the fitted models. Choosing to re-fit
            from scratch instead: {REFIT_WARNING}
          </p>
        </div>
      )}

      {selectedEntries.length > 0 && (
        <div className="dm-cat-actions">
          <button type="button" className="dm-btn is-ink" onClick={() => setDrawerOpen(true)}>
            {`Configure and run ${pluralize(selectedEntries.length, 'pipeline')}`}
          </button>
        </div>
      )}

      <DataTable caption={section.title} columns={columns} rows={section.entries} rowKey={e => e.id} />

      {drawerOpen && selectedEntries.length > 0 && (
        <ConfigureRunDrawer
          entries={selectedEntries}
          // Dismissing (×, Escape, scrim) only closes the drawer — an operator
          // backing out of a review should still find their rows selected.
          // Only a completed run clears the selection, since that's the one
          // path where re-offering the same rows to configure again would be
          // wrong.
          onCancel={() => setDrawerOpen(false)}
          onRun={() => {
            setDrawerOpen(false)
            setSelected(new Set())
          }}
        />
      )}
    </Panel>
  )
}
