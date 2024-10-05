// https://observablehq.com/@tomlarkworthy/blm-us-wealth@314
import define1 from "./11a5ab8b1b3a51db@1161.js";

function _1(md){return(
md`# Black Lives Matter: Wealth share in the US

_"You’ve been waiting for the crumbs to fall off the white man’s table"_ - Malcolm X, 1965

`
)}

function _gfx(svg,width)
{
  const dw = 8;
  const dh = 6.5;
  const padding = 1;
  const mh = padding + (dh-padding*2)/2 + 0.3;
  const overlapx = 1.36 + 2.55 - 3.21; 
  const mx = 5.33
  const ad = 1.04
  const atop = mh - ad
  const abot = mh + ad
  return svg`<svg viewBox="0 0 ${dw} ${dh}" width="${Math.min(width, 640)}px">
    <style>
      svg text {
        font-size: 0.02em;
        fill: black;
      }
    </style>
    <rect width=${dw} height=${dh} fill="black" />
    <circle fill="white" r="2.55" cy=${mh} cx=${3} />
    <circle fill="white" r="1.36" cy=${mh} cx=${3 + 3.21} />
    <path d="M ${mx} ${abot} A 3.21 3.21 0 0 0 ${mx} ${atop} A 1.36 1.36 0 0 0 ${mx} ${abot} z" fill="black"/>
    <text x=${3} y=${mh} text-anchor="middle">white wealth</text>
    <text x=${3 + 3.21} y=${mh} text-anchor="middle">
      <tspan x=${3 + 3.21} dy="-0.6em">white</tspan>
      <tspan x=${3 + 3.21} dy="1.2em">lives</tspan>
    </text>
    <text x=0.5 y=0.6 style="fill:white" >2019 US Wealth and Demographics</text>

    <path d="M ${mx} ${mh + 0.5} L ${mx + 0.6} 5.4" stroke="white" stroke-width="0.03" stroke-linecap="round" />

    <text x=6 y=5.5 style="fill:white" >
      <tspan>Black wealth</tspan>
      <tspan x=6 dy="1.2em">Black lives</tspan>
    </text>
  </svg>`
}


function _3(md){return(
md`

While things have improved since Malcolm X's days, as this graphic shows, _there is still_ serious wealth imbalances which puts the black community in a disadvantaged position for capturing compounding wealth. 


Economy: Black 4% of US wealth ($4.6 trillion), White (84% $94 trillion) 2019
Demographics: Black (13.4%), White (76.3%)

Checkout [W.E.B. Du Bois'](https://www.smithsonianmag.com/history/first-time-together-and-color-book-displays-web-du-bois-visionary-infographics-180970826/) iconic racial infographics for other insights.`
)}

function _4(md){return(
md`### Calculations`
)}

function _5(md){return(
md`

[source](
https://www.brookings.edu/blog/up-front/2020/12/08/the-black-white-wealth-gap-left-black-households-more-vulnerable/)
`
)}

function _black_white_wealth_ratio(){return(
4.6 / (4.6 + 94)
)}

function _black_white_deomgraphic_ratio(){return(
0.134 / (0.134 + 0.783)
)}

function _normalized_wealth_pie(black_white_wealth_ratio){return(
(1 - black_white_wealth_ratio) / black_white_wealth_ratio
)}

function _normalized_deomgraphic_pie(black_white_deomgraphic_ratio){return(
(1 - black_white_deomgraphic_ratio) / black_white_deomgraphic_ratio
)}

function _10(md){return(
md`[Area accurate Venn diagram](https://observablehq.com/@omnizach/accurate-area-venn-diagram) by Zach Young`
)}

function _11(FileAttachment){return(
FileAttachment("image@1.png").image()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/e2f4863cfab6d92e396a34e09b566749c26bc966d92f4d6508c67669f0d1d27a1d476919788846ecbc5a82a1b195a9fa2170edc27de77676fba172bd57c97b26.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("gfx")).define("gfx", ["svg","width"], _gfx);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("black_white_wealth_ratio")).define("black_white_wealth_ratio", _black_white_wealth_ratio);
  main.variable(observer("black_white_deomgraphic_ratio")).define("black_white_deomgraphic_ratio", _black_white_deomgraphic_ratio);
  main.variable(observer("normalized_wealth_pie")).define("normalized_wealth_pie", ["black_white_wealth_ratio"], _normalized_wealth_pie);
  main.variable(observer("normalized_deomgraphic_pie")).define("normalized_deomgraphic_pie", ["black_white_deomgraphic_ratio"], _normalized_deomgraphic_pie);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["FileAttachment"], _11);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  main.import("svg", child1);
  return main;
}
