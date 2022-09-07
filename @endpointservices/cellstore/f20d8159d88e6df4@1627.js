// https://observablehq.com/@endpointservices/login-with-comment-v2@1627
import define1 from "./7b89ae9baccc7735@92.js";
import define2 from "./6f9a8835280673eb@712.js";
import define3 from "./d84ccee0a2202d45@356.js";
import define4 from "./f92778131fd76559@1174.js";
import define5 from "./4a1fa3c167b752e5@304.js";
import define6 from "./58f3eb7334551ae6@215.js";

async function _1(FileAttachment,md){return(
md`# Login with comment - V2

The simplest way to securely discover the currently logged-in Observablehq user. The flow generates a token you can externally verify for use in backend services. This gives you a way of authenticating within a notebook without involving a 3rd party identity provider

To authenticate, the user writes a code in a publicly visible comment, and thus we can link the session with an Observable identity.

<img width=480px src="${await FileAttachment(
  "ezgif.com-gif-maker.webp"
).url()}"></img>

The returned payload is a Firebase Auth user, signed-in using a [custom token](https://firebase.google.com/docs/auth/admin/create-custom-tokens). Thus, the login persists across browser sessions. The host Firebase project is *"endpointserviceusers"*. If you only need to know the logged-in user id you can verify these tokens without special access to *"endpointserviceusers"* using verifyIdToken from  [@tomlarkworthy/firebase-admin](/@tomlarkworthy/firebase-admin).

<aside style="background-color: #EFF;padding: 15px; font-style: italic; border-radius:10px;">
  ${md`V2 improves on V1 by 
- migrating to the [Module Firebase SDK](https://observablehq.com/collection/@tomlarkworthy/firebase-modular-sdk) to reduce Javascript bloat. JS has gone from 6.5MB (!) to 960kb.
- The Firebase app is passed via a functional interface rather than being overwritten using "with" syntax which helps with circular references.`}

</aside>

If you want to use the token to access **your own backend** Firebase functionality, you should pass in a custom _prepareBackendURL_ and _verifyBackendURL_. An example is done [here](https://observablehq.com/@endpointservices/endpoint-login-with-comment-v2).

Overall this is like an OAuth client.

Import with

~~~js
  import {viewof user} from '@endpointservices/login-with-comment-v2'
~~~

Instantiate the login prompt with

~~~js
  viewof user
~~~

a minimal working example in a 3rd party notebook is [here](https://observablehq.com/@tdlgkjfhdljovtttqrzu/login-with-comment-example).
`
)}

function _2(md){return(
md`### Change Log
- 2022-08-24: API change, pass in the firebase app to avoid using "with" syntax to set configuration
- 2022-08-24: Removed backend implementation, instead reuse V1 endpoints (reducing scope and dependency count)
- 2022-08-23: Migrate to Firebase Modular SDK to reduce JavaScript bloat
- ⚠️ BREAKING CHANGE -- New notebook https://observablehq.com/@endpointservices/login-with-comment-v2
- 2022-07-24: Synchronize independent login states using authStateListener, so logout on one buttons propogates to all log-with-comments
- 2021-08-29: Scan for team membership feature. Looks at profile URLs and adds to JWT's additionalClaims`
)}

function _5(md){return(
md`## <span style="font: var(--mono_fonts); font-size: 30px;"><span style="color: var(--syntax_keyword)">viewof</span> user</span>`
)}

function _createLogin(getAuth,html,viewroutine,$0,onAuthStateChanged,screen,Event,ask,md,signOut,randomId,hash,prepare,FileAttachment,verify,signInWithCustomToken){return(
({
  firebaseApp, // Firebase project app that owns the users
  prepareBackendURL = "https://webcode.run/observablehq.com/@endpointservices/login-with-comment;prepare",
  verifyBackendURL = "https://webcode.run/observablehq.com/@endpointservices/login-with-comment;verify"
} = {}) => {
  const auth = getAuth(firebaseApp);
  // When no-one is logged in we want don't want the cell to resolve, so we return a promise
  // We want that promise to be resolved next time we get a value
  let firstResolve;
  const updateResult = () => {
    const newValue = auth.currentUser;
    if (firstResolve) {
      firstResolve(newValue);
    }
    if (!newValue) {
      if (!firstResolve)
        userUi.value = new Promise((resolve) => (firstResolve = resolve));
      else userUi.value = undefined;
    } else {
      userUi.value = newValue;
    }
    userUi.dispatchEvent(
      new CustomEvent("input", {
        bubbles: true,
        detail: {
          user: userUi.value || null
        }
      })
    );
  };

  const userUi = html`<span>${viewroutine(async function* () {
    let response;
    let err = "";
    const actionWas = (action) => response && response.actions.includes(action);

    // On a new page refresh the currentUser is unknown and we have to listen to the auth state change to discover
    // the initial state. This article explains it well
    // https://medium.com/firebase-developers/why-is-my-currentuser-null-in-firebase-auth-4701791f74f0
    if (!$0.value) {
      let ready = null;
      const isReady = new Promise((resolve) => (ready = resolve));
      onAuthStateChanged(auth, ready);
      await isReady;
      $0.value = true;
    }
    await new Promise((r) => r()); // micro tick so userUi initializes

    while (true) {
      try {
        // update overall view state
        updateResult();

        if (!auth.currentUser) {
          const loginUi = screen({
            auth,
            actions: ["login"]
          });

          // We need to see if someone logs in via a side channel
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user)
              loginUi.dispatchEvent(new Event("input", { bubbles: true }));
          });
          response = yield* ask(loginUi);
          unsubscribe();
        } else {
          const logoutUi = screen({
            auth,
            actions: ["logout"]
          });
          // We need to see if someone logout ivia a side channel
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user)
              logoutUi.dispatchEvent(new Event("input", { bubbles: true }));
          });
          response = yield* ask(logoutUi);
          unsubscribe();
        }

        if (actionWas("logout")) {
          console.log("Logging out");
          yield screen({
            auth,
            info: md`Logging out...`
          });
          await signOut(auth);
        }

        if (actionWas("login")) {
          console.log("login");
          const privateCode = randomId(64);
          const publicCode = await hash(privateCode);

          yield screen({
            auth,
            info: md`Preparing...`
          });

          await prepare(publicCode, prepareBackendURL);

          let relmeauth = false;
          while (!auth.currentUser) {
            while (!actionWas("verify")) {
              console.log("prompt verify");
              response = yield* ask(
                screen({
                  auth,
                  info: md`1.  ${err}Add a comment containing **${publicCode}** to this notebook using the cell burger menu to the left.
2.  Click login to complete login.

<img width=300px src="${await FileAttachment(
                    "ezgif.com-gif-maker.webp"
                  ).url()}"></img>

  \n⚠️ Logging in discloses your [Observable](https://observablehq.com/) username to the notebook author.
                          ${actionWas("copy") ? "\ncopied to clipboard" : ""}`,
                  actions: ["copy", "verify"],
                  toggles: [
                    {
                      code: "profile_relmeauth",
                      label: html`[optional] scan for teams?`,
                      value: relmeauth,
                      caption: html`<details class='e-info' style="display: inline-block;font-size: 14px;"><summary>how does scanning work?</summary>
      ${md`From your Observablehq profile URL we look for weblinks to team profile URLs, and if those profile URLs also weblink to your profile URL we consider you to have admin access for that team (see [relmeauth](https://observablehq.com/@endpointservices/auth#observable_features))`}
    </details>`
                    }
                  ]
                })
              );

              if (actionWas("copy")) {
                navigator.clipboard.writeText(
                  "public auth code: " + publicCode
                );
              }

              relmeauth = response.profile_relmeauth === true;
            }

            console.log("Relmeauth scan?", relmeauth);

            response = undefined;
            console.log("verify");
            yield screen({
              auth,
              info: md`Checking...`
            });

            try {
              const verification = await verify({
                verifyBackendURL,
                notebookURL: html`<a href=""/>`.href.split("?")[0],
                privateCode,
                relmeauth
              });
              if (verification.access_token) {
                await signInWithCustomToken(auth, verification.access_token);
              } else {
                debugger;
                throw new Error("no token returned");
              }
            } catch (error) {
              debugger;
              err = `<mark>⚠️ ${error.message}</mark>\n\n`;
            }
          }
        }
      } catch (err) {
        yield* ask(
          screen({
            auth,
            info: md`Uexpected error: ${err.message}`,
            actions: ["ok"]
          })
        );
      }
    }
  })}`;

  return userUi;
}
)}

