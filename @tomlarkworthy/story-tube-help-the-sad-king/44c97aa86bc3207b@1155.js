// https://observablehq.com/@tomlarkworthy/story-tube-help-the-sad-king@1155
import define1 from "./309c76100e0d1941@1257.js";

function _1(html){return(
html`
<div class="content">
  <h1>Story Tube: Help the Sad King</h1>
</div>`
)}

function _tube(html){return(
html`
<iframe 
  id="tube"
  width="100%"
  height="480"
  src="https://www.youtube.com/embed?autoplay=1&enablejsapi=1&rel=0"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen
/>`
)}

function _actions(render,hasPlayed,jsx,map,state,player){return(
render(() => {
  if (hasPlayed) {
    return hasPlayed && jsx`
      <div class="level is-mobile"> ${
      map[state].map(option => {
          return jsx`
            <a class="button level-item is-large is-primary"
               style=${{"font-size":"250%"}}
               href="#${option.next}"

            >${option.label}</a>`
      })}</div>`
  } else {
    return jsx`<div class="level content is-mobile">
                  <button class="button level-item is-large is-primary"
                          style=${{"font-size":"300%"}}
                          onClick=${() => player.playVideo()}>
                    ▶️ 
                  </button>
               </div>`
  }
})
)}

function _chart(map,state,dot)
{
  const source = `
    digraph {
      rankdir = LR;
      ${Object.keys(map).map(start_state => {
        return `node [shape = ${start_state === state ? "doublecircle": "circle"}
                      color = ${start_state === state ? "red": "black"}
                     ];${start_state};`  
      }).join("\n")}  
      
      ${Object.keys(map).map(start_state => {
        return map[start_state].map((transition, index) => {
          return `${start_state} -> ${map[start_state][index].next}
                  [ label = "${map[start_state][index].label}"];`
        }).join("\n")
      }).join("\n")}
    }
  `
  try {
    return dot`${source}`;
  } catch (error) {
    return this;
  }
}


function _map()
{
  return {
    king: [{
      label: "👴🏼", // Emoji's are good for young children who cannot read
      next: "old_man"
    }, {
      label: "🏛",
      next: "locked_prison"
    }],
    old_man: [{
      label: "👑",
      next: "king"
    }, {
      label: "🏛",
      next: "locked_prison"
    }],
    locked_prison: [{
      label: "👑",
      next: "locked_king"
    }, {
      label: "👴🏼",
      next: "locked_old_man"
    }],
    locked_king: [{
      label: "👴",
      next: "locked_old_man"
    }, {
      label: "🏛",
      next: "locked_prison"
    }],
    locked_old_man: [{
      label: "👑",
      next: "locked_king"
    }, {
      label: "🏛",
      next: "locked_prison"
    }, {
      label: "😄",
      next: "get_key"
    }],
    get_key: [{
      label: "👑",
      next: "key_king"
    }, {
      label: "🏛",
      next: "key_prison"
    }],
    key_king: [{
      label: "👴",
      next: "key_old_man"
    }, {
      label: "🏛",
      next: "key_prison"
    }],
    key_old_man: [{
      label: "👑",
      next: "key_king"
    }, {
      label: "🏛",
      next: "key_prison"
    }],
    key_prison: [{
      label: "👑",
      next: "key_king"
    }, {
      label: "👴",
      next: "key_old_man"
    }, {
      label: "🗝",
      next: "open_prison"
    }],
    open_prison: [{
      label: "👑",
      next: "happy_king"
    }],
    happy_king: [{
      label: "🏆",
      next: "get_wish"
    }],
    get_wish: [{
      label: "🔁",
      next: "king"
    }]
  }}


function _state(hash)
{
  try {
    return decodeURIComponent(hash.substring(1)) || "king"
  } catch (err) {
    return "king"
  }
}


