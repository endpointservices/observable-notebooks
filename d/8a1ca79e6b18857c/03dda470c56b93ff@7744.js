import define1 from "./0e0b35a92c819d94@471.js";
import define2 from "./e1c39d41e8e944b0@939.js";
import define3 from "./e3a019069a130d79@5581.js";
import define4 from "./f92778131fd76559@1208.js";
import define5 from "./cdc303fcc82a630f@262.js";
import define6 from "./048a17a165be198d@271.js";
import define7 from "./54df2436d8585ee6@24.js";
import define8 from "./56b204c6d7cdb801@32.js";

function _1(md){return(
md`# Exporter: A Single File Notebook Serializer
## [video explainer](https://www.youtube.com/watch?v=wx93r1pY_6Y)


Serialize literate computational notebooks with their dependancies into single files. Double click to open locally. No server required, works in a \`file://\` context for simplicity.

- **File-first** representation. The [Observable Runtime](https://github.com/observablehq/runtime) and common builtins like \`Inputs\`, \`htl\`, \`highlight\`, \`_\` (lodash) and \`markdown\` are bundled for offline operation. directly push to S3 or S3-like too if you want 
- **Recursive and self-sustaining**, the exporter is implemented in userspace and can be invoked again after exporting.
- **Fast**, single file notebooks open fast!
- **Moldable**, the file format is uncompressed, readable, editable with a text editor, and diffable by Git. 
- **Runtime-as-the-source-of-truth**, format derived from the live [Obervable Runtime](https://github.com/observablehq/runtime) representation.
`
)}

function _parameters(Inputs,exporter,localStorageView){return(
Inputs.bind(
  exporter(),
  localStorageView(`exporter-${document.baseURI}`, {
    json: true,
    defaultValue: exporter().value
  })
)
)}

function _3(md){return(
md`## Usage Guide

You can use the UI here to export any Observable notebook to a single file. But that's not the coolest thing.

If you include the exporter in the notebook to be exported, you will enable recursive exporting. You can get a feel for that by running the exporter in *this* notebook. Try clicking "Preview" which will open an in-memory copy of a notebook exporter in a new browser tab in a \`blob://\` url. You can keep pressing "Preview"!.

To put the exporter in one of your notebooks, first import the UI builder. 
\`\`\`js
import {exporter } from '@tomlarkworthy/exporter'
\`\`\`

Then call the builder to make the UI. You don't need to pass any options, but the options is where you can customise the output format.
\`\`\`js
exporter({
  handler: (action, state) => {...} // Optional UI click handler
})
\`\`\`

If you want it to remember your settings, its a [composite view](https://observablehq.com/@tomlarkworthy/view) so you can script it or bind it to a storage solution, _e.g._

\`\`\`js
viewof parameters = Inputs.bind(
  exporter(),
  localStorageView(\`exporter-${document.baseURI}\`, {
    json: true,
    defaultValue: exporter().value
  })
)
\`\`\``
)}

function _4(md){return(
md`## Lope Format Specification

The HTML file is split into several \`<script>\` blocks that have different purposes.

### FileAttachments

File attachments are static assets encoded as a base64 strings with some metadata to understand the content-type and their URL.

~~~html
<script type="lope-file"            
        id="https://static.observableusercontent.com/files/..."          
        file="runtime.js.gz"
        module="@tomlarkworthy/exporter"
        mime="application/gzip">
...base64 encoded string
</script>
~~~

### Modules

Modules are serialised Observable notebooks that are loaded into the runtime. The content of these look similar to the format used in the 1st party [download code](https://observablehq.com/@observablehq/advanced-embeds) feature. The contain cell definitions, and a module's [\`define\`](https://github.com/observablehq/runtime?tab=readme-ov-file#runtimemoduledefine-observer) which can import them into a running Runtime instance.

~~~html
<script type="lope-module"            
        id="@tomlarkworthy/exporter"          
        file="runtime.js.gz">
...lots of Javascript
</script>
~~~

### Bootloader

The bootloader is normal \`<script type="application/javascript">\` block that initialises the notebook. It has a few phases
1. Discovers all the modules and builds \`blob://\` URLs for them.
2. Creates an *importmap* from notebook urls to \`lope-module\` blob URLs.
4. Creates a javascript *module* to execute *after* the \`importmap\`
   1. Sets up a custom Observable Runtime Library defaulting to exporter bundled dependancies.
   2. Starts the Observable Runtime with the standard inspector.

The ordering and types of javascript are important. By putting notebook source under the type \`lope-module\` it is not interpreted as javascript by the browser. So the first real code to execute is the \`importmap\`. By running the Observable runtime inside a \`module\` script, the ESM imports in modules are resolved using the \`importmap\`.
  
### Style sheet

Two style sheets define the look, one is the [inspector css](https://github.com/observablehq/inspector/blob/main/src/style.css) and the other is one I made up as I don't think the original Observable stylesheet is open-source.`
)}

function _5(md){return(
md`## Debugging

To help understand the information flow, the bundling processes is implemented as reactive dataflow, so you can inspect the steps after you serialize. To help composability, that dataflow is encapsulated into a promise using [@tomlarkworthy/flow-queue](https://observablehq.com/@tomlarkworthy/flow-queue).

While helpful, the dataflow is not enough to debug problems! The Javascript \`debugger\` statement is placed at parts of the code that *should never happen*™️. If you are lucky, simply serializing a notebook with the developer tools open might lead you straight to the problem areas.

Furthermore, when debugging difficult cases I add additional \`debugger\` statements conditioned on the execution context. As Observable is executing Javascript, the browser's developer tool features like \`debugger\` and REPL are invaluable tools to track down bugs and gather more information at problem sites.`
)}

function _6(md){return(
md`### TODO
- Bug: Forking doesn't work offline (it loads assets from the original URL)
- Bug: Every recursive cycle more imports cells are created
- Improve: Set S3 URL in arg
- Improve: UI could be better sized on mobile
- Improve: Refactor the bootloader so its not an inline string. (would avoids some escaping issues)
- Improve: render final template in iframe first? Could shorten the debug cycle

### Known Issues
  - Doesn't work for \`with\` clauses in imports. Fixing is not a priority, they are complex.`
)}

function _7(exporter){return(
exporter()
)}

