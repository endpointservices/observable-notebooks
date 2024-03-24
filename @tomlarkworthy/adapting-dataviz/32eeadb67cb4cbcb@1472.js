// https://observablehq.com/@observablehq/plot-exploration-penguins@1472
import define1 from "./ab3e70b29c480e6d@83.js";

async function _1(md,FileAttachment){return(
md`# Plot Exploration: Penguins

<img src="${await FileAttachment("penguins.png").url()}" width=620>

Welcome to this semi-guided tutorial for learning [Observable Plot](/@observablehq/plot). We have prepared a tidy dataset, along with a series of exercises that will guide you in coding your own data visualizations.

After a brief presentation of the dataset, you will find a series of questions that can be answered with a chart. All the questions are open! Feel free to try your own approach, or to peek at the working examples that are given at the end of each question.
`
)}

function _2(md){return(
md`*To begin the exploration, please fork this notebook. This way your work will be saved.*

----`
)}

function _3(md){return(
md`Good day! Here is a fine dataset of [penguins](https://allisonhorst.github.io/palmerpenguins/):`
)}

function _data(FileAttachment){return(
FileAttachment("palmer-penguins.csv").csv({typed: true})
)}

function _5(md){return(
md`Data were collected and made available by [Dr. Kristen Gorman](https://www.uaf.edu/cfos/people/faculty/detail/kristen-gorman.php) and the [Palmer Station, Antarctica LTER](https://pal.lternet.edu/), a member of the Long Term Ecological Research Network. They are available by CC-0 license in accordance with the [Palmer Station LTER Data Policy](http://pal.lternet.edu/data/policies) and the [LTER Data Access Policy for Type I data](https://lternet.edu/data-access-policy/).`
)}

function _6(md){return(
md`*If you want to know more about the actual penguins we’re talking about, don’t forget to check the explanations on [Allison Horst’s repo](https://allisonhorst.github.io/palmerpenguins/), with beautiful illustrations:*
<img src=https://allisonhorst.github.io/palmerpenguins/reference/figures/culmen_depth.png style="max-width:450px">`
)}

function _7(md){return(
md`## Table

Using Observable’s [Table](/@observablehq/input-table) component, we can have a look at the contents, structure, and dimensions of this dataset:`
)}

function _8(Inputs,data){return(
Inputs.table(data)
)}

function _9(md,data){return(
md`As we can see, the data is tabular, and one row corresponds to one observation: the data is tidy ([*read more about tidy data*](https://observablehq.com/@observablehq/plot-and-tidy-data)).

We have access, for each penguin (or data point), to its *${data.columns.join(", ")}.*

The numerical values are given in millimeters (for the bill and flipper’s lengths) and grams (for the body mass). Thanks to the <tt>{typed: true}</tt> option in the [<tt>FileAttachment</tt>](#data) cell, they are JavaScript numbers. Categories (*species, island*, and *sex*) are represented as strings.

We are ready to use Plot 🚀`
)}

function _10(md){return(
md`## Plot`
)}

function _11(Plot){return(
Plot
)}

function _12(md){return(
md`*Here's a link to the Plot [documentation collection](/collection/@observablehq/plot) and the [GitHub repository](https://github.com/observablehq/plot), for reference.*`
)}

function _13(md){return(
md`Now, here’s a few questions about this dataset that we can try to answer with Plot:`
)}

function _q0(Q){return(
Q({
  title: `Question 0: Distribution`,
  questions: [
    `Plot a dot for each penguin, using *body_mass* on the *x* axis.`
  ],
  guides: [
    `Use [Plot.**dot**](https://observablehq.com/@observablehq/plot-dot)(data, {x: "…"}) to create a one-dimensional dot plot.`,
    `Use the {fill} and {fillOpacity} options to visualize overlapping dots.`,
    `Repeat with other dimensions.`
  ],
  hints: [
    `// change the code here
Plot.dot(data, {x: "...", fill: "black", fillOpacity: 0.2}).plot() // replace … by the field’s name, e.g. body_mass`
    ],
  solutions: [
    ` Plot.dot(data, {x: "body_mass", fill: "black", fillOpacity: 0.2}).plot()`, 
    `Plot.dot(data, {x: "flipper_length", fill: "black", fillOpacity: 0.2}).plot()`],
  // open: true
})
)}

