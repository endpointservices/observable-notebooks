// https://observablehq.com/@bryangingechen/version-pinning-for-notebooks@469
function _1(md){return(
md`# Version Pinning for Notebooks
Observable supports version pinning by appending the version number to the notebook name or path.

These functions make it easier to look up the most recent version of notebooks, and to use pinned versions in your own documentation. Example:`
)}

async function _2(md,getCurrentPinnedName){return(
md`\`\`\`js
import {getCurrentPinnedName} from '${await getCurrentPinnedName()}'
\`\`\``
)}

async function _3(md,dataTable,getCurrentLocalPath,getCurrentPath,getCurrentName,getCurrentPinnedName,getCurrentMetadata,getCurrentComparePath){return(
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
)}

function _getCurrentLocalPath(html){return(
function getCurrentLocalPath() {
  return html`<a href="#">`.pathname;
}
)}

function _getCurrentPath(formatPath,getCurrentName){return(
function getCurrentPath() {
  return formatPath(getCurrentName());
}
)}

function _getCurrentName(getCurrentLocalPath){return(
function getCurrentName() {
  return getCurrentLocalPath().replace(/^\/(d\/)?/, '').replace(/\/$/, '');
}
)}

function _getCurrentPinnedName(getCurrentMetadata,formatName,getCurrentName){return(
async function getCurrentPinnedName() {
  const data = await getCurrentMetadata();
  if(data && data.version) return formatName(getCurrentName(), data.version);
  return null;
}
)}

function _getCurrentMetadata(getMetadata,getCurrentName)
{
  let data;
  return async function getCurrentMetadata(refetch = false) {
    if(data === undefined || refetch) data = await getMetadata(getCurrentName());
    return data;
  }
}


function _getCurrentComparePath(getMetadata,getCurrentName,formatComparePath){return(
async function getCurrentComparePath(version1 = null, version2 = null) {
  const data = await getMetadata(getCurrentName());
  if(data) return formatComparePath(data.id, version1, data.id, version2);
  return null;
}
)}

function _10(md){return(
md`---
## Other Notebooks
Functions for retrieving information about any notebooks. Below, you may input:
- the full URL to the notebook, or
- everything after "\`observablehq.com/\`", or
- the alphanumeric code after "\`observablehq.com/d/\`"
`
)}

function _preview_name(params,html,nbMatch,Event)
{
  const val = params.get('nb');
  const submit = html`<input type="button" value="Submit">`;
  const input = html`<input type="text" value="${val ? val : '@jashkenas/inputs'}">`;
  const view = html`<form>${input} ${submit}`;
  input.oninput = e => e.stopPropagation();
  submit.onclick = () => {
    const match = nbMatch(input.value);
    if (match) input.value = match[1];
    view.value = input.value;
    view.dispatchEvent(new Event('input'));
  };
  const match = nbMatch(input.value);
  if (match) input.value = match[1];
  view.value = input.value;
  return view;
}


async function _12(dataTable,formatLocalPath,preview_name,formatPath,formatSourcePath,getPinnedName,getPinnedPath,getSource,getMetadata){return(
dataTable([
  ['formatLocalPath', formatLocalPath(preview_name)],
  ['formatPath', formatPath(preview_name)],
  ['formatSourcePath', formatSourcePath(preview_name)],
  ['getPinnedName', await getPinnedName(preview_name)],
  ['getPinnedPath', await getPinnedPath(preview_name)],
  ['getSource', await getSource(preview_name)],
  ['getMetadata', await getMetadata(preview_name)],
])
)}

