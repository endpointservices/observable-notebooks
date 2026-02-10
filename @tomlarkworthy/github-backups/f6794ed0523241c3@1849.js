import define1 from "./c49519b3eb941810@1436.js";
import define2 from "./a89ea9f0ad8c6226@1486.js";
import define3 from "./98f34e974bb2e4bc@958.js";
import define4 from "./f109935193c0deba@4551.js";
import define5 from "./b69d20b9e3533ef8@158.js";
import define6 from "./db42ae70222a8b08@1215.js";
import define7 from "./cdc303fcc82a630f@262.js";
import define8 from "./048a17a165be198d@273.js";
import define9 from "./e3659730ba3df002@40.js";
import define10 from "./84194c694539e103@2376.js";
import define11 from "./5845e1ca935fea5a@226.js";
import define12 from "./db80e603859226c1@23.js";

function _1(md){return(
md`# \`robocoop3\`: agents-as-functions

\`\`\`js
import {robocoop3} from "@tomlarkworthy/robocoop-3"
\`\`\``
)}

function _agent1(robocoop3){return(
robocoop3({ prompt: "Are you working?" })
)}

function _3(md){return(
md`Calling \`viewof agent = robocoop3({...})\` creates a prompting UI and an in-notebook agent whose responses are streamed to the value of \`agent\`. You can create many such agents at-once. The function is essentially the agentic loop expressed as a generator.`
)}

function _4(agent1){return(
agent1
)}

function _5(md){return(
md`## Features

- Multiple providers: OpenAI, Anthropic and Ollama (for local operation). There is a demo provider that will run \`gpt5-mini\` so you can try it out.
- Parallel tool calling
- Multi-turn dialogue.
- Test driven development.
- Operates on Observable's low level runtime representation directly, not Notebook 1.0 syntax (unlike Robocoop-2, which is still useful for high level coding assistance).
- Scriptable
- Also works in [Lopecode](https://observablehq.com/@tomlarkworthy/jumpgate?source=https://observablehq.com/@tomlarkworthy/robocoop-3&export_state=%7B%22hash%22%3A%22%23view%3D%40tomlarkworthy%2Frobocoop-3%22%2C%22headless%22%3Atrue%2C%22title%22%3A%22%40tomlarkworthy%2Frobocoop-3%22%7D&git_url=https%3A%2F%2Fgithub.com%2Ftomlarkworthy%2Flopebooks&load_source=true&commit=false)
`
)}

function _6(md){return(
md`## TODO
- Struggles a bit with imports, I think we should support defining variables that reference other modules and lazily auto-import
- Include a screenshot of the DOM if its a DOM node or image?`
)}

function _7(md){return(
md`## Builder Function`
)}

function _robocoop3(keepalive,robocoopPrototypeModule,cloneDataflow,robocoop_template,Node,Event)
{
  keepalive(robocoopPrototypeModule, "toolRegistry_sync");
  return ({ prompt = undefined } = {}) => {
    const root = document.createElement("div");
    root.value = null;
    root.records = [];
    root.textContent = "Loading…";

    let dispose = null;
    let inner = null;
    let lastRecordsLen = 0;

    let lastFinishedSteps = 0;

    const noopObserver = () => ({});

    const countFinishedSteps = (convo) => {
      const steps = Array.isArray(convo?.steps) ? convo.steps : [];
      let n = 0;
      for (const s of steps)
        if (s?.stepFinish || Number.isFinite(s?.finishedAt)) n++;
      return n;
    };

    const start = () => {
      if (dispose) return;

      dispose = cloneDataflow(robocoop_template, (name) => {
        if (name === "viewof robocoopPrototype") {
          return {
            fulfilled: (el) => {
              if (!(el instanceof Node)) return;
              inner = el;
              root.replaceChildren(el);
            }
          };
        }

        if (name === "agent_conversation") {
          return {
            fulfilled: (val) => {
              root.value = val;

              const finished = countFinishedSteps(val);
              const stepsLen = Array.isArray(val?.steps) ? val.steps.length : 0;

              const emitOnStepComplete = finished > lastFinishedSteps;
              const emitOnClear = stepsLen === 0 && lastFinishedSteps > 0;

              if (emitOnStepComplete || emitOnClear) {
                lastFinishedSteps = finished;
                root.dispatchEvent(new Event("input", { bubbles: true }));
              }
            }
          };
        }

        if (name === "viewof agent_prompt") {
          return {
            fulfilled: (prompt_ui) => {
              prompt_ui.value = prompt;
            }
          };
        }

        if (name === "agent_records") {
          return {
            fulfilled: (recs) => {
              const arr = Array.isArray(recs) ? recs : [];
              if (arr.length < lastRecordsLen) lastRecordsLen = 0;
              root.records = arr;
              for (let i = lastRecordsLen; i < arr.length; i++) {
                root.dispatchEvent(
                  new CustomEvent("record", {
                    detail: arr[i],
                    bubbles: true
                  })
                );
              }
              lastRecordsLen = arr.length;
            }
          };
        }

        return noopObserver();
      });

      root.dispose = () => {
        try {
          inner = null;
          lastRecordsLen = 0;
          lastFinishedSteps = 0;
          dispose?.();
        } finally {
          dispose = null;
        }
      };
    };

    start();
    return root;
  };
}


function _9(md){return(
md`## Prompt`
)}

function _system_prompt(){return(
`You are Robocoop3: an autonomous coding agent operating inside an Observable Runtime.

Important terminology note:
- This loop operates on the low-level *runtime variable* representation (Observable Runtime Variables), not the high-level visual "cell" Notebook concept.
- Therefore, the tools below talk about and operate on *variables*. Some variables often correspond to a user-visible cell, but that mapping is not always 1:1.

Your job: implement the user’s requested change by editing notebook *variables* through the provided tools, and ensure the notebook remains coherent. If tests exist, make *all reachable* test_* variables pass. Research the context of the users request before responding.

You may *modify the live notebook* by calling tools like upsert_variables/delete_variable.

Environment model (Observable semantics)
- A “variable” is a named reactive value in the runtime graph. Each variable is defined as a function of its declared inputs.
- When you redefine a variable, downstream variables reactively re-evaluate (pending).
   - Variables transition through "pending" and ("error" or "fulfilled") states.
   - Variable are resolved in topological order with glitch-free operation
   - "error" variable halt reactive propogation (variables that throw).
- UI variables are typically named "viewof x" and return a DOM element; the value variable "x" is streamed from the "value" property of the "viewof x" value.
- Implicit variables reference external Javascript in a closure (() => x).
- Avoid hidden global state. Prefer deterministic variable definitions.
- Only "reachable" variables are computed, where reachable means they are either visible on the page or are dependants of something visible on the page.
- The Runtime is rendered into a webpage, so your execution environment is hosted a browser
   - you have Javascript at your disposal. You can execute fetch calls with eval to gather information from the interner (CORS permittting).
   - You can check the value of DOM nodes on the page.
   - You can trigger DOM events like button clicks.

Tooling (your interface to the notebook)
Use tools proactively. Don’t guess what the notebook contains.

Discovery & inspection
- list_modules({}) → list all modules loaded in the runtime. 
- list_variables({module}) → list runtime variables as canonical <variable> XML for a module (includes anonymous variables).
  - Use this to discover variable ids (the \`id\` attribute) and current definitions/inputs/values.
  - list_variables is often preferable over search, because explaination is often nearby to implementation.
- search_variables({query, limit}) → search variables (including anonymous) by name/definition/string-value and return matches as <variable> XML. Useful for searching over the entire runtime.
  - Note: supply limit (e.g. 20).
- eval({code, module, variable_id_or_name}) → evaluate a JS expression, optionally scoped to a runtime variable.
  - If \`code\` evaluates to a function, it will be applied to the target variable value.
  - Use variable_id_or_name:"" for no target variable.
  - Use module:"" to auto-resolve by name (prefers main when ambiguous).

Editing
- upsert_variables({xml}) → bulk upsert runtime variables from canonical <variable> XML.
  - Updates by variable id when possible; can also create new variables.
  - You should generally:
    1) get the existing <variable> via list_variables or search_variables
    2) edit the <definition>, <inputs>, and (if needed) name/module
    3) submit the modified XML back via upsert_variables
- delete_variable({name}) → delete a runtime variable by name.
  - Prefer upsert_variables for edits; use delete_variable for removals.

Testing
- run_tests({filter}) → run reachable test_* variables and return results.
  - Use filter:"" to run all tests.

Operational workflow (follow this loop)
1) Clarify the goal:
   - If the user request is ambiguous, ask a short clarifying question *only if needed*.
2) Inspect:
   - list_modules / list_variables / search_variables / eval to find relevant code and state.
   - Research the notebook environment until you understand the codeflow.
3) Plan minimal changes:
   - Prefer small, local edits that preserve existing functionality.
   - Don’t break other reachable variables.
   - Do more research and experiments if you are not sure how to acheive something, you can often find other examples in the runtime codebase.
4) Implement:
   - Use upsert_variables to update/add variables.
5) Verify:
   - Check runtime state to see if the outcome is expected
   - run_tests({filter:""}) until passing.
6) Iterate:
   - Go back to step 2 if you have not accomplished your goal yet.
   - Remove ambiguity through non-destructive eval experiments.
7) Report:
   - After tests pass (or if no tests), provide a brief plain-language summary of what changed and which variables were modified.

Quality rules
- Always prefer editing existing variables over creating duplicates with new names.
- Keep UI responsive: avoid long blocking loops; avoid excessive DOM work inside reactive variables.
- If you must change interfaces, update all dependents and tests accordingly.

Failure handling
- If a tool returns validation errors, fix the call (schemas can be strict).
- If you cannot find a referenced variable, use list_variables/search_variables to locate it.
- If tests are missing, create minimal tests only if the user asked for it; otherwise validate by inspection and small runtime checks (get_variable_value/eval).

Start every task by discovering the notebook state with list_modules and list_variables/search_variables, then proceed iteratively.

Never guess why something is happening, or jumping to generic advice. The *whole* runtime is inspectable to you, all the evidence you need is at your disposal. Explore the code implementations and live runtime values until you understand the problem precicely before making suggestions. You are wasting the users time if you assert soemthing you have not observed to be true in the present state of the system. Ensure suggestions take into account the current codebase.
`
)}

function _11(md){return(
md`## TDD`
)}

function _test_cell_map_coverage(expect,coverage_failures)
{
  expect(coverage_failures).toEqual([]);
  return "all variables can be decompiled into higher level cells";
}


function _13(md){return(
md`## Templating

The template extracts a prototype into a reusable component`
)}

async function _robocoop_template(lookupVariable,robocoopPrototypeModule)
{
  const names = [
    // 1) Top-level UI shell (the thing you embed)
    "viewof robocoopPrototype",
    "robocoopPrototype",
    "robocoopPrototype_record_stream",

    // 2) UI attachment / mounting control
    "viewof agent_ui_attached",
    "agent_ui_attached",

    // 3) Run controls (prompt + run + cancel/clear)
    "viewof agent_prompt",
    "agent_prompt",
    "agent_run_effect",

    "viewof agent_cancel",
    "agent_cancel",
    "agent_cancel_effect",

    "viewof agent_clear",
    "agent_clear",
    "agent_clear_effect",

    // 4) Conversation rendering (DOM nodes + sync)
    "agent_conversation_view_holder",
    "agent_conversation_view",
    "agent_conversation_dom_sync",

    // 5) Per-instance conversation state (THIS is the key to separating logs)
    "initial agent_records",
    "mutable agent_records",
    "agent_records",

    "mutable agent_run_history",
    "agent_run_history",

    "appendAgentRecord",

    // 6) Conversation model (derive structured convo from records)
    "agentConversationFromRecords",
    "agent_conversation",

    // 7) Provider selection + provider configuration UI/state
    "open_ai_models",
    "anthropic_models",

    "viewof provider_choice",
    "provider_choice",

    "viewof OPENAI_API_KEY",
    "OPENAI_API_KEY",
    "viewof provider_openai_config",
    "provider_openai_config",

    "viewof ANTHROPIC_API_KEY",
    "ANTHROPIC_API_KEY",
    "viewof provider_anthropic_config",
    "provider_anthropic_config",

    "viewof provider_ollama_config",
    "provider_ollama_config",

    // 8) Agent configuration (tools/module target/system prompt)
    "viewof agent_config",
    "agent_config",

    "agent_target_module",
    "agent_system_prompt",
    "system_prompt",

    // 9) Agent runtime (loop + run outputs)
    "agent_loop",
    "normalizeUsage",
    "agent_run",
    "agent_reply",
    "agent_stop"
  ];
  const vars = await lookupVariable(names, robocoopPrototypeModule);

  let err = null;
  if ((err = vars.findIndex((v) => v === undefined)) + 1) {
    throw new Error(`robocoop_template: missing ${names[err]}`);
  }

  return vars;
}


function _16(currentModules){return(
currentModules
)}

function _17(md){return(
md`## UI`
)}

function _robocoopPrototype(reversibleAttach,agent_ui_attached,$0,$1,$2,agent_conversation_view_holder,provider_choice,$3,$4,$5,$6,$7,$8,$9,tabbedPane)
{
  const root = document.createElement("div");
  root.value = null;
  root.records = [];
  root.style.display = "grid";
  root.style.gap = "12px";
  root.style.fontFamily =
    "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  const panel = (label, nodes) => {
    const wrap = document.createElement("div");
    wrap.style.border = "1px solid #e5e5e5";
    wrap.style.borderRadius = "10px";
    wrap.style.padding = "10px";
    wrap.style.display = "grid";
    wrap.style.gap = "8px";
    const head = document.createElement("div");
    if (head) {
      head.textContent = label;
      head.style.fontWeight = "600";
      head.style.color = "#333";
      wrap.appendChild(head);
    }
    for (const n of nodes) if (n) wrap.appendChild(n);
    return wrap;
  };

  const buttonRow = (nodes) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "8px";
    row.style.flexWrap = "wrap";
    row.style.alignItems = "center";
    for (const n of nodes) if (n) row.appendChild(n);
    return row;
  };

  const runPanel = document.createElement("div");
  runPanel.style.display = "grid";
  runPanel.style.gap = "12px";
  runPanel.appendChild(
    panel(undefined, [
      reversibleAttach(!agent_ui_attached, $0),
      buttonRow([
        reversibleAttach(!agent_ui_attached, $1),
        reversibleAttach(!agent_ui_attached, $2)
      ]),
      reversibleAttach(!agent_ui_attached, agent_conversation_view_holder)
    ])
  );

  const providerNotes = (() => {
    const n = document.createElement("div");
    n.style.fontSize = "12px";
    n.style.color = "#444";
    if (provider_choice === "demo") {
      n.textContent =
        'Demo provider uses the OpenAI proxy endpoint (no authentication) and forces model "gpt-5-mini".';
    } else if (provider_choice === "openai") {
      n.textContent =
        "OpenAI provider uses the Responses API with your OPENAI_API_KEY.";
    } else if (provider_choice === "anthropic") {
      n.textContent =
        "Anthropic provider uses the Messages API with your ANTHROPIC_API_KEY.";
    } else if (provider_choice === "ollama") {
      n.textContent =
        "Ollama provider uses an OpenAI-compatible Chat Completions endpoint.";
    } else {
      n.textContent = "";
    }
    return n;
  })();

  const showOpenAIAuth = provider_choice === "openai";
  const showOpenAIConfig = provider_choice === "openai";

  const providerPanel = panel("Provider", [
    reversibleAttach(!agent_ui_attached, $3),
    providerNotes,
    showOpenAIAuth
      ? reversibleAttach(!agent_ui_attached, $4)
      : null,
    showOpenAIConfig
      ? reversibleAttach(!agent_ui_attached, $5)
      : null,
    reversibleAttach(!agent_ui_attached, $6),
    reversibleAttach(!agent_ui_attached, $7),
    reversibleAttach(!agent_ui_attached, $8)
  ]);

  const agentConfigPanel = panel("Agent config", [
    reversibleAttach(!agent_ui_attached, $9)
  ]);

  root.appendChild(
    tabbedPane({
      Prompt: runPanel,
      "Agent config": agentConfigPanel,
      Provider: providerPanel
    })
  );

  return root;
}


function _agent_ui_attached(Inputs){return(
Inputs.toggle({
  label: "decompose (detach sub-views)?",
  value: false
})
)}

function _20(md){return(
md`### agent`
)}

function _agent_prompt(Inputs){return(
Inputs.textarea({
  width: "100%",
  rows: 10,
  submit: true,
  minlength: 1,
  placeholder:
    "Describe the change you want. The loop will run tests and feed failures back until they pass (or maxSteps)."
})
)}

function _agent_run_effect(agent_prompt,agent_run){return(
(async () => {
  if (!agent_prompt || !String(agent_prompt).trim()) return this || 0;
  await agent_run({ prompt: agent_prompt, reset: false });
  return (this || 0) + 1;
})()
)}

function _agent_cancel_effect(agent_cancel,agent_loop){return(
agent_cancel && (agent_loop.cancel(), agent_cancel)
)}

function _agent_cancel(Inputs){return(
Inputs.button("Cancel", { value: 0, reduce: v => v + 1 })
)}

function _agent_clear(Inputs){return(
Inputs.button("Clear", { value: 0, reduce: (v) => v + 1 })
)}

function _agent_clear_effect(agent_clear,agent_loop,$0,$1){return(
agent_clear &&
  (() => {
    try {
      agent_loop?.cancel?.();
    } catch {}
    try {
      agent_loop?.reset?.();
    } catch {}
    $0.value = [];
    $1.value = [];
    return agent_clear;
  })()
)}

function _27(md){return(
md`### execution state`
)}

function _robocoopPrototype_record_stream(agent_records){return(
(() => {
  const records = Array.isArray(agent_records) ? agent_records : [];
  const prev = this && typeof this === "object" ? this : null;
  const prevLen = prev && Number.isFinite(prev.len) ? prev.len : 0;
  return { len: records.length, delta: records.length - prevLen };
})()
)}

function _agent_records(){return(
[]
)}

function _appendAgentRecord(){return(
(records, rec, now = Date.now()) => {
  const arr = Array.isArray(records) ? records : [];
  const r = { time: now, ...(rec ?? {}) };
  const last = arr.length ? arr[arr.length - 1] : null;

  if (last && last.type === r.type) {
    if (r.type === "text") {
      last.chunk = String(last.chunk ?? "") + String(r.chunk ?? "");
      last.time = r.time;
      return arr;
    }
    if (
      r.type === "tool_use_delta" &&
      String(last.id ?? "") === String(r.id ?? "")
    ) {
      last.chunk = String(last.chunk ?? "") + String(r.chunk ?? "");
      last.time = r.time;
      return arr;
    }
  }

  arr.push(r);
  return arr;
}
)}

function _agent_run_history(){return(
[]
)}

function _agentConversationFromRecords(){return(
(records = []) => {
  const steps = [];
  let current = null;

  const ensureStep = (step) => {
    if (!current || current.step !== step) {
      current = {
        step,
        startedAt: null,
        finishedAt: null,
        text: "",
        tools: new Map(),
        tests: [],
        stepFinish: null,
        assistantFinish: null,
        events: []
      };
      steps.push(current);
    }
    return current;
  };

  const byTime = [...(Array.isArray(records) ? records : [])].sort(
    (a, b) => (a?.time ?? 0) - (b?.time ?? 0)
  );

  for (const r of byTime) {
    if (!r || typeof r !== "object") continue;
    const t = r.type;

    if (t === "step_start") {
      const s = ensureStep(Number.isFinite(r.step) ? r.step : steps.length);
      s.startedAt = r.time ?? s.startedAt;
      s.events.push(r);
      continue;
    }

    const targetStep =
      current ??
      ensureStep(
        Number.isFinite(r.step)
          ? r.step
          : Number.isFinite(r?.info?.step)
          ? r.info.step
          : steps.length
      );

    if (t === "text") {
      targetStep.text += String(r.chunk ?? "");
      targetStep.events.push(r);
      continue;
    }

    if (t === "tool_use") {
      const id = String(r.id ?? "");
      const name = String(r.name ?? "");
      if (!targetStep.tools.has(id)) {
        targetStep.tools.set(id, { id, name, argsRaw: "", result: null });
      } else {
        const existing = targetStep.tools.get(id);
        targetStep.tools.set(id, { ...existing, name: existing.name || name });
      }
      targetStep.events.push(r);
      continue;
    }

    if (t === "tool_use_delta") {
      const id = String(r.id ?? "");
      const chunk = String(r.chunk ?? "");
      const existing = targetStep.tools.get(id) ?? {
        id,
        name: "",
        argsRaw: "",
        result: null
      };
      existing.argsRaw = (existing.argsRaw ?? "") + chunk;
      targetStep.tools.set(id, existing);
      targetStep.events.push(r);
      continue;
    }

    if (t === "tool_result") {
      const id = String(r.id ?? "");
      const existing = targetStep.tools.get(id) ?? {
        id,
        name: String(r.name ?? ""),
        argsRaw: "",
        result: null
      };
      existing.name = existing.name || String(r.name ?? "");
      existing.result = {
        title: String(r.title ?? ""),
        output: String(r.output ?? ""),
        metadata: r.metadata ?? null
      };
      targetStep.tools.set(id, existing);
      targetStep.events.push(r);
      continue;
    }

    if (t === "tests") {
      targetStep.tests.push({
        title: String(r.title ?? ""),
        output: String(r.output ?? ""),
        metadata: r.metadata ?? null
      });
      targetStep.events.push(r);
      continue;
    }

    if (t === "assistant_finish") {
      targetStep.assistantFinish = {
        responseId: r.responseId ?? null,
        finishReason: r.finishReason ?? null,
        usage: r.usage ?? null,
        usage_raw: r.usage_raw ?? null
      };
      targetStep.events.push(r);
      continue;
    }

    if (t === "step_finish") {
      targetStep.stepFinish = r.info ?? null;
      targetStep.finishedAt = r.time ?? targetStep.finishedAt;
      targetStep.events.push(r);
      continue;
    }

    targetStep.events.push(r);
  }

  return {
    steps: steps.map((s) => ({
      ...s,
      tools: [...s.tools.values()]
    }))
  };
}
)}

function _agent_conversation(agent_records,agentConversationFromRecords,agent_run_history,agent_reply,agent_stop){return(
(() => {
  const recs = Array.isArray(agent_records) ? agent_records : [];
  const convo = agentConversationFromRecords(recs);
  const latestRun =
    Array.isArray(agent_run_history) && agent_run_history.length
      ? agent_run_history[0]
      : null;
  const run = latestRun
    ? {
        id: latestRun.id ?? null,
        provider: latestRun.provider ?? null,
        startedAt: latestRun.startedAt ?? null,
        endedAt: latestRun.endedAt ?? null,
        tokens: latestRun.tokens ?? null,
        prompt: latestRun.prompt ?? null,
        reply: agent_reply,
        stop: agent_stop
      }
    : {
        id: null,
        provider: null,
        startedAt: null,
        endedAt: null,
        tokens: null,
        prompt: null,
        reply: agent_reply,
        stop: agent_stop
      };
  return { ...convo, run };
})()
)}

