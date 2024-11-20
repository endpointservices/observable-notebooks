import define1 from "./048a17a165be198d@263.js";
import define2 from "./b58f224e180d252e@57.js";

function _1(md){return(
md`# CodeMirror 6 Component
`
)}

function _2(md){return(
md`- Jun: Forked this from https://observablehq.com/@qbane/codemirror to:
  - respect the ObservableHQ Inputs api (i.e. adding set and get as in https://observablehq.com/@tophtucker/custom-input-example).
  - fix the esm module import incompatibilities using jspm.dev 

> NOTE: Still problems, see todo below.
  

Rewrite of my own notebook [CodeMirror 6 Playground](https://observablehq.com/@andy0130tw/codemirror-6-playground) as it's a little bit outdated. Heavily inspired by [@gnestor/codemirror](https://observablehq.com/@gnestor/codemirror), which is a battery-included editor component. This notebook aims to be minimalistic, serves as a base template, and leaves the composition phase to the user.

Sample usage:

\`\`\`js
import { CodeMirror } from '@jmatsushita/codemirror'

viewof editor = CodeMirror('initial text', {
  extensions: [],
  keymaps: [],
})
\`\`\``
)}

function _3(md){return(
md`
## TODO 

- [ ] Loss of data sometimes occur with the following error \`view.js:1674 DOMException: Failed to execute 'collapse' on 'Selection': The offset 23 is larger than the node's length (1).\`
- [ ] When focus moves from this codemirror, to the first observableHQ's codemirror block, focus doesn't follow.
- [ ] Implement Cmd-Enter for executing update.
- [ ] Capture tab (only when selection?) and shift-tab
`
)}

function _4(md){return(
md`## Test synchronizing input

From the codemirror \`editor\` to \`Inputs.text()\``
)}

function _5(md){return(
md`From \`Inputs.text()\` to the codemirror \`editor\` `
)}

function _source(localStorageView){return(
localStorageView("source", { defaultValue: "default" })
)}

function _7(Inputs,$0,$1){return(
Inputs.bind($0, $1)
)}

function _8(md){return(
md`# Editor`
)}

function _9(Inputs,set,$0){return(
Inputs.button([
  ["Set to hello", () => set($0, "hello")],
  ["Reset", () => set($0, '')]
])
)}

function _10($0,Event)
{ 
  $0.value = "it backwrites!";
  $0.dispatchEvent(new Event('input', {bubbles: true}));
}


function _editor(CodeMirror,myDefaultTheme){return(
CodeMirror('Hello world, CodeMirror 6!\n', {
  extensions: [
    myDefaultTheme,
  ]
})
)}

function _12(editor){return(
editor
)}

function _13(md){return(
md`## Programmatically setting the editor content`
)}

function _14(Inputs,set,$0){return(
Inputs.button([
  ["Set to a sample value", () => set($0, 'I\'ve been programmed!')],
  ["Reset", () => set($0, '')]
])
)}

function _programmableEditor(CodeMirror,myDefaultTheme){return(
CodeMirror('Hello I\'m programmable!\n', {
  extensions: [
    myDefaultTheme,
  ]
})
)}

function _set(Event){return(
function set(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input", {bubbles: true}));
}
)}

function _17(md){return(
md`---`
)}

function _18(md){return(
md`---`
)}

function _19(md){return(
md`&para; Preload some commonly-used modules so you don't have to \`await\` on each.`
)}

function _loadCodeMirrorModules(esmCodeMirror){return(
async entries => {
  const repo = Object.create(null)
  const loadToRepo = async key => {
    const module = await esmCodeMirror(key)
    // we pin version on the cmImports call, 
    // but we want to use them with their names
    const name = key.split("@")[0]
    repo[name] = module
  }
  await Promise.all(entries.map(loadToRepo))
  return repo
}
)}

function _cmImports(loadCodeMirrorModules){return(
loadCodeMirrorModules([
  'view@6.22.2', 
  'state@6.3.3', 
  'language@6.9.3', 
  'commands@6.3.2',
  // 'search', 
  // 'autocomplete',
])
)}

function _EditorView(cmImports){return(
cmImports.view.EditorView
)}

function _EditorState(cmImports){return(
cmImports.state.EditorState
)}

function _24(md){return(
md`&para; The main CodeMirror component. It comes with extensions from a reduced [list](https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts) of \`basic-setup\` but allows additional ones in the \`config\` argument.`
)}

function _CodeMirror(cmImports,EditorState,cmReactiveViewof,EditorView){return(
async (doc = '', config = {}) => {
  const extensions = config.extensions ?? []
  const keymaps = config.keymaps ?? []

  // import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
  //         rectangularSelection, crosshairCursor,
  //         lineNumbers, highlightActiveLineGutter} from "@codemirror/view"
  // import {Extension, EditorState} from "@codemirror/state"
  // import {defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
  //         foldGutter, foldKeymap} from "@codemirror/language"
  // import {defaultKeymap, history, historyKeymap} from "@codemirror/commands"
  // import {searchKeymap, highlightSelectionMatches} from "@codemirror/search"
  // import {autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap} from "@codemirror/autocomplete"
  // import {lintKeymap} from "@codemirror/lint"

  
  const { highlightSpecialChars, keymap, drawSelection, highlightActiveLine } = cmImports.view
  const { Prec } = cmImports.state
  const { defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
    foldGutter, foldKeymap} = cmImports.language

  const {defaultKeymap, history, historyKeymap} = cmImports.commands
 
  const state = EditorState.create({
    doc,
    extensions: [
      cmReactiveViewof,
      
      highlightSpecialChars(),
      history(),
      drawSelection(),
      syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
      keymap.of([
        // ...closeBracketsKeymap,
        ...defaultKeymap,
        // ...searchKeymap,
        ...historyKeymap,
        // ...foldKeymap,
        // ...commentKeymap,
        // ...completionKeymap,
        // ...lintKeymap,
        ...keymaps,
      ]),
      ...extensions,
    ],
  })
  const view = new EditorView({state})
  const el = view.dom

  // Update the display whenever the value changes
  Object.defineProperty(el, "value", {
    get() {
      // console.log("editor.get called:", view.state.doc)
      return view.state.doc.toString();
    },
    set(v) {
      // console.log("editor.set called with: ",v)
      let transaction = view.state.update({changes: {from: 0, to: view.state.doc.length, insert: v}})
      view.dispatch(transaction)
    }
  });

  // Set the initial value
  // el.value = value;

  return el
}
)}

