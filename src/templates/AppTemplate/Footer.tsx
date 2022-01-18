import * as React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © 2022 by Shimaguchi Tomoya — Follow me on twitter:
      <a href="https://twitter.com/smagch">@smagch</a>
    </footer>
  );
};

export default Footer;
