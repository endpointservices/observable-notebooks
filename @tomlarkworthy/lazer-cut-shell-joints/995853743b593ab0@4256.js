import define1 from "./1117987aeab1be0d@4151.js";
import define2 from "./274d57af526b92e4@97.js";
import define3 from "./c7a3b20cec5d4dd9@690.js";
import define4 from "./17c8ce433e1df58e@2489.js";
import define5 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Shell Joint Generator for Lazer Cutting`
)}

function _2(md){return(
md`## App`
)}

function _bounds(){return(
[
  [-5, 5], // x is 0 - 2
  [-5, 5],
  [-5, 5]
]
)}

function _surfaces(){return(
[
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
]
)}

function _stepMap(){return(
[
  [0],
  [0, 1],
  [0, 1, 2, 3],
  [0, 1, 4],
  [0, 4],
  [0, 5],
  [5],
  [7],
  [6, 7]
]
)}

function _stepEffect($0,$1,$2,$3,$4,$5,$6,$7,stepMap,step,Event)
{
  const controls = [
    $0,
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
  ];
  controls.forEach((c) => (c.value = false));
  stepMap[step].forEach((i) => (controls[i].value = true));
  controls.forEach((c) => c.dispatchEvent(new Event("input")));
}


function _spin(Inputs){return(
Inputs.toggle({ label: "spin", value: true })
)}

function _step(Inputs,stepMap){return(
Inputs.range([0, stepMap.length - 1], {
  label: "algorithm step",
  step: 1,
  value: stepMap.length
})
)}

function _focusSurface(Inputs,surface_planes){return(
Inputs.range([-1, surface_planes.length - 1], {
  label: "focus surface",
  value: -1,
  step: 1
})
)}

function _focusSurface2(Inputs,surface_planes){return(
Inputs.range([-1, surface_planes.length - 1], {
  label: "2nd surface",
  value: -1,
  step: 1
})
)}

function _focusJoint(Inputs,joints){return(
Inputs.range([-1, joints.length - 1], {
  label: "focus joint",
  value: -1,
  step: 1
})
)}

function _12(renderer,optimizedShapePlot,htl){return(
htl.html`<div style="display: flex">
  ${renderer.domElement}
  ${optimizedShapePlot}
</div>`
)}

function _13(visualizeJointGraph,joints){return(
visualizeJointGraph(joints)
)}

function _14(md){return(
md`## Algorithm`
)}

function _showSurfaces(Inputs){return(
Inputs.toggle({
  label: "show surfaces?",
  value: true
})
)}

function _bounding_planes(Plane,Vector3,bounds){return(
{
  prompt:
    "assign bounding_planes all the Planes of bounds\n\ne.g.\nbounding_planes = [\n  plane\n    .clone()\n    .setFromCoplanarPoints(\n      new Vector3(bounds[0][0], bounds[1][0], bounds[2][0]),\n      new Vector3(bounds[0][0], bounds[1][1], bounds[2][0]),\n      new Vector3(bounds[0][0], bounds[1][0], bounds[2][1])\n    ), ...\n]",
  time: 1714226611387,
  comment:
    "Assign bounding_planes all the Planes of bounds, defining each plane using coplanar points based on the bounds array"
} && [
  new Plane().setFromCoplanarPoints(
    new Vector3(bounds[0][0], bounds[1][0], bounds[2][0]),
    new Vector3(bounds[0][0], bounds[1][1], bounds[2][0]),
    new Vector3(bounds[0][0], bounds[1][0], bounds[2][1])
  ),
  new Plane().setFromCoplanarPoints(
    new Vector3(bounds[0][1], bounds[1][0], bounds[2][0]),
    new Vector3(bounds[0][1], bounds[1][1], bounds[2][0]),
    new Vector3(bounds[0][1], bounds[1][0], bounds[2][1])
  ),
  new Plane().setFromCoplanarPoints(
    new Vector3(bounds[0][0], bounds[1][0], bounds[2][0]),
    new Vector3(bounds[0][1], bounds[1][0], bounds[2][0]),
    new Vector3(bounds[0][0], bounds[1][0], bounds[2][1])
  ),
  new Plane().setFromCoplanarPoints(
    new Vector3(bounds[0][0], bounds[1][1], bounds[2][0]),
    new Vector3(bounds[0][1], bounds[1][1], bounds[2][0]),
    new Vector3(bounds[0][0], bounds[1][1], bounds[2][1])
  ),
  new Plane().setFromCoplanarPoints(
    new Vector3(bounds[0][0], bounds[1][0], bounds[2][0]),
    new Vector3(bounds[0][1], bounds[1][0], bounds[2][0]),
    new Vector3(bounds[0][0], bounds[1][1], bounds[2][0])
  ),
  new Plane().setFromCoplanarPoints(
    new Vector3(bounds[0][0], bounds[1][0], bounds[2][1]),
    new Vector3(bounds[0][1], bounds[1][0], bounds[2][1]),
    new Vector3(bounds[0][0], bounds[1][1], bounds[2][1])
  )
]
)}

function _showBoundingPlanes(Inputs){return(
Inputs.toggle({
  label: "show bounding planes?",
  value: true
})
)}

function _surface_planes(dedupe,eq,surfaces,surfaceToPlane){return(
dedupe(eq, surfaces.map(surfaceToPlane))
)}

function _seed_lines(dedupe,eq,surface_planes,bounding_planes,intersectPlanes){return(
dedupe(
  eq,
  surface_planes
    .flatMap((surface_plane) =>
      [...bounding_planes, ...surface_planes].flatMap((bounding_plane) =>
        intersectPlanes(surface_plane, bounding_plane)
      )
    )
    .filter((v) => v)
)
)}

function _showSeedLines(Inputs){return(
Inputs.toggle({ label: "show seed lines?", value: true })
)}

function _seed_vertices(findIntersectingVertices,seed_lines){return(
findIntersectingVertices(seed_lines)
)}

function _showSeedVerteces(Inputs){return(
Inputs.toggle({
  label: "show seed verteces?",
  value: true
})
)}

function _vertexConstrainedSimplify(intersectLines,dedupe,eq,Vector3,Line3,optimizeLineConnections){return(
{
  prompt:
    "Given a list of Line3, that start and end on vertices, but that might overlap other lines. Simplify into minimal segments. The final set of lines should only connect to their immediate vertex neighbours and never cross a vertex. call it vertexConstrainedSimplify ",
  time: 1714422257633,
  comment:
    "Define a function to simplify a list of Line3 into minimal segments without introducing new vertices and ensuring lines only connect immediate vertex neighbors"
} &&
  function vertexConstrainedSimplify(lines) {
    const verticesCandidates = [];
    const simplifiedLines = [];

    // Collect all vertices
    lines.forEach((line) => {
      verticesCandidates.push(line.start);
      verticesCandidates.push(line.end);
      lines.forEach((other) => {
        const intersection = intersectLines(line, other);
        if (intersection) verticesCandidates.push(intersection);
      });
    });

    const vertices = dedupe(eq, verticesCandidates);

    // For each line, split it if it crosses any other vertex
    lines.forEach((line) => {
      const points = [line.start, line.end];
      vertices.forEach((vertex) => {
        const nearest = line.closestPointToPoint(vertex, true, new Vector3());
        if (nearest.distanceToSquared(vertex) < 1e-4) {
          points.push(vertex);
        }
      });

      // Sort points along the line's direction
      points.sort(
        (a, b) => a.distanceTo(line.start) - b.distanceTo(line.start)
      );

      // Create new lines between consecutive points
      for (let i = 0; i < points.length - 1; i++) {
        if (points[i].distanceToSquared(points[i + 1]) > 1e-3) {
          const newLine = new Line3(points[i], points[i + 1]);
          simplifiedLines.push(newLine);
        }
      }
    });

    // Remove duplicate lines
    return optimizeLineConnections(dedupe(eq, simplifiedLines));
  }
)}

