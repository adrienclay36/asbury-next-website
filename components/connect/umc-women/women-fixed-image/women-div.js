import React from "react";
import styles from "./women-div.module.css";
const GivingDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            PSALMS 46:5
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            God is in the midst of her; she shall not be moved; God will help
            her when morning dawns.
          </p>
        </div>
      </div>
    </>
  );
};

export default GivingDiv;
