function _1(md){return(
md`# imgChooser

Bidirectional binding to a base64 encoded image UI. Can read from file upload or camera. Co-developed with [roboco-op](https://observablehq.com/@tomlarkworthy/robocoop)`
)}

function _img(imageChooser){return(
imageChooser({ width: 460, height: 256 })
)}

function _3(img){return(
img
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


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof img")).define("viewof img", ["imageChooser"], _img);
  main.variable(observer("img")).define("img", ["Generators", "viewof img"], (G, _) => G.input(_));
  main.variable(observer()).define(["img"], _3);
  main.variable(observer("imageChooser")).define("imageChooser", ["htl","ImageCapture","Event"], _imageChooser);
  return main;
}
