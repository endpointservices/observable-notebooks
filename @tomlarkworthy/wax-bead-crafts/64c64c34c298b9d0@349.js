import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./84e66f78139ac354@829.js";
import define3 from "./ab3e70b29c480e6d@83.js";
import define4 from "./dfdb38d5580b5c35@334.js";

async function _1(md,FileAttachment){return(
md`# Fuse Bead Craft Planner

My family and I love wax bead crafts! This tool will help us plan our creations. I want my 5 years olds to appreciate the power of software in everyday life.

![Bead craft pictures](${await FileAttachment("IMG_20201209_194259 (1).jpg").url()})

Gift them <a href="https://geni.us/BPN47" target="_blank">Amazon</a> _(paid link)_
`
)}

function _boardSelection($0,html)
{
  function newBoard(option) {
    console.log(`New board: ${option}`)
    $0.value = [];
    if (option == '❤️') {
      for (var i = 0; i < 10; i++)
      for (var j = 0; j < 10; j++) {
        if ( i > 6 && j > 6) continue
        $0.value.push({
          x: i,
          y: j,
          bead: "empty"})
      }
      const rd = [0.55,1.6,2.8];
      const d = [2,5,8];
      for (var r = 0; r < 3; r++)
      for (var j = 0; j < d[r]; j++) {
        $0.value.push({
          y: Math.cos(j * (Math.PI - 0.2) / (d[r] - 1) - Math.PI / 2 + 0.1) * rd[r] + 9.85,
          x: Math.sin(j * (Math.PI - 0.2) / (d[r] - 1) - Math.PI / 2 + 0.1) * rd[r] + 3,
          bead: "empty"})
        
        $0.value.push({
          x: Math.cos(j * (Math.PI - 0.2) / (d[r] - 1) - Math.PI / 2 + 0.1) * rd[r] + 9.85,
          y: Math.sin(j * (Math.PI - 0.2) / (d[r] - 1) - Math.PI / 2 + 0.1) * rd[r] + 3,
          bead: "empty"})
      }
      const root2 = 0.70710678118;
      $0.value = $0.value.map(b => ({...b,
        x: - root2 * b.x + root2 * b.y + 8, y: - root2 * b.x - root2 * b.y + 13}))
      
    } else if (option == 'r9') {
      const d = [1,6,12,18,24,30,36,42,48];
      for (var r = 0; r < 9; r++)
      for (var j = 0; j < d[r]; j++) {
        $0.value.push({
          x: Math.cos(2 * j * Math.PI / d[r] ) * r + 9,
          y: Math.sin(2 * j * Math.PI / d[r] ) * r + 9,
          bead: "empty"})
      }
    } else if (option == '18x18') {
      for (var i = 0; i < 18; i++)
      for (var j = 0; j < 18; j++) {
        $0.value.push({x: i, y: j, bead: "empty"})
      }
    } else if (option == '29x29') {
      for (var i = 0; i < 29; i++)
      for (var j = 0; j < 29; j++) {
        $0.value.push({x: i, y: j, bead: "empty"})
      }
    }
  }
  newBoard('❤️')
  
  return html`<select onchange=${(evt) => newBoard(evt.target.value)}>
    <option value="❤️">❤️</option>
    <option value="r9">◎ 9</option>
    <option value="18x18">18x18</option>
    <option value="29x29">29x29</option>
  </select>
  Board shape
  `
}


function _currentBead(beads,svg)
{
  function click(bead) {
    console.log("Click ", bead)
    form.value = bead
    form.dispatchEvent(new CustomEvent("input"));
  }
  const beadCodes = Object.keys(beads)
  const form = svg`<svg viewBox="0 0 ${beadCodes.length} 1"
                    width="50%" 
                    xmlns="http://www.w3.org/2000/svg">
    <style>
      .white {
        fill: white;
      }
    </style>

    ${Object.keys(beads).map(bead => 
      svg`
        <style>
          .${bead} {
            fill: ${beads[bead]};
          }
        </style>
        <symbol id="${bead}" width="1" height="1" viewBox="0 0 2 2">
          <circle class="${bead}" cx="1" cy="1" r="1"/>
          <circle class="white" cx="1" cy="1" r="0.5"/>
        </symbol>
      `
    )}

    ${beadCodes.map((bead, idx) => {
      return svg`<use onclick=${() => click(bead)}
                      href="#${bead}"
                      x="${idx}" y="0"></use>`
    })}
  `
  form.value = "blue"
  return form;
}


