import type { CSSProperties } from 'react'
import {
  siSnowflake, siPostgresql, siGooglebigquery, siMysql, siMongodb,
  siApachekafka, siSap, siJira, siZendesk, siConfluence, siNotion,
} from 'simple-icons'
import { S3_BUCKET } from './HeroFigure'

/**
 * One large figure per platform stage. Each animates the transformation it
 * describes rather than illustrating it generically, and each is authored on
 * the same 640×380 canvas so the five sections keep a common rhythm.
 *
 * Every animated property has a finished static default; the motion lives
 * behind `.js .is-visible` inside a prefers-reduced-motion gate in site.css,
 * so with motion off or JS off the figures render complete.
 */

const s = (i: number) => ({ '--i': i } as CSSProperties)

/**
 * 01 — a wall of real systems, each showing who it is and what shape its data
 * comes in. Modality drives the accent so "multi-modal" is legible at a
 * glance rather than asserted: structured blue, unstructured amber, streams
 * and object stores green.
 */
type Modality = 'struct' | 'doc' | 'event'
interface Src { name: string; path: string; kind: string; mode: Modality; evenOdd?: boolean }

const SYSTEMS: Src[] = [
  { name: 'Snowflake', path: siSnowflake.path, kind: 'tables', mode: 'struct' },
  { name: 'Postgres', path: siPostgresql.path, kind: 'tables', mode: 'struct' },
  { name: 'BigQuery', path: siGooglebigquery.path, kind: 'tables', mode: 'struct' },
  { name: 'MySQL', path: siMysql.path, kind: 'tables', mode: 'struct' },
  { name: 'SAP', path: siSap.path, kind: 'records', mode: 'struct' },
  { name: 'MongoDB', path: siMongodb.path, kind: 'documents', mode: 'doc' },
  { name: 'Confluence', path: siConfluence.path, kind: 'wiki pages', mode: 'doc' },
  { name: 'Notion', path: siNotion.path, kind: 'wiki pages', mode: 'doc' },
  { name: 'Jira', path: siJira.path, kind: 'tickets', mode: 'doc' },
  { name: 'Zendesk', path: siZendesk.path, kind: 'tickets', mode: 'doc' },
  { name: 'Kafka', path: siApachekafka.path, kind: 'event stream', mode: 'event' },
  { name: 'AWS S3', path: S3_BUCKET, kind: 'objects', mode: 'event', evenOdd: true },
]

/** tiny modality glyph, drawn in a 12×12 box at (x, y) */
function ModeGlyph({ mode, x, y }: { mode: Modality; x: number; y: number }) {
  if (mode === 'struct') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect width={11} height={2} rx={1} /><rect y={4} width={11} height={2} rx={1} />
        <rect y={8} width={7} height={2} rx={1} />
      </g>
    )
  }
  if (mode === 'doc') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 0 h7 l3 3 v8 h-10 z" />
      </g>
    )
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 8 q2.75 -6 5.5 0 t5.5 0" fill="none" strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

