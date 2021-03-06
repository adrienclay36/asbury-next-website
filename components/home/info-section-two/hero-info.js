import React from "react";
import styles from "./hero-info.module.css";
import { CgCross } from "react-icons/cg";
const HeroInfo = () => {
  return (
    <div className={styles["hero-image"]}>
      <div className={styles["hero-text"]}>
        <h1 className="text-3xl lg:text-8xl md:text-7xl text-center text-white font-bold mb-12">
          <span className={`${styles.clip} bg-clip-text text-transparent`}>
            Traditional Service
          </span>{" "}
        </h1>
        <div>
          <p
            className={`${styles.clip} text-xl lg:text-4xl md:text-4xl font-semibold mb-6 uppercase bg-clip-text text-transparent`}
          >
            Sundays
          </p>
          <div className="flex flex-1 justify-center">
            <CgCross size={50} className="bg-clip-text text-center" />
          </div>

          <div
            className={`flex flex-1 flex-col lg:flex-row md:flex-row justify-center items-center`}
          >
            <p className="m-4 text-xl lg:text-2xl md:text-2xl font-semibold">
              8:00AM
            </p>
            <p>&</p>
            <p className="m-4 text-xl lg:text-2xl md:text-2xl font-semibold">
              11:00AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInfo;
