import define1 from "./dfdb38d5580b5c35@347.js";

function _intro(md){return(
md`# Copy code to clipboard

When you hover over code in markdown, it will popup a "copy" to clipboard button. Try with the import code snippet:

\`\`\`js
import { installCopyCode } from "@tomlarkworthy/copy-code"
\`\`\`


Adaption of https://remarkablemark.org/blog/2021/06/01/add-copy-code-to-clipboard-button-to-jeyll-site/ for Observable

You have to install the widget onto each \`<pre>\` tag. You can do it all at once with 

\`\`\`js
[...document.querySelectorAll("pre")].forEach((el) =>
  installCopyCode(el, { invalidation })
)
\`\`\`
But be mindful that you need to run this after all code blocks have rendered on the page.

Alternatively you can install them one at a time whenever you have a reference

\`\`\`js
installCopyCode(htmlElement, { invalidation })
\`\`\`
`
)}

function _installHere(intro,installCopyCode,invalidation)
{
  intro,
    [...document.querySelectorAll("pre")].map((el) =>
      installCopyCode(el, { invalidation })
    );
}


function _installCopyCode(style){return(
(htmlElement, { invalidation } = {}) => {
  if (!document.getElementById("_509d6b5d1aebf2a1")) {
    document.head.append(style());
  }

  const createButton = () => {
    const div = document.createElement("div");
    div.style = "position: relative; width: 0; height: 0";
    const copyButton = document.createElement("button");
    copyButton.style = "position: relative;";
    copyButton.type = "button";
    copyButton.ariaLabel = "Copy code to clipboard";
    copyButton.innerText = "copy";
    copyButton.onclick = (evt) => {
      console.log(evt);
      var code = htmlElement.querySelector("code").innerText.trim();
      window.navigator.clipboard.writeText(code);
      copyButton.innerText = "copied";
      setTimeout(() => {
        copyButton.innerText = "copy";
      }, 2000);
    };

    div.append(copyButton);
    return div;
  };

  const ui = createButton();

  console.log("create button", ui.firstChild.onclick);
  htmlElement.prepend(ui);
  if (invalidation) invalidation.then(() => ui.remove());
}
)}

function _style(html){return(
() => html`<style id="_509d6b5d1aebf2a1">
  pre button {
    opacity: 0;
  }
  pre:hover button {
    opacity: 1;
  }
  pre button:active,
  pre button:focus {
    opacity: 1;
  }
</style>`
)}

function _6(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("intro")).define("intro", ["md"], _intro);
  main.variable(observer("installHere")).define("installHere", ["intro","installCopyCode","invalidation"], _installHere);
  main.variable(observer("installCopyCode")).define("installCopyCode", ["style"], _installCopyCode);
  main.variable(observer("style")).define("style", ["html"], _style);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _6);
  return main;
}