function _user(createLogin,initializeApp){return(
createLogin({
  firebaseApp: initializeApp({
    apiKey: "AIzaSyBquSsEgQnG_rHyasUA95xHN5INnvnh3gc",
    authDomain: "endpointserviceusers.firebaseapp.com",
    projectId: "endpointserviceusers",
    appId: "1:283622646315:web:baa488124636283783006e"
  })
})
)}

function _8(md){return(
md`
#### Security Features
- the published auth code is a hash of a private verification code => the auth code in isolation is not useful.
- auth code validity is bounded at 10 minutes

#### Current issues
- logout does not return to undefined state (Observablehq bug? see https://talk.observablehq.com/t/unresolving-a-viewof-after-it-has-resolved-once/5450), for now we return undefined`
)}

function _authStateKnown(){return(
false
)}

function _10(md){return(
md`### <span style="font: var(--mono_fonts); font-size: 25px;">user</span>

The cell resolves to the *currentUser* or a promise if not logged in. See below for the value in action
`
)}

async function _11(md,user){return(
md`Hi **${user.uid}** you have an id_token 

~~~ 
   ${await user.getIdToken()}
~~~

that you can decode with **'verifyIdToken'**, in [firebase-admin](https://observablehq.com/@tomlarkworthy/firebase-admin)

`
)}

