import define1 from "./17c8ce433e1df58e@3584.js";
import define2 from "./e93eab08140b49b2@2875.js";
import define3 from "./04318fffe4df9d1e@2463.js";

function _1(md){return(
md`# OpenAI Realtime API

When enable mic is ticked the mic is streamed to OpenAI and the model recognises automatically when it should reply and the reply is vocalised automatically. Uses the [Realtime API](https://openai.com/index/introducing-the-realtime-api/) released Oct 1st 2024.

<iframe width="640" height="480" src="https://www.youtube.com/embed/tgPEEd11vkI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

It was surprisingly technical to get working, uses \`AudioWorkletNode\` to get playback working well. You need to put in an OPEN_AI_API key near the bottom.

Change log
- 2024-12-27 switch to "gpt-4o-mini-realtime-preview-2024-12-17"

TODO
- Auto interruption
- Maybe input suppression when its talking?`
)}

function _realtimeModel(Inputs){return(
Inputs.select(
  [
    "gpt-4o-realtime-preview-2024-10-01",
    "gpt-4o-mini-realtime-preview-2024-12-17",
    "gpt-4o-realtime-preview-2024-12-17"
  ],
  {
    label: "realtime model",
    value: "gpt-4o-mini-realtime-preview-2024-12-17"
  }
)
)}

function _enable(Inputs){return(
Inputs.toggle({ label: "realtime conversation" })
)}

function _whisperPrompt(whisperInput,OPENAI_API_KEY){return(
whisperInput({
  API_KEY: OPENAI_API_KEY,
  content: "🎙️ push to prompt"
})
)}

function _volume(Inputs){return(
Inputs.range([0, 10], { value: 0, step: 0.1, label: "Volume" })
)}

function _auto_volume(enable,$0,Event)
{
  if (enable && $0.value == 0) {
    $0.value = 5;
    $0.dispatchEvent(new Event("input"));
  }
}


async function _whisper_forward($0,Event,client,whisperPrompt)
{
  if ($0.value == 0) {
    $0.value = 5;
    $0.dispatchEvent(new Event("input"));
  }
  if (!client.isConnected()) await client.connect();
  client.sendUserMessageContent([{ type: "input_text", text: whisperPrompt }]);
}


function _8(Inputs,$0,Event,client){return(
Inputs.button("say a Haiku (testing)", {
  reduce: () => {
    if ($0.value == 0) {
      $0.value = 5;
      $0.dispatchEvent(new Event("input"));
    }
    client.sendUserMessageContent([
      { type: "input_text", text: `speak a haiku` }
    ]);
  }
})
)}

function _instructions(Inputs){return(
Inputs.textarea({
  label: "instructions",
  value: `Reply breifly, in a conversational style.`,
  submit: true
})
)}

function _unprocessed_input(enable,Generators,invalidation){return(
enable
  ? Generators.observe((notify) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)({
          sampleRate: 24000
        });
        const audioInput = audioContext.createMediaStreamSource(stream);
        const volume = audioContext.createGain();
        audioInput.connect(volume);
        const bufferSize = 2048;
        const recorder = (
          audioContext.createScriptProcessor ||
          audioContext.createJavaScriptNode
        ).call(audioContext, bufferSize, 1, 1);
        const leftChannel = [];
        let recordingLength = 0;

        recorder.onaudioprocess = function (event) {
          const samples = event.inputBuffer.getChannelData(0);

          // we clone the samples
          leftChannel.push(new Float32Array(samples));
          notify(leftChannel);

          recordingLength += bufferSize;
        };

        // we connect the recorder
        volume.connect(recorder);

        // start recording
        recorder.connect(audioContext.destination);
        invalidation.then(() => {
          audioInput.disconnect();
          volume.disconnect();
          recorder.disconnect();
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
          audioContext.close();
        });
      });
    })
  : this || []
)}

async function _input_forwarding(unprocessed_input,client)
{
  while (unprocessed_input.length > 0) {
    try {
      const data = await unprocessed_input.shift();
      client.appendInputAudio(data);
    } catch (e) {
      console.error(e);
    }
  }
}


async function _client(RealtimeClient,OPENAI_API_KEY,instructions)
{
  const client = new RealtimeClient({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowAPIKeyInBrowser: true
  });
  // Can set parameters ahead of connecting, either separately or all at once
  client.updateSession({ instructions: instructions });
  client.updateSession({ voice: "alloy" });
  client.updateSession({
    turn_detection: { type: "server_vad" },
    input_audio_transcription: { model: "whisper-1" }
  });
  // Connect to Realtime API
  await client.connect();
  return client;
}


function _13(unprocessed,Inputs,client)
{
  unprocessed;
  return Inputs.textarea({
    disabled: true,
    rows: 12,
    value: client.conversation
      .getItems()
      .map(
        (item) =>
          item.role +
          ": \n" +
          (item.formatted.text || item.formatted.transcript)
      )
      .join("\n")
  });
}


function _gain(audioContext){return(
audioContext.createGain()
)}

async function _audioContext($0,invalidation,messageProcessorScriptUrl)
{
  var ctx = new (window.AudioContext || window.webkitAudioContext)({
    sampleRate: 24000
  });
  if (ctx.state !== "running") {
    // The browser didn't let us start playing sound yet.
    // Wait for the user to move the volume slider.
    await new Promise((resolve) => {
      $0.addEventListener("input", resolve);
    });
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Close the previous context when this cell reloads.
  // This avoids playing multiple sounds at once.
  invalidation.then(() => ctx.close());

  await ctx.audioWorklet.addModule(messageProcessorScriptUrl);
  return ctx;
}


function _16(gain,volume)
{
  gain.gain.value = volume / 20.0;
}


function _audio_graph(messageProcessor,gain,audioContext,invalidation)
{
  messageProcessor.connect(gain);
  gain.connect(audioContext.destination);

  invalidation.then(() => {
    gain.disconnect();
  });
}


function _unprocessed(Generators,client){return(
Generators.observe((notify) => {
  const buffer = [];
  notify(buffer);
  client.on("conversation.updated", (event) => {
    if (event?.delta?.audio) {
      buffer.push(event.delta);
      if (buffer.length <= 2) notify(buffer);
    }
  });
})
)}

function _autoPlayAudio(unprocessed,messageProcessor)
{
  ({
    prompt:
      "can you play the audo in the incoming payload using web audio. Its packed in an 'Int16Array(51600) ' at incoming.at(-1).formatted.audio",
    time: 1728369509847
  });
  while (unprocessed.length > 0) {
    const audioData = unprocessed.shift()?.audio;
    if (audioData instanceof Int16Array) {
      const float32 = new Float32Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        float32[i] = audioData[i] / 32768;
      }
      messageProcessor.port.postMessage(float32);
    }
  }
}


