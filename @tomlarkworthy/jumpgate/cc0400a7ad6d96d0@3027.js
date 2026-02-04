import define1 from "./95647fc7733e3482@86.js";
import define2 from "./f6282eaf525a00db@2418.js";
import define3 from "./de3abeb05c4b090e@765.js";
import define4 from "./98f34e974bb2e4bc@958.js";
import define5 from "./3fae8ed7111b5d13@3901.js";
import define6 from "./10c7899865f8a76e@8998.js";
import define7 from "./cf93635398c5c302@451.js";
import define8 from "./cbec9ad21e321fad@414.js";

function _page(isOnObservableCom,lopeviz_handle_css,base_css,light_theme_css,linkTo,htl){return(
htl.html`<div id="lopepage" style="height: ${isOnObservableCom() ? '800px' : '100vh'}">
  ${lopeviz_handle_css}
  ${base_css}
  ${light_theme_css}
  <style>
    html body {
      max-width: 100vw;
    }
    html {
      padding: 0px !important;
      margin: 0px !important;
    }
    #lopepage:has(.observablehq-root) > .module-explorer {
      display: none;
    }
  </style>
  <h1 style="display:none;">Lopepage</h1>
  <div class="module-explorer">
    Lost? Open the <a href="${linkTo('@tomlarkworthy/module-selection', {onObservable: false})}">module explorer</a>
  </div>
</div>`
)}

function _append_to_body(page)
{
  // If exported in headless mode, this will attach the page
  if (!page.isConnected) {
    document.body.appendChild(page);
  }
}


function _testNavigation(linkTo,htl){return(
htl.html`<h2>Manual Testing links</h2>
<ul>
<li><a href="https://observablehq.com/@tomlarkworthy/lopepage#testNavigation">refresh page</a></li>
<li><a href="#testNavigation">reset view</a></li>
<li><a href="${linkTo("@tomlarkworthy/stream-operators", {onObservable: false})}">stream-operators</a> module</li>
<li><a href="${linkTo("@tomlarkworthy/stream-operators#combineLatest", {onObservable: false})}">stream-operators#combineLatest</a> 
<li><a href="${linkTo("@tomlarkworthy/runtime-sdk#observe", {onObservable: false})}">runtime-sdk#observe</a> cell</li>
</ul>`
)}

function _4(md){return(
md`## TODO

### Lopepage
- <strike>links should use URL param structure</strike>
  - links are not updated when dynamically added (e.g. after opening a module)
- <strike>Should load headlessly so we don't see imports at bottom</strike>
- Can reliably load random notebooks
- Support opening FileAttachments directly (e.g. blobs)
- redoing layout should not cause focused components to lose focus.

### Module-selection


### Exporter

- close open editor when deleting
- katex should be offline

### Editor / Context-Menu
  
### Visualizer

### debugger
- <strike>something module load failure -- its not reliable tomlarkworthy_jumpgate_20250426T170239Z.html does it sometimes. Its the observe call breaks things</strike>
- hover over menu to see what things are better?
- Not offline-first yet

### decompiler
- Does not handle static class class properly.

### tests
- within notebook cell links don't work on second click`
)}

function _sync_module_tabs(layout,unorderedSync,selected_modules,visualizer_cache,fix_scroll)
{
  const module_items = layout.root
    .getAllContentItems()
    .filter((ci) => ci.componentName == "module");

  const modulePanel_diff = unorderedSync(
    selected_modules,
    module_items,
    (a, b) => a.name == b.title
  );
  modulePanel_diff.add.forEach((moduleInfo) => {
    layout.root.addItem({
      type: "component",
      title: moduleInfo.name,
      componentName: "module",
      componentState: { cell: moduleInfo.cell }
    });
  });

  // links with cells in them need scrolling
  const cells = selected_modules.filter((m) => m.cell);
  cells.forEach((module) => {
    console.log(`scrolling ${module.name} to ${module.cell}`);
    const item = module_items.find((item) => item.title == module.name);
    const node = visualizer_cache.get(module.module);
    const cell = module.module._scope.get(module.cell);
    fix_scroll(item.container, item.component, node, cell);
  });

  modulePanel_diff.remove.forEach((item) => {
    item.remove();
  });
}


function _sync_layout_url(URLSearchParams,location,config,serializeGoldenDSL,html)
{
  const hashParams = new URLSearchParams(location.hash.slice(1));
  if (!config.root) return;
  const view = serializeGoldenDSL(config.root);
  if (hashParams.get("view") !== view) {
    hashParams.delete("view");
    const viewString = serializeGoldenDSL(config.root);
    const priorParams = hashParams.toString();
    const hash =
      "#" + priorParams + (priorParams ? "&" : "") + `view=${viewString}`;

    const link = html`<a href="${hash}">view`;
    setTimeout(() => link.click(), 0);
    console.log("sync_layout_url", link.href);
    return link;
  }
}


