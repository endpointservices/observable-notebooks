import define1 from "./c686e8f9e2eb9b4c@2099.js";
import define2 from "./dfdb38d5580b5c35@334.js";

function _1(header){return(
header
)}

function _2(invites){return(
invites
)}

function _3(signupPrompt){return(
signupPrompt
)}

function _4(html){return(
html`<div class='content'><h2>This service is not accepting new customers at the moment</h2>`
)}

function _5(bonus){return(
bonus
)}

function _6(profileView){return(
profileView
)}

function _7(tutorial){return(
tutorial
)}

function _8(serversView){return(
serversView
)}

function _9(serverUsersView){return(
serverUsersView
)}

function _10($0){return(
$0
)}

function _11($0){return(
$0
)}

function _12(vmsCopier,userCopier,username_initializer,poll_state,updatedParams)
{
  [vmsCopier, userCopier, username_initializer, poll_state, updatedParams]
}


function _14(style){return(
style
)}

function _16(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["header"], _1);
  main.variable(observer()).define(["invites"], _2);
  main.variable(observer()).define(["signupPrompt"], _3);
  main.variable(observer()).define(["html"], _4);
  main.variable(observer()).define(["bonus"], _5);
  main.variable(observer()).define(["profileView"], _6);
  main.variable(observer()).define(["tutorial"], _7);
  main.variable(observer()).define(["serversView"], _8);
  main.variable(observer()).define(["serverUsersView"], _9);
  main.variable(observer()).define(["viewof newServerParameters"], _10);
  main.variable(observer()).define(["viewof logs"], _11);
  main.variable(observer()).define(["vmsCopier","userCopier","username_initializer","poll_state","updatedParams"], _12);
  const child1 = runtime.module(define1);
  main.import("header", child1);
  main.import("invites", child1);
  main.import("signupPrompt", child1);
  main.import("signin", child1);
  main.import("bonus", child1);
  main.import("profileView", child1);
  main.import("tutorial", child1);
  main.import("serversView", child1);
  main.import("serverUsersView", child1);
  main.import("viewof newServerParameters", child1);
  main.import("newServerParameters", child1);
  main.import("viewof logs", child1);
  main.import("logs", child1);
  main.import("futurice_profile_bulma", child1);
  main.import("style", child1);
  main.import("userCopier", child1);
  main.import("vmsCopier", child1);
  main.import("username_initializer", child1);
  main.import("poll_state", child1);
  main.import("updatedParams", child1);
  main.variable(observer()).define(["style"], _14);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _16);
  return main;
}
