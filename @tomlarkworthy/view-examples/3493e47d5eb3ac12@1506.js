import define1 from "./f92778131fd76559@1174.js";
import define2 from "./84e66f78139ac354@829.js";
import define3 from "./10134c5b92ee515d@869.js";
import define4 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# View Composition Examples


Here we play _view_ template literal and related techniques. The _view_ literal lets you build components heirarchically. Its _closed_. Each construction is also a _view_ and can be placed inside another _view_ literal.

Because each view is a multi-level views, the system plays very well with _Inputs.bind_. You can _bind_ to not jus tthe root view, but also individual fields in the composite. This allows interesting and programatic cross-wiring across sibling cells. I think of _bind_ as dimension reduction. What was once two free parameters becomes one after binding.

Well written _views_ are back-writable (and _view_ template literal does this for you). Using back-writability, we can acheive business-presentation logic seperation. Simply have the business logic in a different cell manipulating the presentation parameters view writes.

Because data updates propogate in a different logical channel to the presentation code channel, we can acheive good performance by targetted manipulation of DOM nodes on data changes. In this notebook we use _reconcile_ which probably is not as effecient as possible, but fairly trivial to implement.



`
)}

function _4(md){return(
md`## Heirarchical Composition`
)}

function _5(md){return(
md`### Isosceles

Create a parameterized shape in 3D.
`
)}

function _isosceles(DOM,variable,reconcile,viewSvg){return(
({ w = 100, l = 100, color = "#0000FF" } = {}) => {
  // TODO: Pass in variable
  const id = DOM.uid().id; // A uid helps reconcile's matcher.
  const wVar = variable(w).onWrite(() => reconcile(me, render()));
  const lVar = variable(l).onWrite(() => reconcile(me, render()));
  const colorVar = variable(color, () => reconcile(me, render()));
  const render = () =>
    viewSvg`<polygon id=${id} fill=${colorVar} points=
      "${wVar.value / 2} 0, 0 ${lVar.value}, ${-wVar.value / 2} 0"
    ><!-- ${["w", wVar]} ${["l", lVar]} ${["color", colorVar]} -->`; // TODO, better way to bind dummies
  const me = render();
  return me;
}
)}

function _isoscelesFabian(DOM,propsToVars,reconcile,htl){return(
({
  w = 100 /* TODO Could we pass in a variable here and bind to it automgically*/,
  l = 100,
  color = "#0000FF"
} = {}) => {
  const id = DOM.uid().id; // A uid helps reconcile's matcher.
  const vars = propsToVars({ w, l, color }, () => reconcile(me, render(vars)));
  const render = ({ color, w, l }) =>
    htl.svg`<polygon id=${id} fill=${color} points=
      "${w / 2} 0, 0 ${l}, ${-w / 2} 0"
    ></polygon>`;
  const me = render(vars);
  console.log("me", me.w);
  me.value = {};
  Object.entries(vars).forEach(([name, variable]) => {
    Object.defineProperty(me, name, {
      get: () => variable,
      set: (v) => (variable = v),
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(me.value, name, {
      get: () => variable.value,
      set: (v) => (variable.value = v),
      enumerable: true,
      configurable: true
    });
  });
  return me;
}
)}

function _propsToVars(variable){return(
(obj, onWrite) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, variable(v).onWrite(onWrite)]))
)}

function _testIsosceles(isosceles){return(
isosceles()
)}

function _10($0){return(
$0.values
)}

function _11(md){return(
md`The _viewof_ is an SVG element`
)}

function _12($0){return(
$0.outerHTML
)}

function _13(md){return(
md`The data is the parameters, which are individually backwritable`
)}

function _14(testIsosceles){return(
testIsosceles.w
)}

function _15(md){return(
md`#### View nesting`
)}

function _16(md){return(
md`We can embed views inside other views with the view literal`
)}

function _17(htl,$0){return(
htl.svg`<svg width="100px" viewBox="-200 -200 400 400">
  ${$0}
`
)}

