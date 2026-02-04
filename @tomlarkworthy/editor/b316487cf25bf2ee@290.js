import define1 from "./db42ae70222a8b08@1170.js";

function _introduction(md){return(
md`# Minimize Crossings: Spectral Circular Graph for Layout

This notebook implements a small, **in-browser graph layout heuristic** for reducing edge crossings when drawing an undirected graph in *1D* as a **circular ordering**: place vertices around a circle and draw each edge as a straight chord. The objective is to choose a cyclic vertex order that makes chords intersect as little as possible.

Because **crossing minimization over permutations is NP-hard**, we don’t solve it exactly. Instead we use a fast, deterministic pipeline:

1. **Build / edit a graph** as an undirected edge list (with an interactive adjacency-grid editor and optional random graph generation).
2. **Clean the edge list**: remove self-loops, clamp to \\\`[0, n)\\\`, de-duplicate, and normalize \\\`(a,b)\\\` with \\\`a<b\\\`.
3. **Convert to CSR** (compressed sparse row) for fast repeated sparse operations.
4. **Define a symmetric smoothing operator** based on normalized adjacency:
   \\\`M = (1-α)I + α D^{-1/2} A D^{-1/2}\\\`.
5. **Run block power iteration (2 vectors)** with repeated **orthonormalization** to obtain a stable 2D spectral embedding \\\`(u, v)\\\`.
6. **Convert \\\`(u, v)\\\` to a circular order** by sorting vertices by \\\`θ[i] = atan2(v[i], u[i])\\\` (stable tie-breaking for determinism).
7. **Optionally refine the order** with a local improvement heuristic (**sifting / reinsertion**) for a small number of passes.
8. **Evaluate and compare** by computing:
   - crossings for **Natural** order
   - crossings for **Spectral init**
   - crossings for **Spectral + sifting**
   - a **best-of-R baseline** from multiple greedy/randomized-start constructions
9. **Visualize** each order as a circular chord diagram and report diagnostics (convergence, iterations, \\\`lastDelta\\\`).


\`\`\`javascript
import {spectralCircleOrder, improveOrderSifting, bestOfRandomOrders} from "@tomlarkworthy/spectral-layout"
\`\`\``
)}

function _2(md){return(
md`### Motivation

The motivation was to enable better visualisation of code dependancies by reducing the tangles`
)}

function _useSpectral(Inputs){return(
Inputs.toggle({ label: "use Spectral layout" })
)}

function _5(visualizeModules,useSpectral){return(
visualizeModules({ useSpectral })
)}

function _6(md){return(
md`## Playground`
)}

function _params(Inputs){return(
Inputs.form(
  {
    n: Inputs.range([2, 40], { step: 1, value: 10, label: "n (nodes)" }),
    alpha: Inputs.range([0.5, 0.99], {
      step: 0.01,
      value: 0.95,
      label: "alpha (smoothing)"
    }),
    seed: Inputs.number({ value: 1, step: 1, label: "seed" }),
    maxIters: Inputs.range([20, 400], {
      step: 10,
      value: 200,
      label: "maxIters (cap)"
    }),
    tol: Inputs.select([1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8], {
      value: 1e-6,
      label: "tol (stop when delta < tol)",
      format: (v) =>
        v.toExponential ? v.toExponential(0).replace("+", "") : String(v)
    }),
    passesOrtho: Inputs.range([1, 4], {
      step: 1,
      value: 2,
      label: "orthonorm passes"
    }),
    siftPasses: Inputs.select([0, 1, 2, 3], {
      value: 1,
      label: "sifting passes (post)"
    }),
    randomR: Inputs.range([0, 100], {
      step: 1,
      value: 20,
      label: "random baseline R"
    }),
    density: Inputs.range([0, 1], {
      step: 0.02,
      value: 0.18,
      label: "random edge density"
    })
  },
  { label: "Graph + layout parameters" }
)
)}

function _actions(Inputs){return(
Inputs.form(
  {
    randomize: Inputs.button("Random graph", {
      value: 0,
      reduce: (v) => v + 1
    }),
    clear: Inputs.button("Clear edges", { value: 0, reduce: (v) => v + 1 })
  },
  { label: "Actions" }
)
)}

