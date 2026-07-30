// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ESTATE, DOMAINS } from '../data/tenant'
import { SOURCES, estateScore } from '../data/sources'
import { RED_FLAGS } from '../data/readiness'
import { PLAN } from '../data/pipelines'
import { USE_CASES } from '../data/useCases'
import { GRAPH_NODES, KNOWLEDGE_BASES, parseCount, nodesForDomain } from '../data/graph'
import { AGENTS, AUDIT, POLICIES } from '../data/governance'
import { ACTIVITY } from '../data/activity'
import { MODALITY_PIPELINES, sourcesForModality } from '../data/modalities'
import { GRAPH_PIPELINES } from '../data/graphPipelines'
import { allEntries, entryById } from '../data/pipelineCatalogue'
import { RUN_HISTORY } from '../data/runHistory'
import type { Modality } from '../data/types'

const DEMO = new URL('..', import.meta.url).pathname

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return name === 'test' ? [] : walk(p)
    return /\.(ts|tsx)$/.test(name) ? [p] : []
  })
}

describe('determinism', () => {
  const files = walk(DEMO)

  it('never calls Math.random', () => {
    for (const f of files) {
      expect(readFileSync(f, 'utf8').includes('Math.random'), f).toBe(false)
    }
  })

  it('never reads a clock inside the data layer', () => {
    for (const f of files.filter(f => f.includes('/data/'))) {
      const src = readFileSync(f, 'utf8')
      expect(src.includes('Date.now'), f).toBe(false)
      expect(src.includes('new Date'), f).toBe(false)
    }
  })
})

