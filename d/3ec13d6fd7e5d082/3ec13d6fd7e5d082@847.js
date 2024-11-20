import define1 from "./64641700df65baed@91.js";
import define2 from "./0671d74f3ece3670@168.js";
import define3 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# K-Graphs Machines - Introduction

Wilfried Sieg and John Byrnes brought up the Kolmogorov-graph machine for philosophical arguments, but I think it is quite an interesting machine for computation. It generalizes the Turing machine allowing it to do symbolic computation on a graph in such a way to mirror the topology of the problem it is solving. It also has some nice effeciency features, which I suspect makes it a genuinely useful representation for learning beyond _vectors_ (e.g. _Do Transformers Really Perform Bad for Graph Representation?_).

[K-GRAPH MACHINES: Generalizing Turing's Machines and Arguments](https://www.cmu.edu/dietrich/philosophy/docs/tech-reports/70_Sieg.pdf), *Wilfried Sieg and John Byrnes*, Proceedings of Gödel, 1996
`
)}

function _2(toc){return(
toc()
)}

function _3(md){return(
md`## Undirected Labelled Graph

We start with a graph with labels on vertices (note same label can appear multiple times)
`
)}

function _4(md){return(
md`#### Example Graph 1`
)}

function _example1(viewofGraph,edges){return(
viewofGraph(
  edges([[1, 2], [2, 3], [1, 3], [2, 0], [4, 0]], {
    0: '*',
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'A'
  })
)
)}

function _6(md){return(
md`##### _edges(edges, labels, center)_`
)}

function _edges(){return(
function edges(list, l, center) {
  const e = {};

  list.forEach(edge => {
    if (!e[edge[0]]) e[edge[0]] = {};
    if (!e[edge[1]]) e[edge[1]] = {};

    e[edge[0]][edge[1]] = true;
    e[edge[1]][edge[0]] = true;
  });

  const c = Object.entries(l).find(p => p[1] == '*');
  return {
    e,
    l,
    c: c ? c[0] : undefined
  };
}
)}

function _8(example1){return(
example1
)}

function _9(md){return(
md`##### _viewofGraph(g)_`
)}

function _dotEdges(){return(
(g, { prefix = '', positions = {} } = {}) => {
  const hasPositions = Object.keys(positions).length > 0;
  return `{
      ${Object.keys(g.l)
        .map(
          v => `"${prefix}${v}" [
            label="${g.l[v]}"
            fontsize=20
            xlabel="${v}"
            ${
              hasPositions && positions[v]
                ? `pos="${positions[v][0]},${positions[v][1]}!" `
                : ''
            }
            ]`
        )
        .join('\n')}
   }

   ${Object.keys(g.e)
     .map(v1 =>
       Object.keys(g.e[v1])
         .map(v2 => (v1 < v2 ? `"${prefix}${v1}" -- "${prefix}${v2}";` : ''))
         .join('\n')
     )
     .join('\n')}`;
}
)}

function _viewofGraph(dot,dotEdges,neato){return(
function viewofGraph(g, options) {
  let engine = "dot"
  if (Object.keys(options?.positions || []).length > 0) {
    engine = "neato"
  }
  
  const ui = engine === 'dot' ? dot`graph { 
    ${dotEdges(g, options)}
  }` : neato`graph { 
    ${dotEdges(g, options)}
  }`;
  ui.value = g;
  return ui;
}
)}

function _12(md){return(
md`### With a central vertex \\* `
)}

function _13(md){return(
md`\\* denotes a *central* vertex, with which rewrite rules are applied around. This is analogous to a Turing machines *head*`
)}

function _14(md,tex){return(
md`<strong> The label sequence ${tex`Lbs(v)`} </strong>

A label sequence, ${tex`Lbs(v)`}, is a list of labels from _*_ to _v_ along edges of the graph.

For example, (*, B, A, C) is in Lbs(C). While there are infinite loopy routes to C, if every labelling identifies a unique vertex, we say its a K-graph.

`
)}

