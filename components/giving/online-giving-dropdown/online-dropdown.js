import React, { useState } from 'react';
import styles from '../giving-dropdown.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
const OnlineDropdown = ({ title, content }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isInitial, setIsInitial] = useState(true);
   const toggleOpen = () => {
     setIsOpen(!isOpen);
     setIsInitial(false);
   };

   return (
     <>
       <div className="container mt-8 p-6 w-11/12 lg:w-5/6 md:w-5/6 rounded-lg shadow-lg border-2">
         <div className="flex flex-1 justify-between items-center">
           <h1 className="uppercase m-1 font-semibold text-xl">{title}</h1>
           <button onClick={toggleOpen}>
             <AiOutlinePlusCircle
               size={40}
               className={`text-seaFoam-500 hover:text-seaFoam-700 ${
                 isOpen && styles["rotate-open"]
               } ${!isOpen && !isInitial && styles["rotate-close"]}`}
             />
           </button>
         </div>

         {isOpen && (
           <div
             className={`pt-8 leading-loose ${
               isOpen ? styles.open : styles.closed
             }`}
           >
             <p className="text-lg text-gray-500">{content}</p>
             <div className="flex justify-center items-center">
             <button className="py-3 px-7 bg-emerald-900 hover:bg-seaFoam-600 text-white uppercase font-semibold rounded-lg mt-4 w-full">Paypal</button>
             </div>
           </div>
         )}
       </div>
     </>
   );
};

export default OnlineDropdown;
