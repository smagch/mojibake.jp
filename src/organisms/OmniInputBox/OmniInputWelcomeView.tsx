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
};

const OmniInputWelcomeView = ({ onSelectFiles }: Props) => {
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target?.files) {
        onSelectFiles(Array.from(e.target.files));
      }
    },
    [onSelectFiles]
  );
  const handleLabelClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={styles.container}>
      <IconParagraph name="postAdd">ファイルをドラッグ＆ドロップ</IconParagraph>
      <Or />
      <label className={styles.fileInput} onClick={handleLabelClick}>
        ファイルを選択
        <input
          type="file"
          accept="text/*"
          hidden
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

export default OmniInputWelcomeView;
