// https://observablehq.com/@observablehq/plot-cheatsheets-marks@3045
import define1 from "./794aa914fd015c9e@3360.js";
import define2 from "./9bed702f80a3797e@402.js";

function _1(md){return(
md`# Plot Cheatsheets - Marks
## Geometric symbols that represent your data`
)}

function _2(deck){return(
deck("marks")
)}

function _3(welcomeBox){return(
welcomeBox()
)}

function _4(download){return(
download({label: "Download the cheatsheets PDF"})
)}

function _5(introParagraph){return(
introParagraph()
)}

function _6(toc){return(
toc({
  headers: "h2",
  skip: "Geometric symbols that represent your data", 
})
)}

function _7(md){return(
md`---
## Overview`
)}

function _8(md){return(
md`To create a Plot, pass an **array of Marks** to your \`Plot.plot\` function.`
)}

function _9(Plot,data){return(
Plot.plot({
  // Pass in an array of desired marks
  marks: [
    // Create a line mark
    Plot.line(data, {
      x: "date",       // feature for the x channel
      y: "value",      // feature for the y channel
      stroke: "brand", // feature for the stroke
    }), 

    // Create a dot mark
    Plot.dot(data, {
      x: "date",      // feature for the x channel
      y: "value",     // feature for the y channel
      fill: "brand",  // feature for the stroke
    }), 

    // Display a horizontal line at y = 0
    Plot.ruleY([0])
  ], 
  
  // Include a legend for the color channel 
  color: {
    legend: true,
  }
})
)}

function _10(md){return(
md`Explore below to familiarize yourself with the different mark types and associated channels.`
)}

function _11(md){return(
md`---
## [Lines](https://observablehq.com/@observablehq/plot-line?collection=@observablehq/plot) and [Areas](https://observablehq.com/@observablehq/plot-area?collection=@observablehq/plot)`
)}

function _12(line,areaY,areaX,createDemo,htl){return(
htl.html`${[line, areaY, areaX].map(createDemo)}`
)}

function _13(md){return(
md`---
## [Dots](https://observablehq.com/@observablehq/plot-dot?collection=@observablehq/plot) and [Links](https://observablehq.com/@observablehq/plot-link?collection=@observablehq/plot)`
)}

function _14(dot,link,createDemo,htl){return(
htl.html`${[dot, link].map(createDemo)}`
)}

function _15(md){return(
md`---
## [Bars](https://observablehq.com/@observablehq/plot-bar?collection=@observablehq/plot) and [Rects](https://observablehq.com/@observablehq/plot-rect?collection=@observablehq/plot)`
)}

function _16(barY,barX,rectY,rectX,createDemo,htl){return(
htl.html`${[barY, barX, rectY, rectX].map(createDemo)}`
)}

function _17(md){return(
md`---
## [Ticks](https://observablehq.com/@observablehq/plot-tick?collection=@observablehq/plot) and [Rules](https://observablehq.com/@observablehq/plot-rule?collection=@observablehq/plot)`
)}

function _18(tickX,tickY,ruleX,ruleY,createDemo,htl){return(
htl.html`${[tickX, tickY, ruleX, ruleY].map(createDemo)}`
)}

function _19(md){return(
md`---
## [Cells](https://observablehq.com/@observablehq/plot-cell?collection=@observablehq/plot) and [Text](https://observablehq.com/@observablehq/plot-text?collection=@observablehq/plot)`
)}

function _20(cell,text,createDemo,htl){return(
htl.html`${[cell, text].map(createDemo)}`
)}

function _21(md){return(
md`---
## [Images](https://observablehq.com/@observablehq/plot-image)`
)}

function _22(createDemo,image){return(
createDemo(image)
)}

function _23(md){return(
md`---
## [Arrows](https://observablehq.com/@observablehq/plot-arrow)`
)}

function _24(createDemo,arrow){return(
createDemo(arrow)
)}

function _25(md){return(
md`---
## [Vectors](https://observablehq.com/@observablehq/plot-vector)`
)}

function _26(createDemo,vector){return(
createDemo(vector)
)}

function _27(md){return(
md`---
## Dataset Used`
)}

function _28(dataDescription){return(
dataDescription()
)}

function _29(Inputs,data){return(
Inputs.table(data)
)}

function _30(md){return(
md`---
## Appendix`
)}

