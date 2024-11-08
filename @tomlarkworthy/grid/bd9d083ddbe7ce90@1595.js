import define1 from "./f92778131fd76559@1178.js";
import define2 from "./653c46ed55693b1f@674.js";
import define3 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Responsive *grid*

Place views on responsive grid panels to create mobile friendly composite views *quickly*.

~~~js
  import {grid} from '@tomlarkworthy/grid'
~~~
`
)}

function _gridPanelExample(grid,exampleElements){return(
grid({
  elements: exampleElements // See below, [{name: {p,x,y,z,w,h,view:...}}, ...]
})
)}

function _3(gridEditor,$0){return(
gridEditor($0)
)}

function _gridEditor(grid,md,Inputs,view,$0,selected){return(
(gridView) =>
  grid({
    config: {
      rows: 9
    },
    elements: {
      configTitle: { panel: 0, w: 12, view: md`**config**` },
      config: {
        p: 0,
        y: 1,
        w: 12,
        view: Inputs.bind(
          view`<span>${[
            "rows",
            Inputs.range([1, 24], {
              label: "rows",
              value: 6,
              step: 1
            })
          ]}
      ${[
        "columns",
        Inputs.range([1, 24], { label: "columns", value: 12, step: 1 })
      ]}
      ${[
        "gridSize",
        Inputs.range([25, 45], {
          label: "gridSize (⚠️ global)",
          value: 32,
          step: 1
        })
      ]}
      ${[
        "panels",
        Inputs.range([1, 12], { label: "panels", value: 32, step: 1 })
      ]}`,
          gridView.config
        )
      },
      childTitle: {
        p: 1,
        w: 12,
        view: Inputs.bind(
          Inputs.select(Object.keys(gridView.elements), {
            label: "element"
          }),
          $0
        )
      },
      child: {
        p: 1,
        y: 1,
        w: 12,
        view: Inputs.bind(
          view`<span>${["p", Inputs.range([0, 10], { label: "p", step: 1 })]}
        ${["x", Inputs.range([0, 36], { label: "x" })]}
        ${["y", Inputs.range([0, 36], { label: "y" })]}
        ${["w", Inputs.range([1, 24], { label: "w", step: 1 })]}
        ${["h", Inputs.range([0, 24], { label: "h", step: 1 })]}
        ${["z", Inputs.range([-10, 10], { label: "z", step: 1 })]}
        ${["_view", Inputs.input(gridView.elements.plot.view)]}`,
          gridView.elements[selected]
        )
      }
    }
  })
)}

function _5(md){return(
md`## Simple Uniform Coordinates... *yet responsive*

The controls above are for building intuition over the coordinate system and grid parameters. Play with it! (you can instantiate it against your own grids too)

Formally, there are *n* panels which rearrange to suit the screen resolutions. Typically three panels per row for **desktop** and 1 per row on **mobile**. 

On each panel is a **uniform** grid, typically 12 x 12, that keyed subviews can be placed. The constructor and the view's value emits objects of the form:-

\`\`\`
grid({
  config: {
    panels: <number: total number of panels, default calculated>
    columns: <number: columns per panel, default 12>
    rows: <number: rows per panel, default 12>
    elements: <dictionary: named elements (see above)>
  },
  elements: {
    <key>: {
      p: <number: panel the element is on>
      x: <number: x coord on grid>,
      y: <number: y coord on grid>,
      z: <number: z-index for occlusion>,
      w: <number: width on grid>,
      h: <number: height on grid>
      view: <DOMNode: the visual element>
    }
  }
})
\`\`\`





`
)}