function _css(htl){return(
htl.html`<style>
.rc-convo {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  display: grid;
  gap: 10px;
}
.rc-runbar {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px;
  background: #fafafa;
  display: grid;
  gap: 6px;
}
.rc-runbar .title {
  font-weight: 700;
  font-size: 13px;
  color: #111;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.rc-runbar .meta {
  font-size: 12px;
  color: #444;
  display: grid;
  gap: 2px;
}
.rc-step {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}
.rc-step .head {
  padding: 10px;
  background: #f6f7f9;
  display: grid;
  gap: 4px;
}
.rc-step .head .row1 {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  align-items: baseline;
}
.rc-step .head .row1 .label {
  font-weight: 700;
  font-size: 13px;
  color: #111;
}
.rc-step .head .row1 .right {
  font-size: 12px;
  color: #333;
}
.rc-step .head .row2 {
  font-size: 12px;
  color: #444;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.rc-step .body {
  padding: 10px;
  display: grid;
  gap: 10px;
}
.rc-pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 12px;
  line-height: 1.4;
  background: #0b1020;
  color: #e9eefc;
  padding: 10px;
  border-radius: 8px;
  margin: 0;
}
.rc-section {
  display: grid;
  gap: 6px;
}
.rc-section .stitle {
  font-weight: 700;
  font-size: 12px;
  color: #111;
}
.rc-tools details, .rc-tests details {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 8px 10px;
  background: #fff;
}
.rc-tools summary, .rc-tests summary {
  cursor: pointer;
  font-size: 12px;
  color: #111;
}
.rc-kv {
  font-size: 12px;
  color: #333;
  display: grid;
  gap: 4px;
}
.rc-code {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 11px;
  line-height: 1.35;
  background: #f7f7f8;
  padding: 8px;
  border-radius: 8px;
  margin: 0;
  border: 1px solid #ededed;
}
.rc-empty {
  border: 1px dashed #d0d0d0;
  border-radius: 10px;
  padding: 14px;
  color: #444;
  font-size: 12px;
  background: #fafafa;
}
</style>`
)}

function _agent_conversation_dom_sync(agent_conversation_view_holder,agent_conversation_view)
{
  agent_conversation_view_holder.innerHTML = "";
  agent_conversation_view_holder.appendChild(agent_conversation_view);
}


function _agent_conversation_view_holder(html){return(
html`<div></div>`
)}

function _agent_conversation_view(agent_conversation,htl,css){return(
(() => {
  const convo = agent_conversation ?? { steps: [], run: null };
  const stepsRaw = Array.isArray(convo.steps) ? convo.steps : [];
  const steps = [...stepsRaw].sort((a, b) => {
    const sa = Number.isFinite(a?.step) ? a.step : -Infinity;
    const sb = Number.isFinite(b?.step) ? b.step : -Infinity;
    if (sb !== sa) return sb - sa;
    const ta = Number.isFinite(a?.startedAt) ? a.startedAt : 0;
    const tb = Number.isFinite(b?.startedAt) ? b.startedAt : 0;
    return tb - ta;
  });

  const fmtTime = (ms) =>
    Number.isFinite(ms) ? new Date(ms).toLocaleString() : "";
  const fmtDur = (a, b) => {
    if (!Number.isFinite(a) || !Number.isFinite(b)) return "";
    const s = Math.max(0, Math.round((b - a) / 1000));
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}m ${r}s`;
  };

  const fmtTokens = (u) => {
    if (!u || typeof u !== "object") return "";
    const input = Number(u.input ?? 0);
    const output = Number(u.output ?? 0);
    const reasoning = Number(u.reasoning ?? 0);
    const cacheRead = Number(u.cache?.read ?? 0);
    const cacheWrite = Number(u.cache?.write ?? 0);
    const total = Number(u.total ?? input + output);
    return `tokens: total ${total} (in ${input}, out ${output}${
      reasoning ? `, reasoning ${reasoning}` : ""
    }${cacheRead || cacheWrite ? `, cache r${cacheRead}/w${cacheWrite}` : ""})`;
  };

  const parseMaybeJSON = (s) => {
    const str = String(s ?? "").trim();
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  const run = convo.run;
  const runBar = htl.html`<div class="rc-runbar">
    <div class="title">
      <div>Conversation</div>
      <div>${run ? String(run.provider ?? "") : ""}</div>
    </div>
    <div class="meta">
      <div>${run?.startedAt ? `started: ${fmtTime(run.startedAt)}` : ""}${
    run?.endedAt ? ` • ended: ${fmtTime(run.endedAt)}` : ""
  }${
    run?.startedAt && run?.endedAt
      ? ` • duration: ${fmtDur(run.startedAt, run.endedAt)}`
      : ""
  }</div>
      <div>${run?.tokens ? fmtTokens(run.tokens) : ""}</div>
    </div>
  </div>`;

  const stepViews = steps.map((s) => {
    const usage = s?.assistantFinish?.usage ?? null;
    const finishReason =
      s?.assistantFinish?.finishReason ?? s?.stepFinish?.reason ?? null;
    const tokenLine = fmtTokens(usage);
    const duration = fmtDur(s.startedAt, s.finishedAt);

    const tools = Array.isArray(s.tools) ? s.tools : [];
    const toolViews =
      tools.length === 0
        ? null
        : htl.html`<div class="rc-section rc-tools">
            <div class="stitle">Tools (${tools.length})</div>
            ${tools.map((t) => {
              const argsParsed = parseMaybeJSON(t.argsRaw);
              const argsBlock = argsParsed
                ? JSON.stringify(argsParsed, null, 2)
                : String(t.argsRaw ?? "").trim();
              const outBlock = t.result?.output ?? "";
              const status = t.result?.metadata?.error
                ? "error"
                : t.result
                ? "ok"
                : "pending";
              const title = t.result?.title ? ` • ${t.result.title}` : "";
              return htl.html`<details>
                <summary>${String(
                  t.name ?? "tool"
                )} (${status})${title}</summary>
                <div class="rc-kv">
                  <div><b>callId</b>: ${String(t.id ?? "")}</div>
                  <div><b>args</b>:</div>
                  <pre class="rc-code">${argsBlock || "(none)"}</pre>
                  <div><b>output</b>:</div>
                  <pre class="rc-code">${String(outBlock || "(none)")}</pre>
                </div>
              </details>`;
            })}
          </div>`;

    const tests = Array.isArray(s.tests) ? s.tests : [];
    const testViews =
      tests.length === 0
        ? null
        : htl.html`<div class="rc-section rc-tests">
            <div class="stitle">Tests (${tests.length})</div>
            ${tests.map((t, i) => {
              const title = t.title || `tests ${i + 1}`;
              return htl.html`<details>
                <summary>${title}</summary>
                <pre class="rc-code">${String(t.output ?? "")}</pre>
              </details>`;
            })}
          </div>`;

    const text = String(s.text ?? "").trim();
    return htl.html`<div class="rc-step">
      <div class="head">
        <div class="row1">
          <div class="label">Step ${Number.isFinite(s.step) ? s.step : ""}${
      finishReason ? ` • ${finishReason}` : ""
    }</div>
          <div class="right">${duration ? `duration ${duration}` : ""}</div>
        </div>
        <div class="row2">
          <div>${tokenLine}</div>
          <div>${
            s?.assistantFinish?.responseId
              ? `responseId: ${String(s.assistantFinish.responseId)}`
              : ""
          }</div>
        </div>
      </div>
      <div class="body">
        ${
          text
            ? htl.html`<pre class="rc-pre">${text}</pre>`
            : htl.html`<div class="rc-empty">No assistant text yet for this step (streaming or tool-only step).</div>`
        }
        ${toolViews}
        ${testViews}
      </div>
    </div>`;
  });

  return htl.html`<div class="rc-convo">
    ${css}
    ${runBar}
    ${
      steps.length
        ? stepViews
        : htl.html`<div class="rc-empty">No records yet. Ask something.</div>`
    }
  </div>`;
})()
)}

function _38(md){return(
md`### models`
)}

function _open_ai_models(){return(
["gpt-5.2", "gpt-5.1", "gpt-5", "gpt-5-mini", "gpt-5-nano"]
)}

function _anthropic_models(){return(
["claude-opus-4-5", "claude-haiku-4-5", "claude-sonnet-4-5"]
)}

function _41(md){return(
md`### providers`
)}

function _provider_choice(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(
    new Map([
      ["Demo (OpenAI proxy, no auth)", "demo"],
      ["OpenAI (Responses API)", "openai"],
      ["Anthropic (Messages API)", "anthropic"],
      ["Ollama (OpenAI-compatible Chat Completions)", "ollama"]
    ]),
    { label: "provider", value: "openai" }
  ),
  localStorageView("provider_choice", { defaultValue: "demo" })
)
)}

function _OPENAI_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    width: "100%",
    label: "OPENAI_API_KEY",
    placeholder: "paste openAI key here"
  }),
  localStorageView("OPENAI_API_KEY")
)
)}

function _ANTHROPIC_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    width: "100%",
    label: "ANTHROPIC_API_KEY",
    placeholder: "paste openAI key here"
  }),
  localStorageView("ANTHROPIC_API_KEY")
)
)}

function _provider_openai_config(Inputs,open_ai_models,localStorageView){return(
Inputs.bind(
  Inputs.form({
    modelId: Inputs.select(open_ai_models, {
      label: "model",
      width: "100%",
      value: "gpt-5-mini"
    }),
    baseUrl: Inputs.text({
      label: "baseUrl",
      width: "100%",
      value: "https://api.openai.com/v1"
    }),
    max_output_tokens: Inputs.number({
      label: "max_output_tokens",
      min: 128,
      max: 8192,
      step: 128,
      value: 2048
    })
  }),
  localStorageView("provider_openai_config", {
    json: true,
    defaultValue: {
      modelId: "gpt-5-mini",
      baseUrl: "https://api.openai.com/v1",
      max_output_tokens: 2048
    }
  })
)
)}

function _openaiProvider(){return(
({ apiKey, baseUrl = "https://api.openai.com/v1" } = {}) => ({
  id: "openai",
  baseUrl,
  headers: () => {
    const h = { "Content-Type": "application/json" };
    const key = String(apiKey ?? "").trim();
    if (key) h.Authorization = `Bearer ${key}`;
    return h;
  },
  responsesEndpoint: `${baseUrl}/responses`
})
)}

function _streamOpenAIChatCompletionsBlocks(parseSSEStream){return(
async ({
  provider,
  model,
  messages,
  tools,
  callbacks = {},
  signal,
  settings = {}
} = {}) => {
  const body = {
    model,
    messages,
    stream: true,
    ...settings
  };

  if (tools && tools.length) body.tools = tools;
  if (!("tool_choice" in body)) body.tool_choice = "auto";

  const response = await fetch(provider.chatCompletionsEndpoint, {
    method: "POST",
    headers: provider.headers(),
    body: JSON.stringify(body),
    signal
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    const e = new Error(
      `Chat Completions API error: ${response.status} - ${errorText}`
    );
    callbacks.onError?.(e);
    throw e;
  }

  let currentText = "";
  let finishReason = null;
  let usage = null;

  const callIdTo = new Map();
  const callOrder = [];
  const ensureCall = (id) => {
    const key = String(id ?? "");
    if (!key) return null;
    if (!callIdTo.has(key)) {
      callIdTo.set(key, { id: key, name: "", args: "" });
      callOrder.push(key);
    }
    return callIdTo.get(key);
  };

  await parseSSEStream(
    response.body,
    (event) => {
      if (!event || typeof event !== "object") return;

      if (event.usage && typeof event.usage === "object") usage = event.usage;

      const choice = Array.isArray(event.choices) ? event.choices[0] : null;
      if (!choice) return;

      if (choice.finish_reason) finishReason = choice.finish_reason;

      const delta = choice.delta ?? {};
      if (typeof delta.content === "string" && delta.content) {
        currentText += delta.content;
        callbacks.onText?.(delta.content);
      }

      const toolCalls = Array.isArray(delta.tool_calls) ? delta.tool_calls : [];
      for (const tc of toolCalls) {
        const id = tc?.id ?? tc?.tool_call_id ?? "";
        const entry = ensureCall(id);
        if (!entry) continue;

        const name = tc?.function?.name ?? tc?.name ?? "";
        const argDelta =
          tc?.function?.arguments ??
          tc?.arguments ??
          tc?.delta?.arguments ??
          "";

        const firstName = !entry.name && name;
        if (firstName) {
          entry.name = String(name);
          callbacks.onToolCall?.(entry.id, entry.name);
        }

        if (argDelta) {
          entry.args += String(argDelta);
          callbacks.onToolCallDelta?.(entry.id, String(argDelta));
        }
      }
    },
    signal
  );

  const toolUses = callOrder
    .map((id) => callIdTo.get(id))
    .filter(Boolean)
    .map((c) => {
      let parsed = {};
      try {
        parsed = c.args ? JSON.parse(c.args) : {};
      } catch {
        parsed = {};
      }
      return {
        type: "tool_use",
        id: c.id,
        name: c.name,
        input: parsed,
        argsRaw: c.args
      };
    });

  const blocks = [];
  if (currentText) blocks.push({ type: "text", text: currentText });
  for (const tu of toolUses) blocks.push(tu);

  callbacks.onFinish?.({
    responseId: null,
    finishReason: finishReason ?? "unknown",
    usage,
    blocks
  });

  return {
    responseId: null,
    finishReason: finishReason ?? "unknown",
    usage,
    blocks,
    raw: null
  };
}
)}

function _createOpenAIOpencodeLoop(openaiProvider,AbortController,globalRuntime,streamOpenAIResponseBlocks,createToolContext){return(
({
  apiKey,
  modelId,
  systemPrompt,
  registry,
  tools: toolsOverride = null,
  settings = {},
  maxSteps = 100,
  autoRunTests = true,
  testFilter = "",
  baseUrl = "https://api.openai.com/v1"
} = {}) => {
  if (!registry)
    throw new Error("createOpenAIOpencodeLoop requires {registry}");
  const provider = openaiProvider({ apiKey, baseUrl });

  const normalizeToOpenAITools = (rawTools) => {
    const arr = Array.isArray(rawTools) ? rawTools : [];
    const looksAlreadyFormatted = (t) =>
      t &&
      typeof t === "object" &&
      (t.type === "function" || t.type === "custom") &&
      typeof t.name === "string";
    if (arr.length && looksAlreadyFormatted(arr[0])) return arr;
    return arr.map((t) => {
      if (t?.openai?.type === "custom") {
        return { type: "custom", name: t.id, description: t.description };
      }
      return {
        type: "function",
        name: t.id,
        description: t.description,
        parameters: t.parameters,
        strict: true
      };
    });
  };

  const getTools = () => {
    const raw =
      typeof toolsOverride === "function"
        ? toolsOverride()
        : toolsOverride != null
        ? toolsOverride
        : registry.all();
    return normalizeToOpenAITools(raw);
  };

  let abortController = null;
  let running = false;

  let state = { previous_response_id: null, lastResponse: null };
  const cancel = () => abortController?.abort();
  const reset = () => {
    state = { previous_response_id: null, lastResponse: null };
  };

  const systemRoleForModel = (mid) =>
    String(mid ?? "").startsWith("o1") ? "user" : "system";

  const textMessageItem = (text, role) => ({
    type: "message",
    role,
    content: [{ type: "input_text", text: String(text ?? "") }]
  });

  const run = async (userPrompt, callbacks = {}) => {
    if (running) throw new Error("Loop is already running");
    running = true;
    abortController = new AbortController();
    const runtime = globalRuntime;

    try {
      let previous_response_id = state?.previous_response_id ?? null;

      const sysRole = systemRoleForModel(modelId);
      let nextInput = [
        ...(systemPrompt ? [textMessageItem(systemPrompt, sysRole)] : []),
        textMessageItem(userPrompt, "user")
      ];

      for (let step = 0; step < maxSteps; step++) {
        if (abortController.signal.aborted) break;

        callbacks.onStepStart?.(step, { previous_response_id });

        const streamed = await streamOpenAIResponseBlocks({
          provider,
          model: modelId,
          input: nextInput,
          instructions: null,
          tools: getTools(),
          previous_response_id,
          signal: abortController.signal,
          settings,
          callbacks: {
            onText: (chunk) => callbacks.onText?.(chunk),
            onToolCall: (id, name) => callbacks.onToolCall?.(id, name),
            onToolCallDelta: (id, chunk) =>
              callbacks.onToolCallDelta?.(id, chunk),
            onError: (e) => callbacks.onError?.(e),
            onFinish: (info) => callbacks.onAssistantFinish?.(info)
          }
        });

        previous_response_id = streamed.responseId ?? previous_response_id;
        state = { previous_response_id, lastResponse: streamed };

        const toolUses = streamed.blocks.filter((b) => b.type === "tool_use");
        if (toolUses.length > 0) {
          const results = [];
          for (const tu of toolUses) {
            const ctx = await createToolContext({
              sessionId: "opencode",
              messageId: "opencode",
              agent: "assistant",
              callId: tu.id,
              abort: abortController.signal,
              runtime
            });
            const args =
              typeof tu.input === "string"
                ? { input: tu.input }
                : tu.input ?? {};
            const result = await registry.execute(tu.name, args, ctx);
            results.push({ call_id: tu.id, name: tu.name, result });
            callbacks.onToolFinish?.(tu.id, tu.name, result);
          }
          nextInput = results.map((r) => ({
            type: "function_call_output",
            call_id: r.call_id,
            output: r.result.output
          }));
          callbacks.onStepFinish?.(step, {
            reason: "tool_outputs_sent",
            previous_response_id
          });
          continue;
        }

        if (autoRunTests) {
          const testCtx = await createToolContext({
            sessionId: "opencode",
            messageId: "opencode",
            agent: "assistant",
            callId: `run_tests_${step}`,
            abort: abortController.signal,
            runtime
          });
          const testResult = await registry.execute(
            "run_tests",
            { filter: String(testFilter ?? "") },
            testCtx
          );
          callbacks.onTests?.(testResult);

          const failed = Number(testResult.metadata?.failed ?? 0);
          if (failed > 0) {
            const msg = [
              "Tests are failing. Fix the notebook by editing runtime variables (e.g. via define_variable), then run tests again.",
              "",
              testResult.output
            ].join("\n");
            nextInput = [textMessageItem(msg, "user")];
            callbacks.onStepFinish?.(step, {
              reason: "tests_failed",
              failed,
              previous_response_id
            });
            continue;
          }

          callbacks.onStepFinish?.(step, {
            reason: "tests_passed",
            failed: 0,
            previous_response_id
          });
          break;
        }

        callbacks.onStepFinish?.(step, {
          reason: streamed.finishReason || "end_turn",
          previous_response_id
        });
        break;
      }

      callbacks.onFinish?.(state);
      return state;
    } finally {
      running = false;
      abortController = null;
    }
  };

  return {
    run,
    cancel,
    reset,
    running: () => running,
    getState: () => state
  };
}
)}

function _provider_anthropic_config(Inputs,anthropic_models,localStorageView){return(
Inputs.bind(
  Inputs.form({
    modelId: Inputs.select(anthropic_models, {
      label: "model",
      width: "100%",
      value: "claude-sonnet-4-5"
    }),
    baseUrl: Inputs.text({
      label: "baseUrl",
      width: "100%",
      value: "https://api.anthropic.com/v1"
    }),
    version: Inputs.text({
      label: "anthropic-version",
      width: "100%",
      value: "2023-06-01"
    }),
    max_tokens: Inputs.number({
      label: "max_tokens",
      min: 256,
      max: 8192,
      step: 128,
      value: 4096
    })
  }),
  localStorageView("provider_anthropic_config", {
    json: true,
    defaultValue: {
      modelId: "claude-sonnet-4-5",
      baseUrl: "https://api.anthropic.com/v1",
      version: "2023-06-01",
      max_tokens: 4096
    }
  })
)
)}

function _anthropicProvider(){return(
({apiKey, baseUrl = 'https://api.anthropic.com/v1', version = '2023-06-01'}) => ({
    id: 'anthropic',
    baseUrl,
    headers: () => ({
        'x-api-key': apiKey,
        'anthropic-version': version,
        'anthropic-dangerous-direct-browser-access': 'true',
        'Content-Type': 'application/json'
    }),
    messagesEndpoint: baseUrl + '/messages'
})
)}

function _createAnthropicOpencodeLoop(anthropicProvider,AbortController,globalRuntime,createToolContext,streamAnthropicBlocks){return(
({
  apiKey,
  modelId,
  systemPrompt,
  registry,
  tools: toolsOverride = null,
  settings = {},
  maxSteps = 10,
  autoRunTests = true,
  testFilter = "",
  baseUrl = "https://api.anthropic.com/v1",
  version = "2023-06-01"
} = {}) => {
  if (!registry)
    throw new Error("createAnthropicOpencodeLoop requires {registry}");

  const provider = anthropicProvider({ apiKey, baseUrl, version });

  const normalizeToAnthropicTools = (rawTools) => {
    const arr = Array.isArray(rawTools) ? rawTools : [];
    const looksAlreadyFormatted = (t) =>
      t &&
      typeof t === "object" &&
      typeof t.name === "string" &&
      typeof t.description === "string" &&
      t.input_schema;

    if (arr.length && looksAlreadyFormatted(arr[0])) return arr;

    const toolObjs = arr.filter(
      (t) => t && typeof t === "object" && typeof t.id === "string"
    );
    return toolObjs.map((t) => ({
      name: t.id,
      description: t.description,
      input_schema: t.parameters
    }));
  };

  const getTools = () => {
    const raw =
      typeof toolsOverride === "function"
        ? toolsOverride()
        : toolsOverride != null
        ? toolsOverride
        : registry.toAnthropicFormat();
    return normalizeToAnthropicTools(raw);
  };

  let abortController = null;
  let running = false;
  let lastMessages = [];

  const cancel = () => abortController?.abort();
  const reset = () => {
    lastMessages = [];
  };

  const run = async (userPrompt, callbacks = {}) => {
    if (running) throw new Error("Loop is already running");
    running = true;
    abortController = new AbortController();
    const runtime = globalRuntime;

    try {
      let messages =
        Array.isArray(lastMessages) && lastMessages.length
          ? [
              ...lastMessages,
              { role: "user", content: String(userPrompt ?? "") }
            ]
          : [{ role: "user", content: String(userPrompt ?? "") }];

      lastMessages = messages;

      const toolCtx = async (callId) =>
        await createToolContext({
          sessionId: "opencode",
          messageId: "opencode",
          agent: "assistant",
          callId,
          abort: abortController.signal,
          runtime
        });

      for (let step = 0; step < maxSteps; step++) {
        if (abortController.signal.aborted) break;

        callbacks.onStepStart?.(step, { messages });

        const streamed = await streamAnthropicBlocks({
          provider,
          model: modelId,
          messages,
          systemPrompt,
          tools: getTools(),
          signal: abortController.signal,
          settings,
          callbacks: {
            onText: (chunk) => callbacks.onText?.(chunk),
            onToolCall: (id, name) => callbacks.onToolCall?.(id, name),
            onToolCallDelta: (id, chunk) =>
              callbacks.onToolCallDelta?.(id, chunk),
            onError: (e) => callbacks.onError?.(e),
            onFinish: (info) => callbacks.onAssistantFinish?.(info)
          }
        });

        const assistantMsg = { role: "assistant", content: streamed.blocks };
        messages = [...messages, assistantMsg];
        lastMessages = messages;

        const toolUses = streamed.blocks.filter((b) => b.type === "tool_use");
        if (toolUses.length > 0) {
          const results = [];

          for (const tu of toolUses) {
            const result = await registry.execute(
              tu.name,
              tu.input ?? {},
              await toolCtx(tu.id)
            );
            results.push({ tool_use_id: tu.id, name: tu.name, result });
            callbacks.onToolFinish?.(tu.id, tu.name, result);
          }

          const toolResultBlocks = results.map((r) => ({
            type: "tool_result",
            tool_use_id: r.tool_use_id,
            content: r.result.output,
            is_error: !!r.result.metadata?.error
          }));

          const toolResultMsg = { role: "user", content: toolResultBlocks };
          messages = [...messages, toolResultMsg];
          lastMessages = messages;

          callbacks.onStepFinish?.(step, {
            reason: "tool_results_sent",
            messages
          });
          continue;
        }

        if (autoRunTests) {
          const testResult = await registry.execute(
            "run_tests",
            { filter: String(testFilter ?? "") },
            await toolCtx("run_tests_" + step)
          );
          callbacks.onTests?.(testResult);

          const failed = Number(testResult.metadata?.failed ?? 0);
          if (failed > 0) {
            const msg = [
              "Tests are failing. Fix the notebook by editing runtime variables (e.g. via define_variable), then run tests again.",
              "",
              testResult.output
            ].join("\n");

            messages = [...messages, { role: "user", content: msg }];
            lastMessages = messages;

            callbacks.onStepFinish?.(step, {
              reason: "tests_failed",
              failed,
              messages
            });
            continue;
          }

          callbacks.onStepFinish?.(step, {
            reason: "tests_passed",
            failed: 0,
            messages
          });
          break;
        }

        callbacks.onStepFinish?.(step, {
          reason: streamed.finishReason || "end_turn",
          messages
        });
        break;
      }

      callbacks.onFinish?.(lastMessages);
      return lastMessages;
    } finally {
      running = false;
      abortController = null;
    }
  };

  return {
    run,
    cancel,
    reset,
    running: () => running,
    getMessages: () => lastMessages
  };
}
)}

function _provider_ollama_config(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.form({
    modelId: Inputs.text({
      label: "model",
      width: "100%",
      value: "llama3.2"
    }),
    baseUrl: Inputs.text({
      label: "baseUrl (OpenAI-compatible)",
      width: "100%",
      value: "http://localhost:11434/v1"
    }),
    apiKey: Inputs.password({
      label: "apiKey (optional)",
      width: "100%",
      value: ""
    }),
    max_tokens: Inputs.number({
      label: "max_tokens",
      min: 1,
      max: 8192,
      step: 1,
      value: 2048
    }),
    temperature: Inputs.number({
      label: "temperature",
      min: 0,
      max: 2,
      step: 0.05,
      value: 0.7
    }),
    top_p: Inputs.number({
      label: "top_p",
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.95
    }),
    presence_penalty: Inputs.number({
      label: "presence_penalty",
      min: -2,
      max: 2,
      step: 0.1,
      value: 0
    }),
    frequency_penalty: Inputs.number({
      label: "frequency_penalty",
      min: -2,
      max: 2,
      step: 0.1,
      value: 0
    }),
    seed: Inputs.number({
      label: "seed (optional)",
      min: 0,
      max: 2147483647,
      step: 1,
      value: 0
    }),
    stop: Inputs.textarea({
      label: "stop (optional; one per line)",
      width: "100%",
      rows: 3,
      value: ""
    })
  }),
  localStorageView("provider_ollama_config", {
    json: true,
    defaultValue: {
      modelId: "qwen2.5:7b",
      baseUrl: "http://localhost:11434/v1",
      apiKey: "",
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 0.95,
      presence_penalty: 0,
      frequency_penalty: 0,
      seed: 0,
      stop: ""
    }
  })
)
)}

