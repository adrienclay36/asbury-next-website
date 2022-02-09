import React, { useContext, useState } from "react";
import { LibraryContext } from "./library-admin-store";
import { AiOutlineSearch } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import PageLoading from "../../PageLoading/PageLoading";
import BookItem from "./book-item";
import styles from './book-list.module.css';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
const BookList = () => {
  const libraryContext = useContext(LibraryContext);
  const [query, setQuery] = useState('');


  const provideQuery = (e) => {
    setQuery(e.target.value);
    libraryContext.setQuery(e.target.value);
  }

  const clearInput = () => {
    setQuery("");
    libraryContext.setNoData(false);
    libraryContext.getBooks();
  };

  return (
    <div>
      <div className="container flex items-center justify-center my-10">
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
      <div className="flex flex-1 p-4 justify-between items-center container">
        <button
          onClick={libraryContext.decreasePage}
          className="p-2 mx-4 rounded-lg bg-green-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowBackIos />
        </button>

        <button
          onClick={libraryContext.increasePage}
          className="p-2 mx-4 rounded-lg bg-green-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      <div className={`${styles.scroll} border-2`}>
        {libraryContext.loading && <PageLoading />}
        {libraryContext.noData && (
          <h1 className="text-center text-lg font-semibold mt-4 text-red-700">
            No Data found for that query...
          </h1>
        )}
        {libraryContext.books.map((book) => (
          <BookItem key={book._id} id={book._id} book={book} />
        ))}
      </div>

      <div className="flex flex-1 p-4 justify-between items-center container">
        <button
          onClick={libraryContext.decreasePage}
          className="p-2 mx-4 rounded-lg bg-green-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowBackIos />
        </button>

        <button
          onClick={libraryContext.increasePage}
          className="p-2 mx-4 rounded-lg bg-green-600 text-white hover:bg-green-900"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default BookList;
