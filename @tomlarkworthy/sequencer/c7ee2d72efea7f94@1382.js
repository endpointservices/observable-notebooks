import define1 from "./e7c3854dfc5e08c3@1245.js";
import define2 from "./f92778131fd76559@1208.js";
import define3 from "./bd9d083ddbe7ce90@1105.js";
import define4 from "./653c46ed55693b1f@674.js";

function _1(md){return(
md`# Sequencer

The sequence connects to the drum pads which connect to the samples.

You can mess with the speed of samples, hit the drum pads manually and play the sequencer program in real time!
`
)}

function _initialProgram(Inputs)
{
  const program = `{
  "triggers": {
    "kick01": "[0,20,32,52,60]",
    "clap01": "[8,24,40,56]",
    "snap02": "[0,2,3]",
    "ohh02": "[8,24,40,56]",
    "chh05": "[0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124]",
    "c": "[0,16]",
    "f": "[24,56]",
    "g": "[48]"
  }
}`;
  const decoded = JSON.parse(program, (key, value) =>
    typeof value === "string" ? JSON.parse(value) : value
  );

  const programView = Inputs.input(decoded);
  return programView;
}


function _3(html,program){return(
html`<h3>Current Program</h3><pre>${JSON.stringify(
  program,
  (k, v) => (v instanceof Array ? JSON.stringify(v) : v),
  2
)}</pre>`
)}

function _play(Inputs,$0,Event,invalidation)
{
  let hasPlayed = false;
  const ui = Inputs.button("start/stop (spacebar)", {
    reduce: (play) => {
      if (!hasPlayed) {
        hasPlayed = true;
        $0.value.playing = true;
      }
      return !play;
    }
  });
  const keyboardListener = (e) => {
    if (e.keyCode == 32) {
      ui.value = !ui.value;
      ui.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  document.addEventListener("keyup", keyboardListener);
  invalidation.then(() =>
    document.removeEventListener("keyup", keyboardListener)
  );
  return ui;
}


function _bpm(Inputs){return(
Inputs.range([80, 240], { label: "BPM", value: 175, step: 1 })
)}

function _selectedSample(juice,Inputs){return(
juice(Inputs.select, {
  label: "[1].label",
  options: "[0]", // "options" is first arg (index 0) of Inputs.select
  result: "[1].value" // "result" can be set in the options.value, options being the 2nd arg (index 0)
})([], {
  label: "select sample (DPM coords)"
})
)}

function _buttons64(fastBtn,grid)
{
  const btns = [];
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      const button = fastBtn();
      button.i = i;
      button.j = j;
      btns.push(button);
    }
  }

  return grid({
    elements: Object.fromEntries(
      btns.map((btn, i) => [
        `${i}`,
        {
          x: btn.i,
          y: btn.j,
          element: btn
        }
      ])
    )
  });
}


function _buttons4x4(fastBtn,grid)
{
  const btns = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const button = fastBtn({ label: [i, j], size: "large" });
      button.i = i;
      button.j = j;
      btns.push(button);
    }
  }

  return grid({
    elements: {
      ...Object.fromEntries(
        btns.map((btn) => [
          `${btn.i} ${btn.j}`,
          {
            x: btn.i * 3,
            y: btn.j * 3,
            h: 3,
            w: 3,
            element: btn
          }
        ])
      )
    }
  });
}


async function _clap02(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.4,
  speed: 3,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Clap02.wav").arrayBuffer()
})
)}

async function _kick01(sample,audioContext,FileAttachment){return(
sample({
  volume: 0.1,
  speed: 1.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Kick01.wav").arrayBuffer()
})
)}

async function _clap01(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.4,
  speed: 0.9,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Clap01.wav").arrayBuffer()
})
)}

async function _snap02(sample,audioContext,FileAttachment){return(
sample({
  speed: 1.6,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Snap02.wav").arrayBuffer()
})
)}

