// Entry: builds the world and the film timeline. index.html registers the result on window.__timelines.
import { DUR } from './config.js';
import { createWorld } from './world/index.js';
import { buildTimeline } from './film/timeline.js';

window.__buildFilm = function buildFilm() {
  const gsap = window.gsap;
  const root = document.getElementById('root');
  const aspect = root.dataset.aspect || '16x9';
  const tl = gsap.timeline({ paused: true });
  const world = createWorld(document.getElementById('gl'), aspect);
  window.__world = world;
  const film = buildTimeline(tl, aspect);
  // one driver: the 3D world and every overlay anchored to it are pure functions of t
  const D = { t: 0 };
  const draw = () => film.place(world.render(D.t), D.t);
  tl.to(D, { t: DUR, duration: DUR, ease: 'none', onUpdate: draw }, 0);
  draw();
  return tl;
};
