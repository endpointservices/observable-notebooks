// https://observablehq.com/@tomlarkworthy/ink@932
import define1 from "./1d309dbd9697e042@613.js";
import define2 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Ink in water`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Using [@jashkenas](https://observablehq.com/@jashkenas/webgl-fluid-simulation)'s port of [Pavel Dobryakov’s](https://github.com/PavelDoGreat) [WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation/blob/master/script.js) [(MIT License)](https://opensource.org/licenses/MIT) as a base, an **ink** model. 

Our long term destination is *Suminagashi*, but we need multi-fluid simulation to model the surfactant.

The main changes from [@jashkenas](https://observablehq.com/@jashkenas/webgl-fluid-simulation)
- we add pressure with the splat function to make the ink shoot outward
- continuous mouse controls
- inverted the color mixing model to be subtractive (which is more like ink).
- the ink color rotates each click

Checkout [Gentle Introduction to Realtime Fluid Simulation for Programmers and Technical Artists]( https://link.medium.com/UsUv498X9jb) for building intuition over the code

## Instructions

*Click inside the rectangle below*`
)});
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","ink","mutable mouse"], function(DOM,width,height,ink,$0)
{
  const canvas = DOM.canvas(
    width * devicePixelRatio,
    height * devicePixelRatio
  );
  canvas.style.border = "solid";
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style["touch-action"] = "none";

  canvas.addEventListener("pointerdown", (evt) => {
    ink.unshift(ink.pop()); // Rotate colors every click
    $0.value = evt;
  });
  canvas.addEventListener(
    "pointermove",
    (evt) => ($0.value = $0.value && evt) // Track mouse position when currently pressed
  );
  canvas.addEventListener("pointerup", (evt) => ($0.value = undefined)); // Release mouse
  return canvas;
}
);
  main.variable(observer("viewof height")).define("viewof height", ["Inputs"], function(Inputs){return(
Inputs.range([100, 1000], { value: 570, label: "height" })
)});
  main.variable(observer("height")).define("height", ["Generators", "viewof height"], (G, _) => G.input(_));
  main.variable(observer("viewof dt")).define("viewof dt", ["Inputs"], function(Inputs){return(
Inputs.range([0, 0.035], {
  value: 0.016,
  step: 0.001,
  label: "time step per frame"
})
)});
  main.variable(observer("dt")).define("dt", ["Generators", "viewof dt"], (G, _) => G.input(_));
  main.variable(observer("viewof downsample")).define("viewof downsample", ["Inputs"], function(Inputs){return(
Inputs.range([0.1, 5], {
  value: 1.5,
  step: 0.01,
  label: "Lower resolution"
})
)});
  main.variable(observer("downsample")).define("downsample", ["Generators", "viewof downsample"], (G, _) => G.input(_));
  main.variable(observer("viewof densityDissipation")).define("viewof densityDissipation", ["Inputs"], function(Inputs){return(
Inputs.range([0.8, 1.1], {
  value: 0.99,
  step: 0.001,
  label: "Ink dissipation"
})
)});
  main.variable(observer("densityDissipation")).define("densityDissipation", ["Generators", "viewof densityDissipation"], (G, _) => G.input(_));
  main.variable(observer("viewof velocityDissipation")).define("viewof velocityDissipation", ["Inputs"], function(Inputs){return(
Inputs.range([0.95, 1.05], {
  value: 0.99,
  step: 0.001,
  label: "velocity dissipation"
})
)});
  main.variable(observer("velocityDissipation")).define("velocityDissipation", ["Generators", "viewof velocityDissipation"], (G, _) => G.input(_));
  main.variable(observer("viewof curlDegree")).define("viewof curlDegree", ["Inputs"], function(Inputs){return(
Inputs.range([0, 50], {
  value: 17,
  step: 0.1,
  label: "curl"
})
)});
  main.variable(observer("curlDegree")).define("curlDegree", ["Generators", "viewof curlDegree"], (G, _) => G.input(_));
  main.define("initial ink", function(){return(
[255, 0, 0]
)});
  main.variable(observer("mutable ink")).define("mutable ink", ["Mutable", "initial ink"], (M, _) => new M(_));
  main.variable(observer("ink")).define("ink", ["mutable ink"], _ => _.generator);
  main.define("initial mouse", function(){return(
undefined
)});
  main.variable(observer("mutable mouse")).define("mutable mouse", ["Mutable", "initial mouse"], (M, _) => new M(_));
  main.variable(observer("mouse")).define("mouse", ["mutable mouse"], _ => _.generator);
  main.variable(observer("mouseSplat")).define("mouseSplat", ["ink","splat"], function(ink,splat){return(
function mouseSplat(evt) {
  const color = [ink[0], ink[1], ink[2]];
  const dx = 0;
  const dy = 0;
  const p = 5000;
  splat(
    evt.offsetX * window.devicePixelRatio,
    evt.offsetY * window.devicePixelRatio,
    dx,
    dy,
    color,
    p
  );
}
)});
  main.variable(observer("ctx")).define("ctx", ["canvas","supportRenderTextureFormat"], function(canvas,supportRenderTextureFormat)
{
  const params = {alpha: false, depth: false, stencil: false, antialias: false};

  let gl = canvas.getContext('webgl2', params);
  const isWebGL2 = !!gl;
  if (!isWebGL2) {
    gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
  }

  let halfFloat;
  let supportLinearFloat;
  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFloat = gl.getExtension('OES_texture_float_linear');
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float');
    supportLinearFloat = gl.getExtension('OES_texture_half_float_linear');
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
  const internalFormat   = isWebGL2 ? gl.RGBA16F : gl.RGBA;
  let internalFormatRG   = isWebGL2 ? gl.RG16F : gl.RGBA;
  let formatRG           = isWebGL2 ? gl.RG : gl.RGBA;

  if (isWebGL2) {
    if (!supportRenderTextureFormat(gl, internalFormatRG, formatRG, halfFloatTexType)) {
      internalFormatRG = gl.RGBA16F;
      formatRG = gl.RGBA;
    }
  }

  return {
    gl,
    ext: {internalFormat, internalFormatRG, formatRG, halfFloatTexType, supportLinearFloat}
  };
}
);
  main.variable(observer("gl")).define("gl", ["ctx"], function(ctx){return(
ctx.gl
)});
  main.variable(observer("ext")).define("ext", ["ctx"], function(ctx){return(
ctx.ext
)});
  main.variable(observer("supportRenderTextureFormat")).define("supportRenderTextureFormat", function(){return(
function supportRenderTextureFormat (gl, internalFormat, format, type) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status == gl.FRAMEBUFFER_COMPLETE;
}
)});
  main.variable(observer("GLProgram")).define("GLProgram", ["gl"], function(gl){return(
class GLProgram {
  constructor (vertexShader, fragmentShader) {
    this.uniforms = {};
    this.program = gl.createProgram();

    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const uniformName = gl.getActiveUniform(this.program, i).name;
      this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
    }
  }

  bind () {
    gl.useProgram(this.program);
  }
}
)});
  main.variable(observer("compileShader")).define("compileShader", ["gl"], function(gl){return(
function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}
)});
  main.variable(observer("baseVertexShader")).define("baseVertexShader", ["compileShader","gl"], function(compileShader,gl){return(
compileShader(gl.VERTEX_SHADER, `
  precision highp float;
  precision mediump sampler2D;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`)
)});
  main.variable(observer("createFBO")).define("createFBO", ["gl"], function(gl){return(
function createFBO(texId, w, h, internalFormat, format, type, param) {
  gl.activeTexture(gl.TEXTURE0 + texId);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return [texture, fbo, texId];
}
)});
  main.variable(observer("createDoubleFBO")).define("createDoubleFBO", ["createFBO"], function(createFBO){return(
function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

  return {
    get first () {
      return fbo1;
    },
    get second () {
      return fbo2;
    },
    swap () {
      let temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    }
  }
}
)});
  main.variable(observer("textureWidth")).define("textureWidth", ["gl","downsample"], function(gl,downsample){return(
gl.drawingBufferWidth >> downsample
)});
  main.variable(observer("textureHeight")).define("textureHeight", ["gl","downsample"], function(gl,downsample){return(
gl.drawingBufferHeight >> downsample
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Density holds color information`
)});
  main.variable(observer("density")).define("density", ["createDoubleFBO","textureWidth","textureHeight","ext","gl"], function(createDoubleFBO,textureWidth,textureHeight,ext,gl){return(
createDoubleFBO(0, textureWidth, textureHeight, ext.internalFormat, gl.RGBA, ext.halfFloatTexType, ext.supportLinearFloat ? gl.LINEAR : gl.NEAREST)
)});
  main.variable(observer("velocity")).define("velocity", ["createDoubleFBO","textureWidth","textureHeight","ext","gl"], function(createDoubleFBO,textureWidth,textureHeight,ext,gl){return(
createDoubleFBO(2, textureWidth, textureHeight, ext.internalFormatRG, ext.formatRG, ext.halfFloatTexType, ext.supportLinearFloat ? gl.LINEAR : gl.NEAREST)
)});
  main.variable(observer("divergence")).define("divergence", ["createFBO","textureWidth","textureHeight","ext","gl"], function(createFBO,textureWidth,textureHeight,ext,gl){return(
createFBO(4, textureWidth, textureHeight, ext.internalFormatRG, ext.formatRG, ext.halfFloatTexType, gl.NEAREST)
)});
  main.variable(observer("curl")).define("curl", ["createFBO","textureWidth","textureHeight","ext","gl"], function(createFBO,textureWidth,textureHeight,ext,gl){return(
createFBO(5, textureWidth, textureHeight, ext.internalFormatRG, ext.formatRG, ext.halfFloatTexType, gl.NEAREST)
)});
  main.variable(observer("pressure")).define("pressure", ["createDoubleFBO","textureWidth","textureHeight","ext","gl"], function(createDoubleFBO,textureWidth,textureHeight,ext,gl){return(
createDoubleFBO(6, textureWidth, textureHeight, ext.internalFormatRG, ext.formatRG, ext.halfFloatTexType, gl.NEAREST)
)});
  main.variable(observer("blit")).define("blit", ["gl"], function(gl)
{
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  return (destination) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }
}
);
  main.variable(observer("clearProgram")).define("clearProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`
  )
)
)});
  main.variable(observer("splatProgram")).define("splatProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1);
  }
