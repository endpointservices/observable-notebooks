import define1 from "./c7a3b20cec5d4dd9@730.js";
import define2 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# Roboco-op: Observable Runtime Decompiler`
)}

function _2(cells){return(
cells
)}

function _3($0){return(
$0
)}

function _4(md){return(
md`### find_prompt: `
)}

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
    let ast_type;
    try {
      fixed_code = "async () => " + code;
      ast = acorn.parse(fixed_code, { ecmaVersion: 2020 });
      ast_type = "block";
    } catch (e) {
      try {
        fixed_code = "() => (" + code + ")";
        ast = acorn.parse(fixed_code, { ecmaVersion: 2020 });
        ast_type = "expr";
      } catch (e) {}
    }

    function search(node, parent) {
      if (node?.type === "ObjectExpression") {
        const keys = node.properties.map((p) => p.key?.name || p.key?.value);
        if (
          keys.includes("prompt") &&
          keys.includes("time") &&
          keys.includes("comment")
        ) {
          const info = Object.fromEntries(
            node.properties.map((p) => [
              p.key.name || p.key.value,
              p.value.value
            ])
          );

          let trimmed;
          if (parent?.operator == "&&" && parent.left == node) {
            trimmed =
              fixed_code.slice(0, parent.start) +
              fixed_code.slice(parent.right.start, parent.right.end) +
              fixed_code.slice(parent.end);
          } else if (parent.type == "ExpressionStatement") {
            trimmed =
              fixed_code.slice(0, parent.start) + fixed_code.slice(parent.end);
          } else {
            trimmed =
              fixed_code.slice(0, node.start) +
              "{}" +
              fixed_code.slice(node.end);
          }
          return [
            info,
            ast_type == "expr"
              ? trimmed.substring(7, trimmed.length - 1).trim()
              : trimmed.substring(11).trim()
          ];
        }
      }
      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          const found = search(node[key], node);
          if (found) return found;
        }
      }
    }

    return search(ast, null) || [undefined, code];
  }
)}

function _find_prompt_tests(createSuite){return(
createSuite("find_prompt")
)}

function _example_source(){return(
`async function(crtWarpAdjustment,deps)
{
  ({
    prompt:
      "We need to use a displacement map, which requires an image. So lets generate an image based on the crtWarpAdjustment settings that does the barrel and trapazoid distortion and saves it as an image blob",
    time: 1701202409079,
    comment:
      "Generate a CRT warp image based on barrel and trapezoid distortion settings"
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = (canvas.width = 200);
  const height = (canvas.height = 100);

  // Generate the barrel warp as a radial gradient
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    Math.max(width, height) / 2
  );
  gradient.addColorStop(0, \`rgba(0,0,0,0)\`);
  gradient.addColorStop(1, \`rgba(0,0,0,\${crtWarpAdjustment.barrel_warp})\`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Apply the trapezoid warp by scaling the canvas
  ctx.setTransform(1, 0, crtWarpAdjustment.trapezoid_warp, 1, 0, 0);
  ctx.drawImage(canvas, 0, 0);

  // Convert canvas to an image blob
  const warp = await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    });
  });
  deps.register("crtWarpDisplacementMap", warp, 1);
  return warp;
}`
)}

function _example_code(observableDefinitionToCode,example_source){return(
observableDefinitionToCode(example_source)
)}

function _example_prompt(find_prompt,example_code)
{
  debugger;
  return find_prompt(example_code);
}


function _10(find_prompt_tests,expect,find_prompt,observableDefinitionToCode){return(
find_prompt_tests.test("simple expressions (1)", async () => {
  const source = `function(md){return(({"prompt":"p","time":1,"comment":"c"}) && md\`\`)}`;
  expect(find_prompt(observableDefinitionToCode(source))).toEqual([
    { prompt: "p", time: 1, comment: "c" },
    "md``"
  ]);
})
)}

function _11(find_prompt_tests,expect,find_prompt,observableDefinitionToCode){return(
find_prompt_tests.test("simple expressions (1)", async () => {
  const source = `function(md){return({"prompt":"p","time":1,"comment":"c"} && md\`\`)}`;
  expect(find_prompt(observableDefinitionToCode(source))).toEqual([
    { prompt: "p", time: 1, comment: "c" },
    "md``"
  ]);
})
)}

function _12(find_prompt_tests,expect,find_prompt){return(
find_prompt_tests.test("simple expression (1)", async () => {
  const source = `{
  prompt: "p",
  time: 1,
  comment: "c"
} &&
  md\` \``;
  expect(find_prompt(source)).toEqual([
    { prompt: "p", time: 1, comment: "c" },
    "md` `"
  ]);
})
)}

function _13(find_prompt_tests,expect,find_prompt){return(
find_prompt_tests.test("simple block (1)", async () => {
  const source = `({"prompt":"p","time":1,"comment":"c"}) && md\`\``;
  expect(find_prompt(source)).toEqual([
    { prompt: "p", time: 1, comment: "c" },
    "md``"
  ]);
})
)}

function _14(find_prompt_tests,observableDefinitionToCode,expect,find_prompt){return(
find_prompt_tests.test("simple block", async () => {
  const source = `function(width){
  ({ prompt: "p", time: 1, comment: "c" })
  return width + 1;
}`;
  const code = observableDefinitionToCode(source);
  expect(find_prompt(code)).toEqual([
    { prompt: "p", time: 1, comment: "c" },
    `{
  
  return width + 1;
}`
  ]);
})
)}

