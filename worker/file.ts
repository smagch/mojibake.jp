export function handleFetch(event: FetchEvent) {
  console.log("fetch event");
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith("/file/")) {
    console.log("respond as is", url.origin, url.pathname);
    return;
  }

  console.log("fetch with mock");
  const targetURL = url.searchParams.get("url");
  console.log(targetURL, targetURL);
  if (!targetURL) {
    return;
  }

  // let i = 0;
  // const encoder = new TextEncoder();
  // var stream = new ReadableStream({
  //   pull(controller) {
  //     i++;
  //     if (i < 10000) {
  //       controller.enqueue(encoder.encode('hogehogehoge'));
  //     } else {
  //       controller.close();
  //     }
  //   }
  // });
  event.respondWith(handler(event, targetURL));
}

async function handler(event: FetchEvent, targetURL: string) {
  const res = await fetch(targetURL);
  if (!res.ok) {
    return res;
  }
  if (!res.body) {
    return res;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("shift-jis");
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
        controller.enqueue(new TextEncoder().encode(decoded));
        controller.close();
      }
    },
  });

  var response = new Response(stream, {
    headers: {
      "content-type": "text/plain",
      "Content-Disposition": `attachment; filename="foobar.txt"`,
    },
  });

  return response;
}