function _dashboard(params,$0,edgeKey,buildCSR,spectralCircleOrder,d3,crossingsCount,improveOrderSifting,bestOfRandomOrders,chordPlot,htl,$1)
{
  const n = params.n;

  const cleanEdges = [];
  const seen = new Set();
  for (const e of $0.value) {
    const a0 = e[0] | 0,
      b0 = e[1] | 0;
    if (a0 === b0) continue;
    if (a0 < 0 || b0 < 0 || a0 >= n || b0 >= n) continue;
    const a = Math.min(a0, b0),
      b = Math.max(a0, b0);
    const k = edgeKey(a, b);
    if (seen.has(k)) continue;
    seen.add(k);
    cleanEdges.push([a, b]);
  }

  const csr = buildCSR(n, cleanEdges);

  const spectral = spectralCircleOrder(csr, {
    alpha: params.alpha,
    maxIters: params.maxIters,
    tol: params.tol,
    seed: params.seed,
    passesOrtho: params.passesOrtho
  });

  const natural = Int32Array.from(d3.range(n));
  const crossingsNatural = crossingsCount(n, cleanEdges, natural);
  const crossingsSpectral = crossingsCount(n, cleanEdges, spectral.order);

  const sifted = improveOrderSifting(n, cleanEdges, spectral.order, {
    passes: params.siftPasses,
    vertexSequence: "id"
  });
  const crossingsSifted = sifted.crossings;

  const randomBest = bestOfRandomOrders(n, cleanEdges, {
    R: params.randomR,
    seed: (params.seed | 0) ^ 2654435769
  });

  const plotA = chordPlot(n, cleanEdges, natural, {
    title: `Natural (crossings: ${crossingsNatural})`
  });
  const plotB = chordPlot(n, cleanEdges, spectral.order, {
    title: `Spectral init (crossings: ${crossingsSpectral})`
  });
  const plotC = chordPlot(n, cleanEdges, sifted.order, {
    title: `Spectral + sift (${params.siftPasses} pass${
      params.siftPasses === 1 ? "" : "es"
    }) (crossings: ${crossingsSifted})`
  });

  const beatRandSpectral = crossingsSpectral <= randomBest.crossings;
  const beatRandSifted = crossingsSifted <= randomBest.crossings;

  return htl.html`<div style="font: 12px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
    <div style="
      display:grid;
      grid-template-columns: 420px 420px;
      grid-template-rows: auto auto;
      gap: 14px;
      align-items:start;
      justify-content:start;
    ">
      <div style="min-width:420px;">
        <div style="font-weight:700; margin: 0 0 6px 0;">Click to toggle edges (adjacency grid)</div>
        ${$1}
        <div style="margin-top:6px; color:#444;">
          edges: <b>${cleanEdges.length}</b>
          <span style="margin-left:12px;">
            spectral: <b>${
              spectral.converged ? "converged" : "not converged"
            }</b>,
            iters: <b>${spectral.iters}</b>,
            lastDelta: <b>${spectral.lastDelta.toExponential(2)}</b>
          </span>
        </div>
        <div style="margin-top:6px; color:#444;">
          baseline best-of-<b>${randomBest.R}</b>-random: <b>${
    randomBest.crossings
  }</b>
          <span style="margin-left:12px;">spectral beats random? <b>${
            beatRandSpectral ? "yes" : "no"
          }</b></span>
          <span style="margin-left:12px;">sifted beats random? <b>${
            beatRandSifted ? "yes" : "no"
          }</b></span>
        </div>
      </div>

      <div>${plotA}</div>
      <div>${plotB}</div>
      <div>${plotC}</div>
    </div>
  </div>`;
}


function _edgeKey(){return(
(a, b) => (a < b ? `${a},${b}` : `${b},${a}`)
)}

function _normalizeEdge(){return(
(a, b) => (a < b ? [a, b] : [b, a])
)}

function _edges(Inputs){return(
Inputs.input([])
)}

function _edgesController(actions,$0,Event,params,makeRng)
{
  const state = this ?? { randomize: 0, clear: 0 };

  if (actions.clear !== state.clear) {
    $0.value.length = 0;
    $0.dispatchEvent(new Event("input"));
  }

  if (actions.randomize !== state.randomize) {
    const n = params.n;
    const density = params.density;
    const rng = makeRng((params.seed | 0) + 1000003 * (actions.randomize | 0));

    $0.value.length = 0;
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        if (rng() < density) $0.value.push([a, b]);
      }
    }
    $0.dispatchEvent(new Event("input"));
  }

  state.randomize = actions.randomize;
  state.clear = actions.clear;
  return state;
}


function _edgeDomainFull(params)
{
  const n = params.n;
  const dom = [];
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a === b) continue;
      dom.push({ a, b });
    }
  }
  return dom;
}


