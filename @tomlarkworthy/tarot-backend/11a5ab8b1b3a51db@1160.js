// https://observablehq.com/@observablehq/htl@1160
function _1(md){return(
md`# Hypertext Literal

Inspired by [lit-html](https://lit-html.polymer-project.org/) and [HTM](https://github.com/developit/htm), and referencing the fantastically precise [HTML5 spec](https://html.spec.whatwg.org/multipage/parsing.html#tokenization), we built [hypertext literal](https://github.com/observablehq/htl): a tagged template literal for HTML which interpolates values *based on context*, allowing automatic escaping and the interpolation of non-serializable values, such as event listeners, style objects, and other DOM nodes.`
)}

function _installing(md){return(
md`Hypertext literal is [open-source](https://github.com/observablehq/htl), small (2KB), has no dependencies, and is available [on npm](https://www.npmjs.com/package/htl). To use hypertext literal in Observable, use htl.**html** or htl.**svg** instead of **html** or **svg**.`
)}

function _why(md){return(
md`## Why not concatenate?

Surely the simplest way to generate web content is to write [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML). Modern JavaScript makes it easier than ever to interpolate values into literal HTML thanks to [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).`
)}

function _value1(){return(
"world"
)}

function _5(value1){return(
`<h1>Hello ${value1}</h1>`
)}

function _6(md){return(
md`Yet simple concatenation has two significant drawbacks.

First, it confounds markup with text and other content. If an interpolated value happens to include characters that are meaningful markup, the result may render unexpectedly. An ampersand (&) can be interpreted as a character entity reference, for instance.`
)}

function _value2(){return(
"dollars&pounds"
)}

function _8(unsafe_html,value2){return(
unsafe_html`My favorite currencies are ${value2}.`
)}

function _9(md){return(
md`This can be fixed by escaping (say replacing ampersands with the corresponding entity, ${document.createTextNode("&amp;")}). But you must remember to escape every time you interpolate, which is tedious! And it’s easy to forget when many values work as intended without it.`
)}

function _safe_value2(){return(
"dollars&pounds".replace(/&/g, "&amp;")
)}

function _11(unsafe_html,safe_value2){return(
unsafe_html`My favorite currencies are ${safe_value2}.`
)}

function _12(md){return(
md`Second, concatenation impedes composition: interpolated content must be serialized as markup. You cannot combine literal HTML with content created by the DOM API, or a library such as React or D3. And some content, such as event listeners implemented as closures, can’t be serialized!`
)}

function _features(md){return(
md`## Features

Hypertext literal is a tagged template literal that renders the specified markup as an element, text node, or null as appropriate.`
)}

function _14(html){return(
html`<i>I’m an element!</i>`
)}

function _15(html){return(
html`I’m simply text.`
)}

function _16(html){return(
html``
)}

function _17(md){return(
md`If multiple top-level nodes are given, the nodes are implicitly wrapped in a SPAN element.`
)}

function _18(html){return(
html`I’m an <i>implicit</i> span.`
)}

function _19(md){return(
md`If you’d prefer a [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) instead, as when composing hypertext literal fragments, call html.fragment. (Observable doesn’t display fragments because it would dissolve them!)`
)}

function _20(html){return(
html.fragment`I’m a <i>document fragment</i>.`
)}

function _21(md){return(
md`### Automatic escaping

If a value is interpolated into an attribute value or data, it is escaped appropriately so as to not change the structure of the surrounding markup.`
)}

function _22(html){return(
html`Look, Ma, ${"<i>automatic escaping</i>"}!`
)}

function _23(html){return(
html`<font color=${"red"}>This text has color.</font>`
)}

function _24(md){return(
md`In cases where it is not possible to interpolate safely, namely with script and style elements where the interpolated value contains the corresponding end tag, an error is thrown.`
)}

function _25(html){return(
html`<script>${"</script>"}</script>`
)}

function _26(md){return(
md`### Styles

You can safely interpolate into style properties, too, by specifying the style attribute as an object literal.`
)}

function _27(html){return(
html`<span style=${{background: "yellow"}}>It’s all yellow!</span>`
)}

