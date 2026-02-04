import define1 from "./03dda470c56b93ff@8395.js";
import define2 from "./f109935193c0deba@4551.js";

function _app(html){return(
html`<div id="app">
  <canvas id="renderCanvas"></canvas>
  <h1 class="overlay">VR Hackerspace</h1>
</div>`
)}

function _enterVR(Inputs,scene,alert,ground){return(
Inputs.button("Enter VR", {
  reduce: async () => {
    let xrExp;
    if (!scene.createDefaultXRExperienceAsync) {
      alert("WebXR helpers not available in this Babylon build.");
      return;
    }
    if (
      xrExp &&
      xrExp.baseExperience &&
      xrExp.baseExperience.sessionManager &&
      xrExp.baseExperience.sessionManager.session
    ) {
      try {
        await xrExp.baseExperience.exitXRAsync();
      } catch (e) {}
      return;
    }
    try {
      xrExp = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
      });
      await xrExp.baseExperience.enterXRAsync("immersive-vr", "local-floor");
    } catch (err) {
      console.error(err);
      alert("Failed to enter VR: " + (err && err.message ? err.message : err));
    }
  }
})
)}

function _3(md){return(
md`Hosted Observable Notebooks do not have the required permissions to go into VR directly. But you can click exporter's preview and then export to open a copy of the page without VR restrictions.`
)}

function _4(exporter){return(
exporter()
)}

function _5(md){return(
md`## Project Overview

Goals

  -  Create a web-based collaborative maker space in VR/AR.
  -  Support direct manipulation metaphors (easel with paint brushes, lathe with rotating stock, etc.).
  -  Allow multiple users to co-create geometry and media in real time.
  -  Keep implementation simple, using widely documented and AI-accessible stacks.
  -  Target browser-based delivery for ease of access and sharing.
`
)}

function _6(md){return(
md`Stack
- ECS: miniplex.
- Renderer + XR: Babylon.js (WebGL/WebGPU, WebXR input and cameras).
- Physics: Rapier 3D (via @dimforge/rapier3d-compat).
- Dataflow: Observable cells for dev UX; production bundles can use the same module graph.
- Goals: real-time co-creation, tool-based editing, deterministic ops log, browser-first XR.`
)}

function _babylon(){return(
import("https://cdn.jsdelivr.net/npm/@babylonjs/core@6.0.0/+esm")
)}

function _rapier(){return(
import(
  "https://cdn.jsdelivr.net/npm/@dimforge/rapier3d-compat@0.19.0/+esm"
)
)}

function _miniplex(){return(
import("https://cdn.jsdelivr.net/npm/miniplex@2.0.0/+esm")
)}