function _15(md,tex){return(
md`#### __Definition 2.__ The principle of unique location

<strong> A finite connected ${tex`\mathcal{L}_*`}-labelled graph, ${tex`K`} is a _Kolmogorov-graph_, or, _k-graph_, over ${tex`\mathcal{L}`} if, ${tex`(\forall\alpha)(\forall u, v \in K)[\alpha \in Lbs(u) \cap Lbs(v) \Rightarrow u = v ]`}</strong>

<br>

Said another way, there is a unique coordinate system eminating from \\*. You can say (\\*, B, A) or any other list and know it will always identify a unique vertex on the graph (or none at all).

`
)}

function _16(md){return(
md`##### _hasUniqueLocation(g)_`
)}

function _hasUniqueLocation(labelPathsLength,labelPaths){return(
g => {
  return labelPathsLength(labelPaths(g)) === Object.keys(g.l).length;
}
)}

function _18(md){return(
md`### DFS label paths

Complete coverage of the graph with label paths encoded as a tree
`
)}

function _19(labelPaths,example1){return(
labelPaths(example1)
)}

function _20(md){return(
md`##### _labelPaths(g)_`
)}

function _labelPaths(){return(
g => {
  const visited = new Set(['*']);
  const expand = v => {
    visited.add(v);
    return Object.keys(g.e[v]).reduce((acc, n) => {
      if (!visited.has(n)) {
        acc[g.l[n]] = expand(n);
      }
      return acc;
    }, {});
  };
  return {
    "*": expand(g.c)
  };
}
)}

function _22(md){return(
md`##### _labelPathsLength(labelPaths)_`
)}

function _labelPathsLength(){return(
function labelPathsLength(labelPaths) {
  return Object.entries(labelPaths).reduce(
    (acc, entry) => acc + labelPathsLength(entry[1]) + 1,
    0
  );
}
)}

function _24(md){return(
md`### Match label paths

Convert a tree encoding of label paths to vertex indeces

`
)}

function _25(md){return(
md`##### _matchLabelPaths(g, labelPaths)_`
)}

function _matchLabelPaths(){return(
(g, labels) => {
  const match = (v, labels) => {
    let matches = 0;
    const children = Object.keys(g.e[v]).reduce((acc, n) => {
      const l = g.l[n];
      if (labels[l]) {
        acc[n] = match(n, labels[l]);
        matches++;
      }
      return acc;
    }, {});
    if (matches !== Object.keys(labels).length)
      throw new Error(`Could not match: ${Object.keys(labels)} from ${v}`);
    return children;
  };
  return {
    [g.c]: match(g.c, labels['*'])
  };
}
)}

function _27(matchLabelPaths,example1){return(
matchLabelPaths(example1, { '*': { A: {} } })
)}

function _28(matchLabelPaths,example1){return(
matchLabelPaths(example1, { '*': { B: { C: { A: { B: {} } } } } })
)}

function _29(md,tex){return(
md`## Transition Rules

A transition rule is a k-graph, A, to a k-graph, C. In the paper an subgraph _isomorphic_ to A is cut from L and replaced with C. However, determining a permutation, ${tex`\pi`}, for the _isomorphism_ is hard to program so we will not bother. Instead, a subgraph matching _A_ is replaced with _C_.

Transtion rules are graph rewrites. Like a Turing machine rewrites its tape, the k-graph machine rewrites a subgraph in the vicinity of its head.
`
)}

function _30(md){return(
md`##### _rule(from, to)_`
)}

function _rule(){return(
(from, to) => ({
  from,
  to
})
)}

function _32(md){return(
md`##### _viewofRule(rule)_`
)}

function _viewofRule(dot,dotEdges){return(
function viewofRule(r) {
  const ui = dot`graph { 
      compound=true;
      subgraph clusterFrom {
        ${dotEdges(r.from, { prefix: 'f' })}  
      }
      "f${r.from.c}" -- "=>" [ltail=clusterFrom, constraint=false];
      subgraph clusterTo {
        ${dotEdges(r.to, { prefix: 't' })}  
      }
      "=>" -- "t${r.to.c}" [lhead=clusterTo, constraint=false];
    }`;
  ui.value = r;
  return ui;
}
)}

