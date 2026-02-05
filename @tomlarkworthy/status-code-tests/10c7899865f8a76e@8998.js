import define1 from "./0e0b35a92c819d94@474.js";
import define2 from "./a89ea9f0ad8c6226@1486.js";
import define3 from "./e3a019069a130d79@6817.js";
import define4 from "./f92778131fd76559@1212.js";
import define5 from "./cdc303fcc82a630f@262.js";
import define6 from "./048a17a165be198d@273.js";
import define7 from "./56b204c6d7cdb801@35.js";
import define8 from "./db42ae70222a8b08@1170.js";
import define9 from "./98f34e974bb2e4bc@958.js";
import define10 from "./db80e603859226c1@23.js";
import define11 from "./f6794ed0523241c3@1824.js";

function _1(md){return(
md`# Exporter 2: Single File Serializer
## [video explainer](https://www.youtube.com/watch?v=wx93r1pY_6Y)

`
)}

function _2(exporter,$0,Event){return(
exporter({
  output: (out) => {
    $0.value = out;
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _3(downloadAnchor,forkAnchor,md){return(
md`
Serialize literate computational notebooks with their dependancies into single ${downloadAnchor({}, "downloadable")} files. Double click to open locally. No server required, works in a \`file://\` context for simplicity.

- **File-first** representation. The [Observable Runtime](https://github.com/observablehq/runtime) and common builtins like \`Inputs\`, \`htl\`, \`highlight\`, \`_\` (lodash) and \`markdown\` are bundled for offline operation.
- **Recursive and self-sustaining**, the exporter is implemented in userspace and can be ${forkAnchor({}, "forked")} again after exporting.
- **Fast**, single file notebooks open fast!
- **Moldable**, the file format is uncompressed, readable, editable with a text editor, and diffable by Git. 
- **Runtime-as-the-source-of-truth**, format derived from the live [Obervable Runtime](https://github.com/observablehq/runtime) representation.
- **No sandboxing**, the notebook is rendered without an iframe
- **Custom bootloaders**, for control over the standard library
- **Userspace**, implementation is a normal notebook.`
)}

function _4(forkAnchor,downloadAnchor,md){return(
md`## Usage Guide

To put the exporter in one of your notebooks, first import the UI builder. 
\`\`\`js
import {exporter, forkAnchor, exportAnchor } from '@tomlarkworthy/exporter'
\`\`\`

Then call the builder to make the UI. You don't need to pass any options, but the options is where you can customise the output format.
\`\`\`js
exporter({
  handler: (action, state) => {}, // Optional UI click handler
  style: undefined,// customer reference to a style DOM node or a string to insert as a style block
  output: (out) => {}, // hook to get result of exporting
  notebook_url: undefined,// hardcode the default notebook_url
})
\`\`\`


If you want to export without a UI, use the function \`exportToHTML\`, see the [example](https://observablehq.com/@tomlarkworthy/export-to-html-example)

\`\`\`js
import {exportToHTML } from '@tomlarkworthy/exporter'
\`\`\`

\`\`\`js
async function exportToHTML({
  mains = new Map(), // (name -> module) Map of main modules
  runtime = _runtime,
  options = {} // Object, export options, e.g. head, title
} = {})
\`\`\`

You can also just use inline anchor tags: ${forkAnchor({}, "forkAnchor()")} or ${downloadAnchor({}, "downloadAnchor()")}`
)}

function _5(md){return(
md`## Lopecode HTML Format Specification


### Inline http responses
The HTML file contains \`<script>\` blocks that hold content to serve internal network requests locally.

~~~html
<script id="d/c2dae147641e012a@46" 
        type="text/plain"
        data-encoding="base64+gzip"
        data-mime="application/javascript"
>
...inline text or base64 string
</script>
~~~

Requests to the URL matching the \`id\` are served locally, this includes \`import\`, \`fetch\`, \`XMLHttpRequest\` and \`<script>\` src attribute.
`
)}

function _6(md){return(
md`### Main script

The main script loads the Observable runtime with no standard library and loads a bootloader module. The bootloader is responsible for setting up the standard library and loading the first real modules, which it discovers by reading the \`bootconf.json\`. \`@tomlarkworthy/bootloader\` is the default which comes with d3, Plot, md, htl and lodash local.
`
)}

function _7(md){return(
md`## Persisted Hash URL

To help carry state across an export, the URL hash parameter is remembered in the \`bootconf.json\` and set automatically when opening the file if one is not present. If you need to move large amount of data, use a [local FileAttachment](https://observablehq.com/@tomlarkworthy/fileattachments) instead.`
)}

function _8(md){return(
md`## Themes

Themes are sourced from NotebookKit. A theme is fetched *once* from Github once when switching themes, but integrated into the export, and reused locally on subsequent exports. This keeps the bundle small, and you only need a network connection if switching to obtain the new CSS source files.`
)}

function _theme_assets(Inputs,themes,current_theme){return(
Inputs.select(themes, {
  value: current_theme || themes.get("near-midnight")
})
)}

function _10(html,htl){return(
htl.html`<div style="background: var(--theme-background); color: var(--theme-foreground);">
<h4 style="background: var(--theme-background); color: var(--theme-foreground);">CSS variables</h4>

--serif
--sans-serif
--monospace
--monospace-font
--max-width

${[
  "--theme-foreground",
  "--theme-foreground-alt",
  "--theme-foreground-focus",
  "--theme-foreground-faint",
"--theme-foreground-fainter",
"--theme-foreground-faintest",
"--theme-background",
"--theme-background-alt",
"--theme-background-a",
"--theme-background-b",
"--theme-foreground-muted",
"--theme-error"

].map(c => html`<p><div style="width: 10px; height: 16x; background: var(${c}); display: inline-block;"></div> ${c}</p>`)}

</div>
`
)}

function _themes()
{
  const baseURL =
    "https://raw.githubusercontent.com/observablehq/notebook-kit/6c2ec69e1ac30dd329789524a849578b2df17945/src/styles/";
  return new Map(
    Object.entries({
      air: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-air.css",
        baseURL + "abstract-light.css",
        baseURL + "syntax-light.css"
      ],
      coffee: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-coffee.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ],
      cotton: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-cotton.css",
        baseURL + "abstract-light.css",
        baseURL + "syntax-light.css"
      ],
      "deep-space": [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-deep-space.css",
        baseURL + "syntax-dark.css"
      ],
      glacier: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-glacier.css",
        baseURL + "abstract-light.css",
        baseURL + "syntax-light.css"
      ],
      ink: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-ink.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ],
      midnight: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-midnight.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ],
      "near-midnight": [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-near-midnight.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ],
      "ocean-floor": [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-ocean-floor.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ],
      parchment: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-parchment.css",
        baseURL + "abstract-light.css",
        baseURL + "syntax-light.css"
      ],
      slate: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-slate.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ],
      stark: [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-stark.css",
        baseURL + "syntax-dark.css"
      ],
      "sun-faded": [
        baseURL + "global.css",
        baseURL + "inspector.css",
        baseURL + "highlight.css",
        baseURL + "plot.css",
        baseURL + "index.css",
        baseURL + "theme-sun-faded.css",
        baseURL + "abstract-dark.css",
        baseURL + "syntax-dark.css"
      ]
    })
  );
}


function _cssForTheme(themes,extra_css){return(
async (theme) => [
  ...(await Promise.all(
    themes.get(theme).map(async (url) => [url, await (await fetch(url)).text()])
  )),
  extra_css
]
)}

async function _css(theme_assets,extra_css){return(
[
  ...(await Promise.all(
    theme_assets.map(async (url) => [url, await (await fetch(url)).text()])
  )),
  extra_css
]
)}

function _extra_css(){return(
[
  "file://syntax.css",
  `
/* Center page */
.lopecode-visualizer {
    max-width: 1200px;
    margin: auto;
}

/* highlight.js token colors */
.hljs-comment {
  color: var(--syntax-comment);
}

.hljs-params,
.hljs-built_in {
  color: var(--syntax-variable);
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-doctag,
.hljs-type,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-strong {
  color: var(--syntax-keyword);
}

.hljs-attr {
  color: var(--syntax-definition);
}


.hljs-deletion,
.hljs-variable {
  color: #e377c2;
}

.hljs-literal {
  color: var(--syntax-atom);
}

.hljs-number,
.hljs-regexp,
.hljs-bullet,
.hljs-link {
  color: var(--syntax-literal);
}

.hljs-string,
.hljs-meta,
.hljs-symbol,
.hljs-template-tag,
.hljs-template-variable,
.hljs-addition {
  color: var(--syntax-string);
}`
]
)}

