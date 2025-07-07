function _1(md){return(
md`# golden-layout@2.6.0

usage [example](https://observablehq.com/@tomlarkworthy/hello-golden-layout-2-6-0)`
)}

function _base_css(htl){return(
htl.html`<style>
.lm_root {
  position: relative;
}
.lm_row > .lm_item {
  float: left;
}
.lm_content {
  overflow: scroll;
  position: relative;
}
.lm_dragging,
.lm_dragging * {
  cursor: move !important;
  -webkit-user-select: none;
          user-select: none;
}
.lm_maximised {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 40;
}
.lm_maximise_placeholder {
  display: none;
}
.lm_splitter {
  position: relative;
  z-index: 2;
  touch-action: none;
}
.lm_splitter.lm_vertical .lm_drag_handle {
  width: 100%;
  position: absolute;
  cursor: ns-resize;
  touch-action: none;
  -webkit-user-select: none;
          user-select: none;
}
.lm_splitter.lm_horizontal {
  float: left;
  height: 100%;
}
.lm_splitter.lm_horizontal .lm_drag_handle {
  height: 100%;
  position: absolute;
  cursor: ew-resize;
  touch-action: none;
  -webkit-user-select: none;
          user-select: none;
}
.lm_header {
  overflow: visible;
  position: relative;
  z-index: 1;
  -webkit-user-select: none;
          user-select: none;
}
.lm_header [class^=lm_] {
  box-sizing: content-box !important;
}
.lm_header .lm_controls {
  position: absolute;
  right: 3px;
  display: flex;
}
.lm_header .lm_controls > * {
  cursor: pointer;
  float: left;
  width: 18px;
  height: 18px;
  text-align: center;
}
.lm_header .lm_tabs {
  position: absolute;
  display: flex;
}
.lm_header .lm_tab {
  cursor: pointer;
  float: left;
  height: 14px;
  margin-top: 1px;
  padding: 0px 10px 5px;
  padding-right: 25px;
  position: relative;
  touch-action: none;
}
.lm_header .lm_tab i {
  width: 2px;
  height: 19px;
  position: absolute;
}
.lm_header .lm_tab i.lm_left {
  top: 0;
  left: -2px;
}
.lm_header .lm_tab i.lm_right {
  top: 0;
  right: -2px;
}
.lm_header .lm_tab .lm_title {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lm_header .lm_tab .lm_close_tab {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
}
.lm_stack {
  position: relative;
}
.lm_stack > .lm_items {
  overflow: hidden;
}
.lm_stack.lm_left > .lm_items {
  position: absolute;
  left: 20px;
  top: 0;
}
.lm_stack.lm_right > .lm_items {
  position: absolute;
  right: 20px;
  top: 0;
}
.lm_stack.lm_right > .lm_header {
  position: absolute;
  right: 0;
  top: 0;
}
.lm_stack.lm_bottom > .lm_items {
  position: absolute;
  bottom: 20px;
}
.lm_stack.lm_bottom > .lm_header {
  position: absolute;
  bottom: 0;
}
.lm_left.lm_stack .lm_header,
.lm_right.lm_stack .lm_header {
  height: 100%;
}
.lm_left.lm_dragProxy .lm_header,
.lm_right.lm_dragProxy .lm_header,
.lm_left.lm_dragProxy .lm_items,
.lm_right.lm_dragProxy .lm_items {
  float: left;
}
.lm_left.lm_dragProxy .lm_header,
.lm_right.lm_dragProxy .lm_header,
.lm_left.lm_stack .lm_header,
.lm_right.lm_stack .lm_header {
  width: 20px;
  vertical-align: top;
}
.lm_left.lm_dragProxy .lm_header .lm_tabs,
.lm_right.lm_dragProxy .lm_header .lm_tabs,
.lm_left.lm_stack .lm_header .lm_tabs,
.lm_right.lm_stack .lm_header .lm_tabs {
  transform-origin: left top;
  top: 0;
  width: 1000px;
  /*hack*/
}
.lm_left.lm_dragProxy .lm_header .lm_controls,
.lm_right.lm_dragProxy .lm_header .lm_controls,
.lm_left.lm_stack .lm_header .lm_controls,
.lm_right.lm_stack .lm_header .lm_controls {
  bottom: 0;
  flex-flow: column;
}
.lm_dragProxy.lm_left .lm_header .lm_tabs,
.lm_stack.lm_left .lm_header .lm_tabs {
  transform: rotate(-90deg) scaleX(-1);
  left: 0;
}
.lm_dragProxy.lm_left .lm_header .lm_tabs .lm_tab,
.lm_stack.lm_left .lm_header .lm_tabs .lm_tab {
  transform: scaleX(-1);
  margin-top: 1px;
}
.lm_dragProxy.lm_left .lm_header .lm_tabdropdown_list,
.lm_stack.lm_left .lm_header .lm_tabdropdown_list {
  top: initial;
  right: initial;
  left: 20px;
}
.lm_dragProxy.lm_right .lm_content {
  float: left;
}
.lm_dragProxy.lm_right .lm_header .lm_tabs,
.lm_stack.lm_right .lm_header .lm_tabs {
  transform: rotate(90deg) scaleX(1);
  left: 100%;
  margin-left: 0;
}
.lm_dragProxy.lm_right .lm_header .lm_controls,
.lm_stack.lm_right .lm_header .lm_controls {
  left: 3px;
}
.lm_dragProxy.lm_right .lm_header .lm_tabdropdown_list,
.lm_stack.lm_right .lm_header .lm_tabdropdown_list {
  top: initial;
  right: 20px;
}
.lm_dragProxy.lm_bottom .lm_header,
.lm_stack.lm_bottom .lm_header {
  width: 100%;
}
.lm_dragProxy.lm_bottom .lm_header .lm_tab,
.lm_stack.lm_bottom .lm_header .lm_tab {
  margin-top: 0;
  border-top: none;
}
.lm_dragProxy.lm_bottom .lm_header .lm_controls,
.lm_stack.lm_bottom .lm_header .lm_controls {
  top: 3px;
}
.lm_dragProxy.lm_bottom .lm_header .lm_tabdropdown_list,
.lm_stack.lm_bottom .lm_header .lm_tabdropdown_list {
  top: initial;
  bottom: 20px;
}
.lm_drop_tab_placeholder {
  float: left;
  width: 100px;
  visibility: hidden;
}
.lm_header .lm_controls .lm_tabdropdown:before {
  content: '';
  width: 0;
  height: 0;
  vertical-align: middle;
  display: inline-block;
  border-top: 5px dashed;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  color: white;
}
.lm_header .lm_tabdropdown_list {
  position: absolute;
  top: 20px;
  right: 0;
  z-index: 5;
  overflow: hidden;
}
.lm_header .lm_tabdropdown_list .lm_tab {
  clear: both;
  padding-right: 10px;
  margin: 0;
}
.lm_header .lm_tabdropdown_list .lm_tab .lm_title {
  width: 100px;
}
.lm_header .lm_tabdropdown_list .lm_close_tab {
  display: none !important;
}
/***********************************
* Drag Proxy
***********************************/
.lm_dragProxy {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
}
.lm_dragProxy .lm_header {
  background: transparent;
}
.lm_dragProxy .lm_content {
  border-top: none;
  overflow: hidden;
}
.lm_dropTargetIndicator {
  display: none;
  position: absolute;
  z-index: 35;
  transition: all 200ms ease;
}
.lm_dropTargetIndicator .lm_inner {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
}
.lm_transition_indicator {
  display: none;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}
.lm_popin {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9999;
}
.lm_popin > * {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.lm_popin > .lm_bg {
  z-index: 10;
}
.lm_popin > .lm_icon {
  z-index: 20;
}
</style>`
)}

