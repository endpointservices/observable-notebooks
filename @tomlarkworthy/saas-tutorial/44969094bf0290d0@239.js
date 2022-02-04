// https://observablehq.com/@tomlarkworthy/stripe@239
import define1 from "./c0de6bf6c2f598ef@62.js";
import define2 from "./11a5ab8b1b3a51db@1160.js";
import define3 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image.png",new URL("./files/d2291fca6f0a38ea571b9f33081ca3828ce8a42a7776e0a96035010d3baa32299ac0a431254ae9878e5ce375fece5bd9eabf78f95c69e73e233980dd9d5b595d",import.meta.url)],["image@2.png",new URL("./files/c25d41401350688d91c30fa6767d41f85da5d31564e5f6431e2807e58a4ae88ad5dc8555c69d671799928c024a6cdaad6cf30e52a4217499d1846971b9cb9143",import.meta.url)],["nod.webp",new URL("./files/12686c544224553104fbc1c583cf30ea8337f52a72456e453d941b175d5c98779331d80f3154a748c1dafbe015ab6727a3b010349a0e27f40dc24cba0d46f04e",import.meta.url)],["pexels-alexander-mils-2068975.jpg",new URL("./files/9180739b77e99dc0d5b650d08d5c0080198d1fe903d90f73940ced64539518f88acd7571d2e59083a0cc38612313d367b35e2b666cb06e1e99f12fddc14ae611",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html","md","location","FileAttachment"], async function(html,md,location,FileAttachment){return(
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
)});
  main.variable(observer()).define(["html","stripe"], function(html,stripe){return(
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
)});
  main.variable(observer()).define(["html","FileAttachment"], async function(html,FileAttachment){return(
html `<img src="${await FileAttachment("pexels-alexander-mils-2068975.jpg").url()}"/><p>Photo by Alexander Mils from Pexels</p>`
)});
  main.variable(observer()).define(["html","FileAttachment"], async function(html,FileAttachment){return(
html `<img src="${await FileAttachment("image.png").url()}"/>`
)});
  main.variable(observer()).define(["html","FileAttachment"], async function(html,FileAttachment){return(
html`<img src="${await FileAttachment("image@2.png").url()}"/>`
)});
  main.variable(observer("Stripe")).define("Stripe", ["require"], function(require){return(
require('https://js.stripe.com/v3/').then(() => window["Stripe"]).catch(() => window["Stripe"])
)});
  main.variable(observer("STRIPE_API_KEY")).define("STRIPE_API_KEY", function(){return(
"pk_live_51HbQzcHGNosi6Ft0JM18AKCtG3cIs707E1ft1B5ePvpptHb5yoLnXHXLWkyBbDjHgtlPMOT0233jrcfvWAGj6AYp00RxIZdaky"
)});
  main.variable(observer("stripe")).define("stripe", ["Stripe","STRIPE_API_KEY"], function(Stripe,STRIPE_API_KEY){return(
Stripe(STRIPE_API_KEY)
)});
  main.variable(observer()).define(["bulma"], function(bulma){return(
bulma
)});
  const child1 = runtime.module(define1);
  main.import("bulma", child1);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
