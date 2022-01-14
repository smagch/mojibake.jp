import * as React from "react";
import ViewerLayout from "./ViewerLayout";
import { PrimaryButton, Icon } from "atoms/Button";
import styles from "./Editor.module.scss";

type Props = {
  onSubmit: (value: string) => void;
};

const EditorHeader = () => {
  return (
    <>
      <div className={styles.iconTitle}>
        <Icon name="edit" />
        テキストを貼り付けてください
      </div>
      <PrimaryButton modifier="iconRight">
        変換する
        <Icon name="loop" />
      </PrimaryButton>
    </>
  );
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
    if (value === "") {
      onSubmit(value);
    }
  }, [value, onSubmit]);

  return (
    <ViewerLayout headerChildren={<EditorHeader />}>
      <textarea
        className={styles.editor}
        autoFocus
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
      />
    </ViewerLayout>
  );
};

export default Editor;
