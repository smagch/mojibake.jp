import * as React from "react";
import LoadingImage from "./LoadingImage";

export const Fixed: React.FC = () => <LoadingImage position="fixed" />;

export const Absolute: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100px",
        height: "100px",
        background: "tomato",
      }}
    >
      <LoadingImage position="absolute" />
    </div>
  );
};

export default {
  title: "atoms/Button/LoadingImage",
  component: LoadingImage,
};
