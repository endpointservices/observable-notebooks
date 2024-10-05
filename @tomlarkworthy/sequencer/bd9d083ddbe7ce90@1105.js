import define1 from "./f92778131fd76559@1176.js";
import define2 from "./653c46ed55693b1f@669.js";

function _1(md){return(
md`# Responsive *grid*

Place views as elements on a responsive, reactive grid. If you stick to 12 columns, it should work on mobile.

~~~js
  import {grid} from '@tomlarkworthy/grid'
~~~
`
)}

function _gridPanelExample(grid,elements){return(
grid({
  columns: 12, // Note we reactivly bind to this value to a UI below.
  rows: 12,
  elements: elements // See below, [{name: {x,y,w,h,z,element:...}}, ...]
})
)}

function _3(md){return(
md`**Backwritable reactive geometry**`
)}

function _4(grid,md,Inputs,view,$0){return(
grid({
  rows: 7,
  elements: {
    selfTitle: { panel: 0, w: 12, element: md`**Self**` },
    self: {
      panel: 0,
      y: 1,
      w: 12,
      element: Inputs.bind(
        view`<span>${[
          "rows",
          Inputs.range([1, 24], {
            label: "rows",
            value: 12,
            step: 1
          })
        ]}
      ${[
        "columns",
        Inputs.range([1, 24], { label: "columns", value: 12, step: 1 })
      ]}
      ${[
        "gridSize",
        Inputs.range([4, 64], { label: "size", value: 32, step: 1 })
      ]}
      ${[
        "panels",
        Inputs.range([1, 12], { label: "panels", value: 32, step: 1 })
      ]}`,
        $0.self
      )
    },
    elementTitle: { panel: 1, w: 12, element: md`**Element**` },
    element: {
      panel: 1,
      y: 1,
      w: 12,
      element: Inputs.bind(
        view`<span>${["x", Inputs.range([0, 36], { label: "x", value: 0 })]}
        ${["y", Inputs.range([0, 36], { label: "y", value: 12, step: 0 })]}
        ${["w", Inputs.range([1, 24], { label: "w", value: 8, step: 1 })]}
        ${["h", Inputs.range([1, 12], { label: "h", value: 8, step: 1 })]}
        ${[
          "_element",
          Inputs.input($0.value.plot.element)
        ]}`,
        $0.background
      )
    }
  }
})
)}

function _elements(dynamicTimeseries,Inputs,juice,md,svg){return(
{
  plot: {
    x: 1,
    y: 1,
    w: 10,
    h: 5,
    element: dynamicTimeseries([], {
      width: 10 * 32,
      height: 5 * 32
    })
  },
  console: {
    x: 1,
    y: 7,
    w: 10,
    h: 2,
    element: Inputs.textarea({
      value: ">",
      width: "100%",
      rows: 3
    })
  },
  stopstart: {
    x: 1,
    y: 9,
    w: 10,
    h: 2,
    element: juice(Inputs.button, { label: [0] })(md`⏹`, { width: "100%" })
  },
  background: {
    x: 0,
    y: 0,
    w: 12,
    h: 12,
    z: -1,
    element: svg`<svg viewBox="0 0 12 12" preserveAspectRatio="none">
  <rect width="100%" height="100%" fill="white" />
  <rect x="0.25" y="0.25" width="11.5" height="11.5" rx="0.5" style="fill:blue;stroke-width:0.25;stroke:rgb(0,0,0)" />`
  }
}
)}

function _6(md){return(
md`The \`elements\` are expressed as a key-value object, where \`key\` becomes the name of a data branch, and the \`value\` is the grid placement information. For a grid placement value, the attributes \`{x, y, w, h, z}\` control placement, and \`{element}\` is the DOM representation.

This creates a new composite view, where entries \`{x, y, w, h, z}\` are backwritable.

The intent is that a 12 width grid is viewable on mobile and desktop, and should used as the default width. If you want to use more horizontal space you should put three width: 12 panels together in a responsive layout. A 3x 12 column grid should tile horizontally on desktop and vertically on mobile.

We can use tricks like *juice* to transform static components like Plot, into realtime components that are dataflow quiet. Note the example is *not* emitting event continuously even though plot is being redrawn every tick.

The panels own controls are placed into a dynamic subview called 'self', where \`{width, height}\` are also back-writable.

It is natural to put business logic in a separate cell and \`Inputs.bind/addEventListener\` to the presentation layer. However, this can make 3rd party imports harder to execute as the logic must be instantiated by the importing notebook. You can also do an all-in-one cell and business logic simply by adding your \`Inputs.bind/addEventListener\` afterwards. For our example we put logic separately but either is possible.`
)}

function _7(gridPanelExample){return(
gridPanelExample
)}

