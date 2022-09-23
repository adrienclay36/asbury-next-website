import React from "react";
import styles from "./main-button.module.css";
const MainButton = (props) => {
  const outlineStyles = `px-7 py-3 text-sm lg:text-base md:text-base hover:bg-seaFoam-800 font-semibold tracking-widest border-2 shadow-md border-gray-300 text-white uppercase rounded-lg ${props.margin} ${styles.btn}`;
  const filledStyles = `px-7 py-3 text-sm lg:text-base md:text-base hover:bg-seaFoam-300 bg-seaFoam-600 font-semibold tracking-widest border-2 shadow-md border-gray-300 text-white uppercase rounded-lg ${props.margin} ${styles.btn}`;
  return (
    <button
      type="button"
      onClick={props.onClick || null}
      className={props.filled ? filledStyles : outlineStyles}
    >
      {props.children}
    </button>
  );
};

export default MainButton;
