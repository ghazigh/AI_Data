import { SOURCES } from './data/sources'
import { DOMAINS, TENANT, domainByKey } from './data/tenant'
import { GRAPH_EDGES, GRAPH_NODES, KNOWLEDGE_BASES, type GraphNode } from './data/graph'
import { POLICIES } from './data/governance'
import { SAMPLE_RECORDS, type EstateRecord } from './data/records'
import type { DomainKey, Modality, Source } from './data/types'

/**
 * The estate search agent — Stage 05, as the site describes it: one question in
 * plain language, the plan it derives from the knowledge graph, the datasets it
 * reads, and an answer that cites every one.
 *
 * It answers at two altitudes, and the difference is the whole point:
 *
 *   • Nothing attached — it answers *about* the data. Which knowledge bases
 *     carry the topic, which datasets hold it, how ready and how fresh they
 *     are, what governance withholds. It never claims to know what is inside.
 *   • Datasets attached — it becomes a specialist on exactly those datasets and
 *     answers from their contents (data/records.ts), citing the dataset behind
 *     every row. Asked something they don't cover, it says so and points at the
 *     datasets that would, rather than inventing an answer.
 *
 * Everything here is pure and deterministic — no clock, no random source, no
 * network. The same question and the same attachments always produce the same
 * answer, which is what lets the panel server-render and hydrate identically.
 */

export interface PlanStep {
  name: string
  detail: string
}

export interface DatasetCard {
  sourceId: string
  name: string
  vendor: string
  domainName: string
  records: number
  modalities: Modality[]
  readiness: number
  lastSync: string
  /** Illustrative scan time, derived from size so a 6M-row mart always reads
   * slower than a 20K-page wiki. Deterministic — never measured, never random. */
  scanMs: number
}

export interface EntityCard {
  id: string
  label: string
  count: string
  freshness: string
  domainName: string
}

export interface RecordHit {
  id: string
  label: string
  entityLabel: string
  fields: { name: string; value: string }[]
  /** Which attached datasets this row came from — shown under every hit. */
  cite: string
  withheld?: string
}

export interface Answer {
  /** 'coverage' answers about the data, 'content' from inside it, 'nothing'
   * when the honest answer is that this estate does not hold it. */
  kind: 'coverage' | 'content' | 'nothing'
  headline: string
  lead: string
  plan: PlanStep[]
  entities: EntityCard[]
  entitiesCaption: string
  /** Attachable datasets — where the topic lives (coverage), or what would
   * answer a question the attached datasets can't (content, nothing). */
  datasets: DatasetCard[]
  datasetsTotal: number
  datasetsCaption: string
  hits: RecordHit[]
  notes: string[]
}

/** Datasets shown per answer. More than this and the answer stops being an
 * answer and becomes the Connect screen with extra steps. */
const MAX_DATASETS = 6
const MAX_ENTITIES = 4
const MAX_HITS = 5
const MAX_NOTES = 4

// Words that appear in almost every question anyone asks a data catalogue, and
// so carry no signal about *which* data they want. "data" and "information" are
// in here for that reason: filtering on them would match the entire estate.
const STOPWORDS = new Set([
  'a', 'about', 'all', 'an', 'and', 'any', 'anything', 'are', 'around', 'ask', 'at',
  'back', 'be', 'by', 'can', 'company', 'could', 'data', 'dataset', 'datasets', 'did',
  'do', 'does', 'estate', 'find', 'for', 'from', 'get', 'give', 'got', 'has', 'have',
  'hold', 'holds', 'how', 'i', 'in', 'info', 'information', 'into', 'is', 'it', 'its',
  'know', 'let', 'list', 'lives', 'many', 'me', 'much', 'my', 'of', 'on', 'or', 'our',
  'record', 'records', 'show', 'source', 'sources', 'system', 'systems', 'tell', 'that',
  'the', 'their', 'there', 'these', 'they', 'this', 'to', 'us', 'we', 'what', 'when',
  'where', 'which', 'who', 'with', 'you', 'your',
])

/** Crude singulariser — enough to make "claims" find "claim" and "policies"
 * find "policy", which is the whole of what this needs to do. */
