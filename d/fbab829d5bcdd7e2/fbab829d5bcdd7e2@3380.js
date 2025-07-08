import define1 from "./f92778131fd76559@1208.js";
import define2 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# Make a Game Part IV - Enemies


`
)}

function _markdown_skill(md,mermaid,htl,tex){return(
{
  prompt: "Write a markdown skill cell",
  time: 1699719020249,
  comment: "Complex markdown skill cell"
} &&
  md`
## Markdown Skill
This demonstrates advanced usage of markdown \`md\` literal

<details><summary>example</summary>
${md`## Mermaid Diagram
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
\`Backticks\` need to be escaped, it is easier to use ~ instead
~~~js
  () => throw Error()
~~~
`}
</details>
`
)}

function _bindableUISkill(view,md,Inputs,htl,Event){return(
{
  prompt:
    "Demonstrate how to use the bidirection bindable UI composer, the view literal",
  time: 1700263368139,
  comment: "Binding inputs, composing within HTML and accessing via a viewof"
} &&
  view`<div class="skill">

  ${md`
  ## Bindable UI Skill
  ~~~js
  import {view} from '@tomlarkworthy/view' // required notebook import for bindable UI
  ~~~
  The view literal can compose bidirectional HTML UIs, whose value can be written to and the UI will visually update. You can bind them storage so they remember values across page refreshes
  `}
  <details><summary>example</summary>
    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Text Input</h3>
      ${[
        "textInput",
        Inputs.text({ placeholder: "Type something...", value: "Hello World!" })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Select Input</h3>
      ${[
        "selectInput",
        Inputs.select(["Option 1", "Option 2", "Option 3"], {
          value: "Option 2",
          label: "Choose an option"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Input Arrays</h3>
      ${[
        "array",
        Array.from({ length: 3 }, (_, i) =>
          Inputs.text({ placeholder: `Input ${i + 1}` })
        ),
        (value) => Inputs.text({ value: value })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px;">
      <h3>Button Action</h3>
      <div style="display: flex; justify-content: flex-start;">
      <!-- the Inputs.button has a lot of formatting which breaks flexbox -->
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) => {
          const container = evt.target.closest(".skill");
          container.value.array.push(5);
          container.dispatchEvent(new Event("input"));
        }}>add`
      ]}
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) =>
          evt.target.closest(".skill").value.array.pop()}>remove`
      ]}
      </div>
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Radio Input</h3>
      ${[
        "radioInput",
        Inputs.radio(["Choice A", "Choice B", "Choice C"], {
          value: "Choice B",
          label: "Pick one"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Checkbox Input</h3>
      ${[
        "checkboxInput",
        Inputs.checkbox(["Check 1", "Check 2"], {
          values: ["Check 1"],
          label: "Select checks"
        })
      ]}
    </div>

</details>
  </div>`
)}

function _entities(){return(
{
  prompt: "Create the entity state as a map of objects",
  time: 1699829601388,
  comment: "Initialize an empty Map to hold the entity state"
} && new Map()
)}

function _gameState()
{
  ({
    prompt:
      'Add a cell for the game state, should contain lives 3, a score 0 and the state "Running"',
    time: 1700002625261,
    comment:
      "Cell to store game state including lives, score, and current state"
  });

  const gameState = { lives: 3, score: 0, state: "Running" };
  return gameState;
}


function _keysPressed(invalidation)
{
  ({
    prompt:
      "Write a cell that listens to the keyboard and records which keys are up or down and swallows Array events to prevent scrolling",
    time: 1699995151091,
    comment:
      "Cell to record key up/down states and prevent scrolling with arrow keys"
  });
  const keysPressed = {};

  function keydownListener(event) {
    if (event.key.startsWith("Arrow")) event.preventDefault(); // Prevent scrolling with arrow keys
    keysPressed[event.key] = true;
  }

  function keyupListener(event) {
    if (event.key.startsWith("Arrow")) event.preventDefault(); // Prevent scrolling with arrow keys
    keysPressed[event.key] = false;
  }

  window.addEventListener("keydown", keydownListener);
  window.addEventListener("keyup", keyupListener);

  // Cleanup listeners when cell is re-evaluated or notebook is closed
  invalidation.then(() => {
    window.removeEventListener("keydown", keydownListener);
    window.removeEventListener("keyup", keyupListener);
  });

  return keysPressed;
}


function _assets(deps){return(
deps.resolve("Assets")
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

  const game_view = Inputs.input();

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
        game_view.dispatchEvent(new Event("input"));
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

  game_view.value = new DIContainer();
  return game_view;
}


function _11(deps){return(
deps.register("BaseSystem", class {}, 1)
)}

function _ticker_v1(deps,invalidation)
{
  ({
    prompt:
      "Tick all systems by iterating the deps and calling the tick function if it exists",
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


function _assets_v1(deps){return(
{
  prompt:
    "At the moment all entities are circles. Lets add a Assets dependancy that will hold a str -> any map",
  time: 1699948455733,
  comment: "Register Assets dependency holding a map from string to any"
} && deps.register("Assets", new Map(), 1)
)}

function _player_entity(entities)
{
  ({
    prompt: "create an entity called player at the origin",
    time: 1699948785452,
    comment: "Create a player entity at the origin"
  });

  const player = {
    id: "player",
    template: "ship",
    position: [0, 0, 0],
    velocity: [0, 0, 0],
    force: [0, 0, 0]
  };

  // Add player entity to entities map
  entities.set(player.id, player);
  return player;
}


function _PhysicsSystem_v2(deps,entities)
{
  ({
    prompt:
      "We don't have rotation as a concept! update position etc. in the physics system to be arrays of 3, where the last element is rotation/rotational velocity, torque",
    time: 1699989339201,
    comment:
      "Update PhysicsSystem to include rotation in position, velocity, and force"
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
          entity.position[2] += entity.velocity[2]; // Update rotation
        }

        if (entity.velocity && entity.force) {
          entity.velocity[0] += entity.force[0];
          entity.velocity[1] += entity.force[1];
          entity.velocity[2] += entity.force[2]; // Update rotational velocity
          // Reset force and torque
          entity.force = [0, 0, 0];
        }
      });
    }
  }

  // Register updated PhysicsSystem under 'PhysicsSystem' with version 2
  return deps.register("PhysicsSystem", new PhysicsSystem(), 2);
}


function _RendererSystem_v3(deps,entities,htl)
{
  ({
    prompt: "Update the rendering system to rotate the sprite too",
    time: 1699990218935,
    comment: "Update RendererSystem to apply rotation to the SVG transform"
  });

  class RendererSystem extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
      this.game_view = deps.resolve("game_view");
      this.assets = deps.resolve("Assets");
    }

    tick() {
      entities.forEach((entity) => {
        if (!entity.position) return;
        // Set attributes or create transform if needed
        let transform = this.game_view.querySelector(`#${entity.id}`);
        if (!transform) {
          const svgElement = this.assets.get(entity.template).cloneNode(true);
          transform = htl.svg`<g id=${entity.id}>${svgElement}</g>`;
          transform.appendChild(svgElement);
          this.game_view.appendChild(transform);
        }

        // Sync transform to entity's position and rotation
        transform.setAttribute(
          "transform",
          `translate(${entity.position[0]} ${entity.position[1]}) rotate(${
            (entity.position[2] * 180) / Math.PI
          })`
        );
      });
    }
  }

  // Register updated RendererSystem under 'RendererSystem' with version 3
  return deps.register("RendererSystem", new RendererSystem(), 3);
}


function _WorldWrap(deps,entities,game_view)
{
  ({
    prompt:
      "the bullets should world wrap too. So lets take all the wrapping logic into its own system called WorldWrap. We should also decrement the ttl and remove the element if ttl < 0",
    time: 1699993637444,
    comment: "Create WorldWrap system for wrapping entities and managing ttl"
  });
  class WorldWrap extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
    }

    tick() {
      entities.forEach((entity, id) => {
        // Wrap entities around the edges
        for (let i = 0; i < 2; i++) {
          if (entity.position[i] < -1) entity.position[i] = 1;
          if (entity.position[i] > 1) entity.position[i] = -1;
        }
        // Decrement ttl for entities with ttl and remove if ttl < 0
        if (entity.ttl !== undefined) {
          entity.ttl -= 1;
          if (entity.ttl < 0) {
            entities.delete(id);
            const element = game_view.querySelector(`#${id}`);
            if (element) element.remove();
          }
        }
      });
    }
  }

  // Register WorldWrap system with version 1
  return deps.register("WorldWrap", new WorldWrap(), 1);
}


function _projectile_asset(htl,assets)
{
  ({
    prompt: "create projectile asset as an SVG line",
    time: 1699992605095,
    comment: "Create a projectile asset as an SVG line"
  });
  // Create an SVG line to represent a projectile
  const projectile = htl.svg`<line x1="0" y1="0" x2="0.05" y2="0" style="stroke:rgb(255,0,0);stroke-width:0.01" />`;
  assets.set("projectile", projectile);
  return htl.svg`<svg id="projectile" width="10" height="10" viewBox="-0.05 -0.05 0.1 0.1">
    ${projectile}
  </svg>`;
}


function _boulder_template(htl,assets)
{
  ({
    prompt:
      "now we need some astroids to collide into, create a jagged bolder templates",
    time: 1700001722754,
    comment: "Create jagged boulder SVG template"
  });

  // Create a jagged boulder template using a random polygon
  const points = Array.from({ length: 8 }, () => {
    const angle = Math.random() * 2 * Math.PI;
    const radius = 0.1 + Math.random() * 0.05; // radius between 0.1 and 0.15
    return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
  }).join(" ");

  const boulder = htl.svg`<polygon points="${points}" style="fill:grey;stroke:black;stroke-width:0.005" />`;
  assets.set("boulder", boulder);
  return htl.svg`<svg width="50" height="50" viewBox="-1 -1 2 2">
    ${boulder.cloneNode(true)}
  </svg>`;
}


function _small_boulder_template(htl,assets)
{
  ({
    prompt: "We need a template for smaller boulders",
    time: 1700002006174,
    comment: "Create template for smaller boulders"
  });

  // Create a smaller jagged boulder template using a random polygon
  const points = Array.from({ length: 8 }, () => {
    const angle = Math.random() * 2 * Math.PI;
    const radius = 0.025 + Math.random() * 0.00125;
    return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
  }).join(" ");

  const smallBoulder = htl.svg`<polygon points="${points}" style="fill:grey;stroke:black;stroke-width:0.005" />`;
  assets.set("smallBoulder", smallBoulder);
  return htl.svg`<svg id="smallBoulder" width="30" height="30" viewBox="-0.1 -0.1 0.2 0.2">
    ${smallBoulder}
  </svg>`;
}


function _GameLoop_v4(view,Inputs,deps,entities,game_view,gameState)
{
  ({
    prompt:
      "I would like a UI settings panel that allows me to edit all the parameters for a given system. For example the bullet speed. As the parameters are associated with a system, we can change those cells to viewof's and let the notebook author change the values. Lets start with the game loop system",
    time: 1700396219035,
    comment: "Updated GameLoop to reference settings variables"
  });

  const settings = view`<div>
    <h2>Game Loop Settings</h2>
    ${[
      "score_per_hit",
      Inputs.range([5, 50], {
        value: 10,
        step: 5,
        label: "Adjust score for hitting a boulder"
      })
    ]}
    ${[
      "collision_penalty",
      Inputs.range([50, 500], {
        value: 100,
        step: 50,
        label: "Adjust penalty for colliding with a boulder"
      })
    ]}
    ${[
      "collision_radius",
      Inputs.range([0, 1], {
        value: 0.01,
        label: "radius of collisions"
      })
    ]}
  </div>`;

  class GameLoop extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      this.settings = settings.value;
      const projectiles = Array.from(entities.values()).filter(
        (e) => e.template === "projectile"
      );
      const boulders = Array.from(entities.values()).filter(
        (e) => e.template === "boulder" || e.template === "smallBoulder"
      );
      const player = entities.get("player");

      projectiles.forEach((projectile) => {
        boulders.forEach((boulder) => {
          const dx = projectile.position[0] - boulder.position[0];
          const dy = projectile.position[1] - boulder.position[1];
          if (dx * dx + dy * dy < this.settings.collision_radius) {
            entities.delete(projectile.id);
            game_view.querySelector(`#${projectile.id}`).remove();
            gameState.score += this.settings.score_per_hit;
            if (boulder.template === "boulder") {
              entities.delete(boulder.id);
              game_view.querySelector(`#${boulder.id}`).remove();
              for (let i = 0; i < 3; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const velocity = [
                  Math.cos(angle) * this.settings.bullet_speed,
                  Math.sin(angle) * this.settings.bullet_speed,
                  0
                ];
                const smallBoulder = {
                  id: `smallBoulder${Date.now()}${i}`,
                  template: "smallBoulder",
                  position: [...boulder.position],
                  velocity: velocity
                };
                entities.set(smallBoulder.id, smallBoulder);
              }
            } else if (boulder.template === "smallBoulder") {
              entities.delete(boulder.id);
              game_view.querySelector(`#${boulder.id}`).remove();
            }
          }
        });
      });

      boulders.forEach((boulder) => {
        const dx = player.position[0] - boulder.position[0];
        const dy = player.position[1] - boulder.position[1];
        if (dx * dx + dy * dy < this.settings.collision_radius) {
          gameState.lives -= 1;
          gameState.score = Math.max(
            0,
            gameState.score - this.settings.collision_penalty
          );
          if (gameState.lives <= 0) {
            gameState.state = "End";
          }
        }
      });
    }
  }

  deps.register("GameLoop", new GameLoop(), 4);

  return settings;
}


