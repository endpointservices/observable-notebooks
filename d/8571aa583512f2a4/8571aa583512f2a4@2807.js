import define1 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# Make a Game Part II - Pixels on a Screen


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

function _entities(){return(
{
  prompt: "Create the entity state as a map of objects",
  time: 1699829601388,
  comment: "Initialize an empty Map to hold the entity state"
} && new Map()
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


function _6(deps){return(
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


function _9(entities){return(
entities
)}

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

function _assets(deps){return(
deps.resolve("Assets")
)}

function _ship_template(htl,assets)
{
  ({
    prompt:
      'Now a simple arrow type spaceship as an SVG template called "ship"',
    time: 1699948585506,
    comment: "Create an SVG template of a simple arrow type spaceship"
  });

  // The template is a polygon
  const ship = htl.svg`<polygon points="0.1,-.1 0,.1 -.1,-.1" style="fill:lime;stroke:purple;stroke-width:0.01" />`;
  assets.set("ship", ship);
  return htl.svg`<svg id="ship" width="20" height="20" viewBox="-0.1 -0.1 0.2 0.2">
    ${ship}
  </svg>`;
}


function _RendererSystem_v2(deps,entities,htl)
{
  ({
    prompt:
      "Now write a new RenderSystem the looks for the existence of a template parameter in the entity, and creates a SVG transform wrapping in the view, the transform is synced to the x,y",
    time: 1699948717023,
    comment: "New RendererSystem that uses templates for SVG elements"
  });
  class RendererSystem extends deps.resolve("BaseSystem") {
    constructor(...args) {
      super(...args);
      this.view = deps.resolve("view");
      this.assets = deps.resolve("Assets");
    }

    tick() {
      entities.forEach((entity) => {
        if (!entity.position) return;
        // Set attributes or create transform if needed
        let transform = this.view.querySelector(`#${entity.id}`);
        if (!transform) {
          const svgElement = this.assets.get(entity.template).cloneNode(true);
          transform = htl.svg`<g id=${entity.id}>${svgElement}</g>`;
          transform.appendChild(svgElement);
          this.view.appendChild(transform);
        }

        // Sync transform to entity's position
        transform.setAttribute(
          "transform",
          `translate(${entity.position[0]} ${entity.position[1]})`
        );
      });
    }
  }

  // Register RendererSystem under 'RendererSystem' with version 2
  return deps.register("RendererSystem", new RendererSystem(), 2);
}


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


function _PlayerControl(deps,entities,invalidation)
{
  ({
    prompt:
      "Add a PlayerControl manager that listen to arrow controls and applies a force to the player entity to drive it like asteroids",
    time: 1699989131985,
    comment:
      "PlayerControl manager to apply force to the player entity based on arrow key inputs"
  });

  return; // this is buggy and removed from execution
  class PlayerControl extends deps.resolve("BaseSystem") {
    constructor() {
      super();
      this.player = entities.get("player");
      this.setupControls();
    }

    setupControls() {
      const l = (event) => {
        switch (event.key) {
          case "ArrowUp":
            this.player.force[1] -= 0.0001;
            break;
          case "ArrowDown":
            this.player.force[1] += 0.0001;
            break;
          case "ArrowLeft":
            this.player.force[0] -= 0.0001;
            break;
          case "ArrowRight":
            this.player.force[0] += 0.0001;
            break;
        }
      };
      window.addEventListener("keydown", l);
      invalidation.then(() => window.removeEventListener("keydown", l));
    }
  }

  // Register PlayerControl under 'PlayerControl' with version 1
  return deps.register("PlayerControl", new PlayerControl(), 1);
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


function _PlayerControl_v2(deps,entities,keysPressed)
{
  ({
    prompt:
      "Update the keyboard control to use arrows to apply torque (3rd element of force) and forward thrust in the rotated direction. Keyboard controls when ticking should check if the various keys are depressed and if so apply the right action.",
    time: 1699989683848,
    comment:
      "Update PlayerControl to apply torque and forward thrust based on arrow key inputs"
  });

  class PlayerControl extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      this.player = entities.get("player");
      if (keysPressed["ArrowLeft"]) {
        this.player.force[2] -= 0.0001; // Apply torque to rotate left
      }
      if (keysPressed["ArrowRight"]) {
        this.player.force[2] += 0.0001; // Apply torque to rotate right
      }
      if (keysPressed["ArrowUp"]) {
        const rotation = this.player.position[2];
        // Apply forward thrust in the direction the player is facing
        this.player.force[0] += Math.cos(rotation) * 0.0001;
        this.player.force[1] += Math.sin(rotation) * 0.0001;
      }
      if (keysPressed["ArrowDown"]) {
        const rotation = this.player.position[2];
        // Apply forward thrust in the direction the player is facing
        this.player.force[0] -= Math.cos(rotation) * 0.0001;
        this.player.force[1] -= Math.sin(rotation) * 0.0001;
      }
    }
  }

  // Register updated PlayerControl under 'PlayerControl' with version 2
  return deps.register("PlayerControl", new PlayerControl(), 2);
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
      this.view = deps.resolve("view");
      this.assets = deps.resolve("Assets");
    }

    tick() {
      entities.forEach((entity) => {
        if (!entity.position) return;
        // Set attributes or create transform if needed
        let transform = this.view.querySelector(`#${entity.id}`);
        if (!transform) {
          const svgElement = this.assets.get(entity.template).cloneNode(true);
          transform = htl.svg`<g id=${entity.id}>${svgElement}</g>`;
          transform.appendChild(svgElement);
          this.view.appendChild(transform);
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


function _PlayerControl_v3(deps,entities,keysPressed)
{
  ({
    prompt:
      "The player should wrap if the leave the area, let's add that into the PlayerControls. Also we should stop the keyboard events from bubbling up because it causes scrolling",
    time: 1699990474727,
    comment:
      "Update PlayerControl to wrap player around edges and prevent default on key events"
  });

  class PlayerControl extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const player = entities.get("player");
      if (keysPressed["ArrowLeft"]) {
        player.force[2] -= 0.0001; // Apply torque to rotate left
      }
      if (keysPressed["ArrowRight"]) {
        player.force[2] += 0.0001; // Apply torque to rotate right
      }
      if (keysPressed["ArrowUp"]) {
        const rotation = player.position[2];
        // Apply forward thrust in the direction the player is facing
        player.force[0] += Math.cos(rotation) * 0.0001;
        player.force[1] += Math.sin(rotation) * 0.0001;
      }

      // Wrap player around the edges
      for (let i = 0; i < 2; i++) {
        if (player.position[i] < -1) player.position[i] = 1;
        if (player.position[i] > 1) player.position[i] = -1;
      }
    }
  }

  // Register updated PlayerControl under 'PlayerControl' with version 3
  return deps.register("PlayerControl", new PlayerControl(), 3);
}


function _ship_template_v2(ship_template,htl,assets)
{
  ({
    prompt:
      "pressing up arrow moves the ship to the right, but our drawing as the front pointing up. also its not very easy to tell which is the front. Can we make the ship more pointy, facing to the right. Lets put another two triangle on the back to represent little thrusters in a different color.",
    time: 1699991469222,
    comment:
      "Update the ship SVG template to be more pointy and facing to the right with thrusters"
  });
  ship_template; // make sure this updates after the other one
  // Updated ship template with a more pointy shape and thrusters
  const ship = htl.svg`<polygon points="0.3,0 0,0.2 0,-0.2" style="fill:lime" />
    <polygon points="-0.1, 0.05 0, 0.1 0,0" style="fill:orange" />
    <polygon points="-0.1,-0.05 0,-0.1 0,0" style="fill:orange" />`;

  assets.set("ship", ship);
  return htl.svg`<svg id="ship" width="40" height="40" viewBox="-0.3 -0.3 0.6 0.6">
    ${ship}
  </svg>`;
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


function _PlayerControl_v4(deps,entities,keysPressed)
{
  ({
    prompt:
      "When spacebar is pressed a bullet should be shot from the front of the ship. Give it a ttl value we will use to destroy it after some time",
    time: 1699992745139,
    comment: "Update PlayerControl to shoot a bullet when spacebar is pressed"
  });

  class PlayerControl extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const player = entities.get("player");
      if (keysPressed["ArrowLeft"]) {
        player.force[2] -= 0.0001; // Apply torque to rotate left
      }
      if (keysPressed["ArrowRight"]) {
        player.force[2] += 0.0001; // Apply torque to rotate right
      }
      if (keysPressed["ArrowUp"]) {
        const rotation = player.position[2];
        // Apply forward thrust in the direction the player is facing
        player.force[0] += Math.cos(rotation) * 0.0001;
        player.force[1] += Math.sin(rotation) * 0.0001;
      }

      // Shoot bullet when space is pressed
      if (keysPressed[" "]) {
        keysPressed[" "] = false;
        const rotation = player.position[2];
        const bulletVelocity = [
          Math.cos(rotation) * 0.001, // Higher velocity than ship
          Math.sin(rotation) * 0.001,
          0
        ];
        const projectile = {
          id: `b${entities.size}`,
          template: "projectile",
          position: [...player.position],
          velocity: bulletVelocity,
          ttl: 10 // 2 second time to live
        };
        entities.set(projectile.id, projectile);
      }

      // Wrap player around the edges
      for (let i = 0; i < 2; i++) {
        if (player.position[i] < -1) player.position[i] = 1;
        if (player.position[i] > 1) player.position[i] = -1;
      }
    }
  }

  // Register updated PlayerControl under 'PlayerControl' with version 4
  return deps.register("PlayerControl", new PlayerControl(), 4);
}


function _WorldWrap(deps,entities,view)
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
            const element = view.querySelector(`#${id}`);
            debugger;
            if (element) element.remove();
          }
        }
      });
    }
  }

  // Register WorldWrap system with version 1
  return deps.register("WorldWrap", new WorldWrap(), 1);
}


