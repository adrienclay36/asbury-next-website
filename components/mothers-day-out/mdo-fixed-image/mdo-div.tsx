import React from "react";
import styles from "./mdo-div.module.css";
const MDODiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            Isaiah 54:13
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            All your children will be taught by the Lord, and great will be
            their peace.
          </p>
        </div>
      </div>
    </>
  );
};

export default MDODiv;
