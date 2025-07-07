import define1 from "./f92778131fd76559@1208.js";
import define2 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# Perspective transform
## homogeneous coordinates and the camera matrix

An interactive toy that is meant to provide numerical verification of correctly operating homogeneous coordinates multiplication through a camera matrix (world to pixel conversion) and ray intersections (pixel to world picking).

The code for each step is in the burger menu on the left.

Homogeneous coordinates are a key concept in computer graphics and vision, allowing you to correctly represent perspective transformation using just linear algebra.

Often developers without a computer graphics background assume that graphics is done with 3x3 transforms and 3d points, its 3d space after all! However, this is an affine transform that cannot represent translations of the camera or perspective. The trick of homogeneous coordinates is to append an extra 1, and use a 4x4 matrix to get some extra expressivity to overcome the limitations of 3x3 transforms, whilst still being linear algebra. 

\`\`\`
[ x
  y    * M = [u/w v/w 1]
  z
  1 ]
\`\`\``
)}

function _2(md){return(
md`## Unit cube`
)}

function _3(unitVertices,htl,edges)
{
  // Projection function for isometric projection.
  function proj(x, y, z) {
    const scale = 100;
    const cos30 = 0.9;
    const sin30 = 0.3;
    const offsetX = 200;
    const offsetY = 200;
    return {
      sx: offsetX + scale * (x - z) * cos30,
      sy: offsetY + scale * ((x + z) * sin30 - y)
    };
  }

  const faceCenters = [
    { id: "p1", x: 0.5, y: 0, z: 0.5 },
    { id: "p2", x: 0.5, y: 1, z: 0.5 },
    { id: "p3", x: 0.5, y: 0.5, z: 0 },
    { id: "p4", x: 0.5, y: 0.5, z: 1 },
    { id: "p5", x: 0, y: 0.5, z: 0.5 },
    { id: "p6", x: 1, y: 0.5, z: 0.5 }
  ];

  // Precompute projected positions for vertices.
  const projVertices = new Map();
  unitVertices.forEach((v) => {
    projVertices.set(v.id, proj(v.x, v.y, v.z));
  });

  return htl.svg`<svg width="500" height="150" viewBox="0 75 500 200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .edge { stroke: #000; stroke-width: 2; }
        .vertex { fill: red; }
        .face { fill: blue; }
        .label { font-family: sans-serif; font-size: 12px; }
      </style>
      
      ${edges.map((edge) => {
        const p1 = projVertices.get(edge[0]);
        const p2 = projVertices.get(edge[1]);
        return htl.svg`<line x1=${p1.sx} y1=${p1.sy} x2=${p2.sx} y2=${p2.sy} class="edge" />`;
      })}
      
      ${unitVertices.map((v) => {
        const p = projVertices.get(v.id);
        return htl.svg`
          <circle cx=${p.sx} cy=${p.sy} r="3" class="vertex" />
          <text x=${p.sx + 5} y=${p.sy - 5} class="label">(${v.x},${v.y},${
          v.z
        })</text>
        `;
      })}
      
      ${faceCenters.map((fc) => {
        const p = proj(fc.x, fc.y, fc.z);
        return htl.svg`
          <circle cx=${p.sx} cy=${p.sy} r="3" fill="blue" />
          <text x=${p.sx + 5} y=${p.sy + 15} class="label">${fc.id} (${fc.x},${
          fc.y
        },${fc.z})</text>
        `;
      })}
    </svg>`;
}


function _4(Inputs,$0){return(
Inputs.bind(
  Inputs.form([
    Inputs.range([-180, 180], { label: "Rotation X (deg)", value: -4 }),
    Inputs.range([-180, 180], { label: "Rotation Y (deg)", value: 4 }),
    Inputs.range([-180, 180], { label: "Rotation Z (deg)", value: 0 })
  ]),
  $0
)
)}

function _5(display){return(
display()
)}

function _perspectiveCamera(view,Inputs){return(
view`<div style="font-family: sans-serif; padding: 10px; border: 1px solid #ccc; width: 300px;">
  <h2>Perspective Camera Parameters</h2>
  <div style="margin-bottom: 10px;">
    <label>Field of View (degrees)</label><br>
    ${["fov", Inputs.range([10, 120], { value: 30, step: 1 })]}
  </div>
  <div style="margin-bottom: 10px;">
    <label>Aspect Ratio</label><br>
    ${["aspect", Inputs.range([0.5, 2.0], { value: 1.0, step: 0.01 })]}
  </div>
  <div style="margin-bottom: 10px;">
    <label>Near Plane</label><br>
    ${["near", Inputs.range([0.1, 10], { value: 0.1, step: 0.1 })]}
  </div>
  <div style="margin-bottom: 10px;">
    <label>Far Plane</label><br>
    ${["far", Inputs.range([10, 1000], { value: 1000, step: 10 })]}
  </div>
</div>`
)}

