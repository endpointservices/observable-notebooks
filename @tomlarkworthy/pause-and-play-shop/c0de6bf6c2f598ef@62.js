// https://observablehq.com/@tomlarkworthy/bulma@62
function _1(md){return(
md`# Bulma`
)}

function _2(html){return(
html`
<quote>
<a href="https://bulma.io/">Bulma</a> is a CSS framework based on Flexbox.
</quote>

If you want to customize have a look at <a href='https://observablehq.com/@tomlarkworthy/custom-bulma'>custom-bulma</a>
`
)}

function _3(md){return(
md`
~~~js
import {bulma} from "@tomlarkworthy/bulma"
import {bulmaWithIcons} from "@tomlarkworthy/bulma"
~~~
`
)}

function _box(html){return(
html`
<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
          <br>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>
`
)}

function _card(html){return(
html`<div class="columns">
      <div class="column is-one-third">
        
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>`
)}

function _colorIcons(html){return(
html`<span class="icon has-text-info">
  <i class="fas fa-info-circle"></i>
</span>
<span class="icon has-text-success">
  <i class="fas fa-check-square"></i>
</span>
<span class="icon has-text-warning">
  <i class="fas fa-exclamation-triangle"></i>
</span>
<span class="icon has-text-danger">
  <i class="fas fa-ban"></i>
</span>`
)}

function _overrides(html){return(
html`<style>
h1 {
	font-size: 3rem !important;
}
</style>`
)}

async function _bulmaWithIcons(require,FONT_AWESOME_VERSION,bulma)
{
  await require(`https://use.fontawesome.com/releases/${FONT_AWESOME_VERSION}/js/all.js`).catch(() => {});
  return bulma;
}


function _bulma(html,BULMA_VERSION){return(
html`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/${BULMA_VERSION}/css/bulma.min.css">`
)}

function _BULMA_VERSION(){return(
"0.9.1"
)}

function _FONT_AWESOME_VERSION(){return(
"v5.15.0"
)}

function _12(md){return(
md`https://fontawesome.com/icons?d=gallery&m=free`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("box")).define("box", ["html"], _box);
  main.variable(observer("card")).define("card", ["html"], _card);
  main.variable(observer("colorIcons")).define("colorIcons", ["html"], _colorIcons);
  main.variable(observer("overrides")).define("overrides", ["html"], _overrides);
  main.variable(observer("bulmaWithIcons")).define("bulmaWithIcons", ["require","FONT_AWESOME_VERSION","bulma"], _bulmaWithIcons);
  main.variable(observer("bulma")).define("bulma", ["html","BULMA_VERSION"], _bulma);
  main.variable(observer("BULMA_VERSION")).define("BULMA_VERSION", _BULMA_VERSION);
  main.variable(observer("FONT_AWESOME_VERSION")).define("FONT_AWESOME_VERSION", _FONT_AWESOME_VERSION);
  main.variable(observer()).define(["md"], _12);
  return main;
}
