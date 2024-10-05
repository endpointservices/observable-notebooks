// https://observablehq.com/@tomlarkworthy/tweetstorm@366
import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./c0de6bf6c2f598ef@62.js";
import define3 from "./84e66f78139ac354@829.js";
import define4 from "./bb2055d580bbbab2@106.js";
import define5 from "./ab3e70b29c480e6d@83.js";

async function _1(html,FileAttachment){return(
html`<div class="content"><h1>Tweetstorm helper</h1>

<figure class="image is-128x128">
<img width=200 height="200" src=${await FileAttachment("Twitter_Social_Icon_Square_Color.png").url()}><img></figure>
<p>
Tweetstorms are linked tweets to create longer, blog-like content. 
<p>
For why you want to write like this, and good guide to wiring tweetstorms, checkout <a href="https://www.animalz.co/blog/how-to-write-a-tweetstorm/">animalz blog post</a> on the subject.
<p>
An exemplary Tweetstormer is <a href="https://twitter.com/Suhail">@Suhail</a>. He syndicates his tweetstorms to Medium! 👀


`
)}

function _2(tweet){return(
tweet("998660806005768192")
)}

function _3(html){return(
html`<div class="content">
<p><------ Add Comment for feature requests.
<h2> Helper</h2>
This tool will help you stay within the limits and do the numbering for you.

<p>Send me a comment if you need something else, or fork it yourself as it's a permissive ISC license.


`
)}

function _4(reconcile,html,tweetstorm,constants,$0,copy,sleep)
{
  const content = reconcile(this, html`<div class='content'>
    ${tweetstorm.segments.map((segment, index) => {
      // TODO: Lots of B.S. due to https://github.com/observablehq/htl/issues/18
      const prefix = `${index + 1}/${tweetstorm.segments.length}`; 
      const length = prefix.length + 1 + segment.text.length;
      const calc = () => `${prefix.length + 1 + segment.text.length}/${constants.max_chars}`
      const recalc = () => `${document.getElementById(`s${index}`).value.length}/${constants.max_chars}`
      return html.fragment`
        <textarea id="s${index}"
        class="textarea"
        onkeyup=${() => document.getElementById(`c${index}`).innerHTML = recalc()}
        onchange=${() => {
                const textarea = document.getElementById(`s${index}`);
                console.log(textarea)                 
                segment.text = textarea.value.startsWith(prefix + ' ')
                  ? textarea.value.substring(prefix.length + 1)
                : textarea.value;
                $0.value = tweetstorm
              }}
        >${prefix} ${segment.text}</textarea>
        <span class="tags are-medium">
          <span id="c${index}"
                class="tag"
                style="align: right; color: ${length > constants.max_chars ? 'red': null};"
          >
            ${calc()}
          </span>
          <span class="tag"
                onclick=${async () => {
                  copy(document.getElementById(`s${index}`).value)
                  const message = document.getElementById(`m${index}`);
                  message.innerHTML = "Copied!"
                  await sleep(1);
                  message.innerHTML = ""
                }}
          >
            <i class="fas fa-copy"></i>
          </span>
          <span id="m${index}"
                class="tag">
          </span>
        </span>
        `
    })}
    <button onclick=${() => {
      tweetstorm.segments.push({text:""})
      $0.value = tweetstorm
    }}
    >
      Another tweet please
    </button>
  `);
  return content;
}


function _5(html){return(
html`<div class="content"><h2>As Plain text`
)}

function _fulltext($0,html,tweetstorm,copy,sleep)
{
  function loadFulltext(text) {
    $0.value = ({
      segments: text.split("\n\n").map(text => ({
        text
      }))
    });
  }
  
  return html`<textarea id="fulltext"
                        onchange=${(evt) => loadFulltext(evt.target.value)}
                        class="textarea">
      ${tweetstorm.segments.map(segment => {
        return segment.text
      }).join("\n\n")}
    </textarea>
    <span class="tags are-medium">
      <span class="tag"
      onclick=${async () => {
        copy(document.getElementById('fulltext').value)
        const message = document.getElementById('message');
        message.innerHTML = "Copied!"
        await sleep(1);
        message.innerHTML = ""
      }}
      >
      <i class="fas fa-copy"></i>
      </span>
      <span id="message"
      class="tag">
      </span>
    </span>
  `
}


function _7(bulmaWithIcons){return(
bulmaWithIcons
)}

function _tweetstorm(){return(
{
  segments: [{
    text: ""
  }]
}
)}

function _constants(){return(
{
  max_chars: 280

}
)}

function _sleep(){return(
async function sleep(secs) {
  function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  return timeout(secs * 1000);
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Twitter_Social_Icon_Square_Color.png", {url: new URL("./files/f2112618b218ad82da1381dd8faed95b727676cb9e3905dbc5024ad1f22ec361d0c9c1d9cb02d2c0110a69b515cd8ec82e41fd9373de3199e1d7865aa3143626.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html","FileAttachment"], _1);
  main.variable(observer()).define(["tweet"], _2);
  main.variable(observer()).define(["html"], _3);
  main.variable(observer()).define(["reconcile","html","tweetstorm","constants","mutable tweetstorm","copy","sleep"], _4);
  main.variable(observer()).define(["html"], _5);
  main.variable(observer("fulltext")).define("fulltext", ["mutable tweetstorm","html","tweetstorm","copy","sleep"], _fulltext);
  main.variable(observer()).define(["bulmaWithIcons"], _7);
  main.define("initial tweetstorm", _tweetstorm);
  main.variable(observer("mutable tweetstorm")).define("mutable tweetstorm", ["Mutable", "initial tweetstorm"], (M, _) => new M(_));
  main.variable(observer("tweetstorm")).define("tweetstorm", ["mutable tweetstorm"], _ => _.generator);
  main.variable(observer("constants")).define("constants", _constants);
  main.variable(observer("sleep")).define("sleep", _sleep);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("bulmaWithIcons", child2);
  const child3 = runtime.module(define3);
  main.import("reconcile", child3);
  const child4 = runtime.module(define4);
  main.import("tweet", child4);
  const child5 = runtime.module(define5);
  main.import("copy", child5);
  return main;
}