function _current_theme(themes){return(
[...themes.values()].find((assets) =>
  assets.every((url) => document.getElementById(url))
)
)}

function _16(disk_svg){return(
disk_svg()
)}

function _disk_svg(html){return(
(fill) =>
  html`<svg ${
    fill ? `fill="${fill}" ` : ""
  }width="50px" height="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect height="4" width="4" x="20" y="50"/><rect height="4" width="16" x="28" y="50"/><path d="M32,38a8,8,0,1,0-8-8A8.009,8.009,0,0,0,32,38Zm0-12a4,4,0,1,1-4,4A4,4,0,0,1,32,26Z"/><path d="M6,62H58a2,2,0,0,0,2-2V15a2,2,0,0,0-.586-1.414l-11-11A2,2,0,0,0,47,2H6A2,2,0,0,0,4,4V60A2,2,0,0,0,6,62Zm42-4H16V46H48ZM16,6H31v4h4V6h4v8H16ZM8,6h4V16a2,2,0,0,0,2,2H41a2,2,0,0,0,2-2V6h3.172L56,15.829V58H52V44a2,2,0,0,0-2-2H14a2,2,0,0,0-2,2V58H8Z"/></svg>`
)}

function _18(md){return(
md`## Implementation`
)}

function _exporter(actionHandler,css,keepalive,exporter_module,variable,domView,view,disk_svg,Inputs,createShowable,top120List,themes,$0,bindOneWay){return(
({
  handler = actionHandler,
  style = css,
  output = (out) => {},
  notebook_url = "",
  debug = false
} = {}) => {
  keepalive(exporter_module, "futureExportedState");
  const handlerVar = variable(handler);
  const feedback = domView();
  const options = { style, output, debug };

  const spinner = async (...args) => {
    try {
      ui.querySelector(".disk-image").classList.add("spinning");
      await handler(...args, (cb) => (feedback.value = cb));
      ui.querySelector(".disk-image").classList.remove("spinning");
    } catch (e) {
      ui.querySelector(".disk-image").classList.remove("spinning");
      throw e;
    }
  };

  const ui = view`<div class="moldbook-exporter" style="max-width: 520px;">
    <style>
      .moldbook-exporter {
        margin: 10px;
        background: var(--theme-background-alt);
        fill: var(--theme-foreground);
        border-radius: 6px;
      }
      .moldbook-exporter button {
        background: var(--theme-foreground-focus);
        color: var(--theme-background);
        height: 20px;
        border-radius: 3px;
      }
      .moldbook-exporter input[type=text] {
        width: 100%;
      }
      .moldbook-exporter form {
        width: auto;
        background: var(--theme-background);
        color: var(--theme-foreground);
      }
      .moldbook-exporter .moldbook-alt {
        color: var(--theme-foreground-focus);
      }
      @keyframes spin {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(180deg); }
      }
      .moldbook-exporter .spinning {
        transform-style: preserve-3d;
        animation-name: spin;
        animation-duration: 0.2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }
    </style>
    ${["handler", handlerVar]}
    <div style="display: flex;">
      <div class="disk-image">${disk_svg()}</div>
      <div style="width: 100%">
        <div class="moldbook-alt">
          <span style="display: flex; align-items: center; margin-left: 5px;">
            fork
            <div style="flex-grow:1"></div>
            ${[
              "source",
              Inputs.select(["this notebook", "a notebook url", "the top 100"])
            ]}
          </span>
          ${[
            "notebook_url",
            createShowable(
              Inputs.text({
                value: notebook_url,
                placeholder: "@tomlarkworthy/exporter"
              })
            )
          ]}
          ${["top_100", createShowable(Inputs.select(top120List))]}
        </div>
        <div class="moldbook-dark">
          <div>
            <div style="display: flex; gap: 5px; justify-content: flex-end; align-items: center; flex-wrap: wrap;">
              <div style="flex-grow:1; flex-basis: 58%; flex-shrink: 2; min-width: 240px;">
                ${[
                  "bootloader",
                  Inputs.text({
                    value: "@tomlarkworthy/bootloader",
                    placeholder: "@tomlarkworthy/bootloader"
                  })
                ]}
              </div>
              <div style="flex-grow:1; flex-basis: 28%; min-width: 150px;">
                ${[
                  "theme",
                  Inputs.bind(Inputs.select(themes), $0)
                ]}
              </div>
              ${[
                "copyjs",
                Inputs.button("Copy as JS", {
                  reduce: () => spinner("copyjs", ui.value, options)
                })
              ]}
              ${[
                "blob",
                Inputs.button("Fork", {
                  reduce: () => spinner("tab", ui.value, options)
                })
              ]}
              ${[
                "html",
                Inputs.button("Download", {
                  reduce: () => spinner("file", ui.value, options)
                })
              ]}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>${feedback}</div>
  </div>`;

  bindOneWay(ui.notebook_url.show, ui.source, {
    transform: (src) => src === "a notebook url"
  });
  bindOneWay(ui.top_100.show, ui.source, {
    transform: (src) => src === "the top 100"
  });
  return ui;
}
)}

function _copyTextToClipboard(globalThis){return(
async (text) => {
  text = String(text ?? "");
  if (globalThis.navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  if (!ok)
    throw new Error(
      "Clipboard copy failed (no navigator.clipboard and execCommand failed)"
    );
  return true;
}
)}

function _htmlToConsoleSnippet(utf8ToBase64){return(
(
  html,
  { title = "Observable notebook", zIndex = 2147483647 } = {}
) => {
  const b64 = utf8ToBase64(html);
  const safeTitle = String(title).replace(/`/g, "\\`");
  return `(async () => {
  const b64 = "${b64}";
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  const html = new TextDecoder().decode(bytes);

  const z = ${Math.max(0, Math.min(2147483647, zIndex | 0))};

  const host = document.createElement("div");
  host.setAttribute("data-lopecode-notebook", ${JSON.stringify(safeTitle)});
  Object.assign(host.style, {
    position: "fixed",
    top: "12px",
    right: "12px",
    bottom: "12px",
    width: "calc(50vw - 12px)",
    maxWidth: "1100px",
    minWidth: "360px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 24px 90px rgba(0,0,0,0.35)",
    overflow: "hidden",
    zIndex: String(z),
    pointerEvents: "auto"
  });

  const topbar = document.createElement("div");
  Object.assign(topbar.style, {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "8px",
    gap: "8px",
    background: "linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(255,255,255,0.75))",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    zIndex: String(z + 1)
  });

  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close");
  Object.assign(close.style, {
    width: "34px",
    height: "34px",
    borderRadius: "17px",
    border: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(255,255,255,0.98)",
    fontSize: "22px",
    lineHeight: "30px",
    cursor: "pointer"
  });

  const iframe = document.createElement("iframe");
  iframe.title = ${JSON.stringify(safeTitle)};
  iframe.setAttribute("referrerpolicy", "no-referrer");
  Object.assign(iframe.style, {
    position: "absolute",
    left: "0",
    right: "0",
    top: "46px",
    bottom: "0",
    width: "100%",
    height: "calc(100% - 46px)",
    border: "0",
    background: "#fff"
  });

  close.addEventListener("click", () => host.remove());

  topbar.appendChild(close);
  host.appendChild(iframe);
  host.appendChild(topbar);
  (document.body || document.documentElement).appendChild(host);

  iframe.srcdoc = html;
})();`;
}
)}

function _exportAnchor(Node,notebook_name,main,_runtime,exportToHTML,location,getCompactISODate){return(
(action, attrs = {}, label = action, exportOpts = {}) => {
  const a = document.createElement("a");

  const {
    href = "#",
    title,
    className,
    style,
    target,
    rel,
    ...rest
  } = attrs ?? {};

  a.href = href;
  if (title != null) a.title = title;
  if (className != null) a.className = className;
  if (style != null) a.setAttribute("style", style);
  if (target != null) a.target = target;
  if (rel != null) a.rel = rel;

  for (const [k, v] of Object.entries(rest)) {
    if (v == null) continue;
    if (k.startsWith("on") && typeof v === "function") continue;
    try {
      a.setAttribute(k, String(v));
    } catch {}
  }

  if (label instanceof Node) a.appendChild(label);
  else a.textContent = label == null ? "" : String(label);

  const clickHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (a.dataset.busy === "1") return;
    a.dataset.busy = "1";

    const prevAriaBusy = a.getAttribute("aria-busy");
    a.setAttribute("aria-busy", "true");

    const prevPointerEvents = a.style.pointerEvents;
    const prevOpacity = a.style.opacity;
    a.style.pointerEvents = "none";
    a.style.opacity = "0.6";

    let blobUrl = null;
    try {
      const mains =
        exportOpts.mains ??
        (notebook_name ? new Map([[notebook_name, main]]) : _runtime.mains);

      const runtime = exportOpts.runtime ?? _runtime;
      const title = exportOpts.title ?? [...mains.keys()][0] ?? "notebook";

      const bootloader = exportOpts.bootloader ?? "@tomlarkworthy/bootloader";
      const appendHash = exportOpts.appendHash ?? true;

      const resp = await exportToHTML({
        mains,
        runtime,
        options: {
          title,
          bootloader,
          ...(exportOpts.options ?? {}),
          ...(exportOpts.theme != null ? { theme: exportOpts.theme } : null),
          ...(exportOpts.style != null ? { style: exportOpts.style } : null),
          ...(exportOpts.head != null ? { head: exportOpts.head } : null),
          ...(exportOpts.headless != null
            ? { headless: exportOpts.headless }
            : null),
          ...(exportOpts.hash != null ? { hash: exportOpts.hash } : null)
        }
      });

      const html = resp?.source ?? resp;
      blobUrl = URL.createObjectURL(new Blob([html], { type: "text/html" }));

      if (action === "tab" || action === "fork") {
        const hash = exportOpts.hash ?? location.hash ?? "";
        window.open(blobUrl + (appendHash ? hash : ""), "_blank");
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      } else if (action === "download" || action === "file") {
        const filename =
          exportOpts.filename ?? `${title}_${getCompactISODate()}.html`;
        const dl = document.createElement("a");
        dl.href = blobUrl;
        dl.download = filename;
        dl.click();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 5_000);
      } else {
        throw new Error(`Unknown export action: ${action}`);
      }
    } finally {
      a.dataset.busy = "0";
      if (prevAriaBusy == null) a.removeAttribute("aria-busy");
      else a.setAttribute("aria-busy", prevAriaBusy);
      a.style.pointerEvents = prevPointerEvents;
      a.style.opacity = prevOpacity;
    }
  };

  a.addEventListener("click", clickHandler);

  if (typeof attrs?.onclick === "function") {
    const userHandler = attrs.onclick;
    a.addEventListener("click", (e) => userHandler(e));
  }

  return a;
}
)}

