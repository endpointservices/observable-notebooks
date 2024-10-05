import define1 from "./13a3f0db163beab4@4159.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./a2e58f97fd5e8d7c@756.js";

function _1(md){return(
md`# Audio Inputs

~~~js
import { sample, audioContext } from "@tomlarkworthy/audio-inputs"
~~~`
)}

function _2(md){return(
md`## Sample

Loads audio data into an AudioBuffer, and provides some controls for selection, playbackRate, volume and loop of the sample.

The value emitted by the control is the buffer, annotated with properties.

TODO: BUG: changing loop selection resets loop which is not strictly necissary
`
)}

async function _manual(sample,audioContext,FileAttachment){return(
sample({
  loop: false,
  gain: 0.4,
  speed: 3,
  audioContext: audioContext,
  arrayBuffer: await FileAttachment("Crash-Cymbal-1.wav").arrayBuffer()
})
)}

function _4(manual,audioContext)
{
  manual.playing = audioContext.currentTime + 0.5;
  manual.playing = audioContext.currentTime + 1;
}


async function _cymbal(sample,audioContext,FileAttachment){return(
sample({
  loop: true,
  gain: 0.4,
  start: 0.1,
  end: 0.5,
  speed: 3,
  audioContext: audioContext,
  arrayBuffer: await FileAttachment("Crash-Cymbal-1.wav").arrayBuffer()
})
)}

function _6(cymbal){return(
cymbal
)}

function _7(md){return(
md`

~~~js
import {sample, webaudioPolyfill} from '@tomlarkworthy/audio-inputs'
~~~

~~~js
viewof cymbal = sample({
  audioContext: new AudioContext() /* usually shared across many componetns in an audio app */,
  arrayBuffer: await FileAttachment("Crash-Cymbal-1.wav").arrayBuffer(),
})
~~~
`
)}

function _sample(webaudioPolyfill,Range,invalidation,knob,waveformSelect,html){return(
async function sample({
  loop = false,
  gain = 1,
  speed = 1,
  start = 0,
  end,
  audioContext,
  arrayBuffer,
  speedAdjust = true
} = {}) {
  webaudioPolyfill; // Safari
  const sampleData = await audioContext.decodeAudioData(arrayBuffer);
  // Some useful seconds to data indeces factors.
  const d2s = sampleData.duration / sampleData.getChannelData(0).length;
  const s2d = sampleData.getChannelData(0).length / sampleData.duration;
  if (!end) end = sampleData.duration;

  const speedCtl = Range([0.2, 5], {
    value: speed,
    label: "speed",
    transform: Math.log
  });
  const syncSpeed = () => setLoop(loop);
  speedCtl.addEventListener("input", syncSpeed);
  invalidation.then(() => speedCtl.removeEventListener("input", syncSpeed));

  const volume = knob({
    value: gain,
    type: "volume",
    size: 50
  });
  const syncVolume = () => {
    if (gain && gain.gain) gain.gain.value = volume.value;
  };
  volume.addEventListener("input", syncVolume);
  invalidation.then(() => volume.removeEventListener("input", syncVolume));

  const waveform = waveformSelect({
    selectionStart: start * s2d,
    selectionEnd: end * s2d,
    audioBuffer: sampleData,
    height: 34
  });
  waveform.style["padding"] = "4px";
  waveform.style["margin-top"] = `3px`;
  const syncWaveform = () => setLoop(loop);
  waveform.addEventListener("input", syncWaveform);
  invalidation.then(() => waveform.removeEventListener("input", syncWaveform));

  let source = null;
  let playing = false;

  function play(when = 0) {
    if (when === 0) stop();
    source = audioContext.createBufferSource();
    source.onended = () => {
      console.log("on ended");
      playing = false;
      updateLook();
    };
    source.buffer = sampleData;
    source.playbackRate.value = speedCtl.value;

    gain = audioContext.createGain();
    source.connect(gain);
    gain.connect(audioContext.destination);

    setLoop(loop);
    volume.setVolume(volume.value);

    const start = waveform.value.selectionStart * d2s;
    const duration =
      (waveform.value.selectionEnd - waveform.value.selectionStart) * d2s;
    source.start(when, start, loop ? undefined : duration);
    playing = true;
    updateLook();
  }
  function stop() {
    if (source) {
      source.onended = null;
      source.stop();
    }
    playing = false;
    source = gain = null;
    updateLook();
  }

  function updateLook() {
    loopButton.style["color"] = loop ? "green" : "black";
    loopButton.style["stroke"] = loop ? "green" : "black";
    loopButton.style["border-color"] = loop ? "green" : "black";
    playButton.style["color"] = playing ? "green" : "black";
    playButton.style["stroke"] = playing ? "green" : "black";
    playButton.style["border-color"] = playing ? "green" : "black";
  }

  function setLoop(shouldLoop) {
    loop = shouldLoop;
    if (source) {
      source.loop = loop;
      source.loopStart = waveform.value.selectionStart * d2s;
      source.loopEnd = waveform.value.selectionEnd * d2s;
      if (playing && loop) {
        console.log("Restart loop");
        stop();
        play();
      }
    }
  }
  const ui = html`<div class="audio">
    <style>
      .audio-container {
        display: flex;
        flex-direction: row;
      }
      .audio-btn {
        color: black;
        stroke: black;
        border-color: black;
        border-width: 1px;
        border-radius: 5px;
        text-align: center;
        background: white;
        height:35px;
        width:35px;
        margin: 2px;
        margin-top: 6px;
      }
    </style>
    <span class="audio-container">
      ${volume}
      <button class="audio-btn play-btn" onclick=${() => play(0)}>▶</button>
      <button class="audio-btn" onclick=${stop}>◾</button>
      <button class="audio-btn loop-btn" style="font-size:24px"  onclick=${() => {
        setLoop(!loop);
        updateLook();
      }} >↻</button>
      ${waveform}
    </span>
    <span>
      ${speedAdjust ? speedCtl : null}
    </span>
  </div>`;
  let loopButton = ui.querySelector(".loop-btn");
  let playButton = ui.querySelector(".play-btn");
  ui.value = sampleData;

  // Add accessors to value to make it mutable
  Object.defineProperty(ui.value, "gain", {
    get: () => volume.value,
    set: (value) => volume.setVolume(value),
    enumerable: true
  });

  Object.defineProperty(ui.value, "speed", {
    get: () => speedCtl.value,
    set: (value) => (speedCtl.value = value),
    enumerable: true
  });

  Object.defineProperty(ui.value, "start", {
    get: () => waveform.value.selectionStart * d2s,
    set: (value) => waveform.value.setSelectionStart(value * s2d),
    enumerable: true
  });

  Object.defineProperty(ui.value, "end", {
    get: () => waveform.value.selectionEnd * d2s,
    set: (value) => waveform.value.setSelectionEnd(value * s2d),
    enumerable: true
  });

  Object.defineProperty(ui.value, "playing", {
    get: () => playing,
    set: (newVal) => {
      if (typeof newVal === "number") {
        play(newVal);
      } else {
        newVal ? play() : stop();
      }
    },
    enumerable: true
  });

  // Add top level control to DOM
  ui.play = play;
  ui.stop = stop;

  invalidation.then(() => stop());

  // Color in loop button
  setLoop(loop);
  updateLook();

  return ui;
}
)}

