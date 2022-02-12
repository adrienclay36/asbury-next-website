import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPagedData, getQueriedData, getTotalPages } from "../../supabase-util";

const PAGE_SIZE = 15;

export const LibraryMainContext = React.createContext({
  books: [],
  pageNumber: 0,
  totalPages: 0,
  modifying: false,
  loading: false,
  noData: false,
  increasePage: () => {},
  decreasePage: () => {},
  setQuery: () => {},
  getBooks: () => {},
  setNoData: () => {},
});

let isInitial = true;
const LibraryMainContextProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [query, setQuery] = useState("");

  const getBooks = async () => {
    setNoData(false);
    setLoading(true);
    setBooks([]);
    const data = await getPagedData(pageNumber, PAGE_SIZE, "books");
    setBooks(data);
    setLoading(false);
    isInitial = false;
  };

  const initTotalPages = async () => {
    const totalPages = await getTotalPages(PAGE_SIZE, "books");
    setTotalPages(totalPages);
  };

  useEffect(() => {
    initTotalPages();
  }, []);

  // Get books use Effect, listening on pageNumber Changes
  useEffect(() => {
    getBooks();
  }, [pageNumber]);

  const callQueryFunction = async () => {
    setLoading(true);
    setBooks([]);
    const { data, status } = await getQueriedData('books', query, 'search_books_ts');

    setBooks(data);
    if (status !== "ok") {
      setNoData(true);
    } else {
      setNoData(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Don't run side effect on initial render
    if (!isInitial) {
      if (!query) {
        //  If query has changed and there is not a query, the user has backspaced or cleraed manually
        // In this case, get the books so something loads, otherwise it would stay empty
        getBooks();

        return;
      }
      // Wait until the user is done typing (or try)
      const timeout = setTimeout(callQueryFunction, 500);

      // If user types, clear the timeout with cleanup function
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [query]);

  const increasePage = () => {
    setPageNumber(Math.min(totalPages, pageNumber + 1));
  };
  const decreasePage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const contextValue = {
    books: books,
    pageNumber: pageNumber,
    totalPages: totalPages,
    increasePage: increasePage,
    decreasePage: decreasePage,
    loading: loading,
    setQuery: setQuery,
    getBooks: getBooks,
    noData: noData,
    setNoData: setNoData,
  };

  return (
    <LibraryMainContext.Provider value={contextValue}>
      {props.children}
    </LibraryMainContext.Provider>
  );
};

export default LibraryMainContextProvider;
