// jsdom ships window.scrollTo as a stub that logs "Not implemented" to stderr.
// The demo router calls it on every client-side navigation (see router.ts), so
// without this every link-click test would print that error. Tests that assert
// on scrolling stub it themselves over the top of this no-op.
// Guarded: files that opt into the node environment (build.test.ts) have no window.
if (typeof window !== 'undefined') window.scrollTo = (() => {}) as typeof window.scrollTo
