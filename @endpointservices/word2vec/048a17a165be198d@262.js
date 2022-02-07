// https://observablehq.com/@tomlarkworthy/local-storage-view@262
import define1 from "./c2dae147641e012a@46.js";
import define2 from "./1f41fef8b019cf4e@91.js";
import define3 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# localStorageView: Non-invasive local persistance`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Lets make it simple to add local storage to a UI control (e.g. [@observablehq/inputs](/@observablehq/inputs))


We exploit back-writability and input binding to avoid having to mess with existing UI control code.

_localStorageView(key)_ creates a read/write view of a [safe-local-storage](/@mbostock/safe-local-storage). Because it's a view it can be [_synchronized_](https://observablehq.com/@observablehq/synchronized-inputs) to any control we want to provide persistence for.

We avoid having to write any _setItem_/_getItem_ imperative wiring.

If you want all users to share a networked value, consider [shareview](https://observablehq.com/@tomlarkworthy/shareview).

This works with an view that follows [design guidelines for views](https://observablehq.com/@tomlarkworthy/ui-linter?collection=@tomlarkworthy/ui).

~~~js
    import {localStorageView} from '@tomlarkworthy/local-storage-view'
~~~

### Change log
- 2021-11-21: Added json option which is true uses JSON.stringify/parse
- 2021-10-09: Added defaultValue option
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Demo

So starting with an ordinary control:`
)});
  main.variable(observer("viewof example1")).define("viewof example1", ["Inputs"], function(Inputs){return(
Inputs.range()
)});
  main.variable(observer("example1")).define("example1", ["Generators", "viewof example1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`We will use the excellent  [@mbostock/safe-local-storage](/@mbostock/safe-local-storage) which very nicely abstracts over enhanced privacy controls with an in memory fallback.`
)});
  const child1 = runtime.module(define1);
  main.import("localStorage", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`However, we don't want to have to mess around with our original control to add local persistence. Instead we create a writable [view](https://observablehq.com/@observablehq/introduction-to-views) of a local storage key`
)});
  main.variable(observer("viewof example1storage")).define("viewof example1storage", ["localStorageView"], function(localStorageView){return(
localStorageView("example1")
)});
  main.variable(observer("example1storage")).define("example1storage", ["Generators", "viewof example1storage"], (G, _) => G.input(_));
  main.variable(observer("localStorageView")).define("localStorageView", ["DOM","htl","inspect","localStorage","Inputs"], function(DOM,htl,inspect,localStorage,Inputs){return(
(
  key,
  { bindTo = undefined, defaultValue = null, json = false } = {}
) => {
  const id = DOM.uid().id;
  const ui = htl.html`<div class="observablehq--inspect" style="display:flex">
    <code>localStorageView(<span class="observablehq--string">"${key}"</span>): </code><span id="${id}">${inspect(
    localStorage.getItem(key) || defaultValue
  )}</span>
  </div>`;
  const holder = ui.querySelector(`#${id}`);

  const view = Object.defineProperty(ui, "value", {
    get: () => {
      const val = json
        ? JSON.parse(localStorage.getItem(key))
        : localStorage.getItem(key);
      return val || defaultValue;
    },
    set: (value) => {
      value = json ? JSON.stringify(value) : value;
      holder.removeChild(holder.firstChild);
      holder.appendChild(inspect(localStorage.getItem(key) || defaultValue));
      localStorage.setItem(key, value);
    },
    enumerable: true
  });

  if (bindTo) {
    Inputs.bind(bindTo, view);
  }

  return view;
}
)});
  main.variable(observer()).define(["localStorageView"], function(localStorageView){return(
localStorageView.value
)});
  main.variable(observer()).define(["md"], function(md){return(
md`And we bind our original control to the key view`
)});
  main.variable(observer()).define(["Inputs","viewof example1","viewof example1storage"], function(Inputs,$0,$1){return(
Inputs.bind($0, $1)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Tada! that control will now persist its state across page refreshes.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### JSON support

Set *json* to true to *serde*.`
)});
  main.variable(observer("viewof jsonView")).define("viewof jsonView", ["localStorageView"], function(localStorageView){return(
localStorageView("json", {
  json: true
})
)});
  main.variable(observer("jsonView")).define("jsonView", ["Generators", "viewof jsonView"], (G, _) => G.input(_));
  main.variable(observer()).define(["jsonView"], function(jsonView){return(
jsonView
)});
  main.variable(observer()).define(["viewof jsonView"], function($0){return(
$0.value
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Writing`
)});
  main.variable(observer()).define(["viewof jsonView","Event"], function($0,Event)
{
  $0.value = {
    rnd: Math.random()
  };
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### In two cells

It is quite likely we often just want to create the view and bind it to a ui control so just pass the viewof in as the _bindTo_ option in the 2nd argument
`
)});
  main.variable(observer("viewof example2")).define("viewof example2", ["Inputs"], function(Inputs){return(
Inputs.textarea()
)});
  main.variable(observer("example2")).define("example2", ["Generators", "viewof example2"], (G, _) => G.input(_));
  main.variable(observer()).define(["localStorageView","viewof example2"], function(localStorageView,$0){return(
localStorageView("example2", {
  bindTo: $0
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### In a single cell!

You can even declare a UI control, wrap it with local storage and return in a single cell! (thanks @mbostock!)
`
)});
  main.variable(observer("viewof example3")).define("viewof example3", ["Inputs","localStorageView"], function(Inputs,localStorageView){return(
Inputs.bind(Inputs.textarea(), localStorageView("example3"))
)});
  main.variable(observer("example3")).define("example3", ["Generators", "viewof example3"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("inspect", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
