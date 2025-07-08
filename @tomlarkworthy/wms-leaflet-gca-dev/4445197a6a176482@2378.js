import define1 from "./b2bbebd2f186ed03@1846.js";

function _1(md,keyword_style){return(
md`# WMS Leaflet map GCA (DEV)
## An interface to produce a slippy map using WMS (Web Map Service)
<p style="margin-bottom: -12px;"></p>
<span ${keyword_style}>Leaflet</span>
<span ${keyword_style}>Interactive Web Map</span>
<span ${keyword_style}>WMS</span> 
`
)}

function _2(md){return(
md`An interface to produce a slippy map using WMS (Web Map Service) layer from netCDF files available
from : <a href="https://www.globalcarbonatlas.org:8443/thredds/catalog/Atlas/Flux_Transcom/catalog.html"
target="_blank">https://www.globalcarbonatlas.org:8443/thredds/catalog/Atlas/Flux_Transcom/catalog.html</a>.
Vector layers come from a Geoserver and the WMS layer from a Thredds Data Server with the WMS service activated.`
)}

function _3(md){return(
md`<hr>
### Interface`
)}

function _layers(Inputs,layersArray){return(
Inputs.checkbox(layersArray, {
  value: [layersArray[2]],
  label: "Vector layers",
  format: (x) => x.name
})
)}

function _palette0(Inputs,palettesArray){return(
Inputs.select(palettesArray, {
  value: palettesArray[8],
  label: "Palette"
})
)}

function _paletteInversed(Inputs){return(
Inputs.toggle({
  label: "Inverse palette",
  values: ["-inv", ""]
})
)}

function _opacity(Inputs){return(
Inputs.range([0, 100], {
  value: 100,
  step: 5,
  label: "Opacity"
})
)}

function _numcolorbands(Inputs){return(
Inputs.range([10, 250], {
  value: 20,
  step: 1,
  label: "Number of colorbands"
})
)}

function _directory(Inputs,dirsArray){return(
Inputs.select(dirsArray, {
  width: 600,
  value: dirsArray[15],
  label: "Directory"
})
)}

function _period(Inputs){return(
Inputs.select(
  [
    "longterm",
    "yearlymean",
    "yearlymean-anom",
    "monthlymean",
    "monthlymean-anom"
  ],
  {
    value: "yearlymean-anom",
    width: 600,
    label: "Period averaging"
  }
)
)}

function _ressource(Inputs,ressourcesArray){return(
Inputs.select(ressourcesArray, {
  width: 600,
  value: ressourcesArray[0],
  label: "Ressource"
})
)}

function _variable(variablesArray,Inputs)
{
  if (typeof this !== "undefined" && variablesArray.includes(this.value)) {
    var variableToSet = this.value;
  } else {
    var variableToSet = variablesArray.slice(-1)[0];
  }
  var variable = Inputs.select(variablesArray, {
    value: variableToSet,
    label: "Variable"
  });
  return variable;
}


function _rangeFrom(Inputs){return(
Inputs.radio(
  ["variable", "user choice"],
  { label: "Get range from", value: "variable" }
)
)}

function _range(rangeFrom,rangeVariable,rangeSlider)
{
  const range0 =
    this && rangeFrom === "user choice" ? this.value : rangeVariable;
  return rangeSlider({
    min: Math.floor(range0[0] - Math.abs(range0[0]) * 0.2),
    max: Math.ceil(range0[1] + Math.abs(range0[1]) * 0.2),
    step: 10 ** Math.floor(Math.log10(Math.abs(range0[1] - range0[0]) / 100.0)),
    value: range0,
    precision: 3,
    title: "<div style='font-weight:normal;font-size: smaller;'>Range</div>"
  });
}


