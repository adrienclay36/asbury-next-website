import React from "react";
import styles from "./quilt-div.module.css";
const QuiltDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            John 5:14
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            This is the confidence we have in approaching God: that if we ask
            anything according to his will, he hears us.
          </p>
        </div>
      </div>
    </>
  );
};

export default QuiltDiv;