function _rotationMatrix(rotation)
{
  // Convert degrees to radians.
  const degToRad = Math.PI / 180;
  // Extract rotation angles (in degrees) from the rotation UI form.
  // Assuming the order: [Rotation X, Rotation Y, Rotation Z]
  const rx = rotation[0] * degToRad;
  const ry = rotation[1] * degToRad;
  const rz = rotation[2] * degToRad;

  // Rotation matrix around X-axis.
  const Rx = [
    [1, 0, 0],
    [0, Math.cos(rx), -Math.sin(rx)],
    [0, Math.sin(rx), Math.cos(rx)]
  ];

  // Rotation matrix around Y-axis.
  const Ry = [
    [Math.cos(ry), 0, Math.sin(ry)],
    [0, 1, 0],
    [-Math.sin(ry), 0, Math.cos(ry)]
  ];

  // Rotation matrix around Z-axis.
  const Rz = [
    [Math.cos(rz), -Math.sin(rz), 0],
    [Math.sin(rz), Math.cos(rz), 0],
    [0, 0, 1]
  ];

  // Helper function to multiply two 3x3 matrices.
  function multiply3(A, B) {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result[i] = [];
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += A[i][k] * B[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  // Assume the rotation order is: first rotate around X, then Y, then Z.
  // Composite rotation matrix: R = Rz * Ry * Rx
  const Rzy = multiply3(Rz, Ry);
  const R = multiply3(Rzy, Rx);
  return R;
}


function _unitVertices(){return(
[
  { id: "v000", x: 0, y: 0, z: 0 },
  { id: "v100", x: 1, y: 0, z: 0 },
  { id: "v110", x: 1, y: 1, z: 0 },
  { id: "v010", x: 0, y: 1, z: 0 },
  { id: "v001", x: 0, y: 0, z: 1 },
  { id: "v101", x: 1, y: 0, z: 1 },
  { id: "v111", x: 1, y: 1, z: 1 },
  { id: "v011", x: 0, y: 1, z: 1 }
]
)}

function _vertices(unitVertices,rotationMatrix){return(
unitVertices.map((v) => {
  const R = rotationMatrix;
  const newX = R[0][0] * v.x + R[0][1] * v.y + R[0][2] * v.z;
  const newY = R[1][0] * v.x + R[1][1] * v.y + R[1][2] * v.z;
  const newZ = R[2][0] * v.x + R[2][1] * v.y + R[2][2] * v.z;
  return { ...v, x: newX, y: newY, z: newZ + 10 };
})
)}

function _edges(){return(
[
  ["v000", "v100"],
  ["v100", "v110"],
  ["v110", "v010"],
  ["v010", "v000"],
  ["v001", "v101"],
  ["v101", "v111"],
  ["v111", "v011"],
  ["v011", "v001"],
  ["v000", "v001"],
  ["v100", "v101"],
  ["v110", "v111"],
  ["v010", "v011"]
]
)}

function _11(md,tex,perspectiveCamera){return(
md`
# Perspective Camera Model

In a perspective camera model, 3D points in the camera’s coordinate system (expressed in homogeneous coordinates as ${tex`[x, y, z, 1]^T`}) are projected onto the 2D image plane using a projection matrix. This projection matrix is often referred to as the **homography matrix** in the context of transforming points from 3D camera space to 2D screen space, although strictly speaking it involves a perspective divide.

## Projection Matrix

A common form of the 4×4 perspective projection matrix is:

${tex`
[
  P = \begin{bmatrix}
    \frac{f}{a} & 0 & 0 & 0 \\
    0 & f & 0 & 0 \\
    0 & 0 & \frac{(f_{far}+n)}{(n - f_{far})} & \frac{2 f_{far} n}{(n - f_{far})} \\
    0 & 0 & -1 & 0
  \end{bmatrix}
]
`}

Where:

- **fov** is the field of view in degrees.
- ${tex`f = \frac{1}{\tan(\frac{fov}{2})}`} serves as a focal length in normalized units.
- ${tex`a`} is the aspect ratio (width/height) of the image.
- ${tex`n`} is the distance to the **near plane**.
- ${tex`f_{far}`} is the distance to the **far plane**.

## Numerical Example

For our parameters from the Perspective Camera UI:

- fov = \`${perspectiveCamera.fov.toFixed(0)}°\`
- aspect = \`${perspectiveCamera.aspect.toFixed(2)}\`
- near = \`${perspectiveCamera.near.toFixed(1)}\`
- far = \`${perspectiveCamera.far.toFixed(0)}\`

Let’s compute:

1. **Focal length:**  
${tex`
f = \frac{1}{\tan\Big(\frac{${perspectiveCamera.fov.toFixed(
  0
)}}{2}\text{°}\Big)}
\approx ${(1 / Math.tan((perspectiveCamera.fov * Math.PI) / 360)).toFixed(3)}
`}

2. **Third row, first element:**  
${tex`
\frac{(f_{far}+n)}{(n - f_{far})} = \frac{${perspectiveCamera.far.toFixed(
  0
)} + ${perspectiveCamera.near.toFixed(1)}}{${perspectiveCamera.near.toFixed(
  1
)} - ${perspectiveCamera.far.toFixed(0)}}
\approx ${(
  (perspectiveCamera.far + perspectiveCamera.near) /
  (perspectiveCamera.near - perspectiveCamera.far)
).toFixed(4)}
`}

3. **Third row, second element:**  
${tex`
\frac{2 f_{far} n}{(n - f_{far})} = \frac{2 \cdot ${perspectiveCamera.far.toFixed(
  0
)} \cdot ${perspectiveCamera.near.toFixed(1)}}{${perspectiveCamera.near.toFixed(
  1
)} - ${perspectiveCamera.far.toFixed(0)}}
\approx ${(
  (2 * perspectiveCamera.far * perspectiveCamera.near) /
  (perspectiveCamera.near - perspectiveCamera.far)
).toFixed(4)}
`}

`
)}

function _13(md,tex,perspectiveCamera,vertices){return(
md`
### Symbolic projection

${tex`
\quad
\underbrace{
\begin{pmatrix}
\dfrac{f}{a} & 0 & 0 & 0 \\[8pt]
0 & f & 0 & 0 \\[8pt]
0 & 0 & \dfrac{f_{far}+n}{n-f_{far}} & \dfrac{2 f_{far} n}{n-f_{far}} \\[8pt]
0 & 0 & -1 & 0 
\end{pmatrix}
}_{\displaystyle M}
\quad
\begin{pmatrix} x \\ y \\ z \\ 1 \end{pmatrix}
=
\begin{pmatrix} x^{ndc}_1 \\ y^{ndc}_1 \\ z^{ndc}_1 \\ w_1 \end{pmatrix}
`}


### Live Values Projection (for vertex ${tex`(v_{100})`}):

${tex`
\quad
\underbrace{
\begin{pmatrix}
${(
  1 /
  Math.tan((perspectiveCamera.fov * Math.PI) / 360) /
  perspectiveCamera.aspect
).toFixed(3)} & 0 & 0 & 0 \\[8pt]
0 & ${(1 / Math.tan((perspectiveCamera.fov * Math.PI) / 360)).toFixed(
  3
)} & 0 & 0 \\[8pt]
0 & 0 & ${(
  (perspectiveCamera.far + perspectiveCamera.near) /
  (perspectiveCamera.near - perspectiveCamera.far)
).toFixed(3)} & ${(
  (2 * perspectiveCamera.far * perspectiveCamera.near) /
  (perspectiveCamera.near - perspectiveCamera.far)
).toFixed(3)} \\[8pt]
0 & 0 & -1 & 0 
\end{pmatrix}
}_{\displaystyle M_{live}}
\quad
\begin{pmatrix} 
${vertices.find((v) => v.id === "v100").x.toFixed(3)} \\ 
${vertices.find((v) => v.id === "v100").y.toFixed(3)} \\ 
${vertices.find((v) => v.id === "v100").z.toFixed(3)} \\ 
1 
\end{pmatrix}
=
\begin{pmatrix}
${(
  (1 /
    Math.tan((perspectiveCamera.fov * Math.PI) / 360) /
    perspectiveCamera.aspect) *
  vertices.find((v) => v.id === "v100").x
).toFixed(3)} \\[8pt]
${(
  (1 / Math.tan((perspectiveCamera.fov * Math.PI) / 360)) *
  vertices.find((v) => v.id === "v100").y
).toFixed(3)} \\[8pt]
${(
  ((perspectiveCamera.far + perspectiveCamera.near) /
    (perspectiveCamera.near - perspectiveCamera.far)) *
    vertices.find((v) => v.id === "v100").z +
  (2 * perspectiveCamera.far * perspectiveCamera.near) /
    (perspectiveCamera.near - perspectiveCamera.far)
).toFixed(3)} \\[8pt]
${(-vertices.find((v) => v.id === "v100").z).toFixed(3)}
\end{pmatrix}
`}
`
)}

function _14(Inputs,$0){return(
Inputs.bind(
  Inputs.form([
    Inputs.range([-180, 180], {
      label: "Rotation X (deg)",
      value: -4,
      disabled: true
    }),
    Inputs.range([-180, 180], { label: "Rotation Y (deg)", value: 4 }),
    Inputs.range([-180, 180], { label: "Rotation Z (deg)", value: 0 })
  ]),
  $0
)
)}

function _perspectiveCameraMatrix(perspectiveCamera)
{
  // Extract perspective camera parameters from the UI cell.
  const { fov, aspect, near, far } = perspectiveCamera;
  // Compute focal length from the fov (in degrees)
  const f = 1 / Math.tan((fov * Math.PI) / 360);
  // Construct the 4x4 perspective projection matrix:
  // [ f/aspect   0           0                        0 ]
  // [ 0         f           0                        0 ]
  // [ 0         0   (far+near)/(near-far)   (2*far*near)/(near-far) ]
  // [ 0         0          -1                        0 ]
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)],
    [0, 0, -1, 0]
  ];
}


