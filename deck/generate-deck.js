// Datalith seed pitch deck generator — run: node generate-deck.js
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

// palette (dark premium, matches landing page)
const BG = "070B14", PANEL = "111C31", PANEL2 = "0E1626", LINE = "26334F";
const TXT = "E8EEFC", MUT = "93A3C4", DIM = "5C6B8C";
const CYAN = "38BDF8", IND = "818CF8", PUR = "C084FC", OK = "34D399", WARN = "FBBF24";
const F = "Calibri";
const W = 13.33, M = 0.7;

function base(num, kicker) {
  const s = p.addSlide();
  s.background = { color: BG };
  if (kicker) {
    s.addText(kicker.toUpperCase(), { x: M, y: 0.42, w: 6, h: 0.3, fontFace: F, fontSize: 12, bold: true, color: CYAN, charSpacing: 3, margin: 0 });
  }
  s.addText([{ text: "DATALITH", options: { color: DIM, bold: true } }, { text: `   ·   ${num}`, options: { color: DIM } }],
    { x: W - 3.2, y: 7.08, w: 2.5, h: 0.25, fontFace: F, fontSize: 9, align: "right", margin: 0 });
  return s;
}
function title(s, text, y = 0.78, size = 33, w = W - 2 * M) {
  s.addText(text, { x: M, y, w, h: 1.15, fontFace: F, fontSize: size, bold: true, color: TXT, margin: 0, lineSpacingMultiple: 1.02 });
}
function card(s, x, y, w, h, fill = PANEL) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.09, fill: { color: fill }, line: { color: LINE, width: 0.75 } });
}
function chip(s, x, y, label, color) {
  s.addShape("roundRect", { x, y, w: 0.52, h: 0.52, rectRadius: 0.12, fill: { color }, line: { type: "none" } });
  s.addText(label, { x, y, w: 0.52, h: 0.52, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: BG, margin: 0 });
}

/* ---------- 1. COVER ---------- */
{
  const s = p.addSlide();
  s.background = { color: BG };
  // subtle node-graph decoration
  const pts = [[1.1,1.0],[2.3,2.1],[0.9,3.4],[2.0,5.2],[1.5,6.4],[11.6,0.9],[12.4,2.4],[11.2,3.3],[12.5,5.0],[11.8,6.3],[10.6,5.6]];
  const edges = [[0,1],[1,2],[1,3],[3,4],[5,6],[6,7],[7,8],[8,9],[8,10]];
  edges.forEach(([a,b]) => s.addShape("line", { x: pts[a][0], y: pts[a][1], w: pts[b][0]-pts[a][0], h: pts[b][1]-pts[a][1], line: { color: LINE, width: 0.75 } }));
  pts.forEach(([x,y],i) => s.addShape("ellipse", { x: x-0.05, y: y-0.05, w: 0.1, h: 0.1, fill: { color: i%3===0 ? PUR : (i%3===1 ? CYAN : IND) }, line: { type: "none" } }));

  s.addShape("roundRect", { x: 5.42, y: 1.28, w: 2.5, h: 0.44, rectRadius: 0.22, fill: { color: PANEL }, line: { color: LINE, width: 1 } });
  s.addText("THE AGENTIC DATA CENTER", { x: 5.42, y: 1.28, w: 2.5, h: 0.44, align: "center", valign: "middle", fontFace: F, fontSize: 10.5, bold: true, color: CYAN, charSpacing: 2, margin: 0 });
  s.addText("Datalith", { x: 1.5, y: 2.35, w: 10.33, h: 1.4, align: "center", fontFace: F, fontSize: 76, bold: true, color: TXT, margin: 0 });
  s.addText([
    { text: "Every source. ", options: { color: CYAN } },
    { text: "One graph. ", options: { color: IND } },
    { text: "Agent-ready.", options: { color: PUR } },
  ], { x: 1.5, y: 3.85, w: 10.33, h: 0.55, align: "center", fontFace: F, fontSize: 24, bold: true, margin: 0 });
  s.addText("Connect every data source, build your Enterprise Knowledge Graph,\nand serve governed, agent-ready data to any AI agent.",
    { x: 2.7, y: 4.55, w: 7.93, h: 0.85, align: "center", fontFace: F, fontSize: 14.5, color: MUT, margin: 0 });
  s.addText("Seed Round  ·  $4.0M  ·  2026", { x: 1.5, y: 6.15, w: 10.33, h: 0.4, align: "center", fontFace: F, fontSize: 14, bold: true, color: TXT, margin: 0 });
  s.addNotes("Datalith is the agentic data center: the layer between the enterprise data estate and the agent workforce. Raising $4M seed.");
}

