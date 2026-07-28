import { useMemo, useState, type ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  align?: 'start' | 'end'
  /** Omit to make the column unsortable. */
  sortValue?: (row: T) => string | number
  render: (row: T) => ReactNode
}

export interface DataTableProps<T> {
  caption: string
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  onRowClick?: (row: T) => void
  initialSort?: { key: string; dir: 'asc' | 'desc' }
}

export function DataTable<T>({ caption, columns, rows, rowKey, onRowClick, initialSort }: DataTableProps<T>) {
  const [sort, setSort] = useState(initialSort ?? null)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find(c => c.key === sort.key)
    if (!col?.sortValue) return rows
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => {
      const av = col.sortValue!(a), bv = col.sortValue!(b)
      return (av < bv ? -1 : av > bv ? 1 : 0) * dir
    })
  }, [rows, columns, sort])

  const toggle = (key: string) =>
    setSort(s => (s?.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  return (
    <table className="dm-table">
      <caption className="dm-sr">{caption}</caption>
      <thead>
        <tr>
          {columns.map(c => (
            <th
              key={c.key}
              scope="col"
              className={c.align === 'end' ? 'is-end' : undefined}
              aria-sort={sort?.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}
            >
              {c.sortValue
                ? <button type="button" onClick={() => toggle(c.key)}>{c.header}</button>
                : c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map(row => (
          <tr
            key={rowKey(row)}
            className={onRowClick ? 'is-clickable' : undefined}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map(c => (
              <td key={c.key} className={c.align === 'end' ? 'is-end' : undefined}>{c.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
