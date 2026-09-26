// The film's 2D layer: kinetic type on the 120 BPM grid, overlays pinned to the 3D camera, the lockup.
// Tweens are ordinary GSAP on the paused timeline. Anything that must follow the camera, or flicker
// per frame (glitch, scramble, typewriter, grain), is written by place(), which the driver calls
// with the world's anchors for time t — so every frame is a pure function of t.
import { T, LAYOUTS } from '../config.js';
import { clamp, smooth, hash1 } from '../math.js';
import { LOGOS } from './logos.js';

const SPRING = 'back.out(1.7)';
const OUT = 'expo.out';

// per-aspect type layout (px)
const TYPE = {
  '16x9': {
    l1: { left: 120, top: 612 },
    l2: { left: 120, top: 612 },
    eb: { left: 124, top: 598 },
    tri: { left: 112, top: 640 },
    det: { left: 124, top: 842 },
    tagline: { top: 604 },
    cta: { top: 712 },
    url: { top: 840 },
  },
  '9x16': {
    l1: { left: 76, top: 1190 },
    l2: { left: 76, top: 1190 },
    eb: { left: 80, top: 1128 },
    tri: { left: 68, top: 1170 },
    det: { left: 80, top: 1520 },
    tagline: { top: 1050 },
    cta: { top: 1160 },
    url: { top: 1292 },
  },
};

// sources riding the tangle, then the funnel
const CHAOS_TAGS = ['snowflake', 'sap', 'SF', 'postgresql', 'zendesk', 'jira', 'SP', 'googledrive', 'mongodb', 'databricks', 'hubspot', 'notion', 'stripe', 'confluence'];
const FUNNEL_TAGS = ['googlebigquery', 'mysql', 'redis', 'SF', 'apachekafka', 'clickhouse', 'elastic', 'airtable', 'snowflake', 'dropbox', 'S3', 'googlecloud', 'sap', 'postgresql', 'databricks', 'SP'];
const DOMAINS = ['Customers', 'Policies', 'Claims', 'Contracts', 'Support', 'Suppliers'];
const AGENTS = ['Claims triage copilot', 'Collections agent', 'Churn-risk digest'];
const CHIP_T = [T.beam + 0.5, T.beam + 0.75, T.beam + 1.0];

