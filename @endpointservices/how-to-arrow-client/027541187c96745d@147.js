function _1(md){return(
md`# Endpoint Services: Login with Comment

This auth server creates tokens signed for use with endpointservices Firebase account. 

We wish to enable creator A to fork and programatically access their data. But we need to ensure that creator A's services cannot be access by creator B (isolation). 

One method is to provide access controls, which is what @endpointservices does. Thus, creator A or creator B can login from an endpointservices domain, and isolation is enforced through logic. No creators can tamper with @endpointservice's notebooks. 

However, we also want userA to configure their own services programatically. So they need access from their forked namespace. We cannot gaurantee that sufficient access controls will be in place for third party namespaces, so we only issue Creator A tokens when on namespace @CreatorA.

This auth logic is encoded in the AUTH_CHECK
`
)}

function _user(createLogin){return(
createLogin()
)}

function _4(user){return(
user.getIdToken()
)}

async function _5(md,verifyIdToken,firebase,user){return(
md`~~~
${JSON.stringify(
  await verifyIdToken(firebase, await user.getIdToken()),
  null,
  2
)}
~~~`
)}

function _AUTH_CHECK(){return(
({ login, namespace } = {}) => {
  // Anybody can sign into the trusted domains
  if (namespace == "endpointservices" || namespace == "tomlarkworthy") {
    return true;
  } else {
    // A user foo can signing from namspace foo, as they own their own data
    if (namespace == login) return true;
    else {
      throw new Error(
        `${login} cannot login to endpoint services from ${namespace}, fork into your own namespace first`
      );
    }
  }
}
)}

function _7(verify_backend){return(
verify_backend
)}

function _8(prepare_backend){return(
prepare_backend
)}

function _HOST_NOTEBOOK(){return(
'@endpointservices/endpoint-login-with-comment'
)}

function _TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET(){return(
'endpointservices_secretadmin_service_account_key'
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  projectId: "endpointservice",
  databaseURL: "https://endpointservice-eu.europe-west1.firebasedatabase.app/"
}
)}

function _13(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.define("module 1", ["@variable"], async (v) => runtime.module((await import("./c16efae137e70585@1444.js")).default).derive([{name: "firebaseConfig", alias: "TOKEN_FIREBASE_CONFIG"},"TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET","HOST_NOTEBOOK","AUTH_CHECK"], v._module));
  main.define("module 2", async () => runtime.module((await import("./58f3eb7334551ae6@215.js")).default));
  main.variable(observer()).define(["md"], _1);
  main.define("createLogin", ["module 1", "@variable"], (_, v) => v.import("createLogin", _));
  main.define("verify_backend", ["module 1", "@variable"], (_, v) => v.import("verify_backend", _));
  main.define("prepare_backend", ["module 1", "@variable"], (_, v) => v.import("prepare_backend", _));
  main.define("firebase", ["module 1", "@variable"], (_, v) => v.import("userFirebase", "firebase", _));
  main.define("verifyIdToken", ["module 1", "@variable"], (_, v) => v.import("verifyIdToken", _));
  main.define("subdomain", ["module 1", "@variable"], (_, v) => v.import("subdomain", _));
  main.variable(observer("viewof user")).define("viewof user", ["createLogin"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["user"], _4);
  main.variable(observer()).define(["md","verifyIdToken","firebase","user"], _5);
  main.variable(observer("AUTH_CHECK")).define("AUTH_CHECK", _AUTH_CHECK);
  main.variable(observer()).define(["verify_backend"], _7);
  main.variable(observer()).define(["prepare_backend"], _8);
  main.variable(observer("HOST_NOTEBOOK")).define("HOST_NOTEBOOK", _HOST_NOTEBOOK);
  main.variable(observer("TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET")).define("TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET", _TOKEN_SIGNER_SERVICE_ACCOUNT_SECRET);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.define("footer", ["module 2", "@variable"], (_, v) => v.import("footer", _));
  main.variable(observer()).define(["footer"], _13);
  return main;
}
