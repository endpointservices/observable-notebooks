// https://observablehq.com/@d3/projection-transitions@347
function _1(md){return(
md`# Projection Transitions

This notebook interpolates smoothly between projections; this is easiest when both projections are well-defined over the given viewport (here, the world).`
)}

function _projection(projectionInput,URLSearchParams,location,projections,invalidation)
{
  const input = projectionInput({
    value: new URLSearchParams(location.search).get("projection"),
    name: "projection"
  });
  const interval = setInterval(() => {
    input.i.selectedIndex = (input.i.selectedIndex + 1) % projections.length;
    input.dispatchEvent(new CustomEvent("input"));
  }, 1500);
  input.addEventListener("change", () => clearInterval(interval));
  invalidation.then(() => clearInterval(interval));
  return input;
}


function _context(DOM,width,height)
{
  const context = DOM.context2d(width, height);
  context.canvas.style.display = "block";
  context.canvas.style.maxWidth = "100%";
  context.canvas.value = context;
  return context.canvas;
}


function _render(d3,context,width,height,outline,graticule,land){return(
function render(projection) {
  const path = d3.geoPath(projection, context);
  context.clearRect(0, 0, width, height);
  context.save();
  context.beginPath(), path(outline), context.clip(), context.fillStyle = "#fff", context.fillRect(0, 0, width, height);
  context.beginPath(), path(graticule), context.strokeStyle = "#ccc", context.stroke();
  context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
  context.restore();
  context.beginPath(), path(outline), context.strokeStyle = "#000", context.stroke();
}
)}

function* _update($0,projection,interpolateProjection,ease,render)
{
  const r0 = $0.value;
  const r1 = projection;
  if (r0 === r1) return;
  $0.value = r1;
  const interpolate = interpolateProjection(r0, r1);
  for (let j = 1, m = 45; true; ++j) {
    const t = Math.min(1, ease(j / m));
    render(interpolate(t).rotate([performance.now() / 100, 0]));
    yield;
  }
}


function _previousProjection(d3){return(
d3.geoEquirectangularRaw
)}

function _interpolateProjection(fit,d3,lerp2,lerp1){return(
function interpolateProjection(raw0, raw1) {
  const {scale: scale0, translate: translate0} = fit(raw0);
  const {scale: scale1, translate: translate1} = fit(raw1);
  return t => d3.geoProjection((x, y) => lerp2(raw0(x, y), raw1(x, y), t))
    .scale(lerp1(scale0, scale1, t))
    .translate(lerp2(translate0, translate1, t))
    .precision(0.1);
}
)}

function _lerp1(){return(
function lerp1(x0, x1, t) {
  return (1 - t) * x0 + t * x1;
}
)}

