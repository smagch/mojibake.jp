import * as React from "react";
import {
  PrimaryButton,
  Icon,
  IconButton,
  Spinner,
  LoadingImage,
} from "atoms/Button";
import { detectTextEncoding } from "libs/encodingutil";
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
};

type Action =
  | { type: "SET_ENCODING"; payload: string }
  | { type: "SET_ERROR"; payload: string }
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
    case "SET_ERROR": {
      return {
        encoding: null,
        status: "error",
        errorMessage: action.payload,
      };
    }
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
    </div>
  );
};

export default FileViewer;
