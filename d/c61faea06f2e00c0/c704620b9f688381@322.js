function _1(md){return(
md`# Inverted Luminosity`
)}

function _2(md){return(
md`SVG filter that inverts brightness while preserving hue.

Based on [Invert RGB image without changing colors](https://forum.image.sc/t/invert-rgb-image-without-changing-colors/33571).`
)}

function _3(md){return(
md`---
## Filtered Image

- **Top row (left to right):** original image, inverted luminosity
- **Bottom row (left to right):** inverted color, inverted luminosity + inverted color

Images are provided from [Lorem Picsum](https://picsum.photos/).`
)}

function _next(htl){return(
htl.html`<button>Next random image`
)}

function _5(svg,imgWidth,imgPad,imgHeight,imgSrc,feInvertLuminosity,feInvertColor){return(
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

function _6(md){return(
md`---
## Filtered Iframe`
)}

function _slug(Inputs){return(
Inputs.text({label: 'Notebook slug', value: '@d3/gallery', submit: true})
)}

function _frameFilter(Inputs){return(
Inputs.radio([
  {value: '', label: 'none'},
  {value: 'url(#invert-luminosity)', label: 'luminosity'},
  {value: 'url(#invert-color)', label: 'color'},
  {value: 'url(#invert-luminosity-color)', label: 'luminosity, then color'},
], {
  label: 'Inversion',
  format: d => d.label,
  valueof: d => d.value,
  value: 'url(#invert-luminosity)',
})
)}

function _iframe(html,slug){return(
html`<iframe width="100%" height="600" frameborder="0" style="background:#fff" src="https://observablehq.com/embed/${slug}?cell=*"></iframe>`
)}

function _10(iframe,frameFilter){return(
iframe.style.filter = frameFilter
)}

function _11(md){return(
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

function _14(md){return(
md`---
## Options`
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
next, fetch(`https://picsum.photos/${this ? "" : "id/42/"}${imgWidth}/${imgHeight}`).then(r => r.url)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof next")).define("viewof next", ["htl"], _next);
  main.variable(observer("next")).define("next", ["Generators", "viewof next"], (G, _) => G.input(_));
  main.variable(observer()).define(["svg","imgWidth","imgPad","imgHeight","imgSrc","feInvertLuminosity","feInvertColor"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof slug")).define("viewof slug", ["Inputs"], _slug);
  main.variable(observer("slug")).define("slug", ["Generators", "viewof slug"], (G, _) => G.input(_));
  main.variable(observer("viewof frameFilter")).define("viewof frameFilter", ["Inputs"], _frameFilter);
  main.variable(observer("frameFilter")).define("frameFilter", ["Generators", "viewof frameFilter"], (G, _) => G.input(_));
  main.variable(observer("iframe")).define("iframe", ["html","slug"], _iframe);
  main.variable(observer()).define(["iframe","frameFilter"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("feInvertLuminosity")).define("feInvertLuminosity", _feInvertLuminosity);
  main.variable(observer("feInvertColor")).define("feInvertColor", _feInvertColor);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("imgWidth")).define("imgWidth", _imgWidth);
  main.variable(observer("imgHeight")).define("imgHeight", _imgHeight);
  main.variable(observer("imgPad")).define("imgPad", _imgPad);
  main.variable(observer("imgSrc")).define("imgSrc", ["next","imgWidth","imgHeight"], _imgSrc);
  return main;
}
