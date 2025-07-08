import define1 from "./e1c39d41e8e944b0@378.js";

function _1(md){return(
md`# Runtime SDK

Tools for observation and manipulation of the Observable Runtime.

\`\`\`js
import {runtime, thisModule, observe, variables, descendants, lookupVariable, toObject} from '@tomlarkworthy/runtime-sdk'
\`\`\``
)}

function _2(md){return(
md`### viewof variables

a live view of variables in a runtime`
)}

function _variables(Inputs,observeSet,Event){return(
function (runtime) {
  const view = Inputs.input(runtime._variables);
  observeSet(runtime._variables, () => {
    // There is a delay before the variable names are updated
    setTimeout(() => {
      view.value = runtime._variables;
      view.dispatchEvent(new Event("input", { bubbles: true }));
    }, 0);
  });
  return view;
}
)}

function _runtime_variables(variables,runtime){return(
variables(runtime)
)}

function _5(runtime_variables){return(
runtime_variables
)}

function _6(md){return(
md`### descendants

live view of a variable (s) and all its dataflow successors`
)}

function _descendants(){return(
function (...variables) {
  const results = new Set(variables);
  const queue = variables;
  do {
    [...queue.pop()._outputs].forEach((v) => {
      if (!results.has(v)) {
        results.add(v);
        queue.push(v);
      }
    });
  } while (queue.length);
  return results;
}
)}

function _decendants_example(descendants,lookupVariable,main,toObject){return(
[...descendants(lookupVariable("runtime", main))].map(
  toObject
)
)}

function _9(md){return(
md`### ascendants`
)}

function _ascendants(){return(
function (...variables) {
  const results = new Set(variables);
  const queue = variables;
  do {
    [...queue.pop()._inputs].forEach((v) => {
      if (!results.has(v)) {
        results.add(v);
        queue.push(v);
      }
    });
  } while (queue.length);
  return results;
}
)}

function _ascendants_example(ascendants,lookupVariable,main,toObject){return(
[...ascendants(lookupVariable("runtime", main))].map(
  toObject
)
)}

function _12(md){return(
md`### lookupVariable
lookup a variable by module`
)}

function _lookupVariable(){return(
(name, module) => module._scope.get(name)
)}

function _14(md){return(
md`### observe(variable)

This was monstrously difficult to develop. Taps a variable, intercepting all observer calls \`["fulfilled", "rejected", "pending"]\` whilst preserving the behaviour of the existing observer attached to the variable. If \`detachNodes\` is \`true\` and the the existing observer hosts a DOM node, the additional variable "steals" it for it's DOM tree. When the observer attaches, if the variable is already fulfilled, the observer is signalled.

Unobserved variables are marked as reachable and become active when observed.`
)}

function _trace_variable(){return(
"---"
)}

function _no_observer(main)
{
  const variable = main.variable();
  const symbol = variable._observer;
  variable.delete();
  return symbol;
}


