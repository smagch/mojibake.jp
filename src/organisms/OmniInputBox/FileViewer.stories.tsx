import * as React from "react";
import FileViewer from "./FileViewer";

async function generateFile(filename: string, repeat?: number): Promise<File> {
  const res = await fetch(filename);
  if (!res.ok) {
    throw new Error("invalid status code:" + res.status);
  }
  const blob = await res.blob();
  if (!repeat) {
    return new File(
      [blob],
      "羅生門0123456544565432142533214253323234554328453921450312.txt",
      {
        type: blob.type,
      }
    );
  }

  return new File(new Array(repeat).fill(blob), "羅生門.txt", {
    type: blob.type,
  });
}

const Demo = ({ filename, repeat }: { filename: string; repeat?: number }) => {
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (file) {
      return;
    }

    let unmounted = false;
    async function init() {
      const file = await generateFile(filename, repeat);
      setFile(file);
    }

    init();

    return () => {
      unmounted = true;
    };
  }, [file, filename, repeat]);

  const handleClear = React.useCallback(() => {
    setFile(null);
  }, []);

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
