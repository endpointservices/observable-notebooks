import define1 from "./c0de6bf6c2f598ef@62.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Side bar`
)}

async function _sidebar(html,FileAttachment)
{
  function menuitem(options) {
    return html`<li><a href=${options.href}>
                    <span class="icon"><i class="fa ${options.icon}"></i></span>
                    ${options.content || options.href}`;
  }
  return html`<aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile sidebar">
      <div class="column is-2" style=${{ position: "fixed" }}>
        <figure class="image is-128x126">
          <img class="is-rounded" src=${await FileAttachment(
            "tom_larkworthy.jpeg"
          ).url()}>
        </figure>
        <p>
          Hacker in Berlin
        </p>
        <ul class="menu-list">
          ${menuitem({
            href: "https://observablehq.com/@tomlarkworthy",
            icon: "fa-dot-circle",
            content: "Observable"
          })}
          ${menuitem({
            href: "https://twitter.com/tomlarkworthy",
            icon: "fa-twitter",
            content: "Twitter"
          })}
          ${menuitem({
            href: "https://www.linkedin.com/in/tom-larkworthy-74a3263/",
            icon: "fa-linkedin",
            content: "Linkedin"
          })}
          ${menuitem({
            href: "/rss.xml",
            icon: "fa-rss-square",
            content: "RSS"
          })}
        </ul>
      </div>
  </aside>`;
}


function _offset(slider){return(
slider({
  min: 0,
  max: 1000,
  value: 380,
  description: "Adjsut height of sidebar container"
})
)}

function _header(html,bulmaWithIcons){return(
html`
${bulmaWithIcons}
<script src="https://kit.fontawesome.com/aeb44cf583.js" crossorigin="anonymous"></script>
`
)}

function _5(sidebar,offset)
{
  sidebar
  const sidebarElement = document.getElementsByClassName("sidebar")[0]
  sidebarElement.parentElement.style.height = `${offset}px`;
  return "cellHeightAdjsuter"
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tom_larkworthy.jpeg", {url: new URL("./files/7a1742488c4f65fd7e9dde2e92ece1518321ace93c71a8c0a73176f5977ac40d743cdbea30c5803b348adb7ad8d52075131333b8038ad39703ef14953b1516fd.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("sidebar")).define("sidebar", ["html","FileAttachment"], _sidebar);
  main.variable(observer("viewof offset")).define("viewof offset", ["slider"], _offset);
  main.variable(observer("offset")).define("offset", ["Generators", "viewof offset"], (G, _) => G.input(_));
  main.variable(observer("header")).define("header", ["html","bulmaWithIcons"], _header);
  main.variable(observer()).define(["sidebar","offset"], _5);
  const child1 = runtime.module(define1);
  main.import("bulmaWithIcons", child1);
  const child2 = runtime.module(define2);
  main.import("svg", child2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("slider", child3);
  return main;
}
