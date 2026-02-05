import define1 from "./e1c39d41e8e944b0@939.js";

function _title(md){return(
md`# Runtime SDK

Functions for meta-programming the Observable Runtime.

\`\`\`js
import {runtime, thisModule, observe, variables, descendants, lookupVariable, toObject} from '@tomlarkworthy/runtime-sdk'
\`\`\``
)}

function _2(md){return(
md`### access the runtime`
)}

function _4(md){return(
md`### viewof variables

a live view of variables in a runtime`
)}

function _variables(Inputs,observeSet,Event){return(
function (runtime) {
  const view = Inputs.input(runtime._variables);
  let scheduled = false;
  observeSet(runtime._variables, () => {
    // There is a delay before the variable names are updated
    if (!scheduled) {
      scheduled = true;
      setTimeout(() => {
        view.value = runtime._variables;
        view.dispatchEvent(new Event("input", { bubbles: true }));
        scheduled = false;
      }, 0);
    }
  });
  return view;
}
)}

function _runtime_variables(variables,runtime){return(
variables(runtime)
)}

function _7(runtime_variables){return(
runtime_variables
)}

function _8(md){return(
md`### \`onCodeChange(callback)\`

Register a callback that will be notified of changed code definitions. It has to be a callback because changes can occur rapidly. Returns an unsubscribe function.
~~~js
({
  variable: Variable
  previous: {_module, _name, _inputs, _definition} | null
})
~~~`
)}

function _last_change(Generators,invalidation,onCodeChange){return(
Generators.observe((notify) => {
  invalidation.then(onCodeChange(notify));
})
)}

function _onCodeChange(keepalive,myModule,codeChangeListeners){return(
(callback) => {
  keepalive(myModule, "check_for_code_change");
  codeChangeListeners.add(callback);
  return () => codeChangeListeners.delete(callback);
}
)}

function _codeChangeListeners(){return(
new Set()
)}

function _check_for_code_change(runtime_variables,codeChangeListeners)
{
  const previous = this || new Map();
  const currentSet = runtime_variables;
  const current = new Map();
  for (const v of currentSet) {
    const snapshot = {
      variable: v,
      _module: v._module,
      _name: v._name,
      _definition: v._definition,
      _inputs: v._inputs.map((i) => i._name)
    };
    current.set(v, snapshot);
    const prev = previous.get(v);
    if (!prev) {
      for (const cb of codeChangeListeners) cb({ variable: v, previous: null });
    } else if (prev._definition !== snapshot._definition) {
      for (const cb of codeChangeListeners) cb({ variable: v, previous: prev });
    }
  }
  for (const [v, prev] of previous) {
    if (!currentSet.has(v)) {
      for (const cb of codeChangeListeners)
        cb({ variable: null, previous: prev });
    }
  }
  return current;
}


function _13(md){return(
md`### observe(variable)

This was monstrously difficult to develop. Taps a variable, intercepting all observer calls \`["fulfilled", "rejected", "pending"]\` whilst preserving the behaviour of the existing observer attached to the variable. If \`detachNodes\` is \`true\` and the existing observer hosts a DOM node, the additional variable "steals" it for it's DOM tree. When the observer attaches, if the variable is already fulfilled, the observer is signalled.

Unobserved variables are marked as reachable and become active when observed.`
)}

function _trace_variable(){return(
"viewof agent1"
)}

function _trace_history(){return(
[]
)}

function _no_observer(main)
{
  const variable = main.variable();
  const symbol = variable._observer;
  variable.delete();
  return symbol;
}