/* ---------- 2. PROBLEM ---------- */
{
  const s = base("02", "The problem");
  title(s, "Enterprises are deploying agents on data\nthat isn't ready for them.");
  const cards = [
    { n: ">40%", c: CYAN, h: "Projects will be canceled", b: "Gartner: over 40% of agentic AI projects canceled by end of 2027 — cost, unclear value, weak risk controls.", src: "Gartner, 2025" },
    { n: "60–75%", c: IND, h: "Effort burned on data prep", b: "Of every agent project's effort goes to preparing data agents can actually consume. Pilots stall before ROI.", src: "Field analyses, 2026" },
    { n: "20+", c: PUR, h: "Silos per enterprise", b: "Warehouses, SaaS, wikis, tickets, drives. Every team hand-rolls brittle one-off integrations — with no semantics, no audit trail.", src: "Enterprise estate benchmarks" },
  ];
  cards.forEach((c, i) => {
    const x = M + i * 4.05;
    card(s, x, 2.5, 3.75, 3.9);
    s.addText(c.n, { x: x + 0.3, y: 2.85, w: 3.15, h: 0.85, fontFace: F, fontSize: 44, bold: true, color: c.c, margin: 0 });
    s.addText(c.h, { x: x + 0.3, y: 3.85, w: 3.15, h: 0.4, fontFace: F, fontSize: 15.5, bold: true, color: TXT, margin: 0 });
    s.addText(c.b, { x: x + 0.3, y: 4.3, w: 3.15, h: 1.5, fontFace: F, fontSize: 12, color: MUT, margin: 0, lineSpacingMultiple: 1.12 });
    s.addText(c.src, { x: x + 0.3, y: 5.9, w: 3.15, h: 0.3, fontFace: F, fontSize: 9.5, italic: true, color: DIM, margin: 0 });
  });
  s.addText("The bottleneck is not the model, the framework, or the protocol. It is the data.",
    { x: M, y: 6.65, w: W - 2 * M, h: 0.4, align: "center", fontFace: F, fontSize: 15, italic: true, bold: true, color: TXT, margin: 0 });
  s.addNotes("Agents fail quietly: stale data, no semantics, no permissions. Gartner 40% cancellation stat anchors urgency; data prep is where the money dies.");
}

/* ---------- 3. WHY NOW ---------- */
{
  const s = base("03", "Why now");
  title(s, "Three curves are crossing in 2026.");
  const rows = [
    { k: "01", c: CYAN, h: "Agent adoption is exploding", b: "17% of organizations run agents today; 60%+ plan to within two years. Every one of them hits the data wall." },
    { k: "02", c: IND, h: "MCP standardized the pipe — not the content", b: "Gartner: 60% of MCP-only agentic analytics projects will fail by 2028. “MCP moves context. It does not produce it.”" },
    { k: "03", c: PUR, h: "Context is becoming shared infrastructure", b: "89% of teams are investing in context management in the next 12 months; 93% will treat it as shared infrastructure. (DataHub, 2026)" },
  ];
  rows.forEach((r, i) => {
    const y = 2.45 + i * 1.32;
    card(s, M, y, 11.93, 1.12);
    chip(s, M + 0.3, y + 0.3, r.k, r.c);
    s.addText(r.h, { x: M + 1.1, y: y + 0.16, w: 10.4, h: 0.4, fontFace: F, fontSize: 16, bold: true, color: TXT, margin: 0 });
    s.addText(r.b, { x: M + 1.1, y: y + 0.56, w: 10.4, h: 0.45, fontFace: F, fontSize: 12.5, color: MUT, margin: 0 });
  });
  s.addText("The model war is over for buyers. The context war is starting.",
    { x: M, y: 6.6, w: W - 2 * M, h: 0.45, align: "center", fontFace: F, fontSize: 17, bold: true, italic: true, color: CYAN, margin: 0 });
  s.addNotes("Window: agents everywhere + MCP exposing the missing semantic layer + budgets explicitly allocated to context infrastructure in the next 12 months.");
}

/* ---------- 4. TWO PROMISES ---------- */
{
  const s = base("04", "What clients get");
  title(s, "Two promises: see everything.\nMake everything agent-ready.");
  // pillar 1 — visibility
  card(s, M, 2.5, 5.85, 3.75);
  s.addText("PROMISE 01 — SEE EVERYTHING", { x: M + 0.35, y: 2.8, w: 5.15, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: CYAN, charSpacing: 2, margin: 0 });
  s.addText("Visibility. Transparency. Control.", { x: M + 0.35, y: 3.15, w: 5.15, h: 0.45, fontFace: F, fontSize: 19, bold: true, color: TXT, margin: 0 });
  s.addText("Clients have data everywhere — and no idea what they have or what's happening in their databases. Datalith maps the whole estate into one live dashboard.",
    { x: M + 0.35, y: 3.68, w: 5.15, h: 0.85, fontFace: F, fontSize: 12, color: MUT, margin: 0, lineSpacingMultiple: 1.12 });
  [
    ["Live estate map", "every source, table & document, auto-discovered"],
    ["Activity stream", "what's changing, going stale, or breaking — live"],
    ["Control & audit", "who (human or agent) touches what, fully logged"],
  ].forEach(([h, b], i) => {
    const y = 4.62 + i * 0.5;
    s.addShape("ellipse", { x: M + 0.38, y: y + 0.08, w: 0.12, h: 0.12, fill: { color: CYAN }, line: { type: "none" } });
    s.addText([{ text: h + " — ", options: { bold: true, color: TXT } }, { text: b, options: { color: MUT } }],
      { x: M + 0.65, y, w: 4.9, h: 0.42, fontFace: F, fontSize: 11.5, margin: 0 });
  });
  // pillar 2 — agent-ready + potential
  card(s, 6.78, 2.5, 5.85, 3.75);
  s.addText("PROMISE 02 — MAKE IT WORK FOR AGENTS", { x: 7.13, y: 2.8, w: 5.15, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: PUR, charSpacing: 2, margin: 0 });
  s.addText("Agent-ready. Potential unlocked.", { x: 7.13, y: 3.15, w: 5.15, h: 0.45, fontFace: F, fontSize: 19, bold: true, color: TXT, margin: 0 });
  s.addText("Every modality — tables, docs, tickets, transcripts — prepared for agents. Then we detect the potential sleeping in the data and suggest what to build with it.",
    { x: 7.13, y: 3.68, w: 5.15, h: 0.85, fontFace: F, fontSize: 12, color: MUT, margin: 0, lineSpacingMultiple: 1.12 });
  [
    ["Agent-ready, agent-friendly", "cleaned, typed, chunked, embedded, scored"],
    ["Potential detection", "automation opportunities mined from your DBs"],
    ["Suggested workflows & knowledge bases", "deployable, topic by topic"],
  ].forEach(([h, b], i) => {
    const y = 4.62 + i * 0.5;
    s.addShape("ellipse", { x: 7.16, y: y + 0.08, w: 0.12, h: 0.12, fill: { color: PUR }, line: { type: "none" } });
    s.addText([{ text: h + " — ", options: { bold: true, color: TXT } }, { text: b, options: { color: MUT } }],
      { x: 7.43, y, w: 4.9, h: 0.42, fontFace: F, fontSize: 11.5, margin: 0 });
  });
  s.addText("First we show you what you have. Then we turn it into an agent workforce.",
    { x: M, y: 6.6, w: W - 2 * M, h: 0.4, align: "center", fontFace: F, fontSize: 15, bold: true, italic: true, color: CYAN, margin: 0 });
  s.addNotes("The value prop in two beats. Beat 1: visibility, transparency, control — the estate made legible. Beat 2: agent-readiness across all modalities, plus detected potential: suggested agentic workflows and knowledge bases.");
}

