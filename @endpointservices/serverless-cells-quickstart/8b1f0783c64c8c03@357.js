// https://observablehq.com/@endpointservices/serverless-cells-quickstart@357
import define1 from "./dff1e917c89f5e76@1964.js";
import define2 from "./3fd0d90f06cd444e@89.js";
import define3 from "./293899bef371e135@290.js";

function _1(md){return(
md`# How to create a public URL with [Serverless Cells](https://observablehq.com/@endpointservices/serverless-cells)`
)}

async function* _2(html,FileAttachment)
{
  yield html`<img width="1200" height="675"></img>`
  yield html`<img src="${URL.createObjectURL(await FileAttachment("fastestAPI.gif").blob(), {type: "image/gif"})}">`
}


function _3(md){return(
md`## The code`
)}

function _4(md){return(
md`Import the deploy function for the [serverless cell](https://observablehq.com/@endpointservices/serverless-cells) notebook.`
)}

function _6(md){return(
md`Call _deploy_ with a handler to create an endpoint. _Deploy_ returns a web link.`
)}

function _handler(deploy){return(
deploy("myhandler", (req, res) => {
  res.send("Hello World!")
})
)}

function _8(md,handler){return(
md`Publish your notebook and then try it out! Click the <a href="${handler.href}">myhandler</a> link!

<mark> 2021-08-10: new notebooks are slow to get to the CDN, so fresh forks seem to take longer to show up </mark> 
`
)}

function _9(md){return(
md`## Next Steps

[Serverless Cells](https://observablehq.com/@endpointservices/serverless-cells) only run public source code by design. No more data processing black boxes on the internet please! The runtime cells also supports [secret injection](https://observablehq.com/@endpointservices/secrets),  [logging](https://observablehq.com/@endpointservices/logs), CDN caching and Express-like [URL routing](https://observablehq.com/@tomlarkworthy/api-hosting-with-express). Checkout its [notebook](https://observablehq.com/@endpointservices/serverless-cells) for more info.


The sky is the limit on what you can build, we have have made an Observerable-to-Netlify [static site generator](https://observablehq.com/@endpointservices/netlify), [Zapier](https://observablehq.com/@endpointservices/zapier) integration, [CORS proxy](https://observablehq.com/@tomlarkworthy/fetchp) and [CI reporting framework](https://observablehq.com/@tomlarkworthy/testing) as examples of the possibilities. 


### Sympathetic with Observable workflows

[Federated Login](https://observablehq.com/@endpointservices/login) allows you to fork privileged services and still access user data despite the host domain changing. **All [Endpoint services](https://observablehq.com/collection/@endpointservices/services) are publicly implemented on Observable as Serverless cells**, except the Serverless Cell runtime, which is available on [Github](https://github.com/endpointservices/serverlesscells) and hosted on [Cloud Run](https://cloud.google.com/run). You have the power to customize the front end experience of [Endpoint services](https://observablehq.com/collection/@endpointservices/services) using Observable tooling.

### Fairer billing

The host notebook domain is billed for Serverless cell execution (_coming soon_). When a Serverless cell is imported from another notebook, by default, the imported cell is served from the domain of the consuming notebook. Thus, the consuming notebook is billed for the execution of imported functionality. This means service authors are not exposed to operational costs of users. Infrastructure costs are paid by the people getting value out of the service, and it's utterly trivial to distribute.

## Endpoint Services is building a Transparent Cloud
 
It's early days. Please report issues on [Github](https://github.com/endpointservices/serverlesscells/issues).



`
)}

function _smithying(md){return(
md`
---

## GIF Smithing

This section is used to create the promo GIF. By default it's turned off to save bandwidth and CPU.

Download assets (10MB) <input type="checkbox" value="true">
`
)}

function _11(html,DOM,gif){return(
html`${DOM.download(gif,"fastestAPI.gif", "Download GIF")}`
)}