function _18(md){return(
md`We can add a UI to a view by binding to sibling views`
)}

function _19(md){return(
md`#### Bind a single control to a single field of the component`
)}

function _sigleWidth(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 1000], { label: "width", value: 10 }),
  $0.w
)
)}

function _21(testIsosceles){return(
testIsosceles.w
)}

function _22(md){return(
md`#### Bind a composite control to the whole component`
)}

function _dartLook(Inputs,view,colorPicker,$0){return(
Inputs.bind(
  view`<div style="height: 100px">
  ${["w", Inputs.range([0, 1000], { label: "width" })]}
  ${["l", Inputs.range([0, 1000], { label: "length" })]}
  ${
    [
      "color",
      colorPicker($0.color.value)
    ] /* Manual fix for non backwritability */
  }
`,
  $0
)
)}

function _24(testIsosceles){return(
testIsosceles
)}

function _25(md){return(
md`#### Programatically manipulate parameters

The parameters are backwritable too
`
)}

function _26($0,Event)
{
  $0.w.value = 20;
  $0.l.value = 50;
  $0.w.dispatchEvent(new Event('input', { bubbles: true })); // TODO bubbling broke?
  $0.dispatchEvent(new Event('input', { bubbles: true }));
}


function _27(md){return(
md`### Transform

Create a parameterized transform. The useful thing is that we can minimize recomputation of the DOM stable for changes in transform parameters.
`
)}

function _transform(DOM,variable,reconcile,viewSvg){return(
({ tx = 0, ty = 0, sx = 1, sy = 1, angle = 0, inner } = {}) => {
  const id = DOM.uid().id;
  const txVar = variable(tx).onWrite(() => reconcile(me, render()));
  const tyVar = variable(ty).onWrite(() => reconcile(me, render()));
  const sxVar = variable(sx).onWrite(() => reconcile(me, render()));
  const syVar = variable(sy).onWrite(() => reconcile(me, render()));
  const aVar = variable(angle).onWrite(() => reconcile(me, render()));
  const render = () =>
    viewSvg`<g id=${id} transform="
        translate(${["tx", txVar]} ${["ty", tyVar]})
        scale(${["sx", sxVar]} ${["sy", syVar]})
        rotate(${["angle", aVar]})">
      ${["inner", inner]}
    </g>`;
  const me = render();
  return me;
}
)}

function _testTransform(transform,isosceles){return(
transform({ inner: isosceles(), tx: 100 })
)}

function _30(testTransform){return(
testTransform
)}

function _31($0){return(
$0
)}

function _32($0){return(
$0.outerHTML
)}

function _33(htl,$0){return(
htl.svg`<svg width="100" viewBox="-100 -100 200 200">
  ${$0}
`
)}

function _34(md){return(
md`#### Bind to Controls`
)}

function _35(view,Inputs,$0,colorPicker){return(
view`<div style="height: 250px">
  ${Inputs.bind(
    Inputs.range([0, 200], { label: "tx" }),
    $0.tx
  )}
  ${Inputs.bind(
    Inputs.range([-100, 200], { label: "ty" }),
    $0.ty
  )}
  ${Inputs.bind(
    Inputs.range([0, 5], { label: "scale x" }),
    $0.sx
  )}
  ${Inputs.bind(
    Inputs.range([0, 5], { label: "scale y" }),
    $0.sy
  )}
  ${Inputs.bind(
    Inputs.range([-360, 360], { label: "angle" }),
    $0.angle
  )}
  ${Inputs.bind(
    Inputs.range([-100, 200], { label: "width" }),
    $0.inner.w
  )}
  ${Inputs.bind(
    Inputs.range([-100, 200], { label: "length" }),
    $0.inner.l
  )}
  ${Inputs.bind(
    colorPicker($0.inner.color.value),
    $0.inner.color
  )}
`
)}

function _36(md){return(
md`## Arrays

`
)}

function _arrayOfSlider(md){return(
md`#### Array of sliders`
)}

