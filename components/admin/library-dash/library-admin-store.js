import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const LibraryContext = React.createContext({
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
  addBook: (title, subject, author, deweyNumber, authorCode, availability) => {},
  deleteBook: (id) => {},
  setModifying: () => {},
});

const LibraryProvider = (props) => {
 const [books, setBooks] = useState([]);
 const [pageNumber, setPageNumber] = useState(0);
 const [totalPages, setTotalPages] = useState(0);
 const [loading, setLoading] = useState(false);
 const [noData, setNoData] = useState(false);
 const [query, setQuery] = useState("");
 const [modifying, setModifying] = useState("");

 const getBooks = async () => {
   setNoData(false);
   setLoading(true);
   setBooks([]);
   try {
     const response = await axios.get(`/api/library?page=${pageNumber}`);
     setBooks(response.data.books);
     setTotalPages(response.data.totalPages);
     setLoading(false);
   } catch (err) {
     console.log(err.message);
   }
 };

 // Get books use Effect, listening on pageNumber Changes
 useEffect(() => {
   getBooks();
 }, [pageNumber]);

 const getQueriedData = async () => {
   setLoading(true);
   setBooks([]);

   try {
     const response = await axios.get(`/api/library/query?searchTerm=${query}`);
     setBooks(response.data.books);
     if (response.data.status !== "ok") {
       setNoData(true);
     } else {
       setNoData(false);
     }
     setLoading(false);
   } catch (error) {
     console.log(error.message);
   }
 };

 useEffect(() => {
   if (query) {
     // Wait until the user is done typing (or try)
     const timeout = setTimeout(getQueriedData, 500);

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


 const addBook = async (title, subject, author, deweyNumber, authorCode, availability) => {
    const boolAvailability = availability === 'true' ? true : false;
    
   const newBook = {
     deweyNumber: deweyNumber,
     authorCode: authorCode,
     availability: boolAvailability,
     author: author,
     title: title,
     subject: subject
   }
   try{
     const response = await axios.post("/api/library/add", newBook);
     console.log(response);

   } catch(err) {
     console.log(err.message);
   }
   
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
   setModifying: setModifying,
   addBook: addBook,
 };
  return (
      <LibraryContext.Provider value={contextValue}>
          {props.children}
      </LibraryContext.Provider>
  );
};

export default LibraryProvider;