function _light_theme_css(lm_close_black,lm_popout_black,lm_maximise_black,lm_minimize_black,lm_popin_black,htl){return(
htl.html`<style>
.lm_goldenlayout {
}
.lm_content {
  border: 1px solid #cccccc;
}
.lm_dragProxy .lm_content {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
.lm_dropTargetIndicator {
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.4);
  outline: 1px dashed #cccccc;
}
.lm_dropTargetIndicator .lm_inner {
  background: #000000;
  opacity: 0.1;
}
.lm_splitter {
  background: #999999;
  opacity: 0.001;
  transition: opacity 200ms ease;
}
.lm_splitter:hover,
.lm_splitter.lm_dragging {
  background: #bbbbbb;
  opacity: 1;
}
.lm_header {
  height: 20px;
}
.lm_header .lm_tab {
  font-family: Arial, sans-serif;
  font-size: 12px;
  color: #888888;
  background: #fafafa;
  margin-right: 2px;
  padding-bottom: 4px;
  border: 1px solid #cccccc;
  border-bottom: none;
}
.lm_header .lm_tab .lm_title {
  padding-top: 1px;
}
.lm_header .lm_tab .lm_close_tab {
  width: 11px;
  height: 11px;
  background-image: url(${lm_close_black});
  background-position: center center;
  background-repeat: no-repeat;
  top: 4px;
  right: 6px;
  opacity: 0.4;
}
.lm_header .lm_tab .lm_close_tab:hover {
  opacity: 1;
}
.lm_header .lm_tab.lm_active {
  border-bottom: none;
  box-shadow: 2px -2px 2px -2px rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
}
.lm_header .lm_tab.lm_active .lm_close_tab {
  opacity: 1;
}
.lm_dragProxy.lm_right .lm_header .lm_tab.lm_active,
.lm_stack.lm_right .lm_header .lm_tab.lm_active {
  box-shadow: 2px -2px 2px -2px rgba(0, 0, 0, 0.2);
}
.lm_dragProxy.lm_bottom .lm_header .lm_tab.lm_active,
.lm_stack.lm_bottom .lm_header .lm_tab.lm_active {
  box-shadow: 2px 2px 2px -2px rgba(0, 0, 0, 0.2);
}
.lm_selected .lm_header {
  background-color: #452500;
}
.lm_tab:hover,
.lm_tab.lm_active {
  background: #e1e1e1;
  color: #777777;
}
.lm_header .lm_controls .lm_tabdropdown:before {
  color: #000000;
}
.lm_controls > * {
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.4;
  transition: opacity 300ms ease;
}
.lm_controls > *:hover {
  opacity: 1;
}
.lm_controls .lm_popout {
  background-image: url(${lm_popout_black});
}
.lm_controls .lm_maximise {
  background-image: url(${lm_maximise_black});
}
.lm_controls .lm_close {
  background-image: url(${lm_close_black});
}
.lm_maximised .lm_header {
  background-color: #ffffff;
}
.lm_maximised .lm_controls .lm_maximise {
  background-image: url(${lm_minimize_black.png});
}
.lm_transition_indicator {
  background-color: #000000;
  border: 1px dashed #555555;
}
.lm_popin {
  cursor: pointer;
}
.lm_popin .lm_bg {
  background: #000000;
  opacity: 0.7;
}
.lm_popin .lm_icon {
  background-image: url(${lm_popin_black});
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.7;
}
.lm_popin:hover .lm_icon {
  opacity: 1;
}
</style>`
)}

