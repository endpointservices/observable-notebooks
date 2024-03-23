import define1 from "./c7a3b20cec5d4dd9@669.js";

function _1(md,tex){return(
md`# Canonicalization with Math.js

I want to get expressions like ${tex`(x_2 - x_1) * 4 \gt x_1 + 1`}, into _a) into a specialized canonical form for linear programming:-

${tex`-5 x_1 + 4 x_2 \geq 1`}

in general

${tex`c_1x_1 + ... + c_nx_n \geq c_0`}

Math.js has the power, but does not ship with enough rewrite rules by default. So this notebook is about adding the require rules to create a canonicalization routine.

There is a fuzzer to help stress test these routines https://observablehq.com/@tomlarkworthy/expression-fuzzer
`
)}

function _math(require){return(
require('mathjs@9.4.4')
)}

function _3(md){return(
md`### Simplify Rule Syntax: Custom simplification rules
- ‘n’ - matches any Node
- ‘c’ - matches any ConstantNode
- ‘v’ - matches any Node that is not a ConstantNode
`
)}

function _DEBUG(html){return(
html`<a href="#">`.href.split("?")[0].split("#")[0] ===
  "https://observablehq.com/@tomlarkworthy/glpk-canonicalization"
)}

function _5(md){return(
md`## Preparation: identify operator and replace with <`
)}

function _toLeq(){return(
ast => {
  const op = { op: ast.op, fn: ast.fn };
  ast.op = '<';
  ast.fn = 'smaller';
  return {
    op,
    ast
  };
}
)}

function _fromLeq(){return(
(ast, op) => {
  ast.op = op.op;
  ast.fn = op.fn;
  return ast;
}
)}

function _8(md){return(
md`### Ordering`
)}

function _ordering(){return(
[
  { l: 'c+v', r: 'v+c', context: { add: { commutative: false } } },
  { l: 'v*c', r: 'c*v', context: { multiply: { commutative: false } } }
]
)}

function _10(check,ordering){return(
check(ordering, 'x + 1', 'x + 1')
)}

function _11(check,ordering){return(
check(ordering, '1 + x', 'x + 1')
)}

function _12(md){return(
md`### Expand brackets`
)}

function _expandBrackets(){return(
[
  { l: "0 * n", r: "0" },
  { l: "-(-n)", r: "n" },
  { l: "-(c*n)", r: "-c * n" },
  { l: "-(n1 + n2)", r: "-n1 - n2" },
  { l: "-(n1 - n2)", r: "-n1 + n2" },
  { l: "n - (n1 + n2)", r: "n - n1 - n2" },
  { l: "n - (n1 - n2)", r: "n - n1 + n2" },
  { l: "c * (n1 + n2)", r: "c * n1 + c * n2" },
  { l: "c * (n1 - n2)", r: "c * n1 - c * n2" },
  { l: "-c * (n1 + n2)", r: "-c * n1 - c * n2" },
  { l: "-c * (-n1 - n2)", r: "c * n1 + c * n2" },
  { l: "-c * (n1 - n2)", r: "-c * n1 + c * n2" }
]
)}

function _14(check,expandBrackets){return(
check(expandBrackets, "-6 * (2 - x) < 0", "-6 * 2 + 6 * x < 0")
)}

function _15(check,expandBrackets){return(
check(
  expandBrackets,
  "-2 * (-16 - 4 * x) - 2 * y < 16",
  "2 * 16 + 2 * 4 * x - 2 * y < 16"
)
)}

function _16(check,expandBrackets){return(
check(expandBrackets, "-2 * (x + 1)", "-2 * x - 2 * 1")
)}

function _17(check,expandBrackets){return(
check(expandBrackets, '1 - (x2 - 5) ', '1 - x2 + 5')
)}

function _18(check,expandBrackets){return(
check(expandBrackets, 'x1 - (x2 - 5) ', 'x1 - x2 + 5')
)}

function _19(check,expandBrackets){return(
check(expandBrackets, '4 - (x1 + x2 + 5)', '4 - x1 - x2 - 5')
)}

function _20(check,expandBrackets){return(
check(expandBrackets, '1 - (x2 + 5) ', '1 - x2 - 5')
)}

function _21(check,expandBrackets){return(
check(expandBrackets, '- (x1 + x2)', '-x1 - x2')
)}

function _22(check,expandBrackets){return(
check(expandBrackets, '- (x1 - x2)', '-x1 + x2')
)}

function _23(check,expandBrackets){return(
check(expandBrackets, '-(x + 1)', '-x - 1')
)}

function _24(check,expandBrackets){return(
check(expandBrackets, '-(1 + x)', '-1 - x')
)}

function _25(check,expandBrackets){return(
check(expandBrackets, '-(1 - x)', '-1 + x')
)}

function _26(check,expandBrackets){return(
check(expandBrackets, '-(-1 - x)', '1 + x')
)}

function _27(check,expandBrackets){return(
check(expandBrackets, '-(-1 + x)', '1 - x')
)}

function _28(check,expandBrackets){return(
check(expandBrackets, '-(-1)', '1')
)}

function _29(check,expandBrackets){return(
check(expandBrackets, '-(-x)', 'x')
)}

function _30(check,expandBrackets){return(
check(expandBrackets, '0 * (x + 1)', '0')
)}

function _31(check,expandBrackets){return(
check(expandBrackets, '4 * (x + 1)', '4 * x + 4 * 1')
)}

function _32(check,expandBrackets){return(
check(expandBrackets, '4 * (x - 1)', '4 * x - 4 * 1')
)}

function _33(check,expandBrackets){return(
check(expandBrackets, '-(x1 + x2)', '-x1 - x2')
)}

function _34(md){return(
md`### Multiple out constants`
)}

function _multiplyOut(math){return(
[math.simplify.simplifyCore]
)}

function _36(check,multiplyOut){return(
check(multiplyOut, "2 * 1", "2")
)}