function _31(md){return(
md`_Last updated for Plot version 0.4.0_|`
)}

function _32(md){return(
md`### Imports`
)}

function _ss(require){return(
require("simple-statistics@7.7.3")
)}

function _36(md){return(
md`### File attachments`
)}

async function _youtubeImg(FileAttachment){return(
await FileAttachment("youtubeIcon.png").url()
)}

async function _googleImg(FileAttachment){return(
await FileAttachment("googleImg@1.png").url()
)}

function _androidImg(FileAttachment){return(
FileAttachment("androidImg.png").url()
)}

function _googleCloudImg(FileAttachment){return(
FileAttachment("googleCloudImg.png").url()
)}

function _41(md){return(
md`Images downloaded from [IconFinder](https://www.iconfinder.com/), specified as free for commercial use.`
)}

function _42(md){return(
md`### Data`
)}

async function _events(FileAttachment){return(
await FileAttachment("purchase_data.csv").csv({typed:true})
)}

function _data(aq,events,d3){return(
aq.from(events)
  .derive({date: aq.escape(d => d3.utcDay(d.date))})
  .groupby("date", "brand")
  .rollup({value: d => aq.op.sum(d.price_in_usd), count: aq.op.count()})
  .orderby("date", "brand")
  .objects()
)}

function _images(youtubeImg,googleImg,googleCloudImg,androidImg){return(
[
  {brand: "YouTube", imgUrl: youtubeImg}, 
  {brand: "Google", imgUrl: googleImg},   
  {brand: "Google Cloud", imgUrl: googleCloudImg},   
  {brand: "Android", imgUrl: androidImg},   
]
)}

function _imageData(aq,data,images){return(
aq.from(data)
  .groupby("brand")
  .rollup({value: d => aq.op.sum(d.value)})
  .join_right(aq.from(images))
)}

function _wideData(aq,data){return(
aq
  .from(data)
  .groupby("brand")
  .filter((d) => d.date === aq.op.min(d.date) || d.date === aq.op.max(d.date))
  .derive({
    time: (d) => (d.date === aq.op.min(d.date) ? "startValue" : "endValue")
  })
  .derive({ startDate: (d) => aq.op.min(d.date) })
  .derive({ endDate: (d) => aq.op.max(d.date) })
  .select(aq.not("date", "count"))
  .groupby("brand", "startDate", "endDate")
  .pivot("time", "value")
)}

function _diffData(aq,data){return(
aq.from(data)
  .groupby("brand")
  .derive({diff: d => d.value - aq.op.lead(d.value)})
)}

function _changeData(diffData,aq,rotateScale){return(
diffData.derive({diffRotate: aq.escape(d => rotateScale(d.diff))})
)}

function _50(md){return(
md`### Helper functions`
)}

function _evalCodeStr(changeData,wideData,imageData,data,Plot,width,d3){return(
(str) => {
  const func = new Function("changeData", "wideData", "imageData", "data", "Plot", "width",  "d3", `return ${str}`)
  return func(changeData, wideData, imageData, data, Plot, width, d3);
}
)}

function _introParagraph(htl){return(
() => htl.html`<p style="margin-top:0px;"><a href ="https://observablehq.com/@observablehq/plot?collection=@observablehq/plot" target="_blank">Observable Plot</a> creates visualizations by combining geometric shapes (e.g., lines, dots, areas) referred to as <a href="https://observablehq.com/@observablehq/plot-marks?collection=@observablehq/plot" target="_blank">marks</a>. This approach enables multiple layered representations of your data in the same chart. Use mark functions to create geometric shapes (e.g., <a href="https://observablehq.com/@observablehq/plot-line?collection=@observablehq/plot" target="_blank"><code>Plot.line</code></a>, <a href="https://observablehq.com/@observablehq/plot-dot?collection=@observablehq/plot" target="_blank"><code>Plot.dot</code></a>, <a href="https://observablehq.com/@observablehq/plot-area?collection=@observablehq/plot" target="_blank"><code>Plot.areaY</code></a>) and pass them to your <code>Plot.plot()</code> function.</p>`
)}

function _marksExample(createDemo,rectY){return(
() => createDemo(rectY)
)}

function _rotateScale(d3,diffData)
{
  const domainSize = d3.max(d3.extent(diffData, (d) => d.diff))
  return d3
    .scaleLinear()
    .domain([-domainSize, domainSize])
    .range([0, 180]);
}