function _PlayerControl_v6(view,Inputs,deps,entities,keysPressed)
{
  ({
    prompt:
      "Can we make a new version of keyboard controls that includes a UI for changing the values",
    time: 1700398068677,
    comment: "New version of PlayerControl with UI for changing control values"
  });

  const controlSettings = view`<div>
    <h2>Player Control Settings</h2>
    ${[
      "rotation_speed",
      Inputs.range([0.01, 0.1], {
        value: 0.03,
        step: 0.01,
        label: "Adjust rotation speed"
      })
    ]}
    ${[
      "thrust",
      Inputs.range([0.0001, 0.001], {
        value: 0.0004,
        step: 0.00005,
        label: "Adjust thrust"
      })
    ]}
    ${[
      "bullet_speed",
      Inputs.range([0, 1], {
        value: 0.02,
        step: 0.00005,
        label: "Bullet speed"
      })
    ]}
    ${[
      "bullet_ttl",
      Inputs.range([0, 500], {
        value: 80,
        step: 1,
        label: "Bullet ttl"
      })
    ]}
  </div>`;

  class PlayerControl extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      this.controlSettings = controlSettings.value;
      const player = entities.get("player");
      if (!player) return;
      if (keysPressed["ArrowLeft"]) {
        player.velocity[2] = -this.controlSettings.rotation_speed;
      }
      if (keysPressed["ArrowRight"]) {
        player.velocity[2] = this.controlSettings.rotation_speed;
      }
      if (!keysPressed["ArrowRight"] && !keysPressed["ArrowLeft"]) {
        player.velocity[2] = 0;
      }
      if (keysPressed["ArrowUp"]) {
        const rotation = player.position[2];
        player.velocity[0] += Math.cos(rotation) * this.controlSettings.thrust;
        player.velocity[1] += Math.sin(rotation) * this.controlSettings.thrust;
      }
      if (keysPressed["ArrowDown"]) {
        const rotation = player.position[2];
        player.velocity[0] -= Math.cos(rotation) * this.controlSettings.thrust;
        player.velocity[1] -= Math.sin(rotation) * this.controlSettings.thrust;
      }

      if (keysPressed[" "]) {
        keysPressed[" "] = false;
        const rotation = player.position[2];
        const bulletVelocity = [
          Math.cos(rotation) * this.controlSettings.bullet_speed +
            player.velocity[0],
          Math.sin(rotation) * this.controlSettings.bullet_speed +
            player.velocity[1],
          0
        ];
        const projectile = {
          id: `p${Date.now()}`,
          template: "projectile",
          position: [...player.position],
          velocity: bulletVelocity,
          ttl: this.controlSettings.bullet_ttl
        };
        entities.set(projectile.id, projectile);
      }
    }
  }

  deps.register("PlayerControl", new PlayerControl(), 6);

  return controlSettings;
}


