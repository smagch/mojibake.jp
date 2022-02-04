import * as React from "react";
import clsx from "clsx";
import styles from "./Bullet.module.scss";

type Props = {
  size: number;
  index: number;
  className?: string;
};

const Bullet = ({ size, index, className }: Props) => {
  return (
    <div className={styles.container}>
      {[...Array(size)].map((_, i) => (
        <div
          key={i}
          className={clsx(
            {
              [styles.bullet]: true,
              [styles.selected]: index % size === i,
            },
            className
          )}
        />
      ))}
    </div>
  );
};

export default Bullet;
