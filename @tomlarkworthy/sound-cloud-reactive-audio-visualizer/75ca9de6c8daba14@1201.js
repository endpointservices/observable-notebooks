import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./c6e46a483fad9cef@36.js";
import define4 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Soundcloud Reactive Audio Visualizer Music Video Generator

This is a tool for generating an acceptable music video from any Soundcloud track. Scroll down to find customize the audio input URL and put whatever you like. Press record to generate a downloadable _webm_ for sharing. Or just chill out by going fullscreen. More options are scattered throughout the page (e.g. video resolution or customization of visuals). I hope it might help a few artists with video production.

This app was developed to help me learn a few things before building a full audio visual mixing demoscene system. In particular, you can click under the hood, fork the code and create your own experiences. Its licensed as ISC so you can do what you like with the code and output, no need to credit me, though I would be honoured.

This demos the following technologies
  1. Using the Web Audio API to extract a waveform to drive reactive visuals
  1. Using Three.js effects composer to create multi layed visuals with post processing effects
  1. Importing audio from external sources (Soundcloud)
  1. Setting up an high performance Web Audio API graph.
  1. Extracting a combined audio and visual into a single video file.
  1. Using the wake lock API to prevent the host sleeping when fullscreened.
  1. Inserting HTML into a Three.js scene.

