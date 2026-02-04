import define1 from "./10c7899865f8a76e@8998.js";
import define2 from "./98f34e974bb2e4bc@958.js";
import define3 from "./e3a019069a130d79@6817.js";
import define4 from "./af578328ee23ed14@1111.js";
import define5 from "./db80e603859226c1@23.js";

function _title(control,md){return(
md`# Inline editable \`md\` 

A drop in replacement for the existing markdown renderer function \`md\`. Clicking markdown *content* will now switch to editing mode, so you can edit text in-place. This provides a more natural, Notion-like, document editing experience, and avoids scrolling to the code when correcting larger texts. 

To adopt it you just need to import it, which naturally shadows the \`stdlib\` implementation.

~~~js
import {md} from "@tomlarkworthy/editable-md"
~~~

Template interpolation works! You can bring other notebook values into the text with \`\${<expr>}\`. For example, the value of the slider is: ${control}

After an update (keyboard shortcut SHIFT + ENTER), the markdown is parsed back into the tagged template representation and pushed back into the runtime. Runtime serializers like [exporter](https://observablehq.com/@tomlarkworthy/exporter-2) and [Lopecode](https://github.com/tomlarkworthy/lopecode) will pick up the changes next export.`
)}

function _control(Inputs){return(
Inputs.range(undefined, {
  label: "value is bound to markdown document"
})
)}

function _3(exporter){return(
exporter()
)}

function _4(md){return(
md`## Value access to the markdown 

Access to the raw markdown is sometimes useful, the response is a HTML document for display, but on the root element is the property "markdown" which returns a promise to the markdown document, so you can now use \`md\` as an input.`
)}

function _5(title){return(
title.markdown
)}

function _6(md){return(
md`## Known Issues

- escaped tagged template literal lose their escaping if they are not in a code block. This is due to \`prosemirror.defaultMarkdownParser.parse(markdown)\` removing redundant escapes. We should probably make template placeholders a 1st class concept but as there is an easy work around of putting them in a code fence it is enough for now. (see [\`test_defaultMarkdownParser_preserves_escapes\`](#test_defaultMarkdownParser_preserves_escapes))`
)}

function _md(randstr,originalMd,prosemirror,markdownToMdTagged,compile,runtime,decompile,mdCellSourceToMarkdown,invalidation){return(
(template, ...values) => {
  const id = randstr();
  const dom = originalMd(template, ...values);
  dom.id = id; // append tag to find it
  let view; // Prose mirror view
  let self; // Observable variable

  function saveAndRender() {
    // convert to markdown (includs tagged literals)
    const markdown = prosemirror.defaultMarkdownSerializer.serialize(
      view.state.doc
    );

    const template = markdownToMdTagged(markdown);
    const variables = compile(template);
    // path the runtime definitions
    self._inputs = variables[0]._inputs.map((n) => self._module._resolve(n));
    let _fn;
    eval("_fn = " + variables[0]._definition.toString());

    // Update the variable (will rerender)
    self.define(self._name, variables[0]._inputs, _fn); // will retrigger
  }

  // look for id
  const selfPromise = new Promise((resolve) => {
    setTimeout(() => {
      self = [...runtime._variables].find((v) => v?._value?.id == id);
      if (self) {
        resolve(self);
        const listener = async () => {
          // Switch to edit mode
          // stop listenting for focus
          dom.removeEventListener("click", listener);
          // start listening for loss of focus
          dom.addEventListener("focusout", lostFocus);

          // decompile cell
          const ojs_source = await decompile([self]);
          // convert to markdown source
          const markdown = mdCellSourceToMarkdown(ojs_source);

          const doc = prosemirror.defaultMarkdownParser.parse(markdown);
          let state = prosemirror.EditorState.create({
            doc,
            schema: prosemirror.schema,
            plugins: prosemirror.exampleSetup({
              schema: prosemirror.schema
            })
          });
          dom.innerHTML = ""; // clear static version
          // replace with editor
          view = new prosemirror.EditorView(dom, {
            state,
            handleKeyDown(viewInstance, event) {
              if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                lostFocus();
                return true;
              }
              return false;
            }
          });
          view.focus();
        };
        const lostFocus = () => {
          // stop listening for focus
          dom.removeEventListener("focusout", lostFocus);
          // start listening to edit again
          dom.addEventListener("click", listener);
          // save
          saveAndRender();
        };

        dom.addEventListener("click", listener);
        invalidation.then(() => {
          dom.removeEventListener("click", listener);
          dom.removeEventListener("focusout", lostFocus);
        });
      }
    }, 0);
  });

  Object.defineProperty(dom, "markdown", {
    get: () => {
      return selfPromise
        .then((self) => decompile([self]))
        .then((ojs_source) => mdCellSourceToMarkdown(ojs_source));
    }
  });
  return dom;
}
)}

