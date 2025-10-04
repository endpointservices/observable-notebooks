import define1 from "./57d79353bac56631@44.js";
import define2 from "./a6a56ee61aba9799@406.js";
import define3 from "./98f34e974bb2e4bc@699.js";
import define4 from "./e1c39d41e8e944b0@939.js";
import define5 from "./838e115b5e775566@956.js";
import define6 from "./e3a019069a130d79@6742.js";
import define7 from "./f92778131fd76559@1208.js";
import define8 from "./cdc303fcc82a630f@262.js";
import define9 from "./03dda470c56b93ff@8385.js";
import define10 from "./db42ae70222a8b08@1033.js";
import define11 from "./0e0b35a92c819d94@474.js";

function _title(md){return(
md`# Editor: Reactive Userspace Cell Mutator (v2)

[YouTube explainer](https://www.youtube.com/shorts/6FjeJRBC2iw)

A cell that edits the source of other cells. It is implemented in userspace as a normal cell, so it follows exported notebooks, so exported notebooks become editable! It pairs particularly well with the [single file export](https://observablehq.com/@tomlarkworthy/exporter), because edits are also exported, so you can permanently save your works in a format that continues to be editable and exportable indefinitely. It works offline too!


The editor is able to edit _any_ cell in the runtime, including those in dependancies. Import it into a notebook and then evaluate \`viewof editor\`

\`\`\`js
import {viewof editor} from '@tomlarkworthy/cell-editor'
\`\`\`

There is a minimal example of the exporter + editor setup [here](https://observablehq.com/@tomlarkworthy/editable-exports)

#### Use cases
- Edit notebooks offline
- Try things out without committing to them
- Improved debugging workflow, as you can insert \`debugger\` expressions to dependancies on-demand.
`
)}

function _2(md){return(
md`## TODO
- Rename cell
  - UI variable name does not update
- doesn't transfer properly between visualizers when editor is open
- Load cell from hash, will need the main module named properly in moduleMap
- click outside to unselect, or close
- tagged templates
- better syntax highlighter -- highlight syntax errors -- quite a lot of work, started, but see https://observablehq.com/@tomlarkworthy/observablehq-lezer)
- Import node support (maybe this is a different concern)`
)}

function _3(md){return(
md`## Select Cell`
)}

function _4(selectedCell){return(
selectedCell
)}

function _selectVariable(cellMap,modules,_,$0,Event){return(
async function selectVariable(variable, dom = undefined) {
  let cell = undefined;
  if (variable) {
    const cells = await cellMap(variable._module);
    const [name, variables] = [...cells.entries()].find(
      ([name, vars]) => vars[0] == variable
    );

    cell = {
      dom,
      name,
      module: {
        cells,
        ...modules.get(variable._module)
      },
      variables
    };
  }
  if (!_.isEqual($0.value, cell)) {
    $0.value = cell;
    $0.dispatchEvent(new Event("input"));
  }
}
)}

function _hashCell(location,extractNotebookAndCell,URLSearchParams){return(
function () {
  const hash = location.hash;
  if (hash.length > 0)
    return extractNotebookAndCell(
      new URLSearchParams(hash.substring(1)).get("cell")
    );
}
)}

function _cellClickListener(Generators,hash,selectVariable,divToVar,runtime,$0,invalidation){return(
Generators.observe((notify) => {
  hash;
  notify();

  const clickHandler = (evt) => {
    if (evt.detail !== 1) return; // only on single click
    selectVariable(undefined);
    notify(undefined);
  };

  const dblClickHandler = async (evt) => {
    if (!document.body.classList.contains("picking") || !evt.isTrusted) return;
    const div = evt.target.closest(".observablehq");
    const variable = divToVar(runtime, div);
    if ($0.value?.variables[0] === variable) {
      selectVariable(undefined);
      notify(undefined);
    } else {
      selectVariable(variable, div);
      notify(variable);
    }
  };

  document.body.addEventListener("click", clickHandler);
  document.body.addEventListener("dblclick", dblClickHandler);

  invalidation.then(() => {
    document.body.removeEventListener("click", clickHandler);
    document.body.removeEventListener("dblclick", dblClickHandler);
  });
})
)}

function _selectedCell(Inputs){return(
Inputs.input()
)}

function _divToVar(){return(
function divToVar(runtime, div) {
  if (!div) return undefined;
  if (div.variable) {
    return div.variable;
  } else {
    return [...runtime._variables].find((v) => v._observer._node === div);
  }
}
)}

function _hash_selected_cell(hash,hashCell)
{
  hash;
  return hashCell();
}


