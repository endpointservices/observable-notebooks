function _1(md){return(
md`# [serialize-javascript](https://github.com/yahoo/serialize-javascript)@7.0.2

\`\`\`js
import {deserializeJS, serializeJS} from "@tomlarkworthy/serialize-javascript-7-0-2"

\`\`\``
)}

function _2(deserializeJS,serializeJS){return(
deserializeJS(
  serializeJS({
    str: "string",
    num: 0,
    obj: { foo: "foo" },
    arr: [1, 2, 3],
    bool: true,
    nil: null,
    undef: undefined,
    inf: Infinity,
    date: new Date("Thu, 28 Apr 2016 22:02:17 GMT"),
    map: new Map([["hello", "world"]]),
    set: new Set([123, 456]),
    fn: function echo(arg) {
      return arg;
    },
    re: /([^\s]+)/g,
    big: BigInt(10),
    url: new URL("https://example.com/")
  })
)
)}

function _deserializeJS(){return(
(payload) => eval("(" + payload + ")")
)}

function _serializeJS()
{
  let n = (function () {
      for (
        var n = crypto.getRandomValues(new Uint8Array(16)), e = "", t = 0;
        t < 16;
        ++t
      )
        e += n[t].toString(16);
      return e;
    })(),
    e = new RegExp(
      '(\\\\)?"@__(F|R|D|M|S|A|U|I|B|L)-' + n + '-(\\d+)__@"',
      "g"
    ),
    t = /\{\s*\[native code\]\s*\}/g,
    r = /function.*?\(/,
    i = /.*?=>.*?/,
    u = /[<>\/\u2028\u2029]/g,
    f = /<\/script[^>]*>/gi,
    o = ["*", "async"],
    a = {
      "<": "\\u003C",
      ">": "\\u003E",
      "/": "\\u002F",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
  function s(n) {
    return a[n];
  }
  var c = function a(c, g) {
    g || (g = {}),
      ("number" != typeof g && "string" != typeof g) || (g = { space: g });
    var _,
      l = [],
      p = [],
      h = [],
      y = [],
      S = [],
      d = [],
      v = [],
      O = [],
      w = [],
      R = [];
    function x(n, e) {
      var u = n.toString();
      if (t.test(u))
        throw new TypeError("Serializing native function: " + n.name);
      if (
        (e &&
          !0 !== e.unsafe &&
          (u = (function (n) {
            return (n = (n = n.replace(f, function (n) {
              return n
                .replace(/</g, "\\u003C")
                .replace(/\//g, "\\u002F")
                .replace(/>/g, "\\u003E");
            })).replace(/\u2028/g, "\\u2028")).replace(/\u2029/g, "\\u2029");
          })(u)),
        r.test(u))
      )
        return u;
      if (i.test(u)) return u;
      var a = u.indexOf("("),
        s = u
          .substr(0, a)
          .trim()
          .split(" ")
          .filter(function (n) {
            return n.length > 0;
          });
      return s.filter(function (n) {
        return -1 === o.indexOf(n);
      }).length > 0
        ? (s.indexOf("async") > -1 ? "async " : "") +
            "function" +
            (s.join("").indexOf("*") > -1 ? "*" : "") +
            u.substr(a)
        : u;
    }
    return (
      g.ignoreFunction && "function" == typeof c && (c = void 0),
      void 0 === c
        ? String(c)
        : ((_ =
            g.isJSON && !g.space
              ? JSON.stringify(c)
              : JSON.stringify(
                  c,
                  g.isJSON
                    ? null
                    : function (e, t) {
                        if (
                          (g.ignoreFunction &&
                            (function (n) {
                              var e = [];
                              for (var t in n)
                                "function" == typeof n[t] && e.push(t);
                              for (var r = 0; r < e.length; r++) delete n[e[r]];
                            })(t),
                          !t && void 0 !== t && t !== BigInt(0))
                        )
                          return t;
                        var r = this[e],
                          i = typeof r;
                        if ("object" === i) {
                          if (r instanceof RegExp)
                            return "@__R-" + n + "-" + (p.push(r) - 1) + "__@";
                          if (r instanceof Date)
                            return "@__D-" + n + "-" + (h.push(r) - 1) + "__@";
                          if (r instanceof Map)
                            return "@__M-" + n + "-" + (y.push(r) - 1) + "__@";
                          if (r instanceof Set)
                            return "@__S-" + n + "-" + (S.push(r) - 1) + "__@";
                          if (
                            r instanceof Array &&
                            r.filter(function () {
                              return !0;
                            }).length !== r.length
                          )
                            return "@__A-" + n + "-" + (d.push(r) - 1) + "__@";
                          if (r instanceof URL)
                            return "@__L-" + n + "-" + (R.push(r) - 1) + "__@";
                        }
                        return "function" === i
                          ? "@__F-" + n + "-" + (l.push(r) - 1) + "__@"
                          : "undefined" === i
                          ? "@__U-" + n + "-" + (v.push(r) - 1) + "__@"
                          : "number" !== i || isNaN(r) || isFinite(r)
                          ? "bigint" === i
                            ? "@__B-" + n + "-" + (w.push(r) - 1) + "__@"
                            : t
                          : "@__I-" + n + "-" + (O.push(r) - 1) + "__@";
                      },
                  g.space
                )),
          "string" != typeof _
            ? String(_)
            : (!0 !== g.unsafe && (_ = _.replace(u, s)),
              0 === l.length &&
              0 === p.length &&
              0 === h.length &&
              0 === y.length &&
              0 === S.length &&
              0 === d.length &&
              0 === v.length &&
              0 === O.length &&
              0 === w.length &&
              0 === R.length
                ? _
                : _.replace(e, function (n, e, t, r) {
                    return e
                      ? n
                      : "D" === t
                      ? 'new Date("' + h[r].toISOString() + '")'
                      : "R" === t
                      ? "new RegExp(" +
                        a(p[r].source) +
                        ', "' +
                        p[r].flags +
                        '")'
                      : "M" === t
                      ? "new Map(" + a(Array.from(y[r].entries()), g) + ")"
                      : "S" === t
                      ? "new Set(" + a(Array.from(S[r].values()), g) + ")"
                      : "A" === t
                      ? "Array.prototype.slice.call(" +
                        a(Object.assign({ length: d[r].length }, d[r]), g) +
                        ")"
                      : "U" === t
                      ? "undefined"
                      : "I" === t
                      ? O[r]
                      : "B" === t
                      ? 'BigInt("' + w[r] + '")'
                      : "L" === t
                      ? "new URL(" + a(R[r].toString(), g) + ")"
                      : x(l[r], g);
                  })))
    );
  };
  return c;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["deserializeJS","serializeJS"], _2);
  main.variable(observer("deserializeJS")).define("deserializeJS", _deserializeJS);
  main.variable(observer("serializeJS")).define("serializeJS", _serializeJS);
  return main;
}
