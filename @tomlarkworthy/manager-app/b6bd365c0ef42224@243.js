import define1 from "./2919aca09e04fcb8@2991.js";
import define2 from "./4e91ba6c5edba46c@761.js";
import define3 from "./993a0c51ef1175ea@1396.js";

function _1(md){return(
md`# Manager's Chore App

please signing below to access your team data`
)}

function _teaminfo(cellstore){return(
cellstore({
  owner: "tomlarkworthy",
  key: "teaminfo",
  per_user: true,
  writers: "all",
  readers: "all"
})
)}

function _3(md){return(
md`### Your Team`
)}

function _4(Inputs,teaminfo){return(
Inputs.table(teaminfo.team)
)}

function _teamMember(Inputs){return(
Inputs.form({
  name: Inputs.text({
    label: "name"
  }),
  email: Inputs.text({
    label: "email"
  })
})
)}

function _6(Inputs,$0,teamMember,randomId){return(
Inputs.button("add team member", {
  reduce: () => {
    $0.value = {
      ...$0.value,
      team: [...$0.value.team, { ...teamMember, id: randomId() }]
    };
  }
})
)}

function _7(md){return(
md`### Upcoming events`
)}

function _8(Inputs,teaminfo){return(
Inputs.table(teaminfo.events)
)}

function _9(md){return(
md`### Tasks`
)}

function _10(Inputs,teaminfo){return(
Inputs.table(Object.entries(teaminfo.tasks).map(([k, v]) => ({ id: k, ...v })))
)}

function _11(sendTask,teaminfo){return(
sendTask(teaminfo.team[0], teaminfo.tasks["getQuantity"])
)}

function _12(teaminfo){return(
teaminfo
)}

function _sendTask(db,sendEmail){return(
function sendTask(user, task) {
  const dbpath = `tasks/${user.id}/${task.id}`;
  // Save the task to the database under the user's id\
  db.ref(dbpath).set(task.html);

  // Create a link to a webpage with a parameter of the database record
  const link = `https://observablehq.com/d/8a1ca79e6b18857c?rtdbtask=${encodeURIComponent(
    dbpath
  )}`;

  // Create the email
  const email = `
    Dear ${user.name},
    Please click the link below to view your task:
    <a href=${link}>your task</a>
    Best regards,
    The Team
  `;

  // Send the email
  sendEmail({
    to: user.email,
    title: "Your Task",
    body: email
  });
}
)}

function _14(Inputs,$0){return(
Inputs.button("update database", {
  reduce: () => {
    $0.value = {
      events: [
        {
          person_id: "lkfahjflkahjflkda",
          date: "2022-09-15T18:56:01",
          template_id: "getQuantity"
        }
      ],
      tasks: {
        getQuantity: {
          id: "getQuantity",
          type: "rtdb",
          html: `<form action="https://observablehq.com/d/8a1ca79e6b18857c"><label for="qty">Qty</label><input type="number" name="qty" id="qty"><input type="hidden" name="respond" value="/responses/lkjasdlkasjkljdsa"><button type="submit">submit</button></form>`
        }
      },
      team: [
        {
          id: "lkfahjflkahjflkda",
          name: "Tom",
          email: "tom.larkworthy@gmail.com"
        }
      ]
    };
  }
})
)}

function _15(cellstoreDeps){return(
cellstoreDeps
)}

function _sendEmail(createTrigger){return(
createTrigger({
  name: "sendemail",
  authorized_public_keys: ["SAwh+7heCihCOMYFVfDT3o9Piy2K5V7c8XNzQYVpkGU="],
  checkPayload: () => true, // TODO: we need to check the content validity to avoid spamming
  sample: {
    to: "tom.larkworthy@gmail.com",
    title: "Title of the email",
    body: "This is the email body"
  }
})
)}

function _19(sendEmail){return(
sendEmail({
  to: "tom.larkworthy@gmail.com",
  title: "Testing email sending",
  body: "Hi this is a test"
})
)}

function _randomId(){return(
() => Math.random().toString(16).substring(3)
)}

function _db(firebase){return(
firebase.database()
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyAy7DrkXtQdHcJ6eLhBuXHAP1EDkJxHDSc",
  authDomain: "choreapp-954bd.firebaseapp.com",
  databaseURL:
    "https://choreapp-954bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "choreapp-954bd",
  storageBucket: "choreapp-954bd.appspot.com",
  messagingSenderId: "834144188417",
  appId: "1:834144188417:web:0d8da2a55d89eb1e77e800",
  uiConfig: {
    // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["google.com", "password", "phone"]
    // tosUrl: '<your-tos-url>', // Terms of service url.
    // privacyPolicyUrl: '<your-privacy-policy-url>', // Privacy policy url.
  }
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof teaminfo")).define("viewof teaminfo", ["cellstore"], _teaminfo);
  main.variable(observer("teaminfo")).define("teaminfo", ["Generators", "viewof teaminfo"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["Inputs","teaminfo"], _4);
  main.variable(observer("viewof teamMember")).define("viewof teamMember", ["Inputs"], _teamMember);
  main.variable(observer("teamMember")).define("teamMember", ["Generators", "viewof teamMember"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof teaminfo","teamMember","randomId"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Inputs","teaminfo"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Inputs","teaminfo"], _10);
  main.variable(observer()).define(["sendTask","teaminfo"], _11);
  main.variable(observer()).define(["teaminfo"], _12);
  main.variable(observer("sendTask")).define("sendTask", ["db","sendEmail"], _sendTask);
  main.variable(observer()).define(["Inputs","viewof teaminfo"], _14);
  main.variable(observer()).define(["cellstoreDeps"], _15);
  const child1 = runtime.module(define1);
  main.import("cellstore", child1);
  main.import("cellstoreDeps", child1);
  const child2 = runtime.module(define2);
  main.import("createTrigger", child2);
  main.variable(observer("sendEmail")).define("sendEmail", ["createTrigger"], _sendEmail);
  main.variable(observer()).define(["sendEmail"], _19);
  main.variable(observer("randomId")).define("randomId", _randomId);
  const child3 = runtime.module(define3).derive(["firebaseConfig"], main);
  main.import("firebase", child3);
  main.import("viewof user", child3);
  main.import("user", child3);
  main.import("listen", child3);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  return main;
}
