import * as React from "react";
import { PrimaryLink, PlainButton, Icon, IconButton } from "atoms/Button";
import * as Sentry from "@sentry/browser";
import clsx from "clsx";
import styles from "./FileViewer.module.scss";
import { pushDataLayer } from "libs/datalayer";
import TextPreviewer from "./TextPreviewer";

type Props = {
  file: File;
  encoding: string;
  onClear: () => void;
};

const StatusIcon = () => {
  return <Icon name="check_circle" className={styles.check} />;
};

const FileViewer = ({ file, encoding, onClear }: Props) => {
  const [downloadURL, setDownloadURL] = React.useState<string>("");
  const workerRef = React.useRef<Worker | null>(null);

  React.useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../webworkers/convert.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent) => {
      const downloadURL = event.data;
      setDownloadURL(downloadURL);
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, [file]);

  React.useEffect(() => {
    async function fetchDownloadURL() {
      if (!encoding) {
        return;
      }
      const fileURL = URL.createObjectURL(file);
      workerRef.current?.postMessage({
        url: fileURL,
        from: encoding,
        to: encoding === "shift-jis" ? "utf-8" : "shift-jis",
      });
    }

    fetchDownloadURL().catch((err) => {
      Sentry.captureException(err);
    });
  }, [file, encoding]);

  const previewerRef = React.useRef<any>();

  const handleCopy = React.useCallback(() => {
    previewerRef.current?.copyText();
  }, []);

  const handleDownloadClick = React.useCallback(() => {
    pushDataLayer({
      event: process.env.NEXT_PUBLIC_GTM_EVENT_DOWNLOAD,
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={clsx(styles.iconTitle, styles.success)}>
          <StatusIcon />
          <span>{file.name}</span>
        </div>
        <div className={styles.actions}>
          <PlainButton
            disabled={!!previewerRef.current?.previewSliced()}
            modifier="iconRight"
            onClick={handleCopy}
          >
            コピー
            <Icon name="content_copy" />
          </PlainButton>
          <PrimaryLink
            href={downloadURL}
            disabled={!downloadURL}
            modifier="iconRight"
            download={file.name}
            onClick={!!downloadURL ? handleDownloadClick : undefined}
          >
            ダウンロード
            <Icon name="download" />
          </PrimaryLink>
        </div>
      </div>
      {/* {status === "analyzing" && (
        <LoadingImage position="absolute" className={styles.loading} />
      )}
     
      {/* {status === "error" && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )} */}
      <IconButton
        name="clear"
        className={styles.clearButton}
        onClick={onClear}
      />
      <TextPreviewer ref={previewerRef} file={file} encoding={encoding} />
    </div>
  );
};

export default FileViewer;