function _55(md){return(
md`### Settings`
)}

function _line(curveOptions,plotConfig,legendConfig){return(
{
  controls: [
    { type: "text", value: "// Sales over time \nPlot.line(data, {" },
    { param: "x", value: "date" },
    { param: "y", value: "value" },
    { param: "stroke", value: "brand" },
    {
      param: "strokeWidth",
      type: "range",
      value: 2,
      min: 0.1,
      max: 4,
      step: 0.1
    },
    { param: "curve", ...curveOptions },
    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
  marks: [
    Plot.line(data, {
      x: "${config.x}",
      y: "${config.y}",
      stroke: "${config.stroke}",
      strokeWidth: ${config.strokeWidth},
      curve: "${config.curve}"
    })
  ],
  ${plotConfig}, 
  ${legendConfig}
})`
}
)}

function _arrow(plotConfig,legendConfig){return(
{
  controls: [
    { type: "text", value: "// Start/end sales \nPlot.arrow(wideData, {" },
    { param: "x1", value: "startDate" },
    { param: "x2", value: "endDate" },
    { param: "y1", value: "startValue" },
    { param: "y2", value: "endValue" },    
    { param: "bend", value: true, type: "toggle" },

    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
  marks: [
    Plot.arrow(wideData, {
      x1: "${config.x1}",
      x2: "${config.x2}",
      y1: "${config.y1}",
      y2: "${config.y2}",
      bend: ${config.bend}, 
      stroke: "brand"
    })
  ],
  ${plotConfig}, 
  ${legendConfig}, 
  marginTop: 30, 
  height: 300, 
  caption: "Sales on the first and last day of the dataset"
})`
}
)}

function _areaY(curveOptions,plotConfig){return(
{
  controls: [
    { type: "text", value: "// Sales over time \nPlot.areaY(data, {" },
    { param: "x", value: "date" },
    { param: "y", value: "value" },
    { param: "order", value: "value" },
    { param: "fill", value: "brand" },
    {
      param: "fillOpacity",
      value: 0.5,
      type: "range",
      min: 0.1,
      max: 1,
      step: 0.05
    },
    { param: "curve", ...curveOptions },
    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
  marks: [
    Plot.areaY(data, {
      x: "${config.x}",
      y: "${config.y}",
      order: "${config.order}",
      fill: "${config.fill}",
      fillOpacity: ${config.fillOpacity},
      curve: "${config.curve}"   
    })
  ],
  ${plotConfig}
})`
}
)}

function _areaX(curveOptions,plotWidth){return(
{
  controls: [
    { type: "text", value: "// Sales over time \nPlot.areaX(data, {" },
    { param: "x", value: "value" },
    { param: "y", value: "date" },
    { param: "order", value: "value" },
    { param: "fill", value: "brand" },
    {
      param: "fillOpacity",
      value: 0.5,
      type: "range",
      min: 0.1,
      max: 1,
      step: 0.05
    },
    { param: "curve", ...curveOptions },
    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
  marks: [
    Plot.areaX(data, {
      x: "${config.x}",
      y: "${config.y}",
      order: "${config.order}",
      fill: "${config.fill}",
      fillOpacity: ${config.fillOpacity},
      curve: "${config.curve}"   
    })
  ],
  width: ${plotWidth}, 
  marginLeft: 80, 
  y: { reverse: true }, 
  height: 200
})`
}
)}

function _dot(plotConfig){return(
{
    controls: [
      { type: "text", value: "// Sales each day \nPlot.dot(data, {" },
      { param: "x", value: "date" },
      { param: "y", value: "value" },
      {
        param: "fill",
        type: "select",
        options: ["blue", "red", "brand"],
        value: "brand"
      },
      {
        param: "stroke",
        type: "color",
        value: "#544f4f"
      },
      {
        param: "strokeWidth",
        type: "range",
        value: 1,
        min: 0.1,
        max: 4,
        step: 0.1
      },
      { type: "text", value: "})" }
    ],
    plot: (config) => `Plot.plot({
  marks: [
    Plot.dot(data, {
      x: "${config.x}",
      y: "${config.y}",
      fill: "${config.fill}",
      stroke: "${config.stroke}",
      strokeWidth: ${config.strokeWidth}
    })
  ],
  ${plotConfig}
})`
  }
)}

