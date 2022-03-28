import define1 from "./c704620b9f688381@285.js";

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

function _captureRuntime()
{
  let resolve;
  const fn = Set.prototype.forEach,
    p = new Promise((r) => (resolve = r));
  Set.prototype.forEach = function (...args) {
    let o, runtime;

    if ((o = args[1])) {
      if (o._modules) {
        console.debug(
          "🎉 Captured Runtime from [thisArg] in https://github.com/observablehq/runtime/blob/c9ec40b/src/runtime.js#L107"
        );
        runtime = o;
      } else if (o?._module._runtime) {
        console.debug(
          "🎉 Captured Runtime from [thisArg] in https://github.com/observablehq/runtime/blob/c9ec40b/src/variable.js#L147"
        );
        runtime = o._module._runtime;
      }
    } else if (
      (o = this[Symbol.iterator]().next().value) &&
      o?._module._runtime
    ) {
      console.debug("Captured Runtime from ???");
      runtime = o._module._runtime;
    }

    if (runtime) {
      Set.prototype.forEach = fn;
      resolve(runtime);
    }
    return fn.apply(this, args);
  };

  return p;
}


function _runtime(captureRuntime){return(
captureRuntime
)}

function _5(md){return(
md`---`
)}

function _6(md){return(
md`## Modules`
)}

function _modules(runtime)
{
  const m = new Map([
    // Builtins are assigned to a separate module.
    [runtime._builtin, "builtin"],
    // Additional modules are created for each import (direct or transitive).
    ...Array.from(runtime._modules, ([, v], i) => [v, `import_${i}`])
  ]);
  // Because the first module (i.e., this notebook) is created without a define callback,
  // the runtime does not store any explicit references to it.
  // We have to fetch it from the variables, by method of exclusion.
  // @tomlarkworthy: this trick does not work on embeded pages, so we cannot always determine 'self'
  const noDefine = Array.from(runtime._variables).find(
    (v) => !m.has(v._module)
  );
  if (noDefine) m.set(noDefine._module, "self");
  return m;
}


function _8(md){return(
md`## Variables`
)}

function _variables(runtime,modules){return(
Array.from(runtime._variables)
  .filter(v => v._name !== null)
  .map(v => [modules.get(v._module), v._type === 2 ? `(${v._name})` : v._name])
  .reduce((o, [m, v]) => ((o[m]||(o[m]=[])).push(v), o), {})
)}

function _defines(md,runtime){return(
md`## Defines (Imports)
  <!-- In Observable's UI modules are not automatically removed if an importing cell has been changed or deleted. As such runtime._modules and runtime._variables may contain modules and variables that are currently-->

  Listed below are the define() functions of all imported modules.
  <style>
pre.observablehq--md-pre {max-height: 20em;border:1px solid #aaa;padding:.5em; box-sizing:border-box}
code:not(.hljs) {padding: 0px 3px;
  display: inline-block;
  border: 1px dotted #0004;
  border-radius: 3px;
}
</style>

  ${Array.from(runtime._modules, ([define]) => `~~~javascript\n${define.toString()}~~~\n`)}
`
)}

function _11(md){return(
md`---`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("captureRuntime")).define("captureRuntime", _captureRuntime);
  main.variable(observer("runtime")).define("runtime", ["captureRuntime"], _runtime);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("modules")).define("modules", ["runtime"], _modules);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("variables")).define("variables", ["runtime","modules"], _variables);
  main.variable(observer("defines")).define("defines", ["md","runtime"], _defines);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("slug", child1);
  return main;
}