function _exampleElements(dynamicTimeseries,svg,Inputs,juice,md){return(
{
  // prettier-ignore
  plot: { x: 1, y: 1, w: 10, h: 4,
    view: dynamicTimeseries([], {
      width: 10 * 32,
      height: 4 * 32
    })
  },
  // prettier-ignore
  background0: {  x: 0, y: 0, w: 12, h: 6, z: -1,
    view: svg`<svg viewBox="0 0 12 6" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="white" />
              <rect x="0.25" y="0.25" width="11.5" height="5.5" rx="0.5"
                    style="fill:blue;stroke-width:0.25;stroke:rgb(0,0,0)" />`
  },
  // prettier-ignore
  console: { p: 1, x: 1, y: 1, w: 10, h: 2,
    view: Inputs.textarea({
      value: ">",
      width: "100%",
      rows: 3
    })
  },
  // prettier-ignore
  stopstart: { p: 1, x: 1, y: 3, w: 10, h: 2,
    view: juice(Inputs.button, { label: [0] })(md`⏹`, { width: "100%" })
  },
  // prettier-ignore
  background1: {p: 1, x: 0, y: 0, w: 12, h: 6, z: -1,
    view: svg`<svg viewBox="0 0 12 6" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="white" />
              <rect x="0.25" y="0.25" width="11.5" height="5.5" rx="0.5"
                    style="fill:red;stroke-width:0.25;stroke:rgb(0,0,0)" />`
  },
  // prettier-ignore
  p2: { p: 2, w: 12, h: 6,
    view: svg`<svg viewBox="0 0 12 6" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="white" />
              <rect x="0.25" y="0.25" width="11.5" height="5.5" rx="0.5"
                    style="fill:green;stroke-width:0.25;stroke:rgb(0,0,0)" />`
  },
  // prettier-ignore
  p3: { p: 3, w: 12, h: 6,
    view: svg`<svg viewBox="0 0 12 6" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="white" />
              <rect x="0.25" y="0.25" width="11.5" height="5.5" rx="0.5"
                    style="fill:yellow;stroke-width:0.25;stroke:rgb(0,0,0)" />`
  }
}
)}

function _7(md){return(
md`## Mutable and reactive throughout
You don't need to decide upfront what the grid layout it and what components are in it. It can be mutated reactively using ["views are mutable values"](https://observablehq.com/@mbostock/views-are-mutable-values) idioms. In our example below we use *Inputs.bind* to [synchronize](https://observablehq.com/@mbostock/synchronized-views) the controls to the grid above, without invoking Dataflow.`
)}

function _8(md){return(
md`### CSS var(--gridSize)

Typically the grid will calculate the ideal *gridSize* which will be near 32 pixels. It is available on the config object of the grid, but additionally through the global CSS param \`--gridSize\` which can be sometimes be simpler or performant

⚠️ --gridSize is global and shared across *all* grids in a notebook.
`
)}

function _9(md){return(
md`## Responsive

You can make your UI responsive by setting the *p* from *panel* attribute of your elements. 

The panels are arranged to suit the display width, 3 columns on desktop, less on narrower devices. 

All panels share the same height, as defined by the \`<rows>\` attribute of the *config*.

Each panel has its own origin for the x,y coordinates starting at 0,0 and meant for use upto (\`<columns>\`, \`<rows>\`).  

**Responsiveness is opt-in, if you want to make a non-responsive UIs, don't set the *panel*
and use all the coordinates upto 36 on Desktop.**
`
)}

function _responsiveExample(grid,svg){return(
grid({
  elements: {
    p0: {
      p: 0,
      w: 12,
      h: 6,
      view: svg`<svg><rect width="100%" height="100%" fill="blue" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">panel 0</text>`
    },
    p1: {
      p: 1,
      w: 12,
      h: 6,
      view: svg`<svg><rect width="100%" height="100%" fill="green" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">panel 1</text>`
    },
    p2: {
      p: 2,
      w: 12,
      h: 6,
      view: svg`<svg><rect width="100%" height="100%" fill="red" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">panel 2</text>`
    },
    p3: {
      p: 3,
      w: 12,
      h: 6,
      view: svg`<svg><rect width="100%" height="100%" fill="yellow" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">panel 3</text>`
    }
  }
})
)}

function _11(responsiveExample){return(
responsiveExample
)}