function _link(regressionLine,plotWidth){return(
{
    controls: [
      { type: "text", value: "// Sales v.s. profit\nPlot.link({ length: 1 }, {" },
      { param: "x1", type: "range", min: 0, max: 100, value: regressionLine.x1, step: 1 },
      { param: "x2", type: "range", min: 0, max: 500, value: regressionLine.x2, step: 1 },
      { param: "y1", type: "range", min: -100, max: 400, value: regressionLine.y1, step: 1 },
      { param: "y2", type: "range", min: 0, max: 9185, value: regressionLine.y2, step: 1 },
      { type: "text", value: "})" }
    ],
    plot: (config) => {
      const slope = (config.y2 - config.y1) / (config.x2 - config.x1);
      const intercept = config.y1 - slope * config.x1;
      return `Plot.plot({
  marks: [
    // Values based on a linear regression below
    Plot.link({length: 1}, {
      x1: ${config.x1},
      x2: ${config.x2},
      y1: ${config.y1},
      y2: ${config.y2}
    }), 
    Plot.dot(data, {
      x: "count",
      y: "value",
      fill: (d) => (d.value > d.count * ${slope} + ${intercept} ? true : false),
      fillOpacity: 0.4
    })
  ],
  width: ${plotWidth},
  height: 200,
  color: {
    domain: [true, false],
    range: ["red", "blue"]
  }
})`;
    }
  }
)}

function _barY(plotWidth,legendConfig){return(
{
    controls: [
      {
        type: "text",
        value: `// Sales by day \nPlot.barY(data, `
      },
      {
        type: "text",
        value: `Plot.groupX({`,
        indent: 1
      },
      { param: "reducer", label: "y", value: "sum" },
      {
        type: "text",
        value: `}, {`,
        indent: 1
      },
      { param: "x", value: "..." },
      { param: "y", value: "value" },
      { param: "stroke", value: "brand" },
      { type: "text", value: "})", indent: 1 },
      { type: "text", value: ")" }
    ],
    plot: () => `Plot.plot({
  marks: [
    Plot.barY(
      data,
      Plot.groupX(
        { y: "sum" },
        { x: (d) => d3.utcFormat("%a")(d.date), y: "value", stroke: "brand" }
      )
    )
  ],
  width: ${plotWidth},
  height: 130,
  x: { ticks: 3, domain: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  marginLeft: 50, 
  ${legendConfig}
})`
  }
)}

function _barX(plotWidth){return(
{
    controls: [
      {
        type: "text",
        value: `// Sales by day \nPlot.barX(data, `
      },
      {
        type: "text",
        value: `Plot.groupY({`,
        indent: 1
      },
      { param: "reducer", label: "x", value: "sum" },
      {
        type: "text",
        value: `}, {`,
        indent: 1
      },
      { param: "x", value: `value` },
      { param: "y", value: "..." },
      { param: "stroke", value: "brand" },
      { type: "text", value: "})", indent: 1 },
      { type: "text", value: ")" }
    ],
    plot: () => `Plot.plot({
  marks: [
    Plot.barX(
      data,
      Plot.groupY(
        { x: "sum" },
        { x: "value", y: (d) => d3.utcFormat("%a")(d.date), stroke: "brand" }
      )
    )
  ],
  width: ${plotWidth}, 
  height: 130, 
  marginLeft: 50,
  y: { domain: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
})`
  }
)}

function _rectY(plotWidth){return(
{
    // Control panel (the code on the left): an array of controls, one for each line (including text)
    controls: [
      { type: "text", value: "// Sales histogram \nPlot.rectY(data,", indent: 0 },
      { type: "text", value: "Plot.binX({", indent: 1 },

      {
        param: "reducer",
        label: "y",
        type: "select",
        options: ["sum", "count"],
        value: "count"
      },
      { type: "text", value: "},{", indent: 1 },
      { param: "x", value: "date" },
      { param: "y", value: "value" },
      {
        param: "fill",
        options: ["blue", "brand", "red"],
        type: "select"
      },
      {
        param: "thresholds",
        options: [10, 50, "d3.utcDay", "d3.utcWeek", "d3.utcMonth"],
        type: "select"
      },
      {
        param: "fillOpacity",
        type: "range",
        min: 0.1,
        max: 1,
        value: 0.5,
        step: 0.05
      },
      { type: "text", value: "}", indent: 1 },
      { type: "text", value: "})" }
    ],

    // Function that returns a string of the plot code: input is key/value pairs of the controls
    plot: (config) => `Plot.plot({
  marks: [
    Plot.rectY(
      data, 
      Plot.binX(
        { y: "${config.reducer}" }, 
        {
          x: "date", 
          y: "value", 
          fill: "${config.fill}", 
          fillOpacity: ${config.fillOpacity}, 
          thresholds: ${config.thresholds}
        }
      )
    )
  ], 
  marginLeft: 100, 
  height: 200,
  width: ${plotWidth}
})`
  }
)}

