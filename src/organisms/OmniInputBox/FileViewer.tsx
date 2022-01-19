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
  // onDownload: () => void;
  // onCopy: () => void;
};

const FileViewer = ({ file }: Props) => {
  const [encoding, setEncoding] = React.useState<Encoding | null>(null);

  React.useEffect(() => {
    if (encoding) {
      return;
    }

    let mutated = false;
    // show loader at least 0.7 seconds
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 700));

    async function detect() {
      const encoding = await detectTextEncoding(file.stream());
      console.log("encoding", encoding, mutated);
      if (mutated) {
        return;
      }
      await loadingPromise;
      if (encoding === "utf-8" || encoding === "shift-jis") {
        setEncoding(encoding);
      }
    }

    detect();

    return () => {
      mutated = true;
    };
  }, [encoding, file]);

  const downloadURL = React.useMemo<string>(() => {
    if (!(file instanceof File) || !encoding) {
      return "";
    }
    const url = URL.createObjectURL(file as File);
    const urlParams = new URLSearchParams();
    urlParams.set("url", url);
    urlParams.set("from", encoding);
    if (encoding === "shift-jis") {
      urlParams.set("to", "utf-8");
    } else {
      urlParams.set("to", "shift-jis");
    }

    return `/iconv?${urlParams.toString()}`;
  }, [file, encoding]);

  console.log("encoding", encoding);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.iconTitle}>
          {encoding === null ? (
            <Spinner className={styles.spinner} />
          ) : (
            <Icon name="check_circle" className={styles.check} />
          )}
          {file.name}
        </div>
        {!!downloadURL && (
          <PrimaryLink
            href={downloadURL}
            target="_blank"
            rel="noreferrer"
            modifier="iconRight"
          >
            ダウンロード
            <Icon name="download" />
          </PrimaryLink>
        )}
      </div>
      {!encoding && <LoadingImage position="absolute" />}
    </div>
  );
};

export default FileViewer;
