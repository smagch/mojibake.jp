import * as React from "react";
import clsx from "clsx";
import styles from "./Details.module.scss";

type Props = JSX.IntrinsicElements["details"];

const Details = ({ className, ...props }: Props) => {
  return <details className={clsx(styles.details, className)} {...props} />;
};

export default Details;
