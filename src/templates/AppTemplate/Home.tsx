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
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_ORIGIN}/`} />
      </Head>
      <AppTemplate>
        <FAQSection className={styles.faq} />
      </AppTemplate>
    </>
  );
};

export default Home;
