import define1 from "./84194c694539e103@2376.js";
import define2 from "./cdc303fcc82a630f@262.js";
import define3 from "./26b0ee4d8f136fca@374.js";
import define4 from "./98f34e974bb2e4bc@699.js";
import define5 from "./e3a019069a130d79@6742.js";
import define6 from "./5845e1ca935fea5a@225.js";
import define7 from "./048a17a165be198d@273.js";
import define8 from "./0e0b35a92c819d94@474.js";
import define9 from "./1f41fef8b019cf4e@94.js";
import define10 from "./f92778131fd76559@1208.js";
import define11 from "./04318fffe4df9d1e@2463.js";
import define12 from "./db42ae70222a8b08@1033.js";
import define13 from "./b69d20b9e3533ef8@158.js";
import define14 from "./e3659730ba3df002@40.js";

function _1(md){return(
md`# Roboco-op 2.1: Notebook collaborator`
)}

function _robocoop(keepalive,robocoopModule,tabbedPane,html,reversibleAttach,ui_attached,$0,$1,$2,$3,$4,$5,$6,$7,$8,$9)
{
  keepalive(robocoopModule, "background_tasks");
  return tabbedPane({
    Robocoop: html`<div>
    ${reversibleAttach(ui_attached, $0)}
    ${reversibleAttach(ui_attached, $1)}
    ${reversibleAttach(ui_attached, $2)}
    ${reversibleAttach(ui_attached, $3)}
    ${reversibleAttach(ui_attached, $4)}
    ${reversibleAttach(ui_attached, $5)}
    ${reversibleAttach(ui_attached, $6)}
  </div>`,
    config: html`<div>
    ${reversibleAttach(ui_attached, $7)}
    ${reversibleAttach(ui_attached, $8)}
    ${reversibleAttach(ui_attached, $9)}
  </div>`
  });
}


function _3(md){return(
md`## Usage

Import cell \`robocoop\`:-
~~~js
import {robocoop} from '@tomlarkworthy/robocoop-2'
~~~

place the cell in your notebook:-

~~~js
robocoop
~~~

See [@tomlarkworthy/robocoop-2-example](https://observablehq.com/@tomlarkworthy/robocoop-2-example) for an example`
)}

function _4(md){return(
md`## Introduction`
)}

function _5(md){return(
md`Roboco-op blends [Observablehq.com](https://observablehq.com/)'s reactive notebooks with an **open source** userspace AI coding assistant. Observable notebooks are a unique coding environment because the code development and runtime state are mixed together. This means Robocoop can write code and see the executed result.`
)}

function _6(md){return(
md`## Made by Roboco-op 2.0`
)}

