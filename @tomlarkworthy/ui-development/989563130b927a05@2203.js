// https://observablehq.com/@tomlarkworthy/ui-development@2203
import define1 from "./653c46ed55693b1f@669.js";
import define2 from "./4a1fa3c167b752e5@324.js";
import define3 from "./64641700df65baed@91.js";
import define4 from "./f92778131fd76559@1176.js";
import define5 from "./bb2055d580bbbab2@106.js";
import define6 from "./58f3eb7334551ae6@215.js";

async function _1(md,FileAttachment){return(
md`# Scaling User Interface Development

Backend development is [_rapid_](https://observablehq.com/@tomlarkworthy/saas-tutorial), and yet... custom user interface development is *still* a huge timesink. UI development is a project bottleneck.

<img width=400 src=${await FileAttachment("image.png").url()} />

This living document is a growing list of techniques I have learnt trying to overcome the UI development bottleneck. When I create complex applications, I need contextually sensitive user interfaces. However, building these custom UIs felt like starting from scratch everytime and the effort required was too high!

So I embarked on a journey, distilling the learnings taken from the community, trying to figure out the best way to build UIs in a scalable way on the ObservableHQ platform. And here is what I have learnt so far.

`
)}

function _2(toc){return(
toc()
)}

function _3(md){return(
md`## Views

Views are main UI concept on Observable. Views *usually* wrap a value with an interactive DOM representation of that value. There is lots of existing documentation on the mechanics of them e.g. [introduction to views](https://observablehq.com/@observablehq/introduction-to-views). This document is about how we use and combine them for a scalable development workflow. 

Because Observablehq has formalized the view interface, we can write a helper that takes multiple views and combines them together to create new views. This is one way we can scale UI development -- hierarchical composition of views. We discuss using the _view-literal_ which embeds multiple sub-views within plain HTML to construct composite views. It is a powerful technique that allows divide and conquer UI development problem solving. To show the technique in a practical settings, we have a annoteted example of porting a fully featured React calculator by Michael Jackson (Redux, UNPKG) _'one step at a time'_.

Views do not have to be visual though! Views are able to listen, manipulate and update their inner value, as such, views are logically **a pointer to mutable data**. We can use this framing to build non-visual Data APIs out of views. Multiple views can be connected into a data processing graph using _bind_, and we can exploit this to factor out common business logic into pluggable Data APIs. Data APIs help us delivery cross cutting features to views "from the outside" and avoid repetition inside our UI implementations, further scaling UI development. 








`
)}

function _output()
{
  // we will make this construction 🎵sing🎵
}


function _5(md){return(
md`### Off the shelf views

You can save time by reusing what the community has already built. Don't reinvent the wheel! There are some great input collections already authored, though note, for inputs to be truly flexible they need to be [back-writable](https://observablehq.com/@tomlarkworthy/ui-guidelines#backwritable). Thiss unfortunately excludes [@jashkenas/inputs](/@jashkenas/inputs) and [@bartok32/diy-inputs](/@bartok32/diy-inputs) UI packs.

- [Observable Inputs](https://observablehq.com/@observablehq/inputs) is the goto for a large range of use cases
- [Data Editor](https://observablehq.com/@tomlarkworthy/dataeditor) is also very hackable for data entry



`
)}

function _6(md){return(
md`However, even the best UI components on Observable are, by default, not contextually sensitive. To build compelling user experiences you need to simplify and minimize unnecessary information... In other words, you need the minimal user interface that makes sense for where the user currently is. At a minimum, you at least need to hide controls when they are not relevant, but also you want to help the user prioritize through styling, and it should be driven by what the user is currently doing.

This is not possible with default **off-the-shelf components**. However, we **can** reuse the components as **building blocks** in contextually sensitive UIs. So its very important to memorize the off-the-shelf components as they will save a lot of time and help you scale your development budget further. 
`
)}

function _7(md){return(
md`#### Customizing with *juice*

Juice is a higher order function that helps existing UI components go a little further. A common issue is that Inputs.select does not have dynamic options, with juice you can move configuration parameters like *options* into the value, enabling you to drive the select options from other components without dataflow and therefore within a single cell.
`
)}

function _dynamicSelect(juice,Inputs){return(
juice(Inputs.select, {
  options: "[0]", // "range" is first arg (index 0), the min is the 1st arg of the range array
  result: "[1].value" // "result" can be set in the options.value, options being the 2nd arg (index 0)
})
)}

function _exampleSelect(dynamicSelect){return(
dynamicSelect([], { label: "play a card" })
)}

function _11(Inputs,$0,Event){return(
Inputs.button("deal", {
  reduce: () => {
    const rndCard = () => {
      const card = Math.floor(Math.random() * 52);
      return (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"][
          card % 14
        ] + ["♠", "♥", "♦", "♣"][Math.floor(card / 14)]
      );
    };
    $0.options.value = [rndCard(), rndCard()];
    $0.options.dispatchEvent(new Event("input"));
  }
})
)}

function _12(md){return(
md`### Nesting views with the [view literal](https://observablehq.com/@tomlarkworthy/view)

We should strive to build custom things out of high quality reusable base pieces. This scales because we get to amortize the development cost of the base pieces, and so, we can afford to spend more time polishing them because they will be used a lot. As a result, overall quality increases. This is the heirarchical approach. We can create custom views by composing nested child views. Furthermore, this is recursive, a custom view is itself a view, and there can participate as a child view in an another composed view. 

But what properties should a composite view have?

1. You should be able to read/write the values of the child views via an index.
3. Emitted events by the child views update the containing view too. (propagation)
4. The containing view itself is read/write too, and its value is the composition of its children.

The view literal uses the _'Object'_ as the abstraction for containing child views. Each child view has a key to index its logical position in the whole. This defines the data access model.

But the other important thing is defining the layout. How should child components be arranged in the DOM? For this we reuse HTML. The position of child views is specified within a DOM using template tagging. The view literal is a wrapper around the hypertext-literal.

So, using the view literal, you can make custom views by nesting simpler views using the view literal. It supports layout with HTML, and supports binding to nested subviews interpolating _[key, view]_ arguments.
`
)}

function _combinedView(view,Inputs){return(
view`<div>
  <!-- Normal HTML provides us affordance to decorate CSS and labeling and arrangments -->
  <h4>Simple Nested View Example</h4>
  <style>
    /* We can add CSS */
    .horz form { display: inline-block; width: 30px; }
    .horz { margin-left: 30%; }
  </style>
  <!-- Child 'x' is an off-the-shelf range view-->
  ${['x', Inputs.range([-10, 10], { label: "x" })]}
  ${['y', Inputs.range([-10, 10], { label: "y" })]}
  <span class="horz">
    <!-- Child 'a' is an off-the-shelf button view-->
    ${['a', Inputs.button("a")]}  
    ${['b', Inputs.button("b")]}
  <span>
  </div>
</div>`
)}

function _14(md){return(
md`The differene data binds tell the view how to assemble its composite value. Note this is a reactive two way binding!`
)}

function _15(combinedView){return(
combinedView
)}

function _16(md){return(
md`If you need to access the subviews (e.g. to bind to, or to dispatch events), the view itself is also a composite component`
)}

function _17($0){return(
$0
)}

function _18(md){return(
md`So you can demultiplex the composite at any time if needed`
)}