export function stem(word: string): string {
  const w = word.toLowerCase()
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`
  if (w.length > 3 && w.endsWith('ses')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1)
  return w
}

/** Every meaningful stem in a piece of text. */
const termsIn = (text: string): Set<string> =>
  new Set(text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map(stem))

/** The stems a question is actually asking about, in the order asked. */
export function queryTerms(question: string): string[] {
  const out: string[] = []
  for (const raw of question.toLowerCase().split(/[^a-z0-9-]+/)) {
    if (raw.length < 2) continue
    if (STOPWORDS.has(raw)) continue
    const s = stem(raw)
    if (STOPWORDS.has(s)) continue
    if (!out.includes(s)) out.push(s)
  }
  return out
}

/**
 * Business vocabulary the graph doesn't use verbatim. A CDO asks about
 * "customers" and "churn"; the ontology calls them Policyholder and Renewal.
 * Mapping the question onto the graph's own names is the first thing the agent
 * does, and the plan says so out loud.
 */
const SYNONYMS: Record<string, { entities?: string[]; domains?: DomainKey[] }> = {
  customer: { entities: ['policyholder'], domains: ['policies'] },
  client: { entities: ['policyholder'], domains: ['policies'] },
  insured: { entities: ['policyholder'], domains: ['policies'] },
  churn: { entities: ['renewal', 'complaint'], domains: ['policies', 'support'] },
  retention: { entities: ['renewal'], domains: ['policies'] },
  expiring: { entities: ['renewal', 'contract'], domains: ['policies', 'contracts'] },
  expiry: { entities: ['renewal', 'contract'], domains: ['policies', 'contracts'] },
  fraud: { entities: ['claim', 'claim-call'], domains: ['claims'] },
  siu: { entities: ['claim'], domains: ['claims'] },
  loss: { entities: ['claim', 'fnol'], domains: ['claims'] },
  settlement: { entities: ['payment'], domains: ['claims'] },
  premium: { entities: ['policy', 'quote'], domains: ['policies', 'underwriting'] },
  pricing: { entities: ['quote'], domains: ['underwriting'] },
  risk: { entities: ['peril', 'risk-inspection'], domains: ['underwriting'] },
  telematic: { entities: ['peril'], domains: ['underwriting'] },
  agent: { entities: ['broker'], domains: ['broker-network'] },
  agency: { entities: ['broker'], domains: ['broker-network'] },
  distribution: { entities: ['broker', 'submission'], domains: ['broker-network'] },
  commission: { entities: ['commission-statement'], domains: ['broker-network'] },
  reinsurer: { entities: ['treaty', 'cession'], domains: ['reinsurance'] },
  cession: { entities: ['cession'], domains: ['reinsurance'] },
  regulator: { entities: ['regulatory-filing', 'audit-finding'], domains: ['compliance'] },
  regulatory: { entities: ['regulatory-filing'], domains: ['compliance'] },
  audit: { entities: ['audit-finding'], domains: ['compliance'] },
  sanction: { entities: ['sanctions-check'], domains: ['compliance'] },
  aml: { entities: ['sanctions-check'], domains: ['compliance'] },
  complaint: { entities: ['complaint'], domains: ['support'] },
  escalation: { entities: ['complaint', 'ticket'], domains: ['support'] },
  service: { entities: ['ticket'], domains: ['support'] },
  contract: { entities: ['contract', 'broker-agreement'], domains: ['contracts'] },
  clause: { entities: ['amendment', 'broker-agreement'], domains: ['contracts'] },
  obligation: { entities: ['contract'], domains: ['contracts'] },
}

export interface Resolution {
  terms: string[]
  entities: GraphNode[]
  /** Knowledge bases the question landed in — the topic ones plus whichever
   * the matched datasets are weighted into. What the notes and the plan read. */
  domains: DomainKey[]
  /** Only the domains the *question* named, directly or through a synonym.
   * Empty when someone asked for a system by name instead of a topic. */
  topicDomains: DomainKey[]
  /** Datasets the question named outright — "anything on Guidewire?". */
  named: Source[]
  /** Connected sources that carry the topic, most relevant first. */
  sources: Source[]
  /** Catalogued but not yet readable — an honest answer has to mention these. */
  pending: Source[]
}

/** Text a source answers to: its own name, its vendor, and its modalities. */
const sourceTerms = (s: Source): Set<string> => termsIn(`${s.name} ${s.vendor} ${s.modalities.join(' ')}`)

/** Text an entity answers to: its label and the names of its properties. */
const entityTerms = (n: GraphNode): Set<string> =>
  termsIn(`${n.label} ${n.properties.map(p => p.name).join(' ')}`)

const hits = (haystack: Set<string>, terms: string[]): number =>
  terms.reduce((n, t) => (haystack.has(t) ? n + 1 : n), 0)

/**
 * Maps a question onto the graph: which entities it names, which knowledge
 * bases those sit in, and which datasets feed them.
 */
export function resolve(question: string): Resolution {
  const terms = queryTerms(question)
  const empty: Resolution = { terms, entities: [], domains: [], topicDomains: [], named: [], sources: [], pending: [] }
  if (terms.length === 0) return empty

  const entityIds = new Set<string>()
  const topic = new Set<DomainKey>()

  for (const t of terms) {
    const syn = SYNONYMS[t]
    if (syn) {
      syn.entities?.forEach(id => entityIds.add(id))
      syn.domains?.forEach(d => topic.add(d))
    }
    for (const d of DOMAINS) {
      if (termsIn(`${d.name} ${d.key.replace(/-/g, ' ')}`).has(t)) topic.add(d.key)
    }
    for (const n of GRAPH_NODES) {
      if (entityTerms(n).has(t)) entityIds.add(n.id)
    }
  }

  const entities = GRAPH_NODES.filter(n => entityIds.has(n.id))
  entities.forEach(n => topic.add(n.domain))

  const named = SOURCES.filter(s => hits(sourceTerms(s), terms) > 0)
  const topicDomains = [...topic]
  const feedsEntity = new Set(entities.flatMap(n => n.sourceIds))

  // A dataset earns its place by carrying the topic — not by sitting in a
  // domain the topic happens to touch. Naming a system scores highest, because
  // someone who typed "Guidewire" is asking about Guidewire; a source in the
  // topic's own knowledge base scores next; a source that merely feeds that
  // base as a secondary domain scores lowest and only survives alongside a
  // stronger signal. Without that last rule, "anything on Guidewire?" answers
  // with all fourteen datasets in Claims and Policies, which is not an answer.
  const score = (s: Source): number =>
    hits(sourceTerms(s), terms) * 4
    + (feedsEntity.has(s.id) ? 3 : 0)
    + (topicDomains.includes(s.primaryDomain) ? 2 : 0)
    + (s.domains.some(d => topicDomains.includes(d)) ? 1 : 0)

  const relevant = SOURCES
    .map(s => ({ s, n: score(s) }))
    .filter(x => x.n > 1)
    // Ties break on size, then on id — never on array order, so the answer is
    // stable however data/sources.ts is later reordered.
    .sort((a, b) => b.n - a.n || b.s.records - a.s.records || a.s.id.localeCompare(b.s.id))
    .map(x => x.s)

  const sources = relevant.filter(s => s.status === 'connected')
  // The knowledge bases the answer speaks in: the ones the question named, plus
  // the ones the datasets it found actually live in.
  const domains = [...new Set<DomainKey>([...topicDomains, ...sources.map(s => s.primaryDomain)])]

  return {
    terms,
    entities,
    domains,
    topicDomains,
    named: named.filter(s => s.status === 'connected'),
    sources,
    pending: relevant.filter(s => s.status === 'pending-credentials'),
  }
}

/** "4.1M", "918K", "9,400" — the vocabulary the rest of the demo counts in. */
export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${Math.round(n / 1_000)}K`
  return n.toLocaleString('en-US')
}

