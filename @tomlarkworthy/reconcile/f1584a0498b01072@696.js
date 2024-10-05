// https://observablehq.com/@tomlarkworthy/reconcile@696
import define1 from "./11a5ab8b1b3a51db@1161.js";

function _1(md){return(
md`
# Hypertext literal reconciliation (Native DOM Diffing)

I love the [hypertext literal](https://observablehq.com/@observablehq/htl). It is intuitive. However, naive application of it tends to invalidate state between renders leading to poor UX.

React solved this problem with a [reconciliation](https://reactjs.org/docs/reconciliation.html) algorithm. However, React is very complicated and does not gel with Observable.

This notebook is an idea to try and get a React-like reconciliation algorithm applied to the hypertext literal in an Observable native way. We exploit the \`this\` variable to retrevie the previous DOM state allowing us to diff from the previous cell UI state. 

It in the experimental state so leave comments if on areas where it does not work and we can try to fix it.

~~~js
import {reconcile, html} from '@tomlarkworthy/reconcile'
~~~
`
)}

function _2(md){return(
md`
## Demo of problem

If we have some state defined elsehwere, say a list of messages:-

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

function _5(msgs,$0,html)
{
  async function sendMsg(evt) {
    if (evt.keyCode === 13) {
      console.log(msgs)
      $0.value = msgs.concat([evt.target.value]);
    }
  }
  return html`
    ${msgs.map(msg => html`<p>${msg}</p>`)}
    <input class="text" onkeydown=${sendMsg}></input>
    <button onclick=${() => $0.value = []}>clear</button>
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

Create a custom \`reconcile\` function for DOM state diffing. Unlike React and Preact, we do not use a virtual DOM. Instead we compare the previous DOM state to the new hypertext literal HTML fragment. You can get the previous state of a cell with the keyword [\`this\`](https://talk.observablehq.com/t/get-the-previous-value-of-a-cell-when-its-edited-and-saved/792).

To reuse the previous state and apply a diff we add 

         reconcile(this, <HTMLFragment>)

where we previously jsut did

         <HTMLFragment>

to the implementation. Reconcile changes DOM node at 'this' to look like <HTMLFragment> and returns it, if possible, otherwise it just returns the HTML target fragment. 

Like (P)React reconciliation algorithm will look for the "key" attribute to guide matching.
`
)}

function _8(msgs,$0,reconcile,html)
{
  function sendMsg(evt) {
    if (evt.keyCode === 13) {
      console.log(msgs)
      $0.value = msgs.concat([evt.target.value]);
    }
  }
  return reconcile(this, html`
    ${msgs.map(msg => html`<p>${msg}</p>`)}
    <input key="chat" class="text" onkeydown=${sendMsg}></input> <!-- Note key attribute added as well-->
    <button onclick=${() => $0.value = []}>clear</button> 
  `);
}


function _9(md){return(
md`
## It works!
Now state is not lost, the focus remains on the text component and the text feild is not cleared!
`
)}

function _10(md){return(
md`
### Implementation Notes

- Like React we use an attribute "key" to guide element matching.

- event handlers like onclick are implemented by hypertext literal as assignment to node properties (not HTML attributes), which is why existing DOM diffs won't work (they work at HTMLElement level).

- If you move a child using insertBefore, focus is lost. For this implementation I try to avoid making these changes, but it means if the sort order changes you cannot avoid dettaching some children and they will lose focus.

- If you try to reconcile with a live DOM element, you have to make sure the types match (e.g. DIV to DIV).
`
)}