function _13(md){return(
md`## Context Menu`
)}

function _context_menu(htl,$0,invalidation,selectedCell,ResizeObserver)
{
  const menu = htl.html`<div style="
      position: absolute;
      z-index: 999;
      background: white;
      border: 1px gray solid;
      padding: 1rem;
      margin: 1rem;
      box-shadow: 1px 2px 2px gray;
    "
    onclick=${(e) => e.stopPropagation()}>
      ${$0}
</div>`;
  invalidation.then(() => menu.remove());

  function positionMenu(target, menu) {
    const frame = menu.parentElement.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    menu.style.top = `${rect.bottom - frame.top}px`;
    menu.style.left = `${rect.left - frame.left}px`;
  }

  if (selectedCell.dom) {
    const visualizer = selectedCell.dom.closest(".lopecode-visualizer");
    if (visualizer) {
      visualizer.appendChild(menu);
    } else {
      document.body.appendChild(menu);
    }
    positionMenu(selectedCell.dom, menu);
    window.addEventListener("resize", () =>
      positionMenu(selectedCell.dom, menu)
    );
    if (window.ResizeObserver) {
      new ResizeObserver(() => positionMenu(selectedCell.dom, menu)).observe(
        selectedCell.dom
      );
    }
  }
  return menu;
}


function _editor(pull_jobs,view,reversibleAttach,combine,$0,$1,$2,$3,$4,$5,$6)
{
  console.log("rebuilding editor");
  pull_jobs;
  const combined = view`<div class="cell-editor" 
    style="display: flex;
           flex-direction: column;">
  <style>
    .picking .observablehq:hover {
      background: #ddd2;
    }
    .picked {
      outline: 1px dashed #999;
    }
    .cell-editor form {
      width: auto
    }
    .cm-editor {
      height: fit-content
    }
  </style>
  <div style="display: flex;">
    ${["module", reversibleAttach(combine, $0)]}
    <span style="flex-grow: 1;"></span>
  </div>
  <div style="display: flex;">
    ${["cell", reversibleAttach(combine, $1)]}
    <span style="flex-grow: 1;"></span>
    ${["remove_variables", reversibleAttach(combine, $2)]}
    ${["add", reversibleAttach(combine, $3)]}
    ${["apply", reversibleAttach(combine, $4)]}
  </div>
  <div style="flex-grow: 1;">
    ${["editor", reversibleAttach(combine, $5)]}
  </div>
  ${["log", reversibleAttach(combine, $6)]}
  
</div>`;

  combined.addEventListener("mouseup", (event) => {});
  combined.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
  return combined;
}


function _16(md){return(
md`Save edits by exporting to a single file`
)}

function _17(exporter){return(
exporter()
)}

function _18(md){return(
md`### Known Issues
- If you create a new cell, it is invisible, it will appear after exporting.`
)}

function _19(md){return(
md`### Editor UI Components`
)}

function _moduleSelection(selectedCell,Inputs,modules){return(
selectedCell &&
  Inputs.select(modules, {
    format: ([name, info]) => info.name,
    disabled: true,
    value: modules.get(selectedCell.module.module)
  })
)}

function _cellSelection(selectedCell,Inputs){return(
selectedCell &&
  Inputs.select(selectedCell.module.cells, {
    disabled: true,
    value: selectedCell.module.cells.get(selectedCell.name)
  })
)}

function _combine(Inputs){return(
Inputs.toggle({
  label: "untick to destructure",
  value: true
})
)}

function _addCells(Inputs,createCell,selectVariable){return(
Inputs.button("➕", {
  reduce: async () => {
    const vars = await createCell();
    let max = 10;
    const pollForObserver = () => {
      if (max-- == 0) {
        console.warn("Can't find dom node for new cell");
        selectVariable(vars[0]);
      } else if (vars[0]._observer._node) {
        selectVariable(vars[0], vars[0]._observer._node);
      } else {
        requestAnimationFrame(pollForObserver);
      }
    };

    pollForObserver();
  }
})
)}

function _remove(Inputs,deleteCell){return(
Inputs.button("🗑️", {
  reduce: deleteCell
})
)}

function _apply(Inputs,compile_and_update,$0,selectedCell)
{
  const button = Inputs.button("▶️", {
    reduce: () => {
      debugger;
      compile_and_update($0.value, selectedCell.variables);
    }
  });
  // supress gaining focus
  // doesn't work on observable iframe
  // https://issues.chromium.org/issues/40654608
  button.tabIndex = "-1";
  button.onmousedown = (e) => e.preventDefault();
  return button;
}


