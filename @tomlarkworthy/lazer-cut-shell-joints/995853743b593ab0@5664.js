import define1 from "./f92778131fd76559@1174.js";
import define2 from "./1117987aeab1be0d@4174.js";
import define3 from "./c7a3b20cec5d4dd9@690.js";
import define4 from "./17c8ce433e1df58e@2490.js";
import define5 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Lazer Cutting Box Joint Plan Generator
`
)}

function _boxParams(view,Inputs)
{
  ({
    prompt:
      "Generate a UI for a box. It should let the width, height and depth be set with a green build button",
    time: 1715503629215,
    comment:
      "Create a UI for setting up a box with width, height, and depth inputs and a green build button."
  });
  const form = view`<div>
    <h3>Box Template</h3>
    ${[
      "width",
      Inputs.range([0, 1000], { label: "width (mm)", value: 10, step: 0.1 })
    ]}  
    ${[
      "height",
      Inputs.range([0, 1000], {
        label: "height (mm)",
        value: 22,
        step: 0.1
      })
    ]}  
    ${[
      "depth",
      Inputs.range([0, 1000], { label: "depth (mm)", value: 16, step: 0.1 })
    ]}
    ${["details", Inputs.toggle({ label: "debug details", value: false })]}
  `;

  return form;
}


function _apply_box(boxParams,Vector3,$0,Event)
{
  ({
    prompt:
      "Convert the box template params into an array of rectangular surfaces and assign to surfaces view and also calculate the tight fitting bounds and assign to the bounds view",
    time: 1715503629215
  });
  const params = [boxParams.width, boxParams.height, boxParams.depth].map(
    (value, dim) => ({
      constant: value / 2,
      normal: new Vector3(dim == 0 ? 1 : 0, dim == 1 ? 1 : 0, dim == 2 ? 1 : 0),
      bounds: [-value / 2, value / 2]
    })
  );
  const w = boxParams.width / 2;
  const h = boxParams.height / 2;
  const d = boxParams.depth / 2;
  $0.value = [
    // Front face
    [
      [-w, -h, d],
      [w, -h, d],
      [w, h, d],
      [-w, h, d]
    ],
    // [
    //   [w, h, d],
    //   [w, h + 5, d],
    //   [w - 5, h + 5, d],
    //   [w - 5, h, d]
    // ],
    [
      // Back face
      [-w, h, -d],
      [w, h, -d],
      [w, -h, -d],
      [-w, -h, -d]
    ],
    // [
    //   [w - 5, h, -d],
    //   [w - 5, h + 5, -d],
    //   [w, h + 5, -d],
    //   [w, h, -d]
    // ],
    // Top face
    [
      [-w, h, d],
      [w, h, d],
      [w, h, -d],
      [-w, h, -d]
    ],
    // [
    //   [-w, h, d - 5],
    //   [-w - 5, h, d - 5],
    //   [-w - 5, h, d],
    //   [-w, h, d]
    // ],
    // Bottom face
    [
      [-w, -h, -d],
      [w, -h, -d],
      [w, -h, d],
      [-w, -h, d]
    ],
    // Right face
    [
      [w, -h, -d],
      [w, h, -d],
      [w, h, d],
      [w, -h, d]
    ],
    // Left face
    [
      [-w, -h, d],
      [-w, h, d],
      [-w, h, -d],
      [-w, -h, -d]
    ]
    // [
    //   [-w, h + 5, -d],
    //   [-w, h, -d],
    //   [-w, h, -d + 5],
    //   [-w, h + 5, -d + 5]
    // ]
  ];
  $0.dispatchEvent(new Event("input"));
  return params;
}


function _flangeParams(view,Inputs){return(
{
  prompt:
    "Write a UI for a Flange Template. Requires flange diameter, inner width, inner heigh, depth",
  time: 1715628254526,
  comment:
    "Create a UI for setting up a flange with inputs for flange diameter, inner width, inner height, and depth, along with a green apply button."
} &&
  view`<div>
    <h3>Flange Template</h3>
    ${[
      "flange_diameter",
      Inputs.range([0, 2000], {
        label: "Flange Diameter (mm)",
        value: 40,
        step: 1
      })
    ]}
    ${[
      "inner_width",
      Inputs.range([0, 2000], {
        label: "Inner Width (mm)",
        value: 18,
        step: 1
      })
    ]}
    ${[
      "inner_height",
      Inputs.range([0, 2000], {
        label: "Inner Height (mm)",
        value: 18,
        step: 1
      })
    ]}
    ${[
      "depth",
      Inputs.range([0, 200], { label: "Depth (mm)", value: 12, step: 1 })
    ]}
  `
)}

function _apply_flange(flangeParams,$0,Event)
{
  ({
    prompt:
      "Convert the flange template params into an array of rectangular surfaces and assign to surfaces view and also calculate the tight fitting bounds and assign to the bounds view. A flange will need 4 rectangles on the base (XZ plane) to form an O shape, then 4 perpendicular rectangular inner sides",
    time: 1715629264694,
    comment:
      "Convert the flange parameters into an array of rectangular surfaces for the base and inner sides, forming an 'O' shape."
  });

  const { flange_diameter, inner_width, inner_height, depth } = flangeParams;

  const flange_radius = flange_diameter / 2;
  const outer_rectangles = [
    [
      [-(inner_width / 2), 0, -(flange_diameter / 2)],
      [-(inner_width / 2), 0, inner_height / 2],
      [-(flange_diameter / 2), 0, inner_height / 2],
      [-(flange_diameter / 2), 0, -(flange_diameter / 2)]
    ],
    [
      [inner_width / 2, 0, flange_diameter / 2],
      [inner_width / 2, 0, -inner_height / 2],
      [flange_diameter / 2, 0, -inner_height / 2],
      [flange_diameter / 2, 0, flange_diameter / 2]
    ],
    [
      [flange_diameter / 2, 0, -inner_height / 2],
      [-inner_width / 2, 0, -inner_height / 2],
      [-inner_width / 2, 0, -flange_diameter / 2],
      [flange_diameter / 2, 0, -flange_diameter / 2]
    ],
    [
      [-flange_diameter / 2, 0, inner_height / 2],
      [inner_width / 2, 0, inner_height / 2],
      [inner_width / 2, 0, flange_diameter / 2],
      [-flange_diameter / 2, 0, flange_diameter / 2]
    ]
  ];

  const inner_rectangles = [
    // Left
    [
      [-(inner_width / 2), 0, -(inner_height / 2)],
      [-(inner_width / 2), depth, -(inner_height / 2)],
      [inner_width / 2, depth, -(inner_height / 2)],
      [inner_width / 2, 0, -(inner_height / 2)]
    ],
    // Right
    [
      [inner_width / 2, 0, inner_height / 2],
      [inner_width / 2, depth, inner_height / 2],
      [-(inner_width / 2), depth, inner_height / 2],
      [-(inner_width / 2), 0, inner_height / 2]
    ],
    // Front
    [
      [inner_width / 2, 0, -(inner_height / 2)],
      [inner_width / 2, depth, -(inner_height / 2)],
      [inner_width / 2, depth, inner_height / 2],
      [inner_width / 2, 0, inner_height / 2]
    ],
    // Back
    [
      [-(inner_width / 2), 0, inner_height / 2],
      [-(inner_width / 2), depth, inner_height / 2],
      [-(inner_width / 2), depth, -(inner_height / 2)],
      [-(inner_width / 2), 0, -(inner_height / 2)]
    ]
  ];

  $0.value = [...outer_rectangles, ...inner_rectangles];
  $0.dispatchEvent(new Event("input"));
}


function _6(renderer,focusPart,htl){return(
htl.html`<div style="display: flex">
  ${renderer.domElement}
  <div>
    ${focusPart}
  <div>
</div>`
)}

function _stepEffect($0,$1,$2,$3,$4,$5,step,Event)
{
  const stepMap = [
    [0],
    [1],
    [2],
    [3],
    [2, 3],
    [1, 2, 3],
    [4],
    [2, 3, 5],
    [2, 5]
  ];
  const controls = [
    $0,
    $1,
    $2,
    $3,
    $4,
    $5
  ];
  controls.forEach((c) => (c.value = false));
  stepMap[step].forEach((i) => (controls[i].value = true));
  controls.forEach((c) => c.dispatchEvent(new Event("input")));
}


function _spin(Inputs){return(
Inputs.toggle({ label: "spin", value: true })
)}

function _step(Inputs){return(
Inputs.range([0, 8], {
  label: "algorithm step",
  step: 1,
  value: 8
})
)}

function _focusSurfaceIdx(Inputs,surfaces){return(
Inputs.range([-1, surfaces.length - 1], {
  label: "focus surface",
  value: -1,
  step: 1
})
)}

function _focusPlaneIdx(Inputs,surface_planes){return(
Inputs.range([-1, surface_planes.length - 1], {
  label: "focus plane",
  value: -1,
  step: 1
})
)}

function _focusJointIdx(Inputs,joints){return(
Inputs.range([-1, joints.length - 1], {
  label: "focus joint",
  value: -1,
  step: 1
})
)}

function _scale(Inputs){return(
Inputs.range([0.01, 10], {
  label: "part scale",
  value: 3
})
)}

function _material_thickness(Inputs){return(
Inputs.range([0.01, 8], {
  label: "material thickness",
  value: 3
})
)}

function _fingerWidth(Inputs){return(
Inputs.range([0.1, 10], {
  label: "finger widths",
  value: 3,
  step: 0.1
})
)}

function _17(md){return(
md`## Algorithm`
)}

function _surfaces(Inputs){return(
Inputs.input([
  // strut 1
  [
    [-10, 1, 1],
    [0, 1, 1],
    [0, -2, 1],
    [-10, -2, 1]
  ],
  [
    [-10, 1, -1],
    [0, 1, -1],
    [0, -2, -1],
    [-10, -2, -1]
  ],
  [
    [-10, 1, -1],
    [0, 1, -1],
    [0, 1, 1],
    [-10, 1, 1]
  ],
  [
    [-10, -2, -1],
    [0, -2, -1],
    [0, -2, 1],
    [-10, -2, 1]
  ],
  // strut 2
  [
    [0, -10, 1],
    [0, 1, 1],
    [2, 1, 1],
    [2, -10, 1]
  ],
  [
    [2, -10, 1],
    [2, 1, 1],
    [2, 1, -4],
    [2, -10, -4]
  ],
  [
    [0, -10, 1],
    [0, 1, 1],
    [0, 1, -4],
    [0, -10, -4]
  ],
  [
    [0, -10, -4],
    [0, 1, -4],
    [2, 1, -4],
    [2, -10, -4]
  ]
])
)}

function _surface_planes(dedupe,eq,surfaces,surfaceToPlane){return(
dedupe(eq, surfaces.map(surfaceToPlane))
)}

function _20(md){return(
md`### Project surfaces to 2D paths and simplify`
)}

function _showSurfaces(Inputs){return(
Inputs.toggle({
  label: "show surfaces?",
  value: true
})
)}

function _vectorSurfaces(surfaces,Vector3){return(
surfaces.map((points) =>
  points.map((point) => new Vector3(...point))
)
)}

function _focusSurface(vectorSurfaces,focusSurfaceIdx){return(
vectorSurfaces[focusSurfaceIdx]
)}

