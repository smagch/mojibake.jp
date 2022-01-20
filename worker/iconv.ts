import { convert } from "encoding-japanese";

export function handleFetch(event: FetchEvent) {
  const url = new URL(event.request.url);
  if (url.pathname !== "/iconv") {
    return;
  }

  const targetURL = url.searchParams.get("url");
  const sourceEncoding = url.searchParams.get("from");
  const outputEncoding = url.searchParams.get("to");
  const filename = url.searchParams.get("name");

  if (!targetURL || !sourceEncoding || !outputEncoding || !filename) {
    // Bad Request
    return new Response("Invalid parameters", {
      status: 400,
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  event.respondWith(
    handler({
      targetURL,
      sourceEncoding,
      outputEncoding,
      filename,
    })
  );
}

async function handler({
  targetURL,
  sourceEncoding,
  outputEncoding,
  filename,
}: {
  filename: string;
  targetURL: string;
  sourceEncoding: string;
  outputEncoding: string;
}) {
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
      if (done) {
        controller.close();
      } else {
        const decoded = decoder.decode(value);
        // @ts-ignore
        const output = convert(decoded, {
          type: "array",
          from: "unicode",
          to: outputEncoding,
        });
        controller.enqueue(Uint8Array.from(output));
      }
    },
  });

  var response = new Response(stream, {
    headers: {
      "content-type": `text/plain; charset=${outputEncoding}`,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });

  return response;
}