function _r1(rule,edges){return(
rule(
  edges([['b', 'a'], ['b', 'c']], {
    a: '*',
    b: 'B',
    c: 'C'
  }),
  edges([['b', 'a']], {
    a: '*',
    b: 'A'
  })
)
)}

function _35(viewofRule,r1){return(
viewofRule(r1)
)}

function _36(md){return(
md`This rule is from the paper:-`
)}

function _37(FileAttachment){return(
FileAttachment("image.png").image()
)}

function _exampleRule(rule,edges){return(
rule(
  edges([['a', 'b'], ['a', 'c'], ['a', 'd'], ['d', 'e'], ['d', 'f']], {
    a: '*',
    b: 'C',
    c: 'D',
    d: 'A',
    e: 'A',
    f: 'B'
  }),
  edges([['z', 'b'], ['z', 'c'], ['z', 'f']], {
    z: '*',
    b: 'C',
    c: 'D',
    f: 'B'
  })
)
)}

function _39(viewofRule,exampleRule){return(
viewofRule(exampleRule)
)}

function _40(md){return(
md`### Match a k-graph, _graph_ with a k-graph, _pattern_

We start at * and work outwards recursively. The principle of unique location keeps it simple.`
)}

function _41(md){return(
md`##### _match(g, pattern)_`
)}

function _match(matchLabelPaths,labelPaths){return(
(graph, pattern) => matchLabelPaths(graph, labelPaths(pattern))
)}

function _43(match,example1,r1){return(
match(example1, r1.from)
)}

function _44(md){return(
md`#### Common vertices`
)}

function _commonVertices(_){return(
(g1, g2) => {
  return _.intersection(g1.v, g2.v);
}
)}

function _46(commonVertices,exampleRule){return(
commonVertices(exampleRule.from, exampleRule.to)
)}

function _47(md){return(
md`### Apply a transition rule

The _from_ part of the rule is cut from the graph, and replaced with the _to_. The common node vertices between _from_ and _to_ survive. The result is not necissarily a k-graph (unique location constrain may be violated) so that must be checked afterwards.
`
)}

function _48(FileAttachment){return(
FileAttachment("image@1.png").image()
)}

function _ruleGraph(edges){return(
edges(
  [
    ['a', 'b'],
    ['a', 'c'],
    ['a', 'd'],
    ['d', 'e'],
    ['d', 'f'],
    ['f', 'g'],
    ['e', 'i'],
    ['i', 'h'],
    ['h', 'b'],
    ['b', 'k'],
    ['k', 'j'],
    ['c', 'n'],
    ['n', 'm'],
    ['m', 'l'],
    ['c', 'o'],
    ['o', 'p']
  ],
  {
    a: '*',
    b: 'C',
    c: 'D',
    d: 'A',
    e: 'A',
    f: 'B',
    g: 'D',
    h: 'B',
    i: 'B',
    j: 'B',
    k: 'A',
    l: 'B',
    m: 'A',
    n: 'C',
    o: 'D',
    p: 'D'
  }
)
)}

function _50(viewofGraph,ruleGraph){return(
viewofGraph(ruleGraph)
)}

function _vertexDelete(edges){return(
(g, vSet) =>
  edges(
    Object.keys(g.e)
      .filter(v => !vSet.has(v))
      .reduce((acc, startV) => {
        Object.keys(g.e[startV]).forEach(
          endV => !vSet.has(endV) && acc.push([startV, endV])
        );
        return acc;
      }, []),
    Object.fromEntries(Object.entries(g.l).filter(([v, l]) => !vSet.has(v)))
  )
)}