function _rectX(plotWidth){return(
{
    // Control panel (the code on the left): an array of controls, one for each line (including text)
    controls: [
      { type: "text", value: "// Sales histogram \nPlot.rectX(data,", indent: 0 },
      { type: "text", value: "Plot.binY({", indent: 1 },

      {
        param: "reducer",
        label: "x",
        type: "select",
        options: ["sum", "count"],
        value: "sum"
      },
      { type: "text", value: "},{", indent: 1 },
      { param: "y", value: "date" },
      {
        param: "fill",
        options: ["blue", "brand", "red"],
        type: "select"
      },
      {
        param: "thresholds",
        options: [10, 50, "d3.utcDay", "d3.utcWeek", "d3.utcMonth"],
        type: "select"
      },
      {
        param: "fillOpacity",
        type: "range",
        min: 0.1,
        max: 1,
        value: 0.5,
        step: 0.05
      },
      { type: "text", value: "}", indent: 1 },
      { type: "text", value: "})" }
    ],

    // Function that returns a string of the plot code: input is key/value pairs of the controls
    plot: (config) => `Plot.plot({
  marks: [
    Plot.rectX(
      data,
      Plot.binY(
        { x: "${config.reducer}" },
        {
          x: "value",
          y: "date",
          fill: "${config.fill}",
          fillOpacity: ${config.fillOpacity},
          thresholds: ${config.thresholds}
        }
      )
    )
  ],
  marginLeft: 100,
  width: ${plotWidth},
  y: { reverse: true },
  height: 200
})`
  }
)}

function _cell(plotWidth){return(
{
  controls: [
    {
      type: "text",
      value: `// Create a heatmap \nPlot.cell(data, {`
    },
    { param: "x", value: "date" },
    { param: "y", value: "brand" },
    { param: "fill", value: "value" },
    // { type: "text", value: "})", indent: 1 },
    { type: "text", value: "}), \n color: {" },
    {
      param: "scheme",
      options: ["blues", "greens", "greys", "oranges", "purples", "reds"],
      value: "blues",
      type: "select"
    },
    { param: "reverse", type: "toggle" },
    { type: "text", value: "}" }
  ],
  plot: (config) => `Plot.plot({
  marks: [Plot.cell(data, { x: "${config.x}", y: "${config.y}", fill: "${config.fill}" })],
  color: { scheme: "${config.scheme}", legend: true, reverse: ${config.reverse} },
  marginLeft: 100,
  x: { tickFormat: null }, 
  width: ${plotWidth}
})`
}
)}

