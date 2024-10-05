import define1 from "./65d33fe44849cfde@588.js";
import define2 from "./c7a3b20cec5d4dd9@725.js";
import define3 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Design Guidelines and Linter for Reusable UI Components

Lets collect best practices for \`viewof\` and [Input](/@observablehq/inputs) development. Comments and suggestions *extremely* welcome. 

The general idea is that if we build our UI components in a certain way, then they can be programatically scripted by other UI components, allowing rich animations or powerful UIs from smaller atomic pieces.

This is my best guess at what it takes, from experience building [@tomlarkworthy/animation](/@tomlarkworthy/animation)

[@mootari](/@mootari) helped considerably with ideation and refinement of the linting rules. 
`
)}

function _2(md){return(
md`### Conformance linter
Enter a notebook url and a cell name to run (limited) automated testing for UI best practices
`
)}

function _testTarget(html,args)
{
  function test() {
    ui.value = {
      notebook: notebookEl.value.replace("https://observablehq.com/", ''),
      cell: cellEl.value
    };
    ui.dispatchEvent(new CustomEvent('input'));
  }
  const ui = html`
    <input class="notebook"
           style="width: 50%"
           size="50"
           placeholder="Notebook URL" 
           value=${args.notebook} />
    <br>
    <input class="cell"
           style="width: 40%"
           size="20"
           placeholder="cell"
           value=${args.cell} />
    <button class="test-btn" style="width: 10%">test</button>
  `;
  const notebookEl = ui.querySelector(".notebook");
  const cellEl = ui.querySelector(".cell");
  const testButtonEl = ui.querySelector(".test-btn");
  testButtonEl.addEventListener('click', test);
  test();
  return ui;
}


function _4(testTarget,md)
{
  const link = `${testTarget.notebook}#${testTarget.cell}`;
  const permlink =
    `?notebook=${encodeURIComponent(testTarget.notebook)}` +
    `&cell=${encodeURIComponent(testTarget.cell)}`;

  return md`
Component source: [${link}](/${link})

Linter permlink: [${permlink}](${permlink})`;
}


function _5(md){return(
md`### Test component`
)}

function _6(build){return(
build()
)}

function _7(md){return(
md`
### Some famous UI controls linter results
- [@observablehq/inputs#Range](https://observablehq.com/@tomlarkworthy/ui-linter?notebook=%40observablehq%2Finputs&cell=Range)
  - 😎
- [@jashkenas/inputs#slider](https://observablehq.com/@tomlarkworthy/ui-linter?notebook=%40jashkenas%2Finputs&cell=slider)
  - No property setter
- [@mootari/range-slider#rangeSlider](https://observablehq.com/@tomlarkworthy/ui-linter?notebook=%40mootari%2Frange-slider&cell=rangeSlider)
  - No property setter
- [@bartok32/diy-inputs#slider](https://observablehq.com/@tomlarkworthy/ui-linter?notebook=%40bartok32%2Fdiy-inputs&cell=slider)
  - No property setter
  - input event with bubbles: false
- [@tomlarkworthy/native-inputs#Range](https://observablehq.com/@tomlarkworthy/ui-linter?notebook=%40tomlarkworthy%2Fnative-inputs&cell=Range)
  - 😎 (not famous but useful to compare with native behaviour)
- [@bryangingechen/grid-inputs#grid](https://observablehq.com/@tomlarkworthy/ui-linter?notebook=%40bryangingechen%2Fgrid-inputs&cell=grid)
  - input events don't bubble (not caught by linter yet)
  - No property setter
`
)}

function _suite(createSuite){return(
createSuite({
  //name: `Automated UI conformance tests for ${testTarget.notebook}#${testTarget.cell}`
  name: `Design Lint Results`,
  timeout_ms: 1000
})
)}

function _9(md){return(
md`## Input constructor should be simple

It's easier for people to get started if the simplest possible instantiation works out of the box.
`
)}

function _10(suite,build){return(
suite.test("Constructor accepts zero args", async done => {
  await build();
  done();
})
)}

function _11(suite,build){return(
suite.test("Constructor accepts empty object arg", async done => {
  await build();
  done();
})
)}

function _12(md){return(
md`## UI has addEventListener defined

Its the absolute minimum to be a viewof
`
)}

function _13(suite,build,expect){return(
suite.test("Component has addEventListener method", async done => {
  const component = await build();
  expect(component.addEventListener).toBeDefined();
  done();
})
)}

function _14(md){return(
md`## Input _value_ should be enumerable

Either an input is wrapping a primitive type, or its wrapping an object. If its an object it should have enumerable properties.
`
)}

function _15(suite,build,expect){return(
suite.test("Value is primitive or has enumerable properties", async done => {
  const component = await build();
  const value = component.value;
  if (typeof value === "object") {
    expect(Object.keys(value).length).toBeGreaterThan(0);
  }
  done();
})
)}

function _backwritable(md){return(
md`
## Input _value_ should be mutable (back writable)

_value_ should be a writable _property_ of the view. Whatever comes out of the 'value' you should be able to push back in and the UI should update, just like native controls.

~~~js
viewof example = {
  const ui = html\`...\`
  Object.defineProperty(ui, 'value', {
    get: ...
    set: (newVal) => ...   <--- Inputs should be mutable
  });
  return ui;
}
~~~

This allows other cells to add additional features without editing the source code, or create writable composite control views, or be driven by external animation. It makes the control reusable.
`
)}

