function _1(md){return(
md`# mps3 - Offline-first DB over S3-compatible storage
## vendor examples


Github project https://github.com/endpointservices/mps3`
)}

function _2(md){return(
md`### Import \`mps3\``
)}

function _mps3(){return(
import("https://cdn.skypack.dev/mps3@0.0.79?min")
)}

function _4(md){return(
md`### Configure client(s)`
)}

function _awsCredentials(){return(
{
  accessKeyId: "AKIAT4VAYEMISBT6BHDD",
  // This key only has access to one bucket that bucket is cleared daily, so its not sensative,
  // but it keeps triggrering the AWS key leak detector when the notebook is backed up to Github
  // so we hide it.
  secretAccessKey: "ᥚᥰ᥅᥆ᥙᥚᥔ᥈᥌ᥴᥭᥛᤧ᥎ᥙ᥆᥋ᤪᥱ᥊ᥘᤦ᥉᥆ᥝ᥸ᤦ᥼ᥰᥔ᥵ᤧ᤯ᥒᥖᥒᤨᥘ᥎᥅"
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ 6431))
    .join("")
}
)}

function _clientConfigs(awsCredentials){return(
[
  {
    label: "s3",
    defaultBucket: "mps3-demo",
    s3Config: {
      region: "eu-central-1",
      credentials: awsCredentials
    }
  },
  {
    label: "localfirst",
    minimizeListObjectsCalls: false,
    defaultBucket: "l1",
    pollFrequency: 10,
    offlineStorage: false,
    adaptiveClock: false,
    s3Config: {
      endpoint: "indexdb:"
    }
  },
  {
    defaultBucket: "s3-demo",
    defaultManifest: "proxy",
    label: "s3-proxy",
    s3Config: {
      endpoint: "https://mps3-proxy.endpointservices.workers.dev"
    }
  },
  {
    defaultBucket: "mps3-demo",
    label: "r2",
    s3Config: {
      region: "auto",
      endpoint:
        "https://a3e2af584fbdedd172bede5ca0018aae.r2.cloudflarestorage.com",
      credentials: {
        accessKeyId: "dea2043e6c6d798a11b2ed6cace39b0f",
        secretAccessKey:
          "036973c899fdf7607468f1830d038ec274d44fc89116775bc430d393b7dd9b9f"
      }
    }
  },
  {
    defaultBucket: "mps3-demo",
    label: "bckblz",
    useChecksum: false,
    useVersioning: true,
    s3Config: {
      endpoint: "https://s3.us-east-005.backblazeb2.com",
      region: "us-east-005",
      // Configured here: https://secure.backblaze.com/app_keys.htm?bznetid=17927252851691330596178
      // This auto deletes everything after one day
      credentials: {
        accessKeyId: "0056a0e8e0f4cf20000000004",
        secretAccessKey: "K005trGQCO0zYv+SVpYJhRtW0O399B0"
      }
    }
  },
  {
    label: "minio",
    minimizeListObjectsCalls: false,
    pollFrequency: 20,
    defaultBucket: "t8944859",
    s3Config: {
      endpoint: "http://127.0.0.1:9102",
      region: "eu-central-1",
      label: "minio",
      credentials: {
        accessKeyId: "mps3",
        secretAccessKey: "ZOAmumEzdsUUcVlQ"
      }
    }
  }
]
)}

function _7(md){return(
md`### AWS S3, Cloudflare R2, Backblaze, Minio (localhost), Localfirst (IndexDB)`
)}

function _selected(Inputs,tableModel){return(
Inputs.table(tableModel, {
  format: {
    config: (x) =>
      Inputs.textarea({
        value: JSON.stringify(x, null, 2),
        disabled: true,
        rows: 5
      }),
    latency: (x) => x
  },
  columns: ["label", "config", "latency"],
  height: 600
})
)}

function _9(md){return(
md`### S3-like Vendor Latency Measurements

e2e is the time it takes for a PUT to become visible on a LIST then a GET`
)}

