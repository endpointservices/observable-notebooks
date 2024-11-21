function _1(md){return(
md`# Notebook style

The aim of this notebook is to find a style that works when [embedded](https://observablehq.com/embed/f41b469f08f72eec).

- Fluid typography
- Centered content
- Reflects cell layout
- Works in Observable editor * embedded on desktop and mobile`
)}

function _2(md){return(
md`This is a different cell`
)}

function _3(md){return(
md`### 3rd cells
shading is different`
)}

function _4(htl){return(
htl.html`<style>
  body {
    background: #FFF;  /* fallback for old browsers */
    margin-left: 0px;
    margin-right: 0px;
    font-size: 4vw;
    --contentWidth: 90vw;
  }
  @media (min-width: 1200px) {
    .observablehq {
      --contentWidth: 1140px;
    }
  }
  @media (min-width: 992px) {
    body {
      font-size: 1rem;
    }
    .observablehq {
      --contentWidth: 960px;
    }
  }
  .observablehq {
    background: lightcoral;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0.5rem max(2rem, 60vw - var(--contentWidth) / 2);
    font-family: "Arial";
  }
  .observablehq h1 {
    font-family: "Impact";
  }
  .observablehq:nth-child(2n + 1) {
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .observablehq:nth-child(2n + 2) {
    background: #ECE9E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
</stlye>`
)}

function _5(md){return(
md`### Foobar`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["htl"], _4);
  main.variable(observer()).define(["md"], _5);
  return main;
}
