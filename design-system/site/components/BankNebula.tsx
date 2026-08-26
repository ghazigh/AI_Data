import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei/web/Html'
import {
  BufferGeometry, CanvasTexture, Color, Float32BufferAttribute, Points, Group, Quaternion, Vector3,
} from 'three'
import { BANK_DOMAIN_NAMES, BANK_DOMAIN_ENTITIES, BANK_NODES, type BankDomain } from '../data/bank-graph'

/**
 * The bank's estate as a nebula: five knowledge bases as luminous clouds of the
 * entities they hold, drifting around the institution at the core.
 *
 * The demo's GraphScene draws named, clickable nodes because an operator works
 * with them one at a time. A landing page is not that: at a glance the useful
 * fact is scale and shape — millions of entities, gathered into five bases —
 * so this draws density instead of geometry, and stays ambient.
 */

const DOMAINS = Object.keys(BANK_DOMAIN_NAMES) as BankDomain[]

/** Entity counts as numbers, for cloud density. */
const countOf = (d: BankDomain): number => {
  const m = /^([\d.]+)([KM])?$/.exec(BANK_DOMAIN_ENTITIES[d])
  if (!m) return 0
  return Number(m[1]) * (m[2] === 'M' ? 1e6 : m[2] === 'K' ? 1e3 : 1)
}

/** FNV-1a, so the cloud is the same shape on every visit and every machine. */
const hash = (s: string): number => {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

/** Deterministic [0,1) stream seeded from a string. */
function rng(seed: string) {
  let s = hash(seed) || 1
  return () => {
    s ^= s << 13; s >>>= 0
    s ^= s >> 17
    s ^= s << 5; s >>>= 0
    return s / 0x100000000
  }
}

/** Cluster centres on a flattened golden-angle shell — a map, not a ball. */
const centroid = (i: number, n: number): [number, number, number] => {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = n <= 1 ? 0 : 1 - (i / (n - 1)) * 2
  const r = Math.sqrt(Math.max(0, 1 - y * y))
  return [Math.cos(golden * i + 0.6) * r * 9.2, y * 2.7, Math.sin(golden * i + 0.6) * r * 9.2]
}

const PALETTE = {
  dust: new Color('#9A9AA2'),
  entity: new Color('#101013'),
  accent: new Color('#0031E3'),
  event: new Color('#B7791F'),
}

/** Box-Muller from the deterministic stream: clouds, not cubes. */
const gauss = (r: () => number): number => {
  const u = Math.max(r(), 1e-6)
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r())
}

function useCloud(pointsPerBase: number) {
  return useMemo(() => {
    const pos: number[] = []
    const col: number[] = []
    const biggest = Math.max(...DOMAINS.map(countOf))

    DOMAINS.forEach((d, i) => {
      const c = centroid(i, DOMAINS.length)
      const r = rng(d)
      // density follows the entity count, rooted so the small bases stay visible
      const n = Math.round(pointsPerBase * (0.42 + 0.58 * Math.sqrt(countOf(d) / biggest)))
      const spread = 1.05 + 0.55 * Math.sqrt(countOf(d) / biggest)
      for (let k = 0; k < n; k++) {
        pos.push(c[0] + gauss(r) * spread, c[1] + gauss(r) * spread * 0.62, c[2] + gauss(r) * spread)
        const t = r()
        const colour = t > 0.955 ? PALETTE.event : t > 0.78 ? PALETTE.accent
          : t > 0.34 ? PALETTE.entity : PALETTE.dust
        col.push(colour.r, colour.g, colour.b)
      }
    })

    // a thin field between the clouds, so the space reads as one estate
    const far = rng('estate-field')
    for (let k = 0; k < pointsPerBase; k++) {
      const a = far() * Math.PI * 2
      const rad = 10.5 + far() * 8
      pos.push(Math.cos(a) * rad, (far() - 0.5) * 7, Math.sin(a) * rad)
      col.push(PALETTE.dust.r, PALETTE.dust.g, PALETTE.dust.b)
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3))
    geo.setAttribute('color', new Float32BufferAttribute(col, 3))
    return geo
  }, [pointsPerBase])
}

/** A filled disc with a feathered edge, drawn once and shared by every point.
 *  Without it gl.POINTS renders squares, which read as pixels rather than as
 *  entities. */
function useDiscTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.78, 'rgba(255,255,255,1)')
    g.addColorStop(0.96, 'rgba(255,255,255,0.45)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new CanvasTexture(canvas)
  }, [])
}

/** A soft radial sprite, drawn once and shared by every glow in the scene. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(0,49,227,0.30)')
    g.addColorStop(0.4, 'rgba(0,49,227,0.10)')
    g.addColorStop(1, 'rgba(0,49,227,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new CanvasTexture(canvas)
  }, [])
}

/** What the pointer is doing, shared between the DOM handlers and the frame
 *  loop. A plain mutable object rather than state: it changes every frame. */
export interface Spin {
  /** Where the drag wants the scene, and where it currently is. */
  wantY: number; wantX: number; y: number; x: number
  /** Camera distance, and where zoom wants it. */
  dist: number; wantDist: number
  dragging: boolean
  /** Auto-rotation stays off for a moment after a drag, so the drag reads as control. */
  idleAt: number
  reduced: boolean
}

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

