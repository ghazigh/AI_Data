import { useEffect, useRef, useState } from 'react'
import { PageHead } from '../components/PageHead'
import { DataTable, type Column } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import { Meter } from '../components/telemetry/Meter'
import { StatusPill, sourceStatusPill } from '../components/StatusPill'
import { SourceDrawer } from '../components/SourceDrawer'
import { ConnectDialog } from '../components/ConnectDialog'
import { VendorMark } from '../components/VendorMark'
import { Icon, MODALITY_ICON } from '../components/Icon'
import { useToast } from '../components/Toast'
import { useDemoState } from '../state'
import type { Modality, Source } from '../data/types'
import type { CatalogueEntry } from '../data/sources'

const MODALITIES: Modality[] = ['tables', 'documents', 'tickets', 'email', 'transcripts', 'images', 'streams']
const CATEGORIES = ['warehouse', 'oltp', 'saas', 'object-store', 'stream']

/** True for a sync old enough to be a problem rather than a fact. The demo's
 * sync labels are fixed display strings, so this reads the string rather than
 * a clock — same reason nothing else here computes a date. */
const isStale = (lastSync: string): boolean =>
  /\bdays? ago\b/.test(lastSync) && (Number(lastSync.match(/^(\d+)/)?.[1] ?? 0) >= 7)

/** 48,312,000 → "48.3M"; 918,400 → "918K". */
export const compact = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${Math.round(n / 1_000)}K` : String(n)

export function Connect() {
  const { sources, connectSource, settleSource } = useDemoState()
  const toast = useToast()
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
      // records and readiness columns render.
      modalities: entry.modalities, records: 0, lastSync: '—', readiness: 0,
      primaryDomain: entry.primaryDomain, domains: [entry.primaryDomain], status: 'scanning',
    })
    toast({ title: `Scanning ${entry.name}`, detail: 'Read-only credentials accepted. Profiling schema, freshness and governance coverage…', tone: 'info' })
    timers.current.push(setTimeout(() => {
      settleSource(entry.id, entry.readiness, entry.records)
      toast({ title: `${entry.name} is live`, detail: `${entry.records.toLocaleString('en-US')} records indexed · readiness ${entry.readiness}` })
    }, 2200))
  }

  const connectedIds = new Set(sources.map(s => s.id))

  // The summary row — derived from session state, so a source connected a
  // moment ago is already counted. "Pending credentials", not the pill's own
  // wording, so the count of pills stays the count of rows.
  const connected = sources.filter(s => s.status === 'connected')
  const scanning = sources.filter(s => s.status === 'scanning').length
  const pending = sources.filter(s => s.status === 'pending-credentials').length
  const records = connected.reduce((sum, s) => sum + s.records, 0)
  const covered = new Set(connected.flatMap(s => s.modalities))
  const vendors = new Set(connected.map(s => s.vendor)).size

  const rows = sources.filter(s =>
    `${s.name} ${s.vendor} ${s.category}`.toLowerCase().includes(search.toLowerCase())
    && (!modality || s.modalities.includes(modality as never))
    && (!category || s.category === category))

  const columns: Column<Source>[] = [
    { key: 'name', header: 'Source', sortValue: s => s.name,
      render: s => (
        <span className="dm-cell-lead">
          <VendorMark name={s.vendor} />
          <span>
            <button type="button" onClick={() => setSelected(s)}>{s.name}</button>
            <span className="dm-cell-vendor">{s.vendor} · {s.category}</span>
          </span>
        </span>
      ) },
    { key: 'modalities', header: 'Modalities', render: s => (
      <span className="dm-modchips">
        {s.modalities.map(m => <span className="dm-tag" key={m}><Icon name={MODALITY_ICON[m]} size={11} />{m}</span>)}
      </span>
    ) },
    { key: 'records', header: 'Records', align: 'end', sortValue: s => s.records,
      render: s => (s.records ? s.records.toLocaleString('en-US') : '—') },
    {
      key: 'lastSync',
      header: 'Last sync',
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
        lead="Credentials in, estate mapped. Datalith profiles each system, scores it and keeps it fresh — nothing is written back and nothing leaves the estate."
        actions={
          <button className="dm-btn is-ink" type="button" onClick={() => setDialogOpen(true)}>
            <Icon name="plug" size={15} /> Connect a source
          </button>
        }
      />

      <div className="dm-tiles is-5 is-lead">
        <div className="dm-tile is-ok">
          <div className="dm-tile-head"><p className="dm-eyebrow">Connected</p><span className="dm-tile-ic"><Icon name="check" size={14} /></span></div>
          <p className="dm-tile-v">{connected.length}<small>systems</small></p>
          <p className="dm-tile-sub">{vendors} vendors, one footprint</p>
        </div>
        <div className={`dm-tile${scanning > 0 ? ' is-accent' : ''}`}>
          <div className="dm-tile-head"><p className="dm-eyebrow">Profiling</p><span className="dm-tile-ic"><Icon name="refresh" size={14} /></span></div>
          <p className="dm-tile-v">{scanning}</p>
          <p className="dm-tile-sub">{scanning > 0 ? 'In flight — settles in seconds' : 'Nothing in flight right now'}</p>
        </div>
        <div className={`dm-tile${pending > 0 ? ' is-warn' : ''}`}>
          <div className="dm-tile-head"><p className="dm-eyebrow">Pending credentials</p><span className="dm-tile-ic"><Icon name="lock" size={14} /></span></div>
          <p className="dm-tile-v">{pending}</p>
          <p className="dm-tile-sub">Unscored until a key arrives</p>
        </div>
        <div className="dm-tile">
          <div className="dm-tile-head"><p className="dm-eyebrow">Records indexed</p><span className="dm-tile-ic"><Icon name="database" size={14} /></span></div>
          <p className="dm-tile-v">{compact(records)}</p>
          <p className="dm-tile-sub">Across every connected system</p>
        </div>
        <div className="dm-tile">
          <div className="dm-tile-head"><p className="dm-eyebrow">Modalities</p><span className="dm-tile-ic"><Icon name="layers" size={14} /></span></div>
          <p className="dm-tile-v">{covered.size}<small>/ {MODALITIES.length}</small></p>
          <div className="dm-tile-foot">
            {MODALITIES.map(m => <span key={m} className={`dm-tag${covered.has(m) ? ' is-blue' : ''}`}><Icon name={MODALITY_ICON[m]} size={11} />{m}</span>)}
          </div>
        </div>
      </div>

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