function _9(md){return(
md`### Writable properties demo

If you write to the emitted value fields the UI will update. See what happens when you press play and fiddle with the playback speed.
`
)}

function _10(writable_demo,now)
{
  writable_demo.start = 0.5* Math.sin(now/300) + 0.5
  writable_demo.end = 0.5*Math.sin(now/300) + 0.6
  writable_demo.gain = (now / 1000) % 1
  return Object.keys(writable_demo).concat(Object.values(writable_demo))
}


function _audioContext(){return(
new AudioContext()
)}

async function _writable_demo(sample,audioContext,FileAttachment){return(
sample({
  loop: true,
  audioContext: audioContext,
  arrayBuffer: await FileAttachment("Crash-Cymbal-1.wav").arrayBuffer()
})
)}

function _13(writable_demo){return(
writable_demo
)}

function _14(md){return(
md`## Knob

Knobs are an inferior but cooler way of implementing a slider. Drag up or to the right to increase the value.

`
)}

function _volume(knob){return(
knob({
  type: "volume",
  size: 250,
  value: 0.5
})
)}

function _knob(width,invalidation,svg,range){return(
function knob({
  type = "volume",
  value = 1, 
  size = 100
} = {}) {
  if (type != "volume") throw new Error("Only have volume know ATM")
  let start = null;
  function mousedown(evt) {
    start = [evt.clientX, evt.clientY, value]
    return false;
  }
  const mousemove = (evt) => {
    if (!evt.buttons) start = null;
    if (start) {
      const delta =
            evt.clientX - start[0] - evt.clientY + start[1]
      const volume = start[2] + delta / width * 5
      setVolume(volume)
    }
  }
  const mouseup = (evt) => start = null;
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
  
  invalidation.then(() => {
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  })
  
  function setVolume(_volume) {
    value = Math.min(Math.max(_volume, 0), 1)
    ui.value = value;
    const deg = -125 + value * 250;
    pivot.transform.baseVal.getItem(0).setRotate(deg, 0, 0);
    ui.dispatchEvent(new CustomEvent("input"));
  }
  
  const ui = svg`<svg
      onmousedown=${mousedown}
      viewBox="-1 -1 2 2"
      width=${size} height=${size}
      stroke-width="0.01"
      stroke="black"
      stroke-linecap="round"
      fill="none">
    <circle r=".7"/>
    <line class="pivot" x2="0" y2="-0.6" stroke-width="0.15" transform="rotate(0)"/>
    <g fill="black" stroke="none">
      ${range(-125, 125, 250 / 20).map((d, i) => svg`<g 
        transform="rotate(${d})translate(0 -0.75)">
        <rect x="-0.025" y="${-i*0.005}" width="0.05" height="${i*0.005}"/>
      </g>`)}
    </g>
  </svg>`
  
  let pivot = ui.querySelector(".pivot");
  setVolume(value);
  ui.value = value
  ui.setVolume = setVolume;
  return ui;
}
)}