function _onLoadConfig(parseGoldenDSL,URLSearchParams,location)
{
  try {
    return parseGoldenDSL(
      new URLSearchParams(location.hash.substring(1)).get("view")
    );
  } catch (err) {
    return undefined;
  }
}


function _visualizer_cache(){return(
new Map()
)}

function _modulePanel(currentModules,visualizer_cache,visualizer,runtime,isOnObservableCom,fix_scroll){return(
function (container, component) {
  const moduleInfo = [...currentModules.values()].find(
    (m) => m.name == container.title
  );
  if (!moduleInfo) return;

  const module = moduleInfo.module;
  let node = undefined;
  if (!visualizer_cache.has(module)) {
    console.log("new module panel", component);
    node = visualizer(runtime, {
      invalidation: new Promise((r) => {}),
      module,
      detachNodes: isOnObservableCom(),
      filter: (cell_name) => {
        if (typeof cell_name == "string") {
          if (
            cell_name.startsWith("dynamic ")
            // || cell_name.startsWith("module ")
          )
            return false;
        }
        return true;
      }
    });
    visualizer_cache.set(module, node);
  } else {
    console.log("reusing module panel", component);
    node = visualizer_cache.get(module);
  }

  const cell = module._scope.get(component.cell);

  fix_scroll(container, component, node, cell);

  container.getElement().addEventListener("scroll", (event) => {
    container.extendState({
      scrollTop: container.scrollTop || container.state.scrollTop,
      scrollLeft: container.scrollLeft || container.state.scrollLeft
    });
  });
}
)}

function _blobPanel(){return(
function (container, component) {
  const node = document.createElement("iframe");
  node.src = component.url;
  const c_element = container.getElement();
  const element = c_element.appendChild(node);
}
)}

function _fix_scroll(){return(
function (container, component, node, cell_variable) {
  // maintain scroll position in the state
  const c_element = container.getElement();
  const element = c_element.appendChild(node);
  const setScroll = () => {
    component = container.state;
    if (cell_variable) {
      const dom =
        cell_variable._observer._node ??
        c_element.querySelector(`div[cell='${cell_variable._name}']`);
      if (dom) {
        const top = dom.offsetTop - c_element.offsetTop;
        c_element.scrollTop = top;
        container.extendState({
          scrollTop: top
        });
      }
    } else {
      if (component.scrollTop) c_element.scrollTop = component.scrollTop;
      if (component.scrollLeft) c_element.scrollLeft = component.scrollLeft;
    }
  };
  setScroll();
  //node.style.visibility = "hidden";
  container.on("open", () => {
    setScroll();
    // Ugly this requires 2 animation frames to settle :/
    requestAnimationFrame(() => {
      setScroll();
      requestAnimationFrame(() => {
        setScroll();
        requestAnimationFrame(() => {
          // actually needs 3 for mobile :s
          setScroll();
        });
      });
    });
  });
}
)}

function _settings(){return(
{
  showMaximiseIcon: false,
  showPopoutIcon: false,
  showCloseIcon: true,
  hasHeaders: true
}
)}

function _is_mobile(width){return(
width < 800
)}

function _config(onLoadConfig,settings)
{
  if (onLoadConfig) {
    return {
      settings: settings,
      content: [onLoadConfig]
    };
  }
  return {
    settings: settings
  };
}


function _resize(Generators,addEventListener,invalidation,removeEventListener){return(
Generators.observe((notify) => {
  notify(undefined);
  addEventListener("resize", notify);
  invalidation.then(() => removeEventListener("resize", notify));
})
)}

function _layout(resize,gl,$0,page,modulePanel,blobPanel)
{
  // Removed resizing re-laying out because it causes problems with components that watch focus
  // when the the layout is redone, the components are killed and removed, damaging focus state.
  // mobile keyboards cause a resize, breaking the component that has focus
  resize;
  let layout = this;
  if (!layout) {
    layout = new gl.GoldenLayout($0.value, page);
    layout.registerComponent("module", modulePanel);
    layout.registerComponent("blob", blobPanel);
    layout.init();
  } else {
    // debugger
    debugger;
  }

  // TODO layout destroy is destructive
  // invalidation.then(() => {
  //   // avoid layouts stacking up
  //   layout.destroy();
  // });
  return layout;
}


function _layout_state(layout,gl,$0){return(
layout.on("stateChanged", () => {
  const state = gl.LayoutConfig.fromResolved(layout.toConfig());
  //console.log("stateChanged", mutable config, state);
  $0.value = state;
})
)}

