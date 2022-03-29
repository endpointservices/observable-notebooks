// https://observablehq.com/@tomlarkworthy/firebase-admin@350
function _1(md){return(
md`# Firebase Admin and Google API helpers in the browser

Some firebase-admin functionality that is not available in the browser, and some helpers for related Google API functionality.

Allows you to automate use of Firebase using a Service account. Also allows you to verify other Firebase user tokens, and mint Google access_tokens within the browser.

You need some way of securing the Google Service Account of course. You could run a browser in a secure environment (e.g. [serverside cells](https://observablehq.com/@tomlarkworthy/serverless-cells)) or [password-protect](https://observablehq.com/@endpointservices/notebook-secret) it.


`
)}

function _2(md){return(
md`## verifyIdToken

Check the validity of a Firebase ID token

source: https://github.com/firebase/firebase-admin-node/blob/5d72c1b40ef9383060d500e4f08678cb37ab8c0e/src/auth/token-verifier.ts

~~~js
import {verifyIdToken} from '@tomlarkworthy/firebase-admin'
~~~
`
)}

function _verifyIdToken(tokenValidator){return(
function verifyIdToken(firebase, token) {
  if (!token) throw new Error("No token supplied");
  if (!firebase.idTokenValidator) {
    firebase.idTokenValidator = tokenValidator.createIdTokenVerifier(firebase);
  }
  return firebase.idTokenValidator.verifyJWT(token);
}
)}

