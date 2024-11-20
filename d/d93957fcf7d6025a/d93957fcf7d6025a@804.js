import define1 from "./17c8ce433e1df58e@3332.js";
import define2 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# Lazer Cut Pouch`
)}

function _leather_pouch_configuration(Inputs){return(
{
  prompt:
    "Create a UI for a leather pouch. It will need a width, height and depth. It will also need the stitching inset and the second stitching inset.",
  time: 1725711488007
} &&
  Inputs.form({
    width: Inputs.range([1, 100], { label: "Width", value: 100 }),
    height: Inputs.range([1, 100], { label: "Height", value: 100 }),
    depth: Inputs.range([1, 100], { label: "Depth", value: 25 }),
    stitchingInset: Inputs.range([0, 10], {
      label: "Stitching Inset",
      value: 4
    }),
    secondStitchingInset: Inputs.range([0, 10], {
      label: "Second Stitching Inset",
      value: 7
    }),
    spacing: Inputs.range([0, 10], {
      label: "Stich width",
      value: 3
    }),
    dotSize: Inputs.range([0, 10], {
      label: "Hole size",
      value: 0.75
    })
  })
)}

function _3(md){return(
md`## Outside`
)}

function _outer_pouch(leather_pouch_configuration,htl,units,dotLines)
{
  const padding = 10;
  const {
    height,
    depth,
    width,
    stitchingInset,
    secondStitchingInset,
    dotSize
  } = leather_pouch_configuration;
  const total_width = width + 2 * padding;
  const total_height = height * 2 + 2 * padding + depth;

  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="pouch_outer"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <path stroke="red" fill="none" d="
        M ${padding} ${padding + height + depth}
        l 0 ${height}
        l ${width} 0
        l 0 ${-height}
        l 0 ${-depth}
        l 0 ${-height}
        l ${-width} 0
        l 0 ${height}
        l 0 ${depth}
      "/>
      ${dotLines(
        [
          [padding + stitchingInset, padding + height + depth + stitchingInset],
          [
            padding + stitchingInset,
            padding + height * 2 + depth - stitchingInset
          ],
          [
            padding + width - stitchingInset,
            padding + height * 2 + depth - stitchingInset
          ],
          [
            padding + width - stitchingInset,
            padding + height + depth + stitchingInset
          ]
        ],
        leather_pouch_configuration
      )}

      ${dotLines(
        [
          [
            padding + secondStitchingInset,
            padding + height + depth + stitchingInset
          ],
          [
            padding + secondStitchingInset,
            padding + height * 2 + depth - secondStitchingInset
          ],
          [
            padding + width - secondStitchingInset,
            padding + height * 2 + depth - secondStitchingInset
          ],
          [
            padding + width - secondStitchingInset,
            padding + height + depth + stitchingInset
          ]
        ],
        leather_pouch_configuration
      )}
      
      ${dotLines(
        [
          [padding + depth, padding + height + depth / 2],
          [padding + width - depth, padding + height + depth / 2]
        ],
        {
          spacing: depth,
          dotSize: depth
        }
      )}
  </div>`;
}


function _pocket(leather_pouch_configuration,htl,units,dotLines)
{
  const padding = 10;
  const {
    height,
    depth,
    width,
    stitchingInset,
    secondStitchingInset,
    dotSize
  } = leather_pouch_configuration;
  const total_width = width + 2 * padding * 2 + depth * 2;
  const total_height = height * 2 + 2 * padding + depth;

  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="pouch"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <path stroke="red" fill="none" d="
        M ${padding + depth} ${padding + height + depth}
        l ${depth} ${height}
        l ${width} 0
        l ${depth} ${-height}
        Z
      "/>
      ${dotLines(
        [
          [
            padding + stitchingInset + depth,
            padding + height + depth + stitchingInset
          ],
          [
            padding + stitchingInset + depth + depth,
            padding + height * 2 + depth - stitchingInset
          ],
          [
            padding + width - stitchingInset + depth + depth,
            padding + height * 2 + depth - stitchingInset
          ],
          [
            padding + width - stitchingInset + depth * 3,
            padding + height + depth + stitchingInset
          ]
        ],
        leather_pouch_configuration
      )}

      ${dotLines(
        [
          [
            padding + secondStitchingInset + depth,
            padding + height + depth + stitchingInset
          ],
          [
            padding + secondStitchingInset + depth + depth,
            padding + height * 2 + depth - secondStitchingInset
          ],
          [
            padding + width - secondStitchingInset + depth + depth,
            padding + height * 2 + depth - secondStitchingInset
          ],
          [
            padding + width - secondStitchingInset + depth * 3,
            padding + height + depth + stitchingInset
          ]
        ],
        leather_pouch_configuration
      )}
  </div>`;
}