function _video(player,state)
{
  const videosByState = {
    "king": "GlJNbBkrEQQ",
    "locked_king": "GlJNbBkrEQQ",
    "key_king": "GlJNbBkrEQQ",
    "old_man": "DfFHDEIEDJg",
    "locked_old_man": "DfFHDEIEDJg",
    "key_old_man": "DfFHDEIEDJg",
    "get_wish": "p8-8rxGTKWo",
    "happy_king": "pzU5ijeddd0",
    "open_prison": "AEE5Tbo3Pto",
    "get_key": "3WI-1ycC1QM",
    "locked_prison": "K18MWcJHOY4",
    "key_prison": "K18MWcJHOY4",
    "prison": "K18MWcJHOY4"
  };
  player.cueVideoById({
    'videoId': videosByState[state],
    'startSeconds': 0
  });
  return videosByState[state];
}


function _8(html){return(
html`<div class="content">
  <h2>About Adventure Tube</h2>
  <p> Choose your own adventure, a STEM activity from <a href="https://www.youtube.com/channel/UCpL1E-yK38HGsNaIfVPdc8w">Pause and Play</a></p>
  <p> This game is designed for young children to play, but older kids can make their own by forking the page. Click the cells to see the code behind the adventure.</p>
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

async function _player(YT,$0){return(
await new Promise(async (resolve, reject) => {
  var privateHasPlayed = false;
  function onStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        break;
      case YT.PlayerState.ENDED:
        break;
      case YT.PlayerState.PLAYING:
        console.log("autoplay on")
        privateHasPlayed = true;
        $0.value = true
        break;
      case YT.PlayerState.PAUSED:
        break;
      case YT.PlayerState.BUFFERING:
        break;
      case YT.PlayerState.CUED:
        console.log("cued")
        if (privateHasPlayed) {
          console.log("autoplay")
          player.playVideo();
        } 
        break;
      default:
        console.log("unknown (" + event.data + ")");
    }
  }
  
  var player = new YT.Player('tube', {
    height: '100%',
    width: '640',
    events: {
      'onReady': () => resolve(player),
      'onStateChange': onStateChange
    }
  });
})
)}

function _hasPlayed(){return(
false
)}

function _hash(Generators,location,addEventListener,removeEventListener){return(
Generators.observe(notify => {
  const hashchange = () => notify(location.hash);
  hashchange();
  addEventListener("hashchange", hashchange);
  return () => removeEventListener("hashchange", hashchange);
})
)}

function _stylesheet(html){return(
html`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.7.1/css/bulma.min.css">`
)}

function _dot(require){return(
require("@observablehq/graphviz@0.2")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], _1);
  main.variable(observer("tube")).define("tube", ["html"], _tube);
  main.variable(observer("actions")).define("actions", ["render","hasPlayed","jsx","map","state","player"], _actions);
  main.variable(observer("chart")).define("chart", ["map","state","dot"], _chart);
  main.variable(observer("map")).define("map", _map);
  main.variable(observer("state")).define("state", ["hash"], _state);
  main.variable(observer("video")).define("video", ["player","state"], _video);
  main.variable(observer()).define(["html"], _8);
  main.variable(observer("YT")).define("YT", ["require"], _YT);
  main.variable(observer("player")).define("player", ["YT","mutable hasPlayed"], _player);
  main.define("initial hasPlayed", _hasPlayed);
  main.variable(observer("mutable hasPlayed")).define("mutable hasPlayed", ["Mutable", "initial hasPlayed"], (M, _) => new M(_));
  main.variable(observer("hasPlayed")).define("hasPlayed", ["mutable hasPlayed"], _ => _.generator);
  main.variable(observer("hash")).define("hash", ["Generators","location","addEventListener","removeEventListener"], _hash);
  main.variable(observer("stylesheet")).define("stylesheet", ["html"], _stylesheet);
  const child1 = runtime.module(define1);
  main.import("jsx", child1);
  main.import("render", child1);
  main.import("component", child1);
  main.import("useState", child1);
  main.import("useCallback", child1);
  main.variable(observer("dot")).define("dot", ["require"], _dot);
  return main;
}