function _auto_turnoff(enable,$0,Event,invalidation)
{
  if (enable) {
    const id = setTimeout(() => {
      $0.value = false;
      $0.dispatchEvent(new Event("input"));
    }, 1000 * 60);
    invalidation(() => clearTimeout(id));
  }
}


function _messageProcessorScript(){return(
{
  prompt:
    "Create a MessageProcessor that sets up in inbound ring buffer, receives messages and plays them\n\nSomething like \n\nimport Module from './buffer-kernel.wasmodule.js';\nimport { HeapAudioBuffer, RingBuffer, ALAW_TO_LINEAR } from './audio-helper.js';\n\nclass SpeakerWorkletProcessor extends AudioWorkletProcessor {\n  constructor(options) {\n    super();\n    this.payload = null;\n    this.bufferSize = options.processorOptions.bufferSize; // Getting buffer size from options\n    this.channelCount = options.processorOptions.channelCount;\n    this.inputRingBuffer = new RingBuffer(this.bufferSize, this.channelCount);\n    this.outputRingBuffer = new RingBuffer(this.bufferSize, this.channelCount);\n    this.heapInputBuffer = new HeapAudioBuffer(Module, this.bufferSize, this.channelCount);\n    this.heapOutputBuffer = new HeapAudioBuffer(Module, this.bufferSize, this.channelCount);\n    this.kernel = new Module.VariableBufferKernel(this.bufferSize);\n    this.port.onmessage = this.onmessage.bind(this);\n  }\n\n  alawToLinear(incomingData) {\n    const outputData = new Float32Array(incomingData.length);\n    for (let i = 0; i < incomingData.length; i++) {\n      outputData[i] = (ALAW_TO_LINEAR[incomingData[i]] * 1.0) / 32768;\n    }\n    return outputData;\n  }\n\n  onmessage(event) {\n    const { data } = event;\n    if (data) {\n      this.payload = this.alawToLinear(new Uint8Array(data)); //Receiving data from my Socket listener and in my case converting PCM alaw to linear\n    } else {\n      this.payload = null;\n    }\n  }\n\n  process(inputs, outputs) {\n    const output = outputs[0];\n    if (this.payload) {\n      this.inputRingBuffer.push([this.payload]); // Pushing data from my Socket\n\n      if (this.inputRingBuffer.framesAvailable >= this.bufferSize) { // if the input data size hits the buffer size, so I can \"outputted\"  \n        this.inputRingBuffer.pull(this.heapInputBuffer.getChannelData());\n        this.kernel.process(\n          this.heapInputBuffer.getHeapAddress(),\n          this.heapOutputBuffer.getHeapAddress(),\n          this.channelCount,\n        );\n        this.outputRingBuffer.push(this.heapOutputBuffer.getChannelData());\n      }\n      this.outputRingBuffer.pull(output); // Retriving data from FIFO and putting our output\n    }\n    return true;\n  }\n}\n\nregisterProcessor(`speaker-worklet-processor`, SpeakerWorkletProcessor);\n\n\nbut much simpler so it can be a single script without imports.",
  time: 1728408287970
} &&
  `
class MessageProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.buffers = [];
    this.port.onmessage = this.onMessage.bind(this);
  }

  onMessage(event) {
    // Assume data is Float32Array
    this.buffers.push({
      index: 0,
      data: event.data
    });
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const outputChannel = output[0];
    for (let i = 0; i < outputChannel.length; i++) {
      if (this.buffers.length > 0)
        if(this.buffers[0].index < this.buffers[0].data.length)
          outputChannel[i] = this.buffers[0].data[this.buffers[0].index++];
        else
          this.buffers.shift()
    }
    
    return true;
  }
}

registerProcessor('message-processor', MessageProcessor);
`
)}

function _messageProcessorScriptUrl(messageProcessorScript){return(
URL.createObjectURL(
  new Blob([messageProcessorScript], { type: "text/javascript" })
)
)}

function _messageProcessor(AudioWorkletNode,audioContext){return(
new AudioWorkletNode(audioContext, "message-processor")
)}

function _24(md){return(
md`## Realtime API Client

transcribed from https://github.com/openai/openai-realtime-api-beta/commit/d7bf27b842638f01c0d07d517d0d8a1b9ce4b63b`
)}

