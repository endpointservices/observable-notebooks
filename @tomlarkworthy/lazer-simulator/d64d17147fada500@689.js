import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# Laser Simulator
`
)}

function _run(checkbox){return(
checkbox({
  options: [{ value: "run", label: "run" }],
  value: "run"
})
)}

function* _3(THREE,invalidation,width,height,buffers,EffectComposer,RenderPass,camera,UnrealBloomPass,$0,run)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  invalidation.then(() => renderer.dispose());
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(buffers.line);

  const composer = new EffectComposer(renderer);
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(Math.min(width, 640), height),
    0,
    0.2,
    0.85
  );
  bloomPass.threshold = 0;
  bloomPass.strength = 50.7;
  bloomPass.radius = 1;

  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  const t_start = performance.now();

  renderer.domElement.style = "width: 100%";
  while (true) {
    $0.value = performance.now() - t_start;
    if (run) composer.render();
    yield renderer.domElement;
  }
}


function _t(){return(
0.0
)}

function _buffers(THREE,MAX_SEGMENTS)
{
  const buffers = {
    last_t: 0,
    positions: new THREE.Float32BufferAttribute( (MAX_SEGMENTS) * 3, 3 ),
    colors: new THREE.Float32BufferAttribute( (MAX_SEGMENTS) * 3, 3 ),
    lineGeometry: new THREE.BufferGeometry(),
    lineMaterial: new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: true} ),
  }
  buffers.lineGeometry.setAttribute('position', buffers.positions)
  buffers.lineGeometry.setAttribute('color', buffers.colors)
  buffers.line = new THREE.Line( buffers.lineGeometry, buffers.lineMaterial )  
  buffers.lineGeometry.setDrawRange(0, MAX_SEGMENTS);
  return buffers;
}


function _draw(THREE,t,buffers,MAX_SEGMENTS,width,height)
{
  const points = [];
  const colors = [];
  const point = new THREE.Vector3();
  const color = new THREE.Color();
  
  color.setRGB(Math.cos(t * 0.00011) * 0.5 + 1, Math.cos(t * 0.002) * 0.5 + 1, Math.cos(t * 0.003) * 0.5 + 1)
  
  // We iterate in time new points.
  for ( var i = buffers.last_t; i < t && points.length < MAX_SEGMENTS * 3; i += 10 ) {
    point.x = Math.cos((i * 0.0091)) * 0.9 * width / 2 ;
    point.y = Math.sin((i * 0.015)) * 0.9 * height / 2;
    points.push( point.x, point.y, point.z );
    colors.push(color.r, color.g, color.b);
  }
  
  // The main stratergy is to shift all the buffers down, and append new data points to the end
  buffers.positions.set(buffers.positions.array.slice(points.length));
  buffers.positions.set(points, MAX_SEGMENTS * 3 - points.length);
  // We also decay the colors by a factor so the old lines fade out
  buffers.colors.set(buffers.colors.array.slice(colors.length).map(x => x * 0.95), 0);
  buffers.colors.set(colors, MAX_SEGMENTS * 3 - colors.length);
  
  
  buffers.positions.needsUpdate = true;
  buffers.colors.needsUpdate = true;
  buffers.last_t = t;
}


function _camera(THREE,width,height){return(
new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2,height / 2, height / - 2)
)}

function _height(){return(
600
)}

function _9(md){return(
md`Lastly, we load Three.`
)}

function _MAX_SEGMENTS(){return(
1000
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

function _18(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof run")).define("viewof run", ["checkbox"], _run);
  main.variable(observer("run")).define("run", ["Generators", "viewof run"], (G, _) => G.input(_));
  main.variable(observer()).define(["THREE","invalidation","width","height","buffers","EffectComposer","RenderPass","camera","UnrealBloomPass","mutable t","run"], _3);
  main.define("initial t", _t);
  main.variable(observer("mutable t")).define("mutable t", ["Mutable", "initial t"], (M, _) => new M(_));
  main.variable(observer("t")).define("t", ["mutable t"], _ => _.generator);
  main.variable(observer("buffers")).define("buffers", ["THREE","MAX_SEGMENTS"], _buffers);
  main.variable(observer("draw")).define("draw", ["THREE","t","buffers","MAX_SEGMENTS","width","height"], _draw);
  main.variable(observer("camera")).define("camera", ["THREE","width","height"], _camera);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("MAX_SEGMENTS")).define("MAX_SEGMENTS", _MAX_SEGMENTS);
  main.variable(observer("THREE_VERSION")).define("THREE_VERSION", _THREE_VERSION);
  main.variable(observer("THREE")).define("THREE", ["require","THREE_VERSION"], _THREE);
  main.variable(observer("EffectComposer")).define("EffectComposer", ["THREE_VERSION"], _EffectComposer);
  main.variable(observer("RenderPass")).define("RenderPass", ["THREE_VERSION"], _RenderPass);
  main.variable(observer("UnrealBloomPass")).define("UnrealBloomPass", ["THREE_VERSION"], _UnrealBloomPass);
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _18);
  return main;
}
