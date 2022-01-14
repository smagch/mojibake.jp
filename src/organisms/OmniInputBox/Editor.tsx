import * as React from "react";
import ViewerLayout from "./ViewerLayout";
import { PrimaryButton, Icon } from "atoms/Button";
import styles from "./Editor.module.scss";

type Props = {
  onSubmit: (value: string) => void;
  onEmptyBlur: () => void;
};

const Editor = ({ onSubmit, onEmptyBlur }: Props) => {
  const [value, setValue] = React.useState<string>("");

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const handleBlur = React.useCallback(() => {
    if (value === "") {
      onEmptyBlur();
    }
  }, [value, onEmptyBlur]);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value) {
        onSubmit(value);
      }
    },
    [onSubmit, value]
  );

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <ViewerLayout
        headerChildren={
          <>
            <div className={styles.iconTitle}>
              <Icon name="edit" />
              テキストを貼り付けてください
            </div>
            <PrimaryButton
              type="submit"
              modifier="iconRight"
              disabled={value === ""}
            >
              変換する
              <Icon name="loop" />
            </PrimaryButton>
          </>
        }
      >
        <textarea
          className={styles.editor}
          autoFocus
          onBlur={handleBlur}
          value={value}
          onChange={handleChange}
        />
      </ViewerLayout>
    </form>
  );
};

export default Editor;
