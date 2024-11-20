function _1(__SECRET_SWITCHER,md){return(
md`# React

...in Observable!

${__SECRET_SWITCHER('@j-f1/react')}

You probably want to use \`@j-f1/react-16\` because this notebook will follow major version updates, which could break your code.`
)}

function _2(Generators,html,DOM,MutationObserver){return(
Generators.observe(notify => {
  let headings = [];

  function observed() {
    const h = Array.from(document.querySelectorAll('h2,h3,h4,h5,h6'));
    if (h.length !== headings.length || h.some((h, i) => headings[i] !== h)) {
      notify(html`<b>Table of Contents</b><ul>${Array.from(headings = h, h => {
        const level = parseInt(h.tagName.slice(1)) - 1;
        return Object.assign(
          html`${level > 1 ? '<ul>'.repeat(level-1) + '<li>' : '<li>'}<a href=#${h.id}>${DOM.text(h.textContent)}`,
          {onclick: e => (e.preventDefault(), h.scrollIntoView())}
        );
      })}`);
    }
  }

  const observer = new MutationObserver(observed);
  observer.observe(document.body, {childList: true, subtree: true});
  observed();
  return () => observer.disconnect();
})
)}

function _3(md){return(
md`## Example

(more examples [below](#more_examples))`
)}

function _4(render,jsx){return(
render(() => jsx`<p>Hello, world!</p>`)
)}

function _exampleText(render,useState,jsx,ExampleCounter,exampleCount,useCallback){return(
render(({ useSetter }) => {
  const [value, setValue] = useState("");
  useSetter(value);
  return jsx`
    <${ExampleCounter} number=${exampleCount} />
    <input
      type="text"
      placeholder="Enter some text..."
      value=${value}
      onChange=${useCallback(event => setValue(event.target.value), [setValue])}
    />
  `;
})
)}

function _6(exampleText){return(
exampleText
)}

function _ExampleCounter(component,jsx){return(
component(
  ({ number }) => jsx`
    <p>
      <strong>${number}</strong>${' '}
      second${number === 1 ? ' has' : 's have'} elapsed
      <br />
    </p>
  `
)
)}

function* _exampleCount(Promises)
{
  let i = 0;
  yield 0;
  while (true) {
    yield Promises.delay(1000, ++i);
  }
}


function _9(md){return(
md`Notice that the function returned by \`component()\` only changes when the component’s code changes.
This means that updates to values used by the component (like \`count\` above) don’t reset the component’s
state (they do trigger a re-render though). However, changing the component’s code does change the
returned component function, which means you can’t accidentally violate [the rules of hooks](https://reactjs.org/docs/hooks-rules.html) during development.

For a full example notebook, check out the [Golden Number Calculator](https://observablehq.com/@vorth/react-golden-calculator) by <a style="color: black; font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" href="https://observablehq.com/@vorth">@vorth</a>.`
)}

function _10(md){return(
md`---

## API & Docs

<small>First, a note. If you have any ideas for how to improve the notebook, edit this page, click the “⋯” menu at the top, and click “Suggest…” to send me a suggestion with your comments or proposed changes.</small>`
)}

function _11(md){return(
md`The \`render\` function takes a function that returns JSX and renders said JSX to a \`<div>\` that it returns using \`react-dom\`. The returned element will change when you alter the source code of the passed function (meaning that the component will remain the same if only the variables you reference change). You can safely use Hooks in this function.

Your render function is passed an object containing three keys: \`getValue\`, \`setValue\`, and \`useSetter\`. These allow you to take advantage of Observable’s \`viewof\` functionality:
* \`getValue()\` returns the current value of the view.
* <code>setValue(*newValue*)</code> will immediately update the view’s value.
* <code>useSetter(*setter*[, *deps*])</code> will set the view’s value to the result of \`setter(currentValue)\` whenever one of the \`deps\` change. It’s very similar to \`useEffect\`.
* <code>useSetter(*value*)</code> will set the view’s value to \`value\` whenever the component is rendered. Note that this won’t work if you do \`useSetter(ref.current)\` because changing the \`current\` property of the ref won’t trigger a re-render.

For some more advanced use cases (usually where you call \`render\` in a helper function), you can pass a second parameter to \`render\` to help it cache properly. It can take one of two types of value:

* a key (string) which will be added to your function’s code as a cache key. This can be used to keep a lightweight API by passing the string value of a renderer function your code will be called with, although I’m sure there are other things that it could be used for.
* an HTML element that was previously returned from \`render()\`. If your helper is expected to be used at the top level of a cell, tell your users to pass \`this\` into your helper — it’s the currently rendered HTML element which can be passed to \`render\`.`
)}

function _render(__SECRET_INTERNALS,__SECRET_CREATE_ID,DOM,useEffect,ReactDOM,createElement){return(
(render, keyOrElement) =>
  __SECRET_INTERNALS('elements', String(render), keyOrElement, {
    init: state => ({
      renderer: () => state.render(state.public),
      id: __SECRET_CREATE_ID(),
      element: DOM.element('div'),
      public: {
        useSetter: (setterOrValue, deps) =>
          typeof setterOrValue === 'function'
            ? useEffect(
                () =>
                  state.public.setValue(setterOrValue(state.public.getValue())),
                deps
              )
            : useEffect(() => state.public.setValue(setterOrValue), [
                setterOrValue
              ]),
        getValue: () => state.element.value,
        setValue: value => {
          state.element.value = value;
          state.element.dispatchEvent(new CustomEvent('input'));
        }
      }
    }),
    update: { render },
    effect: state =>
      ReactDOM.render(createElement(state.renderer), state.element),
    return: state => state.element
  })
)}

function _13(md){return(
md`The \`component\` function is like \`render\` except that it passes props to the function instead of the metadata object and returns a function component instead of an element. Note that this notebook does not provide you a way to create class components that depend on other Observable values while still keeping their state, but you should be able to render class components by referencing them in a function component like you do in vanilla React.

Similarly to \`render\`, you can pass a key or previous result in for similar advanced use cases. (Except with \`component\`, the \`this\` value should be a component fucntion previously returned)`
)}

function _component(__SECRET_INTERNALS,__SECRET_SET_DISPLAYNAME){return(
(render, name, keyOrPrevious) =>
  __SECRET_INTERNALS('components', String(render), keyOrPrevious, {
    init: (state, funcFor) => ({
      component: __SECRET_SET_DISPLAYNAME(funcFor('render'), name)
    }),
    update: { render },
    return: state => state.component
  })
)}

function _15(md){return(
md`The \`jsx\` function provides a copy of [\`htm\`](https://github.com/developit/htm) that’s already hooked up to React. It’s called \`jsx\` instead of \`html\` so you can import it and still use the \`html\` tag. Note that this isn’t actually JSX syntax, there are a few differences:

- components that start with a capital letter have to be referred to as \`<${"${Foo}"} />\` rather than \`<Foo />\`
- props that are passed a non-string need to have the braces prefixed with a \`$\`: \`<input value=${"${value}"} />\`
- spread props have to have the \`...\` outside the \`${"${}"}\` — \`<div ...${"${props}"} />\`
- instead of fragments (\`<><div/><span/></>\`), you can just pass multiple elements: \`\`jsx\`<div/><span/>\` \`\`
- quotes are optional for string props — \`<input type=text>\`
- components can be closed without duplicating the name — \`<${"${Foo}"}>...<//>\``
)}

function _jsx(htm,createElement)
{
  const jsx = htm.bind(createElement);
  return (...args) => {
    try {
      return jsx(...args);
    } catch (e) {
      // throw a clearer error
      let stack = e.stack;
      if (!stack.includes(e.message)) {
        stack = `${e.constructor.name}: ${e.message}\n${stack}`;
      }
      throw new SyntaxError('JSX syntax error\n' + stack);
    }
  };
}


function _17(md){return(
md`### Debugging

When developing code, you might encounter an error message that says React is unable to provide the actual error message.`
)}

function _18(md){return(
md`To see the actual error message, replace your import of \`@j-f1/react\` with these two cells:

\`\`\`js
dev = false

import { ... whatever you were importing before ... } with { dev } from '@j-f1/react'
\`\`\`

This will disable a bunch of React’s error checking, however, so it’s best to change \`dev\` back to \`true\` once you’ve fixed the bug.`
)}

function _19(md){return(
md`### Less common APIs`
)}

function _20(md){return(
md`The \`memo\` function is a version of \`component()\` that wraps your component in \`React.memo\`.
The \`keyOrElement\` parameter is fully optional and identical to the one in \`render\`.`
)}

function _memo(__SECRET_INTERNALS,React,__SECRET_SET_DISPLAYNAME){return(
(render, arePropsEqual, name, keyOrElement) =>
  __SECRET_INTERNALS(
    'memos',
    JSON.stringify([String(render), String(arePropsEqual)]),
    keyOrElement,
    {
      init: (state, funcFor) => ({
        component: React.memo(
          __SECRET_SET_DISPLAYNAME(funcFor('render'), name),
          funcFor('arePropsEqual')
        )
      }),
      update: { render, arePropsEqual },
      return: state => state.component
    }
  )
)}

function _22(md){return(
md`The \`forwardRef\` function is a version of \`component()\` that wraps your component in \`React.forwardRef\`.
The \`keyOrElement\` parameter fully optional and is identical to the one in \`render\`.`
)}

function _forwardRef(__SECRET_INTERNALS,React,__SECRET_SET_DISPLAYNAME){return(
(render, name, keyOrElement) =>
  __SECRET_INTERNALS('forwardRefs', String(render), keyOrElement, {
    init: (state, funcFor) => ({
      component: React.forwardRef(
        __SECRET_SET_DISPLAYNAME(funcFor('render'), name)
      )
    }),
    update: { render },
    return: state => state.component
  })
)}

function _24(md){return(
md`---
## Dependencies

This is the [\`htm\`](https://npm.im/htm) library.`
)}

function _htm(require){return(
require('htm@2.2.1/dist/htm.umd.js')
)}

function _versionRangeDoc(md){return(
md`
You can pass a different \`versionRange\` using Observable’s \`import\`…\`with\` syntax to load a different React version.
You can also pass an object with \`react\` and \`dom\` keys to load different versions of React and React DOM.

You should be fine without specifying a version number since the React team is reluctant to make breaking changes, but it’s possible your code will break in the future if you don’t.
`
)}

function _versionRange(){return(
'latest'
)}

function _28(md){return(
md`Set this to \`false\` using Observable’s \`import\`…\`with\` syntax for better performance but less debugging information. Checkout [React’s docs](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) for some additional explanation.`
)}

function _dev(){return(
true
)}

function _30(md){return(
md`These are the React and React DOM imports. If you need to access APIs that haven’t been re-exported below, feel free to import these variables, like I do in the [Suspense-enabled version of this notebook](https://observablehq.com/@j-f1/react-experimental).`
)}

function _React(__SECRET_REQUIRE){return(
__SECRET_REQUIRE('react')
)}

function _ReactDOM(__SECRET_REQUIRE){return(
__SECRET_REQUIRE('react-dom')
)}

function _33(md){return(
md`---
## Private APIs
These are private APIs used to make the whole shebang work. As a user of this notebook, you don’t need to worry about them. Additionally, they can change at any time, so if you’re going to directly use them make sure to pin the notebook version.`
)}

function ___SECRET_INTERNALS(__SECRET_STATE){return(
function cache(
  type,
  key,
  ctx,
  { init, update, effect, return: returnValue }
) {
  const fullKey = typeof ctx === 'string' ? key + '\n' + ctx : key;
  const prevResult =
    typeof ctx === 'object' || typeof ctx === 'function' ? ctx : null;

  const updateAndReturn = state => {
    Object.assign(state, update);
    if (effect) effect(state);
    const ret = returnValue(state);
    try {
      ret[__SECRET_STATE] = state;
    } catch {}
    return ret;
  };

  if (prevResult) {
    return updateAndReturn(prevResult[__SECRET_STATE]);
  }

  if (!cache[type]) cache[type] = Object.create(null);
  if (!cache[type][fullKey]) {
    const state = Object.create(null);
    Object.assign(
      state,
      init(state, subkey => (...args) => state[subkey](...args))
    );
    cache[type][fullKey] = state;
  }
  return updateAndReturn(cache[type][fullKey]);
}
)}

function ___SECRET_CREATE_ID(){return(
() =>
  Number(
    Math.random()
      .toString()
      .slice(2)
  ).toString(36)
)}

function ___SECRET_SET_DISPLAYNAME(){return(
(f, name) => {
  f.displayName = name;
  return f;
}
)}

async function ___SECRET_DOC(require,DOM,MutationObserver,React,ReactDOM)
{
  const { Inspector } = await require('@observablehq/inspector');
  const doc = (url, name, value) => {
    const node = DOM.element('span');
    const inspector = new Inspector(node);
    inspector.fulfilled(value, name);
    const nameEl = node.querySelector('.observablehq--cellname');
    const clobberName = () =>
      (nameEl.innerHTML = `<a href="${url}">${name}</a> = `);
    clobberName();
    new MutationObserver(clobberName).observe(nameEl.parentNode, {
      childList: true,
      attributes: true
    });
    node.value = value;
    return node;
  };
  return Object.assign(doc, {
    react: (name, id = 'react' + name.toLowerCase()) =>
      doc('https://reactjs.org/docs/react-api.html#' + id, name, React[name]),
    hook: name =>
      doc(
        'https://reactjs.org/docs/hooks-reference.html#' + name.toLowerCase(),
        name,
        React[name]
      ),
    dom: (name, id = name.toLowerCase()) =>
      doc('https://reactjs.org/docs/react-dom.html#' + id, name, ReactDOM[name])
  });
}


function ___SECRET_SWITCHER(html,DOM,md){return(
current => {
  const link = (name, owner = 'j-f1') => {
    const slug = `@${owner}/${name}`;
    return slug === current
      ? html`<code><strong>${DOM.text(slug)}</strong></code> (this notebook)`
      : html`<a href="https://observablehq.com/${slug}"><code>${DOM.text(
          slug
        )}`;
  };
  return md`
${
  current === '@j-f1/react'
    ? ''
    : `
You can use it in exactly the same ways as the original notebook, and you should be able to simply swap

~~~js
import { ... } from '@j-f1/react'
~~~

with

~~~js
import { ... } from '${current}'
~~~
`
}
Other notebooks in this series:
- ${link('react')}, which always uses the latest stable version of React
- ${link('react-16')}, which always uses the latest stable version of
  React 16.x. (You can also do this by [manually specifying the React version](#versionRangeDoc))
- ${link('react-experimental')}, which always uses the latest **experimental**
  version of React.
  `;
}
)}

function ___SECRET_REQUIRE(require,versionRange,dev){return(
require.alias({
  react: `https://unpkg.com/react@${versionRange.react ||
    versionRange}/umd/react.${dev ? 'development' : 'production.min'}.js`,
  'react-dom': `https://unpkg.com/react-dom@${versionRange.dom ||
    versionRange}/umd/react-dom.${dev ? 'development' : 'production.min'}.js`
})
)}

function ___SECRET_STATE(){return(
Symbol('rendered state')
)}

function _41(md){return(
md`---
## React re-exports

These allow you to import various helpful functions directly from this notebook instead of having to prefix them with \`React.\` when using them.

### Creating React Elements`
)}

function _createElement(__SECRET_DOC){return(
__SECRET_DOC.react('createElement', 'createlement')
)}

function _createFactory(__SECRET_DOC){return(
__SECRET_DOC.react('createFactory', 'creatfactory')
)}

function _44(md){return(
md`### Transforming Elements`
)}

function _cloneElement(__SECRET_DOC){return(
__SECRET_DOC.react('cloneElement', 'cloneelement')
)}

function _isValidElement(__SECRET_DOC){return(
__SECRET_DOC.react('isValidElement', 'isvalidelement')
)}

function _Children(__SECRET_DOC){return(
__SECRET_DOC.react('Children')
)}

function _48(md){return(
md`### Fragments`
)}

function _Fragment(__SECRET_DOC){return(
__SECRET_DOC.react('Fragment')
)}

function _50(md){return(
md`### Refs`
)}

function _createRef(__SECRET_DOC){return(
__SECRET_DOC.react('createRef')
)}

function _52(md){return(
md`<code>[forwardRef](https://reactjs.org/docs/react-api.html#reactforwardref) = [</code>see [above](#forwardRef)\`]\`

### Suspense

*See my [separate notebook](https://observablehq.com/@j-f1/react-experimental) for full Suspense/Concurrent Mode support.*`
)}

function _lazy(__SECRET_DOC){return(
__SECRET_DOC.react('lazy')
)}

function _Suspense(__SECRET_DOC){return(
__SECRET_DOC.react('Suspense')
)}

function _StrictMode(__SECRET_DOC){return(
__SECRET_DOC.react('StrictMode')
)}

function _56(md){return(
md`### Context`
)}

function _createContext(__SECRET_DOC,React){return(
__SECRET_DOC(
  'https://reactjs.org/docs/context.html#reactcreatecontext',
  'createContext',
  React.createContext
)
)}

function _58(md){return(
md`### Hooks
#### Basic Hooks`
)}

function _useState(__SECRET_DOC){return(
__SECRET_DOC.hook('useState')
)}

function _useEffect(__SECRET_DOC){return(
__SECRET_DOC.hook('useEffect')
)}

function _useContext(__SECRET_DOC){return(
__SECRET_DOC.hook('useContext')
)}

function _62(md){return(
md`#### Additional Hooks`
)}

function _useReducer(__SECRET_DOC){return(
__SECRET_DOC.hook('useReducer')
)}

function _useCallback(__SECRET_DOC){return(
__SECRET_DOC.hook('useCallback')
)}

function _useMemo(__SECRET_DOC){return(
__SECRET_DOC.hook('useMemo')
)}

function _useRef(__SECRET_DOC){return(
__SECRET_DOC.hook('useRef')
)}

function _useImperativeHandle(__SECRET_DOC){return(
__SECRET_DOC.hook('useImperativeHandle')
)}

function _useLayoutEffect(__SECRET_DOC){return(
__SECRET_DOC.hook('useLayoutEffect')
)}

function _useDebugValue(__SECRET_DOC){return(
__SECRET_DOC.hook('useDebugValue')
)}

function _70(md){return(
md`### React DOM

**Note**: the regular \`ReactDOM.render\` function isn’t exported since the provided \`render\` function above is better for use with Observable.`
)}

function _createPortal(__SECRET_DOC){return(
__SECRET_DOC.dom('createPortal')
)}

function _more_examples(md){return(
md`---
## More Examples`
)}

function _73(exampleObject){return(
exampleObject
)}

function _exampleObject(render,useState,jsx,ExampleRadio){return(
render(({ useSetter }) => {
  const [message, setMessage] = useState('Hello, form!');
  const [hue, setHue] = useState(180);
  const [size, setSize] = useState(24);
  useSetter({ message, hue, size });
  return jsx`<form>
    <div>
      <label>
        <input type=text value=${message} onChange=${e =>
    setMessage(e.target.value)} />
        ${' '}<i>message</i>
      </label>
    </div>
    <div>
      <label>
        <input type=range min=0 max=360 value=${hue} onChange=${e =>
    setHue(e.target.valueAsNumber)} />
        ${' '}<i style=${{ color: `hsl(${hue}deg, 100%, 30%)` }}>hue</i>
      </label>
    </div>
    <div>
      <${ExampleRadio} label="small" value=${12} setValue=${setSize} current=${size} />${' '}
      <${ExampleRadio} label="medium" value=${24} setValue=${setSize} current=${size} />${' '}
      <${ExampleRadio} label="large" value=${48} setValue=${setSize} current=${size} />
    </div>
  </form>`;
})
)}

function _ExampleRadio(component,jsx){return(
component(
  ({ label, value, setValue, current }) => jsx` 
    <label>
      <input
        type="radio"
        checked=${current === value}
        onChange=${() => setValue(value)}
      />
      ${' '}<i>${label}</i>
    </label>
  `
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["__SECRET_SWITCHER","md"], _1);
  main.variable(observer()).define(["Generators","html","DOM","MutationObserver"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["render","jsx"], _4);
  main.variable(observer("viewof exampleText")).define("viewof exampleText", ["render","useState","jsx","ExampleCounter","exampleCount","useCallback"], _exampleText);
  main.variable(observer("exampleText")).define("exampleText", ["Generators", "viewof exampleText"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleText"], _6);
  main.variable(observer("ExampleCounter")).define("ExampleCounter", ["component","jsx"], _ExampleCounter);
  main.variable(observer("exampleCount")).define("exampleCount", ["Promises"], _exampleCount);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("render")).define("render", ["__SECRET_INTERNALS","__SECRET_CREATE_ID","DOM","useEffect","ReactDOM","createElement"], _render);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("component")).define("component", ["__SECRET_INTERNALS","__SECRET_SET_DISPLAYNAME"], _component);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("jsx")).define("jsx", ["htm","createElement"], _jsx);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("memo")).define("memo", ["__SECRET_INTERNALS","React","__SECRET_SET_DISPLAYNAME"], _memo);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("forwardRef")).define("forwardRef", ["__SECRET_INTERNALS","React","__SECRET_SET_DISPLAYNAME"], _forwardRef);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("htm")).define("htm", ["require"], _htm);
  main.variable(observer("versionRangeDoc")).define("versionRangeDoc", ["md"], _versionRangeDoc);
  main.variable(observer("versionRange")).define("versionRange", _versionRange);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("dev")).define("dev", _dev);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("React")).define("React", ["__SECRET_REQUIRE"], _React);
  main.variable(observer("ReactDOM")).define("ReactDOM", ["__SECRET_REQUIRE"], _ReactDOM);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("__SECRET_INTERNALS")).define("__SECRET_INTERNALS", ["__SECRET_STATE"], ___SECRET_INTERNALS);
  main.variable(observer("__SECRET_CREATE_ID")).define("__SECRET_CREATE_ID", ___SECRET_CREATE_ID);
  main.variable(observer("__SECRET_SET_DISPLAYNAME")).define("__SECRET_SET_DISPLAYNAME", ___SECRET_SET_DISPLAYNAME);
  main.variable(observer("__SECRET_DOC")).define("__SECRET_DOC", ["require","DOM","MutationObserver","React","ReactDOM"], ___SECRET_DOC);
  main.variable(observer("__SECRET_SWITCHER")).define("__SECRET_SWITCHER", ["html","DOM","md"], ___SECRET_SWITCHER);
  main.variable(observer("__SECRET_REQUIRE")).define("__SECRET_REQUIRE", ["require","versionRange","dev"], ___SECRET_REQUIRE);
  main.variable(observer("__SECRET_STATE")).define("__SECRET_STATE", ___SECRET_STATE);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof createElement")).define("viewof createElement", ["__SECRET_DOC"], _createElement);
  main.variable(observer("createElement")).define("createElement", ["Generators", "viewof createElement"], (G, _) => G.input(_));
  main.variable(observer("viewof createFactory")).define("viewof createFactory", ["__SECRET_DOC"], _createFactory);
  main.variable(observer("createFactory")).define("createFactory", ["Generators", "viewof createFactory"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("viewof cloneElement")).define("viewof cloneElement", ["__SECRET_DOC"], _cloneElement);
  main.variable(observer("cloneElement")).define("cloneElement", ["Generators", "viewof cloneElement"], (G, _) => G.input(_));
  main.variable(observer("viewof isValidElement")).define("viewof isValidElement", ["__SECRET_DOC"], _isValidElement);
  main.variable(observer("isValidElement")).define("isValidElement", ["Generators", "viewof isValidElement"], (G, _) => G.input(_));
  main.variable(observer("viewof Children")).define("viewof Children", ["__SECRET_DOC"], _Children);
  main.variable(observer("Children")).define("Children", ["Generators", "viewof Children"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("viewof Fragment")).define("viewof Fragment", ["__SECRET_DOC"], _Fragment);
  main.variable(observer("Fragment")).define("Fragment", ["Generators", "viewof Fragment"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("viewof createRef")).define("viewof createRef", ["__SECRET_DOC"], _createRef);
  main.variable(observer("createRef")).define("createRef", ["Generators", "viewof createRef"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("viewof lazy")).define("viewof lazy", ["__SECRET_DOC"], _lazy);
  main.variable(observer("lazy")).define("lazy", ["Generators", "viewof lazy"], (G, _) => G.input(_));
  main.variable(observer("viewof Suspense")).define("viewof Suspense", ["__SECRET_DOC"], _Suspense);
  main.variable(observer("Suspense")).define("Suspense", ["Generators", "viewof Suspense"], (G, _) => G.input(_));
  main.variable(observer("viewof StrictMode")).define("viewof StrictMode", ["__SECRET_DOC"], _StrictMode);
  main.variable(observer("StrictMode")).define("StrictMode", ["Generators", "viewof StrictMode"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("viewof createContext")).define("viewof createContext", ["__SECRET_DOC","React"], _createContext);
  main.variable(observer("createContext")).define("createContext", ["Generators", "viewof createContext"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("viewof useState")).define("viewof useState", ["__SECRET_DOC"], _useState);
  main.variable(observer("useState")).define("useState", ["Generators", "viewof useState"], (G, _) => G.input(_));
  main.variable(observer("viewof useEffect")).define("viewof useEffect", ["__SECRET_DOC"], _useEffect);
  main.variable(observer("useEffect")).define("useEffect", ["Generators", "viewof useEffect"], (G, _) => G.input(_));
  main.variable(observer("viewof useContext")).define("viewof useContext", ["__SECRET_DOC"], _useContext);
  main.variable(observer("useContext")).define("useContext", ["Generators", "viewof useContext"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("viewof useReducer")).define("viewof useReducer", ["__SECRET_DOC"], _useReducer);
  main.variable(observer("useReducer")).define("useReducer", ["Generators", "viewof useReducer"], (G, _) => G.input(_));
  main.variable(observer("viewof useCallback")).define("viewof useCallback", ["__SECRET_DOC"], _useCallback);
  main.variable(observer("useCallback")).define("useCallback", ["Generators", "viewof useCallback"], (G, _) => G.input(_));
  main.variable(observer("viewof useMemo")).define("viewof useMemo", ["__SECRET_DOC"], _useMemo);
  main.variable(observer("useMemo")).define("useMemo", ["Generators", "viewof useMemo"], (G, _) => G.input(_));
  main.variable(observer("viewof useRef")).define("viewof useRef", ["__SECRET_DOC"], _useRef);
  main.variable(observer("useRef")).define("useRef", ["Generators", "viewof useRef"], (G, _) => G.input(_));
  main.variable(observer("viewof useImperativeHandle")).define("viewof useImperativeHandle", ["__SECRET_DOC"], _useImperativeHandle);
  main.variable(observer("useImperativeHandle")).define("useImperativeHandle", ["Generators", "viewof useImperativeHandle"], (G, _) => G.input(_));
  main.variable(observer("viewof useLayoutEffect")).define("viewof useLayoutEffect", ["__SECRET_DOC"], _useLayoutEffect);
  main.variable(observer("useLayoutEffect")).define("useLayoutEffect", ["Generators", "viewof useLayoutEffect"], (G, _) => G.input(_));
  main.variable(observer("viewof useDebugValue")).define("viewof useDebugValue", ["__SECRET_DOC"], _useDebugValue);
  main.variable(observer("useDebugValue")).define("useDebugValue", ["Generators", "viewof useDebugValue"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("viewof createPortal")).define("viewof createPortal", ["__SECRET_DOC"], _createPortal);
  main.variable(observer("createPortal")).define("createPortal", ["Generators", "viewof createPortal"], (G, _) => G.input(_));
  main.variable(observer("more_examples")).define("more_examples", ["md"], _more_examples);
  main.variable(observer()).define(["exampleObject"], _73);
  main.variable(observer("viewof exampleObject")).define("viewof exampleObject", ["render","useState","jsx","ExampleRadio"], _exampleObject);
  main.variable(observer("exampleObject")).define("exampleObject", ["Generators", "viewof exampleObject"], (G, _) => G.input(_));
  main.variable(observer("ExampleRadio")).define("ExampleRadio", ["component","jsx"], _ExampleRadio);
  return main;
}
