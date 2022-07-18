// https://observablehq.com/@observablehq/plot-stack@885
function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none">Stack Transform / Observable Plot</h1><a href="/@observablehq/plot?collection=@observablehq/plot">Observable Plot</a> › <a href="/@observablehq/plot-transforms?collection=@observablehq/plot">Transforms</a> › Stack · <a href="https://github.com/observablehq/plot/blob/main/README.md#stack">API</a></div>

# Plot: Stack

The **stackY** transform replaces the *y* channel with *y1* and *y2* channels to form vertical “stacks” grouped on *x*. (There’s also a **stackX** transform that replaces *x* with *x1* and *x2* for horizontal stacking grouped on *y*.) For example, consider this [line](/@observablehq/plot-line?collection=@observablehq/plot) chart of Florence Nightingale’s data on deaths in the Crimean War.`
)}

function _crimea(FileAttachment){return(
FileAttachment("crimea.csv").csv({typed: true})
)}

function _3(Plot,crimea){return(
Plot.plot({
  y: {
    grid: true
  },
  color: {
    legend: true
  },
  marks: [
    Plot.lineY(crimea, {x: "date", y: "deaths", stroke: "cause", marker: "circle"}),
    Plot.ruleY([0])
  ]
})
)}

function _4(md){return(
md`If we visualized this data with non-stacked [areas](/@observablehq/plot-area?collection=@observablehq/plot), using the _y2_ channel instead of _y_, the areas would overlap and be hard to read even with multiply blending.`
)}

function _5(Plot,crimea){return(
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.areaY(crimea, {x: "date", y2: "deaths", fill: "cause", mixBlendMode: "multiply"}),
    Plot.ruleY([0])
  ]
})
)}

function _6(md){return(
md`The stackY transform replaces the *y* channel with *y1* and *y2* channels such that the area series are stacked from the *y* = 0 baseline. This makes the total deaths over time easier to read, while still showing the individual causes. The stackY transform is implicitly specified if you use the areaY *y* channel.`
)}

function _7(Plot,crimea){return(
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.areaY(crimea, {x: "date", y: "deaths", fill: "cause"}),
    Plot.ruleY([0])
  ]
})
)}

function _8(md){return(
md`The stack transform works with [bars](/@observablehq/plot-bar?collection=@observablehq/plot), too. (With an ordinal *x*-axis of dates, we must format the ticks manually; Plot might get smarter in the future.)`
)}

function _9(Plot,crimea){return(
Plot.plot({
  x: {
    type: "band",
    tickFormat: d => d.toLocaleString("en", {month: "narrow"}),
    label: null
  },
  marks: [
    Plot.barY(crimea, {x: "date", y: "deaths", fill: "cause"}),
    Plot.ruleY([0])
  ]
})
)}

function _10(md){return(
md`As another example, here’s a stacked area chart of unemployment by month and industry from the Bureau of Labor Statistics. (This chart has more than ten series, and hence colors are recycled; it would be better to aggregate the smaller industries into the “Other” series.)`
)}

function _unemployment(FileAttachment){return(
FileAttachment("unemployment.csv").csv({typed: true})
)}

function _12(stacked){return(
stacked.legend("color", {columns: "155px"})
)}

function _stacked(Plot,unemployment){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, Plot.stackY({x: "date", y: "unemployed", fill: "industry", title: "industry"})),
    Plot.ruleY([0])
  ]
})
)}

function _14(md){return(
md`The stack transform stacks from a zero baseline by default, but this can be changed with the *offset* option. Four offset methods are supported:

