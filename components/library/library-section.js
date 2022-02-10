import React, { useState, useEffect, useContext } from "react";
import SectionHeading from "../ui/section-heading";
import AboutView from "./about-view/about-view";
import BookView from './book-view/book-view'
import styles from "./library-section.module.css";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';
import { LibraryMainContext } from "./library-store-main";
const LibrarySection = () => {
  const [aboutView, setAboutView] = useState(true);
  const [booksView, setBooksView] = useState(false);

  const libraryContext = useContext(LibraryMainContext);

  



  const showAbout = () => {
    setAboutView(true);
    setBooksView(false);
  };

  const showBooks = () => {
    setBooksView(true);
    setAboutView(false);
  };
  const bookControlsBottom = (
    <div className="flex flex-1 p-4 justify-center items-center">
      <button onClick={libraryContext.decreasePage} className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800">
        <MdOutlineArrowBackIos/>
      </button>
      <button onClick={libraryContext.increasePage} className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800">
        <MdOutlineArrowForwardIos/>
      </button>
    </div>
  );

  

  return (
    <SectionHeading title="Library">
      <div className="container grid grid-cols-2 gap-0 text-center w-full lg:w-2/6 mx-auto">
        <button
          id="aboutButton"
          onClick={showAbout}
          className={`border-2 rounded-l-lg uppercase text-seaFoam-600 text-2xl w-full py-2 ${
            aboutView && styles["btn-filled"]
          }`}
        >
          About
        </button>
        <button
          id="booksButton"
          onClick={showBooks}
          className={`border-2 rounded-r-lg uppercase text-seaFoam-600 text-2xl w-full py-2 ${
            booksView && styles["btn-filled"]
          }`}
        >
          Books
        </button>
      </div>

      {aboutView && <AboutView />}
      {booksView && <BookView />}
      
      {booksView && bookControlsBottom}
    </SectionHeading>
  );
};

export default LibrarySection;