function _24(Inputs,surface_planes,$0){return(
Inputs.bind(
  Inputs.range([-1, surface_planes.length - 1], {
    label: "focus plane",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _focusPlane(surface_planes,focusPlaneIdx){return(
surface_planes[focusPlaneIdx]
)}

function _surfacesOnPlaneAsPath(chooseBasis,Vector3,paper)
{
  ({
    prompt:
      "Given a plane, and a list of 3d polygons expressed as an array of Vector3, if each point is on the plane, project all the points to a closed paper.js Path",
    time: 1715634727536,
    comment:
      "Define a function to project 3D polygons onto a 2D plane and convert them into closed paper.js Paths."
  });

  function projectToPath(plane, polygons) {
    const [basisX, basisY] = chooseBasis(plane);
    const projectedPoints = polygons.map((polygon) => {
      try {
        return polygon.map((point) => {
          const pointOnPlane = plane.projectPoint(point, new Vector3());
          if (pointOnPlane.distanceTo(point) > 1e-3) throw new Error();
          const x = pointOnPlane.dot(basisX);
          const y = pointOnPlane.dot(basisY);
          return new paper.Point(x, y);
        });
      } catch (e) {}
    });
    const paths = projectedPoints
      .filter((d) => d)
      .map((points) => new paper.Path(points));
    paths.forEach((path) => {
      path.closePath();
      if (path.clockwise) path.reverse();
    });
    return paths;
  }

  return projectToPath;
}


function _focusPlaneIdxPaths(focusPlane,surfacesOnPlaneAsPath,vectorSurfaces){return(
focusPlane
  ? surfacesOnPlaneAsPath(focusPlane, vectorSurfaces)
  : []
)}

function _unionPaths(){return(
{
  prompt:
    "Write a function to boolean op union a list of paper.js Path elements",
  time: 1715719615509,
  comment:
    "Define a function to perform a union operation on a list of paper.js Path elements."
} &&
  function unionPaths(paths) {
    let unionResult = paths[0];
    for (let i = 1; i < paths.length; i++) {
      unionResult = unionResult.unite(paths[i]);
    }
    return unionResult;
  }
)}

function _reverseInnerPaths(){return(
{
  prompt:
    "iterate a list of paper.js path, find if any paths are inside another path (check if all verteces are inside the path) and if so, call .reverse()",
  time: 1715971167855,
  comment:
    "Define a function to iterate through a list of paper.js paths, reverse any path that is entirely inside another path."
} &&
  function reverseInnerPaths(path) {
    if (!path.children) return path;
    return path.reorient(true, false);
  }
)}

function _focusPlanePath(planePaths,focusPlane){return(
planePaths.get(focusPlane)
)}

function _showPlanes(Inputs){return(
Inputs.toggle({
  label: "show planes?",
  value: true
})
)}

function _planePaths(mapValues,surface_planes,unionPaths,surfacesOnPlaneAsPath,vectorSurfaces,reverseInnerPaths){return(
mapValues(
  new Map(
    surface_planes.map((plane) => [
      plane,
      unionPaths(surfacesOnPlaneAsPath(plane, vectorSurfaces))
    ])
  ),
  (plane, path) => reverseInnerPaths(path)
)
)}

function _33(md){return(
md`### 2D Path to 3D`
)}

function _projectPathTo3D(chooseBasis,Vector3,Line3){return(
{
  prompt:
    "Given a CompoundPath and a Plane, project the path segments into arrays of Line3. Each array contains a loop for each subpath",
  time: 1715721277786,
  comment:
    "Define a function to project the segments of a CompoundPath into arrays of Line3, each array corresponding to a loop for each subpath."
} &&
  function projectPathTo3D(path, plane) {
    const [basisX, basisY] = chooseBasis(plane);
    const basisZ = plane.normal;
    const origin = plane.coplanarPoint(new Vector3());

    function projectPoint2DTo3D(point2D) {
      return new Vector3(
        point2D.x * basisX.x + point2D.y * basisY.x,
        point2D.x * basisX.y + point2D.y * basisY.y,
        point2D.x * basisX.z + point2D.y * basisY.z
      ).add(origin);
    }

    if (path.children)
      return path.children.map((subPath) => {
        return subPath.segments.map((segment) => {
          const start = projectPoint2DTo3D(segment.point);
          const end = projectPoint2DTo3D(segment.next.point);
          return new Line3(start, end);
        });
      });
    else {
      return path.segments.map((segment) => {
        const start = projectPoint2DTo3D(segment.point);
        const end = projectPoint2DTo3D(segment.next.point);
        return new Line3(start, end);
      });
    }
  }
)}

function _showEdges(Inputs){return(
Inputs.toggle({ value: true, label: "show edges" })
)}

function _edges(mapValues,planePaths,projectPathTo3D){return(
mapValues(planePaths, (plane, path) =>
  projectPathTo3D(path, plane).flat()
)
)}

function _focusEdges(focusPlane,edges){return(
focusPlane ? edges.get(focusPlane) : undefined
)}

function _focusEdgesAll(edges){return(
edges
)}

function _showShapes(Inputs){return(
Inputs.toggle({
  label: "show shapes 2D",
  value: true
})
)}

function _shapes2D(mapValues,planePaths){return(
mapValues(planePaths, (plane, path) => {
  if (path.children)
    return path.children.map((subPath) => {
      return subPath.segments.map((segment) => [
        segment.point.x,
        segment.point.y
      ]);
    });
  else {
    return path.segments.map((segment) => [[segment.point.x, segment.point.y]]);
  }
})
)}

function _targetShape(shapes2D,focusPlane){return(
shapes2D.get(focusPlane)
)}

function _shapePlot(targetShape,plotShape2D){return(
targetShape && plotShape2D(targetShape.flat())
)}

function _43(md){return(
md`### Find Joints`
)}

function _44(Inputs,surface_planes,$0){return(
Inputs.bind(
  Inputs.range([-1, surface_planes.length - 1], {
    label: "focus surface",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _optimizedShape2D(shapes2D){return(
shapes2D
)}

function _optimizedFocusShape(optimizedShape2D,surface_planes,focusPlaneIdx){return(
optimizedShape2D.get(surface_planes[focusPlaneIdx])
)}

function _optimizedShapePlot(optimizedFocusShape,plotShape2D){return(
optimizedFocusShape &&
  plotShape2D(optimizedFocusShape.flat())
)}

function _findShapeConnections(intersectShapes,rad2deg,angleBetweenPlanes,Vector3){return(
{
  prompt:
    "Find a list of connections between shapes encoded as a map of Plane => Line3[]. A connection is a shared edge list, and the two shapes (plane1, plane2, edges1, edges2). Use intersectShapes pairwise.",
  time: 1715074480396,
  comment:
    "Define a function to find connections between shapes, where a connection is defined by shared edges between shapes encoded as a map of Plane => Line3[]."
} &&
  function findShapeConnections(shapeMap) {
    const connections = [];
    const planes = Array.from(shapeMap.keys());

    // Compare each pair of shapes
    for (let i = 0; i < planes.length; i++) {
      for (let j = i + 1; j < planes.length; j++) {
        const plane1 = planes[i];
        const plane2 = planes[j];
        const lines1 = shapeMap.get(plane1);
        const lines2 = shapeMap.get(plane2);

        // Find edges between the two shapes
        const edges = intersectShapes(plane1, lines1, plane2, lines2);
        if (edges.length > 0) {
          connections.push({
            plane1,
            plane2,
            lines1: lines1,
            lines2: lines2,
            sharedEdges: edges,
            angle: rad2deg(
              angleBetweenPlanes(plane1, plane2, edges[0].delta(new Vector3()))
            )
          });
        }
      }
    }

    return connections;
  }
)}

function _joints(findShapeConnections,edges){return(
findShapeConnections(edges)
)}

function _50(Inputs,joints,$0){return(
Inputs.bind(
  Inputs.range([-1, joints.length - 1], {
    label: "focus joint",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _targetJoint(joints,focusJointIdx){return(
joints[focusJointIdx]
)}

function _visualizeJointGraph(dot,edges,toString,targetJoint,focusPlane){return(
{
  prompt: "visualize the joint graph using graph viz.",
  time: 1715259707115,
  comment:
    "Define a function to visualize a joint graph using Graphviz format, displaying vertices, edges, and edge lengths."
} &&
  function visualizeJointGraph(joints) {
    return dot`digraph G { 
      ${[...edges.keys()]
        .map(
          (plane) =>
            `"${toString(plane)}" [color="${
              targetJoint &&
              (targetJoint.plane1 === plane || targetJoint.plane2 === plane)
                ? "red"
                : focusPlane && focusPlane == plane
                ? "green"
                : "black"
            }"]`
        )
        .join("\n")}

      ${joints
        .map((joint) => {
          return `"${toString(joint.plane1)}" -> "${toString(
            joint.plane2
          )}" [label="${
            joint.angle + "° " + joint.sharedEdges.map(toString).join("\n")
          }" color="${
            targetJoint && targetJoint === joint ? "red" : "black"
          }"]`;
        })
        .join("\n")}
    }`;
    return dot.join("\n");
  }
)}

function _53(visualizeJointGraph,joints){return(
visualizeJointGraph(joints)
)}

function _54(md){return(
md`### Generate Parts`
)}

function _neighbourhood(){return(
(plane, connections) =>
  connections.filter((c) => c.plane1 == plane || c.plane2 == plane)
)}

function _focusNeighbourhood(neighbourhood,focusPlane,joints){return(
neighbourhood(focusPlane, joints)
)}

function _neighbourhoods(surface_planes,neighbourhood,joints){return(
new Map(
  surface_planes.map((plane) => [plane, neighbourhood(plane, joints)])
)
)}

function _focusBoundaries(focusPlane,boundaries){return(
focusPlane && boundaries.get(focusPlane)
)}

function _boundaries(surface_planes,projectPathTo3D,planePaths){return(
new Map(
  surface_planes.map((plane) => [
    plane,
    projectPathTo3D(planePaths.get(plane), plane)
  ])
)
)}

function _generatePerimeterPlan(intersectLines,eq,Line3){return(
{
  prompt:
    "Given a list of neighbourhood connections\n\nObject {\n  plane1: Plane {isPlane: true, normal: Vector3, constant: 1}\n  plane2: Plane {isPlane: true, normal: Vector3, constant: 1}\n  lines1: Array(6) [Line3, Line3, Line3, Line3, Line3, Line3]\n  lines2: Array(4) [Line3, Line3, Line3, Line3]\n  sharedEdges: Array(1) [\n  0: Line3 {\n  start: Vector3 {x: 0, y: 1, z: 1}\n  end: Vector3 {x: -5, y: 1, z: 1}\n}\n]\n  angle: 90\n}\n\nand a the ordered bounds of the surface [x, y][]\n\ngenerate a plan for adjusting the perimeter of the object to insert special joints on the shared edges. \nTo do this you will need to walk the boundary. If there are no shared edges the plane would be a simple list of {plan: move, [x, y]}\nHowever, where the sharedEdges intersect the boundary, we need to split the line up and replace the shared part with\n\n{plan: joint, [x,y], edge: <ref to connection>}\n\n\n\n\n",
  time: 1715421531133,
  comment:
    "Define a function to generate a plan for adjusting the perimeter of an object to insert special joints on the shared edges. This involves walking the boundary and replacing parts of it with joints where shared edges intersect."
} &&
  function generatePerimeterPlan(plane, joints, boundary) {
    const plans = [];
    for (let i = 0; i < boundary.length; i++) {
      const edge = boundary[i];

      let connections = joints.filter((joint) =>
        joint.sharedEdges.some((sharedEdge) => {
          const intersection = intersectLines(edge, sharedEdge, {
            clamp: true,
            includeOverlap: true
          });
          if (intersection != null && intersection.start) {
            intersectLines(edge, sharedEdge, {
              clamp: true,
              includeOverlap: true
            });
            return true;
          }
        })
      );

      function findNearest(position, connections) {
        let nearest = null;
        let nearestDistance = Number.MAX_VALUE;
        let nearestConnection = undefined;
        let nearestSharedEdge = undefined;
        connections.forEach((connection) => {
          connection.sharedEdges.forEach((sharedEdge) => {
            [sharedEdge.start, sharedEdge.end].forEach((p) => {
              const distance = p.distanceTo(position);
              if (distance < nearestDistance) {
                nearest = p;
                nearestDistance = distance;
                nearestConnection = connection;
                nearestSharedEdge = sharedEdge;
              }
            });
          });
        });
        return [nearest, nearestConnection, nearestSharedEdge];
      }

      if (connections.length > 0) {
        let current = edge.start;
        let openConnections = [...connections];
        while (!eq(current, edge.end)) {
          const [nearest, connection, sharedEdge] = findNearest(
            current,
            openConnections
          );
          if (nearest == null) {
            plans.push({ plan: "move", edge: new Line3(current, edge.end) });
            current = edge.end;
          } else {
            if (nearest.distanceTo(current) > 1e-3) {
              plans.push({ plan: "move", edge: new Line3(current, nearest) });
              current = nearest;
            }
            const jointEdge =
              sharedEdge.start === nearest
                ? sharedEdge
                : new Line3(sharedEdge.end, sharedEdge.start);
            const oppositePlane =
              connection.plane1 == plane
                ? connection.plane2
                : connection.plane1;
            const extension = 
            plans.push({
              plan: "box",
              edge: jointEdge,
              joint: connection,
              polarity: connection.plane1 == plane,
              direction: oppositePlane.normal,
              plane,
              oppositePlane
            });
            openConnections.splice(
              openConnections.findIndex((e) => e == connection),
              1
            );
            current = jointEdge.end;
          }
        }
      } else {
        plans.push({ plan: "move", edge: edge });
      }
    }

    return plans;
  }
)}

function _projectPlan(chooseBasis,Vector3){return(
(plane, plan) => {
  const [basisX, basisY] = chooseBasis(plane);
  return plan.map((step) => {
    const startPointOnPlane = plane.projectPoint(
      step.edge.start,
      new Vector3()
    );
    const endPointOnPlane = plane.projectPoint(step.edge.end, new Vector3());
    const dirOnPlane =
      step.direction && plane.projectPoint(step.direction, new Vector3());
    const start = [
      startPointOnPlane.dot(basisX),
      startPointOnPlane.dot(basisY)
    ];
    const end = [endPointOnPlane.dot(basisX), endPointOnPlane.dot(basisY)];
    const delta = [start[0] - end[0], start[1] - end[1]];
    const magnitude = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
    const outward = [delta[1] / magnitude, -delta[0] / magnitude];
    let cutParams = {};
    if (step.direction) {
      const cutDirection = [dirOnPlane.dot(basisX), dirOnPlane.dot(basisY)];
      cutParams = {
        cutDirection,
        cutType:
          outward[0] * cutDirection[0] + outward[1] * cutDirection[1] > 0
            ? "extend"
            : "retract"
      };
    }
    return {
      ...step,
      start,
      end,
      outward,
      ...cutParams
    };
  });
}
)}

function _focusPlan(focusPlane,projectPlan,generatePerimeterPlan,focusNeighbourhood,focusBoundaries){return(
focusPlane &&
  projectPlan(
    focusPlane,
    generatePerimeterPlan(
      focusPlane,
      focusNeighbourhood,
      focusBoundaries.flat()
    )
  )
)}

function _plans(surface_planes,projectPlan,generatePerimeterPlan,neighbourhoods,boundaries){return(
new Map(
  surface_planes.map((plane) => [
    plane,
    projectPlan(
      plane,
      generatePerimeterPlan(
        plane,
        neighbourhoods.get(plane),
        boundaries.get(plane).flat()
      )
    )
  ])
)
)}

function _planViz(Plot){return(
(plan) =>
  Plot.plot({
    grid: true,
    inset: 10,
    x: {
      label: "x"
    },
    y: {
      label: "y"
    },
    color: {
      legend: true
    },
    marks: [
      Plot.link(plan, {
        x1: (d) => d.start[0],
        y1: (d) => d.start[1],
        x2: (d) => d.end[0],
        y2: (d) => d.end[1],
        stroke: (d) => d.plan,
        markerEnd: "arrow"
      }),
      Plot.vector(plan, {
        x: (d) => (d.start[0] + d.end[0]) / 2,
        y: (d) => (d.start[1] + d.end[1]) / 2,
        rotate: (d) => (Math.atan2(d.outward[0], d.outward[1]) * 180) / Math.PI,
        length: 10,
        stroke: "cyan",
        anchor: "start"
      }),
      Plot.vector(
        plan.filter((s) => s.plan == "box"),
        {
          x: (d) => (d.start[0] + d.end[0]) / 2,
          y: (d) => (d.start[1] + d.end[1]) / 2,
          rotate: (d) =>
            (Math.atan2(d.cutDirection[0], d.cutDirection[1]) * 180) / Math.PI,
          length: 10,
          stroke: "red",
          anchor: "start"
        }
      )
    ]
  })
)}

function _focusPlanViz(focusPlan,planViz){return(
focusPlan && planViz(focusPlan)
)}

function _showPlan(Inputs){return(
Inputs.toggle({ label: "show plan", value: true })
)}

function _planBlobs(mapValues,plans,toBlobUrl,planViz){return(
mapValues(plans, (plane, plan) =>
  toBlobUrl(planViz(plan).querySelector("svg[viewBox]"))
)
)}

function _planToSVG(material_thickness,d3,htl,download_svg,angleToFingerExtension,angleToFingerRetraction,finger_clockwise_v1,fingerWidth){return(
(plan, { scale = 5, thickness = material_thickness } = {}) => {
  const maxX =
    d3.max(plan, (step) => Math.max(step.start[0], step.end[0])) +
    thickness * 2;
  const maxY =
    d3.max(plan, (step) => Math.max(step.start[1], step.end[1])) +
    thickness * 2;
  const minX =
    d3.min(plan, (step) => Math.min(step.start[0], step.end[0])) -
    thickness * 2;
  const minY =
    d3.min(plan, (step) => Math.min(step.start[1], step.end[1])) -
    thickness * 2;
  const total_width = maxX - minX;
  const total_height = maxY - minY;
  let svgEl = undefined;
  const element = htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}mm;
            height: ${Math.max(total_height * scale, 50)}mm;
    ">
    <svg  class="lzr"
          filename="part"
          style="cursor: pointer"
          onclick = ${(evt) => download_svg(evt.target)}
          width="${total_width}mm"
          height="${total_height}mm"
          viewBox="${minX} ${minY} ${total_width} ${total_height}">
      <path stroke="red" stroke-width="${1 / scale}" fill="none" d="
        ${plan.map((step, i) => {
          if (step.plan === "move") {
            return `
              M ${step.start[0]} ${step.start[1]}
              L ${step.end[0]} ${step.end[1]}
            `;
          } else if (step.plan === "box") {
            const start = step.start;
            const end = step.end;
            const settings = {
              extension: angleToFingerExtension(step.joint.angle, {
                thickness
              }),
              retraction: angleToFingerRetraction(step.joint.angle, {
                thickness
              })
            };
            const offset = [
              step.cutType == "extend"
                ? step.outward[0] * settings.extension
                : -step.outward[0] * settings.retraction,
              step.cutType == "extend"
                ? step.outward[1] * settings.extension
                : -step.outward[1] * settings.retraction
            ];
            const offsetStart = [end[0] + offset[0], end[1] + offset[1]];
            const offsetEnd = [start[0] + offset[0], start[1] + offset[1]];
            return `
              M ${end[0]} ${end[1]}
              ${finger_clockwise_v1(offsetStart, offsetEnd, {
                finger_depth: settings.extension + settings.retraction,
                finger_width: fingerWidth,
                reverse: step.polarity,
                end_anchor: step.polarity
              })}
              L ${start[0]} ${start[1]}
            `;
          }
        })}
      "/>
  </div>`;
  svgEl = element.querySelector("svg");
  return element;
}
)}

function _70(Inputs,surface_planes,$0){return(
Inputs.bind(
  Inputs.range([-1, surface_planes.length - 1], {
    label: "focus plane",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _showPart(Inputs){return(
Inputs.toggle({
  label: "show parts",
  value: true
})
)}

function _partsSVG(mapValues,plans,planToSVG,material_thickness){return(
mapValues(plans, (plane, plan) =>
  planToSVG(plan, { scale: 5, thickness: material_thickness })
)
)}

function _73(focusPlan,planToSVG,scale)
{
  debugger;
  return focusPlan && planToSVG(focusPlan, { scale });
}


function _74(md){return(
md`### Parts to Blobs`
)}

function _partBlobs(mapValues,partsSVG,toBlobUrl){return(
mapValues(partsSVG, (plane, svg) =>
  toBlobUrl(svg.querySelector("svg"))
)
)}

function _focusBlobURL(focusPlane,partBlobs){return(
focusPlane && partBlobs.get(focusPlane)
)}

function _focusPart(focusPlan,planToSVG,scale){return(
focusPlan && planToSVG(focusPlan, { scale })
)}

function _78(md){return(
md`## Math`
)}

function _deg2rad(){return(
(degrees) => degrees * (Math.PI / 180)
)}

function _rad2deg(){return(
(rads) => rads * (180 / Math.PI)
)}

function _angleBetweenPlanes(THREE){return(
function angleBetweenPlanes(plane1, plane2, axis) {
  // Calculate the dot product of the normals
  let dot = plane1.normal.dot(plane2.normal);

  // Compute the magnitudes of each normal vector
  let magnitude1 = plane1.normal.length();
  let magnitude2 = plane2.normal.length();

  // Calculate the cosine of the angle between the planes
  let cosTheta = dot / (magnitude1 * magnitude2);
  let angleRadians = Math.acos(Math.min(Math.max(cosTheta, -1), 1));

  // Calculate the cross product of the normal vectors to get the axis of rotation
  let cross = new THREE.Vector3();
  cross.crossVectors(plane1.normal, plane2.normal);

  // Calculate the dot product of the cross product and the edge vector
  let sign = cross.dot(axis);

  // Determine the sign of the angle
  if (sign < 0) {
    angleRadians = -angleRadians;
  }

  return angleRadians;
}
)}

function _angleBetweenPlanesExample(rad2deg,angleBetweenPlanes,Plane,Vector3){return(
rad2deg(
  angleBetweenPlanes(
    new Plane(new Vector3(0, 1, 0), 0),
    new Plane(new Vector3(1, 0, 0), 0),
    new Vector3(0, 0, -1)
  )
)
)}

function _eq(Plane,Vector3,Line3){return(
{
  prompt:
    "write a function eq, to check two planes, vector3 or line3 are equals with an epsilon of 1e-4",
  time: 1714231307450,
  comment:
    "Define a function to check equality between two Planes, Vector3s, or Line3s with a specified epsilon tolerance"
} &&
  function eq(a, b, epsilon = 1e-4) {
    if (a instanceof Plane && b instanceof Plane) {
      return (
        a.normal.equals(b.normal, epsilon) &&
        Math.abs(a.constant - b.constant) < epsilon
      );
    } else if (a instanceof Array && b instanceof Array) {
      return (
        a.length == b.length &&
        a.reduce((acc, item, i) => acc && eq(item, b[i]), true)
      );
    } else if (a instanceof Vector3 && b instanceof Vector3) {
      return eq(a.x, b.x) && eq(a.y, b.y) && eq(a.z, b.z);
    } else if (a instanceof Line3 && b instanceof Line3) {
      const aDir = a.delta(new Vector3().normalize());
      const bDir = b.delta(new Vector3()).normalize();
      return (
        (a.start.distanceToSquared(b.start) < epsilon * epsilon &&
          a.end.distanceToSquared(b.end) < epsilon * epsilon) ||
        (a.start.distanceToSquared(b.end) < epsilon * epsilon &&
          a.end.distanceToSquared(b.start) < epsilon * epsilon)
      );
    } else if (typeof a == "number" && typeof b == "number") {
      return Math.abs(a - b) < epsilon;
    }
    return a == b;
  }
)}

function _dedupe(){return(
{
  prompt:
    "write a function dedupe, that takes a predicate and an array and removed duplicates as defined by the predicate",
  time: 1714231386592,
  comment:
    "Define a function to remove duplicates from an array based on a provided equality predicate"
} &&
  function dedupe(predicate, array) {
    return array.reduce((acc, item) => {
      if (!acc.some((x) => predicate(x, item))) {
        acc.push(item);
      }
      return acc;
    }, []);
  }
)}

function _mapValues(){return(
{
  prompt:
    "map the values of a Map with function(key, value) returning a new Map",
  time: 1714231307450,
  comment:
    "Define a function to check equality between two Planes, Vector3s, or Line3s with a specified epsilon tolerance"
} &&
  function mapValues(map, fn) {
    const result = new Map();
    map.forEach((value, key) => result.set(key, fn(key, value)));
    return result;
  }
)}

function _normalizeLines(eq){return(
(lines) => {
  const vertexList = [];
  return lines.map((line) => {
    [line.start, line.end].forEach((lineVertex, idx) => {
      let existing = vertexList.find((vertex) => eq(vertex, lineVertex));
      if (!existing) {
        vertexList.push(lineVertex);
        existing = lineVertex;
      }
      if (idx === 0) line.start = existing;
      else line.end = existing;
    });
    return line;
  });
}
)}

function _surfaceToPlane(plane,Vector3){return(
(surface) =>
  plane
    .clone()
    .setFromCoplanarPoints(
      new Vector3(...surface[0]),
      new Vector3(...surface[1]),
      new Vector3(...surface[2])
    )
)}

function _intersectLines(Vector3,overlapParallelLines){return(
{
  prompt:
    "write intersectLines that takes two Line3 and finds the nearest point to both of them",
  time: 1714205796155,
  comment:
    "Define a function to find the nearest point between two Line3 objects"
} &&
  function intersectLines(
    line1,
    line2,
    { epsilon = 1e-4, includeOverlap = false, clamp = false } = {}
  ) {
    // Extract start and end points from Line3 objects
    let start1 = line1.start,
      end1 = line1.end;
    let start2 = line2.start,
      end2 = line2.end;

    // Direction vectors for both lines
    let dir1 = new Vector3().subVectors(end1, start1).normalize();
    let dir2 = new Vector3().subVectors(end2, start2).normalize();

    // Calculate the shortest vector between two lines (a vector perpendicular to both direction vectors)
    let normal = new Vector3().crossVectors(dir1, dir2).normalize();

    // Compute the plane normal to dir2 passing through start2
    let planeNormal2 = new Vector3().crossVectors(normal, dir2);

    // Calculate intersection of line1 with the plane defined above
    let dot = planeNormal2.dot(dir1);

    if (Math.abs(dot) < 1e-10) {
      // Lines are parallel and there is no single intersection point
      return includeOverlap ? overlapParallelLines(line1, line2) : null;
    }

    let diff = new Vector3().subVectors(start2, start1);
    let t1 = planeNormal2.dot(diff) / dot;
    let closestPointLine1 = new Vector3().addVectors(
      start1,
      dir1.clone().multiplyScalar(t1)
    );

    // Compute the plane normal to dir1 passing through start1
    let planeNormal1 = new Vector3().crossVectors(normal, dir1);

    // Calculate intersection of line2 with the plane defined above
    dot = planeNormal1.dot(dir2);
    if (Math.abs(dot) < 1e-10) {
      // Lines are parallel and there is no single intersection point
      return null;
    }
    let t2 = planeNormal1.dot(new Vector3().subVectors(start1, start2)) / dot;
    let closestPointLine2 = new Vector3().addVectors(
      start2,
      dir2.clone().multiplyScalar(t2)
    );
    if (
      closestPointLine1.distanceToSquared(closestPointLine2) <
      epsilon * epsilon
    ) {
      const closest = new Vector3()
        .addVectors(closestPointLine1, closestPointLine2)
        .multiplyScalar(0.5);
      // Return the midpoint of closest points as the closest approach
      if (clamp) {
        const clampedClosest1 = line1.closestPointToPoint(
          closest,
          true,
          new Vector3()
        );
        const clampedClosest2 = line2.closestPointToPoint(
          closest,
          true,
          new Vector3()
        );
        if (clampedClosest1.distanceTo(clampedClosest2) >= epsilon) {
          return null;
        }
      }
      return closest;
    } else {
      return null;
    }
  }
)}

function _overlapParallelLines(Vector3,Line3){return(
{
  prompt:
    "Assuming two lines are parallel, express the overlap as a Line, or null if they are not colinear",
  time: 1715080658628,
  comment:
    "Define a function to calculate the overlap of two parallel lines and return it as a Line3, or null if they are not colinear or do not overlap."
} &&
  function overlapParallelLines(line1, line2) {
    // Project line2's points onto line1 to check for overlap
    let start1 = line1.closestPointToPoint(line2.start, false, new Vector3());
    let end1 = line1.closestPointToPoint(line2.end, false, new Vector3());

    if (start1.distanceTo(line2.start) > 1e-3) return null;
    if (end1.distanceTo(line2.end) > 1e-3) return null;

    // Check if the projections are inside line1's segment

    const start1OnLine1 = line1
      .delta(new Vector3())
      .dot(start1.clone().sub(line1.start));
    const end1OnLine1 = line1
      .delta(new Vector3())
      .dot(end1.clone().sub(line1.start));

    if (start1OnLine1 > end1OnLine1) {
      let tmp = end1;
      end1 = start1;
      start1 = tmp;
    }

    const overlapStart =
      line1.delta(new Vector3()).dot(start1.clone().sub(line1.start)) >= 0
        ? start1
        : line1.start;
    const overlapEnd =
      line1.delta(new Vector3()).dot(end1.clone().sub(line1.start)) >=
      line1.delta(new Vector3()).dot(line1.end.clone().sub(line1.start))
        ? end1
        : line1.end;

    // Ensure the overlap start is before the overlap end in terms of line1's direction
    /*
    if (
      overlapStart.clone().sub(line1.start).dot(line1.delta(new Vector3())) >
      overlapEnd.clone().sub(line1.start).dot(line1.delta(new Vector3()))
    ) {
      return null; // No actual overlap
    }*/

    return new Line3(overlapStart, overlapEnd);
  }
)}

function _intersectPlanes(Line3,Vector3,intersectLines){return(
{
  prompt:
    "write a function to calculate the intersection of two planes as a Line3, called intersectPlanes",
  time: 1714157821773,
  comment:
    "Define a function to calculate the intersection of two planes as a Line3"
} &&
  function intersectPlanes(plane1, plane2) {
    plane1.normalize();
    plane2.normalize();
    const line = new Line3();
    // Calculate the intersection of two planes
    const direction = new Vector3().crossVectors(plane1.normal, plane2.normal);
    const denominator = direction.lengthSq();

    if (denominator < 1e-3) {
      // No intersection, parallel planes
      return null;
    }

    const lineDir1 = new Vector3().crossVectors(plane1.normal, direction);
    const lineDir2 = new Vector3().crossVectors(plane2.normal, direction);
    const line1Start = plane1.normal.clone().multiplyScalar(-plane1.constant);
    const line2Start = plane2.normal.clone().multiplyScalar(-plane2.constant);

    const point = intersectLines(
      new Line3(line1Start, line1Start.clone().add(lineDir1)),
      new Line3(line2Start, line2Start.clone().add(lineDir2))
    );
    if (!point) {
      return null;
    }
    return new Line3(point, point.clone().add(direction));
  }
)}

function _lineOnPlane(){return(
{
  prompt: "write a function, lineOnPlane",
  time: 1714426480262,
  comment:
    "Define a function to determine if a Line3 is coplanar with a given Plane"
} &&
  function lineOnPlane(line, plane) {
    // Check if both points of the line are coplanar with the plane
    const startDistance = plane.distanceToPoint(line.start);
    const endDistance = plane.distanceToPoint(line.end);

    return Math.abs(startDistance) < 1e-4 && Math.abs(endDistance) < 1e-4;
  }
)}

function _findIntersectingVertices(intersectLines,parseVector3,dedupe,eq){return(
{
  prompt:
    "given an array of lines, find all intersecting vertices and return a map of unique vertices mapped to an array of lines that are adjacent",
  time: 1714233337197,
  comment:
    "Function to find intersecting vertices from an array of lines and map them to adjacent lines"
} &&
  function findIntersectingVertices(lines) {
    const verticesMap = new Map();

    // Compare each line with every other line to find intersections
    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        const intersection = intersectLines(lines[i], lines[j]);
        if (intersection) {
          // If intersection exists, add or update the map
          const key = `${intersection.x.toFixed(4)},${intersection.y.toFixed(
            4
          )},${intersection.z.toFixed(4)}`; // Use a string key to handle floating-point precision issues
          if (!verticesMap.has(key)) {
            verticesMap.set(key, []);
          }
          verticesMap.get(key).push(lines[i]);
          verticesMap.get(key).push(lines[j]);
        }
      }
    }
    const result = new Map();
    // Deduplicate lines associated with each vertex
    verticesMap.forEach((value, key) => {
      result.set(parseVector3(key), dedupe(eq, value));
    });

    return result;
  }
)}

function _surfaceDistanceToPoint(Vector3,Triangle){return(
{
  prompt:
    "write a rectangularSurfaceToPoint distance function that accounts for the edges. A surface is defined as  4 coordinates \n0: Array(4) [\n  0: Array(3) [-10, 1, 1]\n  1: Array(3) [0, 1, 1]\n  2: Array(3) [0, -2, 1]\n  3: Array(3) [-10, -2, 1]\n]\nWe should reuse Triangle",
  time: 1714286534554,
  comment:
    "Define a function to calculate the distance from a point to a rectangular surface, using two triangles to account for the entire surface"
} &&
  function surfaceDistanceToPoint(surface, point) {
    const [v0, v1, v2, v3] = surface.map((coords) => new Vector3(...coords));
    const pointVector = new Vector3(...point);

    // Calculate distances to two triangular parts of the rectangle
    const triangle1 = new Triangle(v0, v1, v2);
    const triangle2 = new Triangle(v0, v2, v3);

    const distance1 = triangle1
      .closestPointToPoint(pointVector, new Vector3())
      .distanceTo(pointVector);
    const distance2 = triangle2
      .closestPointToPoint(pointVector, new Vector3())
      .distanceTo(pointVector);

    // Return the minimum distance
    return Math.min(distance1, distance2);
  }
)}

function _generateEvenlySpacedPoints(THREE){return(
{
  prompt:
    "write a function that generates 10 evenly spaced points from a Line3 between its start and end",
  time: 1714323731882,
  comment:
    "Define a function to generate 10 evenly spaced points on a Line3 between its start and end"
} &&
  function generateEvenlySpacedPoints(line, n = 10) {
    const points = [];
    const start = line.start;
    const end = line.end;
    const stepVector = new THREE.Vector3()
      .subVectors(end, start)
      .multiplyScalar(1 / n);

    for (let i = 0; i <= n; i++) {
      const point = new THREE.Vector3().addVectors(
        start,
        stepVector.clone().multiplyScalar(i)
      );
      points.push(point);
    }
    return points;
  }
)}

function _extendLine(Vector3,Line3){return(
{
  prompt:
    "Take a small line, and make it a massive line by moving the start and end points a large amount by its delta",
  time: 1715078155874,
  comment:
    "Define a function to extend a Line3 significantly in both directions along its delta vector."
} &&
  function extendLine(line, scale = 1e6) {
    const delta = line.delta(new Vector3()).normalize().multiplyScalar(scale);
    const extendedStart = line.start.clone().add(delta.clone().negate());
    const extendedEnd = line.end.clone().add(delta);
    return new Line3(extendedStart, extendedEnd);
  }
)}

function _getBoundingBoxCorners(){return(
{
  prompt:
    "Take an array of 2d points [x, y][] and return a new array with 4 points that are in the corners of the axis aligned bounding box",
  time: 1716111412768,
  comment:
    "Define a function to return the four corner points of the axis-aligned bounding box for an array of 2D points."
} &&
  function getBoundingBoxCorners(boundaries) {
    const xValues = boundaries.flatMap((points) =>
      points.map((point) => point[0])
    );
    const yValues = boundaries.flatMap((points) =>
      points.map((point) => point[1])
    );

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    return [
      [minX, minY],
      [minX, maxY],
      [maxX, maxY],
      [maxX, minY]
    ];
  }
)}

function _shape3DTo2D(chooseBasis,Vector3){return(
{
  prompt:
    "Write a function that converts a Shape3D (plane, lines) to a Shape2D ([x, y][])",
  time: 1715156172321
} &&
  ((plane, lines) => {
    const [basisX, basisY] = chooseBasis(plane);
    return lines.flatMap((line) =>
      [line.start, line.end].map((vector) => {
        const pointOnPlane = plane.projectPoint(vector, new Vector3());

        // Project the point onto the plane using the basis vectors
        const x = pointOnPlane.dot(basisX);
        const y = pointOnPlane.dot(basisY);

        return [x, y];
      })
    );
  })
)}

function _98(shape3DTo2D,targetJoint)
{
  debugger;
  return shape3DTo2D(targetJoint.plane1, targetJoint.lines1);
}


function _99(targetJoint){return(
targetJoint.lines1
)}

function _shape2DToPath(paper){return(
{
  prompt:
    "Write a function that converts a shape2D [x,y][] into a paper.js representation (Path)",
  time: 1715156172321,
  comment:
    "Define a function to convert an array of 2D points into a paper.js Path representation."
} &&
  function shape2DToPath(shape2D, { close = true } = {}) {
    const path = new paper.Path();
    path.strokeColor = "black";
    shape2D.forEach((point, index) => {
      if (index === 0) {
        path.moveTo(new paper.Point(point[0], point[1]));
      } else {
        path.lineTo(new paper.Point(point[0], point[1]));
      }
    });
    if (close) path.closePath();
    return path;
  }
)}

function _findIntersectionTransitions(intersectPlanes,extendLine,intersectLines,dedupe,eq,Vector3){return(
{
  prompt:
    "Given two shapes (plane1, lines1, plane2, line2), find candidate intersection transitions between them that is on their bounds. tip, the transitions will be on the line intersection of their two planes. ",
  time: 1715074143953
} &&
  function findIntersectionTransitions(plane1, lines1, plane2, lines2) {
    // Find the line of intersection between the two planes
    const unitIntersectionLine = intersectPlanes(plane1, plane2);
    if (!unitIntersectionLine) {
      return []; // No intersection line if planes are parallel
    }
    const intersectionLine = extendLine(unitIntersectionLine, 1e5);
    // Find segments of the intersection line that are within the bounds of the two shapes
    const transitions1 = [];
    const transitions2 = [];

    lines1.forEach((line) => {
      // Check if the intersection line intersects with any of the shape's lines
      const intersection = intersectLines(intersectionLine, line, {
        includeOverlap: true,
        clamp: true
      });
      if (intersection) {
        if (intersection.isVector3) {
          transitions1.push(intersection);
        } else {
          transitions1.push(intersection.start);
          transitions1.push(intersection.end);
        }
      }
    });
    lines2.forEach((line) => {
      // Check if the intersection line intersects with any of the shape's lines
      const intersection = intersectLines(intersectionLine, line, {
        includeOverlap: true,
        clamp: true
      });
      if (intersection) {
        if (intersection.isVector3) {
          transitions2.push(intersection);
        } else {
          transitions2.push(intersection.start);
          transitions2.push(intersection.end);
        }
      }
    });
    return dedupe(eq, [...transitions1, ...transitions2]).sort(
      (a, b) =>
        new Vector3().subVectors(a, intersectionLine.start).length() -
        new Vector3().subVectors(b, intersectionLine.start).length()
    );
  }
)}

function _findIntersectionTransitionsExample(findIntersectionTransitions,targetJoint)
{
  return findIntersectionTransitions(
    targetJoint.plane1,
    targetJoint.lines1,
    targetJoint.plane2,
    targetJoint.lines2
  );
}


function _isInsideShape3D(chooseBasis,shape3DTo2D,shape2DToPath,paper,Vector3){return(
{
  prompt:
    "Write a function isInsideShape3D to test whether a Vector3 is within a shape (plane, lines). It is inside the shape if it is on the plane, and it is either: 1. on a boundary edge or 2. shooting a random ray from the point on the plane cross an odd number of times. \n\nBecause 2 is subject to numerical errors, do two random rays and then do a third if they do not agree to tie break.",
  time: 1715163345144,
  comment:
    "Define a function to test whether a Vector3 is within a 3D shape by checking if it's on the plane and either on a boundary edge or enclosed by the edges using ray-casting."
} &&
  function isInsideShape3D(point, plane, lines) {
    if (Math.abs(plane.distanceToPoint(point)) > 1e-4) return false; // Point is not on the plane
    
    const [basisX, basisY] = chooseBasis(plane);

    const shape2D = shape3DTo2D(plane, lines);
    const path = shape2DToPath(shape2D);
    const projectedPoint = new paper.Point(
      plane.projectPoint(point, new Vector3()).dot(basisX),
      plane.projectPoint(point, new Vector3()).dot(basisY)
    );

    // Check if point is on any of the edges
    if (path.contains(projectedPoint)) return true;

    // Perform ray-casting to determine if the point is inside the shape
    function checkRayIntersections() {
      const rayAngle = Math.random() * Math.PI * 2;
      const ray = new paper.Path.Line(
        projectedPoint,
        new paper.Point(
          projectedPoint.x + Math.cos(rayAngle) * 10000, // Arbitrary large number
          projectedPoint.y + Math.sin(rayAngle) * 10000
        )
      );
      const intersections = ray.getIntersections(path);
      return intersections.length % 2 !== 0; // Odd number of intersections means inside
    }

    const results = [checkRayIntersections(), checkRayIntersections()];
    if (results[0] === results[1]) return results[0];
    // Do a third check if the first two disagree
    return checkRayIntersections();
  }
)}

function _isInsideShape3DExample(isInsideShape3D,Vector3,targetJoint)
{
  debugger;
  return isInsideShape3D(
    new Vector3(0, -0.5, 1),
    targetJoint.plane1,
    targetJoint.lines1
  );
}


function _105(targetJoint){return(
targetJoint.plane1
)}

function _106(targetJoint){return(
targetJoint.lines1
)}

function _intersectShapes(findIntersectionTransitions,Vector3,isInsideShape3D,Line3){return(
{
  prompt:
    "findIntersectionTransitions gives and ordered list of points that (may) lie on the boundary of a shared line between two Shape3D. Use isInsideShape3D to check the midpoint between consecutive pair, so we can return a minimal list of Line3 that lie on the shared edge of the two shapes. Call this intersectShapes",
  time: 1715180457167,
  comment:
    "Define a function to find minimal list of Line3 that lie on the shared edge between two Shape3D by using intersection transitions and checking midpoints for containment within both shapes."
} &&
  function intersectShapes(plane1, lines1, plane2, lines2) {
    const transitions = findIntersectionTransitions(
      plane1,
      lines1,
      plane2,
      lines2
    );
    const sharedLines = [];
    let insideShape = false,
      edgeStart = undefined;
    for (let i = 0; i < transitions.length - 1; i++) {
      const midpoint = new Vector3()
        .addVectors(transitions[i], transitions[i + 1])
        .multiplyScalar(0.5);

      // Check if the midpoint is inside both shapes
      if (
        isInsideShape3D(midpoint, plane1, lines1) &&
        isInsideShape3D(midpoint, plane2, lines2)
      ) {
        if (!insideShape) {
          // transition from outside to inside
          edgeStart = transitions[i];
        }
        insideShape = true;
      } else {
        if (insideShape) {
          // transition from inside to outside
          sharedLines.push(new Line3(edgeStart, transitions[i]));
        }
        insideShape = false;
      }
    }
    if (insideShape) {
      sharedLines.push(new Line3(edgeStart, transitions.at(-1)));
    }

    return sharedLines;
  }
)}

function _intersectShapesExample(intersectShapes,targetJoint)
{
  debugger;
  return intersectShapes(
    targetJoint.plane1,
    targetJoint.lines1,
    targetJoint.plane2,
    targetJoint.lines2
  );
}


function _109(md){return(
md`## String`
)}

function _parseVector3(Vector3){return(
{
  prompt: "write a function parseVector3",
  time: 1714233678892,
  comment: "Define a function to parse a string into a Vector3 object"
} &&
  function parseVector3(string) {
    const parts = string.split(",").map(Number);
    if (parts.length === 3) {
      return new Vector3(parts[0], parts[1], parts[2]);
    }
    throw new Error("Invalid Vector3 string format");
  }
)}

function _toString(){return(
function toString(obj) {
  if (obj === undefined) return "undefined";
  else if (obj.isPlane) {
    return `Plane(${toString(obj.normal)},${obj.constant})`;
  } else if (obj.isVector3) {
    return `${obj.x.toFixed(2)},${obj.y.toFixed(2)},${obj.z.toFixed(2)}`;
  } else if (obj.constructor.name == "Line3") {
    return `${toString(obj.start)}→${toString(obj.end)}`;
  }

  return obj.constructor.name || typeof obj;
}
)}

function _toBlobUrl(XMLSerializer){return(
(svg) =>
  URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml"
    })
  )
)}

function _geometrySuite(createSuite){return(
{
  prompt: "Write a test suite for testing our geometry functions",
  time: 1714197395380,
  comment:
    "Write a test suite for testing the geometry functions using the zora testing library"
} && createSuite({ name: "Geometry Tests" })
)}

function _114(geometrySuite,Line3,Vector3,expect,intersectLines){return(
geometrySuite.test("intersectLines example", () => {
  const l1 = new Line3(new Vector3(0, 0, -1), new Vector3(1, 0, -1));
  const l2 = new Line3(new Vector3(0, 0, 0), new Vector3(0, 0, -1));

  expect(intersectLines(l1, l2)).toEqual(new Vector3(0, 0, -1));
})
)}

function _testIntersectLinesRandom(geometrySuite,Vector3,Line3,intersectLines,expect){return(
{
  prompt:
    "Write a randomized test for intersectLine. Generate a random intersection point, two random directions.. Then generate two pairs of start and end points for each direction. Then create lines and intersect them, checking their intesection point was the one in the beginning",
  time: 1714203329492,
  comment: "Write a randomized test for the intersectLines function"
} &&
  geometrySuite.test("intersectLines random test", () => {
    // Generate a random intersection point
    const intersectionPoint = new Vector3()
      .random()
      .subScalar(0.5)
      .multiplyScalar(100);

    // Generate two random directions
    const direction1 = new Vector3().randomDirection();
    const direction2 = new Vector3().randomDirection();

    // Generate start and end points for two lines
    const start1 = intersectionPoint
      .clone()
      .addScaledVector(direction1, -Math.random() * 50);
    const end1 = intersectionPoint
      .clone()
      .addScaledVector(direction1, Math.random() * 50);
    const start2 = intersectionPoint
      .clone()
      .addScaledVector(direction2, -Math.random() * 50);
    const end2 = intersectionPoint
      .clone()
      .addScaledVector(direction2, Math.random() * 50);

    // Create lines
    const line1 = new Line3(start1, end1);
    const line2 = new Line3(start2, end2);

    // Intersect the lines
    const result = intersectLines(line1, line2);
    // Check if the intersection point matches the one we started with
    expect(intersectionPoint.distanceTo(result)).toBeLessThan(1e-3);
  })
)}

function _testIntersectPlanesRandom(geometrySuite,Plane,Vector3,XZ,intersectPlanes,expect){return(
{
  prompt:
    "Write a randomized test for intersectPlane. Generate 2 random planes and find the line intersection. Generate a random point, and find its nearest point on the line. Then measure the distance of that point-on-the-intersection-line to the two planes, it should be (near) 0.",
  time: 1714199166116,
  comment: "Write a randomized test for the intersectPlanes function"
} &&
  geometrySuite.test("intersectPlanes random test", () => {
    // Generate two random planes
    const plane1 = new Plane(
      new Vector3().randomDirection(),
      Math.random() * 2 - 1
    );
    const plane2 = new Plane(XZ.normal, 1);

    // Find the line of intersection
    const intersectionLine = intersectPlanes(plane1, plane2);

    // Generate a random point
    const randomPoint = new Vector3().randomDirection().multiplyScalar(20);

    // Find the nearest point on the intersection line
    const nearestPoint = intersectionLine.closestPointToPoint(
      randomPoint,
      false,
      new Vector3()
    );

    // Calculate the distances to the planes
    const distanceToPlane1 = plane1.distanceToPoint(nearestPoint);
    const distanceToPlane2 = plane2.distanceToPoint(nearestPoint);

    // The distances should be very close to zero
    expect(Math.abs(distanceToPlane1)).toBeLessThan(1e-3);
    expect(Math.abs(distanceToPlane2)).toBeLessThan(1e-3);
  })
)}

function _test3Dto2D(geometrySuite,Plane,Vector3,unionPaths,surfacesOnPlaneAsPath,projectPathTo3D,expect){return(
geometrySuite.test(
  "surfacesOnPlaneAsPath and projectPathTo3D round trip",
  () => {
    const plane = new Plane(
      new Vector3().randomDirection(),
      Math.random() * 2 - 1
    );
    const a = plane.projectPoint(
      new Vector3().randomDirection().multiplyScalar(20),
      new Vector3()
    );
    const b = plane.projectPoint(
      new Vector3().randomDirection().multiplyScalar(20),
      new Vector3()
    );

    const path = unionPaths(surfacesOnPlaneAsPath(plane, [[a, b]]));

    const edges = projectPathTo3D(path, plane);

    expect(a.distanceTo(edges[0].start) < 1e-3 || a.distanceTo(edges[0].end));
    expect(b.distanceTo(edges[0].start) < 1e-3 || b.distanceTo(edges[0].end));
  }
)
)}

function _118(md){return(
md`# Planes`
)}

function _XY(Plane,Vector3){return(
new Plane(new Vector3(0, 0, 1)).normalize()
)}

function _XZ(Plane,Vector3){return(
new Plane(new Vector3(0, 1, 0)).normalize()
)}

function _YZ(Plane,Vector3){return(
new Plane(new Vector3(1, 0, 0)).normalize()
)}

function _chooseBasis(THREE){return(
{
  prompt:
    "chooseBasis for plane, based on whether the orthogonal plane is XY, XZ or ZY plane, return the appropriate axis aligned basis vectors.",
  time: 1714319643795,
  comment:
    "Define a function to choose basis vectors for a plane based on its orientation relative to the XY, XZ, or YZ planes"
} &&
  function chooseBasis(plane) {
    // Calculate the normal vector of the plane
    const normal = plane.normal.clone().normalize();

    // Choose the basis vectors depending on the closest major plane (XY, XZ, or YZ)
    if (normal.dot(new THREE.Vector3(1, 0, 0)) > 0.9) {
      // Aligned with X-axis (right face)
      return [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, -1)];
    } else if (normal.dot(new THREE.Vector3(-1, 0, 0)) > 0.9) {
      // Aligned with -X-axis (left face)
      return [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    } else if (normal.dot(new THREE.Vector3(0, 1, 0)) > 0.9) {
      // Aligned with Y-axis (top face)
      return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1)];
    } else if (normal.dot(new THREE.Vector3(0, -1, 0)) > 0.9) {
      // Aligned with -Y-axis (bottom face)
      return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, -1)];
    } else if (normal.dot(new THREE.Vector3(0, 0, 1)) > 0.9) {
      // Aligned with Z-axis (front face)
      return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, -1, 0)];
    } else if (normal.dot(new THREE.Vector3(0, 0, -1)) > 0.9) {
      // Aligned with -Z-axis (back face)
      return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)];
    }

    // Default to XY plane if none of the conditions match
    return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)];
  }
)}