function _multiplyMatrixAndVector(){return(
function multiplyMatrixAndVector(matrix, vector) {
  const result = [];
  for (let i = 0; i < 4; i++) {
    let sum = 0;
    for (let j = 0; j < 4; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return result;
}
)}

function _projectedPoints(vertices,multiplyMatrixAndVector,perspectiveCameraMatrix)
{
  return vertices.map((v) => {
    const vec = [v.x, v.y, v.z, 1];
    const result = multiplyMatrixAndVector(perspectiveCameraMatrix, vec);
    const [x, y, z, w] = result;
    // NDC coordinates after perspective division:
    return {
      id: v.id,
      homogeneous: result,
      x_ndc: x / w,
      y_ndc: y / w,
      z_ndc: z / w
    };
  });
}


function _18(display){return(
display()
)}

function _display(Plot,rayCastPoint,projectedPoints,edges,faceSet){return(
() => {

  return Plot.plot({
    title: "camera 1 with highlighted face edges",
    grid: true,
    inset: 20,
    aspectRatio: 1,
    x: {
      label: "Normalized Device X (x_ndc)",
      domain: [-1, 1]
    },
    y: {
      label: "Normalized Device Y (y_ndc)",
      domain: [-1, 1]
    },
    marks: [
      Plot.dot([rayCastPoint], {
        r: 10,
        stroke: "blue"
      }),
      Plot.dot(projectedPoints, {
        x: "x_ndc",
        y: "y_ndc",
        r: 5,
        fill: "steelblue"
      }),
      Plot.text(projectedPoints, {
        x: "x_ndc",
        y: "y_ndc",
        text: (d) => `${d.id}: (${d.x_ndc.toFixed(2)}, ${d.y_ndc.toFixed(2)})`,
        dx: 8,
        dy: -4,
        fontSize: 10
      }),
      Plot.arrow(
        edges.map((edge) => {
          const source = projectedPoints.find((d) => d.id === edge[0]);
          const target = projectedPoints.find((d) => d.id === edge[1]);
          return {
            x1: source.x_ndc,
            y1: source.y_ndc,
            x2: target.x_ndc,
            y2: target.y_ndc,
            // Highlight edge if both endpoints are part of the face.
            highlight: faceSet.has(source.id) && faceSet.has(target.id)
          };
        }),
        {
          x1: (d) => d.x1,
          y1: (d) => d.y1,
          x2: (d) => d.x2,
          y2: (d) => d.y2,
          bend: false,
          strokeWidth: 2,
          strokeLinejoin: "miter",
          headLength: 12,
          inset: 0,
          stroke: (d) => (d.highlight ? "red" : "grey")
        }
      )
    ]
  });
}
)}

function _20(md){return(
md`## Ray casting`
)}

function _faceSet(){return(
new Set(["v000", "v100", "v110", "v010"])
)}

function _22(Inputs,$0){return(
Inputs.bind(
  Inputs.form([
    Inputs.range([-1, 1], { label: "ray x_ndc", value: 0, step: 0.01 }),
    Inputs.range([-1, 1], { label: "ray y_ndc", value: 0, step: 0.01 })
  ]),
  $0
)
)}

function _unprojectRay(perspectiveCamera){return(
(rayCastPoint, depth) => {
  // Given a 2D rayCastPoint in normalized device coordinates [ndc_x, ndc_y]
  // and a depth value (assumed to be the camera space z coordinate),
  // return the corresponding world space coordinate.
  //
  // In our projection:
  //   ndc_x = (f/aspect * x) / (-z)
  //   ndc_y = (f * y) / (-z)
  // Thus, inverting these relations (noting z = depth):
  //   x = -ndc_x * depth * aspect / f
  //   y = -ndc_y * depth / f
  //   z = depth
  //
  // Note: This assumes that the projection matrix has no additional view transform,
  // meaning that the camera coordinate system aligns with world space.
  //
  // Retrieve the camera parameters from the perspectiveCamera interactive cell.
  const { fov, aspect } = perspectiveCamera;
  // Compute focal length from field-of-view (in degrees).
  const f = 1 / Math.tan((fov * Math.PI) / 360);
  const [ndc_x, ndc_y] = rayCastPoint;
  const x = (-ndc_x * depth * aspect) / f;
  const y = (-ndc_y * depth) / f;
  return { x, y, z: depth };
}
)}

function _24(md){return(
md`we find where our ray cast hits the v000, v100, v110 face (without consideration to boundary)`
)}

function _intersectionPoint(vertices,unprojectRay,rayCastPoint)
{
  // Identify the three vertices defining the face.
  // v000: (0,0,0), v100: (1,0,0), v110: (1,1,0) (after applying rotation and translation).
  const A = vertices.find((v) => v.id === "v000"),
    B = vertices.find((v) => v.id === "v100"),
    C = vertices.find((v) => v.id === "v110");

  // Compute two edge vectors of the plane.
  const edge1 = {
    x: B.x - A.x,
    y: B.y - A.y,
    z: B.z - A.z
  };
  const edge2 = {
    x: C.x - A.x,
    y: C.y - A.y,
    z: C.z - A.z
  };

  // Compute the normal of the plane via cross product.
  const n = {
    x: edge1.y * edge2.z - edge1.z * edge2.y,
    y: edge1.z * edge2.x - edge1.x * edge2.z,
    z: edge1.x * edge2.y - edge1.y * edge2.x
  };

  // Define the ray:
  // The camera is at the origin (0,0,0).
  // Compute a point along the ray using unprojectRay with an arbitrary depth (here 1) to determine its direction.
  const p1 = unprojectRay(rayCastPoint, 1);
  const dMag = Math.hypot(p1.x, p1.y, p1.z);
  const rayDir = {
    x: p1.x / dMag,
    y: p1.y / dMag,
    z: p1.z / dMag
  };

  // Ray equation: R(t) = origin + t * rayDir, where origin is (0,0,0).
  // Find t such that the point lies on the plane defined by A and normal n.
  // The plane equation is (P - A) · n = 0. For the ray, P = t * rayDir.
  // Solve: (t * rayDir - A) · n = 0  =>  t = (A · n) / (rayDir · n).
  const numerator = A.x * n.x + A.y * n.y + A.z * n.z;
  const denominator = rayDir.x * n.x + rayDir.y * n.y + rayDir.z * n.z;
  const t = numerator / denominator;

  // The intersection point:
  return {
    x: rayDir.x * t,
    y: rayDir.y * t,
    z: rayDir.z * t,
    t
  };
}


function _26(md){return(
md`By projecting our intersection back through the camera projection, we can check it matches the original ray cast position (it does)`
)}

function _projectedIntersection(intersectionPoint,perspectiveCameraMatrix)
{
  // Compute homogeneous coordinate for the intersection point:
  // Create a 4D vector (x, y, z, 1) from intersectionPoint.
  const vec = [
    intersectionPoint.x,
    intersectionPoint.y,
    intersectionPoint.z,
    1
  ];

  // Multiply by the perspectiveCameraMatrix.
  function multiplyMatrixVector(matrix, vector) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      let sum = 0;
      for (let j = 0; j < 4; j++) {
        sum += matrix[i][j] * vector[j];
      }
      result.push(sum);
    }
    return result;
  }
  const result = multiplyMatrixVector(perspectiveCameraMatrix, vec);
  const [x, y, z, w] = result;

  // Compute normalized device coordinates (NDC) by performing perspective division.
  const ndc_x = x / w;
  const ndc_y = y / w;
  return { x: ndc_x, y: ndc_y };
}


