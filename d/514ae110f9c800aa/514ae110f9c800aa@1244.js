import define1 from "./ef672b935bd480fc@623.js";
import define2 from "./a2e58f97fd5e8d7c@756.js";
import define3 from "./73b81e912ffcd59e@155.js";
import define4 from "./7554367c5d544cb3@226.js";

function _1(md){return(
md`# The Goodreads Classics Sortable Table`
)}

function _2(md){return(
md`This table displays reception statistics for the top Goodreads "classics." These are literary texts that were either tagged as a "classic" by Goodreads users the most number of times or most read as of September 2019.

- You can sort columns by clicking on the column title
- You can search for titles or authors via the search box

This data is being accessed directly through the Goodreads API. To create the table, I used the [new Table input](https://observablehq.com/@observablehq/input-table).`
)}

function _loading(md){return(
md`## Loading data from the Goodreads API`
)}

function _progress(html){return(
html`<progress max="144"></progress>`
)}

function _search_by(md){return(
md`## Search by keyword`
)}

function _search(Search,merged){return(
Search(merged, {
  placeholder: "Search the classics by keyword"
})
)}

function _date_report(md,date){return(
md`This data reflects current Goodreads statistics as of ${date}`
)}

function _goodreads_table(Table,search,d3,html,color){return(
Table(search, {
  layout: "fixed",
  rows: 50,
  sort: "Ratings",
  reverse: true,
  align: {
    "Avg. Rating": "right"
  },
  format: {
    Ratings: x => d3.format('.2s')(x),
    Reviews: x => d3.format('.2s')(x),
    Date: x => d3.timeFormat(x),
    " ": x => html`<img width=100px src="${x}" />`,
    "Avg. Rating": x => html`<div style='background:${color(x)}'>${x}</div>`
  },
  width: {
    Title: 100,
    " ": 100,
    "Most Shelved": 90,
    Author: 100,
    "Most Read": 80,
    Ratings: 50,
    Reviews: 60,
    "Avg. Rating": 80,
    Date: 40
  }
})
)}

function _color(d3){return(
d3
  .scaleLinear()
  .domain([4.5, 3.95, 3.4])
  .range(["#cafcc2", "#fce7c2", "#eb9494"])
)}

async function _metadata(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("All-Goodreads-Classics-Metadata-FINAL-2@6.csv").text(),
  d3.autoType
)
)}

function _classic_isbns(metadata){return(
metadata.map(function(x) {
  if (x != null) {
    return x.isbn13.toString();
  }
})
)}

function _12(d3){return(
d3.json(
  "https://cors.io/?https://www.goodreads.com/book/review_counts.json?key=${apiKey}&isbns=${classic_isbns}&format=JSON"
)
)}

function _response(apiKey,classic_isbns){return(
fetch(
  `https://cors.io/?https://www.goodreads.com/book/review_counts.json?key=${apiKey}&isbns=${classic_isbns}&format=JSON`
)
)}

async function _data(soFetch,apiKey,classic_isbns){return(
(
  await soFetch(
    `https://cors.io/?https://www.goodreads.com/book/review_counts.json?key=${apiKey}&isbns=${classic_isbns}&format=JSON`
  )
).json()
)}

async function _data3(fetchp,apiKey,classic_isbns){return(
await fetchp(
  `https://www.goodreads.com/book/review_counts.json?key=${apiKey}&isbns=${classic_isbns}&format=JSON`,
  {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
).then((response) => {
  return response.json();
})
)}

function _date(data,d3)
{
  let referenced_data = data;
  let date = new Date();
  /*date = date.toLocaleString();*/
  let parser = d3.timeFormat("%B %d, %Y %I:%M%p");
  return parser(date);
}


function _books(data){return(
data.books
)}

function _join(){return(
function join(lookupTable, mainTable, lookupKey, mainKey, select) {
  var l = lookupTable.length,
    m = mainTable.length,
    lookupIndex = [],
    output = [];
  for (var i = 0; i < l; i++) {
    // loop through l items
    var row = lookupTable[i];
    lookupIndex[row[lookupKey]] = row; // create an index for lookup table
  }
  for (var j = 0; j < m; j++) {
    // loop through m items
    var y = mainTable[j];
    var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
    output.push(select(y, x)); // select only the columns you need
  }
  return output;
}
)}

function _merged(join,metadata,books){return(
join(metadata, books, "isbn13", "isbn13", function(
  goodreads_book,
  book
) {
  return {
    Author: book.author,
    Title: book.title,
    " ": book.book_cover,
    Date: Number(book.yearFirstPublished),
    Ratings: goodreads_book.work_ratings_count,
    Reviews: goodreads_book.work_text_reviews_count,
    "Avg. Rating": goodreads_book.average_rating,
    "Most Shelved": book.mostPopularRank2,
    "Most Read": Number(book.mostReadRank)
  };
})
)}

async function* _21(progress,data,Promises)
{
  progress.value = data['books'].length;
  while (progress.value < progress.max) {
    await Promises.delay(100);
    progress.value += 1;
    yield progress.value;
  }
}


function _22(md){return(
md`# Appendix`
)}

function _d3(require){return(
require("d3@5")
)}

function _apiKey(){return(
"rHDU1vCBThU1nevPxF2Xwg"
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["All-Goodreads-Classics-Metadata-FINAL-2@6.csv", {url: new URL("./files/309c256fafa263a50aba02e3559f4c8bb2bb54f0f0bf7b58b537b66b6b8b51f81bae44e69ab1c0a232fe36aa19be569291210bfd34875313c01c1ad3f81ade05.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("loading")).define("loading", ["md"], _loading);
  main.variable(observer("progress")).define("progress", ["html"], _progress);
  main.variable(observer("search_by")).define("search_by", ["md"], _search_by);
  main.variable(observer("viewof search")).define("viewof search", ["Search","merged"], _search);
  main.variable(observer("search")).define("search", ["Generators", "viewof search"], (G, _) => G.input(_));
  main.variable(observer("date_report")).define("date_report", ["md","date"], _date_report);
  main.variable(observer("goodreads_table")).define("goodreads_table", ["Table","search","d3","html","color"], _goodreads_table);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("metadata")).define("metadata", ["d3","FileAttachment"], _metadata);
  main.variable(observer("classic_isbns")).define("classic_isbns", ["metadata"], _classic_isbns);
  main.variable(observer()).define(["d3"], _12);
  main.variable(observer("response")).define("response", ["apiKey","classic_isbns"], _response);
  main.variable(observer("data")).define("data", ["soFetch","apiKey","classic_isbns"], _data);
  main.variable(observer("data3")).define("data3", ["fetchp","apiKey","classic_isbns"], _data3);
  const child1 = runtime.module(define1);
  main.import("fetchp", child1);
  main.variable(observer("date")).define("date", ["data","d3"], _date);
  main.variable(observer("books")).define("books", ["data"], _books);
  main.variable(observer("join")).define("join", _join);
  main.variable(observer("merged")).define("merged", ["join","metadata","books"], _merged);
  main.variable(observer()).define(["progress","data","Promises"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child2 = runtime.module(define2);
  main.import("Table", child2);
  main.import("Search", child2);
  const child3 = runtime.module(define3);
  main.import("secret", child3);
  main.variable(observer("apiKey")).define("apiKey", _apiKey);
  const child4 = runtime.module(define4);
  main.import("soFetch", child4);
  return main;
}