function _module(selectedCell){return(
selectedCell.module.module
)}

function _27(md){return(
md`## Test`
)}

function _code_editor(CodeMirror,codemirror,javascriptPlugin,myDefaultTheme)
{
  const editor = CodeMirror("initial text", {
    extensions: [
      codemirror.keymap.of([
        {
          key: "Shift-Enter",
          run: (...args) => editor.apply(...args)
        }
      ]),
      codemirror.EditorView.lineWrapping,
      javascriptPlugin.javascript(),
      codemirror.basicSetup,
      myDefaultTheme
    ]
  });

  editor.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
  return editor;
}


function _log(Inputs){return(
Inputs.textarea({
  label: "log",
  rows: 2,
  resize: false
})
)}

function _30(md){return(
md`## API`
)}

function _createCell($0){return(
async ({ source = "{}" } = {}) =>
  $0.send({
    command: "createCell",
    args: {
      source
    }
  })
)}

function _deleteCell($0){return(
async () =>
  $0.send({
    command: "deleteCell"
  })
)}

function _focusEditor($0){return(
async ({} = {}) =>
  $0.send({
    command: "focusEditor"
  })
)}

function _34(md){return(
md`## API handler`
)}

function _command(flowQueue){return(
flowQueue()
)}

function _36(command){return(
command
)}

function _command_processor(command,compile_and_update,$0,remove_variables,selectedCell,$1)
{
  if (command.processed) return;

  let result = undefined;
  if (command.command == "createCell") {
    result = compile_and_update("{}");
  } else if (command.command == "focusEditor") {
    $0.querySelector("[contenteditable]").focus();
    result = true;
  } else if (command.command == "deleteCell") {
    remove_variables(selectedCell.variables);
    result = true;
  }
  if (result) {
    command.processed = true;
    $1.resolve(result);
  }
}


function _38(md){return(
md`### UI Action`
)}

function _pull_jobs(runtime,invalidation,observe)
{
  const jobs = [...runtime._variables].find((v) => v._name == "editor_jobs");
  invalidation.then(observe(jobs._module, jobs._name, {}));
}


function _editor_manager($0,compile_and_update,selectedCell,decompiled,Event)
{
  $0.apply = (view) => {
    const doc = view.state.doc.toString();
    compile_and_update(doc, selectedCell.variables);
    return true;
  };
  console.log("updating editor", decompiled);
  $0.value = decompiled;
  $0.dispatchEvent(new Event("input"));
}


function _enable_picking(invalidation)
{
  document.body.classList.add("picking");
  invalidation.then(() => document.body.classList.remove("picking"));
}


function _highlight_picked(selectedCell,isnode,invalidation)
{
  if (!selectedCell) return;
  const dom = isnode(selectedCell.variables[0]._value)
    ? selectedCell.variables[0]._value
    : selectedCell.variables[0]._observer._node;
  if (!dom) return;
  dom.classList.add("picked");
  invalidation.then(() => {
    dom.classList.remove("picked");
  });
}


function _divToCell(){return(
(entries, div) => {
  if (!div) return undefined;
  if (div.variable) {
    return (
      entries.find(
        ([name, cell]) => cell[0] && cell.find((v) => v == div.variable)
      ) || div.variable
    );
  } else {
    return entries.find(
      ([name, cell]) => cell[0] && cell[0]._observer._node === div
    );
  }
}
)}

function _44(md){return(
md`### Decompiler`
)}

async function _modules(forcePeek,runtime,moduleMap,main)
{
  forcePeek([...runtime._variables].find((v) => v._name == "submit_summary"));
  const modules = await moduleMap(runtime);
  modules.set(main, { name: "main", module: main });
  return modules;
}


function _decompiled(selectedCell,decompile)
{
  if (selectedCell.variables.length == 0) return "";
  return decompile(selectedCell.variables);
}


function _editor_jobs(cellClickListener,command_processor,enable_picking,highlight_picked,editor_manager,submit_summary)
{
  // auto subscribe with forcePeek
  cellClickListener;
  command_processor;
  enable_picking;
  highlight_picked;
  editor_manager;
  submit_summary;
  return "editor_jobs";
}


function _48(md){return(
md`### Apply Update`
)}

