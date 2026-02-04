import define1 from "./a2a7845a5e2a5aec@139.js";
import define2 from "./98f34e974bb2e4bc@958.js";
import define3 from "./a89ea9f0ad8c6226@1486.js";
import define4 from "./f109935193c0deba@4551.js";
import define5 from "./f6794ed0523241c3@1824.js";

function _title(md){return(
md`# Visualizer: Own Cell Renderer

Instead of cells being rendered into a \`div\` that is setup before the runtime is started, we invert, by rendering cells into a div hosted _inside_ the notebook. Through this inversion, it is possible to change radically change how notebook renders within userspace. For example, creating a minimap, grid or both at the same time. 

\`\`\`js
import {visualizer, lopeviz_handle_css} from '@tomlarkworthy/visualizer'
\`\`\`

On its own this notebook is not very useful. It lays a foundation for total transformation of how notebooks can be rendered, but those new formats need to be developed.
`
)}

function _lopeviz_handle_css(md){return(
md`<style>
  .lope-viz .observablehq {
    position: relative;
    min-height: 17px;
  }

  .lope-viz .observablehq:not(.observablehq--running):empty:after {
    content: "<detached>";
    font-style: oblique;
    font-family: var(--code)
  }

</style>`
)}

function _3(md){return(
md`### Example - Rendering _this notebook_'s runtime-sdk-dependancy`
)}

function _4(visualizer,runtime,invalidation,runtimSdkModule)
{
  return visualizer(runtime, {
    invalidation,
    module: runtimSdkModule,
    classList: "runtimeSdk",
    detachNodes: true
  });
}


function _5(htl){return(
htl.html`<style>
.runtimeSdk {
  background-color: yellow;
}
</style>`
)}

function _6(md){return(
md`---`
)}

function _instructions(md){return(
md`## Instructions
The ordering of the cells is synced to the insertion of the runtime variable set, so there is a **single global ordering of cells** that all visualizers share. While it might make more sense for each visualizer to have its own ordering, the advantage of using the runtime ordering is that this is preserved when [single file exporting](https://observablehq.com/@tomlarkworthy/exporter). Thus, the global ordering changes are be preserved after export. 

Usage
\`\`\`js
visualizer(runtime, { // get a runtime reference from @mootari/access-runtime
  invalidation, // the visualizer need a reference to the invalidation promise  to tear down DOM state if being used dynamically
  module, // default main,
  filter: (cell_name, variables, cellIndex, status) => true, // filter what variables are displayed 
  inspector: /* default */ Inspector.into, // factory for creating cells
  detachNodes: false, // detach DOM nodes from their current parent when evaluating, so new visualizer can steal them
  classList: "" // additional class string to add
})
\`\`\``
)}

function _8(md){return(
md`## Customizing the visual representation

The \`inspector\` variable defines a factory of variable observers, matching the signature of Observable's [\`Inspector.into\`](https://github.com/observablehq/inspector#Inspector_into) method. The visualizer uses this factory to build listeners to the runtime's variables. By default it is the default observable inspector, which renders cells in the way you are familiar, however, you can change this to anything. In this notebook we also provide examples around the [minicell](https://observablehq.com/@tomlarkworthy/minicell), which renders just the variables's name, giving a minimap feel, but the possibilities are endless.`
)}

function _9(md){return(
md`---

---`
)}

function _10(md){return(
md`## Runtime Tooling Compatible

Visualizer uses the underlying runtime as the authoritative state, so it composes with the [single file exporter](https://observablehq.com/@tomlarkworthy/exporter) and [editor](https://observablehq.com/@tomlarkworthy/editor) (not shown), enabling editable, reordering and offline-first notebooks that (re)serialise to single files. Try clicking "tab".`
)}

