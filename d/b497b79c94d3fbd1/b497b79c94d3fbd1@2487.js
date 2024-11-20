import define1 from "./17c8ce433e1df58e@3332.js";

function _1(md){return(
md`# Make a Game Part I - Ideation and Architecture


`
)}

function _markdown_skill(md,mermaid,htl,tex){return(
{
  prompt: "Write a markdown skill cell",
  time: 1699719020249,
  comment: "Complex markdown skill cell"
} &&
  md`
# Markdown Skill
This demonstrates advanced usage of a markdown cell

## Mermaid Diagram
${mermaid`
graph TB;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`}

## Live JavaScript Execution
${(function () {
  const span = htl.html`<span>`;
  let count = 0;
  span.textContent = count;
  setInterval(() => {
    count++;
    span.textContent = count;
  }, 1000);
  return span;
})()}

## KaTeX
The quadratic formula is ${tex`x = {-b \pm \sqrt{b^2-4ac} \over 2a}`}

${tex`
\begin{aligned}
  (a+b)^2 &= (a+b)(a+b) \\
  &= a^2 + 2ab + b^2
\end{aligned}
`}

## Details/Summary
<details>
  <summary>Expandable content</summary>
  ${md`
  - Item 1
  - Item 2
  - Item 3
  `}
</details>

## HTML Figure
<figure>
  <a href="https://www.reddit.com/r/robocoop/" target="_blank">
    <img src="https://avatars.githubusercontent.com/endpointservices" alt="Endpoint Services" width="100" height="100">
  </a>
  <figcaption>Figure: Endpoint Services. Click to visit the Roboco-op subreddit.</figcaption>
</figure>

## Blocks
Backticks need to be escaped, it is easier to use ~ instead
~~~js
  () => throw Error()
~~~

`
)}

function _game_architecture(md){return(
{
  prompt:
    "I want to build a really fast high quality game using html, but incrementally in the notebook, so we need to build each system independently. Do you have a good architecture suggestion. It should be a one pager, with neon graphics like geomtry wars, maybe exploiting the simplicity of SVG, but somehow with shaders?",
  time: 1699829325647,
  comment: "Game Architecture proposal"
} &&
  md`
# Game Architecture

Building a fast, high-quality game with HTML and SVG can be achieved using a component-based architecture where each system of the game is developed independently. Here's an architectural suggestion:

## Systems

- **Rendering**: This will handle drawing the game to the screen. We'll use SVG for its simplicity and because it's a part of the standard web platform, requiring no additional libraries. Shaders can be incorporated using SVG filters for neon graphics effects.

- **Physics**: This system will handle the movement and interactions of game objects. It will take into account things like velocity, acceleration, collision detection, and response.

- **Input**: This system will handle user input, translating keystrokes or mouse movements into game actions.

- **Sound**: This will handle game audio, providing feedback to the user based on game events.

- **Game Logic**: This will handle the rules of the game, determining how and when the game state changes based on user input and the state of other game objects.

- **State Management**: This system will handle the game state, keeping track of things like the player's score, game levels, and the current state of all game objects. It can also handle saving and loading game state.

## Workflow

1. Define the game's requirements and create a design document outlining the game's rules, visuals, and sound design.

2. Develop each system independently, ensuring they function as expected on their own.

3. Gradually integrate the systems, starting with the Rendering and Input systems to get a basic game loop up and running.

4. Add the Physics and Game Logic systems to introduce gameplay mechanics.

5. Incorporate the Sound system to enhance the game's feedback to the user.

6. Implement the State Management system to handle game progression and persistence.

7. Continuously test the game at each stage of development, making adjustments as necessary to ensure a smooth and engaging gameplay experience.

`
)}

function _entities(){return(
{
  prompt: "Create the entity state as a map of objects",
  time: 1699829601388,
  comment: "Initialize an empty Map to hold the entity state"
} && new Map()
)}