function _28(md){return(
md`## Movable second camera

We can't really see the ray intersection with the cube face because the ray is parallel with the view.

So lets add a second camera that can orbit around the cube at (0, 0, 10). This camera will also demonstrate how the homograph matrix is capable to representing repositioning of the camera (translation).`
)}

function _viewMatrix(orbit_angle)
{
  // Fixed implementation of a lookAt view matrix.
  const degToRad = Math.PI / 180;
  const orbit = orbit_angle * degToRad;
  // Define orbit parameters.
  const orbitRadius = 10; // distance from cube center
  // Define the center of the cube (average of vertices, after translation)
  const center = [0.5, 0.5, 10.5];
  // Compute the eye (camera) position on the orbit (in XZ plane, keeping y constant)
  const eye = [
    center[0] + orbitRadius * Math.cos(orbit),
    center[1],
    center[2] + orbitRadius * Math.sin(orbit)
  ];
  // Define the up vector.
  const up = [0, 1, 0];

  // Helper functions.
  function subtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
  function normalize(v) {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / len, v[1] / len, v[2] / len];
  }
  function cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  // Compute the forward, right, and true up vectors.
  // Notice: in a standard lookAt, the forward vector z is defined as normalize(eye - center)
  const zAxis = normalize(subtract(eye, center));
  const xAxis = normalize(cross(up, zAxis));
  const yAxis = cross(zAxis, xAxis);

  // Build the view matrix in row-major order.
  // The matrix transforms world coordinates into camera space.
  return [
    [xAxis[0], xAxis[1], xAxis[2], -dot(xAxis, eye)],
    [yAxis[0], yAxis[1], yAxis[2], -dot(yAxis, eye)],
    [zAxis[0], zAxis[1], zAxis[2], -dot(zAxis, eye)],
    [0, 0, 0, 1]
  ];
}


