import define1 from "./17c8ce433e1df58e@3584.js";
import define2 from "./0d64f2229c613239@129.js";
import define3 from "./f92778131fd76559@1208.js";
import define4 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# Lazer Cutting Notebook

click the designs to download
`
)}

function _2(toc){return(
toc()
)}

function _3(md){return(
md`## Global Settings`
)}

function _units(Inputs){return(
{
  prompt: "Write a chooser for units: cm, mm, in, em, ex, pt, pc, and px",
  time: 1705853654515,
  comment: "UI for choosing measurement units"
} &&
  Inputs.select(["cm", "mm", "in", "em", "ex", "pt", "pc", "px"], {
    label: "Choose units",
    value: "mm"
  })
)}

function _cut_correction(Inputs){return(
Inputs.range([0, 5], {
  label: "corner cut correction",
  value: 0.1
})
)}

function _material_thickness(Inputs){return(
Inputs.range([0.1, 8], {
  label: "material thickness",
  value: 2.1
})
)}

function _7(md){return(
md`## Notes on SVG import with Lightburn

### Text
- Cannot be CSS, use only SVG attributes
- Cannot use inherited attributes, set everything on every text tag
- Doesn't support "mm" for font units
- dominant-baseline isn't calculated correctly for y alignment`
)}

function _8(md){return(
md`## Material settings Notes

- 2mm birch, 280mm, 75 power, 2 passes
- 3mm MDF, 300mm, 95 power, 3 passes`
)}

function _9(md){return(
md`# Math functions`
)}

function _10(md){return(
md`### clamp(value, range)`
)}

function _clamp(){return(
(v, min_max = [0, 1]) => Math.min(Math.max(v, min_max[0]), min_max[1])
)}

function _12(md){return(
md`### addVectors(v1, v2)`
)}

function _addVectors(){return(
{
  prompt: "write a function to add two vectors",
  time: 1709491225160,
  comment: "Function to add two vectors"
} &&
  function addVectors(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  }
)}

function _14(md){return(
md`### rotateVector(vector, angle)`
)}

function _rotateVector(){return(
{
  prompt: "write a function to rotate a vector by an angle in degrees",
  time: 1709490413206,
  comment: "Function to rotate a vector by an angle in degrees"
} &&
  function rotateVector(vector, angleDegrees) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const cosA = Math.cos(angleRadians);
    const sinA = Math.sin(angleRadians);
    const [x, y] = vector;
    return [cosA * x - sinA * y, sinA * x + cosA * y];
  }
)}

function _16(md){return(
md`### vectorFromAngle(angle)`
)}

function _vectorFromAngle(){return(
{
  prompt:
    "write a function to calculate a unit vector as a [x, y] array, given an angle in degrees",
  time: 1709478746066,
  comment: "Function to calculate a unit vector given an angle in degrees"
} &&
  function unitVector(angleDegrees, scale = 1) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return [Math.cos(angleRadians) * scale, Math.sin(angleRadians) * scale];
  }
)}

function _18(md){return(
md`### intercept(offset1, direction1, offset2, direction2)`
)}

function _intercept(){return(
{
  prompt:
    "Write a function to calculate the intercept between two lines given as vector offsets + vector directions",
  time: 1709478937939,
  comment:
    "Function to calculate the intercept between two lines given as vector offsets + vector directions"
} &&
  function intercept(p1, v1, p2, v2) {
    const x1 = p1[0],
      y1 = p1[1],
      x2 = p2[0],
      y2 = p2[1],
      v1x = v1[0],
      v1y = v1[1],
      v2x = v2[0],
      v2y = v2[1];

    const determinant = v1x * v2y - v1y * v2x;

    if (determinant === 0) {
      // Lines are parallel and will never intercept
      return null;
    }

    const t = ((x2 - x1) * v2y + (y1 - y2) * v2x) / determinant;
    const u = ((x1 - x2) * v1y + (y2 - y1) * v1x) / determinant;

    // Calculate the intersection point
    return [x1 + t * v1x, y1 + t * v1y];
  }
)}

function _20(md){return(
md`### angleBetweenAngles(angle1, angle2)`
)}

function _angleBetweenAngles(){return(
{
  prompt:
    "Write a function to compute the angle between two other angles (in degrees)",
  time: 1709479644272,
  comment: "Function to compute the angle between two angles (in degrees)"
} &&
  function angleBetweenAngles(angle1, angle2) {
    const delta = angle2 - angle1;
    const modDelta = ((delta + 180) % 360) - 180;
    return modDelta < -180 ? modDelta + 360 : modDelta;
  }
)}

function _22(md){return(
md`### distance(v1, v2)`
)}

