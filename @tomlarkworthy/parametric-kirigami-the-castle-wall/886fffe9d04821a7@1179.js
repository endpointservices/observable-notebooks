import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./8d271c22db968ab0@160.js";
import define3 from "./dfdb38d5580b5c35@334.js";

async function _1(md,FileAttachment){return(
md`# Parametric Kirigami: The Castle Wall

As hinted at [last time](https://observablehq.com/@tomlarkworthy/kirigami-turret), we can fold in paper space but also in program space. We use the

~~~js
   flipX(shape)
   repeat(n, shape, next)
~~~

combinators to capture symmetry present in our design.

![castle](${await FileAttachment("IMG_20201216_213753.jpg").url()})

`
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
    console.log(next)
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
    console.log(next)
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
              Math.ceil(Math.max(1, Math.abs(controls.n / 10))
            ), (next) => cellFlat(() => cellIndent(next)))]
  })
}


function _3(controls){return(
controls
)}

function _controls(form,html)
{
  const labels = ["c0", "c1", "x0", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "n"]
  return form(html`<form><table>
    <tfoot>
      <tr>
        ${labels.map(label => html`<td><i>${label}</i></td>`)}
      </tr>
    </tfoot>
    <tbody>
      <tr>
        ${labels.map(label => html`<td><input type=range min=-180 max=180 name="${label}" orient=vertical></td>`)}
      </tr>
    </tbody></table>`)
}


function _view(ln,scene,width,html)
{
  return new Promise((resolve) => {
    let eye = new ln.Vector(6,2,40);
    
    let center = new ln.Vector(eye.x, eye.y, 0);
    let up = new ln.Vector(0, 1, 0);
    const height = 500
    let paths = scene.render(eye, center, up, width, height, 35, 0.5, 1000, 0.3)
  
    resolve(html`
      ${ln.toSVG(paths, width, height)}
    `)
  });
}


function _6(html){return(
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

function _15(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["IMG_20201216_213753.jpg", {url: new URL("./files/8e5775721adc56171acfefd49942711e5f3e595690fa73466bbe968b1acab44cdb798dbd113155c74c65bc2877ab0603b72f628145a0b40b79c027a4821ac787.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer("model")).define("model", ["ln","range","toRad","squaredrectangle","controls"], _model);
  main.variable(observer()).define(["controls"], _3);
  main.variable(observer("viewof controls")).define("viewof controls", ["form","html"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer("view")).define("view", ["ln","scene","width","html"], _view);
  main.variable(observer()).define(["html"], _6);
  main.variable(observer("scene")).define("scene", ["ln","controls","model"], _scene);
  main.variable(observer("squaredrectangle")).define("squaredrectangle", ["ln"], _squaredrectangle);
  main.variable(observer("range")).define("range", _range);
  main.variable(observer("toRad")).define("toRad", _toRad);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("form", child2);
  main.variable(observer("ln")).define("ln", _ln);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _15);
  return main;
}
