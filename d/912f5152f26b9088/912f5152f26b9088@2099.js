import define1 from "./0b75dbddd18995dc@1761.js";
import define2 from "./048a17a165be198d@271.js";
import define3 from "./0e0b35a92c819d94@474.js";
import define4 from "./1f41fef8b019cf4e@94.js";
import define5 from "./f92778131fd76559@1208.js";

async function _1(FileAttachment,md){return(
md`${await FileAttachment("DALL·E 2023-11-07 22@2.30.52 - A photo-realistic image of a cyborg with a sleek, metallic frame, detailed with a striking red visor, working alongside an engineer in a cluttered hig.png").image({style: "float: right; padding: 10px"})}

# Roboco-op: Random Exploration 2023-11-10

This was the original notebook. I requested lots of different things and manually corrected them. When it started it could not program Observable. By the end it is quite capable of writing mini-games and pulling content from YouTube.

I recommend starting from a [blank slate](https://observablehq.com/@tomlarkworthy/robocoop) but copy over cells from here to teach it skills without going through your own prompt cycles.

`
)}

function _example_markdown(md){return(
{
  prompt: "Write an example markdown cell",
  time: 1699221659348,
  comment: "Example of a markdown cell"
} &&
  md` This is a markdown cell. You can use **bold**, _italic_, and [links](http://example.com).`
)}

function _hexbin_heatmap(Plot,olympians){return(
{
  prompt:
    'Create a Hexbin heatmap of Olympic athletes aaccording to their weight and height which are filled with a color that encodes frequency. Use the inbuilt dataset "olympians" variable',
  time: 1699296536008,
  comment:
    "Create a Hexbin heatmap of Olympic athletes according to their weight and height filled with a color that encodes frequency."
} &&
  Plot.dot(
    olympians,
    Plot.hexbin({ fill: "count" }, { x: "weight", y: "height" })
  ).plot({ color: { scheme: "YlGnBu" } })
)}

function _blob_url(XMLSerializer,hexbin_heatmap){return(
{
  prompt: "convert the hexbin_heatmap SVGElement to blob URL ",
  time: 1699302857881,
  comment: "Convert the hexbin_heatmap SVGElement to blob URL"
} &&
  URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(hexbin_heatmap)], {
      type: "image/svg+xml"
    })
  )
)}

function _form(cautious,view,Inputs){return(
{
  prompt:
    'use the already imported view literal to make reactive form which has\n\n2 tabs name "first", "second", which switch between two text areas called "a", "b" with placehoders "A", "B" and a single "submit" button at the bottom. Pressing submit should update the cell bound to the form. The result should be an object shaped {a:..., b:...} where the values map to the text area values.\n',
  time: 1699298358615,
  comment:
    "Create a reactive form with two tabs 'first' and 'second' switching between two text areas 'a' and 'b' with placeholders 'A' and 'B' and a submit button. On submit, it updates the cell bound to the form. The result will be an object shaped {a:..., b:...} where the values map to the text area values."
} &&
  cautious(
    (apply, reset) => view`
    <input type="radio" name="tab" checked onclick=${() => {
      document.getElementById("firstContent").style.display = "block";
      document.getElementById("secondContent").style.display = "none";
    }}>
    <label for="first">First</label>
    <input type="radio" name="tab" onclick=${() => {
      document.getElementById("firstContent").style.display = "none";
      document.getElementById("secondContent").style.display = "block";
    }}>
    <label for="second">Second</label>
    <br>
    <div id="firstContent">
      ${["a", Inputs.textarea({ placeholder: "A" })]}
    </div>
    <div id="secondContent" style="display: none;">
      ${["b", Inputs.textarea({ placeholder: "B" })]}
    </div>
    <br>
    <button onClick=${apply}>Submit</button>`
  )
)}

function _6(form){return(
form
)}

function _THREE(){return(
{
  prompt: "Import threeJS with orbit controls as THREE",
  time: 1699299731104,
  comment: "Importing three.js with orbit controls as three"
} &&
  Promise.all([
    import("https://esm.sh/three"),
    import("https://esm.sh/three/examples/jsm/controls/OrbitControls.js")
  ]).then(([THREE, { OrbitControls }]) => ({ ...THREE, OrbitControls }))
)}