function _entity_design(md){return(
{
  prompt: "What would be a good design for dynamically updatable entities?",
  time: 1699829726948,
  comment: "Entity Design proposal"
} &&
  md`
# Entity Design

Designing entities for a game involves creating a system that allows for flexibility and dynamic updates. Here is a recommended design using a Component-Entity-System (CES) architecture:

## Component-Entity-System

In a CES architecture, entities are composed of components and systems operate on these components. Here's how it works:

- **Components**: These are data containers that represent various aspects of an entity. For example, a Position component might store an entity's x and y coordinates, while a Velocity component might store its speed and direction. Components are pure data and contain no game logic.

- **Entities**: These are game objects composed of one or more components. An entity might represent a player, enemy, bullet, etc. In a CES architecture, entities are typically just unique identifiers, with their behavior and properties defined entirely by their components.

- **Systems**: These contain the game logic that operates on entities. Each system iterates over entities that have a specific set of components and performs operations based on those components. For example, a Movement system might operate on all entities that have Position and Velocity components, updating their positions based on their velocities.

This architecture allows for a high degree of flexibility. Entities can be created, updated, or destroyed dynamically by adding, changing, or removing components. New systems can be added to introduce new behavior, and existing systems can be modified or removed as needed.

Here's a basic example of how this might look in code:

~~~js
// Components
class Position { constructor(x, y) { this.x = x; this.y = y; } }
class Velocity { constructor(dx, dy) { this.dx = dx; this.dy = dy; } }

// Entity
let player = { id: 'player', components: { position: new Position(0, 0), velocity: new Velocity(1, 0) } };

// System
function moveEntity(entity) {
  entity.components.position.x += entity.components.velocity.dx;
  entity.components.position.y += entity.components.velocity.dy;
}

// Game Loop
function update() {
  moveEntity(player);
  // ... other systems ...
}
~~~

This design allows for entities to be updated dynamically and easily extended with new behavior.

`
)}

function _dependency_injection(md){return(
{
  prompt:
    "I think in a notebook it would make sense of a single cell to be a system. But every system will have common functionality like ticking and being disabled. So every System should extend the BaseSystem class. But as we iterate on the notebook, we might want to rewrite the BaseSystem class. Thus we need to dependancy inject BaseSystem and update its implementation without deleting the old class. So lets start with a dependancy injection system. Sketch out what that might look like in a markdown cell",
  time: 1699830139546,
  comment: "Dependency Injection Design proposal"
} &&
  md`
# Dependency Injection Design

Dependency Injection (DI) is a design pattern that allows for high modularity and testing. It works by providing objects with the dependencies they need to perform their functions, rather than having objects construct these dependencies themselves. Here's a sketch of what it might look like for our game systems:

## DI Container

A DI container would be responsible for instantiating and providing the dependencies for the different systems. It can be implemented as a simple JavaScript class:

~~~js
class DIContainer {
  constructor() {
    this.dependencies = new Map();
  }

  register(name, dependency) {
    this.dependencies.set(name, dependency);
  }

  get(name) {
    return this.dependencies.get(name);
  }
}
~~~

## BaseSystem

The BaseSystem class would take an instance of the DIContainer during construction, and use it to get its dependencies:

~~~js
class BaseSystem {
  constructor(diContainer) {
    this.diContainer = diContainer;
  }

  //...other methods...
}
~~~

## Extending BaseSystem

When creating a new system that extends BaseSystem, the DIContainer is passed to the super constructor:

~~~js
class RenderSystem extends BaseSystem {
  constructor(diContainer) {
    super(diContainer);
    //...other setup...
  }

  //...other methods...
}
~~~

With this design, the implementation of BaseSystem can be changed without affecting existing systems. New dependencies can be registered with the DIContainer and existing dependencies can be updated or removed as needed.

`
)}

