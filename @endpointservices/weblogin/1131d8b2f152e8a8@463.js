// https://observablehq.com/@observablehq/banner@463
import define1 from "./ee098917a6150f1f@388.js";

function _1(bannerTitle){return(
bannerTitle("Reusable banners")
)}

function _2(md){return(
md`## Why
These banners thumbnail well and also play nicely with our notebook title extraction, meaning the text in the banner doubles naturally as the notebook title while being text-selectable and screen-readable.`
)}

function _3(md){return(
md `## Use
- Import the banner style you want into your notebook, e.g.:
~~~js
import {bannerTitle} from "@observablehq/banner"
~~~
- Copy-paste the appropiate code into the top cell of your notebook, along with whatever variables you want to define (background color and text color can be specified to change from the default), e.g.
~~~js
bannerTitle("Presentation", "pink", "white")
~~~
- Long lines of text may be cut off in the notebook's thumbnail image, so check the thumbnail if that's important to you.
`
)}

function _4(md){return(
md `## Styles`
)}

function _5(bannerTitle){return(
bannerTitle("A single line banner")
)}

function _bannerTitle(DOM,html,bannerHeight){return(
(title, backgroundColor = "#c8d9dd", textColor = "#282b2c", pageTitle = title) => {
  const {id, href} = DOM.uid("banner");
  return html`
    <h1 style="display: none">${pageTitle}</h1> <!-- extracted title -->
    <svg id="${id}" width="100%" viewBox="0 0 960 ${bannerHeight}">
      <text x="50%" y="50%" text-anchor="middle">
        <tspan dy=".25em">${title}</tspan>
      </text>
    </svg>
    <style>
      #${id} {background: ${backgroundColor};}
      #${id} text {fill: ${textColor}; font-size: 36px; font-weight: bold;}
    </style>
  `;
}
)}

function _7(bannerTitleTwoLine){return(
bannerTitleTwoLine("Something that works well over two lines", "can be presented in this way")
)}

function _bannerTitleTwoLine(DOM,html,bannerHeight){return(
(title1, title2, backgroundColor = "#c8d9dd", textColor = "#282b2c", pageTitle = title1 + " " + title2) => {
  const {id, href} = DOM.uid("banner");
  return html`
    <h1 style="display: none">${pageTitle}</h1> <!-- extracted title -->
    <svg id="${id}" width="100%" viewBox="0 0 960 ${bannerHeight}">
      <text x="50%" y="50%" text-anchor="middle">
        <tspan x="50%" dy="-0.34em">${title1}</tspan>
        <tspan x="50%" dy="1.3em">${title2}</tspan>
      </text>
    </svg>
    <style>
      #${id} {background: ${backgroundColor};}
      #${id} text {fill: ${textColor}; font-size: 36px; font-weight: bold;}
    </style>
  `;
}
)}

function _9(bannerLogo){return(
bannerLogo()
)}

function _bannerLogo(DOM,html,bannerHeight,logoAndWordmark){return(
(backgroundColor = "#c8d9dd", textColor = "#282b2c") => {
  const {id, href} = DOM.uid("banner");
  return html`
    <svg id="${id}" width="100%" viewBox="0 0 960 ${bannerHeight}">
      <svg x="30.25%" y="40.6%">
        <g transform="scale(.5)">
          ${logoAndWordmark.cloneNode(true)}
        </g>
      </svg>
    </svg>
    <style>
      #${id} {background: ${backgroundColor};}
      #${id} svg, #${id} g {fill: ${textColor};}
    </style>
  `;
}
)}

function _11(bannerLogoTitleSmall){return(
bannerLogoTitleSmall("Meetup – April 1, 2021")
)}

function _bannerLogoTitleSmall(DOM,html,bannerHeight,logoAndWordmark){return(
(title, backgroundColor = "#c8d9dd", textColor = "#282b2c", pageTitle = title) => {
  const {id, href} = DOM.uid("banner");
  return html`
    <h1 style="display: none">${pageTitle}</h1> <!-- extracted title -->
    <svg id="${id}" width="100%" viewBox="0 0 960 ${bannerHeight}">
      <svg x="30.25%" y="35%">
        <g transform="scale(.5)">
          ${logoAndWordmark.cloneNode(true)}
        </g>
      </svg>
      <text x="50%" y="67%" text-anchor="middle">
        <tspan>${title}</tspan>
      </text>
    </svg>
    <style>
      #${id} {background: ${backgroundColor};}
      #${id} text {fill: ${textColor}; font-size: 24px; font-weight: bold;}
      #${id} svg, #${id} g {fill: ${textColor};}
    </style>
  `;
}
)}

function _13(bannerTitleSmallLogo){return(
bannerTitleSmallLogo("Hosted by")
)}

