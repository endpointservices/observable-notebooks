function _1(md){return(
md`# Direct Manipulation Plot


In a [Future of Coding conversation](https://akkartik.name/archives/foc/linking-together/1721317807.883659.html) provoked by the blog [Where Should Visual Programming Go?](https://tonsky.me/blog/diagrams/) I argued that great visualization tools like \`Plot\` were the Future of Coding. However, some disagreed becuase it is _"only"_ a data -> viz transformation, and *true* Future of Code tools would support direct manipulation for the inverse. That made we wonder if it is possible to "invert" visual tools to generate direct manipulation tools in a methodical way?
`
)}

function _2(md){return(
md`~~~js
import {manipulate, invert} from '@tomlarkworthy/manipulate'
~~~`
)}

function _3(md){return(
md`## Plot is extremely flexible

You might not appreciate how flexible plot is at illustrating technical and spatial concepts. What the optimal angle to throw a ball to make it travel furthest? `
)}

function _x_trajectory(Inputs){return(
Inputs.input([{ j: 40, i: 20 }])
)}

function _plot_trajectory(Plot,x_trajectory,arc,max_arc,d3){return(
Plot.plot({
  aspectRatio: 1,
  x: {
    domain: [0, 300]
  },
  y: {
    domain: [0, 150]
  },
  marks: [
    Plot.dot(
      x_trajectory,
      Plot.pointer({
        x: "i",
        y: "j",
        fill: "red",
        r: 20,
        maxRadius: 100
      })
    ),
    Plot.dot(x_trajectory, { x: "i", y: "j", value: true, r: 20 }),
    Plot.line(arc, {
      strokeDasharray: [1, 20]
    }),
    Plot.link([max_arc], {
      x1: max_arc[0],
      y1: (d) => 40,
      x2: (d) => max_arc[0],
      y2: (d) => 0,
      stroke: "red"
    }),
    Plot.link([max_arc], {
      x1: 0,
      y1: (d) => d[1],
      x2: (d) => d[0] / 2,
      y2: (d) => d[1],
      stroke: "blue"
    }),
    Plot.text(x_trajectory, {
      x: 5,
      y: max_arc[1],
      text: (d) => `${max_arc[1].toFixed(1)}`,
      textAnchor: "start",
      fontSize: 12,
      fill: "blue",
      dy: -10
    }),

    Plot.text(x_trajectory, {
      x: d3.max(arc, (d) => d[0]),
      y: 5,
      text: (d) => `${max_arc[0].toFixed(1)}`,
      textAnchor: "end",
      fontSize: 12,
      fill: "red",
      dy: -10
    }),
    Plot.text(x_trajectory, {
      x: 20,
      y: 5,
      text: (d) => `${((Math.atan(d.j / d.i) * 180) / Math.PI).toFixed(0)}°`,
      textAnchor: "start",
      fontSize: 24
    }),
    Plot.arrow([{}], {
      x1: 0,
      y1: 0,
      x2: arc.at(-1)[0],
      y2: 0
    }),
    Plot.arrow(x_trajectory, {
      x1: 0,
      y1: 0,
      x2: "i",
      y2: "j",
      stroke: "green"
    })
  ]
})
)}

