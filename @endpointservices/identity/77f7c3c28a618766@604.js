// https://observablehq.com/@endpointservices/identity@604
import define1 from "./b5ee47165ef0a032@504.js";
import define2 from "./dff1e917c89f5e76@1711.js";
import define3 from "./9a81133e63eb4a91@136.js";
import define4 from "./1131d8b2f152e8a8@463.js";
import define5 from "./573e072575f28fb9@454.js";
import define6 from "./316f0885d15ab671@65.js";
import define7 from "./52d808b188b8672b@129.js";
import define8 from "./293899bef371e135@267.js";

async function _1(bannerImage,FileAttachment){return(
bannerImage(await FileAttachment("Identity.png").url(), "Bring your own Identity with IndieAuth")
)}

function _2(md){return(
md`# Bring your own Identity with IndieAuth

This Notebook provides _identity_, a function that generates an RelMeAuth/IndieAuth identity URL. It is recommended you host your own permanent identity on your homepage on a domain that *you* own, but this notebook is useful for programatically creating temporary, experimental, throw away or test identities, and for explaining how it works.

~~~
  import {identity} from '@endpointservices/identity'
~~~

~~~js
  identity({
    title: "Tom Larkworthy", // Optional link name
    // For RelMeAuth you can delegate signin to a third party like Github
    // Those profile have to backlink to this identity URL for the link to be usable for login
    me: [
      "https://observablehq.com/@tomlarkworthy",
      "https://tomlarkworthy.endpointservices.net/",
      "https://github.com/tomlarkworthy",
    ],
    // For IndieAuth you can bring your own endpoints, but it's not necessary
    authorization_endpoint: "https://endpointservice.web.app/notebooks/@endpointservices/auth/deploys/authorization_endpoint/mods/X/secrets/endpointservices_secretadmin_service_account_key",
    token_endpoint: "https://endpointservice.web.app/notebooks/@endpointservices/auth/deploys/token_endpoint/mods/X/secrets/endpointservices_secretadmin_service_account_key"
  })
~~~


### Testing the identities

You can use these identities with services that accept IndieAuth login like the IndieWeb [wiki](https://indieweb.org/) or the one below

`
)}

function _3(weblogin){return(
weblogin
)}

function _4(md){return(
md`
### How [RelMeAuth](http://microformats.org/wiki/relmeauth) works

RelMeAuth allows a person to express which 3rd party profiles are theirs across different social sites. This is achieved by linking to their 3rd party profiles from their homepage AND backlinking their homepage from their 3rd party profiles with *rel="me"* hyperlinks.

~~~html
<-- A visible rel="me" link -->
<a href="http://github.com/tomlarkworthy" rel="me">My Github profile</a>

<-- An invisible rel="me" link -->
<link rel="me" href="http://github.com/tomlarkworthy">
~~~

Once the person has identified themselves across different social sites, the "login with Github/Facebook/Google" can be used to identify that person using their public homepage URL as the identity key (not email).

So if an authorization has the right Oauth client configured, it may use the 3rd party identity infrastructure to authenticate that person but use their custom identity URL as the *user_id*.

By using a homepage URL you give your users the ability to switch social providers and give them control on what information they share. This is all you need to build stateful applications.

To summarize, RelMeAuth is the technology that allows a homepage URL to be used as a user identifier, and describes how to link that identifier to existing Oauth 2.0 identity providers.

### How [IndieAuth](https://indieweb.org/IndieAuth) works

IndieAuth allow a person to bring their own *authorization_endpoint* (and *token_endpoint*). It scans the identity URL looking for links with *rel="authorization_endpoint"*. Here is an example that uses [micro.blog](https://micro.blog/account/menus/40423) as an identity provider.

~~~html
<link rel="authorization_endpoint" href="https://micro.blog/indieauth/auth" />
<link rel="token_endpoint" href="https://micro.blog/indieauth/token" />
~~~

But users are free to use whatever for the *authorization_endpoint* as long as it follows the [IndieAuth spec](https://indieauth.spec.indieweb.org/). Some people have *brought their own SMS verification*.

In this notebook we supply an authorization_endpoint that authenticates anybody (like a public identity).

`
)}

function _5(md){return(
md`## Implementation`
)}

