// https://observablehq.com/@tomlarkworthy/saas-tutorial@953
import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./84e66f78139ac354@829.js";
import define4 from "./44969094bf0290d0@240.js";
import define5 from "./1bef71e497eda5fc@189.js";
import define6 from "./293899bef371e135@293.js";

function _1(html,md){return(
html`<div class="content">${md`
# Ridiculously Rapid Software-as-a-Service (SaaS) development with Observable, Firebase and Stripe

Despite Observable being targeted at the visualization community, I find the rapid feedback and reactive model a delight to work with, and, a huge productivity booster. So much, in fact, that I have started building customer facing software with it. My productivity is boosted because there are __no toolchains or deployment steps__ interrupting me. If I am unsure of the behaviour of the program, I can open a cell and play, immediately. I can iteratively refactor, right in the browser, without context switches. It is magical. It's applied [*Bret Victor*](http://worrydream.com/ExplorableExplanations/), FFS.

In short, Observable is an amazing tool for trying out ideas, including, business ideas. 👀

As it turns out, it is possible to make money, right inside Observable. In this tutorial, I will walk you through the bare essentials fo building a SaaS product. __*Login, persisting customer data, security, implementing a backend, periodic jobs and charging money*__. As will also share my low effort tips to __make things pretty, easily build UIs__ and some help hiding Observable's warts when building SaaS.

<center><img width="70%" src="https://media.giphy.com/media/26BRzQS5HXcEWM7du/giphy.gif"></img></center>
`}</div>`
)}

async function _2(html,md,FileAttachment){return(
html`<div class="content">${md`
## Setup Firebase
We will need Firebase for login and backend services. Create a Firebase account at http://console.firebase.google.com

You will need to create a Web App and grab a copy of its *Project Settings* from the *Settings* menu. It will look something like this:

<center><img width="70%" src=${await FileAttachment("image.png").url()}></img></center>

If you drop the const, and the object with \( \) you can copy and paste into Observable. You will need to add an additional "uiConfig" block for login customization
`}</div>`
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  databaseURL: "https://endpointservice.firebaseio.com",
  projectId: "endpointservice",
  storageBucket: "endpointservice.appspot.com",
  messagingSenderId: "1986724398",
  appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
  uiConfig: {
    // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["google.com", "facebook.com", "phone", "anonymous"]
  }
}
)}

function _note_api_keys(md){return(
md`
*sidenote: Unlike some APIs, Firebase API Keys are not [secrets](https://twitter.com/tomlarkworthy/status/1329365181907005440).* (thanks [@oleksandr_now](https://twitter.com/oleksandr_now))
`
)}

