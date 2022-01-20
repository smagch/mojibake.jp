import * as React from "react";
import clsx from "clsx";
import styles from "./OutboundLink.module.scss";

type Props = JSX.IntrinsicElements["a"];

const OutboundLink = ({
  className,
  target = "_blank",
  children,
  ...props
}: Props) => {
  return (
    <a className={clsx(styles.a, className)} target={target} {...props}>
      {children}
    </a>
  );
};

export default OutboundLink;
