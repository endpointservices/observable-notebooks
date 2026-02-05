import define1 from "./8efc525b0ffee9ec@205.js";
import define2 from "./98f34e974bb2e4bc@958.js";
import define3 from "./e1c39d41e8e944b0@939.js";
import define4 from "./838e115b5e775566@956.js";
import define5 from "./e3a019069a130d79@6817.js";
import define6 from "./f92778131fd76559@1212.js";
import define7 from "./cdc303fcc82a630f@262.js";
import define8 from "./03dda470c56b93ff@8395.js";
import define9 from "./db42ae70222a8b08@1170.js";
import define10 from "./0e0b35a92c819d94@474.js";

function _title(md){return(
md`# Editor: Reactive Userspace Cell Mutator

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

function _editor($0,pull_jobs,view,reversibleAttach,combine,$1,$2,$3,$4,$5,$6)
{
  console.log("rebuilding editor mutable editor_state", $0.value);
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
    ${["module", reversibleAttach(combine, $1)]}
    <span style="flex-grow: 1;"></span>
  </div>
  <div style="display: flex;">
    ${["cell", reversibleAttach(combine, $2)]}
    <span style="flex-grow: 1;"></span>
    ${["remove_variables", reversibleAttach(combine, $3)]}
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


function _4(md){return(
md`Save edits by exporting to a single file`
)}

function _5(exporter){return(
exporter()
)}

function _todo(md){return(
md`## TODO

- tagged templates
- better syntax highlighter -- highlight syntax errors -- quite a lot of work, started, but see https://observablehq.com/@tomlarkworthy/observablehq-lezer)
- Imports (maybe this is a different concern)`
)}

function _7(md){return(
md`### Known Issues
- If you create a new cell, it is invisible, it will appear after exporting.`
)}

function _8(md){return(
md`### Editor UI Components`
)}

function _combine(Inputs){return(
Inputs.toggle({
  label: "untick to destructure",
  value: true
})
)}

function _refresh(Inputs){return(
Inputs.button("🔄")
)}

function _remove(Inputs,remove_variables,named_cell){return(
Inputs.button("🗑️", {
  reduce: () => {
    remove_variables(named_cell[1]);
  }
})
)}

function _apply(Inputs,compile_and_update,$0,named_cell)
{
  const button = Inputs.button("▶️", {
    reduce: () => {
      compile_and_update($0.value, named_cell);
    }
  });
  // supress gaining focus
  // doesn't work on observable iframe
  // https://issues.chromium.org/issues/40654608
  button.tabIndex = "-1";
  button.onmousedown = (e) => e.preventDefault();
  return button;
}


function _moduleOptions(main,modules){return(
[{ name: "main", module: main }, ...modules.values()]
)}

function _module(moduleOptions,$0,Inputs)
{
  const prior =
    moduleOptions.find((o) => o.name == $0.value.last_module) ||
    moduleOptions[0];
  const select = Inputs.select(moduleOptions, {
    //label: "module",
    value: prior,
    format: (info) => info.name
  });

  return select;
}


function _named_cell(cells,$0,$1,Event,divToCell,module,$2,moduleOptions,invalidation,Inputs,refresh)
{
  cells.set("<new cell>", []);
  const entries = [...cells.entries()];
  const prior =
    $0.value.last_cell &&
    entries.find((cell) => cell[1][0] === $0.value.last_cell[1][0]);

  // Also allow clicking to select cell
  const clickHandler = (evt) => {
    if (document.body.classList.contains("picking") && evt.isTrusted) {
      const div = evt.target.closest(".observablehq");
      $1.value = div;
      $1.dispatchEvent(new Event("input"));

      const entry = divToCell(entries, div);

      if (entry && entry._module) {
        if (entry._module !== module.module) {
          $2.value = moduleOptions.find(
            (m) => m.module == entry._module
          );
          $2.dispatchEvent(new Event("input"));
        }
      } else {
        select.value = entry;
        select.dispatchEvent(new Event("input"));
      }
    }
  };
  document.body.addEventListener("click", clickHandler);
  invalidation.then(() =>
    document.body.removeEventListener("click", clickHandler)
  );

  const select = Inputs.select(entries, {
    //label: "cell",
    value: prior,
    nonce: refresh,
    format: (v) => v[0]
  });
  return select;
}


