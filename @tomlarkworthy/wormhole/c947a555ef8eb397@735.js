// https://observablehq.com/@tomlarkworthy/wormhole@735
import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./bb2055d580bbbab2@106.js";

function _1(md){return(
md`# Animated Wormhole
This notebook is fractal and self-referential
`
)}

function _2(tweet){return(
tweet("1213219519096926216")
)}

function _canvas_w(slider){return(
slider({
  min: 1,
  max: 1024,
  step: 1,
  value: 512,
  format: ",",
  description:
    "Width of canvas"
})
)}

function _canvas_h(slider){return(
slider({
  min: 1,
  max: 1024,
  step: 1,
  value: 384,
  format: ",",
  description:
    "Height of canvas"
})
)}

function* _animated_wormhole(DOM,canvas_w,canvas_h,scale_x,offset_y,scale_y_inv,scale_y,skew_y,segments,thickness,foreground,arcs,lines)
{
  var ctx = DOM.context2d(canvas_w, canvas_h);
  // We flush fill the foreground color so that it fades into the natural minimum
  // of the foreground will
  ctx.lineCap = "round"; 
  
  var seg_scale_z = 0.1;
  var lineSegStep = 0.1;
  var thetaOffset = 0.5;
  
  function unitToScreen(unitCoords) {
    return [0.5 * canvas_w + 0.5 * canvas_w * unitCoords[0],
            0.5 * canvas_h + 0.5 * canvas_h * unitCoords[1]];
  }
  
  function quadratic(x, a, b, c) {
    return x * a * a + x * b + c;
  }
  
  function arcPoint(arc, segment) {
    return [segment * scale_x * seg_scale_z * Math.cos(2 * arc * Math.PI),
            offset_y + scale_y_inv / (segment * segment + 1) + quadratic(segment, 0, scale_y, skew_y) * Math.sin(2 * arc * Math.PI)];
  }
  
  function segment_f(segment) {
    return (1 + segment) - (Date.now() % 1000) / 1000;
  }
  
  function line_w(segment) {
    var unit = segment_f(segment) / segments;
    return Math.max((unit + Math.min(0, - 2 * unit + 1)) * thickness, 0.1);
  }
  
  while (true) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas_w, canvas_h);
    ctx.globalCompositeOperation = "source-over";
    
    // Rings
    for (var segment = 0; segment < segments; segment++) {
      ctx.lineWidth = line_w(segment);
      ctx.strokeStyle = foreground;
      ctx.beginPath();
      
      for (var arc = thetaOffset; arc <= arcs + thetaOffset; arc++) {
        var arc_f = arc / arcs;
        var arc_pos = unitToScreen(arcPoint(arc_f, segment_f(segment)));
        ctx.lineTo.apply(ctx, arc_pos);
      }
      ctx.stroke();
    }
    // Inward lines
    for (var line = thetaOffset; line < lines; line++) {
      ctx.strokeStyle = foreground;
      ctx.beginPath();
      var line_f = line / lines;
      for (var segment = -3; segment < segments-1; segment+= lineSegStep) {
        ctx.beginPath();
        ctx.moveTo.apply(ctx, unitToScreen(arcPoint(line_f, segment_f(segment - lineSegStep))));
        var arc_pos = unitToScreen(arcPoint(line_f, segment_f(segment)));
        ctx.lineTo.apply(ctx, arc_pos);
        ctx.lineWidth = line_w(segment);
        ctx.stroke();
      }
    }
    
    yield ctx.canvas
  }  
}


function _foreground(color){return(
color({
  value: "#ffeb34",
  title: "Foreground Color"
})
)}

function _thickness(slider){return(
slider({
  min: 1,
  max: 10,
  value: 6
})
)}

function _segments(slider){return(
slider({
  min: 1,
  max: 24,
  step: 1,
  value: 12
})
)}

function _arcs(slider){return(
slider({
  min: 3,
  max: 50,
  step: 1,
  value: 32,
})
)}

function _lines(slider){return(
slider({
  min: 0,
  max: 64,
  step: 1,
  value: 14})
)}

function _scale_x(slider){return(
slider({
  min: 0,
  max: 5,
  value: 0.73})
)}

function _scale_y(slider){return(
slider({
  min: 0,
  max: 1,
  value: 0.04})
)}

function _scale_y_inv(slider){return(
slider({
  min: -2,
  max: 2,
  value: .95})
)}

function _offset_y(slider){return(
slider({
  min: -1,
  max: 1,
  value: -0.13})
)}

function _skew_y(slider){return(
slider({
  min: -1,
  max: 1,
  value: 0})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tweet"], _2);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define1);
  main.import("color", child2);
  const child3 = runtime.module(define2);
  main.import("tweet", child3);
  main.variable(observer("viewof canvas_w")).define("viewof canvas_w", ["slider"], _canvas_w);
  main.variable(observer("canvas_w")).define("canvas_w", ["Generators", "viewof canvas_w"], (G, _) => G.input(_));
  main.variable(observer("viewof canvas_h")).define("viewof canvas_h", ["slider"], _canvas_h);
  main.variable(observer("canvas_h")).define("canvas_h", ["Generators", "viewof canvas_h"], (G, _) => G.input(_));
  main.variable(observer("viewof animated_wormhole")).define("viewof animated_wormhole", ["DOM","canvas_w","canvas_h","scale_x","offset_y","scale_y_inv","scale_y","skew_y","segments","thickness","foreground","arcs","lines"], _animated_wormhole);
  main.variable(observer("animated_wormhole")).define("animated_wormhole", ["Generators", "viewof animated_wormhole"], (G, _) => G.input(_));
  main.variable(observer("viewof foreground")).define("viewof foreground", ["color"], _foreground);
  main.variable(observer("foreground")).define("foreground", ["Generators", "viewof foreground"], (G, _) => G.input(_));
  main.variable(observer("viewof thickness")).define("viewof thickness", ["slider"], _thickness);
  main.variable(observer("thickness")).define("thickness", ["Generators", "viewof thickness"], (G, _) => G.input(_));
  main.variable(observer("viewof segments")).define("viewof segments", ["slider"], _segments);
  main.variable(observer("segments")).define("segments", ["Generators", "viewof segments"], (G, _) => G.input(_));
  main.variable(observer("viewof arcs")).define("viewof arcs", ["slider"], _arcs);
  main.variable(observer("arcs")).define("arcs", ["Generators", "viewof arcs"], (G, _) => G.input(_));
  main.variable(observer("viewof lines")).define("viewof lines", ["slider"], _lines);
  main.variable(observer("lines")).define("lines", ["Generators", "viewof lines"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_x")).define("viewof scale_x", ["slider"], _scale_x);
  main.variable(observer("scale_x")).define("scale_x", ["Generators", "viewof scale_x"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_y")).define("viewof scale_y", ["slider"], _scale_y);
  main.variable(observer("scale_y")).define("scale_y", ["Generators", "viewof scale_y"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_y_inv")).define("viewof scale_y_inv", ["slider"], _scale_y_inv);
  main.variable(observer("scale_y_inv")).define("scale_y_inv", ["Generators", "viewof scale_y_inv"], (G, _) => G.input(_));
  main.variable(observer("viewof offset_y")).define("viewof offset_y", ["slider"], _offset_y);
  main.variable(observer("offset_y")).define("offset_y", ["Generators", "viewof offset_y"], (G, _) => G.input(_));
  main.variable(observer("viewof skew_y")).define("viewof skew_y", ["slider"], _skew_y);
  main.variable(observer("skew_y")).define("skew_y", ["Generators", "viewof skew_y"], (G, _) => G.input(_));
  return main;
}
