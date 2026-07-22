# Datalith "Confluence" Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `@datalith/ui` — a React + TypeScript component library in `design-system/` encoding the Confluence identity (spec: `docs/superpowers/specs/2026-07-22-datalith-design-system-design.md`), ready for /design-sync package-shape sync.

**Architecture:** Plain React 18 function components, one file per component, styled by vanilla CSS classes (`dl-` prefix) driven by design-token custom properties. Self-hosted variable woff2 fonts. tsup (esbuild) builds ESM+CJS+d.ts to `dist/`; a copy script places `styles.css`, `tokens.css`, and `fonts/` alongside. Vitest + testing-library render tests per batch.

**Tech Stack:** React 18 (peer), TypeScript strict, tsup, vitest + @testing-library/react + jsdom, npm.

## Global Constraints

- Package name `@datalith/ui`, directory `design-system/`, Node ≥ 18, npm with committed `package-lock.json`.
- No runtime deps beyond `react`/`react-dom` peers. No CSS frameworks, no CSS-in-JS.
- Class prefix `dl-`; tokens exactly as in spec §2.1 (`--dl-canvas #FCFCFB`, `--dl-paper #FFFFFF`, `--dl-ink #101013`, `--dl-blue #0031E3`, `--dl-blue-wash #EEF1FE`, `--dl-grey-1 #F1F1EE`, `--dl-grey-2 #E4E4E0`, `--dl-grey-3 #9A9AA2`, `--dl-grey-4 #6D6D76`, `--dl-ink-2 #1A1A1E`, `--dl-on-ink #F4F4F2`, `--dl-on-ink-muted #8F8F98`, `--dl-ok #1E7A46`, `--dl-warn #B7791F`, dark-section blue `#3D5FFF`).
- Fonts: Schibsted Grotesk (display), Geist (body), Geist Mono (mono) — self-hosted woff2, `@font-face` in `src/fonts/fonts.css`. Never load from Google at runtime.
- Shape rules: buttons pill (999px); cards/surfaces sharp (0); 1px `--dl-grey-2` hairlines; transitions 0.18s ease; `prefers-reduced-motion` respected.
- Every component: typed props + JSDoc, sensible defaults with real Datalith copy, visible focus (`outline: 2px solid var(--dl-blue); outline-offset: 2px`).
- Every component gets `src/examples/<Name>.example.tsx` exporting default JSX usage.
- Commit after each task with the trailer `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Package scaffold, tokens, fonts, build pipeline

**Files:**
- Create: `design-system/package.json`, `design-system/tsconfig.json`, `design-system/tsup.config.ts`, `design-system/vitest.config.ts`, `design-system/scripts/fetch-fonts.mjs`, `design-system/scripts/copy-assets.mjs`, `design-system/src/tokens.css`, `design-system/src/styles.css`, `design-system/src/index.ts`, `design-system/src/test/smoke.test.tsx`

**Interfaces:**
- Produces: npm scripts `build`, `typecheck`, `test`; `src/index.ts` as the export barrel later tasks append to; CSS layers `tokens.css` (variables) and `styles.css` (base + component styles, later tasks append); `src/fonts/fonts.css` with families `"Schibsted Grotesk"`, `"Geist"`, `"Geist Mono"`.

- [ ] **Step 1: Write config files**

`design-system/package.json`:
```json
{
  "name": "@datalith/ui",
  "version": "0.1.0",
  "description": "Datalith Confluence design system — every source, one graph, agent-ready.",
  "license": "UNLICENSED",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js", "require": "./dist/index.cjs" },
    "./styles.css": "./dist/styles.css",
    "./tokens.css": "./dist/tokens.css"
  },
  "files": ["dist"],
  "scripts": {
    "fonts": "node scripts/fetch-fonts.mjs",
    "build": "tsup && node scripts/copy-assets.mjs",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "peerDependencies": { "react": "^18 || ^19", "react-dom": "^18 || ^19" },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "jsdom": "^24.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tsup": "^8.1.0",
    "typescript": "^5.5.3",
    "vitest": "^2.0.3"
  }
}
```

`design-system/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

`design-system/tsup.config.ts`:
```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: false,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
})
```

`design-system/vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { environment: 'jsdom', globals: true },
})
```

`design-system/scripts/copy-assets.mjs`:
```js
import { cpSync, mkdirSync } from 'node:fs'
mkdirSync('dist/fonts', { recursive: true })
cpSync('src/tokens.css', 'dist/tokens.css')
cpSync('src/styles.css', 'dist/styles.css')
cpSync('src/fonts', 'dist/fonts', { recursive: true })
console.log('assets copied to dist/')
```

- [ ] **Step 2: Write the font fetcher**

`design-system/scripts/fetch-fonts.mjs` — downloads variable woff2 from Google Fonts (build-time only) and writes `src/fonts/fonts.css`:
```js
import { mkdirSync, writeFileSync } from 'node:fs'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
const FAMILIES = [
  { css: 'Schibsted+Grotesk:ital,wght@0,400..900;1,400..900', name: 'Schibsted Grotesk', file: 'schibsted-grotesk' },
  { css: 'Geist:wght@100..900', name: 'Geist', file: 'geist' },
  { css: 'Geist+Mono:wght@100..900', name: 'Geist Mono', file: 'geist-mono' },
]

mkdirSync('src/fonts', { recursive: true })
let out = '/* Generated by scripts/fetch-fonts.mjs — self-hosted, no runtime Google dependency */\n'

for (const fam of FAMILIES) {
  const cssResp = await fetch(`https://fonts.googleapis.com/css2?family=${fam.css}&display=swap`, { headers: { 'User-Agent': UA } })
  if (!cssResp.ok) throw new Error(`css2 fetch failed for ${fam.name}: ${cssResp.status}`)
  const css = await cssResp.text()
  // Take latin blocks only; each @font-face block has one url(...)
  const blocks = [...css.matchAll(/\/\* (latin(?:-ext)?) \*\/\s*(@font-face \{[\s\S]*?\})/g)]
  let i = 0
  for (const [, subset, block] of blocks) {
    if (subset !== 'latin') continue
    const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1]
    if (!url) continue
    const ital = /font-style:\s*italic/.test(block)
    const fname = `${fam.file}${ital ? '-italic' : ''}-${i++}.woff2`
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())
    writeFileSync(`src/fonts/${fname}`, buf)
    out += block.replace(/url\(https:[^)]+\.woff2\)/, `url('./${fname}')`) + '\n'
    console.log(`fetched ${fam.name}${ital ? ' italic' : ''} → src/fonts/${fname}`)
  }
}
writeFileSync('src/fonts/fonts.css', out)
console.log('wrote src/fonts/fonts.css')
```

- [ ] **Step 3: Write tokens.css**

`design-system/src/tokens.css`:
```css
:root {
  /* color */
  --dl-canvas: #FCFCFB;
  --dl-paper: #FFFFFF;
  --dl-ink: #101013;
  --dl-blue: #0031E3;
  --dl-blue-bright: #3D5FFF; /* blue on ink sections */
  --dl-blue-wash: #EEF1FE;
  --dl-grey-1: #F1F1EE;
  --dl-grey-2: #E4E4E0;
  --dl-grey-3: #9A9AA2;
  --dl-grey-4: #6D6D76;
  --dl-ink-2: #1A1A1E;
  --dl-on-ink: #F4F4F2;
  --dl-on-ink-muted: #8F8F98;
  --dl-ok: #1E7A46;
  --dl-warn: #B7791F;

  /* type */
  --dl-font-display: "Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif;
  --dl-font-body: "Geist", ui-sans-serif, system-ui, sans-serif;
  --dl-font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --dl-text-label: 0.75rem;   /* 12 */
  --dl-text-small: 0.875rem;  /* 14 */
  --dl-text-body: 1rem;       /* 16 */
  --dl-text-lead: 1.25rem;    /* 20 */
  --dl-text-h3: 1.75rem;      /* 28 */
  --dl-text-h2: 2.5rem;       /* 40 */
  --dl-text-h1: 3.5rem;       /* 56 */
  --dl-text-display: 4.5rem;  /* 72 */

  /* space */
  --dl-space-1: 4px; --dl-space-2: 8px; --dl-space-3: 12px; --dl-space-4: 16px;
  --dl-space-5: 24px; --dl-space-6: 32px; --dl-space-7: 48px; --dl-space-8: 64px;
  --dl-space-9: 96px; --dl-space-10: 128px;

  /* shape & motion */
  --dl-radius-pill: 999px;
  --dl-hairline: 1px solid var(--dl-grey-2);
  --dl-hairline-ink: 1px solid #2A2A30;
  --dl-ease: 0.18s ease;
  --dl-max-width: 1160px;
}
```

- [ ] **Step 4: Write styles.css base layer**

`design-system/src/styles.css` (component styles appended by later tasks at the marked sections):
```css
@import './fonts/fonts.css';
@import './tokens.css';