function _crossingsCount(){return(
(n, edges, order) => {
  const pos = new Int32Array(n);
  for (let i = 0; i < n; i++) pos[order[i]] = i;

  const intervals = [];
  for (const e of edges) {
    const a = e[0] | 0,
      b = e[1] | 0;
    if (a === b) continue;
    const i = pos[a],
      j = pos[b];
    const s = Math.min(i, j),
      t = Math.max(i, j);
    if (s === t) continue;
    intervals.push([s, t]);
  }

  intervals.sort((p, q) => p[0] - q[0] || p[1] - q[1]);

  const bit = new Int32Array(n + 1);
  const add = (i) => {
    for (let x = i + 1; x <= n; x += x & -x) bit[x]++;
  };
  const sum = (i) => {
    let s = 0;
    for (let x = i + 1; x > 0; x -= x & -x) s += bit[x];
    return s;
  };
  const range = (l, r) => (r < l ? 0 : sum(r) - (l > 0 ? sum(l - 1) : 0));

  let crossings = 0;
  let k = 0;
  while (k < intervals.length) {
    const s = intervals[k][0];
    let k2 = k;
    while (k2 < intervals.length && intervals[k2][0] === s) k2++;

    for (let t = k; t < k2; t++) {
      const end = intervals[t][1];
      crossings += range(s + 1, end - 1);
    }
    for (let t = k; t < k2; t++) add(intervals[t][1]);

    k = k2;
  }

  return crossings;
}
)}

function _chordPlot(Plot){return(
(n, edges, order, { title } = {}) => {
  const idx = new Int32Array(n);
  for (let i = 0; i < n; i++) idx[order[i]] = i;

  const nodes = [];
  const nodeXY = Array.from({ length: n });
  for (let v = 0; v < n; v++) {
    const a = 2 * Math.PI * (idx[v] / n);
    const x = Math.cos(a),
      y = Math.sin(a);
    nodeXY[v] = { x, y };
    nodes.push({ id: v, x, y });
  }

  const links = [];
  for (const e of edges) {
    const a = e[0] | 0,
      b = e[1] | 0;
    if (a === b) continue;
    const p = nodeXY[a],
      q = nodeXY[b];
    if (!p || !q) continue;
    links.push({ x1: p.x, y1: p.y, x2: q.x, y2: q.y });
  }

  return Plot.plot({
    width: 420,
    height: 420,
    aspectRatio: 1,
    x: { domain: [-1.25, 1.25], axis: null },
    y: { domain: [-1.25, 1.25], axis: null },
    marks: [
      Plot.frame(),
      Plot.link(links, {
        x1: "x1",
        y1: "y1",
        x2: "x2",
        y2: "y2",
        stroke: "rgba(0,0,0,0.25)",
        strokeWidth: 1
      }),
      Plot.dot(nodes, { x: "x", y: "y", r: 8, fill: "white", stroke: "black" }),
      Plot.text(nodes, {
        x: "x",
        y: "y",
        text: (d) => String(d.id),
        dy: 0,
        fontSize: 10
      }),
      ...(title
        ? [
            Plot.text([{ x: 0, y: 1.17, t: title }], {
              x: "x",
              y: "y",
              text: "t",
              fontSize: 14,
              fontWeight: "bold"
            })
          ]
        : [])
    ]
  });
}
)}

function _plot_editor(params,edges,edgeKey,Plot,d3,edgeDomainFull,$0,Event,invalidation)
{
  const n = params.n;

  const edgeSet = new Set();
  for (const e of edges) {
    const a = e[0] | 0,
      b = e[1] | 0;
    if (a === b) continue;
    if (a < 0 || b < 0 || a >= n || b >= n) continue;
    edgeSet.add(edgeKey(a, b));
  }

  const plot = Plot.plot({
    width: 420,
    height: 420,
    margin: 40,
    x: { type: "point", domain: d3.range(n), label: "a" },
    y: { type: "point", domain: d3.range(n), label: "b" },
    style: { fontSize: "11px" },
    marks: [
      Plot.frame(),
      Plot.dot(edgeDomainFull, {
        x: "a",
        y: "b",
        r: 5,
        fill: (d) => (edgeSet.has(edgeKey(d.a, d.b)) ? "black" : "#0000"),
        stroke: (d) => (edgeSet.has(edgeKey(d.a, d.b)) ? "#0000" : "#ddd")
      }),
      Plot.dot(
        edgeDomainFull,
        Plot.pointer({
          x: "a",
          y: "b",
          r: 11,
          fill: "#0000",
          stroke: (d) =>
            edgeSet.has(edgeKey(d.a, d.b)) ? "#d62728" : "#1f77b4",
          strokeWidth: 2,
          maxRadius: 30
        })
      )
    ]
  });

  const onClick = () => {
    const d = plot.value;
    if (!d) return;
    const a0 = d.a | 0,
      b0 = d.b | 0;
    if (a0 === b0) return;

    const a = Math.min(a0, b0);
    const b = Math.max(a0, b0);
    if (a < 0 || b < 0 || a >= n || b >= n) return;

    const arr = $0.value;
    const idx = arr.findIndex((e) => (e[0] | 0) === a && (e[1] | 0) === b);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push([a, b]);

    $0.dispatchEvent(new Event("input"));
  };

  plot.addEventListener("click", onClick);
  invalidation.then(() => plot.removeEventListener("click", onClick));
  return plot;
}


