import * as React from "react";
import EncodingDetectView from "./EncodingDetectView";
import { useFile } from "./storyutil";

const Demo = ({ filename, repeat }: { filename: string; repeat?: number }) => {
  const [file, setFile] = useFile(filename, repeat);
  const handleClear = React.useCallback(() => {
    setFile(null);
  }, [setFile]);

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
        position: "relative",
      }}
    >
      <EncodingDetectView file={file} onClear={handleClear} />
    </div>
  );
};

export const SjisSuccess = () => <Demo filename="/rashomon.shift-jis.txt" />;
export const UTF8Fail = () => <Demo filename="/rashomon.utf-8-short.txt" />;
export const UTF8Success = () => <Demo filename="/rashomon.utf-8.txt" />;
export const BigUTF8 = () => (
  <Demo filename="/rashomon.utf-8.txt" repeat={60} />
);

export default {
  title: "organisms/OmniInputBox/EncodingDetectView",
  component: EncodingDetectView,
};
