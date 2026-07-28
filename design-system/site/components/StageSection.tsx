import type { ReactNode } from 'react'
import { SectionLabel } from '../../src/index'

export interface StageSectionProps {
  id: string
  num: string
  name: string
  title: string
  lead: string
  value: string
  figure: ReactNode
  /** Optional qualifier under the copy, e.g. for modelled figures. */
  note?: string
  /** Odd stages put the figure on the left so the five sections alternate. */
  flip?: boolean
}

/**
 * One platform stage, full width. Copy on one side, its figure on the other,
 * alternating down the page so five consecutive sections don't read as a list.
 */
export function StageSection({ id, num, name, title, lead, value, figure, flip, note }: StageSectionProps) {
  return (
    <section id={id} className={`st-stage${flip ? ' st-stage--flip' : ''}`}>
      <div className="dl-wrap st-stage-in" data-reveal>
        <div className="st-stage-copy">
          <SectionLabel>{`Stage ${num} · ${name}`}</SectionLabel>
          <h2 className="dl-h2">{title}</h2>
          <p className="st-lead">{lead}</p>
          <p className="st-stage-value">{value}</p>
          {note && <p className="st-footnote">{note}</p>}
        </div>
        <div className="st-stage-fig">{figure}</div>
      </div>
    </section>
  )
}
