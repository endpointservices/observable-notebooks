// https://observablehq.com/@tomlarkworthy/view@1173
import define1 from "./9bed702f80a3797e@402.js";
import define2 from "./58f3eb7334551ae6@187.js";

function _1(md){return(
md`# Composing viewofs with the _view_ literal

Lets make custom UIs on Observable _easy_ by composing views.

We wrap the amazing [hypertext literal](https://observablehq.com/@observablehq/htl) with a interceptor that looks for _[key, view]_ arguments. It uses the key to determine what field to map the view's value to in the container.

~~~js
viewof container = view\`<div>
  \${["child1", Inputs.text()]}
  \${["child2", Inputs.range()]}\`
~~~

The syntax of a 2 element array is inspired by [Object.entries(...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries).

By reusing the [hypertext literal](https://observablehq.com/@observablehq/htl) you are able to build your custom ui view using HTML, the best abstraction for layout. Because _view_ itself is a viewof, finally, we can hierarchically build up custom views from standard library views like [@observablehq/inputs](https://observablehq.com/@observablehq/inputs)

~~~js
     import {view} from '@tomlarkworthy/view'
~~~

#### How to use the view-literal in UI development

There is a substantial guide to [scaling UI development](https://observablehq.com/@tomlarkworthy/ui-development) which uses on this view literal quite heavily, and also has some weighty examples than the reference documentation here.


`
)}

function _2(md){return(
md`Known Issues:
- https://observablehq.com/@tomlarkworthy/dynamic-controls-example cannot bind to arrayView (DocumentFragment does not emit events)`
)}

function _3(toc){return(
toc()
)}

function _4(md){return(
md`## Change log

- 2021-03-03 *bindOneWay* has *onlyDefined* option added
- 2021-12-09 Bugfix for *arrayView* not bubbling events.
- 2021-11-05 *arrayView* refactored out
- 2021-09-05 [@mootari](/mootari) added lazy loading for testing, thus slimming its footprint significantly in production..
- 2021-07-29, hidden modifier added
- 2021-07-05, _array_ binding is now dynamic
- 2021-06-21, added _singleton_, _array_ and _object_ collection support

`
)}

function _5(md){return(
md`## About

The original need for a UI composition helper was noted by [@mootari](/@mootari) in a [Github issue](https://github.com/observablehq/inputs/issues/73). [@mbostock](/@mbostock) wrote some very nice composition tactics and greatly clarified desired behavior and, finally, I added the template syntax and passthrough API. It took us several months to get to this!
`
)}

function _6(md){return(
md`#### Demo`
)}

function _composite(view,Inputs){return(
view`<div style="display: flex; justify-content:space-between; ">
<div style="display: flex-column;">
  <div>${["r1", Inputs.range([0, 10])]}</div>
  <div>${["r2", Inputs.range([0, 3])]}</div>
  <div>${[
      "text",
      Inputs.text({
        label: "Enter some text"
      })
    ]}</div>
</div>
<img width="150"src="https://media.giphy.com/media/2vobTwCkFg88ZUnilt/giphy-downsized.gif"></img>
</div>
`
)}

function _8(md){return(
md`## Back-writable

You can write the values back into the component by setting 'value'. This works for sub-components too, as long as everything is following [reusability guidlines](https://observablehq.com/@tomlarkworthy/ui-linter).
`
)}

function _9(htl,$0,Event){return(
htl.html`<button onclick=${() => {
  $0.value = {
    r1: Math.random() * 10,
    r2: Math.random() * 3,
    text: `${Math.random()}`
  };
  $0.dispatchEvent(new Event('input'));
}}> randomize composite`
)}

function _10(md){return(
md`## Singletons

  Sometimes you want to just wrap an existing view with some HTML. Use the spread operators for this
`
)}

function _singleton(view,Inputs){return(
view`<div><h4>My control</h4>${['...', Inputs.range()]}`
)}

function _12(singleton){return(
singleton
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`## Collections -- Arrays

  You can bind an array of views to a single parameter with _\[string, ArrayOfViews]_. 

If you supply a third argument, a build function of _data => view_ the list can be dynamically resized  _\[label, ArrayOfViews, (data) => view]_
`
)}

function _arrayCollection(view,Inputs){return(
view`<div>${[
  "elements",
  Array.from({ length: 5 }, () => Inputs.range())
]}`
)}

function _16($0){return(
$0.elements
)}

function _17(md){return(
md`Array bindings are mutable, you can write DOM components to the viewof layer`
)}