function _37(md){return(
md`### ⚠️ Constants to RHS
`
)}

function _useConstantsToRHSFn(Inputs){return(
Inputs.toggle({
  label: "Use new implementation?",
  value: true
})
)}

function _constantsToRHS(useConstantsToRHSFn,constantsToRHSFn,constantsToRHSOld){return(
useConstantsToRHSFn
  ? [constantsToRHSFn]
  : [...constantsToRHSOld]
)}

function _constantsToRHSOld(){return(
[
  { l: "c1 + n1 < n2", r: "n1 < n2 - c1" },
  { l: "n1 - c1 + n3 < n2", r: "n1 + n3 < n2 + c1" }, // Hmmm, bit complex
  { l: "n1 - c1 - n3 < n2", r: "n1 - n3 < n2 + c1" }, // Hmmm, bit complex
  { l: "n1 + c1 - n3 < n2", r: "n1 - n3 < n2 - c1" }, // Hmmm, bit complex
  { l: "c1 - n1 < n2", r: "- n1 < n2 - c1" },
  { l: "-c1 - n1 + n3 < n2", r: "- n1 + n3 < n2 + c1" }, // Hmm, bit complex
  { l: "-c1 - n1 - n3 < n2", r: "- n1 - n3 < n2 + c1" }, // Hmm, bit complex
  { l: "- c1 - n1 < n2", r: "- n1 < n2 + c1" },
  { l: "- c1 + n1 < n2", r: "n1 < n2 + c1" },
  { l: "n1 - c1 < n2", r: "n1 < n2 + c1" },
  { l: "c < n", r: "-n < -c" },
  { l: "c < 0", r: "0 < -c" },
  { l: "c <-0", r: "0 < -c" },
  { l: "-c < -0", r: "0 < c" },
  { l: "-c <  0", r: "0 < c" }
]
)}

function _constantsToRHSFn(math)
{
  const isOperatorNode = math.isOperatorNode;
  const isConstantNode = math.isConstantNode;
  const isNegativeConstantNode = (node) =>
    isOperatorNode(node) &&
    node.fn == "unaryMinus" &&
    isConstantNode(node.args[0]);
  const isSymbolNode = math.isSymbolNode;
  const isParenthesisNode = math.isParenthesisNode;
  const isZero = math.isZero;
  const OperatorNode = math.OperatorNode;
  const ConstantNode = math.ConstantNode;
  const ParenthesisNode = math.ParenthesisNode;
  const SymbolNode = math.SymbolNode;

  let prunedLHS = (node, pruned) => {
    const pruneNode = (node) =>
      isConstantNode(node) ? node : new ConstantNode(-node.args[0].value);

    if (isConstantNode(node) || isNegativeConstantNode(node)) {
      if (node.value !== 0) {
        pruned.push(pruneNode(node));
      }
      return new ConstantNode(0);
    } else if (isParenthesisNode(node)) {
      return node;
    } else if (isOperatorNode(node) && node.isBinary()) {
      if (node.fn == "add") {
        if (
          isConstantNode(node.args[0]) ||
          isNegativeConstantNode(node.args[0])
        ) {
          pruned.push(pruneNode(node.args[0]));
          return prunedLHS(node.args[1], pruned);
        } else if (
          isConstantNode(node.args[1]) ||
          isNegativeConstantNode(node.args[1])
        ) {
          pruned.push(pruneNode(node.args[1]));
          return prunedLHS(node.args[0], pruned);
        }
        return new OperatorNode(node.op, node.fn, [
          prunedLHS(node.args[0], pruned),
          prunedLHS(node.args[1], pruned)
        ]);
      } else if (node.fn == "subtract") {
        if (
          isConstantNode(node.args[0]) ||
          isNegativeConstantNode(node.args[0])
        ) {
          pruned.push(pruneNode(node.args[0]));
          return new OperatorNode("-", "unaryMinus", [
            prunedLHS(node.args[1], pruned)
          ]);
        } else if (
          isConstantNode(node.args[1]) ||
          isNegativeConstantNode(node.args[1])
        ) {
          pruned.push(new ConstantNode(-pruneNode(node.args[1]).value));
          return prunedLHS(node.args[0], pruned);
        }
        return new OperatorNode(node.op, node.fn, [
          prunedLHS(node.args[0], pruned),
          prunedLHS(node.args[1], pruned)
        ]);
      }

      return node;
    } else if (isOperatorNode(node) && node.isUnary()) {
      return new OperatorNode(node.op, node.fn, [node.args[0]]);
    } else if (isSymbolNode(node)) {
      return node;
    }
    debugger;
    throw new Error(`Should not happen: ${node}`);
  };
  let appendRHS = (node, pruned) => {
    pruned.forEach((term) => {
      if (term.value > 0) {
        node = new OperatorNode("-", "subtract", [node, term]);
      } else {
        node = new OperatorNode("+", "add", [
          node,
          new ConstantNode(-term.value)
        ]);
      }
    });
    return node;
  };

  let splitConditional = (node) => {
    if (isOperatorNode(node) && node.op === "<") {
      const terms = [];
      const a0 = prunedLHS(node.args[0], terms);
      const a1 = appendRHS(node.args[1], terms);
      return new OperatorNode(node.op, node.fn, [a0, a1]);
    } else {
      debugger;
      throw new Error(`Only works with < as top node ${node.fn}`);
    }
  };
  return splitConditional;
}


function _42(check,constantsToRHS){return(
check(constantsToRHS, "1 < 0", "0 < 0 - 1")
)}

function _43(check,constantsToRHS){return(
check(constantsToRHS, "-1 < 0", "0 < 0 + 1")
)}

function _44(check,constantsToRHS){return(
check(
  constantsToRHS,
  "-2 * y - 2 - 2 * x - y < 0",
  "-2 * y - 2 * x - y < 0 + 2"
)
)}