function _53(md){return(
md`#### Ollama

On macOS with the Ollama app:  

    export OLLAMA_ORIGINS="*"
    ollama serve

verify CORS

    curl -X OPTIONS http://localhost:11434 \\
      -H "Origin: http://example.com" \\
      -H "Access-Control-Request-Method: GET" -I  
      
Testing locally first

    ollama pull qwen2.5:7b

    curl http://localhost:11434/api/tags

    curl -X POST http://localhost:11434/v1/chat/completions \\
    -H "Content-Type: application/json" \\
    -d '{                                 
      "model": "qwen2.5:7b",
      "messages": [{"role": "user", "content": "hello"}]
    }'`
)}

function _ollamaProvider(){return(
({
  apiKey = "",
  baseUrl = "http://localhost:11434/v1"
} = {}) => {
  const b = String(baseUrl ?? "").replace(/\/+$/, "");
  const key = String(apiKey ?? "");
  return {
    id: "ollama",
    baseUrl: b,
    headers: () => {
      const h = { "Content-Type": "application/json" };
      if (key) h.Authorization = `Bearer ${key}`;
      return h;
    },
    chatCompletionsEndpoint: `${b}/chat/completions`
  };
}
)}

function _createOllamaOpencodeLoop(ollamaProvider,AbortController,globalRuntime,streamOpenAIChatCompletionsBlocks,createToolContext){return(
({
  apiKey = "",
  modelId,
  systemPrompt,
  registry,
  tools: toolsOverride = null,
  settings = {},
  maxSteps = 10,
  autoRunTests = true,
  testFilter = "",
  baseUrl = "http://localhost:11434/v1"
} = {}) => {
  if (!registry)
    throw new Error("createOllamaOpencodeLoop requires {registry}");
  const provider = ollamaProvider({ apiKey, baseUrl });

  const normalizeToChatTools = (rawTools) => {
    const arr = Array.isArray(rawTools) ? rawTools : [];
    const looksAlreadyFormatted = (t) =>
      t &&
      typeof t === "object" &&
      t.type === "function" &&
      t.function &&
      typeof t.function.name === "string";
    if (arr.length && looksAlreadyFormatted(arr[0])) return arr;
    return arr
      .filter((t) => t && typeof t === "object" && typeof t.id === "string")
      .map((t) => ({
        type: "function",
        function: {
          name: t.id,
          description: String(t.description ?? ""),
          parameters: t.parameters ?? {
            type: "object",
            properties: {},
            required: []
          }
        }
      }));
  };

  const getTools = () => {
    const raw =
      typeof toolsOverride === "function"
        ? toolsOverride()
        : toolsOverride != null
        ? toolsOverride
        : registry.all();
    return normalizeToChatTools(raw);
  };

  let abortController = null;
  let running = false;
  let lastMessages = [];

  const cancel = () => abortController?.abort();
  const reset = () => {
    lastMessages = [];
  };

  const userMsg = (text) => ({ role: "user", content: String(text ?? "") });
  const systemMsg = (text, role = "system") => ({
    role,
    content: String(text ?? "")
  });

  const systemRoleForModel = (mid) =>
    String(mid ?? "").startsWith("o1") ? "user" : "system";

  const parseStop = (stop) => {
    const s = String(stop ?? "");
    const parts = s
      .split(/\r?\n/)
      .map((d) => d.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  };

  const run = async (userPrompt, callbacks = {}) => {
    if (running) throw new Error("Loop is already running");
    running = true;
    abortController = new AbortController();
    const runtime = globalRuntime;

    try {
      let messages =
        Array.isArray(lastMessages) && lastMessages.length
          ? [...lastMessages]
          : [];
      if (!messages.length && systemPrompt)
        messages.push(systemMsg(systemPrompt, systemRoleForModel(modelId)));
      messages.push(userMsg(userPrompt));
      lastMessages = messages;

      for (let step = 0; step < maxSteps; step++) {
        if (abortController.signal.aborted) break;

        callbacks.onStepStart?.(step, { messages });

        const streamed = await streamOpenAIChatCompletionsBlocks({
          provider,
          model: modelId,
          messages,
          tools: getTools(),
          signal: abortController.signal,
          settings: {
            ...settings,
            stop: parseStop(settings.stop)
          },
          callbacks: {
            onText: (chunk) => callbacks.onText?.(chunk),
            onToolCall: (id, name) => callbacks.onToolCall?.(id, name),
            onToolCallDelta: (id, chunk) =>
              callbacks.onToolCallDelta?.(id, chunk),
            onError: (e) => callbacks.onError?.(e),
            onFinish: (info) => callbacks.onAssistantFinish?.(info)
          }
        });

        const text = streamed.blocks
          .filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("");
        const toolUses = streamed.blocks.filter((b) => b.type === "tool_use");

        const assistantToolCalls = toolUses.map((tu) => ({
          id: tu.id,
          type: "function",
          function: {
            name: tu.name,
            arguments: tu.argsRaw ?? JSON.stringify(tu.input ?? {})
          }
        }));

        const assistantMsg = {
          role: "assistant",
          content: text || null,
          ...(assistantToolCalls.length
            ? { tool_calls: assistantToolCalls }
            : {})
        };

        messages = [...messages, assistantMsg];
        lastMessages = messages;

        if (toolUses.length > 0) {
          const toolResultMsgs = [];
          for (const tu of toolUses) {
            const ctx = await createToolContext({
              sessionId: "opencode",
              messageId: "opencode",
              agent: "assistant",
              callId: tu.id,
              abort: abortController.signal,
              runtime
            });
            const result = await registry.execute(tu.name, tu.input ?? {}, ctx);
            callbacks.onToolFinish?.(tu.id, tu.name, result);
            toolResultMsgs.push({
              role: "tool",
              tool_call_id: tu.id,
              content: String(result.output ?? "")
            });
          }
          messages = [...messages, ...toolResultMsgs];
          lastMessages = messages;
          callbacks.onStepFinish?.(step, {
            reason: "tool_outputs_sent",
            messages
          });
          continue;
        }

        if (autoRunTests) {
          const testCtx = await createToolContext({
            sessionId: "opencode",
            messageId: "opencode",
            agent: "assistant",
            callId: `run_tests_${step}`,
            abort: abortController.signal,
            runtime
          });
          const testResult = await registry.execute(
            "run_tests",
            { filter: String(testFilter ?? "") },
            testCtx
          );
          callbacks.onTests?.(testResult);

          const failed = Number(testResult.metadata?.failed ?? 0);
          if (failed > 0) {
            const msg = [
              "Tests are failing. Fix the notebook by editing runtime variables (e.g. via define_variable), then run tests again.",
              "",
              testResult.output
            ].join("\n");
            messages = [...messages, userMsg(msg)];
            lastMessages = messages;
            callbacks.onStepFinish?.(step, {
              reason: "tests_failed",
              failed,
              messages
            });
            continue;
          }

          callbacks.onStepFinish?.(step, {
            reason: "tests_passed",
            failed: 0,
            messages
          });
          break;
        }

        callbacks.onStepFinish?.(step, {
          reason: streamed.finishReason || "end_turn",
          messages
        });
        break;
      }

      callbacks.onFinish?.(lastMessages);
      return lastMessages;
    } finally {
      running = false;
      abortController = null;
    }
  };

  return {
    run,
    cancel,
    reset,
    running: () => running,
    getMessages: () => lastMessages
  };
}
)}

function _56(md){return(
md`### Agent config`
)}

function _agent_config(Inputs,system_prompt){return(
Inputs.form({
  maxSteps: Inputs.number({
    label: "maxSteps",
    min: 1,
    max: 50,
    step: 1,
    value: 10
  }),
  autoRunTests: Inputs.toggle({
    label: "autoRunTests",
    value: true
  }),
  testFilter: Inputs.text({
    label: "testFilter (optional)",
    width: "100%",
    value: ""
  }),
  systemPrompt: Inputs.textarea({
    label: "systemPrompt",
    width: "100%",
    rows: 10,
    value: system_prompt
  })
})
)}

function _agent_loop(provider_choice,createOpenAIOpencodeLoop,agent_system_prompt,toolRegistry,provider_openai_config,agent_config,OPENAI_API_KEY,createAnthropicOpencodeLoop,ANTHROPIC_API_KEY,provider_anthropic_config,createOllamaOpencodeLoop,provider_ollama_config){return(
provider_choice === "demo"
  ? createOpenAIOpencodeLoop({
      apiKey: "",
      baseUrl: "https://openai-proxy.endpointservices.workers.dev/v1",
      modelId: "gpt-5-mini",
      systemPrompt: agent_system_prompt,
      registry: toolRegistry,
      settings: { max_output_tokens: provider_openai_config.max_output_tokens },
      maxSteps: agent_config.maxSteps,
      autoRunTests: agent_config.autoRunTests,
      testFilter: agent_config.testFilter
    })
  : provider_choice === "openai"
  ? createOpenAIOpencodeLoop({
      apiKey: OPENAI_API_KEY,
      baseUrl: provider_openai_config.baseUrl,
      modelId: provider_openai_config.modelId,
      systemPrompt: agent_system_prompt,
      registry: toolRegistry,
      settings: { max_output_tokens: provider_openai_config.max_output_tokens },
      maxSteps: agent_config.maxSteps,
      autoRunTests: agent_config.autoRunTests,
      testFilter: agent_config.testFilter
    })
  : provider_choice === "anthropic"
  ? createAnthropicOpencodeLoop({
      apiKey: ANTHROPIC_API_KEY,
      baseUrl: provider_anthropic_config.baseUrl,
      version: provider_anthropic_config.version,
      modelId: provider_anthropic_config.modelId,
      systemPrompt: agent_system_prompt,
      registry: toolRegistry,
      settings: { max_tokens: provider_anthropic_config.max_tokens },
      maxSteps: agent_config.maxSteps,
      autoRunTests: agent_config.autoRunTests,
      testFilter: agent_config.testFilter
    })
  : createOllamaOpencodeLoop({
      apiKey: provider_ollama_config.apiKey,
      baseUrl: provider_ollama_config.baseUrl,
      modelId: provider_ollama_config.modelId,
      systemPrompt: agent_system_prompt,
      registry: toolRegistry,
      settings: {
        max_tokens: provider_ollama_config.max_tokens,
        temperature: provider_ollama_config.temperature,
        top_p: provider_ollama_config.top_p,
        presence_penalty: provider_ollama_config.presence_penalty,
        frequency_penalty: provider_ollama_config.frequency_penalty,
        seed: provider_ollama_config.seed || undefined,
        stop: provider_ollama_config.stop
      },
      maxSteps: agent_config.maxSteps,
      autoRunTests: agent_config.autoRunTests,
      testFilter: agent_config.testFilter
    })
)}

function _normalizeUsage(){return(
(usage, providerId = "") => {
  const u = usage && typeof usage === "object" ? usage : {};
  const pid = String(providerId ?? "").toLowerCase();
  const asInt = (x) => (Number.isFinite(x) ? Math.trunc(x) : 0);

  const looksOpenAIResponses =
    "total_tokens" in u ||
    "input_tokens" in u ||
    "output_tokens" in u ||
    "input_tokens_details" in u ||
    "output_tokens_details" in u;

  const looksOpenAIChatCompletions =
    "prompt_tokens" in u || "completion_tokens" in u || "total_tokens" in u;

  const looksAnthropic =
    "input_tokens" in u ||
    "output_tokens" in u ||
    "cache_read_input_tokens" in u ||
    "cache_creation_input_tokens" in u;

  if (
    pid.includes("openai") ||
    (looksOpenAIResponses &&
      !pid.includes("anthropic") &&
      !pid.includes("ollama"))
  ) {
    const input = asInt(u.input_tokens);
    const output = asInt(u.output_tokens);
    const reasoning = asInt(
      u.output_tokens_details?.reasoning_tokens ?? u.reasoning_tokens
    );
    const cacheRead = asInt(
      u.input_tokens_details?.cached_tokens ?? u.cached_tokens
    );
    const cacheWrite = asInt(
      u.input_tokens_details?.cache_creation_input_tokens ?? 0
    );
    const total = asInt(u.total_tokens ?? input + output);
    return {
      input,
      output,
      reasoning,
      cache: { read: cacheRead, write: cacheWrite },
      total
    };
  }

  if (pid.includes("ollama") || looksOpenAIChatCompletions) {
    const input = asInt(u.prompt_tokens);
    const output = asInt(u.completion_tokens);
    const total = asInt(u.total_tokens ?? input + output);
    return {
      input,
      output,
      reasoning: 0,
      cache: { read: 0, write: 0 },
      total
    };
  }

  if (pid.includes("anthropic") || looksAnthropic) {
    const input = asInt(u.input_tokens);
    const output = asInt(u.output_tokens);
    const cacheRead = asInt(u.cache_read_input_tokens);
    const cacheWrite = asInt(u.cache_creation_input_tokens);
    const total = asInt(u.total_tokens ?? input + output);
    return {
      input,
      output,
      reasoning: 0,
      cache: { read: cacheRead, write: cacheWrite },
      total
    };
  }

  return {
    input: 0,
    output: 0,
    reasoning: 0,
    cache: { read: 0, write: 0 },
    total: 0
  };
}
)}

function _test_normalizeUsage_openai_chat_completions_usage(normalizeUsage)
{
  const u = normalizeUsage(
    { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    "ollama"
  );
  if (u.input !== 10 || u.output !== 5 || u.total !== 15)
    throw new Error("bad normalizeUsage: " + JSON.stringify(u));
  return "pass";
}


function _61(md){return(
md`## Example Provider Data`
)}

function _62(md){return(
md`<details><summary>Open AI completion event</summary>
${md`~~~json
{
  "type": "response.completed",
  "response": {
    "id": "resp_04976cfaa45a675a006970f676dfa881979084ef09ab948c9d",
    "object": "response",
    "created_at": 1769010807,
    "status": "completed",
    "background": false,
    "completed_at": 1769010823,
    "error": null,
    "frequency_penalty": 0,
    "incomplete_details": null,
    "instructions": "...",
    "max_output_tokens": 2048,
    "max_tool_calls": null,
    "model": "gpt-5-mini-2025-08-07",
    "output": [
      {
        "id": "rs_04976cfaa45a675a006970f6775d1481979bb27b1a685fcfc7",
        "type": "reasoning",
        "summary": []
      },
      {
        "id": "msg_04976cfaa45a675a006970f67ac7808197b6b05e2f33751b1d",
        "type": "message",
        "status": "completed",
        "content": [
          {
            "type": "output_text",
            "annotations": [],
            "logprobs": [],
            "text": "..."
          }
        ],
        "role": "assistant"
      }
    ],
    "parallel_tool_calls": true,
    "presence_penalty": 0,
    "previous_response_id": "resp_04976cfaa45a675a006970f67326c48197b6ec6e8092ffee60",
    "prompt_cache_key": null,
    "prompt_cache_retention": null,
    "reasoning": {
      "effort": "medium",
      "summary": null
    },
    "safety_identifier": null,
    "service_tier": "default",
    "store": true,
    "temperature": 1,
    "text": {
      "format": {
        "type": "text"
      },
      "verbosity": "medium"
    },
    "tool_choice": "auto",
    "tools": [
      {
        "type": "function",
        "description": "Read information about a runtime variable (name, current value/error, reachability, and its input variables).",
        "name": "read_variable",
        "parameters": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the runtime variable to read"
            }
          },
          "required": [
            "name"
          ],
          "additionalProperties": false
        },
        "strict": true
      },...
    ],
    "top_logprobs": 0,
    "top_p": 1,
    "truncation": "disabled",
    "usage": {
      "input_tokens": 9157,
      "input_tokens_details": {
        "cached_tokens": 8960
      },
      "output_tokens": 996,
      "output_tokens_details": {
        "reasoning_tokens": 192
      },
      "total_tokens": 10153
    },
    "user": null,
    "metadata": {}
  },
  "sequence_number": 807
}
~~~`}
</details>
<details><summary>Anthropic 429</summary>
${md`~~~json
Status Code: 429
retry-after: 11
{
    "type": "error",
    "error": {
        "type": "rate_limit_error",
        "message": "This request would exceed the rate limit for your organization (1815e560-bf0c-433e-b03a-793524e11fda) of 50,000 input tokens per minute. For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://www.anthropic.com/contact-sales to discuss your options for a rate limit increase."
    },
    "request_id": "req_011CXQugkT1ZmWRCq9gdSrAa"
}
~~~`}
</details>
`
)}

function _63(md){return(
md`## Code`
)}

function _agent_target_module(){return(
"main"
)}

function _agent_system_prompt(agent_config,agent_target_module,provider_choice){return(
[
  String(agent_config?.systemPrompt ?? ""),
  "",
  "Operational note:",
  `- Prefer editing variables in module: "${String(agent_target_module)}"`,
  `- Active provider: "${String(provider_choice ?? "")}"`
].join("\n")
)}

function _agent_run(generateId,$0,provider_choice,$1,appendAgentRecord,agent_loop,normalizeUsage){return(
async ({ prompt = "", reset = true } = {}) => {
  const text = String(prompt ?? "").trim();
  if (!text) return null;

  const runId =
    typeof generateId === "function" ? generateId() : crypto.randomUUID();
  const startedAt = Date.now();

  let records;
  if (reset || !Array.isArray($0.value)) records = [];
  else records = $0.value;

  const computeStepBase = (recs) => {
    let m = -1;
    for (const r of Array.isArray(recs) ? recs : []) {
      const s = r?.step;
      if (Number.isFinite(s)) m = Math.max(m, s);
      const is = r?.info?.step;
      if (Number.isFinite(is)) m = Math.max(m, is);
    }
    return m + 1;
  };

  const stepBase = reset ? 0 : computeStepBase(records);

  if (reset) {
    $0.value = records;
  }

  const runEntry = {
    id: runId,
    startedAt,
    endedAt: null,
    provider: String(provider_choice ?? ""),
    prompt: String(prompt ?? ""),
    records,
    stepBase,
    tokens: {
      input: 0,
      output: 0,
      reasoning: 0,
      cache: { read: 0, write: 0 },
      total: 0
    }
  };

  $1.value = [
    runEntry,
    ...($1.value || [])
  ].slice(0, 20);

  const push = (rec) => {
    records = appendAgentRecord(records, rec, Date.now());
    $0.value = records;
  };

  push({
    type: "run_start",
    runId,
    provider: runEntry.provider,
    reset: !!reset
  });

  try {
    await agent_loop.run(prompt, {
      onStepStart: (step, info) => {
        const s = stepBase + step;
        push({ type: "step_start", step: s, info: info ?? null });
      },
      onText: (chunk) => {
        push({ type: "text", chunk: String(chunk ?? "") });
      },
      onToolCall: (id, name) => {
        push({
          type: "tool_use",
          id: String(id ?? ""),
          name: String(name ?? "")
        });
      },
      onToolCallDelta: (id, chunk) => {
        push({
          type: "tool_use_delta",
          id: String(id ?? ""),
          chunk: String(chunk ?? "")
        });
      },
      onToolFinish: (id, name, result) => {
        push({
          type: "tool_result",
          id: String(id ?? ""),
          name: String(name ?? ""),
          title: String(result?.title ?? ""),
          output: String(result?.output ?? ""),
          metadata: result?.metadata ?? null
        });
      },
      onTests: (result) => {
        push({
          type: "tests",
          title: String(result?.title ?? ""),
          output: String(result?.output ?? ""),
          metadata: result?.metadata ?? null
        });
      },
      onAssistantFinish: (info) => {
        const usage = normalizeUsage(info?.usage, provider_choice);
        runEntry.tokens = usage;
        push({
          type: "assistant_finish",
          responseId: info?.responseId ?? null,
          finishReason: info?.finishReason ?? null,
          usage_raw: info?.usage ?? null,
          usage
        });
      },
      onError: (e) => {
        push({
          type: "error",
          message: String(e?.message ?? e),
          error: e ?? null
        });
      },
      onStepFinish: (step, info) => {
        const s = stepBase + step;
        push({ type: "step_finish", step: s, info: info ?? null });
      }
    });
    push({ type: "run_done" });
  } catch (e) {
    push({ type: "fatal", message: String(e?.message ?? e), error: e ?? null });
  } finally {
    runEntry.endedAt = Date.now();
    push({
      type: "run_end",
      runId,
      durationMs: runEntry.endedAt - startedAt,
      tokens: runEntry.tokens
    });
    $1.value = [
      runEntry,
      ...($1.value || []).filter((d) => d?.id !== runId)
    ].slice(0, 20);
  }

  return runEntry;
}
)}