function _18(Inputs,$0,Event){return(
Inputs.button("Add a slider", {
  reduce: () => {
    debugger;
    $0.elements = [
      ...$0.elements,
      Inputs.range() // Add another viewof
    ];
    // dispatch the input event so dataflow gets updated
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _19(arrayCollection){return(
arrayCollection.elements
)}

function _20(arrayCollection){return(
arrayCollection
)}

function _21(md){return(
md`### Dynamic Arrays

If you provide a rowBuilder function as the third argument the view will build new UI elements in response to reassignments at the data layer. It's decribed in detail in [@tomlarkworthy/ui-development#dynamic_lists](https://observablehq.com/@tomlarkworthy/ui-development#dynamic_lists)
`
)}

function _dynamicArrayCollection(view,Inputs){return(
view`<div>${[
  'elements',
  [],
  val => Inputs.range([0, 1], { value: val }) // rowBuilder
]}`
)}

function _23(Inputs,dynamicArrayCollection,$0,Event){return(
Inputs.button("Add a slider", {
  reduce: () => {
    dynamicArrayCollection.elements.push(Math.random());
    // dispatch the input event so dataflow gets updated
    $0.elements.dispatchEvent(new Event("input"));
  }
})
)}

function _24(Inputs,dynamicArrayCollection,$0,Event){return(
Inputs.button("Remove a slider", {
  reduce: () => {
    dynamicArrayCollection.elements.pop();
    // dispatch the input event so dataflow gets updated
    $0.elements.dispatchEvent(new Event("input"));
  }
})
)}

function _objects(md){return(
md`## Collections -- Objects

  You can bind an object of [string, view] to many parameters with the special spread key '_..._'

`
)}

function _objectCollection(view,Inputs){return(
view`${[
  '...',
  {
    number: Inputs.range(),
    text: Inputs.text()
  }
]}`
)}

function _27(objectCollection){return(
objectCollection
)}

function _28(md){return(
md`### Dynamic Objects

If you supply a view builder, _(data) => view_ as the third argument, you can dynamically add and remove entries to your view by assigning the a whole new object.
`
)}

function _dynamicObjectCollection(view,Inputs){return(
view`<div>${[
  '...',
  {},
  txt => Inputs.text({ value: txt })
]}`
)}

function _30(dynamicObjectCollection){return(
dynamicObjectCollection
)}

function _31($0){return(
$0
)}

function _32(Inputs,$0,Event){return(
Inputs.button("Pick one of three keys and randomize their value", {
  reduce: () => {
    const key = "k" + Math.floor(Math.random() * 3);
    $0.value = {
      ...$0.value,
      [key]: key + " " + Math.random()
    };
    $0.dispatchEvent(new Event('input', {bubbles: true}))
  }
})
)}

function _33(Inputs,$0,Event){return(
Inputs.button("Delete a random key", {
  reduce: () => {
    const copy = { ...$0.value };
    const key = "k" + Math.floor(Math.random() * 3);
    delete copy[key];
    $0.value = copy;
    $0.dispatchEvent(
      new Event('input', { bubbles: true })
    );
  }
})
)}

function _34($0){return(
$0.value
)}

function _35(md){return(
md`## Hidden views

  If you wish to bind a value to the view but not add it to the DOM, prefix the label with "_". This can be useful for bringing another view's value into the model without pruning its currently location.

known issues: does not work well with singletons.|
`
)}

function _hiddenView(view,$0){return(
view`<div><h4>My hidden control</h4>${[
  '_hidden',
  $0
]}`
)}

function _37($0,Event)
{
  $0.hidden.value = 0.60;
  $0.hidden.dispatchEvent(new Event("input", { bubble: true }));
}


function _38(md){return(
md`## Extras`
)}

function _39(md){return(
md`### Cautious Wrapper

You might not want changes to propagate immediately. For this usecase wrap with _cautious_.

*Contributed by [@mootari](/@mootari) and [@jobleonard](/@jobleonard). _isTrusted_ backwriting bypass yoinked from [@mbostock](/@mbostock) in a [talk thread](https://talk.observablehq.com/t/what-is-the-best-way-to-make-range-slider-update-only-on-release/5112/4). Name of feature yoinked from [@tmcw/inputs](https://observablehq.com/@tmcw/inputs/2)*

By default it wraps the inner node with a SPAN. This is usually the safest thing to do but not always, you can turn off this behaviour with the option _nospan: false_. Note: this will use the topmost node to hold the value.
`
)}

function _cautious(DOM,html){return(
function cautious(
  /* (apply, reset) => view */ viewBuilder,
  { nospan = false } = {}
) {
  const apply = DOM.uid().id;
  const reset = DOM.uid().id;

  function inputFilter(node, { filter } = {}) {
    node.addEventListener("input", (e) => {
      filter(e) || e.stopImmediatePropagation();
    });
    return node;
  }

  function wrapper(
    node,
    { initialOnly = false, signal = (e) => e.detail === reset } = {}
  ) {
    const ui = nospan ? node : html`<span>${node}</span>`;
    ui.value = { ...node.value };
    node.addEventListener("input", (e) => {
      if (signal(e)) {
        node.value = ui.value;
        e.stopImmediatePropagation();
      } else if (!initialOnly) {
        ui.value = { ...node.value };
      }
    });

    return ui;
  }

  function trigger(detail) {
    return (e) => {
      if (!e) console.log("An event needs to be passed to apply and reset");
      e.target.dispatchEvent(
        new CustomEvent("input", { bubbles: true, detail })
      );
    };
  }

  return wrapper(
    inputFilter(viewBuilder(trigger(apply), trigger(reset)), {
      filter: (e) => e.detail === apply || e.detail === reset || !e.isTrusted
    })
  );
}
)}

function _41(md){return(
md`#### Cautious demo`
)}

function _42(cautiousNestedDemo){return(
cautiousNestedDemo
)}

function _cautiousNestedDemo(view,cautious,Inputs){return(
view`
  ${[
    "c1",
    cautious(
      (apply, reset) => view`<div>
        ${['foo', Inputs.range([0, 100], { label: 'Foo', step: 1 })]}
        ${['bar', Inputs.text({ value: 'change me', label: 'Bar' })]}
        <hr style="margin:0;padding:10px;max-width:360px">
        <button onclick=${apply}>Apply</button>
        <button onclick=${reset}>Reset</button>`
    )
  ]}
  ${[
    "c2",
    cautious(
      (apply, reset) => view`<div>
        ${['baz', Inputs.range([0, 100], { label: 'Baz', step: 1 })]}
        ${['bat', Inputs.text({ value: 'change me', label: 'Bat' })]}
        <hr style="margin:0;padding:10px;max-width:360px">
        <button onclick=${apply}>Apply</button>
        <button onclick=${reset}>Reset</button>`
    )
  ]}

`
)}

function _44(md){return(
md`### bindOneWay

As views become composite heirarchies, its useful to transform their values as you connect their parts unidirectionally.

_bindOneWay(target, source, transform, options)_ is a *one-way* bind between event sources, that returns the target. _options_ keys include: _invalidation_, and _transform_.

Transform allows you to alter the data as it passed between from source to target. Unlike _Inputs.bind_, an event is raised on the target, making it more useful for chaining.

The signature follows Observables precedence (https://github.com/observablehq/inputs#bind)

`
)}

function _slider(Inputs){return(
Inputs.range([0, 10], { value: 0, label: "Try increasing me" })
)}

function _levels(bindOneWay,Inputs,$0){return(
bindOneWay(
  Inputs.radio(["0", "low", "high"], { disabled: true }),
  $0,
  {
    transform: v => (v === 0 ? "0" : v < 5 ? "low" : "high")
  }
)
)}

function _levelsText(bindOneWay,Inputs,$0){return(
bindOneWay(Inputs.text({ disabled: true }), $0, {
  transform: l => `The level is ${l}`
})
)}

function _bindOneWay(MutationObserver,Event)
{
  function disposal(element) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        if (!element.closest) return;

        const target = element.closest(".observablehq");
        if (!target) return resolve();
        const observer = new MutationObserver(() => {
          if (target.contains(element)) return;
          observer.disconnect(), resolve();
        });
        observer.observe(target, { childList: true });
      });
    });
  }

  return function bindOneWay(
    target,
    /* primary*/ source,
    { invalidation, transform = (d) => d, onlyDefined = false } = {}
  ) {
    const sourceEvent = eventof(source);
    const targetEvent = eventof(target);
    const onsource = () => {
      set(target, source);
      target.dispatchEvent(new Event(targetEvent, { bubles: true }));
    };
    onsource();
    source.addEventListener(sourceEvent, onsource);
    if (!invalidation) invalidation = disposal(target);
    invalidation.then(() => source.removeEventListener(sourceEvent, onsource));
    return target;

    function get(input) {
      switch (input.type) {
        case "range":
        case "number":
          return input.valueAsNumber;
        case "date":
          return input.valueAsDate;
        case "checkbox":
          return input.checked;
        case "file":
          return input.multiple ? input.files : input.files[0];
        default:
          return input.value;
      }
    }

    function set(target, source) {
      const value = transform(get(source));
      if (onlyDefined && !value) return;
      switch (target.type) {
        case "range":
        case "number":
          target.valueAsNumber = value;
          break;
        case "date":
          target.valueAsDate = value;
          break;
        case "checkbox":
          target.checked = value;
          break;
        case "file":
          target.multiple ? (target.files = value) : (target.files = [value]);
          break;
        default:
          target.value = value;
          break;
      }
    }

    function eventof(input) {
      switch (input.type) {
        case "button":
        case "submit":
          return "click";
        case "file":
          return "change";
        default:
          return "input";
      }
    }
  };
}


