import React, { useState } from "react";
import styles from "./joys-and-concerns-section.module.css";
import AboutView from "./about-view/about-view";
import BoardView from "./board-view/board-view";
import SectionHeading from "../ui/section-heading";
const JoysAndConcernsSection = () => {
  const [aboutView, setAboutView] = useState(true);
  const [boardView, setBoardView] = useState(false);

  const showAbout = () => {
    setAboutView(true);
    setBoardView(false);
  };

  const showBoard = () => {
    setBoardView(true);
    setAboutView(false);
  };
  return (
    <SectionHeading title="Joys & Concerns">
      <div className="container grid grid-cols-2 gap-0 text-center w-full lg:w-2/6 mx-auto">
        <button
          id="aboutButton"
          onClick={showAbout}
          className={`border-2 rounded-l-lg uppercase text-seaFoam-600 text-md lg:text-xl md:text-xl w-full py-2 ${
            aboutView && styles["btn-filled"]
          }`}
        >
          About
        </button>
        <button
          id="booksButton"
          onClick={showBoard}
          className={`border-2 rounded-r-lg uppercase text-seaFoam-600 text-md lg:text-xl md:text-xl w-full py-2 ${
            boardView && styles["btn-filled"]
          }`}
        >
          Board
        </button>
      </div>

      {aboutView && <AboutView />}
      {boardView && <BoardView />}



    </SectionHeading>
  );
};

export default JoysAndConcernsSection;
