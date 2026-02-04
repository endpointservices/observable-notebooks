function _1(md){return(
md`# CSV column chooser`
)}

function _file(Inputs){return(
Inputs.file({ label: "your CSV" })
)}

function _headers(file,Inputs,headersInfo){return(
file &&
  Inputs.select(headersInfo.headers, {
    label: "select headers to keep",
    multiple: true
  })
)}

function _downloadStatus(){return(
"Choose a CSV and headers, then click “Build download link”."
)}

function _buildDownloadLink(Inputs){return(
Inputs.button("Build download link", { value: 0, reduce: (v) => v + 1 })
)}

function _6(md){return(
md`---`
)}

function _7(downloadURL,htl){return(
downloadURL?.url
  ? htl.html`<a href=${downloadURL.url} download=${downloadURL.filename}>Download ${downloadURL.filename}</a>`
  : htl.html`<span>No download link yet.</span>`
)}

function _parseCSVLine(){return(
(line) => {
  if (line == null) return [];
  line = String(line).replace(/^\uFEFF/, ""); // strip UTF-8 BOM if present
  const out = [];
  let field = "";
  let i = 0;
  let inQuotes = false;

  while (i < line.length) {
    const c = line[i];

    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i += 1;
          continue;
        }
      } else {
        field += c;
        i += 1;
        continue;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
        i += 1;
        continue;
      }
      if (c === ",") {
        out.push(field);
        field = "";
        i += 1;
        continue;
      }
      if (c === "\r" || c === "\n") break;
      field += c;
      i += 1;
    }
  }

  out.push(field);
  return out;
}
)}

function _headersInfo(file,parseCSVLine){return(
file == null
  ? null
  : (async () => {
      const reader = (await file.stream()).getReader();
      const decoder = new TextDecoder("utf-8");
      let text = "";
      let bytesRead = 0;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        bytesRead += value.byteLength;
        text += decoder.decode(value, { stream: true });

        const nl = text.indexOf("\n");
        if (nl >= 0) {
          await reader.cancel();
          break;
        }
        if (bytesRead > 8 * 1024 * 1024) {
          await reader.cancel();
          throw new Error(
            "Header line not found within first 8MB; file may have an unusually long first row."
          );
        }
      }

      text += decoder.decode();
      const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
      const headers = parseCSVLine(firstLine);

      return {
        name: file.name,
        size: file.size,
        bytesRead,
        headerLine: firstLine,
        headers
      };
    })()
)}