/* ---------- 5. SOLUTION ---------- */
{
  const s = base("05", "The solution");
  title(s, "Datalith: the agentic data center.");
  s.addText("Connect read-only. Get your Agent-Readiness Score in 48 hours. No migration.",
    { x: M, y: 1.75, w: 11, h: 0.4, fontFace: F, fontSize: 15, color: MUT, margin: 0 });
  // flow: estate -> datalith -> agents
  card(s, M, 2.6, 3.3, 3.5, PANEL2);
  s.addText("YOUR DATA ESTATE", { x: M + 0.25, y: 2.8, w: 2.8, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: DIM, charSpacing: 2, margin: 0 });
  ["Snowflake · BigQuery", "Postgres · MongoDB", "Salesforce · Zendesk", "Notion · SharePoint", "S3 · Kafka · Drive"].forEach((t, i) => {
    s.addShape("roundRect", { x: M + 0.25, y: 3.25 + i * 0.56, w: 2.8, h: 0.42, rectRadius: 0.08, fill: { color: PANEL }, line: { color: LINE, width: 0.75 } });
    s.addText(t, { x: M + 0.25, y: 3.25 + i * 0.56, w: 2.8, h: 0.42, align: "center", valign: "middle", fontFace: F, fontSize: 11, color: MUT, margin: 0 });
  });
  s.addShape("rightArrow", { x: 4.25, y: 4.1, w: 0.75, h: 0.5, fill: { color: IND }, line: { type: "none" } });
  // datalith core
  card(s, 5.15, 2.6, 3.9, 3.5, PANEL);
  s.addText("DATALITH", { x: 5.15, y: 2.85, w: 3.9, h: 0.35, align: "center", fontFace: F, fontSize: 15, bold: true, color: TXT, charSpacing: 2, margin: 0 });
  const core = [["Enterprise Knowledge Graph", PUR], ["Topics · semantic layer", IND], ["Agent-Readiness Score", CYAN], ["Preparation engine", OK], ["Governed MCP Gateway", WARN]];
  core.forEach(([t, c], i) => {
    s.addShape("roundRect", { x: 5.45, y: 3.3 + i * 0.56, w: 3.3, h: 0.42, rectRadius: 0.08, fill: { color: PANEL2 }, line: { color: c, width: 1 } });
    s.addText(t, { x: 5.45, y: 3.3 + i * 0.56, w: 3.3, h: 0.42, align: "center", valign: "middle", fontFace: F, fontSize: 11.5, bold: true, color: TXT, margin: 0 });
  });
  s.addShape("rightArrow", { x: 9.3, y: 4.1, w: 0.75, h: 0.5, fill: { color: IND }, line: { type: "none" } });
  card(s, 10.2, 2.6, 2.43, 3.5, PANEL2);
  s.addText("YOUR AGENTS", { x: 10.2, y: 2.8, w: 2.43, h: 0.3, align: "center", fontFace: F, fontSize: 11, bold: true, color: DIM, charSpacing: 2, margin: 0 });
  ["Support agent", "Sales agent", "Finance agent", "Analytics agent", "Any MCP client"].forEach((t, i) => {
    s.addShape("roundRect", { x: 10.45, y: 3.25 + i * 0.56, w: 1.93, h: 0.42, rectRadius: 0.08, fill: { color: PANEL }, line: { color: LINE, width: 0.75 } });
    s.addText(t, { x: 10.45, y: 3.25 + i * 0.56, w: 1.93, h: 0.42, align: "center", valign: "middle", fontFace: F, fontSize: 10.5, color: MUT, margin: 0 });
  });
  s.addText("Precedent: JetScale raised an oversubscribed seed doing this for cloud spend. Datalith does it for the data estate — a larger, stickier surface.",
    { x: M, y: 6.55, w: W - 2 * M, h: 0.5, align: "center", fontFace: F, fontSize: 12.5, italic: true, color: MUT, margin: 0 });
  s.addNotes("One diagram: estate in, Datalith graph/score/prepare/govern in the middle, any agent out. Read-only wedge kills the security objection.");
}

