import { SOURCES } from './sources'
import { domainByKey } from './tenant'
import { RED_FLAGS } from './readiness'
import { GRAPH_NODES } from './graph'
import type { DomainKey, Modality, Source } from './types'

/**
 * Stage 05 — search over the estate rather than over its contents: the question
 * is whether the company holds data on something, and the answer is the
 * datasets that carry it, not a row out of one of them.
 *
 * Everything here is derived from the same canon the rest of the demo reads —
 * SOURCES for what exists, RED_FLAGS for what is wrong with it, GRAPH_NODES for
 * what it backs in the graph. Nothing is written twice, so an answer can never
 * contradict the screen a visitor clicks through to next.
 */

/**
 * Business vocabulary mapped to the parts of the estate that actually carry it.
 * A person asks about "fraud"; no source is named fraud, but claim photography
 * and claim call transcripts are where fraud signal lives. Substring matching
 * alone answers "we hold nothing on that" to a question the estate can answer,
 * which is the one wrong answer this screen must never give.
 */
interface Concept {
  terms: string[]
  domains: DomainKey[]
  modalities: Modality[]
}

const CONCEPTS: Concept[] = [
  { terms: ['fraud', 'siu', 'suspicious'], domains: ['claims'], modalities: ['images', 'transcripts'] },
  { terms: ['commission', 'broker', 'producer', 'agency'], domains: ['broker-network'], modalities: [] },
  { terms: ['call', 'transcript', 'voice', 'recording'], domains: [], modalities: ['transcripts'] },
  { terms: ['treaty', 'reinsurance', 'cede', 'cession'], domains: ['reinsurance'], modalities: [] },
  { terms: ['renewal', 'churn', 'retention', 'lapse'], domains: ['policies', 'support'], modalities: [] },
  { terms: ['pii', 'personal data', 'gdpr', 'consent'], domains: ['compliance'], modalities: [] },
  { terms: ['underwriting', 'appetite', 'guideline'], domains: ['underwriting'], modalities: ['documents'] },
  { terms: ['complaint', 'ticket', 'service'], domains: ['support'], modalities: ['tickets', 'email'] },
  { terms: ['contract', 'clause', 'wording'], domains: ['contracts'], modalities: ['documents'] },
  { terms: ['photo', 'image', 'damage'], domains: [], modalities: ['images'] },
  { terms: ['premium', 'policy', 'cover'], domains: ['policies'], modalities: [] },
  { terms: ['claim', 'fnol', 'loss'], domains: ['claims'], modalities: [] },
]

/** The openers offered before anything is typed — each one an estate question,
 * not a record question, so the screen teaches what it is for. */
export const OPENING_QUESTIONS = [
  'Do we hold anything on claim fraud?',
  'Where is broker commission data?',
  'Do we have policyholder call transcripts?',
  'Is there anything on treaty reinsurance?',
]

/**
 * Only connected sources are searchable: a source still awaiting credentials
 * has never been read, so claiming it carries anything would be a guess. This
 * is the same 34-of-38 split Overview's telemetry reports.
 */
export const searchable = (sources: Source[] = SOURCES): Source[] =>
  sources.filter(s => s.status === 'connected')

export interface DatasetHit {
  source: Source
  /** Why this dataset came back, in the estate's own vocabulary. */
  why: string
}

export interface Discovery {
  query: string
  hits: DatasetHit[]
  /** What was swept to answer, stated so the count is not a claim on trust. */
  scannedSources: number
  scannedRecords: string
}

const MAX_HITS = 4

/** Compact record counts: 4_120_800 → "4.1M". Formatting lives here so the
 * thread and the reference card can never round the same number differently. */
export const formatRecords = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000 ? `${Math.round(n / 1_000)}K`
  : String(n)

const domainName = (key: DomainKey): string => domainByKey(key)?.name ?? key

const haystack = (s: Source): string =>
  `${s.name} ${s.vendor} ${s.category} ${s.modalities.join(' ')} ${s.domains.map(domainName).join(' ')}`.toLowerCase()

