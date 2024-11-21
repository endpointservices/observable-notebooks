import define1 from "./92ff66b718c1972f@141.js";
import define2 from "./3d59cab3a9c819e2@168.js";

function _1(md){return(
md`# Esoteric Calendar: The Fairy Dog Calendar`
)}

function _fairydog(FileAttachment){return(
FileAttachment("fairydog.jpg").image()
)}

function _3(md){return(
md`See https://observablehq.com/@str4w/circular_calendar`
)}

function _4(md){return(
md`https://observablehq.com/@roelandschoukens/astronomical-clock

https://observablehq.com/@igor-a1/the-moon-tilt zodiac`
)}

function _5(md){return(
md`## Gregorian converter`
)}

function _params(verticalSliders){return(
verticalSliders({
  names: ["ra", "rb", "ca", "cb", "y"],
  labels: ["ra", "rb", "ca", "CB", "y"],
  maxs: [1000, 1000, 1000, 1000, 400],
  values: [150, 150, 300, 300, 200]
})
)}

function _8(params){return(
params
)}

function _year(timestamp){return(
timestamp / (1000 * 60 * 60 * 24 * 265)
)}

function _date(timestamp){return(
new Date(timestamp)
)}

function _11(md){return(
md`## Sirius A around Sirius B (22 year cycle)`
)}

function _12(params,year,htl){return(
htl.html`<svg width="600" height="400">
  <rect width="100%" height="100%" fill="grey"/>
  <circle cx="${params.ca + params.ra * Math.sin(year + Math.PI)}" cy="${params.y + params.ra * Math.cos(year + Math.PI)}"
    r="40" stroke="black" stroke-width="3" fill="red" />
  <circle cx="${params.cb + params.rb * Math.sin(year)}" cy="${params.y + params.rb * Math.cos(year)}"
    r="20" stroke="black" stroke-width="3" fill="yellow" />
</svg>`
)}

function _13(md){return(
md`## Earth around Sum (1 year cycle))`
)}

function _14(params,year,htl){return(
htl.html`<svg width="600" height="400">
  <rect width="100%" height="100%" fill="grey"/>
  <circle cx="${params.ca + params.ra * Math.sin(year * 22 + Math.PI)}" cy="${params.y + params.ra * Math.cos(year * 22 + Math.PI)}"
    r="40" stroke="black" stroke-width="3" fill="red" />
  <circle cx="300" cy="200"
    r="60" stroke="black" stroke-width="3" fill="yellow" />
</svg>`
)}

function _15(md){return(
md`## Season
`
)}

function _fairyYear(year){return(
year - 60
)}

function _fairyDay(year){return(
(year % 1) * 365
)}

function _fairySeason(fairyDay){return(
fairyDay / 73
)}

function _fairySeasonDay(fairySeason){return(
(fairySeason % 1) * 73
)}

function _card(fairySeasonDay)
{
  // TODO
  if (fairySeasonDay < 1) return "festival";
  const suits = ["wands", "penticles", "swords", "cups"];
  let suit = null;
  if (fairySeasonDay < 7) suit = "w";
  else if (fairySeasonDay < 13) suit = "p";
  else if (fairySeasonDay < 19) suit = "s";
  else if (fairySeasonDay < 25) suit = "c";
  else if (fairySeasonDay < 7 + 24) suit = "w";
  else if (fairySeasonDay < 13 + 24) suit = "p";
  else if (fairySeasonDay < 19 + 24) suit = "s";
  else if (fairySeasonDay < 25 + 24) suit = "c";
  else if (fairySeasonDay < 7 + 42) suit = "w";
  else if (fairySeasonDay < 13 + 42) suit = "p";
  else if (fairySeasonDay < 19 + 42) suit = "s";
  else if (fairySeasonDay < 25 + 42) suit = "c";
  let value = Math.floor(fairySeasonDay / 9) + 1;
  return suit + (value < 10 ? "0" : 0) + value;
}


async function _21(fileAttachments,card,htl){return(
htl.html`<img src="${await fileAttachments[`${card}.jpg`].url()}">`
)}

function _timestamp(Inputs){return(
Inputs.range(
  [Date.now() - 100 * 24 * 60 * 60 * 365 * 100, Date.now()],
  {
    label: "date",
    step: 1000 * 60 * 60 * 24
  }
)
)}

function _24(md){return(
md`### Planetary symbol (connected to the demon)
The Groetia
The less key of solomon the king
https://en.wikipedia.org/wiki/Buer_(demon)

`
)}

function _img_20220706_151813(FileAttachment){return(
FileAttachment("IMG_20220706_151813.jpg").image()
)}

function _26(md){return(
md`### Zodiac (inner circle)

The numbers are degrees of the zodiac (Astrology) 30 degres each`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["fairydog.jpg", {url: new URL("./files/6fc27196c310702195728e7d0e6ea6f2ce7738151a7ae911b1340404756ac76236dac69a6c0fcf866b4b6985d8785b45881097f915ae28e8e7da9c3b00453a41.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["IMG_20220706_151813.jpg", {url: new URL("./files/a060fb1b0b6aabc8947a2c703c9a134964f55f7d9c0313eb8bbe387ae8b7edf910363d45638d564e7e98e1d480f63c185607cc49be21f60fb3fbf0430c72dc41.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("fairydog")).define("fairydog", ["FileAttachment"], _fairydog);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("verticalSliders", child1);
  main.variable(observer("viewof params")).define("viewof params", ["verticalSliders"], _params);
  main.variable(observer("params")).define("params", ["Generators", "viewof params"], (G, _) => G.input(_));
  main.variable(observer()).define(["params"], _8);
  main.variable(observer("year")).define("year", ["timestamp"], _year);
  main.variable(observer("date")).define("date", ["timestamp"], _date);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["params","year","htl"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["params","year","htl"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("fairyYear")).define("fairyYear", ["year"], _fairyYear);
  main.variable(observer("fairyDay")).define("fairyDay", ["year"], _fairyDay);
  main.variable(observer("fairySeason")).define("fairySeason", ["fairyDay"], _fairySeason);
  main.variable(observer("fairySeasonDay")).define("fairySeasonDay", ["fairySeason"], _fairySeasonDay);
  main.variable(observer("card")).define("card", ["fairySeasonDay"], _card);
  main.variable(observer()).define(["fileAttachments","card","htl"], _21);
  main.variable(observer("viewof timestamp")).define("viewof timestamp", ["Inputs"], _timestamp);
  main.variable(observer("timestamp")).define("timestamp", ["Generators", "viewof timestamp"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("fileAttachments", child2);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("img_20220706_151813")).define("img_20220706_151813", ["FileAttachment"], _img_20220706_151813);
  main.variable(observer()).define(["md"], _26);
  return main;
}
