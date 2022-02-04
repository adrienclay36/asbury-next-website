import React from 'react';
import Navbar from '../navbar/navbar';
import styles from "./navhero-condensed.module.css";
import { useState } from 'react';
const NavHeroCondensed = () => {
  const[isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }
  return (
    <section>
      <div className={`${!isOpen ? styles.heroImage : styles.heroImageOpen}`}>
        <div className="pt-4">
          <Navbar onOpen={toggleOpen} textColor="text-white" invertImage={true}/>
        </div>
      </div>
    </section>
  );
};

export default NavHeroCondensed;
