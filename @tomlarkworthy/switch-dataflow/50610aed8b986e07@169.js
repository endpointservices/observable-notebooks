import define1 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# How to 1-of-n switch [Dataflow](https://observablehq.com/@observablehq/reactive-dataflow) streams on [Observable](https://observablehq.com)

*In this series, I will explore programming techniques for the notebook platform [Observable](https://observablehq.com). Today I am looking at how to direct a reactive Dataflow stream to one-of-n downstream cells. This article assumes you are familiar with [Observable's non-linear reactive program flow](https://observablehq.com/@observablehq/reactive-dataflow) already.*`
)}

function _2(width,htl){return(
htl.html`<svg width="${Math.min(width, 640)}px" viewBox="0 0 1184 750" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 62 (91390) - https://sketch.com -->
    <title>switch-dataflow</title>
    <desc>Created with Sketch.</desc>
    <g id="switch-dataflow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect fill="#FFFFFF" x="0" y="0" width="1184" height="750"></rect>
        <rect id="Rectangle" stroke="#000000" fill="#FFFFFF" fill-rule="nonzero" x="48" y="133" width="154" height="62" rx="6"></rect>
        <line x1="495" y1="394" x2="682" y2="473" id="Path-18" stroke="#979797"></line>
        <text id="data" fill="#595959" font-family="Arial-BoldMT, Arial" font-size="18" font-weight="bold">
            <tspan x="105.494629" y="168">data</tspan>
        </text>
        <rect id="Rectangle" stroke="#000000" fill="#FFFFFF" fill-rule="nonzero" x="233" y="153" width="154" height="62" rx="6"></rect>
        <text id="switch" fill="#595959" font-family="Arial-BoldMT, Arial" font-size="18" font-weight="bold">
            <tspan x="281.493652" y="188">switch</tspan>
        </text>
        <rect id="Rectangle" stroke="#000000" fill="#FFFFFF" fill-rule="nonzero" x="418" y="133" width="154" height="62" rx="6"></rect>
        <text id="viewof-cell_1" fill="#595959" font-family="Arial-BoldMT, Arial" font-size="18" font-weight="bold">
            <tspan x="439.470703" y="168">viewof cell_1</tspan>
        </text>
        <rect id="Rectangle" stroke="#000000" fill="#FFFFFF" fill-rule="nonzero" x="604" y="133" width="154" height="62" rx="6"></rect>
        <text id="cell_1" fill="#595959" font-family="Arial-BoldMT, Arial" font-size="18" font-weight="bold">
            <tspan x="654.977539" y="168">cell_1</tspan>
        </text>
        <rect id="Rectangle" stroke="#000000" fill="#FFFFFF" fill-rule="nonzero" x="789" y="133" width="154" height="62" rx="6"></rect>
        <text id="viewof-cell_2" fill="#595959" font-family="Arial-BoldMT, Arial" font-size="18" font-weight="bold">
            <tspan x="809.470703" y="168">viewof cell_2</tspan>
        </text>
        <text id="dispatchEvent" fill="#000000" transform="translate(584.500000, 422.000000) rotate(24.000000) translate(-584.500000, -422.000000) " font-family="CourierNewPS-ItalicMT, Courier New" font-size="12" font-style="italic" font-weight="normal">
            <tspan x="530" y="425">dispatchEvent</tspan>
        </text>
        <rect id="Rectangle" stroke="#000000" fill="#FFFFFF" fill-rule="nonzero" x="974" y="133" width="154" height="62" rx="6"></rect>
        <text id="cell_2" fill="#000000" font-family="Arial-BoldMT, Arial" font-size="18" font-weight="bold">
            <tspan x="1024.97754" y="168">cell_2</tspan>
        </text>
        <rect id="Rectangle-2" x="202" y="371" width="62" height="31"></rect>
        <text id="[condition-a]" fill="#000000" font-family="Helvetica" font-size="12" font-weight="normal">
            <tspan x="199" y="364">[condition a]</tspan>
        </text>
        <rect id="Rectangle" x="202" y="495" width="62" height="31"></rect>
        <text id="[condition-b]" fill="#000000" font-family="Helvetica" font-size="12" font-weight="normal">
            <tspan x="198" y="520">[condition b]</tspan>
        </text>
        <rect id="Rectangle" fill="#FF0000" x="115" y="249" width="20" height="62"></rect>
        <path d="M692,474 C692,468.477153 687.522847,464 682,464 C676.477153,464 672,468.477153 672,474 L692,474 Z" id="Oval" fill="#FF0000"></path>
        <circle id="Oval" fill="#4F00FF" cx="125" cy="310" r="10"></circle>
        <rect id="Rectangle" fill="#FF0000" x="302" y="341" width="20" height="106"></rect>
        <rect id="Rectangle" fill="#FF0000" x="302" y="491" width="20" height="104"></rect>
        <rect id="Rectangle" fill="#FF0000" x="670" y="628" width="20" height="34"></rect>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="125" cy="216" r="9.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="495" cy="216" r="9.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="682" cy="216" r="9.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="682" cy="216" r="9.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="312" cy="245" r="9.5"></circle>
        <path d="M125.091792,216 C123.092773,226.666667 153.744387,232 217.046632,232 C280.348877,232 312,236.333333 312,245" id="Path-23" stroke="#979797"></path>
        <path d="M495,216 C494.333333,226.666667 463.666667,232 403,232 C342.333333,232 312,236.333333 312,245" id="Path-14" stroke="#979797"></path>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="865" cy="216" r="9.5"></circle>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="1052" cy="216" r="9.5"></circle>
        <path d="M312,245 C312,235.666667 404.333333,231 589,231 C773.666667,231 866,226 866,216" id="Path-16" stroke="#979797"></path>
        <line x1="321.5" y1="393.5" x2="495" y2="394" id="Path-17" stroke="#979797"></line>
        <text id="dispatchEvent" fill="#000000" transform="translate(972.500000, 579.000000) rotate(23.000000) translate(-972.500000, -579.000000) " font-family="CourierNewPS-ItalicMT, Courier New" font-size="12" font-style="italic" font-weight="normal">
            <tspan x="918" y="582">dispatchEvent</tspan>
        </text>
        <path d="M1062,624 C1062,618.477153 1057.52285,614 1052,614 C1046.47715,614 1042,618.477153 1042,624 L1062,624 Z" id="Oval" fill="#FF0000"></path>
        <line x1="322.5" y1="543.5" x2="865" y2="544" id="Path-17" stroke="#979797"></line>
        <line x1="865" y1="544" x2="1052" y2="623" id="Path-18" stroke="#979797"></line>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="495" cy="394" r="4.5"></circle>
        <rect id="Rectangle" stroke="#979797" x="186.5" y="341.5" width="895" height="132"></rect>
        <rect id="Rectangle" stroke="#979797" x="186.5" y="491.5" width="895" height="132"></rect>
        <rect id="Rectangle" stroke="#979797" x="181.5" y="336.5" width="905" height="292"></rect>
        <rect id="Rectangle" fill="#FF0000" x="1042" y="628" width="20" height="34"></rect>
        <circle id="Oval" stroke="#979797" fill="#D8D8D8" cx="865" cy="544" r="4.5"></circle>
        <line x1="126" y1="216.5" x2="125.5" y2="249" id="Path-19" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="312.5" y1="245" x2="312.5" y2="300" id="Path-19" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="496" y1="216.5" x2="495.5" y2="336" id="Path-19" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="495.5" y1="342" x2="495.5" y2="389" id="Path-20" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="683" y1="216.5" x2="682.5" y2="336" id="Path-21" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="682.5" y1="341" x2="682.5" y2="473" id="Path-22" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="865" y1="216.5" x2="865.5" y2="336" id="Path-19" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="1053" y1="216.5" x2="1052.5" y2="336" id="Path-21" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="1052.5" y1="491" x2="1052.5" y2="623" id="Path-22" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="865.5" y1="492" x2="865.5" y2="539" id="Path-20" stroke="#979797" stroke-dasharray="5"></line>
        <line x1="495" y1="216.5" x2="682" y2="216.5" id="Path-15" stroke="#979797"></line>
        <line x1="865" y1="216.5" x2="1052" y2="216.5" id="Path-15" stroke="#979797"></line>
        <path d="M125,300.5 C187.666667,287.833333 219,287.833333 219,300.5 C219,313.166667 250,313.166667 312,300.5 L312,319.5 C250,332.166667 219,332.166667 219,319.5 C219,306.833333 187.666667,307.166667 125,320.5 L125,300.5 Z" id="Path-12" fill="#4F00FF"></path>
        <circle id="Oval" fill="#FF0000" cx="312" cy="310" r="10"></circle>
        <rect id="Rectangle" fill="#FF0000" x="302" y="309" width="20" height="28"></rect>
    </g>
</svg>`
)}

