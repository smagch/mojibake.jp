import * as React from "react";
import styles from "./Spinner.module.scss";
import { ReactComponent as SpinnerImage } from "../../svg/spinner.svg";

const Spinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <SpinnerImage />
    </div>
  );
};

export default Spinner;
