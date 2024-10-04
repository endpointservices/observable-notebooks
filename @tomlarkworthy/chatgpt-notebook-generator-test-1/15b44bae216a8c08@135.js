function _1(md){return(
md`# ChatGPT Notebook Generator Test 1

Holy crap this notebook was made by ChatGPT. I don't know pixi very well. It reacted to errors and fixed them. See the transcript!
The keyboard controls work  
Chat [transcript](https://chat.openai.com/share/94fcfe1e-0723-401c-8d80-44bd63894765)`
)}

function _pixi(){return(
import("https://cdn.skypack.dev/pixi.js@6.2.0")
)}

function _app(pixi){return(
new pixi.Application({ width: 800, height: 600 })
)}

function _spaceshipSVG()
{
  const svgData = `<svg width="40" height="60" xmlns="http://www.w3.org/2000/svg"> <polygon points="20,5 40,55 20,45 0,55" fill="lime" /> <circle cx="20" cy="30" r="15" fill="blue" /> </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svgData)}`;
}


function _spaceshipTexture(pixi,spaceshipSVG)
{
  return pixi.Texture.from(spaceshipSVG);
}


function _spaceship(pixi,spaceshipTexture,app)
{
  const sprite = new pixi.Sprite(spaceshipTexture);
  sprite.x = 400;
  sprite.y = 300;
  app.stage.addChild(sprite);
  return sprite;
}


function _keyState()
{
  const state = {};
  document.addEventListener("keydown", function (event) {
    state[event.code] = true;
  });
  document.addEventListener("keyup", function (event) {
    state[event.code] = false;
  });
  return state;
}


function _moveSpaceship(app,keyState,spaceship)
{
  app.ticker.add(() => {
    if (keyState["ArrowUp"]) spaceship.y -= 5;
    if (keyState["ArrowDown"]) spaceship.y += 5;
    if (keyState["ArrowLeft"]) spaceship.x -= 5;
    if (keyState["ArrowRight"]) spaceship.x += 5;
  });
}


function _pixiSprite(){return(
import("https://cdn.skypack.dev/@pixi/sprite")
)}

function _canvasContainer(app)
{
  const container = document.createElement("div");
  app.view.style.border = "1px solid black";
  container.appendChild(app.view);
  return container;
}


function _11(canvasContainer){return(
canvasContainer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("pixi")).define("pixi", _pixi);
  main.variable(observer("app")).define("app", ["pixi"], _app);
  main.variable(observer("spaceshipSVG")).define("spaceshipSVG", _spaceshipSVG);
  main.variable(observer("spaceshipTexture")).define("spaceshipTexture", ["pixi","spaceshipSVG"], _spaceshipTexture);
  main.variable(observer("spaceship")).define("spaceship", ["pixi","spaceshipTexture","app"], _spaceship);
  main.variable(observer("keyState")).define("keyState", _keyState);
  main.variable(observer("moveSpaceship")).define("moveSpaceship", ["app","keyState","spaceship"], _moveSpaceship);
  main.variable(observer("pixiSprite")).define("pixiSprite", _pixiSprite);
  main.variable(observer("canvasContainer")).define("canvasContainer", ["app"], _canvasContainer);
  main.variable(observer()).define(["canvasContainer"], _11);
  return main;
}
