function _1(md){return(
md`# Simplest CMS`
)}

function _2(md){return(
md`Publicly viewable Google sheets can be queried client-side with no CORS issues in CSV format, by sheetname.

\`d3.csv\` uses the first row to define the keys and returns array of objects.

Together you can build an incredibly simple serverless content management system.

I have sheet already setup [here](https://docs.google.com/spreadsheets/d/12oy6SbzN58lelbboOThhO_ly0mKC0tlZ4BVxlW10UZ8/edit?gid=0#gid=0) for an example`
)}

function _sheetId(){return(
"12oy6SbzN58lelbboOThhO_ly0mKC0tlZ4BVxlW10UZ8"
)}

function _sheetName(){return(
"products"
)}

function _5(md){return(
md`The following fetches and decodes it in one line of code:`
)}

function _products(d3,sheetId,sheetName){return(
d3.csv(
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`
)
)}

function _7(md){return(
md`The resultant array is a legible structured format for use in downstream processing:-`
)}

function _8(Inputs,products){return(
Inputs.table(products)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("sheetId")).define("sheetId", _sheetId);
  main.variable(observer("sheetName")).define("sheetName", _sheetName);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("products")).define("products", ["d3","sheetId","sheetName"], _products);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Inputs","products"], _8);
  return main;
}
