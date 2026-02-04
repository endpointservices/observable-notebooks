import define1 from "./95647fc7733e3482@86.js";
import define2 from "./f6282eaf525a00db@2418.js";
import define3 from "./03dda470c56b93ff@8395.js";
import define4 from "./28f8c7a27c25783f@2238.js";
import define5 from "./e1c39d41e8e944b0@939.js";
import define6 from "./62b9866907f960f0@235.js";

function _page(isOnObservableCom,htl){return(
htl.html`<div style="height: ${isOnObservableCom() ? '800px' : '100vh'}">
  <h1 style="display:none;">Moldable Webpage (prototype II)</h1>
</div>`
)}

function _page_style_css(htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Patrick+Hand&display=swap');
  
  :root {
    --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --hand-written: "Patrick Hand";
  }
  body {
    max-width: none;
  }
  html {
    font-family: var(--system-ui);
  } 
  h1, h2 {
    font-family: var(--hand-written);
    font-weight: bold;
    color: #84DCCF;
  }
  h1 {
    font-size: 2rem;
  }
  pre, code, tt {
    color: white;
    background-color: black;
  }
  /* Hide the section deliminators */
  .lope-viz .observablehq:last-child {
    display: none;
  }
  .sidebar .minicell {
    font-family: --monospace-font;
    margin-left: 1rem;
  }
  .minimap {
    border: 1px solid #84DCCF;
  }
  .lope-viz {
    padding-right: 0.25rem;
    padding-left: 0.25rem;
  }
  .lope-viz .observablehq {
    margin: 0.5rem
  }
  /* Bug fix: invisible lm_close_tab even with showCloseIcon: false was closing tabs */
  .lm_close_tab, .lm_close { 
    display: none
  }
  .fire_text {
    background: linear-gradient(-45deg, #fa0000, #d3dd46, #f47f1f, #d561ff);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient 1s ease infinite;
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 50% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
</style>`
)}

function _lopeviz_handle_css_ref(lopeviz_handle_css){return(
lopeviz_handle_css
)}

function _minicellStyle_ref(minicellStyle){return(
minicellStyle
)}

function _base_css_ref(base_css){return(
base_css
)}

function _light_theme_css_ref(light_theme_css){return(
light_theme_css
)}

function _default_mobile(){return(
{
  settings: {
    showMaximiseIcon: false,
    showPopoutIcon: false,
    showCloseIcon: true,
    hasHeaders: true
  },
  content: [
    {
      type: "column",
      content: [
        {
          type: "stack",
          content: [
            {
              type: "component",
              title: "title",
              componentName: "panel",
              componentState: { label: "header" }
            },
            {
              type: "component",
              title: "nav",
              componentName: "panel",
              componentState: { label: "left_sidebar" }
            },
            {
              type: "component",
              title: "edit",
              componentName: "panel",
              componentState: { label: "right_sidebar" }
            }
          ],
          height: 10
        },
        {
          type: "row",
          content: [
            {
              type: "component",
              title: "content",
              componentName: "panel",
              componentState: { label: "content" }
            }
          ]
        }
      ]
    }
  ]
}
)}

function _default_desktop(){return(
{
  settings: {
    showMaximiseIcon: false,
    showPopoutIcon: false,
    showCloseIcon: true,
    hasHeaders: true
  },
  content: [
    {
      type: "column",
      content: [
        {
          type: "component",
          title: "title",
          componentName: "panel",
          componentState: { label: "header" },
          height: 5
        },
        {
          type: "row",
          content: [
            {
              type: "component",
              title: "nav",
              componentName: "panel",
              componentState: { label: "left_sidebar" },
              width: 15
            },
            {
              title: "content",
              type: "component",
              componentName: "panel",
              componentState: { label: "content" },
              width: 60
            },
            {
              type: "component",
              title: "edit",
              componentName: "panel",
              componentState: { label: "right_sidebar" },
              width: 25
            }
          ]
        }
      ]
    }
  ]
}
)}

function _config(is_mobile,default_mobile,default_desktop){return(
is_mobile ? default_mobile : default_desktop
)}

function _is_mobile(width){return(
width < 800
)}

function _layout_state(layout,$0,gl){return(
layout.on(
  "stateChanged",
  () => ($0.value = gl.LayoutConfig.fromResolved(layout.toConfig()))
)
)}

function _layout(gl,$0,page,panel,invalidation)
{
  const layout = new gl.GoldenLayout($0.value, page);
  layout.registerComponent("panel", panel);
  layout.init();
  invalidation.then(() => layout.destroy()); // avoid layouts stacking up
  return layout;
}


function _panel(header,content,left_sidebar,right_sidebar){return(
function (container, component) {
  let node = undefined;
  if (component.label == "header") {
    node = header;
  } else if (component.label == "content") {
    node = content;
  } else if (component.label == "left_sidebar") {
    node = left_sidebar;
  } else if (component.label == "right_sidebar") {
    node = right_sidebar;
  } else if (component.label == "footer") {
    //node = footer;
  }

  // maintain scroll position in the state
  const c_element = container.getElement();
  const element = c_element.appendChild(node);
  debugger;
  container.on("open", () => {
    // Ugly this requires 2 animation frames to settle :/
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // actually needs 3 for mobile :s
          if (component.scrollTop) c_element.scrollTop = component.scrollTop;
          if (component.scrollLeft) c_element.scrollLeft = component.scrollLeft;
        });
      });
    });
  });
  c_element.addEventListener("scroll", (event) => {
    container.extendState({
      scrollTop: c_element.scrollTop,
      scrollLeft: c_element.scrollLeft
    });
  });
}
)}

function _isOnObservableCom(location){return(
() => location.href.includes("observableusercontent.com") &&
    !location.href.includes("blob:")
)}

function _apply_layout(isOnObservableCom,base_css,light_theme_css,page_style_css,lopeviz_handle_css,minicellStyle,page)
{
  console.log("apply_layout");
  if (isOnObservableCom())
    return "Layout not applied when hosted on Observable";

  document.body.appendChild(base_css);
  document.body.appendChild(light_theme_css);
  document.body.appendChild(page_style_css);
  document.body.appendChild(lopeviz_handle_css);
  document.body.appendChild(minicellStyle);
  document.body.appendChild(page);
}


function _headerStartDelimiter(){return(
Symbol()
)}

function _header(visualizer,runtime,Inspector,invalidation,between,headerStartDelimiter,headerEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(headerStartDelimiter, headerEndDelimiter),
  classList: "header"
})
)}

function _title(md){return(
md`# Moldable Webfile (prototype II)`
)}

function _headerEndDelimiter(){return(
Symbol()
)}

function _left_sidebar(visualizer,runtime,Inspector,invalidation,between,headerEndDelimiter,leftSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(headerEndDelimiter, leftSidebarEndDelimiter),
  classList: "sidebar left"
})
)}

