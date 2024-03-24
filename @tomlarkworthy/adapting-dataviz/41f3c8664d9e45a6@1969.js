// https://observablehq.com/@observablehq/correlation-over-time@1969
import define1 from "./af591412a9582f6a@1760.js";
import define2 from "./a33468b95d0b15b0@808.js";
import define3 from "./4d19ed23e9984e85@589.js";
import define4 from "./67d1b2c32f1883c4@659.js";

function _1(md){return(
md`# Correlation over time
## How can you assess the relationship between two variables over time?
`
)}

function _2(authorship){return(
authorship(["Mike Freeman", "Zan Armstrong", "Ian Johnson"])
)}

function _3(md){return(
md`----`
)}

function _4(md){return(
md`Imagine you want to assess the relationship between two continuous variables — visually assessing this information is straightforward enough with a scatterplot, but what if you want investigate how their relationship changes over time?  

To explore this issue, we compare **two years of hourly measurements** in energy demand and temperature in Texas.

Data downloaded using the [Energy Data](https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation?collection=@observablehq/analyzing-time-series-data) and [NOAA Data](https://observablehq.com/@observablehq/noaa-weather-data-by-major-u-s-city?collection=@observablehq/analyzing-time-series-data) notebooks.`
)}

function _5(md){return(
md`---`
)}

function _6(md){return(
md`## Data`
)}

function _7(md){return(
md`As described in [Discovering Date Patterns](https://observablehq.com/@observablehq/discovering-date-patterns), you can extract rich information from timestamps about day of the week, month of the year, etc. Here, we can use the [Arquero](https://observablehq.com/@uwdata/introducing-arquero) library to join together the temperature and weather data (for a visual introduction to Arquero, see the [Data Wrangler](https://observablehq.com/@observablehq/data-wrangler)). 

*Note: in joining temperature data from a specific location with state-wide energy usage data, we are assuming that temperatures are reasonably correlated across Texas. IE - when it's hot in Dallas, it's hot in Houston ([1](https://observablehq.com/@observablehq/correlation-over-time?collection=@observablehq/analyzing-time-series-data#cell-1872)).*`
)}

function _demand(FileAttachment){return(
FileAttachment("TEX-Demand-20190927T00Z-20210927T00Z.csv").csv({typed:true})
)}

function _temperature_with_features(FileAttachment){return(
FileAttachment("dallas_temperature_with_features.csv").csv({typed:true})
)}

function _data(aq,demand,temperature_with_features){return(
aq
  .from(demand)
  .join(aq.from(temperature_with_features))
  .rename({ air_temp: "temp", value: "demand" })
  .select(aq.not("id", "name"))
  .objects()
)}

function _11(Inputs,data){return(
Inputs.table(data)
)}

function _12(md){return(
md`---`
)}

function _13(md){return(
md`## Using color to identify patterns`
)}

function _14(md){return(
md`A scatterplot offers a strong visual layout for [assessing the relationship between continuous variables](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5486871/). To see those relationships broken out by category, we could bring in additional information through each point's **color** channel.

While applying color to a categorical metric on a scatterplot is a common and standard technique, only the most blatant patterns jump out at us. And, there is a lot we can't see, either literally because of occlusion (overlapping points) or simply because it's hard to perceive the shape of each category on it's own when they're all overlapping. 

Even when there is an obvious pattern, like "green on right, purple to the left" in the "month" view below, it's still requires a lot of intentional effort to look back and forth to the legend to interpret what we're seeing. `
)}

function _period(Inputs){return(
Inputs.radio(["date", "hour", "day", "weekend","week", "month", "quarter", "daytime", "feel"], {label: "Select period", value: "month"})
)}

function _comparisonPlot(Plot,data,period,colorSchemeMap,colorScheme){return(
Plot.plot({
  marks: [
    Plot.frame(),
    Plot.dot(data, {
      sort: (_) => Math.random(), // randomly order the points to limit bias due to overplotting
      x: "temp",
      y: "demand",
      fill: period,
      fillOpacity: 0.5,
      r: 2
    })
  ],
  color: {
    type: period === "date" ? "sequential" : "ordinal",
    scheme: colorSchemeMap[colorScheme],
    reverse:
      (period == "daytime") & (colorSchemeMap[colorScheme] == "cividis") ||
      ["date", "feel"].includes(period) &
        (colorSchemeMap[colorScheme] == "RdYlBu")
        ? true
        : false
  },
  y: {
    label: "Electricity Demand (MWh)↑"
  },
  x: {
    label: "Temperature (°C)→"
  },
  marginLeft: 45
})
)}