function _distance(){return(
{
  prompt: "distance between two vector",
  time: 1709506756661,
  comment: "Function to calculate the distance between two vectors"
} &&
  function distanceBetweenVectors(v1, v2) {
    const dx = v2[0] - v1[0];
    const dy = v2[1] - v1[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
)}

function _24(md){return(
md`# Modular Frame System V2

Cartesian frames are not strong without diagonal cross beams. The V2 improves on the V1 by

- Unifying the generalising the joint
  - The X, T, and corner are a single general n-joint type (4, 3, 2 respectively)
  - You can include more options including a non 90 degree angles
- Clarifying the difference between inner and outer dimensions of the tube diameter
- Improving the strut so it can transmit forces better
- Fixing a few material thickness mis-calculations`
)}

function _25(md){return(
md`### Buying notes. 

We can use the modular system to reenforce off-the-shelf structs

[Allwetterholz KDI 2700 x 45 x 22 mm](https://toom.de/p/allwetterholz-kdi-2700-x-45-x-22-mm/4280164)`
)}

function _frame_v2_config_raw(Inputs,material_thickness){return(
Inputs.form({
  lattice_length: Inputs.range([0, 100], {
    label: "lattice_length",
    value: 20
  }),
  diamter_type: Inputs.radio(["inner", "outer"], {
    label: "diamter_type",
    value: "inner"
  }),
  tube_diameter: Inputs.range([0, 100], {
    label: "tube_diameter",
    value: 20
  }),
  material_thickness: Inputs.range([0.1, 8], {
    label: "material thickness",
    value: material_thickness
  })
})
)}

function _frame_v2_config(frame_v2_config_raw){return(
{
  ...frame_v2_config_raw,
  tube_diameter:
    frame_v2_config_raw.diamter_type == "outer"
      ? frame_v2_config_raw.tube_diameter
      : frame_v2_config_raw.tube_diameter +
        frame_v2_config_raw.material_thickness
}
)}

function _28(md){return(
md`## n-Joint`
)}

function _joint_config(Inputs){return(
Inputs.form({
  n: Inputs.range([1, 10], {
    label: "number of joints",
    value: 3,
    step: 1
  })
})
)}

function _joints_config(Inputs,joint_config){return(
Inputs.form(
  Object.fromEntries(
    Array.from({ length: joint_config.n }).flatMap((_, i) => [
      [
        `j${i}_angle`,
        Inputs.range([-360, 360], {
          label: `j${i} angle`,
          value: i * (360 / joint_config.n)
        })
      ],
      [
        `j${i}_body_length`,
        Inputs.range([0, 200], {
          label: `j${i} body_length`,
          value: 40
        })
      ],
      [
        `j${i}_taper`,
        Inputs.toggle({
          label: `j${i} taper`,
          value: false
        })
      ]
    ])
  )
)
)}

function _joint_params(joint_config,joints_config,frame_v2_config){return(
Array.from({ length: joint_config.n }).map((_, i) => {
  return {
    preceeding_angle:
      joints_config[`j${(i + joint_config.n - 1) % joint_config.n}_angle`] - 90,
    angle: joints_config[`j${i}_angle`] - 90,
    taper: joints_config[`j${i}_taper`],
    body_length: joints_config[`j${i}_body_length`],
    following_angle: joints_config[`j${(i + 1) % joint_config.n}_angle`] - 90,
    ...frame_v2_config
  };
})
)}

function _n_joint_svg(joint_config,joints_config,frame_v2_config,d3,joint_params,htl,units,joint_arm,drill_hole)
{
  const { scale, n, diamter_type, lattice_length } = {
    ...joint_config,
    ...joints_config,
    ...frame_v2_config
  };
  const max_body_length = d3.max(joint_params, (d) => d.body_length);

  const total_width = max_body_length * 2 + lattice_length * 2;
  const total_height = max_body_length * 2 + lattice_length * 2;
  return htl.svg`<div 
    style=" width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="${n}_joint"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="${-total_width / 2} ${
    -total_height / 2
  } ${total_width} ${total_height}">
      ${Array.from({ length: n }).map((_, i) => joint_arm(joint_params[i]))}
      ${drill_hole([0, 0])}
    </svg>
  </div>`;
}


function _33(md){return(
md`## joint arm`
)}

function _joint_arm(vectorFromAngle,rotateVector,intercept,svg,finger_clockwise_v1,drill_hole,drill_pattern){return(
({
  body_length,
  angle,
  preceeding_angle,
  following_angle,
  lattice_length,
  tube_diameter,
  material_thickness,
  taper = false,
  taper_angle_1 = 45,
  taper_angle_2 = 45,
  debug = false
}) => {
  const preceedingDir = vectorFromAngle(
    preceeding_angle - angle,
    tube_diameter
  );
  const preceedingOffset = rotateVector(
    [0, tube_diameter * 0.5],
    preceeding_angle - angle
  );
  const followingDir = vectorFromAngle(following_angle - angle, tube_diameter);
  const followingOffset = rotateVector(
    [0, -tube_diameter * 0.5],
    following_angle - angle
  );

  const intercept1 = intercept(
    preceedingOffset,
    preceedingDir,
    [0, tube_diameter * -0.5],
    [1, 0]
  );
  const intercept2 = intercept(
    followingOffset,
    followingDir,
    [0, tube_diameter * 0.5],
    [1, 0]
  );

  const additional_length = body_length - lattice_length * 2;

  const taperDir1 = vectorFromAngle(taper_angle_1);
  const taperDir2 = vectorFromAngle(-taper_angle_2);
  const taperCorner1 = intercept(
    [lattice_length * 3 + additional_length, 0],
    taperDir1,
    [0, tube_diameter * -0.5 + material_thickness],
    [1, 0]
  );
  const taperCorner2 = intercept(
    [lattice_length * 3 + additional_length, 0],
    taperDir2,
    [0, tube_diameter * 0.5 - material_thickness],
    [1, 0]
  );

  return svg`
    <g transform="rotate(${angle})">
      ${
        debug
          ? svg`<path stroke="green" fill="none" d="
          M ${preceedingOffset[0]} ${preceedingOffset[1]}
          L ${preceedingOffset[0] + preceedingDir[0]} ${
              preceedingOffset[1] + preceedingDir[1]
            }
          M ${followingOffset[0]} ${followingOffset[1]}
          L ${followingOffset[0] + followingDir[0]} ${
              followingOffset[1] + followingDir[1]
            }
        "/>`
          : undefined
      }
      <path stroke="red" fill="none" d="
          M ${intercept1[0]} ${intercept1[1]}
          ${finger_clockwise_v1(
            [intercept1[0], intercept1[1]],
            [lattice_length * 2.5 + additional_length, tube_diameter * -0.5],
            {
              finger_depth: material_thickness,
              end_anchor: true
            }
          )}
          ${
            taper
              ? `
            L ${lattice_length * 2.5 + additional_length} ${
                  tube_diameter * -0.5 + +material_thickness
                }
            L ${taperCorner1[0]} ${taperCorner1[1]}
            L ${lattice_length * 3 + additional_length} 0
            L ${taperCorner2[0]} ${taperCorner2[1]}
            L ${lattice_length * 2.5 + additional_length} ${tube_diameter * 0.5}
          `
              : `L ${lattice_length * 2.5 + additional_length} ${
                  tube_diameter * 0.5 - material_thickness
                }`
          }
          ${finger_clockwise_v1(
            [lattice_length * 2.5 + additional_length, tube_diameter * 0.5],
            [intercept2[0], intercept2[1]],
            {
              finger_depth: material_thickness
            }
          )}
          L ${intercept2[0]} ${intercept2[1]}
        "/>
      ${drill_hole([lattice_length * 1 + additional_length + 8, 0])}
      <!--${drill_pattern([lattice_length * 1 + additional_length, 0])}-->
      ${drill_pattern([lattice_length * 2 + additional_length, 0])}
    </g>
  `;
}
)}

function _joint_arm_config(Inputs){return(
Inputs.form({
  body_length: Inputs.range([0, 100], {
    label: "body_length",
    value: 40
  }),
  preceeding_angle: Inputs.range([-360, 360], {
    label: "preceeding_angle",
    value: -90
  }),
  angle: Inputs.range([-360, 360], {
    label: "angle",
    value: 0
  }),
  following_angle: Inputs.range([-360, 360], {
    label: "following_angle",
    value: 90
  }),
  taper: Inputs.toggle({
    label: "taper",
    value: false
  }),
  taper_angle_1: Inputs.range([-360, 360], {
    label: "taper_angle_1",
    value: 45
  }),
  taper_angle_2: Inputs.range([-360, 360], {
    label: "taper_angle_2",
    value: 45
  }),
  debug: Inputs.toggle({
    label: "debug",
    value: true
  })
})
)}

function _joint_arm_preview(joint_arm_config,frame_v2_config,htl,units,joint_arm)
{
  const { angle, tube_diameter } = {
    ...joint_arm_config,
    ...frame_v2_config
  };
  const total_width = tube_diameter * 6;
  const total_height = tube_diameter * 6;
  return htl.svg`<div 
    style=" 
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="joint_arm_${angle}"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="${-total_width / 2} ${
    -total_height / 2
  } ${total_width} ${total_height}">
      ${joint_arm({
        ...joint_arm_config,
        ...frame_v2_config
      })}
    </svg>
  </div>`;
}


function _37(md){return(
md`## finger joints V1`
)}

function _mod(){return(
function mod(n, m) {
  return ((n % m) + m) % m;
}
)}

function _finger_clockwise_v1(material_thickness,distance,mod){return(
(
  start,
  end,
  {
    offset,
    finger_depth,
    finger_width,
    cut_correction,
    end_anchor = false,
    reverse = false,
    delayStart = NaN,
    delayEnd = NaN,
    reverseDelay = false,
    debug = false
  } = {}
) => {
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

function _42(md){return(
md`# Smoke extraction for Sculpfun S9

Based on this [Video](https://www.youtube.com/watch?v=k7qTE4t4sf8) 
- Cheap shop vac [40 EUR](https://www.amazon.de/-/en/Einhell-TC-VC-Vacuum-Cleaner-2342370/dp/B014HFNONS/ref=sr_1_3?crid=3HPFZ9YUMJ4XS&dib=eyJ2IjoiMSJ9.BeB-Km7kEBmZG6pkhsr6fUCBr3P2KeSuMP3AqSfeh1oH1celuGENkw8tB5jPkQmpNRWg8te4Sb9xF4DFFju-TJXFF_oPaICn_6i41oqWk9P5OJ-4ZWiRrkuPdg8dWyK_HmnEo_rqNC7Sq74vFdkt9Ydgtmd0Q36LmcKxm5REHd27ZkK5GGSqQgodRVeXzqz0f-Ef5Uwlpc8SJGp778JaeFsXPQ56OSeBENaeUzbkTQA.N7_ts1TJC6fiMnVdwBUIT9byXu0f_vOEDIfQI5d520U&dib_tag=se&keywords=shop%2Bvac&qid=1708718642&sprefix=shop%2Bvac%2Caps%2C141&sr=8-3&th=1)
- HEPA filter [20EUR](https://www.amazon.de/-/en/Tristar-Air-Filter-Replacement-Pre-filter/dp/B08XQWDNRT/ref=sr_1_3?crid=X4TORE6KDWUI&dib=eyJ2IjoiMSJ9.Y-4UOjD2wjMF4uGcXq_5E7HTjX9rhvOcyWvpSL5VZMqqy-mp82AKb6OciSUIYBlHhBfxBO1Tf9TLZvLszxin-neGX_o9L6KpB_eoxBOVXwIvxVEHalAiJn4xmWiQoRm9c9lDE6a68XXBFibO09MDti_cd7vs4NJHhg5ERiqKocmQM7pIT9FeCXXjohL1LQJPV5eu62ZdxSYycnebtr81H5T-wxOsko4gpFmBgmmR57s.2ZVc7RusgjjkGe6IVfb4nhET1GQwFkY8GZe4vMhinHg&dib_tag=se&keywords=HEPA%2Bfilter%2Bcarbon&qid=1708719056&sprefix=hepa%2Bfilter%2Caps%2C137&sr=8-3&th=1)
- CPAP pipe [10EUR](https://www.amazon.com/SnugellTM-Universal-Premium-Compatible-Respironics/dp/B0883GR4HF?crid=ZVKX9MUB97D9&keywords=CPAP+hose&qid=1675111960&sprefix=cpap+hos,aps,110&sr=8-10&linkCode=sl1&tag=embracemaking-20&linkId=94fca7ba3b3e1a9769a7b519d4dd51c3&language=en_US&ref_=as_li_ss_tl)`
)}

async function _43(FileAttachment,md){return(
md`
We want the smoke extractor to go up and down with the lazer when it is height adjusted => the nozzle if fixed to the height thumb screws.

Thumb screws (M4) are located 45mm from the edge of the lazer module, spaced 40mm apart. The plate they attach to is 55mm

Attached to the lazer module is a UV hood. It is 17mm deep (lazer is usually adjusted to 20mm focal length, so the extra 3 is clearance). It is cylindrical (32mm diameter). The bulk of the lazer module is 40mm square

![IMG_20240224_101326.jpg](${await FileAttachment("IMG_20240224_101326.jpg").url()})

`
)}

function _44(md){return(
md`### Backplate`
)}

function _nozzle_backplate(htl,units,finger_clockwise_v0)
{
  const total_width = 55;
  const total_height = 55;
  const upper = total_height / 2 - 20;
  const lower = total_height / 2 + 20;

  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_backplate"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 0 ${total_height / 2 - 20}
        ${finger_clockwise_v0([0, upper], [36, upper])}
        L ${36} 0
        L ${total_width} 0
        L ${total_width} ${total_height}
        L 36 ${total_height}
        L 36 ${lower}
        ${finger_clockwise_v0([36, lower], [0, lower])}
        Z
      "/>
      <circle cx=45 cy=${total_height / 2 - 20} r=2 stroke="red" fill="none" />
      <circle cx=45 cy=${total_height / 2 + 20} r=2 stroke="red" fill="none" />
    </svg>
  </div>`;
}


function _46(md){return(
md`### Side A`
)}

function _nozzle_side_a(htl,units,finger_clockwise_v0)
{
  const total_width = 16 + 36;
  const total_height = 40 + 48;
  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_side_a"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 0 0
        L 16 0
        L 16 40
        ${finger_clockwise_v0([16, 40], [total_width, 40])}  
        L ${total_width} 48
        L 16 64
        ${finger_clockwise_v0([16, 64], [16, total_height])}
        ${finger_clockwise_v0([16, total_height], [0, total_height])}
        ${finger_clockwise_v0([0, total_height], [0, 40])}
        L 0 40
        Z
      "/>
    </svg>
  </div>`;
}


function _48(md){return(
md`### Side B`
)}

function _nozzle_side_b(htl,units,finger_clockwise_v0)
{
  const total_width = 16 + 36;
  const total_height = 40 + 48;
  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_side_b"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 0 0
        L 16 0
        L 16 40
        ${finger_clockwise_v0([16, 40], [total_width, 40], { invert: true })} 
        L ${total_width} 40
        L ${total_width} 48
        L 16 64
        ${finger_clockwise_v0([16, 64], [16, total_height], { invert: true })}
        ${finger_clockwise_v0([16, total_height], [0, total_height], {
          invert: true
        })}
        ${finger_clockwise_v0([0, total_height], [0, 40], { invert: true })}
        L 0 40
        Z
      "/>
    </svg>
  </div>`;
}


function _50(md){return(
md`### Nozzle entrace`
)}

function _nozzle_holder(htl,units,material_thickness,finger_clockwise_v0)
{
  const total_width = 40;
  const total_height = 48;

  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_entrace"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M ${material_thickness} 0
        L ${total_width - material_thickness} 0
        L ${total_width - material_thickness} 24
        ${finger_clockwise_v0([total_width, 24], [total_width, total_height])}  
        ${finger_clockwise_v0([total_width, total_height], [0, total_height])}  
        ${finger_clockwise_v0([0, total_height], [0, 24])}  
        Z
      "/>
<circle cx=${total_width / 2} cy="30" r="8" fill="none" stroke="red" />
    </svg>
  </div>`;
}


function _52(md){return(
md`### Tube (x14)

You will need to glue a stack of these together. CPAP pipe is 19mm outside diameter so we make a 20mm diameter for a tight fit.`
)}

function _nozzle_tube_wall(htl,units)
{
  const diameter = 20,
    wall_widith = 2;
  const total_width = diameter;
  const total_height = diameter;

  return htl.svg`<div 
    style=" 
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="tube_wall"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="${-total_width / 2} ${
    -total_height / 2
  } ${total_width} ${total_height}">
          <circle r=${diameter / 2} fill="none" stroke="red" />
          <circle r=${diameter / 2 - wall_widith} fill="none" stroke="red" />
      
    </svg>
  </div>`;
}


function _54(md){return(
md`### End`
)}

