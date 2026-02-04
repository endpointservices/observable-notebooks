import define1 from "./10c7899865f8a76e@8998.js";
import define2 from "./f109935193c0deba@4551.js";
import define3 from "./98f34e974bb2e4bc@958.js";
import define4 from "./e3a019069a130d79@6817.js";
import define5 from "./c132b2d38b182e49@40.js";

function _1(md){return(
md`# \`memo\`

memo wraps a function and deduplicates repeated computation. It can only be used as a top level function call.

It works by rewriting itself own source code call to include its prior result, so that it can detect duplicates. Because the cache is implemented at the source level level, the cache survives export. Uses [serialize-javascript](https://github.com/yahoo/serialize-javascript) under-the-hood so the arguments and results need to be compatible for it to work correctly.`
)}

function _result(memo)
{
  return memo((a, b) => {
    return a + b;
  })(3, 9);
}


function _3(result){return(
result
)}

function _4(exporter){return(
exporter()
)}

function _memo(memoDeepEqual,memoToJSLiteral,runtime,decompile,memoPatchSourceWithPrior,compile){return(
(fn, prior) => {
  const markerKey = Symbol.for("observablehq.memo.marker");

  return async (...argsArr) => {
    if (prior && memoDeepEqual(prior.args, argsArr)) return prior.result;

    const result = await fn(...argsArr);

    const priorLiteral = memoToJSLiteral({ args: argsArr, result });
    const priorExprSource = `(${priorLiteral})`;

    const id = Math.random().toString(36).slice(2);

    const mark = (v) => {
      if (v && (typeof v === "object" || typeof v === "function")) {
        try {
          Object.defineProperty(v, markerKey, {
            value: id,
            configurable: true
          });
          return v;
        } catch {}
      }

      const box = Object(v);
      try {
        Object.defineProperty(box, markerKey, {
          value: id,
          configurable: true
        });
      } catch {
        box[markerKey] = id;
      }

      if (!v || typeof v !== "object") {
        try {
          Object.defineProperty(box, Symbol.toPrimitive, {
            value: (hint) => (hint === "string" ? String(v) : v)
          });
        } catch {}

        try {
          Object.defineProperty(box, "valueOf", { value: () => v });
        } catch {}
      }

      return box;
    };

    const markedResult = mark(result);

    setTimeout(async () => {
      const self = [...runtime._variables].find((v) => {
        const val = v?._value;
        return (
          val &&
          (typeof val === "object" || typeof val === "function") &&
          val[markerKey] === id
        );
      });

      if (!self) return;

      const source = await decompile([self]);
      const updatedSource = memoPatchSourceWithPrior(source, priorExprSource);
      const compiled = compile(updatedSource);

      if (!compiled || !compiled.length)
        throw new Error("memo: compile produced no variables");

      const spec = compiled.find((d) => d._name === self._name) ?? compiled[0];

      let _fn;
      eval("_fn = " + spec._definition.toString());

      self._inputs = spec._inputs.map((n) => self._module._resolve(n));
      self.define(self._name, spec._inputs, _fn);
    }, 0);

    return markedResult;
  };
}
)}

function _memoDeepEqual(){return(
function memoDeepEqual(a, b) {
  if (Object.is(a, b)) return true;

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a instanceof Date && b instanceof Date)
      return Object.is(a.getTime(), b.getTime());
    if (a instanceof RegExp && b instanceof RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a instanceof URL && b instanceof URL) return a.href === b.href;

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [k, v] of a) {
        if (!b.has(k)) return false;
        if (!memoDeepEqual(v, b.get(k))) return false;
      }
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (const v of a) if (!b.has(v)) return false;
      return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++)
        if (!memoDeepEqual(a[i], b[i])) return false;
      return true;
    }
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    const aProto = Object.getPrototypeOf(a);
    const bProto = Object.getPrototypeOf(b);
    if (aProto !== bProto) return false;

    if (aProto !== Object.prototype && aProto !== null) return false;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    aKeys.sort();
    bKeys.sort();
    for (let i = 0; i < aKeys.length; i++)
      if (aKeys[i] !== bKeys[i]) return false;

    for (const k of aKeys) if (!memoDeepEqual(a[k], b[k])) return false;

    return true;
  }

  return false;
}
)}

function _memoToJSLiteral(serializeJS){return(
(value, options) => serializeJS(value, options)
)}

function _memoPatchSourceWithPrior(acorn,acorn_walk){return(
(source, priorExprSource) => {
  const ast = acorn.parse(source, {
    ecmaVersion: "latest",
    sourceType: "module"
  });

  let memoCall = null;

  acorn_walk.ancestor(ast, {
    CallExpression(node, ancestors) {
      if (memoCall) return;
      if (node.callee?.type !== "Identifier" || node.callee.name !== "memo")
        return;

      const program = ancestors[0];
      if (!program || program.type !== "Program") return;

      const topStatement = ancestors[1];
      if (!topStatement) return;

      const isTopLevelStatement =
        topStatement.type === "VariableDeclaration" ||
        topStatement.type === "ExpressionStatement";

      if (!isTopLevelStatement) return;

      memoCall = node;
    }
  });

  if (!memoCall) {
    throw new Error(
      "memo: could not find a top-level memo(...) call in the cell source"
    );
  }

  const args = memoCall.arguments || [];
  if (args.length < 1) throw new Error("memo: expected memo(fn, prior?)");

  if (args.length >= 2) {
    const start = args[1].start;
    const end = args[1].end;
    return source.slice(0, start) + priorExprSource + source.slice(end);
  } else {
    const insertAt = args[0].end;
    return (
      source.slice(0, insertAt) +
      ", " +
      priorExprSource +
      source.slice(insertAt)
    );
  }
}
)}

function _13(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("result")).define("result", ["memo"], _result);
  main.variable(observer()).define(["result"], _3);
  main.variable(observer()).define(["exporter"], _4);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer("memo")).define("memo", ["memoDeepEqual","memoToJSLiteral","runtime","decompile","memoPatchSourceWithPrior","compile"], _memo);
  const child2 = runtime.module(define2);
  main.import("robocoop", child2);
  const child3 = runtime.module(define3);
  main.import("runtime", child3);
  const child4 = runtime.module(define4);
  main.import("decompile", child4);
  main.import("compile", child4);
  main.import("acorn_walk", child4);
  main.import("acorn", child4);
  main.variable(observer("memoDeepEqual")).define("memoDeepEqual", _memoDeepEqual);
  main.variable(observer("memoToJSLiteral")).define("memoToJSLiteral", ["serializeJS"], _memoToJSLiteral);
  main.variable(observer("memoPatchSourceWithPrior")).define("memoPatchSourceWithPrior", ["acorn","acorn_walk"], _memoPatchSourceWithPrior);
  main.variable(observer()).define(["robocoop"], _13);
  const child5 = runtime.module(define5);
  main.import("deserializeJS", child5);
  main.import("serializeJS", child5);
  return main;
}
