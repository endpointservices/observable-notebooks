import define1 from "./0c800138c487d3e1@860.js";
import define2 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# Radial Explosion`
)}

function _2(width,DOM,paper,color,color2)
{
  let height = width / 1.5;
  let canvas = DOM.canvas(width, height);
  let ps = new paper.PaperScope();

  ps.setup(canvas);

  const clear_white = new ps.Color(1, 1, 1, 0);
  const center = new ps.Point(width / 2, height / 2);

  const background = new ps.Path.Rectangle(
    new ps.Rectangle(new ps.Point(0, 0), new ps.Point(width, height))
  );

  background.fillColor = {
    gradient: {
      stops: [
        [color, 0],
        [color2, 1]
      ],
      radial: true
    },
    origin: background.bounds.topLeft,
    destination: background.bounds.bottomRight
  };

  const dot_size = 2;
  const radius = 100;

  for (var i = 0; i < 5000; i++) {
    let angle = Math.random() * Math.PI * 2;
    // To get points clustered near the center with only a few long ones
    // we raise a uniform random by a high power, thus reducing the density near 1
    let length = Math.pow(Math.random(), 5) * width * 0.2;

    let cos_angle = Math.cos(angle);
    let sin_angle = Math.sin(angle);
    let outer_line = new ps.Point(
      center.x + cos_angle * (length + radius - dot_size),
      center.y + sin_angle * (length + radius - dot_size)
    );
    let outer = new ps.Point(
      center.x + cos_angle * (length + radius),
      center.y + sin_angle * (length + radius)
    );
    let inner = new ps.Point(
      center.x + cos_angle * radius,
      center.y + sin_angle * radius
    );

    let line = new ps.Path();
    line.strokeColor = {
      gradient: {
        stops: [
          [clear_white, 0],
          ["white", 1]
        ]
      },
      origin: center,
      destination: outer
    };
    line.strokeWidth = 3;
    line.opacity = 0.2;
    line.add(inner);
    line.add(outer_line);

    let dot = ps.Path.Circle(outer, dot_size);
    dot.fillColor = "white";
    dot.opacity = 0.7;
  }

  return canvas;
  // comment to test backups
}


function _color(colorPicker){return(
colorPicker("#05ECF6")
)}

function _color2(colorPicker){return(
colorPicker("#2185C3")
)}

function _paper(require){return(
require('paper').catch(() => window.paper)
)}

function _8(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["width","DOM","paper","color","color2"], _2);
  main.variable(observer("viewof color")).define("viewof color", ["colorPicker"], _color);
  main.variable(observer("color")).define("color", ["Generators", "viewof color"], (G, _) => G.input(_));
  main.variable(observer("viewof color2")).define("viewof color2", ["colorPicker"], _color2);
  main.variable(observer("color2")).define("color2", ["Generators", "viewof color2"], (G, _) => G.input(_));
  main.variable(observer("paper")).define("paper", ["require"], _paper);
  const child1 = runtime.module(define1);
  main.import("colorPicker", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _8);
  return main;
}
