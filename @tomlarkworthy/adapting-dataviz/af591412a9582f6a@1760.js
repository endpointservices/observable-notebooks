// https://observablehq.com/@observablehq/discovering-date-patterns@1760
import define1 from "./2b837bccec7319ef@194.js";
import define2 from "./67d1b2c32f1883c4@659.js";
import define3 from "./4d19ed23e9984e85@589.js";

function _1(md){return(
md`# Discovering Date Patterns
## If the only feature you have is the date, how can you uncover meaningful patterns?`
)}

function _2(authorship){return(
authorship(["Mike Freeman", "Zan Armstrong", "Ian Johnson"])
)}

function _3(md){return(
md`---`
)}

function _4(md){return(
md`Imagine you have a new project where you're tracking a performance metric hourly— you have **a full year of hourly data**, but no additional information beyond the timestamp and the metric. Before bringing in any external data, you're asked to extract meaningful patterns from the data. (_See [here](https://observablehq.com/@observablehq/correlation-over-time) for an example joining temperature data._)

As an example, we'll use hourly electricity demand data in the California region from the [OpenData API](https://www.eia.gov/opendata/), downloaded using [this notebook](https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation?collection=@observablehq/analyzing-time-series-data).`
)}

async function _raw_data(FileAttachment){return(
await FileAttachment("california.csv").csv({typed:true})
)}

function _6(Inputs,raw_data,width){return(
Inputs.table(raw_data, {columns:["date", "value"], width: width < 400 ? width : 400})
)}

function _7(md){return(
md`*Note: The "Z" indicates that the timestamps are stored in UTC*`
)}

function _8(md){return(
md`## Detecting meaningful patterns`
)}

function _9(md){return(
md`You start by looking at the full timeseries, where you notice some _seasonal fluctuations_ as well as daily noise. To provide a clearer sense of the seasonality, you can use [Observable Plot](https://observablehq.com/collection/@observablehq/plot) to smooth the data using a rolling average, and also zoom in on any dates of interest using the controls below. `
)}

function _smooth(Inputs){return(
Inputs.radio(new Map([["Hourly (no smoothing)", 1] ,["Daily", 24], ["Weekly", 168], ["28-day period", 24 * 28]]), {value:1, label:"Rolling Average:"})
)}

function _limits(brushFilterX,d3,data){return(
brushFilterX(
  d3.extent(data, (d) => d.date),
  { defaultExtent: [d3.isoParse("2020-02-01"), d3.isoParse("2020-10-10")] }
)
)}

function _12(Plot,data,limits,smooth,d3,width,md){return(
Plot.line(
  data,
  // compute the rolling average, show values in the brush selection
  Plot.windowY({
    x: d => (!limits || d.date >= limits[0] && d.date <= limits[1]) ? d.date : NaN,
    y: "value",
    k: smooth
  })
).plot({
  marks: [Plot.ruleY([0])], // draw a line at x=0
  marginLeft: 50,
  x: { label: "date (utc)→", domain: limits || undefined },
  y: {// Filtering down based on the brush
    label: "↑ Electricity Demand (MWh)",
    domain: [0, d3.max(data, (d) => d.value)]
  },
  width,
  height: 400,
  caption: md`<em>Note, this displays the x-axis in UTC time, not the local time for California.</em>`
})
)}

function _13(md){return(
md`Here are a few patterns that emerge:`
)}

async function _14(FileAttachment,htl){return(
htl.html`<div style="display: flex; flex-wrap: wrap;">
  <div style="display: flex; flex-wrap: wrap; margin-bottom: 10px;">
    <img style="max-width:260px" src="${await FileAttachment("1-hourly.png").url()}"/>
    <img style="max-width:260px" src="${await FileAttachment("2-daily.png").url()}"/>
  </div>
  <div style="display: flex; flex-wrap: wrap; margin-bottom: 10px;">
    <img style="max-width:260px" src="${await FileAttachment("3-weekly.png").url()}"/>
    <img style="max-width:260px" src="${await FileAttachment("4-yearly.png").url()}"/>
  </div>
</div>`
)}

function _15(md){return(
md`## Creating date features`
)}

