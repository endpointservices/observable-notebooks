import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# Animated Wormhole with frame capture`
)}

function _canvas_w(slider){return(
slider({
  min: 1,
  max: 1024,
  step: 1,
  value: 400,
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

function* _animated_wormhole(DOM,canvas_w,canvas_h,foreground,wormholeFrame)
{
  var ctx = DOM.context2d(canvas_w, canvas_h);
  ctx.strokeStyle = foreground;
  ctx.lineCap = "round"; 
  
  while (true) {
    wormholeFrame(ctx, Date.now());
    yield ctx.canvas;
  }  
}


function _wormholeFrame(canvas_w,canvas_h,wormhole_width,scale_x,scale_y_inv,scale_y,offset_y,lines,foreground,decoration,arcs){return(
(ctx, time) => {
   
  function unitToScreen(unitCoords) {
    return [0.5 * canvas_w + 0.5 * canvas_w * unitCoords[0],
            0.5 * canvas_h + 0.5 * canvas_h * unitCoords[1]];
  }
  
  function t_period(per_sec) {
    var per_millis = per_sec * 1000;
    return (time % (per_millis)) / per_millis;
  }
  
  function magnitude(vec2) {
    return Math.sqrt(vec2[0]*vec2[0] + vec2[1]*vec2[1]);
  }
  
  function wormDepth(vec2) {
    return Math.max(1.0 / (magnitude(vec2) + wormhole_width), 1);
  }
  
  function wormDeform(vec2) {
    var depth = wormDepth(vec2);
    return [
      (vec2[0]) * scale_x,
      (vec2[1] + scale_y_inv * depth) * scale_y + offset_y,
    ];
  };
  
  const gridStep = 2.0 / lines;
  const microStep = gridStep / 5;

  ctx.fillStyle = "black";
  ctx.fillRect(0,0, canvas_w, canvas_h);

  const dead_zone = 1;
  ctx.fillStyle = foreground;
  ctx.lineWidth = 1;


  // Grid between -1 and 1
  if (decoration) {
    for (var i = -1; i <= 1; i+=gridStep) {
      for (var j = -1; j <= 1; j+=gridStep) {
        for (var im = 0; im < gridStep; im += microStep) {
          if (magnitude([i + im, j]) < dead_zone) continue;
          ctx.beginPath();
          ctx.moveTo.apply(ctx, unitToScreen(wormDeform([i + im - microStep, j])));
          ctx.lineTo.apply(ctx, unitToScreen(wormDeform([i + im, j])));
          ctx.stroke();
        }
        for (var jm = 0; jm < gridStep; jm += microStep) {
          if (magnitude([i, j + jm]) < dead_zone) continue;
          ctx.beginPath();
          ctx.moveTo.apply(ctx, unitToScreen(wormDeform([i, j + jm - microStep])));
          ctx.lineTo.apply(ctx, unitToScreen(wormDeform([i, j + jm])));
          ctx.stroke();
        }
      } 
    }
  }
  

  // Draw fixed framing the wormhole
  ctx.beginPath();
  var radius = 1;
  var center = [0, 0];
  for (var theta = 0; theta <= 2 * Math.PI + 0.1; theta += 0.1) {
    ctx.lineTo.apply(ctx, unitToScreen(wormDeform([
      radius * Math.cos(theta) + center[0],
      radius * Math.sin(theta) + center[1]
    ])));
  }
  ctx.stroke();

  // Draw animated circles around the epicenter
  for (var i = -1; i < 0 - gridStep; i += gridStep) { 
    ctx.beginPath();
    var radius = i + t_period(1) * gridStep;
    var center = [0, 0];
    for (var theta = 0; theta <= 2 * Math.PI + 0.1; theta += 0.1) {
      ctx.lineTo.apply(ctx, unitToScreen(wormDeform([
        radius * Math.cos(theta) + center[0],
        radius * Math.sin(theta) + center[1]
      ])));
    }
    ctx.stroke();
  }

  // Draw radial arcs outwards around the epicenter
  for (var theta = 0; theta <= 2 * Math.PI; theta += 2 * Math.PI / arcs) {   
    var center = [0, 0];
    ctx.beginPath();
    for (var i = -1; i < 0; i += gridStep) { 
      var radius = i;
      ctx.lineTo.apply(ctx, unitToScreen(wormDeform([
        radius * Math.cos(theta) + center[0],
        radius * Math.sin(theta) + center[1]
      ])));
    }
    ctx.stroke();
  }

  // We will also some circles translating near the wormhole

  if (decoration) {
    for (var i = 0; i < 10; i++) {
      ctx.beginPath();
      var center = [
        Math.sin(time / (501 + i)),
        Math.sin(time / (601 + i))          
      ];
      for (var theta = 0; theta <= 2 * Math.PI; theta += 0.05) {
        ctx.lineTo.apply(ctx, unitToScreen(wormDeform([
          0.1 * Math.cos(theta) + center[0],
          0.1 * Math.sin(theta) + center[1]
        ])));
      }
      ctx.fill();
    }
  }
}
)}

function _foreground(color){return(
color({
  value: "#ff8300",
  title: "Foreground Color"
})
)}

function _decoration(checkbox){return(
checkbox({
  description: "Turn on extras",
  options: [{ value: "toggle", label: "On" }],
  value: ["toggle"]
})
)}

function _lines(slider){return(
slider({
  min: 0,
  max: 64,
  step: 1,
  value: 14})
)}

function _arcs(slider){return(
slider({
  min: 0,
  max: 32,
  step: 1,
  value: 10})
)}

function _scale_x(slider){return(
slider({
  min: 0,
  max: 0.75,
  value: 1})
)}

function _scale_y(slider){return(
slider({
  min: 0,
  max: 1,
  value: 0.5})
)}

function _scale_y_inv(slider){return(
slider({
  min: -2,
  max: 2,
  value: .9})
)}

function _offset_y(slider){return(
slider({
  min: -1,
  max: 1,
  value: -.9})
)}

function _wormhole_width(slider){return(
slider({
  min: -0.5,
  max: 0.5,
  value: 0.3})
)}

function _19(md){return(
md`## Render frames to a zip`
)}

function _capture(checkbox){return(
checkbox({
  description: "Turn on frame capture",
  options: [{ value: "toggle", label: "On" }]
})
)}

function _render_fps(slider){return(
slider({
  min: 0,
  max: 1024,
  steps:1,
  value: 30})
)}

function _render_secs(slider){return(
slider({
  min: 0,
  max: 60,
  steps:1,
  value: 1})
)}

function* _preview(capture,DOM,canvas_w,canvas_h,foreground,render_fps,render_secs,wormholeFrame,$0)
{
  if (!capture) return;
  var ctx = DOM.context2d(canvas_w, canvas_h);
  ctx.strokeStyle = foreground;
  ctx.lineCap = "round"; 
  
  const tmpRenders = [];
  for (var frame = 0; frame < render_fps * render_secs; frame++) {
    wormholeFrame(ctx, (frame / render_fps) * 1000);
    var canvas = ctx.canvas;
    tmpRenders.push(canvas.toDataURL());
    yield canvas;
  }
  $0.value = tmpRenders;
}


function _renders(){return(
[]
)}

function _JSZip(require){return(
require('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js')
)}

function _frames(renders,JSZip,html)
{
  if (!renders || renders.length == 0) return;
  function id(index) {
    var str = "" + index;
    return ('0000'+str).substring(str.length);
  }
  
  // https://stackoverflow.com/a/37138144
  function dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      var n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
  }
  
  var zip = new JSZip();
  
  for (var frame = 0; frame < renders.length; frame++) {
    // https://stackoverflow.com/a/37138144
    const imgData = renders[frame];
    const strDataURI = imgData.substr(22, imgData.length);
    const blob = dataURLtoBlob(imgData);
    const objurl = URL.createObjectURL(blob);
    
    zip.file("frame-" + id(frame) + ".png", strDataURI, {base64: true});
  }
 
  // Generate the zip file asynchronously
  return zip.generateAsync({type:"blob"})
    .then(function(content) {
    // Force down of the Zip file
    const zipUrl = URL.createObjectURL(content);
    return html`<a
         href=${zipUrl}
         download="frames.zip">
        frames.zip
       </a><br>`
  });
}


function _28(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define1);
  main.import("color", child2);
  const child3 = runtime.module(define1);
  main.import("button", child3);
  const child4 = runtime.module(define1);
  main.import("checkbox", child4);
  main.variable(observer("viewof canvas_w")).define("viewof canvas_w", ["slider"], _canvas_w);
  main.variable(observer("canvas_w")).define("canvas_w", ["Generators", "viewof canvas_w"], (G, _) => G.input(_));
  main.variable(observer("viewof canvas_h")).define("viewof canvas_h", ["slider"], _canvas_h);
  main.variable(observer("canvas_h")).define("canvas_h", ["Generators", "viewof canvas_h"], (G, _) => G.input(_));
  main.variable(observer("viewof animated_wormhole")).define("viewof animated_wormhole", ["DOM","canvas_w","canvas_h","foreground","wormholeFrame"], _animated_wormhole);
  main.variable(observer("animated_wormhole")).define("animated_wormhole", ["Generators", "viewof animated_wormhole"], (G, _) => G.input(_));
  main.variable(observer("wormholeFrame")).define("wormholeFrame", ["canvas_w","canvas_h","wormhole_width","scale_x","scale_y_inv","scale_y","offset_y","lines","foreground","decoration","arcs"], _wormholeFrame);
  main.variable(observer("viewof foreground")).define("viewof foreground", ["color"], _foreground);
  main.variable(observer("foreground")).define("foreground", ["Generators", "viewof foreground"], (G, _) => G.input(_));
  main.variable(observer("viewof decoration")).define("viewof decoration", ["checkbox"], _decoration);
  main.variable(observer("decoration")).define("decoration", ["Generators", "viewof decoration"], (G, _) => G.input(_));
  main.variable(observer("viewof lines")).define("viewof lines", ["slider"], _lines);
  main.variable(observer("lines")).define("lines", ["Generators", "viewof lines"], (G, _) => G.input(_));
  main.variable(observer("viewof arcs")).define("viewof arcs", ["slider"], _arcs);
  main.variable(observer("arcs")).define("arcs", ["Generators", "viewof arcs"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_x")).define("viewof scale_x", ["slider"], _scale_x);
  main.variable(observer("scale_x")).define("scale_x", ["Generators", "viewof scale_x"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_y")).define("viewof scale_y", ["slider"], _scale_y);
  main.variable(observer("scale_y")).define("scale_y", ["Generators", "viewof scale_y"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_y_inv")).define("viewof scale_y_inv", ["slider"], _scale_y_inv);
  main.variable(observer("scale_y_inv")).define("scale_y_inv", ["Generators", "viewof scale_y_inv"], (G, _) => G.input(_));
  main.variable(observer("viewof offset_y")).define("viewof offset_y", ["slider"], _offset_y);
  main.variable(observer("offset_y")).define("offset_y", ["Generators", "viewof offset_y"], (G, _) => G.input(_));
  main.variable(observer("viewof wormhole_width")).define("viewof wormhole_width", ["slider"], _wormhole_width);
  main.variable(observer("wormhole_width")).define("wormhole_width", ["Generators", "viewof wormhole_width"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof capture")).define("viewof capture", ["checkbox"], _capture);
  main.variable(observer("capture")).define("capture", ["Generators", "viewof capture"], (G, _) => G.input(_));
  main.variable(observer("viewof render_fps")).define("viewof render_fps", ["slider"], _render_fps);
  main.variable(observer("render_fps")).define("render_fps", ["Generators", "viewof render_fps"], (G, _) => G.input(_));
  main.variable(observer("viewof render_secs")).define("viewof render_secs", ["slider"], _render_secs);
  main.variable(observer("render_secs")).define("render_secs", ["Generators", "viewof render_secs"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["capture","DOM","canvas_w","canvas_h","foreground","render_fps","render_secs","wormholeFrame","mutable renders"], _preview);
  main.define("initial renders", _renders);
  main.variable(observer("mutable renders")).define("mutable renders", ["Mutable", "initial renders"], (M, _) => new M(_));
  main.variable(observer("renders")).define("renders", ["mutable renders"], _ => _.generator);
  main.variable(observer("JSZip")).define("JSZip", ["require"], _JSZip);
  main.variable(observer("frames")).define("frames", ["renders","JSZip","html"], _frames);
  const child5 = runtime.module(define2);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _28);
  return main;
}