export function buildTimeline(tl, aspect) {
  const $ = (s) => document.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const L = LAYOUTS[aspect];
  const TY = TYPE[aspect];
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, cls, parent, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  };
  const place = (node, p) => {
    for (const k in p) node.style[k] = typeof p[k] === 'number' ? p[k] + 'px' : p[k];
  };

  // ---------- inline the source marks as symbols ----------
  {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    const defs = document.createElementNS(NS, 'defs');
    for (const id in LOGOS) {
      const sym = document.createElementNS(NS, 'symbol');
      sym.setAttribute('id', 'lg-' + id);
      sym.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', LOGOS[id].d);
      sym.appendChild(path);
      defs.appendChild(sym);
    }
    svg.appendChild(defs);
    document.getElementById('root').prepend(svg);
  }
  const tileHTML = (id) =>
    LOGOS[id] ? `<svg viewBox="0 0 24 24"><use href="#lg-${id}"></use></svg>` : `<b>${id}</b>`;

  // ---------- layout ----------
  const [gl, gt, gs] = L.glyph;
  place($('#l1'), TY.l1);
  place($('#l2'), TY.l2);
  place($('#eb'), TY.eb);
  ['#w1', '#w2', '#w3'].forEach((s) => place($(s), TY.tri));
  ['#d1', '#d2', '#d3'].forEach((s) => place($(s), TY.det));
  const glyph = $('#glyph');
  glyph.setAttribute('width', String(28 * gs));
  glyph.setAttribute('height', String(20 * gs));
  place(glyph, { left: gl, top: gt });
  place($('#wm-mask'), { left: gl + 28 * gs + 80 * (gs / 7.2), top: gt + 10 * gs - 80 * (gs / 7.2) });
  $('#wm').style.fontSize = 160 * (gs / 7.2) + 'px';
  $('#tagline').style.fontSize = 50 * (gs / 8.4) + 'px';
  place($('#tagline'), { top: TY.tagline.top });
  place($('#url'), { top: TY.url.top });
  {
    const cta = $('#cta');
    const row = el('div', 'abs', cta.parentNode);
    row.id = 'cta-row';
    place(row, { left: 0, top: TY.cta.top, width: L.W, display: 'flex', justifyContent: 'center' });
    row.appendChild(cta);
    cta.style.position = 'relative';
  }

  // ---------- text splitting ----------
  function splitWords(root) {
    const out = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(' '));
            const m = el('span', 'm');
            const s = el('span', 'w', m);
            s.textContent = w;
            m.setAttribute('data-layout-allow-overlap', '');
            s.setAttribute('data-layout-allow-overlap', '');
            frag.appendChild(m);
            out.push(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(root);
    return out;
  }
  function splitChars(root, masked = true) {
    const out = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const ch of n.textContent) {
            if (ch === ' ') {
              frag.appendChild(document.createTextNode(' '));
              continue;
            }
            const s = el('span', 'ch');
            s.textContent = ch;
            s.setAttribute('data-layout-allow-overlap', '');
            if (masked) {
              const m = el('span', 'm');
              m.setAttribute('data-layout-allow-overlap', '');
              m.appendChild(s);
              frag.appendChild(m);
            } else frag.appendChild(s);
            out.push(s);
          }
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(root);
    return out;
  }

  const rise = (targets, t, { dur = 0.6, stagger = 0.04, e = OUT, from = 108 } = {}) =>
    tl.fromTo(targets, { yPercent: from, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur, stagger, ease: e, immediateRender: true }, t);
  const leave = (targets, t, { dur = 0.26, stagger = 0.02, to = -108 } = {}) =>
    tl.to(targets, { yPercent: to, opacity: 0, duration: dur, stagger, ease: 'power3.in' }, t);

  // ================= 01 · "Your data is everywhere." =================
  {
    const h = $('#l1');
    const it = h.querySelector('.it');
    const itText = it.textContent;
    it.textContent = '';
    const lead = splitWords(h);
    it.textContent = itText;
    const letters = splitChars(it, false);
    // "Your" "data" "is" on 16ths into the downbeat, then "everywhere." gathers on the downbeat
    lead.forEach((w, k) => rise(w, T.line1 + k * 0.125, { dur: 0.55 }));
    const R = (k, s) => hash1(k * 31 + s) * 2 - 1;
    letters.forEach((c, k) => {
      tl.fromTo(c, { x: R(k, 1) * 90, y: 60 + R(k, 2) * 50, rotation: R(k, 3) * 25, opacity: 0, filter: 'blur(10px)' },
        { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: OUT, immediateRender: true }, 2.0 + k * 0.012);
      // ...and scatters again on the way out: this data does not stay put
      tl.to(c, { x: R(k, 4) * 260, y: -40 + R(k, 5) * 160, rotation: R(k, 6) * 70, opacity: 0, filter: 'blur(8px)', duration: 0.34, ease: 'power3.in' }, 3.64 + k * 0.01);
    });
    leave(lead, 3.62, { stagger: 0.03 });
  }

  // ================= 02 · "Your agents can't use it." =================
  const l2it = $('#l2 .it');
  {
    const words = splitWords($('#l2'));
    const times = [4.0, 4.125, 4.5, 4.625, 4.75];
    words.forEach((w, k) => rise(w, times[k], { dur: 0.5 }));
    // the stop: everything holds its breath, then the line is sucked toward the drop
    tl.to('#l2', { opacity: 0.55, duration: 0.12, ease: 'power2.out' }, T.stop);
    tl.to('#l2', { scale: 0.94, opacity: 0, filter: 'blur(6px)', transformOrigin: '30% 60%', duration: 0.24, ease: 'power3.in' }, T.drop - 0.25);
  }

  // ================= 03 · the triad =================
  const triT = [T.drop, T.graph, T.beam];
  const triEnd = [T.graph, T.beam, T.fold];
  const triLetters = ['#w1', '#w2', '#w3'].map((s) => splitChars($(s)));
  triLetters.forEach((ls, k) => {
    rise(ls, triT[k], { dur: 0.62, stagger: 0.016, from: 112 });
    tl.fromTo(ls[0].closest('.tri'), { scale: 1.06, transformOrigin: '0% 100%' }, { scale: 1, duration: 0.8, ease: OUT, immediateRender: true }, triT[k]);
    leave(ls, triEnd[k] - 0.3, { dur: 0.18, stagger: 0.006 }); // clear before the next word lands
  });
  tl.fromTo('#eb i', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: OUT, immediateRender: true }, T.drop);
  tl.fromTo('#eb', { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: true }, T.drop);
  tl.to('#eb', { opacity: 0, duration: 0.2 }, T.fold - 0.2);

  // ================= overlays: source tiles, domain labels, the agent, the chips =================
  const over = $('#over');
  const mkTag = (id) => {
    const a = el('div', 'anc', over);
    const tile = el('div', 'tile', a, tileHTML(id));
    a.style.opacity = '0';
    return { a, tile };
  };
  const ctags = CHAOS_TAGS.map(mkTag);
  const ftags = FUNNEL_TAGS.map(mkTag);
  const dlabels = DOMAINS.map((d) => {
    const a = el('div', 'anc', over);
    const inner = el('div', 'dom', a, `<i></i>${d.toUpperCase()}`);
    a.style.opacity = '0';
    return { a, inner };
  });
  const agent = (() => {
    const a = el('div', 'anc', over);
    const box = el('div', 'agent', a, `<span class="k">AI AGENT</span><span class="s"></span>`);
    a.style.opacity = '0';
    return { a, box, s: box.querySelector('.s') };
  })();
  const chipIcon = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>';
  const portrait = aspect === '9x16';
  const chips = AGENTS.map((name, k) => {
    const a = el('div', 'anc', over);
    const stem = el('div', 'stem' + (portrait ? ' h' : ''), a);
    const c = el('div', 'chip', a, `<span class="ic">${chipIcon}</span><span class="n">${name}</span><span class="r">READY</span>`);
    if (portrait) {
      // the line runs up the frame: chips hang off to its right
      place(stem, { width: 46 });
      place(c, { left: 46, top: -30 });
    } else {
      const drop = 70 + (AGENTS.length - 1 - k) * 86; // descends to the left, so no stem crosses a chip
      place(stem, { height: drop });
      place(c, { top: drop });
    }
    a.style.opacity = '0';
    return { a, c, stem };
  });
  chips.forEach((ch, k) => {
    tl.fromTo(ch.stem, portrait ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 0.3, ease: 'power3.out', immediateRender: true }, CHIP_T[k] - 0.12);
    tl.fromTo(ch.c, { scale: 0.6, y: -14, opacity: 0, transformOrigin: '0% 0%' }, { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: SPRING, immediateRender: true }, CHIP_T[k]);
    tl.to(ch.c, { scale: 0.9, opacity: 0, y: -10, duration: 0.25, ease: 'power3.in' }, T.fold - 0.1 + k * 0.04);
  });
  dlabels.forEach((d, c) => {
    tl.fromTo(d.inner, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT, immediateRender: true }, T.graph + 0.18 + c * 0.125);
    tl.to(d.inner, { opacity: 0, x: 10, duration: 0.25, ease: 'power2.in' }, T.beam - 0.05 + c * 0.03);
  });
  tl.fromTo(agent.box, { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, immediateRender: true }, T.agent + 0.2);
  tl.to(agent.box, { opacity: 0, duration: 0.2 }, T.drop - 0.2);

  // scrim rides with the type
  tl.fromTo('#scrim', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out', immediateRender: true }, 1.25);
  tl.to('#scrim', { opacity: 0.55, duration: 0.3 }, T.drop);
  tl.to('#scrim', { opacity: 0, duration: 0.6 }, T.fold - 0.3);

  // ================= lockup =================
  const wmLetters = splitChars($('#wm'), false);
  tl.fromTo('#glyph', { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power1.inOut', immediateRender: true }, T.lock - 0.1);
  tl.fromTo(wmLetters, { x: -70, opacity: 0, filter: 'blur(8px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.03, ease: OUT, immediateRender: true }, T.lock + 0.02);
  const tagParts = $$('#tagline .p');
  tagParts.forEach((p, k) => tl.fromTo(p, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: OUT, immediateRender: true }, T.lock + 0.5 + k * 0.25));
  tl.fromTo('#cta', { scale: 0.82, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)', immediateRender: true }, T.cta);
  tl.fromTo('#cta svg', { x: -12 }, { x: 0, duration: 0.5, ease: 'back.out(3)', immediateRender: true }, T.cta + 0.25);
  tl.fromTo('#cta .sheen', { x: -140 }, { x: 1000, duration: 0.9, ease: 'power2.inOut', immediateRender: true }, T.cta + 1.1);
  tl.fromTo('#url', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: OUT, immediateRender: true }, T.cta + 0.3);
  tl.fromTo('#s-lock', { scale: 1 }, { scale: 1.018, duration: T.end - T.lock, ease: 'sine.inOut', transformOrigin: '50% 50%', immediateRender: true }, T.lock);
  // a glint runs down the three streams once the lockup settles
  const run = document.getElementById('g-run');
  tl.set('#g-glint', { opacity: 1 }, T.lock + 1.8);
  tl.fromTo(run, { attr: { x1: -8, x2: 0 } }, { attr: { x1: 16, x2: 24 }, duration: 1.1, ease: 'power2.inOut', immediateRender: true }, T.lock + 1.8);
  tl.set('#g-glint', { opacity: 0 }, T.lock + 2.95);
  tl.set('#g-glint', { opacity: 1 }, T.lock + 4.1);
  tl.fromTo(run, { attr: { x1: -8, x2: 0 } }, { attr: { x1: 16, x2: 24 }, duration: 1.1, ease: 'power2.inOut', immediateRender: false }, T.lock + 4.1);
  tl.set('#g-glint', { opacity: 0 }, T.lock + 5.25);
  tl.to('#cta svg', { x: 9, duration: 0.16, ease: 'power2.out' }, 18.0);
  tl.to('#cta svg', { x: 0, duration: 0.5, ease: 'back.out(3)' }, 18.16);
  tl.fromTo('#cta .sheen', { x: -140 }, { x: 1000, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, 18.9);

  // ================= per-frame writer =================
  const det = ['#d1', '#d2', '#d3'].map((s) => {
    const n = $(s);
    const txt = n.querySelector('.txt');
    const full = txt.textContent;
    const cur = el('span', 'cur', n);
    return { n, txt, full, cur };
  });
  const ebN = $('#eb-n');
  const grain = $('#grain');
  const DIG = '0123456789';

  const ZONE = aspect === '9x16' ? { x0: 40, y0: 1080, x1: 1040, y1: 1640 } : { x0: 80, y0: 570, x1: 1560, y1: 910 };
  const zoneFade = (p) => {
    const dx = Math.max(ZONE.x0 - p.x, 0, p.x - ZONE.x1), dy = Math.max(ZONE.y0 - p.y, 0, p.y - ZONE.y1);
    return smooth(0, 70, Math.hypot(dx, dy));
  };
  function placeTag(tag, p, alpha, scale) {
    if (p && p.on) alpha *= zoneFade(p);
    if (!p || !p.on || alpha <= 0.01 || p.x < -80 || p.x > L.W + 80 || p.y < -80 || p.y > L.H + 80) {
      tag.a.style.opacity = '0';
      return;
    }
    tag.a.style.opacity = alpha.toFixed(3);
    tag.a.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
  }

  function placeAll(A, t) {
    const frame = Math.round(t * 30);
    // chaos tiles ride the heads of their strands
    ctags.forEach((tag, k) => {
      const p = A.tags[k];
      if (!p || t > T.drop + 0.05) return placeTag(tag, null, 0, 1);
      const depthOK = smooth(250, 520, p.depth) * (1 - smooth(2600, 3600, p.depth));
      const a = clamp(p.I * 1.6) * depthOK * (1 - smooth(T.stop - 0.05, T.stop + 0.1, t) * 0.6) * (1 - smooth(T.drop - 0.12, T.drop, t));
      placeTag(tag, p, a, clamp(p.ppu * 2.4, 0.72, 1.5));
    });
    // funnel tiles rush past the lens toward the hub
    ftags.forEach((tag, k) => {
      const p = A.ftags && A.ftags[k];
      if (!p) return placeTag(tag, null, 0, 1);
      const a = smooth(T.drop + 0.12 + k * 0.03, T.drop + 0.3 + k * 0.03, t) * smooth(160, 420, p.depth) * (1 - smooth(4200, 6400, p.depth)) * (1 - smooth(T.graph - 0.25, T.graph - 0.05, t));
      placeTag(tag, p, a, clamp(p.ppu * 2.8, 0.6, 2.4));
    });
    // domain labels follow their nodes
    dlabels.forEach((d, c) => {
      const p = A.labels[c];
      const on = t > T.graph + 0.1 && t < T.beam + 0.3 ? 1 : 0;
      if (!on || !p.on) return (d.a.style.opacity = '0');
      d.a.style.opacity = '1';
      d.a.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
    });
    // the agent's label
    {
      const p = A.agent;
      const on = t > T.agent && t < T.drop;
      agent.a.style.opacity = on ? '1' : '0';
      if (on) agent.a.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
      const bad = t >= T.fail;
      const s1 = 'searching the estate…';
      const s2 = 'no usable context';
      const n = bad ? s2.length : Math.floor(clamp((t - T.probe) * 42, 0, s1.length));
      agent.s.textContent = bad ? s2 : s1.slice(0, n);
      agent.s.className = 's' + (bad ? ' bad' : '');
      if (bad && t < T.stop) {
        const g = hash1(frame * 7);
        agent.box.style.transform = g < 0.4 ? `translateX(${((hash1(frame) - 0.5) * 14).toFixed(1)}px)` : '';
      }
    }
    // chips hang under their stations on the beam
    chips.forEach((ch, k) => {
      const p = A.stations[k];
      const on = t > CHIP_T[k] - 0.15 && t < T.fold + 0.3 && p.on;
      ch.a.style.opacity = on ? '1' : '0';
      if (on) ch.a.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
    });
    // glitch on "can't use it." while the probe dies
    if (t >= T.fail && t < T.stop + 0.04) {
      const g = hash1(frame * 13 + 5);
      const dx = (hash1(frame * 3 + 1) - 0.5) * 18;
      l2it.style.textShadow = g < 0.55 ? `${(dx * 0.6).toFixed(1)}px 0 0 rgba(255,70,40,0.85), ${(-dx * 0.6).toFixed(1)}px 0 0 rgba(60,160,255,0.85)` : 'none';
      l2it.style.transform = g < 0.35 ? `translateX(${dx.toFixed(1)}px) skewX(${((hash1(frame) - 0.5) * 12).toFixed(1)}deg)` : 'none';
    } else {
      l2it.style.textShadow = 'none';
      l2it.style.transform = 'none';
    }
    // eyebrow: the stage number scrambles, then locks, on each downbeat
    {
      let k = t < T.graph ? 0 : t < T.beam ? 1 : 2;
      const since = t - triT[k];
      const target = '0' + (k + 1);
      ebN.textContent = since < 0.28 ? DIG[Math.floor(hash1(frame * 5) * 10)] + DIG[Math.floor(hash1(frame * 9 + 2) * 10)] : target;
    }
    // detail lines type on, then backspace before the next beat
    det.forEach((d, k) => {
      const a = triT[k] + 0.3, b = triEnd[k] - 0.4;
      const typed = Math.floor(clamp((t - a) * 60, 0, d.full.length));
      const erased = Math.floor(clamp((t - b) * 90, 0, d.full.length));
      const n = Math.max(0, typed - erased);
      const vis = t > a - 0.05 && t < b + 0.35;
      d.n.style.opacity = vis ? '1' : '0';
      d.txt.textContent = d.full.slice(0, n);
      d.cur.style.opacity = vis && (Math.floor(t * 4) % 2 === 0 || (n > 0 && n < d.full.length)) ? '1' : '0';
    });
    // grain steps every frame
    grain.style.transform = `translate(${Math.floor(hash1(frame) * 64)}px, ${Math.floor(hash1(frame + 999) * 64)}px)`;
  }

  return { place: placeAll };
}
