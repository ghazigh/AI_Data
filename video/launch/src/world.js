/* The world behind the Datalith launch video.
   One Three.js scene, rendered as a pure function of timeline time: scattered
   systems in the void → lines drawn into a hub → nodes lit by readiness →
   the hub blooms into the knowledge graph → agents query it through a
   governance shield → everything converges into the Datalith mark.
   Deterministic: seeded PRNG, no clocks, no async at seek time. */
import * as THREE from 'three'

// ---- timeline phases (seconds) — kept in lock-step with launch.js ----------
export const PH = { scatter: 0, stat: 6, logo: 11, connect: 17, ready: 25, fix: 33, graph: 41, ask: 51, build: 58, govern: 66, close: 73, end: 90 }

const clamp01 = v => Math.max(0, Math.min(1, v))
const smooth = v => { v = clamp01(v); return v * v * (3 - 2 * v) }
const ramp = (t, a, b) => smooth((t - a) / (b - a))
const lerp = (a, b, v) => a + (b - a) * v
const mulberry = seed => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let z = Math.imul(seed ^ (seed >>> 15), 1 | seed); z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z; return ((z ^ (z >>> 14)) >>> 0) / 4294967296 }

const INK = 0x101013, BLUE = 0x3d5fff, BLUE_SOFT = 0x7a8fff, OK = 0x6fe3a0, WARN = 0xe0a83e, FAIL = 0xf0705f, WHITE = 0xffffff

// ---- textures (canvas-drawn, so nothing is fetched) ---------------------------
function glowTexture(size = 128, inner = 0.12) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const g = c.getContext('2d'); const r = size / 2
  const grd = g.createRadialGradient(r, r, 0, r, r, r)
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(inner, 'rgba(255,255,255,0.85)'); grd.addColorStop(0.42, 'rgba(255,255,255,0.22)'); grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd; g.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
}
function tileTexture(label, hue) {
  const s = 128; const c = document.createElement('canvas'); c.width = c.height = s
  const g = c.getContext('2d')
  const r = 26, p = 18, w = s - p * 2
  g.fillStyle = `hsl(${hue} 45% 20%)`
  g.beginPath(); g.roundRect(p, p, w, w, r); g.fill()
  g.strokeStyle = `hsl(${hue} 50% 40%)`; g.lineWidth = 3; g.stroke()
  g.fillStyle = `hsl(${hue} 85% 84%)`; g.font = '700 46px "Schibsted Grotesk", "Geist", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'
  g.fillText(label, s / 2, s / 2 + 2)
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
}

// ---- the estate ---------------------------------------------------------------
export const SYSTEMS = [
  ['Guidewire ClaimCenter', 82], ['Snowflake Claims Mart', 80], ['Salesforce Service Cloud', 79], ['Zendesk Claims Queue', 76], ['Genesys Claim Calls', 68],
  ['Duck Creek Policy', 84], ['Outlook Support Inbox', 73], ['S3 Claim Photography', 71], ['Postgres Claims Intake', 74], ['Icertis CLM', 70], ['Applied Epic', 58],
  ['Verisk Telematics', 61], ['SharePoint Guidelines', 65], ['RSA Archer GRC', 68], ['DocuSign Treaties', 75], ['Azure FNOL Intake', 73], ['Intercom Chat', 68],
  ['Oracle Contracts DB', 66], ['Jira Claims Ops', 69], ['Confluence Support KB', 82], ['MySQL Underwriting', 59], ['Teams Broker Channels', 67], ['Guidewire PolicyCenter', 88],
  ['Snowflake Policy Mart', 90], ['SQL Server Policy Admin', 76], ['Salesforce Broker Portal', 63], ['Outlook Broker Mail', 55], ['S3 Inspection Images', 52],
  ['Snowflake Reinsurance', 77], ['Treaty Register', 71], ['Oracle Compliance Ledger', 60], ['SharePoint Audit Docs', 72], ['Workday HR', 0], ['ServiceNow ITSM', 0],
]
const HUES = [222, 262, 196, 158, 28, 340, 182, 300, 210, 44]
const hash = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 } return h }
const mono = n => { const w = n.split(/\s+/); return (w.length > 1 ? w[0][0] + w[1][0] : n.slice(0, 2)).toUpperCase() }
const DOMAINS = ['Claims', 'Policies', 'Support', 'Contracts', 'Broker network', 'Underwriting', 'Reinsurance', 'Compliance']

