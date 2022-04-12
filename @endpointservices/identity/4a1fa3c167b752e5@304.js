// https://observablehq.com/@tomlarkworthy/viewroutine@304
async function _1(md,FileAttachment){return(
md`# Composing views across time: viewroutine

${await FileAttachment("viewroutine.png").image()}

Sometimes you want to put a sequence of UI steps in a single cell. Using inspiration drawn from Unity and Golang ([_coroutines_](https://docs.unity3d.com/Manual/Coroutines.html) and _goroutines_) checkout the _viewroutine_. A _viewroutine_ leans on Javascript's _async generator functions_ to compose views across time.

~~~
    viewroutine(generator: async function*) => viewof
~~~

The import:-

~~~js
import {viewroutine, ask} from '@tomlarkworthy/viewroutine'
~~~
`
)}

function _2(md){return(
md`## What is a view again?

A view

- contains a visual DOM component (viewof foo)
- contains a data component (foo) as the value of the visual component (viewof foo.value)
- Emits _input_ events to signal listeners that the data value has changed
- Like all cells, the viewof cell can be a generator as well and be its own stream

(see also https://observablehq.com/@observablehq/introduction-to-views)
`
)}

function _3(md){return(
md`## What is an async generator?

Async generators
- Have a signature like _async foo*()_
- have intermediate return values in the body with _yield_
- can have a final return value with _return_
- can use _await_ in the body
- can bulk return the results of other generators with _yield*_

(see also https://observablehq.com/@observablehq/introduction-to-generators)

`
)}

function _4(md){return(
md`## Putting it together

The broad idea of a viewroutine, is that an async generator yields a stream of visual components, and we update an overarching span by setting its only child to be those stream of values. Thus, the span becomes a view that doesn't invalidate when the generator yields.

There are a few nice properties with this. You can have variables declared in the closure that are carried between yields. This can often replace the use of an overarching _mutable_ in Observable.

You can compose generators by using the _yield*_ syntax making things compose nicely.

You can on demand and programatically drive the sequence, wait for user input, make choices _etc._ You could probably build an entire app in this way, and it can be decomposed into functional pieces.

One other important aspect of views is programmatic control over when an input event is raised. The viewroutine will emit an event if yielded.  
`
)}

function _5(md){return(
md`### Pattern we are trying to fix

We want to avoid stuffing a model into a mutable and asynchronously updating that from a dedicated input cell. It takes up too many cells and the use of mutable has lots of unexpected implications such as not working when imported from other notebooks
`
)}

function _nameOfThing(){return(
undefined
)}

function _newName(Inputs){return(
Inputs.text({
  label: "please enter the name of the thing to create",
  submit: true,
  minlength: 1
})
)}

async function* _sideEffect(md,$0,newName)
{
  yield md`<mark>updating`;
  await new Promise(r => setTimeout(r, 1000));
  $0.value = newName;

  yield md`<mark>updated!!!`;
}


function _9(md){return(
md`## The viewroutine`
)}

function _viewroutine(Event){return(
function viewroutine(generator) {
  let current;
  const holder = Object.defineProperty(
    document.createElement("span"),
    "value",
    {
      get: () => current?.value,
      set: (v) => (current ? (current.value = v) : null),
      enumerable: true
    }
  );

  new Promise(async () => {
    const iterator = generator();
    const n = await iterator.next();
    let { done, value } = n;
    while (!done) {
      if (value instanceof Event) {
        holder.dispatchEvent(value);
      } else {
        current = value;
        if (holder.firstChild) holder.removeChild(holder.firstChild);
        if (value) {
          holder.appendChild(value);
        }
      }
      ({ done, value } = await iterator.next());
    }
    holder.remove();
  });
  return holder;
}
)}

function _11(md){return(
md`### Example`
)}

function _12(md){return(
md`_ask_ wraps any input. It yields the passed in input to be its visual representation, but its final return is the value submitted, which ends the routine (allowing an enclosing generator to continue with the sequence)`
)}

function _ask(){return(
async function* ask(input) {
  let responder = null;
  const response = new Promise(resolve => (responder = resolve));
  input.addEventListener('input', () => responder(input.value));
  yield input;
  return await response;
}
)}

function _14(md){return(
md`Now we can do the same thing without a mutable, even carrying the inputed name in the first step to steps further along.`
)}