function _identity(deploy,html,escapeHtml){return(
function identity({
  title,
  authorization_endpoint,
  token_endpoint,
  me = [] // Array of {href:..., label:...} for transforming into rel="me" links.
} = {}) {
  const content = `<!doctype html>
<html>${authorization_endpoint || token_endpoint ?
`\n  <head>${authorization_endpoint ?
             `\n    <link rel="authorization_endpoint" href="${authorization_endpoint}">`
     : ''}${token_endpoint ?
             `\n    <link rel="token_endpoint" href="${token_endpoint}">`
     : ''}
  </head>`:``}
  <body>
${me.map(me => `    <p><a href="${me}" rel="me">${me}</a>`).join('\n')}
  </body>
</html>
` 
  const link = deploy(title || "identity", (req, res) => {
    res.send(content);
  }, {
    modifiers: ['terminal']
  });
  
  return html`<div>
    <p>Identity URL: <a href="${link.href}">${title || link.href}</a>
    <p>HTML:
    <pre>
${escapeHtml(content)}
    </pre>

  
  </div>`
}
)}

function _7(md){return(
md`## Basic RelMeAuth Example:`
)}

function _8(identity){return(
identity({
    // For RelMeAuth you can delegate signin to a third party like Github
    // Those profile have to backlink to this identity URL for the link to be usable for login
    me: [
      "https://observablehq.com/@tomlarkworthy",
      "https://tomlarkworthy.endpointservices.net/",
      "https://github.com/tomlarkworthy",
    ],
  })
)}

function _9(md){return(
md`## Public IndieAuth Identity Example

You can create an identity anybody can use by setting an autentication_endpoint that always says 'yes'.

This works with the Indielogin.com [login](https://indielogin.com/?url=https%3A%2F%2Findieweb.org%2FMain_Page), copy the public link address and try it!
`
)}

function _publicIdentity(identity,yes_authorization_endpoint){return(
identity({
  title: "demo",
  authorization_endpoint: yes_authorization_endpoint.href,
})
)}

function _yes_authorization_endpoint(deploy){return(
deploy("yes_authorization_endpoint", async (req, res) => {
  if (req.method === 'GET') {
    res.send(`
      <h3><a href="https://observablehq.com/@endpointservices/identity">@endpointservices/identity</a></h3>
      <p><a href="${req.query.redirect_uri + `?code=qwerty&state=${req.query.state}`}">log in</a>
    `)
  } else if (req.method === 'POST') {
    res.json({
      "me": "https://webcode.run/notebooks/@endpointservices/identity/deploys/demo/mods/T"
    });
  } else {
    res.status(400).send(`Unknown request method ${req.method}`).end()
  }
}, {
  modifiers: ['terminal']
})
)}

function _12(md){return(
md`## Password protected IndieAuth Identity

This is useful for getting started, you can link your Observable profile website to this identity URL and have the identity URL provide an encrypted password check.

Generate the encrypted payload at [@endpointservices/notebook-secret](https://observablehq.com/@endpointservices/notebook-secret)

~~~js
    import {passwordIdentity} from '@endpointservices/identity'
~~~

~~~
    passwordIdentity({
      // Set to your profile
      observableProfile: "https://observablehq.com/@<YOURPROFILE>"
      // Generate secret containing password in https://observablehq.com/@endpointservices/notebook-secret
      secret: { 
        "name": "AES-GCM",
        "salt": "...",
        "iv": "...",
        "ciphertext": "..."
      }
    })
    // Afterwards, copy the full identity URL and put as a website on your observable profile settings.
~~~
`
)}

function _examplePasswordIdentity(passwordIdentity){return(
passwordIdentity({
  observableProfile: 'https://observablehq.com/@tdlgkjfhdljovtttqrzu',
  // Generate secret containing password in https://observablehq.com/@endpointservices/notebook-secret
  secret: {
    "name": "AES-GCM",
    "salt": "feFj6binNuEdRw==",
    "iv": "r13pwmES52PcUuQx",
    "ciphertext": "73u0IiXvo5Wt6uPCDDaB9w=="
  }
})
)}

function _14(md){return(
md`## Password protected authorization_endpoint

A password protected *authorization_endpoint* can be used as an IndieAuth authentication method. You can, for instance, add it to your Observable profile as a website and then login with your Observable profile as your Identity URL.
`
)}

