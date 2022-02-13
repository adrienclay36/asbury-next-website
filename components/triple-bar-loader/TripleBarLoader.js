import React from 'react'
import styles from './TripleBarLoader.module.css';
const TripleBarLoader = () => {
  return (
    <div className={styles['lds-facebook']}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default TripleBarLoader