import define1 from "./c0de6bf6c2f598ef@62.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./dfdb38d5580b5c35@351.js";

function _1(html){return(
html`<h1>Pause and Play book`
)}

function _2(location,html)
{
  if (location.search == "?success") {
    return html`<div class="content"><h1>Thank you!!!`
  } else return html` `
}


async function _3(html,FileAttachment){return(
html`<center><img width="600" src=${await FileAttachment("pauseandplay.jpg").url()}>`
)}

function _4(md){return(
md`## Ensure you have talked to the author to arrange delivery before purchasing`
)}

function _5(html,location,stripe){return(
html`<center>${location.search != "?success" ? html`
  <button class="button is-primary"
          onclick=${() => { 
  stripe.redirectToCheckout({
    lineItems: [{
      price: 'price_1Hzps5HGNosi6Ft0NRhFBcVZ', // ID of your price
      quantity: 1,
    }],
    mode: 'payment',
    successUrl: 'https://observablehq.com/@tomlarkworthy/pause-and-play-book?success',
    cancelUrl: 'https://observablehq.com/@tomlarkworthy/pause-and-play-book?cancel',
  });
}}>Buy Pause and Play activites book 13 EUR</button></center>`: null}`
)}

function _6(html){return(
html`<div class="content"><h3> Get a discount if you buy one for a freind.</h3>`
)}

function _7(html,location,stripe){return(
html`<center>${location.search != "?success" ? html`
  <button class="button is-primary"
          onclick=${() => { 
  stripe.redirectToCheckout({
    lineItems: [{
      price: 'price_1IA0TNHGNosi6Ft0HtAb2qOz', // ID of your price
      quantity: 1,
    }],
    mode: 'payment',
    successUrl: 'https://observablehq.com/@tomlarkworthy/pause-and-play-book?success',
    cancelUrl: 'https://observablehq.com/@tomlarkworthy/pause-and-play-book?cancel',
  });
}}>Buy Two Pause and Play activites books 20 EUR</button></center>`: null}`
)}

function _8(md){return(
md`
.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.

.


`
)}

function _9(html){return(
html`<div class="content"><h2>Ignore everything below `
)}

function _Stripe(require){return(
require('https://js.stripe.com/v3/').then(() => window["Stripe"]).catch(() => window["Stripe"])
)}

function _STRIPE_API_KEY(){return(
"pk_live_51HbQzcHGNosi6Ft0JM18AKCtG3cIs707E1ft1B5ePvpptHb5yoLnXHXLWkyBbDjHgtlPMOT0233jrcfvWAGj6AYp00RxIZdaky"
)}

function _stripe(Stripe,STRIPE_API_KEY){return(
Stripe(STRIPE_API_KEY)
)}

function _13(bulma){return(
bulma
)}

function _17(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["pauseandplay.jpg", {url: new URL("./files/e9ce088d2b6c5bb2782e346422213970e1df1f1a4d110f7dbd61760206e45b760101e3f73249edb59b239152b5df1a0ff6688fa9602491ac91afa7405edb43d2.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html"], _1);
  main.variable(observer()).define(["location","html"], _2);
  main.variable(observer()).define(["html","FileAttachment"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["html","location","stripe"], _5);
  main.variable(observer()).define(["html"], _6);
  main.variable(observer()).define(["html","location","stripe"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["html"], _9);
  main.variable(observer("Stripe")).define("Stripe", ["require"], _Stripe);
  main.variable(observer("STRIPE_API_KEY")).define("STRIPE_API_KEY", _STRIPE_API_KEY);
  main.variable(observer("stripe")).define("stripe", ["Stripe","STRIPE_API_KEY"], _stripe);
  main.variable(observer()).define(["bulma"], _13);
  const child1 = runtime.module(define1);
  main.import("bulma", child1);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _17);
  return main;
}
