import * as React from "react";
import clsx from "clsx";
import styles from "./Details.module.scss";

type Props = JSX.IntrinsicElements["summary"];

const Summary = ({ className, ...props }: Props) => {
  return <summary className={clsx(styles.summary, className)} {...props} />;
};

export default Summary;