/**
 * The datasets that carry a subject, richest coverage first. Readiness leads the
 * ordering, not size: the point of the answer is which dataset an agent could
 * actually use, and a 6M-row source scoring 61 is the worse place to start.
 */
export function discover(query: string, sources: Source[] = SOURCES): Discovery {
  const q = query.trim().toLowerCase()
  const pool = searchable(sources)
  const scannedRecords = formatRecords(pool.reduce((sum, s) => sum + s.records, 0))
  const base = { query: query.trim(), scannedSources: pool.length, scannedRecords }
  if (q.length < 2) return { ...base, hits: [] }

  const hits = new Map<string, DatasetHit>()

  for (const s of pool) {
    if (haystack(s).includes(q)) {
      hits.set(s.id, { source: s, why: `${domainName(s.primaryDomain)} · ${s.modalities.join(', ')}` })
    }
  }

  for (const c of CONCEPTS) {
    const term = c.terms.find(t => q.includes(t))
    if (!term) continue
    for (const s of pool) {
      const byDomain = c.domains.some(d => s.domains.includes(d))
      const byModality = c.modalities.some(m => s.modalities.includes(m))
      if (!byDomain && !byModality) continue
      // A source already matched by name keeps that reason: it is the more
      // specific of the two, and re-labelling it with the concept would tell
      // the reader less than the match they can see for themselves.
      if (hits.has(s.id)) continue
      const reason = byDomain ? domainName(s.primaryDomain) : s.modalities.filter(m => c.modalities.includes(m)).join(', ')
      hits.set(s.id, { source: s, why: `${reason} · matched on “${term}”` })
    }
  }

  const ranked = [...hits.values()]
    .sort((a, b) => b.source.readiness - a.source.readiness || b.source.records - a.source.records)
    .slice(0, MAX_HITS)

  return { ...base, hits: ranked }
}

export interface Grounded {
  question: string
  answer: string
  /** What the answer was read from — every answer carries its sources. */
  cites: string[]
}

/** Graph entities a dataset backs, as "Policyholder (48K)" strings. */
const entitiesFor = (source: Source): string[] =>
  GRAPH_NODES.filter(n => n.sourceIds.includes(source.id)).map(n => `${n.label} (${n.count})`)

/**
 * What can honestly be said about a dataset's contents from what the demo
 * actually holds: its shape, its freshness, and whether an agent could use it
 * today — that last one answered by the same red flags stage 02 raised, so the
 * two screens cannot disagree about the same dataset.
 */
export function followUps(source: Source): Grounded[] {
  const entities = entitiesFor(source)
  const flags = RED_FLAGS.filter(f => f.sourceId === source.id)
  const feeds = source.domains.map(domainName).join(', ')

  return [
    {
      question: 'What is in it?',
      answer: `${source.records.toLocaleString('en-US')} records as ${source.modalities.join(' and ')}, feeding ${feeds}.`
        + (entities.length ? ` In the graph it backs ${entities.join(', ')}.` : ''),
      cites: [source.name, ...(entities.length ? ['Knowledge graph'] : [])],
    },
    {
      question: 'How fresh is it?',
      answer: `Last synced ${source.lastSync}, ${source.status === 'connected' ? 'connected read-only' : source.status.replace('-', ' ')}.`
        + ` Freshness is one of the four inputs to its ${source.readiness}/100 readiness score.`,
      cites: [source.name, 'Agent-readiness score'],
    },
    {
      question: 'Can an agent use it today?',
      answer: flags.length
        ? `Not yet. ${flags[0].title} — ${flags[0].count.toLocaleString('en-US')} ${flags[0].unit}. ${flags[0].detail} A pipeline is proposed for it in stage 03.`
        : source.readiness >= 80
          ? `Yes — ${source.readiness}/100, above the 80 threshold, and it is already served through the gateway.`
          : `Partly. It scores ${source.readiness}/100, under the 80 threshold, so it is served but flagged as thin.`,
      cites: flags.length ? [source.name, 'Red flags · stage 02'] : [source.name, 'Agent-readiness score'],
    },
  ]
}