function _secondCameraHomographyMatrix(perspectiveCamera,viewMatrix)
{
  

  // Build the perspective projection matrix using current camera parameters.
  // Using the standard OpenGL-style perspective projection.
  const { fov, aspect, near, far } = perspectiveCamera;
  const f = 1 / Math.tan((fov * Math.PI) / 360);
  const projMatrix = [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)],
    [0, 0, -1, 0]
  ];

  // Multiply the projection matrix by the view matrix to obtain the homograph matrix.
  function multiplyMatrices(a, b) {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result[i] = [];
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  const homographMatrix = multiplyMatrices(projMatrix, viewMatrix);
  return homographMatrix;
}


function _secondProjectedPoints(vertices,multiplyMatrixAndVector,secondCameraHomographyMatrix)
{
  return vertices.map((v) => {
    const vec = [v.x, v.y, v.z, 1];
    const result = multiplyMatrixAndVector(secondCameraHomographyMatrix, vec);
    const [x, y, z, w] = result;
    // NDC coordinates after perspective division:
    return {
      id: v.id,
      homogeneous: result,
      x_ndc: x / w,
      y_ndc: y / w,
      z_ndc: z / w
    };
  });
}


function _secondRayPoints(intersectionPoint,multiplyMatrixAndVector,secondCameraHomographyMatrix)
{
  return [{ id: "ray_s", x: 0, y: 0, z: 0 }, intersectionPoint].map((v) => {
    const vec = [v.x, v.y, v.z, 1];
    const result = multiplyMatrixAndVector(secondCameraHomographyMatrix, vec);
    const [x, y, z, w] = result;
    // NDC coordinates after perspective division:
    return {
      id: v.id,
      homogeneous: result,
      x_ndc: x / w,
      y_ndc: y / w,
      z_ndc: z / w
    };
  });
}