function _code_editor(CodeMirror,codemirror,javascriptPlugin,myDefaultTheme,invalidation,preserveFocus)
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
  invalidation.then(preserveFocus(editor));
  return editor;
}


function _log(Inputs){return(
Inputs.textarea({
  rows: 2,
  resize: false
})
)}

function _18(md){return(
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

function _command(flowQueue){return(
flowQueue()
)}

function _23(command){return(
command
)}

function _command_processor(command,compile_and_update,$0,remove_variables,named_cell,$1)
{
  if (command.processed) return;

  let result = undefined;
  if (command.command == "createCell") {
    result = compile_and_update("{}", ["<new cell>", []]);
  } else if (command.command == "focusEditor") {
    $0.querySelector("[contenteditable]").focus();
    result = true;
  } else if (command.command == "deleteCell") {
    remove_variables(named_cell[1]);
    result = true;
  }
  if (result) {
    command.processed = true;
    $1.resolve(result);
  }
}


function _25(md){return(
md`### UI State`
)}

async function _cells(refresh,Inputs,cellMap,module)
{
  refresh;
  return Inputs.input(await cellMap(module.module));
}


function _editor_state(){return(
{
  last_cell: undefined
}
)}

function _last_selected_variable(named_cell,$0)
{
  if (named_cell && named_cell[0] !== "<new cell>") {
    $0.value.last_selected_variable = named_cell;
    console.log("last_selected_variable editor_state", $0.value);
  }
  return $0.value.last_selected_variable;
}


function _picked_dom(Inputs){return(
Inputs.input(null)
)}

function _30(md){return(
md`### UI Action`
)}

function _pull_jobs(runtime,invalidation,observe)
{
  const jobs = [...runtime._variables].find((v) => v._name == "editor_jobs");
  invalidation.then(observe(jobs._module, jobs._name, {}));
}


function _editor_manager($0,compile_and_update,named_cell,decompiled,Event)
{
  $0.apply = (view) => {
    const doc = view.state.doc.toString();
    compile_and_update(doc, named_cell);
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


function _highlight_picked(named_cell,isnode,invalidation)
{
  if (!named_cell || !named_cell[1][0]) return;
  const dom = isnode(named_cell[1][0]._value)
    ? named_cell[1][0]._value
    : named_cell[1][0]._observer._node;
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

function _36(md){return(
md`### Decompiler`
)}

function _modules(refresh,forcePeek,runtime,moduleMap)
{
  refresh;
  forcePeek([...runtime._variables].find((v) => v._name == "submit_summary"));
  return moduleMap(runtime);
}


function _decompiled(named_cell,decompile)
{
  if (named_cell[1].length == 0) return "";
  return decompile(named_cell[1]);
}


function _editor_jobs(command_processor,enable_picking,highlight_picked,editor_manager,submit_summary,last_selected_variable)
{
  // auto subscribe with forcePeek
  command_processor;
  enable_picking;
  highlight_picked;
  editor_manager;
  submit_summary;
  last_selected_variable;
  return "editor_jobs";
}


function _40(md){return(
md`### Apply Update`
)}

function _compile_and_update($0,compile,main,runtime,$1,repositionSetElement,module,$2,Event){return(
(source, named_cell) => {
  $0.value = "";
  const cell = named_cell[1];
  try {
    let reposition = false,
      insertionIndex = -1;
    const newVariables = compile(source);
    if (!cell || cell.length !== newVariables.length) {
      reposition = true;
      cell.forEach((v) => v.delete());
      for (let i = 0; i < newVariables.length; i++) {
        const newVariable = main.variable({});
        cell.push(newVariable);
      }
    }
    if (reposition) {
      insertionIndex =
        [...runtime._variables].findIndex(
          (v) => v == $1.value.last_selected_variable[1].at(-1)
        ) + 1;
    }
    newVariables.forEach((v, i) => {
      const variable = cell[i];
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
    $1.value.last_cell = named_cell;
    $1.value.last_module = module.name;

    console.log("compile_and_update: mutable editor_state", $1.value);
    $2.dispatchEvent(new Event("input"));
    return named_cell;
  } catch (e) {
    $0.value = e.toString();
    debugger;
  }
}
)}

function _42(md){return(
md`### Remove Cells`
)}

function _remove_variables($0,Event){return(
(variables) => {
  variables.forEach((v) => v.delete());
  $0.dispatchEvent(new Event("input"));
}
)}

function _44(md){return(
md`### Runtime Representation`
)}

function _variable(Inputs,named_cell){return(
Inputs.radio(named_cell[1], {
  label: "variable in cell group",
  format: (v) => v._name,
  value: named_cell[1][0]
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

function _49(Inputs,definition,variable,inputs){return(
Inputs.button("update definition", {
  disabled: definition === variable._definition.toString(),
  reduce: () => {
    let _fn;
    eval("_fn = " + definition);
    variable.define(variable._name, inputs, _fn);
  }
})
)}

function _50(md){return(
md`### Editor Libraries`
)}

function _javascriptPlugin(codemirror){return(
codemirror
)}

function _56(md){return(
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
  const child1 = runtime.module(define1);
  main.import("trackParent", child1);
  main.import("preserveFocus", child1);
  main.variable(observer("viewof editor")).define("viewof editor", ["mutable editor_state","pull_jobs","view","reversibleAttach","combine","viewof module","viewof named_cell","viewof remove","viewof apply","viewof code_editor","viewof log"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["exporter"], _5);
  main.variable(observer("todo")).define("todo", ["md"], _todo);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof combine")).define("viewof combine", ["Inputs"], _combine);
  main.variable(observer("combine")).define("combine", ["Generators", "viewof combine"], (G, _) => G.input(_));
  main.variable(observer("viewof refresh")).define("viewof refresh", ["Inputs"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer("viewof remove")).define("viewof remove", ["Inputs","remove_variables","named_cell"], _remove);
  main.variable(observer("remove")).define("remove", ["Generators", "viewof remove"], (G, _) => G.input(_));
  main.variable(observer("viewof apply")).define("viewof apply", ["Inputs","compile_and_update","viewof code_editor","named_cell"], _apply);
  main.variable(observer("apply")).define("apply", ["Generators", "viewof apply"], (G, _) => G.input(_));
  main.variable(observer("moduleOptions")).define("moduleOptions", ["main","modules"], _moduleOptions);
  main.variable(observer("viewof module")).define("viewof module", ["moduleOptions","mutable editor_state","Inputs"], _module);
  main.variable(observer("module")).define("module", ["Generators", "viewof module"], (G, _) => G.input(_));
  main.variable(observer("viewof named_cell")).define("viewof named_cell", ["cells","mutable editor_state","viewof picked_dom","Event","divToCell","module","viewof module","moduleOptions","invalidation","Inputs","refresh"], _named_cell);
  main.variable(observer("named_cell")).define("named_cell", ["Generators", "viewof named_cell"], (G, _) => G.input(_));
  main.variable(observer("viewof code_editor")).define("viewof code_editor", ["CodeMirror","codemirror","javascriptPlugin","myDefaultTheme","invalidation","preserveFocus"], _code_editor);
  main.variable(observer("code_editor")).define("code_editor", ["Generators", "viewof code_editor"], (G, _) => G.input(_));
  main.variable(observer("viewof log")).define("viewof log", ["Inputs"], _log);
  main.variable(observer("log")).define("log", ["Generators", "viewof log"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("createCell")).define("createCell", ["viewof command"], _createCell);
  main.variable(observer("deleteCell")).define("deleteCell", ["viewof command"], _deleteCell);
  main.variable(observer("focusEditor")).define("focusEditor", ["viewof command"], _focusEditor);
  main.variable(observer("viewof command")).define("viewof command", ["flowQueue"], _command);
  main.variable(observer("command")).define("command", ["Generators", "viewof command"], (G, _) => G.input(_));
  main.variable(observer()).define(["command"], _23);
  main.variable(observer("command_processor")).define("command_processor", ["command","compile_and_update","viewof code_editor","remove_variables","named_cell","viewof command"], _command_processor);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("viewof cells")).define("viewof cells", ["refresh","Inputs","cellMap","module"], _cells);
  main.variable(observer("cells")).define("cells", ["Generators", "viewof cells"], (G, _) => G.input(_));
  main.define("initial editor_state", _editor_state);
  main.variable(observer("mutable editor_state")).define("mutable editor_state", ["Mutable", "initial editor_state"], (M, _) => new M(_));
  main.variable(observer("editor_state")).define("editor_state", ["mutable editor_state"], _ => _.generator);
  main.variable(observer("last_selected_variable")).define("last_selected_variable", ["named_cell","mutable editor_state"], _last_selected_variable);
  main.variable(observer("viewof picked_dom")).define("viewof picked_dom", ["Inputs"], _picked_dom);
  main.variable(observer("picked_dom")).define("picked_dom", ["Generators", "viewof picked_dom"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("pull_jobs")).define("pull_jobs", ["runtime","invalidation","observe"], _pull_jobs);
  main.variable(observer("editor_manager")).define("editor_manager", ["viewof code_editor","compile_and_update","named_cell","decompiled","Event"], _editor_manager);
  main.variable(observer("enable_picking")).define("enable_picking", ["invalidation"], _enable_picking);
  main.variable(observer("highlight_picked")).define("highlight_picked", ["named_cell","isnode","invalidation"], _highlight_picked);
  main.variable(observer("divToCell")).define("divToCell", _divToCell);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("modules")).define("modules", ["refresh","forcePeek","runtime","moduleMap"], _modules);
  main.variable(observer("decompiled")).define("decompiled", ["named_cell","decompile"], _decompiled);
  main.variable(observer("editor_jobs")).define("editor_jobs", ["command_processor","enable_picking","highlight_picked","editor_manager","submit_summary","last_selected_variable"], _editor_jobs);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("compile_and_update")).define("compile_and_update", ["viewof log","compile","main","runtime","mutable editor_state","repositionSetElement","module","viewof refresh","Event"], _compile_and_update);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("remove_variables")).define("remove_variables", ["viewof refresh","Event"], _remove_variables);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("viewof variable")).define("viewof variable", ["Inputs","named_cell"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer("name")).define("name", ["variable"], _name);
  main.variable(observer("inputs")).define("inputs", ["variable"], _inputs);
  main.variable(observer("viewof definition")).define("viewof definition", ["Inputs","variable"], _definition);
  main.variable(observer("definition")).define("definition", ["Generators", "viewof definition"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","definition","variable","inputs"], _49);
  main.variable(observer()).define(["md"], _50);
  const child2 = runtime.module(define2);
  main.import("toObject", child2);
  main.import("isnode", child2);
  main.import("repositionSetElement", child2);
  const child3 = runtime.module(define3);
  main.import("runtime", child3);
  main.import("main", child3);
  const child4 = runtime.module(define4);
  main.import("CodeMirror", child4);
  main.import("codemirror", child4);
  main.import("myDefaultTheme", child4);
  const child5 = runtime.module(define5);
  main.import("decompile", child5);
  main.import("compile", child5);
  main.import("cellMap", child5);
  main.import("sourceModule", child5);
  main.import("findModuleName", child5);
  main.import("parser", child5);
  main.variable(observer("javascriptPlugin")).define("javascriptPlugin", ["codemirror"], _javascriptPlugin);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  const child6 = runtime.module(define6);
  main.import("view", child6);
  const child7 = runtime.module(define7);
  main.import("reversibleAttach", child7);
  const child8 = runtime.module(define8);
  main.import("exporter", child8);
  const child9 = runtime.module(define9);
  main.import("moduleMap", child9);
  main.import("submit_summary", child9);
  main.import("forcePeek", child9);
  main.import("observe", child9);
  const child10 = runtime.module(define10);
  main.import("flowQueue", child10);
  return main;
}
