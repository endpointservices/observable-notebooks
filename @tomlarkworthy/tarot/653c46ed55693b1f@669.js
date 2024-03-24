// https://observablehq.com/@tomlarkworthy/juice@669
import define1 from "./f92778131fd76559@1174.js";
import define2 from "./4a1fa3c167b752e5@324.js";

async function _1(FileAttachment,md){return(
md`# Squeezing more _Juice_ out of UI libraries

<image style="max-width: 640px" src="${await FileAttachment("juice.jpg").url()}"></image>

Sometimes you want the configuration of a view component to be reactive. You want the arguments in the constructor to become part of the value in a view. For example, making the *options* in a *select* part of the value enables you to back-write into the view to update the drop down. You don't want to do this using *dataflow* because its part of a single cell UI.

This utility moves configuration parameters into the value. Hopefully this helps us squeeze a little more juice out of existing Input libraries, a useful technique for [scaling UI development](https://observablehq.com/@tomlarkworthy/ui-development)

This utility was created in response to conversations with [@mkfreeman](/@mkfreeman) and [@dleeftink](/@dleeftink) who both independently had a requirement for a select with mutable options. I decided it would be useful to solve this problem in a general way so we could take any UI component and pull out its configuration to suit.

~~~js
import {juice} from '@tomlarkworthy/juice'
~~~

`
)}

function _2(md){return(
md`## fastest way to make UI components

Convert static renderers into reactive components:
\`\`\`js
(name, age) => html\`Your name is \${name} your age is \${age}\`
\`\`\``
)}

function _profile(juice,html){return(
juice((name, age) => html`Your name is ${name} your age is ${age}`, {
  name: "[0]", // we index into the ...arguments array
  age: "[1]"
})
)}

function _example(profile){return(
profile("tom", 21)
)}

function _5(Inputs,$0){return(
Inputs.bind(Inputs.range([0, 99]), $0.age)
)}

function _6(md){return(
md`## *juice* API

~~~
    juice(VIEW_BUILDER, JUICE_CONFIG) => NEW_VIEW_BUILDER
~~~

### 1st arg is a view builder

_**juice**_ is a higher order function that takes a **view builder** function as its **1st arg**, and returns a new **view builder** function. *Inputs.select* is an example of a view builder function that can be found in the standard library. View builders are a common form of packaging a UI component on Observable. 

*A view builder is a function that takes some configuration as its arguments and returns a view*

~~~js
    juice(VIEW_BUILDER, ???) => VIEW_BUILDER
~~~

### 2nd arg is the argument remapping

The 2nd argument of juice configures how static configuration arguments are moved the view's value output. It is is expressed as an *key-value* object dictionary. The *key* is the property name in the resultant composite view, the *value* is a lodash path into the view builders configuration *...arg* array, have a look at the examples below to see how the path syntax works.

~~~js
    juice(VIEW_BUILDER, {subview => ...args path}) => VIEW_BUILDER
~~~

### Returns a view builder with a composite value

The result of applying *juice* is a new view builder. 

The new builder has an identical argument list to the original one. Input arguments form the base args for internal calls to the view builder. 


The new builder has a very different value type though. The value becomes a dictionary of values. One entry *"result"* is the original return value.  The other entries correspond to entries in the *argument remapping* configuration mentioned above. Note the fields are mutable, and you can write back into them to update the UI configuration.


`
)}

function _7(md){return(
md`### Works with any functional UI

You can animate your own custom constructors or [D3 charts](https://observablehq.com/@tomlarkworthy/juice-and-charts)`
)}

function _8(md){return(
md`#### Example

If we *juice* the *range* builder:
~~~js
dynamicRange = juice(Inputs.range, {
  label: "[1].label",
  min: "[0][0]", 
  max: "[0][1]", 
})
~~~

We can instantiate ranges as normal:-

~~~js
viewof myDynamicRange = dynamicRange([0, 10], {label: "cool"})
~~~

But we end up with a view whose value is of the form

~~~js
{label: "...", min: -1, max: 1, result: 0}
~~~

And we back-write into it from anywhere else in the notebook

~~~js
{
  viewof myDynamicRange.max.value = 1000;
  viewof myDynamicRange.max.dispatchEvent(new Event('input', {bubbles: true}));
}
~~~

Because the value is a nested view, each subview supports *Inputs.bind* individually, see [scaling UI development](https://observablehq.com/@tomlarkworthy/ui-development#nesting-views-with-the-view-literal-https-observablehq-com-tomlarkworthy-view-) for why this is important.

`
)}

