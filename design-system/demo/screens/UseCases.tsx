import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { Panel } from '../components/Panel'
import { DataTable, type Column } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import { StatusPill, useCaseStatusPill } from '../components/StatusPill'
import { UseCaseDrawer } from '../components/UseCaseDrawer'
import { OpportunityMap } from '../components/charts/OpportunityMap'
import { USE_CASES, type UseCase, type UseCaseStatus } from '../data/useCases'
import { sourceName } from '../data/sources'

const STATUSES: UseCaseStatus[] = ['ready', 'in-review', 'blocked']

const sourceNames = (ids: string[]): string[] => ids.map(sourceName)

const millions = (v: number): string => `$${(v / 1_000_000).toFixed(1)}M`

export function UseCases() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<UseCaseStatus | null>(null)
  const [selected, setSelected] = useState<UseCase | null>(null)

  const rows = USE_CASES.filter(u =>
    `${u.name} ${u.summary}`.toLowerCase().includes(search.toLowerCase())
    && (!status || u.status === status))

  const count = (s: UseCaseStatus) => USE_CASES.filter(u => u.status === s).length
  const readyValue = USE_CASES.filter(u => u.status === 'ready').reduce((sum, u) => sum + u.impactValue, 0)
  const blockedValue = USE_CASES.filter(u => u.status === 'blocked').reduce((sum, u) => sum + u.impactValue, 0)

  const columns: Column<UseCase>[] = [
    {
      key: 'name', header: 'Use case', sortValue: u => u.name,
      render: u => <button type="button" onClick={() => setSelected(u)}>{u.name}</button>,
    },
    {
      key: 'sources', header: 'Sources',
      render: u => {
        const names = sourceNames(u.sourceIds)
        return <span className="dm-muted">{u.sourceIds.length} · {names.slice(0, 2).join(', ')}</span>
      },
    },
    { key: 'impact', header: 'Impact', align: 'end', sortValue: u => u.impactValue, render: u => <b>{u.impact}</b> },
    { key: 'effort', header: 'Effort', render: u => u.effort },
    { key: 'status', header: 'Status', render: u => <StatusPill {...useCaseStatusPill(u.status)} /> },
  ]

  return (
    <>
      <PageHead
        eyebrow="Stage 06 — Use cases"
        title="Which agents are worth building"
        lead="Mined from the graph: every agent application this data already supports, with sources, effort and payback attached — and what is blocked, by which domain."
      />

      <div className="dm-section is-lead">
        <Panel eyebrow="Impact against effort" title="Opportunity map">
          <div className="dm-ucmap">
            <OpportunityMap useCases={rows} onSelect={setSelected} />
            <div className="dm-ucmap-side">
              <p className="dm-ucmap-k is-ready"><i aria-hidden="true" />Ready to build <span>{count('ready')}</span></p>
              <p className="dm-ucmap-k is-in-review"><i aria-hidden="true" />In review <span>{count('in-review')}</span></p>
              <p className="dm-ucmap-k is-blocked"><i aria-hidden="true" />Blocked <span>{count('blocked')}</span></p>
              <p className="dm-ucmap-sum"><b>{millions(readyValue)}</b>projected a year from what is buildable today</p>
              <p className="dm-ucmap-sum"><b>{millions(blockedValue)}</b>waiting on domains under 70 — a readiness fix, not a research project</p>
            </div>
          </div>
        </Panel>
      </div>

      <FilterBar
        search={search} onSearch={setSearch} placeholder="Search use cases…"
        groups={[
          { key: 'status', label: 'Status', options: STATUSES, selected: status, onSelect: v => setStatus(v as UseCaseStatus | null) },
        ]}
      />

      <div className="dm-panel">
        <DataTable
          caption="Agent opportunities"
          columns={columns}
          rows={rows}
          rowKey={u => u.id}
          onRowClick={u => setSelected(u)}
          initialSort={{ key: 'impact', dir: 'desc' }}
        />
      </div>

      <UseCaseDrawer useCase={selected} onClose={() => setSelected(null)} />
    </>
  )
}
