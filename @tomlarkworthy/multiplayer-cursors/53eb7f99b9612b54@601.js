// https://observablehq.com/@tomlarkworthy/multiplayer-cursors@601
import define1 from "./5c1b38ac46351270@317.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./316f0885d15ab671@69.js";
import define4 from "./c2dae147641e012a@46.js";
import define5 from "./a2e58f97fd5e8d7c@756.js";
import define6 from "./84e66f78139ac354@829.js";
import define7 from "./11a5ab8b1b3a51db@1161.js";
import define8 from "./293899bef371e135@278.js";

function _1(md){return(
md`# Multiplayer Cursors

I love the shared cursor thing Miro has. 

This is kind of similar except it doesn't work at the document level as their is no consistency between layouts across devices. Miro works because it has a fixed layout (with independent zoom levels).

Still, it is a very cool effect and combined with [@tomlarkworthy/shareview](https://observablehq.com/@tomlarkworthy/shareview) that allows controls to be synchronized between viewers you can kind of figure out what the other person is doing.

### Conclusion

Database overhead peaked at 11% with 10 concurrent users. We should maybe try to be a little more effecient (max publish rate). No-pne cursors line up becuase layouts differ, so some kinda of relative positioning might be better if we want to stick with a general solution.

Cursers that are backgrounded for a while get flooded with updates when going back online, the full history is replayed which seems suboptimal. Ideally we should disconnect the server and reconnect. (the person is not really there)

We were suffering from zombie cursers due to https://github.com/firebase/firebase-js-sdk/issues/174 but that seems to be fixed 2022-08-11
`
)}

function _2(html,online){return(
html`<div><h2>Online now</h2><ul>${online.sort().map(
  entry => html`
<li id=${entry.device}>
${entry.device}
</li>`
)}</ul>`
)}

function _3(md){return(
md`## Try some controls out!`
)}

function _4(md){return(
md`Normal controls can be interacted with bot the other people all have different views`
)}

function _5(Range){return(
Range([0, 100], { label: "unshared control" })
)}

function _6(md){return(
md`If we use [@tomlarkworthy/shareview](https://observablehq.com/@tomlarkworthy/shareview) this control we update for everybody`
)}

function _shared(Range){return(
Range([0, 100], { label: "shared control" })
)}

function _8(share,$0){return(
share("shared", $0)
)}

function _online(listen,onlineRef){return(
listen(onlineRef, {
  includeId: true
})
)}

function _devices(){return(
[]
)}

function _syncDevices(online,_,devices,$0)
{
  const current = online.map(r => r._id);
  if (!_.isEqualWith(devices, current)) {
    $0.value = current;
  }
}


function _onlineRef(db,FKEY,html){return(
db.ref(
  `/shareinput/${FKEY.encode(html`<a href>`.href.split('?')[0])}/online`
)
)}

function _meRef(devices,device,onlineRef)
{
  if (!devices.includes(device)) {
    const meRef = onlineRef.child(device);
    meRef.onDisconnect().set(null);
    meRef.set({
      device
    });
  }
  return onlineRef.child(device);
}


function _syncPointers(online,pointers)
{
  online.forEach((player) => {
    if (pointers[player.device]) {
      const rect = pointers[player.device].parentNode.getBoundingClientRect();
      pointers[player.device].style.left = player.x;
      pointers[player.device].style.top = player.y;
    }
  });
}