function _sidebar(md){return(
md`## Links`
)}

function _links_list(md){return(
md`source on [observablehq.com](https://observablehq.com/@tomlarkworthy/moldable-webpage)

replicated to [Github](https://github.com/tomlarkworthy/lopecode)

hosted on [Moldable.app](https://tomlarkworthy.moldable.app/webpage.html)

🦋 [@larkworthy.bsky.social](https://bsky.app/profile/larkworthy.bsky.social)`
)}

function _links_description(md){return(
md`## Main cells

includes all cells in the main module including those not in page panels.`
)}

function _minimap(visualizer,runtime,minicellInto,invalidation){return(
visualizer(runtime, {
  inspector: minicellInto,
  invalidation,
  detachNodes: false,
  classList: "minimap"
})
)}

function _leftSidebarEndDelimiter(){return(
Symbol()
)}

function _right_sidebar(visualizer,runtime,Inspector,invalidation,between,leftSidebarEndDelimiter,rightSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(leftSidebarEndDelimiter, rightSidebarEndDelimiter),
  classList: "sidebar right"
})
)}

function _exporter_header(md){return(
md`## [Export](https://observablehq.com/@tomlarkworthy/exporter)`
)}

function _exporter_ref(exporter){return(
exporter({ headless: true })
)}

function _editor_header(md){return(
md`## [Edit](https://observablehq.com/@tomlarkworthy/cell-editor)`
)}

function _editor_view($0){return(
$0
)}

function _rightSidebarEndDelimiter(){return(
Symbol()
)}

function _content(visualizer,runtime,Inspector,invalidation,between,rightSidebarEndDelimiter,contentEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(rightSidebarEndDelimiter, contentEndDelimiter),
  classList: "content"
})
)}

