import define1 from "./b2bbebd2f186ed03@1846.js";

function _1(md){return(
md`# Date and Offset Sliders

Lets you slide over a range of values.

*In response to [this forum post](https://talk.observablehq.com/t/how-to-modify-existing-inputs/7454).*

Usage:
~~~js
import {offsetInterval} from "@mootari/offset-slider"
~~~

~~~js
viewof range = offsetInterval(values)
~~~`
)}

function _2(md){return(
md`---
## Example

*For the full list of options see the [\`interval()\` documentation](https://observablehq.com/@mootari/range-slider#doc_interval). Note that the options \`min\`, \`max\` and \`step\` are ignored.*`
)}

function _dates(d3){return(
d3.utcDays(d3.utcDay.offset(d3.utcDay(), -30), d3.utcDay())
)}

function _range(offsetInterval,dates){return(
offsetInterval(dates, {
  label: "Date range",
  formatValue: date => date.toISOString().slice(0, 10),
  value: [ dates[2], dates[5] ]
})
)}

function _5(range){return(
range
)}

function _range2(offsetInterval){return(
offsetInterval(["extra small", "small", "medium", "large", "extra large"], {
  label: "Sizes",
})
)}

function _7(range2){return(
range2
)}

function _8(md){return(
md`To have full control over the value display specify a \`format\` callback. Note that the callback receives the raw unformatted values:`
)}

function _9(offsetInterval,dates,htl){return(
offsetInterval(dates, {
  value: [ dates[10], dates[20] ],
  format: ([a, b]) => htl.html`<span ${{
    style: "display: flex; justify-content: space-between"
  }}>
    <span>${a.toISOString().slice(0, 10)}</span>
    <span>${b.toISOString().slice(0, 10)}</span>
  </span>`
})
)}

function _10(md){return(
md`---
## Implementation`
)}

function _offsetInterval(interval,mapInputValue){return(
function offsetInterval(values, {
  value = [values[0], values[values.length - 1]],
  formatValue = v => v,
  format = ([a, b]) => `${formatValue(a)} … ${formatValue(b)}`,
  ...options
} = {}) {
  if(new Set(values).size < values.length) throw Error("All values have to be unique.");
  const valueof = i => values[i];
  const indexof = v => values.indexOf(v);
  const _format = i => formatValue(valueof(i));
  const input = interval([0, values.length - 1], {
    ...options,
    step: 1,
    value: value.map(indexof),
    format: v => format(v.map(valueof)),
  });
  return mapInputValue(input, indices => indices.map(valueof), dates => dates.map(indexof));
}
)}

function _mapInputValue(htl){return(
function mapInputValue(input, from, to) {
  return Object.defineProperty(htl.html`<div>${input}`, 'value', {
    get: () => from(input.value),
    set: value => input.value = to(value)
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("dates")).define("dates", ["d3"], _dates);
  main.variable(observer("viewof range")).define("viewof range", ["offsetInterval","dates"], _range);
  main.variable(observer("range")).define("range", ["Generators", "viewof range"], (G, _) => G.input(_));
  main.variable(observer()).define(["range"], _5);
  main.variable(observer("viewof range2")).define("viewof range2", ["offsetInterval"], _range2);
  main.variable(observer("range2")).define("range2", ["Generators", "viewof range2"], (G, _) => G.input(_));
  main.variable(observer()).define(["range2"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["offsetInterval","dates","htl"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("offsetInterval")).define("offsetInterval", ["interval","mapInputValue"], _offsetInterval);
  main.variable(observer("mapInputValue")).define("mapInputValue", ["htl"], _mapInputValue);
  const child1 = runtime.module(define1);
  main.import("interval", child1);
  return main;
}
