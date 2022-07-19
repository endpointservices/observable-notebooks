// https://observablehq.com/@mootari/access-runtime@420
function _1(md){return(
md`# Accessing a Notebook's Runtime

Based on an idea by Bryan Gin-ge Chen (which he explores in his notebook [Dirty tricks](https://observablehq.com/d/4e5230c1d38f7c0f)), this notebook demonstrates a hack that can grant access to a notebook's underlying [Runtime](https://github.com/observablehq/runtime) instance.

*Related discussion: [Check if a cell is defined](https://talk.observablehq.com/t/check-if-a-cell-is-defined/4351/3)*

*Thumbnail image: [Austrian National Library](https://unsplash.com/photos/ciMJn3mD5u8)*
`
)}

function _2(md){return(
md`---
*Disclaimer: The documentation found in this notebook must not be taken as fact. It is meant to be a "best effort" to dissect Observable's runtime.*

Presumably, our best shot at fetching the runtime is to receive the instance as \`thisArg\` to [\`Set.prototype.forEach()\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach) in [\`runtime_computeNow()\`](Capturing from https://github.com/observablehq/runtime/blob/c9ec40b/src/runtime.js#L107).

To find possible ways to trigger it, let's walk back through the call graph:
1. \`runtime_computeNow()\` is called exclusively by \`runtime_computeSoon()\`.
2. \`runtime_computeSoon()\` is exclusively called by \`runtime_compute()\`.
3. \`runtime_compute()\` is called as \`runtime._compute()\` in the following places:
  - [\`variable_defineImpl()\`](https://github.com/observablehq/runtime/blob/c9ec40b577522eb19a1385f74b2b9f49013b13e5/src/variable.js#L92)
    - called through \`variable_define\` and \`variable_import\`
  - [\`module_value()\`](https://github.com/observablehq/runtime/blob/c9ec40b577522eb19a1385f74b2b9f49013b13e5/src/module.js#L55)
    - API only, not called anywhere

Ergo, the runtime can only be fetched if at least one other variable (cell) gets defined after \`captureRuntime\`.

The following code applies a temporary [monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) to \`Set.prototype.forEach\` in order to gain access to any passed-in parameters, then uses [duck typing](https://en.wikipedia.org/wiki/Duck_typing) to match the Runtime instance.
`
)}

function _runtime(){return(
new Promise(resolve => {
  const debug = new URL(document.baseURI).searchParams.has('debug')
    ? console.debug
    : () => {};
  const fn = Set.prototype.forEach;
  Set.prototype.forEach = function(...args) {
    let o, runtime;
    
    if(o = args[1]) {
      
      if(o._modules) {
        debug('🎉 Captured Runtime from [thisArg] in https://github.com/observablehq/runtime/blob/c9ec40b/src/runtime.js#L107');
        runtime = o;
      }
      else if(o._module) {
        debug('🎉 Captured Runtime from [thisArg] in https://github.com/observablehq/runtime/blob/c9ec40b/src/variable.js#L147');
        runtime = o._module._runtime;
      }
    }
    else if((o = this[Symbol.iterator]().next().value) && o._module) {
      debug('Captured Runtime from ???');
      runtime = o._module._runtime;
    }
    
    if(runtime) {
      Set.prototype.forEach = fn;
      resolve(runtime);
    }
    return fn.apply(this, args);
  };
})
)}

function _4(md){return(
md`---`
)}

function _5(md){return(
md`## Modules`
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


function _7(md){return(
md`## Variables`
)}

function _8(runtime){return(
Array.from(runtime._variables).map(v => v._name)
)}

function _variables(runtime,modules){return(
Array.from(runtime._variables)
  //.filter(v => v._name !== null)
  .map(v => [modules.get(v._module), v._type === 2 ? `(${v._name})` : v._name])
  .reduce((o, [m, v]) => ((o[m]||(o[m]=[])).push(v), o), {})
)}

function _10(md){return(
md`---
`
)}

function _captureRuntime(runtime){return(
runtime
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("runtime")).define("runtime", _runtime);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("modules")).define("modules", ["runtime"], _modules);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["runtime"], _8);
  main.variable(observer("variables")).define("variables", ["runtime","modules"], _variables);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("captureRuntime")).define("captureRuntime", ["runtime"], _captureRuntime);
  return main;
}