function _33(unprojectRay,rayCastPoint){return(
unprojectRay(rayCastPoint, 0)
)}

function _34(Plot,secondRayPoints,secondProjectedPoints,edges,faceSet){return(
Plot.plot({
  title: "camera 2",
  grid: true,
  inset: 20,
  aspectRatio: 1,
  x: { label: "Normalized Device X (x_ndc)", domain: [-1, 1] },
  y: { label: "Normalized Device Y (y_ndc)", domain: [-1, 1] },
  marks: [
    Plot.arrow([secondRayPoints], {
      x1: (d) => d[0].x_ndc,
      x2: (d) => d[1].x_ndc,
      y1: (d) => d[0].y_ndc,
      y2: (d) => d[1].y_ndc,
      stroke: "blue"
    }),
    Plot.dot(secondProjectedPoints, {
      x: "x_ndc",
      y: "y_ndc",
      r: 5,
      fill: "steelblue"
    }),
    Plot.text(secondProjectedPoints, {
      x: "x_ndc",
      y: "y_ndc",
      text: (d) => `${d.id}: (${d.x_ndc.toFixed(2)}, ${d.y_ndc.toFixed(2)})`,
      dx: 8,
      dy: -4,
      fontSize: 10
    }),
    Plot.arrow(
      edges.map((edge) => {
        const source = secondProjectedPoints.find((d) => d.id === edge[0]);
        const target = secondProjectedPoints.find((d) => d.id === edge[1]);
        return {
          x1: source.x_ndc,
          y1: source.y_ndc,
          x2: target.x_ndc,
          y2: target.y_ndc,
          // Highlight edge if both endpoints are part of the face.
          highlight: faceSet.has(source.id) && faceSet.has(target.id)
        };
      }),
      {
        x1: (d) => d.x1,
        y1: (d) => d.y1,
        x2: (d) => d.x2,
        y2: (d) => d.y2,
        bend: false,
        strokeWidth: 2,
        strokeLinejoin: "miter",
        headLength: 12,
        inset: 0,
        stroke: (d) => (d.highlight ? "red" : "grey")
      }
    )
  ]
})
)}

