import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getTotalPages,
  getPagedData,
  getQueriedData,
  addItemToTable,
  deleteItemFromTable,
  updateItemInTable,
  toggleBooleanValue
} from "../../../supabase-util";
import { supabase } from "../../../supabase-client";
const PAGE_SIZE = 15;
const TABLE = "books";
export const LibraryContext = React.createContext({
  books: [],
  book: {},
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
  addBook: (
    title,
    subject,
    author,
    deweyNumber,
    authorCode,
    availability
  ) => {},
  deleteBook: (id) => {},
  setModifying: () => {},
  getBookById: (id) => {},
  updateBook: (
    id,
    title,
    subject,
    author,
    deweyNumber,
    authorCode,
    availability
  ) => {},
  toggleAvailable: (id) => {},
});

let isInitial = true;
const LibraryProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [query, setQuery] = useState("");
  const [modifying, setModifying] = useState(false);
  const [book, setBook] = useState({});

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
    const { data, status } = await getQueriedData(
      "books",
      query,
      "search_books_ts"
    );

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
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
  };
  const decreasePage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const addBook = async (
    title,
    subject,
    author,
    deweyNumber,
    authorCode,
    availability
  ) => {
    const boolAvailability = availability === "true" ? true : false;

    const newBook = {
      deweynumber: deweyNumber,
      authorcode: authorCode,
      availability: boolAvailability,
      author: author,
      title: title,
      subject: subject,
    };

    await addItemToTable(TABLE, newBook);
  };

  const deleteBook = async (id) => {

    await deleteItemFromTable(TABLE, id);
    if (query) {
      await callQueryFunction();
    } else {
      getBooks();
    }
  };

  const getBookById = async (id) => {
    try {
      const response = await axios.get(`api/library/${id}`);
      setBook(response.data.book);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateBook = async (
    id,
    title,
    subject,
    author,
    deweyNumber,
    authorCode,
    availability
  ) => {
    const boolAvailability = availability === "true" ? true : false;
    const bookData = {
      title: title,
      subject: subject,
      author: author,
      deweynumber: deweyNumber,
      authorcode: authorCode,
      availability: boolAvailability,
    };
    
    const response = await updateItemInTable(TABLE, id, bookData);
  };

  const toggleAvailable = async (id) => {
    const response = await toggleBooleanValue(TABLE, id, 'availability')
  };

  const toggleModifying = () => {
    setModifying(!modifying);
  };

  const contextValue = {
    books: books,
    book: book,
    pageNumber: pageNumber,
    totalPages: totalPages,
    increasePage: increasePage,
    decreasePage: decreasePage,
    loading: loading,
    setQuery: setQuery,
    getBooks: getBooks,
    noData: noData,
    setNoData: setNoData,
    setModifying: setModifying,
    addBook: addBook,
    deleteBook: deleteBook,
    getBookById: getBookById,
    updateBook: updateBook,
    toggleAvailable: toggleAvailable,
  };
  return (
    <LibraryContext.Provider value={contextValue}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryProvider;
