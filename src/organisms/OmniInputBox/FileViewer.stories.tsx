import * as React from "react";
import FileViewer, { InputFile } from "./FileViewer";
import { action } from "@storybook/addon-actions";

function generateMockFile(): InputFile {
  async function getArrayBuffer(): Promise<ArrayBuffer> {
    const res = await fetch("/rashomon.shift-jis.txt");
    if (!res.ok) {
      throw new Error("invalid status code:" + res.status);
    }
    const blob = await res.blob();
    return blob.arrayBuffer();
  }

  const promise = getArrayBuffer();
  const chunkSize = 256;
  let begin = 0;

  return {
    name: "羅生門.txt",
    size: 10000,
    stream: () =>
      new ReadableStream({
        async pull(controller) {
          const arrayBuffer = await promise;
          const end = Math.min(arrayBuffer.byteLength, begin + chunkSize);
          const buff = arrayBuffer.slice(begin, end);
          controller.enqueue(buff);

          begin += chunkSize;
          if (begin >= arrayBuffer.byteLength) {
            controller.close();
          }
        },
      }),
  };
}

export const Demo = () => {
  const file = React.useMemo(() => {
    return generateMockFile();
  }, []);

  return (
    <div
      style={{
        border: "2px solid #4CA09B",
        borderRadius: "8px",
        height: "400px",
      }}
    >
      <FileViewer file={file} />
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/FileViewer",
  component: FileViewer,
};