function* _map(html,legend,L,timeVariable,directory,period,ressource,variable,range,numcolorbands,palette,opacity,layers)
{
  const bounds =
    //this && this.map && typeof this.map.getBounds === "function" ? this.map.getBounds() : null;
    this && this.map ? this.map.getBounds() : null;

  const container = html`<div style="display:table;"><div id="map" style="float:left;width:700px;height:400px;"></div><img src="${legend}" style="float:left;margin-left:10px;"></div>`;
  yield container;

  const map = (container.map = L.map("map"));

  if (bounds) {
    //console.log(bounds);
    map.fitBounds(bounds);
  } else {
    map.setView([0, 0], 1);
  }

  //L.control.fullscreen().addTo(map);
  var resizer = L.control
    .resizer({ direction: "se", onlyOnHover: true, pan: true })
    .addTo(map);

  // https://github.com/socib/Leaflet.TimeDimension
  var timeDimension = new L.TimeDimension({
    times: timeVariable
  });
  map.timeDimension = timeDimension;

  const currentTime =
    this && this.map ? this.map.timeDimension.getCurrentTime() : null;
  if (currentTime) {
    //console.log(currentTime);
    map.timeDimension.setCurrentTime(currentTime);
  }

  var player = new L.TimeDimension.Player(
    {
      transitionTime: 100,
      loop: true,
      startOver: true
    },
    timeDimension
  );

  var timeDimensionControlOptions = {
    player: player,
    timeDimension: timeDimension,
    position: "bottomleft",
    autoPlay: false,
    minSpeed: 1,
    speedStep: 0.5,
    maxSpeed: 15,
    timeSliderDragUpdate: true
  };

  var timeDimensionControl = new L.Control.TimeDimension(
    timeDimensionControlOptions
  );
  map.addControl(timeDimensionControl);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
    map
  );

  let wmsLayer = L.tileLayer.wms(
    "https://www.globalcarbonatlas.org:8443/thredds/wms/" +
      directory +
      "/" +
      period +
      "/" +
      ressource +
      "?",
    {
      LAYERS: variable,
      COLORSCALERANGE: range,
      NUMCOLORBANDS: numcolorbands,
      STYLES: "raster/" + palette,
      ABOVEMAXCOLOR: "extend",
      BELOWMINCOLOR: "extend",
      SRS: "EPSG:4326",
      FORMAT: "image/png",
      OPACITY: opacity
    }
  );

  var tdWmsLayer = L.timeDimension.layer.wms(wmsLayer);
  tdWmsLayer.addTo(map);

  for (let i = 0; i < layers.length; i++) {
    let layerGEOSERVER = L.tileLayer.wms(
      "https://www.globalcarbonatlas.org:8443/geoserver/GCA/wms?",
      {
        LAYERS: layers[i].layer,
        SRS: "EPSG:4326",
        FORMAT: "image/png",
        TRANSPARENT: "true"
      }
    );
    layerGEOSERVER.bringToFront();
    layerGEOSERVER.addTo(map);
  }
}


function _16(md){return(
md`<button onClick="javascript:window.open('https://observablehq.com/embed/@pbrockmann/wms-leaflet-gca?cells=map%2Cviewof+variable%2Cviewof+ressource%2Cviewof+period%2Cviewof+directory%2Cviewof+rangeFrom%2Cviewof+range', '_blank');">Export map</button>`
)}

function _17(md){return(
md`<hr>`
)}

function _mapsSelectionButtons(Inputs,$0,mapsArrayMutable,addMap){return(
Inputs.button(
  [
    [
      "Add",
      () => {
        $0.value = mapsArrayMutable.concat(addMap());
        //mutable mapsArrayMutable.push(addMap());
      }
    ],
    [
      "Remove last",
      () => {
        $0.value = mapsArrayMutable.slice(0, -1);
        //mutable mapsArrayMutable.splice(1, 1);
      }
    ],
    [
      "Reset",
      () => {
        $0.value = [];
      }
    ]
  ],
  { value: [], label: "List of maps" }
)
)}

function _19(md,payload){return(
md`<button onClick="javascript:window.open('https://observablehq.com/embed/@tomlarkworthy/wms-leaflet-gca-dev?cells=mapsArray%2Callmaps&payload=${payload}', '_blank');">Export all maps</button>`
)}