function _RealtimeConversation(RealtimeUtils){return(
class RealtimeConversation {
  defaultFrequency = 24_000; // 24,000 Hz

  EventProcessors = {
    "conversation.item.created": (event) => {
      const { item } = event;
      // deep copy values
      const newItem = JSON.parse(JSON.stringify(item));
      if (!this.itemLookup[newItem.id]) {
        this.itemLookup[newItem.id] = newItem;
        this.items.push(newItem);
      }
      newItem.formatted = {};
      newItem.formatted.audio = new Int16Array(0);
      newItem.formatted.text = "";
      newItem.formatted.transcript = "";
      // If we have a speech item, can populate audio
      if (this.queuedSpeechItems[newItem.id]) {
        newItem.formatted.audio = this.queuedSpeechItems[newItem.id].audio;
        delete this.queuedSpeechItems[newItem.id]; // free up some memory
      }
      // Populate formatted text if it comes out on creation
      if (newItem.content) {
        const textContent = newItem.content.filter((c) =>
          ["text", "input_text"].includes(c.type)
        );
        for (const content of textContent) {
          newItem.formatted.text += content.text;
        }
      }
      // If we have a transcript item, can pre-populate transcript
      if (this.queuedTranscriptItems[newItem.id]) {
        newItem.formatted.transcript = this.queuedTranscriptItems.transcript;
        delete this.queuedTranscriptItems[newItem.id];
      }
      if (newItem.type === "message") {
        if (newItem.role === "user") {
          newItem.status = "completed";
          if (this.queuedInputAudio) {
            newItem.formatted.audio = this.queuedInputAudio;
            this.queuedInputAudio = null;
          }
        } else {
          newItem.status = "in_progress";
        }
      } else if (newItem.type === "function_call") {
        newItem.formatted.tool = {
          type: "function",
          name: newItem.name,
          call_id: newItem.call_id,
          arguments: ""
        };
        newItem.status = "in_progress";
      } else if (newItem.type === "function_call_output") {
        newItem.status = "completed";
        newItem.formatted.output = newItem.output;
      }
      return { item: newItem, delta: null };
    },
    "conversation.item.truncated": (event) => {
      const { item_id, audio_end_ms } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(`item.truncated: Item "${item_id}" not found`);
      }
      const endIndex = Math.floor(
        (audio_end_ms * this.defaultFrequency) / 1000
      );
      item.formatted.transcript = "";
      item.formatted.audio = item.formatted.audio.slice(0, endIndex);
      return { item, delta: null };
    },
    "conversation.item.deleted": (event) => {
      const { item_id } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(`item.deleted: Item "${item_id}" not found`);
      }
      delete this.itemLookup[item.id];
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      return { item, delta: null };
    },
    "conversation.item.input_audio_transcription.completed": (event) => {
      const { item_id, content_index, transcript } = event;
      const item = this.itemLookup[item_id];
      // We use a single space to represent an empty transcript for .formatted values
      // Otherwise it looks like no transcript provided
      const formattedTranscript = transcript || " ";
      if (!item) {
        // We can receive transcripts in VAD mode before item.created
        // This happens specifically when audio is empty
        this.queuedTranscriptItems[item_id] = {
          transcript: formattedTranscript
        };
        return { item: null, delta: null };
      } else {
        item.content[content_index].transcript = transcript;
        item.formatted.transcript = formattedTranscript;
        return { item, delta: { transcript } };
      }
    },
    "input_audio_buffer.speech_started": (event) => {
      const { item_id, audio_start_ms } = event;
      this.queuedSpeechItems[item_id] = { audio_start_ms };
      return { item: null, delta: null };
    },
    "input_audio_buffer.speech_stopped": (event, inputAudioBuffer) => {
      const { item_id, audio_end_ms } = event;
      const speech = this.queuedSpeechItems[item_id];
      speech.audio_end_ms = audio_end_ms;
      if (inputAudioBuffer) {
        const startIndex = Math.floor(
          (speech.audio_start_ms * this.defaultFrequency) / 1000
        );
        const endIndex = Math.floor(
          (speech.audio_end_ms * this.defaultFrequency) / 1000
        );
        speech.audio = inputAudioBuffer.slice(startIndex, endIndex);
      }
      return { item: null, delta: null };
    },
    "response.created": (event) => {
      const { response } = event;
      if (!this.responseLookup[response.id]) {
        this.responseLookup[response.id] = response;
        this.responses.push(response);
      }
      return { item: null, delta: null };
    },
    "response.output_item.added": (event) => {
      const { response_id, item } = event;
      const response = this.responseLookup[response_id];
      if (!response) {
        throw new Error(
          `response.output_item.added: Response "${response_id}" not found`
        );
      }
      response.output.push(item.id);
      return { item: null, delta: null };
    },
    "response.output_item.done": (event) => {
      const { item } = event;
      if (!item) {
        throw new Error(`response.output_item.done: Missing "item"`);
      }
      const foundItem = this.itemLookup[item.id];
      if (!foundItem) {
        throw new Error(
          `response.output_item.done: Item "${item.id}" not found`
        );
      }
      foundItem.status = item.status;
      return { item: foundItem, delta: null };
    },
    "response.content_part.added": (event) => {
      const { item_id, part } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(
          `response.content_part.added: Item "${item_id}" not found`
        );
      }
      item.content.push(part);
      return { item, delta: null };
    },
    "response.audio_transcript.delta": (event) => {
      const { item_id, content_index, delta } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(
          `response.audio_transcript.delta: Item "${item_id}" not found`
        );
      }
      item.content[content_index].transcript += delta;
      item.formatted.transcript += delta;
      return { item, delta: { transcript: delta } };
    },
    "response.audio.delta": (event) => {
      const { item_id, content_index, delta } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(`response.audio.delta: Item "${item_id}" not found`);
      }
      // This never gets renderered, we care about the file data instead
      // item.content[content_index].audio += delta;
      const arrayBuffer = RealtimeUtils.base64ToArrayBuffer(delta);
      const appendValues = new Int16Array(arrayBuffer);
      item.formatted.audio = RealtimeUtils.mergeInt16Arrays(
        item.formatted.audio,
        appendValues
      );
      return { item, delta: { audio: appendValues } };
    },
    "response.text.delta": (event) => {
      const { item_id, content_index, delta } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(`response.text.delta: Item "${item_id}" not found`);
      }
      item.content[content_index].text += delta;
      item.formatted.text += delta;
      return { item, delta: { text: delta } };
    },
    "response.function_call_arguments.delta": (event) => {
      const { item_id, delta } = event;
      const item = this.itemLookup[item_id];
      if (!item) {
        throw new Error(
          `response.function_call_arguments.delta: Item "${item_id}" not found`
        );
      }
      item.arguments += delta;
      item.formatted.tool.arguments += delta;
      return { item, delta: { arguments: delta } };
    }
  };

  /**
   * Create a new RealtimeConversation instance
   * @returns {RealtimeConversation}
   */
  constructor() {
    this.clear();
  }

  /**
   * Clears the conversation history and resets to default
   * @returns {true}
   */
  clear() {
    this.itemLookup = {};
    this.items = [];
    this.responseLookup = {};
    this.responses = [];
    this.queuedSpeechItems = {};
    this.queuedTranscriptItems = {};
    this.queuedInputAudio = null;
    return true;
  }

  /**
   * Queue input audio for manual speech event
   * @param {Int16Array} inputAudio
   * @returns {Int16Array}
   */
  queueInputAudio(inputAudio) {
    this.queuedInputAudio = inputAudio;
    return inputAudio;
  }

  /**
   * Process an event from the WebSocket server and compose items
   * @param {Object} event
   * @param  {...any} args
   * @returns {item: import('./client.js').ItemType | null, delta: ItemContentDeltaType | null}
   */
  processEvent(event, ...args) {
    if (!event.event_id) {
      console.error(event);
      throw new Error(`Missing "event_id" on event`);
    }
    if (!event.type) {
      console.error(event);
      throw new Error(`Missing "type" on event`);
    }
    const eventProcessor = this.EventProcessors[event.type];
    if (!eventProcessor) {
      throw new Error(
        `Missing conversation event processor for "${event.type}"`
      );
    }
    return eventProcessor.call(this, event, ...args);
  }

  /**
   * Retrieves a item by id
   * @param {string} id
   * @returns {import('./client.js').ItemType}
   */
  getItem(id) {
    return this.itemLookup[id] || null;
  }

  /**
   * Retrieves all items in the conversation
   * @returns {import('./client.js').ItemType[]}
   */
  getItems() {
    return this.items.slice();
  }
}
)}

