import * as React from "react";
import { Icon, IconName } from "atoms/Button";
import styles from "./OmniInputWelcomeView.module.scss";

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

type Props = {
  onSelectFiles: (files: File[]) => void;
  onClick: () => void;
};

const OmniInputWelcomeView = ({ onSelectFiles, onClick }: Props) => {
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target?.files) {
        onSelectFiles(Array.from(e.target.files));
      }
    },
    [onSelectFiles]
  );
  const stopPropagation = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <IconParagraph name="postAdd">ファイルをドラッグ＆ドロップ</IconParagraph>
      <Or />
      <label className={styles.fileInput} onClick={stopPropagation}>
        ファイルを選択
        <input
          type="file"
          multiple
          accept="text/*"
          hidden
          onChange={handleInputChange}
        />
      </label>
      <Or />
      <IconParagraph name="edit">
        文字化けしたテキストをここに貼り付ける
      </IconParagraph>
    </div>
  );
};

export default OmniInputWelcomeView;
