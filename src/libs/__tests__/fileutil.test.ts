import { cutFileExtension } from "../fileutil";

test.each`
  filename
  ${"foo/bar/hoge.txt"}
  ${"foo.csv"}
  ${"foo/bar/hoge"}
  ${"bar"}
  ${""}
`('cutFileExtension("$filename")', ({ filename }) => {
  const ext = cutFileExtension(filename);
  expect(ext).toMatchSnapshot();
});