function _orbit_angle(Inputs){return(
Inputs.range([-180, 180], {
  label: "Orbit angle (degrees)"
})
)}

function _36(Inputs,$0){return(
Inputs.bind(
  Inputs.form([
    Inputs.range([-1, 1], { label: "ray x_ndc", value: 0, step: 0.01 }),
    Inputs.range([-1, 1], { label: "ray y_ndc", value: 0, step: 0.01 })
  ]),
  $0
)
)}

function _37(Inputs,$0){return(
Inputs.bind(
  Inputs.form([
    Inputs.range([-180, 180], { label: "Rotation X (deg)", value: -4 }),
    Inputs.range([-180, 180], { label: "Rotation Y (deg)", value: 4 }),
    Inputs.range([-180, 180], { label: "Rotation Z (deg)", value: 0 })
  ]),
  $0
)
)}

function _rotation(Inputs){return(
Inputs.input([0, 0, 0])
)}

function _rayCastPoint(Inputs){return(
Inputs.input([-0.18, -0.1])
)}

function _41(highlight,viewMatrix){return(
highlight(viewMatrix)
)}

function _42($0){return(
$0
)}

function _43(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _44($0){return(
$0
)}

function _45(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _46($0){return(
$0
)}

function _47(md){return(
md`### AI Settings`
)}

function _48($0){return(
$0
)}

function _49($0){return(
$0
)}

function _50($0){return(
$0
)}

function _51(md){return(
md`---`
)}

function _background_tasks(_background_tasks){return(
_background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["unitVertices","htl","edges"], _3);
  main.variable(observer()).define(["Inputs","viewof rotation"], _4);
  main.variable(observer()).define(["display"], _5);
  main.variable(observer("viewof perspectiveCamera")).define("viewof perspectiveCamera", ["view","Inputs"], _perspectiveCamera);
  main.variable(observer("perspectiveCamera")).define("perspectiveCamera", ["Generators", "viewof perspectiveCamera"], (G, _) => G.input(_));
  main.variable(observer("rotationMatrix")).define("rotationMatrix", ["rotation"], _rotationMatrix);
  main.variable(observer("unitVertices")).define("unitVertices", _unitVertices);
  main.variable(observer("vertices")).define("vertices", ["unitVertices","rotationMatrix"], _vertices);
  main.variable(observer("edges")).define("edges", _edges);
  main.variable(observer()).define(["md","tex","perspectiveCamera"], _11);
  main.variable(observer()).define(["md","tex","perspectiveCamera","vertices"], _13);
  main.variable(observer()).define(["Inputs","viewof rotation"], _14);
  main.variable(observer("perspectiveCameraMatrix")).define("perspectiveCameraMatrix", ["perspectiveCamera"], _perspectiveCameraMatrix);
  main.variable(observer("multiplyMatrixAndVector")).define("multiplyMatrixAndVector", _multiplyMatrixAndVector);
  main.variable(observer("projectedPoints")).define("projectedPoints", ["vertices","multiplyMatrixAndVector","perspectiveCameraMatrix"], _projectedPoints);
  main.variable(observer()).define(["display"], _18);
  main.variable(observer("display")).define("display", ["Plot","rayCastPoint","projectedPoints","edges","faceSet"], _display);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("faceSet")).define("faceSet", _faceSet);
  main.variable(observer()).define(["Inputs","viewof rayCastPoint"], _22);
  main.variable(observer("unprojectRay")).define("unprojectRay", ["perspectiveCamera"], _unprojectRay);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("intersectionPoint")).define("intersectionPoint", ["vertices","unprojectRay","rayCastPoint"], _intersectionPoint);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("projectedIntersection")).define("projectedIntersection", ["intersectionPoint","perspectiveCameraMatrix"], _projectedIntersection);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewMatrix")).define("viewMatrix", ["orbit_angle"], _viewMatrix);
  main.variable(observer("secondCameraHomographyMatrix")).define("secondCameraHomographyMatrix", ["perspectiveCamera","viewMatrix"], _secondCameraHomographyMatrix);
  main.variable(observer("secondProjectedPoints")).define("secondProjectedPoints", ["vertices","multiplyMatrixAndVector","secondCameraHomographyMatrix"], _secondProjectedPoints);
  main.variable(observer("secondRayPoints")).define("secondRayPoints", ["intersectionPoint","multiplyMatrixAndVector","secondCameraHomographyMatrix"], _secondRayPoints);
  main.variable(observer()).define(["unprojectRay","rayCastPoint"], _33);
  main.variable(observer()).define(["Plot","secondRayPoints","secondProjectedPoints","edges","faceSet"], _34);
  main.variable(observer("viewof orbit_angle")).define("viewof orbit_angle", ["Inputs"], _orbit_angle);
  main.variable(observer("orbit_angle")).define("orbit_angle", ["Generators", "viewof orbit_angle"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof rayCastPoint"], _36);
  main.variable(observer()).define(["Inputs","viewof rotation"], _37);
  main.variable(observer("viewof rotation")).define("viewof rotation", ["Inputs"], _rotation);
  main.variable(observer("rotation")).define("rotation", ["Generators", "viewof rotation"], (G, _) => G.input(_));
  main.variable(observer("viewof rayCastPoint")).define("viewof rayCastPoint", ["Inputs"], _rayCastPoint);
  main.variable(observer("rayCastPoint")).define("rayCastPoint", ["Generators", "viewof rayCastPoint"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer()).define(["highlight","viewMatrix"], _41);
  main.variable(observer()).define(["viewof prompt"], _42);
  main.variable(observer()).define(["Inputs","suggestion"], _43);
  main.variable(observer()).define(["viewof suggestion"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["viewof context_viz"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _48);
  main.variable(observer()).define(["viewof api_endpoint"], _49);
  main.variable(observer()).define(["viewof settings"], _50);
  main.variable(observer()).define(["md"], _51);
  const child2 = runtime.module(define2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("on_prompt", child2);
  main.import("variables", child2);
  main.import("api_call_response", child2);
  main.import("background_tasks", "_background_tasks", child2);
  main.import("_ndd", child2);
  main.import("instruction", child2);
  main.import("highlight", child2);
  main.import("mutable context", child2);
  main.import("context", child2);
  main.import("viewof prompt", child2);
  main.import("prompt", child2);
  main.import("viewof suggestion", child2);
  main.import("suggestion", child2);
  main.import("viewof settings", child2);
  main.import("settings", child2);
  main.import("viewof OPENAI_API_KEY", child2);
  main.import("OPENAI_API_KEY", child2);
  main.import("viewof api_endpoint", child2);
  main.import("api_endpoint", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer("background_tasks")).define("background_tasks", ["_background_tasks"], _background_tasks);
  return main;
}