function _45(check,constantsToRHS){return(
check(constantsToRHS, "-2 - x + y < 0", "-x + y < 0 + 2")
)}

function _46(check,constantsToRHS){return(
check(constantsToRHS, "-2 - x - y < 0", "-x - y < 0 + 2")
)}

function _47(check,constantsToRHS){return(
check(constantsToRHS, "-(2 * x) + 2 - y < 0", "-(2 * x) - y < 0 - 2")
)}

function _48(check,constantsToRHS){return(
check(constantsToRHS, "0 < 1", "0 < 1")
)}

function _49(check,constantsToRHS){return(
check(constantsToRHS, "x - 1 +  y < 0", "x + y < 0 + 1")
)}

function _50(check,constantsToRHS){return(
check(constantsToRHS, '4 + x1 < x2', 'x1 < x2 - 4')
)}

function _51(check,constantsToRHS){return(
check(constantsToRHS, '4 - x1 < x2', '-x1 < x2 - 4')
)}

function _52(check,constantsToRHS){return(
check(constantsToRHS, '-4 - x1 < x2', '-x1 < x2 + 4')
)}

function _53(check,constantsToRHS){return(
check(constantsToRHS, '-4 + x1 < x2', 'x1 < x2 + 4')
)}

function _54(check,constantsToRHS){return(
check(constantsToRHS, 'x1 + 4 < x2', 'x1 < x2 - 4')
)}

function _55(check,constantsToRHS){return(
check(constantsToRHS, 'x1 - 4 < x2', 'x1 < x2 + 4')
)}

function _56(check,constantsToRHS){return(
check(constantsToRHS, '-x1 + 4 < x2', '-x1 < x2 - 4')
)}

function _57(check,constantsToRHS){return(
check(constantsToRHS, "5 - x1 < 0", '-x1 < 0 - 5')
)}

function _58(md){return(
md`### Variables to LHS`
)}

function _complexityToLHS(){return(
[
  { l: 'n1 < n2 + v', r: '-v + n1 < n2' },
  { l: 'n1 < n2 - v', r: 'v + n1 < n2' },
  { l: '-n1 < v - n2', r: '-v - n1 < -n2' },
  { l: 'n1 < v - n2', r: '-v + n1 < -n2' }
  //{ l: 'v1 < v2', r: 'v1 - v2 < 0' }
]
)}

function _60(check,complexityToLHS){return(
check(complexityToLHS, 'x < 1 + 1 + 1', '-(1 + 1) + x < 1')
)}

function _61(check,complexityToLHS){return(
check(complexityToLHS, "x1 < x2 - 5", '-x2 + x1 < -5')
)}

function _62(check,complexityToLHS){return(
check(complexityToLHS, '1 < 2 - x', 'x + 1 < 2')
)}

function _63(check,complexityToLHS){return(
check(complexityToLHS, '1 < 2 + x', '-x + 1 < 2')
)}

function _64(check,complexityToLHS){return(
check(complexityToLHS, '1 < -2 + x', '-x + 1 < -2')
)}

function _65(check,complexityToLHS){return(
check(complexityToLHS, '1 < -2 - x', 'x + 1 < -2')
)}

function _66(check,complexityToLHS){return(
check(complexityToLHS, '-1 < -2 - x', 'x + -1 < -2')
)}

function _67(check,complexityToLHS){return(
check(complexityToLHS, '-1 < x - 2', '-x - 1 < -2')
)}

function _68(check,complexityToLHS){return(
check(complexityToLHS, '-1 < -x - 2', '-(-x) - 1 < -2')
)}

function _69(check,complexityToLHS){return(
check(complexityToLHS, '-1 < -x + 2', '-(-x) + -1 < 2')
)}

function _70(check,complexityToLHS){return(
check(complexityToLHS, '-4 * y < 0', '-4 * y < 0')
)}

function _71(md){return(
md`### Add zero to RHS

Its quite dangerous introducing terms as it often causes loop, so we do this once other optimizations are exhausted.
`
)}

function _addZeroToRHS(math){return(
(exp) => {
  exp = typeof exp === "string" ? math.parse(exp) : exp;

  if (
    exp.op === "<" &&
    (exp.args[1].isSymbolNode ||
      (exp.args[1].fn == "unaryMinus" && exp.args[1].args[0].isSymbolNode) ||
      (exp.args[1].op == "*" &&
        exp.args[1].args[0].isConstantNode &&
        exp.args[1].args[1].isSymbolNode) ||
      (exp.args[1].op == "*" &&
        exp.args[1].args[0].fn == "unaryMinus" &&
        exp.args[1].args[0].args[0].isConstantNode &&
        exp.args[1].args[1].isSymbolNode))
  ) {
    const RHS = exp.args[1];
    const LHS = exp.args[0];
    const newRHS = new math.ConstantNode(0);
    const newLHS =
      exp.args[1].fn == "unaryMinus" && exp.args[1].args[0].isSymbolNode
        ? new math.OperatorNode("+", "add", [LHS, RHS.args[0]])
        : new math.OperatorNode("-", "minus", [LHS, RHS]);
    const result = new math.OperatorNode("<", "smaller", [newLHS, newRHS]);
    return math.parse(result.toString()); // There is something we don't get about mutating expression trees
  } else {
    return exp;
  }
}
)}

function _73(math){return(
math.parse("1 + 2 ")
)}

function _74(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, "x < -3 * x", "x - -3 * x < 0")
)}

function _75(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, '0 < -1', "0 < -1")
)}

function _76(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, "x < -x", "x + x < 0")
)}

function _77(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, 'y < 5*y', "y - 5 * y < 0")
)}

function _78(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, 'x < y', 'x - y < 0')
)}

function _79(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, 'x < 3', 'x < 3')
)}

function _80(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, 'x < -3', 'x < -3')
)}

function _81(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, '5 < x1', "5 - x1 < 0")
)}