function _demo_scene(THREE,width,blob_url)
{
  ({
    prompt: "create a THREE cool demo scene using blob_url as a texture",
    time: 1699303031445,
    comment:
      "Creating a 3D scene with a rotating cube using three.js. The cube is textured with the blob URL of the hexbin heatmap SVG."
  });
  const height = 500;
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);

  // Create a cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshBasicMaterial({ map: loader.load(blob_url) });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Create an animation loop
  const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  // Enable orbit controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  return renderer.domElement;
}


function _relativity_derivation(md,tex){return(
{
  prompt:
    "Using the tex literal (KaTeX) intermingled with markdown, write a derivation of relativity.",
  time: 1699388874563,
  comment: "Derivation of relativity equation using KaTeX and markdown"
} &&
  md`The derivation of the relativity equation starts from the principle of relativity, which states that the laws of physics are the same in all inertial frames of reference.

From this principle, we derive the Lorentz transformation, which describes how measurements of space and time by two observers moving relative to each other are related. The Lorentz transformation in one dimension is:

${tex`
\begin{aligned}
    x' &= \gamma (x - vt) \\
    t' &= \gamma \left(t - \frac{vx}{c^2}\right)
\end{aligned}
`}

where:

- ${tex`x'`} and ${tex`t'`} are the space and time coordinates measured by the observer moving with velocity ${tex`v`},
- ${tex`x`} and ${tex`t`} are the space and time coordinates measured by the observer at rest,
- ${tex`gamma = \frac{1}{\sqrt{1 - v^2/c^2}}`} is the Lorentz factor, and
- ${tex`c`} is the speed of light.

From the Lorentz transformation, we can derive the famous equation of special relativity, which states that energy is equivalent to mass times the speed of light squared:

${tex`E = mc^2`}
`
)}

function _pong_game(width)
{
  ({
    prompt: "Create an automated retro looking game of pong",
    time: 1699389743848,
    comment: "Creating an automated retro-looking game of Pong"
  });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = 200;
  const context = canvas.getContext("2d");

  const ball = { x: width / 2, y: 20, dx: 3, dy: 2, radius: 15 };
  const paddle = { x: 5, y: canvas.height / 2, width: 20, height: 60 };

  const drawBall = () => {
    context.beginPath();
    context.rect(
      ball.x,
      ball.y - ball.radius,
      ball.radius * 2,
      ball.radius * 2
    );
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
  };

  const drawPaddle = () => {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
  };

  const update = () => {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (
      ball.x + ball.dx > canvas.width - ball.radius ||
      ball.x + ball.dx < ball.radius + 10
    ) {
      ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      } else {
        ball.dy = -ball.dy;
      }
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
    paddle.y = ball.y - 30;
  };

  const interval = setInterval(update, 10);

  return canvas;
}


function _neon_tictactoe_game()
{
  ({
    prompt: "Create a tick tack toe game using neon colors",
    time: 1699470230338,
    comment: "Creating a tic-tac-toe game with neon colors"
  });

  // Create the canvas and get the 2D context
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Define the size of the game board
  canvas.width = 300;
  canvas.height = 300;
  const cellSize = 100;

  // Initialize the game board
  let board = Array(3)
    .fill()
    .map(() => Array(3).fill(""));
  let currentPlayer = "X";

  // Function to draw the game board
  const drawBoard = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        context.strokeStyle = "#00FF00"; // Neon green for the grid
        context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        context.font = "50px sans-serif";
        context.fillStyle = currentPlayer === "X" ? "#FF00FF" : "#00FFFF"; // Neon pink for player X, neon cyan for player O
        context.fillText(
          board[i][j],
          i * cellSize + cellSize / 3,
          j * cellSize + (2 * cellSize) / 3
        );
      }
    }
  };

  // Function to handle click events
  const handleClick = (event) => {
    let x = Math.floor(event.offsetX / cellSize);
    let y = Math.floor(event.offsetY / cellSize);
    if (board[x][y] === "") {
      board[x][y] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    drawBoard();
  };

  // Attach the click event listener to the canvas
  canvas.addEventListener("click", handleClick);

  // Draw the initial game board
  drawBoard();

  return canvas;
}


