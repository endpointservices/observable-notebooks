import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./84e66f78139ac354@830.js";
import define3 from "./3d9d1394d858ca97@556.js";
import define4 from "./ab3e70b29c480e6d@83.js";
import define5 from "./a2e58f97fd5e8d7c@756.js";
import define6 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`# UI Animation

In this notebook there are a few UI components to help you record, playback and edit UI interactions as animations.

1. an _animation_ view that represents an animation curve as interpolated keyframes, and a UI to edit it.
- a player that automates [Inputs](https://observablehq.com/@observablehq/inputs) using an _animation_.
  - a record button that polls a _readFn_ and stores the data into an _animation_
  - a play button that reads the _animation_ and pushed the values into a _writeFn_
  - A button to export the keyframes as a JSON

The workflow goal is to allow you to build an interesting manually configured notebook with Inputs, like you do today, then later animate the manual controls for a cool demo. Checkout [animated Kirigami](https://observablehq.com/@tomlarkworthy/animated-kirigami) for a substantial demo developed this way.

_sidenote_: At a meta level I think a powerful idiom to have UI components composing and collaborating. We are trying to figure out what are the rules to allow composition [here](https://observablehq.com/@tomlarkworthy/ui-linter).

_animation_ is designed to compose with peer UI components. So if you think a feature is missing, perhaps you can add it without modifying _animation_. E.g. to fine tune animation parameters, you can write new keyframes with a different UI.
 
~~~js
// Import
import {animation, player} from '@tomlarkworthy/animation'

// In other cells
viewof animation1 = animation({})
viewof player1 = player({
  animation: viewof animation1
})
~~~

Contributors:
- Tom Larkworthy
- Job van der Zwan
- Fil
`
)}

function _2(md){return(
md`## Demo Key Frame Editor

Here we drive a system directly by reading from an _animation_. Which we can edit in realtime.
`
)}

function* _animationLoop($0,svg)
{
  let t = 0;
  do {
    t = (t + 0.01) % $0.value.tRange[1];
    const angle = 2 * Math.PI * $0.value.interpolate("angle", t)
    const r = $0.value.interpolate("radius", t)
    $0.value = {
      ...$0.value,
      cursor: t
    }
    const path = "M" + Array.from({length: 500}, (_, t) => {
      t = ($0.value.tRange[1]) * (t/500);
      const angle = 2 * Math.PI * ($0.value.interpolate("angle", t));
      const r = $0.value.interpolate("radius", t)
      return [Math.sin(angle) * r, -Math.cos(angle) * r];
    }).join("L");
  
    yield svg`<svg viewBox="-1.1 -1.1 2.2 2.2" width="200px" height="200px">
      <path d="${path}" fill="none" stroke="black" stroke-width="0.005" />
      <circle r="0.1" cx=${Math.sin(angle) * r} cy=${-Math.cos(angle) * r} />

    </svg>`
  } while(true)
}


function _4(demo1){return(
demo1
)}

function _5(md){return(
md`
SHIFT + Click, or double click, to delete a keyframe.`
)}

function _demo1(animation){return(
animation({
  tRange: [0, 4],
  tStep: 0.01,
  pixelsPerT: 200,
  options: {
    radius: {
      color: "blue"
    }
  },
  keyFrames: {
    angle: [
      {t: 0, y: 0},
      {t: 0.7557499408721924, y: 0.7339999973773956},
      {t: 1.4014999866485596, y: 0.9020000249147415},
      {t: 1.963249921798706, y: 0.6739999949932098},
      {t: 2.241499900817871, y: 0.24799996614456177},
      {t: 3.0919997692108154, y: 0},
      {t: 3.097249746322632, y: 1},
      {t: 4, y: 0}
    ],
    radius: [
      {t: 0, y: 0.1},
      {t: 1, y: 0.2},
      {t: 4, y: 1}
    ]
  }
})
)}