function _compile_and_update($0,compile,selectedCell,runtime,$1,repositionSetElement){return(
(source, variables = []) => {
  $0.value = "";
  try {
    let reposition = false,
      insertionIndex = -1;
    const newVariables = compile(source);
    if (!variables || variables.length !== newVariables.length) {
      reposition = true;
      variables.forEach((v) => v.delete());
      for (let i = 0; i < newVariables.length; i++) {
        const newVariable = selectedCell.module.module.variable({});
        variables.push(newVariable);
      }
    }
    if (reposition) {
      insertionIndex =
        [...runtime._variables].findIndex(
          (v) => v == $1.value.variables.at(-1)
        ) + 1;
    }
    newVariables.forEach((v, i) => {
      const variable = variables[i];
      let _fn;
      eval("_fn = " + v._definition);
      if (v._name) {
        variable.define(v._name, v._inputs, _fn);
      } else {
        variable.define(v._inputs, _fn);
      }
      if (reposition)
        repositionSetElement(runtime._variables, variable, insertionIndex + i);
    });

    //viewof refresh.dispatchEvent(new Event("input"));
    return variables;
  } catch (e) {
    $0.value = e.toString();
    debugger;
  }
}
)}

function _50(md){return(
md`### Remove Cells`
)}

function _remove_variables(){return(
(variables) => {
  variables.forEach((v) => v.delete());
}
)}

function _52(md){return(
md`### Runtime Representation`
)}

function _variable(Inputs,selectedCell){return(
Inputs.radio(selectedCell.variables, {
  label: "variable in cell group",
  format: (v) => v._name,
  value: selectedCell.variables[0]
})
)}

function _name(variable){return(
variable._name
)}

function _inputs(variable){return(
variable._inputs.map((v) => v._name)
)}

function _definition(Inputs,variable){return(
Inputs.textarea({
  label: "variable._definition",
  value: variable._definition.toString(),
  rows: 10
})
)}

function _57(Inputs,definition,variable,inputs){return(
Inputs.button("update variable", {
  disabled: definition === variable._definition.toString(),
  reduce: () => {
    let _fn;
    eval("_fn = " + definition);
    variable.define(variable._name, inputs, _fn);
  }
})
)}

function _58(md){return(
md`### Editor Libraries`
)}

function _javascriptPlugin(codemirror){return(
codemirror
)}

function _64(md){return(
md`### Libraries`
)}