function _lerp2(){return(
function lerp2([x0, y0], [x1, y1], t) {
  return [(1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1];
}
)}

function _fit(d3,width,height,outline){return(
function fit(raw) {
  const p = d3.geoProjection(raw).fitExtent([[0.5, 0.5], [width - 0.5, height - 0.5]], outline);
  return {scale: p.scale(), translate: p.translate()};
}
)}

function _ease(d3){return(
d3.easeCubicInOut
)}

function _width(){return(
954
)}

function _height(){return(
600
)}

function _outline(){return(
{type: "Sphere"}
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

function _land(topojson,world){return(
topojson.feature(world, world.objects.land)
)}

function _world(FileAttachment){return(
FileAttachment("land-110m.json").json()
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3-geo@2", "d3-geo-projection@3", "d3-ease@2")
)}

function _projections(d3){return(
[
  {name: "Aitoff", value: d3.geoAitoffRaw},
  {name: "American polyconic", value: d3.geoPolyconicRaw},
  {name: "August", value: d3.geoAugustRaw},
  {name: "Baker dinomic", value: d3.geoBakerRaw},
  {name: "Boggs’ eumorphic", value: d3.geoBoggsRaw},
  {name: "Bonne", value: d3.geoBonneRaw(Math.PI / 4)},
  {name: "Bottomley", value: d3.geoBottomleyRaw(0.5)},
  {name: "Bromley", value: d3.geoBromleyRaw},
  {name: "Collignon", value: d3.geoCollignonRaw},
  {name: "conic equal-area", value: d3.geoConicEqualAreaRaw(0, Math.PI / 3)},
  {name: "conic equidistant", value: d3.geoConicEquidistantRaw(0, Math.PI / 3)},
  {name: "Craster parabolic", value: d3.geoCrasterRaw},
  {name: "cylindrical equal-area", value: d3.geoCylindricalEqualAreaRaw(38.58 / 180 * Math.PI)},
  {name: "cylindrical stereographic", value: d3.geoCylindricalStereographicRaw(0)},
  {name: "Eckert I", value: d3.geoEckert1Raw},
  {name: "Eckert II", value: d3.geoEckert2Raw},
  {name: "Eckert III", value: d3.geoEckert3Raw},
  {name: "Eckert IV", value: d3.geoEckert4Raw},
  {name: "Eckert V", value: d3.geoEckert5Raw},
  {name: "Eckert VI", value: d3.geoEckert6Raw},
  {name: "Eisenlohr conformal", value: d3.geoEisenlohrRaw},
  {name: "Equal Earth", value: d3.geoEqualEarthRaw},
  {name: "Equirectangular (plate carrée)", value: d3.geoEquirectangularRaw},
  {name: "Fahey pseudocylindrical", value: d3.geoFaheyRaw},
  {name: "flat-polar parabolic", value: d3.geoMtFlatPolarParabolicRaw},
  {name: "flat-polar quartic", value: d3.geoMtFlatPolarQuarticRaw},
  {name: "flat-polar sinusoidal", value: d3.geoMtFlatPolarSinusoidalRaw},
  {name: "Foucaut’s stereographic equivalent", value: d3.geoFoucautRaw},
  {name: "Foucaut’s sinusoidal", value: d3.geoFoucautSinusoidalRaw(0.5)},
  {name: "Ginzburg V", value: d3.geoGinzburg5Raw},
  {name: "Ginzburg VI", value: d3.geoGinzburg6Raw},
  {name: "Ginzburg VIII", value: d3.geoGinzburg8Raw},
  {name: "Ginzburg IX", value: d3.geoGinzburg9Raw},
  {name: "Goode’s homolosine", value: d3.geoHomolosineRaw},
  {name: "Hammer", value: d3.geoHammerRaw(2)},
  {name: "Hill eucyclic", value: d3.geoHillRaw(1)},
  {name: "Hufnagel pseudocylindrical", value: d3.geoHufnagelRaw(1, 0, Math.PI / 4, 2)},
  {name: "Kavrayskiy VII", value: d3.geoKavrayskiy7Raw},
  {name: "Lagrange conformal", value: d3.geoLagrangeRaw(0.5)},
  {name: "Larrivée", value: d3.geoLarriveeRaw},
  {name: "Laskowski tri-optimal", value: d3.geoLaskowskiRaw},
  {name: "Loximuthal", value: d3.geoLoximuthalRaw(40 / 180 * Math.PI)},
  {name: "Miller cylindrical", value: d3.geoMillerRaw},
  {name: "Mollweide", value: d3.geoMollweideRaw},
  {name: "Natural Earth", value: d3.geoNaturalEarth1Raw},
  {name: "Natural Earth II", value: d3.geoNaturalEarth2Raw},
  {name: "Nell–Hammer", value: d3.geoNellHammerRaw},
  {name: "Nicolosi globular", value: d3.geoNicolosiRaw},
  {name: "Patterson cylindrical", value: d3.geoPattersonRaw},
  {name: "rectangular polyconic", value: d3.geoRectangularPolyconicRaw(0)},
  {name: "Robinson", value: d3.geoRobinsonRaw},
  {name: "sinusoidal", value: d3.geoSinusoidalRaw},
  {name: "sinu-Mollweide", value: d3.geoSinuMollweideRaw},
  {name: "Times", value: d3.geoTimesRaw},
  {name: "Tobler hyperelliptical", value: d3.geoHyperellipticalRaw(0, 2.5, 1.183136)},
  {name: "Van der Grinten", value: d3.geoVanDerGrintenRaw},
  {name: "Van der Grinten II", value: d3.geoVanDerGrinten2Raw},
  {name: "Van der Grinten III", value: d3.geoVanDerGrinten3Raw},
  {name: "Van der Grinten IV", value: d3.geoVanDerGrinten4Raw},
  {name: "Wagner IV", value: d3.geoWagner4Raw},
  {name: "Wagner VI", value: d3.geoWagner6Raw},
  {name: "Wagner VII", value: d3.geoWagnerRaw(65 / 180 * Math.PI, 60 / 180 * Math.PI, 0, 200)},
  {name: "Wagner VIII", value: d3.geoWagnerRaw(65 / 180 * Math.PI, 60 / 180 * Math.PI, 20, 200)},
  {name: "Werner", value: d3.geoBonneRaw(Math.PI / 2)},
  {name: "Winkel tripel", value: d3.geoWinkel3Raw}
]
)}

function _projectionInput(html,projections){return(
function projectionInput({name = "", value} = {}) {
  const form = html`<form><select name=i>${projections.map(p => {
    return Object.assign(html`<option>`, {
      textContent: p.name,
      selected: p.name === value
    });
  })}</select> <i style="font-size:smaller;">${name}</i>`;
  form.onchange = () => form.dispatchEvent(new CustomEvent("input")); // Safari
  form.oninput = (event) => {
    if (event && event.isTrusted) form.onchange = null;
    form.value = projections[form.i.selectedIndex].value;
  };
  form.oninput();
  return form;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["land-110m.json", {url: new URL("./files/f75ca3dc7c0b65cf225cea300e01e5e3cb5abf4ad75592936a2b6c79b797e933a208355d31d5b160f5b1db2a7de61fa402fe279d036a052211cd09462f524cad.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof projection")).define("viewof projection", ["projectionInput","URLSearchParams","location","projections","invalidation"], _projection);
  main.variable(observer("projection")).define("projection", ["Generators", "viewof projection"], (G, _) => G.input(_));
  main.variable(observer("viewof context")).define("viewof context", ["DOM","width","height"], _context);
  main.variable(observer("context")).define("context", ["Generators", "viewof context"], (G, _) => G.input(_));
  main.variable(observer("render")).define("render", ["d3","context","width","height","outline","graticule","land"], _render);
  main.variable(observer("update")).define("update", ["mutable previousProjection","projection","interpolateProjection","ease","render"], _update);
  main.define("initial previousProjection", ["d3"], _previousProjection);
  main.variable(observer("mutable previousProjection")).define("mutable previousProjection", ["Mutable", "initial previousProjection"], (M, _) => new M(_));
  main.variable(observer("previousProjection")).define("previousProjection", ["mutable previousProjection"], _ => _.generator);
  main.variable(observer("interpolateProjection")).define("interpolateProjection", ["fit","d3","lerp2","lerp1"], _interpolateProjection);
  main.variable(observer("lerp1")).define("lerp1", _lerp1);
  main.variable(observer("lerp2")).define("lerp2", _lerp2);
  main.variable(observer("fit")).define("fit", ["d3","width","height","outline"], _fit);
  main.variable(observer("ease")).define("ease", ["d3"], _ease);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("outline")).define("outline", _outline);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer("land")).define("land", ["topojson","world"], _land);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("projections")).define("projections", ["d3"], _projections);
  main.variable(observer("projectionInput")).define("projectionInput", ["html","projections"], _projectionInput);
  return main;
}
