import define1 from "./92ff66b718c1972f@141.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./e34386a07af9b73e@955.js";
import define4 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Self Folding Kirigami: The Castle Wall Constructs

Wouldn't it be nice if the paper folded itself? A demo of how to automate UI controls with [@tomlarkworthy/animation](https://observablehq.com/@tomlarkworthy/animation)

`
)}

function _animator(player,$0,$1,invalidation)
{
  function objMap(obj, func) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, func(v, k)])
    );
  }
  return player({
    state: "playing",
    animation: $0,
    writeFn: newVal => {
      const val = objMap(newVal, (v, k) =>
        k !== "n" ? v * 360 - 180 : Math.floor(v * 10)
      );
      $1.value = val;
      $1.dispatchEvent(new CustomEvent('input'));
    },
    invalidationPromise: invalidation
  });
}


function _view(ln,scene,width,html)
{
  return new Promise(resolve => {
    let eye = new ln.Vector(9, 2, 40);

    let center = new ln.Vector(eye.x, eye.y, 0);
    let up = new ln.Vector(0, 1, 0);
    const height = 500;
    let paths = scene.render(
      eye,
      center,
      up,
      width,
      height,
      35,
      0.5,
      1000,
      0.3
    );

    resolve(html`
      ${ln.toSVG(paths, 610, 400)}
    `);
  });
}


function _folds(animation,tEnd,dims,step){return(
animation({
  tRange: [0, tEnd * 2],
  dims: dims,
  pixelsPerT: 50,
  keyFrames: {
    c0: [
      { t: 0, y: 0 },
      { t: 0.5, y: 0 },
      { t: tEnd * 2 - 0.5, y: 1 },
      { t: tEnd * 2, y: 1 }
    ],
    c1: [
      { t: 0, y: 0.5 },
      { t: tEnd * 0.5, y: 0.45 },
      { t: tEnd - 0.5, y: 0.5 },
      { t: tEnd + 0.5, y: 0.5 },
      { t: tEnd * 1.5, y: 0.7 },
      { t: tEnd * 2, y: 0.5 }
    ],
    x0: step(0.75, 0.75),
    x1: step(1, 0),
    x2: step(1.5, 0.75),
    x3: step(4.5, 1), //cred
    x4: step(2.5, 0.75),
    x5: step(3, 0),
    x6: step(3.5, 0.25),
    x7: step(3.5, 0.75),
    x8: step(4, 0.75),
    n: [
      { t: 0, y: 0.2 },
      { t: 4, y: 0.2 },
      { t: tEnd, y: 0.6 },
      { t: tEnd - 4, y: 0.2 },
      { t: tEnd * 2, y: 0.2 }
    ]
  }
})
)}

function _controls(verticalSliders,dims){return(
verticalSliders({
  names: dims,
  labels: dims,
  mins:  Array(12).fill(-180),
  maxs:  Array(12).fill(180),
  steps: Array(12).fill(1)
})
)}

function _tEnd(){return(
6
)}

function _tDur(){return(
0.5
)}

function _step(tDur,tEnd){return(
(t, value, duration = tDur) => [
  { t: 0, y: 0.5 },
  { t: t - duration, y: 0.5 },
  { t: t, y: value },
  { t: 2 * tEnd - t, y: value },
  { t: 2 * tEnd - t + duration, y: 0.5 },
  { t: 2 * tEnd, y: 0.5 }
]
)}

function _dims(){return(
["c0", "c1", "x0", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "n"]
)}

function _model(ln,range,toRad,squaredrectangle,controls)
{
  const flipX = (shape) => ({
      frame: (controls) => ln.scale(new ln.Vector(-1, 1, 1)),
      folds: [shape()]
    })
  
  const repeat = (n, shape, next) => range(n).reduce(
    (acc, i) => shape(() => acc),
    next || (() => {})
  )
  
  const crenulation = (next) => ({
    frame: (u) => ln.rotate(new ln.Vector(0, 1, 0),-u.x3 * toRad)
                    .translate(new ln.Vector(0,1,0)),
    shape: squaredrectangle(1,1),
    folds: [{
      frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x3 * toRad)
                      .translate(new ln.Vector(0,1,0)),
      shape: squaredrectangle(1,1),
      folds: [next()]
    }]
  
  })
  const flatSide = () => ({ // inner
      frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x0 * toRad)
                          .translate(new ln.Vector(2,0,0)),
      shape: squaredrectangle(2,4),
      folds: [
        {
          frame: () => ln.translate(new ln.Vector(2,-1,0)),
          folds: [repeat(2, crenulation)]
        }, { // Tall outer wall
          frame: (u) => ln.translate(new ln.Vector(1,0,0))
                          .rotate(new ln.Vector(0, 1, 0), u.x1 * toRad)
                          .translate(new ln.Vector(3,0,0)),
          shape: squaredrectangle(5,4),
          folds: [{
            frame: () => ln.rotate(new ln.Vector(0,1,0), 180 * toRad).translate(new ln.Vector(0,-1,0)),
            folds: [repeat(2, crenulation)]
          },{ // Foot flap
            frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x2 * toRad)
                                .translate(new ln.Vector(5,0,0)),
            shape: squaredrectangle(1,4)
          }]
        }
      ]
    })
  
  const indentSide = () => ({ // inner
      frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x4 * toRad)
                          .translate(new ln.Vector(2,0,0)),
      shape: squaredrectangle(2,4),
      folds: [{
          frame: () => ln.translate(new ln.Vector(2,-1,0)),
          folds: [repeat(2, crenulation)]
        }, { // Upper outer wall
          frame: (u) => ln.translate(new ln.Vector(1,0,0))
                          .rotate(new ln.Vector(0, 1, 0), u.x5 * toRad)
                          .translate(new ln.Vector(3,0,0)),
          shape: squaredrectangle(2,4),
          folds: [{
              frame: () => ln.rotate(new ln.Vector(0,1,0), 180 * toRad).translate(new ln.Vector(0,-1,0)),
              folds: [repeat(2, crenulation)]
            }, { // Underhang flap
              frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x6 * toRad)
                                  .translate(new ln.Vector(2,0,0)),
              shape: squaredrectangle(1,4),
              folds: [{ // Indented lower wall
                frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x7 * toRad)
                                    .translate(new ln.Vector(1,0,0)),
                shape: squaredrectangle(3,4),
                folds: [{ // Foot
                  frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), u.x8 * toRad)
                                      .translate(new ln.Vector(3,0,0)),
                  shape: squaredrectangle(2,4)
                }]
              }
            ]
          }]
        }
      ]
    })
  const cellFlat = (next) => {
    let nextValue = undefined;
    if (next) nextValue = next();
    return ({
      // Walkway
      folds: [{
        frame: () => ln.translate(new ln.Vector(-2,0,0)),
        shape: squaredrectangle(4,4)
      },flatSide(), flipX(flatSide), {
        frame:() => ln.translate(new ln.Vector(0,4,0)),
        ...nextValue && {folds: [nextValue]}
      }]
    })
  }
  const cellIndent = (next) => {
    let nextValue = undefined;
    if (next) nextValue = next();
    return ({
      // Walkway
      folds: [{
        frame: () => ln.translate(new ln.Vector(-2,0,0)),
        shape: squaredrectangle(4,4)
      },indentSide(), flipX(indentSide), {
        frame:() => ln.translate(new ln.Vector(0,4,0)),
        ...nextValue && {folds: [nextValue]}
      }]
    })
  }

  return ({
    frame: (controls) => ln.rotate(new ln.Vector(1, 0, 0), (90) * toRad)
                  .rotate(new ln.Vector(0, 1, 0), (controls.c0) * toRad)
                  .rotate(new ln.Vector(1, 0, 0), (controls.c1 - 29) * toRad)
                  .translate(new ln.Vector(0,0,0)),
    folds: [repeat(
              Math.ceil(Math.max(1, Math.abs(controls.n))
            ), (next) => cellFlat(() => cellIndent(next)))]
  })
}


function _11(html){return(
html`<style>
      svg {
         background-image: linear-gradient(green, black); 
      }
      polyline {
        stroke: yellow;
        stroke-width: 1px;
      }
    input[type=range][orient=vertical]
    {
      writing-mode: bt-lr; /* IE */
      -webkit-appearance: slider-vertical; /* WebKit */
      width: 8px;
      height: 175px;
      padding: 0 5px;
    }