function _12(md){return(
md`## Auto-sizing

If you omit a config object, the *grid* will configure itself reactively based on what elements are around at construction time. 

** ⚠️ autosizing is not reactive, configure it in advance if you don't have elements at construction time **`
)}

function _13(md){return(
md`## External State

To support the example application have additional state defined external to the presentation cell.`
)}

function _tsDataRunning(Inputs){return(
Inputs.toggle({ label: "running", value: true })
)}

function _logs(Inputs){return(
Inputs.input(">")
)}

function _selected(Inputs){return(
Inputs.input("background0")
)}

function _tsData(Inputs){return(
Inputs.input([
  {
    t: Date.now(),
    y: Math.sin(Date.now() / 1000)
  }
])
)}

function _timeseries_process($0,now,$1,Event)
{
  $0.value = [
    ...$0.value,
    {
      t: now,
      y: $1.value ? Math.sin(now / 100) : 0
    }
  ];
  while ($0.value[0].t < now - 2000)
    $0.value = $0.value.slice(1);
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}


function _19(md){return(
md`## External Business Logic

Business logic is located outside of the presentation cell can be dynamically patched in with *bind*, often against state held externally. I think this is a good seperation of concerns.

In out example, our UI is interacting with a timeseries gathering process outside of the UI.
`
)}

function _logicExample(Inputs,$0,$1,$2,$3,md,Event,invalidation)
{
  // Connect timeseries chart to plot
  Inputs.bind($0.elements.plot.view.data, $1);

  // Connect logs to console
  Inputs.bind($0.elements.console.view, $2);

  // On button click
  let playing = true;
  const startStopListener = () => {
    if (playing) {
      $2.value = "> stopping\n" + $2.value;
    } else {
      $2.value = "> starting\n" + $2.value;
    }
    playing = !playing;
    $3.value = playing;
    $0.elements.stopstart.view.label.value = playing
      ? md`⏹`
      : md`▶️`;
    $2.dispatchEvent(new Event("input", { bubble: true }));
  };
  $0.elements.stopstart.view.result.addEventListener(
    "input",
    startStopListener
  );
  invalidation.then(() =>
    $0.elements.stopstart.view.result.removeEventListener(
      "input",
      startStopListener
    )
  );
}


function _21(md){return(
md`## Implementation`
)}

function _22(){return(
32 * 12
)}

function _23(width){return(
width / 3 / 12
)}

