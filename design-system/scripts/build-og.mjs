// Regenerates site/assets/og.png — the 1200×630 social share card.
// Requires a Chromium binary (CHROMIUM_PATH env or the Playwright default
// /opt/pw-browsers/chromium) and the playwright-core package. The rendered
// PNG is committed, so this only needs to run when the card design changes.
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const b64 = f => readFileSync(`src/fonts/${f}`).toString('base64')

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Schibsted Grotesk'; font-weight: 400 900; src: url('data:font/woff2;base64,${b64('schibsted-grotesk-1.woff2')}') format('woff2'); }
@font-face { font-family: 'Geist Mono'; font-weight: 100 900; src: url('data:font/woff2;base64,${b64('geist-mono-0.woff2')}') format('woff2'); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #101013; color: #F4F4F2; font-family: 'Schibsted Grotesk', sans-serif; padding: 56px 80px 48px; overflow: hidden; position: relative; }
.logo { display: flex; align-items: center; gap: 14px; font-size: 34px; font-weight: 700; letter-spacing: -0.02em; }
h1 { position: absolute; top: 178px; left: 80px; font-size: 84px; font-weight: 700; letter-spacing: -0.035em; line-height: 0.98; }
h1 em { font-style: normal; color: #3D5FFF; }
.tag { position: absolute; left: 80px; bottom: 52px; font-family: 'Geist Mono', monospace; font-size: 18px; letter-spacing: 0.14em; text-transform: uppercase; color: #8F8F98; }
svg.art { position: absolute; right: -40px; top: 90px; width: 560px; opacity: 0.9; }
</style></head><body>
<div class="logo">
  <svg width="56" height="40" viewBox="0 0 28 20" fill="none">
    <path d="M0 3 C8 3, 10 10, 16 10" stroke="#F4F4F2" stroke-width="1.4"/>
    <path d="M0 10 L16 10" stroke="#F4F4F2" stroke-width="1.4"/>
    <path d="M0 17 C8 17, 10 10, 16 10" stroke="#F4F4F2" stroke-width="1.4"/>
    <path d="M16 10 L28 10" stroke="#3D5FFF" stroke-width="3" stroke-linecap="round"/>
  </svg>
  datalith
</div>
<svg class="art" viewBox="0 0 560 340" fill="none">
  ${[22, 101, 180, 259, 318].map(y => `<path d="M0 ${y} C 150 ${y}, 250 170, 392 170" stroke="#F4F4F2" stroke-width="1" opacity="0.45"/>`).join('')}
  <path d="M392 170 L560 170" stroke="#3D5FFF" stroke-width="6" stroke-linecap="round"/>
  <circle cx="392" cy="170" r="6" fill="#3D5FFF"/>
</svg>
<h1>Every source.<br>One graph.<br><em>Agent-ready.</em></h1>
<div class="tag">datalith · the agentic data center</div>
</body></html>`

const dir = mkdtempSync(join(tmpdir(), 'dl-og-'))
const file = join(dir, 'og.html')
writeFileSync(file, html)

const { chromium } = await import('playwright-core')
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(`file://${file}`)
await page.waitForTimeout(400)
await page.screenshot({ path: 'site/assets/og.png' })
await browser.close()
console.log('wrote site/assets/og.png')