function _unzip(Response,DecompressionStream){return(
async (attachment) => {
  const response = await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  );

  return response.blob();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["selectedCell"], _4);
  main.variable(observer("selectVariable")).define("selectVariable", ["cellMap","modules","_","viewof selectedCell","Event"], _selectVariable);
  main.variable(observer("hashCell")).define("hashCell", ["location","extractNotebookAndCell","URLSearchParams"], _hashCell);
  main.variable(observer("cellClickListener")).define("cellClickListener", ["Generators","hash","selectVariable","divToVar","runtime","viewof selectedCell","invalidation"], _cellClickListener);
  main.variable(observer("viewof selectedCell")).define("viewof selectedCell", ["Inputs"], _selectedCell);
  main.variable(observer("selectedCell")).define("selectedCell", ["Generators", "viewof selectedCell"], (G, _) => G.input(_));
  main.variable(observer("divToVar")).define("divToVar", _divToVar);
  main.variable(observer("hash_selected_cell")).define("hash_selected_cell", ["hash","hashCell"], _hash_selected_cell);
  const child1 = runtime.module(define1);
  main.import("hash", child1);
  const child2 = runtime.module(define2);
  main.import("extractNotebookAndCell", child2);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("context_menu")).define("context_menu", ["htl","viewof editor","invalidation","selectedCell","ResizeObserver"], _context_menu);
  main.variable(observer("viewof editor")).define("viewof editor", ["pull_jobs","view","reversibleAttach","combine","viewof moduleSelection","viewof cellSelection","viewof remove","viewof addCells","viewof apply","viewof code_editor","viewof log"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["exporter"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof moduleSelection")).define("viewof moduleSelection", ["selectedCell","Inputs","modules"], _moduleSelection);
  main.variable(observer("moduleSelection")).define("moduleSelection", ["Generators", "viewof moduleSelection"], (G, _) => G.input(_));
  main.variable(observer("viewof cellSelection")).define("viewof cellSelection", ["selectedCell","Inputs"], _cellSelection);
  main.variable(observer("cellSelection")).define("cellSelection", ["Generators", "viewof cellSelection"], (G, _) => G.input(_));
  main.variable(observer("viewof combine")).define("viewof combine", ["Inputs"], _combine);
  main.variable(observer("combine")).define("combine", ["Generators", "viewof combine"], (G, _) => G.input(_));
  main.variable(observer("viewof addCells")).define("viewof addCells", ["Inputs","createCell","selectVariable"], _addCells);
  main.variable(observer("addCells")).define("addCells", ["Generators", "viewof addCells"], (G, _) => G.input(_));
  main.variable(observer("viewof remove")).define("viewof remove", ["Inputs","deleteCell"], _remove);
  main.variable(observer("remove")).define("remove", ["Generators", "viewof remove"], (G, _) => G.input(_));
  main.variable(observer("viewof apply")).define("viewof apply", ["Inputs","compile_and_update","viewof code_editor","selectedCell"], _apply);
  main.variable(observer("apply")).define("apply", ["Generators", "viewof apply"], (G, _) => G.input(_));
  main.variable(observer("module")).define("module", ["selectedCell"], _module);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("viewof code_editor")).define("viewof code_editor", ["CodeMirror","codemirror","javascriptPlugin","myDefaultTheme"], _code_editor);
  main.variable(observer("code_editor")).define("code_editor", ["Generators", "viewof code_editor"], (G, _) => G.input(_));
  main.variable(observer("viewof log")).define("viewof log", ["Inputs"], _log);
  main.variable(observer("log")).define("log", ["Generators", "viewof log"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("createCell")).define("createCell", ["viewof command"], _createCell);
  main.variable(observer("deleteCell")).define("deleteCell", ["viewof command"], _deleteCell);
  main.variable(observer("focusEditor")).define("focusEditor", ["viewof command"], _focusEditor);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("viewof command")).define("viewof command", ["flowQueue"], _command);
  main.variable(observer("command")).define("command", ["Generators", "viewof command"], (G, _) => G.input(_));
  main.variable(observer()).define(["command"], _36);
  main.variable(observer("command_processor")).define("command_processor", ["command","compile_and_update","viewof code_editor","remove_variables","selectedCell","viewof command"], _command_processor);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("pull_jobs")).define("pull_jobs", ["runtime","invalidation","observe"], _pull_jobs);
  main.variable(observer("editor_manager")).define("editor_manager", ["viewof code_editor","compile_and_update","selectedCell","decompiled","Event"], _editor_manager);
  main.variable(observer("enable_picking")).define("enable_picking", ["invalidation"], _enable_picking);
  main.variable(observer("highlight_picked")).define("highlight_picked", ["selectedCell","isnode","invalidation"], _highlight_picked);
  main.variable(observer("divToCell")).define("divToCell", _divToCell);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("modules")).define("modules", ["forcePeek","runtime","moduleMap","main"], _modules);
  main.variable(observer("decompiled")).define("decompiled", ["selectedCell","decompile"], _decompiled);
  main.variable(observer("editor_jobs")).define("editor_jobs", ["cellClickListener","command_processor","enable_picking","highlight_picked","editor_manager","submit_summary"], _editor_jobs);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("compile_and_update")).define("compile_and_update", ["viewof log","compile","selectedCell","runtime","viewof selectedCell","repositionSetElement"], _compile_and_update);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("remove_variables")).define("remove_variables", _remove_variables);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("viewof variable")).define("viewof variable", ["Inputs","selectedCell"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer("name")).define("name", ["variable"], _name);
  main.variable(observer("inputs")).define("inputs", ["variable"], _inputs);
  main.variable(observer("viewof definition")).define("viewof definition", ["Inputs","variable"], _definition);
  main.variable(observer("definition")).define("definition", ["Generators", "viewof definition"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","definition","variable","inputs"], _57);
  main.variable(observer()).define(["md"], _58);
  const child3 = runtime.module(define3);
  main.import("toObject", child3);
  main.import("isnode", child3);
  main.import("repositionSetElement", child3);
  const child4 = runtime.module(define4);
  main.import("runtime", child4);
  main.import("main", child4);
  const child5 = runtime.module(define5);
  main.import("CodeMirror", child5);
  main.import("codemirror", child5);
  main.import("myDefaultTheme", child5);
  const child6 = runtime.module(define6);
  main.import("decompile", child6);
  main.import("compile", child6);
  main.import("cellMap", child6);
  main.import("sourceModule", child6);
  main.import("findModuleName", child6);
  main.import("parser", child6);
  main.variable(observer("javascriptPlugin")).define("javascriptPlugin", ["codemirror"], _javascriptPlugin);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  const child7 = runtime.module(define7);
  main.import("view", child7);
  const child8 = runtime.module(define8);
  main.import("reversibleAttach", child8);
  const child9 = runtime.module(define9);
  main.import("exporter", child9);
  const child10 = runtime.module(define10);
  main.import("moduleMap", child10);
  main.import("submit_summary", child10);
  main.import("forcePeek", child10);
  main.import("observe", child10);
  const child11 = runtime.module(define11);
  main.import("flowQueue", child11);
  return main;
}