function _19(Inputs,$0){return(
Inputs.bind(
  Inputs.range([-10, 10], {
    label: "This is bound to just part of the UI above"
  }),
  $0.x
)
)}

function _20(md){return(
md`Note you can nest this view in another view-literal and build up components hierarchically. If I am doing it this way I usually create views builder functions so its reusable.`
)}

function _21(md){return(
md`#### Wrapping existing views with a singleton

Sometimes you want to just add some custom HTML to an existing view, because it nearly does what you want - but not quite. For example, with \`Inputs.range\` I really like the hidden arrow buttons and keyboard controls, but the slider part can add too much horizontal when I embed it in a table. I want the range but without a slider!
`
)}

function _22(Inputs){return(
Inputs.range()
)}

function _23(md){return(
md`In this case we want to put some custom HTML around a single view but otherwise leave the logic in place. We don't want to create a new view by nesting, so instead of binding a subview to a named key, we use a special _spread_ key to tell the enclosing view to pull the child's value up.`
)}

function _24(md,naturalNumExample){return(
md`##### Natural Number Singleton Example

For our example, lets modify the default _range_ to remove the slider with some CSS, and fix its step to be in increments of 1. If course, this new view works like a normal view so you can bind to it. It is currently: **${naturalNumExample}**`
)}

function _naturalNumber(view,Inputs){return(
options =>
  view`<div class="nnum"><style>
    .nnum input[type=range] {
      display: none;
    }
    </style>${[
      '...', // Note the '...' moves the binding up to not being a child view
      Inputs.range([0, 999999999], { value: 0, ...options, step: 1 })
    ]}`
)}

function _naturalNumExample(naturalNumber){return(
naturalNumber()
)}

function _27(naturalNumExample){return(
naturalNumExample
)}

function _28(md){return(
md`#### Adding collections of child views

For some controls the number of children is not fixed (e.g. a list or table). The view-literal supports passing an array of views as its 2nd arg e.g. _["key", [...]]_ for constructing collections
`
)}

function _29(md){return(
md`##### Simple Row Component

Lets start by creating a simple row component that is wrapped in a \`<li>\`. As we only have one control in this simple example it doesn't make sense binding to a subview key and so instead we create a singleton using the spread key (see previous section)
`
)}

function _row(view,Inputs){return(
value => view`<li>${["...", Inputs.text({ value })]}</li>`
)}

function _exampleRow(row){return(
row()
)}

function _32(exampleRow){return(
exampleRow
)}

function _33(md){return(
md`##### Static list of children views

You can create an array of row components you can assign the whole array a property name and this is bidirectionally attached to the parent
`
)}

function _staticListExample(view,row){return(
view`<ul>${["children", [row(), row(), row()]]}`
)}

function _35(md){return(
md`Note below how text typed above is reflected in the parent element and we can back write random values.`
)}

function _36(staticListExample){return(
staticListExample
)}

function _37(Inputs,$0,Event){return(
Inputs.button("backwrite contents of rows", {
  reduce: () => {
    $0.children.forEach(
      row => (row.value = Math.random())
    );
    $0.dispatchEvent(
      new Event('input', { bubbles: true })
    );
  }
})
)}

function _dynamic_lists(md){return(
md`##### Dynamic list of children views

The real power of collections is being able to dynamically add and remove data elements. For this to work the parent need to know how to construct a presentation wrapper if a new data element is added. We tell this to the parent by supplying a third argument to the collection binding in the view-literal, e.g. _[key, collection, builder]_
`
)}

function _dynamicListExample(view,row){return(
view`<ul>${[
  "children",
  [row(Math.random()), row(Math.random()), row(Math.random())],
  d => row(d)
]}`
)}

function _40(md){return(
md`Now the parent view will support setting the whole array, constructing new children DOM elements as necessary, using the third arg as the builder

Note: The syntax is not as flexible as it should be at the moment. You can either write 
~~~js
    viewof parent.value = {children: ...};
~~~
to destructure the whole parent value including the children in parent view's value or  
~~~js
    parent.children = ...;
~~~
to assign the collection array to data (also adds a dataflow dependency)
`
)}

function _41(Inputs,$0,Event){return(
Inputs.button("backwrite number and contents of rows", {
  reduce: () => {
    $0.value = {
      children: Array.from(
        { length: Math.floor(Math.random() * 10) },
        Math.random
      )
    };
    $0.dispatchEvent(
      new Event('input', { bubbles: true })
    );
  }
})
)}

function _42(md){return(
md`##### Static and dynamic object of children views

You can also set groups of children views statically and dynamically using an [objects](https://observablehq.com/@tomlarkworthy/view#objects).
`
)}

function _43(md){return(
md`#### Hidden nested views

So far our HTML nesting has matched how we want our final view's data to be structured. However, sometimes these things do not match at all. In these cases you want to place the presentation nodes in a totally different tree to the data tree. By prefixing a key with "_" (private), you tell the view-literal the element is hidden and should not placed in the DOM tree but you still get the data binding. This means you are free to place the note using vanilla htl syntax (which does not do a binding)
`
)}

function _hiddenExample(Inputs,view)
{
  const c1 = Inputs.text();
  const c2 = Inputs.range();
  const c3 = Inputs.radio(["yes", "no"]);

  return view`<div>
    <section>${c1 /*Vanilla htl binding, does not link the subview*/} </section>
    <section>${c2}${c3}</section>
    <!-- end -->${[
      '_...', // Binding children via an object collection, but not changing their DOM location
      {
        a: c1,
        b: c2,
        c: c3
      }
    ]}</div>`;
}


function _45(hiddenExample){return(
hiddenExample
)}

function _46(md){return(
md`If you look in the HTML you can see no DOM was added after \`<!-- end -->\` yet the example view has children bound to the custom keys we added via the hidden object collection of subviews.`
)}

function _47($0){return(
$0.outerHTML
)}

function _48(md){return(
md`#### Summary of view nesting

The _view-literal_ provides us with the ability to recombine other views in a number of ways, using a terse syntax. It is one of the most scalable ways to build UI development, as it promotes reuse of views, whether developed by yourself or drawn from the 3rd party ecosystem.

To make the most of this affordance we should build and share high quality small orthogonal base components. There are some rules though: reusable views need to be back-writable and events must bubble up the DOM, for more information see the section below call [Creating Reusable Views](https://observablehq.com/@tomlarkworthy/ui-development#creating-reusable-views).

`
)}

