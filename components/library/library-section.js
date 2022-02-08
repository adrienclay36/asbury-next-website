import React, { useState, useEffect } from "react";
import SectionHeading from "../ui/section-heading";
import AboutView from "./about-view/about-view";
import BookView from './book-view/book-view'
import styles from "./library-section.module.css";

const LibrarySection = ({ books }) => {
  const [aboutView, setAboutView] = useState(false);
  const [booksView, setBooksView] = useState(true);

  useEffect(() => {
    document.getElementById("aboutButton").focus();
  }, []);

  const getQuery = (query) => {
      console.log(query);
  }

  const showAbout = () => {
    setAboutView(true);
    setBooksView(false);
  };

  const showBooks = () => {
    setBooksView(true);
    setAboutView(false);
  };

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
      {booksView && <BookView getQuery={getQuery} books={books} />}
    </SectionHeading>
  );
};

export default LibrarySection;

