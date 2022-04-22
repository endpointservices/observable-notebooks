// https://observablehq.com/@tomlarkworthy/utils@10
function _1(md){return(
md`# Utils`
)}

function _promiseRecursive(){return(
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
)}

function _3(){return(
Object.keys([1, 2])
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  main.variable(observer()).define(_3);
  return main;
}
