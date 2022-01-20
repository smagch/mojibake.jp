import * as React from "react";
import { PrimaryButton } from "./PrimaryButton";
import { action } from "@storybook/addon-actions";

export const PrimaryButtonExample: React.FC = () => {
  return (
    <PrimaryButton onClick={action("PrimaryButton.onClick")}>
      ボタン
    </PrimaryButton>
  );
};

export const PrimaryLargeButtonExample: React.FC = () => {
  return (
    <PrimaryButton onClick={action("PrimaryButton.onClick")} size="large">
      ボタン
    </PrimaryButton>
  );
};

export default {
  title: "atoms/Button/PrimaryButton",
  component: PrimaryButton,
};
