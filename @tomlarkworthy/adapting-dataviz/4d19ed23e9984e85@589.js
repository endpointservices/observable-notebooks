function _1(md){return(
md`# Timeseries Assets`
)}

function _2(md){return(
md`Standardizing information to be imported for all of the notebooks in the [collection](https://observablehq.com/collection/@observablehq/analyzing-time-series-data). `
)}

function _3(md){return(
md`## Authorship`
)}

function _4(authorship){return(
authorship()
)}

function _authorship(htl,workshop){return(
(authors = ["Author 1", "Author 2", "Author 3"], intro="This article is part of a series on") => {
  const boxStyles = {
    margin: "10px", 
    background: "#F5F5F5", 
    borderRadius: "5px", 
    padding: "15px", 
    width: "100%",
    maxWidth: "640px",
    minWidth: "250px"
  };
  const joinChar = authors.length < 3 ? " " : ", ";
  const authorString = authors.map((d, i) => (i === authors.length - 1 && authors.length > 1) ? `and ` + d : d).join(joinChar);
  return htl.html`
  <div style="display: flex; flex-wrap: wrap;">
    <div style=${boxStyles}>
      <strong>${intro} <a href="https://observablehq.com/collection/@observablehq/analyzing-time-series-data">Analyzing Time Series Data</a></strong><br/>
  
${workshop()}
  </div>
`;
}
)}

function _altauthorship(htl,workshopalt){return(
(authors = ["Author 1", "Author 2", "Author 3"], intro="This article is part of a series on") => {
  const boxStyles = {
    margin: "10px", 
    background: "#F5F5F5", 
    borderRadius: "5px", 
    padding: "15px", 
    width: "100%",
    maxWidth: "640px",
    minWidth: "250px"
  };
  const joinChar = authors.length < 3 ? " " : ", ";
  const authorString = authors.map(
    (d, i) => 
    authors.length == 1 ? d : 
    (i === authors.length - 1 ? `and ` + d : d)
  ).join(joinChar);
  return htl.html`
  <div style="display: flex; flex-wrap: wrap;">
    <div style=${boxStyles}>
    <strong>${intro} <a href="https://observablehq.com/collection/@observablehq/analyzing-time-series-data">Analyzing Time Series Data</a></strong><br/>
${workshopalt()}
  </div>
`;
}
)}

function _7(md){return(
md`---`
)}

function _8(md){return(
md`## Workshop`
)}

function _9(workshop){return(
workshop()
)}

function _workshop(htl){return(
() => htl.html`👋 <em> &nbspCheck out the <a href="https://observablehq.com/@observablehq/timeseries-workshop-materials?collection=@observablehq/analyzing-time-series-data">video & learning materials</a> from the author-led workshop</em>`
)}

function _workshopalt(htl){return(
() => htl.html`👋 <em> &nbspJoin series creators Zan, Mike, and Ian, for a <a href="https://www.meetup.com/observablehq/events/281119076/">free online workshop</a> on October 21st</em>`
)}

function _12(md){return(
md`---`
)}

function _13(md){return(
md`## Navigation
Pass in the index of the current notebook, will find the previous and next ones`
)}

function _14(navigation){return(
navigation(1)
)}

function _navigation(notebookOrder,htl){return(
(currIndex = 1) => {
  const previous = {...notebookOrder[currIndex - 1], order:"previous"};
  const next = {...notebookOrder[currIndex + 1], order:"next"}
  const pages = currIndex === 0 ? [next] :
      currIndex === notebookOrder.length - 1 ? [previous] :
    [previous, next]
  return htl.html`
  <style>
    .nav_wrapper:hover .link {
      text-decoration: underline;
    }
    .nav_wrapper {
      border: 1px solid white;
      margin: 10px;
      background: #F5F5F5;
      border-radius: 5px;    
      padding: 15px;
      width: 40%;
      min-width: 250px;
      text-decoration:none !important;
    }
    .nav_wrapper:hover {
      border: 1px solid #d3d3d3;
    }

  </style>
  <div>
    <span>More in the <a href="https://observablehq.com/collection/@observablehq/analyzing-time-series-data">Analyzing Time Series Data</a> collection:</span>
    <div style="display: flex; flex-wrap: wrap;">   
      ${pages.map((d, i) => {
        return htl.html`<a href=${d.link}?collection=@observablehq/analyzing-time-series-data class="nav_wrapper">
        <span style="text-decoration-color:red; font-family: var(--sans-serif); font-variant: small-caps; color: #6D6D6D;">${d.order}</span><br/>
        <span class="link"><strong>${d.name}</strong></span>
      </a>`;
      })}
    </div>
  </div>
`;
}
)}

