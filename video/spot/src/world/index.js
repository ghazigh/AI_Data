// The renderer: temporal-supersampled motion blur into an HDR buffer, then bloom, streak and grade.
import * as THREE from 'three';
import { T, CUTS, WORLD, LAYOUTS } from '../config.js';
import { E, inv, smooth, rng, TAU } from '../math.js';
import { createField, NS, NP, ROWS, HERO, PROBE } from './field.js';
import { createCamera } from './camera.js';
import { gradeAt } from './look.js';
import * as SH from './shaders.js';

const N_DUST = 1500;

export function createWorld(canvas, aspect = '16x9') {
  const L = LAYOUTS[aspect];
  const W = L.W, H = L.H;
  THREE.ColorManagement.enabled = false;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance',
    premultipliedAlpha: false,
  });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H, false);
  renderer.autoClear = false;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  const field = createField({ portrait: H > W });
  const rig = createCamera(aspect);
  const cam = new THREE.PerspectiveCamera(50, W / H, 10, 60000);

  const add1 = { side: THREE.DoubleSide, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneFactor, transparent: true, depthTest: false, depthWrite: false };

  // ---------- strands ----------
  const posTex = new THREE.DataTexture(field.pos, NP, ROWS, THREE.RGBAFormat, THREE.FloatType);
  const colTex = new THREE.DataTexture(field.col, NP, ROWS, THREE.RGBAFormat, THREE.FloatType);
  for (const tx of [posTex, colTex]) {
    tx.minFilter = tx.magFilter = THREE.NearestFilter;
    tx.generateMipmaps = false;
    tx.needsUpdate = true;
  }
  const sref = new Float32Array(ROWS * NP * 2 * 3);
  const sidx = new Uint32Array(ROWS * (NP - 1) * 6);
  {
    let v = 0, x = 0;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < NP; j++) {
        for (const side of [-1, 1]) { sref[v++] = j; sref[v++] = i; sref[v++] = side; }
      }
      for (let j = 0; j < NP - 1; j++) {
        const a = (i * NP + j) * 2;
        sidx[x++] = a; sidx[x++] = a + 1; sidx[x++] = a + 2;
        sidx[x++] = a + 1; sidx[x++] = a + 3; sidx[x++] = a + 2;
      }
    }
  }
  const sgeo = new THREE.BufferGeometry();
  sgeo.setAttribute('position', new THREE.BufferAttribute(sref, 3));
  sgeo.setIndex(new THREE.BufferAttribute(sidx, 1));
  const smat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: SH.strandVert,
    fragmentShader: SH.strandFrag,
    uniforms: { uPos: { value: posTex }, uCol: { value: colTex }, uRes: { value: new THREE.Vector2(W, H) }, uWeight: { value: 1 }, uNP: { value: NP }, uFocus: { value: 1500 }, uAperture: { value: 0 } },
    ...add1,
  });
  const strands = new THREE.Mesh(sgeo, smat);
  strands.frustumCulled = false;

  // ---------- billboards ----------
  const G = WORLD.hub;
  const { nodes } = field.graph;
  const idx = {};
  let nB = 0;
  idx.heads = nB; nB += NS;
  idx.hero = nB++;
  idx.agent = nB++;
  idx.probe = nB++;
  idx.hub = nB++;
  idx.nodes = nB; nB += nodes.length;
  idx.merge = nB++;
  idx.stations = nB; nB += 3;
  idx.dust = nB; nB += N_DUST;
  const iPos = new Float32Array(nB * 3), iCol = new Float32Array(nB * 4), iSize = new Float32Array(nB * 2);
  const dgeo = new THREE.InstancedBufferGeometry();
  dgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3));
  dgeo.setIndex([0, 1, 2, 0, 2, 3]);
  const aPos = new THREE.InstancedBufferAttribute(iPos, 3), aCol = new THREE.InstancedBufferAttribute(iCol, 4), aSize = new THREE.InstancedBufferAttribute(iSize, 2);
  for (const a of [aPos, aCol, aSize]) a.setUsage(THREE.DynamicDrawUsage);
  dgeo.setAttribute('iPos', aPos);
  dgeo.setAttribute('iCol', aCol);
  dgeo.setAttribute('iSize', aSize);
  dgeo.instanceCount = nB;
  const dmat = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: SH.dotVert,
    fragmentShader: SH.dotFrag,
    uniforms: { uRes: { value: new THREE.Vector2(W, H) }, uWeight: { value: 1 }, uFocus: { value: 1500 }, uAperture: { value: 0 } },
    ...add1,
  });
  const dots = new THREE.Mesh(dgeo, dmat);
  dots.frustumCulled = false;

  const scene = new THREE.Scene();
  scene.add(strands, dots);

  // dust: a fixed field of motes that gives the camera parallax
  const RD = rng(99);
  const dust = [];
  for (let k = 0; k < N_DUST; k++) {
    dust.push({ p: [(RD() * 2 - 1) * 3800, (RD() * 2 - 1) * 2400, -7600 + RD() * 10400], ph: RD() * TAU, f: 0.6 + RD() * 1.8, b: 0.3 + RD() * 0.7, s: 1.6 + RD() * 2.4 });
  }

  const setB = (k, p, c, I, size, kind) => {
    iPos[k * 3] = p[0]; iPos[k * 3 + 1] = p[1]; iPos[k * 3 + 2] = p[2];
    iCol[k * 4] = c[0]; iCol[k * 4 + 1] = c[1]; iCol[k * 4 + 2] = c[2]; iCol[k * 4 + 3] = I;
    iSize[k * 2] = size; iSize[k * 2 + 1] = kind;
  };
  const BLUEW = [0.3, 0.45, 1.0];
  const tmp3 = [0, 0, 0];
  const ICE = [0.85, 0.9, 1.0];
  const chips = [T.beam + 0.5, T.beam + 0.75, T.beam + 1.0];
  const stationX = H > W ? [150, 420, 690] : [300, 690, 1080];

  function fillDots(t, tf) {
    const H4 = field.heads;
    for (let i = 0; i < NS; i++) {
      const c = field.S[i].c;
      setB(idx.heads + i, [H4[i * 4], H4[i * 4 + 1], H4[i * 4 + 2]], c, H4[i * 4 + 3] * 0.85, 4.2, 0);
    }
    {
      const k = (HERO * NP + NP - 1) * 4;
      setB(idx.hero, [field.pos[k], field.pos[k + 1], field.pos[k + 2]], [0.85, 0.9, 1], field.pos[k + 3] * 1.1, 11, 0);
    }
    // the agent
    {
      const on = smooth(T.agent - 0.02, T.agent + 0.12, t) * (1 - smooth(T.drop - 0.25, T.drop + 0.05, t));
      const bad = t > T.fail && t < T.stop ? 1 : 0;
      const f = Math.floor(tf * 24);
      const flick = bad ? ((f * 2654435761) >>> 0) % 5 < 3 ? 1.0 : 0.35 : 1;
      const c = bad ? [1.0, 0.35, 0.16] : [0.25, 0.4, 1.0];
      setB(idx.agent, field.agentPos(t), c, on * 3.2 * flick * (t > T.stop ? 0.55 : 1), 10, 0);
      const k = (PROBE * NP + NP - 1) * 4;
      setB(idx.probe, [field.pos[k], field.pos[k + 1], field.pos[k + 2]], bad ? [1, 0.4, 0.2] : [0.4, 0.55, 1], field.pos[k + 3] * 0.9, 6, 0);
    }
    // the hub the funnel pours into
    {
      const on = smooth(T.drop + 0.1, T.drop + 0.7, t) * (1 - smooth(T.graph - 0.1, T.graph + 0.25, t));
      setB(idx.hub, G, [0.5, 0.62, 1.0], on * 3.0, 38, 0);
    }
    // graph nodes: spring in per domain, fold away with the logo
    const pop = field.pop;
    for (let n = 0; n < nodes.length; n++) {
      const nd = nodes[n];
      const sc = E.backOut(inv(pop[n], pop[n] + 0.38, t), 2.6) * (1 - E.cubicIn(inv(T.fold + 0.05, T.fold + 0.6, t)));
      const size = [30, 15, 6.5][nd.kind] * Math.max(0, sc);
      const beamDim = 1 - 0.35 * smooth(T.beam, T.beam + 0.5, t);
      const flash = Math.exp(-Math.max(0, t - pop[n]) * 6) * (t >= pop[n] ? 1.5 : 0);
      setB(idx.nodes + n, field.nodeAt(n, t, tmp3), nd.kind === 0 ? [0.3, 0.46, 1.0] : ICE, ([2.2, 1.35, 1.6][nd.kind] + flash) * beamDim * (sc > 0.001 ? 1 : 0), size, nd.kind === 2 ? 0 : 1);
    }
    // beam: the merge point and the agents along the line
    {
      const on = smooth(T.beam - 0.02, T.beam + 0.08, t) * (1 - smooth(T.fold + 0.2, T.fold + 0.8, t));
      setB(idx.merge, field.M, [0.45, 0.6, 1.0], on * (2.6 + 3 * Math.exp(-Math.max(0, t - T.beam) * 5)), 17, 0);
      for (let k = 0; k < 3; k++) {
        const sc = E.backOut(inv(chips[k] - 0.05, chips[k] + 0.3, t), 2.4) * (1 - E.cubicIn(inv(T.fold, T.fold + 0.45, t)));
        const flash = t >= chips[k] ? Math.exp(-(t - chips[k]) * 7) * 2 : 0;
        setB(idx.stations + k, [field.M[0] + stationX[k], field.M[1], field.M[2]], BLUEW, (1.6 + flash) * (sc > 0.001 ? 1 : 0), 12 * Math.max(0, sc), 1);
      }
    }
    // dust
    const dustOn = 0.9 * (1 - 0.55 * smooth(T.lock, T.lock + 1, t)) * (0.45 + 0.55 * smooth(0.05, 0.6, t));
    for (let k = 0; k < N_DUST; k++) {
      const d = dust[k];
      const tw = 0.55 + 0.45 * Math.sin(t * d.f + d.ph);
      setB(idx.dust + k, d.p, [0.62, 0.7, 0.95], 0.2 * d.b * tw * dustOn, d.s, 2);
    }
    aPos.needsUpdate = aCol.needsUpdate = aSize.needsUpdate = true;
  }

  function setCam(t) {
    const c = rig.at(t);
    cam.position.set(c.pos[0], c.pos[1], c.pos[2]);
    cam.up.set(0, 1, 0);
    cam.lookAt(c.tgt[0], c.tgt[1], c.tgt[2]);
    cam.rotateZ((c.roll * Math.PI) / 180);
    cam.fov = c.fov;
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld(true);
    smat.uniforms.uFocus.value = dmat.uniforms.uFocus.value = c.focus;
    smat.uniforms.uAperture.value = dmat.uniforms.uAperture.value = c.ap;
  }

  // ---------- post chain ----------
  const rtOpt = { type: THREE.HalfFloatType, format: THREE.RGBAFormat, depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: false };
  const acc = new THREE.WebGLRenderTarget(W, H, rtOpt);
  const LV = 6;
  const down = [], up = [];
  for (let l = 0; l < LV; l++) {
    const w = Math.max(1, Math.round(W / 2 ** (l + 1))), h = Math.max(1, Math.round(H / 2 ** (l + 1)));
    down.push(new THREE.WebGLRenderTarget(w, h, rtOpt));
    up.push(new THREE.WebGLRenderTarget(w, h, rtOpt));
  }
  const sA = new THREE.WebGLRenderTarget(down[1].width, down[1].height, rtOpt);
  const sB = new THREE.WebGLRenderTarget(down[1].width, down[1].height, rtOpt);
  const qgeo = new THREE.BufferGeometry();
  qgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  const mk = (frag, uniforms) => new THREE.RawShaderMaterial({ glslVersion: THREE.GLSL3, vertexShader: SH.quadVert, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
  const mDown = mk(SH.downFrag, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uFirst: { value: 1 } });
  const mUp = mk(SH.upFrag, { tLow: { value: null }, tHere: { value: null }, uTexel: { value: new THREE.Vector2() }, uRadius: { value: 1 }, uMix: { value: 1 } });
  const mStreak = mk(SH.streakFrag, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uSpread: { value: 1 } });
  const mComp = mk(SH.compFrag, {
    tScene: { value: acc.texture }, tBloom: { value: up[0].texture }, tStreak: { value: sB.texture },
    uRes: { value: new THREE.Vector2(W, H) }, uExposure: { value: 1 }, uBloom: { value: 1 }, uStreak: { value: 0.3 }, uCA: { value: 0 }, uGlitch: { value: 0 },
    uFrame: { value: 0 }, uShock: { value: new THREE.Vector4(0.5, 0.5, 0, 0) }, uFlash: { value: 0 }, uSat: { value: 1 }, uVig: { value: 0.5 },
    uFade: { value: 0 }, uGrain: { value: 0.02 }, uInk: { value: new THREE.Vector3(16 / 255, 16 / 255, 19 / 255) }, uHaze: { value: new THREE.Vector3(0.02, 0.025, 0.05) }, uHazeC: { value: new THREE.Vector2(0.5, 0.5) },
  });
  const quad = new THREE.Mesh(qgeo, mDown);
  quad.frustumCulled = false;
  const qscene = new THREE.Scene();
  qscene.add(quad);
  const qcam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const pass = (mat, target) => {
    quad.material = mat;
    renderer.setRenderTarget(target);
    renderer.render(qscene, qcam);
  };

  function post(t, frame, look) {
    // bloom pyramid
    let src = acc;
    for (let l = 0; l < LV; l++) {
      mDown.uniforms.tSrc.value = src.texture;
      mDown.uniforms.uTexel.value.set(1 / src.width, 1 / src.height);
      mDown.uniforms.uFirst.value = l === 0 ? 1 : 0;
      pass(mDown, down[l]);
      src = down[l];
    }
    let low = down[LV - 1];
    for (let l = LV - 2; l >= 0; l--) {
      mUp.uniforms.tLow.value = low.texture;
      mUp.uniforms.tHere.value = down[l].texture;
      mUp.uniforms.uTexel.value.set(1 / low.width, 1 / low.height);
      mUp.uniforms.uRadius.value = 1.0;
      mUp.uniforms.uMix.value = 0.85;
      pass(mUp, up[l]);
      low = up[l];
    }
    // anamorphic streak from the quarter level
    let s0 = down[1];
    const spreads = [1.5, 4.5, 13.5];
    spreads.forEach((sp, k) => {
      mStreak.uniforms.tSrc.value = s0.texture;
      mStreak.uniforms.uTexel.value.set(1 / s0.width, 1 / s0.height);
      mStreak.uniforms.uSpread.value = sp;
      const dst = k % 2 === 0 ? sA : sB;
      pass(mStreak, dst);
      s0 = dst;
    });
    mComp.uniforms.tStreak.value = s0.texture;
    const U = mComp.uniforms;
    U.uExposure.value = look.exposure;
    U.uBloom.value = look.bloom * 0.26;
    U.uStreak.value = look.streak * 0.22;
    U.uCA.value = look.ca;
    U.uGlitch.value = look.glitch;
    U.uFrame.value = frame;
    U.uFlash.value = look.flash;
    U.uSat.value = look.sat;
    U.uVig.value = look.vig;
    U.uFade.value = look.fade;
    U.uGrain.value = look.grain;
    U.uHaze.value.set(0.35 * look.haze, 0.5 * look.haze, look.haze * 1.6);
    U.uHazeC.value.set(look.hazeC[0], 1 - look.hazeC[1]);
    if (look.shock) {
      let c = [0.5, 0.5];
      if (look.shock.at === 'merge') c = uvOf(field.M);
      if (look.shock.at === 'glyph') {
        const [gl, gt, gs] = L.glyph;
        c = [(gl + 14 * gs) / W, 1 - (gt + 10 * gs) / H];
      }
      U.uShock.value.set(c[0], c[1], look.shock.r, look.shock.a);
    } else U.uShock.value.set(0.5, 0.5, 0, 0);
    pass(mComp, null);
  }

  const v3 = new THREE.Vector3();
  function uvOf(p) {
    v3.set(p[0], p[1], p[2]).project(cam);
    return [(v3.x + 1) / 2, (v3.y + 1) / 2];
  }
  // screen px + scale (px per world unit) + depth, for DOM overlays
  function screen(p) {
    v3.set(p[0], p[1], p[2]);
    v3.applyMatrix4(cam.matrixWorldInverse);
    const depth = -v3.z;
    v3.applyMatrix4(cam.projectionMatrix);
    const ppu = (H / 2) * cam.projectionMatrix.elements[5] / Math.max(depth, 1);
    return { x: ((v3.x + 1) / 2) * W, y: ((1 - v3.y) / 2) * H, depth, ppu, on: depth > 1 };
  }

  // anchors for overlays
  const tagStrands = [];
  field.S.forEach((s, i) => {
    if (tagStrands.length < 14 && s.birth <= 1.3 && Math.abs(s.C[0]) < 1150 && Math.abs(s.C[1]) < 620 && s.C[2] > -1500 && s.C[2] < 200) tagStrands.push(i);
  });

  const lastCut = (t) => {
    let c = 0;
    for (const x of CUTS) if (x <= t + 1e-6) c = x;
    return c;
  };

  function render(t) {
    const look = gradeAt(t);
    const frame = Math.round(t * 30);
    const K = look.K;
    const cut = lastCut(t);
    smat.uniforms.uWeight.value = 1 / K;
    dmat.uniforms.uWeight.value = 1 / K;
    renderer.setRenderTarget(acc);
    renderer.setClearColor(0x000000, 1);
    renderer.clear(true, false, false);
    for (let k = 0; k < K; k++) {
      let ts = t - (look.shutter * (K - 1 - k)) / Math.max(1, K - 1);
      if (ts < cut) ts = cut;
      if (ts < 0) ts = 0;
      field.fill(ts, t);
      posTex.needsUpdate = true;
      colTex.needsUpdate = true;
      fillDots(ts, t);
      setCam(ts);
      renderer.setRenderTarget(acc);
      renderer.render(scene, cam);
    }
    post(t, frame, look);
    // overlay anchors at exactly t (field + camera were last evaluated at t)
    const H4 = field.heads;
    const tags = tagStrands.map((i) => ({ ...screen([H4[i * 4], H4[i * 4 + 1], H4[i * 4 + 2]]), I: H4[i * 4 + 3] }));
    const labels = field.graph.centres.map((id) => screen(field.nodeAt(id, t, [0, 0, 0])));
    const stations = stationX.map((dx) => screen([field.M[0] + dx, field.M[1], field.M[2]]));
    const ftags = t >= T.drop - 0.1 && t < T.graph + 0.1 ? funnelTags(t) : null;
    return { tags, ftags, labels, stations, agent: screen(field.agentPos(t)), merge: screen(field.M), hub: screen(G) };
  }

  // funnel tag anchors: points riding the combed strands toward the hub
  const ftag = [];
  {
    const RF = rng(5150);
    for (let k = 0; k < 16; k++) ftag.push({ a: (k / 16) * TAU + RF() * 0.3, R: 520 + RF() * 900, z: -700 - k * 190 - RF() * 120 });
  }
  function funnelTags(t) {
    return ftag.map((f) => {
      const u = inv(1800, G[2], f.z);
      const kk = Math.pow(smooth(0.3, 1.0, u), 1.15);
      const r = f.R * (1 - kk * 0.8);
      const p = [G[0] + r * Math.cos(f.a), G[1] + r * Math.sin(f.a), f.z + 260 * (t - T.drop)];
      return screen(p);
    });
  }

  return { render, funnelTags, W, H, info: () => ({ gl: renderer.getContext().getParameter(renderer.getContext().VERSION), r: renderer.getContext().getParameter(renderer.getContext().RENDERER), nB }) };
}