function* _allmaps(html,mapsArray,L,layers)
{
  var randomIntegerInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const container = html`<div id="mapDiv" style="display: table;"></div>`;
  yield container;

  if (mapsArray.length == 0) return "No maps";

  var center = [0, 0];
  var zoom = 0;
  var width = 150;
  var height = 150;

  var mapsNb = mapsArray.length;

  var maps = [];
  for (var i = 0; i < mapsNb; i++) {
    var div = document.createElement("div");
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.float = "left";
    div.id = "map" + i;
    document.getElementById("mapDiv").appendChild(div);

    maps["map" + i] = L.map("map" + i);
    maps["map" + i].setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      maps["map" + i]
    );

    let wmsLayer = L.tileLayer.wms(
      "https://www.globalcarbonatlas.org:8443/thredds/wms/" +
        mapsArray[i].directory +
        "/" +
        mapsArray[i].period +
        "/" +
        mapsArray[i].ressource +
        "?",
      {
        LAYERS: mapsArray[i].variable,
        //TIME: "1979-07-01T12:00:00.000Z",
        COLORSCALERANGE: mapsArray[i].range,
        NUMCOLORBANDS: mapsArray[i].numcolorbands,
        STYLES: "raster/" + mapsArray[i].palette,
        ABOVEMAXCOLOR: "extend",
        BELOWMINCOLOR: "extend",
        SRS: "EPSG:4326",
        FORMAT: "image/png",
        OPACITY: mapsArray[i].opacity
      }
    );
    wmsLayer.addTo(maps["map" + i]);

    for (let j = 0; j < layers.length; j++) {
      let layerGEOSERVER = L.tileLayer.wms(
        "https://www.globalcarbonatlas.org:8443/geoserver/GCA/wms?",
        {
          LAYERS: layers[j].layer,
          SRS: "EPSG:4326",
          FORMAT: "image/png",
          TRANSPARENT: "true"
        }
      );
      layerGEOSERVER.bringToFront();
      layerGEOSERVER.addTo(maps["map" + i]);
    }
  }

  // Synchronize all maps together
  for (var i = 0; i < mapsNb; i++) {
    for (var j = 0; j < mapsNb; j++) {
      if (i != j) {
        maps["map" + i].sync(maps["map" + j]);
      }
    }
  }

  // https://github.com/jjimenezshaw/Leaflet.Control.Resizer
  var resizer = L.control
    .resizer({ direction: "se", onlyOnHover: true })
    .addTo(maps["map0"]);
  L.DomEvent.on(resizer, "dragend", function (e) {
    var map0Div = document.getElementById("map0");

    for (var i = 1; i < mapsNb; i++) {
      var mapDiv = document.getElementById("map" + i);
      mapDiv.style.width = map0Div.style.width;
      mapDiv.style.height = map0Div.style.height;
      maps["map" + i].invalidateSize();
    }
  });
}


function _payload(mapsArrayMutable){return(
btoa(JSON.stringify(mapsArrayMutable))
)}

function _addMap(directory,ressource,period,variable,timeVariable,range,palette,numcolorbands,opacity){return(
function addMap() {
  var map1 = {
    directory: directory,
    ressource: ressource,
    period: period,
    variable: variable,
    timeVariable: timeVariable,
    range: range,
    palette: palette,
    numcolorbands: numcolorbands,
    opacity: opacity
  };
  return map1;
}
)}

function _mapsArray(URLSearchParams,location,mapsArrayMutable)
{
  var mapsArray = [];

  try {
    mapsArray = JSON.parse(
      atob(new URLSearchParams(location.search).get("payload"))
    );
  } catch (err) {}

  for (let i = 0; i < mapsArrayMutable.length; i++) {
    mapsArray.push(mapsArrayMutable[i]);
  }
  return mapsArray;
}


function _mapsArrayStatic(){return(
[
  {
    directory: "Atlas/Flux_Transcom/Inversions-GCP2019",
    ressource:
      "fco2_CAMS-V18-2-2019_June2018-ext3_1979-2018_yearlymean-anom_XYT.nc",
    period: "yearlymean-anom",
    variable: "Terrestrial_flux",
    range: [-432, 291],
    palette: "div-RdYlBu",
    numcolorbands: 20,
    opacity: 100
  },
  {
    directory: "Atlas/Flux_Transcom/Inversions-GCP2019",
    ressource:
      "fco2_CAMS-V18-2-2019_June2018-ext3_1979-2018_yearlymean-anom_XYT.nc",
    period: "yearlymean-anom",
    variable: "Ocean_flux",
    range: [-29.9, 39.2],
    palette: "div-RdYlBu",
    numcolorbands: 20,
    opacity: 100
  }
]
)}

