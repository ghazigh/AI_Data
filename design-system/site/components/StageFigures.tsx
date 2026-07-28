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

/**
 * 02 — the readiness console: the headline score, the estate stats behind it,
 * per-domain breakdown, the flags a data team would act on, and the trend
 * that proves it is watched rather than sampled once.
 */
const KPIS = [
  { v: '23', l: 'sources scanned' },
  { v: '4.2M', l: 'entities seen' },
  { v: '61%', l: 'typed columns' },
  { v: '3', l: 'stale sources' },
]
const DOMAINS = [
  { n: 'Revenue', v: 88 }, { n: 'Support', v: 64 },
  { n: 'Supply', v: 79 }, { n: 'Contracts', v: 41 },
]
const FLAGS = [
  { sev: 'high', t: '12 PII columns unmasked', s: 'salesforce, zendesk' },
  { sev: 'high', t: '41K duplicate customer records', s: 'across 4 systems' },
  { sev: 'mid', t: '3 sources not refreshed in 30d', s: 'netsuite, drive, jira' },
]
const TREND = [42, 48, 46, 55, 59, 57, 64, 68, 66, 73, 75, 78]

export function ReadyFigure() {
  const tx = (i: number) => 392 + i * 21
  const ty = (v: number) => 356 - ((v - 35) / 50) * 62
  const line = TREND.map((v, i) => `${i ? 'L' : 'M'}${tx(i)} ${ty(v)}`).join(' ')
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      {/* header */}
      <text className="st-sf-dashcap" x={14} y={21}>AGENT-READINESS CONSOLE</text>
      <circle className="st-sf-livedot" cx={556} cy={17} r={4} />
      <text className="st-sf-dashcap" x={568} y={21}>LIVE</text>
      <path className="st-sf-rule" d="M0 34 H640" />

      {/* headline score */}
      <path className="st-sf-arcbg" d="M34 176 A 62 62 0 0 1 158 176" />
      <path className="st-sf-arc" pathLength={100} d="M34 176 A 62 62 0 0 1 158 176" />
      <text className="st-sf-score" x={96} y={172} textAnchor="middle">78</text>
      <text className="st-sf-scorecap" x={96} y={196} textAnchor="middle">OUT OF 100</text>
      <text className="st-sf-delta" x={96} y={222} textAnchor="middle">▲ 6 pts this week</text>
      <path className="st-sf-rule" d="M186 44 V236" />

      {/* estate stats */}
      {KPIS.map((k, i) => (
        <g key={k.l} className="st-sf-kpi" style={s(i)}>
          <text className="st-sf-kpival" x={212 + i * 108} y={74}>{k.v}</text>
          <text className="st-sf-kpilabel" x={212 + i * 108} y={90}>{k.l}</text>
        </g>
      ))}
      <path className="st-sf-rule" d="M204 106 H626" />

      {/* per-domain readiness */}
      {DOMAINS.map((d, i) => (
        <g key={d.n} className="st-sf-row" style={s(i)}>
          <text className="st-sf-rowlabel" x={212} y={140 + i * 26}>{d.n}</text>
          <rect className="st-sf-track" x={300} y={132 + i * 26} width={278} height={7} rx={3.5} />
          <rect className={`st-sf-fill${d.v < 50 ? ' st-sf-fill--low' : ''}`} x={300} y={132 + i * 26}
            height={7} rx={3.5} style={{ '--w': `${(278 * d.v) / 100}px` } as CSSProperties} />
          <text className="st-sf-rowval" x={626} y={140 + i * 26} textAnchor="end">{d.v}</text>
        </g>
      ))}
      <path className="st-sf-rule" d="M0 250 H640" />

      {/* flags a data team would act on */}
      <text className="st-sf-dashcap" x={14} y={274}>RED FLAGS · 3 OPEN</text>
      {FLAGS.map((f, i) => (
        <g key={f.t} className="st-sf-flagrow" style={s(i)}>
          <circle className={`st-sf-flagdot st-sf-flagdot--${f.sev}`} cx={20} cy={297 + i * 30} r={4} />
          <text className="st-sf-flagtext" x={34} y={301 + i * 30}>{f.t}</text>
          <text className="st-sf-flagsrc" x={34} y={313 + i * 30}>{f.s}</text>
        </g>
      ))}
      <path className="st-sf-rule" d="M370 264 V366" />

      {/* the trend that proves it is monitored */}
      <text className="st-sf-dashcap" x={392} y={286}>READINESS · 12 WEEKS</text>
      <path className="st-sf-area" d={`${line} L${tx(11)} 366 L${tx(0)} 366 Z`} />
      <path className="st-sf-trace" pathLength={100} d={line} />
      <circle className="st-sf-tracedot" cx={tx(11)} cy={ty(78)} r={4.5} />
    </svg>
  )
}