function _49(md){return(
md`### variable

Variables allow you to add additional degrees of freedom to a component as normal views. They have an contained 'value', and they can be bind to.


The contract of Observable states changes to a view's value should update visual appearance **but not cascade**, whereas if an _'input'_ events is dispatch the cell should cascade Dataflow. Thus a variable defines an additional event type 'assign' which is emmitted whenever the variable is assigned. This is so you can hook variables being assigned to and make DOM manipulations without causing a dataflow cascade.

The toString of variable is a coercion of the value, so a variable as a view can be placed in attribute nodes etc.

`
)}

function _variable(){return(
function variable(value, { name = "variable" } = {}) {
  const self = document.createComment(name);
  return Object.defineProperties(self, {
    value: {
      get: () => value,
      set: newValue => {
        value = newValue;
        self.dispatchEvent(new CustomEvent('assign', { detail: newValue }));
      },
      enumerable: true
    },
    toString: {
      value: () => `${value}`
    }
  });
}
)}

function _exmple_variable(variable){return(
variable(5)
)}

function _52(exmple_variable){return(
exmple_variable.value = 44
)}

function* _53(exmple_variable)
{
  let resolve = null;
  exmple_variable.addEventListener('assign', evt => resolve(evt.detail));
  while (true) {
    yield new Promise(r => (resolve = r));
  }
}


function _54(md){return(
md`## Code

Most of the work is done by _htl_, we are simply adding a new _[key, HTML]_ case
`
)}

function _view(wrap,htl){return(
function view(strings, ...exprs) {
  return wrap(htl.html, strings, ...exprs);
}
)}

function _viewSvg(wrap,htl){return(
function viewSvg(strings, ...exprs) {
  return wrap(htl.svg, strings, ...exprs);
}
)}