async function _controlling_views(md,htl,FileAttachment,dot){return(
md`---
### Controlling Views

Another scalability feature of views is that you can automate them from adjacent cells. This means you can can add features to views with code hosted *outside* of the view implementation. This is a powerful technique for reusability, as generic features can be added to *all* views in existence, even those not authored by the feature developer.

View have several nice properties for orchistration.

1. reference a value
2. provide a visual read/write interface to it
3. provide a programmatic read/write interface to it 

Features (think making a network call) could be implemented both inside and outside of a view implementation. If you have a feature that could be applied to *all* views, like persistence, or animation, consider implementing it externally.

Views are very flexible on how you can read/write from them, supporting event driven and polling paradigms. Here are some of the ways.

${htl.html`<img src=${await FileAttachment(
  "Dataflow Vs. Views.png"
).url()}></img>`}


#### Listen to changes

~~~js
    // Adds a dependancy on the dataflow graph which will
    // auto-reevaluate the containing cell if myData changes
    myData 
~~~

#### Read the value
~~~js
    // Read the value imperatively
    viewof myData.value 
~~~

#### Listen to an input event from the view
~~~js
    // Get notified of changes but outside of dataflow
    viewof myData.addEventListener('input', (evt) => ...)
~~~

#### Write the value

~~~js
    // Writes but does not trigger dataflow
    viewof myData.value = newValue
~~~

#### Notify Dataflow engine of change

~~~js
    // Writes but does not trigger dataflow
    viewof myData.dispatchEvent(new Event('input', { bubbles: true }))
~~~

As you can see you have many different ways of reading and writing to the data in a view. You can choose to participate or not in Dataflow when doing so. It is the variety of semantics that give views special powers in Observable. Views are strictly more powerful than cells connected with dataflow, for example, they can be connected in cycles. (of course, no free lunch, they are harder to work with and debug than dataflow cells)

However, there is also some other important functional constructs that are available when reading from one view and writing to another view.

#### 2-way binding for synchronization

Two views can be [synchronized](https://observablehq.com/@mbostock/synchronized-views) with a 2-way binding. 

~~~js
    Inputs.bind(target, source, [optional]invalidation)
~~~

Its not totally symmetrical because input events are not raised on target when the source changes. The intent is that their is some global authority called source, which you must base all dataflow off of, like so:

${dot`digraph G { 
  s[label="source"];   
  t1[label="target1"];
  t2[label="target2"];
  t3[label="target3"];
  s -> t1 
  s -> t2 
  s -> t3 
}`}

So if a single target changes, source is notified and it raises its own event and radiates the changes to all targets. If source is directly manipulated all targets update too. Thus everything stays syncronized.

You might want to do this if each _target_ offers a different way of presenting or manipulating some common underlying data. I often think of keyboard vs. mouse controls or visual vs. textual diagram representation as situations where I might use a 2-way bind.

If you have two (or more) "peer" visualizations that need syncronizing, you may need to create a synthetic ancestor to be the common data holder. [Inputs.input](https://github.com/observablehq/inputs#inputsinputvalue) is a good choice as it non-visual. 

#### 1-way binding for chaining

I found when composing views a drawback of the 1.5-way binding is it cannot do *partial* binding. The source has to be the complete truth and the targets are isomorphic to that truth. In reality, when building views up heirarchically, views become about one segment of a thing, and its useful to propagate mutated changes between them.

So I added another type of bind intended for application wiring

~~~
    bindOneWay(target, source, {invalidation, transform})
~~~

This has a clear direction of data flow and the ability to transform allows dissimilar views to be combined with a type converter (e.g. toggling visibility, a boolean, from a radio button)

${dot`digraph G { 
  v0;   
  v1;
  v2;
  v0 -> v1 [label="transform"]; 
  v1 -> v2 [label="transform"]; 
}`}

`
)}

function _50(md){return(
md`#### One way bind example

One way binding really shines when creating composite views, as you can orchestrate all the various sub-views quite succinctly in a single call. 

Lets create the classic questionnaire UI that hides a free text box unless you tick yes.
 
~~~
    *if yes, please explain* 
~~~

using off the shelf views in the Observablehq.Inputs package (_radio_, _text_).
`
)}

function _showableText(md){return(
md`##### Higher Order View: _showable_

We need to be able to programatically hide the text input when the user has selected no. The feature of hiding something is not really specific to a type of input, so for maximum genericness we create a _higher order view_ function that takes an arbitrary view as input and returns the same view with an additional field for toggling the visibility.

The visibility is controlled with a boolean variable called _show_. Variables are views, with a DOM presence of a comment, so it has no visual appearance, but still has an entry in the composite value. The showable also have a visual child which is what it wraps with a visibility flag.
`
)}

function _createShowable(variable,view){return(
function createShowable(child, { show = true } = {}) {
  const showVariable = variable(show, { name: "show" });
  const showable = view`<div>${['show', showVariable]}${['child', child]}`;

  // The showable logic is to toggle the visibility of the enclosing div based
  // on the sho variable state
  const updateDisplay = () => {
    if (showVariable.value) {
      showable.style.display = "inline";
    } else {
      showable.style.display = "none";
    }
  };
  // Variables have additional assign event so presentation can be
  // updated as soon as variables change but before dataflow
  // because this is a pure presentation state it makes sense not to trigger
  // dataflow so we do not use 'input' event
  showVariable.addEventListener('assign', updateDisplay);

  updateDisplay();
  return showable;
}
)}

function _exampleShowable(createShowable,Inputs){return(
createShowable(Inputs.text())
)}

function _54(Inputs,exampleShowable){return(
Inputs.button("toggle show", {
  reduce: () => {
    // note changing this updates immediately and without dataflow because of assign event
    exampleShowable.show = !exampleShowable.show;
  }
})
)}

function _55(md){return(
md`Now we can build a custom view that has a radio to reveal the text box, and we will wire the textbox to a result variable which will be the only output of the entire view`
)}

function _56(yesAnd){return(
yesAnd
)}

function _yesAnd(Inputs,createShowable,variable,bindOneWay,view)
{
  const prompt = Inputs.radio(["no", "yes"], { label: "answer?", value: "no" });
  const answer = createShowable(
    Inputs.text({ placeholder: "well write your answer here" })
  );
  const result = variable(undefined);

  bindOneWay(answer.show, prompt, {
    transform: ans => ans === 'yes' // Convert radio text to boolean
  });

  // The result needs to update if the toggle or the text changes
  bindOneWay(result, answer.child, {
    transform: text => (answer.show.value ? text : "no answer")
  });
  bindOneWay(result, answer.show, {
    transform: show => (show ? answer.child.value : "no answer")
  });

  return view`<div>
    ${prompt}
    ${answer}
    <!-- this view is a singleton so its value is just the result -->
    ${["...", result]} 
  `;
}


function _58(md){return(
md`### Views-as-services

Views do not need to be UI. They can also be used to supply services.

Note that
- Views can be synced with other views very easily using _bind_
- Views do not need to be DOM nodes, only an eventEmitter
- Views are readable and writable holders of data

I sometimes think that views are pointers-like, they hold a named reference to a fixed read/write data address. They have a uniform API for read/write, listen/notify and are dynamically typed. 

Thus, they can be quite general service abstractors, supporting bidireciton dataflow, event driven interfaces or polling based interfaces.

You can use views to adapt other APIs for use within Observable. Furthermore, because there is a generic method for binding views together, you can plugin data driven features without modifying the data owner.
`
)}

function _59(md){return(
md`#### Example: Web Storage API as a View 

You can often take an existing API, such as the Web Storage API, and wrap it in a view. This can adapt that service to work idiomatically with Observable. 

If pointers/addresses to data, it makes sense that a storage key in the Web API should map to a unique view.

This leads us to be able to create an Observable view for a local storage location, if a key is provided.

`
)}

function _60(md){return(
md`##### createStorageView`
)}

function _createStorageView(htl,localStorage){return(
key => {
  const ui = htl.html`<div>${key}</span>
  </div>`;
  return Object.defineProperty(ui, 'value', {
    get: () => localStorage.getItem(key),
    set: value => {
      localStorage.setItem(key, value);
    },
    enumerable: true
  });
}
)}

function _62(md){return(
md`When we create a storage view we say what key to use`
)}

function _exampleStorageView(createStorageView){return(
createStorageView("exampleStorageKey")
)}

function _64(exampleStorageView){return(
exampleStorageView
)}