function _game_view_v2(view,Inputs,htl,deps)
{
  ({
    prompt: "Let's add adjustable parameters for the view too (size)",
    time: 1700410016492,
    comment: "Add adjustable parameters for the game view width and height"
  });

  const gameViewSettings = view`<div>
    <h2>Game View Settings</h2>
    ${[
      "size",
      Inputs.range([100, 1024], {
        value: 640,
        step: 50,
        label: "Adjust game view size"
      })
    ]}
  </div>`;

  const game_view = htl.html`<svg
    width="200"
    height="200"
    viewBox="-1 -1 2 2">
  </svg>`;
  const updateGameViewSize = () => {
    const settings = gameViewSettings.value;
    game_view.setAttribute("width", settings.size);
    game_view.setAttribute("height", settings.size);
  };
  // Update view on changes
  gameViewSettings.addEventListener("input", updateGameViewSize);
  updateGameViewSize(); // Initialize size

  deps.register("game_view", game_view, 2);

  return gameViewSettings;
}


function _RendererSystem_v4(deps,entities,htl)
{
  ({
    prompt:
      '"RendererSystem_v4" does not work "Cannot read properties of null (reading \'getVersion\')"',
    time: 1700411032667,
    comment: "Fix RendererSystem_v4 to correctly obtain version_tracker"
  });

  class RendererSystem extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
      this.game_view = deps.resolve("game_view");
      this.assets = deps.resolve("Assets");
      this.assetVersions = new Map();
    }

    tick() {
      for (let [id, entity] of entities) {
        if (!entity.position) return;

        // Check if asset template has changed
        const assetVersion = this.assetVersions.get(entity.template);
        const currentVersion = this.assets.get(entity.template);
        if (assetVersion !== currentVersion) {
          this.assetVersions.set(entity.template, currentVersion);
          const element = this.game_view.querySelector(`#${id}`);
          if (element) element.remove(); // Asset changed, remove old element
        }

        // Set attributes or create transform if needed
        let transform = this.game_view.querySelector(`#${id}`);
        if (!transform) {
          const svgElement = this.assets.get(entity.template).cloneNode(true);
          transform = htl.svg`<g id=${id}>${svgElement}</g>`;
          this.game_view.appendChild(transform);
        }

        // Sync transform to entity's position and rotation
        transform.setAttribute(
          "transform",
          `translate(${entity.position[0]} ${entity.position[1]}) rotate(${
            (entity.position[2] * 180) / Math.PI
          })`
        );
      }
    }
  }

  deps.register("RendererSystem", new RendererSystem(), 4);
}


function _ship_template_v3(view,Inputs,htl,assets)
{
  ({
    prompt:
      "Let make a new ship shape. I want a simple V shape, but expose the parameters like color, length and width as a UI",
    time: 1700411623034,
    comment:
      "Create a new ship shape with parameters for color, length, and width exposed in a UI"
  });
  const shipSettings = view`<div>
    <h2>Ship Settings</h2>
    ${["color", Inputs.color({ value: "#f88fff", label: "Ship color" })]}
    ${["length", Inputs.range([0, 2], { value: 0.2, label: "Ship length" })]}
    ${["width", Inputs.range([0, 1], { value: 0.11, label: "Ship width" })]}
    ${["stroke", Inputs.range([0, 1], { value: 0.018, label: "stroke width" })]}
    ${["offset", Inputs.range([0, 0.2], { value: 0.06, label: "offset" })]}
  </div>`;

  const updateShipTemplate = () => {
    const settings = shipSettings.value;

    const points = `${-settings.length / 2 + settings.offset},${
      settings.width / 2
    } ${settings.offset},0 ${-settings.length / 2 + settings.offset},${
      -settings.width / 2
    }`;
    const ship = htl.svg`<polyline
      fill="none"
      stroke-linecap="round"
      style=${{
        stroke: settings.color,
        "stroke-width": settings.stroke
      }}
      points="${points}" />`;

    assets.set("ship", ship);
  };
  // Update ship when settings change
  shipSettings.addEventListener("input", updateShipTemplate);
  updateShipTemplate(); // Initialize shape

  return shipSettings;
}


function _background_template(view,Inputs,htl,assets)
{
  ({
    prompt:
      "Let's add a background entity and template. It should be a 100% width rect that is behind everything. Lets expose its color as a ui setting.",
    time: 1700413482288,
    comment:
      "Create a background entity and template with a UI setting for color"
  });

  const backgroundSettings = view`<div>
    <h2>Background Settings</h2>
    ${[
      "color",
      Inputs.color({
        value: "#3d3b4e",
        label: "Background color"
      })
    ]}
  </div>`;

  const updateBackgroundTemplate = () => {
    const settings = backgroundSettings.value;
    const background = htl.svg`<rect x="-1" y="-1" z="1" width="2" height="2" fill="${settings.color}" />`;
    assets.set("background", background);
  };
  // Update background when settings change
  backgroundSettings.addEventListener("input", updateBackgroundTemplate);
  updateBackgroundTemplate(); // Initialize background

  return backgroundSettings;
}


function _score_template(view,Inputs,htl,assets)
{
  ({
    prompt:
      "Lets create a template for the score (and SVG text node). Include a UI to control its parameters",
    time: 1700416227959,
    comment:
      "Create a score template with SVG text node and a UI to control its parameters"
  });

  const scoreSettings = view`<div>
    <h2>Score Settings</h2>
    ${[
      "color",
      Inputs.color({
        value: "#f0dd0a",
        label: "Score color"
      })
    ]}
    ${[
      "font_size",
      Inputs.range([0, 1], {
        value: 0.1,
        label: "Font size"
      })
    ]}
    ${[
      "x_position",
      Inputs.range([-1, 1], {
        value: -0.9,
        label: "X position"
      })
    ]}
  </div>`;

  const updateScoreTemplate = () => {
    const settings = scoreSettings.value;
    const score = htl.svg`<text x="${settings.x_position}" y="0.95" dy="-0.35em" fill="${settings.color}" font-size="${settings.font_size}px" text-anchor="start" font-family="'Press Start 2P', cursive">
      <tspan id="score-value">0</tspan>
    </text>`;
    assets.set("score", score);
  };
  // Update score when settings change
  scoreSettings.addEventListener("input", updateScoreTemplate);
  updateScoreTemplate(); // Initialize score

  return scoreSettings;
}


function _lives_template(view,Inputs,htl,assets)
{
  ({
    prompt:
      "Create a template for the lives (and SVG text node). Include a UI to control its parameters",
    time: 1700416541894,
    comment:
      "Create a template for lives with SVG text node and a UI to control its parameters"
  });

  const livesSettings = view`<div>
    <h2>Lives Settings</h2>
    ${[
      "color",
      Inputs.color({
        value: "#ff1f1f",
        label: "Lives color"
      })
    ]}
    ${[
      "font_size",
      Inputs.range([0, 1], {
        value: 0.1,
        label: "Font size"
      })
    ]}
    ${[
      "x_position",
      Inputs.range([-1, 1], {
        value: 0.91,
        step: 0.01,
        label: "X position"
      })
    ]}
  </div>`;

  const updateLivesTemplate = () => {
    const settings = livesSettings.value;
    const lives = htl.svg`<text x="${settings.x_position}" y="0.95" dy="-0.35em" fill="${settings.color}" font-size="${settings.font_size}px" text-anchor="end" font-family="'Press Start 2P', cursive">
      <tspan id="lives-value">3</tspan>
    </text>`;
    assets.set("lives", lives);
  };
  // Update lives when settings change
  livesSettings.addEventListener("input", updateLivesTemplate);
  updateLivesTemplate(); // Initialize lives

  return livesSettings;
}


function _HUDSystem(deps,game_view,gameState)
{
  ({
    prompt: "We need a system to update the score and lives each tick.",
    time: 1700416874329,
    comment: "Create a system to update the HUD (score and lives) each tick"
  });

  class HUDSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const scoreElement = game_view.querySelector("#score-value");
      if (scoreElement) scoreElement.textContent = gameState.score;

      const livesElement = game_view.querySelector("#lives-value");
      if (livesElement) livesElement.textContent = gameState.lives;
    }
  }

  deps.register("HUDSystem", new HUDSystem(), 1);
}