function _16(md){return(
md`So far you've just been calculating rolling averages over the hourly data to reveal patterns at the daily, weekly, and monthly-ish periods ([1](https://observablehq.com/@observablehq/discovering-date-patterns#cell-1240)). 

However, you can go further and augment the data, and then compare our data using those features. As an analyst, you know that embedded in the date are meaningful categories including:
- Hour of the day
- Day of the week
- Weekend v.s. weekday
- Week of the year
- Month of the year
- Quarter of the year`
)}

function _17(md){return(
md`In the cell below we use the [Temporal Polyfill](https://github.com/tc39/proposal-temporal) to extract this information (in the appropriate timezone):`
)}

function _data(raw_data,Temporal,weekdays,months){return(
raw_data.map((d) => {
  const tzdate = Temporal.Instant.from(d.date).toZonedDateTimeISO(
    "America/Los_Angeles"
  ); // date in localized timezone
  const date = new Date(tzdate.epochMilliseconds); // Javascript Date object, stores date in browser's local timezone
  const hour = tzdate.hour;
  const dayOfMonth = tzdate.day;
  const day = weekdays[tzdate.dayOfWeek + -1];
  const weekend = tzdate.dayOfWeek > 5 ? "Weekend" : "Weekday";
  const week = tzdate.weekOfYear;
  const month = months[tzdate.month - 1];
  const quarter =
    tzdate.month < 4
      ? "Q1: Jan - Mar"
      : tzdate.month < 7
      ? "Q2: Apr - Jun"
      : tzdate.month < 10
      ? "Q3: Jul - Sep"
      : "Q4: Oct - Dec";
  const value = d.value;
  return {
    date,
    hour,
    day,
    weekend,
    week,
    month,
    quarter,
    value,
    dayOfMonth,
  };
})
)}

function _19(md){return(
md`You can now compare our metric of interest (electricity demand) to **7 different date features** instead of just one:`
)}

function _20(Inputs,data){return(
Inputs.table(data)
)}

function _21(md){return(
md`---`
)}

function _22(md){return(
md`## Breaking down hourly patterns into days, weeks, and months
Now that you've augmented your data with features like "Quarter", you can use these to facet our data. This allows for comparisons across categories, and across intersections of categories (e.g., how does the hourly demand vary within a given quarter?). 

From the analysis above, it's clear that:
- Certain hours of the day tend have the higher electricity demand
- The fluctuations we see vary by time of year. 

Based on these observations, you want to look at how the distribution of energy usage compares across quarters and hours. `
)}

async function _23(FileAttachment,htl){return(
htl.html`<div style="display: flex; flex-wrap: wrap">
  <div style="margin-bottom: 10px;">
    <img style="width:567px" src="${await FileAttachment("leftcropped.png").url()}"/>
  </div>
  <div style="margin-bottom: 10px;">
    <img style="width:569px" src="${await FileAttachment("right@1.png").url()}"/>
  </div>
</div>`
)}

function _24(md){return(
md`Using Observable, you create an interactive visualization so others can explore the data by selecting *Hour*, *Day*, *Weekend*, *Week*, *Month*, *Quarter*, or *None* to define the columns and rows of the chart (also known as _faceting_).
`
)}

function _x_facet(Inputs,facet_options){return(
Inputs.radio(facet_options, {
  label: "Break out Horizontally by:",
  value: "quarter"
})
)}

function _y_facet(Inputs,facet_options){return(
Inputs.radio(facet_options, {
  label: "Break out Vertically by:",
  value: "hour"
})
)}

function _27(addTooltips,Plot,width,data,x_facet,y_facet,get_facet_options,get_title){return(
addTooltips(
  Plot.plot({
    width,
    facet: {
      data: data,
      x: x_facet, // break out horizontally
      y: y_facet, // break out horizontally
      marginLeft: y_facet === "week" || y_facet === "hour" ? 30 : 80
    },
    fy: {
      label: null,
      ...get_facet_options(y_facet, "y") // get settings based on selection
    },
    fx: {
      label: x_facet === "week" ? "Week" : null,
      ...get_facet_options(x_facet) // get settings based on selection
    },
    marks: [
      x_facet !== "week" ? Plot.frame() : null, // don't display a frame if viewing week
      // Create rectangles for background color
      Plot.rect(
        data,
        Plot.groupZ(
          { fill: "mean",  title: get_title },
          {
            fill: "value",
            fillOpacity: 0.4,
           
          }
        )
      ),
      // Display ticks
      Plot.tickX(data, { x: "value", strokeOpacity: 0.2 })
    ],
    color: {
      scheme: "plasma",
      reverse: true
    },
    x: {
      label: "Electricity Demand (MWh) →"
    }
  }),
  { stroke: "black", "stroke-width": "3px" } // tooltip styles
)
)}