function _intro(md){return(
md`# Decentralised Webfile Development

⚠️ This is out-of-date and half broken. The latest iteration is the [moldable-index](https://observablehq.com/@tomlarkworthy/moldable-index)

This webpage looks kinda vanilla but it is <span class="fire_text">**different**</span>.

First, it contains a live coding runtime, something analogous to a spreadsheet (the [observablehq/runtime](https://github.com/observablehq/runtime)). When the code changes, it updates instantly. 

Second, it bundles its own code editor, so you can change the page from within. 

Third, the page can serialize itself _and_ all its dependancies into a single HTML that can be run from the local filesystem. Its truly serverless in the sense of not requiring a webserver (not even a local one). Its offline-first in the sense you don't need an internet connection to run the file (which is a simple double click from your filesystem).

The reactive runtime has the concept of modules, the software architecture is modular and assembled in userspace from orthogonal tools. [Editor](https://observablehq.com/@tomlarkworthy/editor) the cell editor. [Exporter](https://observablehq.com/@tomlarkworthy/exporter) the page serializer and [Visualizer](https://observablehq.com/@tomlarkworthy/visualizer) the cell renderer. You can add more tooling with importing from the [Observbalehq.com](https://observablehq.com/) ecosystem. There is actually an [AI](https://observablehq.com/@tomlarkworthy/robocoop) too, which helped write the complicated part, the ObservableJS compiler/decompiler [toolchain](https://observablehq.com/@tomlarkworthy/observablejs-toolchain).

Amazingly this is around 1MB in size, for an entirely self-hosted, self-sustainable, recursively exportable, offline-first, file-first, hermetic, web-based programming substrate.

This notebook is uploaded to [Github](https://github.com/tomlarkworthy/lopecode/blob/main/webpage.html) where it can be [served](https://tomlarkworthy.github.io/lopecode/webpage.html) directly using pages _without_ a build configuration.

I made this to see if it was possible to have a zero tooling rapid development platform. This is probably not that *yet*, this is a proof-of-concept. There are some userspace parts missing, for example, static file upload (Serializer can serialize FileAttachments, but there is no way in userspace to upload them yet - you have to do that on [observablehq.com](https://observablehq.com/)).`
)}

function _34(md){return(
md`# <span class="fire_text">[HYTRADBOI 2025?](https://www.hytradboi.com/2025)</span>

🤞 this is accepted for the online conference "Have You Tried Rubbing a Database On It" as an interesting programming language topic`
)}

function _instructions(md){return(
md`## How to use

You can drag cells around the page using the dotted square handle.

You can click a cell to get make it editable in the editor, or click it on the minimap on the left.

At the bottom of the editors cells chooser drop down is \`<new cell>\`. This will add a new cell underneath the last click one.

The header/sidepanel/content panels are resizable and dockable.

The exporter has a "preview" button which exports the page to an ephemeral tab, and a "download" which copies the whole thing including the latest modifications to an offline-file.

The editing experience is not there yet. Probably wiser to fork the [original Observable](https://observablehq.com/@tomlarkworthy/moldable-webpage) notebook if you seriously want to create a webpage.

Observable is a single linear list of cells, we map those to different panel sections using \`delimiter\` cells. It is possible to create cells outside those delimiters, and then they will not appear in a panel. The left sidepanel has a complete list of cells which are also draggable and clickable.`
)}

function _todo(md){return(
md`## TODO
- On mobile clicking the apply button loses the editor focus. We should refocus it automatically (editor)
- Editor does not load on safari :(`
)}

function _contentEndDelimiter(){return(
Symbol()
)}

function _footerEndDelimiter(){return(
Symbol()
)}

function _between(){return(
(symbolStart, symbolEnd) => (variable, index, state) => {
  if (variable._value === symbolStart) {
    state.between = true;
  } else if (variable._value === symbolEnd) {
    state.between = undefined;
  } else {
    return state.between;
  }
}
)}