function _arrayControl(view,Inputs){return(
view`<div style="display: flex">
  <table>
  ${[
    "r",
    // Its slightly annoying we have to bind the inner control to a property
    new Array(10).fill(null).map((r, i) => {
      return view`<tr>
        <td>${[
          "v",
          Inputs.range([0, 10], { label: `r[${i}].v`, value: i })
        ]}</td>
      </tr>`;
    })
  ]}
  </table>
</div>`
)}

function _39(arrayControl){return(
arrayControl
)}

function _40($0){return(
$0
)}

function _41(md){return(
md`### Coordinating arrays`
)}

function _dartParams(view,Inputs){return(
view`
  ${[
    "n",
    Inputs.range([0, 1000], {
      label: "number of darts",
      value: 50,
      step: 1
    })
  ]}

  ${[
    "v",
    Inputs.range([0, 100], {
      label: "velocity of darts",
      value: 5
    })
  ]}
`
)}

function _43(md){return(
md`## Fullsize world`
)}

function _world(viewSvg,width,documentHeight,dartParams,isosceles,Inputs,$0,invalidation,transform){return(
viewSvg`<svg style="position: fixed; top: 0px; botom:0px;" width="${width}" height=${documentHeight} viewBox="0 0 ${width} ${documentHeight}" pointer-events="none">
  ${[
    "darts",
    new Array(dartParams.n).fill(null).map((_, i) => {
      const dart = isosceles({
        color: `hsla(${(i * 360) / dartParams.n},100%, 50%, 20%)`
      });
      Inputs.bind(dart.w, $0.w, invalidation);
      Inputs.bind(dart.l, $0.l, invalidation);
      return transform({
        inner: dart,
        angle: -(i * 360) / dartParams.n,
        tx: 100 * Math.sin((2 * i * Math.PI) / dartParams.n) + width / 2,
        ty: 100 * Math.cos((2 * i * Math.PI) / dartParams.n) + width / 2
      });
    })
  ]}
`
)}

function _45(world){return(
world
)}

function _46($0){return(
$0
)}

function _47(md){return(
md`By puppeteering view data by backwriting from sibling cells, we can seperate logic from presentation`
)}

function _dartControl(now,world,dartParams,mousePos)
{
  now;
  world.darts.forEach(dart => {
    dart.tx -= dartParams.v * Math.sin((2 * Math.PI * dart.angle) / 360);
    dart.ty += dartParams.v * Math.cos((2 * Math.PI * dart.angle) / 360);
    const target =
      (Math.atan2(dart.tx - mousePos[0], -dart.ty + mousePos[1]) * 180) /
      Math.PI;
    let error = target - dart.angle;
    while (error > 180) error -= 360;
    while (error < -180) error += 360;

    if (error > 180) error = 360 - error;
    dart.angle += 0.01 * error;
  });
}


function _49(md){return(
md`## Temporal Composition

Composing UI across time is a technique used in the games industry under the term of coroutines. Its very useful for creating animation sequences. 
`
)}

function _50(md){return(
md`### Basic coroutine with a generator`
)}

async function* _coroutineExample(html,Promises)
{
  let t = 0;
  while (true) {
    yield html`<span style="display:inline-block; width:50px;height:50px; background-color: hsl(${(t =
      (t + 5) % 360)}, 50%, 50%);"></span>`;
    await Promises.delay(50);
  }
}


function _52($0){return(
$0
)}

function _53(coroutineExample){return(
coroutineExample
)}

function _54(md){return(
md`### Coroutines are an async function*

(as are cells)
`
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
  return null; // End coroutine
}
)}