function _82(checkStep,math,addZeroToRHS,constantsToRHS){return(
checkStep(
  exp => math.simplify(addZeroToRHS(exp), constantsToRHS),
  '5 < x1',
  '-x1 < 0 - 5'
)
)}

function _83(checkStep,addZeroToRHS){return(
checkStep(addZeroToRHS, '-4 * y < 0', '-4 * y < 0')
)}

function _84(md){return(
md`### Simplify Base Rules

The default simplify sometimes works against us by introducing brackets. So we trim the rules down a bit, however it is not enough
`
)}

function _simplify2(math)
{
  const baseRules = [...math.simplify.rules];

  baseRules.splice(
    baseRules.findIndex((r) => r.l === "n1*n3 + n2*n3"),
    1
  );
  /*
  baseRules.splice(
    baseRules.findIndex((r) => r.l === "n1*n2 + n2") + 1,
    0,
    { l: "c1 * (n + c2)", r: "c1 * n + c1 * c2" },
    { l: "-c1 * (n + c2)", r: "-c1 * n - c1 * c2" },
    { l: "- (n1 + n2)", r: "-n1 - n2" }
  );*/

  // Performance issues so we remove some irrelavant ones
  /*
  baseRules.splice(baseRules.findIndex(r => r.l === 'n+n'), 1);
  baseRules.splice(baseRules.findIndex(r => r.l === 'log(e)'), 1);
  baseRules.splice(baseRules.findIndex(r => r.l === 'n-n1'), 1);
  baseRules.splice(baseRules.findIndex(r => r.l === 'n+-n'), 1);
  baseRules.splice(baseRules.findIndex(r => r.l === 'n*n'), 1);
  */
  return [...baseRules];
}


function _86(simplifyStepExample){return(
simplifyStepExample("-2 * y - 4 * y < 0", "-6 * y < 0")
)}

function _87(check,simplify2){return(
check(simplify2, '-x1 - x2 < 5', '-x1 - x2 < 5')
)}

function _88(check,simplify2){return(
check(simplify2, '-4 * y < 0', '-(4 * y) < 0')
)}

function _89(check,simplify2){return(
check(simplify2, '1.1', '1.1')
)}

function _90(check,simplify2){return(
check(simplify2, "x - 1 - 2", "x - 3")
)}

function _91(check,simplify2){return(
check(simplify2, "x - 1 + 1 + y", "x + y")
)}

function _92(md){return(
md`### Simplify Step

Note that < causes problems with zeros, so we have to simplify on each AST branch seperately
`
)}

function _93(check,simplify2){return(
check(simplify2, "- 1 + 1 + y < 0", "y + 0 < 0")
)}

function _simplifyStep(math,expandBrackets,multiplyOut){return(
(exp) => {
  // Simplify gets confused by comparitor, better to run it on each child sperately
  const customSimplify = (exp) =>
    math.simplify(
      math.simplify(exp, math.simplify.rules, {}, { exactFractions: false }),
      [...expandBrackets, ...multiplyOut]
    );

  if (exp.isOperatorNode && exp.op === "<") {
    return exp.map(customSimplify);
  } else {
    return customSimplify(exp);
  }
}
)}

function _95(simplifyStepExample){return(
simplifyStepExample("- 1 + 1 + y < 0", "y < 0")
)}

function _96(simplifyStepExample){return(
simplifyStepExample("-2 * x + -2 < 0", "-2 * x - 2 < 0")
)}

function _97(simplifyStepExample){return(
simplifyStepExample("2 * (x + 2) < 0", "2 * x + 4 < 0")
)}

function _98(simplifyStepExample){return(
simplifyStepExample("2 + 2 * x", "2 * x + 2")
)}

function _99(simplifyStepExample){return(
simplifyStepExample("1 * 2 < 0", "2 < 0")
)}

function _100(md){return(
md`### Step 2

Aim of step 2 is to pull constants to RHS, simplify them, and push complex expression to LHS, and repeat.
`
)}

function _step2(_,math,expandBrackets,constantsToRHS,simplifyStep,complexityToLHS,addZeroToRHS,DEBUG){return(
(exp) => {
  const history = [];
  do {
    history.push(exp);
    const updateRHS = math.simplify(exp, [
      ...expandBrackets,
      ...constantsToRHS
    ]);
    const rhs = simplifyStep(updateRHS);
    const updateLHS = math.simplify(rhs, [...complexityToLHS]);
    exp = addZeroToRHS(updateLHS);
    if (DEBUG) {
      console.log("updateRHS", updateRHS.toString());
      console.log("rhs", rhs.toString());
      console.log("updateLHS", updateLHS.toString());
      console.log("addZeroToRHS", exp.toString());
    }
  } while (history.find((prev) => _.isEqual(exp, prev)) === undefined);

  return math.simplify(exp, [...expandBrackets]);
}
)}

function _equalsIsSlow(math,_)
{
  const n = 20;
  const termsA = Array.from({ length: n })
    .map((_, i) => `x${i}`)
    .join(" + ");

  const termsB = Array.from({ length: n })
    .map((_, i) => `x${i}`)
    .join(" + ");

  const a = math.parse(termsA);
  const b = math.parse(termsB);

  //return a.equals(b) // Very slow, uses home rolled deep equals https://github.com/josdejong/mathjs/blob/c6cbf5538915c8964b70a1af086f47c2c0be33df/src/expression/node/Node.js#L221
  return _.isEqual(a, b); // much faster
}


function _103(step2Example){return(
step2Example(
  "-2*-2*2*(1*2+x+2)+(-2+0)*(y+(0+(-2+-2*0*-1*((-2*2+1)*(0+-1)*-1+2))*(2+0*-2))*-2) < 0*1",
  "8 * x - 2 * y < -16"
)
)}

function _104(step2Example){return(
step2Example("-2 - x + y < 0", "y - x < 2")
)}

function _105(step2Example){return(
step2Example("((-1*2+-2+0)*0*-1+x+-1+1)*1 < (1+-2)*x", "2 * x < 0")
)}