function _edgesAdd(edges){return(
(g1, g2) =>
  edges(
    Object.keys(g1.e)
      .concat(Object.keys(g2.e))
      .reduce((acc, startV) => {
        Object.keys(g1.e[startV] || {}).forEach(endV =>
          acc.push([startV, endV])
        );
        Object.keys(g2.e[startV] || {}).forEach(endV =>
          acc.push([startV, endV])
        );
        return acc;
      }, []),
    Object.fromEntries(Object.entries(g1.l).concat(Object.entries(g2.l)))
  )
)}

function _53(md){return(
md`##### _applyRule(g, rule)_`
)}

function _applyRule(match,commonVertices,exampleRule,_,vertexDelete,edgesAdd,hasUniqueLocation){return(
(g, rule) => {
  const cut = match(g, rule.from);
  const cutVertices = rule.from.v;
  const overlap = commonVertices(exampleRule.from, exampleRule.to);
  const remove = _.difference(cutVertices, overlap);
  const remainder = vertexDelete(g, new Set(remove));
  const result = edgesAdd(remainder, rule.to);
  if (hasUniqueLocation(result)) return result;
  else return null;
}
)}

function _55(example1){return(
example1
)}

function _gatherKeys(){return(
function gatherKeys(tree, list = []) {
  Object.keys(tree).reduce((acc, key) => {
    list.push(key);
    gatherKeys(tree[key], list);
  }, null);
  return list;
}
)}

function _57(viewofGraph,applyRule,ruleGraph,exampleRule){return(
viewofGraph(applyRule(ruleGraph, exampleRule))
)}

async function _58(md,FileAttachment){return(
md`It should match the paper's (✅):

![](${await FileAttachment("image@3.png").url()})

`
)}

function _59(md){return(
md`Result of rule application should be a k-graph, this is not always true, so we need to manually check the uniqueness of location property still applies. (uses _hasUniqueLocation_)`
)}

async function _60(md,FileAttachment){return(
md`## Example -- Long addition

k-graphs can be used to express algorithms such as addition 

${await FileAttachment("image@4.png").image()}`
)}

function _61(md){return(
md`The * can reprent the current column being worked on`
)}

function _m11(viewofGraph,edges){return(
viewofGraph(
  edges(
    [
      ['a', 'x1'],
      ['x1', '*'],
      ['x1', 'b'],
      ['b', 'c'],
      ['c', 'x2'],
      ['x2', 'd']
    ],
    {
      '*': "*",
      a: "U",
      x1: "1",
      b: "D",
      c: "U",
      d: "D",
      x2: "1"
    }
  ),
  {
    positions: {
      a: [0, 5],
      x1: [0, 4],
      '*': [1, 4],
      b: [0, 3],
      c: [0, 2],
      x2: [0, 1],
      d: [0, 0]
    }
  }
)
)}

function _63(md){return(
md`We can append a C to represent the carry bit`
)}

function _m00c(viewofGraph,edges){return(
viewofGraph(
  edges(
    [
      ['a', 'x1'],
      ['x1', '*'],
      ['*', 'e'],
      ['x1', 'b'],
      ['b', 'c'],
      ['c', 'x2'],
      ['x2', 'd']
    ],
    {
      '*': "*",
      a: "U",
      x1: "0",
      b: "D",
      c: "U",
      d: "D",
      e: "C",
      x2: "0"
    }
  ),
  {
    positions: {
      a: [0, 5],
      x1: [0, 4],
      '*': [1, 4],
      b: [0, 3],
      c: [0, 2],
      x2: [0, 1],
      d: [0, 0],
      e: [2, 4]
    }
  }
)
)}

function _65($0){return(
$0.value
)}

function _add11(rule,m11,m00c){return(
rule(m11, m00c)
)}

function _67(viewofRule,add11){return(
viewofRule(add11)
)}