function _nozzle_end(htl,units,finger_clockwise_v0)
{
  const total_width = 40;
  const total_height = 16;

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
        M 0 0
        ${finger_clockwise_v0([0, 0], [total_width, 0])}  
        ${finger_clockwise_v0([total_width, 0], [total_width, total_height])}  
        ${finger_clockwise_v0([total_width, total_height], [0, total_height])} 
        ${finger_clockwise_v0([0, total_height], [0, 0])}   
        Z
      "/>
  </div>`;
}


function _56(md){return(
md`### Underside`
)}

function _nozzle_underside(htl,units,finger_clockwise_v0)
{
  const total_width = 40;
  const total_height = 48;

  return htl.svg`<div 
    style="
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="nozzle_underside"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 0 0
        ${finger_clockwise_v0([0, 0], [total_width, 0])}  
        ${finger_clockwise_v0([total_width, 0], [total_width, total_height])}  
        ${finger_clockwise_v0([total_width, total_height], [0, total_height])} 
        ${finger_clockwise_v0([0, total_height], [0, 0])}   
        Z
      "/>
  </div>`;
}


async function _58(FileAttachment,md){return(
md`# Moduler Frame System V1

Build large complex boxes and frames from a few pieces

TODO:
1 - finger depth should be material_thickness


![IMG_20240223_163655.jpg](${await FileAttachment("IMG_20240223_163655.jpg").url()})`
)}

function _trellis(Inputs){return(
Inputs.form({
  hole_size: Inputs.range([0, 1000], {
    label: "hole_size",
    value: 2.9
  })
})
)}

function _slop(Inputs){return(
Inputs.range([0, 1], {
  label: "slop",
  value: 0.25
})
)}

function _finger_thickness(){return(
2
)}

function _drill_hole(svg,trellis){return(
(position) => {
  return svg`<circle
      r="${trellis.hole_size / 2}"
      cx=${position[0]}
      cy=${position[1]}
      stroke="red"
      fill="none"></circle>`;
}
)}

