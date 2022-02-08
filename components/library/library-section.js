import React, { useState, useEffect } from "react";
import SectionHeading from "../ui/section-heading";
import AboutView from "./about-view/about-view";
import BookView from './book-view/book-view'
import styles from "./library-section.module.css";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md';

import axios from 'axios';
import PageLoading from "../PageLoading/PageLoading";
const LibrarySection = () => {
  const [aboutView, setAboutView] = useState(false);
  const [booksView, setBooksView] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const getBooks = async () => {
    setLoading(true);
    setBooks([]);
    try{

      const response = await axios.get(`/api/library?page=${pageNumber}`);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch(err) {
      console.log(err.message);
    }

  }

  const getQuery = (inputQuery) => {
    setQuery(inputQuery);
  }
  

  const getQueriedData = async () => {
    setBooks([]);

    try{
      const response = await axios.get(`/api/library/query?searchTerm=${query}`)
      setBooks(response.data.books);
    } catch(error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    if(query){
      getQueriedData()
    } else{
      getBooks();
    }
  }, [query])

 
  useEffect(() => {
    if(!booksView) {
      setBooks([]);
    }
    getBooks();
  },[pageNumber, booksView])

  const increasePage = () => {
    setPageNumber(Math.min(totalPages, pageNumber + 1));

  }
  const decreasePage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  }



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
      <button onClick={decreasePage} className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800">
        <MdOutlineArrowBackIos/>
      </button>
      <button onClick={increasePage} className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800">
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
      {booksView && <BookView getBooks={getBooks} getQuery={getQuery} getQueriedData={getQueriedData} increasePage={increasePage} decreasePage={decreasePage} books={books} />}
      
      {booksView && bookControlsBottom}
    </SectionHeading>
  );
};

export default LibrarySection;

