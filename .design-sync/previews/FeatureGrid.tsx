import { FeatureGrid } from '@datalith/ui'

export const SixModules = () => (
  <div className="dl-root">
    <FeatureGrid />
  </div>
)

export const TwoColumns = () => (
  <div className="dl-root">
    <FeatureGrid
      label="Why now"
      title="The context layer agents are missing."
      columns={2}
      items={[
        { label: 'A', title: 'MCP moves context', body: 'It does not produce it. Datalith is the layer that produces it.' },
        { label: 'B', title: 'Readiness is the killer', body: '>40% of agentic AI projects will be canceled by 2027 over data readiness.' },
        { label: 'C', title: 'Prep eats the budget', body: '60–75% of every agent project’s effort is spent on data preparation.' },
        { label: 'D', title: 'The window is open', body: '89% of teams are investing in context infrastructure in the next 12 months.' },
      ]}
    />
  </div>
)
