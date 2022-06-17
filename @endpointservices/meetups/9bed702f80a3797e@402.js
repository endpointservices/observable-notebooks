// https://observablehq.com/@nebrius/indented-toc@402
function _1(md){return(
md`# Indented ToC

This notebook can generate a Table of Contents (ToC), with indentations, automatically for your notebook.

Thanks to @mbostock for creating the original version of the library!

_Note:_ Clicking on links in Safari doesn't work because [scrollIntoView in an iFrame doesn't really work correctly](https://www.javaer101.com/en/article/11885549.html)`
)}

function _2(toc){return(
toc({
  headers: "h2,h3,h4",
  skip: ["Implementation"]
})
)}

function _3(md){return(
md`## Usage`
)}

function _4(md){return(
md`Import this notebook with:
\`\`\`js
import {toc} from "@nebrius/indented-toc"
\`\`\`
`
)}

function _5(md){return(
md`### Basic Example

You can create the table of contents for a notebook with the following call:

\`\`\`JavaScript
toc()
\`\`\`

This call produces the following ToC for this notebook:
`
)}

function _6(toc){return(
toc()
)}

function _7(md){return(
md`### Customizing Included Header Levels
If you don't like which header levels are included in the ToC by default, you can customize which header levels to include:

\`\`\`JavaScript
toc("h2,h3,h4")
\`\`\`

or:

\`\`\`JavaScript
toc({
  headers: "h2,h3,h4"
})
\`\`\`

This call produces the following ToC for this notebook:
`
)}

function _8(toc){return(
toc({
  headers: "h2,h3,h4"
})
)}

function _9(toc){return(
toc({
  hideStartingFrom: "Implementation"
})
)}

function _10(md){return(
md`### Customizing or Hiding the Title
If you would like to change the title, you can change it with:

\`\`\`JavaScript
toc({
  title: "My Table of Contents"
})
\`\`\`

This call produces the following ToC for this notebook:
`
)}

function _11(toc){return(
toc({
  title: "My Table of Contents"
})
)}

function _12(md){return(
md`
You can also hide the title by passing in \`null\` for the title value:

\`\`\`JavaScript
toc({
  title: null
})
\`\`\`

This call produces the following ToC for this notebook:
`
)}

function _13(toc){return(
toc({
  title: null
})
)}

function _14(md){return(
md`### Skipping a section
In some cases, you may want to omit a section (for example, if you use \`##\` to create a subtitle for your notebook). To skip a section, pass a string or array of strings to be omitted:`
)}

function _15(toc){return(
toc({ skip: "API" })
)}

function _16(toc){return(
toc({ skip: ["API", "Usage"] })
)}

function _17(md){return(
md`### Bringing it All Together
All of the options can be combined together to create a more highly customized ToC

\`\`\`JavaScript
toc({
  headers: "h2,h3,h4",
  title: "My ToC",
  hideStartingFrom: "Implementation"
})
\`\`\`

This call produces the following ToC for this notebook:
`
)}

function _18(toc){return(
toc({
  headers: "h2,h3,h4",
  title: "My ToC",
  hideStartingFrom: "Implementation"
})
)}

function _19(md){return(
md`## API

The \`toc\` method has the following signature:

\`\`\`TypeScript
function toc(
  options?: string | { headers?: string, title?: string | null, hideStartingFrom?: string }
): MutationObserver
\`\`\`

Note: This signature is written using TypeScript syntax.

Options has the following defaults:
- headers = "h1,h2,h3",
- hideStartingFrom = null,
- title = "Table of Contents"
`
)}

function _20(md){return(
md`## Hiding an Appendix (deprecated)
_Suggestion:_ use the \`skip\` option above.

If your notebooks are like mine, you might have a section titled "appendix," "implementation," or similar section to house implementation details. You can hide this section with the following call:

\`\`\`JavaScript
toc({
  hideStartingFrom: "Implementation"
})
\`\`\`

This call produces the following ToC for this notebook:
`
)}

function _21(md){return(
md`## Implementation`
)}

function _toc(Generators,html,DOM,MutationObserver){return(
function toc(options = {}) {
  if (typeof options === "string") {
    options = {
      headers: options
    };
  }
  const {
    headers = "h1,h2,h3",
    hideStartingFrom = null,
    title = "Table of Contents",
    skip = []
  } = options;
  // Allow skip to be specified as a string or an array
  const skipArr = typeof skip === "string" ? [skip] : skip;
  return Generators.observe((notify) => {
    let previousHeadings = [];
    let renderedEmptyToC = false;

    function observed() {
      const currentHeadings = Array.from(
        document.querySelectorAll(headers)
      ).filter((d) => skipArr.indexOf(String(d.textContent)) === -1);

      // CHeck if there's anything to render
      if (!currentHeadings.length) {
        if (!renderedEmptyToC) {
          notify(html`Unable to generate ToC: no headings found`);
          renderedEmptyToC = true;
        }
        return;
      }

      // Check if anything changed from the previous render, and if not, bail
      if (
        currentHeadings.length === previousHeadings.length &&
        !currentHeadings.some((h, i) => previousHeadings[i] !== h)
      ) {
        return;
      }
      renderedEmptyToC = false;

      // The start indentation specifies the top-most header tag that will
      // be "unindented" in the ToC, and is effective the "2" in "h2"
      let startIndentation = headers
        .split(",")
        .map((h) => parseInt(h.replace(/h/g, "")))
        .sort()[0];

      // The current indentation tracks what level of indentation we're at,
      // so we can add <ul> and </ul> tags as needed to get the ToC to
      // indend/unindent properly
      let currentIndentation;
      previousHeadings = currentHeadings;
      const entries = [];
      for (const h of Array.from(previousHeadings)) {
        if (hideStartingFrom && h.textContent === hideStartingFrom) {
          break;
        }
        let nodeIndentiation = parseInt(h.tagName[1], 10);
        if (typeof currentIndentation === "undefined") {
          // Add indentations as needed in case the initial header tag
          // isn't the top-level specified for this ToC
          currentIndentation = startIndentation;
          while (nodeIndentiation > currentIndentation) {
            currentIndentation++;
            entries.push("<ul>");
          }
        } else {
          while (currentIndentation < nodeIndentiation) {
            entries.push("<ul>");
            currentIndentation++;
          }
          while (currentIndentation > nodeIndentiation) {
            entries.push("</ul>");
            currentIndentation--;
          }
        }
        entries.push(
          Object.assign(
            html`<li><a href="#">${DOM.text(h.textContent)}</a></li>`,
            {
              onclick: (e) => {
                e.preventDefault();
                h.scrollIntoView();
              }
            }
          )
        );
      }
      while (currentIndentation > startIndentation) {
        entries.push("</ul>");
        currentIndentation--;
      }
      let content;
      if (title) {
        content = html`<b>${DOM.text(title)}</b><ul>${entries}`;
      } else {
        content = html`<ul>${entries}`;
      }
      notify(content);
    }

    const observer = new MutationObserver(observed);
    observer.observe(document.body, { childList: true, subtree: true });
    observed();
    return () => observer.disconnect();
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["toc"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["toc"], _8);
  main.variable(observer()).define(["toc"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["toc"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["toc"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["toc"], _15);
  main.variable(observer()).define(["toc"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["toc"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("toc")).define("toc", ["Generators","html","DOM","MutationObserver"], _toc);
  return main;
}