function _optimizeLineConnections(Vector3,normalizeLines,Line3){return(
function optimizeLineConnections(lines, normalized = false) {
  function areLinesAligned(line1, line2) {
    // Placeholder function to check if two lines are aligned
    const direction1 = line1.delta(new Vector3()).normalize();
    const direction2 = line2.delta(new Vector3()).normalize();
    return Math.abs(direction1.dot(direction2)) > 0.99999;
  }

  function updateVertexMapForNewLine(
    vertexMap,
    newStart,
    newEnd,
    newLine,
    oldLines
  ) {
    // Update vertexMap for the new line, removing old lines
    [newStart, newEnd].forEach((vertex) => {
      if (!vertexMap.has(vertex)) vertexMap.set(vertex, []);
      vertexMap.get(vertex).push(newLine);
      oldLines.forEach((oldLine) => {
        const index = vertexMap.get(vertex).indexOf(oldLine);
        if (index !== -1) vertexMap.get(vertex).splice(index, 1);
      });
    });
  }

  // Normalize lines if not already done
  if (!normalized) {
    lines = normalizeLines(lines);
  }

  let vertexMap = new Map();

  // Initial mapping of vertices to lines
  lines.forEach((line) => {
    [line.start, line.end].forEach((vertex) => {
      if (!vertexMap.has(vertex)) vertexMap.set(vertex, []);
      vertexMap.get(vertex).push(line);
    });
  });

  let toProcess = true;

  while (toProcess) {
    toProcess = false; // Assume no further processing is needed unless a change is made
    let newLines = [];

    vertexMap.forEach((connectedLines, vertex) => {
      if (connectedLines.length === 1) {
        // Single connected line, remove it
        toProcess = true;
        const [line] = connectedLines;
        lines = lines.filter((l) => l !== line);
        vertexMap.delete(vertex);
        const otherVertex = line.start === vertex ? line.end : line.start;
        const linesAtOtherVertex = vertexMap.get(otherVertex);
        if (linesAtOtherVertex) {
          const index = linesAtOtherVertex.indexOf(line);
          if (index !== -1) linesAtOtherVertex.splice(index, 1);
        }
      } else if (connectedLines.length === 2) {
        // Check for alignment
        const [line1, line2] = connectedLines;
        if (areLinesAligned(line1, line2)) {
          toProcess = true;
          const newStart = line1.start === vertex ? line1.end : line1.start;
          const newEnd = line2.start === vertex ? line2.end : line2.start;
          const newLine = new Line3(newStart, newEnd);
          newLines.push(newLine);
          lines = lines.filter((l) => l !== line1 && l !== line2);
          vertexMap.delete(vertex);
          updateVertexMapForNewLine(vertexMap, newStart, newEnd, newLine, [
            line1,
            line2
          ]);
        }
      }
    });

    // Add new lines from this iteration to the list and to the vertex map
    newLines.forEach((line) => {
      lines.push(line);
      [line.start, line.end].forEach((vertex) => {
        if (!vertexMap.has(vertex)) vertexMap.set(vertex, []);
        vertexMap.get(vertex).push(line);
      });
    });
  }

  return lines
    .filter((line) => line.start !== line.end)
    .reduce((acc, line, i) => {
      const prev = lines[(i + lines.length - 1) % lines.length];
      if (prev.end == line.start) {
        acc.push(line);
      } else {
        acc.push(new Line3(line.end, line.start));
      }
      return acc;
    }, []); // filter out degenerate lines (might be better to do this inside the main loop)
}
)}

function _convertMapToNearestVertexConnections(Vector3){return(
{
  prompt:
    "write a function that takes a Map of Vector3 => Line3[], and converts to a map of Vector3 => {line, vertex}[]\n\nThe vectors are points, and the Line3 are the line they are on. We are building a map of vertex => vertex. Two vertexes are connected if their line3 instance is the same object. However, we have many coplanar points in a single line, so each vertex should only be connected to its nearest is each direction for each line",
  time: 1714243308861,
  comment:
    "Define a function to convert a map of Vector3 to Line3[] into a map of Vector3 to {line, vertex}[], linking each vertex only to its nearest neighbors in each direction along each line"
} &&
  function convertMapToNearestVertexConnections(vertexMap) {
    const vertexConnections = new Map();

    vertexMap.forEach((lines, vertex) => {
      const connectedVertices = [];

      lines.forEach((line) => {
        // Initialize closest vertices in both directions
        let closestVertexPositive = null;
        let minDistancePositive = Infinity;
        let closestVertexNegative = null;
        let minDistanceNegative = Infinity;

        // Check other vertices on the same line
        vertexMap.forEach((otherLines, otherVertex) => {
          if (otherVertex.equals(vertex)) return; // Skip self

          otherLines.forEach((otherLine) => {
            if (otherLine === line) {
              // Only consider the same line instances
              const direction = new Vector3().subVectors(otherVertex, vertex);
              const distance = direction.length();
              const dot = direction.dot(line.delta(new Vector3()));

              if (dot > 0 && distance < minDistancePositive) {
                closestVertexPositive = otherVertex;
                minDistancePositive = distance;
              } else if (dot < 0 && distance < minDistanceNegative) {
                closestVertexNegative = otherVertex;
                minDistanceNegative = distance;
              }
            }
          });
        });

        if (closestVertexPositive) {
          connectedVertices.push({ line: line, vertex: closestVertexPositive });
        }
        if (closestVertexNegative) {
          connectedVertices.push({ line: line, vertex: closestVertexNegative });
        }
      });

      vertexConnections.set(vertex, connectedVertices);
    });

    return vertexConnections;
  }
)}

function _vertexIndex(convertMapToNearestVertexConnections,seed_vertices){return(
convertMapToNearestVertexConnections(seed_vertices)
)}

