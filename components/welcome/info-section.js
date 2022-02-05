import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './info-section.module.css';
const InfoSection = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInitial, setIsInitial] = useState(true);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setIsInitial(false);
    }

    
  return (
    <>
      <div className="container mt-8 p-6 w-11/12 lg:w-5/6 md:w-5/6 rounded-lg shadow-lg border-2">
        <div className="flex flex-1 justify-between items-center">
          <h1 className="uppercase m-1 font-semibold text-xl">{title}</h1>
          <button onClick={toggleOpen}>
            <AiOutlinePlusCircle size={40} className={`text-seaFoam-500 hover:text-seaFoam-700 ${isOpen && styles['rotate-open']} ${!isOpen && !isInitial && styles['rotate-close']}`} />
          </button>
        </div>

        {isOpen && <div
          className={`py-8 leading-loose ${
            isOpen ? styles.open : styles.closed
          }`}
        >
          <p className="text-lg text-gray-500">
            {content}
          </p>
        </div>}
      </div>
    </>
  );
};

export default InfoSection;