function _15(Plot,data){return(
Plot.dot(data, {x: "...", fill: "black", fillOpacity: 0.2}).plot()
)}

function _16(A,q0){return(
A(q0)
)}

function _q1(Q){return(
Q({
  title: "Question 1: Correlation",
  questions: [
    `How is _flipper length_ related to _body mass_? Do heavier penguins tend to have longer flippers?`,
    ],
  guides: [
    `There are many ways to answer this question. To create a scatterplot, use a [Plot.**dot**](https://observablehq.com/@observablehq/plot-dot)({x: "dimension 1", y: "dimension 2"}) mark.`,
  ],
  hints: [
    `Plot.dot(data, {x: "…", y: "…"}).plot() // replace … by the field names.`
    ],
  solutions: [
    `Plot.dot(data, {x: "flipper_length", y: "body_mass"}).plot()`]
})
)}

function _18(Plot,data){return(
Plot.dot(data, {x: "…", y: "…"}).plot()
)}

function _19(A,q1){return(
A(q1)
)}

function _q2(Q){return(
Q({
  title: "Question 2: Species",
  questions: [
    `How are these measurements of (flipper) size and (body) weight distributed across the species?`,
    ],
  guides: [
    `Use a [color](https://github.com/observablehq/plot#color-options) to identify species. Also add a title to know which species each color represents!`,
    `Let's also add a small configuration to the plot to show grid lines.`
  ],
  hints: [
    `Plot.dot(data, {… fill: "…", stroke: "…", title: "…" }).plot({ grid: true }), // fill and stroke drive the color`
  ],
  solutions: [
    `Plot.dot(data, {x: "flipper_length", y: "body_mass", fill: "species", title: "species"}).plot({ grid: true })`]
})
)}

function _22(A,q2){return(
A(q2)
)}

function _q3(Q){return(
Q({
  title: "Question 3: Sex",
  questions: [
    `How do these measurements vary with sex? (Bonus: use an alternative encoding for *sex* so that we don’t lose the *species* encoding.)`,
    ],
  guides: [
    `We could use a color to identify sex, like in the previous chart. But we can also reuse the previous code, and add a [facet](/@observablehq/plot-facets) on sex.`,
  ],
  hints: [
    `Plot.dot(data, { "..." }).plot({
  facet: {
    data: data,
    x: "… facet dimension"
  },
  grid: true
})`
  ],
  solutions: [
    ` Plot.dot(data, {x: "flipper_length", y: "body_mass", fill: "species", title: "species"}).plot({
  facet: {
    data,
    x: "sex"
  },
  grid: true,
  marks: [
    // you can add more marks to the plot with the marks array
    Plot.frame(),
  ]
})`,
  `Plot.plot({
  facet: {
    data,
    x: "sex"
  },
  grid: true,
  marks: [
    Plot.frame(),
    Plot.dot(data, {x: "flipper_length", y: "body_mass", fill: "species", title: "species"})
  ]
})`
  ]
})
)}

function _25(A,q3){return(
A(q3)
)}

function _q4(Q){return(
Q({
  title: "Question 4: Counting",
  questions: [`How many species of penguins are present in the dataset, and how many individuals belong to each species?`],
  guides: [
    `You can use the [Plot.**groupX**](https://observablehq.com/@observablehq/plot-group)({y: "count"}, {x: "species"}) transform, and create a bar chart with [Plot.**barY**](https://observablehq.com/@observablehq/plot-bar).`,
    `Don’t hesitate to use fill: "species" to reinforce the identification of species, as in the scatter plot above.`,
  ],
  hints: [
    ` Plot.barY(data, Plot.groupX({y: "count"}, {x: "…"})).plot()`
    ],
  solutions: [`Plot.barY(data, Plot.groupX({y: "count"}, {x: "species", fill: "species"}))
  .plot()`]
})
)}

