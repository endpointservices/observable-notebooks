import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# ILDA Laser Show Player

This is an off-the-shelf ILDA laser show sourced from http://www.laser-am.com/ilda.php physically simulated in THREE.js.

NOTE: My ILDA parser is very slow and Observable thinks the notebook has frozen, but it hasn't!
`
)}

function* _2(THREE,invalidation,width,height,buffers,EffectComposer,RenderPass,camera,UnrealBloomPass,strength,$0)
{
  const renderer = new THREE.WebGLRenderer({antialias: true});
  invalidation.then(() => renderer.dispose());
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(buffers.line);
  
  const composer = new EffectComposer( renderer );
  const renderScene = new RenderPass( scene, camera );
  const bloomPass = new UnrealBloomPass( new THREE.Vector2( width, height), 1.5, 0.4, 0.85 );
  bloomPass.threshold = 0;
	bloomPass.strength = strength;
	bloomPass.radius = 1;

	composer.addPass( renderScene );
	composer.addPass( bloomPass );
  
  const t_start = performance.now();
  
  while (true) {
    $0.value = performance.now() - t_start 
    composer.render();
    yield renderer.domElement;
  }
}


function _strength(slider){return(
slider({
  max: 100,
  description: "laser power",
  value: 15
})
)}

function _blankingOffset(slider){return(
slider({
  min: -10,
  max: 10,
  value: -3,
  description: "blankingOffset",
  step: 1
})
)}

function _zoom(slider){return(
slider({
  value: 0.44,
  description:"zoom"
})
)}

function _gain(slider){return(
slider({
  min: 0.001,
  value: 0.51,
  description: "gain",
  max: 2
})
)}

function _dampening(slider){return(
slider({
  value: 0.39,
  description: "dampening",
  max: 1,
  step: 0.001
})
)}

function _lightDecay(slider){return(
slider({
  description: "laser light decay",
  value: 0.95
})
)}

function _run(checkbox){return(
checkbox({
  options: [{ value: "run", label: "Run" }],
  value: "run"
})
)}

async function _pattern(FileAttachment){return(
await FileAttachment("sylvest.ild").arrayBuffer()
)}

function _palette(THREE){return(
[
  new THREE.Color("rgb(55, 0, 0)"), 
  new THREE.Color("rgb(55, 16, 0)"),
  new THREE.Color("rgb(55, 32, 0)"),
  new THREE.Color("rgb(55, 48, 0)"),
  new THREE.Color("rgb(55, 64, 0)"),
  new THREE.Color("rgb(55, 80, 0)"),
  new THREE.Color("rgb(55, 96, 0)"),
  new THREE.Color("rgb(55, 112, 0)"),
  new THREE.Color("rgb(55, 128, 0)"),
  new THREE.Color("rgb(55, 144, 0)"),
  new THREE.Color("rgb(255, 160, 0)"),
  new THREE.Color("rgb(255, 176, 0)"),
  new THREE.Color("rgb(255, 192, 0)"),
  new THREE.Color("rgb(255, 208, 0)"),
  new THREE.Color("rgb(255, 224, 0)"),
  new THREE.Color("rgb(255, 240, 0)"),
  new THREE.Color("rgb(255, 255, 0)"), 
  new THREE.Color("rgb(224, 255, 0)"),
  new THREE.Color("rgb(192, 255, 0)"),
  new THREE.Color("rgb(160, 255, 0)"),
  new THREE.Color("rgb(128, 255, 0)"),
  new THREE.Color("rgb(96, 255, 0)"),
  new THREE.Color("rgb(64, 255, 0)"),
  new THREE.Color("rgb(32, 255, 0)"),
  new THREE.Color("rgb(0, 255, 0)"), 
  new THREE.Color("rgb(0, 255, 36)"),
  new THREE.Color("rgb(0, 255, 73)"),
  new THREE.Color("rgb(0, 255, 109)"),
  new THREE.Color("rgb(0, 255, 146)"),
  new THREE.Color("rgb(0, 255, 182)"),
  new THREE.Color("rgb(0, 255, 219)"),
  new THREE.Color("rgb(0, 255, 255)"), 
  new THREE.Color("rgb(0, 227, 255)"),
  new THREE.Color("rgb(0, 198, 255)"),
  new THREE.Color("rgb(0, 170, 255)"),
  new THREE.Color("rgb(0, 142, 255)"),
  new THREE.Color("rgb(0, 113, 255)"),
  new THREE.Color("rgb(0, 85, 255)"),
  new THREE.Color("rgb(0, 56, 255)"),
  new THREE.Color("rgb(0, 28, 255)"),
  new THREE.Color("rgb(0, 0, 255)"), 
  new THREE.Color("rgb(32, 0, 255)"),
  new THREE.Color("rgb(64, 0, 255)"),
  new THREE.Color("rgb(96, 0, 255)"),
  new THREE.Color("rgb(128, 0, 255)"),
  new THREE.Color("rgb(160, 0, 255)"),
  new THREE.Color("rgb(192, 0, 255)"),
  new THREE.Color("rgb(224, 0, 255)"),
  new THREE.Color("rgb(255, 0, 255)"), 
  new THREE.Color("rgb(255, 32, 255)"),
  new THREE.Color("rgb(255, 64, 255)"),
  new THREE.Color("rgb(255, 96, 255)"),
  new THREE.Color("rgb(255, 128, 255)"),
  new THREE.Color("rgb(255, 160, 255)"),
  new THREE.Color("rgb(255, 192, 255)"),
  new THREE.Color("rgb(255, 224, 255)"),
  new THREE.Color("rgb(255, 255, 255)"), 
  new THREE.Color("rgb(255, 224, 224)"),
  new THREE.Color("rgb(255, 192, 192)"),
  new THREE.Color("rgb(255, 160, 160)"),
  new THREE.Color("rgb(255, 128, 128)"),
  new THREE.Color("rgb(255, 96, 96)"),
  new THREE.Color("rgb(255, 64, 64)"),
  new THREE.Color("rgb(255, 32, 32)")]
)}

function _frames(pattern)
{
  const enc = new TextDecoder("ascii");
  let data = pattern; 
  function readString(bytes) {
    const str = enc.decode(new Uint8Array(data.slice(0, bytes)));
    data = data.slice(bytes)
    return str;
  }
  function readUint8() {
    const num = new Uint8Array(data.slice(0, 1))[0];
    data = data.slice(1)
    return num;
  }
  function readUint16() {
    const num = new DataView(data.slice(0, 2)).getUint16();
    data = data.slice(2)
    return num;
  }
  function readInt16() {
    const num = new DataView(data.slice(0, 2)).getInt16();
    data = data.slice(2)
    return num;
  }
  function skip(bytes) {
    data = data.slice(bytes)
  }
  
  function readHeader() {
    return {
      ilda: readString(4),
      reserved: skip(3),
      format: readUint8(),
      name: readString(8),
      company: readString(8),
      records: readUint16(), 
      frameNumber: readUint16(),
      frames: readUint16(),
      projector: readUint8(),
      reserved2: skip(1)
    }
  }
  
  function readFormat0(format) {
    return [
      /* X */ readInt16(), /* Y */ readInt16(), /* Z */ readInt16(),
      /* status */readUint8(),
      /* color index */readUint8()
    ]
  }
  
  function readFrame() {
    const frame = readHeader();
    frame.data = new Array(frame.records || 0).fill().map(f => readFormat0())
    return frame;
  }
  
  const frames = [readFrame()]
  for (let f = 1; f < frames[0].frames; f++) {
    frames.push(readFrame())
  }
  return frames;
}


function _t(){return(
0.0
)}

function _buffers(THREE,MAX_SEGMENTS)
{
  const buffers = {
    last_t: 0,
    step: 1.0 / 8, //12K points per second, i.e. 12 per ms
    programCounter: [0, 0], // frame, record
    galvo: new THREE.Vector3(),
    galvoV: new THREE.Vector3(),
    blanking: 1.0,
    blankingV: 0, 
    positions: new THREE.Float32BufferAttribute( (MAX_SEGMENTS) * 3, 3 ),
    colors: new THREE.Float32BufferAttribute( (MAX_SEGMENTS) * 3, 3 ),
    lineGeometry: new THREE.BufferGeometry(),
    lineMaterial: new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: true} ),
  }
  buffers.lineMaterial.blending = THREE.AdditiveBlending;
  buffers.lineGeometry.setAttribute('position', buffers.positions)
  buffers.lineGeometry.setAttribute('color', buffers.colors)
  buffers.line = new THREE.Line( buffers.lineGeometry, buffers.lineMaterial )  
  
  
  
  buffers.lineGeometry.setDrawRange(0, MAX_SEGMENTS);
  return buffers;
}


function _draw(run,zoom,width,height,buffers,t,MAX_SEGMENTS,frames,THREE,gain,dampening,blankingOffset,palette,lightDecay)
{
  if (!run) return;
  const points = [];
  const colors = [];
  
  const int16ToWidth = zoom * width / 32000
  const int16ToHeight = zoom * height / 32000
  // We iterate in time, new points.
  //for ( var i = 0; i < frames[0].data.length; i++) {
  for (var tp = buffers.last_t; tp < t && points.length < MAX_SEGMENTS; tp += buffers.step) { // we could do this more stable
    const i = buffers.programCounter[1];
    const fi = buffers.programCounter[0];
    const status = frames[0].data[i][3]
    
    if ((status & (1 << 7)) != 0 || i == frames[fi].records) {
      // end of seq
      buffers.programCounter[1] = 0;
      buffers.programCounter[0] = (fi + 1) % frames[fi].frames;
      continue;
    }
    const target = new THREE.Vector3(frames[fi].data[i][0] * int16ToWidth,
                                     frames[fi].data[i][1] * int16ToHeight,
                                     0);
    
    buffers.galvoV.add(target.addScaledVector(buffers.galvo, -1).multiplyScalar(gain));
    buffers.galvo.add(buffers.galvoV.multiplyScalar(dampening))
      
    const blankingStatus = (frames[fi].data[i + blankingOffset] || 0)[3]
    if ((blankingStatus & (1 << 6)) != 0) {
      // blanking to zero
      buffers.blanking = 0;
    } else {
      // blanking to one
      buffers.blanking = 1;
    }
      
    const colorIndex = frames[fi].data[i][4]
    const color = palette[colorIndex];
    colors.push(color.r * buffers.blanking, color.g * buffers.blanking, color.b * buffers.blanking);
    points.push(buffers.galvo.x, buffers.galvo.y, buffers.galvo.z );
    buffers.programCounter[1]++;
  }
  
  // The main stratergy is to shift all the buffers down, and append new data points to the end
  buffers.positions.set(buffers.positions.array.slice(points.length), 0);
  buffers.positions.set(points, MAX_SEGMENTS * 3 - points.length);
  // We also decay the colors by a factor so the old lines fade out
  buffers.colors.set(buffers.colors.array.slice(colors.length).map(x => x * lightDecay), 0);
  buffers.colors.set(colors, MAX_SEGMENTS * 3 - colors.length);
  
  
  buffers.positions.needsUpdate = true;
  buffers.colors.needsUpdate = true;
  buffers.last_t = t;
}


function _camera(THREE,width,height){return(
new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2,height / 2, height / - 2)
)}

function _height(){return(
500
)}

function _MAX_SEGMENTS(){return(
2048
)}

function _THREE_VERSION(){return(
"0.112.1"
)}

function _THREE(require,THREE_VERSION){return(
require(`three@${THREE_VERSION}/build/three.min.js`)
)}

async function _EffectComposer(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/EffectComposer.js?module`)).EffectComposer
)}