function _compareLink(html,params,nbMatch,Event)
{
  function makeInput(val) {
    const el = html`<input type="text" value=${val}>`;
    el.oninput = e => e.stopPropagation();
    return el;
  }
  
  let compare = params.get('compare');
  if (compare) compare = compare
    .match(/(?:(?:observablehq\.com)?\/?compare\/)?([a-z0-9]+(?:@[0-9]+)?)\.\.\.([a-z0-9]+(?:@[0-9]+)?)/);
  const val = compare ? compare[1] : params.get('nb');
  const val2 = compare ? compare[2] : params.get('nb2');
  const submit = html`<input type="button" value="Submit">`;
  const input1 = makeInput(val ? val : "@jashkenas/inputs");
  const input2 = makeInput(val2 ? val2 : "@tmcw/inputs/2");
  const view = html`<form>${input1} ${input2} ${submit}`;
  submit.onclick = () => {
    const match1 = nbMatch(input1.value);
    const match2 = nbMatch(input2.value);
    if (match1) input1.value = match1[1];
    if (match2) input2.value = match2[1];
    view.value = [input1.value, input2.value];
    view.dispatchEvent(new Event('input'));
  };
  const match1 = nbMatch(input1.value);
  const match2 = nbMatch(input2.value);
  if (match1) input1.value = match1[1];
  if (match2) input2.value = match2[1];
  view.value = [input1.value, input2.value];
  return view;
}


async function _14(getMetadata,compareLink,formatComparePath,md)
{
  const data1 = await getMetadata(compareLink[0]);
  const data2 = await getMetadata(compareLink[1]);
  const cp = (data1 && data2) ? formatComparePath(data1.id, data1.version, data2.id, data2.version) : null;

  return md`Pinned compare link: [\`${cp ? cp : "couldn't get notebook data"}\`](${cp ? cp : '#compareLink'})`
}


function _nbMatch(){return(
(inp) => inp.match(/(?:observablehq\.com\/)((@[A-Za-z0-9]+\/[A-za-z0-9-]+(\/[0-9]+)?)|(d\/[A-za-z0-9]+))/)
)}

function _formatLocalPath(){return(
function formatLocalPath(name, version = null) {
  return '/' + (name.match(/(^@)|(^d\/)/) ? name : 'd/' + name) + (version !== null ? '@' + version : '');
}
)}

function _formatPath(domain,formatLocalPath){return(
function formatPath(name, version = null) {
  return `https://${domain}${formatLocalPath(name, version)}`;
}
)}

function _formatSourcePath(apiDomain,formatLocalPath){return(
function formatSourcePath(name, version = null) {
  return `https://${apiDomain}${formatLocalPath(name, version)}.js`;
}
)}

function _formatName(){return(
function formatName(name, version = null) {
  return name + (version ? '@' + version : '');
}
)}

function _formatId(){return(
function formatId(id, version = null) {
  return id + (version ? '@' + version : '');
}
)}

function _formatComparePath(domain,formatId){return(
function formatComparePath(id1, version1, id2, version2) {
  return `https://${domain}/compare/${formatId(id1, version1)}...${formatId(id2, version2)}`;
}
)}

function _getPinnedName(getMetadata){return(
async function getPinnedName(name) {
  const data = await getMetadata(name);
  if(data && data.version) return name + '@' + data.version;
  return null;
}
)}

function _getPinnedPath(getMetadata,formatPath){return(
async function getPinnedPath(name) {
  const data = await getMetadata(name);
  if(data && data.version) return formatPath(name, data.version);
  return null;
}
)}

function _getComparePath(getMetadata,formatComparePath){return(
async function getComparePath(name, version1 = null, version2 = null) {
  const data = await getMetadata(name);
  if(data) return formatComparePath(data.id, version1, data.id, version2);
  return null;
}
)}

function _getSource(formatSourcePath){return(
async function getSource(name, version = null) {
  const path = formatSourcePath(name, version);
  try {
    const response = await fetch(path, {cache: version ? 'default' : 'no-cache'});
    return await response.text();
  }
  catch(e) { return null; }  
}
)}

function _getMetadata(getSource){return(
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
)}

function _27(md){return(
md`---`
)}

function _params(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search)
)}

function _domain(){return(
'observablehq.com'
)}

function _apiDomain(){return(
'api.observablehq.com'
)}

