import define1 from "./027541187c96745d@147.js";
import define2 from "./dff1e917c89f5e76@1948.js";
import define3 from "./f92778131fd76559@1173.js";
import define4 from "./4a1fa3c167b752e5@304.js";
import define5 from "./9bed702f80a3797e@402.js";
import define6 from "./316f0885d15ab671@65.js";
import define7 from "./58f3eb7334551ae6@210.js";

function _1(md){return(
md`# WEBcode UI
`
)}

function _4(toc){return(
toc()
)}

function _testUser(createLogin){return(
createLogin()
)}

function _6(md){return(
md`## Design`
)}

function _colors(){return(
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
)}

function _8(md){return(
md`### Header`
)}

function _9(exampleHeader){return(
exampleHeader
)}

function _exampleHeader(serverlessCellUI,invalidation)
{
  const ui = serverlessCellUI(
    {
      namespace: "endpointservices",
      endpoint:
        "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint"
    },
    invalidation
  );
  return ui;
}


function _serverlessCellUI(createLogin,viewroutine,ask,headerLogin,headerCreator,headerNotCreator){return(
(config, invalidation) => {
  const userView = createLogin();
  // Normalise params
  if (typeof config?.options?.livecode === "string") {
    config.options.livecode = config.options.livecode.toUpperCase();
  }

  return viewroutine(async function* () {
    while (true) {
      if (!userView.value || userView.value.then) {
        yield* ask(
          headerLogin(
            {
              ...config,
              userView
            },
            invalidation
          )
        );
      } else {
        if (
          ((await userView.value.getIdTokenResult()).claims[
            "observablehq.com"
          ] || {})[config.namespace]
        ) {
          yield* ask(
            headerCreator(
              {
                ...config,
                userView
              },
              invalidation
            )
          );
        } else {
          yield* ask(
            headerNotCreator(
              {
                ...config,
                userView
              },
              invalidation
            )
          );
        }
      }
    }
  });
}
)}

function _exampleHeaderActive(headerCreator,createLogin){return(
headerCreator({
  namespace: "tomlarkworthy",
  endpoint:
    "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
  userView: createLogin()
})
)}

function _headerCreator(supress,view,style,Inputs,variable,urlTitle,normalizeObservablehqEndpoint,tabbedPane,statusPane,secretsPane){return(
(config, invalidation) => {
  const ui = supress(view`
  ${style()}
  <details open class="e-header-details">
    ${["_user", Inputs.input(config.userView.value)]}
    ${["_href", variable(config.endpoint)]}
    <summary style="width: 100%;">
      ${urlTitle({
        url: config.endpoint,
        text: normalizeObservablehqEndpoint(config.endpoint)
      })}
      ${config.userView}
    </summary>
    ${tabbedPane({
      status: () => statusPane(config, invalidation),
      secrets: () => secretsPane(config, invalidation)
    })}
  </details>`);

  return ui;
}
)}

function _exampleHeaderNotCreator(headerNotCreator,invalidation){return(
headerNotCreator(
  {
    namespace: "tomlarkworthy",
    options: {
      livecode: "PUBLIC"
    },
    endpoint:
      "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint;dh4cs",
    undefined
  },
  invalidation
)
)}

