import { Logo, Button, ConfluenceFigure } from '../../src/index'

export function NotFound() {
  return (
    <div className="dl-root dl-on-ink st-404">
      <div className="dl-wrap st-404-in">
        <a href="./index.html" aria-label="Datalith home"><Logo onInk /></a>
        <h1 className="st-404-code">404</h1>
        <p className="st-404-lead">This page isn&rsquo;t in the graph.</p>
        <ConfluenceFigure onInk animated sources={['this page', 'that link', 'old bookmark']} mergedLabel="HOME" height={180} />
        <div className="st-404-cta">
          <Button variant="blue" size="lg" href="./index.html">Back to the source</Button>
        </div>
      </div>
    </div>
  )
}
