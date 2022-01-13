import { action } from "@storybook/addon-actions";
import * as React from "react";
import OmniInputWelcomeView from "./OmniInputWelcomeView";

export const Demo = () => {
  return (
    <OmniInputWelcomeView
      onSelectFiles={action("OmniInputWelcomeView.onSelectFiles")}
      onClick={action("OmniInputWelcomeView.onClick")}
    />
  );
};

export default {
  title: "organisms/OmniInputBox/OmniInputWelcomeView",
  component: OmniInputWelcomeView,
};
