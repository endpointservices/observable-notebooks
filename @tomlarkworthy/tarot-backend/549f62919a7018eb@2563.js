import define1 from "./576f8943dbfbd395@114.js";
import define2 from "./993a0c51ef1175ea@1343.js";
import define3 from "./3d59cab3a9c819e2@159.js";
import define4 from "./6eda90668ae03044@803.js";
import define5 from "./0e0b35a92c819d94@325.js";
import define6 from "./048a17a165be198d@263.js";
import define7 from "./0c800138c487d3e1@860.js";
import define8 from "./698257e86fae4586@350.js";
import define9 from "./f92778131fd76559@1173.js";
import define10 from "./92ff66b718c1972f@141.js";
import define11 from "./653c46ed55693b1f@646.js";
import define12 from "./9bed702f80a3797e@402.js";
import define13 from "./dff1e917c89f5e76@1711.js";
import define14 from "./ef672b935bd480fc@619.js";
import define15 from "./293899bef371e135@216.js";

function _1(md){return(
md`# Tarot Backend`
)}

function _2(toc){return(
toc("h2,h3,h4")
)}

function _3(md){return(
md`## TODO
- referrer tags on URL (for tracking virality through plausible analytics)
- Font: https://creatypestudio.co/whisholders/`
)}

function _4(md){return(
md`## Application UI`
)}

async function _display(font,view,FileAttachment,whoInput,questionInput,pickCards,showCards,cards,fortuneOutput,restartButton,shareButton){return(
font,
view`<div style="height: 800px;padding: 20px; background-image: url('${await FileAttachment(
  "image.png"
).url()}'); font-family: Montserrat, sans-serif; max-width: auto;">
  <h1 style="display: none">Tarot</h1>
  <h1 style="color: white; text-align: center; width: 100%;">TAROT READER</h1>
  ${["name", whoInput()]}
  ${["question", questionInput()]}
  <div style="position: relative; top:-100px; pointer-events: none">
    ${["deck", pickCards()]}
  </div>
  ${["cards", showCards(cards)]}
  ${["fortune", fortuneOutput()]}
  ${["restart", restartButton()]}
  ${["share", shareButton()]}
</div>`
)}

function _6(md){return(
md`## Application Logic`
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

function _shareId(URLSearchParams,location){return(
new URLSearchParams(location.search).get("share")
)}

async function _previousFortune(firebase,shareId)
{
  const snapshot = await firebase
    .database()
    .ref(`/@tomlarkworthy/tarot-backend/calls/${shareId}`)
    .once("value");
  return snapshot.val();
}


async function _loadPreviousFortune(previousFortune,$0,findCardsByName,baseURL,shareId)
{
  if (previousFortune) {
    $0.fortune.value = previousFortune.reading.choices[0].text;
    $0.name.value = previousFortune.name;
    $0.question.value = previousFortune.question;
    $0.cards.cards.value = await findCardsByName(
      previousFortune.cards
    );
    $0.share.value = `${baseURL}?share=${shareId}`;
    $0.deck.value = 3;
    $0.deck.style.display = "none";
    $0.name.singleton.disabled = true;
    $0.question.singleton.disabled = true;
  }
}


async function _transitions(display,restartAction,loadPreviousFortune,$0,getCards,getFortune,user,baseURL)
{
  display;
  restartAction; // recompute when display changes
  loadPreviousFortune; // Load history (happens once)
  console.log("transition");
  $0.name.style.display = "block";
  $0.question.style.display = "block";
  $0.deck.style.display = "block";
  $0.cards.style.display = "block";
  $0.fortune.style.display = "block";
  $0.share.style.display = "inline-block";
  $0.restart.style.display = "inline-block";

  if (display.name.length == 0) {
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
    $0.share.style.display = "none";
    $0.restart.style.display = "none";
  } else if (display.deck >= 3) {
    $0.name.style.display = "none";
    $0.question.style.display = "none";
    $0.deck.style.display = "none";
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
        $0.share.value = `${baseURL}?share=${fortune.id}`;
        $0.fortune.value = fortune.reading;
        // We will also fetch it to preward the cache
        fetch($0.share.value);
      })
      .catch((err) => {
        $0.fortune.value = err.message;
      });
    $0.name.singleton.disabled = true;
    $0.question.singleton.disabled = true;
  }
}


