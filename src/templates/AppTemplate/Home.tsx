import * as React from "react";
import Head from "next/head";
import AppTemplate from "templates/AppTemplate";
import FAQSection from "organisms/FAQSection";
import styles from "./Home.module.scss";

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
        <title>Mojibake | 文字化けしたファイルの変換ツール</title>
        <meta
          name="description"
          content="Mojibake は、文字化けしたテキストファイルの修復ができる変換ツールです。文字化けの原因を自動的に特定し、正しい日本語に元通り復元します。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppTemplate>
        <FAQSection className={styles.faq} />
      </AppTemplate>
    </>
  );
};

export default Home;
