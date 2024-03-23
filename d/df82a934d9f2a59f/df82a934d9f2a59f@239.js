import define1 from "./f92778131fd76559@1174.js";
import define2 from "./4a1fa3c167b752e5@324.js";
import define3 from "./bd9d083ddbe7ce90@1105.js";
import define4 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# Wonderland Social

Ideas:
- This needs an administrator to toggle the game state for each player.`
)}

function _states(){return(
{}
)}

function _initialState(Inputs,states){return(
Inputs.radio(Object.keys(states), { value: "WELCOME" })
)}

function _reset(Inputs){return(
Inputs.button("reset")
)}

function _gameLoop(viewroutine,reset,initialState,states,error){return(
viewroutine(async function* () {
  reset
  let state = initialState;
  while (true) {
    if (states[state]) {
      state = yield* states[state]();
    } else {
      state = yield* error(`unknown state "${state}"`);
    }
  }
})
)}

function _error(md,initialState){return(
async function* (msg) {
  yield md`⚠️ ${msg}`;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return initialState;
}
)}

function _10(html){return(
html`<link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css" type="text/css">`
)}

function _card(htl){return(
({
  title = "title",
  msg
} = {}) => htl.html`<article class="center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
  <div class="tc">
    <h1 class="f4">${title}</h1>
    <hr class="mw3 bw1">
  </div>
  <p class="lh-copy measure center f6 black-70">
    ${msg}
  </p>
</article>`
)}

function _registerState($0){return(
(label, handler) => {
  $0.value = { ...$0.value, [label]: handler };
  return handler;
}
)}

function _welcome(registerState,ask,grid,card,htl,Event){return(
registerState("WELCOME", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 10,
          element: card({
            title: "Welcome",
            msg:
              "An AI will be sending you signals and humanity depends on it..."
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 11,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">I am ready</button>`
        }
      }
    })
  );
  return "ToS";
})
)}

function _tos(registerState,ask,grid,card,htl,Event){return(
registerState("ToS", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 10,
          element: card({
            title: "Terms of Service",
            msg: "Do you agree to the terms of service?"
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 11,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">Yes</button>`
        }
      }
    })
  );
  return "wait";
})
)}

function _waitForStart(registerState,ask,grid,card,htl,Event){return(
registerState("wait", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 10,
          element: card({
            title: "Count down has begun",
            msg: "Waiting for game to begin...."
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 11,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">Begin PetSofa</button>`
        }
      }
    })
  );
  return "petSofaTime0";
})
)}

function _petSofaTime0(registerState,ask,grid,card,md,htl,Event){return(
registerState("petSofaTime0", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 16,
          element: card({
            title: "Two Pets",
            msg: md`Two pets are sitting on the sofa and exchange their memories of their owners.
Remember then to become your most favorite pet. If you never had a pet invent one. 
Ask the other player to ask you questions and answer from your pet POV. 
What have they noticed from this POV over the years?
Ask the same questions to your partner.  

**Your Objective: Try to get the other to scratch you without explicitly asking during the conversion.**

You have 9 minutes. `
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 16,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">9 mins later</button>`
        }
      }
    })
  );
  return "petSofaTime9";
})
)}

function _petSofaTime9(registerState,ask,grid,card,md,htl,Event){return(
registerState("petSofaTime9", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 16,
          element: card({
            title: "Two Pets",
            msg: md`Two pets are sitting on the sofa and exchange their memories of their owners.
Remember then to become your most favorite pet. If you never had a pet invent one. 
Ask the other player to ask you questions and answer from your pet POV. 
What have they noticed from this POV over the years?
Ask the same questions to your partner.  

**Your Objective: Try to get the other to scratch you without explicitly asking during the conversion.**

⚠️ This is your last minute, you have one minute left to achieve your objective!`
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 16,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">30 secs later</button>`
        }
      }
    })
  );
  return "petSofaTime10";
})
)}

