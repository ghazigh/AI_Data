import {
  siSnowflake, siPostgresql, siMongodb, siApachekafka, siRedis,
  siGooglebigquery, siDatabricks, siNotion, siGmail, siJira,
  type SimpleIcon,
} from 'simple-icons'

/* Geometry: sources on the flanks, resolved entities in a ring,
   the intelligence core in the center. viewBox 1000×560. */
const CX = 500
const CY = 280

interface Src { icon: SimpleIcon; label: string; x: number; y: number; to: string[] }
interface Ent { id: string; label: string; x: number; y: number; side?: 'left' | 'right' }

const ENTITIES: Ent[] = [
  { id: 'customer', label: 'customer', x: 500, y: 130 },
  { id: 'product', label: 'product', x: 630, y: 205, side: 'right' },
  { id: 'order', label: 'order', x: 630, y: 355, side: 'right' },
  { id: 'invoice', label: 'invoice', x: 500, y: 430 },
  { id: 'ticket', label: 'ticket', x: 370, y: 355, side: 'left' },
  { id: 'contract', label: 'contract', x: 370, y: 205, side: 'left' },
]

const SOURCES: Src[] = [
  { icon: siSnowflake, label: 'snowflake', x: 95, y: 90, to: ['customer', 'contract'] },
  { icon: siPostgresql, label: 'postgres', x: 95, y: 185, to: ['contract', 'customer'] },
  { icon: siMongodb, label: 'mongodb', x: 95, y: 280, to: ['ticket', 'contract'] },
  { icon: siApachekafka, label: 'kafka', x: 95, y: 375, to: ['ticket'] },
  { icon: siRedis, label: 'redis', x: 95, y: 470, to: ['invoice', 'ticket'] },
  { icon: siGooglebigquery, label: 'bigquery', x: 905, y: 90, to: ['customer', 'product'] },
  { icon: siDatabricks, label: 'databricks', x: 905, y: 185, to: ['product', 'customer'] },
  { icon: siNotion, label: 'notion', x: 905, y: 280, to: ['order', 'product'] },
  { icon: siGmail, label: 'gmail', x: 905, y: 375, to: ['order', 'invoice'] },
  { icon: siJira, label: 'jira', x: 905, y: 470, to: ['invoice', 'order'] },
]

/* ring segments + two identity-resolution chords between entities */
const ENTITY_LINKS: [string, string][] = [
  ['customer', 'product'], ['product', 'order'], ['order', 'invoice'],
  ['invoice', 'ticket'], ['ticket', 'contract'], ['contract', 'customer'],
  ['customer', 'order'], ['contract', 'invoice'],
]

const ent = (id: string) => ENTITIES.find(e => e.id === id)!

/** Curve from a source to an entity node, bowing toward the center band. */
function srcPath(s: Src, e: Ent) {
  const dx = e.x - s.x
  return `M${s.x} ${s.y} C ${s.x + dx * 0.45} ${s.y}, ${e.x - dx * 0.3} ${e.y}, ${e.x} ${e.y}`
}
function entPath(a: Ent, b: Ent) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  // bow gently away from the core so ring links don't cross it
  const vx = mx - CX
  const vy = my - CY
  const len = Math.hypot(vx, vy) || 1
  return `M${a.x} ${a.y} Q ${mx + (vx / len) * 26} ${my + (vy / len) * 26}, ${b.x} ${b.y}`
}
function corePath(e: Ent) {
  return `M${e.x} ${e.y} L${CX} ${CY}`
}

/**
 * The knowledge-connection showcase: every source wired through resolved
 * entities into one intelligence core. Edges draw in on reveal; blue
 * pulses stream along them continuously (CSS motion-path, reduced-motion
 * safe); the core breathes.
 */