function _observe(Element,Text,trace_variable,$0,no_observer,queueMicrotask){return(
function observe(v, observer, { invalidation, detachNodes = false } = {}) {
  // --- instrumentation (improved) ---
  // Give each observe() call a stable id so you can correlate events.
  const observe_id = `${v?._name || "<anon>"}@${Date.now()}@${Math.random()
    .toString(16)
    .slice(2)}`;

  const snapshot = (extra = {}) => ({
    t: Date.now(),
    observe_id,
    var_name: v?._name,
    var_version: v?._version,
    var_reachable: v?._reachable,
    has_observer: v?._observer != null,
    observer_has_node: !!observer?._node,
    v_value_defined: v?._value !== undefined,
    v_value_ctor: v?._value?.constructor?.name,
    v_value_is_node:
      v?._value instanceof Element || v?._value instanceof Text || false,
    v_promise: !!v?._promise,
    ...extra
  });

  const emit = (event, extra = {}) => {
    if (v?._name !== trace_variable) return;

    try {
      $0.value = $0.value.concat([
        snapshot({ event, ...extra })
      ]);
    } catch {}
  };

  emit("observe:begin", { detachNodes });

  const cancels = new Set();
  let cancelled = false;

  const cancel = () => {
    emit("observe:cancel_called");
    if (cancelled) return;
    cancelled = true;
    for (const f of cancels) {
      try {
        f();
      } catch {}
    }
    cancels.clear();
  };

  if (invalidation)
    Promise.resolve(invalidation).then(() => {
      emit("observe:invalidation_fired");
      cancel();
    });

  const isNode = (value) => value instanceof Element || value instanceof Text;

  const stealIfNeeded = (value, reason) => {
    const canSteal =
      detachNodes &&
      isNode(value) &&
      observer?._node &&
      observer._node !== value.parentNode;

    emit("observe:steal_check", {
      reason,
      canSteal,
      value_ctor: value?.constructor?.name,
      value_parent: value?.parentNode?.constructor?.name
    });

    if (canSteal) {
      try {
        value.remove();
      } catch {}
      emit("observe:steal_detached", { reason });
    }
  };

  const hasExistingObserver =
    v && v._observer != null && v._observer !== no_observer;

  emit("observe:hasExistingObserver", { hasExistingObserver });

  // --- attach/wrap ---
  if (!hasExistingObserver) {
    emit("observe:attach:direct_install");

    if (v && !v._reachable) {
      v._reachable = true;
      v._module._runtime._dirty.add(v);
      v._module._runtime._updates.add(v);
      emit("observe:attach:marked_reachable");
    }

    const previous = v._observer;
    v._observer = observer;
    cancels.add(() => {
      v._observer = previous;
    });
  } else {
    emit("observe:attach:wrap_existing");

    const prevObserver = v._observer;

    for (const type of ["fulfilled", "rejected", "pending"]) {
      const prev = prevObserver?.[type];

      prevObserver[type] = (...args) => {
        emit(`observe:wrapped:${type}:called`, {
          arg0_ctor: args[0]?.constructor?.name
        });

        // old observer first
        if (prev) {
          try {
            Reflect.apply(prev, prevObserver, args);
          } catch (e) {
            emit(`observe:wrapped:${type}:prev_error`, { message: String(e) });
          }
          if (type === "fulfilled")
            stealIfNeeded(args[0], "wrap_existing:prev_fulfilled");
        }

        // then tap
        try {
          if (type === "fulfilled") observer.fulfilled?.(args[0], v?._name);
          else if (type === "rejected") observer.rejected?.(args[0], v?._name);
          else observer.pending?.();
          emit(`observe:wrapped:${type}:tapped_ok`);
        } catch (e) {
          emit(`observe:wrapped:${type}:tap_error`, { message: String(e) });
        }
      };

      cancels.add(() => {
        prevObserver[type] = prev;
      });
    }
  }

  // --- CATCH-UP REPLAY (BUG FIX) ---
  // Snapshot version to avoid replaying stale results.
  const versionAtAttach = v?._version;
  emit("observe:catchup:scheduled", { versionAtAttach });

  queueMicrotask(() => {
    emit("observe:catchup:microtask_start", { cancelled });

    if (cancelled) return;

    // mimic inspector: mark pending first
    try {
      observer.pending?.();
      emit("observe:catchup:pending_sent");
    } catch (e) {
      emit("observe:catchup:pending_error", { message: String(e) });
    }

    // IMPORTANT: read CURRENT value at replay time
    const valueNow = v?._value;

    emit("observe:catchup:valueNow_snapshot", {
      valueNow_defined: valueNow !== undefined,
      valueNow_ctor: valueNow?.constructor?.name,
      v_version_now: v?._version,
      valueNow_outerHTML_prefix: v?._observer?._node?.outerHTML
    });

    if (valueNow !== undefined) {
      if (v?._version !== versionAtAttach) {
        emit("observe:catchup:stale_skip_valueNow");
        return;
      }

      stealIfNeeded(valueNow, "catchup:valueNow");

      try {
        observer.fulfilled?.(valueNow, v?._name);
        emit("observe:catchup:fulfilled_sent_valueNow");
      } catch (e) {
        emit("observe:catchup:fulfilled_error_valueNow", {
          message: String(e)
        });
      }
      return;
    }

    // optional fallback: attach-time promise (or current promise)
    const p = v?._promise;
    if (!p || typeof p.then !== "function") {
      emit("observe:catchup:no_value_no_promise");
      return;
    }

    emit("observe:catchup:await_promise");

    Promise.resolve(p).then(
      (value) => {
        emit("observe:catchup:promise_fulfilled", {
          value_defined: value !== undefined,
          value_ctor: value?.constructor?.name,
          v_version_now: v?._version
        });

        if (cancelled) return;
        if (v?._version !== versionAtAttach) {
          emit("observe:catchup:stale_skip_promise");
          return;
        }
        if (value === undefined) return;

        stealIfNeeded(value, "catchup:promise");

        try {
          observer.fulfilled?.(value, v?._name);
          emit("observe:catchup:fulfilled_sent_promise");
        } catch (e) {
          emit("observe:catchup:fulfilled_error_promise", {
            message: String(e)
          });
        }
      },
      (error) => {
        emit("observe:catchup:promise_rejected", {
          v_version_now: v?._version
        });

        if (cancelled) return;
        if (v?._version !== versionAtAttach) return;

        try {
          observer.rejected?.(error, v?._name);
          emit("observe:catchup:rejected_sent_promise");
        } catch (e) {
          emit("observe:catchup:rejected_error_promise", {
            message: String(e)
          });
        }
      }
    );
  });

  emit("observe:end");
  return cancel;
}
)}