function _youtube_movie(html){return(
{
  prompt: "pick a movie from youtube",
  time: 1699688243950,
  comment:
    "Embedding a movie from YouTube. This is the trailer for 'Free Guy', a popular movie."
} &&
  html`<iframe width="560" height="315" src="https://www.youtube.com/embed/YE7VzlLtp-4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _dead_emoji(d3)
{
  ({
    prompt: "draw a smiley emoji",
    time: 1699688364300,
    comment:
      "Drawing a dead emoji using SVG and D3.js. The emoji has a yellow face, two eyes, and a curved mouth."
  });

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, 100, 100])
    .attr("width", "20%");

  const face = svg
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 45)
    .style("fill", "#ffcc00")
    .style("stroke", "black");

  const leftEye = svg
    .append("circle")
    .attr("cx", 35)
    .attr("cy", 35)
    .attr("r", 5)
    .style("fill", "black");

  const rightEye = svg
    .append("circle")
    .attr("cx", 65)
    .attr("cy", 35)
    .attr("r", 5)
    .style("fill", "black");

  const mouth = svg
    .append("path")
    .attr("d", "M 30 70 q 20 20 40 0")
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", "2px");

  return svg.node();
}


function _15(md){return(
md`---

---

## Prompt Interface 🤗
`
)}

function _prompt(Inputs){return(
Inputs.textarea({
  placeholder: "enter what you want to do, CMD + ENTER to submit",
  rows: 10,
  minlength: 1,
  submit: true
})
)}

function _17(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _suggestion(Inputs,formatted_instruction){return(
Inputs.textarea({
  rows: 50,
  disabled: true,
  value: formatted_instruction,
  style: "height: 500px"
})
)}

function _19(md){return(
md`## Current Chat context`
)}

function _context_viz(Inputs,context,html,inspect){return(
Inputs.table(
  context.map((r) => ({
    role: r.role,
    content_or_function_call: r.content || r.function_call
  })),
  {
    format: {
      role: (role) =>
        html`<span style="color: ${
          role == "assistant" ? "red" : "black"
        }">${role}`,
      content_or_function_call: (f) =>
        f.arguments ? inspect(JSON.parse(f.arguments)) : f
    },
    layout: "auto",
    title: {
      combined: "foo"
    }
  }
)
)}

function _21(md){return(
md`## Cell Values to Include

tick cells to include in the next prompt`
)}

function _feedback_cells_selector(Inputs,variables,inspect){return(
Inputs.table(
  Object.entries(variables)
    .map(([name, v]) => ({
      name,
      value: inspect(v._value).innerText.trim()
    }))
    .filter((v) => v.name !== "null"),
  {
    layout: "auto",
    value: []
  }
)
)}

function _feedback_prompt(feedback_cells){return(
feedback_cells.length > 0
  ? `
The notebook contains:
${feedback_cells
  .map((cell) => `  - cell "${cell.name}" is ${cell.value}\n`)
  .join("")}`
  : ""
)}

function _24(md){return(
md`### AI Settings`
)}

function _OPENAI_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "OPENAI_API_KEY",
    placeholder: "paste openAI key here"
  }),
  localStorageView("OPENAI_API_KEY")
)
)}

function _api_endpoint(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "Completion API endpoint"
  }),
  localStorageView("OPENAI_API_ENDPOINT", {
    defaultValue: "https://api.openai.com/v1/chat/completions"
  })
)
)}