function _10(md){return(
md`## Architecture

Core components
- Transform { position: Vector3, rotation: Quaternion, scale: Vector3, version: number }
- RenderHandle { meshRef: Babylon.Mesh, materialRef?: Babylon.Material }
- PhysicsBody { bodyRef: Rapier.RigidBody, colliderRef?: Rapier.Collider, type: "dynamic" | "kinematic" | "fixed", awake: boolean, lastSyncVersion: number }
- GeometryRep { kind: "parametricLathe" | "extrusion" | "csgMesh" | "sdf" | "canvas2d", dataRef: any, dirty: boolean, colliderDirty: boolean, geomVersion: number }
- Tool { kind: string, params: any }  // brushes, chisels, boolean ops, paint, etc.
- NetworkSync { lastSentVersion: number, entityId?: string }
- XRInput { handedness: "left" | "right", pose: {position, rotation}, buttons/axes: … }

Frame pipeline (per render frame)
1) InputSystem
   - Read Babylon’s XR/session/gamepad/mouse events → write intents into ECS (Tool, XRInput).
2) ToolSystem
   - Apply tools to GeometryRep and/or Transform.
   - Set GeometryRep.dirty = true and bump geomVersion (authoritative geometry only).
3) GeometryBuildSystem (off-thread where possible)
   - If GeometryRep.dirty: build/patch geometry buffers in a worker/job queue.
   - Write results back to GeometryRep.dataRef; set colliderDirty = true.
   - Do not touch Babylon Mesh or Rapier here.
4) PhysicsSyncSystem (Rapier)
   - If PhysicsBody.type === "kinematic": push Transform → bodyRef setNextKinematic{Translation,Rotation}.
   - If "dynamic": step Rapier, then read bodyRef pose → write to Transform and bump version if changed.
   - If GeometryRep.colliderDirty: cook/update Rapier collider, swap colliderRef, clear flag.
5) GraphicsSyncSystem (Babylon)
   - If geomVersion changed: update mesh vertex buffers via updateVerticesData/setIndices or replace Geometry; avoid replacing Mesh.
   - Always apply Transform to Babylon nodes (position, rotationQuaternion, scaling).
6) NetworkSystem (future)
   - Send operation or component deltas keyed by geomVersion; avoid sending whole meshes.
   - Reconcile remote ops into ECS; resolve conflicts via op ordering or CRDT if needed.

Geometry pipeline
- Authoritative source: GeometryRep (not Babylon meshes).
- Double-buffer mesh data (A/B) to avoid stalls; swap on geomVersion change.
- Worker jobs for heavy builds: lathe/extrusion, CSG evaluation, SDF meshing, texture synthesis.
- For large edits, support chunked updates (patch vertex subranges/texture subrects).
- Deterministic seeds for stochastic tools to ensure replay consistency.

Physics collider strategy (Rapier)
- Prefer primitives (cuboid, sphere, capsule) or compounds during live editing.
- Lathe stock: cylinder or compound of thin convex slices; update only affected slices.
- Dynamic meshes: convex decomposition/polyhedron where feasible; trimesh only for static.
- Gate recooks with hysteresis: recalc collider only when surface delta exceeds a threshold.
- Keep colliderDirty separate from visual geomVersion to decouple graphics and physics rates.

Transform authority
- Dynamic body: Rapier owns pose; ECS Transform mirrors after step.
- Kinematic/animated: ECS Transform owns pose; push to Rapier kinematic target.
- Fixed: ECS Transform is single source; collider on fixed body.

Graphics details (Babylon.js)
- Meshes are views; store only references in RenderHandle.
- Update transforms after physics sync; cache last applied version to avoid redundant writes.
- Prefer updateVerticesData for stable attributes; replace Geometry for topology changes.
- Materials and dynamic textures (e.g., canvas2d) live outside GeometryRep, but texture content changes can be versioned similarly for networking.

XR and input
- Use Babylon WebXR to acquire controller poses, grip/aim, and button/axis states.
- Map XRInput → Tool intents (e.g., draw stroke, grab/teleport, sculpt).
- Non-XR: mouse/keyboard/gamepad adapters produce the same intent schema.

Networking and sync (future)
- Transport: WebSocket server; optional WebRTC for P2P media.
- Data model: op-log per GeometryRep (e.g., “add profile point”, “apply stroke chunk”, “boolean op”).
- Server applies ops, increments geomVersion, and rebroadcasts; clients reconcile with local predictions.
- Optional CRDT/OT for shared canvases and text; ops remain primary for geometry.

Undo/redo and determinism
- Maintain operation log for each editable artifact; snapshots for fast loads.
- Seeded randomness in tools; rebuild from ops for replay, test, and conflict resolution.
- Persist ops and periodic snapshots to storage (IndexedDB locally; server DB remotely).

Performance and threading
- Rate-limit geometry builds to N/sec; coalesce rapid edits.
- Use workers for CPU-heavy tasks; pass transferable buffers where possible.
- Throttle collider recooks; prioritize user-facing latency (tools, transform) over background meshing.
- Consider WebGPU path (Babylon) when broadly available.

Testing and diagnostics
- Unit-test tool ops deterministically.
- Visual golden images for geometry builds.
- Physics/graphics sync assertions (e.g., drift thresholds).
- On-screen stats: build queue depth, geomVersion, collider recook counts.

Open questions
- Convex decomposition approach and thresholds for Rapier.
- Granularity of chunked updates for very large meshes.
- Reconciliation strategy under high latency: pure op-log vs. CRDT hybrid.

This plan reflects the current stack: Babylon.js for graphics/XR, Rapier for physics, and miniplex for ECS, while keeping the original principles of operation-logged, off-thread geometry, and decoupled graphics/physics pipelines.`
)}

function _11(htl){return(
htl.html`<style>
      html, body { height: 100%; margin: 0; }
      #app { height: 100%; }
      #renderCanvas { width: 100%; height: 100%; display: block; touch-action: none; }
      .overlay {
        position: absolute; left: 10px; top: 10px; 
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; 
        color: white;
      }
      a, a:visited { color: #7fd; }
    </style>`
)}

