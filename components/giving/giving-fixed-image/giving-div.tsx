import React from "react";
import styles from "./giving-div.module.css";
const GivingDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            MATTHEW 6:21
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            For where your treasure is, there your{" "}
            <span className="font-semibold">heart will be also</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default GivingDiv;