function _headerNotCreator(supress,view,style,variable,urlTitle,normalizeObservablehqEndpoint,tabbedPane,publicStatusPane,md){return(
(config, invalidation) => {
  const ui = supress(
    view`
  ${style()}
  <details class="e-header-details">
    ${["_href", variable(config.endpoint)]}
    <summary style="width: 100%;">
      ${urlTitle({
        url: config.endpoint,
        text: normalizeObservablehqEndpoint(config.endpoint)
      })}
    </summary>
    ${config.userView}
    ${tabbedPane({
      status: () => publicStatusPane(config, invalidation)
    })}
    <span style="font-size: 16px">

    ${
      config?.options?.livecode === "PUBLIC"
        ? md`🔥 This endpoint has public [livecoding](https://observablehq.com/@endpointservices/livecode) enabled. Requests made to your unique URL will be tunnelled and served by *your* browser.`
        : ""
    }
    </span>
  </details>`,
    {
      ignore: (evt) => evt?.detail?.user === undefined || evt.detail.user.then
    }
  );
  return ui;
}
)}

function _exampleHeaderLogin(headerLogin,invalidation){return(
headerLogin({
  namespace: "tomlarkworthy",
  endpoint:
    "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
  options: {
    livecode: "PUBLIC"
  },
  invalidation
})
)}

function _17(exampleHeaderLogin){return(
exampleHeaderLogin
)}

function _headerLogin(supress,view,style,variable,urlTitle,normalizeObservablehqEndpoint,html){return(
(config, invalidation) =>
  supress(
    view`
  ${style()}
  <details class="e-header-details">
    ${["_href", variable(config.endpoint)]}
    <summary style="width: 100%;">
      ${urlTitle({
        url: config.endpoint,
        text: normalizeObservablehqEndpoint(config.endpoint)
      })}
    </summary>
    <p class="e-explain">💡 If you are the host of this endpoint, login to admininister and <a href="https://observablehq.com/@endpointservices/livecode">livecode</a> the endpoint</p>
    ${
      config?.options?.livecode === "PUBLIC"
        ? html`<p class="e-explain">🔥 The owner has enabled public <a href="https://observablehq.com/@endpointservices/livecode">livecoding</a>! anybody can login to start a <a href="https://observablehq.com/@endpointservices/livecode">livecode</a> session</p>`
        : ""
    }
    ${config.userView}
  </details>`,
    {
      ignore: (evt) =>
        evt?.detail?.user === undefined ||
        evt.detail.user === null ||
        evt.detail.user.then
    }
  )
)}

function _headerCSS(html,colors){return(
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
)}

function _20(md){return(
md`### link`
)}

function _21(externalLinkSVG){return(
externalLinkSVG()
)}

function _externalLinkSVG(svg,colors){return(
() => svg`<svg style="vertical-align:top; padding-right: 10px" width=32 height=32 viewbox="-5 -5 110 110" stroke="${colors.dark}" fill="none" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">
  <polyline points="85,40 85,85 15,85 15,15 60,15"/>
  <polyline points="50,50 100,0 70,0 100,0 100,30"/>
`
)}

function _23(colors){return(
colors
)}

function _24(md){return(
md`#### Title`
)}

function _exampleTitle(urlTitle){return(
urlTitle({
  url:
    'https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint',
  text: '@endpointservices/auth;authorization_endpoint'
})
)}

function _26(exampleTitle){return(
exampleTitle
)}

function _urlTitle(view,variable,externalLinkSVG,textNodeView){return(
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
)}

function _supress(view){return(
(_view, { ignore } = {}) => {
  if (ignore === undefined) ignore = (evt) => evt?.detail?.user === undefined;

  _view.addEventListener("input", (evt) => {
    if (ignore(evt)) evt.stopPropagation();
  });
  return view`<span>${["...", _view]}`;
}
)}

function _titleCSS(html,colors){return(
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
)}

function _30(md){return(
md`### Tabs`
)}

function _tabsExample(tabs){return(
tabs({
  options: ["secrets", "logs"],
  active: "logs"
})
)}

function _32(tabsExample){return(
tabsExample
)}

function _tabs(Event,htl){return(
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
)}

function _tabsCSS(html,colors){return(
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
)}

function _35(md){return(
md`### Tabbed pane`
)}

function _tabbedPaneExample(tabbedPane,md){return(
tabbedPane({
  cool: () => md`cool`,
  nocool: () => md`not cool`
})
)}

function _37(tabbedPaneExample){return(
tabbedPaneExample
)}

function _tabbedPane(tabs,view,viewroutine){return(
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
)}

function _39(md){return(
md`#### Tab Pane`
)}

function _40(tabPane,html){return(
tabPane({
  content: html`<ul><li>one</li></ul>`
})
)}

function _tabPane(view){return(
({ content }) =>
  view`<div class="e-main-box">${['...', content]}</div>`
)}

function _tabPaneCSS(html,colors,mobile){return(
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
)}

function _43(md){return(
md`#### Column Pane`
)}

function _44(columnPane,htl){return(
columnPane({
  content: htl.html`<span class="e-col-title">Title</span><ul><li>one</li><li>two`
})
)}

function _columnPane(view){return(
({ content }) =>
  view`<div class="e-col-pane">${['...', content]}</div>`
)}

function _colPaneCSS(htl,colors,mobile){return(
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
)}

function _47(md){return(
md`### button`
)}

function _button(html,Event){return(
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
)}

function _49(button){return(
button({
  label: 'cool'
})
)}

function _50(button){return(
button({
  label: 'cool',
  cssClass: 'e-btn2'
})
)}

function _51(button){return(
button({
  label: 'cool',
  cssClass: 'e-btn3'
})
)}

function _buttonCSS(htl,colors){return(
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
)}

function _53(md){return(
md`### Text input`
)}

function _exampleTextArea(textarea){return(
textarea({ placeholder: 'enter text' })
)}

function _exampleTextAreaReadonly(textarea){return(
textarea({
  readOnly: true
})
)}

function _56(exampleTextArea){return(
exampleTextArea
)}

function _57(exampleTextAreaReadonly){return(
exampleTextAreaReadonly.text = "cool beans"
)}

function _textarea(variable,view,html){return(
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
)}

function _textAreaCSS(html,colors){return(
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
)}

function _60(md){return(
md`### Backwritable listSelector`
)}

function _listRow(variable,view,textNodeView){return(
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
)}

function _exampleListRow(listRow){return(
listRow("testGroup")({
  code: "bling",
  content: "the content"
})
)}

function _63(exampleListRow){return(
exampleListRow
)}

function _64($0,Event)
{
  $0.value.code = 'fum';
  $0.value.content = 'foo';
  $0.dispatchEvent(new Event('input'), { bubbles: true });
}


function _listSelector(variable,view,listRow){return(
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
)}

function _setExampleItems($0,Event)
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


function _67(exampleListSelector){return(
exampleListSelector
)}

function _68($0){return(
$0
)}

function _exampleListSelector(listSelector){return(
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
)}

function _listSelectorCSS(htl,colors){return(
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
)}

function _71(md){return(
md`### Secrets Pane

Also contains the logic
`
)}

function _exampleSecretsPane(secretsPane,$0,invalidation){return(
secretsPane(
  {
    namespace: "endpointservices",
    endpoint:
      "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint",
    userView: $0
  },
  invalidation
)
)}

function _73(exampleSecretsPane){return(
exampleSecretsPane
)}

function _secretsPane(view,boundSecrets,storedSecrets,editSecret,firestore,normalizeEndpoint,firebase,setSecret,deleteSecret,getStoredSecrets){return(
({ namespace, endpoint, userView } = {}, invalidation) => {
  const user = userView.value;
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
)}

function _75(firestore){return(
firestore.doc(`/services/http/endpoints/foo`).set({
  namespace: 'tomlarkworthy'
})
)}

function _76(md){return(
md`#### Bound Secrets`
)}

function _exampleBoundSecrets(boundSecrets){return(
boundSecrets({
  namespace: "tomlarkworthy",
  endpoint:
    "https://webcode.run/regions/europe-west1/observablehq.com/d/6eda90668ae03044;info"
})
)}

function _78(exampleBoundSecrets){return(
exampleBoundSecrets
)}

function _boundSecrets(columnPane,view,normalizeEndpoint,listSelector,button){return(
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
)}

function _80(firestore){return(
firestore.doc(`/services/http/endpoints/foo`).get()
)}

function _81(md){return(
md`#### Stored Secrets`
)}

function _exampleStoredSecrets(storedSecrets){return(
storedSecrets({
  namespace: "tomlarkworthy"
})
)}

function _83(exampleStoredSecrets){return(
exampleStoredSecrets
)}

function _storedSecrets(columnPane,view,textNodeView,listSelector,button){return(
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
)}

function _85(md){return(
md`#### Create/edit Secret`
)}

function _exampleEditSecret(editSecret){return(
editSecret({
  action: "Edit",
  secret: "my secret"
})
)}

function _87(exampleEditSecret){return(
exampleEditSecret
)}

function _editSecret(variable,columnPane,view,textNodeView,textarea,button){return(
({ action, secret, disabled = false } = {}) => {
  const disabledVar = variable(disabled);

  const ui = columnPane({
    content: view`<div class="e-col-title">${["disabled", disabledVar]}${[
      "action",
      textNodeView(action)
    ]} Secret</div><br>
      ${["name", textarea({ rows: 1, placeholder: "enter name" })]}
      ${[
        "secret",
        textarea({
          rows: 8,
          placeholder: "enter value"
        })
      ]}
      <div>
        <span>${[
          "delete",
          button({
            action: "delete",
            label: "delete",
            cssClass: "e-btn3"
          })
        ]}</span>
        <span style="float: right;">${[
          "save",
          button({
            action: "save",
            label: "save",
            cssClass: "e-btn3"
          })
        ]}</span>
      </div>
  </div`
  });

  function updateVisibility() {
    if (disabledVar.value) ui.classList.add("hide");
    else ui.classList.remove("hide");
  }
  updateVisibility();

  disabledVar.addEventListener("assign", updateVisibility);

  return ui;
}
)}

function _89(md){return(
md`### Status Pane`
)}

function _exampleStatusPane(statusPane,invalidation){return(
statusPane(
  {
    namespace: "tomlarkworthy",
    name: "test",
    endpoint:
      "https://webcode.run/observablehq.com/@tomlarkworthy/serverless-cell-dashboard;test",
    options: {
      livecode: "PUBLIC"
    }
  },
  invalidation
)
)}

function _91(exampleStatusPane){return(
exampleStatusPane
)}

function _statusPane(view,liveCoding,apiKey,firestore,normalizeEndpoint,createChannel,getCorrelation){return(
(
  { namespace, endpoint, name, user, options = {} } = {},
  invalidation
) => {
  const ui = view`<div class='e-main-box'>
      ${[
        "livecode",
        liveCoding({
          namespace,
          endpoint,
          livecode: options.livecode,
          livecodepublic: options.livecode === "PUBLIC"
        })
      ]}
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
          correlation: getCorrelation(endpoint),
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
  invalidation.then(() => updateDebugChannel(false));

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

      // Sync hardcoded secrets into record
      (options.secrets || []).forEach((secret) => {
        if (!(val.secrets || {})[secret]) {
          configDoc.set(
            {
              namespace,
              secrets: {
                [secret]: "hardcoded"
              }
            },
            { merge: true }
          );
        }
      });
    })
  );

  ui.livecode.singleton.addEventListener("input", () => {
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
)}

function _93(md){return(
md`### Public Status Page`
)}

function _94(publicStatusPane,invalidation){return(
publicStatusPane(
  {
    namespace: "tomlarkworthy",
    name: "test",
    endpoint:
      "https://webcode.run/observablehq.com/@tomlarkworthy/serverless-cell-dashboard;test;fsesa",
    options: {
      livemode: "PUBLIC"
    }
  },
  invalidation
)
)}

function _publicStatusPane(view,liveCoding,md,createChannel,getCorrelation){return(
(
  { namespace, endpoint, name, user, options = {} } = {},
  invalidation
) => {
  const ui = view`<div class='e-main-box'>
      ${[
        "livecode",
        liveCoding({
          namespace,
          endpoint,
          livecode: options.livecode,
          livecodepublic: options.livecode === "PUBLIC"
        })
      ]}
      <div class="e-col-pane">
        <div class="e-col-title">Limited Access</div>
        <p class="e-explain"><i>
        ${md`⚠️ You do not have administration rights on this endpoint because you are not signed in as **${namespace}**, [fork](https://observablehq.com/@observablehq/fork-share-merge) into your own namespace if you want to performed privilidged operations. If you are a team member of **${namespace}**, you must scan for team access when logging in.`}
        </i></p>
      </div>
    </div>`;

  let destroyChannel = undefined;
  let currentLiveMode = undefined;

  async function updateDebugChannel(livemode) {
    console.log(`set livemode to ${livemode} from ${currentLiveMode}`);
    if (livemode === currentLiveMode) return;
    else {
      currentLiveMode = livemode;
      if (currentLiveMode) {
        destroyChannel = await createChannel({
          endpoint,
          name,
          namespace,
          correlation: getCorrelation(endpoint),
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
  invalidation.then(() => updateDebugChannel(false));

  ui.livecode.singleton.addEventListener("input", () => {
    updateDebugChannel(ui.livecode.singleton.livemode.value);
  });
  updateDebugChannel(ui.livecode.singleton.livemode.value);

  return ui;
}
)}

function _96(md){return(
md`#### Live Coding`
)}

function _exampleLiveCoding(liveCoding){return(
liveCoding({
  livecode: "PUBLIC",
  endpoint:
    "https://webcode.run/regions/europe-west1/observablehq.com/d/6eda90668ae03044;info"
})
)}

function _98(exampleLiveCoding){return(
exampleLiveCoding
)}

function _liveCoding(columnPane,view,textNodeView,Inputs){return(
({ livecode } = {}) => {
  const ui = columnPane({
    content: view`<div class="e-col-title">Livecoding</div>
      <p class="e-explain"><i><a target="_blank" href="https://observablehq.com/@endpointservices/livecode">Livecoding</a> tunnels production traffic to <b>your</b> browser so you can run and debug the latest serverside code reactively.</i></p>
      <p class="e-explain"><b>tunnelled: ${[
        "tunnelled",
        textNodeView(0)
      ]}</b></p>
      ${[
        "livemode",
        Inputs.toggle({
          label: "enable livecoding",
          value: livecode === undefined ? true : livecode,
          disabled: livecode === false
        })
      ]}
      ${[
        "livemodepublic",
        Inputs.toggle({
          label: "⚠️ enable public livecoding",
          value: livecode === "PUBLIC",
          disabled: true
        })
      ]}
      <p class="e-explain"><i>Public livecode is enabled through an <a target="_blank" href="https://observablehq.com/@endpointservices/webcode-docs#options">option</a>. </i></p>
  </div`
  });

  return ui;
}
)}

function _100(md){return(
md`#### API key`
)}

function _apiKeyExample(apiKey){return(
apiKey()
)}

function _102(apiKeyExample){return(
apiKeyExample
)}

function _apiKey(columnPane,view,Inputs){return(
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
)}

function _textNodeView(){return(
(value = '') => {
  const node = document.createTextNode(value);
  return Object.defineProperty(node, 'value', {
    get: () => node.textContent,
    set: val => (node.textContent = val),
    enumerable: true
  });
}
)}

function _105(md){return(
md`### Generic Styles

has to be last so modifiers are applied last
`
)}

function _mobile(){return(
739
)}

function _style(html,titleCSS,buttonCSS,textAreaCSS,listSelectorCSS,tabPaneCSS,colPaneCSS,tabsCSS,headerCSS,colors){return(
() => html`<style>
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
)}

function _108(md){return(
md`## Implementation`
)}

function _109(normalizeEndpoint){return(
normalizeEndpoint(
  "https://webcode.run/regions/foo/observablehq.com/@endpointservices/secrets;foo;fxd"
)
)}

function _110(getCorrelation){return(
getCorrelation(
  "https://webcode.run/regions/foo/observablehq.com/@endpointservices/secrets;default"
)
)}

function _normalizeEndpoint(){return(
(endpoint, { excludeCorrelation = true } = {}) => {
  const tripHost = endpoint.replace(
    /https:\/\/webcode.run\/(regions\/([^/]*)\/)?/,
    ""
  );
  if (excludeCorrelation) {
    // Look for two semi colon entries and leave the first
    return tripHost.replace(/(;[^;/]+)(;[^;/]+)/, (match, $1) => $1);
  } else {
    return tripHost;
  }
}
)}

function _getCorrelation(){return(
(endpoint) =>
  /(?:;[^;/]+)(?:;(?<correlation>[^;/]+))/.exec(endpoint)?.groups?.correlation
)}

function _normalizeObservablehqEndpoint(){return(
endpoint =>
  endpoint.replace(
    /https:\/\/webcode.run\/(regions\/([^/]*)\/)?observablehq.com\//,
    ''
  )
)}

function _114(normalizeObservablehqEndpoint){return(
normalizeObservablehqEndpoint(
  "https://webcode.run/regions/foo/observablehq.com/@endpointservices/secrets;foo"
)
)}

function _115(md){return(
md`### Secrets`
)}

function _SECRET_API(){return(
"https://webcode.run/observablehq.com/@endpointservices/secrets"
)}

function _secretClient(SECRET_API){return(
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
)}

function _getStoredSecrets(secretClient){return(
async ({ namespace, user } = {}) =>
  await secretClient(user, `/subdomains/${namespace}/secrets`)
)}

function _setSecret(secretClient){return(
async ({ user, namespace, name, value }) =>
  secretClient(
    user,
    `/subdomains/${namespace}/secrets/${name}`,
    "PUT",
    JSON.stringify(btoa(value))
  )
)}

function _deleteSecret(secretClient){return(
async ({ user, namespace, name }) =>
  secretClient(user, `/subdomains/${namespace}/secrets/${name}`, "DELETE")
)}

function _121(md){return(
md`### Live code`
)}

function _createChannel(database,randomId,firestore,normalizeEndpoint,html,getContext,Response){return(
async function createChannel({
  endpoint,
  name,
  namespace,
  correlation = undefined,
  newRequestCallback = () => {}
} = {}) {
  database.goOnline();
  const sessionId = correlation || (await randomId(32));
  console.log(`New livecode session: ${sessionId}`);

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
        database.ref(`services/http/debug/${sessionId}/status`).set({
          state: "online",
          href: html`<a href="">`.href,
          endpoint,
          started: { ".sv": "timestamp" }
        });
      }
    });

  if (!correlation) {
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
  }

  // Read! listen to inbound requests and respond.
  database
    .ref(`services/http/debug/${sessionId}/requests`)
    .on("child_added", async (snap) => {
      const req = snap.val();
      if (snap.child("response").val()) return; // Skip if response seen
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
    console.log(`End livecode session: ${sessionId}`);
    database.ref(`services/http/debug/${sessionId}/status`).off("value");
    database
      .ref(`services/http/debug/${sessionId}/requests`)
      .off("child_added");
    database.ref(`services/http/debug/${sessionId}/status`).remove();
  };
}
)}

function _firestore(firebase){return(
firebase.firestore()
)}

function _database(firebase)
{
  const db = firebase.database();
  db.goOffline();
  return db;
}


function _130(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("createLogin", child1);
  main.import("firebase", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.import("Response", child2);
  main.import("getContext", child2);
  main.variable(observer()).define(["toc"], _4);
  main.variable(observer("viewof testUser")).define("viewof testUser", ["createLogin"], _testUser);
  main.variable(observer("testUser")).define("testUser", ["Generators", "viewof testUser"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("colors")).define("colors", _colors);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["exampleHeader"], _9);
  main.variable(observer("viewof exampleHeader")).define("viewof exampleHeader", ["serverlessCellUI","invalidation"], _exampleHeader);
  main.variable(observer("exampleHeader")).define("exampleHeader", ["Generators", "viewof exampleHeader"], (G, _) => G.input(_));
  main.variable(observer("serverlessCellUI")).define("serverlessCellUI", ["createLogin","viewroutine","ask","headerLogin","headerCreator","headerNotCreator"], _serverlessCellUI);
  main.variable(observer("viewof exampleHeaderActive")).define("viewof exampleHeaderActive", ["headerCreator","createLogin"], _exampleHeaderActive);
  main.variable(observer("exampleHeaderActive")).define("exampleHeaderActive", ["Generators", "viewof exampleHeaderActive"], (G, _) => G.input(_));
  main.variable(observer("headerCreator")).define("headerCreator", ["supress","view","style","Inputs","variable","urlTitle","normalizeObservablehqEndpoint","tabbedPane","statusPane","secretsPane"], _headerCreator);
  main.variable(observer("viewof exampleHeaderNotCreator")).define("viewof exampleHeaderNotCreator", ["headerNotCreator","invalidation"], _exampleHeaderNotCreator);
  main.variable(observer("exampleHeaderNotCreator")).define("exampleHeaderNotCreator", ["Generators", "viewof exampleHeaderNotCreator"], (G, _) => G.input(_));
  main.variable(observer("headerNotCreator")).define("headerNotCreator", ["supress","view","style","variable","urlTitle","normalizeObservablehqEndpoint","tabbedPane","publicStatusPane","md"], _headerNotCreator);
  main.variable(observer("viewof exampleHeaderLogin")).define("viewof exampleHeaderLogin", ["headerLogin","invalidation"], _exampleHeaderLogin);
  main.variable(observer("exampleHeaderLogin")).define("exampleHeaderLogin", ["Generators", "viewof exampleHeaderLogin"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleHeaderLogin"], _17);
  main.variable(observer("headerLogin")).define("headerLogin", ["supress","view","style","variable","urlTitle","normalizeObservablehqEndpoint","html"], _headerLogin);
  main.variable(observer("headerCSS")).define("headerCSS", ["html","colors"], _headerCSS);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["externalLinkSVG"], _21);
  main.variable(observer("externalLinkSVG")).define("externalLinkSVG", ["svg","colors"], _externalLinkSVG);
  main.variable(observer()).define(["colors"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("viewof exampleTitle")).define("viewof exampleTitle", ["urlTitle"], _exampleTitle);
  main.variable(observer("exampleTitle")).define("exampleTitle", ["Generators", "viewof exampleTitle"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleTitle"], _26);
  main.variable(observer("urlTitle")).define("urlTitle", ["view","variable","externalLinkSVG","textNodeView"], _urlTitle);
  main.variable(observer("supress")).define("supress", ["view"], _supress);
  main.variable(observer("titleCSS")).define("titleCSS", ["html","colors"], _titleCSS);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof tabsExample")).define("viewof tabsExample", ["tabs"], _tabsExample);
  main.variable(observer("tabsExample")).define("tabsExample", ["Generators", "viewof tabsExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["tabsExample"], _32);
  main.variable(observer("tabs")).define("tabs", ["Event","htl"], _tabs);
  main.variable(observer("tabsCSS")).define("tabsCSS", ["html","colors"], _tabsCSS);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("viewof tabbedPaneExample")).define("viewof tabbedPaneExample", ["tabbedPane","md"], _tabbedPaneExample);
  main.variable(observer("tabbedPaneExample")).define("tabbedPaneExample", ["Generators", "viewof tabbedPaneExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["tabbedPaneExample"], _37);
  main.variable(observer("tabbedPane")).define("tabbedPane", ["tabs","view","viewroutine"], _tabbedPane);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["tabPane","html"], _40);
  main.variable(observer("tabPane")).define("tabPane", ["view"], _tabPane);
  main.variable(observer("tabPaneCSS")).define("tabPaneCSS", ["html","colors","mobile"], _tabPaneCSS);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["columnPane","htl"], _44);
  main.variable(observer("columnPane")).define("columnPane", ["view"], _columnPane);
  main.variable(observer("colPaneCSS")).define("colPaneCSS", ["htl","colors","mobile"], _colPaneCSS);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("button")).define("button", ["html","Event"], _button);
  main.variable(observer()).define(["button"], _49);
  main.variable(observer()).define(["button"], _50);
  main.variable(observer()).define(["button"], _51);
  main.variable(observer("buttonCSS")).define("buttonCSS", ["htl","colors"], _buttonCSS);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("viewof exampleTextArea")).define("viewof exampleTextArea", ["textarea"], _exampleTextArea);
  main.variable(observer("exampleTextArea")).define("exampleTextArea", ["Generators", "viewof exampleTextArea"], (G, _) => G.input(_));
  main.variable(observer("viewof exampleTextAreaReadonly")).define("viewof exampleTextAreaReadonly", ["textarea"], _exampleTextAreaReadonly);
  main.variable(observer("exampleTextAreaReadonly")).define("exampleTextAreaReadonly", ["Generators", "viewof exampleTextAreaReadonly"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleTextArea"], _56);
  main.variable(observer()).define(["exampleTextAreaReadonly"], _57);
  main.variable(observer("textarea")).define("textarea", ["variable","view","html"], _textarea);
  main.variable(observer("textAreaCSS")).define("textAreaCSS", ["html","colors"], _textAreaCSS);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("listRow")).define("listRow", ["variable","view","textNodeView"], _listRow);
  main.variable(observer("viewof exampleListRow")).define("viewof exampleListRow", ["listRow"], _exampleListRow);
  main.variable(observer("exampleListRow")).define("exampleListRow", ["Generators", "viewof exampleListRow"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleListRow"], _63);
  main.variable(observer()).define(["viewof exampleListRow","Event"], _64);
  main.variable(observer("listSelector")).define("listSelector", ["variable","view","listRow"], _listSelector);
  main.variable(observer("setExampleItems")).define("setExampleItems", ["viewof exampleListSelector","Event"], _setExampleItems);
  main.variable(observer()).define(["exampleListSelector"], _67);
  main.variable(observer()).define(["viewof exampleListSelector"], _68);
  main.variable(observer("viewof exampleListSelector")).define("viewof exampleListSelector", ["listSelector"], _exampleListSelector);
  main.variable(observer("exampleListSelector")).define("exampleListSelector", ["Generators", "viewof exampleListSelector"], (G, _) => G.input(_));
  main.variable(observer("listSelectorCSS")).define("listSelectorCSS", ["htl","colors"], _listSelectorCSS);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("viewof exampleSecretsPane")).define("viewof exampleSecretsPane", ["secretsPane","viewof testUser","invalidation"], _exampleSecretsPane);
  main.variable(observer("exampleSecretsPane")).define("exampleSecretsPane", ["Generators", "viewof exampleSecretsPane"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleSecretsPane"], _73);
  main.variable(observer("secretsPane")).define("secretsPane", ["view","boundSecrets","storedSecrets","editSecret","firestore","normalizeEndpoint","firebase","setSecret","deleteSecret","getStoredSecrets"], _secretsPane);
  main.variable(observer()).define(["firestore"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("viewof exampleBoundSecrets")).define("viewof exampleBoundSecrets", ["boundSecrets"], _exampleBoundSecrets);
  main.variable(observer("exampleBoundSecrets")).define("exampleBoundSecrets", ["Generators", "viewof exampleBoundSecrets"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleBoundSecrets"], _78);
  main.variable(observer("boundSecrets")).define("boundSecrets", ["columnPane","view","normalizeEndpoint","listSelector","button"], _boundSecrets);
  main.variable(observer()).define(["firestore"], _80);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer("viewof exampleStoredSecrets")).define("viewof exampleStoredSecrets", ["storedSecrets"], _exampleStoredSecrets);
  main.variable(observer("exampleStoredSecrets")).define("exampleStoredSecrets", ["Generators", "viewof exampleStoredSecrets"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleStoredSecrets"], _83);
  main.variable(observer("storedSecrets")).define("storedSecrets", ["columnPane","view","textNodeView","listSelector","button"], _storedSecrets);
  main.variable(observer()).define(["md"], _85);
  main.variable(observer("viewof exampleEditSecret")).define("viewof exampleEditSecret", ["editSecret"], _exampleEditSecret);
  main.variable(observer("exampleEditSecret")).define("exampleEditSecret", ["Generators", "viewof exampleEditSecret"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleEditSecret"], _87);
  main.variable(observer("editSecret")).define("editSecret", ["variable","columnPane","view","textNodeView","textarea","button"], _editSecret);
  main.variable(observer()).define(["md"], _89);
  main.variable(observer("viewof exampleStatusPane")).define("viewof exampleStatusPane", ["statusPane","invalidation"], _exampleStatusPane);
  main.variable(observer("exampleStatusPane")).define("exampleStatusPane", ["Generators", "viewof exampleStatusPane"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleStatusPane"], _91);
  main.variable(observer("statusPane")).define("statusPane", ["view","liveCoding","apiKey","firestore","normalizeEndpoint","createChannel","getCorrelation"], _statusPane);
  main.variable(observer()).define(["md"], _93);
  main.variable(observer()).define(["publicStatusPane","invalidation"], _94);
  main.variable(observer("publicStatusPane")).define("publicStatusPane", ["view","liveCoding","md","createChannel","getCorrelation"], _publicStatusPane);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer("viewof exampleLiveCoding")).define("viewof exampleLiveCoding", ["liveCoding"], _exampleLiveCoding);
  main.variable(observer("exampleLiveCoding")).define("exampleLiveCoding", ["Generators", "viewof exampleLiveCoding"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleLiveCoding"], _98);
  main.variable(observer("liveCoding")).define("liveCoding", ["columnPane","view","textNodeView","Inputs"], _liveCoding);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer("viewof apiKeyExample")).define("viewof apiKeyExample", ["apiKey"], _apiKeyExample);
  main.variable(observer("apiKeyExample")).define("apiKeyExample", ["Generators", "viewof apiKeyExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["apiKeyExample"], _102);
  main.variable(observer("apiKey")).define("apiKey", ["columnPane","view","Inputs"], _apiKey);
  main.variable(observer("textNodeView")).define("textNodeView", _textNodeView);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer("mobile")).define("mobile", _mobile);
  main.variable(observer("style")).define("style", ["html","titleCSS","buttonCSS","textAreaCSS","listSelectorCSS","tabPaneCSS","colPaneCSS","tabsCSS","headerCSS","colors"], _style);
  main.variable(observer()).define(["md"], _108);
  main.variable(observer()).define(["normalizeEndpoint"], _109);
  main.variable(observer()).define(["getCorrelation"], _110);
  main.variable(observer("normalizeEndpoint")).define("normalizeEndpoint", _normalizeEndpoint);
  main.variable(observer("getCorrelation")).define("getCorrelation", _getCorrelation);
  main.variable(observer("normalizeObservablehqEndpoint")).define("normalizeObservablehqEndpoint", _normalizeObservablehqEndpoint);
  main.variable(observer()).define(["normalizeObservablehqEndpoint"], _114);
  main.variable(observer()).define(["md"], _115);
  main.variable(observer("SECRET_API")).define("SECRET_API", _SECRET_API);
  main.variable(observer("secretClient")).define("secretClient", ["SECRET_API"], _secretClient);
  main.variable(observer("getStoredSecrets")).define("getStoredSecrets", ["secretClient"], _getStoredSecrets);
  main.variable(observer("setSecret")).define("setSecret", ["secretClient"], _setSecret);
  main.variable(observer("deleteSecret")).define("deleteSecret", ["secretClient"], _deleteSecret);
  main.variable(observer()).define(["md"], _121);
  main.variable(observer("createChannel")).define("createChannel", ["database","randomId","firestore","normalizeEndpoint","html","getContext","Response"], _createChannel);
  main.variable(observer("firestore")).define("firestore", ["firebase"], _firestore);
  main.variable(observer("database")).define("database", ["firebase"], _database);
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
  main.variable(observer()).define(["footer"], _130);
  return main;
}
