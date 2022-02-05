import React, { useState, useEffect } from 'react';
import styles from './book-view.module.css';
import BookGridView from './book-grid/book-grid-view';
import BookListView from './book-list/book-list-view';
const BookView = ({ books, getQuery }) => {
    const [showGrid, setShowGrid] = useState(false);
    const [showList, setShowList] = useState(true);
    const [query, setQuery] = useState('');


     useEffect(() => {
         document.getElementById("listView").focus();
     },[]);

    const provideQuery = (e) => {
        setQuery(e.target.value);
        getQuery(e.target.value);
    }


    const showGridHandler = () => {
        setShowGrid(true);
        setShowList(false);
    }

    const showListHandler = () => {
        setShowList(true);
        setShowGrid(false);
    }


  return (
    <div className="container">
      <div className="flex flex-1 justify-center items-center my-10">
        <input
          value={query}
          onChange={provideQuery}
          className="px-4 py-2 text-seaFoam-700 border-2 w-full lg:w-6/12 focus:outline-none"
          type="text"
          name="search"
          id="search"
          placeholder="Start typing to search"
        />
      </div>
      <div className="flex flex-1 justify-center items-center my-10">
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
      </div>

      {showGrid && <BookGridView books={books} />}
      {showList && <BookListView books={books} />}
    </div>
  );
};

export default BookView;

