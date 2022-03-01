import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./33bc32700f22adb1@854.js";
import define3 from "./67d1b2c32f1883c4@565.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Highlight color w/ dropdown`
)});
  main.variable(observer()).define(["unemployment"], function(unemployment){return(
unemployment
)});
  main.variable(observer("viewof selectedIndustry")).define("viewof selectedIndustry", ["Inputs","unemployment"], function(Inputs,unemployment){return(
Inputs.select(
  [...new Set(unemployment.map((d) => d.industry))].concat("none"),
  {
    label: "selected Industry to highlight"
  }
)
)});
  main.variable(observer("selectedIndustry")).define("selectedIndustry", ["Generators", "viewof selectedIndustry"], (G, _) => G.input(_));
  main.variable(observer()).define(["addTooltips","Plot","unemployment"], function(addTooltips,Plot,unemployment){return(
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
)});
  main.variable(observer()).define(["Inputs","unemployment"], function(Inputs,unemployment){return(
Inputs.table(unemployment)
)});
  main.variable(observer()).define(["Plot","unemployment","selectedIndustry","color"], function(Plot,unemployment,selectedIndustry,color){return(
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
)});
  main.variable(observer()).define(["Plot","selectedIndustry","unemployment","highlightColor"], function(Plot,selectedIndustry,unemployment,highlightColor){return(
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
)});
  main.variable(observer()).define(["addTooltips","Plot","unemployment","selectedIndustry","color"], function(addTooltips,Plot,unemployment,selectedIndustry,color){return(
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
)});
  main.variable(observer()).define(["Plot","unemployment","selectedIndustry","color"], function(Plot,unemployment,selectedIndustry,color){return(
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
)});
  main.variable(observer("viewof highlightColor")).define("viewof highlightColor", ["colorPicker"], function(colorPicker){return(
colorPicker({
  value: "#478eff",
  title: "Highlight Color",
})
)});
  main.variable(observer("highlightColor")).define("highlightColor", ["Generators", "viewof highlightColor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---------------`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-------`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Supporting Code`
)});
  main.variable(observer("color")).define("color", ["highlightColor"], function(highlightColor){return(
{ domain: [true, false], range: [highlightColor, "#aaa"] }
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Imports`
)});
  const child1 = runtime.module(define1);
  main.import("color", "colorPicker", child1);
  const child2 = runtime.module(define2);
  main.import("unemployment", child2);
  const child3 = runtime.module(define3);
  main.import("addTooltips", child3);
  return main;
}