function _pong_game(html,ResizeObserver)
{
  const root = html`<div class="pong-root" style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; display: grid; gap: 10px; max-width: 860px; margin: 0 auto;">
      <div class="hud" style="display: grid; grid-template-columns: 1fr auto auto auto; align-items: center; gap: 8px;">
        <div style="display:flex; gap:12px; align-items:center; flex-wrap: wrap;">
          <strong aria-live="polite" aria-atomic="true" class="score" style="font-size: 20px;">0 — 0</strong>
          <span class="status" style="color:#666; font-size: 12px;">W/S & ↑/↓ to move • P to pause</span>
        </div>
        <label style="display:flex; align-items:center; gap:6px;">
          <span>Mode</span>
          <select aria-label="Game mode" class="mode">
            <option value="1">1 Player (AI)</option>
            <option value="2">2 Players</option>
          </select>
        </label>
        <label style="display:flex; align-items:center; gap:6px;" class="ai-wrap">
          <span>AI</span>
          <select aria-label="AI difficulty" class="ai">
            <option value="easy">Easy</option>
            <option value="normal" selected>Normal</option>
            <option value="hard">Hard</option>
            <option value="insane">Insane</option>
          </select>
        </label>
        <div style="display:flex; gap:8px; justify-content:flex-end;">
          <button type="button" class="pause" aria-label="Pause or resume game" style="padding:6px 10px; border-radius:6px; border:1px solid #ccc; background:#fff;">Pause</button>
          <button type="button" class="reset" aria-label="Reset scores" style="padding:6px 10px; border-radius:6px; border:1px solid #ccc; background:#fff;">Reset</button>
        </div>
      </div>
      <div class="canvas-wrap" style="position:relative; background:#111; border-radius:10px; overflow:hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.2);">
      </div>
      <details style="font-size:12px; color:#666;">
        <summary>Controls</summary>
        <ul style="margin:6px 0 0 16px; line-height:1.5;">
          <li>Left paddle: W/S or drag on left half</li>
          <li>Right paddle: ↑/↓ or drag on right half (2P mode)</li>
          <li>P: Pause/Resume • R: Quick Reset</li>
        </ul>
      </details>
    </div>`;

  const wrap = root.querySelector(".canvas-wrap");
  const scoreEl = root.querySelector(".score");
  const statusEl = root.querySelector(".status");
  const btnPause = root.querySelector(".pause");
  const btnReset = root.querySelector(".reset");
  const modeSel = root.querySelector(".mode");
  const aiSel = root.querySelector(".ai");
  const aiWrap = root.querySelector(".ai-wrap");

  // Canvas setup with HiDPI support
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-label", "Pong game canvas");
  canvas.setAttribute("role", "img");
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "auto";
  wrap.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  // Responsive sizing
  const TARGET_ASPECT = 16 / 9;
  const MAX_W = 840;
  const MIN_W = 420;
  const resizeCanvas = () => {
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(MIN_W, Math.min(MAX_W, wrap.clientWidth || MAX_W));
    const h = Math.round(w / TARGET_ASPECT);
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    canvas.style.height = `${h}px`;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    dim.W = w;
    dim.H = h;
  };
  const ro = new ResizeObserver(resizeCanvas);
  ro.observe(wrap);

  // Game state
  const dim = { W: 800, H: 450 };
  const keys = new Set();
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const sign = (x) => (x < 0 ? -1 : 1);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const state = {
    scores: [0, 0],
    paused: false,
    waitingServe: 0, // ms remaining before serve
    singlePlayer: true,
    ai: "normal", // easy, normal, hard, insane
    particlePool: [],
    particles: [],
    ball: null,
    paddles: null,
    speedBase: 360, // px/s
    speedMax: 900, // cap
    spinFactor: 300, // how much vertical speed changes from hit offset
    lastTime: 0,
    raf: 0
  };

  const aiParams = {
    easy: { react: 0.08, jitter: 0.35, maxSpeed: 260 },
    normal: { react: 0.14, jitter: 0.22, maxSpeed: 340 },
    hard: { react: 0.2, jitter: 0.12, maxSpeed: 440 },
    insane: { react: 0.28, jitter: 0.06, maxSpeed: 600 }
  };

  const initEntities = () => {
    const W = dim.W,
      H = dim.H;
    const padW = 12,
      padH = Math.round(H * 0.22);
    const margin = 20;
    state.paddles = [
      { x: margin, y: (H - padH) / 2, w: padW, h: padH, vy: 0, color: "#fff" },
      {
        x: W - margin - padW,
        y: (H - padH) / 2,
        w: padW,
        h: padH,
        vy: 0,
        color: "#fff"
      }
    ];
    state.ball = {
      x: W / 2,
      y: H / 2,
      r: 7,
      vx: 0,
      vy: 0,
      speed: state.speedBase
    };
    serve(rand(0, 1) < 0.5 ? -1 : 1, 1200); // initial delayed serve
    state.particles.length = 0;
  };

  const serve = (dirX, delay = 800) => {
    state.waitingServe = delay;
    const angle = rand(-0.25, 0.25) * Math.PI; // +/-45°
    const s = state.speedBase * (1 + rand(-0.05, 0.05));
    state.ball.x = dim.W / 2;
    state.ball.y = dim.H / 2;
    state.ball.speed = s;
    state.ball.vx = Math.cos(angle) * s * dirX;
    state.ball.vy = Math.sin(angle) * s;
  };

  const spawnSparks = (x, y, nx, ny, count = 12, col = "#fff") => {
    for (let i = 0; i < count; i++) {
      const p = state.particlePool.pop() || {};
      p.x = x;
      p.y = y;
      const ang = Math.atan2(ny, nx) + rand(-0.7, 0.7);
      const spd = rand(80, 260);
      p.vx = Math.cos(ang) * spd;
      p.vy = Math.sin(ang) * spd;
      p.life = rand(0.25, 0.6);
      p.age = 0;
      p.size = rand(1, 2.2);
      p.color = col;
      state.particles.push(p);
    }
  };

  const updateParticles = (dt) => {
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const p = state.particles[i];
      p.age += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      // fade and gravity
      p.vy += 300 * dt;
      if (p.age >= p.life) {
        state.particles.splice(i, 1);
        state.particlePool.push(p);
      }
    }
  };

  const drawParticles = (ctx) => {
    ctx.save();
    for (const p of state.particles) {
      const t = p.age / p.life;
      ctx.globalAlpha = 1 - t;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.restore();
  };

  const draw = () => {
    const W = dim.W,
      H = dim.H;
    ctx.clearRect(0, 0, W, H);

    // Background
    const grd = ctx.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, "#0f0f11");
    grd.addColorStop(1, "#141416");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Midline with dash
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.setLineDash([8, 12]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2, 10);
    ctx.lineTo(W / 2, H - 10);
    ctx.stroke();
    ctx.restore();

    // Glow behind paddles and ball
    ctx.save();
    ctx.shadowColor = "rgba(255,255,255,0.35)";
    ctx.shadowBlur = 12;

    // Paddles
    for (const p of state.paddles) {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, Math.round(p.y), p.w, Math.round(p.h));
    }

    // Ball
    const b = state.ball;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();

    // Particles on top
    drawParticles(ctx);

    // Score
    ctx.save();
    ctx.font = "bold 28px system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(`${state.scores[0]} — ${state.scores[1]}`, W / 2, 14);
    ctx.restore();

    // Serve countdown overlay
    if (state.waitingServe > 0) {
      const t = Math.ceil(state.waitingServe / 400);
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font =
        "bold 64px system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${t}`, W / 2, H / 2);
      ctx.restore();
    }

    // Update HUD
    scoreEl.textContent = `${state.scores[0]} — ${state.scores[1]}`;
    statusEl.textContent = `${
      state.singlePlayer ? "W/S (Left) vs AI" : "W/S (Left) & ↑/↓ (Right)"
    } • ${state.paused ? "Paused (P)" : "Running (P to pause)"}`;
    btnPause.textContent = state.paused ? "Resume" : "Pause";
  };

  const rectsOverlap = (bx, by, br, rx, ry, rw, rh) => {
    const cx = clamp(bx, rx, rx + rw);
    const cy = clamp(by, ry, ry + rh);
    const dx = bx - cx;
    const dy = by - cy;
    return dx * dx + dy * dy <= br * br;
  };

  const collidePaddle = (b, p, isLeft) => {
    if (!rectsOverlap(b.x, b.y, b.r, p.x, p.y, p.w, p.h)) return false;
    // Compute hit offset (-1 .. 1)
    const pct = ((b.y - p.y) / p.h) * 2 - 1;
    const offset = clamp(pct, -1, 1);
    // Reflect X, add spin to Y
    const dir = isLeft ? 1 : -1;
    const cur = Math.hypot(b.vx, b.vy);
    const nextSpeed = clamp(cur * 1.06, state.speedBase, state.speedMax);
    const newVy = clamp(
      b.vy + offset * state.spinFactor,
      -state.speedMax,
      state.speedMax
    );
    const newVx =
      sign(-b.vx) *
      Math.sqrt(Math.max(1, nextSpeed * nextSpeed - newVy * newVy));
    b.vx = newVx;
    b.vy = newVy;
    // Nudge ball outside paddle to avoid sticking
    b.x = isLeft ? p.x + p.w + b.r + 0.5 : p.x - b.r - 0.5;
    b.speed = Math.hypot(b.vx, b.vy);
    spawnSparks(b.x, clamp(b.y, p.y, p.y + p.h), dir, 0, 14, "#e6f3ff");
    return true;
  };

  const update = (dt) => {
    const W = dim.W,
      H = dim.H;
    const [L, R] = state.paddles;
    const b = state.ball;

    // Serve countdown
    if (state.waitingServe > 0) {
      state.waitingServe -= dt * 1000;
      if (state.waitingServe <= 0) state.waitingServe = 0;
      return;
    }

    // Controls - Left paddle
    const speedPad = 520;
    let leftMove = 0,
      rightMove = 0;
    if (keys.has("KeyW")) leftMove -= 1;
    if (keys.has("KeyS")) leftMove += 1;
    if (keys.has("ArrowUp")) rightMove -= 1;
    if (keys.has("ArrowDown")) rightMove += 1;

    L.vy = leftMove * speedPad;
    if (!state.singlePlayer) R.vy = rightMove * speedPad;

    // AI control for right paddle (single player)
    if (state.singlePlayer) {
      const ai = aiParams[state.ai] || aiParams.normal;
      // Predict target with some jitter
      const target = clamp(b.y + rand(-1, 1) * ai.jitter * 60, 0, H);
      // Move toward target only if ball is moving towards AI or is near center
      const towardAI = b.vx > 0 || b.x > W * 0.4;
      const center = R.y + R.h / 2;
      const diff = target - center;
      const accel = ai.react * 2000;
      R.vy += towardAI ? clamp(diff, -1, 1) * accel * dt : 0;
      R.vy = clamp(R.vy, -ai.maxSpeed, ai.maxSpeed);
    }

    // Integrate paddles
    L.y = clamp(L.y + L.vy * dt, 0, H - L.h);
    R.y = clamp(R.y + R.vy * dt, 0, H - R.h);

    // Move ball
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    // Collide top/bottom
    if (b.y - b.r <= 0 && b.vy < 0) {
      b.y = b.r + 0.5;
      b.vy = -b.vy;
      spawnSparks(b.x, b.y, 0, 1, 10, "#d7f7ff");
    } else if (b.y + b.r >= H && b.vy > 0) {
      b.y = H - b.r - 0.5;
      b.vy = -b.vy;
      spawnSparks(b.x, b.y, 0, -1, 10, "#d7f7ff");
    }

    // Collide paddles
    collidePaddle(b, L, true);
    collidePaddle(b, R, false);

    // Scoring
    if (b.x + b.r < 0) {
      state.scores[1] += 1;
      spawnSparks(0, b.y, 1, 0, 30, "#ffd6d6");
      serve(1, 900);
    } else if (b.x - b.r > W) {
      state.scores[0] += 1;
      spawnSparks(W, b.y, -1, 0, 30, "#ffd6d6");
      serve(-1, 900);
    }

    // Particles
    updateParticles(dt);
  };

  const frame = (t) => {
    if (!state.lastTime) state.lastTime = t;
    const dtRaw = Math.min(1 / 30, Math.max(0, (t - state.lastTime) / 1000)); // clamp delta
    state.lastTime = t;
    if (!state.paused) update(dtRaw);
    draw();
    state.raf = window.requestAnimationFrame(frame);
  };

  // Input handling
  const onKeyDown = (e) => {
    if (e.repeat) return;
    if (e.code === "KeyP") {
      togglePause();
      return;
    }
    if (e.code === "KeyR") {
      hardReset();
      return;
    }
    keys.add(e.code);
  };
  const onKeyUp = (e) => {
    keys.delete(e.code);
  };

  // Pointer control: drag each side to move paddles
  let dragging = false;
  const onPointerDown = (e) => {
    dragging = true;
    canvas.setPointerCapture(e.pointerId);
    onPointerMove(e);
  };
  const onPointerUp = (e) => {
    dragging = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {}
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const target = x < rect.width / 2 ? state.paddles[0] : state.paddles[1];
    target.y = clamp(y - target.h / 2, 0, dim.H - target.h);
  };

  // Controls
  const togglePause = () => {
    state.paused = !state.paused;
    draw();
  };
  const hardReset = () => {
    state.scores = [0, 0];
    initEntities();
    draw();
  };
  btnPause.addEventListener("click", togglePause);
  btnReset.addEventListener("click", hardReset);
  modeSel.addEventListener("change", () => {
    state.singlePlayer = modeSel.value === "1";
    aiWrap.style.display = state.singlePlayer ? "flex" : "none";
    initEntities();
  });
  aiSel.addEventListener("change", () => {
    state.ai = aiSel.value;
    initEntities();
  });

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointermove", onPointerMove);

  // Init and start
  resizeCanvas();
  initEntities();
  state.raf = window.requestAnimationFrame(frame);

  // Cleanup when removed from DOM (best-effort)
  root.addEventListener(
    "DOMNodeRemoved",
    (ev) => {
      if (ev.target !== root) return;
      try {
        ro.disconnect();
      } catch {}
      try {
        window.cancelAnimationFrame(state.raf);
      } catch {}
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
    },
    { once: true }
  );

  return root;
}


