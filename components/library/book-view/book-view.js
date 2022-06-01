import React, { useState, useEffect, useContext } from "react";
import BookListView from "./book-list/book-list-view";
import { LibraryContext } from "../../../store/library-store";
import { AiOutlineSearch } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const BookView = () => {
  const [query, setQuery] = useState("");

  const libraryContext = useContext(LibraryContext);

  const clearInput = () => {
    setQuery("");
    libraryContext.setNoData(false);
    libraryContext.getBooks();
  };

  const provideQuery = (e) => {
    setQuery(e.target.value);
    libraryContext.setQuery(e.target.value);
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
      <div className="flex items-center justify-center mt-10 mb-5">
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
      

      <div className="flex flex-1 px-4 py-1 justify-between items-center container">
        <button
          onClick={decreasePageHandler}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowBackIos />
        </button>

        <button
          onClick={increasePageHandler}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      {/* List of books here */}
      <BookListView />

      <div className="flex flex-1 p-4 justify-center items-center">
        <button
          onClick={decreasePageHandler}
          className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          onClick={increasePageHandler}
          className="p-4 border-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default BookView;