function _wrap(EventTarget,arrayView,Node){return(
function wrap(fn, strings, ...exprs) {
  let singleton = undefined;
  let start = undefined; // To know where to start dynamic objects
  let builder = undefined; // For new keys are added dynamically
  const views = {};

  const pexpr = exprs.map((exp) => {
    // All special functions are [key, ...]
    // Otherwise we pass through
    if (!Array.isArray(exp) || typeof exp[0] !== "string") {
      return exp;
    }

    const hidden = exp[0].startsWith("_");
    const key = hidden ? exp[0].substring(1) : exp[0];
    if (key === "value") throw new Error("Cannot use 'value' as a key");
    let presentation;

    if (exp.length === 2 && exp[1] instanceof EventTarget) {
      // SINGLE VIEW PASSED IN
      if (key === "...") {
        // SINGLETON!
        singleton = exp[1];
      } else {
        // look for [key, HTML] entries
        views[key] = exp[1];
      }
      presentation = exp[1];
    } else if (
      // ARRAY PASSED IN (NO BUILDER)
      exp.length === 2 &&
      Array.isArray(exp[1]) &&
      exp[1].every((e) => e instanceof EventTarget)
    ) {
      if (key === "...") throw new Error("Spread not supported for arrays ATM");
      /*
      const start = document.createComment(key);
      arrayViews[key] = {
        start,
        array: exp[1]
      };
      presentation = [start, ...exp[1]];*/
      presentation = arrayView({
        name: key,
        initial: exp[1]
      });
      views[key] = presentation;
    } else if (
      // ARRAY PASSED IN (WITH BUILDER)
      exp.length === 3 &&
      Array.isArray(exp[1]) &&
      exp[1].every((e) => e instanceof EventTarget) &&
      typeof exp[2] === "function"
    ) {
      if (key === "...") throw new Error("Spread not supported for arrays ATM");
      /*
      const start = document.createComment(key);
      arrayViews[key] = {
        start,
        array: exp[1],
        builder: exp[2]
      };
      presentation = [start, ...exp[1]];*/
      presentation = arrayView({
        name: key,
        initial: exp[1],
        builder: exp[2]
      });
      views[key] = presentation;
    } else if (
      // SPREAD OBJECT (NO BUILDER)
      exp.length === 2 &&
      key === "..." &&
      typeof exp[1] === "object" &&
      Object.keys(exp[1]).every((e) => typeof e === "string") &&
      Object.values(exp[1]).every((e) => e instanceof EventTarget)
    ) {
      Object.entries(exp[1]).forEach((e) => (views[e[0]] = e[1]));
      presentation = Object.values(exp[1]);
    } else if (
      // SPREAD OBJECT (WITH BUILDER)
      exp.length === 3 &&
      key === "..." &&
      typeof exp[1] === "object" &&
      Object.keys(exp[1]).every((e) => typeof e === "string") &&
      Object.values(exp[1]).every((e) => e instanceof EventTarget) &&
      typeof exp[2] === "function"
    ) {
      Object.entries(exp[1]).forEach((e) => (views[e[0]] = e[1]));
      start = document.createComment(key);
      builder = exp[2];
      presentation = [start, ...Object.values(exp[1])];
    } else {
      presentation = exp;
    }

    if (hidden) {
      const forwardEvent = (evt) => {
        const clone = new evt.constructor(evt.type, evt);
        self.dispatchEvent(clone);
      };
      if (presentation.addEventListener) {
        presentation.addEventListener("input", forwardEvent);
      } else if (Array.isArray(presentation)) {
        presentation.forEach((p) => {
          // The first element can be the start event sometimes
          if (p.addEventListener) {
            p.addEventListener("input", forwardEvent);
          }
        });
      } else {
        throw new Error("Not sure how to deal with this hidden element");
      }

      return undefined; // No DOM representation
    } else {
      return presentation; // Places in DOM
    }
  });
  const self = fn(strings, ...pexpr);

  if (singleton) {
    if (Object.keys(views).length !== 0)
      throw new Error("Singleton defined but additional properties supplied");

    // Users are expected to call dispatchEvent on view, so the inner singleton
    // need to know about these events for the view to work
    // => events need to be copied over, if originating from here
    self.addEventListener("input", (evt) => {
      if (evt.target === self) {
        const clone = new evt.constructor(evt.type, evt);
        singleton.dispatchEvent(clone);
      }
    });

    return Object.defineProperties(self, {
      value: {
        get: () => singleton.value,
        set: (val) => (singleton.value = val),
        configurable: true
      },
      singleton: {
        value: singleton,
        enumerable: true
      }
    });
  }
  // Non-singleton (Object or Array)
  return Object.defineProperties(self, {
    value: {
      get() {
        return Object.defineProperties(
          {},
          Object.keys(views).reduce((acc, key) => {
            acc[key] = {
              get: () => views[key].value,
              set: (v) => (views[key].value = v),
              enumerable: true
            };
            return acc;
          }, {})
        );
      },
      set(newValues) {
        Object.entries(newValues).forEach(([key, newValue]) => {
          if (views[key]) {
            views[key].value = newValue; // Update of existing child value
          } else if (start && builder) {
            // Adding a new key
            const parent = start.parentNode;
            const newView = builder(newValue);
            views[key] = newView;
            parent.appendChild(newView);
            // Add top level entry too
            Object.defineProperty(self, key, {
              value: newView,
              enumerable: true,
              configurable: true
            });
          }
        });

        // If we are a dynamic Object, we need to remove keys too
        Object.entries(views).forEach(([key, oldValue]) => {
          if (!newValues.hasOwnProperty(key)) {
            // It needs to go
            const oldView = views[key];
            delete views[key];
            if (oldView.remove) oldView.remove();
            delete self[key];
          }
        });
      },
      configurable: true
    },
    ...Object.keys(views).reduce(
      // Add top level field to access the subviews in the parent viewof
      (acc, key) => {
        acc[key] = {
          get: () => views[key],
          set: (newView) => {
            const oldView = views[key];
            delete views[key];
            if (oldView.remove) oldView.remove();

            // assigning an arrayView (special cased)
            if (oldView.length && newView.length) {
              newView = arrayView({
                initial: newView,
                builder: oldView.builder
              });
            }

            views[key] = newView;
            if (newView instanceof Node) self.appendChild(newView);
          },
          enumerable: true,
          configurable: true
        };
        return acc;
      },
      {}
    )
  });
}
)}

function _58(md){return(
md`### arrayView

arrayView is a DocumentFragment whose nodes are subviews organised in an array. It is initialized with a *builder* of which is a function from data to a subview. E.g. \`(str) => Inputs.text({value: str})\`, and it can be initialised with a set of views.

Its presentation layer is a DocumentFragment, but with added array like behaviour so subviews are indexable like an array.

Its data object is an array, whose in-place methods (splice, push, pop, shift, unshift) are mirrored to DOM manipulation.

So assigning a new data array *e.g.* \`view.value = [...]\`, will replace the whole DOM. Pushing an element on an array will insert a single DOM *e.g.* \`view.push(...)\` using the *builder* to make the new DOM element. By preferring in-place manipulations you can create efficient UIs that minimize DOM manipulations.

<mark>
todo
- Its pretty confusing viewof array.splice does not work now
</mark>`
)}