function _test_appendAgentRecord_coalesces_text(appendAgentRecord)
{
  const records = [];
  appendAgentRecord(records, { type: "text", chunk: "hel" }, 1);
  appendAgentRecord(records, { type: "text", chunk: "lo" }, 2);
  if (records.length !== 1)
    throw new Error("expected 1 record, got " + records.length);
  if (records[0].chunk !== "hello")
    throw new Error("expected hello, got " + records[0].chunk);
  if (records[0].time !== 2)
    throw new Error("expected merged time to update to latest");
  return "pass";
}


function _test_appendAgentRecord_coalesces_tool_use_delta_by_id(appendAgentRecord)
{
  const records = [];
  appendAgentRecord(
    records,
    { type: "tool_use_delta", id: "c1", chunk: "{" },
    1
  );
  appendAgentRecord(
    records,
    { type: "tool_use_delta", id: "c1", chunk: '"a"' },
    2
  );
  appendAgentRecord(
    records,
    { type: "tool_use_delta", id: "c2", chunk: "X" },
    3
  );
  appendAgentRecord(
    records,
    { type: "tool_use_delta", id: "c1", chunk: ":1}" },
    4
  );

  if (records.length !== 3)
    throw new Error("expected 3 records, got " + records.length);
  if (records[0].chunk !== '{"a"')
    throw new Error("unexpected merged chunk for c1: " + records[0].chunk);
  if (records[1].id !== "c2" || records[1].chunk !== "X")
    throw new Error("unexpected middle record");
  if (records[2].id !== "c1" || records[2].chunk !== ":1}")
    throw new Error("should not merge non-adjacent deltas");
  return "pass";
}


function _agent_reply(agent_run){return(
(text) => agent_run({ prompt: String(text ?? ""), reset: false })
)}

function _agent_stop(agent_loop){return(
() => agent_loop.cancel()
)}

function _streamOpenAIResponseBlocks(parseSSEStream){return(
async ({
  provider,
  model,
  input,
  instructions,
  tools,
  previous_response_id,
  callbacks = {},
  signal,
  settings = {}
} = {}) => {
  const body = {
    model,
    input,
    stream: true,
    ...settings
  };

  if (instructions) body.instructions = instructions;
  if (previous_response_id) body.previous_response_id = previous_response_id;
  if (tools && tools.length) body.tools = tools;

  const response = await fetch(provider.responsesEndpoint, {
    method: "POST",
    headers: provider.headers(),
    body: JSON.stringify(body),
    signal
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    const e = new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    callbacks.onError?.(e);
    throw e;
  }

  let responseId = null;
  let finalResponse = null;
  let currentText = "";

  const itemIdToCallId = new Map();
  const argsByCallId = new Map();
  const outputItemsDone = [];

  const normalizeBlocksFromOutput = (output = []) => {
    const blocks = [];
    for (const item of output) {
      if (!item || typeof item !== "object") continue;

      if (
        item.type === "message" &&
        item.role === "assistant" &&
        Array.isArray(item.content)
      ) {
        for (const part of item.content) {
          if (part?.type === "output_text") {
            blocks.push({ type: "text", text: String(part.text ?? "") });
          }
        }
      } else if (item.type === "function_call") {
        let parsed = {};
        try {
          parsed = item.arguments ? JSON.parse(item.arguments) : {};
        } catch {
          parsed = {};
        }
        blocks.push({
          type: "tool_use",
          id: item.call_id ?? item.id,
          name: item.name,
          input: parsed
        });
      } else if (item.type === "custom_tool_call") {
        blocks.push({
          type: "tool_use",
          id: item.call_id ?? item.id,
          name: item.name,
          input: item.input ?? ""
        });
      }
    }
    return blocks;
  };

  await parseSSEStream(
    response.body,
    (event) => {
      const t = event?.type;

      if (t === "response.created") {
        responseId = event?.response?.id ?? responseId;
      }

      if (t === "response.output_text.delta") {
        const delta = event?.delta ?? "";
        currentText += delta;
        callbacks.onText?.(delta);
      }

      if (t === "response.output_item.added") {
        const item = event?.item;
        if (item?.type === "function_call") {
          if (item.id && (item.call_id ?? item.id))
            itemIdToCallId.set(item.id, item.call_id ?? item.id);
          callbacks.onToolCall?.(item.call_id ?? item.id, item.name);
        } else if (item?.type === "custom_tool_call") {
          if (item.id && (item.call_id ?? item.id))
            itemIdToCallId.set(item.id, item.call_id ?? item.id);
          callbacks.onToolCall?.(item.call_id ?? item.id, item.name);
        }
      }

      if (t === "response.function_call_arguments.delta") {
        const itemId = event?.item_id;
        const callId = itemIdToCallId.get(itemId) ?? itemId;
        const delta = event?.delta ?? "";
        argsByCallId.set(callId, (argsByCallId.get(callId) ?? "") + delta);
        callbacks.onToolCallDelta?.(callId, delta);
      }

      if (t === "response.function_call_arguments.done") {
        const itemId = event?.item_id;
        const callId = itemIdToCallId.get(itemId) ?? itemId;
        const args = event?.arguments ?? "";
        argsByCallId.set(callId, args);
      }

      if (t === "response.output_item.done") {
        const idx = event?.output_index;
        if (Number.isInteger(idx)) outputItemsDone[idx] = event?.item;
      }

      if (t === "response.completed") {
        finalResponse = event?.response ?? finalResponse;
        responseId = finalResponse?.id ?? responseId;
      }

      if (t === "response.failed") {
        const msg = event?.response?.error?.message ?? "Unknown error";
        const e = new Error(msg);
        callbacks.onError?.(e);
      }
    },
    signal
  );

  const output = finalResponse?.output ?? outputItemsDone.filter(Boolean);
  let blocks = normalizeBlocksFromOutput(output);

  if (blocks.length === 0 && currentText)
    blocks = [{ type: "text", text: currentText }];

  const usage = finalResponse?.usage ?? null;
  const finishReason = finalResponse?.status ?? "unknown";

  callbacks.onFinish?.({
    responseId,
    finishReason,
    usage,
    blocks
  });

  return {
    responseId,
    finishReason,
    usage,
    blocks,
    raw: finalResponse
  };
}
)}

function _toolRegistry(createToolRegistry){return(
createToolRegistry()
)}

function _toolRegistry_sync(toolRegistry,allTools){return(
(() => {
  const prevIds = new Set(toolRegistry.ids());
  const nextIds = new Set(
    (Array.isArray(allTools) ? allTools : [])
      .map((t) => String(t?.id ?? ""))
      .filter(Boolean)
  );

  for (const t of Array.isArray(allTools) ? allTools : []) {
    if (t && typeof t === "object" && typeof t.id === "string" && t.id)
      toolRegistry.register(t);
  }

  for (const id of prevIds) {
    if (!nextIds.has(id)) toolRegistry.unregister(id);
  }

  return { tools: nextIds.size };
})()
)}

function _streamAnthropicBlocks(parseSSEStream){return(
async ({
  provider,
  model,
  messages,
  systemPrompt,
  tools,
  callbacks = {},
  signal,
  settings = {}
}) => {
  const body = {
    model,
    messages,
    max_tokens: settings.max_tokens || 4096,
    stream: true,
    ...settings
  };
  if (systemPrompt) body.system = systemPrompt;
  if (tools && tools.length > 0) body.tools = tools;

  const response = await fetch(provider.messagesEndpoint, {
    method: "POST",
    headers: provider.headers(),
    body: JSON.stringify(body),
    signal
  });

  if (!response.ok) {
    const error = await response.text();
    const e = new Error("Anthropic API error: " + response.status + " - " + error);
    callbacks.onError?.(e);
    throw e;
  }

  const blocks = [];
  let current = null;
  let stopReason = null;
  let usage = null;

  const finishBlock = () => {
    if (!current) return;
    if (current.type === "text") {
      blocks.push({ type: "text", text: current.text });
    } else if (current.type === "tool_use") {
      let input = {};
      try {
        input = current.input_json ? JSON.parse(current.input_json) : {};
      } catch {
        input = {};
      }
      blocks.push({ type: "tool_use", id: current.id, name: current.name, input });
    }
    current = null;
  };

  await parseSSEStream(
    response.body,
    (event) => {
      if (event.type === "message_start") usage = event.message?.usage ?? usage;

      if (event.type === "content_block_start") {
        const b = event.content_block;
        if (b?.type === "text") current = { type: "text", text: "" };
        else if (b?.type === "tool_use") {
          current = { type: "tool_use", id: b.id, name: b.name, input_json: "" };
          callbacks.onToolCall?.(b.id, b.name);
        }
      }

      if (event.type === "content_block_delta") {
        const d = event.delta;
        if (d?.type === "text_delta" && current?.type === "text") {
          current.text += d.text;
          callbacks.onText?.(d.text);
        } else if (d?.type === "thinking_delta") {
          callbacks.onReasoning?.(d.thinking);
        } else if (d?.type === "input_json_delta" && current?.type === "tool_use") {
          current.input_json += d.partial_json;
          callbacks.onToolCallDelta?.(current.id, d.partial_json);
        }
      }

      if (event.type === "content_block_stop") finishBlock();

      if (event.type === "message_delta") {
        stopReason = event.delta?.stop_reason ?? stopReason;
        if (event.usage) usage = { ...(usage ?? {}), ...event.usage };
      }
    },
    signal
  );

  finishBlock();
  callbacks.onFinish?.({ finishReason: stopReason, usage, blocks });

  return { blocks, finishReason: stopReason, usage };
}
)}

function _generateId(){return(
() => crypto.randomUUID()
)}

function _createUserMessage(generateId){return(
({sessionId, agent, providerId, modelId, system, tools}) => ({
    id: generateId(),
    sessionId,
    role: 'user',
    time: { created: Date.now() },
    agent,
    model: {
        providerId,
        modelId
    },
    system,
    tools
})
)}

function _createAssistantMessage(generateId){return(
({sessionId, parentId, agent, providerId, modelId}) => ({
    id: generateId(),
    sessionId,
    role: 'assistant',
    time: {
        created: Date.now(),
        completed: null
    },
    parentId,
    agent,
    providerId,
    modelId,
    error: null,
    cost: 0,
    tokens: {
        input: 0,
        output: 0,
        reasoning: 0,
        cache: {
            read: 0,
            write: 0
        }
    },
    finish: null
})
)}

function _test_opencode_generateId(generateId)
{
    const id = generateId();
    if (typeof id !== 'string' || id.length < 30)
        throw new Error('bad id: ' + typeof id);
    return 'pass';
}


function _test_opencode_createUserMessage(createUserMessage)
{
    const msg = createUserMessage({
        sessionId: 'test',
        agent: 'user',
        providerId: 'anthropic',
        modelId: 'claude'
    });
    if (!msg.id || msg.role !== 'user')
        throw new Error('failed: ' + JSON.stringify(msg));
    return 'pass';
}


function _test_opencode_createAssistantMessage(createAssistantMessage)
{
    const msg = createAssistantMessage({
        sessionId: 'test',
        parentId: 'p1',
        agent: 'assistant',
        providerId: 'anthropic',
        modelId: 'claude'
    });
    if (!msg.id || msg.role !== 'assistant')
        throw new Error('failed');
    return 'pass';
}


function _createTextPart(generateId){return(
({sessionId, messageId, text, synthetic = false}) => ({
    id: generateId(),
    sessionId,
    messageId,
    type: 'text',
    text,
    synthetic,
    time: {
        start: Date.now(),
        end: null
    }
})
)}

function _createReasoningPart(generateId){return(
({sessionId, messageId, text}) => ({
    id: generateId(),
    sessionId,
    messageId,
    type: 'reasoning',
    text,
    time: {
        start: Date.now(),
        end: null
    }
})
)}

function _toolStatePending(){return(
(input, raw = '') => ({
    status: 'pending',
    input,
    raw
})
)}

function _toolStateRunning(){return(
(input, title = null) => ({
    status: 'running',
    input,
    title,
    metadata: {},
    time: { start: Date.now() }
})
)}

function _toolStateCompleted(){return(
({input, output, title, metadata = {}, startTime}) => ({
    status: 'completed',
    input,
    output,
    title,
    metadata,
    time: {
        start: startTime,
        end: Date.now()
    }
})
)}

function _toolStateError(){return(
({input, error, startTime}) => ({
    status: 'error',
    input,
    error,
    metadata: {},
    time: {
        start: startTime,
        end: Date.now()
    }
})
)}

function _createToolPart(generateId){return(
({sessionId, messageId, callId, tool, state}) => ({
    id: generateId(),
    sessionId,
    messageId,
    type: 'tool',
    callId,
    tool,
    state,
    metadata: {}
})
)}

function _parseSSEStream(){return(
async (stream, onEvent, signal) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    try {
        while (true) {
            if (signal?.aborted)
                break;
            const {done, value} = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]')
                        return;
                    try {
                        onEvent(JSON.parse(data));
                    } catch {
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}
)}

function _streamAnthropic(parseSSEStream){return(
async ({provider, model, messages, systemPrompt, tools, callbacks, signal, settings = {}}) => {
    const body = {
        model,
        messages,
        max_tokens: settings.max_tokens || 4096,
        stream: true,
        ...settings
    };
    if (systemPrompt)
        body.system = systemPrompt;
    if (tools && tools.length > 0)
        body.tools = tools;
    const response = await fetch(provider.messagesEndpoint, {
        method: 'POST',
        headers: provider.headers(),
        body: JSON.stringify(body),
        signal
    });
    if (!response.ok) {
        const error = await response.text();
        callbacks.onError?.(new Error('Anthropic API error: ' + response.status + ' - ' + error));
        throw new Error('Anthropic API error: ' + response.status);
    }
    let currentToolUse = null;
    let stopReason = null;
    let usage = null;
    await parseSSEStream(response.body, event => {
        if (event.type === 'message_start')
            usage = event.message?.usage;
        if (event.type === 'content_block_start') {
            const block = event.content_block;
            if (block?.type === 'tool_use') {
                currentToolUse = {
                    id: block.id,
                    name: block.name,
                    input: ''
                };
                callbacks.onToolCall?.(block.id, block.name);
            }
        }
        if (event.type === 'content_block_delta') {
            const delta = event.delta;
            if (delta?.type === 'text_delta')
                callbacks.onText?.(delta.text);
            else if (delta?.type === 'thinking_delta')
                callbacks.onReasoning?.(delta.thinking);
            else if (delta?.type === 'input_json_delta' && currentToolUse) {
                currentToolUse.input += delta.partial_json;
                callbacks.onToolCallDelta?.(currentToolUse.id, delta.partial_json);
            }
        }
        if (event.type === 'content_block_stop')
            currentToolUse = null;
        if (event.type === 'message_delta') {
            stopReason = event.delta?.stop_reason;
            if (event.usage)
                usage = {
                    ...usage,
                    ...event.usage
                };
        }
    }, signal);
    callbacks.onFinish?.({
        finishReason: stopReason,
        usage
    });
    return {
        finishReason: stopReason,
        usage
    };
}
)}

function _completeAssistantMessage(){return(
(message, {finish, tokens, cost}) => ({
    ...message,
    time: {
        ...message.time,
        completed: Date.now()
    },
    finish,
    tokens: tokens || message.tokens,
    cost: cost ?? message.cost
})
)}

function _createStepStartPart(generateId){return(
({sessionId, messageId}) => ({
    id: generateId(),
    sessionId,
    messageId,
    type: 'step-start'
})
)}

function _createStepFinishPart(generateId){return(
({sessionId, messageId, reason, tokens, cost}) => ({
    id: generateId(),
    sessionId,
    messageId,
    type: 'step-finish',
    reason,
    cost,
    tokens
})
)}

function _createMessageWithParts(){return(
(info, parts = []) => ({
    info,
    parts
})
)}

function _addPart(){return(
(messageWithParts, part) => ({
    ...messageWithParts,
    parts: [
        ...messageWithParts.parts,
        part
    ]
})
)}

function _updatePart(){return(
(messageWithParts, partId, updates) => ({
    ...messageWithParts,
    parts: messageWithParts.parts.map(p => p.id === partId ? {
        ...p,
        ...updates
    } : p)
})
)}

function _createConversation(generateId){return(
({id} = {}) => ({
    id: id || generateId(),
    messages: [],
    created: Date.now()
})
)}

function _addMessage(){return(
(conversation, messageWithParts) => ({
    ...conversation,
    messages: [
        ...conversation.messages,
        messageWithParts
    ]
})
)}

function _isToolPart(){return(
part => part?.type === 'tool'
)}

function _updateToolPart(isToolPart){return(
(message, callId, updates) => ({
    ...message,
    parts: message.parts.map(p => isToolPart(p) && p.callId === callId ? {
        ...p,
        ...updates
    } : p)
})
)}

function _conversationToMessages(){return(
conversation => conversation.messages.map(msg => {
    const role = msg.info.role;
    if (role === 'user') {
        const textParts = msg.parts.filter(p => p.type === 'text');
        return {
            role: 'user',
            content: textParts.map(p => p.text).join('\n')
        };
    } else if (role === 'assistant') {
        return {
            role: 'assistant',
            parts: msg.parts
        };
    }
    return {
        role,
        content: ''
    };
})
)}

function _createLoop(anthropicProvider,createConversation,AbortController,createUserMessage,createMessageWithParts,createTextPart,addMessage,createAssistantMessage,createStepStartPart,streamAnthropic,conversationToMessages,addPart,updatePart,createToolPart,toolStatePending,updateToolPart,toolStateRunning,createToolContext,globalRuntime,toolStateError,toolStateCompleted,normalizeUsage,createStepFinishPart,completeAssistantMessage){return(
(config) => {
  const {
    providerId,
    modelId,
    apiKey,
    systemPrompt,
    registry,
    maxSteps = 100,
    settings = {}
  } = config;

  const provider = anthropicProvider({ apiKey });
  const tools = registry.toAnthropicFormat();

  let conversation = createConversation();
  let abortController = null;
  let isRunning = false;

  async function run(userPrompt, callbacks = {}) {
    if (isRunning) throw new Error("Loop is already running");
    isRunning = true;
    abortController = new AbortController();

    try {
      const userMessage = createUserMessage({
        sessionId: conversation.id,
        agent: "user",
        providerId,
        modelId,
        system: systemPrompt,
        tools
      });

      const userWithParts = createMessageWithParts(userMessage, [
        createTextPart({
          sessionId: conversation.id,
          messageId: userMessage.id,
          text: userPrompt
        })
      ]);

      conversation = addMessage(conversation, userWithParts);

      let step = 0;
      while (step < maxSteps) {
        if (abortController.signal.aborted) break;

        callbacks.onStepStart?.(step);

        const assistantMessage = createAssistantMessage({
          sessionId: conversation.id,
          parentId: userMessage.id,
          agent: "assistant",
          providerId,
          modelId
        });

        let currentMessage = createMessageWithParts(assistantMessage, [
          createStepStartPart({
            sessionId: conversation.id,
            messageId: assistantMessage.id
          })
        ]);

        let currentText = "";
        let currentTextPartId = null;

        const pendingToolCalls = new Map();

        const result = await streamAnthropic({
          provider,
          model: modelId,
          messages: conversationToMessages(conversation),
          systemPrompt,
          tools,
          signal: abortController.signal,
          settings,
          callbacks: {
            onText: (chunk) => {
              currentText += chunk;

              if (!currentTextPartId) {
                const textPart = createTextPart({
                  sessionId: conversation.id,
                  messageId: assistantMessage.id,
                  text: currentText
                });
                currentTextPartId = textPart.id;
                currentMessage = addPart(currentMessage, textPart);
              } else {
                currentMessage = updatePart(currentMessage, currentTextPartId, {
                  text: currentText
                });
              }

              callbacks.onText?.(chunk);
              callbacks.onMessage?.(currentMessage);
            },
            onToolCall: (callId, toolName) => {
              const toolPart = createToolPart({
                sessionId: conversation.id,
                messageId: assistantMessage.id,
                callId,
                tool: toolName,
                state: toolStatePending({}, "")
              });

              pendingToolCalls.set(callId, { toolName, args: "" });
              currentMessage = addPart(currentMessage, toolPart);
              callbacks.onMessage?.(currentMessage);
            },
            onToolCallDelta: (callId, chunk) => {
              const tc = pendingToolCalls.get(callId);
              if (tc) tc.args += chunk;
            },
            onError: (error) => callbacks.onError?.(error)
          }
        });

        let hasToolCalls = false;

        for (const [callId, tc] of pendingToolCalls) {
          hasToolCalls = true;

          let input = {};
          try {
            input = JSON.parse(tc.args);
          } catch {}

          const startTime = Date.now();
          currentMessage = updateToolPart(currentMessage, callId, {
            state: toolStateRunning(input, "Running " + tc.toolName)
          });

          callbacks.onToolStart?.(callId, tc.toolName, input);

          const ctx = await createToolContext({
            sessionId: conversation.id,
            messageId: assistantMessage.id,
            agent: "assistant",
            callId,
            abort: abortController.signal,
            runtime: globalRuntime
          });

          const toolResult = await registry.execute(tc.toolName, input, ctx);

          if (toolResult.metadata?.error) {
            currentMessage = updateToolPart(currentMessage, callId, {
              state: toolStateError({
                input,
                error: toolResult.output,
                startTime
              })
            });
          } else {
            currentMessage = updateToolPart(currentMessage, callId, {
              state: toolStateCompleted({
                input,
                output: toolResult.output,
                title: toolResult.title,
                metadata: toolResult.metadata,
                startTime
              })
            });
          }

          callbacks.onToolFinish?.(callId, tc.toolName, toolResult);
          callbacks.onMessage?.(currentMessage);
        }

        const normalizedTokens = normalizeUsage(result.usage, providerId);

        const stepFinishPart = createStepFinishPart({
          sessionId: conversation.id,
          messageId: assistantMessage.id,
          reason: result.finishReason || "unknown",
          tokens: normalizedTokens,
          cost: 0
        });

        currentMessage = addPart(currentMessage, stepFinishPart);
        currentMessage = {
          ...currentMessage,
          info: completeAssistantMessage(currentMessage.info, {
            finish: result.finishReason,
            tokens: normalizedTokens,
            cost: 0
          })
        };

        conversation = addMessage(conversation, currentMessage);
        callbacks.onStepFinish?.(step, currentMessage);

        const shouldContinue =
          hasToolCalls && result.finishReason !== "end_turn";
        if (!shouldContinue) break;

        step++;
      }

      callbacks.onFinish?.(conversation);
      return conversation;
    } finally {
      isRunning = false;
      abortController = null;
    }
  }

  function cancel() {
    if (abortController) abortController.abort();
  }

  function getConversation() {
    return conversation;
  }

  function reset() {
    if (isRunning) throw new Error("Cannot reset while running");
    conversation = createConversation();
  }

  function running() {
    return isRunning;
  }

  return { run, cancel, getConversation, reset, running };
}
)}

function _102(md){return(
md`### Context`
)}

function _resolveRuntimeModules(globalRuntime,$0,moduleMap){return(
async (runtime) => {
  const rt = runtime ?? globalRuntime;

  if (rt === globalRuntime) {
    return $0.value;
  }

  return await moduleMap(rt);
}
)}

function _id()
{
  let guid = 0;
  return (v) => v.id || (v.id = guid++);
}


function _cdata(){return(
(s) => `<![CDATA[${String(s).replaceAll("]]>", "]]]]><![CDATA[>")}]]>`
)}

function _variablesXML(getPromiseState,id,cdata,summarizeJS){return(
async (ctx, variables, { max_size = 200 } = {}) => {
  const modules = ctx?.moduleMap;
  const moduleNameOf = (mod) =>
    String(modules?.get(mod)?.name ?? mod?._name ?? "main").trim() || "main";

  const varNameOf = (v) => (typeof v?._name === "string" ? v._name : "");

  const fmtInput = (parentVar, inputVar) => {
    const inName = varNameOf(inputVar);
    if (!inName) return "";
    const parentModule = moduleNameOf(parentVar?._module);
    const inModule = moduleNameOf(inputVar?._module);
    return inModule && parentModule && inModule !== parentModule
      ? `${inModule}#${inName}`
      : inName;
  };

  const safeInputs = (v) =>
    (Array.isArray(v?._inputs) ? v._inputs : [])
      .map((i) => fmtInput(v, i))
      .filter(Boolean)
      .join(", ");

  return (
    await Promise.all(
      (Array.isArray(variables) ? variables : []).map(async (v) => {
        const modName = moduleNameOf(v._module);
        const inputs = safeInputs(v);
        const state = await getPromiseState(v._promise);
        return `<variable module="${modName}" id="${id(v)}"${
          v?._name ? ` name="${v._name}"` : ""
        } state="${state.state}" version="${v?._version}" reachable="${
          v?._reachable
        }">
  <inputs>${inputs}</inputs>
  <definition>${cdata(v?._definition?.toString?.() ?? "")}></definition>
  <value>${cdata(summarizeJS(v?._value, { max_size }))}></value>${
          state.error
            ? `\n  <error>${cdata(
                summarizeJS(state.error, { max_size })
              )}></error>`
            : ""
        }
</variable>\n`;
      })
    )
  ).join("\n");
}
)}

function _parseVariablesXML(DOMParser){return(
function parseVariablesXML(text) {
  text = `<root>${text}</root>`;
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) {
    const err = doc.querySelector("parsererror");
    console.log(err.textContent);
    throw err;
  }

  return [...doc.documentElement.getElementsByTagName("variable")].map((el) => {
    const module = el.getAttribute("module") || "";
    const id = el.getAttribute("id") || "";
    const name = el.getAttribute("name") || null;

    const inputsText = el.querySelector("inputs")?.textContent?.trim() || "";
    const inputs = inputsText
      ? inputsText.split(/\s*,\s*/).filter(Boolean)
      : [];

    const definition = el.querySelector("definition")?.textContent || "";
    const value = el.querySelector("value")?.textContent || "";

    return { module, id, name, inputs, definition, value };
  });
}
)}

function _robocoopPrototypeModule(thisModule){return(
thisModule()
)}

function _idVariable(id,lookupVariable,robocoopPrototypeModule)
{
  id;
  return lookupVariable("id", robocoopPrototypeModule);
}


function _importVariable(lookupVariable,robocoopPrototypeModule){return(
lookupVariable("moduleMap", robocoopPrototypeModule)
)}

function _111(currentModules,importVariable){return(
currentModules.get(importVariable._inputs[0]._module)
)}

async function _test_variablesXML_smoke(createToolContext,globalRuntime,variablesXML,idVariable)
{
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_list_variables_default_reachable_only",
    runtime: globalRuntime
  });
  return variablesXML(ctx, [idVariable]);
}


