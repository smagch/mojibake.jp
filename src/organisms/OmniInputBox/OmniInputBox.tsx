import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";
import FileViewer from "./FileViewer";
import clsx from "clsx";
import styles from "./OmniInputBox.module.scss";
import { useDndState } from "hooks/userDndState";
import toast from "react-hot-toast";
import { pushDataLayer } from "libs/datalayer";

type Props = {
  className?: string;
};

const OmniInputBox = ({ className }: Props) => {
  const { file: droppedFile } = useDndState();
  const [file, setFile] = React.useState<null | File>(null);

  const handleSelctFiles = React.useCallback((files: File[]) => {
    setFile(files[0]);
    if (files.length > 1) {
      toast("ファイルは一つしか変換できません。");
    }
    pushDataLayer({
      event: process.env.NEXT_PUBLIC_GTM_EVENT_FILE_SELECT,
      // event data TODO
      // 1. extension
      // 2. file size
    });
  }, []);

  React.useEffect(() => {
    if (droppedFile) {
      setFile(droppedFile);
      pushDataLayer({
        event: process.env.NEXT_PUBLIC_GTM_EVENT_FILE_DROP,
      });
    }
  }, [droppedFile]);

  const handleFileClear = React.useCallback(() => {
    setFile(null);
  }, []);

  return (
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
        <FileViewer file={file} onClear={handleFileClear} />
      )}
    </div>
  );
};

export default OmniInputBox;
