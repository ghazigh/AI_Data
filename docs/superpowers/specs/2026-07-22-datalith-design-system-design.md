# Datalith Design System ("Confluence") — Design Spec

**Date:** 2026-07-22
**Status:** Approved by founder (brainstorm rounds 1–3, direction G selected)
**Goal:** A React component library encoding Datalith's new visual identity, built in this repo and synced to claude.ai/design so the design agent builds the Datalith website from real, on-brand components.

## 1. Design direction — "Confluence"

The identity embodies what Datalith does: **many sources merging into one graph**. Artistic, modern, minimalist. Everything is quiet except one signature element per view.

Rejected directions (for the record): dark gradient-glow AI infra, generic light SaaS, aurora mesh (round 1 — "basic, cheesy, looks very AI"); survey plate, Braun instrument, carved monolith (round 2 — superseded by the merge brief); overprint/riso (round 3 alternative).

**Selected:** Direction G — Confluence. Hairline streams (one per data source) converge into a single bold International-Klein-Blue line. Gallery-white canvas, black ink, one blue. "Every source. One graph." rendered as geometry.

## 2. Foundations

### 2.1 Color tokens

| Token | Value | Role |
|---|---|---|
| `--dl-canvas` | `#FCFCFB` | Page background (gallery white) |
| `--dl-paper` | `#FFFFFF` | Card / raised surfaces |
| `--dl-ink` | `#101013` | Primary text, solid buttons, wordmark |
| `--dl-blue` | `#0031E3` | THE accent (International Klein Blue). Used surgically: the merged line, key CTAs, selection, one highlighted word |
| `--dl-blue-wash` | `#EEF1FE` | Blue tint backgrounds (badges, hovers) |
| `--dl-grey-1` | `#F1F1EE` | Subtle fills, alternating rows |
| `--dl-grey-2` | `#E4E4E0` | Hairlines, borders |
| `--dl-grey-3` | `#9A9AA2` | Muted labels, captions |
| `--dl-grey-4` | `#6D6D76` | Secondary text |
| `--dl-ink-2` | `#1A1A1E` | Dark-section raised surface |
| `--dl-on-ink` | `#F4F4F2` | Text on ink sections |
| `--dl-on-ink-muted` | `#8F8F98` | Muted text on ink sections |
| `--dl-ok` | `#1E7A46` | Success (sparing) |
| `--dl-warn` | `#B7791F` | Warning (sparing) |

Dark "ink sections" (footer, CTA band) invert: `--dl-ink` background, `--dl-on-ink` text, blue stays `#3D5FFF` (raised for contrast on dark).

### 2.2 Typography

| Face | Role | Notes |
|---|---|---|
| **Schibsted Grotesk** | Display: h1–h3, stats, wordmark | Tight tracking (−0.02…−0.035em), weights 500–800 |
| **Geist** | Body, UI, buttons | Weights 300–700 |
| **Geist Mono** | Labels, eyebrows, data, captions | Uppercase + letterspaced for labels |

Self-hosted woff2 files ship in the package (`src/fonts/` → `dist`); `@font-face` in `styles.css`. No runtime Google Fonts dependency.

Type scale (rem): 12 label / 14 small / 16 body / 20 lead / 28 h3 / 40 h2 / 56 h1 / 72 display. Line-heights ~1.0–1.05 display, 1.6 body.

### 2.3 Shape & space

- **Buttons:** pill (`border-radius: 999px`).
- **Cards/surfaces:** sharp corners (`border-radius: 0`) with 1px hairline borders — the gallery aesthetic. Exception: small chips/badges are pill.
- **Structure by hairline:** 1px `--dl-grey-2` rules divide sections and rows; whitespace does the layout work.
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px (`--dl-space-*`).
- **Motion:** minimal. 0.18s ease transitions on interactive states; confluence line may draw in via CSS (`stroke-dashoffset`); `prefers-reduced-motion` respected.

## 3. Components (21)

### Primitives (8)

1. **`Button`** — `variant: 'ink' | 'blue' | 'ghost'`, `size: 'sm' | 'md' | 'lg'`, `href?`, `onClick?`. Pill. Ink = solid black; blue = solid IKB; ghost = 1px ink outline.
2. **`TextLink`** — mono-face inline link with arrow affordance. `href`, `children`.
3. **`Badge`** — pill chip. `tone: 'ink' | 'blue' | 'neutral' | 'ok' | 'warn'`.
4. **`SectionLabel`** — mono uppercase eyebrow with optional leading rule. `children`, `rule?: boolean`.
5. **`Stat`** — big Schibsted number + mono label + optional source caption. `value`, `label`, `source?`.
6. **`Card`** — sharp-cornered hairline surface. `title?`, `label?`, `children`, `tone: 'paper' | 'canvas' | 'ink'`, `padding`.
7. **`Input`** — text/email input: sharp-cornered box, 1px hairline border, blue border on focus; mono label above. `label`, `placeholder`, `type`.
8. **`Logo`** — "datalith" wordmark (lowercase Schibsted 700) with optional confluence glyph (three lines merging into one, pure SVG). `size`, `withGlyph?`, `onInk?`.