function _canvas(app){return(
app.querySelector("#renderCanvas")
)}

function _engine(babylon,canvas){return(
new babylon.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true
})
)}

function _scene(babylon,engine){return(
new babylon.Scene(engine)
)}

function _render_scene(engine,scene){return(
engine.runRenderLoop(() => scene.render())
)}

function _camera(babylon,scene,canvas)
{
  const camera = new babylon.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    6,
    new babylon.Vector3(0, 1, 0),
    scene
  );
  camera.attachControl(canvas, true);
  return camera;
}


function _init_rapier(rapier){return(
rapier.init()
)}

function _world(miniplex){return(
new miniplex.World()
)}

function _ecs(world){return(
(() => {
  function create() {
    return world.add({});
  }
  function addComponent(entity, name, data) {
    if (typeof name === "object" && data === undefined) {
      world.addComponent(entity, name);
      return entity;
    } else {
      world.addComponent(entity, name, data);
      return entity;
    }
  }
  function removeComponent(entity, name) {
    world.removeComponent(entity, name);
  }
  function query(all = []) {
    if (!Array.isArray(all)) all = [all];
    const out = [];
    for (const e of world) {
      let ok = true;
      for (const c of all) {
        if (!(c in e)) {
          ok = false;
          break;
        }
      }
      if (ok) out.push(e);
    }
    return out;
  }
  return {
    world,
    create,
    addComponent,
    removeComponent,
    query
  };
})()
)}

function _makeColliderFromMesh(rapier){return(
function makeColliderFromMesh(mesh) {
  const bi = mesh.getBoundingInfo().boundingBox;
  const min = bi.minimumWorld;
  const max = bi.maximumWorld;
  const hx = Math.max(0.001, (max.x - min.x) * 0.5);
  const hy = Math.max(0.001, (max.y - min.y) * 0.5);
  const hz = Math.max(0.001, (max.z - min.z) * 0.5);
  return rapier.ColliderDesc.cuboid(hx, hy, hz);
}
)}

function _physicsToEcsSync(ecs,EPS_POS,EPS_ROT){return(
function physicsToEcsSync() {
  const ents = ecs.query(["PhysicsBody", "Transform", "RenderHandle"]);
  for (const e of ents) {
    const pb = e.PhysicsBody;
    const t = e.Transform;
    if (pb.type === "dynamic") {
      const b = pb.bodyRef;
      const p = b.translation();
      const r = b.rotation();
      const dx = t.position.x - p.x;
      const dy = t.position.y - p.y;
      const dz = t.position.z - p.z;
      const posDiff2 = dx * dx + dy * dy + dz * dz;
      const rq = { x: r.x, y: r.y, z: r.z, w: r.w };
      const drot =
        Math.abs(t.rotation.x - rq.x) +
        Math.abs(t.rotation.y - rq.y) +
        Math.abs(t.rotation.z - rq.z) +
        Math.abs(t.rotation.w - rq.w);
      if (posDiff2 > EPS_POS * EPS_POS || drot > EPS_ROT) {
        t.position.set(p.x, p.y, p.z);
        t.rotation.set(rq.x, rq.y, rq.z, rq.w);
        t.version = (t.version || 0) + 1;
      }
    } else if (pb.type === "kinematic") {
      const b = pb.bodyRef;
      b.setNextKinematicTranslation({
        x: t.position.x,
        y: t.position.y,
        z: t.position.z
      });
      b.setNextKinematicRotation({
        x: t.rotation.x,
        y: t.rotation.y,
        z: t.rotation.z,
        w: t.rotation.w
      });
    }
  }
}
)}

function _createEntityForMesh(ecs,babylon,makeRigidBodyDescFromType,physicsWorld,makeColliderFromMesh){return(
function createEntityForMesh(mesh, opts = {}) {
  const type = opts.type ?? "dynamic";
  const e = ecs.create();
  const pos = mesh.position;
  const rotq =
    mesh.rotationQuaternion ??
    babylon.Quaternion.RotationYawPitchRoll(
      mesh.rotation.y,
      mesh.rotation.x,
      mesh.rotation.z
    );
  const scale = mesh.scaling;
  ecs.addComponent(e, "Transform", {
    position: new babylon.Vector3(pos.x, pos.y, pos.z),
    rotation: rotq.clone(),
    scale: scale.clone(),
    version: 1
  });
  ecs.addComponent(e, "RenderHandle", { meshRef: mesh });
  const rbDesc = makeRigidBodyDescFromType(type);
  rbDesc.setTranslation(mesh.position.x, mesh.position.y, mesh.position.z);
  const rb = physicsWorld.createRigidBody(rbDesc);
  const colDesc = makeColliderFromMesh(mesh);
  const col = physicsWorld.createCollider(colDesc, rb);
  ecs.addComponent(e, "PhysicsBody", {
    bodyRef: rb,
    colliderRef: col,
    type,
    awake: true,
    lastSyncVersion: 0
  });
  return e;
}
)}

