import define1 from "./e627aaaaa9857257@1727.js";
import define2 from "./10c7899865f8a76e@8998.js";
import define3 from "./36cfe905f8ad18c6@37.js";
import define4 from "./f109935193c0deba@4551.js";

function _1(md){return(
md`# Spec: “Module Interconnection Ladder” (vertical boxes + variable ports + arc links)

## Goal
Build a **single Plot** visualization that shows:
- A **vertical stack of modules** (each module is a box; modules are ordered to reduce crossings).
- For each module, a set of **variable “ports” on the right edge**:
  - **Imports** (variables referenced from other modules) in the **top half** of the module’s port list.
  - **Exports** (variables from this module referenced by other modules) in the **bottom half**.
  - Variables that are **both imported and exported** should appear in the **middle band**.
- **Arced links** (arc diagram style) connecting imported variables to their exported definitions across modules.
- Modules and variables are **clickable via Plot pointer interactions**; module boxes and variable ports should expose a **hyperlink** to the underlying Observable cell / module page.

This is a replacement/new viz in the distiller family (distinct from the circular module-map and cell-map visualizations).

---

## Intended API / notebook surface
Implement a new exported view (name is flexible, but keep consistent with existing style):
- \\\`viewof moduleLadder\\\` (or \\\`viewof distiller\\\` if you’re replacing an existing view)

Suggested call signature:
\`\`\`js
viewof moduleLadder = moduleLadder({
  runtime,                 // default: current runtime
  useSpectral: true,       // default true
  showBuiltins: false,     // default false
  showAnonymous: false,    // default false
  includeModule: m => true,// filter hook
  includeVariable: v => true, // filter hook
  height: undefined,       // default computed
  width: 960,              // default width
  boxWidth: 240,
  portLabelWidth: 280,
  arcWidth: 220,
  rowGap: 2,
  moduleGap: 14
})
\`\`\`

Dependencies to reuse (already present in codebase):
- \\\`moduleMap(runtime)\\\` from **@tomlarkworthy/module-map**
- \\\`cellMap(...)\\\` optional (only if you want cell-level grouping; not required)
- \\\`spectralCircleOrder\\\`, \\\`improveOrderSifting\\\`, \\\`bestOfRandomOrders\\\` from **@tomlarkworthy/spectral-layout**
- \\\`linkTo\\\`, \\\`isOnObservableCom\\\` from existing toolchain in notebooks
- Plot arc style reference: **@observablehq/plot-arc-diagram** (use \\\`Plot.arrow\\\` with \\\`bend\\\` and \\\`sweep: "-y"\\\`)

---

## Data model to compute

### 1) Enumerate modules
Use \\\`moduleMap(runtime)\\\` (or equivalent existing module discovery used by module-map) to get module records:
- module name (string)
- module object ref
- (optional) module dom/specifiers if known

Filter:
- if \\\`showBuiltins === false\\\`, exclude module named \\\`"builtin"\\\` (and/or any moduleMap record with type builtin)
- if \\\`includeModule\\\` provided, apply it

Create:
- \\\`modules: Array<{name, module, info}>\\\`

### 2) Compute cross-module variable edges (imports/exports)
Work off runtime variable dependency graph:
- For each runtime variable \\\`v\\\` with \\\`v._name\\\`:
  - For each input \\\`u\\\` in \\\`v._inputs\\\`:
    - If \\\`u._module !== v._module\\\`, then:
      - \\\`v._module\\\` **imports** \\\`u\\\`
      - \\\`u._module\\\` **exports** \\\`u\\\` (to \\\`v._module\\\`)

Represent edges as “variable-level links”:
\`\`\`js
type VarEdge = {
  fromModule: ModuleRef,      // exporter module (u._module)
  toModule: ModuleRef,        // importer module (v._module)
  exportedVar: RuntimeVarRef,  // u
  importingVar: RuntimeVarRef, // v (optional, mostly for context)
}
\`\`\`

De-duplication:
- Multiple importers might reference the same exported variable; keep distinct edges by (exportedVar, toModule) or by full (exportedVar, importingVar) depending on density.
- For display clarity, prefer de-dupe to (exportedVar, toModule) unless user hovers/pins (see Interaction).

Filtering:
- Apply \\\`includeVariable\\\` to both exportedVar and importingVar.
- Exclude anonymous vars by default (\\\`showAnonymous === false\\\`):
  - \\\`v._name == null\\\` or numeric group keys => exclude
  - optionally exclude \\\`dynamic \\\`, \\\`module \\\`, internal bridge vars (like \\\`@variable\\\`) unless explicitly included.

### 3) Module-level graph for ordering
Construct an undirected module graph from VarEdges:
- vertices = module indices
- undirected edge exists between module A and B if any VarEdge crosses between them
- de-dupe edges

This is the graph to feed spectral layout.

---

## Layout / ordering

### 4) Compute a “best” circular order of modules
Use the spectral pipeline already implemented:
1. Build CSR from undirected module edges.
2. \\\`spectralCircleOrder(csr, {alpha, maxIters, tol, seed, passesOrtho})\\\`
3. Post-improve: \\\`improveOrderSifting(n, edges, order, {passes: 1, vertexSequence: "order"})\\\`
4. Compare with \\\`bestOfRandomOrders\\\` baseline (optional) and keep best crossings.

Use this to get a **cycle order** of modules.

### 5) Cut the cycle into a line at minimal crossings
We need a **linear order** for a vertical list. A circular order has N rotations; pick the rotation that minimizes crossings when drawn as an arc diagram on a line.

Algorithm:
- Let \\\`circle = [m0, m1, ... m(n-1)]\\\` be the chosen cyclic order.
- For each cut \\\`k in [0..n-1]\\\`, define linear order:
  - \\\`order_k = circle.slice(k).concat(circle.slice(0,k))\\\`
- Score \\\`order_k\\\` using crossings count on the *undirected module edges* (same crossingsCount as spectral-layout uses for line order).
- Choose \\\`k*\\\` with minimal crossings; tie-break by smallest k for determinism.

Result:
- \\\`moduleOrder: ModuleRef[]\\\` in top-to-bottom order.

---

## Y-axis domain and port rows (the “ladder”)

### 6) Build per-module port lists
For each module M:
- \\\`imports(M)\\\`: set of exportedVar runtime variables where some other module’s variable depends on it and M is the importer (i.e. \\\`VarEdge.toModule === M\\\`)
  - For import “names”, display \\\`exportedVar._name\\\` (the upstream variable name).
  - Keep a stable sort (lexicographic by name, then by identity).
- \\\`exports(M)\\\`: set of runtime variables defined in M that are depended on by other modules (i.e. appear as \\\`VarEdge.exportedVar\\\` with \\\`fromModule === M\\\`)
- \\\`both(M)\\\`: intersection by runtime var identity (a var can be both imported into M and exported from M, e.g. re-export patterns)

Create three ordered arrays:
- \\\`importsOnly = imports \\\\ both\\\`
- \\\`both\\\`
- \\\`exportsOnly = exports \\\\ both\\\`

Final port order within module:
- \\\`importsOnly\\\` (top band)
- \\\`both\\\` (middle band)
- \\\`exportsOnly\\\` (bottom band)

### 7) Flatten to a global Y domain (categorical)
Define each “row” as a unique id:
\`\`\`js
rowId = \\\`\${moduleName}::\${kind}::\${varName}::\${varId}\\\`
kind ∈ {"import","both","export"}
\`\`\`

Build:
- \\\`rows: Array<{rowId, moduleName, moduleIndex, kind, var, label, href}>\\\`
- The Y domain is \\\`rows.map(r => r.rowId)\\\`
- Insert “spacer rows” between modules to visually separate boxes (optional): e.g. \\\`rowId = \\\`\${moduleName}::spacer\\\`\\\`

Height:
- \\\`height = rows.length * (rowGap + 1) + moduleGap * moduleCount\\\` (or a simpler linear formula).

---

## Drawing spec (Plot marks)

### 8) Coordinate system
- Use Plot with:
  - \\\`y: { type: "point", domain: yDomain, axis: null }\\\`
  - \\\`x: { domain: [0, 1], axis: null }\\\` or just rely on explicit x coordinates.
- Conceptual x regions:
  - module box region: \\\`x ∈ [0.02, boxRight]\\\`
  - port/labels region: \\\`x = boxRight\\\` for port points, labels to the right
  - arc region: arcs bend into \\\`x ∈ [boxRight, boxRight + arcWidth]\\\`

Define constants:
- \\\`xBoxLeft = 0.02\\\`
- \\\`xBoxRight = xBoxLeft + boxWidth\\\` (in pixels, so either compute in SVG coords or use Plot with explicit pixel coordinates by setting \\\`width\\\` and using x domain as pixels)
- Simpler: treat x domain in **pixels**:
  - \\\`x: { domain: [0, width], axis: null }\\\`
  - Then set \\\`xBoxLeft=10\\\`, \\\`xBoxRight=boxWidth\\\`, \\\`xPorts=xBoxRight\\\`, \\\`xLabel=xBoxRight+8\\\`, \\\`xArcMid=xBoxRight+arcWidth\\\`

### 9) Module boxes (rectangles)
Data:
- \\\`moduleBoxes: Array<{moduleName, y1RowId, y2RowId, href, moduleInfo}>\\\`
  - y1/y2 span from first row in module to last row in module (including both/import/export rows but excluding spacer)

Marks:
- \\\`Plot.rectY(moduleBoxes, { x1:xBoxLeft, x2:xBoxRight, y1:"y1RowId", y2:"y2RowId", fill:"#fff", stroke:"#999" })\\\`
- Module label:
  - \\\`Plot.text(moduleBoxes, { x:xBoxLeft+6, y: centerRow, text:"moduleName", textAnchor:"start" })\\\`

Hyperlinking:
- Prefer Plot-native \\\`href\\\` on text/marks where possible:
  - \\\`href: d => linkTo(d.moduleName)\\\`
  - If on Observable web, set \\\`target: "_blank"\\\` via \\\`isOnObservableCom()\\\`.

Pointer/click:
- Add an invisible dot layer on module centers:
  - \\\`Plot.dot(moduleBoxes, Plot.pointer({x:centerX, y:centerY, r: boxWidth/2, maxRadius: Infinity, href: ...}))\\\`
- On click selection, Plot sets \\\`plot.value\\\`; bubble selection out by returning \\\`viewof\\\`.

### 10) Variable ports (points + labels)
Data:
- \\\`portPoints: rows.filter(kind !== "spacer").map(r => ({...r, x:xPorts, y:r.rowId}))\\\`

Marks:
- Port glyph:
  - \\\`Plot.dot(portPoints, {x:"x", y:"y", r: 3, fill: kindColor, stroke:"#0000"})\\\`
- Port label:
  - \\\`Plot.text(portPoints, {x:xLabel, y:"y", text:r => r.label, textAnchor:"start", fill: kindColor, fontSize: 11})\\\`

Pointer:
- \\\`Plot.tip(portPoints, Plot.pointer({x:"x", y:"y", title: r => "...", href: r.href, maxRadius: 20}))\\\`
- Make ports clickable: either rely on \\\`href\\\` with pointer tips or add a \\\`Plot.dot(portPoints, Plot.pointer(...))\\\` overlay with larger radius.

Label/href:
- For a variable port \\\`r.var\\\`, link to a best-effort cell anchor:
  - If variable belongs to module “main”, \\\`linkTo(\\\`main#\${r.var._name}\\\`)\\\`
  - Else \\\`linkTo(\\\`\${moduleName}#\${r.var._name}\\\`)\\\`
- If the variable name is not a valid anchor, fallback to module link.

### 11) Arced links between ports
We want arcs connecting:
- from exporter’s **export/both port row** of the exported variable
- to importer’s **import/both port row** of the same exported variable

Precompute lookup:
- \\\`rowByModuleAndVar.get(\\\`\${moduleName}|\${varId}\\\`) -> rowId\\\` for each port row
- For each VarEdge, pick:
  - \\\`ySource = rowId for (fromModule, exportedVar) in export/both\\\`
  - \\\`yTarget = rowId for (toModule, exportedVar) in import/both\\\`
  - If missing (filtered out), skip.

Arc mark:
- Use \\\`Plot.arrow\\\` in “arc diagram” mode with constant x:
\`\`\`js
Plot.arrow(varLinks, {
  x: xPorts,              // same x for both endpoints
  y1: "ySource",
  y2: "yTarget",
  sweep: "-y",
  bend: 90,
  headLength: 0,
  stroke: d => d.fromModuleName,
  strokeOpacity: 0.35,
  strokeWidth: 1
})
\`\`\`
This matches the pattern used in the Plot arc diagram gallery.

Optional: show direction (export → import) with small headLength; default headLength 0 for cleanliness.

---

## Interaction behavior
- The plot is a \\\`viewof\\\` and exposes:
  - clicked module box datum OR clicked port datum OR clicked arc datum (choose one)
- Minimal requirement: clicking a port highlights it (Plot pointer) and returns that datum as \\\`plot.value\\\`.

Suggested selection payload:
\`\`\`js
{ type: "module", moduleName, module }
{ type: "port", moduleName, kind, varName, var }
{ type: "link", fromModuleName, toModuleName, varName, exportedVar }
\`\`\`

Hover tooltips:
- Module tooltip: name + counts (imports/exports)
- Port tooltip: kind + variable name + (optional) list of connected modules (top N)

---

## Styling & readability requirements
- Clear separation between modules: spacer rows and/or horizontal rules:
  - \\\`Plot.ruleY(spacerRowIds, {stroke:"#ddd", strokeDasharray:[4,6]})\\\`
- Color encoding:
  - module color for arcs (stroke by exporter module name)
  - port fill by kind (import/both/export) or by module (but keep kind legible)
- Ensure labels do not overlap the arc region; keep arcs bending to the right, labels further right than ports but left of arcs or vice versa (pick one consistent layout).

---

## Performance considerations
- Modules are typically small (10s). The “try all cuts” step is O(n * crossingsEval).
- If n is large (100+), provide a fast mode:
  - sample cuts (e.g. every 2–5) or early-stop once near-zero crossings found.

---

## Acceptance criteria (what “done” means)
1. Produces a single Plot rendering a vertical ladder of module boxes.
2. Ports appear on right edge with top/middle/bottom ordering (imports/both/exports).
3. Arced links connect correct ports across modules.
4. Spectral-based module ordering reduces crossings vs naïve name order on typical notebooks.
5. Clicking ports/modules works via Plot pointer and returns a meaningful selection datum.
6. Module labels are hyperlinks; port labels (or tooltips) provide hyperlinks to the relevant cell/module.

---\``
)}