function _28(A,q4){return(
A(q4)
)}

function _q5(Q){return(
Q({
  title: "Question 5: Islands",
  questions: [`The penguins in this dataset have been identified on three islands. How are the species distributed geographically?`],
  guides: [
    `Again, we can [facet](https://observablehq.com/@observablehq/plot-facet) our data on "island" to draw a bar chart for each of the islands.`,
    `Another technique would be to create circles with x="species" and y="island", and a radius that corresponds to the number of individuals.`,
  ],
  hints: [
    `Plot.barY(data, Plot.groupX({y: "count"}, {x: "…"})).plot({
  facet: {
    data,
    x: "island"
  },
  marks: [
    Plot.frame(),
  ]
})`,
    `Plot.dot(data, Plot.group({r: "count"}, {x: "…", y: "…" })).plot()`
    ],
  solutions: [`Plot.barY(data, Plot.groupX({y: "count"}, {x: "species", fill: "species"}))
  .plot({
    facet: {
      data,
      x: "island"
    },
    marks: [
      Plot.frame(),
    ]
  })`, `Plot.dot(data, Plot.group({r: "count"}, {x: "island", y: "species", stroke: "species" })).plot({
  r: {
    range: [0, 50] // adjusts the radius scale to make the marks more visible
  },
  marginLeft: 80,
  height: 300
})`]
})
)}

function _31(A,q5){return(
A(q5)
)}

function _q6(Q){return(
Q({
  title: "Question 6: Weights",
  questions: [`What is the distribution of weights?`],
  guides: [
    `To draw a histogram of a continuous variable (*body_mass*), we can use the [Plot.**bin**](https://observablehq.com/@observablehq/plot-bin) transform and create [Plot.**rectY**](https://observablehq.com/@observablehq/plot-rect) marks.`,
    `Play with the thresholds option to create more rects.`
  ],
  hints: [
    `Plot.rectY(data, Plot.binX({y: "count"}, {x: "…"})).plot()`
    ],
  solutions: [
  `Plot.rectY(data, Plot.binX({y: "count"}, {x: "body_mass", thresholds: 20}))
  .plot()`]
})
)}

function _34(A,q6){return(
A(q6)
)}

function _q7(Q){return(
Q({
  title: "Question 7: Weight, sex and species",
  questions: [`How does body mass vary across both sex _and_ species? Is the distribution of body mass similar for each sex-species combination?`],
  guides: [
    `You can use x and y [facets](https://observablehq.com/@observablehq/plot-facets) on the previous chart to show how this distribution varies.`,
    `Go wild: try with x: "sex", then y: "species", then both x and y.`,
    `An alternative approach is to [stack](https://observablehq.com/@observablehq/plot-stack) the results by *species*.`
  ],
  hints: [
    `Plot.rectY(data, Plot.binX({y: "count"}, {x: "…"})).plot()`
    ],
  solutions: [ `Plot.rectY(data, Plot.binX({y: "count"}, {x: "body_mass", fill: "species", thresholds: 20})).plot({
  facet: {
    data,
    x: "sex",
    y: "species",
    marginRight: 80
  },
  marks: [
    Plot.frame(),
  ]
})`,
  `Plot.rectY(data, Plot.stackY(Plot.binX({y: "count"}, {x: "body_mass", fill: "species", thresholds: 20}))).plot({
  facet: {
    data,
    x: "sex"
  },
  marks: [
    Plot.frame(),
  ]
})`]
})
)}

function _37(A,q7){return(
A(q7)
)}

