import define1 from "./a2a7845a5e2a5aec@139.js";
import define2 from "./f92778131fd76559@1208.js";
import define3 from "./98f34e974bb2e4bc@650.js";
import define4 from "./03dda470c56b93ff@8246.js";
import define5 from "./db42ae70222a8b08@995.js";
import define6 from "./b6a507744fc577c7@35.js";
import define7 from "./0e0b35a92c819d94@474.js";
import define8 from "./e3a019069a130d79@6074.js";
import define9 from "./62b9866907f960f0@235.js";

function _title(md){return(
md`# Visualizer: Own Cell Renderer

Instead of cells being rendered into a \`div\` that is setup before the runtime is started, we invert, by rendering cells into a div hosted _inside_ the notebook. Through this inversion, it is possible to change radically change how notebook renders within userspace. For example, creating a minimap, grid or both at the same time. 

\`\`\`js
import {visualizer, lopeviz_handle_css} from '@tomlarkworthy/visualizer'
\`\`\`

On its own this notebook is not very useful. It lays a foundation for total transformation of how notebooks can be rendered, but those new formats need to be developed.
`
)}

function _2(htl){return(
htl.html`<div class="lope-viz">
<div class="observablehq"></div>
</div>
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
  /*
  .lope-viz .observablehq::after {
    content: '';
    position: absolute;
    cursor: grab; 
    top: 0px;
    right: 0px;
    width: 14px;
    height: 14px;
    border: 1px dashed purple;
    border-radius: 2px;
  }*/
  .sortable-chosen {
    background-color: yellow
  }
  .sortable-drag {
    background-color: green
  }
  .ghostClass {
    background-color: yellow
  }
</style>`
)}

function _4(md){return(
md`### Example - Rendering _this notebook_'s cells into a minimap`
)}

function _5(visualizer,runtime,minicellInto,invalidation)
{
  return visualizer(runtime, {
    inspector: minicellInto,
    invalidation,
    filter: (cell_name) => !!cell_name
  });
}


function _6(md){return(
md`---`
)}

function _instructions(md){return(
md`## Instructions
You can reorder cells with drag and drop. The ordering of the cells is synced to the insertion of the runtime variable set, so there is a **single global ordering of cells** that all visualizers share. While it might make more sense for each visualizer to have its own ordering, the advantage of using the runtime ordering is that this is preserved when [single file exporting](https://observablehq.com/@tomlarkworthy/exporter). Thus, the global ordering changes are be preserved after export. 

Usage
\`\`\`js
visualizer(runtime, { // get a runtime reference from @mootari/access-runtime
  invalidation, // the visualizer need a reference to the invalidation promise  to tear down DOM state if being used dynamically
  module, // default main,
  filter: (cell_name, variables, cellIndex, statue) => true, // filter what variables are displayed 
  inspector: /* default */ Inspector.into, // factory for creating cells
  detachNodes: false, // detach DOM nodes from their current parent when evaluating, so new visualizer can steal them
  classList: "" // additional class string to add
})
\`\`\``
)}

function _8(md){return(
md`### Example - Three column Observable-like layout

When \`detachNodes\` is true, the visualizer will detach DOM nodes from their parent before fulfilling the custom inspector. This gives the opportunity for DOM nodes to be transferred to the DOM tree hosted by the visualizer. When this happens, the host notebook's nodes DOM nodes are detached, so this is a visually destructive operation. DOM nodes can only have one parent!`
)}

function _toggleVisualizer(Inputs){return(
Inputs.toggle({
  label: "enable 3 column layout and steal DOM nodes"
})
)}

function _10(htl){return(
htl.html`<style id="lope-viz-">
  .lope-viz {
    display: flex;
    flex-wrap: wrap;
  }
  .lope-viz .observablehq {
    width: 30%;
    max-height: 200px;
    overflow: scroll;
  }
</style>`
)}

function _11(toggleVisualizer,visualizer,runtime,invalidation){return(
toggleVisualizer
  ? visualizer(runtime, {
      invalidation,
      filter: (cell_name) => !!cell_name,
      detachNodes: true
    })
  : "toggle the 3 column layout to make this cell render"
)}

function _12(md){return(
md`## Customizing the visual representation

The \`inspector\` variable defines a factory of variable observers, matching the signature of Observable's [\`Inspector.into\`](https://github.com/observablehq/inspector#Inspector_into) method. The visualizer uses this factory to build listeners to the runtime's variables. By default it is the default observable inspector, which renders cells in the way you are familiar, however, you can change this to anything. In this notebook we also provide examples around the [minicell](https://observablehq.com/@tomlarkworthy/minicell), which renders just the variables's name, giving a minimap feel, but the possibilities are endless.`
)}

