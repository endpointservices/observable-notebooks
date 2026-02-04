import define1 from "./f6282eaf525a00db@2418.js";
import define2 from "./c49519b3eb941810@1436.js";
import define3 from "./09fdee029150048c@446.js";
import define4 from "./98f34e974bb2e4bc@958.js";
import define5 from "./e4cdd35ce867f8af@1001.js";
import define6 from "./e3a019069a130d79@6817.js";
import define7 from "./cdc303fcc82a630f@262.js";
import define8 from "./10c7899865f8a76e@8998.js";
import define9 from "./db42ae70222a8b08@1170.js";
import define10 from "./0e0b35a92c819d94@474.js";
import define11 from "./a89ea9f0ad8c6226@1486.js";
import define12 from "./57d79353bac56631@44.js";
import define13 from "./a6a56ee61aba9799@409.js";
import define14 from "./5845e1ca935fea5a@226.js";
import define15 from "./f109935193c0deba@4551.js";
import define16 from "./f6794ed0523241c3@1824.js";

function _title(md){return(
md`# Editor: Reactive Userspace Cell Mutator (v5)

[YouTube explainer](https://www.youtube.com/shorts/6FjeJRBC2iw)

A cell that edits the source of other cells. It is implemented in userspace as a normal cell, so it follows exported notebooks, so exported notebooks become editable! It pairs particularly well with the [single file export](https://observablehq.com/@tomlarkworthy/exporter-2), because edits are also exported, so you can permanently save your works in a format that continues to be editable and exportable indefinitely. It works offline too!


The editor is able to edit _any_ cell in the runtime, including those in dependancies. Import \`auto_attach\` and run that cell.

\`\`\`js
import {auto_attach} from '@tomlarkworthy/editor-5'
\`\`\`


#### Use cases
- Edit notebooks offline
- Try things out without committing to them
- Improved debugging workflow, as you can insert \`debugger\` expressions to dependancies on-demand.
`
)}

function _2(md){return(
md`## Example`
)}

function _title_variable(lookupVariable,editorModule){return(
lookupVariable("title", editorModule)
)}

function _4(cellEditor,title_variable){return(
cellEditor(title_variable)
)}

function _5(md){return(
md`## TODO
- open new cell edtior
- SyntaxErrors (see Runtime, they are cells)
- Rename cell
  - UI variable name does not update
- Load cell from hash, will need the main module named properly in moduleMap
- better syntax highlighter -- highlight syntax errors -- quite a lot of work, started, but see https://observablehq.com/@tomlarkworthy/observablehq-lezer)
- Import node support (maybe this is a different concern)`
)}

function _6(md){return(
md`## Sync editors`
)}

function _editors(){return(
new Map()
)}

function _auto_attach(keepalive,editorModule,syncers,attachContextManu,divToVar,runtime,TRACE_CELL,editors,cellEditor)
{
  keepalive(editorModule, "editor_jobs");
  syncers;

  const placed = new Set();

  if (attachContextManu) {
    document.querySelectorAll(".observablehq").forEach((div) => {
      const variable = divToVar(runtime, div);
      if (!variable) return;
      if (variable._name == TRACE_CELL) debugger;

      if (!editors.has(variable)) {
        editors.set(variable, cellEditor(variable));
      }

      const editor = editors.get(variable);
      const next = div.nextSibling;
      if (next !== editor) {
        const ae = document.activeElement;
        const hadFocus = ae && editor.contains(ae);

        let restore = null;
        if (hadFocus) {
          const fe = ae;
          if (
            fe &&
            (fe.tagName === "INPUT" || fe.tagName === "TEXTAREA") &&
            "selectionStart" in fe
          ) {
            const start = fe.selectionStart,
              end = fe.selectionEnd;
            restore = () => {
              fe.focus({ preventScroll: true });
              fe.setSelectionRange(start, end);
            };
          } else {
            restore = () => fe?.focus?.({ preventScroll: true });
          }
        }

        div.after(editor);
        restore?.();
      }

      placed.add(variable);
    });
  }

  [...editors.entries()].forEach(([variable, editor]) => {
    if (!placed.has(variable)) {
      editor.dispose?.();
      editor.remove();
      editors.delete(variable);
    }
  });
}


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

function _attachContextManu(Inputs,isOnObservableCom){return(
Inputs.toggle({
  label: "attach menu",
  value: !isOnObservableCom()
})
)}

function _12(md){return(
md`## \`cellEditor\` component

Using Dataflow templating to create reusable Hotbar Component builder`
)}

function _hotbarTemplate(lookupVariable,editorModule){return(
lookupVariable(
  [
    ...[
      "editedCell",
      "edit",
      "select",
      "up",
      "down",
      "remove",
      "apply",
      "addCells",
      "copy",
      "paste"
    ].flatMap((name) => ["viewof " + name, name]),
    "code_editor",
    "hotbar",
    "code_editor_view",
    "editor_manager",
    "toolbar",
    "selectVariable",
    "compile_and_update",
    "decompiled",
    "editor_refresh_from_runtime"
  ],
  editorModule
)
)}

