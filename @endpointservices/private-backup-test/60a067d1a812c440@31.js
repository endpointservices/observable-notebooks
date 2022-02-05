import define1 from "./1d309dbd9697e042@570.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Private Backup Test`
)});
  const child1 = runtime.module(define1);
  main.import("enableGithubBackups", child1);
  main.import("backupNowButton", child1);
  main.variable(observer()).define(["enableGithubBackups"], function(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices", // Target Github username/organization
  repo: "observable-notebooks", // Target Github repo
  debugProxy: true
})
)});
  main.variable(observer()).define(["backupNowButton"], function(backupNowButton){return(
backupNowButton()
)});
  return main;
}