function _arrayView(DOM,DocumentFragment,HTMLElement,htl,_){return(
function arrayView({
  name = "arrayNode" + DOM.uid().id,
  value = [],
  initial = [],
  builder
} = {}) {
  if (value.length > 0 && !builder)
    throw new Error(
      "You cannot initialize an arrayView with data without a builder"
    );

  const frag = new DocumentFragment();

  const subviewToFragmentEventCloner = (e) => {
    const new_e = new e.constructor(e.type, e);
    frag.dispatchEvent(new_e);
  };

  const _builder = builder
    ? (arg) => {
        const subview = builder(arg);
        subview.addEventListener("input", subviewToFragmentEventCloner);
        return subview;
      }
    : undefined;

  const unbuilder = (subview) => {
    subview.removeEventListener("input", subviewToFragmentEventCloner);
  };

  initial.forEach((subview) =>
    subview.addEventListener("input", subviewToFragmentEventCloner)
  );

  const start = document.createComment("START:" + name);
  const end = document.createComment("END:" + name);
  let subviews = (_builder ? value.map(_builder) : []).concat(initial);
  frag.append(...[start, ...subviews, end]);

  frag.addEventListener("input", (e) => {
    // https://stackoverflow.com/questions/11974262/how-to-clone-or-re-dispatch-dom-events
    const new_e = new e.constructor(e.type, e);
    start.dispatchEvent(new_e);
  });

  const getIndexProperty = (index) => ({
    get: () => subviews[index],
    enumerable: true,
    configurable: true
  });

  const customSplice = (startIndex, deleteCount, ...items) => {
    const parent = start.parentNode;
    startIndex = Math.floor(startIndex);
    const removedData = [];
    // sync the splice with the DOM
    let node = start;
    // Forward to begining of the splice
    for (let i = 0; i < startIndex && i < subviews.length; i++)
      node = node.nextSibling;
    // delete 'deleteCount' times
    for (let i = 0; i < deleteCount && i < subviews.length; i++) {
      const toDelete = node.nextSibling;
      removedData.push(toDelete.value);
      unbuilder(toDelete);
      toDelete.remove();
    }
    // add additional items
    const itemViews = [];
    for (let i = items.length - 1; i >= 0; i--) {
      const subview = _builder(items[i]);
      Object.defineProperty(frag, i, getIndexProperty(i));
      let presentation =
        subview instanceof HTMLElement ? subview : htl.html`${subview}`;
      itemViews.unshift(subview);
      parent.insertBefore(presentation, node.nextSibling);
    }

    // Apply to cache
    subviews.splice(startIndex, deleteCount, ...itemViews);
    // Let flow upwards to array too
    return removedData;
  };
  // We intercept operations to the data array and use it to drive DOM operations too.
  const dataArrayProxyHandler = {
    get: function (target, prop, receiver) {
      const args = arguments;

      if (prop === "splice") {
        return customSplice;
      } else if (prop === "push") {
        return (...elements) => {
          customSplice(subviews.length, 0, ...elements);
          return subviews.length;
        };
      } else if (prop === "pop") {
        return () => {
          return customSplice(subviews.length - 1, 1)[0];
        };
      } else if (prop === "shift") {
        return () => {
          return customSplice(0, 1)[0];
        };
      } else if (prop === "unshift") {
        return (...elements) => {
          customSplice(0, 0, ...elements);
          return subviews.length;
        };
      }
      return Reflect.get(...args);
    },
    set(obj, prop, value) {
      if (!isNaN(+prop)) {
        // we also need to set the view
        customSplice(+prop, 1, value);
      }
      return Reflect.set(...arguments);
    }
  };

  // Add data channel
  Object.defineProperties(frag, {
    value: {
      get: () =>
        new Proxy(
          subviews.map((sv) => sv.value),
          dataArrayProxyHandler
        ),
      set: (newArray) => {
        const vArr = _.cloneDeep(newArray);
        const parent = start.parentNode;

        if (builder) {
          // We should be true to the operation and tear of the DOM and then replace it.
          subviews.forEach((sv) => (sv.remove ? sv.remove() : undefined));
          subviews = vArr.map((data) => {
            const subview = _builder(data);
            let presentation =
              subview instanceof HTMLElement ? subview : htl.html`${subview}`;
            parent.insertBefore(presentation, end);
            return subview;
          });
        } else {
          // We have to work around the limitations and try to do the operation without
          // building, so this only can work if you are setting it to something smaller
          vArr.forEach((v, i) => {
            if (i < subviews.length) {
              subviews[i].value = v; // mutate inplace
            } else {
              let built = _builder(v); // append additional
              subviews[i] = built;
              if (!(built instanceof HTMLElement)) built = htl.html`${built}`;
              parent.appendChild(built);
            }
          });

          for (var i = subviews.length - 1; i >= vArr.length; i--) {
            // delete backwards
            const deleted = subviews.pop();
            if (deleted.remove) deleted.remove();
          }
        }
      }
    }
  });

  // Add presentation channel
  return Object.defineProperties(frag, {
    remove: {
      value: () => {
        const toRemove = [];
        for (var node = start; node !== end; node = node.nextSibling) {
          toRemove.push(node);
        }
        toRemove.push(end);
        toRemove.forEach((n) => n.remove());
      }
    },
    length: {
      get: () => subviews.length,
      enumerable: true,
      configurable: true
    },
    [Symbol.iterator]: {
      value: () => {
        let index = 0;
        return {
          next() {
            if (index < subviews.length) {
              let val = subviews[index];
              index++;
              return { value: val, done: false };
            } else return { done: true };
          }
        };
      }
    },
    ...subviews.reduce((acc, sv, index) => {
      acc[index] = getIndexProperty(index);
      return acc;
    }, {})
  });
}
)}

function _60(md,numbers){return(
md`length: ${numbers.length} with elements: ${numbers.join(", ")}`
)}

function _61(htl,Inputs,$0,Event,numbers){return(
htl.html`<div style="display: flex;">
${Inputs.button("reset", {
  reduce: () => {
    $0.value = [1, 2, 3, 4, 5, 6];
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}
${Inputs.button("delete last", {
  reduce: () => {
    numbers.splice(numbers.length - 1, 1);
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}
${Inputs.button("delete random", {
  reduce: () => {
    const choice = Math.random() * numbers.length;
    numbers.splice(choice, 1);
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}
${Inputs.button("push number", {
  reduce: () => {
    numbers.push(numbers.length + 1);
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}

${Inputs.button("unshift", {
  reduce: () => {
    numbers.unshift(0);
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}

${Inputs.button("pop", {
  reduce: () => {
    numbers.pop();
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}

${Inputs.button("shift", {
  reduce: () => {
    numbers.shift();
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}
`
)}

function _numbers(view,arrayView,Inputs){return(
view`<table>
  ${[
    "...",
    arrayView({
      value: [1, 2, 3, 4, 5, 6],
      builder: (number) =>
        view`<tr><td>${["...", Inputs.number({ value: number })]}</td></tr>`
    })
  ]}
</table>`
)}

function _arrayViewTests(testing){return(
testing.createSuite({
  name: "arrayView Tests",
  timeout_ms: 1000
})
)}

function _64(arrayViewTests,arrayView,Inputs,view,Event){return(
arrayViewTests.test("arrayView dispatchEvent bubbles to container", (done) => {
  const av = arrayView({ builder: (v) => Inputs.input(v) });
  const container = view`<div>${av}`;
  container.addEventListener("input", () => done());
  av.dispatchEvent(new Event("input", { bubbles: true }));
})
)}

function _65(arrayViewTests,arrayView,Inputs,Event){return(
arrayViewTests.test("arrayView subview events bubble to arrayView", (done) => {
  const av = arrayView({
    value: [1],
    builder: (v) => Inputs.input(v)
  });
  av.addEventListener("input", () => done());
  av[0].dispatchEvent(new Event("input", { bubbles: true }));
})
)}

