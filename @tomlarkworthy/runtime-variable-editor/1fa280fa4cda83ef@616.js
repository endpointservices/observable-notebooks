import define1 from "./e4cdd35ce867f8af@1001.js";
import define2 from "./98f34e974bb2e4bc@699.js";
import define3 from "./db42ae70222a8b08@1033.js";
import define4 from "./f109935193c0deba@4417.js";

function _title(md){return(
md`# Runtime variable editor with Codemirror autocomplete and syntax highlighting`
)}

function _module(Inputs,$0){return(
Inputs.select($0.value, {
  label: "module",
  format: ([module, info]) => info.name
})
)}

function _selected_variable(Inputs,$0,module,$1){return(
Inputs.select(
  [...$0.value].filter((v) => v._module == module.module),
  {
    label: "variable",
    format: (variable) =>
      `${$1.value.get(variable._module)?.name} - ${
        variable._name
      }`
  }
)
)}

function _editor_dom(editor_view){return(
editor_view.dom
)}

function _save_button(Inputs,save){return(
Inputs.button("update (CMD + RETURN)", {
  reduce: save
})
)}

function _6(md){return(
md`## Intro

My project learning how to setup Codemirror for a Javascript language, including injecting auto-complete information from dynamic state.

This editor will read the configuration of any variable in the Observable runtime, essentially the arguments to [\`variable.define\`](https://github.com/observablehq/runtime?tab=readme-ov-file#variabledefinename-inputs-definition). Reactive variables have other variables denoted as \`inputs\`, this auto-complete will look at the values of those inputs to populate the auto-complete in the definition function.

Observable 1.0 notebooks use a modified Javascript language for creating \`cells\`. This is *not* use Observable 1.0 syntax (unlike [editor](https://observablehq.com/@tomlarkworthy/editor-4)) and has not concept of cells. Instead, this works at the runtime's lower level - raw Javascript. This simplifies auto-complete because you can use Codemirror's 1st party functionality, but it makes programming the runtime more difficult, as you have to define the reactive input array yourself. 

Each variable is represented as an object of the form

\`\`\`js
({
  name: <string> // Optional
  inputs: [...], // Reactive dependancies
  definition: <function>  // called by the runtime when the variable recomputes
                          // the function args are populated from the latest state of dependancies
})

The Observable runtime calls \`definition\` when dependancies changes.
\`\`\``
)}

function _7(md){return(
md`### Editor Setup`
)}

function _contextFacet(codemirror){return(
codemirror.Facet.define({
  combine: (values) => values.at(-1)
})
)}

function _editor_view(EditorView){return(
new EditorView()
)}

function _save(compile,editor_view,selected_variable){return(
function save() {
  const compiled = compile(editor_view.state.doc.toString());
  selected_variable.define(compiled.name, compiled.inputs, compiled.definition);
}
)}

function _12(md){return(
md`### Editor State`
)}

function _initial_state(EditorState,variable_template,selected_variable,contextFacet,EditorView,$0,Event,codemirror,save,completion_extension,js_squiggle_lint,dot_completion,myDefaultTheme){return(
EditorState.create({
  doc: variable_template(selected_variable),
  extensions: [
    contextFacet.of({ variable: selected_variable }),
    EditorView.updateListener.of((update) => {
      $0.value = update.state;
      $0.dispatchEvent(new Event("input"));
    }),
    codemirror.keymap.of([
      codemirror.indentWithTab,
      {
        key: "Shift-Enter",
        run: (view) => {
          save();
          return true;
        }
      }
    ]),
    codemirror.EditorView.lineWrapping,
    codemirror.javascript(),
    codemirror.basicSetup,
    completion_extension,
    js_squiggle_lint,

    dot_completion,
    myDefaultTheme
  ]
})
)}

function _assign_initial_state(editor_view,initial_state){return(
editor_view.setState(initial_state)
)}

function _latest_state(Inputs){return(
Inputs.input()
)}

function _16(latest_state){return(
latest_state
)}

function _17(md){return(
md`## Autocomplete`
)}