function _csvEscape(){return(
(v) => {
  const s = v == null ? "" : String(v);
  return /[",\r\n]/.test(s) || s.startsWith(" ") || s.endsWith(" ")
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}
)}

function _isFileLike(){return(
(f) => f && typeof f === "object" && typeof f.stream === "function" && typeof f.name === "string"
)}

function _downloadURL(){return(
null
)}

function _streamSelectCSVToBlobURL(isFileLike,csvEscape){return(
async ({
  file,
  selectedHeaders,
  onProgress,
  yieldIntervalMs = 25
} = {}) => {
  if (!isFileLike(file))
    throw new Error("No CSV file selected (or unsupported file object).");
  if (!Array.isArray(selectedHeaders) || selectedHeaders.length === 0)
    throw new Error("No headers selected.");

  const suggestedName = (() => {
    const n = file.name || "data.csv";
    const base = n.replace(/\.csv$/i, "");
    return `${base}-filtered.csv`;
  })();

  const encoder = new TextEncoder();
  const reader = (await file.stream()).getReader();
  const decoder = new TextDecoder("utf-8");

  let bytesRead = 0;
  let rowsRead = 0;
  let rowsWritten = 0;

  let didStripBOM = false;
  let inQuotes = false;
  let quotePending = false;
  let skipNextLF = false;

  let field = "";
  let row = [];
  let headerRow = null;
  let indices = null;

  const wantedOrder = selectedHeaders.slice();
  const chunks = [];
  let outBuf = "";

  const yieldToMain = () =>
    new Promise((resolve) =>
      (typeof requestAnimationFrame === "function"
        ? requestAnimationFrame
        : setTimeout)(resolve, 0)
    );

  const now = () =>
    typeof performance !== "undefined" && performance.now
      ? performance.now()
      : Date.now();
  let lastYieldAt = now();

  const maybeYield = async (force = false) => {
    if (yieldIntervalMs <= 0) return;
    const t = now();
    if (force || t - lastYieldAt >= yieldIntervalMs) {
      lastYieldAt = t;
      if (typeof onProgress === "function")
        onProgress({ bytesRead, rowsRead, rowsWritten });
      await yieldToMain();
    }
  };

  const flushIfNeeded = async (force = false) => {
    if (force || outBuf.length >= 1 << 16) {
      if (outBuf.length) chunks.push(encoder.encode(outBuf));
      outBuf = "";
      await maybeYield();
    }
  };

  const emitRow = async () => {
    rowsRead++;

    if (headerRow == null) {
      headerRow = row.slice();
      const headerIndex = new Map();
      for (let i = 0; i < headerRow.length; i++)
        if (!headerIndex.has(headerRow[i])) headerIndex.set(headerRow[i], i);

      indices = wantedOrder
        .map((h) => headerIndex.get(h))
        .filter((i) => Number.isInteger(i) && i >= 0);
      const keptHeader = indices.map((i) => headerRow[i]);

      outBuf += keptHeader.map(csvEscape).join(",") + "\n";
      rowsWritten++;

      await flushIfNeeded();
      row = [];
      field = "";
      return;
    }

    const out = indices.map((i) => (i < row.length ? row[i] : ""));
    outBuf += out.map(csvEscape).join(",") + "\n";
    rowsWritten++;

    await flushIfNeeded();
    row = [];
    field = "";
  };

  const processChar = async (c, idxRef) => {
    if (skipNextLF && !inQuotes) {
      if (c === "\n") {
        skipNextLF = false;
        return;
      }
      skipNextLF = false;
    }

    if (quotePending) {
      if (c === '"') {
        field += '"';
        quotePending = false;
        return;
      } else {
        inQuotes = false;
        quotePending = false;
        idxRef.i--;
        return;
      }
    }

    if (inQuotes) {
      if (c === '"') {
        quotePending = true;
        return;
      }
      field += c;
      return;
    }

    if (c === '"') {
      inQuotes = true;
      return;
    }

    if (c === ",") {
      row.push(field);
      field = "";
      return;
    }

    if (c === "\n") {
      row.push(field);
      field = "";
      await emitRow();
      return;
    }

    if (c === "\r") {
      row.push(field);
      field = "";
      skipNextLF = true;
      await emitRow();
      return;
    }

    field += c;
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      bytesRead += value.byteLength;

      let text = decoder.decode(value, { stream: true });
      if (!didStripBOM) {
        didStripBOM = true;
        text = text.replace(/^\uFEFF/, "");
      }

      const idxRef = { i: 0 };
      for (idxRef.i = 0; idxRef.i < text.length; idxRef.i++) {
        await processChar(text[idxRef.i], idxRef);
        if ((idxRef.i & 4095) === 0) await maybeYield();
      }

      if (typeof onProgress === "function")
        onProgress({ bytesRead, rowsRead, rowsWritten });
      await maybeYield();
    }

    const tail = decoder.decode();
    if (tail) {
      const idxRef = { i: 0 };
      for (idxRef.i = 0; idxRef.i < tail.length; idxRef.i++) {
        await processChar(tail[idxRef.i], idxRef);
        if ((idxRef.i & 4095) === 0) await maybeYield();
      }
    }

    if (quotePending) {
      inQuotes = false;
      quotePending = false;
    }

    if (row.length > 0 || field.length > 0) {
      row.push(field);
      field = "";
      await emitRow();
    }

    await flushIfNeeded(true);
    await maybeYield(true);

    const blob = new Blob(chunks, { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    if (typeof onProgress === "function")
      onProgress({ bytesRead, rowsRead, rowsWritten, done: true });
    return {
      url,
      blob,
      filename: suggestedName,
      bytesRead,
      rowsRead,
      rowsWritten
    };
  } finally {
    try {
      await reader.cancel();
    } catch {}
  }
}
)}

function _14(buildDownloadLink,isFileLike,file,$0,headers,streamSelectCSVToBlobURL,$1){return(
(async function* () {
  if (!buildDownloadLink) return;

  if (!isFileLike(file)) {
    $0.value = "No file selected.";
    return;
  }
  if (!Array.isArray(headers) || headers.length === 0) {
    $0.value = "No headers selected.";
    return;
  }

  const startedAt = Date.now();

  try {
    $0.value = "Working: reading + filtering…";

    const result = await streamSelectCSVToBlobURL({
      file,
      selectedHeaders: headers,
      onProgress: ({ bytesRead, rowsRead, rowsWritten, done } = {}) => {
        const mb = (bytesRead ?? 0) / (1024 * 1024);
        const secs = Math.max(0.1, (Date.now() - startedAt) / 1000);
        const rate = mb / secs;
        $0.value = `${done ? "Done" : "Working"}: ${
          rowsWritten ?? 0
        } rows written (${rowsRead ?? 0} rows read), ${mb.toFixed(
          1
        )} MB read @ ${rate.toFixed(1)} MB/s`;
      }
    });
    yield;
    if ($1.value?.url) {
      try {
        URL.revokeObjectURL($1.value.url);
      } catch {}
    }
    $1.value = result;

    $0.value = `Done: link ready for ${result.filename} (${result.rowsWritten} rows written).`;
  } catch (e) {
    $0.value = `Error: ${e?.message ?? String(e)}`;
  }
})()
)}

function _15(downloadStatus){return(
downloadStatus
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof file")).define("viewof file", ["Inputs"], _file);
  main.variable(observer("file")).define("file", ["Generators", "viewof file"], (G, _) => G.input(_));
  main.variable(observer("viewof headers")).define("viewof headers", ["file","Inputs","headersInfo"], _headers);
  main.variable(observer("headers")).define("headers", ["Generators", "viewof headers"], (G, _) => G.input(_));
  main.define("initial downloadStatus", _downloadStatus);
  main.variable(observer("mutable downloadStatus")).define("mutable downloadStatus", ["Mutable", "initial downloadStatus"], (M, _) => new M(_));
  main.variable(observer("downloadStatus")).define("downloadStatus", ["mutable downloadStatus"], _ => _.generator);
  main.variable(observer("viewof buildDownloadLink")).define("viewof buildDownloadLink", ["Inputs"], _buildDownloadLink);
  main.variable(observer("buildDownloadLink")).define("buildDownloadLink", ["Generators", "viewof buildDownloadLink"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["downloadURL","htl"], _7);
  main.variable(observer("parseCSVLine")).define("parseCSVLine", _parseCSVLine);
  main.variable(observer("headersInfo")).define("headersInfo", ["file","parseCSVLine"], _headersInfo);
  main.variable(observer("csvEscape")).define("csvEscape", _csvEscape);
  main.variable(observer("isFileLike")).define("isFileLike", _isFileLike);
  main.define("initial downloadURL", _downloadURL);
  main.variable(observer("mutable downloadURL")).define("mutable downloadURL", ["Mutable", "initial downloadURL"], (M, _) => new M(_));
  main.variable(observer("downloadURL")).define("downloadURL", ["mutable downloadURL"], _ => _.generator);
  main.variable(observer("streamSelectCSVToBlobURL")).define("streamSelectCSVToBlobURL", ["isFileLike","csvEscape"], _streamSelectCSVToBlobURL);
  main.variable(observer()).define(["buildDownloadLink","isFileLike","file","mutable downloadStatus","headers","streamSelectCSVToBlobURL","mutable downloadURL"], _14);
  main.variable(observer()).define(["downloadStatus"], _15);
  return main;
}