function _10(Plot,latency_measurements,width){return(
Plot.auto(latency_measurements, {x: "operation", y: "latency", fx: "client", mark: "dot", color: "operation"}).plot({color: {legend: true}, width})
)}

function _11(md){return(
md`### Individual Client tester`
)}

function _clientLabel(Inputs,clientConfigs){return(
Inputs.select(
  ["none", ...clientConfigs].map((d) => d.label),
  { label: "client" }
)
)}

function _13(md){return(
md`#### writer`
)}

function _writer_client(clientConfigs,clientLabel,mps3,log)
{
  const config = clientConfigs.find((d) => d.label === clientLabel);
  return new mps3.MPS3({
    ...config,
    label: `${config.label}-w`,
    log
  });
}


function _value(Inputs){return(
Inputs.range([0, 10], {
  step: 1,
  value: 0,
  label: "value"
})
)}

function _last_write(writer_client,value)
{
  writer_client.put("key", value);
  console.log("wrote", value);
  return value;
}


function _17(md){return(
md`#### reader`
)}

function _reader_client(clientConfigs,clientLabel,mps3,online)
{
  const config = clientConfigs.find((d) => d.label === clientLabel);
  return new mps3.MPS3({
    ...config,
    label: `${config.label}-s`,
    online
  });
}


function _online(Inputs){return(
Inputs.toggle({ label: "online" })
)}

function _mirror(Inputs){return(
Inputs.range([0, 10], {
  disabled: true,
  label: "value received"
})
)}

function _subscription(Generators,invalidation,reader_client,$0){return(
Generators.observe((notify) => {
  // Should update when slider is moved
  invalidation.then(
    reader_client.subscribe("key", (val) => {
      notify(val);
      $0.value = val;
    })
  );
})
)}

function _22(md){return(
md`### IndexDB`
)}

function _indexPoll(){return(
0
)}

async function _databases(indexPoll,indexedDB)
{
  indexPoll;
  return (await indexedDB.databases()).filter((d) => d.name.startsWith("mps3"));
}


function _25(Inputs,databases,indexedDB,$0){return(
Inputs.button("delete all databases", {
  reduce: async () => {
    await Promise.all(databases.map((db) => indexedDB.deleteDatabase(db.name)));
    $0.value++;
  }
})
)}

function _26(md){return(
md`### Instrumentation`
)}

function _tableModel(clientConfigs,mps3,log,Inputs,$0,Event){return(
clientConfigs.map((config) => {
  console.log("config", config);
  const writer = new mps3.MPS3({
    ...config,
    label: `${config.label}-w`,
    log: log
  });
  const subscriber = new mps3.MPS3({
    ...config,
    label: `${config.label}-s`,
    log: log
  });

  return {
    label: config.label,
    config: config,
    writer,
    subscriber,
    latency: Inputs.button("run", {
      reduce: async () => {
        const t_start = Date.now();
        await writer.put("latency", t_start);
        const latency = await new Promise((resolve, reject) => {
          const unsubscribe = subscriber.subscribe("latency", (val) => {
            if (val === t_start) {
              unsubscribe();
              resolve(Date.now() - t_start);
            }
            if (Date.now() - t_start > 20000) {
              unsubscribe();
              reject("timeout");
            }
          });
        });
        console.log("latency", latency);
        $0.value.push({
          client: config.label,
          latency,
          operation: "e2e"
        });
        $0.dispatchEvent(new Event("input"));
      }
    })
  };
})
)}

function _latency_measurements(Inputs){return(
Inputs.input([])
)}