function _cellEditor(cloneDataflow,editorTemplate,shellTemplate,getOption,Event,setOption){return(
(variable, options) => {
  const host = document.createElement("div");

  let shellDispose = null;
  let heavyDispose = null;

  let editView = null;
  let shellEl = null;
  let body = null;

  const clearBody = () => {
    if (body) body.replaceChildren();
  };

  const closeHeavy = () => {
    if (heavyDispose) {
      heavyDispose();
      heavyDispose = null;
    }
    clearBody();
  };

  const openHeavy = () => {
    if (heavyDispose) return;
    if (!body) return;

    heavyDispose = cloneDataflow(editorTemplate, (name) => {
      if (name === "editor_panel") {
        return {
          fulfilled: (element) => {
            if (!body) return;
            if (body.firstChild !== element || body.childNodes.length !== 1) {
              body.replaceChildren(element);
            }
          }
        };
      }
      if (name === "selectVariable") {
        return { fulfilled: (selectVariable) => selectVariable(variable) };
      }
      return {};
    });
  };

  const syncOpen = () => {
    const open = !!(editView && editView.value);
    if (open) openHeavy();
    else closeHeavy();

    if (shellEl) {
      const bodyEl = shellEl.querySelector(".cell-editor-body");
      if (bodyEl) bodyEl.style.display = open ? "block" : "none";
    }
  };

  shellDispose = cloneDataflow(shellTemplate, (name) => {
    if (name === "hotbar_shell") {
      return {
        fulfilled: (element) => {
          shellEl = element;
          host.replaceChildren(element);
          body = element.querySelector(".cell-editor-body");

          if (body) syncOpen();
        }
      };
    }

    if (name === "selectVariable") {
      return { fulfilled: (selectVariable) => selectVariable(variable) };
    }

    if (name === "viewof edit") {
      return {
        fulfilled: (view) => {
          editView = view;

          const pinned = !!getOption(variable, "pinned", false);
          view.value = pinned;
          view.dispatchEvent(new Event("input"));

          syncOpen();

          view.addEventListener("input", () => {
            const next = !!view.value;
            setOption(variable, "pinned", next);
            syncOpen();
          });
        }
      };
    }

    return {};
  });

  host.dispose = () => {
    closeHeavy();
    if (shellDispose) {
      shellDispose();
      shellDispose = null;
    }
  };

  return host;
}
)}

function _hotbar_shell($0,Event,htl,edit)
{
  const toggle = () => {
    $0.value = !$0.value;
    $0.dispatchEvent(new Event("input"));
  };

  const el = htl.html`<div class="cell-editor"
    style="display: flex;
           flex-direction: column;
           background: var(--theme-background-alt);">
    <style>
      .cell-editor .cm-editor {
        height: fit-content;
        background-color: var(--theme-background);
      }
      .cell-editor .hotbar {
        margin-left: auto;
        text-align: right;
        font-family: var(--monospace);
        font-size: 12px;
        height: 17px;
        outline: 1px solid var(--theme-background-alt);
        user-select: none;
      }
    </style>

    <div style="width:100%; cursor: pointer;" onclick=${toggle}>
      <div class="hotbar">${edit ? "close" : "edit"}</div>
    </div>

    <div class="cell-editor-body" style="display: ${
      edit ? "block" : "none"
    };"></div>
  </div>`;

  el.addEventListener("click", (evt) => evt.stopPropagation());
  return el;
}


function _editor_panel($0,htl,toolbar,nav,reversibleAttach,combine,code_editor)
{
  const cell = $0.value;
  return htl.html`<div style="display: flex; flex-direction: column;">
    ${toolbar}
    ${cell ? nav(cell) : null}
    <div style="flex-grow: 1; padding-bottom: 1rem;">
      ${reversibleAttach(combine, code_editor)}
    </div>
  </div>`;
}


function _shellTemplate(lookupVariable,editorModule){return(
lookupVariable(
  [
    "editedCell",
    "viewof editedCell",
    "selectVariable",
    "viewof edit",
    "edit",
    "hotbar_shell"
  ],
  editorModule
)
)}

function _editorTemplate(lookupVariable,editorModule){return(
lookupVariable(
  [
    "editedCell",
    "viewof editedCell",
    "selectVariable",

    "viewof select",
    "viewof up",
    "viewof down",
    "viewof remove",
    "viewof addCells",
    "viewof apply",
    "viewof copy",
    "viewof paste",
    "toolbar",

    "nav",
    "cellLinks",
    "variableLink",

    "decompiled",
    "code_editor_view",
    "code_editor",
    "editor_manager",
    "editor_refresh_from_runtime",

    "editor_panel"
  ],
  editorModule
)
)}

function _20(md){return(
md`## Hotbar Prototype`
)}

function _editedCell(Inputs){return(
Inputs.input(null)
)}

function _findCell($0,modules){return(
(variable, dom = undefined) => {
  if (variable) {
    const cells = $0.value.get(variable._module) || [];
    let cell = cells.find((cell) => cell.variables.includes(variable));
    if (!cell) {
      console.warn("Could not find cell for ", variable);
      return;
    }
    cell = {
      dom,
      name: cell.name,
      module: {
        cells: cells,
        ...modules.get(variable._module)
      },
      variables: cell.variables
    };
    return cell;
  }
}
)}

function _selectVariable(findCell,_,$0,Event){return(
async function selectVariable(variable, dom = undefined) {
  console.log("selectVariable", variable);
  let cell = findCell(variable, dom);
  if (!_.isEqual($0.value, cell)) {
    $0.value = cell;
    $0.dispatchEvent(new Event("input"));
  } else {
    $0.value = cell;
  }
  return cell;
}
)}

function _24(selectVariable,hotbarTemplate)
{
  debugger;
  return selectVariable(hotbarTemplate[5]);
}


