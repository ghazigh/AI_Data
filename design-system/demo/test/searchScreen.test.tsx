import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Search } from '../screens/Search'
import { DemoStateProvider } from '../state'
import { discover, followUps, OPENING_QUESTIONS } from '../data/discovery'
import { SOURCES } from '../data/sources'

/** The screen reads session state for what is connected, so it renders inside
 * the provider exactly as the app mounts it. */
const renderSearch = () => render(<DemoStateProvider><Search /></DemoStateProvider>)

const ask = (text: string) => {
  fireEvent.change(screen.getByLabelText(/ask what data you have/i), { target: { value: text } })
  fireEvent.click(screen.getByRole('button', { name: 'Ask' }))
}

describe('dataset discovery', () => {
  it('answers a subject with the datasets that carry it, not with records', () => {
    const found = discover('claim fraud')
    expect(found.hits.length).toBeGreaterThan(0)
    for (const hit of found.hits) {
      expect(SOURCES).toContain(hit.source)
    }
  })

  it('reaches the estate through business vocabulary no source is named after', () => {
    // Nothing in SOURCES contains "fraud"; claim photography and claim call
    // transcripts are where the signal lives, and that is what must come back.
    expect(SOURCES.some(s => s.name.toLowerCase().includes('fraud'))).toBe(false)
    expect(discover('fraud').hits.length).toBeGreaterThan(0)
  })

  it('ranks the most usable dataset first, not the largest', () => {
    const hits = discover('claims').hits
    const scores = hits.map(h => h.source.readiness)
    expect([...scores].sort((a, b) => b - a)).toEqual(scores)
  })

  it('returns nothing rather than a guess for a subject the estate lacks', () => {
    expect(discover('sourdough starter').hits).toHaveLength(0)
  })

  it('cites something on every grounded answer', () => {
    for (const f of followUps(SOURCES[0])) {
      expect(f.cites.length).toBeGreaterThan(0)
      expect(f.answer.length).toBeGreaterThan(0)
    }
  })
})

describe('Search screen', () => {
  it('offers estate questions before anything is typed', () => {
    renderSearch()
    for (const q of OPENING_QUESTIONS) {
      expect(screen.getByRole('button', { name: q })).toBeDefined()
    }
  })

  it('answers an opener with datasets, each showing where it lives', () => {
    renderSearch()
    fireEvent.click(screen.getByRole('button', { name: OPENING_QUESTIONS[0] }))
    const top = discover(OPENING_QUESTIONS[0]).hits[0].source
    expect(screen.getByText(top.name)).toBeDefined()
    expect(screen.getByText(new RegExp(`${top.vendor} · .* records`))).toBeDefined()
  })

  it('says so when the estate holds nothing on the subject', () => {
    renderSearch()
    ask('sourdough starter')
    expect(screen.getByText(/nothing in this estate carries that/i)).toBeDefined()
  })

  it('attaches a result as the reference and answers from it', () => {
    renderSearch()
    fireEvent.click(screen.getByRole('button', { name: OPENING_QUESTIONS[0] }))
    const top = discover(OPENING_QUESTIONS[0]).hits[0].source
    fireEvent.click(screen.getAllByRole('button', { name: 'Use as reference' })[0])

    // the composer now reads that dataset rather than searching the estate
    expect(screen.getByLabelText(`Ask about ${top.name}`)).toBeDefined()
    expect(screen.getByText(/is the reference now/)).toBeDefined()
    // and offers what can be asked about it
    for (const f of followUps(top)) {
      expect(screen.getByRole('button', { name: f.question })).toBeDefined()
    }
  })

  it('answers a follow-up about the attached dataset with its sources named', () => {
    renderSearch()
    fireEvent.click(screen.getByRole('button', { name: OPENING_QUESTIONS[0] }))
    const top = discover(OPENING_QUESTIONS[0]).hits[0].source
    fireEvent.click(screen.getAllByRole('button', { name: 'Use as reference' })[0])

    fireEvent.click(screen.getByRole('button', { name: /can an agent use it today/i }))
    const expected = followUps(top)[2]
    expect(screen.getByText(expected.answer)).toBeDefined()
    expect(screen.getAllByText(new RegExp(`read · ${expected.cites[0]}`)).length).toBeGreaterThan(0)
  })

  it('does not invent an answer to a question the dataset cannot support', () => {
    renderSearch()
    fireEvent.click(screen.getByRole('button', { name: OPENING_QUESTIONS[0] }))
    const top = discover(OPENING_QUESTIONS[0]).hits[0].source
    fireEvent.click(screen.getAllByRole('button', { name: 'Use as reference' })[0])

    fireEvent.change(screen.getByLabelText(`Ask about ${top.name}`), {
      target: { value: 'how many claims were fraudulent in 2024?' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ask' }))
    expect(screen.getByText(/knows the dataset.s shape, not its rows/i)).toBeDefined()
  })

  it('detaches the reference and goes back to searching the estate', () => {
    renderSearch()
    fireEvent.click(screen.getByRole('button', { name: OPENING_QUESTIONS[0] }))
    fireEvent.click(screen.getAllByRole('button', { name: 'Use as reference' })[0])
    fireEvent.click(screen.getByRole('button', { name: /^Detach / }))
    expect(screen.getByLabelText(/ask what data you have/i)).toBeDefined()
  })
})