function _tickY(plotWidth){return(
{
  controls: [
    { type: "text", value: "// Draw each sale \nPlot.tickY(data, {" },
    { param: "x", value: "brand" },
    { param: "y", value: "date" },
    { param: "stroke", value: "brand" },
    {
      param: "strokeWidth",
      type: "range",
      min: 0.1,
      max: 2,
      value: 0.5,
      step: 0.1
    },
    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
  marks: [
    Plot.tickY(data, {
      x: "${config.x}",
      y: "${config.y}",
      stroke: "${config.stroke}",
      strokeWidth: ${config.strokeWidth}
    })
  ],
  width: ${plotWidth},
  height: 200,
  marginLeft: 100,
  y: { reverse: true }
})`
}
)}

function _tickX(plotWidth){return(
{
    controls: [
      { type: "text", value: "// Draw each sale \nPlot.tickX(data, {" },
      { param: "x", value: "date" },
      { param: "y", value: "brand" },
      { param: "stroke", value: "brand" },
      {
        param: "strokeWidth",
        type: "range",
        min: 0.1,
        max: 2,
        value: 0.5,
        step: 0.1
      },
      { type: "text", value: "})" }
    ],
    plot: (config) => `Plot.plot({
  marks: [
    Plot.tickX(data, { 
      x: "${config.x}",
      y: "${config.y}",
      stroke: "${config.stroke}",
      strokeWidth: ${config.strokeWidth}
    })
  ],
  width: ${plotWidth},  
  height: 200, 
  marginLeft: 100, 
  y: { reverse: true }
})`
  }
)}

function _text(plotWidth){return(
{
  controls: [
    { type: "text", value: "// Add text lables \nPlot.text(data, " },
    { type: "text", value: "Plot.groupY({", indent: 1 },
    { param: "reducer", label: "x", value: "sum" },
    { param: "textReducer", label: "text", value: "first" },
    { type: "text", value: "}, {", indent: 1 },
    { param: "x", value: "value" },
    { param: "y", value: "brand" },
    { param: "text", value: "brand" },
    { param: "fill", value: "brand" },
    { type: "text", value: "}))" }
  ],
  plot: (params) => `Plot.plot({
  marks: [
    Plot.textX(
      data,
      Plot.groupY(
        { x: "sum", text: "first" },
        {
          x: "value",
          y: "brand",
          text: "brand",
          textAnchor: "start",
          fill: "brand"
        }
      )
    ),
    Plot.barX(
      data,
      Plot.groupY(
        { x: "sum", text: "first" },
        {
          x: "value",
          y: "brand",
          text: "brand",
          textAnchor: "start",
          fill: "brand"
        }
      )
    )
  ],
  marginRight: 50,
  marginLeft: 10,
  width: ${plotWidth},
  y: {
    label: null,
    tickFormat: null,
    tickSize: 0
  }
})`
}
)}

function _ruleY(plotWidth){return(
{
  controls: [
    { type: "text", value: "// Add horizontal lines \nPlot.ruleY(data, " },
    { type: "text", value: "Plot.groupZ({", indent: 1 },
    {
      param: "reducer",
      label: "y",
      type: "select",
      options: ["mean", "median", "min", "max"],
      value: "mean"
    },
    { type: "text", value: "{...}", indent: 1 },
    { type: "text", value: "})" }
  ],
  plot: (params) => `Plot.plot({
  marks: [
    Plot.dot(data, {
      x: "date",
      y: "value",
      stroke: "brand",
      strokeOpacity: 0.4
    }),
    Plot.ruleY(
      data,
      Plot.groupZ({ y: "${params.reducer}" }, { y: "value", stroke: "brand" })
    ),
    Plot.text(
      data,
      Plot.groupZ(
        { y: "${params.reducer}", text: "first", x: () => d3.max(data, (dd) => dd.date) },
        {
          y: "value",
          x: "date",
          fill: "brand",
          text: "brand",
          textAnchor: "start",
          dx: 0
        }
      )
    )
  ],
  width: ${plotWidth},
  height: 230,
  x: { ticks: 3 },
  y: { type: "log", label: "Log total sales" },
  marginLeft: 50, 
  marginRight: 100
})`
}
)}

function _ruleX(plotWidth){return(
{
  controls: [
    { type: "text", value: "// Add vertical lines \nPlot.ruleX(data, " },
    { type: "text", value: "Plot.groupZ({", indent: 1 },
    {
      param: "reducer",
      label: "x",
      type: "select",
      options: ["mean", "median", "min", "max"],
      value: "mean"
    },
    { type: "text", value: "{...}", indent: 1 },
    { type: "text", value: "})" }
  ],
  plot: (params) => `Plot.plot({
  marks: [
    Plot.dot(data, { x: "value", fill: "brand", fillOpacity: 0.3 }),
    Plot.ruleX(
      data,
      Plot.groupZ({ x: "${params.reducer}" }, { x: "value", stroke: "brand" })
    )
  ],
  width: ${plotWidth},
  height: 150,
  facet: {
    data,
    y: "brand",
    marginLeft: 100
  },
  fy: {
    axis: "left"
  },
  marginRight: 100
})`
}
)}

function _image(plotWidth){return(
{
  controls: [
    { type: "text", value: "// Display images" },
    { type: "text", value: "Plot.image(imageData, {", indent: 1 },
    { param: "x", value: "value" },
    { param: "y", value: "brand" },
    { param: "src", value: "imgUrl" },
    { param: "height", value: 40, type: "range", min: 5, max: 100, step: 1 },
    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
  marks: [
    Plot.image(imageData, {
      x: "value",
      y: "brand",
      src: "imgUrl",      
      height: ${config.height}
    }), 
    Plot.bar
  ],
  marginLeft: 100,
  height: 200,
  insetLeft: 30, 
  width: ${plotWidth}
})`
}
)}