function Nebula({ spin }: { spin: Spin }) {
  const group = useRef<Group>(null)
  const cloud = useRef<Points>(null)
  const geo = useCloud(1400)
  const glow = useGlowTexture()
  const disc = useDiscTexture()
  const [active, setActive] = useState<BankDomain | null>(null)
  const labels = useRef<Record<string, HTMLSpanElement | null>>({})
  const probe = useMemo(() => new Vector3(), [])
  const probeQuat = useMemo(() => new Quaternion(), [])
  const probeZero = useMemo(() => new Vector3(), [])

  useFrame(({ camera, clock, viewport }, dt) => {
    /* Rotation is driven here rather than by a controls library: the drag is the
       point of this figure, and it must not depend on another component's view
       of which element owns the pointer. */
    const idle = !spin.dragging && clock.elapsedTime > spin.idleAt
    if (idle && !spin.reduced) spin.wantY += dt * 0.1
    spin.y += (spin.wantY - spin.y) * 0.12
    spin.x += (spin.wantX - spin.x) * 0.12
    spin.dist += (spin.wantDist - spin.dist) * 0.12
    if (group.current) {
      group.current.rotation.y = spin.y
      group.current.rotation.x = spin.x
      group.current.scale.setScalar(spin.dist)
      /* The copy owns the left of the hero, so the estate sits to the right of
         it and only its outskirts drift behind the type. Kept in world units off
         the viewport, so the offset holds at any width; a narrow canvas — the
         phone layout, where this is a figure of its own — centres instead. */
      group.current.position.x = viewport.aspect > 1.4 ? viewport.width * 0.12 : 0
    }


    /* The clouds sit still and the camera goes around them, so two knowledge
       bases can land on top of each other in projection. Depth decides which
       one is legible: the far label recedes rather than fighting the near one. */
    DOMAINS.forEach((d, i) => {
      const el = labels.current[d]
      if (!el) return
      const c = centroid(i, DOMAINS.length)
      // the clouds turn with the group now, so depth has to be measured there
      const near = probe.set(c[0], c[1], c[2])
        .applyQuaternion(group.current?.quaternion ?? probeQuat)
        .add(group.current?.position ?? probeZero)
        .distanceTo(camera.position)
      const t = Math.min(Math.max((near - 16) / 11, 0), 1)
      el.style.opacity = String(1 - t * 0.45)
      el.style.zIndex = String(100 - Math.round(near))
    })
    if (cloud.current) {
      const m = cloud.current.material as { opacity: number }
      m.opacity += ((active ? 0.34 : 0.8) - m.opacity) * 0.08
    }
  })

  return (
    <group ref={group}>
      <points ref={cloud} geometry={geo}>
        {/* normal blending, not additive: on paper, added light is no light */}
        <pointsMaterial
          map={disc} alphaTest={0.02} vertexColors size={0.16} sizeAttenuation
          transparent opacity={0.8} depthWrite={false}
        />
      </points>

      {/* the institution at the core */}
      <sprite scale={[5.4, 5.4, 1]}>
        <spriteMaterial map={glow} transparent opacity={0.5} depthWrite={false} />
      </sprite>

      {DOMAINS.map((d, i) => {
        const c = centroid(i, DOMAINS.length)
        const on = active === d
        const away = Math.hypot(c[0], c[2]) || 1
        const label: [number, number, number] = [
          (c[0] / away) * 1.5, 1.45 + (i % 2 === 0 ? 0.5 : -0.5), (c[2] / away) * 1.5,
        ]
        return (
          <group key={d} position={c}>
            <sprite
              scale={on ? [3.4, 3.4, 1] : [2.6, 2.6, 1]}
              onPointerOver={e => { e.stopPropagation(); setActive(d) }}
              onPointerOut={() => setActive(a => (a === d ? null : a))}
            >
              <spriteMaterial map={glow} transparent opacity={on ? 0.55 : 0.22} depthWrite={false} />
            </sprite>
            <Html center position={label} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
              <span
                ref={el => { labels.current[d] = el }}
                className={`st-neb-label${on ? ' is-on' : ''}`}
              >
                <b>{BANK_DOMAIN_NAMES[d]}</b>
                <span>{BANK_DOMAIN_ENTITIES[d]}</span>
              </span>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

const SUMMARY =
  `Illustrative bank estate: ${BANK_NODES.length} entity types across ` +
  `${DOMAINS.length} knowledge bases, drawn as a point cloud.`

export function BankNebula() {
  const reduced = typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches

  const spin = useMemo<Spin>(() => ({
    wantY: 0, wantX: 0, y: 0, x: 0, dist: 0.78, wantDist: 0.78, dragging: false, idleAt: 0, reduced,
  }), [reduced])
  const last = useRef({ x: 0, y: 0 })
  const [held, setHeld] = useState(false)

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    spin.dragging = true
    last.current = { x: e.clientX, y: e.clientY }
    setHeld(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!spin.dragging) return
    spin.wantY += (e.clientX - last.current.x) * 0.007
    spin.wantX = clamp(spin.wantX + (e.clientY - last.current.y) * 0.005, -0.65, 0.65)
    last.current = { x: e.clientX, y: e.clientY }
  }
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!spin.dragging) return
    spin.dragging = false
    // a pause before it drifts again, so letting go does not feel like being overruled
    spin.idleAt = performance.now() / 1000 + 2.5
    setHeld(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }
  /* Zoom is two buttons rather than the wheel: a hero that swallows scroll to
     zoom is a hero you cannot scroll past. */
  const zoom = (by: number) => { spin.wantDist = clamp(spin.wantDist + by, 0.6, 2.2) }

  return (
    <div className="st-neb" role="img" aria-label={`${SUMMARY} Drag to rotate.`}>
      <div
        className={`st-neb-stage${held ? ' is-held' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.5, 19], fov: 46 }} gl={{ antialias: true, alpha: true }}>
          <Nebula spin={spin} />
        </Canvas>
      </div>
      <div className="st-neb-zoom">
        <button type="button" onClick={() => zoom(0.25)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => zoom(-0.25)} aria-label="Zoom out">&minus;</button>
      </div>
    </div>
  )
}
