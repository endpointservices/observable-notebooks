// https://observablehq.com/@fil/table-extractor@159
function _1(md){return(
md`# Table Extractor

for tiny datasets in html tables.

Recommended usage:
~~~js
import {tableView} from "@fil/table-extractor"

viewof c = tableView(md\`
| field1 | field2 |
|---
| value 1 | value 2 |
\`)
~~~

(Note that this is not yet stabilized, I may change the API any time, so fork it, or pin the version if you use it for real.)`
)}

function _2(md){return(
md`## Examples`
)}

function _3(md){return(
md`### Usage with viewof:`
)}

function _c(tableView,md){return(
tableView(md`| date | name | value |
|---
| 22.01 | Julie  |  $3 |
| 24.01 | Ahmad  | $13 |
| 25.01 | Baruch |  $2 |
`)
)}

function _5(c){return(
c
)}

function _6(md){return(
md`### Usage in a function:`
)}

function _a(html){return(
html`<table><thead><tr><th>date</th><th>name</th><th>value</th></tr></thead><tbody><tr><td>22.01</td><td>Julie</td><td>$3</td></tr><tr><td>24.01</td><td>Ahmad</td><td>$13</td></tr><tr><td>25.01</td><td>Baruch</td><td>$2</td></tr></tbody></table>`
)}

function _8(tableExtractor,a){return(
tableExtractor(a)
)}

function _b(md){return(
md`_two tables of tiny data_

| date | name | value |
|---
| 22.01 | Julie  |  $3 |
| 24.01 | Ahmad  | $13 |
| 25.01 | Baruch |  $2 |

| date | name | value |
|---
| 22.01 | Julie  |  $3 |
| 24.01 | Ahmad  | $13 |
| 25.01 | Baruch |  $2 |
`
)}

function _10(tableExtractor,b){return(
tableExtractor(b, true)
)}

function _11(a,b,tableExtractor,d3){return(
a, b, tableExtractor(d3.selectAll("table"), true)
)}

function _12(md){return(
md`### Processing external data?

It's not meant for that, but why not.`
)}

function _13(CORS_PROXY,d3,tableExtractor){return(
fetch(CORS_PROXY + "https://en.wikipedia.org/wiki/List_of_sandwiches")
  .then((resp) => resp.text())
  .then((html) => d3.create("div").html(html))
  .then(tableExtractor)
)}

function _14(md){return(
md`## Code`
)}

function _tableExtractor(d3){return(
(root, multiple = false) => {
  const T = [];
  if (!root || !root.selectAll) root = d3.select(root);
  const tables = root
    .filter(function() {
      return this.nodeName === "TABLE";
    })
    .size()
    ? root.nodes()
    : root.selectAll("table");

  for (const table of tables) {
    const keys = [],
      rows = [];
    for (const th of d3.select(table).selectAll("th")) {
      keys.push(th.innerText.trim());
    }
    for (const tr of d3
      .select(table)
      .select("tbody")
      .selectAll("tr")) {
      // if we haven't found a thead, number keys
      if (keys.length === 0) {
        d3.select(tr)
          .selectAll("td")
          .each((_, i) => keys.push(i));
      }
      const row = {};
      let i = 0;
      for (const td of d3.select(tr).selectAll("td")) {
        const k = keys[i++];
        if (k) row[k] = td.innerText.trim();
      }
      rows.push(row);
    }
    rows.columns = keys;
    if (keys.length) T.push(rows);
  }
  return multiple ? T : T[0];
}
)}

function _tableView(tableExtractor){return(
(element, multiple) => {
  return Object.assign(element, { value: tableExtractor(element, multiple) });
}
)}

function _d3(require){return(
require("d3-selection@2")
)}

function _CORS_PROXY(){return(
"https://cors-anywhere.herokuapp.com/"
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof c")).define("viewof c", ["tableView","md"], _c);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer()).define(["c"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("a")).define("a", ["html"], _a);
  main.variable(observer()).define(["tableExtractor","a"], _8);
  main.variable(observer("b")).define("b", ["md"], _b);
  main.variable(observer()).define(["tableExtractor","b"], _10);
  main.variable(observer()).define(["a","b","tableExtractor","d3"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["CORS_PROXY","d3","tableExtractor"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("tableExtractor")).define("tableExtractor", ["d3"], _tableExtractor);
  main.variable(observer("tableView")).define("tableView", ["tableExtractor"], _tableView);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("CORS_PROXY")).define("CORS_PROXY", _CORS_PROXY);
  return main;
}
