import define1 from "./09fdee029150048c@436.js";
import define2 from "./57d79353bac56631@44.js";
import define3 from "./0e0b35a92c819d94@474.js";
import define4 from "./e1c39d41e8e944b0@939.js";
import define5 from "./e3a019069a130d79@6074.js";
import define6 from "./f92778131fd76559@1208.js";
import define7 from "./cdc303fcc82a630f@262.js";
import define8 from "./048a17a165be198d@271.js";
import define9 from "./54df2436d8585ee6@24.js";
import define10 from "./56b204c6d7cdb801@32.js";
import define11 from "./db42ae70222a8b08@995.js";
import define12 from "./98f34e974bb2e4bc@650.js";

function _1(md){return(
md`# Exporter: Single File Serializer
## [video explainer](https://www.youtube.com/watch?v=wx93r1pY_6Y)


Serialize literate computational notebooks with their dependancies into single files. Double click to open locally. No server required, works in a \`file://\` context for simplicity.

- **File-first** representation. The [Observable Runtime](https://github.com/observablehq/runtime) and common builtins like \`Inputs\`, \`htl\`, \`highlight\`, \`_\` (lodash) and \`markdown\` are bundled for offline operation. directly push to S3 or S3-like too if you want 
- **Recursive and self-sustaining**, the exporter is implemented in userspace and can be invoked again after exporting.
- **Fast**, single file notebooks open fast!
- **Moldable**, the file format is uncompressed, readable, editable with a text editor, and diffable by Git. 
- **Runtime-as-the-source-of-truth**, format derived from the live [Obervable Runtime](https://github.com/observablehq/runtime) representation.
- **No boxing**, the notebook is rendered without an iframe 
`
)}