function _material_thickness(){return(
3
)}

function _units(){return(
"mm"
)}

function _distance2DSquared(){return(
(a, b) =>
  (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
)}

function _mod(){return(
function mod(n, m) {
  return ((n % m) + m) % m;
}
)}

function _10(md){return(
md`#### Mortise Joint`
)}

function _mortise_clockwise_v1(distance2DSquared,material_thickness,mod){return(
(
  start,
  end,
  {
    offset,
    finger_depth = 3,
    finger_width = 3,
    cut_correction,
    end_anchor = false,
    reverse = false,
    delayStart = NaN,
    delayEnd = NaN,
    reverseDelay = false,
    debug = false
  } = {}
) => {
  const distance = (a, b) => Math.sqrt(distance2DSquared(a, b));
  finger_width = finger_width || 2;
  finger_depth = finger_depth || material_thickness;
  cut_correction = cut_correction || 0.1;
  offset = offset || 0;
  const dir = [end[0] - start[0], end[1] - start[1]];
  const length = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
  dir[0] /= length;
  dir[1] /= length;
  const commands = [];

  const in_cut = [-finger_depth * dir[1], finger_depth * dir[0]];

  const cos45 = 1 / Math.sqrt(2);
  const sin45 = 1 / Math.sqrt(2);
  const cos135 = -1 / Math.sqrt(2);
  const sin135 = 1 / Math.sqrt(2);

  const corner_cut_a = [
    (cos135 * dir[0] - sin135 * dir[1]) * cut_correction,
    (sin135 * dir[0] + cos135 * dir[1]) * cut_correction
  ];

  const corner_cut_b = [
    (cos45 * dir[0] - sin45 * dir[1]) * cut_correction,
    (sin45 * dir[0] + cos45 * dir[1]) * cut_correction
  ];

  if (debug) debugger;

  let on_outer;

  reverseDelay ^= reverse;

  const dist = distance(start, end);
  delayEnd = Math.min(delayEnd, dist);
  if (end_anchor) {
    offset = (dist % finger_width) + offset;
    on_outer = dist % (finger_width * 2) < finger_width;
    reverseDelay ^= on_outer;
  } else {
    on_outer = mod(offset, finger_width * 2) <= finger_width;
  }

  if (reverse) on_outer = !on_outer;

  // adjust delays to stop the delays from inverting
  // Some weird ruonding errors so we step a funny amount
  if (!Number.isNaN(delayStart))
    while (((delayStart - offset) / finger_width + reverseDelay) % 2 <= 1) {
      delayStart += finger_width / 3;
    }
  if (!Number.isNaN(delayEnd))
    while (
      delayEnd > 0 &&
      ((delayEnd - offset) / finger_width + reverseDelay) % 2 <= 1
    ) {
      delayEnd -= finger_width / 3;
    }

  // First cut on boundary
  if (
    on_outer ^
    end_anchor ^
    (((delayStart - offset) / finger_width) % 2 > 1)
  ) {
    commands.push(`
      L ${start[0]} ${start[1]}
    `);
  } else {
    commands.push(`
      L ${start[0] + in_cut[0]} ${start[1] + in_cut[1]}
    `);
  }

  for (
    let i = end_anchor ? 0 : 1;
    (i + offset / finger_width) * finger_width < length - 0.0001;
    i++
  ) {
    const i1 = i + offset / finger_width;
    if (i1 > delayEnd / finger_width) continue;
    if (!on_outer) {
      // outwards cut
      commands.push(`
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}
  
          L ${
            start[0] + i1 * finger_width * dir[0] + in_cut[0] + corner_cut_b[0]
          }
            ${
              start[1] +
              i1 * finger_width * dir[1] +
              in_cut[1] +
              corner_cut_b[1]
            }
  
  
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}

          L ${start[0] + i1 * finger_width * dir[0]}
            ${start[1] + i1 * finger_width * dir[1]}

          L ${start[0] + i1 * finger_width * dir[0] - corner_cut_a[0]}
            ${start[1] + i1 * finger_width * dir[1] - corner_cut_a[1]}
          
          L ${start[0] + i1 * finger_width * dir[0]}
            ${start[1] + i1 * finger_width * dir[1]}

          L ${start[0] + (i1 - 1) * finger_width * dir[0]}
            ${start[1] + (i1 - 1) * finger_width * dir[1]}


          L ${start[0] + (i1 - 1) * finger_width * dir[0] - corner_cut_b[0]}
            ${start[1] + (i1 - 1) * finger_width * dir[1] - corner_cut_b[1]}

          
          L ${start[0] + (i1 - 1) * finger_width * dir[0]}
            ${start[1] + (i1 - 1) * finger_width * dir[1]}
        `);
    } else {
      // inwards cut
      commands.push(`
          M ${start[0] + i1 * finger_width * dir[0]}
            ${start[1] + i1 * finger_width * dir[1]}
                  
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}
  
          L ${
            start[0] + i1 * finger_width * dir[0] + in_cut[0] + corner_cut_a[0]
          }
            ${
              start[1] +
              i1 * finger_width * dir[1] +
              in_cut[1] +
              corner_cut_a[1]
            }
  
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}
      `);
    }
    on_outer = !on_outer;
    if (i1 <= delayStart / finger_width) commands.pop();
  }

  // last cut on boundary
  if (on_outer) {
    commands.push(`
      M ${end[0]} ${end[1]}
    `);
  } else {
    commands.push(`
      M ${end[0] + in_cut[0]} ${end[1] + in_cut[1]}
    `);
  }
  return commands.join();
}
)}

function _mortise_clockwise_v1_preview(mortise_clockwise_v1_config,htl,units,mortise_clockwise_v1)
{
  const total_width = 100;
  const total_height = 100;

  const { x0, x1, y0, y1 } = mortise_clockwise_v1_config;
  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_end"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M ${x0} ${y0} 
        ${mortise_clockwise_v1(
          [x0, y0],
          [x1, y1],
          mortise_clockwise_v1_config
        )} 
      "/>
  </div>`;
}


function _mortise_clockwise_v1_config(Inputs){return(
Inputs.form({
  x0: Inputs.range([0, 100], {
    label: "x0",
    value: 10
  }),
  y0: Inputs.range([0, 100], {
    label: "y0",
    value: 10
  }),
  x1: Inputs.range([0, 100], {
    label: "x0",
    value: 80
  }),
  y1: Inputs.range([0, 100], {
    label: "y1",
    value: 10
  }),
  offset: Inputs.range([-10, 10], {
    label: "offset",
    value: 0
  }),
  finger_depth: Inputs.range([0, 10], {
    label: "finger_depth",
    value: 2.1
  }),
  finger_width: Inputs.range([0, 10], {
    label: "finger_width",
    value: 2
  }),
  cut_correction: Inputs.range([0, 10], {
    label: "cut_correction",
    value: 0.1
  }),
  end_anchor: Inputs.toggle({
    label: "end_anchor",
    value: false
  }),
  reverse: Inputs.toggle({
    label: "reverse",
    value: false
  }),
  delayStart: Inputs.range([0, 100], {
    label: "delay start",
    value: 0
  }),
  delayEnd: Inputs.range([0, 100], {
    label: "delay end",
    value: 90
  }),
  reverseDelay: Inputs.toggle({
    label: "reverse delay",
    value: false
  }),
  debug: Inputs.toggle({
    label: "debug",
    value: false
  })
})
)}

function _14(md){return(
md`#### Finger Joint`
)}

