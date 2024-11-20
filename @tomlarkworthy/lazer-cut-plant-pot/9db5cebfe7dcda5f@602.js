import define1 from "./2320fab09283ad21@626.js";
import define2 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# Lazer Cut Plant Pot`
)}

function _width(Inputs){return(
Inputs.range([1, 200], { label: "width", value: 90, step: 1 })
)}

function _3(md){return(
md`## Side (x4)`
)}

function _pot_side(width,htl,units,finger_clockwise_v1)
{
  const padding = 10;
  const total_width = width + 2 * padding;
  const total_height = width + 2 * padding;
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
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <!--<rect stroke="green" x=${padding} y=${padding} width=${width} height=${width} />-->
      <path stroke="red" fill="none" d="
        M ${padding} ${padding}
        ${finger_clockwise_v1([padding, padding], [padding + width, padding])} 
        ${finger_clockwise_v1(
          [padding + width, padding],
          [padding + width, padding + width]
        )} 
        L ${padding + width - 10} ${padding + width}
        L ${padding + width - 10} ${padding + width - 5}
        L ${padding + width - 18} ${padding + width - 10}
        ${finger_clockwise_v1(
          [padding + width - 18, padding + width - 10],
          [padding + 18, padding + width - 10]
        )} 
        L ${padding + 18} ${padding + width - 10}
        L ${padding + 10} ${padding + width - 5}
        L ${padding + 10} ${padding + width}
        L ${padding} ${padding + width}
        ${finger_clockwise_v1([padding, padding + width], [padding, padding])} 
      "/>
  </div>`;
}


function _5(md){return(
md`## Top
`
)}

function _pot_top(width,htl,units,mortise_clockwise_v1)
{
  const padding = 10;
  const total_width = width + 2 * padding;
  const total_height = width + 2 * padding;
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
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <path stroke="red" fill="none" d="
        M ${padding} ${padding}
        ${mortise_clockwise_v1(
          [padding, padding],
          [padding + width - 3, padding]
        )} 
        M ${padding + width} ${padding}
        ${mortise_clockwise_v1(
          [padding + width, padding],
          [padding + width, padding + width - 3]
        )} 

        M ${padding + width} ${padding + width}
        ${mortise_clockwise_v1(
          [padding + width, padding + width],
          [padding + 3, padding + width]
        )} 

        M ${padding} ${padding + width}
        ${mortise_clockwise_v1(
          [padding, padding + width],
          [padding, padding + 3]
        )} 
        
        M ${padding - 3} ${padding - 3}
        L ${padding + 3 + width} ${padding - 3}
        L ${padding + 3 + width} ${padding + width + 3}
        L ${padding - 3} ${padding + width + 3}
        L ${padding - 3} ${padding - 3}

        
        M ${padding + 6} ${padding + 6}
        L ${padding + width - 6} ${padding + 6}
        L ${padding + width - 6} ${padding + width - 6}
        L ${padding + 6} ${padding + width - 6}
        L ${padding + 6} ${padding + 6}
      "/>
  </div>`;
}


function _7(md){return(
md`## Bottom`
)}

function _pot_bottom(width,htl,units,mortise_clockwise_v1)
{
  const padding = 10;
  const total_width = width + 2 * padding;
  const total_height = width + 2 * padding;
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
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <circle stroke="red" cx=${(2 * padding + width) * 0.5} cy=${
    (2 * padding + width) * 0.5
  } r=6 />
      <circle stroke="red" cx=${(2 * padding + width) * 0.7} cy=${
    (2 * padding + width) * 0.7
  } r=6 />
      <circle stroke="red" cx=${(2 * padding + width) * 0.3} cy=${
    (2 * padding + width) * 0.3
  } r=6 />
      <circle stroke="red" cx=${(2 * padding + width) * 0.7} cy=${
    (2 * padding + width) * 0.3
  } r=6 />
      <circle stroke="red" cx=${(2 * padding + width) * 0.3} cy=${
    (2 * padding + width) * 0.7
  } r=6 />
      <path stroke="red" fill="none" d="
        
        M ${padding} ${padding}
        L ${padding + 21} ${padding}
        L ${padding + 21} ${padding + 3}
        L ${padding + 3} ${padding + 3}
        L ${padding + 3} ${padding + 18}
        L ${padding} ${padding + 18}
        L ${padding} ${padding}

        
        M ${padding + width} ${padding}
        L ${padding + width} ${padding + 21}
        L ${padding + width - 3} ${padding + 21}
        L ${padding + width - 3} ${padding + 3}
        L ${padding + width - 18} ${padding + 3}
        L ${padding + width - 18} ${padding}
        L ${padding + width} ${padding}


        M ${padding + width} ${padding + width}
        L ${padding + width - 21} ${padding + width}
        L ${padding + width - 21} ${padding + width - 3}
        L ${padding + width - 3} ${padding + width - 3}
        L ${padding + width - 3} ${padding + width - 18}
        L ${padding + width} ${padding + width - 18}
        L ${padding + width} ${padding + width}


        M ${padding} ${padding + width}
        L ${padding} ${padding + width - 21}
        L ${padding + 3} ${padding + width - 21}
        L ${padding + 3} ${padding + width - 3}
        L ${padding + 18} ${padding + width - 3}
        L ${padding + 18} ${padding + width}
        L ${padding} ${padding + width}

        M ${padding - 3} ${padding - 3}
        L ${padding + 3 + width} ${padding - 3}
        L ${padding + 3 + width} ${padding + width + 3}
        L ${padding - 3} ${padding + width + 3}
        L ${padding - 3} ${padding - 3}

        M ${padding + 21} ${padding}
        ${mortise_clockwise_v1(
          [padding + 21, padding],
          [padding + width - 18, padding]
        )} 
        M ${padding + width} ${padding + 21}
        ${mortise_clockwise_v1(
          [padding + width, padding + 21],
          [padding + width, padding + width - 18]
        )} 

        M ${padding + width - 21} ${padding + width}
        ${mortise_clockwise_v1(
          [padding + width - 21, padding + width],
          [padding + 18, padding + width]
        )} 

        M ${padding} ${padding + width - 21}
        ${mortise_clockwise_v1(
          [padding, padding + width - 21],
          [padding, padding + 18]
        )} 
      "/>
  </div>`;
}


function _9(md){return(
md`## Cap`
)}