function _17(md){return(
md`## Waveform Selector

Uses Yuri Vishnevsky's [density plot](https://observablehq.com/collection/@twitter/density) to display a waveform effeciently as an undersampled timeseries. The user can select a portion with the mouse.
`
)}

async function _waveform(waveformSelect,FileAttachment){return(
waveformSelect({
  audioBuffer: await new AudioContext().decodeAudioData(await FileAttachment("Crash-Cymbal-1.wav").arrayBuffer()),
  selectionStart: 10000,
  selectionEnd: 50000, 
})
)}

function _waveformSelect(seriesDensity,densityPlot,svg,html,invalidation){return(
function waveformSelect({
  audioBuffer,
  width = 250,
  height = 50,
  selectionStart = 0,
  selectionEnd = audioBuffer.length
} = {}) {
  const data = audioBuffer.getChannelData(0);
  const density = seriesDensity(width, height)
    .yDomain([-1, 1])
    .arcLengthNormalize(false)
    .xDomain([0, data.length]);
  let plot = densityPlot(density)
              .drawAxes(false)
              .background("white")
              .color(() => () => ({r:0, g:0, b:0, opacity:1}));
  const waveform = plot([data]);
  let start = null;
  
  function mousedown(evt) {
    const rect = ui.getBoundingClientRect()
    const x = evt.clientX - rect.left
    start = x;
    setSelectionStart(x * px2x)
    return false;
  }
  function mousemove(evt) {
    if (!evt.buttons) start = null;
    if (start) {
      const rect = ui.getBoundingClientRect()
      const x = evt.clientX - rect.left
      setSelectionEnd(x * px2x)
    }
  }
  
  
  let selectionStartRect, selectionEndRect;
  const px2x = data.length * 1.0 / width;
  const x2px = width * 1.0 / data.length;
  
  function setSelectionStart(start) {
    selectionStart = start;
    selectionStartRect.setAttribute("width", start*x2px)
    notifyInput()
  }
  
  function setSelectionEnd(end) {
    selectionEnd = end;
    selectionEndRect.setAttribute("x", end*x2px)
    notifyInput()
  }
  const value = {
    selectionStart, selectionEnd,
    setSelectionStart, setSelectionEnd
  };
  
  function notifyInput() {
    value.selectionStart = selectionStart;
    value.selectionEnd = selectionEnd;
    ui.dispatchEvent(new CustomEvent("input"));
  }
  
  const overlay = svg`<svg
      viewBox="0 0 ${width} ${height}"
      width="${width}px"
      height="${height}px"
      preserveAspectRatio="none"
      fill="rgba(0, 0, 0, 0.3)"
      stroke="none"
      style="position: absolute"
    >
    <rect class="wselect-start"
          x="0"
          width=${selectionStart*x2px}
          height=${height} />
    
    <rect class="wselect-end"
          x=${selectionEnd * x2px}
          width=${width}
          height=${height} />
  </svg>`
  
  const ui = html`<span>
    ${overlay}
    ${waveform}
  </span>`
  selectionStartRect = ui.querySelector(".wselect-start");
  selectionEndRect = ui.querySelector(".wselect-end");
  
  ui.addEventListener('mousedown', mousedown);
  document.addEventListener('mousemove', mousemove);
  
  invalidation.then(() => {
    ui.removeEventListener('mousedown', mousedown);
    document.removeEventListener('mousemove', mousemove);
  })
  ui.value = value;
  return ui;
}
)}

function _range(){return(
(start, stop, step) => Array(Math.floor((stop - start) / step + 1 + step * 0.001)).fill(0).map((_, i) => start + i * step)
)}