function _vector(plotConfig,legendConfig){return(
{
  controls: [
    { type: "text", value: "// Sales slope \nPlot.vector(changeData, {" },
    { param: "x", value: "date" },
    { param: "y", value: "value" },
    { param: "rotate", value: "diffRotate" },    
    { type: "text", value: "})" }
  ],
  plot: (config) => `Plot.plot({
   marks: [
    Plot.vector(changeData, {
      x: "date",
      y: "value",
      rotate: "diffRotate",
      stroke: "brand"
    }),
    Plot.line(data, {
      x: "date",
      y: "value",
      stroke: "brand",
      strokeOpacity: 0.3
    })
  ],  
  ${plotConfig}, 
  ${legendConfig}, 
  height: 300
})`
}
)}

function _regressionLine(linearRegression){return(
{
  x1: 0, 
  y1: linearRegression.b, 
  x2: 450, 
  y2: linearRegression.m * 450 + linearRegression.b
}
)}

function _linearRegression(ss,data){return(
ss.linearRegression(data.map(d => [d.count, d.value]))
)}

function _plotConfig(plotWidth){return(
`width: ${plotWidth}, 
  height: 130, 
  x: { ticks: 3 }, 
  marginLeft: 50`
)}

function _legendConfig(plotWidth){return(
`color: {
    legend: true,
    width: ${plotWidth},
    columns: "120px"
  }`
)}

function _curveOptions(){return(
{
  type: "select",
  details: "set curve",
  options: [
    "linear",
    "step",
    "step-after",
    "step-before",
    "basis",
    "cardinal",
    "catmull-rom",
    "monotone-x",
    "bump-x",
    "natural"
  ],
  value: "linear"
}
)}

function _79(md){return(
md`### Styles`
)}

function _80(inputStyles){return(
inputStyles
)}

