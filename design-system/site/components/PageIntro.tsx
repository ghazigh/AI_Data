import type { ReactNode } from 'react'
import { SectionLabel } from '../../src/index'

export interface PageIntroProps {
  label: string
  /** Display headline; "\n" breaks lines, the accent phrase renders blue. */
  title: string
  accent?: string
  lead?: ReactNode
  children?: ReactNode
}

/** Interior-page opener: eyebrow, display headline with one blue phrase, lead. */
export function PageIntro({ label, title, accent, lead, children }: PageIntroProps) {
  const lines = title.split('\n')
  return (
    <section className="st-intro">
      <div className="dl-wrap">
        <div className="st-hero-anim">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="st-intro-title">
            {/* the space keeps the words apart when site.css drops the break on a phone */}
            {lines.map((l, i) => (<span key={i}>{l}{' '}<br /></span>))}
            {accent && <em>{accent}</em>}
          </h1>
          {lead && <p className="st-intro-lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
