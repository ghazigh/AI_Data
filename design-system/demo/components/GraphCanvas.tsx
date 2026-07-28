import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { GraphEdge, GraphNode } from '../data/graph'

export interface GraphCanvasProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const W = 1000, H = 640
const ZOOM_MIN = 0.6, ZOOM_MAX = 2.4
// How far the content is allowed to drift off-centre on screen, in viewport
// pixels, regardless of zoom. Pan is applied to content before the
// centred scale (see the transform below), so the same pan delta produces a
// bigger screen-space shift at higher zoom — dividing by zoom keeps the
// on-screen drift bounded to this constant at every zoom level.
const MAX_SHIFT_X = W * 0.65
const MAX_SHIFT_Y = H * 0.5

const nodeById = (nodes: GraphNode[], id: string) => nodes.find(n => n.id === id)

const clampPan = (pan: { x: number; y: number }, zoom: number) => ({
  x: Math.max(-MAX_SHIFT_X / zoom, Math.min(MAX_SHIFT_X / zoom, pan.x)),
  y: Math.max(-MAX_SHIFT_Y / zoom, Math.min(MAX_SHIFT_Y / zoom, pan.y)),
})

export function GraphCanvas({ nodes, edges, selectedId, onSelect }: GraphCanvasProps) {
  const [zoom, setZoomRaw] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)

  const setZoom = (next: number) => {
    setPan(p => clampPan(p, next))
    setZoomRaw(next)
  }

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if ((e.target as Element).closest('[data-node]')) return
    setDrag({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }
  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (drag) setPan(clampPan({ x: e.clientX - drag.x, y: e.clientY - drag.y }, zoom))
  }
  const endDrag = () => setDrag(null)

  // Scale about the canvas centre, not the SVG origin, so zooming in never
  // pushes the middle of the graph (the policyholder hub sits near W/2,H/2)
  // off-canvas — it only pushes the outer edges toward it, which panning
  // then recovers. Pan is applied inside the centring translate, in
  // pre-scale content units.
  const transform = `translate(${W / 2} ${H / 2}) scale(${zoom}) translate(${-W / 2} ${-H / 2}) translate(${pan.x} ${pan.y})`

  return (
    <div className="dm-canvas">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="application"
        aria-label="Enterprise knowledge graph"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <g transform={transform}>
          {edges.map(e => {
            const a = nodeById(nodes, e.from), b = nodeById(nodes, e.to)
            if (!a || !b) return null
            return <line key={e.id} data-edge x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="dm-edge" />
          })}
          {nodes.map(n => (
            <g key={n.id} data-node transform={`translate(${n.x} ${n.y})`}>
              <circle
                r={n.id === selectedId ? 15 : 11}
                className={`dm-node is-${n.kind}${n.id === selectedId ? ' is-on' : ''}`}
              />
              <text y={-20} textAnchor="middle" className="dm-node-label">{n.label}</text>
              <circle
                r={20} className="dm-node-hit" role="button" tabIndex={0}
                aria-label={`${n.label} — ${n.count} entities`}
                onClick={() => onSelect(n.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n.id) } }}
              />
            </g>
          ))}
        </g>
      </svg>
      <div className="dm-canvas-controls">
        <button type="button" aria-label="Zoom in" onClick={() => setZoom(Math.min(zoom + 0.2, ZOOM_MAX))}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => setZoom(Math.max(zoom - 0.2, ZOOM_MIN))}>−</button>
        <button type="button" aria-label="Reset view" onClick={() => { setZoomRaw(1); setPan({ x: 0, y: 0 }) }}>Reset</button>
      </div>
    </div>
  )
}
