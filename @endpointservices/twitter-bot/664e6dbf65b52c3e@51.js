function _1(md){return(
md`# Image post to Bluesky`
)}

function _image(FileAttachment){return(
FileAttachment("small.jpg")
)}

function _handle(){return(
"trendingnotebooks.bsky.social"
)}

function _postText(){return(
"hello"
)}

function _password(Inputs){return(
Inputs.password({
  label: "app password"
})
)}

function _example(postWithImage,handle,password,image,postText){return(
postWithImage(handle, password, image, postText)
)}

function _postWithImage(image){return(
async function postWithImage(handle, password, imageFile, postText) {
  const API_URL = "https://bsky.social/xrpc/";

  // Login to Bluesky
  const loginResponse = await fetch(
    API_URL + "com.atproto.server.createSession",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: handle, password: password })
    }
  );

  if (!loginResponse.ok) {
    throw await loginResponse.text();
  }

  const { accessJwt } = await loginResponse.json();

  // Upload the image
  const imageBlob = await imageFile.arrayBuffer();
  const uploadResponse = await fetch(API_URL + "com.atproto.repo.uploadBlob", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessJwt}`,
      "Content-Type": image.mimeType || image.type
    },
    body: imageBlob
  });

  if (!uploadResponse.ok) {
    throw await uploadResponse.text();
  }

  const uploadedImage = await uploadResponse.json();

  // Create the post with the uploaded image
  const postData = {
    $type: "app.bsky.feed.post",
    text: postText,
    createdAt: new Date().toISOString(),
    facets: [
      {
        index: {
          byteStart: postText.indexOf("https://"),
          byteEnd: postText.length
        },
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: postText.slice(postText.indexOf("https://"))
          }
        ]
      }
    ],
    embed: {
      $type: "app.bsky.embed.images",
      images: [
        {
          image: uploadedImage.blob,
          alt: "Image description here" // Replace with alt text for accessibility
        }
      ]
    }
  };

  const postResponse = await fetch(API_URL + "com.atproto.repo.createRecord", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessJwt}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      repo: handle, // The Bluesky handle of the poster
      collection: "app.bsky.feed.post",
      record: postData
    })
  });

  if (!postResponse.ok) {
    throw await postResponse.text();
  }

  return await postResponse.json();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["small.jpg", {url: new URL("./files/8abc620cd3e3779afa5abc1a37b8f5d67920da056be5807ba986809fc4cfbff930161edc21a295ecbc9b64bd45995f83a77c876589c538aa8e39eb9327ddabb9.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("image")).define("image", ["FileAttachment"], _image);
  main.variable(observer("handle")).define("handle", _handle);
  main.variable(observer("postText")).define("postText", _postText);
  main.variable(observer("viewof password")).define("viewof password", ["Inputs"], _password);
  main.variable(observer("password")).define("password", ["Generators", "viewof password"], (G, _) => G.input(_));
  main.variable(observer("example")).define("example", ["postWithImage","handle","password","image","postText"], _example);
  main.variable(observer("postWithImage")).define("postWithImage", ["image"], _postWithImage);
  return main;
}
