function _1(md){return(
md`# Accessing a Notebook's Runtime

Based on an idea by Bryan Gin-ge Chen (which he explores in his notebook [Dirty tricks](https://observablehq.com/d/4e5230c1d38f7c0f)), this notebook demonstrates a hack that exposes a notebook's underlying [Runtime](https://github.com/observablehq/runtime) instance.

*Related discussion: [Check if a cell is defined](https://talk.observablehq.com/t/check-if-a-cell-is-defined/4351/3)*

Suggested imports:
~~~js
import {runtime, main, observed} from '@mootari/access-runtime'
~~~
  


<style>
  a[href^="#"]:before {
    content: "→ ";
  }
  a[href], a[href]:hover {
    text-decoration: underline dotted 2px;
    text-underline-offset: 2px;
  }
  a[href]:hover {
    text-decoration: underline solid 2px;
  }
  a[href]:visited {
    color: inherit;
  }
  p > code, li > code {
    color: var(--syntax-keyword)
  }
</style>`
)}

function _2(md){return(
md`---`
)}

function _3(md){return(
md`## API`
)}

function _4(md){return(
md`### Instances`
)}

function _runtime(recomputeTrigger,captureRuntime){return(
recomputeTrigger, captureRuntime
)}

function _main(modules){return(
Array.from(modules).find(d => d[1] === 'main')[0]
)}

function _modules(runtime)
{
  // Builtins are stored in a separate module.
  const builtin = runtime._builtin;
  // Imported modules are keyed by their define() functions, which we don't need here.
  const imports = new Set(runtime._modules.values());
  // Find all modules by retrieving them directly from the variables.
  // Derived modules are "anonymous" but keep a reference to their source module.
  const source = m => !m._source ? m : source(m._source);
  const modules = new Set(Array.from(runtime._variables, v => source(v._module)));
  // When you edit a notebook on observablehq.com, Observable defines the
  // variables dynamically on main instead of creating a separate module.
  // When embedded however the entry notebook also becomes a Runtime module.
  const main = [...modules].find(m => m !== builtin && !imports.has(m));
  
  const _imports = [...imports];
  const labels = [
    [builtin, 'builtin'],
    [main || _imports.shift(), 'main'],
    ..._imports.map((m, i) => [m, `child${i+1}`]),
  ];
  
  return new Map(labels);
}


function _8(md){return(
md`### Utilities`
)}

function _observed(no_observer,runtime){return(
function observed(variable = null) {
  const _observed = v => v._observer !== no_observer;
  if(variable !== null) return _observed(variable);
  const vars = new Set();
  for(const v of runtime._variables) _observed(v) && vars.add(v);
  return vars;
}
)}

function _no_observer(main)
{
  const v = main.variable();
  const o = v._observer;
  v.delete();
  return o;
}


function _11(md){return(
md`### Internals`
)}

function _captureRuntime(mutable_recomputeTrigger){return(
new Promise(resolve => {
  const forEach = Set.prototype.forEach;
  Set.prototype.forEach = function(...args) {
    const thisArg = args[1];
    forEach.apply(this, args);
    if(thisArg && thisArg._modules) {
      Set.prototype.forEach = forEach;
      resolve(thisArg);
    }
  };
  mutable_recomputeTrigger.value = mutable_recomputeTrigger.value + 1;
})
)}

function _mutable_recomputeTrigger(Mutable){return(
(m => m.generator ? m : Object.defineProperties({}, {
  [Symbol.toStringTag]: {value: "Mutable"},
  generator: {value: m},
  value: Object.getOwnPropertyDescriptor(m, "value"),
}))(new Mutable(0))
)}

function _recomputeTrigger(mutable_recomputeTrigger){return(
mutable_recomputeTrigger.generator
)}

function _15(md){return(
md`---
## Examples

*Hit Refresh to update the lists below.*`
)}

function _ex_refresh(Inputs){return(
Inputs.button('Refresh')
)}

function _17(md){return(
md`### Defined variables`
)}

function _ex_vars(ex_refresh,runtime,modules,no_observer){return(
ex_refresh, Array.from(runtime._variables).map(v => ({
  name : v._name,
  module: modules.get(v._module),
  type: [, 'normal', 'implicit', 'duplicate'][v._type],
  observed: v._observer !== no_observer,
  inputs: v._inputs.length,
  outputs: v._outputs.size,
}))
)}

function _ex_vars_filters(ex_vars,Inputs)
{
  const unique = (arr, acc) => Array.from(new Set(arr.map(acc))).sort((a, b) => a?.localCompare?.(b));
  const modules = unique(ex_vars, v => v.module);
  const types = unique(ex_vars, v => v.type);
  const value = this?.value ?? {};
  
  return Inputs.form({
    modules: Inputs.checkbox(modules, {
      label: 'Modules',
      value: value.modules ?? modules,
    }),
    types: Inputs.checkbox(types, {
      label: 'Types',
      value: value.types ?? types,
    }),
    features: Inputs.checkbox(['named', 'observed', 'inputs', 'outputs'], {
      label: 'Features',
      value: value.features ?? [],
    })
  });
}