function _finger_clockwise_v1(distance2DSquared,material_thickness,mod){return(
(
  start,
  end,
  {
    offset,
    finger_depth = 3,
    finger_width = 3,
    cut_correction,
    end_anchor = false,
    reverse = false,
    delayStart = NaN,
    delayEnd = NaN,
    reverseDelay = false,
    debug = false
  } = {}
) => {
  const distance = (a, b) => Math.sqrt(distance2DSquared(a, b));
  finger_width = finger_width || 2;
  finger_depth = finger_depth || material_thickness;
  cut_correction = cut_correction || 0.1;
  offset = offset || 0;
  const dir = [end[0] - start[0], end[1] - start[1]];
  const length = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
  dir[0] /= length;
  dir[1] /= length;
  const commands = [];

  const in_cut = [-finger_depth * dir[1], finger_depth * dir[0]];

  const cos45 = 1 / Math.sqrt(2);
  const sin45 = 1 / Math.sqrt(2);
  const cos135 = -1 / Math.sqrt(2);
  const sin135 = 1 / Math.sqrt(2);

  const corner_cut_a = [
    (cos135 * dir[0] - sin135 * dir[1]) * cut_correction,
    (sin135 * dir[0] + cos135 * dir[1]) * cut_correction
  ];

  const corner_cut_b = [
    (cos45 * dir[0] - sin45 * dir[1]) * cut_correction,
    (sin45 * dir[0] + cos45 * dir[1]) * cut_correction
  ];

  if (debug) debugger;

  let on_outer;

  reverseDelay ^= reverse;

  const dist = distance(start, end);
  delayEnd = Math.min(delayEnd, dist);
  if (end_anchor) {
    offset = (dist % finger_width) + offset;
    on_outer = dist % (finger_width * 2) < finger_width;
    reverseDelay ^= on_outer;
  } else {
    on_outer = mod(offset, finger_width * 2) <= finger_width;
  }

  if (reverse) on_outer = !on_outer;

  // adjust delays to stop the delays from inverting
  // Some weird ruonding errors so we step a funny amount
  if (!Number.isNaN(delayStart))
    while (((delayStart - offset) / finger_width + reverseDelay) % 2 <= 1) {
      delayStart += finger_width / 3;
    }
  if (!Number.isNaN(delayEnd))
    while (
      delayEnd > 0 &&
      ((delayEnd - offset) / finger_width + reverseDelay) % 2 <= 1
    ) {
      delayEnd -= finger_width / 3;
    }

  // First cut on boundary
  if (
    on_outer ^
    end_anchor ^
    (((delayStart - offset) / finger_width) % 2 > 1)
  ) {
    commands.push(`
      L ${start[0]} ${start[1]}
    `);
  } else {
    commands.push(`
      L ${start[0] + in_cut[0]} ${start[1] + in_cut[1]}
    `);
  }

  for (
    let i = end_anchor ? 0 : 1;
    (i + offset / finger_width) * finger_width < length - 0.0001;
    i++
  ) {
    const i1 = i + offset / finger_width;
    if (i1 > delayEnd / finger_width) continue;
    if (!on_outer) {
      // outwards cut
      commands.push(`
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}
  
          L ${
            start[0] + i1 * finger_width * dir[0] + in_cut[0] + corner_cut_b[0]
          }
            ${
              start[1] +
              i1 * finger_width * dir[1] +
              in_cut[1] +
              corner_cut_b[1]
            }
  
  
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}

          
          L ${start[0] + i1 * finger_width * dir[0]}
            ${start[1] + i1 * finger_width * dir[1]}
        `);
    } else {
      // inwards cut
      commands.push(`
          L ${start[0] + i1 * finger_width * dir[0]}
            ${start[1] + i1 * finger_width * dir[1]}
                  
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}
  
          L ${
            start[0] + i1 * finger_width * dir[0] + in_cut[0] + corner_cut_a[0]
          }
            ${
              start[1] +
              i1 * finger_width * dir[1] +
              in_cut[1] +
              corner_cut_a[1]
            }
  
          L ${start[0] + i1 * finger_width * dir[0] + in_cut[0]}
            ${start[1] + i1 * finger_width * dir[1] + in_cut[1]}
      `);
    }
    on_outer = !on_outer;
    if (i1 <= delayStart / finger_width) commands.pop();
  }

  // last cut on boundary
  if (on_outer) {
    commands.push(`
      L ${end[0]} ${end[1]}
    `);
  } else {
    commands.push(`
      L ${end[0] + in_cut[0]} ${end[1] + in_cut[1]}
    `);
  }
  return commands.join();
}
)}

