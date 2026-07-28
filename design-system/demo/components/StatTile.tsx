export interface StatTileProps {
  label: string
  value: string
  unit?: string
  sub?: string
  /** 0–100; renders the tick meter. */
  meter?: number
}

export function StatTile({ label, value, unit, sub, meter }: StatTileProps) {
  return (
    <div className="dm-tile">
      <p className="dm-eyebrow">{label}</p>
      <p className="dm-tile-v">{value}{unit && <small>{unit}</small>}</p>
      {meter !== undefined && (
        <div className="dm-ticks" role="meter" aria-valuenow={meter} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
          <i style={{ left: `${meter}%` }} />
        </div>
      )}
      {sub && <p className="dm-tile-sub">{sub}</p>}
    </div>
  )
}