function _updateMyMouse(pointers,device,meRef,invalidation)
{
  const pointermoved = e => {
    const rect = pointers[device].parentNode.getBoundingClientRect();
    meRef.set({
      device,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  document.addEventListener("pointermove", pointermoved);
  invalidation.then(() => {
    document.removeEventListener("pointermove", pointermoved);
  });
}


function _enableLogging(firebase){return(
firebase.firebase_.database.enableLogging(true)
)}

function _17(md){return(
md`### Graphics`
)}

function _pointers(devices,pointer,html)
{
  const svgs = devices.reduce((acc, device) => {
    acc[device] = pointer(device);
    return acc;
  }, {});

  const ui = html`<div>${Object.values(svgs)}`;
  ui.value = svgs;
  return ui;
}


function _pointer(svg,colorFromString){return(
seed => {
  return svg`<svg style="position: relative; stroke-width:10;pointer-events: none;" viewBox="9 9 125 190" width="12">
    <polygon points="10,10 10,150 45,117 73,181 92,173 63,110 113,105"/ fill="${colorFromString(
      seed
    )}" stroke="black">
  </svg>`;
}
)}

function _FIREBASE_CONFIG(){return(
{
  apiKey: "AIzaSyAqtghLj-S9NX0rj11ynWIovHOj3Wx9bqQ",
  databaseURL: "https://calculus-d7a63.firebaseio.com",
  projectId: "calculus-d7a63",
  appId: "1:55204078424:web:ee6243e9fcb0578e653b2d"
}
)}

function _device(localStorage,randomId)
{
  let session = localStorage.getItem("@tomlarkworthy/multiplayer-cursors");
  if (!session) {
    session = randomId(16);
    localStorage.setItem("@tomlarkworthy/multiplayer-cursors", session);
  }
  return session;
}


function _colorFromString(){return(
str => {
  let sum = 1;
  for (var i = 0; i < str.length; i++) {
    sum *= str.charCodeAt(i);
  }
  return `hsl(${sum % 360},100%,50%)`;
}
)}

function _23(colorFromString){return(
colorFromString("400")
)}

function _32(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","online"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Range"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof shared")).define("viewof shared", ["Range"], _shared);
  main.variable(observer("shared")).define("shared", ["Generators", "viewof shared"], (G, _) => G.input(_));
  main.variable(observer()).define(["share","viewof shared"], _8);
  main.variable(observer("online")).define("online", ["listen","onlineRef"], _online);
  main.define("initial devices", _devices);
  main.variable(observer("mutable devices")).define("mutable devices", ["Mutable", "initial devices"], (M, _) => new M(_));
  main.variable(observer("devices")).define("devices", ["mutable devices"], _ => _.generator);
  main.variable(observer("syncDevices")).define("syncDevices", ["online","_","devices","mutable devices"], _syncDevices);
  main.variable(observer("onlineRef")).define("onlineRef", ["db","FKEY","html"], _onlineRef);
  main.variable(observer("meRef")).define("meRef", ["devices","device","onlineRef"], _meRef);
  main.variable(observer("syncPointers")).define("syncPointers", ["online","pointers"], _syncPointers);
  main.variable(observer("updateMyMouse")).define("updateMyMouse", ["pointers","device","meRef","invalidation"], _updateMyMouse);
  main.variable(observer("enableLogging")).define("enableLogging", ["firebase"], _enableLogging);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof pointers")).define("viewof pointers", ["devices","pointer","html"], _pointers);
  main.variable(observer("pointers")).define("pointers", ["Generators", "viewof pointers"], (G, _) => G.input(_));
  main.variable(observer("pointer")).define("pointer", ["svg","colorFromString"], _pointer);
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", _FIREBASE_CONFIG);
  main.variable(observer("device")).define("device", ["localStorage","randomId"], _device);
  main.variable(observer("colorFromString")).define("colorFromString", _colorFromString);
  main.variable(observer()).define(["colorFromString"], _23);
  const child1 = runtime.module(define1).derive(["FIREBASE_CONFIG"], main);
  main.import("share", child1);
  main.import("db", child1);
  main.import("firebase", child1);
  main.import("FKEY", child1);
  const child2 = runtime.module(define2).derive(["FIREBASE_CONFIG"], main);
  main.import("listen", child2);
  const child3 = runtime.module(define3);
  main.import("randomId", child3);
  const child4 = runtime.module(define4);
  main.import("localStorage", child4);
  const child5 = runtime.module(define5);
  main.import("Range", child5);
  const child6 = runtime.module(define6);
  main.import("reconcile", child6);
  const child7 = runtime.module(define7);
  main.import("html", child7);
  main.import("svg", child7);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], _32);
  return main;
}