function _EPS_POS(){return(
1e-3
)}

function _EPS_ROT(){return(
1e-3
)}

function _makeRigidBodyDescFromType(rapier){return(
function makeRigidBodyDescFromType(type) {
  if (type === "dynamic") return rapier.RigidBodyDesc.dynamic();
  if (type === "kinematic")
    return rapier.RigidBodyDesc.kinematicPositionBased();
  return rapier.RigidBodyDesc.fixed();
}
)}

function _physicsWorld(init_rapier,rapier)
{
  init_rapier;
  return new rapier.World({ x: 0, y: -9.81, z: 0 });
}


function _sphereEntity(createEntityForMesh,sphere){return(
createEntityForMesh(sphere, { type: "dynamic" })
)}

function _groundEntity(createEntityForMesh,ground){return(
createEntityForMesh(ground, { type: "fixed" })
)}

function _hemiEntity(createLightEntity){return(
createLightEntity("hemi", {
  name: "hemiLight",
  intensity: 0.6,
  position: [0, 1, 0],
  direction: [0, -1, 0]
})
)}

function _sunEntity(createLightEntity){return(
createLightEntity("dir", {
  name: "sunLight",
  intensity: 0.95,
  position: [6, 8, -6],
  direction: [-0.6, -1, -0.4],
  target: [0, 0, 0]
})
)}

function _graphicsApplyTransforms(ecs,babylon){return(
function graphicsApplyTransforms() {
  const ents = ecs.query(["Transform"]);
  for (const e of ents) {
    const t = e.Transform;
    if (e.RenderHandle) {
      const mh = e.RenderHandle;
      const mesh = mh.meshRef;
      if (!mesh) continue;
      if (mesh.__lastTransformVersion === t.version) continue;
      mesh.position.copyFrom(t.position);
      if (mesh.rotationQuaternion) mesh.rotationQuaternion.copyFrom(t.rotation);
      else
        mesh.rotation.copyFrom(
          typeof t.rotation.toEulerAngles === "function"
            ? t.rotation.toEulerAngles()
            : t.rotation
        );
      mesh.scaling.copyFrom(t.scale);
      mesh.__lastTransformVersion = t.version;
    }
    if (e.LightHandle) {
      const lh = e.LightHandle;
      const light = lh.lightRef;
      if (!light) continue;
      if (light.__lastTransformVersion === t.version) continue;
      if (lh.kind === "hemi") {
        const dir = new babylon.Vector3(
          -t.position.x,
          -t.position.y,
          -t.position.z
        );
        dir.normalize();
        if (light.direction) light.direction.copyFrom(dir);
      } else if (lh.kind === "dir") {
        if (light.position) light.position.copyFrom(t.position);
        if (lh.target) {
          const dirv = new babylon.Vector3(
            lh.target.x - t.position.x,
            lh.target.y - t.position.y,
            lh.target.z - t.position.z
          );
          dirv.normalize();
          if (light.direction) light.direction.copyFrom(dirv);
        }
      } else if (lh.kind === "point") {
        if (light.position) light.position.copyFrom(t.position);
      }
      light.__lastTransformVersion = t.version;
    }
  }
}
)}

