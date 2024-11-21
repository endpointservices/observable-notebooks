// https://observablehq.com/@martien/covid-19-reproductiegetal-pre-plot@1535
import define1 from "./aea6911280ea0400@1801.js";
import define2 from "./a2e58f97fd5e8d7c@756.js";

function _1(md){return(
md`# COVID-19 Reproductiegetal (pre-Plot)`
)}

function _covid(extentX,x,y,extentY,d3,width,height,rect,toonBollingerband,path,areaBand,data,dash,weken,yyyymmdd,vanaf,text,line,maatregelen,xAxis,yAxis,zwever)
{
  const [x1, x2] = extentX.map(k => x(k))
  const w = x2 - x1
  const [y0, y1, yMax] = [y(extentY[0]), y(1), y(extentY[1])]
  const offset = 10

  const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, height])
  .attr("class", "body")
  
  // Vlakken: R < 1: groen, R > 1: rood
  rect(svg, "green", x1, y1,    w, y0 - y1)
  rect(svg, "red",   x1, yMax,  w, y1 - yMax)
  
  // Bollingerband (https://nl.wikipedia.org/wiki/Bollinger_Bands)
  toonBollingerband && path(svg, "none", "lightgrey", areaBand(data.filter(d => d.lower)), 5)

  // R === 1 stippellijn
  dash(svg, x1, y1, x2, y1, "black", 9)
  // text(svg, x2 - 75, y(1) - 24, 18, "signaalwaarde", "smaller")
  
  // Voetnoot
  const periode = `periode: ${weken} weken (${yyyymmdd(vanaf)} – ${yyyymmdd(data.slice(-1)[0].date)})`
  const bron = `Bron: <a href="http://iosfonts.com" fill="steelblue">RIVM</a>`
  text(svg, x1 + offset, y0, -offset, `${periode}. ${bron}.`)

  // R-waarde
  path(svg, "red", "none", line(data.filter(d => d.middle)), 2)

  // Maatregelen tijdlijn
  maatregelen(svg)

  // Assen
  svg.append("g").call(xAxis)
  svg.append("g").call(yAxis)

  // Zwevende datum en waarde
  zwever(svg)

  return svg.node()
}


function _weken(Range){return(
Range([4, 52], {value: 26, label: `Tijdvak (weken)`, step: 1})
)}

function _toonBollingerband(Toggle){return(
Toggle({label: "Toon Bollingerband", value: true})
)}

function _5(md,data){return(
md`
**Gegevens tot en met ${(data.slice(-1)[0]).date.toLocaleString("nl-NL", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Amsterdam"
})}**.

Het reproductiegetal R geeft het gemiddeld aantal mensen dat besmet wordt door één persoon met COVID-19.

Pas als de verspreidingsgraad langere tijd onder de 1 ligt kunnen maatregelen zorgvuldig versoepeld worden.
`
)}

function _6(md){return(
md`### Maatregelen`
)}

function _7(Table,maatregels){return(
Table(
  maatregels,
  {
    columns: [
      "positie",
      "datum",
      "kern",
    ],
    width: {
      positie: "10%",
      datum: "20%",
      kern: "70%",
    },  
  }
)
)}

function _8(md){return(
md`### Data`
)}

function _9(Table,data){return(
Table(
  data,
    {
    columns: [
      "date",
      "lower",
      "middle",
      "upper",
    ],
    width: {date: "15%", lower: "10%", middle: "10%"},
  }
)
)}

function _10(md,rivmURL){return(
md`## Bronnen en inspiratie

### COVID
* [Covid-19 reproductiegetal « Data « RIVM](https://data.rivm.nl/geonetwork/srv/dut/catalog.search#/metadata/ed0699d1-c9d5-4436-8517-27eb993eab6e?tab=general):
  * [RIVM data](${rivmURL})
* [Dit is het belangrijkste getal van de pandemie. Hoe wordt het berekend? « Sanne Blauw « de Correspondent](https://decorrespondent.nl/11167/dit-is-het-belangrijkste-getal-van-de-pandemie-hoe-wordt-het-berekend/162510157238-e83b9f23)
* [Reproductiegetal « Dashboard coronavirus « Rijksoverheid](https://coronadashboard.rijksoverheid.nl/landelijk/reproductiegetal)
* [Coronaweek in grafieken: verspreiding virus neemt af, nog niet in verpleeghuizen « NOS](https://nos.nl/artikel/2356047-coronaweek-in-grafieken-verspreiding-virus-neemt-af-nog-niet-in-verpleeghuizen.html)
* [COVID-19 (nieuwe coronavirus) « RIVM](https://www.rivm.nl/coronavirus-covid-19)
* [Maatregelen tijdens de coronacrisis in Nederland « NL « Wikipedia](https://nl.wikipedia.org/wiki/Maatregelen_tijdens_de_coronacrisis_in_Nederland)

### Visualisatie
* [Learn D3: Shapes « Mike Bostock « D3 « Observable](https://observablehq.com/@d3/learn-d3-shapes?collection=@d3/learn-d3)
* [Learn D3: Interaction « Mike Bostock « D3 « Observable](https://observablehq.com/@d3/learn-d3-interaction?collection=@d3/learn-d3)
* [Styled Axes « Mike Bostock « D3 « Observable](https://observablehq.com/@d3/styled-axes?collection=@d3/d3-axis)
* [Bollinger Bands « NL « Wikipedia](https://nl.wikipedia.org/wiki/Bollinger_Bands)
`
)}

