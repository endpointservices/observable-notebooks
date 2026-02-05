import define1 from "./03dda470c56b93ff@8395.js";

function _1(md){return(
md`# Retro Title Graphic`
)}

function _gfx(svg,fov,width,horizonOffset,square,hackableY,topText,realtimeY,middleText){return(
svg`<svg viewBox="${-fov} ${-fov} ${2 * fov} ${2 * fov}"
width="${Math.min(width, 640)}px" height="${
  (Math.min(width, 640) * 630) / 1200
}px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>

    <linearGradient id="sky" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#120017" />
      <stop offset="50%" stop-color="#26117D" />
      <stop offset="80%" stop-color="#D800AF" />
      <stop offset="90%" stop-color="#FF9FB7" />
      <stop offset="100%" stop-color="#6149ED" />
    </linearGradient>

    <linearGradient id="rainbowFill" gradientTransform="rotate(90)">
      <stop offset="20%" stop-color="#ADA6FF" />
      <stop offset="45%" stop-color="#404CFF" />
      <stop offset="55%" stop-color="#3EFF94" />
      <stop offset="65%" stop-color="#FF8F00" />
      <stop offset="90%" stop-color="#FFA5A5" />
      <stop offset="100%" stop-color="#FFCE29" />
    </linearGradient>

    
    <radialGradient id="groundFill" cy="0%" r="1">
      <stop offset="0%" stop-color="#6149ED"/>
      <stop offset="100%" stop-color="#120017" />
    </radialGradient>


    <linearGradient id="surfaceFill" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="yellow"  stop-opacity="0"/>
      <stop offset="13%" stop-color="yellow"  stop-opacity="0"/>
      <stop offset="16%" stop-color="yellow" />
      <stop offset="100%" stop-color="orange" />
    </linearGradient>


    <linearGradient id="chromeFill" gradientTransform="rotate(90)">
      <stop offset="15%" stop-color="#4E4A5F" />
      <stop offset="20%" stop-color="#C7C1EC" />
      <stop offset="30%" stop-color="#C3C5DE" />
      <stop offset="45%" stop-color="#DFD9DF" />
      <stop offset="60%" stop-color="#837199" />
      <stop offset="65%" stop-color="#271B5C" />
      <stop offset="75%" stop-color="#D7DEF0" />
    </linearGradient>
    
    <rect id="ground" x="-1" y="0" width= "2" height="${
      1 * fov
    }" fill="url(#groundFill)"/>

    <rect id="surface" x="-1" y="0" width= "2" height="${
      1 * fov
    }" fill="url(#surfaceFill)"/>

      

  </defs>
  
  <rect x="-1" y="${-1 * fov}" width= "2" height="${
  1 * fov + horizonOffset
}" fill="url(#sky)" />

  
  <rect id="ground" x="-1" y="${horizonOffset}" width= "2" height="${
  1 * fov - horizonOffset
}" fill="url(#groundFill)" />

  
    <clipPath id="cells">
      ${Array.from({ length: 4 * 15 }).map((_, xy) =>
        square([(xy % 4) - 2, Math.floor(xy / 4), 1], "url(#ground)")
      )}
    </clipPath>

  <use clip-path="url(#cells)" href="#surface" />

  <text y=${hackableY} stroke="url(#chromeFill)" stroke-width="0.005" fill="url(#chromeFill)"
    text-anchor = "middle"
    style="font: italic bold 0.15px sans-serif; font-family: helvetica; letter-spacing: 0px;">
    ${topText}
  </text>


  <text y=${realtimeY}
    fill="url(#rainbowFill)"
    stroke="url(#rainbowFill)"
    stroke-width="0.005"
    text-anchor = "middle"
    style="font-weight: bold; font-size:  0.15px; font-family: arial; letter-spacing: 0px;">
    ${middleText}
  </text>



</svg>`
)}

function _podiverse(){return(
import("https://www.pondiverse.com/pondiverse.js")
)}

function _4(podiverse,img)
{
  return podiverse.addPondiverseButton(() => ({
    type: "lopecode",
    data: "https://tomlarkworthy.github.io/lopebooks/notebooks/%40tomlarkworthy_podiverse.html",
    image: img
  }));
}


