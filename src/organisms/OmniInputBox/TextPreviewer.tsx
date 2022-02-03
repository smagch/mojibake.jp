import * as React from "react";
import clsx from "clsx";
import SliceNotice from "./SliceNotice";
import * as Sentry from "@sentry/browser";
import { LoadingImage } from "atoms/Button";
import toast from "react-hot-toast";
import { pushDataLayer } from "libs/datalayer";
import styles from "./TextPreviewer.module.scss";

type Props = {
  file: File;
  encoding: string;
};

type State = {
  // encoding: string;
  previewBody: string;
  previewSliced?: boolean;
  sliceAcknowledged?: boolean;
};

type Action =
  | { type: "SET_ENCODING"; payload: string }
  | { type: "SET_PREVIEW_BODY"; payload: string; previewSliced?: boolean }
  | { type: "SLICE_ACKNOWLEDGED" }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return reset();
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
    previewBody: "",
  };
}

const noop = () => {};

type Handle = {
  copyText: () => void;
  previewSliced: () => boolean;
};

const TextPreviewer = React.forwardRef<Handle, Props>(
  ({ file, encoding }: Props, ref: React.ForwardedRef<Handle>) => {
    const [state, dispatch] = React.useReducer(reducer, undefined, reset);

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
        const url = URL.createObjectURL(file);
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
    }, [file, encoding]);

    React.useImperativeHandle(ref, () => ({
      copyText: () => {
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
      },
      previewSliced: () => {
        return !!state.previewSliced;
      },
    }));

    return (
      <div className={styles.preview}>
        <textarea
          className={clsx({
            [styles.textarea]: true,
            [styles.sliced]: !!state.previewSliced && !state.sliceAcknowledged,
          })}
          readOnly={true}
          value={state.previewBody}
          onChange={noop}
          onClick={textAreaClickHanlder}
        />
        {!state.previewBody && <LoadingImage position="absolute" />}
        {!!state.previewSliced && !state.sliceAcknowledged && (
          <SliceNotice
            className={styles.sliceNotice}
            onClose={handleAcknowledged}
          />
        )}
      </div>
    );
  }
);

TextPreviewer.displayName = "forwarded(TextPreviewer)";

export default TextPreviewer;
