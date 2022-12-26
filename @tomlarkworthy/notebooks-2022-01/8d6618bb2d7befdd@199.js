import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./33bc32700f22adb1@885.js";
import define3 from "./67d1b2c32f1883c4@661.js";

function _1(md){return(
md`# Highlight color w/ dropdown`
)}

function _2(unemployment){return(
unemployment
)}

function _selectedIndustry(Inputs,unemployment){return(
Inputs.select(
  [...new Set(unemployment.map((d) => d.industry))].concat("none"),
  {
    label: "selected Industry to highlight"
  }
)
)}

function _4(addTooltips,Plot,unemployment){return(
addTooltips(Plot.plot({
  y: {
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(
      unemployment,
      Plot.stackY({
        x: "date",
        y: "unemployed",
        //fill: d => d.industry === selectedIndustry,
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
    pointerEvents:"all"
  }
}))
)}

function _5(Inputs,unemployment){return(
Inputs.table(unemployment)
)}

function _6(Plot,unemployment,selectedIndustry,color){return(
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
        fill: (d) => d.industry === selectedIndustry,
        z: "industry",
        title: "industry",
        order: "sum",
        reverse: true,
        stroke: "#ddd"
      })
    ),
    Plot.ruleY([0])
  ],
  color
})
)}

function _7(Plot,selectedIndustry,unemployment,highlightColor){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployed in " + selectedIndustry + " (thousands)"
  },
  marks: [
    Plot.areaY(
      unemployment.filter((d) => d.industry == selectedIndustry),
      Plot.stackY({
        x: "date",
        y: "unemployed",
        title: "industry",
        fill: highlightColor
      })
    ),
    Plot.ruleY([0])
  ],
  height: 200
})
)}

function _8(addTooltips,Plot,unemployment,selectedIndustry,color){return(
addTooltips(Plot.plot({
  y: {
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.line(unemployment, {
      x: "date",
      y: "unemployed",
      stroke: (d) => d.industry === selectedIndustry,
      strokeWidth: (d) => (d.industry === selectedIndustry ? 3 : 1),
      z: "industry",
      title: "industry"
    }),
    Plot.ruleY([0])
  ],
  color
}), {stroke:"black", "stroke-width": "3px"})
)}

function _9(Plot,unemployment,selectedIndustry,color){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, {
      x: "date",
      y: "unemployed",
      fill: (d) => d.industry === selectedIndustry,
      title: "industry",
      reverse: true
    }),
    Plot.ruleY([0])
  ],
  facet: {
    data: unemployment,
    y: "industry"
    // can I order facets by sum?
  },
  width: 400,
  color
})
)}

function _highlightColor(colorPicker){return(
colorPicker({
  value: "#478eff",
  title: "Highlight Color",
})
)}

function _11(md){return(
md`---------------`
)}

function _12(md){return(
md`-------`
)}

function _13(md){return(
md`### Supporting Code`
)}

function _color(highlightColor){return(
{ domain: [true, false], range: [highlightColor, "#aaa"] }
)}

function _15(md){return(
md`### Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["unemployment"], _2);
  main.variable(observer("viewof selectedIndustry")).define("viewof selectedIndustry", ["Inputs","unemployment"], _selectedIndustry);
  main.variable(observer("selectedIndustry")).define("selectedIndustry", ["Generators", "viewof selectedIndustry"], (G, _) => G.input(_));
  main.variable(observer()).define(["addTooltips","Plot","unemployment"], _4);
  main.variable(observer()).define(["Inputs","unemployment"], _5);
  main.variable(observer()).define(["Plot","unemployment","selectedIndustry","color"], _6);
  main.variable(observer()).define(["Plot","selectedIndustry","unemployment","highlightColor"], _7);
  main.variable(observer()).define(["addTooltips","Plot","unemployment","selectedIndustry","color"], _8);
  main.variable(observer()).define(["Plot","unemployment","selectedIndustry","color"], _9);
  main.variable(observer("viewof highlightColor")).define("viewof highlightColor", ["colorPicker"], _highlightColor);
  main.variable(observer("highlightColor")).define("highlightColor", ["Generators", "viewof highlightColor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("color")).define("color", ["highlightColor"], _color);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("color", "colorPicker", child1);
  const child2 = runtime.module(define2);
  main.import("unemployment", child2);
  const child3 = runtime.module(define3);
  main.import("addTooltips", child3);
  return main;
}
