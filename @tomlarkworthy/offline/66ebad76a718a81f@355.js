// https://observablehq.com/@tomlarkworthy/offline@355
import define1 from "./dff1e917c89f5e76@1948.js";
import define2 from "./a2e58f97fd5e8d7c@756.js";
import define3 from "./64410923a50764c0@77.js";
import define4 from "./293899bef371e135@271.js";

function _1(md){return(
md`# Offline notebooks

Serves a read-only notebook from a notebook link. It installs a service worker, unzips the notebook, and saves it into the browser cache for use offline. It then uses request rewriting to serve the archive's contents on logical URL paths.

There are many hardcoded URLs and URL parsing regexes, forks will need to adjust the paths.
`
)}

function _2($0){return(
$0
)}

function _offlineLink(html,baseURL,link){return(
html`<a target='_blank' href=${baseURL}/${link.href}/index.html>offline notebook link</a>`
)}

function _baseURL(endpoint){return(
endpoint.href.replaceAll('/mods/X', '')
)}

function _5(md){return(
md`---`
)}

function _6(md){return(
md`We install a service worker to intercept links relative to a .tgz path. We expand the .tgz to serve the content.`
)}

function _endpoint(deploy,offline,untar,offlineHtml){return(
deploy("default", async (req, res) => {
  if (req.url === "/offline.js") {
    return res
      .header("content-type", "text/javascript")
      .send(offline.toString().substring(13, offline.toString().length - 2));
  } else if (req.url === "/untar.js") {
    return res
      .header("content-type", "text/javascript")
      .send(untar.toString().substring(13, untar.toString().length - 2));
  } else {
    return res.header("content-type", "text/html").send(offlineHtml);
  }
})
)}

function _9(md){return(
md`## Static files`
)}

function _10(md,baseURL){return(
md`link to [offline.html](${baseURL}/offline.html)`
)}

function _offlineHtml(){return(
`
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
        .register('https://webcode.run/observablehq.com/@tomlarkworthy/offline/offline.js',
                  {scope: '/observablehq.com/@tomlarkworthy/offline/'})
        .then(
            function(registration) {
                registration.update()
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                document.location.reload()
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
  });
}
</script>
`
)}

function _12(md,baseURL){return(
md`link to [offline.js](${baseURL}/offline.js)`
)}

