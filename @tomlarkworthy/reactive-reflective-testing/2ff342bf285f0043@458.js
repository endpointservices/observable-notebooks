import define1 from "./f096db8fcbc444bf@563.js";
import define2 from "./e3a019069a130d79@6074.js";

function _1(md){return(
md`# Reactive Reflective Testing in Lopebook`
)}

async function _2(FileAttachment,md){return(
md`Lobebooks are single files web pages you can open directly without a webserver but that offer a fully editable literate programming experience.

Lopecode notebooks don't make a distinction between the application notebook and the development tooling used modify the notebook. Development tooling is implemented as notebooks that interact with a single shared runtime. So a lopebook is inherently a coordinated multi-notebook experience.

![image@1.png](${await FileAttachment("image@1.png").url()})

_All_ notebooks have the same reactive programming model. This open's up a few novel consequences for development, that I think makes reactive development *better* than current tooling. In this post I will explain the impact on unit testing specifically.

1. Reactive test-driven development enables faster development loops by rerunning only the tests impacted by a change.
2. Reflection enables automatic test discovery over the entire runtime.
3. Userspace implementation allows reusing userspace code as material for testing, greatly removing the need to think of test cases.

Put together its like delivering an always-on low latency CI that efficiently runs over all current and future code forever. That's not the only benefit of reactive notebooks bring, but its what we concentrate on here.`
)}

function _3(md){return(
md`## Reactive Unit Testing

Unit tests are used to test a small piece of code for expected behaviour. They are widely used to protect against accidental regression. They should be fast to run and be part of the core development loop. Industry unit testing tools often offer a _watch mode_, which automatically reruns the unit testing suite on an source code change. 

_Watch mode_ has been found to beneficial to development velocity by shortening the time between a coding phase and a verification phase which are core activities during development. Reactive unit testing is like _watch mode_ on steroids!



`
)}

function _4(md){return(
md`### How the reactive runtime works`
)}

function _5(md){return(
md`Before we can explain reactive testing, let us understand how reactivity works in general. A reactive program is broken down into \`cells\`. The cell's source code is scanned for external identifies (see the [toolchain](https://observablehq.com/@tomlarkworthy/observablejs-toolchain)), which are considered dependancies. The inter-cell dependancies form a dependancy graph. The runtime schedules recomputation of individual cells if their values inputs are recomputed, or if their source code is changed. 
`
)}

function _6(md){return(
md`This implies is cells are only run when they need to run. Small changes to the graph cascade only to only those cells are affected. Existing values elsewhere remain unchanged and available. This is similar to hot-code reload, or partial compilation. It is less traumatic than rerunning a tradition program, where the entire program memory is reset. It allows you to change the program on the fly, which simultaneously using the program. It avoids you having to "go back to the beginning" when iterating.`
)}

function _7(md){return(
md`### Faster watch mode`
)}

function _8(md){return(
md`Because of the explicit dependancy graph, time to calculate unit tests is improved. When source code changes, only unit tests impacted in the wake are recomputed. This permits larger test suites for the same computational resources. This is all fully automatic and something the programmer does not need to think about, its a consequence of how a reactive runtime works. `
)}

function _9(md){return(
md`### Examples

In these examples we reactively link the test to an input parameter to test a trigonometric identity. Changing the input recomputes the affected computations only. So only a single test is rerun. Note how only one test flickers as the test parameters change.`
)}

function _10(tex,md){return(
md`${tex`0 = sin(a) - cos(a - 0.5\pi)`} ?`
)}

function _a(Inputs){return(
Inputs.range([-Math.PI * 2, Math.PI * 2], {
  label: "a",
  step: 0.1
})
)}

function _sin_a(a){return(
Math.sin(a)
)}

function _cos_a_minus_half_pi(a){return(
Math.cos(a - 0.5 * Math.PI)
)}

function _test_sin_is_cos(sin_a,cos_a_minus_half_pi)
{
  if (Math.abs(sin_a - cos_a_minus_half_pi) > 0.0001) throw Error();
}


