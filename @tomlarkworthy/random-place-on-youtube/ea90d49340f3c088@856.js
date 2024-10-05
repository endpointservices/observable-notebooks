// https://observablehq.com/@tomlarkworthy/random-place-on-youtube@856
import define1 from "./309c76100e0d1941@1257.js";

function _1(html,search){return(
html`
<div class="content">
  <h1>Tube Explorer</h1>
  <p>Current search: <i>${search}</i></p>
</div>`
)}

function _2(md){return(
md`DOESN'T WORK SINCE YOUTUBE DEPRECATED search PARAMETER (see https://developers.google.com/youtube/player_parameters#listType) `
)}

function _enabledCatagories(render,useState,config,catagories,jsx){return(
render(({ useSetter }) => {
  const [value, setValue] = useState(config.catagories || catagories);
  const [expanded, setExpanded] = useState(false);
  useSetter(value);
  function optionCheckChange(event) {
    const catagory = event.target.name;
    setValue(event.target.checked ? [...value, catagory]
                                  : value.filter(x => x != catagory));
  }
  return jsx`
    <div class="level">
      <div class="level-item level-left">
        <label class="label">
          Pickable catagories: ${value.length < 5 ? value.join(", ") : value.length}</label>
      </div>
      <div class="level-item level-right">
        <button class="button" onClick=${evt => setValue(catagories)}>
          select all
        </button>
        <button class="button" onClick=${evt => setValue([])}>
          select none
        </button>
        <button class="button" onClick=${evt => setExpanded(!expanded)}>
          hide/show
        </button>
      </div>
       
      
    </div>
    <table class="table" hidden=${!expanded}>
      <tbody>
        ${catagories.map((option, index) => {
          return jsx`
            <td>
              <div class="field is-grouped">
                <div class="control">
                  <input class="checkbox"
                    name=${option}
                    checked=${value.includes(option)}
                    type="checkbox"
                    onChange=${optionCheckChange}
                  />
                </div>
                <div class="control">
                  <label class="label control">${option}</option>
                </div>
              </span>
            </td>
            ${index % 3 == 2 && jsx`<tr/>`}
          `
        })}
      </tbody>
    </table>
  `;
})
)}

function _bias(render,useState,config,jsx,useCallback){return(
render(({ useSetter }) => {
  const suggestedBias = ["", "documentary", "DIY", "tutorial", "meme", "experiment", "dancing", "explained", "vlog"]
  const [value, setValue] = useState(config.bias || suggestedBias[0]);
  useSetter(value);
  return jsx`
    <div class="field is-grouped">
      <div class="control">
        <label class="label"> Bias term</label>
      </div>
      <div class="control">
        <select class="select is-small"
          onChange=${useCallback(event => setValue(event.target.value), [setValue])}>
          ${suggestedBias.map(option => {
            return jsx`<option value=${option} selected=${option == value}>${option}</option>`
          })}
          <option value="custom" selected=${!suggestedBias.includes(value)}>custom</option>
        </select>
      </div>
      <div class="control">
        <input
          class="input is-small"
          type="text"
          placeholder="Enter some text..."
          value=${value}
          onChange=${useCallback(event => setValue(event.target.value), [setValue])}
        />
      </div>
    </div>
  `;
})
)}

async function _5(html,bias,enabledCatagories,catagories,pick,entities,empty,search){return(
html`<a class="button" href=${
    document.baseURI}#${encodeURI(JSON.stringify({
      bias: bias,
      catagories: (enabledCatagories.length == catagories.length ? "all" : enabledCatagories),
      search: bias + " " + pick(await entities(pick(enabledCatagories))) + empty(search)
    }))
}>another video</a>`
)}

function _6(html){return(
html`
<iframe 
  id="tube"
  width="100%"
  height="580"
  src="https://www.youtube.com/embed?autoplay=1&enablejsapi=1"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen
  onready="event.target.playVideo()"
/>
`
)}

function _search(config){return(
config.search
)}

function _8(html){return(
html`<div class="content">
  <h2>About Tube Explorer</h2>
  <p> A technology that helps me find strange things on YouTube outside my filter bubble.</p>
  <p> Use a bias term to prepend some search term to everything and select which catagories to draw random entities from. For example, if you bias with "Documentary" and restrict the catagory to "Cities", you will be able to find random documentaries from around the world!</p>
  <p>Entities are chosen from Never Ending Language Learner dataset.</p>
  <p> Code is open source and editable in your browser thanks to ObservableHQ.</p>
</div>
`
)}