function _fingers_clockwise_v1_preview(finger_clockwise_v1_config,htl,units,finger_clockwise_v1)
{
  const total_width = 100;
  const total_height = 100;

  const { x0, x1, y0, y1 } = finger_clockwise_v1_config;
  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_end"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M ${x0} ${y0} 
        ${finger_clockwise_v1([x0, y0], [x1, y1], finger_clockwise_v1_config)} 
      "/>
  </div>`;
}


function _finger_clockwise_v1_config(Inputs){return(
Inputs.form({
  x0: Inputs.range([0, 100], {
    label: "x0",
    value: 10
  }),
  y0: Inputs.range([0, 100], {
    label: "y0",
    value: 10
  }),
  x1: Inputs.range([0, 100], {
    label: "x0",
    value: 80
  }),
  y1: Inputs.range([0, 100], {
    label: "y1",
    value: 10
  }),
  offset: Inputs.range([-10, 10], {
    label: "offset",
    value: 0
  }),
  finger_depth: Inputs.range([0, 10], {
    label: "finger_depth",
    value: 2.1
  }),
  finger_width: Inputs.range([0, 10], {
    label: "finger_width",
    value: 2
  }),
  cut_correction: Inputs.range([0, 10], {
    label: "cut_correction",
    value: 0.1
  }),
  end_anchor: Inputs.toggle({
    label: "end_anchor",
    value: false
  }),
  reverse: Inputs.toggle({
    label: "reverse",
    value: false
  }),
  delayStart: Inputs.range([0, 100], {
    label: "delay start",
    value: 0
  }),
  delayEnd: Inputs.range([0, 100], {
    label: "delay end",
    value: 90
  }),
  reverseDelay: Inputs.toggle({
    label: "reverse delay",
    value: false
  }),
  debug: Inputs.toggle({
    label: "debug",
    value: false
  })
})
)}

function _18(md){return(
md`#### Dot Pattern`
)}

