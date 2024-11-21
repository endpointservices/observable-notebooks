// https://observablehq.com/@martien/covid-19-reproductiegetal@1801
function _1(md){return(
md`# COVID-19 Reproductiegetal`
)}

function _final(Plot,defaults,toonBollingerband,data,area,baseline,Rline,measures,textY,datumNL){return(
Plot.plot({
  ...defaults,
  marks: [    

    toonBollingerband ? Plot.areaY(data, {x: "date", y1: "lower", y2: "upper", fill:"gainsboro"}) : [],

    area("green", data),
    area("red", data),

    Plot.ruleY([baseline], {strokeDasharray: "9"}),
    Rline,

    Plot.text(
      measures,
      {
        x: "datum",
        y: d => textY(d),
        text: d => d.kern,
        title: d => datumNL(d.datum),
        textAnchor: "end",
      }
    ),

    Plot.ruleX(measures, {x: "datum", y1: _ => baseline, y2: d => textY(d) - .01}),

  ],
  // caption: html`Figure 1. This chart has a <i>fancy</i> caption.`,
})
)}

function _3(md,weken,datumNL,vanaf,data){return(
md`#### Periode: ${weken} weken (${datumNL(vanaf)} – ${datumNL(data.slice(-1)[0].date)}). Bron: <a href="https://data.rivm.nl/geonetwork/srv/dut/catalog.search#/metadata/ed0699d1-c9d5-4436-8517-27eb993eab6e?tab=general" fill="steelblue">RIVM</a>.
`
)}

function _weken(Inputs){return(
Inputs.range([4, 100], {value: 52, label: `Tijdvak (weken)`, step: 1})
)}

function _toonBollingerband(Inputs){return(
Inputs.toggle({label: "Toon Bollingerband", value: false})
)}

function _6(md){return(
md`
Het reproductiegetal R geeft het gemiddeld aantal mensen dat besmet wordt door één persoon met COVID-19.

Pas als de verspreidingsgraad langere tijd onder de 1 ligt kunnen maatregelen zorgvuldig versoepeld worden.

NOTA BENE: Het RIVM zegt,
> Het RIVM berekent het reproductiegetal retrospectief. Dit komt door de onzekerheid van de berekening over de laatste dagen, waardoor de waarde altijd over de periode van 2 weken geleden is genomen. Het berekende R-getal is dus altijd twee weken oud en kan dan ook beter als een [lagging indicator](https://en.wikipedia.org/wiki/Economic_indicator) in plaats van een [leading indicator](https://en.wikipedia.org/wiki/Economic_indicator) kunnen worden gecategoriseerd.

> De wijze waarop het R-getal de besluitvorming van het kabinet beïnvloedt kan je bij het kabinet navragen. Het OMT neemt het mee in haar adviezen. Het RIVM geeft enkel epidemiologische duiding mbt tot het reproductiegetal.  
`
)}

function _7(md){return(
md`### Maatregelen`
)}

