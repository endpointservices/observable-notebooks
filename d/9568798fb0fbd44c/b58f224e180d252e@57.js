// https://observablehq.com/@tmcw/bonus-markdown-flavor@57
function _1(md){return(
md`# Bonus Markdown flavor 🍔`
)}

function _2(mdPlus){return(
mdPlus`This is a checkbox, supported by combining [markdown-it](https://github.com/markdown-it/markdown-it) and [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists).

- [ ] Checklist
- [ ] Chore 1
- [x] Chore 2
- [x] Chore 3
- [ ] Chore 4
- [ ] Chore 5`
)}

function _3(md){return(
md`## Install / Use it in your notebook:

Put into a cell this:
\`\`\`js
import {mdPlus} from  "@tmcw/bonus-markdown-flavor"
\`\`\`

and then use \`mdPlus\` instead of \`md\`

`
)}

function _4(md){return(
md`### Helper Functions and Imports`
)}

function _markdownIt(require){return(
require('markdown-it/dist/markdown-it.js')
)}

function _taskLists(require){return(
require('markdown-it-task-lists/dist/markdown-it-task-lists.js')
)}

function _mdPlus(template,markdownIt,taskLists){return(
template(text => {
  var root = document.createElement("div");
  root.innerHTML = markdownIt()
    .use(taskLists, {enabled: true})
    .render(text);
  return root;
}, () => {
  return document.createElement('div');
})
)}

function _template(){return(
function template(render, wrapper) {
  const {Node, NodeFilter} = window;
  return function(strings) {
    var string = strings[0],
        parts = [], part,
        root = null,
        node, nodes,
        walker,
        i, n, j, m, k = -1;

    // Concatenate the text using comments as placeholders.
    for (i = 1, n = arguments.length; i < n; ++i) {
      part = arguments[i];
      if (part instanceof Node) {
        parts[++k] = part;
        string += "<!--o:" + k + "-->";
      } else if (Array.isArray(part)) {
        for (j = 0, m = part.length; j < m; ++j) {
          node = part[j];
          if (node instanceof Node) {
            if (root === null) {
              parts[++k] = root = document.createDocumentFragment();
              string += "<!--o:" + k + "-->";
            }
            root.appendChild(node);
          } else {
            root = null;
            string += node;
          }
        }
        root = null;
      } else {
        string += part;
      }
      string += strings[i];
    }

    // Render the text.
    root = render(string);

    // Walk the rendered content to replace comment placeholders.
    if (++k > 0) {
      nodes = new Array(k);
      walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT, null, false);
      while (walker.nextNode()) {
        node = walker.currentNode;
        if (/^o:/.test(node.nodeValue)) {
          nodes[+node.nodeValue.slice(2)] = node;
        }
      }
      for (i = 0; i < k; ++i) {
        if (node = nodes[i]) {
          node.parentNode.replaceChild(parts[i], node);
        }
      }
    }

    // Is the rendered content
    // … a parent of a single child? Detach and return the child.
    // … a document fragment? Replace the fragment with an element.
    // … some other node? Return it.
    return root.childNodes.length === 1 ? root.removeChild(root.firstChild)
        : root.nodeType === 11 ? ((node = wrapper()).appendChild(root), node)
        : root;
  };
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["mdPlus"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("markdownIt")).define("markdownIt", ["require"], _markdownIt);
  main.variable(observer("taskLists")).define("taskLists", ["require"], _taskLists);
  main.variable(observer("mdPlus")).define("mdPlus", ["template","markdownIt","taskLists"], _mdPlus);
  main.variable(observer("template")).define("template", _template);
  return main;
}
