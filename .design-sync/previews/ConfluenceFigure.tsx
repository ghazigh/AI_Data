import { ConfluenceFigure } from '@datalith/ui'

export const Default = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 560 }}>
    <ConfluenceFigure />
  </div>
)

export const FiveSources = () => (
  <div className="dl-root" style={{ padding: 24, maxWidth: 560 }}>
    <ConfluenceFigure sources={['databases', 'warehouses', 'documents', 'apps', 'streams']} mergedLabel="AGENT-READY" height={260} />
  </div>
)

export const OnInk = () => (
  <div className="dl-root">
    <div className="dl-on-ink" style={{ padding: 24, maxWidth: 560 }}>
      <ConfluenceFigure onInk />
    </div>
  </div>
)
