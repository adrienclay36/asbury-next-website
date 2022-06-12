import React, { useState, useEffect, useContext } from "react";
import SectionHeading from "../ui/section-heading";
import AboutView from "./about-view/about-view";
import BookView from "./book-view/book-view";
import HTMLBookView from "./book-view/html-book-view";
import styles from "./library-section.module.css";
import { LibraryContext } from "../../store/library-store";
import { supabase } from "../../supabase-client";
import { getDateInfo } from '../../utils/dates';
import LibrarySkeletonGrid from "./book-view/book-list/library-skeleton-grid";
const XLSX = require("xlsx");
const LibrarySection = ({ books, lastUpdated}) => {
  const [aboutView, setAboutView] = useState(false);
  const [booksView, setBooksView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [booksExcel, setBooksExcel] = useState([]);
  const [updatedOn, setUpdatedOn] = useState('');

  const getBooksExcel = async () => {
    setLoading(true);
    const { data: lastModified, error: lastModifiedError } =
      await supabase.storage.from("library").list();
    if (lastModifiedError) {
      console.log(
        "Error getting created_at from file:: ",
        lastModifiedError.message
      );
    }
    const { monthText, day } = getDateInfo(lastModified[0]?.created_at, true);
    const year = new Date().getFullYear();
    const dateString = `${monthText} ${day}, ${year}`;
    setUpdatedOn(dateString);
    const { data, error } = await supabase.storage
      .from("library")
      .download("Web Search.xls");
    if (error) {
      console.log("Error fetching books:: ", error.message);
      return;
    }
    const workbook = XLSX.read(await data.arrayBuffer(), { type: "array" });
    const jsonBooks = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );
    setBooksExcel(jsonBooks);
    setLoading(false);
  };

  useEffect(() => {
    getBooksExcel();
  }, []);

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
          className={`border-2 rounded-l-lg uppercase text-seaFoam-600 text-md lg:text-xl md:text-xl w-full py-2 ${
            aboutView && styles["btn-filled"]
          }`}
        >
          About
        </button>
        <button
          id="booksButton"
          onClick={showBooks}
          className={`border-2 rounded-r-lg uppercase text-seaFoam-600 text-md lg:text-xl md:text-xl w-full py-2 ${
            booksView && styles["btn-filled"]
          }`}
        >
          Books
        </button>
      </div>

      {loading && <LibrarySkeletonGrid/>}
      {aboutView && <AboutView />}
      {/* {booksView && <BookView />} */}
      {booksView && booksExcel.length > 0 && <HTMLBookView books={booksExcel} updatedOn={updatedOn} />}
    </SectionHeading>
  );
};

export default LibrarySection;
