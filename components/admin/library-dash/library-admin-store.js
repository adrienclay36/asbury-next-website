import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
  addBook: (title, subject, author, deweyNumber, authorCode, availability) => {},
  deleteBook: (id) => {},
  setModifying: () => {},
  getBookById: (id) => {},
  updateBook: (id, title, subject, author, deweyNumber, authorCode, availability) => {},
  toggleAvailable: (id) => {},
});

const LibraryProvider = (props) => {
 const [books, setBooks] = useState([]);
 const [pageNumber, setPageNumber] = useState(0);
 const [totalPages, setTotalPages] = useState(0);
 const [loading, setLoading] = useState(false);
 const [noData, setNoData] = useState(false);
 const [query, setQuery] = useState("");
 const [modifying, setModifying] = useState("");
 const [book, setBook] = useState({});

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
 }, [pageNumber, modifying]);

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

 const deleteBook = async (id) => {
   try {
     const response = await axios.delete(`/api/library/${id}`);
     if(query) {
       await getQueriedData();
     } else {
       toggleModifying();
     }
   } catch (err) {
     console.log(err.message);
   }
 }


 const getBookById = async (id) => {
   try {
     const response = await axios.get(`api/library/${id}`)
     setBook(response.data.book);
   } catch(err){
     console.log(err.message);
   }
 }


 const updateBook = async (id, title, subject, author, deweyNumber, authorCode, availability) => {
   const boolAvailability = availability === 'true' ? true : false;
   const bookData = {
     title: title,
     subject: subject,
     author: author,
     deweyNumber: deweyNumber,
     authorCode: authorCode,
     availability: boolAvailability,
   }
   try {
     const response = await axios.post(`/api/library/${id}`, bookData);
   } catch(err) {
     console.log(err.message);
   }
 }

 const toggleAvailable = async (id) => {
   const response = await axios.patch(`/api/library/${id}`);
 }


 const toggleModifying = () => {
   setModifying(!modifying);
 }

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
   toggleAvailable: toggleAvailable
 };
  return (
      <LibraryContext.Provider value={contextValue}>
          {props.children}
      </LibraryContext.Provider>
  );
};

export default LibraryProvider;