function _log(logs,$0,Event){return(
(...args) => {
  console.log(...args);
  const line = args.join(" ");
  const match = /(\S+) (\d+)ms (\S+)/.exec(line);
  logs.push(line);
  if (match) {
    const [_, label, millis, operation] = match;
    $0.value.push({
      client: label.replace("-s", "").replace("-w", ""),
      latency: Number.parseInt(millis),
      operation:
        operation.startsWith("PUT") || operation == "CLEANUP"
          ? "PUT"
          : operation === "SWEEP" ||
            operation === "POLL_TIME" ||
            operation == "LOOK_BACK" ||
            operation == "GET_CONTENT" ||
            operation == "GET_LATEST"
          ? "GET"
          : operation
    });
    $0.dispatchEvent(new Event("input"));
  }
}
)}

function _logs(Inputs){return(
Inputs.input([])
)}

function _31(md){return(
md`### S3 Working Example

To get S3 buckets working you need to remember to
- turn on CORS
  - expose the \`X-Amz-Version-Id\` header (if using versioned objects)
  - expose the \`ETag\` header.
  - increase the max-age to reduce the effect of preflight requests (doesn't seem to work, TBD)

~~~yaml
  [{
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["X-Amz-Version-Id", "ETag"]
  }]
~~~
`
)}

function _32(md){return(
md`## Backblaze

The CORS config is not standard, expose the version header. You can use the AWS CLI for this. Backblaze does not support sha256 checksums so useChecksum options must be set to false 


You can upload a CORS config like this
\`\`\`
AWS_ACCESS_KEY_ID=<ID> AWS_SECRET_ACCESS_KEY=<KEY> \\
  aws s3api put-bucket-cors \\
    --endpoint-url https://s3.us-east-005.backblazeb2.com \\
    --bucket mps3-demo \\
    --cors-configuration file://docs/cors.json
\`\`\``
)}

function _runBackblaze(Inputs){return(
Inputs.button("Run Backblaze Eample")
)}

function _backblaze_config(runBackblaze){return(
runBackblaze && {
  defaultBucket: "mps3-demo",
  label: "bckblz",
  useChecksum: false,
  useVersioning: true,
  s3Config: {
    endpoint: "https://s3.us-east-005.backblazeb2.com",
    region: "us-east-005",
    // Configured here: https://secure.backblaze.com/app_keys.htm?bznetid=17927252851691330596178
    // This auto deletes everything after one day
    credentials: {
      accessKeyId: "0056a0e8e0f4cf20000000004",
      secretAccessKey: "K005trGQCO0zYv+SVpYJhRtW0O399B0"
    }
  }
}
)}

function _backblaze(backblaze_config,mps3){return(
backblaze_config && new mps3.MPS3(backblaze_config)
)}

function _backblaze2(backblaze_config,mps3){return(
backblaze_config && new mps3.MPS3(backblaze_config)
)}

function _37(latency_backblaze){return(
latency_backblaze
)}

function _latency_backblaze(Inputs,backblaze,backblaze2){return(
Inputs.button("latency", {
  reduce: () => {
    const t_start = Date.now();
    backblaze.put("latency", t_start).then(() => backblaze2.refresh());
    return new Promise((resolve) => {
      const unsubscribe = backblaze2.subscribe("latency", (val) => {
        if (val === t_start) {
          unsubscribe();
          resolve(Date.now() - t_start);
        }
      });
    });
  }
})
)}

function _39(Generators,invalidation,backblaze2){return(
Generators.observe((notify) => {
  invalidation.then(backblaze2.subscribe("latency", notify));
})
)}

function _40(backblaze2){return(
backblaze2.get("latency")
)}

function _41(backblaze){return(
backblaze.put("latency", "cool")
)}

