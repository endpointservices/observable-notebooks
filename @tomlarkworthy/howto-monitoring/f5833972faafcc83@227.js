// https://observablehq.com/@tomlarkworthy/howto-monitoring@227
function _1(md){return(
md`# Productionizing Observable Notebooks with 3rd party Active Monitoring`
)}

async function _2(FileAttachment,md){return(
md`I keep my [200+ public notebooks](https://observablehq.com/@tomlarkworthy?tab=notebooks) on the [observablehq.com](https://observablehq.com) platform running by actively monitoring them with a 3rd party monitoring tool [uptimerobot](https://uptimerobot.com/?rid=ea2c825277fe40). Here is how I got it connected, and how I did it unobtrusively without altering the original notebooks.

<image width=300px src=${await FileAttachment("image@1.png").url()} />

Broken notebooks are a big problem. I have encountered many broken notebooks on [observablehq.com](https://observablehq.com), and then much later, I have written many more. The thing is, I did not know my old notebooks were broken until I randomly checked! I don't want to host broken notebooks, but I can't be checking 200 notebooks every week, it doesn't scale! Instead, I figured out a way to bring off-the-shelf monitoring solutions to the notebook ecosystem. The best thing is that it can be applied to any notebook. There is no special library or anything to depend upon *etc.*
`
)}

function _3(md){return(
md`### Using the [Observablehq runtime](https://github.com/observablehq/runtime) to create a [Healthcheck](https://observablehq.com/@endpointservices/healthcheck) Metabook

Did you know that all notebooks are packed as ES6 modules, and you can run them inside the open-source [Observablehq runtime](https://github.com/observablehq/runtime) programmatically? (see *[Advanced Embedding and Downloading](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks)*) This means a notebook can find and run code found in another notebook. I call these types of notebooks *metabooks* as they are higher-order notebooks (notebooks whose input is another notebook).

So, the [healthcheck metabook](https://observablehq.com/@endpointservices/healthcheck), given a target notebook, runs the target on an internal [Observablehq runtime](https://github.com/observablehq/runtime) and looks for errors.  

\`\`\`js
  const [{ Runtime }, { default: targetNotebook }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(\`https://api.observablehq.com/\${settings.target}.js?v=3\`)
  ]);
  new Runtime().module(targetNotebook, (name) => {
    // cell observers
    return {
      ...
      rejected(error) {
        // cell threw an error
        ...
      }
    }
  }
\`\`\`

Using the runtime hooks we can detect if a cell throws an error, which will pick up many common forms of notebook rot. To attach 3rd party monitoring though, this error detector needs to be exposed as a HTTP service for 3rd party consumption.`
)}

function _4(md){return(
md`### Exposing a HTTP service with [WEBcode.run](https://webcode.run)

We use Observable native functions-as-a-service runtime [WEBcode.run](https://webcode.run) to expose an endpoint on the internet.

With [WEBcode.run](https://webcode.run) you define a handler for *requests* that write back to a *response*. Because it executes in the notebook, you get access to all the notebook functionality. In our case, we decode a target notebook from a URL parameter. The API is modelled after the [Express 4.0 API](http://expressjs.com/en/api.html) (see [req](http://expressjs.com/en/api.html#req), [res](http://expressjs.com/en/api.html#res) for details).

\`\`\`js
endpoint(
  "default", // For a simple URL we use the default name
  async (req, res) => {
    const target = req.query.target; // Read the target notebook.
    run(target, excludes); // start health checking

    setTimeout(() => {
      // There is no clear stopping point so we just run it for X seconds
      const errors = viewof errors.value; // collect errors
      res.status(errors.length > 0 ? 503 : 200).send(
        JSON.stringify({
          errors: errors.map((e) => ({
            cell: e.cell,
            message: e.error.message
          }))
        }, null,2 )
      );
    }, 5000);
  },
  {
    reusable: false, // This does not support concurrent operations
    modifiers: ["orchistrator"] // This endpoint can call other endpoints
  }
)
\`\`\`

Our handler starts the healthcheck process, and after 5 seconds reports, if errors are found.

So, to check for errors on notebook [@tomlarkworthy/view](https://observablehq.com/@tomlarkworthy/view), we make a request using curl to 

\`\`\`
curl 'https://webcode.run/observablehq.com/@endpointservices/healthcheck?target=@tomlarkworthy/view'
\`\`\`

Because 3rd party monitoring tools typically just check HTTP status codes, our handler returns a status code 503 (unavailable) if errors are detected, or 200 (OK) otherwise.`
)}

async function _5(FileAttachment,md){return(
md`### Attaching UptimeRobot

UptimeRobot is a very simple to use active monitoring service and it will provide 50 monitoring jobs for FREE!

Active monitoring will poll the provided URL on a schedule, log the status, and alert via email/SMS/webhook if an error code is seen.

<img width=600 src=${await FileAttachment("image.png").url()} />


`
)}

async function _6(FileAttachment,md){return(
md`### Unit tests, Sentry

Being able to actively monitor my notebooks for errors has completely changed my anxiety levels. By looking at my dashboard I can see that all my main notebooks are running well. As I am building a business upon [Observablehq](https://observablehq.com/), I must keep everything working, so seeing my code has run successfully is reassuring.

<img width=640px src=${await FileAttachment("image@2.png").url()} />

The biggest change is that when an error is reported by an end-user, I now convert that issue into a [unit test](https://observablehq.com/@tomlarkworthy/testing). Because unit tests errors are runtime errors, a healthcheck over a notebook containing a test suite will alert on unit test failures. So now I can fairly confidently ensure that particular issues never happen again.

I also use [sentry.io](https://sentry.io) to automatically report errors, whether generated by user usage, or by healthcheck monitoring (see this [notebook](https://observablehq.com/@endpointservices/sentry-io)). Again, for low usage, [Sentry.io](https://sentry.io) is a FREE service. Sentry compliments [UptimeRobot](https://uptimerobot.com/?rid=ea2c825277fe40) by logging context around an error, and also it runs in user devices like iPhone which can sometimes have their unique issues.

I am very excited that we can take a developer-friendly product like [Observablehq](https://observablehq.com/) and still fit it into the existing DevOps infrastructure. It suggests that building high-quality software on [Observable](https://observablehq.com/) is possible, and maybe preferable. I love [Observable](https://observablehq.com/), in that, for all its workflow cleverness, it's still just Javascript running idiomatically in a browser, and thus, we can leverage existing specialist tools that already exist in the ecosystem. There is no need to reinvent the wheel when using Observable! I hope this story helps you get to the reliability levels you want out of your software hosted on [Observablehq](https://observablehq.com/).

*I tweet lots of Observable stuff at [@tomlarkworthy](https://twitter.com/tomlarkworthy), and occasionally launch things on [Product Hunt](https://www.producthunt.com/@tomlarkworthy)*
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/2253230f13912f8f402d77710dd58d91ee27451725ec8611d3955da5dc61114cbb903ac928be3ef3e3500d37976f636bee36217819c157e7efe82c2930ccd779.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/e0682d6edd9f1b0114481a16ff6b8de4cb08ae6bc6673d6b76b0b01ba1b1f71a83e01e852f93df939157947a6edf100f1c4e175ff032871d1fd2fd8202b20d82.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/2dccd49d91a9b918ebca77f540291631289666e86571005ab9b76ccdea1a389ba6e7370edbf2e51bc0a469dfea04643e029c76d4d524e6d48d29e0804b5fa72c.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["FileAttachment","md"], _5);
  main.variable(observer()).define(["FileAttachment","md"], _6);
  return main;
}
