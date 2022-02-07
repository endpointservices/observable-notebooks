// https://observablehq.com/@mootari/signature@547
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Signature - A Documentation Toolkit
<!-- keywords: javadoc docgen docblock -->

This notebook offers a set of documentation helpers.

`
)});
  main.variable(observer()).define(["md","PINNED_LIB"], function(md,PINNED_LIB){return(
md`
~~~js
import {signature, getPinnedSlug} from '${PINNED_LIB}'
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
Features:
- automatic formatting of function signatures
- simple configuration for descriptions and examples
- collapsible sections, optionally collapsed by default
- optional test runner
- theming support

For more examples in the wild please see [Toolbox](https://observablehq.com/d/691ae3b95f02db79).
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["signature","md"], function(signature,md){return(
signature(signature, {
  description: md`
Documentation template for functions. Extracts the function head from the function passed to **\`fn\`**:
- If \`fn\` is a named function, the head is returned as written. If \`name\` was set, it will replace the function name.
- If \`fn\` is an arrow function, the declaration will be reformatted and the \`function\` keyword injected. If \`name\` was set, it will be injected as the function name.
- Any other argument type is passed through unaltered.

**Note:** Javascript may infer the function name from the variable to which a function was first assigned.

All settings are optional. Available **\`options\`**:
${Object.entries({
      description: 'Rendered as Markdown if a string, otherwise passed through.',
      example:  'Single value or array of values. String values are formatted as Javascript code, everything else gets passed through.',
      name: 'Anchor name to link to. Defaults to function name.',
      scope: 'Class name to scope CSS selectors. Defaults to unique string.',
      css: 'The theme CSS. If \`scope\` is used, the CSS should start every selector with \`:scope\`. Defaults to \`signature_theme\`.',
      open: 'Boolean that controls the toggle state of the details wrapper. Set to \`null\` to disable collapsing.',
      tests: 'Object map of test functions, keyed by test name. Each function receives \`assert(condition, assertion)\`   as argument. Async functions are supported.',
      runTests: 'Boolean or Promise, controls test execution. Set to \`false\` to disable test output.',
      testRunner: 'Executes tests and builds results markup. See [\`defaultTestRunner()\`](#defaultTestRunner) for details.',
    }).map(([k,v]) => `- \`${k}:\` ${v}\n`)}`,
  example: [`
// Basic use
signature(myUsefulFunc, {
  description: "It's hard to describe how useful myUsefulFunc is. I use it all the time!"
})
  `, `
// Tests
signature(myTestedFunc, {
  tests: {
    'can retrieve data': async (assert) => {
      const data = await myTestedFunc().getData();
      assert(Array.isArray(data), 'data is array');
      assert(data.length, 'data is not empty');
    },
    'is this finished?': assert => {
      assert(myTestedFunc() !== 'todo: implement', 'actually implemented');
    },
    'Look, ma! No assert!': () => {
      try { myTestedFunc().notImplemented() }
      catch(e) { throw Error(\`Hey signature(), catch this! \${e}\`) };
    }
}})
  `,],
  tests: {
    'signature parsing': assert => {
      const test = (expect, name, fn) => {
        const sig = signature(fn, {name, formatter: ({signature:s}) => s.textContent.trim()});
        assert(expect === sig, `expected "${expect}", got "${sig}"`);
      };
      {test('function()', undefined, function(){})}
      {test('function foo1()', undefined, function foo1(){})}
      {test('function foo2()', 'foo2', function(){})}
      {test('function()', undefined, ()=>{})}
      {test('function foo3()', 'foo3', ()=>{})}
      {test('async function()', undefined, async ()=>{})}
      {test('async function foo4(a)', 'foo4', async a=>{})}
      {test('async function foo5()', undefined, async function foo5(){})}
      {test('async function foo5a()', 'foo5a', async function foo5(){})}
      {test('async function* foo6()', 'foo6', async function*(){})}
      {test('function*()', undefined, function * (){})}
      {test('function(a,b=({foo:"bar"}))', undefined, (a,b=({foo:"bar"}))=>{})}
    }
  }
})
)});
  main.variable(observer("signature")).define("signature", ["RUN_TESTS","defaultTestRunner","DOM","signature_theme","defaultFormatter","defaultSignatureParser","html","md","code"], function(RUN_TESTS,defaultTestRunner,DOM,signature_theme,defaultFormatter,defaultSignatureParser,html,md,code){return(
function signature(fn, options = {}) {
  const {
    name = typeof fn === 'function' && fn.name.length ? fn.name : null,
    description = null,
    example = null,
    open = true,
    
    tests = {},
    runTests = RUN_TESTS.promise,
    testRunner = defaultTestRunner,
    
    scope = DOM.uid('css-scope').id,
    css = signature_theme,
    formatter = defaultFormatter,
    
    signatureParser = defaultSignatureParser,
  } = options;
  
  const sig = typeof fn !== 'function' ? fn : signatureParser(fn, name);
  let testList = null;
  
  if(runTests && tests && Object.keys(tests).length) {
    const {list, run} = testRunner(tests);
    const button = html`<button>Run tests`, cta = html`<p class=cta>${button} to view results`;
    testList = html`<div class=tests>${[md`Test results:`, cta]}`;
    Promise.race([Promise.resolve(runTests), new Promise(r => button.onclick = r)])
      .then(() => (cta.replaceWith(list), run()));
  }
  
  return formatter({
    signature: typeof sig === 'string' ? code(sig) : sig,
    description: typeof description === 'string' ? md`${description}` : description,
    examples: (example == null ? [] : Array.isArray(example) ? example : [example])
      .map(v => typeof v === 'string' ? code(v) : v),
    testList,
  }, {name, open, css, scope});
}
)});
  main.variable(observer()).define(["signature","getPinnedSlug"], function(signature,getPinnedSlug){return(
signature(getPinnedSlug, {
  description: 'Retrieves the currently shared or published version of the given notebook identifier.',
  example: [
    `// Notebook slug
getPinnedSlug('@mootari/signature')`,
    `// Notebook ID
getPinnedSlug('3d9d1394d858ca97')`,
  ],
})
)});
  main.variable(observer("getPinnedSlug")).define("getPinnedSlug", function(){return(
async function getPinnedSlug(name) {
  const path = name[0] === '@' ? name : `d/${name}`;
  return fetch(`https://api.observablehq.com/${path}.js?v=3`)
    .then(r => r.text())
    .then(t => t.match(/^\/\/ [^\s]+(@\d+)/)[1])
    .catch(e => '')
    .then(v => name + v);
}
)});
  main.variable(observer()).define(["signature"], function(signature){return(
signature('PINNED', {
  name: 'PINNED',
  description: `
Notebook slug, automatically pointing to the most recent version of the importing notebook.
    
If the notebook identifier cannot be derived from the current URL, the string \`(error: name not detectable)\`  will be set instead.`,
  example: `md\`
~~~js
import {foo} from "\${PINNED}"
~~~
`
})
)});
  main.variable(observer("PINNED")).define("PINNED", ["regIdentifier","getPinnedSlug"], function(regIdentifier,getPinnedSlug)
{
  const match = document.baseURI.match(regIdentifier);
  if(!match) return '(error: name not detectable)';
  const {id, user, slug} = match.groups;
  return getPinnedSlug(id || `@${user}/${slug}`);
}
);
  main.variable(observer()).define(["signature","code"], function(signature,code){return(
signature(code, {
  description: `Creates syntax-highlighted output.`,
  example: `
const myCss = \`.container { background: red; }\`;
return code(myCss, {
  // Optional, defaults to Javascript. Supported languages:
  // 
  language: 'css',
  // Removes leading and trailing empty lines.
  trim: false
});`,
})
)});
  main.variable(observer("code")).define("code", ["md"], function(md){return(
function code(text, {type = 'javascript', trim = true, className = 'code'} = {}) {
  const out = md`\`\`\`${type}\n${!trim ? text : text.replace(/^\s*\n|\s+?$/g, '')}\n\`\`\``;
  if(className) out.classList.add('code');
  return out;  
}
)});
  main.variable(observer()).define(["signature","PINNED_LIB"], function(signature,PINNED_LIB){return(
signature('RUN_TESTS', {
  name: 'RUN_TESTS',
  description: `Button that triggers all tests that have not run yet.`,
  example: `
import {viewof RUN_TESTS} from "${PINNED_LIB}"
// In another cell:
viewof RUN_TESTS
`
})
)});
  main.variable(observer("viewof RUN_TESTS")).define("viewof RUN_TESTS", ["createStepper","html"], function(createStepper,html)
{
  const s = createStepper();
  const view = html`<div><button>Run all tests`;
  view.onclick = e => { e.stopPropagation(); s.next(); };
  view.value = s;
  return view;
}
);
  main.variable(observer("RUN_TESTS")).define("RUN_TESTS", ["Generators", "viewof RUN_TESTS"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Internals
`
)});
  main.variable(observer("signature_theme")).define("signature_theme", function(){return(
`
:scope {
  --line-color: #eee;
  border: 1px solid var(--line-color);
  padding: .5em 1em;
  margin-bottom: 1em;
}
:scope > div {
  border-top: 1px solid var(--line-color);
}
:scope > summary:focus {
  outline: none;
}
:scope > summary {
  padding-left: 1.2em;
  padding-top: 1em;
  position: relative;
}
:scope > summary::-webkit-details-marker {
  display: none;
}
:scope > summary:before {
  position: absolute;
  left: 0;
  content: "►";
}
:scope[open] > summary:before {
  content: "▼";
}
:scope .signature {
  display: flex;
  align-items: start;
}
:scope .signature pre {
  margin-top: 0;
}
:scope .examples .code {
  background: #f5f5f5;
  padding: .5rem;
}
:scope .link:before {
  content: "";
  display: block;
  width: 1rem;
height: 1.3rem;
  background: url(https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/32/link.png) center 100%/contain no-repeat;
  margin-left: .5rem;
  opacity: .3;
}
:scope .signature:hover .link:hover:before { opacity: 1}
:scope .tests .cta {
  font-style: italic;
}
:scope .tests th, :scope .tests td { padding: .25em .5em }
:scope .tests tr[data-status="pending"] { background: hsl(40,90%,90%); opacity: .5 }
:scope .tests tr[data-status="error"]   { background: hsl( 0,90%,90%)}
:scope .tests tr[data-status="success"] { background: hsl(90,90%,90%)}
`
)});
  main.variable(observer("createStepper")).define("createStepper", function(){return(
function createStepper() {
  let cb = ()=>{};
  const ret = {
    step: -1,
    next: () => {
      ret.step++;
      cb();
      ret.promise = new Promise(res=>cb=res);
      return ret;
    }
  };
  return ret.next();
}
)});
  main.variable(observer("defaultFormatter")).define("defaultFormatter", ["html","scopedStyle","md"], function(html,scopedStyle,md){return(
function defaultFormatter({signature, description, examples, testList}, {name, open, scope, css}) {
  return html`<${open == null ? 'div' : `details ${open ? 'open' : ''}`} class="${scope}">${[
    !css ? '' : scope == null ? css : scopedStyle('.' + scope, css),
    html`<${open == null ? 'div' : 'summary'} class=signature>${signature}${
!name || !name.length ? '' : html`<a class=link href="#${name}">`
}`,
    description == null ? '' : html`<div class=description>${description}`,
    !examples.length ? '' : html`<div class=examples>${[
      examples.length < 2 ? md`Example:` : md`Examples:`,
      ...examples
    ]}`,
    testList || '',
  ]}`;
}
)});
  main.variable(observer("defaultTestRunner")).define("defaultTestRunner", ["html","DOM"], function(html,DOM){return(
function defaultTestRunner(tests, options = {}) {
  const {
    assert = (cond, msg = 'error') => { if(!cond) throw msg },
    formatList = items => html`<table><thead><tr><th>Name</th><th>Result</th></tr><body>${items}`,
    formatItem = (name, status, msg) => {
      const state = status == null ? 'pending' : status ? 'success' : 'error';
      const icon = { pending: '⌛', success: '✅', error: '❗'}[state];
      return html`<tr data-status=${state}>
        <td>${DOM.text(name)}</td>
        <td><span title=${state}>${icon}</span> ${msg||''}</td>`;
    }
  } = options;
  
  const runners = Object.entries(tests).map(([name, fn]) => ({
    name,
    node: formatItem(name),
    run: async() => {
      try { await fn.call(null, assert); }
      catch(e) { return e; }
      return;
    }
  }));
  const list = formatList(runners.map(r => r.node));
  
  const run = () => Promise.all(runners.map(
    ({name, node, run}) => run().then(msg => node.replaceWith(formatItem(name, msg === undefined, msg)))
  ));
  
  return {list, run};
}
)});
  main.variable(observer("defaultSignatureParser")).define("defaultSignatureParser", function(){return(
function defaultSignatureParser(fn, name = null) {
  const src = fn.toString();
  let end = 0, r = 0;
  const next = c => {
    switch(c) {
      case '(': ++r; break;
      case ')': --r; break;
      case '{':
      case '=': if(r === 0) return false;
    }
    return true;
  }
  while(end < src.length && next(src[end++]));
  
  const sig = src.substring(0, end - 1).trim(),
        [prefix, mAsync, mFunc, mGen] = sig.match(/^(async\s*)?(function\s*)?(\*)?/),
        mName = mFunc
          ? (sig.substring(prefix.length).match(/^[^(]*/) || [])[0]
          : null,
        fnName = name !== null ? name.trim()
          : mName !== null ? mName.trim()
          : '',
        offset = prefix.length + (mName !== null ? mName.length : 0),
        suffix = sig.substring(offset).trim();

  return `${
    mAsync ? 'async ' : ''
  }function${
    mGen ? '*' : ''
  }${
    fnName.length ? ` ${fnName}` : ''
  }${
    suffix[0] === '(' ? suffix : `(${suffix})`
  }`;
}
)});
  main.variable(observer("scopedStyle")).define("scopedStyle", ["html"], function(html){return(
function scopedStyle(scope, css) {
  const style = html`<style>`;
  style.textContent = css.replace(/\:scope\b/g, scope); 
  return style;
}
)});
  main.variable(observer("regIdentifier")).define("regIdentifier", function(){return(
new RegExp('^'
                     + '(?:(?:https:\/\/(next\\.)?observablehq\\.com)?\/)?'
                     + '(?:'
                     + '(?:d\/)?(?<id>[a-f0-9]{16})'
                     + '|'
                     + '@(?<user>[0-9a-z-_]{2,})\/(?<slug>[0-9a-z-_]{1,}(?:\/\\d+)?)'
                     + ')'
                     + '(?:@(?<version>\\d+))?'
                     + '([?#]|$)')
)});
  main.variable(observer("PINNED_LIB")).define("PINNED_LIB", ["getPinnedSlug"], function(getPinnedSlug){return(
getPinnedSlug('@mootari/signature')
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Old docs - under construction
`
)});
  main.variable(observer("demoFunction")).define("demoFunction", function(){return(
function demoFunction(sw, sh, tw = null, th = null) {
  if(tw == null && th == null) return [sw, sh, 1];
  const ar = sw / sh;
  return tw == null || (th != null && ar < tw / th)
    ? [th * ar, th, th / sh]
    : [tw, tw / ar, tw / sw];
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Superstylin'

***Note:*** *This section is currently being reworked.*

To extend the base theme, first import it:
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
To override the CSS for a single instance, pass the default CSS along with your custom CSS:
`
)});
  main.variable(observer()).define(["signature","demoFunction","signature_theme"], function(signature,demoFunction,signature_theme){return(
signature(demoFunction, {
  description: `Scales dimensions proportionally to fit into the given width and/or height.`,
  example: `const [width, height, scale] = scaleContain(img.naturalWidth, img.naturalHeight, 500, 500);`,
  css: `
${signature_theme}
:scope {
  background: LightYellow;
  box-shadow: 1px 2px 5px -3px;
  font-family: sans-serif;
}
:scope .description {
  font-size: 1.2rem;
  font-style: italic;
}
:scope .examples .code {
  background: NavajoWhite;
}
  `,
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
If you want to override the CSS globally (and also have shared instead of scoped styles), use the following steps:
`
)});
  main.variable(observer()).define(["scopedStyle","signature_theme"], function(scopedStyle,signature_theme){return(
scopedStyle('.my-shared-scope', `
${signature_theme}
// Adds 
:scope { border: 10px solid #888 }
`)
)});
  main.variable(observer("myCustomSig")).define("myCustomSig", ["signature"], function(signature){return(
function myCustomSig(fn, options = {}) {
  return signature(fn, {scope: 'my-shared-scope', css: null, ...options});
}
)});
  main.variable(observer()).define(["myCustomSig","demoFunction"], function(myCustomSig,demoFunction){return(
myCustomSig(demoFunction, {
  description: `Scales dimensions proportionally to fit into the given width and/or height.`,
  example: `const [width, height, scale] = scaleContain(img.naturalWidth, img.naturalHeight, 500, 500);`,
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Testing

Tests can be incorporated into the documentation and executed
- by passing \`{runTests: true}\`, which will execute tests immediately,
- by clicking the \`Run tests\` button inside the documentation cell,
- or by passing a promise for \`runTests\`. This promise can be used to execute all tests on the page.

Select how tests should be run for the following example:
`
)});
  main.variable(observer("viewof runType")).define("viewof runType", ["DOM"], function(DOM){return(
DOM.select([
  'wait for interaction',
  'run immediately',
  'hide tests',
])
)});
  main.variable(observer("runType")).define("runType", ["Generators", "viewof runType"], (G, _) => G.input(_));
  main.variable(observer()).define(["signature","demoFunction","RUN_TESTS","runType","Promises"], function(signature,demoFunction,RUN_TESTS,runType,Promises){return(
signature(demoFunction, {
  description: `Scales dimensions proportionally to fit into the given width and/or height.`,
  example: `
const [width, height, scale] = scaleContain(img.naturalWidth, img.naturalHeight, 500, 500);
img.width = width;
img.height = height;
`,
  runTests: {
    'run immediately': true,
    'hide tests': false,
    'wait for interaction': RUN_TESTS.promise,
  }[runType],
  // Note: Tests contain deliberate errors to showcase the various states.
  tests: {
    'no target dimensions': assert => {
      ({}).callUndefined();
      const [w, h, s] = demoFunction(200, 150);
      assert(w === 200, 'width'); assert(h === 150, 'height'); assert(s === 1, 'scale');
    },
    'target width only': async assert => {
      await Promises.delay(3000);
      const [w, h, s] = demoFunction(200, 150, 2*200);
      assert(w === 2*200, 'width'); assert(h === 2*150, 'height'); assert(s === 2, 'scale');
    },
    'target height only': assert => {
      const [w, h, s] = demoFunction(200, 150, null, 2*150);
      assert(w === 2*200, 'width'); assert(h === 2*150, 'height'); assert(s === 2, 'scale');
    },
    'same aspect': assert => {
      const [w, h, s] = demoFunction(200, 150, 2*200, 2*150);
      assert(w === 2*200, 'width'); assert(h === 2*150, 'height'); assert(s === 2, 'scale');
    },
    'smaller aspect ratio': async assert => {
      await Promises.delay(2000);
      const [w, h, s] = demoFunction(200, 150, 3*200, 2*150);
      assert(w === 2*200, 'width'); assert(h === 2*150, 'height'); assert(s === 0, 'scale');
    },
    'greater aspect ratio': assert => {
      const [w, h, s] = demoFunction(200, 150, 3*200, 2*150);
      assert(w === 2*200, 'width'); assert(h === 2*150, 'height'); assert(s === 2, 'scale');
    },
  }
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
## Contributions

- Thanks to [Fati Chen](https://observablehq.com/@stardisblue) for discovering badly handled cases in the signature parsing, and for suggesting improvements regarding name overrides.
`
)});
  return main;
}
