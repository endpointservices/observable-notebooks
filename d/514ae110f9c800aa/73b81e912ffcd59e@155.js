// https://observablehq.com/@tmcw/secret@155
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Secret

<img src='https://macwright.org/images/2012-01-10-iframes-lock.jpg' style='max-width:640px;width:100%;' />

<p style="background: #fffced; display: inline-block; padding: 10px 20px; margin: 0.8rem 0;">
* **Update:** Observable now has first-class support for secrets, keeping them encrypted and safely accessible from all of your notebooks on any device. For more information, see <span style="white-space: nowrap;">[“Introduction to Secrets.”](https://beta.observablehq.com/@observablehq/secrets)</span> *
</p>

_A simple way to store secrets, such as API tokens, in Observable notebooks._ This notebook provides an input called \`secret\`, which works like:

\`secret('key', options from \`[ \`@jashkenas/inputs\`](https://beta.observablehq.com/@jashkenas/inputs)\`)\`

The form stores its last input value in \`localStorage\` under the provided key. For example, this input called \`apiKey\` stores its value as \`localStorage.apiKey\`. This way, it retains a secret value that you can use for your own purposes, but doesn’t store that secret in the notebook’s source code.

You can import and use this notebook like:

\`\`\`js
import {secret} from "@tmcw/secret"
\`\`\`

Secrets stored in localStorage

- Are accessible to any of your notebooks
- Are stored in your browser’s storage - if you switch to a different computer, you’ll need to re-enter them.`
)}

function _apiKey(secret){return(
secret("apiKey", {
  description:
    "This is a secret API token whose value is only available to you!",
  submit: "Set secret"
})
)}

function _4(apiKey){return(
apiKey
)}

function _localStorage(){return(
window.localStorage
)}

function _secret(localStorage,text,lock){return(
function secret(name, options = {}) {
  const value = localStorage.getItem(name);
  const input = text(Object.assign({ value }, options));
  const textInput = input.querySelector("input[type=text]");
  textInput.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(
    lock
  )})`;
  textInput.style.backgroundPosition = "center right";
  textInput.style.backgroundRepeat = "no-repeat";
  const submit = input.querySelector("input[type=submit]");
  if (submit) {
    submit.style.backgroundColor = "#ccc";
    submit.style.margin = "0";
    submit.style.padding = "2px 10px";
    submit.style.borderRadius = "0 5px 5px 0";
    submit.style.font =
      "17px/20px -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica,helvetica neue,ubuntu,roboto,noto,segoe ui,arial,sans-serif";
  }
  input.addEventListener("change", e => {
    localStorage.setItem(name, e.target.value);
  });
  return input;
}
)}

function _lock(){return(
`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox='0 0 24 24' fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof apiKey")).define("viewof apiKey", ["secret"], _apiKey);
  main.variable(observer("apiKey")).define("apiKey", ["Generators", "viewof apiKey"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("text", child1);
  main.variable(observer()).define(["apiKey"], _4);
  main.variable(observer("localStorage")).define("localStorage", _localStorage);
  main.variable(observer("secret")).define("secret", ["localStorage","text","lock"], _secret);
  main.variable(observer("lock")).define("lock", _lock);
  return main;
}