function _imports(md){return(
md`## Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("page")).define("page", ["isOnObservableCom","htl"], _page);
  main.variable(observer("page_style_css")).define("page_style_css", ["htl"], _page_style_css);
  main.variable(observer("lopeviz_handle_css_ref")).define("lopeviz_handle_css_ref", ["lopeviz_handle_css"], _lopeviz_handle_css_ref);
  main.variable(observer("minicellStyle_ref")).define("minicellStyle_ref", ["minicellStyle"], _minicellStyle_ref);
  main.variable(observer("base_css_ref")).define("base_css_ref", ["base_css"], _base_css_ref);
  main.variable(observer("light_theme_css_ref")).define("light_theme_css_ref", ["light_theme_css"], _light_theme_css_ref);
  main.variable(observer("default_mobile")).define("default_mobile", _default_mobile);
  main.variable(observer("default_desktop")).define("default_desktop", _default_desktop);
  main.define("initial config", ["is_mobile","default_mobile","default_desktop"], _config);
  main.variable(observer("mutable config")).define("mutable config", ["Mutable", "initial config"], (M, _) => new M(_));
  main.variable(observer("config")).define("config", ["mutable config"], _ => _.generator);
  main.variable(observer("is_mobile")).define("is_mobile", ["width"], _is_mobile);
  main.variable(observer("layout_state")).define("layout_state", ["layout","mutable config","gl"], _layout_state);
  main.variable(observer("layout")).define("layout", ["gl","mutable config","page","panel","invalidation"], _layout);
  main.variable(observer("panel")).define("panel", ["header","content","left_sidebar","right_sidebar"], _panel);
  main.variable(observer("isOnObservableCom")).define("isOnObservableCom", ["location"], _isOnObservableCom);
  main.variable(observer("apply_layout")).define("apply_layout", ["isOnObservableCom","base_css","light_theme_css","page_style_css","lopeviz_handle_css","minicellStyle","page"], _apply_layout);
  main.variable(observer("headerStartDelimiter")).define("headerStartDelimiter", _headerStartDelimiter);
  main.variable(observer("header")).define("header", ["visualizer","runtime","Inspector","invalidation","between","headerStartDelimiter","headerEndDelimiter"], _header);
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("headerEndDelimiter")).define("headerEndDelimiter", _headerEndDelimiter);
  main.variable(observer("left_sidebar")).define("left_sidebar", ["visualizer","runtime","Inspector","invalidation","between","headerEndDelimiter","leftSidebarEndDelimiter"], _left_sidebar);
  main.variable(observer("sidebar")).define("sidebar", ["md"], _sidebar);
  main.variable(observer("links_list")).define("links_list", ["md"], _links_list);
  main.variable(observer("links_description")).define("links_description", ["md"], _links_description);
  main.variable(observer("minimap")).define("minimap", ["visualizer","runtime","minicellInto","invalidation"], _minimap);
  main.variable(observer("leftSidebarEndDelimiter")).define("leftSidebarEndDelimiter", _leftSidebarEndDelimiter);
  main.variable(observer("right_sidebar")).define("right_sidebar", ["visualizer","runtime","Inspector","invalidation","between","leftSidebarEndDelimiter","rightSidebarEndDelimiter"], _right_sidebar);
  main.variable(observer("exporter_header")).define("exporter_header", ["md"], _exporter_header);
  main.variable(observer("exporter_ref")).define("exporter_ref", ["exporter"], _exporter_ref);
  main.variable(observer("editor_header")).define("editor_header", ["md"], _editor_header);
  main.variable(observer("editor_view")).define("editor_view", ["viewof editor"], _editor_view);
  main.variable(observer("rightSidebarEndDelimiter")).define("rightSidebarEndDelimiter", _rightSidebarEndDelimiter);
  main.variable(observer("content")).define("content", ["visualizer","runtime","Inspector","invalidation","between","rightSidebarEndDelimiter","contentEndDelimiter"], _content);
  main.variable(observer("intro")).define("intro", ["md"], _intro);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("instructions")).define("instructions", ["md"], _instructions);
  main.variable(observer("todo")).define("todo", ["md"], _todo);
  main.variable(observer("contentEndDelimiter")).define("contentEndDelimiter", _contentEndDelimiter);
  main.variable(observer("footerEndDelimiter")).define("footerEndDelimiter", _footerEndDelimiter);
  main.variable(observer("between")).define("between", _between);
  main.variable(observer("imports")).define("imports", ["md"], _imports);
  const child1 = runtime.module(define1);
  main.import("gl", child1);
  main.import("base_css", child1);
  main.import("light_theme_css", child1);
  const child2 = runtime.module(define2);
  main.import("visualizer", child2);
  main.import("Inspector", child2);
  main.import("allVariables", child2);
  main.import("cellMaps", child2);
  main.import("lopeviz_handle_css", child2);
  const child3 = runtime.module(define3);
  main.import("exporter", child3);
  const child4 = runtime.module(define4);
  main.import("viewof editor", child4);
  main.import("editor", child4);
  const child5 = runtime.module(define5);
  main.import("runtime", child5);
  main.import("main", child5);
  const child6 = runtime.module(define6);
  main.import("into", "minicellInto", child6);
  main.import("style", "minicellStyle", child6);
  return main;
}