/* ---------- 6. PRODUCT ---------- */
{
  const s = base("06", "Product");
  title(s, "Six modules. One loop.", 0.78, 33, 7);
  s.addText("Connect → Graph → Score → Prepare → Serve → Recommend",
    { x: M, y: 1.72, w: 11.9, h: 0.4, fontFace: F, fontSize: 15, bold: true, color: CYAN, margin: 0 });
  const mods = [
    { n: "01", c: CYAN, h: "Connect", b: "150+ connectors. Multi-source, multi-platform, multi-modal: tables, docs, tickets, transcripts." },
    { n: "02", c: IND, h: "Graph", b: "Enterprise Knowledge Graph: auto-ontology, cross-source identity resolution, lineage on every node." },
    { n: "03", c: PUR, h: "Topics", b: "The semantic layer agents trust: domains, canonical metrics, glossary, authoritative sources." },
    { n: "04", c: OK, h: "Ready", b: "Prep engine: clean, dedup, chunk, embed, mask PII — scored by the Agent-Readiness Score (0–100)." },
    { n: "05", c: WARN, h: "Gateway", b: "One governed MCP endpoint. Per-agent identity, least-privilege scopes, full audit log." },
    { n: "06", c: "F472B6", h: "Flows", b: "Mines the graph for automation opportunities; ships deployable agent blueprints with ROI attached." },
  ];
  mods.forEach((m, i) => {
    const x = M + (i % 3) * 4.05, y = 2.45 + Math.floor(i / 3) * 2.15;
    card(s, x, y, 3.75, 1.95);
    chip(s, x + 0.28, y + 0.28, m.n, m.c);
    s.addText("Datalith " + m.h, { x: x + 0.95, y: y + 0.3, w: 2.6, h: 0.4, fontFace: F, fontSize: 15.5, bold: true, color: TXT, margin: 0 });
    s.addText(m.b, { x: x + 0.28, y: y + 0.92, w: 3.2, h: 0.95, fontFace: F, fontSize: 11, color: MUT, margin: 0, lineSpacingMultiple: 1.1 });
  });
  s.addText("Every agent interaction feeds back into scoring and recommendations — the loop compounds.",
    { x: M, y: 6.85, w: W - 2 * M, h: 0.35, align: "center", fontFace: F, fontSize: 12.5, italic: true, color: MUT, margin: 0 });
  s.addNotes("Walk the loop once, then name the six sellable modules. Flows is the expansion engine: readiness tool becomes revenue driver.");
}

/* ---------- 7. COMMAND (product visual) ---------- */
{
  const s = base("07", "Command");
  title(s, "Your whole estate. One dashboard.", 0.78, 33, 9);
  // window frame
  card(s, M, 1.9, 11.93, 4.55, PANEL2);
  s.addShape("ellipse", { x: M + 0.25, y: 2.1, w: 0.12, h: 0.12, fill: { color: "FF5F57" }, line: { type: "none" } });
  s.addShape("ellipse", { x: M + 0.45, y: 2.1, w: 0.12, h: 0.12, fill: { color: "FEBC2E" }, line: { type: "none" } });
  s.addShape("ellipse", { x: M + 0.65, y: 2.1, w: 0.12, h: 0.12, fill: { color: "28C840" }, line: { type: "none" } });
  s.addText("datalith command — acme corp", { x: M + 0.95, y: 2.02, w: 5, h: 0.28, fontFace: F, fontSize: 10, color: DIM, margin: 0 });
  // ARS panel
  card(s, M + 0.3, 2.55, 3.4, 3.6, PANEL);
  s.addText("AGENT-READINESS SCORE", { x: M + 0.55, y: 2.75, w: 2.9, h: 0.28, fontFace: F, fontSize: 9.5, bold: true, color: DIM, charSpacing: 1.5, margin: 0 });
  s.addShape("ellipse", { x: M + 0.75, y: 3.25, w: 1.55, h: 1.55, fill: { color: PANEL2 }, line: { color: CYAN, width: 4 } });
  s.addText("74", { x: M + 0.75, y: 3.25, w: 1.55, h: 1.55, align: "center", valign: "middle", fontFace: F, fontSize: 34, bold: true, color: TXT, margin: 0 });
  const dims = [["Freshness", "82"], ["Semantics", "71"], ["Governance", "68"], ["Coverage", "76"]];
  dims.forEach(([k, v], i) => {
    s.addText(k, { x: M + 2.5, y: 3.3 + i * 0.38, w: 1.0, h: 0.3, fontFace: F, fontSize: 10.5, color: MUT, margin: 0 });
    s.addText(v, { x: M + 3.35, y: 3.3 + i * 0.38, w: 0.35, h: 0.3, align: "right", fontFace: F, fontSize: 10.5, bold: true, color: TXT, margin: 0 });
  });
  s.addText("Estate-wide · updated hourly", { x: M + 0.55, y: 5.55, w: 2.9, h: 0.3, fontFace: F, fontSize: 9.5, italic: true, color: DIM, margin: 0 });
  // sources panel
  card(s, M + 3.95, 2.55, 4.1, 3.6, PANEL);
  s.addText("CONNECTED SOURCES · 14", { x: M + 4.2, y: 2.75, w: 3.6, h: 0.28, fontFace: F, fontSize: 9.5, bold: true, color: DIM, charSpacing: 1.5, margin: 0 });
  const srcs = [["Snowflake", 91], ["Postgres · prod", 88], ["Zendesk", 84], ["Salesforce", 78], ["Notion", 61], ["SharePoint", 52]];
  srcs.forEach(([n, v], i) => {
    const y = 3.18 + i * 0.48;
    s.addText(n, { x: M + 4.2, y, w: 1.7, h: 0.3, fontFace: F, fontSize: 10.5, color: TXT, margin: 0 });
    s.addShape("roundRect", { x: M + 5.95, y: y + 0.08, w: 1.5, h: 0.12, rectRadius: 0.06, fill: { color: PANEL2 }, line: { type: "none" } });
    s.addShape("roundRect", { x: M + 5.95, y: y + 0.08, w: Math.max(0.15, 1.5 * v / 100), h: 0.12, rectRadius: 0.06, fill: { color: v > 75 ? OK : (v > 60 ? WARN : "F87171") }, line: { type: "none" } });
    s.addText(String(v), { x: M + 7.5, y, w: 0.4, h: 0.3, align: "right", fontFace: F, fontSize: 10.5, bold: true, color: TXT, margin: 0 });
  });
  // flows panel
  card(s, M + 8.35, 2.55, 3.28, 3.6, PANEL);
  s.addText("RECOMMENDED WORKFLOWS", { x: M + 8.6, y: 2.75, w: 2.8, h: 0.28, fontFace: F, fontSize: 9.5, bold: true, color: DIM, charSpacing: 1.5, margin: 0 });
  const flows = [["Collections follow-up agent", "$340K/yr"], ["Churn-risk outreach agent", "$210K/yr"], ["Contract renewal drafting", "$95K/yr"]];
  flows.forEach(([t, r], i) => {
    const y = 3.18 + i * 0.88;
    s.addShape("roundRect", { x: M + 8.6, y, w: 2.78, h: 0.74, rectRadius: 0.08, fill: { color: PANEL2 }, line: { color: LINE, width: 0.75 } });
    s.addText(t, { x: M + 8.75, y: y + 0.08, w: 2.5, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: TXT, margin: 0 });
    s.addText(r, { x: M + 8.75, y: y + 0.38, w: 2.5, h: 0.28, fontFace: F, fontSize: 10, bold: true, color: OK, margin: 0 });
  });
  s.addText("12 more detected →", { x: M + 8.6, y: 5.85, w: 2.78, h: 0.25, fontFace: F, fontSize: 9.5, color: CYAN, margin: 0 });
  s.addText("Readiness becomes a KPI the board can track — and the workflow queue turns readiness into revenue.",
    { x: M, y: 6.7, w: W - 2 * M, h: 0.4, align: "center", fontFace: F, fontSize: 13, italic: true, color: MUT, margin: 0 });
  s.addNotes("Demo slot. Command is the CDO's Monday-meeting pane: score, estate, agent activity, workflow ROI queue.");
}

