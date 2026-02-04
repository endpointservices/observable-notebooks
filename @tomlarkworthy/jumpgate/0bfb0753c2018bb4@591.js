import define1 from "./98f34e974bb2e4bc@958.js";

function _1(md){return(
md`# Programmatic \`importNotebook\`

\`importNotebook\` is a programmatic version of \`import\`. After an export, the import becomes "baked in" and offline-first.


Issues:-
- Observable dependancy resolution can miss, leading to new modules which look similar but are not the same
- Would be better to import to an isolated module, reserialize, and depend on that.
- By the time the module is running we lost import map magic though.
- Maybe esModuleShim can help import a module but hook the resolution. Also supports dynamic import maps.`
)}

function _2(runtime){return(
runtime._modules
)}

function _3(importNotebook)
{
  debugger;
  importNotebook("@tomlarkworthy/exporter-2", [
    {
      imported: "exporter",
      /* optional */ local: "exporter2"
    }
  ]);
}


function _4(md){return(
md`The following cell demonstrate the imported cell works. Also, its the exporter dependancy so you can see that the import continues to work after export, and even offline.`
)}

function _5(exporter2){return(
exporter2()
)}

function _importNotebook(runtime,resolutions_key,main,md){return(
async (notebook, specifiers = []) => {
  runtime;
  let fn;
  const importKeyword = window.importShim ? "importShim" : "import";
  for (const url of [
    notebook,
    `https://api.observablehq.com/${notebook}.js?v=4&${resolutions_key}`
  ]) {
    try {
      fn = eval(
        `async () => runtime.module((await ${importKeyword}("${url}")).default)`
      );
      await fn();
      break;
    } catch {}
  }
  if (!fn) throw `Can't resolve ${notebook}`;

  const module_variable = `module ${notebook}`;

  if (!main._scope.has(module_variable)) {
    main.define(module_variable, fn);
  }

  for (let { imported, local = null } of specifiers) {
    if (!local) local = imported;
    if (!main._scope.has(local)) {
      main.define(local, [module_variable, "@variable"], (_, v) =>
        v.import(imported, local, _)
      );
    } else {
      main.redefine(local, [module_variable, "@variable"], (_, v) =>
        v.import(imported, local, _)
      );
    }
  }

  return md`~~~js
importNotebook("${notebook}", ${JSON.stringify(specifiers)})
~~~`;
}
)}

function _resolutions_key(isOnObservableCom,runtime)
{
  if (isOnObservableCom()) {
    for (let v of runtime._variables) {
      let match;
      if (
        v._value?._scope &&
        (match = /(resolutions=[a-f0-9]+@\d+)/.exec(v._definition.toString()))
      ) {
        return match[1];
      }
    }
  }
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["runtime"], _2);
  main.variable(observer()).define(["importNotebook"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["exporter2"], _5);
  main.variable(observer("importNotebook")).define("importNotebook", ["runtime","resolutions_key","main","md"], _importNotebook);
  main.variable(observer("resolutions_key")).define("resolutions_key", ["isOnObservableCom","runtime"], _resolutions_key);
  const child1 = runtime.module(define1);
  main.import("keepalive", child1);
  main.import("thisModule", child1);
  main.import("isOnObservableCom", child1);
  main.import("runtime", child1);
  main.import("main", child1);
  return main;
}
