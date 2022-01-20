import * as React from "react";
import OmniInputBox from "./OmniInputBox";
import { Provider } from "hooks/userDndState";

export const Demo = () => {
  return (
    <div style={{ margin: "100px" }}>
      <Provider>
        <OmniInputBox />
      </Provider>
    </div>
  );
};

export default {
  title: "organisms/OmniInputBox/OmniInputBox",
  component: OmniInputBox,
};
