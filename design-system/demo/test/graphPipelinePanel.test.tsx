import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { GraphPipelinePanel } from '../components/GraphPipelinePanel'
import { GRAPH_PIPELINES } from '../data/graphPipelines'

const construct = GRAPH_PIPELINES.find(p => p.id === 'construct')!
const extend = GRAPH_PIPELINES.find(p => p.id === 'extend')!

describe('GraphPipelinePanel', () => {
  it('titles itself from the pipeline', () => {
    render(<GraphPipelinePanel pipeline={construct} />)
    expect(screen.getByRole('region', { name: construct.title })).toBeDefined()
  })

  it('states the argument in the lead', () => {
    render(<GraphPipelinePanel pipeline={extend} />)
    expect(screen.getByText(extend.lead)).toBeDefined()
  })

  it('shows every stage with its detail, count and runtime', () => {
    const { container } = render(<GraphPipelinePanel pipeline={construct} />)
    const rows = container.querySelectorAll('.dm-gpipe > li')
    expect(rows.length).toBe(construct.stages.length)
    construct.stages.forEach((s, i) => {
      const row = within(rows[i] as HTMLElement)
      expect(row.getByText(s.name)).toBeDefined()
      expect(row.getByText(s.detail)).toBeDefined()
      expect(row.getByText(s.runtime)).toBeDefined()
      expect(row.getByText(s.count.toLocaleString('en-US'))).toBeDefined()
    })
  })

  it('renders the residue count as ordinary text', () => {
    const { container } = render(<GraphPipelinePanel pipeline={extend} />)
    const residue = within(container.querySelector('.dm-gpipe-residue') as HTMLElement)
    expect(residue.getByText(extend.unassigned!.count.toLocaleString('en-US'))).toBeDefined()
  })

  it('marks which stages fit a model and which apply one', () => {
    render(<GraphPipelinePanel pipeline={construct} />)
    const region = screen.getByRole('region', { name: construct.title })
    expect(within(region).getAllByText(/^fits$/i).length).toBe(
      construct.stages.filter(s => s.mode === 'fits').length,
    )
  })

  it('shows no fitting at all on the extend path', () => {
    render(<GraphPipelinePanel pipeline={extend} />)
    const region = screen.getByRole('region', { name: extend.title })
    expect(within(region).queryByText(/^fits$/i)).toBeNull()
    expect(within(region).getAllByText(/^applies$/i)).toHaveLength(extend.stages.length)
  })

  it('names the artefact each stage produces or reuses', () => {
    render(<GraphPipelinePanel pipeline={extend} />)
    for (const s of extend.stages) {
      if (s.reuses) expect(screen.getByText(new RegExp(s.reuses))).toBeDefined()
    }
  })

  it('reports the topic count before and after', () => {
    render(<GraphPipelinePanel pipeline={extend} />)
    expect(screen.getByText(/8 topics before/i)).toBeDefined()
    expect(screen.getByText(/8 after/i)).toBeDefined()
  })

  it('surfaces the unmatched residue when there is one', () => {
    render(<GraphPipelinePanel pipeline={extend} />)
    expect(screen.getByText(new RegExp(extend.unassigned!.note))).toBeDefined()
  })

  it('shows a residue block on the construction path too, not just extension', () => {
    render(<GraphPipelinePanel pipeline={construct} />)
    expect(screen.getByText(new RegExp(construct.unassigned!.note))).toBeDefined()
  })

  it('never numbers the stages', () => {
    const { container } = render(<GraphPipelinePanel pipeline={construct} />)
    const region = container.querySelector('.dm-gpipe')!
    expect(within(region as HTMLElement).queryByText(/^\(?0?1\)?\.?$/)).toBeNull()
  })
})
