/* Datalith launch video — one paused GSAP timeline, twelve scenes.
   Every visual is a pure function of timeline time: no clocks, no random,
   no relative tweens. Landscape and portrait roots share this script and
   branch on the root's declared size. */
window.__buildLaunch = function () {
  const root = document.getElementById('root');
  const W = +root.dataset.width, H = +root.dataset.height;
  const P = H > W; // portrait
  const tl = gsap.timeline({ paused: true });

  // ---- timing table (seconds) ---------------------------------------------
  const T = { s0: 0, s1: 7.5, s2: 14, s3: 20.5, s4: 28.5, s5: 36, s6: 44, s7: 52, s8: 60, s9: 67, s10: 75.5, s11: 81.5, end: 90 };
  const X = 0.6; // handoff overlap

  // ---- deterministic helpers ----------------------------------------------
  const hash = s => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 } return h };
  const unit = (s, salt = '') => (hash(s + salt) % 10000) / 10000; // 0..1
  const HUES = [222, 262, 196, 158, 28, 340, 182, 300, 210, 44];
  const hue = v => HUES[hash(v.toLowerCase()) % HUES.length];
  const mono = n => { const w = n.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/); return (w.length > 1 ? w[0][0] + w[1][0] : n.slice(0, 2)).toUpperCase() };
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e };
  const markHTML = v => { const h = hue(v); return `<span class="mark" data-layout-allow-overlap style="background:hsl(${h} 45% 20%);color:hsl(${h} 80% 82%);box-shadow:inset 0 0 0 1.5px hsl(${h} 40% 32%)">${mono(v)}</span>` };
  const fmt = n => Math.round(n).toLocaleString('en-US');

  // Split every .line in an element into word spans so headlines can cascade.
  function splitWords(node) {
    node.querySelectorAll('.line').forEach(line => {
      const words = line.textContent.trim().split(/\s+/);
      line.innerHTML = words.map(w => `<span class="w" data-layout-allow-overlap>${w}</span>`).join('');
    });
    return node.querySelectorAll('.w');
  }
  function enterWords(sel, t, o = {}) {
    const ws = typeof sel === 'string' ? document.querySelectorAll(sel + ' .w') : sel;
    tl.fromTo(ws, { y: o.y ?? 70, autoAlpha: 0, filter: 'blur(14px)' },
      { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: o.dur ?? 0.8, ease: o.ease ?? 'power4.out', stagger: o.stagger ?? 0.055 }, t);
  }
  function rise(sel, t, o = {}) {
    tl.fromTo(sel, { y: o.y ?? 40, x: o.x ?? 0, autoAlpha: 0 }, { y: 0, x: 0, autoAlpha: 1, duration: o.dur ?? 0.7, ease: o.ease ?? 'power3.out', stagger: o.stagger ?? 0 }, t);
  }
  function pop(sel, t, o = {}) {
    tl.fromTo(sel, { scale: o.from ?? 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: o.dur ?? 0.55, ease: o.ease ?? 'back.out(1.7)', stagger: o.stagger ?? 0.05 }, t);
  }
  function count(node, to, t, o = {}) {
    const p = { v: o.from ?? 0 };
    const f = o.fmt ?? fmt;
    node.textContent = f(p.v);
    tl.to(p, { v: to, duration: o.dur ?? 1.4, ease: o.ease ?? 'power2.out', onUpdate: () => { node.textContent = f(p.v) } }, t);
  }
  // Scene handoff: outgoing and incoming move at the same instant.
  function hand(outId, inId, t, mode = 'push') {
    const o = `#${outId} > .sc`, i = `#${inId} > .sc`;
    if (mode === 'push') {
      tl.to(o, { y: -70, autoAlpha: 0, filter: 'blur(14px)', duration: 0.55, ease: 'power3.in' }, t);
      tl.fromTo(i, { y: 90, autoAlpha: 0, filter: 'blur(12px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }, t + 0.05);
    } else if (mode === 'zoom') {
      tl.to(o, { scale: 1.18, autoAlpha: 0, filter: 'blur(18px)', duration: 0.5, ease: 'power3.in' }, t);
      tl.fromTo(i, { scale: 0.9, autoAlpha: 0, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }, t + 0.05);
    } else if (mode === 'slide') {
      tl.to(o, { x: -260, autoAlpha: 0, filter: 'blur(10px)', duration: 0.5, ease: 'power3.in' }, t);
      tl.fromTo(i, { x: 320, autoAlpha: 0, filter: 'blur(8px)' }, { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }, t + 0.05);
    } else { // dip
      tl.to(o, { autoAlpha: 0, filter: 'blur(8px)', duration: 0.6, ease: 'sine.inOut' }, t);
      tl.fromTo(i, { autoAlpha: 0, filter: 'blur(8px)' }, { autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, ease: 'sine.out' }, t + 0.25);
    }
  }
  // A card (video frame or plate) arrives from below with a slight tilt, then pushes in slowly.
  function card(sel, t, o = {}) {
    tl.fromTo(sel, { y: o.y ?? 140, autoAlpha: 0, rotationX: o.rx ?? 10, transformPerspective: 1600, scale: 0.97 },
      { y: 0, autoAlpha: 1, rotationX: 0, scale: 1, duration: 0.95, ease: 'power4.out' }, t);
    if (o.push !== false) tl.to(sel, { scale: o.pushTo ?? 1.035, duration: o.pushDur ?? 6, ease: 'sine.inOut' }, t + 1);
  }

  // ---- background: the glows breathe for the whole piece -------------------
  tl.fromTo('#bg .glow-a', { scale: 1, x: 0 }, { scale: 1.12, x: -60, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: 9 }, 0);
  tl.fromTo('#bg .glow-b', { scale: 0.96, y: 0 }, { scale: 1.1, y: -50, duration: 11, ease: 'sine.inOut', yoyo: true, repeat: 7 }, 0);
  tl.fromTo('#bg .grid', { x: 0 }, { x: 96, duration: 18, ease: 'none', repeat: 4 }, 0);

  // =========================================================================
  // S0 — cold open: the scatter. 0 → 7.5 (hard cut out)
  // =========================================================================
  {
    const SYSTEMS = ['Guidewire ClaimCenter', 'Snowflake Claims Mart', 'Salesforce Service Cloud', 'Zendesk Claims Queue', 'Genesys Claim Calls',
      'Duck Creek Policy', 'Outlook Support Inbox', 'S3 Claim Photography', 'Postgres Claims Intake', 'Icertis CLM', 'Applied Epic',
      'Verisk Telematics Feed', 'SharePoint Guidelines', 'RSA Archer GRC', 'DocuSign Treaties', 'Azure FNOL Intake', 'Intercom Chat',
      'Oracle Contracts DB', 'Jira Claims Ops', 'Confluence Support KB', 'MySQL Underwriting', 'Teams Broker Channels', 'Workday HR', 'ServiceNow ITSM'];
    const cloud = document.getElementById('s0-cloud');
    const cols = P ? 3 : 6, rows = Math.ceil(SYSTEMS.length / cols);
    const cw = W / cols, ch = (H - (P ? 700 : 260)) / rows, top = P ? 120 : 130;
    const chips = SYSTEMS.map((name, i) => {
      const c = el('div', 'chip', `${markHTML(name.split(' ')[0])}<span data-layout-allow-overlap>${name}</span>`);
      c.setAttribute('data-layout-allow-overlap', '');
      const col = i % cols, row = Math.floor(i / cols);
      const jx = (unit(name, 'x') - 0.5) * cw * 0.3, jy = (unit(name, 'y') - 0.5) * ch * 0.5;
      c.style.left = `${Math.round(col * cw + cw * 0.12 + jx)}px`;
      c.style.top = `${Math.round(top + row * ch + ch * 0.25 + jy)}px`;
      cloud.appendChild(c);
      return c;
    });
    chips.forEach((c, i) => {
      const d = unit(SYSTEMS[i], 'd') * 1.6;
      tl.fromTo(c, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.92, duration: 0.6, ease: 'back.out(1.6)' }, 0.15 + d);
      const dx = (unit(SYSTEMS[i], 'dx') - 0.5) * 34, dy = (unit(SYSTEMS[i], 'dy') - 0.5) * 34;
      tl.fromTo(c, { x: 0, y: 0 }, { x: dx, y: dy, duration: 2.2 + unit(SYSTEMS[i], 'dur') * 1.4, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.15 + d);
    });
    // The readout counts the estate in, then the chips lose their light as the second line lands.
    const read = document.getElementById('s0-read');
    const STEPS = ['38 systems', '38 systems · 8 domains', '38 systems · 8 domains · <b>0 visibility</b>'];
    const rp = { i: 0 };
    tl.to(rp, { i: 2.999, duration: 2.4, ease: 'none', onUpdate: () => { read.innerHTML = STEPS[Math.min(2, Math.floor(rp.i))] } }, 0.4);
    rise('#s0-read', 0.3, { y: 0, x: -30 });
    splitWords(document.getElementById('s0-h1'));
    splitWords(document.getElementById('s0-h2'));
    enterWords('#s0-h1', 1.2, { stagger: 0.09, y: 90 });
    tl.to('#s0-h1 .w', { y: -60, autoAlpha: 0, filter: 'blur(12px)', duration: 0.4, ease: 'power3.in', stagger: 0.03 }, 3.9);
    tl.fromTo('#s0-h2 .w', { scale: 1.35, autoAlpha: 0, filter: 'blur(16px)' }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power4.out', stagger: 0.07 }, 4.25);
    tl.to(chips, { autoAlpha: 0.28, filter: 'blur(3px)', duration: 0.8, ease: 'power2.out', stagger: { each: 0.02, from: 'center' } }, 4.2);
    // A slow lean-in on the whole scene sells the hold before the cut.
    tl.fromTo('#s0 > .sc', { scale: 1 }, { scale: 1.06, duration: 7.5, ease: 'sine.in' }, 0);
  }

  // =========================================================================
  // S1 — the numbers behind the problem. 7.5 → 14
  // =========================================================================
  {
    const t = T.s1;
    tl.fromTo('#s1 > .sc', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, ease: 'none' }, t); // hard cut in
    tl.fromTo('#s1-ghost', { x: 120 }, { x: -260, duration: 6.5, ease: 'none' }, t);
    rise('#s1-eyebrow', t + 0.1, { x: -30, y: 0 });
    count(document.getElementById('s1-n1'), 40, t + 0.2, { dur: 1.5, ease: 'power3.out', fmt: v => Math.round(v) });
    tl.fromTo('#s1-stat1', { scale: 0.8, autoAlpha: 0, y: 40 }, { scale: 1, autoAlpha: 1, y: 0, duration: 0.7, ease: 'power4.out' }, t + 0.15);
    rise('#s1-stat1 .l', t + 0.7, { y: 30 });
    // Second stat replaces the first in place — same anchor, the number is what changes.
    tl.to('#s1-stat1', { y: -80, autoAlpha: 0, filter: 'blur(10px)', duration: 0.45, ease: 'power3.in' }, t + 3.5);
    count(document.getElementById('s1-n2'), 75, t + 3.9, { from: 60, dur: 1.1, ease: 'power3.out', fmt: v => `60–${Math.round(v)}` });
    tl.fromTo('#s1-stat2', { scale: 0.85, autoAlpha: 0, y: 60 }, { scale: 1, autoAlpha: 1, y: 0, duration: 0.7, ease: 'power4.out' }, t + 3.75);
    rise('#s1-stat2 .l', t + 4.2, { y: 30 });
    tl.fromTo('#s1-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, t + 0.3);
    rise('#s1-src', t + 1.4, { y: 0, x: 30 });
  }
  hand('s1', 's2', T.s2, 'zoom');

  // =========================================================================
  // S2 — the mark. 14 → 20.5
  // =========================================================================
  {
    const t = T.s2;
    // Bezier arc length of the two stream curves (28x20 viewBox units), computed here rather
    // than measured in the DOM, so a hidden clip cannot report zero.
    const bez = (p0, p1, p2, p3) => { let len = 0, prev = p0; for (let i = 1; i <= 64; i++) { const s = i / 64, a = (1 - s) ** 3, b = 3 * (1 - s) ** 2 * s, c = 3 * (1 - s) * s * s, d = s ** 3; const p = [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]; len += Math.hypot(p[0] - prev[0], p[1] - prev[1]); prev = p } return len };
    const curve = bez([0, 3], [8, 3], [10, 10], [16, 10]);
    const streams = document.querySelectorAll('#s2-logo .streams path');
    streams.forEach((p, i) => { const L = i === 1 ? 16 : curve; p.style.strokeDasharray = L; p.style.strokeDashoffset = L });
    const merge = document.querySelector('#s2-logo .merge');
    merge.style.strokeDasharray = 12; merge.style.strokeDashoffset = 12;
    tl.fromTo('#s2-logo', { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, t + 0.1);
    tl.to(streams, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.12 }, t + 0.25);
    tl.to(merge, { strokeDashoffset: 0, duration: 0.55, ease: 'power4.out' }, t + 1.35);
    tl.fromTo('#s2-bloom', { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, t + 1.3);
    tl.fromTo('#s2-bloom', { scale: 1 }, { scale: 1.12, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 1, immediateRender: false }, t + 2.5);
    tl.fromTo('#s2-word span', { y: 90, autoAlpha: 0, filter: 'blur(12px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out', stagger: 0.045 }, t + 1.5);
    const tag = document.querySelectorAll('#s2-tag span');
    tl.fromTo(tag, { y: 34, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', stagger: 0.42 }, t + 2.7);
    tl.to(tag, { color: '#ffffff', duration: 0.3, stagger: 0.42 }, t + 2.85);
    // Gentle push on the whole lockup while it holds.
    tl.fromTo('#s2-lock', { scale: 1 }, { scale: 1.04, duration: 5, ease: 'sine.inOut' }, t + 1.2);
  }
  hand('s2', 's3', T.s3, 'zoom');

  // =========================================================================
  // S3 — first, see everything (overview plate + callouts). 20.5 → 28.5
  // =========================================================================
  {
    const t = T.s3;
    rise('#s3-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s3-h'));
    enterWords('#s3-h', t + 0.3, { stagger: 0.07 });
    rise('#s3-lead', t + 0.9, { y: 30 });
    card('#s3-plate', t + 0.55, { rx: 14, pushTo: 1.06, pushDur: 6.5 });
    tl.fromTo('#s3-plate img', { scale: 1.0, y: 0 }, { scale: 1.12, y: -30, duration: 7, ease: 'sine.inOut' }, t + 0.8);
    pop('#s3-c1', t + 2.0, { from: 0.6 });
    pop('#s3-c2', t + 2.9, { from: 0.6 });
    pop('#s3-c3', t + 3.8, { from: 0.6 });
    tl.fromTo('#s3 .callout', { y: 0 }, { y: -6, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: 3, immediateRender: false, stagger: 0.3 }, t + 3.0);
  }
  hand('s3', 's4', T.s4, 'push');

  // =========================================================================
  // S4 — connect every system. 28.5 → 36
  // =========================================================================
  {
    const t = T.s4;
    const VENDORS = ['Snowflake', 'Guidewire', 'Salesforce', 'Microsoft', 'Oracle', 'AWS', 'Google Cloud', 'Databricks', 'PostgreSQL', 'Zendesk', 'Atlassian', 'Genesys',
      'DocuSign', 'Intercom', 'Workday', 'ServiceNow', 'HubSpot', 'Notion'];
    const grid = document.getElementById('s4-grid');
    VENDORS.forEach(v => { const c = el('div', 'tag', `${markHTML(v)}<span>${v}</span>`); c.style.position = 'relative'; grid.appendChild(c) });
    rise('#s4-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s4-h'));
    enterWords('#s4-h', t + 0.3, { stagger: 0.07 });
    rise('#s4-lead', t + 0.9, { y: 30 });
    pop('#s4-grid .tag', t + 1.2, { from: 0.5, stagger: { each: 0.035, from: 'start' } });
    rise('#s4-mods span', t + 2.4, { y: 20, stagger: 0.05 });
    card('#s4-frame', t + 0.7, { rx: 8, pushTo: 1.02, pushDur: 6 });
    pop('#s4-c1', t + 6.2, { from: 0.6 });
  }
  hand('s4', 's5', T.s5, 'push');

  // =========================================================================
  // S5 — score it. 36 → 44
  // =========================================================================
  {
    const t = T.s5;
    rise('#s5-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s5-h'));
    enterWords('#s5-h', t + 0.3, { stagger: 0.07 });
    // Ring: 270° track from 135° clockwise; arc length in user units.
    const R = 150, C = 2 * Math.PI * R * 0.75;
    const fill = document.querySelector('#s5-ring .fill');
    fill.style.strokeDasharray = C; fill.style.strokeDashoffset = C;
    tl.fromTo('#s5-ring', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }, t + 0.5);
    tl.to(fill, { strokeDashoffset: C * (1 - 0.71), duration: 1.8, ease: 'power3.out' }, t + 0.8);
    count(document.getElementById('s5-score'), 71, t + 0.8, { dur: 1.8, ease: 'power3.out', fmt: v => Math.round(v) });
    rise('#s5-ring .cap, #s5-ring .delta', t + 1.6, { y: 16, stagger: 0.15 });
    tl.fromTo('#s5-ring .tick', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, t + 2.4);
    // Dimensions grow one by one; the two under 70 read amber.
    const DIMS = [['Completeness', 82], ['Freshness', 64], ['Consistency', 74], ['Semantic coverage', 58], ['Governance coverage', 79]];
    const bars = document.getElementById('s5-bars');
    DIMS.forEach(([n, v]) => {
      const b = el('div', `bar${v < 70 ? ' under' : ''}`, `<div><p class="n">${n}</p><div class="t"><i class="f"></i><i class="m" style="left:70%"></i></div></div><p class="s">0</p>`);
      bars.appendChild(b);
      const s = b.querySelector('.s');
      rise(b, t + 1.0 + DIMS.indexOf(DIMS.find(d => d[0] === n)) * 0.18, { y: 26 });
      tl.fromTo(b.querySelector('.f'), { scaleX: 0 }, { scaleX: v / 100, duration: 1.1, ease: 'power3.out' }, t + 1.25 + DIMS.findIndex(d => d[0] === n) * 0.18);
      count(s, v, t + 1.25 + DIMS.findIndex(d => d[0] === n) * 0.18, { dur: 1.1, ease: 'power3.out', fmt: x => Math.round(x) });
    });
    const FLAGS = [['High', 'fail', 'Unmasked PII in customer contacts', 'Salesforce Broker Portal', '12', 'columns'],
      ['High', 'fail', 'Duplicate policyholder records', 'Guidewire PolicyCenter', '41,208', 'records'],
      ['Medium', 'warn', 'Treaty documents unchunked', 'DocuSign Treaty Documents', '22,470', 'documents']];
    const rows = document.getElementById('s5-flags');
    FLAGS.forEach(f => rows.appendChild(el('div', 'row four', `<span class="pill ${f[1]}">${f[0]}</span><div><p class="t">${f[2]}</p><p class="d">${f[3]}</p></div><p class="c">${f[4]}<small>${f[5]}</small></p>`)));
    rise('#s5-flags .row', t + 3.0, { y: 30, x: 40, stagger: 0.2 });
    rise('#s5-flags-k', t + 2.8, { y: 0, x: -20 });
  }
  hand('s5', 's6', T.s6, 'push');

  // =========================================================================
  // S6 — fix it (pipeline run footage). 44 → 52
  // =========================================================================
  {
    const t = T.s6;
    rise('#s6-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s6-h'));
    enterWords('#s6-h', t + 0.3, { stagger: 0.07 });
    rise('#s6-bullets p', t + 1.1, { y: 26, x: -20, stagger: 0.22 });
    card('#s6-frame', t + 0.6, { rx: 8, pushTo: 1.03, pushDur: 7 });
    pop('#s6-c1', t + 5.4, { from: 0.6 });
  }
  hand('s6', 's7', T.s7, 'zoom');

  // =========================================================================
  // S7 — one map of the business (graph footage). 52 → 60
  // =========================================================================
  {
    const t = T.s7;
    card('#s7-frame', t + 0.3, { rx: 6, pushTo: 1.05, pushDur: 7.5 });
    rise('#s7-eyebrow', t + 0.6, { x: -30, y: 0 });
    splitWords(document.getElementById('s7-h'));
    enterWords('#s7-h', t + 0.7, { stagger: 0.07 });
    const S = [['s7-n1', 2.4, v => `${v.toFixed(1)}M`], ['s7-n2', 1.9, v => `${v.toFixed(1)}M`], ['s7-n3', 8, v => `${Math.round(v)}`]];
    S.forEach(([id, v, f], i) => { rise(`#${id}`, t + 1.6 + i * 0.25, { y: 30 }); count(document.querySelector(`#${id} .v span`), v, t + 1.7 + i * 0.25, { dur: 1.4, fmt: f }) });
  }
  hand('s7', 's8', T.s8, 'push');

  // =========================================================================
  // S8 — ask what data you have (search footage). 60 → 67
  // =========================================================================
  {
    const t = T.s8;
    rise('#s8-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s8-h'));
    enterWords('#s8-h', t + 0.3, { stagger: 0.07 });
    rise('#s8-lead', t + 0.9, { y: 30 });
    card('#s8-frame', t + 0.5, { rx: 8, pushTo: 1.03, pushDur: 6 });
    pop('#s8-c1', t + 5.2, { from: 0.6 });
  }
  hand('s8', 's9', T.s9, 'push');

  // =========================================================================
  // S9 — which agents to build (native opportunity map). 67 → 75.5
  // =========================================================================
  {
    const t = T.s9;
    rise('#s9-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s9-h'));
    enterWords('#s9-h', t + 0.3, { stagger: 0.06 });
    const UC = [['Claims triage copilot', 2.1, 6, 'ready'], ['Subrogation recovery finder', 1.75, 5, 'ready'], ['Fraud signal triage agent', 1.45, 7, 'ready'],
      ['FNOL intake concierge', 1.2, 4, 'ready'], ['Renewal retention agent', 0.98, 4, 'ready'], ['Reinsurance treaty reader', 0.88, 8, 'review'],
      ['Complaint routing agent', 0.76, 5, 'review'], ['Broker follow-up agent', 0.64, 5, 'blocked'], ['Underwriting quote copilot', 0.59, 9, 'blocked'],
      ['Contract clause extraction', 0.51, 6, 'blocked'], ['Regulatory filing assistant', 0.46, 7, 'blocked'], ['Property risk scoring', 0.41, 6, 'blocked'],
      ['Support ticket summarizer', 0.34, 3, 'ready'], ['Broker onboarding agent', 0.26, 3, 'ready']];
    const svg = document.getElementById('s9-svg');
    const MW = +svg.getAttribute('data-w'), MH = +svg.getAttribute('data-h'), pad = { l: 90, r: 40, t: 40, b: 70 };
    const x = w => pad.l + ((w - 2) / 8) * (MW - pad.l - pad.r), y = v => MH - pad.b - (v / 2.4) * (MH - pad.t - pad.b);
    const ns = 'http://www.w3.org/2000/svg';
    const add = (tag, attrs, parent = svg) => { const n = document.createElementNS(ns, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n };
    [0.5, 1, 1.5, 2].forEach(v => { add('line', { class: 'gridl', x1: pad.l, x2: MW - pad.r, y1: y(v), y2: y(v) }); const tx = add('text', { class: 'lbl', x: pad.l - 14, y: y(v) + 6, 'text-anchor': 'end' }); tx.textContent = `$${v}M` });
    [3, 4, 5, 6, 7, 8, 9].forEach(w => { const tx = add('text', { class: 'lbl', x: x(w), y: MH - pad.b + 30, 'text-anchor': 'middle' }); tx.textContent = `${w}w` });
    add('line', { class: 'axis', x1: pad.l, x2: MW - pad.r, y1: MH - pad.b, y2: MH - pad.b });
    add('line', { class: 'axis', x1: pad.l, x2: pad.l, y1: pad.t, y2: MH - pad.b });
    const midX = x(6), midY = y(1.2);
    add('line', { class: 'gridl', x1: midX, x2: midX, y1: pad.t, y2: MH - pad.b, 'stroke-dasharray': '4 6' });
    add('line', { class: 'gridl', x1: pad.l, x2: MW - pad.r, y1: midY, y2: midY, 'stroke-dasharray': '4 6' });
    const q = (tx, xx, yy, anchor) => { const n = add('text', { class: 'quad', x: xx, y: yy, 'text-anchor': anchor }); n.textContent = tx; return n };
    const quads = [q('Quick wins', pad.l + 14, pad.t + 22, 'start'), q('Strategic bets', MW - pad.r - 14, pad.t + 22, 'end'), q('Fill-ins', pad.l + 14, MH - pad.b - 14, 'start'), q('Reconsider', MW - pad.r - 14, MH - pad.b - 14, 'end')];
    const pts = UC.map(([n, v, w, s], i) => {
      const g = add('g', { class: `pt ${s}` });
      g.setAttribute('transform', `translate(${x(w)} ${y(v)})`);
      const r = 9 + 16 * Math.sqrt(v / 2.4);
      add('circle', { cx: 0, cy: 0, r }, g);
      if (i < 5) { const tx = add('text', { x: r + 10, y: 7 }, g); tx.textContent = n }
      g.style.transformOrigin = `${x(w)}px ${y(v)}px`;
      g.style.transformBox = 'view-box';
      return g;
    });
    tl.fromTo('#s9-svg .axis', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, t + 0.8);
    tl.fromTo('#s9-svg .gridl, #s9-svg .lbl', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.02 }, t + 0.9);
    tl.fromTo(quads, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, t + 1.3);
    // Points arrive by status: ready first, then review, then blocked.
    const order = [...pts].sort((a, b) => ['ready', 'review', 'blocked'].indexOf(a.classList[1]) - ['ready', 'review', 'blocked'].indexOf(b.classList[1]));
    tl.fromTo(order, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.09 }, t + 1.5);
    rise('#s9-legend p', t + 2.2, { y: 18, x: 20, stagger: 0.15 });
    tl.fromTo('#s9-hero', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power4.out' }, t + 3.4);
    count(document.querySelector('#s9-hero .v span'), 8.1, t + 3.5, { dur: 1.6, ease: 'power3.out', fmt: v => v.toFixed(1) });
    rise('#s9-hero .l', t + 3.9, { y: 20 });
    tl.fromTo('#s9-blocked', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, t + 5.4);
  }
  hand('s9', 's10', T.s10, 'slide');

  // =========================================================================
  // S10 — governance. 75.5 → 81.5
  // =========================================================================
  {
    const t = T.s10;
    rise('#s10-eyebrow', t + 0.2, { x: -30, y: 0 });
    splitWords(document.getElementById('s10-h'));
    enterWords('#s10-h', t + 0.3, { stagger: 0.05, y: 50 });
    const LOG = [['14:22:07', 'claims-triage-01', 'policy(number=PL-88421) → claim → coverage', 'ok', 'Allowed'],
      ['14:21:58', 'support-summary-01', 'policyholder(id=884201).national_id', 'warn', 'Denied'],
      ['14:21:40', 'treaty-reader-02', 'treaty(id=RT-2291) → cession', 'ok', 'Allowed'],
      ['14:20:55', 'compliance-watch-01', 'audit-finding(id=AF-50231) → policy', 'ok', 'Allowed'],
      ['14:19:12', 'claims-triage-01', 'claim(number=CL-77310) → fnol.loss_description', 'warn', 'Denied'],
      ['14:18:03', 'broker-insights-01', 'broker(id=BR-4410) → submission', 'ok', 'Allowed']];
    const log = document.getElementById('s10-log');
    LOG.forEach(r => log.appendChild(el('div', 'arow', `<span class="w">${r[0]}</span><span class="a">${r[1]}</span><span class="q">${r[2]}</span><span class="pill ${r[3]}">${r[4]}</span>`)));
    rise('#s10-log .arow', t + 0.9, { y: 34, stagger: 0.16, ease: 'power4.out' });
    rise('#s10-tiles .tile', t + 1.4, { y: 40, x: 30, stagger: 0.18 });
    count(document.querySelector('#s10-t2 .v'), 184, t + 1.6, { dur: 1.4, fmt: v => `${Math.round(v)}K` });
    count(document.querySelector('#s10-t3 .v'), 3, t + 1.9, { dur: 0.8, fmt: v => Math.round(v) });
    rise('#s10-note', t + 3.2, { y: 20 });
  }
  hand('s10', 's11', T.s11, 'dip');

  // =========================================================================
  // S11 — the close. 81.5 → 90
  // =========================================================================
  {
    const t = T.s11;
    splitWords(document.getElementById('s11-l1'));
    splitWords(document.getElementById('s11-l2'));
    enterWords('#s11-l1', t + 0.3, { stagger: 0.08, y: 60 });
    enterWords('#s11-l2', t + 1.6, { stagger: 0.08, y: 60 });
    tl.to('#s11-l1 .w, #s11-l2 .w', { y: -50, autoAlpha: 0, filter: 'blur(10px)', duration: 0.5, ease: 'power3.in', stagger: 0.015 }, t + 4.0);
    tl.fromTo('#s11-logo', { scale: 0.86, autoAlpha: 0, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power4.out' }, t + 4.4);
    tl.fromTo('#s11-cta', { y: 60, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power4.out' }, t + 5.0);
    rise('#s11-site', t + 5.6, { y: 16 });
    // Final scene may resolve: a slow settle, then the frame rests.
    tl.fromTo('#s11-lock', { scale: 1 }, { scale: 1.02, duration: 3.5, ease: 'sine.inOut' }, t + 5.0);
    tl.to('#bg .glow-a', { autoAlpha: 0.7, duration: 1.2, ease: 'sine.inOut' }, T.end - 1.4);
  }

  // ---- root-level video layers: geometry + the same entrance the frames get ----
  document.querySelectorAll('video[data-frame]').forEach(v => {
    const f = document.getElementById(v.dataset.frame);
    const r = { left: f.style.left, top: f.style.top, width: f.style.width, height: f.style.height };
    Object.assign(v.style, r, { position: 'absolute', objectFit: 'cover', borderRadius: '22px', zIndex: 5, background: '#FCFCFB' });
    const t = +v.dataset.enter, rx = +(v.dataset.rx || 8), pushTo = +(v.dataset.push || 1.03), pushDur = +(v.dataset.pushDur || 6);
    tl.fromTo(v, { y: 140, autoAlpha: 0, rotationX: rx, transformPerspective: 1600, scale: 0.97 }, { y: 0, autoAlpha: 1, rotationX: 0, scale: 1, duration: 0.95, ease: 'power4.out' }, t);
    tl.to(v, { scale: pushTo, duration: pushDur, ease: 'sine.inOut' }, t + 1);
    const out = +v.dataset.exit;
    const mode = v.dataset.exitMode || 'push';
    if (mode === 'zoom') tl.to(v, { scale: pushTo * 1.16, autoAlpha: 0, filter: 'blur(18px)', duration: 0.5, ease: 'power3.in' }, out);
    else tl.to(v, { y: -70, autoAlpha: 0, filter: 'blur(14px)', duration: 0.55, ease: 'power3.in' }, out);
  });

  return tl;
};