function _boulder_generator_v1(view,Inputs,htl,deps)
{
  ({
    prompt:
      "I do not like our current approach to the bolders. Lets replace them with a generator function instead of a template. Also lets make them more round. So make them out of 12 radial segments where the angle is a little noisey and the radius is a little noisey. The generator should have a target size so we can use this one generator for the little and big boulders. The template parameters should be configurable with a UI, which includes previewing the template and clicking a button to regenerate another.",
    time: 1700506696129,
    comment:
      "Create a boulder generator function with UI settings and a preview"
  });

  const boulderSettings = view`<div>
    <h2>Boulder Generator Settings</h2>
    ${[
      "target_size",
      Inputs.range([0, 1], { value: 0.2, label: "Target size" })
    ]}
    ${[
      "segments",
      Inputs.range([3, 20], { value: 12, step: 1, label: "Segments" })
    ]}
    ${[
      "angle_noise",
      Inputs.range([0, 5], { value: 0.3, label: "Angle noise" })
    ]}
    ${[
      "radius_noise",
      Inputs.range([0, 5], { value: 0.1, label: "Radius noise" })
    ]}
    ${[
      "stroke",
      Inputs.range([0, 0.3], { value: 0.01, label: "stroke width" })
    ]}
    ${[
      "color",
      Inputs.color({
        value: "#1fb4ff",
        label: "color"
      })
    ]}
    ${[
      "regenerate",
      htl.html`<button style="margin-top: 10px;">Regenerate</button>`
    ]}
  </div>`;

  const generateBoulder = (target_size) => {
    const settings = boulderSettings.value;
    const angleStep = (Math.PI * 2) / settings.segments;
    const points = Array.from({ length: settings.segments }, (_, index) => {
      const angle =
        index * angleStep + (Math.random() - 0.5) * settings.angle_noise;
      const radius =
        target_size + (Math.random() - 0.5) * settings.radius_noise;
      return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
    }).join(" ");
    return htl.svg`<polygon points="${points}" style="fill:none;stroke:${settings.color};stroke-width:${settings.stroke}" />`;
  };

  // Preview and regenerate boulder on button click
  const preview = htl.svg`<svg width="100" height="100" viewBox="-0.5 -0.5 1 1">${generateBoulder(
    boulderSettings.value.target_size
  )}</svg>`;
  const regen = () => {
    const newBoulder = generateBoulder(boulderSettings.value.target_size);
    preview.replaceChild(newBoulder, preview.firstChild);
  };
  boulderSettings.querySelector("button").onclick = regen;
  boulderSettings.addEventListener("input", regen);
  deps.register("generateBoulder", generateBoulder, 1);

  return htl.html`${boulderSettings}${preview}`;
}


function _RendererSystem_v5(deps,entities,htl)
{
  ({
    prompt:
      "Our render system should use the generator and generator args  if available",
    time: 1700507770128,
    comment: "Update RendererSystem to use generator function if available"
  });

  class RendererSystem extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
      this.game_view = deps.resolve("game_view");
      this.assetVersions = new Map();
      this.boulderGenerator = deps.resolve("boulder_generator");
      this.boulderGeneratorArgs = deps.resolve("boulder_generator_args");
    }

    tick() {
      const assets = deps.resolve("Assets");
      for (let [id, entity] of entities) {
        if (!entity.position) return;

        // Set attributes or create transform if needed
        let transform = this.game_view.querySelector(`#${id}`);
        let generator = deps.resolve(entity.generator);
        let template = assets.get(entity.template);
        if (
          !transform ||
          transform.generator !== generator ||
          transform.template !== template
        ) {
          let svgElement;
          if (generator && entity.generator_args) {
            // Use generator function if available
            svgElement = generator(...entity.generator_args);
          } else if (template) {
            svgElement = template.cloneNode(true);
          }
          transform = htl.svg`<g id=${id}>${svgElement}</g>`;
          transform.template = template;
          transform.generator = generator;

          this.game_view.appendChild(transform);
        }

        // Sync transform to entity's position and rotation
        transform.setAttribute(
          "transform",
          `translate(${entity.position[0]} ${entity.position[1]}) rotate(${
            (entity.position[2] * 180) / Math.PI
          })`
        );
      }
    }
  }

  deps.register("RendererSystem", new RendererSystem(), 5);
}


function _GameLoop_v5(view,Inputs,deps,entities,gameState)
{
  ({
    prompt:
      "our game loop needs to be updated to use the radius from the boulder entity for collision detection and tracking the size of the fragments. We should make the boulder explosion parameters adjustable",
    time: 1700508198810,
    comment:
      "Update GameLoop to use boulder radius and make explosion parameters adjustable"
  });

  const explosionSettings = view`<div>
    <h2>Explosion Settings</h2>
    ${[
      "score_per_hit",
      Inputs.range([5, 50], {
        value: 10,
        step: 5,
        label: "Adjust score for hitting a boulder"
      })
    ]}
    ${[
      "collision_penalty",
      Inputs.range([50, 500], {
        value: 100,
        step: 50,
        label: "Adjust penalty for colliding with a boulder"
      })
    ]}
    ${[
      "collision_radius",
      Inputs.range([0, 1], {
        value: 0.01,
        label: "radius of collisions"
      })
    ]}
    ${[
      "fragment_count",
      Inputs.range([2, 10], {
        value: 3,
        step: 1,
        label: "Number of fragments from explosion"
      })
    ]}
    ${[
      "fragment_size",
      Inputs.range([0, 1], {
        value: 0.06,
        label: "Size of fragments"
      })
    ]}
    ${[
      "fragment_velocity",
      Inputs.range([0, 0.01], {
        value: 0.001,
        label: "fragment velocity"
      })
    ]}
  </div>`;

  class GameLoop extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.explosionSettings = explosionSettings.value;
    }

    tick() {
      const projectiles = Array.from(entities.values()).filter(
        (e) => e.template === "projectile"
      );
      const boulders = Array.from(entities.values()).filter(
        (e) => e.generator === "generateBoulder"
      );
      const player = entities.get("player");

      projectiles.forEach((projectile) => {
        boulders.forEach((boulder) => {
          const dx = projectile.position[0] - boulder.position[0];
          const dy = projectile.position[1] - boulder.position[1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (
            distance <
            boulder.radius + this.explosionSettings.collision_radius
          ) {
            // Handle boulder hit
            gameState.score += this.explosionSettings.score_per_hit;
            entities.delete(projectile.id);
            entities.delete(boulder.id);
            if (boulder.radius > this.explosionSettings.fragment_size) {
              this.createFragments(
                boulder,
                this.explosionSettings.fragment_count,
                boulder.radius / 2
              );
            }
          }
        });
      });

      // Handle player collision with boulders
      boulders.forEach((boulder) => {
        const dx = player.position[0] - boulder.position[0];
        const dy = player.position[1] - boulder.position[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (
          distance <
          boulder.radius + this.explosionSettings.collision_radius
        ) {
          gameState.lives -= 1;
          gameState.score = Math.max(
            0,
            gameState.score - this.explosionSettings.collision_penalty
          );
          if (gameState.lives <= 0) {
            gameState.state = "End";
          }
        }
      });
    }

    createFragments(boulder, count, size) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = [
          Math.cos(angle) * this.explosionSettings.fragment_velocity,
          Math.sin(angle) * this.explosionSettings.fragment_velocity,
          0
        ];
        const fragment = {
          id: `fragment${Date.now()}${i}`,
          generator: "generateBoulder",
          generator_args: [size],
          position: [...boulder.position],
          velocity: velocity,
          radius: size
        };
        entities.set(fragment.id, fragment);
      }
    }
  }

  deps.register("GameLoop", new GameLoop(), 5);

  return explosionSettings;
}


function _33(gameState){return(
gameState
)}

function _34(entities){return(
entities
)}

function _CleanupSystem(deps,entities)
{
  ({
    prompt:
      "Add a system to remove transforms that are not attached to an entities in the view",
    time: 1700511337309,
    comment:
      "Create a system to remove transforms that are not attached to an entities in the view"
  });

  class CleanupSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.game_view = deps.resolve("game_view");
    }

    tick() {
      const transforms = this.game_view.querySelectorAll("svg g[id]");
      transforms.forEach((transform) => {
        const id = transform.getAttribute("id");
        if (!entities.has(id)) {
          transform.remove();
        }
      });
    }
  }

  deps.register("CleanupSystem", new CleanupSystem(), 1);
}


function _36(entities){return(
entities
)}