function _8(md){return(
md`## Value aware

Robocoop receives the values of cells allowing test driven development. Pairs well with [inline unit tests](https://observablehq.com/@tomlarkworthy/tester). Uses [@tomlarkworthy/summarizejs](@tomlarkworthy/summarizejs#summarizeJS) to control context length and communicate typing.`
)}

function _9(md){return(
md`## Multi-modal

Robocoop receives a screenshot of the notebook using [@tomlarkworthy/modern-screenshot](https://observablehq.com/@tomlarkworthy/modern-screenshot)

`
)}

function _10(md){return(
md`## Websearch

Optionally can do websearch before answering`
)}

function _11(md){return(
md`## Contributing

If Roboco-op cannot do something you expect it should, you could add to its [\`evals\`](https://observablehq.com/@tomlarkworthy/robocoop-eval). The evals are used to evolve a new prompt using [GEPA](https://observablehq.com/@tomlarkworthy/gepa).`
)}

function _12(md){return(
md`## Prompt Interface
`
)}

function _ui_attached(Inputs){return(
Inputs.toggle({
  label: "ui_attached",
  value: true
})
)}

function _prompt(whisperInput,OPENAI_API_KEY,view,cautious,Inputs,invalidation)
{
  const whisper = whisperInput({
    API_KEY: OPENAI_API_KEY
  });
  const ui = view`<div>
      ${cautious(() => whisper)}
      ${[
        "...",
        Inputs.textarea({
          width: "100%",
          placeholder: "ask for a cell",
          rows: 10,
          minlength: 1,
          submit: true
        })
      ]}
    </div>`;
  invalidation.then(
    whisper.addEventListener("input", () => {
      ui.value = whisper.value;
    })
  );

  return ui;
}


