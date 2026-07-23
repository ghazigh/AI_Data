import { Card } from '../index'
export default (
  <div className="dl-root" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640 }}>
    <Card label="Module 02" title="Datalith Graph">The Enterprise Knowledge Graph: auto-ontology, identity resolution, lineage.</Card>
    <Card tone="ink" label="Module 05" title="Datalith Gateway">Governed MCP-native serving with per-agent identity and full audit.</Card>
  </div>
)