function _drill_pattern(drill_hole){return(
(position) => {
    return [
      drill_hole([position[0], position[1]]),
      drill_hole([position[0] - 4, position[1] - 4]),
      drill_hole([position[0] - 4, position[1] + 4]),
      drill_hole([position[0] + 4, position[1] - 4]),
      drill_hole([position[0] + 4, position[1] + 4])
    ];
  }
)}

function _64(md){return(
md`### fingers V0`
)}

function _finger_clockwise_v0(finger_thickness,cut_correction){return(
(start, end, { invert } = {}) => {
  const dir = [end[0] - start[0], end[1] - start[1]];
  const length = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
  dir[0] /= length;
  dir[1] /= length;
  const commands = [];

  const offet = [-finger_thickness * dir[1], finger_thickness * dir[0]];
  const corner_cut_a = [
    (-dir[0] + dir[1]) * cut_correction,
    (dir[1] + dir[0]) * cut_correction
  ];

  const corner_cut_b = [
    (dir[0] + dir[1]) * cut_correction,
    (dir[1] + dir[0]) * cut_correction
  ];

  const invertOff = invert === true ? 1 : 0;
  const invertOn = invert === true ? 0 : 1;

  for (let i = 0; i * finger_thickness < length - 0.001; i += 2) {
    commands.push(`
        L ${start[0] + i * finger_thickness * dir[0] + offet[0] * invertOff}
          ${start[1] + i * finger_thickness * dir[1] + offet[1] * invertOff}
                
        L ${
          start[0] + (i + 1) * finger_thickness * dir[0] + offet[0] * invertOff
        }
          ${
            start[1] +
            (i + 1) * finger_thickness * dir[1] +
            offet[1] * invertOff
          }
                
        L ${
          start[0] + (i + 1) * finger_thickness * dir[0] + offet[0] * invertOn
        }
          ${
            start[1] + (i + 1) * finger_thickness * dir[1] + offet[1] * invertOn
          }

        L ${
          start[0] +
          (i + 1) * finger_thickness * dir[0] +
          offet[0] +
          corner_cut_a[0]
        }
          ${
            start[1] +
            (i + 1) * finger_thickness * dir[1] +
            offet[1] +
            corner_cut_a[1]
          }

        L ${
          start[0] + (i + 1) * finger_thickness * dir[0] + offet[0] * invertOn
        }
          ${
            start[1] + (i + 1) * finger_thickness * dir[1] + offet[1] * invertOn
          }

        
        L ${
          start[0] + (i + 2) * finger_thickness * dir[0] + offet[0] * invertOn
        }
          ${
            start[1] + (i + 2) * finger_thickness * dir[1] + offet[1] * invertOn
          }

        L ${
          start[0] +
          (i + 2) * finger_thickness * dir[0] +
          offet[0] +
          corner_cut_b[0]
        }
          ${
            start[1] +
            (i + 2) * finger_thickness * dir[1] +
            offet[1] +
            corner_cut_b[1]
          }


        L ${
          start[0] +
          (i + 2) * finger_thickness * dir[0] +
          offet[0] * invertOn +
          offet[0] * invertOff
        }
          ${
            start[1] +
            (i + 2) * finger_thickness * dir[1] +
            offet[1] * invertOn +
            offet[1] * invertOff
          }
      `);
  }
  return commands.join();
}
)}

function _fingers_clockwise_v0_preview(htl,units,finger_clockwise_v0)
{
  const total_width = 40;
  const total_height = 16;

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
        M 0 0
        ${finger_clockwise_v0([0, 0], [total_width, 0])}  
        M 0 0

        ${finger_clockwise_v0([0, 5], [total_width, 5], { invert: true })}  

        M 0 0
      "/>
  </div>`;
}


function _67(md){return(
md`### Inner Strut`
)}

function _l_strut(Inputs){return(
Inputs.form({
  scale: Inputs.range([0, 3], {
    label: "visual scale",
    value: 1
  }),
  length: Inputs.range([0, 1000], {
    label: "length",
    step: 2 * 2,
    value: 200
  }),
  t_fingers: Inputs.toggle({
    label: "top fingers?"
  }),
  b_fingers: Inputs.toggle({
    label: "bottom fingers?"
  })
})
)}

function _l_strut_svg(l_strut,trellis,htl,units,finger_clockwise_v0,drill_pattern)
{
  const { scale, length, b_fingers, t_fingers } = { ...l_strut, ...trellis };
  const total_width = length;
  const total_height = 20;
  return htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}${units};
            height: ${total_height * scale}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="strut_${length}_${
    !t_fingers && !b_fingers
      ? "flat"
      : t_fingers || b_fingers
      ? "corner"
      : "edge"
  }"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 0 0
        ${
          t_fingers
            ? finger_clockwise_v0([0, 0], [total_width, 0])
            : `L ${total_width} 0`
        }
        L ${total_width} ${total_height}
        ${
          b_fingers
            ? finger_clockwise_v0([total_width, total_height], [0, total_height])
            : `L 0 ${total_height}`
        }
        Z
      "/>
      ${drill_pattern([10, 10])}
      ${drill_pattern([total_width - 10, 10])}
    </svg>
  </div>`;
}


function _70(md){return(
md`### Square Frame
I found this useful for holding the inner struts in place while the finger joints dried`
)}

function _square_frame_svg(htl,units,length,slop)
{
  const total_width = 30;
  const total_height = 30;

  return htl.svg`<div 
    style=" 
            width: ${total_width}${units};
            height: ${total_height}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="square_frame_${length}"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
          <rect width=30 height=30 fill="none" stroke="red"></rect>
          <rect x=${5 - slop / 2} y=${5 - slop / 2} width=${20 + slop} height=${
    20 + slop
  } fill="none" stroke="red"></rect>
      
    </svg>
  </div>`;
}


function _72(md){return(
md`### Outer Corner Joint`
)}

function _joint_svg(l_strut,trellis,finger_thickness,htl,units,finger_clockwise_v0,drill_pattern)
{
  const { scale, length, hole_size } = { ...l_strut, ...trellis };
  const total_width = 40 + finger_thickness;
  const total_height = 40 + finger_thickness;
  return htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}${units};
            height: ${total_height * scale}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="joint_corner"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M ${finger_thickness} ${finger_thickness}
        ${finger_clockwise_v0([finger_thickness, 0], [40 + finger_thickness, 0])}
        L ${40 + finger_thickness} ${20 + finger_thickness}
        L ${20 + finger_thickness} ${20 + finger_thickness}
        L ${20 + finger_thickness} ${40 + finger_thickness}
        L 0 ${40 + finger_thickness}
        ${finger_clockwise_v0([0, 40 + finger_thickness], [0, finger_thickness])}
        Z
      "/>
      ${drill_pattern([30 + finger_thickness, 10 + finger_thickness])}
      ${drill_pattern([10 + finger_thickness, 30 + finger_thickness])}
      ${drill_pattern([10 + finger_thickness, 10 + finger_thickness])}
    </svg>
  </div>`;
}


function _74(md){return(
md`### Outer T Joint`
)}

function _t_joint_svg(l_strut,trellis,finger_thickness,htl,units,finger_clockwise_v0,drill_pattern)
{
  const { scale, length, hole_size } = { ...l_strut, ...trellis };
  const total_width = 60 + finger_thickness * 2;
  const total_height = 40 + finger_thickness;
  return htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}${units};
            height: ${total_height * scale}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="joint_t"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M ${finger_thickness} ${finger_thickness}
        ${finger_clockwise_v0([finger_thickness, 0], [60 + finger_thickness, 0])}
        L ${60 + finger_thickness} ${20 + finger_thickness}
        L ${40 + finger_thickness} ${20 + finger_thickness}
        L ${40 + finger_thickness} ${40 + finger_thickness}
        L ${20 + finger_thickness} ${40 + finger_thickness}
        L ${20 + finger_thickness} ${20 + finger_thickness}
        L ${0 + finger_thickness} ${20 + finger_thickness}
        L ${0 + finger_thickness} ${20 + finger_thickness}
        Z
      "/>
      ${drill_pattern([30 + finger_thickness, 10 + finger_thickness])}
      ${drill_pattern([30 + finger_thickness, 30 + finger_thickness])}
      ${drill_pattern([10 + finger_thickness, 10 + finger_thickness])}
      ${drill_pattern([50 + finger_thickness, 10 + finger_thickness])}
    </svg>
  </div>`;
}


function _76(md){return(
md`### Plus Joint`
)}

