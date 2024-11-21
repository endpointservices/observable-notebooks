import define1 from "./ef672b935bd480fc@623.js";

function _1(html){return(
html`
<div class="markdown-body">
  <h1>What’s Up, JSDoc?</h1>
  <p>Styling <a href="https://jsdoc.app/">JSDoc</a>-style comments like <del>a boss</del> <a href="https://github.com/d3/d3/blob/master/API.md">D3 API documentation on GitHub</a>, written in <code>Markdown</code> and styled by <a href="https://primer.style/css/components/markdown">Primer CSS</a></p>
</div>`
)}

function _2(md){return(
md`## Example`
)}

function _scriptSrc(){return(
document.querySelector("script")
)}

function _NOTEBOOK(html){return(
html`<a href="#">`.href
)}

async function _source(){return(
(await fetch(
  "https://api.observablehq.com/d/433338dff632f5a9.js?v=3"
)).text()
)}

function _7(parseFile,source){return(
parseFile(source)
)}

function _8(html){return(
html`<div class="markdown-body">
<h2>Representation</h2>
</div>`
)}

function _parseFile(parser){return(
source => {
  const options = {
    spacing: "preserve" // preserving line breaks within @example (and, unfortunately, description)
  };

  const commentBlocks = parser.parse(source, options);
  return commentBlocks;
}
)}

function _10(html){return(
html`<div class="markdown-body">
<h2>Implementation</h2>
</div>`
)}

function _parser(require){return(
require("https://bundle.run/comment-parser@1.1.4")
)}

function _format(html,getSynopsis,getDescription,getExample){return(
(commentBlock, methodName) => html`
<div class="markdown-body">
  <p>${getSynopsis(commentBlock, methodName)}</p>
  <p>${getDescription(commentBlock)}</p>
  ${getExample(commentBlock)}
</div>`
)}

function _getSynopsis(getParentName,getSignature,getSourceUrl,getPackageUrl){return(
(commentBlock, methodName) => {
  let literal = `<a href="#${methodName}">#</a>`;
  literal += ` ${getParentName(commentBlock)}`;
  literal += `.${getSignature(commentBlock, methodName)}`;
  literal += `  · <a href="${getSourceUrl(6839)}">Source</a>`;
  literal += `, <a href="${getPackageUrl(methodName)}">Package</a>`;
  return literal;
}
)}

function _getParentName(){return(
(commentBlock) => commentBlock.tags.find(d => d.tag === "memberOf").name
)}

function _getSignature(getParams,formatParams){return(
(commentBlock, methodName) => {
  const params = getParams(commentBlock);  
  return `<b>${methodName}</b>(${formatParams(params)})`;
}
)}

function _getParams(){return(
(commentBlock) => commentBlock.tags.filter(d => d.tag === "param")
)}

function _formatParams(){return(
(params) => {  
  let literal = "";  
  let previousParam = null;
  for (const currentParam of params) {
    if (currentParam.optional) {
      literal += "["; 
    }    
    
    if (previousParam !== null) {
      literal += ", ";
    }
    
    literal += `<i>${currentParam.name}`;
    if (currentParam.default !== undefined) {
      literal += ` = ${currentParam.default}`;
    }    

    literal += "</i>"
    previousParam = currentParam;      
  }
  
  const openSquareBracketCount = literal.split("[").length - 1;
  if (openSquareBracketCount > 0) {
    literal += "]".repeat(openSquareBracketCount);
  }
  
  return literal;
}
)}

function _getSourceUrl(){return(
(lineNumber) => `https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L${lineNumber}`
)}

function _getPackageUrl(){return(
(methodName) => `https://www.npmjs.com/package/lodash.${methodName}`
)}

function _getDescription(getParams){return(
(commentBlock) => {
  const inlineCode = /\`(\w+)\`/g;
  const paramNames = getParams(commentBlock).map(d => d.name);
  let literal = commentBlock.description.replaceAll(inlineCode, (_, p1) => {
    if (paramNames.includes(p1)) {
      return `<i>${p1}</i>`;
    }
    
    return `<code>${p1}</code>`;
  });
    
  return literal;  
}
)}

function _getExample(md){return(
(commentBlock) => {
  const example = commentBlock.tags.find(d => d.tag === "example");
  const code = example.description.trim();  
  return md`
~~~js
${code}
~~~`;
}
)}

function _22(html){return(
html`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@primer/css@15.2.0/dist/product.css">`
)}

function _23(html){return(
html`<style>
h1, 
h2, 
h3, 
p {
  max-width: unset;
}

b {
  font-weight: 600;
}

.markdown-body > p:last-child,
.markdown-body > pre:last-child {
  margin-bottom: 7px !important;
}
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("scriptSrc")).define("scriptSrc", _scriptSrc);
  main.variable(observer("NOTEBOOK")).define("NOTEBOOK", ["html"], _NOTEBOOK);
  main.variable(observer("source")).define("source", _source);
  const child1 = runtime.module(define1);
  main.import("fetchp", child1);
  main.variable(observer()).define(["parseFile","source"], _7);
  main.variable(observer()).define(["html"], _8);
  main.variable(observer("parseFile")).define("parseFile", ["parser"], _parseFile);
  main.variable(observer()).define(["html"], _10);
  main.variable(observer("parser")).define("parser", ["require"], _parser);
  main.variable(observer("format")).define("format", ["html","getSynopsis","getDescription","getExample"], _format);
  main.variable(observer("getSynopsis")).define("getSynopsis", ["getParentName","getSignature","getSourceUrl","getPackageUrl"], _getSynopsis);
  main.variable(observer("getParentName")).define("getParentName", _getParentName);
  main.variable(observer("getSignature")).define("getSignature", ["getParams","formatParams"], _getSignature);
  main.variable(observer("getParams")).define("getParams", _getParams);
  main.variable(observer("formatParams")).define("formatParams", _formatParams);
  main.variable(observer("getSourceUrl")).define("getSourceUrl", _getSourceUrl);
  main.variable(observer("getPackageUrl")).define("getPackageUrl", _getPackageUrl);
  main.variable(observer("getDescription")).define("getDescription", ["getParams"], _getDescription);
  main.variable(observer("getExample")).define("getExample", ["md"], _getExample);
  main.variable(observer()).define(["html"], _22);
  main.variable(observer()).define(["html"], _23);
  return main;
}