/**
 * 03 — the pipeline plan generated from this estate's own scan: what was
 * found, the steps proposed to fix it, and the resulting shape. The counts
 * on the left drive the steps in the middle, which is the whole point.
 */
const FOUND = [
  { t: 'duplicate records', v: '41K' },
  { t: 'untyped columns', v: '380' },
  { t: 'unmasked PII', v: '12' },
  { t: 'unchunked documents', v: '22K' },
]
const STEPS = [
  { n: 'resolve + dedupe', d: 'match across 4 systems' },
  { n: 'semantic typing', d: 'infer 380 column types' },
  { n: 'mask PII', d: '12 columns, policy-driven' },
  { n: 'chunk + embed', d: '22K docs to 1.8M chunks' },
]
const AFTER = [
  '4.2M entities resolved', '100% columns typed',
  'PII masked at source', '1.8M chunks embedded',
]

export function PipelineFigure() {
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      <text className="st-sf-dashcap" x={14} y={21}>PIPELINE PLAN &#183; GENERATED FROM YOUR SCAN</text>
      <path className="st-sf-rule" d="M0 34 H640" />

      <text className="st-sf-colcap" x={14} y={62}>FOUND</text>
      {FOUND.map((f, i) => (
        <g key={f.t} className="st-sf-raw" style={s(i)}>
          <text className="st-sf-foundval" x={14} y={100 + i * 50}>{f.v}</text>
          <text className="st-sf-foundlabel" x={14} y={114 + i * 50}>{f.t}</text>
        </g>
      ))}
      <path className="st-sf-rule" d="M172 46 V366" />

      {STEPS.map((st, i) => (
        <g key={st.n} className="st-sf-step" style={s(i)}>
          <rect x={196} y={62 + i * 78} width={236} height={56} rx={8} />
          <circle className="st-sf-stepnum" cx={218} cy={90 + i * 78} r={9} />
          <text className="st-sf-stepidx" x={218} y={94 + i * 78} textAnchor="middle">{i + 1}</text>
          <text className="st-sf-stepname" x={236} y={86 + i * 78}>{st.n}</text>
          <text className="st-sf-stepdetail" x={236} y={102 + i * 78}>{st.d}</text>
        </g>
      ))}
      {[0, 1, 2].map(i => (
        <g key={'c' + i}>
          <path className="st-sf-chain" pathLength={100} style={s(i)} d={'M314 ' + (118 + i * 78) + ' V ' + (140 + i * 78)} />
          <path className="st-sf-run" pathLength={100} style={s(i)} d={'M314 ' + (118 + i * 78) + ' V ' + (140 + i * 78)} />
        </g>
      ))}

      <path className="st-sf-rule" d="M456 46 V366" />
      <text className="st-sf-colcap" x={478} y={62}>AFTER</text>
      {AFTER.map((a, i) => (
        <g key={a} className="st-sf-clean" style={s(i)}>
          <path className="st-sf-check" pathLength={100} style={s(i)} d={'M478 ' + (102 + i * 50) + ' l5 5 l11 -12'} />
          <text className="st-sf-aftertext" x={500} y={107 + i * 50}>{a}</text>
        </g>
      ))}
    </svg>
  )
}

/**
 * 04 — the graph as something you can read: named domains sized by what they
 * hold, the cross-domain links that only exist once systems are resolved into
 * each other, and each domain's standing as a knowledge base.
 */
const DOMAINS4 = [
  { label: 'Customers', cx: 136, cy: 122, r: 60, n: '1.2M', ready: true },
  { label: 'Contracts', cx: 320, cy: 96, r: 44, n: '340K', ready: true },
  { label: 'Support', cx: 258, cy: 268, r: 66, n: '2.1M', ready: true },
  { label: 'Supply', cx: 104, cy: 274, r: 46, n: '560K', ready: false },
]

