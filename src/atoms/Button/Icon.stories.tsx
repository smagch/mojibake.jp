import * as React from "react";
import Icon, { IconName } from "./Icon";

const iconNames: IconName[] = [
  "add",
  "remove",
  "edit",
  "postAdd",
  "arrow_back",
  "article",
  "check_circle",
  "content_copy",
  "download",
  "error",
  "spinner",
  "loop",
];

export const Icons: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {iconNames.map((iconName) => (
        <div
          key={iconName}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid #eee",
            background: "white",
          }}
        >
          <div style={{ width: "160px" }}>{iconName}</div>
          <Icon name={iconName} title={iconName} />
        </div>
      ))}
    </div>
  );
};

export default {
  title: "atoms/Button/Icon",
  component: Icon,
};
