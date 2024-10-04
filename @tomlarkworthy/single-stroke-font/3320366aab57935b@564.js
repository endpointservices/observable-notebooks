import define1 from "./048a17a165be198d@264.js";

function _1(htl){return(
htl.html`<h1 style="display: none;">single stroke font</h1>
<div style="height:100px"">`
)}

function _2(svg,scaleAxisTransform,fontPath,text,scale){return(
svg`<svg width="100%" height=200 viewBox="0 0 1000 100">
  <path stroke="green" stroke-width=3 d="${scaleAxisTransform(fontPath(text), {
    scale: scale
  })}" />
</svg>`
)}

function _fontSource(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "font *",
    width: 600
  }),
  localStorageView("ssf_font", {
    defaultValue:
      "http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf"
  })
)
)}

function _text(Inputs){return(
Inputs.text({ label: "Text", value: "single stroke font" })
)}

function _scale(Inputs){return(
Inputs.range([0, 10], { label: "scale", value: 1.5 })
)}

function _6(md){return(
md`\\* A list of _.ttf_ URLs is [here](https://gist.github.com/karimnaaji/b6c9c9e819204113e9cabf290d580551)`
)}

function _7(htl){return(
htl.html`<div style="height:400px"">`
)}

function _8(md){return(
md`## Open Type (convert .ttf to SVG)`
)}

async function* _num()
{
  let i = 0;
  while (true) {
    i = (i + 1) % 10;
    yield i;
    await new Promise((r) => setTimeout(r, 100));
  }
}


function _opentype(require){return(
require("opentype.js")
)}

function _font(opentype,fontSource){return(
new Promise((r, e) =>
  opentype.load(fontSource.replaceAll("http://", "https://"), (err, font) => {
    if (err) e(err);
    r(font);
  })
)
)}

function _fontPath(font){return(
function fontPath(digit) {
  const path = font.getPath(digit.toString(), 0, 100, 100); // Get the path for the digit
  const svgPath = path.toSVG(); // Convert the path to an SVG path string
  return svgPath.match(/"(.*)"/)[1];
}
)}

function _path(fontPath,num){return(
fontPath(num)
)}

function _shape(svg,fontPath,num){return(
svg`<svg width=100 height=120 viewBox="0 0 100 100"><path fill=green stroke="green" stroke-width=3 d="${fontPath(
  num
)}" >`
)}

function _15(md){return(
md`## flow_mat (Medial/Scale Axis Transform)
### finds the skeleton of a shape`
)}

function _flo_mat(){return(
import("https://unpkg.com/flo-mat@3.0.1/browser/index.min.js")
)}

function _matsToPath(round,flo_mat)
{
  /**
   * Returns an SVG path string of a line.
   * @param ps The line endpoints.
   */
  function getLinePathStr(ps) {
    let [[x0, y0], [x1, y1]] = ps;
    return `M${round(x0)} ${round(y0)} L${round(x1)} ${round(y1)}`;
  }

  /**
   * Returns an SVG path string of a quadratic bezier curve.
   * @param ps The quadratic bezier control points.
   */
  function getQuadBezierPathStr(ps) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return `M${round(x0)} ${round(y0)} Q${round(x1)} ${round(y1)} ${round(
      x2
    )} ${round(y2)}`;
  }

  /**
   * Returns an SVG path string of a cubic bezier curve.
   * @param ps The cubic bezier control points.
   */
  function getCubicBezierPathStr(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return `M${round(x0)} ${round(y0)} C${round(x1)} ${round(y1)} ${round(
      x2
    )} ${round(y2)} ${round(x3)} ${round(y3)}`;
  }

  /**
   * Returns a function that draws an array of MAT curves on an SVG element.
   * @param mats An array of MATs to draw.
   * @param svg The SVG element on which to draw.
   * @param type The type of MAT to draw. This simply affects the class on the
   * path element.
   */
  function drawMats(mats) {
    const paths = [];
    mats.forEach(f);

    /**
     * Draws a MAT curve on an SVG element.
     */
    function f(mat) {
      let cpNode = mat.cpNode;

      if (!cpNode) {
        return;
      }

      let fs = [
        ,
        ,
        getLinePathStr,
        getQuadBezierPathStr,
        getCubicBezierPathStr
      ];

      flo_mat.traverseEdges(cpNode, function (cpNode) {
        if (flo_mat.isTerminating(cpNode)) {
          return;
        }
        let bezier = flo_mat.getCurveToNext(cpNode);
        if (!bezier) {
          return;
        }
        paths.push(fs[bezier.length](bezier));
      });
    }
    return paths.join();
  }

  return drawMats;
}