function _65(md){return(
md`And we can manually write into it in a generic way and the value updates. More interestingly, if we refresh the page the last value written is remembered.`
)}

function _66(Inputs,$0,Event){return(
Inputs.button("write random value", {
  reduce: () => {
    $0.value = Math.random();
    $0.dispatchEvent(
      new Event('input', { bubbles: true })
    );
  }
})
)}

function _67(md){return(
md`##### Binding views to services

The power of services-as-views is that you can very neatly add these services to existing views through bind composition.

So if we want a range slider's value to be persisted through refreshes, we bind it to our storage view.

`
)}

function _persistedRange(Inputs,createStorageView){return(
Inputs.bind(
  Inputs.range(),
  createStorageView("rangeStoragekey")
)
)}

function _69(persistedRange){return(
persistedRange
)}

async function _70(md,FileAttachment){return(
md`Note the above value survives page refreshes!

#### Summary of views-as-services

So note we have taken an existing view, *range*, and added persistence, without modifying the original (which was developed by a different person). 

The views-as-a-service paradigm is another way to **scale** UI development. We can avoid trying to create god UI components that have every feature. Instead, we can build orthogonal features that can be mixed and matched.

<img width=300 src=${await FileAttachment("image@1.png").url()}></img>
`
)}

function _71(md){return(
md`### Creating Reusable Views

Views are only composable if they are built in a certain way. There is a notebook dedicated to the rules required [(@tomlarkworthy/ui-guidelines)](https://observablehq.com/@tomlarkworthy/ui-guidelines). I draw attention to two of the commonly forgotten features here though.

#### Back-writability

*Input.bind* only works if the views support *back writability*. That is, that writing the value back into the component updates the UI. The following code should visually update the view, but not trigger Dataflow.

~~~js
viewof myView.value = newValue;
~~~

The following code should trigger Dataflow with a freshly written value
~~~js
viewof myView.dispatchEvent(new Event('input', {bubbles: true}));
~~~

<mark>_*Back writability enables external orchistration, binding and composing into views-as-services.*_</mark>

#### _input_ events should bubble

When dispatching _input_ events, you should set \`{bubbles: true}\`. This is because native \`<input>\` do this, and it allows the even to propogate up the DOM hierarchy. This feature is exploited by the view literal to detect changes in subviews (which are DOM children). 

<mark>Event bubbling is essential for view reuse through nesting.</mark>


`
)}

function _72(md){return(
md`### State based views

In addition to composing views *heirarchically* but there is another important class of UI which changes based on state. For example, you might want a login form to be foremost when the user is not logged in, otherwise let them access the application. Or you might only want to show the contents of the menu tab that is currently 'active'.

One common approach in HTML is to switch content with \`display: none\`, but this requires knowing all your content permutations upfront, which is often not possible. We can do that style of state based UI using techniques described with *[showable](https://observablehq.com/@tomlarkworthy/ui-development#showableText)*.

Flipping \`display: none\` does not scale to complex UIs though, for these we need a way of lazily updating the DOM based on some state.

#### mutable prevents composition

One common pattern in Observable is extracting the state into a \`mutable\` variable, but this has several drawbacks.

- Mutating the mutable causes a Dataflow cascade to rebuild the DOM, and in turn, any dependents of the viewof are also invalidated, so it can be quite computationally intensive and impossible to contain afterwards. 

- If the mutable is manipulated via other cells, they need to be imported too by dependent notebooks otherwise the logic does not work. I made this mistake with [oauth](/@tomlarkworthy/oauth). If you look at the [oauth-examples](/@tomlarkworthy/oauth-examples) each has to import two things for the state machine to work. Because dataflow is acyclic it is not possible for a mutable to depend on its downstream logic... there is no way of simplifying this.

All-in-all, mutables end up constraining long term. 🤮

#### [viewroutines](https://observablehq.com/@tomlarkworthy/viewroutine) (coroutines)

_Viewroutines_ are a solution for lazily updating a DOM node without involving dataflow. They are a _view_ that holds a reference to another _view_ called _current_. Their presentation is a \`span\` but whose value is the _current value_ and the \`span\` only child is current presentation. So basically they just delegate all state to their child view. The novel thing is how _current_ is updated. 

Unlike a normal view, whose internals are mutated externally, a viewroutine is instantiated with an async generator. It yields either 'events' or 'view' which are dispatch or grafted on the DOM. The amazing thing about generators is they can be composed and hold state.


`
)}

function _74(md){return(
md`Lets start simple with an n-sided dice. The generator returns random presentations, but its not until the final yield a DOM object is returned with a value.`
)}

function _rollDice(md,Promises,Event){return(
(sides, andThen) =>
  async function*() {
    const start = Date.now();
    let val = undefined;
    while (Date.now() < start + 1000) {
      val = Math.floor(Math.random() * sides) + 1;
      yield md`${val}`; // Not a view so its value is "undefined"
      await Promises.delay(16); // 16ms
    }
    // final value should be the dice AND the value
    const final = md`<mark>${val}</mark>`;
    final.value = val;
    yield final;
    yield new Event('input', { bubbles: true }); // Notify the value has changed
    await andThen;
  }
)}

function _reroll(Inputs){return(
Inputs.button("roll again")
)}

function _diceVal(reroll,viewroutine,rollDice,invalidation){return(
reroll, viewroutine(rollDice(6, invalidation))
)}

function _78(diceVal){return(
diceVal
)}

function _79(md){return(
md`#### Composing viewroutines

Whats nice about generators is that they compose with _\yield\*_, so we can take our simple dice primitive and turn it into a loop. There is a helper shipped with _viewroutine_ called _ask_ which is a generator that wraps a view, and waits until the view emits a value before returning. Its a useful primitive for blocking from user input. We will use *ask* and *dice* generators, and off-the-shelf input *radio*, to create a view of a general purpose dice roller.
`
)}

function _nDice(viewroutine,ask,Inputs,rollDice,Promises){return(
viewroutine(async function*() {
  let sides = 6;
  while (true) {
    sides = Number.parseInt(
      yield* ask(
        Inputs.radio(["2", "4", "6", "8", "10", "20"], {
          label: "Roll a dice with how many sides?"
        })
      )
    );
    yield* rollDice(sides)();
    await Promises.delay(1000);
  }
})
)}

function _81(nDice){return(
nDice
)}

function _82(md){return(
md`As you can see a viewroutine composes and can be mixed with pre-existing views quite easily. It provides us with an orthogonal tool to the view-literal by composing reusable views temporally. Read more about it in its own [notebook](https://observablehq.com/@tomlarkworthy/viewroutine).`
)}

function _83(md,tweet){return(
md`## Porting Micheal Jackson's React Calculator

In this section we make a non-trivial application in testable small peices that are joined together later. This demonstrates a scalable development workflow. We predominantly use the heirarchical approach.

Micheal Jackson (creator of Redux, Unpkg) has a fairly stellar implementation of a [calculator using React on Codepen](https://codepen.io/mjijackson/pen/xOzyGX). So we can reimplement that and see how it differs to React. 

${tweet("759039237412958209")}

Hopefully you will see that in many ways, Observeble has a better workflow. Lets go!
`
)}

