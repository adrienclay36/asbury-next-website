import React from 'react';
import Image from 'next/image';
import Navbar from '../navbar/navbar';
import styles from './hero.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiChevronDoubleDown } from "react-icons/hi";

import MainButton from '../ui/main-button';

const Hero = () => {
  const router = useRouter();


  const onOpen = () => {
    return null;
  }



  return (
    <section className={styles.fadeIn}>
      <div className={`${styles.heroImage}`}>
        <div className="pt-4">
          <Navbar textColor="text-white" invertImage={true} home={true} onOpen={onOpen} />
        </div>
        <div className="text-center mt-16">
          <h1 className="text-white font-light tracking-widest opacity-80 uppercase text-4xl lg:text-7xl">
            romans 15:7
          </h1>
          <p className="text-white font-light tracking-wide opacity-70 uppercase text-2xl lg:text-4xl lg:w-100 mx-auto mt-12">
            Therefore welcome one another as Christ has welcomed you, for the
            glory of God.
          </p>
          <div id="action-buttons" className="mt-12">
            <MainButton onClick={() => router.push("/welcome")} margin={"mx-4 mb-6 lg:mb-0 md:mb-0"}>About</MainButton>
            <MainButton onClick={() => router.push("/worship")} margin={"mx-4"}>Worship</MainButton>
          </div>
        </div>
        <div className="flex flex-1 justify-center mt-12">
          <button onClick={() => {document.getElementById('features').scrollIntoView({behavior: 'smooth'})}}>
            <HiChevronDoubleDown
              className={`text-white opacity-70 cursor-pointer hover:text-seaFoam-300 ${styles.chevron}`}
              size={50}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