function _settings(Inputs,view,localStorageView){return(
{
  prompt:
    '\nThe notebook contains:\n  - cell "form" is Object {a: "", b: ""}\nUsing the already imported view literal for configuring a ChatGPT session. Example response \n\n{\n  model: "gpt-3.5-turbo"\n  temperature: 0.7\n  max_tokens: 1000\n  top_p: 1\n  frequency_penalty: 0\n  presence_penalty: 0\n}\n\nUse Inputs.select for model, Inputs.range for max_tokens etc.',
  time: 1699384189902,
  comment:
    "Creating a form to configure a ChatGPT session. The form includes a select input for model, and range inputs for temperature, max_tokens, top_p, frequency_penalty, and presence_penalty."
} &&
  Inputs.bind(
    view`
    <div>${[
      "model",
      Inputs.select(
        [
          "gpt-3.5-turbo-1106",
          "gpt-3.5-turbo",
          "gpt-3.5-turbo-0301",
          "gpt-3.5-turbo-0613",
          "gpt-3.5-turbo-16k",
          "gpt-3.5-turbo-16k-0613",
          "gpt-3.5-turbo-instruct",
          "gpt-3.5-turbo-instruct-0914",
          "gpt-4-1106-preview",
          "gpt-4",
          "gpt-4-32k",
          "gpt-4-0314",
          "gpt-4-0613"
        ].sort(),
        { label: "model" }
      )
    ]}</div>
    <div>${[
      "temperature",
      Inputs.range([0, 1], { step: 0.1, value: 0.7, label: "temperature" })
    ]}</div>
    <div>${[
      "max_tokens",
      Inputs.range([1, 4000], { value: 1000, label: "max_tokens" })
    ]}</div>
    <div>${[
      "top_p",
      Inputs.range([0, 1], { step: 0.1, value: 1, label: "top_p" })
    ]}</div>
    <div>${[
      "frequency_penalty",
      Inputs.range([0, 1], { step: 0.1, value: 0, label: "frequency_penalty" })
    ]}</div>
    <div>${[
      "presence_penalty",
      Inputs.range([0, 1], { step: 0.1, value: 0, label: "presence_penalty" })
    ]}</div>
  `,
    localStorageView("NOTEBOOK_WRITER", {
      defaultValue: {
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      json: true
    })
  )
)}

function _system_prompt(){return(
`
I am programming an observablehq notebook. You are an inline tool. Our notebook is empty

If the question requires clarification, generate a markdown cell to express your questions.

When a cell is updated I may respond with relevant outputs. 

EXAMPLES
========

upsert_cell({
  comment: "import <LIBRARY> with dynamic ES6 module import",
  cell_name: <CELL_NAME>,
  code: import(<URL>)
})

upsert_cell({
  comment: "Create SVG, must be wrapped in hypertext-literal",
  cell_name: "svg",
  code: "htl.html\`<svg>\`"
})

upsert_cell({
  comment: "Setup range slider using inbuilt Inputs library"
  cell_name: "viewof range",
  code: "Inputs.range([0, 10], {label: "set the range", value: 0})"
})
`
)}

function _feedback_cells($0,feedback_cells_selector){return(
[
  ...$0.querySelectorAll("input[type=checkbox]")
].some((e) => e.checked)
  ? feedback_cells_selector
  : []
)}

function _30(md){return(
md`## Roboco-op Implementation below`
)}

function _ndd(_ndd){return(
_ndd
)}

function _formatted_instruction(response)
{
  if (response.action == "upsert_cell") {
    let code = undefined;
    const prompt = {
      prompt: response.prompt,
      time: response.time,
      comment: response.comment
    };
    if (response.code.trim().startsWith("{")) {
      code = `{ (${JSON.stringify(prompt)})\n${response.code.trim().slice(1)}`;
    } else {
      code = `(${JSON.stringify(prompt)}) && ${response.code}`;
    }
    return `${response.cell_name} = ${code}`;
  }
  return response.content;
}


function _response(on_prompt){return(
on_prompt
)}

function _on_prompt($0,$1,feedback_prompt,prompt)
{
  return $0.send([
    ...$1.value,
    {
      role: "user",
      content: feedback_prompt + prompt
    }
  ]);
}


function _context(){return(
undefined
)}

function _update_context(cells,_,$0)
{
  const context = cells
    .filter((c) => c.prompt)
    .sort((a, b) => a.time - b.time)
    .flatMap((c) => [
      {
        role: "user",
        content: c.prompt
      },
      {
        role: "assistant",
        content: null,
        function_call: {
          name: "upsert_cell",
          arguments: JSON.stringify({
            cell_name: c.cell_name,
            code: c.code,
            comment: c.comment
          })
        }
      }
    ]);
  if (!_.isEqual($0.value, context)) {
    $0.value = context;
  }
}


function _find_prompt(acorn){return(
{
  prompt:
    'write a cell called find_prompt. Using acorn JS parser, search some JS code for the existence of an Object literal containing fields: "prompt", "time", "comment" and return that object.',
  time: 1699380798090,
  comment:
    "This function search for the existence of an object literal containing fields: 'prompt', 'time', 'comment' in an input JavaScript code using the acorn JS parser. It returns the found object."
} &&
  function findPrompt(code) {
    let ast;
    let fixed_code;
    try {
      fixed_code = "() => " + code;
      ast = acorn.parse(fixed_code, { ecmaVersion: 2020 });
    } catch (e) {}
    try {
      fixed_code = "() => (" + code + ")";
      ast = ast || acorn.parse(fixed_code, { ecmaVersion: 2020 });
    } catch (e) {}

    function search(node) {
      if (node.type === "ObjectExpression") {
        const keys = node.properties.map((p) => p.key?.name);
        if (
          keys.includes("prompt") &&
          keys.includes("time") &&
          keys.includes("comment")
        ) {
          const trimmed =
            fixed_code.slice(0, node.start) +
            "{}" +
            fixed_code.slice(node.end + 1);
          return [
            Object.fromEntries(
              node.properties.map((p) => [p.key.name, p.value.value])
            ),
            trimmed.startsWith("() => (")
              ? trimmed
                  .substring(7, trimmed.length - 1)
                  .replace("{}&&", "")
                  .trim()
              : trimmed
          ];
        }
      }
      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          const found = search(node[key]);
          if (found) return found;
        }
      }
    }

    return search(ast) || [undefined, code];
  }
)}