function _17(suite,build,expect){return(
suite.test("Component value is defined", async done => {
  const component = await build();
  expect(component.value).toBeDefined();
  done();
})
)}

function _18(suite,build,HTMLElement){return(
suite.test("Component value is writable", async done => {
  const component = await build();
  const descriptor = Object.getOwnPropertyDescriptor(component, "value");

  if (descriptor && descriptor.set) {
    // If a setter is defined then it is explicitly writable
    done();
  } else if (
    component instanceof HTMLElement &&
    Object.getPrototypeOf(component).hasOwnProperty('value')
  ) {
    // DOM elements with native value are mutable
    done();
  } else {
    done(new Error("No property setter"));
  }
})
)}

async function _19(build)
{
  const component = await build();
  return Object.getOwnPropertyDescriptor(component, "value");
}


function _20(md){return(
md`
## Inputs SHOULD NOT raise 'input' event on mutation

_"This is intentional and matches the behavior of native inputs. You have to dispatch an event explicitly if desired."_ -- [M Bostock](https://github.com/observablehq/inputs/issues/73)
`
)}

function _21(suite,build){return(
suite.test("Input events not raised on write", async done => {
  const component = await build();
  component.addEventListener('input', () => {
    done(new Error("Input event was raised on mutation"));
  });
  component.value = component.value;
  done();
})
)}

function _22(md){return(
md`
## Inputs SHOULD visually update on mutation

While event should NOT be dispatch on mutatation, the UI should visually update for consistency with native components
`
)}

function _23(md){return(
md`
## Inputs SHOULD cache unchanged values

_value_ should only change object reference when value changes.

_"it’d be better if the value object were the same if the value hasn’t changed"_ -- [M Bostock](https://github.com/observablehq/inputs/issues/73)

~~~js
viewof example = {
  let cache = calcValue();
  const ui = html\`...\`
  dispatch = () => {
    cache = calcValue();
    ui.dispatchEvent(new CustomEvent('input'))
  }
  Object.defineProperty(ui, 'value', {
    get: () => cache  <--- value is cached
  })
}
~~~

---
`
)}

function _24(suite,build,expect){return(
suite.test("Component value is cached between sequential reads", async done => {
  const component = await build();
  const reading1 = component.value;
  const reading2 = component.value;
  expect(reading1).toBe(reading2); // Note reference equality
  done();
})
)}

function _25(md){return(
md`
## Input Event SHOULD bubble

Input events leaving the UI component should have \`bubbles: true\`. This enables parents controls to listen to child events with minimal wiring, and is consistent with native 'input' events. Raise synthetic events like so: 

~~~js
    _.dispatchEvent(new Event('input', { bubbles: true }));
~~~

This is how components might be reused, motivating the use of bubbling:-

~~~js
viewof parent = {
  const ui = html\`<div>
    \${viewof child1()}
    \${viewof child2()}
  </div>\`
  ...
  return ui; // ui will emit an input events 
}
~~~

---
`
)}

function _26(suite,build){return(
suite.test("Input events bubble", async done => {
  const component = await build();
  component.addEventListener('input', evt => {
    if (!evt.bubbles) {
      done(new Error("input event with bubbles: false"));
    }
  });

  component.querySelectorAll("input").forEach(inputEl => {
    inputEl.dispatchEvent(new CustomEvent('input', { bubbles: true }));
  });
  done();
})
)}

function _27(md){return(
md`### Remark 

'Input Event SHOULD bubble' and 'Inputs SHOULD cache unchanged values' are not easy to implement at the same time. Should the parent catch the event, update the cache, then throw a new event?

`
)}

function _28(md){return(
md`## UI should work on mobile and desktop and a variety of browsers

note _mousemove_ can act strange. _pointermove_ is better (?).

Safari can be the odd one out too.

`
)}

function _29(md){return(
md`# Supporting State`
)}

async function _build(peekFirst,testTarget)
{
  const cell = await peekFirst({
    notebook: testTarget.notebook,
    cell: testTarget.cell
  });
  if (typeof cell === 'function') return cell;
  else {
    throw new Error("Target cell must be a builder");
  }
}


function _args(URLSearchParams,location)
{
  const s = new URLSearchParams(location.search);
  return {
    notebook:
      s.get("notebook") || 'https://observablehq.com/@bartok32/diy-inputs',
    cell: s.get('cell') || 'slider'
  };
}


function _35(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof testTarget")).define("viewof testTarget", ["html","args"], _testTarget);
  main.variable(observer("testTarget")).define("testTarget", ["Generators", "viewof testTarget"], (G, _) => G.input(_));
  main.variable(observer()).define(["testTarget","md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["build"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["suite","build"], _10);
  main.variable(observer()).define(["suite","build"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["suite","build","expect"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["suite","build","expect"], _15);
  main.variable(observer("backwritable")).define("backwritable", ["md"], _backwritable);
  main.variable(observer()).define(["suite","build","expect"], _17);
  main.variable(observer()).define(["suite","build","HTMLElement"], _18);
  main.variable(observer()).define(["build"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["suite","build"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["suite","build","expect"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["suite","build"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("build")).define("build", ["peekFirst","testTarget"], _build);
  main.variable(observer("args")).define("args", ["URLSearchParams","location"], _args);
  const child1 = runtime.module(define1);
  main.import("peekFirst", child1);
  const child2 = runtime.module(define2);
  main.import("createSuite", child2);
  main.import("expect", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _35);
  return main;
}
