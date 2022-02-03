import * as React from "react";
import FileViewer from "./FileViewer";
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
        border: "2px solid #4CA09B",
        borderRadius: "8px",
        height: "400px",
        margin: "100px 8px",
      }}
    >
      <FileViewer file={file} onClear={handleClear} />
    </div>
  );
};

export const SjisSuccess = () => <Demo filename="/rashomon.shift-jis.txt" />;
export const UTF8Success = () => <Demo filename="/rashomon.utf-8.txt" />;
export const DetectError = () => <Demo filename="/error.txt" />;
export const BigUTF8 = () => (
  <Demo filename="/rashomon.utf-8.txt" repeat={60} />
);

export default {
  title: "organisms/OmniInputBox/FileViewer",
  component: FileViewer,
};