async function _ohh02(sample,audioContext,FileAttachment){return(
sample({
  speed: 1.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("OHH02.wav").arrayBuffer()
})
)}

async function _chh05(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.7,
  speed: 0.7,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("CHH05.wav").arrayBuffer()
})
)}

async function _c(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.3,
  speed: 16.35 / 24.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Chord 1_G.wav").arrayBuffer()
})
)}

async function _f(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.3,
  speed: 21.83 / 24.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Chord 1_G.wav").arrayBuffer()
})
)}

async function _g(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.3,
  speed: 1,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Chord 1_G.wav").arrayBuffer()
})
)}

function _wiring(connect,$0,$1,invalidation,$2,$3,$4,$5,$6,$7,$8)
{
  connect(
    $0,
    $1,
    {
      label: "kick01",
      color: "#FFEE65",
      coord: [0, 0]
    },
    invalidation
  );
  connect(
    $2,
    $1,
    {
      label: "clap01",
      color: "#FFEE65",
      coord: [1, 0]
    },
    invalidation
  );
  connect(
    $3,
    $1,
    {
      label: "snap02",
      color: "#46FF72",
      coord: [2, 0]
    },
    invalidation
  );
  connect(
    $4,
    $1,
    {
      label: "ohh02",
      color: "#46FF72",
      coord: [3, 0]
    },
    invalidation
  );
  connect(
    $5,
    $1,
    {
      label: "chh05",
      color: "#46FF72",
      coord: [3, 1]
    },
    invalidation
  );
  connect(
    $6,
    $1,
    {
      label: "c",
      color: "red",
      coord: [1, 2]
    },
    invalidation
  );
  connect(
    $7,
    $1,
    {
      label: "f",
      color: "red",
      coord: [2, 2]
    },
    invalidation
  );
  connect(
    $8,
    $1,
    {
      label: "g",
      color: "red",
      coord: [3, 2]
    },
    invalidation
  );
}


function _program(Inputs,initialProgram){return(
Inputs.input(initialProgram)
)}

function _syncSampleOptions(wiring,bindOneWay,$0,$1)
{
  wiring;
  bindOneWay($0.options, $1, {
    transform: (s) => Object.keys(s)
  });
}


function _21(samples){return(
samples
)}

function _syncSequencerToProgram(selectedSample,buttons64,downColor,offColor,$0,Event)
{
  console.log("syncSequencerToProgram");
  if (!selectedSample.result) return;
  const triggers = [];
  for (let t = 0; t < 64; t++) {
    if (buttons64[t].element.down ^ (buttons64[t].element.color == downColor)) {
      triggers.push(t);
      buttons64[t].element.color = downColor;
    } else {
      buttons64[t].element.color = offColor;
    }
  }
  debugger;
  // Output is derived from button states
  $0.value.triggers[selectedSample.result] = triggers;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}


function _syncInitialProgramToSequencer(syncSampleOptions,$0,$1,offColor,initialProgram,selectedSample,downColor)
{
  syncSampleOptions;
  if (!$0.value.result) return;
  console.log("syncInitialProgramToSequencer");
  // Clear all
  for (let t = 0; t < 64; t++) {
    $1.value[t].element.down = false;
    $1.value[t].element.color = offColor;
  }
  // Load selected program onto display
  initialProgram.triggers[selectedSample.result].forEach((t) => {
    $1.value[t].element.color = downColor;
  });
}


function _syncTimeToSequencer(t,$0,borderColor,nowBorderColor)
{
  if (!t) return;
  $0.value[(t - 1) % 64].element.border = borderColor;
  $0.value[t % 64].element.border = nowBorderColor;
}


function _LOOKAHEAD(){return(
4
)}

function _next(){return(
(sequence, { t = 0, lookahead = 1, steps = 64 } = {}) => {
  const result = [];
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] < t % steps) {
    } else if (sequence[i] >= (t + lookahead) % steps) {
      return result;
    } else {
      result.push(sequence[i] + Math.floor(t / steps) * steps);
    }
  }
  return result;
}
)}

