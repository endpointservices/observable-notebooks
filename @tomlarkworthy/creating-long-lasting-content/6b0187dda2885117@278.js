// https://observablehq.com/@tomlarkworthy/creating-long-lasting-content@278
import define1 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Creating long-lasting content on [Observable](observablehq.com)`
)}

function _2(md){return(
md`I am 100% convinced [Observable](observablehq.com) is the right way to share computational thought. Sometimes though, it feels like notebooks are only read once during their birth on the [\`/trending\`](https://observablehq.com/trending) page. However, I am happy to report you *can* create long-lasting content with lots of repeat visitors and it is surprisingly straightforward to do. In this article, I will share what I have learned on my [Observable](observablehq.com) journey.`
)}

function _3(md){return(
md`I took data-driven approach to find out what works. After wiring my pages to [Plausible Analytics](https://observablehq.com/@endpointservices/plausible-analytics) I could finally get a birds-eye view of my readership. I found the results fascinating! Here are my page views in the last month (Nov. 2021):-`
)}

function _4(Plot,d3,stats){return(
Plot.plot({
  marginBottom: 100,
  x: {
    tickRotate: 45,
    domain: d3
      .sort(stats, (d) => -d.views)
      .map((d) => d.slug.replace("/@tomlarkworthy/", ""))
  },
  marks: [
    Plot.barY(stats, {
      y: "views",
      x: (d) => d.slug.replace("/@tomlarkworthy/", "")
    })
  ]
})
)}

function _stats(){return(
[
  {
    slug: "/@tomlarkworthy/view",
    views: 1100
  },
  { slug: "/@tomlarkworthy/hacker-favourites-analysis", views: 164 },
  { slug: "/@tomlarkworthy/saas-tutorial", views: 150},
  { slug: "/@tomlarkworthy/switch-dataflow", views: 126 },
  { slug: "/@tomlarkworthy/merge-dataflow", views: 80 },
  { slug: "/@tomlarkworthy/mip", views: 62 },
  { slug: "/@tomlarkworthy/sound-cloud-reactive-audio-visualizer", views: 37 },
  { slug: "/@tomlarkworthy/sign-a-pdf", views: 36 },
  { slug: "/@tomlarkworthy/firebase", views: 28}
]
)}

function _6(md){return(
md`## Collaborate and solve a platform need

My #1 content by a long shot is *[Composing viewofs with the __view__ literal](https://observablehq.com/@tomlarkworthy/view)*. This is a super useful utility that helps create complex UIs on the Observablehq platform. It fills a gap in the platform primitives, and clearly, I was not the only one who needed it. I collaborated with [@mootari](/@mootari) and [@mbostock](/@mbostock) on it, and it was developed to support a consulting job that needed a production-level UI.

Now, I have written *many* libraries for **Observable**. None of them do as well as this one. I think this one resonated so much harder because it was the product of a business need, and it was refined via conversations with others. So my first tip for creating great content is: *talk to others in the community!* Use the [forum](https://talk.observablehq.com/) or leave comments on people's notebooks!

However, most of my other utilities are not in my top ten, which implies that it is actually very hard to develop a library that others will use. It took me 6 months of full-time work on Observable to understand enough to craft that library. So generally, I would say it is not a very easy path. The [saas-tutorial](https://observablehq.com/@tomlarkworthy/saas-tutorial) and [Firebase](https://observablehq.com/@tomlarkworthy/firebase) are other examples of Observable utilities that have done quite well, but again, they took a lot of effort to produce.`
)}

function _7(md){return(
md`## Go viral!

My next most popular content was created well over a year ago and is still going strong. The *[Most favorited Hacker News posts of all time](https://observablehq.com/@tomlarkworthy/hacker-favourites-analysis)* went stratospheric on *[Hackernews](https://news.ycombinator.com)*, getting [1260 upvotes](https://news.ycombinator.com/item?id=24351073) and linked to all over the web. 

It is very satisfying to me that good content like that is rewarded with a steady stream of traffic continuously for years. It gives me the motivation to keep trying. The Hackenews Favourites notebook really is an excellent article as it surfaces the *crème de la crème* of Hackernews which was previously unknown. 

Obviously writing good viral content is kind of hard. If I had the formula to do it I would have more, but I am satisfied that if you do figure one out, you will get good readership numbers. The notebook [Sign a PDF and Adobe: Go Fuck Yourself](https://www.facebook.com/hn.hiren.news/posts/2979774452265797) also was a Hackernews hit, though not to the same level, but that's also why it has reached the top ten.`
)}

function _8(md){return(
md`## Promote your content outside of [Observable](https://observablehq.com)

The notebooks mentioned in the previous tips represent my *"smash hits"*, which are a bit random to produce. They were generated when inspiration hit. On the other hand, the remaining notebooks are doing well, and did well for fairly simple and repeatable reasons. This section is the most important one as this is where luck no longer plays a role.

| notebook | views | likes |
|---|---|---|
| [switch-dataflow](https://observablehq.com/@tomlarkworthy/switch-dataflow) | 126 | 9 |
| [merge-dataflow](https://observablehq.com/@tomlarkworthy/merge-dataflow) | 80 | 9 |
| [mip](https://observablehq.com/@tomlarkworthy/mip) | 62 | 27 |
| [sound-cloud-reactive-audio-visualizer](https://observablehq.com/@tomlarkworthy/sound-cloud-reactive-audio-visualizer) | 37 | 24 |

What's interesting with these notebooks is that their success is not dependant on Observable "likes". The real reason why these set of notebooks do so well is that they were all promoted *outside* of Observable.

The switch and merge dataflow tutorials are blog posts that were syndicated to [dev.to](https://dev.to) and [medium](https://medium.com) using the meta-notebook [Blogify](https://observablehq.com/@tomlarkworthy/blogify). The [Mixed Integer Programming (mip)](https://observablehq.com/@tomlarkworthy/mip) notebook was shared on [r/optimization](https://www.reddit.com/r/optimization/comments/pil5ao/i_made_a_milp_frontend_in_a_reactive_javascript/) and the [reactive visualizer](https://observablehq.com/@tomlarkworthy/sound-cloud-reactive-audio-visualizer) on [r/edmproduction](https://www.reddit.com/r/edmproduction/comments/j0vj3o/reactive_audio_visuals_music_video_creator/).

These notebooks were not big hits! But this is what is really cool about them. By simply cross-posting them off the platform has a *huge* effect on their longevity, regardless of their popularity on Observable. Their SEO is good. *This is great news.* Performance on \`/trending\` is not indicative of performance elsewhere. You simply have to cross-post.
`
)}

function _9(md){return(
md`## Conclusion

I am not a gifted content producer, but you don't need to be! It's easy to share your work on [Reddit](https://www.reddit.com/), and that act alone makes a huge difference to the longevity of your work. I think most people on Observable produce much better work than me. *You are not doing it justice if it stays only on the platform*. If you just go out and share it on places like [r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/) or [hackernews](https://news.ycombinator.com) you will amplify your impact *massively*. This is the simple secret of creating long-lasting content on [Observable](https://observablehq.com).
`
)}

function _11(footer,md){return(
footer, md``
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["Plot","d3","stats"], _4);
  main.variable(observer("stats")).define("stats", _stats);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer","md"], _11);
  return main;
}