function _RealtimeAPI(RealtimeEventHandler,globalThis,realtimeModel,RealtimeUtils){return(
class RealtimeAPI extends RealtimeEventHandler {
  /**
   * Create a new RealtimeAPI instance
   * @param {{url?: string, apiKey?: string, dangerouslyAllowAPIKeyInBrowser?: boolean, debug?: boolean}} [settings]
   * @returns {RealtimeAPI}
   */
  constructor({ url, apiKey, dangerouslyAllowAPIKeyInBrowser, debug } = {}) {
    super();
    this.defaultUrl = "wss://api.openai.com/v1/realtime";
    this.url = url || this.defaultUrl;
    this.apiKey = apiKey || null;
    this.debug = !!debug;
    this.ws = null;
    if (globalThis.document && this.apiKey) {
      if (!dangerouslyAllowAPIKeyInBrowser) {
        throw new Error(
          `Can not provide API key in the browser without "dangerouslyAllowAPIKeyInBrowser" set to true`
        );
      }
    }
  }

  /**
   * Tells us whether or not the WebSocket is connected
   * @returns {boolean}
   */
  isConnected() {
    return !!this.ws;
  }

  /**
   * Writes WebSocket logs to console
   * @param  {...any} args
   * @returns {true}
   */
  log(...args) {
    const date = new Date().toISOString();
    const logs = [`[Websocket/${date}]`].concat(args).map((arg) => {
      if (typeof arg === "object" && arg !== null) {
        return JSON.stringify(arg, null, 2);
      } else {
        return arg;
      }
    });
    if (this.debug) {
      console.log(...logs);
    }
    return true;
  }

  /**
   * Connects to Realtime API Websocket Server
   * @param {{model?: string}} [settings]
   * @returns {Promise<true>}
   */
  async connect({ model } = { model: realtimeModel }) {
    if (!this.apiKey && this.url === this.defaultUrl) {
      console.warn(`No apiKey provided for connection to "${this.url}"`);
    }
    if (this.isConnected()) {
      throw new Error(`Already connected`);
    }
    if (globalThis.document) {
      /**
       * Web browser
       */
      if (this.apiKey) {
        console.warn(
          "Warning: Connecting using API key in the browser, this is not recommended"
        );
      }
      const WebSocket = globalThis.WebSocket;
      const ws = new WebSocket(`${this.url}${model ? `?model=${model}` : ""}`, [
        "realtime",
        `openai-insecure-api-key.${this.apiKey}`,
        "openai-beta.realtime-v1"
      ]);
      ws.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        this.receive(message.type, message);
      });
      return new Promise((resolve, reject) => {
        const connectionErrorHandler = () => {
          this.disconnect(ws);
          reject(new Error(`Could not connect to "${this.url}"`));
        };
        ws.addEventListener("error", connectionErrorHandler);
        ws.addEventListener("open", () => {
          this.log(`Connected to "${this.url}"`);
          ws.removeEventListener("error", connectionErrorHandler);
          ws.addEventListener("error", () => {
            this.disconnect(ws);
            this.log(`Error, disconnected from "${this.url}"`);
            this.dispatch("close", { error: true });
          });
          ws.addEventListener("close", () => {
            this.disconnect(ws);
            this.log(`Disconnected from "${this.url}"`);
            this.dispatch("close", { error: false });
          });
          this.ws = ws;
          resolve(true);
        });
      });
    } else {
      /**
       * Node.js
       */
      const moduleName = "ws";
      const wsModule = await import(/* webpackIgnore: true */ moduleName);
      const WebSocket = wsModule.default;
      const ws = new WebSocket(
        "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
        [],
        {
          finishRequest: (request) => {
            // Auth
            request.setHeader("Authorization", `Bearer ${this.apiKey}`);
            request.setHeader("OpenAI-Beta", "realtime=v1");
            request.end();
          }
        }
      );
      ws.on("message", (data) => {
        const message = JSON.parse(data.toString());
        this.receive(message.type, message);
      });
      return new Promise((resolve, reject) => {
        const connectionErrorHandler = () => {
          this.disconnect(ws);
          reject(new Error(`Could not connect to "${this.url}"`));
        };
        ws.on("error", connectionErrorHandler);
        ws.on("open", () => {
          this.log(`Connected to "${this.url}"`);
          ws.removeListener("error", connectionErrorHandler);
          ws.on("error", () => {
            this.disconnect(ws);
            this.log(`Error, disconnected from "${this.url}"`);
            this.dispatch("close", { error: true });
          });
          ws.on("close", () => {
            this.disconnect(ws);
            this.log(`Disconnected from "${this.url}"`);
            this.dispatch("close", { error: false });
          });
          this.ws = ws;
          resolve(true);
        });
      });
    }
  }

  /**
   * Disconnects from Realtime API server
   * @param {WebSocket} [ws]
   * @returns {true}
   */
  disconnect(ws) {
    if (!ws || this.ws === ws) {
      this.ws && this.ws.close();
      this.ws = null;
      return true;
    }
  }

  /**
   * Receives an event from WebSocket and dispatches as "server.{eventName}" and "server.*" events
   * @param {string} eventName
   * @param {{[key: string]: any}} event
   * @returns {true}
   */
  receive(eventName, event) {
    this.log(`received:`, eventName, event);
    this.dispatch(`server.${eventName}`, event);
    this.dispatch("server.*", event);
    return true;
  }

  /**
   * Sends an event to WebSocket and dispatches as "client.{eventName}" and "client.*" events
   * @param {string} eventName
   * @param {{[key: string]: any}} event
   * @returns {true}
   */
  send(eventName, data) {
    if (!this.isConnected()) {
      throw new Error(`RealtimeAPI is not connected`);
    }
    data = data || {};
    if (typeof data !== "object") {
      throw new Error(`data must be an object`);
    }
    const event = {
      event_id: RealtimeUtils.generateId("evt_"),
      type: eventName,
      ...data
    };
    this.dispatch(`client.${eventName}`, event);
    this.dispatch("client.*", event);
    this.log(`sent:`, eventName, event);
    this.ws.send(JSON.stringify(event));
    return true;
  }
}
)}