function _lopepageModule(thisModule){return(
thisModule()
)}

function _background_jobs(onLoadConfig,layout_state,sync_layout_url,sync_module_tabs,runtime,navigator_jobs,auto_attach)
{
  onLoadConfig;
  layout_state;
  sync_layout_url;
  sync_module_tabs;
  runtime;
  navigator_jobs;
  auto_attach;
}


function _imports(md){return(
md`## Imports`
)}

function _27(exporter){return(
exporter()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("page")).define("page", ["isOnObservableCom","lopeviz_handle_css","base_css","light_theme_css","linkTo","htl"], _page);
  main.variable(observer("append_to_body")).define("append_to_body", ["page"], _append_to_body);
  main.variable(observer("testNavigation")).define("testNavigation", ["linkTo","htl"], _testNavigation);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("sync_module_tabs")).define("sync_module_tabs", ["layout","unorderedSync","selected_modules","visualizer_cache","fix_scroll"], _sync_module_tabs);
  main.variable(observer("sync_layout_url")).define("sync_layout_url", ["URLSearchParams","location","config","serializeGoldenDSL","html"], _sync_layout_url);
  main.variable(observer("onLoadConfig")).define("onLoadConfig", ["parseGoldenDSL","URLSearchParams","location"], _onLoadConfig);
  main.variable(observer("visualizer_cache")).define("visualizer_cache", _visualizer_cache);
  main.variable(observer("modulePanel")).define("modulePanel", ["currentModules","visualizer_cache","visualizer","runtime","isOnObservableCom","fix_scroll"], _modulePanel);
  main.variable(observer("blobPanel")).define("blobPanel", _blobPanel);
  main.variable(observer("fix_scroll")).define("fix_scroll", _fix_scroll);
  main.variable(observer("settings")).define("settings", _settings);
  main.variable(observer("is_mobile")).define("is_mobile", ["width"], _is_mobile);
  main.define("initial config", ["onLoadConfig","settings"], _config);
  main.variable(observer("mutable config")).define("mutable config", ["Mutable", "initial config"], (M, _) => new M(_));
  main.variable(observer("config")).define("config", ["mutable config"], _ => _.generator);
  main.variable(observer("resize")).define("resize", ["Generators","addEventListener","invalidation","removeEventListener"], _resize);
  main.variable(observer("layout")).define("layout", ["resize","gl","mutable config","page","modulePanel","blobPanel"], _layout);
  main.variable(observer("layout_state")).define("layout_state", ["layout","gl","mutable config"], _layout_state);
  main.variable(observer("viewof lopepageModule")).define("viewof lopepageModule", ["thisModule"], _lopepageModule);
  main.variable(observer("lopepageModule")).define("lopepageModule", ["Generators", "viewof lopepageModule"], (G, _) => G.input(_));
  main.variable(observer("background_jobs")).define("background_jobs", ["onLoadConfig","layout_state","sync_layout_url","sync_module_tabs","runtime","navigator_jobs","auto_attach"], _background_jobs);
  main.variable(observer("imports")).define("imports", ["md"], _imports);
  const child1 = runtime.module(define1);
  main.import("gl", child1);
  main.import("base_css", child1);
  main.import("light_theme_css", child1);
  const child2 = runtime.module(define2);
  main.import("unorderedSync", child2);
  main.import("runtime", child2);
  main.import("visualizer", child2);
  main.import("Inspector", child2);
  main.import("lopeviz_handle_css", child2);
  const child3 = runtime.module(define3);
  main.import("viewof notebookModule", child3);
  main.import("notebookModule", child3);
  main.import("currentModules", child3);
  main.import("viewof selected_modules", child3);
  main.import("selected_modules", child3);
  main.import("navigator_jobs", child3);
  main.import("serializeGoldenDSL", child3);
  main.import("parseGoldenDSL", child3);
  main.import("linkTo", child3);
  main.import("persistedAttachments", child3);
  main.import("getHashModules", child3);
  const child4 = runtime.module(define4);
  main.import("lookupVariable", child4);
  main.import("getPromiseState", child4);
  main.import("thisModule", child4);
  main.import("ascendants", child4);
  main.import("toObject", child4);
  main.import("isOnObservableCom", child4);
  const child5 = runtime.module(define5);
  main.import("auto_attach", child5);
  main.variable(observer()).define(["exporter"], _27);
  const child6 = runtime.module(define6);
  main.import("exporter", child6);
  const child7 = runtime.module(define7);
  main.import("viewof history", child7);
  main.import("history", child7);
  const child8 = runtime.module(define8);
  main.import("atlas", child8);
  return main;
}