function _reconcile(Node){return(
function reconcile(current, target) {
  // Some differences cannot be reconciled in place, return the target
  if (!current || 
      !target || 
      current.nodeType != target.nodeType || 
      current.nodeName != target.nodeName ||
      current.namespaceURI != target.namespaceURI
     ) {
    if (current && target && current.nodeName != target.nodeName) {
      console.log("Cannot reconcile", current.nodeName, target.nodeName)
    }
    return target;
  }

  const hasChildren = current.firstChild || target.firstChild;
  const hasAttibutes = current.hasAttributes || target.hasAttributes

  if (current.nodeType === Node.TEXT_NODE) {
    current.nodeValue = target.nodeValue
  }
  if (hasAttibutes) {
    function indexAttributes(attributes) {
      const index = {}
      for(let i = attributes.length - 1; i >= 0; i--) {
        index[attributes[i].name] = attributes[i].value;
      }
      return index;
    }
    const currentAttributes = indexAttributes(current.attributes)
    const targetAttributes = indexAttributes(target.attributes)
    const unionAttributeNames = new Set([...Object.keys(currentAttributes),
                                         ...Object.keys(targetAttributes)]);

    for (let attributeName of unionAttributeNames) {
      if (targetAttributes[attributeName]) {
        if (targetAttributes[attributeName] !== currentAttributes[attributeName]) {
          current.setAttribute(attributeName, targetAttributes[attributeName])
        }
      } else {
        current.removeAttribute(attributeName);
      }
    }
  }

  for (let prop in target) {
    // Events like onkeydown need to be copied over
    if (prop.startsWith("on")) { 
      if (current[prop] !== target[prop]) {
        current[prop] = target[prop];
      } 
    }
  }

  // Index the children for reconciliation (if we have children)
  if (hasChildren) {
    function indexChildren(parent) {
      const indexChildren = {}
      // Collect children looking for key attribute
      let index = 0;
      for (let child = parent.firstChild; child; child = child.nextSibling) {
        const key = child.hasAttributes && child.getAttribute("key") ? 
              child.getAttribute("key") : "$" + index;
        indexChildren[key] = {
          node: child,
          index
        };
        index++;
      }
      return indexChildren;
    }

    const currentChildren = indexChildren(current);
    const targetChildren = indexChildren(target);

    // Create a new set of children, indexed by position
    const newChildren = {}

    // Generate reconciliation children and their ordering
    const currentKeys = Object.keys(currentChildren);
    const targetKeys = Object.keys(targetChildren);
    const unionKeys = new Set([...currentKeys, ...targetKeys]);
    for (let key of unionKeys) {
      const currentChild = (currentChildren[key] || {}).node;
      const targetChild = (targetChildren[key] || {}).node;
      const reconciledChild = reconcile(currentChild, targetChild);
      if (currentChild && reconciledChild !== currentChild) {
        current.removeChild(currentChild);
      }
      if (reconciledChild) newChildren[targetChildren[key].index] = reconciledChild;
    }

    // Now we walk through the existing children,
    // trying to avoid moving them if they already in right place
    // This is fairly simple and probably does not scale to complex use cases
    let curser = current.firstChild;
    for (let i = 0; i < targetKeys.length; i++) {
      if (curser === null) {
        current.append(newChildren[i]);
      } else {
        if (curser === newChildren[i]) {
          // Child is already in right place, no structural change in DOM required
          curser = curser.nextSibling
        } else {
          // as we pruned unnecissary children already
          // if there is a mismatch it probably implies the target is bigger
          // If the element was in the current DOM it is moved
          // If the element was in the target DOM it is added
          current.insertBefore(newChildren[i], curser)
        }
      }
    }
  }
  return current
}
)}

function _12(md){return(
md `# Tests`
)}

function _attribteCreate(html,reconcile)
{
  const current = html.fragment`<div></div>`
  const target = html.fragment`<div foo="1"></div>`
  const reconciled = reconcile(current, target);
  return reconciled.firstElementChild.getAttribute("foo") == "1"
}


function _attributeRemoved(html,reconcile)
{
  const current = html.fragment`<div foo="1"></div>`
  const target = html.fragment`<div></div>`
  const reconciled = reconcile(current, target);
  return reconciled.firstElementChild.getAttribute("foo") === null
}


function _attribteUpdate(html,reconcile)
{
  const current = html.fragment`<div foo="2"></div>`
  const target = html.fragment`<div foo="1"></div>`
  const reconciled = reconcile(current, target);
  return reconciled.firstElementChild.getAttribute("foo") == "1"
}


