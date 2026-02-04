import define1 from "./95647fc7733e3482@86.js";
import define2 from "./f6282eaf525a00db@2418.js";
import define3 from "./03dda470c56b93ff@8395.js";
import define4 from "./28f8c7a27c25783f@2238.js";
import define5 from "./641f20faf5e539e8@109.js";
import define6 from "./de3abeb05c4b090e@765.js";
import define7 from "./09fdee029150048c@446.js";
import define8 from "./e1c39d41e8e944b0@939.js";
import define9 from "./62b9866907f960f0@235.js";
import define10 from "./e627aaaaa9857257@1727.js";
import define11 from "./0b75dbddd18995dc@1765.js";
import define12 from "./98f34e974bb2e4bc@958.js";

function _page(isOnObservableCom,htl){return(
htl.html`<div style="height: ${isOnObservableCom() ? '800px' : '100vh'}">
  <h1 style="display:none;">Lopefile Homepage</h1>
</div>`
)}

function _content_item(layout){return(
layout.root
  .getAllContentItems()
  .find((ci) => ci.title == "content")
)}

function _3(selected_modules){return(
selected_modules
)}

function _sync_module_tabs(layout,unorderedSync,selected_modules,content_item)
{
  const module_items = layout.root
    .getAllContentItems()
    .filter((ci) => ci.componentName == "module_viz");
  const module_viz_diff = unorderedSync(
    selected_modules,
    module_items,
    (a, b) => a.name == b.title
  );
  module_viz_diff.add.forEach((moduleInfo) => {
    content_item.parent.addItem({
      type: "component",
      title: moduleInfo.name,
      componentName: "module_viz",
      componentState: {}
    });
  });
  module_viz_diff.remove.forEach((item) => {
    item.remove();
  });
}


function _module_viz(modules,visualizer,runtime,fix_scroll){return(
function (container, component) {
  debugger;
  const moduleInfo = [...modules.values()].find(
    (m) => m.name == container.title
  );
  const module = moduleInfo.module;
  const node = visualizer(runtime, {
    invalidation: new Promise((r) => {}),
    module,
    detachNodes: true
  });

  fix_scroll(container, component, node);
}
)}