function _18(md){return(
md`# Spectral circular ordering

Goal: given an undirected graph, produce a **circular order** of vertices that often (not always) reduces edge crossings when drawn as straight chords on a circle.

Approach (high-level):
1. Build a **CSR** (compressed sparse row) representation of the graph.
2. Define a symmetric smoothing operator **M** based on the normalized adjacency.
3. Use **block power iteration** to find a stable 2D invariant subspace (two orthonormal vectors).
4. Map each vertex to an angle \`θ = atan2(v[i], u[i])\` and sort by \`θ\` to get a circular order.`
)}

function _assert(){return(
(cond, msg) => {
  if (!cond) throw new Error(msg);
}
)}

function _20(md){return(
md`## 1) Graph representation: CSR (Compressed Sparse Row)

We want fast repeated multiplication by a sparse operator. CSR stores:

- \`rowPtr\` of length \`n+1\`: where each vertex's neighbor list starts/ends in \`colIdx\`
- \`colIdx\` of length \`nnz\`: all neighbor vertex ids concatenated
- \`val\` of length \`nnz\`: edge weights (we use all 1.0)
- \`deg\` of length \`n\`: degree per vertex

This builder:
- treats edges as **undirected**
- removes **self-loops**
- **de-dupes** parallel edges
- sorts neighbors for determinism`
)}

function _buildCSR(assert){return(
(n, edges) => {
  assert(Number.isInteger(n) && n > 0, "n must be a positive integer");
  const adj = Array.from({ length: n }, () => []);
  for (const e of edges) {
    const a0 = e[0],
      b0 = e[1];
    const a = a0 | 0,
      b = b0 | 0;
    if (a === b) continue;
    assert(a >= 0 && a < n && b >= 0 && b < n, "edge endpoint out of range");
    adj[a].push(b);
    adj[b].push(a);
  }

  const deg = new Float64Array(n);
  let nnz = 0;
  for (let i = 0; i < n; i++) {
    const row = adj[i];
    row.sort((x, y) => x - y);
    let w = 0;
    for (let j = 0; j < row.length; j++) {
      if (w === 0 || row[j] !== row[w - 1]) row[w++] = row[j];
    }
    row.length = w;
    deg[i] = w;
    nnz += w;
  }

  const rowPtr = new Int32Array(n + 1);
  const colIdx = new Int32Array(nnz);
  const val = new Float64Array(nnz);

  let p = 0;
  for (let i = 0; i < n; i++) {
    rowPtr[i] = p;
    const row = adj[i];
    for (let j = 0; j < row.length; j++) {
      colIdx[p] = row[j];
      val[p] = 1.0;
      p++;
    }
  }
  rowPtr[n] = p;
  assert(p === nnz, "nnz mismatch");

  return { n, rowPtr, colIdx, val, deg };
}
)}

function _22(md){return(
md`## 2) The operator we iterate: normalized adjacency smoothing

We choose a symmetric operator:

\`\`\`
M = (1 - α) I + α D^{-1/2} A D^{-1/2}
\`\`\`

- \`A\` is the adjacency matrix
- \`D\` is the diagonal matrix of degrees
- \`α ∈ (0,1)\` controls how strongly we smooth/mix

Why this choice?
- It is **symmetric** for undirected graphs, so it behaves well numerically.
- It is a "lazy" smoothing operator: \`(1-α)I\` prevents oscillations and helps convergence.
- Iterating it tends to reveal large-scale structure that is often useful for ordering.`
)}

function _applyM_normAdj(assert){return(
(csr, x, y, alpha) => {
  const { n, rowPtr, colIdx, val, deg } = csr;
  assert(x.length === n && y.length === n, "vector length mismatch");
  assert(alpha > 0 && alpha < 1, "alpha must be in (0,1)");

  const oneMinus = 1.0 - alpha;

  for (let i = 0; i < n; i++) y[i] = oneMinus * x[i];

  for (let i = 0; i < n; i++) {
    const di = deg[i];
    if (di === 0) continue;
    const invSqrtDi = 1.0 / Math.sqrt(di);
    let acc = 0.0;
    const p0 = rowPtr[i],
      p1 = rowPtr[i + 1];
    for (let p = p0; p < p1; p++) {
      const j = colIdx[p];
      const dj = deg[j];
      if (dj === 0) continue;
      const invSqrtDj = 1.0 / Math.sqrt(dj);
      acc += val[p] * invSqrtDj * x[j];
    }
    y[i] += alpha * invSqrtDi * acc;
  }
}
)}

