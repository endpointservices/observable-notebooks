import define1 from "./048a17a165be198d@271.js";
import define2 from "./e1e1342567637708@810.js";
import define3 from "./ef672b935bd480fc@623.js";
import define4 from "./653c46ed55693b1f@674.js";
import define5 from "./bb2055d580bbbab2@106.js";
import define6 from "./b0b80d7a567305c3@10.js";
import define7 from "./f92778131fd76559@1208.js";
import define8 from "./4a1fa3c167b752e5@324.js";

function _1(md){return(
md`# Community Help`
)}

function _2(md){return(
md`### Basic code editor`
)}

function _editor(Inputs,localStorageView){return(
Inputs.bind(Inputs.text(), localStorageView("code"))
)}

function _5(Inputs,$0,Event){return(
Inputs.button("set code", {
  reduce: () => {
    $0.value = "example";
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _6(md){return(
md`### [Code mirror editor](https://talk.observablehq.com/t/transitive-synchronized-inputs/8597/13)
`
)}

function _codemirror(Inputs,CodeMirror,localStorageView){return(
Inputs.bind(
  CodeMirror("initial text", {
    extensions: [],
    keymaps: []
  }),
  localStorageView("code")
)
)}

function _9(md){return(
md`### Autocomplete on arrays`
)}

function _elements(){return(
[{ bar: true }]
)}

function _expr(elements){return(
elements[0]
)}

function _12(md){return(
md`## [Reactively update content within the same cell?](https://talk.observablehq.com/t/reactively-update-content-within-the-same-cell/7033)

you can manually use addEventListener to wire up reactivity as shown below

@tomlarkworthy/view also has \`bindOneWay\` with a similar exampkle that acheive the below but with a functional transform 
see https://observablehq.com/@tomlarkworthy/view#levels`
)}

function _reactiveMultiControlUI(Inputs,invalidation)
{
  const answer = Inputs.radio(["a", "b"]);
  const result = Inputs.text({ label: "result", disabled: true });

  const checker = () => {
    if (answer.value == "b") result.value = "correct!";
    if (answer.value == "a") result.value = "wrong!";
  };
  answer.addEventListener("input", checker);
  invalidation.then(() => answer.removeEventListener("input", checker)); // For every addXXX their is a removeXXX

  return Inputs.form([answer, result]);
}


function _submitted(Inputs,$0){return(
Inputs.button("submit", {
  required: true,
  reduce: () => $0.value
})
)}

function _15(submitted){return(
submitted
)}

function _16(md){return(
md`### v2 submit answer to reveal result`
)}

function _ui2(view,Inputs)
{
  return view`<div>
    ${["response", Inputs.radio(["a", "b"])]}
    ${["submit", Inputs.button("submit")]}
    ${["result", Inputs.text({ label: "result", disabled: true })]}
  </div>`;
}


function _18(md){return(
md`view allows components to be built heirarchically, so the three components become sub-views and can be binded/addEventListener to individually`
)}

function _19($0){return(
$0
)}

function _checker($0,invalidation)
{
  // Note you could put all this logic inside the viewof ui2 code block too
  const checker = () => {
    if ($0.value.response === "a") {
      $0.value.result = "wrong";
    } else if ($0.value.response === "b") {
      $0.value.result = "correct";
    } else {
      $0.value.result = "you didn't answer!!!";
    }
  };

  $0.submit.addEventListener("input", checker);
  invalidation.then(() =>
    $0.submit.removeEventListener("input", checker)
  );
}


function _21($0){return(
$0
)}

function _22(md){return(
md`## Fetchp`
)}

function _image1(FileAttachment){return(
FileAttachment("image@1.png").image()
)}

function _dynamic_radios(md){return(
md`## [Dynamic radios](https://talk.observablehq.com/t/help-with-data-filters-in-observables-survey-cross-tabulation-template/6902/2[]()`
)}

function _27(md){return(
md`Juice wraps the existing Inputs.radio "view builder" to make a new "view builder" that has two sub-views: options, and result. Result is the normal data output of the radio, the options is mapped to the old 1st arg i.e. the options in the radio control. Now options is its own subview you can read and write to it.`
)}

function _dynamicRadio(juice,Inputs){return(
juice(Inputs.radio, {
  options: "[0]",
  result: "[1].value"
})
)}

function _control(dynamicRadio){return(
dynamicRadio(["a", "b", "c"])
)}

function _30(md){return(
md`Note the inner value is now an object unlike a normal radio`
)}

function _31(control){return(
control
)}

function _filter(Inputs){return(
Inputs.radio(["all", "b,c", "a,c"], { label: "filter" })
)}

function _33(md){return(
md`In the logic block, which is downstream of the filter, we can manipulate the dynamic radio without being reactively dependant on the inner value. We can apply logic to remove the selection if an option is no longer available based on the filter.`
)}

function _logic(filter,$0,Event)
{
  if (filter === "all") {
    $0.options.value = ["a", "b", "c"];
  } else if (filter === "b,c") {
    if ($0.result.value == "a") $0.result.value = null;
    $0.options.value = ["b", "c"];
  } else if (filter === "a,c") {
    if ($0.result.value == "b") $0.result.value = null;
    $0.options.value = ["a", "c"];
  }
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}


function _35(md){return(
md`### [How to import Github package](https://talk.observablehq.com/t/how-to-import-github-package/6225)

`
)}

function _registry(){return(
"https://npm.pkg.github.com"
)}

function _d3Require(require){return(
require("d3-require")
)}

function _myRequire(d3Require,registry){return(
d3Require.requireFrom(async (name) => {
  return `${registry}/${name}`;
})
)}

function _runImport(Inputs){return(
Inputs.button("runImport", {
  required: true
})
)}

function _40(runImport,myRequire){return(
runImport, myRequire("@securityscorecard/design-system@1.0.0-alpha.148")
)}

function _41(md){return(
md`### Select box with text area submit (https://talk.observablehq.com/t/updating-a-textarea-value-and-submit-button-status/6172)`
)}

function _selection(Inputs){return(
Inputs.select(["red", "green", "blue"])
)}

function _43(md){return(
md`If text box is created with dataflow the value is already live!`
)}

function _submit1(Inputs,selection){return(
Inputs.textarea({ value: selection, submit: true })
)}

function _45(submit1){return(
submit1
)}

function _46(md){return(
md`If we link them with bind then the value is auto submitted (is this the issue?)`
)}

function _submit2(Inputs){return(
Inputs.textarea({ submit: true, minlength: 1 })
)}

function _48(submit2){return(
submit2
)}

function _49(Inputs,$0,$1){return(
Inputs.bind($0, $1)
)}

function _50(md){return(
md`Maybe simpler to refactor the submit button to another cell, then you have more control.`
)}

function _submit3(Inputs,selection){return(
Inputs.button("submit", {
  required: true,
  reduce: () => selection
})
)}

function _52(submit3){return(
submit3
)}

function _53(md){return(
md`Extract the submit as its own step`
)}

function _54(md){return(
md`### Markdown can contain embedded DOM elements`
)}

function _56(tweet){return(
tweet("1442010098482626563")
)}

function _57(html,md){return(
md`*I am a mardown cell but I escape to JS and have some smart casting so that if my JS returns a DOM node I can render that too ${html`<input type="range">`}*

Look ${function foo() {
  const el = document.createElement("h1")
  el.innerHTML = "Programmatic Title in embedded markdown";
  return el
}()}`
)}

function _unresolve_view(md){return(
md`### Cannot return viewof value back to unresolved`
)}

function _foo(md)
{
  // Create a view 'foo' with value 'bar'
  return Object.defineProperty(md`foo`, "value", {
    value: "bar",
    writable: true,
    enumerable: true
  });
}


function _60($0){return(
$0.value
)}

function _61(foo){return(
foo
)}

function _set_value_to_promise(Inputs,$0,invalidation,Event){return(
Inputs.button("set new promise", {
  reduce: () => {
    $0.value = invalidation;
    $0.dispatchEvent(new Event('input', { bubbles: true }));
  }
})
)}

function _set_value_to_undefined(Inputs,$0,Event){return(
Inputs.button("set undefined", {
  reduce: () => {
    $0.value = undefined;
    $0.dispatchEvent(new Event('input', { bubbles: true }));
  }
})
)}

function _64(md){return(
md`If you refresh the 'viewof foo.value' cell it will not resolve`
)}

function _updateOnRelease(md){return(
md`## https://talk.observablehq.com/t/what-is-the-best-way-to-make-range-slider-update-only-on-release/5112/3`
)}

function _x(Inputs,Event){return(
Object.assign(Inputs.range([0, 10], { label: "yo", step: 2 }), {
  oninput: event => event.isTrusted && event.stopImmediatePropagation(),
  onchange: event => event.currentTarget.dispatchEvent(new Event("input"))
})
)}

function _67(x){return(
x
)}

function _68(Promises){return(
Promises.delay(Number.NaN)
)}

function _69(md){return(
md`Bug textarea, submit evaluated early`
)}

function _textAreaWithSubmit(Inputs){return(
Inputs.textarea({
  submit: true
})
)}

function _71(textAreaWithSubmit){return(
textAreaWithSubmit
)}

function _textWithSubmit(Inputs){return(
Inputs.text({
  submit: true
})
)}

function _73(textWithSubmit){return(
textWithSubmit
)}

function _bindChaining(md){return(
md`### Bind chaining (https://talk.observablehq.com/t/unable-to-dispatch-input-event-on-non-dom-inputs/5281/8)

Type gibberish into the fist and last text box
`
)}

function _start(Inputs){return(
Inputs.text()
)}

function _middle(Inputs,$0)
{
  const middle = Inputs.text();
  Inputs.bind($0, middle);
  return middle;
}


function _end(Inputs,$0)
{
  const end = Inputs.text();
  Inputs.bind($0, end);
  return end;
}


function _78(end){return(
end
)}

function _79(start){return(
start
)}

function _80(md){return(
md`### Repo multi update`
)}

function _82(exportString){return(
exportString
)}

function _ganja(md){return(
md`### Ganja.js`
)}

function _Algebra(require){return(
require("ganja.js")
)}

function _85(Algebra){return(
Algebra(2, 0, 1, () => {
  // 1e1 is the dimension (Y)
  // Change to 1e2 to make this a horizontal line
  return this.graph([1e1]);
})
)}

function _ui_dev(md){return(
md`[Would you be able to provide an example to make this work? For instance, Cell B receiving data from a dropdown box triggered by input events in Cell A?](https://observablehq.com/@tomlarkworthy/ui-development#comment-7ffed281fde99119)

Here cell_b will update if cell_a changes, but also you can change cell_b directly.
`
)}

function _cell_a(Inputs){return(
Inputs.select(["one", "two"])
)}

function _88(cell_a){return(
cell_a
)}

function _cell_b(Inputs){return(
Inputs.text()
)}

function _90(md,cell_b){return(
md`# Cell_b is ${cell_b}`
)}

function _updater_with_event($0,$1,Event)
{
  // You could declare this updating in cell_b too, but I think its more illastrative taking it into its own cell
  $0.addEventListener("input", (evt) => {
    $1.value = $0.value; // Updates visual appearance but does not trigger dataflow from cell_b
    $1.dispatchEvent(new Event("input", { bubbles: true }));
  });
}


function _92(md){return(
md`## I want to mutate the select options dynamically...`
)}

function _mutableSelection(variable,viewroutine,Inputs,ask,view,Event){return(
(options) => {
  const optionsVar = variable(options, { name: "options" });
  let innerSelection = undefined;
  let currentValue;

  const selection = viewroutine(async function* () {
    let selection;
    while (true) {
      console.log("recreating view", currentValue);
      innerSelection = Inputs.select(optionsVar.value, {
        format: (d) => d.name || d,
        value: currentValue
      });
      currentValue = yield* ask(innerSelection);
    }
  });
  const ui = view`<div>
    ${["options", optionsVar]}
    ${["selection", selection]}
  `;

  optionsVar.addEventListener("input", () => {
    console.log("got event");
    innerSelection.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return ui;
}
)}

function _cell_c(mutableSelection){return(
mutableSelection(["a", "b"])
)}

function _97(cell_c){return(
cell_c
)}

function _98(cell_c){return(
cell_c.selection
)}

function _updater_first_option_using_cell_b($0,$1,Event)
{
  $0.addEventListener("input", (evt) => {
    $1.options.value = [$0.value, "other"]; // Assign any array of options you like (does nto support in-place mutation like .push)
    $1.options.dispatchEvent(new Event("input", { bubbles: true }));
  });
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/4b138dce47bc24ab00d6d5e90489836a4cd3830981acbc6d313e08bdf8431acab27ed40cca013490062d456b6d2dd35cda6a97b1120707c563b74e8902cd0cb9.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  main.variable(observer("viewof editor")).define("viewof editor", ["Inputs","localStorageView"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof editor","Event"], _5);
  main.variable(observer()).define(["md"], _6);
  const child2 = runtime.module(define2);
  main.import("CodeMirror", child2);
  main.variable(observer("viewof codemirror")).define("viewof codemirror", ["Inputs","CodeMirror","localStorageView"], _codemirror);
  main.variable(observer("codemirror")).define("codemirror", ["Generators", "viewof codemirror"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("elements")).define("elements", _elements);
  main.variable(observer("expr")).define("expr", ["elements"], _expr);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof reactiveMultiControlUI")).define("viewof reactiveMultiControlUI", ["Inputs","invalidation"], _reactiveMultiControlUI);
  main.variable(observer("reactiveMultiControlUI")).define("reactiveMultiControlUI", ["Generators", "viewof reactiveMultiControlUI"], (G, _) => G.input(_));
  main.variable(observer("viewof submitted")).define("viewof submitted", ["Inputs","viewof reactiveMultiControlUI"], _submitted);
  main.variable(observer("submitted")).define("submitted", ["Generators", "viewof submitted"], (G, _) => G.input(_));
  main.variable(observer()).define(["submitted"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof ui2")).define("viewof ui2", ["view","Inputs"], _ui2);
  main.variable(observer("ui2")).define("ui2", ["Generators", "viewof ui2"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["viewof ui2"], _19);
  main.variable(observer("checker")).define("checker", ["viewof ui2","invalidation"], _checker);
  main.variable(observer()).define(["viewof ui2"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("image1")).define("image1", ["FileAttachment"], _image1);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  main.variable(observer("dynamic_radios")).define("dynamic_radios", ["md"], _dynamic_radios);
  const child4 = runtime.module(define4);
  main.import("juice", child4);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("dynamicRadio")).define("dynamicRadio", ["juice","Inputs"], _dynamicRadio);
  main.variable(observer("viewof control")).define("viewof control", ["dynamicRadio"], _control);
  main.variable(observer("control")).define("control", ["Generators", "viewof control"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["control"], _31);
  main.variable(observer("viewof filter")).define("viewof filter", ["Inputs"], _filter);
  main.variable(observer("filter")).define("filter", ["Generators", "viewof filter"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("logic")).define("logic", ["filter","viewof control","Event"], _logic);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("registry")).define("registry", _registry);
  main.variable(observer("d3Require")).define("d3Require", ["require"], _d3Require);
  main.variable(observer("myRequire")).define("myRequire", ["d3Require","registry"], _myRequire);
  main.variable(observer("viewof runImport")).define("viewof runImport", ["Inputs"], _runImport);
  main.variable(observer("runImport")).define("runImport", ["Generators", "viewof runImport"], (G, _) => G.input(_));
  main.variable(observer()).define(["runImport","myRequire"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof selection")).define("viewof selection", ["Inputs"], _selection);
  main.variable(observer("selection")).define("selection", ["Generators", "viewof selection"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("viewof submit1")).define("viewof submit1", ["Inputs","selection"], _submit1);
  main.variable(observer("submit1")).define("submit1", ["Generators", "viewof submit1"], (G, _) => G.input(_));
  main.variable(observer()).define(["submit1"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("viewof submit2")).define("viewof submit2", ["Inputs"], _submit2);
  main.variable(observer("submit2")).define("submit2", ["Generators", "viewof submit2"], (G, _) => G.input(_));
  main.variable(observer()).define(["submit2"], _48);
  main.variable(observer()).define(["Inputs","viewof selection","viewof submit2"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("viewof submit3")).define("viewof submit3", ["Inputs","selection"], _submit3);
  main.variable(observer("submit3")).define("submit3", ["Generators", "viewof submit3"], (G, _) => G.input(_));
  main.variable(observer()).define(["submit3"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["md"], _54);
  const child5 = runtime.module(define5);
  main.import("tweet", child5);
  main.variable(observer()).define(["tweet"], _56);
  main.variable(observer()).define(["html","md"], _57);
  main.variable(observer("unresolve_view")).define("unresolve_view", ["md"], _unresolve_view);
  main.variable(observer("viewof foo")).define("viewof foo", ["md"], _foo);
  main.variable(observer("foo")).define("foo", ["Generators", "viewof foo"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof foo"], _60);
  main.variable(observer()).define(["foo"], _61);
  main.variable(observer("set_value_to_promise")).define("set_value_to_promise", ["Inputs","viewof foo","invalidation","Event"], _set_value_to_promise);
  main.variable(observer("set_value_to_undefined")).define("set_value_to_undefined", ["Inputs","viewof foo","Event"], _set_value_to_undefined);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("updateOnRelease")).define("updateOnRelease", ["md"], _updateOnRelease);
  main.variable(observer("viewof x")).define("viewof x", ["Inputs","Event"], _x);
  main.variable(observer("x")).define("x", ["Generators", "viewof x"], (G, _) => G.input(_));
  main.variable(observer()).define(["x"], _67);
  main.variable(observer()).define(["Promises"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("viewof textAreaWithSubmit")).define("viewof textAreaWithSubmit", ["Inputs"], _textAreaWithSubmit);
  main.variable(observer("textAreaWithSubmit")).define("textAreaWithSubmit", ["Generators", "viewof textAreaWithSubmit"], (G, _) => G.input(_));
  main.variable(observer()).define(["textAreaWithSubmit"], _71);
  main.variable(observer("viewof textWithSubmit")).define("viewof textWithSubmit", ["Inputs"], _textWithSubmit);
  main.variable(observer("textWithSubmit")).define("textWithSubmit", ["Generators", "viewof textWithSubmit"], (G, _) => G.input(_));
  main.variable(observer()).define(["textWithSubmit"], _73);
  main.variable(observer("bindChaining")).define("bindChaining", ["md"], _bindChaining);
  main.variable(observer("viewof start")).define("viewof start", ["Inputs"], _start);
  main.variable(observer("start")).define("start", ["Generators", "viewof start"], (G, _) => G.input(_));
  main.variable(observer("viewof middle")).define("viewof middle", ["Inputs","viewof start"], _middle);
  main.variable(observer("middle")).define("middle", ["Generators", "viewof middle"], (G, _) => G.input(_));
  main.variable(observer("viewof end")).define("viewof end", ["Inputs","viewof middle"], _end);
  main.variable(observer("end")).define("end", ["Generators", "viewof end"], (G, _) => G.input(_));
  main.variable(observer()).define(["end"], _78);
  main.variable(observer()).define(["start"], _79);
  main.variable(observer()).define(["md"], _80);
  const child6 = runtime.module(define6);
  main.import("exportString", child6);
  main.variable(observer()).define(["exportString"], _82);
  main.variable(observer("ganja")).define("ganja", ["md"], _ganja);
  main.variable(observer("Algebra")).define("Algebra", ["require"], _Algebra);
  main.variable(observer()).define(["Algebra"], _85);
  main.variable(observer("ui_dev")).define("ui_dev", ["md"], _ui_dev);
  main.variable(observer("viewof cell_a")).define("viewof cell_a", ["Inputs"], _cell_a);
  main.variable(observer("cell_a")).define("cell_a", ["Generators", "viewof cell_a"], (G, _) => G.input(_));
  main.variable(observer()).define(["cell_a"], _88);
  main.variable(observer("viewof cell_b")).define("viewof cell_b", ["Inputs"], _cell_b);
  main.variable(observer("cell_b")).define("cell_b", ["Generators", "viewof cell_b"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","cell_b"], _90);
  main.variable(observer("updater_with_event")).define("updater_with_event", ["viewof cell_a","viewof cell_b","Event"], _updater_with_event);
  main.variable(observer()).define(["md"], _92);
  const child7 = runtime.module(define7);
  main.import("view", child7);
  main.import("variable", child7);
  const child8 = runtime.module(define8);
  main.import("viewroutine", child8);
  main.import("ask", child8);
  main.variable(observer("mutableSelection")).define("mutableSelection", ["variable","viewroutine","Inputs","ask","view","Event"], _mutableSelection);
  main.variable(observer("viewof cell_c")).define("viewof cell_c", ["mutableSelection"], _cell_c);
  main.variable(observer("cell_c")).define("cell_c", ["Generators", "viewof cell_c"], (G, _) => G.input(_));
  main.variable(observer()).define(["cell_c"], _97);
  main.variable(observer()).define(["cell_c"], _98);
  main.variable(observer("updater_first_option_using_cell_b")).define("updater_first_option_using_cell_b", ["viewof cell_b","viewof cell_c","Event"], _updater_first_option_using_cell_b);
  return main;
}
