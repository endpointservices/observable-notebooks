function _1(md){return(
md`# Notebook Input

An input widget that parses various formats of notebook identifiers and optionally retrieves ID and metadata.
`
)}

function _data(notebookInput){return(
notebookInput({
  value: '@mootari/notebook-input',
})
)}

function _3(html,data,DOM){return(
html`<table>${Object.entries(data).map(([k, v]) => html`<tr><th>${k}</th><td>${DOM.text(v)}`)}`
)}

function _4(data){return(
data
)}

function _5(data){return(
`${data}`
)}

function _6(md){return(
md`---`
)}

function _notebookInput(DOM,html,regIdentifier,fetchMeta,Event){return(
function notebookInput(options = {}) {
  const {
    submit: submitLabel = 'Submit',
    value = '',
    fallback = false,
  } = options;
  
  const id = DOM.uid().id,
        // Todo: butt-ugly form is butt-ugly.
        $style = html`<style>
#${id} input:invalid { color: red }
#${id} { font-family: var(--sans-serif) }
#${id} input, #${id} button, #${id} output {font-family: inherit }
#${id} output { display: inline-block; color: red; padding: 0; font-size: 13.333px}
        `,
        $submit = html`<button>${DOM.text(submitLabel)}`,
        $input = html`<input type=text required placeholder="Notebook ID, slug or URL">`,
        $error = html`<output>`,
        $form = html`<form id=${id}>${$input} ${$submit} ${$error}${$style}`,
        setValidity = msg => {
          if(arguments.length) $input.setCustomValidity(msg);
          // Required when setting custom validation on submit.
          setTimeout(() => $error.value = $input.validationMessage, 0);
          $submit.disabled = msg.length > 0;
        };
  
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
    fetchMeta($input.value, fallback)
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
                     + '$')
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

function _fetchMeta(regIdentifier,regV1Source){return(
async function fetchMeta(identifier, fallback = false) {
  const match = identifier.match(regIdentifier);
  if(!match) return null;
  
  const {id, user, slug, version} = match.groups,
        path = id ? `d/${id}` : `@${user}/${slug}`,
        suffix = version ? `@${version}` : '';
  
  return fetch(`https://api.observablehq.com/${path}${suffix}.js?v=1`)
    .then(r => r.text())
    .then(s => s.match(regV1Source).groups)
    .catch(e => {
      if(fallback) return {id, user, slug, version};
      throw e;
    })
}
)}

function _11(html,regIdentifier,DOM){return(
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
].map(s => html`<tr><td>${regIdentifier.test(s) ? '√' : 'x'}</td><td>${DOM.text(s)}</td>`)}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof data")).define("viewof data", ["notebookInput"], _data);
  main.variable(observer("data")).define("data", ["Generators", "viewof data"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","data","DOM"], _3);
  main.variable(observer()).define(["data"], _4);
  main.variable(observer()).define(["data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("notebookInput")).define("notebookInput", ["DOM","html","regIdentifier","fetchMeta","Event"], _notebookInput);
  main.variable(observer("regIdentifier")).define("regIdentifier", _regIdentifier);
  main.variable(observer("regV1Source")).define("regV1Source", _regV1Source);
  main.variable(observer("fetchMeta")).define("fetchMeta", ["regIdentifier","regV1Source"], _fetchMeta);
  main.variable(observer()).define(["html","regIdentifier","DOM"], _11);
  return main;
}