function _pot_cap(width,htl,units)
{
  const padding = 10;
  const total_width = width + 2 * padding;
  const total_height = width + 2 * padding;
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
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <path stroke="red" fill="none" d="
        
        M ${padding - 1} ${padding - 1}
        L ${padding + 1 + width} ${padding - 1}
        L ${padding + 1 + width} ${padding + width + 1}
        L ${padding - 1} ${padding + width + 1}
        L ${padding - 1} ${padding - 1}
        
        M ${padding + 4} ${padding + 4}
        L ${padding + width - 4} ${padding + 4}
        L ${padding + width - 4} ${padding + width - 4}
        L ${padding + 4} ${padding + width - 4}
        L ${padding + 4} ${padding + 4}
      "/>
  </div>`;
}


function _11(md){return(
md`## Saucer Top`
)}

function _n(Inputs){return(
Inputs.range([1, 5], {
  label: "number of pots to hold",
  value: 2,
  step: 1
})
)}

function _extension(Inputs){return(
Inputs.range([1, 30], {
  label: "extension",
  value: 5,
  step: 1
})
)}

function _saucer_main(width,n,htl,units,extension)
{
  const padding = 20;
  const unit_length = width + 10;
  const total_width = unit_length * n + 2 * padding;
  const total_height = unit_length + 2 * padding;
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
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <path stroke="red" fill="none" d="
        
        M ${padding - 1 - extension} ${padding - 1 - extension}
        L ${padding + 1 + unit_length * (n - 1) + width + extension} ${
    padding - 1 - extension
  }
        L ${padding + 1 + unit_length * (n - 1) + width + extension} ${
    padding + width + 1 + extension
  }
        L ${padding - 1 - extension} ${padding + width + 1 + extension}
        L ${padding - 1 - extension} ${padding - 1 - extension}

        ${Array.from({ length: n })
          .map(
            (_, i) => `
              M ${padding + unit_length * i} ${padding}
              L ${padding + 21 + unit_length * i} ${padding}
              L ${padding + 21 + unit_length * i} ${padding + 3}
              L ${padding + 3 + unit_length * i} ${padding + 3}
              L ${padding + 3 + unit_length * i} ${padding + 18}
              L ${padding + unit_length * i} ${padding + 18}
              L ${padding + unit_length * i} ${padding}
      
              
              M ${padding + width + unit_length * i} ${padding}
              L ${padding + width + unit_length * i} ${padding + 21}
              L ${padding + width - 3 + unit_length * i} ${padding + 21}
              L ${padding + width - 3 + unit_length * i} ${padding + 3}
              L ${padding + width - 18 + unit_length * i} ${padding + 3}
              L ${padding + width - 18 + unit_length * i} ${padding}
              L ${padding + width + unit_length * i} ${padding}
      
      
              M ${padding + width + unit_length * i} ${padding + width}
              L ${padding + width - 21 + unit_length * i} ${padding + width}
              L ${padding + width - 21 + unit_length * i} ${padding + width - 3}
              L ${padding + width - 3 + unit_length * i} ${padding + width - 3}
              L ${padding + width - 3 + unit_length * i} ${padding + width - 18}
              L ${padding + width + unit_length * i} ${padding + width - 18}
              L ${padding + width + unit_length * i} ${padding + width}
      
      
              M ${padding + unit_length * i} ${padding + width}
              L ${padding + unit_length * i} ${padding + width - 21}
              L ${padding + 3 + unit_length * i} ${padding + width - 21}
              L ${padding + 3 + unit_length * i} ${padding + width - 3}
              L ${padding + 18 + unit_length * i} ${padding + width - 3}
              L ${padding + 18 + unit_length * i} ${padding + width}
              L ${padding + unit_length * i} ${padding + width}
            `
          )
          .join()}
      "/>
  </div>`;
}


function _saucer_top(width,n,htl,units)
{
  const padding = 10;
  const spacing = 10;
  const total_width = width * n + 2 * padding;
  const total_height = width + 2 * padding;
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
          viewBox="0 0 ${total_width} ${total_height}"
          fill="none"
    >
      <path stroke="red" fill="none" d="
        
        M ${padding - 1} ${padding - 1}
        L ${padding + 1 + width * n} ${padding - 1}
        L ${padding + 1 + width * n} ${padding + width + 1}
        L ${padding - 1} ${padding + width + 1}
        L ${padding - 1} ${padding - 1}
        
        M ${padding + 4} ${padding + 4}
        L ${padding + width * n - 4} ${padding + 4}
        L ${padding + width * n - 4} ${padding + width - 4}
        L ${padding + 4} ${padding + width - 4}
        L ${padding + 4} ${padding + 4}
      "/>
  </div>`;
}


