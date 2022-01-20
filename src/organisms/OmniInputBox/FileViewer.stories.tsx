import * as React from "react";
import FileViewer from "./FileViewer";
import { action } from "@storybook/addon-actions";

async function generateFile(): Promise<File> {
  const res = await fetch("/rashomon.shift-jis.txt");
  if (!res.ok) {
    throw new Error("invalid status code:" + res.status);
  }
  const blob = await res.blob();
  console.log("blob", blob);
  return new File([blob], "羅生門.txt", {
    type: blob.type,
    // size: blob.size,
  });
}

export const Demo = () => {
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (file) {
      return;
    }

    let unmounted = false;
    async function init() {
      const file = await generateFile();
      setFile(file);
    }

    init();

    return () => {
      unmounted = true;
    };
  }, [file]);

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
        margin: "100px",
      }}
    >
      <FileViewer file={file} onClear={handleClear} />
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/FileViewer",
  component: FileViewer,
};