function _BoulderGenerationSystem(deps,entities,gameState)
{
  ({
    prompt:
      "Add a system that generates new boulders when all are gone. Incrementing the level in gamestate and generating a number of boulders equal to the level count + 2",
    time: 1700511473544,
    comment: "Create a system to generate new boulders when all are gone"
  });

  class BoulderGenerationSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.boulderGenerator = deps.resolve("generateBoulder");
      this.boulderSize = 0.2; // Default boulder size
    }

    tick() {
      const boulders = Array.from(entities.values()).filter(
        (e) => e.generator === "generateBoulder"
      );
      if (boulders.length === 0 && gameState.state === "Running") {
        gameState.level = (gameState.level || 0) + 1;
        this.generateBoulders(gameState.level + 2);
      }
    }

    generateBoulders(count) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = [
          Math.cos(angle) * 0.0001,
          Math.sin(angle) * 0.0001,
          0
        ];
        const boulder = {
          id: `boulder${Date.now()}${i}`,
          generator: "generateBoulder",
          generator_args: [this.boulderSize],
          position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
          velocity: velocity,
          radius: this.boulderSize
        };
        entities.set(boulder.id, boulder);
      }
    }
  }

  deps.register("BoulderGenerationSystem", new BoulderGenerationSystem(), 1);
}


function _GameOverSystem(deps,gameState,localStorage,entities,game_view)
{
  ({
    prompt:
      "Add a system that when lives is 0, the top score is recorded and the player ship is removed",
    time: 1700511760135,
    comment:
      "Create a system to handle game over, record top score, and remove player ship"
  });

  class GameOverSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      if (gameState.lives <= 0) {
        gameState.state = "Game Over";

        // Record top score
        const topScore = localStorage.getItem("topScore") || 0;
        if (gameState.score > topScore) {
          localStorage.setItem("topScore", gameState.score);
        }

        // Remove player ship
        entities.delete("player");
        const playerElement = game_view.querySelector("#player");
        if (playerElement) playerElement.remove();
      }
    }
  }

  deps.register("GameOverSystem", new GameOverSystem(), 1);
}


function _LifeLostSystem(deps,entities,gameState)
{
  ({
    prompt:
      "Add a system that when a life is lost, the player is teleported to a blank area of the screen",
    time: 1700511874407,
    comment:
      "Create a system to teleport player to a clear area when a life is lost"
  });

  class LifeLostSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const player = entities.get("player");
      if (gameState.lives < this.previous_lives) {
        player.position = this.findClearArea();
        player.velocity = [0, 0, 0];
      }
      this.previous_lives = gameState.lives;
    }

    isAreaClear(position) {
      return !Array.from(entities.values()).some((entity) => {
        if (entity.generator !== "generateBoulder") return false;
        const dx = position[0] - entity.position[0];
        const dy = position[1] - entity.position[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < entity.radius + 0.2; // Consider a 0.1 buffer zone
      });
    }

    findClearArea() {
      for (let i = 0; i < 100; i++) {
        // Limit search iterations
        const position = [Math.random() * 2 - 1, Math.random() * 2 - 1, 0];
        if (this.isAreaClear(position)) {
          return position;
        }
      }
      return [0, 0, 0]; // Fallback to center
    }
  }

  deps.register("LifeLostSystem", new LifeLostSystem(), 1);
}


function _enemy_ship_template(view,Inputs,htl,assets)
{
  ({
    prompt:
      "Create an enemy ship template. Should look like a saucer, add a UI to control its visual parameters, include a preview in the UI",
    time: 1700592892167,
    comment:
      "Create an enemy ship template with UI controls for visual parameters and a preview"
  });

  const enemyShipSettings = view`<div>
    <h2>Enemy Ship Settings</h2>
    ${["width", Inputs.range([0.1, 2], { value: 0.5, label: "Width" })]}
    ${["height", Inputs.range([0.05, 1], { value: 0.2, label: "Height" })]}
    ${["color", Inputs.color({ value: "#ff1f1f", label: "Color" })]}
    ${[
      "stroke_width",
      Inputs.range([0, 0.05], { value: 0.01, label: "Stroke width" })
    ]}
    ${[
      "stroke_color",
      Inputs.color({ value: "#000000", label: "Stroke color" })
    ]}
  </div>`;

  const updateEnemyShipTemplate = () => {
    const settings = enemyShipSettings.value;
    const enemyShip = htl.svg`<ellipse cx="0" cy="0" rx="${
      settings.width / 2
    }" ry="${settings.height / 2}" fill="${settings.color}" stroke="${
      settings.stroke_color
    }" stroke-width="${settings.stroke_width}" />`;
    assets.set("enemyShip", enemyShip);
  };

  // Preview enemy ship template
  const preview = htl.svg`<svg width="100" height="100" viewBox="-0.5 -0.5 1 1">
    ${updateEnemyShipTemplate()}
  </svg>`;

  enemyShipSettings.addEventListener("input", () => {
    updateEnemyShipTemplate();
    preview.replaceChild(assets.get("enemyShip"), preview.firstChild);
  });

  return htl.html`${enemyShipSettings}${preview}`;
}


function _enemy_ship_template_v2($0,view,Inputs,htl,assets)
{
  ({
    prompt:
      "The enemy ship needs some extra details like another controllable elipse and a rectangular middle, all parameterized",
    time: 1700593046162,
    comment: "Update enemy ship template with additional parameterized details"
  });

  $0;
  const enemyShipSettings = view`<div>
    <h2>Enemy Ship Settings</h2>
    ${["width", Inputs.range([0.1, 2], { value: 0.5, label: "Width" })]}
    ${["height", Inputs.range([0.05, 1], { value: 0.2, label: "Height" })]}
    ${["color", Inputs.color({ value: "#ff1f1f", label: "Color" })]}
    ${[
      "stroke_width",
      Inputs.range([0, 0.05], { value: 0.01, label: "Stroke width" })
    ]}
    ${[
      "stroke_color",
      Inputs.color({ value: "#000000", label: "Stroke color" })
    ]}
    ${[
      "detail_width",
      Inputs.range([0, 0.3], { value: 0.25, label: "Detail width" })
    ]}
    ${[
      "detail_height",
      Inputs.range([0, 0.1], { value: 0.07, label: "Detail height" })
    ]}
    ${[
      "detail_color",
      Inputs.color({ value: "#ffffff", label: "Detail color" })
    ]}
  </div>`;

  const updateEnemyShipTemplate = () => {
    const settings = enemyShipSettings.value;
    const enemyShip = htl.svg`<ellipse cx="0" cy="0" rx="${
      settings.width / 2
    }" ry="${settings.height / 2}" fill="${settings.color}" stroke="${
      settings.stroke_color
    }" stroke-width="${settings.stroke_width}" />
      <rect x="${-settings.detail_width / 2}" y="${
      -settings.detail_height / 2
    }" width="${settings.detail_width}" height="${
      settings.detail_height
    }" fill="${settings.detail_color}" />
      <ellipse cx="0" cy="0" rx="${settings.detail_width / 2}" ry="${
      settings.detail_height / 2
    }" fill="${settings.detail_color}" />`;
    assets.set("enemyShip", enemyShip);
    return enemyShip;
  };

  // Preview enemy ship template
  const preview = htl.svg`<svg width="100" height="100" viewBox="-0.5 -0.5 1 1">${updateEnemyShipTemplate()}</svg>`;

  enemyShipSettings.addEventListener("input", () => {
    updateEnemyShipTemplate();
    preview.replaceChild(assets.get("enemyShip"), preview.firstChild);
  });

  return htl.html`${enemyShipSettings}${preview}`;
}


function _enemy_ship_template_v3($0,view,Inputs,htl,assets)
{
  ({
    prompt:
      "Instead of the center rectangle lets do another elipse. Also can we do the preview on a black background",
    time: 1700593783862,
    comment:
      "Update enemy ship template with another ellipse and preview on black background"
  });

  $0;

  const enemyShipSettings = view`<div>
    <h2>Enemy Ship Settings</h2>
    ${["width", Inputs.range([0.1, 2], { value: 0.5, label: "Width" })]}
    ${["height", Inputs.range([0.05, 1], { value: 0.1, label: "Height" })]}
    ${["color", Inputs.color({ value: "#000000", label: "Color" })]}
    ${[
      "stroke_width",
      Inputs.range([0, 0.05], { value: 0.01, label: "Stroke width" })
    ]}
    ${[
      "stroke_color",
      Inputs.color({ value: "#ffee2e", label: "Stroke color" })
    ]}
    ${[
      "center_ellipse_width",
      Inputs.range([0, 1], { value: 0.15, label: "Center ellipse width" })
    ]}
    ${[
      "center_ellipse_height",
      Inputs.range([0, 1], { value: 0.2, label: "Center ellipse height" })
    ]}
  </div>`;

  const updateEnemyShipTemplate = () => {
    const settings = enemyShipSettings.value;
    const enemyShip = htl.svg`<ellipse cx="0" cy="0" rx="${
      settings.width / 2
    }" ry="${settings.height / 2}" fill="${settings.color}" stroke="${
      settings.stroke_color
    }" stroke-width="${settings.stroke_width}" />
      <ellipse cx="0" cy="0" stroke="${settings.stroke_color}" stroke-width="${
      settings.stroke_width
    }" rx="${settings.center_ellipse_width / 2}" ry="${
      settings.center_ellipse_height / 2
    }" fill="${settings.color}" />`;
    assets.set("enemyShip", enemyShip);
    return enemyShip;
  };

  // Preview enemy ship template
  const preview = htl.svg`<svg width="100" height="100" viewBox="-0.5 -0.5 1 1" style="background: black;">${updateEnemyShipTemplate()}</svg>`;

  enemyShipSettings.addEventListener("input", () => {
    updateEnemyShipTemplate();
    preview.replaceChild(assets.get("enemyShip"), preview.firstChild);
  });

  return htl.html`${enemyShipSettings}${preview}`;
}


