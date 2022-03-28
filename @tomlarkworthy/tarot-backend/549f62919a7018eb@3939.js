import define1 from "./576f8943dbfbd395@114.js";
import define2 from "./374124b361974cb3@200.js";
import define3 from "./993a0c51ef1175ea@1343.js";
import define4 from "./6b51d73d81a1b21f@207.js";
import define5 from "./6eda90668ae03044@803.js";
import define6 from "./0e0b35a92c819d94@325.js";
import define7 from "./048a17a165be198d@263.js";
import define8 from "./0c800138c487d3e1@860.js";
import define9 from "./698257e86fae4586@350.js";
import define10 from "./f92778131fd76559@1173.js";
import define11 from "./92ff66b718c1972f@141.js";
import define12 from "./653c46ed55693b1f@646.js";
import define13 from "./9bed702f80a3797e@402.js";
import define14 from "./dff1e917c89f5e76@1711.js";
import define15 from "./ef672b935bd480fc@619.js";
import define16 from "./293899bef371e135@216.js";

function _1(md){return(
md`# Tarot Backend

Welcome curious traveler to the Tarot backend. Its purpose is to show you how you can make a fully working app entirely from the comfort of an Observable notebook. You can fork this notebook and create your own.

The Tarot Backend uses [OpenAI](https://openai.com/) to interpret a 3 card tarot spread. The OpenAI API key is kept secret by executing it serverside in an API endpoint defined inline to the notebook using [webcode.run](https://webcode.run). You can bring your own OpenAI API key so you can run that remote logic locally which is useful during development.

A history of readings is stored in a Firebase realtime database, and is protected with a service_account, again you can bring your own service account and execute it locally. The service account also has access to Google Cloud Storage

During an API call, the notebook prerenders a social image and a HTML landing page for that reading. These artifacts are uploaded to Google Cloud Storage. When a user visits [thetarot.online](https://thetarot.online), we use Netlify rewrite rules to redirect to Google Cloud Storage [source](https://github.com/endpointservices/thetarot.online), this is the only code outside of Observable. It provides are really quick and simple way to provide a vanity domain. 

The UI is designed hierarchically and assembled into a single cell, following the [scalable UI development methodology](https://observablehq.com/@tomlarkworthy/ui-development). This keeps the client notebook slim, it also simplifies embedding, and allows us to embed the application into other sites using [native Observable embedding functionality](https://observablehq.com/@observablehq/introduction-to-embedding).

We the API request process across several Observable reactive dataflow cells using a [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue). If a step has a bug, we can then fix that individual line and the trace will continue which makes development very ergonomic. Furthermore, by exploiting [webcode.run](https://webcode.run) live coding, production traffic will be traced in the development notebook, and we can develop and debug directly on prod.

I hope you find [webcode.run](https://webcode.run) + [observable](/) application development interesting. This took about 2 weeks of fulltime work to develop.

`
)}

function _2(toc){return(
toc("h2,h3,h4")
)}

function _3(md){return(
md`## Ideas

This is a list of ideas for what I should do

- Fix twitter sharing (not possible)
- Literate Backend
- Medium article`
)}

function _4(md){return(
md`## Application UI

This is the final application, it is a composite of all our separately designed UI pieces.`
)}

async function _display(font,view,FileAttachment,whoInput,questionInput,pickCards,showCards,cards,fortuneOutput,restartButton,shareButton){return(
font,
view`<div style="height: 800px; display: none; background-image: url('${await FileAttachment(
  "imgonline-com-ua-TextureSeamless-ddu5gFbCzzWeXp.jpg"
).url()}'); background-size: contain; backgroud-color: #fff; font-family: Montserrat, sans-serif; max-width: auto;">
  <style>
    body {
      margin: 0px;
    }
    a[href] {
      color: #3182bd
    }
    a[href]:hover {
      text-decoration: underline;
    }
  </style>
  <div style="max-width: 740px; margin: auto">
    <h1 style="display: none">Tarot</h1>
    <a href="https://thetarot.online/index.html">
      <div style="width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;background-color:#eef;"><h1 style="color: black; text-align: center; max-width:100%; padding: 30px; margin-bottom: 50px; padding-bottom: 30px; font-family: Verdana; size: 2em;"><i>thetarot.online</i>
      </h1></div>
      
    </a>
    ${["name", whoInput()]}
    ${["question", questionInput()]}
    <div style="pointer-events: none">
      ${["deck", pickCards()]}
    </div>
    ${["cards", showCards(cards)]}
    ${["fortune", fortuneOutput()]}
    ${["restart", restartButton()]}
    ${["share", shareButton()]}
    <p style="color: white; bottom: -10px"><small>
      The tarot reader is an open source <a href="https://observablehq.com/@tomlarkworthy/tarot">Observablehq.com</a> web notebook.
      <br>Photo by <a href="https://unsplash.com/@figmentprints?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Cat Han</a> on <a href="https://unsplash.com/s/photos/velvet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
    </small></p>
  </div>
</div>`
)}

function _6(md){return(
md`## Application Logic

Business logic is in seperate cells to the UI, but reevaluates on changes to UI state and drives additional state changes.`
)}

function _7(md){return(
md`### restartAction

The restart cell binds to the "ask another question" button. It clears the UI state, and yields a value. By having the downstream transition cells reference the value of the restart, we can reset the transitional state too on a restart.`
)}

function _restartAction(Generators,$0,invalidation){return(
Generators.observe((notify) => {
  const onrestart = () => {
    console.log("restart");
    $0.fortune.value = "";
    $0.name.value = "";
    $0.question.value = "";
    $0.name.singleton.disabled = false;
    $0.question.singleton.disabled = false;
    $0.cards.style.display = "none";
    $0.deck.reset();
    notify();
  };
  $0.restart.addEventListener("click", onrestart);
  invalidation.then(() =>
    $0.restart.removeEventListener("click", onrestart)
  );
  notify();
})
)}

function _9(md){return(
md`### Loading shared fortune

If the URL contains a share id, we load a fortune from history.`
)}

function _10(md){return(
md`#### shareID

First, we detect a share id from either the URL params, or the last path segment.`
)}

