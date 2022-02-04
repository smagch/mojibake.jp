import * as React from "react";
import ManualDetectView from "./ManualDetectView";
import { useFile } from "./storyutil";
import { action } from "@storybook/addon-actions";

const Demo = ({ filename }: { filename: string }) => {
  const [file] = useFile(filename);

  return (
    <div style={{ padding: "16px", height: "400px", display: "flex" }}>
      <ManualDetectView file={file} onSubmit={action("onSubmit")} />
    </div>
  );
};

export const Sjis = () => <Demo filename="/rashomon.shift-jis.txt" />;
export const SjisShort = () => (
  <Demo filename="/rashomon.shift-jis-short.txt" />
);
export const UTF8 = () => <Demo filename="/rashomon.utf-8.txt" />;
export const UTF8Short = () => <Demo filename="/rashomon.utf-8-short.txt" />;
export const DetectError = () => <Demo filename="/error.txt" />;

export default {
  title: "organisms/OmniInputBox/ManualDetectView",
  component: ManualDetectView,
};
