import React, { useState, useEffect } from 'react';
import styles from './book-view.module.css';
import BookGridView from './book-grid/book-grid-view';
import BookListView from './book-list/book-list-view';
import PageLoading from '../../PageLoading/PageLoading';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
const BookView = ({ books, decreasePage, increasePage, getQueriedData, getBooks, getQuery, loading }) => {
    const [showGrid, setShowGrid] = useState(false);
    const [showList, setShowList] = useState(true);
    const [query, setQuery] = useState('');

    



    

    const queryLibrary = (e) => {
      if(query) {
        getQueriedData(query);
      }
    }

    const clearInput = () => {
      setQuery('');
      getBooks();
    }

    const provideQuery = (e) => {
      setQuery(e.target.value)
      getQuery(e.target.value);
    }


    // const showGridHandler = () => {
    //     setShowGrid(true);
    //     setShowList(false);
    // }

    // const showListHandler = () => {
    //     setShowList(true);
    //     setShowGrid(false);
    // }


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
            placeholder="Start Typing to Search Posts"
          />
        </div>
        {/* <button onClick={queryLibrary} className="px-3 py-2 bg-seaFoam-600 text-white rounded-lg mx-2">Search</button> */}
      </div>
      {/* <div className="flex flex-1 justify-center items-center my-10">
        <button
          id="gridView"
          onClick={showGridHandler}
          className={`px-5 py-2 border-2 rounded-l-md text-seaFoam-700 ${
            showGrid && styles["btn-filled"]
          }`}
        >
          GRID
        </button>
        <button
          id="listView"
          onClick={showListHandler}
          className={`px-5 py-2 border-2 rounded-r-md text-seaFoam-700 ${
            showList && styles["btn-filled"]
          }`}
        >
          LIST
        </button>
      </div> */}

      <div className="flex flex-1 p-4 justify-between items-center container">
        <button
          onClick={decreasePage}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowBackIos />
        </button>
        {loading && <PageLoading />}
        {books.length === 0 && !loading && <p>No Results for that query...</p>}
        <button
          onClick={increasePage}
          className="p-2 mx-4 rounded-lg bg-seaFoam-600 text-white hover:bg-seaFoam-800"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>

      {/* {showGrid && <BookGridView books={books} />} */}
      {showList && <BookListView books={books} />}
    </div>
  );
};

export default BookView;

