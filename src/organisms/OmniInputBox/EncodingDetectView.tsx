import * as React from "react";
import FileViewer from "./FileViewer";
import ManualDetectView from "./ManualDetectView";
import { detectTextEncoding } from "libs/encodingutil";
import { pushDataLayer } from "libs/datalayer";
import { LoadingImage } from "atoms/Button";

type Props = {
  file: File;
  onClear: () => void;
};

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
    case "SET_ERROR":
      return {
        encoding: null,
        status: "error",
        errorMessage: action.payload,
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

const EncodingDetectView = ({ file, onClear }: Props) => {
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

  const handleManualEncodingSelect = React.useCallback((payload: string) => {
    dispatch({ type: "SET_ENCODING", payload });
  }, []);

  if (status === "analyzing") {
    return <LoadingImage position="absolute" />;
  }

  if (errorMessage || !encoding) {
    return (
      <ManualDetectView file={file} onSubmit={handleManualEncodingSelect} />
    );
  }

  return <FileViewer file={file} encoding={encoding} onClear={onClear} />;
};

export default EncodingDetectView;
