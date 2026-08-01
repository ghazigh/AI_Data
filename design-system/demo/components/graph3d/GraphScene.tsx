import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei/web/Html'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  InstancedMesh,
  Object3D,
  Quaternion,
  Vector3,
} from 'three'
import { buildLayout, type Cluster, type Vec3 } from './layout'
import type { GraphNode } from '../../data/graph'
import type { DomainKey } from '../../data/types'

/**
 * The canvas is transparent and the page's own paper shows through it, so the
 * graph reads as floating on the screen rather than sitting in a window onto
 * somewhere else. That inverts everything drawn: on white, light geometry
 * disappears, so nodes, links and the hub are all ink.
 */
const NODE_COLOR: Record<GraphNode['kind'], string> = {
  entity: '#101013',
  document: '#9A9AA2',
  event: '#B7791F',
}
const SELECTED = '#0031E3'
/** Hover and selection share the accent; size is what separates them. */
const HOVERED = '#0031E3'
/** Structure — the links and the hub's halo — is drawn in ink at low opacity,
 * the same way the rest of the product draws a hairline. */
const STRUCTURE = '#101013'

/** Scales are animated rather than mounted and unmounted, so a node leaving the
 * filter shrinks away instead of popping out of existence. */
const APPEAR = 6

const scratch = new Object3D()
const scratchColor = new Color()

interface SceneProps {
  nodes: GraphNode[]
  /** Ids currently in scope; everything else shrinks to nothing. */
  visible: Set<string>
  selectedId: string | null
  onSelect: (id: string) => void
  nameFor: (d: DomainKey) => string
}

/**
 * Every node in one InstancedMesh — one draw call for the whole graph, which is
 * what keeps this smooth at a few hundred points. Unlit and untonemapped so the
 * spheres read as emitted light rather than lit geometry.
 */
function Nodes({ nodes, positions, visible, selectedId, onSelect }: {
  nodes: GraphNode[]
  positions: Vec3[]
  visible: Set<string>
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const ref = useRef<InstancedMesh>(null)
  const scales = useRef<number[]>(nodes.map(() => 0))
  const [hovered, setHovered] = useState<number | null>(null)

  // Colour is per-instance and only changes on selection or hover, so it is set
  // outside the frame loop rather than rewritten sixty times a second. The first
  // pass is also what allocates instanceColor, which is what tells three to
  // compile the instanced-colour shader at all.
  useEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    nodes.forEach((n, i) => {
      const colour = n.id === selectedId ? SELECTED : hovered === i ? HOVERED : NODE_COLOR[n.kind]
      mesh.setColorAt(i, scratchColor.set(colour))
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [nodes, selectedId, hovered])

  useFrame((_, delta) => {
    const mesh = ref.current
    if (!mesh) return
    const step = Math.min(1, delta * APPEAR)

    nodes.forEach((n, i) => {
      const target = visible.has(n.id)
        ? (n.id === selectedId ? 1.9 : hovered === i ? 1.5 : 1)
        : 0
      scales.current[i] += (target - scales.current[i]) * step

      const [x, y, z] = positions[i]
      scratch.position.set(x, y, z)
      scratch.scale.setScalar(scales.current[i] * 0.09)
      scratch.updateMatrix()
      mesh.setMatrixAt(i, scratch.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, nodes.length]}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        if (e.instanceId !== undefined && visible.has(nodes[e.instanceId].id)) setHovered(e.instanceId)
      }}
      onPointerOut={() => setHovered(null)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        if (e.instanceId !== undefined && visible.has(nodes[e.instanceId].id)) {
          onSelect(nodes[e.instanceId].id)
        }
      }}
    >
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

/** The centre of the estate: one emissive sphere everything else is measured
 * from. Pulses very slightly so the scene never looks frozen. */
function Hub() {
  const ref = useRef<InstancedMesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current?.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04)
  })
  return (
    <group>
      <mesh ref={ref as never}>
        <sphereGeometry args={[0.46, 32, 32]} />
        <meshBasicMaterial color={STRUCTURE} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.86, 24, 24]} />
        <meshBasicMaterial color={SELECTED} transparent opacity={0.05} toneMapped={false} side={DoubleSide} />
      </mesh>
    </group>
  )
}

