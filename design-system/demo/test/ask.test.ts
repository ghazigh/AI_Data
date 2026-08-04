import { describe, it, expect } from 'vitest'
import { answerQuestion, queryTerms, resolve, formatCompact, SUGGESTED_QUESTIONS } from '../ask'
import { SAMPLE_RECORDS } from '../data/records'
import { SOURCES } from '../data/sources'
import { GRAPH_NODES, KNOWLEDGE_BASES } from '../data/graph'

describe('queryTerms', () => {
  it('drops the words every question contains', () => {
    expect(queryTerms('What data do we have about claims?')).toEqual(['claim'])
  })

  it('singularises so a plural question finds a singular entity', () => {
    expect(queryTerms('policies')).toEqual(['policy'])
    expect(queryTerms('brokers')).toEqual(['broker'])
  })

  it('keeps a business key intact', () => {
    expect(queryTerms('what is the reserve on CL-88533')).toContain('cl-88533')
  })

  it('returns nothing for a question made entirely of filler', () => {
    expect(queryTerms('what data do we have')).toEqual([])
  })
})

describe('resolve', () => {
  it('maps a topic onto the graph entities that carry it', () => {
    const r = resolve('claims')
    expect(r.entities.map(e => e.id)).toContain('claim')
    expect(r.domains).toContain('claims')
    expect(r.sources.length).toBeGreaterThan(0)
    expect(r.sources.every(s => s.status === 'connected')).toBe(true)
  })

  it('translates business vocabulary the ontology does not use', () => {
    expect(resolve('customers').entities.map(e => e.id)).toContain('policyholder')
    expect(resolve('fraud').domains).toContain('claims')
  })

  it('keeps a question about one system to that system', () => {
    // The failure this guards: scoring a source for merely sitting in a domain
    // the named system touches answers "anything on Guidewire?" with all
    // fourteen datasets in Claims and Policies.
    const r = resolve('anything on Guidewire?')
    expect(r.sources.map(s => s.id).sort()).toEqual(['guidewire-cc', 'guidewire-pc'])
  })

  it('surfaces sources awaiting credentials separately from readable ones', () => {
    const r = resolve('compliance')
    expect(r.sources.some(s => s.status === 'pending-credentials')).toBe(false)
    expect(r.pending.every(s => s.status === 'pending-credentials')).toBe(true)
  })
})

describe('answering about the data', () => {
  const answer = answerQuestion('What data do we have about claims?', [])

  it('answers with datasets, never with their contents', () => {
    expect(answer.kind).toBe('coverage')
    expect(answer.datasets.length).toBeGreaterThan(0)
    expect(answer.hits).toEqual([])
  })

  it('counts what it found in the headline', () => {
    expect(answer.headline).toContain(`${answer.datasetsTotal} connected datasets`)
  })

  it('shows the plan it derived from the graph', () => {
    expect(answer.plan.map(p => p.name)).toEqual([
      'resolve the question', 'traverse the graph', 'locate the datasets',
    ])
  })

  it('names the entities the graph resolved', () => {
    expect(answer.entities.map(e => e.label)).toContain('Claim')
  })

  it('says what governance withholds before an agent reads anything', () => {
    expect(answer.notes.join(' ')).toMatch(/mask/i)
  })

  it('admits a dataset the graph is behind on', () => {
    const stale = answerQuestion('policy renewals', [])
    expect(stale.notes.join(' ')).toMatch(/last synced/i)
  })

  it('caps the datasets it lists but never the count it reports', () => {
    const wide = answerQuestion('claims', [])
    expect(wide.datasets.length).toBeLessThanOrEqual(6)
    expect(wide.datasetsTotal).toBeGreaterThanOrEqual(wide.datasets.length)
  })

  it('says so plainly when the estate holds nothing on the topic', () => {
    const none = answerQuestion('photosynthesis', [])
    expect(none.kind).toBe('nothing')
    expect(none.datasets).toEqual([])
    expect(none.hits).toEqual([])
    // It has to leave the operator somewhere to go next.
    expect(none.notes.join(' ')).toContain(KNOWLEDGE_BASES[0].name)
  })

  it('offers every dataset it names as something to attach', () => {
    for (const d of answer.datasets) {
      const source = SOURCES.find(s => s.id === d.sourceId)
      expect(source, d.sourceId).toBeDefined()
      expect(source!.status).toBe('connected')
    }
  })

  it('times a bigger dataset as slower than a smaller one', () => {
    const big = answerQuestion('claims', []).datasets
    const sorted = [...big].sort((a, b) => a.records - b.records)
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].scanMs).toBeGreaterThanOrEqual(sorted[i - 1].scanMs)
    }
  })
})