function _17(comparisonPlot,period,Legend,d3,labels,width)
{
  const scale = comparisonPlot.scale("color");
  if (period === "date") {
    const { domain, range, interpolate } = scale;
    return Legend(
      d3.scaleUtc(domain, range).interpolate(() => interpolate),
      { title: period, tickFormat: "%b" }
    );
  } else if (period === "week" || period === "hour") {
    const { domain, range, interpolate } = scale;
    return Legend(d3.scaleLinear(domain, range), { title: period });
  }
  const { domain, range } = scale;
  const label = (i) => labels[period].get(i);
  return Legend(d3.scaleOrdinal(domain.map(label), range), {
    title: period,
    width: width < 760 ? width : (width / 3) * 2,
    tickFormat: (d) => (width < 580 && period === "month" ? d.slice(0, 1) : d)
  });
}


function _18(md){return(
md`To address this we might try different color schemes, hoping to find one that feels more insightful, better fits the data, or meets our color perception needs. Using the selector below, you can swap out different colorschemes.`
)}

function _colorScheme(Inputs,colorSchemeMap){return(
Inputs.select(
  Object.keys(colorSchemeMap), 
  {label: "Color Scheme: ",
   width: 400
  }
)
)}

function _20(md){return(
md`The default is a cyclical colorscheme, **rainbow**, that uses many hues and therefore has high perceptual differentiation for people who don't experience color vision deficiency. The colors are also easily "name-able", as we recognize them as "green", "purple", "red", etc, which makes them easier to talk about with collaborators or stake-holders. Click through to see other options, including '**magma**' which is an attractive palette ranging from dark to light, '**cividis**' which is optimized for those with limited color perception, or the diverging palette **'RdYlBu'** that runs from red through yellow to blue. 

While you might find a palette you like better, it doesn't solve the crux of the issue. It's still hard to see the forest for the trees (or, more literally, the 2-distributions for the dots). `
)}

function _21(md){return(
md`## Using facets to identify patterns`
)}

function _22(md){return(
md`As an alternative to using color, we can use [Observable Plot](https://observablehq.com/collection/@observablehq/plot) to break the data out into different groups — also known as [*facets*](https://observablehq.com/@observablehq/plot-facets?collection=@observablehq/plot) — to expose the relationships. 

`
)}

function _facet(Inputs){return(
Inputs.radio([ "month", "hour", "quarter", "weekend", "daytime", "feel"], {label: "Select period", value: "month"})
)}

function _facet_wrap(Plot,width,data,labels,facet,d3,colorSchemeMap,colorScheme,period){return(
Plot.plot({
  width,
  marks: [
    Plot.frame(),
    // Label the group a the top of the chart
    Plot.text(
      data,
      Plot.selectFirst({
        text: (d) => labels[facet].get(d[facet]),
        x: (d) => -15,
        y: 72000,
        textAnchor: "start",
        dy: 0
      })
    ),
    // Create the background rectangles to all facets
    Plot.rect(
      data,
      Plot.bin(
        { z: "count" },
        {
          x: {
            thresholds: (a, min, max) => d3.range(min, max, 1),
            value: "temp"
          },
          y: {
            thresholds: (a, min, max) => d3.range(min, max, 1000),
            value: "demand"
          },
          inset: -0.1,
          fill: "#e8e8e8",
          facet: null
        }
      )
    ),
    // Add points to each facet
    Plot.dot(data, {
      x: "temp",
      y: "demand",
      fill: facet,
      stroke: "black",
      strokeWidth: 0.1,
      fillOpacity: 0.5,
      r: 2
    }),
    // Horizontal line at 25K MWh of demand
    //Plot.ruleY([25000])
  ],
  facet: {
    data: data,
    y: (d) => Math.floor(d[facet] / 4),
    x: (d) => d[facet] % 4
  },
  fy: {
    tickFormat: null
  },
  fx: {
    tickFormat: null
  },
  y: {
    inset: 5,
    label: "Electricity Demand (MWh)↑"
  },
  x: {
    label: "Temperature (°C)→"
  },
  color: {
    type: facet === "date" ? "sequential" : "ordinal",
    scheme: colorSchemeMap[colorScheme],
    reverse:
      (period == "daytime") & (colorSchemeMap[colorScheme] == "cividis") ||
      colorSchemeMap[colorScheme] == "RdYlBu"
        ? true
        : false // because otherwise the color schemes are fighting our semantic interpretions
  },
  marginLeft: 45
})
)}

