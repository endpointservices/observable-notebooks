// https://observablehq.com/@mkfreeman/plot-tooltip@661
import define1 from "./d2dffac0e42406e8@3045.js";
import define2 from "./32eeadb67cb4cbcb@1472.js";
import define3 from "./8d6618bb2d7befdd@199.js";

function _1(md){return(
md`# Plot Tooltip
## Two approaches for easily adding tooltips to your plots`
)}

function _2(md){return(
md`## Tooltips on all plots
Want to add tooltips to _all_ of your plots? Import \`plot\` from _this notebook_, then simply set a \`title\` attribute for any mark in your plot call (_note, this approach only works with \`Plot.plot()\` calls, not \`Plot.MARK().plot()\`_)

~~~js
// Import Plot with additional tooltip functionality from this notebook
import {Plot} from "@mkfreeman/plot-tooltip"
~~~
`
)}

function _3(Plot,data){return(
Plot.plot({
  marks: [
    Plot.dot(data, {
      x: "bill_length",
      y: "bill_depth",
      title: (d) =>
        `${d.island} \n bill depth: ${d.bill_depth} \n bill length: ${d.bill_length}` // \n makes a new line
    })
  ]
})
)}

function _4(md){return(
md`To customize the style of the hovered element, specify a \`tooltip\` property with key-value pairs specifying the desired styles in your \`Plot\` call:`
)}

function _5(Plot,data){return(
Plot.plot({
  marks: [
    Plot.dot(data, {
      x: "bill_length",
      y: "bill_depth",
      title: (d) =>
        `${d.island} \n bill depth: ${d.bill_depth} \n bill length: ${d.bill_length}` // \n makes a new line
    })
  ],
  tooltip: {
    fill: "red",
    stroke: "blue",
    r: 8
  }
})
)}

function _6(md){return(
md`_(many thanks to [@fil](https://observablehq.com/@fil) for this implementation!_`
)}

function _7(md){return(
md`## Tooltips on a single plot`
)}

function _8(md){return(
md`Alternatively, to add tooltips to a _single_ plot, you can import the \`addTooltips\` function and pass your plot to it.

~~~js
// Import into your own notebook first
import {addTooltips} from "@mkfreeman/plot-tooltip"
~~~

_(many thanks to [@fil](https://observablehq.com/@fil) for the idea, [prior art](https://observablehq.com/@fil/experimental-plot-tooltip-01), and help debugging!)_`
)}

function _9(addTooltips,Plot,data){return(
addTooltips(
  Plot.dot(data, {
    x: "bill_length",
    y: "bill_depth",
    title: (d) =>
      `${d.island} \n bill depth: ${d.bill_depth} \n bill length: ${d.bill_length}` // \n makes a new line
  }).plot()
)
)}

function _10(md){return(
md`Want to customize what a hovered element looks like? Pass in a \`{hoverStyles}\` object:`
)}

function _11(addTooltips,Plot,data){return(
addTooltips(
  Plot.rectY(
    data,
    Plot.binX(
      { y: "count", title: (elems) => `${elems.length} rows` },
      { x: "body_mass", thresholds: 20 }
    )
  ).plot(),
  // Set styles for the hovered element
  { fill: "gray", opacity: 0.5, "stroke-width": "3px", stroke: "red" }
)
)}

function _12(addTooltips,Plot,data){return(
addTooltips(
  Plot.dot(
    data,
    Plot.binX(
      { y: "count", title: (elems) => `${elems.length} rows` },
      { x: "body_mass", thresholds: 20 }
    )
  ).plot(),
  // Set styles for the hovered element
  { fill: "gray", opacity: 0.5, "stroke-width": "3px", stroke: "red" }
)
)}

function _13(md){return(
md`ProTip 😉! You may want to adjust the \`paddingTop\` of your plot to ensure you can see the tooltip:`
)}

