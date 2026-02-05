import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./bb2055d580bbbab2@106.js";
import define3 from "./e7c3854dfc5e08c3@1352.js";
import define4 from "./a2e58f97fd5e8d7c@756.js";
import define5 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`
# A Tour of Observable (Presentation)
`
)}

function _loadAudio(Toggle){return(
Toggle({ label: "Load audio? (40MB)", value: false })
)}

async function _3(loadAudio,html,sample,audioContext,md,FileAttachment)
{
  if (!loadAudio) return html`To load accompanying audio narration, tick above`;
  const audio = async attachment =>
    sample({
      speedAdjust: false,
      audioContext: audioContext,
      arrayBuffer: await attachment.arrayBuffer()
    });
  return html`${md`## Narration
If you want to play the narration I would suggest opening two windows.
`}
<h4>Intro</h4>
${await audio(FileAttachment("1.m4a"))}
<h4>Its cool</h4>
${await audio(FileAttachment("2.m4a"))}
<h4>Who built it</h4>
${await audio(FileAttachment("3.m4a"))}
<h4>bicycle for mind</h4>
${await audio(FileAttachment("4.m4a"))}
<h4>Notebooks</h4>
${await audio(FileAttachment("5.m4a"))}
${await audio(FileAttachment("5b.m4a"))}
<h4>literate programming</h4>
${await audio(FileAttachment("6.m4a"))}
<h4>Ricky Reussur Intro</h4>
${await audio(FileAttachment("7.m4a"))}
<h4>Notebook deepdive</h4>
${await audio(FileAttachment("8a.m4a"))}
${await audio(FileAttachment("8b.m4a"))}
${await audio(FileAttachment("8c.m4a"))}
${await audio(FileAttachment("8d.m4a"))}
${await audio(FileAttachment("8e.m4a"))}
<h4>USP - local dev</h4>
${await audio(FileAttachment("9a.m4a"))}
<h4>USP - reactive</h4>
${await audio(FileAttachment("9b.m4a"))}
<h4>USP - non prorietary</h4>
${await audio(FileAttachment("10.m4a"))}
<h4>USP - community</h4>
${await audio(FileAttachment("11.m4a"))}
<h4>USP - mission driven</h4>
${await audio(FileAttachment("12.m4a"))}
<h4>USP - famous viz</h4>
${await audio(FileAttachment("13.m4a"))}
<h4>mission</h4>
${await audio(FileAttachment("14.m4a"))}
<h4>And also it can....</h4>
${await audio(FileAttachment("15a.m4a"))}
${await audio(FileAttachment("15b.m4a"))}
<h4>What I learned</h4>
${await audio(FileAttachment("16a.m4a"))}
${await audio(FileAttachment("16b.m4a"))}
${await audio(FileAttachment("16c.m4a"))}
${await audio(FileAttachment("16d.m4a"))}
`;
}


function _4(Element,html)
{
  document.current = 4; // Initial cell
  function fullscreen() {
    var changeHandler = function() {
      var fs =
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen);
      if (fs) {
        [...document.cells].forEach(e => {
          e.style.height = '';
        });
      } else {
        [...document.cells].forEach(e => {
          e.style.height = window.screen.height + 'px';
        });
        var elmnt = document.cells[document.current];
        elmnt.scrollIntoView();
      }
    };
    document.addEventListener('fullscreenchange', changeHandler, false);
    document.addEventListener('webkitfullscreenchange', changeHandler, false);
    document.addEventListener('mozfullscreenchange', changeHandler, false);

    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    }
  }

  const ui = html`<button>Click to go fullscreen</button>`;

  ui.addEventListener('click', fullscreen);
  return ui;
}


function _titleslide(slide){return(
slide.html`<div><h1>A tour of <a href="https://observablehq.com">Observable</a></h1>
<small><a href="https://observablehq.com/@tomlarkworthy/observable-presentation">[source]</a></small>
<small><i>better knowledge tooling</i></small>
</div>

`
)}

async function _6(html,FileAttachment,tweet){return(
html`<div class="slide slide--html dark" style="display: flex;">
  <span>
    <h4>It's cool</h4>
    <img src=${await FileAttachment("image@1.png").url()} />
  </span>
  <span style="padding-left: 50px">
    ${tweet('1358465628961705986')}
  </span>
`
)}

