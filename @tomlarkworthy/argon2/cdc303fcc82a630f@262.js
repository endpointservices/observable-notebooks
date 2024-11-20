import define1 from "./f92778131fd76559@1208.js";

function _1(md){return(
md`# Reversible attachment

_reversibleAttach_ allows you toggle whether a view is attached to a composite view at runtime. This is useful for development when building views hierarchically, as you can use the _reversibleAttach_ to work on isolated pieces or the whole.

The value remain accessible in both places. Works with both \`Inputs.form\` and \`@tomlarkworthy/view\`, the latter supports back-driving values, which only works when the attachment is active.

\`\`\`js
import {reversibleAttach} from '@tomlarkworthy/reversible-attachment'
\`\`\``
)}

function _attach(Inputs){return(
Inputs.toggle({
  label: "attach"
})
)}

function _3(md){return(
md`## child view`
)}

function _child(Inputs){return(
Inputs.text()
)}

function _5(md){return(
md`## parent view ([@tomlarkworthy/view](https://observablehq.com/@tomlarkworthy/view))`
)}

function _parent(view,reversibleAttach,attach,$0){return(
view`<div>
${["child", reversibleAttach(attach, $0)]}
</div>`
)}

function _7(md){return(
md`Note changes propogate to both`
)}

function _8(child){return(
child
)}

function _9(parent){return(
parent
)}

function _10(md){return(
md`Backdrivability works `
)}

function _11(Inputs,$0,Event){return(
Inputs.button("backdrive parent", {
  reduce: () => {
    $0.value.child = Math.random();
    $0.child.dispatchEvent(new Event("input", { bubbles: true }));
  }
})
)}

function _12(md){return(
md`## grandparent view ([Inputs.form](https://observablehq.com/@observablehq/input-form))`
)}

function _attach_gp(Inputs){return(
Inputs.toggle({
  label: "attach gradparent"
})
)}

function _grand_parent(Inputs,reversibleAttach,attach_gp,$0){return(
Inputs.form({
  parent: reversibleAttach(attach_gp, $0)
})
)}

function _15(grand_parent){return(
grand_parent
)}

function _16(Inputs,$0,Event){return(
Inputs.button("backdrive grand_parent", {
  reduce: () => {
    $0.value.parent.child = Math.random();
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})
)}

function _17(md){return(
md`---`
)}

function _parents(){return(
new Map()
)}

function _reversibleAttach(parents,bindOneWay){return(
function reversibleAttach(shouldBind, view, invalidation) {
  if (!parents.has(view) && view.parentElement) {
    parents.set(view, view.parentElement);
  }
  if (shouldBind) {
    return view;
  } else {
    if (parents.has(view)) {
      const parent = parents.get(view);
      if (parent.firstChild !== view) parent.appendChild(view);
    }
    const dummy = document.createTextNode("<detached>");
    return bindOneWay(dummy, view, invalidation);
  }
}
)}

function _22(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof attach")).define("viewof attach", ["Inputs"], _attach);
  main.variable(observer("attach")).define("attach", ["Generators", "viewof attach"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof child")).define("viewof child", ["Inputs"], _child);
  main.variable(observer("child")).define("child", ["Generators", "viewof child"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof parent")).define("viewof parent", ["view","reversibleAttach","attach","viewof child"], _parent);
  main.variable(observer("parent")).define("parent", ["Generators", "viewof parent"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["child"], _8);
  main.variable(observer()).define(["parent"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Inputs","viewof parent","Event"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof attach_gp")).define("viewof attach_gp", ["Inputs"], _attach_gp);
  main.variable(observer("attach_gp")).define("attach_gp", ["Generators", "viewof attach_gp"], (G, _) => G.input(_));
  main.variable(observer("viewof grand_parent")).define("viewof grand_parent", ["Inputs","reversibleAttach","attach_gp","viewof parent"], _grand_parent);
  main.variable(observer("grand_parent")).define("grand_parent", ["Generators", "viewof grand_parent"], (G, _) => G.input(_));
  main.variable(observer()).define(["grand_parent"], _15);
  main.variable(observer()).define(["Inputs","viewof grand_parent","Event"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("parents")).define("parents", _parents);
  main.variable(observer("reversibleAttach")).define("reversibleAttach", ["parents","bindOneWay"], _reversibleAttach);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("bindOneWay", child1);
  main.variable(observer()).define(["footer"], _22);
  return main;
}