function _cells(code,find_prompt){return(
Object.entries(code).reduce((acc, [name, code]) => {
  if (code === "{return e.input(t)}") return acc; // The data part of a viewof, not authored
  if (name == "hookes_law_diagram") {
    debugger;
  }
  let [prompt, fixed] = find_prompt(code);
  acc.push({
    ...prompt,
    cell_name: name,
    code: fixed
  });
  return acc;
}, [])
)}

function _observableDefinitionToCode(acorn){return(
(source) => {
  try {
    const defn = "(" + source + ")";
    const ast = acorn.parse(defn);
    const functionExpression = ast.body[0].expression;
    if (functionExpression.type !== "FunctionExpression")
      throw functionExpression;
    const block = defn.slice(
      functionExpression.body.start,
      functionExpression.body.end
    );

    const exprMatch = /{return\(\n([\s\S]*)\n\)}$/.exec(block);
    if (exprMatch) return exprMatch[1].trim();
    else return block;
  } catch (e) {
    return undefined;
  }
}
)}

function _code(events,variables,observableDefinitionToCode){return(
events &&
  Object.fromEntries(
    Object.entries(variables).map(([name, v]) => [
      name,
      observableDefinitionToCode(v._definition.toString())
    ])
  )
)}

function _variables(_mainVariables,excludes){return(
Object.fromEntries(
  _mainVariables
    .filter((v) => !excludes.includes(v._name))
    .map((v) => [v._name, v])
)
)}

function _events(_events){return(
_events
)}

function _excludes(){return(
[
  "viewof feedback_cells_selector",
  "feedback_cells_selector",
  "feedback_cells",
  "feedback_prompt",
  "find_prompt",
  "viewof feedback_cells",
  "null",
  "viewof reset",
  "reset",
  "viewof prompt",
  "prompt",
  "suggestion",
  "initial last_salient_summary",
  "mutable last_salient_summary",
  "initial context",
  "mutable context",
  "observableDefinitionToCode",
  "viewof model",
  "model",
  "viewof OPENAI_API_KEY",
  "OPENAI_API_KEY",
  "settings",
  "system_prompt",
  "functions",
  "viewof history",
  "history",
  "viewof ask",
  "ask",
  "openAiResponse",
  "instruction",
  "acorn",
  "inspect",
  "dirty_json",
  "parseJSON",
  "update_context",
  "viewof suggestion",
  "formatted_instruction",
  "response",
  "on_prompt",
  "viewof context_viz",
  "context_viz",
  "context",
  "code",
  "cells",
  "events",
  "viz",
  "vizUpdater",
  "ndd",
  "_ndd",
  "excludes",
  "_events",
  "variables",
  "_mainVariables",
  "on_salient_event"
]
)}