async function _test_variablesXML_importVariable(createToolContext,globalRuntime,variablesXML,importVariable)
{
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_list_variables_default_reachable_only",
    runtime: globalRuntime
  });
  const importDesc = await variablesXML(ctx, [importVariable]);
  if (!importDesc.includes("@tomlarkworthy/module-map#moduleMap"))
    throw "can't find import";

  return importDesc;
}


function _expected_error()
{
  throw "myError";
}


async function _test_variablesXML_erroredVariable(createToolContext,globalRuntime,lookupVariable,robocoopPrototypeModule,variablesXML)
{
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_list_variables_default_reachable_only",
    runtime: globalRuntime
  });
  const variable = await lookupVariable(
    "expected_error",
    robocoopPrototypeModule
  );
  debugger;
  const importDesc = await variablesXML(ctx, [variable]);
  if (!importDesc.includes("myError")) throw "can't find error";

  return importDesc;
}


function _test_parseVariablesXML_smoke(parseVariablesXML,test_variablesXML_smoke)
{
  return parseVariablesXML("yo" + test_variablesXML_smoke);
}


function _117(md){return(
md`## Tools

Note OpenAI: 'required' is required to be supplied and to be an array including every key in properties.`
)}

function _toolRegistry_ui(toolRegistry_recording,toolRegistry_history_limit,toolRegistry_stats,htl,toolRegistry_history_filtered,$0,$1,$2,$3){return(
(() => {
  const root = document.createElement("div");
  root.value = {
    recording: !!toolRegistry_recording,
    historyLimit: toolRegistry_history_limit,
    stats: toolRegistry_stats ?? null
  };

  root.style.display = "grid";
  root.style.gap = "12px";
  root.style.fontFamily =
    "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

  const css = htl.html`<style>
.tri-wrap{display:grid;gap:12px}
.tri-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.tri-card{border:1px solid #e5e5e5;border-radius:10px;padding:10px;background:#fff}
.tri-title{font-weight:800;font-size:13px;color:#111;margin:0 0 8px 0;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.tri-meta{font-size:12px;color:#333;display:flex;gap:12px;flex-wrap:wrap}
.tri-small{font-size:12px;color:#444}
.tri-bars{display:grid;gap:6px}
.tri-bar{display:grid;grid-template-columns:220px 1fr 130px;gap:8px;align-items:center}
.tri-bar .label{font-size:12px;color:#111;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tri-bar .barbg{height:10px;border-radius:999px;background:#f0f0f0;overflow:hidden;border:1px solid #ededed}
.tri-bar .barfg{height:100%;background:#2f6feb}
.tri-bar .nums{font-size:12px;color:#333;text-align:right}
.tri-table{width:100%;border-collapse:collapse;font-size:12px}
.tri-table th,.tri-table td{padding:6px 8px;border-bottom:1px solid #f0f0f0;vertical-align:top}
.tri-table th{color:#111;text-align:left;font-weight:700;background:#fafafa;position:sticky;top:0}
.tri-badge{display:inline-block;padding:2px 8px;border-radius:999px;border:1px solid #e5e5e5;background:#fafafa;font-size:11px;color:#333}
.tri-badge.err{border-color:#ffd7d7;background:#fff4f4;color:#8a0f0f}
.tri-pre{white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:11px;line-height:1.35;background:#0b1020;color:#e9eefc;padding:10px;border-radius:8px;margin:0}
.tri-code{white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:11px;line-height:1.35;background:#f7f7f8;padding:8px;border-radius:8px;margin:0;border:1px solid #ededed;color:#111}
.tri-details details{border:1px solid #e8e8e8;border-radius:10px;padding:8px 10px;background:#fff}
.tri-details summary{cursor:pointer;font-size:12px;color:#111}
.tri-muted{color:#666}
</style>`;

  const fmtPct = (x) => (Number.isFinite(x) ? (x * 100).toFixed(1) + "%" : "");
  const fmtMs = (x) => (Number.isFinite(x) ? Math.round(x) + "ms" : "");
  const fmtBytes = (x) => {
    const n = Number(x ?? 0);
    if (!Number.isFinite(n) || n <= 0) return "0 B";
    if (n < 1024) return `${Math.round(n)} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  };
  const fmtTime = (ms) =>
    Number.isFinite(ms) ? new Date(ms).toLocaleString() : "";

  const stats = toolRegistry_stats ?? {
    overall: { total: 0 },
    tools: [],
    maxCalls: 0
  };
  const overall = stats.overall ?? {};
  const tools = Array.isArray(stats.tools) ? stats.tools : [];
  const maxCalls = Math.max(1, Number(stats.maxCalls ?? 1));
  const filtered = Array.isArray(toolRegistry_history_filtered)
    ? toolRegistry_history_filtered
    : [];

  const header = htl.html`<div class="tri-card">
    <div class="tri-title">
      <div>toolRegistry inspector (global)</div>
      <div class="tri-row">
        <span class="tri-badge">${
          toolRegistry_recording ? "recording: on" : "recording: off"
        }</span>
        <span class="tri-badge">history limit: ${toolRegistry_history_limit}</span>
      </div>
    </div>
    <div class="tri-row">
      ${$0}
      ${$1}
      ${$2}
    </div>
    <div class="tri-row">
      ${$3}
    </div>
  </div>`;

  const summary = htl.html`<div class="tri-card">
    <div class="tri-title"><div>Summary</div><div class="tri-muted">All recorded calls</div></div>
    <div class="tri-meta">
      <div><b>Total calls</b>: ${overall.total ?? 0}</div>
      <div><b>Tools used</b>: ${overall.tools ?? 0}</div>
      <div><b>Error rate</b>: ${fmtPct(overall.errorRate ?? 0)} (${
    overall.errors ?? 0
  })</div>
      <div><b>Avg duration</b>: ${fmtMs(overall.avgDurationMs ?? 0)}</div>
      <div><b>Avg args size</b>: ${fmtBytes(overall.avgArgsBytes ?? 0)}</div>
      <div><b>Avg output size</b>: ${fmtBytes(
        overall.avgOutputBytes ?? 0
      )}</div>
      <div><b>Avg ctx metadata size</b>: ${fmtBytes(
        overall.avgCtxBytes ?? 0
      )}</div>
    </div>
  </div>`;

  const bars = htl.html`<div class="tri-card">
    <div class="tri-title"><div>Most used tools</div><div class="tri-muted">by call count</div></div>
    <div class="tri-bars">
      ${tools.slice(0, 20).map((t) => {
        const w = Math.max(0, Math.min(1, t.calls / maxCalls)) * 100;
        const badge = t.errors
          ? htl.html`<span class="tri-badge err">${fmtPct(
              t.errorRate
            )} err</span>`
          : htl.html`<span class="tri-badge">ok</span>`;
        return htl.html`<div class="tri-bar">
          <div class="label" title="${t.toolId}">${t.toolId}</div>
          <div class="barbg"><div class="barfg" style="width:${w}%"></div></div>
          <div class="nums">${t.calls} calls ${badge}</div>
        </div>`;
      })}
      ${
        tools.length === 0
          ? htl.html`<div class="tri-small">No calls recorded yet.</div>`
          : null
      }
    </div>
  </div>`;

  const toolTable = htl.html`<div class="tri-card" style="max-height: 420px; overflow:auto;">
    <div class="tri-title"><div>Tool stats</div><div class="tri-muted">all time</div></div>
    <table class="tri-table">
      <thead>
        <tr>
          <th style="width: 220px;">Tool</th>
          <th>Calls</th>
          <th>Errors</th>
          <th>Error rate</th>
          <th>Avg duration</th>
          <th>Avg args</th>
          <th>Avg output</th>
          <th>Avg ctx meta</th>
        </tr>
      </thead>
      <tbody>
        ${tools.map(
          (t) => htl.html`<tr>
          <td title="${t.toolId}">${t.toolId}</td>
          <td>${t.calls}</td>
          <td>${t.errors}</td>
          <td>${fmtPct(t.errorRate)}</td>
          <td>${fmtMs(t.avgDurationMs)}</td>
          <td>${fmtBytes(t.avgArgsBytes)}</td>
          <td>${fmtBytes(t.avgOutputBytes)}</td>
          <td>${fmtBytes(t.avgCtxBytes)}</td>
        </tr>`
        )}
        ${
          tools.length === 0
            ? htl.html`<tr><td colspan="8" class="tri-muted">No recorded calls yet.</td></tr>`
            : null
        }
      </tbody>
    </table>
  </div>`;

  const calls = htl.html`<div class="tri-card tri-details">
    <div class="tri-title"><div>Call history (filtered)</div><div class="tri-muted">${
      filtered.length
    } rows shown</div></div>
    <div style="display:grid; gap:10px;">
      ${filtered.map((r, idx) => {
        const ok = r.ok !== false;
        const badge = ok
          ? htl.html`<span class="tri-badge">ok</span>`
          : htl.html`<span class="tri-badge err">error</span>`;
        const ctx = r.ctx ?? {};
        const metaPreview = (() => {
          try {
            return JSON.stringify(ctx.metadata ?? {}, null, 2);
          } catch {
            return "";
          }
        })();
        const resMetaPreview = (() => {
          try {
            return JSON.stringify(r.resultMetadata ?? {}, null, 2);
          } catch {
            return "";
          }
        })();
        return htl.html`<details >
          <summary>
            ${badge}
            <b>${String(r.toolId ?? "")}</b>
            <span class="tri-muted">• ${fmtTime(r.time)} • ${fmtMs(
          r.durationMs
        )} • phase: ${String(r.phase ?? "")}</span>
          </summary>
          <div style="display:grid; gap:10px; margin-top:8px;">
            <div class="tri-meta">
              <div><b>callId</b>: ${String(ctx.callId ?? "")}</div>
              <div><b>sessionId</b>: ${String(ctx.sessionId ?? "")}</div>
              <div><b>messageId</b>: ${String(ctx.messageId ?? "")}</div>
              <div><b>agent</b>: ${String(ctx.agent ?? "")}</div>
              <div><b>args size</b>: ${fmtBytes(r.argsSize ?? 0)}</div>
              <div><b>output size</b>: ${fmtBytes(r.outputSize ?? 0)}</div>
              <div><b>ctx meta size</b>: ${fmtBytes(
                ctx.metadataSize ?? 0
              )}</div>
            </div>

            ${
              r.errorMessage
                ? htl.html`<div>
                  <div class="tri-small"><b>Error message</b></div>
                  <pre class="tri-pre">${String(r.errorMessage)}</pre>
                </div>`
                : null
            }

            <div>
              <div class="tri-small"><b>Args</b></div>
              <pre class="tri-code">${String(r.argsRaw ?? "") || "(none)"}</pre>
            </div>

            <div>
              <div class="tri-small"><b>Output</b></div>
              <pre class="tri-code">${String(r.output ?? "") || "(none)"}</pre>
            </div>

            <div>
              <div class="tri-small"><b>Result metadata</b></div>
              <pre class="tri-code">${resMetaPreview || "(none)"}</pre>
            </div>

            <div>
              <div class="tri-small"><b>Context metadata (ctx.metadata)</b></div>
              <pre class="tri-code">${metaPreview || "(none)"}</pre>
            </div>
          </div>
        </details>`;
      })}
      ${
        filtered.length === 0
          ? htl.html`<div class="tri-small">No matching calls. (Tip: enable recording, then run the agent or call tools.)</div>`
          : null
      }
    </div>
  </div>`;

  root.appendChild(css);
  root.appendChild(header);
  root.appendChild(summary);
  root.appendChild(bars);
  root.appendChild(toolTable);
  root.appendChild(calls);

  return root;
})()
)}

function _TOOL_SUMMARY_MAX_SIZE(){return(
1000
)}

function _defineTool(){return(
({id, description, parameters, execute}) => {
    if (!id || typeof id !== 'string')
        throw new Error('Tool must have a string id');
    if (!description || typeof description !== 'string')
        throw new Error('Tool must have a string description');
    if (!parameters || typeof parameters !== 'object')
        throw new Error('Tool must have a parameters object');
    if (!execute || typeof execute !== 'function')
        throw new Error('Tool must have an execute function');
    return {
        id,
        description,
        parameters,
        execute: async (args, ctx) => {
            try {
                if (ctx.abort?.aborted)
                    return {
                        title: id + ' aborted',
                        output: 'Execution was aborted',
                        metadata: { aborted: true }
                    };
                const result = await execute(args, ctx);
                return {
                    title: result.title || id + ' completed',
                    output: typeof result.output === 'string' ? result.output : JSON.stringify(result.output),
                    metadata: {
                        ...ctx.getMetadata?.() || {},
                        ...result.metadata
                    }
                };
            } catch (error) {
                return {
                    title: id + ' failed',
                    output: 'Error: ' + error.message,
                    metadata: {
                        error: true,
                        errorMessage: error.message
                    }
                };
            }
        }
    };
}
)}

function _createToolContext(globalRuntime,generateId,AbortController,resolveRuntimeModules){return(
async ({
  sessionId,
  messageId,
  agent,
  callId,
  abort,
  runtime = globalRuntime
}) => {
  let currentMetadata = {};
  return {
    sessionId,
    messageId,
    agent,
    callId: callId || generateId(),
    abort: abort || new AbortController().signal,
    runtime,
    metadata(update) {
      currentMetadata = {
        ...currentMetadata,
        ...update
      };
    },
    moduleMap: await resolveRuntimeModules(runtime),
    getMetadata() {
      return currentMetadata;
    }
  };
}
)}

function _validateParameters()
{
  const validate = (schema, value) => {
    const errors = [];
    if (!schema || typeof schema !== "object") return { valid: true, errors };

    const type = schema.type;

    if (type === "object") {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        errors.push("Expected object");
        return { valid: false, errors };
      }

      const props = schema.properties || {};
      const required = Array.isArray(schema.required) ? schema.required : [];

      for (const field of required) {
        if (!(field in value)) errors.push("Missing required field: " + field);
      }

      if (schema.additionalProperties === false) {
        for (const k of Object.keys(value)) {
          if (!(k in props)) errors.push("Unexpected field: " + k);
        }
      }

      for (const [key, propSchema] of Object.entries(props)) {
        if (key in value) {
          const r = validate(propSchema, value[key]);
          if (!r.valid) errors.push(...r.errors.map((e) => key + ": " + e));
        }
      }
    } else if (type === "string") {
      if (typeof value !== "string") errors.push("Expected string, got " + typeof value);
    } else if (type === "number") {
      if (typeof value !== "number" || Number.isNaN(value)) errors.push("Expected number, got " + typeof value);
    } else if (type === "integer") {
      if (typeof value !== "number" || !Number.isInteger(value)) errors.push("Expected integer, got " + typeof value);
    } else if (type === "boolean") {
      if (typeof value !== "boolean") errors.push("Expected boolean, got " + typeof value);
    } else if (type === "array") {
      if (!Array.isArray(value)) errors.push("Expected array, got " + typeof value);
      else if (schema.items) {
        value.forEach((item, i) => {
          const r = validate(schema.items, item);
          if (!r.valid) errors.push(...r.errors.map((e) => "[" + i + "]: " + e));
        });
      }
    }

    return { valid: errors.length === 0, errors };
  };

  return validate;
}


function _createToolRegistry(toolRegistry_recording,$0,toolRegistry_history_limit,validateParameters){return(
() => {
  const tools = new Map();

  const normalizeSchema = (schema) => {
    if (!schema || typeof schema !== "object") return schema;
    if (Array.isArray(schema)) return schema.map(normalizeSchema);
    const s = { ...schema };

    const normalizeCombinators = (obj) => {
      if (Array.isArray(obj.anyOf)) obj.anyOf = obj.anyOf.map(normalizeSchema);
      if (Array.isArray(obj.oneOf)) obj.oneOf = obj.oneOf.map(normalizeSchema);
      if (Array.isArray(obj.allOf)) obj.allOf = obj.allOf.map(normalizeSchema);
      if (obj.not && typeof obj.not === "object")
        obj.not = normalizeSchema(obj.not);
    };

    const looksLikeObjectSchema =
      s.type === "object" ||
      !!s.properties ||
      !!s.required ||
      s.additionalProperties !== undefined;

    const looksLikeArraySchema =
      s.type === "array" ||
      s.items !== undefined ||
      s.prefixItems !== undefined;

    if (looksLikeObjectSchema) {
      if (!s.type) s.type = "object";
      if (s.additionalProperties === undefined) s.additionalProperties = false;

      if (
        s.properties &&
        typeof s.properties === "object" &&
        !Array.isArray(s.properties)
      ) {
        const props = {};
        for (const [k, v] of Object.entries(s.properties))
          props[k] = normalizeSchema(v);
        s.properties = props;
      }

      if (
        s.patternProperties &&
        typeof s.patternProperties === "object" &&
        !Array.isArray(s.patternProperties)
      ) {
        const pprops = {};
        for (const [k, v] of Object.entries(s.patternProperties))
          pprops[k] = normalizeSchema(v);
        s.patternProperties = pprops;
      }

      if (
        s.additionalProperties &&
        typeof s.additionalProperties === "object"
      ) {
        s.additionalProperties = normalizeSchema(s.additionalProperties);
      }

      normalizeCombinators(s);
      return s;
    }

    if (looksLikeArraySchema) {
      if (!s.type) s.type = "array";
      if (s.items !== undefined) s.items = normalizeSchema(s.items);
      if (Array.isArray(s.prefixItems))
        s.prefixItems = s.prefixItems.map(normalizeSchema);
      normalizeCombinators(s);
      return s;
    }

    normalizeCombinators(s);
    return s;
  };

  const normalizeTool = (tool) => ({
    ...tool,
    parameters: normalizeSchema(tool.parameters)
  });
  const toolEnabledForAnthropic = (t) =>
    !(t?.excludeFromAnthropic === true || t?.anthropic?.enabled === false);

  const safeStringify = (v, max = 200_000) => {
    let s = "";
    try {
      s = JSON.stringify(v);
    } catch {
      try {
        s = String(v);
      } catch {
        s = "";
      }
    }
    if (s.length > max)
      s = s.slice(0, max) + `… (${s.length - max} chars more)`;
    return s;
  };

  const pushHistory = (rec) => {
    if (!toolRegistry_recording) return;
    const arr = Array.isArray($0.value)
      ? $0.value
      : [];
    arr.push(rec);
    const limit = Math.max(
      50,
      Math.min(5000, Math.trunc(toolRegistry_history_limit || 1000))
    );
    if (arr.length > limit) arr.splice(0, arr.length - limit);
    $0.value = arr;
  };

  const baseCtxInfo = (ctx = {}) => {
    const meta = (() => {
      try {
        return ctx?.getMetadata?.() ?? {};
      } catch {
        return {};
      }
    })();
    const metaStr = safeStringify(meta, 200_000);
    return {
      sessionId: ctx?.sessionId ?? null,
      messageId: ctx?.messageId ?? null,
      agent: ctx?.agent ?? null,
      callId: ctx?.callId ?? null,
      metadata: meta,
      metadataSize: metaStr.length
    };
  };

  return {
    register(tool) {
      tools.set(tool.id, normalizeTool(tool));
    },
    unregister(id) {
      return tools.delete(id);
    },
    get(id) {
      return tools.get(id);
    },
    has(id) {
      return tools.has(id);
    },
    ids() {
      return [...tools.keys()];
    },
    all() {
      return [...tools.values()];
    },
    toAnthropicFormat() {
      return this.all()
        .filter(toolEnabledForAnthropic)
        .map((t) => ({
          name: t.id,
          description: t.description,
          input_schema: t.parameters
        }));
    },
    async execute(id, args, ctx) {
      const tool = tools.get(id);
      const startTime = Date.now();

      const ctxInfo = baseCtxInfo(ctx);
      const argsStr = safeStringify(args, 200_000);

      if (!tool) {
        const out = {
          title: "Tool not found",
          output: "Unknown tool: " + id,
          metadata: { error: true }
        };
        pushHistory({
          time: startTime,
          durationMs: Date.now() - startTime,
          toolId: id,
          ok: false,
          phase: "lookup",
          args,
          argsRaw: argsStr,
          argsSize: argsStr.length,
          output: out.output,
          outputSize: String(out.output ?? "").length,
          title: out.title,
          errorMessage: out.output,
          resultMetadata: out.metadata,
          ctx: ctxInfo
        });
        return out;
      }

      const validation = validateParameters(tool.parameters, args);
      if (!validation.valid) {
        const out = {
          title: "Invalid parameters",
          output:
            `Parameter validation failed (${id}):\n` +
            validation.errors.join("\n"),
          metadata: { error: true, validationErrors: validation.errors }
        };
        pushHistory({
          time: startTime,
          durationMs: Date.now() - startTime,
          toolId: id,
          ok: false,
          phase: "validation",
          args,
          argsRaw: argsStr,
          argsSize: argsStr.length,
          output: out.output,
          outputSize: String(out.output ?? "").length,
          title: out.title,
          errorMessage: out.output,
          resultMetadata: out.metadata,
          ctx: ctxInfo
        });
        return out;
      }

      let result;
      try {
        result = await tool.execute(args, ctx);
      } catch (e) {
        const msg = String(e?.message ?? e);
        const out = {
          title: `${id} failed`,
          output: "Error: " + msg,
          metadata: { error: true, errorMessage: msg }
        };
        pushHistory({
          time: startTime,
          durationMs: Date.now() - startTime,
          toolId: id,
          ok: false,
          phase: "execute_throw",
          args,
          argsRaw: argsStr,
          argsSize: argsStr.length,
          output: out.output,
          outputSize: String(out.output ?? "").length,
          title: out.title,
          errorMessage: msg,
          resultMetadata: out.metadata,
          ctx: ctxInfo
        });
        return out;
      }

      const endTime = Date.now();
      const outStr = String(result?.output ?? "");
      const isError = !!result?.metadata?.error;

      pushHistory({
        time: startTime,
        durationMs: endTime - startTime,
        toolId: id,
        ok: !isError,
        phase: "execute",
        args,
        argsRaw: argsStr,
        argsSize: argsStr.length,
        output: outStr,
        outputSize: outStr.length,
        title: String(result?.title ?? ""),
        errorMessage: isError
          ? String(result?.metadata?.errorMessage ?? result?.output ?? "")
          : null,
        resultMetadata: result?.metadata ?? null,
        ctx: ctxInfo
      });

      return result;
    }
  };
}
)}

function _124(md){return(
md`## Tool history`
)}

function _toolRegistry_history(){return(
[]
)}

function _toolRegistry_recording(Inputs){return(
Inputs.toggle({
  label: "Record tool calls (global)",
  value: true
})
)}

function _toolRegistry_history_limit(Inputs){return(
Inputs.range([50, 5000], {
  label: "History limit",
  step: 50,
  value: 1000
})
)}

function _toolRegistry_tool_ids(toolRegistry_sync,toolRegistry){return(
toolRegistry_sync,
toolRegistry
  .ids()
  .map(String)
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b))
)}

function _toolRegistry_inspector_controls(Inputs,toolRegistry_tool_ids){return(
Inputs.form({
  tool: Inputs.select(["(all)", ...toolRegistry_tool_ids], {
    label: "Tool",
    value: "(all)"
  }),
  onlyErrors: Inputs.toggle({ label: "Only errors", value: false }),
  query: Inputs.text({
    label: "Search (args/output/metadata)",
    width: "100%",
    value: ""
  }),
  maxRows: Inputs.number({
    label: "Max rows",
    min: 10,
    max: 1000,
    step: 10,
    value: 200
  })
})
)}

function _toolRegistry_clear_history(Inputs){return(
Inputs.button("Clear tool call history", {
  value: 0,
  reduce: (v) => v + 1
})
)}

function _toolRegistry_clear_history_effect(toolRegistry_clear_history,$0){return(
toolRegistry_clear_history &&
  (($0.value = []), toolRegistry_clear_history)
)}

function _toolRegistry_history_filtered(toolRegistry_inspector_controls,toolRegistry_history){return(
(() => {
  const controls = toolRegistry_inspector_controls ?? {};
  const tool = String(controls.tool ?? "(all)");
  const onlyErrors = !!controls.onlyErrors;
  const q = String(controls.query ?? "")
    .trim()
    .toLowerCase();
  const maxRows = Math.max(
    10,
    Math.min(1000, Math.trunc(controls.maxRows ?? 200))
  );

  const rows = Array.isArray(toolRegistry_history) ? toolRegistry_history : [];
  const filtered = [];
  for (let i = rows.length - 1; i >= 0; i--) {
    const r = rows[i];
    if (!r || typeof r !== "object") continue;
    if (tool !== "(all)" && String(r.toolId ?? "") !== tool) continue;
    if (onlyErrors && r.ok !== false) continue;

    if (q) {
      const hay = [
        r.toolId,
        r.title,
        r.phase,
        r.errorMessage,
        r.argsRaw,
        typeof r.output === "string"
          ? r.output.slice(0, 10000)
          : String(r.output ?? ""),
        (() => {
          try {
            return JSON.stringify(r.resultMetadata ?? {});
          } catch {
            return "";
          }
        })()
      ]
        .join("\n")
        .toLowerCase();
      if (!hay.includes(q)) continue;
    }

    filtered.push(r);
    if (filtered.length >= maxRows) break;
  }

  return filtered;
})()
)}

function _toolRegistry_stats(toolRegistry_history){return(
(() => {
  const rows = Array.isArray(toolRegistry_history) ? toolRegistry_history : [];
  const byTool = new Map();

  let total = 0;
  let error = 0;
  let durSum = 0;
  let argsSum = 0;
  let outSum = 0;
  let ctxSum = 0;

  for (const r of rows) {
    if (!r || typeof r !== "object") continue;
    total++;
    const toolId = String(r.toolId ?? "");
    const ok = r.ok !== false;
    if (!ok) error++;
    durSum += Number(r.durationMs ?? 0);
    argsSum += Number(r.argsSize ?? 0);
    outSum += Number(r.outputSize ?? 0);
    ctxSum += Number(r.ctx?.metadataSize ?? 0);

    const entry = byTool.get(toolId) ?? {
      toolId,
      calls: 0,
      errors: 0,
      durationMsSum: 0,
      argsSizeSum: 0,
      outputSizeSum: 0,
      ctxSizeSum: 0
    };
    entry.calls++;
    if (!ok) entry.errors++;
    entry.durationMsSum += Number(r.durationMs ?? 0);
    entry.argsSizeSum += Number(r.argsSize ?? 0);
    entry.outputSizeSum += Number(r.outputSize ?? 0);
    entry.ctxSizeSum += Number(r.ctx?.metadataSize ?? 0);
    byTool.set(toolId, entry);
  }

  const tools = [...byTool.values()]
    .map((t) => ({
      ...t,
      errorRate: t.calls ? t.errors / t.calls : 0,
      avgDurationMs: t.calls ? t.durationMsSum / t.calls : 0,
      avgArgsBytes: t.calls ? t.argsSizeSum / t.calls : 0,
      avgOutputBytes: t.calls ? t.outputSizeSum / t.calls : 0,
      avgCtxBytes: t.calls ? t.ctxSizeSum / t.calls : 0
    }))
    .sort((a, b) => b.calls - a.calls || a.toolId.localeCompare(b.toolId));

  const overall = {
    total,
    tools: tools.length,
    errors: error,
    errorRate: total ? error / total : 0,
    avgDurationMs: total ? durSum / total : 0,
    avgArgsBytes: total ? argsSum / total : 0,
    avgOutputBytes: total ? outSum / total : 0,
    avgCtxBytes: total ? ctxSum / total : 0
  };

  const maxCalls = tools.reduce((m, t) => Math.max(m, t.calls), 0);

  return { overall, tools, maxCalls };
})()
)}

function _134(md){return(
md`## Tool Implementation`
)}

function _allTools(variableTools,runtimeTools){return(
[...variableTools, ...runtimeTools]
)}

function _136(md){return(
md`### variable tools`
)}

function _variableTools(listVariablesTool,upsertVariablesTool,deleteVariableTool){return(
[listVariablesTool, upsertVariablesTool, deleteVariableTool]
)}

function _listVariablesTool(defineTool,variablesXML){return(
defineTool({
  id: "list_variables",
  description:
    "List runtime variables as canonical <variable> XML for a module.",
  parameters: {
    type: "object",
    properties: {
      module: { type: "string", description: "Module name to list." }
    },
    required: ["module"],
    additionalProperties: false
  },
  execute: async (args, ctx) => {
    const runtime = ctx?.runtime;
    if (!runtime)
      return {
        title: "list_variables",
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };

    const requestedModule = String(args?.module ?? "");
    const modules = ctx?.moduleMap;

    const moduleNameOf = (mod, info) =>
      String((info?.name ?? mod?._name ?? "") || "").trim();

    const availableModules = (() => {
      try {
        if (!(modules instanceof Map)) return [];
        const names = [];
        for (const [mod, info] of modules.entries()) {
          const n = moduleNameOf(mod, info);
          if (n) names.push(n);
        }
        return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
      } catch {
        return [];
      }
    })();

    let targetModule = null;
    if (modules instanceof Map) {
      for (const [mod, info] of modules.entries()) {
        if (moduleNameOf(mod, info) === requestedModule) {
          targetModule = mod;
          break;
        }
      }
    }

    if (!targetModule) {
      const hint = `Module not found: "${requestedModule}". A module must be chosen.`;

      const sample = availableModules.slice(0, 25);
      return {
        title: "list_variables failed",
        output:
          `Error: ${hint}\n` +
          `Requested module: "${requestedModule}"\n` +
          (availableModules.length
            ? `Available modules (sample):\n` +
              sample.map((d) => `- ${d}`).join("\n")
            : `Available modules: (unavailable)`),
        metadata: {
          error: true,
          notFound: true,
          needsModuleSelection: true,
          requestedModule,
          availableModules
        }
      };
    }

    const vars = [];
    for (const v of runtime._variables) {
      if (v?._module !== targetModule) continue;
      vars.push(v);
    }

    const xml = await variablesXML(ctx, vars);
    return {
      title: `list_variables (${vars.length} variables)`,
      output: xml,
      metadata: {
        count: vars.length,
        module: requestedModule
      }
    };
  }
})
)}

function _test_listVariablesTool(globalRuntime,createToolContext,resolveRuntimeModules,listVariablesTool,summarizeJS){return(
(async () => {
  const runtime = globalRuntime;
  const debug = {
    when: new Date().toISOString(),
    tool: "list_variables",
    requested: { module: "main" },
    runtime: {
      exists: !!runtime,
      variablesType: runtime
        ? Object.prototype.toString.call(runtime._variables)
        : null,
      variablesIsIterable: runtime
        ? !!(
            runtime._variables &&
            typeof runtime._variables[Symbol.iterator] === "function"
          )
        : null,
      variablesLength:
        runtime && Array.isArray(runtime._variables)
          ? runtime._variables.length
          : null
    }
  };

  let ctx;
  try {
    ctx = await createToolContext({
      sessionId: "test",
      messageId: "test",
      agent: "assistant",
      callId: "test_listVariablesTool_lopecode_debug",
      runtime
    });
  } catch (e) {
    debug.phase = "createToolContext";
    debug.error = { message: String(e?.message ?? e), name: e?.name ?? null };
    throw new Error(
      "listVariablesTool debug (createToolContext failed)\n" +
        JSON.stringify(debug, null, 2)
    );
  }

  let modules;
  try {
    modules = await resolveRuntimeModules(runtime);
    const moduleNamesSample = [];
    if (modules instanceof Map) {
      for (const [mod, info] of modules.entries()) {
        const name =
          String((info?.name ?? mod?._name ?? "main") || "main").trim() ||
          "main";
        moduleNamesSample.push(name);
        if (moduleNamesSample.length >= 50) break;
      }
    }
    debug.modules = {
      resolvedType: Object.prototype.toString.call(modules),
      isMap: modules instanceof Map,
      size: typeof modules?.size === "number" ? modules.size : null,
      namesSample: moduleNamesSample
    };
  } catch (e) {
    debug.phase = "resolveRuntimeModules";
    debug.error = { message: String(e?.message ?? e), name: e?.name ?? null };
    throw new Error(
      "listVariablesTool debug (resolveRuntimeModules failed)\n" +
        JSON.stringify(debug, null, 2)
    );
  }

  try {
    const hasMain =
      modules instanceof Map &&
      (() => {
        for (const [mod, info] of modules.entries()) {
          const n = String((info?.name ?? mod?._name ?? "") || "").trim();
          if (n === "main") return true;
        }
        return false;
      })();

    debug.detected = { hasMain };

    const r = await listVariablesTool.execute({ module: "main" }, ctx);

    debug.result = {
      title: String(r?.title ?? ""),
      hasMetadataError: !!r?.metadata?.error,
      metadata: r?.metadata ?? null,
      outputPreview: summarizeJS(String(r?.output ?? ""), { max_size: 2000 })
    };

    if (hasMain) {
      if (r?.metadata?.error) throw new Error("tool returned metadata.error");
      if (!String(r?.output ?? "").includes("<variable"))
        throw new Error('unexpected output: missing "<variable"');
      return "pass";
    } else {
      if (!r?.metadata?.error)
        throw new Error("expected tool to error when main module is missing");
      const out = String(r?.output ?? "").toLowerCase();
      if (
        !(
          out.includes("module must be chosen") ||
          out.includes("needs") ||
          out.includes("choose")
        )
      )
        throw new Error(
          "expected error output to signal module selection requirement"
        );
      return "pass";
    }
  } catch (e) {
    debug.phase = debug.phase || "execute";
    debug.error = { message: String(e?.message ?? e), name: e?.name ?? null };
    debug.stack = String(e?.stack ?? "");
    throw new Error(
      "listVariablesTool debug\n" + JSON.stringify(debug, null, 2)
    );
  }
})()
)}

function _upsertVariablesTool(defineTool,parseVariablesXML,resolveRuntimeModules){return(
defineTool({
  id: "upsert_variables",
  description:
    "Bulk upsert runtime variables from canonical <variable> XML. Updates by id when possible; can create when allow_create=true.",
  parameters: {
    type: "object",
    properties: {
      xml: {
        type: "string",
        description: "XML string containing one or more <variable> elements"
      }
    },
    required: ["xml"],
    additionalProperties: false
  },
  execute: async (args, ctx) => {
    const runtime = ctx.runtime;
    if (!runtime)
      return {
        title: "upsert_variables",
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };

    const xml = String(args?.xml ?? "");
    let specs;
    try {
      specs = parseVariablesXML(xml);
    } catch (e) {
      return {
        title: "upsert_variables failed",
        output: "Error: Invalid XML: " + (e?.message ?? String(e)),
        metadata: { error: true }
      };
    }

    const modules = await resolveRuntimeModules(runtime);
    const moduleByName = new Map();
    for (const [mod, info] of modules.entries()) {
      const modName = (info?.name ?? mod?._name ?? "main").trim() || "main";
      if (!moduleByName.has(modName)) moduleByName.set(modName, mod);
    }

    const resolveModuleByName = (requested) => {
      const r = String(requested ?? "").trim();
      if (!r)
        return (
          moduleByName.get("main") ?? [...moduleByName.values()][0] ?? null
        );
      if (moduleByName.has(r)) return moduleByName.get(r);
      for (const [n, m] of moduleByName.entries())
        if (n.includes(r) || r.includes(n)) return m;
      return null;
    };

    const findVarById = (id) => {
      const want = String(id ?? "");
      if (!want) return null;
      for (const v of runtime._variables) {
        if (!v) continue;
        if (v.id !== undefined && String(v.id) === want) return v;
      }
      return null;
    };

    const parseFunction = (src) => {
      let fn;
      eval("fn = " + String(src ?? ""));
      if (typeof fn !== "function")
        throw new Error("definition did not evaluate to a function");
      return fn;
    };

    const normalizeInputName = (name) => {
      const s = String(name ?? "").trim();
      if (!s) return "";
      const i = s.lastIndexOf("#");
      return i >= 0 ? s.slice(i + 1).trim() : s;
    };

    const results = [];
    for (const s of Array.isArray(specs) ? specs : []) {
      const modName = s.module;
      const targetModule = resolveModuleByName(modName);
      if (!targetModule) {
        results.push({
          id: s.id ?? "",
          name: s.name ?? null,
          module: modName,
          status: "error",
          error: "Module not found: " + modName
        });
        continue;
      }

      const idStr = String(s.id ?? "");
      const name = s.name === null ? null : String(s.name ?? "");
      const inputs = (Array.isArray(s.inputs) ? s.inputs : [])
        .map(normalizeInputName)
        .filter((d) => String(d).trim());

      const defSrc = String(s.definition ?? "");
      let fn;
      try {
        fn = parseFunction(defSrc);
      } catch (e) {
        results.push({
          id: idStr,
          name,
          module: modName,
          status: "error",
          error: "Bad definition: " + (e?.message ?? String(e))
        });
        continue;
      }

      let v = findVarById(idStr);
      if (!v) v = targetModule.variable({});
      try {
        v.define(name, inputs, fn);
        results.push({
          id: idStr,
          name,
          module: modName,
          status: "ok",
          hasError: v._error !== undefined,
          error: v._error?.message ?? null
        });
      } catch (e) {
        results.push({
          id: idStr,
          name,
          module: modName,
          status: "error",
          error: e?.message ?? String(e)
        });
      }
    }

    runtime._computeNow();
    await new Promise((r) => setTimeout(r, 0));

    const lines = results.map((r) => {
      const nm = r.name === null ? "(anonymous)" : r.name || "(unnamed)";
      const idp = r.id ? `id=${r.id}` : "id=?";
      const st = r.status || "unknown";
      const err =
        r.status === "error"
          ? ` :: ${r.error || "error"}`
          : r.hasError
          ? ` :: ${r.error || "error"}`
          : "";
      return `${r.module || "main"}#${nm} ${idp} [${st}]${err}`;
    });

    return {
      title: `upsert_variables (${results.length} processed)`,
      output: lines.join("\n"),
      metadata: {
        count: results.length,
        results
      }
    };
  }
})
)}

function _141(test_upsert_module_prefixed_inputs_var){return(
test_upsert_module_prefixed_inputs_var
)}

function _142(md){return(
md`## scrap`
)}

function _m(thisModule){return(
thisModule()
)}

function _v(m){return(
m.variable()
)}

function _acornModule(currentModules){return(
[...currentModules.values()].find((m) => m.name.includes("acorn"))
)}

function _foreignInput(acornModule){return(
acornModule.module._scope.get("acorn")
)}

function _test_upsertVariablesTool_imports(test_tools_createModuleTool_registers_in_list_modules,globalRuntime,createToolContext,upsertVariablesTool){return(
(async () => {
  test_tools_createModuleTool_registers_in_list_modules;
  const runtime = globalRuntime;
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_upsertVariablesTool_imports",
    runtime
  });

  const moduleByName = (name) => {
    const mods = ctx.moduleMap;
    if (!(mods instanceof Map)) return null;
    for (const [mod, info] of mods.entries()) {
      const n = String(info?.name ?? mod?._name ?? "").trim();
      if (n === name) return mod;
    }
    return null;
  };

  const mainModule = moduleByName("@robocoop/test-module");
  if (!mainModule) throw new Error("main module not found");

  const varName = "toObject";
  const existing = mainModule._scope?.get?.(varName) ?? null;

  const xml = `<variable module="@robocoop/test-module" name="toObject" id="${existing?.id}">
  <inputs>@tomlarkworthy/runtime-sdk#toObject</inputs>
  <definition><![CDATA[(x) => x]]></definition>
</variable>`;

  const result = await upsertVariablesTool.execute({ xml }, ctx);

  return result;
})()
)}

