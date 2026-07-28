export interface Dimension { label: string; value: number }

export function DimensionRadar({ dimensions }: { dimensions: Dimension[] }) {
  const SIZE = 260, C = SIZE / 2, R = 88
  const angle = (i: number) => (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
  const point = (i: number, r: number) =>
    `${(C + Math.cos(angle(i)) * r).toFixed(1)},${(C + Math.sin(angle(i)) * r).toFixed(1)}`
  const ring = (frac: number) => dimensions.map((_, i) => point(i, R * frac)).join(' ')
  const shape = dimensions.map((d, i) => point(i, (R * d.value) / 100)).join(' ')

  return (
    <figure className="dm-radar">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Readiness by dimension">
        {[0.25, 0.5, 0.75, 1].map(f => <polygon key={f} points={ring(f)} className="dm-radar-ring" />)}
        <polygon points={shape} className="dm-radar-shape" />
        {dimensions.map((d, i) => (
          <circle key={d.label} cx={C + Math.cos(angle(i)) * ((R * d.value) / 100)} cy={C + Math.sin(angle(i)) * ((R * d.value) / 100)} r={3} className="dm-radar-dot" />
        ))}
      </svg>
      <figcaption>
        <ul className="dm-radar-legend">
          {dimensions.map(d => (
            <li key={d.label}><span>{d.label}</span><b>{d.value}</b></li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
