import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";
import FileViewer, { InputFile } from "./FileViewer";
import clsx from "clsx";
import styles from "./OmniInputBox.module.scss";

const OmniInputBox = () => {
  const [file, setFile] = React.useState<null | InputFile>(null);

  const handleSelctFiles = React.useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  return (
    <div
      className={clsx({
        [styles.container]: true,
        [styles.welcome]: !file,
        [styles.viewer]: !!file,
      })}
    >
      {!file ? (
        <OmniInputWelcomeView onSelectFiles={handleSelctFiles} />
      ) : (
        <FileViewer file={file} onDownload={console.log} onCopy={console.log} />
      )}
    </div>
  );
};

export default OmniInputBox;
