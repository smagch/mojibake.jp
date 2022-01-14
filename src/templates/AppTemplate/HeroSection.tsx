import * as React from "react";
import OmniInputBox from "organisms/OmniInputBox";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <>
      <section className={styles.container}>
        <header>
          <h1 className={styles.h1}>文字化けを解消しましょう</h1>
          <p className={styles.description}>
            Mojibake
            は、文字化けを解読する変換アプリです。文字化けの原因を自動的に特定し、元の日本語に復元します。
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
