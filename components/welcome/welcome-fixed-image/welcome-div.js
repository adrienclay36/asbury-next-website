import React from "react";
import styles from "./welcome-div.module.css";
const WelcomeDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            Matthew 18:20
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            For where two or three are gathered in my name, there I am among
            them
          </p>
        </div>
      </div>
    </>
  );
};

export default WelcomeDiv;
