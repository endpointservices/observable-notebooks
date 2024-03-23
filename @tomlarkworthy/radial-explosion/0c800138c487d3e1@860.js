// https://observablehq.com/@shaunlebron/color-picker@860
function _1(md){return(
md`# Color Picker (with alpha)
<i>\`<input type=color>\` doesn't support [alpha](https://github.com/w3c/html/issues/1422), so here's [Pickr](https://github.com/Simonwep/pickr) trimmed down for Observable.</i>
`
)}

function _2(md){return(
md`
\`\`\`js
import {colorPicker} from "@shaunlebron/color-picker"
\`\`\`
`
)}

function _nameExample(colorPicker){return(
colorPicker("steelblue")
)}

function _hexExample(colorPicker){return(
colorPicker("#eee")
)}

function _rgbExample(colorPicker){return(
colorPicker("rgb(219, 44, 44)")
)}

function _rgbaExample(colorPicker){return(
colorPicker("rgba(64, 161, 0, 0.77)")
)}

function _hslExample(colorPicker){return(
colorPicker("hsl(220, 53%, 43%)")
)}

function _hsvaExample(colorPicker){return(
colorPicker("hsva(240, 69%, 66%, 0.4)")
)}

function _9(md){return(
md`## Formatting
- Color string is formatted according to the initial value (first arg).
- Optionally pass an explicit [TinyColor format string](https://github.com/bgrins/TinyColor#tostring) as second arg.
  - e.g. \`"hex", "rgb", "hsl", "hsv", "name"\`

## Known issues
- Pickr seems to be lossy
  - i.e. moving the knobs to original position may not return original value
- Pickr modal is occluded by expanded cells.
- Trying to adjust Pickr modal size (width,height,padding) throws off the knob positions, so we're stuck with the default.
`
)}

function _10(md){return(
md`## Code`
)}

function _colorPicker(tinycolor,html,styles,Pickr){return(
function colorPicker(defaultValue, format) {
  // Set desired color format.
  format = format || tinycolor(defaultValue).getFormat();

  // Build container element.
  const container = html`
  <div style="height:2.4em;">
    ${styles}
    <div id="picker"></div>
    <code id="label" style="margin-left: 0.5em;"></code>
  </div>`;
  const picker = container.querySelector("#picker");
  const label = container.querySelector("#label");

  // Set color value.
  const setValue = colorStr => {
    // Create color object from string.
    const color = tinycolor(colorStr);

    // Hex doesn't support alpha (but will in CSS4), so force RGB if alpha is < 1.
    const actualFormat = tinycolor(color.toString(format)).getFormat();
    const forceRGB = actualFormat === "hex" && color.getAlpha() < 1;

    // Create desired output color string and display it.
    const finalColorStr = color.toString(forceRGB ? "rgb" : format);
    label.innerHTML = finalColorStr;

    // Notify Observable about change in value.
    container.value = finalColorStr;
    container.dispatchEvent(new window.Event("input"));
  };
  setValue(defaultValue);

  // Setup Pickr.
  const setupPickr = () => {
    new Pickr({
      el: picker,
      default: tinycolor(defaultValue).toString("rgb"),
      onChange: c => setValue(c.toRGBA().toString()),
      comparison: false,
      components: {
        preview: false,
        opacity: true,
        hue: true
      }
    });
  };

  // For some reason, Pickr doesn't want to set the default color unless the element is mounted,
  // so we wait for it to mount here.
  const interval = setInterval(() => {
    if (document.body.contains(container)) {
      clearInterval(interval);
      setupPickr();
    }
  }, 100);

  return container;
}
)}

function _styles(html){return(
html`
<link rel="stylesheet" href="https://unpkg.com/pickr-widget@0.2.0/dist/pickr.min.css"/>
<style>
  /* Make sure picker stays above other Observable elements. */
  .pcr-app.visible {
    z-index: 10000000;
  }
  /* Allow our value label to be appended with good alignment. */
  .pickr {
    display: inline-block;
    vertical-align: middle;
  }
</style>
`
)}

function _13(md){return(
md`## Dependencies`
)}

function _tinycolor(require){return(
require("tinycolor2@1.4.1")
)}

function _Pickr(require){return(
require("pickr-widget@0.2.0")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof nameExample")).define("viewof nameExample", ["colorPicker"], _nameExample);
  main.variable(observer("nameExample")).define("nameExample", ["Generators", "viewof nameExample"], (G, _) => G.input(_));
  main.variable(observer("viewof hexExample")).define("viewof hexExample", ["colorPicker"], _hexExample);
  main.variable(observer("hexExample")).define("hexExample", ["Generators", "viewof hexExample"], (G, _) => G.input(_));
  main.variable(observer("viewof rgbExample")).define("viewof rgbExample", ["colorPicker"], _rgbExample);
  main.variable(observer("rgbExample")).define("rgbExample", ["Generators", "viewof rgbExample"], (G, _) => G.input(_));
  main.variable(observer("viewof rgbaExample")).define("viewof rgbaExample", ["colorPicker"], _rgbaExample);
  main.variable(observer("rgbaExample")).define("rgbaExample", ["Generators", "viewof rgbaExample"], (G, _) => G.input(_));
  main.variable(observer("viewof hslExample")).define("viewof hslExample", ["colorPicker"], _hslExample);
  main.variable(observer("hslExample")).define("hslExample", ["Generators", "viewof hslExample"], (G, _) => G.input(_));
  main.variable(observer("viewof hsvaExample")).define("viewof hsvaExample", ["colorPicker"], _hsvaExample);
  main.variable(observer("hsvaExample")).define("hsvaExample", ["Generators", "viewof hsvaExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("colorPicker")).define("colorPicker", ["tinycolor","html","styles","Pickr"], _colorPicker);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("tinycolor")).define("tinycolor", ["require"], _tinycolor);
  main.variable(observer("Pickr")).define("Pickr", ["require"], _Pickr);
  return main;
}