function _buildLinesOnPlanes(Line3){return(
{
  prompt:
    "Given a map of vertex connections\n\nVector3 {x: -5, y: -5, z: 1} => Array(2) [\n  0: Object {line: Line3, vertex: Vector3}\n  1: Object {line: Line3, vertex: Vector3}\n]\n\nand a list of Plane3 \n\nbuild an array of Line3 where the start and end of each line is a vertex and each line is also on one of the planes",
  time: 1714243718820,
  comment:
    "Define a function to build an array of Line3 from vertex connections where each line is also on one of the provided planes"
} &&
  function buildLinesOnPlanes(vertexConnections, planes) {
    const lines = [];

    vertexConnections.forEach((connections, vertex) => {
      connections.forEach(({ line, vertex: connectedVertex }) => {
        // Check if the line is coplanar with any of the provided planes
        for (let plane of planes) {
          if (
            plane.distanceToPoint(vertex) < 1e-4 &&
            plane.distanceToPoint(connectedVertex) < 1e-4
          ) {
            // If both vertices are coplanar with the plane, create a line between them
            const newLine = new Line3(vertex, connectedVertex);
            lines.push(newLine);
            break; // Only add the line once, for the first matching plane
          }
        }
      });
    });

    return lines;
  }
)}

function _skeleton_all(vertexConstrainedSimplify,buildLinesOnPlanes,vertexIndex,surface_planes){return(
vertexConstrainedSimplify(
  buildLinesOnPlanes(vertexIndex, surface_planes)
)
)}

function _skeleton(focusSurface,skeleton_all,lineOnPlane,surface_planes){return(
focusSurface == -1
  ? skeleton_all
  : skeleton_all.filter((line) =>
      lineOnPlane(line, surface_planes[focusSurface])
    )
)}

function _showSkeleton(Inputs){return(
Inputs.toggle({
  label: "show skeleton",
  value: true
})
)}

function _filterLinesOnSurfaces(surfaceDistanceToPoint){return(
{
  prompt:
    "Take an array of lines and an array surfaces, and keep only lines that are on the surface",
  time: 1714287057408,
  comment:
    "Define a function to filter out lines that are not on any of the provided surfaces"
} &&
  function filterLinesOnSurfaces(lines, surfaces) {
    return lines.filter((line) => {
      return (
        surfaces.some((surface) => {
          // Check if both start and end points of the line are on the surface
          const distanceToStart = surfaceDistanceToPoint(surface, [
            line.start.x,
            line.start.y,
            line.start.z
          ]);
          return distanceToStart < 1e-4;
        }) &&
        surfaces.some((surface) => {
          const distanceToEnd = surfaceDistanceToPoint(surface, [
            line.end.x,
            line.end.y,
            line.end.z
          ]);
          return distanceToEnd < 1e-4;
        })
      );
    });
  }
)}

function _prunedSkeleton(filterLinesOnSurfaces,skeleton_all,surfaces){return(
filterLinesOnSurfaces(skeleton_all, surfaces)
)}

function _groupLinesByPlanes(surfaceToPlane,surface_planes,eq,surfaceDistanceToPoint,dedupe){return(
{
  prompt:
    "Given an array of line3, group into a Map with planes as keys, and arrays of lines as values that are on those planes (a line might be in a few planes.",
  time: 1714298267328,
  comment:
    "Define a function to group lines into a Map with planes as keys, based on whether the lines are coplanar with the planes"
} &&
  function groupLinesByPlanes(lines, surfaces) {
    const map = new Map();

    surfaces.forEach((surface, i) => {
      const derivedPlane = surfaceToPlane(surface);
      const plane = surface_planes.find((element) => eq(element, derivedPlane));
      lines.forEach((line) => {
        // Check if both points of the line are coplanar with the plane
        if (
          Math.abs(surfaceDistanceToPoint(surface, line.start)) < 1e-4 &&
          Math.abs(surfaceDistanceToPoint(surface, line.end)) < 1e-4
        ) {
          if (!map.has(plane)) {
            map.set(plane, []);
          }
          map.get(plane).push(line);
        }
      });
    });
    map.forEach((lines, plane) => map.set(plane, dedupe(eq, lines)));
    return map;
  }
)}

function _groupedLinesAll(groupLinesByPlanes,prunedSkeleton,surfaces){return(
groupLinesByPlanes(prunedSkeleton, surfaces)
)}

function _showPrunedSkeleton(Inputs){return(
Inputs.toggle({
  label: "show pruned skeleton",
  value: true
})
)}

function _groupedLines(focusSurface,groupedLinesAll,lineOnPlane,surface_planes){return(
focusSurface == -1
  ? groupedLinesAll
  : new Map(
      [...groupedLinesAll.entries()].filter(([plane, lines]) =>
        lines.some((line) => lineOnPlane(line, surface_planes[focusSurface]))
      )
    )
)}

function _37(md){return(
md`TODO: projectLinesOntoPlane. concaveman is useful coz it fixes ordering, but it tends to take shortcuts on corners unless lines are over sampled`
)}

function _projectLinesOntoPlane(generateEvenlySpacedPoints,Vector3,chooseBasis,concaveman,dedupe,eq){return(
{
  prompt:
    "write a function to convert a map of Plane => Line3[] to a Map of the projected vectors onto the plane as 3D cordinates represented as an array of length 2",
  time: 1714299349500,
  comment:
    "Define a function to convert a map of Plane to Vector3[] into a map of the projected vectors onto the plane as 2D coordinates"
} &&
  function projectVectorsOntoPlane(planeLineMap) {
    const projectedMap = new Map();
    planeLineMap.forEach((lines, plane) => {
      const vectors = lines.flatMap((line) =>
        generateEvenlySpacedPoints(line, 20)
      );
      const normal = plane.normal.clone();
      const projectedVectors = vectors.map((vector) => {
        const pointOnPlane = plane.projectPoint(vector, new Vector3());
        const [basisX, basisY] = chooseBasis(plane);

        // Project the point onto the plane using the basis vectors
        const x = pointOnPlane.dot(basisX);
        const y = pointOnPlane.dot(basisY);

        return [x, y];
      });
      projectedMap.set(plane, concaveman(dedupe(eq, projectedVectors)));
    });

    return projectedMap;
  }
)}

function _showShapes(Inputs){return(
Inputs.toggle({
  label: "show shapes 2D",
  value: true
})
)}

function _shapes2D(projectLinesOntoPlane,groupedLinesAll){return(
projectLinesOntoPlane(groupedLinesAll)
)}

function _targetShape(shapes2D,surface_planes,focusSurface){return(
shapes2D.get(surface_planes[focusSurface])
)}

function _shapePlot(targetShape,plotShape2D){return(
targetShape && plotShape2D(targetShape)
)}

