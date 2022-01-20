import * as React from "react";
import DndZone from "./DndZone";
import { action } from "@storybook/addon-actions";

export const Demo = () => {
  const handleDrop = React.useCallback((files: File[]) => {
    action("DndZone.onFileDrop")(files);
  }, []);

  return <DndZone onFileDrop={handleDrop}>Drop here.</DndZone>;
};

export default {
  title: "atoms/DndZone/DndZone",
  component: DndZone,
};
