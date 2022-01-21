import * as React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <span>© 2022 by Shimaguchi Tomoya</span> —{" "}
        <span>
          Follow me on twitter: <a href="https://twitter.com/smagch">@smagch</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