function _43(md){return(
md`#### Generating part adjacency map`
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

function _createEdges(chooseBasis,Vector3,Line3){return(
{
  prompt:
    "createEdges Given a Plane and an array of 2D points  [x, y][], create an array of Vector3. Use the same basis and coordinate systems use in createShape",
  time: 1714556118018,
  comment:
    "Define a function to convert an array of 2D points into an array of Vector3 on a Plane using the same basis and coordinate system as used in createShape"
} &&
  function createEdges(plane, points) {
    const [basisX, basisY] = chooseBasis(plane);
    const origin = plane.coplanarPoint(new Vector3());
    const vertices = points.map((point) => {
      const xComponent = basisX.clone().multiplyScalar(point[0]);
      const yComponent = basisY.clone().multiplyScalar(point[1]);
      return new Vector3().addVectors(origin, xComponent).add(yComponent);
    });
    return vertices.reduce((vs, v, i) => {
      vs.push(new Line3(vertices[i], vertices[(i + 1) % vertices.length]));
      return vs;
    }, []);
  }
)}

function _shapes3D(mapValues,shapes2D,createEdges,optimizeLineConnections){return(
mapValues(mapValues(shapes2D, createEdges), (plane, lines) =>
  optimizeLineConnections(lines)
)
)}

function _showShapes3D(Inputs){return(
Inputs.toggle({
  label: "show shapes 3D",
  value: true
})
)}

function _targetShape3d(createEdges,surface_planes,focusSurface,targetShape){return(
createEdges(surface_planes[focusSurface], targetShape)
)}

function _optimizedShape2D(mapValues,shapes3D,dedupe,eq,shape3DTo2D){return(
mapValues(shapes3D, (plane, lines) =>
  dedupe(eq, shape3DTo2D(plane, lines))
)
)}

function _optimizedFocusShape(optimizedShape2D,surface_planes,focusSurface){return(
optimizedShape2D.get(surface_planes[focusSurface])
)}

function _optimizedFocusShape2(optimizedShape2D,surface_planes,focusSurface2){return(
optimizedShape2D.get(surface_planes[focusSurface2])
)}

function _optimizedShapePlot(optimizedFocusShape,plotShape2D){return(
optimizedFocusShape && plotShape2D(optimizedFocusShape)
)}

function _findShapeConnections(intersectShapes,rad2deg,angleBetweenPlanes){return(
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
            angle: rad2deg(angleBetweenPlanes(plane1, plane2))
          });
        }
      }
    }

    return connections;
  }
)}

function _joints(findShapeConnections,shapes3D){return(
findShapeConnections(shapes3D)
)}

