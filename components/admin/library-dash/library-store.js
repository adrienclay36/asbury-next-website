import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const LibraryContext = React.createContext({
    books: [],
    deleteBook: (id) => {},
    updateBook: (id, title, subject, author, authorCode, deweyNumber, availability) => {},
    addBook: (title, subject, author, authorCode, deweyNumber) => {},
    modifying: false,
    pageNumber: 0,
    totalPages: 0,
})

const LibraryProvider = (props) => {
    const [modifying, setModifying] = useState(false);
    const [books, setBooks] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

        const getBooks = async () => {
            try{
            const response = await axios.get(`/api/library?page=${pageNumber}`);
            setBooks(response.data.books);
            setTotalPages(response.data.totalPages);
        } catch(err) {
            console.log(err.message);
        }
        }


    useEffect(() => {
        getBooks();
    }, [pageNumber])

    const contextValue = {
        books: books,
        pageNumber: pageNumber,
        totalPages: totalPages,
    }
  return (
      <LibraryContext.Provider value={contextValue}>
          {props.children}
      </LibraryContext.Provider>
  );
};

export default LibraryProvider;
