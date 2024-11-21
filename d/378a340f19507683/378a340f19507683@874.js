function _1(md){return(
md`# Why don't these events work smoothly?`
)}

function _data(Inputs){return(
Inputs.input(undefined)
)}

function _3(data){return(
data[0].value
)}

function _initializeData(html,$0,Event)
{
  let d1 = html`<div></div>`; //empty dom element to catch events
  d1.oninput = () => {
    console.log("D1 INPUT");

    $0.value = [d1, d2];
    //THIS NEXT LINE IS THE PROBLEM, COMMENT ME OUT
    $0.dispatchEvent(new Event("input"));
  };

  let d2 = html`<div></div>`;

  $0.value = [d1, d2];
  $0.dispatchEvent(new Event("input"));
}


function _inputsForm(html,Inputs,$0){return(
() => html`
  ${Inputs.bind(Inputs.range([0, 255]), $0.value[0])}
  ${Inputs.bind(Inputs.range([0, 255]), $0.value[1])}`
)}

function _6(inputsForm){return(
inputsForm()
)}

function _7(inputsForm){return(
inputsForm()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof data")).define("viewof data", ["Inputs"], _data);
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["data"], _3);
  main.variable(observer("initializeData")).define("initializeData", ["html","viewof data","Event"], _initializeData);
  main.variable(observer("inputsForm")).define("inputsForm", ["html","Inputs","viewof data"], _inputsForm);
  main.variable(observer()).define(["inputsForm"], _6);
  main.variable(observer()).define(["inputsForm"], _7);
  return main;
}