function _exporter(actionHandler,variable,domView,view,diskImgUrl,Inputs,createShowable,top120List,reportValidity,invalidation,bindOneWay){return(
({ handler = actionHandler } = {}) => {
  const handlerVar = variable(handler);
  const feedback = domView();
  const spinner = async (...args) => {
    try {
      ui.querySelector(".disk-image").classList.add("spinning");
      await handler(...args, (cb) => (feedback.value = cb));
      ui.querySelector(".disk-image").classList.remove("spinning");
    } catch (e) {
      ui.querySelector(".disk-image").classList.remove("spinning");
      throw e;
    }
  };
  const ui = view`<div class="moldbook-exporter" style="max-width: 450px;">
    <style>
      .observablehq:has(> .moldbook-exporter){
        padding: 0px;
      }
      .moldbook-exporter {
        background: linear-gradient(#333, #111, #333);
        border-radius: 6px;
        padding: 2px;
        font-size: 0.8rem;
      }
      .moldbook-exporter button {
        background: black;
        color: white;
        height: 20px;
        font-size: 0.7rem;
      }
      .moldbook-exporter form {
        width: auto;
      }
      .moldbook-exporter :is(select,input) {
        color: black;
      }
      .moldbook-exporter .moldbook-dark {
        background: black;
        color: white;
      }

      .moldbook-exporter .moldbook-dark :is(select,input) {
        font-size: 0.5rem;
      }

      @keyframes spin {
        from {
          transform: rotateY(0deg);
        }
      
        to {
          transform: rotateY(180deg);
        }
      }
      .moldbook-exporter .spinning {
          transform-style: preserve-3d;
          animation-name: spin;
          animation-duration: 0.2s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: alternate;  
      }
    </style>
    ${["handler", handlerVar]}
    <div style="display: flex; "> 
      <img class="disk-image"
                  style="width: 50px;
                  height: 100%;
                  border-radius: 1px;"
            src=${diskImgUrl}
        ></img>
      <div style="width: 10px"></div>
      <div style="width: 100%">
        <div style="background: yellow;">
          <span style="display: flex;
                       align-items: center;
                       margin-left: 5px">
            notebook to export:
            <div style="flex-grow:1"></div>
            ${[
              "source",
              Inputs.select(
                ["this notebook", "a notebook url", "the top 100"],
                {
                  width: 100
                }
              )
            ]}
          </span>
          ${[
            "notebook_url",
            createShowable(
              Inputs.text({
                value: "",
                placeholder: "https://observablehq.com/@tomlarkworthy/exporter"
              })
            )
          ]}
          ${["top_100", createShowable(Inputs.select(top120List))]}
        </div>
        <div class="moldbook-dark">
          <div>
            ${[
              "s3Params",
              createShowable(
                view`<div>
                  ${[
                    "url",
                    reportValidity(
                      Inputs.text({
                        label: "S3 Object URL",
                        placeholder:
                          "https://<BKT>.s3.<REGION>.amazonaws.com/moldbook.html",
                        pattern: "https?://.*"
                      }),
                      invalidation
                    )
                  ]}
                  ${[
                    "accessKeyId",
                    reportValidity(
                      Inputs.text({
                        label: "access key id",
                        placeholder: ""
                      }),
                      invalidation
                    )
                  ]}
                  ${[
                    "secretAccessKey",
                    reportValidity(
                      Inputs.password({
                        label: "secret access key",
                        placeholder: ""
                      }),
                      invalidation
                    )
                  ]}
                </div>`
              )
            ]}
            <div style="display: flex;
                        gap: 5px;
                        justify-content: flex-end;
                        align-items: center;
                        margin-left: 5px;">
              output:
              <div style="flex-grow:1"></div>
              ${[
                "blob",
                Inputs.button("Preview", {
                  reduce: () => spinner("tab", ui.value)
                })
              ]}
              ${[
                "html",
                Inputs.button("Download", {
                  reduce: () => spinner("file", ui.value)
                })
              ]}
              ${[
                "s3",
                Inputs.button("S3", {
                  reduce: () =>
                    ui.value.s3Params.child.url && spinner("s3", ui.value)
                })
              ]}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="background: white;">
      ${feedback}
    </div>
  </div>`;

  bindOneWay(ui.notebook_url.show, ui.source, {
    transform: (src) => src === "a notebook url"
  });
  bindOneWay(ui.top_100.show, ui.source, {
    transform: (src) => src === "the top 100"
  });
  bindOneWay(ui.s3Params.show, ui.s3, {
    transform: (src) => !ui.value.s3Params.show || ui.value.s3Params.child.url
  });
  return ui;
}
)}

function _actionHandler(Inputs,main,forcePeek,getSourceModule,$0,view,html,AwsClient,ReadableStream,CompressionStream,Response,md){return(
async (action, state, feedback_callback) => {
  debugger;
  feedback_callback(Inputs.textarea({ value: `Generating source...\n` }));

  // Force observation of response
  [...main._runtime._variables]
    .filter((v) => v._name == "tomlarkworthy_exporter_task")
    .map(forcePeek);

  const module = await getSourceModule(state);
  const { source, report } = await $0.send({
    module
  });

  const fileToId = report.reduce((acc, row) => {
    acc[row.file] = row.id;
    return acc;
  }, {});
  feedback_callback(
    view`
      <center><b>FileAttachment</b></center>
      ${Inputs.table(
        report.filter((f) => f.file),
        {
          columns: ["file", "size"],
          width: { file: "80%", size: "20%" },
          format: {
            file: (f) => html`<a target="_blank" href=${fileToId[f]}>${f}`
          },
          sort: "size",
          reverse: true
        }
      )}
      <center><b>Modules</b></center>
      ${Inputs.table(
        report.filter((f) => !f.file),
        {
          columns: ["id", "size"],
          width: { id: "80%", size: "20%" },
          sort: "size",
          reverse: true
        }
      )}
    `
  );

  if (action === "tab") {
    const url = URL.createObjectURL(new Blob([source], { type: "text/html" }));
    window.open(url, "_blank");
  } else if (action === "file") {
    const url = URL.createObjectURL(new Blob([source], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.html";
    a.click();
    URL.revokeObjectURL(url);
  } else if (action === "s3") {
    const client = new AwsClient({
      accessKeyId: state.s3Params.child.accessKeyId,
      secretAccessKey: state.s3Params.child.secretAccessKey
    });
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(source));
        controller.close();
      }
    });

    // Compress using the CompressionStream API
    const gzipStream = new CompressionStream("gzip");
    const compressedStream = readableStream.pipeThrough(gzipStream);

    // Wrap the compressed stream in a Blob
    const compressedBlob = new Response(compressedStream).blob();

    // Upload the compressed Blob
    const response = await client.fetch(state.s3Params.child.url, {
      method: "PUT",
      body: await compressedBlob,
      headers: {
        "Content-Encoding": "gzip",
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, public, max-age=31536000"
      }
    });

    if (response.status == 200) window.open(state.s3Params.child.url, "_blank");
    else {
      feedback_callback(md`~~~\n${await response.text()}\n~~~`);
    }
  }
}
)}

