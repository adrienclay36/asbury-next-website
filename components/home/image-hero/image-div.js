import React from "react";
import styles from "./image-div.module.css";
const ImageDiv = () => {
  return (
    <>
      {/* <div className="flex flex-1 items-center justify-center absolute">
        <h1 className="text-white uppercase tracking-widest">Asbury Methodist</h1>
      </div>
      <img
        className={`${styles.floatingImage}`}
        alt="floating"
        src="https://images.unsplash.com/photo-1481278403982-f2d9f387cdcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      />
      <div className={styles.imageDiv}></div> */}
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
