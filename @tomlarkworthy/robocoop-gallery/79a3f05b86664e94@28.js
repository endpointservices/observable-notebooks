async function _1(FileAttachment,md){return(
md`${await FileAttachment("DALL·E 2023-11-18 16.37.32 - A cyborg in an art gallery, portrayed with a more thoughtful expression, focusing intently on a modern art piece reminiscent of a Damian Hirst style c.png").image({style: "float: right; padding: 10px; width: 300px"})}
# Roboco-op Gallery

Random stuff created with roboco-op, prompt attached. By copy and pasting these cells into your own [session](https://observablehq.com/@tomlarkworthy/robocoop-blank-slate), your context will be able to continue where these left off.`
)}

function _2(md){return(
md`## imgChooser`
)}

function _imageChooser(htl,ImageCapture,Event)
{
  ({
    prompt:
      "Create an image chooser builder that will accept a file upload or camera capture, exporting the base64 encoded image value as the value",
    time: 1700317321358,
    comment: ""
  });
  return (options = {}) => {
    const { width = 512, height = 512 } = options;
    let base64 = undefined;
    let stream = null;
    let imageCapture = null;
    let videoElement = null;

    const ui = htl.html`
    <div class="b64img" style="position: relative; width: ${width}px; height: ${height}px;">
      <input type="file" id="file-upload" accept="image/*" style="opacity: 0; position: absolute; width: 100%; height: 100%; z-index: 2;" onchange=${handleFileChange} />
        <!-- Video element for camera stream -->
        <video id="camera-stream" style="display: none; width: 100%; height: 100%;z-index: 3;" autoplay></video>
      <div id="image-preview" style="width: ${width}px; height: ${height}px; background-color: #e0e0e0; background-size: cover; background-repeat: no-repeat; background-position: center; cursor: pointer; z-index: 1;" onclick=${() =>
      ui.querySelector("#file-upload").click()}>
        <!-- Placeholder content or image preview -->
        <span id="placeholder-text" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #757575;">Click to select image</span>
      </div>
      <div style="position: absolute; bottom: 10px; right: 10px; z-index: 4;">
        <!-- Camera icon -->
        <svg id="camera-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 32px; height: 32px; cursor: pointer;" onclick=${toggleCamera}>
          <path d="M23 19V5a2 2 0 0 0-2-2h-4l-2-2h-6l-2 2H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>
    </div>`;

    function handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
          ui.value = evt.target.result;
        };
      }
    }

    async function toggleCamera() {
      if (!stream) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoElement = ui.querySelector("#camera-stream");
          videoElement.style.display = "block";
          videoElement.srcObject = stream;
          const track = stream.getVideoTracks()[0];
          imageCapture = new ImageCapture(track);
        } catch (error) {
          console.error("Error accessing camera:", error);
          return;
        }
      } else {
        const lastFrame = await takePhoto();
        if (lastFrame) ui.value = lastFrame;
        videoElement.style.display = "none";
        videoElement.srcObject = null;
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
        imageCapture = null;
      }
    }

    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
    }

    async function takePhoto() {
      if (imageCapture) {
        try {
          const blob = await imageCapture.takePhoto();
          const base64String = await blobToBase64(blob);
          return base64String;
        } catch (error) {
          console.error("Error taking photo:", error);
          return null;
        }
      }
      return null;
    }

    Object.defineProperty(ui, "value", {
      get: () => base64,
      set: (val) => {
        base64 = val;
        const imagePreview = ui.querySelector("#image-preview");
        const placeholderText = ui.querySelector("#placeholder-text");
        imagePreview.style.backgroundImage = `url(${base64})`;
        placeholderText.style.display = base64 ? "none" : "flex";
        // Dispatch an input event when the image changes
        ui.dispatchEvent(new Event("input"));
      }
    });

    return ui;
  };
}


function _image(imageChooser){return(
imageChooser({ width: 512, height: 256 })
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["DALL·E 2023-11-18 16.37.32 - A cyborg in an art gallery, portrayed with a more thoughtful expression, focusing intently on a modern art piece reminiscent of a Damian Hirst style c.png", {url: new URL("./files/b5990ac2f0c07fc627d6c93bbf1dde66d213a5cd0a4f3cce1474f21c32abdb7d1cea6f38df10b906ffcead2ca0017dbcb1c72a3a64dd7cc144982ce560e50aae.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("imageChooser")).define("imageChooser", ["htl","ImageCapture","Event"], _imageChooser);
  main.variable(observer("viewof image")).define("viewof image", ["imageChooser"], _image);
  main.variable(observer("image")).define("image", ["Generators", "viewof image"], (G, _) => G.input(_));
  return main;
}