`
  )
)
)});
  main.variable(observer("advectionProgram")).define("advectionProgram", ["GLProgram","baseVertexShader","ext","compileShader","gl"], function(GLProgram,baseVertexShader,ext,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  ext.supportLinearFloat
    ? compileShader(
        gl.FRAGMENT_SHADER,
        `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = dissipation * texture2D(uSource, coord);
  }
`
      )
    : compileShader(
        gl.FRAGMENT_SHADER,
        `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  vec4 bilerp (in sampler2D sam, in vec2 p) {
    vec4 st;
    st.xy = floor(p - 0.5) + 0.5;
    st.zw = st.xy + 1.0;
    vec4 uv = st * texelSize.xyxy;
    vec4 a = texture2D(sam, uv.xy);
    vec4 b = texture2D(sam, uv.zy);
    vec4 c = texture2D(sam, uv.xw);
    vec4 d = texture2D(sam, uv.zw);
    vec2 f = p - st.xy;
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  void main () {
    vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
    gl_FragColor = dissipation * bilerp(uSource, coord);
    gl_FragColor.a = 1.0;
  }
`
      )
)
)});
  main.variable(observer("divergenceProgram")).define("divergenceProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  vec2 sampleVelocity (in vec2 uv) {
    vec2 multiplier = vec2(1.0, 1.0);
    if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
    if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
    if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
    if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
    return multiplier * texture2D(uVelocity, uv).xy;
  }
  void main () {
    float L = sampleVelocity(vL).x;
    float R = sampleVelocity(vR).x;
    float T = sampleVelocity(vT).y;
    float B = sampleVelocity(vB).y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`
  )
)
)});
  main.variable(observer("curlProgram")).define("curlProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
  }