function _includeModules(Inputs){return(
Inputs.toggle({
  label: "include dependancies in context?"
})
)}

function _includeNotebookScreenshot(Inputs){return(
Inputs.toggle({
  label: "include notebook screenshot in context?",
  value: true
})
)}

function _websearch(Inputs){return(
Inputs.toggle({
  label: "use websearch?",
  value: true
})
)}

function _copy_code(Inputs,cellsToClipboard,suggestion){return(
Inputs.button("copy code to clipboard", {
  reduce: () => cellsToClipboard([suggestion])
})
)}

function _suggestion(Inputs){return(
Inputs.textarea({
  label: "suggestion",
  width: "100%",
  rows: 50,
  disabled: true,
  value: "",
  style: "height: 500px"
})
)}

function _context(){return(
[]
)}

function _context_viz(Inputs,context){return(
Inputs.textarea({
  label: "context",
  rows: 20,
  width: "100%",
  disabled: true,
  value: context
    .map(
      ({ role, content }) =>
        `${role}:\n${typeof content == "string" ? content : content[0].text}\n`
    )
    .join("\n")
})
)}

function _23(md){return(
md`### AI Settings`
)}

function _system_prompt(Inputs){return(
Inputs.textarea({
  label: "system prompt",
  rows: 20,
  width: "100%",
  value: `Respond only with Observable JavaScript (Notebook 1.0) as XML <cell> blocks. Do not include any prose, Markdown, or JSON before, after, or between the XML cells.

Response format
- Each response may contain one or more <cell> blocks. Every block must contain exactly:
  - <inputs>…</inputs>: a comma-separated list of every free variable the cell reads (standard libraries and other cells), or empty if none. Examples: <inputs></inputs>, <inputs>d3</inputs>, <inputs>expect,x</inputs>, <inputs>viewof ready</inputs>.
    - Include all referenced globals such as Inputs, htl, d3, Plot, FileAttachment, width, etc., when used.
    - Use exact names only; do not nest tags or add attributes inside <inputs>.
  - <code><![CDATA[ …Observable JS code… ]]></code>

General rules
- Use Observable Notebook 1.0 semantics.
- Use the fewest cells required; prefer a single view (e.g., via Inputs.form). Split cells only when an import must be isolated or when a derived output should react to a view value.
- Do not log to the console or include comments; the cell’s value is the result.
- Use the exact variable names from the task. If the task requires a view, bind it with: viewof name = …
  - Use name for the view’s current value and viewof name for the element. Do not use name.value unless an API explicitly requires it.
- Prefer zero-dependency or standard-library solutions; import third-party packages only when necessary.

Standard libraries and inputs listing
- UI: use Inputs.* (Inputs.button with reduce, Inputs.toggle, Inputs.select, Inputs.range/Inputs.number, Inputs.form). Any cell calling Inputs.* must list Inputs.
- DOM/SVG: use Hypertext Literal via htl.html and htl.svg. Any cell using htl.* must list htl.
- Data utilities/viz: if a task mentions d3 or Plot, assume they are provided and list them in <inputs> for cells that use them.
- If you use FileAttachment, width, or other provided globals, list them in <inputs>.

Imports
- Do not use require().
- Use ESM CDN imports with a pinned version:
  - Single-assignment cell example: dateFns = await import("https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm")
- If you must provide a fallback CDN, keep a single top-level assignment via an async IIFE expression with try/catch:
  - dateFns = await (async () => { try { return await import("https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm"); } catch { return await import("https://esm.sh/date-fns@4.1.0"); } })()
- Keep each import cell to a single top-level assignment (no extra top-level statements).

Reactivity
- Any cell that reads a variable x must list x in <inputs>.
- If a cell needs the view element, list viewof x; if it needs the view’s value, list x.

Testing and fixes
- If asked to fix a failing test, change the implementation to satisfy the test; do not modify the test unless explicitly requested.
- If you provide a minimal assertion helper (e.g., expect().toBe), implement only what’s needed and keep it in its own cell.

Error handling
- If a requested feature is unsupported without external deps and imports are disallowed or fail, either implement a minimal dependency-free solution or return a value that throws a clear Error describing the unsupported case.

UI patterns
- Counter button:
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof count = Inputs.button("Increment", {value: 0, reduce: v => v + 1})
  ]]></code>
  </cell>
- Toggle:
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof ready = Inputs.toggle({label: "Ready", value: false})
  ]]></code>
  </cell>
- Dropdown:
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof rgb = Inputs.select(["red", "green", "blue"], {value: "red"})
  ]]></code>
  </cell>
- Form (single view returning an object):
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof credentials = Inputs.form({username: Inputs.text({label: "Username"}), password: Inputs.password({label: "Password"})})
  ]]></code>
  </cell>

Examples (minimal)
- Literal:
  <cell>
  <inputs></inputs>
  <code><![CDATA[
  x = 42
  ]]></code>
  </cell>
- Using d3:
  <cell>
  <inputs>d3</inputs>
  <code><![CDATA[
  sum = d3.sum([1, 2, 3, 4, 5])
  ]]></code>
  </cell>
- Pinned import and usage (CDN ESM):
  <cell>
  <inputs></inputs>
  <code><![CDATA[
  dateFns = await import("https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm")
  ]]></code>
  </cell>
  <cell>
  <inputs>dateFns</inputs>
  <code><![CDATA[
  formatted = dateFns.format(new Date(2020, 0, 1), "yyyy-MM-dd")
  ]]></code>
  </cell>
- Reactive SVG:
  <cell>
  <inputs>htl,rectangleSettings</inputs>
  <code><![CDATA[
  htl.svg\`<svg width="\${rectangleSettings.width + 20}" height="\${rectangleSettings.height + 20}" viewBox="0 0 \${rectangleSettings.width + 20} \${rectangleSettings.height + 20}">
    <rect x="10" y="10" width="\${rectangleSettings.width}" height="\${rectangleSettings.height}" fill="\${rectangleSettings.fill ?? "#ccc"}" stroke="#000"/>
  </svg>\`
  ]]></code>
  </cell>`
})
)}

