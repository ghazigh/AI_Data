export interface FilterGroup {
  key: string
  label: string
  options: string[]
  selected: string | null
  onSelect: (value: string | null) => void
}

export interface FilterBarProps {
  search: string
  onSearch: (value: string) => void
  placeholder: string
  groups: FilterGroup[]
}

export function FilterBar({ search, onSearch, placeholder, groups }: FilterBarProps) {
  return (
    <div className="dm-filterbar">
      <input
        className="dm-filter-search"
        type="search"
        value={search}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={e => onSearch(e.target.value)}
      />
      {groups.map(g => (
        <div className="dm-filter-group" key={g.key} role="group" aria-label={g.label}>
          <span className="dm-eyebrow">{g.label}</span>
          {g.options.map(o => (
            <button
              type="button"
              key={o}
              className={`dm-filter-chip${g.selected === o ? ' is-on' : ''}`}
              aria-pressed={g.selected === o}
              onClick={() => g.onSelect(g.selected === o ? null : o)}
            >
              {o}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