function _fix_scroll(){return(
function (container, component, node) {
  // maintain scroll position in the state
  const c_element = container.getElement();
  const element = c_element.appendChild(node);
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

function _page_style_css(htl){return(
htl.html`<style>
  
  :root {
    --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --dark: #444;
    --dark-accent: #44b;
    --light: #fff;
    --light-shadow: #f9f9f9;
    --light-accent: #dd0;
  }
  .observablehq-root, body {
    max-width: none;
    background-color: var(--light-shadow);
    color: var(--dark);
    text-color: var(--dark);
  }
  .observablehq {
    margin: 0px;
    margin-bottom: 0.5rem;
    padding-right: 0rem;
    padding-left: 0rem;
    background-color: var(--light);
  }
  html {
    font-family: var(--system-ui);
  } 
  h1, h2 {
    font-family: var(--system-ui);
    font-weight: bold;
    color: var(--light);
    background-color: var(--dark-accent);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  h1 a[href],h2 a[href] {
    color: var(--light);
    text-decoration: underline;
  }
  h1 {
    padding-top: 1rem;
    font-size: 2rem;
  }
  h1, h2, h3, h4, h5, p {
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0px;
  }
  .sidebar p {
    padding-left: 0rem;
    padding-right: 0rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
  body .lope-viz .observablehq::after {
     border-color: var(--light-accent);
  }
  pre, code, tt {
    color: white;
    background-color: black;
  }
  .sidebar .minicell {
    font-family: --monospace-font;
  }
  .minimap {
    border: 1px solid #84DCCF;
  }
  .minimap {
    border: 1px solid #84DCCF;
  }
  body .minicell {
    background-color: var(--light) !important;
  }
  .lope-viz {
    padding-right: 0.25rem;
    padding-left: 0.25rem;
  }
  /* Bug fix: invisible lm_close_tab even with showCloseIcon: false was closing tabs */
  .lm_close_tab, .lm_close { 
    display: none
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
              title: "edit",
              componentName: "panel",
              componentState: { label: "right_sidebar" }
            },
            {
              type: "component",
              title: "nav",
              componentName: "panel",
              componentState: { label: "left_sidebar" }
            },
            {
              type: "component",
              title: "modules",
              componentName: "panel",
              componentState: { label: "module_sidebar" }
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
          type: "row",
          content: [
            {
              type: "stack",
              width: 18,
              content: [
                {
                  type: "component",
                  title: "nav",
                  componentName: "panel",
                  componentState: { label: "left_sidebar" }
                },
                {
                  type: "component",
                  title: "modules",
                  componentName: "panel",
                  componentState: { label: "module_sidebar" }
                }
              ]
            },
            {
              title: "content",
              type: "component",
              componentName: "panel",
              componentState: { label: "content" },
              width: 58
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

function _layout(gl,$0,page,panel,module_viz,invalidation)
{
  const layout = new gl.GoldenLayout($0.value, page);
  layout.registerComponent("panel", panel);
  layout.registerComponent("module_viz", module_viz);
  layout.init();
  invalidation.then(() => layout.destroy()); // avoid layouts stacking up
  return layout;
}


function _panel(content,left_sidebar,right_sidebar,module_sidebar,fix_scroll){return(
function (container, component) {
  let node = undefined;
  if (component.label == "content") {
    node = content;
  } else if (component.label == "left_sidebar") {
    node = left_sidebar;
  } else if (component.label == "right_sidebar") {
    node = right_sidebar;
  } else if (component.label == "module_sidebar") {
    node = module_sidebar;
  } else if (component.label == "footer") {
    //node = footer;
  }

  fix_scroll(container, component, node);
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


function _headerEndDelimiter(){return(
Symbol()
)}

function _left_sidebar(visualizer,runtime,Inspector,invalidation,between,headerEndDelimiter,navSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(headerEndDelimiter, navSidebarEndDelimiter),
  classList: "sidebar left"
})
)}

function _sidebar(md){return(
md`## Links`
)}

function _links_list(md){return(
md`source on [observablehq.com](https://observablehq.com/@tomlarkworthy/moldable-index)

replicated to [Github](https://github.com/tomlarkworthy/lopecode)

bugs on [Github](https://github.com/tomlarkworthy/lopecode)

hosted on [moldable.app](https://tomlarkworthy.moldable.app/index.html)

🦋 [@larkworthy.bsky.social](https://bsky.app/profile/larkworthy.bsky.social)`
)}

function _navSidebarEndDelimiter(){return(
Symbol()
)}

function _module_sidebar(visualizer,runtime,Inspector,invalidation,between,navSidebarEndDelimiter,modulesSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(navSidebarEndDelimiter, modulesSidebarEndDelimiter),
  classList: "sidebar left"
})
)}

function _links_description(md){return(
md`## Modules`
)}

function _29($0){return(
$0
)}

function _30(sync_modules_url){return(
sync_modules_url
)}

function _modulesSidebarEndDelimiter(){return(
Symbol()
)}