function _dotPatternPreview(line_configuration,htl,dotLine)
{
  ({
    prompt:
      "Create a preview SVG for testing the dot pattern using the config.",
    time: 1725711159072
  });

  const config = line_configuration;
  const { startX, startY, endX, endY, dotSize, spacing } = config;

  const width = 100;
  const height = 100;

  return htl.svg`<svg width="${width}" height="${height}" stroke="red" fill="none">
    ${dotLine([startX, startY], [endX, endY], config)}
  </svg>`;
}


function _line_configuration(Inputs){return(
{
  prompt:
    "Create a UI for configuring a line, a dot pattern of circles in SVG, so we need to know where the line starts and ends, and the size of the dots, and the spacing between the dots.",
  time: 1725710878756
} &&
  Inputs.form({
    startX: Inputs.range([0, 100], { label: "Start X", value: 10 }),
    startY: Inputs.range([0, 100], { label: "Start Y", value: 10 }),
    endX: Inputs.range([0, 100], { label: "End X", value: 80 }),
    endY: Inputs.range([0, 100], { label: "End Y", value: 80 }),
    dotSize: Inputs.range([1, 10], { label: "Dot Size", value: 0.5 }),
    spacing: Inputs.range([0, 20], { label: "Dot Spacing", value: 5 })
  })
)}

function _dotLine(svg){return(
{
  prompt:
    "Implement the dot pattern as a list of SVG circles as a reusable function that takes an object as an argument that is descrictured",
  time: 1725711131043
} &&
  function createDotPattern(
    [startX, startY],
    [endX, endY],
    { dotSize = 0.5, spacing = 5 } = {}
  ) {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const numDots = Math.floor(distance / (dotSize + spacing));

    const dots = [];
    for (let i = 0; i < numDots; i++) {
      const ratio = i / numDots;
      const x = startX + ratio * dx;
      const y = startY + ratio * dy;
      dots.push(svg`
      <circle cx="${x}" cy="${y}" r="${dotSize / 2}" stroke="red" />
    `);
    }

    return dots;
  }
)}