### Signature (2)

9. **`ConfluenceFigure`** — THE brand artwork as a component. SVG: N hairline bezier streams (labeled with source names) converging to a node, then one bold blue line labeled configurable (default "ONE GRAPH"). Props: `sources: string[]`, `mergedLabel?`, `animated?`, `height?`. Ink-on-light and light-on-ink variants.
10. **`ScoreMeter`** — Agent-Readiness Score readout: large numeral, 0–100 tick scale with blue position marker, mono caption. `value: number`, `label?`, `caption?`.

### Sections (11)

11. **`Navbar`** — Logo left, links center/right, CTA button. `links: {label, href}[]`, `cta?: {label, href}`, sticky, canvas background with hairline bottom.
12. **`Hero`** — two-column: display headline (supports a blue `<em>` word), lead, CTA pair, right slot defaulting to `ConfluenceFigure`. `headline`, `accent?`, `lead`, `primaryCta`, `secondaryCta?`, `figure?: ReactNode`.
13. **`LogoStrip`** — mono-label "trusted by / integrates with" row of names (text-based, greyed). `title?`, `items: string[]`.
14. **`FeatureGrid`** — the six modules as hairline-divided grid cells: mono index, title, body. `items: {label, title, body}[]`, `columns?: 2 | 3`.
15. **`StatBand`** — 3-up `Stat` row divided by hairlines. `stats: StatProps[]`.
16. **`Steps`** — numbered how-it-works rows (order is real sequence: connect → graph → serve). `steps: {title, body}[]`.
17. **`Quote`** — editorial pull-quote with attribution. `quote`, `name`, `role`.
18. **`PricingTable`** — tier columns (Growth / Scale / Enterprise), hairline grid, blue highlight on featured tier. `tiers: {name, price, period?, blurb, features[], cta, featured?}[]`.
19. **`FAQ`** — accordion, mono numbering, hairline dividers. `items: {q, a}[]`.
20. **`CTABand`** — full-width ink section: display headline, lead, CTA pair, optional inverted confluence figure. `headline`, `lead?`, `primaryCta`, `secondaryCta?`.
21. **`Footer`** — ink section: logo, link columns, mono legal line. `columns: {title, links[]}[]`, `note?`.

All components: typed props with JSDoc, sensible defaults using real Datalith copy (from README/docs) so zero-prop renders look real, no external runtime deps beyond `react`.

## 4. Repository structure

```
design-system/
  package.json          # @datalith/ui — react peer dep, tsup build
  tsconfig.json         # strict
  src/
    index.ts            # exports all components
    styles.css          # @font-face + tokens import + component styles
    tokens.css          # custom properties (§2)
    fonts/              # woff2: SchibstedGrotesk, Geist, GeistMono
    components/
      Button.tsx … Footer.tsx   # one file per component
    examples/
      <Name>.example.tsx        # one canonical usage per component (feeds .prompt.md)
```

Build: `tsup src/index.ts --format esm,cjs --dts` + copy `styles.css`/`tokens.css`/`fonts` to `dist/`. Node ≥18, npm (package-lock committed).

## 5. Quality gates

1. `tsc --noEmit` strict passes.
2. `npm run build` produces `dist/` cleanly.
3. Design-sync package-shape pipeline: `package-validate.mjs` exits clean; every component preview graded on the absolute rubric before upload.
4. Accessibility floor: visible focus states (2px blue outline), semantic elements (nav/section/footer/button), reduced-motion respected, AA contrast (ink on canvas 18:1; blue on white 8.2:1).

## 6. Sync plan (after build)

Run `/design-sync` package shape on `design-system/`: write `.design-sync/config.json`, run converter, verify previews, create new Claude Design project ("Datalith — Confluence"), incremental upload, author conventions header teaching the design agent: token vocabulary, hairline-structure idiom, pill-button/sharp-card rule, one-blue-accent discipline, and ConfluenceFigure usage.

## 7. Out of scope

- App/product UI components (tables, modals, charts) — future iteration.
- Rebuilding `landing/index.html` or the pitch deck in the new identity (can follow once the DS exists in Claude Design).
- Multi-theme support beyond the built-in ink sections.