function _getSourceModule(main){return(
async (state) => {
  if (state.source == "this notebook") return main;
  const url =
    state.source == "a notebook url"
      ? state.notebook_url.child
      : state.top_100.child;

  const notebook = url.replace("https://observablehq.com/", "");

  const [{ Runtime, Inspector }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/${notebook}.js?v=4`)
  ]);
  return new Runtime().module(define);
}
)}

function _createShowable(variable,view){return(
function createShowable(child, { show = true } = {}) {
  const showVariable = variable(show, { name: "show" });
  const showable = view`<div>${["show", showVariable]}${["child", child]}`;

  // The showable logic is to toggle the visibility of the enclosing div based
  // on the show variable state
  const updateDisplay = () => {
    if (showVariable.value) {
      showable.style.display = "inline";
    } else {
      showable.style.display = "none";
    }
  };
  // Variables have additional assign event so presentation can be
  // updated as soon as variables change but before dataflow
  // because this is a pure presentation state it makes sense not to trigger
  // dataflow so we do not use 'input' event
  showVariable.addEventListener("assign", updateDisplay);

  updateDisplay();
  return showable;
}
)}

function _reportValidity(){return(
(view, invalidation) => {
  const input = view.querySelector("input");
  const report = () => view.reportValidity();
  input.addEventListener("input", report);
  invalidation.then(() => input.removeEventListener("input", report));
  return view;
}
)}

function _top120List(){return(
[
  ...[
    "https://observablehq.com/@jashkenas/inputs",
    "https://observablehq.com/@d3/gallery",
    "https://observablehq.com/@d3/learn-d3",
    "https://observablehq.com/@makio135/creative-coding",
    "https://observablehq.com/@observablehq/module-require-debugger",
    "https://observablehq.com/@d3/zoomable-sunburst",
    "https://observablehq.com/@observablehq/plot",
    "https://observablehq.com/@tmcw/enigma-machine",
    "https://observablehq.com/@d3/force-directed-graph-component",
    "https://observablehq.com/@d3/bar-chart-race-explained",
    "https://observablehq.com/@observablehq/data-wrangler",
    "https://observablehq.com/@d3/collapsible-tree",
    "https://observablehq.com/@sxywu/introduction-to-svg-and-d3-js",
    "https://observablehq.com/@d3/sankey-component",
    "https://observablehq.com/@d3/zoomable-circle-packing",
    "https://observablehq.com/@d3/selection-join",
    "https://observablehq.com/@bstaats/graph-visualization-introduction",
    "https://observablehq.com/@d3/color-legend",
    "https://observablehq.com/@uwdata/introducing-arquero",
    "https://observablehq.com/@mbostock/10-years-of-open-source-visualization",
    "https://observablehq.com/@nitaku/tangled-tree-visualization-ii",
    "https://observablehq.com/@makio135/give-me-colors",
    "https://observablehq.com/@johnburnmurdoch/bar-chart-race-the-most-populous-cities-in-the-world",
    "https://observablehq.com/@d3/color-schemes",
    "https://observablehq.com/@tezzutezzu/world-history-timeline",
    "https://observablehq.com/@d3/calendar",
    "https://observablehq.com/@observablehq/a-taste-of-observable",
    "https://observablehq.com/@d3/bar-chart-race",
    "https://observablehq.com/@mourner/martin-real-time-rtin-terrain-mesh",
    "https://observablehq.com/@uwdata/introduction-to-vega-lite"
  ],
  ...[
    "https://observablehq.com/@mbostock/voronoi-stippling",
    "https://observablehq.com/@ben-tanen/a-tutorial-to-using-d3-force-from-someone-who-just-learned-ho",
    "https://observablehq.com/@d3/hierarchical-edge-bundling",
    "https://observablehq.com/@observablehq/introduction-to-data",
    "https://observablehq.com/@harrystevens/directly-labelling-lines",
    "https://observablehq.com/@observablehq/summary-table",
    "https://observablehq.com/@observablehq/plot-cheatsheets",
    "https://observablehq.com/@tomshanley/cheysson-color-palettes",
    "https://observablehq.com/@tophtucker/inferring-chart-type-from-autocorrelation-and-other-evils",
    "https://observablehq.com/@mitvis/introduction-to-d3",
    "https://observablehq.com/@veltman/watercolor",
    "https://observablehq.com/@veltman/centerline-labeling",
    "https://observablehq.com/@mbostock/scrubber",
    "https://observablehq.com/@observablehq/electoral-college-decision-tree",
    "https://observablehq.com/@d3/tree-component",
    "https://observablehq.com/@d3/radial-tree-component",
    "https://observablehq.com/@d3/world-tour",
    "https://observablehq.com/@observablehq/introduction-to-generators",
    "https://observablehq.com/@yurivish/peak-detection",
    "https://observablehq.com/@mkfreeman/plot-tooltip",
    "https://observablehq.com/@aboutaaron/racial-demographic-dot-density-map",
    "https://observablehq.com/@mbostock/methods-of-comparison-compared",
    "https://observablehq.com/@rreusser/gpgpu-boids",
    "https://observablehq.com/@rreusser/2d-n-body-gravity-with-poissons-equation",
    "https://observablehq.com/@bumbeishvili/data-driven-range-sliders",
    "https://observablehq.com/@observablehq/introducing-visual-dataflow",
    "https://observablehq.com/@observablehq/vega-lite",
    "https://observablehq.com/@observablehq/observable-for-jupyter-users",
    "https://observablehq.com/@observablehq/how-observable-runs",
    "https://observablehq.com/@unkleho/introducing-d3-render-truly-declarative-and-reusable-d3"
  ],
  ...[
    "https://observablehq.com/@vega/a-guide-to-guides-axes-legends-in-vega",
    "https://observablehq.com/@bartok32/diy-inputs",
    "https://observablehq.com/@mbostock/polar-clock",
    "https://observablehq.com/@dakoop/learn-js-data",
    "https://observablehq.com/@mbostock/manipulating-flat-arrays",
    "https://observablehq.com/@uwdata/an-illustrated-guide-to-arquero-verbs",
    "https://observablehq.com/@daformat/rounding-polygon-corners",
    "https://observablehq.com/@yurivish/seasonal-spirals",
    "https://observablehq.com/@emamd/animating-lots-and-lots-of-circles-with-regl-js",
    "https://observablehq.com/@uwdata/data-visualization-curriculum",
    "https://observablehq.com/@d3/d3-group",
    "https://observablehq.com/@d3/tree-of-life",
    "https://observablehq.com/@d3/arc-diagram",
    "https://observablehq.com/@d3/choropleth",
    "https://observablehq.com/@mattdzugan/generative-art-using-wind-turbine-data",
    "https://observablehq.com/@jashkenas/handy-embed-code-generator",
    "https://observablehq.com/@analyzer2004/plot-gallery",
    "https://observablehq.com/@nsthorat/how-to-build-a-teachable-machine-with-tensorflow-js",
    "https://observablehq.com/@d3/sunburst-component",
    "https://observablehq.com/@tomlarkworthy/saas-tutorial",
    "https://observablehq.com/@mbostock/the-wealth-health-of-nations",
    "https://observablehq.com/@yy/covid-19-fatality-rate",
    "https://observablehq.com/@bryangingechen/importing-data-from-google-spreadsheets-into-a-notebook-we",
    "https://observablehq.com/@mbostock/slide",
    "https://observablehq.com/@kerryrodden/sequences-sunburst",
    "https://observablehq.com/@d3/zoom-to-bounding-box",
    "https://observablehq.com/@ambassadors/interactive-plot-dashboard",
    "https://observablehq.com/@sethpipho/fractal-tree",
    "https://observablehq.com/@mbostock/saving-svg",
    "https://observablehq.com/@analyzer2004/west-coast-weather-from-seattle-to-san-diego"
  ],
  ...[
    "https://observablehq.com/@tmcw/tables",
    "https://observablehq.com/@observablehq/introduction-to-serverless-notebooks",
    "https://observablehq.com/@mootari/range-slider",
    "https://observablehq.com/@d3/animated-treemap",
    "https://observablehq.com/@d3/treemap-component",
    "https://observablehq.com/@uwdata/interaction",
    "https://observablehq.com/@hydrosquall/d3-annotation-with-d3-line-chart",
    "https://observablehq.com/@jiazhewang/introduction-to-antv",
    "https://observablehq.com/@d3/hierarchical-bar-chart",
    "https://observablehq.com/@uwdata/data-types-graphical-marks-and-visual-encoding-channels",
    "https://observablehq.com/@observablehq/why-use-a-radial-data-visualization",
    "https://observablehq.com/@kerryrodden/introduction-to-text-analysis-with-tf-idf",
    "https://observablehq.com/@uw-info474/javascript-data-wrangling",
    "https://observablehq.com/@karimdouieb/try-to-impeach-this-challenge-accepted",
    "https://observablehq.com/@observablehq/plot-gallery",
    "https://observablehq.com/@carmen-tm/women-architects-i-didnt-hear-about",
    "https://observablehq.com/@d3/versor-dragging",
    "https://observablehq.com/@analyzer2004/timespiral",
    "https://observablehq.com/@d3/brushable-scatterplot-matrix",
    "https://observablehq.com/@observablehq/require",
    "https://observablehq.com/@anjana/functional-javascript-first-steps",
    "https://observablehq.com/@hamzaamjad/tiny-charts",
    "https://observablehq.com/@observablehq/views",
    "https://observablehq.com/@yurivish/quarantine-now",
    "https://observablehq.com/@analyzer2004/performance-chart",
    "https://observablehq.com/@freedmand/sounds",
    "https://observablehq.com/@d3/bubble-chart-component",
    "https://observablehq.com/@d3/mobile-patent-suits",
    "https://observablehq.com/@observablehq/notebook-visualizer",
    "https://observablehq.com/@d3/force-directed-tree"
  ]
]
)}

function _notebook_style(htl){return(
htl.html`<style>/* General layout with max-width */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.observablehq {
  border: 1px solid #e0e0e0;
  border-radius: 2px; 
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
  margin: 1.25rem 0 0.75rem;
  line-height: 1.25;
  font-weight: 600;
}
/* General layout */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
font-size: 1rem;
line-height: 1.4;
color: #333;
max-width: 100%;
margin: 0 auto;
background-color: #f8f9fa;
border: 1px solid #e0e0e0;
border-radius: 6px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
  margin: 1.25rem 0 0.75rem;
  line-height: 1.25;
  font-weight: 600;
}

h1 { font-size: 1.75rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.25rem; }

/* Paragraphs */
p {
  margin: 0 0 1rem;
  word-wrap: break-word;
}

/* Code blocks */
pre, code {
  font-family: Menlo, Consolas, Monaco, "Courier New", monospace;
  font-size: 0.95rem;
  background: #f1f3f5;
  color: #2e2e2e;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  overflow-x: auto;
}

pre {
  padding: 0.75rem;
  margin: 0 0 1rem;
}

/* Inline code */
code {
  font-size: 0.9rem;
  padding: 0.2rem 0.4rem;
  background: #f9f9f9;
  color: #c7254e;
}

/* Lists */
ul, ol {
  margin: 0 0 1rem 1.25rem;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

/* Links */
a {
  color: #007bff;
  text-decoration: underline;
}

a:hover {
  color: #0056b3;
  text-decoration: none;
}

/* Table styling */
table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-top: 1px solid #dee2e6;
}

th {
  background-color: #f1f3f5;
  font-weight: bold;
}

figure img {
  max-width: 100%;
}


/* Responsive adjustments */
@media (max-width: 768px) {
  font-size: 0.95rem;
  padding: 0.75rem;

  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.25rem; }
  h3 { font-size: 1.1rem; }
}
</style>`
)}

function _inspector_css(htl){return(
htl.html`<style>
:root {
  --syntax_normal: #1b1e23;
  --syntax_comment: #a9b0bc;
  --syntax_number: #20a5ba;
  --syntax_keyword: #c30771;
  --syntax_atom: #10a778;
  --syntax_string: #008ec4;
  --syntax_error: #ffbedc;
  --syntax_unknown_variable: #838383;
  --syntax_known_variable: #005f87;
  --syntax_matchbracket: #20bbfc;
  --syntax_key: #6636b4;
  --mono_fonts: 82%/1.5 Menlo, Consolas, monospace;
}

.observablehq--expanded,
.observablehq--collapsed,
.observablehq--function,
.observablehq--import,
.observablehq--string:before,
.observablehq--string:after,
.observablehq--gray {
  color: var(--syntax_normal);
}

.observablehq--collapsed,
.observablehq--inspect a {
  cursor: pointer;
}

.observablehq--field {
  text-indent: -1em;
  margin-left: 1em;
}

.observablehq--empty {
  color: var(--syntax_comment);
}

.observablehq--keyword,
.observablehq--blue {
  color: #3182bd;
}

.observablehq--forbidden,
.observablehq--pink {
  color: #e377c2;
}

.observablehq--orange {
  color: #e6550d;
}

.observablehq--null,
.observablehq--undefined,
.observablehq--boolean {
  color: var(--syntax_atom);
}

.observablehq--number,
.observablehq--bigint,
.observablehq--date,
.observablehq--regexp,
.observablehq--symbol,
.observablehq--green {
  color: var(--syntax_number);
}

.observablehq--index,
.observablehq--key {
  color: var(--syntax_key);
}

.observablehq--prototype-key {
  color: #aaa;
}

.observablehq--empty {
  font-style: oblique;
}

.observablehq--string,
.observablehq--purple {
  color: var(--syntax_string);
}

.observablehq--error,
.observablehq--red {
  color: #e7040f;
}

.observablehq--inspect {
  font: var(--mono_fonts);
  overflow-x: auto;
  display: block;
  white-space: pre;
}

.observablehq--error .observablehq--inspect {
  word-break: break-all;
  white-space: pre-wrap;
}
</style>`
)}

function _16(md){return(
md`### Single File Notebook Generator Flow`
)}

