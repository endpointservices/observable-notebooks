import define1 from "./e1c39d41e8e944b0@950.js";
import define2 from "./98f34e974bb2e4bc@958.js";
import define3 from "./db42ae70222a8b08@1170.js";
import define4 from "./a6a56ee61aba9799@409.js";
import define5 from "./b316487cf25bf2ee@290.js";

function _1(md){return(
md`# Atlas (original)`
)}

async function _atlas(moduleLadder,runtime,width){return(
await moduleLadder({ runtime, width })
)}

function _moduleLadder(runtime,width,isOnObservableCom,linkTo,moduleMap,d3,spectralCircleOrder,improveOrderSifting,bestOfRandomOrders,Plot){return(
async ({
  runtime: _runtime = runtime,
  useSpectral = true,
  showBuiltins = false,
  showAnonymous = false,
  includeModule = () => true,
  includeVariable = () => true,
  height: _height = undefined,
  width: _width = width ?? 960,
  boxWidth = 240,
  portLabelWidth = 280,
  arcWidth = 220,
  rowHeight = 14,
  moduleGap = 14,
  rowGap = 2
} = {}) => {
  const target = (typeof isOnObservableCom === "function" && isOnObservableCom()) ? "_blank" : undefined;

  const safeLinkTo = (s) => {
    if (typeof linkTo !== "function") return undefined;
    try { return linkTo(s); } catch { return undefined; }
  };

  const isDisplayName = (name) => {
    if (name == null) return false;
    if (typeof name !== "string") return false;
    if (!showAnonymous && name.trim() === "") return false;
    if (!showAnonymous && (name.startsWith("module ") || name.startsWith("dynamic "))) return false;
    return true;
  };

  const isDisplayVar = (v) => {
    try {
      if (!v) return false;
      if (!includeVariable(v)) return false;
      const name = v._name;
      if (!showAnonymous && (name == null || typeof name !== "string")) return false;
      if (typeof name === "string") {
        if (name === "@variable") return false;
        if (!showAnonymous && (name.startsWith("module ") || name.startsWith("dynamic "))) return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const varId = (() => {
    let next = 1;
    const wm = new WeakMap();
    return (v) => {
      if (!v || (typeof v !== "object" && typeof v !== "function")) return 0;
      let id = wm.get(v);
      if (!id) wm.set(v, id = next++);
      return id;
    };
  })();

  const buildCSRLocal = (n, edges) => {
    const adj = Array.from({ length: n }, () => []);
    for (const [a0, b0] of edges) {
      const a = a0 | 0, b = b0 | 0;
      if (a === b) continue;
      if (a < 0 || b < 0 || a >= n || b >= n) continue;
      adj[a].push(b);
      adj[b].push(a);
    }
    const deg = new Float64Array(n);
    let nnz = 0;
    for (let i = 0; i < n; i++) {
      const row = adj[i];
      row.sort((x, y) => x - y);
      let w = 0;
      for (let j = 0; j < row.length; j++) if (w === 0 || row[j] !== row[w - 1]) row[w++] = row[j];
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
        val[p] = 1;
        p++;
      }
    }
    rowPtr[n] = p;
    return { n, rowPtr, colIdx, val, deg };
  };

  const crossingsCountLine = (n, edges, order) => {
    const pos = new Int32Array(n);
    for (let i = 0; i < n; i++) pos[order[i] | 0] = i;

    const intervals = [];
    for (const [a0, b0] of edges) {
      const a = a0 | 0, b = b0 | 0;
      if (a === b) continue;
      const i = pos[a], j = pos[b];
      const s = Math.min(i, j), t = Math.max(i, j);
      if (s === t) continue;
      intervals.push([s, t]);
    }

    intervals.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    const bit = new Int32Array(n + 1);
    const add = (i) => { for (let x = i + 1; x <= n; x += x & -x) bit[x]++; };
    const sum = (i) => { let s = 0; for (let x = i + 1; x > 0; x -= x & -x) s += bit[x]; return s; };
    const range = (l, r) => (r < l) ? 0 : (sum(r) - (l > 0 ? sum(l - 1) : 0));

    let crossings = 0;
    let k = 0;
    while (k < intervals.length) {
      const s = intervals[k][0];
      let k2 = k;
      while (k2 < intervals.length && intervals[k2][0] === s) k2++;
      for (let t = k; t < k2; t++) crossings += range(s + 1, intervals[t][1] - 1);
      for (let t = k; t < k2; t++) add(intervals[t][1]);
      k = k2;
    }
    return crossings;
  };

  const moduleMapResult = (typeof moduleMap === "function") ? await moduleMap(_runtime) : new Map();

  const moduleNameOf = (m) => {
    const rec = moduleMapResult.get(m);
    const name = rec?.name;
    if (typeof name === "string" && name.trim().length) return name;
    return "<unknown>";
  };

  const allVars = Array.from(_runtime?._variables ?? []);
  const varEdgesRaw = [];
  const seenVarEdge = new Set();
  for (const v of allVars) {
    if (!isDisplayVar(v)) continue;
    const vMod = v._module;
    const inputs = Array.from(v._inputs ?? []);
    for (const u of inputs) {
      if (!u) continue;
      if (u._module === vMod) continue;
      if (!isDisplayVar(u)) continue;

      const fromName = moduleNameOf(u._module);
      const toName = moduleNameOf(vMod);
      if (!showBuiltins && (fromName === "builtin" || toName === "builtin")) continue;

      const id = varId(u);
      const k = `${fromName}|${toName}|${id}`;
      if (seenVarEdge.has(k)) continue;
      seenVarEdge.add(k);

      varEdgesRaw.push({
        fromModule: u._module,
        toModule: vMod,
        fromModuleName: fromName,
        toModuleName: toName,
        exportedVar: u,
        exportedVarName: u._name,
        exportedVarId: id,
        importingVar: v
      });
    }
  }

  const moduleSet = new Set();
  for (const v of allVars) if (v?._module) moduleSet.add(v._module);
  for (const e of varEdgesRaw) { moduleSet.add(e.fromModule); moduleSet.add(e.toModule); }

  let modules = Array.from(moduleSet, (m) => ({ module: m, name: moduleNameOf(m), info: moduleMapResult.get(m) }))
    .filter(d => d.name && d.name !== "<unknown>")
    .filter(d => showBuiltins || d.name !== "builtin")
    .filter(d => includeModule(d));

  const uniqByName = new Map();
  for (const m of modules) if (!uniqByName.has(m.name)) uniqByName.set(m.name, m);
  modules = Array.from(uniqByName.values());

  modules.sort((a, b) => d3.ascending(a.name, b.name));
  const n = modules.length;

  const indexOf = new Map(modules.map((m, i) => [m.module, i]));
  const undirectedEdges = [];
  const seenModEdge = new Set();
  for (const e of varEdgesRaw) {
    const i = indexOf.get(e.fromModule);
    const j = indexOf.get(e.toModule);
    if (i == null || j == null || i === j) continue;
    const a = Math.min(i, j), b = Math.max(i, j);
    const k = `${a},${b}`;
    if (seenModEdge.has(k)) continue;
    seenModEdge.add(k);
    undirectedEdges.push([a, b]);
  }

  let circleOrder = Int32Array.from(d3.range(n));
  if (useSpectral && typeof spectralCircleOrder === "function" && n > 2 && undirectedEdges.length > 0) {
    try {
      const csr = buildCSRLocal(n, undirectedEdges);
      const spectral = spectralCircleOrder(csr, { alpha: 0.92, maxIters: 80, tol: 1e-4, seed: 1, passesOrtho: 1 });
      let order = spectral.order;

      if (typeof improveOrderSifting === "function") {
        const sifted = improveOrderSifting(n, undirectedEdges, order, { passes: 1, vertexSequence: "order" });
        order = sifted.order ?? order;
      }

      if (typeof bestOfRandomOrders === "function") {
        const cOrder = crossingsCountLine(n, undirectedEdges, Int32Array.from(order));
        const baseline = bestOfRandomOrders(n, undirectedEdges, { R: Math.min(n, 12), seed: 1, postSiftPasses: 0 });
        if (baseline?.order && baseline.crossings < cOrder) order = baseline.order;
      }

      circleOrder = Int32Array.from(order);
    } catch {
      circleOrder = Int32Array.from(d3.range(n));
    }
  }

  const circle = Array.from(circleOrder);
  const chooseBestCut = () => {
    if (n <= 2 || undirectedEdges.length === 0) return circle;
    let best = null;
    let bestC = Infinity;
    for (let k = 0; k < n; k++) {
      const ord = circle.slice(k).concat(circle.slice(0, k));
      const c = crossingsCountLine(n, undirectedEdges, ord);
      if (c < bestC || (c === bestC && k < (best?.k ?? Infinity))) best = { k, ord, c };
      if (bestC === 0) break;
    }
    return best?.ord ?? circle;
  };

  const linearOrderIdx = chooseBestCut();
  const orderedModules = linearOrderIdx.map(i => modules[i]);
  const moduleNamesOrdered = orderedModules.map(m => m.name);

  const moduleByName = new Map(orderedModules.map(m => [m.name, m]));
  const filteredEdges = varEdgesRaw.filter(e => moduleByName.has(e.fromModuleName) && moduleByName.has(e.toModuleName));

  const importsByModule = new Map(moduleNamesOrdered.map(n => [n, new Map()]));
  const exportsByModule = new Map(moduleNamesOrdered.map(n => [n, new Map()]));

  for (const e of filteredEdges) {
    const impMap = importsByModule.get(e.toModuleName);
    const expMap = exportsByModule.get(e.fromModuleName);
    if (impMap) impMap.set(e.exportedVarId, e.exportedVar);
    if (expMap) expMap.set(e.exportedVarId, e.exportedVar);
  }

  const kindColor = (kind) => ({
    import: "#1f77b4",
    export: "#2ca02c",
    both: "#9467bd",
    empty: "#999",
    spacer: "#0000"
  }[kind] ?? "#999");

  const safeVarHref = (moduleName, varName) => {
    if (typeof varName !== "string" || !varName.length) return safeLinkTo(moduleName);
    const attempt1 = safeLinkTo(`${moduleName}#${varName}`);
    if (attempt1) return attempt1;
    return safeLinkTo(moduleName);
  };

  const rows = [];
  const moduleBoxes = [];
  const importY = new Map();
  const exportY = new Map();

  const rowIdFor = (moduleName, kind, v) => {
    const vid = v ? varId(v) : 0;
    const vn = v?._name ?? "";
    return `${moduleName}::${kind}::${vn}::${vid}`;
  };

  let y = 0;
  for (let mi = 0; mi < orderedModules.length; mi++) {
    const m = orderedModules[mi];
    const mname = m.name;

    const imp = importsByModule.get(mname) ?? new Map();
    const exp = exportsByModule.get(mname) ?? new Map();

    const expIds = new Set(exp.keys());
    const impIds = new Set(imp.keys());

    const bothIds = new Set([...impIds].filter(id => expIds.has(id)));
    const importsOnly = [...imp.entries()].filter(([id]) => !bothIds.has(id)).map(([, v]) => v);
    const both = [...bothIds].map(id => imp.get(id) ?? exp.get(id)).filter(Boolean);
    const exportsOnly = [...exp.entries()].filter(([id]) => !bothIds.has(id)).map(([, v]) => v);

    const sortVars = (a, b) => d3.ascending(String(a?._name ?? ""), String(b?._name ?? "")) || d3.ascending(varId(a), varId(b));
    importsOnly.sort(sortVars);
    both.sort(sortVars);
    exportsOnly.sort(sortVars);

    const moduleHref = safeLinkTo(mname);

    const addRow = (kind, v) => {
      const id = rowIdFor(mname, kind, v);
      const label = v?._name ?? "";
      const href = (kind === "spacer") ? undefined : safeVarHref(mname, label) ?? moduleHref;

      const payload =
        kind === "spacer" ? { type: "spacer", moduleName: mname } :
        kind === "empty" ? { type: "module", moduleName: mname, module: m.module } :
        { type: "port", moduleName: mname, kind, varName: label, var: v };

      const row = {
        rowId: id,
        moduleName: mname,
        moduleIndex: mi,
        kind,
        var: v,
        varName: label,
        y,
        x: 0,
        href,
        payload
      };
      rows.push(row);

      if (kind === "import" || kind === "both") {
        if (v) importY.set(`${mname}|${varId(v)}`, y);
      }
      if (kind === "export" || kind === "both") {
        if (v) exportY.set(`${mname}|${varId(v)}`, y);
      }

      y++;
    };

    const yStart = y;

    if (importsOnly.length + both.length + exportsOnly.length === 0) {
      addRow("empty", null);
    } else {
      for (const v of importsOnly) addRow("import", v);
      for (const v of both) addRow("both", v);
      for (const v of exportsOnly) addRow("export", v);
    }

    const yEnd = y - 1;

    moduleBoxes.push({
      type: "module",
      moduleName: mname,
      module: m.module,
      moduleIndex: mi,
      x1: 10,
      x2: 10 + boxWidth,
      y1: yStart - 0.5,
      y2: yEnd + 0.5,
      yc: (yStart + yEnd) / 2,
      href: moduleHref,
      payload: { type: "module", moduleName: mname, module: m.module }
    });

    addRow("spacer", null);
  }

  if (rows.length && rows[rows.length - 1].kind === "spacer") {
    rows.pop();
    y--;
  }

  const totalRows = rows.length;
  const computedHeight = Math.ceil(totalRows * (rowHeight + rowGap) + moduleGap * Math.max(0, orderedModules.length - 1) + 40);
  const height = _height ?? computedHeight;

  const xBoxLeft = 10;
  const xBoxRight = xBoxLeft + boxWidth;
  const xPorts = xBoxRight;
  const xLabels = xBoxRight + 10;
  const xArcMid = xBoxRight + Math.max(40, arcWidth * 0.65);

  const minWidth = xBoxRight + 10 + portLabelWidth + 10 + arcWidth + 30;
  const plotWidth = Math.max(_width ?? minWidth, minWidth);

  const rowYpx = (row) => 20 + row.y * (rowHeight + rowGap) + rowHeight / 2;
  const yPx = (yIndex) => 20 + yIndex * (rowHeight + rowGap) + rowHeight / 2;
  const boxY1px = (box) => 20 + (box.y1 + 0.5) * (rowHeight + rowGap);
  const boxY2px = (box) => 20 + (box.y2 + 0.5) * (rowHeight + rowGap);

  const portPoints = rows
    .filter(r => r.kind !== "spacer")
    .map(r => ({
      ...r,
      x: xPorts,
      yPx: rowYpx(r)
    }));

  const labelPoints = portPoints.map(r => ({
    ...r,
    x: xLabels
  }));

  const moduleLabelPoints = moduleBoxes.map(b => ({
    ...b,
    x: xBoxLeft + 8,
    yPx: yPx(Math.max(0, Math.min(totalRows - 1, Math.round(b.yc))))
  }));

  const moduleHotspots = moduleBoxes.map(b => ({
    ...b,
    x: (xBoxLeft + xBoxRight) / 2,
    yPx: yPx(Math.max(0, Math.min(totalRows - 1, Math.round(b.yc)))),
    href: b.href,
    payload: b.payload
  }));

  const links = [];
  const seenLink = new Set();
  for (const e of filteredEdges) {
    const fromName = e.fromModuleName;
    const toName = e.toModuleName;
    const id = e.exportedVarId;
    const y1 = exportY.get(`${fromName}|${id}`);
    const y2 = importY.get(`${toName}|${id}`);
    if (y1 == null || y2 == null) continue;
    if (y1 === y2) continue;

    const k = `${fromName}|${toName}|${id}`;
    if (seenLink.has(k)) continue;
    seenLink.add(k);

    links.push({
      type: "link",
      fromModuleName: fromName,
      toModuleName: toName,
      varName: e.exportedVarName ?? "",
      var: e.exportedVar,
      y1Px: yPx(y1),
      y2Px: yPx(y2),
      x: xPorts,
      href: safeVarHref(fromName, e.exportedVarName) ?? safeLinkTo(fromName),
      payload: { type: "link", fromModuleName: fromName, toModuleName: toName, varName: e.exportedVarName, exportedVar: e.exportedVar }
    });
  }

  const linkHotspots = links.map(l => ({
    ...l,
    x: xArcMid,
    yPx: (l.y1Px + l.y2Px) / 2
  }));

  const spacerRules = rows
    .filter(r => r.kind === "spacer")
    .map(r => ({
      yPx: rowYpx(r) - (rowHeight + rowGap) / 2
    }));

  const plot = Plot.plot({
    width: plotWidth,
    height,
    axis: null,
    margin: 0,
    x: { domain: [0, plotWidth] },
    y: { domain: [height, 0] },
    color: { domain: moduleNamesOrdered, unknown: "#999" },
    marks: [
      Plot.ruleY(spacerRules, { y: "yPx", stroke: "#ddd", strokeDasharray: "4,6" }),

      Plot.rect(moduleBoxes, {
        x1: xBoxLeft,
        x2: xBoxRight,
        y1: d => boxY1px(d),
        y2: d => boxY2px(d),
        fill: "#fff",
        stroke: "#999"
      }),

      Plot.text(moduleLabelPoints, {
        x: "x",
        y: "yPx",
        text: "moduleName",
        textAnchor: "start",
        fontSize: 12,
        fontWeight: 600,
        href: d => d.href,
        ...(target ? { target } : null)
      }),

      Plot.arrow(links, {
        x: "x",
        y1: "y1Px",
        y2: "y2Px",
        sweep: "-y",
        bend: 90,
        headLength: 0,
        stroke: "fromModuleName",
        strokeOpacity: 0.35,
        strokeWidth: 1
      }),

      Plot.dot(portPoints, {
        x: "x",
        y: "yPx",
        r: 3,
        fill: d => kindColor(d.kind),
        stroke: "none"
      }),

      Plot.text(labelPoints, {
        x: "x",
        y: "yPx",
        text: d => d.kind === "empty" ? "" : d.varName,
        textAnchor: "start",
        fontSize: 11,
        fill: d => kindColor(d.kind),
        href: d => d.href,
        ...(target ? { target } : null)
      }),

      Plot.dot(
        portPoints.filter(d => d.kind !== "spacer"),
        { x: "x", y: "yPx", r: 9, fill: "#0000", stroke: "#0000", href: "href", ...(target ? { target } : null), value: d => d.payload }
      ),
      Plot.dot(
        moduleHotspots,
        { x: "x", y: "yPx", r: boxWidth * 0.55, fill: "#0000", stroke: "#0000", href: "href", ...(target ? { target } : null), value: d => d.payload }
      ),
      Plot.dot(
        linkHotspots,
        { x: "x", y: "yPx", r: 10, fill: "#0000", stroke: "#0000", href: "href", ...(target ? { target } : null), value: d => d.payload }
      ),

      Plot.tip(
        portPoints.filter(d => d.kind !== "spacer"),
        Plot.pointer({
          x: "x",
          y: "yPx",
          maxRadius: 24,
          title: d => {
            const kind = d.kind === "both" ? "both (import+export)" : d.kind;
            return `${d.moduleName}\n${kind}: ${d.varName}`;
          }
        })
      ),
      Plot.tip(
        moduleHotspots,
        Plot.pointer({
          x: "x",
          y: "yPx",
          maxRadius: Infinity,
          title: d => {
            const imp = importsByModule.get(d.moduleName)?.size ?? 0;
            const exp = exportsByModule.get(d.moduleName)?.size ?? 0;
            return `${d.moduleName}\nimports: ${imp}\nexports: ${exp}`;
          }
        })
      ),
      Plot.tip(
        linkHotspots,
        Plot.pointer({
          x: "x",
          y: "yPx",
          maxRadius: 24,
          title: d => `${d.varName}\n${d.fromModuleName} → ${d.toModuleName}`
        })
      ),

      Plot.dot(
        portPoints.filter(d => d.kind !== "spacer"),
        Plot.pointer({
          x: "x",
          y: "yPx",
          r: 7,
          stroke: d => kindColor(d.kind),
          fill: "none",
          maxRadius: 24
        })
      )
    ]
  });

  return plot;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof atlas")).define("viewof atlas", ["moduleLadder","runtime","width"], _atlas);
  main.variable(observer("atlas")).define("atlas", ["Generators", "viewof atlas"], (G, _) => G.input(_));
  main.variable(observer("moduleLadder")).define("moduleLadder", ["runtime","width","isOnObservableCom","linkTo","moduleMap","d3","spectralCircleOrder","improveOrderSifting","bestOfRandomOrders","Plot"], _moduleLadder);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  const child2 = runtime.module(define2);
  main.import("isOnObservableCom", child2);
  const child3 = runtime.module(define3);
  main.import("moduleMap", child3);
  const child4 = runtime.module(define4);
  main.import("linkTo", child4);
  const child5 = runtime.module(define5);
  main.import("spectralCircleOrder", child5);
  main.import("improveOrderSifting", child5);
  main.import("bestOfRandomOrders", child5);
  return main;
}