/** Illustrative scan time for a dataset — monotone in its size. */
const scanMsFor = (records: number): number => 24 + Math.round(Math.log10(records + 1) * 9)

export const datasetCard = (s: Source): DatasetCard => ({
  sourceId: s.id,
  name: s.name,
  vendor: s.vendor,
  domainName: domainByKey(s.primaryDomain)?.name ?? s.primaryDomain,
  records: s.records,
  modalities: s.modalities,
  readiness: s.readiness,
  lastSync: s.lastSync,
  scanMs: scanMsFor(s.records),
})

const entityCard = (n: GraphNode): EntityCard => ({
  id: n.id,
  label: n.label,
  count: n.count,
  freshness: n.freshness,
  domainName: domainByKey(n.domain)?.name ?? n.domain,
})

/** How the answer names what was asked about — graph vocabulary, not the
 * operator's, since naming the entity is what proves the graph resolved it.
 * A question that named systems instead of a topic is named back the same way. */
function topicLabel(r: Resolution, question: string): string {
  if (r.entities.length) return r.entities.slice(0, 3).map(e => e.label.toLowerCase()).join(', ')
  if (r.topicDomains.length) return r.topicDomains.map(d => domainByKey(d)?.name.toLowerCase() ?? d).slice(0, 3).join(', ')
  if (r.named.length) {
    const vendors = [...new Set(r.named.map(s => s.vendor))]
    return vendors.length === 1 ? vendors[0] : r.named.slice(0, 3).map(s => s.name).join(', ')
  }
  return question.trim().toLowerCase()
}

