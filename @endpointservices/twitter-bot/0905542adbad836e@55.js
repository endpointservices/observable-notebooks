// https://observablehq.com/@mbostock/hello-lodash-fp@55
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Hello, lodash/fp

lodash doesn’t publish [lodash.fp.min.js to npm](https://github.com/lodash/lodash/issues/4014), and [the documentation](https://github.com/lodash/lodash/wiki/FP-Guide) recommends an undocumented, deprecated jsDelivr API (/g/). Instead, lodash publishes this file to GitHub Pages, and is available on jsDeliver under /gh/. The provided AMD exports a function (*fp*) which when called will redefine the lodash object (*_*) with functional equivalents.`
)});
  main.variable(observer("_")).define("_", ["require"], async function(require)
{
  const [_, fp] = await Promise.all([
    require("lodash@4"),
    require("https://cdn.jsdelivr.net/gh/lodash/lodash@4/dist/lodash.fp.min.js")
  ]);
  return fp(_);
}
);
  main.variable(observer()).define(["_"], function(_){return(
_.defaults({ 'a': 2, 'b': 2 })({ 'a': 1 })
)});
  return main;
}
