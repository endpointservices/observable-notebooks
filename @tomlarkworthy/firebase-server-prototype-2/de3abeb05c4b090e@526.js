import define1 from "./03dda470c56b93ff@8246.js";
import define2 from "./0bfb0753c2018bb4@559.js";
import define3 from "./09fdee029150048c@436.js";
import define4 from "./a6a56ee61aba9799@406.js";
import define5 from "./57d79353bac56631@44.js";
import define6 from "./db42ae70222a8b08@995.js";
import define7 from "./e1c39d41e8e944b0@378.js";
import define8 from "./98f34e974bb2e4bc@650.js";

function _1(md){return(
md`# Explorer: Module Selector`
)}

function _selected_modules(exportState,persistedAttachments,hash,getHashModules,currentModules,Inputs,html,linkTo)
{
  exportState; // do after URL is set by exported state
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


function _additional_module(Inputs){return(
Inputs.text({
  label: "add module",
  placeholder: "@tomlarkworthy/debugger",
  width: "400px",
  pattern: "^@[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$",
  submit: true
})
)}

function _4(visualizeModules){return(
visualizeModules()
)}

function _6(exporter){return(
exporter()
)}

function _7(md){return(
md`## Additional Modules

Extra modules for dynamic loading are named as a JSON list in file attachment \`additionalModules.json\``
)}

function _notebookModule(thisModule){return(
thisModule()
)}

async function _persistedAttachments(getFileAttachments,notebookModule,importNotebook)
{
  debugger;
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


function _additionalModules($0,invalidation,persistedAttachments,additional_module,importNotebook,setFileAttachment,jsonFileAttachment,notebookModule)
{
  const input = $0.querySelector("input");
  const report = () => $0.reportValidity();
  input.addEventListener("input", report);
  invalidation.then(() => input.removeEventListener("input", report));

  const additionalModules = this || persistedAttachments || new Set();
  if (
    additional_module &&
    additional_module !== "" &&
    !additionalModules.has(additional_module)
  ) {
    debugger;
    additionalModules.add(additional_module);
    importNotebook(additional_module, []);
    setFileAttachment(
      jsonFileAttachment("additionalModules.json", [...additionalModules]),
      notebookModule
    );
  }
  return additionalModules;
}


function _13(md){return(
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

function _16(getHashModules){return(
getHashModules()
)}

function _18(md){return(
md`## Model`
)}

function _vars(variables,runtime){return(
variables(runtime)
)}

function _20(md){return(
md`## Background Tasks`
)}

function _navigator_jobs(updateNotebookImports,submit_summary)
{
  updateNotebookImports, submit_summary;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof selected_modules")).define("viewof selected_modules", ["exportState","persistedAttachments","hash","getHashModules","currentModules","Inputs","html","linkTo"], _selected_modules);
  main.variable(observer("selected_modules")).define("selected_modules", ["Generators", "viewof selected_modules"], (G, _) => G.input(_));
  main.variable(observer("viewof additional_module")).define("viewof additional_module", ["Inputs"], _additional_module);
  main.variable(observer("additional_module")).define("additional_module", ["Generators", "viewof additional_module"], (G, _) => G.input(_));
  main.variable(observer()).define(["visualizeModules"], _4);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.import("exportState", child1);
  main.variable(observer()).define(["exporter"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof notebookModule")).define("viewof notebookModule", ["thisModule"], _notebookModule);
  main.variable(observer("notebookModule")).define("notebookModule", ["Generators", "viewof notebookModule"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("importNotebook", child2);
  const child3 = runtime.module(define3);
  main.import("jsonFileAttachment", child3);
  main.import("setFileAttachment", child3);
  main.import("removeFileAttachment", child3);
  main.import("getFileAttachments", child3);
  main.variable(observer("persistedAttachments")).define("persistedAttachments", ["getFileAttachments","notebookModule","importNotebook"], _persistedAttachments);
  main.variable(observer("additionalModules")).define("additionalModules", ["viewof additional_module","invalidation","persistedAttachments","additional_module","importNotebook","setFileAttachment","jsonFileAttachment","notebookModule"], _additionalModules);
  main.variable(observer()).define(["md"], _13);
  const child4 = runtime.module(define4);
  main.import("parseGoldenDSL", child4);
  main.import("listModules", child4);
  main.import("serializeGoldenDSL", child4);
  main.import("linkTo", child4);
  main.import("updateNotebookImports", child4);
  main.variable(observer("getHashModules")).define("getHashModules", ["location","URLSearchParams","listModules"], _getHashModules);
  main.variable(observer()).define(["getHashModules"], _16);
  const child5 = runtime.module(define5);
  main.import("hash", child5);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof vars")).define("viewof vars", ["variables","runtime"], _vars);
  main.variable(observer("vars")).define("vars", ["Generators", "viewof vars"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("navigator_jobs")).define("navigator_jobs", ["updateNotebookImports","submit_summary"], _navigator_jobs);
  const child6 = runtime.module(define6);
  main.import("moduleMap", child6);
  main.import("submit_summary", child6);
  main.import("viewof currentModules", child6);
  main.import("currentModules", child6);
  main.import("visualizeModules", child6);
  const child7 = runtime.module(define7);
  main.import("runtime", child7);
  main.import("main", child7);
  const child8 = runtime.module(define8);
  main.import("variables", child8);
  main.import("thisModule", child8);
  return main;
}
