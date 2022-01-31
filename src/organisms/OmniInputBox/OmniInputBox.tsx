import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";
import FileViewer from "./FileViewer";
import clsx from "clsx";
import styles from "./OmniInputBox.module.scss";
import { useDndState } from "hooks/userDndState";
import toast from "react-hot-toast";
import { pushDataLayer } from "libs/datalayer";
import { cutFileExtension } from "libs/fileutil";

type Props = {
  className?: string;
};

function getDataLayerVariables(file: File): {
  fileExtension: string;
  fileSize: number;
} {
  return {
    fileExtension: cutFileExtension(file.name),
    fileSize: file.size,
  };
}

const OmniInputBox = ({ className }: Props) => {
  const { file: droppedFile } = useDndState();
  const [file, setFile] = React.useState<null | File>(null);

  const handleSelctFiles = React.useCallback((files: File[]) => {
    setFile(files[0]);
    if (files.length > 1) {
      toast("ファイルは一つしか変換できません。");
    }
    if (files.length === 0) {
      return;
    }
    pushDataLayer({
      event: process.env.NEXT_PUBLIC_GTM_EVENT_FILE_SELECT,
      ...getDataLayerVariables(files[0]),
    });
  }, []);

  React.useEffect(() => {
    if (droppedFile) {
      setFile(droppedFile);
      pushDataLayer({
        event: process.env.NEXT_PUBLIC_GTM_EVENT_FILE_DROP,
        ...getDataLayerVariables(droppedFile),
      });
    }
  }, [droppedFile]);

  const handleFileClear = React.useCallback(() => {
    setFile(null);
    pushDataLayer({
      event: process.env.NEXT_PUBLIC_GTM_EVENT_FILE_CLEAR,
    });
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