function _offline(self,Response,Request,caches,pako,UntarFileStream){return(
function () {
  console.log("Service worker exec");
  self.importScripts(
    "https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.es5.min.js",
    "./untar.js"
  );

  self.addEventListener("install", function (event) {
    console.log("service worker has been installed");
  });

  function mime(name) {
    if (name.endsWith(".js")) return "text/javascript";
    if (name.endsWith(".html")) return "text/html";
    if (name.endsWith(".css")) return "text/css";
    if (name.endsWith(".jpg")) return "image/jpeg";
    if (name.endsWith(".jpeg")) return "image/jpeg";
    if (name.endsWith(".png")) return "image/png";
    return "application/octet-stream";
  }
  self.addEventListener("fetch", function (event) {
    let match = undefined;
    async function answer() {
      debugger;
      if (
        (match = event.request.url.match(
          /observablehq\.com\/@[^/]*\/offline\/(.*\.tgz(?:[?]v=\d)?)(\/[^?#]*)?$/
        ))
      ) {
        let archiveURL = match[1];
        if (
          // Express mangles the URL
          archiveURL.startsWith("https:/") &&
          !archiveURL.startsWith("https://")
        ) {
          archiveURL = archiveURL.replace("https:/", "https://");
        }
        if (!match[2])
          return new Response("", {
            status: 301,
            headers: {
              Location: `${event.request.url}/index.html`
            }
          });
        const path = "." + match[2];

        const archiveRequest = new Request(archiveURL);
        const cache = await caches.open("archives");
        const cachedResponse = await cache.match(event.request);
        const archiveResponse =
          cachedResponse ||
          (await fetch(archiveRequest).then((response) => {
            if (response.status >= 200 && response.status < 400)
              cache.put(archiveRequest, response.clone());
            return response;
          }));

        if (archiveResponse.status !== 200) {
          return archiveResponse;
        }

        const buffer = new Uint8Array(await archiveResponse.arrayBuffer());
        const uncompressed = await pako.ungzip(buffer);

        const reader = new UntarFileStream(uncompressed.buffer);
        const contents = {};
        while (reader.hasNext()) {
          const file = reader.next();
          contents[file.name] = file;
        }

        if (contents[path]) {
          const type = mime(path);
          return new Response(contents[path].buffer, {
            headers: {
              "content-type": type
            }
          });
        } else {
          return new Response(`Not found: ${path}`, {
            status: 404
          });
        }
      } else {
        // Normal events response but cache, and use network if we are offline
        const cache = await caches.open("offline");
        try {
          const response = await fetch(event.request);
          if (event.request.method == "GET") {
            cache.put(event.request, response.clone());
          }
          return response;
        } catch (err) {
          // we are offline!
          const cachedReponse = cache.match(event.request);
          return cachedReponse;
        }

        return fetch(event.request);
      }
    }

    event.respondWith(answer());
  });
}
)}

function _14(md,baseURL){return(
md`link to [offline.js](${baseURL}/untar.js)`
)}

function _untar(){return(
function() {
  "use strict";
  /* globals postMessage: false, DataView: false, self: false, window: false, ArrayBuffer: false, Uint8Array: false */

  // Source: https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330
  // Unmarshals an Uint8Array to string.
  function decodeUTF8(bytes) {
    var s = '';
    var i = 0;
    while (i < bytes.length) {
      var c = bytes[i++];
      if (c > 127) {
        if (c > 191 && c < 224) {
          if (i >= bytes.length)
            throw 'UTF-8 decode: incomplete 2-byte sequence';
          c = ((c & 31) << 6) | (bytes[i] & 63);
        } else if (c > 223 && c < 240) {
          if (i + 1 >= bytes.length)
            throw 'UTF-8 decode: incomplete 3-byte sequence';
          c = ((c & 15) << 12) | ((bytes[i] & 63) << 6) | (bytes[++i] & 63);
        } else if (c > 239 && c < 248) {
          if (i + 2 >= bytes.length)
            throw 'UTF-8 decode: incomplete 4-byte sequence';
          c =
            ((c & 7) << 18) |
            ((bytes[i] & 63) << 12) |
            ((bytes[++i] & 63) << 6) |
            (bytes[++i] & 63);
        } else
          throw 'UTF-8 decode: unknown multibyte start 0x' +
            c.toString(16) +
            ' at index ' +
            (i - 1);
        ++i;
      }

      if (c <= 0xffff) s += String.fromCharCode(c);
      else if (c <= 0x10ffff) {
        c -= 0x10000;
        s += String.fromCharCode((c >> 10) | 0xd800);
        s += String.fromCharCode((c & 0x3FF) | 0xdc00);
      } else
        throw 'UTF-8 decode: code point 0x' +
          c.toString(16) +
          ' exceeds UTF-16 reach';
    }
    return s;
  }
  function PaxHeader(fields) {
    this._fields = fields;
  }

  PaxHeader.parse = function(buffer) {
    // https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxa500/paxex.htm
    // An extended header shall consist of one or more records, each constructed as follows:
    // "%d %s=%s\n", <length>, <keyword>, <value>

    // The extended header records shall be encoded according to the ISO/IEC10646-1:2000 standard (UTF-8).
    // The <length> field, <blank>, equals sign, and <newline> shown shall be limited to the portable character set, as
    // encoded in UTF-8. The <keyword> and <value> fields can be any UTF-8 characters. The <length> field shall be the
    // decimal length of the extended header record in octets, including the trailing <newline>.

    var bytes = new Uint8Array(buffer);
    var fields = [];

    while (bytes.length > 0) {
      // Decode bytes up to the first space character; that is the total field length
      var fieldLength = parseInt(
        decodeUTF8(bytes.subarray(0, bytes.indexOf(0x20)))
      );
      var fieldText = decodeUTF8(bytes.subarray(0, fieldLength));
      var fieldMatch = fieldText.match(/^\d+ ([^=]+)=(.*)\n$/);

      if (fieldMatch === null) {
        throw new Error("Invalid PAX header data format.");
      }

      var fieldName = fieldMatch[1];
      var fieldValue = fieldMatch[2];

      if (fieldValue.length === 0) {
        fieldValue = null;
      } else if (fieldValue.match(/^\d+$/) !== null) {
        // If it's a integer field, parse it as int
        fieldValue = parseInt(fieldValue);
      }
      // Don't parse float values since precision is lost

      var field = {
        name: fieldName,
        value: fieldValue
      };

      fields.push(field);

      bytes = bytes.subarray(fieldLength); // Cut off the parsed field data
    }

    return new PaxHeader(fields);
  };

  PaxHeader.prototype = {
    applyHeader: function(file) {
      // Apply fields to the file
      // If a field is of value null, it should be deleted from the file
      // https://www.mkssoftware.com/docs/man4/pax.4.asp

      this._fields.forEach(function(field) {
        var fieldName = field.name;
        var fieldValue = field.value;

        if (fieldName === "path") {
          // This overrides the name and prefix fields in the following header block.
          fieldName = "name";

          if (file.prefix !== undefined) {
            delete file.prefix;
          }
        } else if (fieldName === "linkpath") {
          // This overrides the linkname field in the following header block.
          fieldName = "linkname";
        }

        if (fieldValue === null) {
          delete file[fieldName];
        } else {
          file[fieldName] = fieldValue;
        }
      });
    }
  };

  function TarFile() {}

  function UntarStream(arrayBuffer) {
    this._bufferView = new DataView(arrayBuffer);
    this._position = 0;
  }

  UntarStream.prototype = {
    readString: function(charCount) {
      //console.log("readString: position " + this.position() + ", " + charCount + " chars");
      var charSize = 1;
      var byteCount = charCount * charSize;

      var charCodes = [];

      for (var i = 0; i < charCount; ++i) {
        var charCode = this._bufferView.getUint8(
          this.position() + i * charSize,
          true
        );
        if (charCode !== 0) {
          charCodes.push(charCode);
        } else {
          break;
        }
      }

      this.seek(byteCount);

      return String.fromCharCode.apply(null, charCodes);
    },

    readBuffer: function(byteCount) {
      var buf;

      if (typeof ArrayBuffer.prototype.slice === "function") {
        buf = this._bufferView.buffer.slice(
          this.position(),
          this.position() + byteCount
        );
      } else {
        buf = new ArrayBuffer(byteCount);
        var target = new Uint8Array(buf);
        var src = new Uint8Array(
          this._bufferView.buffer,
          this.position(),
          byteCount
        );
        target.set(src);
      }

      this.seek(byteCount);
      return buf;
    },

    seek: function(byteCount) {
      this._position += byteCount;
    },

    peekUint32: function() {
      return this._bufferView.getUint32(this.position(), true);
    },

    position: function(newpos) {
      if (newpos === undefined) {
        return this._position;
      } else {
        this._position = newpos;
      }
    },

    size: function() {
      return this._bufferView.byteLength;
    }
  };

  function UntarFileStream(arrayBuffer) {
    this._stream = new UntarStream(arrayBuffer);
    this._globalPaxHeader = null;
  }

  UntarFileStream.prototype = {
    hasNext: function() {
      // A tar file ends with 4 zero bytes
      return (
        this._stream.position() + 4 < this._stream.size() &&
        this._stream.peekUint32() !== 0
      );
    },

    next: function() {
      return this._readNextFile();
    },

    _readNextFile: function() {
      var stream = this._stream;
      var file = new TarFile();
      var isHeaderFile = false;
      var paxHeader = null;

      var headerBeginPos = stream.position();
      var dataBeginPos = headerBeginPos + 512;

      // Read header
      file.name = stream.readString(100);
      file.mode = stream.readString(8);
      file.uid = parseInt(stream.readString(8));
      file.gid = parseInt(stream.readString(8));
      file.size = parseInt(stream.readString(12), 8);
      file.mtime = parseInt(stream.readString(12), 8);
      file.checksum = parseInt(stream.readString(8));
      file.type = stream.readString(1);
      file.linkname = stream.readString(100);
      file.ustarFormat = stream.readString(6);

      if (file.ustarFormat.indexOf("ustar") > -1) {
        file.version = stream.readString(2);
        file.uname = stream.readString(32);
        file.gname = stream.readString(32);
        file.devmajor = parseInt(stream.readString(8));
        file.devminor = parseInt(stream.readString(8));
        file.namePrefix = stream.readString(155);

        if (file.namePrefix.length > 0) {
          file.name = file.namePrefix + "/" + file.name;
        }
      }

      stream.position(dataBeginPos);

      // Derived from https://www.mkssoftware.com/docs/man4/pax.4.asp
      // and https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.bpxa500/pxarchfm.htm
      switch (file.type) {
        case "0": // Normal file is either "0" or "\0".
        case "": // In case of "\0", readString returns an empty string, that is "".
          file.buffer = stream.readBuffer(file.size);
          break;
        case "1": // Link to another file already archived
          // TODO Should we do anything with these?
          break;
        case "2": // Symbolic link
          // TODO Should we do anything with these?
          break;
        case "3": // Character special device (what does this mean??)
          break;
        case "4": // Block special device
          break;
        case "5": // Directory
          break;
        case "6": // FIFO special file
          break;
        case "7": // Reserved
          break;
        case "g": // Global PAX header
          isHeaderFile = true;
          this._globalPaxHeader = PaxHeader.parse(stream.readBuffer(file.size));
          break;
        case "x": // PAX header
          isHeaderFile = true;
          paxHeader = PaxHeader.parse(stream.readBuffer(file.size));
          break;
        default:
          // Unknown file type
          break;
      }

      if (file.buffer === undefined) {
        file.buffer = new ArrayBuffer(0);
      }

      var dataEndPos = dataBeginPos + file.size;

      // File data is padded to reach a 512 byte boundary; skip the padded bytes too.
      if (file.size % 512 !== 0) {
        dataEndPos += 512 - (file.size % 512);
      }

      stream.position(dataEndPos);

      if (isHeaderFile) {
        file = this._readNextFile();
      }

      if (this._globalPaxHeader !== null) {
        this._globalPaxHeader.applyHeader(file);
      }

      if (paxHeader !== null) {
        paxHeader.applyHeader(file);
      }

      return file;
    }
  };
}
)}

function _16(md){return(
md`Some empty variables to satify the compiler.`
)}

function _UntarFileStream()
{
}


function _pako()
{
}


function _22(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["viewof notebook"], _2);
  main.variable(observer("offlineLink")).define("offlineLink", ["html","baseURL","link"], _offlineLink);
  main.variable(observer("baseURL")).define("baseURL", ["endpoint"], _baseURL);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("endpoint")).define("endpoint", ["deploy","offline","untar","offlineHtml"], _endpoint);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md","baseURL"], _10);
  main.variable(observer("offlineHtml")).define("offlineHtml", _offlineHtml);
  main.variable(observer()).define(["md","baseURL"], _12);
  main.variable(observer("offline")).define("offline", ["self","Response","Request","caches","pako","UntarFileStream"], _offline);
  main.variable(observer()).define(["md","baseURL"], _14);
  main.variable(observer("untar")).define("untar", _untar);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("UntarFileStream")).define("UntarFileStream", _UntarFileStream);
  main.variable(observer("pako")).define("pako", _pako);
  const child2 = runtime.module(define2);
  main.import("Text", child2);
  const child3 = runtime.module(define3);
  main.import("viewof notebook", child3);
  main.import("notebook", child3);
  main.import("link", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _22);
  return main;
}
