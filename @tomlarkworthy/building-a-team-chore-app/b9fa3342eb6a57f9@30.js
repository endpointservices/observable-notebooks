function _1(md){return(
md`# Building a Team Chore App 
<h2>with Soren</h2>`
)}

function _2(md){return(
md`The Chore app is for people managers to help them organize acknowledgment of their team's birthday

The core cycle
- A week before a teams member's turn send an email to (company/team/people manager)
   - on the day, send the notification out
   - Manager gets to set the message
   - Attach files maybe?

Manager view
- key in their team including emails and name
- Set default template.

Required Technologies
- Scheduling software
- Send outbound Emails
- Collect responses in HTML forms
- Database to store team info
- Sign-in / authentication
`
)}

function _3(){return(
5 + 4
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(_3);
  return main;
}
