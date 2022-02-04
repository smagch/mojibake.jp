import * as React from "react";
import ManualDetectView from "./ManualDetectView";
import { useFile } from "./storyutil";
import { action } from "@storybook/addon-actions";

export const Demo = () => {
  const [file] = useFile("/rashomon.shift-jis.txt");

  return (
    <div style={{ padding: "16px", height: "400px", display: "flex" }}>
      <ManualDetectView file={file} onSubmit={action("onSubmit")} />
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/ManualDetectView",
  component: ManualDetectView,
};