function _q8(Q){return(
Q({
  title: "Question 8: Statistics",
  questions: [`On top of the previous plot, overlay a mark denoting the median of the body weights.`],
  guides: [
    `Use the [Plot.**groupZ**](https://observablehq.com/@observablehq/plot-group) transform with a ‘median’ reducer on x.`,
    `[Plot.**tickX**](https://observablehq.com/@observablehq/plot-tick) can create a full-height tick at the computed value. Alternatively, try Plot.**dot**.`
  ],
  hints: [
    `Plot.plot({
  marks: [
    Plot.rectY(…),
    Plot.tickX(data, Plot.groupZ({x: "median"}, {x: "body_mass"}))
  ]
})`
    ],
  solutions: [
    `Plot.plot({
  facet: {
    data,
    x: "sex",
    y: "species",
    marginRight: 80
  },
  marks: [
    Plot.frame(),
    Plot.rectY(data, Plot.binX({y: "count"}, {x: "body_mass", thresholds: 20, fill: "species"})),
    Plot.tickX(data, Plot.groupZ({x: "median"}, {
      x: "body_mass",
      stroke: "#333",
      strokeWidth: 2
    }))
  ]
})`]
})
)}

function _40(A,q8){return(
A(q8)
)}

function _q9(Q){return(
Q({
  title: "Question 9. Reduction",
  questions: [`How many females are heavier than the lightest male?`],
  guides: [
    `Use the [Plot.**selectMinX**](https://observablehq.com/@observablehq/plot-select) transform to show the lightest male (as a tickX mark), and [Plot.**filter**](https://observablehq.com/@observablehq/plot-transforms) to select male or females as dots?`,
    `Additionally, use a [Plot.**groupZ**](https://observablehq.com/@observablehq/plot-group) median transform to give a hint of the females’ distribution of body mass.`
  ],
  hints: [
    `Plot.plot({
  facet: {
    data,
    y: "species"
  },
  marks: [
    Plot.tickX(data, Plot.selectMinX({
      x: "body_mass",
      filter: …
    })),
    Plot.dot(data, {
      x: "body_mass",
      …
    })
  ]
})`
    ],
  solutions: [
    `Plot.plot({
  facet: {
    data,
    y: "species",
    marginLeft: 80
  },
  marks: [
    Plot.frame(),
    Plot.tickX(data, Plot.groupZ({x: "median"}, {
      x: "body_mass",
      filter: d => d.sex === "FEMALE",
      stroke: "species",
      strokeWidth: 3
    })),
    Plot.tickX(data, Plot.selectMinX({
      x: "body_mass",
      filter: d => d.sex === "MALE",
      stroke: "grey",
      strokeWidth: 3
    })),
    Plot.tickX(data, Plot.selectMaxX({
      x: "body_mass",
      filter: d => d.sex === "MALE",
      stroke: "grey",
      strokeWidth: 3
    })),
    Plot.dot(data, {
      x: "body_mass",
      filter: d => d.sex === "MALE",
      fill: "grey",
      r: 2
    }),
    Plot.dot(data, {
      x: "body_mass",
      filter: d => d.sex === "FEMALE",
      fill: "species"
    })
  ]
})`]
})
)}

function _43(A,q9){return(
A(q9)
)}

function _44(md){return(
md`---
<div style="padding-top: 3em">Congratulations! You’ve made it! Now for the last item, please ask your own question to the data:
`
)}

function _47(md){return(
md`*Don’t hesitate to share your notebook, and feel free to comment on the original notebook so we can make this tutorial better for the next person. Thank you!*`
)}

function _48(md){return(
md`*Thanks to everyone who tried our first draft and sent suggestions, in particular: [John](/@john-guerra), [Maya](/@mayagans), [Claudio](/@esperanc), [Fabian](/@mootari).*`
)}

async function _49(md,FileAttachment){return(
md`<a href="https://observablehq.com/collection/@observablehq/plot-explorations">
<img src="${await FileAttachment("weather.png").url()}" width=620>
</a>  
If you enjoyed this, try out our other [Exploration Tutorials!](https://observablehq.com/collection/@observablehq/plot-explorations)
`
)}

function _50(md){return(
md`

<div style="height: 1em"></div>

---------

# Appendix
`
)}

function _51(md){return(
md`If you'd like to see all of the hints and solutions expanded as a sort of “answer sheet”, click this checkbox:`
)}

function _showAll(Inputs,html){return(
Inputs.toggle({label: html`<strong>Show all`})
)}