These are foundational techniques for doing even cooler things in the browser! Stay tuned! Use the comment feature to get in touch.
`
)}

function _2(source,context,analyser,MediaStream,MediaRecorder,html)
{
  var controls = null;
  const rewind = () => {
    stop()
    source.mediaElement.currentTime = 0;
  }
  
  const play = () => {
    console.log("play")
    context.resume()
    source.connect(analyser);
    analyser.connect(context.destination);
    source.mediaElement.play();
  }
  const stop = () => {
    console.log("stop")
    source.mediaElement.pause();
  }
  const fullscreen = async (event) => {
    controls.parentElement.nextElementSibling.requestFullscreen();
    await navigator.wakeLock.request('screen');
  }
  const record = async (event) => {
    document.getElementById("downloadlink").innerHTML = ""
    var recordedChunks = [];
    return new Promise(function (res, rej) {
      const canvas = document.getElementById("visualizer");
      const video = canvas.captureStream();
      const audio = context.createMediaStreamDestination();
      analyser.connect(audio)
      const stream = new MediaStream([video.getVideoTracks()[0], audio.stream.getAudioTracks()[0]])
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
      });
      
      mediaRecorder.start();
      play()
      function stopRecorder() {
        mediaRecorder.stop();
        source.mediaElement.removeEventListener("pause", stopRecorder, true);
        source.mediaElement.removeEventListener('ended', stopRecorder, true);
      }
      source.mediaElement.addEventListener("pause", stopRecorder, true);
      source.mediaElement.addEventListener('ended', stopRecorder, true);
      
      mediaRecorder.ondataavailable = function (event) {
        console.log("Chunk recorded", event)
        recordedChunks.push(event.data);
      }

      mediaRecorder.onstop = function (event) {
        console.log("stopped")
        var blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        var url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById("downloadlink")
        downloadLink.href = url
        downloadLink.innerHTML = "download"
      }
    })
  }
  controls = html`
    <button onclick=${rewind}>rewind</button>
    <button onclick=${play}>play</button>
    <button onclick=${stop}>stop</button>
    <button onclick=${fullscreen}>fullscreen</button>
    <button onclick=${record}>record</button>
    <a id="downloadlink" download></a>
  `
  return controls;
}


function* _3(resolution,THREE,invalidation,EffectComposer,buffers,RenderPass,UnrealBloomPass,title,ShaderPass,CopyShader,$0)
{
  const width = resolution.width;
  const height = resolution.height;
  
  var camera = new THREE.OrthographicCamera(width / -2, width / 2,
                                            height / 2, height / -2,
                                            0, height / -2);
  

  const renderer = new THREE.WebGLRenderer();
  const renderTarget = new THREE.WebGLRenderTarget( width, height, {
    depthBuffer: false
  });
  
  renderer.setClearColor(new THREE.Color(0x000000, 1.0));
  renderer.domElement.id = "visualizer"
  
  invalidation.then(() => renderer.dispose());
  renderer.setSize(width, height);
  const composer = new EffectComposer( renderer, renderTarget);
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(buffers.line);
  

  
  const renderScene = new RenderPass( scene, camera );
  const bloomPass = new UnrealBloomPass( new THREE.Vector2( width, height), 1.5, 0.4, 0.85 );
  bloomPass.threshold = 0;
	bloomPass.strength = 7;
	bloomPass.radius = 1;

	composer.addPass( renderScene );
	composer.addPass( bloomPass );
  
  
  { // Credits
    const texture = new THREE.TextureLoader().load(title.img);
    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
    });
    const geometry = new THREE.PlaneBufferGeometry(title.width, title.height);
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(
      width/2.0 - title.width/2.0,
      - height/2.0 + title.height / 2.0,
      0)

    const titleScene = new THREE.Scene();
    titleScene.add(mesh);
    const renderTitle = new RenderPass( titleScene, camera);
    renderTitle.clear = false;
	  composer.addPass( renderTitle );
    const copyPass = new ShaderPass( CopyShader );
    copyPass.renderToScreen = true;
	  composer.addPass( copyPass );
  }
  
  
  const t_start = performance.now();
  
  while (true) {
    $0.value = performance.now() - t_start
    composer.render();
    yield renderer.domElement;
  }
}


function _resolution(resolution_str){return(
JSON.parse(resolution_str)
)}

function _resolution_str(select,width,height){return(
select([
    {label: `screen (${width}, ${height})`, value: JSON.stringify({width:width, height:height})},
    {label: "1080p (1920x1080)",  value: JSON.stringify({width:1920, height:1080})},
  ])
)}

function _6(md){return(
md`Create a global Audio Context`
)}

function _context(){return(
new AudioContext()
)}

function _8(md){return(
md`Create an Media Element Source. We use the Sound Cloud API to get a stream URL based on the URL provided,
then build a media element around it. Choose your own song by pasting the link in the box, this will update the URL, so you can share this page with your favourite song already preloaded`
)}

function _source(render,useState,location,useEffect,SC,Audio,context,jsx,width){return(
render(({ useSetter }) => {
  const [searchInput, setSearchInput] = useState(
    decodeURIComponent(
      (
        location.hash ||
        "#https://soundcloud.com/dexcelldnb/dexcell-something-from-nothing-vip"
      ).substring(1)
    )
  );
  const [search, setSearch] = useState(searchInput);
  const [track, setTrack] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    SC.resolve(search)
      .then((track) => setTrack(track))
      .catch((e) => setTrack(null));
  }, [search]);

  useEffect(() => {
    if (track === null) {
      setMedia(null);
    } else {
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.src = track.stream_url + "?client_id=" + SC.client_id;
      setMedia(context.createMediaElementSource(audio));
    }
  }, [track]);

  useEffect(() => {
    // change the top url
    if (media !== null) document.getElementById("audioviz").click();
  }, [media]);

  const view = media || {};
  view.search = search;
  view.track = track;
  useSetter(view);

  return jsx`
    <center>
    <input
      type="text"
      placeholder="paste Sound Cloud URL here"
      value=${searchInput}
      onChange=${(e) => setSearchInput(e.target.value)}
      onKeyDown=${(e) => e.key === "Enter" && setSearch(searchInput)}
    />
    ${
      track &&
      jsx`
      <h4><a href=${track.user.permalink_url} target="_blank">${
        track.user.username
      }</a></h4>
      <a href=${track.permalink_url} target="_blank">
        <h3>${track.title}</h3>
        <img width=${width / 2}src=${track.artwork_url}/>
      </a>
      
      <p><a id="audioviz" href=${
        document.baseURI + "#" + encodeURIComponent(search)
      }>audioviz</a></p>
    `
    }

    </center>
  `;
})
)}

function _10(md){return(
md`Its simplest to use normal HTML for the subtitles`
)}

function _titleHtml(html,source)
{
  const view = html`
    <style> 
      #titleHtml {
        text-align: right;
        z-index: 100;
        display:inline-block;
        color: lightgray;
        padding-right: 20px;
        padding-bottom: 10px;
      }
    </style>
    <div id="titleHtml">
      <h2>${source.track ? source.track.user.username: "artist"}</h2>
      <h1>${source.track ? source.track.title: "title"}</h1>
    </div>`
  return view
}


function _12(md){return(
md`We use a technology called dom-to-image to turn normal HTML into an image we can insert into the Three.js scene as a texture`
)}

async function _title(titleHtml,dom2img)
{
  titleHtml
  const title = document.getElementById('titleHtml')
  return {
    element: title,
    width: title.offsetWidth ,
    height: title.offsetHeight,
    img: await dom2img.toPng(title)
  }
}


function _dom2img(require){return(
require('https://bundle.run/dom-to-image@2.6.0')
)}

function _15(md){return(
md`Create an analyser, which is able to capture waveforms as they are processed on the audio graph.`
)}

function _analyser(context){return(
context.createAnalyser()
)}

function _source_debug(source){return(
source
)}

function _18(md){return(
md`Buffers are THREE.js geometry holders which are static. We will be fiddling with the geometry based on the sound waveform, but the scene graph remains static throughout`
)}

function _buffers(THREE,MAX_SEGMENTS,analyser,init)
{
  // Buffers hold the static geometry which we manipulate elsewhere.
  const buffers = {
    positions: new THREE.Float32BufferAttribute( (MAX_SEGMENTS) * 3, 3 ),
    colors: new THREE.Float32BufferAttribute( (MAX_SEGMENTS) * 3, 3 ),
    lineGeometry: new THREE.BufferGeometry(),
    lineMaterial: new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: true} ),
    dataArray: new Uint8Array(analyser.frequencyBinCount),
  }
  buffers.positions.set(init.positions)
  buffers.colors.set(init.colors)
  buffers.lineGeometry.setAttribute('position', buffers.positions)
  buffers.lineGeometry.setAttribute('color', buffers.colors)
  buffers.line = new THREE.Line( buffers.lineGeometry, buffers.lineMaterial )  
  buffers.lineGeometry.setDrawRange(0, MAX_SEGMENTS);
  return buffers;
}


function _20(md){return(
md`Our visualizer animation loop bumps the time variable _t_, causing dependant code to run`
)}

function _t(){return(
0.0
)}

function _22(md){return(
md`Our core drawing code. When _t_ is bumped by rendering, the draw code runs. We use the data from the Audio Analyser to updating the line geometry`
)}

function _draw(t,source,resolution,THREE,analyser,buffers)
{
  t; // force this cell to update when time increments
  if (source.mediaElement.paused) return;
  const width = resolution.width;
  const height = resolution.height;

  const points = [];
  const colors = [];
  const point = new THREE.Vector3();
  const color = new THREE.Color();

  // Rotating colors
  color.setRGB(
    Math.cos(t * 0.00011) * 0.5 + 1,
    Math.cos(t * 0.002) * 0.5 + 1,
    Math.cos(t * 0.003) * 0.5 + 1
  );

  // Positions driven by audio analyser
  analyser.getByteTimeDomainData(buffers.dataArray);
  for (let i = 0; i < buffers.dataArray.length; i++) {
    var mod = 1; // Math.sin(i * Math.PI / buffers.dataArray.length)
    var y = ((buffers.dataArray[i] * height) / 256.0 - height / 2.0) * mod;
    var x = -width / 2 + (i * width) / buffers.dataArray.length;
    points.push(x, y, 0);
    colors.push(color.r, color.g, color.b);
  }
  // loop wave form round to enter the view from the left again
  points.push(width * 2, 0, 0);
  points.push(width * 2, height * 2, 0);
  points.push(-width * 2, height * 2, 0);
  points.push(-width * 2, 0, 0);

  // The main stratergy is to shift all the buffers down, and append new data points to the end
  buffers.positions.set(buffers.positions.array.slice(points.length));
  buffers.positions.set(points, buffers.positions.count * 3 - points.length);
  buffers.positions.needsUpdate = true;

  // Decay the colors by a factor so the old lines fade out
  buffers.colors.set(
    buffers.colors.array.slice(colors.length).map((x) => x * 0.5),
    0
  );
  buffers.colors.set(colors, buffers.colors.count * 3 - colors.length);
  buffers.colors.needsUpdate = true;
}


function _height(){return(
window.screen.height
)}

function _MAX_SEGMENTS(){return(
1024*4
)}

async function _SC(require)
{
  const sc = await require('soundcloud');
  sc.client_id = "95f22ed54a5c297b1c41f72d713623ef"
  sc.initialize({
    client_id: sc.client_id,
    redirect_uri: 'https://example.com/callback'
  });
  return sc
}


function _THREE_VERSION(){return(
"0.112.1"
)}

function _THREE(require,THREE_VERSION){return(
require(`three@${THREE_VERSION}/build/three.min.js`)
)}

async function _EffectComposer(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/EffectComposer.js?module`)).EffectComposer
)}