function _106(step2Example){return(
step2Example("-(2 * x) + -2 - y < 0", "-2 * x - y < 2")
)}

function _107(step2Example){return(
step2Example("0*0*x < 1", "0 < 1")
)}

function _108(step2Example){return(
step2Example('4 + x1 + x2 + 1 < x2 + 4', "x1 < -1")
)}

function _109(step2Example){return(
step2Example('4 + x1 + 1 < 4', "x1 < -1")
)}

function _110(step2Example){return(
step2Example('(x + 1) < (3 + x) * (6 - 7)', "2 * x < -4")
)}

function _111(step2Example){return(
step2Example('(x + 1) * 4 < (3 + x) * (6 - 7)', "5 * x < -7")
)}

function _112(step2Example){return(
step2Example('-(x1 + x2) < 0', '-x1 - x2 < 0')
)}

function _113(step2Example){return(
step2Example('x < y', 'x - y < 0')
)}

function _114(step2Example){return(
step2Example('5 < x1', "-x1 < -5")
)}

function _115(step2Example){return(
step2Example('-(4 * y) < 0', "-4 * y < 0")
)}

function _116(step2Example){return(
step2Example("4x < 0", "4 x < 0")
)}

function _117(step2Example){return(
step2Example("x < 1.1", "x < 1.1")
)}

function _118(step2Example){return(
step2Example("x - 1 + 1 + y < 0", "x + y < 0")
)}

function _119(step2Example){return(
step2Example("0 < -2 * x", "2 * x < 0")
)}

function _120(step2Example){return(
step2Example("1 + y < y", "0 < -1")
)}

function _121(step2Example){return(
step2Example("x < -3 * x", "4 * x < 0")
)}

function _122(step2Example){return(
step2Example("x < -1*(0+-1)*(1+0)*(-2+(0+1+1*0*-1)*0)*2*y", "x + 4 * y < 0")
)}

function _123(md){return(
md`### Canonicalize`
)}

function _canonicalize(math,toLeq,isCanonical,step2,fromLeq){return(
exp => {
  const ast = math.parse(exp);
  const leq = toLeq(ast);
  const simplified = isCanonical(leq.ast) ? leq.ast : step2(leq.ast);
  return fromLeq(simplified, leq.op);
}
)}

function _125(canonicalExample){return(
canonicalExample('4 + x1 + 1 < 4', "x1 < -1")
)}

function _126(canonicalExample){return(
canonicalExample('4 > 4 + x1 + 1', "-x1 > 1")
)}

function _127(canonicalExample){return(
canonicalExample('4 + x1 + x2 + 2 < x2 + 4', "x1 < -2")
)}

function _128(canonicalExample){return(
canonicalExample('4 + x1 + x2 + 2 <= x2 + 4', "x1 <= -2")
)}

function _129(canonicalExample){return(
canonicalExample("5 > x1 + x2", "-x1 - x2 > -5")
)}

function _130(canonicalExample){return(
canonicalExample('- -x + y > 5*y + 2x', "-4 * y - x > 0")
)}

function _131(canonicalExample){return(
canonicalExample("-(4 * y) + -(4 * x) > 0", "-4 * y - 4 * x > 0")
)}

function _132(canonicalExample){return(
canonicalExample('x > 1.1', "x > 1.1")
)}

function _133(canonicalExample){return(
canonicalExample("1 == x1 + x2 + x3", "-x3 - x1 - x2 == -1")
)}

function _134(canonicalExample){return(
canonicalExample("x - 1 + 1 + y <= 0", "x + y <= 0")
)}

function _135(canonicalExample){return(
canonicalExample("(-1+1*(2+y+x))*-2 <= y", "-3 * y - 2 * x <= 2")
)}

function _136(tests,canonicalize){return(
tests.test(`scale 10k'`, () => {
  const n = 10000;
  const terms = Array.from({ length: n })
    .map((_, i) => `x${i}`)
    .join(" + ");
  canonicalize(terms + " > 0");
})
)}

function _137(md){return(
md`### isCanonical (special case short circuit)`
)}

function _isCanonical(extractRHS,extractLHS){return(
exp => {
  if (exp.op) {
    try {
      const bounds = extractRHS('<=', exp.args[1]);
      const vars = extractLHS([], exp.args[0]);
    } catch (err) {
      return false;
    }
    return true;
  }

  return false;
}
)}

function _139(tests,expect,isCanonical,math){return(
tests.test("x0 + x1 + x2 > 0 is canonical", () => {
  expect(isCanonical(math.parse("x0 + x1 + x2 < 0"))).toBe(true);
})
)}

function _140(tests,expect,isCanonical,math){return(
tests.test("x0 + x1 - x2 > 0 is canonical", () => {
  expect(isCanonical(math.parse("x0 + x1 - x2 < 0"))).toBe(true);
})
)}

function _141(tests,expect,isCanonical,math){return(
tests.test("x0 + x1 * x2 > 0 is NOT canonical", () => {
  expect(isCanonical(math.parse("x0 + x1 * x2 < 0"))).toBe(false);
})
)}

function _142(tests,expect,isCanonical,math){return(
tests.test("-x < -1 is canonical", () => {
  expect(isCanonical(math.parse("-x < -1"))).toBe(true);
})
)}

function _143(md){return(
md`### Extract

This applies our custom canonicalization and converts to a JSON:

~~~js
vars: [
          { name: 'x1', coef: 3.0 },
          { name: 'x2', coef: 1.0 }
        ],
        ub: 2.0
        lb: 0.0
~~~
`
)}

function _extract(canonicalize,extractRHS,extractLHS){return(
exp => {
  const c = canonicalize(exp);
  if (c.isOperatorNode) {
    const bounds = extractRHS(c.op, c.args[1]);
    const vars = extractLHS([], c.args[0]);

    return {
      vars,
      bounds
    };
  } else {
    throw new Error("cannot deal");
  }
}
)}

