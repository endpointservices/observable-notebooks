// https://observablehq.com/@endpointservices/auth@2026
import define1 from "./993a0c51ef1175ea@1317.js";
import define2 from "./698257e86fae4586@346.js";
import define3 from "./ef672b935bd480fc@619.js";
import define4 from "./dff1e917c89f5e76@1709.js";
import define5 from "./11a5ab8b1b3a51db@1147.js";
import define6 from "./316f0885d15ab671@65.js";
import define7 from "./64641700df65baed@91.js";
import define8 from "./1131d8b2f152e8a8@463.js";
import define9 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["AuthServerBanner@1.png",new URL("./files/c7243676b934e5cf12e7c54b80a7d9d7bf31c90a202edb62c30bf74507106c1f9cb1ba138c1f0c17494c674966ac5f3a7de30a4c1317059c93414153281466cb",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["bannerImage","FileAttachment"], async function(bannerImage,FileAttachment){return(
bannerImage(await FileAttachment("AuthServerBanner@1.png").url(), "Federated IndieAuth Server")
)});
  main.variable(observer()).define(["getContext","toc"], function(getContext,toc){return(
getContext().serverless ? undefined : toc()
)});
  main.variable(observer()).define(["md","htl","authorization_endpoint"], function(md,htl,authorization_endpoint){return(
md`## Introduction

This notebook is an *authentication server* [[okta](https://developer.okta.com/docs/concepts/auth-servers/), [auth0](https://auth0.com/blog/what-is-an-authentication-server/), [wikipedia](https://en.wikipedia.org/wiki/OAuth)]. It implements a generic [Oauth 2.0](https://oauth.net/2/) *authorization_endpoint* and *token_endpoint*. This is a technology that can enable a user to login to a service and execute private operations. **You need one of these to build secure services.** Leading commercial services include [Okta](https://www.okta.com/), [Auth0](https://auth0.com/), [Firebase Auth](https://firebase.google.com/docs/auth), [AWS Cognito](https://aws.amazon.com/identity/). Leading Open Source solutions include [Keycloak](https://www.keycloak.org/).

The server's source code is hosted on [observablehq.com](https://observablehq.com/), but requests are executed on [webcode.run](https://webcode.run) -- a serverless environemnt for Observablehq.

${htl.html`
<form action="${authorization_endpoint.href}" method="get">
  <p><button type="submit">Demo Auth Flow</button></p>
  <input type="hidden" name="client_id" value="https://observablehq.com/@endpointservices/auth" />
  <input type="hidden" name="redirect_uri" value="https://observablehq.com/@endpointservices/auth" />
  <input type="hidden" name="state" value="${Math.random()}" />
  <input type="hidden" name="scope" value="" />
</form>
`}

*This* particular authorization server uses [IndieAuth](https://indieauth.spec.indieweb.org/)/[relMeAuth](http://microformats.org/wiki/RelMeAuth). This differs from most authentication servers as it uses a user supplied Identity URL to uniquely identify users. Identity URLs can be self-hosted by the user, and even programatically created in [Observablehq](https://observablehq.com/@endpointservices/identity)

_"Sites that know a person’s PII (e.g., when people sign in using their email address) could record and reveal their [FLoC] cohort,"_ -- [WICG/FLoC](https://github.com/WICG/floc), more context from the [EFF](https://www.eff.org/deeplinks/2021/03/googles-floc-terrible-idea)

URLs are much easier to dynamically create, so a privacy focused users can create a unique URLs for each service they use. You can create multiple usable identity URLs on [Observable](https://observablehq.com/@endpointservices/identity) for instance. Other advantages include being able to switch social login providers.

Furthermore, *this* implementation is written in a web hosted literate programming notebook and read by a serverless environment. So you can fork this notebook and customize your own server (even at a code level!) without leaving the browser. 

You can see a preview what the login flow looks like by visiting the [AUTHORIZE_URL](${`${authorization_endpoint}?redirect_uri=https://observablehq.com/@endpointservices/auth&client_id=https://observablehq.com/@endpointservices/auth&state=${Math.random()}`}), _right now_. You don't *have* to have a homepage setup, you can use your Github [profile](https://github.com/tomlarkworthy) URL as an identity URL too.

- Respects privacy
- Gives control to the user
- Decouple service access from 3rd party account lifecycle.

By being implemented in an Observable notebook means it is trivial to host your own. You can fork this notebook and update the CAPITALIZED CONFIGURATION CONSTANTS.

### Why Indie Auth not OpenID-Connect?

The IndieWeb wiki discusses this point [here](https://indieweb.org/How_is_IndieAuth_different_from_OpenID_Connect). Both these systems are additional specifications on top of Oauth 2.0. There are several reasons why IndieWeb is a better fit for the Observable crowd

1. Fully decentralized identities. Unlike OpenId-Connect the IndieWeb identities are portable between services. This aligns with Observable's collaborative mission. **This is very useful for Observable developers because notebook forks change the hosting origin**. Decentralized identities work with the Observable collaborative forking model! Furthermore, the identities will work outside of the Observable ecosystem too.

2. Public clients only. IndieAuth specifies [public Oauth 2.0 clients only](https://indieauth.spec.indieweb.org/#oauth-2-0-extension). Most Oauth 2.0 identity solutions require registration of trusted client domains and *redirect_uri* upfront before you can use the provider. Sometimes you need some kinda of *client_secret*. This does not work well with Observable where notebooks are hosted on different domains. IndieAuth eliminates all these steps and jsut mandates *client_id = redirect_uri* (yes, clients are URLs too).

### Example Login and Identities

You can try out this server and as well as the [indielogin.com](https://indielogin.com) and [indieauth.com](https://indieauth.com) servers at [@endpointservices/weblogin](https://observablehq.com/@endpointservices/weblogin). The example client provides a tangible demo of a working service integration with this server.

You can obtain test IndieAuth identities [here](https://observablehq.com/@endpointservices/identity)

### How RelMeAuth works

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

### How IndieAuth works

IndieAuth allow a person to bring their own *authorization_endpoint* (and *token_endpoint*). It scans the identity URL looking for links with *rel="authorization_endpoint"*. Here is an example that uses [micro.blog](https://micro.blog/account/menus/40423) as an identity provider.

~~~html
<link rel="authorization_endpoint" href="https://micro.blog/indieauth/auth" />
<link rel="token_endpoint" href="https://micro.blog/indieauth/token" />
~~~

But users are free to use whatever for the *authorization_endpoint* as long as it follows the [IndieAuth spec](https://indieauth.spec.indieweb.org/). Some people have *brought their own SMS verification*.


### Firebase compatible

The *token_endpoint* mints standard JWTs that are compatible with Firebase Auth. So this service can be used as a replacement for [Firebase Authentication](https://firebase.google.com/docs/auth) (see *[signInWithCustomToken()](https://firebase.google.com/docs/auth/admin/create-custom-tokens)*).  Firebase Auth in its current form complicates European compliance by storing [confidential information in the US](https://firebase.google.com/support/privacy), but with this server, you choose which regions the databases reside.
`
)});
  main.variable(observer("observable_features")).define("observable_features", ["md"], function(md){return(
md`### Observablehq Features

We can detect what observable profile the user owns as part of the RelMeAuth scan. The user's profile(s) are added as additionalClaims in the JWT/token, enabling portable personal data access across notebook subdomains, with Oauth consent dialog to ensure the user can choose which domains have access to their data.

~~~js
OAUTH SCOPE: observablehq.com

additionalClaims: {
  observablehq.com: [tomlarkworthy, endpointservices]
}
~~~

This will work out of the box with Firebase Rules as [custom claims](https://firebase.google.com/docs/auth/admin/custom-claims). 

We also look for URLs with authorization_endpoint in their name as nominated indie_auth providers.


`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### More info

The proposed spec of [IndieAuth](https://observablehq.com/@endpointservices/auth) and [relMeAuth](http://microformats.org/wiki/RelMeAuth). You can create your own Authorization server for use anywhere in the internet by forking this notebook and updating the Oauth configs. This one run by [@endpointservices](https://observablehq.com/@endpointservices) for federated use across the Observable platform.

### About

Lift and shift + fork of [Github/indieauth.com](https://github.com/aaronpk/IndieAuth.com), also Licensed under Apache 2. We are deeply thankful for the support of Aaron Parecki on this project and the others [IndieWedb dev chat](https://chat.indieweb.org/dev/) 

### Reporting Issues

There is a Github repo for issues [here](https://github.com/endpointservices/auth/issues)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Configuration

Fork this notebook or import this notebook and override the following variables to create your own authorization server.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`####  SERVICE_ACCOUNT_SECRETS
The names of [secrets](https://observablehq.com/@endpointservices/secrets) each containing a GCP [JSON service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### SERVICE_ACCOUNT_SECRET
Used to access the backend Firebase persistence layer (must be a member of the project containing the Firebase database).`
)});
  main.variable(observer("SERVICE_ACCOUNT_SECRET")).define("SERVICE_ACCOUNT_SECRET", function(){return(
'endpointservices_secretadmin_service_account_key'
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET

Used to sign keys (can be for a different project)`
)});
  main.variable(observer("TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET")).define("TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET", function(){return(
"endpointservices_minter"
)});
  main.variable(observer()).define(["md"], function(md){return(
md`####  FIREBASE_CONFIG

Firebase Realtime Database is used to cache user profiles and Oauth 2.0 state machines.
`
)});
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", function(){return(
{
  name: "authinfra",
  databaseURL: "https://endpointservice-eu.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  projectId: "endpointservice",
  appId: "1:1986724398:web:9b8bc33895b45dd2e095bf"
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The token Firebase is used to verify tokens and must be in same project as TOKEN_SIGNER_SERVICE_ACCOUNT`
)});
  main.variable(observer("TOKEN_FIREBASE_CONFIG")).define("TOKEN_FIREBASE_CONFIG", function(){return(
{
  name: "targetfirebase",
  apiKey: "AIzaSyBquSsEgQnG_rHyasUA95xHN5INnvnh3gc",
  authDomain: "endpointserviceusers.firebaseapp.com",
  projectId: "endpointserviceusers",
  appId: "1:283622646315:web:baa488124636283783006e"
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Security Rules

[Security rules](https://firebase.google.com/docs/database/security) hosted by the Firebase Realtime Database should include the following to secure the backend database (FIREBASE_CONFIG). The rules ensure only the service account can access it. The rules are generated by querying service account's *whoami* endpoint, so the instructions will update when you configure the service account.`
)});
  main.variable(observer()).define(["getContext","whoami","md"], async function(getContext,whoami,md)
{
  if (!getContext().serverless) {
    const UID = (await (await fetch(whoami.href)).json()).uid;

    return md`
~~~js
{
   "rules":{
      "@endpointservices":{
         "relmeauth":{
            "session":{
               "$state":{
                  ".write":"auth.uid == '${UID}'",
                  ".read":"auth.uid == '${UID}'"
               }
            },
            "codes":{
               "$code":{
                  ".write":"auth.uid == '${UID}'",
                  ".read":"auth.uid == '${UID}'"
               }
            },
            "users":{
               "$me":{
                  ".write":"auth.uid == '${UID}'",
                  ".read":"auth.uid == '${UID}'"
               }
            }
         }
      }
   }
}
~~~
`;
  }
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`####  ASSETS_BASE_URL

Root of static assets such as images.
`
)});
  main.variable(observer("ASSETS_BASE_URL")).define("ASSETS_BASE_URL", function(){return(
"https://storage.googleapis.com/indieauth_com/public"
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Providers`
)});
  main.variable(observer("PROVIDERS")).define("PROVIDERS", function(){return(
{
  github: {
    regex: /https?:\/\/(?:www\.)?github\.com\/([^\/]+)/,
    auth: true, 
    oneway: true
  },
  twitter: {
    regex: /https?:\/\/(?:www\.)?twitter\.com\/([^\/]+)/,
    auth: false
  },
  observable: {
    regex: /https:\/\/observablehq\.com\/([^\/]+)/,
    auth: false
  },
  indieauth: {
    auth: true
  },
}
)});
  main.variable(observer("PROVIDER_FOR_URL")).define("PROVIDER_FOR_URL", ["PROVIDERS"], function(PROVIDERS){return(
(url, rel = 'me') => {
    // https://github.com/aaronpk/IndieAuth.com/blob/5d4ae533a72781d6a1a1c3cd8a288928edf2ae9c/models/provider.rb#L25
    if (rel === 'me') {
      return Object.keys(PROVIDERS).find(
        provider => PROVIDERS[provider].regex && url.match(PROVIDERS[provider].regex)
      );
    } else if (rel === 'authorization_endpoint'){
      return 'indieauth' 
    }
  }
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### GITHUB_XXX

Configuration of the backend's Github Oauth Client. Server allows users to authenticated with Github, then substitutes a Github issued token for a custom one. Settings we figured out using [Oauth 2.0 Examples](https://observablehq.com/@tomlarkworthy/oauth-examples)
`
)});
  main.variable(observer("GITHUB_CLIENT_SECRET_SECRET_NAME")).define("GITHUB_CLIENT_SECRET_SECRET_NAME", function(){return(
"endpointservices_github_client_secret"
)});
  main.variable(observer("GITHUB_TOKEN_URL")).define("GITHUB_TOKEN_URL", function(){return(
"https://github.com/login/oauth/access_token"
)});
  main.variable(observer("GITHUB_CLIENT_ID")).define("GITHUB_CLIENT_ID", function(){return(
"Iv1.058b3e2cc86bdb17"
)});
  main.variable(observer("GITHUB_AUTHORIZE_URL")).define("GITHUB_AUTHORIZE_URL", function(){return(
'https://github.com/login/oauth/authorize'
)});
  main.variable(observer("GITHUB_TOKEN_PARAMS")).define("GITHUB_TOKEN_PARAMS", function(){return(
args => ({
  client_id: args.CLIENT_ID,
  redirect_uri: args.REDIRECT_URI,
  scope: args.SCOPES.join(" "),
  code: args.code,
  state: args.state
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

---
## Server Endpoints

The core of the implementation is a set of HTTP endpoints
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Oauth 2.0 Authorization Endpoint

You redirect the user to the authorization endpoint, with a client_id, redirect_uri and a state parameter. After the user has authorized the application, they will be returned to the redirect_uri along with a *code* and the original state value.

Unusually, IndieAuth also allows the code to be exchanged at the *authorization_endpoint* in addition to the typical *token_endpoint*.
`
)});
  main.variable(observer("authorization_endpoint")).define("authorization_endpoint", ["deploy","checkIsURL","checkNotEmptyString","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","FKEY","auth_html","signin_html"], function(deploy,checkIsURL,checkNotEmptyString,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,FKEY,auth_html,signin_html){return(
deploy(
  "authorization_endpoint",
  async (req, res, ctx) => {
    try {
      const redirect_uri = checkIsURL(req.query.redirect_uri, "redirect_uri");
      const state = checkNotEmptyString(req.query.state, "state");
      const client_id = checkNotEmptyString(req.query.client_id, "client_id");
      const scope = req.query.scope || "";
      const me = req.query.me ? checkIsURL(req.query.me, "me") : undefined;
      if (me) {
        const service_access_token = await getAccessTokenFromServiceAccount(
          ctx.secrets[SERVICE_ACCOUNT_SECRET]
        );
        await signinWithAccessToken(firebase, service_access_token);
        const user =
          (
            await firebase
              .database()
              .ref(`@endpointservices/relmeauth/users/${FKEY.encode(me)}`)
              .once("value")
          ).val() || {};

        const profiles = Object.keys(user.profiles || {}).map((encodedURL) => ({
          href: FKEY.decode(encodedURL),
          provider: user.profiles[encodedURL].provider
        }));
        res.send(
          auth_html({
            me,
            scope,
            redirect_uri,
            state,
            client_id,
            profiles,
            last_refresh: new Date(user.last_refresh).toString()
          }).outerHTML
        );
      } else {
        res.send(
          signin_html({
            me,
            redirect_uri,
            state,
            client_id,
            scope,
            auth_link: req.baseUrl
          }).outerHTML
        );
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  {
    reusable: true,
    secrets: [SERVICE_ACCOUNT_SECRET]
  }
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Oauth 2.0 Token Endpoint

The token has two major roles  

1. where a *code* can be exchanged for an *access_token*
2. where an *access_token* can be validated and decoded


`
)});
  main.variable(observer("token_endpoint")).define("token_endpoint", ["deploy","verifyToken","checkNotEmptyString","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","FKEY","createCustomToken","TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET"], function(deploy,verifyToken,checkNotEmptyString,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,FKEY,createCustomToken,TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET){return(
deploy(
  "token_endpoint",
  async (req, res, ctx) => {
    try {
      if (!req.query.code && req.headers["authorization"]) {
        // https://www.w3.org/TR/indieauth/#access-token-verification
        try {
          const decoded = await verifyToken(req.headers["authorization"]);
          return res.json({
            ...decoded,
            scope: decoded.scope || "" // IndieAuth spec insists scope is sent
          });
        } catch (err) {
          try {
            const message = JSON.parse(err.message);
            res.status(message.error.code).json(message.error.message);
          } catch (err2) {
            res.status(500).json(err.message);
          }
        }
      }

      const code = checkNotEmptyString(req.query.code, "code");
      const service_access_token = await getAccessTokenFromServiceAccount(
        ctx.secrets[SERVICE_ACCOUNT_SECRET]
      );
      await signinWithAccessToken(firebase, service_access_token);
      const auth = (
        await firebase
          .database()
          .ref(`@endpointservices/relmeauth/codes/${code}`)
          .once("value")
      ).val();

      // One use codes
      firebase
        .database()
        .ref(`@endpointservices/relmeauth/codes/${code}`)
        .remove();

      if (!auth) throw new Error("No code found");

      const { client_id, me, secret, scope, t } = auth;

      if (
        secret &&
        secret !== checkNotEmptyString(req.query.secret, "secret")
      ) {
        throw new Error("Secret does not match");
      }

      // 10 min window to exchange code
      if (
        new Date() - new Date(t) > 10 * 60 * 1000 ||
        new Date() - new Date(t) < 0
      )
        throw new Error("Invalid time range");

      let additionalClaims = undefined;
      if (scope?.includes("observablehq.com")) {
        const profiles =
          (
            await firebase
              .database()
              .ref(
                `@endpointservices/relmeauth/users/${FKEY.encode(me)}/profiles`
              )
              .orderByChild("provider")
              .equalTo("observable")
              .once("value")
          ).val() || {};

        additionalClaims = {
          "observablehq.com": Object.keys(profiles)
            .map((key) => FKEY.decode(key))
            .map(
              (profile) =>
                profile.match(/https:\/\/observablehq\.com\/@([^\/]+)/)[1]
            )
        };
      }
      const token = await createCustomToken(
        JSON.parse(ctx.secrets[TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET]),
        /* uid */ me,
        /* additionalClaims */ additionalClaims,
        /* additionalFields */ {
          scope,
          me,
          client_id
        }
      );
      res.json({
        access_token: token
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  {
    secrets: [SERVICE_ACCOUNT_SECRET, TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET]
  }
)
)});
  main.variable(observer("verifyToken")).define("verifyToken", ["extractBearerToken","verifyCustomToken","tokenFirebase"], function(extractBearerToken,verifyCustomToken,tokenFirebase){return(
async (authorization) => {
  const token = extractBearerToken(authorization)
  return verifyCustomToken(tokenFirebase, token);
}
)});
  const child1 = runtime.module(define1).derive([{name: "TOKEN_FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", "tokenFirebase", child1);
  main.variable(observer("extractBearerToken")).define("extractBearerToken", function(){return(
function extractBearerToken(headerValue) {
  // https://tools.ietf.org/html/rfc6750#section-2.1
  let match = undefined 
  if (match = /^Bearer\s(.*)$/.exec(headerValue)) {
    return match[1]
  }
  throw new Error("No bearer token found")
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Scan Identity URL

Scans a URL looking for rel="me" links and tries to classify each as a supported provider or not. It does not inspect those links, so it cannot check for backlinks.
`
)});
  main.variable(observer("supported_providers_endpoint")).define("supported_providers_endpoint", ["deploy","checkIsURL","checkNotEmptyString","SERVICE_ACCOUNT_SECRET","getAccessTokenFromServiceAccount","signinWithAccessToken","firebase","rel_links","PROVIDER_FOR_URL","FKEY","auth_path"], function(deploy,checkIsURL,checkNotEmptyString,SERVICE_ACCOUNT_SECRET,getAccessTokenFromServiceAccount,signinWithAccessToken,firebase,rel_links,PROVIDER_FOR_URL,FKEY,auth_path){return(
deploy(
  "supported_providers.json",
  async (req, res, ctx) => {
    const me = checkIsURL(req.query.me, "me");
    const client_id = checkNotEmptyString(req.query.client_id, "client_id");
    const userstate = checkNotEmptyString(req.query.state, "state");
    checkNotEmptyString(
      ctx.secrets[SERVICE_ACCOUNT_SECRET],
      SERVICE_ACCOUNT_SECRET
    );

    const service_access_token = await getAccessTokenFromServiceAccount(
      ctx.secrets[SERVICE_ACCOUNT_SECRET]
    );
    const signin = signinWithAccessToken(firebase, service_access_token);
    // Fetch all links
    const meLinks = await rel_links(me);

    // Also expand 1 level of links
    //const moreLinks = await Promise.all(
    //  meLinks.filter(link => link.href !== me).map(link => rel_links(link.href)))

    const self = {
      href: me,
      provider: PROVIDER_FOR_URL(me, "me")
    };

    const allLinks = [self].concat(meLinks); //.concat(...moreLinks);

    // remove duplicates
    const links = Object.values(
      allLinks.reduce((acc, link) => {
        acc[link.href] = link;
        return acc;
      }, {})
    );

    await signin;

    const user =
      (
        await firebase
          .database()
          .ref(`@endpointservices/relmeauth/users/${FKEY.encode(me)}`)
          .once("value")
      ).val() || {};

    // Make note we are doing a refresh
    let lastWrite = firebase
      .database()
      .ref(`@endpointservices/relmeauth/users/${FKEY.encode(me)}/last_refresh`)
      .set({ ".sv": "timestamp" });
    // Prune profile links from user profile that are not longer present
    links.forEach((link) => {
      const encodedURL = FKEY.encode(link.href);
      if (!(user.profiles || {})[encodedURL]) {
        console.log("encodedURL", encodedURL);
        lastWrite = firebase
          .database()
          .ref(
            `@endpointservices/relmeauth/users/${FKEY.encode(
              me
            )}/profiles/${encodedURL}`
          )
          .remove();
      }
      if (link.rel === "authorization_endpoint") {
        console.log("authorization_endpoint", encodedURL);
        links.shift(); // Remove self link
        lastWrite = firebase
          .database()
          .ref(
            `@endpointservices/relmeauth/users/${FKEY.encode(
              me
            )}/profiles/${FKEY.encode(me)}`
          )
          .set({
            provider: "indieauth",
            authorization_endpoint: link.href
          });
      }
    });
    await lastWrite; // ensure all our writes have flushed

    res.json({
      links: links.map((link) => {
        const profile = link.href;
        const provider = PROVIDER_FOR_URL(link.href, link.rel);
        const verified = null || provider === "indieauth";
        const auth_path_link =
          provider === "indieauth"
            ? auth_path(provider, me, me, client_id, userstate)
            : undefined;
        return {
          profile,
          provider,
          verified,
          ...(auth_path_link && { auth_path: auth_path_link })
        };
      })
    });
  },
  {
    reusable: true,
    modifiers: ["terminal"],
    secrets: [SERVICE_ACCOUNT_SECRET]
  }
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Verify link

Given an identity URL (me) and a profile link (profile) checks whether the profile is a legitimate identity provider for me by considering backlinks. If so, and the provider is supported, it will return a link to to start the auth flow.
`
)});
  main.variable(observer("verify_link_endpoint")).define("verify_link_endpoint", ["deploy","checkIsURL","checkNotEmptyString","PROVIDER_FOR_URL","rel_links","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","verify_link","FKEY","PROVIDERS","auth_path"], function(deploy,checkIsURL,checkNotEmptyString,PROVIDER_FOR_URL,rel_links,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,verify_link,FKEY,PROVIDERS,auth_path){return(
deploy(
  "verify_link.json",
  async (req, res, ctx) => {
    try {
      const me = checkIsURL(req.query.me, "me");
      const profile = checkIsURL(req.query.profile, "profile");
      const client_id = checkNotEmptyString(req.query.client_id, "client_id");
      const userstate = checkNotEmptyString(req.query.state, "state");
      const scope = req.query.scope || "";
      let authorization_endpoint = undefined;

      let provider = PROVIDER_FOR_URL(req.query.profile);
      if (!provider) {
        // Maybe its indie auth
        const authorization_endpoints = await rel_links(
          profile,
          "authorization_endpoint"
        );
        if (authorization_endpoints.length > 0) {
          provider = "indieauth";
          authorization_endpoint = authorization_endpoints[0].href;
        }
      }
      checkNotEmptyString(provider, "provider");

      const service_access_token = await getAccessTokenFromServiceAccount(
        ctx.secrets[SERVICE_ACCOUNT_SECRET]
      );
      const signin = signinWithAccessToken(firebase, service_access_token);

      const verified = await verify_link(me, profile);
      await signin;
      if (!verified) throw new Error(`Should have already thrown`);

      // Record the successful verification in cache
      await firebase
        .database()
        .ref(
          `@endpointservices/relmeauth/users/${FKEY.encode(
            me
          )}/profiles/${FKEY.encode(profile)}`
        )
        .set({
          provider,
          ...(authorization_endpoint && { authorization_endpoint })
        });

      const auth = PROVIDERS[provider].auth;

      res.json({
        me,
        profile,
        provider,
        verified,
        auth_path:
          verified && auth
            ? auth_path(provider, profile, me, client_id, userstate, scope)
            : false
      });
    } catch (err) {
      // Remove from cache
      firebase
        .database()
        .ref(
          `@endpointservices/relmeauth/users/${FKEY.encode(
            req.query.me
          )}/profiles/${FKEY.encode(req.query.profile)}`
        )
        .remove();

      res.status(/*yuck*/ 200).json({
        me: req.query.me,
        profile: req.query.profile,
        verified: false,
        error: true,
        error_description: err.message
      });
    }
  },
  {
    reusable: true,
    modifiers: ["terminal"],
    secrets: [SERVICE_ACCOUNT_SECRET]
  }
)
)});
  main.variable(observer("rel_links")).define("rel_links", ["checkIsURL","PROVIDER_FOR_URL","fetchp"], function(checkIsURL,PROVIDER_FOR_URL,fetchp){return(
async function rel_links (url, rel) {
  url = checkIsURL(url);
  if (!url.startsWith('https')) throw new Error("Only secure (https) rel links supported");
  
  const provider = PROVIDER_FOR_URL(url, 'me')
  
  const response = await fetchp(url)
  if (response.status >= 400) throw new Error(`Status ${response.status} ${await response.text()}`);
  const html = await response.text()
  
  const links = [];
  
  var el = document.createElement( 'html' );
  el.innerHTML = html;
  
  function process(link) {
    const rels = link.rel.split(" ")
    if (rels.includes('me') && link.href) {
      links.push({
        rel: 'me',
        href: new URL(link.href, url).href
      });
    }
    // Special scraping for observable, we will use website links
    if (provider === 'observable' && link.href && link?.parentNode?.classList.contains("profile-link")) {
      if (link.href.includes('authorization_endpoint')) {
        links.push({
          rel: 'authorization_endpoint',
          href: new URL(link.href, url).href
        });
      } else {
        links.push({
          rel: 'me',
          href: new URL(link.href, url).href
        });
      } 
    }

    if (rels.includes('authorization_endpoint') && link.href) {
      links.push({
        rel: 'authorization_endpoint',
        href: new URL(link.href, url).href
      });
    }
  }
  for (let t of el.getElementsByTagName( 'a' )) {
    process(t)
  }
  for (let t of el.getElementsByTagName( 'link' )) {
    process(t)
  }
  
  
  
  return rel ? links.filter(link => link.rel === rel) : links
}
)});
  main.variable(observer("links_to")).define("links_to", ["rel_links"], function(rel_links){return(
async function links_to(page, url) {
  return (await rel_links(page, 'me')).some(link => link.href === (new URL(url)).toString())
}
)});
  main.variable(observer("verify_link")).define("verify_link", ["checkIsURL","rel_links","PROVIDERS","PROVIDER_FOR_URL"], function(checkIsURL,rel_links,PROVIDERS,PROVIDER_FOR_URL){return(
async function verify_link(me, link) {
  me = checkIsURL(me);
  link = checkIsURL(link);
  if (link.match(/twitter\.com/)) {
    throw new Error("Twitter login no longer works due to a change on their website");
  }
  
  const [links_from_link, links_from_me] = await Promise.all([
    rel_links(link, 'me'),
    rel_links(me, 'me')]);

  const me_contains_link = links_from_me.map(_ => _.href).includes(link);
  const link_contains_me = links_from_link.map(_ => _.href).includes(me);
  const linkProvider = PROVIDERS[PROVIDER_FOR_URL(link)];
  
  const verified = (me === link)                        // E.g. indieauth, Oauth silo profile URL
    || me_contains_link && link_contains_me             // RelMe
    || me_contains_link && linkProvider.oneway          // One-way Silo auth like Github
  
  if (!verified) {
    throw new Error(
      `${me_contains_link ? `✅ ${me} links to ${link}`: `⚠️ ${me} doesn't link to ${link}`}\n\n` +
      `${link_contains_me ? `✅ ${link} links to ${me}`: `⚠️ ${link} doesn't link to ${me}`}`);
  }
  return verified;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Auth Flow Start Endpoint

Start of an Oauth 2.0 flow. Given the parameters, this endpoint will cache the client settings and redirect to a more specific identity provider.
`
)});
  main.variable(observer("auth_start")).define("auth_start", ["deploy","checkNotEmptyString","checkIsURL","randomId","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","b64S256","GITHUB_CLIENT_ID","GITHUB_REDIRECT_URI","GITHUB_AUTHORIZE_URL","encodeParams","FKEY","INDIEAUTH_REDIRECT_URI"], function(deploy,checkNotEmptyString,checkIsURL,randomId,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,b64S256,GITHUB_CLIENT_ID,GITHUB_REDIRECT_URI,GITHUB_AUTHORIZE_URL,encodeParams,FKEY,INDIEAUTH_REDIRECT_URI){return(
deploy(
  "auth_start",
  async (req, res, ctx) => {
    try {
      const provider = checkNotEmptyString(req.query.provider, "provider");
      const me = checkIsURL(req.query.me);
      const profile = checkIsURL(req.query.profile);
      const redirect_uri = checkIsURL(req.query.redirect_uri, "redirect_uri");
      const client_id = checkNotEmptyString(req.query.client_id, "client_id");
      const userstate = checkNotEmptyString(req.query.state, "state");
      const state = randomId();
      const scope = req.query.scope;

      const service_access_token = await getAccessTokenFromServiceAccount(
        ctx.secrets[SERVICE_ACCOUNT_SECRET]
      );
      await signinWithAccessToken(firebase, service_access_token);

      let auth_url,
        backend_client_id,
        backend_redirect_uri,
        authorization_endpoint;
      const code_verifier = await randomId(50);
      const code_challenge = await b64S256(code_verifier);
      if (provider === "github") {
        backend_client_id = GITHUB_CLIENT_ID;
        backend_redirect_uri = GITHUB_REDIRECT_URI.href;
        auth_url = `${GITHUB_AUTHORIZE_URL}?${encodeParams({
          client_id: backend_client_id,
          redirect_uri: backend_redirect_uri,
          state: state
        })}`;
      } else if (provider === "indieauth") {
        authorization_endpoint = checkIsURL(
          (
            await firebase
              .database()
              .ref(
                `@endpointservices/relmeauth/users/` +
                  `${FKEY.encode(me)}/profiles/` +
                  `${FKEY.encode(profile)}/` +
                  `authorization_endpoint`
              )
              .once("value")
          ).val()
        );
        (backend_client_id = INDIEAUTH_REDIRECT_URI.href),
          (backend_redirect_uri = INDIEAUTH_REDIRECT_URI.href),
          (auth_url = `${authorization_endpoint}?${encodeParams({
            me,
            client_id: backend_client_id,
            redirect_uri: backend_redirect_uri,
            scope,
            state: state,
            response_type: "code",
            code_challenge_method: "S256",
            code_challenge: code_challenge
          })}`);
      } else {
        throw new Error(`Unknown provider ${provider}`);
      }

      await firebase
        .database()
        .ref(`@endpointservices/relmeauth/session/${state}`)
        .set({
          me,
          provider,
          profile,
          state,
          client_id,
          redirect_uri,
          userstate,
          backend_client_id,
          backend_redirect_uri,
          code_verifier,
          ...(scope && { scope }),
          ...(authorization_endpoint && { authorization_endpoint })
        });

      res.redirect(302, auth_url);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  {
    secrets: [SERVICE_ACCOUNT_SECRET]
  }
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Provider Specific Endpoints`
)});
  main.variable(observer("auth_path")).define("auth_path", ["auth_start"], function(auth_start){return(
(provider, profile, me, client_id, state, scope) => {
    // https://github.com/aaronpk/IndieAuth.com/blob/5d4ae533a72781d6a1a1c3cd8a288928edf2ae9c/models/provider.rb#L38
    return `${auth_start.href}?me=${encodeURIComponent(me)}&provider=${encodeURIComponent(provider)}&profile=${encodeURIComponent(profile)}&client_id=${client_id}&state=${state}&scope=${scope}`
  }
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Github Redirect URI`
)});
  main.variable(observer("GITHUB_REDIRECT_URI")).define("GITHUB_REDIRECT_URI", ["deploy","checkNotEmptyString","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","verify_link","GITHUB_TOKEN_URL","encodeParams","GITHUB_CLIENT_ID","GITHUB_CLIENT_SECRET_SECRET_NAME","URLSearchParams","checkRedirect","randomId"], function(deploy,checkNotEmptyString,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,verify_link,GITHUB_TOKEN_URL,encodeParams,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET_SECRET_NAME,URLSearchParams,checkRedirect,randomId){return(
deploy(
  "github_redirect",
  async (req, res, ctx) => {
    try {
      const state = checkNotEmptyString(req.query.state, "state");
      const code = checkNotEmptyString(req.query.code, "code");
      const service_access_token = await getAccessTokenFromServiceAccount(
        ctx.secrets[SERVICE_ACCOUNT_SECRET]
      );
      await signinWithAccessToken(firebase, service_access_token);
      const session = await firebase
        .database()
        .ref(`@endpointservices/relmeauth/session/${state}`)
        .once("value");
      if (session.val() === null)
        throw new Error(`No matching state found: ${state}`);

      const {
        me,
        provider,
        profile,
        redirect_uri,
        client_id,
        userstate,
        scope
      } = session.val();

      const isVerififiedPromise = verify_link(me, profile);

      // Exchange code for token
      const exchangeURL = `${GITHUB_TOKEN_URL}?${encodeParams({
        client_id: GITHUB_CLIENT_ID,
        client_secret: ctx.secrets[GITHUB_CLIENT_SECRET_SECRET_NAME],
        scope: scope,
        code: code
      })}`;

      const tokenResponse = await fetch(exchangeURL);

      if (tokenResponse.status !== 200)
        throw new Error(
          `Status: ${tokenResponse.status} ${await tokenResponse.text()}`
        );
      const responseText = await tokenResponse.text();

      // Form decode
      const token = new URLSearchParams(responseText).get("access_token");

      // With a token we can lookup the user
      // Now get the user info
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`
        }
      });

      if (userResponse.status !== 200)
        throw new Error(
          `Status: ${userResponse.status} ${await userResponse.text()}`
        );
      const githubProfile = await userResponse.json();

      if (profile === githubProfile.html_url) {
        // Check redirect_uri matches
        // TODO we can fetch more authorized redirects but this is enough for now
        checkRedirect(redirect_uri, [client_id]);

        // Final check the profile is ok for the user ID
        if (!(await isVerififiedPromise))
          throw new Error(`${profile} cannot be used to authenticate ${me}`);

        const code = randomId(32);
        await firebase
          .database()
          .ref(`@endpointservices/relmeauth/codes/${code}`)
          .set({
            client_id, // Which client was used
            ...(scope && { scope }),
            me, // Which profile was verified
            t: { ".sv": "timestamp" } // Timestamp of when we authorized
          });

        res.redirect(`${redirect_uri}?code=${code}&state=${userstate}`);
      } else {
        res
          .status(400)
          .send(
            `Logged in Github user ${githubProfile.html_url} does not match profile ${profile}`
          );
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  {
    secrets: [GITHUB_CLIENT_SECRET_SECRET_NAME, SERVICE_ACCOUNT_SECRET]
  }
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### IndieAuth Redirect URI`
)});
  main.variable(observer("INDIEAUTH_REDIRECT_URI")).define("INDIEAUTH_REDIRECT_URI", ["deploy","checkNotEmptyString","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","decodeJsonOrForm","checkRedirect","randomId"], function(deploy,checkNotEmptyString,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,decodeJsonOrForm,checkRedirect,randomId){return(
deploy("indieauth_redirect", async (req, res, ctx) => {
  try {
    const state = checkNotEmptyString(req.query.state, 'state');
    const code = checkNotEmptyString(req.query.code, 'code');
    const service_access_token = await getAccessTokenFromServiceAccount(ctx.secrets[SERVICE_ACCOUNT_SECRET]);
    await signinWithAccessToken(firebase, service_access_token);
    const session = await firebase.database().ref(`@endpointservices/relmeauth/session/${state}`).once('value');
    if (session.val() === null) throw new Error(`No matching state found: ${state}`);
    
    const {
      me, provider, profile, redirect_uri, client_id, userstate, scope,
      backend_client_id, backend_redirect_uri, code_verifier, authorization_endpoint
    } = session.val();
    
    // Exchange code for token
    // https://indieauth.spec.indieweb.org/#x5-3-1-request
    console.log("authorization_endpoint", authorization_endpoint)
    const codeResponse = await fetch(authorization_endpoint, {
      method: "POST",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        // 'Accept': 'application/x-www-form-urlencoded' //IndieAuth.com did not like this
      },
      body: `grant_type=authorization_code&` +
      `code=${code}&` + 
      `client_id=${backend_client_id}&` + 
      `redirect_uri=${backend_redirect_uri}&` + 
      `code_verifier=${code_verifier}`
    })

    if (codeResponse.status !== 200)
      throw new Error(`Status: ${codeResponse.status} ${await codeResponse.text()}`);
    const decodedResponse = decodeJsonOrForm(await codeResponse.text());

    const authedMe = decodedResponse.me
    console.log(JSON.stringify(decodedResponse))
    
    if (profile === authedMe) {
      // Check redirect_uri matches
      // TODO we can fetch more authorized redirects but this is enough for now
      checkRedirect(redirect_uri, [client_id]);
      
      
      const code = randomId(32);
      await firebase.database().ref(`@endpointservices/relmeauth/codes/${code}`).set({
        client_id,              // Which client was used
        ...(scope && {scope}),
        me: me,                 // Which profile was verified
        t: {".sv": "timestamp"} // Timestamp of when we authorized
      });
      
      res.redirect(`${redirect_uri}?code=${code}&state=${userstate}`);
    } else {
      res.status(400).send(`Logged in user ${authedMe} does not match profile ${me}`); 
    }                 
  } catch (err) {
    console.log("Err ", err.message)
    res.status(500).send(err.message);
  }
}, {
  secrets: [SERVICE_ACCOUNT_SECRET]
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Whoami: Service Account Endpoint

Firebase rules need to grant write access to the service account. This endpoint can be used to get its *uid*  of the DATABASE_SERVICE_ACCOUNT and confirm it is wired up properly.
`
)});
  main.variable(observer("whoami")).define("whoami", ["deploy","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase"], function(deploy,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase){return(
deploy("whoami", async (req, res, ctx) => {
  try {
    const service_access_token = await getAccessTokenFromServiceAccount(
      ctx.secrets[SERVICE_ACCOUNT_SECRET]
    );
    await signinWithAccessToken(firebase, service_access_token);
    res.json({
      uid: firebase.auth().currentUser.uid
    })
  } catch (err) {
    res.status(500).send(err.message) 
  }
}, {
  secrets: [SERVICE_ACCOUNT_SECRET]
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Validators

Helpers on cleaning inputs. A *check* will normalize and throw if invalid.
`
)});
  main.variable(observer("checkIsURL")).define("checkIsURL", function(){return(
function checkIsURL(arg, name) {
  try {
    return new URL(arg).toString()
  } catch (err) {
    throw new Error(`${name || 'arg'} is not a URL`)
  } 
}
)});
  main.variable(observer("checkNotEmptyString")).define("checkNotEmptyString", function(){return(
function checkNotEmptyString(arg, name) {
  if (!arg || arg === '') throw new Error(`${name || 'arg'} is empty`)
  return arg;
}
)});
  main.variable(observer("checkRedirect")).define("checkRedirect", function(){return(
(redirect_uri, redirect_uris) => {
  if (!redirect_uris.some(candidate => {
    if (redirect_uri === candidate) return true; // Exact match, ofc
    if (candidate.endsWith("**") && redirect_uri.startsWith(candidate.substring(0, candidate.length - 2))) return true;
    return false;
  })) throw new Error(`No matching redirect_uri for ${redirect_uri}`)
  return true;
}
)});
  main.variable(observer("encodeParams")).define("encodeParams", function(){return(
p =>
  Object.entries(p)
    .map(kv => kv.map(encodeURIComponent).join("="))
    .join("&")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Frontend (HTML & JS)`
)});
  main.variable(observer("header_html")).define("header_html", ["html","ASSETS_BASE_URL"], function(html,ASSETS_BASE_URL){return(
() => html`
<meta charset="utf-8">
<title>Web Sign-In</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="${ASSETS_BASE_URL}/css/style.css">
<link rel="stylesheet" href="${ASSETS_BASE_URL}/bootstrap-3.3.7/css/bootstrap.min.css">
<script src="${ASSETS_BASE_URL}/js/jquery-3.2.1.min.js"></script>
<script src="${ASSETS_BASE_URL}/js/mustache.js"></script>
<script src="${ASSETS_BASE_URL}/bootstrap-3.3.7/js/bootstrap.min.js"</script>
</script>`
)});
  main.variable(observer("signin_html")).define("signin_html", ["success_endpoint","html","header_html","ASSETS_BASE_URL"], function(success_endpoint,html,header_html,ASSETS_BASE_URL){return(
({
  redirect_uri = success_endpoint.href,
  client_id = '',
  state = '',
  auth_link,
  scope = '',
} = {}) => {
  
  return html`
  ${header_html()}
  <div class="container">
  <div class="narrow">

      <form action="${auth_link}" method="get" class="well" style="margin: 20px 0;">
        <div class="form-group">
          <label for="indie_auth_url">Your Website:</label>
          <input id="indie_auth_url" type="url" name="me" class="form-control" placeholder="https://yourdomain.com/" />
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
        <input type="hidden" name="redirect_uri" value="${redirect_uri}" />
        <input type="hidden" name="client_id" value="${client_id}" />
        <input type="hidden" name="state" value="${state}" />
        <input type="hidden" name="scope" value="${scope}" />
      </form>



      <h3>Sign in with your website</h3>

      <a class="thumbnail" href="https://indieauth.com/setup">
        <img src="${ASSETS_BASE_URL}/img/code-sample.png"/>
      </a>

      <p>This is a <a href="https://indieweb.org/web_sign-in">web sign-in</a> prompt. To use it, you'll need to:</p>

      <ul>
        <li>Add links on your website to your various social profiles (Twitter, Github, etc) with the attribute <a href="http://microformats.org/wiki/rel-me">rel="me"</a></li>
        <li>Ensure these profiles link back to your website</li>
        <li>Alternatively, you can <a href="https://indieweb.org/authorization-endpoint">set up your domain to support the IndieAuth protocol</a></li>
      </ul>
      <p>Read the <a href="https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain">full setup instructions</a></p>

      <div style="margin-bottom: 200px;"></div>
  </div>
</div>`
}
)});
  main.variable(observer("auth_html")).define("auth_html", ["html","header_html","verify_link_endpoint","supported_providers_endpoint","PROVIDERS","auth_path","ASSETS_BASE_URL"], function(html,header_html,verify_link_endpoint,supported_providers_endpoint,PROVIDERS,auth_path,ASSETS_BASE_URL){return(
({
  me,
  app_logo,
  app_name,
  redirect_uri,
  client_id,
  state,
  scope = "email pic",
  profiles,
  last_refresh = "unknown",
  gpg_challenges = [{
    profile: "?",
    challanges: html`<p>TODO gpg_challenges</p>`
  }]
} = {}) => {
  const display_url = (url) => url
  if (!app_name) app_name = client_id
  let display_name;
  if (client_id && display_url(client_id) === display_url(app_name)) {
    display_name = html`<a href="${client_id}">${app_name}</a>`
  } else if(client_id) {
    display_name  = html`<a href="${client_id}">${app_name}</a> (${display_url(client_id)})`
  } else {
    display_name = app_name
  }

  return html`
${header_html()}

<script>
var me = "${me}";
var redirect_uri = "${redirect_uri}";
var client_id = "${client_id}";
var state = "${state}";
var scope = "${scope}";
var email_verification;

function set_provider_status(index, status, error) {
  $("#profile_"+index+" .status_img").addClass(status).removeClass("loading");
  if(error) {
    $("#profile_"+index+" .status").html(error);
  }
}

function update_progress_bar() {

  // The "success" bar starts out at 15% because 5% is reserved for starting the page and 10% is reserved for loading the links
  var success = ($("#profiles .status_img.verified").length / $("#profiles li").length) * 0.85;
  var warning = ($("#profiles .status_img.unsupported").length / $("#profiles li").length) * 0.85;
  var error = ($("#profiles .status_img.error").length / $("#profiles li").length) * 0.85;

  success = Math.round(success*100);
  warning = Math.round(warning*100);
  error = Math.round(error*100)

  while(success + warning + error > 100) {
    success = success - 1;
  }

  $("#progress_bar .progress-bar-verified").css("width", success+"%");
  $("#progress_bar .progress-bar-info").css("width", warning+"%");
  $("#progress_bar .progress-bar-danger").css("width", error+"%");
}

function complete_progress_bar() {
  $("#progress_bar").removeClass("active");
}

function set_up_email_auth() {
  $(".email-auth").unbind("click").click(function(){
    var btn = $(this);
    var status = $(this).parents('li').children('.status');
    unbind_keyboard_listeners();

    if(btn.text() == "Verify") {
      btn.attr("disabled","disabled");
      status.text("Verifying...");

      $.get(email_verification+"/auth/verify_email.json", {
        me: me,
        profile: $(this).attr('href'),
        code: btn.parent().children('.email_code').val()
      }, function(data){
        if(data.result == "verified") {
          status.text("Code was successfully verified! Redirecting...");
          window.location = data.redirect;
        } else {
          bind_keyboard_listeners();
          btn.parent().children('input[type=text]').val('');
          btn.text()
          status.text("The code you entered did not match, or the code expired.");
        }
      });
    } else {
      btn.attr("disabled","disabled");
      status.text("Sending verification code...");

      $.get("/auth/send_email.json", {
        me: me,
        profile: btn.attr('href'),
        redirect_uri: redirect_uri
      }, function(data){
        if(data.result == "sent") {
          email_verification = data.verify;
          // Swap the button for a field to enter the code
          btn.text("Verify").removeAttr("disabled").addClass("pending");
          status.text("Sent! Enter the verification code you received above.");
          btn.parent().prepend('<input type="text" id="email_code_input" class="span1 email_code">')
          $("#email_code_input").focus();
          $("#email_code_input").on('keydown', function(e){
            if(e.keyCode == 13) {
              $(".email-auth.pending").click();
            }
          });
        }
      });
    }
    return false;
  });
}

function set_up_gpg_auth() {
  var plaintext;

  $(".gpg-auth").unbind("click").click(function(){
    var btn = $(this);

    $("#gpg-popup .btn-primary").attr("disabled", "disabled");
    $("#gpg-popup .alert").html("Loading...").removeClass("alert-error").show();
    $("#gpg-popup .signature").removeAttr("disabled").val("");
    $("#gpg-popup .plaintext").val("");
    $("#gpg-popup .fields").hide();
    show_gpg_popup();
    unbind_keyboard_listeners();

    // Check the page to see if there is a challenge pre-generated
    var challenge;
    var profile_url = btn.attr('href');
    if(challenge=$(".gpg_challenge[data-profile='"+profile_url+"']").text()) {
      plaintext = challenge;
      $("#gpg-popup .signature").val(plaintext).removeAttr("disabled");
      $("#gpg-popup .plaintext").val(plaintext);
      $("#gpg-popup .btn-primary").removeAttr("disabled");
      $("#gpg-popup .alert").html("").removeClass("alert-error").hide();
      $("#gpg-popup .fields").show();
      show_gpg_popup();
      $("#gpg-popup .signature").focus();
    } else {
      $.post("/auth/start_gpg.json", {
        me: me,
        profile: btn.attr('href'),
        redirect_uri: redirect_uri,
        client_id: client_id,
        scope: scope,
        state: state
      }, function(data){
        if(data.plaintext) {
          plaintext = data.plaintext;
          $("#gpg-popup .signature").val(data.plaintext).removeAttr("disabled");
          $("#gpg-popup .plaintext").val(data.plaintext);
          $("#gpg-popup .btn-primary").removeAttr("disabled");
          $("#gpg-popup .alert").html("").removeClass("alert-error").hide();
          $("#gpg-popup .fields").show();
          show_gpg_popup();
          $("#gpg-popup .signature").focus();
        } else if(data.error) {
          $("#gpg-popup .alert").html(data.error_description).addClass("alert-error");
          show_gpg_popup();
        } else {
          $("#gpg-popup .alert").html("An unknown error occurred").addClass("alert-error");
          show_gpg_popup();
        }
      });
    }

    return false;
  });
  $("#gpg-popup .btn-primary").unbind("click").click(function(){
    $("#gpg-popup .btn-primary").attr("disabled", "disabled");
    $("#gpg-popup .signature").attr("disabled", "disabled");
    $("#gpg-popup .alert").html("Verifying...").removeClass("alert-error").show();
    show_gpg_popup();
    $.post("/auth/verify_gpg.json", {
      signature: $("#gpg-popup .signature").val(),
      plaintext: $("#gpg-popup .plaintext").val()
    }, function(data) {
      if(data.error) {
        $("#gpg-popup .btn-primary").removeAttr("disabled");
        $("#gpg-popup .signature").removeAttr("disabled").val(plaintext);
        if(data.error_description) {
          $("#gpg-popup .alert").html(data.error_description).addClass("alert-error").show();
        } else {
          $("#gpg-popup .alert").html("The signature could not be verified!").addClass("alert-error").show();
        }
        show_gpg_popup();
      } else {
        $("#gpg-popup .alert").html("Success! Redirecting...").addClass("alert-success").show();
        $("#gpg-popup .fields").hide();
        show_gpg_popup();
        window.location = data.redirect_uri;
      }
    });
  });
  $("#gpg-popup .btn-cancel").unbind("click").click(function(){
    $("#gpg-popup .signature").val("");
    $("#gpg-popup .plaintext").val("");
    $("#gpg-popup").hide();
    bind_keyboard_listeners();
  });
}

function show_gpg_popup() {
  $("#gpg-popup").show();
  $("#gpg-popup .in").css("height", $("#gpg-popup form").height()+"px");
  $("#gpg-popup").css("left", ($(window).width()/2) - ($("#gpg-popup").width()/2)+"px");
}

function verify_link_back(me, link, i, use_cached) {

  // Don't make an HTTP request for links we already know aren't valid providers
  /*
  if(link.provider == null) {
    set_provider_status(i, 'unsupported', 'This is not a supported authentication provider.');
    provider_verification_finished();
    return;
  }*/

  // Don't need to verify email links, provide the buttons immediately
  if(link.provider == 'email') {
    var email = link.profile.replace(/mailto:/,'');
    $("#profile_"+i+" .link").html('<a href="'+link.profile+'" class="btn btn-success email-auth begin-auth">'+email+'</a>');
    set_provider_status(i, 'verified', 'Receive a verification code via email');
    set_up_email_auth();
    provider_verification_finished();
    return;
  }

  if(link.provider == 'gpg') {
    var display = link.profile.replace(/https?:\/\//, '');
    $("#profile_"+i+" .link").html('<a href="'+link.profile+'" class="btn btn-success gpg-auth begin-auth">'+'GPG ('+display+')'+'</a>');
    set_provider_status(i, 'verified', 'Click to sign a challenge with your GPG key.');
    set_up_gpg_auth();
    provider_verification_finished();
    return;
  }

  var profile = $("#profile_"+i);

  if(use_cached) {
    if(profile.data('provider') == 'email') {
      return;
    }

    update_provider_status(link, {
      verified: profile.data('verified'),
      provider: profile.data('provider'),
      error: false,
      auth_path: profile.data('auth-path')
    }, profile.attr('id').split('_')[1]);

  } else {
    if(link.verified && link.auth_path) {
      update_provider_status(link, link, i);
    } else {
      // Verify the url links back to the rel="me" link specified
      $.get("${verify_link_endpoint.href}", {
          me: me,
          profile: link.profile,
          client_id: "${client_id}",
          state: "${state}",
          scope: "${scope}"
        },
        function(data){
          update_provider_status(link, data, i);
        }
      );
    }
  }
}

function update_provider_status(link, data, i) {
  if(data.error == "unsupported_provider") {
    set_provider_status(i, 'unsupported', 'This is not a supported authentication provider.');
  } else if(data.verified && data.auth_path) {
    var href = data.auth_path+'&redirect_uri='+encodeURIComponent(redirect_uri);
    var display_text;
    if(data.provider == 'indieauth') {
      msg = 'Ok! Click to authenticate using your IndieAuth server.';
      display_text = 'IndieAuth';
    } else {
      msg = 'Ok! Click to authenticate using this provider.';
      display_text = link.profile.replace(/^(https|http):\/\//, "");
    }
    set_provider_status(i, 'verified', msg);
    $("#profile_"+i+" .link").html('<a href="'+href+'" class="btn btn-success">'+display_text+'</a>');
  } else if(data.verified && !data.auth_path) {
    var display_text;
    msg = 'Ok! this profile is linked to your identity';
    display_text = link.profile.replace(/^(https|http):\/\//, "");
    set_provider_status(i, 'info', msg);
    $("#profile_"+i+" .link").html(display_text);
  } else if(data.error) {
    var message;
    if(data.error_description) {
      if(data.error_description == 'This auth server cannot be used to authenticate to itself') {
        $("#profile_"+i).hide();
      } else {
        message = data.error_description;
      }
    } else {
      message = 'There was an error verifying this provider. Confirm you have a rel="me" link on this site pointing to your website.';
    }
    set_provider_status(i, 'error', message);
  } else {
    set_provider_status(i, 'error', 'An unknown error occurred with this provider.');
  }

  provider_verification_finished();
}

function provider_verification_finished() {

  if($("#profiles .status_img.verified").length == 0 && $("#profiles .status_img.loading").length == 0) {
    $(".loading_message").hide();
    $(".unsupported_links_error").show();
  } else {
    $("#num_providers").html($("#profiles .status_img.verified").length);
    $(".unsupported_links_error").hide();
    $(".loading_message").hide();
    $(".continue_message").show();
  }
  update_progress_bar();

  // Check if all the providers are done being checked, if so, verify there is at least one valid one
  if($("#profiles .status_img.loading").length == 0) {
    $(".continue_message .rescan-button").show();
    complete_progress_bar();
  } else {
    $(".continue_message .rescan-button").hide();
  }
}

function selected_profile() {
  var selected = $("#profiles li.selected");
  if(selected.length > 0) {
    return $(selected[0]);
  } else {
    return false;
  }
}

function bind_keyboard_listeners() {
  $("body").keydown(function(e) {
    switch(e.keyCode) {
      case 74: // j
        if(selected_profile() == false) {
          // If none is selected yet, select the first
          $($("#profiles li")[0]).addClass("selected");
        } else {
          // Find the ID of this element, then set the next element to "selected"
          var index = parseInt(selected_profile().attr("id").match(/_(\d+)/)[1]);
          $("#profiles li").removeClass("selected");
          if($("#profile_"+(index+1)).length == 0) {
            index = -1;
          }
          $("#profile_"+(index+1)).addClass("selected");
        }
        break;

      case 75: // k
        if(selected_profile() == false) {
          // If none is selected yet, select the last
          var profiles = $("#profiles li");
          $(profiles[profiles.length-1]).addClass("selected");
        } else {
          // Find the ID of this element, then set the previous element to "selected"
          var index = parseInt(selected_profile().attr("id").match(/_(\d+)/)[1]);
          $("#profiles li").removeClass("selected");
          if($("#profile_"+(index-1)).length == 0) {
            index = $("#profiles li").length;
          }
          $("#profile_"+(index-1)).addClass("selected");
        }

        break;
      case 13: // enter
        if(selected_profile() !== false) {
          // click the thing inside
          $("#profiles li.selected a, #profiles li.selected .begin-auth")[0].click();
        } else {
          // nothing selected but they pressed enter, so sign in with the first
          $($("#profiles li")[0]).addClass("selected");
          $("#profiles li.selected a, #profiles li.selected .begin-auth")[0].click();
        }
        break;
    }
  });
}
function unbind_keyboard_listeners() {
  $("body").unbind("keydown");
}

$(function(){
  $("#progress_bar .progress-bar").tooltip({placement: "bottom"});
  update_progress_bar();

  bind_keyboard_listeners();

  start_scan();

  $(".rescan-button").click(function(){
    // Erase all existing profiles
    $("#profiles li").remove();

    // Re-set the notices
    $("#progress_bar .progress-bar-loading").css("width", "5%");
    $("#progress_bar .progress-bar-verified").css("width", "0");
    $("#progress_bar .progress-bar-info").css("width", "0");
    $("#progress_bar .progress-bar-danger").css("width", "0");
    $("#progress_bar").show();

    $(".loading_message").show();

    $(".no_links_error").hide();
    $(".unsupported_links_error").hide();
    $(".continue_message").hide();

    $(".last-refresh").html("");

    // Start a new scan
    start_scan();
  });

});

function start_scan() {
  // Returning users will have a bunch of profiles already written to the HTML
  if($("#profiles li").length > 0) {
    // Skip loading links
    $("#progress_bar .progress-bar-loading").css("width", "15%");
    update_progress_bar();

    // Run the "verify" function which will set up the JS hooks and add the buttons
    // for email profiles, but set to "use_cached" to avoid making HTTP requests
    $("#profiles li").each(function(){
      verify_link_back(me, {
        profile: $(this).data('profile'),
        verified: $(this).data('verified'),
        provider: $(this).data('provider')
      }, $(this).attr('id').split('_')[1], true);
    });
  } else {
    $.get("${supported_providers_endpoint.href}", {me: me, client_id: "${client_id}", state: "${state}"}, function(data){
      if(data && data.links && data.links.length > 0) {
        $("#progress_bar .progress-bar-loading").css("width", "15%");
        var template = $('#profile_link_template').html();
        $(data.links).each(function(i, link){
          var index = i;
          var formatted_link = link.profile.replace(/^https?:\/\//, "");

          $("#profiles").append(Mustache.to_html(template, {link: formatted_link, index: i}));

          verify_link_back(me, link, i);
        });
      } else {
        $("#progress_bar").hide();
        $(".loading_message").hide();
        if(data && data.error_description) {
          $(".no_links_error .message").text(data.error_description);
        }
        $(".no_links_error").show();
      }
    });
  }
}

</script>

<div class="wrapper">

  ${scope ? html`
    <div class="app-name">
      ${app_logo ? html`
        <img src="${app_logo}" style="float: left; margin-right: 6px; height: 40px;">
      ` : null}
      <h3 style="padding-top: 6px;">Allow <a href="${client_id}">${app_name}</a> access to ${ display_url(me)}?</h3>
    </div>
    <div style="clear:both; margin-bottom:10px;"></div>

    <div class="continue_message" style="display: none;">
      <p>The app <b>${client_id}</b> would like to access your site, <b>${me}</b></p>

      ${scope ? html`
        <p>The app is requesting the following <a href="https://indieweb.org/scope">scopes</a>:<br>
          <ul>
            ${scope.split(' ').map(s => html`<li>
              ${s === 'observablehq.com'
                ? html`The URLs of your <a href="https://observablehq.com">observablehq.com</a> profiles`
                : s}
            </li>`)}
          </ul>
        </p>` : null
      }
      <p>Authenticate using one of the methods below to approve this request.</p>
    </div>`
  : html`
    <div class="app-name">
      ${app_logo ? html`
        <img src="${app_logo}" style="float: left; margin-right: 6px; height: 40px;">
      ` : null}
      <h3 style="padding-top: 6px;">Sign in to ${display_name}</h3>
    </div>
    <div style="clear:both; margin-bottom:10px;"></div>
    <p>Authenticate using one of the methods below to sign in as ${me}</p>
  `}

  <div class="loading_message">
    <div class="alert alert-info">Finding rel="me" links on ${me}</div>
  </div>

  <div class="no_links_error" style="display: none;">
    <div class="alert alert-error">
      <span class="message">No rel="me" links were found on your site!</span>
      <a class="rescan-button" href="#" style="float:right;"><i class="icon-retweet"></i> Refresh</a>
    </div>
  </div>
  <div class="unsupported_links_error" style="display: none;">
    <div class="alert alert-error">
      No supported links were found on your site!
      <a class="rescan-button" href="#" style="float:right;"><i class="icon-retweet"></i> Refresh</a>
    </div>
  </div>
  <div class="continue_message" style="display: none;">
    <div class="alert alert-success">
      <span id="num_providers">1</span> supported and verified authentication providers were found!
      <a class="rescan-button" href="#" style="float:right;"><i class="icon-retweet"></i> Refresh</a>
      <span class="last-refresh">${(me ? last_refresh : '')}</span>
    </div>
  </div>

  <div id="progress_bar" class="progress active">
    <div class="progress-bar progress-bar-success progress-bar-loading" style="width: 5%;" rel="tooltip" title="Loaded links from your site"></div>
    <div class="progress-bar progress-bar-success progress-bar-verified" style="width: 0%;" rel="tooltip" title="Verified profiles"></div>
    <div class="progress-bar progress-bar-info" style="width: 0;" rel="tooltip" title="Unsupported providers"></div>
    <div class="progress-bar progress-bar-danger" style="width: 0;" rel="tooltip" title="Error verifying provider"></div>
  </div>

  <ul id="profiles">
    ${/*
      # If they are a returning visitor, the database already has their list of profiles. Populate with that now.
      # The database will only return URLs that are valid providers, not the complete list of rel-me links on the person's site.*/undefined
    }
    ${profiles.map((profile,i) => {
      if (redirect_uri === 'totp' && profile['provider'] === 'totp') return undefined
      return html`<li class="profile ${profile['provider']}"
                      id="profile_${i}"
                      data-profile="${profile['href']}"
                      data-verified="true"
                      data-provider="${profile['provider']}"
                      data-auth-path="${PROVIDERS[profile['provider']].auth
                        ? auth_path(profile['provider'], profile['href'], me, client_id, state, scope)
                        : false
                      }"
                    >
                    <span class="status_img ${profile['provider'] !== 'observable' ? 'verified': 'info'}"></span>
                    <span class="link">${profile['href']}</span>
                    <div class="status">Verifying...</div>
                  </li>`
    
    })}
  </ul>

  <div class="no_links_error" style="display: none;">
    <p>
      Add links to your homepage to guide to login process
    </p>
    <p>
      Get help from the <a href="https://observablehq.com/@endpointservices/login-wizard">Identity Wizard</a   
    </p>
  </div>
  <div class="unsupported_links_error" style="display: none;">
    <p>
      Add links to your homepage to guide to login process
    </p>
    <p>
      Get help from the <a href="https://observablehq.com/@endpointservices/login-wizard">Identity Wizard</a   
    </p>
  </div>
  ${!client_id ?
    html`
    <div class="continue_message" style="display: none;">
      <p>Click on one of the highlighed providers above to authenticate. The site you are logging in to will not have access to your account on any of the providers.</p>

      ${ redirect_uri ? html`
        <div class="redirect">You will be redirected to ${redirect_uri} to finish logging in to the site.</div>`: null
       }
    </div>
  `: html`
    ${ redirect_uri ? html`
        <div class="redirect">You will be redirected to ${redirect_uri} to finish logging in to the site.</div>`: null
       }
  `}

</div>

<div id="gpg-popup"><div class="in">
  <form>
    <div class="title">PGP Verification</div>
    <div class="error">
      <div class="alert" style="margin-bottom: 0;">Loading...</div>
    </div>
    <div class="fields">
      <label for="signature">Sign this text with your private key</label>
      <textarea rows="6" name="signature" class="signature"></textarea>
    </div>
    <div class="form-actions">
      <button type="button" class="btn btn-primary">Verify</button>
      <button type="button" class="btn btn-cancel">Cancel</button>
    </div>
    <input type="hidden" class="plaintext">
  </form>
</div></div>

${ (gpg_challenges || []).map(challenge => html`
  <div style="display:none;"
       class="gpg_challenge"
       data-profile="${challenge['profile']}">
    ${ challenge['challenge']}
  </div>
`)}

<div style="display:none;">
<img src="${ASSETS_BASE_URL}/img/profile-verified.png") />
<img src="${ASSETS_BASE_URL}/img/profile-unsupported.png") />
<img src="${ASSETS_BASE_URL}/img/profile-error.png") />
</div>

<script id="profile_link_template" type="text/template">
<li class="profile" id="profile_{{index}}">
  <span class="status_img loading"></span>
  <span class="link">{{link}}</span>
  <div class="status">Verifying...</div>
</li>
</script>
<style type="text/css">

  #gpg-popup {
    display: none;
    position: fixed;
    top: 70px;
    left: 30px;
    border: 6px rgba(80,80,80,0.8) solid;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  #gpg-popup .in {
    background: white;
    display: block;
    width: 400px;
    height: 300px;
  }
  #gpg-popup .title {
    text-align: center;
    background: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    padding: 6px;
    font-weight: bold;
    font-size: 22px;
    color: #444;
  }
  #gpg-popup .fields {
    padding: 6px;
  }
  #gpg-popup textarea {
    width: 374px;
  }
  #gpg-popup .alert {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }

  .wrapper {
    width: 500px;
    margin: 20px auto;
  }

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #444;
  }

  ul#profiles {
    list-style-type: none;
  }

  .alert {
    padding-right: 17px;
  }

  .status_img {
    width: 16px;
    height: 16px;
    display: inline-block;
  }
  .status_img.loading {
    background-image: url(${ASSETS_BASE_URL}/img/loading.gif);
  }
  .status_img.verified {
    background-image: url(${ASSETS_BASE_URL}/img/profile-verified.png);
  }
  .status_img.unsupported {
    background-image: url(${ASSETS_BASE_URL}/img/profile-unsupported.png);
  }
  .status_img.error {
    background-image: url(${ASSETS_BASE_URL}/img/profile-error.png);
  }

  .continue_message .last-refresh {
    font-style: italic;
    float: right;
    margin-right: 10px;
  }

  #profiles .status {
    margin-left: 20px;
    color: #999;
  }

  .profile.selected {
    background-color: #ffffcc;
  }
</style>`
}
)});
  main.variable(observer("success_html")).define("success_html", ["html","header_html","ASSETS_BASE_URL"], function(html,header_html,ASSETS_BASE_URL){return(
({
  domain = "domain"
} = {}) => html`
${header_html()}
<div class="hero-unit">
  <h1>You Successfully Authenticated!</h1>
</div>

<div class="container">

  <div class="row" style="margin-bottom: 50px;">
    <div class="col-lg-12">
      <h2 style="text-align: center;">Congrats! You've successfully authenticated as <b>${domain}</b></h2>
    </div>
  </div><!-- row -->

  <div class="section">
  <div class="row">

    <div class="col-lg-4">
      <h3>What's Next?</h3>
      <p><a href="/developers">Create a sign-in form</a> to use IndieAuth.com to sign people in on your website.</p>
    </div>

    <div class="col-lg-4">
      <h3>Add more authentication providers</h3>
      <p>Try adding an email address or PGP key to your website to avoid using a third-party OAuth provider when signing in.</p>
      <p>Install an IndieAuth server such as <a href="https://github.com/barryf/acquiescence">Acquiescence (Ruby)</a> or <a href="https://github.com/Inklings-io/selfauth">SelfAuth (PHP)</a>, or <a href="https://indieweb.org/authorization-endpoint">build your own</a>!</p>
    </div>

    <div class="col-lg-4">
      <h3>Join the Community</h3>
      <ul>
        <li>Attend <a href="https://indieweb.org/events">an IndieWebCamp event</a></li>
        <li><a href="https://indieweb.org/discuss">Join the chat</a> and add yourself to <a href="https://indieweb.org/irc-people">irc-people</a></li>
      </ul>

      <a class="img-thumbnail" href="https://indieweb.org/"><img src="${ASSETS_BASE_URL}/img/wiki-button.png" width="100" height="100" /></a>
      <a class="img-thumbnail" href="https://github.com/aaronpk/IndieAuth.com"><img src="${ASSETS_BASE_URL}/img/github-button.png" width="100" height="100" /></a>
      <a class="img-thumbnail" href="http://twitter.com/Indie_Auth"><img src="${ASSETS_BASE_URL}/img/twitter-button.png" width="100" height="100" /></a>
    </div>

  </div><!-- row -->
  </div><!-- section -->

</div><!-- container -->`
)});
  main.variable(observer("success_endpoint")).define("success_endpoint", ["deploy","success_html"], function(deploy,success_html){return(
deploy("success_endpoint", (req, res) => res.send(success_html().outerHTML))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Utils`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### b64S256 (Base64url Encoding without Padding)

For PKCE code verifier challenges you need this encoding function.

https://tools.ietf.org/html/rfc7636#appendix-A
Also see https://tonyxu-io.github.io/pkce-generator/
`
)});
  main.variable(observer("b64S256")).define("b64S256", function(){return(
async function b64S256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer =  await crypto.subtle.digest("SHA-256", data);
  const b64 = btoa(String.fromCharCode.apply(null, new Uint8Array(hashBuffer))).split('=')[0];
  return b64.replaceAll('+', '-').replaceAll('/', '_')
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### decodeJsonOrForm

Tries to parse a string as JSON and falls back to URL encoded form data if that fails.
`
)});
  main.variable(observer("decodeJsonOrForm")).define("decodeJsonOrForm", ["URLSearchParams"], function(URLSearchParams){return(
function decodeJsonOrForm(text) {
  console.log(text)
  try {
    return JSON.parse(text)
  } catch(err) {
    return Object.fromEntries(new URLSearchParams(text))
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Imports

For security and stability reasons all imports are pinned.
`
)});
  const child2 = runtime.module(define1).derive([{name: "FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", child2);
  main.import("FKEY", child2);
  const child3 = runtime.module(define2);
  main.import("createCustomToken", child3);
  main.import("verifyCustomToken", child3);
  main.import("signinWithAccessToken", child3);
  main.import("getAccessTokenFromServiceAccount", child3);
  const child4 = runtime.module(define3);
  main.import("fetchp", child4);
  const child5 = runtime.module(define4);
  main.import("deploy", child5);
  main.import("getContext", child5);
  const child6 = runtime.module(define5);
  main.import("html", child6);
  const child7 = runtime.module(define6);
  main.import("randomId", child7);
  const child8 = runtime.module(define7);
  main.import("toc", child8);
  const child9 = runtime.module(define8);
  main.import("bannerImage", child9);
  const child10 = runtime.module(define9);
  main.import("footer", child10);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