export function ConnectFigure() {
  const COLS = 3, TW = 130, TH = 72, GX = 8, GY = 13, X0 = 6, Y0 = 12
  const PORT_X = 470, PORT_Y = 190
  const pos = (i: number) => ({
    x: X0 + (i % COLS) * (TW + GX),
    y: Y0 + Math.floor(i / COLS) * (TH + GY),
  })
  const wire = (i: number) => {
    const { x, y } = pos(i)
    const cy = y + TH / 2
    return `M${x + TW} ${cy} C ${x + TW + 70} ${cy}, ${PORT_X - 80} ${PORT_Y}, ${PORT_X} ${PORT_Y}`
  }
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      {/* wiring is drawn first so it runs behind the wall of systems rather
          than crossing over the tiles it passes */}
      {SYSTEMS.map((sys, i) => (
        <g key={`w${sys.name}`} className={`st-sf-sys--${sys.mode}`}>
          <path className="st-sf-wire" pathLength={100} style={s(i)} d={wire(i)} />
          <path className="st-sf-packet" pathLength={100} style={s(i)} d={wire(i)} />
        </g>
      ))}
      {SYSTEMS.map((sys, i) => {
        const { x, y } = pos(i)
        return (
          <g key={sys.name} className={`st-sf-sys st-sf-sys--${sys.mode}`} style={s(i)}>
            <rect className="st-sf-systile" x={x} y={y} width={TW} height={TH} rx={7} />
            <g className="st-sf-sysmark" transform={`translate(${x + 11} ${y + 12}) scale(0.72)`}>
              <path d={sys.path} fillRule={sys.evenOdd ? 'evenodd' : undefined} />
            </g>
            <text className="st-sf-sysname" x={x + 35} y={y + 23}>{sys.name}</text>
            <g className="st-sf-sysmode">
              <ModeGlyph mode={sys.mode} x={x + 11} y={y + 45} />
              <text className="st-sf-syskind" x={x + 28} y={y + 54}>{sys.kind}</text>
            </g>
          </g>
        )
      })}
      <rect className="st-sf-port" x={PORT_X} y={PORT_Y - 50} width={24} height={100} rx={7} />
      <circle className="st-sf-portdot" cx={PORT_X + 12} cy={PORT_Y} r={6} />
      <text className="st-sf-tag" x={PORT_X + 36} y={PORT_Y - 4}>DATALITH</text>
      <text className="st-sf-tagsub" x={PORT_X + 36} y={PORT_Y + 13}>read-only</text>
    </svg>
  )
}

/** 02 — the readiness score resolving, per domain, then held under watch. */
export function ReadyFigure() {
  const domains = [
    { n: 'Revenue', v: 88 }, { n: 'Support', v: 64 },
    { n: 'Supply', v: 79 }, { n: 'Contracts', v: 41 },
  ]
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      <path className="st-sf-arcbg" d="M52 232 A 116 116 0 0 1 284 232" />
      <path className="st-sf-arc" pathLength={100} d="M52 232 A 116 116 0 0 1 284 232" />
      <text className="st-sf-score" x={168} y={228} textAnchor="middle">78</text>
      <text className="st-sf-scorecap" x={168} y={258} textAnchor="middle">AGENT-READINESS</text>
      {domains.map((d, i) => (
        <g key={d.n} className="st-sf-row" style={s(i)}>
          <text className="st-sf-rowlabel" x={344} y={78 + i * 46}>{d.n}</text>
          <rect className="st-sf-track" x={344} y={90 + i * 46} width={252} height={8} rx={4} />
          <rect className="st-sf-fill" x={344} y={90 + i * 46} height={8} rx={4}
            style={{ '--w': `${(252 * d.v) / 100}px` } as CSSProperties} />
          <text className="st-sf-rowval" x={604} y={99 + i * 46} textAnchor="end">{d.v}</text>
        </g>
      ))}
      <path className="st-sf-trace" pathLength={100}
        d="M344 328 L380 316 L416 334 L452 306 L488 320 L524 292 L560 300 L596 276" />
      <circle className="st-sf-tracedot" cx={596} cy={276} r={5} />
      <text className="st-sf-tagsub" x={344} y={356}>monitored continuously</text>
    </svg>
  )
}

/** 03 — ragged records passing through the proposed pipeline, coming out typed. */
export function PipelineFigure() {
  const rows = [0, 1, 2, 3, 4]
  const steps = ['dedupe', 'type', 'chunk']
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      <text className="st-sf-colcap" x={16} y={40}>AS FOUND</text>
      {rows.map(r => (
        <g key={`i${r}`} className="st-sf-raw" style={s(r)}>
          <rect x={16} y={64 + r * 40} width={40 + (r % 3) * 34} height={14} rx={3} />
          <rect className="st-sf-flag" x={124} y={64 + r * 40} width={14} height={14} rx={3}
            opacity={r % 2 ? 1 : 0} />
        </g>
      ))}
      {steps.map((st, i) => (
        <g key={st} className="st-sf-step" style={s(i)}>
          <rect x={200} y={70 + i * 88} width={148} height={62} rx={8} />
          <text className="st-sf-steplabel" x={274} y={106 + i * 88} textAnchor="middle">{st}</text>
        </g>
      ))}
      {rows.map(r => (
        <path key={`p${r}`} className="st-sf-run" pathLength={100} style={s(r)}
          d={`M160 ${71 + r * 40} C 210 ${71 + r * 40}, 340 ${80 + r * 46}, 420 ${80 + r * 46}`} />
      ))}
      <text className="st-sf-colcap" x={432} y={40}>AGENT-READY</text>
      {rows.map(r => (
        <g key={`o${r}`} className="st-sf-clean" style={s(r)}>
          <rect x={432} y={64 + r * 40} width={132} height={14} rx={3} />
          <path className="st-sf-check" pathLength={100} style={s(r)}
            d={`M578 ${71 + r * 40} l6 6 l12 -13`} />
        </g>
      ))}
    </svg>
  )
}