function _bannerTitleSmallLogo(DOM,html,bannerHeight,logoAndWordmark){return(
(title, backgroundColor = "#c8d9dd", textColor = "#282b2c", pageTitle = title) => {
  const {id, href} = DOM.uid("banner");
  return html`
    <h1 style="display: none">${pageTitle}</h1> <!-- extracted title -->
    <svg id="${id}" width="100%" viewBox="0 0 960 ${bannerHeight}">

      <text x="50%" y="37%" text-anchor="middle">
        <tspan>${title}</tspan>
      </text>
      <svg x="30.25%" y="47%">
        <g transform="scale(.5)">
          ${logoAndWordmark.cloneNode(true)}
        </g>
      </svg>
    </svg>
    <style>
      #${id} {background: ${backgroundColor};}
      #${id} text {fill: ${textColor}; font-size: 24px; font-weight: bold;}
      #${id} svg, #${id} g {fill: ${textColor};}
    </style>
  `;
}
)}

async function _15(bannerImage,FileAttachment){return(
bannerImage(await FileAttachment("whm-dvc.png").url(), "Women's History Month DataViz Contest")
)}

function _bannerImage(DOM,html){return(
function (url, title, pageTitle = title) {
  const {id, href} = DOM.uid("banner");
  return html`
    <h1 style="display: none">${title}</h1> <!-- extracted title -->
    <img id="${id}" src="${url}" alt="${title}" />
    <style>
      #${id} {width: 100%;}
    </style>
  `;
}
)}

function _17(md){return(
md `## Popular color combinations for the Observable team`
)}

function _18(bannerLogoTitleSmall){return(
bannerLogoTitleSmall("Designer", "#F5F5F5")
)}

function _19(bannerLogoTitleSmall){return(
bannerLogoTitleSmall("Meetup – April 1, 2021", "linear-gradient(rgb(40, 46, 70), rgb(135, 58, 104))", "white")
)}

function _20(md){return(
md `## Further customization for the Observable team

If you work at Observable and you'd like a banner with different fonts or other customizations not available here, please ask the Design team and we'll put one together for you. Our custom banners can be seen here https://observablehq.com/@observablehq/banner-custom`
)}

function _21(md){return(
md `## Tools
- Gradient generator: https://cssgradient.io
- Another gradient generator: https://learnui.design/tools/gradient-generator.html
- Color wheel: https://www.canva.com/colors/color-wheel/
`
)}

function _22(md){return(
md `## Appendix`
)}

function _banner(bannerLogoTitleSmall){return(
bannerLogoTitleSmall
)}

function _24(width,logoWidth,bannerHeight,logoHeight)
{
  // calculates the correct % X/Y offset for centering the logo at whatever scale you want
  const logoScale = 0.5;
  let logoX = (100 / width) * ((width - (logoWidth * logoScale)) / 2);
  let logoY = (100 / bannerHeight) * ((bannerHeight - (logoHeight * logoScale)) / 2);
  return ([logoX, logoY]);
}


function _logoWidth(logoAndWordmark){return(
+logoAndWordmark.getAttribute("width")
)}

function _logoHeight(logoAndWordmark){return(
+logoAndWordmark.getAttribute("height")
)}

function _bannerHeight(){return(
320
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["whm-dvc.png",new URL("./files/d65b10049c554db9c4e8bad81c4183c7d1932217a9750d7cf7efb2b524a8066501de737af6d1d7fc9328ddd60f2fbdbb1f5832a83cd2ba64fe503f7cac367cc4",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["bannerTitle"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["bannerTitle"], _5);
  main.variable(observer("bannerTitle")).define("bannerTitle", ["DOM","html","bannerHeight"], _bannerTitle);
  main.variable(observer()).define(["bannerTitleTwoLine"], _7);
  main.variable(observer("bannerTitleTwoLine")).define("bannerTitleTwoLine", ["DOM","html","bannerHeight"], _bannerTitleTwoLine);
  main.variable(observer()).define(["bannerLogo"], _9);
  main.variable(observer("bannerLogo")).define("bannerLogo", ["DOM","html","bannerHeight","logoAndWordmark"], _bannerLogo);
  main.variable(observer()).define(["bannerLogoTitleSmall"], _11);
  main.variable(observer("bannerLogoTitleSmall")).define("bannerLogoTitleSmall", ["DOM","html","bannerHeight","logoAndWordmark"], _bannerLogoTitleSmall);
  main.variable(observer()).define(["bannerTitleSmallLogo"], _13);
  main.variable(observer("bannerTitleSmallLogo")).define("bannerTitleSmallLogo", ["DOM","html","bannerHeight","logoAndWordmark"], _bannerTitleSmallLogo);
  main.variable(observer()).define(["bannerImage","FileAttachment"], _15);
  main.variable(observer("bannerImage")).define("bannerImage", ["DOM","html"], _bannerImage);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["bannerLogoTitleSmall"], _18);
  main.variable(observer()).define(["bannerLogoTitleSmall"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("banner")).define("banner", ["bannerLogoTitleSmall"], _banner);
  main.variable(observer()).define(["width","logoWidth","bannerHeight","logoHeight"], _24);
  main.variable(observer("logoWidth")).define("logoWidth", ["logoAndWordmark"], _logoWidth);
  main.variable(observer("logoHeight")).define("logoHeight", ["logoAndWordmark"], _logoHeight);
  main.variable(observer("bannerHeight")).define("bannerHeight", _bannerHeight);
  const child1 = runtime.module(define1);
  main.import("logoAndWordmark", child1);
  return main;
}