function _models(){return(
[
  "o3",
  "o3-mini",
  "o4-mini",
  "o4-mini-high",
  //"gpt-5-codex",
  "gpt-5",
  "gpt-5-mini",
  "gpt-5-nano"
]
)}

function _modelConfig(OPENAI_API_KEY,$0){return(
(model) => {
  if (model.startsWith("dall-e")) {
    return {
      model: model,
      type: "image",
      api: "https://api.openai.com/v1/images/generations",
      settings: {
        n: 1,
        size: "1024x1024",
        quality: "standard"
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  } else if (
    model == "o3-mini" ||
    model == "o1-mini" ||
    model == "o1-preview"
  ) {
    return {
      type: "chat",
      image_url: false,
      api: "https://api.openai.com/v1/chat/completions",
      roles: ["user", "assistant"],
      settings: {
        model: model,
        temperature: 1,
        max_completion_tokens: $0.value.max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
        // response_format: { type: "json_object" }
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  } else if (
    model == "o1" ||
    model == "o3" ||
    model == "o4-mini" ||
    model == "o4-mini-high" ||
    model.startsWith("gpt-5")
  ) {
    return {
      api: "https://api.openai.com/v1/chat/completions",
      type: "chat",
      image_url: true,
      roles: ["user", "system", "assistant"],
      settings: {
        //functions: functions,
        //function_call: { name: "upsert_cell" },
        model: model,
        temperature: 1,
        max_completion_tokens: $0.value.max_prompt_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  } else {
    return {
      api: "https://api.openai.com/v1/chat/completions",
      type: "chat",
      roles: ["user", "system", "assistant"],
      settings: {
        //functions: functions,
        //function_call: { name: "upsert_cell" },
        model: model,
        temperature: $0.value.temperature,
        max_tokens: $0.value.max_prompt_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  }
}
)}

function _OPENAI_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    width: "100%",
    label: "OPENAI_API_KEY",
    placeholder: "paste openAI key here"
  }),
  localStorageView("OPENAI_API_KEY")
)
)}

function _settings(Inputs,view,models,localStorageView){return(
{
  prompt:
    '\nThe notebook contains:\n  - cell "form" is Object {a: "", b: ""}\nUsing the already imported view literal for configuring a ChatGPT session. Example response \n\n{\n  model: "gpt-3.5-turbo"\n  temperature: 0.7\n  max_tokens: 1000\n  top_p: 1\n  frequency_penalty: 0\n  presence_penalty: 0\n}\n\nUse Inputs.select for model, Inputs.range for max_tokens etc.',
  time: 1699384189902,
  comment:
    "Creating a form to configure a ChatGPT session. The form includes a select input for model, and range inputs for temperature, max_tokens, top_p, frequency_penalty, and presence_penalty."
} &&
  Inputs.bind(
    view`
    <div>${["model", Inputs.select(models.sort(), { label: "model" })]}</div>
    <div>${[
      "temperature",
      Inputs.range([0, 1], { step: 0.1, value: 0.7, label: "temperature" })
    ]}</div>
    <div>${[
      "max_prompt_tokens",
      Inputs.range([1, 200000], {
        value: 4000,
        label: "max_tokens sent (oldest are truncated)"
      })
    ]}</div>
    <div>${[
      "max_tokens",
      Inputs.range([1, 200000], {
        value: 1000,
        label: "max_tokens for response"
      })
    ]}</div>
    <div>${[
      "top_p",
      Inputs.range([0, 1], { step: 0.1, value: 1, label: "top_p" })
    ]}</div>
    <div>${[
      "frequency_penalty",
      Inputs.range([0, 1], { step: 0.1, value: 0, label: "frequency_penalty" })
    ]}</div>
    <div>${[
      "presence_penalty",
      Inputs.range([0, 1], { step: 0.1, value: 0, label: "presence_penalty" })
    ]}</div>
  `,
    localStorageView("NOTEBOOK_WRITER_2", {
      defaultValue: {
        model: "gpt-5-mini",
        temperature: 1,
        max_prompt_tokens: 10000,
        max_tokens: 10000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      json: true
    })
  )
)}

function _30(md){return(
md`## Roboco-op Implementation below`
)}

function _robocoopModule(thisModule){return(
thisModule()
)}

function _background_tasks(submit_summary,on_prompt,formatted_instruction)
{
  submit_summary;
  on_prompt;
  formatted_instruction;
}


function _user_variable_filters(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.input({}),
  localStorageView(
    `${new URL(document.baseURI).pathname}|user_variable_filters`,
    {
      defaultValue: {},
      json: true
    }
  )
)
)}

function _formatted_instruction(response,$0,Event)
{
  let formatted_instruction = undefined;
  if (response.action == "upsert_cells") {
    formatted_instruction = response.cells.map((r) => r.code).join("\n\n");
  } else {
    formatted_instruction = response.content;
  }
  $0.value = formatted_instruction;
  $0.dispatchEvent(new Event("input"));
  return formatted_instruction;
}


function _response(on_prompt){return(
on_prompt
)}

async function _on_prompt($0,system_prompt,buildContext,includeModules,includeNotebookScreenshot,prompt,$1,$2,runAsk,settings,$3)
{
  const payload = [
    {
      role: $0.value.model.startsWith("o1") ? "user" : "system",
      content: system_prompt
    },
    ...(await buildContext({
      includeModules,
      notebookImage: includeNotebookScreenshot
    })),
    {
      role: "user",
      content: prompt
    }
  ];
  $1.value = payload;
  $2.value = "";
  console.log("on_prompt", payload);
  return runAsk({
    settings: {
      ...settings,
      websearch: $3.value
    },
    messages: payload
  });
}


function _37(md){return(
md`#### \`buildContext\` context Construction`
)}

function _default_runtime(runtime){return(
runtime
)}

function _buildContext(default_runtime,moduleMap,cellMap,module_summary,modern_screenshot){return(
async function buildContext({
  includeModules = false,
  notebookImage = false,
  runtime = default_runtime
} = {}) {
  const modules = await moduleMap(runtime);
  const cells = await Promise.all(
    [...modules.entries()].map(async ([m, mInfo]) => ({
      ...mInfo,
      cells: await cellMap(m)
    }))
  );
  let summary = undefined;
  if (includeModules) {
    summary = (await Promise.all(cells.map(module_summary))).join("\n");
  } else {
    // main only
    summary = await module_summary(cells[0]);
  }
  return [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: summary
        },
        ...(notebookImage
          ? [
              {
                type: "image_url",
                image_url: {
                  url: await modern_screenshot.domToDataUrl(document.body, {
                    scale: 0.1
                  })
                }
              }
            ]
          : [])
      ]
    }
  ];
}
)}