* *silhouette* - centered, as proposed by [Havre *et al.*](https://innovis.cpsc.ucalgary.ca/innovis/uploads/Courses/InformationVisualizationDetails2009/Havre2000.pdf)
* *wiggle* - minimizing movement, as proposed by [Byron & Wattenberg](http://leebyron.com/streamgraph/stackedgraphs_byron_wattenberg.pdf)
* *expand* - normalized to proportions in [0, 1]
* null - a zero baseline

The first two offsets are also called “streamgraphs” for their fluid appearance.`
)}

function _15(Plot,unemployment){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, Plot.stackY({offset: "silhouette", x: "date", y: "unemployed", fill: "industry"}))
  ]
})
)}

function _16(md){return(
md`The stack transform provides an *order* option for reordering series. The default respects the input order. The supported orders are:

* *sum* - order series by ascending total value
* *appearance* - order series by the index of their greatest value
* *inside-out* - order series as proposed by Byron & Wattenberg
* *z* - order series naturally by key (the *z*, *fill*, or *stroke* channel)
* *value* - order values in ascending order (*y* for stackY, *x* for stackX)
* some other string - order values according to the specified field
* a function - order values according to the specified function of data
* an array - order series by key in the specified order
* null - respect input order

The *reverse* option reverses any of the above orders. The default order is input order (null), unless the *wiggle* offset is used, in which case the default order is *inside-out* to minimize movement.`
)}

function _17(Plot,unemployment){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, Plot.stackY({offset: "wiggle", x: "date", y: "unemployed", fill: "industry"}))
  ]
})
)}

function _18(md){return(
md`While series are often ordered consistently, as above, that isn’t a requirement: the order of series can vary across stacks! This is most apparent with the *value* order, which places the largest value on the top similar to a “ribbon” chart. (See this technique in Nadja Popovich’s [“How Does Your State Make Electricity?”](https://www.nytimes.com/interactive/2018/12/24/climate/how-electricity-generation-changed-in-your-state.html) from 2018.)`
)}

function _19(Plot,unemployment){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(unemployment, Plot.stackY({
      x: "date",
      y: "unemployed",
      curve: "catmull-rom",
      fill: "industry",
      order: "value"
    })),
    Plot.ruleY([0])
  ]
})
)}

function _20(md){return(
md`The *appearance* order excels when each series has a prominent peak, such as the chart below of the RIAA’s U.S. revenue broken down by format. CD sales started declining well before the rise of digital, suggesting that the music industry was slow to provide a convenient digital product and hence lost substantial revenue to piracy. This chart also demonstrates how to share options across marks (the *xy* variable). The **stackY1** transform outputs the stacked *y1* channel as the *y* channel so that the baseline of each series can be stroked with white. (There are similar **stackY2**, **stackX1**, and **stackX2** transforms.)`
)}

function _riaa(FileAttachment){return(
FileAttachment("riaa-us-revenue.csv").csv({typed: true})
)}

function _22(Plot,riaa)
{
  const xy = {x: "year", y: "revenue", z: "format", order: "appearance", reverse: true};
  return Plot.plot({
    y: {
      grid: true,
      label: "↑ Annual revenue (billions, adj.)",
      transform: d => d / 1000
    },
    marks: [
      Plot.areaY(riaa, Plot.stackY({...xy, fill: "group", title: d => `${d.format}\n${d.group}`})),
      Plot.lineY(riaa, Plot.stackY1({...xy, stroke: "white", strokeWidth: 1})),
      Plot.ruleY([0])
    ],
    color: {legend: true}
  });
}


function _23(md){return(
md`With the *expand* offset, the stack transform will compute the proportion of each series, such that each stack spans the interval [0, 1]. The *percent* scale option then multiplies these proportions by 100 to show percentages. Very little music is actually purchased these days — nearly everything is rented by way of streaming services.`
)}

function _24(Plot,riaa)
{
  const xy = {x: "year", y: "revenue", z: "format", order: "appearance", offset: "expand", reverse: true};
  return Plot.plot({
    y: {
      grid: true,
      label: "↑ Revenue (%)",
      percent: true
    },
    marks: [
      Plot.areaY(riaa, Plot.stackY({...xy, fill: "group", title: d => `${d.format}\n${d.group}`})),
      Plot.lineY(riaa, Plot.stackY2({...xy, stroke: "white", strokeWidth: 1})),
      Plot.ruleY([0, 1])
    ]
  });
}


function _25(md){return(
md`If the null offset is used for a zero baseline, then negative values will be stacked downwards from the baseline, producing a diverging stacked chart. This is especially useful for splitting series into two categories, such as in the chart of the gender and age of U.S. congress members below. This chart uses the stackY2 transform to position [dots](/@observablehq/plot-dot?collection=@observablehq/plot).`
)}

function _congress(FileAttachment){return(
FileAttachment("us-congress-members.csv").csv({typed: true})
)}

function _27(Plot,congress){return(
Plot.plot({
  height: 300,
  x: {
    label: "Age →",
    nice: true
  },
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  marks: [
    Plot.dot(congress, Plot.stackY2({
      x: d => 2021 - d.birth,
      y: d => d.gender === "M" ? 1 : d.gender === "F" ? -1 : 0,
      fill: "gender"
    })),
    Plot.ruleY([0])
  ]
})
)}