function _66(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView initialization (data + builder)", () => {
  const av = arrayView({
    value: [1],
    builder: (number) => Inputs.input("foo")
  });
  expect(av[0].value).toBe("foo");
  expect(av.value[0]).toBe("foo");
})
)}

function _67(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView initialization (initial)", () => {
  const av = arrayView({ initial: [Inputs.input("foo")] });
  expect(av[0].value).toBe("foo");
  expect(av.value[0]).toBe("foo");
})
)}

function _68(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView write element", () => {
  const av = arrayView({
    initial: [Inputs.input("foo")],
    builder: Inputs.input
  });
  expect(av[0].value).toBe("foo");
  expect(av.value[0]).toBe("foo");

  av.value[0] = "bar";

  expect(av[0].value).toBe("bar");
  expect(av.value[0]).toBe("bar");
})
)}

function _69(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView splice (delete)", () => {
  const av = arrayView({ initial: [Inputs.input("foo")] });
  expect(av[0].value).toBe("foo");
  expect(av.value[0]).toBe("foo");
  expect(av.length).toBe(1);
  expect(av.value.length).toBe(1);

  av.value.splice(0, 1);

  expect(av[0]).toBe(undefined);
  expect(av.value[0]).toBe(undefined);
  expect(av.value.length).toBe(0);
  expect(av.length).toBe(0);
})
)}

function _70(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView splice out of bounds (delete)", () => {
  const av = arrayView({ initial: [Inputs.input("foo")] });
  expect(av[0].value).toBe("foo");
  expect(av.value[0]).toBe("foo");
  expect(av.length).toBe(1);
  expect(av.value.length).toBe(1);

  av.value.splice(1, 1);

  expect(av[0].value).toBe("foo");
  expect(av.value[0]).toBe("foo");
  expect(av.length).toBe(1);
  expect(av.value.length).toBe(1);
})
)}

function _71(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView splice (add)", () => {
  const av = arrayView({ builder: (v) => Inputs.input(v) });
  av.value.splice(0, 0, 1);
  expect(av[0].value).toBe(1);
  expect(av.value[0]).toBe(1);
})
)}

function _72(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView unshift", () => {
  const av = arrayView({ builder: (v) => Inputs.input(v) });
  av.value.unshift(1);
  expect(av[0].value).toBe(1);
  expect(av.value[0]).toBe(1);
})
)}

function _73(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView shift", () => {
  const av = arrayView({ value: [1], builder: (v) => Inputs.input(v) });
  av.value.shift(1);
  expect(av[0]).toBe(undefined);
  expect(av.value[0]).toBe(undefined);
})
)}

function _74(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView pop", () => {
  const av = arrayView({ value: [1], builder: (v) => Inputs.input(v) });
  av.value.pop();
  expect(av[0]).toBe(undefined);
  expect(av.value[0]).toBe(undefined);
})
)}

function _75(arrayViewTests,arrayView,Inputs,expect){return(
arrayViewTests.test("arrayView push", () => {
  const av = arrayView({ builder: (v) => Inputs.input(v) });
  av.value.push(1);
  expect(av[0].value).toBe(1);
  expect(av.value[0]).toBe(1);
})
)}

function _76(md){return(
md`## [Optional] Tests`
)}

function _RUN_TESTS(){return(
true
)}

