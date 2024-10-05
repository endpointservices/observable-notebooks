import define1 from "./50309473a164e648@2525.js";
import define2 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Writing a Simple Expression Fuzzer

Deep in the [Linear Programming solver](https://observablehq.com/@tomlarkworthy/mip) is a symbolic rearranger which is a fairly buggy. It at least throws an exception when it goes wrong, so let's try and use fuzzing to find error cases`
)}

function _2(md){return(
md`## Seedable RNG

When fuzzing it's nice to be able to reconstruct the failure case from a seed. So we want a deterministic sampler of an expression given some numeric seed.

From [stack overflow, seeding RNG](https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript)
Thanks [bryc](https://stackoverflow.com/users/815680/bryc)!
`
)}

function _mulberry32(){return(
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
)}

function _4(md){return(
md`## Production Rules

I think generating random expressions from production rules is quite intuitive, and some good rules for simple math can be found 
https://softwareengineering.stackexchange.com/questions/195813/generating-random-math-expression

It's a good start!
~~~
E -> I
E -> M '*' M
E -> E '+' E
M -> I
M -> M '*' M
M -> '(' E '+' E ')'
~~~

Where E is an expression, I is in integer. We might encode this in JSON like:-
`
)}

function _rules(){return(
{
  E: [["I"], ["M", "*", "M"], ["E", "+", "E"]],
  M: [["I"], ["M", "*", "M"], ["(", "E", "+", "E", ")"]],
  I: [["-1"], ["1"], ["0"]]
}
)}

function _6(md){return(
md`## Deterministic Sampler

So starting from a symbol (E) we apply the production rules until we terminate. If we go too deep we just quit. One method for control unbounded propagation is to weight the rules, for simplicity we just include redundant extra versions of the terminal rules.`
)}

function _weightedRules(){return(
{
  E: [/* 2 extra I*/ ["I"], ["I"], ["I"], ["M", "*", "M"], ["E", "+", "E"]],
  M: [
    /* 2 extra I*/ ["I"],
    ["I"],
    ["I"],
    ["M", "*", "M"],
    ["(", "E", "+", "E", ")"]
  ],
  I: [["-2"], ["-1"], ["0"], ["1"], ["2"]]
}
)}

function _sample(){return(
function sample(symbol, rules, rng, maxDepth = 20) {
  if (maxDepth == 0) throw new Error("max depth reached");
  const options = rules[symbol];
  if (!options) return symbol;
  const choice = options[Math.floor(rng() * options.length)];
  return choice.map((child) => sample(child, rules, rng, maxDepth - 1));
}
)}

function _9(sample,weightedRules,mulberry32){return(
sample("I", weightedRules, mulberry32(2))
)}

function _10(sample,weightedRules,mulberry32){return(
sample("E", weightedRules, mulberry32(Math.random() * 10000))
)}

function _11(md){return(
md`## In order traversal

We convert the sampled production tree with an in-order traversal, concatenating the terminals.
`
)}

function _traverse(){return(
function traverse(tree) {
  if (Array.isArray(tree)) return tree.map((child) => traverse(child)).join("");
  else return tree;
}
)}

function* _13(traverse,sample,weightedRules,mulberry32,Promises)
{
  while (true) {
    let s;
    try {
      s = traverse(
        sample("E", weightedRules, mulberry32(Math.random() * 10000))
      );
    } catch (err) {
      s = err.message;
    }
    console.log(s);

    yield Promises.delay(200, s);
  }
}


function _14(md){return(
md`## Let Fuzz!

So we generate a random integer for a seed, generate a expression, then see if our math parser can simplify it. If an exception is thrown, we stop the program and retreive the test case for bug fixing.

For a linear programming problem, we want to avoid multiplying variables with variables (becuase thats a quadratic), so we introduce the concept of a variable carring production rules (suffix N), and prevent them from being multiplied by other variables.
`
)}

function _testRules(){return(
{
  C: [["EN", "OP", "EN"]], // Conditional
  EN: [
    // Variable carrying expression cannot be multipled by other variables, so the expressions remain linear
    ["I"],
    ["V"],
    ["I"],
    ["V"],
    ["MN", "*", "M"],
    ["M", "*", "MN"],
    ["EN", "+", "EN"]
  ],
  E: [["I"], ["I"], ["I"], ["M", "*", "M"], ["E", "+", "E"]],
  MN: [
    ["I"],
    ["V"],
    ["I"],
    ["V"],
    ["M", "*", "M"],
    ["(", "EN", "+", "EN", ")"]
  ],
  M: [["I"], ["I"], ["I"], ["M", "*", "M"], ["(", "E", "+", "E", ")"]],
  V: [["x"], ["y"]],
  I: [["-2"], ["-1"], ["0"], ["1"], ["2"]],
  OP: [["<="], ["=="], [">="]]
}
)}

function _16(Inputs,$0){return(
Inputs.button("fast forward", {
  reduce: () => ($0.value = $0.value + 1)
})
)}

function _seed(){return(
Math.floor(Math.random() * 10000)
)}

function _expression(traverse,sample,testRules,mulberry32,seed,$0)
{
  const expr = traverse(sample("C", testRules, mulberry32(seed), 100));
  if (!expr.includes("x") && !expr.includes("y"))
    $0.value = $0.value + 1;
  return expr;
}


function _result(extract_latest,expression){return(
extract_latest(expression)
)}

function _20(result,$0,seed)
{
  result;
  $0.value = seed + 1;
}


function _23(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("mulberry32")).define("mulberry32", _mulberry32);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("rules")).define("rules", _rules);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("weightedRules")).define("weightedRules", _weightedRules);
  main.variable(observer("sample")).define("sample", _sample);
  main.variable(observer()).define(["sample","weightedRules","mulberry32"], _9);
  main.variable(observer()).define(["sample","weightedRules","mulberry32"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("traverse")).define("traverse", _traverse);
  main.variable(observer()).define(["traverse","sample","weightedRules","mulberry32","Promises"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("testRules")).define("testRules", _testRules);
  main.variable(observer()).define(["Inputs","mutable seed"], _16);
  main.define("initial seed", _seed);
  main.variable(observer("mutable seed")).define("mutable seed", ["Mutable", "initial seed"], (M, _) => new M(_));
  main.variable(observer("seed")).define("seed", ["mutable seed"], _ => _.generator);
  main.variable(observer("expression")).define("expression", ["traverse","sample","testRules","mulberry32","seed","mutable seed"], _expression);
  main.variable(observer("result")).define("result", ["extract_latest","expression"], _result);
  main.variable(observer()).define(["result","mutable seed","seed"], _20);
  const child1 = runtime.module(define1);
  main.import("extract", "extract_latest", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _23);
  return main;
}
