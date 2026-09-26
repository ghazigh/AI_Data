// GLSL for the strand world. All shaders are WebGL2 (GLSL ES 3.00), raw — nothing injected by three.

const HEAD = /* glsl */ `
precision highp float;
precision highp int;
precision highp sampler2D;
`;

// ---------- strands: screen-space ribbons extruded from a texture of points ----------
export const strandVert = HEAD + /* glsl */ `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform sampler2D uPos;   // xyz, intensity
uniform sampler2D uCol;   // rgb, width (world units)
uniform vec2 uRes;
uniform float uWeight;
uniform int uNP;
uniform float uFocus;     // focus distance (view depth)
uniform float uAperture;  // circle of confusion scale, px
in vec3 position;          // (point index, strand index, side)
out vec3 vCol;
out float vAcross;
out float vHalf;
out float vI;
out float vSoft;
void main() {
  int j = int(position.x + 0.5);
  int i = int(position.y + 0.5);
  float side = position.z;
  vec4 P  = texelFetch(uPos, ivec2(j, i), 0);
  vec4 Pp = texelFetch(uPos, ivec2(max(j - 1, 0), i), 0);
  vec4 Pn = texelFetch(uPos, ivec2(min(j + 1, uNP - 1), i), 0);
  vec4 C  = texelFetch(uCol, ivec2(j, i), 0);
  mat4 PV = projectionMatrix * viewMatrix;
  vec4 c  = PV * vec4(P.xyz, 1.0);
  vec4 cp = PV * vec4(Pp.xyz, 1.0);
  vec4 cn = PV * vec4(Pn.xyz, 1.0);
  vec2 hr = 0.5 * uRes;
  vec2 s  = c.xy / max(c.w, 1e-3);
  vec2 sp = cp.xy / max(cp.w, 1e-3);
  vec2 sn = cn.xy / max(cn.w, 1e-3);
  vec2 d = (sn - sp) * hr;
  float dl = length(d);
  vec2 dir = dl > 1e-4 ? d / dl : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float wpx = C.w * projectionMatrix[1][1] * hr.y / max(c.w, 1e-3);
  float minW = 1.15;
  float coc = uAperture * abs(1.0 - uFocus / max(c.w, 1.0));
  float ws = clamp(wpx, minW, 26.0);
  float wt = min(sqrt(ws * ws + coc * coc), 64.0);
  float energy = clamp(wpx / minW, 0.0, 1.0) * (ws / wt);
  float hw = 0.5 * wt + 1.35;
  c.xy += nrm * side * hw / hr * c.w;
  gl_Position = c;
  float nearFade = smoothstep(25.0, 170.0, c.w) * smoothstep(1e-4, 0.02, min(min(cp.w, cn.w), c.w));
  if (c.w < 2.0 || P.w <= 0.0) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);
  vAcross = side * hw;
  vHalf = 0.5 * wt;
  vSoft = clamp(coc / (ws + coc + 1e-3), 0.0, 1.0);
  vI = P.w * energy * nearFade * uWeight;
  vCol = C.rgb;
}`;

export const strandFrag = HEAD + /* glsl */ `
in vec3 vCol;
in float vAcross;
in float vHalf;
in float vI;
in float vSoft;
out vec4 outColor;
void main() {
  float a = abs(vAcross);
  float edge = clamp(vHalf + 0.6 - a, 0.0, 1.0);
  float glow = exp(-a * a / (2.0 * (vHalf + 0.9) * (vHalf + 0.9)));
  float sig = vHalf * 0.55 + 0.6;
  float soft = exp(-a * a / (2.0 * sig * sig)) * 1.05;
  float k = mix(edge * 0.72 + glow * 0.42, soft, vSoft);
  outColor = vec4(vCol * vI * k, 1.0);
}`;