function _irToEditableText(){return(
function irToEditableText(ir) {
  let s = "";
  for (const p of ir.parts) {
    if (p.kind === "text") {
      s += p.text;
    } else {
      s += "${" + p.source + "}";
    }
  }
  return s;
}
)}

function _replaceArgPlaceholders()
{
  const argPlaceholderRegex = /\$\{ARG\$(\d+)\}/g;

  return (text, replacer) =>
    text.replace(argPlaceholderRegex, (_, index) => replacer(Number(index)));
}


function _11(md){return(
md`## Source to markdown`
)}

function _test_mdCellSourceToMarkdown(mdCellSourceToMarkdown){return(
mdCellSourceToMarkdown(
  "title = md`foo ${'cool'}`"
)
)}

function _mdCellSourceToMarkdown(acorn,acorn_walk){return(
function mdCellSourceToMarkdown(source) {
  const ast = acorn.parse(source, {
    ecmaVersion: "latest",
    sourceType: "module"
  });

  let mdNode = null;

  acorn_walk.simple(ast, {
    TaggedTemplateExpression(node) {
      if (mdNode) return;
      if (node.tag.type === "Identifier" && node.tag.name === "md") {
        mdNode = node;
      }
    }
  });

  if (!mdNode) return null;

  const tpl = mdNode.quasi;
  const { quasis, expressions } = tpl;

  let out = "";

  for (let i = 0; i < quasis.length; i++) {
    const q = quasis[i];

    // 1. literal markdown chunk: use cooked text as-is
    const text =
      q.value && typeof q.value.cooked === "string" ? q.value.cooked : "";
    out += text.replaceAll("${", "\\${");

    // 2. interleaved JS expression as `${ ... }`
    if (i < expressions.length) {
      const expr = expressions[i];
      const exprSource = source.slice(expr.start, expr.end);
      out += "${" + exprSource + "}";
    }
  }

  return out;
}
)}

function _14(md){return(
md`## Markdown to Source`
)}

function _markdownToMdTagged(tokenizeMarkdownTemplate,escapeTemplateChunk){return(
function markdownToMdTagged(editableMarkdown) {
  const parts = tokenizeMarkdownTemplate(editableMarkdown);

  let out = "md`";

  for (const p of parts) {
    if (p.kind === "text") {
      out += escapeTemplateChunk(p.text);
    } else {
      out += "${" + p.source + "}";
    }
  }

  out += "`";
  return out;
}
)}

function _tokenizeMarkdownTemplate(){return(
function tokenizeMarkdownTemplate(input) {
  const parts = [];
  let i = 0;
  let buf = "";
  while (i < input.length) {
    if (
      input[i] === "$" &&
      input[i + 1] === "{" &&
      (i === 0 || input[i - 1] !== "\\")
    ) {
      if (buf) {
        parts.push({ kind: "text", text: buf });
        buf = "";
      }
      i += 2;
      let depth = 1;
      const start = i;
      while (i < input.length && depth > 0) {
        const ch = input[i];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
        i++;
      }
      if (depth !== 0) {
        throw new Error("Unbalanced ${...} in markdown template");
      }
      const exprSource = input.slice(start, i - 1);
      parts.push({ kind: "expr", source: exprSource.trim() });
    } else {
      buf += input[i++];
    }
  }
  if (buf) {
    parts.push({ kind: "text", text: buf });
  }
  return parts;
}
)}

function _escapeTemplateChunk(){return(
function escapeTemplateChunk(text) {
  let out = "";
  let i = 0;

  while (i < text.length) {
    // already-escaped placeholder \${...}
    if (text[i] === "\\" && text[i + 1] === "$" && text[i + 2] === "{") {
      out += "\\${";
      i += 3;
      continue;
    }

    // unescaped ${...} in text -> escape it so it stays literal
    if (text[i] === "$" && text[i + 1] === "{") {
      out += "\\${";
      i += 2;
      continue;
    }

    const ch = text[i++];
    if (ch === "\\") {
      out += "\\\\";
    } else if (ch === "`") {
      out += "\\`";
    } else {
      out += ch;
    }
  }

  return out;
}
)}

function _randstr(){return(
function randstr(prefix)
{
    return Math.random().toString(36).replace('0.',prefix || '');
}
)}

function _19(md){return(
md`## Tests`
)}

function _escaped_code_block_ojs(){return(
"md`\\${...}`"
)}

function _escaped_code_block_markdown(mdCellSourceToMarkdown,escaped_code_block_ojs){return(
mdCellSourceToMarkdown(escaped_code_block_ojs)
)}