function _deleteVariableTool(defineTool){return(
defineTool({
  id: "delete_variable",
  description:
    'Delete a runtime variable from the notebook runtime. Supports deleting named variables by name, and anonymous variables by id (pass the numeric id, as shown in list_variables/search_variables, in the "name" field).',
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description:
          "Variable name OR numeric variable id (from list_variables/search_variables). To delete an anonymous variable, pass its id here."
      }
    },
    required: ["name"]
  },
  execute: async (args, ctx) => {
    const runtime = ctx?.runtime;
    const needleRaw = String(args?.name ?? "");
    const needle = needleRaw.trim();

    if (!runtime) {
      return {
        title: "Delete variable: " + needle,
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };
    }

    if (!needle) {
      return {
        title: "Delete variable",
        output: 'Error: "name" is required (variable name or numeric id)',
        metadata: { error: true }
      };
    }

    const looksLikeId = /^\d+$/.test(needle);
    const matches = (v) => {
      if (!v || typeof v !== "object") return false;
      if (looksLikeId) return v.id !== undefined && String(v.id) === needle;
      return v._name === needle;
    };

    for (const v of runtime._variables) {
      if (matches(v)) {
        const deleted = {
          id: v.id !== undefined ? String(v.id) : null,
          name: typeof v._name === "string" ? v._name : null,
          lookedUpBy: looksLikeId ? "id" : "name"
        };
        v.delete();
        return {
          title: "Delete variable: " + needle,
          output:
            `Deleted variable (${deleted.lookedUpBy}="${needle}")` +
            (deleted.name ? ` name="${deleted.name}"` : " (anonymous)") +
            (deleted.id ? ` id=${deleted.id}` : ""),
          metadata: deleted
        };
      }
    }

    return {
      title: "Delete variable: " + needle,
      output: looksLikeId
        ? `Error: Variable not found by id: ${needle}`
        : `Error: Variable not found by name: ${needle}`,
      metadata: { error: true, lookedUpBy: looksLikeId ? "id" : "name" }
    };
  }
})
)}

function _test_deleteVariableTool_deletes_anonymous_by_id(test_tools_createModuleTool_registers_in_list_modules,createToolContext,globalRuntime,id,deleteVariableTool){return(
(async () => {
  test_tools_createModuleTool_registers_in_list_modules;
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_deleteVariableTool_deletes_anonymous_by_id",
    runtime: globalRuntime
  });

  const mainModule = (() => {
    const mods = ctx.moduleMap;
    if (!(mods instanceof Map)) return null;
    for (const [mod, info] of mods.entries()) {
      const n = String(info?.name ?? mod?._name ?? "").trim();
      if (n === "@robocoop/test-module") return mod;
    }
    return null;
  })();

  if (!mainModule) throw new Error("main module not found");

  const v = mainModule.variable({});
  v.define(null, [], () => "temp");
  id(v);

  if (typeof v.id !== "number" && !/^\d+$/.test(String(v.id)))
    throw new Error("expected anonymous variable to have an id");

  const varId = String(v.id);

  const res = await deleteVariableTool.execute({ name: varId }, ctx);
  if (res?.metadata?.error)
    throw new Error("delete_variable failed: " + res.output);
  if (res?.metadata?.lookedUpBy !== "id")
    throw new Error(
      "expected lookedUpBy=id, got: " + JSON.stringify(res?.metadata)
    );

  const stillThere = (() => {
    const vars = globalRuntime._variables;
    if (vars && typeof vars.has === "function") return vars.has(v);
    for (const x of vars) if (x === v) return true;
    return false;
  })();

  if (stillThere)
    throw new Error("expected variable to be deleted from runtime");

  return "pass";
})()
)}

function _150(md){return(
md`#### runtime tools`
)}

function _runtimeTools(listModulesTool,createModuleTool,runTestsTool,evalTool,searchVariablesTool){return(
[
  listModulesTool,
  createModuleTool,
  runTestsTool,
  evalTool,
  searchVariablesTool
]
)}

