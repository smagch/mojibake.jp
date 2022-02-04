import * as React from "react";
import { PlainButton } from "atoms/Button";
import TextPreviewer from "./TextPreviewer";
import Bullet from "./Bullet";
import clsx from "clsx";
import styles from "./ManualDetectModal.module.scss";

type Props = {
  file: File;
  onSubmit: (encoding: string) => void;
};

const encodings = ["shift-jis", "utf-8"];

type State = {
  encodingIndex: number;
  ended?: boolean;
};

type Action = { type: "RESET" } | { type: "NEXT" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return reset();
    case "NEXT": {
      const encodingIndex = state.encodingIndex + 1;
      if (encodingIndex >= encodings.length) {
        return {
          encodingIndex: 0,
          ended: true,
        };
      }
      return {
        encodingIndex,
      };
    }
    default:
      return state;
  }
}

function reset(): State {
  return {
    encodingIndex: 0,
  };
}

const ManualDetectModal = ({ file, onSubmit }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, reset);
  const { encodingIndex, ended } = state;
  const encoding = encodings[encodingIndex];
  const moveToNextEncoding = React.useCallback(() => {
    dispatch({ type: "NEXT" });
  }, []);

  const handleSubmit = React.useCallback(() => {
    onSubmit(encoding);
  }, [encoding, onSubmit]);

  const handleReset = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "RESET" });
  }, []);

  return (
    <div className={styles.container}>
      <Bullet size={encodings.length} index={encodingIndex} />
      <h3 className={styles.title}>テキストは正しく表示されていますか？</h3>
      <div className={clsx(styles.actions, ended && styles.error)}>
        {!!ended ? (
          <div className={styles.error}>
            文字コードが見つかりませんでした。
            <a href="#" onClick={handleReset}>
              もう一度試す。
            </a>
          </div>
        ) : (
          <>
            <PlainButton onClick={moveToNextEncoding}>
              文字化けしている
            </PlainButton>
            <PlainButton onClick={handleSubmit}>
              正しく表示されている
            </PlainButton>
          </>
        )}
      </div>
      {!ended && (
        <TextPreviewer
          className={styles.textarea}
          file={file}
          encoding={encoding}
        />
      )}
    </div>
  );
};

export default ManualDetectModal;