function _tokenValidator(jwt)
{

  // Audience to use for Firebase Auth Custom tokens
  const FIREBASE_AUDIENCE = 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit';

  const ALGORITHM_RS256 = 'RS256';

  // URL containing the public keys for the Google certs (whose private keys are used to sign Firebase
  // Auth ID tokens)
  const CLIENT_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

  // URL containing the public keys for Firebase session cookies. This will be updated to a different URL soon.
  const SESSION_COOKIE_CERT_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys';

  /** User facing token information related to the Firebase ID token. */
  const ID_TOKEN_INFO = {
    url: 'https://firebase.google.com/docs/auth/admin/verify-id-tokens',
    verifyApiName: 'verifyIdToken()',
    jwtName: 'Firebase ID token',
    shortName: 'ID token'
  };

  /** User facing token information related to the Firebase session cookie. */
  const SESSION_COOKIE_INFO = {
    url: 'https://firebase.google.com/docs/auth/admin/manage-cookies',
    verifyApiName: 'verifySessionCookie()',
    jwtName: 'Firebase session cookie',
    shortName: 'session cookie'
  };

  /**
   * Class for verifying general purpose Firebase JWTs. This verifies ID tokens and session cookies.
   */
  class FirebaseTokenVerifier {

    constructor(clientCertUrl, algorithm,
                issuer, tokenInfo,
                app) {
      this.clientCertUrl = clientCertUrl;
      this.algorithm = algorithm;
      this.issuer = issuer;
      this.tokenInfo = tokenInfo;
      this.app = app;
      this.shortNameArticle = tokenInfo.shortName.charAt(0).match(/[aeiou]/i) ? 'an' : 'a';

      // For backward compatibility, the project ID is validated in the verification call.
    }

    verifyJWT(jwtToken) {
      const projectId = this.app.options.projectId
      const fullDecodedToken = jwt.decode(jwtToken, {
        complete: true,
      });

      const header = fullDecodedToken && fullDecodedToken.header;
      const payload = fullDecodedToken && fullDecodedToken.payload;

      const projectIdMatchMessage = ` Make sure the ${this.tokenInfo.shortName} comes from the same ` +
        'Firebase project as the service account used to authenticate this SDK.';
      const verifyJwtTokenDocsMessage = ` See ${this.tokenInfo.url} ` +
        `for details on how to retrieve ${this.shortNameArticle} ${this.tokenInfo.shortName}.`;

      let errorMessage;
      if (!fullDecodedToken) {
        errorMessage = `Decoding ${this.tokenInfo.jwtName} failed. Make sure you passed the entire string JWT ` +
          `which represents ${this.shortNameArticle} ${this.tokenInfo.shortName}.` + verifyJwtTokenDocsMessage;
      } else if (typeof header.kid === 'undefined' && this.algorithm !== 'none') {
        const isCustomToken = (payload.aud === FIREBASE_AUDIENCE);

        if (isCustomToken) {
          errorMessage = `${this.tokenInfo.verifyApiName} expects ${this.shortNameArticle} ` +
            `${this.tokenInfo.shortName}, but was given a custom token.`;
        } else {
          errorMessage = 'Firebase ID token has no "kid" claim.';
        }

        errorMessage += verifyJwtTokenDocsMessage;
      } else if (header.alg !== this.algorithm) {
        errorMessage = `${this.tokenInfo.jwtName} has incorrect algorithm. Expected "` + this.algorithm + '" but got ' +
          '"' + header.alg + '".' + verifyJwtTokenDocsMessage;
      } else if (payload.aud !== projectId) {
        errorMessage = `${this.tokenInfo.jwtName} has incorrect "aud" (audience) claim. Expected "` +
          projectId + '" but got "' + payload.aud + '".' + projectIdMatchMessage +
          verifyJwtTokenDocsMessage;
      } else if (payload.iss !== this.issuer + projectId) {
        errorMessage = `${this.tokenInfo.jwtName} has incorrect "iss" (issuer) claim. Expected ` +
          `"${this.issuer}"` + projectId + '" but got "' +
          payload.iss + '".' + projectIdMatchMessage + verifyJwtTokenDocsMessage;
      } else if (typeof payload.sub !== 'string') {
        errorMessage = `${this.tokenInfo.jwtName} has no "sub" (subject) claim.` + verifyJwtTokenDocsMessage;
      } else if (payload.sub === '') {
        errorMessage = `${this.tokenInfo.jwtName} has an empty string "sub" (subject) claim.` + verifyJwtTokenDocsMessage;
      } else if (payload.sub.length > 128) {
        errorMessage = `${this.tokenInfo.jwtName} has "sub" (subject) claim longer than 128 characters.` +
          verifyJwtTokenDocsMessage;
      }
      if (errorMessage) {
        return Promise.reject(new Error("INVALID_ARGUMENT" + errorMessage));
      }

      return this.fetchPublicKeys().then((publicKeys) => {
        if (!Object.prototype.hasOwnProperty.call(publicKeys, header.kid)) {
          return Promise.reject(
            new Error(
              "INVALID_ARGUMENT" +
              `${this.tokenInfo.jwtName} has "kid" claim which does not correspond to a known public key. ` +
              `Most likely the ${this.tokenInfo.shortName} is expired, so get a fresh token from your ` +
              'client app and try again.',
            ),
          );
        } else {
          return this.verifyJwtSignatureWithKey(jwtToken, publicKeys[header.kid]);
        }

      });
    }

    /**
     * Verifies the JWT signature using the provided public key.
     * @param {string} jwtToken The JWT token to verify.
     * @param {string} publicKey The public key certificate.
     * @return {Promise<DecodedIdToken>} A promise that resolves with the decoded JWT claims on successful
     *     verification.
     */
    verifyJwtSignatureWithKey(jwtToken, publicKey) {
      const verifyJwtTokenDocsMessage = ` See ${this.tokenInfo.url} ` +
        `for details on how to retrieve ${this.shortNameArticle} ${this.tokenInfo.shortName}.`;
      return new Promise((resolve, reject) => {
        jwt.verify(jwtToken, publicKey || '', {
          algorithms: [this.algorithm],
        }, (error, decodedToken) => {
          if (error) {
            if (error.name === 'TokenExpiredError') {
              const errorMessage = `${this.tokenInfo.jwtName} has expired. Get a fresh ${this.tokenInfo.shortName}` +
                ` from your client app and try again (auth/${this.tokenInfo.expiredErrorCode.code}).` +
                verifyJwtTokenDocsMessage;
              return reject(new Error(this.tokenInfo.expiredErrorCode, errorMessage));
            } else if (error.name === 'JsonWebTokenError') {
              const errorMessage = `${this.tokenInfo.jwtName} has invalid signature.` + verifyJwtTokenDocsMessage;
              return reject(new Error('INVALID_ARGUMENT' + errorMessage));
            }
            return reject(new Error('INVALID_ARGUMENT' + error.message));
          } else {
            const decodedIdToken = decodedToken;
            decodedIdToken.uid = decodedIdToken.sub;
            resolve(decodedIdToken);
          }
        });
      });
    }

    /**
     * Fetches the public keys for the Google certs.
     *
     * @return {Promise<object>} A promise fulfilled with public keys for the Google certs.
     */
    fetchPublicKeys() {
      const publicKeysExist = (typeof this.publicKeys !== 'undefined');
      const publicKeysExpiredExists = (typeof this.publicKeysExpireAt !== 'undefined');
      const publicKeysStillValid = (publicKeysExpiredExists && Date.now() < this.publicKeysExpireAt);
      if (publicKeysExist && publicKeysStillValid) {
        return Promise.resolve(this.publicKeys);
      }

      return fetch(this.clientCertUrl).then(async (resp) => {
        resp.data = await resp.json() 
        if (resp.headers.get('cache-control')) {
          const cacheControlHeader = resp.headers.get('cache-control');
          const parts = cacheControlHeader.split(',');
          parts.forEach((part) => {
            const subParts = part.trim().split('=');
            if (subParts[0] === 'max-age') {
              const maxAge = +subParts[1];
              this.publicKeysExpireAt = Date.now() + (maxAge * 1000);
            }
          });
        }
        this.publicKeys = resp.data;
        return resp.data;
      }).catch((err) => {
        let errorMessage = 'Error fetching public keys for Google certs: ';
        const resp = err.response;
        if (resp.isJson() && resp.data.error) {
          errorMessage += `${resp.data.error}`;
          if (resp.data.error_description) {
            errorMessage += ' (' + resp.data.error_description + ')';
          }
        } else {
          errorMessage += `${resp.text}`;
        }
        throw new Error('INTERNAL_ERROR', errorMessage);
      });
    }
  }
  return {
    /**
     * Creates a new FirebaseTokenVerifier to verify Firebase ID tokens.
     *
     * @param {FirebaseApp} app Firebase app instance.
     * @return {FirebaseTokenVerifier}
     */
    createIdTokenVerifier: (app) => new FirebaseTokenVerifier(
      CLIENT_CERT_URL,
      ALGORITHM_RS256,
      'https://securetoken.google.com/',
      ID_TOKEN_INFO,
      app
    ),
    
    /**
     * Creates a new FirebaseTokenVerifier to verify Firebase session cookies.
     *
     * @param {FirebaseApp} app Firebase app instance.
     * @return {FirebaseTokenVerifier}
     */
    createSessionCookieVerifier: (app) => new FirebaseTokenVerifier(
      SESSION_COOKIE_CERT_URL,
      ALGORITHM_RS256,
      'https://session.firebase.google.com/',
      SESSION_COOKIE_INFO,
      app
    )
  };
}


