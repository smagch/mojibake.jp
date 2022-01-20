import * as React from "react";
import IconButton from "./IconButton";
import { action } from "@storybook/addon-actions";

export const Icons: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <IconButton name="clear" onClick={action("onClick")} />
    </div>
  );
};

export default {
  title: "atoms/Button/IconButton",
  component: IconButton,
};