function _14(addTooltips,Plot,data,width){return(
addTooltips(
  Plot.barX(data, {
    x: "body_mass",
    fill: "island",
    title: (d) => d.island + "\n" + d.bill_length
  }).plot({ 
    // caption: "test", 
    style: { paddingTop: 30 }, 
    width 
  })
)
)}

function _15(addTooltips,Plot,unemployment){return(
addTooltips(
  Plot.plot({
    y: {
      label: "↑ Unemployed (thousands)"
    },
    marks: [
      Plot.areaY(
        unemployment,
        Plot.stackY({
          x: "date",
          y: "unemployed",
          fill: "industry",
          z: "industry",
          title: "industry",
          order: "max",
          reverse: true,
          stroke: "#ddd"
        })
      ),
      Plot.ruleY([0])
    ],
    style: {
      pointerEvents: "all"
    },
    color: {
      legend: true,
      columns: "110px",
      width: 640
    }
  })
)
)}

function _16(addTooltips,Plot,unemployment){return(
addTooltips(
  Plot.plot({
    y: {
      label: "↑ Unemployed (thousands)"
    },
    marks: [
      Plot.line(unemployment, {
        x: "date",
        y: "unemployed",
        stroke: 'lightgrey',
        z: "industry",
        title: "industry"
      }),
      Plot.ruleY([0])
    ]
  }),
)
)}

function _17(md){return(
md`Works with a legend (now)`
)}

function _19(addTooltips,Plot,brandData){return(
addTooltips(
  Plot.plot({
    marks: [
      Plot.cell(brandData, {
        x: "date",
        y: "brand",
        fill: "value",
        title: "value"
      })
    ],
    color: { scheme: "blues", legend: true, reverse: false },
    marginLeft: 100,
    x: { tickFormat: null },
    width: 578
  })
)
)}

function _20(md){return(
md`## Implementation`
)}

function _addTooltips(d3,id_generator,hover,html){return(
(chart, styles) => {
  const stroke_styles = { stroke: "blue", "stroke-width": 3 };
  const fill_styles = { fill: "blue", opacity: 0.5 };

  // Workaround if it's in a figure
  const type = d3.select(chart).node().tagName;
  let wrapper =
    type === "FIGURE" ? d3.select(chart).select("svg") : d3.select(chart);

  // Workaround if there's a legend....
  const svgs = d3.select(chart).selectAll("svg");
  if (svgs.size() > 1) wrapper = d3.select([...svgs].pop());
  wrapper.style("overflow", "visible"); // to avoid clipping at the edges

  // Set pointer events to visibleStroke if the fill is none (e.g., if its a line)
  wrapper.selectAll("path").each(function (data, index, nodes) {
    // For line charts, set the pointer events to be visible stroke
    if (
      d3.select(this).attr("fill") === null ||
      d3.select(this).attr("fill") === "none"
    ) {
      d3.select(this).style("pointer-events", "visibleStroke");
      if (styles === undefined) styles = stroke_styles;
    }
  });
  
  if (styles === undefined) styles = fill_styles;

  const tip = wrapper
    .selectAll(".hover")
    .data([1])
    .join("g")
    .attr("class", "hover")
    .style("pointer-events", "none")
    .style("text-anchor", "middle");

  // Add a unique id to the chart for styling
  const id = id_generator();

  // Add the event listeners
  d3.select(chart).classed(id, true); // using a class selector so that it doesn't overwrite the ID
  wrapper.selectAll("title").each(function () {
    // Get the text out of the title, set it as an attribute on the parent, and remove it
    const title = d3.select(this); // title element that we want to remove
    const parent = d3.select(this.parentNode); // visual mark on the screen
    const t = title.text();
    if (t) {
      parent.attr("__title", t).classed("has-title", true);
      title.remove();
    }
    // Mouse events
    parent
      .on("pointerenter pointermove", function (event) {
        const text = d3.select(this).attr("__title");
        const pointer = d3.pointer(event, wrapper.node());
        if (text) tip.call(hover, pointer, text.split("\n"));
        else tip.selectAll("*").remove();

        // Raise it
        d3.select(this).raise();
        // Keep within the parent horizontally
        const tipSize = tip.node().getBBox();
        if (pointer[0] + tipSize.x < 0)
          tip.attr(
            "transform",
            `translate(${tipSize.width / 2}, ${pointer[1] + 7})`
          );
        else if (pointer[0] + tipSize.width / 2 > wrapper.attr("width"))
          tip.attr(
            "transform",
            `translate(${wrapper.attr("width") - tipSize.width / 2}, ${
              pointer[1] + 7
            })`
          );
      })
      .on("pointerout", function (event) {
        tip.selectAll("*").remove();
        // Lower it!
        d3.select(this).lower();
      });
  });

  // Remove the tip if you tap on the wrapper (for mobile)
  wrapper.on("touchstart", () => tip.selectAll("*").remove());

  // Define the styles
  chart.appendChild(html`<style>
  .${id} .has-title { cursor: pointer;  pointer-events: all; }
  .${id} .has-title:hover { ${Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(" ")} }`);

  return chart;
}
)}