function _enemy_ship_template_v4($0,view,Inputs,htl,assets)
{
  ({
    prompt:
      "OK I like the latest ship, can we make the center elipse spin around 360 with an SVG animation. Do not add or remove controls, or change values, other than than add spin speed UI",
    time: 1700598322777,
    comment:
      "Add spin speed UI and implement SVG animation for the center ellipse of the enemy ship"
  });
  $0;
  const enemyShipSettings = view`<div>
    <h2>Enemy Ship Settings</h2>
    ${["scale", Inputs.range([0.05, 5], { value: 0.75, label: "Scale" })]}
    ${["width", Inputs.range([0.1, 2], { value: 0.5, label: "Width" })]}
    ${["height", Inputs.range([0.05, 1], { value: 0.1, label: "Height" })]}
    ${["color", Inputs.color({ value: "#000000", label: "Color" })]}
    ${[
      "stroke_width",
      Inputs.range([0, 0.05], { value: 0.018, label: "Stroke width" })
    ]}
    ${[
      "stroke_color",
      Inputs.color({ value: "#46ff2e", label: "Stroke color" })
    ]}
    ${[
      "center_ellipse_width",
      Inputs.range([0, 1], { value: 0.15, label: "Center ellipse width" })
    ]}
    ${[
      "center_ellipse_height",
      Inputs.range([0, 1], { value: 0.2, label: "Center ellipse height" })
    ]}
    ${[
      "spin_speed",
      Inputs.range([0, 10000], {
        value: 400,
        step: 100,
        label: "Spin speed (ms for full rotation)"
      })
    ]}
  </div>`;

  const updateEnemyShipTemplate = () => {
    const settings = enemyShipSettings.value;
    const centerEllipse = htl.svg`<ellipse cx="0" cy="0" stroke="${
      settings.stroke_color
    }" stroke-width="${settings.stroke_width * settings.scale}" rx="${
      (settings.center_ellipse_width / 2) * settings.scale
    }" ry="${(settings.center_ellipse_height * settings.scale) / 2}" fill="${
      settings.color
    }">
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="${
        settings.spin_speed
      }ms" repeatCount="indefinite"/>
    </ellipse>`;
    const enemyShip = htl.svg`<ellipse cx="0" cy="0" rx="${
      (settings.width / 2) * settings.scale
    }" ry="${(settings.height / 2) * settings.scale}" fill="${
      settings.color
    }" stroke="${settings.stroke_color}" stroke-width="${
      settings.stroke_width * settings.scale
    }" />
      ${centerEllipse}`;
    assets.set("enemyShip", enemyShip);
    return enemyShip;
  };

  // Preview enemy ship template
  const preview = htl.svg`<svg width="100" height="100" viewBox="-0.4 -0.4 .8 .8" style="background: black;">${updateEnemyShipTemplate()}</svg>`;

  enemyShipSettings.addEventListener("input", () => {
    updateEnemyShipTemplate();
    preview.replaceChild(assets.get("enemyShip"), preview.firstChild);
  });

  return htl.html`${enemyShipSettings}${preview}`;
}


function _EnemyShipSystem($0,deps,gameState,entities)
{
  ({
    prompt:
      "randomly with low probability, if the game is running, add an enemy ship on the left or right side, with a fixed x velocity  towards the center. Every tick, with low probability adjust any ships y velocities, so the ships tend to zig zag across the screen. Destroy the enemy ship when it reaches the other side.",
    time: 1700598762370,
    comment:
      "Create a system to manage enemy ship spawning, movement, and destruction"
  });

  $0;

  class EnemyShipSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.xVelocity = 0.002; // Fixed x velocity towards the center
    }

    tick() {
      const gameRunning = gameState.state === "Running";
      if (gameRunning && Math.random() < 0.01) {
        // Spawn an enemy ship with low probability
        this.spawnEnemyShip();
      }

      for (let [id, ship] of entities.entries()) {
        if (ship.template !== "enemyShip") continue;
        if (Math.random() < 0.1) {
          // Adjust y velocity with low probability
          ship.velocity[1] += (Math.random() - 0.5) * 0.001;
        }

        if (Math.abs(ship.position[0]) > 0.95) {
          // Destroy enemy ship when it reaches the other side
          entities.delete(ship.id);
        }
      }
    }

    spawnEnemyShip() {
      const side = Math.random() < 0.5 ? -0.9 : 0.9; // Randomly choose left or right side
      const enemyShip = {
        template: "enemyShip",
        position: [side, Math.random() * 2 - 1, 0],
        velocity: [this.xVelocity * -side, 0, 0] // Move towards center
      };
      entities.set(`enemy${Date.now()}`, enemyShip);
    }
  }

  deps.register("EnemyShipSystem", new EnemyShipSystem(), 1);
}


function _EnemyShipSystem_v2(view,Inputs,deps,gameState,entities)
{
  ({
    prompt:
      "Add a UI to the enemy spawning system, e.g. spawn rate, x velocity, y adjust probability, y velocity adjust magnitude etc. Keep the logic identical",
    time: 1700685553019,
    comment:
      "Add UI for the enemy ship spawning system and keep the logic identical"
  });

  const enemyShipSpawningSettings = view`<div>
    <h2>Enemy Ship Spawning Settings</h2>
    ${[
      "spawn_probability",
      Inputs.range([0, 0.02], {
        value: 0.001,
        step: 0.001,
        label: "Spawn probability per tick"
      })
    ]}
    ${[
      "x_velocity",
      Inputs.range([0, 0.01], {
        value: 0.002,
        step: 0.0001,
        label: "X velocity towards center"
      })
    ]}
    ${[
      "y_adjust_probability",
      Inputs.range([0, 0.2], {
        value: 0.1,
        step: 0.01,
        label: "Y velocity adjust probability per tick"
      })
    ]}
    ${[
      "y_velocity_adjust",
      Inputs.range([0, 0.002], {
        value: 0.001,
        step: 0.0001,
        label: "Y velocity adjust magnitude"
      })
    ]}
  </div>`;

  class EnemyShipSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.spawningSettings = enemyShipSpawningSettings.value;
    }

    tick() {
      const gameRunning = gameState.state === "Running";
      if (
        gameRunning &&
        Math.random() < this.spawningSettings.spawn_probability
      ) {
        // Spawn an enemy ship with low probability
        this.spawnEnemyShip();
      }

      for (let [id, ship] of entities.entries()) {
        if (ship.template !== "enemyShip") continue;
        if (!ship.position) {
          continue;
        }
        if (Math.random() < this.spawningSettings.y_adjust_probability) {
          // Adjust y velocity with low probability
          ship.velocity[1] +=
            (Math.random() - 0.5) * this.spawningSettings.y_velocity_adjust;
        }
        if (ship.position && Math.abs(ship.position[0]) > 0.95) {
          // Destroy enemy ship when it reaches the other side
          entities.delete(id);
        }
      }
    }

    spawnEnemyShip() {
      const side = Math.random() < 0.5 ? -0.9 : 0.9; // Randomly choose left or right side
      const id = `enemy${Date.now()}`;
      const enemyShip = {
        id,
        template: "enemyShip",
        position: [side, Math.random() * 2 - 1, 0],
        velocity: [this.spawningSettings.x_velocity * -side, 0, 0] // Move towards center
      };
      entities.set(id, enemyShip);
    }
  }

  deps.register("EnemyShipSystem", new EnemyShipSystem(), 2);

  return enemyShipSpawningSettings;
}


function _46(entities){return(
entities
)}

