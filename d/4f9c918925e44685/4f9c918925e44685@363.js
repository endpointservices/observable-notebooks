function _1(md){return(
md`# Notebook Input

An input widget that parses various formats of notebook identifiers and optionally retrieves ID and metadata.
`
)}

async function _2(fetchMeta,md){return(
md`~~~js
import {notebookInput} from '${(await fetchMeta(document.baseURI)).slugPinned}'
~~~`
)}

function _data(notebookInput){return(
notebookInput({
  value: '@mootari/notebook-input',
  label: 'Notebook',
  width: '100%',
})
)}

function _4(html,data,DOM){return(
html`<table style="max-width:100%">${Object.entries(data).map(([k, v]) => html`<tr><th style="width:0;padding-right:1em">${k}</th><td>${DOM.text(v)}`)}`
)}

function _5(data){return(
data
)}

function _6(data){return(
`${data}`
)}

function _7(md){return(
md`---`
)}

function _notebookInput(DOM,html,Element,regIdentifier,fetchMeta,Event){return(
function notebookInput(options = {}) {
  const {
    submit: submitLabel = 'Submit',
    value = '',
    width = null,
    label = null,
    datalist = [],
    ...fetchMetaOptions
  } = options;

  const __ns__ = DOM.uid('scope').id;
  const css = `
#${__ns__} {
  font: 13px/1.2 var(--sans-serif);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  max-width: 100%;
  width: auto;
}
@media only screen and (min-width: 30em) {
  #${__ns__} {
    flex-wrap: nowrap;
    width: 360px;
  }
}
#${__ns__} label {
  width: 120px;
  padding: 5px 0 4px 0;
  margin-right: 6.5px;
  flex-shrink: 0;
}
#${__ns__} .${__ns__}-rcol {
  width: 100%;
}
#${__ns__} .${__ns__}-input {
  display: flex;
  align-items: center;
  width: 100%;
}
#${__ns__} input {
  font: inherit;
  width: inherit;
  box-sizing: border-box;
}
#${__ns__} output {
  display: block;
  margin-top: .5em;
  color: red;
}
#${__ns__} button {
  margin-left: 3.25px;
  flex-shrink: 2.5;
  font: inherit;
  width: inherit;
}
  `;
  
  const inputId = DOM.uid('input').id;
  const $label = label != null
    ? html`<label for="${inputId}">${label instanceof Element ? label : DOM.text(label)}`
    : '';
  const $submit = html`<button>${DOM.text(submitLabel)}`;
  const $input = html`<input id="${inputId}" type=text required placeholder="Notebook ID, slug or URL">`;
  const $error = html`<output>`;
  const $form = html`<form id=${__ns__}>
    ${$label}
    <div class="${__ns__}-rcol">
      <div class="${__ns__}-input">${$input} ${$submit}</div>
      ${$error}
    </div>
    ${html`<style>${css}`}`;
  const setValidity = msg => {
    if(arguments.length) $input.setCustomValidity(msg);
    // Required when setting custom validation on submit.
    setTimeout(() => $error.value = $input.validationMessage, 0);
    $submit.disabled = msg.length > 0;
  };
  if(width != null) $form.style.width = isNaN(width) ? width : `${width}px`;
  
  $input.value = value;
  $input.oninvalid = e => e.preventDefault();
  $input.oninput = e => {
    if(e) e.stopPropagation();
    setValidity('');
  };
  
  $form.onsubmit = e => {
    if(e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    if(!regIdentifier.test($input.value)) {
      setValidity('Invalid format.');
      return;
    }
    // Disable form while querying.
    $input.disabled = true;
    $submit.disabled = true;
    fetchMeta($input.value, fetchMetaOptions)
      .then(data => {
        const path = data.url ? new URL(data.url).pathname.slice(1) : null;
        if(data) {
          Object.defineProperty(data, 'toString', {value: () => path});
        }
        $form.value = data;
        $form.dispatchEvent(new Event('input'));
      })
      .catch(e => {
        setValidity('Notebook not found or inaccessible.');
      })
      .finally((v) => {
        $input.disabled = false;
        $submit.disabled = false;
      })
  };

  if(datalist.length) {
    const listId = `${inputId}-list`;
    const $list = html`<datalist id="${listId}">${datalist.map(v => html`<option ${{value: v}}>`)}`;
    $input.after($list);
    $input.setAttribute('list', listId);
  }
  
  $input.oninput();
  if($input.checkValidity()) $form.onsubmit();
  
  return $form;
}
)}

function _regIdentifier(){return(
new RegExp('^'
                     + '(?:(?:https:\/\/observablehq.com)?\/)?'
                     + '(?:'
                     + '(?:d\/)?(?<id>[a-f0-9]{16})'
                     + '|'
                     + '@(?<user>[0-9a-z-_]{2,})\/(?<slug>[0-9a-z-_]{1,}(?:\/\\d+)?)'
                     + ')'
                     + '(?:@(?<version>\\d+))?'
                     + '([?#]|$)')
)}

function _regV1Source(){return(
new RegExp('^'
                       + '\/\/ URL: (?<url>[^\\n]+)\\n'
                       + '\/\/ Title: (?<title>[^\\n]+)\\n'
                       + '\/\/ Author: (?<name>.+?) \\(@(?<login>[^\\)]+)\\)\\n'
                       + '\/\/ Version: (?<version>\\d+)\\n'
                       + '\/\/ Runtime version: 1\\n'
                       + '\\n'
                       + 'const m0 = \\{\\n'
                       + '  id: "(?<id>[a-f0-9]{16})')
)}

function _fetchMeta(regIdentifier,URLSearchParams,regV1Source,deriveMeta){return(
async function fetchMeta(identifier, { fallback = false, apiKey = null } = {}) {
  const match = identifier.match(regIdentifier);
  if (!match) return null;

  const { id, user, slug, version } = match.groups,
    path = id ? `/d/${id}` : `/@${user}/${slug}`,
    suffix = version ? `@${version}` : "",
    params = new URLSearchParams([
      ["v", 1],
      ...(apiKey == null ? [] : [["api_key", apiKey]])
    ]);

  return fetch(`https://api.observablehq.com${path}${suffix}.js?${params}`, {
    headers: { Range: "bytes=0-500" }
  })
    .then((r) => r.text())
    .then((s) => s.match(regV1Source).groups)
    .then(({ url, version, ...d }) => ({ ...d, ...deriveMeta(url, version) }))
    .catch((e) => {
      if (fallback) return { id, user, slug, version };
      throw e;
    });
}
)}

function _deriveMeta(){return(
function deriveMeta(url, version) {
  const path = new URL(url).pathname.slice(1);
  const slug = path.replace(/^d\//, '');
  const format = (ext, rev) => `https://api.observablehq.com/${path}${rev ? `@${rev}`: ''}${ext}?v=3`;
  return {
    version: version || null,
    slug,
    slugPinned: version ? `${slug}@${version}` : null,
    url,
    urlPinned: version ? `${url}@${version}` : null,
    module: format('.js'),
    modulePinned: version ? format('.js', version) : null,
    bundle: format('.tgz'),
    bundlePinned: version ? format('.tgz', version) : null,
    document: `https://api.observablehq.com/document/${path}`,
    documentPinned: version ? `https://api.observablehq.com/document/${path}@${version}` : null,
  };
}
)}

function _inferMeta(regIdentifier,deriveMeta){return(
function inferMeta(identifier) {
  const match = identifier.match(regIdentifier);
  if(!match) throw Error('Invalid identifier');
  
  const {id, user, slug, version} = match.groups;
  const path = id ? `/d/${id}` : `/@${user}/${slug}`;
  const suffix = version ? `@${version}` : '';
  return deriveMeta(`https://observablehq.com${path}`, version);
}
)}

function _html(htl){return(
htl.html
)}

function _15(html,regIdentifier){return(
html`<table>${
[
  'abcdef0123456789',
  'abcdef0123456789@456',
  'd/abcdef0123456789',
  '/d/abcdef0123456789',
  'https://observablehq.com/d/abcdef0123456789',
  'https://observablehq.com/@login/123-notebook-slug',
  'https://observablehq.com/@login/123-notebook-slug/123',
  'https://observablehq.com/@login/123-notebook-slug/123@456',
].map(s => html`<tr><td>${s.match(regIdentifier) ? '√' : 'x'}</td><td>${s}</td>`)}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["fetchMeta","md"], _2);
  main.variable(observer("viewof data")).define("viewof data", ["notebookInput"], _data);
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","data","DOM"], _4);
  main.variable(observer()).define(["data"], _5);
  main.variable(observer()).define(["data"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("notebookInput")).define("notebookInput", ["DOM","html","Element","regIdentifier","fetchMeta","Event"], _notebookInput);
  main.variable(observer("regIdentifier")).define("regIdentifier", _regIdentifier);
  main.variable(observer("regV1Source")).define("regV1Source", _regV1Source);
  main.variable(observer("fetchMeta")).define("fetchMeta", ["regIdentifier","URLSearchParams","regV1Source","deriveMeta"], _fetchMeta);
  main.variable(observer("deriveMeta")).define("deriveMeta", _deriveMeta);
  main.variable(observer("inferMeta")).define("inferMeta", ["regIdentifier","deriveMeta"], _inferMeta);
  main.variable(observer("html")).define("html", ["htl"], _html);
  main.variable(observer()).define(["html","regIdentifier"], _15);
  return main;
}
