function _1(md){return(
md`# Async Lambda, SQS, EventBridge benchmark`
)}

function _2(md){return(
md`Run on cloudshell to resources in same region using boto3`
)}

function _3(Plot,data){return(
Plot.plot({
  color: { legend: true },
  marks: [
    Plot.line(
      data,
      Plot.binX({ y: "count" }, { x: "latency", stroke: "name", tip: true })
    )
  ]
})
)}

async function _data(FileAttachment){return(
(await FileAttachment("results.csv").csv()).flatMap((d) => [
  { name: "eventbridge", latency: d.eventbridge },
  { name: "sqs", latency: d.sqs },
  { name: "lambda", latency: d.lambda }
])
)}

function _5(md){return(
md`\`\`\`
import boto3
import time
import json

# Initialize clients
eventbridge_client = boto3.client('events')
lambda_client = boto3.client('lambda')
sqs_client = boto3.client('sqs')

# Parameters
event_bus_name = 'benchmark-tom'
lambda_function_name = 'benchmark-tom'
sqs_queue_url = 'https://sqs.eu-central-1.amazonaws.com/513386457761/benchmark-tom'
number_of_messages = 10  # Adjust based on your batching needs
number_of_runs = 1000
pause_between_invocations = 0.1  # 0.1 seconds

# Prepare messages
messages = [{'Id': str(i), 'MessageBody': '{"key": "value"}'} for i in range(number_of_messages)]
event_entries = [{'Source': 'benchmark.test', 'DetailType': 'test', 'Detail': '{"key": "value"}'} for _ in range(number_of_messages)]
lambda_payload = json.dumps([{'key': 'value'} for _ in range(number_of_messages)]).encode('utf-8')

results = []
for _ in range(number_of_runs):
    # Benchmark EventBridge put_events
    start_time = time.time()
    response = eventbridge_client.put_events(Entries=event_entries)
    eventbridge_time = time.time() - start_time

    # Benchmark Lambda async invocation
    start_time = time.time()
    response = lambda_client.invoke(FunctionName=lambda_function_name, InvocationType='Event', Payload=lambda_payload)
    lambda_time = time.time() - start_time

    # Benchmark SQS SendMessageBatch
    start_time = time.time()
    response = sqs_client.send_message_batch(QueueUrl=sqs_queue_url, Entries=messages)
    sqs_time = time.time() - start_time

    results.append([eventbridge_time, lambda_time, sqs_time])
    # Pause
    time.sleep(pause_between_invocations)

# dump as csv
with open('results.csv', 'w') as f:
    f.write('eventbridge,lambda,sqs\\n')
    for result in results:
        f.write(f'{result[0]},{result[1]},{result[2]}\\n')

\`\`\``
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["results.csv", {url: new URL("./files/e5dc4eefdbb93149cbef60746aaf867b41f0496fdac82b0fc1327cdc7dcec71688d5159592b805750c9cddb44d718ebb6b36170429db222bfad2bee184d34e28.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Plot","data"], _3);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["md"], _5);
  return main;
}