function _listModulesTool(defineTool,resolveRuntimeModules){return(
defineTool({
  id: "list_modules",
  description: "List all modules loaded in the notebook runtime.",
  parameters: { type: "object", properties: {}, required: [] },
  execute: async (_args, ctx) => {
    const runtime = ctx.runtime;

    if (!runtime) {
      return {
        title: "List modules",
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };
    }

    const modules = await resolveRuntimeModules(runtime);

    const counts = new Map();
    for (const [mod, info] of modules.entries()) {
      const name = (info?.name ?? mod?._name ?? "main").trim() || "main";
      counts.set(mod, { name, variables: 0, title: info.title });
    }

    for (const v of runtime._variables) {
      if (!v?._module || !v?._name) continue;
      const entry = counts.get(v._module);
      if (entry) entry.variables++;
    }

    const moduleList = [...counts.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return {
      title: "List modules (" + moduleList.length + " found)",
      output: moduleList
        .map((m) => `${m.name} (${m.variables} variables) '${m.title}'`)
        .join("\n"),
      metadata: { count: moduleList.length, modules: moduleList }
    };
  }
})
)}

async function _test_listModulesTool_smoke(createToolContext,globalRuntime,listModulesTool)
{
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_tools_createModuleTool_registers_in_list_modules",
    runtime: globalRuntime
  });
  return (await listModulesTool.execute({}, ctx)).output;
}


function _createModuleTool(defineTool,resolveRuntimeModules){return(
defineTool({
  id: "create_module",
  description: "Create a new module in the notebook runtime with a given name.",
  parameters: {
    type: "object",
    properties: {
      name: { type: "string", description: 'Name of the module to create (e.g. "my-module").' },
      allow_existing: {
        type: "boolean",
        description: "If true, return ok when a module with this name already exists."
      }
    },
    required: ["name", "allow_existing"],
    additionalProperties: false
  },
  execute: async (args, ctx) => {
    const runtime = ctx.runtime;
    if (!runtime) {
      return {
        title: "create_module",
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };
    }

    const name = String(args?.name ?? "").trim();
    const allowExisting = !!args?.allow_existing;

    if (!name) {
      return {
        title: "create_module",
        output: "Error: name is required",
        metadata: { error: true }
      };
    }

    const ensureMains = () => {
      if (runtime.mains instanceof Map) return runtime.mains;
      const m = new Map();
      try {
        if (runtime.mains && typeof runtime.mains === "object") {
          for (const [k, v] of Object.entries(runtime.mains)) m.set(k, v);
        }
      } catch {}
      runtime.mains = m;
      return m;
    };

    const modules = await resolveRuntimeModules(runtime);
    const moduleNameOf = (mod, info) => String((info?.name ?? mod?._name ?? "main") || "main").trim() || "main";

    for (const [mod, info] of modules.entries()) {
      if (moduleNameOf(mod, info) === name) {
        if (!allowExisting) {
          return {
            title: `create_module (${name})`,
            output: `Error: Module already exists: ${name}`,
            metadata: { error: true, exists: true, name }
          };
        }
        try {
          ensureMains().set(name, mod);
        } catch {}
        return {
          title: `create_module (${name})`,
          output: `Module already exists: ${name}`,
          metadata: { name, exists: true }
        };
      }
    }

    let mod;
    try {
      mod = runtime.module(() => {}, null);
    } catch (e) {
      return {
        title: `create_module (${name})`,
        output: "Error: Failed to create module: " + String(e?.message ?? e),
        metadata: { error: true }
      };
    }

    try {
      mod._name = name;
    } catch {}

    try {
      ensureMains().set(name, mod);
    } catch {}

    try {
      modules.set(mod, { ...(modules.get(mod) ?? {}), name });
    } catch {}

    try {
      if (ctx.moduleMap && typeof ctx.moduleMap.set === "function") {
        ctx.moduleMap.set(mod, { ...(ctx.moduleMap.get(mod) ?? {}), name });
      }
    } catch {}

    return {
      title: `create_module (${name})`,
      output: `Created module: ${name}`,
      metadata: { name, exists: false }
    };
  }
})
)}

function _test_tools_createModuleTool_registers_in_list_modules(createToolContext,globalRuntime,createModuleTool,moduleMap,$0,Event,listModulesTool){return(
(async () => {
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_tools_createModuleTool_registers_in_list_modules",
    runtime: globalRuntime
  });

  const name = "@robocoop/test-module";

  const r = await createModuleTool.execute({ name, allow_existing: true }, ctx);
  if (r?.metadata?.error) throw new Error("create_module failed: " + r.output);

  const latest = await moduleMap(globalRuntime);
  $0.value = latest;
  $0.dispatchEvent(new Event("input"));
  await new Promise((res) => setTimeout(res, 0));

  const lm = await listModulesTool.execute({}, ctx);
  if (lm?.metadata?.error) throw new Error("list_modules failed: " + lm.output);

  if (!String(lm.output ?? "").includes(`${name} (`)) {
    throw new Error(
      "expected module to appear in list_modules output; got:\n" + lm.output
    );
  }

  return "pass";
})()
)}

function _runTestsTool(defineTool){return(
defineTool({
  id: "run_tests",
  description:
    "Run all reachable test_* variables in the notebook and return results.",
  parameters: {
    type: "object",
    properties: {
      filter: {
        type: "string",
        description: 'Filter to match test names. Use "" to run all tests.'
      }
    },
    required: ["filter"],
    additionalProperties: false
  },
  execute: async (args, ctx) => {
    const filter = String(args?.filter ?? "");
    const runtime = ctx.runtime;
    if (!runtime) {
      return {
        title: "Run tests",
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };
    }
    const testVars = [];
    for (const v of runtime._variables) {
      if (!v?._reachable) continue;
      if (typeof v._name === "string" && v._name.startsWith("test_")) {
        if (filter && !v._name.includes(filter)) continue;
        testVars.push(v);
      }
    }
    if (testVars.length === 0) {
      return {
        title: "Run tests",
        output: filter
          ? `No reachable tests found matching "${filter}"`
          : "No reachable test_* variables found",
        metadata: { count: 0 }
      };
    }
    const results = testVars.map((v) => ({
      name: v._name,
      reachable: !!v._reachable,
      hasValue: v._value !== undefined,
      hasError: v._error !== undefined,
      value: v._value !== undefined ? String(v._value).slice(0, 100) : null,
      error: v._error?.message
    }));
    const passed = results.filter((r) => r.hasValue && !r.hasError).length;
    const failed = results.filter((r) => r.hasError).length;
    const pending = results.length - passed - failed;
    const symbol = (r) =>
      r.hasError ? "\u2717 " : r.hasValue ? "\u2713 " : "\u2026 ";
    return {
      title: `Run tests (${passed}/${results.length} passed${
        pending ? `, ${pending} pending` : ""
      })`,
      output: results
        .map((r) => symbol(r) + r.name + (r.error ? ": " + r.error : ""))
        .join("\n"),
      metadata: { total: results.length, passed, failed, pending, results }
    };
  }
})
)}

function _evalTool(defineTool,globalRuntime,resolveRuntimeModules,getPromiseState,summarizeJS,TOOL_SUMMARY_MAX_SIZE){return(
defineTool({
  id: "eval",
  description:
    "Evaluate a JavaScript expression, optionally scoped to a runtime variable by {module, variable_id_or_name}. If the expression evaluates to a function, it will be applied to the variable value; otherwise the expression result is returned. In all cases, the final result is summarized with summarizeJS. Can be used for exploring state, DOM context, and simulating interactions",
  parameters: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description:
          "JavaScript expression to evaluate (may evaluate to a function)."
      },
      module: {
        type: "string",
        description:
          'Module name to scope variable lookup to (e.g. "main"). Use "" to auto-resolve by name (prefers main when ambiguous).'
      },
      variable_id_or_name: {
        type: "string",
        description:
          'Runtime variable identifier. If it looks like an integer, treated as an internal variable id; otherwise treated as a variable name. Use "" for no target variable.'
      }
    },
    required: ["code", "module", "variable_id_or_name"],
    additionalProperties: false
  },
  execute: async (args, ctx) => {
    const runtime = ctx?.runtime ?? globalRuntime;
    if (!runtime) {
      return {
        title: "Eval",
        output: "Error: Observable runtime not found",
        metadata: { error: true }
      };
    }

    const TIMEOUT_MS = 30_000;

    const withTimeout = async (
      promiseLike,
      { label = "operation", signal } = {}
    ) => {
      const p = Promise.resolve(promiseLike);

      let timer = null;
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => {
          reject(
            new Error(
              `Eval ${label} timed out after ${Math.round(TIMEOUT_MS / 1000)}s`
            )
          );
        }, TIMEOUT_MS);
      });

      const aborted = signal
        ? new Promise((_, reject) => {
            if (signal.aborted) reject(new Error(`Eval ${label} aborted`));
            else
              signal.addEventListener(
                "abort",
                () => reject(new Error(`Eval ${label} aborted`)),
                { once: true }
              );
          })
        : null;

      try {
        return await Promise.race(
          aborted ? [p, timeout, aborted] : [p, timeout]
        );
      } finally {
        if (timer !== null) clearTimeout(timer);
      }
    };

    const code = String(args?.code ?? "");
    const moduleRequestedRaw = String(args?.module ?? "");
    const idOrNameRaw = String(args?.variable_id_or_name ?? "");

    const modules = await resolveRuntimeModules(runtime);
    const moduleNameOf = (mod) =>
      (modules.get(mod)?.name ?? mod?._name ?? "main").trim() || "main";

    const moduleByName = new Map();
    for (const [mod, info] of modules.entries()) {
      const modName = (info?.name ?? mod?._name ?? "main").trim() || "main";
      if (!moduleByName.has(modName)) moduleByName.set(modName, mod);
    }

    const resolveModuleByName = (requested) => {
      const r = String(requested ?? "").trim();
      if (!r) return null;
      if (moduleByName.has(r)) return moduleByName.get(r);
      for (const [n, m] of moduleByName.entries())
        if (n.includes(r) || r.includes(n)) return m;
      return null;
    };

    const findVarById = (idStr) => {
      const want = String(idStr ?? "").trim();
      if (!want) return null;
      for (const v of runtime._variables) {
        if (!v) continue;
        if (v.id !== undefined && String(v.id) === want) return v;
      }
      return null;
    };

    const findVarByNameInModule = (name, targetModule) => {
      if (!targetModule) return null;
      try {
        if (targetModule._scope?.has(name)) {
          const candidate = targetModule._scope.get(name);
          if (candidate && runtime._variables?.has(candidate)) return candidate;
        }
      } catch {}
      for (const v of runtime._variables)
        if (v?._name === name && v?._module === targetModule) return v;
      return null;
    };

    const autoResolveVarByName = (name) => {
      const matches = [];
      for (const v of runtime._variables)
        if (v?._name === name) matches.push(v);
      const reachable = matches.filter((v) => v?._reachable);
      const candidates = reachable.length ? reachable : matches;

      const mainModule = moduleByName.get("main") ?? null;
      const mainVar = mainModule
        ? findVarByNameInModule(name, mainModule)
        : null;
      if (mainVar) return { v: mainVar, resolvedModuleName: "main" };

      if (candidates.length === 1)
        return {
          v: candidates[0],
          resolvedModuleName: moduleNameOf(candidates[0]._module)
        };
      if (candidates.length === 0) return { v: null, resolvedModuleName: null };

      const mods = Array.from(
        new Set(candidates.map((v) => moduleNameOf(v._module)))
      ).sort();
      return {
        v: null,
        resolvedModuleName: null,
        ambiguous: true,
        modules: mods
      };
    };

    const readVarValue = async (v) => {
      if (!v) return { state: "fulfilled", value: undefined };
      if (v._error !== undefined) return { state: "rejected", error: v._error };
      if (v._value !== undefined)
        return { state: "fulfilled", value: v._value };

      let snap;
      try {
        snap = await withTimeout(getPromiseState(v._promise), {
          label: "getPromiseState",
          signal: ctx?.abort
        });
      } catch (e) {
        return { state: "rejected", error: e };
      }

      if (snap?.state === "fulfilled" && "fulfilled" in snap)
        return { state: "fulfilled", value: snap.fulfilled };
      if (snap?.state === "rejected")
        return { state: "rejected", error: snap.rejected };
      return { state: "pending" };
    };

    let targetVar = null;
    let resolvedModuleName = null;

    const idOrName = idOrNameRaw.trim();
    if (idOrName) {
      const looksLikeId = /^\d+$/.test(idOrName);
      if (looksLikeId) {
        targetVar = findVarById(idOrName);
        if (!targetVar) {
          return {
            title: "Eval",
            output: `Error: Variable id not found: ${idOrName}`,
            metadata: {
              error: true,
              notFound: true,
              kind: "id",
              variable_id_or_name: idOrName
            }
          };
        }
        resolvedModuleName = moduleNameOf(targetVar._module);
        const moduleRequested = moduleRequestedRaw.trim();
        if (moduleRequested) {
          const targetModule = resolveModuleByName(moduleRequested);
          if (!targetModule) {
            return {
              title: "Eval",
              output: `Error: Module not found: ${moduleRequested}`,
              metadata: { error: true, notFound: true, module: moduleRequested }
            };
          }
          if (targetVar._module !== targetModule) {
            return {
              title: "Eval",
              output: `Error: Variable id ${idOrName} exists in module "${resolvedModuleName}", not in requested module "${moduleNameOf(
                targetModule
              )}".`,
              metadata: {
                error: true,
                moduleMismatch: true,
                resolvedModule: resolvedModuleName,
                requestedModule: moduleNameOf(targetModule),
                variable_id_or_name: idOrName
              }
            };
          }
        }
      } else {
        const moduleRequested = moduleRequestedRaw.trim();
        if (moduleRequested) {
          const targetModule = resolveModuleByName(moduleRequested);
          if (!targetModule) {
            return {
              title: "Eval",
              output: `Error: Module not found: ${moduleRequested}`,
              metadata: { error: true, notFound: true, module: moduleRequested }
            };
          }
          resolvedModuleName = moduleNameOf(targetModule);
          targetVar = findVarByNameInModule(idOrName, targetModule);
          if (!targetVar) {
            return {
              title: "Eval",
              output: `Error: Variable not found in module ${resolvedModuleName}: ${idOrName}`,
              metadata: {
                error: true,
                notFound: true,
                module: resolvedModuleName,
                name: idOrName
              }
            };
          }
        } else {
          const auto = autoResolveVarByName(idOrName);
          if (auto?.ambiguous) {
            return {
              title: "Eval",
              output:
                `Error: Ambiguous variable name "${idOrName}" exists in multiple modules.\n` +
                `Provide {module}. Candidates:\n` +
                (auto.modules ?? []).map((m) => `- ${m}`).join("\n"),
              metadata: {
                error: true,
                ambiguous: true,
                name: idOrName,
                modules: auto.modules ?? []
              }
            };
          }
          targetVar = auto.v;
          resolvedModuleName = auto.resolvedModuleName;
          if (!targetVar) {
            return {
              title: "Eval",
              output: `Error: Variable not found: ${idOrName}`,
              metadata: { error: true, notFound: true, name: idOrName }
            };
          }
        }
      }
    }

    const valueState = await readVarValue(targetVar);
    if (valueState.state === "pending") {
      return {
        title: "Eval",
        output: "pending",
        metadata: {
          pending: true,
          state: "pending",
          module: resolvedModuleName,
          variable_id_or_name: idOrName || null
        }
      };
    }
    if (valueState.state === "rejected") {
      const msg = String(
        valueState.error?.message ?? valueState.error ?? "Unknown error"
      );
      return {
        title: "Eval",
        output: "Error: " + msg,
        metadata: {
          error: true,
          state: "rejected",
          errorMessage: msg,
          module: resolvedModuleName,
          variable_id_or_name: idOrName || null
        }
      };
    }

    const targetValue = valueState.value;
    const moduleObj = targetVar?._module ?? null;

    const expr = code.trim();
    if (!expr) {
      return {
        title: "Eval",
        output: summarizeJS(targetValue, { max_size: TOOL_SUMMARY_MAX_SIZE }),
        metadata: {
          type: typeof targetValue,
          applied: false,
          module: resolvedModuleName,
          variable_id_or_name: idOrName || null
        }
      };
    }

    let evaluated;
    try {
      evaluated = new Function(
        "value",
        "variable",
        "module",
        "runtime",
        `return (${expr});`
      )(targetValue, targetVar, moduleObj, runtime);
    } catch (e) {
      return {
        title: "Eval",
        output: "Error: " + (e?.message ?? String(e)),
        metadata: {
          error: true,
          phase: "parse_eval",
          variable_id_or_name: idOrName || null,
          module: resolvedModuleName
        }
      };
    }

    let result = evaluated;
    let applied = false;

    if (typeof evaluated === "function") {
      applied = true;
      try {
        result = evaluated(targetValue, {
          variable: targetVar,
          module: moduleObj,
          moduleName: resolvedModuleName,
          runtime,
          ctx
        });
        if (result && typeof result.then === "function") {
          result = await withTimeout(result, {
            label: "function result",
            signal: ctx?.abort
          });
        }
      } catch (e) {
        return {
          title: "Eval",
          output: "Error: " + (e?.message ?? String(e)),
          metadata: {
            error: true,
            phase: "apply",
            variable_id_or_name: idOrName || null,
            module: resolvedModuleName
          }
        };
      }
    } else if (evaluated && typeof evaluated.then === "function") {
      try {
        result = await withTimeout(evaluated, {
          label: "promise result",
          signal: ctx?.abort
        });
      } catch (e) {
        return {
          title: "Eval",
          output: "Error: " + (e?.message ?? String(e)),
          metadata: {
            error: true,
            phase: "await",
            variable_id_or_name: idOrName || null,
            module: resolvedModuleName
          }
        };
      }
    }

    return {
      title: "Eval",
      output: summarizeJS(result, { max_size: TOOL_SUMMARY_MAX_SIZE }),
      metadata: {
        type: typeof result,
        applied,
        module: resolvedModuleName,
        variable_id_or_name: idOrName || null
      }
    };
  }
})
)}

function _test_tools_evalTool_expression_no_target(createToolContext,globalRuntime,evalTool){return(
(async () => {
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_tools_evalTool_expression_no_target",
    runtime: globalRuntime
  });
  const r = await evalTool.execute(
    { code: "1+2", module: "", variable_id_or_name: "" },
    ctx
  );
  if (r.metadata?.error) throw new Error("unexpected error: " + r.output);
  if (String(r.output).trim() !== "3")
    throw new Error("expected 3, got: " + r.output);
  return "pass";
})()
)}

function _robocoop3_random_value(){return(
"a"
)}

function _test_tools_evalTool_apply_function_to_variable_value(createToolContext,globalRuntime,test_search_variables_includes_module,evalTool){return(
(async () => {
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_tools_evalTool_apply_function_to_variable_value",
    runtime: globalRuntime
  });
  const match = test_search_variables_includes_module.metadata.matches.find(
    (m) => m.name == "robocoop3_random_value"
  );
  const r = await evalTool.execute(
    {
      code: "(v)=>v.toUpperCase()",
      module: match.module,
      variable_id_or_name: "robocoop3_random_value"
    },
    ctx
  );
  if (r.metadata?.error) throw new Error("unexpected error: " + r.output);
  if (!String(r.output).includes("A"))
    throw new Error("expected A in output, got: " + r.output);
  return "pass";
})()
)}

function _searchVariablesTool(defineTool,resolveRuntimeModules,variablesXML){return(
defineTool({
  id: "search_variables",
  description:
    "Search runtime variables (including anonymous variables) for text in name/definition/string-value, and return matches as canonical <variable> XML. Returns at most 100 matches.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "Text to search for" },
      limit: {
        type: "number",
        description:
          "Maximum number of results (clamped to 100; use 20 if unsure)"
      }
    },
    required: ["query", "limit"],
    additionalProperties: false
  },
  execute: async (args, ctx) => {
    const query = String(args?.query ?? "");
    const queryTrim = query.trim();
    const rawLimit = Number.isFinite(args?.limit) ? args.limit : 20;
    const limit = Math.max(1, Math.min(100, Math.trunc(rawLimit || 20)));

    const runtime = ctx.runtime;
    if (!runtime) {
      return {
        title: "Search variables: " + queryTrim,
        output: "",
        metadata: { error: true }
      };
    }

    if (!queryTrim) {
      return {
        title: "Search variables",
        output: "",
        metadata: { count: 0, matches: [] }
      };
    }

    const modules = await resolveRuntimeModules(runtime);
    const moduleNameFor = (v) =>
      (modules.get(v?._module)?.name ?? v?._module?._name ?? "main").trim() ||
      "main";

    const q = queryTrim.toLowerCase();
    const matches = [];
    const vars = [];

    for (const v of runtime._variables) {
      if (!v || typeof v !== "object") continue;

      let matchReason = null;

      if (typeof v._name === "string" && v._name.toLowerCase().includes(q)) {
        matchReason = "name";
      }

      if (
        !matchReason &&
        v._definition &&
        typeof v._definition === "function"
      ) {
        const defStr = v._definition.toString();
        if (defStr.toLowerCase().includes(q)) matchReason = "definition";
      }

      if (!matchReason && typeof v._value === "string") {
        if (v._value.toLowerCase().includes(q)) matchReason = "value";
      }

      if (!matchReason) continue;

      matches.push({
        module: moduleNameFor(v),
        name: typeof v._name === "string" ? v._name : null,
        matchReason,
        hasValue: v._value !== undefined,
        hasError: v._error !== undefined,
        reachable: !!v._reachable
      });

      vars.push(v);

      if (matches.length >= limit) break;
    }

    if (matches.length === 0) {
      return {
        title: `Search variables: ${queryTrim} (0 found)`,
        output: "",
        metadata: { count: 0, matches: [] }
      };
    }

    const xml = await variablesXML(ctx, vars);

    return {
      title: `Search variables: ${queryTrim} (${matches.length} found)`,
      output: xml,
      metadata: { count: matches.length, limit, matches }
    };
  }
})
)}

function _test_search_variables_includes_module(createToolContext,globalRuntime,searchVariablesTool){return(
(async () => {
  const ctx = await createToolContext({
    sessionId: "test",
    messageId: "test",
    agent: "assistant",
    callId: "test_search_variables_includes_module",
    runtime: globalRuntime
  });

  const r = await searchVariablesTool.execute(
    { query: "robocoop3_random_value", limit: 10 },
    ctx
  );
  const matches = r?.metadata?.matches ?? [];
  if (!Array.isArray(matches) || matches.length === 0)
    throw new Error("expected at least one match");

  const first = matches[0];
  if (typeof first.module !== "string" || !first.module.length)
    throw new Error("expected match to include module");
  if (typeof first.name !== "string" || !first.name.length)
    throw new Error("expected match to include name");

  return r;
})()
)}

function _163(md){return(
md`## Dependancies`
)}