function _task(flowQueue){return(
flowQueue({ timeout_ms: 10000 })
)}

function _main_module(task){return(
task.module
)}

function _runtime_variables(main_module,variableToObject){return(
[...main_module._runtime._variables].map(variableToObject)
)}

function _forcePeek(){return(
(variable) => {
  if (variable._value) return variable._value;
  let peeker;
  const promise = new Promise((resolve) => {
    peeker = variable._module.variable({}).define([variable._name], (m) => {
      resolve(m);
    });
  });
  promise.then((v) => peeker.delete());
  return promise;
}
)}

async function _module_definition_variables(main_module,forcePeek)
{
  let last_module_count = -1;
  let module_definition_variables = [];
  while (last_module_count < module_definition_variables.length) {
    last_module_count = module_definition_variables.length;
    module_definition_variables = await Promise.all(
      [...main_module._runtime._variables]
        .filter((v) => v._name && v._name.startsWith("module "))
        .filter((v) => !v._name.startsWith("module <unknown"))
        .map(async (v) => {
          console.log("loading", v._name);
          await forcePeek(v); // force module to load, may cause others to load
          return v;
        })
    );
  }
  return module_definition_variables;
}


function _main_cells(module_definition_variables,cellMap,main_module)
{
  module_definition_variables; // make sure modules loaded first
  debugger;
  return cellMap(main_module);
}