function _plus_joint_svg(l_strut,trellis,htl,units,drill_pattern)
{
  const { scale, length, hole_size } = { ...l_strut, ...trellis };
  const total_width = 60;
  const total_height = 60;
  return htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}${units};
            height: ${total_height * scale}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="joint_plus"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 20 0
        L 40 0
        L 40 20
        L 60 20
        L 60 40
        L 40 40
        L 40 60
        L 20 60
        L 20 40
        L 00 40
        L 00 20
        L 20 20
        Z
      "/>
      ${drill_pattern([30, 10])}
      ${drill_pattern([30, 30])}
      ${drill_pattern([30, 50])}
      ${drill_pattern([10, 30])}
      ${drill_pattern([50, 30])}
    </svg>
  </div>`;
}


function _78(md){return(
md`# Bed Corner Guide`
)}

function _bench_corner(Inputs){return(
Inputs.form({
  scale: Inputs.range([0, 1], {
    label: "visual scale",
    value: 1
  }),
  x: Inputs.range([0, 1000], {
    label: "x",
    value: 100
  }),
  y: Inputs.range([0, 1000], {
    label: "y",
    value: 100
  }),
  thickness: Inputs.range([0, 50], {
    label: "thickness"
  }),
  tick_inset: Inputs.range([0, 10], {
    label: "tick inset",
    value: 0
  }),
  tick_length: Inputs.range([0, 10], {
    label: "tick length",
    value: 5
  }),
  font_size: Inputs.range([0, 32], {
    label: "font_size",
    value: 5
  }),
  text_padding: Inputs.range([0, 32], {
    label: "text_padding",
    value: 1
  })
})
)}

function _bench_corner_svg(bench_corner,htl,units,cut_correction,svg)
{
  const {
    x,
    y,
    thickness,
    scale,
    tick_inset,
    tick_length,
    font_size,
    text_padding
  } = bench_corner;
  const total_width = x + thickness;
  const total_height = y + thickness;

  const xTicks = [];
  for (let i = 0; i < x; i += 10) {
    xTicks.push(i);
  }
  const yTicks = [];
  for (let j = 0; j < y; j += 10) {
    yTicks.push(j);
  }
  return htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}${units};
            height: ${total_height * scale}${units};
            padding: 5px;
    ">
    <svg  class="lzr"
          filename="bed_corner_${x}_${y}"
          width="${total_width}${units}"
          height="${total_height}${units}"
          viewBox="0 0 ${total_width} ${total_height}">
      <path stroke="red" fill="white" d="
        M 0 ${total_height}
        L ${x + thickness} ${total_height}
        L ${x + thickness} ${total_height - thickness}
        L ${thickness} ${total_height - thickness}
        L ${thickness - cut_correction} ${
    total_height - thickness + cut_correction
  }
        L ${thickness} ${total_height - thickness}
        L ${thickness} 0
        L 0 0
        Z
      "/>
      <!-- Ticks -->
      ${xTicks.map(
        (i) =>
          svg`<line
            x1=${i + thickness}
            x2=${i + thickness}
            y1=${y + tick_inset}
            y2=${y + tick_inset + tick_length}
            stroke="green">`
      )}
      ${yTicks.map(
        (j) =>
          svg`<line
            y1=${total_height - thickness - j}
            y2=${total_height - thickness - j}
            x1=${thickness - tick_inset}
            x2=${thickness - tick_inset - tick_length}
            stroke="green">`
      )}
      <!-- Tick Text -->
      ${xTicks.map(
        (i) =>
          svg`<text 
                x=${i + thickness}
                y=${y + tick_inset + tick_length + text_padding}
                text-anchor="middle"
                dominant-baseline="hanging"
                font-size="${font_size}"
                font-family="arial"
                fill="green"
                class="tick_text x_text">${i}</text>`
      )}
      ${yTicks.map(
        (j) =>
          svg`<text 
                x=${thickness - tick_inset - tick_length - text_padding}
                y=${total_height - thickness - j}
                text-anchor="end"
                dominant-baseline="middle"
                font-size="${font_size}"
                font-family="arial"
                fill="green"
                class="tick_text y_text">${j}
              </text>`
      )}
    </svg>
  </div>`;
}


function _81(md){return(
md`# Rolling Contact Hand Clamp

<iframe id="player" type="text/html" width="640" height="390"
  src="https://www.youtube.com/embed/-vBctwi2Jyk?enablejsapi=1"
  frameborder="0"></iframe>`
)}

function _82(md){return(
md`### Assembly

A mates with B, but to get a full structure you need three layers. So one side is A, B, A and the other side is B, A, B. So you need 6 in pieces total. `
)}

function _clampConfigV1(view,Inputs,units){return(
{
  prompt:
    'create a UI for configuring a clamp. "jaw width", "jaw length", "handle length", "tool width", "thickness", "bands"',
  time: 1705860505633,
  comment: "UI for configuring a clamp"
} &&
  view`<div style="display: flex; flex-direction: column; gap: 10px;">
  ${[
    "jawWidth",
    Inputs.range([0, 300], {
      step: 1,
      value: 0,
      label: `Jaw Width (${units})`
    })
  ]}
  ${[
    "jawLength",
    Inputs.range([0, 300], {
      step: 1,
      value: 50,
      label: `Jaw Length (${units})`
    })
  ]}
  ${[
    "handleLength",
    Inputs.range([0, 300], {
      step: 1,
      value: 50,
      label: `Handle Length (${units})`
    })
  ]}
  ${[
    "toolWidth",
    Inputs.range([0, 300], {
      step: 1,
      value: 50,
      label: `Tool Width (${units})`
    })
  ]}
  ${[
    "thickness",
    Inputs.range([0, 300], {
      step: 1,
      value: 10,
      label: `Thickness (${units})`
    })
  ]}
  ${["bands", Inputs.range([2, 10], { step: 1, value: 2, label: "Bands" })]}
  ${[
    "bandRadius",
    Inputs.range([0, 10], { step: 0.1, value: 3, label: "Band radius" })
  ]}
  ${[
    "drillDiameter",
    Inputs.range([0, 10], { step: 0.2, value: 4, label: "Drill diameter" })
  ]}
</div>`
)}

function _84(md){return(
md`### A`
)}