function _getCodeSuggestions(computeScope){return(
(ctx) => {
  if (ctx.inString || ctx.inComment) return [];
  const prefix = ctx.identifier ?? "";
  const starts = (s) => s && s.startsWith(prefix);
  const uniqByLabel = (arr) => {
    const seen = new Set(),
      out = [];
    for (const o of arr)
      if (!seen.has(o.label)) {
        seen.add(o.label);
        out.push(o);
      }
    return out;
  };
  const classify = (v) => {
    if (typeof v === "function") {
      const src = Function.prototype.toString.call(v);
      return /^\s*class\b/.test(src) ? "class" : "function";
    }
    if (v === null) return "null";
    const t = typeof v;
    return t === "object" ? "variable" : t;
  };
  const propEntries = (obj) => {
    const opts = [];
    const seen = new Set();
    let o = obj,
      depth = 0;
    while (o && depth < 3) {
      for (const n of Object.getOwnPropertyNames(o)) {
        if (seen.has(n)) continue;
        seen.add(n);
        let type = "property";
        try {
          const d = Object.getOwnPropertyDescriptor(o, n);
          if (d && "value" in d && typeof d.value === "function")
            type = "function";
        } catch {}
        opts.push({ label: n, type });
      }
      o = Object.getPrototypeOf(o);
      depth++;
    }
    return opts;
  };
  const definition_scope = computeScope(ctx.state);
  if (ctx.isMemberExpression) {
    const chain = ctx.objectChain;
    let base = definition_scope.get(chain[0]);
    if (base === undefined) return [];
    for (let i = 1; i < chain.length; i++) {
      try {
        base = base?.[chain[i]];
      } catch {
        base = undefined;
        break;
      }
      if (base == null) break;
    }
    if (base == null) return [];
    const options = propEntries(base).filter((o) => starts(o.label));
    options.sort((a, b) => a.label.localeCompare(b.label));
    return uniqByLabel(options);
  } else {
    const options = [];
    for (const [name, val] of definition_scope) {
      if (!starts(name)) continue;
      let type = classify(val);
      if (type === "object") type = "variable";
      options.push({ label: name, type });
    }
    options.sort((a, b) => a.label.localeCompare(b.label));
    return uniqByLabel(options);
  }
}
)}

function _buildAstContext(codemirror){return(
(completionContext) => {
  const state = completionContext.state;
  const pos = completionContext.pos;
  const tree = codemirror.syntaxTree(state);
  const node = tree.resolve(pos, -1);
  const ancestors = [];
  for (let n = node; n; n = n.parent) ancestors.push(n);
  const path = ancestors.map((n) => n.name);

  const line = state.doc.lineAt(pos);
  let start = pos;
  while (start > line.from) {
    const ch = state.sliceDoc(start - 1, start);
    if (/[A-Za-z0-9_$\.]/.test(ch)) start--;
    else break;
  }
  let end = pos;
  while (end < line.to) {
    const ch = state.sliceDoc(end, end + 1);
    if (/[A-Za-z0-9_$]/.test(ch)) end++;
    else break;
  }

  const leftText = state.sliceDoc(start, pos);
  const chainMatch = leftText.match(/([A-Za-z0-9_$]+(?:\.[A-Za-z0-9_$]*)*)$/);
  const chain = chainMatch ? chainMatch[1].split(".") : [];
  const identifier = chain.length ? chain[chain.length - 1] : "";
  const base = chain.slice(0, -1);
  const from = pos - identifier.length;
  const to = end;

  const inString = path.some(
    (n) => n.includes("String") || n === "TemplateString"
  );
  const inComment = path.some(
    (n) => n === "LineComment" || n === "BlockComment"
  );
  const inPropertyName = path.some((n) => n === "PropertyName");
  const enclosingFunction =
    ancestors.find((n) => /Function|Method|ArrowFunction/.test(n.name)) || null;
  const enclosingClass = ancestors.find((n) => /Class/.test(n.name)) || null;

  return {
    language: "javascript",
    completionContext,
    state,
    tree,
    node,
    ancestors,
    path,
    line,
    pos,
    from,
    to,
    identifier,
    propertyChain: chain,
    objectChain: base,
    isMemberExpression: base.length > 0,
    inString,
    inComment,
    inPropertyName,
    enclosingFunction,
    enclosingClass,
    textBefore: state.sliceDoc(line.from, pos),
    textAfter: state.sliceDoc(pos, line.to)
  };
}
)}