function _dynamic_dependency_injection(md){return(
{
  prompt:
    "Your DI suggestion doesn't go far enough. We will have BaseSystemV1 and BaseSystemV2 in global namespace. We want to be able to switch BaseSystem classes. Observable will reactivly update dependant cells. So how can we make the extents itself dynamic?",
  time: 1699830295642,
  comment: "Dynamic Dependency Injection Design proposal"
} &&
  md`
# Dynamic Dependency Injection Design

To allow for dynamic switching between different versions of the \`BaseSystem\` class (or any other dependency), we can leverage JavaScript's dynamic nature and Observable's reactivity. Here's a sketch of what it might look like:

## DI Container

The DI container remains largely the same, but we will add a \`registerFactory\` method to allow for the registration of factory functions. These functions can be used to create instances of dependencies, allowing for dynamic switching between different implementations:

~~~js
class DIContainer {
  // ...

  registerFactory(name, factory) {
    this.dependencies.set(name, factory);
  }

  create(name, ...args) {
    const factory = this.dependencies.get(name);
    return factory ? factory(...args) : null;
  }
}
~~~

## BaseSystem

The \`BaseSystem\` class remains the same, but when a system extends \`BaseSystem\`, it does so by getting the current \`BaseSystem\` implementation from the DI container:

~~~js
class RenderSystem extends diContainer.create('BaseSystem') {
  constructor(...args) {
    super(...args);
    //...other setup...
  }

  //...other methods...
}
~~~

## Switching Implementations

To switch between different \`BaseSystem\` implementations, simply register a new factory function with the DI container:

~~~js
diContainer.registerFactory('BaseSystem', () => BaseSystemV2);
~~~

Observable's reactivity will automatically update all dependent cells when the \`BaseSystem\` implementation changes.

This design allows for a high degree of flexibility and dynamism, while still preserving the benefits of dependency injection.

`
)}

function _caller_id(){return(
{
  prompt:
    "Write a function called caller_id that will identifying the source code location by reading a stack trace and hashing it",
  time: 1699860967160,
  comment: "Function for identifying the source code location"
} &&
  function caller_id() {
    const err = new Error();
    const stack = err.stack.split("\n");
    const sourceLocation = stack[2];
    let hash = 0;
    for (let i = 0; i < sourceLocation.length; i++) {
      const char = sourceLocation.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
)}

function _deps(Inputs,caller_id,Event)
{
  ({
    prompt:
      'Create a DI impelmentation that makes use of Observable resolution.\n\nThe named service should end up bound to an implementation with \n\n"mySystem = deps.resolve("mySystem")"\n\ndifferent implementations are added with\n\n"deps.register("mySystem", <value>, 1)"\n\nwith a monotonic version counter.\n\nthe deps implementation should keep all versions, so we can dynamically switch implementations, e.g. for a/b testing, but by default things should resolve to the highest number.\n\nbecause when deps changes it should dispatch and event, callers will try to reregister. So it should sniff where the call is coming from for deduplication with caller_id and time',
    time: 1699900881324,
    comment: "Create a viewof cell for Dependency Injection container v2"
  });

  const view = Inputs.input();

  class DIContainer {
    constructor() {
      this.dependencies = new Map();
    }

    register(name, factory, version = 0) {
      const caller = caller_id();
      let versions = this.dependencies.get(name);
      if (!versions) {
        versions = {};
        this.dependencies.set(name, versions);
      }

      if (
        !versions[version] ||
        versions[version].trigger_time < Date.now() - 1000
      ) {
        view.dispatchEvent(new Event("input"));
      }

      versions[version] = { factory, caller, trigger_time: Date.now() };
      return factory;
    }

    resolve(name) {
      const versions = this.dependencies.get(name);
      if (!versions) return null;
      const maxVersion = Math.max(...Object.keys(versions));
      return versions[maxVersion]?.factory || null;
    }
  }

  view.value = new DIContainer();
  return view;
}


function _10(deps){return(
deps.resolve("BaseSystem")
)}

function _11(deps){return(
deps.register("BaseSystem", class {}, 1)
)}

function _PhysicsSystem(deps,entities)
{
  ({
    prompt:
      'Write a PhysicsSystem that extends deps.resolve("BaseSystem") with a tick function that moves everyone\'s position: [number, number] based on velocity, and alters velocity based on forces (and resets force)',
    time: 1699903669596,
    comment: "PhysicsSystem Class that extends from BaseSystem"
  });
  class PhysicsSystem extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
    }

    tick() {
      entities.forEach((entity) => {
        if (entity.position && entity.velocity) {
          entity.position[0] += entity.velocity[0];
          entity.position[1] += entity.velocity[1];
        }

        if (entity.velocity && entity.force) {
          entity.velocity[0] += entity.force[0];
          entity.velocity[1] += entity.force[1];
          // reset force
          entity.force = [0, 0];
        }
      });
    }
  }

  // Register PhysicsSystem under 'PhysicsSystem' with version 1
  return deps.register("PhysicsSystem", new PhysicsSystem(), 1);
}


