import define1 from "./048a17a165be198d@263.js";
import define2 from "./293899bef371e135@290.js";

function _1(md){return(
md`# Colossal Cave ChatGPT Challenge

Devise a system prompt that scores well on the 1976 classic "Colossal Cave Adventure". I've scored 93 on GPT3.5-turbo! but I think more is possible and I have never run GPT-4 (I don't have access).

You can look up the score by typing \`score\` in the \`adventure_input\`.

I made this to learn how AutoGPT-like techniques can work on a problem well suited to the ChatGPT interface. As I have played with it I have experienced how certain prompt techniques like chain-of-thought provide huge boosts in task performance, but the game is tricky, there are random elements so this is not enough. Is a perfect score of 350 achievable? Let me know of your progress in the notebook comments (in left burger menu) or on [Twitter](https://twitter.com/tomlarkworthy/status/1650145775014273025?s=20) (maybe post the game output to a gist)
`
)}

function _2(md){return(
md`<details>
  <summary>Confirming your key privacy</summary>
  ${md`This notebook stores your OPENAI_API_KEY in localstorage so it's there when you refresh the page. Other than that the only time it is accessed is when making an OpenAI call. You can verify this by searching for OPENAI_API_KEY references using the search feature in the right sidebar.
  
  This notebook is hosted by [observablehq.com](https://observablehq.com/). They do not inspect the internal state of notebook. See their [security policy](https://observablehq.com/@observablehq/security-and-data-access-demo).`}

  => Your key is never disclosed to any party other than OpenAI
</details>`
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

function _model(Inputs){return(
Inputs.select(
  [
    "gpt-4",
    "gpt-4-0314",
    "gpt-4-32k",
    "gpt-4-32k-0314",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-0301"
  ].sort(),
  {
    label: "model"
  }
)
)}

function _settings(){return(
{
  temperature: 0.7,
  max_tokens: 500,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}
)}

function _6(Plot,game_history){return(
Plot.plot({
  marks: [Plot.line(game_history, { x: "turn", y: "score" })]
})
)}

function _7(md){return(
md`Enter your prompt here, then press start and follow its adventure below`
)}

function _8(md){return(
md`<details>
  <summary>prompt hints</summary>
  <details>
    <summary>Score 2: Game mechanics only</summary>
${md`
~~~
Act as a player in a 1970 text adventure game trying to get a good score. I will read the description and YOU MUST RESPOND WITH TWO WORDS. One VERB and one NOUN. DO NOT add any additional words or a different form. Do not apologize. DO NOT ASK A QUESTION.

The verbs are:

carry
drop
say
unlock
light
extinguish
wave
attack
pour
eat
drink
rub
throw
find
feed
fill
blast
read
break
wake
suspend


The nouns are: 

upstream downstream forest
forward continue onward return retreat valley staircase outside building stream
cobble inward inside surface nowhere passage tunnel canyon awkward
upward ascend downward descend outdoors barren across debris broken
examine describe slabroom depression entrance secret bedquilt plover
oriental cavern reservoir office headlamp lantern pillow velvet fissure tablet
oyster magazine spelunker dwarves knives rations bottle mirror beanstalk
stalactite shadow figure drawings pirate dragon message volcano geyser
machine vending batteries carpet nuggets diamonds silver jewelry treasure
trident shards pottery emerald platinum pyramid pearl persian spices capture
release discard mumble unlock nothing extinguish placate travel proceed
continue explore follow attack strike devour inventory detonate ignite
blowup peruse shatter disturb suspend sesame opensesame abracadabra
shazam excavate information

DO NOT WRITE ANYTHING OTHER THAN THE COMMAND.

tips for getting a good score:
take all the items in the building and go downstream and unlock the grate. Explore the caves within. To to visit as many different places as possible.
~~~`}
    </details>
    <details>
      <summary>Score 37: walkthrough from the internet</summary>
${md`

I pasted a solution from https://strategywiki.org/wiki/Colossal_Cave_Adventure/Walkthrough and it did pretty well but often lost its place in the instructions

~~~
Act as a player in a 1970 text adventure game trying to get a good score. I will read the description and YOU MUST RESPOND WITH WITH THE NEXT COMMAND. Here are the commands

e
get lamp
xyzzy
on lamp
e
get cage
pit
e
get bird
w
d
s
get gold
n
n
free bird
drop cage
s
get jewel
n
w
get coins
e
n
get silver
n
plover
ne
get pyramid
s
plover
plugh
drop pyramid
drop coins
drop jewel
drop silver
drop gold
get bottle
get food
get keys
plugh
s
d
bedquilt
slab
s
d
pour water
u
w
u
reservoir
get water
s
s
d
s
d
pour water
u
e
d
get oil
u
w
d
climb
w
get eggs
n
oil door
n
get trident
w
d
drop bottle
sw
u
toss eggs
cross
ne
barren
e
feed bear
open chain
get chain
get bear
w
fork
ne
e
get spice
fork
w
w
cross
free bear
cross
sw
d
drop keys
bedquilt
e
n
open clam
d
d
get pearl
u
u
s
u
e
u
n
plugh
drop chain
drop spice
drop trident
drop pearl
plugh
s
d
bedquilt
w
oriental
n
w
drop lamp
drop axe
e
get emerald
w
get axe
get lamp
nw
s
get vase
se
e
get pillow
w
w
w
d
climb
w
fee
fie
foe
foo
get eggs
s
d
u
w
u
s
kill dragon
yes
get rug
e
e
n
n
plugh
drop rug
drop pillow
drop vase
drop emerald
drop eggs
xyzzy
get rod
pit
d
w
wave rod
w
get diamond
w
s
e
s
s
s
n
e
n
e
nw
get chest
get diamond
se
n
d
debris
xyzzy
drop rod
drop chest
drop diamond
plugh
s
d
bedquilt
e
e
get magazine
e
drop magazine
n
sw
get rod
ne
drop rod
sw
blast
~~~
`}
    </details>
    <details>
    <summary>Score 93, Walkthrough + Chain of Thought</summary>
${md`

To help the assistant keep its place in the walkthrough I numbered the steps and asked it to output the step before the command. It performed so well that the context token size grew large enough to require truncation. It can't achieve a perfect score though because there are random elements in the game like the dwarves that mess the run up.

~~~
Act as a player in a 1970 text adventure game trying to get a good score.

I will read the description and YOU MUST RESPOND WITH WITH THE STEP NUMBER ON THE FIRST LINE AND THE NEXT COMMAND ON THE SECOND LINE. Here are the commands

1. e
2. get lamp
3. xyzzy
4. on lamp
5. e
6. get cage
7. pit
8. e
9. get bird
10. w
11. d
12. s
13. get gold
14. n
15. n
16. free bird
17. drop cage
18. s
19. get jewel
20. n
21. w
22. get coins
23. e
24. n
25. get silver
26. n
27. plover
28. ne
29. get pyramid
30. s
31. plover
32. plugh
33. drop pyramid
34. drop coins
35. drop jewel
36. drop silver
37. drop gold
38. get bottle
39. get food
40. get keys
41. plugh
42. s
43. d
44. bedquilt
45. slab
46. s
47. d
48. pour water
49. u
50. w
51. u
52. reservoir
53. get water
54. s
55. s
56. d
57. s
58. d
59. pour water
60. u
61. e
62. d
63. get oil
64. u
65. w
66. d
67. climb
68. w
69. get eggs
70. n
71. oil door
72. n
73. get trident
74. w
75. d
76. drop bottle
77. sw
78. u
79. toss eggs
80. cross
81. ne
82. barren
83. e
84. feed bear
85. open chain
86. get chain
87. get bear
88. w
89. fork
90. ne
91. e
92. get spice
93. fork
94. w
95. w
96. cross
97. free bear
98. cross
99. sw
100. d
101. drop keys
102. bedquilt
103. e
104. n
105. open clam
106. d
107. d
108. get pearl
109. u
110. u
111. s
112. u
113. e
114. u
115. n
116. plugh
117. drop chain
118. drop spice
119. drop trident
120. drop pearl
121. plugh
122. s
123. d
124. bedquilt
125. w
126. oriental
127. n
128. w
129. drop lamp
130. drop axe
131. e
132. get emerald
133. w
134. get axe
135. get lamp
136. nw
137. s
138. get vase
139. se
140. e
141. get pillow
142. w
143. w
144. w
145. d
146. climb
147. w
148. fee
149. fie
150. foe
151. foo
152. get eggs
153. s
154. d
155. u
156. w
157. u
158. s
159. kill dragon
160. yes
161. get rug
162. e
163. e
164. n
165. n
166. plugh
167. drop rug
168. drop pillow
169. drop vase
170. drop emerald
171. drop eggs
172. xyzzy
173. get

For example, your first output should be:
 
1
e
~~~
`}
    </details>
    <summary>Prompt Tip Template</summary>
${md`
~~~

~~~
`}
    </details>
</details>`
)}

function _system_prompt(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.textarea({
    placeholder: "write your prompt here... suggestions above",
    rows: 10
  }),
  localStorageView("collosal_cave_prompt")
)
)}

function _run(Inputs){return(
Inputs.button("start/step/continue")
)}

function _auto_run(Inputs){return(
Inputs.toggle({
  label: "auto-run",
  value: true
})
)}

function _reset(Inputs,$0){return(
Inputs.button("reset game", {
  reduce: (acc) => {
    $0.value = false;
    return acc + 1;
  }
})
)}

function _view(html,output,htl){return(
htl.html`<div style="height: 200px; overflow: scroll; font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace; color: #0F0; background: black; padding: 10px">
  ${html`${output}`}
</div>`
)}

function _adventure_input(reset,Inputs)
{
  reset;
  return Inputs.textarea({
    label: "adventure input",
    placeholder: ">",
    submit: true
  });
}


function _15(md){return(
md`💡 You can manually type \`score\` ^^`
)}

function _16(md){return(
md`---`
)}

function _delay(Inputs){return(
Inputs.range([0, 2], {
  value: 2,
  label: "pause between actions"
})
)}

function _18(md){return(
md`## Code

below is the bulk of the implementation`
)}

function _19(md){return(
md`### Open AI`
)}

async function _ai_context($0,game_history)
{
  await new Promise((next) => setTimeout(next, $0.value));
  return game_history
    .flatMap((entry) => [
      {
        role: "assistant",
        content: entry.input
      },
      {
        role: "user",
        content: entry.response
      }
    ])
    .slice(-70, -1);
}


async function _openAiResponse(run,auto_run,OPENAI_API_KEY,$0,$1,ai_context,settings)
{
  if (run == 0) throw new Error("Press start/continue to begin");
  if (!auto_run) throw new Error("Toggle auto-run to continue");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: $0.value,
      messages: [
        {
          role: "system",
          content: $1.value
        },
        ...ai_context
      ],
      ...settings
    })
  });

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);

  return response.json();
}