function _24(md){return(
md`## 3) Deterministic numerics helpers

We need:
- a deterministic RNG (for stable initialization and reinitialization)
- dot products and norms
- stable argsort (deterministic tie-breaking)

Determinism is important for notebook reproducibility: same graph + same seed → same order.`
)}

function _makeRng(){return(
(seed) => {
  let x = seed | 0 || 0x12345678;
  return () => {
    x ^= x << 13;
    x |= 0;
    x ^= x >>> 17;
    x |= 0;
    x ^= x << 5;
    x |= 0;
    return (x >>> 0) / 4294967296;
  };
}
)}

function _dot(){return(
(a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}
)}

function _norm2(dot){return(
(a) => Math.sqrt(dot(a, a))
)}

function _scaleInPlace(){return(
(a, c) => {
  for (let i = 0; i < a.length; i++) a[i] *= c;
}
)}

function _copyInto(){return(
(dst, src) => {
  dst.set(src);
}
)}

function _stableArgsortByKey(){return(
(keys) => {
  const idx = Array.from({ length: keys.length }, (_, i) => i);
  idx.sort((i, j) => {
    const di = keys[i],
      dj = keys[j];
    if (di < dj) return -1;
    if (di > dj) return 1;
    return i - j;
  });
  return Int32Array.from(idx);
}
)}

function _31(md){return(
md`## 4) Orthonormalizing 2 vectors (modified Gram–Schmidt)

Block power iteration evolves **two vectors at once**. Each iteration we apply \`M\` to both vectors, then we need to re-orthonormalize them to:
- prevent collapse onto the same dominant eigenvector
- keep \`u\` and \`v\` numerically stable

If a vector becomes nearly zero (rare but possible), we deterministically reinitialize it using the RNG.`
)}

function _ortho2(norm2,scaleInPlace,dot){return(
(q1, q2, rng, passes) => {
  const n = q1.length;

  const renorm = (q) => {
    const nrm = norm2(q);
    if (nrm < 1e-12) {
      for (let i = 0; i < n; i++) q[i] = rng() - 0.5;
      const nrm2 = norm2(q);
      scaleInPlace(q, 1.0 / (nrm2 || 1.0));
      return;
    }
    scaleInPlace(q, 1.0 / nrm);
  };

  for (let pass = 0; pass < passes; pass++) {
    renorm(q1);

    const a = dot(q1, q2);
    for (let i = 0; i < n; i++) q2[i] -= a * q1[i];

    renorm(q2);
  }
}
)}

function _33(md){return(
md`## 5) Block power iteration (2 vectors)

Power iteration typically finds the dominant eigenvector. For circular ordering we want a **2D embedding**, so we do "block power iteration":

- start with two random vectors \`u, v\`
- repeatedly compute \`Mu, Mv\`
- orthonormalize
- stop when the basis stops changing much

We use a simple convergence proxy:

\`\`\`
delta = 1 - (|u·u_prev| + |v·v_prev|)/2
\`\`\`

Small \`delta\` means the subspace is stable.`
)}

function _blockPower2(makeRng,ortho2,copyInto,dot){return(
(n, applyM, opts) => {
  const maxIters = opts.maxIters ?? 200;
  const tol = opts.tol ?? 1e-6;
  const seed = opts.seed ?? 12345;
  const passesOrtho = opts.passesOrtho ?? 2;

  const rng = makeRng(seed);

  const u = new Float64Array(n);
  const v = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    u[i] = rng() - 0.5;
    v[i] = rng() - 0.5;
  }
  ortho2(u, v, rng, passesOrtho);

  const Mu = new Float64Array(n);
  const Mv = new Float64Array(n);

  const uPrev = new Float64Array(n);
  const vPrev = new Float64Array(n);

  let lastDelta = Infinity;
  let converged = false;

  for (let it = 1; it <= maxIters; it++) {
    copyInto(uPrev, u);
    copyInto(vPrev, v);

    applyM(u, Mu);
    applyM(v, Mv);

    copyInto(u, Mu);
    copyInto(v, Mv);
    ortho2(u, v, rng, passesOrtho);

    const cu = Math.abs(dot(u, uPrev));
    const cv = Math.abs(dot(v, vPrev));
    lastDelta = 1.0 - 0.5 * (cu + cv);

    if (lastDelta < tol) {
      converged = true;
      return { u, v, iters: it, converged, lastDelta };
    }
  }

  return { u, v, iters: maxIters, converged, lastDelta };
}
)}

