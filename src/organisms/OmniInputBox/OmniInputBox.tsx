import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";
import FileViewer, { InputFile } from "./FileViewer";
import clsx from "clsx";
import styles from "./OmniInputBox.module.scss";

type Props = {
  className?: string;
};

const OmniInputBox = ({ className }: Props) => {
  const [file, setFile] = React.useState<null | InputFile>(null);

  const handleSelctFiles = React.useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  return (
    // <div className={styles.wrapper}>
    <div
      className={clsx(
        {
          [styles.container]: true,
          [styles.welcome]: !file,
          [styles.viewer]: !!file,
        },
        className
      )}
    >
      {!file ? (
        <OmniInputWelcomeView onSelectFiles={handleSelctFiles} />
      ) : (
        <FileViewer file={file} />
      )}
    </div>
    // </div>
  );
};

export default OmniInputBox;
