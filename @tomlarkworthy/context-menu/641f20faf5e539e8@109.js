import define1 from "./28f8c7a27c25783f@2238.js";

function _1(md){return(
md`# Context Menu

Adding a cell menu for editor discoverability`
)}

function _default_menu(context_menu,Inputs,focusEditor,createCell,deleteCell){return(
context_menu(
  [
    Inputs.button("✍️", {
      reduce: () => {
        focusEditor();
      }
    }),
    Inputs.button("+", {
      reduce: () => {
        createCell();
        focusEditor();
      }
    }),
    Inputs.button("🗑️", {
      reduce: () => {
        deleteCell();
      }
    })
  ],
  { this: this }
)
)}

function _3($0){return(
$0
)}

function _context_menu(htl,getComputedStyle,picked_dom,ResizeObserver){return(
(items, { this: thisArg } = {}) => {
  const menu =
    thisArg ||
    htl.html`<div onclick=${(e) => e.stopPropagation()}
      style="position: fixed; align-items: stretch; z-index: 999; width: 85px; display: flex;">
      ${items}</div>`;

  function positionMenu(target, menu) {
    const rect = target.getBoundingClientRect();
    const menuWidth = menu.offsetWidth;
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.right - menuWidth + window.scrollX}px`;
  }

  // Get nearest scrollable ancestor
  function getScrollParent(el) {
    while (el.parentElement) {
      const style = getComputedStyle(el.parentElement);
      if (/auto|scroll/.test(style.overflow + style.overflowY))
        return el.parentElement;
      el = el.parentElement;
    }
    return window;
  }

  if (picked_dom) {
    positionMenu(picked_dom, menu);
    const scrollParent = getScrollParent(picked_dom);
    scrollParent.addEventListener("scroll", () =>
      positionMenu(picked_dom, menu)
    );
    window.addEventListener("resize", () => positionMenu(picked_dom, menu));
    if (window.ResizeObserver) {
      new ResizeObserver(() => positionMenu(picked_dom, menu)).observe(
        picked_dom
      );
    }
  }
  return menu;
}
)}

function _6(editor_jobs){return(
editor_jobs
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("default_menu")).define("default_menu", ["context_menu","Inputs","focusEditor","createCell","deleteCell"], _default_menu);
  main.variable(observer()).define(["viewof editor"], _3);
  main.variable(observer("context_menu")).define("context_menu", ["htl","getComputedStyle","picked_dom","ResizeObserver"], _context_menu);
  const child1 = runtime.module(define1);
  main.import("viewof editor", child1);
  main.import("editor", child1);
  main.import("picked_dom", child1);
  main.import("focusEditor", child1);
  main.import("createCell", child1);
  main.import("deleteCell", child1);
  main.import("editor_jobs", child1);
  main.variable(observer()).define(["editor_jobs"], _6);
  return main;
}
