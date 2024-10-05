import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Lazer Light`
)}

function* _spring(DOM,canvas_w,canvas_h,drawLazerPath)
{
  var ctx = DOM.context2d(canvas_w, canvas_h);
  // We flush fill the foreground color so that it fades into the natural minimum
  // of the foreground will
  ctx.lineCap = "round";
  
  function vortexPoints(offset, coils, tightness, scale_x, scale_y) {
    var points = [];
    for (var theta = offset; theta < offset + coils * 2 * Math.PI; theta += 0.3) {
      const width = (coils * 2 * Math.PI - (theta-offset -10)) / (coils * 2 * Math.PI);
      const shakeyness = 30;
      const shake = (Math.random() / shakeyness + (1 - 1 / shakeyness) );
      points.push([
        width * Math.cos(theta) * scale_x * canvas_w * 0.5 * shake + canvas_w / 2,
        width * Math.sin(theta) * scale_y * canvas_h * shake + (theta - offset) * tightness + canvas_h / 2
      ]);
    }
    return points;
  }
  const start_time = Date.now();
  while (true) {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas_w, canvas_h);
    drawLazerPath(ctx, vortexPoints(
      - 2 * Math.PI * ((Date.now() - start_time) / 500),
      10,
      4,
      0.25,
      0.1
    ));
    
    yield ctx.canvas
  }  
}


function* _spring_beam(DOM,canvas_w,canvas_h,tickBeam)
{
  var ctx = DOM.context2d(canvas_w, canvas_h);
  // We flush fill the foreground color so that it fades into the natural minimum
  // of the foreground will
  ctx.lineCap = "round";
  
  function vortexPoints(start, end, scale_x, scale_y) {
    var points = [];
    var step = (end - start) / 10;
    for (var theta = start; theta <= end + step / 2; theta += step) {
      const width = 3;
      points.push([
        width * Math.cos(theta * Math.PI * 2) * scale_x * canvas_w * 0.5 + canvas_w / 2,
        width * Math.sin(theta * Math.PI * 2) * scale_y * canvas_h * 0.5 + canvas_h / 2
      ]);
    }
    return points;
  }
  var beam_state = undefined;
  var velocity = 1;
  var t_prev = (((Date.now() - 10) / 1000) * velocity);
  while (true) {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas_w, canvas_h);
    var t_now = (Date.now() / 1000 * velocity);
    var points = vortexPoints(
      t_prev,
      t_now,
      0.25,
      0.1
    );
    t_prev = t_now;
    beam_state = tickBeam(ctx, Date.now(), points, beam_state);
    
    yield ctx.canvas
  }  
}


function _canvas_w(slider){return(
slider({
  min: 1,
  max: 1024,
  step: 1,
  value: 800,
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
  value: 600,
  format: ",",
  description:
    "Height of canvas"
})
)}

function _halo_color(color){return(
color({
  value: "#80182c",
  title: "Midground Color"
})
)}

function _saturation_color(color){return(
color({
  value: "#fff6fb",
  title: "Foreground Color"
})
)}

function _lazer_power(slider){return(
slider({
  min: 0,
  max: 5,
  value: 2.6
})
)}

function _power_decay_exponent(slider){return(
slider({
  min: -2,
  max: -0.1,
  value: -.33 
})
)}

function _floor(slider){return(
slider({
  min: 0,
  max: 1,
  value: 0.5
})
)}

function _sqrt_width_px(slider){return(
slider({
  min: 1,
  max: 20,
  step: 1,
  value: 11
})
)}

function _drawLazerPath(lazer_power,d3,halo_color,sqrt_width_px,power_decay_exponent,floor){return(
(ctx, points, options) => {
  options = options || {};
  options.power = options.power || lazer_power;
  const hue = d3.hsl(halo_color).h;
  for (var i = sqrt_width_px; i > 0; i--) {
    const distance = i*i;
    const saturation = options.power * Math.pow(distance, power_decay_exponent) - floor;
    const lightness = saturation;
    ctx.strokeStyle = d3.hsl(hue, saturation, lightness);
    ctx.lineWidth = distance;
    ctx.beginPath();
    ctx.moveTo.apply(ctx, points[0]);
    for (var p = 1; p < points.length; p++) {
      ctx.lineTo.apply(ctx, points[p]);
    }
    ctx.stroke();
  }
}
)}

function _tickBeam(lazer_power,drawLazerPath){return(
function tickBeam(ctx, t, path, beam_state) {
  const frames = 20;
  const beam_power = lazer_power;
  const previousCompositeOperation = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "lighten";
  beam_state = beam_state || {
    paths: []
  };
  // Push latest path on memory
  beam_state.paths.unshift(path);
  while (beam_state.paths.length >= frames) {
    beam_state.paths.pop();
  };
  //drawLazerPath(ctx, path);
  // Draw each beam, last-to-first
  for (var frame = beam_state.paths.length - 1; frame >= 0; frame--) {
    var power = beam_power * (1 - (frame/frames)); // should be affected by length of path too
    //var power = Math.pow(beam_power, -frames); // should be affected by length of path too
    drawLazerPath(ctx, beam_state.paths[frame], {
      power: power
    });
  }
  ctx.globalCompositeOperation = previousCompositeOperation;
  return beam_state;
}
)}

function* _scribble(canvas_w,canvas_h,DOM,drawLazerPath)
{
  var rand2d = () => [Math.random() * canvas_w, Math.random() * canvas_h];
  var avg = (a, b) => {
    var result = new Array(a.length);
    for (var i = 0; i < a.length; i++) {
      result[i] = (a[i] + b[i]) / 2;
    }
    return result;
  }
  var ctx = DOM.context2d(canvas_w, canvas_h);
  // We flush fill the foreground color so that it fades into the natural minimum
  // of the foreground will
  ctx.lineCap = "round";
  
  var last_pos = rand2d();
  while (true) {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas_w, canvas_h);
    var new_pos = avg(avg(rand2d(), last_pos), last_pos);
    drawLazerPath(ctx, [last_pos, new_pos]);
    last_pos = new_pos;
    
    yield ctx.canvas
  }  
}


function _d3(require){return(
require("d3")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof spring")).define("viewof spring", ["DOM","canvas_w","canvas_h","drawLazerPath"], _spring);
  main.variable(observer("spring")).define("spring", ["Generators", "viewof spring"], (G, _) => G.input(_));
  main.variable(observer("viewof spring_beam")).define("viewof spring_beam", ["DOM","canvas_w","canvas_h","tickBeam"], _spring_beam);
  main.variable(observer("spring_beam")).define("spring_beam", ["Generators", "viewof spring_beam"], (G, _) => G.input(_));
  main.variable(observer("viewof canvas_w")).define("viewof canvas_w", ["slider"], _canvas_w);
  main.variable(observer("canvas_w")).define("canvas_w", ["Generators", "viewof canvas_w"], (G, _) => G.input(_));
  main.variable(observer("viewof canvas_h")).define("viewof canvas_h", ["slider"], _canvas_h);
  main.variable(observer("canvas_h")).define("canvas_h", ["Generators", "viewof canvas_h"], (G, _) => G.input(_));
  main.variable(observer("viewof halo_color")).define("viewof halo_color", ["color"], _halo_color);
  main.variable(observer("halo_color")).define("halo_color", ["Generators", "viewof halo_color"], (G, _) => G.input(_));
  main.variable(observer("viewof saturation_color")).define("viewof saturation_color", ["color"], _saturation_color);
  main.variable(observer("saturation_color")).define("saturation_color", ["Generators", "viewof saturation_color"], (G, _) => G.input(_));
  main.variable(observer("viewof lazer_power")).define("viewof lazer_power", ["slider"], _lazer_power);
  main.variable(observer("lazer_power")).define("lazer_power", ["Generators", "viewof lazer_power"], (G, _) => G.input(_));
  main.variable(observer("viewof power_decay_exponent")).define("viewof power_decay_exponent", ["slider"], _power_decay_exponent);
  main.variable(observer("power_decay_exponent")).define("power_decay_exponent", ["Generators", "viewof power_decay_exponent"], (G, _) => G.input(_));
  main.variable(observer("viewof floor")).define("viewof floor", ["slider"], _floor);
  main.variable(observer("floor")).define("floor", ["Generators", "viewof floor"], (G, _) => G.input(_));
  main.variable(observer("viewof sqrt_width_px")).define("viewof sqrt_width_px", ["slider"], _sqrt_width_px);
  main.variable(observer("sqrt_width_px")).define("sqrt_width_px", ["Generators", "viewof sqrt_width_px"], (G, _) => G.input(_));
  main.variable(observer("drawLazerPath")).define("drawLazerPath", ["lazer_power","d3","halo_color","sqrt_width_px","power_decay_exponent","floor"], _drawLazerPath);
  main.variable(observer("tickBeam")).define("tickBeam", ["lazer_power","drawLazerPath"], _tickBeam);
  main.variable(observer("viewof scribble")).define("viewof scribble", ["canvas_w","canvas_h","DOM","drawLazerPath"], _scribble);
  main.variable(observer("scribble")).define("scribble", ["Generators", "viewof scribble"], (G, _) => G.input(_));
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define1);
  main.import("color", child2);
  const child3 = runtime.module(define2);
  main.import("footer", child3);
  return main;
}