function _lm_close_black(FileAttachment){return(
FileAttachment("lm_close_black.png").url()
)}

function _lm_maximise_black(FileAttachment){return(
FileAttachment("lm_maximise_black.png").url()
)}

function _lm_minimize_black(FileAttachment){return(
FileAttachment("lm_minimize_black.png").url()
)}

function _lm_popin_black(FileAttachment){return(
FileAttachment("lm_popin_black.png").url()
)}

function _lm_popout_black(FileAttachment){return(
FileAttachment("lm_popout_black.png").url()
)}

async function _gl(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("golden-layout-2.6.0.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL); // Ensure URL is revoked after import
  }
}


function _unzip(Response,DecompressionStream){return(
async (attachment) =>
  await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  ).blob()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["golden-layout-2.6.0.js.gz", {url: new URL("./files/363228af966149733caa8bfd2f60132c3559f07195ef5ae206b92cf168ef0c84c621552ba3bb319e12dc49bf6117d1eba73d39cdae5cc177cfea1e7dfb2834a0.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["lm_popout_black.png", {url: new URL("./files/ae82e453520f825a359c75aba68cda0d3805e3a9a87970fed752528d80b2f043b0aaaae95b62c56defbe26f3d1b93039f44d0d0300c538d038c7bfbdca1a761b.png", import.meta.url), mimeType: "image/png", toString}],
    ["lm_close_black.png", {url: new URL("./files/59f8ef5f96d07253501a923360b0a206e862a6f72f927bb1cb175a417a0fccfaaeffc2a009c2c3f92b1a97d902e2a61127a0522e0ddcf195e881bcfbc19c5c4a.png", import.meta.url), mimeType: "image/png", toString}],
    ["lm_minimize_black.png", {url: new URL("./files/7af8f7f402cdafd99b884576204b15c4d11d1d2a456aaddcc44dbebc240efe0311f06ea78bf2248dc5378ce4fa544fd4e563d6117319c7741a5fac397065b852.png", import.meta.url), mimeType: "image/png", toString}],
    ["lm_popin_black.png", {url: new URL("./files/5252be90c189e1019900a2e1b7673c52c880588f54f337465aea50b8acaa2acd4ad36f697c9f893af1d5988b5411edb324351cb25b9c692f3d16b1505cb165b6.png", import.meta.url), mimeType: "image/png", toString}],
    ["lm_maximise_black.png", {url: new URL("./files/a041db3dd9fa6e729c083b4995cbcb55bc520a47b22205edd27f2e7776f9345eeaf047d21527d96810afc3e20644055ba7b74b9bffd5ab7144cf442e8c62e327.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("base_css")).define("base_css", ["htl"], _base_css);
  main.variable(observer("light_theme_css")).define("light_theme_css", ["lm_close_black","lm_popout_black","lm_maximise_black","lm_minimize_black","lm_popin_black","htl"], _light_theme_css);
  main.variable(observer("lm_close_black")).define("lm_close_black", ["FileAttachment"], _lm_close_black);
  main.variable(observer("lm_maximise_black")).define("lm_maximise_black", ["FileAttachment"], _lm_maximise_black);
  main.variable(observer("lm_minimize_black")).define("lm_minimize_black", ["FileAttachment"], _lm_minimize_black);
  main.variable(observer("lm_popin_black")).define("lm_popin_black", ["FileAttachment"], _lm_popin_black);
  main.variable(observer("lm_popout_black")).define("lm_popout_black", ["FileAttachment"], _lm_popout_black);
  main.variable(observer("gl")).define("gl", ["unzip","FileAttachment"], _gl);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