function _boardView(currentBead,$0,board,width,reconcile,svg,boardMax)
{
    function click(cell, evt) {
      let coord;
      if (evt.buttons) {
        coord = [evt.target.x.baseVal.value, evt.target.y.baseVal.value];
      } else if (evt.touches) {
        var myLocation = evt.touches[0];
        var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
        coord = [realTarget.x.baseVal.value, realTarget.y.baseVal.value];
        if (coord[0] == 0 && coord[1] == 0) return; // we have a bug with false triggers
      } else {
        return;
      }
      if (cell.bead !== currentBead) {
        cell.bead = currentBead;
        $0.value = board;
      }
    }
    const desktop = window.screen.availHeight < width;
    return reconcile(this, svg`<svg id="boardView" viewBox="0 0 ${boardMax[0] + 1} ${boardMax[1] + 1}"
                    width=${desktop?'60%':'100%'}               
                    xmlns="http://www.w3.org/2000/svg"
                    style=${{'touch-action': 'none'}}>
    
    ${board.map(cell => {
      return svg`<use onmousedown=${click.bind(null, cell)}
                      onmouseover=${click.bind(null, cell)}
                      ontouchmove=${click.bind(null, cell)}
                      ontouchstart=${click.bind(null, cell)}
                      href="#${cell.bead}"
                      id="${cell.x + "," + cell.y}"
                      x="${cell.x}" y="${cell.y}"></use>`
    })}
  `);
}


function _5(copy,html,board)
{
  function save() {
    const button = document.getElementById("saveBtn")
    const backup = button.innerHTML
    button.innerHTML = "Saving!"
    
    // save the board
    copy(`${html`<a href="#">`.href}${encodeURIComponent(JSON.stringify(board))}`)
    
    setTimeout(() => button.innerHTML = backup, 1000)
  }
  return html`<button id="saveBtn" onclick=${save}>save as link to clipboard</button>`
}


function _init(boardSelection,location,$0)
{
  boardSelection; // Should run after the initial board wipe
  if (location.hash)
    $0.value = JSON.parse(decodeURIComponent(location.hash.substring(1)));
  
}


function _board(){return(
[]
)}

function _boardMax(board){return(
board.reduce(
  (acc, val) => {
    return [Math.max(acc[0], val.x), Math.max(acc[1], val.y)]
  } 
  ,[0,0]
)
)}

function _beads(){return(
{
  "red": "red",
  "orange": "orange",
  "yellow": "yellow",
  "fuchsia": "fuchsia",
  "violet": "violet",
  "green": "green",
  "blue": "blue",
  "brown": "brown",
  "black": "black",
  "white": "white",
  "empty": "#EEE",
}
)}

function _14(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["IMG_20201209_194259 (1).jpg", {url: new URL("./files/ce0e4cb58d9eecbe2c1c85268025ca5afab3329b94a789f5a2c3c102b95e12f68b919c2b3b5dcaf450106d870dfc4fd1fe568389372c0b5583e66874dc52e2c4.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer("boardSelection")).define("boardSelection", ["mutable board","html"], _boardSelection);
  main.variable(observer("viewof currentBead")).define("viewof currentBead", ["beads","svg"], _currentBead);
  main.variable(observer("currentBead")).define("currentBead", ["Generators", "viewof currentBead"], (G, _) => G.input(_));
  main.variable(observer("viewof boardView")).define("viewof boardView", ["currentBead","mutable board","board","width","reconcile","svg","boardMax"], _boardView);
  main.variable(observer("boardView")).define("boardView", ["Generators", "viewof boardView"], (G, _) => G.input(_));
  main.variable(observer()).define(["copy","html","board"], _5);
  main.variable(observer("init")).define("init", ["boardSelection","location","mutable board"], _init);
  main.define("initial board", _board);
  main.variable(observer("mutable board")).define("mutable board", ["Mutable", "initial board"], (M, _) => new M(_));
  main.variable(observer("board")).define("board", ["mutable board"], _ => _.generator);
  main.variable(observer("boardMax")).define("boardMax", ["board"], _boardMax);
  main.variable(observer("beads")).define("beads", _beads);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  main.import("svg", child1);
  const child2 = runtime.module(define2);
  main.import("reconcile", child2);
  const child3 = runtime.module(define3);
  main.import("copy", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _14);
  return main;
}