function _mapsArrayMutable(){return(
[]
)}

function _26(md){return(
md`<hr>`
)}

async function _dirsArray(DOMParser)
{
  var xmlResponseDirectories = await fetch(
    "https://www.globalcarbonatlas.org:8443/thredds/catalog/Atlas/Flux_Transcom/catalog.xml"
  ).then((response) => {
    return response.text();
  });
  var catalogDirectories = new DOMParser().parseFromString(
    xmlResponseDirectories,
    "text/xml"
  );
  var dirsArray = Array.from(
    catalogDirectories.querySelectorAll("dataset > catalogRef"),
    (n) => n.getAttribute("ID")
  );
  return dirsArray;
}


async function _ressourcesArray(directory,period,DOMParser)
{
  var ressourcesResponse = await fetch(
    "https://www.globalcarbonatlas.org:8443/thredds/catalog/" +
      directory +
      "/" +
      period +
      "/catalog.xml"
  ).then((response) => {
    return response.text();
  });
  var ressourcesCatalog = new DOMParser().parseFromString(
    ressourcesResponse,
    "text/xml"
  );
  var ressourcesArray = Array.from(
    ressourcesCatalog.querySelectorAll("dataset > dataset"),
    (n) => n.getAttribute("name")
  ).filter((d) => d.endsWith(".nc"));
  return ressourcesArray;
}


async function _variablesArray(directory,period,ressource,DOMParser)
{
  var variablesResponse = await fetch(
    "https://www.globalcarbonatlas.org:8443/thredds/wms/" +
      directory +
      "/" +
      period +
      "/" +
      ressource +
      "?REQUEST=GetCapabilities"
  ).then((response) => {
    return response.text();
  });
  var variablesCatalog = new DOMParser().parseFromString(
    variablesResponse,
    "text/xml"
  );
  var variablesArray = Array.from(
    variablesCatalog.querySelectorAll(
      "WMS_Capabilities > Capability > Layer > Layer > Layer > Name"
    ),
    (n) => n.childNodes[0].nodeValue
  );
  return variablesArray;
}


async function _timeVariable(directory,period,ressource,DOMParser)
{
  var timeVariableResponse = await fetch(
    "https://www.globalcarbonatlas.org:8443/thredds/wms/" +
      directory +
      "/" +
      period +
      "/" +
      ressource +
      "?REQUEST=GetCapabilities"
  ).then((response) => {
    return response.text();
  });
  var timeVariableCatalog = new DOMParser().parseFromString(
    timeVariableResponse,
    "text/xml"
  );
  var timeVariableArray = Array.from(
    timeVariableCatalog.querySelectorAll(
      "WMS_Capabilities > Capability > Layer > Layer > Layer > Dimension"
    ),
    (n) => n.childNodes[0].nodeValue
  );
  return timeVariableArray[0].trim();
}


async function _rangeVariable(directory,period,ressource,variable)
{
  var rangeVariableResponse = await fetch(
    "https://www.globalcarbonatlas.org:8443/thredds/wms/" +
      directory +
      "/" +
      period +
      "/" +
      ressource +
      "?REQUEST=GetMetadata&VERSION=1.1.1&LAYER=" +
      variable +
      "&ITEM=minmax&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=200&HEIGHT=200"
  ).then((response) => {
    return response.json();
  });
  return [rangeVariableResponse.min, rangeVariableResponse.max];
}


function _layersArray(){return(
[
  { name: "Land mask", layer: "GCA:GCA_landMask" },
  { name: "Ocean mask", layer: "GCA:GCA_oceanMask" },
  { name: "Frontiers", layer: "GCA:GCA_frontiersCountryAndRegions" },
  { name: "Names", layer: "GCA:GCA_labelsCountriesRegionsOceans" },
  { name: "Urban areas", layer: "GCA:GCA_citiesLabelsAndFrontiers" },
  { name: "Lakes and river", layer: "GCA:GCA_lakesAndRivers" },
  { name: "Graticules", layer: "GCA:GCA_graticules01_05_10" }
]
)}