/* ---------- 8. WEDGE / GTM ---------- */
{
  const s = base("08", "Go-to-market");
  title(s, "The wedge: a free 48-hour\nAgent-Readiness Audit.");
  const steps = [
    { k: "LAND", c: CYAN, h: "Free audit", b: "Read-only credentials in an afternoon. Board-ready ARS report in 48 hours. Shareable benchmark = built-in distribution." },
    { k: "CONVERT", c: IND, h: "Growth · $2.5K/mo", b: "Continuous scoring, the knowledge graph, and the Gateway serving real agents. Sales-assist for 200+ employee accounts." },
    { k: "EXPAND", c: PUR, h: "Enterprise · $100K+ ACV", b: "More sources, more agents, Flows blueprints, in-VPC deploys. Usage grows with the customer's own agent adoption." },
  ];
  steps.forEach((st, i) => {
    const x = M + i * 4.05;
    card(s, x, 2.6, 3.75, 3.3);
    s.addText(st.k, { x: x + 0.3, y: 2.9, w: 3.15, h: 0.3, fontFace: F, fontSize: 12, bold: true, color: st.c, charSpacing: 2, margin: 0 });
    s.addText(st.h, { x: x + 0.3, y: 3.3, w: 3.15, h: 0.5, fontFace: F, fontSize: 19, bold: true, color: TXT, margin: 0 });
    s.addText(st.b, { x: x + 0.3, y: 3.95, w: 3.15, h: 1.7, fontFace: F, fontSize: 12, color: MUT, margin: 0, lineSpacingMultiple: 1.15 });
    if (i < 2) s.addShape("rightArrow", { x: x + 3.78, y: 4.0, w: 0.3, h: 0.35, fill: { color: LINE }, line: { type: "none" } });
  });
  s.addText("ICP: VP Data / CDO at 200–10,000-employee companies with 5+ data systems and a funded agent initiative.  Target NRR ≥ 130%.",
    { x: M, y: 6.35, w: W - 2 * M, h: 0.6, align: "center", fontFace: F, fontSize: 13, color: MUT, margin: 0 });
  s.addNotes("Land free with the audit (lead magnet + benchmark + proprietary dataset), convert to Growth, expand to Enterprise. We are indexed to the agent wave itself.");
}

