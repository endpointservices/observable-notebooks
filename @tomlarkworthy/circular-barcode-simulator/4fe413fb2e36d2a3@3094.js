import define1 from "./b2bbebd2f186ed03@1803.js";
import define2 from "./293899bef371e135@293.js";

function _1(md){return(
md`# Simplifying Pose Estimation with Circular Barcodes`
)}

function _2(md){return(
md`A [decade](https://edinburghhacklab.com/2012/05/optical-localization-to-0-1mm-no-problemo/) ago I hoped to build low-cost, high-speed optical positioning for robots, using camera-based end effector measurements. However, the challenge lies in achieving high-frequency measurements comparable to those of commercial robot arms, which measure 10,000 times per second, far beyond the capabilities of affordable 30 frames per second digital cameras. Recent advancements have somewhat closed this gap: for instance, a Raspberry PI camera utilizing raspiraw can [reach 1007 frames-per-second](https://www.youtube.com/watch?v=m3Bs-yhWZ3M), providing a low-latency hardware solution.

Still, the hurdle of fast pose estimation remains due to the inherent bandwidth intensity of computer vision. The difficulty lies in the variability of object appearances and the high dimensionality of the task, requiring a search for a 6DOF-oriented object in a 2D image plane. However, by redesigning the problem with circular barcodes, which can be read from any angle, we can transform a 2D recognition problem into a simpler 1D task that matches the camera's hardware interface better. This notebook presents a open-source simulator setup and a basic scan line-based template detector algorithm to confirm the geometric argument.`
)}

function _3(md){return(
md`## Camera simulation

This is our model of a camera built with [three.js](https://threejs.org/). You can pan and zoom with the mouse to alter the pose of the barcode relative to the camera.`
)}

function _imageSource(Inputs){return(
Inputs.select(["real", "synthetic"], {
  label: "image"
})
)}

function _renderer(THREE){return(
new THREE.WebGLRenderer({ antialias: true })
)}

function _render(THREE,width,height,renderer,scene,camera,pixelBuffer,$0)
{
  var renderTarget = new THREE.WebGLRenderTarget(width, height);
  const gl = renderer.getContext();
  const render = () => {
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuffer);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
    $0.value++;
  };
  render.renderer = renderer;
  return render;
}


function _pixelBuffer(width,height){return(
new Uint8Array(width * height * 4)
)}

async function _scene(THREE,imageSource,FileAttachment,synthetic)
{
  const textureLoader = new THREE.TextureLoader();
  let texture = undefined;
  if (imageSource == "real") {
    texture = textureLoader.load(await FileAttachment("image.png").url());
  } else {
    const blob = new Blob([synthetic.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    texture = textureLoader.load(url);
  }

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  await new Promise((res) => (textureLoader.manager.onLoad = res));
  const cube = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ map: texture })
  );
  cube.position.x = -0.5;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000);
  scene.add(cube);
  return scene;
}


