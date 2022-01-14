import * as React from "react";
import DndZone from "atoms/DndZone";

type DndState = {
  file: null | File;
  clearFile: () => void;
};

const DndContext = React.createContext<DndState>({
  file: null,
  clearFile: () => {},
});

export const useDndState = (): DndState => {
  const state = React.useContext<DndState>(DndContext);
  return state;
};

export const Provider: React.FC = ({ children }) => {
  const [droppedFile, setDroppedFile] = React.useState<File | null>(null);
  const handleFileDrop = React.useCallback((files: File[]) => {
    if (files.length > 1) {
      // TODO
      // show warning
    }
    setDroppedFile(files[0]);
  }, []);

  const clearDroppedFile = React.useCallback(() => {
    setDroppedFile(null);
  }, []);

  const state = React.useMemo(() => {
    return {
      file: droppedFile,
      clearFile: clearDroppedFile,
    };
  }, [clearDroppedFile, droppedFile]);

  return (
    <DndZone onFileDrop={handleFileDrop}>
      <DndContext.Provider value={state}>{children}</DndContext.Provider>
    </DndZone>
  );
};