function _palettesArray(){return(
[
  "div-BrBG",
  "div-BuRd2",
  "div-BuRd",
  "div-PiYG",
  "div-PRGn",
  "div-PuOr",
  "div-RdBu",
  "div-RdGy",
  "div-RdYlBu",
  "div-RdYlGn",
  "div-Spectral",
  "psu-inferno",
  "psu-magma",
  "psu-plasma",
  "psu-viridis",
  "seq-BkBu",
  "seq-BkGn",
  "seq-BkRd",
  "seq-BkYl",
  "seq-BlueHeat",
  "seq-Blues",
  "seq-BuGn",
  "seq-BuPu",
  "seq-BuYl",
  "seq-cubeYF",
  "seq-GnBu",
  "seq-Greens",
  "seq-Greys",
  "seq-GreysRev",
  "seq-Heat",
  "seq-Oranges",
  "seq-OrRd",
  "seq-PuBuGn",
  "seq-PuBu",
  "seq-PuRd",
  "seq-Purples",
  "seq-RdPu",
  "seq-Reds",
  "seq-YlGnBu",
  "seq-YlGn",
  "seq-YlOrBr",
  "seq-YlOrRd",
  "x-Ncview",
  "x-Occam",
  "x-Rainbow",
  "x-Sst"
]
)}

function _palette(palette0,paletteInversed){return(
palette0 + paletteInversed
)}

function _legend(directory,period,ressource,variable,palette,range,numcolorbands){return(
"https://www.globalcarbonatlas.org:8443/thredds/wms/" +
  directory +
  "/" +
  period +
  "/" +
  ressource +
  "?REQUEST=GetLegendGraphic&LAYER=" +
  variable +
  "&STYLES=raster/" +
  palette +
  "&COLORSCALERANGE=" +
  range +
  "&NUMCOLORBANDS=" +
  numcolorbands +
  "&WIDTH=20&HEIGHT=250"
)}

function _36(html,legend){return(
html`<img src="${legend}">`
)}

function _keyword_style(){return(
`style="font-family:Source Sans Pro; font-size: 14px; background: #cdebea"`
)}

function _38(md){return(
md`<hr>`
)}

