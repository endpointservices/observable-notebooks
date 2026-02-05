import define1 from "./8d271c22db968ab0@160.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`# Verticle sliders`
)}

function _2(html){return(
html`
    <style>
    input[type=range][orient=vertical]
    {
      writing-mode: bt-lr; /* IE */
      -webkit-appearance: slider-vertical; /* WebKit */
      width: 8px;
      height: 175px;
      padding: 0 5px;
    }
    </style>
  `
)}

function _controls(form,html){return(
form(html`<form><table>
<tfoot>
  <tr>
    <th>toot</th>
    <th>b</th>
    <th>dasdsac</th>
    <th>d</th>
  </tr>
</tfoot>
<tbody>
<tr>
  <td>
    <input type=range min=0 max=100 name="a" orient=vertical>
  </td>
  <td>
    <input type=range min=0 max=100 name="b" orient=vertical>
  </td>
  <td>
    <input type=range min=0 max=100 name="c" orient=vertical>
  </td>
  <td>
    <input type=range min=0 max=100 name="d" orient=vertical>
  </td>
</tbody>
</tr></table>`)
)}

function _4(controls){return(
controls
)}

function _6(blah){return(
blah.value
)}

function _blah(slider){return(
slider({
  min: 5, max: 10, orient: 'vertical',
  description: "blah"
})
)}

function _9(slider){return(
slider({
  min: 5, max: 10
})
)}

function _slider(input){return(
function slider(config = {}) {
  let {
    min = 0,
    max = 1,
    value = (max + min) / 2,
    step = "any",
    precision = 2,
    title,
    description,
    disabled,
    getValue,
    format,
    display,
    submit,
    orient
  } = typeof config === "number" ? { value: config } : config;
  precision = Math.pow(10, precision);
  if (!getValue)
    getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range",
    title,
    description,
    submit,
    format,
    display,
    attributes: { min, max, step, disabled, value, orient },
    getValue
  });
}
)}

function _12(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html"], _2);
  main.variable(observer("viewof controls")).define("viewof controls", ["form","html"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer()).define(["controls"], _4);
  const child1 = runtime.module(define1);
  main.import("form", child1);
  main.variable(observer()).define(["blah"], _6);
  main.variable(observer("blah")).define("blah", ["slider"], _blah);
  const child2 = runtime.module(define2);
  main.import("input", child2);
  main.variable(observer()).define(["slider"], _9);
  main.variable(observer("slider")).define("slider", ["input"], _slider);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _12);
  return main;
}