function _createLightEntity(babylon,scene,ecs){return(
function createLightEntity(type, opts = {}) {
  const name = opts.name ?? `light-${Math.random().toString(36).slice(2, 8)}`;
  if (type === "hemi") {
    const dir = opts.direction
      ? new babylon.Vector3(
          opts.direction[0],
          opts.direction[1],
          opts.direction[2]
        )
      : new babylon.Vector3(0, -1, 0);
    const light = new babylon.HemisphericLight(name, dir, scene);
    light.intensity = opts.intensity ?? 0.8;
    const e = ecs.create();
    ecs.addComponent(e, "Transform", {
      position: new babylon.Vector3(
        opts.position?.[0] ?? 0,
        opts.position?.[1] ?? 1,
        opts.position?.[2] ?? 0
      ),
      rotation: new babylon.Quaternion(0, 0, 0, 1),
      scale: new babylon.Vector3(1, 1, 1),
      version: 1
    });
    ecs.addComponent(e, "LightHandle", { lightRef: light, kind: "hemi" });
    return e;
  } else if (type === "dir") {
    const dir = opts.direction
      ? new babylon.Vector3(
          opts.direction[0],
          opts.direction[1],
          opts.direction[2]
        )
      : new babylon.Vector3(-1, -2, -1);
    dir.normalize();
    const light = new babylon.DirectionalLight(name, dir, scene);
    light.intensity = opts.intensity ?? 0.9;
    const pos = new babylon.Vector3(
      opts.position?.[0] ?? 6,
      opts.position?.[1] ?? 8,
      opts.position?.[2] ?? -6
    );
    if (light.position) light.position.copyFrom(pos);
    const e = ecs.create();
    ecs.addComponent(e, "Transform", {
      position: pos,
      rotation: new babylon.Quaternion(0, 0, 0, 1),
      scale: new babylon.Vector3(1, 1, 1),
      version: 1
    });
    const target = opts.target
      ? new babylon.Vector3(opts.target[0], opts.target[1], opts.target[2])
      : new babylon.Vector3(0, 0, 0);
    ecs.addComponent(e, "LightHandle", {
      lightRef: light,
      kind: "dir",
      target
    });
    return e;
  } else if (type === "point") {
    const pos = opts.position
      ? new babylon.Vector3(
          opts.position[0],
          opts.position[1],
          opts.position[2]
        )
      : new babylon.Vector3(0, 2, 0);
    const light = new babylon.PointLight(name, pos, scene);
    light.intensity = opts.intensity ?? 1;
    const e = ecs.create();
    ecs.addComponent(e, "Transform", {
      position: pos.clone(),
      rotation: new babylon.Quaternion(0, 0, 0, 1),
      scale: new babylon.Vector3(1, 1, 1),
      version: 1
    });
    ecs.addComponent(e, "LightHandle", { lightRef: light, kind: "point" });
    return e;
  }
  return null;
}
)}

function _recookColliderIfNeeded(ecs,physicsWorld,makeColliderFromMesh){return(
function recookColliderIfNeeded() {
  const ents = ecs.query(["PhysicsBody", "RenderHandle", "GeometryRep"]);
  for (const e of ents) {
    const gr = e.GeometryRep;
    if (!gr || !gr.colliderDirty) continue;
    const mh = e.RenderHandle;
    const mesh = mh.meshRef;
    const pb = e.PhysicsBody;
    const oldCol = pb.colliderRef;
    try {
      physicsWorld.removeCollider(oldCol);
    } catch (err) {}
    const newDesc = makeColliderFromMesh(mesh);
    const newCol = physicsWorld.createCollider(newDesc, pb.bodyRef);
    pb.colliderRef = newCol;
    gr.colliderDirty = false;
  }
}
)}

function _loop(physicsWorld,scene,physicsToEcsSync,recookColliderIfNeeded,graphicsApplyTransforms)
{
  let lastTime = performance.now();
  function physicsStep(dt) {
    physicsWorld.timestep = dt;
    physicsWorld.step();
  }
  return scene.onBeforeRenderObservable.add(() => {
    const now = performance.now();
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    if (dt > 0.05) dt = 0.05;
    physicsStep(dt);
    physicsToEcsSync();
    recookColliderIfNeeded();
    graphicsApplyTransforms();
  });
}


function _sphere(scene,babylon){return(
scene.getMeshByName("sphere") ??
  (() => {
    const s = babylon.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1.2 },
      scene
    );
    s.position.y = 1;
    const m = new babylon.StandardMaterial("sphereMat", scene);
    m.diffuseColor = new babylon.Color3(0.2, 0.6, 0.9);
    s.material = m;
    return s;
  })()
)}

function _ground(scene,babylon){return(
scene.getMeshByName("ground") ??
  (() => {
    return babylon.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      scene
    );
  })()
)}