function _view_v0(deps,htl){return(
{
  prompt: 'register a SVG element, 200px by 200px under "view"',
  time: 1699903894163,
  comment: 'Register a 200px by 200px SVG element under "view"'
} && deps.register("view", htl.html`<svg width="200" height="200"></svg>`, 0)
)}

function _view(deps){return(
deps.resolve("view")
)}

function _15(entities){return(
entities
)}

function _RendererSystem(deps,entities,view,htl)
{
  ({
    prompt:
      'register an RendererSystem (extends BaseSystem) that loops through all entities and upsets a svg circle with an id that matches the entity id into "view"',
    time: 1699904219987,
    comment: "RendererSystem Class that extends from BaseSystem"
  });
  class RendererSystem extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
    }

    tick() {
      entities.forEach((entity) => {
        if (!entity.position) return;

        // find or create circle
        let circle = view.querySelector(`#${entity.id}`);
        if (!circle) {
          debugger;
          circle = htl.svg`<circle id=${entity.id} r="0.1", fill="red">`;
          view.appendChild(circle);
        }

        // update position
        circle.setAttribute("cx", entity.position[0]);
        circle.setAttribute("cy", entity.position[1]);
      });
    }
  }

  // Register RendererSystem under 'RendererSystem' with version 1
  return deps.register("RendererSystem", new RendererSystem(), 1);
}


function _17(entities){return(
entities
)}

function _ticker_v0(deps,invalidation)
{
  return; // disable because of v1
  ({
    prompt:
      "Now we need a ticker that iterates the deps for things with tick and calls tick every animation frame",
    time: 1699906190580,
    comment:
      "Ticker function that iterates dependencies and calls tick on each system"
  });
  let cancel = false;
  function tick() {
    if (cancel) return;
    const systems = Object.keys(deps);
    systems.forEach((systemVersions) => {
      const system = Object.values(systemVersions).pop()?.factory;
      debugger;
      if (system && typeof system.tick === "function") {
        system.tick();
      }
    });
    requestAnimationFrame(tick);
  }
  tick();
  // Clear loop if cell recomputes
  invalidation.then(() => (cancel = true));
}


function _add_entity_button(htl,entities)
{
  ({
    prompt:
      "create a button that adds an entity at the origin with a random radial velocity",
    time: 1699906352659,
    comment:
      "Button to add an entity at the origin with a random radial velocity"
  });

  const button = htl.html`<button>Add Entity</button>`;
  button.onclick = () => {
    // Create entity with id and random radial velocity
    const angle = Math.random() * 2 * Math.PI;
    const velocity = [Math.cos(angle) * 0.0001, Math.sin(angle) * 0.0001];
    const entity = {
      id: `entity${entities.size}`,
      position: [0, 0],
      velocity
    };
    // Add entity to entities map
    entities.set(entity.id, entity);
  };
  return button;
}


function _view_v1(deps,htl){return(
{
  prompt:
    "lets a do a new view with the origin in the middle and the corners -1 and 1",
  time: 1699906480550,
  comment:
    "Register a new SVG element with the origin in the middle and corners at -1 and 1"
} &&
  deps.register(
    "view",
    htl.html`<svg width="200" height="200" viewBox="-1 -1 2 2"></svg>`,
    1
  ) &&
  null
)}