function _PlayerControl_v5(deps,entities,keysPressed)
{
  ({
    prompt:
      "Update the PlayerControls to remove the wrapping logic. The bullets also do not inherit the ships base velocity. I think rotation should not be force based but direct velocity",
    time: 1699993985397,
    comment:
      "Update PlayerControl to remove wrapping logic and change rotation to velocity based, bullets inherit velocity"
  });

  class PlayerControl extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const player = entities.get("player");
      if (keysPressed["ArrowLeft"]) {
        player.velocity[2] = -0.02; // Apply rotational velocity to rotate left
      }
      if (keysPressed["ArrowRight"]) {
        player.velocity[2] = 0.02; // Apply rotational velocity to rotate right
      }
      if (!keysPressed["ArrowRight"] && !keysPressed["ArrowLeft"]) {
        player.velocity[2] = 0;
      }
      if (keysPressed["ArrowUp"]) {
        const rotation = player.position[2];
        // Apply forward thrust in the direction the player is facing
        player.velocity[0] += Math.cos(rotation) * 0.0001;
        player.velocity[1] += Math.sin(rotation) * 0.0001;
      }
      if (keysPressed["ArrowDown"]) {
        const rotation = player.position[2];
        // Apply forward thrust in the direction the player is facing
        player.velocity[0] -= Math.cos(rotation) * 0.0001;
        player.velocity[1] -= Math.sin(rotation) * 0.0001;
      }

      // Shoot bullet when space is pressed
      if (keysPressed[" "]) {
        keysPressed[" "] = false;
        const rotation = player.position[2];
        const bulletVelocity = [
          Math.cos(rotation) * 0.0015 + player.velocity[0], // Inherit ship's velocity
          Math.sin(rotation) * 0.0015 + player.velocity[1],
          0
        ];
        const projectile = {
          id: `p${Date.now()}`,
          template: "projectile",
          position: [...player.position],
          velocity: bulletVelocity,
          ttl: 200 // Time to live in ticks
        };
        entities.set(projectile.id, projectile);
      }
    }
  }

  // Register updated PlayerControl under 'PlayerControl' with version 5
  return deps.register("PlayerControl", new PlayerControl(), 5);
}