async function _testing(RUN_TESTS,invalidation)
{
  if (!RUN_TESTS) return invalidation;
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/@tomlarkworthy/testing.js?v=3`)
  ]);
  const module = new Runtime().module(define);
  return Object.fromEntries(
    await Promise.all(
      ["expect", "createSuite"].map((n) => module.value(n).then((v) => [n, v]))
    )
  );
}


function _suite(testing){return(
testing.createSuite({
  name: "Unit Tests",
  timeout_ms: 1000
})
)}

function _expect(testing){return(
testing.expect
)}

function _81(suite,view,variable,expect){return(
suite.test("Singleton spread reads from delagate", async () => {
  const v = view`<div>${["...", variable(1)]}`;
  expect(v.value).toEqual(1);
})
)}

function _82(suite,variable,view,expect){return(
suite.test("Singleton spread write propagates", async () => {
  const delegate = variable();
  const v = view`<div>${["...", delegate]}`;
  v.value = 4;
  expect(delegate.value).toEqual(4);
})
)}

function _83(suite,variable,view,Event){return(
suite.test(
  "Singleton events propagate from container to inner singleton",
  async (done) => {
    const delegate = variable();
    delegate.addEventListener("input", (evt) => {
      done();
    });
    const v = view`<div>${["...", delegate]}`;
    v.dispatchEvent(new Event("input"));
  }
)
)}

function _84(suite,variable,view,expect){return(
suite.test("Hidden write propagates upstream", async () => {
  const delegate = variable();
  const v = view`<div>${["_hidden", delegate]}`;
  v.hidden.value = 4;
  expect(delegate.value).toEqual(4);
})
)}

function _85(suite,variable,view,Event){return(
suite.test("Hidden events propogate to self", async (done) => {
  const delegate = variable();
  const v = view`<div>${["_hidden", delegate]}`;
  v.addEventListener("input", (evt) => {
    done();
  });
  delegate.dispatchEvent(new Event("input"));
})
)}

function _86(suite,variable,view,Event){return(
suite.test(
  "Hidden object collection member events propogate to self",
  async (done) => {
    const delegate = variable();
    const v = view`<div>${["_...", { a: delegate }]}`;
    v.addEventListener("input", (evt) => {
      done();
    });
    delegate.dispatchEvent(new Event("input"));
  }
)
)}

function _87(suite,view,html,expect){return(
suite.test("Nested write on arrayView replaces presentation", async () => {
  const v = view`<div>${["array", [html`<input id=nwoa1 value="foo">`]]}`;
  expect(v.querySelector("#nwoa1")).not.toBe(null);
  expect(v.querySelector("#nwoa2")).toBe(null);
  expect(v.array.value).toEqual(["foo"]);

  v.array = [html`<input id=nwoa2 value="fum">`];
  expect(v.querySelector("#nwoa1")).toBe(null);
  expect(v.querySelector("#nwoa2")).not.toBe(null);
  expect(v.array.value).toEqual(["fum"]);
})
)}

function _88(suite,view,Inputs,expect){return(
suite.test(
  "Composite write spreads to array subproperty (deletion)",
  async () => {
    const v = view`<div>${["array", [Inputs.input()]]}`;
    v.value = { array: [] };
    expect([...v.array]).toEqual([]);
    expect(v.value.array).toEqual([]);
  }
)
)}

function _89(suite,view,Inputs,expect){return(
suite.test(
  "Composite write spreads to array subproperty (addition) (via destructuring assignment)",
  async () => {
    const v = view`<div>${["array", [Inputs.input()], (v) => Inputs.input(v)]}`;
    v.value = { array: [1, 2] };
    expect(v.value.array).toEqual([1, 2]);
    expect(v.array).toContainEqual(Inputs.input(1));
    expect(v.array).toContainEqual(Inputs.input(2));
  }
)
)}

function _90(suite,view,Inputs,expect){return(
suite.test(
  "Composite write spreads to array subproperty (addition) (via view.value assignment)",
  async () => {
    const v = view`<div>${["array", [Inputs.input()], (v) => Inputs.input(v)]}`;
    v.array.value = [1, 2]; // Should work but doesn't, we need some kind of ArrayView type
    expect(v.value.array).toEqual([1, 2]);
    expect(v.array).toContainEqual(Inputs.input(1));
    expect(v.array).toContainEqual(Inputs.input(2));
  }
)
)}

function _91(suite,view,Inputs,expect){return(
suite.test(
  "Composite write spreads to array subproperty (addition) (via data assignment)",
  async () => {
    const v = view`<div>${["array", [Inputs.input()], (v) => Inputs.input(v)]}`;
    v.value.array = [1, 2];
    expect(v.value.array).toEqual([1, 2]);
    expect(v.array).toContainEqual(Inputs.input(1));
    expect(v.array).toContainEqual(Inputs.input(2));
  }
)
)}

function _92(suite,view,Inputs,expect){return(
suite.test("Array get", async () => {
  const v = view`<div>${["array", [Inputs.input(1)]]}`;
  expect(v.value.array).toEqual([1]);
  expect(v.array[0]).toEqual(Inputs.input(1));
  expect([...v.array]).toEqual([Inputs.input(1)]);
})
)}

function _93(suite,view,Inputs,expect){return(
suite.test("Array write with builder creates new elements", async () => {
  const v = view`<div>${["array", [Inputs.input()], (v) => Inputs.input(v)]}`;
  v.value.array = [1, 2];
  expect(v.value.array).toEqual([1, 2]);
  expect(v.array).toContainEqual(Inputs.input(1));
  expect(v.array).toContainEqual(Inputs.input(2));
})
)}

function _94(suite,view,Inputs,expect){return(
suite.test("Array write remove elements", async () => {
  const v = view`<div>${["array", [Inputs.input(0), Inputs.input(2)]]}`;
  v.value.array = [1];
  expect(v.value.array).toEqual([1]);
  expect(v.array).toContainEqual(Inputs.input(1));
})
)}

function _95(suite,view,Inputs,expect){return(
suite.test("Array in-place splice support (delete), no builder", async () => {
  const v = view`<div>${["array", [Inputs.input(0), Inputs.input(2)]]}`;
  v.value.array.splice(0, 1);
  expect(v.value.array).toEqual([2]);
})
)}

function _96(suite,view,Inputs,expect){return(
suite.test("Array in-place splice support (delete), with builder", async () => {
  const v = view`<div>${[
    "array",
    [Inputs.input(0), Inputs.input(2)],
    (v) => Inputs.input(v)
  ]}`;
  v.value.array.splice(0, 1);
  expect(v.value.array).toEqual([2]);
})
)}

function _97(suite,view,Inputs,expect){return(
suite.test(
  "Array in-place splice support (addition) with builder",
  async () => {
    const v = view`<div>${[
      "array",
      [Inputs.input(0)],
      (v) => Inputs.input(v)
    ]}`;
    v.value.array.splice(1, 0, 1);
    expect(v.value.array).toEqual([0, 1]);
    expect([...v.array]).toEqual([Inputs.input(0), Inputs.input(1)]);
  }
)
)}

function _98(suite,view,Inputs,expect){return(
suite.test("Dynamic Object value property assignment", async () => {
  const v = view`<div>${["field", Inputs.input()]}`;
  v.value = { field: 1 };
  expect(v.field.value).toEqual(1);
  expect(v.value.field).toEqual(1);
})
)}

function _99(suite,view,Inputs,expect){return(
suite.test("Dynamic Object view property assignment", async () => {
  const v = view`<div>${["field", Inputs.input()]}`;
  v.field = Inputs.input("2");
  expect(v.field.value).toEqual("2");
  expect(v.value.field).toEqual("2");
})
)}

function _100(suite,view,Inputs,expect){return(
suite.test(
  "Dynamic Object write with builder creates new elements",
  async () => {
    const v = view`<div>${["...", {}, (v) => Inputs.text({ value: v })]}`;
    v.value = { a: "b" };
    expect(v.value).toEqual({ a: "b" });
    expect(v.a).toHaveProperty("name"); // It's a DOM node
  }
)
)}

function _101(suite,view,Inputs,expect){return(
suite.test("Dynamic Object write deletes old elements", async () => {
  const v = view`<div>${["...", { a: Inputs.text() }]}`;
  expect(v.value).toEqual({ a: "" });
  expect(v.a).toHaveProperty("name"); // It's a DOM node
  v.value = {};
  expect(v.value).toEqual({});
  expect(v.a).toBeUndefined();
})
)}

function _102(suite,view,Inputs,expect){return(
suite.test("Collection object creates matching keys", async () => {
  const v = view`<div>${[
    "...",
    {
      a: Inputs.input()
    }
  ]}`;
  expect(v.value).toHaveProperty("a");
})
)}

function _105(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["toc"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof composite")).define("viewof composite", ["view","Inputs"], _composite);
  main.variable(observer("composite")).define("composite", ["Generators", "viewof composite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl","viewof composite","Event"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof singleton")).define("viewof singleton", ["view","Inputs"], _singleton);
  main.variable(observer("singleton")).define("singleton", ["Generators", "viewof singleton"], (G, _) => G.input(_));
  main.variable(observer()).define(["singleton"], _12);
  main.variable(observer()).define(["viewof singleton"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof arrayCollection")).define("viewof arrayCollection", ["view","Inputs"], _arrayCollection);
  main.variable(observer("arrayCollection")).define("arrayCollection", ["Generators", "viewof arrayCollection"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof arrayCollection"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["Inputs","viewof arrayCollection","Event"], _18);
  main.variable(observer()).define(["arrayCollection"], _19);
  main.variable(observer()).define(["arrayCollection"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof dynamicArrayCollection")).define("viewof dynamicArrayCollection", ["view","Inputs"], _dynamicArrayCollection);
  main.variable(observer("dynamicArrayCollection")).define("dynamicArrayCollection", ["Generators", "viewof dynamicArrayCollection"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","dynamicArrayCollection","viewof dynamicArrayCollection","Event"], _23);
  main.variable(observer()).define(["Inputs","dynamicArrayCollection","viewof dynamicArrayCollection","Event"], _24);
  main.variable(observer("objects")).define("objects", ["md"], _objects);
  main.variable(observer("viewof objectCollection")).define("viewof objectCollection", ["view","Inputs"], _objectCollection);
  main.variable(observer("objectCollection")).define("objectCollection", ["Generators", "viewof objectCollection"], (G, _) => G.input(_));
  main.variable(observer()).define(["objectCollection"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof dynamicObjectCollection")).define("viewof dynamicObjectCollection", ["view","Inputs"], _dynamicObjectCollection);
  main.variable(observer("dynamicObjectCollection")).define("dynamicObjectCollection", ["Generators", "viewof dynamicObjectCollection"], (G, _) => G.input(_));
  main.variable(observer()).define(["dynamicObjectCollection"], _30);
  main.variable(observer()).define(["viewof dynamicObjectCollection"], _31);
  main.variable(observer()).define(["Inputs","viewof dynamicObjectCollection","Event"], _32);
  main.variable(observer()).define(["Inputs","viewof dynamicObjectCollection","Event"], _33);
  main.variable(observer()).define(["viewof dynamicObjectCollection"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("viewof hiddenView")).define("viewof hiddenView", ["view","viewof singleton"], _hiddenView);
  main.variable(observer("hiddenView")).define("hiddenView", ["Generators", "viewof hiddenView"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof hiddenView","Event"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("cautious")).define("cautious", ["DOM","html"], _cautious);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["cautiousNestedDemo"], _42);
  main.variable(observer("viewof cautiousNestedDemo")).define("viewof cautiousNestedDemo", ["view","cautious","Inputs"], _cautiousNestedDemo);
  main.variable(observer("cautiousNestedDemo")).define("cautiousNestedDemo", ["Generators", "viewof cautiousNestedDemo"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("viewof slider")).define("viewof slider", ["Inputs"], _slider);
  main.variable(observer("slider")).define("slider", ["Generators", "viewof slider"], (G, _) => G.input(_));
  main.variable(observer("viewof levels")).define("viewof levels", ["bindOneWay","Inputs","viewof slider"], _levels);
  main.variable(observer("levels")).define("levels", ["Generators", "viewof levels"], (G, _) => G.input(_));
  main.variable(observer("viewof levelsText")).define("viewof levelsText", ["bindOneWay","Inputs","viewof levels"], _levelsText);
  main.variable(observer("levelsText")).define("levelsText", ["Generators", "viewof levelsText"], (G, _) => G.input(_));
  main.variable(observer("bindOneWay")).define("bindOneWay", ["MutationObserver","Event"], _bindOneWay);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("variable")).define("variable", _variable);
  main.variable(observer("exmple_variable")).define("exmple_variable", ["variable"], _exmple_variable);
  main.variable(observer()).define(["exmple_variable"], _52);
  main.variable(observer()).define(["exmple_variable"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("view")).define("view", ["wrap","htl"], _view);
  main.variable(observer("viewSvg")).define("viewSvg", ["wrap","htl"], _viewSvg);
  main.variable(observer("wrap")).define("wrap", ["EventTarget","arrayView","Node"], _wrap);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("arrayView")).define("arrayView", ["DOM","DocumentFragment","HTMLElement","htl","_"], _arrayView);
  main.variable(observer()).define(["md","numbers"], _60);
  main.variable(observer()).define(["htl","Inputs","viewof numbers","Event","numbers"], _61);
  main.variable(observer("viewof numbers")).define("viewof numbers", ["view","arrayView","Inputs"], _numbers);
  main.variable(observer("numbers")).define("numbers", ["Generators", "viewof numbers"], (G, _) => G.input(_));
  main.variable(observer("viewof arrayViewTests")).define("viewof arrayViewTests", ["testing"], _arrayViewTests);
  main.variable(observer("arrayViewTests")).define("arrayViewTests", ["Generators", "viewof arrayViewTests"], (G, _) => G.input(_));
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","view","Event"], _64);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","Event"], _65);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _66);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _67);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _68);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _69);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _70);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _71);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _72);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _73);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _74);
  main.variable(observer()).define(["arrayViewTests","arrayView","Inputs","expect"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("RUN_TESTS")).define("RUN_TESTS", _RUN_TESTS);
  main.variable(observer("testing")).define("testing", ["RUN_TESTS","invalidation"], _testing);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer("expect")).define("expect", ["testing"], _expect);
  main.variable(observer()).define(["suite","view","variable","expect"], _81);
  main.variable(observer()).define(["suite","variable","view","expect"], _82);
  main.variable(observer()).define(["suite","variable","view","Event"], _83);
  main.variable(observer()).define(["suite","variable","view","expect"], _84);
  main.variable(observer()).define(["suite","variable","view","Event"], _85);
  main.variable(observer()).define(["suite","variable","view","Event"], _86);
  main.variable(observer()).define(["suite","view","html","expect"], _87);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _88);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _89);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _90);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _91);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _92);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _93);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _94);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _95);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _96);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _97);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _98);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _99);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _100);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _101);
  main.variable(observer()).define(["suite","view","Inputs","expect"], _102);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _105);
  return main;
}