function _12(md){return(
md`## Team support

If the scan of team feature is checked, the verifier will look for cross-linked observablehq profile accounts stemming from the user's profile. 

For example, say we want @tomlarkworthy to administer @endpointservices, then

- https://observablehq.com/@tomlarkworthy?tab=profile should have a website link to https://observablehq.com/@endpointservices 
- https://observablehq.com/@endpointservices?tab=profile should have a weblink to https://observablehq.com/@tomlarkworthy

If this is the case then the "observablehq.com" section of the JWT will have "admin" entries for keys "tomlarkworthy" and "endpointservices" after "tomlarkworthy" logs in.

These claims can then be used to gate access in Firebase services, so team mebers will be able to configure common data. To check for membership

In a Firestore rules you can use something like:

~~~
    match /collection/{teamdoc} {
    	allow read: if request.auth.token['observablehq.com'][teamdoc] == 'admin';
    }
~~~

and then tomlarkworthy will be able to access both \`/collection/tomlarkworthy\` and \`/collection/endpointservices\` docs in Firestore.

In Firebase Realtime Database complex tokens are not supported so we encode the claims in a single string with each identity framed with "|". So you can check for membership like so:

~~~
  "$teamdoc": {
    ".read": "auth.token.observablehq_com.contains('|' + $teamdoc + '|')"
  }
~~~

(note the claim key is different too)
`
)}

function _13(md){return(
md`#### User Firebase

The user Firebase hosts the Firebase Auth data, it can be the same as the infra Firebase.
`
)}

function _14(md){return(
md`## Design`
)}

function _chatIcon(svg){return(
svg`<svg width="29px" height="23px" viewBox="0 0 29 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Serverless-cells" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="login-with-comment" transform="translate(-48.000000, -108.000000)" stroke="#FDF7E6" stroke-width="3">
            <g id="chat-icon" transform="translate(50.000000, 110.000000)">
                <path d="M23.6369696,18.3862833 L24,19 L24,19 L9.5,19 C4.25329488,19 6.42536064e-16,14.7467051 0,9.5 C-6.42536064e-16,4.25329488 4.25329488,9.63804095e-16 9.5,0 L14.2282774,0 C18.6551849,-8.13209705e-16 22.2439024,3.58871755 22.2439024,8.015625 L22.2439024,13.295045 C22.2439024,15.0862605 22.7250191,16.8445961 23.6369696,18.3862833 Z" id="Path-10"></path>
                <line x1="5.3" y1="6.5" x2="13.7" y2="6.5" id="Path-9"></line>
                <line x1="5.29545455" y1="12.5" x2="17.7045455" y2="12.5" id="Path-11"></line>
            </g>
        </g>
    </g>
</svg>`
)}