function _parameters(Inputs,exporter,default_style,$0,localStorageView){return(
Inputs.bind(
  exporter({ style: default_style, output: (out) => ($0.value = out) }),
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
  handler: (action, state) => {...}, // Optional UI click handler
  style: // customer reference to a style DOM node or a string to insert as a style block
  output: (out) => ... // hook to get result of exporting
  notebook_url: // hardcode the default notebook_url
  headless: false // Use an empty inspector and no placement div.
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

\`\`\`


If you want to export without a UI, use the function \`exportToHTML\`, see the [example](https://observablehq.com/@tomlarkworthy/export-to-html-example)

\`\`\`js
import {exportToHTML } from '@tomlarkworthy/exporter'
\`\`\``
)}

function _4(md){return(
md`## Lope Format Specification

The HTML file is split into several \`<script>\` blocks that have different purposes.

### FileAttachments

File attachments are static assets encoded as a base64 strings with some metadata to understand the content-type and their URL.

~~~html
<script type="lope-file"       
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
md`## Persisted Hash URL

To help carry state across an export, the URL hash parameter is remembered and set automatically when opening the file. If you need to move large amount of data, use a [local FileAttachment](https://observablehq.com/@tomlarkworthy/fileattachments) instead.`
)}

function _7(md){return(
md`### TODO
- Bug: Every recursive cycle more imports cells are created
- Improve: Set S3 URL in arg
- Improve: Refactor the bootloader so its not an inline string. (would avoids some escaping issues)

### Known Issues
  - Doesn't work for \`with\` clauses in imports. Fixing is not a priority, they are complex.`
)}

function _example(exporter){return(
exporter()
)}

function _exporter(actionHandler,default_style,keepalive,exporter_module,variable,domView,exportState,view,diskImgUrl,Inputs,createShowable,top120List,reportValidity,invalidation,bindOneWay){return(
({
  handler = actionHandler,
  style = default_style,
  output = (out) => {},
  notebook_url = "",
  head,
  headless,
  debug = false
} = {}) => {
  keepalive(exporter_module, "futureExportedState");

  const handlerVar = variable(handler);
  const feedback = domView();
  const options = {
    style,
    output,
    head: head === undefined ? exportState?.options?.head : head,
    headless:
      headless === undefined ? exportState?.options?.headless : headless,
    debug
  };
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
        color: black;
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
                value: notebook_url,
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
                  reduce: () => spinner("tab", ui.value, options)
                })
              ]}
              ${[
                "html",
                Inputs.button("Download", {
                  reduce: () => spinner("file", ui.value, options)
                })
              ]}
              ${[
                "s3",
                Inputs.button("S3", {
                  reduce: () =>
                    ui.value.s3Params.child.url &&
                    spinner("s3", ui.value, options)
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

function _actionHandler(Inputs,getSourceModule,exportToHTML,view,html,location,getCompactISODate,AwsClient,ReadableStream,CompressionStream,Response,md){return(
async (action, state, options, feedback_callback) => {
  feedback_callback(Inputs.textarea({ value: `Generating source...\n` }));

  const { notebook, module } = await getSourceModule(state);
  const response = await exportToHTML({
    notebook,
    module,
    options
  });

  if (options.output) {
    options.output(response);
  }

  const { source, report } = response;

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
    window.open(url + location.hash, "_blank");
  } else if (action === "file") {
    const url = URL.createObjectURL(new Blob([source], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${notebook}_${getCompactISODate()}.html`;
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

function _exportToHTML(main,keepalive,exporter_module,$0){return(
async function exportToHTML({
  notebook, // String, name of module e.g. "@tomlarkworthy/exporter"
  module = main, // Module, main module reference
  modules, // Optional Map<String, Module> additional modules to add e.g. "@tomlarkworthy/agent" -> Module
  options // Object, export options, e.g. headless
} = {}) {
  // Force observation of response
  keepalive(exporter_module, "tomlarkworthy_exporter_task");
  const response = await $0.send({
    notebook,
    module,
    modules,
    options
  });
  return response;
}
)}

function _getSourceModule(notebook_name,main){return(
async (state) => {
  if (state.source == "this notebook")
    return {
      notebook: notebook_name,
      module: main
    };
  const url =
    state.source == "a notebook url"
      ? state.notebook_url.child
      : state.top_100.child;

  const notebook = url.trim().replace("https://observablehq.com/", "");
  const [{ Runtime, Inspector }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/${notebook}.js?v=4`)
  ]);
  return {
    notebook,
    module: new Runtime().module(define)
  };
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
  "https://observablehq.com/@uwdata/introduction-to-vega-lite",
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
  "https://observablehq.com/@unkleho/introducing-d3-render-truly-declarative-and-reusable-d3",
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
  "https://observablehq.com/@analyzer2004/west-coast-weather-from-seattle-to-san-diego",
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
)}

function _default_style(htl){return(
htl.html`<style>/* General layout with max-width */
  
:root {
  --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --code: code, "monospace";
}
  
body {
  font-family: var(--system-ui);
  font-size: 1rem;
  font-weight: 200;
  line-height: 1.6;
  margin: 0 auto;
}

.observablehq {
  max-width: 1200px;
  border-radius: 2px; 
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  background-color: #ffffff;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
  margin: 1.25rem 0 0.75rem;
  line-height: 1.25;
  font-weight: 400;
}
/* General layout */
font-family: var(--system-ui);
font-size: 1rem;
line-height: 1.4;
color: #333;
max-width: 100%;
margin: 0 auto;
background-color: #f8f9fa;
border: 1px solid #e0e0e0;
border-radius: 6px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

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

function _notebook_name(){return(
document.querySelector("title")?.innerHTML ||
  new URL(document.baseURI).pathname.replace("/", "")
)}

function _19(md){return(
md`## Global Config`
)}

function _globalConfig(){return(
{
  linkTo: (to, from) => {}
}
)}

function _21(md){return(
md`### Single File Notebook Generator Flow`
)}

function _TRACE_MODULE(){return(
"@bumbeishvili/extract-empty-hierarchy-from-flat-data"
)}

function _task(flowQueue){return(
flowQueue({ timeout_ms: 10000 })
)}

function _24(task){return(
task
)}

function _main_module(task){return(
task.module
)}

function _task_runtime(main_module){return(
main_module?._runtime
)}

function _runtime_variables(task_runtime,variableToObject){return(
[...task_runtime._variables].map(variableToObject)
)}

function _module_map(moduleMap,task_runtime){return(
moduleMap(task_runtime)
)}

function _excluded_module_names(submit_summary,task)
{
  submit_summary;
  return ["TBD", "error", "builtin", "main", task.notebook];
}


function _excluded_modules(module_map,excluded_module_names){return(
new Map(
  [...module_map.entries()].filter(([m, info]) =>
    excluded_module_names.includes(info.name)
  )
)
)}

function _included_modules(module_map,excluded_module_names){return(
new Map(
  [...module_map.entries()].filter(
    ([m, info]) => !excluded_module_names.includes(info.name)
  )
)
)}

function _moduleLookup(included_modules){return(
new Map(
  [...included_modules.entries()].map(([m, info]) => [m, info.name])
)
)}

async function _module_specs(task,main_module,included_modules,TRACE_MODULE,cellMap,moduleLookup,findImports,getFileAttachments,main,generate_module_source)
{
  if (task.options?.debug) debugger;
  const specsTodo = new Set();
  return new Map(
    await Promise.all(
      [
        ...(main_module ? [[main_module, { name: task.notebook }]] : []),
        ...(task.modules
          ? [...task.modules.entries()].map(([name, module]) => [
              module,
              { name }
            ])
          : []),
        ...included_modules.entries()
      ].map(async ([module, spec]) => {
        specsTodo.add(spec.name);
        if (spec.name == TRACE_MODULE) {
          debugger;
        }

        const cells = await cellMap(module, {
          extraModuleLookup: moduleLookup
        });
        const imports = findImports(cells);
        const fileAttachments = getFileAttachments(module) || new Map();
        if (spec.name == task.notebook && task?.options?.main_files !== false) {
          getFileAttachments(main).forEach((value, key) =>
            fileAttachments.set(key, value)
          );
        }
        const source = await generate_module_source(
          spec,
          module._scope,
          cells,
          fileAttachments,
          {
            extraModuleLookup: moduleLookup
          }
        );
        specsTodo.delete(spec.name);
        console.log("Generated spec for " + spec.name, "remaining", specsTodo);
        return [
          spec.name,
          {
            url: spec.name,
            imports,
            fileAttachments,
            source: source,
            cells,
            module,
            define: spec.define
          }
        ];
      })
    )
  );
}


function _findImports(){return(
(cells) =>
  [...cells.keys()]
    .filter((name) => typeof name === "string" && name.startsWith("module "))
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

function _book(lopebook,task,module_specs)
{
  const book = lopebook(
    {
      url: task.notebook,
      modules: module_specs
    },
    {
      title: task.notebook,
      ...task.options
    }
  );
  console.log("book", book);
  return book;
}


function _37(Inputs,module_specs){return(
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

function _38(md){return(
md`##### Generate a report on the sizes of components`
)}

function _report(DOMParser,book)
{
  let report;
  try {
    report = [
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
    }));
  } catch (err) {
    report = err;
  }

  console.log("report", report);
  return report;
}


function _tomlarkworthy_exporter_task(book,report,futureExportedState,exporter_module,$0)
{
  const result = {
    source: book,
    report: report
  };
  console.log("resolving exporter_task", result);
  futureExportedState;
  exporter_module;
  return $0.resolve(result);
}


function _41(md){return(
md`### Module Source Generator`
)}

function _generate_module_source(generate_definitions,generate_define){return(
async (
  spec,
  scope,
  cells,
  fileAttachments,
  { extraModuleLookup = new Map() } = {}
) =>
  `${await generate_definitions(cells, { extraModuleLookup })}
${await generate_define(spec, scope, cells, fileAttachments, {
  extraModuleLookup
})}`
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
  spec,
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
      )}.map(([name, entry]) => {
        const module_name = "${spec.name}";
        const url = entry.url || entry; 
        const query = \`script[type=lope-file][module='\${CSS.escape(module_name)}'][file='\${CSS.escape(encodeURIComponent(name))}']\`;
        console.log(query)
        const file = document.querySelector(query);
        const base64 = file.text;
        const binary = atob(base64);
        const array = new Uint8Array(binary.length)
        for( var i = 0; i < binary.length; i++ ) { array[i] = binary.charCodeAt(i) }
        const blob_url = URL.createObjectURL(new Blob([array], {
          type: file.getAttribute("mime")
        }));
        return [name, {url: blob_url, mimeType: file.getAttribute("mime")}]
      }));
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));\n`
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
    if (name.startsWith("dynamic ")) {
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
      debugger;
      return [];
    } else if (name.startsWith("module ")) {
      const module = await sourceModule(variables[0]);
      const moduleName =
        extraModuleLookup.get(module) || findModuleName(scope, module);
      //load the module
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
            }", ["${name}", "@variable"], (_, v) => v.import(${
              importedName && importedName !== v._name
                ? `"${importedName}", `
                : ""
            }"${v._name}", _));`
          );
        })
      );
      // Filter out redundant specifiers otherwise the same thing gets imported multiple
      // time
      const trimmed_specifiers = [];
      [...specifiers.entries()].forEach(([local, imported]) => {
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
      //     defines.push(
      //       `  main.variable(observer()).define(["${name}"], async (m) => importCell({
      // specifier: "${moduleName}",
      // specifiers: ${JSON.stringify(trimmed_specifiers)},
      // notebook: "https://${moduleName}"
      //       }, m));`
      //     );
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

function _49(md){return(
md`## Assemble `
)}

function _lopebook(inspector_css,lopemodule,decompress_sledfile,builtin_def){return(
async (
  bundle,
  { style, title, head, headless } = {}
) => `<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>${title}</title>
${head ? head : `<link rel="icon" href="data:,">`}
</head>
${style?.outerHTML || style}
${inspector_css.outerHTML}
${(
  await Promise.all(
    [...bundle.modules.values()]
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((module) => lopemodule(module))
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
const main = runtime.module(define, ${
  headless
    ? "Inspector.into(document.createElement('div'))"
    : "Inspector.into(document.body)"
});
\`;
    document.body.append(main);
  }
</script>`
)}

function _lopemodule(TRACE_MODULE,CSS,arrayBufferToBase64,escapeScriptTags,rewriteImports){return(
async (module) => {
  if (module.url === TRACE_MODULE) {
    debugger;
  }
  const files = module.fileAttachments
    ? await Promise.all(
        [...module.fileAttachments.entries()].map(
          async ([name, attachment]) => {
            const url = attachment.url || attachment;
            // Get from local when possible
            const lopefile =
              !url.startsWith("blob:") &&
              document.querySelector(
                `script[type=lope-file][module='${CSS.escape(
                  module.url
                )}'][file='${CSS.escape(encodeURIComponent(name))}']`
              );
            let data64,
              mime = undefined;
            if (!lopefile) {
              const response = await fetch(url);
              data64 = await response.arrayBuffer().then(arrayBufferToBase64);
              mime = response.headers.get("content-type");
            } else {
              data64 = lopefile.textContent;
              mime = lopefile.getAttribute("mime");
            }
            return `<script type="lope-file" module="${
              module.url
            }" file="${encodeURIComponent(
              name
            )}" mime="${mime}">${data64}</script>\n`;
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
      new RegExp('"/?' + i + '[^"]*"', "g"),
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

function _55(md){return(
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
  "@observablehq/highlight.js@2.0.0/highlight.min.js": () => decompress_sledfile("highlight.js-2.0.0.min.js.gz"),
  "d3@7.9.0/dist/d3.min.js": () => {
    console.log("d3@7.9.0/dist/d3.min.js")
    return decompress_sledfile("d3.v7.min.js.gz")
  },
  "@observablehq/plot@0.6.16/dist/plot.umd.min.js": () => {
    console.log("@observablehq/plot@0.6.16/dist/plot.umd.min.js")
    return decompress_sledfile("plot.umd.min.js.gz")
  }
})`
)}

function _builtins(builtin_def){return(
eval(builtin_def)
)}

function _fileAttachmentKeepAlive(FileAttachment)
{
  // Unused file attachments are wiped after fork, so we need to manually reference them
  FileAttachment("highlight.js-2.0.0.min.js.gz");
  FileAttachment("htl.js.gz");
  FileAttachment("inputs.2.min.js.gz");
  FileAttachment("lodash-4.17.21.min.js.gz");
  FileAttachment("marked.0.3.12.min.js.gz");
  FileAttachment("runtime.js.gz");
  FileAttachment("d3.v7.min.js.gz");
  FileAttachment("plot.umd.min.js.gz");
}


function _60(md){return(
md`### URL Hash Handling

We use a FileAttachment to carry the hash state to an exported notebook, and it is restored on first page load`
)}

async function _exportState(getFileAttachment,exporter_module,location,history)
{
  let state;
  try {
    state =
      (await getFileAttachment("export_state.json", exporter_module)?.json()) ||
      {};
  } catch (err) {
    state = {};
  }
  if (state.hash && !location.hash) {
    try {
      history.replaceState(null, "", state.hash);
    } catch (err) {
      console.error(err);
    }
  }
  console.log("export_state.json", state);
  return state;
}


async function _futureExportedState(hash,exportState,location,save_exporter_state)
{
  hash;
  exportState; // ensure we get the current value first
  const savedState = {
    ...exportState,
    ...(location.hash && { hash: location.hash })
  };
  console.log("futureExportedState", savedState);
  await save_exporter_state(savedState);

  return savedState;
}


function _save_exporter_state(getFileAttachments,exporter_module,setFileAttachment,jsonFileAttachment){return(
async function save_exporter_state(state) {
  console.log("save_exporter_state", state);
  const current = await getFileAttachments(exporter_module);
  await setFileAttachment(
    jsonFileAttachment("export_state.json", state),
    exporter_module
  );
  const newest = await getFileAttachments(exporter_module);
  return;
}
)}

function _66(md){return(
md`### Global Output`
)}

function _output(){return(
undefined
)}

function _68(md){return(
md`## Utils`
)}

function _getCompactISODate(){return(
function getCompactISODate() {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
)}

function _exporter_module(thisModule){return(
thisModule()
)}

function _diskImgUrl(FileAttachment){return(
FileAttachment("disk-floppy-memory-svgrepo-com@2.svg").url()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["runtime.js.gz", {url: new URL("./files/8cccd6235f8a3942c32b63f3eb9b0d4dde38e067e535593d175973050f65ae06e1854be4392aee9bc4e185a83f144f78c499dca7f5c214026ad2491e46a175fd.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["htl.js.gz", {url: new URL("./files/89ac144b19271334c5a22fc61324f2524080c11edfa3598660200804a0fb83651d547287a8c57f4f6c9f6d136f2b6e85277a1d653f9df9f34a7d0993cd29a3d4.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["marked.0.3.12.min.js.gz", {url: new URL("./files/8c023b23f74fc71c20788401809972126cac904295cdec6dfdadab14bb64343e81ea1fdec65846f8895dc69e651549e4ab42d132eb9f5642115cf57ef10f3765.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["inputs.2.min.js.gz", {url: new URL("./files/b15345a9bdee9bc6f67062f10f758e2245f9e20f1592197f2013d9654cd74c2de343dbf3934ececc46ebd1638a57e0b7ad79f07177845e36e7830f6f577d5983.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["disk-floppy-memory-svgrepo-com@2.svg", {url: new URL("./files/10aa6cd8431a9f6f37b802d743e52b63fee1435d20eefd8eb46bdb88844572231522c632f2a21e33d242d95292d54097dd4f0207828087a101e45f1e3bb5d049.svg", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["lodash-4.17.21.min.js.gz", {url: new URL("./files/0a5ad0fdb81f6488ff02d6425b61c9051e55fddf43964b6835150ae1c1c51ec11e6bd085e71545759be99c8d4f0a2f2f0ed41db84a14a3ec5f3e99def2247993.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["highlight.js-2.0.0.min.js.gz", {url: new URL("./files/4d2241c76436d0407df3339a922f819bebb5477681a0e3b11e46007b65b76adda67807209d9ba414d6826f73df7d108542f45b5f186998c61b82dd7614202c2e.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["plot.umd.min.js.gz", {url: new URL("./files/373466aede61ed5462c26d8553b428d84f3b257a34ee7df13051b3e5113017598d66082575f6b5f2e304157cdc243cb5bfabce8c9263d3e17c7f51b28b2004c6.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["d3.v7.min.js.gz", {url: new URL("./files/9d154f8fe30deb729ad929181696f76264282798fe8129d0506d143504071413c20443b11afe2486499f33504f6762c50c1e5a29b45ae6e460ed5707babee2cc.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof parameters")).define("viewof parameters", ["Inputs","exporter","default_style","mutable output","localStorageView"], _parameters);
  main.variable(observer("parameters")).define("parameters", ["Generators", "viewof parameters"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof example")).define("viewof example", ["exporter"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer("exporter")).define("exporter", ["actionHandler","default_style","keepalive","exporter_module","variable","domView","exportState","view","diskImgUrl","Inputs","createShowable","top120List","reportValidity","invalidation","bindOneWay"], _exporter);
  main.variable(observer("actionHandler")).define("actionHandler", ["Inputs","getSourceModule","exportToHTML","view","html","location","getCompactISODate","AwsClient","ReadableStream","CompressionStream","Response","md"], _actionHandler);
  main.variable(observer("exportToHTML")).define("exportToHTML", ["main","keepalive","exporter_module","viewof task"], _exportToHTML);
  main.variable(observer("getSourceModule")).define("getSourceModule", ["notebook_name","main"], _getSourceModule);
  main.variable(observer("createShowable")).define("createShowable", ["variable","view"], _createShowable);
  main.variable(observer("reportValidity")).define("reportValidity", _reportValidity);
  main.variable(observer("top120List")).define("top120List", _top120List);
  main.variable(observer("default_style")).define("default_style", ["htl"], _default_style);
  main.variable(observer("inspector_css")).define("inspector_css", ["htl"], _inspector_css);
  main.variable(observer("notebook_name")).define("notebook_name", _notebook_name);
  main.variable(observer()).define(["md"], _19);
  main.define("initial globalConfig", _globalConfig);
  main.variable(observer("mutable globalConfig")).define("mutable globalConfig", ["Mutable", "initial globalConfig"], (M, _) => new M(_));
  main.variable(observer("globalConfig")).define("globalConfig", ["mutable globalConfig"], _ => _.generator);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("TRACE_MODULE")).define("TRACE_MODULE", _TRACE_MODULE);
  main.variable(observer("viewof task")).define("viewof task", ["flowQueue"], _task);
  main.variable(observer("task")).define("task", ["Generators", "viewof task"], (G, _) => G.input(_));
  main.variable(observer()).define(["task"], _24);
  main.variable(observer("main_module")).define("main_module", ["task"], _main_module);
  main.variable(observer("task_runtime")).define("task_runtime", ["main_module"], _task_runtime);
  main.variable(observer("runtime_variables")).define("runtime_variables", ["task_runtime","variableToObject"], _runtime_variables);
  main.variable(observer("module_map")).define("module_map", ["moduleMap","task_runtime"], _module_map);
  main.variable(observer("excluded_module_names")).define("excluded_module_names", ["submit_summary","task"], _excluded_module_names);
  main.variable(observer("excluded_modules")).define("excluded_modules", ["module_map","excluded_module_names"], _excluded_modules);
  main.variable(observer("included_modules")).define("included_modules", ["module_map","excluded_module_names"], _included_modules);
  main.variable(observer("moduleLookup")).define("moduleLookup", ["included_modules"], _moduleLookup);
  main.variable(observer("module_specs")).define("module_specs", ["task","main_module","included_modules","TRACE_MODULE","cellMap","moduleLookup","findImports","getFileAttachments","main","generate_module_source"], _module_specs);
  main.variable(observer("findImports")).define("findImports", _findImports);
  main.variable(observer("getFileAttachments")).define("getFileAttachments", _getFileAttachments);
  main.variable(observer("book")).define("book", ["lopebook","task","module_specs"], _book);
  main.variable(observer()).define(["Inputs","module_specs"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("report")).define("report", ["DOMParser","book"], _report);
  main.variable(observer("tomlarkworthy_exporter_task")).define("tomlarkworthy_exporter_task", ["book","report","futureExportedState","exporter_module","viewof task"], _tomlarkworthy_exporter_task);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("generate_module_source")).define("generate_module_source", ["generate_definitions","generate_define"], _generate_module_source);
  main.variable(observer("generate_definitions")).define("generate_definitions", ["cellToDefinition","importCell"], _generate_definitions);
  main.variable(observer("generate_define")).define("generate_define", ["cellToDefines"], _generate_define);
  main.variable(observer("isLiveImport")).define("isLiveImport", _isLiveImport);
  main.variable(observer("cellToDefinition")).define("cellToDefinition", ["isLiveImport"], _cellToDefinition);
  main.variable(observer("importCell")).define("importCell", _importCell);
  main.variable(observer("cellToDefines")).define("cellToDefines", ["sourceModule","findModuleName","findImportedName","isLiveImport"], _cellToDefines);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("lopebook")).define("lopebook", ["inspector_css","lopemodule","decompress_sledfile","builtin_def"], _lopebook);
  main.variable(observer("lopemodule")).define("lopemodule", ["TRACE_MODULE","CSS","arrayBufferToBase64","escapeScriptTags","rewriteImports"], _lopemodule);
  main.variable(observer("escapeScriptTags")).define("escapeScriptTags", _escapeScriptTags);
  main.variable(observer("rewriteImports")).define("rewriteImports", _rewriteImports);
  main.variable(observer("arrayBufferToBase64")).define("arrayBufferToBase64", _arrayBufferToBase64);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("decompress_sledfile")).define("decompress_sledfile", ["DecompressionStream","Response"], _decompress_sledfile);
  main.variable(observer("builtin_def")).define("builtin_def", _builtin_def);
  main.variable(observer("builtins")).define("builtins", ["builtin_def"], _builtins);
  main.variable(observer("fileAttachmentKeepAlive")).define("fileAttachmentKeepAlive", ["FileAttachment"], _fileAttachmentKeepAlive);
  main.variable(observer()).define(["md"], _60);
  const child1 = runtime.module(define1);
  main.import("jsonFileAttachment", child1);
  main.import("setFileAttachment", child1);
  main.import("getFileAttachment", child1);
  const child2 = runtime.module(define2);
  main.import("hash", child2);
  main.variable(observer("exportState")).define("exportState", ["getFileAttachment","exporter_module","location","history"], _exportState);
  main.variable(observer("futureExportedState")).define("futureExportedState", ["hash","exportState","location","save_exporter_state"], _futureExportedState);
  main.variable(observer("save_exporter_state")).define("save_exporter_state", ["getFileAttachments","exporter_module","setFileAttachment","jsonFileAttachment"], _save_exporter_state);
  main.variable(observer()).define(["md"], _66);
  main.define("initial output", _output);
  main.variable(observer("mutable output")).define("mutable output", ["Mutable", "initial output"], (M, _) => new M(_));
  main.variable(observer("output")).define("output", ["mutable output"], _ => _.generator);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer("getCompactISODate")).define("getCompactISODate", _getCompactISODate);
  main.variable(observer("viewof exporter_module")).define("viewof exporter_module", ["thisModule"], _exporter_module);
  main.variable(observer("exporter_module")).define("exporter_module", ["Generators", "viewof exporter_module"], (G, _) => G.input(_));
  main.variable(observer("diskImgUrl")).define("diskImgUrl", ["FileAttachment"], _diskImgUrl);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  const child4 = runtime.module(define4);
  main.import("runtime", child4);
  main.import("main", child4);
  main.import("observed", child4);
  main.import("modules", child4);
  main.import("viewof ex_refresh", child4);
  main.import("ex_refresh", child4);
  const child5 = runtime.module(define5);
  main.import("cellMap", child5);
  main.import("findModuleName", child5);
  main.import("sourceModule", child5);
  main.import("findImportedName", child5);
  main.import("variableToObject", child5);
  main.import("parser", child5);
  main.import("decompress_url", child5);
  const child6 = runtime.module(define6);
  main.import("view", child6);
  main.import("variable", child6);
  main.import("bindOneWay", child6);
  const child7 = runtime.module(define7);
  main.import("reversibleAttach", child7);
  const child8 = runtime.module(define8);
  main.import("localStorageView", child8);
  const child9 = runtime.module(define9);
  main.import("AwsClient", child9);
  main.import("AwsV4Signer", child9);
  const child10 = runtime.module(define10);
  main.import("domView", child10);
  const child11 = runtime.module(define11);
  main.import("moduleMap", child11);
  main.import("submit_summary", child11);
  main.import("forcePeek", child11);
  const child12 = runtime.module(define12);
  main.import("thisModule", child12);
  main.import("keepalive", child12);
  return main;
}
