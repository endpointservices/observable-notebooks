import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./8d271c22db968ab0@160.js";
import define3 from "./dfdb38d5580b5c35@351.js";

async function _1(md,FileAttachment){return(
md`# Infinite Kirigami: The Endless Wall

With introduction of a (t) => svg function we can create motion. By passing the _repeat_ index through the kinematic graph, we can interplolate along an infinite line.

![screenshot](${await FileAttachment("image@1.png").url()})

The implementation is slow on my computer now, this is an easy way to create a lot of geometry fast.
`
)}

function _model(ln,range,interpolate,toRad,squaredrectangle,controls){return(
(frame) => {
  const flipX = (shape, next, i) => ({
      frame: (controls) => ln.scale(new ln.Vector(-1, 1, 1)),
      folds: [shape(next, i)]
    })
  
  const repeat = (n, shape, next) => range(n).reduce(
    (acc, i) => shape((i) => acc, i),
    next || (() => {})
  )
  
  const crenulation = (i) => (next) => ({
    frame: (u) => ln.rotate(new ln.Vector(0, 1, 0),-interpolate(i+frame, 0, 180) * toRad)
                    .translate(new ln.Vector(0,1,0)),
    shape: squaredrectangle(1,1),
    folds: [{
      frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), interpolate(i+frame, 0, 180) * toRad)
                      .translate(new ln.Vector(0,1,0)),
      shape: squaredrectangle(1,1),
      folds: [next()]
    }]
  
  })
  const flatSide = (next, i) => ({ // inner
      frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), interpolate(i + frame, 0, 90) * toRad)
                          .translate(new ln.Vector(2,0,0)),
      shape: squaredrectangle(2,4),
      folds: [
        {
          frame: () => ln.translate(new ln.Vector(2,-1,0)),
          folds: [repeat(2, crenulation(i))]
        }, { // Tall outer wall
          frame: (u) => ln.translate(new ln.Vector(1,0,0))
                          .rotate(new ln.Vector(0, 1, 0), interpolate(i+frame, 0, -180) * toRad)
                          .translate(new ln.Vector(3,0,0)),
          shape: squaredrectangle(5,4),
          folds: [{
            frame: () => ln.rotate(new ln.Vector(0,1,0), 180 * toRad).translate(new ln.Vector(0,-1,0)),
            folds: [repeat(2, crenulation(i))]
          },{ // Foot flap
            frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), interpolate(i + frame, 0, 90) * toRad)
                                .translate(new ln.Vector(5,0,0)),
            shape: squaredrectangle(1,4)
          }]
        }
      ]
    })
  
  const indentSide = (next, i) => ({ // inner
      frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), interpolate(i + frame, 0, 90) * toRad)
                      .translate(new ln.Vector(2,0,0)),
      shape: squaredrectangle(2,4),
      folds: [{
          frame: () => ln.translate(new ln.Vector(2,-1,0)),
          folds: [repeat(2, crenulation(i))]
        }, { // Upper outer wall
          frame: (u) => ln.translate(new ln.Vector(1,0,0))
                          .rotate(new ln.Vector(0, 1, 0), interpolate(i +frame, 0, -180) * toRad)
                          .translate(new ln.Vector(3,0,0)),
          shape: squaredrectangle(2,4),
          folds: [{
              frame: () => ln.rotate(new ln.Vector(0,1,0), 180 * toRad)
                             .translate(new ln.Vector(0,-1,0)),
              folds: [repeat(2, crenulation(i))]
            }, { // Underhang flap
              frame: (u) => ln.rotate(new ln.Vector(0, 1, 0),interpolate(i + frame, 0, -90) * toRad)
                              .translate(new ln.Vector(2,0,0)),
              shape: squaredrectangle(1,4),
              folds: [{ // Indented lower wall
                frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), interpolate(i+frame, 0, 90) * toRad)
                                .translate(new ln.Vector(1,0,0)),
                shape: squaredrectangle(3,4),
                folds: [{ // Foot
                  frame: (u) => ln.rotate(new ln.Vector(0, 1, 0), interpolate(i + frame, 0, 90) * toRad)
                                  .translate(new ln.Vector(3,0,0)),
                  shape: squaredrectangle(2,4)
                }]
              }
            ]
          }]
        }
      ]
    })
  const cellFlat = (next, i) => {
    let nextValue = undefined;
    if (next) nextValue = next(i);
    return ({
      // Walkway
      folds: [{
        frame: () => ln.translate(new ln.Vector(-2,0,0)),
        shape: squaredrectangle(4,4)
      },flatSide(null, i), flipX(flatSide, null, i), {
        frame:() => ln.translate(new ln.Vector(0,4,0)),
        ...nextValue && {folds: [nextValue]}
      }]
    })
  }
  const cellIndent = (next, i) => {
    let nextValue = undefined;
    if (next) nextValue = next(i);
    return ({
      // Walkway
      folds: [{
        frame: () => ln.translate(new ln.Vector(-2,0,0)),
        shape: squaredrectangle(4,4)
      },indentSide(null, i), flipX(indentSide, null, i), {
        frame:() => ln.translate(new ln.Vector(0,4,0)),
        ...nextValue && {folds: [nextValue]}
      }]
    })
  }

  return ({
    frame: (controls) => ln.translate(new ln.Vector(0,8-frame * 8,0)),
    folds: [repeat(
      Math.ceil(Math.max(1, Math.abs(controls.n / 10))),
      (next, i) => {
        return cellFlat(() => cellIndent(next, i), i);
      })]
  })
}
)}