function _shareId(URLSearchParams,location)
{
  const search = new URLSearchParams(location.search).get("share");
  if (search) return search;
  const path = location.pathname.split("/").slice(-1)[0];
  if (!path.match(/[.$\[\]#\/]/)) return path;
}


function _12(md){return(
md`#### previousFortune

If a shareId is present we load it from the realtime database, this will return null if shareId is undefined`
)}

async function _previousFortune(firebase,shareId)
{
  const snapshot = await firebase
    .database()
    .ref(`/@tomlarkworthy/tarot-backend/calls/${shareId}`)
    .once("value");
  return snapshot.val();
}


function _14(md){return(
md`#### loadPreviousFortune

This cell executes once, and will update the UI with a previousFortune if we have one.`
)}

async function _loadPreviousFortune(previousFortune,$0,findCardsByName,baseURL,shareId)
{
  if (previousFortune) {
    $0.fortune.value = previousFortune.reading.choices[0].text;
    $0.name.value = previousFortune.name;
    $0.question.value = previousFortune.question;
    $0.cards.cards.value = await findCardsByName(
      previousFortune.cards
    );
    $0.share.value = `${baseURL}/${shareId}`;
    $0.deck.value = 3;
    $0.deck.style.display = "none";
    $0.name.singleton.disabled = true;
    $0.question.singleton.disabled = true;
  }
}


function _16(md){return(
md`### Application State transitions

The core application toggles the UI element visibility, based on their current state (which is modified by the user). `
)}

async function _transitions(display,restartAction,loadPreviousFortune,$0,getCards,getFortune,user,baseURL)
{
  display;
  restartAction; // recompute when display changes
  loadPreviousFortune; // Load history (happens once)
  console.log("transition");
  $0.style.display = "block";
  $0.name.style.display = "block";
  $0.question.style.display = "block";
  $0.deck.style.display = "block";

  if (display.name.length == 0) {
    // User has not filled in their name, hide everything except the name control
    $0.question.style.display = "none";
    $0.deck.style.display = "none";
    $0.cards.style.display = "none";
    $0.fortune.style.display = "none";
    $0.share.style.display = "none";
    $0.restart.style.display = "none";
    var state = "askName";
  } else if (display.question.length == 0) {
    $0.deck.style.display = "none";
    $0.cards.style.display = "none";
    $0.fortune.style.display = "none";
    $0.share.style.display = "none";
    $0.restart.style.display = "none";
    display.cards.cards = await getCards({ numCards: 3 });
    var state = "askQuestion";
  } else if (display.deck < 3) {
    $0.cards.style.display = "none";
    $0.fortune.style.display = "none";
    $0.restart.style.display = "none";
  } else if (display.deck >= 3) {
    $0.cards.style.display = "block";
    $0.fortune.style.display = "block";
    $0.name.style.display = "none";
    $0.question.style.display = "none";
    $0.deck.style.display = "none";
    $0.restart.style.display = "inline-block";
    var state = "showCards";
  }

  if ($0.fortune.value.length === 0 && display.deck >= 0) {
    // generate fortune *once*, and only once we are messing with cards
    $0.fortune.value = "...";
    $0.share.style.display = "none";
    getFortune({
      token: user.getIdToken(),
      name: display.name,
      cards: display.cards.cards,
      question: display.question
    })
      .then((fortune) => {
        $0.share.style.display = "inline-block";
        $0.share.value = `${baseURL}/${fortune.id}`;
        $0.fortune.value = fortune.reading;
        // We will also fetch it to prewarm the cache
        fetch($0.share.value);
      })
      .catch((err) => {
        $0.fortune.value = err.message;
      });
    $0.name.singleton.disabled = true;
    $0.question.singleton.disabled = true;
  }
}


function _18(md){return(
md`## Configuration`
)}

function _baseURL(){return(
"https://thetarot.online"
)}

function _20(md){return(
md`## Design`
)}

function _cards(getCards){return(
getCards({ numCards: 3 })
)}

function _22(cards,htl,width){return(
htl.html`<div style="display: flex;">
  ${cards.map(c => htl.html`<div style="width: ${Math.min(width, 650)/3}px">
    <img style="width: 100%" src=${c.imgURL}></img>
  </div>`)}
</div>`
)}

function _23(md){return(
md`#### whoInput`
)}

function _NAME_MAX_LENGTH(){return(
50
)}

function _name(whoInput){return(
whoInput()
)}

function _whoInput(DOM,view,textBackground,borderColor,htl,NAME_MAX_LENGTH){return(
() => {
  const uid = DOM.uid().id;
  const ui = view`<label for=${uid} style="display:block; color: white; background-color: ${textBackground}; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor};">Who asks the cards?
${[
  "...",
  htl.html`<textarea id=${uid} style="width:100%; display:block; box-sizing:border-box; color: white; background-color: ${textBackground}; padding: 10px; border-radius: 10px;" type="text" placeholder="your first name? someone else's name?" maxlength=${NAME_MAX_LENGTH}>`
]}
</label>`;
  return ui;
}
)}

function _27(md){return(
md`#### questionInput`
)}

function _QUESTION_MAX_LENGTH(){return(
950
)}

function _question(questionInput){return(
questionInput()
)}

function _questionInput(DOM,view,textBackground,borderColor,htl,QUESTION_MAX_LENGTH){return(
() => {
  const uid = DOM.uid().id;
  return view`<label for=${uid} style="display:block; color: white; background-color: ${textBackground}; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor};" for="cheese">What is the question for the cards? You can include important context.
  ${[
    "...",
    htl.html`<textarea id=${uid} style="width:100%; display:block; box-sizing:border-box; color: white; background-color: ${textBackground}; padding: 10px; border-radius: 10px;" rows=10 placeholder="Write your question here..." maxlength=${QUESTION_MAX_LENGTH}>`
  ]}</textarea>
</label>`;
}
)}

function _31(md){return(
md`#### fortuneOutput`
)}

function _fortuneOutput(DOM,view,textBackground,borderColor,htl){return(
() => {
  const uid = DOM.uid().id;
  return view`<div style="display:block; color: white; background-color: ${textBackground}; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor};">${[
    "...",
    htl.html`<textarea disabled="true" id=${uid} style="width:100%; display:block; box-sizing:border-box; color: white; background-color: ${textBackground}; padding: 10px; border-radius: 10px;" rows=10></textarea>`
  ]}<small>
    ⚠️ interpretation by artificial intelligence. For entertainment only.
    </small></div>`;
}
)}

function _fortuneOutputExample(fortuneOutput){return(
fortuneOutput()
)}

function _34($0){return(
$0.value = "cool"
)}

function _35(md){return(
md`#### Share button`
)}

function _shareButton(view,textBackground,borderColor,htl){return(
(url = "https://example.com") => {
  const ui = view`<div style="display:inline-block; background-color: ${textBackground}; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor};">
    <p style="color: white;text-align:center">Share this fortune using the following link</p>
    <div style="font-size:24px; display: inline-flex;">
      <div style="position: relative;top:1px; padding-right: 10px">🔗</div>${[
        "...",
        htl.html`<input class="url"  style="border: none; color: white; width:300px" type="text" disabled value="${url}">`
      ]}
      <button class="btn" style="border: none;width: 70px; background-color: #28a745" onclick=${() => {
        navigator.clipboard.writeText(ui.querySelector(".url").value);
        ui.querySelector(".btn").innerHTML = "Copied";
        setTimeout(() => {
          ui.querySelector(".btn").innerHTML = "Copy";
        }, 1000);
      }}>Copy</button>
    </div>
  </div>`;
  return ui;
}
)}

function _shareButtonExample(shareButton){return(
shareButton()
)}

function _38($0){return(
$0.value = "https://cool2.com "
)}

function _39(md){return(
md`#### restartButton`
)}

function _restartButton(view,borderColor){return(
(url = "https://example.com") => {
  const ui = view`<button class="btn" style="display:inline-block; background-color: #28a745; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor}; color: white; font-size: 25px">Ask another question</button>`;
  return ui;
}
)}

function _restartButtonExample(restartButton){return(
restartButton()
)}

function _42(md){return(
md`#### pickCards`
)}

function _cardBack(FileAttachment){return(
FileAttachment("image@4.png").image()
)}

function _backUrl(FileAttachment){return(
FileAttachment("image@4.png").url()
)}

function _pickCards(htl,spreadConfig,backUrl,Event){return(
() => {
  let state = "stack";
  const stack = () => htl.svg`<g transform="translate(500 ${spreadConfig.oy})">
      ${Array.from({ length: 78 }).map(
        (_, i) => htl.svg`<g class="spread" transform="rotate(${
          spreadConfig.oa
        })">
        <g transform="translate(0 ${spreadConfig.dy})">
          <image style="pointer-events: fill" class="card" width="100" height="150" href=${backUrl} onclick=${(
          evt
        ) => {
          if (state === "stack") {
            state = "spread";
            const spreads = ui.querySelectorAll(".spread");
            for (const i in spreads) {
              const element = spreads[i];
              if (element.classList) {
                element.classList.add("pickable");
                const spread = htl.svg`<animateTransform attributeName="transform"
                              attributeType="XML"
                              type="rotate"
                              from="${spreadConfig.oa}"
                              to="${-i * spreadConfig.da + spreadConfig.oa}"
                              dur="0.5s"
                              fill="freeze"/>`;
                element.appendChild(spread);
                spread.beginElement();
              }
            }
            ui.value = 0;
            ui.dispatchEvent(new Event("input", { bubbles: true }));
          } else if (state === "spread") {
            const slide = htl.svg`<animateTransform attributeName="transform"
                          attributeType="XML"
                          type="translate"
                          from="0 0"
                          to="0 -100"
                          dur="0.5s"
                          fill="freeze"/>`;
            const fade = htl.svg`<animate attributeName="opacity" dur="0.5" keyTimes="0;1" values="1;0;" fill="freeze"/>`;
            evt.target.appendChild(slide);
            evt.target.appendChild(fade);
            slide.beginElement();
            fade.beginElement();
            ui.value++;
            ui.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }}>
        </image>
      </g></g>`
      )}
    </g>`;
  const ui = htl.svg`<svg viewbox="0 0 1000 400" style="margin-top:-10%">${stack()}</svg>`;
  ui.reset = () => {
    ui.innerHTML = "";
    ui.appendChild(stack());
    state = ui.value = "stack";
    ui.dispatchEvent(new Event("input", { bubbles: true }));
  };
  return ui;
}
)}

function _46(htl){return(
htl.html`<style>
  .pickable .card:hover {
    filter: hue-rotate(180deg);
    y: -10
  }
</style>`
)}

function _el(){return(
document.createElement("div")
)}

function _pickCardsExample(pickCards){return(
pickCards()
)}

function _49(pickCardsExample){return(
pickCardsExample
)}

function _50($0){return(
$0.reset()
)}

function _spreadConfig(verticalSliders){return(
verticalSliders({
  names: ["dy", "oy", "da", "oa"],
  labels: ["dy", "oy", "da", "oa"],
  mins: [-1000, -1000, -2, -90],
  maxs: [1000, 1000, 2, 90],
  steps: [1, 1, 0.01, 1],
  values: [-818, 948, -0.77, -33]
})
)}

function _52(spreadConfig){return(
spreadConfig
)}

function _53(md){return(
md`#### Show cards`
)}

function _showCards(juice,htl,boardw,cpad,coffsetx,coffsety,texty,cwidth){return(
juice(
  (cards) => {
    const ui = htl.svg`<svg viewBox="0 0 ${boardw} 400" width="100%">
    ${cards.map(
      (c, i) => htl.svg`<g transform="translate(${
        cpad * i + coffsetx
      } ${coffsety})">
      <rect x="0" y="${texty}" width="${cwidth}px" height="40px" stroke="red" stroke-width="3px" />
      <text x=${cwidth / 2} y="${
        texty + 25
      }" style="font: 40px serif; fill: red;" dominant-baseline="middle" text-anchor="middle" >${
        i == 0 ? "PAST" : i == 1 ? "PRESENT" : "FUTURE"
      }</text> 
      <image width=${cwidth} href=${c.imgURL} />
    `
    )}
  </svg>`;
    return ui;
  },
  { cards: "[0]" }
)
)}