function _forkAnchor(exportAnchor){return(
(attrs = {}, label = "fork", exportOpts = {}) =>
  exportAnchor("tab", attrs, label, exportOpts)
)}

function _downloadAnchor(exportAnchor){return(
(attrs = {}, label = "download", exportOpts = {}) =>
  exportAnchor("download", attrs, label, exportOpts)
)}

function _actionHandler(Inputs,getSourceModule,notebook_name,_runtime,exportToHTML,htmlToConsoleSnippet,copyTextToClipboard,view,location,getCompactISODate){return(
async (action, state, options, feedback_callback) => {
  feedback_callback(Inputs.textarea({ value: `Generating source...\n` }));
  const { notebook, module, runtime } = await getSourceModule(state);
  const mains = notebook_name ? new Map([[notebook, module]]) : _runtime.mains;
  const title = [...mains.keys()][0];

  const response = await exportToHTML({
    mains,
    runtime,
    options: {
      bootloader: state.bootloader,
      title,
      ...options
    }
  });

  if (options.output) options.output(response);

  const { source, report } = response;

  if (action === "copyjs") {
    const snippet = htmlToConsoleSnippet(source, { title });
    await copyTextToClipboard(snippet);
    feedback_callback(view`<div style="padding: 8px;">
      <div><b>Copied</b> JS snippet to clipboard.</div>
      <div style="opacity: 0.75; font-size: 12px;">Paste into a JS console to inject the notebook as a full-screen overlay.</div>
    </div>`);
    return;
  }

  const url = URL.createObjectURL(new Blob([source], { type: "text/html" }));
  feedback_callback(view`
    <center><a href="${url}" target="_blank">export</a></center>
    ${Inputs.table(
      report.filter((f) => !f.file),
      {
        columns: ["id", "size"],
        width: { id: "80%", size: "20%" },
        sort: "size",
        reverse: true
      }
    )}
  `);

  if (action === "tab") {
    window.open(url + location.hash, "_blank");
  } else if (action === "file") {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}_${getCompactISODate()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
)}

function _exportToHTML(_runtime,cssForTheme,css,location,keepalive,exporter_module,$0){return(
async function exportToHTML({
  mains = new Map(), // (name -> module) Map of main modules
  runtime = _runtime,
  options = {} // Object, export options, e.g. head, title, theme
} = {}) {
  debugger;
  // defaults if conf not found
  let conf = {
    headless: false
  };
  try {
    conf = (await import("file://bootconf.json")).default;
  } catch (_) {}
  if (runtime.module_names) {
    runtime.mains.forEach((name, module) => mains.set(name, module));
  }
  if (!options.bootloader) {
    options.bootloader = "@tomlarkworthy/bootloader";
  }
  if (!options.headless) {
    options.headless = conf.headless;
  }
  if (options.theme) {
    options.style = await cssForTheme(options.theme);
  }
  if (!options.style) {
    options.style = css;
  }
  if (!options.hash) {
    options.hash = location.hash;
  }
  // Force observation of response
  keepalive(exporter_module, "tomlarkworthy_exporter_task");
  const response = await $0.send({
    mains,
    runtime,
    options
  });
  return response;
}
)}

function _getSourceModule(notebook_name,main,_runtime){return(
async (state) => {
  if (state.source == "this notebook")
    return {
      notebook: notebook_name,
      module: main,
      runtime: _runtime
    };
  const url =
    state.source == "a notebook url"
      ? state.notebook_url.child
      : state.top_100.child;

  const notebook = url.trim().replace("", "");
  const [{ Runtime, Inspector }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/${notebook}.js?v=4`)
  ]);
  const runtime = new Runtime();
  return {
    notebook,
    module: runtime.module(define),
    runtime
  };
}
)}

function _createShowable(variable,view){return(
function createShowable(child, { show = true } = {}) {
  const showVariable = variable(show, { name: "show" });
  const showable = view`<div>${["show", showVariable]}${["child", child]}`;

  // The showable logic is to toggle the visibility of the enclosing div based
  // on the show variable state
  const updateDisplay = () => {
    if (showVariable.value) {
      showable.style.display = "inline";
    } else {
      showable.style.display = "none";
    }
  };
  // Variables have additional assign event so presentation can be
  // updated as soon as variables change but before dataflow
  // because this is a pure presentation state it makes sense not to trigger
  // dataflow so we do not use 'input' event
  showVariable.addEventListener("assign", updateDisplay);

  updateDisplay();
  return showable;
}
)}

function _reportValidity(){return(
(view, invalidation) => {
  const input = view.querySelector("input");
  const report = () => view.reportValidity();
  input.addEventListener("input", report);
  invalidation.then(() => input.removeEventListener("input", report));
  return view;
}
)}

function _top120List(){return(
[
  "@jashkenas/inputs",
  "@d3/gallery",
  "@d3/learn-d3",
  "@makio135/creative-coding",
  "@observablehq/module-require-debugger",
  "@d3/zoomable-sunburst",
  "@observablehq/plot",
  "@tmcw/enigma-machine",
  "@d3/force-directed-graph-component",
  "@d3/bar-chart-race-explained",
  "@observablehq/data-wrangler",
  "@d3/collapsible-tree",
  "@sxywu/introduction-to-svg-and-d3-js",
  "@d3/sankey-component",
  "@d3/zoomable-circle-packing",
  "@d3/selection-join",
  "@bstaats/graph-visualization-introduction",
  "@d3/color-legend",
  "@uwdata/introducing-arquero",
  "@mbostock/10-years-of-open-source-visualization",
  "@nitaku/tangled-tree-visualization-ii",
  "@makio135/give-me-colors",
  "@johnburnmurdoch/bar-chart-race-the-most-populous-cities-in-the-world",
  "@d3/color-schemes",
  "@tezzutezzu/world-history-timeline",
  "@d3/calendar",
  "@observablehq/a-taste-of-observable",
  "@d3/bar-chart-race",
  "@mourner/martin-real-time-rtin-terrain-mesh",
  "@uwdata/introduction-to-vega-lite",
  "@mbostock/voronoi-stippling",
  "@ben-tanen/a-tutorial-to-using-d3-force-from-someone-who-just-learned-ho",
  "@d3/hierarchical-edge-bundling",
  "@observablehq/introduction-to-data",
  "@harrystevens/directly-labelling-lines",
  "@observablehq/summary-table",
  "@observablehq/plot-cheatsheets",
  "@tomshanley/cheysson-color-palettes",
  "@tophtucker/inferring-chart-type-from-autocorrelation-and-other-evils",
  "@mitvis/introduction-to-d3",
  "@veltman/watercolor",
  "@veltman/centerline-labeling",
  "@mbostock/scrubber",
  "@observablehq/electoral-college-decision-tree",
  "@d3/tree-component",
  "@d3/radial-tree-component",
  "@d3/world-tour",
  "@observablehq/introduction-to-generators",
  "@yurivish/peak-detection",
  "@mkfreeman/plot-tooltip",
  "@aboutaaron/racial-demographic-dot-density-map",
  "@mbostock/methods-of-comparison-compared",
  "@rreusser/gpgpu-boids",
  "@rreusser/2d-n-body-gravity-with-poissons-equation",
  "@bumbeishvili/data-driven-range-sliders",
  "@observablehq/introducing-visual-dataflow",
  "@observablehq/vega-lite",
  "@observablehq/observable-for-jupyter-users",
  "@observablehq/how-observable-runs",
  "@unkleho/introducing-d3-render-truly-declarative-and-reusable-d3",
  "@vega/a-guide-to-guides-axes-legends-in-vega",
  "@bartok32/diy-inputs",
  "@mbostock/polar-clock",
  "@dakoop/learn-js-data",
  "@mbostock/manipulating-flat-arrays",
  "@uwdata/an-illustrated-guide-to-arquero-verbs",
  "@daformat/rounding-polygon-corners",
  "@yurivish/seasonal-spirals",
  "@emamd/animating-lots-and-lots-of-circles-with-regl-js",
  "@uwdata/data-visualization-curriculum",
  "@d3/d3-group",
  "@d3/tree-of-life",
  "@d3/arc-diagram",
  "@d3/choropleth",
  "@mattdzugan/generative-art-using-wind-turbine-data",
  "@jashkenas/handy-embed-code-generator",
  "@analyzer2004/plot-gallery",
  "@nsthorat/how-to-build-a-teachable-machine-with-tensorflow-js",
  "@d3/sunburst-component",
  "@tomlarkworthy/saas-tutorial",
  "@mbostock/the-wealth-health-of-nations",
  "@yy/covid-19-fatality-rate",
  "@bryangingechen/importing-data-from-google-spreadsheets-into-a-notebook-we",
  "@mbostock/slide",
  "@kerryrodden/sequences-sunburst",
  "@d3/zoom-to-bounding-box",
  "@ambassadors/interactive-plot-dashboard",
  "@sethpipho/fractal-tree",
  "@mbostock/saving-svg",
  "@analyzer2004/west-coast-weather-from-seattle-to-san-diego",
  "@tmcw/tables",
  "@observablehq/introduction-to-serverless-notebooks",
  "@mootari/range-slider",
  "@d3/animated-treemap",
  "@d3/treemap-component",
  "@uwdata/interaction",
  "@hydrosquall/d3-annotation-with-d3-line-chart",
  "@jiazhewang/introduction-to-antv",
  "@d3/hierarchical-bar-chart",
  "@uwdata/data-types-graphical-marks-and-visual-encoding-channels",
  "@observablehq/why-use-a-radial-data-visualization",
  "@kerryrodden/introduction-to-text-analysis-with-tf-idf",
  "@uw-info474/javascript-data-wrangling",
  "@karimdouieb/try-to-impeach-this-challenge-accepted",
  "@observablehq/plot-gallery",
  "@carmen-tm/women-architects-i-didnt-hear-about",
  "@d3/versor-dragging",
  "@analyzer2004/timespiral",
  "@d3/brushable-scatterplot-matrix",
  "@observablehq/require",
  "@anjana/functional-javascript-first-steps",
  "@hamzaamjad/tiny-charts",
  "@observablehq/views",
  "@yurivish/quarantine-now",
  "@analyzer2004/performance-chart",
  "@freedmand/sounds",
  "@d3/bubble-chart-component",
  "@d3/mobile-patent-suits",
  "@observablehq/notebook-visualizer",
  "@d3/force-directed-tree"
].map((s) => "https://observablehq.com/" + s)
)}

function _notebook_name()
{
  if (document.baseURI.startsWith("https://observablehq.com")) {
    return new URL(document.baseURI).pathname.replace("/", "");
  }
}


function _notebook_title(notebook_name,_runtime){return(
notebook_name || [..._runtime.mains.keys()][0]
)}

function _utf8ToBase64(){return(
(str) => {
  const bytes = new TextEncoder().encode(String(str));
  const chunk = 0x8000;
  let bin = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}
)}

function _34(md){return(
md`### Single File Notebook Generator Flow`
)}

function _TRACE_MODULE(){return(
"@tomlarkworthy/forking-agent"
)}

function _task(flowQueue){return(
flowQueue({ timeout_ms: 20000 })
)}

function _37(task){return(
task
)}

function _task_runtime(task){return(
task.runtime
)}

function _runtime_variables(task_runtime,variableToObject){return(
[...task_runtime._variables].map(variableToObject)
)}

function _module_map(moduleMap,task_runtime,task)
{
  return moduleMap(task_runtime, {
    cache: [...task.mains.entries()].map(([name, module]) => [
      module,
      { name, module }
    ])
  });
}


function _41(resolve_modules){return(
resolve_modules
)}

function _42(summary){return(
summary
)}

function _excluded_module_names(submit_summary)
{
  submit_summary;
  return ["TBD", "error", "builtin", "main"];
}


function _excluded_modules(module_map,excluded_module_names){return(
new Map(
  [...module_map.entries()].filter(([m, info]) =>
    excluded_module_names.includes(info.name)
  )
)
)}

function _included_modules(module_map,excluded_module_names){return(
new Map(
  [...module_map.entries()].filter(
    ([m, info]) => !excluded_module_names.includes(info.name)
  )
)
)}

function _moduleLookup(included_modules){return(
new Map(
  [...included_modules.entries()].map(([m, info]) => [m, info.name])
)
)}

async function _module_specs(task,cellMap,task_runtime,module_map,included_modules,TRACE_MODULE,getFileAttachments,main,generate_module_source,moduleLookup)
{
  if (task.options?.debug) debugger;

  const specsTodo = new Set();
  const allCells = await cellMap(
    [...task_runtime._variables].filter((v) => v._type == 1),
    module_map
  );

  return new Map(
    await Promise.all(
      [...included_modules.entries()].map(async ([module, spec]) => {
        specsTodo.add(spec.name);
        if (spec.name === TRACE_MODULE) debugger;

        const cellsForModule = allCells.get(module) ?? [];

        const imports = cellsForModule
          .filter((c) => c.type === "import")
          .map((c) => c.module_name)
          .filter((m) => !["builtin"].includes(m));

        const cells = new Map(cellsForModule.map((c) => [c.name, c.variables]));

        const fileAttachments = getFileAttachments(module) || new Map();
        if (
          spec.name === task.notebook &&
          task?.options?.main_files !== false
        ) {
          getFileAttachments(main).forEach((value, key) =>
            fileAttachments.set(key, value)
          );
        }

        const source = await generate_module_source(
          spec,
          module._scope,
          cells,
          fileAttachments,
          { extraModuleLookup: moduleLookup }
        );

        specsTodo.delete(spec.name);

        return [
          spec.name,
          {
            url: spec.name,
            imports,
            fileAttachments,
            source,
            cells,
            module,
            define: spec.define
          }
        ];
      })
    )
  );
}


function _findImports(){return(
(cells) =>
  [...cells.keys()]
    .filter((name) => typeof name === "string" && name.startsWith("module "))
    .map((name) => name.replace("module ", ""))
)}

function _getFileAttachments(){return(
(module) => {
  let fileMap;
  const FileAttachment = module._builtins.get("FileAttachment");
  const backup_get = Map.prototype.get;
  const backup_has = Map.prototype.has;
  Map.prototype.has = Map.prototype.get = function (...args) {
    fileMap = this;
  };
  try {
    FileAttachment("");
  } catch (e) {}
  Map.prototype.has = backup_has;
  Map.prototype.get = backup_get;
  return fileMap;
}
)}

async function _book(lopebook,task,module_specs)
{
  const book = await lopebook(
    {
      url: task.notebook,
      modules: module_specs
    },
    {
      ...task.options
    }
  );
  console.log("book", book);
  return book;
}


function _51(Inputs,module_specs){return(
Inputs.table(
  [
    ...module_specs.entries().map(([name, spec]) => ({
      name,
      source: spec.source.length,

      imports: spec.imports,
      fileAttachments: spec.fileAttachments
    }))
  ],
  {
    layout: "auto",
    format: {
      fileAttachments: (f) =>
        !f
          ? "none"
          : Inputs.table([
              ...f.entries().map(([name, f]) => ({ name, url: f.url || f }))
            ]),

      imports: (f) => Inputs.table(f.map((i) => ({ name: i })))
    }
  }
)
)}

function _52(md){return(
md`##### Generate a report on the sizes of components`
)}

function _report(DOMParser,book)
{
  let report;
  try {
    report = [
      ...new DOMParser()
        .parseFromString(book, "text/html")
        .querySelectorAll("script")
    ].map((script) => ({
      ...(script.getAttribute("file") && {
        file: script.getAttribute("file"),
        module: script.getAttribute("module")
      }),
      type: script.getAttribute("data-mime") || "application/javascript",
      size: script.text.length,
      id: script.id
    }));
  } catch (err) {
    report = err;
  }

  console.log("report", report);
  return report;
}


function _tomlarkworthy_exporter_task(book,report,exporter_module,$0)
{
  const result = {
    source: book,
    report: report
  };
  exporter_module;
  return $0.resolve(result);
}


function _55(md){return(
md`### Module Source Generator`
)}

function _generate_module_source(generate_definitions,generate_define){return(
async (
  spec,
  scope,
  cells,
  fileAttachments,
  { extraModuleLookup = new Map() } = {}
) =>
  `${await generate_definitions(cells, { extraModuleLookup })}
${await generate_define(spec, scope, cells, fileAttachments, {
  extraModuleLookup
})}`
)}

function _generate_definitions(cellToDefinition,importCell){return(
async (cells) =>
  [
    ...(await Promise.all(
      [...cells.entries()].map(([name, variables]) =>
        cellToDefinition(name, variables)
      )
    )),
    importCell.toString() // for all modules
  ]
    .flat()
    .join("")
)}

function _generate_define(cellToDefines){return(
async (
  spec,
  scope,
  cells,
  fileAttachments,
  { extraModuleLookup } = {}
) => {
  const fileAttachmentExpression = fileAttachments
    ? `  const fileAttachments = new Map(${JSON.stringify([
        ...fileAttachments.keys()
      ])}.map((name) => {
    const module_name = "${spec.name}";
    const {status, mime, bytes} = window.lopecode.contentSync(module_name + "/" + encodeURIComponent(name));
    const blob_url = URL.createObjectURL(new Blob([bytes], { type: mime}));
    return [name, {url: blob_url, mimeType: mime}]
  }));
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));\n`
    : "";

  return `export default function define(runtime, observer) {
  const main = runtime.module();
${fileAttachmentExpression}${(
    await Promise.all(
      [...cells.entries()].map(([name, variables]) =>
        cellToDefines(scope, name, variables, { extraModuleLookup })
      )
    )
  )
    .flat()
    .join("\n")}
  return main;
}`;
}
)}

function _isLiveImport(){return(
(variable) =>
  variable._definition
    .toString()
    .includes("observablehq" + "--inspect " + "observablehq--import")
)}

function _contentHash(){return(
(s) => {
  s = String(s);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36); // compact rep
}
)}

function _cellToDefinition(isLiveImport,contentHash){return(
(name, variables) => {
  if (typeof name == "string") {
    if (name.startsWith("module ")) {
      return "";
    }
    if (name.startsWith("dynamic ")) {
      return "";
    }
    if (name.startsWith("viewof ")) {
      name = name.replace("viewof ", "");
    } else {
      if (name.startsWith("mutable ")) {
        name = name.replace("mutable ", "");
      }
    }
  } else if (isLiveImport(variables[0])) {
    return ""; //`const _${name} = () => "live imports are stripped";\n`;
  } else {
    return `const _${contentHash(
      variables[0]._definition
    )} = ${variables[0]._definition.toString()};\n`;
  }
  return `const _${name} = ${variables[0]._definition.toString()};\n`;
}
)}

function _importCell(){return(
function importCell({ specifier, specifiers, notebook }, module) {
  const importElement = document.createElement("span");
  importElement.className = "observablehq--inspect observablehq--import";
  importElement.appendChild(document.createTextNode("import {"));

  let isFirstSpecifier = false;
  for (const { imported: originalName, local: aliasName } of specifiers) {
    if (isFirstSpecifier) {
      importElement.appendChild(document.createTextNode(", "));
    } else {
      isFirstSpecifier = true;
    }

    const link = document.createElement("a");
    if (module._scope.has(originalName)) {
      if (notebook) {
        link.href = new URL(`#${originalName}`, notebook);
      }
    } else {
      link.className = "observablehq--unknown";
    }
    link.textContent = originalName;
    importElement.appendChild(link);

    if (originalName !== aliasName) {
      importElement.appendChild(document.createTextNode(` as ${aliasName}`));
    }
  }

  importElement.appendChild(document.createTextNode("}"));
  if (notebook) {
    importElement.appendChild(document.createTextNode(" from "));
    const notebookLink = document.createElement("a");
    notebookLink.href = new URL(notebook);
    notebookLink.textContent = `"${specifier}"`;
    importElement.appendChild(notebookLink);
  }

  return importElement;
}
)}

function _cellToDefines(sourceModule,findModuleName,findImportedName,isLiveImport,contentHash){return(
async (scope, name, variables, { extraModuleLookup } = {}) => {
  const defines = [];
  if (typeof name === "string") {
    if (name.startsWith("module <unknown")) {
      debugger;
      return [];
    } else if (name.startsWith("module ")) {
      const module = await sourceModule(variables[0]);
      const moduleName =
        extraModuleLookup.get(module) || findModuleName(scope, module);

      //load the module (and rename it)
      defines.push(
        `  main.define("${name}", async () => runtime.module((await import("/${moduleName}.js?v=4")).default));`
      );
      // load the variables
      const specifiers = new Map(); // local -> remote
      await Promise.all(
        variables.map(async (v) => {
          if (v._name.startsWith("module ")) {
            // ignore any existing representation of the module
          } else {
            const importedName = await findImportedName(v);
            specifiers.set(v._name, importedName);
            defines.push(
              `  main.define("${
                v._name
              }", ["${name}", "@variable"], (_, v) => v.import(${
                importedName && importedName !== v._name
                  ? `"${importedName}", `
                  : ""
              }"${v._name}", _));`
            );
          }
        })
      );
      // Filter out redundant specifiers otherwise the same thing gets imported multiple
      // time
      const trimmed_specifiers = [];
      [...specifiers.entries()].forEach(([local, imported]) => {
        if (
          specifiers.has("mutable " + local) ||
          specifiers.has("viewof " + local)
        ) {
          // skip its imported as a viewof
        } else {
          trimmed_specifiers.push({
            local,
            imported
          });
        }
      });
      // create an anon variable to do the import
      //     defines.push(
      //       `  main.variable(observer()).define(["${name}"], async (m) => importCell({
      // specifier: "${moduleName}",
      // specifiers: ${JSON.stringify(trimmed_specifiers)},
      // notebook: "https://${moduleName}"
      //       }, m));`
      //     );
    } else if (name.startsWith("viewof ")) {
      // viewof <name>
      const viewName = name.replace("viewof ", "");
      const v = variables[0];
      defines.push(
        `  main.variable(observer("${name}")).define("${name}", ${
          v._inputs.length > 0
            ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
            : ""
        }_${viewName});`
      );
      defines.push(
        `  main.variable(observer("${viewName}")).define("${viewName}", ["Generators", "viewof ${viewName}"], (G, _) => G.input(_));`
      );
    } else if (name.startsWith("mutable ")) {
      // mutable <name>
      const mutableName = name.replace("mutable ", "");
      const v = variables[0];
      defines.push(
        `  main.define("initial ${mutableName}", ${
          v._inputs.length > 0
            ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
            : ""
        }_${mutableName});`
      );
      defines.push(
        `  main.variable(observer("mutable ${mutableName}")).define("mutable ${mutableName}", ["Mutable", "initial ${mutableName}"], (M, _) => new M(_));`
      );
      defines.push(
        `  main.variable(observer("${mutableName}")).define("${mutableName}", ["mutable ${mutableName}"], _ => _.generator);`
      );
    }
  } else if (isLiveImport(variables[0])) {
    return []; //`const _${name} = () => "live imports are stripped";\n`;
  }

  if (defines.length == 0 && variables.length == 1) {
    const v = variables[0];
    defines.push(
      `  main.variable(observer(${v._name ? `"${v._name}"` : ""})).define(${
        v._name ? `"${v._name}", ` : ""
      }${
        v._inputs.length > 0
          ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
          : ""
      }_${typeof name == "string" ? name : contentHash(v._definition)});`
    );
  }
  return defines;
}
)}

function _64(md){return(
md`## Assemble `
)}

function _es_module_shims(){return(
"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"
)}

function _runtime_gz(){return(
"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"
)}

function _inspector_gz(){return(
"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"
)}

function _inlineModule(){return(
(
  id,
  source,
  { mime = "application/javascript", main = false } = {}
) => `<script id="${id}" 
  type="text/plain"
  data-mime="${mime}"${
  main
    ? `
  data-main`
    : ""
}
>
${source}
</script>`
)}

function _inlineGzipModule(){return(
(id, source) => `<script id="${id}" 
  type="text/plain"
  data-encoding="base64+gzip"
  data-mime="application/javascript">
${source}
</script>`
)}

function _normalize(){return(
(url) =>
  url.replace(
    /^(?:https:\/\/api\.observablehq\.com)?\/(.*?)\.js(?:\?.*)?$/,
    "$1"
  )
)}

function _test_normalize(expect,normalize)
{
  expect(
    normalize("https://api.observablehq.com/@tomlarkworthy/runtime-sdk.js?v=4")
  ).toBe("@tomlarkworthy/runtime-sdk");

  expect(
    normalize("https://api.observablehq.com/@tomlarkworthy/bootloader.js?v=4")
  ).toBe("@tomlarkworthy/bootloader");
  expect(
    normalize("https://api.observablehq.com/d/57d79353bac56631.js?v=4")
  ).toBe("d/57d79353bac56631");
  expect(normalize("/@tomlarkworthy/runtime-sdk.js?v=4")).toBe(
    "@tomlarkworthy/runtime-sdk"
  );
  expect(normalize("/d/57d79353bac56631.js?v=4")).toBe("d/57d79353bac56631");
  expect(
    normalize(
      "/@tomlarkworthy/fileattachments.js?v=4&resolutions=4b0160c7af70b609@8453"
    )
  ).toBe("@tomlarkworthy/fileattachments");

  expect(
    normalize(
      "https://api.observablehq.com/@tomlarkworthy/jest-expect-standalone.js?v=4&resolutions=03dda470c56b93ff@8390"
    )
  ).toBe("@tomlarkworthy/jest-expect-standalone");
}


function _isNotebook(){return(
(id) => /^(@[^/]+\/[^/]+|d\/[a-f0-9]{16})$/.test(id)
)}

function _networking_script(normalize,isNotebook){return(
`
  const normalize = ${normalize.toString()};
  const isNotebook = ${isNotebook.toString()};

  const b64ToBytes = (b64) => {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };

  // Build a Response synchronously for esms.fetch
  function dvfResponseSync(id) {
    const el = document.getElementById(id);
    console.log("responding", id, el)
    if (!el) return new Response(null, { status: 404 });

    const mime = el.getAttribute("data-mime");
    if (!mime) return new Response(null, { status: 415 });

    const enc = (el.getAttribute("data-encoding") || "text").toLowerCase();
    const text = (el.textContent || "").trim();

    try {
      if (enc === "text") {
        const bytes = new TextEncoder().encode(text);
        return new Response(bytes, {
          status: 200,
          headers: { "Content-Type": mime, "Content-Length": String(bytes.byteLength) }
        });
      }
      if (enc === "base64") {
        const bytes = b64ToBytes(text);
        return new Response(bytes, {
          status: 200,
          headers: { "Content-Type": mime, "Content-Length": String(bytes.byteLength) }
        });
      }
      if (enc === "base64+gzip") {
        // Sync setup of streaming decompression
        const bytes = b64ToBytes(text);
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
        return new Response(stream, { status: 200, headers: { "Content-Type": mime } });
      }
    } catch {
      return new Response(null, { status: enc.includes("gzip") ? 499 : 422 });
    }
    return new Response(null, { status: 422 });
  }

  // Async bytes for global fetch/XHR/blob URLs
  async function dvfBytes(id) {
    const el = document.getElementById(id);
    if (!el) return { status: 404 };

    const mime = el.getAttribute("data-mime");
    if (!mime) return { status: 415 };

    const enc = (el.getAttribute("data-encoding") || "text").toLowerCase();
    const text = el.textContent || "";

    try {
      if (enc === "text") {
        const bytes = new TextEncoder().encode(text);
        return { status: 200, mime, bytes };
      }
      if (enc === "base64") {
        const bytes = b64ToBytes(text);
        return { status: 200, mime, bytes };
      }
      if (enc === "base64+gzip") {
        const bytes = b64ToBytes(text);
        // true async decompression to materialize bytes for blob URLs
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
        const ab = await new Response(stream).arrayBuffer();
        return { status: 200, mime, bytes: new Uint8Array(ab) };
      }
    } catch {
      return { status: enc.includes("gzip") ? 499 : 422 };
    }
    return { status: 422 };
  }

  // --- es-module-shims hooks (sync) ---
  window.esmsInitOptions = {
    resolve(id, parentUrl, defaultResolve) {
      id = normalize(id);
      const el = document.getElementById(id);
      if (el) {
        if (el.src) return el.src;
        if (el.href) return el.href;
        return \`file://\${id}\`;
      }
      if (isNotebook(id)) id = \`https://api.observablehq.com/\${id}.js?v=4\`;
      return defaultResolve(id, parentUrl);
    },
    source(url, fetchOpts, parent, defaultSourceHook) {
      if (url.startsWith("file://")) {
        const id = url.slice(7);
        const el = document.getElementById(id);
        if (!el) return { type: "js", source: "throw new Error('DVF 404')" };
        const enc = (el.getAttribute("data-encoding") || "text").toLowerCase();
        const mime = el.getAttribute("data-mime");
        if (enc === "text" && mime === "application/javascript")
          return { type: "js", source: el.textContent || "" };
        if (enc === "text" && mime === "application/json")
          return { type: "json", source: el.textContent || "" };
        // base64 / gzip handled by fetch
      }
      return defaultSourceHook(url, fetchOpts, parent);
    },
    fetch(url, options, parent) {
      if (typeof url !== "string" || !url.startsWith("file://")) {
        return fetch(url, options);
      }
      const id = url.slice(7);
      return dvfResponseSync(id); // must be synchronous
    }
  };

  // --- unify classic <script src>, XHR, and global fetch ---

  async function blobUrlForId(id) {
    const r = await dvfBytes(id);
    if (r.status !== 200) throw new Error("DVF " + r.status);
    return URL.createObjectURL(new Blob([r.bytes], { type: r.mime }));
  }

  // <script src="file://...">, img, etc.
  (function patchScriptSrc(){
    const _create = Document.prototype.createElement;
    Document.prototype.createElement = function(name, opts) {
      const el = _create.call(this, name, opts);
      const tag = String(name).toLowerCase();
      if (tag === "script") {
        if ( tag === "img") debugger;
        const d = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src");
        Object.defineProperty(el, "src", {
          configurable: true,
          get: () => d.get.call(el),
          set: (v) => {
            if (typeof v === "string") {
              if (v.startsWith("file://")) {
                v = v.slice(7);
              }
            }
            if (document.getElementById(v)) {
              blobUrlForId(v).then(u => d.set.call(el, u));
            } else {
              d.set.call(el, v);
            }
          }
        });
      }
      return el;
    };
  })();

  // XHR open("GET", "file://id", ...)
  (function patchXHR(){
    const _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      if (typeof url === "string" && url.startsWith("file://")) {
        blobUrlForId(url.slice(7)).then(u => _open.call(this, method, u, ...rest));
        return;
      }
      return _open.call(this, method, url, ...rest);
    };
  })();

  // Global fetch for app code
  (function patchFetch(){
    const _fetch = globalThis.fetch;
    globalThis.fetch = function(url, init) {
      if (typeof url === "string") {
        let id;
        if (url.startsWith("file://")) {
          id = url.slice(7);
        } else {
          id = normalize(url);
          if (!document.getElementById(id)) {
            id = null;
          }
        }
        if (id) {
          // reuse the same logic as esms, but async to materialize bytes for callers
          return dvfBytes(id).then(r => {
            if (r.status !== 200) return new Response(null, { status: r.status });
            return new Response(r.bytes, {
              status: 200,
              headers: { "Content-Type": r.mime, "Content-Length": String(r.bytes.byteLength) }
            });
          });
        }
      }
      return _fetch(url, init);
    };

    window.lopecode = {
      dvfBytes,
      contentSync: (id) => {
        const el = document.getElementById(id);
        if (!el) return { status: 404 };
    
        const mime = el.getAttribute("data-mime");
        if (!mime) return { status: 415 };
    
        const enc = (el.getAttribute("data-encoding") || "text").toLowerCase();
        const text = el.textContent || "";
    
        try {
          if (enc === "text") {
            const bytes = new TextEncoder().encode(text);
            return { status: 200, mime, bytes };
          }
          if (enc === "base64") {
            const bytes = b64ToBytes(text);
            return { status: 200, mime, bytes };
          }
        } catch {
          return { status: enc.includes("gzip") ? 499 : 422 };
        }
        return { status: 422 };
      }
    }
  })();`
)}

function _lopebook(diskDataUrl,networking_script,task,inlineModule,inlineGzipModule,es_module_shims,runtime_gz,inspector_gz,lopemodule){return(
async (
  bundle,
  { title, head, bootloader, headless = false, hash } = {}
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>${title}</title>
  ${head ? head : `<link rel="icon" href="${diskDataUrl}">`}
</head>
<body>
<!-- Networking -->
<script id="networking_script">${networking_script}
</script>

<!-- CSS -->
<!-- Style sheets from https://github.com/observablehq/notebook-kit
Copyright 2025 Observable, Inc.

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
-->
${task.options.style
  .map(([url, content]) => inlineModule(url, content, { mime: "text/css" }))
  .join("\n")}
<style>
body .inputs-3a86ea-table thead th {
  background: var(--theme-foreground-faintest);
}
</style>

<!-- System Modules -->
${inlineGzipModule("es-module-shims@2.6.2", es_module_shims)}
${inlineGzipModule("@observablehq/runtime@6.0.0", runtime_gz)}
${inlineGzipModule("@observablehq/inspector@5.0.1", inspector_gz)}

${(
  await Promise.all(
    [...bundle.modules.values()]
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((module) => lopemodule(module))
  )
).join("")}

<!-- Bootloader -->
<script id="bootconf.json" 
        type="text/plain"
        data-mime="application/json"
>
{
  "mains": ${JSON.stringify([...task.mains.keys()])},
  "hash": "${hash}",
  "headless": ${headless}
}
</script>
${inlineModule(
  bootloader,
  await (
    await fetch(`https://api.observablehq.com/${bootloader}.js?v=4`)
  ).text()
)}

<script type="module" id="main">
  await window.esmsInitOptions.fetch("file://es-module-shims@2.6.2").text().then(src => {
    const script = document.createElement('script');
    script.textContent = src;
    document.head.appendChild(script);
  });

${task.options.style
  .map(
    ([url, content], i) =>
      `  const style${i} = await importShim("${url}", { with: { type: 'css' } });`
  )
  .join("\n")}
  document.adoptedStyleSheets = [${task.options.style.map(
    ([url, content], i) => `style${i}.default`
  )}];
  
  const { Runtime } = await importShim("@observablehq/runtime@6.0.0");
  const { Inspector } = await importShim("@observablehq/inspector@5.0.1");
  const notebook = document.querySelector("notebook");
  const runtime = new Runtime({__ojs_runtime: () => runtime, __ojs_observer: () => observer});
  const observer = Inspector.into(document.body);
  const {default: define} = await importShim("${bootloader}");
  runtime.bootloader = runtime.module(define, () => ({}));
</script>
</body>
</html>`
)}

function _lopemodule(TRACE_MODULE,CSS,arrayBufferToBase64,inlineModule,escapeScriptTags){return(
async (module) => {
  if (module.url === TRACE_MODULE) {
    debugger;
  }
  const files = module.fileAttachments
    ? await Promise.all(
        [...module.fileAttachments.entries()].map(
          async ([name, attachment]) => {
            const url = attachment.url || attachment;
            const file_url = `${module.url}/${encodeURIComponent(name)}`;
            // Get from local when possible
            const lopefile =
              !url.startsWith("blob:") &&
              document.querySelector(
                `script[type=lope-file][module='${CSS.escape(
                  module.url
                )}'][file='${CSS.escape(encodeURIComponent(name))}']`
              );
            let data64,
              mime = undefined;
            if (!lopefile) {
              const response = await fetch(url);
              data64 = await response.arrayBuffer().then(arrayBufferToBase64);
              mime = response.headers.get("content-type");
            } else {
              data64 = lopefile.textContent;
              mime = lopefile.getAttribute("mime");
            }
            return `<script id="${file_url}" 
  type="text/plain"
  data-encoding="base64"
  data-mime="${mime}"
>
${data64}
</script>`;
            // return `<script type="lope-file" module="${
            //   module.url
            // }" file="${encodeURIComponent(
            //   name
            // )}" mime="${mime}">${data64}</script>\n`;
          }
        )
      )
    : [];
  return `${files.join("\n")}\n${inlineModule(
    module.url,
    escapeScriptTags(module.source)
  )}\n`;
}
)}