async function _7(html,FileAttachment){return(
html`
<div class="slide slide--html dark">
<div>
<img src="${await FileAttachment("image@2.png").url()}" />
<h5 style="max-width:100%">Founder CEO Melody Meckfessel</h5>
<ul style="font-size: 24px;">
  <li> Ex-Vice President of Eng @ Google
</ul>
<h5>Founder Mike Bostock</h5>
<ul style="font-size: 24px;">
  <li> Creator of Data Driven Documents: D3 </li>
  <li> New York Times' "Digital Superstar"
  <li> <i>"Building a better computational medium."</i>
</ul>
<a style="font-size: 20px;" href="https://observablehq.com/about">[source]</a>
</div>
`
)}

function _8(slide){return(
slide.htmldark(`
  <p><i>"Computers are a bicycle for our minds"</i> -- Steve Jobs</p>
`)
)}

function _9(slide){return(
slide.htmldark`
<div>
<h5>Observable Notebooks <i>are</i></h5>
<ul style="font-size: 26px;">
  <li>Interactive Documents
  <li>Reactive Javascript
  <li>Integrated development environments
  <li>Hosted
  <li>ES6 Modules
  <li>Social
  <li>Forkable
  <li>Embeddable
</ul>
A better way to explain, code, share, discuss and collaborate
</div>


`
)}

function _10(slide){return(
slide.htmldark(`
  <p><i>"Literate programming ... makes programs more robust, more portable, more easily maintained, and arguably more fun to write"</i> -- D. Knuth
`)
)}

async function _11(slide,html,FileAttachment){return(
slide.htmldark(html`<h3> Ricky Reusser</h3><h5>Contour plots<h5><a href="https://observablehq.com/@rreusser/locally-scaled-domain-coloring-part-1-contour-plots" target="_blank">link</a>
  <img src="${await FileAttachment("image.png").url()}">`.outerHTML)
)}

function _12(slide){return(
slide.htmldark(`<div>
  <h4> Why it's unique </h4>
  <p> Compared to <i>Jupyter</i> or <i>repl.it</i>
  <p> It's native web running locally in browser (incl. debugger) </p>
`)
)}

function _13(slide,now){return(
slide`And it’s reactive!

${new Date(now).toLocaleString()}`
)}

function _14(slide){return(
slide.html`
<div>
  <h2>Non-proprietary representation</h2>
  <table style="font-size: 24px;border-spacing: 15px; border-collapse: separate;">
    <thead>
      <tr>
        <th> Purpose </th>
        <th> Example </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><b>private URL</th>
        <td><a href="https://observablehq.com/d/18c81b2adae8b6f2" target="_blank">https://observablehq.com/d/18c81b2adae8b6f2</a></td>
      </tr>
      <tr>
        <th>public URL</th>
        <td><a href="https://observablehq.com/@tomlarkworthy/observable-presentation" target="_blank">https://observablehq.com/@tomlarkworthy/observable-presentation</a></td>
      </tr>
      <tr>
        <th>(cell) embed</th>
        <td><a href="https://observablehq.com/embed/@tomlarkworthy/observable-tour?cells=titleslide" target="_blank">https://observablehq.com/embed/@tomlarkworthy/observable-tour?cells=titleslide</a></td>
      </tr>
      <tr style='color: red;'>
        <th>ES6 module</th>
        <td><a href="https://api.observablehq.com/d/18c81b2adae8b6f2.tgz?v=3" target="_blank">https://api.observablehq.com/d/18c81b2adae8b6f2.tgz?v=3</a> 🤯</td>
      </tr>
    </tbody>
  </table>
</div>`
)}

function _15(slide){return(
slide.htmldark`<div>
  <h3> community </h3>
  <div style="font-size: 40px;">
  <ul>
    <li>Journalists, data practitioners, generative artists, designers, creators and developers</li>
    <li><a href="https://talk.observablehq.com/" target="_blank">forum</a></li>
    <li>Notebook comments</li>
    <li>One click forking</li>
  </ul
  </div>
`
)}

