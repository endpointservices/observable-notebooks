import define1 from "./e1c39d41e8e944b0@939.js";
import define2 from "./98f34e974bb2e4bc@699.js";

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

function _3(importNotebook){return(
importNotebook("@tomlarkworthy/exporter", [
  {
    imported: "exporter",
    /* optional */ local: "exporter2"
  }
])
)}

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
  for (const url of [
    notebook,
    `https://api.observablehq.com/${notebook}.js?v=4&${resolutions_key}`
  ]) {
    try {
      fn = eval(`async () => runtime.module((await import("${url}")).default)`);
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


function _10(md){return(
md`---
Experiments`
)}

function _getImportMap(){return(
() => ({
  ...JSON.parse(document.querySelector("script[type='importmap'")?.text || "{}")
    ?.imports,
  ...window.importShim.getImportMap().imports
})
)}

function _test_getModuleName(getModuleName)
{
  let input;
  if (
    (input =
      getModuleName(
        "https://api.observablehq.com/@tomlarkworthy/svg-boinger.js?v=4"
      ) !== "@tomlarkworthy/svg-boinger")
  )
    throw Error(input);
  if (
    (input = getModuleName(
      "/d/c2dae147641e012a@46.js?v=4&resolutions=0b75dbddd18995dc@1761"
    )) !== "d/c2dae147641e012a@46"
  )
    throw Error(input);

  return "ok";
}


function _getModuleName(){return(
(path) =>
  (path.match(/^(?:https?:\/\/[^\/]+\/|\/)([^?#]+?)\.js\b/i) || [])[1]
)}

function _moduleLoader(esModuleShims,resolve)
{
  debugger;
  return esModuleShims({
    shimMode: true,
    resolve
  });
}


function _resolves(Inputs){return(
Inputs.input([])
)}

function _17(resolves){return(
resolves
)}

function _resolve($0,Event,getModuleName,getImportMap){return(
(id, parentUrl, defaultResolve) => {
  $0.value.push([id, parentUrl]);
  $0.dispatchEvent(new Event("input"));
  const module = getModuleName(id);
  const importmap = getImportMap();
  debugger;
  if (importmap[module]) return importmap[module];

  // Default resolve will handle the typical URL and import map resolution
  return defaultResolve(id, parentUrl);
}
)}

function _load(Inputs){return(
Inputs.toggle()
)}

function _boinger(moduleLoader,load)
{
  moduleLoader;
  if (load) {
    return window.importShim(
      "https://api.observablehq.com/@tomlarkworthy/debugger.js?v=4"
    );
  }
}


function _21(boinger){return(
boinger.default.toString()
)}

function _boinger_module(runtime,boinger,observable,notebook){return(
runtime.module(
  boinger.default,
  observable.Inspector.into(notebook)
)
)}

function _23(boinger_module){return(
boinger_module._scope
)}

function _observable(require){return(
require("@observablehq/runtime@4")
)}

function _notebook(htl){return(
htl.html`<div>`
)}

function _unzip(Response,DecompressionStream){return(
async (attachment) =>
  await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  ).blob()
)}

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
  main.import("runtime", child1);
  main.import("main", child1);
  const child2 = runtime.module(define2);
  main.import("keepalive", child2);
  main.import("thisModule", child2);
  main.import("isOnObservableCom", child2);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("getImportMap")).define("getImportMap", _getImportMap);
  main.variable(observer("test_getModuleName")).define("test_getModuleName", ["getModuleName"], _test_getModuleName);
  main.variable(observer("getModuleName")).define("getModuleName", _getModuleName);
  main.variable(observer("moduleLoader")).define("moduleLoader", ["esModuleShims","resolve"], _moduleLoader);
  main.variable(observer("viewof resolves")).define("viewof resolves", ["Inputs"], _resolves);
  main.variable(observer("resolves")).define("resolves", ["Generators", "viewof resolves"], (G, _) => G.input(_));
  main.variable(observer()).define(["resolves"], _17);
  main.variable(observer("resolve")).define("resolve", ["viewof resolves","Event","getModuleName","getImportMap"], _resolve);
  main.variable(observer("viewof load")).define("viewof load", ["Inputs"], _load);
  main.variable(observer("load")).define("load", ["Generators", "viewof load"], (G, _) => G.input(_));
  main.variable(observer("boinger")).define("boinger", ["moduleLoader","load"], _boinger);
  main.variable(observer()).define(["boinger"], _21);
  main.variable(observer("boinger_module")).define("boinger_module", ["runtime","boinger","observable","notebook"], _boinger_module);
  main.variable(observer()).define(["boinger_module"], _23);
  main.variable(observer("observable")).define("observable", ["require"], _observable);
  main.variable(observer("notebook")).define("notebook", ["htl"], _notebook);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