function _28(md){return(
md`Here is another view of the same data, faceted by every ten years of age, showing how the youngest members of congress are slightly increasing gender diversity, but with a long way still to go. (The tendency of women to live longer than men may also have an effect on the older brackets, though 90+ is a clear outlier.) The **stackX** transform also generates an *x* channel that is the midpoint of the *x1* and *x2* channels for centered labels; similarly **stackY** generates a transform for *y*, too.`
)}

function _29(Plot,congress){return(
Plot.plot({
  height: 280,
  x: {
    percent: true
  },
  facet: {
    data: congress,
    y: d => Math.floor((2021 - d.birth) / 10) * 10
  },
  marks: [
    Plot.barX(congress, Plot.stackX(Plot.groupZ({x: "proportion-facet"}, {fill: "gender"}))),
    Plot.text(congress, Plot.stackX(Plot.groupZ({x: "proportion-facet", text: "first"}, {z: "gender", text: d => d.gender === "F" ? "Women" : d.gender === "M" ? "Men" : null}))),
    Plot.ruleX([0, 1])
  ]
})
)}

function _30(md){return(
md`One last example, perhaps slightly more upbeat, is this stacked area chart showing the rise of renewable energy generation in Iowa paired with the decline of coal.`
)}

function _iowa(FileAttachment){return(
FileAttachment("iowa-energy.csv").csv({typed: true})
)}

function _32(energy){return(
energy.legend("color")
)}

function _energy(Plot,iowa){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Net generation (million MWh)",
    transform: d => d / 1000
  },
  marks: [
    Plot.areaY(iowa, Plot.stackY({x: "year", y: "net_generation", fill: "source", title: "source"})),
    Plot.ruleY([0])
  ]
})
)}

function _34(md){return(
md`<a title="Plot: Map" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/@observablehq/plot-map?collection=@observablehq/plot">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>  
<a title="Plot: Stack" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="https://github.com/observablehq/plot/blob/main/README.md#stack">API Reference<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unemployment.csv", {url: new URL("./files/76f13741128340cc88798c0a0b7fa5a2df8370f57554000774ab8ee9ae785ffa2903010cad670d4939af3e9c17e5e18e7e05ed2b38b848ac2fc1a0066aa0005f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["riaa-us-revenue.csv", {url: new URL("./files/11666df39db7651969fb76fc5d735d851534b667ad348bd7a2e9e489862ccdb702734ceeed800a79b363f429a4b7fbf966b75d1bbf14c51ac13b60c99ceb3b1a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["crimea.csv", {url: new URL("./files/80f4b5aaff1b414f6fbd8cac308847b4821e42e6e00b567311c5575edcbf86c4b0cf9852e1adc12373fe9b242e1dc8343ac7ac908ef5e101309b843f14ac0d27.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["us-congress-members.csv", {url: new URL("./files/3592d7e8c98e9d838445801f2d42dc9de9f9f0fb80cf393a1977587e2ec9c79e2fee8ae2c6ea54859e9739da1cb0501c4a2fa15b8eb5d91930241172bd177d5a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["iowa-energy.csv", {url: new URL("./files/d78cafc08cb624880e5a11dc210aeacd21045517b6d2a56092699db1945ab9c756d304fb9a72e56c9d7658f63ad21eca049cd8509faa8b717805a229485f85ef.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("crimea")).define("crimea", ["FileAttachment"], _crimea);
  main.variable(observer()).define(["Plot","crimea"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","crimea"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Plot","crimea"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Plot","crimea"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("unemployment")).define("unemployment", ["FileAttachment"], _unemployment);
  main.variable(observer()).define(["stacked"], _12);
  main.variable(observer("stacked")).define("stacked", ["Plot","unemployment"], _stacked);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["Plot","unemployment"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Plot","unemployment"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["Plot","unemployment"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("riaa")).define("riaa", ["FileAttachment"], _riaa);
  main.variable(observer()).define(["Plot","riaa"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["Plot","riaa"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("congress")).define("congress", ["FileAttachment"], _congress);
  main.variable(observer()).define(["Plot","congress"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["Plot","congress"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("iowa")).define("iowa", ["FileAttachment"], _iowa);
  main.variable(observer()).define(["energy"], _32);
  main.variable(observer("energy")).define("energy", ["Plot","iowa"], _energy);
  main.variable(observer()).define(["md"], _34);
  return main;
}