function _16(slide){return(
slide.htmldark`<div>
  <h2> Mission Driven </h2>
  <div style="font-size: 40px;">
  <i>Observable is committed to helping and contributing to social justice and equality.</i>
  <ul>
    <li><a href="https://observablehq.com/@observablehq/black-history-month-dataviz-contest" target="_blank"> Black History Month DataViz</a> contest</li>
    <li><a href="https://observablehq.com/@observablehq/pride-month-and-lgbtqia-equality" target="_blank">Pride Month and LGBTQIA+ Equality</a> activities</li>
    <li><a href="https://observablehq.com/@observablehq/blackindatavizmeetup2021" target="_blank">Black In DataViz Meetup</a></li>
  </ul>
  </div>
`
)}

function _17(slide){return(
slide.htmldark`<div>
  <h2> Famous #dataviz </h2>
`
)}

function _18(html,tweet){return(
html`<div class="slide slide--html dark">
    ${tweet('1181695687005745153')}
  </div>
`
)}

function _19(slide){return(
slide.htmldark`<div>
  <h3>Helping everyone make sense of the world with data.</h3>
  <i>Melody Meckfessel (CEO)</i>
</div>
`
)}

function _20(slide){return(
slide.html`<div>
  <h2>It can even...</h2>
  <ul>
    <li><a href="https://observablehq.com/@tomlarkworthy/observable-presentation" target="_blank">Presentations</a> :)</li>
    <li><a href="https://observablehq.com/@makio135/creative-coding" target="_blank">Creative coding</a></li>
    <li><a href="https://observablehq.com/@tomlarkworthy/saas-tutorial" target="_blank">Software-as-a-service</a></li>
    <li><a href="https://observablehq.com/@tomlarkworthy/serverless-cells" target="_blank">Functions-as-a-service</a> (👶)</li>
  </ul>
`
)}

function _21(slide){return(
slide.html`<div>
  <h2>Lessons</h2>
  <ul style="font-size: 32px;">
    <li>Fast development loops > type system </li>
    <li>Keeping data constant but modifying program can offload mental visualization (<a href="https://observablehq.com/@tomlarkworthy/animated-kirigami" target="_blacnk">Kirigami</a>)</li>
    <li> Documentation inline with code is better in all situations</li>
  </ul>
`
)}

function _22(slide){return(
slide.img`https://gist.githubusercontent.com/mbostock/9511ae067889eefa5537eedcbbf87dab/raw/944b6e5fe8dd535d6381b93d88bf4a854dac53d4/mona-lisa.jpg`
)}

function _23(slide){return(
slide.end('this ends the presentation')
)}

function _24(md){return(
md`## Implementation`
)}

function _keypresscontrol()
{
  document.cells = document.getElementsByClassName("observablehq");
  document.stopnumber = document.cells.length - 5;

  //keymap
  document.onkeyup = function(e) {
    console.log(e);
    if (e.which === 83) {
      console.log('re -s- tart');
      document.current = 2;
      var elmnt = document.cells[document.current];
      elmnt.scrollIntoView();
    }
    if ((e.which === 32) | (e.which === 39) | (e.which === 40)) {
      console.log('space');
      document.current += 1;

      if (document.current < document.stopnumber) {
        var elmnt = document.cells[document.current];

        if (elmnt.innerHTML != '<div class="end"></div>') {
          elmnt.scrollIntoView();
        } else {
          document.stopnumber = document.current;
        }
      } else {
        document.current = document.stopnumber;
      }
    }

    if ((e.which === 38) | (e.which === 37)) {
      console.log('back');
      document.current -= 1;
      if (document.current < 2) {
        document.current = 2;
      }
      var elmnt = document.cells[document.current];
      elmnt.scrollIntoView();
    }
  };
}


