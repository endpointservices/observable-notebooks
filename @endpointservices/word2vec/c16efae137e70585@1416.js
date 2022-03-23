// https://observablehq.com/@endpointservices/login-with-comment@1416
import define1 from "./993a0c51ef1175ea@1343.js";
import define2 from "./d84ccee0a2202d45@255.js";
import define3 from "./f92778131fd76559@1173.js";
import define4 from "./4a1fa3c167b752e5@304.js";
import define5 from "./dff1e917c89f5e76@1711.js";
import define6 from "./316f0885d15ab671@65.js";
import define7 from "./698257e86fae4586@350.js";
import define8 from "./c7a3b20cec5d4dd9@659.js";
import define9 from "./ab3e70b29c480e6d@83.js";
import define10 from "./b8a500058f806a6b@10.js";
import define11 from "./58f3eb7334551ae6@187.js";

async function _1(md,FileAttachment){return(
md`# Login with comment

The simplest way to securely discover the currently logged in user. Furthermore, the result generates a token you can externally verify for use in backend services.

To authenticate, the user just needs to write a code in a publically visible comment.

<img width=480px src="${await FileAttachment(
  "ezgif.com-gif-maker.webp"
).url()}"></img>

The returned payload is a Firebase Auth user, signed in using a [custom token](https://firebase.google.com/docs/auth/admin/create-custom-tokens). Thus, the login persists across browser sessions. The host Firebase project is *"endpointserviceusers"*. If you only need to know the logged in user id you can verify these tokens without special access to *"endpointserviceusers"*.

If you want to use the token to access **your own backend** Firebase functionality, you should fork this notebook and rebase onto your own Firebase projects (see CONFIG section). An example is done [here](https://observablehq.com/@endpointservices/endpoint-login-with-comment).

Overally this is like an Oauth client bit without any params to configure! This should work across all notebook domains.

Import with

~~~js
  import {viewof user, verifyIdToken} from '@endpointservices/login-with-comment'
~~~

Instanciate the login prompt with

~~~js
  viewof user
~~~

a minimal working example in a 3rd party notebook is [here](https://observablehq.com/@tdlgkjfhdljovtttqrzu/login-with-comment-example)
`
)}

function _2(md){return(
md`### Change Log

- 2021-08-29: Scan for team mebership feature. Looks at profile URLs and adds to JWT's additionalClaims`
)}

function _3(md){return(
md`## <span style="font: var(--mono_fonts); font-size: 30px;"><span style="color: var(--syntax_keyword)">viewof</span> user</span>`
)}

