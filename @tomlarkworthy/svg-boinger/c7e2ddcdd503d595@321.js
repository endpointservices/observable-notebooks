function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Color Schemes</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Color Schemes
## Including Every ColorBrewer Scale

Click any [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic) scheme below to copy it to the clipboard.`
)}

function _n(Inputs,d3){return(
Inputs.select(new Map([
  ["continuous", 256],
  ...d3.range(11, 2, -1).map(n => [`discrete (${n})`, n])
]), {label: "Scheme size"})
)}

function _sequential(md){return(
md`## Sequential (Single-Hue)`
)}

function _Blues(ramp){return(
ramp("Blues")
)}

function _Greens(ramp){return(
ramp("Greens")
)}

function _Greys(ramp){return(
ramp("Greys")
)}

function _Oranges(ramp){return(
ramp("Oranges")
)}

function _Purples(ramp){return(
ramp("Purples")
)}

function _Reds(ramp){return(
ramp("Reds")
)}

function _10(md){return(
md`## Sequential (Multi-Hue)`
)}

function _BuGn(ramp){return(
ramp("BuGn")
)}

function _BuPu(ramp){return(
ramp("BuPu")
)}

function _GnBu(ramp){return(
ramp("GnBu")
)}

function _OrRd(ramp){return(
ramp("OrRd")
)}

function _PuBuGn(ramp){return(
ramp("PuBuGn")
)}

function _PuBu(ramp){return(
ramp("PuBu")
)}

function _PuRd(ramp){return(
ramp("PuRd")
)}

function _RdPu(ramp){return(
ramp("RdPu")
)}

function _YlGnBu(ramp){return(
ramp("YlGnBu")
)}

function _YlGn(ramp){return(
ramp("YlGn")
)}

function _YlOrBr(ramp){return(
ramp("YlOrBr")
)}

function _YlOrRd(ramp){return(
ramp("YlOrRd")
)}

function _Cividis(ramp){return(
ramp("Cividis")
)}

function _Viridis(ramp){return(
ramp("Viridis")
)}

function _Inferno(ramp){return(
ramp("Inferno")
)}

function _Magma(ramp){return(
ramp("Magma")
)}

function _Plasma(ramp){return(
ramp("Plasma")
)}

function _Warm(ramp){return(
ramp("Warm")
)}

function _Cool(ramp){return(
ramp("Cool")
)}

function _CubehelixDefault(ramp){return(
ramp("CubehelixDefault")
)}

function _Turbo(ramp){return(
ramp("Turbo")
)}

function _diverging(md){return(
md`## Diverging`
)}

function _BrBG(ramp){return(
ramp("BrBG")
)}

function _PRGn(ramp){return(
ramp("PRGn")
)}

function _PiYG(ramp){return(
ramp("PiYG")
)}

function _PuOr(ramp){return(
ramp("PuOr")
)}

function _RdBu(ramp){return(
ramp("RdBu")
)}

function _RdGy(ramp){return(
ramp("RdGy")
)}

function _RdYlBu(ramp){return(
ramp("RdYlBu")
)}

function _RdYlGn(ramp){return(
ramp("RdYlGn")
)}

function _Spectral(ramp){return(
ramp("Spectral")
)}

function _cyclical(md){return(
md`## Cyclical`
)}

function _Rainbow(ramp){return(
ramp("Rainbow")
)}

function _Sinebow(ramp){return(
ramp("Sinebow")
)}

function _45(md){return(
md`## Categorical`
)}

function _Observable10(swatches){return(
swatches("Observable10")
)}

function _Category10(swatches){return(
swatches("Category10")
)}

function _Accent(swatches){return(
swatches("Accent")
)}

function _Dark2(swatches){return(
swatches("Dark2")
)}

function _Paired(swatches){return(
swatches("Paired")
)}

function _Pastel1(swatches){return(
swatches("Pastel1")
)}

function _Pastel2(swatches){return(
swatches("Pastel2")
)}

function _Set1(swatches){return(
swatches("Set1")
)}

function _Set2(swatches){return(
swatches("Set2")
)}

function _Set3(swatches){return(
swatches("Set3")
)}

function _Tableau10(swatches){return(
swatches("Tableau10")
)}

function _57(md){return(
md`---

## Appendix`
)}

function _swatches(d3,svg,html){return(
function swatches(name) {
  const colors = d3[`scheme${name}`];
  const n = colors.length;
  const dark = d3.lab(colors[0]).l < 50;;
  const canvas = svg`<svg viewBox="0 0 ${n} 1" style="display:block;width:${n * 33}px;height:33px;margin:0 -14px;cursor:pointer;">${colors.map((c, i) => svg`<rect x=${i} width=1 height=1 fill=${c}>`)}`;
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    navigator.clipboard.writeText(JSON.stringify(colors));
    setTimeout(() => label.textContent = name, 2000);
  };
  return html`${canvas}${label}`;
}
)}

