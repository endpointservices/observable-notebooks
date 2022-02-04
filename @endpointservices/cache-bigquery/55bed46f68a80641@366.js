// https://observablehq.com/@mootari/notebook-data@366
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Version Pinning for Notebooks
Observable supports version pinning by appending the version number to the notebook name or path.

These functions make it easier to look up the most recent version of notebooks, and to use pinned versions in your own documentation. Example:`
)});
  main.variable(observer()).define(["md","getCurrentPinnedName"], async function(md,getCurrentPinnedName){return(
md`\`\`\`js
import {getCurrentPinnedName} from '${await getCurrentPinnedName()}'
\`\`\``
)});
  main.variable(observer()).define(["md","dataTable","getCurrentLocalPath","getCurrentPath","getCurrentName","getCurrentPinnedName","getCurrentMetadata","getCurrentComparePath"], async function(md,dataTable,getCurrentLocalPath,getCurrentPath,getCurrentName,getCurrentPinnedName,getCurrentMetadata,getCurrentComparePath){return(
md`---
## Current Notebook
Functions that can be used to obtain information about the currently viewed notebook. Metadata and the pinned name will be available once you have shared or published your notebook. Reload the page after publishing to see the updated version number.

${dataTable([
  ['getCurrentLocalPath', getCurrentLocalPath()],
  ['getCurrentPath', getCurrentPath()],
  ['getCurrentName', getCurrentName()],
  ['getCurrentPinnedName', await getCurrentPinnedName()],
  ['getCurrentMetadata', await getCurrentMetadata()],
  ['getCurrentComparePath', await getCurrentComparePath(299)]
])}

`
)});
  main.variable(observer("getCurrentLocalPath")).define("getCurrentLocalPath", ["html"], function(html){return(
function getCurrentLocalPath() {
  return html`<a href="#">`.pathname;
}
)});
  main.variable(observer("getCurrentPath")).define("getCurrentPath", ["formatPath","getCurrentName"], function(formatPath,getCurrentName){return(
function getCurrentPath() {
  return formatPath(getCurrentName());
}
)});
  main.variable(observer("getCurrentName")).define("getCurrentName", ["getCurrentLocalPath"], function(getCurrentLocalPath){return(
function getCurrentName() {
  return getCurrentLocalPath().replace(/^\/(d\/)?/, '');
}
)});
  main.variable(observer("getCurrentPinnedName")).define("getCurrentPinnedName", ["getCurrentMetadata","formatName","getCurrentName"], function(getCurrentMetadata,formatName,getCurrentName){return(
async function getCurrentPinnedName() {
  const data = await getCurrentMetadata();
  if(data && data.version) return formatName(getCurrentName(), data.version);
  return null;
}
)});
  main.variable(observer("getCurrentMetadata")).define("getCurrentMetadata", ["getMetadata","getCurrentName"], function(getMetadata,getCurrentName)
{
  let data;
  return async function getCurrentMetadata(refetch = false) {
    if(data === undefined || refetch) data = await getMetadata(getCurrentName());
    return data;
  }
}
);
  main.variable(observer("getCurrentComparePath")).define("getCurrentComparePath", ["getMetadata","getCurrentName","formatComparePath"], function(getMetadata,getCurrentName,formatComparePath){return(
async function getCurrentComparePath(version1 = null, version2 = null) {
  const data = await getMetadata(getCurrentName());
  if(data) return formatComparePath(data.id, version1, data.id, version2);
  return null;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Other Notebooks
Functions for retrieving information about any notebooks.
`
)});
  main.variable(observer("viewof preview_name")).define("viewof preview_name", ["html","Event"], function(html,Event)
{
  const submit = html`<input type="button" value="Submit">`;
  const input = html`<input type="text" value="@jashkenas/inputs">`;
  const view = html`<form>${input} ${submit}`;
  input.oninput = e => e.stopPropagation();
  submit.onclick = () => { view.value = input.value; view.dispatchEvent(new Event('input')) };
  view.value = input.value;
  return view;
}
);
  main.variable(observer("preview_name")).define("preview_name", ["Generators", "viewof preview_name"], (G, _) => G.input(_));
  main.variable(observer()).define(["dataTable","formatLocalPath","preview_name","formatPath","formatSourcePath","getPinnedName","getPinnedPath","getSource","getMetadata"], async function(dataTable,formatLocalPath,preview_name,formatPath,formatSourcePath,getPinnedName,getPinnedPath,getSource,getMetadata){return(
dataTable([
  ['formatLocalPath', formatLocalPath(preview_name)],
  ['formatPath', formatPath(preview_name)],
  ['formatSourcePath', formatSourcePath(preview_name)],
  ['getPinnedName', await getPinnedName(preview_name)],
  ['getPinnedPath', await getPinnedPath(preview_name)],
  ['getSource', await getSource(preview_name)],
  ['getMetadata', await getMetadata(preview_name)],
])
)});
  main.variable(observer("formatLocalPath")).define("formatLocalPath", function(){return(
function formatLocalPath(name, version = null) {
  return '/' + (name.match(/^@/) ? name : 'd/' + name) + (version ? '@' + version : '');
}
)});
  main.variable(observer("formatPath")).define("formatPath", ["domain","formatLocalPath"], function(domain,formatLocalPath){return(
function formatPath(name, version = null) {
  return `https://${domain}${formatLocalPath(name, version)}`;
}
)});
  main.variable(observer("formatSourcePath")).define("formatSourcePath", ["apiDomain","formatLocalPath"], function(apiDomain,formatLocalPath){return(
function formatSourcePath(name, version = null) {
  return `https://${apiDomain}${formatLocalPath(name, version)}.js`;
}
)});
  main.variable(observer("formatName")).define("formatName", function(){return(
function formatName(name, version = null) {
  return name + (version ? '@' + version : '');
}
)});
  main.variable(observer("formatId")).define("formatId", function(){return(
function formatId(id, version = null) {
  return id + (version ? '@' + version : '');
}
)});
  main.variable(observer("formatComparePath")).define("formatComparePath", ["domain","formatId"], function(domain,formatId){return(
function formatComparePath(id1, version1, id2, version2) {
  return `https://${domain}/compare/${formatId(id1, version1)}...${formatId(id2, version2)}`;
}
)});
  main.variable(observer("getPinnedName")).define("getPinnedName", ["getMetadata"], function(getMetadata){return(
async function getPinnedName(name) {
  const data = await getMetadata(name);
  if(data && data.version) return name + '@' + data.version;
  return null;
}
)});
  main.variable(observer("getPinnedPath")).define("getPinnedPath", ["getMetadata","formatPath"], function(getMetadata,formatPath){return(
async function getPinnedPath(name) {
  const data = await getMetadata(name);
  if(data && data.version) return formatPath(name, data.version);
  return null;
}
)});
  main.variable(observer("getComparePath")).define("getComparePath", ["getMetadata","formatComparePath"], function(getMetadata,formatComparePath){return(
async function getComparePath(name, version1 = null, version2 = null) {
  const data = await getMetadata(name);
  if(data) return formatComparePath(data.id, version1, data.id, version2);
  return null;
}
)});
  main.variable(observer("getSource")).define("getSource", ["formatSourcePath"], function(formatSourcePath){return(
async function getSource(name, version = null) {
  const path = formatSourcePath(name, version);
  try {
    const response = await fetch(path, {cache: version ? 'default' : 'no-cache'});
    return await response.text();
  }
  catch(e) { return null; }  
}
)});
  main.variable(observer("getMetadata")).define("getMetadata", ["getSource"], function(getSource){return(
async function getMetadata(name, version = null) {
  const map = {
    'URL': 'url',
    'Title': 'title',
    'Author': 'author',
    'Version': 'version',
    'Runtime version': 'runtimeVersion'
  };
  const source = await getSource(name, version);
  if(!source) return null;
  
  const frontmatter = source.match(/^(?:\/\/ .+?\n)+/);
  const id = source.match(/^\s+?id:\s+?"([^@"]+)/m);
  if(!frontmatter || !id) return null;
  
  return frontmatter[0].split(/\n/).reduce((data, s) => {
    const m = s.match(/^\/\/ ([^:]+?):\s+?(.+?)$/);
    if(m && map.hasOwnProperty(m[1])) data[map[m[1]]] = m[2];
    return data;
  }, {id: id[1]});
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("domain")).define("domain", function(){return(
'observablehq.com'
)});
  main.variable(observer("apiDomain")).define("apiDomain", function(){return(
'api.observablehq.com'
)});
  main.variable(observer("dataTable")).define("dataTable", ["html"], function(html){return(
function dataTable(rows) {
  const style = 'padding:.5em;vertical-align:top';
  const n = rows.map(([l,d]) => {
    const wrap = html`<div style="max-height:10em;overflow:auto;word-break:break-word">`;
    wrap.textContent = JSON.stringify(d);
    return html`<tr><th style="${style}">${l}</th><td style="${style};font-family:monospace">${wrap}</td>`;
  });
  return html`<table>${n}`;
}
)});
  return main;
}