function _webaudioPolyfill(require,html)
{
  (function() {
    return function() {
        return function e(t, r, o) {
            function n(a, u) {
                if (!r[a]) {
                    if (!t[a]) {
                        var f = "function" == typeof require && require;
                        if (!u && f) return f(a, !0);
                        if (i) return i(a, !0);
                        var c = new Error("Cannot find module '" + a + "'");
                        throw c.code = "MODULE_NOT_FOUND", c
                    }
                    var s = r[a] = {
                        exports: {}
                    };
                    t[a][0].call(s.exports, function(e) {
                        return n(t[a][1][e] || e)
                    }, s, s.exports, e, t, r, o)
                }
                return r[a].exports
            }
            for (var i = "function" == typeof require && require, a = 0; a < o.length; a++) n(o[a]);
            return n
        }
    }()({
        1: [function(e, t, r) {
            ! function() {
                "use strict";
                var e = window.AudioContext = window.AudioContext || window.webkitAudioContext,
                    t = e.prototype;
                Object.defineProperties(t, {
                    createGain: {
                        value: t.createGain || t.createGainNode
                    },
                    createDelay: {
                        value: t.createDelay || t.createDelayNode
                    },
                    createScriptProcessor: {
                        value: t.createScriptProcessor || t.createJavaScriptNode
                    },
                    // Added in @tomlarkworthy/audio-inputs
                    decodeAudioData: {
                      value: window.webkitAudioContext ? function(raw) {
                        return this.createBuffer(raw, 1);
                      }: t.decodeAudioData
                    },
                });
                var r = new e,
                    o = r.createOscillator().constructor.prototype,
                    n = r.createBufferSource().constructor.prototype,
                    i = r.createGain().gain.constructor.prototype;
                Object.defineProperties(o, {
                    setPeriodicWave: {
                        value: o.setPeriodicWave || o.setWaveTable
                    },
                    start: {
                        value: o.start || o.noteOn
                    },
                    stop: {
                        value: o.stop || o.noteOff
                    }
                }), Object.defineProperties(n, {
                    start: {
                        value: n.start || function() {
                            return arguments.length > 1 ? n.noteGrainOn.apply(this, arguments) : n.noteOn.apply(this, arguments)
                        }
                    },
                    stop: {
                        value: n.stop || n.noteOff
                    }
                }), Object.defineProperties(i, {
                    setTargetAtTime: {
                        value: i.setTargetAtTime || i.setTargetValueAtTime
                    }
                })
            }()
        }, {}]
    }, {}, [1])(1)
})();
  return html`inline <a href="https://www.npmjs.com/package/audio-context-polyfill">audio-context-polyfill</a>`
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Crash-Cymbal-1.wav", {url: new URL("./files/b42a1bfced820d4a041d82ee58f2e5bb0a104e223b9127ada9504ea5cfecb10a358ece0037b5fe0c491e744a0a196527fc116c328ee6618c07d5fe0ad390ffc7", import.meta.url), mimeType: "audio/vnd.wave", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof manual")).define("viewof manual", ["sample","audioContext","FileAttachment"], _manual);
  main.variable(observer("manual")).define("manual", ["Generators", "viewof manual"], (G, _) => G.input(_));
  main.variable(observer()).define(["manual","audioContext"], _4);
  main.variable(observer("viewof cymbal")).define("viewof cymbal", ["sample","audioContext","FileAttachment"], _cymbal);
  main.variable(observer("cymbal")).define("cymbal", ["Generators", "viewof cymbal"], (G, _) => G.input(_));
  main.variable(observer()).define(["cymbal"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("sample")).define("sample", ["webaudioPolyfill","Range","invalidation","knob","waveformSelect","html"], _sample);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["writable_demo","now"], _10);
  main.variable(observer("audioContext")).define("audioContext", _audioContext);
  main.variable(observer("viewof writable_demo")).define("viewof writable_demo", ["sample","audioContext","FileAttachment"], _writable_demo);
  main.variable(observer("writable_demo")).define("writable_demo", ["Generators", "viewof writable_demo"], (G, _) => G.input(_));
  main.variable(observer()).define(["writable_demo"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof volume")).define("viewof volume", ["knob"], _volume);
  main.variable(observer("volume")).define("volume", ["Generators", "viewof volume"], (G, _) => G.input(_));
  main.variable(observer("knob")).define("knob", ["width","invalidation","svg","range"], _knob);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof waveform")).define("viewof waveform", ["waveformSelect","FileAttachment"], _waveform);
  main.variable(observer("waveform")).define("waveform", ["Generators", "viewof waveform"], (G, _) => G.input(_));
  main.variable(observer("waveformSelect")).define("waveformSelect", ["seriesDensity","densityPlot","svg","html","invalidation"], _waveformSelect);
  main.variable(observer("range")).define("range", _range);
  const child1 = runtime.module(define1);
  main.import("densityPlot", child1);
  main.import("seriesDensity", child1);
  main.import("cacheInterpolator", child1);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  main.import("svg", child2);
  const child3 = runtime.module(define3);
  main.import("Range", child3);
  main.variable(observer("webaudioPolyfill")).define("webaudioPolyfill", ["require","html"], _webaudioPolyfill);
  return main;
}
