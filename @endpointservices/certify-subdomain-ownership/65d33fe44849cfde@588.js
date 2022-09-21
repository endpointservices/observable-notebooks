// https://observablehq.com/@tomlarkworthy/metaprogramming@588
function _1(md){return(
md`# Metaprogramming with _Peek_ [Not recommended for production user]

<center style="height:320px"><span style="font-size:800px; line-height: 730px">*</span></center>

_Peek_ will dynamically evaluate another notebook cell as a [generator](https://observablehq.com/@observablehq/introduction-to-generators?collection=@observablehq/generators). _PeekFirst_ will read a cell as a promise.

This will help build notebooks (metabooks?) that apply a common functions to other notebooks, e.g. [SVG to GIF converter](https://observablehq.com/@tomlarkworthy/svg-to-gif).

`
)}

function _2(signature,peek){return(
signature(peek, {
  description: "Reads 'cell' in another notebook and returns the stream of values as a [generator](https://observablehq.com/@observablehq/introduction-to-generators?collection=@observablehq/generators)"
})
)}

function _peek(Generators,Library,require,Runtime){return(
function peek({
  notebook = "@tomlarkworthy/metaprogramming", // Target notebook
  cell = undefined, // Name of target cell, or undefined for anonymous
  filter = value => true // Filter values (useful for extracting anonymous values
} = {}) {
  notebook = notebook.replace('https://observablehq.com/', '');
  const safeFilter = value => {
    try {
      return filter(value);
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  return Generators.observe(next => {
    // See Mike Bostock's https://talk.observablehq.com/t/importcell-conflicts-with-static-import/4548/14
    // Instantiate a new runtime, but reuse the existing runtime’s require.
    // (This is ensures that any requires in imports still work.)
    const library = Object.assign(new Library(), { require: () => require });
    const runtime = new Runtime(library);

    import(`https://api.observablehq.com/${notebook}.js?v=3`)
      .then(({ default: define } = {}) => {
        const imported = runtime.module(define, name => {
          if (cell && name !== cell) return null;
          console.log("name", name);
          return {
            fulfilled(value) {
              if (safeFilter(value)) next(value);
            },
            rejected(err) {
              if (safeFilter(err)) next(Promise.reject(err));
            }
          };
        });
      })
      .catch(err => next(Promise.reject(err)));

    return () => runtime.dispose();
  });
}
)}

function _4(signature,peekFirst){return(
signature(peekFirst, {
  description: "Same as peek but returns a promise, useful for reading static values"
})
)}

function _peekFirst(peek){return(
function peekFirst(args) {
  const generator = peek(args)
  const value = generator.next().value;
  value.then(() => generator.return()); // Afgter we resolve a vlaue then we can dispose of the generator
  return value;
}
)}

function _6(signature,peekMany){return(
signature(peekMany, {
  description:
    "Same as peek but returns an array of generators running off the same runtime. Useful for aggregating data across a dataflow graph."
})
)}

function _peekMany(Generators,Library,require,Runtime){return(
function peekMany({
  notebook = "@tomlarkworthy/metaprogramming", // Target notebook
  cells = [] // Name of target cell, or undefined for anonymous
} = {}) {
  notebook = notebook.replace('https://observablehq.com/', '');

  const generators = [];
  const nexts = cells.reduce((acc, cell) => {
    generators.push(Generators.observe(next => (acc[cell] = next)));
    return acc;
  }, {});

  // See Mike Bostock's https://talk.observablehq.com/t/importcell-conflicts-with-static-import/4548/14
  // Instantiate a new runtime, but reuse the existing runtime’s require.
  // (This is ensures that any requires in imports still work.)
  const library = Object.assign(new Library(), { require: () => require });
  const runtime = new Runtime(library);

  import(`https://api.observablehq.com/${notebook}.js?v=3`).then(
    ({ default: define } = {}) => {
      const imported = runtime.module(define, name => {
        if (!nexts[name]) return null;
        return {
          fulfilled(value) {
            nexts[name](value);
          },
          rejected(err) {
            nexts[name](Promise.reject(err));
          }
        };
      });
    }
  );
  return generators;
}
)}

function _9(md){return(
md`## Examples`
)}

function _peek_value(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'constant_string'
})
)}

function _peek_promise(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'promise'
})
)}

function _peek_promise_err(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'promise_err'
})
)}

function _peek_generator(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'generator'
})
)}

function _Runtime(observablehq){return(
observablehq.Runtime
)}

function _Library(observablehq){return(
observablehq.Library
)}

function _peekTests(createSuite){return(
createSuite({
  name: "Peak Tests"
})
)}

function _18(peekTests,expect,peek_value){return(
peekTests.test("peek_value", async () => {
  expect(peek_value).toMatch("https://observablehq.com/@tomlarkworthy/metaprogramming#constant_string")
})
)}

function _20(peekTests,expect,peek_promise){return(
peekTests.test("peak_promise", async () => {
  expect(peek_promise).toMatch("promised")
})
)}

function _21(peekTests,peek,expect){return(
peekTests.test("peak_promise_err", async () => {
  const value = peek({
      notebook: "@tomlarkworthy/metaprogramming",
      cell: 'promise_err'
    }).next().value
  return await expect(value).rejects.toBe("rejected")
})
)}