function _grid(notebookWidth,view,d3,variable,DOM){return(
({
  config = {
    // panels, // Number of panels  (will calculate from elements)
    // rows    // size of individual panel (will calculate from elements)
    // columns = 12, // size of individual panel
    // gridSize = undefined, // Near 32px and stored in CSS var(--gridSize)
  },
  elements = {
    //  <string: logical name of element>: {
    //    p: <number: panel the element is on>
    //    x: <number: x coord on grid>,
    //    y: <number: y coord on grid>,
    //    z: <number: z-index for occlusion>,
    //    w: <number: width on grid>,
    //    h: <number: height on grid>
    //    view: <DOMNode: the visual element>
    //  }
  },
  width = notebookWidth
} = {}) => {
  const viewLit = view;

  if (!config.gridSize) {
    config.gridSize = width < 32 * 12 ? width / 12 : 32;
  }
  if (!config.panels) {
    config.panels =
      d3.max(
        Object.entries(elements).map(([name, value]) => value.p || 0) || 0
      ) + 1;
  }
  if (!config.rows) {
    config.rows =
      d3.max(
        Object.entries(elements).map(
          ([name, value]) => (value.y || 0) + (value.h || 1)
        )
      ) || 0;
    config.rows = Math.max(1, config.rows);
  }

  const gridSizeVar = variable(config.gridSize, { name: "gridSize" });
  const columnsVar = variable(config.columns || 12, { name: "columns" });
  const rowsVar = variable(config.rows, { name: "rows" });
  const panelsVar = variable(config.panels, { name: "panels" });

  let panelsPerRow = Math.floor(width / gridSizeVar.value / columnsVar.value);
  let totalHeight = Math.ceil(panelsVar.value / panelsPerRow);

  const updateGeometry = () => {
    if (!config.panels)
      panelsPerRow = Math.floor(width / gridSizeVar.value / columnsVar.value);
    totalHeight = Math.ceil(panelsVar.value / panelsPerRow);
    panel.style.width = `calc(var(--gridSize) * ${
      panelsPerRow * columnsVar.value
    })`;
    panel.style.height = `calc(var(--gridSize) * ${
      totalHeight * rowsVar.value
    })`;

    Object.keys(panel.elements.value).forEach((childKey) =>
      panel.elements[childKey].updateXY()
    );
  };

  // This is an grid element builder, it wraps a view and places it in the grid, whilst exposting all its controls as dynamic variables
  const childView = ({
    p = 0,
    x = 0,
    y = 0,
    z = 0,
    w = 1,
    h = 1,
    view
  } = {}) => {
    const panelVar = variable(p, { name: "p" });
    const xVar = variable(x, { name: "x" });
    const yVar = variable(y, { name: "y" });
    const zVar = variable(z, { name: "z" });
    const widthVar = variable(w, { name: "width" });
    const heightVar = variable(h, { name: "height" });

    const updateXY = () => {
      ev.style.left = `calc(var(--gridSize) * ${xVar.value} + ${
        (panelVar.value % panelsPerRow) * columnsVar.value * gridSizeVar.value
      }px)`;
      ev.style.top = `calc(var(--gridSize) * ${yVar.value} + ${
        Math.floor(panelVar.value / panelsPerRow) *
        rowsVar.value *
        gridSizeVar.value
      }px)`;
    };
    panelVar.addEventListener("assign", updateXY);
    xVar.addEventListener("assign", updateXY);
    yVar.addEventListener("assign", updateXY);
    zVar.addEventListener("assign", (evt) => (ev.style.zIndex = zVar.value));
    widthVar.addEventListener(
      "assign",
      (evt) => (ev.style.width = `calc(var(--gridSize) * ${widthVar.value})`)
    );
    heightVar.addEventListener(
      "assign",
      (evt) => (ev.style.height = `calc(var(--gridSize) * ${heightVar.value})`)
    );

    const ev = viewLit`<span 
            class="gridPanel-element"
            style="z-index: ${z};
                   width:  calc(var(--gridSize) * ${w});
                   height: calc(var(--gridSize) * ${h});">
      ${["p", panelVar]}
      ${["x", xVar]}
      ${["y", yVar]}
      ${["z", zVar]}
      ${["w", widthVar]}
      ${["h", heightVar]}
      ${["view", view]}`;
    ev.updateXY = updateXY;
    updateXY();
    return ev;
  };

  const gridVar = view`<span>${[
    "...",
    {
      columns: columnsVar,
      rows: rowsVar,
      gridSize: gridSizeVar,
      panels: panelsVar
    }
  ]}`;

  gridSizeVar.addEventListener("assign", (evt) => {
    const root = document.documentElement;
    root.style.setProperty("--gridSize", `${gridSizeVar.value}px`);
    updateGeometry();
  });
  columnsVar.addEventListener("assign", updateGeometry);
  rowsVar.addEventListener("assign", updateGeometry);
  panelsVar.addEventListener("assign", updateGeometry);

  const panelNS = `panel-${DOM.uid().id}`;
  const panel = viewLit`<div class="${panelNS}">
    <style>
      :root {
        --gridSize: ${gridSizeVar.value}px;
        --panelsPerRow: ${panelsPerRow};
      }
      .${panelNS} {
        line-height: 0px;
        position: relative;
      }
      .gridPanel-element {
        display: inline-block;
        position: absolute;
      }
      .gridPanel-element > * {
        height: 100%;
        width: 100%;
      }
    </style>
    ${["config", gridVar]}
    ${[
      "elements",
      view`<span>${[
        "...",
        Object.fromEntries(
          Object.entries(elements).map(([name, d]) => [name, childView(d)])
        ),
        childView
      ]}`
    ]}
    `;
  updateGeometry();
  return panel;
}
)}

