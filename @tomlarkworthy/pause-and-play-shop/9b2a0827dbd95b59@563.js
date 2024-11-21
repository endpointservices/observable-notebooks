import define1 from "./c0de6bf6c2f598ef@62.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";

function _1(html){return(
html`<div class="content">
<h1> Pause and Play STEM Activities Book</h1>
<p style="max-width: 100%;">
Hey! I am a stay at home mum of twins, previously a scientist. I wrote a book for young kids (ages 3–7). The book has simple, graphical instructions on how to set up and play with science activities at home. It allows young children, even without reading skills to decide which science activity they want to explore & to prepare & play with the activities independently. Every science activity is linked to a QR code with an engaging Youtube video from <a href="https://www.youtube.com/channel/UCpL1E-yK38HGsNaIfVPdc8w">my channel</a>. The videos offer further insights into the activities through a different types of media. Our science activities only use household items aiming for minimal preparations. The book also includes suggestions on how to extend the activities and kid-friendly scientific explanations. By combining this print book, our Youtube videos, and minimal parental support, we create a holistic, real-life experience allowing young kids to choose, play, and learn science.
</p>
`
)}

function _2(location,html)
{
  if (location.search == "?success") {
    return html`<div class="content"><h1>Thank you for your support!!!`
  } else return html` `
}


async function _3(html,FileAttachment){return(
html`<center><img width="600" src=${await FileAttachment("pauseandplay.jpg").url()}>`
)}

function _4(html){return(
html`<div class="content">
<h4> You try it out. The full book is availible as a <a href="https://www.dropbox.com/s/0z8p8yb533pz0vc/Book_Nov21_PageCorrection%20copy.pdf?dl=0">pdf</a>.</h4>
`
)}

function _5(html,api){return(
html`<div class="content">
<h2> Live outside the EU?</h2>

You can get the book through <a href="https://geni.us/0vWW">Amazon</a>.

<h2> Live inside the EU?</h2>

${api.inStock() ? html`We have books in stock that we can mail directly. You can also buy from <a href="https://geni.us/0vWW">Amazon</a>.`: 
                  html`Sorry, we are out of stock for direct mail, but you can also buy from <a href="https://geni.us/0vWW">Amazon</a>.`}



`
)}

function _6(html,location,api){return(
html`<center>${location.search != "?success" && api.inStock()? html`
  <button class="button is-primary"
          onclick=${() => api.buy('price_1Hzps5HGNosi6Ft0NRhFBcVZ')}>
    Buy 1 Pause and Play activity book for 13 EUR
  </button>
  <br><br>
  <button class="button is-primary"
          onclick=${() => api.buy('price_1IA0TNHGNosi6Ft0HtAb2qOz')}>
    Buy 2 Pause and Play activites books 20 EUR
  </button>
</center>`: null}`
)}

function _7(md){return(
md`<pre>
























</pre>
`
)}

function _8(html){return(
html`<div class="content"><h2>Ignore everything below `
)}

function _api(stripe){return(
{
  inStock () {return true},
  buy (code) {
    stripe.redirectToCheckout({
      lineItems: [{
        price: code,
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: 'https://observablehq.com/@tomlarkworthy/pause-and-play-book?success',
      cancelUrl: 'https://observablehq.com/@tomlarkworthy/pause-and-play-book?cancel',
      shippingAddressCollection: {
        allowedCountries: ["BE","GR","LT","PT","BG","ES","LU","RO","CZ","FR","HU","SI","DK","HR",
                           "MT","SK","DE","IT","NL","FI","EE","CY","AT","SE","IE","LV","PL"]
      }
    });
  },
}
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
  main.variable(observer()).define(["html"], _4);
  main.variable(observer()).define(["html","api"], _5);
  main.variable(observer()).define(["html","location","api"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["html"], _8);
  main.variable(observer("api")).define("api", ["stripe"], _api);
  main.variable(observer("Stripe")).define("Stripe", ["require"], _Stripe);
  main.variable(observer("STRIPE_API_KEY")).define("STRIPE_API_KEY", _STRIPE_API_KEY);
  main.variable(observer("stripe")).define("stripe", ["Stripe","STRIPE_API_KEY"], _stripe);
  main.variable(observer()).define(["bulma"], _13);
  const child1 = runtime.module(define1);
  main.import("bulma", child1);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  return main;
}
