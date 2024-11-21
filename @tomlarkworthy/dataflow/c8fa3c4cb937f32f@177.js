function _1(md){return(
md`# Dataflow

This is an experimental tool for working with [Observable dataflow](/@observablehq/how-observable-runs). I may add more tools in the future. Please leave a comment to share your thoughts.`
)}

function _2(md){return(
md`## importCell

This function imports the given cell from the given notebook (the *specifier* is at-login slash slug for public notebooks, a hex identifier for shared notebooks, or a URL to an ES module). It returns a generator that yields the cell’s value. If you like, you can also pass an object of named *injections* to override the imported notebook’s other cell values; this is useful, for example, to inject data into a reusable chart template.`
)}

function _importCell(importCells){return(
async function importCell(
  cell, // e.g., "chart"
  notebook, // e.g., "@d3/bar-chart" or "8d5ef3030dfd3bad"
  injections = {} // e.g., {data: [{name, value}, …]}
) {
  return (await importCells([cell], notebook, injections))[0];
}
)}

function _importCells(Library,require,Runtime,Generators){return(
async function importCells(
  cells = [], // e.g., ["chart"]
  notebook, // e.g., "@d3/bar-chart" or "8d5ef3030dfd3bad"
  injections = {} // e.g., {data: [{name, value}, …]}
) {
  // Instantiate a new runtime, but reuse the existing runtime’s require.
  // (This is ensures that any requires in imports still work.)
  const library = Object.assign(new Library(), { require: () => require });
  const runtime = new Runtime(library);

  // Create the main module, including any injected values.
  const main = runtime.module();
  for (const name in injections) {
    main.define(name, [], () => injections[name]);
  }

  // Load the requested notebook’s definition as an ES module.
  const origin = `https://api.observablehq.com`;
  const {
    default: define
  } = await import(/^@[0-9a-z_-]+\/[0-9a-z_-]+(\/\d+)?([@~]|$)/.test(
    (notebook += "")
  )
    ? `${origin}/${notebook}.js?v=3`
    : /^[0-9a-f]{16}([@~]|$)/.test(notebook)
    ? `${origin}/d/${notebook}.js?v=3`
    : notebook);

  // Create the imported notebook’s module, and then derive a module
  // from it to inject the desired values. (If there are none, then
  // this is basically a noop.)
  const imported = runtime.module(define);
  const derived = imported.derive([...Object.keys(injections)], main);
  let disposed = 0;
  return cells.map(cell =>
    // In many cases the imported cell will only have a single value, but
    // we must use the most generic representation (an async generator) as
    // the imported cell may be an async generator, or may reference one.
    Generators.observe(notify => {
      // Create the primary variable with an observer that will report the
      // desired cell’s fulfilled or rejected values.
      main
        .variable({
          fulfilled(value) {
            notify(value);
          },
          rejected(value) {
            notify(Promise.reject(value));
          }
        })
        .import(cell, derived);
      return () => {
        disposed++;
        // Lastly, when all generators are disposed, dispose the runtime to
        // ensure that any imported generators terminate.
        if (disposed === cells.length) runtime.dispose();
      };
    })
  );
}
)}

function _5(md){return(
md`Let’s look at a few examples.

Here’s importing a [D3 bar chart](/@d3/bar-chart) as-is. This is equivalent to Observable’s standard import-syntax, except you don’t need an additional cell to render the chart (assuming you’ve already imported *importCell*).`
)}

function _6(importCell){return(
importCell("chart", "@d3/bar-chart")
)}

function _7(md){return(
md`Now let’s inject some values, substituting our own definitions of *height* and *color*. To know what values can be injected, refer to the notebook.`
)}

function _8(importCell){return(
importCell("chart", "@d3/bar-chart", {height: 200, color: "brown"})
)}

function _9(md){return(
md`The values we inject can be promises (or even generators)! Observable takes care of the dataflow. Here I’m replacing the data in a horizontal bar chart with data from an attached CSV file. I rename the columns (*years* and *population*) to match the expected shape of the imported chart (*name* and *value*) using [d3.csvParse](https://github.com/d3/d3-dsv/blob/master/README.md#dsv_parse)’s row accessor.`
)}

async function _10(importCell,d3,FileAttachment){return(
importCell(
  "chart", 
  "@d3/horizontal-bar-chart",
  {
    margin: {
      top: 20, 
      right: 20, 
      bottom: 0, 
      left: 40
    },
    data: d3.csvParse(
      await FileAttachment("us-population-by-age.csv").text(), 
      (({years, population}) => ({name: years, value: +population}))
    )
  }
)
)}

function _11(md){return(
md`In the next cell we create a *histogram* helper function, wrapping an import of the [D3 histogram example](/@d3/histogram) and passing in the specified *data* and any optional *options*. This allows us to quickly generate as many histograms as we like.`
)}

function _histogram(importCell){return(
(data, options) => importCell("chart", "@d3/histogram", {...options, data})
)}

function _13(histogram){return(
histogram(Array.from({length: 1000}, Math.random))
)}

function _14(md){return(
md`---

## Appendix`
)}

function _observablehq(require){return(
require("@observablehq/runtime@4")
)}

function _Runtime(observablehq){return(
observablehq.Runtime
)}

function _Library(observablehq){return(
observablehq.Library
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["us-population-by-age.csv", {url: new URL("./files/3326c1f150303231e73c8c38a0f7a19db2cdd8c6291566f90b35d6b04a86fb38cc7ab08fab76b7bf9b0856bb07fa353e948bc11a6d4f36b49d9730512a37e960.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("importCell")).define("importCell", ["importCells"], _importCell);
  main.variable(observer("importCells")).define("importCells", ["Library","require","Runtime","Generators"], _importCells);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["importCell"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["importCell"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["importCell","d3","FileAttachment"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("histogram")).define("histogram", ["importCell"], _histogram);
  main.variable(observer()).define(["histogram"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("observablehq")).define("observablehq", ["require"], _observablehq);
  main.variable(observer("Runtime")).define("Runtime", ["observablehq"], _Runtime);
  main.variable(observer("Library")).define("Library", ["observablehq"], _Library);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