async function _YT(require){return(
await new Promise(async (resolve, reject) => {
  const YT = await require('https://www.youtube.com/iframe_api').catch(
    () => window['YT']
  );
  YT.ready(() => resolve(YT));
})
)}

async function _player(YT){return(
await new Promise(async (resolve, reject) => {
  var shouldAutoplay = false;
  function onStateChange(event) {
    var state = "undefiend";
    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        state= "unstarted";
        break;
        case YT.PlayerState.ENDED:
        state = "ended";
        break;
        case YT.PlayerState.PLAYING:
        state = "playing";
        shouldAutoplay = true;
        break;
        case YT.PlayerState.PAUSED:
        state = "paused";
        shouldAutoplay = false;
        break;
        case YT.PlayerState.BUFFERING:
        state = "buffering";
        break;
        case YT.PlayerState.CUED:
        state = "video cued";
        if (shouldAutoplay) player.playVideo();
        break;
        default:
        state = "unknown (" + event.data + ")";
    }

    console.log('onStateChange: ' + state);
  }
  
  var player = new YT.Player('tube', {
    height: '100%',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': () => resolve(player),
      'onStateChange': onStateChange
    }
  });
})
)}

function _cue(search,player)
{
  console.log("Searching: " + search)
  player.cuePlaylist({ 
    listType:"search",
    list:search,
    index: 0, // todo more random
    startSeconds:0
  });
}


function _config(hash,catagories)
{
  try {
    const decoded = JSON.parse(decodeURIComponent(hash.substring(1)))
    if (decoded.catagories == "all") decoded.catagories = catagories
    return decoded;
  } catch (err) {
    return {search: "DIY Miniature Violin Tutorial"}
  }
}


function _hash(Generators,location,addEventListener,removeEventListener){return(
Generators.observe(notify => {
  const hashchange = () => notify(location.hash);
  hashchange();
  addEventListener("hashchange", hashchange);
  return () => removeEventListener("hashchange", hashchange);
})
)}

async function _catagories(){return(
(await fetch("https://nell-37275.firebaseio.com/catagories.json")).json()
)}

function _entities(){return(
async function entities(catagory) {
    return (await fetch(`https://nell-37275.firebaseio.com/entities/${catagory}.json`)).json() 
}
)}

function _pick(){return(
function pick(options) {
  return options[Math.floor(Math.random() * options.length)].replace(/_/g, " ");
}
)}

function _empty(){return(
() => ""
)}

function _d3(require){return(
require("d3@5")
)}

function _stylesheet(html){return(
html`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.7.1/css/bulma.min.css">`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","search"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof enabledCatagories")).define("viewof enabledCatagories", ["render","useState","config","catagories","jsx"], _enabledCatagories);
  main.variable(observer("enabledCatagories")).define("enabledCatagories", ["Generators", "viewof enabledCatagories"], (G, _) => G.input(_));
  main.variable(observer("viewof bias")).define("viewof bias", ["render","useState","config","jsx","useCallback"], _bias);
  main.variable(observer("bias")).define("bias", ["Generators", "viewof bias"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","bias","enabledCatagories","catagories","pick","entities","empty","search"], _5);
  main.variable(observer()).define(["html"], _6);
  main.variable(observer("search")).define("search", ["config"], _search);
  main.variable(observer()).define(["html"], _8);
  main.variable(observer("YT")).define("YT", ["require"], _YT);
  main.variable(observer("player")).define("player", ["YT"], _player);
  main.variable(observer("cue")).define("cue", ["search","player"], _cue);
  main.variable(observer("config")).define("config", ["hash","catagories"], _config);
  main.variable(observer("hash")).define("hash", ["Generators","location","addEventListener","removeEventListener"], _hash);
  main.variable(observer("catagories")).define("catagories", _catagories);
  main.variable(observer("entities")).define("entities", _entities);
  main.variable(observer("pick")).define("pick", _pick);
  main.variable(observer("empty")).define("empty", _empty);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("stylesheet")).define("stylesheet", ["html"], _stylesheet);
  const child1 = runtime.module(define1);
  main.import("jsx", child1);
  main.import("render", child1);
  main.import("component", child1);
  main.import("useState", child1);
  main.import("useCallback", child1);
  return main;
}