function _functions(){return(
[
  {
    name: "upsert_cell",
    description: "Upsert a cell in notebook",
    parameters: {
      type: "object",
      properties: {
        cell_name: {
          type: "string",
          description: "Name of cell to add"
        },
        code: {
          type: "string",
          description: "Single expression or code block"
        },
        comment: {
          type: "string",
          description: "Explaination for code"
        }
      },
      required: ["cell_name", "code", "comment"]
    }
  },
  {
    name: "wait",
    description: "Wait for next user instruction",
    parameters: { type: "object", properties: {} }
  }
]
)}

function _history(Inputs){return(
Inputs.input([])
)}

function _ask(flowQueue){return(
flowQueue({ timeout_ms: 90000 })
)}

function _48(ask){return(
ask
)}

async function _openAiResponse(api_endpoint,OPENAI_API_KEY,functions,system_prompt,ask,$0)
{
  const response = await fetch(api_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      functions: functions,
      function_call: { name: "upsert_cell" },
      messages: [
        {
          role: "system",
          content: system_prompt
        },
        ...ask
      ],
      ...$0.value
    })
  });

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);

  return response.json();
}


function _50(parseJSON,openAiResponse){return(
parseJSON(openAiResponse.choices[0].message.function_call.arguments)
)}

function _instruction(openAiResponse,parseJSON,ask)
{
  const message = openAiResponse.choices[0].message;
  if (message.function_call === undefined)
    return {
      action: "reply",
      content: message.content
    };
  return {
    ...parseJSON(message.function_call.arguments),
    prompt: ask[ask.length - 1].content,
    action: message.function_call.name,
    time: Date.now()
  };
}


function _52($0,instruction){return(
$0.resolve(instruction)
)}

function _parseJSON(dirty_json){return(
(str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    try {
      return eval("(" + str + ")");
    } catch (e) {
      return dirty_json.parse(str);
    }
  }
}
)}

function _acorn(require){return(
require("acorn")
)}

