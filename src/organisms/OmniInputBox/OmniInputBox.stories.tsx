import * as React from "react";
import OmniInputBox from "./OmniInputBox";
import { Provider } from "hooks/userDndState";

export const Demo = () => {
  return (
    <Provider>
      <OmniInputBox />
    </Provider>
  );
};

export default {
  title: "organisms/OmniInputBox/OmniInputBox",
  component: OmniInputBox,
};
