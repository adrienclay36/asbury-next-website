import React from "react";
import styles from "./cafe-div.module.css";
const CafeDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            Proverbs 11:25
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            A generous person will prosper; whoever refreshes others will be
            refreshed.
          </p>
        </div>
      </div>
    </>
  );
};

export default CafeDiv;
