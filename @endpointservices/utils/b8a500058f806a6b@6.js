// https://observablehq.com/@tomlarkworthy/utils@6
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Utils`
)});
  main.variable(observer("promiseRecursive")).define("promiseRecursive", function(){return(
function promiseRecursive(obj) {
  const getPromises = obj =>
    Object.keys(obj).reduce(
      (acc, key) =>
        Object(obj[key]) !== obj[key]
          ? acc
          : acc.concat(
              typeof obj[key].then === "function"
                ? [[obj, key]]
                : getPromises(obj[key])
            ),
      []
    );
  const all = getPromises(obj);
  return Promise.all(all.map(([obj, key]) => obj[key])).then(
    responses => (
      all.forEach(([obj, key], i) => (obj[key] = responses[i])), obj
    )
  );
}
)});
  return main;
}