// ---------- billboards: sparks, graph nodes, dust ----------
export const dotVert = HEAD + /* glsl */ `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform vec2 uRes;
uniform float uWeight;
uniform float uFocus;
uniform float uAperture;
in vec3 position;   // quad corner
in vec3 iPos;
in vec4 iCol;       // rgb, intensity
in vec2 iSize;      // world radius, kind (0 spark, 1 node, 2 dust)
out vec2 vUV;
out vec3 vCol;
out float vI;
out float vKind;
out float vExt;
out float vSoft;
void main() {
  vec4 c = projectionMatrix * viewMatrix * vec4(iPos, 1.0);
  vec2 hr = 0.5 * uRes;
  float kind = iSize.y;
  float rpx = iSize.x * projectionMatrix[1][1] * hr.y / max(c.w, 1.0);
  float minR = kind > 1.5 ? 0.8 : 1.1;
  float energy = clamp(rpx / minR, 0.0, 1.0);
  energy *= energy;
  float rs = max(rpx, minR);
  float coc = 0.5 * uAperture * abs(1.0 - uFocus / max(c.w, 1.0));
  float r = min(sqrt(rs * rs + coc * coc), 48.0);
  energy *= (rs * rs) / (r * r);
  float ext = kind > 1.5 ? 2.2 : (kind > 0.5 ? 4.5 : 7.0);
  c.xy += position.xy * r * ext / hr * c.w;
  gl_Position = c;
  if (c.w < 4.0 || iCol.a <= 0.0) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);
  vUV = position.xy * ext;
  vExt = ext;
  vSoft = clamp(coc / (rs + coc + 1e-3), 0.0, 1.0);
  vCol = iCol.rgb;
  vI = iCol.a * energy * uWeight * smoothstep(15.0, 140.0, c.w);
  vKind = kind;
}`;

export const dotFrag = HEAD + /* glsl */ `
in vec2 vUV;
in vec3 vCol;
in float vI;
in float vKind;
in float vExt;
in float vSoft;
out vec4 outColor;
void main() {
  float d = length(vUV);
  float k;
  if (vKind > 1.5) {
    k = smoothstep(1.2, 0.0, d);
  } else {
    float core = mix(smoothstep(1.0, 0.72, d), exp(-d * d * 1.2), vSoft);
    float glow = exp(-d * d * 0.28) * 0.55 + 0.05 / (0.05 + d * d * 0.06);
    float ring = vKind > 0.5 ? exp(-pow((d - 2.05) * 5.0, 2.0)) * 0.85 * (1.0 - vSoft) : 0.0;
    k = core * 1.3 + glow * 0.5 + ring;
  }
  k *= smoothstep(vExt, vExt * 0.55, d);
  outColor = vec4(vCol * vI * k, 1.0);
}`;

// ---------- post ----------
export const quadVert = HEAD + /* glsl */ `
in vec3 position;
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

// 13-tap downsample (Jimenez 2014), with a Karis average on the first pass to kill fireflies
export const downFrag = HEAD + /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uFirst;
in vec2 vUv;
out vec4 outColor;
vec3 S(vec2 o) { return texture(tSrc, vUv + o * uTexel).rgb; }
float w(vec3 c) { return 1.0 / (1.0 + dot(c, vec3(0.2126, 0.7152, 0.0722)) * uFirst); }
void main() {
  vec3 a = S(vec2(-2.0, 2.0)), b = S(vec2(0.0, 2.0)), c = S(vec2(2.0, 2.0));
  vec3 d = S(vec2(-2.0, 0.0)), e = S(vec2(0.0, 0.0)), f = S(vec2(2.0, 0.0));
  vec3 g = S(vec2(-2.0, -2.0)), h = S(vec2(0.0, -2.0)), i = S(vec2(2.0, -2.0));
  vec3 j = S(vec2(-1.0, 1.0)), k = S(vec2(1.0, 1.0)), l = S(vec2(-1.0, -1.0)), m = S(vec2(1.0, -1.0));
  vec3 g0 = (a + b + d + e) * 0.25, g1 = (b + c + e + f) * 0.25, g2 = (d + e + g + h) * 0.25, g3 = (e + f + h + i) * 0.25, g4 = (j + k + l + m) * 0.25;
  float w0 = w(g0), w1 = w(g1), w2 = w(g2), w3 = w(g3), w4 = w(g4);
  vec3 o = (g0 * w0 * 0.125 + g1 * w1 * 0.125 + g2 * w2 * 0.125 + g3 * w3 * 0.125 + g4 * w4 * 0.5) /
           (w0 * 0.125 + w1 * 0.125 + w2 * 0.125 + w3 * 0.125 + w4 * 0.5);
  outColor = vec4(o, 1.0);
}`;

// tent upsample of the smaller level, added onto this level's downsample
export const upFrag = HEAD + /* glsl */ `
uniform sampler2D tLow;
uniform sampler2D tHere;
uniform vec2 uTexel;     // texel of tLow
uniform float uRadius;
uniform float uMix;
in vec2 vUv;
out vec4 outColor;
vec3 L(vec2 o) { return texture(tLow, vUv + o * uTexel * uRadius).rgb; }
void main() {
  vec3 up = (L(vec2(-1.0, 1.0)) + L(vec2(1.0, 1.0)) + L(vec2(-1.0, -1.0)) + L(vec2(1.0, -1.0))) +
            (L(vec2(0.0, 1.0)) + L(vec2(-1.0, 0.0)) + L(vec2(1.0, 0.0)) + L(vec2(0.0, -1.0))) * 2.0 +
            L(vec2(0.0)) * 4.0;
  up /= 16.0;
  outColor = vec4(texture(tHere, vUv).rgb + up * uMix, 1.0);
}`;