function _unresolved_main_modules(main_cells){return(
new Map(
  [...main_cells.entries()].filter(
    ([name, vars]) =>
      typeof name == "string" && name.startsWith("module <unknown")
  )
)
)}

function _pageImports(main_module,parser){return(
main_module &&
  new Map(
    [...document.querySelectorAll(".observablehq--import")]
      .map((e) => parser.parseCell(e.textContent))
      .map((node) => [
        node.body.source.value,
        node.body.specifiers.map((s) => ({
          ast: s,
          local: s.local.name,
          imported: s.imported.name
        }))
      ])
  )
)}

async function _pageImportMatcher(unresolved_main_modules,pageImports,sourceModule)
{
  const toDo = [...unresolved_main_modules.entries()].sort(
    ([_a, a], [_b, b]) => b.length - a.length
  ); // sort by length so we match on hardest first
  const matches = [];
  const unmatcheds = [];
  const moduleLookup = [];
  const resolution = [];
  while (toDo.length > 0) {
    const [name, variables] = toDo.shift();
    const match = pageImports.entries().find(([url, specifiers]) => {
      // looking for an import that has all the required variables
      return variables.every((v) =>
        specifiers.find((s) => {
          return s.local == v._name.split(" ").at(-1);
        })
      );
    });
    if (match) {
      const module = await sourceModule(variables[0]);
      matches.push([
        module,
        {
          name: match[0],
          variables,
          cell: name,
          spefifiers: match[1]
        }
      ]);
      resolution.push([name, match[0]]);
      moduleLookup.push([module, match[0]]);
    } else {
      unmatcheds.push([name, variables]);
    }
  }
  return {
    matches: new Map(matches),
    moduleLookup: new Map(moduleLookup),
    resolution: new Map(resolution),
    unmatcheds
  };
}


function _other_modules_unfiltered(main_module,module_definition_variables,findModuleName,pageImportMatcher){return(
[...main_module._runtime._modules.entries()]
  .filter(([define, module]) => module != main_module)
  .map(([define, module]) => {
    // find module that imports it
    const module_definition_variable = module_definition_variables.find(
      (v) => v._value == module
    );
    return {
      define,
      module_definition_variable,
      module,
      name: module_definition_variable
        ? findModuleName(module_definition_variable._module._scope, module)
        : pageImportMatcher.moduleLookup.get(module) || "TBD"
    };
  })
)}

function _excluded_module_names(){return(
["TBD", "error"]
)}

function _excluded_modules(other_modules_unfiltered,excluded_module_names){return(
other_modules_unfiltered.filter((m) =>
  excluded_module_names.includes(m.name)
)
)}

function _included_modules(other_modules_unfiltered,excluded_module_names){return(
other_modules_unfiltered.filter(
  (m) => !excluded_module_names.includes(m.name)
)
)}

function _findImports(pageImportMatcher){return(
(cells) =>
  [...cells.keys()]
    .filter((name) => typeof name === "string" && name.startsWith("module "))
    .map((name) => pageImportMatcher.resolution.get(name) || name)
    .map((name) => name.replace("module ", ""))
)}

function _getFileAttachments(){return(
(module) => {
  let fileMap;
  const FileAttachment = module._builtins.get("FileAttachment");
  const backup_get = Map.prototype.get;
  const backup_has = Map.prototype.has;
  Map.prototype.has = Map.prototype.get = function (...args) {
    fileMap = this;
  };
  try {
    FileAttachment("");
  } catch (e) {}
  Map.prototype.has = backup_has;
  Map.prototype.get = backup_get;
  return fileMap;
}
)}

async function _module_specs(main_module,included_modules,cellMap,pageImportMatcher,findImports,getFileAttachments,main,generate_module_source){return(
new Map(
  await Promise.all(
    [{ name: "main", module: main_module }, ...included_modules].map(
      async (spec) => {
        console.log("Generating spec for " + spec.name);
        const cells = await cellMap(spec.module, {
          extraModuleLookup: pageImportMatcher.moduleLookup
        });
        const imports = findImports(cells);
        const fileAttachments = getFileAttachments(spec.module) || new Map();
        if (spec.name == "main") {
          getFileAttachments(main).forEach((value, key) =>
            fileAttachments.set(key, value)
          );
        }
        const source = await generate_module_source(
          spec.module._scope,
          cells,
          fileAttachments,
          {
            extraModuleLookup: pageImportMatcher.moduleLookup
          }
        );
        return [
          spec.name,
          {
            url: spec.name,
            imports,
            fileAttachments,
            source: source,
            cells,
            module: spec.module,
            define: spec.define
          }
        ];
      }
    )
  )
)
)}

function _33(Inputs,module_specs){return(
Inputs.table(
  [
    ...module_specs.entries().map(([name, spec]) => ({
      name,
      source: spec.source.length,

      imports: spec.imports,
      fileAttachments: spec.fileAttachments
    }))
  ],
  {
    width: {
      name: 250,
      source: 50
    },
    format: {
      fileAttachments: (f) =>
        !f
          ? "none"
          : Inputs.table([
              ...f.entries().map(([name, f]) => ({ name, url: f.url || f }))
            ]),

      imports: (f) => Inputs.table(f.map((i) => ({ name: i })))
    }
  }
)
)}

function _book(lopebook,module_specs){return(
lopebook({
  url: "main",
  modules: module_specs
})
)}

function _35(md){return(
md`##### Generate a report on the sizes of components`
)}

function _report(DOMParser,book){return(
[
  ...new DOMParser()
    .parseFromString(book, "text/html")
    .querySelectorAll("script")
].map((script) => ({
  ...(script.getAttribute("file") && {
    file: script.getAttribute("file")
  }),
  type: script.type,
  size: script.text.length,
  id: script.id
}))
)}

function _tomlarkworthy_exporter_task($0,book,report){return(
$0.resolve({
  source: book,
  report: report
})
)}

function _38(md){return(
md`### Module Source Generator`
)}

function _generate_module_source(generate_definitions,generate_define){return(
async (
  scope,
  cells,
  fileAttachments,
  { extraModuleLookup = new Map() } = {}
) =>
  `${await generate_definitions(cells, { extraModuleLookup })}
${await generate_define(scope, cells, fileAttachments, { extraModuleLookup })}`
)}

function _generate_definitions(cellToDefinition,importCell){return(
async (cells) =>
  [
    ...(await Promise.all(
      [...cells.entries()].map(([name, variables]) =>
        cellToDefinition(name, variables)
      )
    )),
    importCell.toString() // for all modules
  ]
    .flat()
    .join("")
)}