function _11(md){return(
md`## Data`
)}

function _vanaf(addDays,weken){return(
addDays(Date.now(), -7 * weken)
)}

function _extentX(d3,data,addDays){return(
[ d3.min(data, d => d.date), addDays(new Date, 0)]
)}

function _extentY(){return(
[0.7, 1.3]
)}

function _rivmData(d3,rivmURL){return(
d3.json(rivmURL)
)}

function _rivmURL(cors_proxy){return(
cors_proxy + "https://data.rivm.nl/covid-19/COVID-19_reproductiegetal.json"
)}

function _19(md){return(
md`## Machinekamer`
)}

function _20(md){return(
md`### Lines & Areas`
)}

function _areaBand(d3,fix,x,y){return(
d3.area()
.x(d => fix(x(d.date),0))
.y0(d => fix(y(d.lower),0))
.y1(d => fix(y(d.upper),0))
)}

function _topline(d3,x,y){return(
d3.line()
    .x(d => x(d.date))
    .y(d => y(d.upper))
)}

function _bottomline(d3,x,y){return(
d3.line()
    .x(d => x(d.date))
    .y(d => y(d.lower))
)}

function _24(md){return(
md`### Artists`
)}

function _maatregelen(maatregels,maatregel){return(
svg => {
  const g = svg.append("g")
  maatregels.map(m => maatregel(g, m))
  return svg
}
)}

function _maatregel(extentX,text,x,y,fix){return(
(svg, m) => {
  // if (Date.parse(m.datum) > extentX[0]) {
    if (m.datum > extentX[0]) {
    text(svg, x(Date.parse(m.datum)), y(1), 20 * m.positie, m.kern)//.style("text-anchor", "middle")
    svg.append("line")
      .attr("x1", fix(x(Date.parse(m.datum))))
      .attr("y1", fix(y(1.0)))
      .attr("x2", fix(x(Date.parse(m.datum))))
      .attr("y2", fix(y(1 - .05 * m.positie +.05)))
      .attr("stroke", "grey")
  }
}
)}

function _line(d3,fix,x,y){return(
d3.line()
    .x(d => fix(x(d.date),0))
    .y(d => fix(y(d.middle),0))
)}

function _rect(fix){return(
(svg, color, x, y, w, h, opacity = .1) => 
svg.append("rect")
.attr("fill", color)
.attr("x", fix(x))
.attr("y", fix(y))
.attr("width", fix(w))
.attr("height", fix(h))
.attr("opacity", opacity)
)}

function _path(){return(
(svg, stroke, fill, data, width) => svg
.append("path")
.attr("d", data)
.attr("fill", fill)
.attr("stroke", stroke)
.attr("stroke-width", width)
.attr("stroke-miterlimit", "1")
)}

function _dash(fix){return(
(svg, x1, y1, x2, y2, stroke, dash) => svg.append("line")
.attr("x1", fix(x1))
.attr("y1", fix(y1))
.attr("x2", fix(x2))
.attr("y2", fix(y2))
.attr("stroke", stroke)
.attr("stroke-dasharray", dash)
)}

function _text(fix){return(
(svg, x, y, dy, text, size = "medium") => svg
.append("text")
.attr("x", fix(x,0))
.attr("y", fix(y,0))
.attr("dy", dy)
.style("font-size", size)
.html(text)
)}

function _yyyymmdd(d3){return(
d => d3.timeFormat("%Y-%m-%d")(d)
)}

