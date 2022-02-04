import * as React from "react";
import OmniInputBox from "organisms/OmniInputBox";
import styles from "./HeroSection.module.scss";
import Logo from "../../svg/logo.svg";
import Icon from "atoms/Button/Icon";

const HeroSection = () => {
  return (
    <>
      <div className={styles.nav}>
        <a href="/">
          <Logo />
        </a>
      </div>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.h1}>
            <span>文字化けした</span>
            <span>ファイルを</span>
            <span>元通りにできます。</span>
          </h1>
          <p className={styles.description}>
            Mojibake
            は、文字化けしたテキストファイルの修復ができる変換ツールです。
            文字化けの直し方がわからずお困りなら、ぜひお試しください。
          </p>
          <p className={styles.notice}>
            <Icon name="check_circle" width="20px" />
            <span>
              CSV ファイルにも対応！　エクセルの文字化けにも有効です。
            </span>
          </p>
          <p className={styles.notice}>
            <Icon name="check_circle" width="20px" />
            <span>
              セキュリティも安心！　アップロードせずにブラウザ内で安全に変換します。
            </span>
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