function _ui_automation(md){return(
md`## UI automation of 3rd party UI components

Here our system is driven by manual controls, but we are also able to capture, edit and playback our manual renditions into an external _animation_ component. For a more substantial example check out [animated Kirigami](https://observablehq.com/@tomlarkworthy/animated-kirigami).

This enables a nice development workflow where you don't need to worry about animation until the end. I personally find developing with manual controls very productive, as I can use the controls to position the model in the interesting part of the development frontier. 

Once I have developed the model I might want to animate it. In which case, I want to reuse those manual controls I crafted earlier.

`
)}

function _8(svg,controls){return(
svg`<svg viewBox="-1.1 -1.1 2.2 2.2" width="200px" height="200px">
  <circle
    r="0.1"
    cx=${Math.sin(controls.angle * Math.PI * 2) * controls.radius}
    cy=${-Math.cos(controls.angle * Math.PI * 2) * controls.radius} />
</svg>`
)}

function _9(md){return(
md`Try the manual controls`
)}

function _controls(Range,html)
{
  // mbostock & mootari thought of this see https://github.com/observablehq/inputs/issues/73
  const a = Range([0, 1], {value: 0.1, label: "angle"});
  const r = Range([0, 1], {value: 0.8, label: "radius"});
  return Object.defineProperty(html`${[a, r]}`, "value", {
    get() {
      return {
        angle: a.value,
        radius: r.value,
      };
    },
    set({angle: _a, radius: _r}) {
      if (_a !== undefined) a.value = _a;
      if (_r !== undefined) r.value = _r;
    }
  });
}


function _11(md){return(
md`Hit record and play with the manaul controls`
)}

function _demo2(player,$0,$1,invalidation)
{
  const ui = player({
    state: "playing",
    animation: $0,
    readFn: () => $1.value,
    writeFn: value => {
      $1.value = value;
      $1.dispatchEvent(new CustomEvent('input'));
    }
  });

  invalidation.then(() => (ui.state = "stopped")); // TODO: does not work, need a better way to control player
  return ui;
}


function _13(demo2){return(
demo2
)}