function _test_getContext(buildContext)
{
  return buildContext({ notebookImage: true });
}


function _module_summary(decompile,summarizeJS){return(
async (mInfo) => {
  return `
module: ${mInfo.name}

${(
  await Promise.all(
    [...mInfo.cells.entries()].map(
      async ([name, vars]) => `<cell>
<inputs>${vars[0]._inputs.map((i) => i._name).join(", ")}</inputs>
<code><![CDATA[
${await decompile(vars).catch((err) => {
  console.error("Unable to decompile", vars);
})}
]]></code>
<value>${summarizeJS(vars[0]._value, { max_size: 200 })}</value>
</cell>
`
    )
  )
).join("\n")}
`;
}
)}

function _42(md){return(
md`---`
)}

function _43(md){return(
md`## LLM API Call`
)}

function _runAsk(convert,responses,process){return(
async ({ settings, messages }) => {
  messages = messages.map((m) => convert(m));
  const [system_prompt, ...prompt] = messages;

  const response = await responses({
    model: settings.model,
    reasoning: {
      effort: "medium",
      summary: "detailed"
    },
    instructions: system_prompt.content,
    input: prompt,
    tools: settings.websearch ? [{ type: "web_search_preview" }] : []
  });

  const message = response.output.at(-1).content.at(-1).text;
  const instuctions = {
    cells: process(message),
    response: response.output,
    prompt: system_prompt,
    action: "upsert_cells",
    time: Date.now()
  };
  return instuctions;
}
)}