function _16(md){return(
md`---`
)}

function _17(md){return(
md`## Read more`
)}

function _18(readMore){return(
readMore()
)}

function _readMore(md){return(
() => md`
|Read more|
| --- |--- | --- |
|[Open any cell](https://observablehq.com/@observablehq/a-taste-of-observable), to see how it was created|
|Try [Observable Plot](https://observablehq.com/@observablehq/plot), the visualization library used throughout this series|
|Learn about [Inputs in Observable](https://observablehq.com/@observablehq/inputs)|
|[Fork](https://observablehq.com/@observablehq/fork-share-merge?collection=@observablehq/ordered-introduction) a notebook to start analyzing this data yourself|
|See these visualizations with [your own data](https://observablehq.com/@observablehq/introduction-to-data)|
|Use our interface to [get energy data from EIA](https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation?collection=@observablehq/analyzing-time-series-data), [historical weather data NOAA](https://observablehq.com/@observablehq/noaa-weather-data-by-major-u-s-city?collection=@observablehq/analyzing-time-series-data), or a starting point to build a similar 'front-end' for your data|`
)}

function _notebookOrder(){return(
[
  {
    name: "Analyzing Time Series Data",
    link:
      "https://observablehq.com/@observablehq/analyzing-time-series-data-in-observable"
  },
  {
    name: "What’s different? Analyzing Time-Series Forecast Performance",
    link:
      "https://observablehq.com/@observablehq/whats-different-comparing-actuals-forecast"
  },
  {
    name: "What caused this? An analysis adventure",
    link:
      "https://observablehq.com/@observablehq/what-caused-this-an-analysis-adventure"
  },
  {
    name: "Discovering Date Patterns",
    link: "https://observablehq.com/@observablehq/discovering-date-patterns"
  },
  {
    name: "Just because it’s Time, it doesn’t have to be a Line",
    link: "https://observablehq.com/@observablehq/tinydifferencesmatter"
  },
  {
    name: "Correlation over time",
    link: "https://observablehq.com/@observablehq/correlation-over-time"
  },
  {
    name: "Workshop Materials: Analyzing Time Series Data",
    link:
      "https://observablehq.com/@observablehq/timeseries-workshop-materials"
  },
  {
    name: "EIA OpenData: Real-Time Hourly Electricity Data",
    link:
      "https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation"
  },
  {
    name: "NOAA Historical Hourly Weather Data by U.S. City",
    link:
      "https://observablehq.com/@observablehq/noaa-weather-data-by-major-u-s-city"
  }
]
)}

function _21(notebookOrder,html,htl){return(
htl.html`${notebookOrder.map(d => html`<p>${d.name}</p>`)}`
)}

function _22(htl,notebookOrder,md){return(
htl.html`${notebookOrder.map(d => md`${d.name}`)}`
)}

function _23(md){return(
md`---`
)}

function _24(md){return(
md`## Archive`
)}

function _25(workshopBig){return(
workshopBig()
)}

function _workshopBig(htl){return(
() => htl.html`<div style="border-radius:5px;text-align:center;background: #fffced; box-sizing: border-box; padding: 20px 20px;"><summary style="font-weight: bold; outline: none;">Want to learn more? Join us for a <a href="">free online workshop</a> on October XX.</summary></div>`
)}

function _27(md){return(
md`---`
)}

function _28(md){return(
md`## Flex layout for 4 images (unrelated work)`
)}

async function _29(FileAttachment,htl){return(
htl.html`<div style="display:flex; flex-wrap: wrap;">
  <div style="min-width:100px">
    <img style="max-width:200px" src="${await FileAttachment("Screen Shot 2021-09-28 at 2.17.20 PM.png").url()}"/>
  </div>
  <div style="min-width:100px">
    <img style="max-width:200px" src="${await FileAttachment("Screen Shot 2021-09-28 at 2.17.20 PM.png").url()}"/>
  </div>
  <div style="min-width:100px">
    <img style="max-width:200px" src="${await FileAttachment("Screen Shot 2021-09-28 at 2.17.20 PM.png").url()}"/>
  </div>
  <div style="min-width:100px">
    <img style="max-width:200px" src="${await FileAttachment("Screen Shot 2021-09-28 at 2.17.20 PM.png").url()}"/>
  </div>
</div>
  `
)}