function _RealtimeClient(RealtimeEventHandler,RealtimeAPI,RealtimeConversation,RealtimeUtils){return(
class RealtimeClient extends RealtimeEventHandler {
  /**
   * Create a new RealtimeClient instance
   * @param {{url?: string, apiKey?: string, dangerouslyAllowAPIKeyInBrowser?: boolean, debug?: boolean}} [settings]
   */
  constructor({ url, apiKey, dangerouslyAllowAPIKeyInBrowser, debug } = {}) {
    super();
    this.defaultSessionConfig = {
      modalities: ["text", "audio"],
      instructions: "",
      voice: "alloy",
      input_audio_format: "pcm16",
      output_audio_format: "pcm16",
      input_audio_transcription: null,
      turn_detection: null,
      tools: [],
      tool_choice: "auto",
      temperature: 0.8,
      max_response_output_tokens: 4096
    };
    this.sessionConfig = {};
    this.transcriptionModels = [
      {
        model: "whisper-1"
      }
    ];
    this.defaultServerVadConfig = {
      type: "server_vad",
      threshold: 0.5, // 0.0 to 1.0,
      prefix_padding_ms: 300, // How much audio to include in the audio stream before the speech starts.
      silence_duration_ms: 200 // How long to wait to mark the speech as stopped.
    };
    this.realtime = new RealtimeAPI({
      url,
      apiKey,
      dangerouslyAllowAPIKeyInBrowser,
      debug
    });
    this.conversation = new RealtimeConversation();
    this._resetConfig();
    this._addAPIEventHandlers();
  }

  /**
   * Resets sessionConfig and conversationConfig to default
   * @private
   * @returns {true}
   */
  _resetConfig() {
    this.sessionCreated = false;
    this.tools = {};
    this.sessionConfig = JSON.parse(JSON.stringify(this.defaultSessionConfig));
    this.inputAudioBuffer = new Int16Array(0);
    return true;
  }

  /**
   * Sets up event handlers for a fully-functional application control flow
   * @private
   * @returns {true}
   */
  _addAPIEventHandlers() {
    // Event Logging handlers
    this.realtime.on("client.*", (event) => {
      const realtimeEvent = {
        time: new Date().toISOString(),
        source: "client",
        event: event
      };
      this.dispatch("realtime.event", realtimeEvent);
    });
    this.realtime.on("server.*", (event) => {
      const realtimeEvent = {
        time: new Date().toISOString(),
        source: "server",
        event: event
      };
      this.dispatch("realtime.event", realtimeEvent);
    });

    // Handles session created event, can optionally wait for it
    this.realtime.on(
      "server.session.created",
      () => (this.sessionCreated = true)
    );

    // Setup for application control flow
    const handler = (event, ...args) => {
      const { item, delta } = this.conversation.processEvent(event, ...args);
      return { item, delta };
    };
    const handlerWithDispatch = (event, ...args) => {
      const { item, delta } = handler(event, ...args);
      if (item) {
        // FIXME: If statement is only here because item.input_audio_transcription.completed
        //        can fire before `item.created`, resulting in empty item.
        //        This happens in VAD mode with empty audio
        this.dispatch("conversation.updated", { item, delta });
      }
      return { item, delta };
    };
    const callTool = async (tool) => {
      try {
        const jsonArguments = JSON.parse(tool.arguments);
        const toolConfig = this.tools[tool.name];
        if (!toolConfig) {
          throw new Error(`Tool "${tool.name}" has not been added`);
        }
        const result = await toolConfig.handler(jsonArguments);
        this.realtime.send("conversation.item.create", {
          item: {
            type: "function_call_output",
            call_id: tool.call_id,
            output: JSON.stringify(result)
          }
        });
      } catch (e) {
        this.realtime.send("conversation.item.create", {
          item: {
            type: "function_call_output",
            call_id: tool.call_id,
            output: JSON.stringify({ error: e.message })
          }
        });
      }
      this.createResponse();
    };

    // Handlers to update internal conversation state
    this.realtime.on("server.response.created", handler);
    this.realtime.on("server.response.output_item.added", handler);
    this.realtime.on("server.response.content_part.added", handler);
    this.realtime.on("server.input_audio_buffer.speech_started", (event) => {
      handler(event);
      this.dispatch("conversation.interrupted");
    });
    this.realtime.on("server.input_audio_buffer.speech_stopped", (event) =>
      handler(event, this.inputAudioBuffer)
    );

    // Handlers to update application state
    this.realtime.on("server.conversation.item.created", (event) => {
      const { item } = handlerWithDispatch(event);
      this.dispatch("conversation.item.appended", { item });
      if (item.status === "completed") {
        this.dispatch("conversation.item.completed", { item });
      }
    });
    this.realtime.on("server.conversation.item.truncated", handlerWithDispatch);
    this.realtime.on("server.conversation.item.deleted", handlerWithDispatch);
    this.realtime.on(
      "server.conversation.item.input_audio_transcription.completed",
      handlerWithDispatch
    );
    this.realtime.on(
      "server.response.audio_transcript.delta",
      handlerWithDispatch
    );
    this.realtime.on("server.response.audio.delta", handlerWithDispatch);
    this.realtime.on("server.response.text.delta", handlerWithDispatch);
    this.realtime.on(
      "server.response.function_call_arguments.delta",
      handlerWithDispatch
    );
    this.realtime.on("server.response.output_item.done", async (event) => {
      const { item } = handlerWithDispatch(event);
      if (item.status === "completed") {
        this.dispatch("conversation.item.completed", { item });
      }
      if (item.formatted.tool) {
        callTool(item.formatted.tool);
      }
    });

    return true;
  }

  /**
   * Tells us whether the realtime socket is connected and the session has started
   * @returns {boolean}
   */
  isConnected() {
    return this.realtime.isConnected();
  }

  /**
   * Resets the client instance entirely: disconnects and clears active config
   * @returns {true}
   */
  reset() {
    this.disconnect();
    this.clearEventHandlers();
    this.realtime.clearEventHandlers();
    this._resetConfig();
    this._addAPIEventHandlers();
    return true;
  }

  /**
   * Connects to the Realtime WebSocket API
   * Updates session config and conversation config
   * @returns {Promise<true>}
   */
  async connect() {
    if (this.isConnected()) {
      throw new Error(`Already connected, use .disconnect() first`);
    }
    await this.realtime.connect();
    this.updateSession();
    return true;
  }

  /**
   * Waits for a session.created event to be executed before proceeding
   * @returns {Promise<true>}
   */
  async waitForSessionCreated() {
    if (!this.isConnected()) {
      throw new Error(`Not connected, use .connect() first`);
    }
    while (!this.sessionCreated) {
      await new Promise((r) => setTimeout(() => r(), 1));
    }
    return true;
  }

  /**
   * Disconnects from the Realtime API and clears the conversation history
   */
  disconnect() {
    this.sessionCreated = false;
    this.conversation.clear();
    this.realtime.isConnected() && this.realtime.disconnect();
  }

  /**
   * Gets the active turn detection mode
   * @returns {"server_vad"|null}
   */
  getTurnDetectionType() {
    return this.sessionConfig.turn_detection?.type || null;
  }

  /**
   * Add a tool and handler
   * @param {ToolDefinitionType} definition
   * @param {function} handler
   * @returns {{definition: ToolDefinitionType, handler: function}}
   */
  addTool(definition, handler) {
    if (!definition?.name) {
      throw new Error(`Missing tool name in definition`);
    }
    const name = definition?.name;
    if (this.tools[name]) {
      throw new Error(
        `Tool "${name}" already added. Please use .removeTool("${name}") before trying to add again.`
      );
    }
    if (typeof handler !== "function") {
      throw new Error(`Tool "${name}" handler must be a function`);
    }
    this.tools[name] = { definition, handler };
    this.updateSession();
    return this.tools[name];
  }

  /**
   * Removes a tool
   * @param {string} name
   * @returns {true}
   */
  removeTool(name) {
    if (!this.tools[name]) {
      throw new Error(`Tool "${name}" does not exist, can not be removed.`);
    }
    delete this.tools[name];
    return true;
  }

  /**
   * Deletes an item
   * @param {string} id
   * @returns {true}
   */
  deleteItem(id) {
    this.realtime.send("conversation.item.delete", { item_id: id });
    return true;
  }

  /**
   * Updates session configuration
   * If the client is not yet connected, will save details and instantiate upon connection
   * @param {SessionResourceType} [sessionConfig]
   */
  updateSession({
    modalities = void 0,
    instructions = void 0,
    voice = void 0,
    input_audio_format = void 0,
    output_audio_format = void 0,
    input_audio_transcription = void 0,
    turn_detection = void 0,
    tools = void 0,
    tool_choice = void 0,
    temperature = void 0,
    max_response_output_tokens = void 0
  } = {}) {
    modalities !== void 0 && (this.sessionConfig.modalities = modalities);
    instructions !== void 0 && (this.sessionConfig.instructions = instructions);
    voice !== void 0 && (this.sessionConfig.voice = voice);
    input_audio_format !== void 0 &&
      (this.sessionConfig.input_audio_format = input_audio_format);
    output_audio_format !== void 0 &&
      (this.sessionConfig.output_audio_format = output_audio_format);
    input_audio_transcription !== void 0 &&
      (this.sessionConfig.input_audio_transcription =
        input_audio_transcription);
    turn_detection !== void 0 &&
      (this.sessionConfig.turn_detection = turn_detection);
    tools !== void 0 && (this.sessionConfig.tools = tools);
    tool_choice !== void 0 && (this.sessionConfig.tool_choice = tool_choice);
    temperature !== void 0 && (this.sessionConfig.temperature = temperature);
    max_response_output_tokens !== void 0 &&
      (this.sessionConfig.max_response_output_tokens =
        max_response_output_tokens);
    // Load tools from tool definitions + already loaded tools
    const useTools = [].concat(
      (tools || []).map((toolDefinition) => {
        const definition = {
          type: "function",
          ...toolDefinition
        };
        if (this.tools[definition?.name]) {
          throw new Error(
            `Tool "${definition?.name}" has already been defined`
          );
        }
        return definition;
      }),
      Object.keys(this.tools).map((key) => {
        return {
          type: "function",
          ...this.tools[key].definition
        };
      })
    );
    const session = { ...this.sessionConfig };
    session.tools = useTools;
    if (this.realtime.isConnected()) {
      this.realtime.send("session.update", { session });
    }
    return true;
  }

  /**
   * Sends user message content and generates a response
   * @param {Array<InputTextContentType|InputAudioContentType>} content
   * @returns {true}
   */
  sendUserMessageContent(content = []) {
    if (content.length) {
      for (const c of content) {
        if (c.type === "input_audio") {
          if (c.audio instanceof ArrayBuffer || c.audio instanceof Int16Array) {
            c.audio = RealtimeUtils.arrayBufferToBase64(c.audio);
          }
        }
      }
      this.realtime.send("conversation.item.create", {
        item: {
          type: "message",
          role: "user",
          content
        }
      });
    }
    this.createResponse();
    return true;
  }

  /**
   * Appends user audio to the existing audio buffer
   * @param {Int16Array|ArrayBuffer} arrayBuffer
   * @returns {true}
   */
  appendInputAudio(arrayBuffer) {
    if (arrayBuffer.byteLength > 0) {
      this.realtime.send("input_audio_buffer.append", {
        audio: RealtimeUtils.arrayBufferToBase64(arrayBuffer)
      });
      this.inputAudioBuffer = RealtimeUtils.mergeInt16Arrays(
        this.inputAudioBuffer,
        arrayBuffer
      );
    }
    return true;
  }

  /**
   * Forces a model response generation
   * @returns {true}
   */
  createResponse() {
    if (
      this.getTurnDetectionType() === null &&
      this.inputAudioBuffer.byteLength > 0
    ) {
      this.realtime.send("input_audio_buffer.commit");
      this.conversation.queueInputAudio(this.inputAudioBuffer);
      this.inputAudioBuffer = new Int16Array(0);
    }
    this.realtime.send("response.create");
    return true;
  }

  /**
   * Cancels the ongoing server generation and truncates ongoing generation, if applicable
   * If no id provided, will simply call `cancel_generation` command
   * @param {string} id The id of the message to cancel
   * @param {number} [sampleCount] The number of samples to truncate past for the ongoing generation
   * @returns {{item: (AssistantItemType | null)}}
   */
  cancelResponse(id, sampleCount = 0) {
    if (!id) {
      this.realtime.send("response.cancel");
      return { item: null };
    } else if (id) {
      const item = this.conversation.getItem(id);
      if (!item) {
        throw new Error(`Could not find item "${id}"`);
      }
      if (item.type !== "message") {
        throw new Error(`Can only cancelResponse messages with type "message"`);
      } else if (item.role !== "assistant") {
        throw new Error(
          `Can only cancelResponse messages with role "assistant"`
        );
      }
      this.realtime.send("response.cancel");
      const audioIndex = item.content.findIndex((c) => c.type === "audio");
      if (audioIndex === -1) {
        throw new Error(`Could not find audio on item to cancel`);
      }
      this.realtime.send("conversation.item.truncate", {
        item_id: id,
        content_index: audioIndex,
        audio_end_ms: Math.floor(
          (sampleCount / this.conversation.defaultFrequency) * 1000
        )
      });
      return { item };
    }
  }

  /**
   * Utility for waiting for the next `conversation.item.appended` event to be triggered by the server
   * @returns {Promise<{item: ItemType}>}
   */
  async waitForNextItem() {
    const event = await this.waitForNext("conversation.item.appended");
    const { item } = event;
    return { item };
  }

  /**
   * Utility for waiting for the next `conversation.item.completed` event to be triggered by the server
   * @returns {Promise<{item: ItemType}>}
   */
  async waitForNextCompletedItem() {
    const event = await this.waitForNext("conversation.item.completed");
    const { item } = event;
    return { item };
  }
}
)}