async function _gui(){return(
await import("https://cdn.jsdelivr.net/npm/@babylonjs/gui@6.0.0/+esm")
)}

function _vrconsole(app,scene,babylon,gui,engine){return(
(() => {
  const MAX_LINES = 60;
  const origLog = console.log.bind(console);
  const origError = console.error.bind(console);
  const buffer = [];
  function push(level, parts) {
    const text = parts
      .map((p) => {
        try {
          if (typeof p === "string") return p;
          return JSON.stringify(p);
        } catch (e) {
          return String(p);
        }
      })
      .join(" ");
    buffer.push({ level, text, t: new Date() });
    while (buffer.length > MAX_LINES) buffer.shift();
    renderHTML();
    renderVR();
  }
  const overlay = document.createElement("div");
  overlay.className = "vr-shadow-console";
  overlay.style.cssText =
    "position:absolute;left:10px;bottom:10px;max-width:40vw;max-height:40vh;overflow:auto;background:rgba(0,0,0,0.5);color:#e6f7ff;font-family:monospace;font-size:12px;padding:8px;border-radius:6px;z-index:9999;pointer-events:none;";
  app.appendChild(overlay);
  function renderHTML() {
    overlay.innerHTML = buffer
      .map((m) => {
        const ts = m.t.toLocaleTimeString();
        const cls = m.level === "error" ? "color:#ffb3b3" : "color:#cfefff";
        return `<div style="white-space:pre-wrap;${cls}">[${ts}] ${m.level.toUpperCase()}: ${escapeHtml(
          m.text
        )}</div>`;
      })
      .join("");
    overlay.scrollTop = overlay.scrollHeight;
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  let plane = null;
  let adt = null;
  let textBlock = null;
  function makeVRPanel() {
    if (plane && !plane.isDisposed()) return;
    if (plane && plane.isDisposed && !plane.isDisposed()) return;
    if (plane && plane.getScene && plane.getScene() !== scene) {
      try {
        plane.dispose();
      } catch {}
      plane = null;
    }
    plane = babylon.MeshBuilder.CreatePlane(
      "vr-console-plane",
      { width: 1.4, height: 0.6 },
      scene
    );
    plane.isPickable = false;
    plane.alwaysSelectAsActiveMesh = false;
    plane.layerMask = 0x0fffffff;
    adt = gui.GUI.AdvancedDynamicTexture.CreateForMesh(plane, 1024, true);
    textBlock = new gui.GUI.TextBlock();
    textBlock.text = "";
    textBlock.color = "white";
    textBlock.fontFamily = "monospace";
    textBlock.fontSize = 36;
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment =
      gui.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textBlock.textVerticalAlignment = gui.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    textBlock.paddingTop = "8px";
    textBlock.paddingLeft = "12px";
    adt.addControl(textBlock);
    reparentToActiveCamera();
    plane.renderingGroupId = 2;
    plane.receiveShadows = false;
    plane.checkCollisions = false;
  }
  function reparentToActiveCamera() {
    if (!plane) return;
    const cam = scene.activeCamera;
    if (!cam) return;
    try {
      plane.setParent(cam);
      plane.position = new babylon.Vector3(0, -0.25, 1);
      plane.rotationQuaternion = new babylon.Quaternion(0, 0, 0, 1);
      plane.scaling = new babylon.Vector3(1, 1, 1);
    } catch (e) {}
  }
  function renderVR() {
    if (!scene || scene.isDisposed) return;
    try {
      if (!plane || plane.isDisposed()) makeVRPanel();
      const lines = buffer
        .map((m) => {
          const ts = m.t.toLocaleTimeString();
          const prefix = m.level === "error" ? "[ERR]" : "[LOG]";
          return `${ts} ${prefix} ${m.text}`;
        })
        .join("\n");
      if (textBlock) textBlock.text = lines;
    } catch (e) {}
  }
  scene.onActiveCameraChanged.add(() => {
    reparentToActiveCamera();
  });
  engine.onResizeObservable.add(() => {
    if (adt && !adt.isDisposed)
      try {
        adt.scaleTo(1);
      } catch (e) {}
  });
  function clear() {
    buffer.length = 0;
    renderHTML();
    renderVR();
  }
  console.log = function (...args) {
    origLog(...args);
    push("log", args);
  };
  console.error = function (...args) {
    origError(...args);
    push("error", args);
  };
  window.addEventListener("error", (e) => {
    try {
      push("error", [
        e.message + (e.filename ? ` (${e.filename}:${e.lineno || "?"})` : "")
      ]);
    } catch {}
  });
  window.addEventListener("unhandledrejection", (e) => {
    try {
      push("error", [String(e.reason)]);
    } catch {}
  });
  return {
    pushLog: (...parts) => push("log", parts),
    pushError: (...parts) => push("error", parts),
    clear,
    buffer,
    makeVRPanel
  };
})()
)}

function _39(scene){return(
scene.onActiveCameraChanged
)}

function _40(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("app")).define("app", ["html"], _app);
  main.variable(observer("viewof enterVR")).define("viewof enterVR", ["Inputs","scene","alert","ground"], _enterVR);
  main.variable(observer("enterVR")).define("enterVR", ["Generators", "viewof enterVR"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["exporter"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("babylon")).define("babylon", _babylon);
  main.variable(observer("rapier")).define("rapier", _rapier);
  main.variable(observer("miniplex")).define("miniplex", _miniplex);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["htl"], _11);
  main.variable(observer("canvas")).define("canvas", ["app"], _canvas);
  main.variable(observer("engine")).define("engine", ["babylon","canvas"], _engine);
  main.variable(observer("scene")).define("scene", ["babylon","engine"], _scene);
  main.variable(observer("render_scene")).define("render_scene", ["engine","scene"], _render_scene);
  main.variable(observer("camera")).define("camera", ["babylon","scene","canvas"], _camera);
  main.variable(observer("init_rapier")).define("init_rapier", ["rapier"], _init_rapier);
  main.variable(observer("world")).define("world", ["miniplex"], _world);
  main.variable(observer("ecs")).define("ecs", ["world"], _ecs);
  main.variable(observer("makeColliderFromMesh")).define("makeColliderFromMesh", ["rapier"], _makeColliderFromMesh);
  main.variable(observer("physicsToEcsSync")).define("physicsToEcsSync", ["ecs","EPS_POS","EPS_ROT"], _physicsToEcsSync);
  main.variable(observer("createEntityForMesh")).define("createEntityForMesh", ["ecs","babylon","makeRigidBodyDescFromType","physicsWorld","makeColliderFromMesh"], _createEntityForMesh);
  main.variable(observer("EPS_POS")).define("EPS_POS", _EPS_POS);
  main.variable(observer("EPS_ROT")).define("EPS_ROT", _EPS_ROT);
  main.variable(observer("makeRigidBodyDescFromType")).define("makeRigidBodyDescFromType", ["rapier"], _makeRigidBodyDescFromType);
  main.variable(observer("physicsWorld")).define("physicsWorld", ["init_rapier","rapier"], _physicsWorld);
  main.variable(observer("sphereEntity")).define("sphereEntity", ["createEntityForMesh","sphere"], _sphereEntity);
  main.variable(observer("groundEntity")).define("groundEntity", ["createEntityForMesh","ground"], _groundEntity);
  main.variable(observer("hemiEntity")).define("hemiEntity", ["createLightEntity"], _hemiEntity);
  main.variable(observer("sunEntity")).define("sunEntity", ["createLightEntity"], _sunEntity);
  main.variable(observer("graphicsApplyTransforms")).define("graphicsApplyTransforms", ["ecs","babylon"], _graphicsApplyTransforms);
  main.variable(observer("createLightEntity")).define("createLightEntity", ["babylon","scene","ecs"], _createLightEntity);
  main.variable(observer("recookColliderIfNeeded")).define("recookColliderIfNeeded", ["ecs","physicsWorld","makeColliderFromMesh"], _recookColliderIfNeeded);
  main.variable(observer("loop")).define("loop", ["physicsWorld","scene","physicsToEcsSync","recookColliderIfNeeded","graphicsApplyTransforms"], _loop);
  main.variable(observer("sphere")).define("sphere", ["scene","babylon"], _sphere);
  main.variable(observer("ground")).define("ground", ["scene","babylon"], _ground);
  main.variable(observer("gui")).define("gui", _gui);
  main.variable(observer("vrconsole")).define("vrconsole", ["app","scene","babylon","gui","engine"], _vrconsole);
  main.variable(observer()).define(["scene"], _39);
  main.variable(observer()).define(["robocoop"], _40);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  const child2 = runtime.module(define2);
  main.import("robocoop", child2);
  return main;
}