function _exampleCards(showCards,cards){return(
showCards(cards)
)}

function _56(exampleCards){return(
exampleCards
)}

function _57(Inputs,exampleCards,getCards){return(
Inputs.button("shuffle", {
  reduce: async () => (exampleCards.cards = await getCards({ numCards: 3 }))
})
)}

function _58(md){return(
md`## Social Image Generator Pipeline`
)}

function _59(exampleOutput,htl){return(
htl.html`<img src="${exampleOutput}">`
)}

function _exampleOutput(Inputs,socialImage){return(
Inputs.button("Run social Image flowQueue", {
  reduce: () =>
    socialImage({
      shareId: "-MydHQ7WsdpMYfOwMUcY"
    })
})
)}

function _socialImage($0){return(
async ({ shareId } = {}) =>
  $0.send({
    shareId
  })
)}

function _socialImageParams(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _63(socialImageParams){return(
socialImageParams
)}

async function _socialData(adminFirebase,socialImageParams){return(
(
  await adminFirebase
    .database()
    .ref(`@tomlarkworthy/tarot-backend/calls/${socialImageParams.shareId}`)
    .once("value")
).val()
)}

async function _image(socialData,socialImageInner,findCardsByName,$0)
{
  if (socialData) {
    return socialImageInner({
      cards: await findCardsByName(socialData.cards),
      reading: socialData.reading.choices[0].text
    });
  } else {
    const err = new Error("Can't find fortune");
    err.status = 404;
    $0.reject(err);
    return err;
  }
}


function _67(md){return(
md`#### socialImageInner`
)}

function _boardw(){return(
1218
)}

function _boardh(){return(
618
)}

function _texty(Inputs){return(
Inputs.range([-100, 500], {
  label: "text offset y",
  step: 1,
  value: -45
})
)}

function _coffsetx(Inputs){return(
Inputs.range([0, 500], {
  label: "card offset x",
  step: 1,
  value: 172
})
)}

function _coffsety(Inputs){return(
Inputs.range([0, 500], {
  label: "card offset y",
  step: 1,
  value: 74
})
)}

function _cwidth(Inputs){return(
Inputs.range([0, 500], {
  label: "card width",
  step: 1,
  value: 176
})
)}

function _cpad(Inputs){return(
Inputs.range([0, 500], {
  label: "card spacing",
  step: 1,
  value: 347
})
)}

function _textBackground(colorPicker){return(
colorPicker("rgba(19, 17, 43, 0.77)")
)}

function _borderColor(colorPicker){return(
colorPicker("rgb(181, 101, 101)")
)}

function _socialImageInner(svg,boardw,FileAttachment,htl,cpad,coffsetx,coffsety,texty,cwidth,boardh,textBackground,borderColor){return(
async ({ reading, cards } = {}) => {
  const promises = [];
  const ui = svg`<svg viewBox="0 0 ${boardw} 618" width="100%">
  <image width="100%" href=${await FileAttachment(
    "imgonline-com-ua-TextureSeamless-ddu5gFbCzzWeXp.jpg"
  ).url()} />
  ${cards.map(
    (c, i) => htl.svg`<g transform="translate(${
      cpad * i + coffsetx
    } ${coffsety})">
    <rect x="0" y="${texty}" width="${cwidth}px" height="40px" stroke="red" stroke-width="3px" />
    <text x=${cwidth / 2} y="${
      texty + 25
    }" style="font: 40px serif; fill: red;" dominant-baseline="middle" text-anchor="middle" >${
      i == 0 ? "PAST" : i == 1 ? "PRESENT" : "FUTURE"
    }</text> 
    <image width=${cwidth} href=${c.imgURL} />
  `
  )}

  <foreignObject x="50" width="${boardw - 100}px" y="${
    (boardh * 2) / 3 - 30
  }" height="${boardh / 3}">
    <div style="background-color: ${textBackground}; border-radius: 10px; border: solid ${borderColor};">
      <div class="fortune" style="color:white; width:${
        boardw - 140
      }px; height:${boardh / 3 - 5}px;font-family: Montserrat">
        ${reading}
      </div>
    </div>
  </foreignObject>
</svg>`;

  await Promise.all(
    [...ui.querySelectorAll("image")].map((img) => img.decode())
  ).catch(() => {});
  return ui;
}
)}

async function _fitImage(textFit,image)
{
  await textFit(image.querySelector(".fortune"), {
    alignHoriz: true,
    alignVert: true
  });
  return image;
}


function _jpeg(dom2img,fitImage){return(
dom2img.toJpeg(fitImage)
)}

async function _dom2img(){return(
await import("https://cdn.skypack.dev/html-to-image@1.9.0?min")
)}

function _81(md){return(
md`#### End of Social Image Generation Pipeline`
)}

function _82($0,jpeg){return(
$0.respond(jpeg)
)}

function _83(md){return(
md`## Business Logic`
)}

function _reading(Inputs){return(
Inputs.input(undefined)
)}

function _readingOrEmpty($0){return(
$0.value || ""
)}

function _86(md){return(
md`### Run tarot reading in remote service

We can pass the cards and question and name parameters to a webcode.run endpoint, which runs the core code remotely, and injects the OPENAI_API_KEY secret so you do not need to fill this out.
`
)}

function _clientResponse(Inputs,getFortune,user,cards,$0,Event){return(
Inputs.button("run remote", {
  reduce: async () => {
    const data = (
      await getFortune({
        token: user.getIdToken(),
        name: "Tom",
        cards: cards.map((c) => c.name),
        question: "Will I be rich?"
      })
    ).reading;
    $0.value = data;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
    return data;
  }
})
)}

function _88(md){return(
md`### getFortune API client `
)}

function _getFortune(apiServer,user){return(
async ({ name, token, cards, question } = {}) => {
  const url = `${apiServer.href}?config=${btoa(
    JSON.stringify({
      name,
      cards: cards.map((c) => c.name),
      question
    })
  )}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await user.getIdToken()}`
    }
  });
  if (response.status === 200) return await response.json();
  else {
    throw new Error(`Error ${response.status}: ${await response.text()}`);
  }
}
)}

function _90(md){return(
md`## API Server`
)}

function _91(md){return(
md`### [Optional] Local Credentials`
)}

function _OPENAI_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({ label: "OPENAI_API_KEY", placeholder: "API KEY" }),
  localStorageView("OPENAI_API_KEY")
)
)}

function _ADMIN_SERVICE_ACCOUNT(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({ label: "TAROT_ADMIN_SERVICE_ACCOUNT" }),
  localStorageView("TAROT_ADMIN_SERVICE_ACCOUNT")
)
)}

function _94(Inputs,$0,cards,OPENAI_API_KEY,ADMIN_SERVICE_ACCOUNT,user,$1,Event,md){return(
md`This button uses the local credentials and bypasses the API by writing straight the the pipeline.

${Inputs.button("trigger API pipeline using local credentials", {
  required: true,
  reduce: async () => {
    const data = await $0.send({
      name: "Tom",
      cards: cards.map((c) => c.name),
      question: "Will I be rich?",
      OPENAI_API_KEY,
      ADMIN_SERVICE_ACCOUNT,
      token: await user.getIdToken()
    });

    $1.value = data;
    $1.dispatchEvent(new Event("input", { bubbles: true }));
  }
})}`
)}

