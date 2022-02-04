import * as React from "react";

export async function generateFile(
  filename: string,
  repeat?: number
): Promise<File> {
  const res = await fetch(filename);
  if (!res.ok) {
    throw new Error("invalid status code:" + res.status);
  }
  const blob = await res.blob();
  if (!repeat) {
    return new File(
      [blob],
      "羅生門0123456544565432142533214253323234554328453921450312.txt",
      {
        type: blob.type,
      }
    );
  }

  return new File(new Array(repeat).fill(blob), "羅生門.txt", {
    type: blob.type,
  });
}

export const useFile = (filename: string, repeat?: number): any => {
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (file) {
      return;
    }

    let unmounted = false;

    async function init() {
      const file = await generateFile(filename, repeat);
      if (!unmounted) {
        setFile(file);
      }
    }

    init();

    return () => {
      unmounted = true;
    };
  }, [filename, repeat, file]);

  return [file, setFile];
};