function _img(svgToDataURL,gfx){return(
svgToDataURL(gfx)
)}

function _svgToDataURL(XMLSerializer){return(
function svgToDataURL(svgEl, base64 = false) {
  const serializer = new XMLSerializer();
  let svgStr = serializer.serializeToString(svgEl);
  if (base64) {
    const b64 = btoa(unescape(encodeURIComponent(svgStr)));
    return `data:image/svg+xml;base64,${b64}`;
  } else {
    const uri = encodeURIComponent(svgStr)
      // undo encoding for common characters to shrink URL
      .replace(/%20/g, " ")
      .replace(/%3D/g, "=")
      .replace(/%3A/g, ":")
      .replace(/%2F/g, "/");
    return `data:image/svg+xml;charset=utf-8,${uri}`;
  }
}
)}

function _topText(Inputs){return(
Inputs.text({ label: "Silver text", value: "Podiverse" })
)}

function _middleText(Inputs){return(
Inputs.text({
  label: "Rainbow text",
  value: "!⚠!"
})
)}

function _fov(Inputs){return(
Inputs.range([0, 2], { value: 0.5, label: "FOV" })
)}

function _corner_radius(Inputs){return(
Inputs.range([0, 1], {
  value: 0.3,
  label: "corner_radius"
})
)}

function _padding(Inputs){return(
Inputs.range([0, 1], {
  value: 0.02,
  label: "padding"
})
)}

function _horizonOffset(Inputs){return(
Inputs.range([-1, 1], {
  value: 0.125,
  label: "horizon offset"
})
)}

function _hackableY(Inputs){return(
Inputs.range([-1, 1], {
  value: -0.23,
  label: "hackableY"
})
)}

function _realtimeY(Inputs){return(
Inputs.range([-1, 1], {
  value: 0.0065283621064848,
  label: "realtimeY"
})
)}

function _speed(Inputs){return(
Inputs.range([0, 10], {
  value: 0.3,
  label: "speed"
})
)}

function _project(){return(
(d) =>
  d.map((d) => [
    d[0] / (d[1] + 1), // screen x
    d[2] / (d[1] + 1) // screen y
  ])
)}

function _square(corner_radius,project,padding,speed){return(
([dx, dy, dz], color) => {
  const id = `s(${dx},${dy},${dz})`;
  const rounding = corner_radius;

  const p = project([
    [dx + rounding + padding, dy + padding, dz],
    [dx + 1 - rounding - padding, dy + padding, dz],
    [dx + 1 - padding, dy + padding, dz],
    [dx + 1 - padding, dy + rounding + padding, dz],
    [dx + 1 - padding, dy + 1 - rounding - padding, dz],
    [dx + 1 - padding, dy + 1 - padding, dz],
    [dx + 1 - rounding - padding, dy + 1 - padding, dz],
    [dx + rounding + padding, dy + 1 - padding, dz],
    [dx + padding, dy + 1 - padding, dz],
    [dx + padding, dy + 1 - rounding - padding, dz],
    [dx + padding, dy + rounding + padding, dz],
    [dx + padding, dy + padding, dz],

    [dx + rounding + padding, dy + 1 + padding, dz],
    [dx + 1 - rounding - padding, dy + 1 + padding, dz],
    [dx + 1 - padding, dy + 1 + padding, dz],
    [dx + 1 - padding, dy + 1 + rounding + padding, dz],
    [dx + 1 - padding, dy + 1 + 1 - rounding - padding, dz],
    [dx + 1 - padding, dy + 1 + 1 - padding, dz],
    [dx + 1 - rounding - padding, dy + 1 + 1 - padding, dz],
    [dx + rounding + padding, dy + 1 + 1 - padding, dz],
    [dx + padding, dy + 1 + 1 - padding, dz],
    [dx + padding, dy + 1 + 1 - rounding - padding, dz],
    [dx + padding, dy + 1 + rounding + padding, dz],
    [dx + padding, dy + 1 + padding, dz]
  ]);
  const coord = (index) => `${p[index][0]} ${p[index][1]}`;

  const d0 = `M ${coord(0)}
L ${coord(1)} 
C ${coord(2)}, ${coord(2)}, ${coord(3)}
L ${coord(4)}
C ${coord(5)},${coord(5)},${coord(6)}
L ${coord(7)} 
C ${coord(8)},${coord(8)},${coord(9)}
L ${coord(10)} 
C ${coord(11)},${coord(11)},${coord(0)}
Z`;

  const d1 = `M ${coord(0 + 12)}
L ${coord(1 + 12)} 
C ${coord(2 + 12)}, ${coord(2 + 12)}, ${coord(3 + 12)}
L ${coord(4 + 12)}
C ${coord(5 + 12)},${coord(5 + 12)},${coord(6 + 12)}
L ${coord(7 + 12)} 
C ${coord(8 + 12)},${coord(8 + 12)},${coord(9 + 12)}
L ${coord(10 + 12)} 
C ${coord(11 + 12)},${coord(11 + 12)},${coord(0 + 12)}
Z`;

  return `<path id=${id} d="${d0}" fill="${color}">
<animate xlink:href="#${id}"
    attributeName="d"
    attributeType="XML"
    begin="0s"
    from="${d1}"
    to="${d0}"
    dur="${speed}s" repeatCount="indefinite"
/>

</path>

`;
}
)}