function _95(md){return(
md`### Load Test

We had some difficulties with stability, the load test fires 5 overlapping requests to test the concurrent behaviour`
)}

function _results(Inputs,$0,cards,OPENAI_API_KEY,ADMIN_SERVICE_ACCOUNT,user){return(
Inputs.button(
  "trigger 5 API pipeline requests using local credentials",
  {
    required: true,
    reduce: async () => {
      return await Promise.all(
        Array.from({ length: 5 }).map(async () =>
          $0.send({
            name: "Tom",
            cards: cards.map((c) => c.name),
            question: "Will I be rich?",
            OPENAI_API_KEY,
            ADMIN_SERVICE_ACCOUNT,
            token: await user.getIdToken()
          })
        )
      );
    }
  }
)
)}

function _97(md){return(
md`### Debug Case`
)}

function _debugConfig(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "Enter config"
  }),
  localStorageView("tarotConfig")
)
)}

function _parsedDebugConfig(debugConfig){return(
JSON.parse(atob(debugConfig))
)}

function _debugResults(Inputs,$0,parsedDebugConfig,OPENAI_API_KEY,ADMIN_SERVICE_ACCOUNT,user){return(
Inputs.button("run debug case", {
  required: true,
  reduce: async () =>
    $0.send({
      ...parsedDebugConfig,
      OPENAI_API_KEY,
      ADMIN_SERVICE_ACCOUNT,
      token: await user.getIdToken()
    })
})
)}

function _101(apiServer,md){return(
md`### <a target="_blank" href=${apiServer.href + '?health'}>HTTP Endpoint</a>`
)}

function _apiServer(endpoint,$0){return(
endpoint(
  "api",
  async (req, res, ctx) => {
    // save in a DB, deduplication, rate limit, authentication
    const config = JSON.parse(
      atob(req.query.config || /* base64('{}') = */ "e30=")
    ); // name, cards, questions
    config.health = req.query.health !== undefined;
    config.token = req.headers["authorization"]?.split(" ")[1];
    config.OPENAI_API_KEY = ctx.secrets.OPENAI_API_KEY; // Mixin API_KEY from secrets
    config.ADMIN_SERVICE_ACCOUNT = ctx.secrets.secretadmin_service_account_key;
    const response = await $0.send(config);
    res.json(response);
  },
  {
    modifiers: ["orchistrator"],
    hostNotebook: "@tomlarkworthy/tarot-backend"
  }
)
)}

function _103(md){return(
md`### API Request pipeline`
)}

function _config(flowQueue){return(
flowQueue({ timeout_ms: 15000 })
)}

function _105(config){return(
config
)}

function _106(md){return(
md`#### Validate User Input`
)}

function _validatedConfig(config,$0,QUESTION_MAX_LENGTH,NAME_MAX_LENGTH)
{
  var msg = "unknown";

  if (config.health) {
    return $0.respond("ok"); // Check queue health if param is 'health'
  }

  if (config.question.length >= QUESTION_MAX_LENGTH) {
    msg = "Question too long";
  } else if (!config.question || config.question == "") {
    msg = "No question";
  } else if (config.name.length >= NAME_MAX_LENGTH) {
    msg = "Name too long";
  } else if (!config.name || config.name == "") {
    msg = "No name";
  } else {
    return config;
  }

  const err = new Error(msg);
  err.status = 400;
  $0.reject(err);
  throw new Error(`Invalid request ${msg}`);
}


function _108(md){return(
md`### User token validation`
)}

function _currentUser(validatedConfig,invalidation,verifyIdToken,adminFirebase,$0)
{
  if (validatedConfig.health) return invalidation; // Processing stops when doing a health check here.
  try {
    return verifyIdToken(adminFirebase, validatedConfig.token);
  } catch (err) {
    $0.reject(err);
  }
}


function _110(md){return(
md`#### Rate limit check`
)}

function _currentUsersRequestsInLastDay(requestsInLastDay,currentUser){return(
requestsInLastDay(currentUser.uid)
)}

function _rateLimitOk(currentUsersRequestsInLastDay,$0,invalidation)
{
  if (currentUsersRequestsInLastDay < 20) {
    return true;
  } else {
    console.log("currentUsersRequestsInLastDay", currentUsersRequestsInLastDay);
    const err = new Error("You have exceeded your quota");
    err.status = 402;
    $0.reject(err);
    return invalidation;
  }
}


function _113(md){return(
md`#### Call openAI`
)}