async function _frames(smithying,FileAttachment){return(
[
  {
    smithying: smithying,
    delay: 3000,
    scroll: 50,
    img: await FileAttachment("1.png").image()
  },
  {
    delay: 2000,
    img: await FileAttachment("2.png").image()
  },
  {
    delay: 2000,
    scroll: 100,
    img: await FileAttachment("3.png").image()
  },
  {
    delay: 300,
    scroll: 200,
    img: await FileAttachment("101.png").image()
  },
  {
    delay: 300,
    scroll: 200,
    img: await FileAttachment("102.png").image()
  },
  {
    delay: 300,
    scroll: 200,
    img: await FileAttachment("103.png").image()
  },
  {
    delay: 2000,
    scroll: 200,
    img: await FileAttachment("104.png").image()
  },
  {
    delay: 2000,
    scroll: 100,
    img: await FileAttachment("4.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("21.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("22.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("23.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("24.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("25.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("26.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("27.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("28.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("29.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("210.png").image()
  },
  {
    delay: 1000,
    scroll: -400,
    img: await FileAttachment("211.png").image()
  },
  {
    delay: 2000,
    img: await FileAttachment("5.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("301.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("302.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("303.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("304.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("305.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("306.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("307.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("308.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("309.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("310.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("311.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("312.png").image()
  },
  {
    delay: 300,
    scroll: -400,
    img: await FileAttachment("313.png").image()
  },
  {
    delay: 2000,
    scroll: -400,
    img: await FileAttachment("314.png").image()
  },
  {
    delay: 2000,
    img: await FileAttachment("6@1.png").image()
  },
  {
    delay: 300,
    img: await FileAttachment("401.png").image()
  },
  {
    delay: 300,
    img: await FileAttachment("402.png").image()
  },
  {
    delay: 300,
    img: await FileAttachment("403.png").image()
  },
  {
    delay: 300,
    img: await FileAttachment("404.png").image()
  },
  {
    delay: 300,
    img: await FileAttachment("405.png").image()
  },
  {
    delay: 300,
    img: await FileAttachment("406.png").image()
  },
  {
    delay: 2000,
    img: await FileAttachment("407.png").image()
  },
  {
    delay: 2000,
    img: await FileAttachment("7@2.png").image()
  },
  {
    delay: 400,
    scroll: -400,
    img: await FileAttachment("501.png").image()
  },
  {
    delay: 500,
    scroll: -400,
    img: await FileAttachment("502.png").image()
  },
  {
    delay: 2000,
    scroll: 400,
    img: await FileAttachment("503.png").image()
  },
  {
    delay: 4000,
    img: await FileAttachment("8@1.png").image()
  },
]
)}

function _gif(GIF,frames){return(
new Promise(resolve => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 1200; // Ideal for Twitter
  canvas.height = 675;
  
  const gif = new GIF({
    width: canvas.width,
    height: canvas.height,
    workers: 8
  })
  
  frames.forEach(frame => {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frame.img, 0, (frame.scroll || 0) - 200, canvas.width,  canvas.width * frame.img.height / frame.img.width); 
    gif.addFrame(canvas, {delay: frame.delay, copy: true})
  })
  gif.on("finished", resolve);
  gif.render()
})
)}

function _16(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["503.png", {url: new URL("./files/1bb542f92dc911c3cb8da73b1d1eea6c52bc34d9a2cdaac544ed15c4832fa570468a119c1d20513ea00b8749806d8fd8fdf8c049e82b7fd7f159ab04d9c285d7.png", import.meta.url), mimeType: "image/png", toString}],
    ["1.png", {url: new URL("./files/f445d137c7353f7a6bcfffdaa762357f90156bb6f5b0cc817cda0b59193dbab2c8bf39b052b84b2e5c449d8d5ab0cf6063087e39a15eff7a5dc06c95c9850d35.png", import.meta.url), mimeType: "image/png", toString}],
    ["104.png", {url: new URL("./files/7fd445bc55b471a1ad870ac7d58a43bf8bbb55a2ca3ccd91a62b9118872b848e9ece6f393429b8a7fd82af41f6f934c1244c4779aee3a5615710ea1517e6134a.png", import.meta.url), mimeType: "image/png", toString}],
    ["28.png", {url: new URL("./files/ecabf33bffa45e44a1229a8eca60ff6c5dff2510b487b5db84325b92d50b000ade209a546dfc310221d8884665549ef28151816fef643280900f4a3a5db48e71.png", import.meta.url), mimeType: "image/png", toString}],
    ["21.png", {url: new URL("./files/cb7dc9fdb0e27aff037c0ebb2bc9926188adb82e47f9e110f55fbfe20708afa6ffa9596c47430b57f1bd6737f37cc7b096f8b33cc98139b75f406655d232dd7c.png", import.meta.url), mimeType: "image/png", toString}],
    ["102.png", {url: new URL("./files/2d7afa96d6eefb06807d4dc3a42c1cc128020281df2797d1317848b3cb34c09f96026c60a4cb49512496d13bb6e1b192a298573027683218497dc7f1568fe7c7.png", import.meta.url), mimeType: "image/png", toString}],
    ["101.png", {url: new URL("./files/3477809e9b259e8b6f7c41769f677ff32f6cb8c38604a46557daf69456de4a372a774241ce8ecd8d52aa312c1672f599cc30db8d15d35dee95335a805e7476a0.png", import.meta.url), mimeType: "image/png", toString}],
    ["103.png", {url: new URL("./files/57335b7f99973da5b3b5e06320428e1ba8ed1dcfeeb1cbc8df682bba2893fd28fd15ff0a4a1dad628f4b988c1006a7a55040d4397615850895a5298c3e016588.png", import.meta.url), mimeType: "image/png", toString}],
    ["22.png", {url: new URL("./files/15dcfbe28d7823d7b1185fddf31d83466b4a7d01ace389be8d89c200c09d6283a0849eaed9706694da76b37afa893067e3a1e14ee5ce5f6326db49c32211e266.png", import.meta.url), mimeType: "image/png", toString}],
    ["24.png", {url: new URL("./files/8a1c4529aba70a0279521f7b49a176415ec41427fc57f3414e62b952508448046f97bc70f9e3713ee121a6abd943aef88c8e0fa729b999eac9f5392988e0c0c9.png", import.meta.url), mimeType: "image/png", toString}],
    ["26.png", {url: new URL("./files/7a00bea8c30d3a03e1fb8677563600a9b9fa0967c8602ab2b86ac2e6037ccc3791139335acb60568314ae333a6c3b11c418cc2896154b8a7be5dc5fcaf6e1290.png", import.meta.url), mimeType: "image/png", toString}],
    ["25.png", {url: new URL("./files/c664fb5af610dc6e74ae1930f69c0b66ea503d6865537c854e1a913c12228a0822cbf7fa4317a082bc38819cbc9a7fb0448ac8fa0a82326186eab6fa9035bf9f.png", import.meta.url), mimeType: "image/png", toString}],
    ["23.png", {url: new URL("./files/6bd41c04e22a99350a2e4e4aae2306f4eba787dad67865d88f6432026deee4a8da897bf2531bd544e4c98addeae5a2697a2d529a066973f21f9bb779b220390e.png", import.meta.url), mimeType: "image/png", toString}],
    ["27.png", {url: new URL("./files/e54ff57b3f5a794c360b696d3a8dfc5942fd4bfecc0a48a108e76eaf0fa6f1270cdd50214505c350382fce772237742f82c748153f3be262a50919aac196264b.png", import.meta.url), mimeType: "image/png", toString}],
    ["403.png", {url: new URL("./files/6851e5f45839cea941c273c4d0e9034b7bd099499bce5f0396f7acb59973abc05bb2ed88ee63ea88c7e07bcdce2a535c17040ea041846780386f2b0057d95fcd.png", import.meta.url), mimeType: "image/png", toString}],
    ["303.png", {url: new URL("./files/85e5866f2651dbfce19d7c9b60d4e9d8cc5338ee5714f1dae22a58c517c48c82f73f18bd577d2eb2d8ff8d17fc60012ecd5bf492595ed0f119803765655c4433.png", import.meta.url), mimeType: "image/png", toString}],
    ["301.png", {url: new URL("./files/52fcc87e41f9ed25cf00eff94c6b59e31a519cb9e14ea46528b33755f0789d814f180f555169165403fd847800fd3dcd0e1c579c736fb446f3d9b793a84a8955.png", import.meta.url), mimeType: "image/png", toString}],
    ["305.png", {url: new URL("./files/c82bf344af85020da9fa8e68dfd9bc9f6adb36acdb87b5bab2e27a95c4523c60f2fe0266db73fee61d38227fd459fd97e2b41f093b85fc99618f62f47d8b632b.png", import.meta.url), mimeType: "image/png", toString}],
    ["312.png", {url: new URL("./files/e4238295de6d92590e8d32b549a4ddbb7b4b3b53a5c82461ade898ce3cc011c7a21b23be2bf0b33fecc6a8c17dac18ceb528ebf51f056614c6c000be92ff85db.png", import.meta.url), mimeType: "image/png", toString}],
    ["304.png", {url: new URL("./files/77e780820b0248fffa2282bdeb231b55940621b5d5c0827b2abb08d9b7f9018aaba3a1b25c0232c3c52c4e3a49fbf8d5fda306efcb525d4118d9221be39110e6.png", import.meta.url), mimeType: "image/png", toString}],
    ["306.png", {url: new URL("./files/c91f3371d3067633ddd848bce3830f140c2010ef3c45446b4356d53092e16a08ec61130f75d0ed9b4ff60bbad40aa06e8597f139819631af82a1a6c5f6ae13cb.png", import.meta.url), mimeType: "image/png", toString}],
    ["302.png", {url: new URL("./files/6bba8d3c585a4c0586e081a2ee2854d237f5ee5555ad51ad6d61e2eee4d7fa1a78642ca54d8ea8c4c4183ec43b9526623a9893b2b4a212db5dc0aa8ea084b1f8.png", import.meta.url), mimeType: "image/png", toString}],
    ["308.png", {url: new URL("./files/3ef38ffe5c899089a5ea84df9919879e1522ed2fe7234fff50232223ebcceaef5c7cf48ad4831144047f73bdde5ae89df52a2a7039e29a12e6c869a06b6678ac.png", import.meta.url), mimeType: "image/png", toString}],
    ["307.png", {url: new URL("./files/eb28af45a2f4139fe76049d3810832cea3f92c30b75edbb129da504073dcf4b489b38c8184c74691fb080991142a395dcc943245ee84aa7728bb5422a1aa6a5f.png", import.meta.url), mimeType: "image/png", toString}],
    ["310.png", {url: new URL("./files/42e7ad85f619934436947e3a15dab7a7ea44bc3e69299232d07e659a081091d21ee9ef849c861495d34e7d64709f066f116ced7861c9c97eb3620a227b68e5b4.png", import.meta.url), mimeType: "image/png", toString}],
    ["309.png", {url: new URL("./files/e3185c5eaa262ffd7205276a28cf61470caad165befb1e13749b861ce0f44f2bc8b46e1644970b54a2dc54e9249f8a0c66711de6aa49661bf4a15a5df17323b2.png", import.meta.url), mimeType: "image/png", toString}],
    ["502.png", {url: new URL("./files/158ac5e5403ca59c80001c3eb03c835c80077c5785878f728563183a74e7ac0d1e1abc1986422716cbff907e81e99d59b7c074f3968fc4a477c3f374929dfdf9.png", import.meta.url), mimeType: "image/png", toString}],
    ["406.png", {url: new URL("./files/ed2974b28b5c57f3ab5d4f34c279e1dcb92c9d3d9259034119784c7f3d8676aadc6303cb34b17bea929b94475c030659fb9620d2dce850da928bd88db0347116.png", import.meta.url), mimeType: "image/png", toString}],
    ["405.png", {url: new URL("./files/7b742758c3fde9fefb1123278d0ffa5b54c15282844ce884837ad4517a56628c3748084a7dc004be3a8f2255dc4295a0cf67b854e9f5b7e411d29621510f9d1c.png", import.meta.url), mimeType: "image/png", toString}],
    ["401.png", {url: new URL("./files/def51c956e7dc66568e18131c0bb8a2d16c1bdd990cc30a051df757dd03e0accdbb71fde4c4db7b0d0f175703bb0a228a3ce64d74a2a8a5bb8e1f1f1b23a80df.png", import.meta.url), mimeType: "image/png", toString}],
    ["210.png", {url: new URL("./files/121df846411374251cc641a4f9ee2d15dbf7e7c4d9cccfe1fd714c1ed43872841bdefa1d0834b0b0e00c886243ab22bbf239e299366b74bcef07f6ff35ad19aa.png", import.meta.url), mimeType: "image/png", toString}],
    ["311.png", {url: new URL("./files/3d690a1a0a71775ed56a53730ae2feec505da5de0ee3103898bdbe946879930fe363d78088946cdd8cb0989127de51d0c6cc095a30694b279750e80abe11aa48.png", import.meta.url), mimeType: "image/png", toString}],
    ["501.png", {url: new URL("./files/f3d6a0762fbde19b3f1610664a684462d5d1ff58849b1dbc93a09ecc753ba25677b27bf3f49d75085ee3268842e96463d3df19f76608e8216f1a5f245cde74cf.png", import.meta.url), mimeType: "image/png", toString}],
    ["313.png", {url: new URL("./files/f257967f92dc95826a70448a1ea044e0227d06e82967e7a6c0f212fb3c1a7bf83ee5cde5d45696b3c8852b2a7fdd3bbe7ff81a232da7964795a1be47d5c86dbf.png", import.meta.url), mimeType: "image/png", toString}],
    ["29.png", {url: new URL("./files/30165cda358c32c86cdec7ab364bd3883c36d896a9fc3a5bdff7814dfaf1199f09974a2bb1d45ad7d54f6f83551fc7bf083e1b6e46b397e69001c6684ac4e11d.png", import.meta.url), mimeType: "image/png", toString}],
    ["402.png", {url: new URL("./files/11c9d4151af71211987208fda02858cdf51327dce3b29fa252e22cc43846dc6959798e10b582a8db71a044d32ff9f083bb53804f343b8708480fd0821397d14d.png", import.meta.url), mimeType: "image/png", toString}],
    ["404.png", {url: new URL("./files/013530b74d395ede4d6a7c10f8cbd5f9bd14e4e3d099d8b2a9678ab514f45071a97204593dcfe06d07f985cf40e90842bae7c517b5c3498b0c75a2b1b4204dc8.png", import.meta.url), mimeType: "image/png", toString}],
    ["314.png", {url: new URL("./files/d8dd750ab13b4f27d767b759ce0cec5fcf299a8ae3d4c7c99e3911d06a502dffb994dc3cf3c0900efc8422a29978297615bf9119fe8abeb3147aae2aae42c3ab.png", import.meta.url), mimeType: "image/png", toString}],
    ["407.png", {url: new URL("./files/7b8b9e295229f0ba3381eca038430a2c1dd7edf7259083a594e7c4edfadb12d6ea43387e5cd32bb77386c4cbac0567fcc617ea194d0ea1b7d7fdc62514344b6b.png", import.meta.url), mimeType: "image/png", toString}],
    ["3.png", {url: new URL("./files/eec66e3374367971b4afc89b4c92dd1b08233bdb7abd4c1a7cfba57b4935d7b31a4d6b0d0da549744ab432384058c84c73feba9f8f0fc4f49cb1e87df89fdb90.png", import.meta.url), mimeType: "image/png", toString}],
    ["5.png", {url: new URL("./files/b26305340e85543c636db86f8dda275c066fe44dcda2d9b5c47c892470c13ad2d7a263a87be42e97b47ee86d75da220ab7dc14d9db772264a09b1ff8848ca09b.png", import.meta.url), mimeType: "image/png", toString}],
    ["4.png", {url: new URL("./files/2de245d1a283c323b886c01ce478528fce996639603e8e86543dfe237bf208a964bd695b5b1e288b1218b29ea7173718b968dbc6d076270da20bd6699ba5bcb4.png", import.meta.url), mimeType: "image/png", toString}],
    ["2.png", {url: new URL("./files/b24ccf6d0bb612bbec3e78b4f2c2ab196ea8e1701d8c058583ee3cfd7fd1aafba8bd313427783f8e5256abf9bb0349077967e77b8d0412120d63a37c7bf877b3.png", import.meta.url), mimeType: "image/png", toString}],
    ["6@1.png", {url: new URL("./files/b7cedb5ceda3ded526b73fe92b09bfaf2e6bd55cf80e7dd8977146fd5bd0d56bd647d5aa413ae3020f829d61a5fbc168e08f59b1b3eb54cc38f9515903e65021.png", import.meta.url), mimeType: "image/png", toString}],
    ["8@1.png", {url: new URL("./files/a34584d8963a7aab2ccd813294f868d5498a6bbe875c99d0a7d8faff1caaa926eb2f1855e23f835403773cd155c23dda9fcb50a42337256e6d03cd140ba78d7e.png", import.meta.url), mimeType: "image/png", toString}],
    ["211.png", {url: new URL("./files/1ebb2ca71dbda66a885c9f5264db7bce487d5969fc7fe172988f73f1963303c99cfb3a944d4e530da000ba1adfa07ba9c7bc776eeaa5f9278ba2e1fb70ad9a65.png", import.meta.url), mimeType: "image/png", toString}],
    ["7@2.png", {url: new URL("./files/955f7de48059184be2326b24a798c84911674646a8f250bc0b76962f7decc8c1cd10689ad2cfd820beeaad59de5ca4d1cf6d2a8e763bd14150654c60abbb3fda.png", import.meta.url), mimeType: "image/png", toString}],
    ["fastestAPI.gif", {url: new URL("./files/6fa4802a7427fe2a687ab88480764d54e60ed0ad0eccb97ba669f1fb0655a5037b59c65f898c055d35f3d3e4db403c6a9b607622bc1d2c7cfc32559def142250.gif", import.meta.url), mimeType: "image/gif", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","FileAttachment"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("handler")).define("handler", ["deploy"], _handler);
  main.variable(observer()).define(["md","handler"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof smithying")).define("viewof smithying", ["md"], _smithying);
  main.variable(observer("smithying")).define("smithying", ["Generators", "viewof smithying"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","DOM","gif"], _11);
  main.variable(observer("frames")).define("frames", ["smithying","FileAttachment"], _frames);
  main.variable(observer("gif")).define("gif", ["GIF","frames"], _gif);
  const child2 = runtime.module(define2);
  main.import("GIF", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _16);
  return main;
}