function _observeOld(trace_variable,_,no_observer,isnode,toObject,queueMicrotask,getPromiseState){return(
function observeOld(v, observer, { invalidation, detachNodes = false } = {}) {
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
          debugger;
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
    queueMicrotask(() => {
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
    });
  } else {
    // either in pending or error state, we can check by racing a promise
    getPromiseState(v._promise).then(({ state, error, value }) => {
      if (v?._name === trace_variable) {
        debugger;
      }
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

function _19(md){return(
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

async function _decendants_example(descendants,lookupVariable,main,toObject){return(
[
  ...descendants(await lookupVariable("runtime", main))
].map(toObject)
)}

function _22(md){return(
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

async function _ascendants_example(ascendants,lookupVariable,main,toObject){return(
[...ascendants(await lookupVariable("runtime", main))].map(
  toObject
)
)}

function _25(md){return(
md`### lookupVariable
lookup a variable by name in a module, pass an array to lookup multiple`
)}

function _lookupVariable(){return(
async function lookupVariable(name_or_names, module) {
  if (typeof name_or_names === "string") {
    let v,
      retries,
      name = name_or_names;
    while (!module._scope.get(name) && retries++ < 1000) {
      await new Promise((r) => requestAnimationFrame(r));
    }
    return module._scope.get(name);
  } else if (Array.isArray(name_or_names)) {
    return Promise.all(
      name_or_names.map((name) => lookupVariable(name, module))
    );
  } else {
    throw "name_or_names should be string of an array";
  }
}
)}

function _27(md){return(
md`## obj_observer

The global Observer factory introduced in the Notebook 2.0 environment`
)}

function _ojs_observer(myModule){return(
myModule._runtime._builtin._scope.get("__ojs_observer")?._value
)}

function _29(md){return(
md`## keepalive

Keep a named cell evaluated without a direct dataflow dependancy. Useful to keep background tasks alive in dependancies when another module imports them.`
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

function _31(md){return(
md`## isOnObservableCom`
)}

function _isOnObservableCom(location){return(
() =>
  location.href.includes("observableusercontent.com") &&
  !location.href.includes("blob:")
)}

function _33(md){return(
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

function _37(md){return(
md`## Utils`
)}

function _38(md){return(
md`### unorderedSync
Helper for syncing two arrays`
)}

function _unorderedSync(_){return(
(goal, current, identityFn = _.isEqual) => ({
  add: _.differenceWith(goal, current, identityFn),
  remove: _.differenceWith(current, goal, (a, b) => identityFn(b, a))
})
)}

function _40(unorderedSync){return(
unorderedSync(
  [
    { name: "red", age: 12 },
    { name: "joe", age: 1 }
  ],
  [{ name: "joe" }, { name: "jean" }],
  (a, b) => a.name == b.name
)
)}

function _OBSERVED(){return(
new WeakMap()
)}

function _42(md){return(
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

function _44(md){return(
md`### observeSet

Attach a callback to Javascript set to get notified of mutations`
)}

function _observeSet(OBSERVED,queueMicrotask){return(
(set, callback) => {
  if (typeof callback !== "function")
    throw new TypeError("callback must be a function");

  let meta = OBSERVED.get(set);

  if (!meta) {
    const originalAdd = set.add;
    const originalDelete = set.delete;
    const originalClear = set.clear;

    meta = {
      observers: new Set(),
      originalAdd,
      originalDelete,
      originalClear,
      pending: false,
      dirty: false
    };

    const scheduleNotify = (self) => {
      meta.dirty = true;
      if (meta.pending) return;
      meta.pending = true;

      queueMicrotask(() => {
        meta.pending = false;
        if (!meta.dirty) return;
        meta.dirty = false;

        for (const cb of meta.observers) {
          try {
            // Keep callback shape: (op, args, set)
            // You can standardize on op="dirty".
            cb("dirty", [], self);
          } catch {}
        }
      });
    };

    set.add = function (value) {
      const result = originalAdd.call(this, value);
      scheduleNotify(this);
      return result;
    };

    set.delete = function (value) {
      const result = originalDelete.call(this, value);
      scheduleNotify(this);
      return result;
    };

    set.clear = function () {
      const result = originalClear.call(this);
      scheduleNotify(this);
      return result;
    };

    OBSERVED.set(set, meta);
  }

  meta.observers.add(callback);

  let unsubbed = false;
  return function unsubscribe() {
    if (unsubbed) return;
    unsubbed = true;

    const m = OBSERVED.get(set);
    if (!m) return;

    m.observers.delete(callback);

    if (m.observers.size === 0) {
      set.add = m.originalAdd;
      set.delete = m.originalDelete;
      set.clear = m.originalClear;
      OBSERVED.delete(set);
    }
  };
}
)}

function _46(md){return(
md`### Reposition set

move an element's iteration order within a set.`
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

function _48(md){return(
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

function _toObject(){return(
(v) =>
  Object.fromEntries(Object.getOwnPropertyNames(v).map((p) => [p, v[p]]))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("main", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("variables")).define("variables", ["Inputs","observeSet","Event"], _variables);
  main.variable(observer("viewof runtime_variables")).define("viewof runtime_variables", ["variables","runtime"], _runtime_variables);
  main.variable(observer("runtime_variables")).define("runtime_variables", ["Generators", "viewof runtime_variables"], (G, _) => G.input(_));
  main.variable(observer()).define(["runtime_variables"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("last_change")).define("last_change", ["Generators","invalidation","onCodeChange"], _last_change);
  main.variable(observer("onCodeChange")).define("onCodeChange", ["keepalive","myModule","codeChangeListeners"], _onCodeChange);
  main.variable(observer("codeChangeListeners")).define("codeChangeListeners", _codeChangeListeners);
  main.variable(observer("check_for_code_change")).define("check_for_code_change", ["runtime_variables","codeChangeListeners"], _check_for_code_change);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("trace_variable")).define("trace_variable", _trace_variable);
  main.define("initial trace_history", _trace_history);
  main.variable(observer("mutable trace_history")).define("mutable trace_history", ["Mutable", "initial trace_history"], (M, _) => new M(_));
  main.variable(observer("trace_history")).define("trace_history", ["mutable trace_history"], _ => _.generator);
  main.variable(observer("no_observer")).define("no_observer", ["main"], _no_observer);
  main.variable(observer("observe")).define("observe", ["Element","Text","trace_variable","mutable trace_history","no_observer","queueMicrotask"], _observe);
  main.variable(observer("observeOld")).define("observeOld", ["trace_variable","_","no_observer","isnode","toObject","queueMicrotask","getPromiseState"], _observeOld);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("descendants")).define("descendants", _descendants);
  main.variable(observer("decendants_example")).define("decendants_example", ["descendants","lookupVariable","main","toObject"], _decendants_example);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("ascendants")).define("ascendants", _ascendants);
  main.variable(observer("ascendants_example")).define("ascendants_example", ["ascendants","lookupVariable","main","toObject"], _ascendants_example);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("lookupVariable")).define("lookupVariable", _lookupVariable);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("ojs_observer")).define("ojs_observer", ["myModule"], _ojs_observer);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("keepalive")).define("keepalive", _keepalive);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("isOnObservableCom")).define("isOnObservableCom", ["location"], _isOnObservableCom);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer("thisModule")).define("thisModule", ["EventTarget","find_with_tag","Event"], _thisModule);
  main.variable(observer("find_with_tag")).define("find_with_tag", ["runtime"], _find_with_tag);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("unorderedSync")).define("unorderedSync", ["_"], _unorderedSync);
  main.variable(observer()).define(["unorderedSync"], _40);
  main.variable(observer("OBSERVED")).define("OBSERVED", _OBSERVED);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("getPromiseState")).define("getPromiseState", _getPromiseState);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("observeSet")).define("observeSet", ["OBSERVED","queueMicrotask"], _observeSet);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("repositionSetElement")).define("repositionSetElement", _repositionSetElement);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("isnode")).define("isnode", ["Element","Text"], _isnode);
  main.variable(observer("toObject")).define("toObject", _toObject);
  return main;
}
