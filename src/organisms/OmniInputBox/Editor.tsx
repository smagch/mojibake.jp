import * as React from "react";
import styles from "./Editor.module.scss";

type Props = {
  onSubmit: (value: string) => void;
};

const Editor = ({ onSubmit }: Props) => {
  const [value, setValue] = React.useState<string>("");

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleBlur = React.useCallback(() => {
    onSubmit(value);
  }, [value, onSubmit]);

  return (
    <textarea
      className={styles.editor}
      autoFocus
      onBlur={handleBlur}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Editor;