function _ai_choice(openAiResponse){return(
openAiResponse.choices[0].message.content
)}

function _ai_to_adventure($0,ai_choice,Event)
{
  $0[0].value = ai_choice;
  $0.dispatchEvent(new Event("submit"));
}


function _24(md){return(
md`### [Adventurejs](https://www.npmjs.com/package/adventurejs)`
)}

function _adventure(){return(
import("https://cdn.skypack.dev/adventurejs@1.0.1?min")
)}

function _game(reset,adventure)
{
  reset;
  return adventure.makeState();
}


function _on_input(adventure_input,game,adventure,$0,Event,$1,$2)
{
  // Tick the game when new "adventure_input" arrives
  const masked_input = adventure_input.split("\n").slice(-1);
  const adventure_response = game.advance(masked_input).join(" ");
  const score = parseInt(
    (/(\d+)/.exec(
      adventure
        .makeState(JSON.parse(JSON.stringify(game)))
        .advance("score")
        .find((x) => x.startsWith("SCORE"))
    ) || ["0", "0"])[1]
  );

  // Record history
  $0.value.push({
    input: adventure_input,
    response: adventure_response,
    score,
    turn: ($0.value.slice(-1)[0]?.turn || 0) + 1
  });
  $0.dispatchEvent(new Event("input"));

  // Render to HTML
  $1.value =
    $1.value + "<br>> " + adventure_input + "<br>" + adventure_response;

  if (game.state == "init_yesno") {
    // Auto-play the instructions part
    $2[0].value = "no";
    $2.dispatchEvent(new Event("submit"));
  } else {
    $2.value = "";
  }
  return `${adventure_input} -> ${adventure_response}`;
}


