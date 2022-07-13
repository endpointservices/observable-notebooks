// https://observablehq.com/@tomlarkworthy/stripe@240
import define1 from "./c0de6bf6c2f598ef@62.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./58f3eb7334551ae6@211.js";

async function _1(html,md,location,FileAttachment){return(
html`
<div class="content">${md`
# Stripe

You can do one time payments without a server! Stripe is all you need to collect a shipping address and get realtime notification sent to your phone. On the forum is a discussion on how Observable + Stripe can do [e-retail](https://talk.observablehq.com/t/e-commerce-on-observable-stem-books-for-kids/4555/3). A production shop is [here](https://observablehq.com/@pauseandplay/shop).

~~~js
import {Stripe} from "@tomlarkworthy/stripe" 
~~~

~~~js
stripe = Stripe("<API_KEY>")
~~~

Read the real docs and setup an account on [stripe.com](https://stripe.com/docs/payments/checkout/client). Look at the demo button below, click it and see what happens...   
`}

${location.search == "?success"? html`
<center>
<h1>Thanks for the Coffee!</h1>
<img src="${await FileAttachment("nod.webp").url()}"/>
</center>
`:null}

</div>



`
)}

function _2(html,stripe){return(
html`<center>
  <button class="button is-primary"
          onclick=${() => { 
  stripe.redirectToCheckout({
    lineItems: [{
      price: 'price_1He4G9HGNosi6Ft0RInpHMHu', // ID of your price
      quantity: 1,
    }],
    mode: 'payment',
    successUrl: 'https://observablehq.com/@tomlarkworthy/stripe?success',
    cancelUrl: 'https://observablehq.com/@tomlarkworthy/stripe?cancel',
  });
}}>☕ Buy Tom a coffee...</button></center>`
)}

async function _3(html,FileAttachment){return(
html `<img src="${await FileAttachment("pexels-alexander-mils-2068975.jpg").url()}"/><p>Photo by Alexander Mils from Pexels</p>`
)}

async function _4(html,FileAttachment){return(
html `<img src="${await FileAttachment("image.png").url()}"/>`
)}

async function _5(html,FileAttachment){return(
html`<img src="${await FileAttachment("image@2.png").url()}"/>`
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

function _9(bulma){return(
bulma
)}

function _13(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/d2291fca6f0a38ea571b9f33081ca3828ce8a42a7776e0a96035010d3baa32299ac0a431254ae9878e5ce375fece5bd9eabf78f95c69e73e233980dd9d5b595d.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/c25d41401350688d91c30fa6767d41f85da5d31564e5f6431e2807e58a4ae88ad5dc8555c69d671799928c024a6cdaad6cf30e52a4217499d1846971b9cb9143.png", import.meta.url), mimeType: "image/png", toString}],
    ["nod.webp", {url: new URL("./files/12686c544224553104fbc1c583cf30ea8337f52a72456e453d941b175d5c98779331d80f3154a748c1dafbe015ab6727a3b010349a0e27f40dc24cba0d46f04e.webp", import.meta.url), mimeType: "image/webp", toString}],
    ["pexels-alexander-mils-2068975.jpg", {url: new URL("./files/9180739b77e99dc0d5b650d08d5c0080198d1fe903d90f73940ced64539518f88acd7571d2e59083a0cc38612313d367b35e2b666cb06e1e99f12fddc14ae611.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html","md","location","FileAttachment"], _1);
  main.variable(observer()).define(["html","stripe"], _2);
  main.variable(observer()).define(["html","FileAttachment"], _3);
  main.variable(observer()).define(["html","FileAttachment"], _4);
  main.variable(observer()).define(["html","FileAttachment"], _5);
  main.variable(observer("Stripe")).define("Stripe", ["require"], _Stripe);
  main.variable(observer("STRIPE_API_KEY")).define("STRIPE_API_KEY", _STRIPE_API_KEY);
  main.variable(observer("stripe")).define("stripe", ["Stripe","STRIPE_API_KEY"], _stripe);
  main.variable(observer()).define(["bulma"], _9);
  const child1 = runtime.module(define1);
  main.import("bulma", child1);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _13);
  return main;
}