function _29(entities){return(
entities
)}

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
  return htl.svg`<svg id="boulder" width="50" height="50" viewBox="-0.2 -0.2 0.4 0.4">
    ${boulder}
  </svg>`;
}


function _add_boulders(entities)
{
  ({
    prompt: "Add 2 boulders to the scene",
    time: 1700001810279,
    comment: "Add 2 boulders to the scene"
  });
  for (let i = 0; i < 2; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const velocity = [Math.cos(angle) * 0.0001, Math.sin(angle) * 0.0001, 0];
    const boulder = {
      id: `boulder${i}`,
      template: "boulder",
      position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
      velocity: [Math.random() * 0.01 - 0.005, Math.random() * 0.01 - 0.005, 0]
    };
    entities.set(boulder.id, boulder);
  }

  return Array.from(entities.values()).filter((e) =>
    e.id.startsWith("boulder")
  );
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


function _GameLoop(deps,entities,view)
{
  ({
    prompt:
      "Add a game loop, if a projectile hits a big bolder, split it into 3 smaller bolders that seperate a little randomly",
    time: 1700002138435,
    comment:
      "Game loop to handle projectile and boulder collisions and boulder splitting"
  });

  class GameLoop extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
      const projectiles = Array.from(entities.values()).filter(
        (e) => e.template === "projectile"
      );
      const boulders = Array.from(entities.values()).filter(
        (e) => e.template === "boulder"
      );

      projectiles.forEach((projectile) => {
        boulders.forEach((boulder) => {
          const dx = projectile.position[0] - boulder.position[0];
          const dy = projectile.position[1] - boulder.position[1];
          // Simple collision detection check
          if (dx * dx + dy * dy < 0.01) {
            // Collision detected, remove projectile and split boulder
            entities.delete(projectile.id);
            entities.delete(boulder.id);
            view.querySelector(`#${projectile.id}`).remove();
            view.querySelector(`#${boulder.id}`).remove();
            // Create 3 smaller boulders
            for (let i = 0; i < 3; i++) {
              const angle = Math.random() * 2 * Math.PI;
              const velocity = [
                Math.cos(angle) * 0.0002,
                Math.sin(angle) * 0.0002,
                0
              ];
              const smallBoulder = {
                id: `b${Date.now()}${i}`,
                template: "smallBoulder",
                position: [...boulder.position],
                velocity: velocity,
                scale: 0.5
              };
              entities.set(smallBoulder.id, smallBoulder);
            }
          }
        });
      });
    }
  }

  // Register GameLoop system with version 1
  return deps.register("GameLoop", new GameLoop(), 1);
}


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