function _175(robocoop2){return(
robocoop2()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof agent1")).define("viewof agent1", ["robocoop3"], _agent1);
  main.variable(observer("agent1")).define("agent1", ["Generators", "viewof agent1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["agent1"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("robocoop3")).define("robocoop3", ["keepalive","robocoopPrototypeModule","cloneDataflow","robocoop_template","Node","Event"], _robocoop3);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("system_prompt")).define("system_prompt", _system_prompt);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("test_cell_map_coverage")).define("test_cell_map_coverage", ["expect","coverage_failures"], _test_cell_map_coverage);
  main.variable(observer()).define(["md"], _13);
  const child1 = runtime.module(define1);
  main.import("cloneDataflow", child1);
  main.variable(observer("robocoop_template")).define("robocoop_template", ["lookupVariable","robocoopPrototypeModule"], _robocoop_template);
  main.variable(observer()).define(["currentModules"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof robocoopPrototype")).define("viewof robocoopPrototype", ["reversibleAttach","agent_ui_attached","viewof agent_prompt","viewof agent_clear","viewof agent_cancel","agent_conversation_view_holder","provider_choice","viewof provider_choice","viewof OPENAI_API_KEY","viewof provider_openai_config","viewof ANTHROPIC_API_KEY","viewof provider_anthropic_config","viewof provider_ollama_config","viewof agent_config","tabbedPane"], _robocoopPrototype);
  main.variable(observer("robocoopPrototype")).define("robocoopPrototype", ["Generators", "viewof robocoopPrototype"], (G, _) => G.input(_));
  main.variable(observer("viewof agent_ui_attached")).define("viewof agent_ui_attached", ["Inputs"], _agent_ui_attached);
  main.variable(observer("agent_ui_attached")).define("agent_ui_attached", ["Generators", "viewof agent_ui_attached"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof agent_prompt")).define("viewof agent_prompt", ["Inputs"], _agent_prompt);
  main.variable(observer("agent_prompt")).define("agent_prompt", ["Generators", "viewof agent_prompt"], (G, _) => G.input(_));
  main.variable(observer("agent_run_effect")).define("agent_run_effect", ["agent_prompt","agent_run"], _agent_run_effect);
  main.variable(observer("agent_cancel_effect")).define("agent_cancel_effect", ["agent_cancel","agent_loop"], _agent_cancel_effect);
  main.variable(observer("viewof agent_cancel")).define("viewof agent_cancel", ["Inputs"], _agent_cancel);
  main.variable(observer("agent_cancel")).define("agent_cancel", ["Generators", "viewof agent_cancel"], (G, _) => G.input(_));
  main.variable(observer("viewof agent_clear")).define("viewof agent_clear", ["Inputs"], _agent_clear);
  main.variable(observer("agent_clear")).define("agent_clear", ["Generators", "viewof agent_clear"], (G, _) => G.input(_));
  main.variable(observer("agent_clear_effect")).define("agent_clear_effect", ["agent_clear","agent_loop","mutable agent_records","mutable agent_run_history"], _agent_clear_effect);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("robocoopPrototype_record_stream")).define("robocoopPrototype_record_stream", ["agent_records"], _robocoopPrototype_record_stream);
  main.define("initial agent_records", _agent_records);
  main.variable(observer("mutable agent_records")).define("mutable agent_records", ["Mutable", "initial agent_records"], (M, _) => new M(_));
  main.variable(observer("agent_records")).define("agent_records", ["mutable agent_records"], _ => _.generator);
  main.variable(observer("appendAgentRecord")).define("appendAgentRecord", _appendAgentRecord);
  main.define("initial agent_run_history", _agent_run_history);
  main.variable(observer("mutable agent_run_history")).define("mutable agent_run_history", ["Mutable", "initial agent_run_history"], (M, _) => new M(_));
  main.variable(observer("agent_run_history")).define("agent_run_history", ["mutable agent_run_history"], _ => _.generator);
  main.variable(observer("agentConversationFromRecords")).define("agentConversationFromRecords", _agentConversationFromRecords);
  main.variable(observer("agent_conversation")).define("agent_conversation", ["agent_records","agentConversationFromRecords","agent_run_history","agent_reply","agent_stop"], _agent_conversation);
  main.variable(observer("css")).define("css", ["htl"], _css);
  main.variable(observer("agent_conversation_dom_sync")).define("agent_conversation_dom_sync", ["agent_conversation_view_holder","agent_conversation_view"], _agent_conversation_dom_sync);
  main.variable(observer("agent_conversation_view_holder")).define("agent_conversation_view_holder", ["html"], _agent_conversation_view_holder);
  main.variable(observer("agent_conversation_view")).define("agent_conversation_view", ["agent_conversation","htl","css"], _agent_conversation_view);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("open_ai_models")).define("open_ai_models", _open_ai_models);
  main.variable(observer("anthropic_models")).define("anthropic_models", _anthropic_models);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof provider_choice")).define("viewof provider_choice", ["Inputs","localStorageView"], _provider_choice);
  main.variable(observer("provider_choice")).define("provider_choice", ["Generators", "viewof provider_choice"], (G, _) => G.input(_));
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof ANTHROPIC_API_KEY")).define("viewof ANTHROPIC_API_KEY", ["Inputs","localStorageView"], _ANTHROPIC_API_KEY);
  main.variable(observer("ANTHROPIC_API_KEY")).define("ANTHROPIC_API_KEY", ["Generators", "viewof ANTHROPIC_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof provider_openai_config")).define("viewof provider_openai_config", ["Inputs","open_ai_models","localStorageView"], _provider_openai_config);
  main.variable(observer("provider_openai_config")).define("provider_openai_config", ["Generators", "viewof provider_openai_config"], (G, _) => G.input(_));
  main.variable(observer("openaiProvider")).define("openaiProvider", _openaiProvider);
  main.variable(observer("streamOpenAIChatCompletionsBlocks")).define("streamOpenAIChatCompletionsBlocks", ["parseSSEStream"], _streamOpenAIChatCompletionsBlocks);
  main.variable(observer("createOpenAIOpencodeLoop")).define("createOpenAIOpencodeLoop", ["openaiProvider","AbortController","globalRuntime","streamOpenAIResponseBlocks","createToolContext"], _createOpenAIOpencodeLoop);
  main.variable(observer("viewof provider_anthropic_config")).define("viewof provider_anthropic_config", ["Inputs","anthropic_models","localStorageView"], _provider_anthropic_config);
  main.variable(observer("provider_anthropic_config")).define("provider_anthropic_config", ["Generators", "viewof provider_anthropic_config"], (G, _) => G.input(_));
  main.variable(observer("anthropicProvider")).define("anthropicProvider", _anthropicProvider);
  main.variable(observer("createAnthropicOpencodeLoop")).define("createAnthropicOpencodeLoop", ["anthropicProvider","AbortController","globalRuntime","createToolContext","streamAnthropicBlocks"], _createAnthropicOpencodeLoop);
  main.variable(observer("viewof provider_ollama_config")).define("viewof provider_ollama_config", ["Inputs","localStorageView"], _provider_ollama_config);
  main.variable(observer("provider_ollama_config")).define("provider_ollama_config", ["Generators", "viewof provider_ollama_config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("ollamaProvider")).define("ollamaProvider", _ollamaProvider);
  main.variable(observer("createOllamaOpencodeLoop")).define("createOllamaOpencodeLoop", ["ollamaProvider","AbortController","globalRuntime","streamOpenAIChatCompletionsBlocks","createToolContext"], _createOllamaOpencodeLoop);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("viewof agent_config")).define("viewof agent_config", ["Inputs","system_prompt"], _agent_config);
  main.variable(observer("agent_config")).define("agent_config", ["Generators", "viewof agent_config"], (G, _) => G.input(_));
  main.variable(observer("agent_loop")).define("agent_loop", ["provider_choice","createOpenAIOpencodeLoop","agent_system_prompt","toolRegistry","provider_openai_config","agent_config","OPENAI_API_KEY","createAnthropicOpencodeLoop","ANTHROPIC_API_KEY","provider_anthropic_config","createOllamaOpencodeLoop","provider_ollama_config"], _agent_loop);
  main.variable(observer("normalizeUsage")).define("normalizeUsage", _normalizeUsage);
  main.variable(observer("test_normalizeUsage_openai_chat_completions_usage")).define("test_normalizeUsage_openai_chat_completions_usage", ["normalizeUsage"], _test_normalizeUsage_openai_chat_completions_usage);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer("agent_target_module")).define("agent_target_module", _agent_target_module);
  main.variable(observer("agent_system_prompt")).define("agent_system_prompt", ["agent_config","agent_target_module","provider_choice"], _agent_system_prompt);
  main.variable(observer("agent_run")).define("agent_run", ["generateId","mutable agent_records","provider_choice","mutable agent_run_history","appendAgentRecord","agent_loop","normalizeUsage"], _agent_run);
  main.variable(observer("test_appendAgentRecord_coalesces_text")).define("test_appendAgentRecord_coalesces_text", ["appendAgentRecord"], _test_appendAgentRecord_coalesces_text);
  main.variable(observer("test_appendAgentRecord_coalesces_tool_use_delta_by_id")).define("test_appendAgentRecord_coalesces_tool_use_delta_by_id", ["appendAgentRecord"], _test_appendAgentRecord_coalesces_tool_use_delta_by_id);
  main.variable(observer("agent_reply")).define("agent_reply", ["agent_run"], _agent_reply);
  main.variable(observer("agent_stop")).define("agent_stop", ["agent_loop"], _agent_stop);
  main.variable(observer("streamOpenAIResponseBlocks")).define("streamOpenAIResponseBlocks", ["parseSSEStream"], _streamOpenAIResponseBlocks);
  main.variable(observer("toolRegistry")).define("toolRegistry", ["createToolRegistry"], _toolRegistry);
  main.variable(observer("toolRegistry_sync")).define("toolRegistry_sync", ["toolRegistry","allTools"], _toolRegistry_sync);
  main.variable(observer("streamAnthropicBlocks")).define("streamAnthropicBlocks", ["parseSSEStream"], _streamAnthropicBlocks);
  main.variable(observer("generateId")).define("generateId", _generateId);
  main.variable(observer("createUserMessage")).define("createUserMessage", ["generateId"], _createUserMessage);
  main.variable(observer("createAssistantMessage")).define("createAssistantMessage", ["generateId"], _createAssistantMessage);
  main.variable(observer("test_opencode_generateId")).define("test_opencode_generateId", ["generateId"], _test_opencode_generateId);
  main.variable(observer("test_opencode_createUserMessage")).define("test_opencode_createUserMessage", ["createUserMessage"], _test_opencode_createUserMessage);
  main.variable(observer("test_opencode_createAssistantMessage")).define("test_opencode_createAssistantMessage", ["createAssistantMessage"], _test_opencode_createAssistantMessage);
  main.variable(observer("createTextPart")).define("createTextPart", ["generateId"], _createTextPart);
  main.variable(observer("createReasoningPart")).define("createReasoningPart", ["generateId"], _createReasoningPart);
  main.variable(observer("toolStatePending")).define("toolStatePending", _toolStatePending);
  main.variable(observer("toolStateRunning")).define("toolStateRunning", _toolStateRunning);
  main.variable(observer("toolStateCompleted")).define("toolStateCompleted", _toolStateCompleted);
  main.variable(observer("toolStateError")).define("toolStateError", _toolStateError);
  main.variable(observer("createToolPart")).define("createToolPart", ["generateId"], _createToolPart);
  main.variable(observer("parseSSEStream")).define("parseSSEStream", _parseSSEStream);
  main.variable(observer("streamAnthropic")).define("streamAnthropic", ["parseSSEStream"], _streamAnthropic);
  main.variable(observer("completeAssistantMessage")).define("completeAssistantMessage", _completeAssistantMessage);
  main.variable(observer("createStepStartPart")).define("createStepStartPart", ["generateId"], _createStepStartPart);
  main.variable(observer("createStepFinishPart")).define("createStepFinishPart", ["generateId"], _createStepFinishPart);
  main.variable(observer("createMessageWithParts")).define("createMessageWithParts", _createMessageWithParts);
  main.variable(observer("addPart")).define("addPart", _addPart);
  main.variable(observer("updatePart")).define("updatePart", _updatePart);
  main.variable(observer("createConversation")).define("createConversation", ["generateId"], _createConversation);
  main.variable(observer("addMessage")).define("addMessage", _addMessage);
  main.variable(observer("isToolPart")).define("isToolPart", _isToolPart);
  main.variable(observer("updateToolPart")).define("updateToolPart", ["isToolPart"], _updateToolPart);
  main.variable(observer("conversationToMessages")).define("conversationToMessages", _conversationToMessages);
  main.variable(observer("createLoop")).define("createLoop", ["anthropicProvider","createConversation","AbortController","createUserMessage","createMessageWithParts","createTextPart","addMessage","createAssistantMessage","createStepStartPart","streamAnthropic","conversationToMessages","addPart","updatePart","createToolPart","toolStatePending","updateToolPart","toolStateRunning","createToolContext","globalRuntime","toolStateError","toolStateCompleted","normalizeUsage","createStepFinishPart","completeAssistantMessage"], _createLoop);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer("resolveRuntimeModules")).define("resolveRuntimeModules", ["globalRuntime","viewof currentModules","moduleMap"], _resolveRuntimeModules);
  main.variable(observer("id")).define("id", _id);
  main.variable(observer("cdata")).define("cdata", _cdata);
  main.variable(observer("variablesXML")).define("variablesXML", ["getPromiseState","id","cdata","summarizeJS"], _variablesXML);
  main.variable(observer("parseVariablesXML")).define("parseVariablesXML", ["DOMParser"], _parseVariablesXML);
  main.variable(observer("viewof robocoopPrototypeModule")).define("viewof robocoopPrototypeModule", ["thisModule"], _robocoopPrototypeModule);
  main.variable(observer("robocoopPrototypeModule")).define("robocoopPrototypeModule", ["Generators", "viewof robocoopPrototypeModule"], (G, _) => G.input(_));
  main.variable(observer("idVariable")).define("idVariable", ["id","lookupVariable","robocoopPrototypeModule"], _idVariable);
  main.variable(observer("importVariable")).define("importVariable", ["lookupVariable","robocoopPrototypeModule"], _importVariable);
  main.variable(observer()).define(["currentModules","importVariable"], _111);
  main.variable(observer("test_variablesXML_smoke")).define("test_variablesXML_smoke", ["createToolContext","globalRuntime","variablesXML","idVariable"], _test_variablesXML_smoke);
  main.variable(observer("test_variablesXML_importVariable")).define("test_variablesXML_importVariable", ["createToolContext","globalRuntime","variablesXML","importVariable"], _test_variablesXML_importVariable);
  main.variable(observer("expected_error")).define("expected_error", _expected_error);
  main.variable(observer("test_variablesXML_erroredVariable")).define("test_variablesXML_erroredVariable", ["createToolContext","globalRuntime","lookupVariable","robocoopPrototypeModule","variablesXML"], _test_variablesXML_erroredVariable);
  main.variable(observer("test_parseVariablesXML_smoke")).define("test_parseVariablesXML_smoke", ["parseVariablesXML","test_variablesXML_smoke"], _test_parseVariablesXML_smoke);
  main.variable(observer()).define(["md"], _117);
  main.variable(observer("viewof toolRegistry_ui")).define("viewof toolRegistry_ui", ["toolRegistry_recording","toolRegistry_history_limit","toolRegistry_stats","htl","toolRegistry_history_filtered","viewof toolRegistry_recording","viewof toolRegistry_history_limit","viewof toolRegistry_clear_history","viewof toolRegistry_inspector_controls"], _toolRegistry_ui);
  main.variable(observer("toolRegistry_ui")).define("toolRegistry_ui", ["Generators", "viewof toolRegistry_ui"], (G, _) => G.input(_));
  main.variable(observer("TOOL_SUMMARY_MAX_SIZE")).define("TOOL_SUMMARY_MAX_SIZE", _TOOL_SUMMARY_MAX_SIZE);
  main.variable(observer("defineTool")).define("defineTool", _defineTool);
  main.variable(observer("createToolContext")).define("createToolContext", ["globalRuntime","generateId","AbortController","resolveRuntimeModules"], _createToolContext);
  main.variable(observer("validateParameters")).define("validateParameters", _validateParameters);
  main.variable(observer("createToolRegistry")).define("createToolRegistry", ["toolRegistry_recording","mutable toolRegistry_history","toolRegistry_history_limit","validateParameters"], _createToolRegistry);
  main.variable(observer()).define(["md"], _124);
  main.define("initial toolRegistry_history", _toolRegistry_history);
  main.variable(observer("mutable toolRegistry_history")).define("mutable toolRegistry_history", ["Mutable", "initial toolRegistry_history"], (M, _) => new M(_));
  main.variable(observer("toolRegistry_history")).define("toolRegistry_history", ["mutable toolRegistry_history"], _ => _.generator);
  main.variable(observer("viewof toolRegistry_recording")).define("viewof toolRegistry_recording", ["Inputs"], _toolRegistry_recording);
  main.variable(observer("toolRegistry_recording")).define("toolRegistry_recording", ["Generators", "viewof toolRegistry_recording"], (G, _) => G.input(_));
  main.variable(observer("viewof toolRegistry_history_limit")).define("viewof toolRegistry_history_limit", ["Inputs"], _toolRegistry_history_limit);
  main.variable(observer("toolRegistry_history_limit")).define("toolRegistry_history_limit", ["Generators", "viewof toolRegistry_history_limit"], (G, _) => G.input(_));
  main.variable(observer("toolRegistry_tool_ids")).define("toolRegistry_tool_ids", ["toolRegistry_sync","toolRegistry"], _toolRegistry_tool_ids);
  main.variable(observer("viewof toolRegistry_inspector_controls")).define("viewof toolRegistry_inspector_controls", ["Inputs","toolRegistry_tool_ids"], _toolRegistry_inspector_controls);
  main.variable(observer("toolRegistry_inspector_controls")).define("toolRegistry_inspector_controls", ["Generators", "viewof toolRegistry_inspector_controls"], (G, _) => G.input(_));
  main.variable(observer("viewof toolRegistry_clear_history")).define("viewof toolRegistry_clear_history", ["Inputs"], _toolRegistry_clear_history);
  main.variable(observer("toolRegistry_clear_history")).define("toolRegistry_clear_history", ["Generators", "viewof toolRegistry_clear_history"], (G, _) => G.input(_));
  main.variable(observer("toolRegistry_clear_history_effect")).define("toolRegistry_clear_history_effect", ["toolRegistry_clear_history","mutable toolRegistry_history"], _toolRegistry_clear_history_effect);
  main.variable(observer("toolRegistry_history_filtered")).define("toolRegistry_history_filtered", ["toolRegistry_inspector_controls","toolRegistry_history"], _toolRegistry_history_filtered);
  main.variable(observer("toolRegistry_stats")).define("toolRegistry_stats", ["toolRegistry_history"], _toolRegistry_stats);
  main.variable(observer()).define(["md"], _134);
  main.variable(observer("allTools")).define("allTools", ["variableTools","runtimeTools"], _allTools);
  main.variable(observer()).define(["md"], _136);
  main.variable(observer("variableTools")).define("variableTools", ["listVariablesTool","upsertVariablesTool","deleteVariableTool"], _variableTools);
  main.variable(observer("listVariablesTool")).define("listVariablesTool", ["defineTool","variablesXML"], _listVariablesTool);
  main.variable(observer("test_listVariablesTool")).define("test_listVariablesTool", ["globalRuntime","createToolContext","resolveRuntimeModules","listVariablesTool","summarizeJS"], _test_listVariablesTool);
  main.variable(observer("upsertVariablesTool")).define("upsertVariablesTool", ["defineTool","parseVariablesXML","resolveRuntimeModules"], _upsertVariablesTool);
  main.variable(observer()).define(["test_upsert_module_prefixed_inputs_var"], _141);
  main.variable(observer()).define(["md"], _142);
  main.variable(observer("viewof m")).define("viewof m", ["thisModule"], _m);
  main.variable(observer("m")).define("m", ["Generators", "viewof m"], (G, _) => G.input(_));
  main.variable(observer("v")).define("v", ["m"], _v);
  main.variable(observer("acornModule")).define("acornModule", ["currentModules"], _acornModule);
  main.variable(observer("foreignInput")).define("foreignInput", ["acornModule"], _foreignInput);
  main.variable(observer("test_upsertVariablesTool_imports")).define("test_upsertVariablesTool_imports", ["test_tools_createModuleTool_registers_in_list_modules","globalRuntime","createToolContext","upsertVariablesTool"], _test_upsertVariablesTool_imports);
  main.variable(observer("deleteVariableTool")).define("deleteVariableTool", ["defineTool"], _deleteVariableTool);
  main.variable(observer("test_deleteVariableTool_deletes_anonymous_by_id")).define("test_deleteVariableTool_deletes_anonymous_by_id", ["test_tools_createModuleTool_registers_in_list_modules","createToolContext","globalRuntime","id","deleteVariableTool"], _test_deleteVariableTool_deletes_anonymous_by_id);
  main.variable(observer()).define(["md"], _150);
  main.variable(observer("runtimeTools")).define("runtimeTools", ["listModulesTool","createModuleTool","runTestsTool","evalTool","searchVariablesTool"], _runtimeTools);
  main.variable(observer("listModulesTool")).define("listModulesTool", ["defineTool","resolveRuntimeModules"], _listModulesTool);
  main.variable(observer("test_listModulesTool_smoke")).define("test_listModulesTool_smoke", ["createToolContext","globalRuntime","listModulesTool"], _test_listModulesTool_smoke);
  main.variable(observer("createModuleTool")).define("createModuleTool", ["defineTool","resolveRuntimeModules"], _createModuleTool);
  main.variable(observer("test_tools_createModuleTool_registers_in_list_modules")).define("test_tools_createModuleTool_registers_in_list_modules", ["createToolContext","globalRuntime","createModuleTool","moduleMap","viewof currentModules","Event","listModulesTool"], _test_tools_createModuleTool_registers_in_list_modules);
  main.variable(observer("runTestsTool")).define("runTestsTool", ["defineTool"], _runTestsTool);
  main.variable(observer("evalTool")).define("evalTool", ["defineTool","globalRuntime","resolveRuntimeModules","getPromiseState","summarizeJS","TOOL_SUMMARY_MAX_SIZE"], _evalTool);
  main.variable(observer("test_tools_evalTool_expression_no_target")).define("test_tools_evalTool_expression_no_target", ["createToolContext","globalRuntime","evalTool"], _test_tools_evalTool_expression_no_target);
  main.variable(observer("robocoop3_random_value")).define("robocoop3_random_value", _robocoop3_random_value);
  main.variable(observer("test_tools_evalTool_apply_function_to_variable_value")).define("test_tools_evalTool_apply_function_to_variable_value", ["createToolContext","globalRuntime","test_search_variables_includes_module","evalTool"], _test_tools_evalTool_apply_function_to_variable_value);
  main.variable(observer("searchVariablesTool")).define("searchVariablesTool", ["defineTool","resolveRuntimeModules","variablesXML"], _searchVariablesTool);
  main.variable(observer("test_search_variables_includes_module")).define("test_search_variables_includes_module", ["createToolContext","globalRuntime","searchVariablesTool"], _test_search_variables_includes_module);
  main.variable(observer()).define(["md"], _163);
  const child2 = runtime.module(define2);
  main.import("coverage_failures", child2);
  const child3 = runtime.module(define3);
  main.import("runtime", "globalRuntime", child3);
  main.import("getPromiseState", child3);
  main.import("lookupVariable", child3);
  main.import("thisModule", child3);
  main.import("keepalive", child3);
  const child4 = runtime.module(define4);
  main.import("robocoop2", child4);
  const child5 = runtime.module(define5);
  main.import("summarizeJS", child5);
  const child6 = runtime.module(define6);
  main.import("moduleMap", child6);
  main.import("viewof currentModules", child6);
  main.import("currentModules", child6);
  const child7 = runtime.module(define7);
  main.import("reversibleAttach", child7);
  const child8 = runtime.module(define8);
  main.import("localStorageView", child8);
  const child9 = runtime.module(define9);
  main.import("modern_screenshot", child9);
  const child10 = runtime.module(define10);
  main.import("tabbedPane", child10);
  const child11 = runtime.module(define11);
  main.import("cellsToClipboard", child11);
  const child12 = runtime.module(define12);
  main.import("expect", child12);
  main.variable(observer()).define(["robocoop2"], _175);
  return main;
}
