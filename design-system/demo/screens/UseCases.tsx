import { useState } from 'react'
import { PageHead } from '../components/PageHead'
import { DataTable, type Column } from '../components/DataTable'
import { FilterBar } from '../components/FilterBar'
import { StatusPill, useCaseStatusPill } from '../components/StatusPill'
import { UseCaseDrawer } from '../components/UseCaseDrawer'
import { USE_CASES, type UseCase, type UseCaseStatus } from '../data/useCases'
import { sourceName } from '../data/sources'

const STATUSES: UseCaseStatus[] = ['ready', 'in-review', 'blocked']

const sourceNames = (ids: string[]): string[] => ids.map(sourceName)

export function UseCases() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<UseCaseStatus | null>(null)
  const [selected, setSelected] = useState<UseCase | null>(null)

  const rows = USE_CASES.filter(u =>
    `${u.name} ${u.summary}`.toLowerCase().includes(search.toLowerCase())
    && (!status || u.status === status))

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
    { key: 'impact', header: 'Impact', align: 'end', sortValue: u => u.impactValue, render: u => u.impact },
    { key: 'effort', header: 'Effort', render: u => u.effort },
    { key: 'status', header: 'Status', render: u => <StatusPill {...useCaseStatusPill(u.status)} /> },
  ]

  return (
    <>
      <PageHead eyebrow="Stage 05 — Use cases" title="Which agents are worth building" />

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