function _output(reset)
{
  reset;
  return "";
}


function _game_history(reset,Inputs)
{
  reset;
  return Inputs.input([]);
}


function _30(md){return(
md`### Misc`
)}

function _ui_loop(view)
{
  view.scrollTop = view.scrollHeight;
}


function _34(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["Inputs"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("settings")).define("settings", _settings);
  main.variable(observer()).define(["Plot","game_history"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof system_prompt")).define("viewof system_prompt", ["Inputs","localStorageView"], _system_prompt);
  main.variable(observer("system_prompt")).define("system_prompt", ["Generators", "viewof system_prompt"], (G, _) => G.input(_));
  main.variable(observer("viewof run")).define("viewof run", ["Inputs"], _run);
  main.variable(observer("run")).define("run", ["Generators", "viewof run"], (G, _) => G.input(_));
  main.variable(observer("viewof auto_run")).define("viewof auto_run", ["Inputs"], _auto_run);
  main.variable(observer("auto_run")).define("auto_run", ["Generators", "viewof auto_run"], (G, _) => G.input(_));
  main.variable(observer("viewof reset")).define("viewof reset", ["Inputs","viewof auto_run"], _reset);
  main.variable(observer("reset")).define("reset", ["Generators", "viewof reset"], (G, _) => G.input(_));
  main.variable(observer("view")).define("view", ["html","output","htl"], _view);
  main.variable(observer("viewof adventure_input")).define("viewof adventure_input", ["reset","Inputs"], _adventure_input);
  main.variable(observer("adventure_input")).define("adventure_input", ["Generators", "viewof adventure_input"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof delay")).define("viewof delay", ["Inputs"], _delay);
  main.variable(observer("delay")).define("delay", ["Generators", "viewof delay"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("ai_context")).define("ai_context", ["viewof delay","game_history"], _ai_context);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["run","auto_run","OPENAI_API_KEY","viewof model","viewof system_prompt","ai_context","settings"], _openAiResponse);
  main.variable(observer("ai_choice")).define("ai_choice", ["openAiResponse"], _ai_choice);
  main.variable(observer("ai_to_adventure")).define("ai_to_adventure", ["viewof adventure_input","ai_choice","Event"], _ai_to_adventure);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("adventure")).define("adventure", _adventure);
  main.variable(observer("game")).define("game", ["reset","adventure"], _game);
  main.variable(observer("on_input")).define("on_input", ["adventure_input","game","adventure","viewof game_history","Event","mutable output","viewof adventure_input"], _on_input);
  main.define("initial output", ["reset"], _output);
  main.variable(observer("mutable output")).define("mutable output", ["Mutable", "initial output"], (M, _) => new M(_));
  main.variable(observer("output")).define("output", ["mutable output"], _ => _.generator);
  main.variable(observer("viewof game_history")).define("viewof game_history", ["reset","Inputs"], _game_history);
  main.variable(observer("game_history")).define("game_history", ["Generators", "viewof game_history"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("ui_loop")).define("ui_loop", ["view"], _ui_loop);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _34);
  return main;
}
