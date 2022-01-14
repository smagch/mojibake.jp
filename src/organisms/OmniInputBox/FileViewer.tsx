import * as React from "react";
import { PrimaryLink, Icon, Spinner, LoadingImage } from "atoms/Button";
import { Encoding, detectTextEncoding } from "libs/encodingutil";
import styles from "./FileViewer.module.scss";

export type InputFile = {
  name: string;
  size: number;
  stream: () => ReadableStream;
};

type Props = {
  file: InputFile;
  onDownload: () => void;
  onCopy: () => void;
};

const FileViewer = ({ file, onDownload, onCopy }: Props) => {
  const [encoding, setEncoding] = React.useState<Encoding | null>(null);

  React.useEffect(() => {
    if (encoding) {
      return;
    }

    let mutated = false;

    async function detect() {
      const encoding = await detectTextEncoding(file.stream());
      console.log("encoding", encoding, mutated);
      if (mutated) {
        return;
      }
      if (encoding === "utf-8" || encoding === "shift-jis") {
        setEncoding(encoding);
      }
    }

    detect();

    return () => {
      mutated = true;
    };
  }, [encoding, file]);

  console.log("encoding", encoding);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.iconTitle}>
          {encoding === null ? <Spinner /> : <Icon name="check_circle" />}
          {file.name}
        </div>
        <PrimaryLink
          href={`/file/?url=foo`}
          target="_blank"
          rel="noreferrer"
          modifier="iconRight"
        >
          ダウンロード
          <Icon name="download" />
        </PrimaryLink>
      </div>
      {!encoding && <LoadingImage position="absolute" />}
    </div>
  );
};

export default FileViewer;