function _game_view(deps){return(
deps.resolve("game_view")
)}

function _EnemyLazerSystem(view,Inputs,deps,entities)
{
  ({
    prompt:
      "Add a system with UI that spawns enemy lazers from enemy ships randomly with some probability",
    time: 1700725096036,
    comment:
      "Add system with UI that spawns enemy lazers from enemy ships randomly"
  });

  const enemyLazerSettings = view`<div>
    <h2>Enemy Lazer Settings</h2>
    ${[
      "lazer_probability",
      Inputs.range([0, 0.1], {
        value: 0.01,
        step: 0.001,
        label: "Lazer spawn probability per tick"
      })
    ]}
    ${[
      "lazer_speed",
      Inputs.range([0, 0.01], {
        value: 0.005,
        step: 0.001,
        label: "Lazer speed"
      })
    ]}
    ${[
      "lazer_ttl",
      Inputs.range([0, 300], {
        value: 100,
        step: 10,
        label: "Lazer time-to-live"
      })
    ]}
  </div>`;

  class EnemyLazerSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.lazerSettings = enemyLazerSettings.value;
    }

    tick() {
      const enemyShips = Array.from(entities.values()).filter(
        (e) => e.template === "enemyShip"
      );
      enemyShips.forEach((ship) => {
        if (Math.random() < this.lazerSettings.lazer_probability) {
          this.spawnLazer(ship);
        }
      });
    }

    spawnLazer(ship) {
      const angle = Math.PI * 2 * Math.random();
      const lazer = {
        template: "enemyLazer",
        position: [ship.position[0], ship.position[1], angle],
        velocity: [
          Math.sin(angle) * this.lazerSettings.lazer_speed,
          Math.cos(angle) * this.lazerSettings.lazer_speed,
          0
        ],
        ttl: this.lazerSettings.lazer_ttl
      };
      entities.set(`lazer${Date.now()}`, lazer);
    }
  }

  deps.register("EnemyLazerSystem", new EnemyLazerSystem(), 1);

  return enemyLazerSettings;
}


function _enemyLazer_template(view,Inputs,htl,assets)
{
  ({
    prompt:
      "create an enemyLazer template, add a UI for its visual parameters ",
    time: 1700850741421,
    comment: "Create enemyLazer template with UI for visual parameters"
  });

  const enemyLazerSettings = view`<div>
    <h2>Enemy Lazer Settings</h2>
    ${[
      "length",
      Inputs.range([0.01, 0.2], {
        value: 0.1,
        label: "Lazer length"
      })
    ]}
    ${[
      "width",
      Inputs.range([0.001, 0.01], {
        value: 0.003,
        label: "Lazer width"
      })
    ]}
    ${[
      "color",
      Inputs.color({
        value: "#ff0000",
        label: "Lazer color"
      })
    ]}
  </div>`;

  const updateEnemyLazerTemplate = () => {
    const settings = enemyLazerSettings.value;
    const enemyLazer = htl.svg`<line x1="0" y1="0" x2="0" y2="${settings.length}" style="stroke:${settings.color};stroke-width:${settings.width}" />`;
    assets.set("enemyLazer", enemyLazer);
  };

  // Update lazer template when settings change
  enemyLazerSettings.addEventListener("input", updateEnemyLazerTemplate);
  updateEnemyLazerTemplate(); // Initialize template

  return enemyLazerSettings;
}


function _PlayerBulletHitSystem(deps,entities)
{
  ({
    prompt:
      "Add a system for checking when a player bullet overlaps an enemy ship the ship should be destroyed.",
    time: 1700904556802,
    comment: "Create a system to check when a player bullet hits an enemy ship"
  });

  class PlayerBulletHitSystem extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const playerBullets = Array.from(entities.values()).filter(
        (e) => e.template === "projectile"
      );
      const enemyShips = Array.from(entities.values()).filter(
        (e) => e.template === "enemyShip"
      );

      playerBullets.forEach((bullet) => {
        enemyShips.forEach((ship) => {
          if (this.checkOverlap(bullet, ship)) {
            debugger;
            // Destroy enemy ship on hit
            entities.delete(ship.id);
          }
        });
      });
    }

    checkOverlap(bullet, ship) {
      const dx = bullet.position[0] - ship.position[0];
      const dy = bullet.position[1] - ship.position[1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Assume small radius for bullet and enemy ship for simplicity
      return distance < 0.1;
    }
  }

  deps.register("PlayerBulletHitSystem", new PlayerBulletHitSystem(), 1);
}


function _startGameButton_v2(view,game_view,gameState,entities){return(
{
  prompt:
    "That game button freezes everything. Lets' make the button massive too using a cool retro system font.\nyou will need to manually add the player and astroids.",
  time: 1700413206526,
  comment:
    "Create a bigger start game button with retro font and manually add player and asteroids"
} &&
  view`<div style="text-align: center; margin-top: 20px;">
  <button style="
      padding: 10px 20px;
      font-size: 2em;
      background-color: #333;
      color: white;
      border: none;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive;
    "
    onclick=${() => {
      game_view.textContent = ""; // reset view
      // Reset game state
      gameState.lives = 3;
      gameState.score = 0;
      gameState.level = 0;
      gameState.state = "Running";

      // Clear all entities
      entities.clear();

      // draw background first
      entities.set("background", {
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        force: [0, 0, 0],
        template: "background"
      });

      entities.set("score", {
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        force: [0, 0, 0],
        template: "score"
      });

      entities.set("lives", {
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        force: [0, 0, 0],
        template: "lives"
      });

      // Add player entity
      const player = {
        id: "player",
        template: "ship",
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        force: [0, 0, 0]
      };
      entities.set(player.id, player);

      // Add initial boulders
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const velocity = [
          Math.cos(angle) * 0.0001,
          Math.sin(angle) * 0.0001,
          0
        ];
        const boulder = {
          id: `boulder${i}`,
          generator: "generateBoulder",
          generator_args: [0.2],
          radius: 0.2,
          position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
          velocity: velocity
        };
        entities.set(boulder.id, boulder);
      }
      document.activeElement.blur();
    }}
  >Start Game</button>
</div>`
)}

function _52($0){return(
$0
)}