function _16(md){return(
md`## Art`
)}

function _plant(art)
{
  const blob = new Blob([art], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const image = document.createElement("img");
  image.src = url;
  return image;
}


function _19(art){return(
art.outerHTML
)}

function _plantURL(art)
{
  return "data:image/svg+xml," + encodeURIComponent(art.outerHTML);
  // const canvas = document.createElement("canvas");
  // canvas.width = 512;
  // canvas.height = 512;
  // const context = canvas.getContext("2d");

  // context.drawImage(await plant.image({ width: 512 }), 0, 0, 512, 512);
  // return canvas.toDataURL();
}


function _21(md){return(
md`Can convert to vector with https://tech-lagoon.com/imagechef/en/image-to-edge.html

https://svgconverter.app/free`
)}

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

function _26(md){return(
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

function _30(md){return(
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

function _35(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof width")).define("viewof width", ["Inputs"], _width);
  main.variable(observer("width")).define("width", ["Generators", "viewof width"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("pot_side")).define("pot_side", ["width","htl","units","finger_clockwise_v1"], _pot_side);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("pot_top")).define("pot_top", ["width","htl","units","mortise_clockwise_v1"], _pot_top);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("pot_bottom")).define("pot_bottom", ["width","htl","units","mortise_clockwise_v1"], _pot_bottom);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("pot_cap")).define("pot_cap", ["width","htl","units"], _pot_cap);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof n")).define("viewof n", ["Inputs"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof extension")).define("viewof extension", ["Inputs"], _extension);
  main.variable(observer("extension")).define("extension", ["Generators", "viewof extension"], (G, _) => G.input(_));
  main.variable(observer("saucer_main")).define("saucer_main", ["width","n","htl","units","extension"], _saucer_main);
  main.variable(observer("saucer_top")).define("saucer_top", ["width","n","htl","units"], _saucer_top);
  main.variable(observer()).define(["md"], _16);
  const child1 = runtime.module(define1);
  main.import("art", child1);
  main.variable(observer("plant")).define("plant", ["art"], _plant);
  main.variable(observer()).define(["art"], _19);
  main.variable(observer("plantURL")).define("plantURL", ["art"], _plantURL);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("material_thickness")).define("material_thickness", _material_thickness);
  main.variable(observer("units")).define("units", _units);
  main.variable(observer("distance2DSquared")).define("distance2DSquared", _distance2DSquared);
  main.variable(observer("mod")).define("mod", _mod);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("mortise_clockwise_v1")).define("mortise_clockwise_v1", ["distance2DSquared","material_thickness","mod"], _mortise_clockwise_v1);
  main.variable(observer("mortise_clockwise_v1_preview")).define("mortise_clockwise_v1_preview", ["mortise_clockwise_v1_config","htl","units","mortise_clockwise_v1"], _mortise_clockwise_v1_preview);
  main.variable(observer("viewof mortise_clockwise_v1_config")).define("viewof mortise_clockwise_v1_config", ["Inputs"], _mortise_clockwise_v1_config);
  main.variable(observer("mortise_clockwise_v1_config")).define("mortise_clockwise_v1_config", ["Generators", "viewof mortise_clockwise_v1_config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("finger_clockwise_v1")).define("finger_clockwise_v1", ["distance2DSquared","material_thickness","mod"], _finger_clockwise_v1);
  main.variable(observer("fingers_clockwise_v1_preview")).define("fingers_clockwise_v1_preview", ["finger_clockwise_v1_config","htl","units","finger_clockwise_v1"], _fingers_clockwise_v1_preview);
  main.variable(observer("viewof finger_clockwise_v1_config")).define("viewof finger_clockwise_v1_config", ["Inputs"], _finger_clockwise_v1_config);
  main.variable(observer("finger_clockwise_v1_config")).define("finger_clockwise_v1_config", ["Generators", "viewof finger_clockwise_v1_config"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _35);
  return main;
}