function _clamp_v1_a(clampConfigV1,htl,units)
{
  ({
    prompt:
      "Create an SVG drawing of one half of a clamp that works like scissors/clothes pegs, which has elastic bands added to add the closing force.",
    time: 1705860651237,
    comment: "SVG drawing of one half of a clamp with elastic bands"
  });

  const {
    drillDiameter,
    jawWidth,
    jawLength,
    handleLength,
    toolWidth,
    thickness,
    bands,
    bandRadius
  } = clampConfigV1;
  const halfToolWidth = toolWidth / 2;
  const bandWidth = thickness / 4;
  const bandSpacing = (jawWidth - bandWidth * bands) / (bands - 1 + 2); // spacing between bands and on edges

  const total_width = handleLength + jawLength;
  const total_height = toolWidth / 2;
  const radius = total_height - thickness;
  const alpha = Math.atan((toolWidth / 2 - jawWidth / 2) / jawLength);
  const intercept = jawLength - radius + thickness / 2;
  const band_step = (jawLength - intercept) / (bands - 1);

  return htl.svg`<svg class="lzr" width="${total_width}${units}" height="${
    total_height * 2
  }${units}" viewBox="0 0 ${total_width} ${total_height * 2}">
    <path stroke="red" fill="white" d="
      M 0 ${total_height - jawWidth / 2}
      L 0 0
      L ${intercept - bandRadius} 0
      ${Array.from({ length: bands })
        .map(
          (_, i) => `
        A ${bandRadius} ${bandRadius} 180 1 0 ${
            intercept + band_step * i + bandRadius
          } ${0}
        L ${intercept + band_step * (i + 1) - bandRadius} 0
      `
        )
        .join("")}
      L ${total_width - handleLength + bandRadius} 0
      L ${total_width} 0
      L ${total_width} ${thickness}
      L ${jawLength + radius} ${thickness}
      A ${radius} ${radius} 90 0 1 ${jawLength} ${total_height}
      L ${jawLength - radius + thickness} ${total_height}
      L ${jawLength - radius + thickness} ${total_height + thickness}
      L ${jawLength - radius}  ${total_height + thickness}
      L ${jawLength - radius} ${thickness}
      L ${thickness} ${thickness}
      L ${thickness} ${total_height - jawWidth / 2}
      Z
    "/>
    <circle r="${drillDiameter / 2}" cx="${jawLength}" cy="${
    toolWidth / 4
  }" stroke="red" fill="white"></circle>
    <circle r="${drillDiameter / 2}" cx="${thickness / 2}" cy="${
    total_height - jawWidth / 2 - thickness / 2
  }" stroke="red" fill="white"></circle>
  </svg>`;
}


function _86(md){return(
md`### B`
)}

function _clamp_v1_b(clampConfigV1,htl,units)
{
  ({
    prompt:
      "Create an SVG drawing of one half of a clamp that works like scissors/clothes pegs, which has elastic bands added to add the closing force.",
    time: 1705860651237,
    comment: "SVG drawing of one half of a clamp with elastic bands"
  });

  const {
    drillDiameter,
    jawWidth,
    jawLength,
    handleLength,
    toolWidth,
    thickness,
    bands,
    bandRadius
  } = clampConfigV1;
  const halfToolWidth = toolWidth / 2;
  const bandWidth = thickness / 4;
  const bandSpacing = (jawWidth - bandWidth * bands) / (bands - 1 + 2); // spacing between bands and on edges

  const total_width = handleLength + jawLength;
  const total_height = toolWidth / 2;
  const radius = total_height - thickness;
  const alpha = Math.atan((toolWidth / 2 - jawWidth / 2) / jawLength);
  const intercept = jawLength - radius + thickness / 2;
  const band_step = (jawLength - intercept) / (bands - 1);

  return htl.svg`<svg class="lzr" width="${total_width}${units}" height="${
    total_height * 2
  }${units}" viewBox="0 0 ${total_width} ${total_height * 2}">
    <path stroke="red" fill="white" d="
      M 0 ${total_height - jawWidth / 2}
      L 0 0
      L ${intercept - bandRadius} 0
      ${Array.from({ length: bands })
        .map(
          (_, i) => `
        A ${bandRadius} ${bandRadius} 180 1 0 ${
            intercept + band_step * i + bandRadius
          } ${0}
        L ${intercept + band_step * (i + 1) - bandRadius} 0
      `
        )
        .join("")}
      L ${total_width - handleLength + bandRadius} 0
      L ${total_width} 0
      L ${total_width} ${thickness}
      L ${jawLength + radius} ${thickness}
      A ${radius} ${radius} 90 0 1 ${jawLength} ${total_height}
      L ${jawLength - radius + thickness} ${total_height}
      L ${jawLength - radius + thickness} ${total_height - thickness}
      L ${jawLength - radius}  ${total_height - thickness}
      L ${jawLength - radius} ${thickness}
      L ${thickness} ${thickness}
      L ${thickness} ${total_height - jawWidth / 2}
      Z
    "/>
    <circle r="${drillDiameter / 2}" cx="${jawLength}" cy="${
    toolWidth / 4
  }" stroke="red" fill="white"></circle>
    <circle r="${drillDiameter / 2}" cx="${thickness / 2}" cy="${
    total_height - jawWidth / 2 - thickness / 2
  }" stroke="red" fill="white"></circle>
  </svg>`;
}


function _88(md){return(
md`## Clamp V0 (doesn't work)`
)}

function _clampConfigV0(view,Inputs,units){return(
{
  prompt:
    'create a UI for configuring a clamp. "jaw width", "jaw length", "handle length", "tool width", "thickness", "bands"',
  time: 1705860505633,
  comment: "UI for configuring a clamp"
} &&
  view`<div style="display: flex; flex-direction: column; gap: 10px;">
  ${[
    "jawWidth",
    Inputs.range([0, 300], {
      step: 1,
      value: 10,
      label: `Jaw Width (${units})`
    })
  ]}
  ${[
    "jawLength",
    Inputs.range([0, 300], {
      step: 1,
      value: 100,
      label: `Jaw Length (${units})`
    })
  ]}
  ${[
    "handleLength",
    Inputs.range([0, 300], {
      step: 1,
      value: 50,
      label: `Handle Length (${units})`
    })
  ]}
  ${[
    "toolWidth",
    Inputs.range([0, 300], {
      step: 1,
      value: 50,
      label: `Tool Width (${units})`
    })
  ]}
  ${[
    "thickness",
    Inputs.range([0, 300], {
      step: 1,
      value: 10,
      label: `Thickness (${units})`
    })
  ]}
  ${["bands", Inputs.range([2, 10], { step: 1, value: 4, label: "Bands" })]}
  ${[
    "band_radius",
    Inputs.range([0, 10], { step: 0.1, value: 3, label: "Band radius" })
  ]}
</div>`
)}

function _svg_clamp(clampConfigV0,htl,units)
{
  ({
    prompt:
      "Create an SVG drawing of one half of a clamp that works like scissors/clothes pegs, which has elastic bands added to add the closing force.",
    time: 1705860651237,
    comment: "SVG drawing of one half of a clamp with elastic bands"
  });

  const {
    jawWidth,
    jawLength,
    handleLength,
    toolWidth,
    thickness,
    bands,
    band_radius
  } = clampConfigV0;
  const halfToolWidth = toolWidth / 2;
  const bandWidth = thickness / 4;
  const bandSpacing = (jawWidth - bandWidth * bands) / (bands - 1 + 2); // spacing between bands and on edges

  let bandPaths = "";
  for (let i = 0; i < bands; i++) {
    const bandX = halfToolWidth + bandSpacing + i * (bandWidth + bandSpacing);
    bandPaths +=
      `<path d="M${bandX},${-halfToolWidth} v${jawLength + handleLength}" ` +
      `stroke="black" stroke-width="${bandWidth}" fill="none"/>`;
  }
  const total_width = handleLength + jawLength;
  const total_height = toolWidth / 2;
  const radius = total_height - thickness;
  const alpha = Math.atan((toolWidth / 2 - jawWidth / 2) / jawLength);
  const intercept = thickness / Math.tan(alpha);
  const band_step = (jawLength - intercept) / (bands - 1);

  return htl.svg`<svg class="lzr" width="${total_width}${units}" height="${total_height}${units}" viewBox="0 0 ${total_width} ${total_height}">
    <path stroke="red" fill="white" d="
      M 0 0
      L ${intercept - band_radius} 0
      ${Array.from({ length: bands })
        .map(
          (_, i) => `
        A ${band_radius} ${band_radius} 180 1 0 ${
            intercept + band_step * i + band_radius
          } ${0}
        L ${intercept + band_step * (i + 1) - band_radius} 0
      `
        )
        .join("")}
      L ${total_width - handleLength + band_radius} 0
      L ${total_width} 0
      L ${total_width} ${thickness}
      L ${jawLength + radius} ${thickness}
      A ${radius} ${radius} 90 0 1 ${jawLength} ${total_height}
      A ${radius} ${radius} 90 0 1 ${jawLength - radius} ${thickness}
      L ${intercept} ${thickness}
      Z
    "/>
    ${bandPaths}
  </svg>`;
}


