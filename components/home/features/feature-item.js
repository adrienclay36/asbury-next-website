import React from "react";
import styles from './feature-item.module.css';
import Link from 'next/link';
import Image from "next/image";
const FeatureItem = ({ href, title, image, subtext }) => {
  return (
    <Link href={href}>
      <>
        <div className="text-center flex flex-col-reverse items-center justify-center cursor-pointer hover:opacity-80">
          <h1 className="absolute uppercase text-white text-4xl">{title}</h1>
          {subtext && <p className="absolute mt-24 text-white uppercase tracking-widest">{subtext}</p>}
          <img
            className={styles.img}
            alt="feature"
            src={image}
          />
        </div>
      </>
    </Link>
  );
};

export default FeatureItem;
