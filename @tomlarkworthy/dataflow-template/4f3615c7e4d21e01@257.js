import define1 from "./ea6ad5f03f23221b@110.js";

function _1(md){return(
md`# Interactive Time Range Input`
)}

function _2(md){return(
md`Observable's built-in [\`Inputs.range\`](https://observablehq.com/@observablehq/input-range) slider can only process numeric results and appears not to allow formatting of slider values in anything other than numeric formats. It makes using the slider to select dates/times cumbersome. It is also common to want to select temporal ranges bounded by start and end points.

The following addresses this by wrapping Fabian Iwand's excellent [offset interval slider](https://observablehq.com/@mootari/offset-slider) to provide easy construction of a double-ended time period input slider.

To import for use in your own pages:

\`\`\`javascript
import { timeRange } from "@jwolondon/time-range-input"
\`\`\`

Here is an example that allows the selection of a time period with a monthly granularity:`
)}

function _myTimeSelection(timeRange){return(
timeRange(
  new Date(2023, 0, 1),
  new Date(2024, 11, 31),
  { interval: "month" }
)
)}

function _4(md){return(
md`As with other inputs, when declared with [viewof](https://observablehq.com/@observablehq/a-brief-introduction-to-viewof), the selected value (in this case two \`Date\`s) it represents can be access directly for use in other code blocks:`
)}

function _5(myTimeSelection){return(
myTimeSelection
)}

function _6(md){return(
md`## Usage

- **timeRange(_startDate_, _endDate_, _{options}_)**
  
As a minimum, \`timeRange\` must be called with two [Date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) representing the start and end of the selectable time period.

### Options

A third parameter – an options object – allows you to customise the slider. It contains the following elements:

- **label: _text_** The label text to appear next to the slider or \`null\` if no text (default).
- **interval: _intervalType_** One of \`"millisecond"\`, \`"second"\`, \`"minute"\`, \`"hour"\`, \`"day"\`, \`"week"\`, \`"month"\` or \`"year"\` (default: \`"day"\`). 
- **step: _n_** Minimum number of intervals advanced by the slider (default: 1). For example, setting \`interval\` to \`"month"\` and \`step\` to \`3\`, the slider advances by quarters.
- **format: _formatString_** A [d3.time-format code](https://d3js.org/d3-time-format) determining how the start and end dates appear under the slider. The default depends on which \`interval\` is used.
- **value: _[d1, d2]_** The initial start and end date/times of the selection represented by an array of two \`Date\` objects (default, full range represented by the slider).`
)}

function _7(md){return(
md`## Example`
)}

function _yearZoom(timeRange){return(
timeRange(new Date(2013, 4, 13), new Date(2018, 4, 12), {
  interval: "day",
  label: "Zoom",
  value: [new Date(2014, 9), new Date(2016, 3)]
})
)}

function _9(Plot,yearZoom,aapl){return(
Plot.plot({
  clip: true,
  x: { domain: yearZoom }, // The time slider, which reports the selected start and end dates, maps directly to the zoomed domain.
  marks: [
    Plot.areaY(aapl, {
      x: "Date",
      y: "Close",
      fill: "firebrick",
      opacity: 0.1
    }),
    Plot.lineY(aapl, { x: "Date", y: "Close" })
  ]
})
)}

function _10(md){return(
md`---
### Appendices`
)}

function _11(md){return(
md`_The core offset interval slider from @mootari:_`
)}

function _13(md){return(
md`_The timeRange wrapper:_`
)}