</style>`
)}

function _scene(ln,controls,model)
{
  // first thing is to create a scene
  const scene = new ln.Scene()
  
  function loadModel(scene, frame, model) {
    const f = model.frame ? frame.mul(model.frame(controls))
                          : frame;
    if(model.shape) scene.add(new ln.TransformedShape(model.shape, f));
    (model.folds || []).forEach(fold => {
      loadModel(scene, f, fold);
    })
  }
  
  loadModel(scene, ln.identity(), model);

  return scene;
}


function _squaredrectangle(ln){return(
(w, h) => {
  const thickness= 0.01;
  const min = new ln.Vector(0, 0, 0)
  const max = new ln.Vector(w, h, thickness)
  const cube = new ln.Cube(min, max)

  cube.insec
  
  // we can specify which paths to render and create new ones:
  cube.paths = function() {
    const paths = []
    const { x: x1, y: y1} = this.min
    const { x: x2, y: y2} = this.max
    for(let i = 0; i <= w; i++) {
      const x = x1 + (x2 - x1) * (i / w);
      paths.push([new ln.Vector(x, 0, thickness), new ln.Vector(x, h, thickness)])
      paths.push([new ln.Vector(x, 0, 0), new ln.Vector(x, h, 0)])
    }
    
    for(let j = 0; j <= h; j++) {
      const y = y1 + (y2 - y1) * (j / h);
      paths.push([new ln.Vector(0, y, thickness), new ln.Vector(w, y, thickness)])
      paths.push([new ln.Vector(0, y, 0), new ln.Vector(w, y, 0)])
    }
    return paths
  }
  return cube;
}
)}

function _range(){return(
(n) => [...Array(n).keys()]
)}

function _toRad(){return(
Math.PI / 180
)}

function _ln(){return(
import('https://unpkg.com/@lnjs/core@0.5.0/es/index.js?module')
)}

function _21(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof animator")).define("viewof animator", ["player","viewof folds","viewof controls","invalidation"], _animator);
  main.variable(observer("animator")).define("animator", ["Generators", "viewof animator"], (G, _) => G.input(_));
  main.variable(observer("view")).define("view", ["ln","scene","width","html"], _view);
  main.variable(observer("viewof folds")).define("viewof folds", ["animation","tEnd","dims","step"], _folds);
  main.variable(observer("folds")).define("folds", ["Generators", "viewof folds"], (G, _) => G.input(_));
  main.variable(observer("viewof controls")).define("viewof controls", ["verticalSliders","dims"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer("tEnd")).define("tEnd", _tEnd);
  main.variable(observer("tDur")).define("tDur", _tDur);
  main.variable(observer("step")).define("step", ["tDur","tEnd"], _step);
  main.variable(observer("dims")).define("dims", _dims);
  main.variable(observer("model")).define("model", ["ln","range","toRad","squaredrectangle","controls"], _model);
  main.variable(observer()).define(["html"], _11);
  main.variable(observer("scene")).define("scene", ["ln","controls","model"], _scene);
  main.variable(observer("squaredrectangle")).define("squaredrectangle", ["ln"], _squaredrectangle);
  main.variable(observer("range")).define("range", _range);
  const child1 = runtime.module(define1);
  main.import("verticalSliders", child1);
  main.variable(observer("toRad")).define("toRad", _toRad);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  const child3 = runtime.module(define3);
  main.import("animation", child3);
  main.import("player", child3);
  main.variable(observer("ln")).define("ln", _ln);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _21);
  return main;
}