function _petSofaTime10(registerState,ask,grid,card,md,htl,Event){return(
registerState("petSofaTime10", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 12,
          element: card({
            title: "Two Pets - Game Over",
            msg: md`Have you reached your object?`
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 12,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">next</button>`
        }
      }
    })
  );
  return "actII";
})
)}

function _actII(registerState,ask,grid,card,md,htl,Event){return(
registerState("actII", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 12,
          element: card({
            title: "ACT II",
            msg: md`The disco`
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 12,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">I can hear music</button>`
        }
      }
    })
  );
  return "disco";
})
)}

function _changeTogether(registerState,ask,grid,card,md,htl,Event){return(
registerState("changeTogether", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 12,
          element: card({
            title: "Change!!",
            msg: md`change together`
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 12,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">I can hear music</button>`
        }
      }
    })
  );
  return "changePlace";
})
)}

function _changePlace(registerState,ask,grid,card,md,htl,Event){return(
registerState("changePlace", async function* () {
  yield* ask(
    grid({
      elements: {
        banner: {
          x: 0,
          y: 0,
          w: 12,
          h: 12,
          element: card({
            title: "Change!!",
            msg: md`change your sitting place`
          })
        },
        next: {
          x: 0,
          w: 12,
          h: 1,
          y: 12,
          element: htl.html`<button onclick=${(evt) =>
            evt.target.dispatchEvent(
              new Event("input", { bubbles: true })
            )} class="ph3 f6 link dim br2 ba ph3 pv2 mb2 dib near-black v-mid" href="#0">I can hear music</button>`
        }
      }
    })
  );
  return "changePlace";
})
)}

function _23(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  const child2 = runtime.module(define2);
  main.import("viewroutine", child2);
  main.import("ask", child2);
  const child3 = runtime.module(define3);
  main.import("grid", child3);
  main.define("initial states", _states);
  main.variable(observer("mutable states")).define("mutable states", ["Mutable", "initial states"], (M, _) => new M(_));
  main.variable(observer("states")).define("states", ["mutable states"], _ => _.generator);
  main.variable(observer("viewof initialState")).define("viewof initialState", ["Inputs","states"], _initialState);
  main.variable(observer("initialState")).define("initialState", ["Generators", "viewof initialState"], (G, _) => G.input(_));
  main.variable(observer("viewof reset")).define("viewof reset", ["Inputs"], _reset);
  main.variable(observer("reset")).define("reset", ["Generators", "viewof reset"], (G, _) => G.input(_));
  main.variable(observer("gameLoop")).define("gameLoop", ["viewroutine","reset","initialState","states","error"], _gameLoop);
  main.variable(observer("error")).define("error", ["md","initialState"], _error);
  main.variable(observer()).define(["html"], _10);
  main.variable(observer("card")).define("card", ["htl"], _card);
  main.variable(observer("registerState")).define("registerState", ["mutable states"], _registerState);
  main.variable(observer("welcome")).define("welcome", ["registerState","ask","grid","card","htl","Event"], _welcome);
  main.variable(observer("tos")).define("tos", ["registerState","ask","grid","card","htl","Event"], _tos);
  main.variable(observer("waitForStart")).define("waitForStart", ["registerState","ask","grid","card","htl","Event"], _waitForStart);
  main.variable(observer("petSofaTime0")).define("petSofaTime0", ["registerState","ask","grid","card","md","htl","Event"], _petSofaTime0);
  main.variable(observer("petSofaTime9")).define("petSofaTime9", ["registerState","ask","grid","card","md","htl","Event"], _petSofaTime9);
  main.variable(observer("petSofaTime10")).define("petSofaTime10", ["registerState","ask","grid","card","md","htl","Event"], _petSofaTime10);
  main.variable(observer("actII")).define("actII", ["registerState","ask","grid","card","md","htl","Event"], _actII);
  main.variable(observer("changeTogether")).define("changeTogether", ["registerState","ask","grid","card","md","htl","Event"], _changeTogether);
  main.variable(observer("changePlace")).define("changePlace", ["registerState","ask","grid","card","md","htl","Event"], _changePlace);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _23);
  return main;
}
