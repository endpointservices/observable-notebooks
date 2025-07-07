function _1(md){return(
md`# My Lopebooks

Preconfigured URL links to [Jumpgate](https://observablehq.com/@tomlarkworthy/jumpgate) to quickly convert a notebook and push to git.`
)}

function _2(md){return(
md`## Lopecode Lopebooks`
)}

async function _panel(lopebook,md){return(
md`|notebook|target repo|jumpgate|deployed|favicon
|-|-|
${await lopebook({
  url: "https://observablehq.com/@tomlarkworthy/lopecode-tour",
  repo: "https://github.com/tomlarkworthy/lopecode",
  color: "aaaaaa",
  export_state: {
    hash: "#view=R100%28S75%28%40tomlarkworthy%2Flopecode-tour%29%2CS25%28%40tomlarkworthy%2Fmodule-selection%29%29"
  }
})}
${await lopebook({
  url: "https://observablehq.com/@tomlarkworthy/lopecode-vision",
  repo: "https://github.com/tomlarkworthy/lopecode",
  color: "0000FF",
  export_state: {
    hash: "#view=R100%28S65%28%40tomlarkworthy%2Flopecode-vision%2C%40tomlarkworthy%2Ffileattachments%29%2CS35%28%40tomlarkworthy%2Fmodule-selection%2C%40tomlarkworthy%2Ftests%29%29"
  }
})}
${await lopebook({
  url: "https://observablehq.com/@tomlarkworthy/agentic-planner-prototype",
  repo: "https://github.com/tomlarkworthy/lopebooks",
  color: "FFaaFF",
  export_state: {
    hash: "#view=R100%28S67%28%40tomlarkworthy%2Fagentic-planner-prototype%29%2CS33%28%40tomlarkworthy%2Fmodule-selection%29%29"
  }
})}
${await lopebook({
  url: "https://observablehq.com/@tomlarkworthy/reactive-reflective-testing",
  repo: "https://github.com/tomlarkworthy/lopebooks",
  color: "00FF00",
  export_state: {
    hash: "#view=R100%28S62%28%40tomlarkworthy%2Freactive-reflective-testing%29%2CC38%28S50%28%40tomlarkworthy%2Ftests%29%2CS50%28%40tomlarkworthy%2Fmodule-selection%29%29%29"
  }
})}
${await lopebook({
  url: "https://observablehq.com/@tomlarkworthy/sequencer",
  repo: "https://github.com/tomlarkworthy/lopebooks",
  color: "00aaaa",
  export_state: {
    hash: "#view=R100%28S65%28%40tomlarkworthy%2Fsequencer%2C%40tomlarkworthy%2Faudio-inputs%2C%40tomlarkworthy%2Ffileattachments%29%2CS35%28%40tomlarkworthy%2Fmodule-selection%29%29"
  },
  description: "Single file music sequencer"
})}
${await lopebook({
  color: "FF0000",
  url: "https://observablehq.com/@tomlarkworthy/my-lopebooks",
  repo: "https://github.com/tomlarkworthy/lopebooks"
})}
${await lopebook({
  color: "FFFF00",
  url: "https://observablehq.com/@tomlarkworthy/observable-notes",
  repo: "https://github.com/tomlarkworthy/lopebooks"
})}
${await lopebook({
  color: "FF00FF",
  url: "https://observablehq.com/@tomlarkworthy/cell-map",
  repo: "https://github.com/tomlarkworthy/lopebooks"
})}

`
)}

async function _4(lopebook,md){return(
md`## Community lopebooks

|notebook|target repo|jumpgate|deployed|favicon
|-|-|
${await lopebook({
  url: "https://observablehq.com/@spond/revised-sars-cov-2-analytics-page",
  repo: "https://github.com/tomlarkworthy/lopebooks",
  color: "ffaa11",
  export_state: {
    hash: "#view=R100%28S75%28%40tomlarkworthy%2Flopecode-tour%29%2CS25%28%40tomlarkworthy%2Fmodule-selection%29%29"
  }
})}
`
)}

function _lopebook(remapRedChannel,FileAttachment){return(
async ({ url, repo, export_state, color, description }) => {
  const favicon = await remapRedChannel(
    await FileAttachment("favicon.png").url(),
    color
  );
  const notebook = url.replace("https://observablehq.com/", "");
  const source = `[${notebook}](${url})`;
  const path = notebook.replaceAll("/", "_") + ".html";
  const github_slug = repo.replace("https://github.com/", "");
  const github_repo = github_slug.split("/")[1];
  const repository = `[${github_slug}](${repo})`;
  const link = `https://tomlarkworthy.github.io/${github_repo}/notebooks/${path}`;
  const link_md = `[${link.replace(
    "https://tomlarkworthy.github.io/",
    ""
  )}](${link})`;

  if (export_state) {
    export_state.options = {
      headless: true,
      head: `
<meta property="og:title" content="${notebook}" />
<meta property="og:description" content="${description || notebook}" />
<meta property="og:url" content="${link}" />
<link rel="icon" href="${favicon}">
`
    };
  }
  const deploy = `[commit](https://observablehq.com/@tomlarkworthy/jumpgate?source=${url}${
    export_state
      ? `&export_state=${encodeURIComponent(JSON.stringify(export_state))}`
      : ``
  }&git_url=${encodeURIComponent(repo)}&load_source=true&commit=true)`;
  return `|${source}|${repository}|${deploy}|${link_md}|<img src=${favicon} />`;
}
)}

function _open_links(panel){return(
[...panel.querySelectorAll("a")].map((a) =>
  a.setAttribute("target", "_blank")
)
)}

function _remapRedChannel(){return(
async function remapRedChannel(src, hexNew) {
  // Load the image
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("Failed to load image"));
    i.src = src;
  });

  // Parse hexNew into RGB components
  const [rT, gT, bT] = hexNew.match(/\w\w/g).map((x) => parseInt(x, 16));

  // Draw onto a canvas
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get pixel data
  const imgData = ctx.getImageData(0, 0, c.width, c.height);
  const d = imgData.data;

  // For each pixel, remap red channel proportionally to the new RGB
  for (let i = 0; i < d.length; i += 4) {
    const rOrig = d[i]; // original red intensity (0–255)
    if (rOrig === 0) continue; // skip pixels with no red
    const factor = rOrig / 255;
    d[i] = Math.round(rT * factor);
    d[i + 1] = Math.round(gT * factor);
    d[i + 2] = Math.round(bT * factor);
    // leave d[i+3] (alpha) unchanged
  }

  // Write back and export as data-URL
  ctx.putImageData(imgData, 0, 0);
  return c.toDataURL("image/png");
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["favicon.png", {url: new URL("./files/5fbad544c4bdf7fea1709ccbbe79e557d8421670e93d6048861690848267ba6a804390ba400d49ef591b805bb6b14305c968bf40073f03eb962e0e507252f7c7.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("panel")).define("panel", ["lopebook","md"], _panel);
  main.variable(observer()).define(["lopebook","md"], _4);
  main.variable(observer("lopebook")).define("lopebook", ["remapRedChannel","FileAttachment"], _lopebook);
  main.variable(observer("open_links")).define("open_links", ["panel"], _open_links);
  main.variable(observer("remapRedChannel")).define("remapRedChannel", _remapRedChannel);
  return main;
}