async function _L(require,html)
{
  const L = await require("leaflet@1.7.1/dist/leaflet-src.js");
  if (!L._style) {
    var href = await require.resolve("leaflet@1.7.1/dist/leaflet.css");
    document.head.appendChild(
      (L._style = html`<link href=${href} rel=stylesheet>`)
    );
  }

  await require("leaflet-fullscreen@1.0.2").catch(() => L.control.fullscreen);
  var href = await require.resolve(
    "leaflet-fullscreen@1.0.2/dist/leaflet.fullscreen.css"
  );
  document.head.appendChild(html`<link href=${href} rel=stylesheet>`);

  await require("leaflet-timedimension@1.1.1").catch(
    () => L.control.fullscreen
  );
  var href = await require.resolve(
    "leaflet-timedimension@1.1.1/dist/leaflet.timedimension.control.min.css"
  );
  document.head.appendChild(html`<link href=${href} rel=stylesheet>`);

  await require("leaflet.sync@0.2.4").catch(() => L.sync);

  await require("leaflet.control.resizer@0.0.1").catch(() => L.control.resizer);
  var href = await require.resolve(
    "leaflet.control.resizer@0.0.1/L.Control.Resizer.css"
  );
  document.head.appendChild(html`<link href=${href} rel=stylesheet>`);

  return L;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","keyword_style"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof layers")).define("viewof layers", ["Inputs","layersArray"], _layers);
  main.variable(observer("layers")).define("layers", ["Generators", "viewof layers"], (G, _) => G.input(_));
  main.variable(observer("viewof palette0")).define("viewof palette0", ["Inputs","palettesArray"], _palette0);
  main.variable(observer("palette0")).define("palette0", ["Generators", "viewof palette0"], (G, _) => G.input(_));
  main.variable(observer("viewof paletteInversed")).define("viewof paletteInversed", ["Inputs"], _paletteInversed);
  main.variable(observer("paletteInversed")).define("paletteInversed", ["Generators", "viewof paletteInversed"], (G, _) => G.input(_));
  main.variable(observer("viewof opacity")).define("viewof opacity", ["Inputs"], _opacity);
  main.variable(observer("opacity")).define("opacity", ["Generators", "viewof opacity"], (G, _) => G.input(_));
  main.variable(observer("viewof numcolorbands")).define("viewof numcolorbands", ["Inputs"], _numcolorbands);
  main.variable(observer("numcolorbands")).define("numcolorbands", ["Generators", "viewof numcolorbands"], (G, _) => G.input(_));
  main.variable(observer("viewof directory")).define("viewof directory", ["Inputs","dirsArray"], _directory);
  main.variable(observer("directory")).define("directory", ["Generators", "viewof directory"], (G, _) => G.input(_));
  main.variable(observer("viewof period")).define("viewof period", ["Inputs"], _period);
  main.variable(observer("period")).define("period", ["Generators", "viewof period"], (G, _) => G.input(_));
  main.variable(observer("viewof ressource")).define("viewof ressource", ["Inputs","ressourcesArray"], _ressource);
  main.variable(observer("ressource")).define("ressource", ["Generators", "viewof ressource"], (G, _) => G.input(_));
  main.variable(observer("viewof variable")).define("viewof variable", ["variablesArray","Inputs"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer("viewof rangeFrom")).define("viewof rangeFrom", ["Inputs"], _rangeFrom);
  main.variable(observer("rangeFrom")).define("rangeFrom", ["Generators", "viewof rangeFrom"], (G, _) => G.input(_));
  main.variable(observer("viewof range")).define("viewof range", ["rangeFrom","rangeVariable","rangeSlider"], _range);
  main.variable(observer("range")).define("range", ["Generators", "viewof range"], (G, _) => G.input(_));
  main.variable(observer("map")).define("map", ["html","legend","L","timeVariable","directory","period","ressource","variable","range","numcolorbands","palette","opacity","layers"], _map);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("mapsSelectionButtons")).define("mapsSelectionButtons", ["Inputs","mutable mapsArrayMutable","mapsArrayMutable","addMap"], _mapsSelectionButtons);
  main.variable(observer()).define(["md","payload"], _19);
  main.variable(observer("allmaps")).define("allmaps", ["html","mapsArray","L","layers"], _allmaps);
  main.variable(observer("payload")).define("payload", ["mapsArrayMutable"], _payload);
  main.variable(observer("addMap")).define("addMap", ["directory","ressource","period","variable","timeVariable","range","palette","numcolorbands","opacity"], _addMap);
  main.variable(observer("mapsArray")).define("mapsArray", ["URLSearchParams","location","mapsArrayMutable"], _mapsArray);
  main.variable(observer("mapsArrayStatic")).define("mapsArrayStatic", _mapsArrayStatic);
  main.define("initial mapsArrayMutable", _mapsArrayMutable);
  main.variable(observer("mutable mapsArrayMutable")).define("mutable mapsArrayMutable", ["Mutable", "initial mapsArrayMutable"], (M, _) => new M(_));
  main.variable(observer("mapsArrayMutable")).define("mapsArrayMutable", ["mutable mapsArrayMutable"], _ => _.generator);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("dirsArray")).define("dirsArray", ["DOMParser"], _dirsArray);
  main.variable(observer("ressourcesArray")).define("ressourcesArray", ["directory","period","DOMParser"], _ressourcesArray);
  main.variable(observer("variablesArray")).define("variablesArray", ["directory","period","ressource","DOMParser"], _variablesArray);
  main.variable(observer("timeVariable")).define("timeVariable", ["directory","period","ressource","DOMParser"], _timeVariable);
  main.variable(observer("rangeVariable")).define("rangeVariable", ["directory","period","ressource","variable"], _rangeVariable);
  main.variable(observer("layersArray")).define("layersArray", _layersArray);
  main.variable(observer("palettesArray")).define("palettesArray", _palettesArray);
  main.variable(observer("palette")).define("palette", ["palette0","paletteInversed"], _palette);
  main.variable(observer("legend")).define("legend", ["directory","period","ressource","variable","palette","range","numcolorbands"], _legend);
  main.variable(observer()).define(["html","legend"], _36);
  main.variable(observer("keyword_style")).define("keyword_style", _keyword_style);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("L")).define("L", ["require","html"], _L);
  const child1 = runtime.module(define1);
  main.import("rangeSlider", child1);
  return main;
}