async function _test_runAsk(runAsk,$0,$1){return(
(
  await runAsk({
    settings: $0.value,
    messages: [
      {
        role: "system",
        content: $1.value
      },
      {
        role: "user",
        content: "say hello"
      }
    ]
  })
).cells
)}

function _domParser(DOMParser){return(
new DOMParser()
)}

function _process(domParser){return(
function process(content) {
  const doc = domParser.parseFromString(
    "<response>" + content + "</response>",
    "text/xml"
  );
  const cells = [...doc.querySelectorAll("cell")];
  return cells.map((cell) => {
    const inputsContent = cell.querySelector("inputs")?.textContent || "";
    return {
      inputs:
        inputsContent.length > 0
          ? inputsContent.split(",").map((s) => s.trim())
          : [],
      code: (cell.querySelector("code")?.textContent || "").trim()
    };
  });
}
)}

function _convert(convertContent){return(
(message) => {
  return {
    ...message,
    content: convertContent(message.content)
  };
}
)}

function _convertContent(convertContentElement){return(
(content) => {
  if (typeof content == "string") return content;
  if (Array.isArray(content)) return content.map(convertContentElement);
  throw "unrecognized content element";
}
)}

function _convertContentElement(){return(
(element) => {
  if (element.type == "text")
    return {
      type: "input_text",
      text: element.text
    };
  else if (element.type == "image_url") {
    return {
      type: "input_image",
      image_url: element.image_url.url
    };
  } else return element;
}
)}

