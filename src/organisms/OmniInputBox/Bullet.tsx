import * as React from "react";
import clsx from "clsx";
import styles from "./Bullet.module.scss";

type Props = {
  size: number;
  index: number;
};

const Bullet = ({ size, index }: Props) => {
  return (
    <div className={styles.container}>
      {[...Array(size)].map((_, i) => (
        <div
          className={clsx({
            [styles.bullet]: true,
            [styles.selected]: index % size === i,
          })}
        />
      ))}
    </div>
  );
};

export default Bullet;
