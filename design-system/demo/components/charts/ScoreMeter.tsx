export interface ScoreMeterProps { score: number; delta?: number; caption?: string }

export function ScoreMeter({ score, delta, caption }: ScoreMeterProps) {
  return (
    <div className="dm-scoremeter">
      <p className="dm-scoremeter-v">
        {score}<small> / 100</small>
      </p>
      <div className="dm-ticks" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={caption ?? 'Agent-readiness score'}>
        <i style={{ left: `${score}%` }} />
      </div>
      {delta !== undefined && (
        <p className="dm-delta">{delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} since last quarter</p>
      )}
      {caption && <p className="dm-eyebrow" style={{ marginTop: 12 }}>{caption}</p>}
    </div>
  )
}