/* ===== base ===== */
.dl-root, .dl-root * , .dl-root *::before, .dl-root *::after { box-sizing: border-box; }
.dl-root {
  margin: 0;
  background: var(--dl-canvas);
  color: var(--dl-ink);
  font-family: var(--dl-font-body);
  font-size: var(--dl-text-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.dl-root ::selection { background: var(--dl-blue); color: #fff; }
.dl-wrap { max-width: var(--dl-max-width); margin: 0 auto; padding: 0 28px; }
.dl-root :is(a) { color: inherit; text-decoration: none; }
.dl-root :is(h1,h2,h3,h4,p,ul,ol,figure,blockquote) { margin: 0; }
.dl-root :is(ul,ol) { padding: 0; list-style: none; }
.dl-root :is(button,input) { font: inherit; }
.dl-root :is(a,button,input,summary):focus-visible { outline: 2px solid var(--dl-blue); outline-offset: 2px; }
.dl-on-ink :is(a,button,input,summary):focus-visible { outline-color: var(--dl-blue-bright); }
@media (prefers-reduced-motion: reduce) {
  .dl-root *, .dl-root *::before, .dl-root *::after { animation: none !important; transition: none !important; }
}

/* dark section base */
.dl-on-ink { background: var(--dl-ink); color: var(--dl-on-ink); }

/* ===== primitives (Task 2–3) ===== */

/* ===== signature (Task 4) ===== */

/* ===== sections (Task 5–7) ===== */
```

- [ ] **Step 5: Write the export barrel and smoke test**

`design-system/src/index.ts`:
```ts
// Components are appended by subsequent tasks.
export {}
```

`design-system/src/test/smoke.test.tsx`:
```tsx
import { render } from '@testing-library/react'

test('react renders under vitest', () => {
  const { getByText } = render(<div className="dl-root">datalith</div>)
  expect(getByText('datalith')).toBeTruthy()
})
```

- [ ] **Step 6: Install, fetch fonts, run all gates**

Run from `design-system/`:
```bash
npm install
npm run fonts
npm run test
npm run typecheck
npm run build
```
Expected: fonts land in `src/fonts/*.woff2` + `fonts.css` (6+ files: 2 families ×1 + Schibsted italic); test PASS; typecheck clean; `dist/` contains `index.js`, `index.cjs`, `index.d.ts`, `styles.css`, `tokens.css`, `fonts/`.

- [ ] **Step 7: Commit**

```bash
git add design-system .gitignore && git commit -m "feat(ds): scaffold @datalith/ui — tokens, fonts, build pipeline"
```
(Ensure repo `.gitignore` has `node_modules/` — it does. Do NOT ignore `design-system/dist` yet; leave dist untracked by adding `design-system/dist/` to `.gitignore` in this commit.)

---

### Task 2: Primitives I — Button, TextLink, Badge, SectionLabel

**Files:**
- Create: `design-system/src/components/Button.tsx`, `TextLink.tsx`, `Badge.tsx`, `SectionLabel.tsx`; `design-system/src/examples/Button.example.tsx`, `TextLink.example.tsx`, `Badge.example.tsx`, `SectionLabel.example.tsx`
- Modify: `design-system/src/index.ts`, `design-system/src/styles.css`
- Test: `design-system/src/test/primitives1.test.tsx`

**Interfaces:**
- Produces: `Button({ variant?: 'ink'|'blue'|'ghost', size?: 'sm'|'md'|'lg', href?, onClick?, type?, children })`, `TextLink({ href, children, arrow? })`, `Badge({ tone?: 'ink'|'blue'|'neutral'|'ok'|'warn', children })`, `SectionLabel({ children, rule?: boolean })`. Later sections consume Button and SectionLabel with exactly these prop names.

- [ ] **Step 1: Write failing tests**

`design-system/src/test/primitives1.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { Button, TextLink, Badge, SectionLabel } from '../index'

test('Button renders button by default, anchor with href, variant class applied', () => {
  const { getByRole, rerender } = render(<Button variant="blue">Run the audit</Button>)
  expect(getByRole('button').className).toContain('dl-btn--blue')
  rerender(<Button href="/audit">Run the audit</Button>)
  expect(getByRole('link').getAttribute('href')).toBe('/audit')
})

test('TextLink renders mono link with arrow', () => {
  const { getByRole } = render(<TextLink href="/method">the method</TextLink>)
  expect(getByRole('link').textContent).toContain('the method')
  expect(getByRole('link').textContent).toContain('→')
})

test('Badge applies tone class', () => {
  const { getByText } = render(<Badge tone="blue">MCP-native</Badge>)
  expect(getByText('MCP-native').className).toContain('dl-badge--blue')
})

test('SectionLabel renders uppercase mono eyebrow with rule by default', () => {
  const { getByText } = render(<SectionLabel>The platform</SectionLabel>)
  expect(getByText('The platform').className).toContain('dl-seclabel--rule')
})
```

- [ ] **Step 2: Run tests, verify failure**

Run: `npm run test` — Expected: FAIL (`Button` not exported).

- [ ] **Step 3: Implement components**

`design-system/src/components/Button.tsx`:
```tsx
import type { ReactNode, MouseEventHandler } from 'react'

export interface ButtonProps {
  /** Visual style: solid ink (default), solid Klein-blue, or hairline ghost. */
  variant?: 'ink' | 'blue' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  /** When set, renders an anchor instead of a button. */
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit'
  children: ReactNode
}

/** Pill call-to-action. Blue is the loudest voice on the page — use once per view. */
export function Button({ variant = 'ink', size = 'md', href, onClick, type = 'button', children }: ButtonProps) {
  const cls = `dl-btn dl-btn--${variant} dl-btn--${size}`
  if (href) return <a className={cls} href={href} onClick={onClick}>{children}</a>
  return <button className={cls} type={type} onClick={onClick}>{children}</button>
}
```

`design-system/src/components/TextLink.tsx`:
```tsx
import type { ReactNode } from 'react'

export interface TextLinkProps {
  href: string
  children: ReactNode
  /** Trailing arrow affordance (default true). */
  arrow?: boolean
}

/** Mono-face inline link — the quiet counterpart to Button. */
export function TextLink({ href, children, arrow = true }: TextLinkProps) {
  return <a className="dl-textlink" href={href}>{children}{arrow && <span aria-hidden="true"> →</span>}</a>
}
```

`design-system/src/components/Badge.tsx`:
```tsx
import type { ReactNode } from 'react'

export interface BadgeProps {
  tone?: 'ink' | 'blue' | 'neutral' | 'ok' | 'warn'
  children: ReactNode
}

/** Small pill chip for statuses and taxonomy. */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`dl-badge dl-badge--${tone}`}>{children}</span>
}
```

`design-system/src/components/SectionLabel.tsx`:
```tsx
import type { ReactNode } from 'react'

export interface SectionLabelProps {
  children: ReactNode
  /** Leading hairline rule (default true). */
  rule?: boolean
}