function _GameLoop_v2(deps,entities,view,gameState)
{
  ({
    prompt:
      'Make a better game loop. Big boulders when hit should split into smaller boulders, smaller bolders should die. If the player is hit we should lower score. If the score reaches zero we should change state to "end"',
    time: 1700002895215,
    comment:
      "Improved GameLoop to handle collisions, scoring, and game state transitions"
  });

  class GameLoop extends deps.resolve("BaseSystem") {
    constructor() {
      super();
    }

    tick() {
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
          // Simple collision detection check
          if (dx * dx + dy * dy < 0.01) {
            // Collision detected, remove projectile
            entities.delete(projectile.id);
            view.querySelector(`#${projectile.id}`).remove();
            gameState.score += 10;

            // Split boulder or remove if small
            if (boulder.template === "boulder") {
              entities.delete(boulder.id);
              view.querySelector(`#${boulder.id}`).remove();
              // Create 3 smaller boulders
              for (let i = 0; i < 3; i++) {
                const angle = Math.random() * 2 * Math.PI;
                const velocity = [
                  Math.cos(angle) * 0.0002,
                  Math.sin(angle) * 0.0002,
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
              view.querySelector(`#${boulder.id}`).remove();
            }
          }
        });
      });

      // Check collision with player
      boulders.forEach((boulder) => {
        const dx = player.position[0] - boulder.position[0];
        const dy = player.position[1] - boulder.position[1];
        if (dx * dx + dy * dy < 0.01) {
          gameState.lives -= 1;
          gameState.score = Math.max(0, this.gameState.score - 100);
          if (gameState.score <= 0) {
            gameState.state = "End";
          }
        }
      });
    }
  }

  // Register updated GameLoop system with version 2
  return deps.register("GameLoop", new GameLoop(), 2);
}


function _view(deps){return(
deps.resolve("view")
)}

function _37($0){return(
$0
)}

