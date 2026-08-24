// Pre-renders site/pages/* to the production website in ../website/:
// one static HTML file per page plus shared assets (css, js, fonts, brand),
// sitemap.xml, robots.txt and a .nojekyll marker for GitHub Pages.
// Animations are progressive enhancement in assets/site.js — every page is
// complete and readable with JavaScript disabled.
import { build } from 'esbuild'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const BASE_URL = 'https://ghazigh.github.io/AI_Data'
const OUT = '../website'

await build({
  entryPoints: ['site/pages/index.ts'],
  outfile: 'dist-site/pages.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.css': 'empty' },
})

const { PAGES } = await import(pathToFileURL('dist-site/pages.mjs'))
const { createElement } = await import('react')
const { renderToStaticMarkup } = await import('react-dom/server')

// ---- assets -----------------------------------------------------------
// Deletes the whole website/ tree, including website/demo/ which build-demo.mjs
// writes. Always run build:site BEFORE build:demo — `npm run build:all` does
// this in the right order. Running build:site alone ships a site with no demo.
rmSync(OUT, { recursive: true, force: true })
mkdirSync(`${OUT}/assets/fonts`, { recursive: true })

const fonts = readFileSync('src/fonts/fonts.css', 'utf8')
  .replace(/url\('\.\/([^']+\.woff2)'\)/g, "url('./fonts/$1')")
for (const f of ['geist-0.woff2', 'geist-mono-0.woff2', 'schibsted-grotesk-1.woff2', 'schibsted-grotesk-italic-0.woff2']) {
  cpSync(`src/fonts/${f}`, `${OUT}/assets/fonts/${f}`)
}
const tokens = readFileSync('src/tokens.css', 'utf8')
const styles = readFileSync('src/styles.css', 'utf8')
  .replace(`@import './fonts/fonts.css';`, '')
  .replace(`@import './tokens.css';`, '')
const siteCss = readFileSync('site/site.css', 'utf8')
// The console shot on Home and Platform is the demo, server-rendered into the
// page (see site/components/ConsoleFigure.tsx), so the demo's own stylesheet
// ships with the site. Every rule in it is scoped under .dm-*, and .st-console
// in site.css neutralises the two viewport-sized rules the shell sets.
const demoCss = readFileSync('demo/demo.css', 'utf8')
writeFileSync(`${OUT}/assets/site.css`, `${fonts}\n${tokens}\n${styles}\n${siteCss}\n${demoCss}\nhtml, body { margin: 0; background: var(--dl-canvas); }\nhtml { scroll-behavior: smooth; }\n@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }\n`)

cpSync('site/site.js', `${OUT}/assets/site.js`)

// ---- stage 04's live graph ---------------------------------------------
// The one piece of React the marketing site ships to a browser: the same 3D
// knowledge graph the demo draws, mounted into the stage 04 figure. ESM with
// splitting rather than one file, exactly as the demo bundles it — three, r3f
// and drei are a megabyte, and they belong in a chunk that is fetched only
// after the island has confirmed the browser can render the scene, never in
// the bundle every visitor to the home page downloads.
await build({
  entryPoints: [{ in: 'site/graph-boot.ts', out: 'graph' }],
  outdir: `${OUT}/assets`,
  bundle: true,
  format: 'esm',
  splitting: true,
  platform: 'browser',
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
})
cpSync('site/assets/favicon.svg', `${OUT}/assets/favicon.svg`)
cpSync('site/assets/logo-mark.svg', `${OUT}/assets/logo-mark.svg`)
if (existsSync('site/assets/og.png')) cpSync('site/assets/og.png', `${OUT}/assets/og.png`)

// investor deck download
mkdirSync(`${OUT}/deck`, { recursive: true })
cpSync('../deck/Datalith-Pitch-Deck.pptx', `${OUT}/deck/Datalith-Pitch-Deck.pptx`)

// ---- pages ------------------------------------------------------------
const ORG_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Datalith',
  description: 'The Agentic Data Center — every source, one graph, agent-ready.',
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/assets/favicon.svg`,
  email: 'hello@datalith.ai',
  slogan: 'Every source. One graph. Agent-ready.',
})

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Inline script for the 404 page only: a pipeline created in a demo session
// exists only in that browser's state (see demo/state.tsx's createdPipelines),
// so a hard refresh on its /demo/pipelines/<id>/ URL is a path GitHub Pages
// never wrote a file for, and Pages serves this 404 page for it. Without this
// script that operator lands on a plain not-found page for a pipeline that,
// from their point of view, genuinely exists; this sends them back to the
// list page instead, where every pipeline (created or catalogue) is listed.
// No hydration, no React — this runs before any bundle would load.
const PIPELINES_REDIRECT = `<script>
(function () {
  var marker = '/demo/pipelines/';
  var i = location.pathname.indexOf(marker);
  if (i !== -1) {
    location.replace(location.origin + location.pathname.slice(0, i + marker.length));
  }
})();
</script>
`

for (const page of PAGES) {
  const body = renderToStaticMarkup(createElement(page.Component))
  const path = page.slug === 'index' ? '' : `${page.slug}.html`
  const canonical = `${BASE_URL}/${path}`
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#FCFCFB">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Datalith">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${BASE_URL}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${BASE_URL}/assets/og.png">
<link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">
<link rel="stylesheet" href="./assets/site.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">${ORG_JSONLD}</script>
</head>
<body>
${body}
${page.slug === '404' ? PIPELINES_REDIRECT : ''}<script src="./assets/site.js" defer></script>
${page.slug === 'index' || page.slug === 'banking' ? '<script type="module" src="./assets/graph.js"></script>' : ''}
</body>
</html>
`
  writeFileSync(`${OUT}/${page.slug}.html`, html)
  console.log(`wrote ${OUT}/${page.slug}.html (${Math.round(html.length / 1024)} KB)`)
}

// ---- sitemap, robots, pages plumbing ----------------------------------
const today = new Date().toISOString().slice(0, 10)
const urls = PAGES.filter(p => !p.noindex)
  .map(p => `  <url><loc>${BASE_URL}/${p.slug === 'index' ? '' : `${p.slug}.html`}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')
const demoUrl = `  <url><loc>${BASE_URL}/demo/</loc><lastmod>${today}</lastmod></url>`
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n${demoUrl}\n</urlset>\n`)
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`)
writeFileSync(`${OUT}/.nojekyll`, '')
console.log(`wrote sitemap.xml, robots.txt, .nojekyll — site ready in ${OUT}/`)