function _123(focusPlane){return(
focusPlane
)}

function _124(Inputs,surface_planes,$0){return(
Inputs.bind(
  Inputs.range([-1, surface_planes.length - 1], {
    label: "focus plane",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _125(focusPlane){return(
focusPlane
)}

function _126(md){return(
md`## Meshes`
)}

function _createPlaneMesh(THREE,Vector3){return(
{
  prompt:
    "Write a function createPlaneMesh for displaying a plane, with a color and opacity.",
  time: 1714156508940,
  comment:
    "Define a function to create a mesh representing a plane with custom width, height, color, and opacity"
} &&
  function createPlaneMesh(plane, color = 0x2194ce, opacity = 0.5) {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: opacity
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Align the mesh with the plane
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new Vector3(0, 0, 1),
      plane.normal
    );
    mesh.quaternion.copy(quaternion);
    mesh.position.copy(plane.coplanarPoint(new Vector3()));

    return mesh;
  }
)}

function _createShape(THREE,loader,chooseBasis,Vector3){return(
{
  prompt:
    "createShape. Given a Plane and an array of 2D points  [x, y][], a color and an opacity, build a positioned Mesh using ShapeGeometry ",
  time: 1714307169388,
  comment:
    "Define a function to create a Mesh from a ShapeGeometry defined by a Plane and an array of 2D points, with specified color and opacity"
} &&
  function createShape(
    plane,
    boundaries,
    { color = 0x00ff00, opacity = 1, blobURL } = {}
  ) {
    const shape = new THREE.Shape();
    const max = [boundaries[0][0][0], boundaries[0][0][1]];
    const min = [boundaries[0][0][0], boundaries[0][0][1]];

    // Start at the first point
    boundaries.forEach((points) => {
      shape.moveTo(points[0][0], points[0][1]);

      // Line to each subsequent point
      points.slice(1).forEach((point) => {
        if (point[0] < min[0]) min[0] = point[0];
        if (point[1] < min[1]) min[1] = point[1];
        if (point[0] > max[0]) max[0] = point[0];
        if (point[1] > max[1]) max[1] = point[1];
        shape.lineTo(point[0], point[1]);
      });
      shape.lineTo(points[0][0], points[0][1]); // close the shape
    });
    let texture = undefined;
    if (blobURL) {
      texture = loader.load(blobURL);
      texture.repeat.set(1 / (max[0] - min[0]), -1 / (max[1] - min[1]));
      texture.offset.set(
        -min[0] / (max[0] - min[0]),
        min[1] / (max[1] - min[1])
      );
      texture.center.set(0, 1);
    }
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: opacity < 1,
      opacity: opacity,
      ...(blobURL && { map: texture })
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Set the position and orientation of the mesh to match the plane
    const [basisX, basisY] = chooseBasis(plane);
    const basisZ = new THREE.Vector3().crossVectors(basisX, basisY).normalize();
    const rotationMatrix = new THREE.Matrix4().makeBasis(
      basisX,
      basisY,
      basisZ
    );
    mesh.applyMatrix4(rotationMatrix);
    mesh.position.copy(plane.coplanarPoint(new Vector3()));

    return mesh;
  }
)}

function _createRectangleMesh(Vector3,THREE){return(
{
  prompt:
    "write a function for creating a mesh rectangle with a given width, height and normal. Color, including transparency",
  time: 1713993580033,
  comment:
    "Define a function for creating a mesh rectangle with specified width, height, normal vector, color, and transparency"
} &&
  function createRectangleMesh(
    width,
    height,
    normal,
    color = 0xffffff,
    opacity = 0.5,
    position = new Vector3(0, 0, 0)
  ) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: opacity
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Align the mesh with the given normal
    const alignVector = new Vector3(0, 0, 1);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      alignVector,
      normal
    );
    mesh.quaternion.copy(quaternion);
    mesh.position.add(position);

    return mesh;
  }
)}

function _createInfiniteLine(THREE,Vector3){return(
{
  prompt:
    "create a function for drawing an infinite line defined with a Line3. Give it a custom color",
  time: 1714063101344,
  comment:
    "Define a function to draw an infinite line from a Line3 object with a custom color"
} &&
  function createInfiniteLine(line, color = 0xff0000) {
    const material = new THREE.LineBasicMaterial({
      color: color
    });
    const geometry = new THREE.BufferGeometry().setFromPoints([
      line.start.clone().addScaledVector(line.delta(new Vector3()), -1e2), // add a very large negative multiple
      line.start.clone().addScaledVector(line.delta(new Vector3()), 1e2) // add a very large positive multiple
    ]);
    const infiniteLine = new THREE.Line(geometry, material);
    return infiniteLine;
  }
)}

function _createLineSegment(THREE){return(
{
  prompt:
    "create a function for drawing a line segment defined with a Line3. Give it a custom color",
  time: 1714243889593,
  comment:
    "Define a function to draw a line segment from a Line3 object with a custom color"
} &&
  function createLineSegment(line, color = 0x00ff00) {
    const material = new THREE.LineBasicMaterial({
      color: color
    });
    const geometry = new THREE.BufferGeometry().setFromPoints([
      line.start,
      line.end
    ]);
    const lineSegment = new THREE.Line(geometry, material);
    return lineSegment;
  }
)}

function _createPoint(THREE){return(
{
  prompt:
    "write a function createPoint which takes a arg1: Vector3, arg 2 an options object for setting a size, color and an opacity",
  time: 1714237680911,
  comment:
    "Define a function to create a point (represented as a sphere) in 3D space with customizable size, color, and opacity"
} &&
  function createPoint(
    position,
    { size = 0.1, color = 0xff0000, opacity = 1 } = {}
  ) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity
    });
    const pointMesh = new THREE.Mesh(geometry, material);
    pointMesh.position.copy(position);
    return pointMesh;
  }
)}

