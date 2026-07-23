import { Stat } from '@datalith/ui'

export const WithSource = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <Stat value=">40%" label="of agentic AI projects will be canceled by 2027 — data readiness is the #1 killer" source="Gartner" />
  </div>
)

export const Plain = () => (
  <div className="dl-root" style={{ padding: 24 }}>
    <Stat value="150+" label="connectors across databases, warehouses, documents and streams" />
  </div>
)