function _13(md){return(
md`## Tricks: visualizers ranges

The \`filter\` argument allows you to ignore specific variables. We can use this to partition the global list of variables into different segments, depending on whether they are before or after a list delimiter. Dragging variable across the delimiter causes the variable to swap lists. You can drag the delimitor itself around to mass move cells from one list to another. This could be useful to allow moving cells around different layout regions.`
)}

function _between(){return(
(symbolStart, symbolEnd) => (cell_name, variables, index, state) => {
  if (variables[0]._value === symbolStart) {
    state.between = true;
  } else if (variables[0]._value === symbolEnd) {
    state.between = undefined;
  } else {
    return state.between;
  }
}
)}

function _start(){return(
Symbol()
)}

function _16(htl){return(
htl.html`<style>
  .minicell.observablehq {
   overflow: visible;
   width: 2rem;
   transform: rotate(90deg);
  }
</style>`
)}

function _before_deliminator(visualizer,runtime,minicellInto,invalidation,between,start,middle)
{
  return visualizer(runtime, {
    inspector: minicellInto,
    invalidation,
    filter: between(start, middle),
    classList: "before"
  });
}


function _myvalue(){return(
"42"
)}

function _middle(){return(
Symbol()
)}

function _after_deliminator(visualizer,runtime,minicellInto,invalidation,between,middle,end)
{
  return visualizer(runtime, {
    inspector: minicellInto,
    invalidation,
    filter: between(middle, end),
    classList: "after"
  });
}


function _21(mainVariables){return(
mainVariables
)}

function _22(md){return(
md`---

---`
)}

function _23(md){return(
md`## Runtime Tooling Compatible

Visualizer uses the underlying runtime as the authoritative state, so it composes with the [single file exporter](https://observablehq.com/@tomlarkworthy/exporter) and [editor](https://observablehq.com/@tomlarkworthy/editor) (not shown), enabling editable, reordering and offline-first notebooks that (re)serialise to single files. Try clicking "preview".`
)}

function _exporter_cell(exporter){return(
exporter()
)}

function _end(){return(
Symbol()
)}

