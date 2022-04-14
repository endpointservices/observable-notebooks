// https://observablehq.com/@bryangingechen/toc@91
function _1(md){return(
md`# TOC

This notebook can generate a table of contents automatically for your notebook.

\`\`\`js
import {toc} from "@bryangingechen/toc"
\`\`\`

Here’s an example:`
)}

function _2(toc){return(
toc()
)}

function _3(md){return(
md`## Implementation`
)}

function _toc(Generators,html,DOM,MutationObserver){return(
function toc(selector = "h1,h2,h3,h4,h5,h6") {
  return Generators.observe(notify => {
    let headings = [];

    function observed() {
      const h = Array.from(document.querySelectorAll(selector));
      if (h.length !== headings.length || h.some((h, i) => headings[i] !== h)) {
        notify(html`<b>Table of Contents</b><ul>${Array.from(headings = h, h => {
          const level = parseInt(h.tagName.slice(1));
          return Object.assign(
            html`${level > 1 ? '<ul>'.repeat(level-1) + '<li>' : '<li>'}<a href=#${h.id}>${DOM.text(h.textContent)}`,
            {onclick: e => (e.preventDefault(), h.scrollIntoView())}
          );
        })}`);
      }
    }

    const observer = new MutationObserver(observed);
    observer.observe(document.body, {childList: true, subtree: true});
    observed();
    return () => observer.disconnect();
  });
}
)}

function _5(md){return(
md`## Hooray

It worked!`
)}

function _6(md){return(
md`### This is a sub-section`
)}

function _7(md){return(
md`A little text`
)}

function _8(md){return(
md`#### A sub-sub-section?`
)}

function _9(md){return(
md`##### A sub-sub-sub-section?`
)}

function _10(md){return(
md`###### A sub-sub-sub-sub-section! (h6!)`
)}

function _11(md){return(
md`### Another sub-section`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("toc")).define("toc", ["Generators","html","DOM","MutationObserver"], _toc);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  return main;
}