function _8(md){return(
md`## Responsive

You can make your grid responsive by setting the *panel* attribute of your elements. 

The panels are arranged to suit the display width, 3 columns on desktop, less on narrower devices. 

All panels share the same height, as defined by the \`<rows>\` attrtibute of the *gridLayout*.

Each panel has its own origin for the x,y coordinates starting at 0,0 and meant for use upto (12, \`<rows>\`).  

Responsiveness is opt-in, if you want to make a non-responsive UIs, don't set the *panel*
and use all the coordinates upto 36 on Desktop.
`
)}

function _9(grid,svg){return(
grid({
  elements: {
    p0: {
      panel: 0,
      w: 12,
      h: 6,
      element: svg`<svg><rect width="100%" height="100%" fill="blue" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">panel 0</text>`
    },
    p1: {
      panel: 1,
      w: 12,
      h: 6,
      element: svg`<svg><rect width="100%" height="100%" fill="green" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">panel 1</text>`
    },
    p2: {
      panel: 2,
      w: 12,
      h: 6,
      element: svg`<svg><rect width="100%" height="100%" fill="red" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">panel 2</text>`
    },
    p3: {
      panel: 3,
      w: 12,
      h: 6,
      element: svg`<svg><rect width="100%" height="100%" fill="yellow" rx="15" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="black">panel 3</text>`
    }
  }
})
)}

function _10(md){return(
md`## Implementation`
)}