/* ---------- 9. MARKET ---------- */
{
  const s = base("09", "Market");
  title(s, "A new category, indexed to agent adoption.", 0.78, 31);
  // left: chart
  s.addText("AI-ready enterprise knowledge graph market ($B)", { x: M, y: 2.1, w: 6, h: 0.3, fontFace: F, fontSize: 12.5, bold: true, color: TXT, margin: 0 });
  s.addChart("bar", [{
    name: "Market size ($B)",
    labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
    values: [1.05, 1.52, 2.19, 3.16, 4.55, 6.55],
  }], {
    x: M, y: 2.5, w: 6.1, h: 3.6,
    barDir: "col", chartColors: [IND], showLegend: false,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: MUT, dataLabelFontSize: 10, dataLabelFontFace: F, dataLabelFormatCode: "0.0",
    catAxisLabelColor: MUT, catAxisLabelFontSize: 10, catAxisLabelFontFace: F, catAxisLineColor: LINE,
    valAxisHidden: true, valGridLine: { style: "none" }, valAxisLabelColor: DIM, valAxisLineColor: BG,
    showTitle: false, plotArea: { fill: { color: BG } },
  });
  s.addText("20.1% CAGR — and only the core of the category.", { x: M, y: 6.2, w: 6, h: 0.3, fontFace: F, fontSize: 11, italic: true, color: DIM, margin: 0 });
  // right: stack
  const rt = [
    ["$3–6B", "serviceable market: ~50K target companies × $60–120K ACV", CYAN],
    ["$316M", "recent quarterly VC funding into agent infrastructure alone", IND],
    ["Adjacent", "multi-billion catalog/governance spend (Atlan, Alation, Collibra) repositioning to agentic — we are its agent-native replacement", PUR],
  ];
  rt.forEach(([n, b, c], i) => {
    const y = 2.35 + i * 1.45;
    card(s, 7.35, y, 5.28, 1.28);
    s.addText(n, { x: 7.65, y: y + 0.16, w: 1.85, h: 0.95, fontFace: F, fontSize: 23, bold: true, color: c, margin: 0, valign: "middle" });
    s.addText(b, { x: 9.55, y: y + 0.14, w: 2.95, h: 1.0, fontFace: F, fontSize: 11, color: MUT, margin: 0, valign: "middle", lineSpacingMultiple: 1.08 });
  });
  s.addNotes("Core market $1.05B→$6.55B by 2036 (20.1% CAGR). Bottom-up SAM $3–6B. Every dollar of agent spend pulls context spend behind it.");
}

/* ---------- 10. COMPETITION ---------- */
{
  const s = base("10", "Competition");
  title(s, "Nobody serves the whole estate to agents.", 0.78, 31);
  // 2x2 map
  const mx = M, my = 2.3, mw = 7.2, mh = 4.0;
  card(s, mx, my, mw, mh, PANEL2);
  s.addShape("line", { x: mx + mw / 2, y: my + 0.15, w: 0, h: mh - 0.3, line: { color: LINE, width: 1 } });
  s.addShape("line", { x: mx + 0.15, y: my + mh / 2, w: mw - 0.3, h: 0, line: { color: LINE, width: 1 } });
  s.addText("WHOLE ESTATE", { x: mx, y: my + 0.08, w: mw, h: 0.25, align: "center", fontFace: F, fontSize: 9, bold: true, color: DIM, charSpacing: 2, margin: 0 });
  s.addText("SINGLE SOURCE / MODALITY", { x: mx, y: my + mh - 0.33, w: mw, h: 0.25, align: "center", fontFace: F, fontSize: 9, bold: true, color: DIM, charSpacing: 2, margin: 0 });
  s.addText("FOR HUMANS", { x: mx + 0.1, y: my + mh / 2 - 0.14, w: 1.2, h: 0.28, fontFace: F, fontSize: 9, bold: true, color: DIM, margin: 0 });
  s.addText("FOR AGENTS", { x: mx + mw - 1.15, y: my + mh / 2 - 0.14, w: 1.1, h: 0.28, align: "right", fontFace: F, fontSize: 9, bold: true, color: DIM, margin: 0 });
  const dots = [
    ["Collibra", 1.1, 0.75, MUT], ["Alation", 1.9, 1.05, MUT], ["Atlan", 1.3, 1.45, MUT],
    ["Glean", 1.7, 2.75, MUT], ["LlamaIndex", 4.6, 3.0, MUT], ["Unstructured", 5.4, 3.3, MUT],
    ["DIY MCP servers", 4.4, 2.55, "F87171"], ["Snowflake Cortex", 5.6, 2.3, MUT],
  ];
  dots.forEach(([n, dx, dy, c]) => {
    s.addShape("ellipse", { x: mx + dx, y: my + dy, w: 0.14, h: 0.14, fill: { color: c }, line: { type: "none" } });
    s.addText(n, { x: mx + dx + 0.18, y: my + dy - 0.09, w: 1.6, h: 0.3, fontFace: F, fontSize: 9.5, color: c === "F87171" ? "F87171" : MUT, margin: 0 });
  });
  // datalith star
  s.addShape("roundRect", { x: mx + 5.05, y: my + 0.55, w: 1.85, h: 0.5, rectRadius: 0.1, fill: { color: IND }, line: { type: "none" } });
  s.addText("★ DATALITH", { x: mx + 5.05, y: my + 0.55, w: 1.85, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 12.5, bold: true, color: BG, margin: 0 });
  // right: moat
  s.addText("Why we win over time", { x: 8.35, y: 2.35, w: 4.3, h: 0.35, fontFace: F, fontSize: 15, bold: true, color: TXT, margin: 0 });
  const moats = [
    ["Agent-native architecture", "Catalogs describe data for people. We prepare and serve it to machines — different consumer, different product."],
    ["Neutrality", "The Switzerland between warehouses, frameworks, and models — the durable seat (dbt, Fivetran precedent)."],
    ["Compounding graph", "Every source and every agent interaction enriches the graph; ripping it out means re-grounding every agent."],
  ];
  moats.forEach(([h, b], i) => {
    const y = 2.85 + i * 1.15;
    s.addText(h, { x: 8.35, y, w: 4.3, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: CYAN, margin: 0 });
    s.addText(b, { x: 8.35, y: y + 0.32, w: 4.3, h: 0.7, fontFace: F, fontSize: 11, color: MUT, margin: 0, lineSpacingMultiple: 1.08 });
  });
  s.addNotes("2x2: humans vs agents, single-source vs whole-estate. Upper-right is empty except us. DIY MCP is the real competitor — and the documented failure pattern.");
}