function _dotLines(dotLine,svg){return(
{
  prompt:
    'Extract this dot polygon routing into its own function that takes a list of coordinates and the config options, it will generate a number of dot lines between each coordinate and add a final circle\n\n${dotLine(\n        [padding + stitchingInset, padding + height + depth],\n        [\n          padding + stitchingInset,\n          padding + height * 2 + depth - stitchingInset\n        ]\n      )}\n      ${dotLine(\n        [\n          padding + stitchingInset,\n          padding + height * 2 + depth - stitchingInset\n        ],\n        [\n          padding + width - stitchingInset,\n          padding + height * 2 + depth - stitchingInset\n        ]\n      )}\n      ${dotLine(\n        [\n          padding + width - stitchingInset,\n          padding + height * 2 + depth - stitchingInset\n        ],\n        [padding + width - stitchingInset, padding + height + depth]\n      )}\n      <circle cx="${padding + width - stitchingInset}" cy="${\n    padding + height + depth\n  }" r="${dotSize / 2}" stroke="red" />',
  time: 1725714164713
} &&
  function createDotPolygon(coords, config) {
    const dots = [];
    const { dotSize } = config;

    for (let i = 0; i < coords.length - 1; i++) {
      const start = coords[i];
      const end = coords[i + 1];
      dots.push(...dotLine(start, end, config));
    }

    // Add the final circle at the last coordinate
    const lastCoord = coords[coords.length - 1];
    dots.push(svg`
      <circle cx="${lastCoord[0]}" cy="${lastCoord[1]}" r="${
      dotSize / 2
    }" stroke="red" />
    `);

    return dots;
  }
)}

function _23($0){return(
$0
)}