async function _RenderPass(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/RenderPass.js?module`)).RenderPass
)}

async function _UnrealBloomPass(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/UnrealBloomPass.js?module`)).UnrealBloomPass
)}

function _27(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["sylvest.ild", {url: new URL("./files/e3e2f635ab5b17d810b325344980248d454e3f495481647a5978847af269a9173c207c9a25c1c8b77da9823a67b775e95e9fc9dfc9f84e6afc01ee9af986deaf.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["THREE","invalidation","width","height","buffers","EffectComposer","RenderPass","camera","UnrealBloomPass","strength","mutable t"], _2);
  main.variable(observer("viewof strength")).define("viewof strength", ["slider"], _strength);
  main.variable(observer("strength")).define("strength", ["Generators", "viewof strength"], (G, _) => G.input(_));
  main.variable(observer("viewof blankingOffset")).define("viewof blankingOffset", ["slider"], _blankingOffset);
  main.variable(observer("blankingOffset")).define("blankingOffset", ["Generators", "viewof blankingOffset"], (G, _) => G.input(_));
  main.variable(observer("viewof zoom")).define("viewof zoom", ["slider"], _zoom);
  main.variable(observer("zoom")).define("zoom", ["Generators", "viewof zoom"], (G, _) => G.input(_));
  main.variable(observer("viewof gain")).define("viewof gain", ["slider"], _gain);
  main.variable(observer("gain")).define("gain", ["Generators", "viewof gain"], (G, _) => G.input(_));
  main.variable(observer("viewof dampening")).define("viewof dampening", ["slider"], _dampening);
  main.variable(observer("dampening")).define("dampening", ["Generators", "viewof dampening"], (G, _) => G.input(_));
  main.variable(observer("viewof lightDecay")).define("viewof lightDecay", ["slider"], _lightDecay);
  main.variable(observer("lightDecay")).define("lightDecay", ["Generators", "viewof lightDecay"], (G, _) => G.input(_));
  main.variable(observer("viewof run")).define("viewof run", ["checkbox"], _run);
  main.variable(observer("run")).define("run", ["Generators", "viewof run"], (G, _) => G.input(_));
  main.variable(observer("pattern")).define("pattern", ["FileAttachment"], _pattern);
  main.variable(observer("palette")).define("palette", ["THREE"], _palette);
  main.variable(observer("frames")).define("frames", ["pattern"], _frames);
  main.define("initial t", _t);
  main.variable(observer("mutable t")).define("mutable t", ["Mutable", "initial t"], (M, _) => new M(_));
  main.variable(observer("t")).define("t", ["mutable t"], _ => _.generator);
  main.variable(observer("buffers")).define("buffers", ["THREE","MAX_SEGMENTS"], _buffers);
  main.variable(observer("draw")).define("draw", ["run","zoom","width","height","buffers","t","MAX_SEGMENTS","frames","THREE","gain","dampening","blankingOffset","palette","lightDecay"], _draw);
  main.variable(observer("camera")).define("camera", ["THREE","width","height"], _camera);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("MAX_SEGMENTS")).define("MAX_SEGMENTS", _MAX_SEGMENTS);
  main.variable(observer("THREE_VERSION")).define("THREE_VERSION", _THREE_VERSION);
  main.variable(observer("THREE")).define("THREE", ["require","THREE_VERSION"], _THREE);
  main.variable(observer("EffectComposer")).define("EffectComposer", ["THREE_VERSION"], _EffectComposer);
  main.variable(observer("RenderPass")).define("RenderPass", ["THREE_VERSION"], _RenderPass);
  main.variable(observer("UnrealBloomPass")).define("UnrealBloomPass", ["THREE_VERSION"], _UnrealBloomPass);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define1);
  main.import("checkbox", child2);
  const child3 = runtime.module(define2);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _27);
  return main;
}
