import define1 from "./35656cd2b56bad1b@1535.js";
import define2 from "./f3d342db2d382751@886.js";
import define3 from "./a2e58f97fd5e8d7c@756.js";
import define4 from "./aea6911280ea0400@1801.js";
import define5 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# COVID-19 Netherlands Reproduction Number Tutorial `
)}

function _2(Plot,defaults,showBollingerBand,data,area,baseline,Rline,measures,textY){return(
Plot.plot({
  ...defaults,
  marks: [    

    showBollingerBand ? Plot.areaY(data, {x: "date", y1: "lower", y2: "upper", fill:"gainsboro"}) : [],

    area("green", data),
    area("red", data),

    Plot.ruleY([baseline], {strokeDasharray: "9"}),
    Rline,
    
    Plot.text(measures, {x: "datum", y: d => textY(d), text: d => d.kern, textAnchor: "start"}),
    
    Plot.ruleX(measures, {x: "datum", y1: _ => 1, y2: d => textY(d)}),
    
  ],
  // caption: html`Figure 1. This chart has a <i>fancy</i> caption.`,
})
)}

function _3(md){return(
md`We’ll recreate the chart from [COVID-19 Reproductiegetal (pre-Plot)](https://observablehq.com/@martien/covid-19-reproductiegetal-pre-plot) (see below for the chart).

## BLUF
If this is one of your first contacts with [Observable Plot](https://observablehq.com/@observablehq/plot), you will find that it:
* is very well documented, with many illustrative examples;
* has a very powerful, declarative style; almost no customized code needed;
* is quite intuitive: if you’re already into Observable, JS, CSS, and some d3, you can often guess how to do things;
* reduces original D3 code quite a bit: a little under 100 LOC (original) to less than 20 LOC (Plot): expressive and highly evolvable code;

## Thoughts and actions…
…in chronological order.

1. [Get, clean, prep, and trim the data](#getTheData)
1. [Chart it – it’s a breeze](#chartIt)
1. [Dash the baseline](#dashTheBaseline)
1. [Add a Bollinger Band](#bollingerBand)
1. [Turn it into a difference chart](#differenceChart)

Started reading at [Hello, Plot!](https://observablehq.com/@plotpreview/hello-plot).

Wow, the documentation is already quite complete and comprehensible. See [Plot](https://observablehq.com/collection/@plotpreview/plot). I’m very impressed.
`
)}

function _getTheData(md){return(
md`## Get, clean, prep, and trim the data
Let’s start simple and try to replicate [COVID-19 Reproductiegetal](https://observablehq.com/@martien/covid-19-reproductiegetal) (see graph below).`
)}

function _6(covid){return(
covid
)}

function _7(md){return(
md`To get started, import Plot and d3.`
)}

function _9(md,rivmURL){return(
md`The source of the data is described by the Dutch RIVM (National Institute for Public Health and the Environment) at:
* [Covid-19 reproductiegetal « Data « RIVM](https://data.rivm.nl/geonetwork/srv/dut/catalog.search#/metadata/ed0699d1-c9d5-4436-8517-27eb993eab6e?tab=general)

Its URL is:
* [RIVM data](${rivmURL})
`
)}

function _rivmURL(){return(
"https://data.rivm.nl/covid-19/COVID-19_reproductiegetal.json"
)}

function _11(md,rivmData){return(
md`Get the data in. A modestly sized set of ${rivmData.length} records.`
)}

async function _rivmData(fetchp,rivmURL){return(
(await fetchp(rivmURL)).json()
)}

function _13(md){return(
md`Let’s import a few [Observable Inputs](https://observablehq.com/@observablehq/inputs) to display the data as a simple table.`
)}

function _15(md){return(
md`Set the default height for each table.`
)}

function _height(){return(
400
)}

function _17(md){return(
md`Show the data as a table.`
)}

function _18(Table,rivmData,height){return(
Table(
  rivmData,
  {
    height,
    columns: [
      "Date",
      "Rt_low",
      "Rt_avg",
      "Rt_up",
      "population",
      "version",
    ],
    // width: {date: "15%", lower: "10%", middle: "10%"},
  }
)
)}

function _19(md){return(
md`Notice that the last ten entries or so have no Rt_avg; so we better omit them in the cleaned up version to stop the line properly; otherwise the line falls flat on its nose to zero.
`
)}

function _20(Table,rivmData,height){return(
Table(
  rivmData.slice(-17),
  {
    height,
    columns: [
      "Date",
      "Rt_low",
      "Rt_avg",
      "Rt_up",
      "population",
      "version",
    ],
    // width: {date: "15%", lower: "10%", middle: "10%"},
  }
)
)}