function _84(md){return(
md`#### Calculator Key

In the React example a custom Element is used with a custom event type _press_. 

~~~html
   <CalculatorKey className="key-0" onPress={() => this.inputDigit(0)}>0</CalculatorKey>
~~~

This allows the container to bind unique handler for each key that calls a common parameterized handler: _inputDigit(...)_.

In Observable idioms we don't really want to be thinking of event handlers, rather, we prefer dataflow. We want on a key press that a key's value is emitted as a value of a cell.

The tricky bit is how to aggregate multiple keys and write to a common handler. We will get to that much later
`
)}

function _calculatorKey(htl,Event){return(
({ className, label } = {}) => {
  const view = htl.html`<button class="calculator-key ${className}" onClick=${function press() {
    view.value = className;
    view.dispatchEvent(new Event('input', { bubbles: true }));
  }}>${label}</button>`;
  return view;
}
)}

function _86(md){return(
md`#### Test of Calculator Key`
)}

function _87(md){return(
md`So now we instanciate it and check the value is returned as expected in isolation`
)}

function _multiplyKey(calculatorKey){return(
calculatorKey({
  className: "key-multiply",
  value: "MUL",
  label: "×"
})
)}

function _89(multiplyKey){return(
multiplyKey
)}

function _90(md){return(
md`#### AutoScalingText View

The calculator display is quite interesting in that the font gets smaller *when needed* so the text fits. Michael Jackson
 isolated the text resizing behavior into its own reusable component (AutoScalingText) for use in the Calculator Display. Lets follow those same design decisions.

Here is the original source code
~~~js
class AutoScalingText extends React.Component {
  state = {
    scale: 1
  };
  
  componentDidUpdate() {
    const { scale } = this.state
    
    const node = this.node
    const parentNode = node.parentNode
    
    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth
    
    if (scale === actualScale)
      return
    
    if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
    }
  }
  
  render() {
    const { scale } = this.state
    
    return (
      <div
        className="auto-scaling-text"
        style={{ transform: \`scale(\${scale},\${scale})\` }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}
~~~


Michael Jackson's scale is a state, we create a "variable" to hold this extra degree of freedom. This lets us test our scaling code by assigning to scale manually. A variable has a special event when it is assigned to, allowing you to update appearances without side effects for dataflow (that an input event would).

When our scale variable changes, we make sure to adjust the DOM's transform attribute.

We also want the scale to update when the child text node updates. We create a TextNodeView whose value is the text. And we bind text changes to scale changes, where we fit in the rescaling logic.
`
)}

function _autoScalingText(variable,view,bindOneWay){return(
({ child } = {}) => {
  const scale = variable(1, { name: "scale" });
  const node = view`<div class="auto-scaling-text">
    <!-- Variables are HTML comments and have no appearance, but we want it to be a part of the parent view
         so we still bind it -->
    ${['scale', scale]}
    ${['child', child]}
  </div>`;

  // If we change scale we want the div style.transform changed
  scale.addEventListener("assign", evt => {
    node.style.transform = `scale(${scale.value},${scale.value})`;
  });

  scale.value = 1;
  const updateScale = () => {
    const parentNode = node.parentNode;
    if (!parentNode) return 1;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    // In mjackson example there is a case that returns with no value to avoid a call to setState.
    // This is coz this code is executed in React's ComponentDidUpdate which is done after
    // placing the DOM node. This path is for concluding there is nothing to be done, otherwise,
    // it calls setState causing another DOM adjsut and place loop
    // Because in Observable we have to call dispatchEvent after setting the component, this code
    // executes after placement kinda naturally.

    if (actualScale < 1) {
      return actualScale;
    } else if (scale <= 1) {
      return 1;
    }
  };

  // When the child updates we want to change the scale, so we bind child -> scale with a transform
  bindOneWay(scale, child, {
    transform: updateScale
  });

  return node;
}
)}

function _92(md){return(
md`##### Test of AutoScalingText`
)}

function _93(md){return(
md`We need a very basic view of a text node, its so simple we can do it without special libraries.`
)}

function _textNodeView(){return(
(value = '') => {
  const node = document.createTextNode(value);
  return Object.defineProperty(node, 'value', {
    get: () => node.textContent,
    set: val => (node.textContent = val),
    enumerable: true
  });
}
)}

function _95(md){return(
md`Then we can instanciate an AutoScalingText wrapper around a textNodeView, demonstrating three levels of nesting
1. The view with a top level DIV of class "example", with bound view child "example"
2. The autoScalingText view with two children: 'scale' and 'child'
3. the textNodeView

The main power of the view-literal is that the heirarchy retain back-writability. So we can traverse the tree of views, and assign values, and the views will update.

`
)}

function _exampleAutoScalingTextContainer(view,autoScalingText,textNodeView){return(
view`<div class="example" style="max-width:300px">
  <style>
    .example .auto-scaling-text {
      position: absolute;
      transform-origin: top left;
    }
  </style>
  ${[
    'example',
    autoScalingText({
      child: textNodeView("press random number below")
    })
  ]}`
)}

function _97(md){return(
md`We can test the autoscaling behaviour by generating long numbers.`
)}

function _98(Inputs,$0,Event){return(
Inputs.button("generate a random long number", {
  reduce: () => {
    const digits = Math.floor(Math.random() * 100);
    const num = Array(digits)
      .fill(null)
      .reduce(str => str + Math.floor(Math.random() * 10), "");
    $0.example.child.value = num;
    $0.example.child.dispatchEvent(
      new Event('input'),
      { bubbles: true }
    );
  }
})
)}

function _99(md){return(
md`#### Calculator Display View

Micheal's calculator display wraps an AutoFormattingText field and 

  - applies additional locale specific formatting to give you easy-to-read numbers.
  - Truncates the digits to a sane level to sidestep some floating point weirdness.
  - Adds a trailing 0 for decimals.

So the input is a floating point value and the output is a formatted string written to a child AutoScalingText custom component (which we developed earlier).

Here is the React source:

~~~js
class CalculatorDisplay extends React.Component {
  render() {
    const { value, ...props } = this.props
    
    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })
    
    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\\.\\d*?(0*)$/)
    
    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
    
    return (
      <div {...props} className="calculator-display">
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>
    )
  }
}
~~~


Our general strategy is similar to the implementation to AutoFormattingText, we need a variable to hold the 'value' parameter, then we oneWayBind to the underlying AutoFormattingText field after making the required business logic modifications. 

Michael's CalculatorDisplay uses information hiding so the only accessible parameter is the DOM value of the custom component, which is a string type. We will follow this pattern and hide the AutoFormattingText input from the API too, though as we are not creating custom components we will not be insisting the value parameter to be a string (though it can be).
`
)}

function _calculatorDisplay(variable,textNodeView,view,autoScalingText,bindOneWay){return(
({ value } = {}) => {
  const valueVariable = variable(value, { name: "value" });

  const format = val => {
    // Coz in react the value is passed in as an attribute to the component its a string.
    // But we can be flexible and accept both
    const valStr = `${val}`;
    const language = navigator.language || 'en-US';
    let formattedValue = parseFloat(valStr).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    });

    // Add back missing .0 in e.g. 12.0
    const match = valStr.match(/\.\d*?(0*)$/);

    if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
    return formattedValue;
  };
  const text = textNodeView();

  const ui = view`<div class="calculator-display">
    ${['...', valueVariable]}
    ${autoScalingText({
      child: text
    })}
  </div>`;
  bindOneWay(text, valueVariable, {
    transform: format
  });

  return ui;
}
)}