function _5(html,md){return(
html`<div class="content">${md`
## Customer Signin

It is useful for customers to be able to signin to your service using existing identity providers. You will need to enable the signing methods you want within the Firebase console, and place the signin for using an Observable wrapper for *[FirebaseUI](https://firebase.google.com/docs/auth/web/firebaseui)*. 

Import the FirebaseUI *viewof* into your notebook but redirect it *firebaseConfig* dependency we setup earlier in the hosting notebook
`}</div>`
)}

function _7(html,md){return(
html`<div class="content">${md`

Next we place the component somewhere in our notebook as a UI control to a user variable. 
`}</div>`
)}

function _exampleUI($0){return(
$0
)}

function _9(html,md){return(
html`<div class="content">${md`
The FirebaseUI component embraces the reactive programming model of Observable, __the user variable is not resolved until a user signs in__. This means you can have cells depend on the user variable and they are not evaluated until the user logs in. An important user field is the *uid*. Note the following cell does not display a UID until you login.
`}</div>`
)}

function _uidExample(user){return(
`Your uid is ${user.uid}`
)}

async function _11(html,md,FileAttachment){return(
html`<div class="content">${md`
You will need to register apps and OAuth 2.0 domains for each login provider. Instructions are in the [Firebase Authentication Web documentation](https://firebase.google.com/docs/auth/web/start). Under the hood, Observable serves cells from the domain. You often need to allowlist this domain in the configuration of identity providers 

    <identity>.static.observableusercontent.com'

Configuring Google login is very easy as it can be done from within the Firebase console in the \`authentication/providers\` settings.

![Autherorized domain](${await FileAttachment("image@1.png").url()})
`}</div>`
)}

function _12(html,md){return(
html`<div class="content">${md`
## Persisting Customer Data

To safely store customer data, we need a database. There are some additional tools in [firebase](https://observablehq.com/@tomlarkworthy/firebaseui) to help combining Firestore wih Observable.
`}</div>`
)}

function _14(html,md){return(
html`<div class="content">${md`

*firebase* is the core SDK which can do many things. *DocView* and *DocsView* are helpers for creating reactive views of Firestore documents and query results.

To shorten the amount of typing I do I usually map the variable *db* to the Firestore service.
`}</div>`
)}

function _db(firebase){return(
firebase.firestore()
)}

function _16(html,md){return(
html`<div class="content">${md`
## Reading data

We can bind a Firestore location, or query, to an Observable cell value, which will update in realtime, if that location is written to.
`}</div>`
)}

function _msgs(listen,db){return(
listen(
  db.collection("apps").doc("saas").collection("msgs").limit(5).orderBy("time", "desc")
)
)}

function _18(html,md){return(
html`<div class="content">${md`
The returned value of a listen (e.g. *msgs*) is an array of normal Javascript objects. The contents will update to all writes made locally or by other users.
`}</div>`
)}

function _msgsAsString(msgs){return(
JSON.stringify(msgs.map(entry => entry.msg).reverse(), null, 2)
)}

function _20(html,md){return(
html`<div class="content">${md`
## Writing data

We can use Firestore SDK to perform writes imperatively whenever we need to.
~~~js
db.collection("collection").doc("doc").set({...})
~~~

For our demo we will create a mini chat interface. To make it easy to bind functions to HTML, we use the amazing [hypertext literal](/@observablehq/htl) from Observable. To ensure the UI tracks state across renders we use a react-like reconciliation algorithm.
`}</div>`
)}

function _23(html,md,msgs){return(
html`<div class="content">${md`
Now we can create a simple input that saves the text into the *msgs* collection when enter is pressed. 

Note how the view automatically updates, and everything dependent on it does too. Thanks to Firestore latency compensation the local view updates instantly without a network call, leading to highly responsive interfaces. The last message was __*"${msgs[0].msg}"*__.

Try it out...
`}</div>`
)}

function _ui(db,firebase,reconcile,html,msgs)
{
  async function sendMsg(evt) {
    if (evt.keyCode === 13) {
      await db
        .collection("apps")
        .doc("saas")
        .collection("msgs")
        .add({
          time: firebase.firebase_.firestore.FieldValue.serverTimestamp(),
          msg: evt.target.value
        });
    }
  }
  return reconcile(
    this,
    html`
    ${msgs.map(entry => html`<p>${entry.msg}</p>`).reverse()}
    <input class="text" onkeydown=${sendMsg}></input> <-- enter text`
  );
}


function _25(html,md){return(
html`<div class="content">${md`

Note how you can open another browser on another devices and see the results! Also the reactive updates works with the data admin console at https://console.firebase.google.com data viewer too!

## Security

The chat demo relies on public read and write access being granted to the \`/apps/saas/msgs/<msgid>\` location in Firestore Rules. By default Firestore won't allow this, you have to grant an exception. The rules to enable the demo looks like as follows:
~~~js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /apps/saas/msgs/{entry_id} {
      allow read: if request.query.limit <= 10;
      allow write: if isValid(request.resource.data)
      function isValid(entry) {
        return entry.keys().hasOnly(["time", "msg"])
          && entry.msg is string
          && entry.msg.size() < 100
          && entry.time == request.time
      }
    }
  }
}
~~~
which grants everyone read access if they are fetching less than 10 rows, and provides write access provided the data is structured correctly.

Billing is a function of data transferred. Thus, I want to protect myself from having a huge build up of messages and someone accidentally downloading them all when fiddling with the notebook :) This is an especially acute problem on a public endpoint like this. Hence, I put that the query limit on read access, bounding the amount of messages that can be downloaded in one go. (Firestore also bills by documents written but the potential impact does not scale with history)

## Private data

Our mini chat demo we implemented with publicly readable data. You can store private data too with access checks based on the user's uid. This value is available in the notebook as user.uid which will only become available after the user logs in using their identity provider. You can grant read/write access to a customer document in the rules as follows:- 

~~~js
...
  match /customers/{uid} {
    allow read, write: if request.auth.uid == uid;
  }
...
~~~

There are many more examples in the Firestore Rules [documentation](https://firebase.google.com/docs/firestore/security/rules-conditions) 
`}</div>`
)}

function _26(html,md){return(
html`<div class="content">${md`
## Adding a Backend API

You can achieve a lot in the front end in Observable, but not everything. __*Integration with 3rd party services, private code, secrets and periodic jobs*__ are best suited to backend implementation. __*Firebase Functions for Firebase*__ can cover these use-cases. It's especially easy to add due to Authentication and Firestore features.

You can quickly setup the development environment using the Firebase CLI and npm. See the [quick start](https://firebase.google.com/docs/functions/get-started).

~~~js
npm install -g firebase-tools
firebase login
firebase init functions
~~~

The backend is deployed at the commandline with 

~~~js
firebase deploy --only functions
~~~

Deployment can be quite slow, for anything non-trivial use the [Firebase emulator](https://firebase.google.com/docs/emulator-suite) to test locally first.

~~~js
firebase emulators:start
~~~

`}</div>`
)}

function _27(html,md){return(
html`<div class="content">${md`
### Calling Remote Backend Functions

An Observable notebook can call a named private backend method using the Firebase functions service. It is very simple to pass in a JSON and get a response JSON out.

~~~js
const result = await firebase.app().functions("europe-west1").httpsCallable("api")({
    ...
   });
~~~

The backend has to define the named \`onCall\` handler

~~~js
exports.api = functions.region("europe-west1").https
  .onCall(async (data, context) => {
    const uid = context.auth.uid;
    console.log(\`\${JSON.stringify(data)}\`);
    return asyncHandler(data, uid);
  });
~~~

See the [callables](https://firebase.google.com/docs/functions/callable) documention
`}</div>`
)}

function _28(html,md){return(
html`<div class="content">${md`
### Periodic work

You can do periodic work too using Cloud Scheduler Pubsub notifications

~~~js
exports.per_day = functions.region("europe-west1").pubsub.schedule('every 1 days')
  .onRun(async (context) => {
    const work = [];
    ...
    return await Promise.all(work);
  });
~~~

See the [scheduling functions](https://firebase.google.com/docs/functions/schedule-functions) documentation.
`}</div>`
)}

function _29(html,md){return(
html`<div class="content">${md`
### On Firestore Writes

Because the latency compensation of Firestore matches with Observables, I have, over time, found I prefer triggering backend work via document writes to the Firestore database.

A Firestore write function will execute serverside Javascript when documents are mutated, e.g. by the Observable frontend. The nice thing about initiating the work like this in front end, is that the intent to mutate a document is reflected on the client side instantly. This can be used to simplify or remove the need for [spinners](https://uxdesign.cc/stop-using-a-loading-spinner-theres-something-better-d186194f771e).
~~~js
exports.msgWrite = functions.region("europe-west1").firestore
  .document('apps/saas/msgs/{entry}')
  .onWrite(async (change, context) => {
    if (!change.after.exists) {
      // Deleting
    } else if(!change.before.exists) { 
      // Creating
    } else { 
      // Updating
    }
  });
~~~
`}</div>`
)}

async function _30(html,md,FileAttachment){return(
html`<div class="content">${md`
## Making Money with Stripe

You're not a business until customers give you money. Luckily even this step is very simple thanks to the great work of Stripe. First you need to create an account at https://dashboard.stripe.com/register

We will be using Stripe Checkout, find the full details on [Stripe's website](https://stripe.com/docs/payments/checkout).

You need to grab your public API key

![Stripe Key UI](${await FileAttachment("image@2.png").url()})

And you need this to initialize a Stripe SDK wrapper for Observable.



`}</div>`
)}

function _stripe(Stripe){return(
Stripe("pk_live_51HbQzcHGNosi6Ft0JM18AKCtG3cIs707E1ft1B5ePvpptHb5yoLnXHXLWkyBbDjHgtlPMOT0233jrcfvWAGj6AYp00RxIZdaky")
)}

async function _33(html,md,FileAttachment){return(
html`<div class="content">${md`
### Unverified Payments 

For very simple use cases like collecting a donation, you don't need to do very much. You just need to add a product in the Stripe interface and make note of its *price code*.

![Stripe product config](${await FileAttachment("image@3.png").url()})

The price code is used in a widget attached to a button to trigger the checkout process for that item. It's *that* simple:

`}</div>`
)}

function _buy(html,stripe){return(
html`<center>
  <button class="button is-primary" onclick=${() => { 
      stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1He4G9HGNosi6Ft0RInpHMHu', // ID of your price
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: 'https://observablehq.com/@tomlarkworthy/stripe?success',
        cancelUrl: 'https://observablehq.com/@tomlarkworthy/saas-tutorial#buy',
      });
    }}>
    ☕ Buy Tom a coffee...
  </button>
</center>`
)}

async function _35(html,md,FileAttachment){return(
html`<div class="content">${md`
### Acting on Payments 

Probably the more common case is you want to *do* something in exchange for someone giving you money. This is a little bit more involved to setup, but with combined with Firebase Functions it can be achieved relatively painlessly. The idea is that Stipe will contact the backend directly after payment is confirmed through webhooks hitting Firebase Functions.


#### Add a webhook to Stripe and register for events

At a minimum you need to register a webhook with Stripe and request notifications for two events. One event is called when the basket finalizes, and the other fires when payment is finalized. You configure these at https://dashboard.stripe.com/webhooks.

<center><img width="50%" src=${await FileAttachment("image@4.png").url()}></img></center>

To save myself some effort when in MVP mode, I generate a really long ID to be my webhook URL, and keep it a secret.

#### Acting on Stripe Events 

The webhook is implemented as an express app in its own file. We have two handlers:

  - *handleSessionCheckoutCompleted* is notified from Stripe when the [checkout session](https://stripe.com/docs/api/checkout/sessions) is finalized. We persist that session payload to Firestore keyed by the *payment_intent* id for use later.
  - *handlePaymentIntentSucceeded* fires when payment is confirmed. We can pull the session data back out of Firestore using the *payment_intent* id.

~~~js
// stripe.js
const app = require('express')();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const db = admin.firestore();

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
    let event = request.body;
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
            await handlePaymentIntentSucceeded(event.data.object);
            break;
            case 'checkout.session.completed':
            await handleSessionCheckoutCompleted(event.data.object);
            break;
            default:
                throw Error(\`Unhandled event type \${event.type}\`);
        }
        // Return a response to acknowledge receipt of the event
        response.json({received: true});
    } catch (err) {
        response.status(500).send({message: err.message});
    }
});

async function handleSessionCheckoutCompleted(session) {
    // https://stripe.com/docs/api/checkout/sessions
    await db.collection("paymentSessionsByIntent").doc(session.payment_intent).set(session);
}

async function handlePaymentIntentSucceeded(paymentIntent) {
    // https://stripe.com/docs/api/payment_intents/object
    ({amount, currency, id} = paymentIntent);
    const session = (await db.collection("paymentSessionsByIntent").doc(id).get()).data();
    ({client_reference_id} = session);
    ...
}
exports.stripeHandler = app;
~~~


The session object contains the *client_reference_id* which can be set in the front end. For instance, it can be set as the *user.uid* allowing us to figure out *who* purchased the items in terms Firebase understands. Thus in the handler of *handlePaymentIntentSucceeded* we can piece together that 
- payment is confirmed and the amount spent
- who made the purchase (user.uid in the client_reference_id)
- a link to the checkout contents (via line_items in session)

We can achieve all this without actually using the serverside Stripe API or using Stripe secrets. However, when you want to expand the *line_items* you will need to make authenticated calls with the Stripe Backend and complexity goes up.

#### Attach Stripe handler to Functions Webhook

The security of the webhook hinges on using an unguessable URL for the Stripe to Firebase integration.

~~~js
exports.<RANDOM_URL> = functions.region("europe-west1").https.onRequest(require("./stripe").stripeHandler);
~~~

This is 'ok' for MVPs. The risk is that users will discover the URL somehow and get free things. The obvious next level of security would be using a Stripe supplied [signing key](https://stripe.com/docs/webhooks/signatures) to authenticate the inbound webhooks. You can store the secret in [Google Secret Manager](https://cloud.google.com/secret-manager). All Firebase projects are also Google Cloud Projects, so this is a useful and easily available technology.

#### Create product chooser

For simple services where users buy credit you don't need line items. Here is a simple interface that allows customers to purchase credit. 

`}</div>`
)}

function _buyCredit(stripe,user,html)
{
  function buy(price) {
    stripe.redirectToCheckout({
      lineItems: [{ price: price, quantity: 1}],
      mode: 'payment',
      successUrl: `https://observablehq.com/@tomlarkworthy/minecraft-servers`,
      cancelUrl: `https://observablehq.com/@tomlarkworthy/saas-tutorial#buyCredit`,
      clientReferenceId: user.uid,
      customerEmail: user.email,
    })
  }
  return html`
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <span class="select">
          <select id="product_choice">
            <option value="price_1HeSBJHGNosi6Ft0qX1mdn61">€5</option>
            <option value="price_1HeSBJHGNosi6Ft0Dr3APW9w">€10</option>
            <option value="price_1HeSBJHGNosi6Ft0KGlUEjwz">€20</option>
            <option value="price_1HeSBJHGNosi6Ft0z0fiZAnq">€50</option>
          </select>
        </span>
      </p>
      <p class="control">
        <button class="button is-primary"
          onclick=${() => buy(document.getElementById("product_choice").value)}>
          Buy more credit
        </button>
      </p>
    </div>
  `
}


