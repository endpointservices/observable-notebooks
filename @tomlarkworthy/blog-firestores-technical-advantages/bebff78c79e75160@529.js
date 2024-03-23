import define1 from "./627470e22873c319@379.js";
import define2 from "./dff1e917c89f5e76@1964.js";
import define3 from "./c0de6bf6c2f598ef@62.js";
import define4 from "./11a5ab8b1b3a51db@1161.js";
import define5 from "./9e9b514f3656a16e@1255.js";

function _1(md){return(
md`# My Blog Theme`
)}

function _topbar(html,notebooks)
{
  function menuitem(options) {
    return html`<a class="navbar-item"
                   rel=${options.rel}
                   href=${options.href}>
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fa ${options.icon}"></i>
                    </span>
                    <span>${options.content || options.href}</span>
                  </span>
                </a>`;
  }
  return html`<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <style>
details summary::-webkit-details-marker {
  display:none;
}

.navbar,
.navbar-menu,
.navbar-start,
.navbar-end {
  align-items: flex-start;
  display: flex;
  padding: 0;
}
/* this undoes the media selector, but it would be better to put in SASS */
.navbar-dropdown {
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 2px solid #dbdbdb;
    box-shadow: 0 8px 8px rgba(10,10,10,.1);
    font-size: .875rem;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: 20;
}
    </style>
    <div class="navbar-brand">
      <a class="navbar-item" href="http://tomlarkworthy.endpointservices.net">
        <h2>TOM LARKWORTHY</h2>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-brand">
        <details class="navbar-item has-dropdown is-hoverable">
          <summary class="navbar-link">
            Social
          </summary>
          <div class="navbar-dropdown">
            ${menuitem({
              href: "https://observablehq.com/@tomlarkworthy",
              icon: "fa-dot-circle",
              content: "Observable (@tomlarkworthy)",
              rel: "me"
            })}
            ${menuitem({
              href: "https://observablehq.com/@endpointservices",
              icon: "fa-dot-circle",
              content: "Observable (@endpointservices)",
              rel: "me"
            })}
            ${menuitem({
              href: "https://github.com/tomlarkworthy",
              icon: "fa-github",
              content: "Github",
              rel: "me"
            })}
            ${menuitem({
              href: "https://twitter.com/tomlarkworthy",
              icon: "fa-twitter",
              content: "Twitter",
              rel: "me"
            })}
            ${menuitem({
              href: "https://www.linkedin.com/in/tom-larkworthy-74a3263/",
              icon: "fa-linkedin",
              content: "Linkedin",
              rel: "me"
            })}
            ${menuitem({
              href: "/rss.xml",
              icon: "fa-rss-square",
              content: "RSS"
            })}
          </div>
        </details>
      
        <details class="navbar-item has-dropdown is-hoverable">
          <summary class="navbar-link">
            Projects
          </summary>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              Early Firebase
            </a>
            <a class="navbar-item" href="https://edinburghhacklab.com/author/tom-larkworthy/">
              Cofounder Edinburgh Hacklab 
            </a>
            <a class="navbar-item" href="https://scholar.google.com/scholar?q=tom+larkworthy">
              Robotics
            </a>
            <a class="navbar-item" href="https://github.com/futurice/terraform-examples">
              Terraform Examples
            </a>
            <a class="navbar-item" href="mailto:tom.larkworthy@gmail.com">
              Contact
            </a>
          </div>
        </details>
        <details class="navbar-item has-dropdown is-hoverable">
          <summary class="navbar-link">
            Notebooks
          </summary>
          <div class="navbar-dropdown">
            ${notebooks.map(
              notebook => html`<a class="navbar-item" href="${notebook.target}">
              ${notebook.title}
            </a>`
            )}
          </div>
        </details>
    </div>
  </nav>
`;
}


