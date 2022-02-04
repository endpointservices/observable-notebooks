// https://observablehq.com/@tomlarkworthy/metaprogramming@586
import define1 from "./c7a3b20cec5d4dd9@659.js";
import define2 from "./3d9d1394d858ca97@547.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Metaprogramming with _Peek_

<center style="height:320px"><span style="font-size:800px; line-height: 730px">*</span></center>

_Peek_ will dynamically evaluate another notebook cell as a [generator](https://observablehq.com/@observablehq/introduction-to-generators?collection=@observablehq/generators). _PeekFirst_ will read a cell as a promise.

This will help build notebooks (metabooks?) that apply a common functions to other notebooks, e.g. [SVG to GIF converter](https://observablehq.com/@tomlarkworthy/svg-to-gif).

`
)});
  main.variable(observer()).define(["signature","peek"], function(signature,peek){return(
signature(peek, {
  description: "Reads 'cell' in another notebook and returns the stream of values as a [generator](https://observablehq.com/@observablehq/introduction-to-generators?collection=@observablehq/generators)"
})
)});
  main.variable(observer("peek")).define("peek", ["Generators","Library","require","Runtime"], function(Generators,Library,require,Runtime){return(
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
)});
  main.variable(observer()).define(["signature","peekFirst"], function(signature,peekFirst){return(
signature(peekFirst, {
  description: "Same as peek but returns a promise, useful for reading static values"
})
)});
  main.variable(observer("peekFirst")).define("peekFirst", ["peek"], function(peek){return(
function peekFirst(args) {
  const generator = peek(args)
  const value = generator.next().value;
  value.then(() => generator.return()); // Afgter we resolve a vlaue then we can dispose of the generator
  return value;
}
)});
  main.variable(observer()).define(["signature","peekMany"], function(signature,peekMany){return(
signature(peekMany, {
  description:
    "Same as peek but returns an array of generators running off the same runtime. Useful for aggregating data across a dataflow graph."
})
)});
  main.variable(observer("peekMany")).define("peekMany", ["Generators","Library","require","Runtime"], function(Generators,Library,require,Runtime){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Examples`
)});
  main.variable(observer("peek_value")).define("peek_value", ["peek"], function(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'constant_string'
})
)});
  main.variable(observer("peek_promise")).define("peek_promise", ["peek"], function(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'promise'
})
)});
  main.variable(observer("peek_promise_err")).define("peek_promise_err", ["peek"], function(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'promise_err'
})
)});
  main.variable(observer("peek_generator")).define("peek_generator", ["peek"], function(peek){return(
peek({
  notebook: "@tomlarkworthy/metaprogramming",
  cell: 'generator'
})
)});
  main.variable(observer("Runtime")).define("Runtime", ["observablehq"], function(observablehq){return(
observablehq.Runtime
)});
  main.variable(observer("Library")).define("Library", ["observablehq"], function(observablehq){return(
observablehq.Library
)});
  main.variable(observer("viewof peekTests")).define("viewof peekTests", ["createSuite"], function(createSuite){return(
createSuite({
  name: "Peak Tests"
})
)});
  main.variable(observer("peekTests")).define("peekTests", ["Generators", "viewof peekTests"], (G, _) => G.input(_));
  main.variable(observer()).define(["peekTests","expect","peek_value"], function(peekTests,expect,peek_value){return(
peekTests.test("peek_value", async () => {
  expect(peek_value).toMatch("https://observablehq.com/@tomlarkworthy/metaprogramming#constant_string")
})
)});
  main.variable(observer()).define(["peekTests","expect","peek_promise"], function(peekTests,expect,peek_promise){return(
peekTests.test("peak_promise", async () => {
  expect(peek_promise).toMatch("promised")
})
)});
  main.variable(observer()).define(["peekTests","peek","expect"], function(peekTests,peek,expect){return(
peekTests.test("peak_promise_err", async () => {
  const value = peek({
      notebook: "@tomlarkworthy/metaprogramming",
      cell: 'promise_err'
    }).next().value
  return await expect(value).rejects.toBe("rejected")
})
)});
  main.variable(observer()).define(["peekTests","peek","expect"], function(peekTests,peek,expect){return(
peekTests.test("peak_generator", async () => {
  const generator = peek({
    notebook: "@tomlarkworthy/metaprogramming",
    cell: 'generator'
  });
  await expect(generator.next().value).resolves.toBe(1);
  await expect(generator.next().value).resolves.toBe(2);
  await expect(generator.next().value).resolves.toBe(3);
})
)});
  main.variable(observer()).define(["peekTests","peek","expect"], function(peekTests,peek,expect){return(
peekTests.test("peak_dependent_generator", async () => {
  const dependentGenerator = peek({
    notebook: "@tomlarkworthy/metaprogramming",
    cell: 'dependentGenerator'
  });
  await expect(dependentGenerator.next().value).resolves.toBe(2);
  await expect(dependentGenerator.next().value).resolves.toBe(3);
  await expect(dependentGenerator.next().value).resolves.toBe(4);
})
)});
  main.variable(observer()).define(["peekTests","peekFirst","expect"], function(peekTests,peekFirst,expect){return(
peekTests.test("peakFirst_generator", async () => {
  const value = peekFirst({
      notebook: "@tomlarkworthy/metaprogramming",
      cell: 'generator'
    });
  await expect(value).resolves.toBe(1)
})
)});
  main.variable(observer()).define(["peekTests","peek","expect"], function(peekTests,peek,expect){return(
peekTests.test("bad import throws", async () => {
  const value = peek({
      notebook: "@tomlarkworthy/no_such_notebook",
      cell: 'promise_err'
    }).next().value
  return await expect(value).rejects.toThrow()
})
)});
  main.variable(observer()).define(["peekTests","peekMany","expect"], function(peekTests,peekMany,expect){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Test Data`
)});
  main.variable(observer("constant_string")).define("constant_string", function(){return(
"https://observablehq.com/@tomlarkworthy/metaprogramming#constant_string"
)});
  main.variable(observer("promise")).define("promise", function(){return(
new Promise((resolve) => resolve("promised"))
)});
  main.variable(observer("promise_err")).define("promise_err", function(){return(
new Promise((resolve, reject) => reject("rejected"))
)});
  main.variable(observer("generator")).define("generator", function*(){return(
yield* new Set([1, 2, 3])
)});
  main.variable(observer("dependentGenerator")).define("dependentGenerator", ["generator"], function(generator){return(
generator + 1
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Imports`
)});
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  const child2 = runtime.module(define2);
  main.import("signature", child2);
  main.variable(observer("observablehq")).define("observablehq", ["require"], function(require){return(
require("@observablehq/runtime@4")
)});
  return main;
}