function _101(md){return(
md`###### Test of Calculator Display`
)}

function _testDisplay(view,calculatorDisplay){return(
view`<div class="example">
  <!-- We need a little styling for the auto resizing to kick in -->
  <style>
    .example .auto-scaling-text {
      position: absolute;
      transform-origin: top left;
    }
    .example .calculator-display {
      max-width: 400px;
    }
  </style>
  ${['...', calculatorDisplay({ value: "100.0000" })]}
`
)}

function _103(testDisplay){return(
testDisplay
)}

function _104(md){return(
md`We create a button to set the display value and dispatch an event. We want to check the value is a number (well it ends up stored as a string, but this is consistent with the React example), but the display is formatted in the locale, and that it resizes based on the length of the number`
)}

function _105(Inputs,$0,Event){return(
Inputs.button("random value", {
  reduce: () => {
    const digits = Math.floor(Math.random() * 100);
    const num = Array(digits)
      .fill(null)
      .reduce(str => str + Math.floor(Math.random() * 10), "");
    $0.value = num;
    $0.dispatchEvent(new Event('input'), { bubbles: true });
  }
})
)}

function _106(md){return(
md`#### Calculator View

In the React version the parsing business logic is put inside the Calculator component, but this would result in a huge cell for us so we separate out the parsing and operands first into a business logic SDK (this is almost a copy and paste from the example).
`
)}

