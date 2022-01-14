import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";
import Editor from "./Editor";
import clsx from "clsx";
import { detectTextEncoding } from "libs/encodingutil";
import styles from "./OmniInputBox.module.scss";

type ViewType = "welcome" | "editor";

type State = {
  view: ViewType;
  readable: null | ReadableStream;
  encoding: null | "utf-8" | "shift-jis";
};

type Action =
  | { type: "SUBMIT_TEXT"; payload: ReadableStream }
  | { type: "SET_VIEW"; payload: ViewType }
  | { type: "SET_ENCODING"; payload: "utf-8" | "shift-jis" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUBMIT_TEXT":
      return {
        ...state,
        readable: action.payload,
      };
    case "SET_VIEW": {
      return {
        ...state,
        view: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

function reset(): State {
  return {
    view: "welcome",
    readable: null,
    encoding: null,
  };
}

function textStream(text: string): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    pull(controller) {
      const buffer = encoder.encode(text);
      controller.enqueue(buffer);
      controller.close();
    },
  });
}

const OmniInputBox = () => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reset);

  const handleSelctFiles = React.useCallback((files: File[]) => {
    console.log("files", files);
  }, []);

  const handleTextSubmit = React.useCallback((value: string) => {
    const stream = textStream(value);
    dispatch({ type: "SUBMIT_TEXT", payload: stream });
  }, []);

  const containerClickHandler = React.useMemo(() => {
    if (state.view !== "welcome") {
      return;
    }
    return () => {
      dispatch({ type: "SET_VIEW", payload: "editor" });
    };
  }, [state.view]);

  const handleEmptyBlur = React.useCallback(() => {
    dispatch({ type: "SET_VIEW", payload: "welcome" });
  }, []);

  // find encoding
  React.useEffect(() => {
    let mutated = false;

    async function detect() {
      if (state.readable !== null && !state.encoding) {
        const encoding = await detectTextEncoding(state.readable);
        if (mutated) {
          return;
        }
        if (encoding === "utf-8" || encoding === "shift-jis") {
          dispatch({ type: "SET_ENCODING", payload: encoding });
        }
      }
    }

    detect();

    return () => {
      mutated = true;
    };
  }, [state.readable, state.encoding]);

  console.log("encoding", state.encoding);

  return (
    <div
      className={clsx(styles.container, styles[state.view])}
      onClick={containerClickHandler}
    >
      {state.view === "editor" ? (
        <Editor onSubmit={handleTextSubmit} onEmptyBlur={handleEmptyBlur} />
      ) : (
        <OmniInputWelcomeView onSelectFiles={handleSelctFiles} />
      )}
    </div>
  );
};

export default OmniInputBox;
