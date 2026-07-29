import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { ModalityPanel } from '../components/ModalityPanel'
import { MODALITY_PIPELINES, sourcesForModality } from '../data/modalities'

describe('ModalityPanel', () => {
  it('names the insight the panel exists to make', () => {
    render(<ModalityPanel />)
    expect(screen.getByRole('region', { name: /two shapes an agent can read/i })).toBeDefined()
  })

  it('shows one row per modality with its real source count', () => {
    render(<ModalityPanel />)
    const rows = screen.getAllByRole('listitem')
    expect(rows).toHaveLength(MODALITY_PIPELINES.length)
    // Scoped per row on purpose: transcripts, streams and email all have 6
    // sources, so an unscoped getByText('6 sources') matches three elements
    // and throws. Rows render in MODALITY_PIPELINES order — the panel does
    // not re-sort — so index alignment holds.
    for (const [i, p] of MODALITY_PIPELINES.entries()) {
      const n = sourcesForModality(p.modality).length
      expect(within(rows[i]).getByText(new RegExp(`${n} sources?`)), p.label).toBeDefined()
    }
  })

  it('shows every stage name in the chain', () => {
    render(<ModalityPanel />)
    const docs = MODALITY_PIPELINES.find(p => p.modality === 'documents')!
    for (const stage of docs.stages) {
      expect(screen.getAllByText(stage.name).length).toBeGreaterThan(0)
    }
  })

  it('says what an agent ends up with', () => {
    render(<ModalityPanel />)
    for (const p of MODALITY_PIPELINES) {
      expect(screen.getByText(p.output)).toBeDefined()
    }
  })

  it('never numbers the rows', () => {
    const { container } = render(<ModalityPanel />)
    const region = container.querySelector('.dm-modalities')!
    expect(within(region as HTMLElement).queryByText('01')).toBeNull()
  })

  it('opens a drawer naming the modality', () => {
    render(<ModalityPanel />)
    fireEvent.click(screen.getByRole('button', { name: /^documents$/i }))
    expect(screen.getByRole('dialog', { name: /documents/i })).toBeDefined()
  })

  it('shows per-stage counts and the contributing sources in the drawer', () => {
    render(<ModalityPanel />)
    fireEvent.click(screen.getByRole('button', { name: /^documents$/i }))
    const drawer = screen.getByRole('dialog')
    const docs = MODALITY_PIPELINES.find(p => p.modality === 'documents')!
    expect(within(drawer).getByText(docs.stages[0].detail)).toBeDefined()
    expect(within(drawer).getByText(docs.stages[0].runtime)).toBeDefined()
    const first = sourcesForModality('documents')[0]
    expect(within(drawer).getByText(first.name)).toBeDefined()
  })

  it('shows the raw extract beside what it becomes', () => {
    render(<ModalityPanel />)
    fireEvent.click(screen.getByRole('button', { name: /^documents$/i }))
    const drawer = screen.getByRole('dialog')
    const docs = MODALITY_PIPELINES.find(p => p.modality === 'documents')!
    // collapseWhitespace: false — the samples are multi-line. RTL's default
    // normalizer collapses the *rendered* text's whitespace (including real
    // newlines) to single spaces before comparing, but never touches the
    // query string, so a multi-line query can never equal a collapsed
    // match under the default settings. This is a query fix, not a
    // rendering one: the <pre> still renders the sample verbatim.
    expect(within(drawer).getByText(docs.sample.raw, { collapseWhitespace: false })).toBeDefined()
    expect(within(drawer).getByText(docs.sample.structured, { collapseWhitespace: false })).toBeDefined()
  })
})