function _calculatorLogic(Event){return(
calculatorView => {
  // Internal state
  let value = null;
  let operator = null;
  let waitingForOperand = false;

  const calculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
  };

  // To reduce the amount of code we need to change for the port, we supply our own setState
  // and have our handlers use function syntax so "this" works, although it would not be the
  // style I would choose doing it fresh.
  function setState(state) {
    if (state.displayValue) {
      calculatorView.displayValue.value = state.displayValue;
      calculatorView.displayValue.dispatchEvent(
        new Event('input', { bubbles: true })
      );
    }
    if (state.value) value = state.value;
    if (state.operator) operator = state.operator;
    if (state.waitingForOperand !== undefined)
      waitingForOperand = state.waitingForOperand;
  }

  function clearAll() {
    setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    });
  }

  function clearDisplay() {
    setState({
      displayValue: '0'
    });
  }

  function clearLastChar() {
    const displayValue = `${calculatorView.value.displayValue}`;

    setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    });
  }

  function toggleSign() {
    const displayValue = `${calculatorView.value.displayValue}`;
    const newValue = parseFloat(displayValue) * -1;

    setState({
      displayValue: String(newValue)
    });
  }

  function inputPercent() {
    const displayValue = `${calculatorView.value.displayValue}`;
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(displayValue) / 100;

    setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    });
  }

  function inputDot() {
    const displayValue = `${calculatorView.value.displayValue}`;

    if (!/\./.test(displayValue)) {
      setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      });
    }
  }

  function inputDigit(digit) {
    const displayValue = `${calculatorView.value.displayValue}`;

    if (waitingForOperand) {
      setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit
      });
    }
  }

  function performOperation(nextOperator) {
    const inputValue = Number.parseFloat(calculatorView.value.displayValue);

    if (value == null) {
      setState({
        value: inputValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = calculatorOperations[operator](currentValue, inputValue);

      setState({
        value: newValue,
        displayValue: String(newValue)
      });
    }

    setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  }

  const handleKeyDown = event => {
    let { key } = event;

    if (key === 'Enter') key = '=';

    if (/\d/.test(key)) {
      inputDigit(parseInt(key, 10));
    } else if (key in calculatorOperations) {
      performOperation(key);
    } else if (key === '.') {
      inputDot();
    } else if (key === '%') {
      inputPercent();
    } else if (key === 'Backspace') {
      clearLastChar();
    } else if (key === 'Clear') {
      if (this.state.displayValue !== '0') {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  };

  return {
    setState,
    clearAll,
    clearDisplay,
    clearLastChar,
    toggleSign,
    inputPercent,
    inputDot,
    inputDigit,
    performOperation,
    handleKeyDown
  };
}
)}

function _108(md){return(
md`The ui component wraps the business logic. If designing from scratch I would embrace seperation of business logic from presentation by adding the calculator logic via a view-as-a-service. We might consider extracting the calculator logic into its own view as being superior becuase we could then plug calculator logic into very differently organized views and reuse it.

However, here I will stick closely to the React example so its easier to make line-to-line corespondances.

The interesting challange for us is aggregating some of the keys so they can share a handler. 
`
)}

function _calculator(variable,calculatorKey,bindOneWay,view,calculatorDisplay,calculatorLogic,invalidation){return(
({ className = '', displayValue = '0' } = {}) => {
  // We will bind all keys to lastKey, so we can have a single handler
  const lastKey = variable(undefined, { name: "lastKey" });
  const placeKey = (className, label) => {
    const key = calculatorKey({ className, label });
    // To have a single handler we will bind everthing to lastKey
    bindOneWay(lastKey, key, {
      transform: d => {
        return d;
      }
    });
    return key;
  };

  const ui = view`<div class="calculator ${className}">
        ${['displayValue', calculatorDisplay()]}
        <div class="calculator-keypad">
          ${['lastKey', lastKey]}
          <div class="input-keys">
            <div class="function-keys">
              ${placeKey("key-clear", "AC")}
              ${placeKey('key-sign', "±")}
              ${placeKey('key-percent', "%")}
            </div>
            <div class="digit-keys">
              ${placeKey('key-0', "0")}
              ${placeKey('key-dot', "●")}
              ${placeKey('key-1', "1")}
              ${placeKey('key-2', "2")}
              ${placeKey('key-3', "3")}
              ${placeKey('key-4', "4")}
              ${placeKey('key-5', "5")}
              ${placeKey('key-6', "6")}
              ${placeKey('key-7', "7")}
              ${placeKey('key-8', "8")}
              ${placeKey('key-9', "9")}
            </div>
          </div>
          <div class="operator-keys">
            ${placeKey('key-divide', "÷")}
            ${placeKey('key-multiply', "×")}
            ${placeKey('key-subtract', "-")}
            ${placeKey('key-add', "+")}
            ${placeKey('key-equals', "=")}
          </div>
        </div>
      </div>`;

  // Now add business logic
  const logic = calculatorLogic(ui);
  lastKey.addEventListener('input', () => {
    let match = undefined;
    if ((match = /^key-(\d)$/.exec(lastKey.value))) {
      logic.inputDigit(Number.parseInt(match[1]));
    }
    switch (lastKey.value) {
      case 'key-dot':
        return logic.inputDot();
      case 'key-clear':
        return logic.clearAll();
      case 'key-sign':
        return logic.toggleSign();
      case 'key-percent':
        return logic.inputPercent();
      case 'key-divide':
        return logic.performOperation('/');
      case 'key-multiply':
        return logic.performOperation('*');
      case 'key-subtract':
        return logic.performOperation('-');
      case 'key-add':
        return logic.performOperation('+');
      case 'key-equals':
        return logic.performOperation('=');
    }
  });

  // Add keyboard
  document.addEventListener('keydown', logic.handleKeyDown);
  invalidation.then(() =>
    document.removeEventListener('keydown', logic.handleKeyDown)
  );

  // initialize
  logic.setState({
    displayValue: displayValue
  });

  return ui;
}
)}

function _110(md){return(
md`##### Test of Calculator

Note its wired into keyboard too so backspace works
`
)}

function _testCalculator(calculator){return(
calculator({
  displayValue: '0'
})
)}

function _112(testCalculator){return(
testCalculator
)}

function _113(md){return(
md`#### The Completed Styled Calculator View

Finally we get to put it all together, we nest it in another view so we can add Michaels CSS inline too (of course this could be hosted in a different cell too). Note how the text resizes as the number gets large.
`
)}

function _styledCalculator(view,calculator){return(
value => {
  return view`<div id="wrapper"><div id="app"><style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
.styledCalculator button {
  display: block;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  user-select: none;
  cursor: pointer;
  outline: none;
  
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.styledCalculator button:active {
  box-shadow: inset 0px 0px 80px 0px rgba(0,0,0,0.25);
}

#wrapper {
  
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  width: 320px;
  height: 520px;
  position: relative;
  font: 100 14px 'Roboto';
}

.styledCalculator {
  width: 100%;
  height: 100%;
  background: black;
  
  display: flex;
  flex-direction: column;
}

#wrapper .styledCalculator {
  box-shadow: 0px 0px 20px 0px #aaa;
}

.styledCalculator .calculator-display {
  color: white;
  background: #1c191c;
  line-height: 130px;
  font-size: 6em;
  
  flex: 1;
}

.styledCalculator .auto-scaling-text {
  display: inline-block;
}

.styledCalculator .calculator-display .auto-scaling-text {
  padding: 0 30px;
  position: absolute;
  right: 0;
  transform-origin: right;
}

.styledCalculator .calculator-keypad {
  height: 400px;
  
  display: flex;
}

.styledCalculator .input-keys {
  width: 240px;
}

.styledCalculator .function-keys {
  display: flex;
}

.styledCalculator .digit-keys {
  background: #e0e0e7;
  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.styledCalculator .calculator-key {
  width: 80px;
  height: 80px;
  border-top: 1px solid #777;
  border-right: 1px solid #666;  
  text-align: center;
  line-height: 80px;
}
.styledCalculator .function-keys .calculator-key {
  font-size: 2em;
}
.styledCalculator .function-keys .key-multiply {
  line-height: 50px;
}
.styledCalculator .digit-keys .calculator-key {
  font-size: 2.25em;
}
.styledCalculator .digit-keys .key-0 {
  width: 160px;
  text-align: left;
  padding-left: 32px;
}
.styledCalculator .digit-keys .key-dot {
  padding-top: 1em;
  font-size: 0.75em;
}
.styledCalculator .operator-keys .calculator-key {
  color: white;
  border-right: 0;
  font-size: 3em;
}

.styledCalculator .function-keys {
  background: linear-gradient(to bottom, rgba(202,202,204,1) 0%, rgba(196,194,204,1) 100%);
}
.styledCalculator .operator-keys {
  background:  linear-gradient(to bottom, rgba(252,156,23,1) 0%, rgba(247,126,27,1) 100%);
}</style>${[
    '...',
    calculator({ className: "styledCalculator", displayValue: value })
  ]}`;
}
)}

function _exampleStyledCalculator(styledCalculator){return(
styledCalculator("1.337")
)}

function _116(exampleStyledCalculator){return(
exampleStyledCalculator
)}

function _117(exampleStyledCalculator){return(
exampleStyledCalculator
)}

function _118(md){return(
md`##### Backwriting into the Calculator`
)}

function _119(md){return(
md`Note the styled calculator is still backwritable, and therefore scriptable by adjacent cells. Becuase the logic is driven by view binding, the real business logic is able to compute with synthetically injected values!`
)}

function _120(Inputs,$0,Event){return(
Inputs.button("set display to random number", {
  reduce: () => {
    const digits = Math.floor(Math.random() * 20);
    const num = Array(digits)
      .fill(null)
      .reduce(str => str + Math.floor(Math.random() * 10), "");
    $0.singleton.displayValue.value = num;
    $0.singleton.displayValue.dispatchEvent(
      new Event('input'),
      { bubbles: true }
    );
  }
})
)}

function _121(md){return(
md`## Other techniques

Views are not the only stratergy for building UI.
`
)}

function _122(md){return(
md`### Pulling from the React Ecosystem

You can build a React application from scratch using [@j-f1/react](/@j-f1/react). Unfortunately its not word-for-word React syntax, so you can't trivially copy and paste from the web, and unfortunately, the React ecosystem uses idioms to distribute code, so you can't easily pull in the existing ecosystem.

Furthermore, React has its own dataflow paradigms, which cannot exploit Observable idioms, so sometimes it feels like you have two layers of stuff going on where you should just have one and its very confusing trying to figure out whether a cell is updating becuase of dataflow or React. So overall I feel React is not a great fit technically.

However, there are some wonderful react components already built, and sometimes they can save *a ton* of time. With a custom webpack config and some work, *you can import them*, see  [@tomlarkworthy/howto-import-react-component](/@tomlarkworthy/howto-import-react-component).

`
)}

function _123(md){return(
md`### Exporting UI components to the web

... TBD

Ideas welcome. I think with some investments we could hide views and the observable runtime behind a web component.

`
)}

function _128(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/6ec72184962d04f326bab431bf484211e5a5d9c187700871d886b1943c768d25c7b32a9137d78824871947afbde7517759b22129f1e6f579ea30fd37bcaa02d7.png", import.meta.url), mimeType: "image/png", toString}],
    ["Dataflow Vs. Views.png", {url: new URL("./files/b39d31ad383fa10c5763b3b1b84aee160c158b195cea2db64c6008f9f2d9b802da46b6de1795d7f8017fc64c1a326585ee23e760cbad50a200a05d61475916ee.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/9d28efebbcee6072d3b0107451061c7f40e2781298345c5405e1f230226868cd108fdb684f55f544e8b4eb4cc7c987aaca7d253106829a93ac904fa2cd4995e6.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof output")).define("viewof output", _output);
  main.variable(observer("output")).define("output", ["Generators", "viewof output"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1);
  main.import("juice", child1);
  main.variable(observer("dynamicSelect")).define("dynamicSelect", ["juice","Inputs"], _dynamicSelect);
  main.variable(observer("viewof exampleSelect")).define("viewof exampleSelect", ["dynamicSelect"], _exampleSelect);
  main.variable(observer("exampleSelect")).define("exampleSelect", ["Generators", "viewof exampleSelect"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof exampleSelect","Event"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof combinedView")).define("viewof combinedView", ["view","Inputs"], _combinedView);
  main.variable(observer("combinedView")).define("combinedView", ["Generators", "viewof combinedView"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["combinedView"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["viewof combinedView"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["Inputs","viewof combinedView"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["Inputs"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md","naturalNumExample"], _24);
  main.variable(observer("naturalNumber")).define("naturalNumber", ["view","Inputs"], _naturalNumber);
  main.variable(observer("viewof naturalNumExample")).define("viewof naturalNumExample", ["naturalNumber"], _naturalNumExample);
  main.variable(observer("naturalNumExample")).define("naturalNumExample", ["Generators", "viewof naturalNumExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["naturalNumExample"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("row")).define("row", ["view","Inputs"], _row);
  main.variable(observer("viewof exampleRow")).define("viewof exampleRow", ["row"], _exampleRow);
  main.variable(observer("exampleRow")).define("exampleRow", ["Generators", "viewof exampleRow"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleRow"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof staticListExample")).define("viewof staticListExample", ["view","row"], _staticListExample);
  main.variable(observer("staticListExample")).define("staticListExample", ["Generators", "viewof staticListExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["staticListExample"], _36);
  main.variable(observer()).define(["Inputs","viewof staticListExample","Event"], _37);
  main.variable(observer("dynamic_lists")).define("dynamic_lists", ["md"], _dynamic_lists);
  main.variable(observer("viewof dynamicListExample")).define("viewof dynamicListExample", ["view","row"], _dynamicListExample);
  main.variable(observer("dynamicListExample")).define("dynamicListExample", ["Generators", "viewof dynamicListExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["Inputs","viewof dynamicListExample","Event"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("viewof hiddenExample")).define("viewof hiddenExample", ["Inputs","view"], _hiddenExample);
  main.variable(observer("hiddenExample")).define("hiddenExample", ["Generators", "viewof hiddenExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["hiddenExample"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["viewof hiddenExample"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("controlling_views")).define("controlling_views", ["md","htl","FileAttachment","dot"], _controlling_views);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("showableText")).define("showableText", ["md"], _showableText);
  main.variable(observer("createShowable")).define("createShowable", ["variable","view"], _createShowable);
  main.variable(observer("viewof exampleShowable")).define("viewof exampleShowable", ["createShowable","Inputs"], _exampleShowable);
  main.variable(observer("exampleShowable")).define("exampleShowable", ["Generators", "viewof exampleShowable"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","exampleShowable"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["yesAnd"], _56);
  main.variable(observer("viewof yesAnd")).define("viewof yesAnd", ["Inputs","createShowable","variable","bindOneWay","view"], _yesAnd);
  main.variable(observer("yesAnd")).define("yesAnd", ["Generators", "viewof yesAnd"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("createStorageView")).define("createStorageView", ["htl","localStorage"], _createStorageView);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("viewof exampleStorageView")).define("viewof exampleStorageView", ["createStorageView"], _exampleStorageView);
  main.variable(observer("exampleStorageView")).define("exampleStorageView", ["Generators", "viewof exampleStorageView"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleStorageView"], _64);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer()).define(["Inputs","viewof exampleStorageView","Event"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("viewof persistedRange")).define("viewof persistedRange", ["Inputs","createStorageView"], _persistedRange);
  main.variable(observer("persistedRange")).define("persistedRange", ["Generators", "viewof persistedRange"], (G, _) => G.input(_));
  main.variable(observer()).define(["persistedRange"], _69);
  main.variable(observer()).define(["md","FileAttachment"], _70);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer()).define(["md"], _72);
  const child2 = runtime.module(define2);
  main.import("viewroutine", child2);
  main.import("ask", child2);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("rollDice")).define("rollDice", ["md","Promises","Event"], _rollDice);
  main.variable(observer("viewof reroll")).define("viewof reroll", ["Inputs"], _reroll);
  main.variable(observer("reroll")).define("reroll", ["Generators", "viewof reroll"], (G, _) => G.input(_));
  main.variable(observer("viewof diceVal")).define("viewof diceVal", ["reroll","viewroutine","rollDice","invalidation"], _diceVal);
  main.variable(observer("diceVal")).define("diceVal", ["Generators", "viewof diceVal"], (G, _) => G.input(_));
  main.variable(observer()).define(["diceVal"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("viewof nDice")).define("viewof nDice", ["viewroutine","ask","Inputs","rollDice","Promises"], _nDice);
  main.variable(observer("nDice")).define("nDice", ["Generators", "viewof nDice"], (G, _) => G.input(_));
  main.variable(observer()).define(["nDice"], _81);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer()).define(["md","tweet"], _83);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("calculatorKey")).define("calculatorKey", ["htl","Event"], _calculatorKey);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer()).define(["md"], _87);
  main.variable(observer("viewof multiplyKey")).define("viewof multiplyKey", ["calculatorKey"], _multiplyKey);
  main.variable(observer("multiplyKey")).define("multiplyKey", ["Generators", "viewof multiplyKey"], (G, _) => G.input(_));
  main.variable(observer()).define(["multiplyKey"], _89);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer("autoScalingText")).define("autoScalingText", ["variable","view","bindOneWay"], _autoScalingText);
  main.variable(observer()).define(["md"], _92);
  main.variable(observer()).define(["md"], _93);
  main.variable(observer("textNodeView")).define("textNodeView", _textNodeView);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer("viewof exampleAutoScalingTextContainer")).define("viewof exampleAutoScalingTextContainer", ["view","autoScalingText","textNodeView"], _exampleAutoScalingTextContainer);
  main.variable(observer("exampleAutoScalingTextContainer")).define("exampleAutoScalingTextContainer", ["Generators", "viewof exampleAutoScalingTextContainer"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _97);
  main.variable(observer()).define(["Inputs","viewof exampleAutoScalingTextContainer","Event"], _98);
  main.variable(observer()).define(["md"], _99);
  main.variable(observer("calculatorDisplay")).define("calculatorDisplay", ["variable","textNodeView","view","autoScalingText","bindOneWay"], _calculatorDisplay);
  main.variable(observer()).define(["md"], _101);
  main.variable(observer("viewof testDisplay")).define("viewof testDisplay", ["view","calculatorDisplay"], _testDisplay);
  main.variable(observer("testDisplay")).define("testDisplay", ["Generators", "viewof testDisplay"], (G, _) => G.input(_));
  main.variable(observer()).define(["testDisplay"], _103);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer()).define(["Inputs","viewof testDisplay","Event"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer("calculatorLogic")).define("calculatorLogic", ["Event"], _calculatorLogic);
  main.variable(observer()).define(["md"], _108);
  main.variable(observer("calculator")).define("calculator", ["variable","calculatorKey","bindOneWay","view","calculatorDisplay","calculatorLogic","invalidation"], _calculator);
  main.variable(observer()).define(["md"], _110);
  main.variable(observer("viewof testCalculator")).define("viewof testCalculator", ["calculator"], _testCalculator);
  main.variable(observer("testCalculator")).define("testCalculator", ["Generators", "viewof testCalculator"], (G, _) => G.input(_));
  main.variable(observer()).define(["testCalculator"], _112);
  main.variable(observer()).define(["md"], _113);
  main.variable(observer("styledCalculator")).define("styledCalculator", ["view","calculator"], _styledCalculator);
  main.variable(observer("viewof exampleStyledCalculator")).define("viewof exampleStyledCalculator", ["styledCalculator"], _exampleStyledCalculator);
  main.variable(observer("exampleStyledCalculator")).define("exampleStyledCalculator", ["Generators", "viewof exampleStyledCalculator"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleStyledCalculator"], _116);
  main.variable(observer()).define(["exampleStyledCalculator"], _117);
  main.variable(observer()).define(["md"], _118);
  main.variable(observer()).define(["md"], _119);
  main.variable(observer()).define(["Inputs","viewof exampleStyledCalculator","Event"], _120);
  main.variable(observer()).define(["md"], _121);
  main.variable(observer()).define(["md"], _122);
  main.variable(observer()).define(["md"], _123);
  const child3 = runtime.module(define3);
  main.import("toc", child3);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  main.import("variable", child4);
  main.import("bindOneWay", child4);
  main.import("cautious", child4);
  const child5 = runtime.module(define5);
  main.import("tweet", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _128);
  return main;
}
