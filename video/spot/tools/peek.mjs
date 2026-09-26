// Peek: seek the composition to given times in headless Chromium (SwiftShader WebGL, like the renderer)
// and save a PNG per time, plus an optional contact sheet.
// usage: node tools/peek.mjs [--html index.html] [--out peek] [--scale 0.5] [--sheet name] t1 t2 ...
import { chromium } from 'playwright-core';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = { html: 'index.html', out: 'peek', scale: 0.5, sheet: '', cols: 4, label: 1 };
const times = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith('--')) opt[a.slice(2)] = args[++i];
  else times.push(...a.split(',').filter(Boolean).map(Number));
}
const outDir = resolve(root, opt.out);
mkdirSync(outDir, { recursive: true });
const exe = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browser = await chromium.launch({
  executablePath: existsSync(exe) ? exe : undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'],
});
const htmlPath = resolve(root, opt.html);
const src = readFileSync(htmlPath, 'utf8');
const vp = { width: +(src.match(/data-width="(\d+)"/) || [0, 1920])[1], height: +(src.match(/data-height="(\d+)"/) || [0, 1080])[1] };
const page = await browser.newPage({ viewport: vp, deviceScaleFactor: +opt.scale });
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[page]', m.type(), m.text()); });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto('file://' + htmlPath);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const files = [];
for (const t of times) {
  const ms = await page.evaluate((t) => {
    const t0 = performance.now();
    const tl = window.__timelines.main;
    tl.seek(t, false);
    document.querySelectorAll('[data-start]').forEach((el) => {
      if (el.id === 'root') return;
      const s = +el.dataset.start, d = +el.dataset.duration;
      el.style.visibility = t >= s && t < s + d ? 'visible' : 'hidden';
    });
    return performance.now() - t0;
  }, t);
  await page.waitForTimeout(40);
  const f = resolve(outDir, `p-${t.toFixed(2).padStart(5, '0')}.png`);
  await page.screenshot({ path: f });
  files.push(f);
  console.log(`t=${t.toFixed(2)}  seek+render ${ms.toFixed(0)} ms`);
}
await browser.close();
if (opt.sheet && files.length) {
  const w = Math.round(vp.width * +opt.scale);
  const tw = Math.min(+opt.cols >= 4 ? 480 : 640, w);
  execFileSync('python3', [resolve(root, 'tools/sheet.py'), resolve(outDir, opt.sheet + '.png'), String(opt.cols), String(tw), ...files.map((f, k) => `${f}::${times[k].toFixed(2)}s`)], { stdio: 'inherit' });
}