function _38(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _39($0){return(
$0
)}

function _40(md){return(
md`## Current Chat context`
)}

function _41($0){return(
$0
)}

function _42(md){return(
md`tick the cells to include in the next prompt`
)}

function _43($0){return(
$0
)}

function _44(feedback_prompt){return(
feedback_prompt
)}

function _45(md){return(
md`### AI Settings`
)}

function _46($0){return(
$0
)}

function _47($0){return(
$0
)}

function _48($0){return(
$0
)}

function _49(md){return(
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
  main.variable(observer("entities")).define("entities", _entities);
  main.variable(observer("caller_id")).define("caller_id", _caller_id);
  main.variable(observer("viewof deps")).define("viewof deps", ["Inputs","caller_id","Event"], _deps);
  main.variable(observer("deps")).define("deps", ["Generators", "viewof deps"], (G, _) => G.input(_));
  main.variable(observer()).define(["deps"], _6);
  main.variable(observer("PhysicsSystem")).define("PhysicsSystem", ["deps","entities"], _PhysicsSystem);
  main.variable(observer("RendererSystem")).define("RendererSystem", ["deps","entities","view","htl"], _RendererSystem);
  main.variable(observer()).define(["entities"], _9);
  main.variable(observer("add_entity_button")).define("add_entity_button", ["htl","entities"], _add_entity_button);
  main.variable(observer("view_v1")).define("view_v1", ["deps","htl"], _view_v1);
  main.variable(observer("ticker_v1")).define("ticker_v1", ["deps","invalidation"], _ticker_v1);
  main.variable(observer("assets_v1")).define("assets_v1", ["deps"], _assets_v1);
  main.variable(observer("assets")).define("assets", ["deps"], _assets);
  main.variable(observer("ship_template")).define("ship_template", ["htl","assets"], _ship_template);
  main.variable(observer("RendererSystem_v2")).define("RendererSystem_v2", ["deps","entities","htl"], _RendererSystem_v2);
  main.variable(observer("player_entity")).define("player_entity", ["entities"], _player_entity);
  main.variable(observer("PlayerControl")).define("PlayerControl", ["deps","entities","invalidation"], _PlayerControl);
  main.variable(observer("PhysicsSystem_v2")).define("PhysicsSystem_v2", ["deps","entities"], _PhysicsSystem_v2);
  main.variable(observer("keysPressed")).define("keysPressed", ["invalidation"], _keysPressed);
  main.variable(observer("PlayerControl_v2")).define("PlayerControl_v2", ["deps","entities","keysPressed"], _PlayerControl_v2);
  main.variable(observer("RendererSystem_v3")).define("RendererSystem_v3", ["deps","entities","htl"], _RendererSystem_v3);
  main.variable(observer("PlayerControl_v3")).define("PlayerControl_v3", ["deps","entities","keysPressed"], _PlayerControl_v3);
  main.variable(observer("ship_template_v2")).define("ship_template_v2", ["ship_template","htl","assets"], _ship_template_v2);
  main.variable(observer("projectile_asset")).define("projectile_asset", ["htl","assets"], _projectile_asset);
  main.variable(observer("PlayerControl_v4")).define("PlayerControl_v4", ["deps","entities","keysPressed"], _PlayerControl_v4);
  main.variable(observer("WorldWrap")).define("WorldWrap", ["deps","entities","view"], _WorldWrap);
  main.variable(observer("PlayerControl_v5")).define("PlayerControl_v5", ["deps","entities","keysPressed"], _PlayerControl_v5);
  main.variable(observer()).define(["entities"], _29);
  main.variable(observer("boulder_template")).define("boulder_template", ["htl","assets"], _boulder_template);
  main.variable(observer("add_boulders")).define("add_boulders", ["entities"], _add_boulders);
  main.variable(observer("small_boulder_template")).define("small_boulder_template", ["htl","assets"], _small_boulder_template);
  main.variable(observer("GameLoop")).define("GameLoop", ["deps","entities","view"], _GameLoop);
  main.variable(observer("gameState")).define("gameState", _gameState);
  main.variable(observer("GameLoop_v2")).define("GameLoop_v2", ["deps","entities","view","gameState"], _GameLoop_v2);
  main.variable(observer("view")).define("view", ["deps"], _view);
  main.variable(observer()).define(["viewof prompt"], _37);
  main.variable(observer()).define(["Inputs","suggestion"], _38);
  main.variable(observer()).define(["viewof suggestion"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["viewof context_viz"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _43);
  main.variable(observer()).define(["feedback_prompt"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _46);
  main.variable(observer()).define(["viewof api_endpoint"], _47);
  main.variable(observer()).define(["viewof settings"], _48);
  main.variable(observer()).define(["md"], _49);
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