/* ---------- 11. BUSINESS MODEL ---------- */
{
  const s = base("11", "Business model");
  title(s, "SaaS + usage, priced on the agent wave.", 0.78, 31);
  const tiers = [
    ["Audit", "Free", "3 sources · one-time ARS report · the lead magnet", PANEL],
    ["Growth", "$2.5K/mo", "10 sources · graph · Topics · Gateway 100K calls", PANEL],
    ["Scale", "$6K/mo", "25 sources · Ready engine · Flows · RBAC", PANEL],
    ["Enterprise", "$100K+", "Unlimited · in-VPC · SSO · audit exports · CSM", PANEL],
  ];
  tiers.forEach(([h, amt, b, f], i) => {
    const x = M + i * 3.02;
    card(s, x, 2.35, 2.8, 2.35, f);
    if (h === "Growth") s.addShape("roundRect", { x, y: 2.35, w: 2.8, h: 2.35, rectRadius: 0.09, fill: { color: PANEL }, line: { color: IND, width: 1.5 } });
    s.addText(h, { x: x + 0.25, y: 2.6, w: 2.3, h: 0.35, fontFace: F, fontSize: 14, bold: true, color: MUT, margin: 0 });
    s.addText(amt, { x: x + 0.25, y: 2.95, w: 2.3, h: 0.6, fontFace: F, fontSize: 26, bold: true, color: TXT, margin: 0 });
    s.addText(b, { x: x + 0.25, y: 3.6, w: 2.3, h: 0.95, fontFace: F, fontSize: 11, color: MUT, margin: 0, lineSpacingMultiple: 1.1 });
  });
  const metrics = [
    ["Usage meters", "Connected sources · graph entities · Gateway calls. Customers add agents → calls grow → we grow."],
    ["Unit economics", "Gross margin ~78% (compute metered through). Blended ACV $60K year one → $90K+ year two."],
    ["Retention engine", "Target NRR ≥ 130% — Flows recommendations create the next workflow, which creates the next expansion."],
  ];
  metrics.forEach(([h, b], i) => {
    const x = M + i * 4.05;
    card(s, x, 5.05, 3.75, 1.5, PANEL2);
    s.addText(h, { x: x + 0.25, y: 5.22, w: 3.25, h: 0.3, fontFace: F, fontSize: 12.5, bold: true, color: CYAN, margin: 0 });
    s.addText(b, { x: x + 0.25, y: 5.55, w: 3.25, h: 0.9, fontFace: F, fontSize: 10.5, color: MUT, margin: 0, lineSpacingMultiple: 1.08 });
  });
  s.addNotes("Free audit → $2.5K Growth → $6K Scale → $100K+ Enterprise. Usage meters index revenue to the customer's own agent adoption.");
}

/* ---------- 12. TRACTION & ROADMAP ---------- */
{
  const s = base("12", "Traction & roadmap");
  title(s, "48 hours to value. 18 months to Series A.", 0.78, 31);
  // timeline
  const phases = [
    ["NOW", "Audit v0", "25 connectors · ARS scoring · estate map\nGoal: 100 audits run, 15 design partners", CYAN],
    ["+9 MO", "Graph & Gateway GA", "Knowledge graph · Topics · MCP Gateway beta\nIn-VPC deploy · SOC 2 Type I · first 10 paying", IND],
    ["+18 MO", "Full platform", "Ready engine · Flows GA · audit & permissions\nSOC 2 Type II · $1M+ ARR · Series A metrics", PUR],
  ];
  const ty = 2.6;
  s.addShape("line", { x: M + 0.4, y: ty + 0.26, w: 11.1, h: 0, line: { color: LINE, width: 1.5 } });
  phases.forEach(([k, h, b, c], i) => {
    const x = M + 0.1 + i * 4.0;
    s.addShape("ellipse", { x: x + 0.18, y: ty + 0.13, w: 0.26, h: 0.26, fill: { color: c }, line: { type: "none" } });
    s.addText(k, { x, y: ty + 0.5, w: 3.6, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: c, charSpacing: 2, margin: 0 });
    s.addText(h, { x, y: ty + 0.82, w: 3.6, h: 0.4, fontFace: F, fontSize: 17, bold: true, color: TXT, margin: 0 });
    s.addText(b, { x, y: ty + 1.28, w: 3.6, h: 1.0, fontFace: F, fontSize: 11.5, color: MUT, margin: 0, lineSpacingMultiple: 1.12 });
  });
  // milestones band
  card(s, M, 5.35, 11.93, 1.25, PANEL2);
  s.addText("MILESTONES TO SERIES A", { x: M + 0.3, y: 5.5, w: 4, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: DIM, charSpacing: 2, margin: 0 });
  const ms = [["100+", "audits run"], ["25", "paying accounts"], ["$1M", "ARR"], [">125%", "NRR"], ["3", "lighthouse logos"], ["SOC 2 II", "certified"]];
  ms.forEach(([n, l], i) => {
    const x = M + 0.3 + i * 1.95;
    s.addText(n, { x, y: 5.78, w: 1.85, h: 0.4, fontFace: F, fontSize: 19, bold: true, color: TXT, margin: 0 });
    s.addText(l, { x, y: 6.2, w: 1.85, h: 0.3, fontFace: F, fontSize: 10.5, color: MUT, margin: 0 });
  });
  s.addNotes("Fill traction numbers at send time: design partners, audits run, sources connected, LOIs. The roadmap gates map directly to the raise milestones.");
}

