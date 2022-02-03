import * as React from "react";
import ManualDetectModal from "./ManualDetectModal";
import { useFile } from "./storyutil";

export const Demo = () => {
  const [file] = useFile("/rashomon.shift-jis.txt");

  return (
    <div style={{ padding: "16px" }}>
      <ManualDetectModal file={file} />
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/ManualDetectModal",
  component: ManualDetectModal,
};