function _11(md){return(
md`### Differences to other works

- The Observable's [export cell renderer](https://observablehq.com/documentation/embeds/advanced#rendering-cells) describes a pattern tofirst create a \`div\`, a CSS style tag, and then use Inspector.into when starting the runtime,
- [@asg017/v0-6-0-of-the-unofficial-observablehq-compiler](https://observablehq.com/@asg017/v0-6-0-of-the-unofficial-observablehq-compiler#cell-214) follows a similar pattern of setting up the framing and rendering of the runtime before starting a notebook using Inspector.into

This approach here is very different. The problem with the above approaches is only one Inspector can be used, _**and**_ it has to be decided before running the notebook in a privileged context, and you have to select a CSS stylesheet all in advance. In contrast, the [visualizer](https://observablehq.com/@tomlarkworthy/visualizer) allows multiple Inspectors to be attached dynamically after the runtime is started, and the can be added from inside the notebook environment like any other notebook logic. The workhorse of the methodology is being able to attached Observers to variables dynamically, which is implemented [here](https://observablehq.com/@tomlarkworthy/runtime-sdk#cell-159).

So this means you no longer need to choose a stylesheet upfront, or add a div, or even instantiate an Inspector before starting a runtime, as these decisions can be done inside the loaded notebook, allowing you to start the runtime _headless_, then add multiple views of the notebook as needed.

\`\`\`html
<!DOCTYPE html>
<script type="module">
import {Runtime} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/@jashkenas/my-neat-notebook.js?v=3";
new Runtime().module(define, {}); // empty inspector
</script>
\`\`\`

`
)}

function _12(md){return(
md`---

## Implementation`
)}

function _allVariables(variables,runtime){return(
variables(runtime)
)}

function _mainVariables(allVariables,main){return(
[...allVariables].filter((v) => v._module == main)
)}

function _visualizer(main,Inspector,backgroundJobs,html,$0,Event,$1){return(
(
  runtime,
  {
    invalidation,
    module = main,
    filter = () => true,
    inspector = Inspector.into,
    detachNodes = false,
    classList = ""
  } = {}
) => {
  console.log("creating visualizer");
  backgroundJobs;
  const root = html`<div class="observablehq-root lope-viz ${classList}" style="min-height: 2rem; min-width: 2rem;"></div>`;
  const visualizer = html`<div class="lopecode-visualizer">${root}</div>`;
  root.filter = filter;
  root.module = module;
  root.inspector = inspector;
  root.detachNodes = detachNodes;
  root.visualizer = visualizer;

  $0.value.add(root);
  $0.dispatchEvent(new Event("input"));
  invalidation.then(() => {
    console.log("removing visualizer", root);
    root.remove();
    root.visualizer.remove();
    root.dispatchEvent(new Event("input"));
    // We need to keep roots around so we know not to sync with them
    // But this is also a cause of a memory leak.
    // Probably we need a new set to record the disposed sync div nodes.
    $1.value.add(root);
    $1.dispatchEvent(new Event("input"));
  });
  return visualizer;
}
)}

function _visualizers(Inputs){return(
Inputs.input(new Set())
)}

function _visualizersToDelete(Inputs){return(
Inputs.input(new Set())
)}

function _inspectors(visualizers)
{
  const inspectors = this || new Map(); // preserve state across invalidations
  visualizers.forEach((root) => {
    if (inspectors.has(root)) return;
    const factory = root.inspector(root);
    const inspector = (variable, ...args) => {
      const inspector = factory(variable, ...args);
      inspector._node.variable = variable;
      if (variable._name) inspector._node.setAttribute("cell", variable._name);
      return inspector;
    };
    inspectors.set(root, inspector);
  });
  inspectors.forEach((fn, root) => {
    if (!visualizers.has(root)) {
      console.log("tidy up inspector for ", root);
      inspectors.delete(root);
    }
  });
  return inspectors;
}


function _TRACE_CELL(trace_variable){return(
trace_variable
)}

function _20(htl){return(
htl.html`<style>
  .cell-menu {
    height: 17px;
  }
</style>`
)}

