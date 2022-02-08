import React, { useContext } from 'react';
import { LibraryContext } from './library-store';
import PageLoading from '../../PageLoading/PageLoading';
import BookItem from './book-item';
const BookList = () => {
  const libraryContext = useContext(LibraryContext);
  
  if(libraryContext.books.length === 0) {
    return <PageLoading/>
  }
  return (
    <div>
      {/* ADD SEARCH BAR HERE */}
      <div>
        {libraryContext.books.map(book => (
          <BookItem key={book._id} id={book._id} book={book}/>
          ))}
      </div>
          </div>
  );
};

export default BookList;
