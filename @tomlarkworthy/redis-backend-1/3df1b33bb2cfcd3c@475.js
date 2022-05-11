// https://observablehq.com/@mbostock/synchronized-views@475
import define1 from "./4caee69e966109c8@35.js";

function _1(md){return(
md`# Synchronized Views

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Feb. 2021:*** *Observable now supports [**synchronized inputs**](/@observablehq/synchronized-inputs)! This notebook will remain for history, but please upgrade to [Observable Inputs](/@observablehq/inputs).*</p>

[A view](/@mbostock/introduction-to-views) conveniently defines an interactive value.`
)}

function _x(html){return(
html`<input type=range>`
)}

function _3(x){return(
x
)}

function _4(md){return(
md`While each interactive value is often independent, other times multiple controls manipulate a shared value. This requires synchronizing views such that interaction with any one view updates both the interactive value and the other views.

One way to synchronize is to treat [views as mutable values](/@mbostock/views-are-mutable-values): make one view the “primary” view, and have the other “secondary” views listen to and mutate the primary view. But sometimes it isn’t obvious which view should be primary.

A more general approach is a *minimal* view: a container for a mutable value that implements the [EventTarget](https://developer.mozilla.org/docs/Web/API/EventTarget) interface, making it compatible with \`viewof\`. This minimal view also exposes a *view*.value property representing its current value; setting the value causes the view to dispatch an *input* event, which in turn causes Observable to [rerun](/@mbostock/how-observable-runs) any referencing cells.`
)}

function _View(bind){return(
class View {
  constructor(value) {
    Object.defineProperties(this, {
      _list: {value: [], writable: true},
      _value: {value, writable: true}
    });
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this.dispatchEvent(new CustomEvent("input", {detail: value}));
  }
  addEventListener(type, listener) {
    if (type != "input" || this._list.includes(listener)) return;
    this._list = [listener].concat(this._list);
  }
  removeEventListener(type, listener) {
    if (type != "input") return;
    this._list = this._list.filter(l => l !== listener);
  }
  dispatchEvent(event) {
    const p = Promise.resolve(event);
    this._list.forEach(l => p.then(l));
  }
  bind(input, invalidation) {
    return bind(input, this, invalidation);
  }
}
)}

function _6(md){return(
md`Now let’s define a minimal view whose initial value is 42:`
)}

function _y(View){return(
new View(42)
)}

function _8(md){return(
md`Here’s our view’s value:`
)}

function _9(y){return(
y
)}

function _10(md){return(
md`And now let’s define an input that both listens to the minimal view and assigns a new value on interaction. Notice that dragging the slider changes the value of *y*.`
)}

function _11($0,html){return(
$0.bind(html`<input type=range min=0 max=100 step=1>`)
)}

function _12(md){return(
md`Here are two more inputs (of different types!) bound to the same view. Interacting with either view below updates *y* as well as the other synchronized inputs above.`
)}

function _13($0,html){return(
$0.bind(html`<input type=range min=0 max=100 step=1>`)
)}

function _14($0,html){return(
$0.bind(html`<input type=number min=0 max=100 step=1>`)
)}

function _15(y){return(
y
)}

function _16(md){return(
md`It works with text, too.`
)}

function _name(View){return(
new View("fred")
)}

function _18($0,html){return(
$0.bind(html`<input type=text>`)
)}

function _19($0,html){return(
$0.bind(html`<input type=text>`)
)}

function _20(name){return(
name
)}

function _toggled(View){return(
new View(true)
)}

function _22($0,html){return(
$0.bind(html`<input type=checkbox>`)
)}

function _23($0,html){return(
$0.bind(html`<input type=checkbox>`)
)}

function _24(toggled){return(
toggled
)}

function _25(md){return(
md`---

## Appendix

This implementation uses my [disposal promise](/@mbostock/disposal) to detach bound inputs, rather than requiring you to pass the [invalidation promise](/@observablehq/invalidation) explicitly. The unification of various input types is based on [Generators.input](https://github.com/observablehq/stdlib/blob/master/README.md#Generators_input) from the Observable standard library.`
)}

function _bind(disposal,set,eventof,get){return(
function bind(input, view, invalidation = disposal(input)) {
  set(input, view.value);
  input[`on${eventof(input)}`] = () => view.value = get(input);
  const update = ({detail: value}) => get(input) === value || set(input, value);
  view.addEventListener("input", update);
  invalidation.then(() => view.removeEventListener("input", update));
  return input;
}
)}

function _get(){return(
function get(input) {
  switch (input.type) {
    case "range":
    case "number": return input.valueAsNumber;
    case "date": return input.valueAsDate;
    case "checkbox": return input.checked;
    case "file": return input.multiple ? input.files : input.files[0];
    default: return input.value;
  }
}
)}

function _set(){return(
function set(input, value) {
  switch (input.type) {
    case "range":
    case "number": input.valueAsNumber = value; break;
    case "date": input.valueAsDate = value; break;
    case "checkbox": input.checked = value; break;
    case "file": input.multiple ? (input.files = value) : (input.files = [value]); break;
    default: input.value = value;
  }
}
)}

function _eventof(){return(
function eventof(input) {
  switch (input.type) {
    case "button":
    case "submit": return "click";
    case "file": return "change";
    default: return "input";
  }
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof x")).define("viewof x", ["html"], _x);
  main.variable(observer("x")).define("x", ["Generators", "viewof x"], (G, _) => G.input(_));
  main.variable(observer()).define(["x"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("View")).define("View", ["bind"], _View);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof y")).define("viewof y", ["View"], _y);
  main.variable(observer("y")).define("y", ["Generators", "viewof y"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["y"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["viewof y","html"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["viewof y","html"], _13);
  main.variable(observer()).define(["viewof y","html"], _14);
  main.variable(observer()).define(["y"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof name")).define("viewof name", ["View"], _name);
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof name","html"], _18);
  main.variable(observer()).define(["viewof name","html"], _19);
  main.variable(observer()).define(["name"], _20);
  main.variable(observer("viewof toggled")).define("viewof toggled", ["View"], _toggled);
  main.variable(observer("toggled")).define("toggled", ["Generators", "viewof toggled"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof toggled","html"], _22);
  main.variable(observer()).define(["viewof toggled","html"], _23);
  main.variable(observer()).define(["toggled"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("bind")).define("bind", ["disposal","set","eventof","get"], _bind);
  main.variable(observer("get")).define("get", _get);
  main.variable(observer("set")).define("set", _set);
  main.variable(observer("eventof")).define("eventof", _eventof);
  const child1 = runtime.module(define1);
  main.import("disposal", child1);
  return main;
}
