// Pre-renders demo/screens/* into website/demo/: one directory per screen, each
// with a complete server-rendered index.html, plus a client bundle that hydrates
// and takes over navigation. Mirrors scripts/build-site.mjs — read that first.
import { build } from 'esbuild'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const BASE_URL = 'https://ghazigh.github.io/AI_Data'
const OUT = '../website/demo'

// ---- 1. server bundle: routes + app, rendered by this script --------------
await build({
  entryPoints: ['demo/DemoApp.tsx'],
  outfile: 'dist-site/demo-app.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.css': 'empty' },
})

// ---- 2. client bundle: hydrates the same component tree ------------------
rmSync(OUT, { recursive: true, force: true })
mkdirSync(`${OUT}/assets`, { recursive: true })

await build({
  entryPoints: ['demo/client.tsx'],
  outfile: `${OUT}/assets/demo.js`,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
})

// ---- 3. stylesheet: fonts + tokens + demo css ---------------------------
const fonts = readFileSync('src/fonts/fonts.css', 'utf8')
  .replace(/url\('\.\/([^']+\.woff2)'\)/g, "url('./fonts/$1')")
mkdirSync(`${OUT}/assets/fonts`, { recursive: true })
for (const f of ['geist-0.woff2', 'geist-mono-0.woff2', 'schibsted-grotesk-1.woff2', 'schibsted-grotesk-italic-0.woff2']) {
  cpSync(`src/fonts/${f}`, `${OUT}/assets/fonts/${f}`)
}
writeFileSync(
  `${OUT}/assets/demo.css`,
  [fonts, readFileSync('src/tokens.css', 'utf8'), readFileSync('demo/demo.css', 'utf8'),
   'html, body { margin: 0; background: var(--dl-canvas); }'].join('\n'),
)
cpSync('site/assets/favicon.svg', `${OUT}/assets/favicon.svg`)

// ---- 4. one server-rendered file per route -------------------------------
const { ROUTES, DemoApp, titleFor } = await import(pathToFileURL('dist-site/demo-app.mjs'))
const { createElement } = await import('react')
const { renderToString } = await import('react-dom/server')

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const route of ROUTES) {
  const nested = route.slug !== ''
  const prefix = nested ? '../' : ''
  const dir = nested ? `${OUT}/${route.slug}` : OUT
  mkdirSync(dir, { recursive: true })

  const body = renderToString(createElement(DemoApp, { slug: route.slug, prefix }))
  const title = titleFor(route.slug)

  writeFileSync(`${dir}/index.html`, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1280">
<title>${esc(title)}</title>
<meta name="description" content="Explore the Datalith platform with a fully populated sample estate — readiness scores, the knowledge graph, governed serving and the agent use cases the data supports.">
${nested ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${BASE_URL}/demo/">`}
<meta name="theme-color" content="#FCFCFB">
<link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg">
<link rel="stylesheet" href="${prefix}assets/demo.css">
</head>
<body>
<div id="dm-app" data-slug="${route.slug}">${body}</div>
<script src="${prefix}assets/demo.js" defer></script>
</body>
</html>
`)
  console.log(`wrote ${dir}/index.html`)
}
console.log(`demo ready in ${OUT}/`)