function _15(find_prompt_tests,observableDefinitionToCode,expect,find_prompt){return(
find_prompt_tests.test("await block", async () => {
  const source = `async function(width){
  ({ prompt: "p", time: 1, comment: "c" })
  return await width + 1;
}`;
  const code = observableDefinitionToCode(source);
  debugger;
  expect(find_prompt(code)).toEqual([
    { prompt: "p", time: 1, comment: "c" },
    `{
  
  return await width + 1;
}`
  ]);
})
)}

function _16(update_context){return(
update_context
)}

function _17(md){return(
md`## observableDefinitionToCode`
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

    const exprMatch = /{return\(([\s\S]*)\)}$/.exec(block);
    if (exprMatch) return exprMatch[1].trim();
    else return block;
  } catch (e) {
    return undefined;
  }
}
)}

function _observableDefinitionToCode_tests(createSuite){return(
createSuite("find_prompt")
)}

function _20(observableDefinitionToCode_tests,expect,observableDefinitionToCode){return(
observableDefinitionToCode_tests.test(
  "observableDefinitionToCode expr (1)",
  async () => {
    const source = `function(md){return({"prompt":"p","time":1,"comment":"c"} && md\`\`)}`;
    expect(observableDefinitionToCode(source)).toEqual(
      `{"prompt":"p","time":1,"comment":"c"} && md\`\``
    );
  }
)
)}

function _21(observableDefinitionToCode_tests,expect,observableDefinitionToCode){return(
observableDefinitionToCode_tests.test(
  "observableDefinitionToCode expr (2)",
  async () => {
    const source = `function(md){return(
{
  prompt: "p",
  time: 1,
  comment: "c"
} &&
  md\` \`
)}`;
    expect(observableDefinitionToCode(source)).toEqual(`{
  prompt: "p",
  time: 1,
  comment: "c"
} &&
  md\` \``);
  }
)
)}

function _22(observableDefinitionToCode_tests,expect,observableDefinitionToCode){return(
observableDefinitionToCode_tests.test(
  "observableDefinitionToCode block (1)",
  async () => {
    const source = `function(width){
  return width + 1;
}`;
    expect(observableDefinitionToCode(source)).toEqual(`{
  return width + 1;
}`);
  }
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["cells"], _2);
  main.variable(observer()).define(["viewof context_viz"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("find_prompt")).define("find_prompt", ["acorn"], _find_prompt);
  main.variable(observer("viewof find_prompt_tests")).define("viewof find_prompt_tests", ["createSuite"], _find_prompt_tests);
  main.variable(observer("find_prompt_tests")).define("find_prompt_tests", ["Generators", "viewof find_prompt_tests"], (G, _) => G.input(_));
  main.variable(observer("example_source")).define("example_source", _example_source);
  main.variable(observer("example_code")).define("example_code", ["observableDefinitionToCode","example_source"], _example_code);
  main.variable(observer("example_prompt")).define("example_prompt", ["find_prompt","example_code"], _example_prompt);
  main.variable(observer()).define(["find_prompt_tests","expect","find_prompt","observableDefinitionToCode"], _10);
  main.variable(observer()).define(["find_prompt_tests","expect","find_prompt","observableDefinitionToCode"], _11);
  main.variable(observer()).define(["find_prompt_tests","expect","find_prompt"], _12);
  main.variable(observer()).define(["find_prompt_tests","expect","find_prompt"], _13);
  main.variable(observer()).define(["find_prompt_tests","observableDefinitionToCode","expect","find_prompt"], _14);
  main.variable(observer()).define(["find_prompt_tests","observableDefinitionToCode","expect","find_prompt"], _15);
  main.variable(observer()).define(["update_context"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("observableDefinitionToCode")).define("observableDefinitionToCode", ["acorn"], _observableDefinitionToCode);
  main.variable(observer("viewof observableDefinitionToCode_tests")).define("viewof observableDefinitionToCode_tests", ["createSuite"], _observableDefinitionToCode_tests);
  main.variable(observer("observableDefinitionToCode_tests")).define("observableDefinitionToCode_tests", ["Generators", "viewof observableDefinitionToCode_tests"], (G, _) => G.input(_));
  main.variable(observer()).define(["observableDefinitionToCode_tests","expect","observableDefinitionToCode"], _20);
  main.variable(observer()).define(["observableDefinitionToCode_tests","expect","observableDefinitionToCode"], _21);
  main.variable(observer()).define(["observableDefinitionToCode_tests","expect","observableDefinitionToCode"], _22);
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  const child2 = runtime.module(define2).derive(["find_prompt","observableDefinitionToCode"], main);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("update_context", child2);
  main.import("on_prompt", child2);
  main.import("api_call_response", child2);
  main.import("context", child2);
  main.import("prompt", child2);
  main.import("suggestion", child2);
  main.import("settings", child2);
  main.import("OPENAI_API_KEY", child2);
  main.import("api_endpoint", child2);
  main.import("feedback_prompt", child2);
  main.import("feedback_cells_selector", child2);
  main.import("acorn", child2);
  return main;
}
