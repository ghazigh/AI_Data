import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sparkline, sparkPoints } from '../components/telemetry/Sparkline'
import { LiveDot } from '../components/telemetry/LiveDot'
import { Meter, SegBar, meterPct } from '../components/telemetry/Meter'

describe('sparkPoints', () => {
  it('spans the full width and inset height', () => {
    const pts = sparkPoints([0, 100], 100, 30).split(' ').map(p => p.split(',').map(Number))
    expect(pts[0][0]).toBe(0)
    expect(pts[1][0]).toBe(100)
    // highest value sits at the top pad, lowest at height - pad
    expect(pts[0][1]).toBe(27)
    expect(pts[1][1]).toBe(3)
  })

  it('centres a flat series rather than pinning it to an edge', () => {
    const ys = sparkPoints([5, 5, 5], 100, 30).split(' ').map(p => Number(p.split(',')[1]))
    expect(ys).toEqual([15, 15, 15])
  })

  it('returns nothing for a series too short to draw', () => {
    expect(sparkPoints([], 100, 30)).toBe('')
    expect(sparkPoints([7], 100, 30)).toBe('')
  })
})

describe('Sparkline', () => {
  it('draws a labelled polyline for a real series', () => {
    render(<Sparkline points={[1, 4, 2, 8]} label="Last 4 runs" />)
    const svg = screen.getByRole('img', { name: 'Last 4 runs' })
    expect(svg.querySelector('polyline')).not.toBeNull()
  })

  it('falls back to the empty rule when there is no history', () => {
    render(<Sparkline points={[]} label="Not yet run" />)
    const svg = screen.getByRole('img', { name: 'Not yet run' })
    expect(svg.querySelector('polyline')).toBeNull()
    expect(svg.querySelector('.dm-spark-empty')).not.toBeNull()
  })

  it('marks the latest run only when asked', () => {
    const { rerender } = render(<Sparkline points={[1, 2, 3]} label="runs" />)
    expect(screen.getByRole('img', { name: 'runs' }).querySelector('circle')).toBeNull()
    rerender(<Sparkline points={[1, 2, 3]} dot label="runs" />)
    expect(screen.getByRole('img', { name: 'runs' }).querySelector('circle')).not.toBeNull()
  })
})

describe('meterPct', () => {
  it('clamps outside the range instead of overflowing the track', () => {
    expect(meterPct(150)).toBe(100)
    expect(meterPct(-20)).toBe(0)
    expect(meterPct(0, 0)).toBe(0)
  })

  it('scales against a custom max', () => {
    expect(meterPct(5, 20)).toBe(25)
  })
})

describe('Meter', () => {
  it('is hidden from assistive tech unless it carries its own label', () => {
    const { container, rerender } = render(<Meter value={70} />)
    expect(container.querySelector('.dm-meter')!.getAttribute('aria-hidden')).toBe('true')
    rerender(<Meter value={70} label="Readiness 70" />)
    expect(screen.getByRole('img', { name: 'Readiness 70' })).toBeTruthy()
  })

  it('places the target mark independently of the fill', () => {
    const { container } = render(<Meter value={61} target={80} />)
    expect(container.querySelector<HTMLElement>('.dm-meter-fill')!.style.width).toBe('61%')
    expect(container.querySelector<HTMLElement>('.dm-meter-mark')!.style.left).toBe('80%')
  })
})

describe('SegBar', () => {
  it('shows the stage a failed run died at', () => {
    const { container } = render(<SegBar done={1} total={5} failedAt={1} label="Failed at stage 2 of 5" />)
    const segs = [...container.querySelectorAll('.dm-segbar i')]
    expect(segs.map(s => s.className)).toEqual(['is-done', 'is-fail', '', '', ''])
  })

  it('marks every stage done for a complete run', () => {
    const { container } = render(<SegBar done={4} total={4} label="4 of 4 stages" />)
    expect([...container.querySelectorAll('.dm-segbar i')].every(s => s.className === 'is-done')).toBe(true)
  })
})

describe('LiveDot', () => {
  it('never carries meaning on its own', () => {
    const { container } = render(<LiveDot state="run" />)
    const dot = container.querySelector('.dm-live')!
    expect(dot.getAttribute('aria-hidden')).toBe('true')
    expect(dot.className).toContain('is-run')
  })
})
