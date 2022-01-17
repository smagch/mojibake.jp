import * as React from "react";
import clsx from "clsx";
import styles from "./Spinner.module.scss";
import { ReactComponent as SpinnerImage } from "../../svg/spinner.svg";

type Props = {
  className?: string;
};

const Spinner = ({ className }: Props) => {
  return (
    <div className={clsx(styles.container, className)}>
      <SpinnerImage />
    </div>
  );
};

export default Spinner;