function _attribtesCRUD(html,reconcile)
{
  const current = html.fragment`<div foo="2" bar="1"></div>`
  const target = html.fragment`<div bar="2" baz="3"></div>`
  const reconciled = reconcile(current, target);
  return reconciled.firstElementChild.getAttribute("foo") == null && 
    reconciled.firstElementChild.getAttribute("bar") == "2"
  reconciled.firstElementChild.getAttribute("baz") == "3"
}


function _childUpdateInPlace(html,reconcile)
{
  const current = html.fragment`<ul>
    <li id="t1"></li>
  </ul>`
  const target = html.fragment`<ul>
    <li id="t1">1</li>
  </ul>`
  const reconciled = reconcile(current, target);
  const beforeReconciliation = current.getElementById("t1")
  return reconciled.getElementById("t1") === beforeReconciliation &&
    reconciled.getElementById("t1").firstChild.wholeText === "1"
}


function _childAdded(html,reconcile)
{
  const current = html.fragment`<ul>
  </ul>`
  const target = html.fragment`<ul>
    <li id="t1">1</li>
  </ul>`
  const reconciled = reconcile(current, target);
  return reconciled.getElementById("t1").firstChild.wholeText === "1"
}


function _childRemoved(html,reconcile)
{
  const current = html.fragment`<ul>
    <li id="t1">1</li>
  </ul>`
  const target = html.fragment`<ul>
  </ul>`
  const reconciled = reconcile(current, target);
  return reconciled.getElementById("t1") == null
}


function _keyedChildUpdateInPlace(html,reconcile)
{
  const current = html.fragment`<ul>
    <li key="t1" id="t1"></li>
  </ul>`
  const target = html.fragment`<ul>
    <li id="t2"></li>
    <li key="t1" id="t1"></li>
  </ul>`
  const beforeReconciliation = current.getElementById("t1")
  const reconciled = reconcile(current, target);
  return reconciled.getElementById("t1") === beforeReconciliation
}


function _DOMUpdateInPlaceDOM(html){return(
html`
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
  main.variable(observer()).define(["msgs","mutable msgs","html"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["msgs","mutable msgs","reconcile","html"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("reconcile")).define("reconcile", ["Node"], _reconcile);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("attribteCreate")).define("attribteCreate", ["html","reconcile"], _attribteCreate);
  main.variable(observer("attributeRemoved")).define("attributeRemoved", ["html","reconcile"], _attributeRemoved);
  main.variable(observer("attribteUpdate")).define("attribteUpdate", ["html","reconcile"], _attribteUpdate);
  main.variable(observer("attribtesCRUD")).define("attribtesCRUD", ["html","reconcile"], _attribtesCRUD);
  main.variable(observer("childUpdateInPlace")).define("childUpdateInPlace", ["html","reconcile"], _childUpdateInPlace);
  main.variable(observer("childAdded")).define("childAdded", ["html","reconcile"], _childAdded);
  main.variable(observer("childRemoved")).define("childRemoved", ["html","reconcile"], _childRemoved);
  main.variable(observer("keyedChildUpdateInPlace")).define("keyedChildUpdateInPlace", ["html","reconcile"], _keyedChildUpdateInPlace);
  main.variable(observer("DOMUpdateInPlaceDOM")).define("DOMUpdateInPlaceDOM", ["html"], _DOMUpdateInPlaceDOM);
  main.variable(observer("DOMUpdateInPlace")).define("DOMUpdateInPlace", ["DOMUpdateInPlaceDOM","html","reconcile"], _DOMUpdateInPlace);
  main.variable(observer("NestedDOMUpdateInPlaceDOM")).define("NestedDOMUpdateInPlaceDOM", ["html"], _NestedDOMUpdateInPlaceDOM);
  main.variable(observer("NestedDOMUpdateInPlace")).define("NestedDOMUpdateInPlace", ["NestedDOMUpdateInPlaceDOM","html","reconcile"], _NestedDOMUpdateInPlace);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  return main;
}
