import * as React from "react";
import { PlainButton } from "atoms/Button";
import TextPreviewer from "./TextPreviewer";
import styles from "./ManualDetectModal.module.scss";

type Props = {
  file: File;
  onSubmit: (encoding: string) => void;
};

const encodings = ["shift-jis", "utf-8"];

// type State = {
//   encodingIndex: number;
// };

const ManualDetectModal = ({ file, onSubmit }: Props) => {
  const [encodingIndex, setEncodingIndex] = React.useState<number>(0);
  const encoding = encodings[encodingIndex];
  const moveToNextEncoding = React.useCallback(() => {
    setEncodingIndex((currentIndex) => {
      return (currentIndex + 1) % encodings.length;
    });
  }, []);

  const handleSubmit = React.useCallback(() => {
    onSubmit(encoding);
  }, [encoding, onSubmit]);

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <span className={styles.label}>手動変換モード</span>
      </div>
      <h3 className={styles.title}>テキストは正しく表示されていますか？</h3>
      <div className={styles.actions}>
        <PlainButton onClick={moveToNextEncoding}>文字化けしている</PlainButton>
        <PlainButton onClick={handleSubmit}>正しく表示されている</PlainButton>
      </div>
      <TextPreviewer
        className={styles.textarea}
        file={file}
        encoding={encoding}
      />
    </div>
  );
};

export default ManualDetectModal;