function _hotbar($0,Event,setOption,$1,htl,edit,toolbar,nav,reversibleAttach,combine,code_editor)
{
  console.log("hotbar start");
  const toggle = () => {
    $0.value = !$0.value;
    $0.dispatchEvent(new Event("input"));
    setOption(
      $1.value.variables[0],
      "pinned",
      $0.value
    );
  };

  const combined = htl.html`<div class="cell-editor" 
    style="display: flex;
           flex-direction: column;
           background: var(--theme-background-alt);">
  <style>
    .picked {
      outline: 1px dashed #999;
    }
    .cm-editor {
      height: fit-content;
      background-color: var(--theme-background);
    }
    .hotbar {
      margin-left: auto;
      text-align: right;
      font-family: var(--monospace);
      font-size: 12px;
      height: 17px;
      outline: 1px solid var(--theme-background-alt);
    }
  </style>
  <div style="width:100%; cursor: pointer;" onclick=${toggle}>
    <div class="hotbar">
      ${edit ? "close" : "edit"}
    </div>
  </div>
  <div style="display: ${edit ? "block" : "none"};">
    ${toolbar}
    ${nav($1.value)}
    <div style="flex-grow: 1; padding-bottom: 1rem;">
      ${reversibleAttach(combine, code_editor)}
    </div>
  </div>
    
</div>`;

  combined.addEventListener("mouseup", (event) => {});
  combined.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });

  console.log("hotbar stop");
  return combined;
}


function _26($0){return(
$0.value
)}

function _27(nav,editedCell){return(
nav(editedCell)
)}

function _nav(html,cellLinks){return(
function nav(editedCell) {
  const outputs = [...editedCell.variables[0]._outputs];
  const inputs = editedCell.variables[0]._inputs;
  return html`<div>
<span>${cellLinks("inputs", inputs)}</span>
<span>${cellLinks("outputs", outputs)}</span>
</div>`;
}
)}

function _cellLinks(html,variableLink){return(
function cellLinks(label, variables) {
  if (variables.length == 0) return [];
  return html`${label}: ${variables.map(
    (v, index) =>
      html`${index > 0 ? ", " : ""}<a href="${variableLink(v)}">${
        v._name || "anon"
      }</a>`
  )} `;
}
)}