function _completion_extension(codemirror,buildAstContext,getCodeSuggestions){return(
codemirror.autocompletion({
  override: [
    codemirror.localCompletionSource,
    (cx) => {
      const ctx = buildAstContext(cx);
      if (!cx.explicit && ctx.identifier.length === 0) return null;
      const options = getCodeSuggestions(ctx);
      return options && options.length
        ? { from: ctx.from, to: ctx.to, options }
        : null;
    }
  ]
})
)}

function _dot_completion(EditorView,codemirror){return(
EditorView.domEventHandlers({
  keydown(event, view) {
    if (event.key === ".") {
      codemirror.startCompletion(view);
    }
    return false;
  }
})
)}

function _22(md){return(
md`## Syntax highlighting`
)}

function _js_squiggle_lint(codemirror){return(
[
  codemirror.lintGutter(),
  codemirror.linter(
    (view) => {
      const { state } = view;
      const diagnostics = [];
      const tree = codemirror.syntaxTree(state);
      tree.iterate({
        enter: ({ type, from, to }) => {
          if (type.isError) {
            const end = to > from ? to : Math.min(from + 1, state.doc.length);
            diagnostics.push({
              from,
              to: end,
              severity: "error",
              message: "Syntax error"
            });
          }
        }
      });
      return diagnostics;
    },
    { delay: 250 }
  ),
  codemirror.keymap.of(codemirror.lintKeymap ?? []),
  codemirror.EditorView.baseTheme({
    ".cm-lintRange": {
      textDecorationThickness: "2px",
      textUnderlineOffset: "3px"
    },
    ".cm-lintRange.cm-lintRange-error": {
      textDecoration: "underline wavy #e11"
    },
    ".cm-tooltip.cm-tooltip-lint": { fontSize: "12px" }
  })
]
)}

function _24(md){return(
md`### Variable Domain Logic`
)}

function _indentString(){return(
(text, indent = "  ", skipFirstLine = true) => {
  if (text == null) return text;
  const indentStr =
    typeof indent === "number" ? " ".repeat(indent) : String(indent);
  const str = Array.isArray(text) ? text.join("\n") : String(text);
  const endsWithNL = /\r?\n$/.test(str);
  const lines = str.split(/\r?\n/);
  const result = lines
    .map((line, i) => (skipFirstLine && i === 0 ? line : indentStr + line))
    .join("\n");
  return endsWithNL ? result + "\n" : result;
}
)}

function _compile(){return(
(source) => {
  try {
    let code;
    eval("code=" + source);
    return code;
  } catch (err) {
    return {
      error: err
    };
  }
}
)}

function _variable_template(indentString){return(
(variable) => `({${
  variable._name ? `\n  name: "${variable._name}",` : ""
}
  inputs: [${variable._inputs.map((i) => `"${i._name}"`)}],
  definition: ${indentString(variable._definition.toString())},
})`
)}

function _test_compiled(compile){return(
compile(`{
  name: "FileAttachment";,
  inputs: [],
  definition: ()=>Kn,
}`)
)}

function _compiled(compile,latest_state){return(
compile(latest_state.doc.toString())
)}

function _30(md){return(
md`### Observable Runtime`
)}

function _vars(variables,runtime){return(
variables(runtime)
)}

function _34(md){return(
md`### Compute definition scope

To provide type info to the edited variable we need to lookup the current values of the inputs, and name they are bound to in the function args.`
)}

function _definition_scope(computeScope,latest_state){return(
computeScope(latest_state)
)}

function _input_params(getInputNames,latest_state){return(
getInputNames(latest_state)
)}