function _28(data){return(
data[0]
)}

function _29(md){return(
md`💡 *If you try "Day" and "Week", you'll see every day of the year!*`
)}

function _30(md){return(
md`## Closing`
)}

function _31(md){return(
md`Even when your data is “just” a timestamp and a value, you can explore it deeply through rolling averages with different windows or by augmenting the data into familiar time-based categories like quarters or weekends. Different breakdowns will reveal different aspects of the data.  

Want to do see this analysis with your own data? Just replace the \`raw_data\` cell with your own data in the same format (two columns: \`date\`, and \`value\`). `
)}

function _32(navigation){return(
navigation(3)
)}

function _33(md){return(
md`-------`
)}

function _34(md){return(
md`#### Footnotes

`
)}

function _35(md){return(
md`1. 28-day period: Aggregating by month can lead to spurious variation when data has strong day of week patterns. A good alternative is to use 28-day, 4-week, periods to approximate months in data that is likely to have a strong day-of-week seasonal pattern. If the month boundaries are relevant to your data, perhaps when analyzing data about rent that's due monthly, then it's better to use months. Either way we want to match the aggregation to the context of the data we're analyzing. To learn more, watch [Everything is Seasonal](https://www.youtube.com/watch?v=IiF4-g001EQ>).`
)}

function _36(md){return(
md`-----`
)}

function _37(md){return(
md`## Appendix`
)}

function _facet_options(){return(
new Map(["Hour", "Day", "Weekend", "Week", "Month", "Quarter", "None"].map(d => [d, d.toLowerCase()]))
)}

function _get_title(d3,x_facet,y_facet,capitalize){return(
(d) => {
  // Compute average
  const avg = d3.format(",.0f")(d3.mean(d, (d) => d.value));
  const x_value = x_facet === "hour" ? d[0].hour + ":00 PST" : d[0][x_facet]
  const y_value = y_facet === "hour" ? d[0].hour + ":00 PST" : d[0][y_facet]
  return `Avg. Demand: ${avg} MWh \n` + 
    (x_facet == 'none' ? "" : `${capitalize(x_facet)}: ${x_value}\n `) + 
    (y_facet == "none" ? "" : `${capitalize(y_facet)}: ${y_value}`);
}
)}

function _label_hour(){return(
(d) => d === "hour" ? ":00 PST" : ""
)}

function _get_facet_options(weekdays,width,months){return(
(facet, direction = "x") => facet === "day"
  ? { domain: weekdays, tickFormat:d => (direction === "x" && width < 600) ?d.slice(0, 1) :d}
  : facet === "month"
  ? { domain: months, tickFormat: d => (direction === "x" && width < 600) ? d.slice(0, 1) : d }
  : (facet === "hour" && width > 800) ? {tickFormat: d => d + ":00"}:{}
)}