export function KnowledgeGraph() {
  const srcEdges = SOURCES.flatMap((s, si) =>
    s.to.map((t, ti) => ({ d: srcPath(s, ent(t)), delay: 0.15 + si * 0.06 + ti * 0.3 })))
  const entEdges = ENTITY_LINKS.map(([a, b], i) => ({ d: entPath(ent(a), ent(b)), delay: 0.9 + i * 0.07 }))
  const coreEdges = ENTITIES.map((e, i) => ({ d: corePath(e), delay: 1.4 + i * 0.08 }))
  // continuous pulses: knowledge flowing inward along a spread of edges
  const pulses = [
    { d: srcEdges[0].d, dur: 5.2, delay: 2.0 }, { d: srcEdges[4].d, dur: 6.0, delay: 3.1 },
    { d: srcEdges[7].d, dur: 5.6, delay: 2.6 }, { d: srcEdges[10].d, dur: 6.4, delay: 4.0 },
    { d: srcEdges[13].d, dur: 5.0, delay: 3.5 }, { d: srcEdges[16].d, dur: 6.2, delay: 2.2 },
    { d: coreEdges[0].d, dur: 3.2, delay: 2.4 }, { d: coreEdges[2].d, dur: 3.6, delay: 3.8 },
    { d: coreEdges[4].d, dur: 3.4, delay: 3.0 },
  ]
  return (
    <figure className="st-kg" data-reveal aria-label="Knowledge graph: ten data sources resolved into shared customer, product, order, invoice, ticket and contract entities, all feeding one company intelligence core">
      <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" role="img">
        {/* edges */}
        {srcEdges.map((e, i) => (
          <path key={`s${i}`} className="st-kg-edge" d={e.d} style={{ ['--d' as never]: `${e.delay}s` }} />
        ))}
        {entEdges.map((e, i) => (
          <path key={`e${i}`} className="st-kg-edge st-kg-edge--ring" d={e.d} style={{ ['--d' as never]: `${e.delay}s` }} />
        ))}
        {coreEdges.map((e, i) => (
          <path key={`c${i}`} className="st-kg-coreedge" d={e.d} style={{ ['--d' as never]: `${e.delay}s` }} />
        ))}
        {/* traveling knowledge pulses */}
        {pulses.map((p, i) => (
          <circle key={`p${i}`} className="st-kg-pulse" r="3"
            style={{ offsetPath: `path("${p.d}")`, ['--dur' as never]: `${p.dur}s`, ['--d' as never]: `${p.delay}s` }} />
        ))}
        {/* source nodes */}
        {SOURCES.map((s, i) => (
          <g key={s.label} className="st-kg-node" style={{ ['--d' as never]: `${0.1 + i * 0.07}s` }}>
            <circle cx={s.x} cy={s.y} r="19" className="st-kg-nodering" />
            <g transform={`translate(${s.x - 9} ${s.y - 9}) scale(0.75)`}>
              <title>{s.icon.title}</title>
              <path d={s.icon.path} className="st-kg-nodeicon" />
            </g>
            <text x={s.x} y={s.y + 34} textAnchor="middle" className="st-kg-nodelabel">{s.label}</text>
          </g>
        ))}
        {/* entity nodes */}
        {ENTITIES.map((e, i) => (
          <g key={e.id} className="st-kg-node" style={{ ['--d' as never]: `${1.0 + i * 0.08}s` }}>
            <circle cx={e.x} cy={e.y} r="6" className="st-kg-entity" />
            <text
              x={e.side === 'left' ? e.x - 14 : e.side === 'right' ? e.x + 14 : e.x}
              y={e.side ? e.y + 4 : e.y - 13}
              textAnchor={e.side === 'left' ? 'end' : e.side === 'right' ? 'start' : 'middle'}
              className="st-kg-entlabel"
            >{e.label}</text>
          </g>
        ))}
        {/* the intelligence core */}
        <g className="st-kg-node st-kg-corenode" style={{ ['--d' as never]: '1.7s' }}>
          <circle cx={CX} cy={CY} r="46" className="st-kg-corepulse" />
          <circle cx={CX} cy={CY} r="46" className="st-kg-corepulse st-kg-corepulse--late" />
          <circle cx={CX} cy={CY} r="46" className="st-kg-corering" />
          <circle cx={CX} cy={CY} r="31" className="st-kg-corewash" />
          <circle cx={CX} cy={CY} r="12" className="st-kg-coredot" />
          <text x={CX} y={CY + 72} textAnchor="middle" className="st-kg-corelabel">COMPANY INTELLIGENCE</text>
        </g>
      </svg>
    </figure>
  )
}
