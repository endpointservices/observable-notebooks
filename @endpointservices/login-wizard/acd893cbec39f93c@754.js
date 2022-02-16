import define1 from "./b5ee47165ef0a032@504.js";
import define2 from "./a2e58f97fd5e8d7c@672.js";
import define3 from "./e657c642789a0b68@2027.js";
import define4 from "./77f7c3c28a618766@604.js";
import define5 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["done.gif",new URL("./files/65499dc57229c6ddfbb51e0851e4ea63cc79181703254c691d5bed087573cc1cae5693160a05a1f66f20bd97798cf968061105c2c3c573aa3d8be48f82fdc5b7",import.meta.url)],["IdentityWizard.png",new URL("./files/9f72c3bebf2f334526603bd03c758dee24a67466e1dbc9bf2da3f83c83f08b603c1567a34886ac308c88e2faba6fdaf292bf39dc35e384943070ddf9c627eb45",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`# IndieWeb Login Wizard

![](${await FileAttachment("IdentityWizard.png").url()})

With IndieWeb you can decide how a 3rd party website can identify you, simply by adding some metadata to your homepage.

Your homepage URL becomes your Identity URL for weblogin forms, and your homepage describes your relation to other websites on the internet, including which 3rd party Oauth providers (like Github) are valid authenticators.

Endpoint Services uses IndieWeb login to manage resources like file [storage](https://observablehq.com/@endpointservices/storage). If you don't have a homepage we can create an itentity using just Observable notebookes.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Authentication

While you might use your homepage as a identifier, you can still use a familiar identity provider to perform the actual identity check.

`
)});
  main.variable(observer("viewof providers")).define("viewof providers", ["Checkbox"], function(Checkbox){return(
Checkbox(new Map([
  ['Github', 'github'],
  ['password', 'password'],
  ['Google', 'google'],
  ['Twitter', 'twitter'],
  ['IndieAuth (bring your own)', 'indieauth']
]), {
  label: "I would like to login using "
})
)});
  main.variable(observer("providers")).define("providers", ["Generators", "viewof providers"], (G, _) => G.input(_));
  main.variable(observer()).define(["providers","providerSupport","md","html"], function(providers,providerSupport,md,html)
{
  const messages = [];
  providers.forEach(provider => {
    const support = providerSupport[provider];
    if (support.error) messages.push("⚠️ " + provider + " " + support.error);
    else messages.push("✅ " + provider + " is possible");
  });
  if (providers.length == 0) return md`⚠️ You need to select at least one authentication method otherwise you can't login!`
  return html`${messages.join("<p>")}`
}
);
  main.variable(observer()).define(["md","wantsGithub"], function(md,wantsGithub){return(
md`### ${wantsGithub? md`Github identity delegation`: `~~Github~~`}`
)});
  main.variable(observer("viewof githubProfile")).define("viewof githubProfile", ["Text","wantsGithub"], function(Text,wantsGithub){return(
Text({
  width: 500,
  label: "My Github profile is",
  disabled: !wantsGithub
})
)});
  main.variable(observer("githubProfile")).define("githubProfile", ["Generators", "viewof githubProfile"], (G, _) => G.input(_));
  main.variable(observer()).define(["wantsGithub","md","isValidGithub"], function(wantsGithub,md,isValidGithub){return(
!wantsGithub ? md`N/A` : !isValidGithub ? md`⚠️ Not a valid Github profile (is lower case?)` : md`✅ is a valid Github profile`
)});
  main.variable(observer()).define(["wantsPassword","md"], function(wantsPassword,md){return(
wantsPassword ? 
  md`### Password


You can encypt a password and host on Observable for a quick solution. This is IndieAuth where we use a password challange hosted in an Observable notebook as the *authorization_endpoint*.


`: md`### ~~Password~~`
)});
  main.variable(observer()).define(["wantsPassword","md","viewof pass"], function(wantsPassword,md,$0)
{
  if (!wantsPassword) return md`N/A`
  return $0
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Now paste the following block in a notebook and publish to create an *authorization_endpoint*.
`
)});
  main.variable(observer()).define(["isValidIdentity","md","pass","Textarea","encryptedSecret"], function(isValidIdentity,md,pass,Textarea,encryptedSecret){return(
!isValidIdentity ? md`⚠️ Setup identity URL first in the section below` : pass ? Textarea({
  rows: 10,
  value: `authorization_endpoint = password_authorization_endpoint(${JSON.stringify({
    me: 'IDENTITY_URL',
    secret: encryptedSecret
  }, null, 2)});`,
  disabled: true
}) : "waiting for a password first..."
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You will need to import its dependancy too

~~~js
   import {password_authorization_endpoint} from '@endpointservices/identity'
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`That code will generate a link. Double check it works by clicking it (expect a password webform). Copy the generated link to be used as the *href* in a *rel='authorization_endpoint'* link on your Identity webpage.

Fill in the *authorization_endpoint* URL form after you have generated in the IndieAuth section next.
`
)});
  main.variable(observer()).define(["md","wantsIndieauth","wantsPassword"], function(md,wantsIndieauth,wantsPassword){return(
md`### ${(wantsIndieauth || wantsPassword) ? md`Indie Auth (Bring your own)`: `~~IndieAuth~~`}`
)});
  main.variable(observer("viewof authorization_endpoint")).define("viewof authorization_endpoint", ["Text","wantsIndieauth","wantsPassword"], function(Text,wantsIndieauth,wantsPassword){return(
Text({
  width: 500,
  label: "My authorization endpoint URL is",
  disabled: !(wantsIndieauth || wantsPassword)
})
)});
  main.variable(observer("authorization_endpoint")).define("authorization_endpoint", ["Generators", "viewof authorization_endpoint"], (G, _) => G.input(_));
  main.variable(observer()).define(["wantsIndieauth","wantsPassword","md","isValidAuthorizationEndpoint"], function(wantsIndieauth,wantsPassword,md,isValidAuthorizationEndpoint){return(
!(wantsIndieauth || wantsPassword) ? md`N/A` : !isValidAuthorizationEndpoint ? md`⚠️ Not a valid authorization_endpoint URL` : md`✅ is a valid *authorization_endpoint*`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Observable profile
If you would like to use your login to manage resources, then it needs to be linked to your Observable profile(s). It looks like:-

~~~
    https://observablehq.com/@<username>
~~~
`
)});
  main.variable(observer("viewof wantsObservable")).define("viewof wantsObservable", ["Toggle"], function(Toggle){return(
Toggle({
  value: true,
  label: "I would like to manage resources associated with my Observable profile"
})
)});
  main.variable(observer("wantsObservable")).define("wantsObservable", ["Generators", "viewof wantsObservable"], (G, _) => G.input(_));
  main.variable(observer("viewof observableProfile")).define("viewof observableProfile", ["Text","wantsObservable"], function(Text,wantsObservable){return(
Text({
  width: 500,
  label: "My observable profile is",
  disabled: !wantsObservable
})
)});
  main.variable(observer("observableProfile")).define("observableProfile", ["Generators", "viewof observableProfile"], (G, _) => G.input(_));
  main.variable(observer()).define(["wantsObservable","md","isValidObservable"], function(wantsObservable,md,isValidObservable){return(
!wantsObservable ? md`N/A` : !isValidObservable ? md`⚠️ Not a valid Observablehq profile` : md`✅ is a valid Observablehq profile`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Identity URL
IndieWeb login works best if you use a personal homepage. If you don't have one that's ok too.
`
)});
  main.variable(observer()).define(["md","identityURL"], function(md,identityURL){return(
md`Your Identity URL is ${identityURL}`
)});
  main.variable(observer()).define(["isValidIdentity","md"], function(isValidIdentity,md){return(
!isValidIdentity ? md`⚠️ No identity URL selected` : md`✅ valid Identity URL`
)});
  main.variable(observer("viewof homepage")).define("viewof homepage", ["Text"], function(Text){return(
Text({
  width: 500,
  label: "I have a personal homepage at:"
  
})
)});
  main.variable(observer("homepage")).define("homepage", ["Generators", "viewof homepage"], (G, _) => G.input(_));
  main.variable(observer("viewof useObservableProfileAsIdentity")).define("viewof useObservableProfileAsIdentity", ["Toggle"], function(Toggle){return(
Toggle({
  label: "I want something quick! I will use my observable profile as my Identity URL"
})
)});
  main.variable(observer("useObservableProfileAsIdentity")).define("useObservableProfileAsIdentity", ["Generators", "viewof useObservableProfileAsIdentity"], (G, _) => G.input(_));
  main.variable(observer()).define(["hasHomepage","md","isIdentityHttps"], function(hasHomepage,md,isIdentityHttps){return(
!hasHomepage ? md`N/A` : !isIdentityHttps ? md`⚠️ Homepage URL must support https` : md`✅ *https://*`
)});
  main.variable(observer()).define(["hasHomepage","md","isIdentityURL"], function(hasHomepage,md,isIdentityURL){return(
!hasHomepage ? md`N/A` : !isIdentityURL ? md`⚠️ Homepage URL must be a URL` : md`✅ homepage is a URL`
)});
  main.variable(observer()).define(["hasHomepage","md","isIdentityNormalized"], function(hasHomepage,md,isIdentityNormalized){return(
!hasHomepage ? md`N/A` : !isIdentityNormalized ? md`⚠️ Homepage URL must be normalized` : md`✅ homepage is normalized`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Required Steps to get a working IdentityURL using Relmeauth/Indieauth

Ideally you would use a homepage on a domain you own. This is the first option. However, there is a quicker way by using your Observable profile URL as your idenity URL which is the 2nd option.
`
)});
  main.variable(observer()).define(["md","homepagePlan","FileAttachment"], async function(md,homepagePlan,FileAttachment){return(
md`### Using a homepage to login

${homepagePlan.map(step => "  1. " + step).join("\n")}

${homepagePlan.length == 0 ? `You are done, congrats!

![](${await FileAttachment("done.gif").url()})`: ''}
`
)});
  main.variable(observer()).define(["md","observablePlan","FileAttachment"], async function(md,observablePlan,FileAttachment){return(
md`### Using a Observablehq profile to login

${observablePlan.map(step => "  1. " + step).join("\n")}

${observablePlan.length == 0 ? `You are done, congrats!

![](${await FileAttachment("done.gif").url()})`: ''}
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Test it works`
)});
  main.variable(observer()).define(["weblogin"], function(weblogin){return(
weblogin
)});
  main.variable(observer("homepagePlan")).define("homepagePlan", ["isValidIdentity","providers","isIdentityURL","wantsIndieauth","wantsPassword","hasAuthorizationEndpointOnHomepage","displayAuthorizationEndpoint","wantsGithub","hasGithubOnHomepage","displayGithubProfile","wantsObservable","hasObservableOnHomepage","displayObservableProfile","hasHomepageOnObservable","displayHomepage"], function(isValidIdentity,providers,isIdentityURL,wantsIndieauth,wantsPassword,hasAuthorizationEndpointOnHomepage,displayAuthorizationEndpoint,wantsGithub,hasGithubOnHomepage,displayGithubProfile,wantsObservable,hasObservableOnHomepage,displayObservableProfile,hasHomepageOnObservable,displayHomepage){return(
[
  ...(!isValidIdentity ? [`Create a homepage`] : []),
  ...(providers.length == 0 ? [`Pick a method for authenticating`]: []),
  ...(!isIdentityURL ? [`Ensure homepage is served over https://`]: []),
  
  ...((wantsIndieauth || wantsPassword) && !hasAuthorizationEndpointOnHomepage ? [`Add \`<link rel="authorization_endpoint" href=${displayAuthorizationEndpoint}></link>\` to your homepage.`]: []),
  
  
  ...(wantsGithub && !hasGithubOnHomepage ? [`Add \`<a rel="me" href=${displayGithubProfile}>My Github profile</a>\` to your homepage.`]: []),
  //...(wantsGithub && !hasHomepageOnGithub ? [`Set your homepage on <a href="${displayGithubProfile}">\`${displayGithubProfile}\`</a> to ${displayHomepage}`]: []),
  
  ...(wantsObservable && !hasObservableOnHomepage ? [`Add \`<a rel="me" href=${displayObservableProfile}>My Observable profile</a>\` to your homepage.`]: []),
  ...(wantsObservable && !hasHomepageOnObservable ? [`Add \`${displayHomepage}\` to the website list on ${displayObservableProfile}`]: [])

]
)});
  main.variable(observer("observablePlan")).define("observablePlan", ["providers","wantsIndieauth","wantsPassword","isValidAuthorizationEndpoint","hasAuthorizationEndpointOnHomepage","displayAuthorizationEndpoint","observableProfile","wantsGithub","hasGithubOnHomepage","displayGithubProfile"], function(providers,wantsIndieauth,wantsPassword,isValidAuthorizationEndpoint,hasAuthorizationEndpointOnHomepage,displayAuthorizationEndpoint,observableProfile,wantsGithub,hasGithubOnHomepage,displayGithubProfile){return(
[
  ...(providers.length == 0 ? [`Pick a method for authenticating`]: []),
  
  ...((wantsIndieauth || wantsPassword) && !isValidAuthorizationEndpoint ? [`Key in a valid *authorization_endpoint*`]: []),
  
  ...((wantsIndieauth || wantsPassword) && !hasAuthorizationEndpointOnHomepage ? [`Add ${displayAuthorizationEndpoint} to your list of webpages on ${observableProfile}.`]: []),
  
  
  ...(wantsGithub && !hasGithubOnHomepage ? [`Add ${displayGithubProfile} to your list of webpages on ${observableProfile}.`]: []),
    //...(wantsGithub && !hasHomepageOnGithub ? [`Set your homepage on <a href="${displayGithubProfile}">\`${displayGithubProfile}\`</a> to ${identityURL}`]: []),
 
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### Github`
)});
  main.variable(observer("wantsGithub")).define("wantsGithub", ["providers"], function(providers){return(
providers.includes('github')
)});
  main.variable(observer("displayGithubProfile")).define("displayGithubProfile", ["githubProfile"], function(githubProfile){return(
githubProfile || "GITHUB_PROFILE_URL"
)});
  main.variable(observer("isValidGithub")).define("isValidGithub", ["wantsGithub","githubProfile"], function(wantsGithub,githubProfile){return(
wantsGithub && /^https:\/\/github.com\/([a-z]*)$/.exec(githubProfile) !== null
)});
  main.variable(observer("githubProfileLinks")).define("githubProfileLinks", ["isValidGithub","rel_links","githubProfile"], function(isValidGithub,rel_links,githubProfile){return(
isValidGithub ? rel_links(githubProfile) : []
)});
  main.variable(observer("hasGithubOnHomepage")).define("hasGithubOnHomepage", ["homepageLinks","githubProfile"], function(homepageLinks,githubProfile){return(
homepageLinks.map(p => p.href).includes(githubProfile)
)});
  main.variable(observer("hasHomepageOnGithub")).define("hasHomepageOnGithub", ["githubProfileLinks","homepage"], function(githubProfileLinks,homepage){return(
githubProfileLinks.map(p => p.href).includes(homepage)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### Indieauth`
)});
  main.variable(observer("wantsIndieauth")).define("wantsIndieauth", ["providers"], function(providers){return(
providers.includes('indieauth')
)});
  main.variable(observer("displayAuthorizationEndpoint")).define("displayAuthorizationEndpoint", ["isValidAuthorizationEndpoint","authorization_endpoint"], function(isValidAuthorizationEndpoint,authorization_endpoint){return(
(isValidAuthorizationEndpoint && authorization_endpoint) || "AUTHORIZATION_ENDPOINT_URL"
)});
  main.variable(observer("isValidAuthorizationEndpoint")).define("isValidAuthorizationEndpoint", ["wantsIndieauth","wantsPassword","authorization_endpoint"], function(wantsIndieauth,wantsPassword,authorization_endpoint)
{
  if (!(wantsIndieauth || wantsPassword)) return false;
  try {
    new URL(authorization_endpoint);
    return true;
  } catch (err) {
    return false;
  }

}
);
  main.variable(observer("hasAuthorizationEndpointOnHomepage")).define("hasAuthorizationEndpointOnHomepage", ["homepageLinks","authorization_endpoint"], function(homepageLinks,authorization_endpoint){return(
homepageLinks.filter(p => p.rel === 'authorization_endpoint').map(p => p.href).includes(authorization_endpoint)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### Password`
)});
  main.variable(observer("wantsPassword")).define("wantsPassword", ["providers"], function(providers){return(
providers.includes('password')
)});
  const child1 = runtime.module(define1);
  main.import("viewof pass", child1);
  main.import("pass", child1);
  main.import("encryptedSecret", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`##### Observable`
)});
  main.variable(observer("hasObservable")).define("hasObservable", ["observableProfile"], function(observableProfile){return(
observableProfile.length > 0
)});
  main.variable(observer("displayObservableProfile")).define("displayObservableProfile", ["isValidObservable","observableProfile"], function(isValidObservable,observableProfile){return(
(isValidObservable && observableProfile) || "OBSERVABLE_PROFILE_URL"
)});
  main.variable(observer("isValidObservable")).define("isValidObservable", ["hasObservable","observableProfile"], function(hasObservable,observableProfile){return(
hasObservable && /^https:\/\/observablehq.com\/@([^/]*)$/.exec(observableProfile) !== null
)});
  main.variable(observer("observableProfileLinks")).define("observableProfileLinks", ["isValidObservable","rel_links","observableProfile"], function(isValidObservable,rel_links,observableProfile){return(
isValidObservable ? rel_links(observableProfile) : []
)});
  main.variable(observer("hasObservableOnHomepage")).define("hasObservableOnHomepage", ["homepageLinks","observableProfile"], function(homepageLinks,observableProfile){return(
homepageLinks.map(p => p.href).includes(observableProfile)
)});
  main.variable(observer("hasHomepageOnObservable")).define("hasHomepageOnObservable", ["observableProfileLinks","homepage"], function(observableProfileLinks,homepage){return(
observableProfileLinks.map(p => p.href).includes(homepage)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`##### Homepage`
)});
  main.variable(observer("hasHomepage")).define("hasHomepage", ["homepage"], function(homepage){return(
homepage.length > 0
)});
  main.variable(observer("displayHomepage")).define("displayHomepage", ["homepage"], function(homepage){return(
homepage || `HOMEPAGE_URL`
)});
  main.variable(observer("homepageLinks")).define("homepageLinks", ["isValidIdentity","rel_links","identityURL"], function(isValidIdentity,rel_links,identityURL){return(
isValidIdentity ? rel_links(identityURL) : []
)});
  main.variable(observer("identityURL")).define("identityURL", ["useObservableProfileAsIdentity","observableProfile","homepage"], function(useObservableProfileAsIdentity,observableProfile,homepage){return(
useObservableProfileAsIdentity ? observableProfile : homepage || 'IDENTITY_URL'
)});
  main.variable(observer("isIdentityHttps")).define("isIdentityHttps", ["identityURL"], function(identityURL){return(
identityURL.startsWith("https://")
)});
  main.variable(observer("isIdentityURL")).define("isIdentityURL", ["identityURL"], function(identityURL)
{
  try {
    new URL(identityURL)
    return true
  } catch (e) {
    return false;
  }
}
);
  main.variable(observer("isIdentityNormalized")).define("isIdentityNormalized", ["isIdentityURL","identityURL"], function(isIdentityURL,identityURL){return(
isIdentityURL ? new URL(identityURL).toString() === identityURL : false
)});
  main.variable(observer("isValidIdentity")).define("isValidIdentity", ["isIdentityNormalized","isIdentityHttps"], function(isIdentityNormalized,isIdentityHttps){return(
isIdentityNormalized && isIdentityHttps
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Config`
)});
  main.variable(observer("providerSupport")).define("providerSupport", function(){return(
{
  "github": {  
    
  }, 
  "facebook": {  
    error: "not supported"
  }, 
  "google": { 
    error: "not supported" 
  }, 
  "twitter": {  
    error: "not supported"
  },
  "email": {  
    error: "possible but not implemented yet"
  }, 
  "password": {  
    
  },
  "indieauth": {  
    
  }, 
  
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Imports`
)});
  const child2 = runtime.module(define2);
  main.import("Text", child2);
  main.import("Textarea", child2);
  main.import("Checkbox", child2);
  main.import("Toggle", child2);
  const child3 = runtime.module(define3);
  main.import("rel_links", child3);
  const child4 = runtime.module(define4);
  main.import("password_authorization_endpoint", child4);
  main.import("weblogin", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