function _35(md){return(
md`## 6) From (u, v) to a circular order

Once each vertex \`i\` has coordinates \`(u[i], v[i])\`, we assign it an angle:

\`\`\`
θ[i] = atan2(v[i], u[i])
\`\`\`

Sorting vertices by \`θ\` produces a circular order.

Notes:
- this is invariant to rotating the entire 2D basis
- stable tie-breaking ensures deterministic output`
)}

function _circularOrderFromUV(assert,stableArgsortByKey){return(
(u, v) => {
  assert(u.length === v.length, "u,v length mismatch");
  const n = u.length;
  const ang = new Float64Array(n);
  for (let i = 0; i < n; i++) ang[i] = Math.atan2(v[i], u[i]);
  return stableArgsortByKey(ang);
}
)}

function _37(md){return(
md`## 7) The full pipeline: spectralCircleOrder

This ties everything together:
- validate parameters
- define \`applyM(x,y)\` using the CSR graph and \`α\`
- run block power iteration to get \`u,v\`
- produce the circular order by angle-sorting

Return structure:
- \`order\`: Int32Array of vertex ids in circular order
- \`u,v\`: the embedding coordinates (unit norm, orthogonal)
- diagnostics: iters, converged, lastDelta`
)}

function _spectralCircleOrder(assert,applyM_normAdj,blockPower2,circularOrderFromUV){return(
(csr, opts = {}) => {
  const alpha = opts.alpha ?? 0.95;
  const maxIters = opts.maxIters ?? 200;
  const tol = opts.tol ?? 1e-6;
  const seed = opts.seed ?? 12345;
  const passesOrtho = opts.passesOrtho ?? 2;

  assert(alpha > 0 && alpha < 1, "alpha must be in (0,1)");

  const n = csr.n;

  const applyM = (x, y) => applyM_normAdj(csr, x, y, alpha);

  const { u, v, iters, converged, lastDelta } = blockPower2(n, applyM, {
    maxIters,
    tol,
    seed,
    passesOrtho
  });

  const order = circularOrderFromUV(u, v);
  return { order, u, v, iters, converged, lastDelta };
}
)}

function _39(md){return(
md`## Code example

We build a small graph and compute a circular order.

If you replace \`edges\` with your own edge list, the same pipeline applies.`
)}

function _example(buildCSR,spectralCircleOrder){return(
(() => {
  const n = 8;
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 0],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
  ];
  const csr = buildCSR(n, edges);
  const res = spectralCircleOrder(csr, {
    alpha: 0.95,
    maxIters: 300,
    tol: 1e-7,
    seed: 1
  });
  return {
    n,
    edges,
    order: Array.from(res.order),
    converged: res.converged,
    iters: res.iters,
    lastDelta: res.lastDelta
  };
})()
)}

function _sift_docs(md){return(
md`## What “sifting” does (and why it helps)

After we get an initial circular order (e.g. from the spectral angles), we optionally run a **local improvement** step called **sifting** (a.k.a. *reinsertion*).

### Move being optimized
For a chosen vertex **v**:
1. **Remove** v from the current cyclic order (cut it out of the circle).
2. Try **re-inserting** v at every possible position in the remaining order (all \(n\) slots around the circle).
3. Pick the position that yields the **fewest chord crossings** (ties broken deterministically).

This is a *1-vertex move* neighborhood search: it never changes which pairs are connected; it only changes where one vertex sits on the circle.

### Geometric intuition (circle + chords)
Fix an order of all vertices except v. As you slide v around the circle:
- each incident edge \((v, u)\) becomes a chord whose endpoints “sweep” past other endpoints,
- chord intersections change only when v passes another vertex (i.e. when the circular order changes discretely),
- so the crossing count is **piecewise constant** across slots, and we can search all slots exactly by brute force.

Heuristically, sifting tends to:
- pull a vertex closer (in angular terms) to the block of vertices it connects to,
- reduce “long” interleavings where v’s incident chords cut across many unrelated chords.

### Passes and vertex order
A **sift pass** runs the reinsertion step for a sequence of vertices, updating the order after each vertex move.
- \`passes\`: how many full rounds to do (often 1–2 is plenty).
- \`vertexSequence: "id"\`: visit vertices in numeric id order (fully deterministic).
- \`vertexSequence: "order"\`: visit in the current circular order (sometimes slightly better as a post-process after another heuristic).

Note: sifting is a greedy local search—fast and often effective, but not guaranteed to find a global minimum.`
)}