function _camera(width,height,THREE,fov)
{
  const aspect = width / height;
  const near = 0.0001;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(1, 0, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}


function _fov(Inputs){return(
Inputs.range([0, 180], {
  label: "field-of-view (degrees, vertical)",
  value: 45
})
)}

function _canvas(THREE,camera,renderer,invalidation,width,height,render,html)
{
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  renderer.setSize(width, height);
  renderer.setPixelRatio(1);
  controls.addEventListener("change", render);
  render();
  return html`<div>${renderer.domElement}</div>`;
}


function _overlay(html,width,height,scanY,canvas,invalidation)
{
  const overlay = html`<svg width="${width}px" height="${height}px" style="z-index: 10; position: absolute; pointer-events: none;">
  <line x1="0" y1="${height - scanY}" x2="${width}" y2="${
    height - scanY
  }" stroke="red" />
</svg>`;
  canvas.insertBefore(overlay, canvas.firstChild);
  invalidation.then(() => canvas.removeChild(overlay));
  return overlay;
}


function _13(md){return(
md`## Scan line sampler

We expect to be able to recognize a barcode from a single scan that passes through the center of the barcode. Here you choose the scan line position and visualize the available signal.`
)}

function _scanY(Inputs,height){return(
Inputs.range([0, height], {
  label: "scanY",
  step: 1
})
)}

function _scanline(renders,pixelBuffer,scanY,width)
{
  renders;
  const slice = pixelBuffer.slice(scanY * width * 4, (scanY + 1) * width * 4);

  return Array.from({ length: width }).map((_, i) => ({
    x: i,
    y: scanY,
    v: Math.round((slice[i * 4] + slice[i * 4 + 1] + slice[i * 4 + 2]) / 3)
  }));
}


function _16(Plot,scanline){return(
Plot.auto(scanline, {x: "x", y: "v"}).plot({width: 1000})
)}

function _17(md){return(
md`## Barcode Template

We skip barcode decoding for now and concentrate on recognizing the *known* barcode pattern expressed as a binary string.`
)}

function _template()
{
  const half = [
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1,
    1, 1
  ];
  return [...half, 1, 1, ...[...half].reverse()];
}


function _templateData(template){return(
template.flatMap((v, i) => [
  { x: i, y: v },
  { x: i + 1, y: v }
])
)}

function _20(Plot,templateData){return(
Plot.auto(templateData, {x: "x", y: "y", color: "#ff5375"}).plot()
)}

function _21(md){return(
md`## Projecting the template

The barcode will appear somewhere in the scan line deformed by perspective geometry. Translation and scale are obvious, but more complex is the effect of orientation. Note an evenly spaced barcode will end up observed as a non-evenly spaced pattern due to vanishing distance effects`
)}

function _image2(FileAttachment){return(
FileAttachment("image@2.png").image({ width: 400 })
)}

function _23(md){return(
md`## Pinhole Camera model `
)}

function _24(md){return(
md`We can calculate the spacings by considering the angle that that the barcode is relative to the camera position.`
)}

function _image5(FileAttachment){return(
FileAttachment("image@5.png").image({ width: 400 })
)}

function _26(md){return(
md`
\`\`\`
   cos(x) * c = cos(a) * b - d
   sin(x) * c = sin(a) * b
=> (eliminate c)
   (b * cos(a) - d) / cos(x) = (sin(a) * b) / sin(x)
=>
   (b * cos(a)) / cos(x) - (sin(a) * b) / sin(x) = d / cos(x)
=> 
   b * (cos(a) / cos(x) - sin(a) / sin(x)) = d / cos(x)
=>
   b = d / (cos(x) * (cos(a) / cos(x) - sin(a) / sin(x)))
=>
   b = d / (cos(a) - sin(a) * cos(x) / sin(x))


\`\`\`
`
)}

function _27(md){return(
md`We eventually arrive at the conclusion the size of the barcode and the distance from the camera are the same thing. There are only 4 important parameters, one of which is the field-of-view which is fixed. So pose estimation on a scan line becomes a 3 dimensional problem.`
)}

function _offset_pinhole(Inputs){return(
Inputs.range([-0.5, 0.5], {
  label: "offset",
  value: 0
})
)}

function _scale_pinhole(Inputs){return(
Inputs.range([0, 1.5], { label: "scale", value: 1 })
)}

function _angle_pinhole(Inputs){return(
Inputs.range([-Math.PI, Math.PI], {
  label: "angle",
  value: 0
})
)}

function _fov_pinhole(Inputs,camera){return(
Inputs.range([0.00001, Math.PI], {
  label: "field-of-view (radians)",
  // three JS FOV is vertical which is related to horizontal via aspect ratio
  value:
    2 * Math.atan(Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.aspect)
})
)}

function _32(md){return(
md`The pinhole model assumes the angle related directly to the pixel coordinates, which leads to very warped images. Real cameras project the angle to a flat plane sensor, which is what the angle correction toggle does below.`
)}

function _useAngleCoorection(Inputs){return(
Inputs.toggle({
  label: "angle correction",
  value: true
})
)}

function _useAngleCoorection1(Inputs){return(
Inputs.toggle({
  label: "angle correction",
  value: true
})
)}

function _35(md){return(
md`With these parameters, we can simulate expected pixel values for a given projection on our image. Note how adjusting the angle creates the vanishing effect, and note how the field of view further modulates the effect. I have normalized all the params so it's easy to simulate in resolution-independant scales.`
)}

function _pinhole(fov_pinhole,useAngleCoorection,templateData,template){return(
(
  px,
  model = {
    angle: 0,
    offset: 0,
    scale: 1
  }
) => {
  const angleCorrection = (px) => {
    // flatten the image against an image plane, distance d from focal point
    // tan(angle) = opposite / adjacent
    // -fov / 2 is the extreme, -0.5 is extreme of image coords
    //    tan(-fov / 2) = -0.5 / d
    // => d = -0.5 / tan(-fov * 0.5)
    // Now we d we can go forward, preserving image coordinates
    const d = -0.5 / Math.tan(-0.5 * fov_pinhole);
    return Math.atan((px - model.offset) / d) / fov_pinhole;
  };
  const pinhole = (angle) => {
    if (!useAngleCoorection) angle -= model.offset;
    const x = angle * fov_pinhole; // range: [-0.5, -0.5]
    const a = model.angle + Math.PI / 2;
    const b = 0.5 / (Math.cos(a) - (Math.sin(a) * Math.cos(x)) / Math.sin(x));
    return (b / model.scale / fov_pinhole + 0.25) * templateData.length;
  };
  const imgCoord = useAngleCoorection ? angleCorrection(px) : px;
  return template[Math.round(pinhole(imgCoord))];
}
)}

function _37(Plot,projectedPinholeData){return(
Plot.auto(projectedPinholeData, {x: "x", y: "y", color: "#1ca463"}).plot()
)}

function _projectedPinholeData(width,pinhole,offset_pinhole,scale_pinhole,angle_pinhole){return(
Array.from({ length: width }).map((_, x) => ({
  x: x,
  y: pinhole(x / width - 0.5, {
    offset: offset_pinhole,
    scale: scale_pinhole,
    angle: angle_pinhole
  })
}))
)}

function _39(md){return(
md`## Estimate the goodness-of-fit of a proposed pose`
)}

function _40(md){return(
md`Given the camera model and the parameters of a template projection, we can measure the goodness-of-fit with the mean squared error of pixel intensities. This visualization is reactive to the parameters elsewhere in the notebook.`
)}

function _fitData(width,scanline,pinhole,offset_pinhole,scale_pinhole,angle_pinhole){return(
Array.from({ length: width }).map((_, x) => {
  const scan = scanline[x].v / 256;
  const template = pinhole(x / width - 0.5, {
    offset: offset_pinhole,
    scale: scale_pinhole,
    angle: angle_pinhole
  });
  const error = Math.pow(scan - template, 2);
  return {
    x: x,
    scan,
    template,
    error
  };
})
)}

function _meanError(d3,fitData){return(
d3.mean(fitData, (d) => d.error)
)}

function _score_template_fit(width,scanline,pinhole){return(
(params = { offset: 0, scale: 1, angle: 0 }) => {
  let sumSquaredError = 0;
  for (let x = 0; x < width; x++) {
    const scan = scanline[x].v / 256;
    const template = pinhole(x / width - 0.5, {
      offset: params.offset,
      scale: params.scale,
      angle: params.angle
    });
    sumSquaredError += (scan - template) * (scan - template) || 1;
  }
  return sumSquaredError;
}
)}

function _showTemplate(Inputs){return(
Inputs.toggle({
  label: "show template?",
  value: true
})
)}

function _showScan(Inputs){return(
Inputs.toggle({
  label: "show scan?",
  value: true
})
)}

function _showError(Inputs){return(
Inputs.toggle({
  label: "show error?",
  value: true
})
)}

function _47(Plot,showTemplate,fitData,showScan,showError,meanError,width){return(
Plot.plot({
  y: {
    domain: [0, 1]
  },
  marks: [
    showTemplate
      ? Plot.lineY(fitData, { x: "x", y: "template", stroke: "green" })
      : undefined,
    showScan
      ? Plot.lineY(fitData, { x: "x", y: "scan", stroke: "blue" })
      : undefined,
    showError
      ? Plot.lineY(fitData, { x: "x", y: "error", stroke: "red" })
      : undefined,
    Plot.ruleY([meanError], { stroke: "black" }),
    Plot.text([{ meanError, text: "mean\nerror" }], {
      x: width,
      y: (d) => d.meanError + 0.03,
      text: "text"
    })
  ]
})
)}

function _48(md){return(
md`## Grid searching a best fit
#### ⚠️ slow!`
)}

function _49(tex,md){return(
md`A simple way of template matching is exhaustively trying all the pose combinations. However, this is a three-dimensional problem with an ${tex`O(n^4)`} time complexity. My computer can handle 50 steps per dimension, but this is not high enough to solve the problem without help. I have had luck using 5 steps per dim interactively, manually trimming the search space, then following up with a high step per dimension to get the best match in a small search space. Remember to turn off grid search so you can then fine-tune the final estimate.`
)}

function _useBestFit(Inputs){return(
Inputs.toggle({
  label: "Use grid search"
})
)}

function _steps(Inputs){return(
Inputs.range([1, 50], {
  value: 5,
  step: 1,
  label: "steps per dim"
})
)}

function _offset_range(interval){return(
interval([-0.4, 0.4], {
  label: "offset range"
})
)}

function _scale_range(interval){return(
interval([0, 1.5], {
  value: [0.1, 1.5],
  label: "scale range"
})
)}

function _angle_range(interval){return(
interval([-Math.PI / 2 + 0.1, Math.PI / 2 - 0.1], {
  label: "angle range"
})
)}

function _doBestFit(useBestFit,$0,bestFit,$1,$2,Event)
{
  if (useBestFit) {
    $0.value = bestFit.offset;
    $1.value = bestFit.scale;
    $2.value = bestFit.angle;

    $0.dispatchEvent(new Event("input"));
    $1.dispatchEvent(new Event("input"));
    $2.dispatchEvent(new Event("input"));
  }
}


function _bestFit(useBestFit,offset_range,steps,scale_range,angle_range,score_template_fit)
{
  if (!useBestFit) return this;
  let lowestError = Number.POSITIVE_INFINITY;
  let lowestParams = undefined;
  for (
    let offset = offset_range[0];
    offset <= offset_range[1];
    offset += (offset_range[1] - offset_range[0]) / steps
  )
    for (
      let scale = scale_range[0];
      scale <= scale_range[1];
      scale += (scale_range[1] - scale_range[0]) / steps
    )
      for (
        let angle = angle_range[0];
        angle <= angle_range[1];
        angle += (angle_range[1] - angle_range[0]) / steps
      ) {
        const params = {
          angle,
          scale,
          offset
        };
        const sumSquaredError = score_template_fit(params);
        if (sumSquaredError < lowestError) {
          lowestError = sumSquaredError;
          lowestParams = {
            ...params,
            sumSquaredError: sumSquaredError
          };
        }
      }
  return lowestParams;
}


function _58(md){return(
md`## Fine-tune with Local Patch Search`
)}

function _59(md){return(
md`When in the vicinity of a good match, you can find tune with the following routine.`
)}

function _precision_patch(Inputs){return(
Inputs.range([1, 5], { label: "precision", step: 1 })
)}

function _step_size(precision_patch){return(
Number.parseFloat(
  "0." +
    Array.from({ length: precision_patch - 1 })
      .map((_) => "0")
      .join("") +
    "1"
)
)}

function _current(offset_pinhole,angle_pinhole,scale_pinhole){return(
{
  offset: offset_pinhole,
  angle: angle_pinhole,
  scale: scale_pinhole
}
)}

function _63(Inputs,score_template_fit,current,step_size,$0,$1,$2,Event){return(
Inputs.button("step", {
  reduce: () => {
    let currentScore = score_template_fit(current);
    let next = current;
    // look around
    for (let dim in current) {
      for (let extent = -10; extent <= 10; extent += 10) {
        const candidate = {
          ...current,
          [dim]: current[dim] + extent * step_size
        };
        const candidateScore = score_template_fit(candidate);
        if (candidateScore < currentScore) {
          currentScore = candidateScore;
          next = candidate;
        }
      }
    }
    // update params
    $0.value = next.offset;
    $1.value = next.scale;
    $2.value = next.angle;

    $0.dispatchEvent(new Event("input"));
    $1.dispatchEvent(new Event("input"));
    $2.dispatchEvent(new Event("input"));
  }
})
)}

async function _64(FileAttachment,md){return(
md`## Results

After lots of bug fixes, I am pleased that it is possible to achieve very good template matches, indicating the template is keyed in correctly and we can faithfully predict the template deformation for the camera model. This is true even with high field-of-view camera models and strangely orientated barcodes as shown below.

<figure>
  ${await FileAttachment("image@9.png").image({width: 600})}
  <figcaption>I angled the barcode awkwardly to the scan line </figcaption>
</figure>

<figure>
  ${await FileAttachment("image@7.png").image({width: 400})}
  <figcaption>Mean error of 0.014 achieved on the barcode above. This is what a good fit looks like</figcaption>
</figure>

The theory that circular barcodes can be read at any pose works out! This demonstrates circular barcodes can reduce orientated object detection down to a 3-degree-of-freedom problem on a 1-dimensional slice, a drastic reduction in underlying problem complexity that fits hardware.

`
)}

function _65(md){return(
md`## Next steps

Looking forward, I think intensity-based approaches are not going to scale well. So in future work, I will try a feature-based approach (e.g. edge detection) to avoid the expensive inner loop and explore a streaming algorithm to suit hardware implementation. Future work will be added to the [realtime optical positioning collection](https://observablehq.com/collection/@tomlarkworthy/realtime-optical-positioning) of notebooks.`
)}

function _66(md){return(
md`---`
)}

function _67(md){return(
md`##### extra stuff`
)}

async function _THREE(require)
{
  const THREE = window.THREE = await require("three@0.99.0/build/three.min.js");
  await require("three@0.99.0/examples/js/controls/OrbitControls.js").catch(() => {});
  return THREE;
}


function _69(synthetic,htl){return(
htl.html`<details>
  <summary>synthetic image</summary>
  ${synthetic}
</details>`
)}

function _synthetic(template,htl){return(
htl.html`<svg width=1600 xmlns="http://www.w3.org/2000/svg" viewBox="-${template.length/2} -${template.length/2} ${template.length} ${template.length}">
  ${template.map((t, i) => i > template.length / 2 ? undefined : htl.svg`<circle cx="0" cy="0" r="${Math.abs(template.length/2 - i)}" fill="${t == true ? "white": "black"}" />`)}
</svg>`
)}

function _height(){return(
401
)}

function _renders(){return(
0
)}

function _74(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/021e29bc2e9e3924e230940400200d4e3933153e9babd520c6e594e6dabeffc4fc3501ca9b57b15170768c883c90f1e89386bcaf0f9bae04858b02b5099ed99d.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/c8a38767b458c271e20a6510ce2cae7f121ab9cfa0757db945fad69ef6d4381e45307e9d0755d4d5f82a8967715e0f56df525a1291af8606c13e4fdd632d7d81.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@5.png", {url: new URL("./files/b93b935028522ee6a48a144fe4cdb0a153a9daf82e0f7d9ad444b46a1024e1bb7de99698ec5c76eba0e84484184d176d2fdc2e9de01f151391e81bd677788fab.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@7.png", {url: new URL("./files/09c7c5d686ad26e455eac60a5cd204d331b4c0347355f152b9217908da2d138503008965a0963c4e5ceeb6868ac3c3acad8e79518a8c6a432b4547a5b4e2f103.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@9.png", {url: new URL("./files/19fddea7642a31261b8f89e951c48ab43ef57a272d273aad8d4b746432eec2f91f76595b1ffe395b81bfd883c1f9f8858a723957f24fe1bc2271e662b57b611d.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof imageSource")).define("viewof imageSource", ["Inputs"], _imageSource);
  main.variable(observer("imageSource")).define("imageSource", ["Generators", "viewof imageSource"], (G, _) => G.input(_));
  main.variable(observer("renderer")).define("renderer", ["THREE"], _renderer);
  main.variable(observer("render")).define("render", ["THREE","width","height","renderer","scene","camera","pixelBuffer","mutable renders"], _render);
  main.variable(observer("pixelBuffer")).define("pixelBuffer", ["width","height"], _pixelBuffer);
  main.variable(observer("scene")).define("scene", ["THREE","imageSource","FileAttachment","synthetic"], _scene);
  main.variable(observer("camera")).define("camera", ["width","height","THREE","fov"], _camera);
  main.variable(observer("viewof fov")).define("viewof fov", ["Inputs"], _fov);
  main.variable(observer("fov")).define("fov", ["Generators", "viewof fov"], (G, _) => G.input(_));
  main.variable(observer("canvas")).define("canvas", ["THREE","camera","renderer","invalidation","width","height","render","html"], _canvas);
  main.variable(observer("overlay")).define("overlay", ["html","width","height","scanY","canvas","invalidation"], _overlay);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof scanY")).define("viewof scanY", ["Inputs","height"], _scanY);
  main.variable(observer("scanY")).define("scanY", ["Generators", "viewof scanY"], (G, _) => G.input(_));
  main.variable(observer("scanline")).define("scanline", ["renders","pixelBuffer","scanY","width"], _scanline);
  main.variable(observer()).define(["Plot","scanline"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("template")).define("template", _template);
  main.variable(observer("templateData")).define("templateData", ["template"], _templateData);
  main.variable(observer()).define(["Plot","templateData"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("image2")).define("image2", ["FileAttachment"], _image2);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("image5")).define("image5", ["FileAttachment"], _image5);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("viewof offset_pinhole")).define("viewof offset_pinhole", ["Inputs"], _offset_pinhole);
  main.variable(observer("offset_pinhole")).define("offset_pinhole", ["Generators", "viewof offset_pinhole"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_pinhole")).define("viewof scale_pinhole", ["Inputs"], _scale_pinhole);
  main.variable(observer("scale_pinhole")).define("scale_pinhole", ["Generators", "viewof scale_pinhole"], (G, _) => G.input(_));
  main.variable(observer("viewof angle_pinhole")).define("viewof angle_pinhole", ["Inputs"], _angle_pinhole);
  main.variable(observer("angle_pinhole")).define("angle_pinhole", ["Generators", "viewof angle_pinhole"], (G, _) => G.input(_));
  main.variable(observer("viewof fov_pinhole")).define("viewof fov_pinhole", ["Inputs","camera"], _fov_pinhole);
  main.variable(observer("fov_pinhole")).define("fov_pinhole", ["Generators", "viewof fov_pinhole"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof useAngleCoorection")).define("viewof useAngleCoorection", ["Inputs"], _useAngleCoorection);
  main.variable(observer("useAngleCoorection")).define("useAngleCoorection", ["Generators", "viewof useAngleCoorection"], (G, _) => G.input(_));
  main.variable(observer("viewof useAngleCoorection1")).define("viewof useAngleCoorection1", ["Inputs"], _useAngleCoorection1);
  main.variable(observer("useAngleCoorection1")).define("useAngleCoorection1", ["Generators", "viewof useAngleCoorection1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("pinhole")).define("pinhole", ["fov_pinhole","useAngleCoorection","templateData","template"], _pinhole);
  main.variable(observer()).define(["Plot","projectedPinholeData"], _37);
  main.variable(observer("projectedPinholeData")).define("projectedPinholeData", ["width","pinhole","offset_pinhole","scale_pinhole","angle_pinhole"], _projectedPinholeData);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("fitData")).define("fitData", ["width","scanline","pinhole","offset_pinhole","scale_pinhole","angle_pinhole"], _fitData);
  main.variable(observer("meanError")).define("meanError", ["d3","fitData"], _meanError);
  main.variable(observer("score_template_fit")).define("score_template_fit", ["width","scanline","pinhole"], _score_template_fit);
  main.variable(observer("viewof showTemplate")).define("viewof showTemplate", ["Inputs"], _showTemplate);
  main.variable(observer("showTemplate")).define("showTemplate", ["Generators", "viewof showTemplate"], (G, _) => G.input(_));
  main.variable(observer("viewof showScan")).define("viewof showScan", ["Inputs"], _showScan);
  main.variable(observer("showScan")).define("showScan", ["Generators", "viewof showScan"], (G, _) => G.input(_));
  main.variable(observer("viewof showError")).define("viewof showError", ["Inputs"], _showError);
  main.variable(observer("showError")).define("showError", ["Generators", "viewof showError"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","showTemplate","fitData","showScan","showError","meanError","width"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["tex","md"], _49);
  main.variable(observer("viewof useBestFit")).define("viewof useBestFit", ["Inputs"], _useBestFit);
  main.variable(observer("useBestFit")).define("useBestFit", ["Generators", "viewof useBestFit"], (G, _) => G.input(_));
  main.variable(observer("viewof steps")).define("viewof steps", ["Inputs"], _steps);
  main.variable(observer("steps")).define("steps", ["Generators", "viewof steps"], (G, _) => G.input(_));
  main.variable(observer("viewof offset_range")).define("viewof offset_range", ["interval"], _offset_range);
  main.variable(observer("offset_range")).define("offset_range", ["Generators", "viewof offset_range"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_range")).define("viewof scale_range", ["interval"], _scale_range);
  main.variable(observer("scale_range")).define("scale_range", ["Generators", "viewof scale_range"], (G, _) => G.input(_));
  main.variable(observer("viewof angle_range")).define("viewof angle_range", ["interval"], _angle_range);
  main.variable(observer("angle_range")).define("angle_range", ["Generators", "viewof angle_range"], (G, _) => G.input(_));
  main.variable(observer("doBestFit")).define("doBestFit", ["useBestFit","viewof offset_pinhole","bestFit","viewof scale_pinhole","viewof angle_pinhole","Event"], _doBestFit);
  main.variable(observer("bestFit")).define("bestFit", ["useBestFit","offset_range","steps","scale_range","angle_range","score_template_fit"], _bestFit);
  const child1 = runtime.module(define1);
  main.import("interval", child1);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("viewof precision_patch")).define("viewof precision_patch", ["Inputs"], _precision_patch);
  main.variable(observer("precision_patch")).define("precision_patch", ["Generators", "viewof precision_patch"], (G, _) => G.input(_));
  main.variable(observer("step_size")).define("step_size", ["precision_patch"], _step_size);
  main.variable(observer("current")).define("current", ["offset_pinhole","angle_pinhole","scale_pinhole"], _current);
  main.variable(observer()).define(["Inputs","score_template_fit","current","step_size","viewof offset_pinhole","viewof scale_pinhole","viewof angle_pinhole","Event"], _63);
  main.variable(observer()).define(["FileAttachment","md"], _64);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer()).define(["synthetic","htl"], _69);
  main.variable(observer("synthetic")).define("synthetic", ["template","htl"], _synthetic);
  main.variable(observer("height")).define("height", _height);
  main.define("initial renders", _renders);
  main.variable(observer("mutable renders")).define("mutable renders", ["Mutable", "initial renders"], (M, _) => new M(_));
  main.variable(observer("renders")).define("renders", ["mutable renders"], _ => _.generator);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _74);
  return main;
}