function _slide(md,hl)
{
  function slide() {
    const container = document.createElement("div");
    container.className = "slide";
    container.appendChild(md.apply(this, arguments));
    return container;
  }
  function end() {
    const container = document.createElement("div");
    container.className = "end";
    return container;
  }
  slide.end = end;
  function iframe(strings) {
    const container = document.createElement("div");
    container.innerHTML="<iframe style='position:absolute;display:block; top:0px; left:-8px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;' frameBorder='0' src='"+strings+"'></iframe>"
    container.className = "slide";
    return container;
  }
  slide.iframe=iframe;
  function html(strings) {
    const container = document.createElement("div");
    container.innerHTML = strings;
    container.className = "slide slide--html";
    return container;
  }
  slide.html = html;
  function htmldark(strings) {
    const container = document.createElement("div");
    container.innerHTML = strings;
    container.className = "slide slide--html dark";
    return container;
  }
  slide.htmldark = htmldark;
  function code(strings) {
    const container = document.createElement("div");
    const pre = container.appendChild(document.createElement("pre"));
    const code = pre.appendChild(document.createElement("code"));
    let string = strings[0] + "", i = 0, n = arguments.length;
    while (++i < n) string += arguments[i] + "" + strings[i];
    code.textContent = string.trim();
    container.className = "slide slide--code";
    return container;
  }
  slide.code = code;
  slide.js = function() {
    const container = code.apply(this, arguments);
    const content = container.firstChild.firstChild;
    content.className = "js hljs javascript";
    hl.highlightBlock(content);
    return container;
  };
  slide.img = function(strings) {
    const img = new Image;
    let string = strings[0] + "", i = 0, n = arguments.length;
    while (++i < n) string += arguments[i] + "" + strings[i];
    img.src = string.trim();
    img.className = "slide slide--img";
    return img;
  };
  return slide;
}


function _slide_style(html){return(
html`<style>

cite{font-size:2vw;position: absolute; bottom:2%;right:2%; text-align: right;align:right; }


div,iframe{width:100%;height:100%}

.slide {
  width: calc(100% + 28px);
  margin: 0 -14px;
  padding: 10%;
  box-sizing: border-box;
  background: #333;
  color: #eee;
  min-height: 65vw;
  font-size: 5vw;
  line-height: 1.15;
  display: flex;
  align-items: center;
}

.slide a {
  color: #DE5E60;
}

.slide p,
.slide pre,
.slide img {
  max-width: 100%;
}

.slide--img {
  max-width: none;
  padding: 0;
}

.slide blockquote,
.slide ol,
.slide ul {
  max-width: none;
}

.slide > * {
  width: 100%;
}

.slide code {
  font-size: 80%;
}

.slide--code pre,
.slide--code code {
  font-size: 2.3vw;
}

.slide--code {
  color: rgb(27, 30, 35);
  background: rgb(247, 247, 249);
  border-bottom: solid 1px white;
}

.slide--html {
  color: rgb(27, 30, 35);
  background: rgb(247, 247, 249);
  border-bottom: solid 1px white;
}

.dark {
   color:  rgb(247, 247, 249);
   background: #333;
   border-bottom: solid 1px white;
}

.dark h1,.dark h2,.dark h3,.dark h4,.dark h5{color: rgb(247, 247, 249)}

</style>`
)}

function _hl(require){return(
require("@observablehq/highlight.js@1.0.0/highlight.min.js")
)}

function _audioContext(webaudioPolyfill)
{
  webaudioPolyfill;
  return new AudioContext();
}