async function* _t(bpm,$0,audioContext,play,Promises)
{
  let t = this || 0;
  const t_start = Date.now() - (t * (60 * 1000)) / (bpm * 8);
  $0.value = audioContext.currentTime - (t * 60) / (bpm * 8);
  while (play) {
    yield t;
    let next_t = t;
    do {
      next_t = next_t + 1;
      var next_millis = t_start + (next_t * (60 * 1000)) / (bpm * 8);
    } while (next_millis < Date.now());
    await Promises.delay(next_millis - Date.now());
    t = next_t;
  }
  return yield t;
}


function _slice(play,t,LOOKAHEAD,program,next)
{
  if (!play) {
    // This block resets the slice state when play is toggled
    return {
      t_start: t,
      t_end: t,
      frame: {}
    };
  }
  const t_start = this?.t_end || t;
  const t_end = Math.min(t + LOOKAHEAD, t_start + LOOKAHEAD); // TODO wrapping bug here
  return {
    t_start,
    t_end,
    frame: Object.fromEntries(
      Object.keys(program.triggers).map((sample) => [
        sample,
        next(program.triggers[sample], {
          t: t_start,
          lookahead: t_end - t_start
        })
      ])
    )
  };
}


function _audioStart(audioContext){return(
audioContext.currentTime
)}

function _stepToAudio($0,bpm){return(
(step) => {
  return $0.value + (step * 60) / (bpm * 8);
}
)}

function _syncSliceToDPM(slice,samples,stepToAudio,buttons4x4,$0,nowBorderColor,borderColor)
{
  Object.keys(slice.frame).map((sample) => {
    if (!samples[sample]) return;

    slice.frame[sample].forEach((step) => {
      samples[sample].value.playing = stepToAudio(step);
    });
    const dpmCord = samples[sample].dpmCord;
    if (!buttons4x4[dpmCord]) return;
    $0[dpmCord].value.element.border =
      slice.frame[sample].length > 0 ? nowBorderColor : borderColor;
  });
}


function _32(md){return(
md`#### Connect a sample to a pad`
)}

function _samples(Inputs){return(
Inputs.input({})
)}

function _34($0){return(
$0.value
)}

function _connect(offColor,$0,Event,downColor){return(
(sample, dpm, { label, coord, color } = {}, invalidation) => {
  const dpmCord = `${coord[0]} ${coord[1]}`;
  const btn = dpm[dpmCord].element;
  btn.value.color = color || offColor;
  sample.dpmCord = dpmCord;
  $0.value = { ...$0.value, [label]: sample };
  $0.dispatchEvent(new Event("input", { bubbles: true }));

  const trigger = () => {
    const down = btn.down.value;
    btn.value.color = down ? downColor : color || offColor;
    if (down) sample.value.playing = true;
  };
  btn.addEventListener("input", trigger);
  invalidation.then(() => btn.removeEventListener("input", trigger));
}
)}

function _36(md){return(
md`### FastBtn

- Multi-touch, event raised *on touch down* for lowest latency
- Reactive border color and main color
`
)}

function _37(html){return(
html`<style>
  .small {
      width: var(--gridSize);
      height: var(--gridSize);
  }
  .large {
      width: calc(var(--gridSize) * 3);
      height: calc(var(--gridSize) * 3);
  }
  .sequencer-btn {
      border-radius: 10px;
  }
</style>`
)}

function _fastBtnExample(fastBtn){return(
fastBtn()
)}

