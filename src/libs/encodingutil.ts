type Encoding = "utf-8" | "shift-jis";

export async function detectTextEncoding(
  readable: ReadableStream
): Promise<string> {
  const encodings: Encoding[] = ["utf-8", "shift-jis"];

  const decoders: Map<Encoding, TextDecoder> = new Map(
    encodings.map((encoding) => {
      return [encoding, new TextDecoder(encoding)];
    })
  );

  const reader = readable.getReader();
  const loop = true;
  while (loop) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    for (const [encoding, decoder] of decoders.entries()) {
      const text = decoder.decode(value, { stream: true });
      console.log({ encoding, text });
      if (text.includes("�")) {
        decoders.delete(encoding);
      }
    }
    if (decoders.size === 0) {
      break;
    }
    if (decoders.size === 1) {
      return Array.from(decoders.keys())[0];
    }
  }

  throw new Error("not found");
}
