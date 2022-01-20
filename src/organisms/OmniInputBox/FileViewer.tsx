import * as React from "react";
import { PrimaryButton, Icon, Spinner, LoadingImage } from "atoms/Button";
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

type DownloadHanlder = () => void;

const FileViewer = ({ file }: Props) => {
  const [encoding, setEncoding] = React.useState<Encoding | null>(null);

  React.useEffect(() => {
    setEncoding(null);

    let mutated = false;
    // show loader at least 0.7 seconds
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 700));

    async function detect() {
      const detectedEncoding = await detectTextEncoding(file.stream());
      if (mutated) {
        return;
      }
      await loadingPromise;
      if (detectedEncoding === "utf-8" || detectedEncoding === "shift-jis") {
        setEncoding(detectedEncoding);
      }
    }

    detect();

    return () => {
      mutated = true;
    };
  }, [file]);

  const handleDownload = React.useMemo<undefined | DownloadHanlder>(() => {
    if (!(file instanceof File) || !encoding) {
      return;
    }
    return () => {
      const url = URL.createObjectURL(file as File);
      const urlParams = new URLSearchParams();
      urlParams.set("url", url);
      urlParams.set("from", encoding);
      urlParams.set("name", file.name);

      if (encoding === "shift-jis") {
        urlParams.set("to", "utf-8");
      } else {
        urlParams.set("to", "shift-jis");
      }

      const downloadURL = `/iconv?${urlParams.toString()}`;
      window.open(downloadURL, "_blank", "noreferrer");
    };
  }, [file, encoding]);

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
        <PrimaryButton
          disabled={!handleDownload}
          modifier="iconRight"
          onClick={handleDownload}
        >
          ダウンロード
          <Icon name="download" />
        </PrimaryButton>
      </div>
      {!encoding && <LoadingImage position="absolute" />}
    </div>
  );
};

export default FileViewer;
