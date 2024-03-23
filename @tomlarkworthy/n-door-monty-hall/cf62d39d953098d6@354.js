import define1 from "./4a1fa3c167b752e5@304.js";
import define2 from "./f92778131fd76559@1174.js";
import define3 from "./b8a500058f806a6b@11.js";
import define4 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# N-door Monty Hall

The Monty Hall Problem:

A gameshow host asks you to pick a door. It is not opened.
Next, the gameshow host opens a different door NOT containing a prize.
You get to pick a door again, should you switch from your original guess?

This application lets you try different amounts of doors and keeps track of the win ratio and whether you swapped or not for you (using [Plot](https://observablehq.com/@observablehq/plot)).

`
)}

function _game(Inputs,viewroutine,pickDoor,view)
{
  const n = Inputs.range([3, 20], {
    value: 3,
    step: 1,
    label: "Number of doors (applies on game cycle)"
  });
  const doors = viewroutine(async function*() {
    const history = new Map();
    while (true) {
      const nChosen = n.value;
      let state = {
        history,
        doors: Array(nChosen).fill("closed")
      };
      let prize = Math.floor(Math.random() * state.doors.length);
      let firstPick = yield* pickDoor(state);
      // Open other doors not the prize and not the one picked
      let otherDoor = prize;
      while (otherDoor === firstPick) {
        otherDoor = Math.floor(Math.random() * state.doors.length);
      }
      state.doors = state.doors.map((s, index) =>
        index === otherDoor || index === firstPick ? "closed" : "openingEmpty"
      );
      let secondPick = yield* pickDoor(state);
      const swapped = secondPick !== firstPick;
      state.doors = state.doors.map(s => (s === "openingEmpty" ? "empty" : s));
      state.doors[secondPick] =
        secondPick === prize ? "openingPrize" : "openingEmpty";
      yield* pickDoor(state);
      const won = secondPick === prize;
      const historyKey = JSON.stringify([swapped, nChosen]);
      if (!history.has(historyKey)) {
        history.set(historyKey, { n: 0, w: 0 });
      }
      console.log(
        history,
        historyKey,
        history.has(historyKey),
        history.get(historyKey)
      );
      if (won) history.get(historyKey).w++;
      history.get(historyKey).n++;
    }
  });
  return view`<div>
    ${n}
    ${doors}
  </div>`;
}


function _pickDoor(doorButtons){return(
async function*(doors) {
  let notify;
  const result = new Promise(resolve => (notify = resolve));
  yield doorButtons(doors, notify);
  return await result;
}
)}

function _doorButtons(promiseRecursive,FileAttachment,viewroutine,openEmptyDoor,invalidation,openPrizeDoor,htl,Plot){return(
async ({ doors, history } = {}, notify) => {
  const imgs = await promiseRecursive(
    doors.map(door => {
      if (door === 'closed') return FileAttachment("e0@1.jpg").image();
      if (door === 'empty') return FileAttachment("e3@1.jpg").image();
      if (door === 'prize') return FileAttachment("b3@1.jpg").image();
    })
  );
  const buttons = doors.map((door, i) =>
    door === 'closed'
      ? ((imgs[i].onclick = () => notify(i)), imgs[i])
      : door === 'openingEmpty'
      ? viewroutine(openEmptyDoor.bind(null, invalidation))
      : door === 'openingPrize'
      ? viewroutine(openPrizeDoor.bind(null, invalidation))
      : imgs[i]
  );
  const processed = [...history.keys()].map(key => {
    const [swapped, n] = JSON.parse(key);
    return {
      n,
      swapped,
      win_rate: history.get(key).w / history.get(key).n
    };
  });
  return htl.html`<div>
    <style>
      .game {
        display:flex;
        width: 100%
      }
      .game > img,.game > span {
        width: 1px;
        flex-grow: 1;
        flex-shrink: 1;
      }
      .game > span > img {
        width: 100%;
      }
    </style>
    <div>
      ${Plot.plot({
        y: {
          domain: [0, 1]
        },
        color: {
          domain: [false, true]
        },
        x: {
          domain: [false, true]
        },
        facet: {
          data: processed,
          x: "n"
        },
        height: 200,
        marks: [
          Plot.barY(processed, {
            x: "swapped",
            y: "win_rate",
            fill: 'swapped'
          }),
          Plot.ruleY([0])
        ]
      })}
    </div>
    <div class="game">
      ${buttons}
    </div>
  </div>`;
}
)}

function _openEmptyDoor(FileAttachment,Promises){return(
async function* openEmptyDoor(finish) {
  yield FileAttachment("e0@1.jpg").image();
  await Promises.delay(200);
  yield FileAttachment("e1@1.jpg").image();
  await Promises.delay(200);
  yield FileAttachment("e2@1.jpg").image();
  await Promises.delay(200);
  yield FileAttachment("e3@1.jpg").image();
  await finish;
}
)}

function _openPrizeDoor(FileAttachment,Promises){return(
async function* openPrizeDoor(finish) {
  yield FileAttachment("b0@1.jpg").image();
  await Promises.delay(200);
  yield FileAttachment("b1@1.jpg").image();
  await Promises.delay(200);
  yield FileAttachment("b2@1.jpg").image();
  await Promises.delay(200);
  yield FileAttachment("b3@1.jpg").image();
  await finish;
}
)}

function _7(md){return(
md`The animations are quicker to load if you run through it once`
)}

function _8(openPrizeDoor){return(
openPrizeDoor()
)}

function _9(openEmptyDoor){return(
openEmptyDoor()
)}

function _14(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["e1@1.jpg", {url: new URL("./files/a3ac093ffb6c9c174e1388e8d6a8ac41f02d43815914a28c7d60b9b34d684e03343f13a0635058730fc91ae8941e5d3169c7494851eade9b9ee4673f6c6b4803.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["e2@1.jpg", {url: new URL("./files/f52d3be54b6313a8c59d2ef3410886857e31905dacbd2d218436c7e963f7e68c5b48d562304532ff20c9f58835e08bbdaecd3ef6368191010e96bb13ec715323.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["b1@1.jpg", {url: new URL("./files/ec64cf6bf3a84fa43cc4a7ee374c7c2ef61d7a5c97aabe90e6837556df7833ac62de70d9fbb86af012983fdbc567cf18cbbcd789af870192b47284ace8361175.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["b2@1.jpg", {url: new URL("./files/3da03f4c24ede340abde30f47359d1eca36cc076532d19f4e2c9d5cba003680c3b153f73ff18aa00d58195a0443549a2e60a834ca11459f24bcf887ebdf52972.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["b0@1.jpg", {url: new URL("./files/4c7f1a50edd7c594c2d1217a2e606f62b58b20e34ae81e1d1203af9351d64bbae7f3a5660b8a67f9e474893f277603ae1070e211cc04414d1702e658c3a2d4da.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["e3@1.jpg", {url: new URL("./files/8cf8606609ab5f341d3b7301510a3914e2179d2b3bb6b5e7fa95053c777b01c7a4a0e7f8d0b4698d4282857f98f39fb9d76dacb2792ec0793d2d109ef52ec6af.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["b3@1.jpg", {url: new URL("./files/2fbe0e4692064edbca40a631ff8f6a465a3de7ed6e205f822d774aec013f73667800c644c1222f691f4257463a5705bb61bd33631d71e7ecf95c4cefb4aa0a3e.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["e0@1.jpg", {url: new URL("./files/59f32403bd50a7bfa6b0fb23a963f7a103818090589fce5e975edb071349245a673dcb96c926fce98c315d371ba5b7b0c988e8df851edfafad6e0bd7a43bc121.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof game")).define("viewof game", ["Inputs","viewroutine","pickDoor","view"], _game);
  main.variable(observer("game")).define("game", ["Generators", "viewof game"], (G, _) => G.input(_));
  main.variable(observer("pickDoor")).define("pickDoor", ["doorButtons"], _pickDoor);
  main.variable(observer("doorButtons")).define("doorButtons", ["promiseRecursive","FileAttachment","viewroutine","openEmptyDoor","invalidation","openPrizeDoor","htl","Plot"], _doorButtons);
  main.variable(observer("openEmptyDoor")).define("openEmptyDoor", ["FileAttachment","Promises"], _openEmptyDoor);
  main.variable(observer("openPrizeDoor")).define("openPrizeDoor", ["FileAttachment","Promises"], _openPrizeDoor);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["openPrizeDoor"], _8);
  main.variable(observer()).define(["openEmptyDoor"], _9);
  const child1 = runtime.module(define1);
  main.import("viewroutine", child1);
  main.import("ask", child1);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  const child3 = runtime.module(define3);
  main.import("promiseRecursive", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _14);
  return main;
}