function _capitalize(){return(
(string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
)}

function _months(){return(
["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
)}

function _weekdays(){return(
["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
)}

async function _Temporal(require)
{
  const TemporalLib = await require("@js-temporal/polyfill@0.3.0")
  return TemporalLib.Temporal
}


function _49(htl){return(
htl.html`<!-- Style for plots with captions  -->
<style>
  figure {
    max-width:none;
  }
  /* prevent tooltips on ticks */
  .plot line {
    pointer-events: none;
  }
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["california.csv", {url: new URL("./files/459facd602c61caa398fee8016ddb564c1874ee9413c6ae3357fe1e3c05edf20e1d766ba2c8465403e0fb7c29a43d8728a1ce88e5ff36d49d122f2fdad33d04a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["right@1.png", {url: new URL("./files/246efc36145aac89fb4cd59349284b9dc157c7d5d9c9733e59a0df0f8693dc7e4a229de442fbf26764beecd79ff9c4ac76a7c6d6ab8b89f37972a7d4eca38aee.png", import.meta.url), mimeType: "image/png", toString}],
    ["leftcropped.png", {url: new URL("./files/6aac3c5783ed11e6aecd30a3e5878f0327fd0dab1d97affde8de0fe597d29b806c12887fd72ecf1472b0365bee196f13ecc49d4d49742544fa49ea87e403ed35.png", import.meta.url), mimeType: "image/png", toString}],
    ["3-weekly.png", {url: new URL("./files/b4d20223aab0b21bb03c1bc7f1b29a413cd5ed3eec790984740b9d91d33a5de11e97f420708cb739c7c3d99f831be39be7430b667f7d73cd62a10a4ddb6041b0.png", import.meta.url), mimeType: "image/png", toString}],
    ["2-daily.png", {url: new URL("./files/173374ea1f17d75451f498d4f25b1f675ecf0113280429780ea60791dbc53bfefe0cf3631cdfba90baf717e2911ea753cbdf8d0818cf6c2ae88d050d279f9263.png", import.meta.url), mimeType: "image/png", toString}],
    ["1-hourly.png", {url: new URL("./files/19f915a7198ee3020f1e503615047c040c5161251fc0ba8b8e19637c5788b6a226ec44f2f414e6c8fb8f86a5dbc175cb519dc4e13f3bf606c990b4054f51d5c6.png", import.meta.url), mimeType: "image/png", toString}],
    ["4-yearly.png", {url: new URL("./files/7bd5d071fd038c265464a5445487b4a42380435032cc7bb8a58d411217ca5a8309564b06f1ef324caab0b625d1b5ba4100e1d7033e0586e3c703b469e0e189a1.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["authorship"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("raw_data")).define("raw_data", ["FileAttachment"], _raw_data);
  main.variable(observer()).define(["Inputs","raw_data","width"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof smooth")).define("viewof smooth", ["Inputs"], _smooth);
  main.variable(observer("smooth")).define("smooth", ["Generators", "viewof smooth"], (G, _) => G.input(_));
  main.variable(observer("viewof limits")).define("viewof limits", ["brushFilterX","d3","data"], _limits);
  main.variable(observer("limits")).define("limits", ["Generators", "viewof limits"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data","limits","smooth","d3","width","md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["FileAttachment","htl"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("data")).define("data", ["raw_data","Temporal","weekdays","months"], _data);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["Inputs","data"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["FileAttachment","htl"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("viewof x_facet")).define("viewof x_facet", ["Inputs","facet_options"], _x_facet);
  main.variable(observer("x_facet")).define("x_facet", ["Generators", "viewof x_facet"], (G, _) => G.input(_));
  main.variable(observer("viewof y_facet")).define("viewof y_facet", ["Inputs","facet_options"], _y_facet);
  main.variable(observer("y_facet")).define("y_facet", ["Generators", "viewof y_facet"], (G, _) => G.input(_));
  main.variable(observer()).define(["addTooltips","Plot","width","data","x_facet","y_facet","get_facet_options","get_title"], _27);
  main.variable(observer()).define(["data"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["navigation"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  const child1 = runtime.module(define1);
  main.import("brushFilterX", child1);
  const child2 = runtime.module(define2);
  main.import("addTooltips", child2);
  const child3 = runtime.module(define3);
  main.import("authorship", child3);
  main.import("readMore", child3);
  main.import("navigation", child3);
  main.import("workshop", child3);
  main.variable(observer("facet_options")).define("facet_options", _facet_options);
  main.variable(observer("get_title")).define("get_title", ["d3","x_facet","y_facet","capitalize"], _get_title);
  main.variable(observer("label_hour")).define("label_hour", _label_hour);
  main.variable(observer("get_facet_options")).define("get_facet_options", ["weekdays","width","months"], _get_facet_options);
  main.variable(observer("capitalize")).define("capitalize", _capitalize);
  main.variable(observer("months")).define("months", _months);
  main.variable(observer("weekdays")).define("weekdays", _weekdays);
  main.variable(observer("Temporal")).define("Temporal", ["require"], _Temporal);
  main.variable(observer()).define(["htl"], _49);
  return main;
}