function _9(md){return(
md`### Open Issues

##### DOM state lost when parameters

When a configuration parameter is updated, the DOM node is deleted and replaced with a fresh node, this breaks things like mouse event handlers, caret position etc. My normal goto solution for DOM state loss is nanomorph, but nanomorph does not work with Inputs ([bug](https://github.com/observablehq/inputs/issues/184)). So, for now, we do the crude DOM swap and live with the UI state loss glitches.
`
)}

function _stateLostExample(dynamicRange){return(
dynamicRange()
)}

function* _stateLostExampleUpdater(Promises,stateLostExample)
{
  let i = 0;
  const banner = "Label updates break the slider :( ";
  while (true) {
    yield Promises.delay(100);
    stateLostExample.label = (banner + banner).substring(i, i + 15);
    i = (i + 1) % banner.length;
  }
}


function _12(md){return(
md`## Implementation`
)}

function _juice(proxyVariable,variable,_,view){return(
(builder, targets = {}) => (...args) => {
  const result = proxyVariable({
    name: "result",
    get: () => viewUI.value,
    set: (newVal) => (viewUI.value = newVal)
  });

  const proxyPassthrough = (evt) => {
    result.dispatchEvent(new CustomEvent("input", evt));
  };

  let viewUI = builder(...args);
  viewUI.addEventListener("input", proxyPassthrough);

  const vars = Object.fromEntries(
    Object.entries(targets)
      .filter(([target, _]) => target !== "result") // result var is handled a bit differently
      .map(([target, path]) => {
        const v = variable(_.get(args, path), { name: target });
        v.addEventListener("assign", () => {
          // Patch the args based on the current values in the variables
          Object.keys(targets).forEach((target) => {
            const path = targets[target];
            // Current value, normally pulled from the vairable but special case for the 'result'
            const value =
              target === "result" ? viewUI.value : vars[target].value;
            _.update(args, path, () => value);
          });
          // We create a whole new view and substitute it in
          const newView = builder(...args);
          viewUI.replaceWith(newView); // A fair amount of state is lost here, but reconcile doesn't work
          viewUI.removeEventListener("input", proxyPassthrough);
          viewUI = newView;
          viewUI.addEventListener("input", proxyPassthrough);
        });
        return [target, v];
      })
  );
  const ui = view`<span>${["...", vars]}${["result", result]}${viewUI}`;
  return ui;
}
)}

function _14(md){return(
md`### helpers`
)}

function _proxyVariable(){return(
function proxyVariable({ name = "variable", get, set } = {}) {
  const self = document.createComment(name);
  return Object.defineProperties(self, {
    value: {
      get: get,
      set: set,
      enumerable: true
    },
    toString: {
      value: () => `${get()}`
    }
  });
}
)}

function _16(md){return(
md`## Range with dynamic max and min

Here we extract the ranges first arg, *max* and *min* to be their own backwritable subviews
`
)}

function _dynamicRange(juice,Inputs){return(
juice(Inputs.range, {
  label: "[1].label",
  min: "[0][0]", // "range" is first arg (index 0), the min is the 1st arg of the range array
  max: "[0][1]", // "range" is first arg, the max is the 2nd paramater of that array
  result: "[1].value" // "result" can be set in the options.value, options being the 2nd arg (index 0)
})
)}

function _dynamicRangeExample(dynamicRange){return(
dynamicRange([-1, 1], { label: "dynamic range" })
)}

function _19(dynamicRangeExample){return(
dynamicRangeExample
)}

function _20(dynamicRangeExample){return(
dynamicRangeExample
)}

function _dynamicRangeMin(dynamicRange){return(
dynamicRange([-1, 1], {
  label: "dynamic range min",
  value: -1
})
)}

function _22(dynamicRangeMin){return(
dynamicRangeMin
)}

function _dynamicRangeMax(dynamicRange){return(
dynamicRange([-1, 1], {
  label: "dynamic range max",
  value: 1
})
)}

function _24(dynamicRangeMax){return(
dynamicRangeMax
)}