function _5(md){return(
md`## Create Custom Token

[Creating custom tokens Firebase docs](https://firebase.google.com/docs/auth/admin/create-custom-tokens)

~~~js
import {createCustomToken} from '@tomlarkworthy/firebase-admin'
~~~

`
)}

function _createCustomToken(jsrsasign){return(
async function createCustomToken({
    private_key,
    client_email
  } = {}, uid, additionalClaims, additionalFields = {}) {
  
  const now_secs = Math.floor(Date.now() / 1000);
  const sHeader = JSON.stringify({alg: 'RS256', typ: 'JWT'});
  const sPayload = JSON.stringify({
    "iss": client_email,
    "sub": client_email,
    "aud": "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
    "iat": now_secs,
    "exp": now_secs + 60 * 60,
    "uid": uid,
    ...(additionalClaims && {"claims": additionalClaims}),
    ...additionalFields,
  });
  return jsrsasign.KJUR.jws.JWS.sign("RS256", sHeader, sPayload, private_key);
}
)}

function _7(md){return(
md`### Verify Custom Token

~~~js
import {verifyCustomToken} from '@tomlarkworthy/firebase-admin'
~~~
`
)}

function _verifyCustomToken(){return(
async function verifyCustomToken(firebase, token) {
  const API_KEY = firebase.options_.apiKey;
  if (!token) throw new Error("No token specified");
  if (!API_KEY) throw new Error("Cannot find API_KEY");
  // Simplest way is to try to exchange for ID token
  // https://cloud.google.com/identity-platform/docs/use-rest-api
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: `{"token":"${token}","returnSecureToken":true}`
    }
  );
  if (response.status !== 200) throw new Error(await response.text());
  else {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
)}

