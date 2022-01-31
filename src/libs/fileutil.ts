export function cutFileExtension(filename: string): string {
  const pos = filename.lastIndexOf(".");
  if (pos === -1) {
    return "";
  }
  return filename.slice(pos);
}
