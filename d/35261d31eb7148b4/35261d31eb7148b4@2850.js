import define1 from "./f92778131fd76559@1208.js";
import define2 from "./26670360aa6f343b@209.js";
import define3 from "./17c8ce433e1df58e@3584.js";

async function _1(FileAttachment,md){return(
md`${await FileAttachment("DALL·E 2023-11-18 17.33.23 - A human and a robot, arm in arm, standing in front of a magnificent neon-lit tech tree. The scene conveys a sense of partnership and contemplation, as.png").image({style: "float: right; padding: 10px; width: 300px"})}


# Roboco-op Skills

Copy and paste skills into a [roboco-op](https://observablehq.com/@tomlarkworthy/robocoop) to level-up your LLM

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

function _allInputs(view,md,Inputs){return(
{
  prompt: "Write down a skill demonstration on Observable inputs",
  time: 1700262095526,
  comment: "All the observable inputs and how to use them"
} &&
  view`${md`## Observable Inputs UI Skill
  Observable notebooks ship with useful out-of-the-box styled UI components
  `}
  <details><summary><b>example</b></summary>
  <div>${[
    "textInput",
    Inputs.text({
      label: "Text Input",
      placeholder: "Enter some text",
      value: "hi!"
    })
  ]}</div>
  <div>${[
    "textareaInput",
    Inputs.textarea({
      label: "Textarea Input",
      rows: 3,
      placeholder: "Enter multiple lines of text"
    })
  ]}</div>
  <div>${[
    "rangeInput",
    Inputs.range([0, 100], { label: "Range Input", step: 1, value: 50 })
  ]}</div>
  <div>${[
    "selectInput",
    Inputs.select(["Option 1", "Option 2", "Option 3"], {
      label: "Select Input"
    })
  ]}</div>
  <div>${[
    "radioInput",
    Inputs.radio(["Option A", "Option B", "Option C"], {
      label: "Radio Input"
    })
  ]}</div>
  <div>${[
    "checkboxInput",
    Inputs.checkbox(["Check 1", "Check 2"], { label: "Checkbox Input" })
  ]}</div>
  <div>${["toggleInput", Inputs.toggle({ label: "Toggle Input" })]}</div>
  <div>${[
    "buttonInput",
    Inputs.button("Click Me", { title: "Button Input" })
  ]}</div>
  <div>${[
    "tableInput",
    Inputs.table(
      [
        { column1: "Row 1", column2: "Data 1" },
        { column1: "Row 2", column2: "Data 2" }
      ],
      { label: "Table Input" }
    )
  ]}</div>
  <div>${[
    "searchInput",
    Inputs.search(["Item 1", "Item 2", "Item 3"], {
      placeholder: "Search here"
    })
  ]}</div>
  <div>${["fileInput", Inputs.file({ label: "File Input" })]}</div>
  <div>${[
    "colorInput",
    Inputs.color({ label: "Color Input", value: "#ff0000" })
  ]}</div>
  <div>${["dateInput", Inputs.date({ label: "Date Input" })]}</div>
</details>`
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
          debugger;
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

function _generateSchema(){return(
import("https://cdn.skypack.dev/generate-schema@2.6.0?min")
)}

function _penguins_schema(generateSchema,penguins){return(
generateSchema.json(penguins)
)}

function _vegaLiteScatterPlot(vl,penguins){return(
{
  prompt:
    'The notebook contains:\n  - cell "penguins_schema" is {"$schema":"http://json-schema.org/draft-04/schema#","type":"array","items":{"type":"object","properties":{"species":{"type":"string"},"island":{"type":"string"},"culmen_length_mm":{"type":"number"},"culmen_depth_mm":{"type":"number"},"flipper_length_mm":{"type":"number"},"body_mass_g":{"type":"number"},"sex":{"type":["string","null"]}},"required":["species","island","culmen_length_mm","culmen_depth_mm","flipper_length_mm","body_mass_g","sex"]}}\nGenerate a vega lite scatter plot of boddy mass against flipper length where species are a different color',
  time: 1700757873259,
  comment:
    "Vega-Lite scatter plot of penguin body mass against flipper length with species color encoding"
} &&
  vl
    .markPoint()
    .data(penguins)
    .encode(
      vl.x().fieldQ("flipper_length_mm").title("Flipper Length (mm)"),
      vl.y().fieldQ("body_mass_g").title("Body Mass (g)"),
      vl.color().fieldN("species").title("Species")
    )
    .render()
)}

function _vegaLiteScatterPlotJSON(vl,penguins){return(
(
  {
    prompt:
      "that works but can you do the same using the JSON specification format instead.",
    time: 1700758022931,
    comment: "Vega-Lite scatter plot using JSON specification format"
  } &&
  vl.spec({
    mark: "point",
    data: { values: penguins },
    encoding: {
      x: {
        field: "flipper_length_mm",
        type: "quantitative",
        title: "Flipper Length (mm)"
      },
      y: {
        field: "body_mass_g",
        type: "quantitative",
        title: "Body Mass (g)"
      },
      color: { field: "species", type: "nominal", title: "Species" }
    }
  })
).render()
)}

function _11(vl){return(
vl.spec
)}

function _olympians_schema(generateSchema,olympians){return(
generateSchema.json(olympians)
)}

function _13(md){return(
md`---`
)}

function _vegaLiteScatterMatrix(vl,olympians){return(
{
  prompt:
    'The notebook contains:\n  - cell "olympians_schema" is {"$schema":"http://json-schema.org/draft-04/schema#","type":"array","items":{"type":"object","properties":{"id":{"type":"number"},"name":{"type":"string"},"nationality":{"type":"string"},"sex":{"type":"string"},"date_of_birth":{"type":"string","format":"date-time"},"height":{"type":["number","null"]},"weight":{"type":["number","null"]},"sport":{"type":"string"},"gold":{"type":"number"},"silver":{"type":"number"},"bronze":{"type":"number"},"info":{"type":["null","string"]}},"required":["id","name","nationality","sex","date_of_birth","height","weight","sport","gold","silver","bronze","info"]}}\ncan you draw a scatter matrix of the Olympians dataset using a vega lite spec.',
  time: 1700758604470,
  comment: "Vega-Lite scatter matrix of Olympians dataset"
} &&
  vl
    .markCircle()
    .data(olympians)
    .transform(
      vl.filter("datum.height != null && datum.weight != null") // Remove records with null height or weight
    )
    .encode(
      vl.x().fieldQ("height").scale({ zero: false }),
      vl.y().fieldQ("weight").scale({ zero: false }),
      vl.color().fieldN("sport"),
      vl.tooltip(["name", "nationality", "sport"])
    )
    .repeat({
      column: ["height", "weight"],
      row: ["weight", "height"]
    })
    .config({
      axis: { domain: false }
    })
    .render()
)}

function _15(vl){return(
vl.groupby(["nationality", "sport"])
)}

function _16(olympians){return(
olympians.filter((d) => d.gold > 0).filter((d) => d.sport === "cycling")
)}

function _vegaLiteTopSportsByCountryFixed(vl,olympians){return(
{
  prompt: "TypeError: vl.groupby(...).aggregate(...).desc",
  time: 1700758928842,
  comment:
    "Corrected Vega-Lite visualization to display which countries excel at which sports based on the number of gold medals won"
} &&
  vl
    .markBar()
    .data(olympians)
    .transform(
      vl
        .groupby(["nationality", "sport"])
        .aggregate(vl.sum("gold").as("total_gold")),
      vl.window(
        [{ op: "rank", as: "rank" }],
        [{ field: "total_gold", order: "descending" }]
      ),
      vl.filter("datum.rank < 20")
    )
    .encode(
      vl.x().fieldN("sport").sort("total_gold"),
      vl.y().fieldN("nationality"),
      vl.color().fieldQ("total_gold").scale({ scheme: "yellowgreen" }),
      vl.tooltip(["nationality", "sport", "total_gold"])
    )
    .width(300)
    .height(300)
    .render()
)}

function _probabilityOfGoldGivenSilver(olympians){return(
{
  prompt:
    "if someone has a silver medal, whats the probability they have a gold medal, by sport?",
  time: 1700761433488,
  comment:
    "Calculate the probability of an athlete having a gold medal given they have a silver medal, by sport"
} &&
  olympians
    .filter((athlete) => athlete.silver > 0)
    .reduce((acc, athlete) => {
      if (!acc[athlete.sport]) {
        acc[athlete.sport] = { gold: 0, silver: 0 };
      }
      if (athlete.gold > 0) {
        acc[athlete.sport].gold++;
      }
      acc[athlete.sport].silver++;
      return acc;
    }, {})
    .map(([sport, { gold, silver }]) => ({
      sport,
      probability: gold / silver
    }))
)}

function _vegaLiteGoldGivenSilver(vl,olympians){return(
{
  prompt:
    "if someone has a silver medal, whats the probability they have a gold medal, by sport? using vega ",
  time: 1700761564267,
  comment:
    "Vega-Lite bar chart to represent the probability of having a gold medal given a silver medal, by sport"
} &&
  vl
    .markBar()
    .data(olympians)
    .transform(
      vl.filter("datum.silver > 0"),
      vl
        .groupby(["sport"])
        .aggregate(vl.average("gold").as("avg_gold"), vl.count().as("count")),
      vl.calculate("datum.avg_gold / datum.count").as("probability")
    )
    .encode(
      vl.x().fieldQ("probability").title("Probability"),
      vl.y().fieldN("sport").sort("-x"),
      vl.tooltip(["sport", "probability"])
    )
    .render()
)}

function _20($0){return(
$0
)}

function _21(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _22($0){return(
$0
)}

function _23(md){return(
md`## Current Chat context`
)}