function _copyIcon(svg){return(
svg`<svg width="18px" height="22px" viewBox="0 0 18 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Serverless-cells" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="login-with-comment" transform="translate(-299.000000, -107.000000)" stroke="#FDF7E6" stroke-width="2">
            <g id="copyIcon" transform="translate(300.000000, 108.000000)">
                <polygon id="Path-12" stroke-linejoin="round" points="0 17 0 3.4 3.54545455 0 13 0 13 17"></polygon>
                <polyline id="Path-14" stroke-linejoin="round" points="4 17 4 20 16 20 16 4 13 4"></polyline>
                <line x1="3" y1="13" x2="10" y2="13" id="Path-17"></line>
                <line x1="3" y1="4.5" x2="10" y2="4.5" id="Path-15"></line>
                <line x1="3" y1="9" x2="10" y2="9" id="Path-17"></line>
            </g>
        </g>
    </g>
</svg>`
)}

function _colors(){return(
{
  dark: "#4A44C4",
  dark_darker: "#3933A3", 
  dark_darkest: "#2B277C",
  
  light: "#FDF7E6",
  light_darker: "#FBF0D1",
  light_darkest: "#F9E8B8",
  
  alt_light: "#9DE2BF",
  alt_light_darker: "#75D6A5",
  alt_light_darkest: "#4ECB8B",
  
  alt_dark: "#E78AAE",
  alt_darker: "#DE5E90",
  alt_darkest: "#D53472",
}
)}

function _18(button,chatIcon){return(
button({
  action: "login",
  label: "Comment signin",
  icon: chatIcon
})
)}

function _copyExample(button,copyIcon){return(
button({
  action: "copy",
  label: "Copy",
  icon: copyIcon
})
)}

function _20(copyExample){return(
copyExample
)}

function _button(html,Event){return(
({
  action,
  label,
  icon
} = {}) => {
  const btn = html`<button class="a-btn">${icon ? html`<span class="icon">${icon.outerHTML}<span>`: ''}<span class="label">${label}<span></button>`
  btn.onclick = () => {
    btn.value = action;
    btn.dispatchEvent(new Event('input', {bubbles: true}))
  }
  return btn;
}
)}

function _container(view,style){return(
(inner) => {
  return view`<div class='es-frame'>${style()}${['...', inner()]}</div>`
}
)}

function _23(screen){return(
screen
)}

function _style(html,colors){return(
() => html`<style>
  .es-frame {
    font-size: 18px;
    font-family: arial, sans-serif;
    display: inline-block;
    border-radius: 14px;
    padding: 2px;
    border: solid;
    border-width: 4px;
    border-color: ${colors.dark};
    background-color: ${colors.light};
    box-shadow: 1px 2px 4px #0008;
  } 
  .e-btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  }
  .a-btn {
    font-size: 18px;
    font-family: Arial, sans-serif;
    border: none;
    border-radius: 8px;
    color: ${colors.light};
    background-color: ${colors.dark};
    margin: 2px;
  }
  .a-btn:hover {
    color: ${colors.light_darker};
    background-color: ${colors.dark_darker};
  }
  .a-btn:active {
    color: ${colors.light_darkest};
    background-color: ${colors.dark_darkest};
  }

  .a-btn .icon {
    position: relative;
    top: 4px;
    display: inline-block;
    padding-left: 8px;
  }
  .a-btn .label {
    position: relative;
    display: inline-block;
    padding: 8px;
  }
  .e-info {
    color: #131415;
    padding-left: 4px;
  }
</style>`
)}

function _25(container,htl,button,chatIcon,copyIcon){return(
container(() => htl.html`<div style="width: 400px"> 
  <span class="e-btns">
    ${button({
      action: "login",
      label: "Comment signin",
      icon: chatIcon
    })}${button({
      action: "copy",
      label: "Copy",
      icon: copyIcon
    })}
  </span>
    
  <p class="e-info" style="font-size: 14px;">write a comment containing code <i>'dasdasdasdas'</i> in a comment<br>
  ⚠️ comment not found (try again?)</p>
</span>`)
)}