/** Mono uppercase eyebrow that opens a section. */
export function SectionLabel({ children, rule = true }: SectionLabelProps) {
  return <div className={`dl-seclabel${rule ? ' dl-seclabel--rule' : ''}`}>{children}</div>
}
```

Replace `design-system/src/index.ts` content:
```ts
export { Button, type ButtonProps } from './components/Button'
export { TextLink, type TextLinkProps } from './components/TextLink'
export { Badge, type BadgeProps } from './components/Badge'
export { SectionLabel, type SectionLabelProps } from './components/SectionLabel'
```

- [ ] **Step 4: Add styles under `/* ===== primitives ===== */`**

Append to `design-system/src/styles.css`:
```css
/* Button */
.dl-btn {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid transparent; border-radius: var(--dl-radius-pill);
  font-family: var(--dl-font-body); font-weight: 600; cursor: pointer;
  transition: background var(--dl-ease), border-color var(--dl-ease), color var(--dl-ease);
  white-space: nowrap;
}
.dl-btn--sm { padding: 8px 18px; font-size: var(--dl-text-small); }
.dl-btn--md { padding: 12px 26px; font-size: var(--dl-text-small); }
.dl-btn--lg { padding: 15px 32px; font-size: var(--dl-text-body); }
.dl-btn--ink { background: var(--dl-ink); color: #fff; }
.dl-btn--ink:hover { background: #2A2A30; }
.dl-btn--blue { background: var(--dl-blue); color: #fff; }
.dl-btn--blue:hover { background: #0027B8; }
.dl-btn--ghost { border-color: var(--dl-ink); color: var(--dl-ink); background: transparent; }
.dl-btn--ghost:hover { background: var(--dl-ink); color: #fff; }
.dl-on-ink .dl-btn--ink { background: var(--dl-on-ink); color: var(--dl-ink); }
.dl-on-ink .dl-btn--ink:hover { background: #fff; }
.dl-on-ink .dl-btn--ghost { border-color: #3A3A42; color: var(--dl-on-ink); }
.dl-on-ink .dl-btn--ghost:hover { background: var(--dl-on-ink); color: var(--dl-ink); border-color: var(--dl-on-ink); }

/* TextLink */
.dl-textlink { font-family: var(--dl-font-mono); font-size: var(--dl-text-small); letter-spacing: 0.02em; border-bottom: 1px solid var(--dl-ink); padding-bottom: 2px; transition: color var(--dl-ease), border-color var(--dl-ease); }
.dl-textlink:hover { color: var(--dl-blue); border-color: var(--dl-blue); }
.dl-on-ink .dl-textlink { border-color: var(--dl-on-ink-muted); }
.dl-on-ink .dl-textlink:hover { color: var(--dl-blue-bright); border-color: var(--dl-blue-bright); }

/* Badge */
.dl-badge { display: inline-flex; align-items: center; border-radius: var(--dl-radius-pill); padding: 4px 12px; font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.06em; }
.dl-badge--neutral { background: var(--dl-grey-1); color: var(--dl-grey-4); }
.dl-badge--ink { background: var(--dl-ink); color: #fff; }
.dl-badge--blue { background: var(--dl-blue-wash); color: var(--dl-blue); }
.dl-badge--ok { background: #E7F3EC; color: var(--dl-ok); }
.dl-badge--warn { background: #F8EFDD; color: var(--dl-warn); }

/* SectionLabel */
.dl-seclabel { display: flex; align-items: center; gap: 10px; font-family: var(--dl-font-mono); font-size: var(--dl-text-label); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--dl-grey-4); }
.dl-seclabel--rule::before { content: ""; width: 20px; height: 1px; background: var(--dl-blue); }
.dl-on-ink .dl-seclabel { color: var(--dl-on-ink-muted); }
.dl-on-ink .dl-seclabel--rule::before { background: var(--dl-blue-bright); }
```

- [ ] **Step 5: Write examples**

`design-system/src/examples/Button.example.tsx`:
```tsx
import { Button } from '../index'
export default (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button variant="blue">Run the 48h audit</Button>
    <Button variant="ink">Get a demo</Button>
    <Button variant="ghost" size="sm">See the method</Button>
  </div>
)
```

`design-system/src/examples/TextLink.example.tsx`:
```tsx
import { TextLink } from '../index'
export default <TextLink href="#method">read the method</TextLink>
```

`design-system/src/examples/Badge.example.tsx`:
```tsx
import { Badge } from '../index'
export default (
  <div style={{ display: 'flex', gap: 8 }}>
    <Badge tone="blue">MCP-native</Badge>
    <Badge tone="neutral">150+ connectors</Badge>
    <Badge tone="ok">ARS 87</Badge>
  </div>
)
```

`design-system/src/examples/SectionLabel.example.tsx`:
```tsx
import { SectionLabel } from '../index'
export default <SectionLabel>The agentic data center</SectionLabel>
```

- [ ] **Step 6: Run gates**

Run: `npm run test && npm run typecheck` — Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add design-system && git commit -m "feat(ds): Button, TextLink, Badge, SectionLabel primitives"
```

---

### Task 3: Primitives II — Stat, Card, Input, Logo

**Files:**
- Create: `design-system/src/components/Stat.tsx`, `Card.tsx`, `Input.tsx`, `Logo.tsx`; examples `Stat.example.tsx`, `Card.example.tsx`, `Input.example.tsx`, `Logo.example.tsx`
- Modify: `design-system/src/index.ts`, `design-system/src/styles.css`
- Test: `design-system/src/test/primitives2.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `Stat({ value: string, label: string, source?: string })`, `Card({ title?, label?, tone?: 'paper'|'canvas'|'ink', children })`, `Input({ label, placeholder?, type?, name? })`, `Logo({ size?: number, withGlyph?: boolean })`. `StatBand` (Task 6) consumes `StatProps`; `Navbar`/`Footer` (Tasks 5/7) consume `Logo` with these props.

- [ ] **Step 1: Write failing tests**

`design-system/src/test/primitives2.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { Stat, Card, Input, Logo } from '../index'

test('Stat renders value, label and optional source', () => {
  const { getByText } = render(<Stat value=">40%" label="agent projects canceled by 2027" source="Gartner" />)
  expect(getByText('>40%')).toBeTruthy()
  expect(getByText('Gartner')).toBeTruthy()
})

test('Card applies tone class and renders label + title + children', () => {
  const { getByText, container } = render(<Card tone="ink" label="Module 01" title="Datalith Connect">150+ connectors.</Card>)
  expect((container.firstChild as HTMLElement).className).toContain('dl-card--ink')
  expect(getByText('Datalith Connect').tagName).toBe('H3')
})

test('Input associates label and input', () => {
  const { getByLabelText } = render(<Input label="Work email" placeholder="you@company.com" type="email" />)
  expect((getByLabelText('Work email') as HTMLInputElement).type).toBe('email')
})

test('Logo renders wordmark and glyph by default', () => {
  const { getByText, container } = render(<Logo />)
  expect(getByText('datalith')).toBeTruthy()
  expect(container.querySelector('svg')).toBeTruthy()
})
```

- [ ] **Step 2: Run tests, verify failure**

Run: `npm run test` — Expected: FAIL (not exported).

- [ ] **Step 3: Implement components**

`design-system/src/components/Stat.tsx`:
```tsx
export interface StatProps {
  /** The number itself, e.g. ">40%" or "150+". */
  value: string
  label: string
  /** Attribution shown in mono caption, e.g. "Gartner". */
  source?: string
}

/** Editorial statistic: display numeral, plain label, mono source. */
export function Stat({ value, label, source }: StatProps) {
  return (
    <div className="dl-stat">
      <div className="dl-stat-value">{value}</div>
      <p className="dl-stat-label">{label}</p>
      {source && <span className="dl-stat-source">{source}</span>}
    </div>
  )
}
```

`design-system/src/components/Card.tsx`:
```tsx
import type { ReactNode } from 'react'

export interface CardProps {
  /** Mono eyebrow above the title, e.g. "Module 01". */
  label?: string
  title?: string
  tone?: 'paper' | 'canvas' | 'ink'
  children?: ReactNode
}

/** Sharp-cornered hairline surface — the gallery wall label. */
export function Card({ label, title, tone = 'paper', children }: CardProps) {
  return (
    <div className={`dl-card dl-card--${tone}${tone === 'ink' ? ' dl-on-ink' : ''}`}>
      {label && <span className="dl-card-label">{label}</span>}
      {title && <h3 className="dl-card-title">{title}</h3>}
      {children && <div className="dl-card-body">{children}</div>}
    </div>
  )
}
```

`design-system/src/components/Input.tsx`:
```tsx
import { useId } from 'react'

export interface InputProps {
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'url'
  name?: string
}

/** Sharp-cornered hairline input with mono label; border turns blue on focus. */
export function Input({ label, placeholder, type = 'text', name }: InputProps) {
  const id = useId()
  return (
    <label className="dl-field" htmlFor={id}>
      <span className="dl-field-label">{label}</span>
      <input className="dl-input" id={id} type={type} name={name} placeholder={placeholder} />
    </label>
  )
}
```

`design-system/src/components/Logo.tsx`:
```tsx
export interface LogoProps {
  /** Wordmark font size in px (default 18). Glyph scales with it. */
  size?: number
  withGlyph?: boolean
}

/** The datalith wordmark: three streams merging into one blue line. */
export function Logo({ size = 18, withGlyph = true }: LogoProps) {
  const h = Math.round(size * 0.9)
  return (
    <span className="dl-logo" style={{ fontSize: size }}>
      {withGlyph && (
        <svg width={h * 1.4} height={h} viewBox="0 0 28 20" fill="none" aria-hidden="true">
          <path d="M0 3 C8 3, 10 10, 16 10" className="dl-logo-stream" />
          <path d="M0 10 L16 10" className="dl-logo-stream" />
          <path d="M0 17 C8 17, 10 10, 16 10" className="dl-logo-stream" />
          <path d="M16 10 L28 10" className="dl-logo-merge" />
        </svg>
      )}
      datalith
    </span>
  )
}
```

Append to `design-system/src/index.ts`:
```ts
export { Stat, type StatProps } from './components/Stat'
export { Card, type CardProps } from './components/Card'
export { Input, type InputProps } from './components/Input'
export { Logo, type LogoProps } from './components/Logo'
```

- [ ] **Step 4: Add styles**

Append to `design-system/src/styles.css`:
```css
/* Stat */
.dl-stat-value { font-family: var(--dl-font-display); font-size: var(--dl-text-h2); font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
.dl-stat-label { font-size: var(--dl-text-small); color: var(--dl-grey-4); margin-top: 12px; max-width: 280px; }
.dl-stat-source { display: block; font-family: var(--dl-font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dl-grey-3); margin-top: 10px; }
.dl-on-ink .dl-stat-label { color: var(--dl-on-ink-muted); }

/* Card */
.dl-card { border: var(--dl-hairline); padding: var(--dl-space-6); }
.dl-card--paper { background: var(--dl-paper); }
.dl-card--canvas { background: var(--dl-canvas); }
.dl-card--ink { background: var(--dl-ink); border-color: #2A2A30; }
.dl-card-label { display: block; font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.12em; text-transform: uppercase; color: var(--dl-grey-3); }
.dl-card-title { font-family: var(--dl-font-display); font-size: var(--dl-text-h3); font-weight: 600; letter-spacing: -0.015em; margin-top: 10px; }
.dl-card-body { color: var(--dl-grey-4); font-size: var(--dl-text-small); margin-top: 10px; line-height: 1.65; }
.dl-card--ink .dl-card-body { color: var(--dl-on-ink-muted); }
.dl-card--ink .dl-card-label { color: var(--dl-on-ink-muted); }

/* Input */
.dl-field { display: flex; flex-direction: column; gap: 8px; }
.dl-field-label { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.12em; text-transform: uppercase; color: var(--dl-grey-4); }
.dl-input { border: var(--dl-hairline); border-radius: 0; background: var(--dl-paper); padding: 12px 14px; font-size: var(--dl-text-small); color: var(--dl-ink); transition: border-color var(--dl-ease); }
.dl-input::placeholder { color: var(--dl-grey-3); }
.dl-input:focus { border-color: var(--dl-blue); outline: none; }

/* Logo */
.dl-logo { display: inline-flex; align-items: center; gap: 9px; font-family: var(--dl-font-display); font-weight: 700; letter-spacing: -0.02em; color: var(--dl-ink); line-height: 1; }
.dl-logo-stream { stroke: currentColor; stroke-width: 1.4; }
.dl-logo-merge { stroke: var(--dl-blue); stroke-width: 3; stroke-linecap: round; }
.dl-on-ink .dl-logo { color: var(--dl-on-ink); }
.dl-on-ink .dl-logo-merge { stroke: var(--dl-blue-bright); }
```

- [ ] **Step 5: Write examples**

`design-system/src/examples/Stat.example.tsx`:
```tsx
import { Stat } from '../index'
export default <Stat value=">40%" label="of agentic AI projects will be canceled by 2027 — data readiness is the #1 killer" source="Gartner" />
```

`design-system/src/examples/Card.example.tsx`:
```tsx
import { Card } from '../index'
export default (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640 }}>
    <Card label="Module 02" title="Datalith Graph">The Enterprise Knowledge Graph: auto-ontology, identity resolution, lineage.</Card>
    <Card tone="ink" label="Module 05" title="Datalith Gateway">Governed MCP-native serving with per-agent identity and full audit.</Card>
  </div>
)
```

`design-system/src/examples/Input.example.tsx`:
```tsx
import { Input } from '../index'
export default <div style={{ maxWidth: 320 }}><Input label="Work email" placeholder="you@company.com" type="email" /></div>
```

`design-system/src/examples/Logo.example.tsx`:
```tsx
import { Logo } from '../index'
export default <Logo size={22} />
```

- [ ] **Step 6: Run gates**

Run: `npm run test && npm run typecheck` — Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add design-system && git commit -m "feat(ds): Stat, Card, Input, Logo primitives"
```

---

### Task 4: Signature — ConfluenceFigure, ScoreMeter

**Files:**
- Create: `design-system/src/components/ConfluenceFigure.tsx`, `ScoreMeter.tsx`; examples `ConfluenceFigure.example.tsx`, `ScoreMeter.example.tsx`
- Modify: `design-system/src/index.ts`, `design-system/src/styles.css`
- Test: `design-system/src/test/signature.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `ConfluenceFigure({ sources?: string[], mergedLabel?: string, animated?: boolean, onInk?: boolean, height?: number })`, `ScoreMeter({ value: number, label?: string, caption?: string })`. `Hero` (Task 5) renders `<ConfluenceFigure />` as its default figure.

- [ ] **Step 1: Write failing tests**

`design-system/src/test/signature.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { ConfluenceFigure, ScoreMeter } from '../index'

test('ConfluenceFigure draws one stream per source plus one merged line', () => {
  const sources = ['postgres', 'snowflake', 's3', 'salesforce', 'kafka']
  const { container, getByText } = render(<ConfluenceFigure sources={sources} />)
  expect(container.querySelectorAll('.dl-confluence-stream').length).toBe(5)
  expect(container.querySelectorAll('.dl-confluence-merge').length).toBe(1)
  expect(getByText('ONE GRAPH')).toBeTruthy()
  expect(getByText('postgres')).toBeTruthy()
})

test('ScoreMeter clamps to 0–100 and shows value + marker position', () => {
  const { getByText, container } = render(<ScoreMeter value={187} caption="Certified · full audit" />)
  expect(getByText('100')).toBeTruthy()
  const marker = container.querySelector('.dl-scoremeter-marker') as HTMLElement
  expect(marker.style.left).toBe('100%')
})
```

- [ ] **Step 2: Run tests, verify failure**

Run: `npm run test` — Expected: FAIL.

- [ ] **Step 3: Implement**

`design-system/src/components/ConfluenceFigure.tsx`:
```tsx
const DEFAULT_SOURCES = ['postgres', 'snowflake', 's3 buckets', 'salesforce', 'kafka', 'sharepoint', 'notion', 'gmail', 'jira', '+142 more']

export interface ConfluenceFigureProps {
  /** One hairline stream per source (2–14 recommended). */
  sources?: string[]
  /** Label on the merged blue line. */
  mergedLabel?: string
  /** Draw-in animation on mount (respects reduced motion). */
  animated?: boolean
  /** Light-on-dark variant for ink sections. */
  onInk?: boolean
  /** Rendered height in px (viewBox scales). */
  height?: number
}

/**
 * The brand signature: every source, one graph — as geometry.
 * Hairline streams converge into a single bold Klein-blue line.
 */
export function ConfluenceFigure({ sources = DEFAULT_SOURCES, mergedLabel = 'ONE GRAPH', animated = false, onInk = false, height = 340 }: ConfluenceFigureProps) {
  const W = 560
  const H = 340
  const mergeX = 392
  const midY = H / 2
  const pad = 22
  const n = sources.length
  const step = n > 1 ? (H - pad * 2) / (n - 1) : 0
  return (
    <figure className={`dl-confluence${onInk ? ' dl-confluence--on-ink' : ''}${animated ? ' dl-confluence--animated' : ''}`} style={{ height }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${n} data sources merging into ${mergedLabel.toLowerCase()}`}>
        {sources.map((s, i) => {
          const y = n > 1 ? pad + i * step : midY
          const spread = Math.abs(y - midY) / (H / 2)
          return (
            <g key={s + i}>
              <path
                className="dl-confluence-stream"
                d={`M0 ${y} C ${140 + spread * 20} ${y}, ${240 + spread * 20} ${midY}, ${mergeX} ${midY}`}
                style={{ opacity: 0.55 + 0.35 * ((i % 3) / 2) }}
              />
              <text className="dl-confluence-srclabel" x={8} y={y - 6}>{s}</text>
            </g>
          )
        })}
        <path className="dl-confluence-merge" d={`M${mergeX} ${midY} L${W} ${midY}`} />
        <circle className="dl-confluence-node" cx={mergeX} cy={midY} r={5.5} />
        <text className="dl-confluence-mergelabel" x={mergeX + 48} y={midY - 14}>{mergedLabel}</text>
      </svg>
    </figure>
  )
}
```

`design-system/src/components/ScoreMeter.tsx`:
```tsx
export interface ScoreMeterProps {
  /** Agent-Readiness Score, 0–100. Values outside are clamped. */
  value: number
  label?: string
  /** Mono caption under the scale, e.g. "Certified · full audit". */
  caption?: string
}

/** ARS readout: display numeral over a hairline tick scale with a blue marker. */
export function ScoreMeter({ value, label = 'Agent-Readiness Score', caption }: ScoreMeterProps) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="dl-scoremeter">
      <span className="dl-scoremeter-label">{label}</span>
      <div className="dl-scoremeter-value">{v}<span className="dl-scoremeter-outof">/100</span></div>
      <div className="dl-scoremeter-scale" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-label={label}>
        <div className="dl-scoremeter-ticks" />
        <div className="dl-scoremeter-marker" style={{ left: `${v}%` }} />
      </div>
      <div className="dl-scoremeter-nums"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
      {caption && <span className="dl-scoremeter-caption">{caption}</span>}
    </div>
  )
}
```

Append to `design-system/src/index.ts`:
```ts
export { ConfluenceFigure, type ConfluenceFigureProps } from './components/ConfluenceFigure'
export { ScoreMeter, type ScoreMeterProps } from './components/ScoreMeter'
```

- [ ] **Step 4: Add styles**

Append to `design-system/src/styles.css`:
```css
/* ConfluenceFigure */
.dl-confluence { margin: 0; }
.dl-confluence svg { width: 100%; height: 100%; display: block; }
.dl-confluence-stream { fill: none; stroke: var(--dl-ink); stroke-width: 1; }
.dl-confluence-merge { fill: none; stroke: var(--dl-blue); stroke-width: 6; stroke-linecap: round; }
.dl-confluence-node { fill: var(--dl-blue); }
.dl-confluence-srclabel { font-family: var(--dl-font-mono); font-size: 9px; letter-spacing: 0.05em; fill: var(--dl-grey-3); }
.dl-confluence-mergelabel { font-family: var(--dl-font-mono); font-size: 10px; letter-spacing: 0.14em; font-weight: 500; fill: var(--dl-blue); }
.dl-confluence--on-ink .dl-confluence-stream { stroke: var(--dl-on-ink); }
.dl-confluence--on-ink .dl-confluence-merge { stroke: var(--dl-blue-bright); }
.dl-confluence--on-ink .dl-confluence-node { fill: var(--dl-blue-bright); }
.dl-confluence--on-ink .dl-confluence-srclabel { fill: var(--dl-on-ink-muted); }
.dl-confluence--on-ink .dl-confluence-mergelabel { fill: var(--dl-blue-bright); }
.dl-confluence--animated .dl-confluence-stream { stroke-dasharray: 700; stroke-dashoffset: 700; animation: dl-draw 1.4s ease forwards; }
.dl-confluence--animated .dl-confluence-merge { stroke-dasharray: 200; stroke-dashoffset: 200; animation: dl-draw 0.6s ease 1.1s forwards; }
@keyframes dl-draw { to { stroke-dashoffset: 0; } }

/* ScoreMeter */
.dl-scoremeter { max-width: 380px; }
.dl-scoremeter-label { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.14em; text-transform: uppercase; color: var(--dl-grey-4); }
.dl-scoremeter-value { font-family: var(--dl-font-display); font-size: var(--dl-text-h1); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin-top: 6px; }
.dl-scoremeter-outof { font-size: var(--dl-text-lead); color: var(--dl-grey-3); font-weight: 500; margin-left: 4px; }
.dl-scoremeter-scale { position: relative; height: 26px; margin-top: 12px; }
.dl-scoremeter-ticks { position: absolute; inset: 0; background:
  repeating-linear-gradient(90deg, var(--dl-grey-2) 0 1px, transparent 1px 5%) left top / 100% 12px no-repeat,
  repeating-linear-gradient(90deg, var(--dl-ink) 0 1px, transparent 1px 25%) left top / 100% 100% no-repeat; }
.dl-scoremeter-marker { position: absolute; top: -4px; bottom: 0; width: 3px; margin-left: -1.5px; background: var(--dl-blue); }
.dl-scoremeter-nums { display: flex; justify-content: space-between; font-family: var(--dl-font-mono); font-size: 10px; color: var(--dl-grey-3); margin-top: 6px; }
.dl-scoremeter-caption { display: block; font-family: var(--dl-font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dl-grey-4); margin-top: 12px; }
.dl-on-ink .dl-scoremeter-label, .dl-on-ink .dl-scoremeter-caption { color: var(--dl-on-ink-muted); }
.dl-on-ink .dl-scoremeter-marker { background: var(--dl-blue-bright); }
.dl-on-ink .dl-scoremeter-ticks { background:
  repeating-linear-gradient(90deg, #2A2A30 0 1px, transparent 1px 5%) left top / 100% 12px no-repeat,
  repeating-linear-gradient(90deg, var(--dl-on-ink) 0 1px, transparent 1px 25%) left top / 100% 100% no-repeat; }
```

- [ ] **Step 5: Write examples**

`design-system/src/examples/ConfluenceFigure.example.tsx`:
```tsx
import { ConfluenceFigure } from '../index'
export default <div style={{ maxWidth: 560 }}><ConfluenceFigure /></div>
```

`design-system/src/examples/ScoreMeter.example.tsx`:
```tsx
import { ScoreMeter } from '../index'
export default <ScoreMeter value={87} caption="Certified · full audit" />
```

- [ ] **Step 6: Run gates**

Run: `npm run test && npm run typecheck` — Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add design-system && git commit -m "feat(ds): ConfluenceFigure and ScoreMeter signature components"
```

---

### Task 5: Sections I — Navbar, Hero, LogoStrip, FeatureGrid

**Files:**
- Create: `design-system/src/components/Navbar.tsx`, `Hero.tsx`, `LogoStrip.tsx`, `FeatureGrid.tsx`; examples for each
- Modify: `design-system/src/index.ts`, `design-system/src/styles.css`
- Test: `design-system/src/test/sections1.test.tsx`

**Interfaces:**
- Consumes: `Logo`, `Button`, `SectionLabel`, `ConfluenceFigure` (exact props from Tasks 2–4).
- Produces: `CtaSpec = { label: string; href: string }` (exported from `Hero.tsx`, reused by `CTABand` Task 7); `Navbar({ links?: {label,href}[], cta?: CtaSpec })`, `Hero({ headline, accent?, lead, primaryCta?, secondaryCta?, figure? })`, `LogoStrip({ title?, items? })`, `FeatureGrid({ label?, title?, items?, columns? })`.

- [ ] **Step 1: Write failing tests**

`design-system/src/test/sections1.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { Navbar, Hero, LogoStrip, FeatureGrid } from '../index'

test('Navbar renders logo, links and CTA', () => {
  const { getByText, getByRole } = render(
    <Navbar links={[{ label: 'Platform', href: '#p' }]} cta={{ label: 'Run the audit', href: '#a' }} />,
  )
  expect(getByText('datalith')).toBeTruthy()
  expect(getByRole('link', { name: 'Platform' })).toBeTruthy()
  expect(getByText('Run the audit')).toBeTruthy()
})

test('Hero renders headline with blue accent and default confluence figure', () => {
  const { getByText, container } = render(
    <Hero headline="Every source. One graph." accent="Agent-ready." lead="Lead." primaryCta={{ label: 'Begin', href: '#' }} />,
  )
  expect(getByText('Agent-ready.').tagName).toBe('EM')
  expect(container.querySelector('.dl-confluence')).toBeTruthy()
})

test('LogoStrip renders items', () => {
  const { getByText } = render(<LogoStrip items={['Snowflake', 'Databricks']} />)
  expect(getByText('Snowflake')).toBeTruthy()
})

test('FeatureGrid renders one cell per item with mono label', () => {
  const items = [
    { label: '01', title: 'Connect', body: 'Ingestion.' },
    { label: '02', title: 'Graph', body: 'Ontology.' },
  ]
  const { container } = render(<FeatureGrid items={items} />)
  expect(container.querySelectorAll('.dl-featuregrid-cell').length).toBe(2)
})
```

- [ ] **Step 2: Run tests, verify failure**

Run: `npm run test` — Expected: FAIL.

- [ ] **Step 3: Implement**

`design-system/src/components/Hero.tsx`:
```tsx
import type { ReactNode } from 'react'
import { Button } from './Button'
import { TextLink } from './TextLink'
import { ConfluenceFigure } from './ConfluenceFigure'

/** A call-to-action target shared by Hero, Navbar, CTABand. */
export interface CtaSpec { label: string; href: string }

export interface HeroProps {
  /** Main display headline. Line breaks: pass "\n" to break lines. */
  headline?: string
  /** Final phrase rendered as the single blue accent. */
  accent?: string
  lead?: string
  primaryCta?: CtaSpec
  secondaryCta?: CtaSpec
  /** Right column; defaults to the ConfluenceFigure. Pass null to omit. */
  figure?: ReactNode
}

/** Landing hero: display type left, the confluence artwork right. */
export function Hero({
  headline = 'Every source.\nOne graph.',
  accent = 'Agent-ready.',
  lead = 'Datalith draws every database, warehouse, wiki and inbox into a single governed knowledge graph — then serves it to any agent, audited end to end.',
  primaryCta = { label: 'Begin the audit', href: '#audit' },
  secondaryCta = { label: 'the method', href: '#method' },
  figure = <ConfluenceFigure />,
}: HeroProps) {
  const lines = headline.split('\n')
  return (
    <section className="dl-hero">
      <div className="dl-wrap dl-hero-grid">
        <div>
          <h1 className="dl-hero-headline">
            {lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
            {accent && <em>{accent}</em>}
          </h1>
          {lead && <p className="dl-hero-lead">{lead}</p>}
          <div className="dl-hero-ctas">
            {primaryCta && <Button variant="ink" size="lg" href={primaryCta.href}>{primaryCta.label}</Button>}
            {secondaryCta && <TextLink href={secondaryCta.href}>{secondaryCta.label}</TextLink>}
          </div>
        </div>
        {figure && <div className="dl-hero-figure">{figure}</div>}
      </div>
    </section>
  )
}
```

`design-system/src/components/Navbar.tsx`:
```tsx
import { Logo } from './Logo'
import { Button } from './Button'
import type { CtaSpec } from './Hero'

export interface NavbarProps {
  links?: { label: string; href: string }[]
  cta?: CtaSpec
}

/** Top navigation: wordmark, quiet links, one CTA. Hairline bottom rule. */
export function Navbar({
  links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Method', href: '#method' },
    { label: 'Pricing', href: '#pricing' },
  ],
  cta = { label: 'Run the 48h audit', href: '#audit' },
}: NavbarProps) {
  return (
    <nav className="dl-navbar">
      <div className="dl-wrap dl-navbar-in">
        <a href="#top" aria-label="Datalith home"><Logo /></a>
        <ul className="dl-navbar-links">
          {links.map(l => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}
        </ul>
        {cta && <Button variant="blue" size="sm" href={cta.href}>{cta.label}</Button>}
      </div>
    </nav>
  )
}
```

`design-system/src/components/LogoStrip.tsx`:
```tsx
export interface LogoStripProps {
  title?: string
  /** Partner / connector names, rendered as quiet text marks. */
  items?: string[]
}

/** Mono-label strip of integration names divided by hairlines. */
export function LogoStrip({
  title = 'Connects to',
  items = ['Snowflake', 'Databricks', 'Postgres', 'Salesforce', 'SharePoint', 'Kafka', 'S3', 'Notion'],
}: LogoStripProps) {
  return (
    <section className="dl-logostrip">
      <div className="dl-wrap dl-logostrip-in">
        <span className="dl-logostrip-title">{title}</span>
        <ul className="dl-logostrip-items">
          {items.map(n => (<li key={n}>{n}</li>))}
        </ul>
      </div>
    </section>
  )
}
```

`design-system/src/components/FeatureGrid.tsx`:
```tsx
import { SectionLabel } from './SectionLabel'

export interface FeatureGridProps {
  label?: string
  title?: string
  items?: { label: string; title: string; body: string }[]
  columns?: 2 | 3
}

const MODULES = [
  { label: '01 · Connect', title: 'Every source, read-only', body: '150+ connectors; multi-source, multi-platform, multi-modal ingestion.' },
  { label: '02 · Graph', title: 'One knowledge graph', body: 'Auto-ontology, identity resolution, lineage across the estate.' },
  { label: '03 · Topics', title: 'A semantic layer', body: 'Domains, canonical metrics, and a glossary agents can trust.' },
  { label: '04 · Ready', title: 'Agent-Readiness Score', body: 'Preparation engine + ARS 0–100, board-ready in 48 hours.' },
  { label: '05 · Gateway', title: 'Governed serving', body: 'MCP-native access with per-agent identity and full audit.' },
  { label: '06 · Flows', title: 'Workflows, ROI attached', body: 'Agentic workflows mined from your own data, ranked by value.' },
]

/** Hairline-divided grid of features — default content is the six Datalith modules. */
export function FeatureGrid({ label = 'The platform', title = 'Six modules. One monolith.', items = MODULES, columns = 3 }: FeatureGridProps) {
  return (
    <section className="dl-featuregrid">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <div className={`dl-featuregrid-grid dl-featuregrid-grid--${columns}`}>
          {items.map(it => (
            <div className="dl-featuregrid-cell" key={it.label}>
              <span className="dl-featuregrid-label">{it.label}</span>
              <h3 className="dl-featuregrid-title">{it.title}</h3>
              <p className="dl-featuregrid-body">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Append to `design-system/src/index.ts`:
```ts
export { Navbar, type NavbarProps } from './components/Navbar'
export { Hero, type HeroProps, type CtaSpec } from './components/Hero'
export { LogoStrip, type LogoStripProps } from './components/LogoStrip'
export { FeatureGrid, type FeatureGridProps } from './components/FeatureGrid'
```

- [ ] **Step 4: Add styles**

Append to `design-system/src/styles.css`:
```css
/* shared section rhythm */
.dl-h2 { font-family: var(--dl-font-display); font-size: var(--dl-text-h2); font-weight: 700; letter-spacing: -0.025em; line-height: 1.05; margin-top: 18px; max-width: 640px; }

/* Navbar */
.dl-navbar { background: var(--dl-canvas); border-bottom: var(--dl-hairline); position: sticky; top: 0; z-index: 50; }
.dl-navbar-in { display: flex; align-items: center; gap: 32px; height: 68px; }
.dl-navbar-links { display: flex; gap: 28px; margin-left: auto; font-size: var(--dl-text-small); font-weight: 500; color: var(--dl-grey-4); }
.dl-navbar-links a { transition: color var(--dl-ease); }
.dl-navbar-links a:hover { color: var(--dl-ink); }
@media (max-width: 760px) { .dl-navbar-links { display: none; } }

/* Hero */
.dl-hero { background: var(--dl-canvas); padding: var(--dl-space-9) 0; }
.dl-hero-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: var(--dl-space-7); align-items: center; }
@media (max-width: 900px) { .dl-hero-grid { grid-template-columns: 1fr; } }
.dl-hero-headline { font-family: var(--dl-font-display); font-size: clamp(2.6rem, 5.4vw, var(--dl-text-display)); font-weight: 700; letter-spacing: -0.035em; line-height: 1.0; }
.dl-hero-headline em { font-style: normal; color: var(--dl-blue); }
.dl-hero-lead { color: var(--dl-grey-4); font-size: var(--dl-text-lead); line-height: 1.55; margin-top: var(--dl-space-5); max-width: 420px; }
.dl-hero-ctas { display: flex; align-items: center; gap: var(--dl-space-5); margin-top: var(--dl-space-6); flex-wrap: wrap; }

/* LogoStrip */
.dl-logostrip { border-top: var(--dl-hairline); border-bottom: var(--dl-hairline); padding: var(--dl-space-5) 0; }
.dl-logostrip-in { display: flex; align-items: center; gap: var(--dl-space-6); flex-wrap: wrap; }
.dl-logostrip-title { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.14em; text-transform: uppercase; color: var(--dl-grey-3); }
.dl-logostrip-items { display: flex; gap: var(--dl-space-6); flex-wrap: wrap; font-family: var(--dl-font-display); font-weight: 600; font-size: var(--dl-text-body); color: var(--dl-grey-3); }

/* FeatureGrid */
.dl-featuregrid { padding: var(--dl-space-9) 0; }
.dl-featuregrid-grid { display: grid; border: var(--dl-hairline); background: var(--dl-paper); margin-top: var(--dl-space-7); }
.dl-featuregrid-grid--3 { grid-template-columns: repeat(3, 1fr); }
.dl-featuregrid-grid--2 { grid-template-columns: repeat(2, 1fr); }
@media (max-width: 860px) { .dl-featuregrid-grid--3, .dl-featuregrid-grid--2 { grid-template-columns: 1fr; } }
.dl-featuregrid-cell { padding: var(--dl-space-6); border-left: var(--dl-hairline); border-top: var(--dl-hairline); transition: background var(--dl-ease); }
.dl-featuregrid-cell:hover { background: var(--dl-blue-wash); }
.dl-featuregrid-grid--3 .dl-featuregrid-cell:nth-child(-n+3) { border-top: 0; }
.dl-featuregrid-grid--2 .dl-featuregrid-cell:nth-child(-n+2) { border-top: 0; }
.dl-featuregrid-grid--3 .dl-featuregrid-cell:nth-child(3n+1) { border-left: 0; }
.dl-featuregrid-grid--2 .dl-featuregrid-cell:nth-child(2n+1) { border-left: 0; }
@media (max-width: 860px) { .dl-featuregrid-cell { border-left: 0 !important; } .dl-featuregrid-cell:first-child { border-top: 0; } }
.dl-featuregrid-label { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.1em; text-transform: uppercase; color: var(--dl-blue); }
.dl-featuregrid-title { font-family: var(--dl-font-display); font-size: var(--dl-text-lead); font-weight: 600; letter-spacing: -0.01em; margin-top: 12px; }
.dl-featuregrid-body { font-size: var(--dl-text-small); color: var(--dl-grey-4); margin-top: 8px; line-height: 1.65; }
```

- [ ] **Step 5: Write examples**

`design-system/src/examples/Navbar.example.tsx`:
```tsx
import { Navbar } from '../index'
export default <Navbar />
```

`design-system/src/examples/Hero.example.tsx`:
```tsx
import { Hero } from '../index'
export default <Hero />
```

`design-system/src/examples/LogoStrip.example.tsx`:
```tsx
import { LogoStrip } from '../index'
export default <LogoStrip />
```

`design-system/src/examples/FeatureGrid.example.tsx`:
```tsx
import { FeatureGrid } from '../index'
export default <FeatureGrid />
```

- [ ] **Step 6: Run gates**

Run: `npm run test && npm run typecheck` — Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add design-system && git commit -m "feat(ds): Navbar, Hero, LogoStrip, FeatureGrid sections"
```

---

### Task 6: Sections II — StatBand, Steps, Quote, PricingTable

**Files:**
- Create: `design-system/src/components/StatBand.tsx`, `Steps.tsx`, `Quote.tsx`, `PricingTable.tsx`; examples for each
- Modify: `design-system/src/index.ts`, `design-system/src/styles.css`
- Test: `design-system/src/test/sections2.test.tsx`

**Interfaces:**
- Consumes: `Stat`/`StatProps` (Task 3), `Button` (Task 2), `SectionLabel` (Task 2).
- Produces: `StatBand({ stats?: StatProps[] })`, `Steps({ label?, title?, steps? })`, `Quote({ quote, name, role })`, `PricingTable({ label?, title?, tiers? })` with `Tier = { name, price, period?, blurb, features: string[], cta: { label, href }, featured? }`.

- [ ] **Step 1: Write failing tests**

`design-system/src/test/sections2.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { StatBand, Steps, Quote, PricingTable } from '../index'

test('StatBand renders one cell per stat', () => {
  const { container } = render(<StatBand stats={[
    { value: '>40%', label: 'canceled' },
    { value: '60–75%', label: 'prep effort' },
    { value: '89%', label: 'investing' },
  ]} />)
  expect(container.querySelectorAll('.dl-statband-cell').length).toBe(3)
})

test('Steps renders ordered, numbered rows', () => {
  const { container, getByText } = render(<Steps steps={[
    { title: 'Connect', body: 'Read-only credentials in.' },
    { title: 'Score', body: 'ARS out in 48 hours.' },
  ]} />)
  expect(container.querySelector('ol')).toBeTruthy()
  expect(getByText('01')).toBeTruthy()
  expect(getByText('02')).toBeTruthy()
})

test('Quote renders blockquote with attribution', () => {
  const { getByText } = render(<Quote quote="First we show you what you have." name="Founder" role="Datalith" />)
  expect(getByText(/what you have/).closest('blockquote')).toBeTruthy()
})

test('PricingTable marks the featured tier', () => {
  const { container } = render(<PricingTable />)
  expect(container.querySelectorAll('.dl-pricing-tier--featured').length).toBe(1)
})
```

- [ ] **Step 2: Run tests, verify failure**

Run: `npm run test` — Expected: FAIL.

- [ ] **Step 3: Implement**

`design-system/src/components/StatBand.tsx`:
```tsx
import { Stat, type StatProps } from './Stat'

export interface StatBandProps { stats?: StatProps[] }

const DEFAULT_STATS: StatProps[] = [
  { value: '>40%', label: 'of agentic AI projects will be canceled by end of 2027 — data readiness is the #1 killer', source: 'Gartner' },
  { value: '60–75%', label: 'of every agent project’s effort is spent on data preparation', source: 'Industry surveys' },
  { value: '89%', label: 'of teams are investing in context infrastructure in the next 12 months', source: 'DataHub, 2026' },
]

/** Hairline-divided band of statistics. */
export function StatBand({ stats = DEFAULT_STATS }: StatBandProps) {
  return (
    <section className="dl-statband">
      <div className="dl-wrap dl-statband-grid">
        {stats.map(s => (<div className="dl-statband-cell" key={s.value}><Stat {...s} /></div>))}
      </div>
    </section>
  )
}
```

`design-system/src/components/Steps.tsx`:
```tsx
import { SectionLabel } from './SectionLabel'

export interface StepsProps {
  label?: string
  title?: string
  /** Ordered — numbering encodes the real sequence. */
  steps?: { title: string; body: string }[]
}

const DEFAULT_STEPS = [
  { title: 'Connect, read-only', body: 'Hand us scoped read-only credentials. Datalith maps the whole estate — every database, warehouse, wiki and inbox.' },
  { title: 'One graph, scored', body: 'The Enterprise Knowledge Graph assembles itself: ontology, identities, lineage — and your Agent-Readiness Score, board-ready in 48 hours.' },
  { title: 'Serve to any agent', body: 'Governed, MCP-native context for every agent — per-agent identity, full audit, and suggested workflows with ROI attached.' },
]

/** Numbered how-it-works rows; the numbers are the actual order of operations. */
export function Steps({ label = 'How it works', title = 'Read-only in. Agent workforce out.', steps = DEFAULT_STEPS }: StepsProps) {
  return (
    <section className="dl-steps">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <ol className="dl-steps-list">
          {steps.map((s, i) => (
            <li className="dl-steps-row" key={s.title}>
              <span className="dl-steps-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="dl-steps-title">{s.title}</h3>
              <p className="dl-steps-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

`design-system/src/components/Quote.tsx`:
```tsx
export interface QuoteProps {
  quote: string
  name: string
  role?: string
}

/** Editorial pull-quote set in display type with mono attribution. */
export function Quote({ quote, name, role }: QuoteProps) {
  return (
    <section className="dl-quote">
      <div className="dl-wrap">
        <blockquote className="dl-quote-text">“{quote}”</blockquote>
        <figcaption className="dl-quote-attr">{name}{role && <span> · {role}</span>}</figcaption>
      </div>
    </section>
  )
}
```

`design-system/src/components/PricingTable.tsx`:
```tsx
import { Button } from './Button'
import { SectionLabel } from './SectionLabel'
import type { CtaSpec } from './Hero'

export interface Tier {
  name: string
  price: string
  period?: string
  blurb: string
  features: string[]
  cta: CtaSpec
  /** Exactly one tier should be featured — it gets the blue treatment. */
  featured?: boolean
}

export interface PricingTableProps {
  label?: string
  title?: string
  tiers?: Tier[]
}

const DEFAULT_TIERS: Tier[] = [
  { name: 'Audit', price: 'Free', blurb: '48-hour Agent-Readiness Audit. Read-only credentials in, board-ready score out.', features: ['Estate map', 'ARS 0–100', 'Top-10 findings'], cta: { label: 'Run the audit', href: '#audit' } },
  { name: 'Growth', price: '$2.5K', period: '/mo', blurb: 'The graph, live. For teams making their first agents work.', features: ['Knowledge graph', 'Semantic layer', 'MCP gateway', 'Standard audit trail'], cta: { label: 'Start Growth', href: '#growth' }, featured: true },
  { name: 'Scale', price: '$6K', period: '/mo', blurb: 'Full governance for agent fleets in production.', features: ['Everything in Growth', 'Per-agent identity', 'Workflow recommendations', 'Priority support'], cta: { label: 'Start Scale', href: '#scale' } },
  { name: 'Enterprise', price: 'Custom', blurb: '$100K+ ACV. The whole estate, every guarantee.', features: ['Everything in Scale', 'On-prem connectors', 'Security review', 'Dedicated team'], cta: { label: 'Talk to us', href: '#contact' } },
]

/** Hairline pricing grid; one featured tier carries the blue. */
export function PricingTable({ label = 'Pricing', title = 'Land with the audit. Expand with the graph.', tiers = DEFAULT_TIERS }: PricingTableProps) {
  return (
    <section className="dl-pricing">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <div className="dl-pricing-grid">
          {tiers.map(t => (
            <div className={`dl-pricing-tier${t.featured ? ' dl-pricing-tier--featured' : ''}`} key={t.name}>
              <span className="dl-pricing-name">{t.name}</span>
              <div className="dl-pricing-price">{t.price}{t.period && <span className="dl-pricing-period">{t.period}</span>}</div>
              <p className="dl-pricing-blurb">{t.blurb}</p>
              <ul className="dl-pricing-features">
                {t.features.map(f => (<li key={f}>{f}</li>))}
              </ul>
              <Button variant={t.featured ? 'blue' : 'ghost'} href={t.cta.href}>{t.cta.label}</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Append to `design-system/src/index.ts`:
```ts
export { StatBand, type StatBandProps } from './components/StatBand'
export { Steps, type StepsProps } from './components/Steps'
export { Quote, type QuoteProps } from './components/Quote'
export { PricingTable, type PricingTableProps, type Tier } from './components/PricingTable'
```

- [ ] **Step 4: Add styles**

Append to `design-system/src/styles.css`:
```css
/* StatBand */
.dl-statband { border-top: var(--dl-hairline); border-bottom: var(--dl-hairline); }
.dl-statband-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 800px) { .dl-statband-grid { grid-template-columns: 1fr; } }
.dl-statband-cell { padding: var(--dl-space-7) var(--dl-space-6); border-left: var(--dl-hairline); }
.dl-statband-cell:first-child { border-left: 0; padding-left: 0; }
@media (max-width: 800px) { .dl-statband-cell { border-left: 0; border-top: var(--dl-hairline); padding-left: 0; } .dl-statband-cell:first-child { border-top: 0; } }

/* Steps */
.dl-steps { padding: var(--dl-space-9) 0; }
.dl-steps-list { margin-top: var(--dl-space-7); border-top: var(--dl-hairline); counter-reset: none; }
.dl-steps-row { display: grid; grid-template-columns: 90px 240px 1fr; gap: var(--dl-space-6); padding: var(--dl-space-6) 0; border-bottom: var(--dl-hairline); align-items: baseline; }
@media (max-width: 860px) { .dl-steps-row { grid-template-columns: 1fr; gap: 8px; } }
.dl-steps-num { font-family: var(--dl-font-mono); font-size: var(--dl-text-small); color: var(--dl-blue); letter-spacing: 0.08em; }
.dl-steps-title { font-family: var(--dl-font-display); font-size: var(--dl-text-lead); font-weight: 600; letter-spacing: -0.01em; }
.dl-steps-body { color: var(--dl-grey-4); font-size: var(--dl-text-small); line-height: 1.65; max-width: 560px; }

/* Quote */
.dl-quote { padding: var(--dl-space-9) 0; }
.dl-quote-text { font-family: var(--dl-font-display); font-size: clamp(1.6rem, 3vw, 2.25rem); font-weight: 500; letter-spacing: -0.02em; line-height: 1.25; max-width: 780px; }
.dl-quote-attr { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.1em; text-transform: uppercase; color: var(--dl-grey-4); margin-top: var(--dl-space-5); display: block; }
.dl-quote-attr span { color: var(--dl-grey-3); }

/* PricingTable */
.dl-pricing { padding: var(--dl-space-9) 0; }
.dl-pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); border: var(--dl-hairline); background: var(--dl-paper); margin-top: var(--dl-space-7); }
@media (max-width: 980px) { .dl-pricing-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .dl-pricing-grid { grid-template-columns: 1fr; } }
.dl-pricing-tier { padding: var(--dl-space-6); border-left: var(--dl-hairline); display: flex; flex-direction: column; }
.dl-pricing-tier:first-child { border-left: 0; }
@media (max-width: 980px) { .dl-pricing-tier { border-top: var(--dl-hairline); } }
.dl-pricing-tier--featured { box-shadow: inset 0 3px 0 var(--dl-blue); background: #FDFDFF; }
.dl-pricing-name { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.14em; text-transform: uppercase; color: var(--dl-grey-4); }
.dl-pricing-tier--featured .dl-pricing-name { color: var(--dl-blue); }
.dl-pricing-price { font-family: var(--dl-font-display); font-size: var(--dl-text-h2); font-weight: 700; letter-spacing: -0.02em; margin-top: 14px; line-height: 1; }
.dl-pricing-period { font-size: var(--dl-text-body); font-weight: 500; color: var(--dl-grey-3); }
.dl-pricing-blurb { font-size: var(--dl-text-small); color: var(--dl-grey-4); margin-top: 12px; line-height: 1.6; }
.dl-pricing-features { margin: var(--dl-space-5) 0 var(--dl-space-6); border-top: var(--dl-hairline); flex: 1; }
.dl-pricing-features li { padding: 10px 0; border-bottom: var(--dl-hairline); font-size: var(--dl-text-small); color: var(--dl-grey-4); display: flex; gap: 10px; }
.dl-pricing-features li::before { content: "—"; color: var(--dl-blue); font-family: var(--dl-font-mono); }
```

- [ ] **Step 5: Write examples**

`design-system/src/examples/StatBand.example.tsx`:
```tsx
import { StatBand } from '../index'
export default <StatBand />
```

`design-system/src/examples/Steps.example.tsx`:
```tsx
import { Steps } from '../index'
export default <Steps />
```

`design-system/src/examples/Quote.example.tsx`:
```tsx
import { Quote } from '../index'
export default <Quote quote="First we show you what you have. Then we turn it into an agent workforce." name="Datalith" role="The agentic data center" />
```

`design-system/src/examples/PricingTable.example.tsx`:
```tsx
import { PricingTable } from '../index'
export default <PricingTable />
```

- [ ] **Step 6: Run gates**

Run: `npm run test && npm run typecheck` — Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add design-system && git commit -m "feat(ds): StatBand, Steps, Quote, PricingTable sections"
```

---

### Task 7: Sections III — FAQ, CTABand, Footer; final gates

**Files:**
- Create: `design-system/src/components/FAQ.tsx`, `CTABand.tsx`, `Footer.tsx`; examples for each
- Modify: `design-system/src/index.ts`, `design-system/src/styles.css`
- Test: `design-system/src/test/sections3.test.tsx`

**Interfaces:**
- Consumes: `Button`, `SectionLabel`, `Logo`, `ConfluenceFigure`, `CtaSpec`.
- Produces: `FAQ({ label?, title?, items? })`, `CTABand({ headline?, lead?, primaryCta?, secondaryCta?, withFigure? })`, `Footer({ columns?, note? })`. Completes the 21-component export surface.

- [ ] **Step 1: Write failing tests**

`design-system/src/test/sections3.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { FAQ, CTABand, Footer } from '../index'

test('FAQ renders a details element per item with mono numbering', () => {
  const { container, getByText } = render(<FAQ items={[
    { q: 'Is access read-only?', a: 'Yes — scoped, read-only credentials.' },
    { q: 'What is the ARS?', a: 'Agent-Readiness Score, 0–100.' },
  ]} />)
  expect(container.querySelectorAll('details').length).toBe(2)
  expect(getByText('01')).toBeTruthy()
})

test('CTABand is an ink section with headline and CTAs', () => {
  const { container, getByText } = render(<CTABand />)
  expect((container.firstChild as HTMLElement).className).toContain('dl-on-ink')
  expect(getByText(/audit/i)).toBeTruthy()
})

test('Footer renders link columns and note', () => {
  const { getByText } = render(<Footer />)
  expect(getByText('datalith')).toBeTruthy()
  expect(getByText(/©/)).toBeTruthy()
})
```

- [ ] **Step 2: Run tests, verify failure**

Run: `npm run test` — Expected: FAIL.

- [ ] **Step 3: Implement**

`design-system/src/components/FAQ.tsx`:
```tsx
import { SectionLabel } from './SectionLabel'

export interface FAQProps {
  label?: string
  title?: string
  items?: { q: string; a: string }[]
}

const DEFAULT_ITEMS = [
  { q: 'Is access really read-only?', a: 'Yes. Datalith ingests through scoped, read-only credentials; nothing writes back to your systems, and every read is logged in the audit trail.' },
  { q: 'What is the Agent-Readiness Score?', a: 'ARS is a 0–100 measure of how consumable your estate is for AI agents — coverage, semantics, governance and freshness, computed per domain and overall.' },
  { q: 'How is this different from a data catalog?', a: 'Catalogs describe data for humans. Datalith produces governed, agent-ready context and serves it over MCP — with per-agent identity and full audit.' },
  { q: 'How long does the audit take?', a: '48 hours from credentials to a board-ready readout: estate map, ARS, and the top opportunities sleeping in your data.' },
]

/** Accordion built on native details/summary — no state, works everywhere. */
export function FAQ({ label = 'Questions', title = 'Asked by every data leader.', items = DEFAULT_ITEMS }: FAQProps) {
  return (
    <section className="dl-faq">
      <div className="dl-wrap">
        <SectionLabel>{label}</SectionLabel>
        {title && <h2 className="dl-h2">{title}</h2>}
        <div className="dl-faq-list">
          {items.map((it, i) => (
            <details className="dl-faq-item" key={it.q}>
              <summary className="dl-faq-q">
                <span className="dl-faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dl-faq-qtext">{it.q}</span>
                <span className="dl-faq-toggle" aria-hidden="true">+</span>
              </summary>
              <p className="dl-faq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
```

`design-system/src/components/CTABand.tsx`:
```tsx
import { Button } from './Button'
import { ConfluenceFigure } from './ConfluenceFigure'
import type { CtaSpec } from './Hero'

export interface CTABandProps {
  headline?: string
  lead?: string
  primaryCta?: CtaSpec
  secondaryCta?: CtaSpec
  /** Show the inverted confluence figure behind the copy (default true). */
  withFigure?: boolean
}

/** Full-width ink closing section. The blue CTA is the last word on the page. */
export function CTABand({
  headline = 'See what your data is capable of.',
  lead = 'Read-only credentials in. Board-ready Agent-Readiness Score out. 48 hours.',
  primaryCta = { label: 'Run the 48h audit', href: '#audit' },
  secondaryCta = { label: 'Talk to us', href: '#contact' },
  withFigure = true,
}: CTABandProps) {
  return (
    <section className="dl-ctaband dl-on-ink">
      <div className="dl-wrap dl-ctaband-in">
        <div className="dl-ctaband-copy">
          <h2 className="dl-ctaband-headline">{headline}</h2>
          {lead && <p className="dl-ctaband-lead">{lead}</p>}
          <div className="dl-ctaband-ctas">
            {primaryCta && <Button variant="blue" size="lg" href={primaryCta.href}>{primaryCta.label}</Button>}
            {secondaryCta && <Button variant="ghost" size="lg" href={secondaryCta.href}>{secondaryCta.label}</Button>}
          </div>
        </div>
        {withFigure && (
          <div className="dl-ctaband-figure">
            <ConfluenceFigure onInk sources={['databases', 'warehouses', 'documents', 'apps', 'streams']} mergedLabel="AGENT-READY" height={240} />
          </div>
        )}
      </div>
    </section>
  )
}
```

`design-system/src/components/Footer.tsx`:
```tsx
import { Logo } from './Logo'

export interface FooterProps {
  columns?: { title: string; links: { label: string; href: string }[] }[]
  note?: string
}

const DEFAULT_COLUMNS = [
  { title: 'Product', links: [ { label: 'Platform', href: '#platform' }, { label: 'The 48h audit', href: '#audit' }, { label: 'Pricing', href: '#pricing' } ] },
  { title: 'Company', links: [ { label: 'Method', href: '#method' }, { label: 'Writing', href: '#writing' }, { label: 'Contact', href: '#contact' } ] },
  { title: 'Trust', links: [ { label: 'Security', href: '#security' }, { label: 'Audit trail', href: '#trail' }, { label: 'Privacy', href: '#privacy' } ] },
]

/** Ink footer: wordmark, quiet link columns, one mono legal line. */
export function Footer({ columns = DEFAULT_COLUMNS, note = '© 2026 Datalith. Every source. One graph. Agent-ready.' }: FooterProps) {
  return (
    <footer className="dl-footer dl-on-ink">
      <div className="dl-wrap dl-footer-in">
        <div className="dl-footer-brand"><Logo /></div>
        <div className="dl-footer-cols">
          {columns.map(c => (
            <div className="dl-footer-col" key={c.title}>
              <span className="dl-footer-coltitle">{c.title}</span>
              <ul>{c.links.map(l => (<li key={l.href}><a href={l.href}>{l.label}</a></li>))}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="dl-wrap dl-footer-note">{note}</div>
    </footer>
  )
}
```

Append to `design-system/src/index.ts`:
```ts
export { FAQ, type FAQProps } from './components/FAQ'
export { CTABand, type CTABandProps } from './components/CTABand'
export { Footer, type FooterProps } from './components/Footer'
```

- [ ] **Step 4: Add styles**

Append to `design-system/src/styles.css`:
```css
/* FAQ */
.dl-faq { padding: var(--dl-space-9) 0; }
.dl-faq-list { margin-top: var(--dl-space-7); border-top: var(--dl-hairline); }
.dl-faq-item { border-bottom: var(--dl-hairline); }
.dl-faq-q { display: grid; grid-template-columns: 60px 1fr auto; gap: var(--dl-space-5); align-items: baseline; padding: var(--dl-space-5) 0; cursor: pointer; list-style: none; }
.dl-faq-q::-webkit-details-marker { display: none; }
.dl-faq-num { font-family: var(--dl-font-mono); font-size: var(--dl-text-small); color: var(--dl-blue); letter-spacing: 0.08em; }
.dl-faq-qtext { font-family: var(--dl-font-display); font-size: var(--dl-text-lead); font-weight: 600; letter-spacing: -0.01em; }
.dl-faq-toggle { font-family: var(--dl-font-mono); font-size: var(--dl-text-lead); color: var(--dl-grey-3); transition: transform var(--dl-ease); }
.dl-faq-item[open] .dl-faq-toggle { transform: rotate(45deg); color: var(--dl-blue); }
.dl-faq-a { padding: 0 0 var(--dl-space-5) 60px; color: var(--dl-grey-4); font-size: var(--dl-text-small); line-height: 1.7; max-width: 640px; }
@media (max-width: 640px) { .dl-faq-q { grid-template-columns: 40px 1fr auto; } .dl-faq-a { padding-left: 40px; } }

/* CTABand */
.dl-ctaband { padding: var(--dl-space-9) 0; }
.dl-ctaband-in { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--dl-space-7); align-items: center; }
@media (max-width: 900px) { .dl-ctaband-in { grid-template-columns: 1fr; } }
.dl-ctaband-headline { font-family: var(--dl-font-display); font-size: clamp(2rem, 4.4vw, 3.25rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.02; }
.dl-ctaband-lead { color: var(--dl-on-ink-muted); font-size: var(--dl-text-lead); margin-top: var(--dl-space-5); max-width: 460px; }
.dl-ctaband-ctas { display: flex; gap: var(--dl-space-4); margin-top: var(--dl-space-6); flex-wrap: wrap; }

/* Footer */
.dl-footer { border-top: var(--dl-hairline-ink); }
.dl-footer-in { display: grid; grid-template-columns: 1fr 2fr; gap: var(--dl-space-7); padding: var(--dl-space-8) 28px var(--dl-space-7); }
@media (max-width: 800px) { .dl-footer-in { grid-template-columns: 1fr; } }
.dl-footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--dl-space-6); }
@media (max-width: 560px) { .dl-footer-cols { grid-template-columns: 1fr; } }
.dl-footer-coltitle { font-family: var(--dl-font-mono); font-size: var(--dl-text-label); letter-spacing: 0.14em; text-transform: uppercase; color: var(--dl-on-ink-muted); }
.dl-footer-col ul { margin-top: var(--dl-space-4); display: flex; flex-direction: column; gap: 10px; }
.dl-footer-col a { font-size: var(--dl-text-small); color: var(--dl-on-ink); opacity: 0.85; transition: opacity var(--dl-ease); }
.dl-footer-col a:hover { opacity: 1; }
.dl-footer-note { border-top: var(--dl-hairline-ink); padding-top: var(--dl-space-5); padding-bottom: var(--dl-space-6); font-family: var(--dl-font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dl-on-ink-muted); }
```

- [ ] **Step 5: Write examples**

`design-system/src/examples/FAQ.example.tsx`:
```tsx
import { FAQ } from '../index'
export default <FAQ />
```

`design-system/src/examples/CTABand.example.tsx`:
```tsx
import { CTABand } from '../index'
export default <CTABand />
```

`design-system/src/examples/Footer.example.tsx`:
```tsx
import { Footer } from '../index'
export default <Footer />
```

- [ ] **Step 6: Final gates — full suite, typecheck, build, export count**

Run from `design-system/`:
```bash
npm run test && npm run typecheck && npm run build
node -e "import('./dist/index.js').then(m => { const n = Object.keys(m).length; console.log('exports:', n); if (n < 21) process.exit(1) })"
```
Expected: all PASS; `exports: 21` (21 components; type-only exports don't count at runtime).

- [ ] **Step 7: Commit**

```bash
git add design-system && git commit -m "feat(ds): FAQ, CTABand, Footer — complete 21-component Confluence library"
```

---

### Task 8: Run /design-sync (not a coding task — driver checklist)

**Files:**
- Create: `.design-sync/config.json`, `.design-sync/conventions.md`, `.design-sync/NOTES.md` (as the sync produces them)

This task is executed by the main session following the design-sync skill (package shape), NOT by a code subagent:

- [ ] Write `.design-sync/config.json` with `shape: "package"` and pointers into `design-system/` (converter config keys per the sub-skill's ASSUMPTION grep).
- [ ] Create the Claude Design project (§1 of the skill — new project, user confirms name), pin `projectId` immediately.
- [ ] Run converter, validate (`package-validate.mjs` clean), grade every component preview on the absolute rubric; fix and rebuild until the done-bar passes.
- [ ] Incremental upload path: one upfront approval, batches as components verify, close-out with reconciliation deletes, `_ds_sync.json` last.
- [ ] Author `.design-sync/conventions.md` (readmeHeader): token vocabulary, hairline idiom, pill-button/sharp-card rule, one-blue discipline, ConfluenceFigure usage; validate every named class/token against the build; rebuild via the driver; commit config + notes.
