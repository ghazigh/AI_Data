/* Datalith launch film — one paused GSAP timeline.
   Story: data everywhere → one platform → scored dashboard → the knowledge graph forms →
   a question, a light checks the graph, an answer → a pipeline per dataset, monitored →
   proposed use cases → close.
   Motion rules: one virtual camera per board, directional SVG motion blur riding every
   move, spring entrances, per-word masked type, a typed prompt, and a substrate
   (blooms, grain, dot grid) that never stops moving. */
window.__buildFilm = function buildFilm() {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const SPRING = 'back.out(1.7)';
  const OUT = 'power4.out';
  const NS = 'http://www.w3.org/2000/svg';

  // ---------- helpers ----------
  function camera(el, init) {
    const c = Object.assign({ x: 960, y: 540, s: 1, r: 0 }, init);
    const write = () => {
      const a = (c.r * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a);
      const sx = c.x * c.s, sy = c.y * c.s;
      el.style.transform = `translate(${960 - (cos * sx - sin * sy)}px, ${540 - (sin * sx + cos * sy)}px) rotate(${c.r}deg) scale(${c.s})`;
    };
    write();
    return { c, to: (t, vals, duration, ease) => tl.to(c, Object.assign({ duration, ease, onUpdate: write }, vals), t) };
  }
  function blur(id) {
    const node = document.getElementById('mbb-' + id);
    const p = { v: 0, ax: 1, ay: 1 };
    const write = () => node.setAttribute('stdDeviation', `${(p.v * p.ax).toFixed(2)} ${(p.v * p.ay).toFixed(2)}`);
    write();
    const axis = (name) => { p.ax = name === 'y' ? 0 : 1; p.ay = name === 'x' ? 0 : 1; };
    return {
      leg: (t, dur, peak, ax = 'xy', ease = 'power2') => {
        tl.set(p, { v: 0, onUpdate: () => { axis(ax); write(); } }, t);
        tl.to(p, { v: peak, duration: dur / 2, ease: ease + '.in', onUpdate: write }, t);
        tl.to(p, { v: 0, duration: dur / 2, ease: ease + '.out', onUpdate: write }, t + dur / 2);
      },
      out: (t, dur, peak, ax = 'xy', ease = OUT) => {
        tl.set(p, { v: peak, onUpdate: () => { axis(ax); write(); } }, t);
        tl.to(p, { v: 0, duration: dur, ease, onUpdate: write }, t);
      },
      in: (t, dur, peak, ax = 'xy', ease = 'power3.in') => {
        tl.set(p, { v: 0, onUpdate: () => { axis(ax); write(); } }, t);
        tl.to(p, { v: peak, duration: dur, ease, onUpdate: write }, t);
      },
    };
  }
  function words(el) {
    const out = [];
    Array.from(el.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        if (/^\s/.test(n.textContent)) frag.appendChild(document.createTextNode(' '));
        n.textContent.split(/\s+/).filter(Boolean).forEach((w) => {
          const m = document.createElement('span'); m.className = 'm';
          const s = document.createElement('span'); s.className = 'w'; s.textContent = w; s.setAttribute('data-layout-allow-overlap', '');
          m.appendChild(s); frag.appendChild(m); frag.appendChild(document.createTextNode(' ')); out.push(s);
        });
        el.replaceChild(frag, n);
      }
    });
    return out;
  }
  const reveal = (targets, t, { dur = 0.55, stagger = 0.04, ease = OUT } = {}) =>
    tl.fromTo(targets, { yPercent: 96, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur, stagger, ease }, t);
  const unreveal = (targets, t, { dur = 0.35, stagger = 0.025 } = {}) =>
    tl.to(targets, { yPercent: -96, opacity: 0, duration: dur, stagger, ease: 'power3.in' }, t);
  const pop = (targets, t, { from = 0.92, dur = 0.5, stagger = 0.08, y = 0, ease = SPRING } = {}) =>
    tl.fromTo(targets, { scale: from, opacity: 0, y }, { scale: 1, opacity: 1, y: 0, duration: dur, stagger, ease }, t);
  const show = (targets, t) => tl.set(targets, { autoAlpha: 1 }, t);
  const hide = (targets, t) => tl.set(targets, { autoAlpha: 0 }, t);
  function count(el, t, from, to, dur, fmt = (v) => Math.round(v).toString(), ease = 'power2.out') {
    const p = { v: from }; el.textContent = fmt(from);
    tl.to(p, { v: to, duration: dur, ease, onUpdate: () => { el.textContent = fmt(p.v); } }, t);
  }
  function typewrite(el, caret, t, text, cps = 30) {
    const p = { n: 0 }; el.textContent = '';
    tl.to(p, { n: text.length, duration: text.length / cps, ease: 'none', onUpdate: () => { el.textContent = text.slice(0, Math.floor(p.n)); } }, t);
    if (caret) { const b = { i: 0 }; tl.to(b, { i: 16, duration: 8, ease: 'steps(16)', onUpdate: () => { caret.style.opacity = b.i % 2 ? 0 : 1; } }, t - 0.6); }
  }
  function drawPath(path, t, dur, ease = 'power2.inOut') {
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L} ${L}`; path.style.strokeDashoffset = L;
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease }, t);
  }
  function pulsePath(path, t, dur, segLen = 220) {
    const L = path.getTotalLength(), seg = Math.min(segLen, L * 0.6);
    path.style.strokeDasharray = `${seg} ${L + seg}`; path.style.strokeDashoffset = seg;
    tl.set(path, { opacity: 1 }, t);
    tl.to(path, { strokeDashoffset: -L, duration: dur, ease: 'power1.inOut' }, t);
    tl.set(path, { opacity: 0 }, t + dur);
  }
  const svgEl = (tag, attrs) => { const e = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); return e; };

  // ---------- substrate ----------
  const blooms = [$('#bloom-a'), $('#bloom-b'), $('#bloom-c')];
  const dots = $('#dots');
  const sub = { p: 0 };
  tl.to(sub, {
    p: 55, duration: 55, ease: 'none', onUpdate: () => {
      const t = sub.p;
      blooms[0].style.transform = `translate(${Math.sin(t * 0.21) * 140}px, ${Math.cos(t * 0.17) * 110}px)`;
      blooms[1].style.transform = `translate(${Math.cos(t * 0.15 + 1) * 160}px, ${Math.sin(t * 0.19) * 120}px)`;
      blooms[2].style.transform = `translate(${Math.sin(t * 0.13 + 2) * 150}px, ${Math.cos(t * 0.23) * 90}px)`;
      dots.style.transform = `translate(${Math.sin(t * 0.11) * 40}px, ${Math.cos(t * 0.09) * 30}px)`;
    },
  }, 0);
  const grain = $('#grain'); const gp = { i: 0 };
  const GPOS = [[0, 0], [91, 37], [163, 121], [19, 203], [211, 77], [57, 149], [131, 11], [233, 191]];
  tl.to(gp, { i: 55 * 12, duration: 55, ease: 'steps(' + 55 * 12 + ')', onUpdate: () => { const q = GPOS[Math.floor(gp.i) % 8]; grain.style.backgroundPosition = `${q[0]}px ${q[1]}px`; } }, 0);
  tl.set('#darkplate', { clipPath: 'inset(0 100% 0 0)' }, 0);
  hide('#field', 0);

  // ======================= 1 + 2 · 0–11.5 · data everywhere → one platform =======================
  {
    const CX = 960, CY = 540;
    const LOGOS = [
      ['snowflake', 'Snowflake', '#29B5E8', -1180, -560], ['aws', 'AWS', '#FF9900', -620, -650, '#232F3E'], ['googlecloud', 'Google Cloud', '#4285F4', -60, -720],
      ['salesforce', 'Salesforce', '#032D60', 520, -650], ['sap', 'SAP', '#0FAAFF', 1120, -560], ['databricks', 'Databricks', '#FF3621', -1320, -120],
      ['postgresql', 'PostgreSQL', '#4169E1', -760, -290], ['oracle', 'Oracle', '#C74634', 780, -300], ['googledrive', 'Google Drive', '#4285F4', 1340, -110],
      ['zendesk', 'Zendesk', '#03363D', -1260, 330], ['hubspot', 'HubSpot', '#FF7A59', -720, 240], ['sharepoint', 'SharePoint', '#036C70', 740, 250],
      ['jira', 'Jira', '#0052CC', 1300, 340], ['mongodb', 'MongoDB', '#47A248', -1020, 680], ['stripe', 'Stripe', '#635BFF', -400, 740],
      ['notion', 'Notion', '#111111', 220, 720], ['confluence', 'Confluence', '#172B4D', 860, 680], ['dropbox', 'Dropbox', '#0061FF', -240, -420],
    ];
    const MONO = { aws: 'aws', salesforce: 'SF', oracle: 'O', sharepoint: 'SP' };
    const wrap = $('#logos'), conn = $('#e-conn');
    const cards = LOGOS.map(([id, name, color, dx, dy, ink]) => {
      const el = document.createElement('div'); el.className = 'lg'; el.id = 'lg-' + id;
      el.innerHTML = MONO[id] ? `<span class="mono-tile" style="background:${color}; color:${ink || '#fff'}">${MONO[id]}</span>${name}` : `<svg><use href="#lg-${id}" style="color:${color}"></use></svg>${name}`;
      dx *= 0.82; dy *= 0.82;
      el.style.left = (CX + dx - 140) + 'px'; el.style.top = (CY + dy - 52) + 'px';
      wrap.appendChild(el);
      // connector from the card centre toward the hub, bent so the bundle reads as streams
      const x0 = CX + dx, y0 = CY + dy, mx = CX + dx * 0.55 + dy * 0.18, my = CY + dy * 0.55 - dx * 0.18;
      const base = svgEl('path', { class: 'base', d: `M${x0} ${y0} Q${mx} ${my} ${CX} ${CY}` });
      const pulse = svgEl('path', { class: 'pulse', d: `M${x0} ${y0} Q${mx} ${my} ${CX} ${CY}` });
      conn.appendChild(base); conn.appendChild(pulse);
      return { el, base, pulse, dx, dy };
    });
    $$('#logos .lg, #logos .lg *').forEach((e) => e.setAttribute('data-layout-allow-overlap', ''));

    const cam = camera($('#cam-estate'), { x: 260, y: 40, s: 2.1, r: -5 });
    const mb = blur('estate');
    tl.set(['#hub', '#hubring', '#hub-lbl', '#t-one'], { opacity: 0 }, 0);
    tl.set('#e-conn path', { opacity: 0 }, 0);
    // cold open: defocused, tight on the first logos; pull back to the whole estate
    tl.fromTo('#cam-estate', { filter: 'blur(26px)' }, { filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, 0);
    cards.forEach((c, i) => pop(c.el, 0.2 + i * 0.13, { from: 0.85, dur: 0.6, y: 24 }));
    cam.to(0.3, { x: CX, y: CY - 30, s: 0.72, r: 0 }, 2.9, 'power3.inOut');
    mb.leg(0.3, 2.9, 10, 'xy');
    reveal(words($('#t-every')), 2.6, { stagger: 0.06, dur: 0.6 });
    // the platform: hub, glowing ring, every source connects with a pulse; sources gather a little
    unreveal($$('#t-every .w'), 4.7);
    tl.set(['#hub', '#hubring'], { opacity: 1 }, 5.1);
    pop('#hub', 5.1, { from: 0.6, dur: 0.7 });
    tl.fromTo('#hubring', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: SPRING }, 5.2);
    cards.forEach((c, i) => {
      const t = 5.5 + (i % 6) * 0.12 + Math.floor(i / 6) * 0.5;
      tl.set(c.base, { opacity: 1 }, t); drawPath(c.base, t, 0.7, 'power2.out'); pulsePath(c.pulse, t + 0.15, 0.8, 260);
      tl.to(c.el, { x: -c.dx * 0.08, y: -c.dy * 0.08, duration: 1.2, ease: 'power2.out' }, t + 0.1);
    });
    tl.fromTo('#hubring', { boxShadow: '0 0 80px rgba(61,95,255,0.6), inset 0 0 50px rgba(61,95,255,0.25)' }, { boxShadow: '0 0 140px rgba(61,95,255,0.95), inset 0 0 70px rgba(61,95,255,0.45)', duration: 0.5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 5.6);
    tl.set('#hub-lbl', { opacity: 1, left: 960 - 250, top: 540 + 170 }, 7.4);
    pop('#hub-lbl', 7.4, { from: 0.9, dur: 0.5, y: 14 });
    tl.set('#t-one', { opacity: 1 }, 7.9);
    reveal(words($('#t-one')), 7.9, { stagger: 0.06, dur: 0.6 });
    tl.set('#t-one', { y: 420 }, 0);
    cam.to(6.0, { s: 0.78, y: CY - 10 }, 3.4, 'power1.inOut');
    // dolly through the hub into the dashboard
    cam.to(10.2, { x: CX, y: CY, s: 4.5 }, 1.3, 'power3.in');
    mb.in(10.4, 1.1, 26, 'xy');
    tl.to('#cam-estate', { opacity: 0, duration: 0.2 }, 11.35);
  }

  // ======================= 3 · 11.3–19.4 · the dashboard =======================
  {
    const cam = camera($('#cam-dash'), { x: 960, y: 590, s: 2.4 });
    const mb = blur('dash');
    tl.fromTo('#cam-dash', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 11.3);
    mb.out(11.3, 0.8, 22, 'xy');
    cam.to(11.3, { x: 960, y: 570, s: 1.0 }, 1.4, 'power3.out');
    pop('#dash', 11.35, { from: 0.94, dur: 0.7, y: 30 });
    reveal(words($('#t-dash')), 11.8, { stagger: 0.05 });
    // numbers land: ring, KPIs, quality tiles, domain bars, flags
    const fill = $('#d-fill'); const FL = fill.getTotalLength(); fill.style.strokeDasharray = `${FL} ${FL}`; fill.style.strokeDashoffset = FL;
    tl.to(fill, { strokeDashoffset: FL * (1 - 0.71), duration: 1.6, ease: 'power3.out' }, 12.1);
    count($('#d-score'), 12.1, 0, 71, 1.6);
    count($('#d-src'), 12.3, 0, 18, 1.2);
    count($('#d-rec'), 12.4, 0, 50.5, 1.4, (v) => v.toFixed(1) + 'M');
    count($('#d-flags'), 12.5, 0, 4, 1.0);
    pop('#d-quality .qtile', 12.2, { from: 0.94, dur: 0.5, stagger: 0.1, y: 16 });
    tl.to('#d-quality .qtile .b i', { scaleX: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 12.6);
    tl.fromTo('#d-domains .drow .bar i', { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 12.7);
    pop('#d-note', 13.2, { from: 0.96, dur: 0.5, y: 14 });
    pop('#d-note .step', 13.5, { from: 0.9, dur: 0.45, stagger: 0.1, y: 8 });
    // push in on the score, then drift across the flags
    cam.to(14.6, { x: 560, y: 520, s: 1.5 }, 1.2, 'power2.inOut');
    mb.leg(14.6, 1.2, 10, 'xy');
    cam.to(16.6, { x: 1120, y: 780, s: 1.35 }, 1.4, 'power2.inOut');
    mb.leg(16.6, 1.4, 10, 'x');
    // whip out to the graph
    cam.to(18.7, { x: 960, y: 560, s: 0.7 }, 0.7, 'power3.in');
    mb.in(18.8, 0.6, 24, 'xy');
    tl.to('#cam-dash', { opacity: 0, duration: 0.2 }, 19.2);
  }

  // ======================= 4 + 5 · 19.1–34.7 · the knowledge graph, a question, the light, the answer =======================
  {
    const G = 19.1;
    // nodes: [id, label, icon, final x, final y, scattered dx, dy]
    const NODES = [
      ['invoices', 'Invoices', 'i-doc', 470, 330, -260, -90], ['payments', 'Payments', 'i-coin', 300, 500, -320, 120], ['suppliers', 'Suppliers', 'i-box', 640, 520, 180, -160],
      ['contracts', 'Contracts', 'i-doc', 520, 690, -240, 220], ['budgets', 'Budgets', 'i-rows', 250, 300, -140, -260],
      ['customers', 'Customers', 'i-user', 1420, 330, 200, -140], ['policies', 'Policies', 'i-shield', 1620, 500, 300, 60], ['claims', 'Claims', 'i-doc', 1300, 520, -160, 200],
      ['brokers', 'Brokers', 'i-user', 1560, 690, 240, 240], ['tickets', 'Tickets', 'i-rows', 1250, 690, 90, -320],
      ['orders', 'Orders', 'i-box', 820, 820, -220, 120], ['products', 'Products', 'i-layers', 1000, 700, 60, -260], ['shipments', 'Shipments', 'i-box', 1120, 860, 300, 60],
      ['employees', 'Employees', 'i-user', 900, 560, 40, -420], ['assets', 'Assets', 'i-db', 1000, 960, -360, -20], ['documents', 'Documents', 'i-doc', 1220, 400, -60, 340],
    ];
    const EDGES = [
      ['invoices', 'payments'], ['invoices', 'suppliers'], ['payments', 'contracts'], ['suppliers', 'contracts'], ['budgets', 'invoices'], ['budgets', 'payments'],
      ['customers', 'policies'], ['policies', 'claims'], ['claims', 'brokers'], ['customers', 'claims'], ['policies', 'brokers'], ['tickets', 'customers'], ['tickets', 'claims'],
      ['orders', 'products'], ['orders', 'shipments'], ['products', 'shipments'], ['employees', 'orders'], ['assets', 'shipments'], ['assets', 'orders'],
      ['invoices', 'orders'], ['claims', 'payments'], ['customers', 'orders'], ['suppliers', 'shipments'], ['documents', 'claims'], ['documents', 'contracts'], ['employees', 'tickets'], ['products', 'policies'],
    ];
    const wrap = $('#g-nodes'), edges = $('#g-edges'), pos = {};
    const nodes = NODES.map(([id, label, icon, x, y, sx, sy]) => {
      pos[id] = { x, y };
      const el = document.createElement('div'); el.className = 'node'; el.id = 'n-' + id;
      el.innerHTML = `<i class="halo"></i><svg><use href="#${icon}" style="color:#111"></use></svg><span class="nl">${label}</span>`;
      el.style.left = (x - 48) + 'px'; el.style.top = (y - 48) + 'px';
      wrap.appendChild(el);
      return { id, el, sx, sy };
    });
    $$('#g-nodes .node, #g-nodes .node *').forEach((e) => e.setAttribute('data-layout-allow-overlap', ''));
    const edgeEls = EDGES.map(([a, b]) => { const p = svgEl('path', { d: `M${pos[a].x} ${pos[a].y} L${pos[b].x} ${pos[b].y}` }); edges.appendChild(p); return p; });
    // the light's route: a loop through the graph, smoothed through node centres
    const ROUTE = ['invoices', 'payments', 'contracts', 'suppliers', 'shipments', 'orders', 'customers', 'policies', 'claims', 'documents', 'employees', 'invoices'];
    const rp = ROUTE.map((id) => pos[id]);
    let d = `M${rp[0].x} ${rp[0].y}`;
    for (let i = 1; i < rp.length - 1; i++) { const mx = (rp[i].x + rp[i + 1].x) / 2, my = (rp[i].y + rp[i + 1].y) / 2; d += ` Q${rp[i].x} ${rp[i].y} ${mx} ${my}`; }
    d += ` L${rp[rp.length - 1].x} ${rp[rp.length - 1].y}`;
    const route = svgEl('path', { class: 'route', d }); edges.appendChild(route);
    const light = $('#g-light');

    const cam = camera($('#cam-graph'), { x: 960, y: 560, s: 0.85 });
    const mb = blur('graph');
    tl.fromTo('#cam-graph', { opacity: 0 }, { opacity: 1, duration: 0.25 }, G);
    mb.out(G, 0.7, 20, 'xy');
    cam.to(G, { x: 960, y: 560, s: 1.0 }, 1.3, 'power3.out');
    tl.set(['#ask-box', '#answer', '#cur-ask', '#cl-1', '#cl-2', '#cl-3'], { opacity: 0 }, 0);
    // scattered nodes pop in, then drift into their clusters as the edges draw
    nodes.forEach((n, i) => {
      tl.set(n.el, { x: n.sx, y: n.sy }, 0);
      pop(n.el, G + 0.1 + i * 0.06, { from: 0.7, dur: 0.6, y: 0 });
      tl.to(n.el, { x: 0, y: 0, duration: 1.8, ease: 'power3.inOut' }, G + 1.4 + (i % 4) * 0.08);
    });
    edgeEls.forEach((p, i) => { tl.set(p, { opacity: 0 }, 0); tl.set(p, { opacity: 1 }, G + 2.4 + i * 0.05); drawPath(p, G + 2.4 + i * 0.05, 0.6, 'power2.out'); });
    reveal(words($('#t-graph')), G + 0.6, { stagger: 0.05 });
    pop(['#cl-1', '#cl-2', '#cl-3'], G + 3.7, { from: 0.85, dur: 0.5, stagger: 0.12, y: 10 });
    cam.to(G + 1.4, { x: 960, y: 580, s: 0.94 }, 3.0, 'power1.inOut');
    // the question: the title leaves, the prompt arrives and is typed live
    unreveal($$('#t-graph .w'), G + 5.4);
    tl.set('#ask-box', { opacity: 1 }, G + 5.7);
    pop('#ask-box', G + 5.7, { from: 0.94, dur: 0.6, y: 30 });
    typewrite($('#ask-txt'), $('#ask-caret'), G + 6.2, 'Do we have data about invoices?', 26);
    tl.set('#cur-ask', { opacity: 1 }, G + 7.4);
    tl.fromTo('#cur-ask', { x: 0, y: 0 }, { x: -200, y: -80, duration: 0.7, ease: 'power3.inOut' }, G + 7.4);
    tl.to('#ask-go', { scale: 0.88, duration: 0.1 }, G + 8.15);
    tl.to('#ask-go', { scale: 1, duration: 0.3, ease: SPRING }, G + 8.25);
    tl.to('#cur-ask', { opacity: 0, duration: 0.3 }, G + 8.5);
    // the light races around the graph, lighting the nodes it checks
    const L = route.getTotalLength(); const lp = { u: 0 };
    tl.set(light, { opacity: 1 }, G + 8.3);
    tl.to(lp, { u: 1, duration: 2.6, ease: 'power1.inOut', onUpdate: () => { const p = route.getPointAtLength(L * lp.u); light.style.left = p.x + 'px'; light.style.top = p.y + 'px'; } }, G + 8.3);
    pulsePath(route, G + 8.3, 2.6, 420);
    ROUTE.slice(0, -1).forEach((id, i) => {
      const t = G + 8.3 + (i / (ROUTE.length - 1)) * 2.6;
      tl.fromTo(`#n-${id} .halo`, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.25, ease: OUT }, t);
      tl.to(`#n-${id} .halo`, { opacity: 0, scale: 1.25, duration: 0.6, ease: 'power2.out' }, t + 0.3);
    });
    tl.to(light, { opacity: 0, scale: 2.5, duration: 0.35 }, G + 10.9);
    ['invoices', 'payments', 'suppliers', 'contracts'].forEach((id, i) => tl.to(`#n-${id}`, { boxShadow: 'var(--sh-card), 0 0 0 6px rgba(61,95,255,0.25), 0 0 60px rgba(61,95,255,0.6)', duration: 0.4 }, G + 10.9 + i * 0.08));
    cam.to(G + 8.3, { x: 900, y: 560, s: 1.0 }, 2.6, 'power1.inOut');
    // the answer card lands; the camera settles on it
    tl.set('#answer', { opacity: 1 }, G + 11.2);
    pop('#answer', G + 11.2, { from: 0.92, dur: 0.7, y: 30 });
    pop('#answer .ans-row', G + 11.5, { from: 0.96, dur: 0.45, stagger: 0.12, y: 10 });
    cam.to(G + 11.3, { x: 1180, y: 620, s: 1.2 }, 1.2, 'power2.inOut');
    mb.leg(G + 11.3, 1.2, 10, 'x');
    tl.to('#ask-box', { opacity: 0.35, duration: 0.5 }, G + 11.3);
    // blur out to the pipelines
    cam.to(G + 14.9, { s: 1.6, x: 1250, y: 560 }, 0.7, 'power3.in');
    mb.in(G + 15.0, 0.6, 24, 'xy');
    tl.to('#cam-graph', { opacity: 0, duration: 0.2 }, G + 15.45);
  }

  // ======================= 6 · 34.4–43 · a pipeline per dataset, applied and monitored =======================
  {
    const P = 34.4;
    const cam = camera($('#cam-pipes'), { x: 960, y: 560, s: 1.6 });
    const mb = blur('pipes');
    tl.fromTo('#cam-pipes', { opacity: 0 }, { opacity: 1, duration: 0.25 }, P);
    mb.out(P, 0.8, 22, 'xy');
    cam.to(P, { x: 960, y: 560, s: 1.0 }, 1.3, 'power3.out');
    reveal(words($('#t-pipes')), P + 0.3, { stagger: 0.05 });
    pop(['#pp-1', '#pp-2', '#pp-3'], P + 0.5, { from: 0.94, dur: 0.6, stagger: 0.14, y: 30 });
    pop('#pp-1 .step, #pp-2 .step, #pp-3 .step', P + 1.0, { from: 0.9, dur: 0.4, stagger: 0.04, y: 8 });
    // the user applies the first pipeline; it runs and is monitored live
    tl.set('#cur-pipes', { opacity: 0 }, 0);
    tl.set('#cur-pipes', { opacity: 1 }, P + 2.0);
    tl.fromTo('#cur-pipes', { x: 0, y: 0 }, { x: -140, y: -700, duration: 0.8, ease: 'power3.inOut' }, P + 2.0);
    tl.to('#pp1-apply', { scale: 0.92, duration: 0.1 }, P + 2.85);
    tl.to('#pp1-apply', { scale: 1, backgroundColor: '#2F7A1F', duration: 0.3, ease: SPRING }, P + 2.95);
    tl.to('#cur-pipes', { opacity: 0, duration: 0.3 }, P + 3.2);
    cam.to(P + 2.9, { x: 960, y: 400, s: 1.16 }, 1.0, 'power2.inOut');
    mb.leg(P + 2.9, 1.0, 10, 'y');
    tl.to('#pp1-live', { opacity: 1, duration: 0.3 }, P + 3.1);
    tl.to('#pp1-count', { opacity: 1, duration: 0.3 }, P + 3.1);
    count($('#pp1-count'), P + 3.1, 0, 1200000, 4.2, (v) => Math.round(v).toLocaleString('en-US') + ' records', 'power1.inOut');
    tl.to('#pp1-prog i', { scaleX: 1, duration: 4.4, ease: 'power1.inOut' }, P + 3.1);
    const steps = $$('#pp1-steps .step');
    steps.forEach((s, i) => {
      const t = P + 3.2 + i * 0.85;
      tl.to(s, { backgroundColor: '#3D5FFF', color: '#ffffff', duration: 0.25 }, t);
      tl.to(s, { backgroundColor: '#0D0D0D', color: '#ffffff', duration: 0.25 }, t + 0.8);
    });
    count($('#pp1-r'), P + 3.6, 64, 78, 4.0, undefined, 'power1.inOut');
    tl.to('#pp1-r', { color: '#2F7A1F', duration: 0.4 }, P + 6.8);
    // blur out to the use cases
    cam.to(P + 8.0, { s: 1.5, x: 960, y: 400 }, 0.7, 'power3.in');
    mb.in(P + 8.1, 0.6, 24, 'xy');
    tl.to('#cam-pipes', { opacity: 0, duration: 0.2 }, P + 8.5);
  }

  // ======================= 7 · 42.9–50 · proposed use cases =======================
  {
    const U = 42.9;
    const cam = camera($('#cam-uses'), { x: 960, y: 560, s: 1.5 });
    const mb = blur('uses');
    tl.fromTo('#cam-uses', { opacity: 0 }, { opacity: 1, duration: 0.25 }, U);
    mb.out(U, 0.8, 22, 'xy');
    cam.to(U, { x: 960, y: 560, s: 1.0 }, 1.3, 'power3.out');
    reveal(words($('#t-uses')), U + 0.3, { stagger: 0.05 });
    pop(['#uc-1', '#uc-2', '#uc-3'], U + 0.5, { from: 0.92, dur: 0.65, stagger: 0.16, y: 40 });
    pop('#uc-note', U + 1.6, { from: 0.94, dur: 0.5, y: 14 });
    // a slow push onto the first card, then a drift across all three
    cam.to(U + 2.2, { x: 520, y: 520, s: 1.35 }, 1.4, 'power2.inOut');
    mb.leg(U + 2.2, 1.4, 9, 'xy');
    cam.to(U + 4.4, { x: 1200, y: 540, s: 1.15 }, 1.6, 'power1.inOut');
    mb.leg(U + 4.4, 1.6, 8, 'x');
    cam.to(U + 6.4, { s: 1.6, x: 1000, y: 560 }, 0.6, 'power3.in');
    mb.in(U + 6.5, 0.55, 24, 'xy');
    tl.to('#cam-uses', { opacity: 0, duration: 0.2 }, U + 6.9);
  }

  // ======================= 8 · 49.8–55 · close =======================
  {
    const E = 49.8;
    const cam = camera($('#cam-end'), { s: 1.04 });
    const mb = blur('end');
    tl.fromTo('#cam-end', { opacity: 0 }, { opacity: 1, duration: 0.25 }, E);
    mb.out(E, 0.7, 18, 'xy');
    cam.to(E, { s: 1.0 }, 5.0, 'power1.out');
    reveal(words($('#end-line')), E + 0.2, { stagger: 0.07, dur: 0.6 });
    pop('#end-word', E + 1.0, { from: 0.96, dur: 0.7, y: 20 });
    pop('#cta > *', E + 1.6, { from: 0.9, dur: 0.55, stagger: 0.1, y: 16 });
  }

  return tl;
};