function _createRectangularMesh(THREE){return(
{
  prompt:
    "Write a createRectangularMesh which takes 4 points and build a mesh from with a given color and opacity",
  time: 1714217873218,
  comment:
    "Define a function to create a mesh from four points with a specified color and opacity"
} &&
  function createRectangularMesh(
    p1,
    p2,
    p3,
    p4,
    color = 0x00ff00,
    opacity = 0.2
  ) {
    const vertices = new Float32Array(
      p1.x !== undefined
        ? [
            p1.x,
            p1.y,
            p1.z, // v0
            p2.x,
            p2.y,
            p2.z, // v1
            p3.x,
            p3.y,
            p3.z, // v2
            p4.x,
            p4.y,
            p4.z // v3
          ]
        : [...p1, ...p2, ...p3, ...p4]
    );
    const geometry = new THREE.BufferGeometry(vertices, 3);
    geometry.setIndex([0, 1, 2, 2, 3, 0]);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: opacity
    });

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
)}

function _createSimpleLight(Vector3,THREE){return(
{
  prompt:
    "write a function for creating a simple light with extendable paramaterization as object args",
  time: 1714810143025,
  comment:
    "Define a function to create different types of lights (point, ambient, directional) with parameterized options for type, color, intensity, and position."
} &&
  function createSimpleLight({
    type = "point", // 'point', 'ambient', 'directional'
    color = 0xffffff,
    intensity = 1,
    position = new Vector3(0, 0, 0)
  }) {
    let light;
    switch (type) {
      case "point":
        light = new THREE.PointLight(color, intensity);
        light.position.set(position);
        break;
      case "ambient":
        light = new THREE.AmbientLight(color, intensity);
        break;
      case "directional":
        light = new THREE.DirectionalLight(color, intensity);
        light.position.set(position);
        break;
      default:
        throw new Error("Unsupported light type");
    }
    return light;
  }
)}