/** 04 — the graph assembling, then resolving into named knowledge domains. */
export function GraphStageFigure() {
  const clusters = [
    { label: 'Customers', cx: 150, cy: 108, r: 74, n: [[0, 0], [40, -26], [30, 32], [-34, 20], [-18, -34]] },
    { label: 'Contracts', cx: 452, cy: 92, r: 66, n: [[0, 0], [38, 20], [-30, 26], [16, -32]] },
    { label: 'Support', cx: 208, cy: 282, r: 64, n: [[0, 0], [36, 22], [-28, 24], [8, -30]] },
    { label: 'Supply', cx: 484, cy: 268, r: 68, n: [[0, 0], [-32, 28], [34, 18], [10, -30]] },
  ]
  const bridges = [
    'M200 120 L400 100', 'M170 170 L200 240', 'M300 300 L440 280',
    'M440 140 L470 216', 'M240 130 L420 250',
  ]
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      {bridges.map((d, i) => (
        <path key={i} className="st-sf-bridge" pathLength={100} style={s(i)} d={d} />
      ))}
      {clusters.map((c, ci) => (
        <g key={c.label}>
          <circle className="st-sf-halo" cx={c.cx} cy={c.cy} r={c.r} style={s(ci)} />
          {c.n.map(([dx, dy], i) => (
            <circle key={i} className="st-sf-gnode" cx={c.cx + dx} cy={c.cy + dy} r={7}
              style={s(ci * 5 + i)} />
          ))}
          <text className="st-sf-halolabel" x={c.cx} y={c.cy + c.r + 20} textAnchor="middle"
            style={s(ci)}>{c.label}</text>
        </g>
      ))}
    </svg>
  )
}

/** 05 — candidate agents dealt out of the graph, ranked by payback. */
export function UseCaseFigure() {
  const cards = [
    { name: 'Collections follow-up', roi: '$340K/yr', bar: 0.92, src: 'netsuite · sharepoint · zendesk' },
    { name: 'Churn-risk digest', roi: '$120K/yr', bar: 0.58, src: 'salesforce · product events' },
    { name: 'Invoice reconciliation', roi: '$95K/yr', bar: 0.44, src: 'netsuite · drive' },
  ]
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      <g className="st-sf-minigraph">
        {[[40, 60], [88, 40], [72, 96], [30, 112], [104, 84]].map(([x, y], i) => (
          <circle key={i} className="st-sf-gnode" cx={x} cy={y} r={5} style={s(i)} />
        ))}
        <path className="st-sf-bridge" pathLength={100} style={s(0)} d="M40 60 L88 40 M72 96 L104 84 M30 112 L72 96 M40 60 L72 96" />
      </g>
      <path className="st-sf-feed" pathLength={100} d="M118 84 C 160 84, 168 120, 196 120" />
      {cards.map((c, i) => (
        <g key={c.name} className="st-sf-card" style={s(i)}>
          <rect x={196} y={44 + i * 106} width={428} height={86} rx={10} />
          <text className="st-sf-cardname" x={218} y={78 + i * 106}>{c.name}</text>
          <text className="st-sf-cardsrc" x={218} y={98 + i * 106}>{c.src}</text>
          <rect className="st-sf-cardtrack" x={218} y={110 + i * 106} width={300} height={6} rx={3} />
          <rect className="st-sf-cardbar" x={218} y={110 + i * 106} height={6} rx={3}
            style={{ '--w': `${300 * c.bar}px` } as CSSProperties} />
          <text className="st-sf-cardroi" x={604} y={82 + i * 106} textAnchor="end">{c.roi}</text>
        </g>
      ))}
    </svg>
  )
}
