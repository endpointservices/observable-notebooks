import define1 from "./1f41fef8b019cf4e@94.js";
import define2 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# urlQueryFieldView: Non-invasive URL field persistence`
)}

function _2(md){return(
md`Lets make it simple to bind a URL query field to a UI control (e.g. [@observablehq/inputs](/@observablehq/inputs))

We exploit back-writability and input binding to avoid having to mess with existing UI control code.

_urlQueryFieldView(field)_ creates a URL decoded view of the field in the URL query string. Because it's a view it can be [_synchronized_](https://observablehq.com/@observablehq/synchronized-inputs) to any control we want to provide persistence for.

If you want all users to share a networked value, consider [shareview](https://observablehq.com/@tomlarkworthy/shareview).

This works with an view that follows [design guidelines for views](https://observablehq.com/@tomlarkworthy/ui-linter?collection=@tomlarkworthy/ui). A similar notebook that uses local storageis the [localStorageView](https://observablehq.com/@tomlarkworthy/local-storage-view).

~~~js
    import {urlQueryFieldView} from '@tomlarkworthy/url-query-field-view'
~~~

`
)}

function _urlQueryFieldView(DOM,URLSearchParams,location,htl,inspect,html,Inputs){return(
(
  field,
  {
    defaultValue = undefined,
    decode = (field) => field,
    write = false,
    hash = undefined,
    bindTo = undefined
  } = {}
) => {
  if (typeof decode !== "function")
    throw new Error("decode must be a function");

  const id = DOM.uid().id;

  const readField = () => {
    const v =
      new URLSearchParams(
        /*allow overriding */ window.rEPseDFzXFSPYkNz || location.search
      ).get(field) || undefined;
    return v ? decode(v) : defaultValue;
  };

  let cache = readField();

  const ui = htl.html`<div class="observablehq--inspect" style="display:flex">
    <code>urlQueryFieldView(<span class="observablehq--string">"${field}"</span>): </code><span id="${id}">${inspect(
    cache
  )}</span>
  </div>`;
  const holder = ui.querySelector(`#${id}`);

  const view = Object.defineProperty(ui, "value", {
    get: () => {
      return cache;
    },
    set: (value) => {
      const search = new URLSearchParams(location.search);
      search.set(field, value);
      cache = value;
      if (write) {
        if (!hash.startsWith("#")) hash = "#" + hash;
        html`<a href="?${
          search.toString() + (hash || location.hash)
        }">`.click();
      }
    },
    enumerable: true
  });

  if (bindTo) {
    Inputs.bind(bindTo, view);
  }

  return view;
}
)}

function _4(md){return(
md`## Examples`
)}

function _5(md){return(
md`We can bind to a UI component inline with instanciating it with

\`Inputs.bind(<CONTROL>, urlQueryFieldView(<FIELD>))\``
)}

function _c1(Inputs,urlQueryFieldView){return(
Inputs.bind(Inputs.text({ label: "c1" }), urlQueryFieldView("c1"))
)}

function _7(c1){return(
c1
)}

function _8(md){return(
md`Or we can bind in an adjacent cells with

\`Inputs.bind(viewof <CELL>, urlQueryFieldView(<FIELD>));\``
)}

function _c2(Inputs){return(
Inputs.text({ label: "c2" })
)}

function _c2sideBind(Inputs,$0,urlQueryFieldView)
{
  Inputs.bind($0, urlQueryFieldView("c2"));
}


function _11(md){return(
md`### Links

To demonstrate it works just follow this links which updated the URL


set [c1=foo](?c1=foo#c1)

set [c2=nice](?c2=nice#c2)


set [c1=bar&c2=nice](?c1=bar&c2=nice#c1)
`
)}

function _12(md){return(
md`Tada! note the UI controls update based on the URL, if you know the name of the cells you can also set the URL hash to get the page to navigate after the load too`
)}

function _13(md){return(
md`### Custom decode

The second argument is the *options*, which includes "decode". Here you can apply a function to the value so you can decode to types other than strings. Note all params have \`decodeURIComponent\` applied first


try clicking [json=[{t:0, c: red}]](?json=${encodeURIComponent(JSON.stringify({t:0, c: "red"}))}#json)`
)}

function _json(urlQueryFieldView){return(
urlQueryFieldView("json", { decode: JSON.parse })
)}

function _15(json){return(
json
)}

function _16(md){return(
md`## Back-writing

The view supports backwriting, which will cause a navigation event. As this is intrusive and not often required, it is turned off by default. To enable it, set the option \`write\` to \`true\`. This will do a top level navigation via link automation, so it will only works if the user initiates the action. It keeps unrelated fields and the URL hash unchanged.

By adding a \`hash\` parameter you can also control the URL hash`
)}

function _c3(Inputs,urlQueryFieldView){return(
Inputs.bind(
  Inputs.text({
    label: "c3",
    submit: true,
    placeholder: "try something"
  }),
  urlQueryFieldView("c3", { write: true, hash: "c3" })
)
)}

function _20(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("urlQueryFieldView")).define("urlQueryFieldView", ["DOM","URLSearchParams","location","htl","inspect","html","Inputs"], _urlQueryFieldView);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof c1")).define("viewof c1", ["Inputs","urlQueryFieldView"], _c1);
  main.variable(observer("c1")).define("c1", ["Generators", "viewof c1"], (G, _) => G.input(_));
  main.variable(observer()).define(["c1"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof c2")).define("viewof c2", ["Inputs"], _c2);
  main.variable(observer("c2")).define("c2", ["Generators", "viewof c2"], (G, _) => G.input(_));
  main.variable(observer("c2sideBind")).define("c2sideBind", ["Inputs","viewof c2","urlQueryFieldView"], _c2sideBind);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof json")).define("viewof json", ["urlQueryFieldView"], _json);
  main.variable(observer("json")).define("json", ["Generators", "viewof json"], (G, _) => G.input(_));
  main.variable(observer()).define(["json"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof c3")).define("viewof c3", ["Inputs","urlQueryFieldView"], _c3);
  main.variable(observer("c3")).define("c3", ["Generators", "viewof c3"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("inspect", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _20);
  return main;
}
