// https://observablehq.com/@bryangingechen/toc@91
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# TOC

This notebook can generate a table of contents automatically for your notebook.

\`\`\`js
import {toc} from "@bryangingechen/toc"
\`\`\`

Here’s an example:`
)});
  main.variable(observer()).define(["toc"], function(toc){return(
toc()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Implementation`
)});
  main.variable(observer("toc")).define("toc", ["Generators","html","DOM","MutationObserver"], function(Generators,html,DOM,MutationObserver){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Hooray

It worked!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### This is a sub-section`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`A little text`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### A sub-sub-section?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### A sub-sub-sub-section?`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`###### A sub-sub-sub-sub-section! (h6!)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Another sub-section`
)});
  return main;
}