async function _UnrealBloomPass(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/UnrealBloomPass.js?module`)).UnrealBloomPass
)}

async function _RenderPass(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/RenderPass.js?module`)).RenderPass
)}

async function _ShaderPass(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/postprocessing/ShaderPass.js?module`)).ShaderPass
)}

async function _CopyShader(THREE_VERSION){return(
(await import(`https://unpkg.com/three@${THREE_VERSION}/examples/jsm/shaders/CopyShader.js?module`)).CopyShader
)}

async function _init(FileAttachment){return(
{
  positions: JSON.parse(await FileAttachment("positions.json").text()),
  colors: JSON.parse(await FileAttachment("colors.json").text())
}
)}

function _40(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["positions.json", {url: new URL("./files/987350cd53fddf223d46539654cd6e07de3a5d182eca513c0bac27d18f25547cc61073dae7e52d9f06ca045fda5e0867fae249441dd892802f27a91673a67bfe.json", import.meta.url), mimeType: "application/json", toString}],
    ["colors.json", {url: new URL("./files/0ca7672d7694da0962dad33a84de2e6e0c9199f8d7251a26795f167fcfaebcb672849b35f1399140cf878a9fe42160a4f709746e976f02c730f4f49901f94b7d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["source","context","analyser","MediaStream","MediaRecorder","html"], _2);
  main.variable(observer()).define(["resolution","THREE","invalidation","EffectComposer","buffers","RenderPass","UnrealBloomPass","title","ShaderPass","CopyShader","mutable t"], _3);
  main.variable(observer("resolution")).define("resolution", ["resolution_str"], _resolution);
  main.variable(observer("viewof resolution_str")).define("viewof resolution_str", ["select","width","height"], _resolution_str);
  main.variable(observer("resolution_str")).define("resolution_str", ["Generators", "viewof resolution_str"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("context")).define("context", _context);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof source")).define("viewof source", ["render","useState","location","useEffect","SC","Audio","context","jsx","width"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("titleHtml")).define("titleHtml", ["html","source"], _titleHtml);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("title")).define("title", ["titleHtml","dom2img"], _title);
  main.variable(observer("dom2img")).define("dom2img", ["require"], _dom2img);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("analyser")).define("analyser", ["context"], _analyser);
  main.variable(observer("source_debug")).define("source_debug", ["source"], _source_debug);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("buffers")).define("buffers", ["THREE","MAX_SEGMENTS","analyser","init"], _buffers);
  main.variable(observer()).define(["md"], _20);
  main.define("initial t", _t);
  main.variable(observer("mutable t")).define("mutable t", ["Mutable", "initial t"], (M, _) => new M(_));
  main.variable(observer("t")).define("t", ["mutable t"], _ => _.generator);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("draw")).define("draw", ["t","source","resolution","THREE","analyser","buffers"], _draw);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("MAX_SEGMENTS")).define("MAX_SEGMENTS", _MAX_SEGMENTS);
  main.variable(observer("SC")).define("SC", ["require"], _SC);
  main.variable(observer("THREE_VERSION")).define("THREE_VERSION", _THREE_VERSION);
  main.variable(observer("THREE")).define("THREE", ["require","THREE_VERSION"], _THREE);
  main.variable(observer("EffectComposer")).define("EffectComposer", ["THREE_VERSION"], _EffectComposer);
  main.variable(observer("UnrealBloomPass")).define("UnrealBloomPass", ["THREE_VERSION"], _UnrealBloomPass);
  main.variable(observer("RenderPass")).define("RenderPass", ["THREE_VERSION"], _RenderPass);
  main.variable(observer("ShaderPass")).define("ShaderPass", ["THREE_VERSION"], _ShaderPass);
  main.variable(observer("CopyShader")).define("CopyShader", ["THREE_VERSION"], _CopyShader);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("select", child2);
  const child3 = runtime.module(define2);
  main.import("checkbox", child3);
  const child4 = runtime.module(define3);
  main.import("render", child4);
  main.import("component", child4);
  main.import("jsx", child4);
  main.import("memo", child4);
  main.import("forwardRef", child4);
  main.import("React", child4);
  main.import("ReactDOM", child4);
  main.import("createElement", child4);
  main.import("Children", child4);
  main.import("createRef", child4);
  main.import("createContext", child4);
  main.import("lazy", child4);
  main.import("Fragment", child4);
  main.import("StrictMode", child4);
  main.import("Suspense", child4);
  main.import("cloneElement", child4);
  main.import("useCallback", child4);
  main.import("useContext", child4);
  main.import("useEffect", child4);
  main.import("useImperativeHandle", child4);
  main.import("useLayoutEffect", child4);
  main.import("useMemo", child4);
  main.import("useReducer", child4);
  main.import("useRef", child4);
  main.import("useState", child4);
  main.variable(observer("init")).define("init", ["FileAttachment"], _init);
  const child5 = runtime.module(define4);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _40);
  return main;
}
