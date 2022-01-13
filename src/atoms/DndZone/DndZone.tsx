import * as React from "react";
import clsx from "clsx";
import styles from "./DndZone.module.scss";

type Props = {
  onFileDrop: (file: File[]) => void;
  children?: React.ReactNode;
};

function isFile(item: DataTransferItem): boolean {
  return item.kind === "file";
}

const DndZone = ({ onFileDrop, children }: Props) => {
  const [dragging, setDragging] = React.useState<boolean>(false);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    setDragging(true);
    e.preventDefault();
  }, []);

  const handleDragLeave = React.useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = React.useCallback(
    (ev: React.DragEvent) => {
      const files: File[] = [];
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (isFile(ev.dataTransfer.items[i])) {
            const file = ev.dataTransfer.items[i].getAsFile();
            if (file) {
              files.push(file);
            }
          }
        }
      } else {
        for (const file of Array.from(ev.dataTransfer.files)) {
          if (file.type.startsWith("text/")) {
            files.push(file);
          }
        }
      }
      if (files.length) {
        ev.preventDefault();
        onFileDrop(files);
      }
    },
    [onFileDrop]
  );

  return (
    <div
      className={clsx(styles.container, dragging && styles.dragging)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DndZone;