function _generate_define(cellToDefines){return(
async (
  scope,
  cells,
  fileAttachments,
  { extraModuleLookup } = {}
) => {
  const fileAttachmentExpression = fileAttachments
    ? `  const fileAttachments = new Map(${JSON.stringify(
        [...fileAttachments.entries()],
        null,
        2
      )});
  main.builtin("FileAttachment", runtime.fileAttachments(name => {
    let url = fileAttachments.get(name);
    url = url.url || url; 
    const file = document.querySelector(\`#\${CSS.escape(url)}\`);
    const base64 = file.text;
    const binary = atob(base64);
    const array = new Uint8Array(binary.length)
    for( var i = 0; i < binary.length; i++ ) { array[i] = binary.charCodeAt(i) }
    const blob_url = URL.createObjectURL(new Blob([array], {
      type: file.getAttribute("mime")
    }));
    return {url: blob_url, mimeType: file.getAttribute("mime")};
  }));\n`
    : "";

  return `export default function define(runtime, observer) {
  const main = runtime.module();
${fileAttachmentExpression}${(
    await Promise.all(
      [...cells.entries()].map(([name, variables]) =>
        cellToDefines(scope, name, variables, { extraModuleLookup })
      )
    )
  )
    .flat()
    .join("\n")}
  return main;
}`;
}
)}

function _isLiveImport(){return(
(variable) =>
  variable._definition
    .toString()
    .includes("observablehq" + "--inspect " + "observablehq--import")
)}

function _cellToDefinition(isLiveImport){return(
(name, variables) => {

  if (typeof name == "string") {
    if (name.startsWith("module ")) {
      return "";
    }
    if (name.startsWith("viewof ")) {
      name = name.replace("viewof ", "");
    } else {
      if (name.startsWith("mutable ")) {
        name = name.replace("mutable ", "");
      }
    }
  } else if (isLiveImport(variables[0])) {
    return ""; //`const _${name} = () => "live imports are stripped";\n`;
  }
  return `const _${name} = ${variables[0]._definition.toString()};\n`;
}
)}

function _importCell(){return(
function importCell({ specifier, specifiers, notebook }, module) {
  const importElement = document.createElement("span");
  importElement.className = "observablehq--inspect observablehq--import";
  importElement.appendChild(document.createTextNode("import {"));

  let isFirstSpecifier = false;
  for (const { imported: originalName, local: aliasName } of specifiers) {
    if (isFirstSpecifier) {
      importElement.appendChild(document.createTextNode(", "));
    } else {
      isFirstSpecifier = true;
    }

    const link = document.createElement("a");
    if (module._scope.has(originalName)) {
      if (notebook) {
        link.href = new URL(`#${originalName}`, notebook);
      }
    } else {
      link.className = "observablehq--unknown";
    }
    link.textContent = originalName;
    importElement.appendChild(link);

    if (originalName !== aliasName) {
      importElement.appendChild(document.createTextNode(` as ${aliasName}`));
    }
  }

  importElement.appendChild(document.createTextNode("}"));
  if (notebook) {
    importElement.appendChild(document.createTextNode(" from "));
    const notebookLink = document.createElement("a");
    notebookLink.href = new URL(notebook);
    notebookLink.textContent = `"${specifier}"`;
    importElement.appendChild(notebookLink);
  }

  return importElement;
}
)}

function _cellToDefines(sourceModule,findModuleName,findImportedName,isLiveImport){return(
async (scope, name, variables, { extraModuleLookup } = {}) => {
  const defines = [];
  if (typeof name === "string") {
    if (name.startsWith("module <unknown")) {
      return [];
    } else if (name.startsWith("module ")) {
      const module = await sourceModule(variables[0]);
      const moduleName =
        extraModuleLookup.get(module) || findModuleName(scope, module);
      // load the module
      defines.push(
        `  main.define("${name}", async () => runtime.module((await import("/${moduleName}.js?v=4")).default));`
      );

      // load the variables
      const specifiers = new Map(); // local -> remote
      await Promise.all(
        variables.map(async (v) => {
          const importedName = await findImportedName(v);
          specifiers.set(v._name, importedName);
          defines.push(
            `  main.define("${
              v._name
            }", ["${name}", "@variable"], (_, v) => v.import("${v._name}", ${
              importedName && importedName !== v._name
                ? `"${importedName}", `
                : ""
            }_));`
          );
        })
      );
      // Filter out redundant specifiers otherwise the same thing gets imported multiple
      // time
      const trimmed_specifiers = [];
      specifiers.entries().forEach(([local, imported]) => {
        if (
          specifiers.has("mutable " + local) ||
          specifiers.has("viewof " + local)
        ) {
          // skip its imported as a viewof
        } else {
          trimmed_specifiers.push({
            local,
            imported
          });
        }
      });
      // create an anon variable to do the import
      defines.push(
        `  main.variable(observer()).define(["${name}"], async (m) => importCell({
  specifier: "${moduleName}",
  specifiers: ${JSON.stringify(trimmed_specifiers)},
  notebook: "https://${moduleName}"
        }, m));`
      );
    } else if (name.startsWith("viewof ")) {
      // viewof <name>
      const viewName = name.replace("viewof ", "");
      const v = variables[0];
      defines.push(
        `  main.variable(observer("${name}")).define("${name}", ${
          v._inputs.length > 0
            ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
            : ""
        }_${viewName});`
      );
      defines.push(
        `  main.variable(observer("${viewName}")).define("${viewName}", ["Generators", "viewof ${viewName}"], (G, _) => G.input(_));`
      );
    } else if (name.startsWith("mutable ")) {
      // mutable <name>
      const mutableName = name.replace("mutable ", "");
      const v = variables[0];
      defines.push(
        `  main.define("initial ${mutableName}", ${
          v._inputs.length > 0
            ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
            : ""
        }_${mutableName});`
      );
      defines.push(
        `  main.variable(observer("mutable ${mutableName}")).define("mutable ${mutableName}", ["Mutable", "initial ${mutableName}"], (M, _) => new M(_));`
      );
      defines.push(
        `  main.variable(observer("${mutableName}")).define("${mutableName}", ["mutable ${mutableName}"], _ => _.generator);`
      );
    }
  } else if (isLiveImport(variables[0])) {
    return []; //`const _${name} = () => "live imports are stripped";\n`;
  }

  if (defines.length == 0 && variables.length == 1) {
    const v = variables[0];
    defines.push(
      `  main.variable(observer(${v._name ? `"${v._name}"` : ""})).define(${
        v._name ? `"${v._name}", ` : ""
      }${
        v._inputs.length > 0
          ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
          : ""
      }_${name});`
    );
  }
  return defines;
}
)}

function _46(md){return(
md`## Assemble `
)}

function _lopebook(notebook_style,inspector_css,lopemodule,decompress_sledfile,builtin_def){return(
async (bundle) => `<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="icon" href="data:,">
<base href="https://observablehq.com"></base>
${notebook_style.outerHTML}
${inspector_css.outerHTML}
${(
  await Promise.all(
    [...bundle.modules.values()].map((module) => lopemodule(module))
  )
).join("")}

<script>
  window.onload = function() {
    const imports = {};
    [...document.querySelectorAll("script[type=lope-module]")].forEach(module => {
      const blob_url = URL.createObjectURL(new Blob([module.text], {
        type: "application/javascript"
      }));
      if (module.id[0] == "/") module.id = module.id.substring(1);
      imports[module.id] = blob_url;
    });
    
    const importmap = document.createElement("script");
    importmap.type = "importmap";
    importmap.text = JSON.stringify({imports}, null, 2);
    document.body.append(importmap);

    const main = document.createElement("script");
    main.type = "module";
    main.text = \`
import define from "${bundle.url}";
const decompress_sledfile = ${decompress_sledfile.toString()};
const { Runtime, Library, Inspector } = await import(await decompress_sledfile("runtime.js.gz"));
const builtins = ${builtin_def}
const library = new Library(async (name) => {
  if (builtins[name]) return builtins[name]() 
  return Library.resolve(name);
})
const runtime = new Runtime(library);
const main = runtime.module(define, Inspector.into(document.body));
\`;
    document.body.append(main);
  }
</script>`
)}