function _notebookWidth(width){return(
width
)}

function _26(md){return(
md`### Helper: Timeseries View

We use juice to "lift" data into a backwritable subvew, avoid plot cell refreshes when the data changes.
`
)}

function _dynamicTimeseriesExample(dynamicTimeseries){return(
dynamicTimeseries([], {
  width: 300,
  height: 200
})
)}

function _28(Inputs,$0,$1){return(
Inputs.bind($0.data, $1)
)}

function _dynamicTimeseries(juice,Plot){return(
juice(
  (tsData, options) =>
    Plot.plot({
      ...options,
      y: {
        domain: [-1, 1],
        grid: true
      },
      x: {
        type: "utc",
        domain: [Date.now() - 2000, Date.now()],
        grid: true
      },
      marks: [Plot.line(tsData, { x: "t", y: "y" })]
    }),
  {
    data: "[0]"
  }
)
)}

function _33(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof gridPanelExample")).define("viewof gridPanelExample", ["grid","exampleElements"], _gridPanelExample);
  main.variable(observer("gridPanelExample")).define("gridPanelExample", ["Generators", "viewof gridPanelExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["gridEditor","viewof gridPanelExample"], _3);
  main.variable(observer("gridEditor")).define("gridEditor", ["grid","md","Inputs","view","viewof selected","selected"], _gridEditor);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("exampleElements")).define("exampleElements", ["dynamicTimeseries","svg","Inputs","juice","md"], _exampleElements);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof responsiveExample")).define("viewof responsiveExample", ["grid","svg"], _responsiveExample);
  main.variable(observer("responsiveExample")).define("responsiveExample", ["Generators", "viewof responsiveExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["responsiveExample"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof tsDataRunning")).define("viewof tsDataRunning", ["Inputs"], _tsDataRunning);
  main.variable(observer("tsDataRunning")).define("tsDataRunning", ["Generators", "viewof tsDataRunning"], (G, _) => G.input(_));
  main.variable(observer("viewof logs")).define("viewof logs", ["Inputs"], _logs);
  main.variable(observer("logs")).define("logs", ["Generators", "viewof logs"], (G, _) => G.input(_));
  main.variable(observer("viewof selected")).define("viewof selected", ["Inputs"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer("viewof tsData")).define("viewof tsData", ["Inputs"], _tsData);
  main.variable(observer("tsData")).define("tsData", ["Generators", "viewof tsData"], (G, _) => G.input(_));
  main.variable(observer("timeseries_process")).define("timeseries_process", ["viewof tsData","now","viewof tsDataRunning","Event"], _timeseries_process);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("logicExample")).define("logicExample", ["Inputs","viewof gridPanelExample","viewof tsData","viewof logs","viewof tsDataRunning","md","Event","invalidation"], _logicExample);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(_22);
  main.variable(observer()).define(["width"], _23);
  main.variable(observer("grid")).define("grid", ["notebookWidth","view","d3","variable","DOM"], _grid);
  main.variable(observer("notebookWidth")).define("notebookWidth", ["width"], _notebookWidth);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof dynamicTimeseriesExample")).define("viewof dynamicTimeseriesExample", ["dynamicTimeseries"], _dynamicTimeseriesExample);
  main.variable(observer("dynamicTimeseriesExample")).define("dynamicTimeseriesExample", ["Generators", "viewof dynamicTimeseriesExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof dynamicTimeseriesExample","viewof tsData"], _28);
  main.variable(observer("dynamicTimeseries")).define("dynamicTimeseries", ["juice","Plot"], _dynamicTimeseries);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("variable", child1);
  const child2 = runtime.module(define2);
  main.import("juice", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _33);
  return main;
}
