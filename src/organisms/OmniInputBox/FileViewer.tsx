import * as React from "react";
import {
  PrimaryButton,
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
import SliceNotice from "./SliceNotice";
import styles from "./FileViewer.module.scss";
import { pushDataLayer } from "libs/datalayer";

type Props = {
  file: File;
  onClear: () => void;
};

type DownloadHanlder = () => void;

type State = {
  encoding: null | string;
  status: "analyzing" | "error" | "success";
  errorMessage: string;
  previewBody: string;
  previewSliced?: boolean;
  sliceAcknowledged?: boolean;
};

type Action =
  | { type: "SET_ENCODING"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_PREVIEW_BODY"; payload: string; previewSliced?: boolean }
  | { type: "SLICE_ACKNOWLEDGED" }
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
        previewSliced: action.previewSliced,
        sliceAcknowledged: action.previewSliced ? false : undefined,
      };
    case "SLICE_ACKNOWLEDGED":
      return {
        ...state,
        sliceAcknowledged: true,
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

const noop = () => {};

const FileViewer = ({ file, onClear }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reset);
  const { encoding, status, errorMessage } = state;

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
      }
    }

    detect();

    return () => {
      mutated = true;
    };
  }, [file]);

  const handleDownload = React.useMemo<undefined | DownloadHanlder>(() => {
    if (!encoding) {
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

      pushDataLayer({
        event: process.env.NEXT_PUBLIC_GTM_EVENT_DOWNLOAD,
      });
    };
  }, [file, encoding]);

  const handleCopy = React.useCallback(() => {
    if (!navigator.clipboard) {
      toast.error("ブラウザが古すぎるためコピーできません。");
      return;
    }
    pushDataLayer({
      event: process.env.NEXT_PUBLIC_GTM_EVENT_COPY,
    });

    navigator.clipboard
      .writeText(state.previewBody)
      .then(() => {
        toast.success("コピーしました。");
      })
      .catch((err) => {
        toast.error("コピーに失敗しました。");
        Sentry.captureException(err);
      });
  }, [state]);

  const handleAcknowledged = React.useCallback(() => {
    dispatch({ type: "SLICE_ACKNOWLEDGED" });
  }, []);

  const textAreaClickHanlder = React.useMemo(() => {
    if (
      state.sliceAcknowledged === undefined ||
      state.sliceAcknowledged === true
    ) {
      return;
    }
    return () => {
      dispatch({ type: "SLICE_ACKNOWLEDGED" });
    };
  }, [state.sliceAcknowledged]);

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
      // 512KB
      const MAX_SIZE = 1024 * 512;
      let size = 0;

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
        size += value?.byteLength ?? 0;
        body += decoded;
        if (size > MAX_SIZE) {
          dispatch({
            type: "SET_PREVIEW_BODY",
            payload: body,
            previewSliced: true,
          });
          reader.cancel();
          return;
        }
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
        <div className={clsx(styles.iconTitle, styles[status])}>
          <StatusIcon status={status} />
          {file.name}
        </div>
        <div className={styles.actions}>
          <PlainButton
            disabled={status !== "success" || !!state.previewSliced}
            modifier="iconRight"
            onClick={handleCopy}
          >
            コピー
            <Icon name="content_copy" />
          </PlainButton>
          <PrimaryButton
            disabled={status !== "success"}
            modifier="iconRight"
            onClick={handleDownload}
          >
            ダウンロード
            <Icon name="download" />
          </PrimaryButton>
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
      {status === "success" && !!state.previewBody.length && (
        <div className={styles.preview}>
          <textarea
            className={clsx({
              [styles.textarea]: true,
              [styles.sliced]:
                !!state.previewSliced && !state.sliceAcknowledged,
            })}
            readOnly={true}
            value={state.previewBody}
            onChange={noop}
            onClick={textAreaClickHanlder}
          />
          {!!state.previewSliced && !state.sliceAcknowledged && (
            <SliceNotice
              className={styles.sliceNotice}
              onClose={handleAcknowledged}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileViewer;
