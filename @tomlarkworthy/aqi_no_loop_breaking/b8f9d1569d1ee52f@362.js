function _1(md){return(
md`# PM2.5 to AQI Conversion

My home weather station measures PM2.5 concentration in micrograms per cubic meter (μg/m³). But if I’m concerned about air quality, I want to know the Air Quality Index (AQI). AQI is a policy tool and as such has a complicated definition. So, here’s a tool to convert between PM2.5 and AQI (assuming that PM2.5 is the only pollutant you care about).`
)}

function _2(md){return(
md`Drag either slider below to choose the selected PM2.5 or AQI.`
)}

function _3(md,data){return(
md`data.pm25: ${data.pm25} data.AQI: ${data.AQI}`
)}

function _data(Inputs){return(
Inputs.input({
  pm25: 50,
  AQI: 250
})
)}

function _5(bind,Inputs,$0,pm25_aqi){return(
bind(
  Inputs.range([0, 500], { label: "PM2.5 (μg/m³)", value: 50, step: 0.1 }),
  $0,
  {
    transform: (d) => d.pm25,
    invert: (pm25) => ({
      pm25: pm25,
      AQI: pm25_aqi(pm25)
    })
  }
)
)}

function _6(bind,Inputs,$0,aqi_pm25){return(
bind(Inputs.range([0, 500], { label: "AQI", step: 1 }), $0, {
  transform: (d) => d.AQI,
  invert: (aqi) => ({
    pm25: aqi_pm25(aqi),
    AQI: aqi
  })
})
)}

function _7(Plot,categories,aqi_pm25,d3,pm25_aqi,data){return(
Plot.plot({
  grid: true,
  x: {
    label: "PM2.5 →"
  },
  y: {
    label: "↑ AQI"
  },
  color: {
    type: "identity"
  },
  marks: [
    Plot.rect(categories, {
      x1: 0,
      x2: (d) => aqi_pm25(d.max),
      y1: 0,
      y2: "max",
      stroke: "color",
      strokeWidth: 3,
      reverse: true
    }),
    Plot.line(d3.range(501), {
      x: (d) => d,
      y: pm25_aqi
    }),
    Plot.dot([[data.pm25, data.AQI]]),
    Plot.text(categories, {
      x: 0,
      y: "max",
      text: "name",
      textAnchor: "start",
      stroke: "white",
      strokeWidth: 3,
      strokeLinejoin: "round",
      dx: 4,
      dy: 12
    }),
    Plot.text(categories, {
      x: 0,
      y: "max",
      text: "name",
      textAnchor: "start",
      dx: 4,
      dy: 12
    })
  ]
})
)}

function _8(md){return(
md`The cell below defines the six official [Air Quality Index (AQI) categories](https://www.airnow.gov/aqi/aqi-basics/): “Each category corresponds to a different level of health concern. Each category also has a specific color. The color makes it easy for people to quickly determine whether air quality is reaching unhealthy levels in their communities.”`
)}

function _categories(){return(
[
  {max: 50, color: "green", name: "Good"},
  {max: 100, color: "yellow", name: "Moderate"},
  {max: 150, color: "orange", name: "Unhealthy for sensitive groups"},
  {max: 200, color: "red", name: "Unhealthy"},
  {max: 300, color: "purple", name: "Very unhealthy"},
  {max: 500, color: "maroon", name: "Hazardous"}
]
)}

function _10(md){return(
md`The \`pm25_aqi\` function converts from a PM2.5 concentration in micrograms per cubic meter to the corresponding AQI value (assuming that PM2.5 is the only contributor to AQI). It is the inverse of \`aqi_pm25\`.`
)}

function _pm25_aqi(lerp){return(
function pm25_aqi(pm25) {
  const c = Math.floor(10 * pm25) / 10;
  const a = c < 0 ? 0 // values below 0 are considered beyond AQI
    : c <  12.1 ? lerp(  0,  50,   0.0,  12.0, c)
    : c <  35.5 ? lerp( 51, 100,  12.1,  35.4, c)
    : c <  55.5 ? lerp(101, 150,  35.5,  55.4, c)
    : c < 150.5 ? lerp(151, 200,  55.5, 150.4, c)
    : c < 250.5 ? lerp(201, 300, 150.5, 250.4, c)
    : c < 350.5 ? lerp(301, 400, 250.5, 350.4, c)
    : c < 500.5 ? lerp(401, 500, 350.5, 500.4, c)
    : 500; // values above 500 are considered beyond AQI
  return Math.round(a);
}
)}

function _12(md){return(
md`The \`aqi_pm25\` function converts from an AQI value to the corresponding PM2.5 concentration in micrograms per cubic meter (assuming that PM2.5 is the only contributor to AQI). It is the inverse of \`pm25_aqi\`.`
)}

function _aqi_pm25(lerp){return(
function aqi_pm25(aqi) {
  const a = Math.round(aqi);
  const c = a < 0 ? 0 // values below 0 are considered beyond AQI
    : a <=  50 ? lerp(  0.0,  12.0,   0,  50, a)
    : a <= 100 ? lerp( 12.1,  35.4,  51, 100, a)
    : a <= 150 ? lerp( 35.5,  55.4, 101, 150, a)
    : a <= 200 ? lerp( 55.5, 150.4, 151, 200, a)
    : a <= 300 ? lerp(150.5, 250.4, 201, 300, a)
    : a <= 400 ? lerp(250.5, 350.4, 301, 400, a)
    : a <= 500 ? lerp(350.5, 500.4, 401, 500, a)
    : 500; // values above 500 are considered beyond AQI
  return Math.floor(10 * c) / 10;
}
)}

function _14(md){return(
md`The \`lerp\` function is like d3.scaleLinear, redux.`
)}

function _lerp(){return(
function lerp(ylo, yhi, xlo, xhi, x) {
  return ((x - xlo) / (xhi - xlo)) * (yhi - ylo) + ylo;
}
)}

function _16(md){return(
md`The \`bind\` function is like [Inputs.bind](https://github.com/observablehq/inputs/blob/main/README.md#bind), except it applies a transform to convert between units, and only propagates on trusted events. This way when the user interacts with the target, it’ll propagate to the source, but the source won’t propagate back to the target. This transform needs to be invertible so that you can drag either range input to affect the other.`
)}

function _bind(Inputs,Event){return(
function bind(
  target,
  source,
  {
    invalidation = Inputs.disposal(target),
    transform = (d) => d,
    invert = (d) => d
  } = {}
) {
  const onsource = (event) => {
    target.value = transform(source.value);
  };
  const ontarget = (event) => {
    source.value = invert(target.value);
    source.dispatchEvent(new Event("input", { bubbles: true }));
  };
  onsource({});
  target.addEventListener("input", ontarget);
  source.addEventListener("input", onsource);
  invalidation.then(() => source.removeEventListener("input", onsource));
  return target;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md","data"], _3);
  main.variable(observer("viewof data")).define("viewof data", ["Inputs"], _data);
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["bind","Inputs","viewof data","pm25_aqi"], _5);
  main.variable(observer()).define(["bind","Inputs","viewof data","aqi_pm25"], _6);
  main.variable(observer()).define(["Plot","categories","aqi_pm25","d3","pm25_aqi","data"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("categories")).define("categories", _categories);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("pm25_aqi")).define("pm25_aqi", ["lerp"], _pm25_aqi);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("aqi_pm25")).define("aqi_pm25", ["lerp"], _aqi_pm25);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("lerp")).define("lerp", _lerp);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("bind")).define("bind", ["Inputs","Event"], _bind);
  return main;
}
