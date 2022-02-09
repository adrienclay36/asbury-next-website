import React, { useState, useEffect, useContext } from 'react';
import BookListView from './book-list/book-list-view';
import { LibraryMainContext } from '../library-store-main';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
const BookView = ({ books, decreasePage, increasePage, getQueriedData, getBooks, getQuery, loading }) => {

    const [query, setQuery] = useState('');

    const libraryContext = useContext(LibraryMainContext);

    const clearInput = () => {
      setQuery('');
      libraryContext.setNoData(false);
      libraryContext.getBooks();
    }

    const provideQuery = (e) => {
      setQuery(e.target.value)
      libraryContext.setQuery(e.target.value);
      
    }


  return (
    <div className="container">
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
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowBackIos />
        </button>
        
        <button
          onClick={libraryContext.increasePage}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

      <BookListView/>
    </div>
  );
};

export default BookView;