function _dirty_json(){return(
import("https://cdn.skypack.dev/dirty-json@0.9.2?min")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["DALL·E 2023-11-07 22@2.30.52 - A photo-realistic image of a cyborg with a sleek, metallic frame, detailed with a striking red visor, working alongside an engineer in a cluttered hig.png", {url: new URL("./files/554f9a7e6fcfb7f595cb39ca424faa6057f8fc90af50c1b4284afc54012d2eb91e29bc5769de9aee787189eb3f88fca83557e44ca7c683114de6d14d77faec48.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer("example_markdown")).define("example_markdown", ["md"], _example_markdown);
  main.variable(observer("hexbin_heatmap")).define("hexbin_heatmap", ["Plot","olympians"], _hexbin_heatmap);
  main.variable(observer("blob_url")).define("blob_url", ["XMLSerializer","hexbin_heatmap"], _blob_url);
  main.variable(observer("viewof form")).define("viewof form", ["cautious","view","Inputs"], _form);
  main.variable(observer("form")).define("form", ["Generators", "viewof form"], (G, _) => G.input(_));
  main.variable(observer()).define(["form"], _6);
  main.variable(observer("THREE")).define("THREE", _THREE);
  main.variable(observer("demo_scene")).define("demo_scene", ["THREE","width","blob_url"], _demo_scene);
  main.variable(observer("relativity_derivation")).define("relativity_derivation", ["md","tex"], _relativity_derivation);
  main.variable(observer("pong_game")).define("pong_game", ["width"], _pong_game);
  main.variable(observer("neon_tictactoe_game")).define("neon_tictactoe_game", _neon_tictactoe_game);
  main.variable(observer("youtube_movie")).define("youtube_movie", ["html"], _youtube_movie);
  main.variable(observer("dead_emoji")).define("dead_emoji", ["d3"], _dead_emoji);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof prompt")).define("viewof prompt", ["Inputs"], _prompt);
  main.variable(observer("prompt")).define("prompt", ["Generators", "viewof prompt"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","suggestion"], _17);
  main.variable(observer("viewof suggestion")).define("viewof suggestion", ["Inputs","formatted_instruction"], _suggestion);
  main.variable(observer("suggestion")).define("suggestion", ["Generators", "viewof suggestion"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof context_viz")).define("viewof context_viz", ["Inputs","context","html","inspect"], _context_viz);
  main.variable(observer("context_viz")).define("context_viz", ["Generators", "viewof context_viz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof feedback_cells_selector")).define("viewof feedback_cells_selector", ["Inputs","variables","inspect"], _feedback_cells_selector);
  main.variable(observer("feedback_cells_selector")).define("feedback_cells_selector", ["Generators", "viewof feedback_cells_selector"], (G, _) => G.input(_));
  main.variable(observer("feedback_prompt")).define("feedback_prompt", ["feedback_cells"], _feedback_prompt);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof api_endpoint")).define("viewof api_endpoint", ["Inputs","localStorageView"], _api_endpoint);
  main.variable(observer("api_endpoint")).define("api_endpoint", ["Generators", "viewof api_endpoint"], (G, _) => G.input(_));
  main.variable(observer("viewof settings")).define("viewof settings", ["Inputs","view","localStorageView"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("system_prompt")).define("system_prompt", _system_prompt);
  main.variable(observer("feedback_cells")).define("feedback_cells", ["viewof feedback_cells_selector","feedback_cells_selector"], _feedback_cells);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("ndd")).define("ndd", ["_ndd"], _ndd);
  main.variable(observer("formatted_instruction")).define("formatted_instruction", ["response"], _formatted_instruction);
  main.variable(observer("response")).define("response", ["on_prompt"], _response);
  main.variable(observer("on_prompt")).define("on_prompt", ["viewof ask","mutable context","feedback_prompt","prompt"], _on_prompt);
  main.define("initial context", _context);
  main.variable(observer("mutable context")).define("mutable context", ["Mutable", "initial context"], (M, _) => new M(_));
  main.variable(observer("context")).define("context", ["mutable context"], _ => _.generator);
  main.variable(observer("update_context")).define("update_context", ["cells","_","mutable context"], _update_context);
  main.variable(observer("find_prompt")).define("find_prompt", ["acorn"], _find_prompt);
  main.variable(observer("cells")).define("cells", ["code","find_prompt"], _cells);
  main.variable(observer("observableDefinitionToCode")).define("observableDefinitionToCode", ["acorn"], _observableDefinitionToCode);
  main.variable(observer("code")).define("code", ["events","variables","observableDefinitionToCode"], _code);
  main.variable(observer("variables")).define("variables", ["_mainVariables","excludes"], _variables);
  main.variable(observer("events")).define("events", ["_events"], _events);
  main.variable(observer("excludes")).define("excludes", _excludes);
  const child1 = runtime.module(define1).derive(["excludes"], main);
  main.import("_ndd", child1);
  main.import("events", "_events", child1);
  main.import("mainVariables", "_mainVariables", child1);
  main.variable(observer("functions")).define("functions", _functions);
  main.variable(observer("viewof history")).define("viewof history", ["Inputs"], _history);
  main.variable(observer("history")).define("history", ["Generators", "viewof history"], (G, _) => G.input(_));
  main.variable(observer("viewof ask")).define("viewof ask", ["flowQueue"], _ask);
  main.variable(observer("ask")).define("ask", ["Generators", "viewof ask"], (G, _) => G.input(_));
  main.variable(observer()).define(["ask"], _48);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["api_endpoint","OPENAI_API_KEY","functions","system_prompt","ask","viewof settings"], _openAiResponse);
  main.variable(observer()).define(["parseJSON","openAiResponse"], _50);
  main.variable(observer("instruction")).define("instruction", ["openAiResponse","parseJSON","ask"], _instruction);
  main.variable(observer()).define(["viewof ask","instruction"], _52);
  main.variable(observer("parseJSON")).define("parseJSON", ["dirty_json"], _parseJSON);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  main.variable(observer("acorn")).define("acorn", ["require"], _acorn);
  const child4 = runtime.module(define4);
  main.import("inspect", child4);
  const child5 = runtime.module(define5);
  main.import("view", child5);
  main.import("cautious", child5);
  main.variable(observer("dirty_json")).define("dirty_json", _dirty_json);
  return main;
}