function _91(md){return(
md`### Corner shape`
)}

function _dimensions_l(view,Inputs,units){return(
{
  prompt: "Create a UI for width, height and thickness pixel parameters",
  time: 1705851970481,
  comment:
    "UI for setting width, height, and thickness parameters using range inputs"
} &&
  view`<div style="display: flex; flex-direction: column; gap: 10px;">
  ${[
    "width",
    Inputs.range([0, 1920], { step: 1, value: 50, label: `Width (${units})` })
  ]}
  ${[
    "height",
    Inputs.range([0, 1080], { step: 1, value: 50, label: `Height (${units})` })
  ]}
  ${[
    "thickness",
    Inputs.range([0, 100], {
      step: 1,
      value: 10,
      label: `Thickness (${units})`
    })
  ]}
</div>`
)}

function _svg_l_shape(dimensions_l,htl,units)
{
  ({
    prompt: "Draw an L shape SVG in using dimension_l in a single polyline",
    time: 1705852324991,
    comment: "SVG of an L shape using the dimensions_l parameters"
  });

  const { width, height, thickness } = dimensions_l;
  const points = [
    `${thickness},${thickness}`, // Start at top left of the L shape's horizontal line
    `${width},${thickness}`, // Move to the right, leaving space for the vertical line's thickness
    `${width},0`, // Move up to start the vertical line
    `0,0`, // Move to the right to create the thickness of the L shape's vertical line
    `0,${height}`, // Move down to the bottom of the L shape
    `${thickness},${height}`, // Move to the left to create the bottom line of the L shape
    `${thickness},${thickness}` // Move up to close the L shape
  ].join(" ");

  return htl.html`<svg class="lzr" width="${width}${units}" height="${height}${units}" viewBox="0 0 ${width} ${height}">
    <polyline points="${points} ${units}" fill="white" stroke="red"/>
  </svg>`;
}


function _poll_and_download_svg(download_svg)
{
  ({
    prompt:
      "poll for new SVGs on the page and add a click handler that downloads the sVG",
    time: 1705853058219,
    comment:
      "Poll for SVG elements on the page and add a click handler that downloads the SVG"
  });
  setInterval(() => {
    const svgElements = document.querySelectorAll(".lzr");
    svgElements.forEach((svg) => {
      svg.style.cursor = "pointer";
      svg.onclick = () => download_svg(svg);
    });
  }, 1000);
}


function _download_svg(XMLSerializer){return(
{
  prompt: "write a function that downloads a passed in SVG element argument",
  time: 1705852941582,
  comment: "Function to download an SVG element"
} &&
  function downloadSVG(svgEl) {
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const filename = svgEl.attributes["filename"]?.value || "image";
    const dataUri =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `${filename}.svg`);
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  }
)}

function _96(md){return(
md`# AI Assistant`
)}

function _97($0){return(
$0
)}

function _98(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _99($0){return(
$0
)}

function _100(md){return(
md`## Current Chat context`
)}

function _101($0){return(
$0
)}

function _102(md){return(
md`tick the cells to include in the next prompt`
)}

function _103($0){return(
$0
)}

function _104($0){return(
$0
)}

function _105(md){return(
md`### AI Settings`
)}

function _106($0){return(
$0
)}

function _107($0){return(
$0
)}

function _108($0){return(
$0
)}

function _109(md){return(
md`---`
)}

function _112(background_tasks){return(
background_tasks
)}

function _bindableUISkill(view,md,Inputs,htl,Event){return(
{
  prompt:
    "Demonstrate how to use the bidirection bindable UI composer, the view literal",
  time: 1700263368139,
  comment: "Binding inputs, composing within HTML and accessing via a viewof"
} &&
  view`<div class="skill">

  ${md`
  ## Bindable UI Skill
  ~~~js
  import {view} from '@tomlarkworthy/view' // required notebook import for bindable UI
  ~~~
  The view literal can compose bidirectional HTML UIs, whose value can be written to and the UI will visually update. You can bind them storage so they remember values across page refreshes
  `}
  <details><summary>example</summary>
    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Text Input</h3>
      <!-- Note a 2 element array bind the 2nd arg to the parent under the field name of the first arg -->
      ${[
        "textInput",
        Inputs.text({ placeholder: "Type something...", value: "Hello World!" })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Select Input</h3>
      ${[
        "selectInput",
        Inputs.select(["Option 1", "Option 2", "Option 3"], {
          value: "Option 2",
          label: "Choose an option"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Input Arrays</h3>
      <!-- Note a 3 element array bind the 2nd array to the parent under the field name of the first arg, and uses the 3rd arg as a builder when the underlying data array expands-->
      ${[
        "array",
        Array.from({ length: 3 }, (_, i) =>
          Inputs.text({ placeholder: `Input ${i + 1}` })
        ),
        (value) => Inputs.text({ value: value })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px;">
      <h3>Button Action</h3>
      <div style="display: flex; justify-content: flex-start;">
      <!-- the Inputs.button has a lot of formatting which breaks flexbox -->
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) => {
          const container = evt.target.closest(".skill");
          container.value.array.push(5); // manipulating the data array will trigger the UI builder
          container.dispatchEvent(new Event("input"));
        }}>add`
      ]}
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) =>
          evt.target.closest(".skill").value.array.pop()}>remove`
      ]}
      </div>
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Radio Input</h3>
      ${[
        "radioInput",
        Inputs.radio(["Choice A", "Choice B", "Choice C"], {
          value: "Choice B",
          label: "Pick one"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Checkbox Input</h3>
      ${[
        "checkboxInput",
        Inputs.checkbox(["Check 1", "Check 2"], {
          values: ["Check 1"],
          label: "Select checks"
        })
      ]}
    </div>

</details>
  </div>`
)}

