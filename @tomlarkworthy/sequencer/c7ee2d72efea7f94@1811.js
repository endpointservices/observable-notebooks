import define1 from "./09fdee029150048c@446.js";
import define2 from "./98f34e974bb2e4bc@958.js";
import define3 from "./e7c3854dfc5e08c3@1352.js";
import define4 from "./f92778131fd76559@1212.js";
import define5 from "./bd9d083ddbe7ce90@1105.js";
import define6 from "./653c46ed55693b1f@685.js";
import define7 from "./10c7899865f8a76e@8998.js";

function _1(md){return(
md`# Sequencer

The sequence connects to the drum pads which connect to the samples.

You can mess with the speed of samples, hit the drum pads manually and play the sequencer program in real time! When your done, click download to capture your work in a single-file 
`
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


function _7(md){return(
md`#### kick01`
)}

async function _kick01(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.1,
  speed: 1.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Kick01.mp3").arrayBuffer()
})
)}

function _9(md){return(
md`#### clap01`
)}

async function _clap01(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.4,
  speed: 0.9,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Clap01.mp3").arrayBuffer()
})
)}

function _11(md){return(
md`#### snap02`
)}

async function _snap02(sample,audioContext,FileAttachment){return(
sample({
  speed: 1.6,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Snap02.mp3").arrayBuffer()
})
)}

function _13(md){return(
md`#### ohh02`
)}

async function _ohh02(sample,audioContext,FileAttachment){return(
sample({
  speed: 1.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("OHH02.mp3").arrayBuffer()
})
)}

function _15(md){return(
md`#### chh05`
)}

async function _chh05(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.7,
  speed: 0.7,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("CHH05.mp3").arrayBuffer()
})
)}

function _17(md){return(
md`#### c`
)}

async function _c(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.3,
  speed: 16.35 / 24.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Chord01_G.mp3").arrayBuffer()
})
)}

function _19(md){return(
md`#### f`
)}

async function _f(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.3,
  speed: 21.83 / 24.5,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Chord01_G.mp3").arrayBuffer()
})
)}

function _21(md){return(
md`#### g`
)}

async function _g(sample,audioContext,FileAttachment){return(
sample({
  gain: 0.3,
  speed: 1,
  loop: false,
  audioContext,
  arrayBuffer: await FileAttachment("Chord01_G.mp3").arrayBuffer()
})
)}

function _23(exporter){return(
exporter()
)}

async function _initialProgram(FileAttachment,Inputs)
{
  const program = await FileAttachment("program01.json").text();
  const decoded = JSON.parse(program, (key, value) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (err) {}
    }
    return value;
  });

  const programView = Inputs.input(decoded);
  return programView;
}


function _25(html,program){return(
html`<h3>Current Program</h3><pre>${JSON.stringify(
  program,
  (k, v) => (v instanceof Array ? JSON.stringify(v) : v),
  2
)}</pre>`
)}

function _26(md){return(
md`## Persistence`
)}

function _module(thisModule){return(
thisModule()
)}

function _save_program(setFileAttachment,jsonFileAttachment,program,module)
{
  setFileAttachment(jsonFileAttachment("program01.json", program), module);
}


function _attachments(getFileAttachments,module){return(
getFileAttachments(module)
)}