function _21(md,weeks){return(
md`Let’s clean the data up a bit and map the column names to something more human, e.g. date, lower, R, and upper.

Lower and upper can be used for [Bollinger Bands](https://en.wikipedia.org/wiki/Bollinger_Bands).

After cleaning up and mapping, use only data of the last ${weeks} weeks.`
)}

function _weeks(Range){return(
Range([4, 52], {value: 26, label: `Past weeks`, step: 1})
)}

function _asFrom(addDays,weeks){return(
addDays(Date.now(), -7 * weeks)
)}

function _addDays(){return(
(date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
)}

function _data(rivmData,asFrom){return(
rivmData // Map RIVM names to more humanly meaningful names
.filter(p => new Date(p.Date) > asFrom) // Filter Early & Often: Only use valid data and from a specific date
.map(
  (k, i) => ({
    date: new Date(k.Date),
    lower: +k.Rt_low,
    R: k.Rt_avg === undefined ? undefined : +k.Rt_avg,  // Only include Rt_avg/middle if present
    upper: +k.Rt_up,
  })
)
)}

function _26(Table,data,height){return(
Table(
  data,
  {
    height,
    columns: [
      "date",
      "lower",
      "R",
      "upper",
    ],
  }
)
)}

function _27(md){return(
md`Also import and filter the governmental measures so we can add them to the plot later.`
)}

function _measures(maatregels,asFrom){return(
maatregels.filter(m => m.datum > asFrom)
)}

function _chartIt(md){return(
md`## Chart it – it’s a breeze`
)}

function _31(md){return(
md`With a subset of clean data, generating a line chart is a breeze.`
)}

function _32(md){return(
md`I will cheat a bit. In retrospect, it appears that some configuration data is constant across the notebook. Because of the motto [don’t repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), we’ll set it once here so we and use it for each plot.`
)}

function _defaults(width,height){return(
{
  width, // make it as wide as the page
  height, // use a constant height throughout the notebook
  y: {domain: [0.5, 1.5]}, // so all plots have a consistent scale (and height)
  grid: true,
}
)}

function _34(Plot,defaults,Rline){return(
Plot.plot({
  ...defaults,
  marks: [
    Rline,
  ]
})
)}

function _35(md){return(
md`
Interestingly, the actual line plotting can be captured in a variable (\`Rline\` in this example), and then reused across different Plot.plots. Nice.
`
)}

function _Rline(Plot,data){return(
Plot.line(data, {x: "date", y: "R", stroke: "darkslateblue"})
)}

function _37(md){return(
md`Since R > 1 is bad, R < 1 is good. See [Basic reproduction number](https://en.wikipedia.org/wiki/Basic_reproduction_number), let’s add a baseline line at R = 1 (that is, y = 1).
`
)}

function _dashTheBaseline(md){return(
md`## Dash the baseline

Hmmm… how to dash it? Is it intuitively simply an extra parameter with a line configuration object? **¥€$!**. Great.
`
)}

function _39(Plot,defaults,baseline,Rline){return(
Plot.plot({
  ...defaults,
  marks: [
    Plot.ruleY([baseline], {strokeDasharray: "9"}),
    Rline,
  ]
})
)}

function _bollingerBand(md){return(
md`## Add a [Bollinger Band](https://en.wikipedia.org/wiki/Bollinger_Bands)
We’ll draw the Bollinger Band first, as a backdrop to the rest. Let’s also include a control to toggle its visibility.
`
)}

function _41(Plot,defaults,showBollingerBand,data,baseline,Rline){return(
Plot.plot({
  ...defaults,
  marks: [
    showBollingerBand ? Plot.areaY(data, {x: "date", y1: "lower", y2: "upper", fill:"gainsboro"}) : [],
    Plot.ruleY([baseline], {strokeDasharray: "9"}),
    Rline,
  ]
})
)}

function _showBollingerBand(Toggle){return(
Toggle({label: "Show Bollinger Band", value: true})
)}

function _43(md){return(
md`Wow, that was easy. With help from [Plot: Area](https://observablehq.com/@plotpreview/plot-area).`
)}

function _differenceChart(md){return(
md`
## Turn it into a difference chart
So, finally, let’s:
* color the area between R and the baseline of *y* = 1:
  * R > 1 light red;
  * R < 1 light green; and
* add the governmental measures to lower R.

Requires a bit more work:
* untwine R ≤ 0 from R ≥ 0;
* draw each ‘thread’ separately by \`area()\`.

The dates of the governmental measures are easily joined to the dates of R.
`
)}

function _final(Plot,defaults,showBollingerBand,data,area,baseline,Rline,measures,textY){return(
Plot.plot({
  ...defaults,
  marks: [    

    showBollingerBand ? Plot.areaY(data, {x: "date", y1: "lower", y2: "upper", fill:"gainsboro"}) : [],

    area("green", data),
    area("red", data),

    Plot.ruleY([baseline], {strokeDasharray: "9"}),
    Rline,
    
    Plot.text(measures, {x: "datum", y: d => textY(d), text: d => d.kern, textAnchor: "start"}),
    
    Plot.ruleX(measures, {x: "datum", y1: _ => 1, y2: d => textY(d)}),
    
  ],
  // caption: html`Figure 1. This chart has a <i>fancy</i> caption.`,
})
)}

function _area(Plot,baseline,deltaFromBaseline){return(
(color, data) =>
Plot.areaY(
  data,
  {
    fill: color,
    fillOpacity: .2,
    x: "date",
    y1: _ => baseline,
    y2: d => deltaFromBaseline(color, d.R),
  }
)
)}

function _deltaFromBaseline(baseline){return(
(color, R) => ({
  green: R <= baseline,
  red: R >= baseline
})[color] ? R : NaN
)}

function _textY(){return(
d => 1.3 + (d.positie - 1) / 25
)}

function _baseline(Range,defaults){return(
Range([defaults.y.domain[0], 1.5], {value: 1, label: `Baseline`, step: .01})
)}

function _50(md){return(
md`From the original, I skipped adding:
* hover over data points to reveal exact value;
* governmental measures to combat COVID.`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["Plot","defaults","showBollingerBand","data","area","baseline","Rline","measures","textY"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("getTheData")).define("getTheData", ["md"], _getTheData);
  const child1 = runtime.module(define1);
  main.import("covid", child1);
  main.variable(observer()).define(["covid"], _6);
  main.variable(observer()).define(["md"], _7);
  const child2 = runtime.module(define2);
  main.import("Plot", child2);
  main.import("d3", child2);
  main.variable(observer()).define(["md","rivmURL"], _9);
  main.variable(observer("rivmURL")).define("rivmURL", _rivmURL);
  main.variable(observer()).define(["md","rivmData"], _11);
  main.variable(observer("rivmData")).define("rivmData", ["fetchp","rivmURL"], _rivmData);
  main.variable(observer()).define(["md"], _13);
  const child3 = runtime.module(define3);
  main.import("Table", child3);
  main.import("Range", child3);
  main.import("Toggle", child3);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["Table","rivmData","height"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["Table","rivmData","height"], _20);
  main.variable(observer()).define(["md","weeks"], _21);
  main.variable(observer("viewof weeks")).define("viewof weeks", ["Range"], _weeks);
  main.variable(observer("weeks")).define("weeks", ["Generators", "viewof weeks"], (G, _) => G.input(_));
  main.variable(observer("asFrom")).define("asFrom", ["addDays","weeks"], _asFrom);
  main.variable(observer("addDays")).define("addDays", _addDays);
  main.variable(observer("data")).define("data", ["rivmData","asFrom"], _data);
  main.variable(observer()).define(["Table","data","height"], _26);
  main.variable(observer()).define(["md"], _27);
  const child4 = runtime.module(define4);
  main.import("maatregels", child4);
  main.variable(observer("measures")).define("measures", ["maatregels","asFrom"], _measures);
  main.variable(observer("chartIt")).define("chartIt", ["md"], _chartIt);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("defaults")).define("defaults", ["width","height"], _defaults);
  main.variable(observer()).define(["Plot","defaults","Rline"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("Rline")).define("Rline", ["Plot","data"], _Rline);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("dashTheBaseline")).define("dashTheBaseline", ["md"], _dashTheBaseline);
  main.variable(observer()).define(["Plot","defaults","baseline","Rline"], _39);
  main.variable(observer("bollingerBand")).define("bollingerBand", ["md"], _bollingerBand);
  main.variable(observer()).define(["Plot","defaults","showBollingerBand","data","baseline","Rline"], _41);
  main.variable(observer("viewof showBollingerBand")).define("viewof showBollingerBand", ["Toggle"], _showBollingerBand);
  main.variable(observer("showBollingerBand")).define("showBollingerBand", ["Generators", "viewof showBollingerBand"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("differenceChart")).define("differenceChart", ["md"], _differenceChart);
  main.variable(observer("final")).define("final", ["Plot","defaults","showBollingerBand","data","area","baseline","Rline","measures","textY"], _final);
  main.variable(observer("area")).define("area", ["Plot","baseline","deltaFromBaseline"], _area);
  main.variable(observer("deltaFromBaseline")).define("deltaFromBaseline", ["baseline"], _deltaFromBaseline);
  main.variable(observer("textY")).define("textY", _textY);
  main.variable(observer("viewof baseline")).define("viewof baseline", ["Range","defaults"], _baseline);
  main.variable(observer("baseline")).define("baseline", ["Generators", "viewof baseline"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _50);
  const child5 = runtime.module(define5);
  main.import("fetchp", child5);
  return main;
}