/** Up to three hops out of a matched entity — the traversal the agent used,
 * written the way the graph screen writes lineage. Hops toward another entity
 * the question named where one exists, since that is the path it actually
 * needed; only otherwise does it follow the first edge out. */
function walk(from: GraphNode, matched: GraphNode[]): string {
  const wanted = new Set(matched.map(n => n.id))
  const path = [from.label.toLowerCase()]
  let current = from.id
  for (let hop = 0; hop < 2; hop++) {
    const out = GRAPH_EDGES.filter(e => e.from === current && !path.includes(nodeLabel(e.to)))
    const edge = out.find(e => wanted.has(e.to)) ?? out[0]
    if (!edge) break
    path.push(nodeLabel(edge.to))
    current = edge.to
  }
  return path.join(' → ')
}

const nodeLabel = (id: string): string => GRAPH_NODES.find(n => n.id === id)?.label.toLowerCase() ?? id

/** What an honest answer has to admit about the datasets it just named. */
function gapsFor(r: Resolution, datasets: Source[]): string[] {
  const notes: string[] = []

  const stale = datasets.filter(s => /days ago|yesterday/.test(s.lastSync))
  if (stale.length) {
    notes.push(`${stale[0].name} last synced ${stale[0].lastSync} — the graph is that far behind on it${stale.length > 1 ? `, and on ${stale.length - 1} more` : ''}.`)
  }

  if (r.pending.length) {
    notes.push(`${r.pending[0].name} is catalogued but still awaiting credentials — nothing from it is in the graph yet.`)
  }

  const weak = r.domains
    .flatMap(key => {
      const domain = domainByKey(key)
      return domain && domain.score < 70 ? [domain] : []
    })
    .sort((a, b) => a.score - b.score)[0]
  if (weak) {
    notes.push(`${weak.name} scores ${weak.score} for agent-readiness — under the 70 an agent needs. Stage 03 has the pipelines that lift it.`)
  }

  const pii = POLICIES.find(p => p.id === 'pol-pii')
  if (pii) notes.push(`${pii.rule} — enforced on ${pii.enforcedOn} before any agent reads them.`)

  return notes.slice(0, MAX_NOTES)
}

const EMPTY: Omit<Answer, 'kind' | 'headline' | 'lead'> = {
  plan: [], entities: [], entitiesCaption: '', datasets: [], datasetsTotal: 0, datasetsCaption: '', hits: [], notes: [],
}