function _135(md){return(
md`## Plots`
)}

function _plotShape2D(Plot){return(
(coords) =>
  Plot.plot({
    marks: [Plot.dot(coords, { x: (e) => e[0], y: (e) => e[1] })]
  })
)}

function _137(md){return(
md`## Scene`
)}

function _138(shapes2D){return(
shapes2D
)}

function _139(Inputs,surface_planes,$0){return(
Inputs.bind(
  Inputs.range([-1, surface_planes.length - 1], {
    label: "focus plane",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _loader(THREE){return(
new THREE.TextureLoader()
)}

function _scene(THREE,showEdges,edges,focusEdges,createLineSegment,createPoint,showSurfaces,focusSurfaceIdx,surfaces,createRectangularMesh,showShapes,targetShape,shapes2D,createShape,focusPlane,targetJoint,showPlan,showPart,planBlobs,getBoundingBoxCorners,partBlobs)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  if (showEdges && edges) {
    (focusEdges ? [focusEdges] : edges).forEach((lines) => {
      lines.forEach((line) => {
        scene.add(createLineSegment(line, 0xff00ff));
        scene.add(
          createPoint(line.start, {
            color: 0xff00ff
          })
        );
        scene.add(
          createPoint(line.end, {
            color: 0xff00ff
          })
        );
      });
    });
  }
  if (showSurfaces) {
    (focusSurfaceIdx !== -1 ? [surfaces[focusSurfaceIdx]] : surfaces).forEach(
      (surface) => {
        scene.add(createRectangularMesh(...surface, 0xcd7f32, 0.3));
      }
    );
  }
  if (showShapes) {
    if (targetShape === undefined) {
      shapes2D.forEach((points, plane) => {
        const mesh = createShape(plane, points, {
          color: 0xffffff,
          opacity: 0.4
        });
        scene.add(mesh);
        scene.add(
          new THREE.ArrowHelper(plane.normal, mesh.position, 25, 0xff0000)
        );
      });
    } else {
      const mesh = createShape(focusPlane, shapes2D.get(focusPlane), {
        color: 0xffffff,
        opacity: 0.4
      });
      scene.add(mesh);
      scene.add(
        new THREE.ArrowHelper(focusPlane.normal, mesh.position, 25, 0xff0000)
      );
    }
  }
  if (targetJoint) {
    [
      [targetJoint.plane1, targetJoint.lines1],
      [targetJoint.plane2, targetJoint.lines2]
    ].forEach(([plane, lines]) => {
      lines.forEach((line) => {
        scene.add(createLineSegment(line, 0xffff00));
        scene.add(
          createPoint(line.start, {
            color: 0xffff00
          })
        );
        scene.add(
          createPoint(line.end, {
            color: 0xffff00
          })
        );
      });
      targetJoint.sharedEdges.forEach((sharedEdge) => {
        scene.add(createLineSegment(sharedEdge, 0xff00ff));
        scene.add(
          createPoint(sharedEdge.start, {
            color: 0xff00ff
          })
        );
        scene.add(
          createPoint(sharedEdge.end, {
            color: 0xff00ff
          })
        );
      });
    });
  }
  if (showPlan || showPart) {
    (focusPlane ? [focusPlane] : planBlobs.keys()).forEach((plane) => {
      const mesh = createShape(
        plane,
        [getBoundingBoxCorners(shapes2D.get(plane))],
        {
          color: 0xffffff,
          opacity: 1,
          blobURL: showPlan ? planBlobs.get(plane) : partBlobs.get(plane)
        }
      );
      scene.add(mesh);
    });
  }
  return scene;
}


function _142(planBlobs){return(
planBlobs
)}

function _height(){return(
600
)}

function _rotateCameraAroundOrigin(THREE){return(
{
  prompt:
    "write a function to rotate the camera around the origin by an angle x around a rotation vector y",
  time: 1714309064093,
  comment:
    "Define a function to rotate the camera around the origin by a specified angle around a given rotation vector"
} &&
  function rotateCameraAroundOrigin(camera, angle, rotationVector) {
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      rotationVector,
      angle
    );
    camera.position.applyQuaternion(quaternion);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure the camera still looks at the origin
  }
)}

function _addBoxMeshesFrombounds(Vector3,createRectangularMesh){return(
{
  prompt:
    'write a function that given an "bounds" of the form \n```\nbounds = [\n  [0, 2], \n  [0, 2],\n  [0, 2]\n]\n```\nand a scene it adds six rectangular meshes of the box',
  time: 1714218028455,
  comment:
    "Define a function that adds six rectangular meshes to represent the sides of a box defined by bounds"
} &&
  function addBoxMeshesFrombounds(scene, bounds) {
    const [xRange, yRange, zRange] = bounds;

    // Points of the box
    const p000 = new Vector3(xRange[0], yRange[0], zRange[0]);
    const p001 = new Vector3(xRange[0], yRange[0], zRange[1]);
    const p010 = new Vector3(xRange[0], yRange[1], zRange[0]);
    const p011 = new Vector3(xRange[0], yRange[1], zRange[1]);
    const p100 = new Vector3(xRange[1], yRange[0], zRange[0]);
    const p101 = new Vector3(xRange[1], yRange[0], zRange[1]);
    const p110 = new Vector3(xRange[1], yRange[1], zRange[0]);
    const p111 = new Vector3(xRange[1], yRange[1], zRange[1]);

    // Add meshes to the scene
    scene.add(createRectangularMesh(p000, p001, p011, p010, 0xff0000)); // Front face
    scene.add(createRectangularMesh(p100, p101, p111, p110, 0xff0000)); // Back face
    scene.add(createRectangularMesh(p000, p100, p110, p010, 0x00ff00)); // Left face
    scene.add(createRectangularMesh(p001, p101, p111, p011, 0x00ff00)); // Right face
    scene.add(createRectangularMesh(p000, p100, p101, p001, 0x0000ff)); // Bottom face
    scene.add(createRectangularMesh(p010, p110, p111, p011, 0x0000ff)); // Top face
  }
)}

function _146(focusEdges){return(
focusEdges
)}

function _camera(width,height,THREE,Vector3)
{
  const fov = 45;
  const aspect = width / 2 / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 30, -100);
  camera.lookAt(new Vector3(0, 0, 0));
  return camera;
}


function _renderer(THREE,width,height,camera,scene,invalidation)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width / 2, height);
  renderer.setPixelRatio(devicePixelRatio);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => renderer.render(scene, camera));
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  return renderer;
}


