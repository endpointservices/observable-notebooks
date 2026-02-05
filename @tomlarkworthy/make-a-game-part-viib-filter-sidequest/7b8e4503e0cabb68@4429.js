import define1 from "./f92778131fd76559@1212.js";
import define2 from "./17c8ce433e1df58e@3595.js";

function _1(md){return(
md`# Make a Game Part VIIb - Displacement Map deepdive


`
)}

function _deps(Inputs,Event)
{
  ({
    prompt:
      'Create a DI impelmentation that makes use of Observable resolution.\n\nThe named service should end up bound to an implementation with \n\n"mySystem = deps.resolve("mySystem")"\n\ndifferent implementations are added with\n\n"deps.register("mySystem", <value>, 1)"\n\nwith a monotonic version counter.\n\nthe deps implementation should keep all versions, so we can dynamically switch implementations, e.g. for a/b testing, but by default things should resolve to the highest number.\n\nbecause when deps changes it should dispatch and event, callers will try to reregister. So it should sniff where the call is coming from for deduplication with caller_id and time',
    time: 1699900881324,
    comment: "Create a viewof cell for Dependency Injection container v2"
  });

  const caller_id =
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
    };

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


function _4(html,crtWarpDisplacementMap_v5){return(
html`<h4>crtWarpDisplacementMap</h4><img src=${crtWarpDisplacementMap_v5}>`
)}

function _crtWarpAdjustment(view,Inputs)
{
  ({
    prompt:
      "So the CRT display backdrop is barrel warped, and a bit trapazoidal. We need another filter to apply a similar distortion. Create a UI for adjusting barrel warp and trapazoid parameters",
    time: 1701199826611,
    comment:
      "Create a UI for adjusting CRT display barrel warp and trapezoid parameters"
  });

  const crtWarpSettings = view`<div>
    <h2>CRT Warp Adjustment</h2>
    ${[
      "barrel_warp",
      Inputs.range([-512, 512], {
        value: 128,
        step: 0.01,
        label: "Barrel Warp"
      })
    ]}
    ${[
      "trapezoid_warp",
      Inputs.range([-1, 1], {
        value: 0,
        step: 0.01,
        label: "Trapezoid Warp"
      })
    ]}
    ${[
      "warp_scale",
      Inputs.range([0, 100], {
        value: 2,
        step: 0.01,
        label: "Scale"
      })
    ]}
    ${[
      "displacement_size",
      Inputs.range([0, 1024], {
        value: 16,
        step: 0.01,
        label: "Size"
      })
    ]}
  </div>`;

  return crtWarpSettings;
}


function _warpImageTest(deps,crtWarpAdjustmentGenerator_v3,htl)
{
  ({
    prompt:
      "I can;t tell if the warp image generator works, can you draw a checkboard with SVG with the filter applied to test it",
    time: 1701293709944,
    comment:
      "Create a checkerboard SVG with CRT warp filter applied to test the warp image generator"
  });

  const warpFilter = deps.resolve("crtWarpFilter")(0, 0); // Applying moderate barrel warp for test
  const warpMapImage = crtWarpAdjustmentGenerator_v3;

  const checkerboard = htl.svg`<svg width="200" height="200" viewBox="-1 -1 2 2">
    <defs>
      <pattern id="checkerboard" patternUnits="userSpaceOnUse" width="0.2" height="0.2">
        <rect width="0.1" height="0.1" />
        <rect x="0.1" y="0.1" width="0.1" height="0.1" fill="black" />
      </pattern>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
      </linearGradient>
      ${warpFilter}
    </defs>
    <rect x="-1" y="-1" width="2" height="2" fill="url(#grad1)" filter="url(#crt-warp)" />
    <rect x="-1" y="-1" width="2" height="2" fill="url(#checkerboard)" filter="url(#crt-warp)" />
  </svg>`;

  return checkerboard;
}


