import * as React from "react";
import {
  PrimaryButton,
  Icon,
  IconButton,
  Spinner,
  LoadingImage,
} from "atoms/Button";
import { detectTextEncoding } from "libs/encodingutil";
import * as Sentry from "@sentry/browser";
import styles from "./FileViewer.module.scss";

export type InputFile = {
  name: string;
  size: number;
  stream: () => ReadableStream;
};

type Props = {
  file: InputFile;
  onClear: () => void;
};

type DownloadHanlder = () => void;

type State = {
  encoding: null | string;
  status: "analyzing" | "error" | "success";
  errorMessage: string;
  previewBody: string;
};

type Action =
  | { type: "SET_ENCODING"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_PREVIEW_BODY"; payload: string }
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
        previewBody: "",
      };
    case "SET_ERROR":
      return {
        encoding: null,
        status: "error",
        errorMessage: action.payload,
        previewBody: "",
      };
    case "SET_PREVIEW_BODY":
      return {
        ...state,
        previewBody: action.payload,
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
    previewBody: "",
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
  const { encoding, status, errorMessage } = state;

  React.useEffect(() => {
    dispatch({ type: "RESET" });

    let mutated = false;
    // show loader at least 0.7 seconds
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 700));

    async function detect() {
      const detectedEncoding = await detectTextEncoding(file.stream());
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

  React.useEffect(() => {
    let unmounted = false;

    async function fetchPreview() {
      if (status !== "success" || encoding === null) {
        return;
      }
      const url = URL.createObjectURL(file as File);
      const res = await fetch(url);
      if (!res.body || unmounted) {
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder(encoding);
      const loop = true;
      let body: string = "";

      while (loop) {
        const { done, value } = await reader.read();
        if (unmounted) {
          return;
        }
        if (done) {
          dispatch({ type: "SET_PREVIEW_BODY", payload: body });
          return;
        }
        const decoded = decoder.decode(value, { stream: true });
        body += decoded;
      }
    }

    fetchPreview().catch((err) => {
      Sentry.captureException(err);
    });

    return () => {
      unmounted = true;
    };
  }, [status, file, encoding]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.iconTitle}>
          <StatusIcon status={status} />
          {file.name}
        </div>
        <PrimaryButton
          disabled={status !== "success"}
          modifier="iconRight"
          onClick={handleDownload}
        >
          ダウンロード
          <Icon name="download" />
        </PrimaryButton>
      </div>
      {status === "analyzing" && <LoadingImage position="absolute" />}
      {status === "success" && (
        <IconButton
          name="clear"
          className={styles.clearButton}
          onClick={onClear}
        />
      )}
      {status === "error" && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
      {status === "success" && !!state.previewBody.length && (
        <textarea
          className={styles.viewer}
          contentEditable={false}
          value={state.previewBody}
        />
      )}
    </div>
  );
};

export default FileViewer;