function _3(controls){return(
controls
)}

function _interpolate(controls){return(
(i, start, end) => (start + Math.max(0, Math.min(1, (i + controls.d) / controls.l)) * (end - start))
)}

function _controls(form,html)
{
  const labels = ["r", "of", "c0", "c1", "d", "l", "n"]
  const values = {
    "r": 42,
    "of": 42,
    "c0": -100,
    "c1": 180,
    "d": -6,
    "l": 7,
    "n": 144,
  }
  return form(html`<form><table>
    <tfoot>
      <tr>
        ${labels.map(label => html`<td><i>${label}</i></td>`)}
      </tr>
    </tfoot>
    <tbody>
      <tr>
        ${labels.map(label => html`<td><input
          type=range
          name="${label}" 
          min=-180 max=180
          value="${values[label] || 0}"
          orient=vertical></td>`)}
      </tr>
    </tbody></table>`)
}


function* _view(svg)
{
  let frame = 0;
  while (true) {
    yield svg(frame / 30.0)
    frame = ((frame + 1) % 30)
  }
}


function _svg(controls,ln,toRad,scene,width,html){return(
(frame) => {
  const r = controls.r
  const offset = controls.of
  let eye = new ln.Vector(
    r * Math.cos(controls.c0 * toRad) * Math.cos(controls.c1 * toRad),
    r * Math.sin(controls.c0 * toRad) + offset,
    r * Math.sin(controls.c1 * toRad));

  let center = new ln.Vector(0, offset, 0);
  let up = new ln.Vector(0, 0, 1);
  const height = 500
  let paths = scene(frame).render(eye, center, up, width, height, 35, 0.5, 1000, 0.3)
  const svgCode = ln.toSVG(paths, width, height)
  const svg = html`${svgCode}`
  svg.setAttribute( 'style', `stroke: yellow !important;
                              background-image: linear-gradient(50deg, #EEE, #EFE); 
                              stroke-width: 1px`)
  //throw Error()
  return svg
}
)}

function _scene(ln,controls,model){return(
(frame) => {
  // first thing is to create a scene
  const scene = new ln.Scene()
  
  function loadModel(scene, frame, model) {
    if (model === undefined) return;
    const f = model.frame ? frame.mul(model.frame(controls))
                          : frame;
    if(model.shape) scene.add(new ln.TransformedShape(model.shape, f));
    (model.folds || []).forEach(fold => {
      loadModel(scene, f, fold);
    })
  }
  
  loadModel(scene, ln.identity(), model(frame));
  return scene;
}
)}

function _9(html){return(
html`<style>
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

function _17(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/5124797db70bfc1d8b7c056787ff0059b13c569921ed8c9a13300ac102f58256a8b9b5eef29cee071023516ca8513b68bc8be33c7c1639fbb792dbfde566081b.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer("model")).define("model", ["ln","range","interpolate","toRad","squaredrectangle","controls"], _model);
  main.variable(observer()).define(["controls"], _3);
  main.variable(observer("interpolate")).define("interpolate", ["controls"], _interpolate);
  main.variable(observer("viewof controls")).define("viewof controls", ["form","html"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer("view")).define("view", ["svg"], _view);
  main.variable(observer("svg")).define("svg", ["controls","ln","toRad","scene","width","html"], _svg);
  main.variable(observer("scene")).define("scene", ["ln","controls","model"], _scene);
  main.variable(observer()).define(["html"], _9);
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
  main.variable(observer()).define(["footer"], _17);
  return main;
}