function _timeRange(d3,offsetInterval){return(
function timeRange(start, end, options = {}) {
  let {
    interval = "day",
    step = 1,
    format = null,
    label = null,
    value = null
  } = options;
  let ts;
  switch (interval.toLowerCase()) {
    case "millisecond":
      ts = d3.utcMilliseconds(start, end, step);
      format = format || "%M:%S.%L";
      break;
    case "second":
      ts = d3.utcSeconds(start, end, step);
      format = format || "%H:%M:%S";
      break;
    case "minute":
      ts = d3.utcMinutes(start, end, step);
      format = format || "%H:%M";
      break;
    case "hour":
      ts = d3.utcHours(start, end, step);
      format = format || "%H:%M";
      break;
    case "day":
      ts = d3.utcDays(start, end, step);
      format = format || "%Y-%m-%d";
      break;
    case "week":
      ts = d3.utcWeeks(start, end, step);
      format = format || "%Y-%m-%d";
      break;
    case "month":
      ts = d3.utcMonths(start, end, step);
      format = format || "%b %Y";
      break;
    case "year":
      ts = d3.utcYears(start, end, step);
      format = format || "%Y";
      break;
    default:
      throw Error(`Unknown time interval "${interval}" provided to timeRange`);
  }

  // Because we are dealing with Date objects rather than primitives, the value setting for initial
  // selection needs to be matched against closest of the internally stored Dates rather than direct
  // equality testing.
  const findClosestDate = (targetDate) => {
    if (!targetDate || ts.length === 0) {
      return null;
    }
    let closestDate = ts[0];
    let smallestDifference = Math.abs(ts[0] - targetDate);
    for (const date of ts) {
      const difference = Math.abs(date - targetDate);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestDate = date;
      }
    }
    return closestDate;
  };

  let minSel, maxSel;
  if (value && value.length === 2) {
    minSel = findClosestDate(value[0]);
    maxSel = findClosestDate(value[1]);
  } else {
    minSel = ts[0];
    maxSel = ts.at(-1);
  }

  return offsetInterval(ts, {
    label: label,
    formatValue: d3.utcFormat(format),
    value: [minSel, maxSel]
  });
}
)}

function _15(md){return(
md`_Tests for each time interval:_`
)}

function _test(Inputs,timeRange){return(
Inputs.form({
  rMillis: timeRange(
    new Date(2024, 1, 20, 10),
    new Date(2024, 1, 20, 10, 0, 5),
    {
      interval: "millisecond",
      label: "Milliseconds",
      value: [new Date(2024, 1, 20, 10), new Date(2024, 1, 20, 10, 0, 2)]
    }
  ),
  rSeconds: timeRange(new Date(2024, 1, 20, 10), new Date(2024, 1, 20, 11), {
    interval: "second",
    label: "Seconds",
    value: [new Date(2024, 1, 20, 10, 15), new Date(2024, 1, 20, 10, 30)]
  }),
  rMinutes: timeRange(new Date(2024, 1, 20, 0), new Date(2024, 1, 20, 23, 59), {
    interval: "minute",
    label: "Minutes",
    value: [new Date(2024, 1, 20, 9), new Date(2024, 1, 20, 17)]
  }),
  rHours: timeRange(new Date(2024, 1, 20), new Date(2024, 1, 21), {
    interval: "hour",
    label: "Hours",
    value: [new Date(2024, 1, 20, 12), new Date(2024, 1, 20, 18)]
  }),
  rDays: timeRange(new Date(2024, 1, 20), new Date(2024, 2, 20), {
    interval: "day",
    label: "Days",
    value: [new Date(2024, 2, 4), new Date(2024, 2, 13)]
  }),
  rWeeks: timeRange(new Date(2023, 0, 1), new Date(2024, 0, 1), {
    interval: "week",
    label: "Weeks",
    value: [new Date(2023, 3, 2), new Date(2023, 5, 18)]
  }),
  rMonths: timeRange(new Date(2023, 0, 1), new Date(2024, 11, 31), {
    interval: "month",
    label: "Months",
    value: [new Date(2023, 6), new Date(2024, 0)]
  }),
  rYears: timeRange(new Date(1880, 0), new Date(2020, 1), {
    interval: "year",
    label: "Years",
    value: [new Date(1950, 0), new Date(1980, 0)]
  })
})
)}

function _17(test){return(
test
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof myTimeSelection")).define("viewof myTimeSelection", ["timeRange"], _myTimeSelection);
  main.variable(observer("myTimeSelection")).define("myTimeSelection", ["Generators", "viewof myTimeSelection"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["myTimeSelection"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof yearZoom")).define("viewof yearZoom", ["timeRange"], _yearZoom);
  main.variable(observer("yearZoom")).define("yearZoom", ["Generators", "viewof yearZoom"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","yearZoom","aapl"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("offsetInterval", child1);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("timeRange")).define("timeRange", ["d3","offsetInterval"], _timeRange);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof test")).define("viewof test", ["Inputs","timeRange"], _test);
  main.variable(observer("test")).define("test", ["Generators", "viewof test"], (G, _) => G.input(_));
  main.variable(observer()).define(["test"], _17);
  return main;
}
