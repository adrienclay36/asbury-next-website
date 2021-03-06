import React, { useContext, useState, useEffect } from "react";
import { LibraryContext } from "../../../store/library-store";
import { AiOutlineSearch } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import PageLoading from "../../PageLoading/PageLoading";
import BookItem from "./book-item";
import styles from "./book-list.module.css";
import { UserContext } from '../../../store/user-context';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import BookListView from "../../library/book-view/book-list/book-list-view";


const BookList = () => {
  const libraryContext = useContext(LibraryContext);
  const userContext = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);


  

  const provideQuery = (e) => {
    setQuery(e.target.value);
    libraryContext.setQuery(e.target.value);
  };

  const clearInput = () => {
    setQuery("");
    libraryContext.setNoData(false);
    libraryContext.getBooks();
  };


  const decreasePageHandler = () => {
    libraryContext.decreasePage();
    if (query) {
      setQuery("");
      libraryContext.setQuery("");
    }
  };

  const increasePageHandler = () => {
    libraryContext.increasePage();
    if (query) {
      setQuery("");
      libraryContext.setQuery("");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center my-10">
        <div className="relative focus-within:text-seaFoam-400 lg:w-auto md:w-auto w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pl-1 mr-4">
            {query.length === 0 && <AiOutlineSearch />}
            {query.length > 0 && (
              <BsX onClick={clearInput} className="cursor-pointer" size={20} />
            )}
          </span>
          <input
            className="px-4 py-2 w-full lg:w-96 md:w-96 mx-auto border-2 rounded-md focus:outline-none outline-none active:outline-none border-seaFoam-500"
            value={query}
            onChange={provideQuery}
            type="text"
            placeholder="Start Typing to Search Books"
          />
        </div>
      </div>
      <div className="container flex flex-1 p-4 justify-between items-center">
        <button
          onClick={decreasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowBackIos />
        </button>
       
        <button
          onClick={increasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      {/* LIST OF BOOKS */}
      <BookListView editing={true}/>

      <div className="container flex flex-1 p-4 justify-between items-center">
        <button
          onClick={decreasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowBackIos />
        </button>

        <button
          onClick={increasePageHandler}
          className="p-2 mx-4 rounded-lg bg-emerald-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default BookList;
