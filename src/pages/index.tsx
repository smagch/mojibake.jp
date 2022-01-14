import * as React from "react";
import Head from "next/head";
import HeroSection from "templates/HeroSection";

const Home: React.FC = () => {
  const [url, setURL] = React.useState<string>("");

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      if (!file) {
        return;
      }
      const fileURL = URL.createObjectURL(file);
      setURL(fileURL);
    },
    []
  );

  React.useEffect(() => {
    if (!url) {
      return;
    }
    async function fetchFile() {
      const res = await fetch(`/file/?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        console.error("res", res.status);
        return;
      }
      console.log("ok", await res.text());
    }

    fetchFile();
    // setDownloadURL()
  }, [url]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      {/* <div>
        <input type="file" onChange={handleChange} />
      </div>
      {!!url && (
        <a
          href={`/file/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          foo
        </a>
      )} */}
    </>
  );
};

export default Home;
