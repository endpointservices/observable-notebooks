function _1(md){return(
md`# \`trackParent\` and \`preserveFocus\`

Reverse lost focus when DOM nodes are switched around.

\`\`\`js
import {trackParent, preserveFocus} from '@tomlarkworthy/track-parent'
\`\`\``
)}

function _2(md){return(
md`## \`trackParent(node, callback)\`

Watch a node for DOM parent changes`
)}

function _trackParent(MutationObserver){return(
function trackParent(node, callback) {
  let docObserver, parentObserver;

  function observeParent(parent) {
    // Notify with the current parent
    callback(parent);
    console.log("current parent", node);

    // Watch if the node is removed from this parent
    parentObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const removed of m.removedNodes) {
          if (removed === node) {
            console.log("no parent", node);
            callback(undefined); // Notify that there's no parent now
            parentObserver.disconnect();
            watchDocumentUntilAttached();
            return;
          }
        }
      }
    });

    parentObserver.observe(parent, { childList: true });
  }

  function watchDocumentUntilAttached() {
    docObserver = new MutationObserver(() => {
      if (node.parentNode) {
        docObserver.disconnect();
        observeParent(node.parentNode);
      }
    });
    docObserver.observe(document, { childList: true, subtree: true });
  }

  if (node.parentNode) {
    observeParent(node.parentNode);
  } else {
    watchDocumentUntilAttached();
  }

  // Return a disposer
  return () => {
    if (parentObserver) parentObserver.disconnect();
    if (docObserver) docObserver.disconnect();
  };
}
)}

function _4(md){return(
md`## \`trackParentChain(node, onAttach, onDetach)\``
)}

function _trackParentChain(MutationObserver){return(
function trackParentChain(node, onAttach, onDetach) {
  let ancestorObservers = [];
  let docObserver = null;

  function startAncestorObservers() {
    if (ancestorObservers.length > 0) return;
    const ancestors = () => {
      const ancestors = [];
      let cur = node;
      while (cur && cur !== document && cur !== document.documentElement) {
        ancestors.push(cur);
        cur = cur.parentNode;
      }

      return ancestors;
    };

    // For each ancestor A, observe A's parent for "childList" removals of A
    ancestorObservers = ancestors().map((ancestor) => {
      const parent = ancestor.parentNode;
      // If no parent, can't observe
      if (!parent) return null;

      const obs = new MutationObserver((mutations) => {
        for (const mut of mutations) {
          for (const removed of mut.removedNodes) {
            if (removed === ancestor) {
              // An ancestor was removed => node is effectively detached
              stopAncestorObservers();
              initialize();
            }
          }
        }
      });

      obs.observe(parent, { childList: true, subtree: false });
      return obs;
    });
  }

  // 2. Stop watching ancestors
  function stopAncestorObservers() {
    ancestorObservers.forEach((obs) => obs && obs.disconnect());
    ancestorObservers = [];
  }

  // 3. Watch document with subtree:true to detect node reattachment
  function startDocObserver() {
    if (docObserver) return; // already watching
    docObserver = new MutationObserver(() => {
      console.log("doc observer", node.isConnected);
      if (node.isConnected) {
        // Node just reattached
        docObserver.disconnect();
        docObserver = null;
        initialize();
      }
    });
    docObserver.observe(document, { childList: true, subtree: true });
  }

  // 4. Stop doc observer
  function stopDocObserver() {
    if (docObserver) {
      docObserver.disconnect();
      docObserver = null;
    }
  }

  // 5. Initialization
  function initialize() {
    if (node.isConnected) {
      onAttach();
      startAncestorObservers();
    } else {
      startDocObserver();
    }
  }
  initialize();

  // 6. Return cleanup
  return function dispose() {
    stopAncestorObservers();
    stopDocObserver();
  };
}
)}

function _6(md){return(
md`### Tests
tick randomize to move the text area about, and see if it can keep focus`
)}

function _random(Inputs){return(
Inputs.toggle({
  label: "randomize"
})
)}

function _domNode($0){return(
$0
)}

function _refresh_a(Inputs){return(
Inputs.button("a")
)}

function _refresh_b(Inputs){return(
Inputs.button("b")
)}

function _11(Inputs,domNode){return(
Inputs.button("dettach", { reduce: () => domNode.remove() })
)}

function _text(Inputs){return(
Inputs.text()
)}

function _a(refresh_a,html,$0){return(
refresh_a && html`<div id="a">${$0}`
)}

function _b(refresh_b,html,$0){return(
refresh_b && html`<div id="b">${$0}`
)}

function* _reparent_randomly(random)
{
  if (random) {
    while (true) {
      const pick = Math.floor(Math.random() * 3);
      document.querySelectorAll("button")[pick].click();
      yield new Promise((r) => setTimeout(r, 3000));
    }
  }
}


function _16(md){return(
md`## \`preserveFocus(node)\``
)}

function _preserveFocus(trackParentChain){return(
(node) => {
  let lastFocused = null;

  function onFocus(e) {
    if (node.contains(e.target)) {
      lastFocused = e.target;
    } else {
      lastFocused = null;
    }
  }
  function onPointerDown(e) {
    if (!node.contains(e.target)) {
      lastFocused = null;
    }
  }

  document.addEventListener("pointerdown", onPointerDown, true);
  document.addEventListener("focus", onFocus, true);

  const stopWatchingConnection = trackParentChain(
    node,
    () => {
      if (lastFocused && node.contains(lastFocused)) {
        //console.log("restore focus");
        lastFocused.focus();
      } else {
        // console.log("skip focus", node.contains(lastFocused), lastFocused);
      }
    },
    () => {}
  );

  // Dispose
  return () => {
    document.removeEventListener("pointerdown", onPointerDown, true);
    document.removeEventListener("focus", onFocus, true);
    stopWatchingConnection();
  };
}
)}

function _18(invalidation,preserveFocus,domNode){return(
invalidation.then(preserveFocus(domNode))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("trackParent")).define("trackParent", ["MutationObserver"], _trackParent);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("trackParentChain")).define("trackParentChain", ["MutationObserver"], _trackParentChain);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof random")).define("viewof random", ["Inputs"], _random);
  main.variable(observer("random")).define("random", ["Generators", "viewof random"], (G, _) => G.input(_));
  main.variable(observer("domNode")).define("domNode", ["viewof text"], _domNode);
  main.variable(observer("viewof refresh_a")).define("viewof refresh_a", ["Inputs"], _refresh_a);
  main.variable(observer("refresh_a")).define("refresh_a", ["Generators", "viewof refresh_a"], (G, _) => G.input(_));
  main.variable(observer("viewof refresh_b")).define("viewof refresh_b", ["Inputs"], _refresh_b);
  main.variable(observer("refresh_b")).define("refresh_b", ["Generators", "viewof refresh_b"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","domNode"], _11);
  main.variable(observer("viewof text")).define("viewof text", ["Inputs"], _text);
  main.variable(observer("text")).define("text", ["Generators", "viewof text"], (G, _) => G.input(_));
  main.variable(observer("a")).define("a", ["refresh_a","html","viewof text"], _a);
  main.variable(observer("b")).define("b", ["refresh_b","html","viewof text"], _b);
  main.variable(observer("reparent_randomly")).define("reparent_randomly", ["random"], _reparent_randomly);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("preserveFocus")).define("preserveFocus", ["trackParentChain"], _preserveFocus);
  main.variable(observer()).define(["invalidation","preserveFocus","domNode"], _18);
  return main;
}
