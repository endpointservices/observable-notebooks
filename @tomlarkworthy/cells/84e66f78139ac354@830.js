function _1(md){return(
md`
# Hypertext literal reconciliation with nanomorph


I love the [hypertext literal](https://observablehq.com/@observablehq/htl). It is intuitive. However, naive application of it tends to invalidate state between renders leading to poor UX.

React solved this problem with a [reconciliation](https://reactjs.org/docs/reconciliation.html) algorithm. However, React is very complicated and does not gel with Observable.

This notebook is an idea to try and get a React-like reconciliation algorithm applied to the hypertext literal in an Observable native way. We exploit the \`this\` variable to retrieve the previous DOM state allowing us to diff from the previous cell UI state. 

~~~js
import {reconcile, html} from '@tomlarkworthy/reconcile-nanomorph'
~~~

This library was used to build a [reactive unit testing framework](https://observablehq.com/@tomlarkworthy/testing).
`
)}

function _2(md){return(
md`
## Demo of problem

If we have some state defined elsewhere, say a list of messages:-

`
)}

function _msgs(){return(
["How are you?", "I am great!, loving Observable"]
)}

function _4(md){return(
md`
We can create a very simple chat UI using the hypertext literal to change this external state. I love this construction as it can hold its own state and helper functions. 
`
)}

function _5(msgs,$0,htl)
{
  async function sendMsg(evt) {
    if (evt.keyCode === 13) {
      console.log(msgs);
      $0.value = msgs.concat([evt.target.value]);
    }
  }
  return htl.html`
    ${msgs.map((msg) => htl.html`<p>${msg}</p>`)}
    <input class="text" onkeydown=${sendMsg}></input>
    <button onclick=${() => ($0.value = [])}>clear</button>
  `;
}


function _6(md){return(
md`
This is very simple to understand, but there are some problems with the UX. After sending a message, the focus of the cursor is lost. This is because when the list changes, the HTML is rebuilt from scratch, and all DOM state is lost, including the focus. So its impossible to send lots of messages in a row, you keep having to click back into the text area!
`
)}

function _7(md){return(
md`
## Solution Attempt

Create a custom \`reconcile\` function for DOM state diffing. Unlike React and Preact, we do not use a virtual DOM. Instead we compare the previous DOM state to the new hypertext literal HTMLElement. You can get the previous state of a cell with the keyword [\`this\`](https://talk.observablehq.com/t/get-the-previous-value-of-a-cell-when-its-edited-and-saved/792).

To reuse the previous state and apply a diff we add 

         reconcile(this, <HTMLElement>)

where we previously just did

         <HTMLElement>

to the implementation. Reconcile changes DOM node at \`this\` to look like \`<HTMLElement>\` and returns it, if possible, otherwise it just returns the target. 

The reconciliation algorithm will use the "id" attribute to guide matching.
`
)}

function _8(msgs,$0,reconcile,htl)
{
  function sendMsg(evt) {
    if (evt.keyCode === 13) {
      console.log(msgs);
      $0.value = msgs.concat([evt.target.value]);
    }
  }
  return reconcile(
    this,
    htl.html`
    ${msgs.map((msg) => htl.html`<p>${msg}</p>`)}
    <input id="chat" class="text" onkeydown=${sendMsg}></input>
    <button onclick=${() => ($0.value = [])}>clear</button> 
  `
  );
}


function _9(md){return(
md`
## It works!
Now state is not lost, the focus remains on the text component, __though the text is cleared__ (a slight difference to the original [reconcile prototype](https://observablehq.com/@tomlarkworthy/reconcile))
`
)}

function _10(md){return(
md`
### Implementation Notes

- Unlike React the "id" attribute is used to guide element matching.

- event handlers like onclick are implemented by hypertext literal as assignment to node properties (not HTML attributes), which is why existing DOM diffs won't work (they work at HTMLElement level).

- If you try to reconcile with a live DOM element, you have to make sure the types match (e.g. DIV to DIV) so the element can be updated in place.
`
)}

function _morph(require){return(
require('https://bundle.run/nanomorph@5.4.2')
)}

function _reconcile(morph){return(
function reconcile(current, target, options) {
  if (
    !current ||
    !target ||
    current.nodeType != target.nodeType ||
    current.nodeName != target.nodeName ||
    current.namespaceURI != target.namespaceURI
  ) {
    if (current && target && current.nodeName != target.nodeName) {
      console.log("Cannot reconcile", current.nodeName, target.nodeName);
    }
    return target;
  }
  return morph(current, target, options);
}
)}

function _13(md){return(
md `# Tests`
)}

function _attributeCreate(htl,reconcile)
{
  const current = htl.html`<div></div>`;
  const target = htl.html`<div foo="1"></div>`;
  const reconciled = reconcile(current, target);
  console.log(reconciled);
  return reconciled.getAttribute("foo") == "1";
}


function _attributeRemoved(htl,reconcile)
{
  const current = htl.html`<div foo="1"></div>`;
  const target = htl.html`<div></div>`;
  const reconciled = reconcile(current, target);
  return reconciled.getAttribute("foo") === null;
}


function _attributeUpdate(htl,reconcile)
{
  const current = htl.html`<div foo="2"></div>`;
  const target = htl.html`<div foo="1"></div>`;
  const reconciled = reconcile(current, target);
  return reconciled.getAttribute("foo") == "1";
}


