import { SectionLabel } from '@datalith/ui'

export const WithRule = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <SectionLabel>The agentic data center</SectionLabel>
  </div>
)

export const WithoutRule = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <SectionLabel rule={false}>How it works</SectionLabel>
  </div>
)
