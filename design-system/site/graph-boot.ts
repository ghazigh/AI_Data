/**
 * Decides whether the home page's stage 04 figure becomes the live 3D knowledge
 * graph, and defers everything that decision costs.
 *
 * This file is the only thing the home page loads up front, and it deliberately
 * imports no React: the island and its React runtime are ~150KB, and the scene
 * behind them the best part of a megabyte. Neither should be paid for by a
 * visitor who reads the hero and leaves. So the import waits for the figure to
 * approach the viewport, and never happens at all where the scene could not be
 * drawn — in which case the SVG figure already in the HTML simply stays.
 */

/** True only where a real WebGL context can actually be created. The same check
 * the demo's own GraphCanvas3D makes, for the same reason: a browser that
 * cannot render the scene should keep the figure it already has, not a blank
 * rectangle. */
const supportsWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

const mounts = document.querySelectorAll('[data-graph-island]')

if (mounts.length && supportsWebGL()) {
  // Each island names the estate it wants: the home page's stage 04 draws the
  // demo tenant, the banking page draws a bank.
  const load = (el: Element) => import('./graph-island').then(m => {
    if (el.getAttribute('data-graph-island') === 'bank') m.mountBankGraph(el)
    else m.mountStageGraph(el)
  })

  // The scene labels itself in HTML at a fixed size, which a phone-width column
  // cannot hold — the cluster names run off both edges. There the static figure
  // in the markup is the better answer, so the island simply never mounts.
  const tooNarrow = () => window.innerWidth < 720

  // A generous root margin, so the download starts while the visitor is still
  // reading the section above and the scene is already there when they arrive.
  mounts.forEach(mount => {
    if (tooNarrow()) return
    if (typeof IntersectionObserver === 'function') {
      const io = new IntersectionObserver(entries => {
        if (!entries.some(e => e.isIntersecting)) return
        io.disconnect()
        void load(mount)
      }, { rootMargin: '600px 0px' })
      io.observe(mount)
    } else {
      void load(mount)
    }
  })
}
