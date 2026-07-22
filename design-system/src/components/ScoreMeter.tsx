export interface ScoreMeterProps {
  /** Agent-Readiness Score, 0–100. Values outside are clamped. */
  value: number
  label?: string
  /** Mono caption under the scale, e.g. "Certified · full audit". */
  caption?: string
}

/** ARS readout: display numeral over a hairline tick scale with a blue marker. */
export function ScoreMeter({ value, label = 'Agent-Readiness Score', caption }: ScoreMeterProps) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="dl-scoremeter">
      <span className="dl-scoremeter-label">{label}</span>
      <div className="dl-scoremeter-value">{v}<span className="dl-scoremeter-outof">/100</span></div>
      <div className="dl-scoremeter-scale" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-label={label}>
        <div className="dl-scoremeter-ticks" />
        <div className="dl-scoremeter-marker" style={{ left: `${v}%` }} />
      </div>
      <div className="dl-scoremeter-nums"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
      {caption && <span className="dl-scoremeter-caption">{caption}</span>}
    </div>
  )
}
