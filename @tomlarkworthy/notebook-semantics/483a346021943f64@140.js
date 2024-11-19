import define1 from "./1fb3132464653a8f@21.js";

function _1(md){return(
md`# Notebook Semantics`
)}

function _2(){return(
1
)}

function _3()
{
  ("");
}


function _html(htl){return(
htl.html`<div>`
)}

function _obj_literal(){return(
{}
)}

function _x(){return(
""
)}

function _y(x){return(
x
)}

function _z(x,y)
{
  ("");
  return x + y;
}


function* _generator(x,y)
{
  yield x + y;
}


function __function(){return(
function () {}
)}

function _asyncfunction(){return(
async function () {}
)}

function _named_function(){return(
function foo() {}
)}

function _lambda(){return(
() => {}
)}

function _error()
{
  throw new Error();
}


function _view(Inputs){return(
Inputs.input()
)}

function _q(){return(
6
)}

function _inbuilt(_){return(
_
)}

function _file(FileAttachment){return(
FileAttachment("empty")
)}

function _mutable_dep($0,lambda,$1)
{
  $0;
  lambda;
  $1.value;
  return $1.value;
}


function _mutable_dep_2(file,q)
{
  file;
  return q + 1;
}


function _viewofdep_inline($0){return(
$0
)}

function _viewofdatadep(view){return(
view
)}

function _23(dep){return(
dep
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["empty", {url: new URL("./files/50cad75d56578d08f50d560a50a6f4a66919f1f0b9c189221c6768a04dc958323335dac14ca3526e6527019d02e9e00d21d247eb5c2646b38ec7720e0ddcaa7e.bin", import.meta.url), mimeType: "application/octet-stream", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(_2);
  main.variable(observer()).define(_3);
  main.variable(observer("html")).define("html", ["htl"], _html);
  main.variable(observer("obj_literal")).define("obj_literal", _obj_literal);
  main.variable(observer("x")).define("x", _x);
  main.variable(observer("y")).define("y", ["x"], _y);
  main.variable(observer("z")).define("z", ["x","y"], _z);
  main.variable(observer("generator")).define("generator", ["x","y"], _generator);
  main.variable(observer("_function")).define("_function", __function);
  main.variable(observer("asyncfunction")).define("asyncfunction", _asyncfunction);
  main.variable(observer("named_function")).define("named_function", _named_function);
  main.variable(observer("lambda")).define("lambda", _lambda);
  main.variable(observer("error")).define("error", _error);
  main.variable(observer("viewof view")).define("viewof view", ["Inputs"], _view);
  main.variable(observer("view")).define("view", ["Generators", "viewof view"], (G, _) => G.input(_));
  main.define("initial q", _q);
  main.variable(observer("mutable q")).define("mutable q", ["Mutable", "initial q"], (M, _) => new M(_));
  main.variable(observer("q")).define("q", ["mutable q"], _ => _.generator);
  main.variable(observer("inbuilt")).define("inbuilt", ["_"], _inbuilt);
  main.variable(observer("file")).define("file", ["FileAttachment"], _file);
  main.variable(observer("mutable_dep")).define("mutable_dep", ["viewof view","lambda","mutable q"], _mutable_dep);
  main.variable(observer("mutable_dep_2")).define("mutable_dep_2", ["file","q"], _mutable_dep_2);
  main.variable(observer("viewofdep_inline")).define("viewofdep_inline", ["viewof view"], _viewofdep_inline);
  main.variable(observer("viewofdatadep")).define("viewofdatadep", ["view"], _viewofdatadep);
  main.variable(observer()).define(["dep"], _23);
  const child1 = runtime.module(define1);
  main.import("dep", child1);
  main.import("mutable mutabledep", child1);
  main.import("mutabledep", child1);
  main.import("viewof viewdep", child1);
  main.import("viewdep", child1);
  main.import("dep", "dep_alias", child1);
  main.import("mutable mutabledep", "mutable aslias_mutabledep", child1);
  main.import("mutabledep", "aslias_mutabledep", child1);
  main.import("viewof viewdep", "viewof aslias_viewdep", child1);
  main.import("viewdep", "aslias_viewdep", child1);
  main.import("mutabledep", "aslias_mutabledep_data", child1);
  main.import("viewdep", "aslias_viewdep_data", child1);
  return main;
}