function _sift_docs2(md){return(
md`### How to read the implementation below

- **\`bestInsertPosition\`**: implements “remove v, try all slots, keep best”.
- **\`siftPass\`**: applies \`bestInsertPosition\` to a whole vertex sequence once.
- **\`improveOrderSifting\`**: repeats \`siftPass\` for multiple passes.

This version is intentionally simple (recomputes crossings from scratch per candidate) because \(n \le 40\) in this notebook. For larger graphs, you’d typically maintain incremental crossing counts per move instead of re-evaluating the full objective each time.`
)}

function _bestInsertPosition(crossingsCount){return(
(n, edges, order, v) => {
  const arr = Array.from(order);
  const k = arr.indexOf(v);
  if (k < 0) throw new Error("v not found in order");
  arr.splice(k, 1);
  let bestPos = 0;
  let bestCross = Infinity;
  let bestOrder = null;
  for (let pos = 0; pos <= arr.length; pos++) {
    const cand = arr.slice(0, pos);
    cand.push(v);
    for (let i = pos; i < arr.length; i++) cand.push(arr[i]);
    const candOrder = Int32Array.from(cand);
    const c = crossingsCount(n, edges, candOrder);
    if (c < bestCross || (c === bestCross && pos < bestPos)) {
      bestCross = c;
      bestPos = pos;
      bestOrder = candOrder;
    }
  }
  return { pos: bestPos, crossings: bestCross, order: bestOrder };
}
)}

function _siftPass(crossingsCount,bestInsertPosition){return(
(n, edges, order, { vertexSequence = "id" } = {}) => {
  let current = Int32Array.from(order);
  let currentCross = crossingsCount(n, edges, current);

  let seq;
  if (vertexSequence === "order") seq = Array.from(current);
  else seq = Array.from({ length: n }, (_, i) => i);

  for (const v of seq) {
    const best = bestInsertPosition(n, edges, current, v);
    current = best.order;
    currentCross = best.crossings;
  }

  return { order: current, crossings: currentCross };
}
)}

function _improveOrderSifting(crossingsCount,siftPass){return(
(
  n,
  edges,
  initOrder,
  { passes = 1, vertexSequence = "id" } = {}
) => {
  let order = Int32Array.from(initOrder);
  let crossings = crossingsCount(n, edges, order);
  const passCount = Math.max(0, passes | 0);

  for (let p = 0; p < passCount; p++) {
    const res = siftPass(n, edges, order, { vertexSequence });
    order = res.order;
    crossings = res.crossings;
  }

  return { order, crossings, passes: passCount };
}
)}