function _116(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["IMG_20240223_163655.jpg", {url: new URL("./files/1f162729d8508c0f03e674579a9648d0a0e156f581f24e43077ef42e7ca8828d23f7afb48e0fb26e99f024383d8a1e1bcd910511eb5ffc7a00d3b898a7e68507.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["IMG_20240224_101326.jpg", {url: new URL("./files/827a966918757f4d603bae0255aa5cdad6752d5d6eb7415116feab2dc49b542fb92409f6686b73d63c3397dfbfa3454d6b1becb56123e97ff5821a9091b79a5d.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof units")).define("viewof units", ["Inputs"], _units);
  main.variable(observer("units")).define("units", ["Generators", "viewof units"], (G, _) => G.input(_));
  main.variable(observer("viewof cut_correction")).define("viewof cut_correction", ["Inputs"], _cut_correction);
  main.variable(observer("cut_correction")).define("cut_correction", ["Generators", "viewof cut_correction"], (G, _) => G.input(_));
  main.variable(observer("viewof material_thickness")).define("viewof material_thickness", ["Inputs"], _material_thickness);
  main.variable(observer("material_thickness")).define("material_thickness", ["Generators", "viewof material_thickness"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("clamp")).define("clamp", _clamp);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("addVectors")).define("addVectors", _addVectors);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("rotateVector")).define("rotateVector", _rotateVector);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("vectorFromAngle")).define("vectorFromAngle", _vectorFromAngle);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("intercept")).define("intercept", _intercept);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("angleBetweenAngles")).define("angleBetweenAngles", _angleBetweenAngles);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("distance")).define("distance", _distance);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("viewof frame_v2_config_raw")).define("viewof frame_v2_config_raw", ["Inputs","material_thickness"], _frame_v2_config_raw);
  main.variable(observer("frame_v2_config_raw")).define("frame_v2_config_raw", ["Generators", "viewof frame_v2_config_raw"], (G, _) => G.input(_));
  main.variable(observer("frame_v2_config")).define("frame_v2_config", ["frame_v2_config_raw"], _frame_v2_config);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof joint_config")).define("viewof joint_config", ["Inputs"], _joint_config);
  main.variable(observer("joint_config")).define("joint_config", ["Generators", "viewof joint_config"], (G, _) => G.input(_));
  main.variable(observer("viewof joints_config")).define("viewof joints_config", ["Inputs","joint_config"], _joints_config);
  main.variable(observer("joints_config")).define("joints_config", ["Generators", "viewof joints_config"], (G, _) => G.input(_));
  main.variable(observer("joint_params")).define("joint_params", ["joint_config","joints_config","frame_v2_config"], _joint_params);
  main.variable(observer("n_joint_svg")).define("n_joint_svg", ["joint_config","joints_config","frame_v2_config","d3","joint_params","htl","units","joint_arm","drill_hole"], _n_joint_svg);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("joint_arm")).define("joint_arm", ["vectorFromAngle","rotateVector","intercept","svg","finger_clockwise_v1","drill_hole","drill_pattern"], _joint_arm);
  main.variable(observer("viewof joint_arm_config")).define("viewof joint_arm_config", ["Inputs"], _joint_arm_config);
  main.variable(observer("joint_arm_config")).define("joint_arm_config", ["Generators", "viewof joint_arm_config"], (G, _) => G.input(_));
  main.variable(observer("joint_arm_preview")).define("joint_arm_preview", ["joint_arm_config","frame_v2_config","htl","units","joint_arm"], _joint_arm_preview);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("mod")).define("mod", _mod);
  main.variable(observer("finger_clockwise_v1")).define("finger_clockwise_v1", ["material_thickness","distance","mod"], _finger_clockwise_v1);
  main.variable(observer("fingers_clockwise_v1_preview")).define("fingers_clockwise_v1_preview", ["finger_clockwise_v1_config","htl","units","finger_clockwise_v1"], _fingers_clockwise_v1_preview);
  main.variable(observer("viewof finger_clockwise_v1_config")).define("viewof finger_clockwise_v1_config", ["Inputs"], _finger_clockwise_v1_config);
  main.variable(observer("finger_clockwise_v1_config")).define("finger_clockwise_v1_config", ["Generators", "viewof finger_clockwise_v1_config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["FileAttachment","md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("nozzle_backplate")).define("nozzle_backplate", ["htl","units","finger_clockwise_v0"], _nozzle_backplate);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("nozzle_side_a")).define("nozzle_side_a", ["htl","units","finger_clockwise_v0"], _nozzle_side_a);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("nozzle_side_b")).define("nozzle_side_b", ["htl","units","finger_clockwise_v0"], _nozzle_side_b);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("nozzle_holder")).define("nozzle_holder", ["htl","units","material_thickness","finger_clockwise_v0"], _nozzle_holder);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("nozzle_tube_wall")).define("nozzle_tube_wall", ["htl","units"], _nozzle_tube_wall);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("nozzle_end")).define("nozzle_end", ["htl","units","finger_clockwise_v0"], _nozzle_end);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("nozzle_underside")).define("nozzle_underside", ["htl","units","finger_clockwise_v0"], _nozzle_underside);
  main.variable(observer()).define(["FileAttachment","md"], _58);
  main.variable(observer("viewof trellis")).define("viewof trellis", ["Inputs"], _trellis);
  main.variable(observer("trellis")).define("trellis", ["Generators", "viewof trellis"], (G, _) => G.input(_));
  main.variable(observer("viewof slop")).define("viewof slop", ["Inputs"], _slop);
  main.variable(observer("slop")).define("slop", ["Generators", "viewof slop"], (G, _) => G.input(_));
  main.variable(observer("finger_thickness")).define("finger_thickness", _finger_thickness);
  main.variable(observer("drill_hole")).define("drill_hole", ["svg","trellis"], _drill_hole);
  main.variable(observer("drill_pattern")).define("drill_pattern", ["drill_hole"], _drill_pattern);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("finger_clockwise_v0")).define("finger_clockwise_v0", ["finger_thickness","cut_correction"], _finger_clockwise_v0);
  main.variable(observer("fingers_clockwise_v0_preview")).define("fingers_clockwise_v0_preview", ["htl","units","finger_clockwise_v0"], _fingers_clockwise_v0_preview);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("viewof l_strut")).define("viewof l_strut", ["Inputs"], _l_strut);
  main.variable(observer("l_strut")).define("l_strut", ["Generators", "viewof l_strut"], (G, _) => G.input(_));
  main.variable(observer("l_strut_svg")).define("l_strut_svg", ["l_strut","trellis","htl","units","finger_clockwise_v0","drill_pattern"], _l_strut_svg);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("square_frame_svg")).define("square_frame_svg", ["htl","units","length","slop"], _square_frame_svg);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("joint_svg")).define("joint_svg", ["l_strut","trellis","finger_thickness","htl","units","finger_clockwise_v0","drill_pattern"], _joint_svg);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("t_joint_svg")).define("t_joint_svg", ["l_strut","trellis","finger_thickness","htl","units","finger_clockwise_v0","drill_pattern"], _t_joint_svg);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("plus_joint_svg")).define("plus_joint_svg", ["l_strut","trellis","htl","units","drill_pattern"], _plus_joint_svg);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("viewof bench_corner")).define("viewof bench_corner", ["Inputs"], _bench_corner);
  main.variable(observer("bench_corner")).define("bench_corner", ["Generators", "viewof bench_corner"], (G, _) => G.input(_));
  main.variable(observer("bench_corner_svg")).define("bench_corner_svg", ["bench_corner","htl","units","cut_correction","svg"], _bench_corner_svg);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer("viewof clampConfigV1")).define("viewof clampConfigV1", ["view","Inputs","units"], _clampConfigV1);
  main.variable(observer("clampConfigV1")).define("clampConfigV1", ["Generators", "viewof clampConfigV1"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("clamp_v1_a")).define("clamp_v1_a", ["clampConfigV1","htl","units"], _clamp_v1_a);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer("clamp_v1_b")).define("clamp_v1_b", ["clampConfigV1","htl","units"], _clamp_v1_b);
  main.variable(observer()).define(["md"], _88);
  main.variable(observer("viewof clampConfigV0")).define("viewof clampConfigV0", ["view","Inputs","units"], _clampConfigV0);
  main.variable(observer("clampConfigV0")).define("clampConfigV0", ["Generators", "viewof clampConfigV0"], (G, _) => G.input(_));
  main.variable(observer("svg_clamp")).define("svg_clamp", ["clampConfigV0","htl","units"], _svg_clamp);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("viewof dimensions_l")).define("viewof dimensions_l", ["view","Inputs","units"], _dimensions_l);
  main.variable(observer("dimensions_l")).define("dimensions_l", ["Generators", "viewof dimensions_l"], (G, _) => G.input(_));
  main.variable(observer("svg_l_shape")).define("svg_l_shape", ["dimensions_l","htl","units"], _svg_l_shape);
  main.variable(observer("poll_and_download_svg")).define("poll_and_download_svg", ["download_svg"], _poll_and_download_svg);
  main.variable(observer("download_svg")).define("download_svg", ["XMLSerializer"], _download_svg);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer()).define(["viewof prompt"], _97);
  main.variable(observer()).define(["Inputs","suggestion"], _98);
  main.variable(observer()).define(["viewof suggestion"], _99);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer()).define(["viewof context_viz"], _101);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _103);
  main.variable(observer()).define(["viewof feedback_prompt"], _104);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _106);
  main.variable(observer()).define(["viewof api_endpoint"], _107);
  main.variable(observer()).define(["viewof settings"], _108);
  main.variable(observer()).define(["md"], _109);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
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
  const child2 = runtime.module(define2);
  main.import("toc", child2);
  main.variable(observer()).define(["background_tasks"], _112);
  const child3 = runtime.module(define3);
  main.import("view", child3);
  main.variable(observer("viewof bindableUISkill")).define("viewof bindableUISkill", ["view","md","Inputs","htl","Event"], _bindableUISkill);
  main.variable(observer("bindableUISkill")).define("bindableUISkill", ["Generators", "viewof bindableUISkill"], (G, _) => G.input(_));
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _116);
  return main;
}
