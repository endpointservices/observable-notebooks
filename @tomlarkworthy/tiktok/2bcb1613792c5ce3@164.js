// https://observablehq.com/@tomlarkworthy/tiktok@164
import define1 from "./c7a3b20cec5d4dd9@730.js";

function _1(md){return(
md`# TikTok

~~~js
import {tiktok} from '@tomlarkworthy/tiktok'
~~~

Issues
- if you refresh the cell again the embed will fail the 2nd time :/
`
)}

function _2(tiktok){return(
tiktok('https://www.tiktok.com/@olddemongod/video/6944000387296873733')
)}

function _tiktok(tiktokLib,parse,enrich,html){return(
async function tiktok(link, { maxWidth = "605px", minWidth = "325px" } = {}) {
  tiktokLib;
  const data = parse(link);

  const embed = await enrich(data);

  return html`${embed.html}`;
}
)}

function _parse(){return(
function parse(link) {
  let match = null;
  if ((match = link.match(/@(?<artist>[^/]*)\/video\/(?<video>[^?/#]*)/))) {
    return {
      artist: match.groups.artist,
      video: match.groups.video
    };
  } else {
    throw new Error("Cannot parse link");
  }
}
)}

function _enrich(){return(
async function enrich(data) {
  const result = await (await fetch(
    `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${data.artist}/video/${data.video}`
  )).json();

  result.html = result.html.replace(
    '<script async src="https://www.tiktok.com/embed.js"></script>',
    ''
  );
  return result;
}
)}

function _tests(createSuite){return(
createSuite({
  name: 'Tests'
})
)}

function _7(tests,expect,parse){return(
tests.test(
  "Parse https://www.tiktok.com/@olddemongod/video/6944000387296873733",
  () => {
    expect(
      parse("https://www.tiktok.com/@olddemongod/video/6944000387296873733")
    ).toEqual({
      artist: "olddemongod",
      video: "6944000387296873733"
    });
  }
)
)}

function _8(tests,expect,parse){return(
tests.test(
  "Parse https://www.tiktok.com/@olddemongod/video/6944000387296873733?sender_device=pc&sender_web_id=6935878758234670598&is_from_webapp=v2&is_copy_url=0",
  () => {
    expect(
      parse(
        "https://www.tiktok.com/@olddemongod/video/6944000387296873733?sender_device=pc&sender_web_id=6935878758234670598&is_from_webapp=v2&is_copy_url=0"
      )
    ).toEqual({
      artist: "olddemongod",
      video: "6944000387296873733"
    });
  }
)
)}

function _9(tests,enrich,expect){return(
tests.test(
  "Enrich olddemongod, 6944000387296873733 has html property",
  async () => {
    const enrichResult = await enrich({
      video: "6944000387296873733",
      artist: 'olddemongod'
    });

    expect(enrichResult).toHaveProperty("author_name");
    expect(enrichResult).toHaveProperty("author_url");
    expect(enrichResult).toHaveProperty("title");
    expect(enrichResult).toHaveProperty("html");
  }
)
)}

function _tiktokLib(require){return(
require('https://www.tiktok.com/embed.js').catch(() => {})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tiktok"], _2);
  main.variable(observer("tiktok")).define("tiktok", ["tiktokLib","parse","enrich","html"], _tiktok);
  main.variable(observer("parse")).define("parse", _parse);
  main.variable(observer("enrich")).define("enrich", _enrich);
  main.variable(observer("viewof tests")).define("viewof tests", ["createSuite"], _tests);
  main.variable(observer("tests")).define("tests", ["Generators", "viewof tests"], (G, _) => G.input(_));
  main.variable(observer()).define(["tests","expect","parse"], _7);
  main.variable(observer()).define(["tests","expect","parse"], _8);
  main.variable(observer()).define(["tests","enrich","expect"], _9);
  main.variable(observer("tiktokLib")).define("tiktokLib", ["require"], _tiktokLib);
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  return main;
}
