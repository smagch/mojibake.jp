import * as React from "react";
import { Details, Summary } from ".";

export const Demo = () => {
  return (
    <div style={{ width: "600px", backgroundColor: "#eee", padding: "40px" }}>
      <Details>
        <Summary>This is summary</Summary>
        This is the content.
      </Details>
    </div>
  );
};

export default {
  title: "atoms/Details",
  component: Details,
};
