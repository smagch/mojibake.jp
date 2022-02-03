import * as React from "react";
import {
  PrimaryLink,
  PlainButton,
  Icon,
  IconButton,
  Spinner,
  LoadingImage,
} from "atoms/Button";
import { detectTextEncoding } from "libs/encodingutil";
import * as Sentry from "@sentry/browser";
import toast from "react-hot-toast";
import clsx from "clsx";
import styles from "./FileViewer.module.scss";
import { pushDataLayer } from "libs/datalayer";
import TextPreviewer from "./TextPreviewer";

type Props = {
  file: File;
  onClear: () => void;
};

type State = {
  encoding: null | string;
  status: "analyzing" | "error" | "success";
  errorMessage: string;
  downloadURL?: string;
};

type Action =
  | { type: "SET_ENCODING"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_DOWNLOAD_URL"; payload: string }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return reset();
    case "SET_ENCODING":
      return {
        encoding: action.payload,
        status: "success",
        errorMessage: "",
      };
    case "SET_ERROR":
      return {
        encoding: null,
        status: "error",
        errorMessage: action.payload,
      };
    case "SET_DOWNLOAD_URL":
      return {
        ...state,
        downloadURL: action.payload,
      };
    default:
      return state;
  }
}

function reset(): State {
  return {
    encoding: null,
    status: "analyzing",
    errorMessage: "",
  };
}

const StatusIcon = ({ status }: Pick<State, "status">) => {
  if (status === "analyzing") {
    return <Spinner className={styles.spinner} />;
  }
  if (status === "success") {
    return <Icon name="check_circle" className={styles.check} />;
  }
  return <Icon name="error" className={styles.errorIcon} />;
};

const FileViewer = ({ file, onClear }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reset);
  const { encoding, status, errorMessage, downloadURL } = state;
  const workerRef = React.useRef<Worker | null>(null);

  React.useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../webworkers/convert.ts", import.meta.url)
    );
    workerRef.current.onmessage = (event: MessageEvent) => {
      const downloadURL = event.data;
      dispatch({ type: "SET_DOWNLOAD_URL", payload: downloadURL });
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, [file]);

  React.useEffect(() => {
    dispatch({ type: "RESET" });

    let mutated = false;
    // show loader at least 0.7 seconds
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 700));

    async function detect() {
      const detectedEncoding = await detectTextEncoding(file.stream() as any);
      if (mutated) {
        return;
      }
      await loadingPromise;
      if (detectedEncoding) {
        dispatch({ type: "SET_ENCODING", payload: detectedEncoding });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "テキストの解析に失敗しました。",
        });
        pushDataLayer({
          event: process.env.NEXT_PUBLIC_GTM_EVENT_DETECT_ERROR,
        });
      }
    }

    detect();

    return () => {
      mutated = true;
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
        <div className={clsx(styles.iconTitle, styles[status])}>
          <StatusIcon status={status} />
          <span>{file.name}</span>
        </div>
        <div className={styles.actions}>
          <PlainButton
            disabled={
              status !== "success" || !!previewerRef.current?.previewSliced()
            }
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
      {status === "analyzing" && (
        <LoadingImage position="absolute" className={styles.loading} />
      )}
      {status !== "analyzing" && (
        <IconButton
          name="clear"
          className={styles.clearButton}
          onClick={onClear}
        />
      )}
      {status === "error" && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
      {status === "success" && !!encoding && (
        <TextPreviewer ref={previewerRef} file={file} encoding={encoding} />
      )}
    </div>
  );
};

export default FileViewer;
