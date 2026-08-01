/** Clamps to the track so a value outside 0–max can never paint past the bar. */
export const meterPct = (value: number, max = 100): number =>
  max <= 0 ? 0 : Math.max(0, Math.min(100, (value / max) * 100))

export interface MeterProps {
  value: number
  max?: number
  /** Draws a reference mark — the target a domain is measured against. */
  target?: number
  /** `under` paints the warn colour; `run` adds the travelling sweep. */
  tone?: 'default' | 'under' | 'run'
  label?: string
}

/** A value bar with an optional target mark. Presentational: callers always
 * render the number itself alongside, so this carries no accessible name unless
 * one is passed. */
export function Meter({ value, max = 100, target, tone = 'default', label }: MeterProps) {
  const fill = tone === 'default' ? 'dm-meter-fill' : `dm-meter-fill is-${tone}`
  return (
    <div
      className="dm-meter"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <span className={fill} style={{ width: `${meterPct(value, max)}%` }} />
      {target !== undefined && <span className="dm-meter-mark" style={{ left: `${meterPct(target, max)}%` }} />}
    </div>
  )
}

export interface SegBarProps {
  /** How many stages the run completed. */
  done: number
  total: number
  /** Paints the stage after the completed ones red — where the run actually died. */
  failedAt?: number
  runningAt?: number
  label: string
}

/** The five-segment stage bar. Reading it tells you where a run stopped, which a
 * status pill alone never does. */
export function SegBar({ done, total, failedAt, runningAt, label }: SegBarProps) {
  return (
    <div className="dm-segbar" role="img" aria-label={label}>
      {Array.from({ length: total }, (_, i) => {
        const cls = i < done ? 'is-done' : i === failedAt ? 'is-fail' : i === runningAt ? 'is-run' : ''
        return <i key={i} className={cls} />
      })}
    </div>
  )
}