function _right_sidebar(visualizer,runtime,Inspector,invalidation,between,modulesSidebarEndDelimiter,rightSidebarEndDelimiter){return(
visualizer(runtime, {
  inspector: Inspector.into,
  invalidation,
  detachNodes: true,
  filter: between(modulesSidebarEndDelimiter, rightSidebarEndDelimiter),
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

function _37(md){return(
md`## [Attachments](https://observablehq.com/@tomlarkworthy/fileattachments)`
)}

function _viewof_selected($0){return(
$0
)}

function _viewof_file($0){return(
$0
)}

function _40(selected,Inputs,removeFileAttachment){return(
selected &&
  Inputs.button(`remove ${selected.name}`, {
    reduce: () => {
      removeFileAttachment(selected.name);
    }
  })
)}

function _41(download_selected){return(
download_selected
)}

function _42(default_menu){return(
default_menu
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
md`# Lopefile

What you are looking at now is a reactive coding substrate that is configured to look like a webpage.

A lopefile bundles all dependancies and its own authoring toolchain into a single HTML file that works offline and runs directly from the file system. Try clicking the "preview" button in the "code" panel to instantly fork this page. Click the "download" button to take a hard copy you can open from your filesystem.`
)}

function _46($0){return(
$0
)}

function _instructions(md){return(
md`## How to use

You can drag cells around the page using the dotted square handle.

You can click a cell to get make it editable in the editor, or click it on the minimap on the left.

At the bottom of the editors cells chooser drop down is \`<new cell>\`. This will add a new cell underneath the last click one.

The header/sidepanel/content panels are resizable and dockable.
`
)}

function _todo(md){return(
md`## Programming

The code is run on Observablehq's Reactive Runtime. The system is divided into cells, and if the code of a cell is changed, only dependancy cells are recomputed, like a spreadsheet. 

You can change the code of *anything* in a lopefile, even the authoring tooling. There is no division between "userspace" and a host system. Everything is reactively editable. The presentation layer that converts the runtime state to DOM nodes is code executing in the runtime, so you can replace it with anything.`
)}

function _49(md){return(
md`## Moldable

The substrate encourages ad hoc creation of tools to help debug. The following helper displays the time line of recently updated cells along wither their dependancy graph. Useful for discovering how something happened.`
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

function _54(attach_file){return(
attach_file
)}

function _background_jobs(trajectory_manipulate,sync_modules_url,editor_jobs)
{
  trajectory_manipulate;
  sync_modules_url;
  editor_jobs;
}


function _imports(md){return(
md`## Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("page")).define("page", ["isOnObservableCom","htl"], _page);
  main.variable(observer("content_item")).define("content_item", ["layout"], _content_item);
  main.variable(observer()).define(["selected_modules"], _3);
  main.variable(observer("sync_module_tabs")).define("sync_module_tabs", ["layout","unorderedSync","selected_modules","content_item"], _sync_module_tabs);
  main.variable(observer("module_viz")).define("module_viz", ["modules","visualizer","runtime","fix_scroll"], _module_viz);
  main.variable(observer("fix_scroll")).define("fix_scroll", _fix_scroll);
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
  main.variable(observer("layout")).define("layout", ["gl","mutable config","page","panel","module_viz","invalidation"], _layout);
  main.variable(observer("panel")).define("panel", ["content","left_sidebar","right_sidebar","module_sidebar","fix_scroll"], _panel);
  main.variable(observer("isOnObservableCom")).define("isOnObservableCom", ["location"], _isOnObservableCom);
  main.variable(observer("apply_layout")).define("apply_layout", ["isOnObservableCom","base_css","light_theme_css","page_style_css","lopeviz_handle_css","minicellStyle","page"], _apply_layout);
  main.variable(observer("headerEndDelimiter")).define("headerEndDelimiter", _headerEndDelimiter);
  main.variable(observer("left_sidebar")).define("left_sidebar", ["visualizer","runtime","Inspector","invalidation","between","headerEndDelimiter","navSidebarEndDelimiter"], _left_sidebar);
  main.variable(observer("sidebar")).define("sidebar", ["md"], _sidebar);
  main.variable(observer("links_list")).define("links_list", ["md"], _links_list);
  main.variable(observer("navSidebarEndDelimiter")).define("navSidebarEndDelimiter", _navSidebarEndDelimiter);
  main.variable(observer("module_sidebar")).define("module_sidebar", ["visualizer","runtime","Inspector","invalidation","between","navSidebarEndDelimiter","modulesSidebarEndDelimiter"], _module_sidebar);
  main.variable(observer("links_description")).define("links_description", ["md"], _links_description);
  main.variable(observer()).define(["viewof selected_modules"], _29);
  main.variable(observer()).define(["sync_modules_url"], _30);
  main.variable(observer("modulesSidebarEndDelimiter")).define("modulesSidebarEndDelimiter", _modulesSidebarEndDelimiter);
  main.variable(observer("right_sidebar")).define("right_sidebar", ["visualizer","runtime","Inspector","invalidation","between","modulesSidebarEndDelimiter","rightSidebarEndDelimiter"], _right_sidebar);
  main.variable(observer("exporter_header")).define("exporter_header", ["md"], _exporter_header);
  main.variable(observer("exporter_ref")).define("exporter_ref", ["exporter"], _exporter_ref);
  main.variable(observer("editor_header")).define("editor_header", ["md"], _editor_header);
  main.variable(observer("editor_view")).define("editor_view", ["viewof editor"], _editor_view);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof_selected")).define("viewof_selected", ["viewof selected"], _viewof_selected);
  main.variable(observer("viewof_file")).define("viewof_file", ["viewof file"], _viewof_file);
  main.variable(observer()).define(["selected","Inputs","removeFileAttachment"], _40);
  main.variable(observer()).define(["download_selected"], _41);
  main.variable(observer()).define(["default_menu"], _42);
  main.variable(observer("rightSidebarEndDelimiter")).define("rightSidebarEndDelimiter", _rightSidebarEndDelimiter);
  main.variable(observer("content")).define("content", ["visualizer","runtime","Inspector","invalidation","between","rightSidebarEndDelimiter","contentEndDelimiter"], _content);
  main.variable(observer("intro")).define("intro", ["md"], _intro);
  main.variable(observer()).define(["viewof plot_trajectory"], _46);
  main.variable(observer("instructions")).define("instructions", ["md"], _instructions);
  main.variable(observer("todo")).define("todo", ["md"], _todo);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("contentEndDelimiter")).define("contentEndDelimiter", _contentEndDelimiter);
  main.variable(observer("footerEndDelimiter")).define("footerEndDelimiter", _footerEndDelimiter);
  main.variable(observer("between")).define("between", _between);
  main.variable(observer()).define(["attach_file"], _54);
  main.variable(observer("background_jobs")).define("background_jobs", ["trajectory_manipulate","sync_modules_url","editor_jobs"], _background_jobs);
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
  main.import("createCell", child4);
  main.import("editor_jobs", child4);
  const child5 = runtime.module(define5);
  main.import("default_menu", child5);
  main.import("focusEditor", child5);
  const child6 = runtime.module(define6);
  main.import("modules", child6);
  main.import("viewof selected_modules", child6);
  main.import("selected_modules", child6);
  main.import("sync_modules_url", child6);
  const child7 = runtime.module(define7);
  main.import("viewof file", child7);
  main.import("file", child7);
  main.import("viewof selected", child7);
  main.import("selected", child7);
  main.import("attachments", child7);
  main.import("download_selected", child7);
  main.import("setFileAttachment", child7);
  main.import("removeFileAttachment", child7);
  main.import("attach_file", child7);
  main.import("getFileAttachments", child7);
  const child8 = runtime.module(define8);
  main.import("runtime", child8);
  main.import("main", child8);
  const child9 = runtime.module(define9);
  main.import("into", "minicellInto", child9);
  main.import("style", "minicellStyle", child9);
  const child10 = runtime.module(define10);
  main.import("viewof plot_trajectory", child10);
  main.import("plot_trajectory", child10);
  main.import("trajectory_manipulate", child10);
  const child11 = runtime.module(define11);
  main.import("_ndd", child11);
  const child12 = runtime.module(define12);
  main.import("unorderedSync", child12);
  return main;
}
