function _1(md){return(
md`# [webgpu-torch](https://github.com/praeclarum/webgpu-torch) experiments

WebGPU accelerated tensor processing and auto-differentiation`
)}

async function _torch()
{
  const torch = await import("https://cdn.skypack.dev/webgpu-torch@0.3.5?min");
  await torch.initWebGPUAsync();
  return torch;
}


function _3(md){return(
md`## Simple`
)}

function _a(torch){return(
torch.tensor([
  [1, 2, 3],
  [4, 5, 6]
])
)}

function _b(torch){return(
torch.tensor([
  [7, 8, 9],
  [10, 11, 12]
])
)}

function _c(a,b){return(
a.add(b)
)}

function _result(c){return(
c.toArrayAsync()
)}

function _8(md){return(
md`## Auto differentiation`
)}

function _e(torch){return(
torch.tensor({
  data: [
    [1, 2, 3],
    [4, 5, 6]
  ],
  requiresGrad: true
})
)}

function _f(torch){return(
torch.tensor({
  data: [
    [7, 8, 9],
    [10, 11, 12]
  ],
  requiresGrad: true
})
)}

function _g(e,f){return(
e.add(f)
)}

function _12(g){return(
g.backward()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("torch")).define("torch", _torch);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("a")).define("a", ["torch"], _a);
  main.variable(observer("b")).define("b", ["torch"], _b);
  main.variable(observer("c")).define("c", ["a","b"], _c);
  main.variable(observer("result")).define("result", ["c"], _result);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("e")).define("e", ["torch"], _e);
  main.variable(observer("f")).define("f", ["torch"], _f);
  main.variable(observer("g")).define("g", ["e","f"], _g);
  main.variable(observer()).define(["g"], _12);
  return main;
}
