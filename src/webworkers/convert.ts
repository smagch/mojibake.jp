import { convert } from "encoding-japanese";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any;

function getBlobParts(body: string, encoding: string): string | Uint8Array {
  if (encoding === "utf-8") {
    return body;
  }
  // @ts-ignore
  const output = convert(body, {
    type: "array",
    from: "UNICODE",
    to: "SJIS",
  });

  return Uint8Array.from(output);
}

function getDownloadURL(body: string, encoding: string): string {
  const blobParts = getBlobParts(body, encoding);
  const blob = new Blob([blobParts]);
  const downloadURL = URL.createObjectURL(blob);
  return downloadURL;
}

ctx.addEventListener("message", async (event: MessageEvent) => {
  const {
    url: targetURL,
    from: sourceEncoding,
    to: outputEncoding,
  } = event.data;

  const res = await fetch(targetURL);
  if (!res.ok) {
    return res;
  }
  if (!res.body) {
    return res;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder(sourceEncoding);
  const loop = true;
  let body = "";

  while (loop) {
    const { done, value } = await reader.read();
    if (done) {
      const downloadURL = getDownloadURL(body, outputEncoding);
      ctx.postMessage(downloadURL);
      return;
    }
    const decoded = decoder.decode(value, { stream: true });
    body += decoded;
  }
});

export default ctx;