function _26(md){return(
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

function _27(minicell_style){return(
minicell_style
)}

function _28(md){return(
md`---

## Implementation`
)}

function _allVariables(variables,runtime){return(
variables(runtime)
)}

function _mainVariables(allVariables,main){return(
[...allVariables].filter((v) => v._module == main)
)}

function _visualizer(main,Inspector,backgroundJobs,html,Sortable,$0,$1,Event,$2){return(
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
  const sortable = new Sortable(root, {
    group: "visualizer",
    preventOnFilter: false,
    filter: (e, target) => {
      const rect = target.getBoundingClientRect();
      return !(
        e.clientX >= rect.right - 14 &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.top + 14
      );
    },
    onUpdate: (evt) => $0.send({ runtime, evt, sortable }),
    onAdd: (evt) => $0.send({ runtime, evt, sortable })
  });

  $1.value.add(root);
  $1.dispatchEvent(new Event("input"));
  invalidation.then(() => {
    console.log("removing visualizer", root);
    root.remove();
    root.visualizer.remove();
    root.dispatchEvent(new Event("input"));
    sortable.option("disabled", true);
    // We need to keep roots around so we know not to sync with them
    // But this is also a cause of a memory leak.
    // Probably we need a new set to record the disposed sync div nodes.
    $2.value.add(root);
    $2.dispatchEvent(new Event("input"));
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


async function _cellMaps(allVariables,visualizers,cellMap){return(
allVariables &&
  new Map(
    await Promise.all(
      [...new Set([...visualizers].map((root) => root.module))].map(
        async (m) => [m, await cellMap(m)]
      )
    )
  )
)}

function _TRACE_CELL(){return(
"observe"
)}

function _syncers(inspectors,$0,cellMaps,TRACE_CELL,visualizers,observe,allVariables,$1)
{
  try {
    console.log("sync");
    const syncers = this || new Map();

    // remove stale sync state
    syncers.forEach(({ observers }, root) => {
      if (!inspectors.has(root)) {
        console.log("tidy up syncer for ", root);
        syncers.delete(root);
        observers.forEach(({ observer, remove }, v) => {
          remove();
          if (v?._observer?.fulfilled && !!v._value) {
            v._observer.fulfilled(v._value, v._name);
          }
        });
      }
    });

    inspectors.forEach((inspector, root) => {
      if ($0.value.has(root)) return;
      if (!syncers.has(root)) {
        syncers.set(root, {
          observers: new Map()
        });
      }
      const { observers } = syncers.get(root);
      const seen = new Set();
      let i = 0;
      const state = {};
      const cells = cellMaps.get(root.module);
      [...cells.entries()].forEach(([cell_name, variables]) => {
        const v = variables[0];
        if (v._name === TRACE_CELL) debugger;
        if (!root.filter(cell_name, variables, i++, state)) return;
        // don't put containers in containers, TODO, if pending it can get attached
        if (visualizers.has(v._value) && v._value.detachNodes) return;
        seen.add(v);
        if (
          observers.has(v) &&
          // observers.get(v).version == v._version &&
          observers.get(v).root == root
        ) {
          // no change
        } else {
          if (observers.has(v)) {
            observers.get(v).remove(); // tidy up previous
          }
          const observer = inspector(v);
          const remove = observe(v, observer, {
            detachNodes: root.detachNodes
          });
          observers.set(v, {
            observer,
            version: v._version,
            root,
            remove: () => {
              if (v._name === TRACE_CELL) debugger;
              observers.delete(v);
              observer._node.remove();
              remove();
            }
          });
        }
      });

      // remove stale variables
      [...observers.entries()].forEach(([v, _]) => {
        if (v._name === TRACE_CELL) debugger;
        if (!seen.has(v) && observers.has(v)) {
          const { observer, remove } = observers.get(v);
          remove();
        }
      });

      // sync dom
      root.innerHTML = "";
      allVariables.forEach((v) => {
        if (observers.has(v)) {
          const { observer, remove } = observers.get(v);
          root.appendChild(observer._node);
        }
      });
      // let current = root.firstChild;
      // allVariables.forEach((v) => {
      //   if (v._name === TRACE_CELL) debugger;
      //   if (observers.has(v)) {
      //     const { observer, remove } = observers.get(v);
      //     if (current.variable == v) {
      //       current = current.nextSibling;
      //     } else {
      //       debugger;
      //       current.before(observer._node);
      //     }
      //   }
      // });
      // // remove left overs
      // while (current !== null) {
      //   const toRemove = current;
      //   current = current.nextSibling;
      //   toRemove.remove();
      // }

      return observers;
    });

    // tidy up resources
    [...$0.value].forEach((root) => {
      if (syncers.has(root)) {
        const { observers } = syncers.get(root);
        [...observers].forEach((v) => {
          const existing = observers.get(v);
          if (!existing) return;
          const { observer, remove } = existing;
          observer.remove();
        });
      }

      syncers.delete(root);
      inspectors.delete(root);
      $0.value.delete(root);
      $1.value.delete(root);
    });
    return syncers;
  } catch (err) {
    debugger;
    console.error(err);
  }
}


function _38(md){return(
md`### Drag change handler - onUpdate`
)}

function _updateEvent(flowQueue){return(
flowQueue()
)}

function _40(updateEvent){return(
updateEvent
)}

function _lastVariableMoved(toObject,updateEvent){return(
toObject(updateEvent.evt.item.variable)
)}

function _onUpdateAction(updateEvent,$0,repositionSetElement,$1)
{
  console.log("onUpdate", updateEvent);
  const order = updateEvent.sortable.toArray();
  const evt = updateEvent.evt;
  const variable = evt.item.variable;
  const newIndex = evt.newIndex;
  const oldIndex = evt.oldIndex;
  const variables = $0.value;
  // find variable one position after
  const displaced =
    updateEvent.evt.item.parentElement.children[evt.newIndex + 1]?.variable;
  if (displaced !== undefined) {
    // move to the position that is before
    const current = [...variables].findIndex((v) => v == variable);
    let target = [...variables].findIndex((v) => v == displaced);
    target -= target > current ? 1 : 0;
    console.log("moving  to ", target, displaced);
    repositionSetElement(variables, variable, target);
  } else {
    // its last in list
    const last =
      updateEvent.evt.item.parentElement.children[evt.newIndex - 1].variable;
    const target = [...variables].findIndex((v) => v == last);
    console.log("moving  to ", target, displaced);
    repositionSetElement(variables, variable, target);
  }

  $1.resolve();
  return updateEvent;
}


function _43(md){return(
md`### background jobs and keep alive`
)}

function _backgroundJobs(keepalive,thisModule)
{
  console.log("background job");
  keepalive(thisModule, "syncers");
  keepalive(thisModule, "onUpdateAction");
}


function _notebook_tag(){return(
Symbol()
)}

function _thisModule(runtime,notebook_tag){return(
[...runtime._variables].find((v) => v._value === notebook_tag)
  ._module
)}

function _47(md){return(
md`### imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer("lopeviz_handle_css")).define("lopeviz_handle_css", ["md"], _lopeviz_handle_css);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["visualizer","runtime","minicellInto","invalidation"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("instructions")).define("instructions", ["md"], _instructions);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof toggleVisualizer")).define("viewof toggleVisualizer", ["Inputs"], _toggleVisualizer);
  main.variable(observer("toggleVisualizer")).define("toggleVisualizer", ["Generators", "viewof toggleVisualizer"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _10);
  main.variable(observer()).define(["toggleVisualizer","visualizer","runtime","invalidation"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("between")).define("between", _between);
  main.variable(observer("start")).define("start", _start);
  main.variable(observer()).define(["htl"], _16);
  main.variable(observer("before_deliminator")).define("before_deliminator", ["visualizer","runtime","minicellInto","invalidation","between","start","middle"], _before_deliminator);
  main.variable(observer("myvalue")).define("myvalue", _myvalue);
  main.variable(observer("middle")).define("middle", _middle);
  main.variable(observer("after_deliminator")).define("after_deliminator", ["visualizer","runtime","minicellInto","invalidation","between","middle","end"], _after_deliminator);
  main.variable(observer()).define(["mainVariables"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("exporter_cell")).define("exporter_cell", ["exporter"], _exporter_cell);
  main.variable(observer("end")).define("end", _end);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["minicell_style"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof allVariables")).define("viewof allVariables", ["variables","runtime"], _allVariables);
  main.variable(observer("allVariables")).define("allVariables", ["Generators", "viewof allVariables"], (G, _) => G.input(_));
  main.variable(observer("mainVariables")).define("mainVariables", ["allVariables","main"], _mainVariables);
  main.variable(observer("visualizer")).define("visualizer", ["main","Inspector","backgroundJobs","html","Sortable","viewof updateEvent","viewof visualizers","Event","viewof visualizersToDelete"], _visualizer);
  main.variable(observer("viewof visualizers")).define("viewof visualizers", ["Inputs"], _visualizers);
  main.variable(observer("visualizers")).define("visualizers", ["Generators", "viewof visualizers"], (G, _) => G.input(_));
  main.variable(observer("viewof visualizersToDelete")).define("viewof visualizersToDelete", ["Inputs"], _visualizersToDelete);
  main.variable(observer("visualizersToDelete")).define("visualizersToDelete", ["Generators", "viewof visualizersToDelete"], (G, _) => G.input(_));
  main.variable(observer("inspectors")).define("inspectors", ["visualizers"], _inspectors);
  main.variable(observer("cellMaps")).define("cellMaps", ["allVariables","visualizers","cellMap"], _cellMaps);
  main.variable(observer("TRACE_CELL")).define("TRACE_CELL", _TRACE_CELL);
  main.variable(observer("syncers")).define("syncers", ["inspectors","viewof visualizersToDelete","cellMaps","TRACE_CELL","visualizers","observe","allVariables","viewof visualizers"], _syncers);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("viewof updateEvent")).define("viewof updateEvent", ["flowQueue"], _updateEvent);
  main.variable(observer("updateEvent")).define("updateEvent", ["Generators", "viewof updateEvent"], (G, _) => G.input(_));
  main.variable(observer()).define(["updateEvent"], _40);
  main.variable(observer("lastVariableMoved")).define("lastVariableMoved", ["toObject","updateEvent"], _lastVariableMoved);
  main.variable(observer("onUpdateAction")).define("onUpdateAction", ["updateEvent","viewof allVariables","repositionSetElement","viewof updateEvent"], _onUpdateAction);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("backgroundJobs")).define("backgroundJobs", ["keepalive","thisModule"], _backgroundJobs);
  main.variable(observer("notebook_tag")).define("notebook_tag", _notebook_tag);
  main.variable(observer("thisModule")).define("thisModule", ["runtime","notebook_tag"], _thisModule);
  main.variable(observer()).define(["md"], _47);
  const child1 = runtime.module(define1);
  main.import("Inspector", child1);
  main.import("isnode", child1);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  const child3 = runtime.module(define3);
  main.import("unorderedSync", child3);
  main.import("repositionSetElement", child3);
  main.import("runtime", child3);
  main.import("main", child3);
  main.import("variables", child3);
  main.import("descendants", child3);
  main.import("lookupVariable", child3);
  main.import("toObject", child3);
  main.import("observe", child3);
  main.import("keepalive", child3);
  const child4 = runtime.module(define4);
  main.import("exporter", child4);
  main.import("module_map", child4);
  const child5 = runtime.module(define5);
  main.import("moduleMap", child5);
  const child6 = runtime.module(define6);
  main.import("Sortable", child6);
  const child7 = runtime.module(define7);
  main.import("flowQueue", child7);
  const child8 = runtime.module(define8);
  main.import("cellMap", child8);
  const child9 = runtime.module(define9);
  main.import("into", "minicellInto", child9);
  main.import("style", "minicell_style", child9);
  return main;
}