function* _render_loop(spin,rotateCameraAroundOrigin,camera,Vector3,renderer,scene)
{
  while (true) {
    if (spin) {
      rotateCameraAroundOrigin(camera, 0.01, new Vector3(0, 1, 0));
    }
    renderer.render(scene, camera);
    yield null;
  }
}


function _150(md){return(
md`## THREE Basics`
)}

function _Vector3(THREE){return(
THREE.Vector3
)}

function _vector3(Vector3){return(
new Vector3()
)}

function _Line3(THREE){return(
THREE.Line3
)}

function _Triangle(THREE){return(
THREE.Triangle
)}

function _line3(Line3){return(
new Line3()
)}

function _Plane(THREE){return(
THREE.Plane
)}

function _plane(Plane){return(
new Plane()
)}

async function _THREE(require)
{
  const THREE = (window.THREE = await require("three@0.159.0/build/three.js"));

  THREE.OrbitControls = (
    await import("https://unpkg.com/three@0.159.0/examples/jsm/controls/OrbitControls.js?module")
  ).OrbitControls;
  return THREE;
}


function _160(md){return(
md`## Paper.js Basics`
)}

function _paper_canvas(htl){return(
htl.html`<canvas id="paper" height="0px">`
)}

async function _paper(require)
{
  const paper = await require("paper@0.12.17");
  paper.setup(document.getElementById("paper_canvas"));
  return paper;
}


function _polygon(paper){return(
new paper.Path([
  new paper.Point(50, 50),
  new paper.Point(150, 50),
  new paper.Point(150, 150),
  new paper.Point(50, 150)
])
)}

function _line(paper){return(
new paper.Path({
  segments: [
    [0, 100],
    [200, 100]
  ],
  strokeColor: "red"
})
)}

function _intersections(line,polygon){return(
line.getIntersections(polygon)
)}

function _166(md){return(
md`## Finger Joints`
)}

function _sideA(createBoxJointSide,materialThickness,fingerAdd,fingerSubtract){return(
createBoxJointSide({
  color: 0x00ffff,
  width: 10,
  height: 15,
  depth: materialThickness,
  opacity: 0.9,
  negativeFingerOffset: fingerAdd,
  positiveFingerOffset: fingerSubtract,
  fingerPairs: 10
})
)}

function _sideB(createBoxJointSide,materialThickness,fingerSubtract,fingerAdd){return(
createBoxJointSide({
  color: 0xff00ff,
  width: 10,
  height: -15,
  depth: materialThickness,
  opacity: 0.9,
  negativeFingerOffset: fingerSubtract,
  positiveFingerOffset: fingerAdd,
  fingerPairs: 10
})
)}