function _30(md){return(
md`## Wiring`
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
  // Output is derived from button states
  $0.value.triggers[selectedSample.result] = triggers;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
  return triggers;
}


function _syncSamplesToProgram(t,samples,$0,Event,program)
{
  t;
  let dirty = false;
  Object.entries(samples).forEach(([name, sampler]) => {
    Object.entries(sampler.value).forEach(([key, value]) => {
      if (key == "playing") {
      } else if (key == "arrayBuffer") {
      } else if ($0.value.samples[name][key] !== value) {
        debugger;
        $0.value.samples[name][key] = value;
        dirty = true;
      }
    });
  });
  if (dirty) {
    $0.dispatchEvent(new Event("input"));
  }
  return program.samples;
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
  return initialProgram.triggers;
}


function _syncInitialProgramToSamples(initialProgram,attachments,samples)
{
  console.log("syncInitialProgramToSamples");

  Object.entries(initialProgram.samples).forEach(([name, config]) => {
    Object.entries(config).forEach(([key, value]) => {
      if (key == "file") {
        attachments
          .get(value)
          .arrayBuffer()
          .then((buffer) => {
            samples[name].value["arrayBuffer"] = buffer;
          });
      } else {
        samples[name].value[key] = value;
      }
    });
  });

  return initialProgram.samples;
}


function _syncTimeToSequencer(t,$0,borderColor,nowBorderColor)
{
  if (!t) return;
  $0.value[(t - 1) % 64].element.border = borderColor;
  $0.value[t % 64].element.border = nowBorderColor;
}


function _39(md){return(
md`## Timing`
)}

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


function _slice(play,t,LOOKAHEAD,$0,next)
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
      Object.keys($0.value.triggers).map((sample) => [
        sample,
        next($0.value.triggers[sample], {
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


function _47(md){return(
md`#### Connect a sample to a pad`
)}

function _samples(Inputs){return(
Inputs.input({})
)}

function _49($0){return(
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

function _51(md){return(
md`### FastBtn

- Multi-touch, event raised *on touch down* for lowest latency
- Reactive border color and main color
`
)}

function _52(html){return(
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

function _55(md){return(
md`### Colors`
)}

function _offColor(Inputs){return(
Inputs.color({ label: "off", value: "#000" })
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
  gain: 0,
  audioContext,
  arrayBuffer: await FileAttachment("silence.wav").arrayBuffer()
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["silence.wav", {url: new URL("./files/be954c0f0c27c8218695732c656c767b6ae560eb12ddf2a2851531cf80a5bab37a08227d60f81e5a99e419d400d09a9ed50b587cb101756a89851e5d6d7bce69", import.meta.url), mimeType: "audio/vnd.wave", toString}],
    ["CHH05.mp3", {url: new URL("./files/19316c0dd5c0e91d5935059fead380ec7cf33b9b541618c5eecba76bbf0cab729d030461b07afa1d81c3aea2f8e759b33f3e56d8e427a4e1581689cfa1ccaaf0.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["Chord01_G.mp3", {url: new URL("./files/2b7a36a5e3ad344db7bb731801152b2058a5286ab6ffc141f06d1077c6a39c55405ad84453f7706b62d4f0af9ad3413f6d07e90d339fbbf137c9bdf5bc40244d.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["Clap01.mp3", {url: new URL("./files/d904aef49b3d877dba997c65ce0c8cc39de5ee372bffcbdb459c300b0b584e463dafbf2e47595283a7fc1f43c14ee5a9638a884e8aa9321e0b98724593487148.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["Snap02.mp3", {url: new URL("./files/7baa4cec9c1a1d74121cdb0527fa8331faf860a879ffdff2ee1da20e912a336f1c2ff5d7e4aece8d9130e46f48c104c5136f3f1267b66147e796bf2d20e64b28.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["OHH02.mp3", {url: new URL("./files/9d6cb86a5c549c8122c8937b93385266d962fa810fdd6ef51c2553e231e27e2258b94e325ee02ffcbb11083746e4e4a175af28abe3623e3a0e4a20f9b210b06e.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["Kick01.mp3", {url: new URL("./files/40d7ed19d57f44ef7f096a61ab2884d74acd2267ec710863a1ba9eb890d7ca156e600d662a837ddb82ccab93d9c586aca07966aa865ad8fedb302ced4f9fd2af.mpga", import.meta.url), mimeType: "audio/mpeg", toString}],
    ["program01.json", {url: new URL("./files/f988bc8ef608e79a040b628df63910135a2a95a55d83a50492655c31ac1d815b896a4db9191cebecac621bbafe45c8ae9aa3b28b4ecb706bdc2eb6eedfce9630.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
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
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof kick01")).define("viewof kick01", ["sample","audioContext","FileAttachment"], _kick01);
  main.variable(observer("kick01")).define("kick01", ["Generators", "viewof kick01"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof clap01")).define("viewof clap01", ["sample","audioContext","FileAttachment"], _clap01);
  main.variable(observer("clap01")).define("clap01", ["Generators", "viewof clap01"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof snap02")).define("viewof snap02", ["sample","audioContext","FileAttachment"], _snap02);
  main.variable(observer("snap02")).define("snap02", ["Generators", "viewof snap02"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof ohh02")).define("viewof ohh02", ["sample","audioContext","FileAttachment"], _ohh02);
  main.variable(observer("ohh02")).define("ohh02", ["Generators", "viewof ohh02"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof chh05")).define("viewof chh05", ["sample","audioContext","FileAttachment"], _chh05);
  main.variable(observer("chh05")).define("chh05", ["Generators", "viewof chh05"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof c")).define("viewof c", ["sample","audioContext","FileAttachment"], _c);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof f")).define("viewof f", ["sample","audioContext","FileAttachment"], _f);
  main.variable(observer("f")).define("f", ["Generators", "viewof f"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof g")).define("viewof g", ["sample","audioContext","FileAttachment"], _g);
  main.variable(observer("g")).define("g", ["Generators", "viewof g"], (G, _) => G.input(_));
  main.variable(observer()).define(["exporter"], _23);
  main.variable(observer("viewof initialProgram")).define("viewof initialProgram", ["FileAttachment","Inputs"], _initialProgram);
  main.variable(observer("initialProgram")).define("initialProgram", ["Generators", "viewof initialProgram"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","program"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof module")).define("viewof module", ["thisModule"], _module);
  main.variable(observer("module")).define("module", ["Generators", "viewof module"], (G, _) => G.input(_));
  main.variable(observer("save_program")).define("save_program", ["setFileAttachment","jsonFileAttachment","program","module"], _save_program);
  main.variable(observer("attachments")).define("attachments", ["getFileAttachments","module"], _attachments);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("wiring")).define("wiring", ["connect","viewof kick01","viewof buttons4x4","invalidation","viewof clap01","viewof snap02","viewof ohh02","viewof chh05","viewof c","viewof f","viewof g"], _wiring);
  main.variable(observer("viewof program")).define("viewof program", ["Inputs","initialProgram"], _program);
  main.variable(observer("program")).define("program", ["Generators", "viewof program"], (G, _) => G.input(_));
  main.variable(observer("syncSampleOptions")).define("syncSampleOptions", ["wiring","bindOneWay","viewof selectedSample","viewof samples"], _syncSampleOptions);
  main.variable(observer("syncSequencerToProgram")).define("syncSequencerToProgram", ["selectedSample","buttons64","downColor","offColor","viewof program","Event"], _syncSequencerToProgram);
  main.variable(observer("syncSamplesToProgram")).define("syncSamplesToProgram", ["t","samples","viewof program","Event","program"], _syncSamplesToProgram);
  main.variable(observer("syncInitialProgramToSequencer")).define("syncInitialProgramToSequencer", ["syncSampleOptions","viewof selectedSample","viewof buttons64","offColor","initialProgram","selectedSample","downColor"], _syncInitialProgramToSequencer);
  main.variable(observer("syncInitialProgramToSamples")).define("syncInitialProgramToSamples", ["initialProgram","attachments","samples"], _syncInitialProgramToSamples);
  main.variable(observer("syncTimeToSequencer")).define("syncTimeToSequencer", ["t","viewof buttons64","borderColor","nowBorderColor"], _syncTimeToSequencer);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("LOOKAHEAD")).define("LOOKAHEAD", _LOOKAHEAD);
  main.variable(observer("next")).define("next", _next);
  main.variable(observer("t")).define("t", ["bpm","mutable audioStart","audioContext","play","Promises"], _t);
  main.variable(observer("slice")).define("slice", ["play","t","LOOKAHEAD","viewof program","next"], _slice);
  main.define("initial audioStart", ["audioContext"], _audioStart);
  main.variable(observer("mutable audioStart")).define("mutable audioStart", ["Mutable", "initial audioStart"], (M, _) => new M(_));
  main.variable(observer("audioStart")).define("audioStart", ["mutable audioStart"], _ => _.generator);
  main.variable(observer("stepToAudio")).define("stepToAudio", ["mutable audioStart","bpm"], _stepToAudio);
  main.variable(observer("syncSliceToDPM")).define("syncSliceToDPM", ["slice","samples","stepToAudio","buttons4x4","viewof buttons4x4","nowBorderColor","borderColor"], _syncSliceToDPM);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("viewof samples")).define("viewof samples", ["Inputs"], _samples);
  main.variable(observer("samples")).define("samples", ["Generators", "viewof samples"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof buttons4x4"], _49);
  main.variable(observer("connect")).define("connect", ["offColor","viewof samples","Event","downColor"], _connect);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["html"], _52);
  main.variable(observer("viewof fastBtnExample")).define("viewof fastBtnExample", ["fastBtn"], _fastBtnExample);
  main.variable(observer("fastBtnExample")).define("fastBtnExample", ["Generators", "viewof fastBtnExample"], (G, _) => G.input(_));
  main.variable(observer("fastBtn")).define("fastBtn", ["variable","offColor","borderColor","Event","view"], _fastBtn);
  main.variable(observer()).define(["md"], _55);
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
  main.import("main", child1);
  main.import("getFileAttachments", child1);
  main.import("setFileAttachment", child1);
  main.import("jsonFileAttachment", child1);
  const child2 = runtime.module(define2);
  main.import("thisModule", child2);
  const child3 = runtime.module(define3);
  main.import("sample", child3);
  main.import("webaudioPolyfill", child3);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  main.import("variable", child4);
  main.import("bindOneWay", child4);
  const child5 = runtime.module(define5);
  main.import("grid", child5);
  const child6 = runtime.module(define6);
  main.import("juice", child6);
  const child7 = runtime.module(define7);
  main.import("exporter", child7);
  return main;
}