function _escapeScriptTags(){return(
(str) => str.replaceAll("</script", "</scr\\ipt")
)}

function _arrayBufferToBase64(){return(
async function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return btoa(binary);
}
)}

function _78(md){return(
md`### Global Output`
)}

function _output(Inputs){return(
Inputs.input(undefined)
)}

function _80(md){return(
md`## Utils`
)}

function _getCompactISODate(){return(
function getCompactISODate() {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
)}

function _82(md){return(
md`## Additional Tests`
)}

function _exporter_module(thisModule){return(
thisModule()
)}

function _diskDataUrl(disk_svg){return(
`data:image/svg+xml;base64,${btoa(disk_svg("white").outerHTML)
  .replaceAll('<?xml version="1.0" ?>', "")
  .replaceAll("\n", "")}`
)}

function _95(robocoop3){return(
robocoop3()
)}

function _96(robocoop2){return(
robocoop2()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["exporter","viewof output","Event"], _2);
  main.variable(observer()).define(["downloadAnchor","forkAnchor","md"], _3);
  main.variable(observer()).define(["forkAnchor","downloadAnchor","md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof theme_assets")).define("viewof theme_assets", ["Inputs","themes","current_theme"], _theme_assets);
  main.variable(observer("theme_assets")).define("theme_assets", ["Generators", "viewof theme_assets"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","htl"], _10);
  main.variable(observer("themes")).define("themes", _themes);
  main.variable(observer("cssForTheme")).define("cssForTheme", ["themes","extra_css"], _cssForTheme);
  main.variable(observer("css")).define("css", ["theme_assets","extra_css"], _css);
  main.variable(observer("extra_css")).define("extra_css", _extra_css);
  main.variable(observer("current_theme")).define("current_theme", ["themes"], _current_theme);
  main.variable(observer()).define(["disk_svg"], _16);
  main.variable(observer("disk_svg")).define("disk_svg", ["html"], _disk_svg);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("exporter")).define("exporter", ["actionHandler","css","keepalive","exporter_module","variable","domView","view","disk_svg","Inputs","createShowable","top120List","themes","viewof theme_assets","bindOneWay"], _exporter);
  main.variable(observer("copyTextToClipboard")).define("copyTextToClipboard", ["globalThis"], _copyTextToClipboard);
  main.variable(observer("htmlToConsoleSnippet")).define("htmlToConsoleSnippet", ["utf8ToBase64"], _htmlToConsoleSnippet);
  main.variable(observer("exportAnchor")).define("exportAnchor", ["Node","notebook_name","main","_runtime","exportToHTML","location","getCompactISODate"], _exportAnchor);
  main.variable(observer("forkAnchor")).define("forkAnchor", ["exportAnchor"], _forkAnchor);
  main.variable(observer("downloadAnchor")).define("downloadAnchor", ["exportAnchor"], _downloadAnchor);
  main.variable(observer("actionHandler")).define("actionHandler", ["Inputs","getSourceModule","notebook_name","_runtime","exportToHTML","htmlToConsoleSnippet","copyTextToClipboard","view","location","getCompactISODate"], _actionHandler);
  main.variable(observer("exportToHTML")).define("exportToHTML", ["_runtime","cssForTheme","css","location","keepalive","exporter_module","viewof task"], _exportToHTML);
  main.variable(observer("getSourceModule")).define("getSourceModule", ["notebook_name","main","_runtime"], _getSourceModule);
  main.variable(observer("createShowable")).define("createShowable", ["variable","view"], _createShowable);
  main.variable(observer("reportValidity")).define("reportValidity", _reportValidity);
  main.variable(observer("top120List")).define("top120List", _top120List);
  main.variable(observer("notebook_name")).define("notebook_name", _notebook_name);
  main.variable(observer("notebook_title")).define("notebook_title", ["notebook_name","_runtime"], _notebook_title);
  main.variable(observer("utf8ToBase64")).define("utf8ToBase64", _utf8ToBase64);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("TRACE_MODULE")).define("TRACE_MODULE", _TRACE_MODULE);
  main.variable(observer("viewof task")).define("viewof task", ["flowQueue"], _task);
  main.variable(observer("task")).define("task", ["Generators", "viewof task"], (G, _) => G.input(_));
  main.variable(observer()).define(["task"], _37);
  main.variable(observer("task_runtime")).define("task_runtime", ["task"], _task_runtime);
  main.variable(observer("runtime_variables")).define("runtime_variables", ["task_runtime","variableToObject"], _runtime_variables);
  main.variable(observer("module_map")).define("module_map", ["moduleMap","task_runtime","task"], _module_map);
  main.variable(observer()).define(["resolve_modules"], _41);
  main.variable(observer()).define(["summary"], _42);
  main.variable(observer("excluded_module_names")).define("excluded_module_names", ["submit_summary"], _excluded_module_names);
  main.variable(observer("excluded_modules")).define("excluded_modules", ["module_map","excluded_module_names"], _excluded_modules);
  main.variable(observer("included_modules")).define("included_modules", ["module_map","excluded_module_names"], _included_modules);
  main.variable(observer("moduleLookup")).define("moduleLookup", ["included_modules"], _moduleLookup);
  main.variable(observer("module_specs")).define("module_specs", ["task","cellMap","task_runtime","module_map","included_modules","TRACE_MODULE","getFileAttachments","main","generate_module_source","moduleLookup"], _module_specs);
  main.variable(observer("findImports")).define("findImports", _findImports);
  main.variable(observer("getFileAttachments")).define("getFileAttachments", _getFileAttachments);
  main.variable(observer("book")).define("book", ["lopebook","task","module_specs"], _book);
  main.variable(observer()).define(["Inputs","module_specs"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("report")).define("report", ["DOMParser","book"], _report);
  main.variable(observer("tomlarkworthy_exporter_task")).define("tomlarkworthy_exporter_task", ["book","report","exporter_module","viewof task"], _tomlarkworthy_exporter_task);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("generate_module_source")).define("generate_module_source", ["generate_definitions","generate_define"], _generate_module_source);
  main.variable(observer("generate_definitions")).define("generate_definitions", ["cellToDefinition","importCell"], _generate_definitions);
  main.variable(observer("generate_define")).define("generate_define", ["cellToDefines"], _generate_define);
  main.variable(observer("isLiveImport")).define("isLiveImport", _isLiveImport);
  main.variable(observer("contentHash")).define("contentHash", _contentHash);
  main.variable(observer("cellToDefinition")).define("cellToDefinition", ["isLiveImport","contentHash"], _cellToDefinition);
  main.variable(observer("importCell")).define("importCell", _importCell);
  main.variable(observer("cellToDefines")).define("cellToDefines", ["sourceModule","findModuleName","findImportedName","isLiveImport","contentHash"], _cellToDefines);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("es_module_shims")).define("es_module_shims", _es_module_shims);
  main.variable(observer("runtime_gz")).define("runtime_gz", _runtime_gz);
  main.variable(observer("inspector_gz")).define("inspector_gz", _inspector_gz);
  main.variable(observer("inlineModule")).define("inlineModule", _inlineModule);
  main.variable(observer("inlineGzipModule")).define("inlineGzipModule", _inlineGzipModule);
  main.variable(observer("normalize")).define("normalize", _normalize);
  main.variable(observer("test_normalize")).define("test_normalize", ["expect","normalize"], _test_normalize);
  main.variable(observer("isNotebook")).define("isNotebook", _isNotebook);
  main.variable(observer("networking_script")).define("networking_script", ["normalize","isNotebook"], _networking_script);
  main.variable(observer("lopebook")).define("lopebook", ["diskDataUrl","networking_script","task","inlineModule","inlineGzipModule","es_module_shims","runtime_gz","inspector_gz","lopemodule"], _lopebook);
  main.variable(observer("lopemodule")).define("lopemodule", ["TRACE_MODULE","CSS","arrayBufferToBase64","inlineModule","escapeScriptTags"], _lopemodule);
  main.variable(observer("escapeScriptTags")).define("escapeScriptTags", _escapeScriptTags);
  main.variable(observer("arrayBufferToBase64")).define("arrayBufferToBase64", _arrayBufferToBase64);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("viewof output")).define("viewof output", ["Inputs"], _output);
  main.variable(observer("output")).define("output", ["Generators", "viewof output"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("getCompactISODate")).define("getCompactISODate", _getCompactISODate);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer("viewof exporter_module")).define("viewof exporter_module", ["thisModule"], _exporter_module);
  main.variable(observer("exporter_module")).define("exporter_module", ["Generators", "viewof exporter_module"], (G, _) => G.input(_));
  main.variable(observer("diskDataUrl")).define("diskDataUrl", ["disk_svg"], _diskDataUrl);
  const child1 = runtime.module(define1);
  main.import("flowQueue", child1);
  const child2 = runtime.module(define2);
  main.import("cellMap", child2);
  const child3 = runtime.module(define3);
  main.import("findModuleName", child3);
  main.import("sourceModule", child3);
  main.import("findImportedName", child3);
  main.import("variableToObject", child3);
  main.import("parser", child3);
  main.import("decompress_url", child3);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  main.import("variable", child4);
  main.import("bindOneWay", child4);
  const child5 = runtime.module(define5);
  main.import("reversibleAttach", child5);
  const child6 = runtime.module(define6);
  main.import("localStorageView", child6);
  const child7 = runtime.module(define7);
  main.import("domView", child7);
  const child8 = runtime.module(define8);
  main.import("moduleMap", child8);
  main.import("resolve_modules", child8);
  main.import("submit_summary", child8);
  main.import("summary", child8);
  main.import("forcePeek", child8);
  const child9 = runtime.module(define9);
  main.import("thisModule", child9);
  main.import("keepalive", child9);
  main.import("runtime", "_runtime", child9);
  main.import("main", child9);
  const child10 = runtime.module(define10);
  main.import("expect", child10);
  main.variable(observer()).define(["robocoop3"], _95);
  main.variable(observer()).define(["robocoop2"], _96);
  const child11 = runtime.module(define11);
  main.import("robocoop3", child11);
  return main;
}
