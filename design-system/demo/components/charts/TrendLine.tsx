export interface TrendPoint { label: string; value: number }

export function TrendLine({ points, ariaLabel }: { points: TrendPoint[]; ariaLabel: string }) {
  const W = 520, H = 140, PAD = 22
  const max = 100, min = 0
  const x = (i: number) => PAD + (i * (W - PAD * 2)) / Math.max(points.length - 1, 1)
  const y = (v: number) => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2)
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(' ')

  return (
    <figure className="dm-trend">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} className="dm-axis" />
        <path d={path} className="dm-trend-line" />
        {points.map((p, i) => (
          <circle key={p.label} cx={x(i)} cy={y(p.value)} r={3.5} className="dm-trend-dot" />
        ))}
        {points.map((p, i) => (
          <text key={`${p.label}-v`} x={x(i)} y={y(p.value) - 12} className="dm-trend-value" textAnchor="middle">{p.value}</text>
        ))}
        {points.map((p, i) => (
          <text key={`${p.label}-l`} x={x(i)} y={H - 6} className="dm-trend-label" textAnchor="middle">{p.label}</text>
        ))}
      </svg>
    </figure>
  )
}