export function createWorld({ width, height, portrait }) {
  const canvas = document.createElement('canvas')
  canvas.id = 'world'; canvas.width = width; canvas.height = height
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true })
  renderer.setSize(width, height, false); renderer.setPixelRatio(1)
  renderer.setClearColor(INK, 1)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(INK, portrait ? 0.028 : 0.032)
  const camera = new THREE.PerspectiveCamera(portrait ? 52 : 38, width / height, 0.1, 200)

  const rnd = mulberry(20260903)
  const glow = glowTexture(128, 0.1)
  const dot = glowTexture(64, 0.3)

  // -- ambient motes: a slab of faint points the camera parallaxes through --
  {
    const N = 1400; const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) { pos[i * 3] = (rnd() - 0.5) * 90; pos[i * 3 + 1] = (rnd() - 0.5) * 40; pos[i * 3 + 2] = (rnd() - 0.5) * 70 - 5 }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const m = new THREE.PointsMaterial({ map: dot, color: 0x9aa4ff, size: 0.35, sizeAttenuation: true, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending })
    scene.add(new THREE.Points(g, m))
  }
  // -- a floor grid, fading into the fog --
  const grid = new THREE.GridHelper(120, 60, 0x2a2f55, 0x1a1d33)
  grid.position.y = -7.5; grid.material.transparent = true; grid.material.opacity = 0.35; grid.material.depthWrite = false
  scene.add(grid)

  // -- the hub --
  const hub = new THREE.Group(); scene.add(hub)
  const hubGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: BLUE, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
  hubGlow.scale.set(6, 6, 1); hub.add(hubGlow)
  const hubCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), new THREE.MeshBasicMaterial({ color: WHITE, wireframe: true, transparent: true, opacity: 0 }))
  hub.add(hubCore)
  const hubWhite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: WHITE, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
  hubWhite.scale.set(1.8, 1.8, 1); hub.add(hubWhite)

  // -- the systems: a tile sprite, a glow sprite, a home position and a docked position --
  const nodes = SYSTEMS.map(([name, score], i) => {
    const hue = HUES[hash(name.toLowerCase()) % HUES.length]
    const a = (i / SYSTEMS.length) * Math.PI * 2 + rnd() * 0.6
    const rad = 9 + rnd() * 7
    const home = new THREE.Vector3(Math.cos(a) * rad * (portrait ? 0.62 : 1), (rnd() - 0.5) * (portrait ? 14 : 9), Math.sin(a) * rad * 0.7 - 2)
    const dom = i % 8
    const da = (dom / 8) * Math.PI * 2 + 0.4
    const dock = new THREE.Vector3(Math.cos(da) * 6.8 + (rnd() - 0.5) * 1.6, (rnd() - 0.5) * 3.2 + Math.sin(dom) * 0.8, Math.sin(da) * 6.8 * 0.75 + (rnd() - 0.5) * 1.6)
    const tile = new THREE.Sprite(new THREE.SpriteMaterial({ map: tileTexture(mono(name), hue), transparent: true, opacity: 0, depthWrite: false }))
    tile.scale.set(1.05, 1.05, 1)
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0x8fa0ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    halo.scale.set(2.6, 2.6, 1)
    const g = new THREE.Group(); g.add(halo); g.add(tile); g.position.copy(home); scene.add(g)
    // the line into the hub: a bent curve so the bundle reads as streams, not spokes
    const mid = home.clone().multiplyScalar(0.5).add(new THREE.Vector3((rnd() - 0.5) * 3, (rnd() - 0.5) * 3 + 1.2, (rnd() - 0.5) * 3))
    const curve = new THREE.QuadraticBezierCurve3(home.clone(), mid, new THREE.Vector3(0, 0, 0))
    const pts = curve.getPoints(40)
    const lg = new THREE.BufferGeometry().setFromPoints(pts)
    const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0x5f78ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    line.geometry.setDrawRange(0, 0); scene.add(line)
    // a pulse travelling along the line during the fix phase
    const pulse = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: OK, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    pulse.scale.set(0.8, 0.8, 1); scene.add(pulse)
    const drift = new THREE.Vector3(rnd() * 6.28, rnd() * 6.28, rnd() * 6.28)
    return { name, score, g, tile, halo, line, curve, pulse, home, dock, drift, order: rnd(), hue }
  })

  // -- the knowledge graph: eight clusters of points and edges around the hub --
  const clusters = DOMAINS.map((name, d) => {
    const a = (d / 8) * Math.PI * 2 + 0.4
    const c = new THREE.Vector3(Math.cos(a) * 5.2, Math.sin(d * 1.7) * 1.4, Math.sin(a) * 5.2 * 0.75)
    const n = 26; const pos = new Float32Array(n * 3); const local = []
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3((rnd() - 0.5) * 2.6, (rnd() - 0.5) * 2.0, (rnd() - 0.5) * 2.6).add(c)
      local.push(v); pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z
    }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ map: dot, color: 0xdfe4ff, size: 0.3, sizeAttenuation: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    // edges: each point to the cluster centre, plus a few point-to-point, plus centre to hub
    const seg = []
    local.forEach(v => { seg.push(c, v) })
    for (let i = 0; i < 12; i++) { seg.push(local[Math.floor(rnd() * n)], local[Math.floor(rnd() * n)]) }
    seg.push(c, new THREE.Vector3(0, 0, 0))
    const eg = new THREE.BufferGeometry().setFromPoints(seg)
    const edges = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0x4b63d8, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    edges.geometry.setDrawRange(0, 0)
    const centre = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: BLUE_SOFT, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    centre.scale.set(2.2, 2.2, 1); centre.position.copy(c)
    scene.add(points); scene.add(edges); scene.add(centre)
    return { name, c, points, edges, centre, local, segCount: seg.length }
  })

  // -- agents: bright bodies on tilted orbits, each firing a query pulse into a cluster --
  const agents = Array.from({ length: 6 }, (_, i) => {
    const body = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: WHITE, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    body.scale.set(1.3, 1.3, 1); scene.add(body)
    const beam = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: i === 4 ? FAIL : OK, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
    beam.scale.set(0.6, 0.6, 1); scene.add(beam)
    const tilt = (i / 6) * Math.PI, phase = rnd() * 6.28, radius = 9.5 + (i % 3) * 0.9
    return { body, beam, tilt, phase, radius, target: clusters[(i * 3) % 8].c, denied: i === 4 }
  })

  // -- the governance shield --
  const shield = new THREE.Mesh(new THREE.IcosahedronGeometry(7.6, 2), new THREE.MeshBasicMaterial({ color: BLUE_SOFT, wireframe: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }))
  scene.add(shield)
  const shieldSkin = new THREE.Mesh(new THREE.IcosahedronGeometry(7.5, 2), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }))
  scene.add(shieldSkin)

  // -- the mark: three streams converging into one line, as emissive tubes --
  const mark = new THREE.Group(); scene.add(mark)
  const S = 0.55 // world units per viewBox unit (28×20 box → 15.4 × 11 units)
  const V = (x, y) => new THREE.Vector3((x - 14) * S, (10 - y) * S, 0)
  const streams = [
    new THREE.CubicBezierCurve3(V(0, 3), V(8, 3), V(10, 10), V(16, 10)),
    new THREE.LineCurve3(V(0, 10), V(16, 10)),
    new THREE.CubicBezierCurve3(V(0, 17), V(8, 17), V(10, 10), V(16, 10)),
  ].map(curve => {
    const geo = new THREE.TubeGeometry(curve, 48, 0.085, 10, false)
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: WHITE, transparent: true, opacity: 0, fog: false }))
    m.geometry.setDrawRange(0, 0); mark.add(m); return m
  })
  const merge = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(V(16, 10), V(28, 10)), 24, 0.19, 12, false), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0, fog: false }))
  merge.geometry.setDrawRange(0, 0); mark.add(merge)
  const markGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: BLUE, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }))
  markGlow.scale.set(9, 9, 1); markGlow.position.copy(V(22, 10)); mark.add(markGlow)
  mark.position.set(0, portrait ? 1.6 : 0.4, 0)

  // ---- camera path: authored poses, eased between ------------------------------
  // [time, position, lookAt, fov]. Landscape leaves the right half for UI panels
  // on the beats that carry one; portrait keeps the hub low-centre under the copy.
  const L = !portrait
  const KEYS = [
    [PH.scatter, [0, 2, 30], [0, 0, 0], L ? 40 : 54],
    [PH.stat, L ? [-6, 3, 24] : [0, 3, 24], L ? [-5, 0, 0] : [0, 3, 0], L ? 38 : 52],
    [PH.logo, [-4, 2, 22], [0, 0, 0], L ? 40 : 54],
    [PH.connect, L ? [7, 4, 19] : [0, 4, 19], L ? [-6, 0, 0] : [0, 2.5, 0], L ? 40 : 56],
    [PH.ready, L ? [7, 3, 16] : [0, 3, 15], L ? [-5.5, 0.4, 0] : [0, 2.5, 0], L ? 38 : 56],
    [PH.fix, L ? [3, 6, 14] : [0, 5, 14], L ? [1.2, 3.0, 0] : [0, -1, 0], L ? 40 : 56],
    [PH.graph, L ? [7, 5, 14] : [0, 5, 14], L ? [-2, 0, 0] : [0, 0, 0], L ? 42 : 58],
    [PH.ask, L ? [3, 5, 13] : [0, 4, 13], L ? [1.2, 2.8, 0] : [0, -1, 0], L ? 40 : 56],
    [PH.build, L ? [4, 6, 15] : [0, 6, 15], L ? [1.2, 3.0, 0] : [0, -1, 0], L ? 42 : 58],
    [PH.govern, L ? [3, 4, 17] : [0, 3, 17], L ? [1.2, 2.8, 0] : [0, -1, 0], L ? 42 : 58],
    [PH.close, L ? [0, 1.2, 17] : [0, 2, 33], L ? [0, 0.4, 0] : [0, 1.6, 0], L ? 36 : 52],
    [PH.close + 4.8, L ? [0, 0.8, 16.5] : [0, 1.8, 32], L ? [0, 0.4, 0] : [0, 1.6, 0], L ? 34 : 50],
    [PH.close + 7.5, L ? [0, -3.5, 40] : [0, -7, 52], L ? [0, -3.5, 0] : [0, -7, 0], L ? 30 : 46],
    [PH.end, L ? [0, -3.6, 41] : [0, -7.2, 53], L ? [0, -3.5, 0] : [0, -7, 0], L ? 30 : 46],
  ]
  const camPos = new THREE.Vector3(), camLook = new THREE.Vector3()
  function poseAt(t) {
    let i = 0; while (i < KEYS.length - 2 && t >= KEYS[i + 1][0]) i++
    const a = KEYS[i], b = KEYS[i + 1]
    const v = smooth((t - a[0]) / (b[0] - a[0]))
    camPos.set(lerp(a[1][0], b[1][0], v), lerp(a[1][1], b[1][1], v), lerp(a[1][2], b[1][2], v))
    camLook.set(lerp(a[2][0], b[2][0], v), lerp(a[2][1], b[2][1], v), lerp(a[2][2], b[2][2], v))
    camera.fov = lerp(a[3], b[3], v)
  }

  const tmp = new THREE.Vector3()
  function renderAt(t) {
    // ---- camera: authored path plus a breath of hand-held drift ----
    poseAt(t)
    camPos.x += Math.sin(t * 0.37) * 0.25; camPos.y += Math.sin(t * 0.53 + 1) * 0.18
    camera.position.copy(camPos); camera.lookAt(camLook); camera.updateProjectionMatrix()

    // ---- phase progress ----
    const pScatter = ramp(t, 0.2, 4.5)
    const pDim = ramp(t, PH.stat, PH.stat + 1.2) * (1 - ramp(t, PH.connect - 1, PH.connect + 1))
    const pLogoFade = ramp(t, PH.logo, PH.logo + 1) * (1 - ramp(t, PH.connect - 0.8, PH.connect + 0.6))
    const pConnect = ramp(t, PH.connect + 0.6, PH.ready - 1.5)
    const pReady = ramp(t, PH.ready + 0.8, PH.ready + 4)
    const pFix = ramp(t, PH.fix + 1, PH.graph - 1.5)
    const pGraph = ramp(t, PH.graph + 0.4, PH.graph + 5.5)
    const pDock = ramp(t, PH.graph + 0.2, PH.graph + 4)
    const pAgents = ramp(t, PH.build + 0.5, PH.build + 3) * (1 - ramp(t, PH.close - 1, PH.close + 1.5))
    const pShield = ramp(t, PH.govern + 0.4, PH.govern + 2.4) * (1 - ramp(t, PH.close - 1, PH.close + 1.5))
    const pCollapse = ramp(t, PH.close - 0.5, PH.close + 2.4)
    const pMark = ramp(t, PH.close + 1.6, PH.close + 4.2)
    const pMerge = ramp(t, PH.close + 3.6, PH.close + 4.8)

    // ---- systems ----
    nodes.forEach((n, i) => {
      const appear = ramp(t, 0.2 + n.order * 3.2, 1.2 + n.order * 3.2)
      // drift at home, then fly to the docked position around the graph, then collapse into the mark
      const dx = Math.sin(t * 0.35 + n.drift.x) * 0.5, dy = Math.sin(t * 0.42 + n.drift.y) * 0.45, dz = Math.sin(t * 0.3 + n.drift.z) * 0.5
      tmp.copy(n.home).lerp(n.dock, pDock)
      const hidePending = n.score === 0 ? 1 - pConnect * 0.6 : 1
      n.g.position.set(tmp.x + dx, tmp.y + dy, tmp.z + dz)
      const collapse = pCollapse
      if (collapse > 0) { n.g.position.lerp(new THREE.Vector3(-7.5, 0.4, 0), collapse) }
      const base = appear * (1 - pDim * 0.55) * (1 - pLogoFade * 0.8)
      const vis = base * hidePending * (1 - collapse)
      n.tile.material.opacity = vis
      // connect: the line draws, the node flares when it lands
      const lineP = clamp01((pConnect - n.order * 0.45) / 0.55)
      n.line.geometry.setDrawRange(0, Math.floor(41 * lineP))
      n.line.material.opacity = (0.55 * lineP + 0.25 * pGraph) * (1 - collapse) * (n.score ? 1 : 0.15)
      const landed = lineP >= 0.999 ? 1 : 0
      const flare = landed ? Math.max(0, 1 - (pConnect - n.order * 0.45 - 0.55) * 3) : 0
      // ready: tint by score; fix: amber turns green as the pulse arrives
      const fixed = n.score < 70 && n.score > 0 ? clamp01((pFix - n.order * 0.6) / 0.35) : 0
      const good = n.score >= 70 || fixed > 0.5
      const col = new THREE.Color(0x8fa0ff)
      if (pReady > 0 && n.score) col.lerp(new THREE.Color(good ? OK : WARN), pReady)
      n.halo.material.color.copy(col)
      n.halo.material.opacity = vis * (0.22 + flare * 0.9 + pReady * 0.2 + pAgents * 0.06) * (1 - pDock * 0.45)
      const s = 2.2 + flare * 1.4 + pReady * 0.3
      n.halo.scale.set(s, s, 1)
      n.tile.scale.setScalar(1.05 * (1 - pDock * 0.3))
      // the remediation pulse travels hub → node along the curve
      if (n.score && n.score < 70 && pFix > 0 && pFix < 1) {
        const pp = clamp01((pFix - n.order * 0.6) / 0.35)
        if (pp > 0 && pp < 1) { n.curve.getPoint(1 - pp, n.pulse.position); n.pulse.material.opacity = 0.9 } else n.pulse.material.opacity = 0
      } else n.pulse.material.opacity = 0
    })

    // ---- hub ----
    const hubOn = ramp(t, PH.connect, PH.connect + 1.5) * (1 - pCollapse)
    hubGlow.material.opacity = (0.55 * hubOn + 0.35 * pGraph) * (1 - pCollapse)
    hubGlow.scale.setScalar(6 + pGraph * 3 + Math.sin(t * 1.6) * 0.3)
    hubCore.material.opacity = 0.8 * hubOn * (1 - pGraph * 0.6); hubCore.visible = hubOn > 0.001
    hubCore.rotation.y = t * 0.5; hubCore.rotation.x = t * 0.21
    hubCore.scale.setScalar(1 + pConnect * 0.6)
    hubWhite.material.opacity = hubOn * 0.9
    hub.position.lerp(new THREE.Vector3(-7.5, 0.4, 0), 0)

    // ---- knowledge graph ----
    clusters.forEach((c, d) => {
      const p = clamp01((pGraph - d * 0.07) / 0.6) * (1 - pCollapse)
      c.points.material.opacity = 0.8 * p
      c.edges.geometry.setDrawRange(0, Math.floor(c.segCount * p))
      c.edges.material.opacity = 0.35 * p
      c.centre.material.opacity = 0.45 * p
      // the ask beat lights one cluster (Claims) brighter than the rest
      const asked = d === 0 ? ramp(t, PH.ask + 2.2, PH.ask + 3.2) * (1 - ramp(t, PH.build - 0.5, PH.build + 0.5)) : 0
      c.points.material.color.set(asked > 0 ? new THREE.Color(0xdfe4ff).lerp(new THREE.Color(OK), asked) : 0xdfe4ff)
      c.centre.scale.setScalar(2.2 + asked * 1.6)
    })
    // gentle rotation of the whole graph so it never freezes
    const spin = t * 0.06
    clusters.forEach(c => { c.points.rotation.y = spin; c.edges.rotation.y = spin; tmp.copy(c.c).applyAxisAngle(new THREE.Vector3(0, 1, 0), spin); c.centre.position.copy(tmp) })
    nodes.forEach(n => { if (pDock > 0) { n.g.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), spin * pDock * (1 - pCollapse)) } })

    // ---- agents ----
    agents.forEach((a, i) => {
      const th = t * 0.35 + a.phase
      const x = Math.cos(th) * a.radius, z = Math.sin(th) * a.radius * 0.7
      const y = Math.sin(th * 1.3 + a.tilt) * 2.4 + 0.5
      a.body.position.set(x, y, z)
      a.body.material.opacity = 0.9 * pAgents
      // a query pulse leaves the agent every 1.6s and travels to its cluster
      const cyc = ((t - PH.build) / 1.6 + i * 0.37) % 1
      tmp.copy(a.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), spin)
      if (a.denied && pShield > 0.5) {
        // denied: it reaches the shield radius and bounces back
        const dir = tmp.clone().sub(a.body.position); const len = dir.length(); dir.normalize()
        const reach = Math.max(0, len - 7.6)
        const f = cyc < 0.5 ? cyc * 2 : (1 - cyc) * 2
        a.beam.position.copy(a.body.position).add(dir.multiplyScalar(reach * f))
        a.beam.material.color.set(FAIL)
      } else {
        a.beam.position.copy(a.body.position).lerp(tmp, cyc)
        a.beam.material.color.set(OK)
      }
      a.beam.material.opacity = pAgents * (cyc < 0.92 ? 0.95 : 0)
    })

    // ---- shield ----
    shield.material.opacity = 0.22 * pShield; shield.visible = pShield > 0.001; shieldSkin.visible = shield.visible
    shieldSkin.material.opacity = 0.05 * pShield
    shield.rotation.y = t * 0.08; shield.rotation.z = t * 0.03
    shieldSkin.rotation.copy(shield.rotation)

    // ---- the mark ----
    streams.forEach((m, i) => {
      const p = clamp01((pMark - i * 0.12) / 0.7)
      m.geometry.setDrawRange(0, Math.floor(m.geometry.index.count * p))
      m.material.opacity = p > 0 ? 1 : 0
    })
    merge.geometry.setDrawRange(0, Math.floor(merge.geometry.index.count * pMerge))
    merge.material.opacity = pMerge > 0 ? 1 : 0
    markGlow.material.opacity = 0.75 * pMerge
    markGlow.scale.setScalar(9 + Math.sin(t * 1.2) * 0.6)

    grid.material.opacity = 0.35 * (1 - pCollapse * 0.7)
    renderer.render(scene, camera)
  }

  return { canvas, renderAt }
}

window.__createWorld = createWorld
window.__WORLD_PHASES = PH
