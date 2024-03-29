import define1 from "./027541187c96745d@145.js";
import define2 from "./dff1e917c89f5e76@1709.js";
import define3 from "./f92778131fd76559@1169.js";
import define4 from "./4a1fa3c167b752e5@304.js";
import define5 from "./9bed702f80a3797e@402.js";
import define6 from "./316f0885d15ab671@65.js";
import define7 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# UI Components
`
)});
  const child1 = runtime.module(define1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("firebase", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.import("Response", child2);
  main.import("getContext", child2);
  main.variable(observer()).define(["toc"], function(toc){return(
toc()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Design`
)});
  main.variable(observer("colors")).define("colors", function(){return(
{
  dark: "#4A44C4",
  dark_darker: "#3933A3",
  dark_darkest: "#2B277C",

  light: "#FDF7E6",
  light_darker: "#FBF0D1",
  light_darkest: "#F9E8B8",

  alt_light: "#9DE2BF",
  alt_light_darker: "#75D6A5",
  alt_light_darkest: "#4ECB8B",

  alt_dark: "#E78AAE",
  alt_darker: "#DE5E90",
  alt_darkest: "#D53472"
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Header`
)});
  main.variable(observer()).define(["exampleHeader"], function(exampleHeader){return(
exampleHeader
)});
  main.variable(observer("viewof exampleHeader")).define("viewof exampleHeader", ["serverlessCellUI"], function(serverlessCellUI)
{
  const ui = serverlessCellUI({
    namespace: 'endpointservices',
    endpoint:
      "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint"
  });
  return ui;
}
);
  main.variable(observer("exampleHeader")).define("exampleHeader", ["Generators", "viewof exampleHeader"], (G, _) => G.input(_));
  main.variable(observer()).define(function()
{
  return ({}["blah"] || {})["foo"];
}
);
  main.variable(observer("serverlessCellUI")).define("serverlessCellUI", ["viewroutine","viewof user","ask","headerLogin","headerCreator","headerNotCreator"], function(viewroutine,$0,ask,headerLogin,headerCreator,headerNotCreator){return(
(config, invalidation) =>
  viewroutine(async function* () {
    while (true) {
      if (!$0.value || $0.value.then) {
        yield* ask(headerLogin(config));
      } else {
        if (
          ((await $0.value.getIdTokenResult()).claims[
            "observablehq.com"
          ] || {})[config.namespace]
        ) {
          yield* ask(
            headerCreator(
              {
                ...config,
                user: $0.value
              },
              invalidation
            )
          );
        } else {
          yield* ask(
            headerNotCreator(
              {
                ...config,
                user: $0.value
              },
              invalidation
            )
          );
        }
      }
    }
  })
)});
  main.variable(observer("viewof exampleHeaderActive")).define("viewof exampleHeaderActive", ["headerCreator","user"], function(headerCreator,user){return(
headerCreator({
  namespace: 'tomlarkworthy',
  endpoint: "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
  user
})
)});
  main.variable(observer("exampleHeaderActive")).define("exampleHeaderActive", ["Generators", "viewof exampleHeaderActive"], (G, _) => G.input(_));
  main.variable(observer("headerCreator")).define("headerCreator", ["supress","view","Inputs","viewof user","variable","urlTitle","normalizeObservablehqEndpoint","tabbedPane","statusPane","secretsPane","style"], function(supress,view,Inputs,$0,variable,urlTitle,normalizeObservablehqEndpoint,tabbedPane,statusPane,secretsPane,style){return(
(config, invalidation) => {
  const ui = supress(view`<details open class="e-header-details">
    ${["_user", Inputs.input($0.value)]}
    ${["_href", variable(config.endpoint)]}
    <summary style="width: 100%;">
      ${urlTitle({
        url: config.endpoint,
        text: normalizeObservablehqEndpoint(config.endpoint)
      })}
      ${$0}
    </summary>
    ${tabbedPane({
      status: () => statusPane(config, invalidation),
      secrets: () => secretsPane(config, invalidation)
    })}
    ${style}
  </details>`);

  return ui;
}
)});
  main.variable(observer("viewof exampleHeaderNotCreator")).define("viewof exampleHeaderNotCreator", ["headerNotCreator"], function(headerNotCreator){return(
headerNotCreator({
  namespace: 'tomlarkworthy',
  endpoint:
    "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
  undefined
})
)});
  main.variable(observer("exampleHeaderNotCreator")).define("exampleHeaderNotCreator", ["Generators", "viewof exampleHeaderNotCreator"], (G, _) => G.input(_));
  main.variable(observer("headerNotCreator")).define("headerNotCreator", ["supress","view","variable","urlTitle","normalizeObservablehqEndpoint","style","viewof user","md"], function(supress,view,variable,urlTitle,normalizeObservablehqEndpoint,style,$0,md){return(
(config, invalidation) => {
  const ui = supress(view`<details class="e-header-details">
  ${["_href", variable(config.endpoint)]}
    <summary style="width: 100%;">
      ${urlTitle({
        url: config.endpoint,
        text: normalizeObservablehqEndpoint(config.endpoint)
      })}
    </summary>
    ${style}
    ${$0}
    <span style="font-size: 16px">
    ${md`⚠️ You are not an admin of ${config.namespace}, [fork](https://observablehq.com/@observablehq/fork-share-merge) into your own namespace to configure or debug it.`}
    </span>`);
  return ui;
}
)});
  main.variable(observer("viewof exampleHeaderLogin")).define("viewof exampleHeaderLogin", ["headerLogin"], function(headerLogin){return(
headerLogin({
  namespace: 'tomlarkworthy',
  endpoint:
    "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
  undefined
})
)});
  main.variable(observer("exampleHeaderLogin")).define("exampleHeaderLogin", ["Generators", "viewof exampleHeaderLogin"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleHeaderLogin"], function(exampleHeaderLogin){return(
exampleHeaderLogin
)});
  main.variable(observer("headerLogin")).define("headerLogin", ["supress","view","variable","urlTitle","normalizeObservablehqEndpoint","viewof user","style"], function(supress,view,variable,urlTitle,normalizeObservablehqEndpoint,$0,style){return(
config =>
  supress(view`<details class="e-header-details">
  ${['_href', variable(config.endpoint)]}
  <summary style="width: 100%;">
    ${urlTitle({
      url: config.endpoint,
      text: normalizeObservablehqEndpoint(config.endpoint)
    })}
    ${$0}
  </summary>
  ${style}
</details>`)
)});
  main.variable(observer("headerCSS")).define("headerCSS", ["html","colors"], function(html,colors){return(
html`<style>
  .e-box {
    font-size: 17px;
    border-radius: 16px;
    background-color: ${colors.light};
    padding: 8px;
    border: solid;
    border-width: 4px;
    border-color: ${colors.dark};
    color: ${colors.dark};
    box-shadow: 1px 2px 4px #0008;
  }

  .e-header-details > summary {
    list-style-type: none;
  }

  .e-header-details > summary::-webkit-details-marker {
    display: none;
  }

  .e-header-details > summary::before {
    content: '▶';
  }

  .e-header-details[open] > summary::before {
    content: '▼';
  }

  .e-header-details {
    font-size: 40px;
    font-family: Courier, monospace;
  }

  .e-header-details[open] > summary {
  }

</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### link`
)});
  main.variable(observer()).define(["externalLinkSVG"], function(externalLinkSVG){return(
externalLinkSVG()
)});
  main.variable(observer("externalLinkSVG")).define("externalLinkSVG", ["svg","colors"], function(svg,colors){return(
() => svg`<svg style="vertical-align:top; padding-right: 10px" width=32 height=32 viewbox="-5 -5 110 110" stroke="${colors.dark}" fill="none" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">
  <polyline points="85,40 85,85 15,85 15,15 60,15"/>
  <polyline points="50,50 100,0 70,0 100,0 100,30"/>
`
)});
  main.variable(observer()).define(["colors"], function(colors){return(
colors
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Title`
)});
  main.variable(observer("viewof exampleTitle")).define("viewof exampleTitle", ["urlTitle"], function(urlTitle){return(
urlTitle({
  url:
    'https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint',
  text: '@endpointservices/auth;authorization_endpoint'
})
)});
  main.variable(observer("exampleTitle")).define("exampleTitle", ["Generators", "viewof exampleTitle"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleTitle"], function(exampleTitle){return(
exampleTitle
)});
  main.variable(observer("urlTitle")).define("urlTitle", ["view","variable","externalLinkSVG","textNodeView"], function(view,variable,externalLinkSVG,textNodeView){return(
({ url, text } = {}) => {
  const ui = view`<a class="e-code-title" href=${[
    "url",
    variable(url)
  ]} target="_blank">${externalLinkSVG()}<span style="position:relative; top: 5px">${[
    "text",
    textNodeView(text)
  ]}</span></a>`;
  return ui;
}
)});
  main.variable(observer("supress")).define("supress", ["view"], function(view){return(
_view => {
  _view.addEventListener('input', evt => {
    if (evt?.detail?.user === undefined) evt.stopPropagation();
  });
  return view`<span>${['...', _view]}`;
}
)});
  main.variable(observer("titleCSS")).define("titleCSS", ["html","colors"], function(html,colors){return(
html`<style>
  .e-code-title {
    width: 60%;
    display: inline-block;
    overflow-wrap: break-word;
    box-sizing: border-box;
    font-family: courier, monospace;
    font-size: 14px;
    border-radius: 16px;
    background-color: ${colors.alt_light};
    border-color: ${colors.alt_dark};
    padding: 8px;
    border: solid;
    border-width: 4px;
    border-color: ${colors.dark};
    color: ${colors.dark};
    box-shadow: 1px 2px 4px #0008;
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Tabs`
)});
  main.variable(observer("viewof tabsExample")).define("viewof tabsExample", ["tabs"], function(tabs){return(
tabs({
  options: ["secrets", "logs"],
  active: "logs"
})
)});
  main.variable(observer("tabsExample")).define("tabsExample", ["Generators", "viewof tabsExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["tabsExample"], function(tabsExample){return(
tabsExample
)});
  main.variable(observer("tabs")).define("tabs", ["Event","htl"], function(Event,htl){return(
({ options = [], active } = {}) => {
  const select = (option, evt) => {
    ui.querySelector(".e-tab-active").classList.remove("e-tab-active");
    evt.target.classList.add("e-tab-active");
    ui.value = option;
    ui.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const ui = htl.html`<div class="e-tabs">
    ${options.map(option => {
      const on = option === active;
      return htl.html`<button onclick=${e => select(option, e)} class="e-tab ${
        on ? 'e-tab-active' : ''
      }">
        ${option}
        <div class="e-tab-line"></div>
      </button>`;
    })}
  </div>`;

  ui.value = active;

  return ui;
}
)});
  main.variable(observer("tabsCSS")).define("tabsCSS", ["html","colors"], function(html,colors){return(
html`<style>
  .e-tabs {
  }
  .e-tab {
    font-size: 24px;
    border: none;
    color: ${colors.dark};
    background-color: inherit;
    font-family: arial, sans-serif;
    margin-right: 10px;
    padding: 10px
  }
  .e-tab-active {
    background-color: ${colors.light};
  }
  .e-tab-line {
    position: relative;
    height: 2px;
    width: 100%;
    bottom: -8px;
    padding: 0px;
    background: inherit;
  }

  .e-tab-active .e-tab-line {
    background: ${colors.alt_dark};
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Tabbed pane`
)});
  main.variable(observer("viewof tabbedPaneExample")).define("viewof tabbedPaneExample", ["tabbedPane","md"], function(tabbedPane,md){return(
tabbedPane({
  cool: () => md`cool`,
  nocool: () => md`not cool`
})
)});
  main.variable(observer("tabbedPaneExample")).define("tabbedPaneExample", ["Generators", "viewof tabbedPaneExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["tabbedPaneExample"], function(tabbedPaneExample){return(
tabbedPaneExample
)});
  main.variable(observer("tabbedPane")).define("tabbedPane", ["tabs","view","viewroutine"], function(tabs,view,viewroutine){return(
options => {
  const keys = Object.keys(options);
  const tabsView = tabs({
    options: keys,
    active: keys[0]
  });

  let responder = null;
  tabsView.addEventListener('input', () => responder(tabsView.value));

  return view`${tabsView}${viewroutine(async function*() {
    while (true) {
      const response = new Promise(resolve => (responder = resolve));
      yield options[tabsView.value]();
      await response;
    }
  })}`;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Tab Pane`
)});
  main.variable(observer()).define(["tabPane","html"], function(tabPane,html){return(
tabPane({
  content: html`<ul><li>one</li></ul>`
})
)});
  main.variable(observer("tabPane")).define("tabPane", ["view"], function(view){return(
({ content }) =>
  view`<div class="e-main-box">${['...', content]}</div>`
)});
  main.variable(observer("tabPaneCSS")).define("tabPaneCSS", ["html","colors","mobile"], function(html,colors,mobile){return(
html`<style>

  .e-main-box {
    display: flex;
    overflow-wrap: break-word;
    font-size: 0px;
    border-radius: 16px;
    background-color: ${colors.light};
    padding: 8px;
    border: none;
    color: ${colors.dark};
    box-shadow: 1px 2px 4px #0008;
  }

  @media (max-width: ${mobile}px) {
    .e-main-box {
      flex-direction: column;
    }
  }
</style>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Column Pane`
)});
  main.variable(observer()).define(["columnPane","htl"], function(columnPane,htl){return(
columnPane({
  content: htl.html`<span class="e-col-title">Title</span><ul><li>one</li><li>two`
})
)});
  main.variable(observer("columnPane")).define("columnPane", ["view"], function(view){return(
({ content }) =>
  view`<div class="e-col-pane">${['...', content]}</div>`
)});
  main.variable(observer("colPaneCSS")).define("colPaneCSS", ["htl","colors","mobile"], function(htl,colors,mobile){return(
htl.html`<style>

  .e-col-pane {
    width: 33%;
    font-size: 16px;
    background-color: ${colors.light};
    border: solid;
    border-radius: 8px;
    border-color: ${colors.light_darker};
    box-sizing: border-box; 
    padding: 15px;
    display: inline-block;
    vertical-align:top;
  }
  @media (max-width: ${mobile}px) {
    .e-col-pane {
      width: 100%;
    }
  }
  .e-col-title {
    font-family: arial, sans-serif;
    font-size: 24px;
    color: ${colors.dark};
    font-weight: bold;
    text-decoration: underline;
  } 
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### button`
)});
  main.variable(observer("button")).define("button", ["html","Event"], function(html,Event){return(
({ action, label, icon, cssClass = "e-btn" } = {}) => {
  const btn = html`<button class="${cssClass}">${
    icon ? html`<span class="icon">${icon.outerHTML}<span>` : ''
  }<span class="label">${label}<span></button>`;
  btn.onclick = () => {
    btn.value = action;
    btn.dispatchEvent(new Event('input', { bubbles: true }));
  };
  return btn;
}
)});
  main.variable(observer()).define(["button"], function(button){return(
button({
  label: 'cool'
})
)});
  main.variable(observer()).define(["button"], function(button){return(
button({
  label: 'cool',
  cssClass: 'e-btn2'
})
)});
  main.variable(observer()).define(["button"], function(button){return(
button({
  label: 'cool',
  cssClass: 'e-btn3'
})
)});
  main.variable(observer("buttonCSS")).define("buttonCSS", ["htl","colors"], function(htl,colors){return(
htl.html`<style>
  .e-btn {
    font-size: 18px;
    font-family: Arial, sans-serif;
    border: none;
    border-radius: 11px;
    color: ${colors.light};
    background-color: ${colors.dark};
    margin: 2px;
    padding: 3px 10px 3px 10px;
  }
  .e-btn:hover {
    color: ${colors.light_darker};
    background-color: ${colors.dark_darker};
  }
  .e-btn:active {
    color: ${colors.light_darkest};
    background-color: ${colors.dark_darkest};
  }

  .e-btn2 {
    font-size: 16px;
    font-family: Courier, monospace;
    border: solid;
    border-width: 2px;
    border-radius: 11px;
    color: ${colors.dark};
    background-color: ${colors.alt_light};
    margin: 2px;
    padding: 3px 10px 3px 10px;
  }
  .e-btn2:hover {
    color: ${colors.darker};
    background-color: ${colors.alt_light_darker};
  }
  .e-btn2:active {
    color: ${colors.darkest};
    background-color: ${colors.alt_light_darkest};
  }


  .e-btn3 {
    font-size: 18px;
    font-family: Arial, sans-serif;
    border: solid;
    border-width: 2px;
    border-radius: 11px;
    color: ${colors.dark};
    background-color: ${colors.alt_dark};
    margin: 2px;
    padding: 3px 10px 3px 10px;
  }
  .e-btn3:hover {
    color: ${colors.darker};
    background-color: ${colors.alt_darker};
  }
  .e-btn3:active {
    color: ${colors.darkest};
    background-color: ${colors.alt_darkest};
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Text input`
)});
  main.variable(observer("viewof exampleTextArea")).define("viewof exampleTextArea", ["textarea"], function(textarea){return(
textarea({ placeholder: 'enter text' })
)});
  main.variable(observer("exampleTextArea")).define("exampleTextArea", ["Generators", "viewof exampleTextArea"], (G, _) => G.input(_));
  main.variable(observer("viewof exampleTextAreaReadonly")).define("viewof exampleTextAreaReadonly", ["textarea"], function(textarea){return(
textarea({
  readOnly: true
})
)});
  main.variable(observer("exampleTextAreaReadonly")).define("exampleTextAreaReadonly", ["Generators", "viewof exampleTextAreaReadonly"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleTextArea"], function(exampleTextArea){return(
exampleTextArea
)});
  main.variable(observer()).define(["exampleTextAreaReadonly"], function(exampleTextAreaReadonly){return(
exampleTextAreaReadonly.text = "cool beans"
)});
  main.variable(observer("textarea")).define("textarea", ["variable","view","html"], function(variable,view,html){return(
({
  readOnly = false,
  rows = "4",
  cssClass = "e-textarea",
  placeholder = ''
} = {}) => {
  const readOnlyVar = variable(readOnly, { name: 'readonly' });
  const btn = view`<span>${['readOnly', readOnlyVar]}${[
    'text',
    html`<textarea rows="${rows}" ${
      readOnly ? 'readonly' : ''
    } placeholder="${placeholder}" class="${cssClass}">`
  ]}`;
  const updateReadonly = () => {
    btn.querySelector(`.${cssClass}`).readOnly = readOnlyVar.value;
  };

  readOnlyVar.addEventListener('assign', updateReadonly);
  updateReadonly();
  return btn;
}
)});
  main.variable(observer("textAreaCSS")).define("textAreaCSS", ["html","colors"], function(html,colors){return(
html`<style>
  .e-textarea {
    font-size: 16px;
    font-family: Courier, monospace;
    border: solid;
    border-width: 2px;
    border-radius: 11px;
    color: ${colors.dark};
    width: 100%;
    background-color: ${colors.alt_light};
    margin: 2px;
    padding: 3px 10px 3px 10px;
    box-sizing: border-box; 
  }
  .e-textarea:hover:read-write  {
    color: ${colors.dark_darker};
    background-color: ${colors.alt_light_darker};
  }
  .e-textarea:focus:read-write {
    color: ${colors.dark_darkest};
    background-color: ${colors.alt_light_darkest};
  }

</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Backwritable listSelector`
)});
  main.variable(observer("listRow")).define("listRow", ["variable","view","textNodeView"], function(variable,view,textNodeView){return(
groupname => ({ code, content = code } = {}) => {
  const codeVariable = variable(code, { name: "code" });
  const ui = view`<tr class="e-list-row"><td class="e-list-item">
        ${['code', codeVariable]}
        <input style="display: none;" type="radio" id="${codeVariable}" name=${groupname}><label class="e-list-option" for="${codeVariable}">${[
    'content',
    textNodeView(content)
  ]}</label>
        </td></tr>`;
  codeVariable.addEventListener("assign", () => {
    ui.querySelector("input").id = codeVariable.value;
    ui.querySelector("label").htmlFor = codeVariable.value;
  });
  return ui;
}
)});
  main.variable(observer("viewof exampleListRow")).define("viewof exampleListRow", ["listRow"], function(listRow){return(
listRow("testGroup")({
  code: "bling",
  content: "the content"
})
)});
  main.variable(observer("exampleListRow")).define("exampleListRow", ["Generators", "viewof exampleListRow"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleListRow"], function(exampleListRow){return(
exampleListRow
)});
  main.variable(observer()).define(["viewof exampleListRow","Event"], function($0,Event)
{
  $0.value.code = 'fum';
  $0.value.content = 'foo';
  $0.dispatchEvent(new Event('input'), { bubbles: true });
}
);
  main.variable(observer("listSelector")).define("listSelector", ["variable","view","listRow"], function(variable,view,listRow){return(
({ items = [], groupname = "listSelection" } = {}) => {
  const selected = variable(undefined, { name: "selected" });

  const ui = view`<form>${[
    'selected',
    selected
  ]}<table class="e-list-table"><tbody class="e-list-tbody">${[
    "items",
    [],
    listRow(groupname)
  ]}</tbody></table>`;

  ui.value.items = items;
  selected.addEventListener('assign', s => {
    ui.querySelector(`input#${selected.value}`).checked = true;
  });

  ui.addEventListener('input', s => {
    [...ui.querySelectorAll('input')].find(el => {
      if (el.checked) {
        selected.value = el.id;
      }
    });
  });

  return ui;
}
)});
  main.variable(observer("setExampleItems")).define("setExampleItems", ["viewof exampleListSelector","Event"], function($0,Event)
{
  $0.value.items = [
    {
      code: "brown",
      content: `brown`
    },
    {
      code: "blue",
      content: `blue`
    },
    {
      code: "green",
      content: `green`
    },
    {
      code: "red",
      content: `red`
    }
  ];
  $0.dispatchEvent(
    new Event('input', { bubbles: true })
  );
}
);
  main.variable(observer()).define(["exampleListSelector"], function(exampleListSelector){return(
exampleListSelector
)});
  main.variable(observer()).define(["viewof exampleListSelector"], function($0){return(
$0
)});
  main.variable(observer("viewof exampleListSelector")).define("viewof exampleListSelector", ["listSelector"], function(listSelector){return(
listSelector({
  groupname: "eg",
  items: [
    {
      code: "red",
      content: `red`
    },
    {
      code: "green",
      content: `green`
    }
  ]
})
)});
  main.variable(observer("exampleListSelector")).define("exampleListSelector", ["Generators", "viewof exampleListSelector"], (G, _) => G.input(_));
  main.variable(observer("listSelectorCSS")).define("listSelectorCSS", ["htl","colors"], function(htl,colors){return(
htl.html`<style>
  .e-list-table {
      background-color: ${colors.light_darker};
      width: 100%;
      display: block;
      padding: 10px 5px 10px 5px;
      border-radius: 9px;
  }
  .e-list-tbody {
      width: 100%;
      display: block;
      height: 130px;       /* Just for the demo          */
      overflow-y: auto;    /* Trigger vertical scroll    */
      overflow-x: hidden;  /* Hide the horizontal scroll */
  }
  .e-list-row {
    width: 100%;
    display: block;
  }
  .e-list-item {
    box-sizing: border-box;
    padding-right: 15px;
    width: 100%;
    display: block;
  }
  .e-list-option {

    width: 100%;
    display: block;
    font-size: 16px;
    font-family: Courier, monospace;
    text-align: center;
    border: solid;
    border-width: 2px;
    border-radius: 8px;
    color: ${colors.dark};
    background-color: ${colors.alt_light};
    margin: 2px;
    padding: 2px;
  }
  .e-list-option:hover {
    background-color: ${colors.alt_light_darker};
  }
  .e-list-option:active {
    background-color: ${colors.alt_light_darkest};
  }
  input[type="radio"]:checked+label {

    margin-right: 100px;
    color: ${colors.alt_light};
    border-color: ${colors.dark};
    background-color: ${colors.dark};
    font-weight: bold;
  }

  /* width */
  .e-list-table ::-webkit-scrollbar {
    width: 20px;
  }
  /* Track */
  .e-list-table ::-webkit-scrollbar-track {
    background: ${colors.light_darkest};
    border-radius: 10px;
  }
  
  .e-list-table ::-webkit-scrollbar-thumb {
    background: ${colors.alt_darker};
    border-radius: 10px;
    width: 10px;
    height: 50px;
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Secrets Pane

Also contains the logic
`
)});
  main.variable(observer("viewof exampleSecretsPane")).define("viewof exampleSecretsPane", ["secretsPane","user","invalidation"], function(secretsPane,user,invalidation){return(
secretsPane(
  {
    namespace: "endpointservices",
    endpoint:
      "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
    user: user
  },
  invalidation
)
)});
  main.variable(observer("exampleSecretsPane")).define("exampleSecretsPane", ["Generators", "viewof exampleSecretsPane"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleSecretsPane"], function(exampleSecretsPane){return(
exampleSecretsPane
)});
  main.variable(observer("secretsPane")).define("secretsPane", ["view","boundSecrets","storedSecrets","editSecret","firestore","normalizeEndpoint","firebase","setSecret","deleteSecret","getStoredSecrets"], function(view,boundSecrets,storedSecrets,editSecret,firestore,normalizeEndpoint,firebase,setSecret,deleteSecret,getStoredSecrets){return(
({ namespace, endpoint, user } = {}, invalidation) => {
  const ui = view`<div class='e-main-box'>
      ${["bindings", boundSecrets({ namespace, endpoint })]}
      ${["stored", storedSecrets({ namespace, endpoint })]}
      ${["edit", editSecret({ disabled: true })]}
    </div>`;

  const CREATE = "Create";
  const UPDATE = "Update";

  ui.value.stored.namespace = namespace;
  const configDoc = firestore.doc(
    `/services/http/endpoints/${encodeURIComponent(
      normalizeEndpoint(endpoint)
    )}`
  );

  // Subscribe to config changes
  invalidation.then(
    configDoc.onSnapshot((snap) => {
      const val = snap.data();
      // update bindings
      ui.value.bindings.secrets.items = Object.keys(val?.secrets || []).map(
        (name) => ({
          code: "bound_" + name,
          content: name.replace(namespace + "_", "")
        })
      );
    })
  );

  // on bind click, add the selected stored secret to the secret config
  ui.bindings.singleton.bind.addEventListener("input", () => {
    const selected = ui.value.stored.secrets.selected;
    configDoc.set(
      {
        namespace: namespace,
        secrets: {
          [selected]: true
        }
      },
      { merge: true }
    );
  });

  // on unbind click, remove the selected secret
  ui.bindings.singleton.unbind.addEventListener("input", () => {
    const selected = ui.value.bindings.secrets.selected.substring(
      "bound_".length
    );
    console.log("unbound", selected);
    configDoc.set(
      {
        namespace: namespace,
        secrets: {
          [selected]: firebase.firebase_.firestore.FieldValue.delete()
        }
      },
      { merge: true }
    );
  });

  // On stored click, open the editor
  ui.stored.singleton.secrets.addEventListener("input", () => {
    const selected = ui.value.stored.secrets.selected;
    console.log("selected", selected);
    if (selected) {
      ui.value.edit.disabled = false;
      ui.value.edit.action = UPDATE;
      ui.value.edit.name.text = selected.replace(namespace + "_", "");
      ui.value.edit.name.readOnly = true; // can't edit name of stored secrets
      ui.value.edit.secret.text = "";
      ui.value.edit.name.readOnly = true; // can't edit name of stored secrets
    } else {
      ui.value.edit.disabled = true;
    }
  });

  // On new click, open the editor
  ui.stored.singleton.new.addEventListener("input", () => {
    ui.value.edit.disabled = false;
    ui.value.edit.action = CREATE;
    ui.value.edit.name.text = "";
    ui.value.edit.name.readOnly = false;
    ui.value.edit.secret.text = "";
    ui.value.edit.name.readOnly = false;
  });

  // On save click, create/update
  ui.edit.singleton.save.addEventListener("input", async () => {
    ui.value.edit.disabled = true; // close
    ui.value.stored.secrets.items = [];

    if (ui.value.edit.action === CREATE) {
      console.log("Creating new secret");
      await setSecret({
        namespace,
        name: namespace + "_" + ui.value.edit.name.text,
        value: ui.value.edit.secret.text,
        user
      });
    }
    refreshStored();
  });

  // On delete click, close the editor
  ui.edit.singleton.delete.addEventListener("input", async () => {
    ui.value.edit.disabled = true; // close
    ui.value.stored.secrets.items = [];
    if (ui.value.edit.action === UPDATE) {
      console.log("Delele secret");
      await deleteSecret({
        namespace,
        name: namespace + "_" + ui.value.edit.name.text,
        user
      });
      refreshStored();
    }
  });

  async function refreshStored() {
    const secrets = await getStoredSecrets({
      namespace,
      user
    });
    ui.value.stored.used = secrets.length;
    ui.value.stored.secrets.items = secrets
      .filter((_) => _.name.startsWith(namespace))
      .map((_) => ({
        code: _.name,
        content: _.name.replace(namespace + "_", "")
      }));
  }

  refreshStored();
  return ui;
}
)});
  main.variable(observer()).define(["firestore"], function(firestore){return(
firestore.doc(`/services/http/endpoints/foo`).set({
  namespace: 'tomlarkworthy'
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Bound Secrets`
)});
  main.variable(observer("viewof exampleBoundSecrets")).define("viewof exampleBoundSecrets", ["boundSecrets"], function(boundSecrets){return(
boundSecrets({
  namespace: "tomlarkworthy",
  endpoint:
    "https://webcode.run/regions/europe-west1/observablehq.com/d/6eda90668ae03044;info"
})
)});
  main.variable(observer("exampleBoundSecrets")).define("exampleBoundSecrets", ["Generators", "viewof exampleBoundSecrets"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleBoundSecrets"], function(exampleBoundSecrets){return(
exampleBoundSecrets
)});
  main.variable(observer("boundSecrets")).define("boundSecrets", ["columnPane","view","normalizeEndpoint","listSelector","button"], function(columnPane,view,normalizeEndpoint,listSelector,button){return(
({ namespace, endpoint } = {}) => {
  if (!namespace) throw new Error("no namespace");
  if (!endpoint) throw new Error("no endpoint");

  const ui = columnPane({
    content: view`<div class="e-col-title">Bound Secrets</div><br>
    <div class="e-info"><b>endpoint:</b> <span class="e-code">${normalizeEndpoint(
      endpoint
    )}</span>
    ${[
      'secrets',
      listSelector({
        groupname: 'boundSecrets',
        items: []
      })
    ]}
    <div>
      <span style="margin-left: auto; margin-right: 0;">${[
        'unbind',
        button({
          action: "unbind",
          label: "- unbind",
          cssClass: 'e-btn3'
        })
      ]}</span>
      <span style="float: right;">${[
        'bind',
        button({
          action: "bind",
          label: "+ bind",
          cssClass: 'e-btn3'
        })
      ]}</span>
    </div>
</div`
  });

  return ui;
}
)});
  main.variable(observer()).define(["firestore"], function(firestore){return(
firestore.doc(`/services/http/endpoints/foo`).get()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Stored Secrets`
)});
  main.variable(observer("viewof exampleStoredSecrets")).define("viewof exampleStoredSecrets", ["storedSecrets"], function(storedSecrets){return(
storedSecrets({
  namespace: "tomlarkworthy"
})
)});
  main.variable(observer("exampleStoredSecrets")).define("exampleStoredSecrets", ["Generators", "viewof exampleStoredSecrets"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleStoredSecrets"], function(exampleStoredSecrets){return(
exampleStoredSecrets
)});
  main.variable(observer("storedSecrets")).define("storedSecrets", ["columnPane","view","textNodeView","listSelector","button"], function(columnPane,view,textNodeView,listSelector,button){return(
({ namespace } = {}) =>
  columnPane({
    content: view`<div class="e-col-title">Stored Secrets</div><br>
    <div class="e-info"><b>namespace:</b> <span class="e-code">${[
      'namespace',
      textNodeView(namespace)
    ]}</span>
    ${[
      'secrets',
      listSelector({
        groupname: 'storedSecrets',
        items: []
      })
    ]}
    <div>
      <span style="float: right;">${[
        'new',
        button({
          action: "new",
          label: "+ new",
          cssClass: 'e-btn3'
        })
      ]}</span>
      <p><b> Limit ${['used', textNodeView(0)]} / ${[
      'max',
      textNodeView(2)
    ]} </b></p>
    </div>
</div`
  })
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Create/edit Secret`
)});
  main.variable(observer("viewof exampleEditSecret")).define("viewof exampleEditSecret", ["editSecret"], function(editSecret){return(
editSecret({
  action: "Edit",
  secret: "my secret"
})
)});
  main.variable(observer("exampleEditSecret")).define("exampleEditSecret", ["Generators", "viewof exampleEditSecret"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleEditSecret"], function(exampleEditSecret){return(
exampleEditSecret
)});
  main.variable(observer("editSecret")).define("editSecret", ["variable","columnPane","view","textNodeView","textarea","button"], function(variable,columnPane,view,textNodeView,textarea,button){return(
({ action, secret, disabled = false } = {}) => {
  const disabledVar = variable(disabled);

  const ui = columnPane({
    content: view`<div class="e-col-title">${['disabled', disabledVar]}${[
      'action',
      textNodeView(action)
    ]} Secret</div><br>
      ${['name', textarea({ rows: 1, placeholder: "enter name" })]}
      ${['secret', textarea({ rows: 8, placeholder: "enter value" })]}
      <div>
        <span>${[
          'delete',
          button({
            action: "delete",
            label: "delete",
            cssClass: 'e-btn3'
          })
        ]}</span>
        <span style="float: right;">${[
          'save',
          button({
            action: "save",
            label: "save",
            cssClass: 'e-btn3'
          })
        ]}</span>
      </div>
  </div`
  });

  function updateVisibility() {
    if (disabledVar.value) ui.classList.add('hide');
    else ui.classList.remove('hide');
  }
  updateVisibility();

  disabledVar.addEventListener('assign', updateVisibility);

  return ui;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Status Pane`
)});
  main.variable(observer("viewof exampleStatusPane")).define("viewof exampleStatusPane", ["statusPane","invalidation"], function(statusPane,invalidation){return(
statusPane(
  {
    namespace: "tomlarkworthy",
    name: "test",
    endpoint:
      "https://webcode.run/observablehq.com/@tomlarkworthy/serverless-cell-dashboard;test"
  },
  invalidation
)
)});
  main.variable(observer("exampleStatusPane")).define("exampleStatusPane", ["Generators", "viewof exampleStatusPane"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleStatusPane"], function(exampleStatusPane){return(
exampleStatusPane
)});
  main.variable(observer("statusPane")).define("statusPane", ["view","liveCoding","apiKey","firestore","normalizeEndpoint","createChannel"], function(view,liveCoding,apiKey,firestore,normalizeEndpoint,createChannel){return(
({ namespace, endpoint, name, user } = {}, invalidation) => {
  const ui = view`<div class='e-main-box'>
      ${["livecode", liveCoding({ namespace, endpoint })]}
      ${["apiKey", apiKey({ namespace, endpoint })]}
    </div>`;

  const configDoc = firestore.doc(
    `/services/http/endpoints/${encodeURIComponent(
      normalizeEndpoint(endpoint)
    )}`
  );

  let destroyChannel = undefined;
  let currentLiveMode = undefined;

  async function updateDebugChannel(livemode) {
    console.log("updateDebugChannel", livemode);
    if (livemode === currentLiveMode) return;
    else {
      currentLiveMode = livemode;
      if (currentLiveMode) {
        destroyChannel = await createChannel({
          endpoint,
          name,
          namespace,
          newRequestCallback: (req) => {
            ui.value.livecode.tunnelled++;
          }
        });
      } else {
        if (destroyChannel) {
          destroyChannel();
          destroyChannel = undefined;
        }
      }
    }
  }

  // Subscribe to config changes
  invalidation.then(
    configDoc.onSnapshot((snap) => {
      const val = snap.data();
      console.log("config", val);
      // update bindings
      ui.value.livecode.livemode =
        val?.flags?.livemode === undefined ? true : val.flags.livemode;
      updateDebugChannel(ui.value.livecode.livemode);
      ui.value.apiKey.apiKey = val?.api_key === undefined ? "" : val?.api_key;
    })
  );

  ui.livecode.singleton.livemode.addEventListener("input", () => {
    console.log("update config");
    configDoc.set(
      {
        namespace,
        flags: {
          livemode: ui.livecode.singleton.livemode.value
        }
      },
      { merge: true }
    );
  });

  ui.apiKey.singleton.apiKey.addEventListener("input", () => {
    console.log("update config");
    configDoc.set(
      {
        namespace,
        api_key: ui.apiKey.singleton.apiKey.value
      },
      { merge: true }
    );
  });

  return ui;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Live Coding`
)});
  main.variable(observer("viewof exampleLiveCoding")).define("viewof exampleLiveCoding", ["liveCoding"], function(liveCoding){return(
liveCoding({
  endpoint:
    'https://webcode.run/regions/europe-west1/observablehq.com/d/6eda90668ae03044;info'
})
)});
  main.variable(observer("exampleLiveCoding")).define("exampleLiveCoding", ["Generators", "viewof exampleLiveCoding"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleLiveCoding"], function(exampleLiveCoding){return(
exampleLiveCoding
)});
  main.variable(observer("liveCoding")).define("liveCoding", ["columnPane","view","Inputs","textNodeView"], function(columnPane,view,Inputs,textNodeView){return(
({ livecode = true } = {}) => {
  const ui = columnPane({
    content: view`<div class="e-col-title">Live Coding</div><br>
      <p class="e-explain"><i>Live coding tunnels production traffic to your browser so you can run and debug serverside code locally and in realtime.</i></p>
      ${[
        "livemode",
        Inputs.toggle({
          label: "enable live coding",
          value: livecode
        })
      ]}
      <p class="e-explain">tunnelled: ${["tunnelled", textNodeView(0)]}</p>
  </div`
  });

  return ui;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### API key`
)});
  main.variable(observer("viewof apiKeyExample")).define("viewof apiKeyExample", ["apiKey"], function(apiKey){return(
apiKey()
)});
  main.variable(observer("apiKeyExample")).define("apiKeyExample", ["Generators", "viewof apiKeyExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["apiKeyExample"], function(apiKeyExample){return(
apiKeyExample
)});
  main.variable(observer("apiKey")).define("apiKey", ["columnPane","view","Inputs"], function(columnPane,view,Inputs){return(
({ apiKey = undefined } = {}) => {
  const ui = columnPane({
    content: view`<div class="e-col-title">API Key</div><br>
      <p class="e-explain"><i><a target="_blank" href="https://webcode.run">PRO members</a> can attach an <a href="https://observablehq.com/@observablehq/api-keys" target="_blank">API Key</a> to team notebook endpoints to make them publically reachable. The API Key and source code remain secret.</i></p>
      ${[
        "apiKey",
        Inputs.text({
          type: "password",
          label: "API key",
          value: apiKey
        })
      ]}
  </div`
  });

  return ui;
}
)});
  main.variable(observer("textNodeView")).define("textNodeView", function(){return(
(value = '') => {
  const node = document.createTextNode(value);
  return Object.defineProperty(node, 'value', {
    get: () => node.textContent,
    set: val => (node.textContent = val),
    enumerable: true
  });
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Generic Styles

has to be last so modifiers are applied last
`
)});
  main.variable(observer("mobile")).define("mobile", function(){return(
739
)});
  main.variable(observer("style")).define("style", ["html","titleCSS","buttonCSS","textAreaCSS","listSelectorCSS","tabPaneCSS","colPaneCSS","tabsCSS","headerCSS","colors"], function(html,titleCSS,buttonCSS,textAreaCSS,listSelectorCSS,tabPaneCSS,colPaneCSS,tabsCSS,headerCSS,colors){return(
html`<style>
  ${titleCSS.innerHTML}
  ${buttonCSS.innerHTML}
  ${textAreaCSS.innerHTML}
  ${listSelectorCSS.innerHTML}
  ${tabPaneCSS.innerHTML}
  ${colPaneCSS.innerHTML}
  ${tabsCSS.innerHTML}
  ${headerCSS.innerHTML}

  .e-info {
    font-size: 14px;
    color: ${colors.dark};
    font-family: arial, sans-serif;
  }

  .e-explain {
    font-size: 14px;
    color: black;
    font-family: arial, sans-serif;
  }

  .hide {
    display: none;
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Implementation`
)});
  main.variable(observer("normalizeEndpoint")).define("normalizeEndpoint", function(){return(
endpoint =>
  endpoint.replace(/https:\/\/webcode.run\/(regions\/([^/]*)\/)?/, '')
)});
  main.variable(observer("normalizeObservablehqEndpoint")).define("normalizeObservablehqEndpoint", function(){return(
endpoint =>
  endpoint.replace(
    /https:\/\/webcode.run\/(regions\/([^/]*)\/)?observablehq.com\//,
    ''
  )
)});
  main.variable(observer()).define(["normalizeObservablehqEndpoint"], function(normalizeObservablehqEndpoint){return(
normalizeObservablehqEndpoint(
  "https://webcode.run/regions/foo/observablehq.com/@endpointservices/secrets;foo"
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Secrets`
)});
  main.variable(observer("SECRET_API")).define("SECRET_API", function(){return(
"https://webcode.run/observablehq.com/@endpointservices/secrets"
)});
  main.variable(observer("secretClient")).define("secretClient", ["SECRET_API"], function(SECRET_API){return(
async (user, path, method = 'GET', body = undefined) => {
  const response = await fetch(SECRET_API + path, {
    method,
    headers: {
      idtoken: await user.getIdToken()
    },
    body
  });
  if (response.status >= 400)
    throw new Error(`${response.status}, ${await response.text()}`);
  if (response.status == 200) return await response.json();
  if (response.status == 204) return;
  throw new Error(`Unexpected code ${response.status}`);
}
)});
  main.variable(observer("getStoredSecrets")).define("getStoredSecrets", ["secretClient"], function(secretClient){return(
async ({ namespace, user } = {}) =>
  await secretClient(user, `/subdomains/${namespace}/secrets`)
)});
  main.variable(observer("setSecret")).define("setSecret", ["secretClient"], function(secretClient){return(
async ({ user, namespace, name, value }) =>
  secretClient(
    user,
    `/subdomains/${namespace}/secrets/${name}`,
    "PUT",
    JSON.stringify(btoa(value))
  )
)});
  main.variable(observer("deleteSecret")).define("deleteSecret", ["secretClient"], function(secretClient){return(
async ({ user, namespace, name }) =>
  secretClient(user, `/subdomains/${namespace}/secrets/${name}`, "DELETE")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Live code`
)});
  main.variable(observer("createChannel")).define("createChannel", ["database","randomId","firestore","normalizeEndpoint","getContext","Response"], function(database,randomId,firestore,normalizeEndpoint,getContext,Response){return(
async function createChannel({
  endpoint,
  name,
  namespace,
  newRequestCallback = () => {}
} = {}) {
  database.goOnline();
  const sessionId = await randomId(32);
  console.log("New debug session", sessionId);

  const configDoc = firestore.doc(
    `/services/http/endpoints/${encodeURIComponent(
      normalizeEndpoint(endpoint)
    )}`
  );

  // Try and keep the online flag online, by add a precense handler to automatically
  // set it to null if we lose the connection.
  database
    .ref(`services/http/debug/${sessionId}/status`)
    .on("value", async (snap) => {
      if (snap.val() === null) {
        // delete everything if we lose a connection
        database
          .ref(`services/http/debug/${sessionId}`)
          .onDisconnect()
          .remove();
        database.ref(`services/http/debug/${sessionId}/status`).set("online");
      }
    });
  // indicate in dynamic config we have a debugging channel open
  // Note, another device may switch it, for now, we don't want a tug of war so we shall
  // let it be lost
  await configDoc.set(
    {
      namespace,
      debugger: {
        // path: database.ref(`services/http/debug/${sessionId}`).path.toString()
        path: database
          .ref(`services/http/debug/${sessionId}`)
          .toString()
          .replace(
            "https://endpointservice-eu.europe-west1.firebasedatabase.app",
            ""
          )
      }
    },
    { merge: true }
  );

  // Read! listen to inbound requests and respond.
  database
    .ref(`services/http/debug/${sessionId}/requests`)
    .on("child_added", async (snap) => {
      const req = snap.val();
      newRequestCallback(req.request);
      window["@endpointservices.status"] = (status) =>
        snap.child("status").ref.set(status);
      window["@endpointservices.header"] = (key, value) =>
        snap.child(`headers/${key}`).ref.set(value);
      window["@endpointservices.write"] = (chunk) =>
        snap.child("writes").ref.push(chunk);

      // send it to the named endpoint
      const context = getContext();
      context.secrets = req?.context?.secrets || {}; // Copy secrets over wire
      try {
        const res = await window["deployments"][name](req.request, context);
        snap.child("response").ref.set(JSON.stringify(res));
      } catch (err) {
        const res = new Response();
        res
          .status(500)
          .send("<pre>\n" + (err.stack || err.message) + "\n</pre>");
        snap.child("response").ref.set(JSON.stringify(res.toData()));
      }
    });
  return () => {
    console.log("unsubscribe");
    database.ref(`services/http/debug/${sessionId}/status`).off("value");
    database
      .ref(`services/http/debug/${sessionId}/requests`)
      .off("child_added");
    database.ref(`services/http/debug/${sessionId}/status`).remove();
  };
}
)});
  main.variable(observer()).define(["deploy"], function(deploy){return(
deploy("test", async (request, response) => {
  response
    .header("foo", "bar")
    .header("foo2", "bar2")
    .status(400);
  response.write('chunk1');
  response.write('chunk2');
  response.end();
})
)});
  main.variable(observer("firestore")).define("firestore", ["firebase"], function(firebase){return(
firebase.firestore()
)});
  main.variable(observer("database")).define("database", ["firebase"], function(firebase)
{
  const db = firebase.database();
  db.goOffline();
  return db;
}
);
  const child3 = runtime.module(define3);
  main.import("view", child3);
  main.import("variable", child3);
  main.import("cautious", child3);
  const child4 = runtime.module(define4);
  main.import("viewroutine", child4);
  main.import("ask", child4);
  const child5 = runtime.module(define5);
  main.import("toc", child5);
  const child6 = runtime.module(define6);
  main.import("randomId", child6);
  const child7 = runtime.module(define7);
  main.import("footer", child7);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