function _81(htl){return(
htl.html`<style>
  .demo-wrapper {
    margin-top:8px !important;
  }
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["youtubeIcon.png", {url: new URL("./files/dd9624e7da061d6bcfa3cba4e71981d23cf2945f02b99777c3c66d48cf36c3afc48e375faaf1c18d47ca854d6f13b5c4e16fb4582e228cd16bc13e5fd2be8313.png", import.meta.url), mimeType: "image/png", toString}],
    ["googleImg@1.png", {url: new URL("./files/62896dcc9298fd5a56f63cb77e8a6ca6bc6d9617f26a49e6d458380914d6c81e4ba9a8e56cc9caa4df8a8869ecaba3d0027f94f6ab5f8c1d52f0dd42066072fc.png", import.meta.url), mimeType: "image/png", toString}],
    ["googleCloudImg.png", {url: new URL("./files/3cf2d4d48da9fa4ce0bf772acc6e299ce98d49baf95d3b8319947ef65c01c0d57c5950466e30983c8e917773b13842b16c98b8757a52d41a8efe53327545355e.png", import.meta.url), mimeType: "image/png", toString}],
    ["androidImg.png", {url: new URL("./files/38366b46e64ba8f382a18051e899616c8ad2aa5d35e87470e891a6439221e2945b73366237dfc00b26b8d9ef9aa6637b4957a5d2133d32b803f5851ee262bcaf.png", import.meta.url), mimeType: "image/png", toString}],
    ["purchase_data.csv", {url: new URL("./files/f06990c669c6571a25995fd1282640b5b352f0608e78914239554db701641dd2db875745e588bc35546ecedf8ddffa56e25af3f702b4f500bf4d57d8024baa34.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["deck"], _2);
  main.variable(observer()).define(["welcomeBox"], _3);
  main.variable(observer()).define(["download"], _4);
  main.variable(observer()).define(["introParagraph"], _5);
  main.variable(observer()).define(["toc"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Plot","data"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["line","areaY","areaX","createDemo","htl"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["dot","link","createDemo","htl"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["barY","barX","rectY","rectX","createDemo","htl"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["tickX","tickY","ruleX","ruleY","createDemo","htl"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["cell","text","createDemo","htl"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["createDemo","image"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["createDemo","arrow"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["createDemo","vector"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["dataDescription"], _28);
  main.variable(observer()).define(["Inputs","data"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("ss")).define("ss", ["require"], _ss);
  const child1 = runtime.module(define1).derive(["data","evalCodeStr"], main);
  main.import("createDemo", child1);
  main.import("intro", child1);
  main.import("getConfig", child1);
  main.import("plotWidth", child1);
  main.import("dataDescription", child1);
  main.import("download", child1);
  main.import("welcomeBox", child1);
  main.import("inputStyles", child1);
  main.import("allCheatsheets", child1);
  main.import("deck", child1);
  const child2 = runtime.module(define2);
  main.import("toc", child2);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("youtubeImg")).define("youtubeImg", ["FileAttachment"], _youtubeImg);
  main.variable(observer("googleImg")).define("googleImg", ["FileAttachment"], _googleImg);
  main.variable(observer("androidImg")).define("androidImg", ["FileAttachment"], _androidImg);
  main.variable(observer("googleCloudImg")).define("googleCloudImg", ["FileAttachment"], _googleCloudImg);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("events")).define("events", ["FileAttachment"], _events);
  main.variable(observer("data")).define("data", ["aq","events","d3"], _data);
  main.variable(observer("images")).define("images", ["youtubeImg","googleImg","googleCloudImg","androidImg"], _images);
  main.variable(observer("imageData")).define("imageData", ["aq","data","images"], _imageData);
  main.variable(observer("wideData")).define("wideData", ["aq","data"], _wideData);
  main.variable(observer("diffData")).define("diffData", ["aq","data"], _diffData);
  main.variable(observer("changeData")).define("changeData", ["diffData","aq","rotateScale"], _changeData);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("evalCodeStr")).define("evalCodeStr", ["changeData","wideData","imageData","data","Plot","width","d3"], _evalCodeStr);
  main.variable(observer("introParagraph")).define("introParagraph", ["htl"], _introParagraph);
  main.variable(observer("marksExample")).define("marksExample", ["createDemo","rectY"], _marksExample);
  main.variable(observer("rotateScale")).define("rotateScale", ["d3","diffData"], _rotateScale);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("line")).define("line", ["curveOptions","plotConfig","legendConfig"], _line);
  main.variable(observer("arrow")).define("arrow", ["plotConfig","legendConfig"], _arrow);
  main.variable(observer("areaY")).define("areaY", ["curveOptions","plotConfig"], _areaY);
  main.variable(observer("areaX")).define("areaX", ["curveOptions","plotWidth"], _areaX);
  main.variable(observer("dot")).define("dot", ["plotConfig"], _dot);
  main.variable(observer("link")).define("link", ["regressionLine","plotWidth"], _link);
  main.variable(observer("barY")).define("barY", ["plotWidth","legendConfig"], _barY);
  main.variable(observer("barX")).define("barX", ["plotWidth"], _barX);
  main.variable(observer("rectY")).define("rectY", ["plotWidth"], _rectY);
  main.variable(observer("rectX")).define("rectX", ["plotWidth"], _rectX);
  main.variable(observer("cell")).define("cell", ["plotWidth"], _cell);
  main.variable(observer("tickY")).define("tickY", ["plotWidth"], _tickY);
  main.variable(observer("tickX")).define("tickX", ["plotWidth"], _tickX);
  main.variable(observer("text")).define("text", ["plotWidth"], _text);
  main.variable(observer("ruleY")).define("ruleY", ["plotWidth"], _ruleY);
  main.variable(observer("ruleX")).define("ruleX", ["plotWidth"], _ruleX);
  main.variable(observer("image")).define("image", ["plotWidth"], _image);
  main.variable(observer("vector")).define("vector", ["plotConfig","legendConfig"], _vector);
  main.variable(observer("regressionLine")).define("regressionLine", ["linearRegression"], _regressionLine);
  main.variable(observer("linearRegression")).define("linearRegression", ["ss","data"], _linearRegression);
  main.variable(observer("plotConfig")).define("plotConfig", ["plotWidth"], _plotConfig);
  main.variable(observer("legendConfig")).define("legendConfig", ["plotWidth"], _legendConfig);
  main.variable(observer("curveOptions")).define("curveOptions", _curveOptions);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer()).define(["inputStyles"], _80);
  main.variable(observer()).define(["htl"], _81);
  return main;
}
