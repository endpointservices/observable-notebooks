// https://observablehq.com/@tomlarkworthy/tom-larkworthy@189
import define1 from "./c0de6bf6c2f598ef@62.js";

function _1(md){return(
md`
# Tom Larkworthy
`
)}

function _futurice_profile(html){return(
html`
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">

<div class="row">
<div class="col"></div>
<div class="col md-auto">
  <div class="d-flex flex-row border">
    <div class="p-0 w-25">
      <img src="https://raw.githubusercontent.com/tomlarkworthy/observablehq_data/master/images/me_400x400.JPG" class="img-thumbnail border-0" />
    </div>
    <div class="pl-3 pt-2 pr-2 pb-2 w-75 border-left">
      <h4 class="text-primary">Tom Larkworthy</h4>
      <ul class="m-0 float-left" style="list-style: none; margin:0; padding: 0">
      <li><a href="https://www.linkedin.com/in/tom-larkworthy-74a3263/"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
      <li><a href="https://twitter.com/tomlarkworthy?lang=en"><i class="fab fa-twitter"></i> Twitter</a></li>
      </ul>
      <p class="text-right m-0">
        <a style="color: #fff" href="https://www.futurice.com/contact"
           class="btn btn-primary"><i class="far fa-user"></i> Contact
        </a>
      </p>
    </div>
  </div>
</div>
`
)}

function _futurice_profile_bulma(html,bulmaWithIcons){return(
html`
${bulmaWithIcons}
<div class="columns">
<div class="column is-one-third"></div> 
<div class="column is-one-third">   
<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://raw.githubusercontent.com/tomlarkworthy/observablehq_data/master/images/me_400x400.JPG" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">Tom Larkworthy</p>
        <p class="subtitle is-7">tom.larkworthy@futurice.com</p>
      </div>
    </div>

    <div class="content">
      <p><a href="https://www.linkedin.com/in/tom-larkworthy-74a3263/"><i class="fab fa-linkedin"></i> LinkedIn</a></p>
      <p><a href="https://twitter.com/tomlarkworthy?lang=en"><i class="fab fa-twitter"></i>@tomlarkworthy</a></p>
</div>
</div>
</div>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("futurice_profile")).define("futurice_profile", ["html"], _futurice_profile);
  main.variable(observer("futurice_profile_bulma")).define("futurice_profile_bulma", ["html","bulmaWithIcons"], _futurice_profile_bulma);
  const child1 = runtime.module(define1);
  main.import("bulmaWithIcons", child1);
  return main;
}