function _test_mdCellSourceToMarkdown_escaped_placeholder(expect,mdCellSourceToMarkdown){return(
expect(
  mdCellSourceToMarkdown("md`\\${...}`")
).toBe("\\${...}")
)}

function _test_markdownToMdTagged_escaped_placeholder(expect,markdownToMdTagged,compile)
{
  const MARKDOWN = "\\${...}";
  const EXPECTED_TEMPLATE = "md`\\${...}`";
  expect(markdownToMdTagged(MARKDOWN)).toBe(EXPECTED_TEMPLATE);
  compile(EXPECTED_TEMPLATE);
}


function _test_escaped_placeholder_round_trip(mdCellSourceToMarkdown,expect,markdownToMdTagged)
{
  const cell = "title = md`\\${...}`";
  const markdown = mdCellSourceToMarkdown(cell);
  expect(markdown).toBe("\\${...}"); // runtime: "\${...}"

  const template = markdownToMdTagged(markdown);
  expect(template).toBe("md`\\${...}`"); // same as original tag
}


function _test_defaultMarkdownParser_preserves_escapes(prosemirror,expect)
{
  const result = prosemirror.defaultMarkdownParser.parse("\\${}");
  expect(result.content.content[0].content.content[0]).toEqual({
    text: "\\${}",
    type: "text"
  });
  return result;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["control","md"], _title);
  main.variable(observer("viewof control")).define("viewof control", ["Inputs"], _control);
  main.variable(observer("control")).define("control", ["Generators", "viewof control"], (G, _) => G.input(_));
  main.variable(observer()).define(["exporter"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["title"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("md")).define("md", ["randstr","originalMd","prosemirror","markdownToMdTagged","compile","runtime","decompile","mdCellSourceToMarkdown","invalidation"], _md);
  main.variable(observer("irToEditableText")).define("irToEditableText", _irToEditableText);
  main.variable(observer("replaceArgPlaceholders")).define("replaceArgPlaceholders", _replaceArgPlaceholders);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("test_mdCellSourceToMarkdown")).define("test_mdCellSourceToMarkdown", ["mdCellSourceToMarkdown"], _test_mdCellSourceToMarkdown);
  main.variable(observer("mdCellSourceToMarkdown")).define("mdCellSourceToMarkdown", ["acorn","acorn_walk"], _mdCellSourceToMarkdown);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("markdownToMdTagged")).define("markdownToMdTagged", ["tokenizeMarkdownTemplate","escapeTemplateChunk"], _markdownToMdTagged);
  main.variable(observer("tokenizeMarkdownTemplate")).define("tokenizeMarkdownTemplate", _tokenizeMarkdownTemplate);
  main.variable(observer("escapeTemplateChunk")).define("escapeTemplateChunk", _escapeTemplateChunk);
  main.variable(observer("randstr")).define("randstr", _randstr);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("escaped_code_block_ojs")).define("escaped_code_block_ojs", _escaped_code_block_ojs);
  main.variable(observer("escaped_code_block_markdown")).define("escaped_code_block_markdown", ["mdCellSourceToMarkdown","escaped_code_block_ojs"], _escaped_code_block_markdown);
  main.variable(observer("test_mdCellSourceToMarkdown_escaped_placeholder")).define("test_mdCellSourceToMarkdown_escaped_placeholder", ["expect","mdCellSourceToMarkdown"], _test_mdCellSourceToMarkdown_escaped_placeholder);
  main.variable(observer("test_markdownToMdTagged_escaped_placeholder")).define("test_markdownToMdTagged_escaped_placeholder", ["expect","markdownToMdTagged","compile"], _test_markdownToMdTagged_escaped_placeholder);
  main.variable(observer("test_escaped_placeholder_round_trip")).define("test_escaped_placeholder_round_trip", ["mdCellSourceToMarkdown","expect","markdownToMdTagged"], _test_escaped_placeholder_round_trip);
  main.variable(observer("test_defaultMarkdownParser_preserves_escapes")).define("test_defaultMarkdownParser_preserves_escapes", ["prosemirror","expect"], _test_defaultMarkdownParser_preserves_escapes);
  const child2 = runtime.module(define2);
  main.import("runtime", child2);
  main.import("md", "originalMd", child2);
  const child3 = runtime.module(define3);
  main.import("decompile", child3);
  main.import("compile", child3);
  main.import("acorn_walk", child3);
  main.import("acorn", child3);
  const child4 = runtime.module(define4);
  main.import("prosemirror", child4);
  main.import("hide_menu_css", child4);
  const child5 = runtime.module(define5);
  main.import("expect", child5);
  return main;
}