function _animation2(animation){return(
animation({
  tRange: [0, 5.764],
  keyFrames: {
    default: [
      {
        t: 0,
        y: 0
      },
      {
        t: 1,
        y: 1
      }
    ],
    angle: [
      {
        t: 0,
        y: 1
      },
      {
        t: 1.0150000000000001,
        y: 0.957966245621484
      },
      {
        t: 1.031,
        y: 0.919966033329795
      },
      {
        t: 1.048,
        y: 0.887591550790787
      },
      {
        t: 1.065,
        y: 0.846831546544953
      },
      {
        t: 1.081,
        y: 0.797579874747904
      },
      {
        t: 1.098,
        y: 0.748328202950854
      },
      {
        t: 1.115,
        y: 0.699182676998196
      },
      {
        t: 1.1320000000000001,
        y: 0.650037151045537
      },
      {
        t: 1.149,
        y: 0.596115062095319
      },
      {
        t: 1.165,
        y: 0.54686339029827
      },
      {
        t: 1.181,
        y: 0.49718713512366
      },
      {
        t: 1.198,
        y: 0.460036089587093
      },
      {
        t: 1.215,
        y: 0.410359834412483
      },
      {
        t: 1.232,
        y: 0.365778579768602
      },
      {
        t: 1.248,
        y: 0.320878887591551
      },
      {
        t: 1.2650000000000001,
        y: 0.288185967519372
      },
      {
        t: 1.281,
        y: 0.247319817429148
      },
      {
        t: 1.298,
        y: 0.194883770300393
      },
      {
        t: 1.314,
        y: 0.169833351024307
      },
      {
        t: 1.332,
        y: 0.150833244878463
      },
      {
        t: 1.349,
        y: 0.137671160174079
      },
      {
        t: 1.365,
        y: 0.129922513533595
      },
      {
        t: 1.3820000000000001,
        y: 0.124190637936525
      },
      {
        t: 1.3980000000000001,
        y: 0.118564908183845
      },
      {
        t: 1.415,
        y: 0.114955949474578
      },
      {
        t: 1.432,
        y: 0.113151470119945
      },
      {
        t: 1.448,
        y: 0.111559282454092
      },
      {
        t: 1.465,
        y: 0.109860948943849
      },
      {
        t: 1.482,
        y: 0.102112302303365
      },
      {
        t: 1.497,
        y: 0.0963804267062944
      },
      {
        t: 1.5150000000000001,
        y: 0.0836429253794714
      },
      {
        t: 1.532,
        y: 0.067933340409723
      },
      {
        t: 1.548,
        y: 0.0400169833351024
      },
      {
        t: 1.565,
        y: 0.0307822948731557
      },
      {
        t: 1.581,
        y: 0.0179386477019425
      },
      {
        t: 1.598,
        y: 0.00382125039804692
      },
      {
        t: 1.615,
        y: 0.000212291688780384
      },
      {
        t: 1.6480000000000001,
        y: 0
      },
      {
        t: 4.131,
        y: 0.00498885468633903
      },
      {
        t: 4.148,
        y: 0.0274917736970598
      },
      {
        t: 4.165,
        y: 0.0637936524785055
      },
      {
        t: 4.18,
        y: 0.117821887273113
      },
      {
        t: 4.198,
        y: 0.171743976223331
      },
      {
        t: 4.215,
        y: 0.259951172911581
      },
      {
        t: 4.231,
        y: 0.313873261861798
      },
      {
        t: 4.248,
        y: 0.355800870395924
      },
      {
        t: 4.265,
        y: 0.396136291264197
      },
      {
        t: 4.281,
        y: 0.432544315890033
      },
      {
        t: 4.297,
        y: 0.472879736758306
      },
      {
        t: 4.315,
        y: 0.517673283090967
      },
      {
        t: 4.331,
        y: 0.562466829423628
      },
      {
        t: 4.348,
        y: 0.616388918373846
      },
      {
        t: 4.364,
        y: 0.670417153168453
      },
      {
        t: 4.381,
        y: 0.734316951491349
      },
      {
        t: 4.398,
        y: 0.779853518734742
      },
      {
        t: 4.414,
        y: 0.828999044687401
      },
      {
        t: 4.431,
        y: 0.869440611400064
      },
      {
        t: 4.447,
        y: 0.901708948094682
      },
      {
        t: 4.464,
        y: 0.934083430633691
      },
      {
        t: 4.481,
        y: 0.962742808619043
      },
      {
        t: 4.498,
        y: 0.991402186604394
      },
      {
        t: 4.514,
        y: 1
      },
      {
        t: 5.764,
        y: 1
      },
      {
        t: 5.764,
        y: 1
      }
    ],
    radius: [
      {
        t: 0,
        y: 1
      },
      {
        t: 2.8810000000000002,
        y: 0.957541662243923
      },
      {
        t: 2.898,
        y: 0.912323532533701
      },
      {
        t: 2.914,
        y: 0.879524466617132
      },
      {
        t: 2.932,
        y: 0.839082899904469
      },
      {
        t: 2.948,
        y: 0.78983122810742
      },
      {
        t: 2.965,
        y: 0.743339348264515
      },
      {
        t: 2.982,
        y: 0.717864345610869
      },
      {
        t: 2.998,
        y: 0.692813926334784
      },
      {
        t: 3.0140000000000002,
        y: 0.667338923681138
      },
      {
        t: 3.031,
        y: 0.648763400912854
      },
      {
        t: 3.048,
        y: 0.636025899586031
      },
      {
        t: 3.064,
        y: 0.623182252414818
      },
      {
        t: 3.081,
        y: 0.610444751087995
      },
      {
        t: 3.097,
        y: 0.594735166118247
      },
      {
        t: 3.115,
        y: 0.576159643349963
      },
      {
        t: 3.1310000000000002,
        y: 0.554293599405583
      },
      {
        t: 3.148,
        y: 0.532427555461204
      },
      {
        t: 3.165,
        y: 0.507377136185118
      },
      {
        t: 3.182,
        y: 0.476276403778792
      },
      {
        t: 3.197,
        y: 0.460566818809044
      },
      {
        t: 3.215,
        y: 0.452712026324169
      },
      {
        t: 3.23,
        y: 0.449209213459293
      },
      {
        t: 3.248,
        y: 0.445600254750027
      },
      {
        t: 3.265,
        y: 0.444008067084174
      },
      {
        t: 3.298,
        y: 0.442309733573931
      },
      {
        t: 3.331,
        y: 0.440717545908078
      },
      {
        t: 3.347,
        y: 0.437214733043201
      },
      {
        t: 3.365,
        y: 0.431589003290521
      },
      {
        t: 3.38,
        y: 0.427661607048084
      },
      {
        t: 5.764,
        y: 1
      }
    ]
  },
  activeSeries: "radius",
  activeKeyframe: {
    t: 5.764,
    y: 1
  },
  cursor: 0.7460000000000004,
  pixelsPerT: 50,
  dims: ["angle", "radius"]
})
)}

