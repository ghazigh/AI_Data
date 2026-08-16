import { DemoApp } from '../../demo/DemoApp'

/**
 * The product shot on the marketing pages is the demo itself, server-rendered
 * into the page: the same components, the same sample estate, the same
 * stylesheet the demo ships. A hand-built mock drifted from the console it
 * claimed to show every time the demo moved; this one cannot.
 *
 * The demo shell is authored for a 1280px-plus operator window, so it is laid
 * out at that width inside an SVG and scaled by the viewBox — the one way to
 * fit a fixed-width layout fluidly into a narrower column without a second set
 * of type sizes or a resize listener. (A CSS transform can't do it: the scale
 * factor would have to be a container width divided by a length, which is not
 * a number CSS can compute.)
 *
 * `inert` because this is a picture: none of the controls inside it are wired
 * up on a marketing page (no demo JS is loaded here), so nothing in it should
 * take a click or a tab stop. The caption carries the real link out.
 */
const W = 1440
const H = 1263

export function ConsoleFigure({ href = './demo/' }: { href?: string }) {
  return (
    <figure className="st-console" data-reveal>
      <svg className="st-console-frame" viewBox={`0 0 ${W} ${H}`} role="img"
        aria-label="The Datalith console: estate overview for a sample estate — stage strip, agent-readiness telemetry, readiness by business domain, live estate activity and the use cases the graph already supports">
        <foreignObject x={0} y={0} width={W} height={H}>
          <div className="st-console-scale"
            {...({ xmlns: 'http://www.w3.org/1999/xhtml', inert: '' } as Record<string, string>)}>
            <DemoApp slug="" prefix={href} />
          </div>
        </foreignObject>
      </svg>
      <figcaption className="st-console-cap">
        <span>The Datalith console · illustrative estate, sample data</span>
        <a href={href}>open the live demo &rarr;</a>
      </figcaption>
    </figure>
  )
}