function _26(md){return(
md`&para; Observable-specific patch: Use a custom handler to notify the \`viewof\` element, triggered only if the document has changed (as reported by CodeMirror), in which case its value is re-computed.`
)}

function _cmReactiveViewof(cmImports)
{
  // prevent input events coming from the contenteditable div that
  // propagates and triggers a cell refresh; we shall handle it ourselves.
  const blocker = cmImports.view.ViewPlugin.fromClass(class {
    constructor(view) {
      this.elContent = null
      return true
    }
    update({view}) {
      if (this.elContent) return;
      const el = view.dom.querySelector('.cm-content')
      if (el) {
        this.elContent = el
        this.elContent.addEventListener('input', this.handler)
      }
    }
    destroy() {
      if (!this.elContent) return;
      this.elContent.removeEventListener('input', this.handler)
      this.elContent = null
    }
    handler(evt) {
      evt.stopImmediatePropagation()
    }
  })
  
  return [blocker]
}


function _28(md){return(
md`---`
)}

function _29(md){return(
md`&para; If you want to load the standard configuration from \`basic-setup\` (which loads a bunch of modules and is potentially slow), here it is.`
)}

function _loadBasicSetup(esmCodeMirror){return(
() => esmCodeMirror('basic-setup').then(m => m.basicSetup)
)}

function _31(md){return(
md`&para; Miscellaneous modules. Import them along whenever fits.`
)}

function _myDefaultTheme(EditorView){return(
EditorView.theme({
  '&': {
    fontFamily: 'Consolas, "Roboto Mono", monospace',
    fontSize: '12px',
    height: 'auto',
    border: '1px solid #ddd',
  },
})
)}

function _34(md){return(
md`---`
)}

function _esmImport(){return(
pkg => import(`https://jspm.dev/${pkg}`)
)}

function _esmCodeMirror(esmImport){return(
mod => {
  const key = (mod.indexOf('@') >= 0 ? mod : `${mod}`)
  console.log("key", key)
  return esmImport('@codemirror/' + key)
}
)}

async function _debounce(){return(
(await import('https://jspm.dev/lodash.debounce@4.0.8')).default
)}

function _39(md){return(
md`---`
)}

function _MarkdownIt(require){return(
require('markdown-it@12/dist/markdown-it.js')
)}

function _mdit(MarkdownIt){return(
MarkdownIt('commonmark').enable('strikethrough')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof source")).define("viewof source", ["localStorageView"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof editor","viewof source"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Inputs","set","viewof source"], _9);
  main.variable(observer()).define(["viewof editor","Event"], _10);
  main.variable(observer("viewof editor")).define("viewof editor", ["CodeMirror","myDefaultTheme"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["editor"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Inputs","set","viewof programmableEditor"], _14);
  main.variable(observer("viewof programmableEditor")).define("viewof programmableEditor", ["CodeMirror","myDefaultTheme"], _programmableEditor);
  main.variable(observer("programmableEditor")).define("programmableEditor", ["Generators", "viewof programmableEditor"], (G, _) => G.input(_));
  main.variable(observer("set")).define("set", ["Event"], _set);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("loadCodeMirrorModules")).define("loadCodeMirrorModules", ["esmCodeMirror"], _loadCodeMirrorModules);
  main.variable(observer("cmImports")).define("cmImports", ["loadCodeMirrorModules"], _cmImports);
  main.variable(observer("EditorView")).define("EditorView", ["cmImports"], _EditorView);
  main.variable(observer("EditorState")).define("EditorState", ["cmImports"], _EditorState);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("CodeMirror")).define("CodeMirror", ["cmImports","EditorState","cmReactiveViewof","EditorView"], _CodeMirror);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("cmReactiveViewof")).define("cmReactiveViewof", ["cmImports"], _cmReactiveViewof);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("loadBasicSetup")).define("loadBasicSetup", ["esmCodeMirror"], _loadBasicSetup);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("myDefaultTheme")).define("myDefaultTheme", ["EditorView"], _myDefaultTheme);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("esmImport")).define("esmImport", _esmImport);
  main.variable(observer("esmCodeMirror")).define("esmCodeMirror", ["esmImport"], _esmCodeMirror);
  main.variable(observer("debounce")).define("debounce", _debounce);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("MarkdownIt")).define("MarkdownIt", ["require"], _MarkdownIt);
  main.variable(observer("mdit")).define("mdit", ["MarkdownIt"], _mdit);
  const child2 = runtime.module(define2);
  main.import("mdPlus", "md", child2);
  return main;
}
