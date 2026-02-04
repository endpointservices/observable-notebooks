import define1 from "./57d79353bac56631@44.js";
import define2 from "./a6a56ee61aba9799@409.js";
import define3 from "./98f34e974bb2e4bc@958.js";
import define4 from "./e1c39d41e8e944b0@939.js";
import define5 from "./838e115b5e775566@956.js";
import define6 from "./e3a019069a130d79@6817.js";
import define7 from "./f92778131fd76559@1212.js";
import define8 from "./cdc303fcc82a630f@262.js";
import define9 from "./03dda470c56b93ff@8395.js";
import define10 from "./db42ae70222a8b08@1170.js";
import define11 from "./0e0b35a92c819d94@474.js";

function _title(md){return(
md`# Editor: Reactive Userspace Cell Mutator (v3)

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
  } else {
    $0.value = cell;
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

function _cellListener(Generators,hash,selectVariable,divToVar,runtime,$0,invalidation){return(
Generators.observe((notify) => {
  hash;
  notify();

  const clickHandler = (evt) => {
    if (evt.detail !== 1) return; // only on single click
    selectVariable(undefined);
    notify(undefined);
  };

  const moveHandler = async (evt) => {
    if (!document.body.classList.contains("picking") || !evt.isTrusted) return;
    const div = evt.target.closest(".observablehq");
    const variable = divToVar(runtime, div);
    if (
      !variable ||
      ($0.value && div.contains($0.value.dom))
    ) {
      return;
    }
    if ($0.value?.variables[0] === variable) {
      //selectVariable(undefined);
      //notify(undefined);
    } else {
      selectVariable(variable, div);
      notify(variable);
    }
  };

  //document.body.addEventListener("click", clickHandler);
  document.body.addEventListener("mousemove", moveHandler);

  invalidation.then(() => {
    //document.body.removeEventListener("click", clickHandler);
    document.body.removeEventListener("mousemove", moveHandler);
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


function _12(md){return(
md`## Context Menu`
)}

function _context_menu(htl,$0,invalidation,selectedCell,ResizeObserver)
{
  const menu = htl.html`<div style="
      position: absolute;
      z-index: 999;
      background: white;
      border: 1px gray solid;
      padding: 0px 1rem;
      margin: 0px 1rem 0px;
      box-shadow: 1px 2px 2px gray;
    "
    onclick=${(e) => e.stopPropagation()}>
      ${$0}
</div>`;
  invalidation.then(() => menu.remove());

  function positionMenu(target, menu) {
    if (!menu.parentElement) return;
    const frame = menu.parentElement.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    menu.style.top = `${rect.bottom - frame.top + 17}px`;
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


function _editor(pull_jobs,view,$0,toolbar,reversibleAttach,combine,$1,$2,$3)
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
  <details open=${$0.value} ontoggle=${(evt) => {
    $0.value = evt.newState == "open";
  }}>
    <summary>edit</summary>
    ${toolbar}
      <div style="display: flex;">
        ${["module", reversibleAttach(combine, $1)]}
        <span style="flex-grow: 1;"></span>
        ${["cell", reversibleAttach(combine, $2)]}
      </div>
      
    <div style="flex-grow: 1; padding-bottom: 1rem;">
      ${["editor", reversibleAttach(combine, $3)]}
    </div>
  </details>
</div>`;

  combined.addEventListener("mouseup", (event) => {});
  combined.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
  return combined;
}


function _15(md){return(
md`Save edits by exporting to a single file`
)}

function _16(exporter){return(
exporter()
)}

function _17(md){return(
md`### Known Issues
- If you create a new cell, it is invisible, it will appear after exporting.`
)}

function _18(md){return(
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

function _edit(Inputs){return(
Inputs.toggle({ label: "edit" })
)}

function _toolbar(view,reversibleAttach,combine,$0,$1,$2,$3,$4){return(
view`<div style="display: flex;">
    ${["up", reversibleAttach(combine, $0)]}
    ${["down", reversibleAttach(combine, $1)]}
    ${["remove_variables", reversibleAttach(combine, $2)]}
    ${["add", reversibleAttach(combine, $3)]}
    ${["apply", reversibleAttach(combine, $4)]}
    <span style="flex-grow: 1;"></span>
</div>`
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


function _up(Inputs,moveCell,$0){return(
Inputs.button("⬆", {
  reduce: () => moveCell($0.value, -1)
})
)}

function _down(Inputs,moveCell,$0){return(
Inputs.button("⬇", {
  reduce: () => moveCell($0.value, 1)
})
)}

function _module(selectedCell){return(
selectedCell.module.module
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


function _31(md){return(
md`## API`
)}