function _lopemodule(arrayBufferToBase64,escapeScriptTags,rewriteImports){return(
async (module) => {
  const files = module.fileAttachments
    ? await Promise.all(
        [...module.fileAttachments.entries()].map(
          async ([name, attachment]) => {
            const url = attachment.url || attachment;
            const response = await fetch(url);
            const data64 = await response
              .arrayBuffer()
              .then(arrayBufferToBase64);
            return `<script type="lope-file" module="${
              module.url
            }" file="${encodeURIComponent(name)}" mime="${response.headers.get(
              "content-type"
            )}" id="${url}">${data64}</script>\n`;
          }
        )
      )
    : [];
  return `${files.join("")}<script type="lope-module" id="${module.url}">
${escapeScriptTags(rewriteImports(module))}
</script>\n`;
}
)}

function _escapeScriptTags(){return(
(str) => str.replaceAll("</script", "</scr\\ipt")
)}

function _rewriteImports(){return(
(module) => {
  let modified = module.source;
  module.imports.forEach((i) => {
    modified = modified.replaceAll(
      new RegExp('"/?' + i + '.*"', "g"),
      `"${i}"`
    );
  });
  return modified;
}
)}

function _arrayBufferToBase64(){return(
async function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return btoa(binary);
}
)}

function _52(md){return(
md`### Bundled Deps`
)}

function _decompress_sledfile(DecompressionStream,Response){return(
async (file) => {
  const source = document.querySelector(
    'script[type=lope-file][file="' + file + '"]'
  );
  const base64 = source.text;
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([array], {
    type: "application/octet-stream"
  });
  const decompressedStream = (await blob.stream()).pipeThrough(
    new DecompressionStream("gzip")
  );
  const arrayBuffer = await new Response(decompressedStream).arrayBuffer();

  // Create a Blob from the ArrayBuffer
  const decompressed_blob = new Blob([arrayBuffer], {
    type: "application/javascript"
  });

  return URL.createObjectURL(decompressed_blob);
}
)}

function _builtin_def(){return(
`({
  "htl@0.3.1/dist/htl.min.js": async () =>
    import(await decompress_sledfile("htl.js.gz")),
  "@observablehq/inputs@0.11.0/dist/inputs.min.js": async () => decompress_sledfile("inputs.2.min.js.gz"),
  "marked@0.3.12/marked.min.js": () =>
    decompress_sledfile("marked.0.3.12.min.js.gz"),
  "lodash@4.17.21/lodash.min.js": () => decompress_sledfile("lodash-4.17.21.min.js.gz"),
  "@observablehq/highlight.js@2.0.0/highlight.min.js": () => decompress_sledfile("highlight.js-2.0.0.min.js.gz")
})`
)}

function _builtins(builtin_def){return(
eval(builtin_def)
)}

function _56(md){return(
md`### Test Module Generator

We test the notebook by comparing the Observable API module definition to a synthesised one`
)}

function _test_module_selection(Inputs){return(
Inputs.select(
  [
    undefined,
    "https://api.observablehq.com/@tomlarkworthy/exporter.js?v=4",
    "https://api.observablehq.com/@mootari/access-runtime.js?v=4",
    "https://api.observablehq.com/@tomlarkworthy/flow-queue.js?v=4"
  ],
  { label: "chose a notebook for testing", width: "100%" }
)
)}

function _test_notebook(test_module_selection){return(
import(test_module_selection)
)}

function _59(test_notebook_module,variableToObject){return(
[...test_notebook_module._runtime._variables].map(variableToObject)
)}

function _test_notebook_cell_map(cellMap,test_notebook_module)
{
  debugger;
  return cellMap(test_notebook_module);
}


function _test_notebook_define(test_notebook){return(
test_notebook.default.toString()
)}

function _lopecode_generated_define(generate_define,test_notebook,test_notebook_cell_map,pageImportMatcher){return(
generate_define(
  test_notebook._scope,
  test_notebook_cell_map,
  undefined,
  {
    extraModuleLookup: pageImportMatcher.moduleLookup
  }
)
)}

function _differences(compareDefines,lopecode_generated_define,test_notebook_define){return(
compareDefines(lopecode_generated_define, test_notebook_define)
)}

async function _test_notebook_module(test_module_selection)
{
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(test_module_selection)
  ]);
  return new Runtime().module(define);
}


function _compareDefines(){return(
{
  prompt:
    'The example_module_generated_define and example_module_define should be the same, lets build a helper for the comparing differences. The order of lines is not important. The output should be an object `{errors: 5, extraLines: ["...."], missingLists[]}`',
  time: 1728887073377
} &&
  /**
   * Compares two define functions and returns the differences.
   * @param {string} define1 - The first define function as a string.
   * @param {string} define2 - The second define function as a string.
   * @returns {Object} An object containing the number of errors, extra lines, and missing lines.
   */ function compareDefines(define1, define2) {
    // Split the defines into lines and trim whitespace
    const lines1 = define1
      .split("\n")
      .map((line) => line.trim().replace(/_\d+/g, "_ANON"))
      .map((line) => line.trim().replace(/module \S+/g, "module X"))
      .filter((line) => line);
    const lines2 = define2
      .split("\n")
      .map((line) => line.trim().replace(/_\d+/g, "_ANON"))
      .map((line) => line.trim().replace(/module \S+/g, "module X"))
      .filter((line) => line);

    // Create sets for efficient lookup
    const set1 = new Set(lines1);
    const set2 = new Set(lines2);

    // Find extra lines in define1 that are not in define2
    const extraLines = [...set1].filter((line) => !set2.has(line)).sort();

    // Find missing lines in define1 that are present in define2
    const missingLines = [...set2].filter((line) => !set1.has(line)).sort();

    // Calculate the total number of differences
    const errors = extraLines.length + missingLines.length;

    return { errors, extraLines, missingLines };
  }
)}

