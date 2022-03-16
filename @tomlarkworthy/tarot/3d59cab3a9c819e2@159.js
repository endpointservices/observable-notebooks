// https://observablehq.com/@triptych/tarot-utilities@159
function _1(md){return(
md`# Tarot Utilities`
)}

function _2(md){return(
md`Below are some Tarot based utilities you can use to fetch cards for games, readings, and more! Scroll down to see them all.`
)}

function _3(md){return(
md`## Random Card`
)}

function _4(htl){return(
htl.html`A random card - with image and interpretation. Reload page to see another card. More features soon! `
)}

function _5(md){return(
md`
Usage:
\`\`\`JAVASCRIPT 
import {rndCard} from "@triptych/tarot-utilities"
\`\`\`
`
)}

async function* _rndCard(html,images,archive)
{
  let cardHTML = html`<div class="card"></div>`;
  yield cardHTML;
  let rnd = Math.floor(Math.random() * 78)
  let card = images.cards[rnd]
  let cardEl = html`
    <div>${card.name}</div>
    ${await archive.file("cards/"+card.img).image()}
    <div><b>Fortune:</b></div>
    <div>${card.fortune_telling[Math.floor(Math.random()* card.fortune_telling.length)]}</div>
  `
  cardHTML.appendChild(cardEl)
}


function _7(md){return(
md`## Get Card`
)}

function _8(md){return(
md`Get a single or many cards. `
)}

function _9(md){return(
md`
Usage:
\`\`\`JAVASCRIPT 
import {getCards} from "@triptych/tarot-utilities"
\`\`\`
`
)}

function _getCards(images,archive){return(
async (obj) => {
  // obj = {numCards}
  let numCards = obj.numCards || 1;
  let unUsedNums = Array.from(Array(78).keys())
  
  let retVal = [];
  for( let i = 0; i< numCards; i++){
    let rnd = unUsedNums.splice(Math.floor(Math.random() * unUsedNums.length),1)
    let card = images.cards[rnd];
    let cardImg = await archive.file("cards/"+card.img).url();
    let fortune = card.fortune_telling[Math.floor(Math.random()* card.fortune_telling.length)]
    let name = card.name;
    let number = card.number;
    
    retVal.push({
      imgURL: cardImg,
      name: name,
      fortune: fortune,
      number: number
    })
  }
  return retVal  
  
}
)}

function _11(md){return(
md`### Example`
)}

function _reading(getCards){return(
getCards({numCards: 4})
)}

function _13(html,reading){return(
html`
<div>
${reading.map((itm,idx,arr)=>{
  return html`<img src="${itm.imgURL}" style="height: 64px;" title="${itm.name}"/>`
})}
</div>`
)}

function _14(md){return(
md`----
## Codes and stuff`
)}

function _data(d3){return(
d3.json("https://raw.githubusercontent.com/ekelen/tarot-api/master/static/card_data.json")
)}

function _archive(FileAttachment){return(
FileAttachment("archive.zip").zip()
)}

function _images(archive){return(
archive.file("tarot-images.json").json()
)}

function _18(archive){return(
archive.file("cards/p10.jpg").image()
)}

function _19(md){return(
md`---
## References
 * https://www.kaggle.com/lsind18/tarot-json/code (source for archive.zip)
 * https://observablehq.com/@observablehq/fileattachment-zip
 * https://observablehq.com/@triptych/testing-tarot-embed`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["archive.zip",new URL("./files/2602cdbd74ddd4218726700d7ee3a6db653bafbcd1560831085a2263e2d2f3560ccf1ba1078ce99ceaa7fe40a4f1257bd0b0c2f2027ffb14900b731465fa512b",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["htl"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("rndCard")).define("rndCard", ["html","images","archive"], _rndCard);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("getCards")).define("getCards", ["images","archive"], _getCards);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("reading")).define("reading", ["getCards"], _reading);
  main.variable(observer()).define(["html","reading"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("data")).define("data", ["d3"], _data);
  main.variable(observer("archive")).define("archive", ["FileAttachment"], _archive);
  main.variable(observer("images")).define("images", ["archive"], _images);
  main.variable(observer()).define(["archive"], _18);
  main.variable(observer()).define(["md"], _19);
  return main;
}