function _observe(trace_variable,_,no_observer,isnode,toObject,getPromiseState){return(
function observe(v, observer, { invalidation, detachNodes = false } = {}) {
  const cancels = new Set();
  const onCancel = () => cancels.forEach((f) => f());
  if (invalidation) invalidation.then(onCancel);

  if (v?._name === trace_variable) {
    console.log("observe", trace_variable, v);
    debugger;
  }

  if (_.isEqual(v._observer, {}) || v._observer === no_observer) {
    // No existing observer, so we install one
    if (!v._reachable) {
      // the the variable is not reachable, we mark it as reachable
      // and trigger a recompute
      v._reachable = true;
      v._module._runtime._dirty.add(v);
      v._module._runtime._updates.add(v);
    }
    let previous = v._observer;
    v._observer = observer;
    cancels.add(() => (v._observer = previous));
  } else {
    // intercepts an existing observer handler
    ["fulfilled", "rejected", "pending"].forEach((type) => {
      const old = v._observer[type];
      v._observer[type] = (...args) => {
        if (v?._name === trace_variable) {
          console.log(trace_variable, type, ...args);
        }
        // The old is often a prototype, so we use Reflect to call it
        if (old) {
          if (v?._name === trace_variable) {
            console.log(`previous: ${type} ${trace_variable}`);
          }
          Reflect.apply(old, v._observer, args);
          if (type === "fulfilled") {
            if (
              detachNodes &&
              isnode(args[0]) &&
              observer._node !== args[0].parentNode
            ) {
              if (v?._name === trace_variable) {
                console.log(`dettaching existing DOM: ${trace_variable}`);
              }
              args[0].remove();
            }
          }
        }
        if (v?._name === trace_variable) {
          console.log(`tapped ${trace_variable} ${type}`);
        }
        if (observer[type]) observer[type](...args);
      };
      cancels.add(() => (v._observer[type] = old));
    });
    if (v?._name === trace_variable) {
      debugger;
      console.log(`checking`, trace_variable, v, toObject(v), v._value);
    }
  }
  // Resolve initial state
  if (v._value !== undefined) {
    setTimeout(() => {
      if (
        detachNodes &&
        isnode(v._value) &&
        observer._node !== v._value.parentNode
      ) {
        if (v?._name === trace_variable) {
          console.log(`dettaching existing DOM: ${trace_variable}`);
        }
        v._value.remove();
      }
      if (v?._name === trace_variable) {
        console.log(`tapped fulfilled: ${trace_variable}`);
      }
      observer.fulfilled(v._value, v._name);
    }, 0);
  } else {
    // either in pending or error state, we can check by racing a promise
    getPromiseState(v._promise).then(({ state, error, value }) => {
      if (state == "rejected") {
        if (observer.rejected) observer.rejected(error, v._name);
      } else if (state == "pending") {
        if (observer.pending) observer.pending();
      } /*
      Removed coz non-undefined should have been caught, and the initial
      promise assigned to a variable resolves to undefined
      else if (state == "fulfilled") {
        if (observer.fulfilled) observer.fulfilled(value, v._name);
      }*/
    });
  }
  return onCancel;
}
)}

function _18(md){return(
md`## keepalive

Keep a named cell evaluated. Useful to keep background tasks alive in dependancies when another module imports them.`
)}

function _keepalive(){return(
(module, variable_name) => {
  if (variable_name === undefined) debugger;
  const name = `dynamic observe ${variable_name}`;
  console.log(`keepalive: ${name}`);
  if (module._scope.has(name)) return;
  const variable = module.variable({}).define(name, [variable_name], (m) => m);
  return () => variable.delete();
}
)}

function _20(md){return(
md`## isOnObservableCom`
)}

function _isOnObservableCom(location){return(
() =>
  location.href.includes("observableusercontent.com") &&
  !location.href.includes("blob:")
)}

function _22(md){return(
md`## thisModule()

Obtain a reference to the enclosing module as a view. Use like this
\`\`\`
viewof notebookModule = thisModule()
\`\`\``
)}

function _myModule(thisModule){return(
thisModule()
)}

function _thisModule(EventTarget,find_with_tag,Event){return(
async () => {
  const view = new EventTarget();
  view.tag = Symbol();
  let module = undefined;

  return Object.defineProperty(view, "value", {
    get: () => {
      if (module) return module;
      find_with_tag(view.tag).then((v) => {
        module = v._module;
        view.dispatchEvent(new Event("input"));
      });
    }
  });
}
)}

function _find_with_tag(runtime){return(
(tag) => {
  return new Promise((resolve) => {
    [...runtime._variables].map((v) => {
      if (v?._value?.tag == tag) {
        resolve(v);
      }
    });
  });
}
)}

function _26(md){return(
md`## Utils`
)}

function _27(md){return(
md`### unorderedSync
Helper for syncing two arrays`
)}

function _unorderedSync(_){return(
(goal, current, identityFn = _.isEqual) => ({
  add: _.differenceWith(goal, current, identityFn),
  remove: _.differenceWith(current, goal, (a, b) => identityFn(b, a))
})
)}

function _29(unorderedSync){return(
unorderedSync(
  [
    { name: "red", age: 12 },
    { name: "joe", age: 1 }
  ],
  [{ name: "joe" }, { name: "jean" }],
  (a, b) => a.name == b.name
)
)}

