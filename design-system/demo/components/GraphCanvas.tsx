import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { GraphEdge, GraphNode } from '../data/graph'

export interface GraphCanvasProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const W = 1000, H = 640
const nodeById = (nodes: GraphNode[], id: string) => nodes.find(n => n.id === id)

export function GraphCanvas({ nodes, edges, selectedId, onSelect }: GraphCanvasProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if ((e.target as Element).closest('[data-node]')) return
    setDrag({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }
  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (drag) setPan({ x: e.clientX - drag.x, y: e.clientY - drag.y })
  }
  const endDrag = () => setDrag(null)

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
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
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
        <button type="button" aria-label="Zoom in" onClick={() => setZoom(z => Math.min(z + 0.2, 2.4))}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))}>−</button>
        <button type="button" aria-label="Reset view" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }}>Reset</button>
      </div>
    </div>
  )
}