function _3(md){return(
md`Sometimes we want control the dataflow with logic. If we have a cell called *data* streaming values, we might like to direct those updates to either *cell_1* or *cell_2*.
`
)}

function* _data(Promises)
{
  while (true) {
    yield Promises.delay(300, Math.random());
  }
}


function _5(md){return(
md`You can programatically trigger dataflow by calling *dispatchEvent* on its enclosing view. `
)}

function _switch_(choice,$0,data,Event,$1)
{
  if (choice === "cell_1") {
    $0.value = data;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (choice === "cell_2") {
    $1.value = data;
    $1.dispatchEvent(new Event("input", { bubbles: true }));
  }
}


function _7(md){return(
md`You can create a lightweight view with \`Inputs.input\`
`
)}

function _cell_1(Inputs){return(
Inputs.input(undefined)
)}

function _9(cell_1){return(
cell_1
)}

function _cell_2(Inputs){return(
Inputs.input(undefined)
)}

function _11(cell_2){return(
cell_2
)}

function _12(md){return(
md`Now dataflow is guided by the value of the *choice* variable.
`
)}

function _choice(Inputs){return(
Inputs.select(["cell_1", "cell_2"], {
  label: "Choose where to dataflow"
})
)}

function _14(md){return(
md`I hope you find that useful and that you find other useful ways to manipulate dataflow!
`
)}

function _15(md){return(
md`### Addendum

*Switch* reevaluates when *choice* changes, so you get an extra dataflow event for the act of choosing. This might not be what you want, so an alternative is to reference the *value* through its owning *view* to avoid dataflow being triggered.

~~~js
switch = {
  if (viewof choice.value === "cell_1") {
    ...
  }
  ...
}
~~~
`
)}

function _17(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["width","htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("data")).define("data", ["Promises"], _data);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("switch_")).define("switch_", ["choice","viewof cell_1","data","Event","viewof cell_2"], _switch_);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof cell_1")).define("viewof cell_1", ["Inputs"], _cell_1);
  main.variable(observer("cell_1")).define("cell_1", ["Generators", "viewof cell_1"], (G, _) => G.input(_));
  main.variable(observer()).define(["cell_1"], _9);
  main.variable(observer("viewof cell_2")).define("viewof cell_2", ["Inputs"], _cell_2);
  main.variable(observer("cell_2")).define("cell_2", ["Generators", "viewof cell_2"], (G, _) => G.input(_));
  main.variable(observer()).define(["cell_2"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof choice")).define("viewof choice", ["Inputs"], _choice);
  main.variable(observer("choice")).define("choice", ["Generators", "viewof choice"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _17);
  return main;
}