function _30(md){return(
md`### getPromiseState

figure out the status of a promise.`
)}

function _getPromiseState(){return(
async function getPromiseState(p) {
  const sentinel = Symbol();
  try {
    const val = await Promise.race([p, Promise.resolve(sentinel)]);
    return val === sentinel
      ? { state: "pending" }
      : { state: "fulfilled", fulfilled: val };
  } catch (err) {
    return { state: "rejected", error: err };
  }
}
)}

function _32(md){return(
md`### Reposition set`
)}

function _repositionSetElement(){return(
function repositionSetElement(set, element, newPosition) {
  if (!set.has(element)) {
    throw new Error("Element not found in the set.");
  }

  // Convert Set to an array
  const elementsArray = Array.from(set);

  // Remove the element
  const currentIndex = elementsArray.indexOf(element);
  elementsArray.splice(currentIndex, 1);

  // Insert element at the new position
  elementsArray.splice(newPosition, 0, element);

  // Reconstruct the Set
  set.clear();
  elementsArray.forEach(set.add, set);
}
)}

function _34(md){return(
md`---`
)}

function _isnode(Element,Text){return(
(value) => {
  return (
    (value instanceof Element || value instanceof Text) &&
    value instanceof value.constructor
  );
}
)}

function _observeSet(){return(
function observeSet(set, callback) {
  const originalAdd = set.add;
  set.add = function (value) {
    const result = originalAdd.call(this, value); // Call the original `add`
    callback("add", [value], this); // Invoke the callback
    return result; // Maintain chainability
  };

  const originalDelete = set.delete;
  set.delete = function (value) {
    const result = originalDelete.call(this, value); // Call the original `delete`
    callback("delete", [value], this); // Invoke the callback
    return result;
  };

  const originalClear = set.clear;
  set.clear = function () {
    const result = originalClear.call(this); // Call the original `clear`
    callback("clear", [], this); // Invoke the callback
    return result;
  };

  return set; // Return the modified `Set`
}
)}

function _toObject(){return(
(v) =>
  Object.fromEntries(Object.getOwnPropertyNames(v).map((p) => [p, v[p]]))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("variables")).define("variables", ["Inputs","observeSet","Event"], _variables);
  main.variable(observer("viewof runtime_variables")).define("viewof runtime_variables", ["variables","runtime"], _runtime_variables);
  main.variable(observer("runtime_variables")).define("runtime_variables", ["Generators", "viewof runtime_variables"], (G, _) => G.input(_));
  main.variable(observer()).define(["runtime_variables"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("descendants")).define("descendants", _descendants);
  main.variable(observer("decendants_example")).define("decendants_example", ["descendants","lookupVariable","main","toObject"], _decendants_example);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("ascendants")).define("ascendants", _ascendants);
  main.variable(observer("ascendants_example")).define("ascendants_example", ["ascendants","lookupVariable","main","toObject"], _ascendants_example);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("lookupVariable")).define("lookupVariable", _lookupVariable);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("trace_variable")).define("trace_variable", _trace_variable);
  main.variable(observer("no_observer")).define("no_observer", ["main"], _no_observer);
  main.variable(observer("observe")).define("observe", ["trace_variable","_","no_observer","isnode","toObject","getPromiseState"], _observe);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("keepalive")).define("keepalive", _keepalive);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("isOnObservableCom")).define("isOnObservableCom", ["location"], _isOnObservableCom);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer("thisModule")).define("thisModule", ["EventTarget","find_with_tag","Event"], _thisModule);
  main.variable(observer("find_with_tag")).define("find_with_tag", ["runtime"], _find_with_tag);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("unorderedSync")).define("unorderedSync", ["_"], _unorderedSync);
  main.variable(observer()).define(["unorderedSync"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("getPromiseState")).define("getPromiseState", _getPromiseState);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("repositionSetElement")).define("repositionSetElement", _repositionSetElement);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("isnode")).define("isnode", ["Element","Text"], _isnode);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("main", child1);
  main.variable(observer("observeSet")).define("observeSet", _observeSet);
  main.variable(observer("toObject")).define("toObject", _toObject);
  return main;
}
