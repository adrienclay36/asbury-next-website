import React from "react";
import styles from "./DualRingLoader.module.css";
const DualRingLoader = () => {
  return (
    <div className={styles.appearance}>
      <div className={styles["lds-dual-ring"]}></div>
    </div>
  );
};

export default DualRingLoader;
