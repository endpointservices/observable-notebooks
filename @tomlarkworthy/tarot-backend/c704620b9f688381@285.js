// https://observablehq.com/@mootari/inverted-luminosity@285
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Inverted Luminosity

SVG filter that inverts brightness while preserving hue.

Based on [Invert RGB image without changing colors](https://forum.image.sc/t/invert-rgb-image-without-changing-colors/33571).
`
)}

function _2(md){return(
md`---
## Filtered Image

- **Top row (left to right):** original image, inverted luminosity
- **Bottom row (left to right):** inverted color, inverted luminosity + inverted color

Images are provided at random from [unsplash.com](https://source.unsplash.com/).
`
)}

function _next(html){return(
html`<button>Next random image`
)}

function _4(svg,imgWidth,imgPad,imgHeight,imgSrc,feInvertLuminosity,feInvertColor){return(
svg`<svg viewBox="0 0 ${2*imgWidth+imgPad} ${2*imgHeight+imgPad}" preserveAspectRatio="xMidYMid meet" style="max-width:100%">

  <defs>
    <image id="image" xlink:href="${imgSrc}" width="${imgWidth}" height="${imgHeight}" />

    <filter color-interpolation-filters="sRGB" id="invert-luminosity">
      ${feInvertLuminosity}
    </filter>

    <filter color-interpolation-filters="sRGB" id="invert-color">
      ${feInvertColor}
    </filter>

    <filter color-interpolation-filters="sRGB" id="invert-luminosity-color">
      ${feInvertLuminosity}
      ${feInvertColor}
    </filter>

  </defs>
  <use href="#image" />
  <use href="#image" x="${imgWidth+imgPad}" filter="url(#invert-luminosity)" />
  <use href="#image" y="${imgHeight+imgPad}" filter="url(#invert-color)" />
  <use href="#image" x="${imgWidth+imgPad}" y="${imgHeight+imgPad}" filter="url(#invert-luminosity-color)" />
</svg>
`
)}

function _5(md){return(
md`---
## Filtered Iframe`
)}

function _slug(text){return(
text({title: 'Notebook slug', value: '@d3/gallery', submit: true})
)}

function _frameFilter(radio){return(
radio({
  title: 'Inversion',
  options: [
    {value: '', label: 'none'},
    {value: 'url(#invert-luminosity)', label: 'luminosity'},
    {value: 'url(#invert-color)', label: 'color'},
    {value: 'url(#invert-luminosity-color)', label: 'luminosity, then color'},
  ],
  value: 'url(#invert-luminosity)',
})
)}

function _iframe(html,slug){return(
html`<iframe width="100%" height="600" frameborder="0" style="background:#fff" src="https://observablehq.com/embed/${slug}?cell=*"></iframe>`
)}

function _9(iframe,frameFilter){return(
iframe.style.filter = frameFilter
)}

function _10(md){return(
md`---
## Filter Elements`
)}

function _feInvertLuminosity(){return(
`<feColorMatrix type="matrix" values="
   0   -0.5 -0.5 0 1
  -0.5  0   -0.5 0 1
  -0.5 -0.5  0   0 1
   0    0    0   1 0" />`
)}

function _feInvertColor(){return(
`<feColorMatrix type="matrix" values="
  -1  0  0 0 1
   0 -1  0 0 1
   0  0 -1 0 1
   0  0  0 1 0" />`
)}

function _13(md){return(
md`---
## Options
`
)}

function _imgWidth(){return(
640
)}

function _imgHeight(){return(
400
)}

function _imgPad(){return(
5
)}

function _imgSrc(next,imgWidth,imgHeight){return(
next, fetch(`https://source.unsplash.com/random/${imgWidth}x${imgHeight}`, {method: 'head'}).then(r => r.url)
)}

function _18(md){return(
md`---
## Demo Dependencies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof next")).define("viewof next", ["html"], _next);
  main.variable(observer("next")).define("next", ["Generators", "viewof next"], (G, _) => G.input(_));
  main.variable(observer()).define(["svg","imgWidth","imgPad","imgHeight","imgSrc","feInvertLuminosity","feInvertColor"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof slug")).define("viewof slug", ["text"], _slug);
  main.variable(observer("slug")).define("slug", ["Generators", "viewof slug"], (G, _) => G.input(_));
  main.variable(observer("viewof frameFilter")).define("viewof frameFilter", ["radio"], _frameFilter);
  main.variable(observer("frameFilter")).define("frameFilter", ["Generators", "viewof frameFilter"], (G, _) => G.input(_));
  main.variable(observer("iframe")).define("iframe", ["html","slug"], _iframe);
  main.variable(observer()).define(["iframe","frameFilter"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("feInvertLuminosity")).define("feInvertLuminosity", _feInvertLuminosity);
  main.variable(observer("feInvertColor")).define("feInvertColor", _feInvertColor);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("imgWidth")).define("imgWidth", _imgWidth);
  main.variable(observer("imgHeight")).define("imgHeight", _imgHeight);
  main.variable(observer("imgPad")).define("imgPad", _imgPad);
  main.variable(observer("imgSrc")).define("imgSrc", ["next","imgWidth","imgHeight"], _imgSrc);
  main.variable(observer()).define(["md"], _18);
  const child1 = runtime.module(define1);
  main.import("text", child1);
  main.import("radio", child1);
  return main;
}