function _19(exporter){return(
exporter()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("gfx")).define("gfx", ["svg","fov","width","horizonOffset","square","hackableY","topText","realtimeY","middleText"], _gfx);
  main.variable(observer("podiverse")).define("podiverse", _podiverse);
  main.variable(observer()).define(["podiverse","img"], _4);
  main.variable(observer("img")).define("img", ["svgToDataURL","gfx"], _img);
  main.variable(observer("svgToDataURL")).define("svgToDataURL", ["XMLSerializer"], _svgToDataURL);
  main.variable(observer("viewof topText")).define("viewof topText", ["Inputs"], _topText);
  main.variable(observer("topText")).define("topText", ["Generators", "viewof topText"], (G, _) => G.input(_));
  main.variable(observer("viewof middleText")).define("viewof middleText", ["Inputs"], _middleText);
  main.variable(observer("middleText")).define("middleText", ["Generators", "viewof middleText"], (G, _) => G.input(_));
  main.variable(observer("viewof fov")).define("viewof fov", ["Inputs"], _fov);
  main.variable(observer("fov")).define("fov", ["Generators", "viewof fov"], (G, _) => G.input(_));
  main.variable(observer("viewof corner_radius")).define("viewof corner_radius", ["Inputs"], _corner_radius);
  main.variable(observer("corner_radius")).define("corner_radius", ["Generators", "viewof corner_radius"], (G, _) => G.input(_));
  main.variable(observer("viewof padding")).define("viewof padding", ["Inputs"], _padding);
  main.variable(observer("padding")).define("padding", ["Generators", "viewof padding"], (G, _) => G.input(_));
  main.variable(observer("viewof horizonOffset")).define("viewof horizonOffset", ["Inputs"], _horizonOffset);
  main.variable(observer("horizonOffset")).define("horizonOffset", ["Generators", "viewof horizonOffset"], (G, _) => G.input(_));
  main.variable(observer("viewof hackableY")).define("viewof hackableY", ["Inputs"], _hackableY);
  main.variable(observer("hackableY")).define("hackableY", ["Generators", "viewof hackableY"], (G, _) => G.input(_));
  main.variable(observer("viewof realtimeY")).define("viewof realtimeY", ["Inputs"], _realtimeY);
  main.variable(observer("realtimeY")).define("realtimeY", ["Generators", "viewof realtimeY"], (G, _) => G.input(_));
  main.variable(observer("viewof speed")).define("viewof speed", ["Inputs"], _speed);
  main.variable(observer("speed")).define("speed", ["Generators", "viewof speed"], (G, _) => G.input(_));
  main.variable(observer("project")).define("project", _project);
  main.variable(observer("square")).define("square", ["corner_radius","project","padding","speed"], _square);
  main.variable(observer()).define(["exporter"], _19);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  return main;
}
