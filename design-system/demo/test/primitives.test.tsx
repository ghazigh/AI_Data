import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { Panel } from '../components/Panel'
import { StatTile } from '../components/StatTile'
import { DataTable, type Column } from '../components/DataTable'
import { Drawer } from '../components/Drawer'
import { FilterBar } from '../components/FilterBar'
import { StatusPill } from '../components/StatusPill'

interface Row { id: string; name: string; score: number }
const ROWS: Row[] = [
  { id: 'a', name: 'Alpha', score: 30 },
  { id: 'b', name: 'Beta', score: 90 },
  { id: 'c', name: 'Gamma', score: 60 },
]
const COLS: Column<Row>[] = [
  { key: 'name', header: 'Name', sortValue: r => r.name, render: r => r.name },
  { key: 'score', header: 'Score', align: 'end', sortValue: r => r.score, render: r => r.score },
]

const table = (props: Partial<React.ComponentProps<typeof DataTable<Row>>> = {}) =>
  render(<DataTable caption="Rows" columns={COLS} rows={ROWS} rowKey={r => r.id} {...props} />)

describe('Panel', () => {
  it('labels itself with its title', () => {
    render(<Panel eyebrow="Stage 02 — Ready" title="Readiness by domain"><p>body</p></Panel>)
    expect(screen.getByRole('region', { name: 'Readiness by domain' })).toBeDefined()
    expect(screen.getByText('Stage 02 — Ready')).toBeDefined()
  })
})

describe('StatTile', () => {
  it('shows value, unit and supporting line', () => {
    render(<StatTile label="Entities resolved" value="2.4" unit="M" sub="Across 8 knowledge bases" />)
    expect(screen.getByText('2.4')).toBeDefined()
    expect(screen.getByText('M')).toBeDefined()
    expect(screen.getByText('Across 8 knowledge bases')).toBeDefined()
  })

  it('exposes the meter to assistive tech', () => {
    render(<StatTile label="Score" value="71" unit="/ 100" meter={71} />)
    const meter = screen.getByRole('meter')
    expect(meter.getAttribute('aria-valuenow')).toBe('71')
  })
})

describe('DataTable', () => {
  it('renders a real table with a caption and header scope', () => {
    table()
    expect(screen.getByRole('table', { name: 'Rows' })).toBeDefined()
    expect(screen.getAllByRole('columnheader')[0].getAttribute('scope')).toBe('col')
  })

  it('sorts when a header is activated, and reverses on a second press', () => {
    table()
    const header = screen.getByRole('button', { name: /score/i })
    fireEvent.click(header)
    let cells = screen.getAllByRole('row').slice(1).map(r => within(r).getAllByRole('cell')[0].textContent)
    expect(cells).toEqual(['Alpha', 'Gamma', 'Beta'])
    fireEvent.click(header)
    cells = screen.getAllByRole('row').slice(1).map(r => within(r).getAllByRole('cell')[0].textContent)
    expect(cells).toEqual(['Beta', 'Gamma', 'Alpha'])
  })

  it('reports sort direction to assistive tech', () => {
    table()
    fireEvent.click(screen.getByRole('button', { name: /score/i }))
    const th = screen.getAllByRole('columnheader')[1]
    expect(th.getAttribute('aria-sort')).toBe('ascending')
  })

  it('calls back when a row is chosen', () => {
    const onRowClick = vi.fn()
    table({ onRowClick })
    fireEvent.click(screen.getByText('Beta'))
    expect(onRowClick).toHaveBeenCalledWith(ROWS[1])
  })
})

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(<Drawer open={false} title="Source" onClose={() => {}}><p>detail</p></Drawer>)
    expect(screen.queryByText('detail')).toBeNull()
  })

  it('is a labelled dialog when open', () => {
    render(<Drawer open title="Source" onClose={() => {}}><p>detail</p></Drawer>)
    expect(screen.getByRole('dialog', { name: 'Source' })).toBeDefined()
  })

  it('closes on Escape and on the close control', () => {
    const onClose = vi.fn()
    render(<Drawer open title="Source" onClose={onClose}><p>detail</p></Drawer>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('moves focus into itself when it opens', () => {
    render(<Drawer open title="Source" onClose={() => {}}><p>detail</p></Drawer>)
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true)
  })
})

describe('FilterBar', () => {
  it('reports typing and chip selection', () => {
    const onSearch = vi.fn()
    const onSelect = vi.fn()
    render(
      <FilterBar
        search="" onSearch={onSearch} placeholder="Search sources…"
        groups={[{ key: 'modality', label: 'Modality', options: ['tables', 'documents'], selected: null, onSelect }]}
      />,
    )
    fireEvent.change(screen.getByPlaceholderText('Search sources…'), { target: { value: 'guide' } })
    expect(onSearch).toHaveBeenCalledWith('guide')
    fireEvent.click(screen.getByRole('button', { name: 'tables' }))
    expect(onSelect).toHaveBeenCalledWith('tables')
  })
})

describe('StatusPill', () => {
  it('renders its label', () => {
    render(<StatusPill tone="warn" label="Blocked" />)
    expect(screen.getByText('Blocked')).toBeDefined()
  })
})