function _attributesCRUD(htl,reconcile)
{
  const current = htl.html`<div foo="2" bar="1"></div>`;
  const target = htl.html`<div bar="2" baz="3"></div>`;
  const reconciled = reconcile(current, target);
  return (
    reconciled.getAttribute("foo") == null &&
    reconciled.getAttribute("bar") == "2" &&
    reconciled.getAttribute("baz") == "3"
  );
}


function _childUpdateInPlace(htl,reconcile)
{
  const current = htl.html`<ul><li id="t1"> </li></ul>`;
  const target = htl.html`<ul><li id="t1">1</li></ul>`;
  const beforeReconciliation = current.firstChild;
  const reconciled = reconcile(current, target);
  return (
    reconciled.firstChild === beforeReconciliation &&
    reconciled.firstChild.firstChild.wholeText === "1"
  );
}


function _childAdded(htl,reconcile)
{
  const current = htl.html`<ul></ul>`;
  const target = htl.html`<ul><li id="t1">1</li></ul>`;
  const reconciled = reconcile(current, target);
  return reconciled.firstChild.firstChild.wholeText === "1";
}


function _childRemoved(htl,reconcile)
{
  const current = htl.html`<ul><li id="t1">1</li></ul>`;
  const target = htl.html`<ul></ul>`;
  const reconciled = reconcile(current, target);
  return reconciled.firstChild == null;
}


function _keyedChildUpdateInPlace(htl,reconcile)
{
  const current = htl.html`<ul><li id="t1"></li></ul>`;
  const target = htl.html`<ul><li></li><li id="t1"></li></ul>`;
  const beforeReconciliation = current.firstChild;
  const reconciled = reconcile(current, target);
  return reconciled.firstChild.nextSibling === beforeReconciliation;
}


function _DOMUpdateInPlaceDOM(htl){return(
htl.html`
<div id="DOMUpdateInPlace"> 
</div>
`
)}

function _DOMUpdateInPlace(DOMUpdateInPlaceDOM,html,reconcile)
{
  DOMUpdateInPlaceDOM
  
  const current = document.getElementById("DOMUpdateInPlace")
  const target = html`<div id="DOMUpdateInPlace"><p>1</p></div>`
  const reconciled = reconcile(current, target);
  return current ===  reconciled
}


function _NestedDOMUpdateInPlaceDOM(html){return(
html`
<div id="NestedDOMUpdateInPlace"><p>
    <b>raw</b>
</p></div>`
)}

function _NestedDOMUpdateInPlace(NestedDOMUpdateInPlaceDOM,html,reconcile)
{
  NestedDOMUpdateInPlaceDOM
  
  const current = document.getElementById("NestedDOMUpdateInPlace")
  const target = html`<div id="NestedDOMUpdateInPlace"><p>
    <b>new</b>
  </p></div>`
  reconcile(current, target);
  return current.textContent.includes("new")
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.define("initial msgs", _msgs);
  main.variable(observer("mutable msgs")).define("mutable msgs", ["Mutable", "initial msgs"], (M, _) => new M(_));
  main.variable(observer("msgs")).define("msgs", ["mutable msgs"], _ => _.generator);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["msgs","mutable msgs","htl"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["msgs","mutable msgs","reconcile","htl"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("morph")).define("morph", ["require"], _morph);
  main.variable(observer("reconcile")).define("reconcile", ["morph"], _reconcile);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("attributeCreate")).define("attributeCreate", ["htl","reconcile"], _attributeCreate);
  main.variable(observer("attributeRemoved")).define("attributeRemoved", ["htl","reconcile"], _attributeRemoved);
  main.variable(observer("attributeUpdate")).define("attributeUpdate", ["htl","reconcile"], _attributeUpdate);
  main.variable(observer("attributesCRUD")).define("attributesCRUD", ["htl","reconcile"], _attributesCRUD);
  main.variable(observer("childUpdateInPlace")).define("childUpdateInPlace", ["htl","reconcile"], _childUpdateInPlace);
  main.variable(observer("childAdded")).define("childAdded", ["htl","reconcile"], _childAdded);
  main.variable(observer("childRemoved")).define("childRemoved", ["htl","reconcile"], _childRemoved);
  main.variable(observer("keyedChildUpdateInPlace")).define("keyedChildUpdateInPlace", ["htl","reconcile"], _keyedChildUpdateInPlace);
  main.variable(observer("DOMUpdateInPlaceDOM")).define("DOMUpdateInPlaceDOM", ["htl"], _DOMUpdateInPlaceDOM);
  main.variable(observer("DOMUpdateInPlace")).define("DOMUpdateInPlace", ["DOMUpdateInPlaceDOM","html","reconcile"], _DOMUpdateInPlace);
  main.variable(observer("NestedDOMUpdateInPlaceDOM")).define("NestedDOMUpdateInPlaceDOM", ["html"], _NestedDOMUpdateInPlaceDOM);
  main.variable(observer("NestedDOMUpdateInPlace")).define("NestedDOMUpdateInPlace", ["NestedDOMUpdateInPlaceDOM","html","reconcile"], _NestedDOMUpdateInPlace);
  return main;
}
