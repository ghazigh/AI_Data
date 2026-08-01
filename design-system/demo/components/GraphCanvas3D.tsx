import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react'
import { GraphCanvas, type GraphCanvasProps } from './GraphCanvas'
import { domainByKey } from '../data/tenant'
import type { DomainKey } from '../data/types'

/**
 * True only where a real WebGL context can be created. Guards three things at
 * once: the server render (no document), jsdom under test (getContext returns
 * null), and any browser where WebGL is blocked or unavailable. Each of those
 * gets the SVG graph instead of a blank rectangle.
 */
const supportsWebGL = (): boolean => {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

// Split out so three, r3f and drei are only fetched and evaluated once a browser
// has proved it can render them — the server bundle never reaches this module,
// and a WebGL-less visitor never pays for it either.
const GraphScene = lazy(() => import('./graph3d/GraphScene'))

const domainName = (d: DomainKey): string => domainByKey(d)?.name ?? d

export interface GraphCanvas3DProps extends GraphCanvasProps {
  /** Every node in the graph, filtered or not. The 3D scene keeps them all
   * mounted and animates the out-of-scope ones down to nothing, which is why it
   * needs the whole set rather than the visible slice. */
  allNodes: GraphCanvasProps['nodes']
}

export function GraphCanvas3D({ allNodes, nodes, edges, selectedId, onSelect }: GraphCanvas3DProps) {
  // Starts false on both the server and the client's first render, so the
  // markup hydrates identically and only then upgrades. Without this the two
  // renders disagree and React throws the whole tree away.
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(supportsWebGL()), [])

  if (!enabled) return <GraphCanvas nodes={nodes} edges={edges} selectedId={selectedId} onSelect={onSelect} />

  const visible = new Set(nodes.map(n => n.id))
  const summary =
    `Knowledge graph, ${nodes.length} entities across ` +
    `${new Set(nodes.map(n => n.domain)).size} knowledge bases, orbiting a central hub.`

  return (
    <Suspense fallback={<GraphCanvas nodes={nodes} edges={edges} selectedId={selectedId} onSelect={onSelect} />}>
      <GraphScene
        nodes={allNodes}
        visible={visible}
        selectedId={selectedId}
        onSelect={onSelect}
        nameFor={domainName}
        summary={summary}
      />
    </Suspense>
  )
}

/** Kept as a named type so the Graph screen can swap implementations without
 * caring which one it got. */
export type GraphRenderer = ComponentType<GraphCanvasProps>
