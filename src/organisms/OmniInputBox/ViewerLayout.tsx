import * as React from "react";
import styles from "./ViewerLayout.module.scss";

type Props = {
  headerChildren: React.ReactNode;
  children: React.ReactNode;
};

const ViewerLayout = ({ headerChildren, children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>{headerChildren}</div>
      {children}
    </div>
  );
};

export default ViewerLayout;