`
  )
)
)});
  main.variable(observer("vorticityProgram")).define("vorticityProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).y;
    float R = texture2D(uCurl, vR).y;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
    force *= 1.0 / length(force + 0.00001) * curl * C;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
  }
`
  )
)
)});
  main.variable(observer("pressureProgram")).define("pressureProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  vec2 boundary (in vec2 uv) {
    uv = min(max(uv, 0.0), 1.0);
    return uv;
  }
  void main () {
    float L = texture2D(uPressure, boundary(vL)).x;
    float R = texture2D(uPressure, boundary(vR)).x;
    float T = texture2D(uPressure, boundary(vT)).x;
    float B = texture2D(uPressure, boundary(vB)).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`
  )
)
)});
  main.variable(observer("gradienSubtractProgram")).define("gradienSubtractProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  vec2 boundary (in vec2 uv) {
    uv = min(max(uv, 0.0), 1.0);
    return uv;
  }
  void main () {
    float L = texture2D(uPressure, boundary(vL)).x;
    float R = texture2D(uPressure, boundary(vR)).x;
    float T = texture2D(uPressure, boundary(vT)).x;
    float B = texture2D(uPressure, boundary(vB)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`
  )
)
)});
  main.variable(observer("displayProgram")).define("displayProgram", ["GLProgram","baseVertexShader","compileShader","gl"], function(GLProgram,baseVertexShader,compileShader,gl){return(
new GLProgram(
  baseVertexShader,
  compileShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = vec4(1.0 - textureColor.r, 1.0 - textureColor.g,1.0 - textureColor.b,1.0);
  }
`
  )
)
)});
  main.variable(observer("splat")).define("splat", ["splatProgram","gl","velocity","canvas","blit","density","pressure"], function(splatProgram,gl,velocity,canvas,blit,density,pressure){return(
function splat(x, y, dx, dy, color, p) {
  splatProgram.bind();
  gl.uniform1i(splatProgram.uniforms.uTarget, velocity.first[2]);
  gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
  gl.uniform2f(
    splatProgram.uniforms.point,
    x / canvas.width,
    1.0 - y / canvas.height
  );
  gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
  gl.uniform1f(splatProgram.uniforms.radius, 0.0001);
  blit(velocity.second[1]);
  velocity.swap();

  gl.uniform1i(splatProgram.uniforms.uTarget, density.first[2]);
  gl.uniform3f(
    splatProgram.uniforms.color,
    0.3 * (256 - color[0]),
    0.3 * (256 - color[1]),
    0.3 * (256 - color[2])
  );
  blit(density.second[1]);
  density.swap();

  gl.uniform1i(splatProgram.uniforms.uTarget, pressure.first[2]);
  gl.uniform3f(splatProgram.uniforms.color, p, p, p);
  blit(pressure.second[1]);
  pressure.swap();
}
)});
  main.variable(observer("mainLoop")).define("mainLoop", ["gl","textureWidth","textureHeight","mutable mouse","mouseSplat","advectionProgram","velocity","dt","velocityDissipation","blit","density","densityDissipation","curlProgram","curl","vorticityProgram","curlDegree","divergenceProgram","divergence","clearProgram","pressure","pressureProgram","gradienSubtractProgram","displayProgram"], function*(gl,textureWidth,textureHeight,$0,mouseSplat,advectionProgram,velocity,dt,velocityDissipation,blit,density,densityDissipation,curlProgram,curl,vorticityProgram,curlDegree,divergenceProgram,divergence,clearProgram,pressure,pressureProgram,gradienSubtractProgram,displayProgram)
{
  let i = 0;
  while (true) {
    gl.viewport(0, 0, textureWidth, textureHeight);

    if ($0.value) mouseSplat($0.value);

    advectionProgram.bind();
    gl.uniform2f(
      advectionProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocity.first[2]);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, velocityDissipation);
    blit(velocity.second[1]);
    velocity.swap();

    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
    gl.uniform1i(advectionProgram.uniforms.uSource, density.first[2]);
    gl.uniform1f(advectionProgram.uniforms.dissipation, densityDissipation);
    blit(density.second[1]);
    density.swap();

    curlProgram.bind();
    gl.uniform2f(
      curlProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.first[2]);
    blit(curl[1]);

    vorticityProgram.bind();
    gl.uniform2f(
      vorticityProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.first[2]);
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
    gl.uniform1f(vorticityProgram.uniforms.curl, curlDegree);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.second[1]);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(
      divergenceProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.first[2]);
    blit(divergence[1]);

    clearProgram.bind();

    let pressureTexId = pressure.first[2];
    gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    gl.bindTexture(gl.TEXTURE_2D, pressure.first[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
    gl.uniform1f(clearProgram.uniforms.value, 0.8);
    blit(pressure.second[1]);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(
      pressureProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
    pressureTexId = pressure.first[2];
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
    gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    for (let i = 0; i < 25; i++) {
      gl.bindTexture(gl.TEXTURE_2D, pressure.first[0]);
      blit(pressure.second[1]);
      pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(
      gradienSubtractProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.first[2]);
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.first[2]);
    blit(velocity.second[1]);
    velocity.swap();

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    displayProgram.bind();
    gl.uniform1i(displayProgram.uniforms.uTexture, density.first[2]);
    blit(null);

    yield ++i;
  }
}
);
  const child1 = runtime.module(define1);
  main.import("enableGithubBackups", child1);
  main.variable(observer()).define(["enableGithubBackups"], function(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices", // Github username/organization
  repo: "observable-notebooks" // Github repo
})
)});
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