function _trajectory_manipulate(manipulate,$0,$1,invalidation,invert){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    // Adjust control surface
    const scaleX = viewofPlot.scale("x");
    const scaleY = viewofPlot.scale("y");
    dataCurrent.i = Math.max(
      invert(
        scaleX,
        scaleX.apply(dataStart.i) + pixelCurrent[0] - pixelStart[0]
      ),
      0.1
    );
    dataCurrent.j = Math.max(
      invert(
        scaleY,
        scaleY.apply(dataStart.j) + pixelCurrent[1] - pixelStart[1]
      ),
      0.1
    );

    // fix velocity
    const magnitude = Math.sqrt(
      dataCurrent.i * dataCurrent.i + dataCurrent.j * dataCurrent.j
    );
    if (magnitude > 50) {
      const scale = 50 / magnitude;
      dataCurrent.i *= scale;
      dataCurrent.j *= scale;
    }
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _arc(x_trajectory)
{
  const g = 9.81; // acceleration due to gravity in m/s^2

  // Initial velocity components
  const v = Math.sqrt(
    Math.pow(x_trajectory[0].i, 2) + Math.pow(x_trajectory[0].j, 2)
  );
  const thetaRad = Math.atan2(x_trajectory[0].j, x_trajectory[0].i);

  const points = [];

  // Function to calculate y for a given x using the parabolic motion formula
  function getY(x) {
    return (
      x * Math.tan(thetaRad) -
      (g * x * x) / (2 * v * v * Math.pow(Math.cos(thetaRad), 2))
    );
  }

  // Calculate the range of the projectile
  const range = (v * v * Math.sin(2 * thetaRad)) / g;
  const step = range / 200; // dividing the range into 100 steps

  // Generate points for the arc
  for (let x = 0; x <= range; x += step) {
    const y = getY(x);
    points.push([x, y]);
  }

  return points;
}


function _max_arc(d3,arc){return(
[d3.max(arc, (d) => d[0]), d3.max(arc, (d) => d[1])]
)}

function _9(md){return(
md`# Theory
`
)}

function _10(tex,md){return(
md`## Inverting scales

Given a dataset, ${tex`X`}, each Plot creates scales, ${tex`S`}, that map data space to pixel space, ${tex`P`}:

<div style="margin-left: 100px; margin-bottom: 15px"> ${tex`XS = P`} </div>
When we click the mouse, ${tex`m`}, at time ${tex`t`}, we indicate a position in pixel space, ${tex`u`}:

<div style="margin-left: 100px; margin-bottom: 15px"> ${tex`u \in P \times P := m_t`} </div>
When we drag the mouse, ${tex`m`}, on the screen, we express a vector action, ${tex`\bar{u}`}, in pixel space. This vector is the difference between the starting and ending positions:

<div style="margin-left: 100px"> ${tex`\bar{u} \in P \times P := m_t - u`} </div>
To invert the mapping:

<div style="margin-left: 100px; margin-bottom: 15px"> ${tex`(X + x)S = P + \bar{u}`} </div>
If ${tex`S`} is linear, inversion is straightforward. However, for general cases, we minimize the following objective:

<div style="margin-left: 100px; margin-bottom: 15px"> ${tex`\min_x \| (X + x)S - (P + \bar{u}) \|^2`} </div>
This ensures we find ${tex`x`} such that the adjusted dataset maps to the perturbed pixel space, accounting for the drag action. The minimisation approach generalizes to ordinal and categorical variables.`
)}

function _invert(){return(
(scale, point) => {
  if (scale.type === "linear") {
    // easy case
    return scale.invert(point);
  } else if (scale.type === "point") {
    // nearest neighbour search
    let nearestSq = Number.MAX_VALUE;
    let nearest = undefined;
    for (let i = 0; i < scale.domain.length; i++) {
      const candidate = scale.apply(scale.domain[i]);
      const distSq = (point - candidate) * (point - candidate);
      if (distSq < nearestSq) {
        nearestSq = distSq;
        nearest = scale.domain[i];
      }
    }
    return nearest;
  } else {
    throw new Error(`Can't invert '${scale.type}'`);
  }
}
)}

function _12(Generators,invalidation,interactions){return(
Generators.observe((notify) => {
  invalidation.then(
    interactions(({ event, pixelStart, pixelCurrent }) => {
      notify({ event, pixelStart, pixelCurrent });
    })
  );
})
)}

function _13(md){return(
md`## Manipulate

Manipulate is the userspace function to update the data from manipulations of the [Plot pointer](https://observablehq.com/plot/interactions/pointer). There is quite a lot of state tracking going on, so it is vitally important the result of manipulate is returned from the enclosing cell, so that next tick, \`this\` is initialised to the previous result.

~~~js
manipulate({
  this: this,     // important! It juggles the 
  viewofData: viewof x_trajectory,    // the data the pointer is drawn from
  viewofPlot: viewof plot_trajectory, // a plot that contains a pointer
  invalidation,
  onInteraction: ({
    event,        // triggering DOM event, event.preventDefault() to stop scrolling
    pixelStart,   // start pointer position in pixel space
    pixelCurrent, // current pointer position in pixel space
    dataStart,    // shallow copy of selected data when drag began
    dataCurrent,  // live reference to selected data
    viewofPlot    // reference to viewofPlot
  }) => {
    // your custom code here
    // typically you will read the scale from viewofPlot
    // convert the delta in pixel space to a delta in data space using invert
    // then set dataCurrent to be dataStart + delta data space
    // but you can also apply any domain constraints programatically
    // or change a different dataset, or do nothing.
    // its a good ideal to call event.preventDefault() if you have served an interaction
    // as this prevents scrolling on mobile.
  }
);
~~~`
)}

function _manipulate(interactions,Event){return(
function manipulate({
  this: state,
  viewofData,
  viewofPlot, // or anything that can select
  invalidation,
  onInteraction = undefined
}) {
  state = state || {};
  if (onInteraction) {
    if (state.interactor) state.interactor();
    state.interactor = interactions((interaction) => {
      if (!interaction.pixelCurrent) {
        state.dataCurrent = undefined;
        state.dataStart = undefined;
      } else if (!state.dataCurrent) {
        state.dataCurrent = viewofData.value.find((x) => x == viewofPlot.value);
        state.dataStart = { ...state.dataCurrent };
      }

      if (state.dataCurrent) {
        onInteraction({
          ...interaction,
          ...state,
          dataStart: state.dataStart,
          dataCurrent: state.dataCurrent,
          viewofPlot,
          viewofData
        });
        viewofData.dispatchEvent(new Event("input"));
      }
    });
  }
  return state;
}
)}

function _15(md){return(
md`## Interaction

We listen to DOM events and pipe the pixel change *synchronously* to a callback. We include the triggering events, so that downstream listeners can conditionally cancel the DOM event to prevent unwanted scrolling on mobile.`
)}

function _interactions(MouseEvent,invalidation)
{
  const listeners = new Set();

  const register = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };
  const notify = (event) => {
    listeners.forEach((callback) => {
      try {
        callback(event);
      } catch (err) {
        console.error(err);
      }
    });
  };
  const position = (evt) =>
    evt.clientX
      ? [evt.clientX, evt.clientY]
      : [evt.touches[0].clientX, evt.touches[0].clientY];
  let start = undefined;
  let current = undefined;

  const emit = (event) => {
    if (start && current)
      notify({
        event,
        pixelCurrent: current,
        pixelStart: start
      });
    else {
      notify({
        event,
        pixelCurrent: undefined,
        pixelStart: undefined
      });
    }
    //event.preventDefault();
  };

  function pointerdown(evt) {
    start = current = position(evt);
    evt.target.addEventListener("touchmove", move, { passive: false });
    evt.target.addEventListener("touchend", pointerup);
    emit(evt);
  }
  function pointerup(evt) {
    start = current = undefined;
    evt.target.removeEventListener("touchmove", move, { passive: false });
    evt.target.removeEventListener("touchend", pointerup);
    emit(evt);
  }
  function move(evt) {
    if (evt instanceof MouseEvent) {
      const flags = evt.buttons !== undefined ? evt.buttons : evt.which;
      const primaryMouseButtonDown = (flags & 1) === 1;
      if (primaryMouseButtonDown) current = position(evt);
      else start = current = undefined;
    } else {
      // touch
      current = position(evt);
    }
    emit(evt);
  }
  //overlay.addEventListener("pointerdown", pointerdown); swallowed by plot
  document.addEventListener("mousedown", pointerdown);
  document.addEventListener("touchstart", pointerdown, { passive: false });
  document.addEventListener("pointerup", pointerup);
  document.addEventListener("pointermove", move, { passive: false });
  document.addEventListener("touchend", pointerup);

  invalidation.then(() => {
    //overlay.removeEventListener("pointerdown", pointerdown);
    document.removeEventListener("mousedown", pointerdown);
    document.removeEventListener("touchstart", pointerdown, { passive: false });
    document.removeEventListener("pointerup", pointerup);
    document.removeEventListener("pointermove", move, { passive: false });
    document.removeEventListener("touchmove", move, { passive: false });
    document.removeEventListener("touchend", pointerup);
  });
  return register;
}