function _53(md){return(
md`
This notebook is part of the [Plot Explorations](https://observablehq.com/collection/@observablehq/plot-explorations) collection. The code below is used to generate the interactive questions:


Usage:
~~~js
import {Q, A, styles} from "@observablehq/plot-exploration-penguins";

// separate Q & A
viewof q = Q(question); // shows the question
A(q); // shows the answer
styles;
~~~
`
)}

function _answer(showAll,d3,renderGroup,md,renderGuide,code,renderSnippet){return(
function answer({
  title,
  questions = [],
  guides = [],
  hints = [],
  solutions = [],
  open = !!showAll
}) {

  const div = d3.create("div").classed("answer", true);

  if (title) {
    div.append("hr");
    div.append("h2").html(title);
  }

  div.call(renderGroup, questions, "question", true, d => md`${d}`);
  // div.call(renderGroup, guides, "guide", open, d => md`${d}`);
    div.call(renderGuide, guides, "guide", open, d => md`${d}`);
  div.call(renderGroup, hints, "hint", open, d => code(d, "hint"));
  div.call(renderGroup, solutions, "solution", open, d => code(d, "solution", renderSnippet));

  return div.node();
}
)}

function _Q(answer){return(
function Q(q) {
  return Object.assign(answer({
    ...q,
    guides: null,
    hints: null,
    solutions: null
  }), {value: q})
}
)}

function _A(answer){return(
function A(q) {
  return answer({
    ...q,
    title: null,
    questions: null
  })
}
)}

function _renderGroup(){return(
function renderGroup(div, group, type, open, render) {
  if (group?.length) {
    const details = div.append(type==="question" ? "div" : "details");
    if (open) details.attr("open", "open")
    if (type !== "question") details.append("summary").append("strong").text(`${type}${group.length > 1 ? "s" : ""}`);
    details.append("ul").selectAll().data(group).join("li").append(render);
  }
}
)}

function _renderGuide(){return(
function renderGuide(div, group, type, open, render) {
  if (group?.length) {
    const details = div.append("div");
    if (open) details.attr("open", "open")
    // details.append("span").append("strong").text(`${type}${group.length > 1 ? "s" : ""}`);
    details.append("ul").selectAll().data(group).join("li").append(render);
  }
}
)}

function _renderSnippet(data,Plot,d3,width){return(
function renderSnippet(str) {
  try {
    const func = new Function("data", "Plot", "d3", "width", `return ${str}`)
    return func(data, Plot, d3, width);
  }
  catch(e) {}
}
)}

function _code(html,Copier,rows){return(
function code(code, type, visual) {
  return html`
<div class="copy">${Copier("Copy", {value: code})}</div>
<textarea class=${type} rows=${rows(code)}>${code}</textarea>
${visual ? visual(code) : ""}`;

}
)}

function _rows(){return(
function rows(code) {
  const lines = code.trim().split("\n").length;
  return Math.max(Math.min(lines, 15), 2);
}
)}

function _styles(html){return(
html`<style>
.answer {
  font-family: system-ui, sans-serif;
  font-size: 14px;
}
.answer summary strong {
  text-transform: capitalize;
}
.answer li {
  list-style: none;
  position: relative;
}
.answer textarea { 
  font: var(--monospace-font); 
  font-size: 12px; 
  width: 100%; 
  padding: 5px;
  border: 2px solid #3b5fc0;
  background: #F6F9FF;
  border-radius: 5px;
  margin-bottom: 2em;
  resize: none;
}
.answer .copy form {
  position: absolute;
  right: -4px;
  top: 4px;
  width: initial;
}
.answer summary {
  display: inline-block;
  padding: 2px 6px;
  border: 2px solid #3b5fc0;
  background: #F6F9FF;
  border-radius: 5px;
  margin: 2px 0;
  outline-offset: -2px;
  list-style: none;
  cursor: pointer;
  min-width: 62px;
  text-align: center;
}

.answer details[open] > summary {
  background: #3b5fc0;
  color: white;
}

`
)}