function _9(md){return(
md`## Mint access_token from Google Service Account

Combine this with [Google API Client](https://observablehq.com/@tomlarkworthy/gapi) to call Google Services
`
)}

function _getAccessTokenFromServiceAccount(jsrsasign){return(
async function getAccessTokenFromServiceAccount(serviceAccountKey) {
  if (typeof serviceAccountKey === 'string') {
    serviceAccountKey = JSON.parse(serviceAccountKey)
  }
  // First create a JWT from the credentials
  const tNow = Math.floor((new Date()).getTime() / 1000);
  const sHeader = JSON.stringify({alg: 'RS256', typ: 'JWT'});
  const sPayload = JSON.stringify({
      iss: serviceAccountKey.client_email,
      scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform",
      iat: tNow,
      exp: tNow + 600,
      aud: "https://oauth2.googleapis.com/token",
  });
  const JWT = jsrsasign.KJUR.jws.JWS.sign("RS256", sHeader, sPayload, serviceAccountKey.private_key);
    
  // Swap JWT for access_token
  const tokenResponse = await fetch(
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${JWT}`,
    }
  );

  if (tokenResponse.status != 200) {
    throw new Error(await tokenResponse.text())
  }
  return (await tokenResponse.json()).access_token;
}
)}

async function _11(md,FileAttachment){return(
md`## Signin with access_token

You can use an access_token to authenticate as a user to the Firebase API (requires enabled Google Login).

You can use service account from different project if you whitelist the service account's client_id

![](${await FileAttachment("image.png").url()})
`
)}

function _signinWithAccessToken(){return(
async function signinWithAccessToken(firebase, access_token) {
  const credential = firebase.firebase_.auth.GoogleAuthProvider.credential(
    null,
    access_token
  );
  return await firebase.auth().signInWithCredential(credential);
}
)}

function _13(md){return(
md`### Support utilities`
)}

function _jwt(require){return(
require('https://bundle.run/jsonwebtoken@8.5.1')
)}

function _jsrsasign(require){return(
require('https://bundle.run/jsrsasign@10.1.4')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image.png",new URL("./files/d13fe08447f9f86d52f1c006b5611bd53ae8a468c9fb36bf059cdf2e33713c2ce9670c55163040a1b21390fe3f813d87cfc18c569b3067fa9cb524d464786cc1",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("verifyIdToken")).define("verifyIdToken", ["tokenValidator"], _verifyIdToken);
  main.variable(observer("tokenValidator")).define("tokenValidator", ["jwt"], _tokenValidator);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("createCustomToken")).define("createCustomToken", ["jsrsasign"], _createCustomToken);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("verifyCustomToken")).define("verifyCustomToken", _verifyCustomToken);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("getAccessTokenFromServiceAccount")).define("getAccessTokenFromServiceAccount", ["jsrsasign"], _getAccessTokenFromServiceAccount);
  main.variable(observer()).define(["md","FileAttachment"], _11);
  main.variable(observer("signinWithAccessToken")).define("signinWithAccessToken", _signinWithAccessToken);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("jwt")).define("jwt", ["require"], _jwt);
  main.variable(observer("jsrsasign")).define("jsrsasign", ["require"], _jsrsasign);
  return main;
}
