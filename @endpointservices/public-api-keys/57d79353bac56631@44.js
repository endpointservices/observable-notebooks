// https://observablehq.com/@jashkenas/url-querystrings-and-hash-parameters@44
function _1(md){return(
md`# URL querystrings and hash parameters

\`location.search\` and \`location.hash\` are now available for use in your notebooks (by being passed down from the parent frame). For example, click [this link](${
  new URL(document.baseURI).pathname
}?one=1&two=2) to add a querystring to this notebook’s URL.`
)}

function _2(md,location){return(
md`The value of \`location.search\` is: \`${location.search}\``
)}

function _3(md,hash){return(
md`And we can use the normal \`hashchange\` event to respond to changes in \`location.hash\`, which is currently: \`${hash}\`.`
)}

function _hash(Generators,location,addEventListener,removeEventListener){return(
Generators.observe(notify => {
  const hashchange = () => notify(location.hash);
  hashchange();
  addEventListener("hashchange", hashchange);
  return () => removeEventListener("hashchange", hashchange);
})
)}

function _5(md){return(
md`This is Markdown with some simple hashful links:

- [#simple](${document.baseURI}#simple) 
- [#hashful](${document.baseURI}#hashful) 
- [#links](${document.baseURI}#links)`
)}

function _6(md){return(
md`In general, you can use \`document.baseURI\` from within a notebook to get the browser’s current URL:`
)}

function _7(){return(
document.baseURI
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md","location"], _2);
  main.variable(observer()).define(["md","hash"], _3);
  main.variable(observer("hash")).define("hash", ["Generators","location","addEventListener","removeEventListener"], _hash);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(_7);
  return main;
}
