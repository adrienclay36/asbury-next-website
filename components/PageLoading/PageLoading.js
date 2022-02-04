import React from 'react';
import styles from './PageLoading.module.css';
const PageLoading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default PageLoading;