function _25(md){return(
md`
The base of each chart is the same: a light grey heatmap showing the temperature and electricity demand range for the whole year. 

On top of that base we draw brightly colored dots for that specific facet's data. 

This way we can see the shape of the 2-d distribution for each category (each small chart). And, we can see those distributions not just for each category on it's own, but in the context of the full dataset's distribution (shown in grey). 
`
)}

async function _26(FileAttachment,htl){return(
htl.html`<figure style="max-width:742px">
  <img 
    src=${await FileAttachment("facetsNotColor (6).png").url()} </img>
</figure>
</a>`
)}

function _27(md){return(
md`
In the single scatterplot with colored dots, we couldn't even find the points representing 10am.  

In the facets, not only do we see the distribution of energy/temperature at 10am but we can see that there is *relatively higher* energy usage at 10am for lower temperatures, and *relatively lower energy usage* at 10am at higher temperatures than other hours of the day. And, we can see that this is different than at 5am or 6pm. `
)}

function _28(md){return(
md`By using facets instead of just color, we take advantage of position which is a particularly strong ["pre-attentive attribute"](http://www.perceptualedge.com/articles/ie/visual_perception.pdf) for quantitative information. Hue, in constrast, is more qualitative and [prone to optical illusions](https://en.wikipedia.org/wiki/Checker_shadow_illusion). 

Moreover, as our categories are now shown using both position and color, any particular individual's ability to interpret the chart is much less reliant on their ability to differentiate specific color hues. While this is obviously critical for those with [color vision deficiencies](https://en.wikipedia.org/wiki/Color_blindness), it's one of those situations where doing the right thing for accessibility makes the charts more useful for everyone. `
)}

function _29(md){return(
md`---`
)}

function _30(md){return(
md`## Closing
In this notebook, we used three techniques to visually analyze the relationship between two variables over time:
1. Work with the implicit categories of each timestamp (day, week, month, etc.)
2. Facet to visually isolate the relationship between variables by category
3. Create a user interface to quickly explore different time categories

Using the [Plot library](https://observablehq.com/@observablehq/plot?collection=@observablehq/plot) in conjunction with [Observable Inputs](https://observablehq.com/@observablehq/inputs), we were able to combine these techniques in a way that supports rapid exploration. `
)}

function _31(md){return(
md`---`
)}

function _32(navigation){return(
navigation(5)
)}

function _33(md){return(
md`---
`
)}

function _34(md){return(
md`#### Footnotes
`
)}

function _35(md){return(
md`When joining data, it's important to ensure that **the data is "apples to apples"**. IE - that what you're joining on is comparable across the datasets, both in terms of the values and the source / meaning of the data. 

For example, this join is based on the UTC hourly timestamps which is consistent between datasets. This is ideal. 

However, there is some nuance that temperature measurements were taken at a specific location, the [Dallas / Fort Worth International Airport](https://www.google.com/maps/place/Dallas%2FFort+Worth+International+Airport/@32.2412885,-100.5965477,6.61z/data=!4m5!3m4!1s0x864c2a660d222aa7:0x73323f5e067d201c!8m2!3d32.8998091!4d-97.0403352), while the energy usage is coming from a much larger region, in this case the entire state of Texas. While this isn't ideal, we can assume that weather is highly correlated across a state. 

That said, being cognizant of this assumption can lead us to make more informed decisions. For example, if analyzing California, it's better to choose data from the Oakland or Sacramento airports than from San Francisco which has an infamous foggy, coastal micro-climate unlike neighboring regions. We can even test our assumptions by [obtaining temperature data](https://observablehq.com/@observablehq/noaa-weather-data-by-major-u-s-city?collection=@observablehq/analyzing-time-series-data) from a few locations in the state and comparing them to check for consistency. Or, if available, choosing a [smaller geographic region](https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation?collection=@observablehq/analyzing-time-series-data) in the energy dataset. `
)}

function _36(md){return(
md`## Appendix`
)}