function _grid(width,d3,variable,view,DOM){return(
({
  panels, // Number of panels (will calculate from inputs otherwise)
  columns = 12, // size of individual panel
  rows, // size of individual panel
  gridSize = undefined,
  elements = {}
} = {}) => {
  if (!gridSize) {
    gridSize = width < 32 * 12 ? width / 12 : 32;
  }
  if (!panels) {
    panels =
      d3.max(
        Object.entries(elements).map(([name, value]) => value.panel || 0)
      ) + 1;
  }
  if (!rows) {
    rows =
      d3.max(
        Object.entries(elements).map(
          ([name, value]) => (value.y || 0) + (value.h || 1)
        )
      ) || 0;
    rows = Math.max(1, rows);
  }
  let panelsPerRow = Math.floor(width / gridSize / columns);
  let totalHeight = Math.ceil(panels / panelsPerRow);
  // This is an grid element builder, it wraps a view and places it in the grid, whilst exposting all its controls as dynamic variables
  const elementView = ({
    panel = 0,
    x = 0,
    y = 0,
    z = 0,
    w = 1,
    h = 1,
    element
  } = {}) => {
    const panelVar = variable(panel, { name: "panel" });
    const xVar = variable(x, { name: "x" });
    const yVar = variable(y, { name: "y" });
    const zVar = variable(z, { name: "z" });
    const widthVar = variable(h, { name: "width" });
    const heightVar = variable(w, { name: "height" });

    const updateXY = () => {
      ev.style.left = `calc(var(--gridSize) * ${xVar.value} + ${
        (panelVar.value % panelsPerRow) * 12 * gridSize
      }px)`;
      ev.style.top = `calc(var(--gridSize) * ${yVar.value} + ${
        Math.floor(panelVar.value / panelsPerRow) * rows * gridSize
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

    const ev = view`<span 
            class="gridPanel-element"
            style="z-index: ${z};
                   width:  calc(var(--gridSize) * ${w});
                   height: calc(var(--gridSize) * ${h});">
      ${["x", xVar]}
      ${["y", yVar]}
      ${["z", zVar]}
      ${["w", widthVar]}
      ${["h", heightVar]}
      ${["element", element]}`;
    updateXY();
    return ev;
  };

  const columnsVar = variable(columns, { name: "columns" });
  const rowsVar = variable(rows, { name: "rows" });
  const gridSizeVar = variable(gridSize, { name: "gridSize" });
  const panelsVar = variable(panels, { name: "panels" });
  const selfVar = view`<span>${[
    "...",
    {
      columns: columnsVar,
      rows: rowsVar,
      gridSize: gridSizeVar,
      panels: panelsVar
    }
  ]}`;

  columnsVar.addEventListener(
    "assign",
    (evt) => (panel.style.width = `calc(var(--gridSize) * ${columnsVar.value})`)
  );
  rowsVar.addEventListener(
    "assign",
    (evt) => (panel.style.height = `calc(var(--gridSize) * ${rowsVar.value})`)
  );
  gridSizeVar.addEventListener("assign", (evt) => {
    const root = document.documentElement;
    root.style.setProperty("--gridSize", `${gridSizeVar.value}px`);
  });
  const panelNS = `panel-${DOM.uid().id}`;
  const panel = view`<div class="${panelNS}">
    <style>
      :root {
        --gridSize: ${gridSize}px;
        --panelsPerRow: ${panelsPerRow};
      }
      .${panelNS} {
        line-height: 0px;
        position: relative;
        width: calc(var(--gridSize) * ${panelsPerRow * columns});
        height: calc(var(--gridSize) * ${totalHeight * rows});
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
    ${["self", selfVar]}
    ${[
      "...",
      Object.fromEntries(
        Object.entries(elements).map(([name, d]) => [name, elementView(d)])
      ),
      elementView
    ]}
    `;
  return panel;
}
)}

function _12(md){return(
md`## External Logic

Business logic is located outside of the presentation cell can can be dynamically patched in, or you can do it all at once in the same cell its up to you.
`
)}

function _logicExample(Inputs,$0,$1,$2,$3,md,Event,invalidation)
{
  // Connect timeseries chart to plot
  Inputs.bind($0.plot.element.data, $1);

  // Connect logs to console
  Inputs.bind($0.console.element, $2);

  // On button click
  let playing = true;
  const startStopListener = () => {
    debugger;
    if (playing) {
      $2.value = "> stopping\n" + $2.value;
    } else {
      $2.value = "> starting\n" + $2.value;
    }
    playing = !playing;
    $3.value = playing;
    $0.stopstart.element.label.value = playing
      ? md`⏹`
      : md`▶️`;
    $2.dispatchEvent(new Event("input", { bubble: true }));
  };
  $0.stopstart.element.result.addEventListener(
    "input",
    startStopListener
  );
  invalidation.then(() =>
    $0.stopstart.element.result.removeEventListener(
      "input",
      startStopListener
    )
  );
}


function _14(md){return(
md`## External State`
)}

function _15(md){return(
md`### Logs data`
)}

function _logs(Inputs){return(
Inputs.input(">")
)}

function _17(md){return(
md`### Timeseries Data`
)}

function _tsDataRunning(Inputs){return(
Inputs.toggle({ label: "running", value: true })
)}

function _tsData(Inputs){return(
Inputs.input([
  {
    t: Date.now(),
    y: Math.sin(Date.now() / 1000)
  }
])
)}

function _20($0,now,$1,Event)
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


function _21(md){return(
md`### Timeseries View

We use juice to "lift" data into a backwritable subvew, avoid plot cell refreshes when the data changes.
`
)}

function _dynamicTimeseriesExample(dynamicTimeseries){return(
dynamicTimeseries([], {
  width: 300,
  height: 200
})
)}

function _23(Inputs,$0,$1){return(
Inputs.bind($0.data, $1)
)}

function _24(tsData){return(
tsData
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

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof gridPanelExample")).define("viewof gridPanelExample", ["grid","elements"], _gridPanelExample);
  main.variable(observer("gridPanelExample")).define("gridPanelExample", ["Generators", "viewof gridPanelExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["grid","md","Inputs","view","viewof gridPanelExample"], _4);
  main.variable(observer("elements")).define("elements", ["dynamicTimeseries","Inputs","juice","md","svg"], _elements);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["gridPanelExample"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["grid","svg"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("grid")).define("grid", ["width","d3","variable","view","DOM"], _grid);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("logicExample")).define("logicExample", ["Inputs","viewof gridPanelExample","viewof tsData","viewof logs","viewof tsDataRunning","md","Event","invalidation"], _logicExample);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof logs")).define("viewof logs", ["Inputs"], _logs);
  main.variable(observer("logs")).define("logs", ["Generators", "viewof logs"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof tsDataRunning")).define("viewof tsDataRunning", ["Inputs"], _tsDataRunning);
  main.variable(observer("tsDataRunning")).define("tsDataRunning", ["Generators", "viewof tsDataRunning"], (G, _) => G.input(_));
  main.variable(observer("viewof tsData")).define("viewof tsData", ["Inputs"], _tsData);
  main.variable(observer("tsData")).define("tsData", ["Generators", "viewof tsData"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof tsData","now","viewof tsDataRunning","Event"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof dynamicTimeseriesExample")).define("viewof dynamicTimeseriesExample", ["dynamicTimeseries"], _dynamicTimeseriesExample);
  main.variable(observer("dynamicTimeseriesExample")).define("dynamicTimeseriesExample", ["Generators", "viewof dynamicTimeseriesExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof dynamicTimeseriesExample","viewof tsData"], _23);
  main.variable(observer()).define(["tsData"], _24);
  main.variable(observer("dynamicTimeseries")).define("dynamicTimeseries", ["juice","Plot"], _dynamicTimeseries);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("variable", child1);
  const child2 = runtime.module(define2);
  main.import("juice", child2);
  return main;
}