function _toView(Event,reconcile){return(
function toView(generator) {
  let current;
  const holder = Object.defineProperty(document.createElement('span'), 'value', {
    get : () => current?.value,
    set : (v) => current ? current.value = v : null,
    enumerable: true
  });
  
  new Promise(async () => {
    const iterator = generator();
    let { done, value } = await iterator.next();
    while (!done) {
      if (value instanceof Event) { 
        holder.dispatchEvent(value);
      } else {
        current = value
        if (value) {
          const span = document.createElement('span');
          span.appendChild(value);
          reconcile(holder, span);
        }
      }
      ({ done, value } = await iterator.next());
    }
    holder.remove();
  });
  return holder;
}
)}

function _57(md){return(
md`A noticable difference to Observable cells is the DOM removes itself when the coroutine finishes`
)}

function _58(toView,flashSquare){return(
toView(flashSquare)
)}

function _59(flashSquare){return(
flashSquare()
)}

async function _square(view,toView,flashSquare){return(
view`<span>${['sqaure', await toView(flashSquare)]}`
)}

function _61(square){return(
square.square
)}

function _62(md){return(
md`#### Combining coroutines

The power of coroutines is the ability to hold state in the closure, and that they can be sequences together
`
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

function _64(flashStar){return(
flashStar()
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

async function _animatedUI(view,toView,choose,flashSquare,flashStar){return(
view`<span>${[
  'choice',
  await toView(async function*() {
    while (true) {
      const choice = yield* choose();
      if (choice == 'square') yield* flashSquare();
      if (choice == 'star') yield* flashStar();
    }
  })
]}`
)}

function _67(animatedUI){return(
animatedUI
)}

function _68($0){return(
$0
)}

function _variable(EventTarget){return(
function variable(value) {
  let onWrites = [];
  const self = new EventTarget();
  return Object.defineProperties(self, {
    value: {
      get: () => value,
      set: newValue => {
        value = newValue;
        onWrites.forEach(onWrite => onWrite(value)); // TODO: use CustomEvent
      },
      enumerable: true
    },
    toString: {
      // Should this be a Text node?
      value: () => `${value}`
    },
    onWrite: {
      value: cb => {
        onWrites.push(cb);
        return self;
      }
    }
  });
}
)}

function _documentBody(Generators,ResizeObserver){return(
Generators.observe((notify) => {
  const resizeObserver = new ResizeObserver((entries) =>
    notify(entries[0].target)
  );
  resizeObserver.observe(document.body);
})
)}

function _documentHeight(documentBody){return(
documentBody.clientHeight
)}

function _mousePos(Generators,invalidation){return(
Generators.observe(notify => {
  const pointermoved = e => {
    notify([e.clientX, e.clientY]);
  };
  document.addEventListener("pointermove", pointermoved);
  invalidation.then(() => {
    document.removeEventListener("pointermove", pointermoved);
  });
})
)}

function _76(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("viewSvg", child1);
  const child2 = runtime.module(define2);
  main.import("reconcile", child2);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("isosceles")).define("isosceles", ["DOM","variable","reconcile","viewSvg"], _isosceles);
  main.variable(observer("isoscelesFabian")).define("isoscelesFabian", ["DOM","propsToVars","reconcile","htl"], _isoscelesFabian);
  main.variable(observer("propsToVars")).define("propsToVars", ["variable"], _propsToVars);
  main.variable(observer("viewof testIsosceles")).define("viewof testIsosceles", ["isosceles"], _testIsosceles);
  main.variable(observer("testIsosceles")).define("testIsosceles", ["Generators", "viewof testIsosceles"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof testIsosceles"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["viewof testIsosceles"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["testIsosceles"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["htl","viewof testIsosceles"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof sigleWidth")).define("viewof sigleWidth", ["Inputs","viewof testIsosceles"], _sigleWidth);
  main.variable(observer("sigleWidth")).define("sigleWidth", ["Generators", "viewof sigleWidth"], (G, _) => G.input(_));
  main.variable(observer()).define(["testIsosceles"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof dartLook")).define("viewof dartLook", ["Inputs","view","colorPicker","viewof testIsosceles"], _dartLook);
  main.variable(observer("dartLook")).define("dartLook", ["Generators", "viewof dartLook"], (G, _) => G.input(_));
  main.variable(observer()).define(["testIsosceles"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["viewof testIsosceles","Event"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("transform")).define("transform", ["DOM","variable","reconcile","viewSvg"], _transform);
  main.variable(observer("viewof testTransform")).define("viewof testTransform", ["transform","isosceles"], _testTransform);
  main.variable(observer("testTransform")).define("testTransform", ["Generators", "viewof testTransform"], (G, _) => G.input(_));
  main.variable(observer()).define(["testTransform"], _30);
  main.variable(observer()).define(["viewof testTransform"], _31);
  main.variable(observer()).define(["viewof testTransform"], _32);
  main.variable(observer()).define(["htl","viewof testTransform"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["view","Inputs","viewof testTransform","colorPicker"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("arrayOfSlider")).define("arrayOfSlider", ["md"], _arrayOfSlider);
  main.variable(observer("viewof arrayControl")).define("viewof arrayControl", ["view","Inputs"], _arrayControl);
  main.variable(observer("arrayControl")).define("arrayControl", ["Generators", "viewof arrayControl"], (G, _) => G.input(_));
  main.variable(observer()).define(["arrayControl"], _39);
  main.variable(observer()).define(["viewof arrayControl"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof dartParams")).define("viewof dartParams", ["view","Inputs"], _dartParams);
  main.variable(observer("dartParams")).define("dartParams", ["Generators", "viewof dartParams"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("viewof world")).define("viewof world", ["viewSvg","width","documentHeight","dartParams","isosceles","Inputs","viewof dartLook","invalidation","transform"], _world);
  main.variable(observer("world")).define("world", ["Generators", "viewof world"], (G, _) => G.input(_));
  main.variable(observer()).define(["world"], _45);
  main.variable(observer()).define(["viewof world"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("dartControl")).define("dartControl", ["now","world","dartParams","mousePos"], _dartControl);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("viewof coroutineExample")).define("viewof coroutineExample", ["html","Promises"], _coroutineExample);
  main.variable(observer("coroutineExample")).define("coroutineExample", ["Generators", "viewof coroutineExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof coroutineExample"], _52);
  main.variable(observer()).define(["coroutineExample"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("flashSquare")).define("flashSquare", ["html","Event","Promises"], _flashSquare);
  main.variable(observer("toView")).define("toView", ["Event","reconcile"], _toView);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["toView","flashSquare"], _58);
  main.variable(observer()).define(["flashSquare"], _59);
  main.variable(observer("viewof square")).define("viewof square", ["view","toView","flashSquare"], _square);
  main.variable(observer("square")).define("square", ["Generators", "viewof square"], (G, _) => G.input(_));
  main.variable(observer()).define(["square"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("flashStar")).define("flashStar", ["htl","Event","Promises"], _flashStar);
  main.variable(observer()).define(["flashStar"], _64);
  main.variable(observer("choose")).define("choose", ["htl","Event"], _choose);
  main.variable(observer("viewof animatedUI")).define("viewof animatedUI", ["view","toView","choose","flashSquare","flashStar"], _animatedUI);
  main.variable(observer("animatedUI")).define("animatedUI", ["Generators", "viewof animatedUI"], (G, _) => G.input(_));
  main.variable(observer()).define(["animatedUI"], _67);
  main.variable(observer()).define(["viewof animatedUI"], _68);
  const child3 = runtime.module(define1);
  main.import("cautious", child3);
  const child4 = runtime.module(define3);
  main.import("colorPicker", child4);
  main.variable(observer("variable")).define("variable", ["EventTarget"], _variable);
  main.variable(observer("documentBody")).define("documentBody", ["Generators","ResizeObserver"], _documentBody);
  main.variable(observer("documentHeight")).define("documentHeight", ["documentBody"], _documentHeight);
  main.variable(observer("mousePos")).define("mousePos", ["Generators","invalidation"], _mousePos);
  const child5 = runtime.module(define4);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _76);
  return main;
}