function _baseURL(){return(
"https://thetarot.online"
)}

function _cards(getCards){return(
getCards({ numCards: 3 })
)}

function _14(cards,htl,width){return(
htl.html`<div style="display: flex;">
  ${cards.map(c => htl.html`<div style="width: ${Math.min(width, 650)/3}px">
    <p style="font-size: 24px"><b>${c.name}</b></p>
    <img style="width: 100%" src=${c.imgURL}></img>
  </div>`)}
</div>`
)}

function _15(md){return(
md`## Design`
)}

function _16(md){return(
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
  const ui = view`<label for=${uid} style="display:block; color: white; background-color: ${textBackground}; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor};">Who is this fortune for?
${[
  "...",
  htl.html`<textarea id=${uid} style="width:100%; display:block; box-sizing:border-box; color: white; background-color: ${textBackground}; padding: 10px; border-radius: 10px;" type="text" placeholder="your first name? someone else's name?" maxlength=${NAME_MAX_LENGTH}>`
]}
</label>`;
  return ui;
}
)}

function _20(md){return(
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

function _24(md){return(
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

function _27($0){return(
$0.value = "cool"
)}

function _28(md){return(
md`#### Share button`
)}

function _shareButton(view,textBackground,borderColor,htl){return(
(url = "https://example.com") => {
  const ui = view`<div style="display:inline-block; background-color: ${textBackground}; padding: 10px; margin: 5px; border-radius: 10px; border: solid ${borderColor};">
    <p style="color: white;text-align:center">Share this fortune using the following link</p>
    <div style="font-size:24px; display: inline-flex;">
      <div style="position: relative;top:1px; padding-right: 10px">🔗</div>${[
        "...",
        htl.html`<input class="url" style="border: none; color: white" type="text" disabled value="${url}">`
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

function _31($0){return(
$0.value = "https://cool2.com"
)}

function _32(md){return(
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

function _35(md){return(
md`#### assets`
)}

function _36(md){return(
md`Note this has not been paid for yet! https://www.shutterstock.com/image-vector/set-design-elements-gold-colour-on-1769147096`
)}

function _backUrl(FileAttachment){return(
FileAttachment("image@4.png").url()
)}

function _38(md){return(
md`#### pickCards`
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
  const ui = htl.svg`<svg viewbox="0 0 1000 400">${stack()}</svg>`;
  ui.reset = () => {
    ui.innerHTML = "";
    ui.appendChild(stack());
    state = ui.value = "stack";
    ui.dispatchEvent(new Event("input", { bubbles: true }));
  };
  return ui;
}
)}

function _40(htl){return(
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

function _43(pickCardsExample){return(
pickCardsExample
)}

function _44($0){return(
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

function _46(spreadConfig){return(
spreadConfig
)}

function _47(md){return(
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

function _50(exampleCards){return(
exampleCards
)}

function _51(Inputs,exampleCards,getCards){return(
Inputs.button("shuffle", {
  reduce: async () => (exampleCards.cards = await getCards({ numCards: 3 }))
})
)}

function _52(md){return(
md`## Social imageServer`
)}

function _53(exampleOutput,htl){return(
htl.html`<img src="${exampleOutput}">`
)}

function _exampleOutput(Inputs,socialImage){return(
Inputs.button("Run social Image flowQueue", {
  reduce: () =>
    socialImage({
      shareId: "-MxuntZHtW_ZU-XFjY78"
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

function _57(socialImageParams){return(
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


function _socialImageInner(svg,boardw,FileAttachment,htl,cpad,coffsetx,coffsety,texty,cwidth,boardh,textBackground,borderColor){return(
async ({ reading, cards } = {}) => {
  const promises = [];
  const ui = svg`<svg viewBox="0 0 ${boardw} 618" width="100%">
  <image href=${await FileAttachment("image.png").url()} />
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

function _fitImage(textFit,image)
{
  textFit(image.querySelector(".fortune"), {
    alignHoriz: true,
    alignVert: true
  });
  return image;
}


function _jpeg(dom2img,fitImage){return(
dom2img.toJpeg(fitImage)
)}

function _64($0,jpeg){return(
$0.respond(jpeg)
)}

async function _dom2img(){return(
await import("https://cdn.skypack.dev/html-to-image@1.9.0?min")
)}

function _textBackground(colorPicker){return(
colorPicker("rgba(19, 17, 43, 0.77)")
)}

function _borderColor(colorPicker){return(
colorPicker("rgb(181, 101, 101)")
)}

function _68(md){return(
md`## Business Logic`
)}

function _69(md){return(
md`### Run tarot reading locally

The run local button runs the core code local to the notebook, note an API key needs to be filled in and exposed in the browser session.`
)}

function _reading(Inputs){return(
Inputs.input(undefined)
)}

function _readingOrEmpty($0){return(
$0.value || ""
)}

function _72(Inputs,loremIpsum,$0,Event){return(
Inputs.button("synthetic", {
  reduce: () => {
    const data = loremIpsum({
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

    $0.value = data;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})
)}

function _73(Inputs,$0,cards,OPENAI_API_KEY,ADMIN_SERVICE_ACCOUNT,user,$1,Event){return(
Inputs.button("run clientside", {
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
})
)}

function _74(md){return(
md`### Run tarot reading in remote service

We can pass the cards and question and name parameters to a webcode.run endpoint, which runs the core code remotely, and injects the OPENAI_API_KEY secret so you do not need to fill this out.
`
)}

function _75(Inputs,getFortune,user,name,cards,question,$0,Event){return(
Inputs.button("run remote", {
  reduce: async () => {
    const data = (
      await getFortune({
        token: user.getIdToken(),
        name,
        cards,
        question
      })
    ).reading;
    $0.value = data;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
})
)}

function _76(md){return(
md`### getFortune`
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

function _78(md){return(
md`## API Server`
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

function _apiServer(endpoint,$0){return(
endpoint(
  "api",
  async (req, res, ctx) => {
    // save in a DB, deduplication, rate limit, authentication
    const config = JSON.parse(atob(req.query.config)); // name, cards, questions
    config.token = req.headers["authorization"].split(" ")[1];
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

function _config(flowQueue){return(
flowQueue({ timeout_ms: 15000 })
)}

function _83(config){return(
config
)}

function _validateOK(config,QUESTION_MAX_LENGTH,NAME_MAX_LENGTH,$0)
{
  var msg = "unknown";
  if (config.question.length >= QUESTION_MAX_LENGTH) {
    msg = "Question too long";
  } else if (!config.question || config.question == "") {
    msg = "No question";
  } else if (config.name.length >= NAME_MAX_LENGTH) {
    msg = "Name too long";
  } else if (!config.name || config.name == "") {
    msg = "No name";
  } else {
    return "OK!";
  }

  const err = new Error(msg);
  err.status = 400;
  $0.reject(err);
  throw new Error(`Invalid request ${msg}`);
}


function _currentUser(verifyIdToken,adminFirebase,config,$0)
{
  try {
    return verifyIdToken(adminFirebase, config.token);
  } catch (err) {
    $0.reject(err);
  }
}


function _currentUsersRequestsInLastDay(requestsInLastDay,currentUser){return(
requestsInLastDay(currentUser.uid)
)}

function _rateLimitOk(validateOK,currentUsersRequestsInLastDay,$0,invalidation)
{
  validateOK;
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

function _settings(){return(
{
  temperature: 0.8,
  max_tokens: 250,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}
)}

async function _result(openapi_reponse,$0){return(
openapi_reponse.status === 200
  ? openapi_reponse.json()
  : $0.reject(new Error(await openapi_reponse.text()))
)}

function _id(persistResult,config,settings,result,$0)
{
  try {
    return persistResult({
      ...config,
      settings,
      reading: result
    });
  } catch (err) {
    $0.respond(result);
    throw err;
  }
}


function _classification(contentFilter,result,config){return(
contentFilter({
  content: result.choices[0].text,
  API_KEY: config.OPENAI_API_KEY
})
)}

function _responder(peristImage,classification,$0,id,result)
{
  peristImage;
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


function _94(md){return(
md`### Rate limiting`
)}

function _95(Inputs,recordMeteredUse,user){return(
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

function _99(md){return(
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

function _102(exampleFilter){return(
exampleFilter
)}

function _103(md){return(
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

async function _uploadFile(id,access_token,fortuneImageData)
{
  /*
   curl -X POST --data-binary @data.txt \
    -H "Authorization: Bearer $OAUTH2_TOKEN" \
    -H "Content-Type: application/txt" \
    "https://storage.googleapis.com/upload/storage/v1/b/larkworthy-dfb11.appspot.com/o?uploadType=media&name=data.txt"
  */
  const bucket = "larkworthy-dfb11.appspot.com";

  const response = await fetch(
    `https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(
      `@tomlarkworthy/tarot-backend/images/${id}`
    )}`,
    {
      method: "POST",
      headers: {
        "content-type": "image/jpeg",
        Authorization: `Bearer ${access_token}`
      },
      body: fortuneImageData
    }
  );
  if (response.status !== 200) throw new Error(`${await response.text()}`);
  else return {
    upload: await response.json(),
    id
  };
}


function _peristImage(adminFirebase,uploadFile){return(
adminFirebase
  .database()
  .ref(`/@tomlarkworthy/tarot-backend/calls/${uploadFile.id}`)
  .update({
    img: uploadFile.upload.mediaLink
  })
)}

function _109(md){return(
md`### Analytics`
)}

function _persistResult(adminFirebase){return(
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

function _111(md){return(
md`## Webserver

The webserver can render the application.`
)}

function _112(baseURL){return(
baseURL
)}

function _webserver(deploy,baseURL){return(
deploy(
  "default",
  async (req, res, ctx) => {
    const share = req.query.share;
    const data =
      (await (
        await fetch(
          `https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app/@tomlarkworthy/tarot-backend/calls/${share}.json`
        )
      ).json()) || {};

    res.header("cache-control", "max-age: 3600");
    res.send(`<!DOCTYPE html>
<meta property="og:title" content="${
      `Tarot Reading for ${data.name}` || "Tarot Reading"
    }">
<meta property="og:description" content="${data.question || "Tarot Reading"}">
<meta property="og:type" content="article" />
<meta property="og:image" content="${data.img}">
<meta property="og:url" content="${baseURL}?share=${share}">
<meta name="twitter:card" content="summary_large_image">

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
</script>`);
  },
  {
    hostNotebook: "@tomlarkworthy/tarot-backend"
  }
)
)}

function _114(md){return(
md`### Client Side User`
)}

async function _user(firebase){return(
(await firebase.auth().signInAnonymously()).user
)}

function _116(md){return(
md`### Firebase Backends`
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

function _boardw(){return(
1218
)}

function _boardh(){return(
618
)}

function _textx(Inputs){return(
Inputs.range([-100, 100], {
  label: "text offset x",
  step: 1,
  value: 0
})
)}

function _texty(Inputs){return(
Inputs.range([-100, 500], {
  label: "text offset y",
  step: 1,
  value: -45
})
)}

function _coffsetx(Inputs){return(
Inputs.range([0, 500], { label: "card offset", step: 1, value: 172})
)}

function _coffsety(Inputs){return(
Inputs.range([0, 500], {
  label: "card offset",
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

function _cardBack(FileAttachment){return(
FileAttachment("image@4.png").image()
)}

function _130(md){return(
md`## Examples from users`
)}

function _131(FileAttachment){return(
FileAttachment("image@8.png").image()
)}

function _132(FileAttachment){return(
FileAttachment("image@7.png").image()
)}

function _133(FileAttachment){return(
FileAttachment("image@1.png").image()
)}

function _findCardsByName(promiseRecursive,cardData,archive){return(
async (cardNames) =>
  await promiseRecursive(
    cardNames
      .map((cardName) => cardData.cards.find((cd) => cd.name === cardName))
      .map((c) => ({
        name: c.name,
        imgURL: archive.file("cards/" + c.img).url()
      }))
  )
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

function _152(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image.png",new URL("./files/50754529e2a76a3b6c106a73040c811d07763baf7b344912d5bbec7157d9c33e2d0307b3e2436d1297fa1befa6a0e053f480dd19f79839f01c0ea4e1e9f14266",import.meta.url)],["image@1.png",new URL("./files/b0dd95e56bf953b915b9fc424a3e34adf2816e7ba3e3a0ff38fc7cb39fdd18fcc339e0d7acd31a09f0d0509ac6108b7b4dd8cf3d98fe86235ad1beb972ecf766",import.meta.url)],["image@4.png",new URL("./files/c754fb284a0de3b6d47a3e5ca84774670b2d9d1407794b401d9b730649f5f5ae27579518c909c5862e0f4d2c9a29da48550c35ada43ba0de457e1f43e0975274",import.meta.url)],["image@7.png",new URL("./files/3561ced6cac97495efcd731ad7b38d12b772cb488d5faf1e99ee9bed833083e99feb1185f542449b046d3a05e102498c0dbcfdf3fcea35b409a423a6b9ea7106",import.meta.url)],["image@8.png",new URL("./files/9991246a526763d7493c377f4a49ddc898cc11e2fa8c63f6741bbdb67ab9a0b20e01de2860e9d15bb1cc29bd8781e6c070a1d3db27c11b59841a54dc29558e93",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof display")).define("viewof display", ["font","view","FileAttachment","whoInput","questionInput","pickCards","showCards","cards","fortuneOutput","restartButton","shareButton"], _display);
  main.variable(observer("display")).define("display", ["Generators", "viewof display"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("restartAction")).define("restartAction", ["Generators","viewof display","invalidation"], _restartAction);
  main.variable(observer("shareId")).define("shareId", ["URLSearchParams","location"], _shareId);
  main.variable(observer("previousFortune")).define("previousFortune", ["firebase","shareId"], _previousFortune);
  main.variable(observer("loadPreviousFortune")).define("loadPreviousFortune", ["previousFortune","viewof display","findCardsByName","baseURL","shareId"], _loadPreviousFortune);
  main.variable(observer("transitions")).define("transitions", ["display","restartAction","loadPreviousFortune","viewof display","getCards","getFortune","user","baseURL"], _transitions);
  main.variable(observer("baseURL")).define("baseURL", _baseURL);
  main.variable(observer("cards")).define("cards", ["getCards"], _cards);
  main.variable(observer()).define(["cards","htl","width"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("NAME_MAX_LENGTH")).define("NAME_MAX_LENGTH", _NAME_MAX_LENGTH);
  main.variable(observer("viewof name")).define("viewof name", ["whoInput"], _name);
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer("whoInput")).define("whoInput", ["DOM","view","textBackground","borderColor","htl","NAME_MAX_LENGTH"], _whoInput);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("QUESTION_MAX_LENGTH")).define("QUESTION_MAX_LENGTH", _QUESTION_MAX_LENGTH);
  main.variable(observer("viewof question")).define("viewof question", ["questionInput"], _question);
  main.variable(observer("question")).define("question", ["Generators", "viewof question"], (G, _) => G.input(_));
  main.variable(observer("questionInput")).define("questionInput", ["DOM","view","textBackground","borderColor","htl","QUESTION_MAX_LENGTH"], _questionInput);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("fortuneOutput")).define("fortuneOutput", ["DOM","view","textBackground","borderColor","htl"], _fortuneOutput);
  main.variable(observer("viewof fortuneOutputExample")).define("viewof fortuneOutputExample", ["fortuneOutput"], _fortuneOutputExample);
  main.variable(observer("fortuneOutputExample")).define("fortuneOutputExample", ["Generators", "viewof fortuneOutputExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof fortuneOutputExample"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("shareButton")).define("shareButton", ["view","textBackground","borderColor","htl"], _shareButton);
  main.variable(observer("viewof shareButtonExample")).define("viewof shareButtonExample", ["shareButton"], _shareButtonExample);
  main.variable(observer("shareButtonExample")).define("shareButtonExample", ["Generators", "viewof shareButtonExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof shareButtonExample"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("restartButton")).define("restartButton", ["view","borderColor"], _restartButton);
  main.variable(observer("viewof restartButtonExample")).define("viewof restartButtonExample", ["restartButton"], _restartButtonExample);
  main.variable(observer("restartButtonExample")).define("restartButtonExample", ["Generators", "viewof restartButtonExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("backUrl")).define("backUrl", ["FileAttachment"], _backUrl);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("pickCards")).define("pickCards", ["htl","spreadConfig","backUrl","Event"], _pickCards);
  main.variable(observer()).define(["htl"], _40);
  main.variable(observer("el")).define("el", _el);
  main.variable(observer("viewof pickCardsExample")).define("viewof pickCardsExample", ["pickCards"], _pickCardsExample);
  main.variable(observer("pickCardsExample")).define("pickCardsExample", ["Generators", "viewof pickCardsExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["pickCardsExample"], _43);
  main.variable(observer()).define(["viewof pickCardsExample"], _44);
  main.variable(observer("viewof spreadConfig")).define("viewof spreadConfig", ["verticalSliders"], _spreadConfig);
  main.variable(observer("spreadConfig")).define("spreadConfig", ["Generators", "viewof spreadConfig"], (G, _) => G.input(_));
  main.variable(observer()).define(["spreadConfig"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("showCards")).define("showCards", ["juice","htl","boardw","cpad","coffsetx","coffsety","texty","cwidth"], _showCards);
  main.variable(observer("viewof exampleCards")).define("viewof exampleCards", ["showCards","cards"], _exampleCards);
  main.variable(observer("exampleCards")).define("exampleCards", ["Generators", "viewof exampleCards"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleCards"], _50);
  main.variable(observer()).define(["Inputs","exampleCards","getCards"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["exampleOutput","htl"], _53);
  main.variable(observer("viewof exampleOutput")).define("viewof exampleOutput", ["Inputs","socialImage"], _exampleOutput);
  main.variable(observer("exampleOutput")).define("exampleOutput", ["Generators", "viewof exampleOutput"], (G, _) => G.input(_));
  main.variable(observer("socialImage")).define("socialImage", ["viewof socialImageParams"], _socialImage);
  main.variable(observer("viewof socialImageParams")).define("viewof socialImageParams", ["flowQueue"], _socialImageParams);
  main.variable(observer("socialImageParams")).define("socialImageParams", ["Generators", "viewof socialImageParams"], (G, _) => G.input(_));
  main.variable(observer()).define(["socialImageParams"], _57);
  main.variable(observer("socialData")).define("socialData", ["adminFirebase","socialImageParams"], _socialData);
  const child1 = runtime.module(define1);
  main.import("rasterize", child1);
  main.variable(observer("image")).define("image", ["socialData","socialImageInner","findCardsByName","viewof socialImageParams"], _image);
  main.variable(observer("socialImageInner")).define("socialImageInner", ["svg","boardw","FileAttachment","htl","cpad","coffsetx","coffsety","texty","cwidth","boardh","textBackground","borderColor"], _socialImageInner);
  main.variable(observer("fitImage")).define("fitImage", ["textFit","image"], _fitImage);
  main.variable(observer("jpeg")).define("jpeg", ["dom2img","fitImage"], _jpeg);
  main.variable(observer()).define(["viewof socialImageParams","jpeg"], _64);
  main.variable(observer("dom2img")).define("dom2img", _dom2img);
  main.variable(observer("viewof textBackground")).define("viewof textBackground", ["colorPicker"], _textBackground);
  main.variable(observer("textBackground")).define("textBackground", ["Generators", "viewof textBackground"], (G, _) => G.input(_));
  main.variable(observer("viewof borderColor")).define("viewof borderColor", ["colorPicker"], _borderColor);
  main.variable(observer("borderColor")).define("borderColor", ["Generators", "viewof borderColor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("viewof reading")).define("viewof reading", ["Inputs"], _reading);
  main.variable(observer("reading")).define("reading", ["Generators", "viewof reading"], (G, _) => G.input(_));
  main.variable(observer("readingOrEmpty")).define("readingOrEmpty", ["viewof reading"], _readingOrEmpty);
  main.variable(observer()).define(["Inputs","loremIpsum","viewof reading","Event"], _72);
  main.variable(observer()).define(["Inputs","viewof config","cards","OPENAI_API_KEY","ADMIN_SERVICE_ACCOUNT","user","viewof reading","Event"], _73);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer()).define(["Inputs","getFortune","user","name","cards","question","viewof reading","Event"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("getFortune")).define("getFortune", ["apiServer","user"], _getFortune);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof ADMIN_SERVICE_ACCOUNT")).define("viewof ADMIN_SERVICE_ACCOUNT", ["Inputs","localStorageView"], _ADMIN_SERVICE_ACCOUNT);
  main.variable(observer("ADMIN_SERVICE_ACCOUNT")).define("ADMIN_SERVICE_ACCOUNT", ["Generators", "viewof ADMIN_SERVICE_ACCOUNT"], (G, _) => G.input(_));
  main.variable(observer("apiServer")).define("apiServer", ["endpoint","viewof config"], _apiServer);
  main.variable(observer("viewof config")).define("viewof config", ["flowQueue"], _config);
  main.variable(observer("config")).define("config", ["Generators", "viewof config"], (G, _) => G.input(_));
  main.variable(observer()).define(["config"], _83);
  main.variable(observer("validateOK")).define("validateOK", ["config","QUESTION_MAX_LENGTH","NAME_MAX_LENGTH","viewof config"], _validateOK);
  main.variable(observer("currentUser")).define("currentUser", ["verifyIdToken","adminFirebase","config","viewof config"], _currentUser);
  main.variable(observer("currentUsersRequestsInLastDay")).define("currentUsersRequestsInLastDay", ["requestsInLastDay","currentUser"], _currentUsersRequestsInLastDay);
  main.variable(observer("rateLimitOk")).define("rateLimitOk", ["validateOK","currentUsersRequestsInLastDay","viewof config","invalidation"], _rateLimitOk);
  main.variable(observer("openapi_reponse")).define("openapi_reponse", ["rateLimitOk","recordMeteredUse","currentUser","config","settings"], _openapi_reponse);
  main.variable(observer("settings")).define("settings", _settings);
  main.variable(observer("result")).define("result", ["openapi_reponse","viewof config"], _result);
  main.variable(observer("id")).define("id", ["persistResult","config","settings","result","viewof config"], _id);
  main.variable(observer("classification")).define("classification", ["contentFilter","result","config"], _classification);
  main.variable(observer("responder")).define("responder", ["peristImage","classification","viewof config","id","result"], _responder);
  main.variable(observer()).define(["md"], _94);
  main.variable(observer()).define(["Inputs","recordMeteredUse","user"], _95);
  main.variable(observer("recordMeteredUse")).define("recordMeteredUse", ["firebase"], _recordMeteredUse);
  main.variable(observer("requestsInLastDay")).define("requestsInLastDay", ["adminFirebase"], _requestsInLastDay);
  main.variable(observer("quota")).define("quota", ["htl","user"], _quota);
  main.variable(observer()).define(["md"], _99);
  main.variable(observer("contentFilter")).define("contentFilter", _contentFilter);
  main.variable(observer("viewof exampleFilter")).define("viewof exampleFilter", ["Inputs","loremIpsum","contentFilter","OPENAI_API_KEY"], _exampleFilter);
  main.variable(observer("exampleFilter")).define("exampleFilter", ["Generators", "viewof exampleFilter"], (G, _) => G.input(_));
  main.variable(observer()).define(["exampleFilter"], _102);
  main.variable(observer()).define(["md"], _103);
  main.variable(observer("fortuneImg")).define("fortuneImg", ["socialImage","id"], _fortuneImg);
  main.variable(observer("fortuneImageData")).define("fortuneImageData", ["fortuneImg"], _fortuneImageData);
  main.variable(observer("access_token")).define("access_token", ["getAccessTokenFromServiceAccount","config"], _access_token);
  main.variable(observer("uploadFile")).define("uploadFile", ["id","access_token","fortuneImageData"], _uploadFile);
  main.variable(observer("peristImage")).define("peristImage", ["adminFirebase","uploadFile"], _peristImage);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer("persistResult")).define("persistResult", ["adminFirebase"], _persistResult);
  main.variable(observer()).define(["md"], _111);
  main.variable(observer()).define(["baseURL"], _112);
  main.variable(observer("webserver")).define("webserver", ["deploy","baseURL"], _webserver);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer("user")).define("user", ["firebase"], _user);
  main.variable(observer()).define(["md"], _116);
  const child2 = runtime.module(define2).derive([{name: "userConfig", alias: "firebaseConfig"}], main);
  main.import("firebase", child2);
  main.import("DocView", child2);
  const child3 = runtime.module(define2).derive([{name: "adminConfig", alias: "firebaseConfig"}], main);
  main.import("firebase", "adminFirebase", child3);
  main.variable(observer("userConfig")).define("userConfig", _userConfig);
  main.variable(observer("adminConfig")).define("adminConfig", _adminConfig);
  main.variable(observer("boardw")).define("boardw", _boardw);
  main.variable(observer("boardh")).define("boardh", _boardh);
  main.variable(observer("viewof textx")).define("viewof textx", ["Inputs"], _textx);
  main.variable(observer("textx")).define("textx", ["Generators", "viewof textx"], (G, _) => G.input(_));
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
  main.variable(observer("cardBack")).define("cardBack", ["FileAttachment"], _cardBack);
  main.variable(observer()).define(["md"], _130);
  main.variable(observer()).define(["FileAttachment"], _131);
  main.variable(observer()).define(["FileAttachment"], _132);
  main.variable(observer()).define(["FileAttachment"], _133);
  main.variable(observer("findCardsByName")).define("findCardsByName", ["promiseRecursive","cardData","archive"], _findCardsByName);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  const child4 = runtime.module(define3);
  main.import("getCards", child4);
  main.import("images", "cardData", child4);
  main.import("archive", child4);
  const child5 = runtime.module(define4);
  main.import("endpoint", child5);
  const child6 = runtime.module(define5);
  main.import("flowQueue", child6);
  const child7 = runtime.module(define6);
  main.import("localStorageView", child7);
  const child8 = runtime.module(define7);
  main.import("colorPicker", child8);
  const child9 = runtime.module(define8);
  main.import("verifyIdToken", child9);
  main.import("getAccessTokenFromServiceAccount", child9);
  const child10 = runtime.module(define9);
  main.import("view", child10);
  main.import("bindOneWay", child10);
  const child11 = runtime.module(define10);
  main.import("verticalSliders", child11);
  const child12 = runtime.module(define11);
  main.import("juice", child12);
  const child13 = runtime.module(define12);
  main.import("toc", child13);
  const child14 = runtime.module(define13);
  main.import("deploy", child14);
  const child15 = runtime.module(define14);
  main.variable(observer("font")).define("font", ["htl"], _font);
  main.variable(observer("textFit")).define("textFit", ["HTMLElement"], _textFit);
  main.variable(observer("loremIpsum")).define("loremIpsum", ["require"], _loremIpsum);
  const child16 = runtime.module(define15);
  main.import("footer", child16);
  main.variable(observer()).define(["footer"], _152);
  return main;
}