function _extractRHS(){return(
(op, rhs) => {
  let value = undefined;
  if (rhs.isConstantNode) {
    value = rhs.value;
  } else if (rhs.fn === "unaryMinus" && rhs.args[0].isConstantNode) {
    value = -rhs.args[0].value;
  } else {
    throw new Error(`Must be constant: ${rhs.toString()}`);
  }
  if (op === "<=") {
    return {
      upper: value
    };
  } else if (op === ">=") {
    return {
      lower: value
    };
  } else if (op === "==") {
    return {
      lower: value,
      upper: value
    };
  } else {
    throw new Error(`Unsupported op ${op}`);
  }
}
)}

function _extractLHS(){return(
function extractLHS(acc, rootLhs) {
  const stack = [];
  stack.push(rootLhs);

  // while not empty
  while (stack.length) {
    // Pop off end of stack.
    let lhs = stack.pop();

    if (
      lhs.isOperatorNode &&
      lhs.op === "-" &&
      lhs.fn === "unaryMinus" &&
      lhs.args[0].isConstantNode &&
      lhs.args[0].value === 0
    ) {
      // neg
    } else if (lhs.isConstantNode && lhs.value === 0) {
      // nothing to do
    } else if (lhs.isOperatorNode && lhs.op === "+") {
      stack.push(lhs.args[0]);
      stack.push(lhs.args[1]);
    } else if (
      lhs.isOperatorNode &&
      lhs.op === "-" &&
      lhs.fn !== "unaryMinus"
    ) {
      stack.push(lhs.args[0]);
      const rhs = extractLHS([], lhs.args[1]);
      if (rhs.length !== 1)
        throw new Error("Unexpected complexity for negated op");
      acc.push({
        coef: -rhs[0].coef,
        name: rhs[0].name
      });
    } else if (lhs.isSymbolNode) {
      acc.push({
        coef: 1,
        name: lhs.name
      });
    } else if (
      lhs.isOperatorNode &&
      lhs.op === "-" &&
      lhs.fn === "unaryMinus" &&
      lhs.args[0].isSymbolNode
    ) {
      acc.push({
        coef: -1,
        name: lhs.args[0].name
      });
    } else if (lhs.isOperatorNode && lhs.op === "*") {
      if (lhs.args[1].isSymbolNode) {
        let value = undefined;
        if (lhs.args[0].isConstantNode) {
          value = lhs.args[0].value;
        } else if (
          lhs.args[0].fn === "unaryMinus" &&
          lhs.args[0].args[0].isConstantNode
        ) {
          value = -lhs.args[0].args[0].value;
        } else {
          throw new Error(`Must be constant: ${lhs.args[0].toString()}`);
        }
        acc.push({
          coef: value,
          name: lhs.args[1].name
        });
      } else {
        throw new Error(`Cannot term from ${lhs.toString()}`);
      }
    } else {
      throw new Error(`Cannot extract coeffecients from ${lhs.toString()}`);
    }
  }

  return acc;
}
)}

function _checkExtract(tests,expect,extract){return(
(expression, expected) => {
  return tests.test(
    `extract('${expression}') === '${JSON.stringify(expected)}'`,
    () => {
      expect(extract(expression)).toEqual(expected);
    }
  );
}
)}

function _148(checkExtract){return(
checkExtract('4x <= 6', {
  vars: [{ coef: 4, name: "x" }],
  bounds: { upper: 6 }
})
)}

function _149(checkExtract){return(
checkExtract("x <= 0", {
  vars: [{ coef: 1, name: "x" }],
  bounds: { upper: 0 }
})
)}

function _150(checkExtract){return(
checkExtract('4x  + 6 (y + 4) 5 >= -6', {
  vars: [{ coef: 30, name: "y" }, { coef: 4, name: "x" }],
  bounds: { lower: -126 }
})
)}

function _151(checkExtract){return(
checkExtract('4x - 2(y) >= 0', {
  bounds: { lower: 0 },
  vars: [{ coef: -2, name: "y" }, { coef: 4, name: "x" }]
})
)}

function _152(checkExtract){return(
checkExtract('x + y == 0', {
  vars: [{ coef: 1, name: "y" }, { coef: 1, name: "x" }],
  bounds: { upper: 0, lower: 0 }
})
)}

function _153(checkExtract){return(
checkExtract('4x - 2(y) -z >= 0', {
  bounds: { lower: 0 },
  vars: [
    { coef: -1, name: "z" },
    { coef: -2, name: "y" },
    { coef: 4, name: "x" }
  ]
})
)}

function _154(checkExtract){return(
checkExtract("0<=-2*x", {
  bounds: { upper: -0 },
  vars: [{ coef: 2, name: "x" }]
})
)}

function _155(checkExtract){return(
checkExtract("0 == 0", {
  vars: [],
  bounds: { upper: 0, lower: 0 }
})
)}

function _156(checkExtract){return(
checkExtract("0*0*x>=1", {
  vars: [],
  bounds: { lower: 1 }
})
)}

function _157(checkExtract){return(
checkExtract("-2<=y+2*x", {
  vars: [
    {
      coef: -2,
      name: "x"
    },
    {
      coef: -1,
      name: "y"
    }
  ],
  bounds: { upper: 2 }
})
)}

function _tests(createSuite){return(
createSuite({
  name: "Canonicalization"
})
)}

function _canonicalExample(tests,expect,canonicalize){return(
(expression, expected) => {
  return tests.test(
    `canonicalize('${expression.substring(30)}') === '${expected.substring(
      30
    )}'`,
    () => {
      expect(canonicalize(expression).toString()).toBe(expected);
    }
  );
}
)}

function _step2Example(tests,expect,step2){return(
(expression, expected) => {
  return tests.test(`step2('${expression}') === '${expected}'`, () => {
    expect(step2(expression).toString()).toBe(expected);
  });
}
)}