function _71(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/b00b44c058264e3404eb4046281dc74fce88396715954456b06140d3affd2a3ef5aebfa9a002e7b6ece7bf4d968ed12ac557cdbacea77915ebe2fe694510a7bc.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/9cc5aea40176c9080156fa73b8fd8da4f0965b7ee0b60e5514883c8818edfa26cd2a30b71786028087c894b4db5bf6dee410dc44e0869f53e1400a633ba7fabf.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/6ad36a5550b4c2c5b8c655b484a09eab5e07ee6383dce72f416c00b09e8a330607c44f450e49fffccc752ad89daaddd0ca869438cb7ae2166c6688f15f52f756.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@4.png", {url: new URL("./files/60efc3a8e84c6fed070c22b1fbbf2aea9097157efe317333485a05ac8928e7986b3d9f83f29d4d64a22fe7989544369024ed8f2c5bfaa223684b96c132c7098b.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof example1")).define("viewof example1", ["viewofGraph","edges"], _example1);
  main.variable(observer("example1")).define("example1", ["Generators", "viewof example1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("edges")).define("edges", _edges);
  main.variable(observer()).define(["example1"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("dotEdges")).define("dotEdges", _dotEdges);
  main.variable(observer("viewofGraph")).define("viewofGraph", ["dot","dotEdges","neato"], _viewofGraph);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md","tex"], _14);
  main.variable(observer()).define(["md","tex"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("hasUniqueLocation")).define("hasUniqueLocation", ["labelPathsLength","labelPaths"], _hasUniqueLocation);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["labelPaths","example1"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("labelPaths")).define("labelPaths", _labelPaths);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("labelPathsLength")).define("labelPathsLength", _labelPathsLength);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("matchLabelPaths")).define("matchLabelPaths", _matchLabelPaths);
  main.variable(observer()).define(["matchLabelPaths","example1"], _27);
  main.variable(observer()).define(["matchLabelPaths","example1"], _28);
  main.variable(observer()).define(["md","tex"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("rule")).define("rule", _rule);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewofRule")).define("viewofRule", ["dot","dotEdges"], _viewofRule);
  main.variable(observer("r1")).define("r1", ["rule","edges"], _r1);
  main.variable(observer()).define(["viewofRule","r1"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["FileAttachment"], _37);
  main.variable(observer("exampleRule")).define("exampleRule", ["rule","edges"], _exampleRule);
  main.variable(observer()).define(["viewofRule","exampleRule"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("match")).define("match", ["matchLabelPaths","labelPaths"], _match);
  main.variable(observer()).define(["match","example1","r1"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("commonVertices")).define("commonVertices", ["_"], _commonVertices);
  main.variable(observer()).define(["commonVertices","exampleRule"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["FileAttachment"], _48);
  main.variable(observer("ruleGraph")).define("ruleGraph", ["edges"], _ruleGraph);
  main.variable(observer()).define(["viewofGraph","ruleGraph"], _50);
  main.variable(observer("vertexDelete")).define("vertexDelete", ["edges"], _vertexDelete);
  main.variable(observer("edgesAdd")).define("edgesAdd", ["edges"], _edgesAdd);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("applyRule")).define("applyRule", ["match","commonVertices","exampleRule","_","vertexDelete","edgesAdd","hasUniqueLocation"], _applyRule);
  main.variable(observer()).define(["example1"], _55);
  main.variable(observer("gatherKeys")).define("gatherKeys", _gatherKeys);
  main.variable(observer()).define(["viewofGraph","applyRule","ruleGraph","exampleRule"], _57);
  main.variable(observer()).define(["md","FileAttachment"], _58);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer()).define(["md","FileAttachment"], _60);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("viewof m11")).define("viewof m11", ["viewofGraph","edges"], _m11);
  main.variable(observer("m11")).define("m11", ["Generators", "viewof m11"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _63);
  main.variable(observer("viewof m00c")).define("viewof m00c", ["viewofGraph","edges"], _m00c);
  main.variable(observer("m00c")).define("m00c", ["Generators", "viewof m00c"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof m00c"], _65);
  main.variable(observer("add11")).define("add11", ["rule","m11","m00c"], _add11);
  main.variable(observer()).define(["viewofRule","add11"], _67);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  const child2 = runtime.module(define2);
  main.import("neato", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _71);
  return main;
}
