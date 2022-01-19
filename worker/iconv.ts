import { convert } from "encoding-japanese";

export function handleFetch(event: FetchEvent) {
  console.log("fetch event");
  const url = new URL(event.request.url);
  if (url.pathname !== "/iconv") {
    return;
  }

  console.log("fetch with mock");
  const targetURL = url.searchParams.get("url");
  const sourceEncoding = url.searchParams.get("from");
  const outputEncoding = url.searchParams.get("to");
  console.log(targetURL, targetURL);
  if (!targetURL || !sourceEncoding || !outputEncoding) {
    // Bad Request
    return new Response("Invalid parameters", {
      status: 400,
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  event.respondWith(handler(event, targetURL, sourceEncoding, outputEncoding));
}

function getConvertType(encoding: string): string {
  switch (encoding) {
    case "shift-jis":
      return "SJIS";
    case "utf-8":
      return "UTF8";
    default:
      return "";
  }
}

async function handler(
  event: FetchEvent,
  targetURL: string,
  sourceEncoding: string,
  outputEncoding: string
) {
  const res = await fetch(targetURL);
  if (!res.ok) {
    return res;
  }
  if (!res.body) {
    return res;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder(sourceEncoding);
  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      console.log("reader", { done, value });
      if (done) {
        controller.close();
        console.log("close!!");
      } else {
        const decoded = decoder.decode(value);
        console.log("decoded", decoded);
        // @ts-ignore
        const output = convert(decoded, {
          type: "array",
          from: "unicode",
          to: outputEncoding,
        });
        controller.enqueue(Uint8Array.from(output));
        controller.close();
      }
    },
  });

  var response = new Response(stream, {
    headers: {
      "content-type": `text/plain; charset=${outputEncoding}`,
      "Content-Disposition": `attachment; filename="foobar.txt"`,
    },
  });

  return response;
}
