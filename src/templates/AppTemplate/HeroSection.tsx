import * as React from "react";
import OmniInputBox from "organisms/OmniInputBox";
import styles from "./HeroSection.module.scss";
import Logo from "../../svg/logo.svg";

const HeroSection = () => {
  return (
    <>
      <div className={styles.nav}>
        <Logo />
      </div>
      <section className={styles.container}>
        <header>
          <h1 className={styles.h1}>
            文字化けしたファイルを元通りにできます。
          </h1>
          <p className={styles.description}>
            Mojibake
            は、文字化けしたテキストファイルの修復ができる変換ツールです。文字化けの原因を自動的に特定し、正しい日本語に復元します。
          </p>
        </header>
      </section>
      <div className={styles.boxContainer}>
        <OmniInputBox className={styles.omnibox} />
      </div>
    </>
  );
};

export default HeroSection;