function _definition_param_names(getDefinitionParamNames,latest_state){return(
getDefinitionParamNames(latest_state)
)}

function _input_values(input_params,selected_variable){return(
input_params.map(
  (name) => selected_variable._resolve(name)._value
)
)}

function _getInputNames(){return(
(state) => {
  const doc = state && state.doc ? state.sliceDoc(0) : String(state ?? "");
  const re = /inputs\s*:\s*(\[[\s\S]*?\])/g;
  const m = re.exec(doc);
  if (m) {
    return JSON.parse(m[1]);
  }
}
)}

function _getDefinitionParamNames(EditorState,codemirror){return(
(state) => {
  const doc = state.sliceDoc(0);
  const search = /definition\s*:/g;
  let match;
  while ((match = search.exec(doc)) !== null) {
    let idx = match.index + match[0].length;
    while (idx < doc.length && /\s/.test(doc[idx])) idx++;
    const arrowIdx = doc.indexOf("=>", idx);
    const funcIdx = doc.indexOf("function", idx);
    if (arrowIdx !== -1 && (funcIdx === -1 || arrowIdx < funcIdx)) {
      const leftEnd = arrowIdx;
      const paren = doc.lastIndexOf("(", leftEnd - 1);
      let left;
      if (paren >= idx) {
        let start = paren;
        let depth = 0;
        while (start >= idx) {
          const ch = doc[start];
          if (ch === ")") depth++;
          else if (ch === "(") {
            if (depth === 0) break;
            depth--;
          }
          start--;
        }
        left = doc.slice(start + 1, leftEnd);
      } else {
        let s = leftEnd - 1;
        while (s >= idx && /[A-Za-z0-9_$\s]/.test(doc[s])) s--;
        left = doc.slice(s + 1, leftEnd);
      }
      const snippet = `(${left}) => 0`;
      const tmp = EditorState.create({
        doc: snippet,
        extensions: [codemirror.javascript()]
      });
      const out = [];
      codemirror.syntaxTree(tmp).iterate({
        enter: ({ type, from, to }) => {
          if (type.name === "VariableName") out.push(tmp.sliceDoc(from, to));
        }
      });
      return Array.from(new Set(out));
    } else if (funcIdx !== -1 && funcIdx >= idx) {
      const parenOpen = doc.indexOf("(", funcIdx);
      if (parenOpen !== -1) {
        let pos = parenOpen;
        let depth = 0;
        let endParen = -1;
        while (pos < doc.length) {
          const ch = doc[pos];
          if (ch === "(") depth++;
          else if (ch === ")") {
            depth--;
            if (depth === 0) {
              endParen = pos;
              break;
            }
          }
          pos++;
        }
        if (endParen !== -1) {
          const paramStr = doc.slice(parenOpen + 1, endParen);
          const idRegex = /[A-Za-z_$][A-Za-z0-9_$]*/g;
          const out = [];
          let m2;
          while ((m2 = idRegex.exec(paramStr)) !== null) out.push(m2[0]);
          return Array.from(new Set(out));
        }
      }
    }
  }
  return [];
}
)}

function _computeScope(contextFacet,getInputNames,getDefinitionParamNames){return(
(state) => {
  const context = state.facet(contextFacet);
  const variable = context.variable;
  const input_params = getInputNames(state);
  const definition_param_names = getDefinitionParamNames(state);
  return new Map(
    definition_param_names.map((name, i) => [
      name,
      variable._resolve(input_params[i])._value
    ])
  );
}
)}

function _42(md){return(
md`## Robocoop

The AI is quite helpful with codemirror`
)}

