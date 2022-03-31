import React from "react";
import styles from './feature-item.module.css';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
const FeatureItem = ({ href, title, image, subtext }) => {
  const router = useRouter();
  return (
      <>
        <div tabIndex={0} onClick={() => router.push(href)} className="text-center flex flex-col-reverse items-center justify-center cursor-pointer hover:opacity-80">
          <h1 className="absolute uppercase text-white text-4xl">{title}</h1>
          {subtext && <p className="absolute mt-24 text-white uppercase tracking-widest">{subtext}</p>}
          <img
            className={styles.img}
            alt={title}
            src={image}
          />
        </div>
      </>
  );
};

export default FeatureItem;