function _moveCell($0){return(
async (cell, amount) =>
  $0.send({
    command: "moveCell",
    args: {
      cell,
      amount
    }
  })
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

function _36(md){return(
md`## API handler`
)}

function _command(flowQueue){return(
flowQueue()
)}

function _38(command){return(
command
)}

function _findCellByVariable(){return(
(v, cells) =>
  [...cells.entries()].find((vars) => vars.includes(v))
)}

function _findCellIndex(){return(
(variables, cells) => {
  let index = 0;
  for (let cellCandidate of cells.values()) {
    if (cellCandidate === variables) {
      return index;
    } else {
      index++;
    }
  }
}
)}

function _lookupCellByIndex(){return(
(index, cells) => {
  let current = 0;
  for (let cellCandidate of cells.values()) {
    if (current === index) {
      return cellCandidate;
    } else {
      current++;
    }
  }
}
)}

function _findVariableIndex(runtime){return(
(variable, variables = runtime._variables) =>
  [...variables].findIndex((vi) => vi === variable)
)}

async function _command_processor(command,$0,compile_and_update,$1,remove_variables,selectedCell,findCellIndex,lookupCellByIndex,findVariableIndex,repositionSetElement,runtime,selectVariable,$2)
{
  if (command.processed) return;

  let result = undefined;
  if (command.command == "createCell") {
    $0.value = true;
    result = compile_and_update("{}");
  } else if (command.command == "focusEditor") {
    $1.querySelector("[contenteditable]").focus();
    result = true;
  } else if (command.command == "deleteCell") {
    remove_variables(selectedCell.variables);
    result = true;
  } else if (command.command == "moveCell") {
    const cellIndex = findCellIndex(
      command.args.cell.variables,
      command.args.cell.module.cells
    );
    const targetCellIndex = cellIndex + command.args.amount;
    const targetCell = lookupCellByIndex(
      targetCellIndex,
      command.args.cell.module.cells
    );
    const currentFirstVariableIndex = findVariableIndex(
      command.args.cell.variables[0]
    );
    const targetFirstVariableIndex = findVariableIndex(targetCell[0]);
    const change = targetFirstVariableIndex - currentFirstVariableIndex;
    console.log(
      "moveCell",
      cellIndex,
      targetCellIndex,
      targetCell,
      currentFirstVariableIndex,
      targetFirstVariableIndex,
      change
    );
    command.args.cell.variables.forEach((v) => {
      const currentIndex = findVariableIndex(v);
      repositionSetElement(runtime._variables, v, currentIndex + change);
    });
    // recompute
    await selectVariable(command.args.cell.variables[0], command.args.cell.dom);
    result = true;
  }
  if (result) {
    command.processed = true;
    $2.resolve(result);
  }
}


function _44(md){return(
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

function _50(md){return(
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


function _editor_jobs(cellListener,command_processor,enable_picking,highlight_picked,editor_manager,submit_summary)
{
  // auto subscribe with forcePeek
  cellListener;
  command_processor;
  enable_picking;
  highlight_picked;
  editor_manager;
  submit_summary;
  return "editor_jobs";
}


function _54(md){return(
md`### Apply Update`
)}

function _compile_and_update(compile,selectedCell,runtime,$0,repositionSetElement){return(
(source, variables = []) => {
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
          (v) => v == $0.value.variables.at(-1)
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
    return variables;
  } catch (e) {
    console.error(e);
    debugger;
  }
}
)}

function _56(md){return(
md`### Remove Cells`
)}

function _remove_variables(){return(
(variables) => {
  variables.forEach((v) => v.delete());
}
)}

function _58(md){return(
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

function _63(Inputs,definition,variable,inputs){return(
Inputs.button("update variable", {
  disabled: definition === variable._definition.toString(),
  reduce: () => {
    let _fn;
    eval("_fn = " + definition);
    variable.define(variable._name, inputs, _fn);
  }
})
)}

function _64(md){return(
md`### Editor Libraries`
)}

function _javascriptPlugin(codemirror){return(
codemirror
)}

function _70(md){return(
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
  main.variable(observer("selectVariable")).define("selectVariable", ["cellMap","modules","_","viewof selectedCell","Event"], _selectVariable);
  main.variable(observer("hashCell")).define("hashCell", ["location","extractNotebookAndCell","URLSearchParams"], _hashCell);
  main.variable(observer("cellListener")).define("cellListener", ["Generators","hash","selectVariable","divToVar","runtime","viewof selectedCell","invalidation"], _cellListener);
  main.variable(observer("viewof selectedCell")).define("viewof selectedCell", ["Inputs"], _selectedCell);
  main.variable(observer("selectedCell")).define("selectedCell", ["Generators", "viewof selectedCell"], (G, _) => G.input(_));
  main.variable(observer("divToVar")).define("divToVar", _divToVar);
  main.variable(observer("hash_selected_cell")).define("hash_selected_cell", ["hash","hashCell"], _hash_selected_cell);
  const child1 = runtime.module(define1);
  main.import("hash", child1);
  const child2 = runtime.module(define2);
  main.import("extractNotebookAndCell", child2);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("context_menu")).define("context_menu", ["htl","viewof editor","invalidation","selectedCell","ResizeObserver"], _context_menu);
  main.variable(observer("viewof editor")).define("viewof editor", ["pull_jobs","view","viewof edit","toolbar","reversibleAttach","combine","viewof moduleSelection","viewof cellSelection","viewof code_editor"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["exporter"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof moduleSelection")).define("viewof moduleSelection", ["selectedCell","Inputs","modules"], _moduleSelection);
  main.variable(observer("moduleSelection")).define("moduleSelection", ["Generators", "viewof moduleSelection"], (G, _) => G.input(_));
  main.variable(observer("viewof cellSelection")).define("viewof cellSelection", ["selectedCell","Inputs"], _cellSelection);
  main.variable(observer("cellSelection")).define("cellSelection", ["Generators", "viewof cellSelection"], (G, _) => G.input(_));
  main.variable(observer("viewof combine")).define("viewof combine", ["Inputs"], _combine);
  main.variable(observer("combine")).define("combine", ["Generators", "viewof combine"], (G, _) => G.input(_));
  main.variable(observer("viewof edit")).define("viewof edit", ["Inputs"], _edit);
  main.variable(observer("edit")).define("edit", ["Generators", "viewof edit"], (G, _) => G.input(_));
  main.variable(observer("toolbar")).define("toolbar", ["view","reversibleAttach","combine","viewof up","viewof down","viewof remove","viewof addCells","viewof apply"], _toolbar);
  main.variable(observer("viewof addCells")).define("viewof addCells", ["Inputs","createCell","selectVariable"], _addCells);
  main.variable(observer("addCells")).define("addCells", ["Generators", "viewof addCells"], (G, _) => G.input(_));
  main.variable(observer("viewof remove")).define("viewof remove", ["Inputs","deleteCell"], _remove);
  main.variable(observer("remove")).define("remove", ["Generators", "viewof remove"], (G, _) => G.input(_));
  main.variable(observer("viewof apply")).define("viewof apply", ["Inputs","compile_and_update","viewof code_editor","selectedCell"], _apply);
  main.variable(observer("apply")).define("apply", ["Generators", "viewof apply"], (G, _) => G.input(_));
  main.variable(observer("viewof up")).define("viewof up", ["Inputs","moveCell","viewof selectedCell"], _up);
  main.variable(observer("up")).define("up", ["Generators", "viewof up"], (G, _) => G.input(_));
  main.variable(observer("viewof down")).define("viewof down", ["Inputs","moveCell","viewof selectedCell"], _down);
  main.variable(observer("down")).define("down", ["Generators", "viewof down"], (G, _) => G.input(_));
  main.variable(observer("module")).define("module", ["selectedCell"], _module);
  main.variable(observer("viewof code_editor")).define("viewof code_editor", ["CodeMirror","codemirror","javascriptPlugin","myDefaultTheme"], _code_editor);
  main.variable(observer("code_editor")).define("code_editor", ["Generators", "viewof code_editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("moveCell")).define("moveCell", ["viewof command"], _moveCell);
  main.variable(observer("createCell")).define("createCell", ["viewof command"], _createCell);
  main.variable(observer("deleteCell")).define("deleteCell", ["viewof command"], _deleteCell);
  main.variable(observer("focusEditor")).define("focusEditor", ["viewof command"], _focusEditor);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("viewof command")).define("viewof command", ["flowQueue"], _command);
  main.variable(observer("command")).define("command", ["Generators", "viewof command"], (G, _) => G.input(_));
  main.variable(observer()).define(["command"], _38);
  main.variable(observer("findCellByVariable")).define("findCellByVariable", _findCellByVariable);
  main.variable(observer("findCellIndex")).define("findCellIndex", _findCellIndex);
  main.variable(observer("lookupCellByIndex")).define("lookupCellByIndex", _lookupCellByIndex);
  main.variable(observer("findVariableIndex")).define("findVariableIndex", ["runtime"], _findVariableIndex);
  main.variable(observer("command_processor")).define("command_processor", ["command","viewof edit","compile_and_update","viewof code_editor","remove_variables","selectedCell","findCellIndex","lookupCellByIndex","findVariableIndex","repositionSetElement","runtime","selectVariable","viewof command"], _command_processor);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("pull_jobs")).define("pull_jobs", ["runtime","invalidation","observe"], _pull_jobs);
  main.variable(observer("editor_manager")).define("editor_manager", ["viewof code_editor","compile_and_update","selectedCell","decompiled","Event"], _editor_manager);
  main.variable(observer("enable_picking")).define("enable_picking", ["invalidation"], _enable_picking);
  main.variable(observer("highlight_picked")).define("highlight_picked", ["selectedCell","isnode","invalidation"], _highlight_picked);
  main.variable(observer("divToCell")).define("divToCell", _divToCell);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("modules")).define("modules", ["forcePeek","runtime","moduleMap","main"], _modules);
  main.variable(observer("decompiled")).define("decompiled", ["selectedCell","decompile"], _decompiled);
  main.variable(observer("editor_jobs")).define("editor_jobs", ["cellListener","command_processor","enable_picking","highlight_picked","editor_manager","submit_summary"], _editor_jobs);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("compile_and_update")).define("compile_and_update", ["compile","selectedCell","runtime","viewof selectedCell","repositionSetElement"], _compile_and_update);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("remove_variables")).define("remove_variables", _remove_variables);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("viewof variable")).define("viewof variable", ["Inputs","selectedCell"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer("name")).define("name", ["variable"], _name);
  main.variable(observer("inputs")).define("inputs", ["variable"], _inputs);
  main.variable(observer("viewof definition")).define("viewof definition", ["Inputs","variable"], _definition);
  main.variable(observer("definition")).define("definition", ["Generators", "viewof definition"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","definition","variable","inputs"], _63);
  main.variable(observer()).define(["md"], _64);
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
  main.variable(observer()).define(["md"], _70);
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
