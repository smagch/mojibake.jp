import * as React from "react";
import { PlainButton } from "atoms/Button";
import styles from "./ManualDetectModal.module.scss";

type Props = {
  file: File;
};

const ManualDetectModal = ({ file }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <span className={styles.label}>手動変換モード</span>
      </div>
      <h3 className={styles.title}>テキストは正しく表示されていますか？</h3>
      <div className={styles.actions}>
        <PlainButton>文字化けしている</PlainButton>
        <PlainButton>正しく表示されている</PlainButton>
      </div>
      <textarea className={styles.textarea} />
    </div>
  );
};

export default ManualDetectModal;