function _content(copyIcon,chatIcon){return(
{
  labels: {
    copy: "Copy to clipboard",
    login: "Login with comment",
    logout: (auth) =>
      `Logout <b>${auth.currentUser.uid.replace("observablehq|", "")}</b>`,
    verify: "Login"
  },
  icons: {
    copy: copyIcon,
    login: chatIcon
  }
}
)}

function _expandContent(){return(
(auth, val) => (typeof val === "function" ? val(auth) : val)
)}

function _testScreen(screen,html,md){return(
screen({
  info: "Please copy code",
  actions: ["login", "verify"],
  toggles: [
    {
      code: "profile_relmeauth",
      label: html`[optional] scan for teams?`,
      value: true,
      caption: html`<details class='e-info' style="display: inline-block;font-size: 14px;"><summary>how does scanning work?</summary>
    ${md`From your Observablehq profile URL we look for weblinks to team profile URLs, and if those profile URLs also weblink to your profile URL we consider you to have admin access for that team. (related [relmeauth](https://observablehq.com/@endpointservices/auth#observable_features))`}
  </details>`
    }
  ]
})
)}

function _29(testScreen){return(
testScreen
)}

function _screen(container,view,button,expandContent,content,html,stopPropagation,Inputs){return(
({ auth, info, actions = [], toggles = [] } = {}) =>
  container(
    () => view`<div> 
  <span class="e-btns">
    ${[
      "actions",
      actions.map((action) =>
        button({
          action,
          label: expandContent(auth, content.labels[action]),
          icon: content.icons[action]
        })
      )
    ]}
  </span>
${info ? html`<p class="e-info" style="font-size: 14px;">${info}</p>` : ""}
${[
  "...",
  Object.fromEntries(
    toggles.map((toggle) => {
      return [
        toggle.code,
        view`<div>
      <div>${[
        "...",
        stopPropagation(
          Inputs.toggle({ label: toggle.label, value: toggle.value })
        )
      ]}</div>
      <div>${toggle.caption}</div>
    </div>`
      ];
    })
  )
]}
</span>`
  )
)}

function _stopPropagation(view){return(
_view => {
  _view.addEventListener('input', evt => {
    if (evt?.detail?.user === undefined) evt.stopPropagation();
  });
  return view`<span>${['...', _view]}`;
}
)}

function _32(md){return(
md`## Code`
)}

function _runTestsSelector(Inputs){return(
Inputs.toggle({
  label: "run tests?",
  value: window["@endpointservices/healthcheck"]
})
)}

async function _testing(runTestsSelector,invalidation)
{
  if (!runTestsSelector) return invalidation;
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/@tomlarkworthy/testing.js?v=3`)
  ]);
  const module = new Runtime().module(define);
  return Object.fromEntries(
    await Promise.all(
      ["expect", "createSuite"].map((n) => module.value(n).then((v) => [n, v]))
    )
  );
}


function _expect(testing){return(
testing.expect
)}

function _suite(testing){return(
testing.createSuite()
)}

function _37(md){return(
md`### Sketch of operation

- ask: Login with comment?
- login: send PUBLIC 'comment code' to login API (backend records origin notebook and time)
- tell: "Please post code into notebook, and click verify"
- verify: verifies time, comment exists and mints token, user send private KEY
  - failure: time
  - failure: not published
  - so you need to retry
- verify success: show logged in (login name)
- ask: logout?
`
)}

function _38(md){return(
md`#### prepare

Client sends the server the public key, so the server can record the clients intent to initiate a comment login. Client keeps private key secret, so only it can obtain credentials later on.
`
)}

function _prepare(){return(
async (
  publicCode,
  backend = "https://webcode.run/observablehq.com/@endpointservices/login-with-comment;prepare"
) => {
  if (!publicCode) throw new Error("public code required");
  const response = await fetch(`${backend}?code=${publicCode}`);
  if (response.status !== 200)
    throw new Error(`Err ${response.status}, ${await response.text()}`);
  return await response.text();
}
)}

function _prepareOK(suite,randomId,expect,prepare){return(
suite.test("prepare returns 200", async () => {
  const code = randomId(16);
  expect(await prepare(code)).toBe("OK");
})
)}

function _prepareCodeResuse(suite,randomId,prepare){return(
suite.test("prepare codes cannot be reused", async (done) => {
  try {
    const code = randomId(16);
    await prepare(code);
    await prepare(code);
  } catch (err) {
    done() // Test will only resolve it error thrown
  }
})
)}

function _42(md){return(
md`#### findLoginCommentingCode

Finds a username of a person commenting something containing a code on a given notebook URL
`
)}

function _findLoginCommentingCode(getCommentsAndNamespace){return(
async (notebookURL, code) => {
  const { comments, namespace } = await getCommentsAndNamespace(notebookURL);
  if (!comments) return {login: undefined, namespace};
  const comment = comments.find(comment => comment.content.includes(code));
  return { login: comment?.user?.login, namespace };
}
)}

async function _45(html,FileAttachment){return(
html`<img width=300px src="${await FileAttachment(
  "ezgif.com-gif-maker.webp"
).url()}"></img>`
)}

function _findLoginCommentingCodeTest(suite,expect,findLoginCommentingCode){return(
suite.test(
  "findLoginCommentingCode finds a login",
  async () => {
    expect(
      await findLoginCommentingCode(
        "https://observablehq.com/@endpointservices/get-comments",
        "I am leaving a com"
      )
    ).toEqual({ login: "tomlarkworthy", namespace: "endpointservices" });
  }
)
)}

function _findLoginCommentingCodeTest2(suite,expect,findLoginCommentingCode,randomId){return(
suite.test(
  "findLoginCommentingCode returns undefined for no find",
  async () => {
    expect(
      await findLoginCommentingCode(
        "https://observablehq.com/@endpointservices/get-comments",
        randomId()
      )
    ).toEqual({ login: undefined, namespace: "endpointservices" });
  }
)
)}

function _48(md){return(
md`#### verify

Veryify takes a **private key**, SHA256 it, then looks for it in the comments of a provided notebook URL, if found, signs a token that can be used to initiate a Firebase auth session.

Additionally, if *relmeauth* flag is set it also scanes the users profiles pages for backlinked team accounts.
`
)}

function _last_token(){return(
undefined
)}

function _verify($0){return(
async ({
  verifyBackendURL = "https://webcode.run/observablehq.com/@endpointservices/login-with-comment;verify",
  notebookURL,
  privateCode,
  relmeauth = false
} = {}) => {
  if (!privateCode) throw new Error("privateCode required");
  if (!notebookURL) throw new Error("notebookURL required");
  const response = await fetch(
    `${verifyBackendURL}?code=${privateCode}&notebookURL=${encodeURIComponent(
      notebookURL
    )}${relmeauth ? "&relmeauth" : ""}`
  );
  if (response.status === 404)
    throw new Error(`Cannot find notebook... has it been shared?`);
  else if (response.status !== 200) throw new Error(`${await response.text()}`);
  const token = await response.json();
  $0.value = token;
  return token;
}
)}

function _findObservablehqAccounts(randomId,promiseRecursive){return(
async function findObservablehqAccounts(login) {
  // Returns and array of links, including the users self-profile
  // {
  //   profile: "https://observablehq.com/@endpointservices"
  //   provider: "observable"
  //   verified: false
  // }
  const me = `https://observablehq.com/@${login}`;
  const client_id =
    "https://webcode.run/observablehq.com/@endpointservices/login-with-comment";
  const state = randomId();
  const fetchLinks = await fetch(
    `https://webcode.run/observablehq.com/@endpointservices/auth;supported_providers.json?me=${me}&client_id=${client_id}&state=${state}`
  );
  if (fetchLinks.status !== 200)
    throw new Error(
      `Cannot fetch: supported_providers.json ${
        fetchLinks.status
      }: ${await fetchLinks.text()}`
    );
  const links = (await fetchLinks.json()).links;
  const candidateTeams = links.filter((link) => link.provider === "observable");

  const verifications = await promiseRecursive(
    candidateTeams.map(async (link) => {
      const linkResponse = await fetch(
        `https://webcode.run/observablehq.com/@endpointservices/auth;verify_link.json?me=${me}&client_id=${client_id}&state=${state}&profile=${link.profile}`
      );
      if (linkResponse.status !== 200)
        throw new Error(
          `verify_link Error ${
            linkResponse.status
          }: ${await linkResponse.text()}`
        );
      return await linkResponse.json();
    })
  );

  return verifications
    .filter((verification) => verification.verified)
    .map((link) => /^https:\/\/observablehq.com\/@(.*)$/.exec(link.profile)[1]);
}
)}

function _teamScan(suite,expect,findObservablehqAccounts){return(
suite.test("team scan runs", async () => {
  expect(await findObservablehqAccounts("tomlarkworthy")).toContain(
    "tomlarkworthy"
  );
})
)}

function _verifyWithoutPrepare(suite,verify,randomId,expect){return(
suite.test(
  "verify 401 when not prepared",
  async (done) => {
    try {
      await verify({
        notebookURL:
          "https://observablehq.com/@endpointservices/login-with-comment",
        privateCode: randomId()
      });
    } catch (err) {
      expect(err.message).toBe("No code prepared");
      done();
    }
  }
)
)}

function _hash(){return(
async function hash(str) {
  // Similar to b64S256 but smaller and double click only copyable characters
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer =  await crypto.subtle.digest("SHA-256", data);
  const b64 = btoa(String.fromCharCode.apply(null, new Uint8Array(hashBuffer))).split('=')[0];
  return b64.replaceAll('+', /*difference*/ '_').replaceAll('/', '_').substring(0, 20)
}
)}

function _checkIsURL(){return(
function checkIsURL(arg, name) {
  try {
    return new URL(arg).toString()
  } catch (err) {
    throw new Error(`${name || 'arg'} is not a URL`)
  } 
}
)}

function _randomId(){return(
(len = 8) => {
  // From 'https://observablehq.com/@tomlarkworthy/randomid'
  // Avoid / and + and - and _ typof chars seen in base64
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var array = new Uint32Array(len);
  window.crypto.getRandomValues(array);
  return [...array].map((v) => chars[v % chars.length]).join("");
}
)}

function _promiseRecursive(){return(
function promiseRecursive(obj) {
  const getPromises = (obj) =>
    Object.keys(obj).reduce(
      (acc, key) =>
        Object(obj[key]) !== obj[key]
          ? acc
          : acc.concat(
              typeof obj[key].then === "function"
                ? [[obj, key]]
                : getPromises(obj[key])
            ),
      []
    );
  const all = getPromises(obj);
  return Promise.all(all.map(([obj, key]) => obj[key])).then(
    (responses) => (
      all.forEach(([obj, key], i) => (obj[key] = responses[i])), obj
    )
  );
}
)}

function _61(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["ezgif.com-gif-maker.webp", {url: new URL("./files/1b25a5625ca0969979cfcb99d951343a91d6a59d217a101374e1abd1a24138978784e3fcd0abec470a3bd2af53c7d30858abe9874799b40c56e9dd871c84add2.webp", import.meta.url), mimeType: "image/webp", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("onAuthStateChanged", child1);
  main.import("getAuth", child1);
  main.import("signOut", child1);
  main.import("signInWithCustomToken", child1);
  const child2 = runtime.module(define2);
  main.import("initializeApp", child2);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("createLogin")).define("createLogin", ["getAuth","html","viewroutine","mutable authStateKnown","onAuthStateChanged","screen","Event","ask","md","signOut","randomId","hash","prepare","FileAttachment","verify","signInWithCustomToken"], _createLogin);
  main.variable(observer("viewof user")).define("viewof user", ["createLogin","initializeApp"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.define("initial authStateKnown", _authStateKnown);
  main.variable(observer("mutable authStateKnown")).define("mutable authStateKnown", ["Mutable", "initial authStateKnown"], (M, _) => new M(_));
  main.variable(observer("authStateKnown")).define("authStateKnown", ["mutable authStateKnown"], _ => _.generator);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md","user"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("chatIcon")).define("chatIcon", ["svg"], _chatIcon);
  main.variable(observer("copyIcon")).define("copyIcon", ["svg"], _copyIcon);
  main.variable(observer("colors")).define("colors", _colors);
  main.variable(observer()).define(["button","chatIcon"], _18);
  main.variable(observer("viewof copyExample")).define("viewof copyExample", ["button","copyIcon"], _copyExample);
  main.variable(observer("copyExample")).define("copyExample", ["Generators", "viewof copyExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["copyExample"], _20);
  main.variable(observer("button")).define("button", ["html","Event"], _button);
  main.variable(observer("container")).define("container", ["view","style"], _container);
  main.variable(observer()).define(["screen"], _23);
  main.variable(observer("style")).define("style", ["html","colors"], _style);
  main.variable(observer()).define(["container","htl","button","chatIcon","copyIcon"], _25);
  main.variable(observer("content")).define("content", ["copyIcon","chatIcon"], _content);
  main.variable(observer("expandContent")).define("expandContent", _expandContent);
  main.variable(observer("viewof testScreen")).define("viewof testScreen", ["screen","html","md"], _testScreen);
  main.variable(observer("testScreen")).define("testScreen", ["Generators", "viewof testScreen"], (G, _) => G.input(_));
  main.variable(observer()).define(["testScreen"], _29);
  main.variable(observer("screen")).define("screen", ["container","view","button","expandContent","content","html","stopPropagation","Inputs"], _screen);
  main.variable(observer("stopPropagation")).define("stopPropagation", ["view"], _stopPropagation);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof runTestsSelector")).define("viewof runTestsSelector", ["Inputs"], _runTestsSelector);
  main.variable(observer("runTestsSelector")).define("runTestsSelector", ["Generators", "viewof runTestsSelector"], (G, _) => G.input(_));
  main.variable(observer("testing")).define("testing", ["runTestsSelector","invalidation"], _testing);
  main.variable(observer("expect")).define("expect", ["testing"], _expect);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("prepare")).define("prepare", _prepare);
  main.variable(observer("prepareOK")).define("prepareOK", ["suite","randomId","expect","prepare"], _prepareOK);
  main.variable(observer("prepareCodeResuse")).define("prepareCodeResuse", ["suite","randomId","prepare"], _prepareCodeResuse);
  main.variable(observer()).define(["md"], _42);
  const child3 = runtime.module(define3);
  main.import("getCommentsAndNamespace", child3);
  main.variable(observer("findLoginCommentingCode")).define("findLoginCommentingCode", ["getCommentsAndNamespace"], _findLoginCommentingCode);
  main.variable(observer()).define(["html","FileAttachment"], _45);
  main.variable(observer("findLoginCommentingCodeTest")).define("findLoginCommentingCodeTest", ["suite","expect","findLoginCommentingCode"], _findLoginCommentingCodeTest);
  main.variable(observer("findLoginCommentingCodeTest2")).define("findLoginCommentingCodeTest2", ["suite","expect","findLoginCommentingCode","randomId"], _findLoginCommentingCodeTest2);
  main.variable(observer()).define(["md"], _48);
  main.define("initial last_token", _last_token);
  main.variable(observer("mutable last_token")).define("mutable last_token", ["Mutable", "initial last_token"], (M, _) => new M(_));
  main.variable(observer("last_token")).define("last_token", ["mutable last_token"], _ => _.generator);
  main.variable(observer("verify")).define("verify", ["mutable last_token"], _verify);
  main.variable(observer("findObservablehqAccounts")).define("findObservablehqAccounts", ["randomId","promiseRecursive"], _findObservablehqAccounts);
  main.variable(observer("teamScan")).define("teamScan", ["suite","expect","findObservablehqAccounts"], _teamScan);
  main.variable(observer("verifyWithoutPrepare")).define("verifyWithoutPrepare", ["suite","verify","randomId","expect"], _verifyWithoutPrepare);
  main.variable(observer("hash")).define("hash", _hash);
  main.variable(observer("checkIsURL")).define("checkIsURL", _checkIsURL);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  main.import("cautious", child4);
  const child5 = runtime.module(define5);
  main.import("viewroutine", child5);
  main.import("ask", child5);
  main.variable(observer("randomId")).define("randomId", _randomId);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _61);
  return main;
}