function _22(peekTests,peek,expect){return(
peekTests.test("peak_generator", async () => {
  const generator = peek({
    notebook: "@tomlarkworthy/metaprogramming",
    cell: 'generator'
  });
  await expect(generator.next().value).resolves.toBe(1);
  await expect(generator.next().value).resolves.toBe(2);
  await expect(generator.next().value).resolves.toBe(3);
})
)}

function _23(peekTests,peek,expect){return(
peekTests.test("peak_dependent_generator", async () => {
  const dependentGenerator = peek({
    notebook: "@tomlarkworthy/metaprogramming",
    cell: 'dependentGenerator'
  });
  await expect(dependentGenerator.next().value).resolves.toBe(2);
  await expect(dependentGenerator.next().value).resolves.toBe(3);
  await expect(dependentGenerator.next().value).resolves.toBe(4);
})
)}

function _24(peekTests,peekFirst,expect){return(
peekTests.test("peakFirst_generator", async () => {
  const value = peekFirst({
      notebook: "@tomlarkworthy/metaprogramming",
      cell: 'generator'
    });
  await expect(value).resolves.toBe(1)
})
)}

function _25(peekTests,peek,expect){return(
peekTests.test("bad import throws", async () => {
  const value = peek({
      notebook: "@tomlarkworthy/no_such_notebook",
      cell: 'promise_err'
    }).next().value
  return await expect(value).rejects.toThrow()
})
)}

function _26(peekTests,peekMany,expect){return(
peekTests.test("peak_many_intertwined_generator", async () => {
  const generators = peekMany({
    notebook: "@tomlarkworthy/metaprogramming",
    cells: ['generator', 'dependentGenerator']
  });
  await expect(generators[0].next().value).resolves.toBe(1);
  await expect(generators[0].next().value).resolves.toBe(2);
  await expect(generators[0].next().value).resolves.toBe(3);
  await expect(generators[1].next().value).resolves.toBe(2);
  await expect(generators[1].next().value).resolves.toBe(3);
  await expect(generators[1].next().value).resolves.toBe(4);
})
)}

function _27(md){return(
md`## Test Data`
)}

function _constant_string(){return(
"https://observablehq.com/@tomlarkworthy/metaprogramming#constant_string"
)}

function _promise(){return(
new Promise((resolve) => resolve("promised"))
)}

function _promise_err(){return(
new Promise((resolve, reject) => reject("rejected"))
)}

function* _generator(){return(
yield* new Set([1, 2, 3])
)}

function _dependentGenerator(generator){return(
generator + 1
)}

function _33(md){return(
md`### Imports`
)}

function _observablehq(require){return(
require("@observablehq/runtime@4")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.define("module 1", async () => runtime.module((await import("./c7a3b20cec5d4dd9@669.js")).default));
  main.define("module 2", async () => runtime.module((await import("./3d9d1394d858ca97@553.js")).default));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["signature","peek"], _2);
  main.variable(observer("peek")).define("peek", ["Generators","Library","require","Runtime"], _peek);
  main.variable(observer()).define(["signature","peekFirst"], _4);
  main.variable(observer("peekFirst")).define("peekFirst", ["peek"], _peekFirst);
  main.variable(observer()).define(["signature","peekMany"], _6);
  main.variable(observer("peekMany")).define("peekMany", ["Generators","Library","require","Runtime"], _peekMany);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("peek_value")).define("peek_value", ["peek"], _peek_value);
  main.variable(observer("peek_promise")).define("peek_promise", ["peek"], _peek_promise);
  main.variable(observer("peek_promise_err")).define("peek_promise_err", ["peek"], _peek_promise_err);
  main.variable(observer("peek_generator")).define("peek_generator", ["peek"], _peek_generator);
  main.variable(observer("Runtime")).define("Runtime", ["observablehq"], _Runtime);
  main.variable(observer("Library")).define("Library", ["observablehq"], _Library);
  main.variable(observer("viewof peekTests")).define("viewof peekTests", ["createSuite"], _peekTests);
  main.variable(observer("peekTests")).define("peekTests", ["Generators", "viewof peekTests"], (G, _) => G.input(_));
  main.variable(observer()).define(["peekTests","expect","peek_value"], _18);
  main.variable(observer()).define(["peekTests","expect","peek_promise"], _20);
  main.variable(observer()).define(["peekTests","peek","expect"], _21);
  main.variable(observer()).define(["peekTests","peek","expect"], _22);
  main.variable(observer()).define(["peekTests","peek","expect"], _23);
  main.variable(observer()).define(["peekTests","peekFirst","expect"], _24);
  main.variable(observer()).define(["peekTests","peek","expect"], _25);
  main.variable(observer()).define(["peekTests","peekMany","expect"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("constant_string")).define("constant_string", _constant_string);
  main.variable(observer("promise")).define("promise", _promise);
  main.variable(observer("promise_err")).define("promise_err", _promise_err);
  main.variable(observer("generator")).define("generator", _generator);
  main.variable(observer("dependentGenerator")).define("dependentGenerator", ["generator"], _dependentGenerator);
  main.variable(observer()).define(["md"], _33);
  main.define("createSuite", ["module 1", "@variable"], (_, v) => v.import("createSuite", _));
  main.define("expect", ["module 1", "@variable"], (_, v) => v.import("expect", _));
  main.define("signature", ["module 2", "@variable"], (_, v) => v.import("signature", _));
  main.variable(observer("observablehq")).define("observablehq", ["require"], _observablehq);
  return main;
}
