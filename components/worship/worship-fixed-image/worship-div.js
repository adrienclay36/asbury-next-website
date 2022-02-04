import React from "react";
import styles from "./worship-div.module.css";
const WorshipDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            John 1:7
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            But if we walk in the light, as he is in the light, we have
            fellowship with one another, and the blood of Jesus his Son cleanses
            us from all sin.
          </p>
        </div>
      </div>
    </>
  );
};

export default WorshipDiv;
