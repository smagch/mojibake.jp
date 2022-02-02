import * as React from "react";
import Head from "next/head";
import AppTemplate from "templates/AppTemplate";
import FAQSection from "organisms/FAQSection";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          文字化けしたテキストが元通り。エクセルのファイルもOKです。
        </title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_ORIGIN}/`} />
      </Head>
      <AppTemplate>
        <FAQSection className={styles.faq} />
      </AppTemplate>
    </>
  );
};

export default Home;