function _addDays(){return(
(date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
)}

function _zwever(Tooltip,d3,data,fix,x,height){return(
(svg) => {

  const tooltip = new Tooltip()

  svg.append("g")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .selectAll("rect")
    .data(d3.pairs(data.filter(d => d.middle)))
    .join("rect")
    .attr("x", ([a, b]) => fix(x(a.date)))
    .attr("height", height)
    .attr("width", ([a, b]) => fix(x(b.date) - x(a.date)))
    .on("mouseover", (event, [a]) => tooltip.show(a))
    .on("mouseout", () => tooltip.hide());

  svg.append(() => tooltip.node);

  return svg

}
)}

function _Tooltip(svg,x,y,formatDate,formatClose){return(
class Tooltip {
  constructor() {
    this._date = svg`<text y="+22"></text>`;
    this._close = svg`<text font-size="x-large" y="-12"></text>`;
    this._dot = svg`<circle r="5" fill="red"></circle>`
    this.node = svg`<g pointer-events="none" display="none" font-family="sans-serif" font-size="10" text-anchor="middle">
  ${this._date}
  ${this._close}
  ${this._dot}
</g>`;
  }
  show(d) {
    this.node.removeAttribute("display");
    this.node.setAttribute("transform", `translate(${x(d.date)},${y(d.middle)})`);
    this._date.textContent = formatDate(d.date);
    this._close.textContent = formatClose(d.middle);
    this._dot.style.fill = d.middle < 1 ? "green" : d.middle === 0 ? "blue" : "red"
  }
  hide() {
    this.node.setAttribute("display", "none");
  }
}
)}

function _formatDate(d3){return(
d3.utcFormat("%0d %B %Y")
)}

function _formatClose(d3){return(
d3.format(".2f")
)}

function _38(md){return(
md`### Axes & Coordinates`
)}

function _x(d3,extentX,margin,width){return(
d3.scaleTime()
    .domain(extentX)
    .range([margin.left, width - margin.right])
)}

function _y(d3,extentY,height,margin){return(
d3.scaleLinear()
    .domain([extentY[0], extentY[1]])
    .range([height - margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
)}

function _yAxis(margin,d3,y,width){return(
svg => svg
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisRight(y)
      .tickSize(width - margin.left - margin.right)
     )
.call(g => g.select(".domain")
      .remove()
     )
.call(g => g.selectAll(".tick:not(:first-of-type) line")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-dasharray", "2,2")
     )
.call(g => g.selectAll(".tick text")
      .attr("x", -20)
     )
)}

function _43(md){return(
md`### Fonts, Margins & Dimensions`
)}

function _fontFamily(){return(
"AvenirNextCondensed-Regular, sans-serif"
)}

function _45(html,fontFamily){return(
html`
<style>
.body {
  font-family: ${fontFamily}, sans-serif;
}
</style>
`
)}

function _height(){return(
480/1
)}

function _margin(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)}

function _fix(){return(
(x, n = 0) => x
)}

function _49(md){return(
md`### Imports`
)}

function _d3(require){return(
require("d3@6")
)}

function _cors_proxy(){return(
"https://observable-cors.glitch.me/"
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("covid")).define("covid", ["extentX","x","y","extentY","d3","width","height","rect","toonBollingerband","path","areaBand","data","dash","weken","yyyymmdd","vanaf","text","line","maatregelen","xAxis","yAxis","zwever"], _covid);
  main.variable(observer("viewof weken")).define("viewof weken", ["Range"], _weken);
  main.variable(observer("weken")).define("weken", ["Generators", "viewof weken"], (G, _) => G.input(_));
  main.variable(observer("viewof toonBollingerband")).define("viewof toonBollingerband", ["Toggle"], _toonBollingerband);
  main.variable(observer("toonBollingerband")).define("toonBollingerband", ["Generators", "viewof toonBollingerband"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Table","maatregels"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Table","data"], _9);
  main.variable(observer()).define(["md","rivmURL"], _10);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("maatregels", child1);
  const child2 = runtime.module(define1);
  main.import("data", child2);
  main.variable(observer("vanaf")).define("vanaf", ["addDays","weken"], _vanaf);
  main.variable(observer("extentX")).define("extentX", ["d3","data","addDays"], _extentX);
  main.variable(observer("extentY")).define("extentY", _extentY);
  main.variable(observer("rivmData")).define("rivmData", ["d3","rivmURL"], _rivmData);
  main.variable(observer("rivmURL")).define("rivmURL", ["cors_proxy"], _rivmURL);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("areaBand")).define("areaBand", ["d3","fix","x","y"], _areaBand);
  main.variable(observer("topline")).define("topline", ["d3","x","y"], _topline);
  main.variable(observer("bottomline")).define("bottomline", ["d3","x","y"], _bottomline);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("maatregelen")).define("maatregelen", ["maatregels","maatregel"], _maatregelen);
  main.variable(observer("maatregel")).define("maatregel", ["extentX","text","x","y","fix"], _maatregel);
  main.variable(observer("line")).define("line", ["d3","fix","x","y"], _line);
  main.variable(observer("rect")).define("rect", ["fix"], _rect);
  main.variable(observer("path")).define("path", _path);
  main.variable(observer("dash")).define("dash", ["fix"], _dash);
  main.variable(observer("text")).define("text", ["fix"], _text);
  main.variable(observer("yyyymmdd")).define("yyyymmdd", ["d3"], _yyyymmdd);
  main.variable(observer("addDays")).define("addDays", _addDays);
  main.variable(observer("zwever")).define("zwever", ["Tooltip","d3","data","fix","x","height"], _zwever);
  main.variable(observer("Tooltip")).define("Tooltip", ["svg","x","y","formatDate","formatClose"], _Tooltip);
  main.variable(observer("formatDate")).define("formatDate", ["d3"], _formatDate);
  main.variable(observer("formatClose")).define("formatClose", ["d3"], _formatClose);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("x")).define("x", ["d3","extentX","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","extentY","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","width"], _yAxis);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("fontFamily")).define("fontFamily", _fontFamily);
  main.variable(observer()).define(["html","fontFamily"], _45);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("fix")).define("fix", _fix);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child3 = runtime.module(define2);
  main.import("Table", child3);
  main.import("Range", child3);
  main.import("Toggle", child3);
  main.variable(observer("cors_proxy")).define("cors_proxy", _cors_proxy);
  return main;
}
