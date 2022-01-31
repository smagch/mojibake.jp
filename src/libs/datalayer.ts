import { cutFileExtension } from "./fileutil";

export const pushDataLayer = (event: any) => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.dataLayer.push(event);
};

export function getDataLayerVariables(file: File): {
  fileExtension: string;
  fileSize: number;
} {
  return {
    fileExtension: cutFileExtension(file.name),
    fileSize: file.size,
  };
}
