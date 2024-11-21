import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./a2e58f97fd5e8d7c@756.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Firebase playground

`
)}

function _2(md){return(
md`### Change these please`
)}

function _size(Range){return(
Range([5, 45], {
  label: "Size",
  step: 0.1
})
)}

function _remoteSize(listen,firestore){return(
listen(firestore.doc("sync/size"))
)}

function _5($0,remoteSize)
{
  $0.value = remoteSize.value; // Always sync remote to the control
}


function _manualSize(Generators,$0){return(
Generators.observe(next => {
  $0.addEventListener('input', evt => {
    if (evt.isTrusted) next(evt.target.value);
  });
})
)}

function _7(firestore,manualSize){return(
firestore.doc("sync/size").set({
  value: manualSize // Only update on people changes
})
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  authDomain: "larkworthy-dfb11.firebaseapp.com",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  storageBucket: "larkworthy-dfb11.appspot.com",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

function _9(md){return(
md`### Libraries`
)}

function _d3(require){return(
require("d3@5.9.2")
)}

function _firestore(firebase){return(
firebase.firestore()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof size")).define("viewof size", ["Range"], _size);
  main.variable(observer("size")).define("size", ["Generators", "viewof size"], (G, _) => G.input(_));
  main.variable(observer("remoteSize")).define("remoteSize", ["listen","firestore"], _remoteSize);
  main.variable(observer()).define(["viewof size","remoteSize"], _5);
  main.variable(observer("manualSize")).define("manualSize", ["Generators","viewof size"], _manualSize);
  main.variable(observer()).define(["firestore","manualSize"], _7);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("listen", child1);
  main.import("DocView", child1);
  main.variable(observer("firestore")).define("firestore", ["firebase"], _firestore);
  const child2 = runtime.module(define2);
  main.import("Range", child2);
  main.import("bind", child2);
  const child3 = runtime.module(define3);
  main.import("color", child3);
  return main;
}
