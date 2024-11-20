import define1 from "./666acd0c3c652c48@1379.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# Notebook dependencies`
)}

function _2(text,$0)
{
  const input = text({placeholder: "notebook-name-or-URL", description: "Enter the notebook's name or URL. For example, try @magjac/notebook-dependencies", submit: "Go"});
  $0.addEventListener("input", event => input.value = event.value);
  input.addEventListener("input", () => $0.value = input.value);
  input.value = $0.value;
  return input;
}


function _graph(adot,dotSrc,width){return(
adot.bind(this)`${dotSrc}${{width: width, height: 500, fit: true, duration: 1000}}`
)}

function _4(md){return(
md`Double click one of the dependencies to see that notebook's dependeny`
)}

function _notebookNameOrURL(Inputs){return(
Inputs.text({
  value: "@magjac/introduction-to-d3-graphviz"
})
)}

async function _notebookName(notebookNameOrURL)
{
  return await new Promise(function(resolve, reject) { 
    if (notebookNameOrURL) {
      resolve(`@${notebookNameOrURL.split('@').slice(-1)[0]}`);
    } 
  });
}


function _topNotebook(parseName,notebookName){return(
parseName(notebookName)
)}

async function _notebookJSON(fetchp,notebookName)
{
  const response = await fetchp(
    `https://api.observablehq.com/document/${notebookName}`
  );
  if (response.status !== 200)
    throw new Error(`${response.state}: ${await response.text()}`);
  return response.json();
}


function _notebooks(notebookJSON,parseName)
{
  let nodes = notebookJSON.nodes;
  let notebooks = [];
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let lines = node.value.split('\n');
    for (let line of lines) {
      let words = line.replace(/ \/\/.*/, '').split(' ');
      if (words[0] == 'import') {
        let name = words[words.length - 1].replace(/"/g, '');
        notebooks.push(parseName(name));
      }
    }
  }
  return notebooks;
}


function _parseName(){return(
function(name) {
  let [user, slug] = name.replace('@', '').split('/');
  let label = `@${user}\\n${slug}`
  return {name: name, label: label, user: user, slug: slug}
}
)}

function _users(notebooks,topNotebook)
{
  let users = new Set(notebooks.map((notebook) => notebook.user));
  users.add(topNotebook.user);
  return Array.from(users);
}


function _hashCode(){return(
function (str) {
  return Math.abs(str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0));
}
)}

function _colors(users,d3,hashCode)
{
  let colors = {};
  users.map((user, i) => {colors[user] = d3.schemePaired[hashCode(user) % d3.schemePaired.length]});
  return colors;
}


function _dotSrc(topNotebook,colors,notebooks){return(
`
digraph {

  graph [rankdir=BT toolstip=""]
  node [
    style=filled
    // FIXME: dblclick also causes click despite e.stopPropagation() and e.preventDefault() below
    //tooltip="Click to visit notebook.\\n"Double click to show notebooks dependencies"
  ]

  "${topNotebook.label}" [
    id="${topNotebook.name}"
    fillcolor="${colors[topNotebook.user]}"
    URL="https://beta.observablehq.com/${topNotebook.name}"
    tooltip="Click to visit the ${topNotebook.name} notebook"
  ]

  {
    ${notebooks.map((notebook) => `
    "${notebook.label}" [
      id="${notebook.name}"
      fillcolor="${colors[notebook.user]}"
      // FIXME: dblclick also causes click despite e.stopPropagation() and e.preventDefault() below
      //URL="https://beta.observablehq.com/${notebook.name}"
      tooltip="Double click to show the dependencies of the ${notebook.name} notebook"
    ]`
    ).join('\n')
    }
  } -> "${topNotebook.label}"
}
`
)}

function _nodeSelection(graph,d3,$0)
{
  graph;
  return d3.selectAll(".node")
      .on("dblclick", function () {
        let e = d3.event;
          e.stopPropagation();
          e.preventDefault();
          let id = d3.select(this).attr("id");
          if (id) {
            $0.value = id;
          }
      })
      // FIXME: how to avoid dblclick also gives click?
      /*
      .on("click", function () {
        let e = d3.event;
        e.stopPropagation();
        e.preventDefault();
      })
      */
      ;
}


function _trusted_domain(){return(
["api.observablehq.com"]
)}

function _d3(require){return(
require("d3-fetch", "d3-scale-chromatic", "d3-selection")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["text","viewof notebookNameOrURL"], _2);
  main.variable(observer("graph")).define("graph", ["adot","dotSrc","width"], _graph);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof notebookNameOrURL")).define("viewof notebookNameOrURL", ["Inputs"], _notebookNameOrURL);
  main.variable(observer("notebookNameOrURL")).define("notebookNameOrURL", ["Generators", "viewof notebookNameOrURL"], (G, _) => G.input(_));
  main.variable(observer("notebookName")).define("notebookName", ["notebookNameOrURL"], _notebookName);
  main.variable(observer("topNotebook")).define("topNotebook", ["parseName","notebookName"], _topNotebook);
  main.variable(observer("notebookJSON")).define("notebookJSON", ["fetchp","notebookName"], _notebookJSON);
  main.variable(observer("notebooks")).define("notebooks", ["notebookJSON","parseName"], _notebooks);
  main.variable(observer("parseName")).define("parseName", _parseName);
  main.variable(observer("users")).define("users", ["notebooks","topNotebook"], _users);
  main.variable(observer("hashCode")).define("hashCode", _hashCode);
  main.variable(observer("colors")).define("colors", ["users","d3","hashCode"], _colors);
  main.variable(observer("dotSrc")).define("dotSrc", ["topNotebook","colors","notebooks"], _dotSrc);
  main.variable(observer("nodeSelection")).define("nodeSelection", ["graph","d3","viewof notebookNameOrURL"], _nodeSelection);
  const child1 = runtime.module(define1);
  main.import("adot", child1);
  const child2 = runtime.module(define2);
  main.import("text", child2);
  main.variable(observer("trusted_domain")).define("trusted_domain", _trusted_domain);
  const child3 = runtime.module(define3).derive(["trusted_domain"], main);
  main.import("fetchp", child3);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