function _15(animation2){return(
animation2
)}

function _16(md){return(
md`
---
## Implementation`
)}

function _17(signature,animation){return(
signature(animation)
)}

function _animation(linearInterpolate,reconcile,clamp,svg,range,oid){return(
function animation({
  tRange = [0, 1],           // Time range of animation
  pixelsPerT = 200,          // How the time dimension is scaled
  activeSeries = undefined,  // Which series is currently selected
  activeKeyframe = undefined,// Which keyframe is currently selected
  cursor = undefined,        // Visual positional indicator of the current time
  dims = undefined,          // The order of timeseries names (e.g. ["default"])
  keyFrames = {              // Keyframe data
    default: [{              // Indexed by a series name
      t: 0,                  // Position in time
      y: 0                   // Y position
    }, {
      t: 1,
      y: 1    
    }],
  },
  options = {                // Options indexed by series name (e.g. color)
  },
  tStep = 0.01               // Granularity of interpolation (visualization only)
} = {}) {
  const session = Math.random().toString(36).substr(2, 9);
  let ui;
  const padding = 0.1;
  let keys = dims || Object.keys(keyFrames);
  if (activeSeries === undefined) activeSeries = keys[0];
  keys.forEach(key => {
    options[key] = options[key] || {};
    keyFrames[key] = keyFrames[key] || [{
      t: tRange[0], y: 0
    }, {
      t: tRange[1], y: 1
    }];
  });
  
  const interpolate = (key, t) => {
    const keyFrame = keyFrames[key];
    if (!keyFrame) return undefined;
    if (t < keyFrame[0].t) return undefined;
    let current = 0;
    while (t >= keyFrame[current].t) {
      current++;
      if (current >= keyFrame.length) return undefined;
    }
    // interpolation
    return linearInterpolate(
      keyFrame[current-1].y, 
      keyFrame[current].y,
      keyFrame[current-1].t, 
      keyFrame[current].t,
      t
    );
  }
  
  const interpolateAll = (t) => {
    const result = {}
    keys.forEach(key => result[key] = interpolate(key, t))
    return result;
  }
  
  function pointsToPath(array) {
    return array.reduce(
      (acc, x) => {
        if (x[0] && x[1]) {
          if (!acc.prev) {
            acc.cmds.push(`M ${x[0].toFixed(3)} ${x[1].toFixed(3)}`)
          } else if (x[1]) {
            acc.cmds.push(`L ${x[0].toFixed(3)} ${x[1].toFixed(3)}`)
          }
          acc.prev = x;
        }
        return acc;
      }, {
        prev: undefined,
        cmds: []
      }
    ).cmds.join(" ")
  }
  
  
  function evtCoords(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var cursorpt = pt.matrixTransform(ui.getScreenCTM().inverse());
    return [cursorpt.x, 1 - cursorpt.y]
  }
  
  function deleteKeyFrame(key, keyframe) {
    const index = keyFrames[key].findIndex(kf => kf === keyframe);
    keyFrames[key].splice(index, 1);
    notifyChange();
  }
  
  // For when someone touches an anchor point
  function controlMousedown(key, keyframe, evt) {
    let start = evtCoords(evt);
    if (evt.shiftKey) {
      // DELETE
      deleteKeyFrame(key, keyframe);
      return;
    }
      
    let initial = JSON.parse(JSON.stringify(keyframe));
    
    function controlMouseup(key, keyframe, evt) {
      document.removeEventListener('pointermove', mousemoveHandler);
      document.removeEventListener('pointerup', mouseupHandler);
    }
    
    function controlMousemove(key, keyframe, evt) {
      const current = evtCoords(evt)
      keyframe.t = initial.t + (current[0] - start[0]);
      keyframe.y = initial.y + (current[1] - start[1]);
      notifyChange();
    }
    
    let mousemoveHandler = controlMousemove.bind(null , key, keyframe);
    let mouseupHandler = controlMouseup.bind(null, key, keyframe);
    document.addEventListener('pointermove', mousemoveHandler);
    document.addEventListener('pointerup', mouseupHandler);   
    activeKeyframe = keyframe;
    activeSeries = key;
    notifyChange();
  }
  
  function backgroundMousedown(evt) {
    let start = evtCoords(evt);
    let keyframe = {};
    keyFrames[activeSeries].push(keyframe);
    activeKeyframe = keyframe;
    function sync(coords) {
      keyframe.t = coords[0];
      keyframe.y = coords[1];
      notifyChange();
    }
    
    function backgroundMouseup(evt) {
      document.removeEventListener('pointermove', mousemoveHandler);
      document.removeEventListener('pointerup', mouseupHandler);
    }
    
    function backgroundMousemove(evt) {
      const current = evtCoords(evt);
      console.log(current)
      sync(current);
    }
    
    let mousemoveHandler = backgroundMousemove;
    let mouseupHandler = backgroundMouseup;
    document.addEventListener('pointermove', mousemoveHandler);
    document.addEventListener('pointerup', mouseupHandler);
    
    sync(start);
  }
  
  const notifyChange = () => {
    ui.dispatchEvent(new CustomEvent("input"));
    reconcile(ui, computeDOM());
  }
  
  function computeDOM() {
    // Order keyframes by time
    keys.forEach(key => keyFrames[key].sort((a, b) => a.t - b.t));
    // enforce constraints
    
    // Ensure keyframes in bounds
    keys.forEach(key => keyFrames[key].forEach(fk => {
      fk.t = clamp(fk.t, tRange)
      fk.y = clamp(fk.y, [0, 1])
    }));
    
    // Ensure first and last at edge
    keys.forEach(key => {
      keyFrames[key][0].t = tRange[0];
      keyFrames[key][keyFrames[key].length - 1].t = tRange[1];
    });
    
    return svg`<svg
        style="touch-action: none;"
        id=${session}
        viewbox="${tRange[0] - padding} ${-padding} ${tRange[1] - tRange[0] + 2 * padding} ${1 + padding*2}"
        width="${pixelsPerT * (tRange[1] - tRange[0] + 2 * padding)}px"
        height="200px"
        preserveAspectRatio="none"
        stroke-width="0.01"
      >
      <g transform="translate(0,1)">
      <g transform="scale(1,-1)">

        <rect id=${"b-" + session}
              onpointerdown=${backgroundMousedown}
              x=${tRange[0]}
              width=${tRange[1] - tRange[0]}
              height="1"
              stroke="black"
              fill="white"/>
        ${cursor ? svg`<line x1=${cursor} x2=${cursor} y2="1" stroke="black" stroke-width="0.005"/>`:null}
        ${/* The interpolated motion curve for each key */null}
        ${keys.map(key => svg`<path id=${key + "ts" + session }
            stroke=${options[key].color || "red"}
            fill="none"
            stroke-width=${key === activeSeries ? 0.02: 0.01}
            d="${pointsToPath(range(tRange[0], tRange[1], tStep).map(t => [t, interpolate(key, t)]))}"
            style="pointer-events: none"
          />`)}

        ${/* The keyframes each key */null}
        ${keys.map(key => svg`
          ${keyFrames[key].map((kf, idx) => svg`<g id=${oid(kf) + session} transform="translate(${kf.t})"
                   stroke="black"
                   fill=${kf === activeKeyframe ? options[key].color || "red" : "white"}>
              <circle
                id=${"c-" + oid(kf) + session}
                cy=${kf.y} r="0.05"
                onpointerdown=${controlMousedown.bind(null, key, kf)} 
                ondblclick=${deleteKeyFrame.bind(null, key, kf)}
              />
                
            </g>`)}
        `)}
      </g>
      </g>
      </svg>`
  }
  ui = computeDOM();
  
  const pt = ui.createSVGPoint();

  Object.defineProperty(ui, "value", {
    get: () => ({
      tRange, keyFrames, activeSeries, activeKeyframe, cursor, pixelsPerT, dims: keys,
      interpolate, interpolateAll
    }),
    set: (value) => {
      ({
        tRange, keyFrames, activeSeries, activeKeyframe, cursor, pixelsPerT, dims
      } = value);
      notifyChange()
    }
  });
  
  return ui;
}
)}