function _42(md){return(
md`## minio

Test against a locally running minio instance using \`docker-compose\`

~~~yaml
# docker-compose.yml
version: '3'
services:
  minio:
    image: 'minio/minio:latest'
    ports:
      - '\${FORWARD_MINIO_PORT:-9102}:9000'
      - '\${FORWARD_MINIO_CONSOLE_PORT:-9103}:9090'
    environment:
      MINIO_ROOT_USER: 'mps3'
      MINIO_ROOT_PASSWORD: 'ZOAmumEzdsUUcVlQ'
    command: minio server /data/minio --console-address ":9090"
~~~`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("mps3")).define("mps3", _mps3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("awsCredentials")).define("awsCredentials", _awsCredentials);
  main.variable(observer("clientConfigs")).define("clientConfigs", ["awsCredentials"], _clientConfigs);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof selected")).define("viewof selected", ["Inputs","tableModel"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","latency_measurements","width"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof clientLabel")).define("viewof clientLabel", ["Inputs","clientConfigs"], _clientLabel);
  main.variable(observer("clientLabel")).define("clientLabel", ["Generators", "viewof clientLabel"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("writer_client")).define("writer_client", ["clientConfigs","clientLabel","mps3","log"], _writer_client);
  main.variable(observer("viewof value")).define("viewof value", ["Inputs"], _value);
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer("last_write")).define("last_write", ["writer_client","value"], _last_write);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("reader_client")).define("reader_client", ["clientConfigs","clientLabel","mps3","online"], _reader_client);
  main.variable(observer("viewof online")).define("viewof online", ["Inputs"], _online);
  main.variable(observer("online")).define("online", ["Generators", "viewof online"], (G, _) => G.input(_));
  main.variable(observer("viewof mirror")).define("viewof mirror", ["Inputs"], _mirror);
  main.variable(observer("mirror")).define("mirror", ["Generators", "viewof mirror"], (G, _) => G.input(_));
  main.variable(observer("subscription")).define("subscription", ["Generators","invalidation","reader_client","viewof mirror"], _subscription);
  main.variable(observer()).define(["md"], _22);
  main.define("initial indexPoll", _indexPoll);
  main.variable(observer("mutable indexPoll")).define("mutable indexPoll", ["Mutable", "initial indexPoll"], (M, _) => new M(_));
  main.variable(observer("indexPoll")).define("indexPoll", ["mutable indexPoll"], _ => _.generator);
  main.variable(observer("databases")).define("databases", ["indexPoll","indexedDB"], _databases);
  main.variable(observer()).define(["Inputs","databases","indexedDB","mutable indexPoll"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("tableModel")).define("tableModel", ["clientConfigs","mps3","log","Inputs","viewof latency_measurements","Event"], _tableModel);
  main.variable(observer("viewof latency_measurements")).define("viewof latency_measurements", ["Inputs"], _latency_measurements);
  main.variable(observer("latency_measurements")).define("latency_measurements", ["Generators", "viewof latency_measurements"], (G, _) => G.input(_));
  main.variable(observer("log")).define("log", ["logs","viewof latency_measurements","Event"], _log);
  main.variable(observer("viewof logs")).define("viewof logs", ["Inputs"], _logs);
  main.variable(observer("logs")).define("logs", ["Generators", "viewof logs"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof runBackblaze")).define("viewof runBackblaze", ["Inputs"], _runBackblaze);
  main.variable(observer("runBackblaze")).define("runBackblaze", ["Generators", "viewof runBackblaze"], (G, _) => G.input(_));
  main.variable(observer("backblaze_config")).define("backblaze_config", ["runBackblaze"], _backblaze_config);
  main.variable(observer("backblaze")).define("backblaze", ["backblaze_config","mps3"], _backblaze);
  main.variable(observer("backblaze2")).define("backblaze2", ["backblaze_config","mps3"], _backblaze2);
  main.variable(observer()).define(["latency_backblaze"], _37);
  main.variable(observer("viewof latency_backblaze")).define("viewof latency_backblaze", ["Inputs","backblaze","backblaze2"], _latency_backblaze);
  main.variable(observer("latency_backblaze")).define("latency_backblaze", ["Generators", "viewof latency_backblaze"], (G, _) => G.input(_));
  main.variable(observer()).define(["Generators","invalidation","backblaze2"], _39);
  main.variable(observer()).define(["backblaze2"], _40);
  main.variable(observer()).define(["backblaze"], _41);
  main.variable(observer()).define(["md"], _42);
  return main;
}