describe('the numbers agree across screens', () => {
  it('derives the headline score from the domains', () => {
    expect(estateScore()).toBe(ESTATE.score)
  })

  it('matches the connected source count to the headline', () => {
    expect(SOURCES.filter(s => s.status === 'connected')).toHaveLength(ESTATE.sourcesConnected)
  })

  it('quotes the same duplicate count in the red flag and the pipeline step', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('Duplicate'))!
    const step = PLAN.find(s => s.kind === 'resolve')!
    expect(step.count).toBe(flag.count)
  })

  it('quotes the same column count for typing', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('Untyped'))!
    expect(PLAN.find(s => s.kind === 'type')!.count).toBe(flag.count)
  })

  it('quotes the same masking count', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('PII'))!
    expect(PLAN.find(s => s.kind === 'mask')!.count).toBe(flag.count)
  })

  it('quotes the same chunking count', () => {
    const flag = RED_FLAGS.find(f => f.title.includes('unchunked'))!
    expect(PLAN.find(s => s.kind === 'chunk')!.count).toBe(flag.count)
  })

  it('gives every domain a knowledge base and vice versa', () => {
    expect(KNOWLEDGE_BASES.map(k => k.domain).sort()).toEqual(DOMAINS.map(d => d.key).sort())
  })

  it('scores each knowledge base the same as its domain', () => {
    for (const kb of KNOWLEDGE_BASES) {
      expect(kb.score, kb.name).toBe(DOMAINS.find(d => d.key === kb.domain)!.score)
    }
  })

  it('sums the knowledge base entity counts to the estate total', () => {
    const total = KNOWLEDGE_BASES.reduce((sum, kb) => sum + parseCount(kb.entities), 0)
    expect(total).toBe(parseCount(ESTATE.entitiesResolved))
  })

  it('matches each knowledge base entity count to the sum of its own graph nodes', () => {
    for (const kb of KNOWLEDGE_BASES) {
      const nodeSum = nodesForDomain(kb.domain).reduce((sum, n) => sum + parseCount(n.count), 0)
      expect(nodeSum, kb.name).toBe(parseCount(kb.entities))
    }
  })

  it('covers every domain with at least one graph node', () => {
    const covered = new Set(GRAPH_NODES.map(n => n.domain))
    for (const d of DOMAINS) expect(covered.has(d.key), d.name).toBe(true)
  })

  it('cites only sources that serve the node\'s own domain', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const n of GRAPH_NODES) {
      for (const id of n.sourceIds) {
        const source = byId.get(id)!
        expect(source.domains, `${n.label} cites ${id}, which does not serve ${n.domain}`)
          .toContain(n.domain)
      }
    }
  })

  it('matches audit denials to the headline denial count', () => {
    expect(AUDIT.filter(e => e.decision === 'denied')).toHaveLength(ESTATE.agentCallsDenied)
  })

  it('sums per-agent denials to the same total', () => {
    expect(AGENTS.reduce((n, a) => n + a.denials, 0)).toBe(ESTATE.agentCallsDenied)
  })

  it('logs only agents that are registered', () => {
    const ids = new Set(AGENTS.map(a => a.id))
    for (const e of AUDIT) expect(ids.has(e.agentId), e.agentId).toBe(true)
  })

  it('blocks use cases only on domains below 70', () => {
    for (const u of USE_CASES.filter(u => u.status === 'blocked')) {
      expect(DOMAINS.find(d => d.key === u.blockedBy)!.score).toBeLessThan(70)
    }
  })

  it('claims only operations the cited source can support', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    const NEEDS: { pattern: RegExp; modality: Modality }[] = [
      { pattern: /column/i, modality: 'tables' },
      { pattern: /chunk/i, modality: 'documents' },
      { pattern: /transcrib/i, modality: 'transcripts' },
      { pattern: /ticket/i, modality: 'tickets' },
    ]
    for (const a of ACTIVITY) {
      const source = byId.get(a.sourceId)!
      const text = `${a.subject} ${a.detail}`
      for (const { pattern, modality } of NEEDS) {
        if (!pattern.test(text)) continue
        expect(source.modalities, `"${a.detail}" cites ${a.sourceId}, which has no ${modality}`)
          .toContain(modality)
      }
    }
  })

  it('agrees with the source\'s lastSync on staleness', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const f of RED_FLAGS) {
      if (f.unit !== 'days stale') continue
      const source = byId.get(f.sourceId)!
      expect(source.lastSync, `${f.title} claims ${f.count} days stale but ${source.name}'s lastSync reads "${source.lastSync}"`)
        .toBe(`${f.count} days ago`)
    }
  })

  it('never claims more records or documents than the source holds', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const f of RED_FLAGS) {
      if (f.unit !== 'records' && f.unit !== 'documents') continue
      const source = byId.get(f.sourceId)!
      expect(f.count, `${f.title} claims ${f.count} ${f.unit} from ${source.name}, which holds ${source.records}`)
        .toBeLessThan(source.records)
    }
  })

  it('never claims more entities for a graph node than its cited sources hold', () => {
    const byId = new Map(SOURCES.map(s => [s.id, s]))
    for (const n of GRAPH_NODES) {
      const capacity = n.sourceIds.reduce((sum, id) => sum + (byId.get(id)?.records ?? 0), 0)
      expect(parseCount(n.count), `${n.label} claims ${n.count} but its cited sources hold only ${capacity} records`)
        .toBeLessThanOrEqual(capacity)
    }
  })

  it('names only registered agents in policy scope text', () => {
    const ids = new Set(AGENTS.map(a => a.id))
    const AGENT_ID = /[a-z]+-[a-z]+(?:-\d+)?/g
    for (const p of POLICIES) {
      const mentioned = p.applies.match(AGENT_ID) ?? []
      for (const token of mentioned) {
        expect(ids.has(token), `policy "${p.rule}" names ${token}, which is not a registered agent`).toBe(true)
      }
    }
  })

  it('lists only modalities at least one connected source declares', () => {
    const declared = new Set(SOURCES.filter(s => s.status === 'connected').flatMap(s => s.modalities))
    for (const p of MODALITY_PIPELINES) {
      expect(declared.has(p.modality), `${p.label} has no connected source declaring it`).toBe(true)
    }
  })

  it('never claims less volume than its single-modality sources alone hold', () => {
    for (const p of MODALITY_PIPELINES) {
      const floor = sourcesForModality(p.modality)
        .filter(s => s.modalities.length === 1)
        .reduce((n, s) => n + s.records, 0)
      expect(p.volume, `${p.label} claims ${p.volume} but its exclusive sources hold ${floor}`)
        .toBeGreaterThanOrEqual(floor)
    }
  })

  it('derives the graph\'s knowledge bases from the clustering that found them', () => {
    const construct = GRAPH_PIPELINES.find(p => p.id === 'construct')!
    expect(construct.topicsAfter).toBe(KNOWLEDGE_BASES.length)
    expect(construct.topicsAfter).toBe(DOMAINS.length)
  })

  it('cites only real catalogue entries in the run history', () => {
    for (const h of RUN_HISTORY) {
      expect(entryById(h.entryId), `${h.id} cites unknown entry "${h.entryId}"`).toBeDefined()
    }
  })

  it('matches the run history\'s kind to its cited catalogue entry\'s kind', () => {
    for (const h of RUN_HISTORY) {
      const entry = entryById(h.entryId)!
      expect(h.kind, `${h.id} claims kind "${h.kind}" but ${h.entryId} is "${entry.kind}"`).toBe(entry.kind)
    }
  })

  it('matches the run history\'s entryName to its cited catalogue entry\'s name', () => {
    for (const h of RUN_HISTORY) {
      const entry = entryById(h.entryId)!
      expect(h.entryName, `${h.id} names "${h.entryName}" but ${h.entryId} is "${entry.name}"`).toBe(entry.name)
    }
  })

  // lastRun must be structurally incapable of disagreeing with RUN_HISTORY: it is
  // derived as the finished value of this entry's most recent RUN_HISTORY record
  // (successful, failed or cancelled — "last run" means the last time it ran, not
  // just the last time it succeeded), or 'Not yet run' when no record exists.
  it("derives every entry's lastRun from its RUN_HISTORY record instead of a hand-authored string", () => {
    for (const e of allEntries()) {
      const record = RUN_HISTORY.find(h => h.entryId === e.id)
      const expected = record?.finished ?? 'Not yet run'
      expect(e.lastRun, e.name).toBe(expected)
    }
  })

  it("never claims 'Not yet run' for an entry that has a RUN_HISTORY record", () => {
    for (const h of RUN_HISTORY) {
      const entry = entryById(h.entryId)!
      expect(entry.lastRun, `${entry.name} has run ${h.id} on record but still reads 'Not yet run'`).not.toBe('Not yet run')
    }
  })
})