function _fastBtn(variable,offColor,borderColor,Event,view){return(
({ label = undefined, size = "small" } = {}) => {
  const labelVar = variable(label, { name: "label" });
  const colorVar = variable(offColor, { name: "color" });
  const borderVar = variable(borderColor, { name: "color" });
  const downVar = variable(false, { name: "down" });
  const down = (e) => {
    e.preventDefault();
    downVar.value = true;
    downVar.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const up = (e) => {
    e.preventDefault();
    downVar.value = false;
    downVar.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const ui = view`<div><button
                          onmousedown=${down} ontouchstart=${down}
                          onmouseup=${up} ontouchend=${up}
                          onclick=${(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          class="sequencer-btn ${size}">
    ${["label", labelVar]}
    ${["down", downVar]}
    ${["color", colorVar]}
    ${["border", borderVar]}
  `;
  const btn = ui.querySelector(".sequencer-btn");
  const updateColor = () => {
    btn.style.backgroundColor = colorVar.value;
  };
  const updateBorder = () => {
    btn.style.borderColor = borderVar.value;
  };
  colorVar.addEventListener("assign", updateColor);
  updateColor();
  borderVar.addEventListener("assign", updateBorder);
  updateBorder();
  return ui;
}
)}

function _40(md){return(
md`### Colors`
)}

function _offColor(Inputs){return(
Inputs.color({ label: "off", value: "#FFFFFF" })
)}

function _downColor(Inputs){return(
Inputs.color({ label: "down", value: "#c78fff" })
)}

function _nowBorderColor(Inputs){return(
Inputs.color({ label: "now border", value: "#ff7575" })
)}

function _borderColor(Inputs){return(
Inputs.color({ label: "border", value: "#fff0f0" })
)}

function _audioContext(webaudioPolyfill){return(
webaudioPolyfill, new AudioContext()
)}

async function _silence(sample,audioContext,FileAttachment){return(
sample({
  audioContext,
  arrayBuffer: await FileAttachment("silence.wav").arrayBuffer()
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Clap01.wav", {url: new URL("./files/eb467199dd58d2236d0372138923ba219efd9238540ae2802a08623760de601657c2d19c063dcb802ec0d0988b11c85e5d81cbfd1f5a748c46d7462a781acaee", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["Clap02.wav", {url: new URL("./files/8200a2980323a57ec68ff291d47d4bffeef1d90072a5a1ee8552d8995087523bc4b9825c5870e865af331dd9075ac5ba3def9e8462b706d8dad88c123b690220", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["Kick01.wav", {url: new URL("./files/8b51b9ee71368877f4499b4b9e5ac51cbdfe9454f7c542d79900b5197b7ba3ca8e909afb07858424a1ac5d80b99a763b98de7fa6c8565a7b4b2c84fb1a2df6c4", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["Snap02.wav", {url: new URL("./files/d54ecaabeba28ba914f7c7cd2b7036259d874953f0ef9164053ced8a2e8502161dfde813e6d81c0ea63f7a7bfcce1dfbc92a0f55bf55409ab3d60d73e276bfa0", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["OHH02.wav", {url: new URL("./files/600a0b8f9c31351a7d816028fe2e61d1aad7293385ac69391c02a75d55fa843a41f4665fafc2e8b8da9a7235873208e8ef10f1d60c7edfad0ae4a7c5c8cbecff", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["CHH05.wav", {url: new URL("./files/4a5b8451ddf25fa37792dac3ce4197cb8645565c6105537aaecfe5e19d1d3f1f473694f3dad80936e200716a5bc96151a31cc23ec5024d2c5bd5aac50667c624", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["silence.wav", {url: new URL("./files/be954c0f0c27c8218695732c656c767b6ae560eb12ddf2a2851531cf80a5bab37a08227d60f81e5a99e419d400d09a9ed50b587cb101756a89851e5d6d7bce69", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["Chord 1_G.wav", {url: new URL("./files/561eb6efc870da6c02e00b350c5cfb654281820dc06a6e5874efaca17f99b0fa6b9db96bacec3c2d6c0e19cc4179b3bee4c990ea9b39aadca43c8c5e62acc1e7", import.meta.url), mimeType: "audio/vnd.wave", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof initialProgram")).define("viewof initialProgram", ["Inputs"], _initialProgram);
  main.variable(observer("initialProgram")).define("initialProgram", ["Generators", "viewof initialProgram"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","program"], _3);
  main.variable(observer("viewof play")).define("viewof play", ["Inputs","viewof silence","Event","invalidation"], _play);
  main.variable(observer("play")).define("play", ["Generators", "viewof play"], (G, _) => G.input(_));
  main.variable(observer("viewof bpm")).define("viewof bpm", ["Inputs"], _bpm);
  main.variable(observer("bpm")).define("bpm", ["Generators", "viewof bpm"], (G, _) => G.input(_));
  main.variable(observer("viewof selectedSample")).define("viewof selectedSample", ["juice","Inputs"], _selectedSample);
  main.variable(observer("selectedSample")).define("selectedSample", ["Generators", "viewof selectedSample"], (G, _) => G.input(_));
  main.variable(observer("viewof buttons64")).define("viewof buttons64", ["fastBtn","grid"], _buttons64);
  main.variable(observer("buttons64")).define("buttons64", ["Generators", "viewof buttons64"], (G, _) => G.input(_));
  main.variable(observer("viewof buttons4x4")).define("viewof buttons4x4", ["fastBtn","grid"], _buttons4x4);
  main.variable(observer("buttons4x4")).define("buttons4x4", ["Generators", "viewof buttons4x4"], (G, _) => G.input(_));
  main.variable(observer("viewof clap02")).define("viewof clap02", ["sample","audioContext","FileAttachment"], _clap02);
  main.variable(observer("clap02")).define("clap02", ["Generators", "viewof clap02"], (G, _) => G.input(_));
  main.variable(observer("viewof kick01")).define("viewof kick01", ["sample","audioContext","FileAttachment"], _kick01);
  main.variable(observer("kick01")).define("kick01", ["Generators", "viewof kick01"], (G, _) => G.input(_));
  main.variable(observer("viewof clap01")).define("viewof clap01", ["sample","audioContext","FileAttachment"], _clap01);
  main.variable(observer("clap01")).define("clap01", ["Generators", "viewof clap01"], (G, _) => G.input(_));
  main.variable(observer("viewof snap02")).define("viewof snap02", ["sample","audioContext","FileAttachment"], _snap02);
  main.variable(observer("snap02")).define("snap02", ["Generators", "viewof snap02"], (G, _) => G.input(_));
  main.variable(observer("viewof ohh02")).define("viewof ohh02", ["sample","audioContext","FileAttachment"], _ohh02);
  main.variable(observer("ohh02")).define("ohh02", ["Generators", "viewof ohh02"], (G, _) => G.input(_));
  main.variable(observer("viewof chh05")).define("viewof chh05", ["sample","audioContext","FileAttachment"], _chh05);
  main.variable(observer("chh05")).define("chh05", ["Generators", "viewof chh05"], (G, _) => G.input(_));
  main.variable(observer("viewof c")).define("viewof c", ["sample","audioContext","FileAttachment"], _c);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer("viewof f")).define("viewof f", ["sample","audioContext","FileAttachment"], _f);
  main.variable(observer("f")).define("f", ["Generators", "viewof f"], (G, _) => G.input(_));
  main.variable(observer("viewof g")).define("viewof g", ["sample","audioContext","FileAttachment"], _g);
  main.variable(observer("g")).define("g", ["Generators", "viewof g"], (G, _) => G.input(_));
  main.variable(observer("wiring")).define("wiring", ["connect","viewof kick01","viewof buttons4x4","invalidation","viewof clap01","viewof snap02","viewof ohh02","viewof chh05","viewof c","viewof f","viewof g"], _wiring);
  main.variable(observer("viewof program")).define("viewof program", ["Inputs","initialProgram"], _program);
  main.variable(observer("program")).define("program", ["Generators", "viewof program"], (G, _) => G.input(_));
  main.variable(observer("syncSampleOptions")).define("syncSampleOptions", ["wiring","bindOneWay","viewof selectedSample","viewof samples"], _syncSampleOptions);
  main.variable(observer()).define(["samples"], _21);
  main.variable(observer("syncSequencerToProgram")).define("syncSequencerToProgram", ["selectedSample","buttons64","downColor","offColor","viewof program","Event"], _syncSequencerToProgram);
  main.variable(observer("syncInitialProgramToSequencer")).define("syncInitialProgramToSequencer", ["syncSampleOptions","viewof selectedSample","viewof buttons64","offColor","initialProgram","selectedSample","downColor"], _syncInitialProgramToSequencer);
  main.variable(observer("syncTimeToSequencer")).define("syncTimeToSequencer", ["t","viewof buttons64","borderColor","nowBorderColor"], _syncTimeToSequencer);
  main.variable(observer("LOOKAHEAD")).define("LOOKAHEAD", _LOOKAHEAD);
  main.variable(observer("next")).define("next", _next);
  main.variable(observer("t")).define("t", ["bpm","mutable audioStart","audioContext","play","Promises"], _t);
  main.variable(observer("slice")).define("slice", ["play","t","LOOKAHEAD","program","next"], _slice);
  main.define("initial audioStart", ["audioContext"], _audioStart);
  main.variable(observer("mutable audioStart")).define("mutable audioStart", ["Mutable", "initial audioStart"], (M, _) => new M(_));
  main.variable(observer("audioStart")).define("audioStart", ["mutable audioStart"], _ => _.generator);
  main.variable(observer("stepToAudio")).define("stepToAudio", ["mutable audioStart","bpm"], _stepToAudio);
  main.variable(observer("syncSliceToDPM")).define("syncSliceToDPM", ["slice","samples","stepToAudio","buttons4x4","viewof buttons4x4","nowBorderColor","borderColor"], _syncSliceToDPM);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof samples")).define("viewof samples", ["Inputs"], _samples);
  main.variable(observer("samples")).define("samples", ["Generators", "viewof samples"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof buttons4x4"], _34);
  main.variable(observer("connect")).define("connect", ["offColor","viewof samples","Event","downColor"], _connect);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["html"], _37);
  main.variable(observer("viewof fastBtnExample")).define("viewof fastBtnExample", ["fastBtn"], _fastBtnExample);
  main.variable(observer("fastBtnExample")).define("fastBtnExample", ["Generators", "viewof fastBtnExample"], (G, _) => G.input(_));
  main.variable(observer("fastBtn")).define("fastBtn", ["variable","offColor","borderColor","Event","view"], _fastBtn);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("viewof offColor")).define("viewof offColor", ["Inputs"], _offColor);
  main.variable(observer("offColor")).define("offColor", ["Generators", "viewof offColor"], (G, _) => G.input(_));
  main.variable(observer("viewof downColor")).define("viewof downColor", ["Inputs"], _downColor);
  main.variable(observer("downColor")).define("downColor", ["Generators", "viewof downColor"], (G, _) => G.input(_));
  main.variable(observer("viewof nowBorderColor")).define("viewof nowBorderColor", ["Inputs"], _nowBorderColor);
  main.variable(observer("nowBorderColor")).define("nowBorderColor", ["Generators", "viewof nowBorderColor"], (G, _) => G.input(_));
  main.variable(observer("viewof borderColor")).define("viewof borderColor", ["Inputs"], _borderColor);
  main.variable(observer("borderColor")).define("borderColor", ["Generators", "viewof borderColor"], (G, _) => G.input(_));
  main.variable(observer("audioContext")).define("audioContext", ["webaudioPolyfill"], _audioContext);
  main.variable(observer("viewof silence")).define("viewof silence", ["sample","audioContext","FileAttachment"], _silence);
  main.variable(observer("silence")).define("silence", ["Generators", "viewof silence"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("sample", child1);
  main.import("webaudioPolyfill", child1);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  main.import("variable", child2);
  main.import("bindOneWay", child2);
  const child3 = runtime.module(define3);
  main.import("grid", child3);
  const child4 = runtime.module(define4);
  main.import("juice", child4);
  return main;
}
