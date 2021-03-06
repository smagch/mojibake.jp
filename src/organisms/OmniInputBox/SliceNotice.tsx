import * as React from "react";
import { Icon, PlainButton } from "atoms/Button";
import clsx from "clsx";
import styles from "./SliceNotice.module.scss";

type Props = {
  className?: string;
  onClose: () => void;
};

const SliceNotice = ({ className, onClose }: Props) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.icon}>
        <Icon name="warning" width={32} height={32} />
      </div>
      <p>ファイルサイズが大きすぎるため、一部のみ表示しています。</p>
      <div className={styles.actions}>
        <PlainButton onClick={onClose}>閉じる</PlainButton>
      </div>
    </div>
  );
};

export default SliceNotice;