function _8(Inputs,maatregels){return(
Inputs.table(
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

function _9(md){return(
md`### Data`
)}

function _10(Inputs,data){return(
Inputs.table(
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

function _11(md,rivmURL){return(
md`## Bronnen en inspiratie

### COVID
* [Covid-19 reproductiegetal « Data « RIVM](https://data.rivm.nl/geonetwork/srv/dut/catalog.search#/metadata/ed0699d1-c9d5-4436-8517-27eb993eab6e?tab=general):
  * [RIVM data](${rivmURL})
* [Dit is het belangrijkste getal van de pandemie. Hoe wordt het berekend? « Sanne Blauw « de Correspondent](https://decorrespondent.nl/11167/dit-is-het-belangrijkste-getal-van-de-pandemie-hoe-wordt-het-berekend/162510157238-e83b9f23)
* [Reproductiegetal « Dashboard coronavirus « Rijksoverheid](https://coronadashboard.rijksoverheid.nl/landelijk/reproductiegetal)
* [Coronaweek in grafieken: verspreiding virus neemt af, nog niet in verpleeghuizen « NOS](https://nos.nl/artikel/2356047-coronaweek-in-grafieken-verspreiding-virus-neemt-af-nog-niet-in-verpleeghuizen.html)
* [COVID-19 (nieuwe coronavirus) « RIVM](https://www.rivm.nl/coronavirus-covid-19)
* [Maatregelen tijdens de coronacrisis in Nederland « NL « Wikipedia](https://nl.wikipedia.org/wiki/Maatregelen_tijdens_de_coronacrisis_in_Nederland)
`
)}

function _12(md){return(
md`## Data`
)}

function _maatregels(){return(
[
  { positie: 2, datum: "2020-03-05", kern: "⇩⇩ lockdown",},
  { positie: 1, datum: "2020-03-24", kern: "⇩ geen centrale examens" },
  { positie: 2, datum: "2020-05-06", kern: "⇧ horeca weer open" },
  { positie: 1, datum: "2020-05-19", kern: "⇧ sauna’s weer open" },
  { positie: 1, datum: "2020-07-01", kern: "⇧ versoepeling", },
  { positie: 1, datum: "2020-08-18", kern: "⇩ aanscherping", },
  { positie: 3, datum: "2020-09-18", kern: "⇩ aanscherping", },
  { positie: 2, datum: "2020-10-13", kern: "⇩ gedeeltelijke lockdown" },
  { positie: 1, datum: "2020-11-03", kern: "⇩ tijdelijke verzwaring" },
  { positie: 3, datum: "2020-11-17", kern: "⇧ max 6 met kerst" },
  { positie: 1, datum: "2020-12-08", kern: "⇩ max 3 met kerst" },
  { positie: 2, datum: "2020-12-14", kern: "⇩ hard op slot" },
  { positie: 0, datum: "2021-01-23", kern: "⇩ avondklok" },
  { positie: 1, datum: "2021-02-08", kern: "⇩ avondklok verlengd" },
  { positie: 2, datum: "2021-02-16", kern: "⇧ avondklok opgeheven?" },
  { positie: 3, datum: "2021-02-23", kern: "⇧ kappers weer open" },
  { positie: 1, datum: "2021-04-06", kern: "⇧ musea + dierentuinen open; field labs" },
  { positie: 2, datum: "2021-04-28", kern: "⇧ avondklok vervalt; winkels en terassen weer open" },
  { positie: 3, datum: "2021-05-15", kern: "⇧ reizen naar geel of groen oké" },
  { positie: 4, datum: "2021-05-31", kern: "⇧ middelbare scholen weer volledig open" },
  { positie: 5, datum: "2021-06-05", kern: "⇧ winkels, horeca, cultuur volledig open" },
  { positie: 1, datum: "2021-06-26", kern: "⇧ geen mondkapjes meer" },
  { positie: 2, datum: "2021-06-30", kern: "⇧ evenementen weer 100%" },
  { positie: 3, datum: "2021-07-12", kern: "Rutte biedt excuses aan" },
]
.map(m => ({...m, datum: new Date(m.datum)}))
)}

function _measures(maatregels,vanaf){return(
maatregels.filter(m => m.datum > vanaf)
)}

function _data(rivmData,vanaf){return(
rivmData // Map RIVM names to standardized names
.map((k, i, d) => ({
  date: new Date(k.Date),
  // date: k.Date,
  lower: k. Rt_low,
  R: k.Rt_avg === undefined ? undefined : +k.Rt_avg,  // Only include Rt_avg/middle if present
  upper: k.Rt_up,
  middle: k.Rt_avg ?? 0,
})).filter(p => p.date > vanaf)
)}

function _vanaf(addDays,weken){return(
addDays(Date.now(), -7 * weken)
)}

function _rivmData(rivmURL){return(
fetch("https://observable-cors.glitch.me/" + rivmURL).then(response => response.json())
)}

function _rivmURL(){return(
"https://data.rivm.nl/covid-19/COVID-19_reproductiegetal.json"
)}

function _baseline(){return(
1
)}

function _20(md){return(
md`## Machinekamer

[COVID-19 Reproductiegetal (pre-Plot)](https://observablehq.com/@martien/covid-19-reproductiegetal-pre-plot) telt 372 regels code. De op Plot-gebaseerde versie telt 228 regels code. Dat scheelt 144 regels code. Dat is ongeveer 40% minder.`
)}

function _defaults(width,height){return(
{
  width, // make it as wide as the page
  height, // use a constant height throughout the notebook
  y: {domain: [0.5, 3.0]}, // so all plots have a consistent scale (and height)
  grid: true,
}
)}

function _Rline(Plot,data){return(
Plot.line(data, {x: "date", y: "R", stroke: "darkslateblue"})
)}

function _area(Plot,baseline,deltaFromBaseline){return(
(color, data) =>
Plot.areaY(
  data,
  {
    fill: color,
    fillOpacity: .2,
    x: "date",
    y1: _ => baseline,
    y2: d => deltaFromBaseline(color, d.R),
  }
)
)}

function _deltaFromBaseline(baseline){return(
(color, R) => ({
  green: R <= baseline,
  red: R >= baseline
})[color] ? R : NaN
)}

function _textY(){return(
d => 1.3 + (d.positie - 1) / 15
)}

function _addDays(){return(
(date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
)}

function _datumNL(){return(
d => d.toLocaleString("nl-NL", { weekday: "short", day: "2-digit", month: "short", year: "numeric"})
)}

function _height(){return(
400
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("final")).define("final", ["Plot","defaults","toonBollingerband","data","area","baseline","Rline","measures","textY","datumNL"], _final);
  main.variable(observer()).define(["md","weken","datumNL","vanaf","data"], _3);
  main.variable(observer("viewof weken")).define("viewof weken", ["Inputs"], _weken);
  main.variable(observer("weken")).define("weken", ["Generators", "viewof weken"], (G, _) => G.input(_));
  main.variable(observer("viewof toonBollingerband")).define("viewof toonBollingerband", ["Inputs"], _toonBollingerband);
  main.variable(observer("toonBollingerband")).define("toonBollingerband", ["Generators", "viewof toonBollingerband"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Inputs","maatregels"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Inputs","data"], _10);
  main.variable(observer()).define(["md","rivmURL"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("maatregels")).define("maatregels", _maatregels);
  main.variable(observer("measures")).define("measures", ["maatregels","vanaf"], _measures);
  main.variable(observer("data")).define("data", ["rivmData","vanaf"], _data);
  main.variable(observer("vanaf")).define("vanaf", ["addDays","weken"], _vanaf);
  main.variable(observer("rivmData")).define("rivmData", ["rivmURL"], _rivmData);
  main.variable(observer("rivmURL")).define("rivmURL", _rivmURL);
  main.variable(observer("baseline")).define("baseline", _baseline);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("defaults")).define("defaults", ["width","height"], _defaults);
  main.variable(observer("Rline")).define("Rline", ["Plot","data"], _Rline);
  main.variable(observer("area")).define("area", ["Plot","baseline","deltaFromBaseline"], _area);
  main.variable(observer("deltaFromBaseline")).define("deltaFromBaseline", ["baseline"], _deltaFromBaseline);
  main.variable(observer("textY")).define("textY", _textY);
  main.variable(observer("addDays")).define("addDays", _addDays);
  main.variable(observer("datumNL")).define("datumNL", _datumNL);
  main.variable(observer("height")).define("height", _height);
  return main;
}