function _createLogin(userFirebase,html,viewroutine,$0,ask,screen,md,randomId,hash,prepare,FileAttachment,pbcopy,verify){return(
() => {
  // When no-one is logged in we want don't want the cell to resolve, so we return a promise
  // We want that promise to be resolved next time we get a value
  let firstResolve;
  const updateResult = () => {
    const newValue = userFirebase.auth().currentUser;
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

    // On a new page refresh the currentUser is unkown and we have to listen to the auth state change to discover
    // the initial state. This article explains it well
    // https://medium.com/firebase-developers/why-is-my-currentuser-null-in-firebase-auth-4701791f74f0
    if (!$0.value) {
      let ready = null;
      const isReady = new Promise((resolve) => (ready = resolve));
      userFirebase.auth().onAuthStateChanged(ready);
      await isReady;
      $0.value = true;
    }
    await new Promise((r) => r()); // micro tick so userUi initializes

    while (true) {
      try {
        // update overall view state
        updateResult();

        if (!userFirebase.auth().currentUser) {
          response = yield* ask(
            screen({
              actions: ["login"]
            })
          );
        } else {
          response = yield* ask(
            screen({
              actions: ["logout"]
            })
          );
        }

        if (actionWas("logout")) {
          console.log("Logging out");
          yield screen({
            info: md`Logging out...`
          });
          await userFirebase.auth().signOut();
        }

        if (actionWas("login")) {
          console.log("login");
          const privateCode = randomId(64);
          const publicCode = await hash(privateCode);

          yield screen({
            info: md`Preparing...`
          });

          await prepare(publicCode);

          let relmeauth = false;
          while (!userFirebase.auth().currentUser) {
            while (!actionWas("verify")) {
              console.log("prompt verify");
              response = yield* ask(
                screen({
                  info: md`1.  ${err}Add comment containing **${publicCode}** to this notebook using the cell burger menu to the left.
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
                pbcopy("public auth code: " + publicCode);
              }

              relmeauth = response.profile_relmeauth === true;
            }

            console.log("Relmeauth scan?", relmeauth);

            response = undefined;
            console.log("verify");
            yield screen({
              info: md`Checking...`
            });

            try {
              const verification = await verify({
                notebookURL: html`<a href=""/>`.href.split("?")[0],
                privateCode,
                relmeauth
              });
              if (verification.access_token) {
                await userFirebase
                  .auth()
                  .signInWithCustomToken(verification.access_token);
              } else {
                throw new Error("no token returned");
              }
            } catch (error) {
              err = `<mark>⚠️ ${error.message}</mark>\n\n`;
            }
          }
        }
      } catch (err) {
        yield* ask(
          screen({
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

function _user(createLogin){return(
createLogin()
)}

function _6(md){return(
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

function _8(md){return(
md`### <span style="font: var(--mono_fonts); font-size: 25px;">user</span>

The cell resolves to the *currentUser* or a promise if not logged in. See below for the value in action
`
)}

function _9(user){return(
user
)}

async function _10(md,user,verifyIdToken,userFirebase){return(
md`Hi **${user.uid}** you have an id_token 

~~~ 
   ${await user.getIdToken()}
~~~

that you can decode with **'verifyIdToken'**, this token decoded is:

~~~
${JSON.stringify(
  await verifyIdToken(userFirebase, await user.getIdToken()),
  null,
  2
)}
~~~

`
)}

function _11(md){return(
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

function _12(md){return(
md`### Config`
)}

function _13(md){return(
md`Host notebook fixes the URL of the backend.`
)}

function _HOST_NOTEBOOK(){return(
"@endpointservices/login-with-comment"
)}

function _AUTH_CHECK(){return(
({
  login, // Observable user id
  namespace // namespace being used
} = {}) => true
)}

function _16(md){return(
md`#### Infra Firebase

The infra Firebase hosts the login state on a Realtime Database (e.g. the the challenge codes)
`
)}

function _SERVICE_ACCOUNT_SECRET(){return(
"endpointservices_secretadmin_service_account_key"
)}

function _FIREBASE_CONFIG(){return(
{
  databaseURL: "https://endpointservice-eu.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  projectId: "endpointservice",
  appId: "1:1986724398:web:9b8bc33895b45dd2e095bf"
}
)}

function _20(md){return(
md`#### User Firebase

The user Firebase hosts the Firebase Auth data, it can be the same as the infra Firebase.
`
)}

function _TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET(){return(
"endpointservices_minter"
)}

function _23(md){return(
md`The token Firebase is used to verify tokens and must be in same project as TOKEN_SIGNER_SERVICE_ACCOUNT`
)}

function _TOKEN_FIREBASE_CONFIG(){return(
{
  apiKey: "AIzaSyBquSsEgQnG_rHyasUA95xHN5INnvnh3gc",
  authDomain: "endpointserviceusers.firebaseapp.com",
  projectId: "endpointserviceusers",
  appId: "1:283622646315:web:baa488124636283783006e",
  databaseURL:
    "https://endpointserviceusers-default-rtdb.europe-west1.firebasedatabase.app/"
}
)}

function _25(md){return(
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

function _29(button,chatIcon){return(
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

function _31(copyExample){return(
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

function _34(screen){return(
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

function _36(container,htl,button,chatIcon,copyIcon){return(
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

function _content(userFirebase,copyIcon,chatIcon){return(
{
  labels: {
    copy: "Copy to clipboard",
    login: "Login with comment",
    logout: () =>
      `Logout <b>${userFirebase
        .auth()
        .currentUser.uid.replace("observablehq|", '')}</b>`,
    verify: "Login"
  },
  icons: {
    copy: copyIcon,
    login: chatIcon
  }
}
)}

function _expandContent(){return(
(val) => typeof val === 'function' ? val() : val
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

function _40(testScreen){return(
testScreen
)}

function _screen(container,view,button,expandContent,content,html,stopPropagation,Inputs){return(
({ info, actions = [], toggles = [] } = {}) =>
  container(
    () => view`<div> 
  <span class="e-btns">
    ${[
      "actions",
      actions.map(action =>
        button({
          action,
          label: expandContent(content.labels[action]),
          icon: content.icons[action]
        })
      )
    ]}
  </span>
${info ? html`<p class="e-info" style="font-size: 14px;">${info}</p>` : ''}
${[
  '...',
  Object.fromEntries(
    toggles.map(toggle => {
      return [
        toggle.code,
        view`<div>
      <div>${[
        '...',
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

function _43(md){return(
md`## Code`
)}

function _runTestsSelector(Inputs){return(
Inputs.toggle({
  label: "run tests?",
  value: window["@endpointservices/healthcheck"]
})
)}

function _runTests(runTestsSelector,invalidation){return(
runTestsSelector ? true: invalidation
)}

function _suite(runTests,createSuite){return(
runTests && createSuite()
)}

function _47(md){return(
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

function _48(md){return(
md`#### prepare

Client sends the server the public key, so the server can record the clients intent to initiate a comment login. Client keeps private key secret, so only it can obtain credentials later on.
`
)}

function _prepare_backend(deploy,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,HOST_NOTEBOOK){return(
deploy("prepare", async (req, res, ctx) => {
  if (!req.query.code) return res.status(400).send("Code must be set");
  const code = req.query.code
  
  const service_access_token = await getAccessTokenFromServiceAccount(ctx.secrets[SERVICE_ACCOUNT_SECRET]);
  await signinWithAccessToken(firebase, service_access_token);
  
  await firebase.database().ref(`@endpointservices/login-with-comment/prepare/${code}`).set({
    t: {".sv": "timestamp"} // Timestamp of when issues
  });
  
  res.send("OK")
}, {
  hostNotebook: HOST_NOTEBOOK, 
  secrets: [SERVICE_ACCOUNT_SECRET]
})
)}

function _prepare(prepare_backend){return(
async publicCode => {
  if (!publicCode) throw new Error("public code required");
  const response = await fetch(`${prepare_backend.href}?code=${publicCode}`);
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

function _53(md){return(
md`#### findLoginCommentingCode

Finds a username of a person commenting something containing a code on a given notebook URL
`
)}

function _55(getCommentsAndNamespace){return(
getCommentsAndNamespace('https://observablehq.com/d/f063d0526c1317ca')
)}

function _findLoginCommentingCode(getCommentsAndNamespace){return(
async (notebookURL, code) => {
  const { comments, namespace } = await getCommentsAndNamespace(notebookURL);
  if (!comments) return {login: undefined, namespace};
  const comment = comments.find(comment => comment.content.includes(code));
  return { login: comment?.user?.login, namespace };
}
)}

async function _57(html,FileAttachment){return(
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

function _60(md){return(
md`#### verify

Veryify takes a **private key**, SHA256 it, then looks for it in the comments of a provided notebook URL, if found, signs a token that can be used to initiate a Firebase auth session.

Additionally, if *relmeauth* flag is set it also scanes the users profiles pages for backlinked team accounts.
`
)}

function _verify_backend(deploy,checkIsURL,hash,getAccessTokenFromServiceAccount,SERVICE_ACCOUNT_SECRET,signinWithAccessToken,firebase,findLoginCommentingCode,AUTH_CHECK,findObservablehqAccounts,createCustomToken,TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET,HOST_NOTEBOOK){return(
deploy(
  "verify",
  async (req, res, ctx) => {
    try {
      if (!req.query.code) return res.status(400).send("Code must be set");
      if (!req.query.notebookURL)
        return res.status(400).send("notebookURL must be set");
      const notebookURL = checkIsURL(req.query.notebookURL, "notebookURL");
      const privateCode = req.query.code;
      const publicCode = await hash(privateCode);
      const relmeauth = req.query.relmeauth !== undefined;

      const service_access_token = await getAccessTokenFromServiceAccount(
        ctx.secrets[SERVICE_ACCOUNT_SECRET]
      );
      await signinWithAccessToken(firebase, service_access_token);

      const prepared = await firebase
        .database()
        .ref(`@endpointservices/login-with-comment/prepare/${publicCode}`)
        .once("value");

      if (prepared.val() === null)
        return res.status(400).send("No code prepared");
      const { t } = prepared.val();

      // Code must be exchanged within time window.
      if (
        privateCode ===
        "v58yd9ljbj4kDmENMcKwx3cYa3vYuXvVyQEo45IYFrMuZ90F8TH3nTgHdv6pRvWN"
      ) {
        // Debugging a problematic code
      } else if (
        new Date() - new Date(t) > 10 * 60 * 1000 ||
        new Date() - new Date(t) < 0
      ) {
        return res.status(400).send("code no longer valid");
      }
      // Now look for PUBLIC code in notebook.
      const { login, namespace } = await findLoginCommentingCode(
        notebookURL,
        publicCode
      );

      if (!namespace)
        res.status(404).send("Could not find notebook, have you published it?");

      if (!login)
        res.status(401).send("Comment code not found, try again in a moment?");

      try {
        if (
          !AUTH_CHECK({
            login,
            namespace
          })
        )
          throw new Error("Failed AUTH_CHECK");
      } catch (err) {
        return res.status(403).send(err.message);
      }

      // w00t we found the code and the user login. So we should sign a JWT
      const id = `observablehq|${login}`;
      // lets find other accounts the user has access to if relmeauth is enabled
      const additionalClaims = {};
      if (relmeauth) {
        const accounts = await findObservablehqAccounts(login);
        additionalClaims["observablehq.com"] = Object.fromEntries(
          accounts.map((a) => [a, "admin"])
        );
        additionalClaims["observablehq_com"] = "|" + accounts.join("|") + "|";
      } else {
        additionalClaims["observablehq.com"] = {
          [login]: "admin"
        };
        additionalClaims["observablehq_com"] = "|" + login + "|";
      }

      const token = await createCustomToken(
        JSON.parse(ctx.secrets[TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET]),
        /* uid */ id,
        /* additionalClaims */ additionalClaims,
        /* additionalFields */ {
          scope: "observablehq.com",
          me: id,
          client_id: HOST_NOTEBOOK
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
    modifiers: ["orchestrator"],
    hostNotebook: HOST_NOTEBOOK,
    secrets: [SERVICE_ACCOUNT_SECRET, TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET]
  }
)
)}

function _verify(verify_backend){return(
async ({ notebookURL, privateCode, relmeauth = false } = {}) => {
  if (!privateCode) throw new Error("privateCode required");
  if (!notebookURL) throw new Error("notebookURL required");
  const response = await fetch(
    `${
      verify_backend.href
    }?code=${privateCode}&notebookURL=${encodeURIComponent(notebookURL)}${
      relmeauth ? '&relmeauth' : ''
    }`
  );
  if (response.status === 404)
    throw new Error(`Cannot find notebook... has it been shared?`);
  else if (response.status !== 200) throw new Error(`${await response.text()}`);
  return await response.json();
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

function _verifyWithoutComment(suite,randomId,hash,prepare,verify,expect){return(
suite.test(
  "verify 401 for missing comment",
  async (done) => {
    const privateCode = randomId();
    const publicCode = await hash(privateCode);
    await prepare(publicCode);
    let result = null;
    try {
      result = await verify({
        notebookURL:
          "https://observablehq.com/@endpointservices/login-with-comment",
        privateCode: privateCode
      });
    } catch (err) {
      expect(err.message).toBe(
        "Comment code not found, try again in a moment?"
      );
      done();
    }
    throw new Error(result);
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

function _78(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["ezgif.com-gif-maker.webp",new URL("./files/1b25a5625ca0969979cfcb99d951343a91d6a59d217a101374e1abd1a24138978784e3fcd0abec470a3bd2af53c7d30858abe9874799b40c56e9dd871c84add2",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("createLogin")).define("createLogin", ["userFirebase","html","viewroutine","mutable authStateKnown","ask","screen","md","randomId","hash","prepare","FileAttachment","pbcopy","verify"], _createLogin);
  main.variable(observer("viewof user")).define("viewof user", ["createLogin"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.define("initial authStateKnown", _authStateKnown);
  main.variable(observer("mutable authStateKnown")).define("mutable authStateKnown", ["Mutable", "initial authStateKnown"], (M, _) => new M(_));
  main.variable(observer("authStateKnown")).define("authStateKnown", ["mutable authStateKnown"], _ => _.generator);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["user"], _9);
  main.variable(observer()).define(["md","user","verifyIdToken","userFirebase"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("HOST_NOTEBOOK")).define("HOST_NOTEBOOK", _HOST_NOTEBOOK);
  main.variable(observer("AUTH_CHECK")).define("AUTH_CHECK", _AUTH_CHECK);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("SERVICE_ACCOUNT_SECRET")).define("SERVICE_ACCOUNT_SECRET", _SERVICE_ACCOUNT_SECRET);
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", _FIREBASE_CONFIG);
  const child1 = runtime.module(define1).derive([{name: "FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", child1);
  main.variable(observer()).define(["md"], _20);
  const child2 = runtime.module(define1).derive([{name: "TOKEN_FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", "userFirebase", child2);
  main.variable(observer("TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET")).define("TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET", _TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("TOKEN_FIREBASE_CONFIG")).define("TOKEN_FIREBASE_CONFIG", _TOKEN_FIREBASE_CONFIG);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("chatIcon")).define("chatIcon", ["svg"], _chatIcon);
  main.variable(observer("copyIcon")).define("copyIcon", ["svg"], _copyIcon);
  main.variable(observer("colors")).define("colors", _colors);
  main.variable(observer()).define(["button","chatIcon"], _29);
  main.variable(observer("viewof copyExample")).define("viewof copyExample", ["button","copyIcon"], _copyExample);
  main.variable(observer("copyExample")).define("copyExample", ["Generators", "viewof copyExample"], (G, _) => G.input(_));
  main.variable(observer()).define(["copyExample"], _31);
  main.variable(observer("button")).define("button", ["html","Event"], _button);
  main.variable(observer("container")).define("container", ["view","style"], _container);
  main.variable(observer()).define(["screen"], _34);
  main.variable(observer("style")).define("style", ["html","colors"], _style);
  main.variable(observer()).define(["container","htl","button","chatIcon","copyIcon"], _36);
  main.variable(observer("content")).define("content", ["userFirebase","copyIcon","chatIcon"], _content);
  main.variable(observer("expandContent")).define("expandContent", _expandContent);
  main.variable(observer("viewof testScreen")).define("viewof testScreen", ["screen","html","md"], _testScreen);
  main.variable(observer("testScreen")).define("testScreen", ["Generators", "viewof testScreen"], (G, _) => G.input(_));
  main.variable(observer()).define(["testScreen"], _40);
  main.variable(observer("screen")).define("screen", ["container","view","button","expandContent","content","html","stopPropagation","Inputs"], _screen);
  main.variable(observer("stopPropagation")).define("stopPropagation", ["view"], _stopPropagation);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("viewof runTestsSelector")).define("viewof runTestsSelector", ["Inputs"], _runTestsSelector);
  main.variable(observer("runTestsSelector")).define("runTestsSelector", ["Generators", "viewof runTestsSelector"], (G, _) => G.input(_));
  main.variable(observer("runTests")).define("runTests", ["runTestsSelector","invalidation"], _runTests);
  main.variable(observer("viewof suite")).define("viewof suite", ["runTests","createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("prepare_backend")).define("prepare_backend", ["deploy","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","HOST_NOTEBOOK"], _prepare_backend);
  main.variable(observer("prepare")).define("prepare", ["prepare_backend"], _prepare);
  main.variable(observer("prepareOK")).define("prepareOK", ["suite","randomId","expect","prepare"], _prepareOK);
  main.variable(observer("prepareCodeResuse")).define("prepareCodeResuse", ["suite","randomId","prepare"], _prepareCodeResuse);
  main.variable(observer()).define(["md"], _53);
  const child3 = runtime.module(define2);
  main.import("getCommentsAndNamespace", child3);
  main.variable(observer()).define(["getCommentsAndNamespace"], _55);
  main.variable(observer("findLoginCommentingCode")).define("findLoginCommentingCode", ["getCommentsAndNamespace"], _findLoginCommentingCode);
  main.variable(observer()).define(["html","FileAttachment"], _57);
  main.variable(observer("findLoginCommentingCodeTest")).define("findLoginCommentingCodeTest", ["suite","expect","findLoginCommentingCode"], _findLoginCommentingCodeTest);
  main.variable(observer("findLoginCommentingCodeTest2")).define("findLoginCommentingCodeTest2", ["suite","expect","findLoginCommentingCode","randomId"], _findLoginCommentingCodeTest2);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("verify_backend")).define("verify_backend", ["deploy","checkIsURL","hash","getAccessTokenFromServiceAccount","SERVICE_ACCOUNT_SECRET","signinWithAccessToken","firebase","findLoginCommentingCode","AUTH_CHECK","findObservablehqAccounts","createCustomToken","TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET","HOST_NOTEBOOK"], _verify_backend);
  main.variable(observer("verify")).define("verify", ["verify_backend"], _verify);
  main.variable(observer("findObservablehqAccounts")).define("findObservablehqAccounts", ["randomId","promiseRecursive"], _findObservablehqAccounts);
  main.variable(observer("teamScan")).define("teamScan", ["suite","expect","findObservablehqAccounts"], _teamScan);
  main.variable(observer("verifyWithoutPrepare")).define("verifyWithoutPrepare", ["suite","verify","randomId","expect"], _verifyWithoutPrepare);
  main.variable(observer("verifyWithoutComment")).define("verifyWithoutComment", ["suite","randomId","hash","prepare","verify","expect"], _verifyWithoutComment);
  main.variable(observer("hash")).define("hash", _hash);
  main.variable(observer("checkIsURL")).define("checkIsURL", _checkIsURL);
  const child4 = runtime.module(define3);
  main.import("view", child4);
  main.import("cautious", child4);
  const child5 = runtime.module(define4);
  main.import("viewroutine", child5);
  main.import("ask", child5);
  const child6 = runtime.module(define5);
  main.import("deploy", child6);
  main.import("subdomain", child6);
  main.import("getContext", child6);
  const child7 = runtime.module(define6);
  main.import("randomId", child7);
  const child8 = runtime.module(define7);
  main.import("createCustomToken", child8);
  main.import("verifyCustomToken", child8);
  main.import("verifyIdToken", child8);
  main.import("signinWithAccessToken", child8);
  main.import("getAccessTokenFromServiceAccount", child8);
  const child9 = runtime.module(define8);
  main.import("createSuite", child9);
  main.import("expect", child9);
  const child10 = runtime.module(define9);
  main.import("pbcopy", child10);
  const child11 = runtime.module(define10);
  main.import("promiseRecursive", child11);
  const child12 = runtime.module(define11);
  main.import("footer", child12);
  main.variable(observer()).define(["footer"], _78);
  return main;
}