function _17(md){return(
md`# MORE EXAMPLES`
)}

function _18(md){return(
md`## Continuous Linear case `
)}

function _x_simple(Inputs){return(
Inputs.input([
  { x: 0.1, y: 0.1 },
  { x: 0.9, y: 0.1 },
  { x: 0.1, y: 0.9 },
  { x: 0.5, y: 0.5 }
])
)}

function _20(manipulate,$0,$1,invalidation,invert){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    const scaleX = viewofPlot.scale("x");
    const scaleY = viewofPlot.scale("y");
    dataCurrent.x = invert(
      scaleX,
      scaleX.apply(dataStart.x) + pixelCurrent[0] - pixelStart[0]
    );
    dataCurrent.y = invert(
      scaleY,
      scaleY.apply(dataStart.y) + pixelCurrent[1] - pixelStart[1]
    );
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _plot_simple(Plot,x_simple){return(
Plot.plot({
  marks: [
    Plot.density(x_simple, {
      x: "x",
      y: "y",
      stroke: "blue",
      fill: "#fefeff",
      thresholds: 5,
      bandwidth: 70,
      strokeWidth: 0.25
    }),
    Plot.dot(x_simple, { x: "x", y: "y", value: true, r: 20 }),
    Plot.dot(
      x_simple,
      Plot.pointer({
        x: "x",
        y: "y",
        fill: "red",
        r: 20,
        maxRadius: Infinity
      })
    )
  ]
})
)}

function _22(md){return(
md`todo: its pretty trivial to add points with a click, and remove the last selected point with a key press`
)}

function _23(md){return(
md`## Ordinal/Categorical Data

Not all data domains are continuous`
)}

function _x_ordcat(Inputs){return(
Inputs.input([
  { ordinal: "small", categorical: "a" },
  { ordinal: "medium", categorical: "b" },
  { ordinal: "large", categorical: "c" }
])
)}

function _25(manipulate,$0,$1,invalidation,invert){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    const scaleX = viewofPlot.scale("x");
    const scaleY = viewofPlot.scale("y");
    dataCurrent.ordinal = invert(
      scaleX,
      scaleX.apply(dataStart.ordinal) + pixelCurrent[0] - pixelStart[0]
    );
    dataCurrent.categorical = invert(
      scaleY,
      scaleY.apply(dataStart.categorical) + pixelCurrent[1] - pixelStart[1]
    );
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _26(md){return(
md`non-linear scales aren't directly invertible, so we do nearest neighbour instead. You achieve a nice snapping effect.`
)}

function _plot_ordcat(Plot,x_ordcat){return(
Plot.plot({
  x: {
    type: "point",
    domain: ["small", "medium", "large"],
    grid: true
  },
  y: {
    type: "point",
    domain: ["a", "b", "c"],
    grid: true
  },
  marks: [
    Plot.dot(x_ordcat, {
      x: "ordinal",
      y: "categorical",
      value: true,
      r: 10
    }),
    Plot.dot(
      x_ordcat,
      Plot.pointer({
        x: "ordinal",
        y: "categorical",
        fill: "red",
        r: 10,
        maxRadius: Infinity
      })
    )
  ]
})
)}

function _28(md){return(
md`## Clamping

\`Plot\` provides a ton of flexibility when going from data space to visualisation. These features carry over to derived manipulations`
)}

function _x_sliders(Inputs){return(
Inputs.input([
  { value: 0 },
  { value: 1 },
  { value: 0.5 },
  { value: -0.1 },
  { value: -0.1 }
])
)}

function _30(manipulate,$0,$1,invalidation,invert){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    const y_scale = viewofPlot.scale("y");
    dataCurrent.value = invert(
      y_scale,
      y_scale.apply(dataStart.value) + pixelCurrent[1] - pixelStart[1]
    );
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _plot_sliders(Plot,x_sliders){return(
Plot.plot({
  height: 200,
  y: {
    type: "linear",
    domain: [-1, 1],
    clamp: true,
    grid: true
  },
  x: {
    domain: [-0.5, 4.5],
    axis: null
  }, // hide axis
  marks: [
    Plot.ruleX(x_sliders, {
      x: (d, i) => i,
      strokeWidth: 2,
      strokeLinecap: "round",
      stroke: "#aaa"
    }),
    Plot.dot(x_sliders, {
      symbol: "square2",
      r: 25,
      x: (d, i) => i,
      y: "value",
      stroke: "black",
      fill: "#eee"
    }),
    Plot.text(x_sliders, {
      x: (d, i) => i,
      y: "value",
      text: "value"
    }),
    Plot.dot(
      x_sliders,
      Plot.pointer({
        x: (d, i) => i,
        y: "value",
        symbol: "square2",
        stroke: "red",
        r: 25,
        maxRadius: Infinity
      })
    )
  ]
})
)}

function _32(md){return(
md`## References

Some types of data points need to reference to others, think arrows or edges on graphs.`
)}

function _x_nodes(Inputs){return(
Inputs.input([
  {
    id: "node1",
    x: 0,
    y: 1
  },
  {
    id: "node2",
    x: 1,
    y: 0
  },
  {
    id: "node3",
    x: 0,
    y: 0.2
  }
])
)}

function _x_edges(Inputs){return(
Inputs.input([
  {
    start: "node1",
    end: "node2"
  },
  {
    start: "node2",
    end: "node3"
  },
  {
    start: "node3",
    end: "node2"
  }
])
)}

function _35(manipulate,$0,$1,invalidation,invert){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    const x_scale = viewofPlot.scale("x");
    const y_scale = viewofPlot.scale("y");
    dataCurrent.x = invert(
      x_scale,
      x_scale.apply(dataStart.x) + pixelCurrent[0] - pixelStart[0]
    );
    dataCurrent.y = invert(
      y_scale,
      y_scale.apply(dataStart.y) + pixelCurrent[1] - pixelStart[1]
    );
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _plot_graph(Plot,x_nodes,x_edges){return(
Plot.plot({
  width: 400,
  aspectRatio: 1,
  x: {
    domain: [-0.2, 1.2]
  },
  y: {
    domain: [-0.2, 1.2]
  },
  axis: false,
  marks: [
    Plot.frame(),
    Plot.dot(x_nodes, { x: "x", y: "y", r: 40 }),
    Plot.text(x_nodes, { x: "x", y: "y", text: "id" }),
    Plot.arrow(x_edges, {
      x1: (d) => x_nodes.find((n) => n.id == d.start).x,
      x2: (d) => x_nodes.find((n) => n.id == d.end).x,
      y1: (d) => x_nodes.find((n) => n.id == d.start).y,
      y2: (d) => x_nodes.find((n) => n.id == d.end).y,
      inset: 40,
      bend: true
    }),
    Plot.dot(
      x_nodes,
      Plot.pointer({
        x: "x",
        y: "y",
        r: 40,
        stroke: "red",
        maxRadius: Infinity
      })
    )
  ]
})
)}

function _37(md){return(
md`We can consider the references as a separate categorical map. You can mix and match multiple manipulations targeting the same data and plots freely.`
)}

function _x_edges_domain(Inputs,x_nodes){return(
Inputs.input(
  Array.from({ length: x_nodes.length * x_nodes.length }).flatMap((_, i) =>
    i % x_nodes.length != Math.floor(i / x_nodes.length)
      ? {
          start: x_nodes[i % x_nodes.length].id,
          end: x_nodes[Math.floor(i / x_nodes.length)].id
        }
      : []
  )
)
)}

function _plot_edges(Plot,x_nodes,x_edges,x_edges_domain,_){return(
Plot.plot({
  x: {
    type: "point",
    domain: x_nodes.map((n) => n.id),
    grid: true
  },
  y: {
    type: "point",
    domain: x_nodes.map((n) => n.id),
    grid: true
  },
  marks: [
    Plot.dot(x_edges, {
      x: "start",
      y: "end",
      r: 5,
      fill: "black"
    }),
    Plot.dot(
      x_edges_domain,
      Plot.pointer({
        x: "start",
        y: "end",
        r: 7,
        stroke: (d) => (x_edges.find((e) => _.isEqual(d, e)) ? "red" : "blue")
      })
    )
  ]
})
)}

function _40(manipulate,$0,$1,invalidation,_,$2,Event){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    if (!_.isEqual(pixelStart, pixelCurrent)) return; // only trigger for click
    const edgeIndex = $2.value.findIndex((x) =>
      _.isEqual(x, dataCurrent)
    );
    if (edgeIndex != -1) {
      $2.value.splice(edgeIndex, 1);
    } else {
      $2.value.push({ ...dataCurrent });
    }
    $2.dispatchEvent(new Event("input"));
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _41(md){return(
md`## Non linear Spaces (projections)

DOES NOT WORK waiting on https://github.com/observablehq/plot/issues/1191`
)}

function _longitude(Inputs){return(
Inputs.range([-180, 180])
)}

function _x_location(Inputs){return(
Inputs.input([
  {
    longitude: 0,
    latitude: 0
  }
])
)}

function _plot_location(Plot,longitude,land,x_location){return(
Plot.plot({
  width: 300,
  projection: { type: "orthographic", rotate: [-longitude, 0] },
  r: { transform: (d) => Math.pow(10, d) }, // convert Richter to amplitude
  marks: [
    Plot.geo(land, { fill: "currentColor", fillOpacity: 0.2 }),
    Plot.sphere(),
    Plot.dot(x_location, {
      x: "longitude",
      y: "latitude",
      stroke: "blue",
      fill: "blue",
      r: 10,
      fillOpacity: 0.2
    }),
    Plot.dot(
      x_location,
      Plot.pointer({
        x: "longitude",
        y: "latitude",
        stroke: "red",
        fill: "red",
        r: 10,
        fillOpacity: 0.2
      })
    )
  ]
})
)}

function _46(md){return(
md`## Editable Text

Not sure if its possible, ideally we would use https://github.com/observablehq/plot/issues/1213`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof x_trajectory")).define("viewof x_trajectory", ["Inputs"], _x_trajectory);
  main.variable(observer("x_trajectory")).define("x_trajectory", ["Generators", "viewof x_trajectory"], (G, _) => G.input(_));
  main.variable(observer("viewof plot_trajectory")).define("viewof plot_trajectory", ["Plot","x_trajectory","arc","max_arc","d3"], _plot_trajectory);
  main.variable(observer("plot_trajectory")).define("plot_trajectory", ["Generators", "viewof plot_trajectory"], (G, _) => G.input(_));
  main.variable(observer("trajectory_manipulate")).define("trajectory_manipulate", ["manipulate","viewof x_trajectory","viewof plot_trajectory","invalidation","invert"], _trajectory_manipulate);
  main.variable(observer("arc")).define("arc", ["x_trajectory"], _arc);
  main.variable(observer("max_arc")).define("max_arc", ["d3","arc"], _max_arc);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["tex","md"], _10);
  main.variable(observer("invert")).define("invert", _invert);
  main.variable(observer()).define(["Generators","invalidation","interactions"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("manipulate")).define("manipulate", ["interactions","Event"], _manipulate);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("interactions")).define("interactions", ["MouseEvent","invalidation"], _interactions);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof x_simple")).define("viewof x_simple", ["Inputs"], _x_simple);
  main.variable(observer("x_simple")).define("x_simple", ["Generators", "viewof x_simple"], (G, _) => G.input(_));
  main.variable(observer()).define(["manipulate","viewof x_simple","viewof plot_simple","invalidation","invert"], _20);
  main.variable(observer("viewof plot_simple")).define("viewof plot_simple", ["Plot","x_simple"], _plot_simple);
  main.variable(observer("plot_simple")).define("plot_simple", ["Generators", "viewof plot_simple"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof x_ordcat")).define("viewof x_ordcat", ["Inputs"], _x_ordcat);
  main.variable(observer("x_ordcat")).define("x_ordcat", ["Generators", "viewof x_ordcat"], (G, _) => G.input(_));
  main.variable(observer()).define(["manipulate","viewof x_ordcat","viewof plot_ordcat","invalidation","invert"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof plot_ordcat")).define("viewof plot_ordcat", ["Plot","x_ordcat"], _plot_ordcat);
  main.variable(observer("plot_ordcat")).define("plot_ordcat", ["Generators", "viewof plot_ordcat"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof x_sliders")).define("viewof x_sliders", ["Inputs"], _x_sliders);
  main.variable(observer("x_sliders")).define("x_sliders", ["Generators", "viewof x_sliders"], (G, _) => G.input(_));
  main.variable(observer()).define(["manipulate","viewof x_sliders","viewof plot_sliders","invalidation","invert"], _30);
  main.variable(observer("viewof plot_sliders")).define("viewof plot_sliders", ["Plot","x_sliders"], _plot_sliders);
  main.variable(observer("plot_sliders")).define("plot_sliders", ["Generators", "viewof plot_sliders"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof x_nodes")).define("viewof x_nodes", ["Inputs"], _x_nodes);
  main.variable(observer("x_nodes")).define("x_nodes", ["Generators", "viewof x_nodes"], (G, _) => G.input(_));
  main.variable(observer("viewof x_edges")).define("viewof x_edges", ["Inputs"], _x_edges);
  main.variable(observer("x_edges")).define("x_edges", ["Generators", "viewof x_edges"], (G, _) => G.input(_));
  main.variable(observer()).define(["manipulate","viewof x_nodes","viewof plot_graph","invalidation","invert"], _35);
  main.variable(observer("viewof plot_graph")).define("viewof plot_graph", ["Plot","x_nodes","x_edges"], _plot_graph);
  main.variable(observer("plot_graph")).define("plot_graph", ["Generators", "viewof plot_graph"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof x_edges_domain")).define("viewof x_edges_domain", ["Inputs","x_nodes"], _x_edges_domain);
  main.variable(observer("x_edges_domain")).define("x_edges_domain", ["Generators", "viewof x_edges_domain"], (G, _) => G.input(_));
  main.variable(observer("viewof plot_edges")).define("viewof plot_edges", ["Plot","x_nodes","x_edges","x_edges_domain","_"], _plot_edges);
  main.variable(observer("plot_edges")).define("plot_edges", ["Generators", "viewof plot_edges"], (G, _) => G.input(_));
  main.variable(observer()).define(["manipulate","viewof x_edges_domain","viewof plot_edges","invalidation","_","viewof x_edges","Event"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof longitude")).define("viewof longitude", ["Inputs"], _longitude);
  main.variable(observer("longitude")).define("longitude", ["Generators", "viewof longitude"], (G, _) => G.input(_));
  main.variable(observer("viewof x_location")).define("viewof x_location", ["Inputs"], _x_location);
  main.variable(observer("x_location")).define("x_location", ["Generators", "viewof x_location"], (G, _) => G.input(_));
  main.variable(observer("viewof plot_location")).define("viewof plot_location", ["Plot","longitude","land","x_location"], _plot_location);
  main.variable(observer("plot_location")).define("plot_location", ["Generators", "viewof plot_location"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _46);
  return main;
}