function _18(svg,scaleAxisTransform,path){return(
svg`<svg width=100 height=100 viewBox="0 0 100 100">
  <path stroke="green" stroke-width=3 d="${scaleAxisTransform(path)}" />
</svg>`
)}

function _scaleAxisTransform(flo_mat,matsToPath){return(
(path, { scale = 1.5 } = {}) => {
  const paths = flo_mat.getPathsFromStr(path);
  const mats = flo_mat.findMats(paths);
  const sats = mats.map((mat) => flo_mat.toScaleAxis(mat, scale));
  return matsToPath(sats);
}
)}

function _DecimalPrecision2(){return(
(function () {
  if (Number.EPSILON === undefined) {
    Number.EPSILON = Math.pow(2, -52);
  }
  if (Math.sign === undefined) {
    Math.sign = function (x) {
      return (x > 0) - (x < 0) || +x;
    };
  }
  return {
    // Decimal round (half away from zero)
    round: function (num, decimalPlaces) {
      var p = Math.pow(10, decimalPlaces || 0);
      var n = num * p * (1 + Number.EPSILON);
      return Math.round(n) / p;
    },
    // Decimal ceil
    ceil: function (num, decimalPlaces) {
      var p = Math.pow(10, decimalPlaces || 0);
      var n = num * p * (1 - Math.sign(num) * Number.EPSILON);
      return Math.ceil(n) / p;
    },
    // Decimal floor
    floor: function (num, decimalPlaces) {
      var p = Math.pow(10, decimalPlaces || 0);
      var n = num * p * (1 + Math.sign(num) * Number.EPSILON);
      return Math.floor(n) / p;
    },
    // Decimal trunc
    trunc: function (num, decimalPlaces) {
      return (num < 0 ? this.ceil : this.floor)(num, decimalPlaces);
    },
    // Format using fixed-point notation
    toFixed: function (num, decimalPlaces) {
      return this.round(num, decimalPlaces).toFixed(decimalPlaces);
    }
  };
})()
)}

function _21(DecimalPrecision2){return(
DecimalPrecision2.trunc(3.321321321, 2)
)}

function _round(DecimalPrecision2){return(
(n) => DecimalPrecision2.trunc(n, 2)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["htl"], _1);
  main.variable(observer()).define(["svg","scaleAxisTransform","fontPath","text","scale"], _2);
  main.variable(observer("viewof fontSource")).define("viewof fontSource", ["Inputs","localStorageView"], _fontSource);
  main.variable(observer("fontSource")).define("fontSource", ["Generators", "viewof fontSource"], (G, _) => G.input(_));
  main.variable(observer("viewof text")).define("viewof text", ["Inputs"], _text);
  main.variable(observer("text")).define("text", ["Generators", "viewof text"], (G, _) => G.input(_));
  main.variable(observer("viewof scale")).define("viewof scale", ["Inputs"], _scale);
  main.variable(observer("scale")).define("scale", ["Generators", "viewof scale"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["htl"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("num")).define("num", _num);
  main.variable(observer("opentype")).define("opentype", ["require"], _opentype);
  main.variable(observer("font")).define("font", ["opentype","fontSource"], _font);
  main.variable(observer("fontPath")).define("fontPath", ["font"], _fontPath);
  main.variable(observer("path")).define("path", ["fontPath","num"], _path);
  main.variable(observer("shape")).define("shape", ["svg","fontPath","num"], _shape);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("flo_mat")).define("flo_mat", _flo_mat);
  main.variable(observer("matsToPath")).define("matsToPath", ["round","flo_mat"], _matsToPath);
  main.variable(observer()).define(["svg","scaleAxisTransform","path"], _18);
  main.variable(observer("scaleAxisTransform")).define("scaleAxisTransform", ["flo_mat","matsToPath"], _scaleAxisTransform);
  main.variable(observer("DecimalPrecision2")).define("DecimalPrecision2", _DecimalPrecision2);
  main.variable(observer()).define(["DecimalPrecision2"], _21);
  main.variable(observer("round")).define("round", ["DecimalPrecision2"], _round);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  return main;
}
