/* Datalith keynote film — one paused GSAP timeline, 56 s.
   Story: your data is everywhere → one platform, nothing moves → every source scored →
   one knowledge graph → a question; a light searches the graph; the answer → a pipeline per
   dataset, records visibly transformed stage by stage → what to build first → close.
   Architecture: the 3D worlds (source constellation, graph, pipeline particles, dust) are
   pure functions of time, drawn by one driver tween through a small perspective camera, so
   any frame renders identically however the renderer seeks. Everything else (type, cards,
   counters) is ordinary GSAP on properties the driver never touches. */
window.__buildFilm = function buildFilm() {
  const DUR = 56;
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const SPRING = 'back.out(1.6)', OUT = 'power4.out';
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const EZ = {};
  const ease = (n) => EZ[n] || (EZ[n] = gsap.parseEase(n));
  const seg = (t, a, b, e = 'none') => ease(e)(clamp((t - a) / (b - a)));
  const sm = (x, a, b) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
  const f2 = (v) => v.toFixed(2);
  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s + 0x6D2B79F5) >>> 0; let x = s; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  }
  const svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const el = (tag, cls, parent, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; if (parent) parent.appendChild(e); return e; };

  // ---------- perspective camera ----------
  const F = 1000;
  function project(p, c) {
    const x = p[0] - c.px, y = p[1] - c.py, z = p[2] - c.pz;
    const cy = Math.cos(c.yaw), sy = Math.sin(c.yaw);
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    const cp = Math.cos(c.pitch), sp = Math.sin(c.pitch);
    const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    const X = x1 + c.px - c.x, Y = y1 + c.py - c.y, Z = z2 + c.pz - c.z;
    const s = F / Math.max(Z, 1);
    return { X: 960 + X * s + c.ox, Y: 540 + Y * s + c.oy, s, z: Z };
  }

  // ---------- the driver: every 3D world is redrawn from t alone ----------
  const renderers = [];
  const D = { t: 0 };
  tl.to(D, { t: DUR, duration: DUR, ease: 'none', onUpdate: () => { for (const r of renderers) r(D.t); } }, 0);

  // ---------- 2D helpers ----------
  function words(root) {
    const out = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
            const m = el('span', 'm'); const s = el('span', 'w', m); s.textContent = w; s.setAttribute('data-layout-allow-overlap', '');
            frag.appendChild(m); out.push(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(root);
    return out;
  }
  const reveal = (targets, t, { dur = 0.8, stagger = 0.06, e = 'expo.out' } = {}) =>
    tl.fromTo(targets, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur, stagger, ease: e }, t);
  const unreveal = (targets, t, { dur = 0.4, stagger = 0.03 } = {}) =>
    tl.to(targets, { yPercent: -110, opacity: 0, duration: dur, stagger, ease: 'power3.in' }, t);
  const pop = (targets, t, { from = 0.9, dur = 0.7, stagger = 0.08, y = 0, x = 0, e = SPRING } = {}) =>
    tl.fromTo(targets, { scale: from, opacity: 0, y, x }, { scale: 1, opacity: 1, y: 0, x: 0, duration: dur, stagger, ease: e }, t);
  const out = (targets, t, dur = 0.35) => tl.to(targets, { opacity: 0, duration: dur, ease: 'power2.in' }, t);
  const chapIn = (sel, t) => tl.fromTo(sel, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' }, t);
  function count(node, t, from, to, dur, fmt = (v) => Math.round(v).toString(), e = 'power2.out') {
    const p = { v: from }; node.textContent = fmt(from);
    tl.fromTo(p, { v: from }, { v: to, duration: dur, ease: e, immediateRender: false, onUpdate: () => { node.textContent = fmt(p.v); } }, t);
  }
  function typewrite(node, caret, t, text, cps) {
    const p = { n: 0 }; node.textContent = '';
    tl.to(p, { n: text.length, duration: text.length / cps, ease: 'none', onUpdate: () => { node.textContent = text.slice(0, Math.floor(p.n)); } }, t);
    const b = { i: 0 };
    tl.to(b, { i: 14, duration: 7, ease: 'steps(14)', onUpdate: () => { caret.style.opacity = (Math.floor(b.i) % 2 && (b.i < 3 || b.i > 5)) ? 0 : 1; } }, t - 0.5);
  }
  function drawPath(path, t, dur, e = 'power2.inOut') {
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L} ${L}`; path.style.strokeDashoffset = L;
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease: e }, t);
  }
  function camera(node, init) {
    const c = Object.assign({ x: 960, y: 540, s: 1, r: 0 }, init);
    const write = () => {
      const a = (c.r * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a), sx = c.x * c.s, sy = c.y * c.s;
      node.style.transform = `translate(${f2(960 - (cos * sx - sin * sy))}px, ${f2(540 - (sin * sx + cos * sy))}px) rotate(${c.r}deg) scale(${c.s})`;
    };
    write();
    return { to: (t, vals, dur, e) => tl.to(c, Object.assign({ duration: dur, ease: e, onUpdate: write }, vals), t) };
  }
  // directional motion blur; the filter is attached only while it is doing something
  function mblur(node, id) {
    const g = document.getElementById('mbb-' + id);
    const p = { v: 0, ax: 1, ay: 1 };
    const write = () => { g.setAttribute('stdDeviation', `${f2(p.v * p.ax)} ${f2(p.v * p.ay)}`); node.style.filter = p.v > 0.05 ? `url(#mb-${id})` : 'none'; };
    const axis = (a) => { p.ax = a === 'y' ? 0 : 1; p.ay = a === 'x' ? 0 : 1; };
    write();
    return {
      out: (t, dur, peak, a = 'xy', e = OUT) => { tl.set(p, { v: peak, onUpdate: () => { axis(a); write(); } }, t); tl.to(p, { v: 0, duration: dur, ease: e, onUpdate: write }, t); },
      in: (t, dur, peak, a = 'xy', e = 'power3.in') => { tl.set(p, { v: 0, onUpdate: () => { axis(a); write(); } }, t); tl.to(p, { v: peak, duration: dur, ease: e, onUpdate: write }, t); },
    };
  }
  const flash = (t, peak = 0.5, up = 0.12, down = 0.6) => { tl.to('#flash', { opacity: peak, duration: up, ease: 'power2.out' }, t); tl.to('#flash', { opacity: 0, duration: down, ease: 'power2.in' }, t + up); };

  // ======================= substrate: dust that carries the camera's speed =======================
  {
    const R = rng(11), wrap = $('#dust'), pts = [];
    for (let i = 0; i < 140; i++) { const p = { x: (R() * 2 - 1) * 2600, y: (R() * 2 - 1) * 1500, z: R() * 6000, b: 0.2 + R() * 0.8 }; p.el = el('i', '', wrap); pts.push(p); }
    const camZ = (t) => 110 * t + 3200 * seg(t, 11.8, 13.4, 'power3.in') + 3400 * seg(t, 20.2, 22.6, 'power2.inOut') + 1600 * seg(t, 49.6, 50.6, 'power3.in');
    const camX = (t) => 3600 * seg(t, 35.4, 36.9, 'power3.inOut');
    const camY = (t) => 2600 * seg(t, 43.5, 44.9, 'power3.inOut');
    const DEPTH = 6000;
    const place = (p, t) => {
      const z = (((p.z - camZ(t)) % DEPTH) + DEPTH) % DEPTH + 120;
      const x = (((p.x - camX(t) + 2600) % 5200) + 5200) % 5200 - 2600;
      const y = (((p.y - camY(t) + 1500) % 3000) + 3000) % 3000 - 1500;
      const s = 700 / z;
      return { X: 960 + x * s, Y: 540 + y * s, s, z };
    };
    const blooms = [$('#bloom-a'), $('#bloom-b'), $('#bloom-c')], dots = $('#dots');
    renderers.push((t) => {
      for (const p of pts) {
        const a = place(p, t), b = place(p, t - 1 / 30);
        const dx = a.X - b.X, dy = a.Y - b.Y;
        let L = Math.hypot(dx, dy);
        if (L > 480 || a.z > b.z + 200) L = 0;
        const size = Math.max(1.3, 3.4 * a.s);
        const len = Math.max(size, Math.min(L * 1.5, 380));
        const ang = L > 0.5 ? Math.atan2(-dy, -dx) : 0;
        const fade = clamp((DEPTH - a.z) / 1800) * clamp((a.z - 120) / 300);
        p.el.style.transform = `translate(${f2(a.X)}px, ${f2(a.Y - size / 2)}px) rotate(${ang.toFixed(3)}rad) scale(${(len / 100).toFixed(3)}, ${(size / 2).toFixed(3)})`;
        p.el.style.opacity = (p.b * fade * 0.8).toFixed(3);
      }
      blooms[0].style.transform = `translate(${f2(Math.sin(t * 0.17) * 180)}px, ${f2(Math.cos(t * 0.13) * 120)}px)`;
      blooms[1].style.transform = `translate(${f2(Math.cos(t * 0.11 + 1) * 200)}px, ${f2(Math.sin(t * 0.15) * 140)}px)`;
      blooms[2].style.transform = `translate(${f2(Math.sin(t * 0.14 + 2) * 220)}px, ${f2(Math.cos(t * 0.19) * 100)}px)`;
      dots.style.transform = `translate(${f2(-(camX(t) * 0.05) % 28 + Math.sin(t * 0.1) * 20)}px, ${f2(-(camY(t) * 0.05) % 28 + Math.cos(t * 0.08) * 16)}px)`;
    });
    // the light changes with the story: cold blue for the estate, teal for the graph, amber for value
    tl.set('#dots', { opacity: 0 }, 0);
    tl.to('#dots', { opacity: 0.2, duration: 1.2 }, 13.3);
    tl.to('#dots', { opacity: 0.0, duration: 1.0 }, 20.4);
    tl.to('#dots', { opacity: 0.18, duration: 1.0 }, 36.2);
    tl.to('#dots', { opacity: 0.0, duration: 1.0 }, 49.8);
    tl.to('#bloom-c', { opacity: 0.2, duration: 2 }, 21);
    tl.to('#bloom-c', { opacity: 0, duration: 1.5 }, 35.6);
    tl.to('#bloom-b', { opacity: 0.3, duration: 1.2 }, 32.4);
    tl.to('#bloom-b', { opacity: 0.12, duration: 1.2 }, 36.0);
    tl.to('#bloom-b', { opacity: 0.32, duration: 1.2 }, 46.6);
    tl.to('#bloom-b', { opacity: 0.1, duration: 1 }, 50);
  }

  // ======================= 01 · 0–13.5 · your data is everywhere → one platform =======================
  {
    const LOGOS = [
      ['snowflake', 'Snowflake', '#29B5E8', 300, 240, 1500], ['aws', 'AWS', '#FF9900', 720, 150, 2700, '#232F3E'], ['googlecloud', 'Google Cloud', '#4285F4', 1230, 170, 3300],
      ['salesforce', 'Salesforce', '#032D60', 1680, 210, 1600], ['sap', 'SAP', '#0FAAFF', 110, 430, 2300], ['databricks', 'Databricks', '#FF3621', 1810, 440, 2500],
      ['postgresql', 'PostgreSQL', '#4169E1', 300, 610, 1450], ['oracle', 'Oracle', '#C74634', 1640, 600, 1400], ['googledrive', 'Google Drive', '#1FA463', 560, 270, 3600],
      ['zendesk', 'Zendesk', '#03363D', 1420, 280, 3400], ['hubspot', 'HubSpot', '#FF7A59', 180, 830, 1900], ['sharepoint', 'SharePoint', '#036C70', 1760, 830, 1800],
      ['jira', 'Jira', '#0052CC', 640, 770, 2600], ['mongodb', 'MongoDB', '#47A248', 1290, 770, 2400], ['stripe', 'Stripe', '#635BFF', 380, 985, 1400],
      ['notion', 'Notion', '#111111', 960, 900, 3000], ['confluence', 'Confluence', '#172B4D', 1540, 985, 1500], ['dropbox', 'Dropbox', '#0061FF', 990, 80, 2100],
    ];
    const MONO = { aws: 'aws', salesforce: 'SF', oracle: 'O', sharepoint: 'SP' };
    const CZ1 = -1400, RZ = 600, ZR2 = 1500;
    const wrap = $('#o-tiles'), sv = $('#o-streaks'), R = rng(5);
    const tiles = LOGOS.map(([id, name, color, X, Y, zr, ink], i) => {
      const root = el('div', 'src', wrap);
      const inner = el('div', 'in', root, MONO[id]
        ? `<span class="lg mono-tile" style="background:${color}; color:${ink || '#fff'}">${MONO[id]}</span>${name}`
        : `<span class="lg"><svg><use href="#lg-${id}" style="color:${color}"></use></svg></span>${name}`);
      inner.setAttribute('data-layout-allow-overlap', '');
      zr *= 0.78; const scatter = [((X - 960) * zr) / F, ((Y - 540) * zr) / F, zr + CZ1];
      return { root, scatter, ang: Math.atan2(-(Y - 540), X - 960), ph: R() * 6.28, dz: (R() * 2 - 1) * 90 };
    });
    // ring slots: two ellipses, kept clear of the horizontal band where the headline sits
    const slots = [];
    const arc = (n, a0, a1, rx, ry) => { for (let k = 0; k < n; k++) { const a = ((a0 + ((a1 - a0) * k) / (n - 1)) * Math.PI) / 180; slots.push({ X: 960 + rx * Math.cos(a), Y: 540 - ry * Math.sin(a) }); } };
    arc(4, 40, 140, 560, 250); arc(3, 230, 310, 560, 250); arc(6, 28, 152, 850, 420); arc(5, 212, 328, 850, 420);
    slots.forEach((s) => { s.ang = Math.atan2(-(s.Y - 540), s.X - 960); });
    // assign by angle so nothing crosses on the way in
    const byAng = (a, b) => a.ang - b.ang;
    const ts = tiles.slice().sort(byAng), ss = slots.slice().sort(byAng);
    let best = 0, bestCost = Infinity;
    for (let r = 0; r < 18; r++) {
      let cost = 0;
      ts.forEach((tt, k) => { const s = ss[(k + r) % 18]; let d = Math.abs(tt.ang - s.ang); if (d > Math.PI) d = 2 * Math.PI - d; cost += d; });
      if (cost < bestCost) { bestCost = cost; best = r; }
    }
    ts.forEach((tt, k) => { const s = ss[(k + best) % 18]; tt.ring = [((s.X - 960) * ZR2) / F, ((s.Y - 540) * ZR2) / F, RZ + tt.dz]; tt.slotAng = s.ang; });
    // connection order sweeps clockwise from the top
    tiles.slice().sort((a, b) => ((Math.PI / 2 - a.slotAng + 4 * Math.PI) % (2 * Math.PI)) - ((Math.PI / 2 - b.slotAng + 4 * Math.PI) % (2 * Math.PI))).forEach((tt, k) => { tt.tc = 7.55 + k * 0.05; });
    tiles.forEach((tt) => { tt.base = svgEl('path', { class: 'b' }, sv); tt.pulse = svgEl('path', { class: 'p' }, sv); });

    const hub = $('#hub');
    const cam = { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, px: 0, py: 0, pz: RZ, ox: 0, oy: 0 };
    const camZ = (t) => 700 - 2100 * seg(t, 0, 6.2, 'power3.out') + 500 * seg(t, 6.2, 8.8, 'power2.inOut') + 130 * seg(t, 9.0, 11.8, 'sine.inOut') + 1230 * seg(t, 11.8, 13.4, 'power3.in');
    renderers.push((t) => {
      if (t > 13.6) return;
      cam.z = camZ(t);
      const open = 1 - seg(t, 0, 6.2, 'power3.out');
      cam.yaw = 0.38 * open + 0.02 * Math.sin(t * 0.4);
      cam.pitch = -0.1 * open;
      const m = seg(t, 6.0, 8.3, 'power3.inOut');
      const fd = lerp(lerp(750, 2100, seg(t, 0, 5.2, 'power2.out')), RZ - cam.z, seg(t, 6.0, 7.6));
      const dim = seg(t, 8.9, 10.0, 'power2.inOut');
      const H = project([0, 0, RZ], cam);
      tiles.forEach((tt, i) => {
        const w = [lerp(tt.scatter[0], tt.ring[0], m) + Math.sin(t * 0.5 + tt.ph) * 18, lerp(tt.scatter[1], tt.ring[1], m) + Math.cos(t * 0.43 + tt.ph) * 14, lerp(tt.scatter[2], tt.ring[2], m)];
        const p = project(w, cam);
        tt.p = p;
        const st = tt.root.style;
        if (p.z < 40) { st.opacity = 0; return; }
        const blur = Math.min(16, Math.abs(p.z - fd) / 210 + 3.5 * dim);
        const a = clamp((p.z - 40) / 220) * (1 - 0.55 * dim) * clamp(t / 0.7);
        st.transform = `translate(${f2(p.X)}px, ${f2(p.Y)}px) scale(${(p.s * 1.0).toFixed(4)})`;
        st.opacity = a.toFixed(3);
        const bq = Math.min(10, Math.round(blur / 2) * 2);
        if (bq !== tt.bq) { st.filter = bq ? `blur(${bq}px)` : 'none'; tt.bq = bq; }
        st.zIndex = Math.round(20000 - p.z);
      });
      // streaks: each source's light runs to the hub; after the first pass it keeps flowing
      tiles.forEach((tt) => {
        const p = tt.p;
        if (t < tt.tc || !p || p.z < 40) { tt.base.style.opacity = 0; tt.pulse.style.opacity = 0; return; }
        const nx = H.X - p.X, ny = H.Y - p.Y, cx = p.X + nx * 0.5 - ny * 0.16, cy = p.Y + ny * 0.5 + nx * 0.16;
        const d = `M${f2(p.X)} ${f2(p.Y)} Q${f2(cx)} ${f2(cy)} ${f2(H.X)} ${f2(H.Y)}`;
        tt.base.setAttribute('d', d); tt.pulse.setAttribute('d', d);
        const L = tt.base.getTotalLength();
        const pb = seg(t, tt.tc, tt.tc + 0.5, 'power2.out');
        tt.base.style.strokeDasharray = `${f2(L)} ${f2(L)}`;
        tt.base.style.strokeDashoffset = f2(L * (1 - pb));
        tt.base.style.opacity = (1 - 0.5 * dim).toFixed(3);
        const lt = t - tt.tc - 0.05;
        const q = lt < 0.6 ? seg(lt, 0, 0.6, 'power2.in') : ease('power1.in')(((lt - 0.6) / 1.5) % 1);
        const sg = Math.min(170, L * 0.5);
        tt.pulse.style.strokeDasharray = `${f2(sg)} ${f2(L + sg)}`;
        tt.pulse.style.strokeDashoffset = f2(sg - q * (L + sg * 0.2));
        tt.pulse.style.opacity = (lt < 0 ? 0 : 1).toString();
      });
      sv.style.opacity = (1 - seg(t, 11.9, 12.6)).toFixed(3);
      if (H.z > 20) {
        hub.style.transform = `translate(${f2(H.X)}px, ${f2(H.Y)}px) scale(${((H.s * ZR2) / F).toFixed(4)})`;
        hub.style.zIndex = Math.round(20000 - H.z) + 1;
        hub.style.opacity = 1;
      } else hub.style.opacity = 0;
    });

    // hub ignition, as the first light arrives
    tl.set(['#hub-core', '#hub-ring', '#hub-mk'], { opacity: 0 }, 0);
    $$('#hub-mk .mkp, #hub-mk .mkb').forEach((p) => { p.style.strokeDasharray = '40 40'; p.style.strokeDashoffset = 40; });
    tl.fromTo('#hub-core', { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }, 8.1);
    tl.fromTo('#hub-ring', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out' }, 8.15);
    tl.fromTo('#hub-wave', { scale: 0.7, opacity: 0.9 }, { scale: 2.8, opacity: 0, duration: 1.3, ease: 'power2.out', immediateRender: false }, 8.15);
    tl.set('#hub-mk', { opacity: 1 }, 8.3);
    tl.to('#hub-mk .mkp', { strokeDashoffset: 0, duration: 0.7, stagger: 0.08, ease: 'power2.inOut' }, 8.3);
    tl.to('#hub-mk .mkb', { strokeDashoffset: 0, duration: 0.45, ease: 'power3.out' }, 8.85);
    flash(8.1, 0.42, 0.1, 0.8);
    tl.fromTo('#hub-glow', { opacity: 0 }, { opacity: 0.9, duration: 1.2, ease: 'sine.inOut' }, 9.4);
    tl.to('#hub-glow', { opacity: 0.35, duration: 1.4, ease: 'sine.inOut' }, 10.6);
    tl.to('#hub-mk', { opacity: 0, duration: 0.5 }, 12.6);
    tl.fromTo('#o-world', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0);

    // type
    chapIn('#chap-1', 0.9);
    reveal(words($('#t-every')), 1.5, { stagger: 0.09, dur: 1.0 });
    unreveal($$('#t-every .w'), 5.5);
    reveal(words($('#t-one-a')), 9.1, { stagger: 0.07 });
    reveal(words($('#t-one-b')), 9.5, { stagger: 0.07 });
    pop('#hub-lbl', 10.2, { from: 0.94, y: 16, dur: 0.6 });
    unreveal($$('#t-one-a .w, #t-one-b .w'), 11.55);
    out(['#hub-lbl', '#chap-1'], 11.55);
  }

  // ======================= 02 · 13.1–21.1 · every source, scored =======================
  {
    const cam = camera($('#cam-score'), { x: 960, y: 540, s: 0.55 });
    const mb = mblur($('#cam-score'), 'score');
    tl.fromTo('#cam-score', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'none' }, 13.1);
    cam.to(13.1, { s: 1 }, 1.5, 'power3.out');
    mb.out(13.1, 0.9, 16);
    // gauge: ticks, fill and the number are one function of t so they can never disagree
    const ticks = $('#g-ticks'), N = 46, tk = [];
    for (let i = 0; i < N; i++) {
      const a = ((135 + (270 * i) / (N - 1)) * Math.PI) / 180, r0 = i % 5 === 0 ? 258 : 264, r1 = 276;
      tk.push(svgEl('line', { class: 'tick', x1: f2(280 + r0 * Math.cos(a)), y1: f2(280 + r0 * Math.sin(a)), x2: f2(280 + r1 * Math.cos(a)), y2: f2(280 + r1 * Math.sin(a)) }, ticks));
    }
    const fill = $('#g-fill'), FL = fill.getTotalLength(), score = $('#s-score');
    fill.style.strokeDasharray = `${FL} ${FL}`;
    renderers.push((t) => {
      if (t < 13 || t > 21.2) return;
      const fp = seg(t, 13.5, 15.6, 'power3.out');
      fill.style.strokeDashoffset = f2(FL * (1 - 0.71 * fp));
      score.textContent = Math.round(71 * fp).toString();
      tk.forEach((l, i) => { const on = i / (N - 1) <= 0.71 * fp; l.style.stroke = on ? '#A9B4FF' : 'rgba(255,255,255,0.16)'; });
    });
    pop('#gauge', 13.2, { from: 0.86, dur: 1.2, e: 'expo.out' });
    pop(['#s-lbl'], 14.0, { from: 0.96, y: 12, dur: 0.6 });
    chapIn('#chap-2', 13.8);
    reveal(words($('#t-score')), 13.9, { stagger: 0.07 });
    tl.fromTo('#s-panel', { opacity: 0, x: 60, rotationY: -18, transformPerspective: 1600 }, { opacity: 1, x: 0, rotationY: 0, duration: 1.2, ease: 'expo.out' }, 14.1);
    pop('#s-panel .metric', 14.3, { from: 0.98, y: 18, stagger: 0.09, dur: 0.6, e: 'expo.out' });
    tl.to('#s-panel .metric .bar i', { scaleX: 1, duration: 1.3, stagger: 0.1, ease: 'expo.out' }, 14.5);
    $$('#s-panel .metric .v').forEach((v, i) => count(v, 14.5 + i * 0.1, 0, +v.dataset.n, 1.3, undefined, 'expo.out'));
    pop('#s-kpi', 15.2, { from: 0.96, y: 10, dur: 0.6 });
    pop('#s-flagt', 16.0, { from: 0.96, y: 10, dur: 0.5 });
    pop('#score-world .flag', 16.15, { from: 0.9, y: 24, stagger: 0.11, dur: 0.7 });
    // a slow handheld drift toward the fixes, then dive into the score
    cam.to(16.4, { x: 1000, y: 580, s: 1.06, r: -0.6 }, 3.8, 'sine.inOut');
    unreveal($$('#t-score .w'), 20.05);
    out('#chap-2', 20.05);
    cam.to(20.25, { x: 560, y: 620, s: 5.2, r: 0 }, 0.85, 'power3.in');
    mb.in(20.35, 0.7, 26);
    tl.to('#cam-score', { opacity: 0, duration: 0.25 }, 20.85);
  }

  // ======================= 03 + 04 · 20.7–36.4 · the graph, the question, the light, the answer =======================
  {
    const CL = { fin: ['#FFB300', '#FFD88A', '#5A3A00'], cus: ['#6C7DFF', '#C9D0FF', '#1A2270'], ops: ['#2DD4BF', '#B5F5EA', '#0A4A42'] };
    const NODES = [
      ['invoices', 'Invoices', 'fin', -560, -170, 80], ['payments', 'Payments', 'fin', -800, 30, -60], ['suppliers', 'Suppliers', 'fin', -430, 100, -180],
      ['contracts', 'Contracts', 'fin', -650, 280, 40], ['budgets', 'Budgets', 'fin', -870, -250, -140],
      ['customers', 'Customers', 'cus', 440, -250, 40], ['policies', 'Policies', 'cus', 760, -90, -100], ['claims', 'Claims', 'cus', 410, 30, 140],
      ['brokers', 'Brokers', 'cus', 700, 210, -40], ['tickets', 'Tickets', 'cus', 340, 300, -180],
      ['orders', 'Orders', 'ops', -120, 330, 200], ['products', 'Products', 'ops', 90, 140, -240], ['shipments', 'Shipments', 'ops', 160, 430, 60],
      ['employees', 'Employees', 'ops', -60, -90, -60], ['assets', 'Assets', 'ops', -290, 470, -220], ['documents', 'Documents', 'ops', 110, -330, -140],
    ];
    const EDGES = [
      ['invoices', 'payments'], ['invoices', 'suppliers'], ['payments', 'contracts'], ['suppliers', 'contracts'], ['budgets', 'invoices'], ['budgets', 'payments'],
      ['customers', 'policies'], ['policies', 'claims'], ['claims', 'brokers'], ['customers', 'claims'], ['policies', 'brokers'], ['tickets', 'customers'], ['tickets', 'claims'],
      ['orders', 'products'], ['orders', 'shipments'], ['products', 'shipments'], ['employees', 'orders'], ['assets', 'shipments'], ['assets', 'orders'], ['documents', 'employees'],
      ['invoices', 'orders'], ['claims', 'payments'], ['customers', 'orders'], ['suppliers', 'shipments'], ['documents', 'claims'], ['documents', 'contracts'], ['employees', 'tickets'], ['products', 'policies'],
    ];
    const FIN = ['invoices', 'payments', 'suppliers', 'contracts'];
    const ROUTE = ['documents', 'claims', 'policies', 'customers', 'tickets', 'employees', 'orders', 'products', 'shipments', 'suppliers', 'payments', 'invoices'];
    const R = rng(23), wrap = $('#g-nodes'), esv = $('#g-edges'), tsv = $('#g-trail'), comet = $('#comet');
    const byId = {};
    const nodes = NODES.map(([id, label, cl, x, y, z], i) => {
      const [c1, c2, c3] = CL[cl];
      const root = el('div', 'gn', wrap, `<i class="halo"></i><i class="orb" style="background:radial-gradient(circle at 35% 30%, #fff 0%, ${c2} 22%, ${c1} 55%, ${c3} 100%); box-shadow:0 0 36px 6px ${c1}66"></i><span class="nl">${label}</span>`);
      root.setAttribute('data-layout-allow-overlap', '');
      const n = { id, cl, root, halo: root.querySelector('.halo'), orb: root.querySelector('.orb'), home: [x, y, z], scat: [x * 2.3 + (R() * 2 - 1) * 500, y * 2.3 + (R() * 2 - 1) * 400, z + (R() * 2 - 1) * 900], ph: R() * 6.28, i, fin: FIN.includes(id) };
      byId[id] = n;
      return n;
    });
    const edges = EDGES.map(([a, b], k) => {
      const same = byId[a].cl === byId[b].cl;
      const line = svgEl('line', { stroke: same ? CL[byId[a].cl][0] : '#A9B4FF' }, esv);
      return { a: byId[a], b: byId[b], same, line, k, fin: FIN.includes(a) && FIN.includes(b) };
    });
    const LABELS = [['fin', 'Finance', -700, -430, -60], ['cus', 'Customers', 590, -440, -40], ['ops', 'Operations', -20, -510, -120]];
    const labels = LABELS.map(([cl, name, x, y, z]) => {
      const root = el('div', 'cl', wrap, `<span><i style="background:${CL[cl][0]}; box-shadow:0 0 12px ${CL[cl][0]}"></i>${name}</span>`);
      root.setAttribute('data-layout-allow-overlap', '');
      return { cl, root, w: [x, y, z] };
    });
    const TRAIL = 22;
    const trail = Array.from({ length: TRAIL }, (_, k) => svgEl('circle', { r: f2(9 * (1 - k / TRAIL) + 1), fill: k < 3 ? '#FFFFFF' : '#FFC94D' }, tsv));
    const routeIdx = {}; ROUTE.forEach((id, k) => { routeIdx[id] = k / (ROUTE.length - 1); });

    const cam = { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, px: 0, py: 40, pz: 0, ox: 0, oy: 0 };
    const G0 = 20.6, C0 = 29.9, C1 = 32.4;
    const pos = (n, t) => {
      const u = seg(t, 21.5 + n.i * 0.035, 23.7 + n.i * 0.035, 'power3.inOut');
      return [lerp(n.scat[0], n.home[0], u) + Math.sin(t * 0.7 + n.ph) * 16, lerp(n.scat[1], n.home[1], u) + Math.cos(t * 0.6 + n.ph) * 13, lerp(n.scat[2], n.home[2], u) + Math.sin(t * 0.5 + n.ph * 2) * 16];
    };
    renderers.push((t) => {
      if (t < G0 - 0.1 || t > 36.5) return;
      cam.z = -(5800 - 3850 * seg(t, G0, 22.9, 'power3.out') - 90 * seg(t, 23, 28, 'sine.inOut') - 60 * seg(t, 31.9, 33.4, 'power2.inOut'));
      cam.yaw = lerp(-0.62, 0.2, seg(t, G0, 36.4, 'sine.inOut'));
      cam.pitch = lerp(0.26, 0.07, seg(t, G0, 30, 'sine.inOut'));
      cam.ox = -330 * seg(t, 31.9, 33.3, 'power3.inOut');
      cam.oy = 70 - 110 * seg(t, 27.2, 28.4, 'power2.inOut');
      const dimO = seg(t, 32.2, 33.0, 'power2.inOut');
      const cometOn = t > C0 - 0.1 && t < C1 + 0.5;
      const u = seg(t, C0, C1, 'power1.inOut');
      const k0 = 1780 / F;
      nodes.forEach((n) => {
        const p = project(pos(n, t), cam); n.p = p;
        const st = n.root.style;
        if (p.z < 60) { st.opacity = 0; return; }
        const appear = seg(t, 20.9 + n.i * 0.05, 21.6 + n.i * 0.05, 'power2.out');
        const fog = clamp(1.3 - (p.z - 1400) / 1500, 0.3, 1);
        const flare = cometOn && routeIdx[n.id] !== undefined ? Math.exp(-(((u - routeIdx[n.id]) / 0.035) ** 2)) : 0;
        const lit = n.fin ? seg(t, C1 - 0.1 + FIN.indexOf(n.id) * 0.1, C1 + 0.3 + FIN.indexOf(n.id) * 0.1, 'power2.out') : 0;
        const k = p.s * k0;
        st.transform = `translate(${f2(p.X)}px, ${f2(p.Y)}px) scale(${k.toFixed(4)})`;
        st.opacity = (appear * fog * (n.fin ? 1 : 1 - 0.62 * dimO)).toFixed(3);
        st.zIndex = Math.round(10000 - p.z);
        n.halo.style.opacity = Math.max(flare, lit).toFixed(3);
        n.orb.style.transform = `scale(${(1 + 0.4 * flare + 0.15 * lit).toFixed(3)})`;
      });
      edges.forEach((e) => {
        const a = e.a.p, b = e.b.p;
        if (!a || !b || a.z < 60 || b.z < 60) { e.line.style.opacity = 0; return; }
        const d = seg(t, 22.9 + e.k * 0.045, 23.6 + e.k * 0.045, 'power2.out');
        e.line.setAttribute('x1', f2(a.X)); e.line.setAttribute('y1', f2(a.Y));
        e.line.setAttribute('x2', f2(lerp(a.X, b.X, d))); e.line.setAttribute('y2', f2(lerp(a.Y, b.Y, d)));
        const fog = clamp(1.3 - ((a.z + b.z) / 2 - 1400) / 1500, 0.3, 1);
        const litE = e.fin ? seg(t, C1, C1 + 0.6) : 0;
        e.line.setAttribute('stroke-width', f2(2.2 * ((a.s + b.s) / 2) * k0 + 2.2 * litE));
        e.line.style.opacity = ((d > 0 ? 1 : 0) * fog * (e.same ? 0.5 : 0.26) * (e.fin ? 1 + litE : 1 - 0.65 * dimO)).toFixed(3);
      });
      labels.forEach((l) => {
        const p = project(l.w, cam);
        l.root.style.transform = `translate(${f2(p.X)}px, ${f2(p.Y)}px) scale(${(p.s * k0).toFixed(4)})`;
        l.root.style.zIndex = Math.round(10000 - p.z);
        l.root.style.opacity = (l.cl === 'fin' ? 1 : 1 - 0.7 * dimO).toFixed(3);
      });
      // the light: rides the route through the nodes' live positions, trailing a tail
      const at = (uu) => {
        const f = clamp(uu) * (ROUTE.length - 1), i0 = Math.min(ROUTE.length - 2, Math.floor(f)), fr = f - i0;
        const A = pos(byId[ROUTE[i0]], t), B = pos(byId[ROUTE[i0 + 1]], t);
        return project([lerp(A[0], B[0], fr), lerp(A[1], B[1], fr), lerp(A[2], B[2], fr)], cam);
      };
      const cA = seg(t, C0 - 0.1, C0 + 0.15) * (1 - seg(t, C1, C1 + 0.4));
      if (cometOn) {
        const h = at(u);
        comet.style.transform = `translate(${f2(h.X)}px, ${f2(h.Y)}px) scale(${(h.s * k0).toFixed(3)})`;
        comet.style.opacity = cA.toFixed(3);
        comet.style.zIndex = 20000;
        trail.forEach((c, k) => {
          const q = at(u - (k + 1) * 0.008);
          c.setAttribute('cx', f2(q.X)); c.setAttribute('cy', f2(q.Y));
          c.style.opacity = (cA * (1 - k / TRAIL) * 0.85 * (u - (k + 1) * 0.008 > 0 ? 1 : 0)).toFixed(3);
        });
      } else { comet.style.opacity = 0; trail.forEach((c) => { c.style.opacity = 0; }); }
    });

    tl.set($$('#g-nodes .cl span'), { opacity: 0 }, 0);
    tl.to($$('#g-nodes .cl span'), { opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, 24.3);
    chapIn('#chap-3', 21.4);
    reveal(words($('#t-graph')), 21.6, { stagger: 0.08 });
    unreveal($$('#t-graph .w'), 27.1);
    out('#chap-3', 27.1);
    chapIn('#chap-4', 27.5);
    // the question
    tl.fromTo('#ask', { opacity: 0, y: 70, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' }, 27.5);
    typewrite($('#ask-txt'), $('#ask-caret'), 28.1, 'Do we have data about invoices?', 23);
    tl.to('#ask-go', { scale: 0.86, duration: 0.1 }, 29.65);
    tl.to('#ask-go', { scale: 1, duration: 0.45, ease: SPRING }, 29.75);
    tl.fromTo('#ask-go', { boxShadow: '0 0 0 0 rgba(169,180,255,0.8)' }, { boxShadow: '0 0 0 26px rgba(169,180,255,0)', duration: 0.7, ease: 'power2.out' }, 29.7);
    tl.to('#ask', { opacity: 0.5, y: 10, duration: 0.6, ease: 'power2.inOut' }, 32.3);
    // the answer
    tl.fromTo('#answer', { opacity: 0, x: 80, rotationY: -16, transformPerspective: 1600 }, { opacity: 1, x: 0, rotationY: 0, duration: 1.1, ease: 'expo.out' }, 32.5);
    pop('#answer .ans-row', 32.9, { from: 0.98, x: 30, stagger: 0.14, dur: 0.7, e: 'expo.out' });
    pop('#ans-foot', 33.6, { from: 0.98, y: 10, dur: 0.5, e: 'expo.out' });
    flash(32.35, 0.16, 0.1, 0.6);
    // whip to the pipelines
    const mb = mblur($('#graph-wrap'), 'graph');
    out('#chap-4', 35.3, 0.25);
    tl.to('#graph-wrap', { x: -1100, duration: 0.75, ease: 'power3.in' }, 35.5);
    mb.in(35.55, 0.7, 34, 'x');
    tl.to('#graph-wrap', { opacity: 0, duration: 0.2 }, 36.05);
  }

  // ======================= 05 · 36.0–44.2 · a pipeline for every dataset =======================
  {
    const SX = [360, 660, 960, 1260, 1560], Y0 = 600;
    const STAGES = [['Extract', 'i-extract'], ['Structure', 'i-structure'], ['Deduplicate', 'i-dedupe'], ['Mask PII', 'i-mask'], ['Embed', 'i-embed']];
    const sw = $('#pp-stages');
    const stages = STAGES.map(([name, icon], k) => {
      const s = el('div', 'stage', sw, `<i class="lit"></i><span class="disc"><svg><use href="#${icon}" /></svg></span><span class="ok"><svg><use href="#i-check" /></svg></span><span class="lbl">${name}</span>`);
      s.style.left = SX[k] + 'px'; s.style.top = Y0 + 'px';
      s.setAttribute('data-layout-allow-overlap', '');
      return { s, lit: s.querySelector('.lit') };
    });
    const R = rng(41), pw = $('#pp-parts');
    const PN = 120, V = 410, T0 = 37.25, GAP = 0.042;
    const RAW = ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)', '#FF7A59', '#8E929E', 'rgba(169,180,255,0.55)'];
    const parts = Array.from({ length: PN }, (_, i) => {
      const e = el('i', '', pw);
      return { e, te: T0 + i * GAP + (R() - 0.5) * 0.03, lane: i % 5, w0: 14 + R() * 50, h0: 7 + R() * 12, yr: (R() * 2 - 1) * 130, rot: (R() * 2 - 1) * 48, col: RAW[Math.floor(R() * RAW.length)], dup: R() < 0.2, pii: R() < 0.32, ye: (R() * 2 - 1) * 80, mode: -1 };
    });
    const firstAt = (x) => T0 + (x + 80) / V, lastAt = (x) => T0 + (PN - 1) * GAP + (x + 80) / V;
    renderers.push((t) => {
      if (t < 35.9 || t > 44.4) return;
      for (const p of parts) {
        const x = -80 + (t - p.te) * V, st = p.e.style;
        if (x < -80 || x > 2000 || (p.dup && x > SX[2])) { st.opacity = 0; continue; }
        const yl = Y0 + (p.lane - 2) * 22;
        const al = 0.3 * sm(x, SX[0] - 150, SX[0]) + 0.7 * sm(x, SX[1] - 220, SX[1]);
        let y = lerp(Y0 + p.yr, yl, al);
        const rot = p.rot * (1 - sm(x, SX[0] - 180, SX[0]));
        let w = p.w0, h = p.h0, bg = p.col, rad = '3px', glow = 'none';
        if (x > SX[1]) { w = 34; h = 10; bg = 'rgba(233,236,255,0.85)'; }
        if (x > SX[3] && p.pii) bg = 'repeating-linear-gradient(90deg, #FFC94D 0 4px, rgba(255,201,77,0.28) 4px 7px)';
        if (x > SX[4]) { w = 11; h = 11; rad = '50%'; bg = '#A9B4FF'; glow = '0 0 14px 3px rgba(108,125,255,0.8)'; y = lerp(yl, Y0 + p.ye, sm(x, SX[4], SX[4] + 260)); }
        const a = clamp((x + 80) / 160) * (1 - sm(x, 1760, 1960));
        st.transform = `translate(${f2(x - w / 2)}px, ${f2(y - h / 2)}px) rotate(${f2(rot)}deg)`;
        st.width = f2(w) + 'px'; st.height = f2(h) + 'px';
        st.opacity = a.toFixed(3);
        const mode = x > SX[4] ? 4 : x > SX[3] && p.pii ? 3 : x > SX[1] ? 1 : 0;
        if (mode !== p.mode) { st.background = bg; st.borderRadius = rad; st.boxShadow = glow; p.mode = mode; }
      }
      stages.forEach((s, k) => {
        const on = seg(t, firstAt(SX[k]) - 0.25, firstAt(SX[k]) + 0.1) * (1 - seg(t, lastAt(SX[k]), lastAt(SX[k]) + 0.4));
        s.lit.style.opacity = (on * (0.75 + 0.25 * Math.sin(t * 9 + k))).toFixed(3);
      });
    });
    // the stream starts from the same state however the renderer arrives here
    parts.forEach((p) => { p.e.style.opacity = 0; });

    tl.fromTo('#pp-wrap', { x: 1100 }, { x: 0, duration: 0.9, ease: 'power3.out' }, 36.0);
    const mb = mblur($('#pp-wrap'), 'pipe');
    mb.out(36.0, 0.8, 30, 'x');
    chapIn('#chap-5', 36.5);
    reveal(words($('#t-pipe')), 36.6, { stagger: 0.07 });
    pop('#pp-head', 36.9, { from: 0.97, y: 16, dur: 0.7, e: 'expo.out' });
    pop('#pp-run', 37.1, { from: 0.9, dur: 0.6 });
    tl.fromTo('#pp-track', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1.2, ease: 'expo.out' }, 36.9);
    pop($$('#pp-stages .stage'), 37.0, { from: 0.5, stagger: 0.09, dur: 0.8 });
    stages.forEach((s, k) => pop(s.s.querySelector('.ok'), firstAt(SX[k]) + 1.1, { from: 0.4, dur: 0.5 }));
    tl.set(['#pp-done'], { opacity: 0 }, 0);
    pop('#st-rec', 37.6, { from: 0.97, y: 16, dur: 0.6, e: 'expo.out' });
    pop('#st-ready', 37.75, { from: 0.97, y: 16, dur: 0.6, e: 'expo.out' });
    count($('#pp-count'), 37.9, 0, 1200000, 5.1, (v) => Math.round(v).toLocaleString('en-US'), 'power1.inOut');
    count($('#pp-ready'), 38.6, 64, 86, 4.3, undefined, 'power1.inOut');
    tl.to('#pp-ready', { color: '#8FE05A', duration: 0.4 }, 42.9);
    pop(['#ln-1', '#ln-2'], 38.7, { from: 0.97, x: 30, stagger: 0.12, dur: 0.7, e: 'expo.out' });
    tl.to('#ln-1b', { scaleX: 0.62, duration: 4.4, ease: 'power1.inOut' }, 39.0);
    tl.to('#ln-2b', { scaleX: 0.41, duration: 4.4, ease: 'power1.inOut' }, 39.2);
    count($('#ln-1p'), 39.0, 0, 62, 4.4, (v) => Math.round(v) + '%', 'power1.inOut');
    count($('#ln-2p'), 39.2, 0, 41, 4.4, (v) => Math.round(v) + '%', 'power1.inOut');
    out('#pp-run', 42.8, 0.2);
    pop('#pp-done', 42.9, { from: 0.85, dur: 0.6 });
    // crane up into the use cases
    out('#chap-5', 43.3, 0.25);
    tl.to('#pp-wrap', { y: -900, duration: 0.75, ease: 'power3.in' }, 43.5);
    mb.in(43.55, 0.7, 30, 'y');
    tl.to('#pp-wrap', { opacity: 0, duration: 0.2 }, 44.05);
  }

  // ======================= 06 · 44.0–50.5 · know what to build first =======================
  {
    const mb = mblur($('#uc-wrap'), 'uses');
    tl.fromTo('#uc-wrap', { y: 900 }, { y: 0, duration: 0.9, ease: 'power3.out' }, 44.0);
    mb.out(44.0, 0.8, 30, 'y');
    chapIn('#chap-6', 44.5);
    reveal(words($('#t-uses')), 44.55, { stagger: 0.07 });
    tl.fromTo(['#uc-1', '#uc-2', '#uc-3'], { opacity: 0, rotationX: -78, y: 90, transformPerspective: 1500, transformOrigin: '50% 100%' }, { opacity: 1, rotationX: 0, y: 0, duration: 1.1, stagger: 0.14, ease: 'expo.out' }, 44.4);
    $$('#uc-wrap .uv').forEach((v, i) => count(v, 45.0 + i * 0.14, 0, +v.dataset.n, 1.5, (x) => '$' + x.toFixed(1) + 'M', 'expo.out'));
    pop('#uc-wrap .st', 46.0, { from: 0.85, stagger: 0.12, dur: 0.6 });
    pop('#uc-total', 46.8, { from: 0.98, y: 24, dur: 0.8, e: 'expo.out' });
    count($('#uc-sum'), 46.9, 0, 4.4, 1.4, (x) => '$' + x.toFixed(1) + 'M', 'expo.out');
    tl.fromTo('#uc-wrap', { scale: 1 }, { scale: 1.035, duration: 4.0, ease: 'sine.inOut', immediateRender: false }, 45.5);
    // everything collapses into a point of light
    out(['#chap-6'], 49.4, 0.25);
    unreveal($$('#t-uses .w'), 49.4);
    tl.to('#uc-wrap', { scale: 0.06, opacity: 0, filter: 'blur(18px)', duration: 0.75, ease: 'power3.in' }, 49.6);
    flash(50.2, 0.6, 0.1, 0.9);
  }

  // ======================= close · 50.2–56 · the lockup =======================
  {
    tl.fromTo('#horizon', { opacity: 0, y: 260 }, { opacity: 0.8, y: 0, duration: 2.4, ease: 'power2.out' }, 50.2);
    // the icon arrives out of focus and settles
    tl.fromTo('#end-icon', { scale: 0.55, opacity: 0, filter: 'blur(18px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.0, ease: 'expo.out' }, 50.3);
    // three streams draw in, each led by a point of light, and merge into the bar
    const strokes = $$('#end-mk .emk'), heads = $$('#end-mk .ehd'), bar = $('#end-bar');
    strokes.forEach((p, i) => {
      const L = p.getTotalLength(); p.style.strokeDasharray = `${L} ${L}`; p.style.strokeDashoffset = L;
      const q = { u: 0 }, h = heads[i];
      const place = () => { const pt = p.getPointAtLength(L * q.u); h.setAttribute('cx', f2(pt.x)); h.setAttribute('cy', f2(pt.y)); p.style.strokeDashoffset = f2(L * (1 - q.u)); };
      place();
      tl.fromTo(q, { u: 0 }, { u: 1, duration: 0.8, ease: 'power2.inOut', immediateRender: false, onUpdate: place }, 50.65 + i * 0.07);
      tl.fromTo(h, { opacity: 0 }, { opacity: 1, duration: 0.15, immediateRender: false }, 50.65 + i * 0.07);
      tl.to(h, { opacity: 0, duration: 0.25 }, 51.4 + i * 0.07);
    });
    const BL = bar.getTotalLength(); bar.style.strokeDasharray = `${BL} ${BL}`; bar.style.strokeDashoffset = BL;
    tl.to(bar, { strokeDashoffset: 0, duration: 0.45, ease: 'power3.out' }, 51.45);
    tl.fromTo('#end-icon-glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 51.5);
    tl.to('#end-icon-glow', { opacity: 0.45, duration: 1.2, ease: 'sine.inOut' }, 52.0);
    // the wordmark opens out of the icon behind a moving light edge; the lockup stays centred
    tl.fromTo('#end-wordwrap', { width: 0, marginLeft: 0 }, { width: 724, marginLeft: 52, duration: 1.5, ease: 'expo.inOut' }, 51.75);
    tl.fromTo('#end-edge', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 51.8);
    tl.to('#end-edge', { opacity: 0, duration: 0.5 }, 53.0);
    tl.fromTo('#end-word', { x: -60 }, { x: 0, duration: 1.5, ease: 'expo.out' }, 51.75);
    reveal(words($('#end-line')), 53.0, { stagger: 0.07 });
    pop('#end-url', 53.7, { from: 0.9, y: 16, dur: 0.8 });
    tl.fromTo('#end-cam', { scale: 1.0 }, { scale: 1.035, duration: 5.8, ease: 'sine.out' }, 50.2);
  }

  // first frame: draw every world at t=0
  for (const r of renderers) r(0);
  return tl;
};