function _30(md){return(
md`below is same, but go to 2x2 grid rather than 3x1`
)}

function _31(){return(
576 / 2
)}

function _32(md){return(
md`### The best one is below! (flex)`
)}

async function _33(FileAttachment,htl){return(
htl.html`<div style="display: flex; flex-wrap: wrap;">
  <div style="display: flex; flex-wrap: wrap; margin-bottom: 10px;">
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff1.png").url()}"/>
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff2.png").url()}"/>
  </div>
  <div style="display: flex; flex-wrap: wrap; margin-bottom: 10px;">
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff3.png").url()}"/>
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff4.png").url()}"/>
  </div>
</div>`
)}

async function _34(FileAttachment,htl){return(
htl.html`<div style="display:flex; flex-wrap: wrap;">
  <div style="display: flex; flex-wrap: wrap;">
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff1.png").url()}"/>
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff2.png").url()}"/>
  </div>
  <div style="display: flex; flex-wrap: wrap;">
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff3.png").url()}"/>
    <img style="max-width:288px" src="${await FileAttachment("whatsdiff4.png").url()}"/>
  </div>
</div>
  `
)}

function _35(){return(
576 * 4
)}

function _36(md){return(
md`Visnu gave me (I saved files at 576w)`
)}

async function _37(FileAttachment,htl){return(
htl.html`<div class="grid">
  <img src="${await FileAttachment("whatsdiff1.png").url()}"/>
  <img src="${await FileAttachment("whatsdiff2.png").url()}"/>
  <img src="${await FileAttachment("whatsdiff3.png").url()}"/>
  <img src="${await FileAttachment("whatsdiff4.png").url()}"/>
<div>
<style>
  .grid > * { width: 100%; }
  .grid { display: grid; grid-template-columns: repeat(1, 1fr); } /* small */
  @media (min-width: 30em) { /* medium */
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 50em) { /* large */
    .grid { grid-template-columns: repeat(4, 1fr); }
  }
</style>`
)}

function _38(callToAction){return(
callToAction()
)}

function _39(authorship_archive){return(
authorship_archive("Zan Armstrong", "Mike Freeman")
)}

function _authorship_archive(md){return(
(a1, a2) => md`
This is the old style, soon to be retired...

|This article is part of a series on [Analyzing Time Series Data](https://observablehq.com/@observablehq/analyzing-time-series-data-in-observable?collection=@observablehq/analyzing-time-series-data)|
| --- |--- | --- |
|*Article by: ${a1} and ${a2}*|
|*Series based on collaborative data wrangling, analysis, and visualization creation: equal contributions from Ian Johnson, Mike Freeman, and Zan Armstrong*|`
)}

function _shortCallToAction(md){return(
() => md`## What's next?

|Read on!|
| --- |--- | --- |
|Explore the rest of the stories in the [Analyzing Time Series](https://observablehq.com/@observablehq/analyzing-time-series-data-in-observable?collection=@observablehq/analyzing-time-series-data) series|
|Try [Observable Plot](https://observablehq.com/@observablehq/plot), the visualization library used throughout this series|
`
)}

function _callToAction(md){return(
() => md`## What’s next?

|Read more!|
| --- |--- | --- |
|Check out the next article: [EIA OpenData: Real-Time Hourly Energy Data](https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation)|
|Read the rest of the stories in the [Analyzing Time Series](https://observablehq.com/@observablehq/analyzing-time-series-data-in-observable?collection=@observablehq/analyzing-time-series-data) series|

|Try it yourself!|
| --- |--- | --- |
|[Open any cell](https://observablehq.com/@observablehq/a-taste-of-observable), to see how it was created|
|Try [Observable Plot](https://observablehq.com/@observablehq/plot), the visualization library used throughout this series|
|Learn about [Inputs in Observable](https://observablehq.com/@observablehq/inputs)|
|[Fork](https://observablehq.com/@observablehq/fork-share-merge?collection=@observablehq/ordered-introduction) a notebook to start analyzing this data yourself|
|See these visualizations with [your own data](https://observablehq.com/@observablehq/introduction-to-data)|
|Use our interface to [get energy data from EIA](https://observablehq.com/@observablehq/eia-opendata-electricity-grid-operation?collection=@observablehq/analyzing-time-series-data), [historical weather data NOAA](https://observablehq.com/@observablehq/noaa-weather-data-by-major-u-s-city?collection=@observablehq/analyzing-time-series-data), or a starting point to build a similar 'front-end' for your data|`
)}