function _password_authorization_endpoint(deploy,decodeJsonOrForm,decode,randomId,firebase){return(
function password_authorization_endpoint({
    me,     // function that returns a string or a string
    secret  // Encrypted empty payload protected by password generated in @endpointservices/notebook-secret
  }) {
  return deploy("password_authorization_endpoint", async (req, res) => {
    const params = decodeJsonOrForm(req.body);
      if (req.method === 'GET') {
        res.send(`
          <form action="" method="post">
          <label for="fcode">Password</label>
          <input type="password" id="fcode" name="password"><br><br>
          <input type="hidden" name="state" value="${req.query.state}">
          <input type="hidden" name="redirect_uri" value="${req.query.redirect_uri}">
          <input type="submit" value="Submit">
          </form>
        `)
      } else if (req.method === 'POST' && params.password) {
        try {
          await decode(params.password, secret);
          const code = randomId(16);
          await firebase.database().ref(
            `@endpointservices/password_authorization_endpoint/${code}`
          ).set({
            me: typeof me === 'function' ? me() : me,
            timestamp: {".sv": "timestamp"}
          })
          res.redirect(`${req.query.redirect_uri}?code=${code}&state=${req.query.state}`)
        } catch (err) {
          res.status(403).send(`Incorrect password: ` + err.message)
        }
      } else if (req.method === 'POST' && params.code) {
        const payload = (await firebase.database().ref(
          `@endpointservices/password_authorization_endpoint/${params.code}`
        ).once('value')).val()
        res.json({
          "me": payload.me
        });
      } else {
        res.status(400).send(`Unknown request method ${req.method}`)
      }
    }, {
      modifiers: ['terminal']
    });
}
)}

function _passwordIdentity(password_authorization_endpoint,identity){return(
function passwordIdentity({
  observableProfile,
  secret
} = {}) {
  let identityURL = undefined;
  const my_authorization_endpoint = password_authorization_endpoint({
    me: () => identityURL,
    secret
  })
  const indentityPage =  identity({
    title: `${observableProfile.match(/@([^/]*)/)[1]}`,
    authorization_endpoint: my_authorization_endpoint.href,
    me: [observableProfile]
  })
  
  identityURL = indentityPage.querySelector('a').href;
  return indentityPage;
}
)}

function _decodeJsonOrForm(URLSearchParams){return(
function decodeJsonOrForm(text) {
  try {
    return JSON.parse(text)
  } catch(err) {
    return Object.fromEntries(new URLSearchParams(text))
  }
}
)}

function _26(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Identity.png", {url: new URL("./files/df501385ecbb382199076ccbc922bedf7ff4f3f8c2d21d25322ed7db4b5d8376aea5c0f8d6213d0ebc6bdd5bd3ef0860cba924468f5499515d43654c1d8e1df0", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["bannerImage","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["weblogin"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("identity")).define("identity", ["deploy","html","escapeHtml"], _identity);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["identity"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("publicIdentity")).define("publicIdentity", ["identity","yes_authorization_endpoint"], _publicIdentity);
  main.variable(observer("yes_authorization_endpoint")).define("yes_authorization_endpoint", ["deploy"], _yes_authorization_endpoint);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("examplePasswordIdentity")).define("examplePasswordIdentity", ["passwordIdentity"], _examplePasswordIdentity);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("password_authorization_endpoint")).define("password_authorization_endpoint", ["deploy","decodeJsonOrForm","decode","randomId","firebase"], _password_authorization_endpoint);
  main.variable(observer("passwordIdentity")).define("passwordIdentity", ["password_authorization_endpoint","identity"], _passwordIdentity);
  const child1 = runtime.module(define1);
  main.import("decode", child1);
  main.variable(observer("decodeJsonOrForm")).define("decodeJsonOrForm", ["URLSearchParams"], _decodeJsonOrForm);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  const child3 = runtime.module(define3);
  main.import("escapeHtml", child3);
  const child4 = runtime.module(define4);
  main.import("bannerImage", child4);
  const child5 = runtime.module(define5);
  main.import("weblogin", child5);
  main.import("user", child5);
  const child6 = runtime.module(define6);
  main.import("randomId", child6);
  const child7 = runtime.module(define7);
  main.import("firebase", child7);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], _26);
  return main;
}