function _55(Inputs,joints,$0){return(
Inputs.bind(
  Inputs.range([-1, joints.length - 1], {
    label: "focus joint",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _targetJoint(joints,focusJoint){return(
joints[focusJoint]
)}

function _visualizeJointGraph(dot,shapes3D,toString,targetJoint){return(
{
  prompt: "visualize the joint graph using graph viz.",
  time: 1715259707115,
  comment:
    "Define a function to visualize a joint graph using Graphviz format, displaying vertices, edges, and edge lengths."
} &&
  function visualizeJointGraph(joints) {
    return dot`digraph G { 
      ${[...shapes3D.keys()]
        .map(
          (plane) =>
            `"${toString(plane)}" [color="${
              targetJoint &&
              (targetJoint.plane1 === plane || targetJoint.plane2 === plane)
                ? "red"
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

function _58(md){return(
md`### Joint Sculpting`
)}

function _neighbourhood(){return(
(plane, connections) =>
  connections.filter((c) => c.plane1 == plane || c.plane2 == plane)
)}

function _focusNeighbourhood(neighbourhood,surface_planes,focusSurface,joints){return(
neighbourhood(surface_planes[focusSurface], joints)
)}

function _generatePerimeterPlan(intersectLines,eq,Line3){return(
{
  prompt:
    "Given a list of neighbourhood connections\n\nObject {\n  plane1: Plane {isPlane: true, normal: Vector3, constant: 1}\n  plane2: Plane {isPlane: true, normal: Vector3, constant: 1}\n  lines1: Array(6) [Line3, Line3, Line3, Line3, Line3, Line3]\n  lines2: Array(4) [Line3, Line3, Line3, Line3]\n  sharedEdges: Array(1) [\n  0: Line3 {\n  start: Vector3 {x: 0, y: 1, z: 1}\n  end: Vector3 {x: -5, y: 1, z: 1}\n}\n]\n  angle: 90\n}\n\nand a the ordered bounds of the surface [x, y][]\n\ngenerate a plan for adjusting the perimeter of the object to insert special joints on the shared edges. \nTo do this you will need to walk the boundary. If there are no shared edges the plane would be a simple list of {plan: move, [x, y]}\nHowever, where the sharedEdges intersect the boundary, we need to split the line up and replace the shared part with\n\n{plan: joint, [x,y], edge: <ref to connection>}\n\n\n\n\n",
  time: 1715421531133,
  comment:
    "Define a function to generate a plan for adjusting the perimeter of an object to insert special joints on the shared edges. This involves walking the boundary and replacing parts of it with joints where shared edges intersect."
} &&
  function generatePerimeterPlan(joints, boundary) {
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
            plans.push({
              plan: "box",
              edge: jointEdge,
              joint: connection
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
    return {
      ...step,
      start: [startPointOnPlane.dot(basisX), startPointOnPlane.dot(basisY)],
      end: [endPointOnPlane.dot(basisX), endPointOnPlane.dot(basisY)]
    };
  });
}
)}

function _focusPlan(projectPlan,surface_planes,focusSurface,generatePerimeterPlan,focusNeighbourhood,createEdges,optimizedFocusShape){return(
projectPlan(
  surface_planes[focusSurface],
  generatePerimeterPlan(
    focusNeighbourhood,
    createEdges(surface_planes[focusSurface], optimizedFocusShape)
  )
)
)}

function _64(Inputs,surface_planes,$0){return(
Inputs.bind(
  Inputs.range([-1, surface_planes.length - 1], {
    label: "focus surface",
    value: -1,
    step: 1
  }),
  $0
)
)}

function _65(Plot,focusPlan){return(
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
    Plot.link(focusPlan, {
      x1: (d) => d.start[0],
      y1: (d) => d.start[1],
      x2: (d) => d.end[0],
      y2: (d) => d.end[1],
      stroke: (d) => d.plan,
      markerEnd: "arrow"
    })
  ]
})
)}

function _material_thickness(Inputs){return(
Inputs.range([0.01, 8], {
  label: "material thickness",
  value: 0.01
})
)}

function _scale(Inputs){return(
Inputs.range([0.01, 10], {
  label: "scale",
  value: 1
})
)}

function _planToSVG(material_thickness,d3,htl,angleToFingerExtension,angleToFingerRetraction,finger_clockwise_v1){return(
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
  return htl.svg`<div 
    style=" transform-origin: top left;
            transform: scale(${scale});
            width: ${total_width * scale}mm;
            height: ${Math.max(total_height * scale, 50)}mm;
    ">
    <svg  class="lzr"
          filename="part"
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
            const settings = {
              extension: angleToFingerExtension(step.joint.angle, {
                thickness
              }),
              retraction: angleToFingerRetraction(step.joint.angle, {
                thickness
              })
            };
            const delta = [
              step.start[0] - step.end[0],
              step.start[1] - step.end[1]
            ];
            const magnitude = Math.sqrt(
              delta[0] * delta[0] + delta[1] * delta[1]
            );
            const outward = [delta[1] / magnitude, -delta[0] / magnitude];
            const offsetStart = [
              step.end[0] + outward[0] * settings.extension,
              step.end[1] + outward[1] * settings.extension
            ];
            const offsetEnd = [
              step.start[0] + outward[0] * settings.extension,
              step.start[1] + outward[1] * settings.extension
            ];
            return `
              M ${step.end[0]} ${step.end[1]}
              L ${offsetStart[0]} ${offsetStart[1]}
              ${finger_clockwise_v1(offsetStart, offsetEnd, {
                finger_depth: settings.extension + settings.retraction,
                finger_width: 0.2
              })}
              L ${step.start[0]} ${step.start[1]}
            `;
          }
        })}
      "/>
  </div>`;
}
)}

function _70(planToSVG,focusPlan,scale){return(
planToSVG(focusPlan, { scale })
)}

function _71(md){return(
md`## Math`
)}

function _deg2rad(){return(
(degrees) => degrees * (Math.PI / 180)
)}

function _rad2deg(){return(
(rads) => rads * (180 / Math.PI)
)}

function _74(md){return(
md`TODO: Angle between planes is not signed in the way I would want`
)}

function _angleBetweenPlanes(){return(
(plane1, plane2) => {
  // Calculate the dot product of the normals
  let dot = plane1.normal.dot(plane2.normal);

  // Compute the magnitudes of each normal vector
  let magnitude1 = plane1.normal.length();
  let magnitude2 = plane2.normal.length();

  // Calculate the cosine of the angle between the planes
  let cosTheta = dot / (magnitude1 * magnitude2);
  let angleRadians = Math.acos(Math.min(Math.max(cosTheta, -1), 1));
  return angleRadians;
}
)}

function _angleBetweenPlanesExample(rad2deg,angleBetweenPlanes,Plane,Vector3){return(
rad2deg(
  angleBetweenPlanes(
    new Plane(new Vector3(0, 1, 0), 0),
    new Plane(new Vector3(1, 0, 0), 0)
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
      return a.equals(b, epsilon);
    } else if (a instanceof Line3 && b instanceof Line3) {
      const aDir = a.delta(new Vector3().normalize());
      const bDir = b.delta(new Vector3()).normalize();
      return (
        (a.start.distanceToSquared(b.start) < epsilon * epsilon &&
          a.end.distanceToSquared(b.end) < epsilon * epsilon) ||
        (a.start.distanceToSquared(b.end) < epsilon * epsilon &&
          a.end.distanceToSquared(b.start) < epsilon * epsilon)
      );
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

function _91(shape3DTo2D,targetJoint)
{
  debugger;
  return shape3DTo2D(targetJoint.plane1, targetJoint.lines1);
}


function _92(targetJoint){return(
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


function _98(targetJoint){return(
targetJoint.plane1
)}

function _99(targetJoint){return(
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


function _102(md){return(
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

function _geometrySuite(createSuite){return(
{
  prompt: "Write a test suite for testing our geometry functions",
  time: 1714197395380,
  comment:
    "Write a test suite for testing the geometry functions using the zora testing library"
} && createSuite({ name: "Geometry Tests" })
)}

function _106(geometrySuite,Line3,Vector3,expect,intersectLines){return(
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

function _109(md){return(
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
    if (Math.abs(normal.dot(new THREE.Vector3(0, 0, 1))) > 0.9) {
      // XY plane
      return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)];
    } else if (Math.abs(normal.dot(new THREE.Vector3(0, 1, 0))) > 0.9) {
      // XZ plane
      return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1)];
    } else if (Math.abs(normal.dot(new THREE.Vector3(1, 0, 0))) > 0.9) {
      // YZ plane
      return [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    }
    // Default to XY plane if none of the conditions match
    return [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)];
  }
)}

function _114(md){return(
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

function _createShape(THREE,chooseBasis,Vector3){return(
{
  prompt:
    "createShape. Given a Plane and an array of 2D points  [x, y][], a color and an opacity, build a positioned Mesh using ShapeGeometry ",
  time: 1714307169388,
  comment:
    "Define a function to create a Mesh from a ShapeGeometry defined by a Plane and an array of 2D points, with specified color and opacity"
} &&
  function createShape(plane, points, color = 0x00ff00, opacity = 0.5) {
    const shape = new THREE.Shape();
    // Start at the first point
    shape.moveTo(points[0][0], points[0][1]);

    // Line to each subsequent point
    points.slice(1).forEach((point) => {
      shape.lineTo(point[0], point[1]);
    });
    shape.lineTo(points[0][0], points[0][1]); // close the shape

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: opacity
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

function _123(md){return(
md`## Plots`
)}

function _plotShape2D(Plot){return(
(coords) =>
  Plot.plot({
    marks: [Plot.dot(coords, { x: (e) => e[0], y: (e) => e[1] })]
  })
)}

function _125(md){return(
md`## Scene`
)}

function _scene(THREE,showSeedLines,seed_lines,createInfiniteLine,showSeedVerteces,seed_vertices,createPoint,showSkeleton,skeleton,createLineSegment,showPrunedSkeleton,groupedLines,showSurfaces,surfaces,createRectangularMesh,showBoundingPlanes,addBoxMeshesFrombounds,bounds,showShapes,targetShape,shapes2D,createShape,focusSurface,surface_planes,focusSurface2,showShapes3D,shapes3D,targetJoint)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  if (showSeedLines) {
    seed_lines.forEach((line) => {
      scene.add(createInfiniteLine(line, 0xffff00));
    });
  }
  if (showSeedVerteces) {
    seed_vertices.keys().forEach((v) => {
      scene.add(
        createPoint(v, {
          color: 0xff0000
        })
      );
    });
  }
  if (showSkeleton) {
    skeleton.forEach((line) => {
      scene.add(createLineSegment(line, 0x00ffff));
    });
  }
  if (showPrunedSkeleton) {
    groupedLines.forEach((lines) => {
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
    surfaces.forEach((surface) => {
      scene.add(createRectangularMesh(...surface, 0xffffff, 0.9));
    });
  }
  if (showBoundingPlanes) {
    addBoxMeshesFrombounds(scene, bounds);
  }
  if (showShapes) {
    if (targetShape === undefined) {
      shapes2D.forEach((points, plane) => {
        scene.add(createShape(plane, points, 0xffffff, 0.4));
      });
    }
    if (focusSurface !== -1) {
      scene.add(
        createShape(
          surface_planes[focusSurface],
          shapes2D.get(surface_planes[focusSurface]),
          0xffffff,
          0.4
        )
      );
    }
    if (focusSurface2 !== -1) {
      scene.add(
        createShape(
          surface_planes[focusSurface2],
          shapes2D.get(surface_planes[focusSurface2]),
          0xffffff,
          0.4
        )
      );
    }
  }
  if (showShapes3D) {
    shapes3D.forEach((lines, plane) => {
      lines.forEach((line) => {
        scene.add(createLineSegment(line, 0x00ffff));
        scene.add(
          createPoint(line.start, {
            color: 0x00ffff
          })
        );
        scene.add(
          createPoint(line.end, {
            color: 0x00ffff
          })
        );
      });
    });
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
  return scene;
}


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

function _130(groupedLines){return(
groupedLines
)}

function _camera(width,height,THREE,Vector3)
{
  const fov = 45;
  const aspect = width / 2 / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(2, 10, -20);
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


function _134(md){return(
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


function _145(md){return(
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

function _151(md){return(
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


function _156(jointScene,sideA,sideB,invalidation)
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


function _158(jointWorld,$0,htl){return(
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

function _168(auto_fit_fingers,$0,angleToFingerRetraction,jointAngle,$1,angleToFingerExtension,Event)
{
  if (auto_fit_fingers) {
    $0.value = angleToFingerRetraction(jointAngle);
    $1.value = angleToFingerExtension(jointAngle);

    $0.dispatchEvent(new Event("input"));
    $1.dispatchEvent(new Event("input"));
  }
}


function _169(sideB,Vector3,deg2rad,jointAngle)
{
  sideB.quaternion.setFromAxisAngle(new Vector3(1, 0, 0), deg2rad(jointAngle));
}


function* _170(jointWorld,jointScene)
{
  while (true) {
    jointWorld.renderer.render(jointScene, jointWorld.camera);
    yield null;
  }
}


function _171(md){return(
md`# [Robocoop](https://observablehq.com/@tomlarkworthy/robocoop) Assistant`
)}

function _172($0){return(
$0
)}

function _173(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _174($0){return(
$0
)}

function _175(md){return(
md`## Current Chat context`
)}

function _176($0){return(
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

function _178(md){return(
md`tick the cells to include in the next prompt`
)}

function _179($0){return(
$0
)}

function _180($0){return(
$0
)}

function _181(md){return(
md`### AI Settings`
)}

function _182($0){return(
$0
)}

function _183($0){return(
$0
)}

function _184($0){return(
$0
)}

function _185(background_tasks){return(
background_tasks
)}

function _187(md){return(
md`---`
)}

function _190(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("bounds")).define("bounds", _bounds);
  main.variable(observer("surfaces")).define("surfaces", _surfaces);
  main.variable(observer("stepMap")).define("stepMap", _stepMap);
  main.variable(observer("stepEffect")).define("stepEffect", ["viewof showSurfaces","viewof showBoundingPlanes","viewof showSeedLines","viewof showSeedVerteces","viewof showSkeleton","viewof showPrunedSkeleton","viewof showShapes","viewof showShapes3D","stepMap","step","Event"], _stepEffect);
  main.variable(observer("viewof spin")).define("viewof spin", ["Inputs"], _spin);
  main.variable(observer("spin")).define("spin", ["Generators", "viewof spin"], (G, _) => G.input(_));
  main.variable(observer("viewof step")).define("viewof step", ["Inputs","stepMap"], _step);
  main.variable(observer("step")).define("step", ["Generators", "viewof step"], (G, _) => G.input(_));
  main.variable(observer("viewof focusSurface")).define("viewof focusSurface", ["Inputs","surface_planes"], _focusSurface);
  main.variable(observer("focusSurface")).define("focusSurface", ["Generators", "viewof focusSurface"], (G, _) => G.input(_));
  main.variable(observer("viewof focusSurface2")).define("viewof focusSurface2", ["Inputs","surface_planes"], _focusSurface2);
  main.variable(observer("focusSurface2")).define("focusSurface2", ["Generators", "viewof focusSurface2"], (G, _) => G.input(_));
  main.variable(observer("viewof focusJoint")).define("viewof focusJoint", ["Inputs","joints"], _focusJoint);
  main.variable(observer("focusJoint")).define("focusJoint", ["Generators", "viewof focusJoint"], (G, _) => G.input(_));
  main.variable(observer()).define(["renderer","optimizedShapePlot","htl"], _12);
  main.variable(observer()).define(["visualizeJointGraph","joints"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof showSurfaces")).define("viewof showSurfaces", ["Inputs"], _showSurfaces);
  main.variable(observer("showSurfaces")).define("showSurfaces", ["Generators", "viewof showSurfaces"], (G, _) => G.input(_));
  main.variable(observer("bounding_planes")).define("bounding_planes", ["Plane","Vector3","bounds"], _bounding_planes);
  main.variable(observer("viewof showBoundingPlanes")).define("viewof showBoundingPlanes", ["Inputs"], _showBoundingPlanes);
  main.variable(observer("showBoundingPlanes")).define("showBoundingPlanes", ["Generators", "viewof showBoundingPlanes"], (G, _) => G.input(_));
  main.variable(observer("surface_planes")).define("surface_planes", ["dedupe","eq","surfaces","surfaceToPlane"], _surface_planes);
  main.variable(observer("seed_lines")).define("seed_lines", ["dedupe","eq","surface_planes","bounding_planes","intersectPlanes"], _seed_lines);
  main.variable(observer("viewof showSeedLines")).define("viewof showSeedLines", ["Inputs"], _showSeedLines);
  main.variable(observer("showSeedLines")).define("showSeedLines", ["Generators", "viewof showSeedLines"], (G, _) => G.input(_));
  main.variable(observer("seed_vertices")).define("seed_vertices", ["findIntersectingVertices","seed_lines"], _seed_vertices);
  main.variable(observer("viewof showSeedVerteces")).define("viewof showSeedVerteces", ["Inputs"], _showSeedVerteces);
  main.variable(observer("showSeedVerteces")).define("showSeedVerteces", ["Generators", "viewof showSeedVerteces"], (G, _) => G.input(_));
  main.variable(observer("vertexConstrainedSimplify")).define("vertexConstrainedSimplify", ["intersectLines","dedupe","eq","Vector3","Line3","optimizeLineConnections"], _vertexConstrainedSimplify);
  main.variable(observer("optimizeLineConnections")).define("optimizeLineConnections", ["Vector3","normalizeLines","Line3"], _optimizeLineConnections);
  main.variable(observer("convertMapToNearestVertexConnections")).define("convertMapToNearestVertexConnections", ["Vector3"], _convertMapToNearestVertexConnections);
  main.variable(observer("vertexIndex")).define("vertexIndex", ["convertMapToNearestVertexConnections","seed_vertices"], _vertexIndex);
  main.variable(observer("buildLinesOnPlanes")).define("buildLinesOnPlanes", ["Line3"], _buildLinesOnPlanes);
  main.variable(observer("skeleton_all")).define("skeleton_all", ["vertexConstrainedSimplify","buildLinesOnPlanes","vertexIndex","surface_planes"], _skeleton_all);
  main.variable(observer("skeleton")).define("skeleton", ["focusSurface","skeleton_all","lineOnPlane","surface_planes"], _skeleton);
  main.variable(observer("viewof showSkeleton")).define("viewof showSkeleton", ["Inputs"], _showSkeleton);
  main.variable(observer("showSkeleton")).define("showSkeleton", ["Generators", "viewof showSkeleton"], (G, _) => G.input(_));
  main.variable(observer("filterLinesOnSurfaces")).define("filterLinesOnSurfaces", ["surfaceDistanceToPoint"], _filterLinesOnSurfaces);
  main.variable(observer("prunedSkeleton")).define("prunedSkeleton", ["filterLinesOnSurfaces","skeleton_all","surfaces"], _prunedSkeleton);
  main.variable(observer("groupLinesByPlanes")).define("groupLinesByPlanes", ["surfaceToPlane","surface_planes","eq","surfaceDistanceToPoint","dedupe"], _groupLinesByPlanes);
  main.variable(observer("groupedLinesAll")).define("groupedLinesAll", ["groupLinesByPlanes","prunedSkeleton","surfaces"], _groupedLinesAll);
  main.variable(observer("viewof showPrunedSkeleton")).define("viewof showPrunedSkeleton", ["Inputs"], _showPrunedSkeleton);
  main.variable(observer("showPrunedSkeleton")).define("showPrunedSkeleton", ["Generators", "viewof showPrunedSkeleton"], (G, _) => G.input(_));
  main.variable(observer("groupedLines")).define("groupedLines", ["focusSurface","groupedLinesAll","lineOnPlane","surface_planes"], _groupedLines);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("projectLinesOntoPlane")).define("projectLinesOntoPlane", ["generateEvenlySpacedPoints","Vector3","chooseBasis","concaveman","dedupe","eq"], _projectLinesOntoPlane);
  main.variable(observer("viewof showShapes")).define("viewof showShapes", ["Inputs"], _showShapes);
  main.variable(observer("showShapes")).define("showShapes", ["Generators", "viewof showShapes"], (G, _) => G.input(_));
  main.variable(observer("shapes2D")).define("shapes2D", ["projectLinesOntoPlane","groupedLinesAll"], _shapes2D);
  main.variable(observer("targetShape")).define("targetShape", ["shapes2D","surface_planes","focusSurface"], _targetShape);
  main.variable(observer("shapePlot")).define("shapePlot", ["targetShape","plotShape2D"], _shapePlot);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusSurface"], _44);
  main.variable(observer("createEdges")).define("createEdges", ["chooseBasis","Vector3","Line3"], _createEdges);
  main.variable(observer("shapes3D")).define("shapes3D", ["mapValues","shapes2D","createEdges","optimizeLineConnections"], _shapes3D);
  main.variable(observer("viewof showShapes3D")).define("viewof showShapes3D", ["Inputs"], _showShapes3D);
  main.variable(observer("showShapes3D")).define("showShapes3D", ["Generators", "viewof showShapes3D"], (G, _) => G.input(_));
  main.variable(observer("targetShape3d")).define("targetShape3d", ["createEdges","surface_planes","focusSurface","targetShape"], _targetShape3d);
  main.variable(observer("optimizedShape2D")).define("optimizedShape2D", ["mapValues","shapes3D","dedupe","eq","shape3DTo2D"], _optimizedShape2D);
  main.variable(observer("optimizedFocusShape")).define("optimizedFocusShape", ["optimizedShape2D","surface_planes","focusSurface"], _optimizedFocusShape);
  main.variable(observer("optimizedFocusShape2")).define("optimizedFocusShape2", ["optimizedShape2D","surface_planes","focusSurface2"], _optimizedFocusShape2);
  main.variable(observer("optimizedShapePlot")).define("optimizedShapePlot", ["optimizedFocusShape","plotShape2D"], _optimizedShapePlot);
  main.variable(observer("findShapeConnections")).define("findShapeConnections", ["intersectShapes","rad2deg","angleBetweenPlanes"], _findShapeConnections);
  main.variable(observer("joints")).define("joints", ["findShapeConnections","shapes3D"], _joints);
  main.variable(observer()).define(["Inputs","joints","viewof focusJoint"], _55);
  main.variable(observer("targetJoint")).define("targetJoint", ["joints","focusJoint"], _targetJoint);
  main.variable(observer("visualizeJointGraph")).define("visualizeJointGraph", ["dot","shapes3D","toString","targetJoint"], _visualizeJointGraph);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("neighbourhood")).define("neighbourhood", _neighbourhood);
  main.variable(observer("focusNeighbourhood")).define("focusNeighbourhood", ["neighbourhood","surface_planes","focusSurface","joints"], _focusNeighbourhood);
  main.variable(observer("generatePerimeterPlan")).define("generatePerimeterPlan", ["intersectLines","eq","Line3"], _generatePerimeterPlan);
  main.variable(observer("projectPlan")).define("projectPlan", ["chooseBasis","Vector3"], _projectPlan);
  main.variable(observer("focusPlan")).define("focusPlan", ["projectPlan","surface_planes","focusSurface","generatePerimeterPlan","focusNeighbourhood","createEdges","optimizedFocusShape"], _focusPlan);
  main.variable(observer()).define(["Inputs","surface_planes","viewof focusSurface"], _64);
  main.variable(observer()).define(["Plot","focusPlan"], _65);
  const child1 = runtime.module(define1);
  main.import("finger_clockwise_v1", child1);
  main.variable(observer("viewof material_thickness")).define("viewof material_thickness", ["Inputs"], _material_thickness);
  main.variable(observer("material_thickness")).define("material_thickness", ["Generators", "viewof material_thickness"], (G, _) => G.input(_));
  main.variable(observer("viewof scale")).define("viewof scale", ["Inputs"], _scale);
  main.variable(observer("scale")).define("scale", ["Generators", "viewof scale"], (G, _) => G.input(_));
  main.variable(observer("planToSVG")).define("planToSVG", ["material_thickness","d3","htl","angleToFingerExtension","angleToFingerRetraction","finger_clockwise_v1"], _planToSVG);
  main.variable(observer()).define(["planToSVG","focusPlan","scale"], _70);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.variable(observer("rad2deg")).define("rad2deg", _rad2deg);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("angleBetweenPlanes")).define("angleBetweenPlanes", _angleBetweenPlanes);
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
  main.variable(observer("shape3DTo2D")).define("shape3DTo2D", ["chooseBasis","Vector3"], _shape3DTo2D);
  main.variable(observer()).define(["shape3DTo2D","targetJoint"], _91);
  main.variable(observer()).define(["targetJoint"], _92);
  main.variable(observer("shape2DToPath")).define("shape2DToPath", ["paper"], _shape2DToPath);
  main.variable(observer("findIntersectionTransitions")).define("findIntersectionTransitions", ["intersectPlanes","extendLine","intersectLines","dedupe","eq","Vector3"], _findIntersectionTransitions);
  main.variable(observer("findIntersectionTransitionsExample")).define("findIntersectionTransitionsExample", ["findIntersectionTransitions","targetJoint"], _findIntersectionTransitionsExample);
  main.variable(observer("isInsideShape3D")).define("isInsideShape3D", ["chooseBasis","shape3DTo2D","shape2DToPath","paper","Vector3"], _isInsideShape3D);
  main.variable(observer("isInsideShape3DExample")).define("isInsideShape3DExample", ["isInsideShape3D","Vector3","targetJoint"], _isInsideShape3DExample);
  main.variable(observer()).define(["targetJoint"], _98);
  main.variable(observer()).define(["targetJoint"], _99);
  main.variable(observer("intersectShapes")).define("intersectShapes", ["findIntersectionTransitions","Vector3","isInsideShape3D","Line3"], _intersectShapes);
  main.variable(observer("intersectShapesExample")).define("intersectShapesExample", ["intersectShapes","targetJoint"], _intersectShapesExample);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer("parseVector3")).define("parseVector3", ["Vector3"], _parseVector3);
  main.variable(observer("toString")).define("toString", _toString);
  main.variable(observer("viewof geometrySuite")).define("viewof geometrySuite", ["createSuite"], _geometrySuite);
  main.variable(observer("geometrySuite")).define("geometrySuite", ["Generators", "viewof geometrySuite"], (G, _) => G.input(_));
  main.variable(observer()).define(["geometrySuite","Line3","Vector3","expect","intersectLines"], _106);
  main.variable(observer("testIntersectLinesRandom")).define("testIntersectLinesRandom", ["geometrySuite","Vector3","Line3","intersectLines","expect"], _testIntersectLinesRandom);
  main.variable(observer("testIntersectPlanesRandom")).define("testIntersectPlanesRandom", ["geometrySuite","Plane","Vector3","XZ","intersectPlanes","expect"], _testIntersectPlanesRandom);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer("XY")).define("XY", ["Plane","Vector3"], _XY);
  main.variable(observer("XZ")).define("XZ", ["Plane","Vector3"], _XZ);
  main.variable(observer("YZ")).define("YZ", ["Plane","Vector3"], _YZ);
  main.variable(observer("chooseBasis")).define("chooseBasis", ["THREE"], _chooseBasis);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer("createPlaneMesh")).define("createPlaneMesh", ["THREE","Vector3"], _createPlaneMesh);
  main.variable(observer("createRectangleMesh")).define("createRectangleMesh", ["Vector3","THREE"], _createRectangleMesh);
  main.variable(observer("createInfiniteLine")).define("createInfiniteLine", ["THREE","Vector3"], _createInfiniteLine);
  main.variable(observer("createLineSegment")).define("createLineSegment", ["THREE"], _createLineSegment);
  main.variable(observer("createPoint")).define("createPoint", ["THREE"], _createPoint);
  main.variable(observer("createRectangularMesh")).define("createRectangularMesh", ["THREE"], _createRectangularMesh);
  main.variable(observer("createShape")).define("createShape", ["THREE","chooseBasis","Vector3"], _createShape);
  main.variable(observer("createSimpleLight")).define("createSimpleLight", ["Vector3","THREE"], _createSimpleLight);
  main.variable(observer()).define(["md"], _123);
  main.variable(observer("plotShape2D")).define("plotShape2D", ["Plot"], _plotShape2D);
  main.variable(observer()).define(["md"], _125);
  main.variable(observer("scene")).define("scene", ["THREE","showSeedLines","seed_lines","createInfiniteLine","showSeedVerteces","seed_vertices","createPoint","showSkeleton","skeleton","createLineSegment","showPrunedSkeleton","groupedLines","showSurfaces","surfaces","createRectangularMesh","showBoundingPlanes","addBoxMeshesFrombounds","bounds","showShapes","targetShape","shapes2D","createShape","focusSurface","surface_planes","focusSurface2","showShapes3D","shapes3D","targetJoint"], _scene);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("rotateCameraAroundOrigin")).define("rotateCameraAroundOrigin", ["THREE"], _rotateCameraAroundOrigin);
  main.variable(observer("addBoxMeshesFrombounds")).define("addBoxMeshesFrombounds", ["Vector3","createRectangularMesh"], _addBoxMeshesFrombounds);
  main.variable(observer()).define(["groupedLines"], _130);
  main.variable(observer("camera")).define("camera", ["width","height","THREE","Vector3"], _camera);
  main.variable(observer("renderer")).define("renderer", ["THREE","width","height","camera","scene","invalidation"], _renderer);
  main.variable(observer("render_loop")).define("render_loop", ["spin","rotateCameraAroundOrigin","camera","Vector3","renderer","scene"], _render_loop);
  main.variable(observer()).define(["md"], _134);
  main.variable(observer("Vector3")).define("Vector3", ["THREE"], _Vector3);
  main.variable(observer("vector3")).define("vector3", ["Vector3"], _vector3);
  main.variable(observer("Line3")).define("Line3", ["THREE"], _Line3);
  main.variable(observer("Triangle")).define("Triangle", ["THREE"], _Triangle);
  main.variable(observer("line3")).define("line3", ["Line3"], _line3);
  main.variable(observer("Plane")).define("Plane", ["THREE"], _Plane);
  main.variable(observer("plane")).define("plane", ["Plane"], _plane);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  const child2 = runtime.module(define2);
  main.import("concaveman", child2);
  const child3 = runtime.module(define3);
  main.import("createSuite", child3);
  main.import("expect", child3);
  main.variable(observer()).define(["md"], _145);
  main.variable(observer("paper_canvas")).define("paper_canvas", ["htl"], _paper_canvas);
  main.variable(observer("paper")).define("paper", ["require"], _paper);
  main.variable(observer("polygon")).define("polygon", ["paper"], _polygon);
  main.variable(observer("line")).define("line", ["paper"], _line);
  main.variable(observer("intersections")).define("intersections", ["line","polygon"], _intersections);
  main.variable(observer()).define(["md"], _151);
  main.variable(observer("sideA")).define("sideA", ["createBoxJointSide","materialThickness","fingerAdd","fingerSubtract"], _sideA);
  main.variable(observer("sideB")).define("sideB", ["createBoxJointSide","materialThickness","fingerSubtract","fingerAdd"], _sideB);
  main.variable(observer("createBoxJointSide")).define("createBoxJointSide", ["THREE"], _createBoxJointSide);
  main.variable(observer("jointScene")).define("jointScene", ["THREE","createLineSegment","Line3","Vector3"], _jointScene);
  main.variable(observer()).define(["jointScene","sideA","sideB","invalidation"], _156);
  main.variable(observer("jointWorld")).define("jointWorld", ["width","height","THREE","Vector3","jointScene","invalidation"], _jointWorld);
  main.variable(observer()).define(["jointWorld","viewof fingerMeasures","htl"], _158);
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
  main.variable(observer()).define(["auto_fit_fingers","viewof fingerSubtract","angleToFingerRetraction","jointAngle","viewof fingerAdd","angleToFingerExtension","Event"], _168);
  main.variable(observer()).define(["sideB","Vector3","deg2rad","jointAngle"], _169);
  main.variable(observer()).define(["jointWorld","jointScene"], _170);
  main.variable(observer()).define(["md"], _171);
  main.variable(observer()).define(["viewof prompt"], _172);
  main.variable(observer()).define(["Inputs","suggestion"], _173);
  main.variable(observer()).define(["viewof suggestion"], _174);
  main.variable(observer()).define(["md"], _175);
  main.variable(observer()).define(["viewof context_viz"], _176);
  main.variable(observer("markdown_skill")).define("markdown_skill", ["md","mermaid","htl","tex"], _markdown_skill);
  main.variable(observer()).define(["md"], _178);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _179);
  main.variable(observer()).define(["viewof feedback_prompt"], _180);
  main.variable(observer()).define(["md"], _181);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _182);
  main.variable(observer()).define(["viewof api_endpoint"], _183);
  main.variable(observer()).define(["viewof settings"], _184);
  main.variable(observer()).define(["background_tasks"], _185);
  main.variable(observer()).define(["md"], _187);
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
  main.variable(observer()).define(["footer"], _190);
  return main;
}