function _notebooks(notebooksUnordered){return(
notebooksUnordered
  .sort((a, b) => a.target.localeCompare(b.target))
  .map(n => ({
    title: n.target
      .replace('/notebooks/tomlarkworthy/', '')
      .replace('.html', ''),
    ...n
  }))
)}

function _notebooksUnordered(queryDependants){return(
queryDependants({
  app_id: "b6a918d2-9cda-4fde-b2ec-add91b22ea02",
  dependsOnTags: ["notebook"]
})
)}

function _6(header){return(
window.document.head.append(header)
)}

function _7(header){return(
header.outerHTML
)}

function _header(html,bulmaWithIcons){return(
html`
<link rel="authorization_endpoint" href="https://indieauth.com/auth">
<link ref="me" href="https://endpointservice.web.app/notebooks/@endpointservices/identity/deploys/hub/mods/T">
<link rel="webmention" href="https://webmention.io/tomlarkworthy.endpointservices.net/webmention" />
<link rel="pingback" href="https://webmention.io/tomlarkworthy.endpointservices.net/xmlrpc" />
${bulmaWithIcons}
<script src="https://kit.fontawesome.com/aeb44cf583.js" crossorigin="anonymous"></script>
`
)}

function _9(articleHeader){return(
articleHeader({
  "title": "My test title",
  "type":"website",
  "url":"blah.com",
  "description":"description",
  "image":"image",
}).outerHTML
)}

function _articleHeader(html,header){return(
(metadata) => html`
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> ${metadata.title} </title>
<meta property="og:type" content="article"/>
<meta name="description" content=${metadata.description}/>
<meta property="og:url" content="${metadata.url}"/>
<meta property="og:description" content="${metadata.description}"/>
<meta property="og:image" content="${metadata.image}"/>

<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="${metadata.url}" />
<meta name="twitter:creator" content="${metadata.twitterCreator}" />
<meta name="twitter:title" content=${metadata.title} />
<meta name="twitter:description" content=${metadata.description} />
<meta name="twitter:image" content=${metadata.image} />

${header}
`
)}

function _articleFooter(html){return(
(metadata) => {
  return html`<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <small>&copy; Copyright ${new Date().getFullYear()}, Tom Larkworthy</small>
    </p>
    <p>
      ${metadata.notebook ? html`Full source code to generate this article is available on <a href=${metadata.notebook}>Observablehq.com</a>.` : null} 
      The website contentis licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>`
}
)}

function _12(deployStaticFile,headers){return(
deployStaticFile({
  app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
  source: headers.href,
  target: `_headers`
})
)}

function _headers(deploy){return(
deploy("netlifyCORSHeaders", (req, res) =>
  res.send(`/notebooks/*
  Access-Control-Allow-Origin: *
`)
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("topbar")).define("topbar", ["html","notebooks"], _topbar);
  main.variable(observer("notebooks")).define("notebooks", ["notebooksUnordered"], _notebooks);
  main.variable(observer("notebooksUnordered")).define("notebooksUnordered", ["queryDependants"], _notebooksUnordered);
  const child1 = runtime.module(define1);
  main.import("sidebar", child1);
  main.variable(observer()).define(["header"], _6);
  main.variable(observer()).define(["header"], _7);
  main.variable(observer("header")).define("header", ["html","bulmaWithIcons"], _header);
  main.variable(observer()).define(["articleHeader"], _9);
  main.variable(observer("articleHeader")).define("articleHeader", ["html","header"], _articleHeader);
  main.variable(observer("articleFooter")).define("articleFooter", ["html"], _articleFooter);
  main.variable(observer()).define(["deployStaticFile","headers"], _12);
  main.variable(observer("headers")).define("headers", ["deploy"], _headers);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  const child3 = runtime.module(define3);
  main.import("bulmaWithIcons", child3);
  const child4 = runtime.module(define4);
  main.import("svg", child4);
  main.import("html", child4);
  const child5 = runtime.module(define5);
  main.import("deployStaticFile", child5);
  main.import("queryDependants", child5);
  return main;
}
