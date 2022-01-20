import * as React from "react";
import FileViewer from "./FileViewer";

async function generateFile(filename: string): Promise<File> {
  const res = await fetch(filename);
  if (!res.ok) {
    throw new Error("invalid status code:" + res.status);
  }
  const blob = await res.blob();
  console.log("blob", blob);
  return new File([blob], "羅生門.txt", {
    type: blob.type,
  });
}

const Demo = ({ filename }: { filename: string }) => {
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (file) {
      return;
    }

    let unmounted = false;
    async function init() {
      const file = await generateFile(filename);
      setFile(file);
    }

    init();

    return () => {
      unmounted = true;
    };
  }, [file, filename]);

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

export const SjisSuccess = () => <Demo filename="/rashomon.shift-jis.txt" />;
export const UTF8Success = () => <Demo filename="/rashomon.utf-8.txt" />;
export const DetectError = () => <Demo filename="/error.txt" />;

export default {
  title: "organisms/OmniInputBox/FileViewer",
  component: FileViewer,
};
