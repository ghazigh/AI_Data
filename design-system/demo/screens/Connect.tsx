import { useEffect, useRef, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { DataTable, type Column } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import { Meter } from '../components/telemetry/Meter'
import { StatusPill, sourceStatusPill } from '../components/StatusPill'
import { SourceDrawer } from '../components/SourceDrawer'
import { ConnectDialog } from '../components/ConnectDialog'
import { useDemoState } from '../state'
import type { Source } from '../data/types'
import type { CatalogueEntry } from '../data/sources'

const MODALITIES = ['tables', 'documents', 'tickets', 'email', 'transcripts', 'images', 'streams']
const CATEGORIES = ['warehouse', 'oltp', 'saas', 'object-store', 'stream']

/** True for a sync old enough to be a problem rather than a fact. The demo's
 * sync labels are fixed display strings, so this reads the string rather than
 * a clock — same reason nothing else here computes a date. */
const isStale = (lastSync: string): boolean =>
  /\bdays? ago\b/.test(lastSync) && (Number(lastSync.match(/^(\d+)/)?.[1] ?? 0) >= 7)

export function Connect() {
  const { sources, connectSource, settleSource } = useDemoState()
  const [search, setSearch] = useState('')
  const [modality, setModality] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [selected, setSelected] = useState<Source | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const onConnect = (entry: CatalogueEntry) => {
    connectSource({
      id: entry.id, name: entry.name, vendor: entry.vendor, category: entry.category,
      // Every unknown field reads as an em dash while scanning, matching how the
      // records and readiness columns render. "Just now" would contradict the
      // Scanning pill beside it — and collides with the test's findByText(/scanning/i).
      modalities: entry.modalities, records: 0, lastSync: '—', readiness: 0,
      primaryDomain: entry.primaryDomain, domains: [entry.primaryDomain], status: 'scanning',
    })
    timers.current.push(setTimeout(() => settleSource(entry.id, entry.readiness, entry.records), 2200))
  }

  const connectedIds = new Set(sources.map(s => s.id))

  const rows = sources.filter(s =>
    `${s.name} ${s.vendor} ${s.category}`.toLowerCase().includes(search.toLowerCase())
    && (!modality || s.modalities.includes(modality as never))
    && (!category || s.category === category))

  const columns: Column<Source>[] = [
    { key: 'name', header: 'Source', sortValue: s => s.name,
      render: s => <button type="button" onClick={() => setSelected(s)}>{s.name}</button> },
    { key: 'modalities', header: 'Modalities', render: s => <span className="dm-muted">{s.modalities.join(' · ')}</span> },
    { key: 'records', header: 'Records', align: 'end', sortValue: s => s.records,
      render: s => (s.records ? s.records.toLocaleString('en-US') : '—') },
    {
      key: 'lastSync',
      header: 'Last sync',
      // A source last synced 21 days ago is the reason a domain's freshness is
      // dragging; "21 days ago" in the same grey as "4 min ago" hides that.
      render: s => <span className={isStale(s.lastSync) ? 'dm-stale' : 'dm-muted'}>{s.lastSync}</span>,
    },
    {
      key: 'readiness',
      header: 'Readiness',
      align: 'end',
      sortValue: s => s.readiness,
      render: s => (s.readiness
        ? (
          <span className="dm-cell-meter">
            <Meter value={s.readiness} target={70} tone={s.readiness < 70 ? 'under' : 'default'} />
            <b>{s.readiness}</b>
          </span>
        )
        : '—'),
    },
    { key: 'status', header: 'Status', render: s => <StatusPill {...sourceStatusPill(s.status)} /> },
  ]

  return (
    <>
      <PageHead
        eyebrow="Stage 01 — Connect"
        title="Every system you run, read-only"
        actions={<button className="dm-btn is-ink" type="button" onClick={() => setDialogOpen(true)}>Connect a source</button>}
      />
      <FilterBar
        search={search} onSearch={setSearch} placeholder="Search sources…"
        groups={[
          { key: 'modality', label: 'Modality', options: MODALITIES, selected: modality, onSelect: setModality },
          { key: 'category', label: 'Category', options: CATEGORIES, selected: category, onSelect: setCategory },
        ]}
      />
      <div className="dm-panel">
        <DataTable
          caption="Sources in the estate"
          columns={columns}
          rows={rows}
          rowKey={s => s.id}
          initialSort={{ key: 'name', dir: 'asc' }}
        />
      </div>
      <SourceDrawer source={selected} onClose={() => setSelected(null)} />
      <ConnectDialog
        open={dialogOpen} onClose={() => setDialogOpen(false)} onConnect={onConnect}
        connectedIds={connectedIds}
      />
    </>
  )
}