function _43(shortCallToAction){return(
shortCallToAction()
)}

function _44(nextStep){return(
nextStep()
)}

function _nextStep(md){return(
(info = "read on...", link = "") => md`Next, let’s ${info}

<a title="Plot: Scales" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="${link}">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Screen Shot 2021-09-28 at 2.17.20 PM.png", {url: new URL("./files/7d77d32a2ed1651d53b1fde03d7fc7e2800608d591e93783bbdaa7f365bd8dea0bdca23fbbaf89573fa61dd56ad2ddb577623098337d2d63a0b30f7744714094.png", import.meta.url), mimeType: "image/png", toString}],
    ["whatsdiff2.png", {url: new URL("./files/523f3a2117da6432bed79dcafa362f14163887761cbc4a1a7a110c2afae68e3afcad3aec6e358934f095c7500fb82349dc2f7f4dd6056c5f8b2d75a19158cb96.png", import.meta.url), mimeType: "image/png", toString}],
    ["whatsdiff1.png", {url: new URL("./files/53bdbe71876ac0cc523130948ba5f4b0f47e27f5a1b547e9ec2fd191937ef98fc17407707ec2ffd78afe8f70a1268bff66cfe40722464d4406e73123b9ed9426.png", import.meta.url), mimeType: "image/png", toString}],
    ["whatsdiff4.png", {url: new URL("./files/81d43e2389259834041b8e51ef5fda5ad2213e46f97921ab13c997511f9ec5bb1470e4c2ddf00f97663444b4c8eba69e00f1fe0f2f62107ce5d94106bb6aec40.png", import.meta.url), mimeType: "image/png", toString}],
    ["whatsdiff3.png", {url: new URL("./files/d01fdb38d55df7f3f124e2eb66bc1489bb22832616b5dd0d2f3bd4c4b8d31b72b379d57bf29e3a4421902c537c61d65c06d9d1090f4816b5fdd4ecac2c4a9b53.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["authorship"], _4);
  main.variable(observer("authorship")).define("authorship", ["htl","workshop"], _authorship);
  main.variable(observer("altauthorship")).define("altauthorship", ["htl","workshopalt"], _altauthorship);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["workshop"], _9);
  main.variable(observer("workshop")).define("workshop", ["htl"], _workshop);
  main.variable(observer("workshopalt")).define("workshopalt", ["htl"], _workshopalt);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["navigation"], _14);
  main.variable(observer("navigation")).define("navigation", ["notebookOrder","htl"], _navigation);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["readMore"], _18);
  main.variable(observer("readMore")).define("readMore", ["md"], _readMore);
  main.variable(observer("notebookOrder")).define("notebookOrder", _notebookOrder);
  main.variable(observer()).define(["notebookOrder","html","htl"], _21);
  main.variable(observer()).define(["htl","notebookOrder","md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["workshopBig"], _25);
  main.variable(observer("workshopBig")).define("workshopBig", ["htl"], _workshopBig);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["FileAttachment","htl"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(_31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["FileAttachment","htl"], _33);
  main.variable(observer()).define(["FileAttachment","htl"], _34);
  main.variable(observer()).define(_35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["FileAttachment","htl"], _37);
  main.variable(observer()).define(["callToAction"], _38);
  main.variable(observer()).define(["authorship_archive"], _39);
  main.variable(observer("authorship_archive")).define("authorship_archive", ["md"], _authorship_archive);
  main.variable(observer("shortCallToAction")).define("shortCallToAction", ["md"], _shortCallToAction);
  main.variable(observer("callToAction")).define("callToAction", ["md"], _callToAction);
  main.variable(observer()).define(["shortCallToAction"], _43);
  main.variable(observer()).define(["nextStep"], _44);
  main.variable(observer("nextStep")).define("nextStep", ["md"], _nextStep);
  return main;
}