// horizontal-only blur for the anamorphic streak
export const streakFrag = HEAD + /* glsl */ `
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uSpread;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec3 acc = vec3(0.0);
  float ws = 0.0;
  for (int k = -7; k <= 7; k++) {
    float x = float(k);
    float w = exp(-x * x / 18.0);
    acc += texture(tSrc, vUv + vec2(x * uSpread * uTexel.x, 0.0)).rgb * w;
    ws += w;
  }
  outColor = vec4(acc / ws, 1.0);
}`;

export const compFrag = HEAD + /* glsl */ `
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform sampler2D tStreak;
uniform vec2 uRes;
uniform float uExposure;
uniform float uBloom;
uniform float uStreak;
uniform float uCA;
uniform float uGlitch;
uniform float uFrame;
uniform vec4 uShock;     // x, y (uv), radius (in height units), amount
uniform float uFlash;
uniform float uSat;
uniform float uVig;
uniform float uFade;
uniform float uGrain;
uniform vec3 uInk;       // background, display sRGB
uniform vec3 uHaze;      // a faint lift behind the action, display sRGB
uniform vec2 uHazeC;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
const mat3 ACESIn = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
const mat3 ACESOut = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
vec3 aces(vec3 c) {
  c = ACESIn * c;
  vec3 a = c * (c + 0.0245786) - 0.000090537;
  vec3 b = c * (0.983729 * c + 0.4329510) + 0.238081;
  return clamp(ACESOut * (a / b), 0.0, 1.0);
}
vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
vec3 sceneAt(vec2 uv) {
  return texture(tScene, uv).rgb + texture(tBloom, uv).rgb * uBloom + texture(tStreak, uv).rgb * uStreak;
}
void main() {
  vec2 uv = vUv;
  float asp = uRes.x / uRes.y;
  // shockwave: a refracting ring
  vec2 q = (uv - uShock.xy) * vec2(asp, 1.0);
  float r = length(q);
  float ring = exp(-pow((r - uShock.z) / 0.045, 2.0));
  uv -= (r > 1e-4 ? q / r : vec2(0.0)) / vec2(asp, 1.0) * ring * uShock.w * 0.035;
  // glitch: horizontal slices jump, colour splits
  float gRow = floor(uv.y * 23.0);
  float gh = hash(vec2(gRow, uFrame));
  if (uGlitch > 0.0 && gh < uGlitch * 0.4) uv.x += (hash(vec2(gRow + 7.0, uFrame)) - 0.5) * 0.09 * uGlitch;
  // chromatic aberration grows toward the edges
  vec2 dc = uv - 0.5;
  float ca = uCA * 0.006 * (0.25 + dot(dc, dc) * 3.0) + uGlitch * 0.006;
  vec3 col;
  col.r = sceneAt(uv + dc * ca * 1.0).r;
  col.g = sceneAt(uv).g;
  col.b = sceneAt(uv - dc * ca * 1.0).b;
  col = col * uExposure;
  col += ring * uShock.w * 0.025;
  vec3 light = aces(col);
  float l = dot(light, vec3(0.2126, 0.7152, 0.0722));
  light = mix(vec3(l), light, uSat);
  light = toSRGB(light);
  // background: brand ink, a faint haze where the action is
  vec2 hq = (vUv - uHazeC) * vec2(asp, 1.0);
  vec3 bg = uInk + uHaze * exp(-dot(hq, hq) * 1.6);
  vec3 o = 1.0 - (1.0 - bg) * (1.0 - light);
  o += uFlash;
  // vignette
  vec2 vq = (vUv - 0.5) * vec2(asp, 1.0) * 0.9;
  o *= mix(1.0, smoothstep(1.05, 0.2, length(vq)), uVig);
  o = mix(o, uInk, uFade);
  // grain + dither
  float n = hash(vUv * uRes + fract(uFrame * 0.618) * 913.0) + hash(vUv * uRes * 1.37 + uFrame * 1.7) - 1.0;
  o += n * uGrain;
  o += (hash(vUv * uRes + 3.7) - 0.5) / 255.0;
  outColor = vec4(clamp(o, 0.0, 1.0), 1.0);
}`;
