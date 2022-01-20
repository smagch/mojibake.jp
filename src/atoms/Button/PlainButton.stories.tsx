import * as React from "react";
import PlainButton from "./PlainButton";
import Icon from "./Icon";

export const Demo = () => {
  return <PlainButton type="button">Settings</PlainButton>;
};

export const Disabled = () => {
  return (
    <PlainButton type="button" disabled={true}>
      Settings
    </PlainButton>
  );
};

export const WithIcon = () => {
  return (
    <PlainButton type="button" modifier="iconRight">
      Download
      <Icon name="download" />
    </PlainButton>
  );
};

export default {
  title: "atoms/Button/PlainButton",
  component: PlainButton,
};
