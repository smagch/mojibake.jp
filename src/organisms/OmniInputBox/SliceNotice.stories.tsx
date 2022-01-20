import * as React from "react";
import SliceNotice from "./SliceNotice";
import { action } from "@storybook/addon-actions";

export const Demo = () => {
  return <SliceNotice onClose={action("SliceNotice.onClose")} />;
};

export default {
  title: "organisms/OmniInputBox/SliceNotice",
  component: SliceNotice,
};