/** Nothing in the estate matches — said plainly, with what it does cover. */
function nothingInEstate(question: string): Answer {
  return {
    ...EMPTY,
    kind: 'nothing',
    headline: `Nothing in this estate matches “${question.trim()}”.`,
    lead: `The graph resolved no entity, no knowledge base and no dataset for it. It is not hiding — ${TENANT.name} does not hold it.`,
    notes: [
      `The ${KNOWLEDGE_BASES.length} knowledge bases are ${KNOWLEDGE_BASES.map(k => k.name).join(', ')}.`,
      'You can also ask by system name — Guidewire, Snowflake, Zendesk, Salesforce.',
    ],
  }
}

/** The estate answer: what is held about a topic, never what is inside it. */
function coverageAnswer(question: string, r: Resolution): Answer {
  const shown = r.sources.slice(0, MAX_DATASETS)
  const records = r.sources.reduce((n, s) => n + s.records, 0)
  const modalities = new Set(r.sources.flatMap(s => s.modalities))
  const kbs = r.domains.flatMap(key => {
    const kb = KNOWLEDGE_BASES.find(k => k.domain === key)
    return kb ? [kb] : []
  })
  const label = topicLabel(r, question)
  const entities = (r.entities.length ? r.entities : GRAPH_NODES.filter(n => r.domains.includes(n.domain)))
    .slice(0, MAX_ENTITIES)

  const plan: PlanStep[] = [
    {
      name: 'resolve the question',
      detail: kbs.length
        ? `“${label}” → ${kbs.map(k => k.name).join(', ')} · ${kbs.map(k => k.entities).join(' + ')} entities`
        : `“${label}” → ${r.sources.length} matching systems`,
    },
    {
      name: 'traverse the graph',
      detail: entities.length ? walk(entities[0], entities) : 'no entity path — matched on system names only',
    },
    {
      name: 'locate the datasets',
      detail: `${r.sources.length} datasets · ${formatCompact(records)} records · ${modalities.size} modalities · policy-filtered`,
    },
  ]

  return {
    kind: 'coverage',
    headline: `Found ${label} in ${r.sources.length} connected ${r.sources.length === 1 ? 'dataset' : 'datasets'} — ${formatCompact(records)} records across ${modalities.size} ${modalities.size === 1 ? 'modality' : 'modalities'}.`,
    lead: 'That is what the estate holds about it, read from the graph — not what is inside it. Attach a dataset and the agent becomes a specialist on its contents.',
    plan,
    entities: entities.map(entityCard),
    entitiesCaption: 'What the graph resolved',
    datasets: shown.map(datasetCard),
    datasetsTotal: r.sources.length,
    datasetsCaption: 'Where it lives',
    hits: [],
    notes: gapsFor(r, shown),
  }
}

/**
 * How well a record answers the question. Quoting its business key is decisive;
 * matching a tag or a field is strong; matching only the entity type it happens
 * to be is weak, because every claim in the dataset matches the word "claim".
 * Without that last distinction, "which claims are in litigation" returns every
 * claim — the one thing worse than no answer is a confident wrong one.
 */
function recordScore(rec: EstateRecord, terms: string[]): number {
  const id = rec.id.toLowerCase()
  const strong = termsIn(`${rec.tags.join(' ')} ${rec.fields.map(f => `${f.name} ${f.value}`).join(' ')}`)
  const weak = termsIn(`${rec.label} ${nodeLabel(rec.entityId)}`)
  let score = 0
  for (const t of terms) {
    if (t === id) score += 10
    else if (strong.has(t)) score += 3
    else if (weak.has(t)) score += 1
  }
  return score
}

