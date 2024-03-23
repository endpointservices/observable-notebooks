import define1 from "./266a02d4ca20abc2@469.js";

async function _1(md,getCurrentPinnedName){return(
md`# TOC

This notebook can generate a table of contents automatically for your notebook.

\`\`\`js
import {toc} from "${await getCurrentPinnedName()}"
\`\`\`

Here are some examples:`
)}

function _2(toc){return(
toc({ selector: "h2,h3,h4,h5,h6", heading: "Jump to:" })
)}

function _3(toc){return(
toc({ selector: "h2" })
)}

function _4(md){return(
md`## Implementation`
)}

function _toc(Generators,html,DOM,MutationObserver){return(
function toc(config) {
  const selector = config && config.selector ? config.selector : "h1,h2,h3,h4,h5,h6";
  const heading = config && config.heading ? config.heading : "Table of Contents";
  return Generators.observe(notify => {
    let headings = [];

    function observed() {
      const minSelector = Math.min(...selector.split(",").map(d => +d.replace("h", "")));
      const h = Array.from(document.querySelectorAll(selector));
      if (h.length !== headings.length || h.some((h, i) => headings[i] !== h)) {
        notify(html`<b>${heading}</b><ul>${Array.from(headings = h, h => {
          const level = parseInt(h.tagName.slice(1));
          return Object.assign(
            html`${level > minSelector ? '<ul>'.repeat(level - minSelector) + '<li>' : '<li>'}<a href=#${h.id}>${DOM.text(h.textContent)}`,
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

function _6(md){return(
md`## Hooray

It worked!`
)}

function _7(md){return(
md`### This is a sub-section`
)}

function _8(md){return(
md`A little text`
)}

function _9(md){return(
md`#### A sub-sub-section?`
)}

function _10(md){return(
md`##### A sub-sub-sub-section?`
)}

function _11(md){return(
md`###### A sub-sub-sub-sub-section! (h6!)`
)}

function _12(md){return(
md`### Another sub-section`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","getCurrentPinnedName"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["toc"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("toc")).define("toc", ["Generators","html","DOM","MutationObserver"], _toc);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  const child1 = runtime.module(define1);
  main.import("getCurrentPinnedName", child1);
  return main;
}
