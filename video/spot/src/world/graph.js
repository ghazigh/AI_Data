// The knowledge graph: six business domains around one hub, laid out once from a fixed seed.
import { rng, TAU } from '../math.js';

export const DOMAINS = ['Customers', 'Policies', 'Claims', 'Contracts', 'Support', 'Suppliers'];

export function buildGraph(center) {
  const R = rng(4242);
  const [gx, gy, gz] = center;
  const nodes = [];
  const edges = [];
  const add = (x, y, z, kind, cluster) => {
    nodes.push({ p: [x, y, z], kind, cluster, deg: 0 });
    return nodes.length - 1;
  };
  const hub = add(gx, gy, gz, 0, -1);

  // cluster centres: a slightly squashed ring with alternating lift, so every domain reads from the side
  const centres = [];
  for (let c = 0; c < 6; c++) {
    const a = (c / 6) * TAU + 0.35;
    const lift = (c % 2 ? 1 : -1) * 150;
    const cx = gx + Math.cos(a) * 390;
    const cy = gy + lift + Math.sin(a * 2) * 40;
    const cz = gz + Math.sin(a) * 330;
    centres.push(add(cx, cy, cz, 1, c));
  }
  // leaves on a small shell around each centre
  const leaves = [];
  for (let c = 0; c < 6; c++) {
    const [cx, cy, cz] = nodes[centres[c]].p;
    const ids = [];
    for (let k = 0; k < 6; k++) {
      const th = R() * TAU;
      const ph = Math.acos(2 * R() - 1);
      const r = 85 + R() * 70;
      // push leaves outward, away from the hub, so clusters bloom rather than overlap
      const ox = cx - gx, oy = cy - gy, oz = cz - gz;
      const ol = Math.hypot(ox, oy, oz) || 1;
      const x = cx + Math.sin(ph) * Math.cos(th) * r + (ox / ol) * 60;
      const y = cy + Math.cos(ph) * r * 0.8 + (oy / ol) * 60;
      const z = cz + Math.sin(ph) * Math.sin(th) * r + (oz / ol) * 60;
      ids.push(add(x, y, z, 2, c));
    }
    leaves.push(ids);
  }
  // relax a little so no two nodes sit on top of each other
  for (let it = 0; it < 40; it++) {
    for (let a = 1; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const pa = nodes[a].p, pb = nodes[b].p;
        const dx = pb[0] - pa[0], dy = pb[1] - pa[1], dz = pb[2] - pa[2];
        const d = Math.hypot(dx, dy, dz) || 1;
        const min = 95;
        if (d < min) {
          const f = ((min - d) / d) * 0.25;
          if (nodes[a].kind === 2) { pa[0] -= dx * f; pa[1] -= dy * f; pa[2] -= dz * f; }
          if (nodes[b].kind === 2) { pb[0] += dx * f; pb[1] += dy * f; pb[2] += dz * f; }
        }
      }
    }
  }
  const link = (a, b) => {
    edges.push([a, b]);
    nodes[a].deg++;
    nodes[b].deg++;
  };
  for (let c = 0; c < 6; c++) {
    link(hub, centres[c]);
    const ids = leaves[c];
    ids.forEach((id) => link(centres[c], id));
    // two chords inside the domain
    link(ids[0], ids[3]);
    link(ids[1], ids[4]);
  }
  // the rim: neighbouring domains share entities, so the domains ring the hub
  for (let c = 0; c < 6; c++) link(centres[c], centres[(c + 1) % 6]);
  // one entity-level link per neighbouring pair: the relationships that make it one graph
  for (let c = 0; c < 6; c++) link(leaves[c][Math.floor(R() * 6)], leaves[(c + 1) % 6][Math.floor(R() * 6)]);
  return { nodes, edges, hub, centres, leaves };
}