function _51(md){return(
md`---`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("robocoop")).define("robocoop", ["keepalive","robocoopModule","tabbedPane","html","reversibleAttach","ui_attached","viewof prompt","viewof includeModules","viewof includeNotebookScreenshot","viewof websearch","viewof copy_code","viewof suggestion","viewof context_viz","viewof OPENAI_API_KEY","viewof settings","viewof system_prompt"], _robocoop);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("pong_game")).define("pong_game", ["html","ResizeObserver"], _pong_game);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof ui_attached")).define("viewof ui_attached", ["Inputs"], _ui_attached);
  main.variable(observer("ui_attached")).define("ui_attached", ["Generators", "viewof ui_attached"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("tabbedPane", child1);
  main.variable(observer("viewof prompt")).define("viewof prompt", ["whisperInput","OPENAI_API_KEY","view","cautious","Inputs","invalidation"], _prompt);
  main.variable(observer("prompt")).define("prompt", ["Generators", "viewof prompt"], (G, _) => G.input(_));
  main.variable(observer("viewof includeModules")).define("viewof includeModules", ["Inputs"], _includeModules);
  main.variable(observer("includeModules")).define("includeModules", ["Generators", "viewof includeModules"], (G, _) => G.input(_));
  main.variable(observer("viewof includeNotebookScreenshot")).define("viewof includeNotebookScreenshot", ["Inputs"], _includeNotebookScreenshot);
  main.variable(observer("includeNotebookScreenshot")).define("includeNotebookScreenshot", ["Generators", "viewof includeNotebookScreenshot"], (G, _) => G.input(_));
  main.variable(observer("viewof websearch")).define("viewof websearch", ["Inputs"], _websearch);
  main.variable(observer("websearch")).define("websearch", ["Generators", "viewof websearch"], (G, _) => G.input(_));
  main.variable(observer("viewof copy_code")).define("viewof copy_code", ["Inputs","cellsToClipboard","suggestion"], _copy_code);
  main.variable(observer("copy_code")).define("copy_code", ["Generators", "viewof copy_code"], (G, _) => G.input(_));
  main.variable(observer("viewof suggestion")).define("viewof suggestion", ["Inputs"], _suggestion);
  main.variable(observer("suggestion")).define("suggestion", ["Generators", "viewof suggestion"], (G, _) => G.input(_));
  main.define("initial context", _context);
  main.variable(observer("mutable context")).define("mutable context", ["Mutable", "initial context"], (M, _) => new M(_));
  main.variable(observer("context")).define("context", ["mutable context"], _ => _.generator);
  main.variable(observer("viewof context_viz")).define("viewof context_viz", ["Inputs","context"], _context_viz);
  main.variable(observer("context_viz")).define("context_viz", ["Generators", "viewof context_viz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof system_prompt")).define("viewof system_prompt", ["Inputs"], _system_prompt);
  main.variable(observer("system_prompt")).define("system_prompt", ["Generators", "viewof system_prompt"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("reversibleAttach", child2);
  main.variable(observer("models")).define("models", _models);
  main.variable(observer("modelConfig")).define("modelConfig", ["OPENAI_API_KEY","viewof settings"], _modelConfig);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof settings")).define("viewof settings", ["Inputs","view","models","localStorageView"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof robocoopModule")).define("viewof robocoopModule", ["thisModule"], _robocoopModule);
  main.variable(observer("robocoopModule")).define("robocoopModule", ["Generators", "viewof robocoopModule"], (G, _) => G.input(_));
  main.variable(observer("background_tasks")).define("background_tasks", ["submit_summary","on_prompt","formatted_instruction"], _background_tasks);
  main.variable(observer("viewof user_variable_filters")).define("viewof user_variable_filters", ["Inputs","localStorageView"], _user_variable_filters);
  main.variable(observer("user_variable_filters")).define("user_variable_filters", ["Generators", "viewof user_variable_filters"], (G, _) => G.input(_));
  main.variable(observer("formatted_instruction")).define("formatted_instruction", ["response","viewof suggestion","Event"], _formatted_instruction);
  main.variable(observer("response")).define("response", ["on_prompt"], _response);
  main.variable(observer("on_prompt")).define("on_prompt", ["viewof settings","system_prompt","buildContext","includeModules","includeNotebookScreenshot","prompt","mutable context","viewof suggestion","runAsk","settings","viewof websearch"], _on_prompt);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("default_runtime")).define("default_runtime", ["runtime"], _default_runtime);
  main.variable(observer("buildContext")).define("buildContext", ["default_runtime","moduleMap","cellMap","module_summary","modern_screenshot"], _buildContext);
  main.variable(observer("test_getContext")).define("test_getContext", ["buildContext"], _test_getContext);
  main.variable(observer("module_summary")).define("module_summary", ["decompile","summarizeJS"], _module_summary);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("runAsk")).define("runAsk", ["convert","responses","process"], _runAsk);
  main.variable(observer("test_runAsk")).define("test_runAsk", ["runAsk","viewof settings","viewof system_prompt"], _test_runAsk);
  main.variable(observer("domParser")).define("domParser", ["DOMParser"], _domParser);
  main.variable(observer("process")).define("process", ["domParser"], _process);
  main.variable(observer("convert")).define("convert", ["convertContent"], _convert);
  main.variable(observer("convertContent")).define("convertContent", ["convertContentElement"], _convertContent);
  main.variable(observer("convertContentElement")).define("convertContentElement", _convertContentElement);
  main.variable(observer()).define(["md"], _51);
  const child3 = runtime.module(define3);
  main.import("responses", child3);
  const child4 = runtime.module(define4);
  main.import("runtime", child4);
  main.import("variables", child4);
  main.import("descendants", child4);
  main.import("thisModule", child4);
  main.import("keepalive", child4);
  main.import("main", child4);
  const child5 = runtime.module(define5);
  main.import("decompile", child5);
  main.import("compile", child5);
  main.import("cellMap", child5);
  main.import("parser", child5);
  const child6 = runtime.module(define6);
  main.import("cellsToClipboard", child6);
  const child7 = runtime.module(define7);
  main.import("localStorageView", child7);
  const child8 = runtime.module(define8);
  main.import("flowQueue", child8);
  const child9 = runtime.module(define9);
  main.import("inspect", child9);
  const child10 = runtime.module(define10);
  main.import("view", child10);
  main.import("cautious", child10);
  const child11 = runtime.module(define11);
  main.import("whisperInput", child11);
  const child12 = runtime.module(define12);
  main.import("moduleMap", child12);
  main.import("submit_summary", child12);
  const child13 = runtime.module(define13);
  main.import("summarizeJS", child13);
  const child14 = runtime.module(define14);
  main.import("modern_screenshot", child14);
  return main;
}
