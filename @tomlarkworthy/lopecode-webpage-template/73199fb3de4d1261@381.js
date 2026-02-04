import define1 from "./f6282eaf525a00db@2418.js";
import define2 from "./03dda470c56b93ff@8395.js";
import define3 from "./28f8c7a27c25783f@2238.js";
import define4 from "./e1c39d41e8e944b0@939.js";
import define5 from "./62b9866907f960f0@235.js";

function _header(visualizer,runtime,Inspector,invalidation,symbolCellIndexes,headerEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: (v, i) => i < symbolCellIndexes[headerEndDelimiter],
  classList: "header"
})
)}

function _2(md){return(
md`# Moldable Webpage (prototype)

(there is a better one [here](https://observablehq.com/@tomlarkworthy/moldable-webpage) now)`
)}

function _headerEndDelimiter(){return(
Symbol()
)}

function _left_sidebar(visualizer,runtime,Inspector,invalidation,symbolCellIndexes,headerEndDelimiter,leftSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: (v, i) =>
    i > symbolCellIndexes[headerEndDelimiter] &&
    i < symbolCellIndexes[leftSidebarEndDelimiter],
  classList: "sidebar left"
})
)}

function _sidebar(md){return(
md`## Left sidebar`
)}

function _7(md){return(
md`source on [observablehq.com](https://observablehq.com/@tomlarkworthy/lopecode-webpage-template)`
)}

function _leftSidebarEndDelimiter(){return(
Symbol()
)}

function _right_sidebar(visualizer,runtime,Inspector,invalidation,symbolCellIndexes,leftSidebarEndDelimiter,rightSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: (v, i) =>
    i > symbolCellIndexes[leftSidebarEndDelimiter] &&
    i < symbolCellIndexes[rightSidebarEndDelimiter],
  classList: "sidebar right"
})
)}

function _10(md){return(
md`## Right sidebar`
)}

function _11(md){return(
md`template on [observablehq.com](https://observablehq.com/@tomlarkworthy/lopecode-webpage-template)`
)}

function _12(md){return(
md`## [Editor](https://observablehq.com/@tomlarkworthy/cell-editor)`
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`## [Exporter](https://observablehq.com/@tomlarkworthy/exporter)`
)}

function _15(exporter){return(
exporter({ headless: true })
)}

function _base_style(md){return(
md`<style>

  :root {
    --sidebar-size: 18rem;
  }
  .header {
    background-color: #f1f1f1;
  }
  .sidebar {
    width: var(--sidebar-size);
    background-color: #f1f1f1;
  }
  .content {
    max-width: calc(100vw - 2 * var(--sidebar-size));
  };
</style>`
)}

function _17(visualizer,runtime,minicellInto,invalidation){return(
visualizer(runtime, {
  inspector: minicellInto,
  invalidation
})
)}

function _rightSidebarEndDelimiter(){return(
Symbol()
)}

function _content(visualizer,runtime,Inspector,invalidation,symbolCellIndexes,rightSidebarEndDelimiter,contentEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: (v, i) =>
    i > symbolCellIndexes[rightSidebarEndDelimiter] &&
    i < symbolCellIndexes[contentEndDelimiter],
  classList: "content"
})
)}

function _20(md){return(
md`# Content

This webpage is a computational notebook that you can
- edit reactively
- download and use offline.
- upload to your own server

The underlying reactivity engine is [observablehq/runtime](https://github.com/observablehq/runtime). This implies
- the page executes unminified Javascript.
- you can use the browser's devtools.
- you can import from the npm ecosystem.
- you can implement complex programs.

`
)}

function _21(md){return(
md`## TODO

- Add cell should go to content page
- Minimap to see all cells
- Better retro theme look
- Drag cells across areas
- responsive design`
)}

function _contentEndDelimiter(){return(
Symbol()
)}

function _footerEndDelimiter(){return(
Symbol()
)}

function _apply_layout(location,html,content,header,right_sidebar,left_sidebar)
{
  console.log("apply_layout");
  if (
    location.href.includes("observableusercontent.com") &&
    !location.href.includes("blob:")
  )
    return "Layout not applied when hosted on Observable";
  const style = html`<style>
  :root {
    --header-size: 10rem;
  }
  .header {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: var(--header-size);
  }
  .sidebar {
    top: 10rem;
    position: fixed;
    height: 100%;
    overflow: auto;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .content {
    margin-top: var(--header-size);
    margin-left: auto;
    margin-right: auto;
  };
</style>`;
  debugger;
  document.body.appendChild(content);
  document.body.appendChild(header);
  document.body.appendChild(right_sidebar);
  document.body.appendChild(left_sidebar);
  document.body.appendChild(style);
}


function _25(location){return(
location.href
)}

function _symbolCellIndexes(cells)
{
  const indexes = {};
  let i = 0;
  cells.forEach((variables, name) => {
    if (typeof variables[0]._value == "symbol") {
      indexes[variables[0]._value] = i;
    }
    i++;
  });
  return indexes;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("header")).define("header", ["visualizer","runtime","Inspector","invalidation","symbolCellIndexes","headerEndDelimiter"], _header);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("headerEndDelimiter")).define("headerEndDelimiter", _headerEndDelimiter);
  main.variable(observer("left_sidebar")).define("left_sidebar", ["visualizer","runtime","Inspector","invalidation","symbolCellIndexes","headerEndDelimiter","leftSidebarEndDelimiter"], _left_sidebar);
  main.variable(observer("sidebar")).define("sidebar", ["md"], _sidebar);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("leftSidebarEndDelimiter")).define("leftSidebarEndDelimiter", _leftSidebarEndDelimiter);
  main.variable(observer("right_sidebar")).define("right_sidebar", ["visualizer","runtime","Inspector","invalidation","symbolCellIndexes","leftSidebarEndDelimiter","rightSidebarEndDelimiter"], _right_sidebar);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["viewof editor"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["exporter"], _15);
  main.variable(observer("base_style")).define("base_style", ["md"], _base_style);
  main.variable(observer()).define(["visualizer","runtime","minicellInto","invalidation"], _17);
  main.variable(observer("rightSidebarEndDelimiter")).define("rightSidebarEndDelimiter", _rightSidebarEndDelimiter);
  main.variable(observer("content")).define("content", ["visualizer","runtime","Inspector","invalidation","symbolCellIndexes","rightSidebarEndDelimiter","contentEndDelimiter"], _content);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("contentEndDelimiter")).define("contentEndDelimiter", _contentEndDelimiter);
  main.variable(observer("footerEndDelimiter")).define("footerEndDelimiter", _footerEndDelimiter);
  main.variable(observer("apply_layout")).define("apply_layout", ["location","html","content","header","right_sidebar","left_sidebar"], _apply_layout);
  main.variable(observer()).define(["location"], _25);
  main.variable(observer("symbolCellIndexes")).define("symbolCellIndexes", ["cells"], _symbolCellIndexes);
  const child1 = runtime.module(define1);
  main.import("visualizer", child1);
  main.import("Inspector", child1);
  main.import("allVariables", child1);
  main.import("cells", child1);
  const child2 = runtime.module(define2);
  main.import("exporter", child2);
  const child3 = runtime.module(define3);
  main.import("viewof editor", child3);
  main.import("editor", child3);
  const child4 = runtime.module(define4);
  main.import("runtime", child4);
  main.import("main", child4);
  const child5 = runtime.module(define5);
  main.import("into", "minicellInto", child5);
  main.import("style", "minicellStyle", child5);
  return main;
}
