import * as React from "react";
import Spinner from "./Spinner";
import clsx from "clsx";
import styles from "./LoadingImage.module.scss";

type Props = {
  className?: string;
  position: "absolute" | "fixed";
};

const LoadingImage: React.FC<Props> = ({ className, position }) => {
  return (
    <div className={clsx(styles.container, className, styles[position])}>
      <Spinner />
    </div>
  );
};

export default LoadingImage;