function _28(md){return(
md`You can interpolate into a style attribute as a string, too, but use caution: automatic escaping will still allow you to set multiple style properties this way, or to generate invalid CSS.`
)}

function _29(html){return(
html`<span style="background: ${"yellow; font-style: italic"};">It’s yellow (and italic).</span>`
)}

function _30(md){return(
md`### Function attributes

If an attribute value is a function, it is assigned as a property. This can be used to register event listeners.`
)}

function _31(html,$0){return(
html`<button onclick=${() => ++$0.value}>click me</button>`
)}

function _clicks(){return(
0
)}

function _33(md){return(
md`### Boolean attributes

If an attribute value is false, it’s as if the attribute hadn’t been specified. If an attribute value is true, it’s equivalent to the empty string.`
)}

function _34(html){return(
html`<button disabled=${true}>Can’t click me</button>`
)}

function _35(md){return(
md`### Optional values

If an attribute value is null or undefined, it’s as if the attribute hadn’t been specified. If a data value is null or undefined, nothing is embedded.`
)}

function _36(html){return(
html`<button disabled=${null}>Can click me</button>`
)}

function _37(html){return(
html`There’s no ${null} here.`
)}

function _38(html){return(
html`${html``}`
)}

function _39(md){return(
md`### Spread attributes

You can set multiple attributes (or styles, or event listeners) by interpolating an object in place of attributes.`
)}

function _40(html){return(
html`<span ${{style: {background: "yellow", fontWeight: "bold"}}}>whoa</span>`
)}

function _41(html){return(
html`<span ${{
  onmouseover() { this.style.background = "yellow"; },
  onmousedown() { this.style.background = "red"; },
  onmouseup() { this.style.background = "yellow"; },
  onmouseout() { this.style.background = ""; }
}}>hover me</span>`
)}

function _42(md){return(
md`### Node values

If an interpolated data value is a node, it is inserted into the result at the corresponding location. So if you have a function that generates a node (say itself using hypertext literal), you can embed the result into another hypertext literal.`
)}

function _emphasize(html){return(
function emphasize(text) {
  return html`<i>${text}</i>`;
}
)}

function _44(html,emphasize){return(
html`This is ${emphasize("really")} important.`
)}

function _45(md){return(
md`### Iterable values

You can interpolate iterables into data, too, even iterables of nodes. This is useful for mapping data to content via [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) or [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). Typically, you should use html.fragment for the embedded expressions.`
)}

function _46(html,d3){return(
html`<table style="width: 180px;">
  <thead><tr><th>#</th><th>Color</th><th>Swatch</th></tr></thead>
  <tbody>${d3.schemeCategory10.map((color, i) => html.fragment`<tr>
    <td>${i}</td>
    <td>${color}</td>
    <td style=${{background: color}}></td>
  </tr>`)}</tbody>
</table>`
)}

function _47(html){return(
html`It’s as easy as ${new Set([1, 2, 3])}.`
)}

function _48(md){return(
md`### SVG

You can create contextual SVG fragments using hypertext literals, too.`
)}

function _49(svg){return(
svg`<svg width=60 height=60>
  ${svg.fragment`<circle cx=30 cy=30 r=30></circle>`}
</svg>`
)}

function _50(md){return(
md`### Errors on invalid bindings

Hypertext literal tolerates malformed input—per the HTML5 specification—but it still tries to be helpful by throwing an error if you interpolate a value into an unexpected place. For instance, it doesn’t allow dynamic tag names.`
)}

function _51(html){return(
html`<${"button"}>Does this work?</>`
)}

function _52(md){return(
md`## How it works

Under the hood, hypertext literal implements a subset of the [HTML5 tokenizer](https://html.spec.whatwg.org/multipage/parsing.html#tokenization) state machine. This allows it to distinguish between tags, attributes, and the like. And so wherever an embedded expression occurs, it can be interpreted correctly.`
)}