function _example1(viewroutine,ask,Inputs,md,htl){return(
viewroutine(async function*() {
  let newName = undefined;
  while (true) {
    newName = yield* ask(
      Inputs.text({
        label: "please enter the name of the thing to create",
        minlength: 1,
        value: newName,
        submit: true
      })
    );
    yield md`<mark>updating to ${newName}`; // Note we can remember newName
    await new Promise(r => setTimeout(r, 1000)); // Mock async action
    yield* ask(htl.html`${md`<mark>updated`} ${Inputs.button("Again?")}`);
  }
})
)}

function _16(example1){return(
example1
)}

function _17(md){return(
md`## Animation Example with return values

Mixing HTML with SVG and composing animations
`
)}

function _18(choice){return(
choice
)}

function _choice(viewroutine,choose,flashSquare,flashStar){return(
viewroutine(async function*() {
  while (true) {
    const choice = yield* choose();
    if (choice == 'square') yield* flashSquare();
    if (choice == 'star') yield* flashStar();
  }
})
)}

function _choose(htl,Event){return(
async function* choose() {
  let resolve;
  yield Object.defineProperty(
    htl.html`<button onclick=${() =>
      resolve('star')}>click to play star</button>
             <button onclick=${() =>
               resolve('square')}>click to play square</button>`,
    'value',
    {
      value: 'undecided'
    }
  );
  yield new Event("input", { bubbles: true });
  return await new Promise(function(_resolve) {
    resolve = _resolve;
  });
}
)}

function _flashSquare(html,Event,Promises){return(
async function* flashSquare() {
  for (let index = 0; index < 360; index += 5) {
    yield Object.defineProperty(
      html`<span style="display:inline-block; width:50px;height:50px; background-color: hsl(${index}, 50%, 50%);"></span>`,
      'value',
      {
        value: "square"
      }
    );
    if (index === 0) yield new Event("input", { bubbles: true });
    await Promises.delay(10);
  }
}
)}

function _flashStar(htl,Event,Promises){return(
async function* flashStar() {
  for (let index = 0; index < 360; index += 5) {
    yield Object.defineProperty(
      htl.svg`<svg height="50" width="50" viewbox="0 0 200 200">
        <polygon points="100,10 40,198 190,78 10,78 160,198"
                 style="fill:hsl(${index}, 50%, 50%);" /></svg>`,
      'value',
      {
        value: "star"
      }
    );
    if (index === 0) yield new Event("input", { bubbles: true });
    await Promises.delay(10);
  }
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["viewroutine.png",new URL("./files/dec489daac2e4a27c49e9ac9241bdba2ecde9687d9d521364238e168fb6567278d156f3d630fe937db02352d6e47556fe14f9ddcb62ecaeb902ac85ea3f83ef9",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.define("initial nameOfThing", _nameOfThing);
  main.variable(observer("mutable nameOfThing")).define("mutable nameOfThing", ["Mutable", "initial nameOfThing"], (M, _) => new M(_));
  main.variable(observer("nameOfThing")).define("nameOfThing", ["mutable nameOfThing"], _ => _.generator);
  main.variable(observer("viewof newName")).define("viewof newName", ["Inputs"], _newName);
  main.variable(observer("newName")).define("newName", ["Generators", "viewof newName"], (G, _) => G.input(_));
  main.variable(observer("sideEffect")).define("sideEffect", ["md","mutable nameOfThing","newName"], _sideEffect);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewroutine")).define("viewroutine", ["Event"], _viewroutine);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("ask")).define("ask", _ask);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof example1")).define("viewof example1", ["viewroutine","ask","Inputs","md","htl"], _example1);
  main.variable(observer("example1")).define("example1", ["Generators", "viewof example1"], (G, _) => G.input(_));
  main.variable(observer()).define(["example1"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["choice"], _18);
  main.variable(observer("viewof choice")).define("viewof choice", ["viewroutine","choose","flashSquare","flashStar"], _choice);
  main.variable(observer("choice")).define("choice", ["Generators", "viewof choice"], (G, _) => G.input(_));
  main.variable(observer("choose")).define("choose", ["htl","Event"], _choose);
  main.variable(observer("flashSquare")).define("flashSquare", ["html","Event","Promises"], _flashSquare);
  main.variable(observer("flashStar")).define("flashStar", ["htl","Event","Promises"], _flashStar);
  return main;
}