function _24($0){return(
$0
)}

function _25(md){return(
md`tick the cells to include in the next prompt`
)}

function _26($0){return(
$0
)}

function _27(feedback_prompt){return(
feedback_prompt
)}

function _28(md){return(
md`### AI Settings`
)}

function _29($0){return(
$0
)}

function _30($0){return(
$0
)}

function _31($0){return(
$0
)}

function _32(md){return(
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
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["DALL·E 2023-11-18 17.33.23 - A human and a robot, arm in arm, standing in front of a magnificent neon-lit tech tree. The scene conveys a sense of partnership and contemplation, as.png", {url: new URL("./files/7937434e7ffba2538979e250764442e70c5763920c108ee19dae9c6843e2e5c55b65443266ff1ee2aef112f6f286cc08992ad889f08250caee4c017616102362.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer("markdown_skill")).define("markdown_skill", ["md","mermaid","htl","tex"], _markdown_skill);
  main.variable(observer("viewof allInputs")).define("viewof allInputs", ["view","md","Inputs"], _allInputs);
  main.variable(observer("allInputs")).define("allInputs", ["Generators", "viewof allInputs"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer("viewof bindableUISkill")).define("viewof bindableUISkill", ["view","md","Inputs","htl","Event"], _bindableUISkill);
  main.variable(observer("bindableUISkill")).define("bindableUISkill", ["Generators", "viewof bindableUISkill"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("vl", child2);
  main.variable(observer("generateSchema")).define("generateSchema", _generateSchema);
  main.variable(observer("penguins_schema")).define("penguins_schema", ["generateSchema","penguins"], _penguins_schema);
  main.variable(observer("vegaLiteScatterPlot")).define("vegaLiteScatterPlot", ["vl","penguins"], _vegaLiteScatterPlot);
  main.variable(observer("vegaLiteScatterPlotJSON")).define("vegaLiteScatterPlotJSON", ["vl","penguins"], _vegaLiteScatterPlotJSON);
  main.variable(observer()).define(["vl"], _11);
  main.variable(observer("olympians_schema")).define("olympians_schema", ["generateSchema","olympians"], _olympians_schema);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("vegaLiteScatterMatrix")).define("vegaLiteScatterMatrix", ["vl","olympians"], _vegaLiteScatterMatrix);
  main.variable(observer()).define(["vl"], _15);
  main.variable(observer()).define(["olympians"], _16);
  main.variable(observer("vegaLiteTopSportsByCountryFixed")).define("vegaLiteTopSportsByCountryFixed", ["vl","olympians"], _vegaLiteTopSportsByCountryFixed);
  main.variable(observer("probabilityOfGoldGivenSilver")).define("probabilityOfGoldGivenSilver", ["olympians"], _probabilityOfGoldGivenSilver);
  main.variable(observer("vegaLiteGoldGivenSilver")).define("vegaLiteGoldGivenSilver", ["vl","olympians"], _vegaLiteGoldGivenSilver);
  main.variable(observer()).define(["viewof prompt"], _20);
  main.variable(observer()).define(["Inputs","suggestion"], _21);
  main.variable(observer()).define(["viewof suggestion"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["viewof context_viz"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _26);
  main.variable(observer()).define(["feedback_prompt"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _29);
  main.variable(observer()).define(["viewof api_endpoint"], _30);
  main.variable(observer()).define(["viewof settings"], _31);
  main.variable(observer()).define(["md"], _32);
  const child3 = runtime.module(define3);
  main.import("ask", child3);
  main.import("excludes", child3);
  main.import("cells", child3);
  main.import("update_context", child3);
  main.import("on_prompt", child3);
  main.import("api_call_response", child3);
  main.import("mutable context", child3);
  main.import("context", child3);
  main.import("viewof prompt", child3);
  main.import("prompt", child3);
  main.import("viewof suggestion", child3);
  main.import("suggestion", child3);
  main.import("viewof settings", child3);
  main.import("settings", child3);
  main.import("viewof OPENAI_API_KEY", child3);
  main.import("OPENAI_API_KEY", child3);
  main.import("viewof api_endpoint", child3);
  main.import("api_endpoint", child3);
  main.import("feedback_prompt", child3);
  main.import("viewof feedback_cells_selector", child3);
  main.import("feedback_cells_selector", child3);
  main.import("viewof context_viz", child3);
  main.import("context_viz", child3);
  main.variable(observer("workers")).define("workers", ["update_context","on_prompt","api_call_response"], _workers);
  return main;
}