function _openapi_reponse(rateLimitOk,recordMeteredUse,currentUser,config,settings){return(
rateLimitOk,
recordMeteredUse(currentUser.uid),
fetch("https://api.openai.com/v1/engines/text-davinci-001/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    prompt: `You are a tarot card reader. ${config.name} asks "${config.question}".

You turn three cards over. None are reversed. The first card, representing the past, is the "${config.cards[0]}". The second card, representing the present is the "${config.cards[1]}". The third card, the future, is the "${config.cards[2]}".

you tell ${config.name} the meaning of the cards and their positions.`,
    ...settings
  })
})
)}

function _115(md){return(
md`#### OpenAI Generation Settings`
)}

function _settings(){return(
{
  temperature: 0.8,
  max_tokens: 250,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}
)}

function _117(md){return(
md`#### OpenAI Response`
)}

async function _result(openapi_reponse,$0){return(
openapi_reponse.status === 200
  ? openapi_reponse.json()
  : $0.reject(new Error(await openapi_reponse.text()))
)}

function _119(md){return(
md`#### Record OpenAI Response in History`
)}

function _id(persistHistory,$0,settings,result)
{
  try {
    return persistHistory({
      ...$0.value,
      settings,
      reading: result
    });
  } catch (err) {
    $0.respond(result);
    throw err;
  }
}


function _121(md){return(
md`### history`
)}

function _persistHistory(adminFirebase){return(
async ({ name, cards, question, reading, settings } = {}) => {
  const snap = await adminFirebase
    .database()
    .ref(`/@tomlarkworthy/tarot-backend/calls/`)
    .push({
      name,
      question,
      cards,
      reading,
      settings,
      time: { ".sv": "timestamp" }
    });
  return snap.key;
}
)}

function _123(md){return(
md`#### OpenAI Text Safety Classification`
)}

function _classification(contentFilter,result,config){return(
contentFilter({
  content: result.choices[0].text,
  API_KEY: config.OPENAI_API_KEY
})
)}

function _125(md){return(
md`### Rate limiting`
)}

function _126(Inputs,recordMeteredUse,user){return(
Inputs.button("record use", {
  reduce: () => recordMeteredUse(user.uid)
})
)}

function _recordMeteredUse(firebase){return(
(uid) =>
  firebase
    .database()
    .ref(`/@tomlarkworthy/tarot-backend/users/${uid}/history/`)
    .push({ ".sv": "timestamp" })
)}

function _requestsInLastDay(adminFirebase){return(
async (uid) => {
  const snap = await adminFirebase
    .database()
    .ref(`/@tomlarkworthy/tarot-backend/users/${uid}/history`)
    .once("value");
  return Object.values(snap.val() || {}).reduce(
    (sum, timestamp) =>
      timestamp > Date.now() - 1000 * 60 * 60 * 24 ? sum + 1 : sum,
    0
  );
}
)}

function _quota(htl,user){return(
htl.html`<a target="_blank" href="https://console.firebase.google.com/u/0/project/larkworthy-dfb11/database/larkworthy-dfb11-default-rtdb/data/@tomlarkworthy/tarot-backend/users/${user.uid}/history">quota records`
)}

function _130(md){return(
md`### Content Filter

https://beta.openai.com/docs/engines/content-filter

  - 0: The text is safe.
  - 1: This text is sensitive. This means that the text could be talking about a sensitive topic, something political, religious, or talking about a protected class such as race or nationality.
  - 2: This text is unsafe. This means that the text contains profane language, prejudiced or hateful language, something that could be NSFW, or text that portrays certain groups/people in a harmful manner.`
)}

function _contentFilter(){return(
async ({ content, API_KEY } = {}) => {
  const response = await fetch(
    `https://api.openai.com/v1/engines/content-filter-alpha/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: `<|endoftext|>${content}\n--\nLabel:`,
        temperature: 0,
        max_tokens: 1,
        top_p: 0,
        logprobs: 10
      })
    }
  );

  if (response.status !== 200) throw new Error(await response.text());

  const responseJson = await response.json();
  var output_label = responseJson["choices"][0]["text"];

  const toxic_threshold = -0.355;

  if (output_label == "2") {
    const logprobs = responseJson["choices"][0]["logprobs"]["top_logprobs"][0];
    if (logprobs["2"] < toxic_threshold) {
      const logprob_0 = logprobs["0"];
      const logprob_1 = logprobs["1"];

      if (logprob_0 && logprob_1) {
        if (logprob_0 >= logprob_1) {
          output_label = "0";
        } else {
          output_label = "1";
        }
      } else if (logprob_0) {
        output_label = "0";
      } else {
        output_label = "1";
      }
    }
  }
  if (!["0", "1", "2"].includes(output_label)) {
    output_label = "2";
  }
  return Number.parseInt(output_label);
}
)}

function _exampleFilter(Inputs,loremIpsum,contentFilter,OPENAI_API_KEY){return(
Inputs.button("testContentFilter", {
  reduce: async () => {
    const text = loremIpsum({
      count: 1, // Number of "words", "sentences", or "paragraphs"
      format: "plain", // "plain" or "html"
      paragraphLowerBound: 3, // Min. number of sentences per paragraph.
      paragraphUpperBound: 7, // Max. number of sentences per paragarph.
      random: Math.random, // A PRNG function
      sentenceLowerBound: 5, // Min. number of words per sentence.
      sentenceUpperBound: 15, // Max. number of words per sentence.
      suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
      units: "paragraph" // paragraph(s), "sentence(s)", or "word(s)"
    });
    return await contentFilter({
      API_KEY: OPENAI_API_KEY,
      content: text
    });
  }
})
)}

function _133(exampleFilter){return(
exampleFilter
)}

function _134(md){return(
md`#### uploadObject to Cloud Storage`
)}

function _uploadObject(){return(
async ({ name, access_token, content_type, content } = {}) => {
  /*
   curl -X POST --data-binary @data.txt \
    -H "Authorization: Bearer $OAUTH2_TOKEN" \
    -H "Content-Type: application/txt" \
    "https://storage.googleapis.com/upload/storage/v1/b/larkworthy-dfb11.appspot.com/o?uploadType=media&name=data.txt"
  */
  const bucket = "larkworthy-dfb11.appspot.com";

  const response = await fetch(
    `https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(
      name
    )}`,
    {
      method: "POST",
      headers: {
        "content-type": content_type,
        Authorization: `Bearer ${access_token}`
      },
      body: content
    }
  );
  if (response.status !== 200) throw new Error(`${await response.text()}`);
  else return response.json();
}
)}

function _136(md){return(
md`### Generate Social Image`
)}

function _fortuneImg(socialImage,id){return(
socialImage({
  shareId: id
})
)}

async function _fortuneImageData(fortuneImg){return(
await fetch(fortuneImg)
  .then((res) => res.blob())
  .then((res) => res.arrayBuffer())
)}

function _access_token(getAccessTokenFromServiceAccount,config){return(
getAccessTokenFromServiceAccount(config.ADMIN_SERVICE_ACCOUNT)
)}

function _140(fortuneImageData){return(
fortuneImageData
)}

function _141(md){return(
md`#### uploadImageToCloud`
)}

async function _cloudImage(uploadObject,id,access_token,fortuneImageData){return(
{
  upload: await uploadObject({
    name: `@tomlarkworthy/tarot-backend/images/${id}`,
    content_type: "image/jpeg",
    access_token,
    content: fortuneImageData
  }),
  id
}
)}

function _143(md){return(
md`#### Render page()`
)}

function _page(baseURL){return(
({ name, question, imgURL, shareId } = {}) => `<!DOCTYPE html>
<head>
  <title>${name ? `Tarot Reading for ${name}` : "Tarot Reader"}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no;user-scalable=0;">
  <meta property="og:title" content="${
    name ? `Tarot Reading for ${name}` : "Tarot Reader"
  }">
  <meta property="og:description" content="${
    question || "Ask a question for the cards"
  }">
  <meta name="description" content="${
    question || "Ask a question for the cards"
  }">

  <meta property="og:type" content="article" />
  <meta property="og:image" content="${
    imgURL ||
    "https://storage.googleapis.com/larkworthy-dfb11.appspot.com/%40tomlarkworthy/tarot-backend/images/-MyWC6L4ZE1HtVWM1SRc"
  }">
  <meta property="og:url" content="${
    shareId ? `${baseURL}/${shareId}` : "https://thetarot.online"
  }">
  <meta name="twitter:card" content="summary_large_image">
</head>
<body style="background-color:black;">
<div id="display"></div>
<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import notebook from "https://api.observablehq.com/@tomlarkworthy/tarot-backend.js?v=3";
new Runtime().module(notebook, name => {

  if (name === "viewof display") {
    return new Inspector(document.querySelector("#display"));
  } else if (name === "transitions") {
    return true;
  }
});
</script>
<script defer data-domain="thetarot.online" src="https://plausible.io/js/plausible.js"></script>`
)}

function _145(md){return(
md`### upload share page`
)}

async function _uploads(uploadObject,id,access_token,page,config,cloudImage){return(
{
  html: await uploadObject({
    name: `@tomlarkworthy/tarot-backend/pages/${id}`,
    content_type: "text/html",
    access_token,
    content: page({
      shareId: id,
      name: config.name,
      question: config.question,
      imgURL: cloudImage.upload.mediaLink
    })
  }),
  img: cloudImage.upload,
  id
}
)}

function _147(md){return(
md`#### End of Pipeline`
)}

function _responder(uploads,classification,$0,id,result)
{
  uploads;
  try {
    if (classification == 0) {
      $0.respond({
        id,
        reading: result.choices[0].text
      });
    } else {
      const err = new Error(
        `Response was classified as sensative or unsafe. Try a different question.`
      );
      err.status = 400;
      throw err;
    }
  } catch (err) {
    $0.reject(err);
  }
}


function _149(md){return(
md`### manual deploy <a target="_blank" href="https://storage.googleapis.com/larkworthy-dfb11.appspot.com/@tomlarkworthy/tarot-backend/pages/index.html">index.html</a>`
)}

function _150(Inputs,uploadObject,getAccessTokenFromServiceAccount,ADMIN_SERVICE_ACCOUNT,page){return(
Inputs.button("update index.html", {
  reduce: async () => {
    await uploadObject({
      name: `@tomlarkworthy/tarot-backend/pages/index.html`,
      content_type: "text/html",
      access_token: await getAccessTokenFromServiceAccount(
        ADMIN_SERVICE_ACCOUNT
      ),
      content: page({})
    });
  }
})
)}

function _151(md){return(
md`### Clientside User`
)}

async function _user(firebase){return(
(await firebase.auth().signInAnonymously()).user
)}

function _153(md){return(
md`### Debugging

We will allow the notebook state to be serialized`
)}

function _trackingVariable_e3366d24de62(){return(
true
)}

function _exampleSnapshot(notebookSnapshot){return(
notebookSnapshot()
)}

function _trackedSnapshot(notebookSnapshot){return(
notebookSnapshot("trackingVariable_e3366d24de62")
)}

function _158(endpoint,notebookSnapshot){return(
endpoint("variables", async (req, res) => {
  res.json(
    (await notebookSnapshot("trackingVariable_e3366d24de62")).map(
      (variable) => ({
        state: variable.state,
        name: variable.name,
        // Note these cells might contain personal information, so we only allow errors values to leave the environment
        ...(variable.state === "rejected" && { value: variable.value })
      })
    )
  );
})
)}

function _159(md){return(
md`## Firebase Backends`
)}

function _userConfig(){return(
{
  name: "userbase",
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  authDomain: "larkworthy-dfb11.firebaseapp.com",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  storageBucket: "larkworthy-dfb11.appspot.com",
  messagingSenderId: "786910701676",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

function _adminConfig(){return(
{
  name: "adminbase",
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  authDomain: "larkworthy-dfb11.firebaseapp.com",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  storageBucket: "larkworthy-dfb11.appspot.com",
  messagingSenderId: "786910701676",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

function _164(md){return(
md`## Utilities`
)}

function _165(md){return(
md`### findCardsByName`
)}

function _findCardsByName(promiseRecursive,cardData,fileAttachments){return(
async (cardNames) =>
  await promiseRecursive(
    cardNames
      .map((cardName) => cardData.cards.find((cd) => cd.name === cardName))
      .map((c) => ({
        name: c.name,
        imgURL: fileAttachments[c.img].url()
      }))
  )
)}

function _167(md){return(
md`### promiseRecursive`
)}

function _promiseRecursive(){return(
function promiseRecursive(obj) {
  const getPromises = (obj) =>
    Object.keys(obj).reduce(
      (acc, key) =>
        Object(obj[key]) !== obj[key]
          ? acc
          : acc.concat(
              typeof obj[key].then === "function"
                ? [[obj, key]]
                : getPromises(obj[key])
            ),
      []
    );
  const all = getPromises(obj);
  return Promise.all(all.map(([obj, key]) => obj[key])).then(
    (responses) => (
      all.forEach(([obj, key], i) => (obj[key] = responses[i])), obj
    )
  );
}
)}

function _169(md){return(
md`## Dependencies`
)}

function _font(htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
</style>`
)}

function _textFit(HTMLElement)
{
  var defaultSettings = {
    alignVert: false, // if true, textFit will align vertically using css tables
    alignHoriz: false, // if true, textFit will set text-align: center
    multiLine: false, // if true, textFit will not set white-space: no-wrap
    detectMultiLine: true, // disable to turn off automatic multi-line sensing
    minFontSize: 6,
    maxFontSize: 80,
    reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
    widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
    alignVertWithFlexbox: false // if true, textFit will use flexbox for vertical alignment
  };

  return function textFit(els, options) {
    if (!options) options = {};

    // Extend options.
    var settings = {};
    for (var key in defaultSettings) {
      if (options.hasOwnProperty(key)) {
        settings[key] = options[key];
      } else {
        settings[key] = defaultSettings[key];
      }
    }

    // Convert jQuery objects into arrays
    if (typeof els.toArray === "function") {
      els = els.toArray();
    }

    // Support passing a single el
    var elType = Object.prototype.toString.call(els);
    if (
      elType !== "[object Array]" &&
      elType !== "[object NodeList]" &&
      elType !== "[object HTMLCollection]"
    ) {
      els = [els];
    }

    // Process each el we've passed.
    for (var i = 0; i < els.length; i++) {
      processItem(els[i], settings);
    }
  };

  /**
   * The meat. Given an el, make the text inside it fit its parent.
   * @param  {DOMElement} el       Child el.
   * @param  {Object} settings     Options for fit.
   */
  function processItem(el, settings) {
    if (
      !isElement(el) ||
      (!settings.reProcess && el.getAttribute("textFitted"))
    ) {
      return false;
    }

    // Set textFitted attribute so we know this was processed.
    if (!settings.reProcess) {
      el.setAttribute("textFitted", 1);
    }

    var innerSpan, originalHeight, originalHTML, originalWidth;
    var low, mid, high;

    // Get element data.
    originalHTML = el.innerHTML;
    originalWidth = innerWidth(el);
    originalHeight = innerHeight(el);

    // Don't process if we can't find box dimensions
    if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
      if (!settings.widthOnly)
        throw new Error(
          "Set a static height and width on the target element " +
            el.outerHTML +
            " before using textFit!"
        );
      else
        throw new Error(
          "Set a static width on the target element " +
            el.outerHTML +
            " before using textFit!"
        );
    }

    // Add textFitted span inside this container.
    if (originalHTML.indexOf("textFitted") === -1) {
      innerSpan = document.createElement("span");
      innerSpan.className = "textFitted";
      // Inline block ensure it takes on the size of its contents, even if they are enclosed
      // in other tags like <p>
      innerSpan.style["display"] = "inline-block";
      innerSpan.innerHTML = originalHTML;
      el.innerHTML = "";
      el.appendChild(innerSpan);
    } else {
      // Reprocessing.
      innerSpan = el.querySelector("span.textFitted");
      // Remove vertical align if we're reprocessing.
      if (hasClass(innerSpan, "textFitAlignVert")) {
        innerSpan.className = innerSpan.className.replace(
          "textFitAlignVert",
          ""
        );
        innerSpan.style["height"] = "";
        el.className.replace("textFitAlignVertFlex", "");
      }
    }

    // Prepare & set alignment
    if (settings.alignHoriz) {
      el.style["text-align"] = "center";
      innerSpan.style["text-align"] = "center";
    }

    // Check if this string is multiple lines
    // Not guaranteed to always work if you use wonky line-heights
    var multiLine = settings.multiLine;
    if (
      settings.detectMultiLine &&
      !multiLine &&
      innerSpan.getBoundingClientRect().height >=
        parseInt(window.getComputedStyle(innerSpan)["font-size"], 10) * 2
    ) {
      multiLine = true;
    }

    // If we're not treating this as a multiline string, don't let it wrap.
    if (!multiLine) {
      el.style["white-space"] = "nowrap";
    }

    low = settings.minFontSize;
    high = settings.maxFontSize;

    // Binary search for highest best fit
    var size = low;
    while (low <= high) {
      mid = (high + low) >> 1;
      innerSpan.style.fontSize = mid + "px";
      var innerSpanBoundingClientRect = innerSpan.getBoundingClientRect();
      if (
        innerSpanBoundingClientRect.width <= originalWidth &&
        (settings.widthOnly ||
          innerSpanBoundingClientRect.height <= originalHeight)
      ) {
        size = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
      // await injection point
    }
    // found, updating font if differs:
    if (innerSpan.style.fontSize != size + "px")
      innerSpan.style.fontSize = size + "px";

    // Our height is finalized. If we are aligning vertically, set that up.
    if (settings.alignVert) {
      addStyleSheet();
      var height = innerSpan.scrollHeight;
      if (window.getComputedStyle(el)["position"] === "static") {
        el.style["position"] = "relative";
      }
      if (!hasClass(innerSpan, "textFitAlignVert")) {
        innerSpan.className = innerSpan.className + " textFitAlignVert";
      }
      innerSpan.style["height"] = height + "px";
      if (
        settings.alignVertWithFlexbox &&
        !hasClass(el, "textFitAlignVertFlex")
      ) {
        el.className = el.className + " textFitAlignVertFlex";
      }
    }
  }

  // Calculate height without padding.
  function innerHeight(el) {
    var style = window.getComputedStyle(el, null);
    return (
      el.getBoundingClientRect().height -
      parseInt(style.getPropertyValue("padding-top"), 10) -
      parseInt(style.getPropertyValue("padding-bottom"), 10)
    );
  }

  // Calculate width without padding.
  function innerWidth(el) {
    var style = window.getComputedStyle(el, null);
    return (
      el.getBoundingClientRect().width -
      parseInt(style.getPropertyValue("padding-left"), 10) -
      parseInt(style.getPropertyValue("padding-right"), 10)
    );
  }

  //Returns true if it is a DOM element
  function isElement(o) {
    return typeof HTMLElement === "object"
      ? o instanceof HTMLElement //DOM2
      : o &&
          typeof o === "object" &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === "string";
  }

  function hasClass(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
  }

  // Better than a stylesheet dependency
  function addStyleSheet() {
    if (document.getElementById("textFitStyleSheet")) return;
    var style = [
      ".textFitAlignVert{",
      "position: absolute;",
      "top: 0; right: 0; bottom: 0; left: 0;",
      "margin: auto;",
      "display: flex;",
      "justify-content: center;",
      "flex-direction: column;",
      "}",
      ".textFitAlignVertFlex{",
      "display: flex;",
      "}",
      ".textFitAlignVertFlex .textFitAlignVert{",
      "position: static;",
      "}"
    ].join("");

    var css = document.createElement("style");
    css.type = "text/css";
    css.id = "textFitStyleSheet";
    css.innerHTML = style;
    document.body.appendChild(css);
  }
}


async function _loremIpsum(require){return(
(await require("https://bundle.run/lorem-ipsum@2.0.4")).loremIpsum
)}

function _186(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image@4.png",new URL("./files/c754fb284a0de3b6d47a3e5ca84774670b2d9d1407794b401d9b730649f5f5ae27579518c909c5862e0f4d2c9a29da48550c35ada43ba0de457e1f43e0975274",import.meta.url)],["imgonline-com-ua-TextureSeamless-ddu5gFbCzzWeXp.jpg",new URL("./files/1b8cd6ab9c7df78a279d435fd0eb4bbf4596f94cdacca6ce8b1526083e62285f358d7813d09671307b616d97164268f9ea49099ae9ab0e63eb7ea2af45d7478e",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof display")).define("viewof display", ["font","view","FileAttachment","whoInput","questionInput","pickCards","showCards","cards","fortuneOutput","restartButton","shareButton"], _display);
  main.variable(observer("display")).define("display", ["Generators", "viewof display"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("restartAction")).define("restartAction", ["Generators","viewof display","invalidation"], _restartAction);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("shareId")).define("shareId", ["URLSearchParams","location"], _shareId);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("previousFortune")).define("previousFortune", ["firebase","shareId"], _previousFortune);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("loadPreviousFortune")).define("loadPreviousFortune", ["previousFortune","viewof display","findCardsByName","baseURL","shareId"], _loadPreviousFortune);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("transitions")).define("transitions", ["display","restartAction","loadPreviousFortune","viewof display","getCards","getFortune","user","baseURL"], _transitions);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("baseURL")).define("baseURL", _baseURL);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("cards")).define("cards", ["getCards"], _cards);
  main.variable(observer()).define(["cards","htl","width"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("NAME_MAX_LENGTH")).define("NAME_MAX_LENGTH", _NAME_MAX_LENGTH);
  main.variable(observer("viewof name")).define("viewof name", ["whoInput"], _name);
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer("whoInput")).define("whoInput", ["DOM","view","textBackground","borderColor","htl","NAME_MAX_LENGTH"], _whoInput);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("QUESTION_MAX_LENGTH")).define("QUESTION_MAX_LENGTH", _QUESTION_MAX_LENGTH);
  main.variable(observer("viewof question")).define("viewof question", ["questionInput"], _question);
  main.variable(observer("question")).define("question", ["Generators", "viewof question"], (G, _) => G.input(_));
  main.variable(observer("questionInput")).define("questionInput", ["DOM","view","textBackground","borderColor","htl","QUESTION_MAX_LENGTH"], _questionInput);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("fortuneOutput")).define("fortuneOutput", ["DOM","view","textBackground","borderColor","htl"], _fortuneOutput);
  main.variable(observer("viewof fortuneOutputExample")).define("viewof fortuneOutputExample", ["fortuneOutput"], _fortuneOutputExample);
  main.variable(observer("fortuneOutputExample")).define("fortuneOutputExample", ["Generators", "viewof fortuneOutputExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof fortuneOutputExample"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("shareButton")).define("shareButton", ["view","textBackground","borderColor","htl"], _shareButton);
  main.variable(observer("viewof shareButtonExample")).define("viewof shareButtonExample", ["shareButton"], _shareButtonExample);
  main.variable(observer("shareButtonExample")).define("shareButtonExample", ["Generators", "viewof shareButtonExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof shareButtonExample"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("restartButton")).define("restartButton", ["view","borderColor"], _restartButton);
  main.variable(observer("viewof restartButtonExample")).define("viewof restartButtonExample", ["restartButton"], _restartButtonExample);
  main.variable(observer("restartButtonExample")).define("restartButtonExample", ["Generators", "viewof restartButtonExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("cardBack")).define("cardBack", ["FileAttachment"], _cardBack);
  main.variable(observer("backUrl")).define("backUrl", ["FileAttachment"], _backUrl);
  main.variable(observer("pickCards")).define("pickCards", ["htl","spreadConfig","backUrl","Event"], _pickCards);
  main.variable(observer()).define(["htl"], _46);
  main.variable(observer("el")).define("el", _el);
  main.variable(observer("viewof pickCardsExample")).define("viewof pickCardsExample", ["pickCards"], _pickCardsExample);
  main.variable(observer("pickCardsExample")).define("pickCardsExample", ["Generators", "viewof pickCardsExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["pickCardsExample"], _49);
  main.variable(observer()).define(["viewof pickCardsExample"], _50);
  main.variable(observer("viewof spreadConfig")).define("viewof spreadConfig", ["verticalSliders"], _spreadConfig);
  main.variable(observer("spreadConfig")).define("spreadConfig", ["Generators", "viewof spreadConfig"], (G, _) => G.input(_));
  main.variable(observer()).define(["spreadConfig"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("showCards")).define("showCards", ["juice","htl","boardw","cpad","coffsetx","coffsety","texty","cwidth"], _showCards);
  main.variable(observer("viewof exampleCards")).define("viewof exampleCards", ["showCards","cards"], _exampleCards);
  main.variable(observer("exampleCards")).define("exampleCards", ["Generators", "viewof exampleCards"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleCards"], _56);
  main.variable(observer()).define(["Inputs","exampleCards","getCards"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["exampleOutput","htl"], _59);
  main.variable(observer("viewof exampleOutput")).define("viewof exampleOutput", ["Inputs","socialImage"], _exampleOutput);
  main.variable(observer("exampleOutput")).define("exampleOutput", ["Generators", "viewof exampleOutput"], (G, _) => G.input(_));
  main.variable(observer("socialImage")).define("socialImage", ["viewof socialImageParams"], _socialImage);
  main.variable(observer("viewof socialImageParams")).define("viewof socialImageParams", ["flowQueue"], _socialImageParams);
  main.variable(observer("socialImageParams")).define("socialImageParams", ["Generators", "viewof socialImageParams"], (G, _) => G.input(_));
  main.variable(observer()).define(["socialImageParams"], _63);
  main.variable(observer("socialData")).define("socialData", ["adminFirebase","socialImageParams"], _socialData);
  const child1 = runtime.module(define1);
  main.import("rasterize", child1);
  main.variable(observer("image")).define("image", ["socialData","socialImageInner","findCardsByName","viewof socialImageParams"], _image);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("boardw")).define("boardw", _boardw);
  main.variable(observer("boardh")).define("boardh", _boardh);
  main.variable(observer("viewof texty")).define("viewof texty", ["Inputs"], _texty);
  main.variable(observer("texty")).define("texty", ["Generators", "viewof texty"], (G, _) => G.input(_));
  main.variable(observer("viewof coffsetx")).define("viewof coffsetx", ["Inputs"], _coffsetx);
  main.variable(observer("coffsetx")).define("coffsetx", ["Generators", "viewof coffsetx"], (G, _) => G.input(_));
  main.variable(observer("viewof coffsety")).define("viewof coffsety", ["Inputs"], _coffsety);
  main.variable(observer("coffsety")).define("coffsety", ["Generators", "viewof coffsety"], (G, _) => G.input(_));
  main.variable(observer("viewof cwidth")).define("viewof cwidth", ["Inputs"], _cwidth);
  main.variable(observer("cwidth")).define("cwidth", ["Generators", "viewof cwidth"], (G, _) => G.input(_));
  main.variable(observer("viewof cpad")).define("viewof cpad", ["Inputs"], _cpad);
  main.variable(observer("cpad")).define("cpad", ["Generators", "viewof cpad"], (G, _) => G.input(_));
  main.variable(observer("viewof textBackground")).define("viewof textBackground", ["colorPicker"], _textBackground);
  main.variable(observer("textBackground")).define("textBackground", ["Generators", "viewof textBackground"], (G, _) => G.input(_));
  main.variable(observer("viewof borderColor")).define("viewof borderColor", ["colorPicker"], _borderColor);
  main.variable(observer("borderColor")).define("borderColor", ["Generators", "viewof borderColor"], (G, _) => G.input(_));
  main.variable(observer("socialImageInner")).define("socialImageInner", ["svg","boardw","FileAttachment","htl","cpad","coffsetx","coffsety","texty","cwidth","boardh","textBackground","borderColor"], _socialImageInner);
  main.variable(observer("fitImage")).define("fitImage", ["textFit","image"], _fitImage);
  main.variable(observer("jpeg")).define("jpeg", ["dom2img","fitImage"], _jpeg);
  main.variable(observer("dom2img")).define("dom2img", _dom2img);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer()).define(["viewof socialImageParams","jpeg"], _82);
  main.variable(observer()).define(["md"], _83);
  main.variable(observer("viewof reading")).define("viewof reading", ["Inputs"], _reading);
  main.variable(observer("reading")).define("reading", ["Generators", "viewof reading"], (G, _) => G.input(_));
  main.variable(observer("readingOrEmpty")).define("readingOrEmpty", ["viewof reading"], _readingOrEmpty);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer("viewof clientResponse")).define("viewof clientResponse", ["Inputs","getFortune","user","cards","viewof reading","Event"], _clientResponse);
  main.variable(observer("clientResponse")).define("clientResponse", ["Generators", "viewof clientResponse"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _88);
  main.variable(observer("getFortune")).define("getFortune", ["apiServer","user"], _getFortune);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof ADMIN_SERVICE_ACCOUNT")).define("viewof ADMIN_SERVICE_ACCOUNT", ["Inputs","localStorageView"], _ADMIN_SERVICE_ACCOUNT);
  main.variable(observer("ADMIN_SERVICE_ACCOUNT")).define("ADMIN_SERVICE_ACCOUNT", ["Generators", "viewof ADMIN_SERVICE_ACCOUNT"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof config","cards","OPENAI_API_KEY","ADMIN_SERVICE_ACCOUNT","user","viewof reading","Event","md"], _94);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer("viewof results")).define("viewof results", ["Inputs","viewof config","cards","OPENAI_API_KEY","ADMIN_SERVICE_ACCOUNT","user"], _results);
  main.variable(observer("results")).define("results", ["Generators", "viewof results"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _97);
  main.variable(observer("viewof debugConfig")).define("viewof debugConfig", ["Inputs","localStorageView"], _debugConfig);
  main.variable(observer("debugConfig")).define("debugConfig", ["Generators", "viewof debugConfig"], (G, _) => G.input(_));
  main.variable(observer("parsedDebugConfig")).define("parsedDebugConfig", ["debugConfig"], _parsedDebugConfig);
  main.variable(observer("viewof debugResults")).define("viewof debugResults", ["Inputs","viewof config","parsedDebugConfig","OPENAI_API_KEY","ADMIN_SERVICE_ACCOUNT","user"], _debugResults);
  main.variable(observer("debugResults")).define("debugResults", ["Generators", "viewof debugResults"], (G, _) => G.input(_));
  main.variable(observer()).define(["apiServer","md"], _101);
  main.variable(observer("apiServer")).define("apiServer", ["endpoint","viewof config"], _apiServer);
  main.variable(observer()).define(["md"], _103);
  main.variable(observer("viewof config")).define("viewof config", ["flowQueue"], _config);
  main.variable(observer("config")).define("config", ["Generators", "viewof config"], (G, _) => G.input(_));
  main.variable(observer()).define(["config"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer("validatedConfig")).define("validatedConfig", ["config","viewof config","QUESTION_MAX_LENGTH","NAME_MAX_LENGTH"], _validatedConfig);
  main.variable(observer()).define(["md"], _108);
  main.variable(observer("currentUser")).define("currentUser", ["validatedConfig","invalidation","verifyIdToken","adminFirebase","viewof config"], _currentUser);
  main.variable(observer()).define(["md"], _110);
  main.variable(observer("currentUsersRequestsInLastDay")).define("currentUsersRequestsInLastDay", ["requestsInLastDay","currentUser"], _currentUsersRequestsInLastDay);
  main.variable(observer("rateLimitOk")).define("rateLimitOk", ["currentUsersRequestsInLastDay","viewof config","invalidation"], _rateLimitOk);
  main.variable(observer()).define(["md"], _113);
  main.variable(observer("openapi_reponse")).define("openapi_reponse", ["rateLimitOk","recordMeteredUse","currentUser","config","settings"], _openapi_reponse);
  main.variable(observer()).define(["md"], _115);
  main.variable(observer("settings")).define("settings", _settings);
  main.variable(observer()).define(["md"], _117);
  main.variable(observer("result")).define("result", ["openapi_reponse","viewof config"], _result);
  main.variable(observer()).define(["md"], _119);
  main.variable(observer("id")).define("id", ["persistHistory","viewof config","settings","result"], _id);
  main.variable(observer()).define(["md"], _121);
  main.variable(observer("persistHistory")).define("persistHistory", ["adminFirebase"], _persistHistory);
  main.variable(observer()).define(["md"], _123);
  main.variable(observer("classification")).define("classification", ["contentFilter","result","config"], _classification);
  main.variable(observer()).define(["md"], _125);
  main.variable(observer()).define(["Inputs","recordMeteredUse","user"], _126);
  main.variable(observer("recordMeteredUse")).define("recordMeteredUse", ["firebase"], _recordMeteredUse);
  main.variable(observer("requestsInLastDay")).define("requestsInLastDay", ["adminFirebase"], _requestsInLastDay);
  main.variable(observer("quota")).define("quota", ["htl","user"], _quota);
  main.variable(observer()).define(["md"], _130);
  main.variable(observer("contentFilter")).define("contentFilter", _contentFilter);
  main.variable(observer("viewof exampleFilter")).define("viewof exampleFilter", ["Inputs","loremIpsum","contentFilter","OPENAI_API_KEY"], _exampleFilter);
  main.variable(observer("exampleFilter")).define("exampleFilter", ["Generators", "viewof exampleFilter"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleFilter"], _133);
  main.variable(observer()).define(["md"], _134);
  main.variable(observer("uploadObject")).define("uploadObject", _uploadObject);
  main.variable(observer()).define(["md"], _136);
  main.variable(observer("fortuneImg")).define("fortuneImg", ["socialImage","id"], _fortuneImg);
  main.variable(observer("fortuneImageData")).define("fortuneImageData", ["fortuneImg"], _fortuneImageData);
  main.variable(observer("access_token")).define("access_token", ["getAccessTokenFromServiceAccount","config"], _access_token);
  main.variable(observer()).define(["fortuneImageData"], _140);
  main.variable(observer()).define(["md"], _141);
  main.variable(observer("cloudImage")).define("cloudImage", ["uploadObject","id","access_token","fortuneImageData"], _cloudImage);
  main.variable(observer()).define(["md"], _143);
  main.variable(observer("page")).define("page", ["baseURL"], _page);
  main.variable(observer()).define(["md"], _145);
  main.variable(observer("uploads")).define("uploads", ["uploadObject","id","access_token","page","config","cloudImage"], _uploads);
  main.variable(observer()).define(["md"], _147);
  main.variable(observer("responder")).define("responder", ["uploads","classification","viewof config","id","result"], _responder);
  main.variable(observer()).define(["md"], _149);
  main.variable(observer()).define(["Inputs","uploadObject","getAccessTokenFromServiceAccount","ADMIN_SERVICE_ACCOUNT","page"], _150);
  main.variable(observer()).define(["md"], _151);
  main.variable(observer("user")).define("user", ["firebase"], _user);
  main.variable(observer()).define(["md"], _153);
  const child2 = runtime.module(define2);
  main.import("notebookSnapshot", child2);
  main.import("modules", child2);
  main.variable(observer("trackingVariable_e3366d24de62")).define("trackingVariable_e3366d24de62", _trackingVariable_e3366d24de62);
  main.variable(observer("exampleSnapshot")).define("exampleSnapshot", ["notebookSnapshot"], _exampleSnapshot);
  main.variable(observer("trackedSnapshot")).define("trackedSnapshot", ["notebookSnapshot"], _trackedSnapshot);
  main.variable(observer()).define(["endpoint","notebookSnapshot"], _158);
  main.variable(observer()).define(["md"], _159);
  const child3 = runtime.module(define3).derive([{name: "userConfig", alias: "firebaseConfig"}], main);
  main.import("firebase", child3);
  main.import("DocView", child3);
  const child4 = runtime.module(define3).derive([{name: "adminConfig", alias: "firebaseConfig"}], main);
  main.import("firebase", "adminFirebase", child4);
  main.variable(observer("userConfig")).define("userConfig", _userConfig);
  main.variable(observer("adminConfig")).define("adminConfig", _adminConfig);
  main.variable(observer()).define(["md"], _164);
  main.variable(observer()).define(["md"], _165);
  main.variable(observer("findCardsByName")).define("findCardsByName", ["promiseRecursive","cardData","fileAttachments"], _findCardsByName);
  main.variable(observer()).define(["md"], _167);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  main.variable(observer()).define(["md"], _169);
  const child5 = runtime.module(define4);
  main.import("getCards", child5);
  main.import("images", "cardData", child5);
  main.import("fileAttachments", child5);
  const child6 = runtime.module(define5);
  main.import("endpoint", child6);
  const child7 = runtime.module(define6);
  main.import("flowQueue", child7);
  const child8 = runtime.module(define7);
  main.import("localStorageView", child8);
  const child9 = runtime.module(define8);
  main.import("colorPicker", child9);
  const child10 = runtime.module(define9);
  main.import("verifyIdToken", child10);
  main.import("getAccessTokenFromServiceAccount", child10);
  const child11 = runtime.module(define10);
  main.import("view", child11);
  main.import("bindOneWay", child11);
  const child12 = runtime.module(define11);
  main.import("verticalSliders", child12);
  const child13 = runtime.module(define12);
  main.import("juice", child13);
  const child14 = runtime.module(define13);
  main.import("toc", child14);
  const child15 = runtime.module(define14);
  main.import("deploy", child15);
  const child16 = runtime.module(define15);
  main.variable(observer("font")).define("font", ["htl"], _font);
  main.variable(observer("textFit")).define("textFit", ["HTMLElement"], _textFit);
  main.variable(observer("loremIpsum")).define("loremIpsum", ["require"], _loremIpsum);
  const child17 = runtime.module(define16);
  main.import("footer", child17);
  main.variable(observer()).define(["footer"], _186);
  return main;
}