function _ticker_v1(deps,invalidation)
{
  ({
    prompt:
      'The ticker does not work. It should iterate the names in dependancies, "resolve" the name, the look for a tick function, and if it exists, call it.',
    time: 1699907020513,
    comment:
      "Ticker function v1 that resolves dependencies and calls tick on each system"
  });
  let cancel = false;
  function tick() {
    if (cancel) return;
    const names = Array.from(deps.dependencies.keys());
    names.forEach((name) => {
      const system = deps.resolve(name);
      if (system && typeof system.tick === "function") {
        try {
          system.tick();
        } catch (e) {
          console.error(e);
        }
      }
    });
    requestAnimationFrame(tick);
  }
  tick();
  // Clear loop if cell recomputes
  invalidation.then(() => (cancel = true));
}


function _draw_circle(htl){return(
{
  prompt: "draw a red circle in SVG in a small area",
  time: 1699908730729,
  comment: "Draw a red circle in SVG"
} &&
  htl.html`<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>`
)}

function _23($0){return(
$0
)}

function _24(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _25($0){return(
$0
)}

function _26(md){return(
md`## Current Chat context`
)}

function _27($0){return(
$0
)}

function _28(md){return(
md`tick the cells to include in the next prompt`
)}

function _29($0){return(
$0
)}

function _30(feedback_prompt){return(
feedback_prompt
)}

function _31(md){return(
md`### AI Settings`
)}

function _32($0){return(
$0
)}

function _33($0){return(
$0
)}

function _34($0){return(
$0
)}

function _35(md){return(
md`---`
)}

function _workers(update_context,on_prompt,api_call_response)
{
  update_context;
  on_prompt;
  return api_call_response;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("markdown_skill")).define("markdown_skill", ["md","mermaid","htl","tex"], _markdown_skill);
  main.variable(observer("game_architecture")).define("game_architecture", ["md"], _game_architecture);
  main.variable(observer("entities")).define("entities", _entities);
  main.variable(observer("entity_design")).define("entity_design", ["md"], _entity_design);
  main.variable(observer("dependency_injection")).define("dependency_injection", ["md"], _dependency_injection);
  main.variable(observer("dynamic_dependency_injection")).define("dynamic_dependency_injection", ["md"], _dynamic_dependency_injection);
  main.variable(observer("caller_id")).define("caller_id", _caller_id);
  main.variable(observer("viewof deps")).define("viewof deps", ["Inputs","caller_id","Event"], _deps);
  main.variable(observer("deps")).define("deps", ["Generators", "viewof deps"], (G, _) => G.input(_));
  main.variable(observer()).define(["deps"], _10);
  main.variable(observer()).define(["deps"], _11);
  main.variable(observer("PhysicsSystem")).define("PhysicsSystem", ["deps","entities"], _PhysicsSystem);
  main.variable(observer("view_v0")).define("view_v0", ["deps","htl"], _view_v0);
  main.variable(observer("view")).define("view", ["deps"], _view);
  main.variable(observer()).define(["entities"], _15);
  main.variable(observer("RendererSystem")).define("RendererSystem", ["deps","entities","view","htl"], _RendererSystem);
  main.variable(observer()).define(["entities"], _17);
  main.variable(observer("ticker_v0")).define("ticker_v0", ["deps","invalidation"], _ticker_v0);
  main.variable(observer("add_entity_button")).define("add_entity_button", ["htl","entities"], _add_entity_button);
  main.variable(observer("view_v1")).define("view_v1", ["deps","htl"], _view_v1);
  main.variable(observer("ticker_v1")).define("ticker_v1", ["deps","invalidation"], _ticker_v1);
  main.variable(observer("draw_circle")).define("draw_circle", ["htl"], _draw_circle);
  main.variable(observer()).define(["viewof prompt"], _23);
  main.variable(observer()).define(["Inputs","suggestion"], _24);
  main.variable(observer()).define(["viewof suggestion"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["viewof context_viz"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _29);
  main.variable(observer()).define(["feedback_prompt"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _32);
  main.variable(observer()).define(["viewof api_endpoint"], _33);
  main.variable(observer()).define(["viewof settings"], _34);
  main.variable(observer()).define(["md"], _35);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("api_call_response", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("feedback_prompt", child1);
  main.import("viewof feedback_cells_selector", child1);
  main.import("feedback_cells_selector", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.variable(observer("workers")).define("workers", ["update_context","on_prompt","api_call_response"], _workers);
  return main;
}
