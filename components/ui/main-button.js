import React from 'react';
import styles from './main-button.module.css';
const MainButton = (props) => {
  return (
    <button
      type="button"
      className={`px-7 py-3 hover:bg-seaFoam-800 font-semibold tracking-widest border-2 shadow-md border-gray-300 text-white uppercase rounded-lg ${props.margin} ${styles.btn}`}
    >
      {props.children}
    </button>
  );
};

export default MainButton;
