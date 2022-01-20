import * as React from "react";
import Head from "next/head";
import AppTemplate from "templates/AppTemplate";
import FAQSection from "organisms/FAQSection";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
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