export function GraphStageFigure() {
  const bridges = ['M194 112 L278 100', 'M156 178 L228 226', 'M304 138 L278 208', 'M128 218 L110 230']
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      <text className="st-sf-dashcap" x={14} y={21}>KNOWLEDGE GRAPH &#183; 4.2M ENTITIES &#183; 18M RELATIONSHIPS</text>
      <path className="st-sf-rule" d="M0 34 H640" />
      {bridges.map((d, i) => (
        <path key={i} className="st-sf-bridge" pathLength={100} style={s(i)} d={d} />
      ))}
      {DOMAINS4.map((c, ci) => (
        <g key={c.label}>
          <circle className="st-sf-halo" cx={c.cx} cy={c.cy} r={c.r} style={s(ci)} />
          {Array.from({ length: 5 }, (_, i) => {
            const a = (i / 5) * Math.PI * 2 + ci
            return (
              <circle key={i} className="st-sf-gnode" style={s(ci * 5 + i)} r={5}
                cx={c.cx + Math.cos(a) * c.r * 0.8} cy={c.cy + Math.sin(a) * c.r * 0.8} />
            )
          })}
          <text className="st-sf-halolabel" x={c.cx} y={c.cy + 4} textAnchor="middle" style={s(ci)}>{c.label}</text>
        </g>
      ))}
      <path className="st-sf-rule" d="M412 46 V366" />
      <text className="st-sf-colcap" x={436} y={62}>KNOWLEDGE BASES</text>
      {DOMAINS4.map((d, i) => (
        <g key={'r' + d.label} className="st-sf-kbrow" style={s(i)}>
          <text className="st-sf-kbname" x={436} y={104 + i * 62}>{d.label}</text>
          <text className="st-sf-kbcount" x={436} y={120 + i * 62}>{d.n} entities</text>
          <g className={'st-sf-kbbadge st-sf-kbbadge--' + (d.ready ? 'ok' : 'wait')}>
            <rect x={436} y={128 + i * 62} width={d.ready ? 92 : 104} height={16} rx={8} />
            <text x={446} y={139 + i * 62}>{d.ready ? 'agent-ready' : 'needs typing'}</text>
          </g>
        </g>
      ))}
    </svg>
  )
}

/**
 * 05 — the recommender: agents ranked by payback, each showing the sources it
 * draws on and whether the graph supports it yet. The blocked row is
 * deliberate; the honest output includes what you cannot build today.
 */
const AGENTS = [
  { name: 'Collections follow-up', roi: '$340K/yr', bar: 0.92, src: 'netsuite · sharepoint · zendesk', ready: true, eff: 'ready · 3 weeks' },
  { name: 'Churn-risk digest', roi: '$120K/yr', bar: 0.58, src: 'salesforce · product events', ready: true, eff: 'ready · 2 weeks' },
  { name: 'Contract renewal agent', roi: '$95K/yr', bar: 0.44, src: 'contracts · crm', ready: false, eff: 'blocked · Contracts < 60' },
]

export function UseCaseFigure() {
  return (
    <svg viewBox="0 0 640 380" className="st-sf" aria-hidden="true">
      <text className="st-sf-dashcap" x={14} y={21}>PROPOSED AGENTS &#183; RANKED BY PAYBACK</text>
      <path className="st-sf-rule" d="M0 34 H640" />
      {AGENTS.map((a, i) => {
        const bw = a.ready ? 106 : 160
        return (
          <g key={a.name} className={'st-sf-card st-sf-card--' + (a.ready ? 'ready' : 'blocked')} style={s(i)}>
            <rect x={14} y={54 + i * 104} width={612} height={88} rx={10} />
            <circle className="st-sf-rankdot" cx={40} cy={88 + i * 104} r={13} />
            <text className="st-sf-cardrank" x={40} y={93 + i * 104} textAnchor="middle">{i + 1}</text>
            <text className="st-sf-cardname" x={66} y={86 + i * 104}>{a.name}</text>
            <text className="st-sf-cardsrc" x={66} y={104 + i * 104}>{a.src}</text>
            <rect className="st-sf-cardtrack" x={66} y={116 + i * 104} width={330} height={6} rx={3} />
            <rect className="st-sf-cardbar" x={66} y={116 + i * 104} height={6} rx={3}
              style={{ '--w': (330 * a.bar) + 'px' } as CSSProperties} />
            <text className="st-sf-cardroi" x={606} y={88 + i * 104} textAnchor="end">{a.roi}</text>
            <g className={'st-sf-kbbadge st-sf-kbbadge--' + (a.ready ? 'ok' : 'wait')}>
              <rect x={606 - bw} y={106 + i * 104} width={bw} height={17} rx={8.5} />
              <text x={606 - bw + 10} y={118 + i * 104}>{a.eff}</text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}
