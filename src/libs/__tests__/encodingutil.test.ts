import { detectTextEncoding } from "../encodingutil";
import { readFile } from "fs/promises";
import * as path from "path";

async function getReadableStream(filename: string): Promise<ReadableStream> {
  const filepath = path.join(__dirname, "testdata", filename);
  const data = await readFile(filepath, null);
  const arrayBuffer = data.buffer;
  const chunkSize = 256;
  let begin = 0;

  return new ReadableStream({
    pull(controller) {
      const end = Math.min(arrayBuffer.byteLength, begin + chunkSize);
      const buff = arrayBuffer.slice(begin, end);
      controller.enqueue(buff);

      begin += chunkSize;
      if (begin >= arrayBuffer.byteLength) {
        controller.close();
      }
    },
  });
}

test("detect utf-8", async () => {
  const readable = await getReadableStream("rashomon.utf-8.txt");
  const encoding = await detectTextEncoding(readable);
  expect(encoding).toBe("utf-8");
});

test("detect shift-jis", async () => {
  const readable = await getReadableStream("rashomon.shift-jis.txt");
  const encoding = await detectTextEncoding(readable);
  expect(encoding).toBe("shift-jis");
});