function _ramp(d3,n,htl,html){return(
function ramp(name) {
  let canvas;
  let colors;
  let dark;
  if (d3[`scheme${name}`] && d3[`scheme${name}`][n]) {
    colors = d3[`scheme${name}`][n];
    dark = d3.lab(colors[0]).l < 50;
  } else {
    const interpolate = d3[`interpolate${name}`];
    colors = [];
    dark = d3.lab(interpolate(0)).l < 50;
    for (let i = 0; i < n; ++i) {
      colors.push(d3.rgb(interpolate(i / (n - 1))).hex());
    }
  }
  if (n < 128) {
    canvas = htl.svg`<svg viewBox="0 0 ${n} 1" style="display:block;shape-rendering:crispEdges;width:calc(100% + 28px);height:33px;margin:0 -14px;cursor:pointer;" preserveAspectRatio="none">${colors.map((c, i) => htl.svg`<rect x=${i} width=1 height=1 fill=${c}>`)}`;
  } else {
    canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    canvas.style.margin = "0 -14px";
    canvas.style.width = "calc(100% + 28px)";
    canvas.style.height = "33px";
    canvas.style.cursor = "pointer";
    for (let i = 0; i < n; ++i) {
      context.fillStyle = colors[i];
      context.fillRect(i, 0, 1, 1);
    }
  }
  const label = document.createElement("DIV");
  label.textContent = name;
  label.style.position = "absolute";
  label.style.top = "4px";
  label.style.color = dark ? `#fff` : `#000`;
  canvas.onclick = () => {
    label.textContent = "Copied!";
    navigator.clipboard.writeText(JSON.stringify(colors));
    setTimeout(() => label.textContent = name, 2000);
  };
  return html`${canvas}${label}`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof n")).define("viewof n", ["Inputs","d3"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("sequential")).define("sequential", ["md"], _sequential);
  main.variable(observer("Blues")).define("Blues", ["ramp"], _Blues);
  main.variable(observer("Greens")).define("Greens", ["ramp"], _Greens);
  main.variable(observer("Greys")).define("Greys", ["ramp"], _Greys);
  main.variable(observer("Oranges")).define("Oranges", ["ramp"], _Oranges);
  main.variable(observer("Purples")).define("Purples", ["ramp"], _Purples);
  main.variable(observer("Reds")).define("Reds", ["ramp"], _Reds);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("BuGn")).define("BuGn", ["ramp"], _BuGn);
  main.variable(observer("BuPu")).define("BuPu", ["ramp"], _BuPu);
  main.variable(observer("GnBu")).define("GnBu", ["ramp"], _GnBu);
  main.variable(observer("OrRd")).define("OrRd", ["ramp"], _OrRd);
  main.variable(observer("PuBuGn")).define("PuBuGn", ["ramp"], _PuBuGn);
  main.variable(observer("PuBu")).define("PuBu", ["ramp"], _PuBu);
  main.variable(observer("PuRd")).define("PuRd", ["ramp"], _PuRd);
  main.variable(observer("RdPu")).define("RdPu", ["ramp"], _RdPu);
  main.variable(observer("YlGnBu")).define("YlGnBu", ["ramp"], _YlGnBu);
  main.variable(observer("YlGn")).define("YlGn", ["ramp"], _YlGn);
  main.variable(observer("YlOrBr")).define("YlOrBr", ["ramp"], _YlOrBr);
  main.variable(observer("YlOrRd")).define("YlOrRd", ["ramp"], _YlOrRd);
  main.variable(observer("Cividis")).define("Cividis", ["ramp"], _Cividis);
  main.variable(observer("Viridis")).define("Viridis", ["ramp"], _Viridis);
  main.variable(observer("Inferno")).define("Inferno", ["ramp"], _Inferno);
  main.variable(observer("Magma")).define("Magma", ["ramp"], _Magma);
  main.variable(observer("Plasma")).define("Plasma", ["ramp"], _Plasma);
  main.variable(observer("Warm")).define("Warm", ["ramp"], _Warm);
  main.variable(observer("Cool")).define("Cool", ["ramp"], _Cool);
  main.variable(observer("CubehelixDefault")).define("CubehelixDefault", ["ramp"], _CubehelixDefault);
  main.variable(observer("Turbo")).define("Turbo", ["ramp"], _Turbo);
  main.variable(observer("diverging")).define("diverging", ["md"], _diverging);
  main.variable(observer("BrBG")).define("BrBG", ["ramp"], _BrBG);
  main.variable(observer("PRGn")).define("PRGn", ["ramp"], _PRGn);
  main.variable(observer("PiYG")).define("PiYG", ["ramp"], _PiYG);
  main.variable(observer("PuOr")).define("PuOr", ["ramp"], _PuOr);
  main.variable(observer("RdBu")).define("RdBu", ["ramp"], _RdBu);
  main.variable(observer("RdGy")).define("RdGy", ["ramp"], _RdGy);
  main.variable(observer("RdYlBu")).define("RdYlBu", ["ramp"], _RdYlBu);
  main.variable(observer("RdYlGn")).define("RdYlGn", ["ramp"], _RdYlGn);
  main.variable(observer("Spectral")).define("Spectral", ["ramp"], _Spectral);
  main.variable(observer("cyclical")).define("cyclical", ["md"], _cyclical);
  main.variable(observer("Rainbow")).define("Rainbow", ["ramp"], _Rainbow);
  main.variable(observer("Sinebow")).define("Sinebow", ["ramp"], _Sinebow);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("Observable10")).define("Observable10", ["swatches"], _Observable10);
  main.variable(observer("Category10")).define("Category10", ["swatches"], _Category10);
  main.variable(observer("Accent")).define("Accent", ["swatches"], _Accent);
  main.variable(observer("Dark2")).define("Dark2", ["swatches"], _Dark2);
  main.variable(observer("Paired")).define("Paired", ["swatches"], _Paired);
  main.variable(observer("Pastel1")).define("Pastel1", ["swatches"], _Pastel1);
  main.variable(observer("Pastel2")).define("Pastel2", ["swatches"], _Pastel2);
  main.variable(observer("Set1")).define("Set1", ["swatches"], _Set1);
  main.variable(observer("Set2")).define("Set2", ["swatches"], _Set2);
  main.variable(observer("Set3")).define("Set3", ["swatches"], _Set3);
  main.variable(observer("Tableau10")).define("Tableau10", ["swatches"], _Tableau10);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("swatches")).define("swatches", ["d3","svg","html"], _swatches);
  main.variable(observer("ramp")).define("ramp", ["d3","n","htl","html"], _ramp);
  return main;
}