function _minMaxConstraints(Inputs,$0,$1,$2)
{
  // We want dynamicRangeMax to constrain the dynamic range's max and min
  Inputs.bind($0.max, $1.result);
  Inputs.bind($0.min, $2.result);
  // Of course, the max of the min should also be constrained by the max too
  Inputs.bind($2.max, $1.result);
  Inputs.bind($1.min, $2.result);
}


function _26(md){return(
md`### Select with Dynamic Options`
)}

function _dynamicSelect(juice,Inputs){return(
juice(Inputs.select, {
  label: "[1].label",
  options: "[0]", // "options" is first arg (index 0) of Inputs.select
  result: "[1].value" // "result" can be set in the options.value, options being the 2nd arg (index 0)
})
)}

function _28(Inputs,$0,Event){return(
Inputs.button("deal", {
  reduce: () => {
    const rndCard = () => {
      const card = Math.floor(Math.random() * 52);
      return (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"][
          card % 14
        ] + ["♠", "♥", "♦", "♣"][Math.floor(card / 14)]
      );
    };
    $0.options.value = [rndCard(), rndCard()];
    $0.options.dispatchEvent(new Event("input"));
  }
})
)}

function _exampleSelect(dynamicSelect){return(
dynamicSelect([], { label: "play a card" })
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["juice.jpg", {url: new URL("./files/2e28fc376dcca4357f4065df43b42fd46a99e3964ad0cb6ac317637cffedc51fa67a7b1b6fb1819005c5348d7c1bc9d65cb5a91c37a35cd0e05b53e09f3ca16c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("profile")).define("profile", ["juice","html"], _profile);
  main.variable(observer("viewof example")).define("viewof example", ["profile"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof example"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof stateLostExample")).define("viewof stateLostExample", ["dynamicRange"], _stateLostExample);
  main.variable(observer("stateLostExample")).define("stateLostExample", ["Generators", "viewof stateLostExample"], (G, _) => G.input(_));
  main.variable(observer("stateLostExampleUpdater")).define("stateLostExampleUpdater", ["Promises","stateLostExample"], _stateLostExampleUpdater);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("juice")).define("juice", ["proxyVariable","variable","_","view"], _juice);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("proxyVariable")).define("proxyVariable", _proxyVariable);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("dynamicRange")).define("dynamicRange", ["juice","Inputs"], _dynamicRange);
  main.variable(observer("viewof dynamicRangeExample")).define("viewof dynamicRangeExample", ["dynamicRange"], _dynamicRangeExample);
  main.variable(observer("dynamicRangeExample")).define("dynamicRangeExample", ["Generators", "viewof dynamicRangeExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["dynamicRangeExample"], _19);
  main.variable(observer()).define(["dynamicRangeExample"], _20);
  main.variable(observer("viewof dynamicRangeMin")).define("viewof dynamicRangeMin", ["dynamicRange"], _dynamicRangeMin);
  main.variable(observer("dynamicRangeMin")).define("dynamicRangeMin", ["Generators", "viewof dynamicRangeMin"], (G, _) => G.input(_));
  main.variable(observer()).define(["dynamicRangeMin"], _22);
  main.variable(observer("viewof dynamicRangeMax")).define("viewof dynamicRangeMax", ["dynamicRange"], _dynamicRangeMax);
  main.variable(observer("dynamicRangeMax")).define("dynamicRangeMax", ["Generators", "viewof dynamicRangeMax"], (G, _) => G.input(_));
  main.variable(observer()).define(["dynamicRangeMax"], _24);
  main.variable(observer("minMaxConstraints")).define("minMaxConstraints", ["Inputs","viewof dynamicRangeExample","viewof dynamicRangeMax","viewof dynamicRangeMin"], _minMaxConstraints);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("dynamicSelect")).define("dynamicSelect", ["juice","Inputs"], _dynamicSelect);
  main.variable(observer()).define(["Inputs","viewof exampleSelect","Event"], _28);
  main.variable(observer("viewof exampleSelect")).define("viewof exampleSelect", ["dynamicSelect"], _exampleSelect);
  main.variable(observer("exampleSelect")).define("exampleSelect", ["Generators", "viewof exampleSelect"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("variable", child1);
  const child2 = runtime.module(define2);
  main.import("viewroutine", child2);
  main.import("ask", child2);
  return main;
}
