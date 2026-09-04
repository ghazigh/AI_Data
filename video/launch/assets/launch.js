/* Datalith launch film — the HTML layer over the Three.js world.
   One paused GSAP timeline drives both: a linear clock tween renders the
   world at exactly the timeline's time, and every overlay is a tween on the
   same timeline. Deterministic: no clocks, no random, no relative tweens. */
window.__buildLaunch = function () {
  const root = document.getElementById('root');
  const W = +root.dataset.width, H = +root.dataset.height;
  const P = H > W;
  const tl = gsap.timeline({ paused: true });
  const PH = window.__WORLD_PHASES;

  // ---- the world ------------------------------------------------------------
  if (!window.__HF_NO_WORLD && window.__createWorld) {
    const world = window.__createWorld({ width: W, height: H, portrait: P });
    world.canvas.className = 'world';
    root.insertBefore(world.canvas, root.firstChild);
    const clock = { t: 0 };
    world.renderAt(0);
    tl.to(clock, { t: PH.end, duration: PH.end, ease: 'none', onUpdate: () => world.renderAt(clock.t) }, 0);
  }

  // ---- helpers ----------------------------------------------------------------
  const hash = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 } return h };
  const HUES = [222, 262, 196, 158, 28, 340, 182, 300, 210, 44];
  const hue = v => HUES[hash(v.toLowerCase()) % HUES.length];
  const mono = n => { const w = n.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/); return (w.length > 1 ? w[0][0] + w[1][0] : n.slice(0, 2)).toUpperCase() };
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e };
  const markHTML = v => { const h = hue(v); return `<span class="mark" data-layout-allow-overlap style="background:hsl(${h} 45% 20%);color:hsl(${h} 80% 82%);box-shadow:inset 0 0 0 1.5px hsl(${h} 40% 32%)">${mono(v)}</span>` };
  const fmt = n => Math.round(n).toLocaleString('en-US');
  function splitWords(node) {
    node.querySelectorAll('.line').forEach(line => {
      line.innerHTML = line.textContent.trim().split(/\s+/).map(w => `<span class="w" data-layout-allow-overlap>${w}</span>`).join('');
    });
  }
  const enterWords = (sel, t, o = {}) => tl.fromTo(sel + ' .w', { y: o.y ?? 60, autoAlpha: 0, filter: 'blur(14px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: o.dur ?? 0.8, ease: o.ease ?? 'power4.out', stagger: o.stagger ?? 0.055 }, t);
  const exitWords = (sel, t) => tl.to(sel + ' .w', { y: -40, autoAlpha: 0, filter: 'blur(10px)', duration: 0.4, ease: 'power3.in', stagger: 0.02 }, t);
  const rise = (sel, t, o = {}) => tl.fromTo(sel, { y: o.y ?? 36, x: o.x ?? 0, autoAlpha: 0 }, { y: 0, x: 0, autoAlpha: 1, duration: o.dur ?? 0.7, ease: o.ease ?? 'power3.out', stagger: o.stagger ?? 0 }, t);
  const pop = (sel, t, o = {}) => tl.fromTo(sel, { scale: o.from ?? 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: o.dur ?? 0.55, ease: o.ease ?? 'back.out(1.7)', stagger: o.stagger ?? 0.05 }, t);
  function count(node, to, t, o = {}) {
    const p = { v: o.from ?? 0 }; const f = o.fmt ?? fmt; node.textContent = f(p.v);
    tl.to(p, { v: to, duration: o.dur ?? 1.4, ease: o.ease ?? 'power2.out', onUpdate: () => { node.textContent = f(p.v) } }, t);
  }
  // Scene handoff: the world carries continuity, so the overlay only needs a quick blur-fade.
  function hand(outId, inId, t) {
    tl.to(`#${outId} > .sc`, { y: -40, autoAlpha: 0, filter: 'blur(12px)', duration: 0.45, ease: 'power3.in' }, t);
    tl.fromTo(`#${inId} > .sc`, { y: 50, autoAlpha: 0, filter: 'blur(10px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }, t + 0.05);
  }
  // A UI panel turned into the world: the frame and its root-level video move as one.
  function panel(frameId, t, o = {}) {
    const frame = document.getElementById(frameId);
    const video = document.querySelector(`video[data-frame="${frameId}"]`);
    const targets = video ? [frame, video] : [frame];
    if (video) Object.assign(video.style, { left: frame.style.left, top: frame.style.top, width: frame.style.width, height: frame.style.height, position: 'absolute', objectFit: 'cover', borderRadius: '22px', zIndex: 5, background: '#FCFCFB', transformOrigin: frame.style.transformOrigin });
    const ry = o.ry ?? (P ? 0 : -12);
    tl.fromTo(targets, { y: 120, autoAlpha: 0, rotationY: ry - 10, rotationX: 8, transformPerspective: 1800, scale: 0.94 }, { y: 0, autoAlpha: 1, rotationY: ry, rotationX: 0, scale: 1, duration: 1.0, ease: 'power4.out' }, t);
    tl.to(targets, { rotationY: ry + 4, y: -8, duration: o.hold ?? 6, ease: 'sine.inOut' }, t + 1);
    tl.to(targets, { y: -60, autoAlpha: 0, filter: 'blur(12px)', duration: 0.45, ease: 'power3.in' }, o.exit);
  }

  // ---- HUD: corner marks, phase label, progress rule --------------------------
  tl.fromTo('#hud', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'sine.out' }, 0.6);
  tl.fromTo('#hud-bar', { scaleX: 0 }, { scaleX: 1, duration: PH.end, ease: 'none' }, 0);
  const PHASES = [[0, '00', 'The estate'], [PH.stat, '00', 'Why agents stall'], [PH.logo, '—', 'Datalith'], [PH.connect, '01', 'Connect'], [PH.ready, '02', 'Ready'], [PH.fix, '03', 'Pipelines'], [PH.graph, '04', 'Graph'], [PH.ask, '05', 'Search'], [PH.build, '06', 'Use cases'], [PH.govern, '07', 'Governance'], [PH.close, '—', 'Every source. One graph.']];
  const hudPhase = document.getElementById('hud-phase');
  // Simpler and exact: drive the label from the clock itself.
  const hudClock = { t: 0 };
  tl.to(hudClock, { t: PH.end, duration: PH.end, ease: 'none', onUpdate: () => { let k = 0; while (k < PHASES.length - 1 && hudClock.t >= PHASES[k + 1][0]) k++; hudPhase.innerHTML = `<b>${PHASES[k][1]}</b> ${PHASES[k][2]}`; } }, 0);

  // =========================================================================
  // S0 — the scatter. 0 → 6
  // =========================================================================
  {
    const read = document.getElementById('s0-read');
    const STEPS = ['38 systems', '38 systems · 8 domains', '38 systems · 8 domains · <b>0 visibility</b>'];
    const rp = { i: 0 };
    tl.to(rp, { i: 2.999, duration: 2.6, ease: 'none', onUpdate: () => { read.innerHTML = STEPS[Math.min(2, Math.floor(rp.i))] } }, 0.6);
    rise('#s0-read', 0.5, { y: 0, x: -30 });
    splitWords(document.getElementById('s0-h1')); splitWords(document.getElementById('s0-h2'));
    enterWords('#s0-h1', 1.0, { stagger: 0.09, y: 90 });
    exitWords('#s0-h1', 3.7);
    tl.fromTo('#s0-h2 .w', { scale: 1.3, autoAlpha: 0, filter: 'blur(16px)' }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power4.out', stagger: 0.07 }, 4.05);
  }
  hand('s0', 's1', PH.stat);

  // =========================================================================
  // S1 — the one number. 6 → 11
  // =========================================================================
  {
    const t = PH.stat;
    rise('#s1-eyebrow', t + 0.2, { x: -30, y: 0 });
    tl.fromTo('#s1-stat', { scale: 0.85, autoAlpha: 0, y: 40 }, { scale: 1, autoAlpha: 1, y: 0, duration: 0.7, ease: 'power4.out' }, t + 0.25);
    count(document.getElementById('s1-n'), 40, t + 0.3, { dur: 1.5, ease: 'power3.out', fmt: v => Math.round(v) });
    rise('#s1-stat .l', t + 0.9, { y: 30 });
    rise('#s1-src', t + 1.4, { y: 0, x: 30 });
    tl.fromTo('#s1-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, t + 0.3);
  }
  hand('s1', 's2', PH.logo);

  // =========================================================================
  // S2 — the name. 11 → 17
  // =========================================================================
  {
    const t = PH.logo;
    const bez = (p0, p1, p2, p3) => { let len = 0, prev = p0; for (let i = 1; i <= 64; i++) { const s = i / 64, a = (1 - s) ** 3, b = 3 * (1 - s) ** 2 * s, c = 3 * (1 - s) * s * s, d = s ** 3; const p = [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]; len += Math.hypot(p[0] - prev[0], p[1] - prev[1]); prev = p } return len };
    const curve = bez([0, 3], [8, 3], [10, 10], [16, 10]);
    const streams = document.querySelectorAll('#s2-logo .streams path');
    streams.forEach((p, i) => { const L = i === 1 ? 16 : curve; p.style.strokeDasharray = L; p.style.strokeDashoffset = L });
    const merge = document.querySelector('#s2-logo .merge'); merge.style.strokeDasharray = 12; merge.style.strokeDashoffset = 12;
    tl.fromTo('#s2-logo', { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, t + 0.2);
    tl.to(streams, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut', stagger: 0.12 }, t + 0.35);
    tl.to(merge, { strokeDashoffset: 0, duration: 0.5, ease: 'power4.out' }, t + 1.35);
    tl.fromTo('#s2-word span', { y: 90, autoAlpha: 0, filter: 'blur(12px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out', stagger: 0.045 }, t + 1.5);
    const tag = document.querySelectorAll('#s2-tag span');
    tl.fromTo(tag, { y: 34, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', stagger: 0.42 }, t + 2.6);
    tl.to(tag, { color: '#ffffff', duration: 0.3, stagger: 0.42 }, t + 2.75);
    tl.fromTo('#s2-lock', { scale: 1 }, { scale: 1.04, duration: 5, ease: 'sine.inOut' }, t + 1.2);
  }
  hand('s2', 's3', PH.connect);

  // =========================================================================
  // S3 — connect. 17 → 25 (the world draws every line into the hub)
  // =========================================================================
  {
    const t = PH.connect;
    const VENDORS = ['Snowflake', 'Guidewire', 'Salesforce', 'Microsoft', 'Oracle', 'AWS', 'Google Cloud', 'Databricks', 'PostgreSQL', 'Zendesk', 'Atlassian', 'DocuSign'];
    const grid = document.getElementById('s3-grid');
    VENDORS.forEach(v => { const c = el('div', 'tag', `${markHTML(v)}<span>${v}</span>`); c.style.position = 'relative'; grid.appendChild(c) });
    rise('#s3-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s3-h')); enterWords('#s3-h', t + 0.3, { stagger: 0.07 });
    rise('#s3-lead', t + 0.9, { y: 30 });
    pop('#s3-grid .tag', t + 1.4, { from: 0.5, stagger: 0.04 });
    pop('#s3-c1', t + 5.6, { from: 0.6 });
    count(document.querySelector('#s3-c1 b'), 34, t + 5.6, { dur: 1.2, fmt: v => Math.round(v) });
  }
  hand('s3', 's4', PH.ready);

  // =========================================================================
  // S4 — ready. 25 → 33 (the world tints every node by its score)
  // =========================================================================
  {
    const t = PH.ready;
    rise('#s4-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s4-h')); enterWords('#s4-h', t + 0.3, { stagger: 0.07 });
    const R = 150, C = 2 * Math.PI * R * 0.75;
    const fill = document.querySelector('#s4-ring .fill'); fill.style.strokeDasharray = C; fill.style.strokeDashoffset = C;
    tl.fromTo('#s4-ring', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, t + 0.7);
    tl.to(fill, { strokeDashoffset: C * (1 - 0.71), duration: 1.8, ease: 'power3.out' }, t + 1.0);
    count(document.getElementById('s4-score'), 71, t + 1.0, { dur: 1.8, ease: 'power3.out', fmt: v => Math.round(v) });
    rise('#s4-ring .cap, #s4-ring .delta', t + 1.8, { y: 16, stagger: 0.15 });
    tl.fromTo('#s4-ring .tick', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, t + 2.6);
    const DIMS = [['Completeness', 82], ['Freshness', 64], ['Consistency', 74], ['Semantic coverage', 58], ['Governance coverage', 79]];
    const bars = document.getElementById('s4-bars');
    DIMS.forEach(([n, v], i) => {
      const b = el('div', `bar${v < 70 ? ' under' : ''}`, `<div><p class="n">${n}</p><div class="t"><i class="f"></i><i class="m" style="left:70%"></i></div></div><p class="s">0</p>`);
      bars.appendChild(b);
      rise(b, t + 1.2 + i * 0.18, { y: 26 });
      tl.fromTo(b.querySelector('.f'), { scaleX: 0 }, { scaleX: v / 100, duration: 1.1, ease: 'power3.out' }, t + 1.45 + i * 0.18);
      count(b.querySelector('.s'), v, t + 1.45 + i * 0.18, { dur: 1.1, ease: 'power3.out', fmt: x => Math.round(x) });
    });
    rise('#s4-note', t + 3.4, { y: 20 });
  }
  hand('s4', 's5', PH.fix);

  // =========================================================================
  // S5 — fix. 33 → 41 (pulses turn amber nodes green; the run plays in a panel)
  // =========================================================================
  {
    const t = PH.fix;
    rise('#s5-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s5-h')); enterWords('#s5-h', t + 0.3, { stagger: 0.07 });
    const FLAGS = [['Unmasked PII in customer contacts', 'Salesforce Broker Portal', '12 columns'], ['Duplicate policyholder records', 'Guidewire PolicyCenter', '41,208 records'], ['Treaty documents unchunked', 'DocuSign Treaty Documents', '22,470 documents']];
    const rows = document.getElementById('s5-flags');
    FLAGS.forEach(f => rows.appendChild(el('div', 'row four', `<span class="pill fail">Flag</span><div><p class="t">${f[0]}</p><p class="d">${f[1]}</p></div><p class="c">${f[2].split(' ')[0]}<small>${f[2].split(' ')[1]}</small></p>`)));
    rise('#s5-flags .row', t + 1.2, { y: 30, x: -30, stagger: 0.18 });
    // each flag resolves as its remediation pulse lands in the world
    document.querySelectorAll('#s5-flags .row').forEach((r, i) => {
      const pill = r.querySelector('.pill');
      const st = { v: 0 };
      tl.to(st, { v: 1, duration: 0.01, onUpdate: () => { pill.className = 'pill ok'; pill.textContent = 'Fixed' } }, t + 3.6 + i * 0.9);
      tl.fromTo(pill, { scale: 1.3 }, { scale: 1, duration: 0.5, ease: 'back.out(2)', immediateRender: false }, t + 3.6 + i * 0.9);
    });
    panel('s5-frame', t + 0.6, { exit: PH.graph, hold: 6.5 });
    pop('#s5-c1', t + 5.6, { from: 0.6 });
  }
  hand('s5', 's6', PH.graph);

  // =========================================================================
  // S6 — the graph. 41 → 51 (the hub blooms; the camera orbits)
  // =========================================================================
  {
    const t = PH.graph;
    rise('#s6-eyebrow', t + 0.6, { x: -30, y: 0 });
    splitWords(document.getElementById('s6-h')); enterWords('#s6-h', t + 0.7, { stagger: 0.07 });
    const S = [['s6-n1', 2.4, v => `${v.toFixed(1)}M`], ['s6-n2', 1.9, v => `${v.toFixed(1)}M`], ['s6-n3', 8, v => `${Math.round(v)}`]];
    S.forEach(([id, v, f], i) => { rise(`#${id}`, t + 2.2 + i * 0.25, { y: 30 }); count(document.querySelector(`#${id} .v span`), v, t + 2.3 + i * 0.25, { dur: 1.4, fmt: f }) });
    rise('#s6-domains span', t + 4.6, { y: 14, stagger: 0.08 });
  }
  hand('s6', 's7', PH.ask);

  // =========================================================================
  // S7 — ask. 51 → 58
  // =========================================================================
  {
    const t = PH.ask;
    rise('#s7-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s7-h')); enterWords('#s7-h', t + 0.3, { stagger: 0.07 });
    rise('#s7-lead', t + 0.9, { y: 30 });
    panel('s7-frame', t + 0.5, { exit: PH.build, hold: 5.5 });
    pop('#s7-c1', t + 5.0, { from: 0.6 });
  }
  hand('s7', 's8', PH.build);

  // =========================================================================
  // S8 — build. 58 → 66 (agents query the graph; the map ranks what to build)
  // =========================================================================
  {
    const t = PH.build;
    rise('#s8-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s8-h')); enterWords('#s8-h', t + 0.3, { stagger: 0.06 });
    const UC = [['Claims triage copilot', 2.1, 6, 'ready'], ['Subrogation recovery finder', 1.75, 5, 'ready'], ['Fraud signal triage agent', 1.45, 7, 'ready'], ['FNOL intake concierge', 1.2, 4, 'ready'], ['Renewal retention agent', 0.98, 4, 'ready'], ['Reinsurance treaty reader', 0.88, 8, 'review'], ['Complaint routing agent', 0.76, 5, 'review'], ['Broker follow-up agent', 0.64, 5, 'blocked'], ['Underwriting quote copilot', 0.59, 9, 'blocked'], ['Contract clause extraction', 0.51, 6, 'blocked'], ['Regulatory filing assistant', 0.46, 7, 'blocked'], ['Property risk scoring', 0.41, 6, 'blocked'], ['Support ticket summarizer', 0.34, 3, 'ready'], ['Broker onboarding agent', 0.26, 3, 'ready']];
    const svg = document.getElementById('s8-svg');
    const MW = +svg.getAttribute('data-w'), MH = +svg.getAttribute('data-h'), pad = { l: 80, r: 30, t: 36, b: 60 };
    const x = w => pad.l + ((w - 2) / 8) * (MW - pad.l - pad.r), y = v => MH - pad.b - (v / 2.4) * (MH - pad.t - pad.b);
    const ns = 'http://www.w3.org/2000/svg';
    const add = (tag, attrs, parent = svg) => { const n = document.createElementNS(ns, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n };
    [0.5, 1, 1.5, 2].forEach(v => { add('line', { class: 'gridl', x1: pad.l, x2: MW - pad.r, y1: y(v), y2: y(v) }); const tx = add('text', { class: 'lbl', x: pad.l - 12, y: y(v) + 6, 'text-anchor': 'end' }); tx.textContent = `$${v}M` });
    [3, 5, 7, 9].forEach(w => { const tx = add('text', { class: 'lbl', x: x(w), y: MH - pad.b + 28, 'text-anchor': 'middle' }); tx.textContent = `${w} wks` });
    add('line', { class: 'axis', x1: pad.l, x2: MW - pad.r, y1: MH - pad.b, y2: MH - pad.b });
    add('line', { class: 'axis', x1: pad.l, x2: pad.l, y1: pad.t, y2: MH - pad.b });
    const q = (tx, xx, yy, anchor) => { const n = add('text', { class: 'quad', x: xx, y: yy, 'text-anchor': anchor }); n.textContent = tx; return n };
    const quads = [q('Quick wins', pad.l + 14, pad.t + 20, 'start'), q('Strategic bets', MW - pad.r - 14, pad.t + 20, 'end')];
    const pts = UC.map(([n, v, w, s], i) => {
      const g = add('g', { class: `pt ${s}` }); g.setAttribute('transform', `translate(${x(w)} ${y(v)})`);
      const r = 8 + 15 * Math.sqrt(v / 2.4); add('circle', { cx: 0, cy: 0, r }, g);
      if (i < 4) { const tx = add('text', { x: r + 10, y: 7 }, g); tx.textContent = n }
      g.style.transformOrigin = `${x(w)}px ${y(v)}px`; g.style.transformBox = 'view-box'; return g;
    });
    tl.fromTo('#s8-svg .axis, #s8-svg .gridl, #s8-svg .lbl', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.02 }, t + 0.8);
    tl.fromTo(quads, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, t + 1.3);
    const order = [...pts].sort((a, b) => ['ready', 'review', 'blocked'].indexOf(a.classList[1]) - ['ready', 'review', 'blocked'].indexOf(b.classList[1]));
    tl.fromTo(order, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.08 }, t + 1.4);
    tl.fromTo('#s8-panel', { y: 60, autoAlpha: 0, rotationY: P ? 0 : -14, transformPerspective: 1800 }, { y: 0, autoAlpha: 1, rotationY: P ? 0 : -10, duration: 0.9, ease: 'power4.out' }, t + 0.6);
    tl.fromTo('#s8-hero', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power4.out' }, t + 3.2);
    count(document.querySelector('#s8-hero .v span'), 8.1, t + 3.3, { dur: 1.6, ease: 'power3.out', fmt: v => v.toFixed(1) });
    rise('#s8-hero .l', t + 3.7, { y: 20 });
    rise('#s8-legend p', t + 2.2, { y: 18, stagger: 0.15 });
  }
  hand('s8', 's9', PH.govern);

  // =========================================================================
  // S9 — govern. 66 → 73 (the shield closes; one query bounces)
  // =========================================================================
  {
    const t = PH.govern;
    rise('#s9-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s9-h')); enterWords('#s9-h', t + 0.3, { stagger: 0.05, y: 50 });
    const LOG = [['14:22:07', 'claims-triage-01', 'policy(PL-88421) → claim → coverage', 'ok', 'Allowed'], ['14:21:58', 'support-summary-01', 'policyholder(884201).national_id', 'warn', 'Denied'], ['14:21:40', 'treaty-reader-02', 'treaty(RT-2291) → cession', 'ok', 'Allowed'], ['14:19:12', 'claims-triage-01', 'claim(CL-77310) → fnol.loss_description', 'warn', 'Denied'], ['14:18:03', 'broker-insights-01', 'broker(BR-4410) → submission', 'ok', 'Allowed']];
    const log = document.getElementById('s9-log');
    LOG.forEach(r => log.appendChild(el('div', 'arow', `<span class="w">${r[0]}</span><span class="a">${r[1]}</span><span class="q">${r[2]}</span><span class="pill ${r[3]}">${r[4]}</span>`)));
    tl.fromTo('#s9-panel', { y: 60, autoAlpha: 0, rotationY: P ? 0 : -14, transformPerspective: 1800 }, { y: 0, autoAlpha: 1, rotationY: P ? 0 : -10, duration: 0.9, ease: 'power4.out' }, t + 0.6);
    rise('#s9-log .arow', t + 1.0, { y: 30, stagger: 0.16, ease: 'power4.out' });
    rise('#s9-tiles .tile', t + 1.6, { y: 30, stagger: 0.15 });
    count(document.querySelector('#s9-t2 .v'), 184, t + 1.8, { dur: 1.4, fmt: v => `${Math.round(v)}K` });
    count(document.querySelector('#s9-t3 .v'), 3, t + 2.1, { dur: 0.8, fmt: v => Math.round(v) });
  }
  tl.to('#s9 > .sc', { autoAlpha: 0, filter: 'blur(10px)', duration: 0.6, ease: 'sine.inOut' }, PH.close);

  // =========================================================================
  // S10 — the close. 73 → 90 (the world converges into the mark, then the words)
  // =========================================================================
  {
    const t = PH.close;
    tl.fromTo('#s10 > .sc', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, t);
    tl.fromTo('#s10-word span', { y: 60, autoAlpha: 0, filter: 'blur(12px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out', stagger: 0.04 }, t + 5.0);
    splitWords(document.getElementById('s10-l1')); splitWords(document.getElementById('s10-l2'));
    enterWords('#s10-l1', t + 6.4, { stagger: 0.07, y: 40 });
    enterWords('#s10-l2', t + 7.6, { stagger: 0.07, y: 40 });
    tl.to('#s10-l1 .w, #s10-l2 .w', { y: -30, autoAlpha: 0, filter: 'blur(8px)', duration: 0.45, ease: 'power3.in', stagger: 0.012 }, t + 11.2);
    tl.fromTo('#s10-cta', { y: 50, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power4.out' }, t + 11.7);
    rise('#s10-site', t + 12.3, { y: 16 });
    tl.to('#hud', { autoAlpha: 0.5, duration: 1 }, t + 11.7);
  }

  return tl;
};