function _diskImgUrl(FileAttachment){return(
FileAttachment("disk-floppy-memory-svgrepo-com@2.svg").url()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["disk-floppy-memory-svgrepo-com@2.svg", {url: new URL("./files/10aa6cd8431a9f6f37b802d743e52b63fee1435d20eefd8eb46bdb88844572231522c632f2a21e33d242d95292d54097dd4f0207828087a101e45f1e3bb5d049.svg", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof parameters")).define("viewof parameters", ["Inputs","exporter","localStorageView"], _parameters);
  main.variable(observer("parameters")).define("parameters", ["Generators", "viewof parameters"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["exporter"], _7);
  main.variable(observer("exporter")).define("exporter", ["actionHandler","variable","domView","view","diskImgUrl","Inputs","createShowable","top120List","reportValidity","invalidation","bindOneWay"], _exporter);
  main.variable(observer("actionHandler")).define("actionHandler", ["Inputs","main","forcePeek","getSourceModule","viewof task","view","html","AwsClient","ReadableStream","CompressionStream","Response","md"], _actionHandler);
  main.variable(observer("getSourceModule")).define("getSourceModule", ["main"], _getSourceModule);
  main.variable(observer("createShowable")).define("createShowable", ["variable","view"], _createShowable);
  main.variable(observer("reportValidity")).define("reportValidity", _reportValidity);
  main.variable(observer("top120List")).define("top120List", _top120List);
  main.variable(observer("notebook_style")).define("notebook_style", ["htl"], _notebook_style);
  main.variable(observer("inspector_css")).define("inspector_css", ["htl"], _inspector_css);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof task")).define("viewof task", ["flowQueue"], _task);
  main.variable(observer("task")).define("task", ["Generators", "viewof task"], (G, _) => G.input(_));
  main.variable(observer("main_module")).define("main_module", ["task"], _main_module);
  main.variable(observer("runtime_variables")).define("runtime_variables", ["main_module","variableToObject"], _runtime_variables);
  main.variable(observer("forcePeek")).define("forcePeek", _forcePeek);
  main.variable(observer("module_definition_variables")).define("module_definition_variables", ["main_module","forcePeek"], _module_definition_variables);
  main.variable(observer("main_cells")).define("main_cells", ["module_definition_variables","cellMap","main_module"], _main_cells);
  main.variable(observer("unresolved_main_modules")).define("unresolved_main_modules", ["main_cells"], _unresolved_main_modules);
  main.variable(observer("pageImports")).define("pageImports", ["main_module","parser"], _pageImports);
  main.variable(observer("pageImportMatcher")).define("pageImportMatcher", ["unresolved_main_modules","pageImports","sourceModule"], _pageImportMatcher);
  main.variable(observer("other_modules_unfiltered")).define("other_modules_unfiltered", ["main_module","module_definition_variables","findModuleName","pageImportMatcher"], _other_modules_unfiltered);
  main.variable(observer("excluded_module_names")).define("excluded_module_names", _excluded_module_names);
  main.variable(observer("excluded_modules")).define("excluded_modules", ["other_modules_unfiltered","excluded_module_names"], _excluded_modules);
  main.variable(observer("included_modules")).define("included_modules", ["other_modules_unfiltered","excluded_module_names"], _included_modules);
  main.variable(observer("findImports")).define("findImports", ["pageImportMatcher"], _findImports);
  main.variable(observer("getFileAttachments")).define("getFileAttachments", _getFileAttachments);
  main.variable(observer("module_specs")).define("module_specs", ["main_module","included_modules","cellMap","pageImportMatcher","findImports","getFileAttachments","main","generate_module_source"], _module_specs);
  main.variable(observer()).define(["Inputs","module_specs"], _33);
  main.variable(observer("book")).define("book", ["lopebook","module_specs"], _book);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("report")).define("report", ["DOMParser","book"], _report);
  main.variable(observer("tomlarkworthy_exporter_task")).define("tomlarkworthy_exporter_task", ["viewof task","book","report"], _tomlarkworthy_exporter_task);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("generate_module_source")).define("generate_module_source", ["generate_definitions","generate_define"], _generate_module_source);
  main.variable(observer("generate_definitions")).define("generate_definitions", ["cellToDefinition","importCell"], _generate_definitions);
  main.variable(observer("generate_define")).define("generate_define", ["cellToDefines"], _generate_define);
  main.variable(observer("isLiveImport")).define("isLiveImport", _isLiveImport);
  main.variable(observer("cellToDefinition")).define("cellToDefinition", ["isLiveImport"], _cellToDefinition);
  main.variable(observer("importCell")).define("importCell", _importCell);
  main.variable(observer("cellToDefines")).define("cellToDefines", ["sourceModule","findModuleName","findImportedName","isLiveImport"], _cellToDefines);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("lopebook")).define("lopebook", ["notebook_style","inspector_css","lopemodule","decompress_sledfile","builtin_def"], _lopebook);
  main.variable(observer("lopemodule")).define("lopemodule", ["arrayBufferToBase64","escapeScriptTags","rewriteImports"], _lopemodule);
  main.variable(observer("escapeScriptTags")).define("escapeScriptTags", _escapeScriptTags);
  main.variable(observer("rewriteImports")).define("rewriteImports", _rewriteImports);
  main.variable(observer("arrayBufferToBase64")).define("arrayBufferToBase64", _arrayBufferToBase64);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("decompress_sledfile")).define("decompress_sledfile", ["DecompressionStream","Response"], _decompress_sledfile);
  main.variable(observer("builtin_def")).define("builtin_def", _builtin_def);
  main.variable(observer("builtins")).define("builtins", ["builtin_def"], _builtins);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("viewof test_module_selection")).define("viewof test_module_selection", ["Inputs"], _test_module_selection);
  main.variable(observer("test_module_selection")).define("test_module_selection", ["Generators", "viewof test_module_selection"], (G, _) => G.input(_));
  main.variable(observer("test_notebook")).define("test_notebook", ["test_module_selection"], _test_notebook);
  main.variable(observer()).define(["test_notebook_module","variableToObject"], _59);
  main.variable(observer("test_notebook_cell_map")).define("test_notebook_cell_map", ["cellMap","test_notebook_module"], _test_notebook_cell_map);
  main.variable(observer("test_notebook_define")).define("test_notebook_define", ["test_notebook"], _test_notebook_define);
  main.variable(observer("lopecode_generated_define")).define("lopecode_generated_define", ["generate_define","test_notebook","test_notebook_cell_map","pageImportMatcher"], _lopecode_generated_define);
  main.variable(observer("differences")).define("differences", ["compareDefines","lopecode_generated_define","test_notebook_define"], _differences);
  main.variable(observer("test_notebook_module")).define("test_notebook_module", ["test_module_selection"], _test_notebook_module);
  main.variable(observer("compareDefines")).define("compareDefines", _compareDefines);
  main.variable(observer("diskImgUrl")).define("diskImgUrl", ["FileAttachment"], _diskImgUrl);
  const child1 = runtime.module(define1);
  main.import("flowQueue", child1);
  const child2 = runtime.module(define2);
  main.import("runtime", child2);
  main.import("main", child2);
  main.import("observed", child2);
  main.import("modules", child2);
  main.import("viewof ex_refresh", child2);
  main.import("ex_refresh", child2);
  const child3 = runtime.module(define3);
  main.import("cellMap", child3);
  main.import("findModuleName", child3);
  main.import("sourceModule", child3);
  main.import("findImportedName", child3);
  main.import("variableToObject", child3);
  main.import("parser", child3);
  main.import("decompress_url", child3);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  main.import("variable", child4);
  main.import("bindOneWay", child4);
  const child5 = runtime.module(define5);
  main.import("reversibleAttach", child5);
  const child6 = runtime.module(define6);
  main.import("localStorageView", child6);
  const child7 = runtime.module(define7);
  main.import("AwsClient", child7);
  main.import("AwsV4Signer", child7);
  const child8 = runtime.module(define8);
  main.import("domView", child8);
  return main;
}