function _metaprompt(){return(
`I would like to visualize all modules and their interconnections in a notebook. cellMap and moduleMap has some circular visualization. For this one I want a line of boxes extending vertically. Each box is a module, with a hyperlink. On the right edge of each box should be variables. In the top half of the edge, imported variables, on the bottom half exported variables. 

Arced lines connect the boxes across modules (see arc diagram). The boxes and variables should be clickable using Plot pointers. The whole thing is a Plot. So the Y axis is variables, ordered by module, then whether they are imported or exported. I guess some can be both imported and exported and they would be in the middle.

We want to minimize crossings, so use spectral layout to come up with a loop of minimal crossing order of modules, and cut into a line to at the point of minimal crossings.

Please research the code base and come up with a specification as a markdown cell I can pass to Robocoop for implementation.
`
)}

function _finalprompt(){return(
"Please implement the module ladder as described in the spec"
)}

function _7(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("manipulate", child1);
  const child2 = runtime.module(define2);
  main.import("exporter", child2);
  const child3 = runtime.module(define3);
  main.import("samegroup", child3);
  main.variable(observer("metaprompt")).define("metaprompt", _metaprompt);
  main.variable(observer("finalprompt")).define("finalprompt", _finalprompt);
  main.variable(observer()).define(["robocoop"], _7);
  const child4 = runtime.module(define4);
  main.import("robocoop", child4);
  return main;
}