function _bestOfRandomOrders(crossingsCount,improveOrderSifting){return(
(
  n,
  edges,
  { R = 20, seed = 1, postSiftPasses = 0 } = {}
) => {
  const adj = Array.from({ length: n }, () => []);
  for (const e of edges) {
    const a0 = e[0] | 0,
      b0 = e[1] | 0;
    if (a0 === b0) continue;
    if (a0 < 0 || b0 < 0 || a0 >= n || b0 >= n) continue;
    adj[a0].push(b0);
    adj[b0].push(a0);
  }

  const deg = new Int32Array(n);
  for (let i = 0; i < n; i++) deg[i] = adj[i].length;

  const starts = Array.from({ length: n }, (_, i) => i);
  starts.sort((i, j) => deg[j] - deg[i] || i - j);

  const K = Math.min(n, Math.max(0, R | 0));
  if (K === 0) {
    const order = Int32Array.from({ length: n }, (_, i) => i);
    const crossings = crossingsCount(n, edges, order);
    return { order, crossings, R: 0, seed: seed | 0, method: "natural" };
  }

  const greedyFromStart = (s) => {
    const placed = new Uint8Array(n);
    const score = new Int32Array(n);
    const order = new Int32Array(n);

    placed[s] = 1;
    order[0] = s;
    for (const nb of adj[s]) score[nb]++;

    for (let k = 1; k < n; k++) {
      let best = -1;
      let bestScore = -2147483648;
      let bestDeg = -2147483648;

      for (let v = 0; v < n; v++) {
        if (placed[v]) continue;
        const sv = score[v];
        const dv = deg[v];
        if (
          sv > bestScore ||
          (sv === bestScore && (dv > bestDeg || (dv === bestDeg && v < best)))
        ) {
          best = v;
          bestScore = sv;
          bestDeg = dv;
        }
      }

      order[k] = best;
      placed[best] = 1;
      for (const nb of adj[best]) if (!placed[nb]) score[nb]++;
    }

    return order;
  };

  let bestCross = Infinity;
  let bestOrder = null;

  for (let t = 0; t < K; t++) {
    const s = starts[t];
    const order = greedyFromStart(s);
    const c = crossingsCount(n, edges, order);
    if (c < bestCross) {
      bestCross = c;
      bestOrder = order;
    }
  }

  const passes = Math.max(0, postSiftPasses | 0);
  if (passes > 0) {
    const sifted = improveOrderSifting(n, edges, bestOrder, {
      passes,
      vertexSequence: "order"
    });
    bestOrder = sifted.order;
    bestCross = sifted.crossings;
  }

  return {
    order: bestOrder,
    crossings: bestCross,
    R: K,
    seed: seed | 0,
    method: "greedy-starts",
    postSiftPasses: passes
  };
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("introduction")).define("introduction", ["md"], _introduction);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("visualizeModules", child1);
  main.variable(observer("viewof useSpectral")).define("viewof useSpectral", ["Inputs"], _useSpectral);
  main.variable(observer("useSpectral")).define("useSpectral", ["Generators", "viewof useSpectral"], (G, _) => G.input(_));
  main.variable(observer()).define(["visualizeModules","useSpectral"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof params")).define("viewof params", ["Inputs"], _params);
  main.variable(observer("params")).define("params", ["Generators", "viewof params"], (G, _) => G.input(_));
  main.variable(observer("viewof actions")).define("viewof actions", ["Inputs"], _actions);
  main.variable(observer("actions")).define("actions", ["Generators", "viewof actions"], (G, _) => G.input(_));
  main.variable(observer("dashboard")).define("dashboard", ["params","viewof edges","edgeKey","buildCSR","spectralCircleOrder","d3","crossingsCount","improveOrderSifting","bestOfRandomOrders","chordPlot","htl","viewof plot_editor"], _dashboard);
  main.variable(observer("edgeKey")).define("edgeKey", _edgeKey);
  main.variable(observer("normalizeEdge")).define("normalizeEdge", _normalizeEdge);
  main.variable(observer("viewof edges")).define("viewof edges", ["Inputs"], _edges);
  main.variable(observer("edges")).define("edges", ["Generators", "viewof edges"], (G, _) => G.input(_));
  main.variable(observer("edgesController")).define("edgesController", ["actions","viewof edges","Event","params","makeRng"], _edgesController);
  main.variable(observer("edgeDomainFull")).define("edgeDomainFull", ["params"], _edgeDomainFull);
  main.variable(observer("crossingsCount")).define("crossingsCount", _crossingsCount);
  main.variable(observer("chordPlot")).define("chordPlot", ["Plot"], _chordPlot);
  main.variable(observer("viewof plot_editor")).define("viewof plot_editor", ["params","edges","edgeKey","Plot","d3","edgeDomainFull","viewof edges","Event","invalidation"], _plot_editor);
  main.variable(observer("plot_editor")).define("plot_editor", ["Generators", "viewof plot_editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("assert")).define("assert", _assert);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("buildCSR")).define("buildCSR", ["assert"], _buildCSR);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("applyM_normAdj")).define("applyM_normAdj", ["assert"], _applyM_normAdj);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("makeRng")).define("makeRng", _makeRng);
  main.variable(observer("dot")).define("dot", _dot);
  main.variable(observer("norm2")).define("norm2", ["dot"], _norm2);
  main.variable(observer("scaleInPlace")).define("scaleInPlace", _scaleInPlace);
  main.variable(observer("copyInto")).define("copyInto", _copyInto);
  main.variable(observer("stableArgsortByKey")).define("stableArgsortByKey", _stableArgsortByKey);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("ortho2")).define("ortho2", ["norm2","scaleInPlace","dot"], _ortho2);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("blockPower2")).define("blockPower2", ["makeRng","ortho2","copyInto","dot"], _blockPower2);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("circularOrderFromUV")).define("circularOrderFromUV", ["assert","stableArgsortByKey"], _circularOrderFromUV);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("spectralCircleOrder")).define("spectralCircleOrder", ["assert","applyM_normAdj","blockPower2","circularOrderFromUV"], _spectralCircleOrder);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("example")).define("example", ["buildCSR","spectralCircleOrder"], _example);
  main.variable(observer("sift_docs")).define("sift_docs", ["md"], _sift_docs);
  main.variable(observer("sift_docs2")).define("sift_docs2", ["md"], _sift_docs2);
  main.variable(observer("bestInsertPosition")).define("bestInsertPosition", ["crossingsCount"], _bestInsertPosition);
  main.variable(observer("siftPass")).define("siftPass", ["crossingsCount","bestInsertPosition"], _siftPass);
  main.variable(observer("improveOrderSifting")).define("improveOrderSifting", ["crossingsCount","siftPass"], _improveOrderSifting);
  main.variable(observer("bestOfRandomOrders")).define("bestOfRandomOrders", ["crossingsCount","improveOrderSifting"], _bestOfRandomOrders);
  return main;
}