function _hover(){return(
(tip, pos, text) => {
  const side_padding = 10;
  const vertical_padding = 5;
  const vertical_offset = 15;

  // Empty it out
  tip.selectAll("*").remove();

  // Append the text
  tip
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("transform", `translate(${pos[0]}, ${pos[1] + 7})`)
    .selectAll("text")
    .data(text)
    .join("text")
    .style("dominant-baseline", "ideographic")
    .text((d) => d)
    .attr("y", (d, i) => (i - (text.length - 1)) * 15 - vertical_offset)
    .style("font-weight", (d, i) => (i === 0 ? "bold" : "normal"));

  const bbox = tip.node().getBBox();

  // Add a rectangle (as background)
  tip
    .append("rect")
    .attr("y", bbox.y - vertical_padding)
    .attr("x", bbox.x - side_padding)
    .attr("width", bbox.width + side_padding * 2)
    .attr("height", bbox.height + vertical_padding * 2)
    .style("fill", "white")
    .style("stroke", "#d3d3d3")
    .lower();
}
)}

function _id_generator(){return(
() => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return "a" + S4() + S4();
}
)}

async function _Plot(tooltipPlugin,require){return(
tooltipPlugin(await require("@observablehq/plot"))
)}

function _tooltipPlugin(addTooltips){return(
(Plot) => {
  const { plot } = Plot;
  Plot.plot = ({ tooltip, ...options }) => addTooltips(plot(options), tooltip);
  return Plot;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Plot","data"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["addTooltips","Plot","data"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["addTooltips","Plot","data"], _11);
  main.variable(observer()).define(["addTooltips","Plot","data"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["addTooltips","Plot","data","width"], _14);
  main.variable(observer()).define(["addTooltips","Plot","unemployment"], _15);
  main.variable(observer()).define(["addTooltips","Plot","unemployment"], _16);
  main.variable(observer()).define(["md"], _17);
  const child1 = runtime.module(define1);
  main.import("data", "brandData", child1);
  main.variable(observer()).define(["addTooltips","Plot","brandData"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("addTooltips")).define("addTooltips", ["d3","id_generator","hover","html"], _addTooltips);
  main.variable(observer("hover")).define("hover", _hover);
  main.variable(observer("id_generator")).define("id_generator", _id_generator);
  main.variable(observer("Plot")).define("Plot", ["tooltipPlugin","require"], _Plot);
  main.variable(observer("tooltipPlugin")).define("tooltipPlugin", ["addTooltips"], _tooltipPlugin);
  const child2 = runtime.module(define2);
  main.import("data", child2);
  const child3 = runtime.module(define3);
  main.import("unemployment", child3);
  return main;
}
