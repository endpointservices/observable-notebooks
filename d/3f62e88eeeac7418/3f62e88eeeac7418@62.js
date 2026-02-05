import define1 from "./5c1b38ac46351270@317.js";
import define2 from "./0b16aaecf59cca0a@803.js";
import define3 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`# Share + Dataeditor

This is a globally syncronised data editor (try this URL in a guest account). Everyone's changes are propogated to everyone else, the state is remembered between refreshes, and there is a [REST API](https://calculus-d7a63.firebaseio.com/shareinput/https%3A%252F%252Fobservablehq%252Ecom%252Fd%252F3f62e88eeeac7418/data.json).

A good example of [scalable ui development](https://observablehq.com/@tomlarkworthy/ui-development).
`
)}

function _4(example){return(
example
)}

function _example(dataEditor,Inputs){return(
dataEditor(
  [
    { qty: 1, name: "Peas", type: "vegetable" },
    { qty: 50, name: "Apples", type: "fruit" },
    { qty: 12, name: "Bananas", type: "fruit" },
    { qty: 13, name: "Pears", type: "fruit" },
    { qty: 63, name: "Broccoli", type: "vegetable" },
    { qty: 10, name: "Cabbage", type: "vegetable" },
    { qty: 14, name: "Starfruit", type: "fruit" },
    { qty: 53, name: "Passionfruit", type: "fruit" },
    { qty: 12, name: "Carrots", type: "vegetable" },
    { qty: 1, name: "Potatoes", type: "vegetable" },
    { qty: 0, name: "Cabbage", type: "vegetable" },
    { qty: 44, name: "Lemons", type: "fruit" },
    { qty: 54, name: "Nuts", type: "vegetable" },
    { qty: 12, name: "Sugar cane", type: "vegetable" },
    { qty: 12, name: "Coconuts", type: "fruit" },
    { qty: 13, name: "Seeds", type: "fruit" },
    { qty: 63, name: "Corn", type: "vegetable" },
    { qty: 10, name: "Grapefruit", type: "vegetable" }
  ],
  {
    columns: ["qty", "type", "name"],
    format: {
      qty: d =>
        Inputs.range([0, 100], {
          value: d
        }),
      type: d =>
        Inputs.select(["fruit", "vegetable"], {
          value: d
        })
    },
    width: {
      qty: "100px",
      type: "100px",
      name: "100%"
    },
    tableclass: "veg",
    stylesheet: `
      .veg {
        background-color: #eff;
      }
      .col-qty form {
        width: 100px
      }
      .col-type form {
        width: 100px
      }
      .veg input[type=range] {
        display: none;
      }
    `
  }
)
)}

function _6(share,$0){return(
share("data", $0)
)}

function _7(example){return(
example
)}

function _8($0){return(
$0.addEventListener('input', e => {
  console.log(e);
})
)}

function _10(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("share", child1);
  const child2 = runtime.module(define2);
  main.import("dataEditor", child2);
  main.variable(observer()).define(["example"], _4);
  main.variable(observer("viewof example")).define("viewof example", ["dataEditor","Inputs"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer()).define(["share","viewof example"], _6);
  main.variable(observer()).define(["example"], _7);
  main.variable(observer()).define(["viewof example"], _8);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _10);
  return main;
}