function _variableLink(linkTo,modules){return(
(v) => {
  return linkTo(
    `${modules.get(v._module).name}${
      typeof v._name == "string" ? `#${v._name}` : ""
    }`
  );
}
)}

function _31(md){return(
md`Save edits by exporting to a single file`
)}

function _32(exporter){return(
exporter()
)}

function _33(md){return(
md`### Known Issues
- If you create a new cell, it is invisible, it will appear after exporting.`
)}

function _34(md){return(
md`### Editor UI Components`
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

function _toolbar(htl,reversibleAttach,combine,$0,$1,$2,$3,$4,$5,$6,$7){return(
htl.html`<div
    class="toolbar"
    style="display: flex; gap: 4px;"
>
    <style>
      .toolbar form { width: auto; }
      .toolbar label { user-select: none; }
    </style>
    ${reversibleAttach(combine, $0)}
    ${reversibleAttach(combine, $1)}
    ${reversibleAttach(combine, $2)}
    ${reversibleAttach(combine, $3)}
    ${reversibleAttach(combine, $4)}
    ${reversibleAttach(combine, $5)}
    ${reversibleAttach(combine, $6)}
    ${reversibleAttach(combine, $7)}
    <span style="flex-grow: 1;"></span>
</div>`
)}

function _addCells(Inputs,createCell,$0){return(
Inputs.button("➕", {
  reduce: async () => {
    await createCell({ cell: $0.value });
  }
})
)}

function _remove(Inputs,deleteCell,$0){return(
Inputs.button("🗑️", {
  reduce: () => deleteCell({ cell: $0.value })
})
)}

function _apply(Inputs,compile_and_update,states,editedCell)
{
  const button = Inputs.button("▶️", {
    reduce: () => {
      compile_and_update(
        states.get(editedCell.variables[0]).doc.toString(),
        editedCell.variables,
        editedCell
      );
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

function _paste(Inputs,readObservableClipboardCells,pasteObservableCellsIntoModule,editedCell){return(
Inputs.button("📋", {
  reduce: async () => {
    const cells = await readObservableClipboardCells();
    return pasteObservableCellsIntoModule({ cells, editedCell });
  }
})
)}

function _down(Inputs,moveCell,$0){return(
Inputs.button("⬇", {
  reduce: () => moveCell($0.value, 1)
})
)}

function _copy(Inputs,html,$0,decompile,$1,getOption,cellsToClipboard){return(
Inputs.button(
  html`<span style="font-size: .875em; margin-right: .125em; position: relative; top: -.25em; left: -.125em">
  📄<span style="position: absolute; top: .25em; left: .25em">📄</span>
</span>`,
  {
    reduce: async () => {
      const current = $0.value;
      if (!current?.variables?.length) return;

      const seen = new Set();
      const cells = [];

      const add = async (variables) => {
        const key = variables?.[0];
        if (!key || seen.has(key)) return;
        seen.add(key);
        cells.push(await decompile(variables));
      };

      await add(current.variables);

      const live = $1.value;
      if (live?.entries) {
        for (const [, moduleCells] of live.entries()) {
          for (const c of moduleCells || []) {
            const v0 = c?.variables?.[0];
            if (!v0) continue;
            if (v0 === current.variables[0]) continue;
            if (getOption(v0, "selected", false)) {
              await add(c.variables);
            }
          }
        }
      }

      await cellsToClipboard(cells);
    }
  }
)
)}

function _module(editedCell){return(
editedCell.module.module
)}

function _code_editor_view(EditorView)
{
  console.log("code_editor_view");
  return new EditorView();
}


function _code_editor(code_editor_view)
{
  console.log("code_editor");
  code_editor_view.dom.addEventListener("click", (evt) => {
    evt.stopPropagation();
  });
  return code_editor_view.dom;
}


function _48(md){return(
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
async ({cell, source = "{}" } = {}) =>
  $0.send({
    command: "createCell",
    args: {
      source,
      cell
    }
  })
)}

function _deleteCell($0){return(
async ({cell}) =>
  $0.send({
    command: "deleteCell",
    args: {
      cell
    }
  })
)}

function _52(md){return(
md`## API handler`
)}

function _command(flowQueue){return(
flowQueue()
)}

function _54(command){return(
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
    if (cellCandidate.variables[0] === variables[0]) {
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

async function _command_processor(command,$0,compile_and_update,remove_variables,findCellIndex,$1,lookupCellByIndex,findVariableIndex,repositionSetElement,runtime,selectVariable,$2)
{
  if (command.processed) return;

  let result = undefined;
  if (command.command == "createCell") {
    $0.value = true;
    result = compile_and_update("{}", [], command.args.cell);
    // For the new one to get focus
    // setTimeout(() => {
    //   debugger;
    //   setOption(result[0], "pinned", true);
    // }, 100);
  } else if (command.command == "deleteCell") {
    remove_variables(command.args.cell.variables);
    result = true;
  } else if (command.command == "moveCell") {
    const cellIndex = findCellIndex(
      command.args.cell.variables,
      $1.value.get(command.args.cell.module.module)
    );
    const targetCellIndex = cellIndex + command.args.amount;
    const targetCell = lookupCellByIndex(
      targetCellIndex,
      $1.value.get(command.args.cell.module.module)
    );
    const currentFirstVariableIndex = findVariableIndex(
      command.args.cell.variables[0]
    );
    const targetFirstVariableIndex = findVariableIndex(targetCell.variables[0]);
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


function _60(md){return(
md`### UI Action`
)}

function _states(){return(
new Map()
)}

function _cellIdFacet(codemirror){return(
codemirror.Facet.define({ combine: (v) => v[0] })
)}

function _editor_manager(editedCell,EditorState,decompiled,cellIdFacet,EditorView,states,codemirror,compile_and_update,code_editor_view,javascriptPlugin,myDefaultTheme)
{
  console.log("editor_manager start");
  const key = editedCell.variables[0];
  const state = EditorState.create({
    doc: decompiled,
    extensions: [
      cellIdFacet.of(key),
      EditorView.updateListener.of((update) => {
        const key = update.state.facet(cellIdFacet);
        states.set(key, update.state);
      }),
      codemirror.keymap.of([
        codemirror.indentWithTab,
        {
          key: "Shift-Enter",
          run: (view) => {
            compile_and_update(
              code_editor_view.state.doc.toString(),
              editedCell.variables,
              editedCell
            );
            return true;
          }
        }
      ]),
      codemirror.EditorView.lineWrapping,
      javascriptPlugin.javascript(),
      codemirror.basicSetup,
      myDefaultTheme
    ]
  });

  code_editor_view.setState(state);
  states.set(key, state);
  console.log("editor_manager stop");
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

function _65(md){return(
md`## Reacting to runtime changes

Other editors might change the definition underfoot, so we need to reload the code mirror state`
)}

function _editor_refresh_from_runtime(editedCell,decompile,code_editor_view,replaceCodeMirrorDoc,queueMicrotask,onCodeChange,invalidation)
{
  const lastSyncedByKey = this?.lastSyncedByKey ?? new WeakMap();
  const staleByKey = this?.staleByKey ?? new WeakMap();
  let scheduled = false;

  const getKey = () => editedCell?.variables?.[0] ?? null;

  const syncNow = async ({ force = false } = {}) => {
    const cell = editedCell;
    if (!cell?.variables?.length) return false;

    const key = getKey();
    if (!key) return false;

    const runtimeSource = await decompile(cell.variables);
    const editorSource = code_editor_view?.state?.doc?.toString?.() ?? "";

    if (runtimeSource === editorSource) {
      lastSyncedByKey.set(key, runtimeSource);
      staleByKey.set(key, false);
      return false;
    }

    const last = lastSyncedByKey.get(key);
    const isDirty = typeof last === "string" && editorSource !== last;

    if (!force && isDirty) {
      staleByKey.set(key, true);
      return false;
    }

    const changed = replaceCodeMirrorDoc(code_editor_view, runtimeSource, {
      preserveCursor: true
    });
    if (changed) {
      lastSyncedByKey.set(key, runtimeSource);
      staleByKey.set(key, false);
    }
    return changed;
  };

  const scheduleSync = ({ force = false } = {}) => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(async () => {
      scheduled = false;
      try {
        await syncNow({ force });
      } catch {}
    });
  };

  const unsubscribe = onCodeChange(({ variable }) => {
    const cell = editedCell;
    if (!cell?.variables?.length) return;
    if (!variable) return;
    if (!cell.variables.includes(variable)) return;
    scheduleSync({ force: false });
  });

  scheduleSync({ force: true });
  invalidation.then(() => unsubscribe());

  return {
    lastSyncedByKey,
    staleByKey,
    syncNow,
    scheduleSync,
    get stale() {
      const k = getKey();
      return k ? !!staleByKey.get(k) : false;
    }
  };
}


function _replaceCodeMirrorDoc(){return(
(view, nextText, {preserveCursor = true} = {}) => {
  if (!view?.state) return false;
  const prev = view.state.doc.toString();
  const next = String(nextText ?? "");
  if (prev === next) return false;

  const head = view.state.selection?.main?.head ?? 0;
  const anchor = view.state.selection?.main?.anchor ?? head;
  const nextPos = (p) => Math.max(0, Math.min(p, next.length));

  view.dispatch({
    changes: {from: 0, to: view.state.doc.length, insert: next},
    ...(preserveCursor
      ? {selection: {anchor: nextPos(anchor), head: nextPos(head)}}
      : null)
  });

  return true;
}
)}

function _68(md){return(
md`### Selection`
)}

function _select(editedCell,Inputs,getOption,setOption){return(
(() => {
  const v0 = editedCell?.variables?.[0] ?? null;
  const el = Inputs.toggle({
    value: v0 ? getOption(v0, "selected", false) : false
  });

  el.style.margin = "0";

  el.addEventListener("input", () => {
    const v = editedCell?.variables?.[0] ?? null;
    if (!v) return;
    setOption(v, "selected", el.value);
  });

  return el;
})()
)}

function _70(md){return(
md`## Pinning`
)}

function _72(FileAttachment){return(
FileAttachment("cell_options.json")
)}

function _optionsFile(getFileAttachment,editorModule){return(
getFileAttachment("cell_options.json", editorModule)
)}

async function _options(Inputs,optionsFile){return(
Inputs.input(await optionsFile.json())
)}

function _setOption(findCell,_,$0,Event){return(
(variable, option, value) => {
  const cell = findCell(variable);
  _.set(
    $0.value,
    `${cell.module.name}.${cell.name}.${option}`,
    value
  );
  $0.dispatchEvent(new Event("input"));
}
)}

function _getOption(findCell,_,$0){return(
(variable, option, defaultValue) => {
  const cell = findCell(variable);
  return (
    _.get($0.value, `${cell.module.name}.${cell.name}.${option}`) ||
    defaultValue
  );
}
)}

function _save_options(setFileAttachment,jsonFileAttachment,options,editorModule){return(
setFileAttachment(
  jsonFileAttachment("cell_options.json", options),
  editorModule
)
)}

function _78(md){return(
md`## Pasting`
)}

function _escapeTemplateLiteral(){return(
(s = "") =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
)}

function _inferCellGroupNameFromOJS(parser){return(
(source) => {
  let cell;
  try {
    cell = parser.parseCell(String(source ?? ""));
  } catch {
    return null;
  }
  if (!cell) return null;

  if (cell.id) {
    if (cell.id.type === "Identifier") return cell.id.name;
    if (cell.id.type === "ViewExpression") return `viewof ${cell.id.id.name}`;
    if (cell.id.type === "MutableExpression") return `mutable ${cell.id.id.name}`;
  }

  if (cell.body?.type === "ImportDeclaration") {
    const mod = cell.body.source?.value;
    if (typeof mod === "string" && mod.length) return `module ${mod}`;
  }

  return null;
}
)}

function _normalizeObservableClipboardCell(inferCellGroupNameFromOJS,escapeTemplateLiteral){return(
(cell) => {
  const mode = cell?.mode ?? "js";
  const value = String(cell?.value ?? "");
  const explicitName = typeof cell?.name === "string" && cell.name.length ? cell.name : null;

  if (mode === "js") {
    const name = inferCellGroupNameFromOJS(value) ?? explicitName;
    return { mode, name, source: value };
  }

  if (mode === "md") {
    const expr = `md\`${escapeTemplateLiteral(value)}\``;
    const source = explicitName ? `${explicitName} = ${expr}` : expr;
    const name = explicitName ?? null;
    return { mode, name, source };
  }

  if (mode === "html") {
    const expr = `htl.html\`${escapeTemplateLiteral(value)}\``;
    const source = explicitName ? `${explicitName} = ${expr}` : expr;
    const name = explicitName ?? null;
    return { mode, name, source };
  }

  const name = inferCellGroupNameFromOJS(value) ?? explicitName;
  return { mode, name, source: value };
}
)}

function _readObservableClipboardCells(globalThis){return(
async () => {
  const mime = "application/vnd.observablehq+json";

  if (globalThis.navigator?.clipboard?.read) {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      if (item.types?.includes?.(mime)) {
        const blob = await item.getType(mime);
        const text = await blob.text();
        const json = JSON.parse(text);
        if (Array.isArray(json)) return json;
      }
    }
  }

  if (globalThis.navigator?.clipboard?.readText) {
    const text = await navigator.clipboard.readText();
    if (text == null) throw new Error("Clipboard readText returned null/undefined.");
    return [{ mode: "js", value: String(text), name: null }];
  }

  throw new Error("Clipboard API unavailable (need navigator.clipboard.read or readText).");
}
)}

function _pasteObservableCellsIntoModule($0,normalizeObservableClipboardCell,findCell,compile_and_update){return(
async ({ cells, editedCell }) => {
  if (!editedCell?.module?.module) throw new Error("No selected cell/module to paste into.");
  if (!Array.isArray(cells) || cells.length === 0) return { total: 0, matched: 0, replacedCurrent: false, inserted: 0 };

  const moduleRuntime = editedCell.module.module;
  const moduleCells = $0.value.get(moduleRuntime) || [];
  const byName = new Map(
    moduleCells
      .filter((c) => typeof c?.name === "string" && c.name.length)
      .map((c) => [c.name, c])
  );

  const normalized = cells.map((c) => normalizeObservableClipboardCell(c)).filter((c) => typeof c?.source === "string" && c.source.length);

  const matched = [];
  const unmatched = [];

  for (const entry of normalized) {
    if (entry.name && byName.has(entry.name)) {
      const target = byName.get(entry.name);
      const ctx = findCell(target.variables[0]);
      if (ctx) matched.push({ entry, ctx });
      else unmatched.push(entry);
    } else {
      unmatched.push(entry);
    }
  }

  for (const { entry, ctx } of matched) {
    compile_and_update(entry.source, ctx.variables, ctx);
  }

  let replacedCurrent = false;
  let inserted = 0;

  if (unmatched.length > 0) {
    replacedCurrent = true;
    compile_and_update(unmatched[0].source, editedCell.variables, editedCell);

    let anchor = editedCell;
    for (let i = 1; i < unmatched.length; i++) {
      const vars = [];
      compile_and_update(unmatched[i].source, vars, anchor);
      anchor = { ...anchor, variables: vars, name: unmatched[i].name ?? anchor.name, dom: undefined };
      inserted++;
    }
  }

  return { total: normalized.length, matched: matched.length, replacedCurrent, inserted };
}
)}

function _84(md){return(
md`## Decompiler`
)}

function _modules(moduleMap,runtime){return(
moduleMap(runtime)
)}

function _decompiled(editedCell,decompile)
{
  if (editedCell.variables.length == 0) return "";
  return decompile(editedCell.variables);
}


function _editorModule(thisModule){return(
thisModule()
)}

function _editor_jobs(command_processor,submit_summary,save_options)
{
  //editedCell;
  command_processor;
  submit_summary;
  save_options;
  return "editor_jobs";
}


function _89(md){return(
md`### Apply Update`
)}

function _compile_and_update(compile,runtime,repositionSetElement){return(
(source, variables = [], cell) => {
  try {
    debugger;
    let reposition = false,
      insertionIndex = -1;
    const newVariables = compile(source);
    if (!variables || variables.length !== newVariables.length) {
      reposition = true;
      variables.forEach((v) => v.delete());
      for (let i = 0; i < newVariables.length; i++) {
        const newVariable = cell.module.module.variable({});
        variables.push(newVariable);
      }
    }
    if (reposition) {
      insertionIndex =
        [...runtime._variables].findIndex((v) => v == cell.variables.at(-1)) +
        1;
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

function _91(md){return(
md`### Remove Cells`
)}

function _remove_variables(){return(
(variables) => {
  variables.forEach((v) => v.delete());
}
)}

function _93(md){return(
md`### Runtime Representation`
)}

function _variable(Inputs,editedCell){return(
Inputs.radio(editedCell.variables, {
  label: "variable in cell group",
  format: (v) => v._name,
  value: editedCell.variables[0]
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

function _98(Inputs,definition,variable,inputs){return(
Inputs.button("update variable", {
  disabled: definition === variable._definition.toString(),
  reduce: () => {
    let _fn;
    eval("_fn = " + definition);
    variable.define(variable._name, inputs, _fn);
  }
})
)}

function _99(md){return(
md`### Editor Libraries`
)}

function _javascriptPlugin(codemirror){return(
codemirror
)}

function _104(md){return(
md`### Libraries`
)}

function _114(robocoop){return(
robocoop
)}

function _115(robocoop3){return(
robocoop3()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cell_options.json", {url: new URL("./files/cd0c7e38f999149855994faf9025f4a17e927828778830c371d12b72a5ea5c1d5cf6f06ccae6dc77de65eb953608d559055730688c51df882fd953e106604737.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("title_variable")).define("title_variable", ["lookupVariable","editorModule"], _title_variable);
  main.variable(observer()).define(["cellEditor","title_variable"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  const child1 = runtime.module(define1);
  main.import("syncers", child1);
  main.import("TRACE_CELL", child1);
  main.variable(observer("editors")).define("editors", _editors);
  main.variable(observer("auto_attach")).define("auto_attach", ["keepalive","editorModule","syncers","attachContextManu","divToVar","runtime","TRACE_CELL","editors","cellEditor"], _auto_attach);
  main.variable(observer("divToVar")).define("divToVar", _divToVar);
  main.variable(observer("viewof attachContextManu")).define("viewof attachContextManu", ["Inputs","isOnObservableCom"], _attachContextManu);
  main.variable(observer("attachContextManu")).define("attachContextManu", ["Generators", "viewof attachContextManu"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _12);
  const child2 = runtime.module(define2);
  main.import("cloneDataflow", child2);
  main.import("lookupVariable", child2);
  main.variable(observer("hotbarTemplate")).define("hotbarTemplate", ["lookupVariable","editorModule"], _hotbarTemplate);
  main.variable(observer("cellEditor")).define("cellEditor", ["cloneDataflow","editorTemplate","shellTemplate","getOption","Event","setOption"], _cellEditor);
  main.variable(observer("hotbar_shell")).define("hotbar_shell", ["viewof edit","Event","htl","edit"], _hotbar_shell);
  main.variable(observer("editor_panel")).define("editor_panel", ["viewof editedCell","htl","toolbar","nav","reversibleAttach","combine","code_editor"], _editor_panel);
  main.variable(observer("shellTemplate")).define("shellTemplate", ["lookupVariable","editorModule"], _shellTemplate);
  main.variable(observer("editorTemplate")).define("editorTemplate", ["lookupVariable","editorModule"], _editorTemplate);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof editedCell")).define("viewof editedCell", ["Inputs"], _editedCell);
  main.variable(observer("editedCell")).define("editedCell", ["Generators", "viewof editedCell"], (G, _) => G.input(_));
  main.variable(observer("findCell")).define("findCell", ["viewof liveCellMap","modules"], _findCell);
  main.variable(observer("selectVariable")).define("selectVariable", ["findCell","_","viewof editedCell","Event"], _selectVariable);
  main.variable(observer()).define(["selectVariable","hotbarTemplate"], _24);
  main.variable(observer("hotbar")).define("hotbar", ["viewof edit","Event","setOption","viewof editedCell","htl","edit","toolbar","nav","reversibleAttach","combine","code_editor"], _hotbar);
  main.variable(observer()).define(["viewof editedCell"], _26);
  main.variable(observer()).define(["nav","editedCell"], _27);
  main.variable(observer("nav")).define("nav", ["html","cellLinks"], _nav);
  main.variable(observer("cellLinks")).define("cellLinks", ["html","variableLink"], _cellLinks);
  main.variable(observer("variableLink")).define("variableLink", ["linkTo","modules"], _variableLink);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["exporter"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("viewof combine")).define("viewof combine", ["Inputs"], _combine);
  main.variable(observer("combine")).define("combine", ["Generators", "viewof combine"], (G, _) => G.input(_));
  main.variable(observer("viewof edit")).define("viewof edit", ["Inputs"], _edit);
  main.variable(observer("edit")).define("edit", ["Generators", "viewof edit"], (G, _) => G.input(_));
  main.variable(observer("toolbar")).define("toolbar", ["htl","reversibleAttach","combine","viewof select","viewof up","viewof down","viewof remove","viewof addCells","viewof apply","viewof copy","viewof paste"], _toolbar);
  main.variable(observer("viewof addCells")).define("viewof addCells", ["Inputs","createCell","viewof editedCell"], _addCells);
  main.variable(observer("addCells")).define("addCells", ["Generators", "viewof addCells"], (G, _) => G.input(_));
  main.variable(observer("viewof remove")).define("viewof remove", ["Inputs","deleteCell","viewof editedCell"], _remove);
  main.variable(observer("remove")).define("remove", ["Generators", "viewof remove"], (G, _) => G.input(_));
  main.variable(observer("viewof apply")).define("viewof apply", ["Inputs","compile_and_update","states","editedCell"], _apply);
  main.variable(observer("apply")).define("apply", ["Generators", "viewof apply"], (G, _) => G.input(_));
  main.variable(observer("viewof up")).define("viewof up", ["Inputs","moveCell","viewof editedCell"], _up);
  main.variable(observer("up")).define("up", ["Generators", "viewof up"], (G, _) => G.input(_));
  main.variable(observer("viewof paste")).define("viewof paste", ["Inputs","readObservableClipboardCells","pasteObservableCellsIntoModule","editedCell"], _paste);
  main.variable(observer("paste")).define("paste", ["Generators", "viewof paste"], (G, _) => G.input(_));
  main.variable(observer("viewof down")).define("viewof down", ["Inputs","moveCell","viewof editedCell"], _down);
  main.variable(observer("down")).define("down", ["Generators", "viewof down"], (G, _) => G.input(_));
  main.variable(observer("viewof copy")).define("viewof copy", ["Inputs","html","viewof editedCell","decompile","viewof liveCellMap","getOption","cellsToClipboard"], _copy);
  main.variable(observer("copy")).define("copy", ["Generators", "viewof copy"], (G, _) => G.input(_));
  main.variable(observer("module")).define("module", ["editedCell"], _module);
  main.variable(observer("code_editor_view")).define("code_editor_view", ["EditorView"], _code_editor_view);
  main.variable(observer("code_editor")).define("code_editor", ["code_editor_view"], _code_editor);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("moveCell")).define("moveCell", ["viewof command"], _moveCell);
  main.variable(observer("createCell")).define("createCell", ["viewof command"], _createCell);
  main.variable(observer("deleteCell")).define("deleteCell", ["viewof command"], _deleteCell);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("viewof command")).define("viewof command", ["flowQueue"], _command);
  main.variable(observer("command")).define("command", ["Generators", "viewof command"], (G, _) => G.input(_));
  main.variable(observer()).define(["command"], _54);
  main.variable(observer("findCellByVariable")).define("findCellByVariable", _findCellByVariable);
  main.variable(observer("findCellIndex")).define("findCellIndex", _findCellIndex);
  main.variable(observer("lookupCellByIndex")).define("lookupCellByIndex", _lookupCellByIndex);
  main.variable(observer("findVariableIndex")).define("findVariableIndex", ["runtime"], _findVariableIndex);
  main.variable(observer("command_processor")).define("command_processor", ["command","viewof edit","compile_and_update","remove_variables","findCellIndex","viewof liveCellMap","lookupCellByIndex","findVariableIndex","repositionSetElement","runtime","selectVariable","viewof command"], _command_processor);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("states")).define("states", _states);
  main.variable(observer("cellIdFacet")).define("cellIdFacet", ["codemirror"], _cellIdFacet);
  main.variable(observer("editor_manager")).define("editor_manager", ["editedCell","EditorState","decompiled","cellIdFacet","EditorView","states","codemirror","compile_and_update","code_editor_view","javascriptPlugin","myDefaultTheme"], _editor_manager);
  main.variable(observer("divToCell")).define("divToCell", _divToCell);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer("editor_refresh_from_runtime")).define("editor_refresh_from_runtime", ["editedCell","decompile","code_editor_view","replaceCodeMirrorDoc","queueMicrotask","onCodeChange","invalidation"], _editor_refresh_from_runtime);
  main.variable(observer("replaceCodeMirrorDoc")).define("replaceCodeMirrorDoc", _replaceCodeMirrorDoc);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer("viewof select")).define("viewof select", ["editedCell","Inputs","getOption","setOption"], _select);
  main.variable(observer("select")).define("select", ["Generators", "viewof select"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _70);
  const child3 = runtime.module(define3);
  main.import("getFileAttachment", child3);
  main.import("setFileAttachment", child3);
  main.import("removeFileAttachment", child3);
  main.import("jsonFileAttachment", child3);
  main.import("createFileAttachment", child3);
  main.variable(observer()).define(["FileAttachment"], _72);
  main.variable(observer("optionsFile")).define("optionsFile", ["getFileAttachment","editorModule"], _optionsFile);
  main.variable(observer("viewof options")).define("viewof options", ["Inputs","optionsFile"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("setOption")).define("setOption", ["findCell","_","viewof options","Event"], _setOption);
  main.variable(observer("getOption")).define("getOption", ["findCell","_","viewof options"], _getOption);
  main.variable(observer("save_options")).define("save_options", ["setFileAttachment","jsonFileAttachment","options","editorModule"], _save_options);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("escapeTemplateLiteral")).define("escapeTemplateLiteral", _escapeTemplateLiteral);
  main.variable(observer("inferCellGroupNameFromOJS")).define("inferCellGroupNameFromOJS", ["parser"], _inferCellGroupNameFromOJS);
  main.variable(observer("normalizeObservableClipboardCell")).define("normalizeObservableClipboardCell", ["inferCellGroupNameFromOJS","escapeTemplateLiteral"], _normalizeObservableClipboardCell);
  main.variable(observer("readObservableClipboardCells")).define("readObservableClipboardCells", ["globalThis"], _readObservableClipboardCells);
  main.variable(observer("pasteObservableCellsIntoModule")).define("pasteObservableCellsIntoModule", ["viewof liveCellMap","normalizeObservableClipboardCell","findCell","compile_and_update"], _pasteObservableCellsIntoModule);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("modules")).define("modules", ["moduleMap","runtime"], _modules);
  main.variable(observer("decompiled")).define("decompiled", ["editedCell","decompile"], _decompiled);
  main.variable(observer("viewof editorModule")).define("viewof editorModule", ["thisModule"], _editorModule);
  main.variable(observer("editorModule")).define("editorModule", ["Generators", "viewof editorModule"], (G, _) => G.input(_));
  main.variable(observer("editor_jobs")).define("editor_jobs", ["command_processor","submit_summary","save_options"], _editor_jobs);
  main.variable(observer()).define(["md"], _89);
  main.variable(observer("compile_and_update")).define("compile_and_update", ["compile","runtime","repositionSetElement"], _compile_and_update);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("remove_variables")).define("remove_variables", _remove_variables);
  main.variable(observer()).define(["md"], _93);
  main.variable(observer("viewof variable")).define("viewof variable", ["Inputs","editedCell"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer("name")).define("name", ["variable"], _name);
  main.variable(observer("inputs")).define("inputs", ["variable"], _inputs);
  main.variable(observer("viewof definition")).define("viewof definition", ["Inputs","variable"], _definition);
  main.variable(observer("definition")).define("definition", ["Generators", "viewof definition"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","definition","variable","inputs"], _98);
  main.variable(observer()).define(["md"], _99);
  const child4 = runtime.module(define4);
  main.import("descendants", child4);
  main.import("runtime", child4);
  main.import("main", child4);
  main.import("isOnObservableCom", child4);
  main.import("thisModule", child4);
  main.import("keepalive", child4);
  main.import("toObject", child4);
  main.import("isnode", child4);
  main.import("repositionSetElement", child4);
  main.import("onCodeChange", child4);
  const child5 = runtime.module(define5);
  main.import("EditorState", child5);
  main.import("EditorView", child5);
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
  main.variable(observer()).define(["md"], _104);
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
  const child11 = runtime.module(define11);
  main.import("viewof liveCellMap", child11);
  main.import("liveCellMap", child11);
  const child12 = runtime.module(define12);
  main.import("hash", child12);
  const child13 = runtime.module(define13);
  main.import("linkTo", child13);
  main.import("extractNotebookAndCell", child13);
  const child14 = runtime.module(define14);
  main.import("cellsToClipboard", child14);
  const child15 = runtime.module(define15);
  main.import("robocoop", child15);
  main.variable(observer()).define(["robocoop"], _114);
  main.variable(observer()).define(["robocoop3"], _115);
  const child16 = runtime.module(define16);
  main.import("robocoop3", child16);
  return main;
}