function _simplifyStepExample(tests,expect,simplifyStep,math){return(
(expression, expected) => {
  return tests.test(`simplifyStep('${expression}') === '${expected}'`, () => {
    expect(simplifyStep(math.parse(expression)).toString()).toBe(expected);
  });
}
)}

function _162(simplifyStepExample){return(
simplifyStepExample('0*0*x < 1', '0 < 1')
)}

function _check(tests,expect,math){return(
(rules, expression, expected) => {
  return tests.test(`check('${expression}') === '${expected}'`, () => {
    expect(
      math.simplify(expression, rules, {}, { exactFractions: false }).toString()
    ).toBe(expected);
  });
}
)}

function _checkStep(tests,expect,math){return(
(step, expression, expected) => {
  return tests.test(`check('${expression}') === '${expected}'`, () => {
    expect(step(math.parse(expression)).toString()).toBe(expected);
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], _1);
  main.variable(observer("math")).define("math", ["require"], _math);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("DEBUG")).define("DEBUG", ["html"], _DEBUG);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("toLeq")).define("toLeq", _toLeq);
  main.variable(observer("fromLeq")).define("fromLeq", _fromLeq);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("ordering")).define("ordering", _ordering);
  main.variable(observer()).define(["check","ordering"], _10);
  main.variable(observer()).define(["check","ordering"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("expandBrackets")).define("expandBrackets", _expandBrackets);
  main.variable(observer()).define(["check","expandBrackets"], _14);
  main.variable(observer()).define(["check","expandBrackets"], _15);
  main.variable(observer()).define(["check","expandBrackets"], _16);
  main.variable(observer()).define(["check","expandBrackets"], _17);
  main.variable(observer()).define(["check","expandBrackets"], _18);
  main.variable(observer()).define(["check","expandBrackets"], _19);
  main.variable(observer()).define(["check","expandBrackets"], _20);
  main.variable(observer()).define(["check","expandBrackets"], _21);
  main.variable(observer()).define(["check","expandBrackets"], _22);
  main.variable(observer()).define(["check","expandBrackets"], _23);
  main.variable(observer()).define(["check","expandBrackets"], _24);
  main.variable(observer()).define(["check","expandBrackets"], _25);
  main.variable(observer()).define(["check","expandBrackets"], _26);
  main.variable(observer()).define(["check","expandBrackets"], _27);
  main.variable(observer()).define(["check","expandBrackets"], _28);
  main.variable(observer()).define(["check","expandBrackets"], _29);
  main.variable(observer()).define(["check","expandBrackets"], _30);
  main.variable(observer()).define(["check","expandBrackets"], _31);
  main.variable(observer()).define(["check","expandBrackets"], _32);
  main.variable(observer()).define(["check","expandBrackets"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("multiplyOut")).define("multiplyOut", ["math"], _multiplyOut);
  main.variable(observer()).define(["check","multiplyOut"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof useConstantsToRHSFn")).define("viewof useConstantsToRHSFn", ["Inputs"], _useConstantsToRHSFn);
  main.variable(observer("useConstantsToRHSFn")).define("useConstantsToRHSFn", ["Generators", "viewof useConstantsToRHSFn"], (G, _) => G.input(_));
  main.variable(observer("constantsToRHS")).define("constantsToRHS", ["useConstantsToRHSFn","constantsToRHSFn","constantsToRHSOld"], _constantsToRHS);
  main.variable(observer("constantsToRHSOld")).define("constantsToRHSOld", _constantsToRHSOld);
  main.variable(observer("constantsToRHSFn")).define("constantsToRHSFn", ["math"], _constantsToRHSFn);
  main.variable(observer()).define(["check","constantsToRHS"], _42);
  main.variable(observer()).define(["check","constantsToRHS"], _43);
  main.variable(observer()).define(["check","constantsToRHS"], _44);
  main.variable(observer()).define(["check","constantsToRHS"], _45);
  main.variable(observer()).define(["check","constantsToRHS"], _46);
  main.variable(observer()).define(["check","constantsToRHS"], _47);
  main.variable(observer()).define(["check","constantsToRHS"], _48);
  main.variable(observer()).define(["check","constantsToRHS"], _49);
  main.variable(observer()).define(["check","constantsToRHS"], _50);
  main.variable(observer()).define(["check","constantsToRHS"], _51);
  main.variable(observer()).define(["check","constantsToRHS"], _52);
  main.variable(observer()).define(["check","constantsToRHS"], _53);
  main.variable(observer()).define(["check","constantsToRHS"], _54);
  main.variable(observer()).define(["check","constantsToRHS"], _55);
  main.variable(observer()).define(["check","constantsToRHS"], _56);
  main.variable(observer()).define(["check","constantsToRHS"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("complexityToLHS")).define("complexityToLHS", _complexityToLHS);
  main.variable(observer()).define(["check","complexityToLHS"], _60);
  main.variable(observer()).define(["check","complexityToLHS"], _61);
  main.variable(observer()).define(["check","complexityToLHS"], _62);
  main.variable(observer()).define(["check","complexityToLHS"], _63);
  main.variable(observer()).define(["check","complexityToLHS"], _64);
  main.variable(observer()).define(["check","complexityToLHS"], _65);
  main.variable(observer()).define(["check","complexityToLHS"], _66);
  main.variable(observer()).define(["check","complexityToLHS"], _67);
  main.variable(observer()).define(["check","complexityToLHS"], _68);
  main.variable(observer()).define(["check","complexityToLHS"], _69);
  main.variable(observer()).define(["check","complexityToLHS"], _70);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("addZeroToRHS")).define("addZeroToRHS", ["math"], _addZeroToRHS);
  main.variable(observer()).define(["math"], _73);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _74);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _75);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _76);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _77);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _78);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _79);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _80);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _81);
  main.variable(observer()).define(["checkStep","math","addZeroToRHS","constantsToRHS"], _82);
  main.variable(observer()).define(["checkStep","addZeroToRHS"], _83);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("simplify2")).define("simplify2", ["math"], _simplify2);
  main.variable(observer()).define(["simplifyStepExample"], _86);
  main.variable(observer()).define(["check","simplify2"], _87);
  main.variable(observer()).define(["check","simplify2"], _88);
  main.variable(observer()).define(["check","simplify2"], _89);
  main.variable(observer()).define(["check","simplify2"], _90);
  main.variable(observer()).define(["check","simplify2"], _91);
  main.variable(observer()).define(["md"], _92);
  main.variable(observer()).define(["check","simplify2"], _93);
  main.variable(observer("simplifyStep")).define("simplifyStep", ["math","expandBrackets","multiplyOut"], _simplifyStep);
  main.variable(observer()).define(["simplifyStepExample"], _95);
  main.variable(observer()).define(["simplifyStepExample"], _96);
  main.variable(observer()).define(["simplifyStepExample"], _97);
  main.variable(observer()).define(["simplifyStepExample"], _98);
  main.variable(observer()).define(["simplifyStepExample"], _99);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer("step2")).define("step2", ["_","math","expandBrackets","constantsToRHS","simplifyStep","complexityToLHS","addZeroToRHS","DEBUG"], _step2);
  main.variable(observer("equalsIsSlow")).define("equalsIsSlow", ["math","_"], _equalsIsSlow);
  main.variable(observer()).define(["step2Example"], _103);
  main.variable(observer()).define(["step2Example"], _104);
  main.variable(observer()).define(["step2Example"], _105);
  main.variable(observer()).define(["step2Example"], _106);
  main.variable(observer()).define(["step2Example"], _107);
  main.variable(observer()).define(["step2Example"], _108);
  main.variable(observer()).define(["step2Example"], _109);
  main.variable(observer()).define(["step2Example"], _110);
  main.variable(observer()).define(["step2Example"], _111);
  main.variable(observer()).define(["step2Example"], _112);
  main.variable(observer()).define(["step2Example"], _113);
  main.variable(observer()).define(["step2Example"], _114);
  main.variable(observer()).define(["step2Example"], _115);
  main.variable(observer()).define(["step2Example"], _116);
  main.variable(observer()).define(["step2Example"], _117);
  main.variable(observer()).define(["step2Example"], _118);
  main.variable(observer()).define(["step2Example"], _119);
  main.variable(observer()).define(["step2Example"], _120);
  main.variable(observer()).define(["step2Example"], _121);
  main.variable(observer()).define(["step2Example"], _122);
  main.variable(observer()).define(["md"], _123);
  main.variable(observer("canonicalize")).define("canonicalize", ["math","toLeq","isCanonical","step2","fromLeq"], _canonicalize);
  main.variable(observer()).define(["canonicalExample"], _125);
  main.variable(observer()).define(["canonicalExample"], _126);
  main.variable(observer()).define(["canonicalExample"], _127);
  main.variable(observer()).define(["canonicalExample"], _128);
  main.variable(observer()).define(["canonicalExample"], _129);
  main.variable(observer()).define(["canonicalExample"], _130);
  main.variable(observer()).define(["canonicalExample"], _131);
  main.variable(observer()).define(["canonicalExample"], _132);
  main.variable(observer()).define(["canonicalExample"], _133);
  main.variable(observer()).define(["canonicalExample"], _134);
  main.variable(observer()).define(["canonicalExample"], _135);
  main.variable(observer()).define(["tests","canonicalize"], _136);
  main.variable(observer()).define(["md"], _137);
  main.variable(observer("isCanonical")).define("isCanonical", ["extractRHS","extractLHS"], _isCanonical);
  main.variable(observer()).define(["tests","expect","isCanonical","math"], _139);
  main.variable(observer()).define(["tests","expect","isCanonical","math"], _140);
  main.variable(observer()).define(["tests","expect","isCanonical","math"], _141);
  main.variable(observer()).define(["tests","expect","isCanonical","math"], _142);
  main.variable(observer()).define(["md"], _143);
  main.variable(observer("extract")).define("extract", ["canonicalize","extractRHS","extractLHS"], _extract);
  main.variable(observer("extractRHS")).define("extractRHS", _extractRHS);
  main.variable(observer("extractLHS")).define("extractLHS", _extractLHS);
  main.variable(observer("checkExtract")).define("checkExtract", ["tests","expect","extract"], _checkExtract);
  main.variable(observer()).define(["checkExtract"], _148);
  main.variable(observer()).define(["checkExtract"], _149);
  main.variable(observer()).define(["checkExtract"], _150);
  main.variable(observer()).define(["checkExtract"], _151);
  main.variable(observer()).define(["checkExtract"], _152);
  main.variable(observer()).define(["checkExtract"], _153);
  main.variable(observer()).define(["checkExtract"], _154);
  main.variable(observer()).define(["checkExtract"], _155);
  main.variable(observer()).define(["checkExtract"], _156);
  main.variable(observer()).define(["checkExtract"], _157);
  main.variable(observer("viewof tests")).define("viewof tests", ["createSuite"], _tests);
  main.variable(observer("tests")).define("tests", ["Generators", "viewof tests"], (G, _) => G.input(_));
  main.variable(observer("canonicalExample")).define("canonicalExample", ["tests","expect","canonicalize"], _canonicalExample);
  main.variable(observer("step2Example")).define("step2Example", ["tests","expect","step2"], _step2Example);
  main.variable(observer("simplifyStepExample")).define("simplifyStepExample", ["tests","expect","simplifyStep","math"], _simplifyStepExample);
  main.variable(observer()).define(["simplifyStepExample"], _162);
  main.variable(observer("check")).define("check", ["tests","expect","math"], _check);
  main.variable(observer("checkStep")).define("checkStep", ["tests","expect","math"], _checkStep);
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  return main;
}
