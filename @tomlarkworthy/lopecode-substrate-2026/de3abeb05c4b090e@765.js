import define1 from "./e3a019069a130d79@6817.js";
import define2 from "./10c7899865f8a76e@8998.js";
import define3 from "./0bfb0753c2018bb4@591.js";
import define4 from "./09fdee029150048c@446.js";
import define5 from "./a6a56ee61aba9799@409.js";
import define6 from "./57d79353bac56631@44.js";
import define7 from "./db42ae70222a8b08@1170.js";
import define8 from "./e1c39d41e8e944b0@950.js";
import define9 from "./98f34e974bb2e4bc@958.js";

function _1(md){return(
md`# Explorer: Module Selector`
)}

function _selected_modules(persistedAttachments,hash,getHashModules,currentModules,Inputs,html,linkTo)
{
  persistedAttachments; // load persisted modules as well
  hash; // recompute if hash changes
  const hashModules = getHashModules();
  const modules = [...currentModules.values()].map((m) => ({
    ...m,
    cell: hashModules.get(m.name)?.cell
  }));
  return Inputs.table(modules, {
    rows: Infinity,
    sort: "name",
    columns: ["name" /*, "cell"*/],
    required: false,
    value: modules.filter((m) => hashModules.get(m.name)),
    format: {
      name: (name) => html`<a href="${linkTo(name)}">${name}</a>`
    }
  });
}


function _3(currentModules){return(
currentModules.values()
)}

function _create_module(Inputs){return(
Inputs.text({
  label: "create module",
  width: "400px",
  submit: "create",
  placeholder: "@user/scratch",
  width: "400px",
  pattern: "^@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$"
})
)}

function _additional_module(Inputs){return(
Inputs.text({
  label: "load module",
  placeholder: "@tomlarkworthy/debugger",
  width: "400px",
  pattern: "^@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$",
  submit: "import"
})
)}

function _remove_module(Inputs,currentModules){return(
Inputs.select([null, currentModules.values()], {
  label: "remove module",
  width: "400px",
  format: (module) => module?.name
})
)}

function _7(visualizeModules){return(
visualizeModules()
)}

function _10(exporter){return(
exporter()
)}

function _11(md){return(
md`## Additional Modules

Extra modules for dynamic loading are named as a JSON list in file attachment \`additionalModules.json\``
)}

function _notebookModule(thisModule){return(
thisModule()
)}

async function _persistedAttachments(getFileAttachments,notebookModule,importNotebook)
{
  const attachments = getFileAttachments(notebookModule);
  if (attachments.has("additionalModules.json")) {
    const extras = new Set(
      await attachments.get("additionalModules.json").json()
    );
    await Promise.all(
      [...extras].map(async (notebook) => await importNotebook(notebook, []))
    );
    return extras;
  } else return new Set();
}


function _additionalModules(persistedAttachments){return(
persistedAttachments || new Set()
)}

function _addModuleAndPersist(additionalModules,setFileAttachment,jsonFileAttachment,notebookModule){return(
function addModuleAndPersist(name) {
  additionalModules.add(name);
  setFileAttachment(
    jsonFileAttachment("additionalModules.json", [...additionalModules]),
    notebookModule
  );
}
)}

function _removeModuleAndPersist(additionalModules,setFileAttachment,jsonFileAttachment,notebookModule){return(
(name) => {
  additionalModules.delete(name);
  setFileAttachment(
    jsonFileAttachment("additionalModules.json", [...additionalModules]),
    notebookModule
  );
}
)}