function _labels(_,weekdays,months){return(
{
  hour: new Map(_.range(24).map((d) => [d, d + ":00"])),
  day: new Map(weekdays.map((d, i) => [i, d])),
  month: new Map(months.map((d, i) => [i, d])),
  quarter: new Map([
    [0, "Q1: Jan - Mar"],
    [1, "Q2: Apr - Jun"],
    [2, "Q3: Jul - Sep"],
    [3, "Q4: Oct - Dec "]
  ]),
  weekend: new Map([
    [0, "Weekday"],
    [1, "Weekend"]
  ]),
  week: new Map(_.range(54).map((d) => [d, d])),
  daytime: new Map([
    [0, "Work hours"],
    [1, "Evening"],
    [2, "Night"]
  ]),
  feel: new Map([
    [0, "cold"],
    [1, "moderate"],
    [2, "hot"]
  ])
}
)}

async function _Temporal(require)
{
  const TemporalLib = await require("@js-temporal/polyfill@0.2.0");
  return TemporalLib.Temporal;
}


function _colorSchemeMap(){return(
{
  'Cyclical, Nameable, High Perceptual Differentiation (rainbow)': "rainbow",
  'Dark to Light (magma)': "magma",
  'Optimized for Color Vision Deficiency (cividis)': "cividis",
  'Diverging (RdYlBu)': 'RdYlBu'
}
)}

function _40(md){return(
md`## Dependencies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["TEX-Demand-20190927T00Z-20210927T00Z.csv", {url: new URL("./files/1578d6bd9c3ded7004fc3350b0e5f2855b6dd07aa390a5066ea13933fce3acec3835a89809ee5d68e8aced1547e85610a19e1af902db49a272463749702537ac.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["dallas_temperature_with_features.csv", {url: new URL("./files/351cca219ea7e4830abc440fb6d2ff446a92faeaa62a65472c2b5a1b2fb3634bcda36c589171a7b035deca1f0df8fd55d848109c0fddabe9f9463c614984307a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["facetsNotColor (6).png", {url: new URL("./files/a33909d28c38c4bc76ed870c26801ff54515e2568cd5a25c3ccc9a4346cb148eb6ba7f2fe7dee654b8018494b0073bb850dbd6b4f1c30f1961621069c4aff3b9.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["authorship"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("demand")).define("demand", ["FileAttachment"], _demand);
  main.variable(observer("temperature_with_features")).define("temperature_with_features", ["FileAttachment"], _temperature_with_features);
  main.variable(observer("data")).define("data", ["aq","demand","temperature_with_features"], _data);
  main.variable(observer()).define(["Inputs","data"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof period")).define("viewof period", ["Inputs"], _period);
  main.variable(observer("period")).define("period", ["Generators", "viewof period"], (G, _) => G.input(_));
  main.variable(observer("comparisonPlot")).define("comparisonPlot", ["Plot","data","period","colorSchemeMap","colorScheme"], _comparisonPlot);
  main.variable(observer()).define(["comparisonPlot","period","Legend","d3","labels","width"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof colorScheme")).define("viewof colorScheme", ["Inputs","colorSchemeMap"], _colorScheme);
  main.variable(observer("colorScheme")).define("colorScheme", ["Generators", "viewof colorScheme"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof facet")).define("viewof facet", ["Inputs"], _facet);
  main.variable(observer("facet")).define("facet", ["Generators", "viewof facet"], (G, _) => G.input(_));
  main.variable(observer("facet_wrap")).define("facet_wrap", ["Plot","width","data","labels","facet","d3","colorSchemeMap","colorScheme","period"], _facet_wrap);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["FileAttachment","htl"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["navigation"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("labels")).define("labels", ["_","weekdays","months"], _labels);
  main.variable(observer("Temporal")).define("Temporal", ["require"], _Temporal);
  main.variable(observer("colorSchemeMap")).define("colorSchemeMap", _colorSchemeMap);
  main.variable(observer()).define(["md"], _40);
  const child1 = runtime.module(define1);
  main.import("months", child1);
  main.import("weekdays", child1);
  const child2 = runtime.module(define2);
  main.import("Legend", child2);
  main.import("Swatches", child2);
  const child3 = runtime.module(define3);
  main.import("authorship", child3);
  main.import("altauthorship", child3);
  main.import("navigation", child3);
  main.import("workshop", child3);
  const child4 = runtime.module(define4);
  main.import("addTooltips", child4);
  return main;
}
