import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";
import Editor from "./Editor";
import clsx from "clsx";
import styles from "./OmniInputBox.module.scss";

const OmniInputBox = () => {
  const [viewMode, setViewMode] = React.useState<"welcome" | "editor">(
    "welcome"
  );

  const handleClick = React.useCallback(() => {
    setViewMode("editor");
  }, []);

  const handleSelctFiles = React.useCallback((files: File[]) => {
    console.log("files", files);
  }, []);

  const handleTextInput = React.useCallback(() => {
    console.log("ok");
    setViewMode("welcome");
  }, []);

  return (
    <div className={clsx(styles.container, styles[viewMode])}>
      {viewMode === "editor" ? (
        <Editor onSubmit={handleTextInput} />
      ) : (
        <OmniInputWelcomeView
          onSelectFiles={handleSelctFiles}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default OmniInputBox;
