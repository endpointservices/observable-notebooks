import define1 from "./4a1fa3c167b752e5@299.js";
import define2 from "./79750b3b8e929d9d@252.js";
import define3 from "./266e717755b1d175@112.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# List remote .zip contents`
)}

function _zipURL(text){return(
text({ placeholder: "Paste .zip file URL..", submit: "Go" })
)}

function _3(zipURL){return(
zipURL
)}

async function _zipStream(zipURL,Inputs,md,zipURLSpinner,invalidation)
{
  if (zipURL.length > 0) {
    return Inputs.input(await fetch(zipURL).then(r => r.blob()));
  } else {
    return Object.defineProperty(md`waiting for URL${zipURLSpinner}`, "value", {
      value: invalidation
    });
  }
}


function _6(zipStream){return(
zipStream
)}

function _7(zipStream)
{
  return zipStream;
}


function _zipStreamOld(md,zipURLSpinner,zipURL)
{
  let resolve;
  const result = new Promise(_resolve => resolve = _resolve);
  
  const ui = md`Waiting for the input ${zipURLSpinner}`
  zipURL
  ? fetch(zipURL).then((r) => r.blob())
  : md`Waiting for the input${zipURLSpinner}`

}


function _9(aq,zipFile){return(
aq.table({ filename: zipFile.filenames }).view()
)}

function _10(zipURL){return(
zipURL
)}

function _testURL(){return(
"https://files.pythonhosted.org/packages/dc/b9/ef8264615b7ab39506e75d4aff554ac5557332820be8d48494a92aa1cda8/vodka-3.1.0-py3-none-any.whl"
)}

function _zipFile(LocalFile,zipStream){return(
new LocalFile(zipStream).zip()
)}

function _13(zipFile){return(
zipFile.filenames
)}

async function* _zipURLSpinner(zipURL,Promises)
{
  let i = 0;
  let shots = ["  ", ".  ", ".. ", "..."];
  while (!zipURL) {
    await Promises.delay(600);
    yield shots[i % shots.length];
    i++;
  }
  yield "";
}


function _19(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof zipURL")).define("viewof zipURL", ["text"], _zipURL);
  main.variable(observer("zipURL")).define("zipURL", ["Generators", "viewof zipURL"], (G, _) => G.input(_));
  main.variable(observer()).define(["zipURL"], _3);
  const child1 = runtime.module(define1);
  main.import("viewroutine", child1);
  main.import("ask", child1);
  main.variable(observer("viewof zipStream")).define("viewof zipStream", ["zipURL","Inputs","md","zipURLSpinner","invalidation"], _zipStream);
  main.variable(observer("zipStream")).define("zipStream", ["Generators", "viewof zipStream"], (G, _) => G.input(_));
  main.variable(observer()).define(["zipStream"], _6);
  main.variable(observer()).define(["zipStream"], _7);
  main.variable(observer("viewof zipStreamOld")).define("viewof zipStreamOld", ["md","zipURLSpinner","zipURL"], _zipStreamOld);
  main.variable(observer("zipStreamOld")).define("zipStreamOld", ["Generators", "viewof zipStreamOld"], (G, _) => G.input(_));
  main.variable(observer()).define(["aq","zipFile"], _9);
  main.variable(observer()).define(["zipURL"], _10);
  main.variable(observer("testURL")).define("testURL", _testURL);
  main.variable(observer("zipFile")).define("zipFile", ["LocalFile","zipStream"], _zipFile);
  main.variable(observer()).define(["zipFile"], _13);
  main.variable(observer("zipURLSpinner")).define("zipURLSpinner", ["zipURL","Promises"], _zipURLSpinner);
  const child2 = runtime.module(define2);
  main.import("aq", child2);
  const child3 = runtime.module(define3);
  main.import("LocalFile", child3);
  const child4 = runtime.module(define4);
  main.import("text", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _19);
  return main;
}