function _53(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _54($0){return(
$0
)}

function _55(md){return(
md`## Current Chat context`
)}

function _56($0){return(
$0
)}

function _57(md){return(
md`tick the cells to include in the next prompt`
)}

function _58($0){return(
$0
)}

function _59(feedback_prompt){return(
feedback_prompt
)}

function _60(md){return(
md`### AI Settings`
)}

function _61($0){return(
$0
)}

function _62($0){return(
$0
)}

function _63($0){return(
$0
)}

function _64(md){return(
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
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer("viewof bindableUISkill")).define("viewof bindableUISkill", ["view","md","Inputs","htl","Event"], _bindableUISkill);
  main.variable(observer("bindableUISkill")).define("bindableUISkill", ["Generators", "viewof bindableUISkill"], (G, _) => G.input(_));
  main.variable(observer("entities")).define("entities", _entities);
  main.variable(observer("gameState")).define("gameState", _gameState);
  main.variable(observer("keysPressed")).define("keysPressed", ["invalidation"], _keysPressed);
  main.variable(observer("assets")).define("assets", ["deps"], _assets);
  main.variable(observer("caller_id")).define("caller_id", _caller_id);
  main.variable(observer("viewof deps")).define("viewof deps", ["Inputs","caller_id","Event"], _deps);
  main.variable(observer("deps")).define("deps", ["Generators", "viewof deps"], (G, _) => G.input(_));
  main.variable(observer()).define(["deps"], _11);
  main.variable(observer("ticker_v1")).define("ticker_v1", ["deps","invalidation"], _ticker_v1);
  main.variable(observer("assets_v1")).define("assets_v1", ["deps"], _assets_v1);
  main.variable(observer("player_entity")).define("player_entity", ["entities"], _player_entity);
  main.variable(observer("PhysicsSystem_v2")).define("PhysicsSystem_v2", ["deps","entities"], _PhysicsSystem_v2);
  main.variable(observer("RendererSystem_v3")).define("RendererSystem_v3", ["deps","entities","htl"], _RendererSystem_v3);
  main.variable(observer("WorldWrap")).define("WorldWrap", ["deps","entities","game_view"], _WorldWrap);
  main.variable(observer("projectile_asset")).define("projectile_asset", ["htl","assets"], _projectile_asset);
  main.variable(observer("boulder_template")).define("boulder_template", ["htl","assets"], _boulder_template);
  main.variable(observer("small_boulder_template")).define("small_boulder_template", ["htl","assets"], _small_boulder_template);
  main.variable(observer("viewof GameLoop_v4")).define("viewof GameLoop_v4", ["view","Inputs","deps","entities","game_view","gameState"], _GameLoop_v4);
  main.variable(observer("GameLoop_v4")).define("GameLoop_v4", ["Generators", "viewof GameLoop_v4"], (G, _) => G.input(_));
  main.variable(observer("viewof PlayerControl_v6")).define("viewof PlayerControl_v6", ["view","Inputs","deps","entities","keysPressed"], _PlayerControl_v6);
  main.variable(observer("PlayerControl_v6")).define("PlayerControl_v6", ["Generators", "viewof PlayerControl_v6"], (G, _) => G.input(_));
  main.variable(observer("viewof game_view_v2")).define("viewof game_view_v2", ["view","Inputs","htl","deps"], _game_view_v2);
  main.variable(observer("game_view_v2")).define("game_view_v2", ["Generators", "viewof game_view_v2"], (G, _) => G.input(_));
  main.variable(observer("RendererSystem_v4")).define("RendererSystem_v4", ["deps","entities","htl"], _RendererSystem_v4);
  main.variable(observer("viewof ship_template_v3")).define("viewof ship_template_v3", ["view","Inputs","htl","assets"], _ship_template_v3);
  main.variable(observer("ship_template_v3")).define("ship_template_v3", ["Generators", "viewof ship_template_v3"], (G, _) => G.input(_));
  main.variable(observer("viewof background_template")).define("viewof background_template", ["view","Inputs","htl","assets"], _background_template);
  main.variable(observer("background_template")).define("background_template", ["Generators", "viewof background_template"], (G, _) => G.input(_));
  main.variable(observer("viewof score_template")).define("viewof score_template", ["view","Inputs","htl","assets"], _score_template);
  main.variable(observer("score_template")).define("score_template", ["Generators", "viewof score_template"], (G, _) => G.input(_));
  main.variable(observer("viewof lives_template")).define("viewof lives_template", ["view","Inputs","htl","assets"], _lives_template);
  main.variable(observer("lives_template")).define("lives_template", ["Generators", "viewof lives_template"], (G, _) => G.input(_));
  main.variable(observer("HUDSystem")).define("HUDSystem", ["deps","game_view","gameState"], _HUDSystem);
  main.variable(observer("viewof boulder_generator_v1")).define("viewof boulder_generator_v1", ["view","Inputs","htl","deps"], _boulder_generator_v1);
  main.variable(observer("boulder_generator_v1")).define("boulder_generator_v1", ["Generators", "viewof boulder_generator_v1"], (G, _) => G.input(_));
  main.variable(observer("RendererSystem_v5")).define("RendererSystem_v5", ["deps","entities","htl"], _RendererSystem_v5);
  main.variable(observer("viewof GameLoop_v5")).define("viewof GameLoop_v5", ["view","Inputs","deps","entities","gameState"], _GameLoop_v5);
  main.variable(observer("GameLoop_v5")).define("GameLoop_v5", ["Generators", "viewof GameLoop_v5"], (G, _) => G.input(_));
  main.variable(observer()).define(["gameState"], _33);
  main.variable(observer()).define(["entities"], _34);
  main.variable(observer("CleanupSystem")).define("CleanupSystem", ["deps","entities"], _CleanupSystem);
  main.variable(observer()).define(["entities"], _36);
  main.variable(observer("BoulderGenerationSystem")).define("BoulderGenerationSystem", ["deps","entities","gameState"], _BoulderGenerationSystem);
  main.variable(observer("GameOverSystem")).define("GameOverSystem", ["deps","gameState","localStorage","entities","game_view"], _GameOverSystem);
  main.variable(observer("LifeLostSystem")).define("LifeLostSystem", ["deps","entities","gameState"], _LifeLostSystem);
  main.variable(observer("viewof enemy_ship_template")).define("viewof enemy_ship_template", ["view","Inputs","htl","assets"], _enemy_ship_template);
  main.variable(observer("enemy_ship_template")).define("enemy_ship_template", ["Generators", "viewof enemy_ship_template"], (G, _) => G.input(_));
  main.variable(observer("viewof enemy_ship_template_v2")).define("viewof enemy_ship_template_v2", ["viewof enemy_ship_template","view","Inputs","htl","assets"], _enemy_ship_template_v2);
  main.variable(observer("enemy_ship_template_v2")).define("enemy_ship_template_v2", ["Generators", "viewof enemy_ship_template_v2"], (G, _) => G.input(_));
  main.variable(observer("viewof enemy_ship_template_v3")).define("viewof enemy_ship_template_v3", ["viewof enemy_ship_template_v2","view","Inputs","htl","assets"], _enemy_ship_template_v3);
  main.variable(observer("enemy_ship_template_v3")).define("enemy_ship_template_v3", ["Generators", "viewof enemy_ship_template_v3"], (G, _) => G.input(_));
  main.variable(observer("viewof enemy_ship_template_v4")).define("viewof enemy_ship_template_v4", ["viewof enemy_ship_template_v3","view","Inputs","htl","assets"], _enemy_ship_template_v4);
  main.variable(observer("enemy_ship_template_v4")).define("enemy_ship_template_v4", ["Generators", "viewof enemy_ship_template_v4"], (G, _) => G.input(_));
  main.variable(observer("EnemyShipSystem")).define("EnemyShipSystem", ["viewof enemy_ship_template_v4","deps","gameState","entities"], _EnemyShipSystem);
  main.variable(observer("viewof EnemyShipSystem_v2")).define("viewof EnemyShipSystem_v2", ["view","Inputs","deps","gameState","entities"], _EnemyShipSystem_v2);
  main.variable(observer("EnemyShipSystem_v2")).define("EnemyShipSystem_v2", ["Generators", "viewof EnemyShipSystem_v2"], (G, _) => G.input(_));
  main.variable(observer()).define(["entities"], _46);
  main.variable(observer("game_view")).define("game_view", ["deps"], _game_view);
  main.variable(observer("viewof EnemyLazerSystem")).define("viewof EnemyLazerSystem", ["view","Inputs","deps","entities"], _EnemyLazerSystem);
  main.variable(observer("EnemyLazerSystem")).define("EnemyLazerSystem", ["Generators", "viewof EnemyLazerSystem"], (G, _) => G.input(_));
  main.variable(observer("viewof enemyLazer_template")).define("viewof enemyLazer_template", ["view","Inputs","htl","assets"], _enemyLazer_template);
  main.variable(observer("enemyLazer_template")).define("enemyLazer_template", ["Generators", "viewof enemyLazer_template"], (G, _) => G.input(_));
  main.variable(observer("PlayerBulletHitSystem")).define("PlayerBulletHitSystem", ["deps","entities"], _PlayerBulletHitSystem);
  main.variable(observer("viewof startGameButton_v2")).define("viewof startGameButton_v2", ["view","game_view","gameState","entities"], _startGameButton_v2);
  main.variable(observer("startGameButton_v2")).define("startGameButton_v2", ["Generators", "viewof startGameButton_v2"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof prompt"], _52);
  main.variable(observer()).define(["Inputs","suggestion"], _53);
  main.variable(observer()).define(["viewof suggestion"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["viewof context_viz"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _58);
  main.variable(observer()).define(["feedback_prompt"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _61);
  main.variable(observer()).define(["viewof api_endpoint"], _62);
  main.variable(observer()).define(["viewof settings"], _63);
  main.variable(observer()).define(["md"], _64);
  const child2 = runtime.module(define2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("update_context", child2);
  main.import("on_prompt", child2);
  main.import("api_call_response", child2);
  main.import("mutable context", child2);
  main.import("context", child2);
  main.import("viewof prompt", child2);
  main.import("prompt", child2);
  main.import("viewof suggestion", child2);
  main.import("suggestion", child2);
  main.import("viewof settings", child2);
  main.import("settings", child2);
  main.import("viewof OPENAI_API_KEY", child2);
  main.import("OPENAI_API_KEY", child2);
  main.import("viewof api_endpoint", child2);
  main.import("api_endpoint", child2);
  main.import("feedback_prompt", child2);
  main.import("viewof feedback_cells_selector", child2);
  main.import("feedback_cells_selector", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer("workers")).define("workers", ["update_context","on_prompt","api_call_response"], _workers);
  return main;
}