function _RealtimeEventHandler(sleep){return(
class RealtimeEventHandler {
  /**
   * Create a new RealtimeEventHandler instance
   * @returns {RealtimeEventHandler}
   */
  constructor() {
    this.eventHandlers = {};
    this.nextEventHandlers = {};
  }

  /**
   * Clears all event handlers
   * @returns {true}
   */
  clearEventHandlers() {
    this.eventHandlers = {};
    this.nextEventHandlers = {};
    return true;
  }

  /**
   * Listen to specific events
   * @param {string} eventName The name of the event to listen to
   * @param {EventHandlerCallbackType} callback Code to execute on event
   * @returns {EventHandlerCallbackType}
   */
  on(eventName, callback) {
    this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
    this.eventHandlers[eventName].push(callback);
    return callback;
  }

  /**
   * Listen for the next event of a specified type
   * @param {string} eventName The name of the event to listen to
   * @param {EventHandlerCallbackType} callback Code to execute on event
   * @returns {EventHandlerCallbackType}
   */
  onNext(eventName, callback) {
    this.nextEventHandlers[eventName] = this.nextEventHandlers[eventName] || [];
    this.nextEventHandlers[eventName].push(callback);
    return callback;
  }

  /**
   * Turns off event listening for specific events
   * Calling without a callback will remove all listeners for the event
   * @param {string} eventName
   * @param {EventHandlerCallbackType} [callback]
   * @returns {true}
   */
  off(eventName, callback) {
    const handlers = this.eventHandlers[eventName] || [];
    if (callback) {
      const index = handlers.indexOf(callback);
      if (index === -1) {
        throw new Error(
          `Could not turn off specified event listener for "${eventName}": not found as a listener`
        );
      }
      handlers.splice(index, 1);
    } else {
      delete this.eventHandlers[eventName];
    }
    return true;
  }

  /**
   * Turns off event listening for the next event of a specific type
   * Calling without a callback will remove all listeners for the next event
   * @param {string} eventName
   * @param {EventHandlerCallbackType} [callback]
   * @returns {true}
   */
  offNext(eventName, callback) {
    const nextHandlers = this.nextEventHandlers[eventName] || [];
    if (callback) {
      const index = nextHandlers.indexOf(callback);
      if (index === -1) {
        throw new Error(
          `Could not turn off specified next event listener for "${eventName}": not found as a listener`
        );
      }
      nextHandlers.splice(index, 1);
    } else {
      delete this.nextEventHandlers[eventName];
    }
    return true;
  }

  /**
   * Waits for next event of a specific type and returns the payload
   * @param {string} eventName
   * @param {number|null} [timeout]
   * @returns {Promise<{[key: string]: any}|null>}
   */
  async waitForNext(eventName, timeout = null) {
    const t0 = Date.now();
    let nextEvent;
    this.onNext(eventName, (event) => (nextEvent = event));
    while (!nextEvent) {
      if (timeout) {
        const t1 = Date.now();
        if (t1 - t0 > timeout) {
          return null;
        }
      }
      await sleep(1);
    }
    return nextEvent;
  }

  /**
   * Executes all events in the order they were added, with .on() event handlers executing before .onNext() handlers
   * @param {string} eventName
   * @param {any} event
   * @returns {true}
   */
  dispatch(eventName, event) {
    const handlers = [].concat(this.eventHandlers[eventName] || []);
    for (const handler of handlers) {
      handler(event);
    }
    const nextHandlers = [].concat(this.nextEventHandlers[eventName] || []);
    for (const nextHandler of nextHandlers) {
      nextHandler(event);
    }
    delete this.nextEventHandlers[eventName];
    return true;
  }
}
)}

