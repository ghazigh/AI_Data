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

const mount = document.querySelector('[data-graph-island]')

if (mount && supportsWebGL()) {
  const load = () => import('./graph-island').then(m => m.mountStageGraph(mount))

  // A generous root margin, so the download starts while the visitor is still
  // reading stage 03 and the scene is already there when they arrive at 04.
  if (typeof IntersectionObserver === 'function') {
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return
      io.disconnect()
      void load()
    }, { rootMargin: '600px 0px' })
    io.observe(mount)
  } else {
    void load()
  }
}
