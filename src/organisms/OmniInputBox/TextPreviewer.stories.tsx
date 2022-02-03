import * as React from "react";
import TextPreviewer from "./TextPreviewer";
import { useFile } from "./storyutil";

const Demo = ({
  filename,
  repeat,
  encoding,
}: {
  filename: string;
  encoding: string;
  repeat?: number;
}) => {
  const [file] = useFile(filename, repeat);

  if (!file) {
    return null;
  }

  return (
    <div
      style={{
        width: "500px",
        height: "400px",
        display: "flex",
        margin: "16px",
        border: "1px solid #eee",
      }}
    >
      <TextPreviewer file={file} encoding={encoding} />
    </div>
  );
};

export const SjisSuccess = () => (
  <Demo filename="/rashomon.shift-jis.txt" encoding="shift-jis" />
);
export const UTF8Success = () => (
  <Demo filename="/rashomon.utf-8.txt" encoding="utf-8" />
);
export const BigUTF8 = () => (
  <Demo filename="/rashomon.utf-8.txt" repeat={60} encoding="utf-8" />
);

export default {
  title: "organisms/OmniInputBox/TextPreviewer",
  component: TextPreviewer,
};