/** The specialist answer: read from the attached datasets, cited to them. */
function contentAnswer(question: string, attached: Source[]): Answer {
  const attachedIds = attached.map(s => s.id)
  const names = attached.map(s => s.name)
  const scope = SAMPLE_RECORDS.filter(rec => rec.sourceIds.some(id => attachedIds.includes(id)))
  const r = resolve(question)
  const scored = scope.map(rec => ({ rec, n: recordScore(rec, r.terms) })).filter(x => x.n > 0)
  // Only the closest matches. A question that names one claim gets that claim
  // back, not the four the word "claim" also touches.
  const best = scored.reduce((max, x) => Math.max(max, x.n), 0)
  const matched = scored.filter(x => x.n === best).map(x => x.rec).slice(0, MAX_HITS)
  const inScope = attached.reduce((n, s) => n + s.records, 0)

  if (matched.length) {
    const withheld = matched.filter(rec => rec.withheld)
    const entities = GRAPH_NODES.filter(n => matched.some(rec => rec.entityId === n.id)).slice(0, MAX_ENTITIES)
    return {
      ...EMPTY,
      kind: 'content',
      headline: `${matched.length} ${matched.length === 1 ? 'record' : 'records'} in the attached data ${matched.length === 1 ? 'answers' : 'answer'} that.`,
      lead: `Read from ${names.join(' and ')}. Every row cites the dataset it came from.`,
      plan: [
        { name: 'resolve the question', detail: `“${topicLabel(r, question)}” → ${entities.map(e => e.label.toLowerCase()).join(', ') || 'attached records'}` },
        { name: 'read the attached data', detail: `${attached.length} ${attached.length === 1 ? 'dataset' : 'datasets'} · ${formatCompact(inScope)} records in scope · ${attached.reduce((ms, s) => ms + scanMsFor(s.records), 0)} ms` },
        { name: 'apply policy', detail: withheld.length ? `${withheld.length} ${withheld.length === 1 ? 'record' : 'records'} partly withheld` : 'row and column policy applied · nothing withheld' },
      ],
      entities: entities.map(entityCard),
      entitiesCaption: 'Entities behind these rows',
      hits: matched.map(rec => ({
        id: rec.id,
        label: rec.label,
        entityLabel: nodeLabel(rec.entityId),
        fields: rec.fields,
        cite: rec.sourceIds
          .filter(id => attachedIds.includes(id))
          .map(id => attached.find(s => s.id === id)?.name ?? id)
          .join(' · '),
        withheld: rec.withheld,
      })),
      notes: withheld.map(rec => `${rec.id}: ${rec.withheld}`).slice(0, MAX_NOTES),
    }
  }

  // Nothing matched inside what is attached. The one thing the agent must not
  // do here is answer anyway — so it says what the attached data does cover,
  // and offers the datasets that would answer the question instead.
  const elsewhere = r.sources.filter(s => !attachedIds.includes(s.id))
  const covered = GRAPH_NODES.filter(n => scope.some(rec => rec.entityId === n.id)).slice(0, MAX_ENTITIES)

  return {
    ...EMPTY,
    kind: 'nothing',
    headline: `Nothing in the attached data answers that.`,
    lead: elsewhere.length
      ? `${names.join(' and ')} ${names.length === 1 ? 'does' : 'do'} not carry it. The estate does — in ${elsewhere.length} ${elsewhere.length === 1 ? 'dataset' : 'datasets'} you have not attached.`
      : `${names.join(' and ')} ${names.length === 1 ? 'does' : 'do'} not carry it, and neither does anything else in the estate.`,
    entities: covered.map(entityCard),
    entitiesCaption: 'What the attached data does cover',
    datasets: elsewhere.slice(0, MAX_DATASETS).map(datasetCard),
    datasetsTotal: elsewhere.length,
    datasetsCaption: 'Attach one of these instead',
    notes: ['The specialist answers only from what you attach. It will not fill a gap from the model’s own memory.'],
  }
}

/**
 * The one entry point the panel calls. `attachedIds` decides the altitude:
 * empty means answer about the data, non-empty means answer from it.
 */
export function answerQuestion(question: string, attachedIds: string[]): Answer {
  const attached = SOURCES.filter(s => attachedIds.includes(s.id))
  if (attached.length > 0) return contentAnswer(question, attached)

  const r = resolve(question)
  if (!r.entities.length && !r.domains.length && !r.sources.length) return nothingInEstate(question)
  return coverageAnswer(question, r)
}

/** Openers offered on an empty thread — one per altitude the agent works at:
 * a topic, a business question, and a system by name. */
export const SUGGESTED_QUESTIONS: string[] = [
  'What data do we have about claims?',
  'Where does policy renewal information live?',
  'What do we hold on brokers and their submissions?',
]