function _ex_vars_table(ex_vars_filters,ex_vars,Inputs)
{
  const flags = (arr) => Object.fromEntries(arr.map(v => [v, true]));
  const modules = flags(ex_vars_filters.modules);
  const types = flags(ex_vars_filters.types);
  const {named, observed, inputs, outputs} = flags(ex_vars_filters.features);

  const data = ex_vars.filter(d => true
    && modules[d.module]
    && types[d.type]
    && (!named || d.name != null)
    && (!observed || d.observed)
    && (!inputs || d.inputs)
    && (!outputs || d.outputs)
  );
  return Inputs.table(data);
}


function _21(md){return(
md`### Dependency matrix`
)}

function _ex_deps(ex_refresh,observed,Inputs,htl)
{
  ex_refresh;
  
  const vars = Array.from(observed(), d => ({
    name: d._name,
    inputs: Array.from(d._inputs, d => d._name)
  }));
  const inputs = new Set();
  for(const {inputs: i} of vars) for(const n of i) inputs.add(n);

  return Inputs.table(
    vars.map(d => ({
      '': d.name,
      ...Object.fromEntries(d.inputs.map(n => [n, '✔️'])),
    })),
    {
      columns: ['', ...Array.from(inputs).sort((a, b) => a.localeCompare(b))],
      header: {
        '': htl.html`<em>_name`
      }
    }
  );
  
}


function _23(md){return(
md`---
## Explainer

Presumably, our best shot at fetching the runtime is to receive the instance as \`thisArg\` to [\`Set.prototype.forEach()\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach) in [\`runtime_computeNow()\`](https://github.com/observablehq/runtime/blob/v4.23.0/src/runtime.js#L110-L119):

1. In [\`captureRuntime\`](#captureRuntime) we apply a temporary [monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) to \`Set.prototype.forEach\` in order to gain access to any passed-in parameters.
2. In [\`runtime\`](#runtime) we define a dependency on \`recomputeTrigger\` to ensure that the \`Mutable\`'s generator value is observed.
3. To trigger a recomputation we reassign [\`mutable recomputeTrigger\`](#recomputeTrigger).
4. In our overridden \`Set.forEach\` callback we then use [duck typing](https://en.wikipedia.org/wiki/Duck_typing) to match the Runtime instance.
5. Once we've encountered the instance we restore \`Set.forEach\` and resolve \`captureRuntime\`, and in turn \`runtime\`.


`
)}

function _24(md){return(
md`---
## Updates

- 2025-09-28 Added a FOSS license, per request.
- 2025-08-01: Replace \`mutable\` with a notebook-kit compatible solution, per request (though you probably want \`__ojs_runtime\` instead).
- 2022-08-28: Rewrite and simplification, documentation updates.
- 2022-08-27: Added \`main\`, \`no_observer\`, \`observed\`. Added example for \`observed\`.`
)}

function _25(md){return(
md`---
*Thumbnail image: [Austrian National Library](https://unsplash.com/photos/ciMJn3mD5u8)*
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("runtime")).define("runtime", ["recomputeTrigger","captureRuntime"], _runtime);
  main.variable(observer("main")).define("main", ["modules"], _main);
  main.variable(observer("modules")).define("modules", ["runtime"], _modules);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("observed")).define("observed", ["no_observer","runtime"], _observed);
  main.variable(observer("no_observer")).define("no_observer", ["main"], _no_observer);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("captureRuntime")).define("captureRuntime", ["mutable_recomputeTrigger"], _captureRuntime);
  main.variable(observer("mutable_recomputeTrigger")).define("mutable_recomputeTrigger", ["Mutable"], _mutable_recomputeTrigger);
  main.variable(observer("recomputeTrigger")).define("recomputeTrigger", ["mutable_recomputeTrigger"], _recomputeTrigger);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof ex_refresh")).define("viewof ex_refresh", ["Inputs"], _ex_refresh);
  main.variable(observer("ex_refresh")).define("ex_refresh", ["Generators", "viewof ex_refresh"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("ex_vars")).define("ex_vars", ["ex_refresh","runtime","modules","no_observer"], _ex_vars);
  main.variable(observer("viewof ex_vars_filters")).define("viewof ex_vars_filters", ["ex_vars","Inputs"], _ex_vars_filters);
  main.variable(observer("ex_vars_filters")).define("ex_vars_filters", ["Generators", "viewof ex_vars_filters"], (G, _) => G.input(_));
  main.variable(observer("ex_vars_table")).define("ex_vars_table", ["ex_vars_filters","ex_vars","Inputs"], _ex_vars_table);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("ex_deps")).define("ex_deps", ["ex_refresh","observed","Inputs","htl"], _ex_deps);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  return main;
}