function _RealtimeUtils(){return(
class RealtimeUtils {
  /**
   * Converts Float32Array of amplitude data to ArrayBuffer in Int16Array format
   * @param {Float32Array} float32Array
   * @returns {ArrayBuffer}
   */
  static floatTo16BitPCM(float32Array) {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  }

  /**
   * Converts a base64 string to an ArrayBuffer
   * @param {string} base64
   * @returns {ArrayBuffer}
   */
  static base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Converts an ArrayBuffer, Int16Array or Float32Array to a base64 string
   * @param {ArrayBuffer|Int16Array|Float32Array} arrayBuffer
   * @returns {string}
   */
  static arrayBufferToBase64(arrayBuffer) {
    if (arrayBuffer instanceof Float32Array) {
      arrayBuffer = this.floatTo16BitPCM(arrayBuffer);
    } else if (arrayBuffer instanceof Int16Array) {
      arrayBuffer = arrayBuffer.buffer;
    }
    let binary = "";
    let bytes = new Uint8Array(arrayBuffer);
    const chunkSize = 0x8000; // 32KB chunk size
    for (let i = 0; i < bytes.length; i += chunkSize) {
      let chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binary);
  }

  /**
   * Merge two Int16Arrays from Int16Arrays or ArrayBuffers
   * @param {ArrayBuffer|Int16Array} left
   * @param {ArrayBuffer|Int16Array} right
   * @returns {Int16Array}
   */
  static mergeInt16Arrays(left, right) {
    if (left instanceof ArrayBuffer) {
      left = new Int16Array(left);
    }
    if (right instanceof ArrayBuffer) {
      right = new Int16Array(right);
    }
    if (!(left instanceof Int16Array) || !(right instanceof Int16Array)) {
      throw new Error(`Both items must be Int16Array`);
    }
    const newValues = new Int16Array(left.length + right.length);
    for (let i = 0; i < left.length; i++) {
      newValues[i] = left[i];
    }
    for (let j = 0; j < right.length; j++) {
      newValues[left.length + j] = right[j];
    }
    return newValues;
  }

  /**
   * Generates an id to send with events and messages
   * @param {string} prefix
   * @param {number} [length]
   * @returns {string}
   */
  static generateId(prefix, length = 21) {
    // base58; non-repeating chars
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    const str = Array(length - prefix.length)
      .fill(0)
      .map((_) => chars[Math.floor(Math.random() * chars.length)])
      .join("");
    return `${prefix}${str}`;
  }
}
)}

