function _1(md){return(
md`# Link previews

Does https://www.linkpreview.net/ work with Observable?
`
)}

function _API_KEY(){return(
'2f5e33cefc5ea9032fe1e9e0947b2cc1'
)}

function _preview(API_KEY){return(
async url =>
  (await fetch(`https://api.linkpreview.net/?key=${API_KEY}&q=${url}`)).json()
)}

function _json(preview){return(
preview('https://observablehq.com/@visnup/slides')
)}

function _5(htl,json){return(
htl.html`<a href=${json.url}>
  <h3>${json.title}</h3>
  <img src=${json.image}></img>
  <p><i>${json.description}</i></p>
</a>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("API_KEY")).define("API_KEY", _API_KEY);
  main.variable(observer("preview")).define("preview", ["API_KEY"], _preview);
  main.variable(observer("json")).define("json", ["preview"], _json);
  main.variable(observer()).define(["htl","json"], _5);
  return main;
}