/* ---------- 13. TEAM ---------- */
{
  const s = base("13", "Team");
  title(s, "Built by people who lived the grounding problem.", 0.78, 30);
  const team = [
    ["CEO · Co-founder", "Data/AI product leader. Shipped enterprise data platforms; owns narrative, design partners, and the raise.", CYAN],
    ["CTO · Co-founder", "Distributed-systems & knowledge-graph engineer. Owns graph, gateway, and platform architecture.", IND],
    ["Founding team · 6 engineers", "Connectors & infra ×2, graph/ML ×2, product ×1, design ×1 — hired against the v1 roadmap.", PUR],
  ];
  team.forEach(([h, b, c], i) => {
    const x = M + i * 4.05;
    card(s, x, 2.5, 3.75, 2.6);
    s.addShape("ellipse", { x: x + 0.3, y: 2.8, w: 0.85, h: 0.85, fill: { color: PANEL2 }, line: { color: c, width: 2 } });
    s.addText("●", { x: x + 0.3, y: 2.8, w: 0.85, h: 0.85, align: "center", valign: "middle", fontFace: F, fontSize: 18, color: c, margin: 0 });
    s.addText(h, { x: x + 0.3, y: 3.85, w: 3.15, h: 0.4, fontFace: F, fontSize: 14.5, bold: true, color: TXT, margin: 0 });
    s.addText(b, { x: x + 0.3, y: 4.28, w: 3.15, h: 0.75, fontFace: F, fontSize: 11, color: MUT, margin: 0, lineSpacingMultiple: 1.1 });
  });
  s.addText("Advisors drawn from the data-infrastructure and agent-framework ecosystems (to be announced with the round).",
    { x: M, y: 5.6, w: W - 2 * M, h: 0.4, align: "center", fontFace: F, fontSize: 12.5, italic: true, color: MUT, margin: 0 });
  s.addText("Placeholder bios — replace with founder credentials before sending.",
    { x: M, y: 6.35, w: W - 2 * M, h: 0.3, align: "center", fontFace: F, fontSize: 10, italic: true, color: DIM, margin: 0 });
  s.addNotes("Replace with real founder bios, logos of past employers, and named advisors before the deck goes out.");
}

/* ---------- 14. ASK ---------- */
{
  const s = p.addSlide();
  s.background = { color: BG };
  s.addText("The ask", { x: 1.5, y: 1.0, w: 10.33, h: 0.5, align: "center", fontFace: F, fontSize: 16, bold: true, color: CYAN, charSpacing: 3, margin: 0 });
  s.addText("$4.0M Seed", { x: 1.5, y: 1.55, w: 10.33, h: 1.2, align: "center", fontFace: F, fontSize: 60, bold: true, color: TXT, margin: 0 });
  s.addText("18–20 months of runway to Series A metrics", { x: 1.5, y: 2.85, w: 10.33, h: 0.4, align: "center", fontFace: F, fontSize: 15, color: MUT, margin: 0 });
  const use = [["60%", "Engineering", "connectors · graph · gateway", CYAN], ["15%", "Go-to-market", "founding AE · content-led growth", IND], ["15%", "Security & compliance", "SOC 2 I + II · in-VPC packaging", PUR], ["10%", "Operations", "runway discipline", OK]];
  use.forEach(([n, h, b, c], i) => {
    const x = 0.95 + i * 2.95;
    const sCard = { x, y: 3.6, w: 2.7, h: 1.75 };
    p; // noop
    s.addShape("roundRect", { ...sCard, rectRadius: 0.09, fill: { color: PANEL }, line: { color: LINE, width: 0.75 } });
    s.addText(n, { x: x + 0.25, y: 3.8, w: 2.2, h: 0.55, fontFace: F, fontSize: 26, bold: true, color: c, margin: 0 });
    s.addText(h, { x: x + 0.25, y: 4.4, w: 2.2, h: 0.3, fontFace: F, fontSize: 12.5, bold: true, color: TXT, margin: 0 });
    s.addText(b, { x: x + 0.25, y: 4.72, w: 2.2, h: 0.5, fontFace: F, fontSize: 10, color: MUT, margin: 0 });
  });
  s.addText([
    { text: "Every source. ", options: { color: CYAN } },
    { text: "One graph. ", options: { color: IND } },
    { text: "Agent-ready.", options: { color: PUR } },
  ], { x: 1.5, y: 5.85, w: 10.33, h: 0.5, align: "center", fontFace: F, fontSize: 20, bold: true, margin: 0 });
  s.addText("founders@datalith.ai", { x: 1.5, y: 6.45, w: 10.33, h: 0.35, align: "center", fontFace: F, fontSize: 13, color: MUT, margin: 0 });
  s.addNotes("Close on the category line. $4M seed, 18-20 months, milestones on slide 11.");
}

p.writeFile({ fileName: "Datalith-Pitch-Deck.pptx" }).then(() => console.log("done"));