function _44(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("viewof module")).define("viewof module", ["Inputs","viewof currentModules"], _module);
  main.variable(observer("module")).define("module", ["Generators", "viewof module"], (G, _) => G.input(_));
  main.variable(observer("viewof selected_variable")).define("viewof selected_variable", ["Inputs","viewof vars","module","viewof currentModules"], _selected_variable);
  main.variable(observer("selected_variable")).define("selected_variable", ["Generators", "viewof selected_variable"], (G, _) => G.input(_));
  main.variable(observer("editor_dom")).define("editor_dom", ["editor_view"], _editor_dom);
  main.variable(observer("viewof save_button")).define("viewof save_button", ["Inputs","save"], _save_button);
  main.variable(observer("save_button")).define("save_button", ["Generators", "viewof save_button"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1);
  main.import("EditorState", child1);
  main.import("EditorView", child1);
  main.import("codemirror", child1);
  main.import("myDefaultTheme", child1);
  main.variable(observer("contextFacet")).define("contextFacet", ["codemirror"], _contextFacet);
  main.variable(observer("editor_view")).define("editor_view", ["EditorView"], _editor_view);
  main.variable(observer("save")).define("save", ["compile","editor_view","selected_variable"], _save);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("initial_state")).define("initial_state", ["EditorState","variable_template","selected_variable","contextFacet","EditorView","viewof latest_state","Event","codemirror","save","completion_extension","js_squiggle_lint","dot_completion","myDefaultTheme"], _initial_state);
  main.variable(observer("assign_initial_state")).define("assign_initial_state", ["editor_view","initial_state"], _assign_initial_state);
  main.variable(observer("viewof latest_state")).define("viewof latest_state", ["Inputs"], _latest_state);
  main.variable(observer("latest_state")).define("latest_state", ["Generators", "viewof latest_state"], (G, _) => G.input(_));
  main.variable(observer()).define(["latest_state"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("getCodeSuggestions")).define("getCodeSuggestions", ["computeScope"], _getCodeSuggestions);
  main.variable(observer("buildAstContext")).define("buildAstContext", ["codemirror"], _buildAstContext);
  main.variable(observer("completion_extension")).define("completion_extension", ["codemirror","buildAstContext","getCodeSuggestions"], _completion_extension);
  main.variable(observer("dot_completion")).define("dot_completion", ["EditorView","codemirror"], _dot_completion);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("js_squiggle_lint")).define("js_squiggle_lint", ["codemirror"], _js_squiggle_lint);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("indentString")).define("indentString", _indentString);
  main.variable(observer("compile")).define("compile", _compile);
  main.variable(observer("variable_template")).define("variable_template", ["indentString"], _variable_template);
  main.variable(observer("test_compiled")).define("test_compiled", ["compile"], _test_compiled);
  main.variable(observer("compiled")).define("compiled", ["compile","latest_state"], _compiled);
  main.variable(observer()).define(["md"], _30);
  const child2 = runtime.module(define2);
  main.import("runtime", child2);
  main.import("thisModule", child2);
  main.import("observe", child2);
  main.import("variables", child2);
  main.import("descendants", child2);
  main.import("lookupVariable", child2);
  main.import("toObject", child2);
  main.variable(observer("viewof vars")).define("viewof vars", ["variables","runtime"], _vars);
  main.variable(observer("vars")).define("vars", ["Generators", "viewof vars"], (G, _) => G.input(_));
  const child3 = runtime.module(define3);
  main.import("viewof currentModules", child3);
  main.import("currentModules", child3);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("definition_scope")).define("definition_scope", ["computeScope","latest_state"], _definition_scope);
  main.variable(observer("input_params")).define("input_params", ["getInputNames","latest_state"], _input_params);
  main.variable(observer("definition_param_names")).define("definition_param_names", ["getDefinitionParamNames","latest_state"], _definition_param_names);
  main.variable(observer("input_values")).define("input_values", ["input_params","selected_variable"], _input_values);
  main.variable(observer("getInputNames")).define("getInputNames", _getInputNames);
  main.variable(observer("getDefinitionParamNames")).define("getDefinitionParamNames", ["EditorState","codemirror"], _getDefinitionParamNames);
  main.variable(observer("computeScope")).define("computeScope", ["contextFacet","getInputNames","getDefinitionParamNames"], _computeScope);
  main.variable(observer()).define(["md"], _42);
  const child4 = runtime.module(define4);
  main.import("robocoop", child4);
  main.variable(observer()).define(["robocoop"], _44);
  return main;
}