function _24(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _25($0){return(
$0
)}

function _26(md){return(
md`## Current Chat context`
)}

function _27($0){return(
$0
)}

function _28($0){return(
$0
)}

function _29(md){return(
md`tick the cells to include in the next prompt`
)}

function _30($0){return(
$0
)}

function _31(md){return(
md`### AI Settings`
)}

function _32($0){return(
$0
)}

function _33($0){return(
$0
)}

function _34($0){return(
$0
)}

function _observable_js_skill(html,md){return(
{
  prompt: "Explain the Observablehq programming model",
  time: 1700163368139
} &&
  html`<h2>Observable Programming Skill</h2>
<details>
  ${md`
The JavaScript dialect used in Observable notebooks is almost—but not entirely—vanilla. This is intentional: by building on the native language of the web, Observable is familiar. And you can use the libraries you know and love, such as D3, Lodash, and Apache Arrow. Yet for dataflow, Observable needed to change JavaScript in a few ways.

> **Note**  
> Observable JavaScript is used in notebooks only. Observable Framework uses vanilla JavaScript.

Here's a quick overview of what's different from vanilla.

## Cells are Separate Scripts

Each cell in a notebook is a separate script that runs independently. A syntax error in one cell won't prevent other cells from running.

~~~javascript
// Example of a syntax error in a cell
This is English, not JavaScript.
~~~

~~~javascript
// Example of a valid cell assignment
myCell = "some string"
~~~

~~~javascript
// Example of a runtime error in a cell
{ throw new Error("oopsie"); }
~~~

Even if one cell has a syntax or runtime error, it does not affect the execution of other cells.

Local variables are only visible to the cell that defines them. For example:

~~~javascript
// Defining a local variable in one cell
{ const local = "I am a local variable."; }
~~~
  
~~~javascript
// Attempting to use the local variable in another cell
local // not defined
~~~

The second cell above will cause a runtime error because \`local\` is not defined in that cell's scope.

## Cells Run in Topological Order

In vanilla JavaScript, code runs from top to bottom. Not so here; Observable runs like a spreadsheet, so you can define your cells in whatever order makes sense.

~~~javascript
// Using a variable defined in a later cell
a + 2 // a is defined below
~~~

~~~javascript
// Defining the variable 'a'
a = 1
~~~

You can define cells in any order you like. Here, \`a\` is successfully used as a variable in the cell before it is defined. However, circular definitions are not allowed:

~~~javascript
// Circular reference causing an error
c1 = c2 - 1
c2 = c1 + 1
~~~

Both \`c1\` and \`c2\` will throw a runtime error due to circular definition.

## Cells Re-run When Any Referenced Cell Changes

You don't have to run cells explicitly when you edit or interact—the notebook updates automatically. If a cell allocates resources that won't be automatically cleaned up by the garbage collector, such as an animation loop or event listener, use the \`invalidation\` promise to dispose of these resources manually and avoid leaks.

~~~javascript
// Using the invalidation promise for cleanup
{ invalidation.then(() => console.log("I was invalidated.")); }
~~~

## Cells Implicitly Await Promises

Cells can contain promises, and referencing cells will implicitly wait for these promises to resolve before running:

~~~javascript
// Defining a cell with a promise
hello = new Promise(resolve => {
  setTimeout(() => {
    resolve("hello there");
  }, 30000);
})
~~~

Referencing cells will wait for \`hello\` to resolve before they execute.

## Cells Implicitly Iterate Over Generators

If a cell yields, any referencing cell will see the most recently yielded value.

~~~javascript
// Using a generator with yield statements
c = {
  yield 1;
  yield 2;
  yield 3;
}
~~~

~~~javascript
// Referencing the generator cell
c
~~~

Referencing \`c\` will return the most recently yielded value, which in this example would be \`3\`.

## Named Cells are Declarations, Not Assignments

Named cells look like, and function almost like, assignment expressions in vanilla JavaScript. But cells can be defined in any order, so think of them as hoisted function declarations.

~~~javascript
// Trying to reassign a cell's value
foo = 2
{ foo = 3 } // SyntaxError: Assignment to constant variable foo
~~~

Cell names must also be unique, and you cannot reassign the value of another cell without using \`mutable\` variables.

## Statements Need Curly Braces, and Return or Yield

A cell body can be a simple expression, such as a number or string literal, or a function call. But for statements like loops, you'll need curly braces and a \`return\` statement to give the cell a value.

~~~javascript
// Using a block statement with a return
{
  let sum = 0;
  for (let i = 0; i < 10; ++i) {
    sum += i;
  }
  return sum;
}
// Output: 45
~~~

## Object Literals Need Parentheses or Return

Wrap object literals in parentheses or use a block statement with a \`return\` to ensure they are interpreted correctly.

~~~javascript
// Correctly defining object literals
object = ({ foo: "bar" })

block = { return { foo: "bar" }; }
~~~

Without parentheses or \`return\`, the cell would interpret the object literal incorrectly, leading to undefined behavior.

~~~javascript
// Incorrectly defining an object literal
label = { foo: "bar" }
// Output: undefined
~~~

## Cells Can Be Views

Observable has a special \`viewof\` operator which lets you define interactive values. A view is a cell with two faces: its user interface, and its programmatic value.

~~~javascript
// Using viewof to create an interactive text input
viewof text = html\`<input value="edit me">\`

// Accessing the value of 'text'
text
// Output: "edit me"
~~~

## Cells Can Be Mutables

Observable provides the \`mutable\` operator so you can opt into mutable state:

~~~javascript
// Defining and using a mutable variable
mutable thing = 0

// Mutating the value of \'thing\'
++mutable thing
// Output: 1
~~~

## Observable Has a Standard Library

Observable provides a small standard library for essential features, such as a reactive width and Inputs.

## Cells Can Be Imported from Other Notebooks

You can import any named cell from any Obserable notebooks, with syntax similar to static ES imports.

~~~javascript
// Importing the 'ramp' function from another notebook
import { ramp } from "@mbostock/ramp"

// Using the imported 'ramp' function
ramp(d3.interpolateBrBG)
~~~

## Static ES Imports Are Not Supported; Use Dynamic Imports

You cannot use normal static ES imports. To use the vanilla JS ecosystem, dynamically import modules from\`esm.sh\` or \`skypack\`.

~~~javascript
// Dynamically importing lodash
_ = import("https://cdn.skypack.dev/lodash-es@4")

// Using lodash function
_.camelCase("lodash was here")
// Output: "lodashWasHere"
~~~

This completes the overview of Observable's programming model, including specific behaviors and differences from standard JavaScript, emphasizing interactivity, reactivity, and cell independence.
`}
</details>
`
)}

function _36(md){return(
md`---`
)}

function _38(background_tasks){return(
background_tasks
)}

function _40(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof leather_pouch_configuration")).define("viewof leather_pouch_configuration", ["Inputs"], _leather_pouch_configuration);
  main.variable(observer("leather_pouch_configuration")).define("leather_pouch_configuration", ["Generators", "viewof leather_pouch_configuration"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("outer_pouch")).define("outer_pouch", ["leather_pouch_configuration","htl","units","dotLines"], _outer_pouch);
  main.variable(observer("pocket")).define("pocket", ["leather_pouch_configuration","htl","units","dotLines"], _pocket);
  main.variable(observer("material_thickness")).define("material_thickness", _material_thickness);
  main.variable(observer("units")).define("units", _units);
  main.variable(observer("distance2DSquared")).define("distance2DSquared", _distance2DSquared);
  main.variable(observer("mod")).define("mod", _mod);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("mortise_clockwise_v1")).define("mortise_clockwise_v1", ["distance2DSquared","material_thickness","mod"], _mortise_clockwise_v1);
  main.variable(observer("mortise_clockwise_v1_preview")).define("mortise_clockwise_v1_preview", ["mortise_clockwise_v1_config","htl","units","mortise_clockwise_v1"], _mortise_clockwise_v1_preview);
  main.variable(observer("viewof mortise_clockwise_v1_config")).define("viewof mortise_clockwise_v1_config", ["Inputs"], _mortise_clockwise_v1_config);
  main.variable(observer("mortise_clockwise_v1_config")).define("mortise_clockwise_v1_config", ["Generators", "viewof mortise_clockwise_v1_config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("finger_clockwise_v1")).define("finger_clockwise_v1", ["distance2DSquared","material_thickness","mod"], _finger_clockwise_v1);
  main.variable(observer("fingers_clockwise_v1_preview")).define("fingers_clockwise_v1_preview", ["finger_clockwise_v1_config","htl","units","finger_clockwise_v1"], _fingers_clockwise_v1_preview);
  main.variable(observer("viewof finger_clockwise_v1_config")).define("viewof finger_clockwise_v1_config", ["Inputs"], _finger_clockwise_v1_config);
  main.variable(observer("finger_clockwise_v1_config")).define("finger_clockwise_v1_config", ["Generators", "viewof finger_clockwise_v1_config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("dotPatternPreview")).define("dotPatternPreview", ["line_configuration","htl","dotLine"], _dotPatternPreview);
  main.variable(observer("viewof line_configuration")).define("viewof line_configuration", ["Inputs"], _line_configuration);
  main.variable(observer("line_configuration")).define("line_configuration", ["Generators", "viewof line_configuration"], (G, _) => G.input(_));
  main.variable(observer("dotLine")).define("dotLine", ["svg"], _dotLine);
  main.variable(observer("dotLines")).define("dotLines", ["dotLine","svg"], _dotLines);
  main.variable(observer()).define(["viewof prompt"], _23);
  main.variable(observer()).define(["Inputs","suggestion"], _24);
  main.variable(observer()).define(["viewof suggestion"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["viewof context_viz"], _27);
  main.variable(observer()).define(["viewof feedback_prompt"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _32);
  main.variable(observer()).define(["viewof api_endpoint"], _33);
  main.variable(observer()).define(["viewof settings"], _34);
  main.variable(observer("observable_js_skill")).define("observable_js_skill", ["html","md"], _observable_js_skill);
  main.variable(observer()).define(["md"], _36);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("_variables", child1);
  main.import("_events", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof feedback_prompt", child1);
  main.import("feedback_prompt", child1);
  main.import("viewof feedback_cells_selector", child1);
  main.import("feedback_cells_selector", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.variable(observer()).define(["background_tasks"], _38);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _40);
  return main;
}