function _19(signature,player){return(
signature(player)
)}

function _player(copy,html,invalidation){return(
function player({
  animation = undefined, // The *view* of an animation, e.g. viewof animation({...})
  readFn = undefined, // () => ({...}) poll function that returns a keyFrame, used to record
  writeFn = undefined, // ({..}) => nil callback used to playback a recording
  state = "stopped", // state of the recorder (stopped, playing, recording)
  invalidationPromise = undefined // You should pass callers invalidation promise
} = {}) {
  const initialState = state;
  const value = Object.defineProperty({}, 'state', {
    enumerable: true,
    get: () => state,
    set: newState => {
      if (state == "stopped" && newState == "recording") {
        record();
      } else if (state == "stopped" && newState == "playing") {
        play();
      }
      state = newState;
    }
  });

  function record() {
    if (recordButton.innerHTML === "stop") {
      state = "stopped";
      return;
    }
    state = "recording";
    recordButton.innerHTML = "stop";
    let start_t = Date.now();

    const keyFrames = animation.value.keyFrames;
    let latest = readFn();
    Object.keys(latest).forEach(field => {
      keyFrames[field] = [
        {
          t: 0,
          y: latest[field]
        },
        {
          t: 0,
          y: latest[field]
        }
      ];
    });

    const recordFrame = () => {
      const t = (Date.now() - start_t) * 0.001;
      const previous = { ...latest };
      latest = readFn();

      Object.keys(latest).forEach(field => {
        // Always update the last once
        keyFrames[field][keyFrames[field].length - 1].t = t;
        keyFrames[field][keyFrames[field].length - 1].y = latest[field];

        if (latest[field] !== previous[field] || state !== "recording") {
          // If we have a change create a add another data point
          keyFrames[field].push({
            t,
            y: latest[field]
          });
        }
      });

      animation.value = {
        ...animation.value,
        tRange: [0, t],
        keyFrames: keyFrames
      };

      if (state === "recording") {
        requestAnimationFrame(recordFrame);
      } else {
        recordButton.innerHTML = "record";
      }
    };
    requestAnimationFrame(recordFrame);
  }

  function play() {
    if (playButton.innerHTML === "stop") {
      state = "stopped";
      return;
    }
    state = "playing";
    playButton.innerHTML = "stop";
    let start_t = Date.now();

    const playFrame = () => {
      const t =
        ((Date.now() - start_t) * 0.001) %
        (animation.value.tRange[1] - animation.value.tRange[0]);
      animation.value = {
        ...animation.value,
        cursor: t
      };
      writeFn(animation.value.interpolateAll(t));

      if (state === "playing") {
        requestAnimationFrame(playFrame);
      } else {
        playButton.innerHTML = "play";
      }
    };
    requestAnimationFrame(playFrame);
  }

  async function copyToClipboard() {
    copy(JSON.stringify(animation.value, null, 2));
    copyButton.innerHTML = "copied";
    await new Promise(r => setTimeout(r, 1000));
    copyButton.innerHTML = "copy to clipboard";
  }

  const ui = html`<div style="display:flex">
    ${
      writeFn
        ? html`<button
      class="play-btn"
      onclick=${evt => {
        value.state = evt.target.innerHTML === "play" ? "playing" : "stopped";
        ui.dispatchEvent(new CustomEvent('input'));
      }}
    >play</button>`
        : null
    }
    ${
      readFn
        ? html`<button
      class="record-btn"
      onclick= ${evt => {
        value.state =
          evt.target.innerHTML === "record" ? "recording" : "stopped";
        ui.dispatchEvent(new CustomEvent('input'));
      }}
    >record</button>`
        : null
    }
    <button
      class="copy-btn"
      onclick=${() => copyToClipboard()}
    >copy to clipboard
    </button>
  </div>`;

  let recordButton = ui.querySelector(".record-btn");
  let playButton = ui.querySelector(".play-btn");
  let copyButton = ui.querySelector(".copy-btn");

  const invalidate = () => (state = "stopped");
  invalidation.then(invalidate);
  if (invalidationPromise) invalidationPromise.then(invalidate);

  Object.defineProperty(ui, 'value', {
    get: () => value,
    set: newValue => (value.state = newValue.state)
  });
  value.state = "stopped";
  value.state = initialState;

  return ui;
}
)}