function _crtWarpAdjustmentGenerator_v3(deps,crtWarpDisplacementMap_v5,htl,crtWarpAdjustment){return(
{
  prompt:
    "OK make a new crtWarpAdjustmentGenerator that uses the displacement map",
  time: 1701292141453,
  comment: "Generate CRT warp adjustment filter using the displacement map"
} &&
  deps.register(
    "crtWarpFilter",
    function crtWarpAdjustmentGenerator(barrel_warp, trapezoid_warp) {
      const warpMapImage = crtWarpDisplacementMap_v5;
      const filter = htl.svg`<filter id="crt-warp" x="0" y="0" width="1" height="1"  color-interpolation-filters="sRGB">
    <feImage href="${warpMapImage}" result="warpMap" />
    <feDisplacementMap in="SourceGraphic" in2="warpMap" scale="${crtWarpAdjustment.warp_scale}" xChannelSelector="R" yChannelSelector="G" />
  </filter>`;
      return filter;
    },
    3
  )
)}

async function _crtWarpDisplacementMap_v5(crtWarpAdjustment,deps)
{
  ({
    prompt:
      "Maybe barrel distortion is not the right term. I want the corners pulled in. So displacements far from the center should be deflected towards the center",
    time: 1701296188546,
    comment:
      "Generate displacement map for CRT warp effect with corners pulled towards the center"
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = crtWarpAdjustment.displacement_size; // Use a power of 2 for better texture performance

  // Draw the displacement map
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const warpEffect = crtWarpAdjustment.barrel_warp;
  for (let index = 0; index < data.length; index += 4) {
    const x = (index / 4) % canvas.width;
    const y = index / 4 / canvas.width;
    const dy = y / (canvas.height * 1.0) - 0.5;
    let dx = x / (canvas.width * 1.0) - 0.5;

    const distance2 = dx * dx + dy * dy;
    data[index] = 127.5 + dx * distance2 * distance2 * warpEffect; // Red channel for X displacement
    data[index + 1] = 127.5 + dy * distance2 * distance2 * warpEffect; // Green channel for Y displacement
    data[index + 2] = 127; // Blue channel not used
    data[index + 3] = 127; // Alpha channel
  }
  ctx.putImageData(imageData, 0, 0);

  // Convert canvas to an image blob
  const warp = await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    });
  });

  deps.register("crtWarpDisplacementMap", warp, 4);

  return warp;
}


function _9($0){return(
$0
)}

function _10(md){return(
md`Sound Effects from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=106436">Pixabay</a>`
)}

function _11(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _12($0){return(
$0
)}

function _13(md){return(
md`## Current Chat context`
)}

function _14($0){return(
$0
)}

function _15(md){return(
md`tick the cells to include in the next prompt`
)}

function _16($0){return(
$0
)}

function _17(feedback_prompt){return(
feedback_prompt
)}

function _18(md){return(
md`### AI Settings`
)}

function _19($0){return(
$0
)}

function _20($0){return(
$0
)}

function _21($0){return(
$0
)}

function _22(md){return(
md`---`
)}

function _23(source){return(
source["crtWarpDisplacementMap"]
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
  main.variable(observer("viewof deps")).define("viewof deps", ["Inputs","Event"], _deps);
  main.variable(observer("deps")).define("deps", ["Generators", "viewof deps"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer()).define(["html","crtWarpDisplacementMap_v5"], _4);
  main.variable(observer("viewof crtWarpAdjustment")).define("viewof crtWarpAdjustment", ["view","Inputs"], _crtWarpAdjustment);
  main.variable(observer("crtWarpAdjustment")).define("crtWarpAdjustment", ["Generators", "viewof crtWarpAdjustment"], (G, _) => G.input(_));
  main.variable(observer("warpImageTest")).define("warpImageTest", ["deps","crtWarpAdjustmentGenerator_v3","htl"], _warpImageTest);
  main.variable(observer("crtWarpAdjustmentGenerator_v3")).define("crtWarpAdjustmentGenerator_v3", ["deps","crtWarpDisplacementMap_v5","htl","crtWarpAdjustment"], _crtWarpAdjustmentGenerator_v3);
  main.variable(observer("crtWarpDisplacementMap_v5")).define("crtWarpDisplacementMap_v5", ["crtWarpAdjustment","deps"], _crtWarpDisplacementMap_v5);
  main.variable(observer()).define(["viewof prompt"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Inputs","suggestion"], _11);
  main.variable(observer()).define(["viewof suggestion"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["viewof context_viz"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _16);
  main.variable(observer()).define(["feedback_prompt"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _19);
  main.variable(observer()).define(["viewof api_endpoint"], _20);
  main.variable(observer()).define(["viewof settings"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["source"], _23);
  const child2 = runtime.module(define2);
  main.import("source", child2);
  main.import("code", child2);
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
