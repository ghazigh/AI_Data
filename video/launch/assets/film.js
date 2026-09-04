/* Datalith launch film v3 — one paused GSAP timeline.
   Motion rules: one virtual camera per board, directional SVG motion blur riding every
   move, spring entrances (5–8 % overshoot), per-word masked text reveals, two typewriter
   prompts, and a substrate (blooms, grain, dot grid) that never stops moving. */
window.__buildFilm = function buildFilm() {
  const tl = gsap.timeline({ paused: true });
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const SPRING = 'back.out(1.7)';
  const OUT = 'power4.out';

  // ---------- helpers ----------
  // A camera: frame centre lands on stage point (x, y) at scale s, rotated r degrees.
  function camera(el, init) {
    const c = Object.assign({ x: 960, y: 540, s: 1, r: 0 }, init);
    const write = () => {
      const a = (c.r * Math.PI) / 180, cos = Math.cos(a), sin = Math.sin(a);
      const sx = c.x * c.s, sy = c.y * c.s;
      el.style.transform = `translate(${960 - (cos * sx - sin * sy)}px, ${540 - (sin * sx + cos * sy)}px) rotate(${c.r}deg) scale(${c.s})`;
    };
    write();
    return { c, to: (t, vals, duration, ease) => tl.to(c, Object.assign({ duration, ease, onUpdate: write }, vals), t), set: (t, vals) => tl.set(c, Object.assign({ onUpdate: write }, vals), t) };
  }
  // Directional blur proxy bound to one feGaussianBlur.
  function blur(id) {
    const node = document.getElementById('mbb-' + id);
    const p = { v: 0, ax: 1, ay: 1 };
    const write = () => node.setAttribute('stdDeviation', `${(p.v * p.ax).toFixed(2)} ${(p.v * p.ay).toFixed(2)}`);
    write();
    const axis = (name) => { p.ax = name === 'y' ? 0 : 1; p.ay = name === 'x' ? 0 : 1; };
    return {
      // symmetric envelope for an inOut leg: 0 → peak → 0
      leg: (t, dur, peak, ax = 'xy', ease = 'power2') => {
        tl.set(p, { v: 0, onUpdate: () => { axis(ax); write(); } }, t);
        tl.to(p, { v: peak, duration: dur / 2, ease: ease + '.in', onUpdate: write }, t);
        tl.to(p, { v: 0, duration: dur / 2, ease: ease + '.out', onUpdate: write }, t + dur / 2);
      },
      // out-eased leg: starts at peak, resolves sharp
      out: (t, dur, peak, ax = 'xy', ease = OUT) => {
        tl.set(p, { v: peak, onUpdate: () => { axis(ax); write(); } }, t);
        tl.to(p, { v: 0, duration: dur, ease, onUpdate: write }, t);
      },
      // in-eased leg: sharp → peak (a push-through that ends in the next scene)
      in: (t, dur, peak, ax = 'xy', ease = 'power3.in') => {
        tl.set(p, { v: 0, onUpdate: () => { axis(ax); write(); } }, t);
        tl.to(p, { v: peak, duration: dur, ease, onUpdate: write }, t);
      },
    };
  }
  // Split an element's text into masked words (.m > .w). Keeps child elements intact.
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
  function chars(el) {
    const txt = el.textContent; el.textContent = '';
    return txt.split('').map((ch) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch === ' ' ? ' ' : ch; el.appendChild(s); return s; });
  }
  const reveal = (targets, t, { dur = 0.55, stagger = 0.04, y = 0.6, ease = OUT } = {}) =>
    tl.fromTo(targets, { yPercent: 100 * y * 1.6, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur, stagger, ease }, t);
  const pop = (targets, t, { from = 0.92, dur = 0.5, stagger = 0.08, y = 0, ease = SPRING } = {}) =>
    tl.fromTo(targets, { scale: from, opacity: 0, y }, { scale: 1, opacity: 1, y: 0, duration: dur, stagger, ease }, t);
  const fade = (targets, t, to, dur = 0.3, ease = 'power2.out') => tl.to(targets, { autoAlpha: to, duration: dur, ease }, t);
  const show = (targets, t) => tl.set(targets, { autoAlpha: 1 }, t);
  const hide = (targets, t) => tl.set(targets, { autoAlpha: 0 }, t);
  function count(el, t, from, to, dur, fmt = (v) => Math.round(v).toString(), ease = 'power2.out') {
    const p = { v: from }; el.textContent = fmt(from);
    tl.to(p, { v: to, duration: dur, ease, onUpdate: () => { el.textContent = fmt(p.v); } }, t);
  }
  function typewrite(el, caret, t, text, cps = 30) {
    const p = { n: 0 }; el.textContent = '';
    tl.to(p, { n: text.length, duration: text.length / cps, ease: 'none', onUpdate: () => { el.textContent = text.slice(0, Math.floor(p.n)); } }, t);
    if (caret) { const b = { i: 0 }; tl.to(b, { i: 14, duration: 7, ease: 'steps(14)', onUpdate: () => { caret.style.opacity = b.i % 2 ? 0 : 1; } }, t - 0.6); }
  }
  function drawPath(path, t, dur, ease = 'power2.inOut') {
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L} ${L}`; path.style.strokeDashoffset = L;
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease }, t);
  }
  function pulsePath(path, t, dur) {
    const L = path.getTotalLength(), seg = Math.min(220, L * 0.6);
    path.style.strokeDasharray = `${seg} ${L + seg}`; path.style.strokeDashoffset = seg;
    tl.set(path, { opacity: 1 }, t);
    tl.to(path, { strokeDashoffset: -L, duration: dur, ease: 'power1.inOut' }, t);
    tl.set(path, { opacity: 0 }, t + dur);
  }
  const clip = (el, t, from, to, dur, ease = 'power3.inOut') => tl.fromTo(el, { clipPath: from }, { clipPath: to, duration: dur, ease }, t);

  // ---------- substrate: blooms drift, dot grid parallaxes, grain steps at 12 fps ----------
  const blooms = [$('#bloom-a'), $('#bloom-b'), $('#bloom-c')];
  const dots = $('#dots');
  const sub = { p: 0 };
  tl.to(sub, {
    p: 66, duration: 66, ease: 'none', onUpdate: () => {
      const t = sub.p;
      blooms[0].style.transform = `translate(${Math.sin(t * 0.21) * 140}px, ${Math.cos(t * 0.17) * 110}px)`;
      blooms[1].style.transform = `translate(${Math.cos(t * 0.15 + 1) * 160}px, ${Math.sin(t * 0.19) * 120}px)`;
      blooms[2].style.transform = `translate(${Math.sin(t * 0.13 + 2) * 150}px, ${Math.cos(t * 0.23) * 90}px)`;
      dots.style.transform = `translate(${Math.sin(t * 0.11) * 40}px, ${Math.cos(t * 0.09) * 30}px)`;
    },
  }, 0);
  const grain = $('#grain'); const gp = { i: 0 };
  const GPOS = [[0, 0], [91, 37], [163, 121], [19, 203], [211, 77], [57, 149], [131, 11], [233, 191]];
  tl.to(gp, { i: 66 * 12, duration: 66, ease: 'steps(' + 66 * 12 + ')', onUpdate: () => { const q = GPOS[Math.floor(gp.i) % 8]; grain.style.backgroundPosition = `${q[0]}px ${q[1]}px`; } }, 0);

  const field = $('#field'), dark = $('#darkplate');
  // stacked / skinned duplicates are intentional overlaps for the layout audit
  $$('#deck .dk *, #win-mob *, #p2-txt, #b-chip, #b-chip *').forEach((e) => e.setAttribute('data-layout-allow-overlap', ''));
  tl.set(dark, { clipPath: 'inset(0 100% 0 0)' }, 0);

  // ======================= B1–B3 · 0.0–3.2 · builder, drop, exploded view =======================
  {
    const cam = camera($('#cam-open'), { x: 700, y: 560, s: 3.0, r: -4 });
    const mb = blur('open');
    // cold open: defocused and tight, resolving as we pull back
    tl.fromTo('#cam-open', { filter: 'blur(28px)' }, { filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, 0);
    cam.to(0, { x: 960, y: 540, s: 1.0, r: 0 }, 1.2, 'power3.out');
    // drag-in: the grab hand carries the Snowflake pill into the selected slot
    tl.fromTo('#drag', { x: 260, y: 120, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: OUT }, 0.15);
    tl.to('#drag', { x: -990, y: -80, duration: 0.85, ease: 'power2.inOut' }, 0.5);
    tl.to('#drag-pill', { scale: 0.7, opacity: 0, duration: 0.25, ease: 'power2.in' }, 1.35);
    tl.to('#cur-hand', { opacity: 0, duration: 0.25 }, 1.45);
    // drop lands: tile fills the slot with a spring
    tl.fromTo('#b-tile', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.55, ease: SPRING }, 1.4);
    tl.to('#b-slot-a', { opacity: 0, duration: 0.2 }, 1.45);
    tl.fromTo('#b-tile2', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: SPRING }, 1.6);
    // exploded view: parts separate in depth with heavy blur while the camera pushes out
    const parts = ['#b-chip', '#b-h', '#b-dash', '#b-tile', '#b-copy', '#b-send', '#b-t', '#b-tile2', '#b-slot-b'];
    const EXP = [[-520, -260, 380], [-60, -420, 220], [80, -40, -180], [-420, 120, 320], [60, 300, 140], [520, 140, 420], [420, 360, 260], [640, -300, 380], [200, -120, 60]];
    parts.forEach((sel, i) => tl.to(sel, { x: EXP[i][0], y: EXP[i][1], z: EXP[i][2], rotationX: (i % 2 ? 1 : -1) * 6, duration: 0.9, ease: 'power3.in' }, 2.2));
    tl.to('#builder', { boxShadow: '0 0 0 rgba(0,0,0,0)', backgroundColor: 'rgba(255,255,255,0)', duration: 0.6, ease: 'power2.in' }, 2.3);
    cam.to(2.2, { s: 0.7, x: 980, y: 520 }, 1.0, 'power3.in');
    mb.in(2.35, 0.95, 22, 'xy');
    tl.to('#cam-open', { opacity: 0, duration: 0.2 }, 3.1);
  }

  // ======================= B4 · 3.2–4.4 · field, "Hi," =======================
  {
    fade(field, 3.15, 1, 0.12, 'none');
    const cam = camera($('#cam-hi'), { s: 1.0 });
    cam.to(3.2, { s: 1.08 }, 1.3, 'power1.inOut');
    const hi = chars($('#hi-1'));
    tl.fromTo('#hi-star', { scale: 0, rotation: -90, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: SPRING }, 3.25);
    tl.fromTo(hi, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: OUT }, 3.3);
    reveal(words($('#hi-2')), 3.7, { stagger: 0.05 });
    hide(field, 4.4);
  }

  // ======================= B5 · 4.4–6.6 · prompt one, press, push-through =======================
  {
    const cam = camera($('#cam-p1'), { s: 1.0 });
    const mb = blur('p1');
    reveal(words($('#p1-h')), 4.42, { stagger: 0.035, dur: 0.5 });
    pop('#p1-box', 4.55, { from: 0.94, dur: 0.6, y: 30 });
    // the user's cursor slides in and presses submit
    tl.fromTo('#cur-1', { x: 0, y: 0, opacity: 0 }, { opacity: 1, duration: 0.2 }, 5.0);
    tl.to('#cur-1', { x: -240, y: -320, duration: 0.7, ease: 'power3.inOut' }, 5.0);
    tl.to('#p1-go', { scale: 0.9, duration: 0.1, ease: 'power2.in' }, 5.72);
    tl.to('#p1-go', { scale: 1, duration: 0.3, ease: SPRING }, 5.82);
    tl.to('#p1-box', { boxShadow: '0 30px 80px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05), 0 0 0 14px rgba(61,95,255,0.22), 0 0 120px rgba(61,95,255,0.45)', duration: 0.3 }, 5.75);
    // push-through the card: the next scene is what was inside it
    cam.to(5.95, { x: 960, y: 595, s: 4.2 }, 0.7, 'power3.in');
    mb.in(6.0, 0.65, 26, 'xy');
    tl.to('#cam-p1', { opacity: 0, duration: 0.15 }, 6.5);
  }

  // ======================= B6–B7 · 6.4–10.4 · report at 250 % → stacked deck =======================
  {
    const cam = camera($('#cam-r1'), { x: 960, y: 380, s: 2.5 });
    const mb = blur('r1');
    mb.out(6.4, 0.6, 22, 'xy');
    tl.fromTo('#cam-r1', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 6.4);
    count($('#r1-n'), 6.5, 0, 71, 1.4);
    tl.fromTo('#r1-rows .bar i', { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 6.7);
    // slow scroll up through the report
    cam.to(6.9, { y: 620 }, 1.6, 'power1.inOut');
    // pull back: the deck fans up and back, numbered
    const deck = ['#dk-1', '#dk-2', '#dk-3', '#dk-4', '#dk-5'];
    deck.forEach((d, i) => { if (i) tl.set(d, { opacity: 0, y: 0, z: 0 }, 6.4); });
    cam.to(8.4, { x: 960, y: 560, s: 0.92 }, 1.1, 'power3.inOut');
    mb.leg(8.4, 1.1, 14, 'xy');
    deck.forEach((d, i) => {
      tl.to(d, { y: -i * 120, z: -i * 260, opacity: i ? 1 - i * 0.2 : 1, duration: 0.8, ease: 'power3.out' }, 8.55 + i * 0.07);
    });
    tl.to('#cam-r1', { opacity: 0, duration: 0.15 }, 10.35);
  }

  // ======================= B8 · 10.4–12.4 · brand card =======================
  {
    const cam = camera($('#cam-brand'), { s: 1.0 });
    cam.to(10.4, { s: 1.06 }, 2.1, 'power1.inOut');
    tl.fromTo('#cam-brand', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 10.4);
    clip('#brand-word', 10.55, 'inset(0 100% 0 0)', 'inset(0 0% 0 0)', 0.85, 'power3.inOut');
    tl.fromTo('#brand-mark', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: SPRING }, 11.3);
    tl.to('#cam-brand', { opacity: 0, duration: 0.15 }, 12.35);
  }

  // ======================= B9 · 12.4–14.8 · prompt two, typed live, push-in =======================
  {
    const cam = camera($('#cam-p2'), { s: 1.0 });
    const mb = blur('p2');
    pop('#p2-box', 12.42, { from: 0.94, dur: 0.6, y: 30 });
    typewrite($('#p2-txt'), $('#p2-caret'), 12.7, 'Build a claims triage agent. Claims and policy data only. Mask personal data. Log every read.', 52);
    tl.to('#p2-go', { backgroundColor: '#8A8A8E', duration: 0.2 }, 12.7);
    tl.to('#p2-go', { backgroundColor: '#0D0D0D', scale: 0.9, duration: 0.1 }, 14.32);
    tl.to('#p2-go', { scale: 1, duration: 0.3, ease: SPRING }, 14.42);
    cam.to(14.25, { x: 960, y: 540, s: 3.6 }, 0.6, 'power3.in');
    mb.in(14.3, 0.55, 26, 'xy');
    tl.to('#cam-p2', { opacity: 0, duration: 0.15 }, 14.7);
  }

  // ======================= B10–B16 · 14.6–35.8 · the graph board =======================
  {
    const G = 14.6;
    const cam = camera($('#cam-graph'), { x: 640, y: 690, s: 2.4, r: 6 });
    const mb = blur('graph');
    const board = $('#gboard');
    tl.set(board, { transformPerspective: 1800, rotationY: 12 }, 0);
    tl.fromTo('#cam-graph', { opacity: 0 }, { opacity: 1, duration: 0.25 }, G);
    mb.out(G, 0.7, 20, 'xy');
    // arrive tilted, extreme close-up on the checklist; straighten and pull back through the card
    tl.set(['#kb1', '#kb2', '#ag1', '#kb3', '#kb4', '#ag2', '#kb5', '#kb6', '#ag3', '#t2', '#t3', '#lbl-1', '#lbl-2', '#lbl-3', '#g-plus', '#g-avatar', '#g-ring', '#g-sq'], { opacity: 0 }, 0);
    tl.set('#g-conn path', { opacity: 0 }, 0);
    tl.set('#g-conn .dot', { opacity: 0 }, 0);
    pop('#t1-checks .check', G + 0.3, { from: 0.96, dur: 0.5, stagger: 0.28, y: 14 });
    tl.to('#t1-c3 .spin', { rotation: 720, duration: 2.0, ease: 'none', transformOrigin: '50% 50%' }, G + 0.8);
    tl.to('#t1-c3 .spin', { opacity: 0, duration: 0.2 }, G + 2.6);
    tl.to('#t1-c3 .tick', { opacity: 1, duration: 0.2 }, G + 2.6);
    tl.to('#t1-c3 i', { backgroundColor: '#EEF7DC', duration: 0.2 }, G + 2.6);
    tl.to(board, { rotationY: 0, duration: 3.2, ease: 'power2.inOut' }, G + 0.2);
    cam.to(G + 0.2, { x: 610, y: 615, s: 1.3, r: 0 }, 3.3, 'power2.inOut');
    // connector draws down to KB1 with a gradient pulse
    tl.set(['#c-11', '#g-conn .dot'], { opacity: 1 }, G + 3.5);
    drawPath($('#c-11'), G + 3.5, 0.6);
    pulsePath($('#p-11'), G + 3.6, 0.7);
    tl.set('#kb1', { opacity: 1 }, G + 3.9);
    pop('#kb1', G + 3.9, { from: 0.94, dur: 0.6, y: 30 });
    cam.to(G + 3.9, { x: 700, y: 1125, s: 1.6 }, 1.0, 'power2.inOut');
    mb.leg(G + 3.9, 1.0, 12, 'y');
    // KB2
    tl.set('#c-12', { opacity: 1 }, G + 5.4); drawPath($('#c-12'), G + 5.4, 0.5);
    tl.set('#kb2', { opacity: 1 }, G + 5.7); pop('#kb2', G + 5.7, { from: 0.94, dur: 0.6, y: 30 });
    cam.to(G + 5.8, { x: 790, y: 1685, s: 1.6 }, 1.0, 'power2.inOut');
    mb.leg(G + 5.8, 1.0, 12, 'y');
    // Agent
    tl.set('#c-13', { opacity: 1 }, G + 7.4); drawPath($('#c-13'), G + 7.4, 0.5);
    tl.set('#ag1', { opacity: 1 }, G + 7.7); pop('#ag1', G + 7.7, { from: 0.94, dur: 0.6, y: 30 });
    cam.to(G + 7.8, { x: 880, y: 2230, s: 1.6 }, 1.0, 'power2.inOut');
    mb.leg(G + 7.8, 1.0, 12, 'y');
    // pull out to the diagonal 3-up, then snap back into KB1
    cam.to(G + 9.4, { x: 760, y: 1420, s: 0.5 }, 1.1, 'power3.inOut');
    mb.leg(G + 9.4, 1.1, 14, 'xy');
    cam.to(G + 11.2, { x: 700, y: 1125, s: 1.7 }, 0.55, 'power3.inOut');
    mb.leg(G + 11.2, 0.55, 22, 'xy');
    // KB1 morphs into an opening envelope; the answer slides up out of it
    tl.set('#env', { opacity: 1 }, G + 11.9);
    tl.to('#kb1', { scale: 0.96, opacity: 0, duration: 0.45, ease: 'power2.in' }, G + 11.9);
    tl.fromTo('#env-body', { scaleY: 0.5, opacity: 0, transformOrigin: '50% 100%' }, { scaleY: 1, opacity: 1, duration: 0.55, ease: SPRING }, G + 12.0);
    tl.fromTo('#env-flap', { opacity: 0 }, { opacity: 1, duration: 0.3 }, G + 12.2);
    tl.fromTo('#env-letter', { y: 200, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out' }, G + 12.35);
    tl.fromTo('#env-badge', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.2)' }, G + 12.9);
    cam.to(G + 12.3, { y: 1050, s: 1.6 }, 2.4, 'power1.inOut');
    // whip to the wide reset: avatar, glowing ring, connector to the graph square
    cam.to(G + 14.9, { x: -820, y: 615, s: 1.0, r: 0 }, 0.7, 'power3.inOut');
    mb.leg(G + 14.9, 0.7, 24, 'x');
    tl.set('#env', { opacity: 0 }, G + 15.2);
    tl.set('#kb1', { opacity: 1, scale: 1 }, G + 15.2);
    pop('#g-avatar', G + 15.5, { from: 0.8, dur: 0.6 });
    tl.fromTo('#g-ring', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: SPRING }, G + 15.6);
    tl.set('#c-av', { opacity: 1 }, G + 16.0); drawPath($('#c-av'), G + 16.0, 0.35);
    pop('#g-sq', G + 16.3, { from: 0.8, dur: 0.5 });
    // the hero shot: one long pan-right and zoom-out while the three branches draw on
    cam.to(G + 16.6, { x: 1450, y: 1280, s: 0.42 }, 3.6, 'power2.inOut');
    mb.leg(G + 16.6, 3.6, 10, 'x');
    ['#c-b1', '#c-b2', '#c-b3'].forEach((c, i) => { tl.set(c, { opacity: 1 }, G + 16.7 + i * 0.25); drawPath($(c), G + 16.7 + i * 0.25, 0.9, 'power2.out'); });
    pop(['#lbl-1', '#lbl-2', '#lbl-3'], G + 17.4, { from: 0.9, dur: 0.5, stagger: 0.25 });
    tl.set(['#t2', '#t3'], { opacity: 1 }, G + 17.5);
    pop(['#t2', '#t3'], G + 17.5, { from: 0.94, dur: 0.6, stagger: 0.25, y: 30 });
    ['#c-21', '#c-31', '#c-22', '#c-32', '#c-23', '#c-33'].forEach((c, i) => { tl.set(c, { opacity: 1 }, G + 18.0 + i * 0.18); drawPath($(c), G + 18.0 + i * 0.18, 0.5, 'power2.out'); });
    tl.set(['#kb3', '#kb5', '#kb4', '#kb6', '#ag2', '#ag3', '#g-plus'], { opacity: 1 }, G + 18.2);
    pop(['#kb3', '#kb5', '#kb4', '#kb6', '#ag2', '#ag3', '#g-plus'], G + 18.2, { from: 0.94, dur: 0.6, stagger: 0.16, y: 30 });
    cam.to(G + 20.2, { x: 1520, y: 1300, s: 0.41 }, 1.1, 'power1.inOut');
    // blur out into the field
    mb.in(G + 20.7, 0.5, 24, 'xy');
    tl.to('#cam-graph', { opacity: 0, duration: 0.2 }, G + 21.1);
  }

  // ======================= B17 · 35.8–37.8 · "Governed" title beat =======================
  {
    show(field, 35.75);
    const cam = camera($('#cam-gov'), { s: 1.0 });
    cam.to(35.8, { s: 1.05 }, 2.1, 'power1.inOut');
    tl.fromTo('#gov-pill', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: SPRING }, 35.85);
    tl.fromTo('#gov-guides .guide', { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, 36.1);
    tl.fromTo('#gov-guides .handle', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: SPRING }, 36.3);
    hide(field, 37.8);
  }

  // ======================= B18–B19 · 37.8–43.8 · collaborative editing → rendered answer =======================
  {
    const cam = camera($('#cam-edit'), { x: 960, y: 540, s: 1.0 });
    const mb = blur('edit');
    tl.fromTo('#cam-edit', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 37.8);
    tl.fromTo('#yaml', { opacity: 0 }, { opacity: 0.35, duration: 0.6 }, 37.85);
    pop('#thumb', 37.9, { from: 0.9, dur: 0.6 });
    // the selected policy line assembles left to right
    const sw = words($('#sel-text'));
    reveal(sw, 38.0, { stagger: 0.05, dur: 0.45 });
    tl.fromTo('#sel', { opacity: 0, scaleX: 0.6, transformOrigin: '0 50%' }, { opacity: 1, scaleX: 1, duration: 0.6, ease: OUT }, 38.5);
    pop('#tb', 38.9, { from: 0.9, dur: 0.5, y: 14 });
    // the collaborator arrives and swaps one word in place
    tl.fromTo('#cur-amira', { x: 0, y: 0, opacity: 0 }, { opacity: 1, duration: 0.2 }, 39.1);
    tl.to('#cur-amira', { x: -640, y: -330, duration: 0.8, ease: 'power3.inOut' }, 39.1);
    tl.set('#sw-new', { yPercent: 110 }, 0);
    tl.to('#sw-old', { yPercent: -110, duration: 0.35, ease: 'power3.in' }, 40.1);
    tl.to('#sw-new', { yPercent: 0, duration: 0.45, ease: OUT }, 40.35);
    tl.to('#cur-amira', { x: -600, y: -300, duration: 0.5, ease: 'power2.inOut' }, 40.6);
    // push-in on the selection, then dive down to the rendered copy at 300 %
    cam.to(39.6, { x: 900, y: 560, s: 1.35 }, 1.6, 'power2.inOut');
    cam.to(41.6, { x: 850, y: 1500, s: 1.7 }, 0.8, 'power3.inOut');
    mb.leg(41.6, 0.8, 22, 'y');
    cam.to(42.4, { y: 1580 }, 1.4, 'power1.inOut');
    tl.to('#cam-edit', { opacity: 0, duration: 0.2 }, 43.7);
  }

  // ======================= B20–B21 · 43.8–50.8 · client window → phone · Every Agent → Any Model =======================
  {
    const cam = camera($('#cam-client'), { x: 960, y: 540, s: 1.0 });
    const mb = blur('client'), mw = blur('words');
    const win = $('#win');
    tl.fromTo('#cam-client', { opacity: 0 }, { opacity: 1, duration: 0.25 }, 43.8);
    tl.fromTo(win, { rotationY: -22, rotationX: 8, scale: 1.25, x: 120, transformPerspective: 2000, transformOrigin: '50% 50%' }, { rotationY: 0, rotationX: 0, scale: 1, x: 0, duration: 2.2, ease: 'power3.out' }, 43.8);
    mb.out(43.8, 0.9, 18, 'xy');
    tl.fromTo('#code2', { opacity: 0 }, { opacity: 0.22, duration: 0.8 }, 44.0);
    pop('#win-desk .illus', 44.4, { from: 0.9, dur: 0.6 });
    reveal(words($('#win-desk .display')), 44.6, { stagger: 0.04 });
    // morph: the window reshapes into a phone
    tl.set(['#w-every', '#w-agent', '#w-any', '#w-model'], { opacity: 0 }, 0);
    tl.to('#win-desk', { opacity: 0, duration: 0.3 }, 47.7);
    tl.to(win, { left: 740, top: 90, width: 440, height: 900, borderRadius: 60, duration: 0.9, ease: 'power3.inOut' }, 47.8);
    tl.to('#win .island', { opacity: 1, duration: 0.3 }, 48.3);
    tl.to('#win-mob', { opacity: 1, duration: 0.4 }, 48.3);
    tl.to('#code2', { opacity: 0, duration: 0.4 }, 47.8);
    mb.leg(47.8, 0.9, 12, 'xy');
    // giant words fly in from both edges with blur
    tl.fromTo('#w-every', { x: -700, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: OUT }, 48.4);
    tl.fromTo('#w-agent', { x: 700, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: OUT }, 48.5);
    mw.out(48.4, 0.7, 26, 'x');
    // theme inversion: light → dark across the whole frame while the phone stays put
    clip(dark, 49.5, 'inset(0 100% 0 0)', 'inset(0 0% 0 0)', 0.55, 'power3.inOut');
    tl.to('#mob-dark', { opacity: 1, duration: 0.35 }, 49.6);
    tl.to(['#w-every', '#w-agent'], { opacity: 0, duration: 0.25 }, 49.55);
    tl.fromTo('#w-any', { x: -400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: OUT }, 49.75);
    tl.fromTo('#w-model', { x: 400, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: OUT }, 49.85);
    mw.out(49.75, 0.65, 22, 'x');
    tl.to('#cam-client', { opacity: 0, duration: 0.2 }, 50.7);
    tl.to('#cam-words', { opacity: 0, duration: 0.2 }, 50.7);
  }

  // ======================= B22 · 50.8–53.8 · ripple / graph beat =======================
  {
    tl.fromTo('#llm-pill', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: SPRING }, 50.85);
    ['#rr-1', '#rr-2', '#rr-3', '#rr-4'].forEach((r, i) => {
      tl.fromTo(r, { scale: 1, opacity: 0.9 }, { scale: 4.2, opacity: 0, duration: 1.6, ease: 'power1.out', repeat: 1, repeatDelay: 0.2 }, 50.95 + i * 0.32);
    });
    // back to light; the rings become wide blue arcs pulsing left and right
    clip(dark, 52.3, 'inset(0 0% 0 0)', 'inset(0 0 0 100%)', 0.5, 'power3.inOut');
    tl.set(dark, { clipPath: 'inset(0 100% 0 0)' }, 52.85);
    tl.set('#llm-pill', { backgroundColor: '#0D0D0D' }, 0);
    tl.fromTo('#arc-l', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, 52.4);
    tl.fromTo('#arc-r', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, 52.5);
    tl.to('#arc-l', { scale: 1.12, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 53.1);
    tl.to('#arc-r', { scale: 1.12, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 53.2);
  }

  // ======================= B23 · 53.8–57.8 · stats over the rising chart =======================
  {
    show(field, 53.8);
    const cam = camera($('#cam-stats'), { x: 960, y: 540, s: 1.0 });
    const mb = blur('stats');
    mb.out(53.8, 0.5, 16, 'x');
    tl.fromTo('#cam-stats', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 53.8);
    // the chart sweeps bottom-left → top-right; the leading dot rides the line
    const line = $('#chart-line'), dot = $('#chart-dot'), rect = $('#chart-rect');
    const L = line.getTotalLength(); const cp = { u: 0 };
    tl.to(cp, { u: 1, duration: 3.6, ease: 'power1.inOut', onUpdate: () => { const p = line.getPointAtLength(L * cp.u); rect.setAttribute('width', p.x); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); } }, 53.85);
    tl.set('#st2', { opacity: 0 }, 0); tl.set('#st2-n', { opacity: 0 }, 0);
    pop('#st1', 53.95, { from: 0.9, dur: 0.5, y: 20 });
    tl.fromTo('#st1-n', { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: OUT }, 54.05);
    count($('#st1-v'), 54.05, 0, 34, 1.3);
    tl.to(['#st1', '#st1-n'], { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' }, 55.7);
    tl.set(['#st2', '#st2-n'], { opacity: 1 }, 55.95);
    pop('#st2', 55.95, { from: 0.9, dur: 0.5, y: 20 });
    tl.fromTo('#st2-n', { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: OUT }, 56.05);
    count($('#st2-v'), 56.05, 0, 50.5, 1.4, (v) => v.toFixed(1) + 'M');
    cam.to(53.8, { x: 1010, y: 540 }, 4.0, 'none');
    tl.to('#cam-stats', { opacity: 0, duration: 0.15 }, 57.75);
  }

  // ======================= B24 · 57.8–60.8 · works with any AI agent =======================
  {
    const cam = camera($('#cam-any'), { s: 1.0 });
    cam.to(57.8, { s: 1.04 }, 3.0, 'power1.inOut');
    tl.fromTo('#field-circle', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1.08, duration: 3.0, ease: 'power1.out' }, 57.8);
    tl.set(['#ic-2', '#ic-3'], { opacity: 0 }, 0);
    tl.fromTo('#ic-1', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: SPRING }, 57.85);
    tl.to('#ic-1', { opacity: 0, scale: 0.9, duration: 0.35 }, 58.9);
    tl.fromTo('#ic-2', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: OUT }, 58.95);
    tl.to('#ic-2', { opacity: 0, scale: 0.9, duration: 0.35 }, 59.8);
    tl.fromTo('#ic-3', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: OUT }, 59.85);
    reveal(words($('#any-h')), 58.1, { stagger: 0.09, dur: 0.5 });
    hide(field, 60.8); hide('#field-circle', 60.8);
  }

  // ======================= B25 · 60.8–63 · logo condense =======================
  {
    tl.fromTo('#cam-lock', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 60.8);
    tl.fromTo('#lk-mark', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }, 60.85);
    tl.set('#lk-sub2', { opacity: 0 }, 0);
    reveal(words($('#lk-sub')), 61.3, { stagger: 0.06 });
    // the mark slides into the wordmark; the line resolves
    tl.to('#lk-mark', { x: -420, y: 40, scale: 0.55, duration: 0.8, ease: 'power3.inOut' }, 62.0);
    clip('#lk-word', 62.15, 'inset(0 100% 0 0)', 'inset(0 0% 0 0)', 0.7, 'power3.inOut');
    tl.to('#lk-sub2', { opacity: 1, duration: 0.3 }, 62.6);
  }

  // ======================= B26 · 63–66 · end card =======================
  {
    const cam = camera($('#cam-end'), { s: 1.02 });
    cam.to(63, { s: 1.0 }, 3.0, 'power1.out');
    tl.fromTo('#cam-end', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 63);
    pop('#end-word', 63.05, { from: 0.96, dur: 0.7, y: 20 });
    pop('#cta > *', 63.4, { from: 0.9, dur: 0.55, stagger: 0.1, y: 16 });
  }

  return tl;
};