function _html(htl){return(
htl.html
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["penguins.png", {url: new URL("./files/3b12c349e13f0473701a290d17e9a79b07556c06bd498dd87f00b7b5f79475101f627ccbf33e99c5c4ba22dcb2693467871dd718398c5edfa3175a87c50dd4ea.png", import.meta.url), mimeType: "image/png", toString}],
    ["palmer-penguins.csv", {url: new URL("./files/78466fd621db89a8708d6af36834c45c977f3f95c44f91a380bf7c985f03db2d03849aef300f8caa2bce9605f5229fe9813ed4f168c75f9b0abb4e960400faf0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["weather.png", {url: new URL("./files/9a74aa4f8addb29c94f8a780f9b6211ffa49fc6cd956d665c85ada864b6ada28fb44e047062a927663f6f7885a8a02cfede8ed60ac79d72130c913b0820ec190.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Inputs","data"], _8);
  main.variable(observer()).define(["md","data"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof q0")).define("viewof q0", ["Q"], _q0);
  main.variable(observer("q0")).define("q0", ["Generators", "viewof q0"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data"], _15);
  main.variable(observer()).define(["A","q0"], _16);
  main.variable(observer("viewof q1")).define("viewof q1", ["Q"], _q1);
  main.variable(observer("q1")).define("q1", ["Generators", "viewof q1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data"], _18);
  main.variable(observer()).define(["A","q1"], _19);
  main.variable(observer("viewof q2")).define("viewof q2", ["Q"], _q2);
  main.variable(observer("q2")).define("q2", ["Generators", "viewof q2"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q2"], _22);
  main.variable(observer("viewof q3")).define("viewof q3", ["Q"], _q3);
  main.variable(observer("q3")).define("q3", ["Generators", "viewof q3"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q3"], _25);
  main.variable(observer("viewof q4")).define("viewof q4", ["Q"], _q4);
  main.variable(observer("q4")).define("q4", ["Generators", "viewof q4"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q4"], _28);
  main.variable(observer("viewof q5")).define("viewof q5", ["Q"], _q5);
  main.variable(observer("q5")).define("q5", ["Generators", "viewof q5"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q5"], _31);
  main.variable(observer("viewof q6")).define("viewof q6", ["Q"], _q6);
  main.variable(observer("q6")).define("q6", ["Generators", "viewof q6"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q6"], _34);
  main.variable(observer("viewof q7")).define("viewof q7", ["Q"], _q7);
  main.variable(observer("q7")).define("q7", ["Generators", "viewof q7"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q7"], _37);
  main.variable(observer("viewof q8")).define("viewof q8", ["Q"], _q8);
  main.variable(observer("q8")).define("q8", ["Generators", "viewof q8"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q8"], _40);
  main.variable(observer("viewof q9")).define("viewof q9", ["Q"], _q9);
  main.variable(observer("q9")).define("q9", ["Generators", "viewof q9"], (G, _) => G.input(_));
  main.variable(observer()).define(["A","q9"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md","FileAttachment"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer("viewof showAll")).define("viewof showAll", ["Inputs","html"], _showAll);
  main.variable(observer("showAll")).define("showAll", ["Generators", "viewof showAll"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("answer")).define("answer", ["showAll","d3","renderGroup","md","renderGuide","code","renderSnippet"], _answer);
  main.variable(observer("Q")).define("Q", ["answer"], _Q);
  main.variable(observer("A")).define("A", ["answer"], _A);
  main.variable(observer("renderGroup")).define("renderGroup", _renderGroup);
  main.variable(observer("renderGuide")).define("renderGuide", _renderGuide);
  main.variable(observer("renderSnippet")).define("renderSnippet", ["data","Plot","d3","width"], _renderSnippet);
  main.variable(observer("code")).define("code", ["html","Copier","rows"], _code);
  main.variable(observer("rows")).define("rows", _rows);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer("html")).define("html", ["htl"], _html);
  const child1 = runtime.module(define1);
  main.import("Copier", child1);
  return main;
}
