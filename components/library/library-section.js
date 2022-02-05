import React, { useState, useEffect } from "react";
import SectionHeading from "../ui/section-heading";
import AboutView from "./about-view/about-view";
import BookView from './book-view/book-view'
import styles from "./library-section.module.css";

const LibrarySection = () => {
  const [aboutView, setAboutView] = useState(true);
  const [booksView, setBooksView] = useState(false);

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


export const books = [
  {
    id: "b1",
    deweyNumber: "003.21",
    authorCode: "SWE",
    author: "Sweeney, Linda Booth",
    title: "Connected Wisdom",
    subject: "Natural Laws",
    availability: true,
  },
  {
    id: "b2",
    deweyNumber: "027",
    authorCode: "HAR",
    author: "Harris, Linda G.",
    title: "One Book at a Time: History of the Library in NM",
    subject: "Libraries, New Mexico, History",
    availability: false,
  },
  {
    id: "b3",
    deweyNumber: "028.9",
    authorCode: "PRI",
    author: "Prior, Karen Swallow",
    title: "On Reading Well: Finding the Good Life through Great Books",
    subject: "Books and Reading, Christianity, Literature",
    availability: true,
  },
  {
    id: "b4",
    deweyNumber: "031.02",
    authorCode: "KIP",
    author: "Kipfer, Barbara Ann",
    title: "14,000 Things to be happy about.",
    subject: "Happiness",
    availability: true,
  },
];
