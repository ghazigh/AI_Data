import { Card } from '@datalith/ui'

export const Paper = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 420 }}>
    <Card label="Module 02" title="Datalith Graph">
      The Enterprise Knowledge Graph: auto-ontology, identity resolution, lineage across the estate.
    </Card>
  </div>
)

export const Ink = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 420 }}>
    <Card tone="ink" label="Module 05" title="Datalith Gateway">
      Governed MCP-native serving with per-agent identity and full audit.
    </Card>
  </div>
)

export const Canvas = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 420 }}>
    <Card tone="canvas" label="Module 06" title="Datalith Flows">
      Agentic workflows mined from your own data, ranked by ROI.
    </Card>
  </div>
)
