import * as React from "react";
import { Icon, IconName, PrimaryButton } from "atoms/Button";
import styles from "./OmniInputBox.module.scss";

const IconParagraph = ({
  name,
  children,
}: {
  name: IconName;
  children: React.ReactNode;
}) => {
  return (
    <p className={styles.p}>
      <Icon name={name} width={30} height={30} />
      <span>{children}</span>
    </p>
  );
};

const Or = () => {
  return (
    <div className={styles.or}>
      <div className={styles.border} />
      <div>または</div>
      <div className={styles.border} />
    </div>
  );
};

const OmniInputBox = () => {
  return (
    <div className={styles.container}>
      <IconParagraph name="postAdd">ファイルをドラッグ＆ドロップ</IconParagraph>
      <Or />
      <div className={styles.buttonContainer}>
        <PrimaryButton>ファイルを選択</PrimaryButton>
      </div>
      <Or />
      <IconParagraph name="edit">
        文字化けしたテキストをここに貼り付ける
      </IconParagraph>
    </div>
  );
};

export default OmniInputBox;
