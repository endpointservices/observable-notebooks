import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";
import define4 from "./dfdb38d5580b5c35@351.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${md`# BLOG: How to Harness Agency - Wisdom from Monty Hall
`}`
)}

function _2(md,metadata){return(
md`Live ${metadata.url}`
)}

function _metadata(content,string_to_slug){return(
{
  description:
    "In this article I argue that active choice making leads to better outcomes in life, and this has been demonstrated by the Monty Hall problem all these years.",
  notebook:
    'https://observablehq.com/@tomlarkworthy/agency-wisdom-from-monty-hall',
  tags: ["article", "productivity"],
  image:
    "https://storage.googleapis.com/o_tomlarkworthy_toms/public/blogs/montyhall/monty",
  get title() {
    return document.getElementById("blogtitle").innerText.replace("BLOG: ", "");
  },
  content: content.outerHTML,
  get target() {
    return `/blogs/${string_to_slug(this.title)}.html`;
  },
  twitterCreator: "@tomlarkworthy",
  get url() {
    return 'https://tomlarkworthy.endpointservices.net' + this.target;
  }
}
)}

function _settings(deployStaticFile,metadata,preview){return(
deployStaticFile({
  ...metadata,
  app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
  source: preview.href
})
)}

function _preview(deploy,page){return(
deploy("preview", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  return res.send(page)
})
)}

function _6(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _content(html,md){return(
html`<div class=content>${md`

In the words of The Clash "Should I stay or should I go?" Life is a series of routines followed by disruptive change, whether it's a new job, a life relocation, having children, or enrolling in significant education. How do you know if you are making the right decisions?

Well, of course, no one can see the future. So you cannot know for sure. But, fear not! I argue, that by making the difficult move, by taking the harder option, by not sticking to the status quo (the passive choice), you will, on balance, radically improve your trajectory.

I have come to this conclusion for a couple of reasons. One, empirically, from seeing the consequences of my own chaotic actions played out across the globe. During my time on earth, I have taken several leaps of faith, and each gave back more than I ever predicted. Some of it is, of course, good luck, but, I believe, there is a second deeper mathematical reason for why leaps of faith have a higher than the expected payout.

I want to concentrate on this second mathematical reason in this post. I think it's an overlooked tailwind that's activated by agency. The model says that active choice-making, by itself, turbocharges the ability to achieve. The underlying mechanism is demonstrated by the Monty Hall Problem. So first, a quick recap on the Monty Hall problem.

In the Monty Hall problem, a contestant on a game show is asked to choose one of three doors. One of the doors contains a prize. After the contestant chooses, the door remains shut, but the game show host reveals a different door that does NOT contain the prize. The contestant is then given an opportunity to change their mind. Then their final choice of door is opened and perhaps they receive a prize. The problem is whether the contestant should switch doors or not, and the solution is they should always switch.

Much ink has been spilled over this problem, suffice it to say, many regard the solution as non-intuitive and even respected mathematicians have publicly argued the wrong strategy.

<iframe width="100%" height="536" frameborder="0"
  src="https://observablehq.com/embed/@tomlarkworthy/n-door-monty-hall?cells=viewof+game"></iframe>

One explanation for the optimal strategy is: imagine there were 100 doors, and only one had a prize. The contestant at first guesses one door (i.e. 1 in 100 chance picking the prize). The game show host then opens 98 doors that do not contain the prize, then it's much more obvious that the contestant should switch, as this is the only way of leveraging the fact that new information has entered the problem. Note that two doors have not been opened, and by switching the contestant has a 50% chance of winning. If they do not switch, they have a 1% chance of winning.

It's strange but they must switch to "bank" the new information. And this is something we can apply in everyday life.

Consider your first major life choice. Should you stay in the town where you were born or should you leave to seek your fortune elsewhere?

If you stay in your home town, you are following the passive choice. The decision was made for you. The situation you find yourself in has not been made based on your life interests, skills, or personality. Thus it is pure luck. However, when you consider where you move to, you might have a shortlist around what you hope to accomplish in the next place. Think about the infinite possibilities of where you could move, but you only consider ten or so.

So which of the ten is the best move? -- it does not matter, the simple fact that they were chosen by you, based on your life situation makes any of them a better choice than staying put. By making an active choice, you "bank" information acquired up to that point.

Many people report that after changing jobs, they say "I wish I had done this sooner". It is because what brought you to your current job fairly quickly becomes out of date as you gain experience. So while your current job was good for learning the ropes, but your next job needs to be tuned for advancing your career, etc.

Thus we see after an active decision (changing jobs), its positive effects evaporate over time as external forces start to dominate your lived life experience. By making active choices, you are in the driving seat of your own life. Your decisions dominate your lived life experience, and you have an invested interest, and so it is naturally better for you.

So, in order to make the most of your finite duration on Earth, you should constantly be revising what to do next. You should try to avoid the trap of doing what you are currently doing because it's simplest. It's the moves that test us that ultimately enrich us the most.

It is the Monty Hall problem that shows us in plain sight the effect that changing plans has. By changing our choices, by exercising our agency, we "bank" all information known up to that point in time, and we exert our personal values on our life's trajectory. In a sense, we maximize our chance of opening the door with the prize.

`}`
)}

function _page(articleHeader,metadata,topbar,sidebar,html,content,articleFooter){return(
`<!doctype html>
<html class="has-navbar-fixed-top">
  <head>
    ${articleHeader(metadata).outerHTML}
  </head>
  <body>
    ${topbar.outerHTML}
    <div class="columns">
      ${sidebar.outerHTML}
      <div class="column is-half">
        ${html`<div class="content"><h1>${metadata.title}`.outerHTML}
        ${content.outerHTML}
      </div>
    </div>
    ${articleFooter(metadata).outerHTML}
  </body>
</html>`
)}

function _string_to_slug(){return(
function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}
)}

function _14(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["html","md"], _title);
  main.variable(observer()).define(["md","metadata"], _2);
  main.variable(observer("metadata")).define("metadata", ["content","string_to_slug"], _metadata);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer()).define(["md","metadata"], _6);
  main.variable(observer("content")).define("content", ["html","md"], _content);
  main.variable(observer("page")).define("page", ["articleHeader","metadata","topbar","sidebar","html","content","articleFooter"], _page);
  main.variable(observer("string_to_slug")).define("string_to_slug", _string_to_slug);
  const child1 = runtime.module(define1);
  main.import("deployStaticFile", child1);
  const child2 = runtime.module(define2);
  main.import("sidebar", child2);
  main.import("topbar", child2);
  main.import("articleHeader", child2);
  main.import("articleFooter", child2);
  main.import("deploy", child2);
  main.import("html", child2);
  main.import("svg", child2);
  const child3 = runtime.module(define3);
  main.import("icon", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _14);
  return main;
}