function _15(tex,md){return(
md`${tex`1 = sin^2(b) + cos^2(b)`} ?`
)}

function _b(Inputs){return(
Inputs.range([-Math.PI * 2, Math.PI * 2], {
  label: "b",
  step: 0.1
})
)}

function _sin_sq_b(b){return(
Math.sin(b) * Math.sin(b)
)}

function _cos_sq_b(b){return(
Math.cos(b) * Math.cos(b)
)}

function _test_sin_sq_plus_cos_sq(sin_sq_b,cos_sq_b)
{
  if (Math.abs(1 - sin_sq_b - cos_sq_b) > 0.0001) throw Error();
}


function _20(tests){return(
tests({
  filter: (test) => test.name.includes("_sin_")
})
)}

function _21(md){return(
md`## Reflective Test Discovery`
)}

function _22(md){return(
md`Another benefit of a centralized reactive runtime is notebooks can programatically query for cells, and programatically add, remove and update cells. This essential to support building the internal editor because the editor must, of course, support mutating the source. But runtime reflection and programatic editing is useful for all sorts of development tooling, including testing. `
)}

function _24(md){return(
md`For instance, the [tests](https://observablehq.com/@tomlarkworthy/tester) notebook searches for cells prefixed with \`test_\` and [\`observe\`s](https://observablehq.com/@tomlarkworthy/runtime-sdk#cell-159) them. Observation streams all state changes of a cell to a handler function. For tests we consider the cell to have passed if it does not reject (throw an Error).`
)}

function _25(md){return(
md`This allows the tests notebook to provide a summary of all tests within the notebook network, without any direct coupling.`
)}

function _26(md){return(
md`One detail of the Runtime is that only rendered cells, or their dependancies, are actually run. So the \`tests\` UI shows all tests, but only the subset that are reachable are computed.`
)}

function _27(md){return(
md`Named cells can be uniquely identified by their name and the name of the notebook they reside in (sometimes called a module). The test UI is thus able to provide hyperlinks to the code, enabling fast navigation to the test. In lopecode this will open the enclosing notebook, and thus rendering it, and thus making unreachable cells now reachable.`
)}

function _28(md){return(
md`Programatic runtime access is useful for centralising test suite status. It means tests can be written where they contextually make sense, _i.e._ near the implementation, but with the status reported to a central location which can be easily checked. Its not the only use-case for reflective meta-programming though. We can use self-querying for all kinds of development aids, architecture summaries, linting, LLM context building _etc._. Notebook environments are a unique substrate where both the source code, and the program values are available at the same time and in sync.`
)}

function _29(md){return(
md`## Whole notebook invariant testing`
)}

function _30(md){return(
md`Unit tests usually tests a small piece of code, focusing on a specific feature in a specific configuration. Invariant testing on-the-other hand checks that some property holds over all configurations.

Showing that an invariant holds over an infinite configuration space requires logical reasoning e.g. a math proof. To prove something with a computer requires different computation machinery than mainstream program execution (e.g. a theorem prover). So we often substitute mathmatical rigour for pragmatic implementation and perform invariant testing by checking an invariant holds for lots of different configurations instead of proving that it holds for all.`
)}

function _31(md){return(
md`The problem then becomes what configurations to check. The more configurations you check the slower invariant testing becomes as there are more cases to run. Some existing approaches involve randomized property checking, fuzz checking, AI etc.`
)}

function _32(md){return(
md`For lopecode development tooling we often want to check invariants against code itself. The configuration space is therefore "all possible codable cells". It is quite difficult to generate random code cells that cover the configuration space sufficiently. So instead, we use the notebook runtime itself as the source for representative code cells.`
)}

function _33(md){return(
md`### Example: checking all runtime cells can be decompiled`
)}

function _34(md){return(
md`Lopecode's source representation is \`Observable JS\`, which is almost Javascript but adds additional features like \`viewof\` and the ability to auto-detect inter-cell dependancies. For Lopecode to be compatible with Observable Notebooks it needs to be able to reverse the compilation process and generate Observable source code from the runtime graph expressed in Javascript -- i.e. _decompilation_. So it is important for correct Lopecode operation that every runtime graph can be decompiled back into Observable source`
)}