function _createImportCellHeader(){return(
(cell) => {
  const header = document.createElement("div");
  header.className = "observablehq lope-viz-import";
  header.setAttribute("data-cell-type", "import");
  header.setAttribute("data-cell-name", String(cell?.name ?? ""));
  if (cell?.module_name)
    header.setAttribute("data-module-name", String(cell.module_name));
  header.setAttribute("cell", String(cell?.name ?? "import"));
  const line = document.createElement("div");
  line.className = "lope-viz-import-line";
  const statement = document.createElement("div");
  statement.className = "lope-viz-import-statement";
  line.appendChild(statement);
  header.appendChild(line);
  header.__viz = { statement, cell };
  return header;
}
)}

function _variablesForCell(){return(
(cell) => {
  if (!cell) return [];
  if (cell.type === "import") return [];
  return [cell.variables?.[0]].filter(Boolean);
}
)}

function _renderImportCell(){return(
(
  cell,
  {
    isKnown = () => true,
    resolveNotebookHref = ({ specifier, notebook }) => {
      if (notebook != null)
        return String(new URL(String(notebook), document.baseURI));
      const s = String(specifier ?? "");
      if (!s) return null;
      if (/^https?:\/\//.test(s)) return s;
      return String(new URL(`https://observablehq.com/${s}`));
    },
    resolveSymbolHref = ({ imported, notebookHref }) => {
      if (!notebookHref) return null;
      const name = String(imported ?? "");
      if (!name) return null;
      return `${notebookHref}#${name}`;
    }
  } = {}
) => {
  const ii = cell?.importInfo ?? null;
  const span = document.createElement("span");
  span.className = "observablehq--inspect observablehq--import";

  if (!ii || ii.type !== "import") {
    span.appendChild(document.createTextNode("invalid importInfo"));
    return span;
  }

  if (typeof ii.source === "string" && ii.source.trim().startsWith("import")) {
    span.appendChild(document.createTextNode(ii.source.trim()));
    return span;
  }

  const notebookHref = resolveNotebookHref({
    specifier: ii.specifier,
    notebook: ii.notebook
  });
  const from = String(ii.from ?? ii.specifier ?? "");

  const rawSpecs = Array.isArray(ii.specifiers) ? ii.specifiers : [];
  const specs = rawSpecs
    .map((s) => ({ imported: s?.imported ?? null, local: s?.local ?? null }))
    .filter((d) => d.imported != null || d.local != null)
    .map((d) => ({
      imported: d.imported == null ? "" : String(d.imported),
      local: d.local == null ? "" : String(d.local)
    }))
    .filter((d) => d.imported || d.local);

  span.appendChild(document.createTextNode("import {"));
  if (specs.length) {
    let first = true;
    for (const s of specs) {
      if (!first) span.appendChild(document.createTextNode(", "));
      first = false;

      const imported = s.imported || s.local;
      const local = s.local || s.imported || "";

      const a = document.createElement("a");
      a.textContent = imported;

      if (imported && isKnown(imported)) {
        const href = resolveSymbolHref({ imported, notebookHref });
        if (href) a.href = href;
      } else {
        a.className = "observablehq--unknown";
      }

      span.appendChild(a);

      if (imported && local && imported !== local) {
        span.appendChild(document.createTextNode(` as ${local}`));
      }
    }
  }
  span.appendChild(document.createTextNode("}"));

  span.appendChild(document.createTextNode(" from "));

  if (!notebookHref) {
    span.appendChild(document.createTextNode(`"${from}"`));
    return span;
  }

  const a = span.appendChild(document.createElement("a"));
  a.href = notebookHref;
  a.textContent = `"${from}"`;
  return span;
}
)}

function _syncers(observe,inspectors,$0,liveCellMap,variables,createImportCellHeader,renderImportCell,variablesForCell,visualizers,$1)
{
  const syncers = this || new Map();

  const isManagedCellNode = (node) =>
    !!node?.classList?.contains("observablehq");
  const nextManaged = (node) => {
    while (node && !isManagedCellNode(node)) node = node.nextSibling;
    return node;
  };

  const disposeRoot = (root, entry) => {
    const { observers, headers } = entry || {};
    headers?.forEach((node) => node?.remove?.());
    headers?.clear?.();
    observers?.forEach((obsEntry, v) => {
      obsEntry.remove();
      if (v?._observer?.fulfilled && v._value)
        v._observer.fulfilled(v._value, v._name);
    });
    observers?.clear?.();
  };

  const ensureObserver = (root, inspector, observers, v) => {
    const existing = observers.get(v);
    if (existing?.root === root) return existing;
    if (existing) existing.remove();

    const observer = inspector(v);
    const unobserve = observe(v, observer, { detachNodes: root.detachNodes });

    const entry = {
      observer,
      root,
      remove: () => {
        observers.delete(v);
        observer?._node?.remove?.();
        unobserve?.();
      }
    };
    observers.set(v, entry);
    return entry;
  };

  for (const [root, entry] of [...syncers.entries()]) {
    if (!inspectors.has(root)) {
      disposeRoot(root, entry);
      syncers.delete(root);
    }
  }

  inspectors.forEach((inspector, root) => {
    if ($0.value.has(root)) return;

    if (!syncers.has(root))
      syncers.set(root, { observers: new Map(), headers: new Map() });
    const { observers, headers } = syncers.get(root);

    const cells = liveCellMap.get(root.module) || [];
    const seenVars = new Set();
    const seenHeaderKeys = new Set();
    const desired = [];
    let i = 0;
    const filterState = {};

    for (const cell of cells) {
      const cell_name = cell?.name;
      if (!root.filter(cell_name, variables, i++, filterState)) continue;

      if (cell?.type === "import") {
        const ii = cell?.importInfo ?? null;
        if (!ii || ii.type !== "import") continue;
        if (ii.specifier === "builtin") continue;

        const headerKey = `${String(ii.specifier ?? "")}#${String(
          cell?.name ?? i - 1
        )}`;
        seenHeaderKeys.add(headerKey);

        let header = headers.get(headerKey);
        if (!header) {
          header = createImportCellHeader(cell);
          headers.set(headerKey, header);
        } else if (header.__viz) {
          header.__viz.cell = cell;
        }
        header.variable = cell.variables[0];

        const isKnown = (imported) => {
          try {
            return !!root?.module?._scope?.has?.(imported);
          } catch {
            return true;
          }
        };

        const node = renderImportCell(cell, { isKnown });
        const statement = header.__viz.statement;
        while (statement.firstChild)
          statement.removeChild(statement.firstChild);
        statement.appendChild(node);

        desired.push(header);
        continue;
      }

      const renderedVars = variablesForCell(cell);
      for (const v of renderedVars) {
        if (!v) continue;
        if (visualizers.has(v._value) && v._value?.detachNodes) continue;

        seenVars.add(v);
        const entry = ensureObserver(root, inspector, observers, v);
        if (entry?.observer?._node) desired.push(entry.observer._node);
      }
    }

    for (const [k, node] of [...headers.entries()]) {
      if (!seenHeaderKeys.has(k)) {
        node.remove();
        headers.delete(k);
      }
    }

    for (const [v, entry] of [...observers.entries()]) {
      if (!seenVars.has(v)) entry.remove();
    }

    const desiredSet = new Set(desired);

    for (const child of [...root.childNodes]) {
      if (isManagedCellNode(child) && !desiredSet.has(child)) child.remove();
    }

    let cursor = nextManaged(root.firstChild);
    for (const node of desired) {
      cursor = nextManaged(cursor);
      if (node === cursor) {
        cursor = cursor.nextSibling;
        continue;
      }
      root.insertBefore(node, cursor || null);
    }

    for (let n = nextManaged(cursor); n; ) {
      const next = n.nextSibling;
      if (isManagedCellNode(n) && !desiredSet.has(n)) n.remove();
      n = nextManaged(next);
    }
  });

  for (const root of [...$0.value]) {
    const entry = syncers.get(root);
    if (entry) disposeRoot(root, entry);
    syncers.delete(root);
    inspectors.delete(root);
    $0.value.delete(root);
    $1.value.delete(root);
  }

  return syncers;
}


function _25(md){return(
md`### background jobs and keep alive`
)}

function _backgroundJobs(keepalive,visualizerModule)
{
  console.log("background job");
  keepalive(visualizerModule, "syncers");
}


function _visualizerModule(thisModule){return(
thisModule()
)}

function _28(md){return(
md`### imports`
)}

function _32(robocoop2){return(
robocoop2()
)}

function _33(robocoop3){return(
robocoop3()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("lopeviz_handle_css")).define("lopeviz_handle_css", ["md"], _lopeviz_handle_css);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["visualizer","runtime","invalidation","runtimSdkModule"], _4);
  main.variable(observer()).define(["htl"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("instructions")).define("instructions", ["md"], _instructions);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof allVariables")).define("viewof allVariables", ["variables","runtime"], _allVariables);
  main.variable(observer("allVariables")).define("allVariables", ["Generators", "viewof allVariables"], (G, _) => G.input(_));
  main.variable(observer("mainVariables")).define("mainVariables", ["allVariables","main"], _mainVariables);
  main.variable(observer("visualizer")).define("visualizer", ["main","Inspector","backgroundJobs","html","viewof visualizers","Event","viewof visualizersToDelete"], _visualizer);
  main.variable(observer("viewof visualizers")).define("viewof visualizers", ["Inputs"], _visualizers);
  main.variable(observer("visualizers")).define("visualizers", ["Generators", "viewof visualizers"], (G, _) => G.input(_));
  main.variable(observer("viewof visualizersToDelete")).define("viewof visualizersToDelete", ["Inputs"], _visualizersToDelete);
  main.variable(observer("visualizersToDelete")).define("visualizersToDelete", ["Generators", "viewof visualizersToDelete"], (G, _) => G.input(_));
  main.variable(observer("inspectors")).define("inspectors", ["visualizers"], _inspectors);
  main.variable(observer("TRACE_CELL")).define("TRACE_CELL", ["trace_variable"], _TRACE_CELL);
  main.variable(observer()).define(["htl"], _20);
  main.variable(observer("createImportCellHeader")).define("createImportCellHeader", _createImportCellHeader);
  main.variable(observer("variablesForCell")).define("variablesForCell", _variablesForCell);
  main.variable(observer("renderImportCell")).define("renderImportCell", _renderImportCell);
  main.variable(observer("syncers")).define("syncers", ["observe","inspectors","viewof visualizersToDelete","liveCellMap","variables","createImportCellHeader","renderImportCell","variablesForCell","visualizers","viewof visualizers"], _syncers);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("backgroundJobs")).define("backgroundJobs", ["keepalive","visualizerModule"], _backgroundJobs);
  main.variable(observer("viewof visualizerModule")).define("viewof visualizerModule", ["thisModule"], _visualizerModule);
  main.variable(observer("visualizerModule")).define("visualizerModule", ["Generators", "viewof visualizerModule"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _28);
  const child1 = runtime.module(define1);
  main.import("Inspector", child1);
  main.import("isnode", child1);
  const child2 = runtime.module(define2);
  main.import("myModule", "runtimSdkModule", child2);
  main.import("unorderedSync", child2);
  main.import("repositionSetElement", child2);
  main.import("runtime", child2);
  main.import("main", child2);
  main.import("variables", child2);
  main.import("descendants", child2);
  main.import("lookupVariable", child2);
  main.import("toObject", child2);
  main.import("observe", child2);
  main.import("keepalive", child2);
  main.import("thisModule", child2);
  main.import("trace_variable", child2);
  const child3 = runtime.module(define3);
  main.import("liveCellMap", child3);
  main.variable(observer()).define(["robocoop2"], _32);
  main.variable(observer()).define(["robocoop3"], _33);
  const child4 = runtime.module(define4);
  main.import("robocoop2", child4);
  const child5 = runtime.module(define5);
  main.import("robocoop3", child5);
  return main;
}
