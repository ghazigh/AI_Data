# Building with @datalith/ui — the Confluence system

Datalith's identity: **many sources merging into one**. Gallery-white canvas, black ink, ONE Klein-blue accent, hairline structure. Everything quiet except one signature element per view.

## Setup (required)

Wrap every page you build in the root class — the tokens, background, fonts, and link/list resets live there:

```jsx
<div className="dl-root">
  <Navbar /> … <Footer />
</div>
```

Without `dl-root`, text falls back to browser defaults. Dark sections are built in: `CTABand` and `Footer` invert themselves; put custom content on dark via `<div className="dl-on-ink">…</div>` and child components restyle automatically (`Card tone="ink"`, `ConfluenceFigure onInk`, `Logo onInk`).

## Styling idiom

No utility-class system and no CSS-in-JS. Components carry their own `dl-*` classes — never invent new `dl-*` names. For your own layout glue use inline styles (or a `<style>` block) built from the tokens:

- Surfaces: `var(--dl-canvas)` page, `var(--dl-paper)` cards, `var(--dl-ink)` dark sections, `var(--dl-ink-2)` raised-on-dark
- Text: `var(--dl-ink)`, muted `var(--dl-grey-4)`, faint labels `var(--dl-grey-3)`; on dark: `var(--dl-on-ink)` / `var(--dl-on-ink-muted)`
- THE accent: `var(--dl-blue)` (#0031E3) — use once per view (key CTA, one highlighted word, the merged line); on dark use `var(--dl-blue-bright)`; tint `var(--dl-blue-wash)`; status `var(--dl-ok)` / `var(--dl-warn)`
- Type: `var(--dl-font-display)` (Schibsted Grotesk, tight tracking, headlines), `var(--dl-font-body)` (Geist), `var(--dl-font-mono)` (Geist Mono — uppercase letterspaced labels, data)
- Sizes: `var(--dl-text-label|small|body|lead|h3|h2|h1|display)`; spacing `var(--dl-space-1…10)` (4→128px)
- Shape rules: buttons/chips are pills (`var(--dl-radius-pill)`); cards and inputs are SHARP (radius 0); structure with 1px hairlines `var(--dl-hairline)` (`--dl-hairline-ink` on dark); transitions `var(--dl-ease)`
- Content width: `<div className="dl-wrap">` (max `var(--dl-max-width)`, centered)

## Where the truth lives

Read `styles.css` (tokens are defined at the top; `_ds_bundle.css` in its import closure holds every component style) and each component's `<Name>.d.ts` + `<Name>.prompt.md`. All 21 components: Badge, Button, CTABand, Card, ConfluenceFigure, FAQ, FeatureGrid, Footer, Hero, Input, Logo, LogoStrip, Navbar, PricingTable, Quote, ScoreMeter, SectionLabel, Stat, StatBand, Steps, TextLink. Zero-prop renders ship real Datalith copy — override props for new content.

## Idiomatic page skeleton

```jsx
<div className="dl-root">
  <Navbar />
  <Hero headline={'Every source.\nOne graph.'} accent="Agent-ready." />
  <LogoStrip />
  <FeatureGrid />
  <section style={{ padding: 'var(--dl-space-9) 0' }}>
    <div className="dl-wrap">
      <SectionLabel>The score</SectionLabel>
      <h2 className="dl-h2">Board-ready in 48 hours.</h2>
      <div style={{ display: 'flex', gap: 'var(--dl-space-7)', marginTop: 'var(--dl-space-7)' }}>
        <ScoreMeter value={87} caption="Certified · full audit" />
        <ConfluenceFigure sources={['databases','warehouses','documents','apps','streams']} height={240} />
      </div>
    </div>
  </section>
  <PricingTable />
  <FAQ />
  <CTABand />
  <Footer />
</div>
```

Gotchas: `Button` with `href` renders an anchor (same look). `Hero` headline takes `\n` for line breaks; `accent` is the one blue phrase. `FAQ` uses native `<details>` — no state needed. Navbar links hide below 760px (no mobile menu — out of scope). Signature moves: `ConfluenceFigure` for "everything merges" moments; `ScoreMeter` for the ARS.