function _sleep(){return(
(t) => new Promise((r) => setTimeout(() => r(), t))
)}

function _31(md){return(
md`---`
)}

function _32($0){return(
$0
)}

function _33(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _34($0){return(
$0
)}

function _35(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _36($0){return(
$0
)}

function _37(md){return(
md`### AI Settings`
)}

function _38($0){return(
$0
)}

function _39($0){return(
$0
)}

function _40($0){return(
$0
)}

function _41(rag){return(
rag
)}

function _42(md){return(
md`---`
)}

function _46(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof realtimeModel")).define("viewof realtimeModel", ["Inputs"], _realtimeModel);
  main.variable(observer("realtimeModel")).define("realtimeModel", ["Generators", "viewof realtimeModel"], (G, _) => G.input(_));
  main.variable(observer("viewof enable")).define("viewof enable", ["Inputs"], _enable);
  main.variable(observer("enable")).define("enable", ["Generators", "viewof enable"], (G, _) => G.input(_));
  main.variable(observer("viewof whisperPrompt")).define("viewof whisperPrompt", ["whisperInput","OPENAI_API_KEY"], _whisperPrompt);
  main.variable(observer("whisperPrompt")).define("whisperPrompt", ["Generators", "viewof whisperPrompt"], (G, _) => G.input(_));
  main.variable(observer("viewof volume")).define("viewof volume", ["Inputs"], _volume);
  main.variable(observer("volume")).define("volume", ["Generators", "viewof volume"], (G, _) => G.input(_));
  main.variable(observer("auto_volume")).define("auto_volume", ["enable","viewof volume","Event"], _auto_volume);
  main.variable(observer("whisper_forward")).define("whisper_forward", ["viewof volume","Event","client","whisperPrompt"], _whisper_forward);
  main.variable(observer()).define(["Inputs","viewof volume","Event","client"], _8);
  main.variable(observer("viewof instructions")).define("viewof instructions", ["Inputs"], _instructions);
  main.variable(observer("instructions")).define("instructions", ["Generators", "viewof instructions"], (G, _) => G.input(_));
  main.variable(observer("unprocessed_input")).define("unprocessed_input", ["enable","Generators","invalidation"], _unprocessed_input);
  main.variable(observer("input_forwarding")).define("input_forwarding", ["unprocessed_input","client"], _input_forwarding);
  main.variable(observer("client")).define("client", ["RealtimeClient","OPENAI_API_KEY","instructions"], _client);
  main.variable(observer()).define(["unprocessed","Inputs","client"], _13);
  main.variable(observer("gain")).define("gain", ["audioContext"], _gain);
  main.variable(observer("audioContext")).define("audioContext", ["viewof volume","invalidation","messageProcessorScriptUrl"], _audioContext);
  main.variable(observer()).define(["gain","volume"], _16);
  main.variable(observer("audio_graph")).define("audio_graph", ["messageProcessor","gain","audioContext","invalidation"], _audio_graph);
  main.variable(observer("unprocessed")).define("unprocessed", ["Generators","client"], _unprocessed);
  main.variable(observer("autoPlayAudio")).define("autoPlayAudio", ["unprocessed","messageProcessor"], _autoPlayAudio);
  main.variable(observer("auto_turnoff")).define("auto_turnoff", ["enable","viewof enable","Event","invalidation"], _auto_turnoff);
  main.variable(observer("messageProcessorScript")).define("messageProcessorScript", _messageProcessorScript);
  main.variable(observer("messageProcessorScriptUrl")).define("messageProcessorScriptUrl", ["messageProcessorScript"], _messageProcessorScriptUrl);
  main.variable(observer("messageProcessor")).define("messageProcessor", ["AudioWorkletNode","audioContext"], _messageProcessor);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("RealtimeConversation")).define("RealtimeConversation", ["RealtimeUtils"], _RealtimeConversation);
  main.variable(observer("RealtimeAPI")).define("RealtimeAPI", ["RealtimeEventHandler","globalThis","realtimeModel","RealtimeUtils"], _RealtimeAPI);
  main.variable(observer("RealtimeClient")).define("RealtimeClient", ["RealtimeEventHandler","RealtimeAPI","RealtimeConversation","RealtimeUtils"], _RealtimeClient);
  main.variable(observer("RealtimeEventHandler")).define("RealtimeEventHandler", ["sleep"], _RealtimeEventHandler);
  main.variable(observer("RealtimeUtils")).define("RealtimeUtils", _RealtimeUtils);
  main.variable(observer("sleep")).define("sleep", _sleep);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["viewof prompt"], _32);
  main.variable(observer()).define(["Inputs","suggestion"], _33);
  main.variable(observer()).define(["viewof suggestion"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["viewof context_viz"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _38);
  main.variable(observer()).define(["viewof api_endpoint"], _39);
  main.variable(observer()).define(["viewof settings"], _40);
  main.variable(observer()).define(["rag"], _41);
  main.variable(observer()).define(["md"], _42);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("variables", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("ndd", child1);
  main.import("_ndd", child1);
  main.import("instruction", child1);
  main.import("_events", child1);
  main.import("highlight", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  const child2 = runtime.module(define2);
  main.import("extension", "rag", child2);
  const child3 = runtime.module(define3);
  main.import("whisperInput", child3);
  main.variable(observer()).define(["background_tasks"], _46);
  return main;
}