describe('answering from the data', () => {
  it('reads the attached dataset and cites it on every row', () => {
    const a = answerQuestion('which claims are in litigation', ['guidewire-cc'])
    expect(a.kind).toBe('content')
    expect(a.hits.map(h => h.id)).toEqual(['CL-77310'])
    expect(a.hits[0].cite).toContain('Guidewire ClaimCenter')
    expect(a.hits[0].fields.length).toBeGreaterThan(0)
  })

  it('reports what a policy held back rather than quietly dropping it', () => {
    const a = answerQuestion('claims in litigation', ['guidewire-cc'])
    expect(a.hits[0].withheld).toMatch(/withheld/i)
    expect(a.notes.join(' ')).toContain('CL-77310')
    expect(a.plan[2].detail).toMatch(/withheld/i)
  })

  it('returns the one record a question names, not every record of its type', () => {
    const a = answerQuestion('what is the reserve on CL-88533', ['guidewire-cc', 'snowflake-claims-mart'])
    expect(a.hits.map(h => h.id)).toEqual(['CL-88533'])
  })

  it('cites only the attached datasets a record lives in', () => {
    const a = answerQuestion('CL-88533', ['snowflake-claims-mart'])
    expect(a.hits[0].cite).toBe('Snowflake Claims Mart')
  })

  it('refuses what the attached data cannot answer, and says where it lives', () => {
    const a = answerQuestion('which brokers have stalled submissions', ['guidewire-cc'])
    expect(a.kind).toBe('nothing')
    expect(a.hits).toEqual([])
    expect(a.headline).toMatch(/nothing in the attached data/i)
    expect(a.datasets.length).toBeGreaterThan(0)
    expect(a.datasets.map(d => d.sourceId)).not.toContain('guidewire-cc')
    expect(a.notes.join(' ')).toMatch(/only from what you attach/i)
  })

  it('does not invent a dataset when nothing in the estate covers it either', () => {
    const a = answerQuestion('photosynthesis', ['guidewire-cc'])
    expect(a.kind).toBe('nothing')
    expect(a.datasets).toEqual([])
    expect(a.lead).toMatch(/neither does anything else/i)
  })

  it('widens as more datasets are attached', () => {
    const one = answerQuestion('broker commission', ['applied-epic'])
    const none = answerQuestion('broker commission', ['guidewire-cc'])
    expect(one.kind).toBe('content')
    expect(none.kind).toBe('nothing')
  })
})

describe('the answer is deterministic', () => {
  it('produces identical output for identical input', () => {
    // The panel server-renders and hydrates; an answer that varied between the
    // two would be a hydration mismatch, not a quirk.
    expect(answerQuestion('claims', [])).toEqual(answerQuestion('claims', []))
    expect(answerQuestion('litigation', ['guidewire-cc'])).toEqual(answerQuestion('litigation', ['guidewire-cc']))
  })

  it('answers every suggested question with something', () => {
    for (const q of SUGGESTED_QUESTIONS) {
      const a = answerQuestion(q, [])
      expect(a.kind, q).toBe('coverage')
      expect(a.datasets.length, q).toBeGreaterThan(0)
    }
  })
})

describe('formatCompact', () => {
  it('counts in the vocabulary the rest of the demo uses', () => {
    expect(formatCompact(4_120_800)).toBe('4.1M')
    expect(formatCompact(918_400)).toBe('918K')
    expect(formatCompact(9_400)).toBe('9,400')
  })
})

describe('the sample records', () => {
  it('all sit on a real graph entity', () => {
    for (const r of SAMPLE_RECORDS) {
      expect(GRAPH_NODES.some(n => n.id === r.entityId), r.id).toBe(true)
    }
  })

  it('all live in real, connected datasets', () => {
    for (const r of SAMPLE_RECORDS) {
      expect(r.sourceIds.length, r.id).toBeGreaterThan(0)
      for (const id of r.sourceIds) {
        const source = SOURCES.find(s => s.id === id)
        expect(source, `${r.id} → ${id}`).toBeDefined()
        expect(source!.status, `${r.id} → ${id}`).toBe('connected')
      }
    }
  })

  it('sit in the domain their entity belongs to', () => {
    for (const r of SAMPLE_RECORDS) {
      expect(GRAPH_NODES.find(n => n.id === r.entityId)!.domain, r.id).toBe(r.domain)
    }
  })

  it('quote a governance policy wherever they withhold something', () => {
    for (const r of SAMPLE_RECORDS.filter(r => r.withheld)) {
      expect(r.withheld, r.id).toMatch(/policy/i)
    }
  })

  it('uses ids no two records share', () => {
    expect(new Set(SAMPLE_RECORDS.map(r => r.id)).size).toBe(SAMPLE_RECORDS.length)
  })
})
