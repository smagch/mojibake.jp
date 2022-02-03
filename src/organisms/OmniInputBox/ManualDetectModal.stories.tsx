import * as React from "react";
import ManualDetectModal from "./ManualDetectModal";
import { useFile } from "./storyutil";
import { action } from "@storybook/addon-actions";

export const Demo = () => {
  const [file] = useFile("/rashomon.shift-jis.txt");

  return (
    <div style={{ padding: "16px", height: "400px", display: "flex" }}>
      <ManualDetectModal file={file} onSubmit={action("onSubmit")} />
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/ManualDetectModal",
  component: ManualDetectModal,
};