/**
 * A dashed line from the hub out to one cluster, with a cone arrowhead pointing
 * the direction the data travels. Dash geometry needs per-vertex distances, so
 * the line is built once per centroid rather than re-derived each frame.
 */
function HubLink({ centroid, grown }: { centroid: Vec3; grown: number }) {
  const geometry = useMemo(() => {
    const target = new Vector3(...centroid)
    const g = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), target])
    g.setAttribute('lineDistance', new Float32BufferAttribute([0, target.length()], 1))
    return g
  }, [centroid])

  const { position, quaternion } = useMemo(() => {
    const target = new Vector3(...centroid)
    const dir = target.clone().normalize()
    // A cone points up its own +Y by default; rotate that onto the link.
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir)
    return { position: target.clone().sub(dir.clone().multiplyScalar(0.85)), quaternion: q }
  }, [centroid])

  return (
    <group scale={grown}>
      <lineSegments geometry={geometry}>
        <lineDashedMaterial color={STRUCTURE} transparent opacity={0.22} dashSize={0.26} gapSize={0.34} toneMapped={false} />
      </lineSegments>
      <mesh position={position} quaternion={quaternion}>
        <coneGeometry args={[0.09, 0.3, 10]} />
        <meshBasicMaterial color={STRUCTURE} transparent opacity={0.45} toneMapped={false} />
      </mesh>
    </group>
  )
}

/** The floating glass label at a cluster. drei's Html keeps it facing the camera
 * and depth-sorted against the geometry. */
function ClusterLabel({ cluster, count, dimmed }: { cluster: Cluster; count: number; dimmed: boolean }) {
  return (
    <Html position={cluster.centroid} center zIndexRange={[20, 0]}>
      <div className={`dm-g3-label${dimmed ? ' is-dim' : ''}`}>
        <b>{cluster.name}</b>
        <span>{count}</span>
      </div>
    </Html>
  )
}

/** Everything inside the canvas. Split out so the Canvas element itself stays a
 * thin shell — r3f hooks are only legal below it. */
function Scene({ nodes, visible, selectedId, onSelect, nameFor }: SceneProps) {
  const { positions, clusters } = useMemo(() => buildLayout(nodes, nameFor), [nodes, nameFor])

  // Links and labels grow in on first paint for the same reason nodes do: the
  // scene assembles itself rather than appearing already built.
  const [grown, setGrown] = useState(0)
  useFrame((_, delta) => {
    if (grown < 1) setGrown(g => Math.min(1, g + delta * 1.6))
  })

  const visibleCount = (c: Cluster) => c.nodeIds.filter(id => visible.has(id)).length

  return (
    <>
      <Hub />
      {clusters.map(c => (
        <HubLink key={c.domain} centroid={c.centroid} grown={grown} />
      ))}

      <Nodes
        nodes={nodes}
        positions={positions}
        visible={visible}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      {clusters.map(c => (
        <ClusterLabel key={c.domain} cluster={c} count={visibleCount(c)} dimmed={visibleCount(c) === 0} />
      ))}

      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.1}
        enableDamping
        dampingFactor={0.1}
        enablePan={false}
        minDistance={7}
        maxDistance={30}
      />
    </>
  )
}

export interface GraphSceneProps extends SceneProps {
  /** Announced to assistive tech in place of the canvas. */
  summary: string
}

export default function GraphScene({ summary, ...scene }: GraphSceneProps) {
  return (
    <div className="dm-g3" role="img" aria-label={summary}>
      <Canvas
        // Transparent clear colour: the page's paper is the background, which is
        // the whole point of the scene floating rather than being framed.
        camera={{ position: [0, 2.4, 19], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        // The demo is a static page that may sit open for a long time; a
        // continuously rendering canvas would spin a laptop fan for nothing when
        // the tab is not visible. r3f pauses automatically on visibility change.
        frameloop="always"
      >
        <Scene {...scene} />
      </Canvas>
    </div>
  )
}