function _35(test_all_cells_decompilable,md){return(
md`However, coming up with failing decompilation cases is _hard_. Particularly as Observable JS has no spec, and the implementor of Lopecode is not part of the organization that defined Observable JS. Instead of trying to think of all the cases, we leverage runtime reflection to check that all cell in the _current_ notebook are decompilable.

${test_all_cells_decompilable && ""}`
)}

function _37(tests){return(
tests({
  filter: (test) =>
    test.name.includes("observablejs-toolchain#test_all_cells_decompilable") &&
    !test.name.startsWith("#")
})
)}

function _38(md){return(
md`And so we write a single test, that checks for the invariant, that all runtime variables are decompilable, using the runtime graph itself as the source of interesting test cases. As this test is written with a \`test_\` prefix, it is automatically run when the notebook graph changes, and failures are highlighted immediately. By embedding this test in the decompiler source code, that all lopebooks contain, we actually end up running it over all source code that is ever used written in lopecode! `
)}

function _39(md){return(
md`### Results

On turning on the meta-tests I immediately found two bugs

1. \`await\` inside functions failed
2. Property definitions inside ObserverableJS \`class\` did not work due to missing feature in a 3rd party dependancy (\`escodegen\` [bug](https://github.com/estools/escodegen/issues/443) ) 

Bug 2. is a particularly hard bug to spot, as it is in quite a specific part of of the JavaScript language. Both those issues have been converted into dedicated unit tests.`
)}

function _40(md){return(
md`## Choosing the right testing style`
)}

function _41(md){return(
md`Invariant testing is very powerful at finding hard to find bugs, but then its often quite difficult to extract the individual situation that caused the failure. Unit tests are great for asserting specific features and situations work correctly. When a unit tests breaks, its usually obvious which code path is faulty.

Invariant testing has found bugs I was unable to write unit tests for. On discovery of these bugs, I crystallise the knowledge by writing a unit test for them. I think the ideal testing structure is unit tests test every you know about, and invariant tests catch the things you do not know about, and over time everything invariant testing caught becomes dedicated unit tests. `
)}

function _architecture(FileAttachment){return(
FileAttachment("image@1.png")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/1cd0aaa793219d9b4614f3aa5435aa9e190971bd0b7b2b116c8ddfcd70177547a83bd4a3f941c6857aea8d34dbcd2fa41d7d735cebee677dd318b1df0868265d.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["tex","md"], _10);
  main.variable(observer("viewof a")).define("viewof a", ["Inputs"], _a);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("sin_a")).define("sin_a", ["a"], _sin_a);
  main.variable(observer("cos_a_minus_half_pi")).define("cos_a_minus_half_pi", ["a"], _cos_a_minus_half_pi);
  main.variable(observer("test_sin_is_cos")).define("test_sin_is_cos", ["sin_a","cos_a_minus_half_pi"], _test_sin_is_cos);
  main.variable(observer()).define(["tex","md"], _15);
  main.variable(observer("viewof b")).define("viewof b", ["Inputs"], _b);
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer("sin_sq_b")).define("sin_sq_b", ["b"], _sin_sq_b);
  main.variable(observer("cos_sq_b")).define("cos_sq_b", ["b"], _cos_sq_b);
  main.variable(observer("test_sin_sq_plus_cos_sq")).define("test_sin_sq_plus_cos_sq", ["sin_sq_b","cos_sq_b"], _test_sin_sq_plus_cos_sq);
  main.variable(observer()).define(["tests"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  const child1 = runtime.module(define1);
  main.import("tests", child1);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["test_all_cells_decompilable","md"], _35);
  const child2 = runtime.module(define2);
  main.import("test_all_cells_decompilable", child2);
  main.variable(observer()).define(["tests"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("architecture")).define("architecture", ["FileAttachment"], _architecture);
  return main;
}