function _35(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/5497e6c0bb2a9cfb98193d530182d6e1507758de034f3b78ce95704a4b5740e83f319dec550caa97f592f908df90e544e46264746d717189036553308a7bf1b4.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/200cc34aeb49ba6d7f137a937879325ba9ff19fcdac11c074b744c5c9b749ce1ef8bd8a1dfb4d58576b58d121adaf7edc8ebc9efa869dc721105f573aaaf0206.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/a1aa43695250be25dec5002787cbbf8c404895a77afed54529666e4147a82995ddb7fc36581f2412491ead630e11cef06565c0c05ddac48c939c7f4743805b33.png", import.meta.url), mimeType: "image/png", toString}],
    ["1.m4a", {url: new URL("./files/27bd3186f1602c10515299f806747f328d0064b966eb82d63fdba6db646272bb97ad8732d6adc804be3d237c74e6fc3141d40d262832e45a357ae1237609d4a6.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["5b.m4a", {url: new URL("./files/1648a03b03c649705695b06f59d4fe3d2485f57b35cc40c9827180d6e68049ffd8f371bbf6c6ffb537cff953f961cec076cda41d058854d0703d8ee747325976.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["14.m4a", {url: new URL("./files/e0612a8cf42ff2923bd8b7d85936370e4d6c69ced9cb316cab45c995c74f7e6b5aec8fbdbaf6872ec8aab1b8f47f1cf4083d976c2ebc79527849cfa10dce2947.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["7.m4a", {url: new URL("./files/ebac013371a8f848b10b4c26b847c411102c69eb7ca727811b25cb1d306cd021c374e0e243799e76072c22b50777436aa0c4761c2300aac0f20b7258b9bcbf55.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["8b.m4a", {url: new URL("./files/f425c8b8a9d28cbe09ec4f3b07a4a630062ffa5a2bd89ab7a7e8f1036ad1b7e16709b98f42295a6cb4bb777d607a6ce9d205f50b424bab18f319c5400ded5b68.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["4.m4a", {url: new URL("./files/f0ba1b82dcadda7a9c5ab860f2d43c68890b1030b989a1880451c543ace59540151c347f2f907715ff55dc5150b1891ea24aa86494b0fe62a80d7395f7de74ab.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["8d.m4a", {url: new URL("./files/66141be0f11dfb8d3f9addd477c5cc015d788d0bdb272cdd97ebb855d16f0eb8948b0af36ca39b02c8a758e77733773bd3c9f01abe0ee89435d5b6c71da03d59.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["13.m4a", {url: new URL("./files/f9b14dac0980ac1207107efb69b3443f477ff94cf92c7fa8a5156d044ae8b518d5161f66e1f93965c7c39f3e1cd018e7f9d2d818e093aeff45da9df4a3d01476.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["6.m4a", {url: new URL("./files/ecea018da8b52adee328f009d20364ca5a49f455a3a756777bd928ea39e647938fa205c3a005a15e776f1e2837b1eae0a4c801b550055c0281cce939c37d2b65.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["16b.m4a", {url: new URL("./files/41c431c2d19ef85a9b6716dbf48faf4e24c808900a7c83a78d460dacd6a01f390ff101d3a6869f7799808fcdfe1be30eeccedae475e85ab4e2fdebcc3bffa612.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["12.m4a", {url: new URL("./files/4a926df366e78a12d21ebb582f0f0e6212e7b0010f1917e52fa2e99bbd99d246142208c6a89abe70e108cf26b4cf900e353f0bbb2ffdb727a9af167eb890148e.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["8e.m4a", {url: new URL("./files/69896a2f3423fbc36a0ef4c0424f2904688cd59313899f6c3b537c0e53edce663e44cc6dec7e09e9ef97b68d9fd8f56a36bcbb07198aa57d21a4773c34bd5c35.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["15b.m4a", {url: new URL("./files/de6db812f7ade5810b42ecbdc4338909fee4c4f7fdd3174d3cffa011d0565ff7e2b0b4d57333308f20e45089925b289d577bff42f39c186f2e4d8d273f7d8ab6.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["2.m4a", {url: new URL("./files/0e7ed570e1406c00f0347751ee3c5bf8cee545fa0ee88cce99a5345b14b6cace7aa6ab0107e1db2e8a4577eab2e1d8874e281a571cb8c9d28dd636d6a2685ab8.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["16a.m4a", {url: new URL("./files/529543faa4513369ed8cd8d810ea908a08b06f87e007ac990e0c68751207693d3625ca515f908910ce38d0cafd955c01110f80302c5d1ab9af7f401c2e1ebe59.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["11.m4a", {url: new URL("./files/9714589d2bfee353c5c7d51c5b74ad08f617eec54303864f6f22571cd1740c9286994d6a6f36fb560ac453daef4411f66b7cc4d661440d1d9b6e1d9d4be19fbf.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["10.m4a", {url: new URL("./files/4f77a6e68388ea67f4234ef41d4f45f3c4cf324fd249928eff6f89fe35ba96034bd6cc046f169541a6bdff0e822a4cb991741dd85ebc4bbfdc52d687cbe882e2.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["16c.m4a", {url: new URL("./files/54c6e9f0fb40538fd39d33d5b64b8d1e807642ea6c2ee5bef060d1d6e2d20e3fd50fc45ce713822aad36f972186a8775bd43f037c1c89b9fb1b3eddc76931f91.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["16d.m4a", {url: new URL("./files/411774cb0ce11c7fedd5b5fc53f1ab729dcbbb830f7860e89c51b48ad40fd22aed3e9e7f9dbd5f36ce60df73806bace6a89b1b49f7a886358ce80f95d1046ea6.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["9b.m4a", {url: new URL("./files/0461c9c21fe20a0ffa68515bdfd2a83eb9908ccc9406f7adad84230d0476e3abf9f736640a1648aaf3747ed5d3e9e55d465105b9467fba2317e439b83b65bf76.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["15a.m4a", {url: new URL("./files/536aaed90fa2b6854a2561c805361117b6adf7fa97dd6cf6a1dc42e9c16b3bf70b115fd4ca918a54c2e6694ce2c335715966f960e82c5df67f4b317de8f68124.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["3.m4a", {url: new URL("./files/b2149457310bbce1d0b4185b76623e7b0f478573cd99b2a7230e9b0d93fe6137cf8073be4038ded05454794e714609c3722a824c45f0b64ea4541087fc338fb5.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["8c.m4a", {url: new URL("./files/ce0769540335873aec1e7e66a374a9ae92e83c48e8b549a9a326b2bb08406fe140d3dd31f3ddd3a81625ab99f01fd18bea44ddaeb3d5a8dc6e10536d2883b132.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["8a.m4a", {url: new URL("./files/4c18f8d8b077e13c93525a79b32b1570bba60332953a1f0ac43a06c09b62c21cb18026bcc80e16afe7dccd7db3c8edde0d86f675089201dc277b0f5e444a1906.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["5.m4a", {url: new URL("./files/fc5091f085b5068d699050a6723caadcf842c11eeae2d82fc194e8a082399352849d7f9daf7f95368543a0ead7871aba7b200c89ec5dd81fe63a66e3fdc51db9.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}],
    ["9a.m4a", {url: new URL("./files/74069357bb1ce11ff18cf2a779600d5500ed82506b038fb17277184202054ebf3b7497730ebe1ff399833b3a2951e60f359545f4018e300f22b12b308563657d.m4a", import.meta.url), mimeType: "audio/x-m4a", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof loadAudio")).define("viewof loadAudio", ["Toggle"], _loadAudio);
  main.variable(observer("loadAudio")).define("loadAudio", ["Generators", "viewof loadAudio"], (G, _) => G.input(_));
  main.variable(observer()).define(["loadAudio","html","sample","audioContext","md","FileAttachment"], _3);
  main.variable(observer()).define(["Element","html"], _4);
  main.variable(observer("titleslide")).define("titleslide", ["slide"], _titleslide);
  main.variable(observer()).define(["html","FileAttachment","tweet"], _6);
  main.variable(observer()).define(["html","FileAttachment"], _7);
  main.variable(observer()).define(["slide"], _8);
  main.variable(observer()).define(["slide"], _9);
  main.variable(observer()).define(["slide"], _10);
  main.variable(observer()).define(["slide","html","FileAttachment"], _11);
  main.variable(observer()).define(["slide"], _12);
  main.variable(observer()).define(["slide","now"], _13);
  main.variable(observer()).define(["slide"], _14);
  main.variable(observer()).define(["slide"], _15);
  main.variable(observer()).define(["slide"], _16);
  main.variable(observer()).define(["slide"], _17);
  main.variable(observer()).define(["html","tweet"], _18);
  main.variable(observer()).define(["slide"], _19);
  main.variable(observer()).define(["slide"], _20);
  main.variable(observer()).define(["slide"], _21);
  main.variable(observer()).define(["slide"], _22);
  main.variable(observer()).define(["slide"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("keypresscontrol")).define("keypresscontrol", _keypresscontrol);
  main.variable(observer("slide")).define("slide", ["md","hl"], _slide);
  main.variable(observer("slide_style")).define("slide_style", ["html"], _slide_style);
  main.variable(observer("hl")).define("hl", ["require"], _hl);
  main.variable(observer("audioContext")).define("audioContext", ["webaudioPolyfill"], _audioContext);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("tweet", child2);
  const child3 = runtime.module(define3);
  main.import("sample", child3);
  main.import("webaudioPolyfill", child3);
  const child4 = runtime.module(define4);
  main.import("Toggle", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _35);
  return main;
}