function _createModule($0,invalidation,create_module,notebookModule,addModuleAndPersist)
{
  const input = $0.querySelector("input");
  const report = () => $0.reportValidity();
  input.addEventListener("input", report);
  invalidation.then(() => input.removeEventListener("input", report));

  if (create_module && create_module !== "") {
    const runtime = notebookModule._runtime;
    const moduleSource = `export default function define(runtime, observer) {
      const main = runtime.module();
      main.variable(observer()).define(["md"], (md) => md\`# Untitled\`);
    }`;
    const blob = new Blob([moduleSource], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const variableSource = `async () => "${create_module}" && runtime.module((await import("${url}")).default)`;
    let definition;
    eval("definition = " + variableSource);
    const moduleVariable = notebookModule.define(
      `module ${create_module}`,
      [],
      definition
    );
    addModuleAndPersist(create_module);
    return moduleVariable;
  }
}


async function _addModule($0,invalidation,additional_module,additionalModules,importNotebook,addModuleAndPersist)
{
  const input = $0.querySelector("input");
  const report = () => $0.reportValidity();
  input.addEventListener("input", report);
  invalidation.then(() => input.removeEventListener("input", report));
  if (
    additional_module &&
    additional_module !== "" &&
    !additionalModules.has(additional_module)
  ) {
    await importNotebook(additional_module, []);
    addModuleAndPersist(additional_module);
  }
}


function _removeModule(remove_module,removeModuleAndPersist)
{
  if (remove_module) {
    removeModuleAndPersist(remove_module);
    const variables = [...remove_module.module._runtime._variables].filter(
      (v) =>
        v._module == remove_module.module ||
        v._name == `module ${remove_module.name}`
    );
    const entry = [...remove_module.module._runtime._modules.entries()].find(
      ([key, value]) => value == remove_module.module
    );

    if (entry) {
      const [define, module] = entry;
      remove_module.module._runtime._modules.delete(define);
    }

    variables.forEach((v) => v.delete());
    return remove_module;
  }
}


function _22(moduleMap){return(
moduleMap()
)}

function _23(md){return(
md`## URL encoding`
)}

function _getHashModules(location,URLSearchParams,listModules){return(
() => {
  const hash = location.hash;
  const hashParams = new URLSearchParams(hash.slice(1));
  try {
    return listModules(hashParams.get("view"));
  } catch (err) {
    console.log(err);
    return [];
  }
}
)}

function _27(md){return(
md`## Model`
)}

function _28(md){return(
md`## Background Tasks`
)}

function _navigator_jobs(updateNotebookImports,submit_summary,$0,currentModules)
{
  updateNotebookImports, submit_summary, $0, currentModules;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof selected_modules")).define("viewof selected_modules", ["persistedAttachments","hash","getHashModules","currentModules","Inputs","html","linkTo"], _selected_modules);
  main.variable(observer("selected_modules")).define("selected_modules", ["Generators", "viewof selected_modules"], (G, _) => G.input(_));
  main.variable(observer()).define(["currentModules"], _3);
  main.variable(observer("viewof create_module")).define("viewof create_module", ["Inputs"], _create_module);
  main.variable(observer("create_module")).define("create_module", ["Generators", "viewof create_module"], (G, _) => G.input(_));
  main.variable(observer("viewof additional_module")).define("viewof additional_module", ["Inputs"], _additional_module);
  main.variable(observer("additional_module")).define("additional_module", ["Generators", "viewof additional_module"], (G, _) => G.input(_));
  main.variable(observer("viewof remove_module")).define("viewof remove_module", ["Inputs","currentModules"], _remove_module);
  main.variable(observer("remove_module")).define("remove_module", ["Generators", "viewof remove_module"], (G, _) => G.input(_));
  main.variable(observer()).define(["visualizeModules"], _7);
  const child1 = runtime.module(define1);
  main.import("cellMap", child1);
  const child2 = runtime.module(define2);
  main.import("exporter", child2);
  main.variable(observer()).define(["exporter"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof notebookModule")).define("viewof notebookModule", ["thisModule"], _notebookModule);
  main.variable(observer("notebookModule")).define("notebookModule", ["Generators", "viewof notebookModule"], (G, _) => G.input(_));
  const child3 = runtime.module(define3);
  main.import("importNotebook", child3);
  const child4 = runtime.module(define4);
  main.import("jsonFileAttachment", child4);
  main.import("setFileAttachment", child4);
  main.import("removeFileAttachment", child4);
  main.import("getFileAttachments", child4);
  main.variable(observer("persistedAttachments")).define("persistedAttachments", ["getFileAttachments","notebookModule","importNotebook"], _persistedAttachments);
  main.variable(observer("additionalModules")).define("additionalModules", ["persistedAttachments"], _additionalModules);
  main.variable(observer("addModuleAndPersist")).define("addModuleAndPersist", ["additionalModules","setFileAttachment","jsonFileAttachment","notebookModule"], _addModuleAndPersist);
  main.variable(observer("removeModuleAndPersist")).define("removeModuleAndPersist", ["additionalModules","setFileAttachment","jsonFileAttachment","notebookModule"], _removeModuleAndPersist);
  main.variable(observer("createModule")).define("createModule", ["viewof create_module","invalidation","create_module","notebookModule","addModuleAndPersist"], _createModule);
  main.variable(observer("addModule")).define("addModule", ["viewof additional_module","invalidation","additional_module","additionalModules","importNotebook","addModuleAndPersist"], _addModule);
  main.variable(observer("removeModule")).define("removeModule", ["remove_module","removeModuleAndPersist"], _removeModule);
  main.variable(observer()).define(["moduleMap"], _22);
  main.variable(observer()).define(["md"], _23);
  const child5 = runtime.module(define5);
  main.import("parseGoldenDSL", child5);
  main.import("listModules", child5);
  main.import("serializeGoldenDSL", child5);
  main.import("linkTo", child5);
  main.import("updateNotebookImports", child5);
  main.variable(observer("getHashModules")).define("getHashModules", ["location","URLSearchParams","listModules"], _getHashModules);
  const child6 = runtime.module(define6);
  main.import("hash", child6);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("navigator_jobs")).define("navigator_jobs", ["updateNotebookImports","submit_summary","viewof currentModules","currentModules"], _navigator_jobs);
  const child7 = runtime.module(define7);
  main.import("moduleMap", child7);
  main.import("submit_summary", child7);
  main.import("viewof currentModules", child7);
  main.import("currentModules", child7);
  main.import("visualizeModules", child7);
  const child8 = runtime.module(define8);
  main.import("runtime", child8);
  main.import("main", child8);
  const child9 = runtime.module(define9);
  main.import("thisModule", child9);
  return main;
}