function _53(dot){return(
dot`digraph "" {
  node [fontname="var(--sans-serif)" fontsize=12];
  edge [fontname="var(--sans-serif)" fontsize=12];

  data [shape = doublecircle]
  data -> "tag open" [label = "<"]
  data -> data [label = "*"]

  "tag open"
  "tag open" -> "markup declaration open" [label = "!"]
  "tag open" -> "end tag open" [label = "/"]
  "tag open" -> "tag name" [label = "ASCII alpha"]
  "tag open" -> "bogus comment" [label = "?"]
  "tag open" -> "data" [label = "*"]

  "end tag open"
  "end tag open" -> "tag name" [label = "ASCII alpha"]
  "end tag open" -> "data" [label = ">"]
  "end tag open" -> "bogus comment" [label = "*"]

  "tag name"
  "tag name" -> "before attribute name" [label = "space"]
  "tag name" -> "self-closing start tag" [label = "/"]
  "tag name" -> "data" [label = ">"]
  "tag name" -> "tag name" [label = "*"]

  "self-closing start tag"
  "self-closing start tag" -> data [label = ">"]
  "self-closing start tag" -> "before attribute name" [label = "*"]

  "before attribute name"
  "before attribute name" -> "after attribute name" [label = "/"]
  "before attribute name" -> "after attribute name" [label = ">"]
  "before attribute name" -> "attribute name" [label = "*"]

  "attribute name"
  "attribute name" -> "after attribute name" [label = space]
  "attribute name" -> "after attribute name" [label = "/"]
  "attribute name" -> "after attribute name" [label = ">"]
  "attribute name" -> "before attribute value" [label = "="]
  "attribute name" -> "attribute name" [label = "*"]

  "after attribute name"
  "after attribute name" -> "self-closing start tag" [label = "/"]
  "after attribute name" -> "before attribute value" [label = "="]
  "after attribute name" -> "data"  [label = ">"]
  "after attribute name" -> "attribute name" [label = "*"]

  "before attribute value"
  "before attribute value" -> "before attribute value" [label = space]
  "before attribute value" -> "attribute value (double-quoted)" [label = "double-quote"]
  "before attribute value" -> "attribute value (single-quoted)" [label = "single-quote"]
  "before attribute value" -> "data" [label = ">"]
  "before attribute value" -> "attribute value (unquoted)" [label = "*"]

  "attribute value (double-quoted)"
  "attribute value (double-quoted)" -> "after attribute value (quoted)" [label = "double-quote"]
  "attribute value (double-quoted)" -> "attribute value (double-quoted)" [label = "*"]

  "attribute value (single-quoted)"
  "attribute value (single-quoted)" -> "after attribute value (quoted)" [label = "single-quote"]
  "attribute value (single-quoted)" -> "attribute value (single-quoted)" [label = "*"]

  "attribute value (unquoted)"
  "attribute value (unquoted)" -> "before attribute name" [label = space]
  "attribute value (unquoted)" -> "data" [label = ">"]
  "attribute value (unquoted)" -> "attribute value (unquoted)" [label = "*"]

  "after attribute value (quoted)"
  "after attribute value (quoted)" -> "self-closing start tag" [label = "/"]
  "after attribute value (quoted)" -> "data" [label = ">"]
  "after attribute value (quoted)" -> "before attribute name" [label = "*"]

  "bogus comment"
  "bogus comment" -> data [label = ">"]
  "bogus comment" -> "bogus comment" [label = "*"]

  "markup declaration open"
  "markup declaration open" -> "comment start" [label = "--"]
  "markup declaration open" -> "bogus comment" [label = "*"]

  "comment start"
  "comment start" -> "comment start dash" [label = "-"]
  "comment start" -> "data" [label = ">"]
  "comment start" -> "comment" [label = "*"]

  "comment start dash"
  "comment start dash" -> "comment end" [label = "-"]
  "comment start dash" -> "data" [label = ">"]
  "comment start dash" -> "comment" [label = "*"]

  "comment"
  "comment" -> "comment less-than sign" [label = "<"]
  "comment" -> "comment end dash" [label = "-"]
  "comment" -> "comment" [label = "*"]

  "comment less-than sign"
  "comment less-than sign" -> "comment less-than sign bang" [label = "!"]
  "comment less-than sign" -> "comment" [label = "*"]

  "comment less-than sign bang"
  "comment less-than sign bang" -> "comment less-than sign bang dash" [label = "-"]
  "comment less-than sign bang" -> "comment" [label = "*"]

  "comment less-than sign bang dash"
  "comment less-than sign bang dash" -> "comment less-than sign bang dash dash" [label = "-"]
  "comment less-than sign bang dash" -> "comment end dash" [label = "*"]

  "comment less-than sign bang dash dash"
  "comment less-than sign bang dash dash" -> "comment end" [label = "*"]

  "comment end dash"
  "comment end dash" -> "comment end" [label = "-"]
  "comment end dash" -> "comment" [label = "*"]

  "comment end"
  "comment end" -> "data" [label = ">"]
  "comment end" -> "comment end bang" [label = "!"]
  "comment end" -> "comment end" [label = "-"]
  "comment end" -> "comment" [label = "*"]

  "comment end bang"
  "comment end bang" -> "comment end dash" [label = "-"]
  "comment end bang" -> "data" [label = ">"]
  "comment end bang" -> "comment" [label = "*"]
}`
)}