function _37(html,md){return(
html`<div class="content">${md`
# And That's how you SaaS in Observable!

The combination of Observable, Firebase and Stripe is amazing. It took me about 3 weeks of spare time to build [Minecraft hosting](https://observablehq.com/@tomlarkworthy/minecraft-servers) for families. 

<center><img width="50%" src="https://media.giphy.com/media/rvsIuQkF1iL3G/giphy.gif"></img></center>

The beauty of Observable is people can see how things are implemented by expanding the cells. So please feel free to take a look around in the [product](https://observablehq.com/@tomlarkworthy/minecraft-servers) to see a fully featured example in action. Of particular interest is creating an __*onboarding process, invites, auto-creating usernames and detecting when a user is not logged in*__ *etc.*

One unavoidable issue with building SaaS in Observable is that it soon becomes overloaded with ugly import statements. These can be a real turnoff to non-technical users. To alleviate this issue, the public facing [Minecraft hosting notebook](https://observablehq.com/@tomlarkworthy/minecraft-servers) imports everything from a hidden [backend notebook](https://observablehq.com/@tomlarkworthy/minecraft-servers-be) in a single line. This greatly reduces the import sprawl.

BTW, I was one of the original Firebase Realtime Database engineers before Google acquired Firebase. I joined Firebase in 2014 because I could see it was a *much* better way of developing backend services. I get exactly the same feeling with Observable. Observable, to me, is the missing front end piece to Firebase. They both radically emphasize the UX of development, and the ergonomics of reactivity. They pair *really* well for building services. I tried my best to combine them both in [firebaseui](https://observablehq.com/@tomlarkworthy/firebaseui). The [DocsView](https://observablehq.com/@tomlarkworthy/firebaseui#DocsView) component is a very nice abstraction that bridges these two worlds quite nicely in my opinion.

If you enjoyed this article, please share it, like it or discuss it, or, Lol, buy me a coffee! Even better, use the knowledge to build something magnificent!
`}</div>`
)}

function _buy2(html,stripe){return(
html`<center>
  <button class="button is-primary" onclick=${() => { 
      stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1He4G9HGNosi6Ft0RInpHMHu', // ID of your price
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: 'https://observablehq.com/@tomlarkworthy/stripe?success',
        cancelUrl: 'https://observablehq.com/@tomlarkworthy/saas-tutorial#buy',
      });
    }}>
    ☕ Buy Tom a coffee...
  </button>
</center>`
)}

function _39(html,md){return(
html`<div class="content">${md`
Cheers! have a poke around at some of my other Observable experiments as well, I have quite a collation of [apps](https://observablehq.com/collection/@tomlarkworthy/apps) and [libraries](https://observablehq.com/collection/@tomlarkworthy/libraries) these days. __*I am all in on Observable*__ as you may have noticed...
`}</div>`
)}

function _credits(html,md){return(
html`<div class="content">${md`
### Credits

Thanks to Observable's [@Fil](https://observablehq.com/@fil) (Twitter [@recifs](https://twitter.com/recifs)) for the PRs fixing some of the many typographical errors in this tutorial.
`}</div><br>`
)}

function _41(futurice_profile_bulma){return(
futurice_profile_bulma
)}

function _style(html){return(
html`<style>

.katex-display,p,h1,h2,h3,table,li
{
  max-width: 100%;
}

</style>`
)}

function _45(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/c790c0f2fb7a58f85643628807609a43486cad0a6e4bb2aec1e32931111f3878d86a626bf4e893ec481945ed9148045ef2adea75e940ae83cbf14c45217fef6e.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/bd743aa81fb2b71fde23187d69adb59472763d712b954c5b933bf1efed3a9edd720b95209a1f8acc96b302b5d62d41e76668fc018a281184f7a94a1f5751c257.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/7199ac3fa403ef0da9974f380e7463ff6c4b89880a929c2fa552ff2b1a27ac22b4c66258546273343d30024eccac863bf6355e7e5a65bf9857e042751136f583.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/1168ec6a37b4850a1fd3e4c5e603c62f0f39ca106b4c1d0320d826494abc6d8cdbc5701f578789931196794acdd6d35b89949b5decb926a581ec98df9ea207bf.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@4.png", {url: new URL("./files/96bdbcea4968de70a3e01967dcb436f8d3fcc09443fedd518535a4128b282eed152382193bf1ef762fd0129285241db7ecfc9c5c6a55a253d8d0fcfa396fbe67.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html","md"], _1);
  main.variable(observer()).define(["html","md","FileAttachment"], _2);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("note_api_keys")).define("note_api_keys", ["md"], _note_api_keys);
  main.variable(observer()).define(["html","md"], _5);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("DocView", child1);
  main.import("DocsView", child1);
  main.import("listen", child1);
  main.variable(observer()).define(["html","md"], _7);
  main.variable(observer("viewof exampleUI")).define("viewof exampleUI", ["viewof user"], _exampleUI);
  main.variable(observer("exampleUI")).define("exampleUI", ["Generators", "viewof exampleUI"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","md"], _9);
  main.variable(observer("uidExample")).define("uidExample", ["user"], _uidExample);
  main.variable(observer()).define(["html","md","FileAttachment"], _11);
  main.variable(observer()).define(["html","md"], _12);
  main.variable(observer()).define(["html","md"], _14);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["html","md"], _16);
  main.variable(observer("msgs")).define("msgs", ["listen","db"], _msgs);
  main.variable(observer()).define(["html","md"], _18);
  main.variable(observer("msgsAsString")).define("msgsAsString", ["msgs"], _msgsAsString);
  main.variable(observer()).define(["html","md"], _20);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("reconcile", child3);
  main.variable(observer()).define(["html","md","msgs"], _23);
  main.variable(observer("viewof ui")).define("viewof ui", ["db","firebase","reconcile","html","msgs"], _ui);
  main.variable(observer("ui")).define("ui", ["Generators", "viewof ui"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","md"], _25);
  main.variable(observer()).define(["html","md"], _26);
  main.variable(observer()).define(["html","md"], _27);
  main.variable(observer()).define(["html","md"], _28);
  main.variable(observer()).define(["html","md"], _29);
  main.variable(observer()).define(["html","md","FileAttachment"], _30);
  const child4 = runtime.module(define4);
  main.import("Stripe", child4);
  main.variable(observer("stripe")).define("stripe", ["Stripe"], _stripe);
  main.variable(observer()).define(["html","md","FileAttachment"], _33);
  main.variable(observer("buy")).define("buy", ["html","stripe"], _buy);
  main.variable(observer()).define(["html","md","FileAttachment"], _35);
  main.variable(observer("buyCredit")).define("buyCredit", ["stripe","user","html"], _buyCredit);
  main.variable(observer()).define(["html","md"], _37);
  main.variable(observer("buy2")).define("buy2", ["html","stripe"], _buy2);
  main.variable(observer()).define(["html","md"], _39);
  main.variable(observer("credits")).define("credits", ["html","md"], _credits);
  main.variable(observer()).define(["futurice_profile_bulma"], _41);
  main.variable(observer("style")).define("style", ["html"], _style);
  const child5 = runtime.module(define5);
  main.import("futurice_profile_bulma", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _45);
  return main;
}