function _dataTable(html){return(
function dataTable(rows) {
  const style = 'padding:.5em;vertical-align:top';
  const n = rows.map(([l,d]) => {
    const wrap = html`<div style="max-height:10em;overflow:auto;word-break:break-word">`;
    wrap.textContent = JSON.stringify(d);
    return html`<tr><th style="${style}">${l}</th><td style="${style};font-family:monospace">${wrap}</td>`;
  });
  return html`<table>${n}`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md","getCurrentPinnedName"], _2);
  main.variable(observer()).define(["md","dataTable","getCurrentLocalPath","getCurrentPath","getCurrentName","getCurrentPinnedName","getCurrentMetadata","getCurrentComparePath"], _3);
  main.variable(observer("getCurrentLocalPath")).define("getCurrentLocalPath", ["html"], _getCurrentLocalPath);
  main.variable(observer("getCurrentPath")).define("getCurrentPath", ["formatPath","getCurrentName"], _getCurrentPath);
  main.variable(observer("getCurrentName")).define("getCurrentName", ["getCurrentLocalPath"], _getCurrentName);
  main.variable(observer("getCurrentPinnedName")).define("getCurrentPinnedName", ["getCurrentMetadata","formatName","getCurrentName"], _getCurrentPinnedName);
  main.variable(observer("getCurrentMetadata")).define("getCurrentMetadata", ["getMetadata","getCurrentName"], _getCurrentMetadata);
  main.variable(observer("getCurrentComparePath")).define("getCurrentComparePath", ["getMetadata","getCurrentName","formatComparePath"], _getCurrentComparePath);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof preview_name")).define("viewof preview_name", ["params","html","nbMatch","Event"], _preview_name);
  main.variable(observer("preview_name")).define("preview_name", ["Generators", "viewof preview_name"], (G, _) => G.input(_));
  main.variable(observer()).define(["dataTable","formatLocalPath","preview_name","formatPath","formatSourcePath","getPinnedName","getPinnedPath","getSource","getMetadata"], _12);
  main.variable(observer("viewof compareLink")).define("viewof compareLink", ["html","params","nbMatch","Event"], _compareLink);
  main.variable(observer("compareLink")).define("compareLink", ["Generators", "viewof compareLink"], (G, _) => G.input(_));
  main.variable(observer()).define(["getMetadata","compareLink","formatComparePath","md"], _14);
  main.variable(observer("nbMatch")).define("nbMatch", _nbMatch);
  main.variable(observer("formatLocalPath")).define("formatLocalPath", _formatLocalPath);
  main.variable(observer("formatPath")).define("formatPath", ["domain","formatLocalPath"], _formatPath);
  main.variable(observer("formatSourcePath")).define("formatSourcePath", ["apiDomain","formatLocalPath"], _formatSourcePath);
  main.variable(observer("formatName")).define("formatName", _formatName);
  main.variable(observer("formatId")).define("formatId", _formatId);
  main.variable(observer("formatComparePath")).define("formatComparePath", ["domain","formatId"], _formatComparePath);
  main.variable(observer("getPinnedName")).define("getPinnedName", ["getMetadata"], _getPinnedName);
  main.variable(observer("getPinnedPath")).define("getPinnedPath", ["getMetadata","formatPath"], _getPinnedPath);
  main.variable(observer("getComparePath")).define("getComparePath", ["getMetadata","formatComparePath"], _getComparePath);
  main.variable(observer("getSource")).define("getSource", ["formatSourcePath"], _getSource);
  main.variable(observer("getMetadata")).define("getMetadata", ["getSource"], _getMetadata);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("params")).define("params", ["URLSearchParams","html"], _params);
  main.variable(observer("domain")).define("domain", _domain);
  main.variable(observer("apiDomain")).define("apiDomain", _apiDomain);
  main.variable(observer("dataTable")).define("dataTable", ["html"], _dataTable);
  return main;
}
