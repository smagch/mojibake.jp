import * as React from "react";
import Editor from "./Editor";
import { action } from "@storybook/addon-actions";

export const Demo = () => {
  return (
    <div
      style={{
        border: "2px solid #4CA09B",
        borderRadius: "8px",
        height: "400px",
      }}
    >
      <Editor onSubmit={action("Editor.onSubmit")} />
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/Editor",
  component: Editor,
};