function _createBoxJointSide(THREE){return(
{
  prompt:
    "createBoxJointSide should make an informative way to explore mating characteristics of a box joint. It should be a square peice of material with a box join on one side. You should be able to alter the arguments (in an object) for the width, height, depth of the material, then change how much the positive side of the fingers are pushed out from the height, and a different parameter for how much the negative side of the fingers are pulled in. you should also be able to set how many finger pairs there are. It should be a 3d part extruded from a Shape",
  time: 1714808649416,
  comment:
    "Define a function to create a box joint side with configurable dimensions, finger offsets, and number of finger pairs. The part is a 3D extrusion from a Shape."
} &&
  function createBoxJointSide({
    width = 10,
    height = 10,
    depth = 1,
    positiveFingerOffset = 0.2,
    negativeFingerOffset = 0.2,
    fingerPairs = 3,
    color = 0x00ff00,
    opacity = 0.5
  }) {
    const shape = new THREE.Shape();
    const fingerWidth = width / (2 * fingerPairs);

    shape.moveTo(width, height);

    shape.lineTo(0, height);

    for (let i = 0; i < fingerPairs; i++) {
      if (i !== 0) shape.lineTo(i * 2 * fingerWidth, -negativeFingerOffset);
      shape.lineTo(i * 2 * fingerWidth, positiveFingerOffset);

      shape.lineTo((i * 2 + 1) * fingerWidth, positiveFingerOffset);
      shape.lineTo((i * 2 + 1) * fingerWidth, -negativeFingerOffset);
    }
    shape.lineTo(width, -negativeFingerOffset);

    shape.lineTo(width, height);

    const extrudeSettings = {
      steps: 1,
      depth: depth,
      bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshLambertMaterial({
      color: color,
      opacity: opacity,
      transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }
)}

function _jointScene(THREE,createLineSegment,Line3,Vector3)
{
  
  ({
    prompt: "create a scene containing a box joint",
    time: 1714807594230,
    comment:
      "Define a function to create a scene containing a box joint using four sides, positioned and rotated to form a box."
  });
  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // soft white light
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(100, 100, -100);
  scene.add(directionalLight);

  scene.add(
    createLineSegment(
      new Line3(new Vector3(-1, 0, 0), new Vector3(11, 0, 0)),
      0xffffff
    )
  );

  return scene;
}


function _171(jointScene,sideA,sideB,invalidation)
{
  jointScene.add(sideA);
  jointScene.add(sideB);
  invalidation.then(() => {
    jointScene.remove(sideA);
    jointScene.remove(sideB);
  });
}


function _jointWorld(width,height,THREE,Vector3,jointScene,invalidation)
{
  ({
    prompt: "create renderer and camera for visualizing the boxJointScene",
    time: 1714807698604,
    comment:
      "Define a function to setup a renderer and camera for visualizing the scene, including the box joint."
  });

  const fov = 45;
  const aspect = width / 2 / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-6, 0, -2);
  camera.lookAt(new Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width / 2, height);
  renderer.setPixelRatio(devicePixelRatio);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () =>
    renderer.render(jointScene, camera)
  );
  invalidation.then(() => (controls.dispose(), renderer.dispose()));

  return { renderer, camera, controls };
}


function _173(jointWorld,$0,htl){return(
htl.html`<div style="display: flex">
  ${jointWorld.renderer.domElement}
  ${$0}
</div>`
)}

function _jointAngle(Inputs){return(
Inputs.range([-170, 170], {
  label: "joint angle",
  value: -90
})
)}

function _materialThickness(Inputs){return(
Inputs.range([0, 10], {
  label: "thickness",
  value: 2
})
)}

function _fingerSubtract(Inputs){return(
Inputs.range([-10, 50], { label: "finger retraction" })
)}

function _fingerAdd(Inputs){return(
Inputs.range([-5, 50], { label: "finger extension" })
)}

function _auto_fit_fingers(Inputs){return(
Inputs.toggle({
  label: "auto fit finger params",
  value: true
})
)}

function _angleToFingerExtension(materialThickness,deg2rad){return(
(angle, { thickness = materialThickness } = {}) => {
  const theta = deg2rad(angle);
  if (angle <= -90) {
    return Math.tan(theta - Math.PI / 2) * thickness;
  } else if (angle < 0 && angle > -90) {
    return 0;
  } else if (angle > 0 && angle <= 90) {
    // MT = a + b
    const a = (Math.cos(theta) * thickness) / (1 + Math.cos(theta));
    return Math.tan(theta) * a;
  } else if (angle > 90) {
    // MT = a + b
    return thickness / Math.cos(theta - Math.PI / 2);
  }
}
)}

function _angleToFingerRetraction(materialThickness,deg2rad,angleToFingerExtension){return(
(angle, { thickness = materialThickness } = {}) => {
  const theta = deg2rad(angle);
  if (angle >= 90) {
    return 0;
  } else if (angle >= 0) {
    const extension = angleToFingerExtension(angle);
    return Math.cos(theta) * extension;
  } else if (angle >= -90) {
    return Math.sin(theta + Math.PI) * thickness;
  } else {
    const theta2 = deg2rad(-angle - 90);
    const b = Math.tan(theta2) * thickness;
    const d = thickness / Math.cos(theta2);
    return d + b;
  }
}
)}

function _fingerData(angleToFingerRetraction,angleToFingerExtension)
{
  const data = [];
  for (let angle = -170; angle <= 170.5; angle += 1) {
    data.push({
      angle,
      retraction: angleToFingerRetraction(angle),
      extension: angleToFingerExtension(angle)
    });
  }
  return data;
}


function _fingerMeasures(Plot,height,jointAngle,fingerData){return(
Plot.plot({
  height,
  y: {
    domain: [-5, 5],
    label: "offset"
  },
  marks: [
    Plot.ruleX([-90, 0, 90], { stroke: "lightgrey" }),
    Plot.ruleX([jointAngle], { stroke: "blue" }),
    Plot.ruleY([0]),
    Plot.lineY(fingerData, {
      x: "angle",
      y: "retraction",
      stroke: "red",
      tip: true
    }),
    Plot.lineY(fingerData, {
      x: "angle",
      y: "extension",
      stroke: "green",
      tip: true
    })
  ]
})
)}

function _183(auto_fit_fingers,$0,angleToFingerRetraction,jointAngle,$1,angleToFingerExtension,Event)
{
  if (auto_fit_fingers) {
    $0.value = angleToFingerRetraction(jointAngle);
    $1.value = angleToFingerExtension(jointAngle);

    $0.dispatchEvent(new Event("input"));
    $1.dispatchEvent(new Event("input"));
  }
}


function _184(sideB,Vector3,deg2rad,jointAngle)
{
  sideB.quaternion.setFromAxisAngle(new Vector3(1, 0, 0), deg2rad(jointAngle));
}


function* _185(jointWorld,jointScene)
{
  while (true) {
    jointWorld.renderer.render(jointScene, jointWorld.camera);
    yield null;
  }
}


function _186(md){return(
md`# [Robocoop](https://observablehq.com/@tomlarkworthy/robocoop) Assistant`
)}

function _187($0){return(
$0
)}

function _188(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _189($0){return(
$0
)}

function _190(md){return(
md`## Current Chat context`
)}

function _191($0){return(
$0
)}

function _markdown_skill(md,mermaid,htl,tex){return(
{
  prompt: "Write a markdown skill cell",
  time: 1699719020249,
  comment: "Complex markdown skill cell"
} &&
  md`
## Markdown Skill
This demonstrates advanced usage of markdown \`md\` literal

<details><summary>example</summary>
${md`## Mermaid Diagram
${mermaid`
graph TB;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`}

## Live JavaScript Execution
${(function () {
  const span = htl.html`<span>`;
  let count = 0;
  span.textContent = count;
  setInterval(() => {
    count++;
    span.textContent = count;
  }, 1000);
  return span;
})()}

## KaTeX
The quadratic formula is ${tex`x = {-b \pm \sqrt{b^2-4ac} \over 2a}`}

${tex`
\begin{aligned}
  (a+b)^2 &= (a+b)(a+b) \\
  &= a^2 + 2ab + b^2
\end{aligned}
`}

## Details/Summary
<details>
  <summary>Expandable content</summary>
  ${md`
  - Item 1
  - Item 2
  - Item 3
  `}
</details>

## HTML Figure
<figure>
  <a href="https://www.reddit.com/r/robocoop/" target="_blank">
    <img src="https://avatars.githubusercontent.com/endpointservices" alt="Endpoint Services" width="100" height="100">
  </a>
  <figcaption>Figure: Endpoint Services. Click to visit the Roboco-op subreddit.</figcaption>
</figure>

## Blocks
\`Backticks\` need to be escaped, it is easier to use ~ instead
~~~js
  () => throw Error()
~~~
`}
</details>
`
)}

function _193(md){return(
md`tick the cells to include in the next prompt`
)}

function _194($0){return(
$0
)}

function _195($0){return(
$0
)}

function _196(md){return(
md`### AI Settings`
)}

function _197($0){return(
$0
)}

function _198($0){return(
$0
)}

function _199($0){return(
$0
)}

function _200(background_tasks){return(
background_tasks
)}

function _202(md){return(
md`---`
)}

function _205(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof boxParams")).define("viewof boxParams", ["view","Inputs"], _boxParams);
  main.variable(observer("boxParams")).define("boxParams", ["Generators", "viewof boxParams"], (G, _) => G.input(_));
  main.variable(observer("apply_box")).define("apply_box", ["boxParams","Vector3","viewof surfaces","Event"], _apply_box);
  main.variable(observer("viewof flangeParams")).define("viewof flangeParams", ["view","Inputs"], _flangeParams);
  main.variable(observer("flangeParams")).define("flangeParams", ["Generators", "viewof flangeParams"], (G, _) => G.input(_));
  main.variable(observer("apply_flange")).define("apply_flange", ["flangeParams","viewof surfaces","Event"], _apply_flange);
  main.variable(observer()).define(["renderer","focusPart","htl"], _6);
  main.variable(observer("stepEffect")).define("stepEffect", ["viewof showSurfaces","viewof showPlanes","viewof showEdges","viewof showShapes","viewof showPlan","viewof showPart","step","Event"], _stepEffect);
  main.variable(observer("viewof spin")).define("viewof spin", ["Inputs"], _spin);
  main.variable(observer("spin")).define("spin", ["Generators", "viewof spin"], (G, _) => G.input(_));
  main.variable(observer("viewof step")).define("viewof step", ["Inputs"], _step);
  main.variable(observer("step")).define("step", ["Generators", "viewof step"], (G, _) => G.input(_));
  main.variable(observer("viewof focusSurfaceIdx")).define("viewof focusSurfaceIdx", ["Inputs","surfaces"], _focusSurfaceIdx);
  main.variable(observer("focusSurfaceIdx")).define("focusSurfaceIdx", ["Generators", "viewof focusSurfaceIdx"], (G, _) => G.input(_));
  main.variable(observer("viewof focusPlaneIdx")).define("viewof focusPlaneIdx", ["Inputs","surface_planes"], _focusPlaneIdx);
  main.variable(observer("focusPlaneIdx")).define("focusPlaneIdx", ["Generators", "viewof focusPlaneIdx"], (G, _) => G.input(_));
  main.variable(observer("viewof focusJointIdx")).define("viewof focusJointIdx", ["Inputs","joints"], _focusJointIdx);
  main.variable(observer("focusJointIdx")).define("focusJointIdx", ["Generators", "viewof focusJointIdx"], (G, _) => G.input(_));
  main.variable(observer("viewof scale")).define("viewof scale", ["Inputs"], _scale);
  main.variable(observer("scale")).define("scale", ["Generators", "viewof scale"], (G, _) => G.input(_));
  main.variable(observer("viewof material_thickness")).define("viewof material_thickness", ["Inputs"], _material_thickness);
  main.variable(observer("material_thickness")).define("material_thickness", ["Generators", "viewof material_thickness"], (G, _) => G.input(_));
  main.variable(observer("viewof fingerWidth")).define("viewof fingerWidth", ["Inputs"], _fingerWidth);
  main.variable(observer("fingerWidth")).define("fingerWidth", ["Generators", "viewof fingerWidth"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("cautious", child1);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof surfaces")).define("viewof surfaces", ["Inputs"], _surfaces);
  main.variable(observer("surfaces")).define("surfaces", ["Generators", "viewof surfaces"], (G, _) => G.input(_));
  main.variable(observer("surface_planes")).define("surface_planes", ["dedupe","eq","surfaces","surfaceToPlane"], _surface_planes);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof showSurfaces")).define("viewof showSurfaces", ["Inputs"], _showSurfaces);
  main.variable(observer("showSurfaces")).define("showSurfaces", ["Generators", "viewof showSurfaces"], (G, _) => G.input(_));
  main.variable(observer("vectorSurfaces")).define("vectorSurfaces", ["surfaces","Vector3"], _vectorSurfaces);
  main.variable(observer("focusSurface")).define("focusSurface", ["vectorSurfaces","focusSurfaceIdx"], _focusSurface);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusPlaneIdx"], _24);
  main.variable(observer("focusPlane")).define("focusPlane", ["surface_planes","focusPlaneIdx"], _focusPlane);
  main.variable(observer("surfacesOnPlaneAsPath")).define("surfacesOnPlaneAsPath", ["chooseBasis","Vector3","paper"], _surfacesOnPlaneAsPath);
  main.variable(observer("focusPlaneIdxPaths")).define("focusPlaneIdxPaths", ["focusPlane","surfacesOnPlaneAsPath","vectorSurfaces"], _focusPlaneIdxPaths);
  main.variable(observer("unionPaths")).define("unionPaths", _unionPaths);
  main.variable(observer("reverseInnerPaths")).define("reverseInnerPaths", _reverseInnerPaths);
  main.variable(observer("focusPlanePath")).define("focusPlanePath", ["planePaths","focusPlane"], _focusPlanePath);
  main.variable(observer("viewof showPlanes")).define("viewof showPlanes", ["Inputs"], _showPlanes);
  main.variable(observer("showPlanes")).define("showPlanes", ["Generators", "viewof showPlanes"], (G, _) => G.input(_));
  main.variable(observer("planePaths")).define("planePaths", ["mapValues","surface_planes","unionPaths","surfacesOnPlaneAsPath","vectorSurfaces","reverseInnerPaths"], _planePaths);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("projectPathTo3D")).define("projectPathTo3D", ["chooseBasis","Vector3","Line3"], _projectPathTo3D);
  main.variable(observer("viewof showEdges")).define("viewof showEdges", ["Inputs"], _showEdges);
  main.variable(observer("showEdges")).define("showEdges", ["Generators", "viewof showEdges"], (G, _) => G.input(_));
  main.variable(observer("edges")).define("edges", ["mapValues","planePaths","projectPathTo3D"], _edges);
  main.variable(observer("focusEdges")).define("focusEdges", ["focusPlane","edges"], _focusEdges);
  main.variable(observer("focusEdgesAll")).define("focusEdgesAll", ["edges"], _focusEdgesAll);
  main.variable(observer("viewof showShapes")).define("viewof showShapes", ["Inputs"], _showShapes);
  main.variable(observer("showShapes")).define("showShapes", ["Generators", "viewof showShapes"], (G, _) => G.input(_));
  main.variable(observer("shapes2D")).define("shapes2D", ["mapValues","planePaths"], _shapes2D);
  main.variable(observer("targetShape")).define("targetShape", ["shapes2D","focusPlane"], _targetShape);
  main.variable(observer("shapePlot")).define("shapePlot", ["targetShape","plotShape2D"], _shapePlot);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusPlaneIdx"], _44);
  main.variable(observer("optimizedShape2D")).define("optimizedShape2D", ["shapes2D"], _optimizedShape2D);
  main.variable(observer("optimizedFocusShape")).define("optimizedFocusShape", ["optimizedShape2D","surface_planes","focusPlaneIdx"], _optimizedFocusShape);
  main.variable(observer("optimizedShapePlot")).define("optimizedShapePlot", ["optimizedFocusShape","plotShape2D"], _optimizedShapePlot);
  main.variable(observer("findShapeConnections")).define("findShapeConnections", ["intersectShapes","rad2deg","angleBetweenPlanes","Vector3"], _findShapeConnections);
  main.variable(observer("joints")).define("joints", ["findShapeConnections","edges"], _joints);
  main.variable(observer()).define(["Inputs","joints","viewof focusJointIdx"], _50);
  main.variable(observer("targetJoint")).define("targetJoint", ["joints","focusJointIdx"], _targetJoint);
  main.variable(observer("visualizeJointGraph")).define("visualizeJointGraph", ["dot","edges","toString","targetJoint","focusPlane"], _visualizeJointGraph);
  main.variable(observer()).define(["visualizeJointGraph","joints"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("neighbourhood")).define("neighbourhood", _neighbourhood);
  main.variable(observer("focusNeighbourhood")).define("focusNeighbourhood", ["neighbourhood","focusPlane","joints"], _focusNeighbourhood);
  main.variable(observer("neighbourhoods")).define("neighbourhoods", ["surface_planes","neighbourhood","joints"], _neighbourhoods);
  main.variable(observer("focusBoundaries")).define("focusBoundaries", ["focusPlane","boundaries"], _focusBoundaries);
  main.variable(observer("boundaries")).define("boundaries", ["surface_planes","projectPathTo3D","planePaths"], _boundaries);
  main.variable(observer("generatePerimeterPlan")).define("generatePerimeterPlan", ["intersectLines","eq","Line3"], _generatePerimeterPlan);
  main.variable(observer("projectPlan")).define("projectPlan", ["chooseBasis","Vector3"], _projectPlan);
  main.variable(observer("focusPlan")).define("focusPlan", ["focusPlane","projectPlan","generatePerimeterPlan","focusNeighbourhood","focusBoundaries"], _focusPlan);
  main.variable(observer("plans")).define("plans", ["surface_planes","projectPlan","generatePerimeterPlan","neighbourhoods","boundaries"], _plans);
  main.variable(observer("planViz")).define("planViz", ["Plot"], _planViz);
  main.variable(observer("focusPlanViz")).define("focusPlanViz", ["focusPlan","planViz"], _focusPlanViz);
  main.variable(observer("viewof showPlan")).define("viewof showPlan", ["Inputs"], _showPlan);
  main.variable(observer("showPlan")).define("showPlan", ["Generators", "viewof showPlan"], (G, _) => G.input(_));
  main.variable(observer("planBlobs")).define("planBlobs", ["mapValues","plans","toBlobUrl","planViz"], _planBlobs);
  const child2 = runtime.module(define2);
  main.import("finger_clockwise_v1", child2);
  main.import("download_svg", child2);
  main.variable(observer("planToSVG")).define("planToSVG", ["material_thickness","d3","htl","download_svg","angleToFingerExtension","angleToFingerRetraction","finger_clockwise_v1","fingerWidth"], _planToSVG);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusPlaneIdx"], _70);
  main.variable(observer("viewof showPart")).define("viewof showPart", ["Inputs"], _showPart);
  main.variable(observer("showPart")).define("showPart", ["Generators", "viewof showPart"], (G, _) => G.input(_));
  main.variable(observer("partsSVG")).define("partsSVG", ["mapValues","plans","planToSVG","material_thickness"], _partsSVG);
  main.variable(observer()).define(["focusPlan","planToSVG","scale"], _73);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("partBlobs")).define("partBlobs", ["mapValues","partsSVG","toBlobUrl"], _partBlobs);
  main.variable(observer("focusBlobURL")).define("focusBlobURL", ["focusPlane","partBlobs"], _focusBlobURL);
  main.variable(observer("focusPart")).define("focusPart", ["focusPlan","planToSVG","scale"], _focusPart);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.variable(observer("rad2deg")).define("rad2deg", _rad2deg);
  main.variable(observer("angleBetweenPlanes")).define("angleBetweenPlanes", ["THREE"], _angleBetweenPlanes);
  main.variable(observer("angleBetweenPlanesExample")).define("angleBetweenPlanesExample", ["rad2deg","angleBetweenPlanes","Plane","Vector3"], _angleBetweenPlanesExample);
  main.variable(observer("eq")).define("eq", ["Plane","Vector3","Line3"], _eq);
  main.variable(observer("dedupe")).define("dedupe", _dedupe);
  main.variable(observer("mapValues")).define("mapValues", _mapValues);
  main.variable(observer("normalizeLines")).define("normalizeLines", ["eq"], _normalizeLines);
  main.variable(observer("surfaceToPlane")).define("surfaceToPlane", ["plane","Vector3"], _surfaceToPlane);
  main.variable(observer("intersectLines")).define("intersectLines", ["Vector3","overlapParallelLines"], _intersectLines);
  main.variable(observer("overlapParallelLines")).define("overlapParallelLines", ["Vector3","Line3"], _overlapParallelLines);
  main.variable(observer("intersectPlanes")).define("intersectPlanes", ["Line3","Vector3","intersectLines"], _intersectPlanes);
  main.variable(observer("lineOnPlane")).define("lineOnPlane", _lineOnPlane);
  main.variable(observer("findIntersectingVertices")).define("findIntersectingVertices", ["intersectLines","parseVector3","dedupe","eq"], _findIntersectingVertices);
  main.variable(observer("surfaceDistanceToPoint")).define("surfaceDistanceToPoint", ["Vector3","Triangle"], _surfaceDistanceToPoint);
  main.variable(observer("generateEvenlySpacedPoints")).define("generateEvenlySpacedPoints", ["THREE"], _generateEvenlySpacedPoints);
  main.variable(observer("extendLine")).define("extendLine", ["Vector3","Line3"], _extendLine);
  main.variable(observer("getBoundingBoxCorners")).define("getBoundingBoxCorners", _getBoundingBoxCorners);
  main.variable(observer("shape3DTo2D")).define("shape3DTo2D", ["chooseBasis","Vector3"], _shape3DTo2D);
  main.variable(observer()).define(["shape3DTo2D","targetJoint"], _98);
  main.variable(observer()).define(["targetJoint"], _99);
  main.variable(observer("shape2DToPath")).define("shape2DToPath", ["paper"], _shape2DToPath);
  main.variable(observer("findIntersectionTransitions")).define("findIntersectionTransitions", ["intersectPlanes","extendLine","intersectLines","dedupe","eq","Vector3"], _findIntersectionTransitions);
  main.variable(observer("findIntersectionTransitionsExample")).define("findIntersectionTransitionsExample", ["findIntersectionTransitions","targetJoint"], _findIntersectionTransitionsExample);
  main.variable(observer("isInsideShape3D")).define("isInsideShape3D", ["chooseBasis","shape3DTo2D","shape2DToPath","paper","Vector3"], _isInsideShape3D);
  main.variable(observer("isInsideShape3DExample")).define("isInsideShape3DExample", ["isInsideShape3D","Vector3","targetJoint"], _isInsideShape3DExample);
  main.variable(observer()).define(["targetJoint"], _105);
  main.variable(observer()).define(["targetJoint"], _106);
  main.variable(observer("intersectShapes")).define("intersectShapes", ["findIntersectionTransitions","Vector3","isInsideShape3D","Line3"], _intersectShapes);
  main.variable(observer("intersectShapesExample")).define("intersectShapesExample", ["intersectShapes","targetJoint"], _intersectShapesExample);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer("parseVector3")).define("parseVector3", ["Vector3"], _parseVector3);
  main.variable(observer("toString")).define("toString", _toString);
  main.variable(observer("toBlobUrl")).define("toBlobUrl", ["XMLSerializer"], _toBlobUrl);
  main.variable(observer("viewof geometrySuite")).define("viewof geometrySuite", ["createSuite"], _geometrySuite);
  main.variable(observer("geometrySuite")).define("geometrySuite", ["Generators", "viewof geometrySuite"], (G, _) => G.input(_));
  main.variable(observer()).define(["geometrySuite","Line3","Vector3","expect","intersectLines"], _114);
  main.variable(observer("testIntersectLinesRandom")).define("testIntersectLinesRandom", ["geometrySuite","Vector3","Line3","intersectLines","expect"], _testIntersectLinesRandom);
  main.variable(observer("testIntersectPlanesRandom")).define("testIntersectPlanesRandom", ["geometrySuite","Plane","Vector3","XZ","intersectPlanes","expect"], _testIntersectPlanesRandom);
  main.variable(observer("test3Dto2D")).define("test3Dto2D", ["geometrySuite","Plane","Vector3","unionPaths","surfacesOnPlaneAsPath","projectPathTo3D","expect"], _test3Dto2D);
  main.variable(observer()).define(["md"], _118);
  main.variable(observer("XY")).define("XY", ["Plane","Vector3"], _XY);
  main.variable(observer("XZ")).define("XZ", ["Plane","Vector3"], _XZ);
  main.variable(observer("YZ")).define("YZ", ["Plane","Vector3"], _YZ);
  main.variable(observer("chooseBasis")).define("chooseBasis", ["THREE"], _chooseBasis);
  main.variable(observer()).define(["focusPlane"], _123);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusPlaneIdx"], _124);
  main.variable(observer()).define(["focusPlane"], _125);
  main.variable(observer()).define(["md"], _126);
  main.variable(observer("createPlaneMesh")).define("createPlaneMesh", ["THREE","Vector3"], _createPlaneMesh);
  main.variable(observer("createShape")).define("createShape", ["THREE","loader","chooseBasis","Vector3"], _createShape);
  main.variable(observer("createRectangleMesh")).define("createRectangleMesh", ["Vector3","THREE"], _createRectangleMesh);
  main.variable(observer("createInfiniteLine")).define("createInfiniteLine", ["THREE","Vector3"], _createInfiniteLine);
  main.variable(observer("createLineSegment")).define("createLineSegment", ["THREE"], _createLineSegment);
  main.variable(observer("createPoint")).define("createPoint", ["THREE"], _createPoint);
  main.variable(observer("createRectangularMesh")).define("createRectangularMesh", ["THREE"], _createRectangularMesh);
  main.variable(observer("createSimpleLight")).define("createSimpleLight", ["Vector3","THREE"], _createSimpleLight);
  main.variable(observer()).define(["md"], _135);
  main.variable(observer("plotShape2D")).define("plotShape2D", ["Plot"], _plotShape2D);
  main.variable(observer()).define(["md"], _137);
  main.variable(observer()).define(["shapes2D"], _138);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusPlaneIdx"], _139);
  main.variable(observer("loader")).define("loader", ["THREE"], _loader);
  main.variable(observer("scene")).define("scene", ["THREE","showEdges","edges","focusEdges","createLineSegment","createPoint","showSurfaces","focusSurfaceIdx","surfaces","createRectangularMesh","showShapes","targetShape","shapes2D","createShape","focusPlane","targetJoint","showPlan","showPart","planBlobs","getBoundingBoxCorners","partBlobs"], _scene);
  main.variable(observer()).define(["planBlobs"], _142);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("rotateCameraAroundOrigin")).define("rotateCameraAroundOrigin", ["THREE"], _rotateCameraAroundOrigin);
  main.variable(observer("addBoxMeshesFrombounds")).define("addBoxMeshesFrombounds", ["Vector3","createRectangularMesh"], _addBoxMeshesFrombounds);
  main.variable(observer()).define(["focusEdges"], _146);
  main.variable(observer("camera")).define("camera", ["width","height","THREE","Vector3"], _camera);
  main.variable(observer("renderer")).define("renderer", ["THREE","width","height","camera","scene","invalidation"], _renderer);
  main.variable(observer("render_loop")).define("render_loop", ["spin","rotateCameraAroundOrigin","camera","Vector3","renderer","scene"], _render_loop);
  main.variable(observer()).define(["md"], _150);
  main.variable(observer("Vector3")).define("Vector3", ["THREE"], _Vector3);
  main.variable(observer("vector3")).define("vector3", ["Vector3"], _vector3);
  main.variable(observer("Line3")).define("Line3", ["THREE"], _Line3);
  main.variable(observer("Triangle")).define("Triangle", ["THREE"], _Triangle);
  main.variable(observer("line3")).define("line3", ["Line3"], _line3);
  main.variable(observer("Plane")).define("Plane", ["THREE"], _Plane);
  main.variable(observer("plane")).define("plane", ["Plane"], _plane);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  const child3 = runtime.module(define3);
  main.import("createSuite", child3);
  main.import("expect", child3);
  main.variable(observer()).define(["md"], _160);
  main.variable(observer("paper_canvas")).define("paper_canvas", ["htl"], _paper_canvas);
  main.variable(observer("paper")).define("paper", ["require"], _paper);
  main.variable(observer("polygon")).define("polygon", ["paper"], _polygon);
  main.variable(observer("line")).define("line", ["paper"], _line);
  main.variable(observer("intersections")).define("intersections", ["line","polygon"], _intersections);
  main.variable(observer()).define(["md"], _166);
  main.variable(observer("sideA")).define("sideA", ["createBoxJointSide","materialThickness","fingerAdd","fingerSubtract"], _sideA);
  main.variable(observer("sideB")).define("sideB", ["createBoxJointSide","materialThickness","fingerSubtract","fingerAdd"], _sideB);
  main.variable(observer("createBoxJointSide")).define("createBoxJointSide", ["THREE"], _createBoxJointSide);
  main.variable(observer("jointScene")).define("jointScene", ["THREE","createLineSegment","Line3","Vector3"], _jointScene);
  main.variable(observer()).define(["jointScene","sideA","sideB","invalidation"], _171);
  main.variable(observer("jointWorld")).define("jointWorld", ["width","height","THREE","Vector3","jointScene","invalidation"], _jointWorld);
  main.variable(observer()).define(["jointWorld","viewof fingerMeasures","htl"], _173);
  main.variable(observer("viewof jointAngle")).define("viewof jointAngle", ["Inputs"], _jointAngle);
  main.variable(observer("jointAngle")).define("jointAngle", ["Generators", "viewof jointAngle"], (G, _) => G.input(_));
  main.variable(observer("viewof materialThickness")).define("viewof materialThickness", ["Inputs"], _materialThickness);
  main.variable(observer("materialThickness")).define("materialThickness", ["Generators", "viewof materialThickness"], (G, _) => G.input(_));
  main.variable(observer("viewof fingerSubtract")).define("viewof fingerSubtract", ["Inputs"], _fingerSubtract);
  main.variable(observer("fingerSubtract")).define("fingerSubtract", ["Generators", "viewof fingerSubtract"], (G, _) => G.input(_));
  main.variable(observer("viewof fingerAdd")).define("viewof fingerAdd", ["Inputs"], _fingerAdd);
  main.variable(observer("fingerAdd")).define("fingerAdd", ["Generators", "viewof fingerAdd"], (G, _) => G.input(_));
  main.variable(observer("viewof auto_fit_fingers")).define("viewof auto_fit_fingers", ["Inputs"], _auto_fit_fingers);
  main.variable(observer("auto_fit_fingers")).define("auto_fit_fingers", ["Generators", "viewof auto_fit_fingers"], (G, _) => G.input(_));
  main.variable(observer("angleToFingerExtension")).define("angleToFingerExtension", ["materialThickness","deg2rad"], _angleToFingerExtension);
  main.variable(observer("angleToFingerRetraction")).define("angleToFingerRetraction", ["materialThickness","deg2rad","angleToFingerExtension"], _angleToFingerRetraction);
  main.variable(observer("fingerData")).define("fingerData", ["angleToFingerRetraction","angleToFingerExtension"], _fingerData);
  main.variable(observer("viewof fingerMeasures")).define("viewof fingerMeasures", ["Plot","height","jointAngle","fingerData"], _fingerMeasures);
  main.variable(observer("fingerMeasures")).define("fingerMeasures", ["Generators", "viewof fingerMeasures"], (G, _) => G.input(_));
  main.variable(observer()).define(["auto_fit_fingers","viewof fingerSubtract","angleToFingerRetraction","jointAngle","viewof fingerAdd","angleToFingerExtension","Event"], _183);
  main.variable(observer()).define(["sideB","Vector3","deg2rad","jointAngle"], _184);
  main.variable(observer()).define(["jointWorld","jointScene"], _185);
  main.variable(observer()).define(["md"], _186);
  main.variable(observer()).define(["viewof prompt"], _187);
  main.variable(observer()).define(["Inputs","suggestion"], _188);
  main.variable(observer()).define(["viewof suggestion"], _189);
  main.variable(observer()).define(["md"], _190);
  main.variable(observer()).define(["viewof context_viz"], _191);
  main.variable(observer("markdown_skill")).define("markdown_skill", ["md","mermaid","htl","tex"], _markdown_skill);
  main.variable(observer()).define(["md"], _193);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _194);
  main.variable(observer()).define(["viewof feedback_prompt"], _195);
  main.variable(observer()).define(["md"], _196);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _197);
  main.variable(observer()).define(["viewof api_endpoint"], _198);
  main.variable(observer()).define(["viewof settings"], _199);
  main.variable(observer()).define(["background_tasks"], _200);
  main.variable(observer()).define(["md"], _202);
  const child4 = runtime.module(define4);
  main.import("ask", child4);
  main.import("excludes", child4);
  main.import("cells", child4);
  main.import("update_context", child4);
  main.import("on_prompt", child4);
  main.import("api_call_response", child4);
  main.import("background_tasks", child4);
  main.import("mutable context", child4);
  main.import("context", child4);
  main.import("viewof prompt", child4);
  main.import("prompt", child4);
  main.import("viewof suggestion", child4);
  main.import("suggestion", child4);
  main.import("viewof settings", child4);
  main.import("settings", child4);
  main.import("viewof OPENAI_API_KEY", child4);
  main.import("OPENAI_API_KEY", child4);
  main.import("viewof api_endpoint", child4);
  main.import("api_endpoint", child4);
  main.import("viewof feedback_prompt", child4);
  main.import("feedback_prompt", child4);
  main.import("viewof feedback_cells_selector", child4);
  main.import("feedback_cells_selector", child4);
  main.import("viewof context_viz", child4);
  main.import("context_viz", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _205);
  return main;
}