function _54(md){return(
md`Our approach is more formal (and, if you like, more precise) than lit-html, which uses regular expressions to search for “attribute-like sequences” in markup. And while our approach requires scanning the input, the state machine is pretty fast.`
)}

function _55(md){return(
md`Also unlike lit-html, hypertext literal directly creates content rather than reusable templates. Hypertext literal is thus well-suited to Observable, where our [dataflow runtime](/@observablehq/how-observable-runs) runs cells automatically when inputs change. If you want incremental updates for performance (or transitions), you can opt-in, but it’s nice to keep things simple by default.`
)}

function _56(md){return(
md`We also wanted to minimize new syntax. We were inspired by [HTM](https://github.com/developit/htm), but HTM emulates JSX—not HTML5—requiring closing tags for every element. HTM’s approach would also need to be adapted for contextual namespaces, such as SVG, since it creates content bottom-up.`
)}

function _57(md){return(
md`For a closer look at our implementation, please [view the source](https://github.com/observablehq/htl) and let us know what you think! We welcome your contributions and bug reports on GitHub.`
)}

function _58(md){return(
md`---

## Appendix`
)}

function _html(htl){return(
htl.html
)}

function _svg(htl){return(
htl.svg
)}

function _unsafe_html(){return(
function unsafe_html() {
  const span = document.createElement("span");
  span.innerHTML = String.raw.apply(this, arguments);
  return span;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("installing")).define("installing", ["md"], _installing);
  main.variable(observer("why")).define("why", ["md"], _why);
  main.variable(observer("value1")).define("value1", _value1);
  main.variable(observer()).define(["value1"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("value2")).define("value2", _value2);
  main.variable(observer()).define(["unsafe_html","value2"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("safe_value2")).define("safe_value2", _safe_value2);
  main.variable(observer()).define(["unsafe_html","safe_value2"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("features")).define("features", ["md"], _features);
  main.variable(observer()).define(["html"], _14);
  main.variable(observer()).define(["html"], _15);
  main.variable(observer()).define(["html"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["html"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["html"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["html"], _22);
  main.variable(observer()).define(["html"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["html"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["html"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["html"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["html","mutable clicks"], _31);
  main.define("initial clicks", _clicks);
  main.variable(observer("mutable clicks")).define("mutable clicks", ["Mutable", "initial clicks"], (M, _) => new M(_));
  main.variable(observer("clicks")).define("clicks", ["mutable clicks"], _ => _.generator);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["html"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["html"], _36);
  main.variable(observer()).define(["html"], _37);
  main.variable(observer()).define(["html"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["html"], _40);
  main.variable(observer()).define(["html"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("emphasize")).define("emphasize", ["html"], _emphasize);
  main.variable(observer()).define(["html","emphasize"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["html","d3"], _46);
  main.variable(observer()).define(["html"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["svg"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["html"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["dot"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("html")).define("html", ["htl"], _html);
  main.variable(observer("svg")).define("svg", ["htl"], _svg);
  main.variable(observer("unsafe_html")).define("unsafe_html", _unsafe_html);
  return main;
}
