// https://observablehq.com/@endpointservices/public-api-keys@289
import define1 from "./6eda90668ae03044@803.js";
import define2 from "./f92778131fd76559@1169.js";
import define3 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image.png",new URL("./files/5da8ca843c387a17b54a870c67205952093a9d5d724c1da41935faf2c3e6984f8fdde74a50a43e70b2ce2b3d7f3a7d50966ccbbe65ad2386562958574de35664",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Using Secrets for API keys in public notebooks (Airtable Example)

You can keep API keys secret in a public notebook by using [webcode](https://webcode.run)
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Create an server endpoint

Create a server endpoint which will have access to the API KEY, it will do the actual calls, and expose some kind of control API by reading the incoming request.

For our example, we will create an interface to Airtable, allowing people to submit Observable notebooks they like and list all the notebooks so far. Because the endpoint is executed remotely, the source code cannot be tampered with, and it's a secure place to enforce data constraints. For example, if you allow arbitrary URLs to be submitted, people might use the service for spam, so we also check that the submitted links are for Observable notebooks links only.
`
)});
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer("Airtable")).define("Airtable", async function(){return(
(await import("https://cdn.skypack.dev/airtable@0.11.1?min")).default
)});
  main.variable(observer("server")).define("server", ["endpoint","Airtable"], function(endpoint,Airtable){return(
endpoint("server", async (request, response, ctx) => {
  const API_KEY = ctx.secrets["AIRTABLE_API_KEY"];
  const base = new Airtable({ apiKey: API_KEY }).base("app2lD79fJnGQVTiP");

  // PUT for submitting a new notebook to the database
  if (request.method === "PUT") {
    const submission = JSON.parse(request.body);
    if (!/^https:\/\/observablehq.com\/@[^/]*\/[^/]*$/.exec(submission.url))
      return response.status(400).send("URL is not an Observable notebook");

    base("notebooks").create(
      [
        {
          fields: submission
        }
      ],
      function (err, records) {
        if (err) return response.status(500).send(err.message);
        else response.send("OK");
      }
    );
  }
  // GET for listing notebooks in the database
  else if (request.method === "GET") {
    const results = [];
    base("notebooks")
      .select({
        maxRecords: 20,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          records.forEach(function (record) {
            results.push(record.fields);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) return response.status(500).send(err.message);
          else response.json(results);
        }
      );
  } else {
    response.status(400).send("Unknown method", request.method);
  }
})
)});
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
md`## Upload secret to webcode

The webcode dashboard has a tab called "secrets"

- Click "+ new" to create a new secret
- Name it something self-explanatory, we called it "AIRTABLE_API_KEY", set the value and click "save"
- A few seconds later the UI should refresh with your new secret in the stored secrets section.
- Highlight the secret and bind it to your endpoint, making it available in the endpoints context.

<img src="${await FileAttachment("image.png").url()}"></a>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Create an client

You can call your server using "fetch", but its good practice to hide those details behind your own client SDK.
`
)});
  main.variable(observer("submitNotebook")).define("submitNotebook", ["server"], function(server){return(
async (record) => {
  const response = await fetch(server.href, {
    method: "PUT",
    body: JSON.stringify(record)
  });
  if (response.status !== 200) throw new Error(await response.text());
}
)});
  main.variable(observer("listNotebooks")).define("listNotebooks", ["server"], function(server){return(
async () => {
  const response = await fetch(server.href, {
    method: "GET"
  });
  if (response.status !== 200) throw new Error(await response.text());
  return await response.json();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Create your application`
)});
  main.variable(observer()).define(["refresh","Inputs","listNotebooks"], function(refresh,Inputs,listNotebooks){return(
refresh,
Inputs.table(listNotebooks(), {
  columns: ["url", "description", "tags"]
})
)});
  main.variable(observer("viewof submitNotebookForm")).define("viewof submitNotebookForm", ["view","error","Inputs"], function(view,error,Inputs){return(
view`<div>
  <mark>${error}</mark>
  ${["url", Inputs.text({ label: "notebook url", width: "100%" })]}
  ${["description", Inputs.textarea({ label: "description" })]}
  ${[
    "tags",
    Inputs.checkbox(
      ["developer", "datascience", "math", "data", "ethics", "blog"],
      { label: "tags" }
    )
  ]}
`
)});
  main.variable(observer("submitNotebookForm")).define("submitNotebookForm", ["Generators", "viewof submitNotebookForm"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","mutable error","submitNotebook","submitNotebookForm","mutable refresh"], function(Inputs,$0,submitNotebook,submitNotebookForm,$1){return(
Inputs.button("submit", {
  reduce: async () => {
    try {
      $0.value = "";
      await submitNotebook(submitNotebookForm);
      $1.value = $1.value + 1; // update table
    } catch (err) {
      $0.value = err.message;
    }
  }
})
)});
  main.define("initial refresh", function(){return(
0
)});
  main.variable(observer("mutable refresh")).define("mutable refresh", ["Mutable", "initial refresh"], (M, _) => new M(_));
  main.variable(observer("refresh")).define("refresh", ["mutable refresh"], _ => _.generator);
  main.define("initial error", function(){return(
""
)});
  main.variable(observer("mutable error")).define("mutable error", ["Mutable", "initial error"], (M, _) => new M(_));
  main.variable(observer("error")).define("error", ["mutable error"], _ => _.generator);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