function _21(md){return(
md`---
### Helpers`
)}

function _oid(){return(
(() => {
    let currentId = 0;
    const map = new WeakMap();

    return (object) => {
        if (!map.has(object)) {
            map.set(object, ++currentId);
        }

        return map.get(object);
    };
})()
)}

function _linearInterpolate(){return(
(y0, y1, x0, x1, x) => 
  y0 + (x - x0) * (y1 - y0) / (x1 - x0)
)}

function _range(){return(
(start, stop, step) => Array(Math.floor((stop - start) / step + 1 + step * 0.001)).fill(0).map((_, i) => start + i * step)
)}

function _clamp(){return(
(x, range) => Math.min(range[1], Math.max(range[0], x))
)}

function _26(md){return(
md`### Imports`
)}

function _33(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("animationLoop")).define("animationLoop", ["viewof demo1","svg"], _animationLoop);
  main.variable(observer()).define(["demo1"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof demo1")).define("viewof demo1", ["animation"], _demo1);
  main.variable(observer("demo1")).define("demo1", ["Generators", "viewof demo1"], (G, _) => G.input(_));
  main.variable(observer("ui_automation")).define("ui_automation", ["md"], _ui_automation);
  main.variable(observer()).define(["svg","controls"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof controls")).define("viewof controls", ["Range","html"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof demo2")).define("viewof demo2", ["player","viewof animation2","viewof controls","invalidation"], _demo2);
  main.variable(observer("demo2")).define("demo2", ["Generators", "viewof demo2"], (G, _) => G.input(_));
  main.variable(observer()).define(["demo2"], _13);
  main.variable(observer("viewof animation2")).define("viewof animation2", ["animation"], _animation2);
  main.variable(observer("animation2")).define("animation2", ["Generators", "viewof animation2"], (G, _) => G.input(_));
  main.variable(observer()).define(["animation2"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["signature","animation"], _17);
  main.variable(observer("animation")).define("animation", ["linearInterpolate","reconcile","clamp","svg","range","oid"], _animation);
  main.variable(observer()).define(["signature","player"], _19);
  main.variable(observer("player")).define("player", ["copy","html","invalidation"], _player);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("oid")).define("oid", _oid);
  main.variable(observer("linearInterpolate")).define("linearInterpolate", _linearInterpolate);
  main.variable(observer("range")).define("range", _range);
  main.variable(observer("clamp")).define("clamp", _clamp);
  main.variable(observer()).define(["md"], _26);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  main.import("svg", child1);
  const child2 = runtime.module(define2);
  main.import("reconcile", child2);
  const child3 = runtime.module(define3);
  main.import("signature", child3);
  const child4 = runtime.module(define4);
  main.import("copy", child4);
  const child5 = runtime.module(define5);
  main.import("Range", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _33);
  return main;
}
