import React from "react";
import styles from "./image-div.module.css";
const ImageDiv = () => {
  return (
    <>
      <div className={`${styles.divPlaceholder}`}>
        <div
          className={`text-center flex flex-col justify-center items-center ${styles.imageDiv}`}
        >
          <h1 className="text-white text-4xl uppercase tracking-widest opacity-50 font-semibold">
            John 16:33
          </h1>
          <p className="text-white text-2xl font-light uppercase tracking-wide w-3/4 mt-12 opacity-50">
            I have told you these things, so that in me you may have peace. In
            this world you will have trouble. But take heart, I have{" "}
            <span className="font-semibold">overcome the world</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageDiv;
